import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import * as themes from './styles/themes';

import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  const [theme, setTheme] = useState(themes.dark);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? themes.dark : themes.light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
