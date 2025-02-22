import React, { useEffect, useState } from 'react';
import '../App.css'; // For styling

const Countdown = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCompleted(true);
        setShowBlur(true); // Show the blur overlay when countdown completes
      } else {
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Handle rating submission logic (e.g., save to backend)
  };

  const handleRestart = () => {
    
    setSubmitted(false);
    setShowBlur(false);
    
  };
  const handleStarClick = (starIndex) => {
    setRating(starIndex); // Set rating based on clicked star index
  };


  return (
    <div className="relative">
      {/* Countdown timer */}
        {!completed ? (
          <>
            <div className="text-3xl text-black font-mono mb-6">{timeLeft}</div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
          <h2 className="text-xl font-bold text-green-500 animate-bounce whitespace-nowrap">
            🎉Email Sent!🎉
          </h2>
        </div>
        )}
    </div>
  );
};

export default Countdown;
