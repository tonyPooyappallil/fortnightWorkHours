import React, { useState, useEffect } from 'react';
import AddEmployer from './AddEmployer';
import AddShiftWorked from './AddShiftWorked';
import WorkHoursCalendar from './WorkHoursCalendar';

const Home = () => {
    const [employer, setEmployer] = useState(() => {
        return JSON.parse(localStorage.getItem('employer')) || [];
    });
    const [workLog, setWorkLog] = useState(() => {
        return JSON.parse(localStorage.getItem('workLog')) || [];
    });

    // Sync employer state with local storage
    useEffect(() => {
        localStorage.setItem('employer', JSON.stringify(employer));
    }, [employer]);

    // Sync workLog state with local storage
    useEffect(() => {
        localStorage.setItem('workLog', JSON.stringify(workLog));
    }, [workLog]);

    // Function to clear all data
    const clearAllData = () => {
        // Clear state data
        setEmployer([]);
        setWorkLog([]);

        // Clear local storage
        localStorage.removeItem('employer');
        localStorage.removeItem('workLog');
    };

    // Styling
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            padding: '30px',
            minHeight: '100vh',
            position: 'relative',
        },
        button: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
            zIndex: 10,
        },
        buttonHover: {
            backgroundColor: '#cc0000',
        },
        header: {
            textAlign: 'center',
            marginTop: '30px',
            marginBottom: '20px',
            color: '#333',
            fontSize: '30px',
        },
        sectionTitle: {
            fontSize: '24px',
            marginBottom: '10px',
            color: '#444',
        },
        content: {
            textAlign: 'center',
        },
        formSection: {

            marginTop: '30px',
        },
        sectionContainer: {
            flex: '1 1 400px', // Allow the forms to grow and shrink, with a base width of 400px
            borderRadius: '8px',
            marginBottom: '20px', // Add space between forms when wrapping
        },
        headerSmall: {
            fontSize: '24px', // Smaller header for small screens
        },
        sectionTitleSmall: {
            fontSize: '20px', // Smaller section title for small screens
        },
    };

    return (
        <div style={styles.container}>
            <div><button
                onClick={clearAllData}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
                Clear All Data
            </button></div>
            <div>            <h1 style={styles.header}>Fortnight Work Hour Calculator</h1>
            </div>

            {/* Form Section with AddEmployer and AddShiftWorked side by side */}
            <div style={styles.formSection}>
                <div style={styles.sectionContainer}>
                    <AddEmployer employerList={employer} setEmployer={setEmployer} />
                </div>
                <div style={styles.sectionContainer}>
                    <AddShiftWorked employerList={employer} workLog={workLog} setWorkLog={setWorkLog} />
                </div>
            </div>

            <h2 style={styles.sectionTitle}>Fortnight Starting Last Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={-7} />

            <h2 style={styles.sectionTitle}>Fortnight Ending Next Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={0} />
        </div>
    );
};

export default Home;
