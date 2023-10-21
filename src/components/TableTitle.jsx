import React from 'react';

const TableTitle = () => {
    return (
        <div className='table_title_wrap'>
        <div className='table_title_block'>
            <p>Позиция</p>
        </div>
        <div className='table_title_block'>
            <p>Количество на 1 шт</p>
        </div>
        <div className='table_title_block'>
            <p>Длина</p>
        </div>
        <div className='table_title_block'>
            <p>Название</p>
        </div>
        <div className='table_title_block'>
            <p>Количество сумма</p>
        </div>
    </div>
    );
};

export default TableTitle;