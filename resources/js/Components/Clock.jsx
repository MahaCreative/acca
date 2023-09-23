import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Clock = () => {
    const [time, setTime] = useState(
        moment().tz("Asia/Makassar").format("HH:mm:ss")
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().tz("Asia/Makassar").format("HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock bg-slate-800 w-[120px] py-1 text-center text-white font-mono rounded-md">
            <p>{time}</p>
        </div>
    );
};

export default Clock;
