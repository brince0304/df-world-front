import useFastCharactersQuery from './useFastCharactersQuery';
import useSearchForm from 'hooks/uiHooks/useSearchForm';

const useFastCharacterSearchQuery = (searchFormProps: ReturnType<typeof useSearchForm>) => {
  const { data: fastResult } = useFastCharactersQuery(searchFormProps.value, searchFormProps.selectedValue);
  return fastResult;
};

export default useFastCharacterSearchQuery;
