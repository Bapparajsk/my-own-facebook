import {
    Home,
    User,
    Users,
    MessageCircle,
    Menu,
    MoveLeft,
    UserPlus,
    Play,
    Bell,
    UserRoundCheck,
    Camera,
    Plus,
    PencilLine,
    Settings2,
    ImageUp,
    Clapperboard,
    FileText,
    MessagesSquare,
    Share2,
    ThumbsUp
} from "lucide-react"
import React from "react";


interface Prams {
    name: string
    className?: string
    strokeWidth?: number
    size?: number
}

export const GetIcon = (prams: Prams): React.JSX.Element => {

    const {name,className, strokeWidth, size } = prams;
    switch (name) {
        case 'home':
            return <Home className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'profile':
            return <User className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'friend':
            return <Users className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'message':
            return <MessageCircle className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'notification':
            return <Bell className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'manu':
            return <Menu className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'move-left':
            return <MoveLeft className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'user-plus':
            return <UserPlus className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'user-tick':
            return <UserRoundCheck className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'video-reels':
            return <Play className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'camera':
            return <Camera className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'plus':
            return <Plus className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'edit-pen':
            return <PencilLine className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'setting':
            return <Settings2 className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'image-upload':
            return <ImageUp className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'video':
            return <Clapperboard className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'text-file':
            return <FileText className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'comment':
            return <MessagesSquare className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'share':
            return <Share2 className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
        case 'like':
            return <ThumbsUp className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>

        default :
            return <Home className={`${className} w-full h-auto`} strokeWidth={ strokeWidth ? strokeWidth : 1.5} size={size}/>
    }
}
