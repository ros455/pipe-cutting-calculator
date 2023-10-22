import React, { useEffect, useState } from 'react';
import SeparateCalculation from './SeparateCalculation';

const Miscalculations = ({ pipe, numbersPipe, rows }) => {
    const [combinations, setCombinations] = useState([]);

    useEffect(() => {
        const problematicRows = rows.filter(row => row.length >= 700 && row.length <= 999);
        let resultCombinations = [];

        

        // Створюємо стан для кожного рядка для відстеження поточного quantitySum
        let rowsState = rows.map(row => ({ ...row }));
        
        problematicRows.forEach((problematicRow) => {
            let currentProblematicRowState = rowsState.find(r => r.id === problematicRow.id);
            
            rows.forEach((possibleRow) => {
                let currentPossibleRowState = rowsState.find(r => r.id === possibleRow.id);
                while (currentProblematicRowState.quantitySum > 0 && currentProblematicRowState.id !== currentPossibleRowState.id && (currentProblematicRowState.length + currentPossibleRowState.length) > 999 && currentPossibleRowState.quantitySum > 0) {
                    let amountToSubtract = Math.min(currentProblematicRowState.quantitySum, currentPossibleRowState.quantitySum);
                    resultCombinations.push({
                        pos1: currentProblematicRowState.id,
                        pos2: currentPossibleRowState.id,
                        quantity: amountToSubtract,
                        totalLength: currentProblematicRowState.length + currentPossibleRowState.length
                    });
                    currentProblematicRowState.quantitySum -= amountToSubtract;
                    currentPossibleRowState.quantitySum -= amountToSubtract;
                }
            });
        });

        let remainingRows = rowsState.filter(r => r.quantitySum > 0);
        for(let remaining of remainingRows) {
            if(remaining.length >= 700 && remaining.length <= 999) {
                let potentialPartner = rowsState.find(r => (r.length + remaining.length) > 999 && r.quantitySum > 0 && r.id !== remaining.id);
                if(potentialPartner) {
                    resultCombinations.push({
                        pos1: remaining.id,
                        pos2: potentialPartner.id,
                        quantity: Math.min(remaining.quantitySum, potentialPartner.quantitySum),
                        totalLength: remaining.length + potentialPartner.length
                    });
                    let minQuantitySum = Math.min(remaining.quantitySum, potentialPartner.quantitySum);
                    remaining.quantitySum -= minQuantitySum;
                    potentialPartner.quantitySum -= minQuantitySum;
                }
            } else {
                resultCombinations.push({
                    pos1: remaining.id,
                    pos2: null,  // Для визначення, що комбінація відсутня
                    quantity: remaining.quantitySum,
                    totalLength: remaining.length
                });
                remaining.quantitySum = 0;
            }
        }

        setCombinations(resultCombinations);
    }, [rows]);

    console.log('combinations', combinations);

    return (
      <div>
          {combinations.map((combination, idx) => (
              <div key={idx}>
                  {combination.pos2 
                      ? `Позиція ${combination.pos1} + Позиція ${combination.pos2}` 
                      : `Позиція ${combination.pos1}`
                  } - ({combination.quantity} шт по {combination.totalLength} мм)
              </div>
          ))}
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
