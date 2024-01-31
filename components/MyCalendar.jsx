'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useRouter} from 'next/navigation'

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [usageDates, setUsageDates] = useState([]);
    
    const router = useRouter(); // create a instance of use router

    const handleSelectSlot = ({ start }) => {
        // Format the selected date
        const selectedDate = moment(start).format('YYYY-MM-DD');

        // Check if the selected date has usage data
        if (!usageDates.includes(selectedDate)) {
            alert('No usage data for this date.');
            return;
        }

        // Navigate to the route with the selected date
        router.push(`/usage/${selectedDate}`);
    };

useEffect(() => {
    async function fetchUsageData() {
        const response = await fetch('http://localhost:3000/api/usage');
        const data = await response.json();
        const utcEvents = data.map(event => {
            // Adjust the date to account for the time zone offset
            const date = new Date(event.start);
            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
            return {
                ...event,
                start: new Date(date.getTime() + userTimezoneOffset),
                end: new Date(date.getTime() + userTimezoneOffset)
            };
        });
        setEvents(utcEvents);

        // Adjust the usageDates array
        const dates = utcEvents.map(event => moment(event.start).format('YYYY-MM-DD'));
        setUsageDates(dates);
    }

    fetchUsageData();
}, []);


    const dayPropGetter = (date) => {
        const currentDate = moment().startOf('day');
        const usageDate = moment(date).format('YYYY-MM-DD');

        let style = {};
            if (usageDate === currentDate.format('YYYY-MM-DD')) {
                // Style for the current date
                style.backgroundColor = '#b2fab4';
            }
            if (usageDates.includes(usageDate)) {
                // Special class for dates with part usage
                style.className = 'part-used-date';
            }
        return { style };
    };

    return (
        <div className='m-5 border-4'>
        CALENDER COMPONENT
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            dayPropGetter={dayPropGetter}
            onSelectSlot={handleSelectSlot}
            selectable={true} // Make sure to set this to true
        />
        </div>
    );
}

export default MyCalendar;

