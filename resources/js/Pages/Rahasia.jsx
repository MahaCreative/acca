import RupiahFormat from "@/Components/RupiahFormat";
import { router } from "@inertiajs/react";
import React from "react";

export default function Rahasia() {
    const kirimValue = (data) => {
        router.post(route("rahasia"), { data: data });
    };
    return (
        <div className="w-full h-screen bg-slate-950 grid grid-cols-3 gap-4 py-16 px-8">
            <div
                onClick={() => kirimValue(1000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={1000} />
            </div>
            <div
                onClick={() => kirimValue(2000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={2000} />
            </div>
            <div
                onClick={() => kirimValue(5000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={5000} />
            </div>
            <div
                onClick={() => kirimValue(10000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={10000} />
            </div>
            <div
                onClick={() => kirimValue(20000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={20000} />
            </div>
            <div
                onClick={() => kirimValue(50000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={50000} />
            </div>
            <div
                onClick={() => kirimValue(75000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={75000} />
            </div>
            <div
                onClick={() => kirimValue(100000)}
                className="active:bg-slate-700 text-white p-2 rounded-lg border border-white flex items-center justify-center"
            >
                <RupiahFormat value={100000} />
            </div>
        </div>
    );
}
