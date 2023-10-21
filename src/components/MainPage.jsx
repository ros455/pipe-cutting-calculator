import React, {useState} from 'react';
import '../styles/Main.scss';
import Table from './Table';
const MainPage = () => {
    const [pipe, setPipe] = useState(0);
    const [numbersPipe, setNumbersPipe] = useState(0);
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
                    <p>Количество шт</p>
                    <input
                    className='custom_input'
                    type='number'
                    value={numbersPipe}
                    onChange={(e) => setNumbersPipe(e.target.value)}/>
                </div>
            </div>
            <Table/>
        </div>
    );
};

export default MainPage;