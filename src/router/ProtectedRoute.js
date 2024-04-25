import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import UserPanel from "../components/userPanel";
import { auth } from "../auth/auth";
import { resolveSettings } from "../auth/resolveSettings";
import ApiCalls from "../api/ApiCalls";
const ProtectedRoute = ({ ...rest }) => {
  const [isReAuthenticating, setIsReAuthenticating] = useState(true);
  const [isReAuthenticated, setIsReAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  useEffect(() => {
    const authSetting = auth.getAuthSettings();
    if (authSetting) {
      ApiCalls.callLoginApi(
        new resolveSettings().resolveUsername(),
        new resolveSettings().resolvePassword(),
        true
      ).then((responseJson) => {
        if (responseJson.Data.haveError) {
          setAuthError(responseJson.Data.error);
          setIsReAuthenticating(false);
          auth.removeStartupFolderId();
          auth.removeIsAuthenticated();
          auth.removeAuthSettings();
        }else {
          auth.setIsAuthenticated(true);
         
          auth.setAuthSettings(JSON.stringify(responseJson.Data.content));
          setIsReAuthenticated(true);
          setIsReAuthenticating(false);
        } 
      });
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() && isReAuthenticating ? (
          <div class="divLoader">
            <img src={process.env.PUBLIC_URL +"/axonlogosmall.png"} />
            <svg
              class="svgLoader"
              viewBox="0 0 100 100"
              width="15em"
              height="15em"
            >
              <path
                ng-attr-d="{{config.pathCmd}}"
                ng-attr-fill="{{config.color}}"
                stroke="none"
                d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                fill="#dfa903"
                transform="rotate(179.719 50 51)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  calcMode="linear"
                  values="0 50 51;360 50 51"
                  keyTimes="0;1"
                  dur="1s"
                  begin="0s"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
            </svg>
          </div>
        ) : auth.isAuthenticated() &&
          !isReAuthenticating &&
          isReAuthenticated ? (
          <UserPanel  title="Welcome User" {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/loginregister",
              state: { from: props.location,error: authError},
            }}
          />
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;
