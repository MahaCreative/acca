import { Head, Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <div className="absolute top-0 left-0 w-full h-screen">
                    {children}
                </div>
            </div>
        </>
    );
}
