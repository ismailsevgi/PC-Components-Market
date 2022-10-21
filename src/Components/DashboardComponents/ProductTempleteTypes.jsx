import React, { useEffect, useState } from 'react';

function ProductTempleteTypes({ type, specsHandler }) {
  console.log('Coming type: ', type);
  const [templete, setTemplete] = useState(
    <h1>Product type couldn't finded</h1>
  );

  //Resets all specs if product type changes
  useEffect(() => {
    specsHandler.values.specs = {};
  }, [type]);

  useEffect(() => {
    switch (type) {
      case 'cpu':
        setTemplete(
          <table>
            <tbody>
              <tr>
                <td name='Clock'>Clock</td>
                <td>
                  <input
                    className='form-control'
                    name='specs.Clock'
                    type='text'
                    onChange={specsHandler.handleChange}
                    required
                  />
                </td>
                <td name='Cores'>Cores</td>
                <td>
                  <input
                    name='specs.Cores'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>

              <tr>
                <td name='Socket'>Socket</td>
                <td>
                  <input
                    name='specs.Socket'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
                <td name='Process'>Process</td>
                <td>
                  <input
                    name='specs.Process'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>TDP</td>
                <td>
                  <input
                    name='specs.TDP'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
                <td>L3 Cache</td>
                <td>
                  <input
                    name='specs.L3 Cache'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Release Year</td>
                <td>
                  <input
                    name='specs.Year'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        );
        break;
      case 'gpu':
        setTemplete(
          <table>
            <tbody>
              <tr>
                <td>GPU Clock</td>
                <td>
                  <input
                    name='specs.GPU-clock'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Bus</td>
                <td>
                  <input
                    name='specs.Bus'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Memory Size</td>
                <td>
                  <input
                    name='specs.Memory'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Memory Type</td>
                <td>
                  <input
                    name='specs.Memory-Type'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Memory Clock</td>
                <td>
                  <input
                    name='specs.Memory-clock'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Release Year</td>
                <td>
                  <input
                    name='specs.Year'
                    className='form-control'
                    onChange={specsHandler.handleChange}
                    type='text'
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        );
        break;
      default:
        break;
    }
  }, [type]);

  return templete;
}

export default ProductTempleteTypes;
