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
    comments?: Map<string, CommentType>
}

export interface CommentType {
    id: string,
    userId: string,
    userName: string,
    userImage: string | undefined,
    createdAt: Date
    modify: Date
    comment: string
    _userId?: string | undefined
}
