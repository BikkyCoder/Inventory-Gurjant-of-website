import React, { useState } from 'react';

function ProfileModal({ isOpen, onClose, userInfo, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userInfo?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveName = async () => {
    if (editedName.trim() === '') {
      alert('Username cannot be empty');
      return;
    }
    
    setIsSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: editedName })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdateProfile(data.user);
        setIsEditing(false);
        alert('Username updated successfully!');
      } else {
        alert('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating username');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-gray-800 text-white rounded-lg p-8 w-96 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : userInfo?.email.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Email */}
        <div className="mb-6 bg-gray-700 rounded-lg p-4">
          <label className="text-sm text-gray-300">Email</label>
          <p className="text-white font-medium mt-1">{userInfo?.email}</p>
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="text-sm text-gray-300">Username</label>
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none transition"
              placeholder="Enter your username"
              autoFocus
            />
          ) : (
            <p className="text-white font-medium mt-1 bg-gray-700 rounded-lg p-3">{userInfo?.name || 'Not set'}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveName}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-600"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(userInfo?.name || '');
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Username
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
