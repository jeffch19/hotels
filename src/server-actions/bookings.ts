'use server'
import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
      bookingStatus: "Booked",
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

export const CancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    //change the status of the booking to cancelled
    await BookingModel.findByIdAndUpdate(bookingId, { bookingStatus: "Cancelled" });

    //refund the payment
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if(refund.status !== "succeeded") {
      return {
        success: false,
        message: "Your booking has been cancelled but the refund failed. Please contact support for further assistance.",
      };
    }

    revalidatePath("/user/bookings")
    return {
      success: true,
      message: "Your booking has been cancelled and the refund has been processed."
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}