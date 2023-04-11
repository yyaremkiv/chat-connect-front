import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./configs/theme";
import { PageHome } from "pages/PageHome";
import { PageAuth } from "pages/PageAuth";
import { PageConfig } from "pages/PageConfig";
// import { refreshUser } from "redux/auth/authOperations";
import { PageProfile } from "pages/PageProfile";
import { PublicRoute } from "PublicRoute";
import { PrivateRoute } from "PrivateRoute";

import { FormLogin } from "components/FormLogin/FormLogin";
import { FormRegister } from "components/FormRegister/FormRegister";

import AuthOperations from "redux/auth/AuthOperations";

import { WidgetPosts } from "components/WidgetPosts/WidgetPosts";
import { WidgetAllUsers } from "components/WidgerAllUsers/WidgetAllUsers";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const persistedToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (persistedToken) {
      dispatch(AuthOperations.refresh());
    }
  }, [dispatch, persistedToken]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute redirectTo="/home" component={<PageAuth />} />
              }
            >
              <Route path="/" element={<FormLogin />} />
              <Route path="register" element={<FormRegister />} />
            </Route>
            <Route
              path="/home"
              element={<PrivateRoute redirectTo="/" component={<PageHome />} />}
            >
              <Route path="/home" element={<WidgetPosts />} />
              <Route path="/home/users" element={<WidgetAllUsers />} />
            </Route>
            <Route
              path="/config"
              element={
                <PrivateRoute redirectTo="/" component={<PageConfig />} />
              }
            />
            <Route
              path="profile/:userId"
              element={
                <PrivateRoute redirectTo="/" component={<PageProfile />} />
              }
            />
            <Route path="*" element={<p>Nothing found</p>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
