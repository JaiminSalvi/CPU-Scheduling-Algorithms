/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";

const Fcfs = () => {
  const [tasks, setTasks] = useState([
    { processId: "1", arrivalTime: "0", burstTime: "4" },
    { processId: "2", arrivalTime: "10", burstTime: "2" },
    { processId: "3", arrivalTime: "15", burstTime: "7" },
  ]);
  const [processId, setProcessId] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [utilization, setUtilization] = useState("");
  const [flag, setFlag] = useState(false);
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(null);
  const [averageWaitingTime, setAverageWaitingTime] = useState(null);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [indexArr, setIndex] = useState([]);

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
    setTasks([]);
    setFlag(false);
    setAverageTurnaroundTime(null);
    setAverageWaitingTime(null);
    setCompletionTimes([]);
    setTurnaroundTimes([]);
    setWaitingTimes([]);
    setIndex([]);
  };
  const [pairsArray, setPairsArray] = useState([]);

  const runTask = () => {
    let sortedTasks = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let completionTimesArr = [];
    let turnaroundTimesArr = [];
    let waitingTimesArr = [];
    let indexArr = [];
    let process = [];
    console.log(sortedTasks);
    let tempPairsArray = []; // Temporary array to accumulate pairs
    let c = 0;
    sortedTasks.forEach((task, index) => {
      let completionTime = currentTime + parseInt(task.burstTime);
      // Add pair to temporary array
      if (parseInt(task.arrivalTime) > currentTime) {
        completionTime += parseInt(task.arrivalTime) - currentTime;
        const p = {
          process: null,
          burstTime: parseInt(task.arrivalTime) - currentTime,
        };
        tempPairsArray.push(p); // Add null pair to temporary array
      }
      const pair = { process: task.processId, burstTime: task.burstTime };
      tempPairsArray.push(pair);
      completionTimesArr.push(completionTime);
      indexArr.push(parseInt(task.processId) - 1);
      turnaroundTimesArr.push(completionTime - parseInt(task.arrivalTime));
      waitingTimesArr.push(
        completionTime - parseInt(task.arrivalTime) - parseInt(task.burstTime)
      );

      totalTurnaroundTime += completionTime - parseInt(task.arrivalTime);
      totalWaitingTime +=
        completionTime - parseInt(task.arrivalTime) - parseInt(task.burstTime);

      currentTime = completionTime;
    });
    setPairsArray(tempPairsArray); // Update pairsArray after the loop
    let arr = [];
    for (let i = 0; i < indexArr.length; i++) {
      arr[indexArr[i]] = i;
    }
    let idle_time = 0;
    for (let i = 0; i < tempPairsArray.length; i++) {
      c += parseInt(tempPairsArray[i].burstTime);
      if (tempPairsArray[i].process === null) {
        idle_time += parseInt(tempPairsArray[i].burstTime);
      }
    }

    // console.log(arr);
    console.log(tempPairsArray);
    console.log(c);
    // console.log(sortedTasks.length);
    // console.log((idle_time / sortedTasks.length).toFixed(4) * 100);
    // console.log(completionTimesArr);
    // console.log(turnaroundTimesArr);
    // console.log(indexArr);
    setCompletionTimes(completionTimesArr);
    setTurnaroundTimes(turnaroundTimesArr);
    setWaitingTimes(waitingTimesArr);
    setIndex(arr);
    setAverageCompletionTime((c / tasks.length).toFixed(5));
    setAverageTurnaroundTime((totalTurnaroundTime / tasks.length).toFixed(5));
    setAverageWaitingTime((totalWaitingTime / tasks.length).toFixed(5));
    setUtilization((100 - (idle_time / c).toFixed(4) * 100).toFixed(4));
    setFlag(true);
    // handleClick();
  };

  const [num, setNum] = useState(0);
  const [boxes, setBoxes] = useState([]);

  const getColorForProcess = (processId) => {
    // Generate a color based on the process ID
    const hue = (parseInt(processId) * 50) % 360;
    return `hsl(${hue}, 70%, 70%)`;
  };

  // Inside your handleClick function:
  const handleClick = async () => {
    console.log(pairsArray);
    let tempBoxes = [];
    let num = 1;
    for (let i = 0; i < pairsArray.length; i++) {
      const pair = pairsArray[i];
      const color = getColorForProcess(pair.process); // Get color for the current process
      // Use async/await with setTimeout to delay the creation of each box
      for (let j = 0; j < parseInt(pair.burstTime); j++) {
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
                {pair.process === null ? (
                  <div style={boxStyle}></div>
                ) : (
                  <div style={boxStyle}>{`P${pair.process}`}</div>
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
        num++;
      }
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">First Come First Served Scheduling</h1>
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
                  <td>
                    {completionTimes[indexArr[parseInt(task.processId) - 1]]}
                  </td>
                  <td>
                    {turnaroundTimes[indexArr[parseInt(task.processId) - 1]]}
                  </td>
                  <td>
                    {waitingTimes[indexArr[parseInt(task.processId) - 1]]}
                  </td>
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

export default Fcfs;
