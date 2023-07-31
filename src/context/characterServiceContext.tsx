import { createContext, ReactNode, useContext } from 'react';
import { ICharacterService } from '../services/characterService';

const characterServiceContext = createContext<ICharacterService>({} as ICharacterService);

export const useCharacterService = () => useContext(characterServiceContext);

const CharacterServiceProvider = ({
  children,
  characterService,
}: {
  children: ReactNode;
  characterService: ICharacterService;
}) => {
  const getCharacterList = characterService.getCharacterList.bind(characterService);
  const getCharacterDetail = characterService.getCharacterDetail.bind(characterService);

  return (
    <characterServiceContext.Provider
      value={{
        getCharacterList,
        getCharacterDetail,
      }}
    >
      {children}
    </characterServiceContext.Provider>
  );
};

export default CharacterServiceProvider;
