import { Form, Input, InputNumber, Row, Col, Button } from "antd";
import type React from "react";
import type { RoomInterface } from "../roomManagement";
import { DatePicker } from "antd";
import { BookingService } from "../../service/https/booking";
const { RangePicker } = DatePicker;
import { LuBedSingle } from "react-icons/lu";
import { LuBedDouble } from "react-icons/lu";
import { useState } from "react";


interface RoomById{
    id?:number;
    room?:RoomInterface;
    setOpenForm:React.Dispatch<React.SetStateAction<boolean>>;
}
interface BookingInterface{
    booking_people:number;
    room_number:string;
    booking_check_in:string;
    booking_check_out:string;
    booking_status:boolean;
    name:string;
    phone:string;
    email:string;

}
const BookingForm: React.FC<RoomById> = ({ room, setOpenForm }) => {
    const [form] = Form.useForm();
    const [totalPrice, setTotalPrice] = useState<number>(room?.RoomPrice);
    const [totalDay, setTotalDay] = useState<number>(1);

    const selectDate = (dates:any) =>{
        if (!dates || dates.length < 2) {
            return;
        }
        const day = dates[1].diff(dates[0], "day");
        setTotalDay(day);
        setTotalPrice(room?.RoomPrice*day)
    }

    const onFinish = async (value:any) =>{
        const check_in = value.date[0].format("YYYY-MM-DD 00:00:00")
        const check_out = value.date[1].format("YYYY-MM-DD 00:00:00")
        const data = {
                booking_people: value.total_people,
                booking_check_in: check_in,
                booking_check_out: check_out,
                booking_status: false,
                room_number: room?.RoomName,
                name: value.name,
                email: value.email,
                phone: value.phone
                }
        try{
            const res = await BookingService.createBooking(data);
            console.log("status --> ",res)
            if (res.success){
                alert("create booking success ")
            }else{
                alert('ห้องนี้มีการจองแล้ว')
            }
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div 
            style={{background:'white',width:'400px',height:'450px',borderRadius:'10px',padding:'10px'}}
        >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            

                        }}
                        onFinish={onFinish}
                        style={{height:"150px", padding: "0 10px" , gap:'1px'}}
                        >
                            <Row gutter={[12, 1]} style={{height:'50%'}}>
                                <div style={{display:'flex',alignItems:'center',width:'100%',height:'100%',padding:'5px',gap:'10px'}}>
                                    <div style={{width:'25%',height:'90%',display:'flex',justifyContent:'center',alignItems:'center',border:"2px dashed  black",borderRadius:'8px'}}>
                                        {room?.RoomName}
                                    </div>
                                    <div style={{height:'90%',width:'20%'}}>
                                        <div style={{color:'grey',fontSize:'12px'}}>ราคาต่อคืน</div>
                                        <div>{room?.RoomPrice}</div>
                                    </div>
                                    <div style={{height:'90%',width:'25%'}}>
                                        <div style={{color:'grey',fontSize:'12px'}}>ประเภทห้อง</div>
                                        <div>{room?.RoomType}</div>
                                    </div>
                                    <div style={{width:'30%',height:'90%',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'24px'}}>
                                        {
                                            room?.RoomType == "Single Room" && <LuBedSingle/> ||
                                            room?.RoomType == "Twin Room" && <LuBedDouble/> ||
                                            room?.RoomType == "Triple Room" && <div><LuBedDouble/><LuBedSingle/></div> ||
                                            room?.RoomType == "Quad Room" && <div><LuBedDouble/><LuBedDouble/></div>||
                                            <LuBedSingle/>
                                        }
                                    </div>
                                </div>
                            
                            </Row>
                            <Row gutter={[12,1]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="name"
                                        name="name"
                                        rules={[{ required: true, message: "กรุณาใส่ user" }]}
                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                </Col>
                                 <Col span={12}>
                                    <Form.Item
                                        label="date"
                                        name="date"
                                        rules={[{ required: true, message: "กรุณาใส่ วันที่พัก" }]}
                                        
                                    >
                                        <RangePicker 
                                            onChange={(dates) => {selectDate(dates)}}
                                            getPopupContainer={(trigger: HTMLElement) => trigger.parentNode as HTMLElement}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[12,1]}>
                                <Col span={6}>
                                    <Form.Item
                                        label="people"
                                        name="total_people"
                                        rules={[{ required: true, message: "กรุณาใส่ จำนวนคน" }]}
                                    >
                                        <InputNumber style={{ width: "100%" }} min={1} max={10} placeholder="people" controls={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="phone"
                                        name="phone"
                                        rules={[{ required: true, message: "กรุณาใส่ phone" }]}
                                    >
                                        <Input placeholder="phone" />
                                    </Form.Item>
                                </Col>
                                 <Col span={12}>
                                    <Form.Item
                                        label="email"
                                        name="email"
                                        rules={[{ required: true, message: "กรุณาใส่ email" }]}
                                    >
                                        <Input placeholder="email"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[12,15]}>
                                <Col span={24} style={{width:'100%',height:'100px'}}>
                                    <div
                                    style={{width:'100%',height:'100%',padding:'10px'}}>
                                        ราคารวม: {totalPrice} ต่อ {totalDay} วัน
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={[12, 15]} style={{  marginTop:'10px',padding:'8px' }}>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col 
                                    span={12} 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        gap:'10px'
                                    }}
                                >
                                    
                                    <Button type="default" onClick={()=>(setOpenForm?.(false))}>
                                        Cencel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                
                                </Col>
                            </Row>
                    </Form>

        </div>
    )
}


export default BookingForm;