import React from "react";
import { Map } from "./Map/Map";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Map />
      </header>
    </div>
  );
};

export default App;
