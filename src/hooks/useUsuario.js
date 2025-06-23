"use client";

import { usuarioReducer } from "@/reducers/usuarioReducer";
import axios from "axios";
import { useReducer, useState } from "react";
import Swal from "sweetalert2";

const initialUserForm = {
    nombre: "",
    apellido: "",
    email: "",
    numDocumento: "",
    contrasenia: "",
    rol: {
        idRol: "",
    },
};

export const UseUsuario = () => {

    const[usuarios, dispatch] = useReducer(usuarioReducer, []);
    const[usuarioSelected, setUsuarioSelected] = useState(initialUserForm);
    const[visibleModal, setVisibleModal] = useState(false);

    const handlerAddUser = async (usuario) => {
        try {
            const userToSend = {
                ...usuario,
                rol:{
                    idRol: usuario.rol,
                }
            }

            const response = await axios.post("http://localhost:8080/usuario/save", userToSend);

            dispatch({
                type: "AddUsuario",
                payload: response.data,
            })

            Swal.fire({
                title: "Usuario registrado",
                text: "El usuario se ha registrado exitosamente!",
                icon: "success",
            });

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al registrar al usuario!",
                icon: "error",
            });
        }
    };

    const handlerUserSelectedForm = (user) => {
        setVisibleModal(true);
        setUsuarioSelected({...user});

    }

    const handlerCloseModal = () => {
        setVisibleModal(false);
        setUsuarioSelected(initialUserForm);
    }

    const handlerOpenModal = () => {
        setVisibleModal(true);
    }

    return{
        usuarios,
        usuarioSelected,
        initialUserForm,
        visibleModal,
        handlerAddUser,
        handlerUserSelectedForm,
        handlerCloseModal,
        handlerOpenModal,
    }
};
