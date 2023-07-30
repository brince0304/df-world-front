import { List } from '@mui/material';
import BoardListItem from './BoardListItem';
import React from 'react';
import { IBoardList } from '../../interfaces/IBoardList';
import { InfiniteData } from '@tanstack/react-query';

const BoardList = (list: InfiniteData<IBoardList>)=>{
  return (
    <List>
      {list.pages.map((items) => {
          return items.content.map((item) => {
            return (
              <BoardListItem {...item} key={item.id} />
            )
          }
        )
      }
    )}
    </List>
  )
}

export default BoardList;