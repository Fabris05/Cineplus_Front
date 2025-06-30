export default function MapaButacas({
    butacas,
    onSelectButaca,
    selectedButacas,
    onContinue,
}) {
    // Agrupamos las butacas por fila
    const butacasPorFila = butacas.reduce((acc, butaca) => {
        const codigo = butaca.codigo; // ej: "A1"
        const fila = codigo?.charAt(0); // obtenemos la letra

        if (!fila) return acc;

        if (!acc[fila]) acc[fila] = [];
        acc[fila].push(butaca);
        return acc;
    }, {});

    const filasOrdenadas = Object.keys(butacasPorFila).sort(); // ["A", "B", "C", ...]

    return (
        <div className="space-y-6">
            {/* Pantalla */}
            <div className="mb-8 text-center">
                <div className="mx-auto w-3/4 h-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-t-full"></div>
                <p className="text-sm text-cyan-700/80 mt-1">PANTALLA</p>
            </div>

            {/* Butacas */}
            <div className="space-y-3">
                {filasOrdenadas.map((fila) => (
                    <div
                        key={`fila-${fila}`}
                        className="flex justify-center space-x-2"
                    >
                        <span className="w-6 flex items-center justify-center text-sm font-medium text-cyan-700">
                            {fila}
                        </span>
                        {butacasPorFila[fila].map((butaca) => (
                            <button
                                key={`butaca-${butaca.idButacaSala}`}
                                onClick={() => onSelectButaca(butaca)}
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs transition-all
                                    ${
                                        butaca.estado === "ocupado"
                                            ? "bg-gray-300/50 cursor-not-allowed"
                                            : selectedButacas.some(
                                                  (b) =>
                                                      b.idButaca ===
                                                      butaca.idButaca
                                              )
                                            ? "bg-cyan-400/60 border-cyan-400/70"
                                            : "bg-cyan-400/20 hover:bg-cyan-400/40 border border-cyan-400/30"
                                    }`}
                                disabled={butaca.estado === "ocupado"}
                            >
                                {butaca.codigo}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Resumen de selección */}
            {selectedButacas.length > 0 && (
                <div className="mt-6 p-4 bg-white/50 rounded-lg border border-cyan-400/30">
                    <h3 className="font-medium text-cyan-900 mb-2">
                        Butacas seleccionadas ({selectedButacas.length}):
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedButacas.map((butaca) => (
                            <span
                                key={`resumen-${butaca.idButacaSala}`}
                                className="badge bg-cyan-400/20 text-cyan-700 border-cyan-400/30"
                            >
                                {butaca.codigo}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Leyenda */}
            <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-md bg-cyan-400/20 border border-cyan-400/30 mr-2"></div>
                    <span className="text-sm text-cyan-700/80">Disponible</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-md bg-gray-300/50 mr-2"></div>
                    <span className="text-sm text-cyan-700/80">Ocupado</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-md bg-cyan-400/60 mr-2"></div>
                    <span className="text-sm text-cyan-700/80">
                        Seleccionado
                    </span>
                </div>
            </div>

            {/* Botón siguiente */}
            {selectedButacas.length > 0 && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onContinue}
                        className="btn bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
