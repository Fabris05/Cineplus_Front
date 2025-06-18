import { BocaditoProvider } from "./BocaditoProvider";
import { EntradaProvider } from "./EntradaProvider";
import { MovieProvider } from "./MovieProvider";

export const AppProvider = ({ children }) => {
    return (
        <MovieProvider>
            <BocaditoProvider>
                <EntradaProvider>{children}</EntradaProvider>
            </BocaditoProvider>
        </MovieProvider>
    );
};
