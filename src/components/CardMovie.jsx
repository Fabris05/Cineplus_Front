"use client";
import { useState } from "react";
import ModalEstadoPelicula from "./ModalEstadoPelicula";

export default function CardMovie({ movie, onEdit, onEditState }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="card w-72 bg-base-100 shadow-xl image-full shadow-md transform transition duration-400 ease-in-out hover:scale-105">
                <figure className="w-72 h-110 overflow-hidden">
                    <img
                        src={movie.imagen}
                        alt={movie.nombre}
                        className="w-full h-full object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{movie.nombre}</h2>
                    <span>
                        {movie.genero}, {movie.duracion}, {movie.clasificacion},{" "}
                        {movie.estado}
                    </span>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-accent hover:scale-105 transition-transform duration-200"
                            onClick={onEditState}
                        >
                            Estado
                        </button>
                        <button className="btn btn-warning" onClick={onEdit}>
                            Editar
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    );
}
