import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline, Typography, Toolbar, AppBar } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FourierSeriesCanvas from './FourierSeriesCanvas';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Fourier
          </Typography>
        </Toolbar>
      </AppBar>
      <FourierSeriesCanvas />
    </MuiThemeProvider>
  );
}

export default App;
