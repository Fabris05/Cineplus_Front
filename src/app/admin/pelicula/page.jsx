"use client";
import AdminHeader from "@/components/AdminHeader";
import CardMovie from "@/components/CardMovie";
import ModalEstadoPelicula from "@/components/ModalEstadoPelicula";
import ModalPelicula from "@/components/ModalPelicula";
import { MovieContext } from "@/context/MovieContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdminPagePelicula() {
    const [movieList, setMovieList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [modalType, setModalType] = useState("");

    const { initialMovieForm, handlerAddMovie, handlerUpdateMovie } =
        useContext(MovieContext);
    const [selectedMovie, setSelectedMovie] = useState(initialMovieForm);

    const getMovies = async () => {
        const response = await axios.get("http://localhost:8080/peliculas");
        setMovieList(response.data);
    };

    useEffect(() => {
        getMovies();
    }, [handlerAddMovie]);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Películas
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => {
                            setSelectedMovie(initialMovieForm);
                            setModalType("add");
                        }}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Película</span>
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 place-items-center gap-y-9">
                    {movieList.map((movie, index) => (
                        <CardMovie
                            key={index}
                            movie={movie}
                            onEdit={() => {
                                setSelectedMovie(movie);
                                setModalType("edit");
                            }}
                            onEditState={() => {
                                setSelectedMovie(movie);
                                setModalType("estado");
                            }}
                        />
                    ))}
                </div>
                {(modalType === "add" || modalType === "edit") && (
                    <ModalPelicula
                        isOpen={true}
                        onClose={() => setModalType("")}
                        handlerAddMovie={handlerAddMovie}
                        handlerUpdateMovie={handlerUpdateMovie}
                        initialForm={selectedMovie}
                        isEdit={modalType === "edit"}
                    />
                )}

                {modalType === "estado" && (
                    <ModalEstadoPelicula
                        isOpen={true}
                        onClose={() => setModalType("")}
                        initialForm={selectedMovie}
                    />
                )}
            </main>
        </>
    );
}
