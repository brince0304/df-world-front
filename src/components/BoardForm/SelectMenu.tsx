import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const SelectMenu = ({
  register,
  onChange,
  label,
  formControlProps,
  selectProps,
  variant,
  menuItemProps,
  menus,
}: ISelectMenuProps) => {
  return (
    <FormControl sx={formControlProps} variant={variant}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...register} id="boardTypeSelect" sx={selectProps}>
        {menus.map((menu, index) => {
          return (
            <MenuItem data-value={menu.id} sx={menuItemProps} value={menu.id} key={index} onClick={onChange}>
              {menu.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

interface ISelectMenuProps {
  register: any;
  onChange: (...args: any[]) => void;
  label: string;
  formControlProps?: SxProps<Theme>;
  selectProps?: SxProps<Theme>;
  variant?: 'standard' | 'outlined' | 'filled';
  menuItemProps?: SxProps<Theme>;
  menus: { id: string; name: string }[];
}

export default SelectMenu;
