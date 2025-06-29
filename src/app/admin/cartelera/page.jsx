"use client";
import AdminHeader from "@/components/AdminHeader";
import CardMovie from "@/components/CardMovie";
import ModalCartelera from "@/components/ModalCartelera";
import { useCartelera } from "@/hooks/useCartelera";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PageAdminCartelera() {
    const [movieListed, setMovieListed] = useState([]);
    const [movieSelected, setMovieSelected] = useState();
    const [showModal, setShowModal] = useState(false);
    const {handlerAddCartelera} = useCartelera();

    const getMoviesListed = async () => {
        const response = await axios.get(
            "http://localhost:8080/peliculas/estado/Listado"
        );
        setMovieListed(response.data);
    };

    useEffect(() => {
        getMoviesListed();
    }, []);

    return (
        <main className="min-h-screen flex flex-col justify-items-center bg-white">
            <AdminHeader />
            <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                Cartelera
            </h1>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 place-items-center gap-y-9 mt-10">
                {movieListed.map((movie, index) => (
                    <CardMovie
                        key={index}
                        isCartelera={true}
                        movie={movie}
                        onEdit={() => {
                            setMovieSelected(movie);
                            setShowModal(true);
                        }}
                    />
                ))}
            </div>
            {showModal && (
                <ModalCartelera
                    isOpen={showModal}
                    movie={movieSelected}
                    onClose={() => {
                        setShowModal(false);

                    }}
                    handlerAddCartelera={handlerAddCartelera}
                />
            )}
        </main>
    );
}
