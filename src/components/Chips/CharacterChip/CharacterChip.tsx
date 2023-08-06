import { Avatar, Tooltip } from '@mui/material';
import { CharacterContent } from './CharacterChipContent';
import MyChip from '../MyChip';

export const CharacterChip = (props: {
  characterName: string;
  characterImgUrl: string;
  adventureName: string;
  serverId: string;
  characterId: string;
}) => {
  const chipStyle = {
    fontSize: '13px',
    '& > img': {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '500%',
      width: '1300%',
      backgroundColor: '#c4c4c4',
    },
  };
  return (
    <Tooltip
      title={
        <CharacterContent
          characterName={props.characterName}
          serverId={props.serverId}
          characterId={props.characterId}
          characterImgUrl={props.characterImgUrl}
          adventureName={props.adventureName}
        />
      }
      arrow
    >
      <MyChip
        avatar={<Avatar src={props.characterImgUrl} sx={chipStyle}></Avatar>}
        label={props.characterName}
        color="default"
        size="medium"
        data-name={props.characterName}
      />
    </Tooltip>
  );
};

export default CharacterChip;
