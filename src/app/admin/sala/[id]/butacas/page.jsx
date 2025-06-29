"use client";

import AdminHeader from "@/components/AdminHeader";
import GridButacas from "@/components/GridButacas";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ButacasSalaAdmin() {
    const { id } = useParams();
    const [butacas, setButacas] = useState([]);

    const getButacas = async () => {
        const response = await axios.get(
            `http://localhost:8080/butacasala/sala/${id}`
        );
        setButacas(response.data);
    };

    useEffect(() => {
        getButacas();
    }, [id]);

    return (
        <main className="min-h-screen flex flex-col justify-items-center bg-white">
            <AdminHeader />
            <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                Butacas de la Sala {id}
            </h1>
            <GridButacas butacas={butacas} editable={false} />
        </main>
    );
}
