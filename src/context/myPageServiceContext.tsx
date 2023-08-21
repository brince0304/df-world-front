import { createContext, ReactNode, useContext } from 'react';
import { IMyPageService } from '../services/myPageService';

const myPageServiceContext = createContext<IMyPageService | null>(null);

export const useMyPageService = () => useContext(myPageServiceContext);

const MyPageServiceProvider = ({ children, myPageService }: { children: ReactNode; myPageService: IMyPageService }) => {
  const getUserMyPageResponse = myPageService.getUserMyPageResponse.bind(myPageService);
  const addCharacterToUserAccount = myPageService.addCharacterToUserAccount.bind(myPageService);
  const changeUserProfileIcon = myPageService.changeUserProfileIcon.bind(myPageService);
  const changeUserNickname = myPageService.changeUserNickname.bind(myPageService);
  const changeUserPassword = myPageService.changeUserPassword.bind(myPageService);
  const deleteCharacterFromUserAccount = myPageService.deleteCharacterFromUserAccount.bind(myPageService);
  const getUserActivities = myPageService.getUserActivities.bind(myPageService);
  const validateUserNickname = myPageService.validateUserNickname.bind(myPageService);
  const changeUserProfileIconByURL = myPageService.changeUserProfileIconByURL.bind(myPageService);
  return (
    <myPageServiceContext.Provider
      value={{
        changeUserProfileIconByURL,
        getUserActivities,
        deleteCharacterFromUserAccount,
        getUserMyPageResponse,
        addCharacterToUserAccount,
        changeUserProfileIcon,
        changeUserNickname,
        changeUserPassword,
        validateUserNickname,
      }}
    >
      {children}
    </myPageServiceContext.Provider>
  );
};

export default MyPageServiceProvider;
