import type React from "react";
import './index.css'
import { CardShowBookingRoom, CardShowIsCleaning, CardShowMaintenance, CardShowMoney } from "./component/card";
import BookingChart from "./component/graphBooking";
import { MostBookedRoomTypeChart } from "./component/graphTypeRoom";
import { GraphDetail } from "./component/graphDetail";

const DashboardPage: React.FC =() =>{
    return(
        <div className="dashboard_container">
            <div className="A dashoard_items1">
                <CardShowBookingRoom />
            </div>
            <div className="A dashoard_items2">
                <CardShowIsCleaning />
            </div>
            <div className="A dashoard_items3">
                <CardShowMaintenance/>
            </div>
            <div className="A dashoard_items4">
                <CardShowMoney/>
            </div>
            <div className="A dashoard_items5">
                <BookingChart/>
            </div>
            <div className="A dashoard_items6">
                <MostBookedRoomTypeChart/>
            </div>
            <div className="A dashoard_items7">
                <GraphDetail />
            </div>
            {/* <div className="A dashoard_items8">1</div>
            <div className="A dashoard_items9">1</div>
            <div className="A dashoard_items10">1</div> */}
        </div>
    )
}


export default DashboardPage;