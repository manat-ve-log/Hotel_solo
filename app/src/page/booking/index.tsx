import { useState } from 'react';
import './index.css'
import dayjs from "dayjs";

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
}

const bookingDatas: BookingInterface[] = [
  { floor:1, room_number:"A101", room_price:1200, total_price:3600, start_date:"2025-11-20", end_date:"2025-11-23", room_type:"Standard", customer_name:"Somchai", customer_phone:"0811111111" },
  { floor:1, room_number:"A102", room_price:1500, total_price:4500, start_date:"2025-11-21", end_date:"2025-11-24", room_type:"Deluxe", customer_name:"Suda", customer_phone:"0822222222" },
  { floor:1, room_number:"B201", room_price:1800, total_price:5400, start_date:"2025-11-22", end_date:"2025-11-25", room_type:"VIP", customer_name:"Anan", customer_phone:"0833333333" },
  { floor:1, room_number:"B202", room_price:1300, total_price:3900, start_date:"2025-11-19", end_date:"2025-11-22", room_type:"Standard", customer_name:"Warin", customer_phone:"0844444444" },
  { floor:1, room_number:"C301", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555555" },
  { floor:1, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:1, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:1, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:1, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:1, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
  { floor:2, room_number:"C302", room_price:2000, total_price:6000, start_date:"2025-11-23", end_date:"2025-11-26", room_type:"Suite", customer_name:"Krit", customer_phone:"0855555553" },
];


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
    const [startMonth, setStartMonth] = useState(dayjs().startOf("month"));
    const [endMonth, setEndMonth] = useState(dayjs().endOf("month"));
    const { fullDays, months } = getDaysBetween(startMonth,endMonth);
    const [currenDate, setCurrenDate] = useState<string>(dayjs().format("YYYY-MM-DD"));


    const onNextPrev = (x:number) => {
        const nextMonth = dayjs(startMonth).add(1, "month");
        const prevMonth = dayjs(startMonth).subtract(1, "month");

        console.log("next month--> ",nextMonth)
        console.log("next month day --> ",fullDays)

         if (x > 0) {
            setStartMonth(nextMonth.startOf("month"));
            setEndMonth(nextMonth.endOf("month"));
        } else {
            setStartMonth(prevMonth.startOf("month"));
            setEndMonth(prevMonth.endOf("month"));
        }
    }   

    const groupedRooms = bookingDatas.reduce<Record<number, BookingInterface[]>>((acc, room) => {
          if (!acc[room.floor]) acc[room.floor] = [];
          acc[room.floor].push(room);
          console.log("grouedRooms --> ",acc)
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
                        {Object.entries(groupedRooms).map(([floor, rooms]) => (
                            <div key={floor} className='booking-card' >
                                <div className="floor">
                                    {floor}
                                </div>
                                {rooms.map((r)=>(
                                    <div key={r.room_number} className='booking-card-room'>
                                        <div className="card">
                                            {r.room_number}
                                        </div>
                                    </div>
                                ))}
                                
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