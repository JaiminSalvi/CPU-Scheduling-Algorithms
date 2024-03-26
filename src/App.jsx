import "./App.css";
import Fcfs from "./Components/FCFS";

function App() {
  return (
    <>
      <div className="container">
        <header>
          <h1 className="text-center">CPU Scheduling Algorithms</h1>
        </header>
        <Fcfs/>
      </div>
    </>
  );
}

export default App;
