import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:4000/';

  function handleSubmit() {}

  return (
    <>
      <h1 className={styles.basicFlex}>HelloWorld</h1>
      <form className={styles.basicBox}>
        <label htmlFor="firstName">First Name</label>
        <label htmlFor="lastName">Last Name</label>
        <input id="firstName" value={firstName} placeholder="first name" />
        <input
          id="lastName"
          value={lastName}
          placeholder="last name"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </form>
      <div className={styles.basicBox}>Guest</div>
    </>
  );
}
