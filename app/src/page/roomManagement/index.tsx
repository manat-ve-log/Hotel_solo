import { useEffect, useRef, useState } from 'react';
import './index.css';
import EditRoomById from './editRoom';
import { RoomService } from '../../service/https/room';
import { IoMdPricetags } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { MdBedroomChild } from "react-icons/md";
import { LuBedSingle } from "react-icons/lu";
import { LuBedDouble } from "react-icons/lu";

import { BiSolidBadgeCheck } from "react-icons/bi";
import { GrVmMaintenance } from "react-icons/gr";

export interface RoomInterface {
  id?: number;
  floor: number;
  RoomName: string;
  RoomPrice:number|any;
  RoomType: string;
  RoomStatus: string;
}


function randomCode() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const number = Math.floor(10+Math.random()*90);
  return `'${letter}${number}'`;
}

interface FloorScrollProps {
  rooms: RoomInterface[];
}

const FloorScroll = ({ rooms }: FloorScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  let pos = { left: 0, x: 0 };
  let momentumID: any;

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    // scrollRef.current.style.cursor = "grabbing";
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
  

    const addRooms = async () => {

      try{
        const res = await RoomService.createRoom(
          {
            floor: rooms[0].floor,
            room_number: randomCode(),
            room_price: 0,
            room_type: "Single Room",
            room_status: "maintenance",
          }
        );
        if (res){
          alert("add room success")
          window.location.reload();
        }

      }catch(err){
        console.error("ERROR createRoom:", err);
      }
        
    }


  return (
    <div 
        className='edit-index'
        style={{ background:'#e0e0e0',padding:'5px',borderRadius:'8px',marginBottom:'10px'}}>
          
        <div className="roomManagement_Header" >
            <h3>ชั้น {rooms[0].floor}</h3>
            <button onClick={()=>{addRooms()}}>
                +ห้อง
            </button>
        </div>
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={mouseDownHandler}
      >
        {rooms.map(room => (
          <div
            key={room.id}
            className="roomManagement_room"
          >
            <div className='child c1'>
              {room.RoomName}
              <sup>
                {room.RoomStatus == 'booking' && <div><BiSolidBadgeCheck color='green'size={12}style={{opacity:'0.4',marginLeft:'2px'}}/></div>||
                  room.RoomStatus == 'maintenance' && <div><GrVmMaintenance color='red'size={12}style={{opacity:'0.4',marginLeft:'2px'}}/></div>

                }
              </sup>
              
            </div>
            <div className='child c2'>
              <IoMdPricetags />
              {room.RoomPrice}
            </div>
            <div className='child c3'>
              <GrStatusGood/>
              {room.RoomStatus}
            </div>
            <div className='child c4'>
              <MdBedroomChild/>
              {room.RoomType}
            </div>
            <div className='c5'>
              <div className='c5-icon'>
                {
                  room.RoomType == "Single Room" && <LuBedSingle/> ||
                  room.RoomType == "Twin Room" && <LuBedDouble/> ||
                  room.RoomType == "Triple Room" && <div><LuBedDouble/><LuBedSingle/></div> ||
                  room.RoomType == "Quad Room" && <div><LuBedDouble/><LuBedDouble/></div>||
                  <LuBedSingle/>
                }
              </div>
            
            </div>
            <div className='room_edit'>
                <EditRoomById room={room}/>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

const RoomManagement = () => {
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
  
    const fetchRooms = async () => {
        try {
            const res = await RoomService.getRooms();
            const rooms = res.data.map((r: any) => ({
              id: r.id,
              floor: r.floor,
              RoomName: r.room_number,
              RoomPrice: r.room_price,
              RoomStatus: r.room_status,
              RoomType: r.room_type
            }));
            setRooms(rooms);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(()=>{
        fetchRooms();
    },[])
  
    const addFloor = async () =>{
      const lastFloor = Math.max(...rooms.map(r => r.floor)) + 1;
      alert(lastFloor);
      const r: RoomInterface = {floor: lastFloor, RoomName: randomCode(), RoomPrice:0, RoomType: "Single Room", RoomStatus: "maintenance",};
      try{
        const res = await RoomService.createRoom(
          {
            floor: r.floor,
            room_number: r.RoomName,
            room_price: r.RoomPrice,
            room_type: r.RoomType,
            room_status: r.RoomStatus,
          }
        );
        if (res){
          alert(res.data)
          window.location.reload();
        }

      }catch(err){
        console.error("❌ ERROR createRoom:", err);
      }
        
    }

    const groupedRooms = rooms.reduce<Record<number, RoomInterface[]>>((acc, room) => {
      if (!acc[room.floor]) acc[room.floor] = [];
      acc[room.floor].push(room);
      return acc;
    }, {});

  return (
    <div className="roomManagement_container" style={{ padding: 20 }}>
      <div className="roomManagement_Header" style={{ marginBottom: 20 }}>
        <h2>Room</h2>
        <button className='addRoom' onClick={addFloor}>
            เพิ่มชั้น
        </button>
      </div>
      <div className='room-body'>
        {Object.entries(groupedRooms).map(([floor, floorRooms]) => (
          <FloorScroll key={floor} rooms={floorRooms} />
        ))}
            
      </div>
    </div>
  );
};

export default RoomManagement;
