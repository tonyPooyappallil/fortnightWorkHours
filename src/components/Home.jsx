import React, { useState, useEffect } from 'react';
import AddEmployer from './AddEmployer';
import AddShiftWorked from './AddShiftWorked';
import WorkHoursCalendar from './WorkHoursCalendar';
import { signOut } from "firebase/auth";
import { db, auth } from "./../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const [employer, setEmployer] = useState([]);
    const [workLog, setWorkLog] = useState([]);
    useEffect(() => {
        if (!user) return;

        let isMounted = true; // ✅ Prevent state update if component unmounts

        const fetchData = async () => {
            try {
                const employerRef = collection(db, "users", user.uid, "employers");
                const employerSnapshot = await getDocs(employerRef);
                const employerList = employerSnapshot.docs.map(doc => doc.data().name);

                const workLogRef = collection(db, "users", user.uid, "workLog");
                const workLogSnapshot = await getDocs(workLogRef);
                const workLogList = workLogSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (isMounted) {
                    setEmployer(employerList);
                    setWorkLog(workLogList);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // ✅ Ensures async functions run properly

        return () => {
            isMounted = false; // ✅ Cleanup to avoid memory leaks
        };
    }, [user]);



    const addEmployer = async (newEmployer) => {


        try {

            if (user) {
                const employerRef = collection(db, "users", user.uid, "employers");

                await addDoc(employerRef, { name: newEmployer });
                setEmployer(prevEmployers => [...prevEmployers, newEmployer]);
                alert('Employer added!');
            } else {
                alert('No user logged in.');
            }
        } catch (error) {
            alert('Failed to add employer.');
        }

    };



    const addWorkLog = async (newShift) => {

        if (!user) {
            console.error("No user logged in. Cannot add work log.");
            alert("You must be logged in to add a work log.");
            return;
        }

        // Check if required fields are provided
        if (!newShift.employer || !newShift.hours || !newShift.date) {
            console.error("Missing required fields: employer, hours, or date");
            alert("Employer, hours worked, and date are required.");
            return;
        }

        // Ensure that hours is a valid number
        if (isNaN(newShift.hours) || newShift.hours <= 0) {
            console.error("Invalid hours value:", newShift.hours);
            alert("Please provide a valid positive number for hours worked.");
            return;
        }

        // Ensure date is in valid format (you can extend this logic to use a specific date format if needed)
        const shiftDate = new Date(newShift.date);
        if (isNaN(shiftDate.getTime())) {
            console.error("Invalid date format:", newShift.date);
            alert("Please provide a valid date.");
            return;
        }

        try {
            // Proceed with adding the work log to Firestore
            const workLogRef = collection(db, "users", user.uid, "workLog");
            const docRef = await addDoc(workLogRef, newShift);

            // Attach Firestore document ID to the newShift
            const newShiftWithId = { id: docRef.id, ...newShift };

            // Update the local state to include the new shift
            setWorkLog(prevWorkLog => [...prevWorkLog, newShiftWithId]); // Uses functional state update

        } catch (error) {
            console.error("Error adding work log:", error);
            alert("Failed to add work log. Please try again.");
        }
    };



    // Function to clear all data
    const clearAllData = async () => {
        // Ask for user confirmation before proceeding with clearing data
        const isConfirmed = window.confirm(
            "Are you sure you want to clear all data? This will remove all employers and work logs permanently."
        );

        if (isConfirmed) {
            if (user) {
                const employerRef = collection(db, "users", user.uid, "employers");
                const workLogRef = collection(db, "users", user.uid, "workLog");

                const employerSnapshot = await getDocs(employerRef);
                employerSnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });

                const workLogSnapshot = await getDocs(workLogRef);
                workLogSnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });

                // Reset local state after data is cleared
                setEmployer([]);
                setWorkLog([]);
                alert('All data has been cleared!');
            }
        } else {
            console.log('Clear data action canceled.');
        }
    };



    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
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
        footer: {
            textAlign: 'center',
            padding: '10px',
            position: 'absolute',
            bottom: '0',
            width: '90%',
            backgroundColor: '#fff',
            color: '#333',
            fontSize: '14px',
        },
        formSection: {
            marginTop: '30px',
        },
        sectionContainer: {
            flex: '1 1 400px',
            borderRadius: '8px',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <div>
                <button
                    onClick={clearAllData}
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Clear All Data
                </button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>
                <h1 style={styles.header}>Fortnight Work Hour Calculator</h1>
            </div>

            {/* Form Section with AddEmployer and AddShiftWorked side by side */}
            <div style={styles.formSection}>
                <div style={styles.sectionContainer}>
                    <AddEmployer employerList={employer} setEmployer={addEmployer} />
                </div>
                <div style={styles.sectionContainer}>
                    <AddShiftWorked employerList={employer} workLog={workLog} setWorkLog={addWorkLog} />
                </div>
            </div>

            <h2 style={styles.sectionTitle}>Fortnight Starting Last Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={-7} setWorkLog={addWorkLog} />

            <h2 style={styles.sectionTitle}>Fortnight Ending Next Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={0} />

            {/* Footer Section */}
            <footer style={styles.footer}>
                © {new Date().getFullYear()} Tony Pooyappallil. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
