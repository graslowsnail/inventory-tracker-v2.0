'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { AddPartModal } from '@/components';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useRouter} from 'next/navigation'

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const router = useRouter(); // create a instance of use router
    const inputRef = useRef(null); // creates a ref for the input
    const [events, setEvents] = useState([]);
    const [usageDates, setUsageDates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [barCodeId, setBarCodeId] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('');



const handleSelectSlot = async ({ start }) => {
    // Format the selected date
    const formattedDate = moment(start).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

    // Attempt to fetch usage data for the selected date
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usage/${formattedDate}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Usage data not found');
        }
        const data = await response.json();
        if (data && data.partsUsed && data.partsUsed.length > 0) {
            // Check if partsUsed contains valid part references
            // Navigate or process data as needed
            router.push(`/protected/usage/${formattedDate}`);
        } else {
            // Handle case where part data might be missing or usage is empty
            setIsModalOpen(true);
        }
    } catch (error) {
        console.error('Error fetching usage data:', error);
        // Handle the error (e.g., display a message or redirect)
        setErrorMessage('The part data for this date is no longer available.');
    }
};
    const handleSave = async (barCodeId, date) => {
        // Implement the save functionality here
        // This involves making an API call to add the part to the usage document
        console.log("Saving", barCodeId, "for date", date);
        // After saving, fetch the updated usage data
        handleAddPart(barCodeId,date);
    };

    const fetchUsageData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usage`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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

      const handleAddPart = async (barCodeId, date) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usage/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ barCodeId, date}),
            });

            if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Error adding part');
            return;
        }

          // reset the input field and refoucus
          setBarCodeId('');
            setErrorMessage('');

          // Re-fetch usage data to update the count
            fetchUsageData();
          console.log('bar code id scaned correctly '+ barCodeId);

            router.push(`/protected/usage/${date}`);

        } catch (error) {
            setErrorMessage('A part with this barcode was not found: Try again');
          console.error(error.message + 'FUCK');
          setBarCodeId('');
            // Handle the error state here
        }
    };


useEffect(() => {
    fetchUsageData();
}, []); // Empty dependency array means this useEffect runs once when the component mounts

    const navigateToToday = () => {
    setCurrentDate(new Date());
};

const navigateBack = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
};

const navigateNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
};


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
        <div className='m-5 text-center'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                dayPropGetter={dayPropGetter}
                onSelectSlot={handleSelectSlot}
                selectable={true} // Make sure to set this to true
                date={currentDate}
                onNavigate={setCurrentDate}
                views={['month']}
            />

            <AddPartModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                selectedDate={selectedDate}
            />
            {/* Error message display */}
            {errorMessage && (
            <div className="mt-4 text-red-500">
                {errorMessage}
            </div>
            )}

        </div>
    );
}

export default MyCalendar;

