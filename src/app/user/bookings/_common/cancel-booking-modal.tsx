import { BookingType } from '@/interfaces'
import { Modal } from 'antd'
import React from 'react'

function CancelBookingModal({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal
}: {
  booking: BookingType,
  showCancelBookingModal: boolean,
  setShowCancelBookingModal: (show: boolean) => void
}) {


  const onCancel = async () => {}

  return (
    <Modal
      title={
        <div className='text-red-700 font-bold'>Cancel Booking</div>
      }
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      centered
      okText="Yes, Cancel"
    >

      <div className='text-sm text-gray-600 mb-7'>
        <div className='flex justify-between text-sm'>
          <span>Check In</span>
          <span>{booking.checkInDate}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Check Out</span>
          <span>{booking.checkOutDate}</span>
        </div>
      </div>

      <span className='text-gray-500 text-sm'>
        Are you sure you want to Cancel the booking? This action cannot be undone.
      </span>
    </Modal>
  )
}

export default CancelBookingModal