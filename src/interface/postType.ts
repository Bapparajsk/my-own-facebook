export interface  CommentType {
    userId: string,
    userName: string,
    userImage: string,
    createdAt: Date
    comment: string
}

export interface PostSType{
    _id: string
    userId: unknown
    name: string
    imageUrl: string | undefined
    createdAt: Date
    description: any
    contentUrl: string
    contentType: string
    likeCount: number
    commentCount: number
    shareCount: number
    comments: CommentType[]
}