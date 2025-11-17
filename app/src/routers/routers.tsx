import { Route, Routes } from "react-router-dom";
import DashboardPage from "../page/dashboard";
import RoomManagement from "../page/roomManagement";




function Routers(){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/roomManagement" element={<RoomManagement/>} />
        </Routes>
    )
}


export default Routers;