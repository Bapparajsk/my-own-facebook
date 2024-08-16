export interface PostProps {
    idx: number
    id: string
    name: string
    time: Date
    userImg: string
    description: string
    userActive: boolean
    isImage: boolean
    containUrl: string | undefined
    likeCount: number
    commentCount: number
    shareCount: number
    preview?: boolean
    ref?: any
}

export interface CommentProps {
    name: string
    comment: string
    profileImageUrl: string
}
