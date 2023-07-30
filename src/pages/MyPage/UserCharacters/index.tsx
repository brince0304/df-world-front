import { Content } from '../../../interfaces/ICharactersData';
import * as React from 'react';
import UserCharactersList from '../../../components/UserCharactersList';

const UserCharacters = (props: { data: Content[]; adventure: string }) => {
  return <UserCharactersList data={props.data} adventure={props.adventure} />;
};

export default UserCharacters;
