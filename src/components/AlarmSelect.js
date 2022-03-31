import React, { memo } from "react";

function AlarmSelect({
    hourSetter,
    Hour,
    hour,
    minSetter,
    Min,
    min,
    ampm,
    ampmSetter,
    setAlarm,
}) {
    return (
        <div className="selectCon">
            <div>
                <select onChange={hourSetter} value={Hour}>
                    {hour.map((x, i) => (
                        <option key={i} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
                <select onChange={minSetter} value={Min}>
                    {min.map((x, i) => (
                        <option key={i} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
                <select onChange={ampmSetter} value={ampm}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <button onClick={setAlarm}>Set Alarm</button>
        </div>
    );
}

export default memo(AlarmSelect);
