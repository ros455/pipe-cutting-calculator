import React, { useState } from "react";
import "../styles/Tables.scss";
import TableTitle from "./TableTitle";
import TableData from "./TableData";

const Table = () => {
  const [rows, setRows] = useState([{ quantity: 0, length: 0, name: "" }]);

  const handleAddRow = () => {
    setRows((prevBlocks) => [
      ...prevBlocks,
      { quantity: 0, length: 0, name: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setRows((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
  };

  console.log('rows',rows);
  return (
    <div className="table_wrap">
      <div className="table">
        <TableTitle />
        {rows.map((row, index) => (
          <div className="table_data_wrap" key={index}>
            {index != 0 &&
            <div 
            className="remove_button"
            onClick={() => handleRemoveRow(index)}>X</div>
            }
            <TableData
              quantity={row.quantity}
              length={row.length}
              name={row.name}
              setRows={setRows}
              index={index}
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
