export const usePago = () => {
    const obtenerDatosPago = (clienteForm) => {
        try {
            const carrito = JSON.parse(localStorage.getItem("carritoCinePlus"));
            const reserva = JSON.parse(
                localStorage.getItem("currentReservation")
            );

            if (!carrito || !clienteForm || !reserva) {
                console.log("carrito:", carrito);
                console.log("reserva:", reserva);
                console.log("clienteForm:", clienteForm);

                if (!carrito)
                    throw new Error(
                        "No hay datos del carrito en localStorage."
                    );
                if (!reserva)
                    throw new Error("No hay datos de reserva en localStorage.");
                if (!clienteForm)
                    throw new Error("No hay datos del formulario.");
                throw new Error(
                    "Faltan datos esenciales para procesar el pago."
                );
            }

            const fechaLima = new Date()
                .toLocaleString("sv-SE", {
                    timeZone: "America/Lima",
                })
                .replace(" ", "T");

            return {
                cliente: clienteForm,
                reserva: {
                    idCartelera: reserva.idCartelera,
                    idSala: reserva.sala.idSala,
                    idHorario: reserva.horario.idHorario,
                    butacas: reserva.butacas.map((b) => ({
                        idButacaSala: b.idButacaSala,
                        idButaca: b.idButaca, // Asegúrate que esto esté disponible
                        codigo: b.codigo,
                        estado: b.estado,
                    })),
                },
                entradas: (carrito.entradas || []).map((e) => ({
                    idTipoEntrada: e.idTipoEntrada,
                    cantidad: e.cantidad,
                    precioUnitario: e.precio,
                })),
                bocaditos: (carrito.bocaditos || []).map((b) => ({
                    idBocadito: b.id,
                    cantidad: b.cantidad,
                    precio: b.precio,
                    total: b.total,
                })),
                venta: {
                    idSocio: 0,
                    idUsuario: 0,
                    idMetodo: 1,
                    estado: "procesado",
                    fecha: fechaLima,
                    total: carrito.total,
                },
            };
        } catch (error) {
            console.error("Error en obtenerDatosPago:", error.message);
            console.log(clienteForm);
            return null;
        }
    };

    return { obtenerDatosPago };
};
