import './App.css';
import Advertisements from './pages/Advertisements';
import { Amplify } from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Advertisements />
      </header>
    </div>
  );
}

export default App;
