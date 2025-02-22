import React, { useEffect, useState } from 'react';
import { getReminders } from '../services/api';
import Countdown from './Countdown'; // Import the Countdown component

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch reminders from API and sync with local storage
  const fetchReminders = async () => {
    try {
      const response = await getReminders();
      const remindersData = response.data;
      setReminders(remindersData);
      localStorage.setItem('reminders', JSON.stringify(remindersData)); // Save to local storage
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setError('Failed to load reminders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load reminders from local storage on initial render
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders'));
    if (savedReminders) {
      setReminders(savedReminders);
    }
    fetchReminders();
  }, []);

  // Delete a reminder by ID
  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder._id !== id);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders)); // Update local storage
  };

  if (loading) {
    return <p className="text-white text-center">Loading reminders...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen p-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Scheduled Emails</h1>
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-white ">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Date/Time</th>
              <th className="py-4 px-6 text-right">Time Remaining</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr
                key={reminder._id}
                className="border-b border-white/10 hover:bg-white/5 transition-all duration-200"
              >
                <td className="py-4 px-6">{reminder.title}</td>
                <td className="py-4 px-6">{reminder.description}</td>
                <td className="py-4 px-6">{reminder.email}</td>
                <td className="py-4 px-6">{new Date(reminder.dateTime).toLocaleString()}</td>
                <td className="py-4 px-6 text-right">
                  <Countdown targetTime={new Date(reminder.dateTime)} />
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => deleteReminder(reminder._id)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReminderList;