import React, { useState, useEffect } from 'react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

const App = () => { 
  const [reminders, setReminders] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState('Custom'); // Set initial template to 'Custom'
  const [emailPrompt, setEmailPrompt] = useState(''); // New state to store email prompt

  // Load reminders from Local Storage when the app loads
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders'));
    if (savedReminders) setReminders(savedReminders);
  }, []);

  // Save reminders to Local Storage when they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Function to add a new reminder
  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
    setCurrentView('list'); // Navigate to list after adding
  };

  // Handle tile click to select email type
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template); // Automatically set the selected template
    setCurrentView('form'); // Navigate to the form view after template selection
  };

  // Handle change in email prompt input
  const handlePromptChange = (e) => {
    setEmailPrompt(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="p-0">
        {/* Dashboard View - Template Selection */}
              
        {currentView === 'dashboard' && (
          <Dashboard onSelectTemplate={handleTemplateSelect} />
        )}

        {/* Form View - Reminder Creation with Selected Template */}
        {currentView === 'form' && (
          <div className="p-0">
            {/* Text Input for Email Generation */}
            
            <ReminderForm
              onAddReminder={addReminder}
              templateType={selectedTemplate} // Pass selected template to the form
              generatedEmail={emailPrompt} // Pass generated email prompt to the form
            />
          </div>
        )}

        {/* List View - View All Scheduled Emails */}
        {currentView === 'list' && (
          <div className="">
            <ReminderList reminders={reminders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
