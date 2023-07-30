import { useState } from 'react';

const useSearchForm = (
  {initialValues, initialSelectedValue}:
  {initialValues: string; initialSelectedValue: {value: string; label: string}}
) => {
  const [value, setValue] = useState(initialValues);
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  return { value, setValue, selectedValue, setSelectedValue }
}

export default useSearchForm;