import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
const ModalPortal = (props: { children:ReactNode }) => {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(props.children, el);
};

export default ModalPortal;
