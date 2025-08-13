import * as React from 'react';
import { NumberField } from '@base-ui-components/react/number-field';
import styles from './index.module.css';

export default function ExampleNumberField({ label, value, name,onChange }) {
  const id = React.useId();
  return (
    <NumberField.Root id={id} value={value} className={styles.Field}>
      <NumberField.ScrubArea className={styles.ScrubArea}>
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
        <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
          <CursorGrowIcon onClick={()=>value++}/>
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className={styles.Group}>
        <NumberField.Decrement className={styles.Decrement}>
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className={styles.Input} onChange={onChange}  value={value}
          name={name}/>
        <NumberField.Increment className={styles.Increment}>
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon() {
  return (
    <p>x</p>
  );
}

function PlusIcon() {
  return (
    <p>+</p>
  );
}

function MinusIcon() {
  return (
     <p>-</p>
  );
}
