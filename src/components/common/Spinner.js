/**
 * Created on 24-Oct-18.
 */
import React from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Spinner = () => {
  return (
    <BarLoader
      widthUnit={"%"}
      width={100}
      height={2}
      color={'#36D7B7'}
    />
  );
};

export default Spinner;
