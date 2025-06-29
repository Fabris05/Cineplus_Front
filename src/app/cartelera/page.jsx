"use client";

import CardMovie from "@/components/CardMovie";
import CardMovieCartelera from "@/components/CardMovieCartelera";
import FilterMovie from "@/components/FilterMovie";
import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Cartelera() {
    const [moviesCartelera, setMoviesCartelera] = useState([]);
    const getMovies = async () => {
        const response = await axios.get(
            "http://localhost:8080/detallecartelera"
        );
        setMoviesCartelera(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            <div className="py-16 px-4 text-center backdrop-blur-md bg-white/30 rounded-xl mx-4 mt-6 shadow-sm border border-white/20">
                <h1 className="text-5xl font-bold text-cyan-900 mb-4 font-sans tracking-tight">
                    Cine<span className="text-cyan-600">Plus</span>
                </h1>
                <p className="text-lg text-cyan-800 max-w-2xl mx-auto">
                    Descubre una nueva experiencia cinematográfica
                </p>
                <div className="mt-6">
                    <div className="inline-flex space-x-2">
                        {["cyan", "pink", "yellow"].map((color, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full bg-${color}-400`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <FilterMovie/> */}

            <div className="p-8 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold text-cyan-900 mb-8 ml-2 flex items-center">
                    <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                    Cartelera Actual
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {moviesCartelera.map((movie, index) => (
                        <CardMovieCartelera
                            key={movie.pelicula.idPelicula}
                            movie={movie}
                            index={index}
                            id={movie.idCartelera}
                        />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center p-8">
                <div className="btn-group bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30 shadow-sm">
                    <button className="btn bg-white/50 border-none text-cyan-700 hover:bg-cyan-400/30">
                        1
                    </button>
                    <button className="btn bg-transparent border-none text-cyan-700 hover:bg-cyan-400/30">
                        2
                    </button>
                    <button className="btn bg-transparent border-none text-cyan-700 hover:bg-cyan-400/30">
                        3
                    </button>
                    <button className="btn bg-transparent border-none text-cyan-700 hover:bg-cyan-400/30">
                        4
                    </button>
                    <button className="btn bg-transparent border-none text-cyan-700 hover:bg-cyan-400/30">
                        ...
                    </button>
                    <button className="btn bg-transparent border-none text-cyan-700 hover:bg-cyan-400/30">
                        10
                    </button>
                </div>
            </div>

            {/* Floating Elements (Frutiger Aero touch) */}
            <div className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-cyan-400/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
            </div>
            <div className="fixed top-1/4 left-5 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
            <div className="fixed bottom-1/3 right-20 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
        </main>
    );
}
