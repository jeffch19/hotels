'use client'
import { uploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel, EditHotel } from "@/server-actions/hotels";
import { Button, Form, Input, message, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function HotelForm({
  type = "add",
  initialData,
}: {
  type: string,
  initialData?: any
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
        response = await AddHotel(values);
      } else {
        response = await EditHotel({
          hotelId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/hotels");
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
    <div>
      <Form className="grid grid-cols-3 mt-5 gap-5" layout="vertical" onFinish={onFinish} initialValues={initialData}>
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

        <div className="col-span-3 flex gap-5">
          <div className="flex gap-5">
            {existingMedia.map((media: any, index: number) => (
              <div className="flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center" key={index}>
                <img src={media} alt="media" className="h-16 w-16 object-cover" />
                <span className="text-gray-500 underline text-sm cursor-pointer"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter((item: string, i:number) => i !== index)
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
    </div>
  )
}

export default HotelForm