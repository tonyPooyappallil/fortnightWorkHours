import React, { useEffect } from 'react';
import { deleteOldLogs } from '../utils';

const WorkHoursCalendar = ({ workLog, startDateOffsetWeeks, setWorkLog }) => {
    const generateDates = (startDateOffsetWeeks) => {
        const now = new Date();

        // Get Monday of the current week
        const dayOfWeek = now.getDay();
        const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to previous Monday
        const currentMonday = new Date(now);
        currentMonday.setDate(now.getDate() + daysToMonday);

        // Calculate the starting Monday for the fortnight
        const startDate = new Date(currentMonday);
        startDate.setDate(currentMonday.getDate() + startDateOffsetWeeks);
        startDate.setHours(0, 0, 0, 0);

        // Generate 14 days of dates
        const dates = [];
        for (let i = 0; i < 14; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates(startDateOffsetWeeks);

    useEffect(() => {
        if (setWorkLog) {
            deleteOldLogs(dates[0], workLog, setWorkLog);
        }
    }, [new Date().toLocaleDateString()]); // Re-run only when these dependencies change

    const getLogsForDate = (date) => {
        const logDateString = date.toLocaleDateString('en-CA'); // Outputs YYYY-MM-DD format
        return workLog.filter((log) => {
            const logDateFormatted = new Date(log.date).toLocaleDateString('en-CA');
            return logDateFormatted === logDateString;
        });
    };

    const getTotalHoursByEmployer = () => {
        const totals = {};
        const fortnightStart = dates[0];
        const fortnightEnd = dates[dates.length - 1];

        workLog
            .filter((log) => {
                const logDate = new Date(log.date);
                return logDate >= fortnightStart && logDate <= fortnightEnd;
            })
            .forEach((log) => {
                if (!totals[log.employer]) {
                    totals[log.employer] = 0;
                }
                totals[log.employer] += log.hours;
            });

        return totals;
    };

    const calculateTotalFortnightHours = () => {
        const fortnightStart = dates[0];
        const fortnightEnd = dates[dates.length - 1];
        return workLog
            .filter((log) => {
                const logDate = new Date(log.date);
                return logDate >= fortnightStart && logDate <= fortnightEnd;
            })
            .reduce((total, log) => total + log.hours, 0);
    };

    const totalHoursByEmployer = getTotalHoursByEmployer();
    const totalFortnightHours = calculateTotalFortnightHours();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Work Hours Calendar</h2>
            <div style={styles.calendarGrid}>
                {dates.map((date, index) => {
                    const logsForDate = getLogsForDate(date);
                    return (
                        <div key={index} style={styles.dayCard}>
                            <strong>{date.toLocaleDateString()}</strong>
                            {logsForDate.length > 0 ? (
                                logsForDate.map((log, i) => (
                                    <div key={i} style={styles.logEntry}>
                                        <span style={styles.employerName}>{log.employer}:</span> {log.hours} hrs
                                    </div>
                                ))
                            ) : (
                                <div style={styles.noLog}>No work logged</div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div style={styles.summaryContainer}>
                <h3 style={styles.summaryTitle}>Total Hours Summary</h3>
                <div style={styles.totalHoursSummary}>
                    <h4>Hours Worked This Fortnight:
                        <span style={styles.totalHours}> {totalFortnightHours} hrs</span>
                    </h4>
                    <h4 style={styles.hoursByEmployerTitle}>Hours by Employer:</h4>
                    {Object.entries(totalHoursByEmployer).map(([employer, hours], index) => (
                        <div key={index} style={styles.employerHours}>
                            <strong>{employer}</strong>: {hours} hrs
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Styling
const styles = {
    container: {
        margin: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '15px',
    },
    calendarGrid: {
        display: 'flex',
        flexWrap: 'wrap', // Allow items to wrap onto the next row
        justifyContent: 'space-between',
        gap: '5px',
    },
    dayCard: {
        minWidth: '80px', // Set minimum width for the day card to fit the date
        maxWidth: '120px', // Optional: max width to prevent it from expanding too much
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    logEntry: {
        marginTop: '5px',
        fontSize: '14px',
        color: '#333',
    },
    employerName: {
        fontWeight: 'bold',
        color: '#0073e6',
    },
    noLog: {
        fontSize: '12px',
        color: '#888',
        fontStyle: 'italic',
    },
    summaryContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    },
    summaryTitle: {
        fontSize: '20px',
        marginBottom: '10px',
        color: '#333',
    },
    totalHoursSummary: {
        marginTop: '10px',
    },
    totalHours: {
        fontWeight: 'bold',
        color: '#2c7ed3',
    },
    hoursByEmployerTitle: {
        marginTop: '10px',
        fontSize: '16px',
        color: '#333',
    },
    employerHours: {
        fontSize: '16px',
        marginTop: '5px',
        fontWeight: 'bold',
        color: '#555',
    },

};

export default WorkHoursCalendar;
