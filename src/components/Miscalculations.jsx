import React, { useEffect, useState } from "react";
import SeparateCalculation from "./SeparateCalculation";

const Miscalculations = ({
  pipe,
  numbersPipe,
  rows,
  combinations,
  setCombinations,
  handleShowResoult,
  allCalculatePipeArray, 
  setAllCalculatePipeArray
}) => {


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

  function getPositionsForLength(length, combination) {
    const item = combination.find(comb => comb.totalLength == length);
    if (!item) return '';
    
    if (item.pos2) {
      return `Pos ${item.pos1} + Pos ${item.pos2}`;
    } else {
      return `Pos ${item.pos1}`;
    }
  }


  const calculatePipeCutting = (arr) => {
    const lengthPipe = pipe - 350;
    let currentLengthPipe = 0;
    let currentPipeParts = [];
    let finalArray = [];

    const deepCopy = (arr) => arr.map((item) => ({ ...item }));
    let copyArr = deepCopy(arr);

    let isAnyPositionProcessed = false;

    while (copyArr.some((item) => item.quantity > 0)) {
      for (let position of copyArr) {
        while (
          position.totalLength + currentLengthPipe <= lengthPipe &&
          position.quantity > 0
        ) {
          isAnyPositionProcessed = true;
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
      
      if (!isAnyPositionProcessed) {
        break; // Вихід із зовнішнього циклу, якщо не вдалося обробити жодної позиції
      }
      
      finalArray.push([...currentPipeParts]);
      currentPipeParts = [];
      currentLengthPipe = 0;
      isAnyPositionProcessed = false; // Скидання прапорця для наступної ітерації
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

    const mergedArray = groupedObjects.map(obj => {
      const values = obj.value.split(', ').map(valueItem => {
        const [length, multiplication] = valueItem.split(' х ');
        return `${getPositionsForLength(parseInt(length, 10), arr)}: ${valueItem}`;
      });
      return {
        count: obj.count,
        value: values.join(' | ')
      };
    });

    // setStateFinalyArray(finalArrayReverse);
    setAllCalculatePipeArray(mergedArray);
  };

  return (
    <div>
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