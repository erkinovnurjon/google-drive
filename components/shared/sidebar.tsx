import React from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud,  Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Item from "./item";
import { Progress } from "../ui/progress";

const Sidebar = () => {
  return (
    <div className="h-[90vh] w-72 fixed top-[10vh] left-0 z-30 bg-[#F6F9FC] dark:bg-[#1f1f1f]">
      <div className='flex flex-col p-3'>
        <Button className="w-fit h-12 rounded-full">
          <Plus /> <span>New</span>
        </Button>
      </div>

      <div className="flex flex-col space-y-6 mt-8">
        {sidebarLinks.map((link) => (
          <Link href={link.path} key={link.path}>
            <Item icon={link.icon} label={link.label} />
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-2 mx-4">
         <Progress />
      </div>
    </div>
  );
};

export default Sidebar;

const sidebarLinks = [
  {
    label : "My Drive",
    icon :Tablet,
    path: '/'
  },
  {
    label : "Starred",
    icon :Star,
    path: '/starred'
  },
  {
    label : "Recent",
    icon :Clock5,
    path: '/reacent'
  },
  {
    label : "Trash",
    icon :Trash,
    path: '/trash'
  },
  {
    label : "Storage",
    icon : Cloud ,
    path: '/cloud'
  }
  
]