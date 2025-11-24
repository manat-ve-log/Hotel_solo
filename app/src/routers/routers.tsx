import { Route, Routes } from "react-router-dom";
import DashboardPage from "../page/dashboard";
import RoomManagement from "../page/roomManagement";
import BookingPage from "../page/booking";




function Routers(){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/roomManagement" element={<RoomManagement/>} />
            <Route path="/booking" element={<BookingPage/>} />
        </Routes>
    )
}


export default Routers;