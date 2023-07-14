import React, { useState } from 'react';

function useInput(initial) {
  const [values, setValues] = useState(initial);
  const handler = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return [values, handler];
}

export default useInput;
