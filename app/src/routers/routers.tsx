import { Route, Routes } from "react-router-dom";
import DashboardPage from "../page/dashboard";




function Routers(){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
    )
}


export default Routers;