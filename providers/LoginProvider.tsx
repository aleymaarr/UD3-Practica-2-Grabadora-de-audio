import React from "react";
import { LoginContext, LoginContextType } from "../contexts/LoginContext";

type LoginProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const LoginProvider = (props: LoginProviderProps) => {
  const { children } = props;

  const [isUserLogged, setIsUserLogged] = React.useState(true);
  const toggleIsUserLogged = () => setIsUserLogged(!isUserLogged);

  const [username, setUsername] = React.useState("");

  const defaultValue: LoginContextType = {
    isUserLogged: isUserLogged,
    toggleIsUserLogged: toggleIsUserLogged,
    username,
    setUsername,
  };

  return (
    <LoginContext.Provider value={defaultValue}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
