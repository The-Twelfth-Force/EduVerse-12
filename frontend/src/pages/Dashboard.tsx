import React from 'react';
import Head from 'next/head';
import styles from './Dashboard.module.css'; // Ensure you create a corresponding CSS module

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard - EduVerse-12</title>
      </Head>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
        </header>
        <main className={styles.mainContent}>
          <section className={styles.infoPanel}>
            <h2>Welcome Back!</h2>
            <p>This is your personalized dashboard.</p>
          </section>
          <section className={styles.statistics}>
            <h2>Statistics</h2>
            <p>Here's a quick overview of your activity.</p>
          </section>
        </main>
        <footer className={styles.footer}>
          EduVerse-12 © 2025
        </footer>
      </div>
    </>
  );
};

export default Dashboard;

