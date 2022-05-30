import React, { useState } from 'react';

//Custom hook for handling text inputsß

export const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
        setValue(e.target.value);
    }

    return [ value, onChange ];
}