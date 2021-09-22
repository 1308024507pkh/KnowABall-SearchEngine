import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import PlayerPage from './pages/PlayerPage';
import TeamPage from './pages/TeamPage';
import {  ThemeProvider, createTheme } from '@material-ui/core/styles';

// const font = "'Lato', sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f51b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fa2081',
    },
  },
  typography: {
    // fontFamily: chinese,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      "Microsoft Yahei",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route 
          path={["/search/query/:input", "/search/tags/all", "/search/tags/:tag"]} 
          component={ResultPage} 
        />
        <Route path="/player/:input" component={PlayerPage}/>
        <Route path="/team/:input" component={TeamPage}/>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;
