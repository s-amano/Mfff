import React from 'react';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import Navbar from './components/Navbar';
import ApiContextProvider from './context/ApiContext';
import Main from './components/Main';
import ProfileInfo from './components/ProfileInfo';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Comic Neue',
  },
});

function App() {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/profiles" component={Main} />
            <Route exact path="/profile-info" component={ProfileInfo} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
