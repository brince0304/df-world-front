import { Card, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BoldNameWrapper = styled(Typography)`
  display: flex;
  font-weight: bold;
  color: black;
  width: 55px;
  font-size: 0.8rem;
`;

const ContentWrapper = styled(Typography)`
  display: block;
  color: gray;
  width: 55px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const LatestRemoveButtonWrapper = styled(Typography)`
  display: flex;
  color: #939393;
`;

const NoDataWrapper = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
  color: #939393;
  padding: 10px 0px;
`;

const SearchOptionTitleWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
  color: #121212;
  font-size: 0.8rem;
  padding: 4px;
  background-color: rgb(226, 226, 226);
`;

const SearchOptionContainer = styled(Card)`
  position: absolute;
  ${(props: { direction: string }) => (props.direction === 'up' ? 'bottom: 100%' : 'top: 100%')};
  display: flex;
  width: 100%;
  flex-direction: ${(props: { direction: string }) => (props.direction === 'up' ? 'column-reverse' : 'column')};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 0px solid;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const SearchOptionTitle = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(226, 226, 226);
  border-bottom: 0.5px solid silver;
`;

const SearchOptionBody = styled(Box)`
  display: grid;
  overflow: hidden;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
  background-color: white;
`;

const OptionRow = styled(Box)`
  display: flex;
  width: 100%;

  &:hover {
    background-color: rgba(216, 239, 246, 0.49);
    cursor: pointer;
    transition: 0.2s;
  }
`;

export {
  BoldNameWrapper,
  ContentWrapper,
  LatestRemoveButtonWrapper,
  NoDataWrapper,
  SearchOptionTitleWrapper,
  SearchOptionContainer,
  SearchOptionTitle,
  OptionRow,
  SearchOptionBody,
};
