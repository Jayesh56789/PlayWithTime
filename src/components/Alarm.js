import React, { useState, useEffect, memo } from "react";
import AlarmSelect from "./AlarmSelect";
import "./Alarm.scss";
import alarm from "../assets/alarm_clock.mp3";

function Alarm({ range }) {
    const [LiveTime, setLiveTime] = useState(new Date().toLocaleString());
    const [Hour, setHour] = useState(
        LiveTime.toLocaleString().split(" ")[1].split(":")[0]
    );
    const [Min, setMin] = useState(
        LiveTime.toLocaleString().split(" ")[1].split(":")[1]
    );
    const [ampm, setAmPm] = useState(LiveTime.toLocaleString().split(" ")[2]);

    //To get alarms stored in localstorage
    const getAlarms = localStorage
        .getItem("alarms")
        .split(",")
        .filter((x) => x !== "");

    //To get the live time
    useEffect(() => {
        const inter = setInterval(() => {
            setLiveTime(new Date().toLocaleString());
        }, 1000);
        return () => {
            clearInterval(inter);
        };
    }, []);

    //To create a string (hh:mm:ss)
    const ringTime = new Date();
    ringTime.setHours(Hour);
    ringTime.setMinutes(Min);
    ringTime.setSeconds(0);

    const newRingTime = `${ringTime.toLocaleString().split(" ")[1]} ${ampm}`;

    const setAlarm = () => {
        //Set alarm and store in localstorage
        getAlarms.push(newRingTime);
        localStorage.setItem("alarms", getAlarms);
    };

    const removeAlarm = (value) => {
        //Remove from localstorage
        const filtered = getAlarms.filter((x) => x !== value);
        localStorage.setItem("alarms", filtered);
    };

    //Executes when Alarm time and live time matches
    if (
        getAlarms.find(
            (x) => x === `${LiveTime.split(" ")[1]} ${LiveTime.split(" ")[2]}`
        )
    ) {
        const sound = document.createElement("audio");
        sound.src = alarm;
        sound.style.display = "none";
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.play();
        const index = getAlarms.indexOf(
            `${LiveTime.split(" ")[1]} ${LiveTime.split(" ")[2]}`
        );
        const filtered = getAlarms.filter((x) => x !== getAlarms[index]);
        localStorage.setItem("alarms", filtered);
        alert(`It's ${getAlarms[index]}`);
    }

    const hour = range(1, 12);
    const min = range(0, 59);

    const hourSetter = (e) => {
        e.preventDefault();
        setHour(e.target.value);
    };

    const minSetter = (e) => {
        e.preventDefault();
        setMin(e.target.value);
    };

    const ampmSetter = (e) => {
        e.preventDefault();
        setAmPm(e.target.value);
    };

    return (
        <div className="alarm container">
            <strong>{new Date().toLocaleTimeString()}</strong>
            <div className="date">{new Date().toDateString()}</div>
            <AlarmSelect
                ampm={ampm}
                ampmSetter={ampmSetter}
                Hour={Hour}
                Min={Min}
                minSetter={minSetter}
                hourSetter={hourSetter}
                hour={hour}
                min={min}
                setAlarm={setAlarm}
            />
            <div className="alarms">
                <strong>Your Alarms:</strong>
                {getAlarms.length === 0 && <div>No Alarms has been set.</div>}
                {getAlarms.map((x, i) => (
                    <div key={i} id="alarm">
                        {x}{" "}
                        <button onClick={() => removeAlarm(x)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Alarm);
