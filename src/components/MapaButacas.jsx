export default function MapaButacas({
    butacas,
    onSelectButaca,
    selectedButacas,
    onContinue,
}) {
    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J'];
    const butacasPorFila = {};

    filas.forEach((fila, index) => {
        butacasPorFila[fila] = butacas.slice(index * 8, (index + 1) * 8);
    });

    return (
        <div className="space-y-6">
            {/* Pantalla */}
            <div className="mb-8 text-center">
                <div className="mx-auto w-3/4 h-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-t-full"></div>
                <p className="text-sm text-cyan-700/80 mt-1">PANTALLA</p>
            </div>

            {/* Butacas */}
            <div className="space-y-3">
                {Object.entries(butacasPorFila).map(([fila, butacasFila]) => (
                    <div key={fila} className="flex justify-center space-x-2">
                        <span className="w-6 flex items-center justify-center text-sm font-medium text-cyan-700">
                            {fila}
                        </span>
                        {butacasFila.map((butaca) => (
                            <button
                                key={butaca.id}
                                onClick={() => onSelectButaca(butaca.id)}
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs transition-all
                  ${
                      butaca.estado === "ocupado"
                          ? "bg-gray-300/50 cursor-not-allowed"
                          : butaca.estado === "seleccionado"
                          ? "bg-cyan-400/60 border-cyan-400/70"
                          : "bg-cyan-400/20 hover:bg-cyan-400/40 border border-cyan-400/30"
                  }`}
                                disabled={butaca.estado === "ocupado"}
                            >
                                {fila}{butaca.numero}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Resumen de selección */}
            {selectedButacas.length > 0 && (
                <div className="mt-6 p-4 bg-white/50 rounded-lg border border-cyan-400/30">
                    <h3 className="font-medium text-cyan-900 mb-2">
                        Butacas seleccionadas:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedButacas.map((butaca, index) => {
                            // Calculamos la fila representativa basada en el índice
                            const fila = String.fromCharCode(65 + Math.floor(index / 8));
                            return (
                                <span
                                    key={butaca.id}
                                    className="badge bg-cyan-400/20 text-cyan-700 border-cyan-400/30"
                                >
                                    {fila}{butaca.numero}
                                </span>
                            );
                        })}
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