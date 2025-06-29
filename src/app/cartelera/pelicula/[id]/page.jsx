"use client";

import { Header } from "@/components/Header";
import MapaButacas from "@/components/MapaButacas";
import { useButacas } from "@/hooks/useButacas";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagePelicula() {
    const { id } = useParams();
    const router = useRouter();
    const [movieDetalle, setMovieDetalle] = useState(null);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [loadingButacas, setLoadingButacas] = useState(false);

    const {
        butacas,
        setButacas,
        selectedButacas,
        toggleButaca,
        resetButacas,
        totalSelected,
    } = useButacas();

    const getMovie = async () => {
        const response = await axios.get(
            `http://localhost:8080/detallecartelera/${id}`
        );
        setMovieDetalle(response.data);
    };

    const getButacas = async (salaId) => {
        setLoadingButacas(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/butacasala/sala/${salaId}`
            );
            const formattedButacas = response.data.map((butaca, index) => ({
                id: butaca.id,
                numero: (index % 8) + 1,
                estado: butaca.ocupada ? "ocupado" : "disponible",
            }));
            resetButacas();
            setButacas(formattedButacas);
        } catch (error) {
            console.error("Error fetching seats:", error);
        } finally {
            setLoadingButacas(false);
        }
    };

    const handleHorarioSelect = (horario) => {
        setSelectedHorario(horario);
        getButacas(movieDetalle.sala.idSala);
        console.log(horario);
    };

    // const handleContinue = () => {
    //     const reservationData = {
    //         movie: movieDetalle.pelicula,
    //         horario: selectedHorario,
    //         butacas: selectedButacas.map((butaca, index) => ({
    //             ...butaca,
    //             fila: String.fromCharCode(65 + Math.floor(index / 8)), // A, B, C, etc.
    //         })),
    //     };
    //     localStorage.setItem("currentReservation", JSON.stringify(reservationData));
    //     router.push(`/pelicula/${id}/entradas`);
    // };

    const handleContinue = () => {
        const butacasConFila = selectedButacas.map((butaca) => {
            const index = butacas.findIndex((b) => b.id === butaca.id);
            const fila = String.fromCharCode(65 + Math.floor(index / 8));
            return {
                ...butaca,
                fila: fila,
            };
        });

        const reservationData = {
            movie: movieDetalle.pelicula,
            horario: selectedHorario,
            sala: movieDetalle.sala,
            butacas: butacasConFila,
        };

        localStorage.setItem(
            "currentReservation",
            JSON.stringify(reservationData)
        );
        router.push(`/pelicula/${id}/entradas`);
    };

    let horas = null;
    let minutos = null;

    if (movieDetalle?.pelicula?.duracion) {
        [horas, minutos] = movieDetalle.pelicula.duracion.split(":");
    }

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            {movieDetalle ? (
                <div className="container mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-cyan-700/80 mb-6">
                        <Link
                            href="/cartelera"
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Cartelera
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-cyan-900 font-medium">
                            {movieDetalle.pelicula?.nombre}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna izquierda */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Poster de la película */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-white/50">
                                <img
                                    src={movieDetalle.pelicula?.imagen}
                                    alt="Interstellar"
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Datos de la película */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                                <h2 className="text-2xl font-bold text-cyan-900 mb-4">
                                    {movieDetalle.pelicula.nombre}
                                </h2>

                                <div className="space-y-3 text-cyan-800/90">
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-cyan-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        <span>
                                            {horas}h {minutos}min
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-cyan-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                            ></path>
                                        </svg>
                                        <span>
                                            {movieDetalle.pelicula.genero}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-cyan-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            ></path>
                                        </svg>
                                        <span>
                                            Dirigida por{" "}
                                            {movieDetalle.pelicula.director}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="rating rating-xs mr-2">
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-cyan-400"
                                                defaultChecked
                                            />
                                        </div>
                                        <span>
                                            {
                                                movieDetalle.pelicula
                                                    .clasificacion
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/30">
                                    <h3 className="font-semibold text-cyan-900 mb-3">
                                        Horarios disponibles
                                    </h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Array.isArray(
                                            movieDetalle.horarios
                                        ) ? (
                                            movieDetalle.horarios.map(
                                                (horario, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            handleHorarioSelect(
                                                                horario
                                                            )
                                                        }
                                                        className="btn bg-white/50 border-white/30 text-cyan-700 hover:bg-cyan-400/30 hover:border-cyan-400/50 transition-all"
                                                    >
                                                        {horario.hora}
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <button>
                                                {
                                                    movieDetalle.horarios?.[0]
                                                        ?.hora
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Sinopsis */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                                <h2 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                    Sinopsis
                                </h2>
                                <p className="text-cyan-800/90 leading-relaxed">
                                    {movieDetalle.pelicula.sinopsis}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="badge bg-cyan-400/20 text-cyan-700 border-cyan-400/30">
                                        {movieDetalle.pelicula.genero}
                                    </span>
                                </div>
                            </div>

                            {/* Selección de butacas */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                                <h2 className="text-xl font-bold text-cyan-900 mb-6 flex items-center">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                    {selectedHorario
                                        ? `Selecciona tus butacas - Sala ${movieDetalle.sala.numero}`
                                        : "Selecciona un horario primero"}
                                </h2>

                                {loadingButacas ? (
                                    <div className="flex justify-center py-10">
                                        <span className="loading loading-spinner text-cyan-400"></span>
                                    </div>
                                ) : selectedHorario ? (
                                    <MapaButacas
                                        butacas={butacas}
                                        onSelectButaca={toggleButaca}
                                        selectedButacas={selectedButacas}
                                        onContinue={handleContinue}
                                    />
                                ) : (
                                    <div className="text-center py-10 text-cyan-700/80">
                                        Por favor selecciona un horario para ver
                                        las butacas disponibles
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner text-cyan-400"></span>
                </div>
            )}
            {/* Elementos decorativos Frutiger */}
            <div className="fixed bottom-10 left-10 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
            <div className="fixed top-1/3 right-20 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
        </div>
    );
}
