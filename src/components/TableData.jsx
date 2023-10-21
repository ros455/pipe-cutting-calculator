import React from "react";

const TableData = ({ quantity, length, name, setRows, index }) => {
  return (
    <>
      <div className="table_data_block">
        <p>1</p>
      </div>
      <div className="table_data_block">
        <input
          placeholder="Количество"
          className="custom_input"
          type="number"
          value={quantity}
          onChange={(e) =>
            setRows((prevBlocks) =>
              prevBlocks.map((prev, idx) =>
                idx === index ? { ...prev, quantity: e.target.value } : prev
              )
            )
          }
        />
      </div>
      <div className="table_data_block">
        <input placeholder="Длина" 
        className="custom_input" 
        type="number"
        value={length}
        onChange={(e) =>
            setRows((prevBlocks) =>
              prevBlocks.map((prev, idx) =>
                idx === index ? { ...prev, length: e.target.value } : prev
              )
            )
          }/>
      </div>
      <div className="table_data_block">
        <input placeholder="Название" 
        className="custom_input" 
        type="text"
        onChange={(e) =>
            setRows((prevBlocks) =>
              prevBlocks.map((prev, idx) =>
                idx === index ? { ...prev, name: e.target.value } : prev
              )
            )
          } />
      </div>
      <div className="table_data_block">
        <p>14</p>
      </div>
    </>
  );
};

export default TableData;
