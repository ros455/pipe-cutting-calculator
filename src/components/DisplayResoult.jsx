import React, { useEffect, useState } from 'react';

const DisplayResoult = ({programmResoult, combinationResoult}) => {
    return (
        <div>
        {!!combinationResoult.length && combinationResoult.map((combination, idx) => (
        <div key={idx}>
          {combination.pos2
            ? `Pos ${combination.pos1} - (${combination.name}) + Pos ${combination.pos2} - (${combination.name2})`
            : `Pos ${combination.pos1} - (${combination.name})`}{" "}
          - ({combination.quantity} шт по {combination.totalLength} мм)
        </div>
      ))}

      <div className="display_program_pipe_cutting_wrap">
      {!!programmResoult.length && programmResoult.map((item, idx) => (
        <div className="display_program_pipe_cutting_block" key={idx}>
          <p className="display_program_pipe_cutting_text_title">
            Программа {idx + 1}: {item.count} труб
          </p>
          <p className="display_program_pipe_cutting_text_value"> {item.value}</p>
        </div>
      ))}
      </div>
        </div>
    );
};

export default DisplayResoult;