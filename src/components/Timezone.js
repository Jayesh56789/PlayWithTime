import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import moment from "moment-timezone";
import "./Timezone.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TimezoneArr } from "../assets/TimezoneList";

function Timezone() {
    const [LiveTime, setLiveTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const inter = setInterval(() => {
            setLiveTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => {
            clearInterval(inter);
        };
    }, []);

    const [timeZone, setTimeZone] = useState("Africa/Abidjan");
    const [data, setData] = useState({});
    const [timezones, setTimezones] = useState([]);
    const timeData = `${data.timezone} - ${moment
        .tz(data.datetime, data.timezone)
        .format("LLLL")}`;

    useEffect(() => {
        const fetch = async () => {
            const request = await axios.get(
                `https://worldtimeapi.org/api/timezone/${timeZone}`
            );
            setData(request.data);
            console.log(request.data);
        };
        fetch();
    }, [timeZone]);

    const addToList = () => {
        setTimezones([...timezones, timeData]);
    };

    const remove = (value) => {
        const filtered = timezones.filter((x) => x !== value);
        setTimezones([...filtered]);
    };

    const addHandler = () => {
        if (timezones.find((x) => x.split("-")[0] === timeData.split("-")[0])) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="timezoneCon container">
            <strong className="livetimer">{LiveTime}</strong>
            <div className="date">{new Date().toDateString()}</div>
            <div className="timezoneSelect">
                <select onChange={(e) => setTimeZone(e.target.value)}>
                    {TimezoneArr.map((x, i) => (
                        <option key={i + 1} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
                {addHandler() ? null : (
                    <button onClick={addToList}>
                        <FaPlus className="button" />
                    </button>
                )}
            </div>
            <div className="timezoneData">
                <div>{timeData}</div>
            </div>
            {timezones.length !== 0 && (
                <>
                    <strong id="name">Timezones:</strong>
                    <div className="timezones">
                        {timezones.map((x, i) => (
                            <div key={i + 4} className="timezone">
                                <div key={i + 2}>
                                    {i + 1}. {x}
                                </div>{" "}
                                <button key={i + 3} onClick={() => remove(x)}>
                                    <FaMinus className="button" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(Timezone);
