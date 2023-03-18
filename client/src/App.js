import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { PageHome } from "pages/PageHome";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isLogged ? <PageHome /> : <LoginPage />} />
            <Route
              path="/login"
              element={isLogged ? <PageHome /> : <LoginPage />}
            />
            <Route
              path="/home"
              element={isLogged ? <PageHome /> : <Navigate to="/" />}
            />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
