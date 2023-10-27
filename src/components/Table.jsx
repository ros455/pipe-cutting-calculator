import React, { useState } from "react";
import "../styles/Tables.scss";
import TableTitle from "./TableTitle";
import TableData from "./TableData";

const Table = ({pipe, numbersPipe, rows, setRows, combinations, handleShowResoult, secondRows, setNumbersPipe}) => {
  const [validationRows, setValidationRows] = useState([]);

  const handleAddRow = () => {
    setRows((prevBlocks) => [
      ...prevBlocks,
      { id: rows.length + 1, quantity: 0, length: 0, name: "", quantitySum: 0 },
    ]);
    window.localStorage.setItem('rows', JSON.stringify(rows));
  };

  const handleRemoveRow = (index) => {
    const filteredArray = rows.filter((_, i) => i !== index)
    const newArray = [];
    filteredArray.forEach((item, idx) => {
      const newBlock = {id: idx + 1, quantity: item.quantity, length: item.length, name: item.name, quantitySum: item.quantitySum};
      newArray.push(newBlock);
    })

    setRows(newArray);
  };

  const handleRestoreArray = () => {
    if(secondRows.length) {
      setRows(secondRows);
      const num = window.localStorage.getItem('numbersPipe');
      setNumbersPipe(num);
    } else {
      alert('Кеш пуст')
    }
  }

  const handleClearStorege = () => {
    window.localStorage.removeItem('rows');
    window.localStorage.removeItem('numbersPipe');
    window.location.reload();
    // window.localStorage.setItem('rows', JSON.stringify({ id: 1, quantity: 0, length: 0, name: "", quantitySum: 0 }))
  }

  return (
    <div className="table_wrap">
      <div className="table">
        <TableTitle />
        {rows.map((row, index) => (
          <div className={`table_data_wrap ${(row.length >= 700 && row.length <= 999) ? 'danger' : combinations.some((item) => item.pos2 == row.id) ? 'combination' : '' }`} key={index}>
            {index != 0 &&
            <div 
            className="remove_button"
            onClick={() => handleRemoveRow(index)}>X</div>
            }
            <TableData
              quantity={row.quantity}
              length={row.length}
              name={row.name}
              quantitySum={row.quantitySum}
              id={row.id}
              setRows={setRows}
              index={index}
              numbersPipe={numbersPipe}
              errorLength={row.length >= 700 && row.length <= 999}
              setValidationRows={setValidationRows}
              validationRows={validationRows}
            />
          </div>
        ))}
        <div className="button_add_new_line_wrap">
          <button className="button_add_new_line_item" onClick={handleAddRow}>
            +
          </button>
          <button className="button_add_new_line_item" onClick={() => handleShowResoult()}>
          Рассчитать
          </button>
          <button className="button_add_new_line_item" onClick={() => handleRestoreArray()}>
          Востановить
          </button>
          <button className="button_add_new_line_item" onClick={() => handleClearStorege()}>
          Очистить кеш
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
