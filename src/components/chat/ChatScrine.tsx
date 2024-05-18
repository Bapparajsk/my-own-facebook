import React from 'react';
import {Input, Button} from "@nextui-org/react";
import { GetIcon } from '../GetIcon';
import SendMe from './SendMe';
import SendYou from './SendYou';

const ChatScrine = () => {
    return (
        <div className={'w-full h-full'}>
            <div className={'w-screen z-50 fixed bottom-0 bg-black/20 py-2 flex gap-x-2 px-2 backdrop-blur-xl'}>
                <Input
                    type="text"
                    placeholder="Type your message"
                    onClear={() => console.log("input cleared")}
                    className="w-full"
                />
                <Button color="primary" variant="shadow" isIconOnly >
                    <GetIcon name={'send'} className={'!w-6 !h-6'}/>
                </Button>
            </div>
            <div className={'w-full flex flex-col gap-y-2 justify-between px-4 mb-16'}>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendMe message={'hello'}/>
                <SendYou message={'world'}/>
                <SendYou message={'bolo'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
            </div>
        </div>
    );
};

export default ChatScrine;
