import React from "react";

const RupiahFormat = ({ value }) => {
    // Fungsi untuk memformat angka ke format rupiah
    const formatRupiah = (angka) => {
        let numberString = angka.toString();
        let sisa = numberString.length % 3;
        let rupiah = numberString.substr(0, sisa);
        let ribuan = numberString.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        return "Rp " + rupiah;
    };

    return <span>{formatRupiah(value)}</span>;
};

export default RupiahFormat;
