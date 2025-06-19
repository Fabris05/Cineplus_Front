import { BocaditoProvider } from "./BocaditoProvider";
import { EntradaProvider } from "./EntradaProvider";
import { MovieProvider } from "./MovieProvider";
import { SocioProvider } from "./SocioProvider";
import { UsuarioProvider } from "./UsuarioProvider";

export const AppProvider = ({ children }) => {
    return (
        <MovieProvider>
            <BocaditoProvider>
                <EntradaProvider>
                    <SocioProvider>
                        <UsuarioProvider>{children}</UsuarioProvider>
                    </SocioProvider>
                </EntradaProvider>
            </BocaditoProvider>
        </MovieProvider>
    );
};
