import { useEffect, useState } from 'react';
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
    if (dummyArray.length < 1) {
      setLoading(true);
    }

    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  // onChange useEffect

  useEffect(() => {
    console.log('This is what I got:');
    console.log(dummyArray);
  }, [dummyArray]);

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

  async function updateGuest(id, booleanItem) {
    await fetch(`http://localhost:4000/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: booleanItem }),
    });

    getGuests().catch((error) => {
      console.log(error);
    });
  }

  async function deleteGuest(id) {
    await fetch(`http://localhost:4000/guests/${id}`, { method: 'DELETE' });

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
                    checked={item.attending}
                    aria-label={`${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()} attending status`}
                    onChange={(event) => {
                      updateGuest(item.id, event.currentTarget.checked).catch(
                        (error) => {
                          console.log(error);
                        },
                      );
                    }}
                  />
                  <button
                    aria-label={`Remove ${item.firstName} ${item.lastName}`}
                    onClick={() => {
                      deleteGuest(item.id).catch((error) => {
                        console.log(error);
                      });
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
