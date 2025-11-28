import { useEffect, useState } from 'react';
import './index.css'
import dayjs from "dayjs";
import { type RoomInterface } from '../roomManagement';
import { RoomService } from '../../service/https/room';
import BookingForm from './booking';


interface BookingInterface{
    floor:number;
    room_number:string;
    room_price:number;
    total_price:number;
    start_date:string;
    end_date:string;
    room_type:string;
    customer_name:string;
    customer_phone:string;
    customer_email?:string;
}


function getDaysBetween(startDate:any, endDate:any) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    let cursor = start;
    const fullDays = [];
    const days = [];
    const months = [cursor.format("MMMM")];
    
    while (cursor.isBefore(end) || cursor.isSame(end)) {
        fullDays.push(cursor.format("YYYY-MM-DD"));
        days.push(cursor.format("DD"));
        cursor = cursor.add(1, "day");
    }

    return {fullDays, days, months};
}



const BookingPage = () => {
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [startMonth, setStartMonth] = useState(dayjs().startOf("month"));
    const [endMonth, setEndMonth] = useState(dayjs().endOf("month"));
    const { fullDays, months } = getDaysBetween(startMonth,endMonth);
    const [currenDate, setCurrenDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [sendRoomId, setSendRoomId] = useState<RoomInterface>();

    const fetchRooms = async () =>{
        try{
            const res = await RoomService.getRooms();
           const rooms = res.data.map((r: any) => ({
              id: r.id,
              floor: r.floor,
              RoomName: r.room_number,
              RoomPrice: r.room_price,
              RoomStatus: r.room_status,
              RoomType: r.room_type
            }));
            setRooms(rooms)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRooms();
    },[])

    useEffect(()=>{
        console.log("open form --> ",openForm)
    },[openForm])


    const onNextPrev = (x:number) => {
        const nextMonth = dayjs(startMonth).add(1, "month");
        const prevMonth = dayjs(startMonth).subtract(1, "month");
         if (x > 0) {
            setStartMonth(nextMonth.startOf("month"));
            setEndMonth(nextMonth.endOf("month"));
        } else {
            setStartMonth(prevMonth.startOf("month"));
            setEndMonth(prevMonth.endOf("month"));
        }
    }   

    const groupedRooms = rooms.reduce<Record<number, RoomInterface[]>>((acc, room) => {
          if (!acc[room.floor]) acc[room.floor] = [];
          acc[room.floor].push(room);
          return acc;
    }, {});

    return (
        <div className="booking-container">
            <div className="booking-header">
                <p>Booking</p>
                <div>
                    <div className='header-viwe'>
                        {months.map((month)=>(
                            <div key={month}>
                                <div className="buttom-date prev" onClick={()=>(onNextPrev(-1))}>
                                    p
                                </div>

                                {month}

                                <div className="buttom-date next"onClick={()=>(onNextPrev(1))}>
                                    n
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>

            <div className="booking-body">
                <div className="booking-daily">
                    <div className="date">  
                        {fullDays.map((date)=>(
                            <div key={date} 
                                className = {dayjs(date).isSame(dayjs(), 'day')? 'isday day':'day'}
                                onClick={()=>(setCurrenDate(dayjs(date).format("YYYY-MM-DD")))}
                            >
                                <p>
                                    {dayjs(date).format("DD")}
                                </p>
                                <div 
                                    className={currenDate == dayjs(date).format("YYYY-MM-DD")?'this-day':''}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className='booking-body-date'
                    >
                        {Object.entries(groupedRooms).map(([floor, room]) => (
                            <div key={floor} className='booking-card' >
                                <div className="floor">
                                    {floor}
                                </div>
                                {room.map((r)=>(
                                    <div key={r.RoomName} className='booking-card-room' onClick={()=>{(setOpenForm(true)),setSendRoomId(r)}}>
                                        <div className="card" >
                                            {r.RoomName}
                                        </div>
                                    </div>
                                ))}
                                {openForm && sendRoomId && (
                                    <div className="booking-overlay" onClick={() => setOpenForm(false)}>
                                        <div className="booking-form" onClick={(e) => e.stopPropagation()}>
                                        <BookingForm room={sendRoomId} setOpenForm={setOpenForm}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                            ))}

                    </div>
                </div>
                <div className="booking-weekly"></div>
            </div>

        </div>
    )
}

export default BookingPage;