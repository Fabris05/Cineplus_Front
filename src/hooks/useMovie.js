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

    const handlerUpdateMovie = async (movie) => {
        let idPelicula = movie.idPelicula;
        const duracion = `${movie.horas.padStart(2, "0")}:${movie.minutos.padStart(2, "0")}`;
        try {
            const response = await axios.put(
                `http://localhost:8080/peliculas/edit/${idPelicula}`,
                {
                    nombre: movie.nombre,
                    director: movie.director,
                    genero: movie.genero,
                    sinopsis: movie.sinopsis,
                    clasificacion: movie.clasificacion,
                    duracion: duracion,
                }
            );
            Swal.fire({
                title: "Película actualizada",
                text: "La película fue editada correctamente.",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar la película.",
                icon: "error",
            });
            console.error(error);
        }
    };

    const handlerChangeState = async (id, estado) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/peliculas/edit/state/${id}`,
                { estado },
                { headers: { "Content-Type": "application/json" } }
            );

            Swal.fire({
                title: "Estado actualizado",
                text: "El estado ha sido actualizado con éxito!",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al actualizar el estado!",
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
        handlerChangeState,
        handlerUpdateMovie
    };
};
