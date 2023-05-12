import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const [attending, setAttending] = useState(false);
  const [dummyArray, setDummyArray] = useState([
    { id: '1', firstName: 'Karl', lastName: 'Horky', attending: false },
    { id: '2', firstName: 'Will', lastName: 'Chill', attending: false },
    { id: '3', firstName: 'Hannah', lastName: 'Banana', attending: false },
    { id: '4', firstName: 'Agnes', lastName: 'Magnus', attending: false },
  ]);

  useEffect(() => {
    console.log(dummyArray);
  }, [dummyArray]);

  // useEffect(() => {
  //   async function getGuests() {
  //     const response = await fetch('http://localhost:4000/guests');
  //     const data = await response.json();

  //     await console.log(data);

  //     await setAllGuests([data]); // copying old data, pushing new fetched data and updating state in one go
  //   }
  //   getGuests().catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

  function handleSubmit() {}

  function updateGuest(id, booleanItem) {
    // const response = await fetch('http://localhost:4000/guests/1', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ attending: true }),
    // });
    const newAttendingStatus = booleanItem;
    // arraymethode search and replace .attending
  }

  function createGuest(firstNameParameter, lastNameParameter) {
    // const response = await fetch(`http://localhost:4000/guests`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstName: firstNameParameter,
    //     lastName: lastNameParameter,
    //   }),
    // });
    console.log(firstNameParameter, lastNameParameter);
    const response = {
      id: dummyArray.length + 1,
      firstName: firstNameParameter,
      lastName: lastNameParameter,
      attending: false,
    };
    console.log(response);
    setDummyArray([...dummyArray, response]);
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
                createGuest(firstName, lastName);
              }
            }}
            className={styles.structureBox}
          />
        </div>
      </form>
      {dummyArray.map((item) => {
        return (
          <section key={`user-${item.id}`}>
            <div
              data-test-id="guest"
              className={`${styles.basicBox} ${styles.basicShadowMedium} ${styles.basicMarginSmall}`}
            >
              <div
                className={`${styles.basicFlex} ${styles.basicJustifyLeft} ${styles.basicAlignCenter} ${styles.basicGap}`}
              >
                <div>🤍</div>
                <span className={styles.guestName}>
                  {item.firstName} {item.lastName}
                </span>
                <span>:</span>
                <span>{item.attending ? 'attending' : 'not attending'}</span>
                <div
                  className={`${styles.basicFlex} ${styles.basicFlexItem} ${styles.basicJustifySelfFlexEnd} ${styles.basicAlignCenter} ${styles.basicGap}`}
                >
                  <input
                    type="checkbox"
                    aria-label="attending"
                    checked={item.attending}
                    onChange={(event) => {
                      updateGuest(item.id, event.currentTarget.checked);
                    }}
                  />
                  <button aria-label="Remove firstName lastName">Remove</button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
