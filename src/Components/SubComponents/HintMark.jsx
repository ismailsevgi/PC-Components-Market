import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HintMark({ hintMassage }) {
  return (
    <div className='hintBox'>
      <FontAwesomeIcon icon='fa-solid fa-question' />
      <small className='hint'>{hintMassage}</small>
    </div>
  );
}
