import React from 'react';

const useTempleteMaker = (templeteData, handleChange) => {
  //templeteData comes from ProductTempleteTypes.jsx...
  //Return a table according to the templeteData

  return (
    <div className='templeteContainer'>
      {templeteData?.map((data) => {
        return (
          <div className='templeteInputBox'>
            <label name={data.replace('_', '-')}>
              {data.replace('*', '.').replaceAll('_', ' ')}
            </label>
            <span>
              <input
                className='form-control'
                name={`specs.${data.replaceAll(/[_*]/g, '-')}`}
                type='text'
                onChange={handleChange.handleChange}
                required
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default useTempleteMaker;
