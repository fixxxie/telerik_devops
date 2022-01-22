import React from "react";

import Api from "../Api";
import User from "../User";
import * as H from "history";

export interface AppContextType {
  api: Api;
  setAuthenticated: (user: User) => void;
  navigate: Function;
  location: H.Location;
}

export class AppContext implements AppContextType {
  private isAuthenticated: boolean;
  private user: User | null;

  constructor(
    public readonly api: Api,
    public readonly navigate: Function,
    public readonly location: H.Location
  ) {
    this.isAuthenticated = false;
    this.user = null;
  }

  setAuthenticated(user: User) {
    this.user = user;
    this.isAuthenticated = true;
  }

  getCurrentUser() {
    return this.user;
  }
}

export default React.createContext({});
