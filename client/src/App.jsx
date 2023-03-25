import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { PageHome } from "pages/PageHome";
import { PageAuth } from "pages/PageAuth";
import { PageConfig } from "pages/PageConfig";

import { refreshUser } from "redux/auth/authOperations";
import { Loader } from "components/Loader/Loader";

import { PageProfile } from "pages/PageProfile";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isLogged = useSelector((state) => state.auth.isLogged);

  const persistedToken = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (persistedToken) {
      dispatch(refreshUser());
    }
  }, [dispatch, persistedToken]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isLogged ? <PageHome /> : <PageAuth />} />
            <Route
              path="/home"
              element={isLogged ? <PageHome /> : <Navigate to="/" />}
            />
            <Route
              path="/config"
              element={isLogged ? <PageConfig /> : <PageAuth />}
            />
            <Route path="/profile/:userId" element={<PageProfile />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      {/* {isLoading && <Loader />} */}
    </div>
  );
}

export default App;
