import React from 'react';

import { Route, Link } from 'react-router-dom';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SharedUiProps {}

const StyledSharedUi = styled.div`
  color: pink;
`;

export function SharedUi(props: SharedUiProps) {
  return (
    <StyledSharedUi>
      <h1>Welcome to shared-ui!</h1>

      <ul>
        <li>
          <Link to="/">shared-ui root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the shared-ui root route.</div>}
      />
    </StyledSharedUi>
  );
}

export default SharedUi;
