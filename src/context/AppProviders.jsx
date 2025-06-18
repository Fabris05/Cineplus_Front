import { BocaditoProvider } from "./BocaditoProvider";
import { MovieProvider } from "./MovieProvider";

export const AppProvider = ({ children }) => {
    return (
        <MovieProvider>
            <BocaditoProvider>{children}</BocaditoProvider>
        </MovieProvider>
    );
};
