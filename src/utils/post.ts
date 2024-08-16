import axios from "axios";

const fetchPost = async ({pageParam = 0}: {pageParam: number}) => {       
    const token = localStorage.getItem('app-token');
    
    if (!token) {
        return ;
    }

    const url = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!url) {
        return ;
    }

    const res = await axios.get(
        `${url}/api/post?page=${pageParam}`,
        {
            headers: {
                token: localStorage.getItem('app-token')
            }
        }
    )        
    return res.data;
}

const formatNumber = (num: number): string =>  {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
}

const getDate = (time: Date): string => {
    const date = new Date(time);
    return date.toDateString();
}

const likePost = async (postId: string, userId: string | undefined) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!url || !userId) {
        console.log('url or userId is not defined');
        console.log('url:', url);
        console.log('userId:', userId);
        
        
        return ;
    }

    const res = await axios.patch(
        `${url}/api/post/update?event=like&id=${postId}`,
        {
            userId
        },
        {
            headers: {
                token: localStorage.getItem('app-token')
            }
        }
    )
    return res.data;
}

export {
    fetchPost,
    formatNumber,
    getDate,
    likePost
};