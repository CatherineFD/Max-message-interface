import React from 'react';
import { MaskedInput } from 'antd-mask-input';

interface PhoneInputProps {
    value: string
    placeholder?: string,
    onChange: (value: string) =>void
}

const PhoneInput = (props: PhoneInputProps) => {
    const {
        value,
        placeholder = '+7 (___) ___-__-__',
        onChange,
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value);
    };

  return (
      <MaskedInput
        value={value}
        mask="70000000000"
        placeholder={placeholder}
        onChange={handleChange}
      />
  );
};

export default PhoneInput;