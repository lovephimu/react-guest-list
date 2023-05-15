import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function Guest(props) {
  const [guestArray, setGuestArray] = useState([]);
  const baseUrl =
    'https://b5d6641b-b2e6-4cd0-8ab9-a642bd4fe26e.id.repl.co/guests/';

  useEffect(() => {
    setGuestArray([...props.list]);
  }, [props.list]);

  async function getGuests() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    await setGuestArray(data); // copying old data, pushing new fetched data and updating state in one go
  }

  async function updateGuest(id, booleanItem) {
    const response = await fetch(baseUrl + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: booleanItem }),
    });

    const responseData = await response.json();

    setGuestArray(responseData);

    getGuests().catch((error) => {
      console.log(error);
    });
  }

  async function deleteGuest(id) {
    await fetch(baseUrl + id, { method: 'DELETE' });

    getGuests().catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {guestArray.map((item) => {
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
