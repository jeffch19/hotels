'use client'
import { uploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { HotelType } from "@/interfaces";
import { AddRoom, EditRoom } from "@/server-actions/rooms";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


function RoomsForm({
  type = "add",
  initialData,
  hotels
}: {
  type?: string,
  initialData?: any,
  hotels: HotelType[]
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(initialData?.media || []);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await uploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      let response: any = null;
      // console.log("Success:", values);
      if (type === "add") {
        response = await AddRoom(values);
      } else {
        response = await EditRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/rooms");
      }

      if (!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.messasge);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form className="grid grid-cols-3 mt-5 gap-5" layout="vertical" onFinish={onFinish} initialValues={initialData}>

      <Form.Item label="Hotel" name="hotel" rules={[{ required: true, message: "Please select a hotel!" }]}>
        <Select>
          {hotels.map((hotel) => (
            <Select.Option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required!" }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Room Number" name="roomNumber" rules={[{ required: true, message: "Room Number is required!" }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type is required!" }]}>
        <Select>
          
            <Select.Option key="Deluxe" value="deluxe">
              Deluxe
            </Select.Option>
            <Select.Option key="premium" value="premium">
              Premium
            </Select.Option>
            <Select.Option key="standard" value="standard">
              Standard
            </Select.Option>
        
        </Select>
      </Form.Item>

      <Form.Item label="Bedrooms" name="bedrooms" rules={[{ required: true, message: "Bedroom count is required!" }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Cost Per Night" name="rentPerDay" rules={[{ required: true, message: "Cost per night is required!" }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Amenities" name="amenities" rules={[{ required: true, message: "Amenities are required!" }]} className="col-span-3">
          <Input.TextArea />
      </Form.Item>

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div className="flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center" key={index}>
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span className="text-gray-500 underline text-sm cursor-pointer"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter((item: string, i: number) => i !== index)
                  )
                }}
              >Remove</span>
            </div>
          ))}
        </div>
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
        <Button disabled={loading} onClick={() => router.push("/admin/hotels")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  )
}

export default RoomsForm