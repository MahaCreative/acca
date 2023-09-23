import Guest from "@/Layouts/GuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ShortTextIcon from "@mui/icons-material/ShortText";
import RupiahFormat from "@/Components/RupiahFormat";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Dialogs from "@/Components/Dialog";
import RemoveIcon from "@mui/icons-material/Remove";
import { TextField } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import clsx from "clsx";

export default function ShowSelesai(props) {
    const tabungan = props.tabungan;
    const [statusTombol, setStatusTombol] = useState("tambah");
    const [statusLihat, seStatusLihat] = useState("terkumpul");
    const [modalSuccess, setModalSuccess] = useState(false);

    return (
        <div className="font-sans font-medium relative">
            <div className="fixed z-[99] bg-white shadow-sm shadow-gray-400/50 w-full top-0 left-0 flex justify-between items-center px-2 py-2">
                <div className="w-8 h-8 transition-all duration-300 active:bg-slate-300 flex items-center justify-center rounded-full">
                    <Link
                        href={route("dashboard")}
                        className="text-slate-600 text-3xl active:text-slate-900 duration-300 transition-all p-2 rounded-full text-center"
                    >
                        <ChevronLeftIcon color="inherit" fontSize="inherit" />
                    </Link>
                </div>
            </div>
            <div className="relative mt-10">
                <div className="mt-3 mx-4 border-b border-gray-800/50 inline-block">
                    <h3>{tabungan.tabungan_untuk}</h3>
                </div>
                {tabungan && (
                    <Link
                        as="div"
                        href={route("show.tabungan", tabungan.id)}
                        className="px-2 py-4 duration-400 transition-all origin-top-right active:bg-gray-300 rounded-lg bg-gray-300/70 mx-4 my-4 shadow-md shadow-gray-600/50"
                    >
                        <p className="capitalize text-xl">
                            {tabungan.tabungan_untuk}
                        </p>
                        <img
                            src={"/storage/" + tabungan.foto_tabungan}
                            alt="Preview"
                            className="w-full h-[40%] my-3 object-cover rounded-lg"
                        />
                        <div className="">
                            <p className="text-xl">
                                <RupiahFormat
                                    value={tabungan.target_tabungan}
                                />
                            </p>
                            <p>Waktu Mulai : {tabungan.tanggal_mulai}</p>
                            <p>Waktu Tercapai : {tabungan.tanggal_tercapai}</p>
                        </div>
                        <div className="border-t font-bold text-xl border-gray-400/50 text-center my-3">
                            <p>Terakhir Menabung :</p>
                            <p>
                                {tabungan.detail_tabungan.length > 0 ? (
                                    <RupiahFormat
                                        value={
                                            tabungan.detail_tabungan[
                                                tabungan.detail_tabungan
                                                    .length - 1
                                            ].jumlah
                                        }
                                    />
                                ) : (
                                    <RupiahFormat value={0} />
                                )}
                            </p>
                        </div>
                    </Link>
                )}
                <div className="border-b border-gray-400/50  rounded-lg bg-gray-300/70 mx-4 my-4 shadow-md shadow-gray-600/50">
                    <div className=" px-2 py-4 flex justify-center  border-b border-gray-400/50 mx-4">
                        <div
                            onClick={() => seStatusLihat("terkumpul")}
                            className="w-1/2 active:bg-sky-200 flex flex-col items-center justify-center border-r border-gray-400/50"
                        >
                            <p className="text-gray-600 text-[8pt]">
                                Terkumpul
                            </p>
                            <p className="text-green-500 font-bold">
                                <RupiahFormat
                                    value={tabungan.tabungan_terkumpul}
                                />
                            </p>
                        </div>
                        <div
                            onClick={() => seStatusLihat("kekurangan")}
                            className="active:bg-sky-200 w-1/2 flex flex-col items-center justify-center"
                        >
                            <p className="text-gray-600 text-[8pt]">
                                Kekurangan
                            </p>
                            <p className="text-red-500 font-bold">
                                {tabungan.tabungan_terkumpul >
                                tabungan.target_tabungan ? (
                                    <p>
                                        Lebih{" "}
                                        <RupiahFormat
                                            value={
                                                tabungan.tabungan_terkumpul -
                                                tabungan.target_tabungan
                                            }
                                        />
                                    </p>
                                ) : (
                                    <RupiahFormat
                                        value={
                                            tabungan.target_tabungan -
                                            tabungan.tabungan_terkumpul
                                        }
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                    {statusLihat == "terkumpul" &&
                        tabungan.detail_tabungan &&
                        tabungan.detail_tabungan.map((item, key) => (
                            <div
                                key={key}
                                className="px-4 py-2 border-b border-gray-400/50 flex justify-between items-center"
                            >
                                <p>{item.waktu_menabung}</p>
                                <p className="text-green-500">
                                    + <RupiahFormat value={item.jumlah} />
                                </p>
                            </div>
                        ))}
                    {statusLihat == "kekurangan" &&
                        tabungan.penarikan &&
                        tabungan.penarikan.map((item, key) => (
                            <div
                                key={key}
                                className="px-4 py-2 border-b border-gray-400/50 flex justify-between items-center"
                            >
                                <p>{item.waktu_menarik}</p>
                                <p className="text-red-500">
                                    - <RupiahFormat value={item.jumlah} />
                                </p>
                            </div>
                        ))}
                </div>

                <div className="mb-5 h-1"></div>
            </div>
        </div>
    );
}
ShowSelesai.layout = (page) => <Guest children={page} />;
