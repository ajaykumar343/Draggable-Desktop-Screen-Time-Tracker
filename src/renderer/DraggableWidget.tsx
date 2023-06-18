import React, { useEffect, useState } from 'react';
import './App.css';

function DraggableWidget() {
  const [screenTime, setScreenTime] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;
    let idleTimer;

    // Start the timer to track screen time
    const startTimer = () => {
      timer = setInterval(() => {
        setScreenTime(prevTime => prevTime + 1);
      }, 1000);
    };

    // Reset the idle timer after a specified time of inactivity
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
        clearInterval(timer);
      }, 60000); // 1 minute of inactivity
    };

    // Handle user activity to reset idle state and timers
    const handleUserActivity = () => {
      setIsIdle(false);
      resetIdleTimer();
      if (!timer) {
        startTimer();
      } else {
        clearInterval(timer);
        startTimer();
      }
    };

    // Add event listeners to track user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    // Start the timer and idle timer on component mount
    startTimer();
    resetIdleTimer();

    // Cleanup by clearing the timers and removing event listeners on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(idleTimer);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  // Format the screen time into hh:mm:ss format
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${remainingSeconds}`;
  }
  return (
    <div draggable="true">
      {isIdle ? <>Idle: {formatTime(screenTime)}</> : formatTime(screenTime)}
    </div>
  );
}

export default DraggableWidget;
