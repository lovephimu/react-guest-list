import { useEffect, useState } from 'react';
import Guest from './Guest';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [loading, setLoading] = useState(true);
  const [guestListArray, setGuestListArray] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl =
    'https://b5d6641b-b2e6-4cd0-8ab9-a642bd4fe26e.id.repl.co/guests/';

  async function getGuests() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    await setGuestListArray(data);
    await setLoading(false);
  }

  useEffect(() => {
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  async function createGuest(firstNameParameter, lastNameParameter) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameParameter,
        lastName: lastNameParameter,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    setFirstName('');

    setLastName('');

    setGuestListArray([...guestListArray, responseData]);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.upperFlex}>
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
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
            placeholder="First name"
            className={styles.structureBox}
          />
          <input
            id="lastName"
            value={lastName}
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
      <Guest list={guestListArray} />
    </main>
  );
}
