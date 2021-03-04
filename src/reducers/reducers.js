const reducers = (state = {}, action) => {
    let newState = {};
    let index;
    let id = action.id;

    const unsplash = state.unsplash;
    const searchWord = state.photoSearchWord;

    switch(action.type) {
        case 'LIKE':
            // console.log('like');
            unsplash.photos.likePhoto(id);            

            newState = {...state};
            newState.photos.forEach((photo, idx) => {
                if (photo.id == id) index = idx;
            })
            
            newState.photos[index].liked_by_user = true;
            newState.photos[index].likes += 1;

            return newState;

        case 'UNLIKE':
            // console.log('unlike');
            unsplash.photos.unlikePhoto(id);

            newState = {...state};
            newState.photos.forEach((photo, idx) => {
                if (photo.id == id) index = idx;
            })
            
            newState.photos[index].liked_by_user = false;
            newState.photos[index].likes -= 1;

            return newState;
        
        case 'GET_MORE_PHOTOS':
            // console.log('more photos');
            newState = {...state};

            return {
                ...state,
                photos: state.photos.concat(action.photos),
            }
        
        case 'CHANGE_SEARCH_WORD':
            return {
                ...state,
                photoSearchWord: action.word
            }

        case 'SEARCH_NEW_PHOTOS':
            return {
                ...state,
                currentSearch: searchWord,
                photoSearchWord: '',
                photos: action.photos
            }

        default:
            return state
    }
}

export default reducers;