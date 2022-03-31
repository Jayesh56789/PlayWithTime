import React, { useState, memo, useEffect, useRef } from "react";
import alarm from "../assets/alarm_clock.mp3";
import "./Timer.scss";
import { BiReset } from "react-icons/bi";
import { VscDebugStart } from "react-icons/vsc";
import { BsPause } from "react-icons/bs";

function Timer({ range }) {
    const [Hr, setHr] = useState(0);
    const [Min, setMin] = useState(0);
    const [Sec, setSec] = useState(0);
    const [LiveTimer, setLiveTimer] = useState("00:00:00");
    const [running, setRunning] = useState(false);

    useEffect(() => {
        return () => {
            clearInterval(interval);
        };
    }, []);

    const interval = useRef(null);

    // To create user input string (Hr:Min:Sec)
    const startTime = new Date();
    startTime.setHours(Hr);
    startTime.setMinutes(Min);
    startTime.setSeconds(Sec);

    // To create string (00:00:00)
    const endTime = new Date();
    endTime.setHours(0);
    endTime.setMinutes(0);
    endTime.setSeconds(0);

    let manipulateTimer = startTime.getTime();

    const sound = document.createElement("audio");
    sound.src = alarm;
    sound.style.display = "none";
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");

    const start = (e) => {
        e.preventDefault();
        setRunning(true);
        interval.current = setInterval(() => {
            manipulateTimer -= 1000;
            setHr(new Date(manipulateTimer).getHours());
            setMin(new Date(manipulateTimer).getMinutes());
            setSec(new Date(manipulateTimer).getSeconds());
            setLiveTimer(
                new Date(manipulateTimer).toTimeString().split(" ")[0]
            );
            if (manipulateTimer === endTime.getTime()) {
                clearInterval(interval.current);
                sound.play();
                setRunning(false);
            }
        }, 1000);
    };

    const pause = (e) => {
        e.preventDefault();
        clearInterval(interval.current);
    };

    const reset = (e) => {
        e.preventDefault();
        setRunning(false);
        setHr(0);
        setMin(0);
        setSec(0);
        setLiveTimer(undefined);
        clearInterval(interval.current);
    };

    const hourRange = range(0, 24);
    const minuteRange = range(0, 60);
    const secondRange = range(0, 60);

    return (
        <div className="timer container">
            <div className="livetimer">{LiveTimer}</div>
            {running ? null : (
                <div className="selectCon">
                    <select onChange={(e) => setHr(e.target.value)} value={Hr}>
                        {hourRange.map((x, i) => (
                            <option key={i} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setMin(e.target.value)}
                        value={Min}
                    >
                        {minuteRange.map((x, i) => (
                            <option key={i} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setSec(e.target.value)}
                        value={Sec}
                    >
                        {secondRange.map((x, i) => (
                            <option key={i} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="ti-buttons">
                <button
                    disabled={Hr === 0 && Min === 0 && Sec === 0 ? true : false}
                    onClick={start}
                >
                    <VscDebugStart id="button" />
                </button>
                <button onClick={pause}>
                    <BsPause id="button" />
                </button>
                <button onClick={reset}>
                    <BiReset id="button" />
                </button>
            </div>
        </div>
    );
}

export default memo(Timer);
