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
                  disableAnimation={false}
              >
                  <Avatar
                      size={'lg'}
                      isBordered={false}
                      color={'success'}
                      src="https://pbs.twimg.com/profile_images/1754927710302883841/ylGsCbNa_400x400.jpg"
                  />
              </Badge>
              <StatusBox/>
          </div>
          <hr className="border-none h-[1px] bg-default-300 text-red-800 mt-4"/>
          <RenderPosts/>
      </div>
  );
}
