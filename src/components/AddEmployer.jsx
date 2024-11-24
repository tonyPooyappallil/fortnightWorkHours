import React, { useState } from 'react';

function AddEmployer({ employerList, setEmployer }) {
    const [employerName, setEmployerName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setEmployerName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (employerName.trim() === '') {
            alert('Employer name cannot be empty.');
            return;
        }
        setEmployer([...employerList, employerName]); // Add new employer to the list
        setEmployerName(''); // Clear the input field
        setShowModal(false); // Close the modal after adding the employer
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {/* Button to open the modal */}
            <div style={styles.buttonContainer}>
                <button onClick={handleOpenModal} style={styles.button}>
                    Create New Employer
                </button>

            </div>
            {/* Modal */}
            {showModal && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h3 style={styles.modalHeader}>Add Employer</h3>
                        <form onSubmit={handleSubmit}>
                            <label style={styles.label}>
                                Enter employer name:
                                <input
                                    type="text"
                                    name="employer"
                                    value={employerName}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </label>
                            <div style={modalStyles.actions}>
                                <button type="submit" style={styles.submitButton}>
                                    Add Employer
                                </button>
                                <button type="button" onClick={handleCloseModal} style={styles.cancelButton}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Basic inline styles for modal (you can replace this with CSS)
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better contrast
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        background: '#fff',
        padding: '15px', // Reduced padding
        borderRadius: '8px',
        width: '300px', // Further reduced width for a more compact modal
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    actions: {
        marginTop: '10px', // Adjusted for tighter spacing
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
};

// Styling for other elements
const styles = {
    button: {
        padding: '10px 18px', // Reduced padding for button
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px', // Slightly smaller font size
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    modalHeader: {
        fontSize: '18px', // Reduced font size for the header
        marginBottom: '10px',
        color: '#333',
    },
    label: {
        marginBottom: '8px', // Reduced margin for compactness
        fontSize: '14px', // Smaller font size for label
        color: '#333',
    },
    input: {
        width: '90%', // Reduced width for a narrower input field
        padding: '8px',
        fontSize: '14px', // Smaller font size
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginTop: '5px',
        marginBottom: '15px', // Reduced margin
    },
    submitButton: {
        padding: '8px 12px', // Reduced padding for submit button
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
    cancelButton: {
        padding: '8px 12px', // Reduced padding for cancel button
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
};

export default AddEmployer;
