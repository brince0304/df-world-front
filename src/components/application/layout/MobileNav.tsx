import styled from 'styled-components';
import react from 'react';


const Container = styled.div`
    display: none;
  @media (max-width: 768px) {
    display: flex;
    visibility: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? 'visible' : 'hidden')};
    background-color: black;
    height: 100vh;
    width: 40%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? '100%' : '0')};
    left: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? '0' : '-100%')};
    backdrop-filter: blur(2px);
    z-index: 1;
  }
`;




const NavItem = styled.a`
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: 0.3s ease-in-out;
    &:hover {
        color: cornflowerblue;
    }
  cursor: pointer;

`;

const NavMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  padding-top: 25%;
    width: 100%;
    height: 100%;
`;



const NavBtnLink = styled.a`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
           transition: all 0.2s ease-in-out;
              background: #fff;
                color: #010606;
    }
`;


//네비바 바깥 누르면 닫히는 함수



export const MobileNav = (props:{isOpened:boolean, menuList:{name:string}[], handleClose:()=>void, handleModalOpen:()=>void}) => {
    return (
        <Container isOpened={props.isOpened}>
            <NavMenu>
                {props.menuList.map((item, index) => {
                    return (
                        <NavItem key={index} onClick={item.name==='로그인'? props.handleModalOpen:()=>{} }>
                            {item.name}
                        </NavItem>
                    )
                }
                )}
            </NavMenu>
        </Container>
    )

}

export default MobileNav;