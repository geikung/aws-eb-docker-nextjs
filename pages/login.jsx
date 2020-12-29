import styled from 'styled-components';
import Page from './@components/page';

const LoginStyled = styled.div`

`;

export default function Login() {
  return (
    <Page>
      <LoginStyled>
        <label className="my-text">Login</label>
      </LoginStyled>
    </Page>
  );
}
