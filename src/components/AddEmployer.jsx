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
            <button onClick={handleOpenModal}>Create New Employer</button>

            {/* Modal */}
            {showModal && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h3>Add Employer</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Enter employer name:
                                <input
                                    type="text"
                                    name="employer"
                                    value={employerName}
                                    onChange={handleChange}
                                />
                            </label>
                            <div style={modalStyles.actions}>
                                <button type="submit">Add Employer</button>
                                <button type="button" onClick={handleCloseModal}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    actions: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default AddEmployer;
