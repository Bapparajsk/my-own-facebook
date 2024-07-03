export interface PostProps {
    id: string
    name: string
    time: Date
    userImg: string
    description: string
    userActive: boolean
    isImage: boolean
    containUrl: string | undefined
    like: number
    comment: number
    share: number
    preview?: boolean
    ref?: any
}

export interface CommentProps {
    name: string
    comment: string
    profileImageUrl: string
}
