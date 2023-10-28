import React, {useEffect, useState} from 'react';
import '../styles/Main.scss';
import Table from './Table';
import Miscalculations from './Miscalculations';
import DisplayResoult from './DisplayResoult';
const MainPage = () => {
    const [combinations, setCombinations] = useState([]);
    const [pipe, setPipe] = useState(6000);
    const [numbersPipe, setNumbersPipe] = useState(0);
    const [rows, setRows] = useState([{ id: 1, quantity: 0, length: 0, name: "", quantitySum: 0 }]);
    const [secondRows, setSecondRows] = useState([]);
    const [programmResoult, setProgrammResoult] = useState([]);
    const [combinationResoult, setCombinationResoult] = useState([]);
    const [allCalculatePipeArray, setAllCalculatePipeArray] = useState([]);

    useEffect(() => {
        const rows = window.localStorage.getItem('rows');
        if(rows){
            const newRows = JSON.parse(rows);
            console.log('newRows',newRows);
            setSecondRows(newRows);
        }
    },[rows])

    const handleShowResoult = () => {
        setCombinationResoult(combinations);
        setProgrammResoult(allCalculatePipeArray);
        window.localStorage.setItem('rows', JSON.stringify(rows));
      }

  useEffect(() => {
    const newRows = [];
    rows.forEach(item => {
        const res = item.quantitySum = item.quantity * numbersPipe;
        newRows.push({ id: item.id, quantity: item.quantity, length: item.length, name: item.name, quantitySum: res })
      });
    setRows(newRows)
  },[numbersPipe])

  const handleNumbersPipeSet = (e) => {
    setNumbersPipe(e);
    window.localStorage.setItem('numbersPipe',e)
  }

    return (
        <div className='maim_page_wrap'>
            <div className='top_inputs_wrap'>
                <div className='top_input_block'>
                    <p>Труба мм</p>
                    <input
                    className='custom_input'
                    type='number'
                    value={pipe}
                    onChange={(e) => setPipe(e.target.value)}/>
                </div>
                <div className='top_input_block'>
                    <p>Количество изделий</p>
                    <input
                    className='custom_input'
                    type='number'
                    value={numbersPipe}
                    onChange={(e) => handleNumbersPipeSet(e.target.value)}/>
                </div>
            </div>
            <Table 
            setNumbersPipe={setNumbersPipe}
            secondRows={secondRows}
            combinations={combinations}
            pipe={pipe}
            numbersPipe={numbersPipe}
            setRows={setRows}
            rows={rows}
            handleShowResoult={handleShowResoult}/>
            <Miscalculations
            allCalculatePipeArray={allCalculatePipeArray}
            setAllCalculatePipeArray={setAllCalculatePipeArray}
            combinations={combinations}
            setCombinations={setCombinations}
            pipe={pipe}
            numbersPipe={numbersPipe}
            rows={rows}
            handleShowResoult={handleShowResoult}/>
            <DisplayResoult
            programmResoult={programmResoult}
            combinationResoult={combinationResoult}/>
        </div>
    );
};

export default MainPage;