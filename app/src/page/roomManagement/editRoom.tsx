import { useEffect, useState, type CSSProperties } from "react";
import { type RoomInterface } from ".";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";
import { FaCheck } from "react-icons/fa";
import './edit.css'
import { RoomService, RoomTypeService, StatusService } from "../../service/https/room";
import { CiEdit } from "react-icons/ci";

export interface Status {
  id: number;
  room_status: string; 
}
export interface Type {
  id: number;
  room_type: string; 
}

interface EditRoomProps {
    style?:CSSProperties;
    room: RoomInterface;
}

const EditRoomById: React.FC<EditRoomProps> = ({ room }) => {
    const [status, setStatus] = useState<Status[]>([]);
    const [type, setType] = useState<Type[]>([]);

    const [form] = Form.useForm();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const fetchStatus = async () => {
        try{
        const res = await StatusService.getStatus();
        console.log("room status --> ",res)
        if (res){
            setStatus(res.data.data)
        }
        }catch(error){
        console.error(error);
        }
    }
    const fetchType = async () => {
        try{
        const res = await RoomTypeService.getRoomType();
        if (res){
            setType(res.data)
        }
        }catch(error){
        console.error(error);
        }
    }
    useEffect(()=>{
        fetchStatus();
        fetchType();
    },[])

    const handleClick = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
        setPopup(true);
    };

    const onFinish = async(values: any) => {
        const updataData = {id:room.id, ...values}
        try{
            const res = await RoomService.updateRoomById(updataData)
            if (res){
                alert("update success")
                window.location.reload();
            }
        }catch(err){
            console.error(err)
            alert("error")
        }
        setPopup(false)
    };
    
    const [popup, setPopup] = useState<boolean>(false);

    return(
        <div  className="edit-container"
            style={{width:"100%",height:'100%',position:'relative'}}>
            <CiEdit className="icon-setting" style={{width:'20px',height:'20px',cursor:'pointer'}} onClick={handleClick}/>
            {popup && (
                <div 
                    style={{
                        position: "fixed",
                        top: pos.y,
                        left: pos.x,
                        transform: "translate(-50%, 0)", // กึ่งกลาง popup ทางแนวนอน
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 9999,
                        width: "380px",
                        height:'190px'
                    }}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', width:'100%',height:'40px'}}>
                        <div style={{opacity:'0.7',fontSize:'20px',paddingLeft:'15px'}}>Room Information</div>
                        <div
                            className="icon-btn"
                            onClick={() => {form.submit()}}
                            >
                            <FaCheck className="icon-check"  />
                        </div>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            floor: room?.floor,
                            room_number: room?.RoomName,
                            room_status: room?.RoomStatus,
                            room_price: room?.RoomPrice,
                            room_type: room?.RoomType,
                        }}
                        onFinish={onFinish}
                        style={{height:"150px", padding: "0 10px" , gap:'1px'}}
                        >
                            <Row gutter={[12, 1]} style={{height:'50%'}}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Floor"
                                        name="floor"
                                        rules={[{ required: true, message: "กรุณาใส่ floor" }]}
                                        

                                    >
                                        <InputNumber style={{ width: "100%" }} min={1} max={10} placeholder="floor" controls={false} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Room"
                                        name="room_number"
                                        rules={[{ required: true, message: "กรุณาใส่ room number" }]}
                                        
                                    >
                                        <Input placeholder="roomNumber" />
                                    </Form.Item>

                                </Col>

                                <Col span={6}>
                                    <Form.Item
                                        label="Price"
                                        name="room_price"
                                        rules={[{ required: true, message: "กรุณาใส่ price" }]}
                                        

                                    >
                                        <InputNumber min={0} placeholder="price" controls={false} style={{ width: "100%" }}/>

                                    </Form.Item>

                                </Col>
                            </Row>

                            <Row gutter={[12,1]} style={{ height:"50%"}}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Status"
                                        name="room_status"
                                        rules={[{ required: true, message: "กรุณาเลือก status" }]}
                                    >
                                        <Select placeholder="status" dropdownStyle={{ zIndex: 99999 }}>
                                            {status.map((s)=>(
                                                <Select.Option key={s.id}
                                                    value={s.room_status}
                                                >
                                                    {s.room_status}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Type"
                                        name="room_type"
                                        rules={[{ required: true, message: "กรุณาเลือก type" }]}
                                        
                                    >
                                        <Select placeholder="type" dropdownStyle={{ zIndex: 99999 }}>
                                            {type.map((t)=>(
                                                <Select.Option key={t.id}
                                                    value={t.room_type}
                                                >
                                                    {t.room_type}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                
                                </Col>
                            </Row>
                       

                       
                       
                       
                    </Form>
                                                
                </div>
            )}
             
                        

        </div>
    )
}


export default EditRoomById;