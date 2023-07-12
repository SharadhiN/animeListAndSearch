import logo from './logo.svg';
import './App.css';
import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Dashboard from "./components/Dashboard";
import { AnimeProvider } from "./providers/animeProvider";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Provider store={store}>
        <AnimeProvider>
          <Dashboard />
        </AnimeProvider>
      </Provider>
    </div>
  );
}

export default App;
