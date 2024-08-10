'use client'
import React from 'react'
import { HotelType } from '@/interfaces';
import { Table } from 'antd';
import { Delete, Edit, PlusSquare, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';


function HotelsTable({ hotels }: { hotels: HotelType[] }) {

  const columns = [
    {
      title : 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) => dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A")
    },
    {
      title: 'Action',
      key: 'action',
      render : (text: any, record: HotelType) => (
        <div className='flex gap-5 items-center'>
          <Trash2 size={18} className='cursor-pointer text-red-700'/>
          <Edit size={18} className='cursor-pointer text-yellow-700'/>
          <PlusSquare size={18} className='cursor-pointer text-green-700'/>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table dataSource={hotels} columns={columns} />
    </div>
  )
}

export default HotelsTable