import React from 'react';
import { toJson } from 'unsplash-js';

import CardItem from '../components/card.js';

const Gallery = (props) => {
    let {state, likeFunc, unlikeFunc} = props.props;

    let photos = state.photos,
        unsplash = state.unsplash,
        Link = props.Link;

    if (photos == undefined) {
        photos = []
    }

    return (
        <div>
            <div className='row'>
                <ul className = 'col s12 m12 cards-list'>
                    {
                        photos.map(photo => {
                            let className = photo.liked_by_user ? 'like-button liked' : 'like-button',
                                createDate = photo.created_at.split('T')[0];
                            
                            return (
                                <CardItem
                                key = {photo.id}
                                img = {photo.urls.regular}
                                author_name = {photo.user.name}
                                author_url = {photo.user.links.html}
                                likes_amount = {photo.likes}
                                imgId = {photo.id}
                                likeFunc = {likeFunc}
                                unlikeFunc = {unlikeFunc}
                                className = {className}
                                description = {photo.alt_description}
                                createDate = {createDate}
                                Link = {Link}
                                />
                            )
                        })
                    }
                </ul>
            </div>

            <a 
            className='waves-effect waves-light btn'
            onClick = {(ev) => {
                unsplash.photos.getRandomPhoto({ 
                    query: state.currentSearch,
                    count: 2,
                    height: 400 
                  }).then(toJson)
                    .then(newPhotos => {
                        props.props.morePhotos(newPhotos);
                    })
                    .catch(err => {
                        console.log('Ошибка при запросе');
                        console.log(err);
    
                        props.props.morePhotos([]);
                    })
                
                
            }}
            >
            Больше фотографий
            </a>
        </div>
    )
}

export default Gallery;