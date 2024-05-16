'use client'

import {Avatar, Badge} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";
import StatusBox from "@/components/home/StatusBox";
import React from "react";
import RenderPosts from "@/components/home/RenderPosts";

export default function Home() {

  return (
      <div className={'w-full h-auto px-4'}>
          <div className={'w-full h-auto flex gap-x-8 items-center mt-2'}>
              <Badge
                  color="primary"
                  size="md"
                  placement={'bottom-right'}
                  showOutline={false}
                  content={<GetIcon name={'plus'}/>}
              >
                  <Avatar
                      size={'lg'}
                      isBordered={false}
                      color={'success'}
                      src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
              </Badge>
              <StatusBox/>
          </div>
          <hr className="border-none h-[1px] bg-default-300 text-red-800 mt-4"/>
          <RenderPosts/>
      </div>
  );
}
