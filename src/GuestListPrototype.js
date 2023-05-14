import { useEffect, useState } from 'react';
import Guest from './Guest';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dummyArray, setDummyArray] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getGuests() {
    const response = await fetch('http://localhost:4000/guests');
    const data = await response.json();
    await setDummyArray(data); // copying old data, pushing new fetched data and updating state in one go
  }

  // first load useEffect

  useEffect(() => {
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  // onChange useEffect

  useEffect(() => {
    if (dummyArray.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dummyArray]);

  useEffect(() => {
    console.log('Loading status:');
    console.log(loading);
  }, [loading]);

  async function createGuest(firstNameParameter, lastNameParameter) {
    await fetch(`http://localhost:4000/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameParameter,
        lastName: lastNameParameter,
      }),
    });

    setFirstName('');

    setLastName('');

    getGuests().catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <h1 className={styles.basicFlex}>Guest List</h1>
      <form
        className={`${styles.basicBox} ${styles.basicBottomMargin}`}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className={styles.basicFlex}>
          <div className={`${styles.structureBox} ${styles.subText}`}>
            <label htmlFor="firstName">First name</label>
          </div>
          <div className={`${styles.structureBox} ${styles.subText}`}>
            <label htmlFor="lastName">Last name</label>
          </div>
        </div>
        <div className={styles.basicFlex}>
          <input
            id="firstName"
            value={firstName}
            disabled={loading}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
            placeholder="First name"
            className={styles.structureBox}
          />
          <input
            id="lastName"
            value={lastName}
            disabled={loading}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
            placeholder="Last name"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                createGuest(firstName, lastName).catch((error) => {
                  console.log(error);
                });
              }
            }}
            className={styles.structureBox}
          />
        </div>
      </form>
      {loading ? <div>Loading...</div> : <Guest list={dummyArray} />}
    </>
  );
}
