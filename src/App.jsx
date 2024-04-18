import "./App.css";
import Fcfs from "./Components/FCFS";
import Roundrobin from "./Components/RoundRobin";
import Sjf from "./Components/SJF";
import Srfc from "./Components/SRTF";

import { useState } from "react";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  return (
    <div className="container">
      <header>
        <h1 className="text-center">CPU Scheduling Simulator</h1>
        <p className="text-center">Select an algorithm to get started</p>
      </header>

      <div className="algorithm-selection">
        <div
          className={`card ${selectedAlgorithm === "FCFS" ? "selected" : ""}`}
        >
          <h2>First-Come, First-Served (FCFS)</h2>
          <button onClick={() => setSelectedAlgorithm("FCFS")}>Select</button>
        </div>
        <div
          className={`card ${selectedAlgorithm === "SJF" ? "selected" : ""}`}
        >
          <h2>Shortest Job First (SJF)</h2>
          <button onClick={() => setSelectedAlgorithm("SJF")}>Select</button>
        </div>
        <div
          className={`card ${selectedAlgorithm === "SRTF" ? "selected" : ""}`}
        >
          <h2>Shortest Remaining Time First (SRTF)</h2>
          <button onClick={() => setSelectedAlgorithm("SRTF")}>Select</button>
        </div>
        <div
          className={`card ${selectedAlgorithm === "SRTF" ? "selected" : ""}`}
        >
          <h2>Round Robin (RR)</h2>
          <button onClick={() => setSelectedAlgorithm("RR")}>Select</button>
        </div>
      </div>

      {selectedAlgorithm === "FCFS" && <Fcfs />}
      {selectedAlgorithm === "SJF" && <Sjf />}
      {selectedAlgorithm === "SRTF" && <Srfc />}
      {selectedAlgorithm === "RR" && <Roundrobin />}
    </div>
  );
}

export default App;
