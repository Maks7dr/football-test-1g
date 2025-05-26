import React from "react";
import styles from "./ResultsTable.module.css";

export default function ResultsTable({ results }) {
  if (results.length === 0) return null;

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.theadRow}>
          <th className={styles.th}>Место</th>
          <th className={styles.th}>Имя</th>
          <th className={`${styles.th} ${styles.tdCenter}`}>Очки</th>
          <th className={styles.th}>30 м</th>
          <th className={styles.th}>Прыжок</th>
          <th className={styles.th}>Набивание</th>
          <th className={styles.th}>7 по 50</th>
          <th className={styles.th}>Купер</th>
        </tr>
      </thead>
      <tbody>
        {results.map((player, index) => (
          <tr key={index} className={styles.tbodyRow}>
            <td className={`${styles.td} ${styles.tdCenter}`}>{index + 1}</td>
            <td className={styles.td}>{player.name}</td>
            <td className={`${styles.td} ${styles.tdCenter}`}>
              {player.totalPoints}
            </td>
            <td className={styles.td}>{player.sprint}</td>
            <td className={styles.td}>{player.jump}</td>
            <td className={styles.td}>{player.juggling}</td>
            <td className={styles.td}>{player.run50x7}</td>
            <td className={styles.td}>{player.cooper}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
