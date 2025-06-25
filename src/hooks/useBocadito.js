"use client";
import { bocaditoReducer } from "@/reducers/bocaditoReducer";
import axios from "axios";
import { useReducer, useState } from "react"
import Swal from "sweetalert2";

const initialBocaditoForm = {
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: 0.0,
    imagen: null,
    estado: "No listado"
}

export const useBocadito = () => {
    const [bocaditos, dispatch] = useReducer(bocaditoReducer, []);
    const [bocaditoSelected, setBocaditoSelected] = useState(initialBocaditoForm);
    const [visibleModal, setVisibleModal] = useState(false);

    const handlerAddBocadito = async (bocadito) => {
        
        try{
            let imageName = "";
            if(bocadito.imagen){
                const formData = new FormData();
                formData.append("imagen", bocadito.imagen);
                formData.append("tipo", "bocadito");
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

            const bocaditoToSend = {
                ...bocadito,
                imagen: `/images/snacks/${imageName}`,
            };

            const response = await axios.post("http://localhost:8080/bocaditos/save",
                bocaditoToSend
            )

            dispatch({
                type: "AddBocadito",
                payload: response.data,
            });

            Swal.fire({
                title: "Bocadito creado",
                text: "El bocadito ha sido creado con éxito!",
                icon: "success",
            });

        }catch(error){
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al crear el bocadito!",
                icon: "error",
            });
            console.log(error)
        }
    }

    const handlerUpdateBocadito = async (bocadito) => {

        let idBocadito = bocadito.idBocadito;

        try{
            const response = await axios.put(`http://localhost:8080/bocaditos/edit/${idBocadito}`,
                {
                    nombre: bocadito.nombre,
                    descripcion: bocadito.descripcion,
                    categoria: bocadito.categoria,
                    descripcion: bocadito.descripcion,
                    precio: bocadito.precio,
                }
            );
            Swal.fire({
                title: "Bocadito editado",
                text: "El bocadito ha sido editado con éxito!",
                icon: "success",
            })
        }catch(error){
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al editar el bocadito!",
                icon: "error",
            })
        }
    }
    
    const handlerCloseModal = () => {
        setVisibleModal(false);
        setBocaditoSelected(initialBocaditoForm);
    };

    return{
        bocaditos,
        bocaditoSelected,
        initialBocaditoForm,
        visibleModal,
        handlerAddBocadito,
        handlerCloseModal,
        handlerUpdateBocadito
    }
}