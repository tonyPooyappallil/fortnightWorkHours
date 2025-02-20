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
                    <AddEmployer employerList={employer} setEmployer={setEmployer} />
                </div>
                <div style={styles.sectionContainer}>
                    <AddShiftWorked employerList={employer} workLog={workLog} setWorkLog={setWorkLog} />
                </div>
            </div>

            <h2 style={styles.sectionTitle}>Fortnight Starting Last Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={-7} setWorkLog={setWorkLog} />

            <h2 style={styles.sectionTitle}>Fortnight Ending Next Week</h2>
            <WorkHoursCalendar workLog={workLog} startDateOffsetWeeks={0} />

            <footer style={styles.footer}>
                © {new Date().getFullYear()} Tony Pooyappallil. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
