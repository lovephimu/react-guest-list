import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function GuestList() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dummyArray, setDummyArray] = useState([]);

  useEffect(() => {
    console.log('This is what I got:');
    console.log(dummyArray);
  }, [dummyArray]);

  async function getGuests() {
    const response = await fetch('http://localhost:4000/guests');
    const data = await response.json();
    await setDummyArray(data); // copying old data, pushing new fetched data and updating state in one go
  }
  useEffect(() => {
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);

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

    getGuests().catch((error) => {
      console.log(error);
    });

    // const response = {
    //   id: dummyArray.length + 1,
    //   firstName: firstNameParameter,
    //   lastName: lastNameParameter,
    //   attending: false,
    // };
    setDummyArray([...dummyArray, ...data]);
  }

  function updateGuest(id, booleanItem) {
    // const response = await fetch('http://localhost:4000/guests/1', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ attending: true }),
    // });

    setDummyArray(
      dummyArray.map((item) => {
        if (item.id === id) {
          item.attending = booleanItem;
        }

        return item;
      }),
    );

    // setDummyArray(
    //   dummyArray.map((item) =>
    //     item.id === id ? (item.attending = booleanItem) : item,
    //   ),
    // );
  }

  function deleteGuest(id) {
    // const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    // const deletedGuest = await response.json();

    // console.log(deletedGuest);

    const filterArray = dummyArray.filter(
      (currentValue) => currentValue.id !== id,
    );

    setDummyArray(filterArray);
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
                createGuest(firstName, lastName).catch((error) => {
                  console.log(error);
                });
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
                <div>{item.attending ? '💗' : '🤍'}</div>
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
                    // checked={item.attending}
                    onChange={(event) => {
                      updateGuest(item.id, event.currentTarget.checked);
                    }}
                  />
                  <button
                    aria-label="Remove firstName lastName"
                    onClick={() => {
                      deleteGuest(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
