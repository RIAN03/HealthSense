
import React, { useState, useRef } from 'react';
import { View, Gender } from '../types';
import { ICONS } from '../constants';

interface EditProfileScreenProps {
    setView: (view: View) => void;
    currentUser: { name: string; age: string; gender: Gender; photo: string | null; } | null;
    onSave: (name: string, age: string, gender: Gender, photo: string | null) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ setView, currentUser, onSave }) => {
    const [name, setName] = useState(currentUser?.name || '');
    const [age, setAge] = useState(currentUser?.age || '');
    const [gender, setGender] = useState<Gender | ''>(currentUser?.gender || '');
    const [photo, setPhoto] = useState<string | null>(currentUser?.photo || null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUploadClick = () => {
        if (isLoading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (name.trim() && age.trim() && gender && !isLoading) {
            setIsLoading(true);
            await onSave(name.trim(), age.trim(), gender, photo);
        }
    };

    return (
        <div className="flex flex-col h-full bg-light-bg">
            <header className="flex items-center p-4 border-b bg-white shadow-sm">
                <button onClick={() => setView('profile')} className="p-2 rounded-lg hover:bg-gray-100">
                    <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
                </button>
                <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Edit Profile</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 flex flex-col">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    {photo ? (
                        <img
                            src={photo}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-primary-blue/10 flex items-center justify-center">
                            <ICONS.Profile className="w-16 h-16 text-primary-blue/50" />
                        </div>
                    )}
                    <button
                        onClick={handlePhotoUploadClick}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white shadow-md hover:bg-primary-blue/90 transition-transform transform hover:scale-110"
                        aria-label="Upload photo"
                        disabled={isLoading}
                    >
                        <ICONS.Plus className="w-6 h-6" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        disabled={isLoading}
                    />
                </div>
                
                <div className="space-y-4 text-left">
                    <div>
                        <label htmlFor="name-edit" className="block text-sm font-medium text-text-dark-secondary mb-1">
                            Name
                        </label>
                        <input
                            id="name-edit"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full p-4 border rounded-xl bg-white text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-blue disabled:bg-gray-100"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="age-edit" className="block text-sm font-medium text-text-dark-secondary mb-1">
                            Age
                        </label>
                        <input
                            id="age-edit"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            className="w-full p-4 border rounded-xl bg-white text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-blue disabled:bg-gray-100"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-dark-secondary mb-2">
                            Gender
                        </label>
                        <div className="flex justify-between space-x-2">
                            {(['male', 'female', 'other'] as Gender[]).map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGender(g)}
                                    disabled={isLoading}
                                    className={`w-full py-3 border rounded-xl font-semibold transition-colors capitalize ${
                                        gender === g
                                            ? 'bg-primary-blue text-white border-primary-blue'
                                            : 'bg-white text-text-dark-primary border-gray-200'
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || !age.trim() || !gender || isLoading}
                        className="w-full bg-primary-blue text-white py-4 rounded-full font-bold text-lg disabled:bg-gray-400 transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Saving...
                            </>
                        ) : 'Save Changes'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EditProfileScreen;
