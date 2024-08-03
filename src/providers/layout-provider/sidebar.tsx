import { UserType } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

function Sidebar({ showSideBar, setShowSideBar, loggedInUserData }: {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {

  const iconSize = 18;
  const router = useRouter();
  const pathname = usePathname();

  const {signOut} = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSideBar(false);
    router.push("/sign-in");
  };

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ]
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname === "/admin/rooms",
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ]

  const menuItemsToShow: any[] = loggedInUserData.isAdmin ? adminMenuItems : userMenuItems



  return (
    <Drawer open={showSideBar} onClose={() => setShowSideBar(false)} closable>
      <div className="flex flex-col gap-14">
      {menuItemsToShow.map((item, index) => (
        <div className={`flex gap-4 items-center text-gray-700 cursor-pointer px-7 py-3 rounded
           ${item.isActive ? 'bg-gray-700 text-white' : '' }`}
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


      <span className="text-center cursor-pointer text-red-500" onClick={onLogout}>
        Logout
      </span>
      </div>
    </Drawer>
  )
}

export default Sidebar