import { useEffect, useRef, useState } from 'react';
import './index.css';
import EditRoomById from './editRoom';
import { RoomService } from '../../service/https/room';
export interface RoomInterface {
  RoomName: string;
  RoomPrice:number|any;
  RoomType: string;
  RoomStatus: string;
}

export interface FloorRoom {
  floor: number;
  room: RoomInterface;
}

const RoomDataTest: FloorRoom[] = [
  { floor: 1, room: { RoomName: "Room 101", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 102", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 103", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 104", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 105", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 201", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 202", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 203", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 204", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 205", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 205", RoomPrice:0 ,RoomType: "Deluxe", RoomStatus: "Available",} },
  
];


// ฟังก์ชันจัดกลุ่มตามชั้น floor (ใช้ reduce)
const groupByFloor = (data: FloorRoom[]) => {
  return data.reduce((acc, curr) => {
    if (!acc[curr.floor]) acc[curr.floor] = [];
    acc[curr.floor].push(curr.room);
    return acc;
  }, {} as Record<number, RoomInterface[]>);
};

interface FloorScrollProps {
  floor: number;
  rooms: RoomInterface[];
  roomData: FloorRoom[];
  setRoomData: React.Dispatch<React.SetStateAction<FloorRoom[]>>;
}

const FloorScroll = ({ floor, rooms, setRoomData, roomData }: FloorScrollProps) => {

  const scrollRef = useRef<HTMLDivElement>(null);
  let pos = { left: 0, x: 0 };
  let momentumID: any;

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";

    pos = {
      left: scrollRef.current.scrollLeft ,
      x: e.clientX ,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!scrollRef.current) return;

    const dx = e.clientX - pos.x ;

    scrollRef.current.scrollLeft = pos.left - dx;
    applyMomentum(dx);
  };

  const mouseUpHandler = () => {
    if (!scrollRef.current) return;

    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  const applyMomentum = (dx: number) => {
    let lastDx = dx ;
    cancelAnimationFrame(momentumID);

    const momentum = () => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollLeft -= lastDx;
      lastDx *= 0.9;

      if (Math.abs(lastDx) > 0.5) {
        momentumID = requestAnimationFrame(momentum);
      }
    };

    momentum();
  };
  

    const addRooms = (floor:number) => {
        const newRoom: FloorRoom = {floor:floor, room:{RoomName:'room name',RoomPrice:200,RoomType:'',RoomStatus:''}}
        setRoomData((prev) => [...prev, newRoom]);
        alert("add room successfully")
        
        console.log(roomData)
    }


  return (
    <div 
        className='edit-index'
        style={{ background:'#e0e0e0',padding:'5px',borderRadius:'8px',marginBottom:'10px'}}>
        <div className="roomManagement_Header" >
            <h3>ชั้น {floor}</h3>
            <button onClick={()=>{addRooms(floor)}}>
                +ห้อง
            </button>
        </div>
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={mouseDownHandler}
      >
        {rooms.map((room) => (
          <div
            key={room.RoomName}
            className="roomManagement_room"
          >
            {room.RoomName}
            <div className='room_edit'>
                <EditRoomById room={{floor:floor, room:room}}/>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

const RoomManagement = () => {
    const [RoomData, setRoomData] = useState<FloorRoom[]>(RoomDataTest)
    // const groupedRooms = groupByFloor(RoomData);
   
    const [rooms, setRooms] = useState<FloorRoom[]>([]);
    const groupedRooms = groupByFloor(rooms);

    const fetchRooms = async () => {
        try {
            const res = await RoomService.getRooms();
            console.log("res => ",res)
            const rooms = res.data.map((r: any) => ({
                floor: r.floor,
                room:{
                    RoomName: r.room_number,
                    RoomPrice: r.room_price,
                    RoomStatus: r.room_status,
                    RoomType: r.room_type
                }
               
            }));
            console.log('room ex',rooms)
            setRooms(rooms);
        } catch (err) {
            console.error(err);
        }
        console.log("room data ",rooms)
    };
    
    useEffect(()=>{
        fetchRooms();
    },[])

    useEffect(() => {
        console.log("rooms updated -->", rooms);
    }, [rooms]);
  
    const addFloor = () =>{
        const lastFloor = Math.max(...rooms.map(r => r.floor)) + 1;
        const newRoom: FloorRoom = {floor: lastFloor, room: {RoomName: "name",RoomPrice:0, RoomType: "", RoomStatus: "",}
        
    };
        alert("add successfully");
        // setRoomData([...RoomData, newRoom]);
        setRoomData((prev) => ([...prev, newRoom]))
        console.log(RoomData)
    }

  return (
    <div className="roomManagement_container" style={{ padding: 20 }}>
      <div className="roomManagement_Header" style={{ marginBottom: 20 }}>
        <h2>Room</h2>
        <button className='addRoom' onClick={addFloor}>
            เพิ่มชั้น
        </button>
      </div>

      {Object.entries(groupedRooms).map(([floor, r]) => (
        <FloorScroll
          key={floor}
          floor={parseInt(floor)}
          rooms={r}
          setRoomData = {setRoomData}
          roomData = {rooms}
        />
      ))}
    </div>
  );
};

export default RoomManagement;
