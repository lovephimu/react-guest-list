import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allGuests, setAllGuests] = useState([]);

  function handleSubmit() {}

  // async function updateGuest() {
  //   const response = await fetch('http://localhost:4000/guests/1', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ attending: true }),
  //   });
  // }

  useEffect(() => {
    async function getGuests() {
      const response = await fetch('http://localhost:4000/guests');
      console.log(response);
      const data = await response.json();
      const currentGuests = [...allGuests];
      setAllGuests([...currentGuests, data[0]]);
    }

    getGuests().catch((error) => {
      console.log(error);
    });
  }, [allGuests]);

  return (
    <>
      <h1 className={styles.basicFlex}>Guest List</h1>
      <form
        className={styles.basicBox}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
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
      <section>
        <div data-test-id="guest" className={styles.basicBox}>
          <div
            className={`${styles.basicFlex} ${styles.basicJustifyLeft} ${styles.basicAlignCenter} ${styles.basicGap}`}
          >
            <div>🤍</div>
            <span className={styles.guestName}>
              {allGuests[0].firstName} {allGuests[0].lastName}
            </span>
            <span>:</span>
            <span>not attending</span>
            <div
              className={`${styles.basicFlex} ${styles.basicFlexItem} ${styles.basicJustifySelfFlexEnd} ${styles.basicAlignCenter} ${styles.basicGap}`}
            >
              <input type="checkbox" aria-label="attending" checked />
              <button aria-label="Remove firstName lastName">Remove</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
