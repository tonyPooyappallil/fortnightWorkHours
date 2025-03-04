import React, { useState, useEffect } from 'react';
import AddEmployer from './AddEmployer';
import AddShiftWorked from './AddShiftWorked';
import WorkHoursCalendar from './WorkHoursCalendar';
import { signOut } from "firebase/auth";
import { db, auth } from "./../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [employer, setEmployer] = useState([]);
    const [workLog, setWorkLog] = useState([]);
    console.log("user", user);

    useEffect(() => {
        if (!user) return;

        let isMounted = true;

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

        fetchData();
        return () => { isMounted = false; };
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };


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



    const clearAllData = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to clear all data? This will remove all employers and work logs permanently."
        );

        if (isConfirmed && user) {
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

            setEmployer([]);
            setWorkLog([]);
            alert('All data has been cleared!');
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            padding: '30px',
            minHeight: '100vh',
            position: 'relative',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        profilePic: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        username: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
            marginLeft: '10px',
        },
        clearButton: {
            backgroundColor: 'red',
            color: 'white',
        },
        clearButtonHover: {
            backgroundColor: '#cc0000',
        },
        logoutButton: {
            backgroundColor: '#007BFF',
            color: 'white',
        },
        logoutButtonHover: {
            backgroundColor: '#0056b3',
        },
        mainTitle: {
            textAlign: 'center',
            color: '#333',
            fontSize: '30px',
            marginBottom: '20px',
        },
        sectionTitle: {
            fontSize: '24px',
            marginBottom: '10px',
            color: '#444',
        },
        formSection: {
            // display: 'flex',
            // justifyContent: 'space-around',
            // flexWrap: 'wrap',
            // gap: '20px',
            margin: '30px',
        },
        sectionContainer: {
            flex: '1 1 400px',
            borderRadius: '8px',
            marginBottom: '20px',
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
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.userInfo}>
                    <button
                        onClick={handleLogout}
                        style={{ ...styles.button, ...styles.logoutButton }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)}
                    >
                        Logout
                    </button>
                    {user?.photoURL && (
                        <img src={user.photoURL} alt="Profile" style={styles.profilePic} />
                    )}
                    {user?.email && <span style={styles.username}>{user.email}</span>}
                </div>


                <div>
                    <button
                        onClick={clearAllData}
                        style={{ ...styles.button, ...styles.clearButton }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.clearButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.clearButton.backgroundColor)}
                    >
                        Clear All Data
                    </button>


                </div>
            </div>

            <h1 style={styles.mainTitle}>Fortnight Work Hour Calculator</h1>

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

            <footer style={styles.footer}>
                © {new Date().getFullYear()} Tony Pooyappallil. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
