'use client'
import { uploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel } from "@/server-actions/hotels";
import { Button, Form, Input, message, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function HotelForm({
  type = "add"
} : {
  type: string
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.media = await uploadImageToFirebaseAndReturnUrls(uploadedFiles);
      let response:any = null;
      // console.log("Success:", values);
      if(type === "add"){
        response = await AddHotel(values);
      }

      if(response.success){
        message.success("Hotel added successfully");
        router.push("/admin/hotels");
      }

      if(!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.messasge);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form className="grid grid-cols-3 mt-5 gap-5" layout="vertical" onFinish={onFinish}>
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

        <div className="col-span-3">
          <Upload 
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadedFiles([...uploadedFiles, file]);
            return false;
          }}
          multiple
          >
            <span className="text-xs text-gray-500 p-3">
              Upload Media
            </span>
          </Upload>
        </div>


        <div className="col-span-3 flex justify-end gap-5">
          <Button disabled={loading}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default HotelForm