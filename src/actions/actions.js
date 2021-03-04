export const likeFunc_act = (id) => {
    return {
        type: 'LIKE',
        id: id
    }
}

export const unlikeFunc_act = (id) => {
    return {
        type: 'UNLIKE',
        id: id
    }
}

export const morePhotos_act = (photos) => {
    return {
        type: 'GET_MORE_PHOTOS',
        photos: photos
    }
}

export const changeSearch_act = (word) => {
    return {
        type: 'CHANGE_SEARCH_WORD',
        word: word
    }
}

export const searchPhotos_act = (photos) => {
    return {
        type: 'SEARCH_NEW_PHOTOS',
        photos: photos
    }
}