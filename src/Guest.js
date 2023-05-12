import { useEffect, useState } from 'react';
import styles from './GuestList.module.scss';

export default function Guest(props) {
  return (
    <section>
      <div data-test-id="guest" className={styles.basicBox}>
        <div
          className={`${styles.basicFlex} ${styles.basicJustifyLeft} ${styles.basicAlignCenter} ${styles.basicGap}`}
        >
          <div>🤍</div>
          <span className={styles.guestName}>
            {dummyArray[0].firstName} {dummyArray[0].lastName}
          </span>
          <span>:</span>
          <span>{dummyArray[0].attending ? 'attending' : 'not attending'}</span>
          <div
            className={`${styles.basicFlex} ${styles.basicFlexItem} ${styles.basicJustifySelfFlexEnd} ${styles.basicAlignCenter} ${styles.basicGap}`}
          >
            <input
              type="checkbox"
              aria-label="attending"
              checked
              onChange={() => {}}
            />
            <button aria-label="Remove firstName lastName">Remove</button>
          </div>
        </div>
      </div>
    </section>
  );
}
