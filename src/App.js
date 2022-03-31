import React, { useState } from "react";
import "./App.scss";

import Timer from "./components/Timer";
import Alarm from "./components/Alarm";
import Stopwatch from "./components/Stopwatch";
import Timezone from "./components/Timezone";

import { MdAlarm } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { FaHourglassHalf } from "react-icons/fa";

function App() {
    if (localStorage.getItem("alarms") === null) {
        localStorage.setItem("alarms", []);
    }

    const [Comp, setComp] = useState("alarm");
    const [Active, setActive] = useState("active1");

    function range(start, end) {
        return Array(end - start + 1)
            .fill()
            .map((x, i) => i + start);
    }

    return (
        <div className="App">
            <h1>Play with Time</h1>
            <div className="buttons">
                <button
                    className={`${Active === "active1" ? "active" : null}`}
                    onClick={() => {
                        setActive("active1");
                        setComp("alarm");
                    }}
                >
                    <MdAlarm className={`button`} /> Alarm
                </button>
                <button
                    className={`${Active === "active2" ? "active" : null}`}
                    onClick={() => {
                        setActive("active2");
                        setComp("clock");
                    }}
                >
                    <FiClock className={`button`} /> Clock
                </button>
                <button
                    className={`${Active === "active3" ? "active" : null}`}
                    onClick={() => {
                        setActive("active3");
                        setComp("stopwatch");
                    }}
                >
                    <BsStopwatch className={`button`} /> Stopwatch
                </button>
                <button
                    className={`${Active === "active4" ? "active" : null}`}
                    onClick={() => {
                        setActive("active4");
                        setComp("timer");
                    }}
                >
                    <FaHourglassHalf className={`button `} /> Timer
                </button>
            </div>
            {Comp === "alarm" ? <Alarm range={range} /> : null}
            {Comp === "clock" ? <Timezone /> : null}
            {Comp === "stopwatch" ? <Stopwatch /> : null}
            {Comp === "timer" ? <Timer range={range} /> : null}
        </div>
    );
}

export default App;
