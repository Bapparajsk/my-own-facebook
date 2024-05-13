import {signIconsTypes} from "@/types/inputTypes"

import google from '@/assets/images/google.png';
import fb from '@/assets/images/fb.png';
import linkedin from '@/assets/images/linkedin.png';
import github from '@/assets/images/github.png';

export const singIconDetails:signIconsTypes[] = [
    {
        url: google,
        alt: "google sign-up",
    },
    {
        url: fb,
        alt: "facebook sign-up",
    },
    {
        url: github,
        alt: "github sign-up",
    },
    {
        url: linkedin,
        alt: "linkedin sign-up",
    },
]


interface User {
    url: string
    name: string
    description: string
    friend: boolean
}

export const users:User[] = [
    {
        url: "https://static.vecteezy.com/system/resources/previews/004/753/002/original/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg",
        name: "bapparaj sk",
        description: "full stack developer",
        friend: true,
    },
    {
        url: "https://th.bing.com/th/id/R.bf9d30c2cc22ea39621197dad1e31cec?rik=9Akq9OdUbvKZrQ&riu=http%3a%2f%2fwww.aarondietz.us%2fwp-content%2fuploads%2f2020%2f02%2ftmp_photo-1440742284086-3edeb282b9f0-imhwpb-4hypugovtbs6pgm.jpg&ehk=AvFA1tuCAihFErAgZHjCek5YkHjpNUCX5ECfNmUFz3E%3d&risl=&pid=ImgRaw&r=0",
        name: "Aaron Dietz",
        description: "Product Designer",
        friend: false,
    },
    {
        url: "https://i.pinimg.com/736x/ad/18/8a/ad188aac87167481f77a9bb17c3d1342.jpg",
        name: "Masud rana",
        description: "full stack developer",
        friend: false,
    },
    {
        url: "https://images.hdqwalls.com/wallpapers/blonde-cute-girl-pg.jpg",
        name: "Sohely Khatun",
        description: "Product Designer",
        friend: true,
    },
    {
        url: "https://www.wallpapertip.com/wmimgs/147-1479072_download-indian-facebook-girl-pic-hd-facebook-girl.jpg",
        name: "Roja",
        description: "full stack developer",
        friend: false,
    },
]
