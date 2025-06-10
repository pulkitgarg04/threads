"use client";

import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BsTwitter,
  BsBookmark,
} from "react-icons/bs";
import {
  BiSolidHomeCircle,
  BiSearch,
  BiEditAlt,
  BiUser,
} from "react-icons/bi";
import { RiNotification2Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineArticle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

type SidebarElementType = {
  icon: JSX.Element;
  text: string;
  link?: string;
  onClick?: () => void;
};

const Sidebar: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const sidebarElements: SidebarElementType[] = [
    { icon: <BiSolidHomeCircle />, text: "Home", link: "/" },
    { icon: <MdOutlineArticle />, text: "News", link: "/news" },
    { icon: <BiSearch />, text: "Explore", link: "/explore" },
    { icon: <BiEditAlt />, text: "Write", link: "/write" },
    { icon: <RiNotification2Line />, text: "Notifications", link: "/notifications" },
    { icon: <BsBookmark />, text: "Bookmarks", link: "/bookmarks" },
    { icon: <HiOutlineUsers />, text: "Communities", link: "/communities" },
    { icon: <BiUser />, text: "Profile", link: "/profile" },
    { icon: <FiLogOut />, text: "Logout", onClick: handleLogout },
  ];

  return (
    <nav
      className={`${className} fixed bottom-0 flex w-full items-center border-t border-t-gray-600 p-2 md:relative md:flex md:flex-col md:border-t-0 lg:items-end`}
    >
      <div className="w-full md:w-fit">
        <div className="mb-2 hidden w-max rounded-full p-2 text-3xl transition-all hover:bg-gray-900 md:block">
          <BsTwitter />
        </div>

        <ul className="menuContainer flex justify-around py-1 md:block">
          {sidebarElements.map(({ icon, text, link, onClick }) => {
            const content = (
              <li
                className="flex w-max cursor-pointer items-center justify-evenly gap-5 rounded-full p-2 transition-all hover:bg-gray-900 md:my-4"
                onClick={onClick}
              >
                <span className="text-2xl">{icon}</span>
                <span className="hidden text-xl font-medium lg:block">
                  {text}
                </span>
              </li>
            );

            return link ? (
              <Link href={link} key={text}>
                {content}
              </Link>
            ) : (
              <div key={text}>{content}</div>
            );
          })}
        </ul>

        <button className="hidden h-12 w-full max-w-[56rem] rounded-full bg-blue-500 py-2 font-medium text-white lg:block">
          Post
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;