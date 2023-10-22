import React, {useState, useEffect} from 'react';

const SeparateCalculation = ({row, numbersPipe, pipe}) => {
    const [startNumberOfPipes, setStartNumberOfPipes] = useState(0);
    const [numberOfMillimeters, setNumberOfMillimeters] = useState(0);
    const [endNumberOfPipes, setEndNumberOfPipes] = useState(0);

    useEffect(() => {
        setStartNumberOfPipes(row.quantity * numbersPipe)
    },[row])

    useEffect(() => {
        setNumberOfMillimeters(startNumberOfPipes * row.length)
    },[startNumberOfPipes, row])

    useEffect(() => {
        setEndNumberOfPipes(numberOfMillimeters / pipe);
    },[numberOfMillimeters, pipe])
    
    return (
        <div>
            
        </div>
    );
};

export default SeparateCalculation;