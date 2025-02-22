import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PreviewMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, title, description, dateTime } = location.state || {};

  if (!email || !title || !description || !dateTime) {
    return <p className="text-center text-white mt-10">No message to preview.</p>;
  }

  return (
    <div className="min-h-screen p-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Preview Email</h2>

        <div className="mb-4">
          <p className="text-sm font-bold">Recipient Email:</p>
          <p>{email}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold">Title:</p>
          <p>{title}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold">Description:</p>
          <p>{description}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold">Scheduled Date & Time:</p>
          <p>{dateTime}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate(-1)} className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600">Edit</button>
          <button onClick={() => navigate('/confirm', { state: { email, title, description, dateTime } })} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Confirm & Send</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewMessage;
