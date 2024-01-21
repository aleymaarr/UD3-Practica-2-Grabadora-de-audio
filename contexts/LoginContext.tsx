import React from "react";

type LoginContextType = {
  isUserLogged: boolean;
  toggleIsUserLogged: Function;
  username: string;
  setUsername: Function;
};

const LoginContext = React.createContext({} as LoginContextType);

export { LoginContext, LoginContextType as LoginContextType };
