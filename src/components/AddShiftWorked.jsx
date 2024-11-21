import React, { useState } from 'react';

const AddShiftWorked = ({ employerList, workLog, setWorkLog }) => {
    const [selectedEmployer, setSelectedEmployer] = useState('');
    const [shiftHours, setShiftHours] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'employer') {
            setSelectedEmployer(value);
        } else if (name === 'hours') {
            setShiftHours(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedEmployer || !shiftHours) {
            alert('Please select an employer and enter the hours worked.');
            return;
        }

        // Log or store the shift data
        const newShift = {
            employer: selectedEmployer,
            hours: parseFloat(shiftHours),
            date: new Date().toISOString(), // Store in ISO format
        };
        setWorkLog([...workLog, newShift]);

        // Reset form fields
        setSelectedEmployer('');
        setShiftHours('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Employer:
                    <select
                        name="employer"
                        value={selectedEmployer}
                        onChange={handleChange}
                    >
                        <option value="">--Select an Employer--</option>
                        {employerList.map((employer, index) => (
                            <option key={index} value={employer}>
                                {employer}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Hours Worked:
                    <input
                        type="number"
                        name="hours"
                        value={shiftHours}
                        onChange={handleChange}
                        placeholder="Enter hours worked"
                        min="0"
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Shift</button>
            </form>
        </div>
    );
};

export default AddShiftWorked;
