import styled from 'styled-components';

const LoadingBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: #ddd;
  z-index: 9999;

  &:after {
    content: '';
    display: block;
    width: ${(props:{ progress: number }) => props.progress}%;
    height: 100%;
    background-color: #4285f4;
    transition: width 0.1s ease;
  }

  &.loading:after {
    width: 50%;
  }
`;

export default LoadingBar;