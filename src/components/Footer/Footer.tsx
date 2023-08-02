import styled from '@emotion/styled';

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <InnerContainer>gdgd</InnerContainer>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  margin-top: 50px;
  position: relative;
  color: rgb(255, 255, 255);
  padding: 36px 40px;
  min-height: 220px;
  letter-spacing: -0.4px;
`;

const Container = styled.div`
  @media screen and (max-width: 1100px) {
    background-position: 40% 0px;
  }
  @media screen and (max-width: 800px) {
    background-position: 48% 0px;
  }
  @media screen and (max-width: 600px) {
    background-position: 62% 0px;
  }
  position: absolute;
  background-image: url(https://bbscdn.df.nexon.com/data6/commu/201901/164421_5c46c9d5d2f8c.jpg);
  background-size: cover;
  z-index: 11;
  width: 100%;
  height: calc(100% + 2px);
  left: 0px;
  top: 0px;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  z-index: 11;
`;
