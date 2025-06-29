import { BocaditoProvider } from "./BocaditoProvider";
import { EntradaProvider } from "./EntradaProvider";
import { MovieProvider } from "./MovieProvider";
import { SocioProvider } from "./SocioProvider";
import { UsuarioProvider } from "./UsuarioProvider";
import { CartProvider } from "./CartContext";

export const AppProvider = ({ children }) => {
    return (
        <CartProvider>
            <MovieProvider>
                <BocaditoProvider>
                    <EntradaProvider>
                        <SocioProvider>
                            <UsuarioProvider>{children}</UsuarioProvider>
                        </SocioProvider>
                    </EntradaProvider>
                </BocaditoProvider>
            </MovieProvider>
        </CartProvider>
    );
};
