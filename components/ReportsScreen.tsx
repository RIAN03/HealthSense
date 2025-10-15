import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { View, HealthDataPoint } from '../types';
import { ICONS, MOCK_VITALS, METRIC_UNITS, METRIC_ICONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

// Add declarations for global libraries loaded from CDN
declare const jspdf: any;
declare const html2canvas: any;

interface ReportsScreenProps {
  setView: (view: View) => void;
  healthHistory: Record<string, HealthDataPoint[]>;
  healthHistoryMonth: Record<string, HealthDataPoint[]>;
  userName: string;
  extraMetrics: string[];
}

const HealthChart: React.FC<{data: HealthDataPoint[], color: string, gradientId: string}> = ({data, color, gradientId}) => (
    <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#${gradientId})`} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const getHexColor = (tailwindColorClass: string): string => {
    if (tailwindColorClass.includes('red')) return '#EF4444';
    if (tailwindColorClass.includes('sky')) return '#0EA5E9';
    if (tailwindColorClass.includes('purple')) return '#8B5CF6';
    if (tailwindColorClass.includes('orange')) return '#F97316';
    if (tailwindColorClass.includes('green')) return '#22C55E';
    return '#6B7280';
};

const ReportsScreen: React.FC<ReportsScreenProps> = ({ setView, healthHistory, healthHistoryMonth, userName, extraMetrics }) => {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'Week' | 'Month'>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const primaryVitalsWithData = MOCK_VITALS.filter(vital => 
    healthHistory[vital.name] && healthHistory[vital.name].some(d => d.value > 0)
  );
  
  const extraMetricsWithData = extraMetrics
    .filter(metricName => healthHistory[metricName] && healthHistory[metricName].some(d => d.value > 0))
    .map(metricName => ({
        name: metricName,
        // Provide a compatible object structure for rendering and PDF generation
        color: 'text-gray-600', 
        bgColor: 'bg-gray-100',
        unit: METRIC_UNITS[metricName] || '',
        icon: METRIC_ICONS[metricName] || METRIC_ICONS.Default,
    }));
  
  const allMetricsWithData = [...primaryVitalsWithData, ...extraMetricsWithData];
  
  const handleDownload = async () => {
    if (allMetricsWithData.length === 0) return;
    setIsGenerating(true);

    const { jsPDF } = (window as any).jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const usableWidth = pageWidth - margin * 2;
    let yPos = 20;

    // --- PDF Header ---
    pdf.setFontSize(22).setFont('helvetica', 'bold');
    pdf.text('HealthSense Medical Report', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    pdf.setFontSize(12).setFont('helvetica', 'normal');
    pdf.text(`Patient: ${userName}`, margin, yPos);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPos, { align: 'right' });
    yPos += 7;
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const originalActiveTabs = { ...activeTabs };

    for (const metric of allMetricsWithData) {
        if (yPos > pageHeight - 80) { // Check for page break before new section
            pdf.addPage();
            yPos = margin;
        }

        const weeklyData = healthHistory[metric.name]?.filter(d => d.value > 0) || [];
        const monthlyData = healthHistoryMonth[metric.name]?.filter(d => d.value > 0) || [];

        const calculateStats = (data: HealthDataPoint[]) => {
            if (data.length === 0) return { avg: 'N/A', min: 'N/A', max: 'N/A' };
            const values = data.map(d => d.value);
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = (sum / values.length).toFixed(1);
            const min = Math.min(...values).toFixed(1);
            const max = Math.max(...values).toFixed(1);
            return { avg, min, max };
        };
        const weeklyStats = calculateStats(weeklyData);
        const monthlyStats = calculateStats(monthlyData);

        pdf.setFontSize(16).setFont('helvetica', 'bold');
        pdf.text(`${metric.name} Analysis`, margin, yPos);
        yPos += 8;

        pdf.setFontSize(11).setFont('helvetica', 'bold');
        pdf.text('Period', margin, yPos);
        pdf.text('Average', margin + 40, yPos);
        pdf.text('Minimum', margin + 70, yPos);
        pdf.text('Maximum', margin + 100, yPos);
        yPos += 6;
        pdf.setFont('helvetica', 'normal');
        pdf.text('Last 7 Days', margin, yPos);
        pdf.text(weeklyStats.avg, margin + 40, yPos);
        pdf.text(weeklyStats.min, margin + 70, yPos);
        pdf.text(weeklyStats.max, margin + 100, yPos);
        yPos += 6;
        pdf.text('Last 30 Days', margin, yPos);
        pdf.text(monthlyStats.avg, margin + 40, yPos);
        pdf.text(monthlyStats.min, margin + 70, yPos);
        pdf.text(monthlyStats.max, margin + 100, yPos);
        yPos += 10;

        let interpretation = 'AI analysis could not be generated for this metric.';
        if (weeklyData.length > 0 || monthlyData.length > 0) {
            try {
                const dataString = `Weekly data points for ${metric.name}: ${weeklyData.map(d => d.value).join(', ')}. Monthly data points: ${monthlyData.map(d => d.value).join(', ')}.`;
                
                const primaryVitalNames = MOCK_VITALS.map(v => v.name);
                const isPrimary = primaryVitalNames.includes(metric.name);
                
                let prompt = `Analyze the following health data for a section of a medical report on "${metric.name}". Provide a brief, professional, and objective interpretation based ONLY on the provided data, mentioning trends, averages, highs, and lows. Do not give a diagnosis or any medical advice. Stick strictly to interpreting the numbers provided.`;
                if (isPrimary) {
                  prompt += ` Normal ranges for context: Heart Rate 60-100 bpm, SpO2 95-100%, Blood Pressure < 120/80 mmHg (use the single value provided which is systolic), Temperature 36.5-37.5 C, Glucose 70-100 mg/dL.`;
                }
                prompt += ` The data is: ${dataString}`;

                const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
                interpretation = response.text;
            } catch (e) { console.error("AI interpretation failed", e); }
        }

        pdf.setFontSize(12).setFont('helvetica', 'bold');
        pdf.text('Interpretation:', margin, yPos);
        yPos += 6;
        pdf.setFontSize(10).setFont('helvetica', 'normal');
        const splitText = pdf.splitTextToSize(interpretation, usableWidth);
        pdf.text(splitText, margin, yPos);
        yPos += splitText.length * 4 + 6;

        const processView = async (view: 'Week' | 'Month', title: string) => {
            if (yPos > pageHeight - 80) { // Check for space for chart
                pdf.addPage();
                yPos = margin;
            }
            pdf.setFontSize(12).setFont('helvetica', 'bold');
            pdf.text(title, margin, yPos);
            yPos += 5;

            setActiveTabs(prev => ({ ...prev, [metric.name]: view }));
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const element = document.getElementById(`metric-report-${metric.name.replace(/\s+/g, '')}`);
            if (!element) return;
            
            const canvas = await (window as any).html2canvas(element.querySelector('.h-64'), { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const imgHeight = (canvas.height * usableWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', margin, yPos, usableWidth, imgHeight);
            yPos += imgHeight + 5;
        };

        if (weeklyData.length > 0) await processView('Week', 'Weekly Trend Chart');
        if (monthlyData.length > 0) await processView('Month', 'Monthly Trend Chart');
        yPos += 5;
    }
    
    // --- PDF Footer ---
    const finalPage = pdf.internal.getNumberOfPages();
    pdf.setPage(finalPage);
    pdf.setFontSize(8).setFont('helvetica', 'italic');
    const disclaimer = 'Disclaimer: This report is generated by HealthSense based on user-provided data and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.';
    const splitDisclaimer = pdf.splitTextToSize(disclaimer, usableWidth);
    pdf.text(splitDisclaimer, margin, pageHeight - 20);


    pdf.save(`HealthReport-${userName.replace(/\s+/g, '_')}-${new Date().toISOString().split('T')[0]}.pdf`);
    
    setActiveTabs(originalActiveTabs);
    setIsGenerating(false);
  };

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between">
        <div className="w-10"></div>
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Health Reports</h1>
        <button 
          onClick={handleDownload}
          disabled={isGenerating || allMetricsWithData.length === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Download Report"
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-text-dark-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          )}
        </button>
      </div>
      {isGenerating && <p className="text-center text-sm text-primary-blue mt-2">Generating Report, this may take a moment...</p>}
      
      <div className="mt-6 space-y-6">
        {allMetricsWithData.length > 0 ? (
          allMetricsWithData.map(metric => {
            const metricName = metric.name;
            const activeTab = activeTabs[metricName] || 'Week';
            const chartData = activeTab === 'Week' ? healthHistory[metricName] : healthHistoryMonth[metricName];
            const hexColor = getHexColor(metric.color);
            const gradientId = `gradient-${metric.name.replace(/\s+/g, '')}`;
            const metricId = `metric-report-${metric.name.replace(/\s+/g, '')}`;
            
            return (
              <div key={metricName} id={metricId} className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-text-dark-primary">{metricName}</h2>
                    <div className="flex bg-gray-100 rounded-full p-1 text-sm">
                        <button 
                          onClick={() => !isGenerating && setActiveTabs(prev => ({...prev, [metricName]: 'Week'}))} 
                          className={`px-4 py-1 rounded-full transition-colors ${activeTab === 'Week' ? 'bg-white shadow' : 'text-text-dark-secondary'}`}
                        >
                          Week
                        </button>
                        <button 
                          onClick={() => !isGenerating && setActiveTabs(prev => ({...prev, [metricName]: 'Month'}))} 
                          className={`px-4 py-1 rounded-full transition-colors ${activeTab === 'Month' ? 'bg-white shadow' : 'text-text-dark-secondary'}`}
                        >
                          Month
                        </button>
                    </div>
                </div>
                <HealthChart data={chartData} color={hexColor} gradientId={gradientId} />
              </div>
            );
          })
        ) : (
          <div className="bg-white p-5 mt-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-text-dark-primary">No Reports Available</h2>
            <p className="text-text-dark-secondary mt-2 text-sm">
              Add some data from the dashboard to see your health trends here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsScreen;