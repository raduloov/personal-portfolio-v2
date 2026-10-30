import { Spark } from './Spark'
import styles from './Tape.module.css'

interface TapeProps {
  items: string[]
}

/** Yellow tape marquee that cuts between sections. */
export function Tape({ items }: TapeProps) {
  const row = (key: string) => (
    <span className={styles.row} key={key} aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span className={styles.item} key={`${key}-${i}`}>
          {item}
          <Spark className={styles.spark} />
        </span>
      ))}
    </span>
  )

  return (
    <div className={styles.wrap} role="presentation">
      <div className={styles.tape}>
        <div className={styles.track}>
          {row('a')}
          {row('b')}
        </div>
      </div>
    </div>
  )
}
