import React, {useState} from 'react';
import '../styles/Main.scss';
import Table from './Table';
import Miscalculations from './Miscalculations';
const MainPage = () => {
    const [combinations, setCombinations] = useState([]);
    const [pipe, setPipe] = useState(6000);
    const [numbersPipe, setNumbersPipe] = useState(0);
//     const [rows, setRows] = useState([
// {id: 1, quantity: 10, length: 1200, name: '', quantitySum: 40},
// {id: 2, quantity: 8, length: 750, name: '', quantitySum: 32},
// {id: 3, quantity: 5, length: 930, name: '', quantitySum: 20},
// {id: 4, quantity: 4, length: 220, name: '', quantitySum: 16},
// {id: 5, quantity: 2, length: 350, name: '', quantitySum: 8}
//     ]);
//     const [rows, setRows] = useState([
// {id: 1, quantity: 4, length: 1200, name: '', quantitySum: 16},
// {id: 2, quantity: 8, length: 900, name: '', quantitySum: 32},
//     ]);
    const [rows, setRows] = useState([{ id: 1, quantity: 0, length: 0, name: "", quantitySum: 0 }]);

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
                    onChange={(e) => setNumbersPipe(e.target.value)}/>
                </div>
            </div>
            <Table 
            pipe={pipe}
            numbersPipe={numbersPipe}
            setRows={setRows}
            rows={rows}/>
            <Miscalculations
            combinations={combinations}
            setCombinations={setCombinations}
            pipe={pipe}
            numbersPipe={numbersPipe}
            rows={rows}/>
        </div>
    );
};

export default MainPage;