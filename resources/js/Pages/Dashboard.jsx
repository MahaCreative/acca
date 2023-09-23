import Clock from "@/Components/Clock";
import Guest from "@/Layouts/GuestLayout";
import React, { useState } from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Link } from "@inertiajs/react";
import RupiahFormat from "@/Components/RupiahFormat";
import clsx from "clsx";
export default function Dashboard(props) {
    const tabungan = props.tabungan;
    const tabunganTercapai = props.tabunganTercapai;
    const [statusLihat, setStatusLihat] = useState("Berlangsung");
    console.log(tabunganTercapai);
    return (
        <div className="">
            <div className=" bg-white text-[8pt]">
                <div className="p-2">
                    <h3 className="text-slate-950 font-semibold font-mono text-[10pt]">
                        Celengan Pintar
                    </h3>
                </div>
                <div className="w-full grid grid-cols-2 border-b border-slate-500/50">
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => setStatusLihat("Berlangsung")}
                            className={clsx(
                                statusLihat == "Berlangsung"
                                    ? "border-b border-slate-700"
                                    : "",
                                "transition-all duration-300 text-[8pt] text-slate-800  active:bg-sky-400/30 rounded-t-md py-2 font-mono border-b-2  w-[40%]"
                            )}
                        >
                            Berlangsung
                        </button>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => setStatusLihat("")}
                            className={clsx(
                                statusLihat == ""
                                    ? "border-b border-slate-700 "
                                    : "",
                                "transition-all duration-300 text-[8pt] text-slate-800  active:bg-sky-400/30 rounded-t-md py-2 font-mono border-b-2 w-[40%]"
                            )}
                        >
                            Tercapai
                        </button>
                    </div>
                </div>
                <div className="flex justify-end my-2 mx-2">
                    <Clock />
                </div>
                {statusLihat == "Berlangsung" ? (
                    <>
                        {tabungan ? (
                            <Link
                                as="div"
                                href={route("show.tabungan", tabungan.id)}
                                className="px-2 py-4 duration-400 transition-all origin-top-right active:bg-gray-300 rounded-lg bg-gray-300/70 mx-4 my-4 shadow-md shadow-gray-600/50"
                            >
                                <p className="capitalize text-xl">
                                    {tabungan.tabungan_untuk}
                                </p>
                                <img
                                    src={"storage/" + tabungan.foto_tabungan}
                                    alt="Preview"
                                    className="w-full h-[40%] my-3 object-cover rounded-lg"
                                />
                                <div className="">
                                    <p className="text-xl">
                                        <RupiahFormat
                                            value={tabungan.target_tabungan}
                                        />
                                    </p>
                                    <p>
                                        Waktu Mulai : {tabungan.tanggal_mulai}
                                    </p>
                                    <p>
                                        Waktu Tercapai :{" "}
                                        {tabungan.tanggal_tercapai}
                                    </p>
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
                        ) : (
                            <div className="my-2 flex flex-col w-full h-[80vh] items-center justify-center text-slate-800">
                                <p className="text-7xl ">
                                    <FormatListNumberedIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <p>Tidak ada data untuk ditampilkan</p>
                            </div>
                        )}

                        {tabungan == null && (
                            <div className="absolute bottom-5 right-4">
                                <Link
                                    href={route("tabungan")}
                                    className="duration-300 transition-all active:bg-slate-900 bg-slate-600 px-3  py-2 rounded-md text-white"
                                >
                                    Tambah Target Tabungan
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {tabunganTercapai ? (
                            tabunganTercapai.map((item, key) => (
                                <Link
                                    as="div"
                                    href={route("showTercapai", item.id)}
                                    className="px-2 py-4 duration-400 transition-all origin-top-right active:bg-gray-300 rounded-lg bg-gray-300/70 mx-4 my-4 shadow-md shadow-gray-600/50"
                                >
                                    <p className="capitalize text-xl">
                                        {item.tabungan_untuk}
                                    </p>
                                    <img
                                        src={"storage/" + item.foto_tabungan}
                                        alt="Preview"
                                        className="w-full h-[40%] my-3 object-cover rounded-lg"
                                    />
                                    <div className="">
                                        <p className="text-xl">
                                            <RupiahFormat
                                                value={item.target_tabungan}
                                            />
                                        </p>
                                        <p>
                                            Waktu Mulai : {item.tanggal_mulai}
                                        </p>
                                        <p>
                                            Waktu Tercapai :{" "}
                                            {item.tanggal_tercapai}
                                        </p>
                                    </div>
                                    <div className="border-t font-bold text-xl border-gray-400/50 text-center my-3">
                                        <p>Terakhir Menabung :</p>
                                        <p>
                                            {item.detail_tabungan.length > 0 ? (
                                                <RupiahFormat
                                                    value={
                                                        item.detail_tabungan[
                                                            item.detail_tabungan
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
                            ))
                        ) : (
                            <div className="my-2 flex flex-col w-full h-[80vh] items-center justify-center text-slate-800">
                                <p className="text-7xl ">
                                    <FormatListNumberedIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <p>Tidak ada data untuk ditampilkan</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Guest children={page} />;
