export interface PostProps {
    name: string
    time: string
    userImg: string
    description: string
    userActive: boolean
    isImage: boolean
    containUrl: string | undefined
    like: number
    comment: number
    share: number
}

export interface CommentProps {
    name: string
    comment: string
    profileImageUrl: string
}
