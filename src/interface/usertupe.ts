export interface ChatType {
    chatId: unknown
    userId: unknown
    name: string
    profileImage: string | undefined
}

export interface DateOfBirthType {
    day: number,
    month: number,
    year: number
}

export interface NotificationType {
    userId: unknown
    name: string
    image: string | undefined
    createdAt: Date
    description: string
    Type: string
    token?: string
}

export interface FriendsType {
    userId: unknown
    name: string
    image: string | undefined
}

export interface UserSType {
    name: string
    active: boolean
    dateOfBirth: DateOfBirthType,
    emails: { value: string }[]
    profileImage: {
        coverImageURL?: string
        profileImageURL?: string
    },
    socialLink: {
        googleId?: string
        githubId?: string
        facebookId?: string
    },
    post: { postId: unknown }[]
    reel: { reelId: string }[]
    friends: Map<unknown, FriendsType>
    friendRequest: Map<unknown, FriendsType>
    friendRequestSend: Map<unknown, FriendsType>
    chat: ChatType[]
    notification: NotificationType[]
    createdAt: Date
}
