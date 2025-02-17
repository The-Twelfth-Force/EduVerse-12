"use client";

import React, { useState } from 'react';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EduVerse-12</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>EUID</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.checkboxGroup}>
          <input
            id="staySignedIn"
            type="checkbox"
            checked={staySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="staySignedIn" className={styles.checkboxLabel}>Stay signed in</label>
        </div>
        <button type="submit" className={styles.button}>Log In</button>
      </form>
      <div className={styles.linkSection}>
        <a href="#" className={styles.link}>Forgot Password?</a>
        <a href="#" className={styles.link}>Help</a>
        <a href="#" className={styles.link}>Privacy Policy</a>
        <a href="#" className={styles.link}>Cookie Notice</a>
      </div>
    </div>
  );
};

export default SignInForm;
