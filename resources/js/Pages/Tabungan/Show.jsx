import Guest from "@/Layouts/GuestLayout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
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

export default function Show(props) {
    const tabungan = props.tabungan;

    const [openModal, setOpenModal] = useState(false);
    const [alertDialog, setAlertDialog] = useState(false);
    const [statusTombol, setStatusTombol] = useState("tambah");
    const [statusLihat, seStatusLihat] = useState("terkumpul");
    const [modalSuccess, setModalSuccess] = useState(false);
    const { session } = usePage().props;
    const { data, setData, post, errors, reset } = useForm({
        nominal: "",
        keterangan: "",
        status: "tambah",
        tabungan_id: tabungan.id,
    });
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const simpanHandler = (e) => {
        if (data.status == "kurangi") {
            if (tabungan.tabungan_terkumpul == 0) {
                alert("Belum ada saldo yang terkumpul");
            } else {
                if (tabungan.tabungan_terkumpul - data.jumlah < 0) {
                    alert("Penarikan tidak boleh melebihi saldo terkumpul");
                } else {
                    post(route("handlerSaldo"), {
                        onSuccess: setOpenModal(false),
                        preserveScroll: true,
                        preserveState: true,
                    });
                }
            }
        } else {
            post(route("handlerSaldo"), {
                onSuccess: setOpenModal(false),
                preserveScroll: true,
                preserveState: true,
            });
        }
    };
    const modalSuccessHandler = () => {
        setModalSuccess(false);
    };
    useEffect(() => {
        if (session) {
            // Lakukan sesuatu jika session 'success' tersedia
            setModalSuccess(true);
        }
    }, [session]);
    const deleteItem = (item) => {
        router.delete(route("delete_detail"), {
            data: item,
            preserveState: true,
            preserveScroll: true,
        });
    };
    Echo.channel("tabungan").listen("TabunganEvents", (e) => {
        router.reload({ preserveScroll: true, preserveState: true });
    });
    return (
        <div className=" font-sans font-medium relative">
            <Dialogs
                open={openModal}
                onClose={setOpenModal}
                title={"Catatan Tabungan"}
            >
                <div className="w-[60vw]">
                    <div className="flex w-full justify-center items-center">
                        <div className="rounded-full border border-gray-500  flex overflow-hidden">
                            {tabungan.status_tabungan != "tercapai" && (
                                <button
                                    onClick={() => {
                                        setStatusTombol("tambah");
                                        setData("status", "tambah");
                                    }}
                                    className={clsx(
                                        statusTombol == "tambah"
                                            ? "bg-sky-200"
                                            : "",
                                        "w-full active:bg-sky-200 px-3 flex py-1 gap-2"
                                    )}
                                >
                                    <span>
                                        <AddIcon
                                            color="inhert"
                                            fontSize="inherit"
                                        />
                                    </span>
                                    Tambah
                                </button>
                            )}
                            <div className="border-r border-gray-500"></div>
                            {tabungan.tabungan_terkumpul > 0 && (
                                <button
                                    onClick={() => {
                                        setStatusTombol("kurangi");
                                        setData("status", "kurangi");
                                    }}
                                    className={clsx(
                                        statusTombol == "kurangi"
                                            ? "bg-sky-200"
                                            : "",
                                        "w-full active:bg-sky-200 px-3 flex py-1 gap-2"
                                    )}
                                >
                                    <span>
                                        <RemoveIcon
                                            color="inhert"
                                            fontSize="inherit"
                                        />
                                    </span>
                                    Kurangi
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="flex gap-2 items-center my-3">
                            <span>
                                <MoneyIcon />
                            </span>
                            <TextField
                                name="nominal"
                                onChange={changeHandler}
                                className="w-full"
                                label="Nominal"
                                type="number"
                            />
                        </div>
                        {errors.nominal && (
                            <div className="px-4 text-[8pt] italic text-red-500">
                                {errors.nominal}
                            </div>
                        )}
                        <div className="flex gap-2 items-center my-3">
                            <span>
                                <ShortTextIcon />
                            </span>
                            <TextField
                                name="keterangan"
                                onChange={changeHandler}
                                className="w-full"
                                label="Keterangan"
                            />
                        </div>
                        <div className="flex justify-center items-center gap-6 mt-10">
                            <button
                                onClick={handleCloseModal}
                                className="font-bold active:bg-sky-200 px-3 rounded-full py-1"
                            >
                                Batal
                            </button>
                            <button
                                onClick={simpanHandler}
                                className="font-bold bg-sky-300 active:bg-sky-200 px-3 rounded-full py-1"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </Dialogs>
            <Dialogs open={modalSuccess} onClose={setModalSuccess}>
                <div className="w-[50vw] flex flex-col justify-center items-center">
                    <h3 className="text-3xl">Hore!</h3>
                    <p>Tabunganmu sudah terkumpul</p>
                    <img className="w-32" src="/successfully-done.gif" />
                </div>
            </Dialogs>
            <div className="fixed z-[99] bg-white shadow-sm shadow-gray-400/50 w-full top-0 left-0 flex justify-between items-center px-2 py-2">
                <div className="w-8 h-8 transition-all duration-300 active:bg-slate-300 flex items-center justify-center rounded-full">
                    <Link
                        href={route("dashboard")}
                        className="text-slate-600 text-3xl active:text-slate-900 duration-300 transition-all p-2 rounded-full text-center"
                    >
                        <ChevronLeftIcon color="inherit" fontSize="inherit" />
                    </Link>
                </div>
                <div className="flex gap-1 items-center">
                    <Link
                        as="button"
                        href={route("delete", tabungan.id)}
                        className="text-slate-600 active:text-white active:bg-slate-900 rounded-lg px-1 py-1 active:px-3  transition-all duration-300"
                    >
                        <DeleteForeverIcon color="inherit" fontSize="inherit" />
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
                                className="relative px-4 py-2 border-b border-gray-400/50 flex justify-between items-center"
                            >
                                <div>
                                    <p>{item.waktu_menabung}</p>
                                    <p>{item.keterangan}</p>
                                    <p> Menabung di : {item.jenis_tabungan}</p>
                                </div>
                                <div>
                                    <p className="text-green-500">
                                        + <RupiahFormat value={item.jumlah} />
                                    </p>
                                    {item.status_masuk == "uang belum masuk" ? (
                                        <p className="text-red-500 text-[8pt] capitalize">
                                            {item.status_masuk} Ke Celengan
                                        </p>
                                    ) : (
                                        <p className="text-green-500 text-[8pt] capitalize">
                                            {item.status_masuk} Ke Celengan
                                        </p>
                                    )}
                                </div>
                                {item.status_masuk == "uang belum masuk" && (
                                    <div
                                        onClick={() => deleteItem(item)}
                                        className="bg-red-500 active:bg-red-700 py-1 rounded-lg px-1 inline-block text-white"
                                    >
                                        <DeleteForeverIcon color="inherit" />
                                    </div>
                                )}
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
                <div className="fixed bottom-2 right-5">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="text-xl bg-gray-500 py-1 px-3 rounded-md text-white active:bg-gray-800"
                    >
                        <AppRegistrationIcon
                            color="inherit"
                            fontSize="inherit"
                        />
                    </button>
                </div>
                <div className="mb-5 h-1"></div>
            </div>
        </div>
    );
}
Show.layout = (page) => <Guest children={page} />;
