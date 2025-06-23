"use client";
import { useMovie } from "@/hooks/useMovie";
import { MovieContext } from "./MovieContext";

export const MovieProvider = ({ children }) => {
    const {
        movies,
        movieSelected,
        initialMovieForm,
        visibleModal,
        handlerAddMovie,
        handlerCloseModal,
        handlerChangeState,
        handlerUpdateMovie
    } = useMovie();

    return (
        <MovieContext.Provider
            value={{
                movies,
                movieSelected,
                initialMovieForm,
                visibleModal,
                handlerAddMovie,
                handlerCloseModal,
                handlerChangeState,
                handlerUpdateMovie
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
