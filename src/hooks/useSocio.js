"use client";

import { socioReducer } from "@/reducers/socioReducer";
import { getLocalDateTime } from "@/utils/useLocalDate";
import axios from "axios";
import { useReducer, useState } from "react";
import Swal from "sweetalert2";

const initialSocioForm = {
    nombre: "",
    apellido: "",
    email: "",
    tipoDocumento: "",
    numDocumento: "",
    contrasenia: "",
    fechaInscripcion: "",
    rol: {
        idRol: 3
    }
}

export const useSocio = () =>{
    const[socios, dispatch] = useReducer(socioReducer, []);
    const[socioSelected, setSocioSelected] = useState(initialSocioForm);
    const[visibleModal, setVisibleModal] = useState(false);

    const handlerAddSocio = async (socio) => {
        try{
            const socioToSend = {
                ...socio,
                fechaInscripcion: getLocalDateTime(),
            }

            const response = await axios.post("http://localhost:8080/socio/save", socioToSend);

            dispatch({
                type: "AddSocio",
                payload: response.data,
            })

            Swal.fire({
                title: "Socio creado",
                text: "El socio ha sido registrado con éxito!",
                icon: "success",
            });

        }catch(error){
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al registrar al socio!",
                icon: "error",
            });
            console.log(error)
        }
    }

    const handlerCloseModal = () => {
        setVisibleModal(false);
        setSocioSelected(initialSocioForm);
    };

    return{
        socios,
        socioSelected,
        initialSocioForm,
        visibleModal,
        handlerAddSocio,
        handlerCloseModal,
    }
}