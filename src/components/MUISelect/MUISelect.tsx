import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

export interface ISelectItem<T extends string> {
  value: T;
  text: string;
}

interface MUISelectProps<T extends string> {
  label: string;
  items: Array<ISelectItem<T>>;
  currentItem: T;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent<Element, Event>) => void;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

export const MUISelect = <T extends string>({
  label,
  open,
  onClose,
  onOpen,
  items,
  currentItem,
  onChange
}: MUISelectProps<T>): JSX.Element => {
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="controlled-open-select"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        value={currentItem}
        label={label}
        onChange={onChange}
      >
        {items.map(({ value, text }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
