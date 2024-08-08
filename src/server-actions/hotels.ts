'use server';

import { connectMongoDB } from "@/config/db";
import HotelModel from "@/models/hotel-model";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const AddHotel = async(payload:any) => {
  try {
    const newHotel = new HotelModel(payload);
    await newHotel.save();
    revalidatePath("/admin/hotels");
    return {
      success: true,
    }
  } catch (error:any) {
    return {
      success: false,
      error: error.message,
    }
  }
}