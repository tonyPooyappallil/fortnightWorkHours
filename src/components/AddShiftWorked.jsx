import React, { useState } from 'react';

const AddShiftWorked = ({ employerList, workLog, setWorkLog }) => {
    const [selectedEmployer, setSelectedEmployer] = useState('');
    const [shiftHours, setShiftHours] = useState('');
    const [shiftDate, setShiftDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'employer') {
            setSelectedEmployer(value);
        } else if (name === 'hours') {
            setShiftHours(value);
        } else if (name === 'date') {
            setShiftDate(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedEmployer || !shiftHours || !shiftDate) {
            alert('Please fill out all fields.');
            return;
        }

        // Log or store the shift data
        const newShift = {
            employer: selectedEmployer,
            hours: parseFloat(shiftHours),
            date: shiftDate, // Use the selected date
        };
        setWorkLog(newShift);

        // Reset form fields
        setSelectedEmployer('');
        setShiftHours('');
        setShiftDate(new Date().toISOString().split('T')[0]); // Reset to today's date
    };

    // Styling
    const styles = {
        formContainer: {
            margin: '20px auto',
            padding: '16px', // Increased padding around the form
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '220px', // Narrow form container
            maxWidth: '100%',
        },
        heading: {
            fontSize: '18px', // Increased heading font size for better visibility
            marginBottom: '12px', // Reduced margin
            color: '#333',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        label: {
            display: 'block',
            marginBottom: '5px', // Reduced margin
            fontSize: '14px', // Increased label font size for better readability
            fontWeight: 'bold',
        },
        input: {
            width: '180px', // Reduced width for input fields
            padding: '6px', // Increased padding for better input interaction
            marginBottom: '5px', // Reduced margin
            fontSize: '14px', // Increased font size for input fields
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        select: {
            width: '180px', // Reduced width for select dropdown
            padding: '6px', // Increased padding for better select interaction
            marginBottom: '5px', // Reduced margin
            fontSize: '14px', // Increased font size for select dropdown
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        option: {
            fontSize: '14px', // Increased font size for options in select
        },
        button: {
            width: '100%',
            padding: '8px', // Increased padding for better button interaction
            fontSize: '16px', // Increased font size for button
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.heading}>Add New Shift Log</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Select Employer:
                    <select
                        name="employer"
                        value={selectedEmployer}
                        onChange={handleChange}
                        style={styles.select}
                    >
                        <option value="">--Select an Employer--</option>
                        {employerList.map((employer, index) => (
                            <option key={index} value={employer} style={styles.option}>
                                {employer}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label style={styles.label}>
                    Date of Work:
                    <input
                        type="date"
                        name="date"
                        value={shiftDate}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>

                <br />
                <label style={styles.label}>
                    Hours Worked:
                    <input
                        type="number"
                        name="hours"
                        value={shiftHours}
                        onChange={handleChange}
                        placeholder="Enter hours worked"
                        min="0"
                        step="any" // Allows decimals
                        required
                        style={styles.input}
                    />
                </label>
                <br />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Shift
                </button>
            </form>
        </div>
    );
};

export default AddShiftWorked;
