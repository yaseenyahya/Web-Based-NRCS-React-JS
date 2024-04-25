import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ProtectedRoute from "./router/ProtectedRoute";
import LoginRegister from "./components/loginregister";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";
import CustomDialogRedux from "./components/CustomDialogRedux";
function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2d2d2d", //your color
      },
    },
  });
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CustomDialogRedux />
          <BrowserRouter>
            <Switch>
              <Route
                path="/loginregister"
                render={(props) => <LoginRegister{...props} titleLogin={`Login`} titleRegister={"Register"} />}
              ></Route>
              <ProtectedRoute path="/"></ProtectedRoute>
              <Route path="*" render={() => <div>404</div>}></Route>
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
