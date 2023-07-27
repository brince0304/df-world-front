import { BestArticles } from '../../interfaces/ArticleType';
import { ContentFlowProps } from '../../components/BestContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Chip, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { getBoardType } from '../../pages/Board';
import createInstance from '../axiosClient';

const ChipContent = (props: { likeCount: number; commentCount: string; boardType: string }) => {
  return (
    <Container>
      <FontWrapper>
        <FavoriteIcon sx={{ fontSize: 12 }} />
        {props.likeCount}
      </FontWrapper>
      <FontWrapper>
        <FontAwesomeIcon icon={faMessage} />
        {props.commentCount}
      </FontWrapper>
      <FontWrapper>
        <Chip size={'small'} variant={'filled'} label={props.boardType} sx={{ fontSize: 12 }} color={'primary'} />
      </FontWrapper>
    </Container>
  );
};

const FontWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const getBestArticles = async (url: string, dataUrl: string, setData: (data: ContentFlowProps[]) => void) => {
  createInstance.get(url).then((res: any) => {
    const data = res.data.bestArticles as BestArticles[];
    const contentFlowData = [] as ContentFlowProps[];
    data.forEach((item) => {
      const contentFlowItem = {
        avatarSrc: item.userProfileImgUrl,
        avatarName: item.userNickname,
        id: item.id,
        content: (
          <ChipContent
            commentCount={item.commentCount}
            likeCount={item.boardLikeCount}
            boardType={getBoardType(item.boardType)}
          />
        ),
        title: item.boardTitle,
        link: dataUrl + item.id,
      };
      contentFlowData.push(contentFlowItem);
    });
    setData(contentFlowData);
  });
};
