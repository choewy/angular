import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section``;
const Header = styled.header``;
const Title = styled.h1``;
const Main = styled.main``;
const Footer = styled.footer``;

const Public = () => {
  const content = (
    <Section>
      <Header>
        <Title>Welcome Redux JWT Login Tutorials</Title>
      </Header>
      <Main>
        <p>Please Login</p>
      </Main>
      <Footer>
        <Link to="/login">Login</Link>
      </Footer>
    </Section>
  );

  return content;
};

export default Public;
