import { Avatar, Chip, IconButton, ListItemButton, styled, Tooltip, Zoom } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Typography from '@mui/material/Typography';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import Box from '@mui/material/Box';

export interface ContentFlowProps {
  avatarSrc: string;
  avatarName: string;
  avatarContent?: ReactNode;
  title: string;
  link: string;
  content: ReactNode;
  id: number;
}

const ChipDetail = {
  fontSize: '0.9rem',
  fontWeight: 'bold',
  color: '#000000',
};

const ChipWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
`;

const TitleWrapper = styled(Typography)`
  display: inline-block;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000000;
`;

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

const Index = (props: {
  data: ContentFlowProps[];
  handleNavigate: (id: number) => void;
  flowTitle: ReactNode;
  chipColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  noDataWrapper: ReactNode;
}) => {
  const [index, setIndex] = useState(1);
  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIndex(index - 1);
  };
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIndex(index + 1);
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {props.flowTitle}
        {props.data.length !== 0 && (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={handleLeftClick} disabled={index === 1}>
              <KeyboardDoubleArrowLeft />
            </IconButton>
            <Typography variant={'body2'}>
              {index}/{props.data.length}
            </Typography>
            <IconButton onClick={handleRightClick} disabled={index === props.data.length}>
              <KeyboardDoubleArrowRight />
            </IconButton>
          </div>
        )}
      </div>
      {props.data.length !== 0 && (
        <ListItemButton
          id={'chip-container'}
          sx={{ padding: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'auto' }}
        >
          {props.data.map((item, chipIndex) => (
            <TabPanel value={index} index={chipIndex + 1} key={chipIndex}>
              <Zoom in={index === chipIndex + 1} timeout={200}>
                <ChipWrapper>
                  <Chip
                    avatar={<Avatar src={item.avatarSrc} alt={item.avatarName} />}
                    label={item.avatarName}
                    sx={ChipDetail}
                    color={props.chipColor}
                  />
                  <div
                    onClick={(e) => props.handleNavigate(item.id)}
                    style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Tooltip
                      placement={'bottom'}
                      title={item.content}
                      key={chipIndex}
                      arrow
                      id={'chip-item-' + item.id.toString()}
                    >
                      <TitleWrapper>{item.title}</TitleWrapper>
                    </Tooltip>
                  </div>
                </ChipWrapper>
              </Zoom>
            </TabPanel>
          ))}
        </ListItemButton>
      )}
      {props.data.length === 0 && props.noDataWrapper}
    </div>
  );
};

export default Index;
