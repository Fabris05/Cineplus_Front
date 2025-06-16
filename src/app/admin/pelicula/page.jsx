"use client";
import AdminHeader from "@/components/AdminHeader";
import CardMovie from "@/components/CardMovie";
import ModalPelicula from "@/components/ModalPelicula";
import axios from "axios";
import { useEffect, useState } from "react";


export default function AdminPagePelicula() {
    const[movieList, setMovieList] = useState([]);
    const[showModal, setShowModal] = useState(false);

    const getMovies = async () => {
        const response = await axios.get("http://localhost:8080/peliculas");
        setMovieList(response.data);
    }

    useEffect(() => {
        getMovies();
    },[]);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7">
                    Películas
                </h1>

                <div className="flex justify-end m-3">
                    <button onClick={ () => setShowModal(true)} className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200">
                        <span className="text-white">Agregar Película</span>
                    </button>
                </div>
                
                <div className="p-4">
                    {
                        movieList.map((movie, index) => (
                            <CardMovie key={index} movie={movie}/>
                        ))
                    }
                </div>
                <ModalPelicula isOpen={showModal} onClose = { () => setShowModal(false) } />
            </main>
        </>
    );
}
