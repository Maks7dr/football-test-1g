import React from "react";
import { Trash2, Pencil } from "lucide-react";
import styles from "./PlayerTable.module.css";

export default function PlayerTable({ players, onEdit, onDelete }) {
  if (players.length === 0) return null;

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.theadRow}>
          <th className={styles.th}>Имя</th>
          <th className={styles.th}>30 м</th>
          <th className={styles.th}>Прыжок</th>
          <th className={styles.th}>Набивание</th>
          <th className={styles.th}>7 по 50</th>
          <th className={styles.th}>Купер</th>
          <th className={styles.th}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index} className={styles.tbodyRow}>
            <td className={styles.td}>{player.name}</td>
            <td className={styles.td}>{player.sprint}</td>
            <td className={styles.td}>{player.jump}</td>
            <td className={styles.td}>{player.juggling}</td>
            <td className={styles.td}>{player.run50x7}</td>
            <td className={styles.td}>{player.cooper}</td>
            <td className={`${styles.td} ${styles.actionsCell}`}>
              <div className={styles.actionsContainer}>
                <button
                  onClick={() => onEdit(index)}
                  className={styles.editButton}
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className={styles.deleteButton}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
