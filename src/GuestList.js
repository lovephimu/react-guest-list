import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:4000/';

  function handleSubmit() {}

  return (
    <>
      <h1 className={styles.basicFlex}>Guest List</h1>
      <form className={styles.basicBox}>
        <div className={styles.basicFlex}>
          <label
            htmlFor="firstName"
            className={`${styles.structureBox} ${styles.subText}`}
          >
            First Name
          </label>
          <label
            htmlFor="lastName"
            className={`${styles.structureBox} ${styles.subText}`}
          >
            Last Name
          </label>
        </div>
        <div className={styles.basicFlex}>
          <input
            id="firstName"
            value={firstName}
            placeholder="First name"
            className={styles.structureBox}
          />
          <input
            id="lastName"
            value={lastName}
            placeholder="Last name"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
            className={styles.structureBox}
          />
        </div>
      </form>
      <div className={styles.basicBox}>Guest</div>
    </>
  );
}
