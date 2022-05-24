import './App.css';
import Nftap from "./Navbar/ExmplNav";

import {BrowserRouter as Router} from "react-router-dom";
import React, {useMemo, useState} from "react";
import { UserContext } from "./UserContext";
import {Provider} from "react-redux";
import Home from "./Home";
import {Image} from "react-konva";

function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
      <UserContext.Provider value={value}>
          <div className={"ui inverted"}>
      <Router>
          <div>
              <Nftap/>
          </div>
        </Router>
          </div>
</UserContext.Provider>

);
}

export default App;
