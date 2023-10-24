import Dialogs from "@/Components/Dialog";
import Guest from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { TextField } from "@mui/material";
export default function Index() {
    const [dialog, setDialog] = useState(false);
    const { data, setData, errors, post } = useForm({
        email: "",
        password: "",
    });
    const closeHandler = (e) => {
        setDialog(false);
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Dialogs title={"Login"} open={dialog} onClose={closeHandler}>
                <div className="w-[70vw] flex flex-col gap-3">
                    <TextField
                        onChange={handleChange}
                        className="border-none outline-none w-full active:outline-none"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                    />
                    {errors.email && (
                        <div className="px-4 text-[8pt] italic text-red-500">
                            {errors.email}
                        </div>
                    )}
                    <TextField
                        onChange={handleChange}
                        className="border-none  outline-none w-full active:outline-none"
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                    />

                    <button
                        onClick={submitHandler}
                        className="py-2 active:bg-sky-600 px-4 rounded-lg bg-sky-400 text-white"
                    >
                        Login
                    </button>
                </div>
            </Dialogs>
            <div className="text-center">
                <img src="./splash.png" alt="" />
                <p>TABUNGAN PINTAR</p>
                <div className="absolute bottom-5 left-0 w-full flex items-center justify-center">
                    <div
                        onClick={() => setDialog(true)}
                        className="py-2 active:bg-sky-600 px-4 rounded-lg bg-sky-400 text-white"
                    >
                        Login Admin
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <Guest children={page} />;
