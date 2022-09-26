import React from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_CHECK } from '../../Features/basketSlice';

function CheckButton({ id, value = true }) {
  const dispatch = useDispatch();

  return (
    <input
      type='checkbox'
      class='onoffswitch-checkbox'
      onClick={() => dispatch(CHANGE_CHECK({ id, value }))}
      defaultChecked={value}
    />
  );
}

export default CheckButton;
