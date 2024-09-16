import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";

connectMongoDB()

export const CheckRoomAvailability = async({
  roomId,
  reqCheckInDate,
  reqCheckOutDate
} : {
  roomId: string,
  reqCheckInDate: string,
  reqCheckOutDate: string
}) => {
  try {
    const bookedSlot = await BookingModel.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate
          },
        },
      ],
    });

    if(bookedSlot) {
      return{
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
    success: false,
    message: error.message,
    };
  }
}