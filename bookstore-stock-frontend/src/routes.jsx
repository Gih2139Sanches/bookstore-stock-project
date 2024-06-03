import { Route, Routes } from "react-router-dom";
import { Customer } from "./pages/Customer";
import { Books } from "./pages/Books";
import { PurchaseHistoric } from "./pages/PurchaseHistoric";

export const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/clientes" element={<Customer />} />
            <Route path="/livros" element={<Books />} />
            <Route path="/vendas" element={<PurchaseHistoric />} />
        </Routes>
    )
}