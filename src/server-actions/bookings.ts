'use server'
import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "./users";

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
        {
          $and : [
            { checkInDate: { $lte: reqCheckInDate} },
            { checkOutDate: { $gte: reqCheckOutDate} }
          ]
        }
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

export const BookRoom = async (payload: any) => {
  try {
    const userResponse = await GetCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();

    return{
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}