import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const FormWrapper = styled(Paper)`
  text-align: center;
  margin: 48px auto;
  padding: 32px 0;
  width: 480px;

  > form > div {
    width: 320px;
    margin-bottom: 18px;
  }
`;
