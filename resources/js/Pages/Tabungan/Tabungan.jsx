import React, { useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { TextField } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Link, useForm } from "@inertiajs/react";
import RupiahFormat from "@/Components/RupiahFormat";
export default function Tabungan() {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(""); // State untuk live preview gambar
    const { data, setData, post, reset, errors } = useForm({
        nama_tabungan: "",
        jumlah_tabungan: "",
        foto: "",
    });
    const handleLabelClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        // Di sini Anda dapat menangani perubahan file yang diunggah
        const selectedFile = e.target.files[0];
        setData("foto", e.target.files[0]);
        const imageUrl = URL.createObjectURL(selectedFile);
        setImagePreview(imageUrl); // Menyimpan URL gambar untuk live preview
        console.log("File yang dipilih:", selectedFile);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const simpanHandler = (e) => {
        e.preventDefault();
        post(route("tabungan"));
    };
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
                <div>
                    <button
                        onClick={simpanHandler}
                        className="text-white bg-slate-600 active:bg-slate-900 rounded-lg px-3 py-1 text-[8pt] transition-all duration-300"
                    >
                        Simpan
                    </button>
                </div>
            </div>
            <div className="relative mt-10">
                <div className="mt-3 mx-4 border-b border-gray-800/50 inline-block">
                    <h3>Rincian Target Tabungan</h3>
                </div>
                <div>
                    <form action="">
                        <div className="p-4 flex w-full justify-center">
                            <label
                                htmlFor="foto"
                                className="duration-300 transition-all bg-gray-300/80 active:bg-gray-400 w-[100vw] h-[50vw] flex items-center justify-center text-center active:text-slate-300 text-slate-700  text-7xl rounded-md shadow-md shadow-gray-800/50"
                            >
                                <AddPhotoAlternateIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                                <input
                                    id="foto"
                                    name="foto"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                            </label>
                        </div>
                        {errors.foto && (
                            <div className="px-4 text-[8pt] italic text-red-500">
                                {errors.foto}
                            </div>
                        )}

                        <div className="rounded-lg shadow-md shadow-gray-800/50 px-4 flex flex-col gap-10 border border-gray-500/50 py-3  mx-4">
                            <div className="flex gap-3 items-center">
                                <p className="text-slate-600 text-2xl">
                                    <ShortTextIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <TextField
                                    onChange={handleChange}
                                    className="border-none outline-none w-full active:outline-none"
                                    label="Nama Tabungan"
                                    variant="outlined"
                                    name="nama_tabungan"
                                />
                                {errors.nama_tabungan && (
                                    <div className="px-4 py-2 text-[8pt] italic text-red-500">
                                        {errors.nama_tabungan}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-slate-600 text-2xl">
                                    <MoneyIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <TextField
                                    onChange={handleChange}
                                    className="border-none outline-none w-full active:outline-none"
                                    label="Nama Tabungan"
                                    variant="outlined"
                                    name="jumlah_tabungan"
                                    type="number"
                                />
                                {errors.jumlah_tabungan && (
                                    <div className="px-4 py-2 text-[8pt] italic text-red-500">
                                        {errors.jumlah_tabungan}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                {imagePreview && (
                    <div className="px-2 py-4 rounded-lg bg-gray-300/70 mx-4 my-4 shadow-md shadow-gray-600/50">
                        <p className="capitalize">{data.nama_tabungan}</p>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-[90%] my-3 object-cover rounded-lg"
                        />
                        <p className="text-xl">
                            <RupiahFormat value={data.jumlah_tabungan} />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
