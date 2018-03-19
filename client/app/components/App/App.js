import React, { Component } from 'react';

import Header from '../Header/Header';
import NoteAddBox from '../Note/NoteAddBox';

const App = ({ children }) => (
  <div className="container">
    <Header />

    <main>
      {children}
    </main>
  </div>
);

export default App;
