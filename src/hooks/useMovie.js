"use client";
import { moviesReducer } from "@/reducers/moviesReducer";
import axios from "axios";
import { useReducer, useState } from "react";
import Swal from "sweetalert2";

const initialMovieForm = {
    id: 0,
    nombre: "",
    director: "",
    horas: "",
    minutos: "",
    genero: "",
    clasificacion: "",
    sinopsis: "",
    estado: "No listado",
    imagen: null,
};

export const useMovie = () => {
    const [movies, dispatch] = useReducer(moviesReducer, []);
    const [movieSelected, setMovieSelected] = useState(initialMovieForm);
    const [visibleModal, setVisibleModal] = useState(false);

    const handlerAddMovie = async (movie) => {
        try {
            let imageName = "";

            if (movie.imagen) {
                console.log("form.imagen:", movie.imagen);
                const formData = new FormData();
                formData.append("imagen", movie.imagen);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadResult = await res.json();

                if (!uploadResult.filename) {
                    throw new Error("La imagen no se subió correctamente.");
                }
                imageName = uploadResult.filename;
            }

            const movieToSend = {
                ...movie,
                duracion: `${movie.horas.padStart(
                    2,
                    "0"
                )}:${movie.minutos.padStart(2, "0")}`,
                imagen: `/images/movies/${imageName}`,
            };

            const response = await axios.post(
                "http://localhost:8080/peliculas/save",
                movieToSend
            );

            dispatch({
                type: "AddMovie",
                payload: response.data,
            });
            Swal.fire({
                title: "Película creada",
                text: "La película ha sido creada con éxito!",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al crear la película!",
                icon: "error",
            });

            console.log(error);
        }
    };

    const handlerCloseModal = () => {
        setVisibleModal(false);
        setMovieSelected(initialMovieForm);
    };

    return {
        movies,
        movieSelected,
        initialMovieForm,
        visibleModal,
        handlerAddMovie,
        handlerCloseModal,
    };
};
