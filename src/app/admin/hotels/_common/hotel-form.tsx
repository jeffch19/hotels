'use client'
import { Form, Input } from "antd";
import React from "react";

function HotelForm() {
  return (
    <div>
      <Form className="grid grid-cols-3 mt-5 gap-5" layout="vertical">
        <Form.Item className="col-span-3" label="Hotel Name" name='name' rules={[{ required: true, message: "Please input hotel name!" }]}>
          <Input placeholder="Hotel Name" />
        </Form.Item>


        <Form.Item className="col-span-3 lg:col-span-1"
         label="Owner Name" name='owner' 
         rules={[{ required: true, message: "Please input owner name!" }]}
         >
          <Input placeholder="Owner Name" />
        </Form.Item>

        <Form.Item className="col-span-3 lg:col-span-1"
         label="Email" name='email' 
         rules={[{ required: true, message: "Please input email!" }]}
         >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item className="col-span-3 lg:col-span-1"
         label="Phone" name='phone' 
         rules={[{ required: true, message: "Please input phone number!" }]}
         >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item className="col-span-3"
         label="Address" name='address' 
         rules={[{ required: true, message: "Please input address!" }]}
         >
          <Input.TextArea placeholder="Address" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default HotelForm