import axios from "axios";
import Swal from "sweetalert2";

export const useCartelera = () => {
    const handlerAddCartelera = async ({
        idPelicula,
        idSala,
        idHorarios,
        fecha,
    }) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/cartelera/save",
                {
                    idPelicula,
                    idSala,
                    idHorarios,
                    fecha,
                }
            );
            Swal.fire({
                title: "Película configurada",
                text: "La cartelera ha sido configurada con éxito!",
                icon: "success",
            });
            return response.data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al configurar la cartelera!",
                icon: "error",
            });
        }
    };

    return{
        handlerAddCartelera
    }
};
