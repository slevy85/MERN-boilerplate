import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NoteAddBox from '../Note/NoteAddBox';

const App = ({ children }) => (
  <div class="container">
    <Header />

    <main>
      {children}
    </main>

    <Footer />
    <NoteAddBox closed="true"/>
  </div>
);

export default App;
