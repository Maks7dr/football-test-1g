// import React from "react";
// import styles from "./ResultsTable.module.css";

// export default function ResultsTable({ results }) {
//   if (results.length === 0) return null;

//   return (
//     <div className={styles.wrapper}>
//       <table className={styles.table}>
//         <thead>
//           <tr className={styles.theadRow}>
//             <th className={styles.th}>Место</th>
//             <th className={styles.th}>Имя</th>
//             <th className={`${styles.th} ${styles.tdCenter}`}>Очки</th>
//             <th className={styles.th}>30 м</th>
//             <th className={styles.th}>Прыжок</th>
//             <th className={styles.th}>Набивание</th>
//             <th className={styles.th}>7 по 50</th>
//             <th className={styles.th}>Купер</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((player, index) => (
//             <tr key={index} className={styles.tbodyRow}>
//               <td className={`${styles.td} ${styles.tdCenter}`}>{index + 1}</td>
//               <td className={styles.td}>{player.name}</td>
//               <td className={`${styles.td} ${styles.tdCenter}`}>
//                 {player.totalPoints}
//               </td>
//               <td className={styles.td}>{player.sprint}</td>
//               <td className={styles.td}>{player.jump}</td>
//               <td className={styles.td}>{player.juggling}</td>
//               <td className={styles.td}>{player.run50x7}</td>
//               <td className={styles.td}>{player.cooper}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className={styles.explanation}>
//         <h3 className={styles.explanationTitle}>
//           Объяснение подсчета результатов
//         </h3>
//         <p className={styles.explanationText}>
//           Для каждого спортивного теста (30 м, прыжок, набивание, 7 по 50,
//           Купер) каждому игроку начисляются{" "}
//           <strong>
//             очки в зависимости от его результата относительно других участников
//           </strong>
//           . Лучший результат в каждом отдельном тесте получает{" "}
//           <strong>1 очко</strong>, второй лучший результат получает{" "}
//           <strong>2 очка</strong>, третий лучший - <strong>3 очка</strong>, и
//           так далее. Таким образом, чем лучше спортсмен выступил в испытании,
//           тем меньше очков он получает за этот тест.
//         </p>
//         <p className={styles.explanationText}>
//           После выполнения всех тестов производится{" "}
//           <strong>суммирование всех набранных очков для каждого игрока</strong>.
//           Итоговое место в таблице определяется{" "}
//           <strong>по наименьшей общей сумме очков</strong>. Игрок с наименьшим
//           количеством очков занимает первое место, так как это означает, что он
//           показал наиболее высокие результаты в большинстве или во всех
//           спортивных дисциплинах.
//         </p>
//       </div>
//     </div>
//   );
// }

import React from "react";
import styles from "./ResultsTable.module.css";

export default function ResultsTable({ results }) {
  if (results.length === 0) return null;

  // Определяем топ-5 игроков и топ-5 значений по каждому тесту
  const getTop5Values = (results, key, ascending = true) => {
    const sorted = [...results].sort((a, b) =>
      ascending ? a[key] - b[key] : b[key] - a[key]
    );
    const top5 = sorted.slice(0, 5).map((player) => player[key]);
    return new Set(top5);
  };

  const getTop5Players = (results) => {
    const sorted = [...results].sort((a, b) => a.totalPoints - b.totalPoints);
    const top5 = sorted.slice(0, 5).map((player) => player.name);
    return new Set(top5);
  };

  const topSprint = getTop5Values(results, "sprint", true);
  const topJump = getTop5Values(results, "jump", false);
  const topJuggling = getTop5Values(results, "juggling", false);
  const topRun50x7 = getTop5Values(results, "run50x7", true);
  const topCooper = getTop5Values(results, "cooper", false);
  const topPlayers = getTop5Players(results);

  return (
    <div className={styles.wrapper}>
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
          {results.map((player, index) => {
            const isTopPlayer = topPlayers.has(player.name);
            return (
              <tr
                key={index}
                className={styles.tbodyRow}
                style={{
                  backgroundColor: isTopPlayer ? "#fff3cd" : "transparent",
                }}
              >
                <td className={`${styles.td} ${styles.tdCenter}`}>
                  {index + 1}
                </td>
                <td className={styles.td}>{player.name}</td>
                <td className={`${styles.td} ${styles.tdCenter}`}>
                  {player.totalPoints}
                </td>
                <td
                  className={styles.td}
                  style={{
                    backgroundColor: topSprint.has(player.sprint)
                      ? "#d4edda"
                      : "transparent",
                  }}
                >
                  {player.sprint}
                </td>
                <td
                  className={styles.td}
                  style={{
                    backgroundColor: topJump.has(player.jump)
                      ? "#d4edda"
                      : "transparent",
                  }}
                >
                  {player.jump}
                </td>
                <td
                  className={styles.td}
                  style={{
                    backgroundColor: topJuggling.has(player.juggling)
                      ? "#d4edda"
                      : "transparent",
                  }}
                >
                  {player.juggling}
                </td>
                <td
                  className={styles.td}
                  style={{
                    backgroundColor: topRun50x7.has(player.run50x7)
                      ? "#d4edda"
                      : "transparent",
                  }}
                >
                  {player.run50x7}
                </td>
                <td
                  className={styles.td}
                  style={{
                    backgroundColor: topCooper.has(player.cooper)
                      ? "#d4edda"
                      : "transparent",
                  }}
                >
                  {player.cooper}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.explanation}>
        <h3 className={styles.explanationTitle}>
          Объяснение подсчета результатов
        </h3>
        <p className={styles.explanationText}>
          Для каждого спортивного теста (30 м, прыжок, набивание, 7 по 50,
          Купер) каждому игроку начисляются{" "}
          <strong>
            очки в зависимости от его результата относительно других участников
          </strong>
          . Лучший результат в каждом отдельном тесте получает{" "}
          <strong>1 очко</strong>, второй лучший результат получает{" "}
          <strong>2 очка</strong>, третий лучший - <strong>3 очка</strong>, и
          так далее. Таким образом, чем лучше спортсмен выступил в испытании,
          тем меньше очков он получает за этот тест.
        </p>
        <p className={styles.explanationText}>
          После выполнения всех тестов производится{" "}
          <strong>суммирование всех набранных очков для каждого игрока</strong>.
          Итоговое место в таблице определяется{" "}
          <strong>по наименьшей общей сумме очков</strong>. Игрок с наименьшим
          количеством очков занимает первое место, так как это означает, что он
          показал наиболее высокие результаты в большинстве или во всех
          спортивных дисциплинах.
        </p>
      </div>
    </div>
  );
}
