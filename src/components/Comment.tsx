"use client";

import React, { memo, forwardRef, Fragment } from "react";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { getDate } from '@/utils/post';
import { CommentType } from "@/interface/component";
import { formatName } from '@/utils/format';

const Comment = forwardRef<HTMLDivElement, CommentType>(
  ({ id, userId, userName, userImage, createdAt, modify, comment }, ref) => {

    const commentDate = comment.split('\n');

    return (
      <div ref={ref} className={'flex gap-x-2'}>
        <div className={"h-fit cursor-pointer"}>
          <Avatar
            radius="full"
            src={userImage}
            showFallback={true}
          />
        </div>
        <Card>
          <CardBody className={'w-full h-full'}>
            <div className="w-full">
              <strong className={'text-blue-300'}>{formatName(userName, 16)}</strong>
              <span className={'text-gray-400 text-[12px] ml-5'}>{getDate(modify)}</span>
            </div>
            <p className={'font-mono'}>
              {
                commentDate.map((item, idx) => (
                  <Fragment key={idx}>
                    <span>{item}</span>
                    <br />
                  </Fragment>
                ))
              }
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }
);

export default memo(Comment);
