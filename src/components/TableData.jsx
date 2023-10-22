import React, {useEffect} from "react";

const TableData = ({ quantity, length, name, quantitySum, id, setRows, index, numbersPipe, errorLength, setValidationRows, validationRows }) => {

  useEffect(() => {
    if(errorLength) {
      let copyValidationRows = [...validationRows];
      let currentBlock = {isError: errorLength, idx: index};
      copyValidationRows.push(currentBlock);
      setValidationRows(copyValidationRows);
    }
  },[errorLength])


  const handleSetQuantity = (e) => {
    setRows((prevBlocks) =>
              prevBlocks.map((prev, idx) =>
                idx === index ? { ...prev, quantity: Number(e.target.value), quantitySum: Number(e.target.value) *  numbersPipe} : prev
              )
            )
  }


  return (
    <>
      <div className="table_data_block">
        <p>{id}</p>
      </div>
      <div className="table_data_block">
        <input
          placeholder="Количество"
          className="custom_input"
          type="number"
          value={quantity}
          onChange={(e) => handleSetQuantity(e)}
        />
      </div>
      <div className="table_data_block">
        <input placeholder="Длина" 
        className="custom_input" 
        type="number"
        value={length}
        onChange={(e) => setRows((prevBlocks) =>
          prevBlocks.map((prev, idx) =>
            idx === index ? { ...prev, length: Number(e.target.value) } : prev
          )
        )}/>
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
        <p>{quantitySum}</p>
      </div>
    </>
  );
};

export default TableData;
