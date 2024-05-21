export interface Reel {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

const data: Reel[] = [
    {
        id: '1',
        title: "reel1",
        videoUrl: "http://127.0.0.1:3000/reels/reel1.mp4",
        thumbnailUrl: "https://th.bing.com/th/id/OIP.5vUWBlv-Z2l1asf_LKrsEAHaDz?rs=1&pid=ImgDetMain",
    },
    {
        id: '1',
        title: "reel2",
        videoUrl: "http://127.0.0.1:3000/reels/reel2.mp4",
        thumbnailUrl: "https://th.bing.com/th/id/OIP.5vUWBlv-Z2l1asf_LKrsEAHaDz?rs=1&pid=ImgDetMain",
    },
    {
        id: '1',
        title: "reel3",
        videoUrl: "http://127.0.0.1:3000/reels/reel3.mp4",
        thumbnailUrl: "https://th.bing.com/th/id/OIP.5vUWBlv-Z2l1asf_LKrsEAHaDz?rs=1&pid=ImgDetMain",
    }
]

export const fetchReels = async (page: number = 1): Promise<Reel[]> => {
    const p = new Promise<Reel[]>(resolve => {
        setTimeout(() => {
            if (page <= data.length) {
                resolve([data[page - 1]]);
            } else {
                resolve([]); // No more data
            }
        }, 2000);
    });

    return await p;
};
