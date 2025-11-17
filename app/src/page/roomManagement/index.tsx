import { useRef, useState } from 'react';
import './index.css';

interface RoomInterface {
  RoomName: string;
  RoomType: string;
  RoomStatus: string;
}

interface FloorRoom {
  floor: number;
  room: RoomInterface;
}

const RoomDataTest: FloorRoom[] = [
  { floor: 1, room: { RoomName: "Room 101", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 102", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 103", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 1, room: { RoomName: "Room 104", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 201", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 202", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 203", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 204", RoomType: "Deluxe", RoomStatus: "Available",} },
  { floor: 2, room: { RoomName: "Room 205", RoomType: "Deluxe", RoomStatus: "Available",} },
  
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
      left: scrollRef.current.scrollLeft,
      x: e.clientX,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!scrollRef.current) return;

    const dx = e.clientX - pos.x;

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
    let lastDx = dx;
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
        const newRoom: FloorRoom = {floor:floor, room:{RoomName:'room name',RoomType:'',RoomStatus:''}}
        setRoomData((prev) => [...prev, newRoom]);
        alert("add room successfully")
        // console.log(room)
        console.log(roomData)
    }


  return (
    <div style={{ background:'#e0e0e0',padding:'5px',borderRadius:'8px',marginBottom:'10px'}}>
        <div className="roomManagement_Header" style={{background:'none'}}>
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
          </div>
        ))}
      </div>
      
    </div>
  );
};

const RoomManagement = () => {
    const [RoomData, setRoomData] = useState<FloorRoom[]>(RoomDataTest)
  const groupedRooms = groupByFloor(RoomData);
//   const [roomData, setRoomData] = useState<FloorRoom[]>(RoomData);
//   const groupedRoomsA = groupByFloor(roomData);
  
  const addFloor = () =>{
    const lastFloor = Math.max(...RoomData.map(r => r.floor)) + 1;
    const newRoom: FloorRoom = {floor: lastFloor, room: {RoomName: "", RoomType: "", RoomStatus: "",}
    
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

      {Object.entries(groupedRooms).map(([floor, rooms]) => (
        <FloorScroll
          key={floor}
          floor={parseInt(floor)}
          rooms={rooms}
          setRoomData = {setRoomData}
          roomData = {RoomData}
        />
      ))}
    </div>
  );
};

export default RoomManagement;
