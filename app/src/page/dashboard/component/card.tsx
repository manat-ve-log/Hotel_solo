
import './card.css'
import { FaRegBookmark } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { TbCurrencyBaht } from "react-icons/tb";
const CardShowBookingRoom = () =>{
    return(
        <div className='card_container card_A'>
            <div className="card_icon">
                <FaRegBookmark />
            </div>
            <div className="card_data">
                <div className='card_number'>
                    <div className='card_room_booking'>99</div>
                    <div className='card_room_total'>/100</div>
                    <div className='card_description'>Bookings / Total Rooms</div>
                </div>
                
            </div>
        </div>
    )
}

const CardShowIsCleaning = () =>{
    return(
        <div className='card_container card_B'>
            <div className="card_icon">
                <MdCleaningServices />
            </div>
            <div className="card_data">
                <div className='card_number'>
                    <div className='card_room_booking'>99</div>
                    <div className='card_room_total'>/100</div>
                    <div className='card_description'>Cleaning / Total Rooms</div>
                </div>
                
            </div>
        </div>
    )
}

const CardShowMaintenance = () =>{
    return(
        <div className='card_container card_C'>
            <div className="card_icon">
                <GrHostMaintenance />
            </div>
            <div className="card_data">
                <div className='card_number'>
                    <div className='card_room_booking'>99</div>
                    <div className='card_room_total'>/100</div>
                    <div className='card_description'>Maintenance / Total Rooms</div>
                </div>
                
            </div>
        </div>
    )
}
const CardShowMoney = () =>{
    return(
        <div className='card_container card_D'>
            <div className="card_icon">
                <TbCurrencyBaht />
            </div>
            <div className="card_data">
                <div className='card_number'>
                    <div className='card_room_booking'>99</div>
                    <div className='card_room_total'>/baht</div>
                    <div className='card_description'>Incom</div>
                </div>
                
            </div>
        </div>
    )
}



export {
    CardShowBookingRoom,
    CardShowIsCleaning,
    CardShowMaintenance,
    CardShowMoney,
}