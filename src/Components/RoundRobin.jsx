/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";

const Roundrobin = () => {
  const [tasks, setTasks] = useState([
    { processId: "1", arrivalTime: "0", burstTime: "5" },
    { processId: "2", arrivalTime: "1", burstTime: "3" },
    { processId: "3", arrivalTime: "2", burstTime: "1" },
    { processId: "4", arrivalTime: "3", burstTime: "2" },
    { processId: "5", arrivalTime: "4", burstTime: "3" },
  ]);
  const [processId, setProcessId] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [timeQuantum, setTimeQuantum] = useState("");
  const [utilization, setUtilization] = useState("");
  const [flag, setFlag] = useState(false);
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(null);
  const [averageWaitingTime, setAverageWaitingTime] = useState(null);
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [indexArr, setIndex] = useState([]);
  const [pairsArray, setPairsArray] = useState([]);
  const [boxes, setBoxes] = useState([]);

  const handleAddTask = () => {
    if (tasks.some((item) => item.processId === processId)) {
      alert("Process ID already taken!");
      return;
    }

    if (processId && arrivalTime && burstTime) {
      setTasks([...tasks, { processId, arrivalTime, burstTime }]);
      setProcessId("");
      setArrivalTime("");
      setBurstTime("");
    } else {
      alert("Don't Leave any field Blank!");
    }
  };

  const handleRemoveTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  const handleReset = () => {
    setProcessId("");
    setArrivalTime("");
    setBurstTime("");
  };

  const getColorForProcess = (processId) => {
    if (processId === -1) {
      return "#fff";
    }
    const hue = (parseInt(processId) * 50) % 360;
    return `hsl(${hue}, 70%, 70%)`;
  };

  const runTask = () => {
    if (timeQuantum === "") {
      alert("Time Quantum should not be empty!");
      return;
    }
    let burst_temp = [];
    let arrrival_temp = [];
    for (let i = 0; i < tasks.length; i++) {
      burst_temp.push(parseInt(tasks[i].burstTime));
      arrrival_temp.push(parseInt(tasks[i].arrivalTime));
    }
    let sortedTasks = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime); // Sort by burst time for SJF
    let visited = [];
    let queue = [];
    let completionTime = 0;
    let process = [];
    let arrival = [];
    let burst = [];
    sortedTasks.forEach((task, index) => {
      process.push(parseInt(task.processId));
      arrival.push(parseInt(task.arrivalTime));
      burst.push(parseInt(task.burstTime));
    });
    let tempPairsArray = [];

    let temp = [];
    temp.push(0);
    let first = arrival[0];
    while (true) {
      if (first == 0) break;
      if (first > timeQuantum) {
        tempPairsArray.push({ at: 0, bt: timeQuantum, p: null });
        first -= timeQuantum;
      } else {
        tempPairsArray.push({ at: 0, bt: first, p: null });
        break;
      }
    }
    queue.push({ at: arrival[0], bt: burst[0], p: process[0] });
    let num = 0;
    let arr = [];
    arr.push(process[0]);
    while (queue.length !== 0) {
      let current = queue.shift();
      for (let i = 0; i < process.length; i++) {
        if (arrival[i] > current.at && arrival[i] <= current.at + timeQuantum) {
          if (arr.includes(process[i])) {
            continue;
          } else {
            queue.push({ at: arrival[i], bt: burst[i], p: process[i] });
            arr.push(process[i]);
          }
        }
      }
      if (current.bt > timeQuantum) {
        tempPairsArray.push({
          at: current.at,
          bt: parseInt(timeQuantum),
          p: current.p,
        });
        queue.push({
          at: current.at,
          bt: current.bt - timeQuantum,
          p: current.p,
        });
      } else {
        tempPairsArray.push({ at: current.at, bt: current.bt, p: current.p });
      }
    }
    console.log(tempPairsArray);
    // while (len < process.length) {
    //   let p = -1;
    //   let at = 1000000000;
    //   let bt = 1000000000;
    //   //   let temp = [];
    //   let mini = 1000000000;
    //   let incoming = temp[temp.length - 1];
    //   let idx = -1;
    //   //   console.log(temp);
    //   for (let j = 0; j < process.length; j++) {
    //     if (arrival[j] <= incoming && arrival[j] != -1) {
    //       if (burst[j] < bt) {
    //         p = process[j];
    //         at = arrival[j];
    //         bt = burst[j];
    //         idx = j;
    //       } else if (burst[j] == bt) {
    //         if (at > arrival[j]) {
    //           p = process[j];
    //           at = arrival[j];
    //           bt = burst[j];
    //           idx = j;
    //         } else if (at == arrival[j]) {
    //           if (p > process[j]) {
    //             p = process[j];
    //             at = arrival[j];
    //             bt = burst[j];
    //             idx = j;
    //           }
    //         }
    //       }
    //     }
    //     if (arrival[j] != -1) {
    //       if (mini > arrival[j]) {
    //         mini = arrival[j];
    //       }
    //     }
    //   }
    //   if (idx == -1) {
    //     console.log("mini" + mini);
    //     temp.push(incoming + 1);
    //     tempPairsArray.push({ at: incoming, bt: 1, p: null });
    //     // i--;
    //   } else {
    //     console.log("one terminated------------------");
    //     console.log(at, bt, p);
    //     if (burst[idx] >= parseInt(timeQuantum)) {
    //       burst[idx] = burst[idx] - parseInt(timeQuantum);
    //       temp.push(incoming + parseInt(timeQuantum));
    //       tempPairsArray.push({ at, bt: parseInt(timeQuantum), p });
    //     } else {
    //       temp.push(incoming + burst[idx]);
    //       tempPairsArray.push({ at, bt: burst[idx], p });
    //       burst[idx] = -1;
    //       arrival[idx] = -1;
    //       process[idx] = -1;
    //       len++;
    //     }
    //     // if (burst[idx] == -1) {
    //     // visited[] = 1;
    //     // }
    //   }
    // }
    // console.log(temp);
    // // console.log(tempPairsArray);
    // console.log("burst time-----------");
    // console.log(tempPairsArray);
    setPairsArray(tempPairsArray);
    let completion = [];
    let c = 0;
    let turn = [];
    let visited1 = [];
    for (let i = 0; i < tempPairsArray.length; i++) {
      c += tempPairsArray[i].bt;
    }
    console.log(c);
    for (let i = tempPairsArray.length - 1; i >= 0; i--) {
      if (tempPairsArray[i].p === null) {
        c -= tempPairsArray[i].bt;
        continue;
      } else {
        if (visited1.includes(tempPairsArray[i].p)) {
          c -= tempPairsArray[i].bt;
          continue;
        } else {
          completion[tempPairsArray[i].p - 1] = c;
          visited1.push(tempPairsArray[i].p);
          c -= tempPairsArray[i].bt;
        }
      }
    }
    let pro = [];
    let wait = [];
    console.log("burst time-----------");
    console.log(tempPairsArray);
    console.log(completion);
    for (let i = 0; i < completion.length; i++) {
      turn.push(completion[i] - arrrival_temp[i]);
      pro[i + 1] = i;
      wait.push(completion[i] - arrrival_temp[i] - burst_temp[i]);
    }
    let sum1 = 0,
      sum2 = 0,
      sum3 = 0;
    for (let i = 0; i < completion.length; i++) {
      sum1 += completion[i];
      sum2 += turn[i];
      sum3 += wait[i];
    }

    // console.log(completion);
    console.log(turn);
    console.log(wait);
    setCompletionTimes(completion);
    setIndex(pro);
    setTurnaroundTimes(turn);
    setWaitingTimes(wait);
    setAverageCompletionTime((sum1 / completion.length).toFixed(5));
    setAverageTurnaroundTime((sum2 / completion.length).toFixed(5));
    setAverageWaitingTime((sum3 / completion.length).toFixed(5));
    setUtilization(100 - (c / tempPairsArray.length).toFixed(4) * 100);
    setFlag(true);
  };

  const handleClick = async () => {
    console.log(pairsArray);
    let tempBoxes = [];
    let num = 1;
    for (let i = 0; i < pairsArray.length; i++) {
      const pair = pairsArray[i];
      const color = getColorForProcess(pair.p - 1); // Get color for the current process
      // Use async/await with setTimeout to delay the creation of each box
      for (let j = 0; j < parseInt(pair.bt); j++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            const boxStyle = {
              width: "40px",
              height: "40px",
              border: "2px black solid",
              marginLeft: "2px",
              backgroundColor: color, // Use the generated color
              textAlign: "center",
              fontSize: "20px",
              //   color: "#fff",
            };
            // Create box elements using JSX
            const boxElement = (
              <div className="d-flex flex-column" key={`box-${i}-${j}`}>
                {pair.p === null ? (
                  <div style={boxStyle}></div>
                ) : (
                  <div style={boxStyle}>{`P${pair.p}`}</div>
                )}
                <div style={boxStyle}>{num}</div>
              </div>
            );
            // Add the new box element to tempBoxes
            tempBoxes.push(boxElement);
            // Update the state with the new boxes
            setBoxes([...tempBoxes]);
            // Resolve the promise after the timeout
            resolve();
          }, 1000); // Adjusted delay for each box
        });
        num = num + 1;
      }
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">Round Robin (RR)</h1>
        <div className="content d-flex justify-content-center align-items-center flex-column gap-4">
          <div className="input d-flex justify-content-center align-items-center">
            <div className="field">Process :</div>
            <div className="field-input">
              <input
                type="number"
                id="process"
                value={processId}
                onChange={(e) => setProcessId(e.target.value)}
                placeholder="Enter the Process id"
              />
            </div>
          </div>
          <div className="input d-flex justify-content-center align-items-center">
            <div className="field">Arrival Time :</div>
            <div className="field-input">
              <input
                type="number"
                id="AT"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                placeholder="Enter the Arrival Time of Process"
              />
            </div>
          </div>
          <div className="input d-flex justify-content-center align-items-center">
            <div className="field">Burst Time :</div>
            <div className="field-input">
              <input
                type="number"
                id="Bt"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                placeholder="Enter the Burst Time of the Process"
              />
            </div>
          </div>
          <div>
            <button className="btn btn-success" onClick={handleAddTask}>
              Add Task
            </button>
            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="input d-flex justify-content-center align-items-center">
            <div className="field">Time Quantum : </div>
            <div className="field-input">
              <input
                type="number"
                id="TQ"
                value={timeQuantum}
                placeholder="Enter the Time Quantum "
                onChange={(e) => setTimeQuantum(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-4 flex-column">
        <div className="table-container">
          <table className="table">
            {/* Table header */}
            <thead>
              <tr className="table-header">
                <th>Process ID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Completion Time</th>
                <th>Turnaround Time</th>
                <th>Waiting Time</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.processId}</td>
                  <td>{task.arrivalTime}</td>
                  <td>{task.burstTime}</td>
                  {/* Access completion time, turnaround time, and waiting time directly from pairsArray */}
                  <td>{completionTimes[indexArr[index + 1]]}</td>
                  <td>{turnaroundTimes[indexArr[index + 1]]}</td>
                  <td>{waitingTimes[indexArr[index + 1]]}</td>
                  <td>
                    <button
                      style={{ border: "none", background: "white" }}
                      onClick={() => handleRemoveTask(index)}
                    >
                      <MdRemoveCircle style={{ fontSize: "24px" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Run Processes button and result */}
        <button className="btn btn-success" onClick={runTask}>
          Run Processes
        </button>
        {flag && (
          <div
            className="container d-flex flex-column justify-content-center align-items-center mt-4"
            id="result1"
          >
            <div className="result">
              <p>Average Completion Time = {averageCompletionTime}</p>
              <p>Average Turn Around Time = {averageTurnaroundTime}</p>
              <p>Average Waiting Time = {averageWaitingTime}</p>
              <p>CPU Utilization = {utilization}%</p>
            </div>
          </div>
        )}
      </div>

      <div className="container mt-4">
        <h1>Visualization of the Process Scheduling</h1>
        {/* <input type="text" placeholder="Enter the number" />*/}
        <button className="btn btn-success" onClick={handleClick}>
          Visualize
        </button>
        <br></br>
        <div id="boxes">
          <div className="d-flex flex-column">
            <div
              id="box"
              style={{
                width: "80px",
                height: "40px",
                border: "2px black solid",
                marginLeft: "2px",
                textAlign: "center",
              }}
            >
              CPU IDLE
            </div>
            <div
              id="box"
              style={{
                width: "80px",
                height: "40px",
                border: "2px black solid",
                marginLeft: "2px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              0
            </div>
          </div>
          {boxes}
        </div>
      </div>
    </>
  );
};

export default Roundrobin;
