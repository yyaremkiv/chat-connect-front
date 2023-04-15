import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { PageAuth } from "pages/PageAuth";
import { FormLogin } from "components/FormLogin/FormLogin";
import { FormRegister } from "components/FormRegister/FormRegister";
import { Layout } from "pages/Layout";
import { PageHome } from "pages/PageHome";
import { WidgetPosts } from "components/WidgetPosts/WidgetPosts";
import { WidgetAllUsers } from "components/WidgerAllUsers/WidgetAllUsers";
import { PageProfile } from "pages/PageProfile";
import { PageConfig } from "pages/PageConfig";
import { PageNotFound } from "pages/PageNotFound";
import { PublicRoute } from "PublicRoute";
import { PrivateRoute } from "PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./configs/theme";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
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
            element={<PrivateRoute redirectTo="/" component={<Layout />} />}
          >
            <Route path="" element={<PageHome />}>
              <Route path="" element={<WidgetPosts />} />
              <Route path="users" element={<WidgetAllUsers />} />
            </Route>
            <Route path="config" element={<PageConfig />} />
            <Route path="profile/:userId" element={<PageProfile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
