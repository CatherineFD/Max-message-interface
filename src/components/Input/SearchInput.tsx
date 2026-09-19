import React from 'react';
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';

interface SearchInputProps {
    onChange: (value: string) => void;
    value: string;
    placeholder: string;
}

const SearchInput = observer((props: SearchInputProps) => {
    const {
        onChange,
        value,
        placeholder,
    } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      allowClear
    />
  );
});

export default SearchInput;