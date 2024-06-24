'use client'

import { Avatar, Badge, Spinner } from "@nextui-org/react";
import { GetIcon } from "@/components/GetIcon";
import StatusBox from "@/components/home/StatusBox";
import RenderPosts from "@/components/home/RenderPosts";
import { useRouter } from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useUserContext } from '@/context/UserProvider'

export default function Home() {
    const router = useRouter();
    const { setUserDetails, fetchUser } = useUserContext();


    const {isPending, isError, data, isSuccess} = useQuery({
        queryKey: ["get-user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        retry: 2, // Retry failed requests twice

    });

    if (isPending) {
        console.log("data is loading please wiet");
        return (
            <div className={'w-screen h-screen absolute flex items-center justify-center'}>
                <Spinner color="success" size={'lg'}/>
            </div>
        );
    }
    if(!isSuccess) {
        router.replace('/sign-in');
    }
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
          <RenderPosts />
      </div>
  );
}
