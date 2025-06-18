"use client";

import { entradaReducer } from "@/reducers/entradaReducer";
import axios from "axios";
import { useReducer, useState } from "react";
import Swal from "sweetalert2";

const initialEntradaForm = {
    tipo: "",
    descripcion: "",
    precio: 0.0,
    estado: "No listado"
}

export const useEntrada = () => {
    const [entradas, dispatch] = useReducer(entradaReducer, []);
    const[entradaSelected, setEntradaSelected] = useState(initialEntradaForm);
    const[visibleModal, setVisibleModal] = useState(false);

    const handlerAddEntrada = async (entrada) => {
        try{
            const entradaToSend = {
                ...entrada
            }

            const response = await axios.post("http://localhost:8080/tipoentrada/save", entradaToSend);

            dispatch({
                type: "AddEntrada",
                payload: response.data,
            })

            Swal.fire({
                title: "Entrada creado",
                text: "La entrada ha sido creada con éxito!",
                icon: "success",
            });

        }catch(error){
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al crear la entrada!",
                icon: "error",
            });
            console.log(error)
        }
    }

    const handlerCloseModal = () => {
        setVisibleModal(false);
        setBocaditoSelected(initialEntradaForm);
    };

    return{
        entradas,
        entradaSelected,
        initialEntradaForm,
        visibleModal,
        handlerAddEntrada,
        handlerCloseModal
    }
}