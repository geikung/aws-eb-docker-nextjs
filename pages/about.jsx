import styled from 'styled-components';
import Page from './@components/page';

const AboutStyled = styled.div`

`;

export default function About() {
  return (
    <Page>
      <AboutStyled>
        <label className="my-text">About</label>
      </AboutStyled>
    </Page>
  );
}
