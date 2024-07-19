export const getIconName = (name: string): string => {
    if (name === "like") {
        return 'like'
    } else if (name === "comment") {
        return 'message'
    } else if (name === "friendRequestReject") {
        return 'friend'
    } else {
        return 'notify-video'
    }
}

export const getColorName = (name: string): "primary" | "success" | "danger" | undefined => {
    if (name === "friendRequestReject") {
        return 'primary';
    } else if (name === "comment") {
        return 'success';
    } else {
        return 'danger';
    }
}