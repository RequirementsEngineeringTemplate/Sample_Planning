import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';

const Scheduler = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);


  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('scheduler-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('scheduler-events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setSelectedDate(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? eventData : event
      ));
    } else {
      // Add new event
      setEvents([...events, eventData]);
    }
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleCancelForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };



  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const dayStyle = {
      border: '1px solid #e0e0e0',
      minHeight: '100px',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: 'white',
      position: 'relative',
    };

    const otherMonthStyle = {
      ...dayStyle,
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
    };

    const todayStyle = {
      ...dayStyle,
      backgroundColor: '#e3f2fd',
      fontWeight: 'bold',
    };

    const eventStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '2px 4px',
      margin: '2px 0',
      borderRadius: '3px',
      fontSize: '12px',
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ 
            padding: '12px', 
            backgroundColor: '#f8f9fa', 
            fontWeight: 'bold',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
          }}>
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === month;
          const isToday = day.getTime() === today.getTime();
          const dayEvents = getEventsForDate(day);

          let style = dayStyle;
          if (!isCurrentMonth) style = otherMonthStyle;
          if (isToday) style = todayStyle;

          return (
            <div
              key={index}
              style={style}
              onClick={() => handleDateClick(day)}
            >
              <div style={{ marginBottom: '4px' }}>{day.getDate()}</div>
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  style={eventStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditEvent(event);
                  }}
                  title={`${event.title}${event.time ? ` at ${event.time}` : ''}${event.description ? ` - ${event.description}` : ''}`}
                >
                  {event.time && `${event.time} `}{event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    const dayStyle = {
      border: '1px solid #e0e0e0',
      minHeight: '200px',
      padding: '12px',
      cursor: 'pointer',
      backgroundColor: 'white',
    };

    const eventStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '4px 8px',
      margin: '4px 0',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div key={index} style={dayStyle} onClick={() => handleDateClick(day)}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px',
                backgroundColor: isToday ? '#e3f2fd' : 'transparent',
                padding: '4px',
                borderRadius: '4px'
              }}>
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  style={eventStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditEvent(event);
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {event.time && `${event.time} `}{event.title}
                  </div>
                  {event.description && (
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const activeViewButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>
            {view === 'month' 
              ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            }
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigateDate(-1)}
            style={buttonStyle}
          >
            ‹ Previous
          </button>
          <button
            onClick={goToToday}
            style={buttonStyle}
          >
            Today
          </button>
          <button
            onClick={() => navigateDate(1)}
            style={buttonStyle}
          >
            Next ›
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setView('month')}
            style={view === 'month' ? activeViewButtonStyle : buttonStyle}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            style={view === 'week' ? activeViewButtonStyle : buttonStyle}
          >
            Week
          </button>
        </div>
        
        <button
          onClick={handleAddEvent}
          style={primaryButtonStyle}
        >
          + Add Event
        </button>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '1px', borderRadius: '4px' }}>
        {view === 'month' ? renderMonthView() : renderWeekView()}
      </div>

      {showEventForm && (
        <EventForm
          event={selectedEvent}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onCancel={handleCancelForm}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Scheduler;