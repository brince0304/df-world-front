import Box from '@mui/material/Box';
import { Button, Grow, IconButton, InputBase, ListItemButton, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import useSearchForm from 'hooks/uiHooks/useSearchForm';
import useChildBox from '../../hooks/uiHooks/useChildBox';

const SearchForm = ({
  placeholder,
  direction,
  filterOptions,
  handleSubmit,
  useSearchForms,
  setIsFocus,
}: ISearchFormProps) => {
  const { value, selectedValue, setValue, setSelectedValue } = useSearchForms;
  const selectRef = useRef<HTMLDivElement | null>(null);
  const { isFocus: openFocus, setIsFocus: setOpenFocus } = useChildBox(selectRef);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitCallback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || value === '' || value.length === 1) {
      return;
    }
    handleSubmit(value, selectedValue.value);
  };
  const handleOpen = () => {
    setOpenFocus(!openFocus);
  };
  const handleSetFocusTrue = () => {
    setIsFocus(true);
  };
  const handleSetFocusFalse = () => {
    setIsFocus(false);
  };
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Paper component="form" sx={searchFilterWrapperStyle} onBlur={handleSetFocusFalse} onSubmit={submitCallback}>
      <Box sx={customBoxStyle}>
        <Button style={searchFilterStyle} onClick={handleOpen}>
          {selectedValue.label}
        </Button>
        <Grow in={openFocus} unmountOnExit mountOnEnter>
          <FilterContainer direction={direction} ref={selectRef}>
            {filterOptions.map((option, index) => (
              <ListItemButton
                key={index}
                sx={{ width: '100%' }}
                onClick={() => {
                  setSelectedValue(option);
                  setOpenFocus(false);
                }}
              >
                <FilterOptionWrapper>{option.label}</FilterOptionWrapper>
              </ListItemButton>
            ))}
          </FilterContainer>
        </Grow>
      </Box>
      <InputBase
        sx={{ ml: 1, flex: 1, height: '100%' }}
        placeholder={placeholder}
        autoComplete={'off'}
        onFocus={handleSetFocusTrue}
        value={value}
        onChange={handleOnchange}
        inputRef={inputRef}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

interface ISearchFormProps {
  useSearchForms: ReturnType<typeof useSearchForm>;
  placeholder: string;
  filterOptions: { label: string; value: string }[];
  handleSubmit: (...args: any[]) => void;
  direction: string;
  setIsFocus: (...args: any[]) => void;
}

const customBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  width: '80px',
  backgroundColor: 'rgb(234, 241, 248)',
  borderRadius: 0,
  height: '100%',
  borderRight: '1px solid rgb(204, 204, 204)',
};

const searchFilterStyle = {
  fontWeight: 'bold',
  height: '100%',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  color: 'rgb(0, 88, 202)',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'rgb(234, 241, 248)',
    transition: 'all 0.2s ease-in-out',
  },
};

const searchFilterWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  border: '2px solid rgb(0, 157, 255)',
};

const FilterContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  ${(props: { direction: string }) => (props.direction === 'up' ? 'bottom: 120%' : 'top: 120%')};
  width: 100%;
  white-space: nowrap;
  background-color: white;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0px 0px 5px 5px;
  z-index: 100;
`;

const FilterOptionWrapper = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.8rem;
    font-weight: 600;
    color: rgb(0, 0, 0);
  }
`;

export default SearchForm;
