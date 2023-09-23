import Guest from "@/Layouts/GuestLayout";
import React from "react";

export default function Index() {
    return <div>Index</div>;
}

Index.layout = (page) => <Guest children={page} />;
