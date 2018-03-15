import React from 'react';

import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
const Header = () => (

  <PageHeader>
    Your notes
    <p class="lead"><small>Read, add, update and delete your notes.</small></p>

  </PageHeader>
  // <Jumbotron>
  //   <h1>Your notes application <br/><small>Read, add, update and delete your notes</small></h1>
  //
  // <header>
  //   <Link to="/">Home</Link>
  //
  //   <nav>
  //     <Link to="/helloworld">Hello World</Link>
  //   </nav>
  //
  //   <hr />
  // </header>
  // </Jumbotron>
);

export default Header;
