import {signIconsTypes} from "@/interface/inputTypes"

export const singIconDetails:signIconsTypes[] = [
    {
        alt: "google",
    },
    {
        alt: "facebook",
    },
    {
        alt: "github",
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

export const qualification = [
    {key: "fsd", label: "Full Stack Developer"},
    {key: "se", label: "Software Engineering"},
    {key: "sde", label: "Software Developer Engineering"},
    {key: "dao", label: "Development and Operations"},
    {key: "eh", label: "Ethical Hacker"},
    {key: "fed", label: "Front end Developer"},
    {key: "bed", label: "Back end Developer"},
    {key: "others", label: "Others"}
];
