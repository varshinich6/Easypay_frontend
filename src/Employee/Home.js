import React from 'react';
import { motion } from 'framer-motion';
import './HomePage.css'; // Use the updated CSS file for styling

const HomePage = () => {
    return (
        <div className="fullPageContainer">
            {/* Full Page Animated Background */}
            <div className="backgroundAnimation"></div>

            {/* Content Section */}
            <div className="contentSection">
                {/* Hero Section */}
                <header className="heroSection">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="heroTitle"
                    >
                        Welcome to Payroll Management System
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="heroSubtitle"
                    >
                        Manage Employee Salaries with Ease and Precision
                    </motion.p>
                </header>

                {/* Cards Section */}
                <div className="cardsContainer">
                    <motion.div
                        className="infoCard"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>📊 Real-time Payroll Processing</h3>
                        <p>
                            Calculate salaries, manage deductions, and generate payslips seamlessly.
                        </p>
                    </motion.div>

                    <motion.div
                        className="infoCard"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>📅 Attendance & Leave Management</h3>
                        <p>
                            Track employee attendance and process leave requests with integrated tools.
                        </p>
                    </motion.div>

                    <motion.div
                        className="infoCard"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>📈 Comprehensive Reports</h3>
                        <p>
                            Get detailed insights and compliance reports for better decision-making.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
