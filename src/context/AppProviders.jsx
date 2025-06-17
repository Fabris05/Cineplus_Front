import { MovieProvider } from "./MovieProvider"

export const AppProvider = ({ children }) => {
    return (
        <MovieProvider>
            {children}
        </MovieProvider>
    )
}