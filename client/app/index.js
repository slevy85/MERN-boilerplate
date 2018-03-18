import React from 'react';
import { render } from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import NotePage from './components/Note/NotePage';
import NoteEditPage from './components/Note/NoteEditPage';


import './styles/styles.css';

render((
  <Router>
    <App>
    <Route
      render={({ location }) => (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="slide" timeout={{ enter: 1000, exit: 600 }}>
              <Switch location={location}>
                <Route exact path="/" component={NotePage}/>
                <Route path="/notes/:id" component={NoteEditPage}/>
                <Route component={NotFound}/>
              </Switch>
          </CSSTransition>
      </TransitionGroup>
    )}
      />
    </App>
  </Router>
), document.getElementById('app'));
