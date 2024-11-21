import React, { useState } from 'react';
import AddEmployer from './AddEmployer';
import AddShiftWorked from './AddShiftWorked';

const Home = () => {
    const [employer, setEmployer] = useState([]);
    const [workLog, setWorkLog] = useState([]);

    // Calculate hours worked for each fortnight
    const calculateFortnightHours = (startDateOffsetWeeks) => {
        const now = new Date();

        // Get the Monday of the current week
        const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
        const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to previous Monday
        const currentMonday = new Date(now);
        currentMonday.setDate(now.getDate() + daysToMonday);

        // Adjust to the starting Monday of the target fortnight
        const startDate = new Date(currentMonday);
        startDate.setDate(currentMonday.getDate() + startDateOffsetWeeks * 7);

        // Calculate the end date (14 days from the start date)
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 14);

        // Filter and sum the hours worked within the fortnight
        const fortnightHours = workLog
            .filter((log) => {
                const logDate = new Date(log.date);
                return logDate >= startDate && logDate < endDate;
            })
            .reduce((total, log) => total + log.hours, 0);

        return fortnightHours;
    };


    return (
        <div>
            <h1>Fortnight Work Hour Calculator</h1>
            <AddEmployer employerList={employer} setEmployer={setEmployer} />
            <AddShiftWorked employerList={employer} workLog={workLog} setWorkLog={setWorkLog} />
            <div>
                <h2>Hours Worked</h2>
                <h3>Fortnight Starting Last Week</h3>
                <div>{calculateFortnightHours(-7)}</div>
                <h3>Fortnight Ending Next Week</h3>
                <div>{calculateFortnightHours(0)}</div>
            </div>
        </div>
    );
};

export default Home;
