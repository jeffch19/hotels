import { UserType } from "@/interfaces";
import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

function Sidebar({ showSideBar, setShowSideBar, loggedInUserData }: {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {

  const iconSize = 18;
  const router = useRouter();

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/")
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings")
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile")
    },
  ]
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/")
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings")
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels")
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms")
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports")
    },
  ]

  const menuItemsToShow: any[] = loggedInUserData.isAdmin ? adminMenuItems : userMenuItems



  return (
    <Drawer open={showSideBar} onClose={() => setShowSideBar(false)} closable>
      <div className="flex flex-col gap-14">
      {menuItemsToShow.map((item, index) => (
        <div className="flex gap-4 items-center text-gray-700 cursor-pointer"
          key={index}
          onClick={() => {
            item.onClick();
            setShowSideBar(false);
          }}
        >
          {item.icon}
          <span className="mt-[2px]">{item.name}</span>
        </div>
      ))}
      </div>
    </Drawer>
  )
}

export default Sidebar