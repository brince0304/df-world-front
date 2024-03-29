import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from '@emotion/styled';

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  color: gray;
  padding: 20px 0;
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const ErrorScreen = (props: { icon: IconProp; message: string }) => {
  return (
    <NoDataWrapper>
      <FontAwesomeIcon icon={props.icon} size={'xl'} />
      {props.message}
    </NoDataWrapper>
  );
};

export default ErrorScreen;
