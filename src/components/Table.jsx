import React, { useState } from "react";
import "../styles/Tables.scss";
import TableTitle from "./TableTitle";
import TableData from "./TableData";

const Table = ({pipe, numbersPipe, rows, setRows}) => {
  const [validationRows, setValidationRows] = useState([])

  const handleAddRow = () => {
    setRows((prevBlocks) => [
      ...prevBlocks,
      { id: rows.length + 1, quantity: 0, length: 0, name: "", quantitySum: 0  },
    ]);
  };

  const handleRemoveRow = (index) => {
    const filteredArray = rows.filter((_, i) => i !== index)
    const newArray = [];
    filteredArray.forEach((item, idx) => {
      const newBlock = {id: idx + 1, quantity: item.quantity, length: item.length, name: item.name, quantitySum: item.quantitySum};
      newArray.push(newBlock);
    })
    console.log('filteredArray',filteredArray);
    setRows(newArray);
  };

  return (
    <div className="table_wrap">
      <div className="table">
        <TableTitle />
        {rows.map((row, index) => (
          <div className={`table_data_wrap ${(row.length >= 700 && row.length <= 999) ? 'danger' : '' }`} key={index}>
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
        </div>
      </div>
    </div>
  );
};

export default Table;
