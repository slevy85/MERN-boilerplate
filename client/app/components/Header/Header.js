import React from 'react';

import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
const Header = () => (
   <Link to="/">
    <PageHeader>
      Your notes
      <p class="lead"><small>Read, add, update and delete your notes.</small></p>
    </PageHeader>
  </Link>
);

export default Header;
