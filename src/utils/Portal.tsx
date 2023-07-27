import ReactDOM from 'react-dom';

const ModalPortal = (props: { children: React.ReactNode }) => {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(props.children, el);
};

export default ModalPortal;
