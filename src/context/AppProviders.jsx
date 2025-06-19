import { BocaditoProvider } from "./BocaditoProvider";
import { EntradaProvider } from "./EntradaProvider";
import { MovieProvider } from "./MovieProvider";
import { SocioProvider } from "./SocioProvider";

export const AppProvider = ({ children }) => {
    return (
        <MovieProvider>
            <BocaditoProvider>
                <EntradaProvider>
                    <SocioProvider>{children}</SocioProvider>
                </EntradaProvider>
            </BocaditoProvider>
        </MovieProvider>
    );
};
