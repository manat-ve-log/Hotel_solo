import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { type FloorRoom, } from ".";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";
import { FaCheck } from "react-icons/fa";
import './edit.css'

interface EditRoomProps {
  room: FloorRoom;  
}

const EditRoomById: React.FC<EditRoomProps> = ({ room }) => {
    const [form] = Form.useForm();
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleClick = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
        setPopup(true);
    };

    const onFinish = (values: any) => {
        console.log("Submitted values:", values);
        setPopup(false)
    };
    
    const [popup, setPopup] = useState<boolean>(false);

    return(
        <div  className="edit-container"
            style={{width:"100%",height:'100%',position:'relative'}}>
            <IoIosSettings className="icon-setting" style={{width:'20px',height:'20px',cursor:'pointer'}} onClick={handleClick}/>
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
                            roomNumber: room?.room.RoomName,
                            status: room?.room.RoomStatus,
                            price: room?.room.RoomPrice,
                            type: room?.room.RoomType,
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
                                        name="roomNumber"
                                        rules={[{ required: true, message: "กรุณาใส่ room number" }]}
                                        
                                    >
                                        <Input placeholder="roomNumber" />
                                    </Form.Item>

                                </Col>

                                <Col span={6}>
                                    <Form.Item
                                        label="Price"
                                        name="price"
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
                                        name="status"
                                        rules={[{ required: true, message: "กรุณาเลือก status" }]}
                                    >
                                        <Select placeholder="status" dropdownStyle={{ zIndex: 99999 }}>
                                            <Select.Option value="available">Available</Select.Option>
                                            <Select.Option value="occupied">Occupied</Select.Option>
                                            <Select.Option value="maintenance">Maintenance</Select.Option>
                                        </Select>
                                    </Form.Item>

                                
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Type"
                                        name="type"
                                        rules={[{ required: true, message: "กรุณาเลือก type" }]}
                                        
                                    >
                                        <Select placeholder="type" dropdownStyle={{ zIndex: 99999 }}>
                                            <Select.Option value="standard">Standard</Select.Option>
                                            <Select.Option value="deluxe">Deluxe</Select.Option>
                                            <Select.Option value="suite">Suite</Select.Option>
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