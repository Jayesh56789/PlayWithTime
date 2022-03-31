import React, { useRef, useState, useEffect, memo } from "react";
import "./Stopwatch.scss";
import { VscDebugStart } from "react-icons/vsc";
import { BsPause, BsFlag } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

function Stopwatch() {
    useEffect(() => {
        return () => {
            clearInterval(interval);
        };
    }, []);
    const interval = useRef(null);

    const [Hour, setHour] = useState(0);
    const [Min, setMin] = useState(0);
    const [Sec, setSec] = useState(0);
    const [laps, setLaps] = useState([]);
    const [running, setRunning] = useState(false);

    // To create a string (hh:mm:ss)
    const date = new Date();
    date.setHours(Hour);
    date.setMinutes(Min);
    date.setSeconds(Sec);
    let MS = date.getTime();

    const run = (e) => {
        e.preventDefault();
        setRunning(true);
        interval.current = setInterval(start, 1000);
    };

    const start = () => {
        MS += 1000;
        const timer = new Date(MS);
        setHour(timer.getHours());
        setMin(timer.getMinutes());
        setSec(timer.getSeconds());
    };

    const pause = (e) => {
        e.preventDefault();
        setRunning(false);
        clearInterval(interval.current);
    };

    const lap = (e) => {
        e.preventDefault();
        setLaps([...laps, date.toTimeString().split(" ")[0]]);
    };

    const reset = (e) => {
        e.preventDefault();
        setRunning(false);
        clearInterval(interval.current);
        setHour(0);
        setMin(0);
        setSec(0);
        setLaps([]);
    };

    return (
        <div className="stopwatch container">
            <div className="timer">{`${
                date.toTimeString().split(" ")[0]
            }`}</div>
            <div className="sw-buttons">
                {running ? null : (
                    <button onClick={run}>
                        <VscDebugStart id="button" />
                    </button>
                )}
                <button onClick={pause}>
                    <BsPause id="button" />
                </button>
                <button onClick={reset}>
                    <BiReset id="button" />
                </button>
                {running ? (
                    <button onClick={lap}>
                        <BsFlag id="button" />
                    </button>
                ) : null}
            </div>

            {laps && (
                <>
                    <div id="name">Laps:</div>
                    <div className="laps">
                        {laps.map((x, i) => (
                            <div key={i}>
                                {i + 1}. {x}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(Stopwatch);
