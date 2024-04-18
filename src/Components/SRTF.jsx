/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";

const Srtf = () => {
  const [tasks, setTasks] = useState([
    { processId: "1", arrivalTime: "0", burstTime: "7" },
    { processId: "2", arrivalTime: "1", burstTime: "5" },
    { processId: "3", arrivalTime: "2", burstTime: "3" },
    { processId: "4", arrivalTime: "3", burstTime: "1" },
    { processId: "5", arrivalTime: "4", burstTime: "2" },
    { processId: "6", arrivalTime: "5", burstTime: "1" },
    { processId: "7", arrivalTime: "25", burstTime: "2" },
  ]);
  const [processId, setProcessId] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
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
    let len = 0;
    while (len < process.length) {
      let p = -1;
      let at = 1000000000;
      let bt = 1000000000;
      //   let temp = [];
      let mini = 1000000000;
      let incoming = temp[temp.length - 1];
      let idx = -1;
      //   console.log(temp);
      for (let j = 0; j < process.length; j++) {
        if (arrival[j] <= incoming && arrival[j] != -1) {
          if (burst[j] < bt) {
            p = process[j];
            at = arrival[j];
            bt = burst[j];
            idx = j;
          } else if (burst[j] == bt) {
            if (at > arrival[j]) {
              p = process[j];
              at = arrival[j];
              bt = burst[j];
              idx = j;
            } else if (at == arrival[j]) {
              if (p > process[j]) {
                p = process[j];
                at = arrival[j];
                bt = burst[j];
                idx = j;
              }
            }
          }
        }
        if (arrival[j] != -1) {
          if (mini > arrival[j]) {
            mini = arrival[j];
          }
        }
      }
      if (idx == -1) {
        console.log("mini" + mini);
        temp.push(incoming + 1);
        tempPairsArray.push({ at: incoming, bt: 1, p: null });
        // i--;
      } else {
        console.log("one terminated------------------");
        console.log(at, bt, p);
        temp.push(incoming + 1);
        burst[idx] = burst[idx] - 1;
        if (burst[idx] == 0) {
          // visited[] = 1;
          arrival[idx] = -1;
          process[idx] = -1;
          len++;
        }
        tempPairsArray.push({ at, bt: 1, p });
      }
    }
    // for (let i = 0; i < process.length; i++) {
    //   let p = -1;
    //   let at = 1000000000;
    //   let bt = 1000000000;
    //   //   let temp = [];
    //   let mini = 1000000000;
    //   let incoming = temp[temp.length - 1];
    //   //   console.log(temp);
    //   let idx = -1;
    //   for (let j = 0; j < process.length; j++) {
    //     if (arrival[j] <= incoming && arrival[j] != -1) {
    //       if (burst[j] < bt) {
    //         p = process[j];
    //         at = arrival[j];
    //         bt = burst[j];
    //         idx = j;
    //       } else if (burst[j] === bt) {
    //         if (at > arrival[j]) {
    //           p = process[j];
    //           at = arrival[j];
    //           bt = burst[j];
    //           idx = j;
    //         } else if (at === arrival[j]) {
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
    //     temp.push(mini);
    //     tempPairsArray.push({ at: incoming, bt: mini - incoming, p: null });
    //     i--;
    //   } else {
    //     console.log("one terminated------------------");
    //     console.log(at, bt, p);
    //     temp.push(bt + incoming);
    //     // visited[] = 1;
    //     arrival[idx] = -1;
    //     process[idx] = -1;
    //     burst[idx] = -1;
    //     tempPairsArray.push({ at, bt, p });
    //   }
    // }
    // console.log(temp);
    console.log(temp);
    console.log(tempPairsArray);
    setPairsArray(tempPairsArray);
    let completion = [];
    let c = 0;
    let turn = [];
    let visited1 = [];
    for (let i = tempPairsArray.length - 1; i >= 0; i--) {
      // c += tempPairsArray[i].bt;
      // completion.push(c);
      if (tempPairsArray[i].p == null) {
        c++;
        continue;
      } else {
        if (visited1.includes(tempPairsArray[i].p)) {
          continue;
        } else {
          visited1.push(tempPairsArray[i].p);
          completion[tempPairsArray[i].p - 1] = i + 1;
          // arrival[tempPairsArray[i].p]=tempPairsArray[i].at;
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
        <h1 className="text-center">Shortest Remaining Time First (SRTF)</h1>
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

export default Srtf;
