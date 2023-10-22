import React, { useEffect, useState } from "react";
import SeparateCalculation from "./SeparateCalculation";

const Miscalculations = ({
  pipe,
  numbersPipe,
  rows,
  combinations,
  setCombinations,
}) => {
  // const [stateFinalyArray, setStateFinalyArray] = useState([]);
  const [allCalculatePipeArray, setAllCalculatePipeArray] = useState([]);

  useEffect(() => {
    const problematicRows = rows.filter(
      (row) => row.length >= 700 && row.length <= 999
    );
    let resultCombinations = [];

    // Створюємо стан для кожного рядка для відстеження поточного quantitySum
    let rowsState = rows.map((row) => ({ ...row }));

    problematicRows.forEach((problematicRow) => {
      let currentProblematicRowState = rowsState.find(
        (r) => r.id === problematicRow.id
      );

      rows.forEach((possibleRow) => {
        let currentPossibleRowState = rowsState.find(
          (r) => r.id === possibleRow.id
        );

        while (
          currentProblematicRowState.quantitySum > 0 &&
          currentProblematicRowState.id !== currentPossibleRowState.id &&
          currentProblematicRowState.length + currentPossibleRowState.length >
            999 &&
          currentPossibleRowState.quantitySum > 0
        ) {
          let amountToSubtract = Math.min(
            currentProblematicRowState.quantitySum,
            currentPossibleRowState.quantitySum
          );
          resultCombinations.push({
            pos1: currentProblematicRowState.id,
            pos2: currentPossibleRowState.id,
            quantity: amountToSubtract,
            totalLength:
              currentProblematicRowState.length +
              currentPossibleRowState.length,
            name: currentProblematicRowState.name,
            name2: currentPossibleRowState.name,
          });
          currentProblematicRowState.quantitySum -= amountToSubtract;
          currentPossibleRowState.quantitySum -= amountToSubtract;
        }
      });
    });

    let remainingRows = rowsState.filter((r) => r.quantitySum > 0);
    // Як що залишилась позиція яка немає з чим поєднатися та не проходить по умові
    remainingRows.forEach((remaining, index) => {
      if (remaining.length > 700 && remaining.length < 999) {
        // Якщо ми можемо розбити елемент на частини по 1800 мм
        if (remaining.length * 2 <= 1800) {
          const numberOfCombinations = Math.floor(remaining.quantitySum / 2);
          if (numberOfCombinations > 0) {
            resultCombinations.push({
              pos1: remaining.id,
              pos2: remaining.id,
              quantity: numberOfCombinations,
              totalLength: remaining.length * 2,
              name: remaining.name,
              name2: remaining.name,
            });
            remaining.quantitySum -= numberOfCombinations * 2;
          }
        }
      }
    });
    console.log('remainingRows',remainingRows);
    for (let remaining of remainingRows) {

      if (remaining.length >= 700 && remaining.length <= 999) {
        let potentialPartner = rowsState.find(
          (r) =>
            r.length + remaining.length > 999 &&
            r.quantitySum > 0 &&
            r.id !== remaining.id
        );
        if (potentialPartner) {
          resultCombinations.push({
            pos1: remaining.id,
            pos2: potentialPartner.id,
            quantity: Math.min(
              remaining.quantitySum,
              potentialPartner.quantitySum
            ),
            totalLength: remaining.length + potentialPartner.length,
            name: remaining.name,
            name2: potentialPartner.name,
          });
          let minQuantitySum = Math.min(
            remaining.quantitySum,
            potentialPartner.quantitySum
          );
          remaining.quantitySum -= minQuantitySum;
          potentialPartner.quantitySum -= minQuantitySum;
        }
      } else {
        resultCombinations.push({
          pos1: remaining.id,
          pos2: null, // Для визначення, що комбінація відсутня
          quantity: remaining.quantitySum,
          totalLength: remaining.length,
          name: remaining.name,
        });
        remaining.quantitySum = 0;
      }
    }

    setCombinations(resultCombinations);
    calculatePipeCutting(resultCombinations);
  }, [rows]);

  const calculatePipeCutting = (arr) => {
    const lengthPipe = pipe - 350;
    let currentLengthPipe = 0;
    let currentPipeParts = [];
    let finalArray = [];

    const deepCopy = (arr) => arr.map((item) => ({ ...item }));
    let copyArr = deepCopy(arr);

    console.log('copyArr',copyArr);

    while (copyArr.some((item) => item.quantity > 0)) {
      for (let position of copyArr) {
        while (
          position.totalLength + currentLengthPipe <= lengthPipe &&
          position.quantity > 0
        ) {
          currentLengthPipe += position.totalLength;
          position.quantity--;

          // Додаємо частину до поточного масиву частин труби
          const partLabel = `${position.totalLength} х 1`;
          const foundIndex = currentPipeParts.findIndex((part) =>
            part.startsWith(`${position.totalLength} х`)
          );
          if (foundIndex !== -1) {
            const parts = currentPipeParts[foundIndex].split(" х ");
            const count = Number(parts[1]) + 1;
            currentPipeParts[foundIndex] = `${position.totalLength} х ${count}`;
          } else {
            currentPipeParts.push(partLabel);
          }
        }
      }

      finalArray.push([...currentPipeParts]);
      currentPipeParts = [];
      currentLengthPipe = 0;
    }

    const finalArrayReverse = finalArray.map((item) => item.reverse());

    const groupedObjects = [];

    for (const arr of finalArrayReverse) {
      const index = groupedObjects.findIndex(
        (group) =>
          JSON.stringify(group.value) === JSON.stringify(arr.join(", "))
      );

      if (index > -1) {
        groupedObjects[index].count++;
      } else {
        groupedObjects.push({ count: 1, value: arr.join(", ") });
      }
    }

    console.log('finalArrayReverse',finalArrayReverse);

    // setStateFinalyArray(finalArrayReverse);
    setAllCalculatePipeArray(groupedObjects);
  };

  return (
    <div>
      {combinations.map((combination, idx) => (
        <div key={idx}>
          {combination.pos2
            ? `Pos ${combination.pos1} - (${combination.name}) + Pos ${combination.pos2} - (${combination.name2})`
            : `Pos ${combination.pos1} - (${combination.name})`}{" "}
          - ({combination.quantity} шт по {combination.totalLength} мм)
        </div>
      ))}

      <div className="display_program_pipe_cutting_wrap">
      {allCalculatePipeArray.map((item, idx) => (
        <div className="display_program_pipe_cutting_block" key={idx}>
          <p style={{ padding: "0px 10px" }}>
            Программа {idx + 1}: {item.count} труб
          </p>
          <p style={{ padding: "0px 10px" }}>Размер: {item.value}</p>
        </div>
      ))}
      </div>

      {rows.map((row, idx) => (
        <SeparateCalculation
          key={idx}
          row={row}
          numbersPipe={numbersPipe}
          pipe={pipe}
        />
      ))}
    </div>
  );
};

export default Miscalculations;
