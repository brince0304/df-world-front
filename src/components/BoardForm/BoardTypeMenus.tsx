import { boardCategory } from '../../constants';
import * as React from 'react';
import SelectMenu from './SelectMenu';

const BoardTypeMenus = ({ register, handleSelectChange, value }: IBoardTypeMenusProps) => {
  const selectSx = {
    fontFamily: 'Core Sans',
    fontSize: '14px',
    fontWeight: 'bold',
  };
  const formControlSx = { width: '30%', height: '100%' };

  const menuItemSx = {
    fontFamily: 'Core Sans',
    fontSize: '14px',
    fontWeight: 'bold',
  };
  return (
    <SelectMenu
      value={value}
      onChange={handleSelectChange}
      register={register}
      menus={boardCategory}
      label={'카테고리'}
      formControlProps={formControlSx}
      menuItemProps={menuItemSx}
      selectProps={selectSx}
    />
  );
};

interface IBoardTypeMenusProps {
  register: any;
  value: string;
  handleSelectChange: (...args: any[]) => void;
}

export default BoardTypeMenus;
