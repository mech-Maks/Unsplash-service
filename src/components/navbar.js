import React from 'react';
import { toJson } from 'unsplash-js';

const Navbar = (props) => {
    let state = props.props.state;

    return (
        <nav>
            <div className='nav-wrapper container navbar'>
                <a href='#' className='brand-logo'><i>Unsplash Service</i></a>

                <ul className=''>
                    <li className='header-item search-field'>
                        <input
                            type='search'
                            className='search'
                            placeholder='search photos'
                            onKeyUp={ev => props.props.changeSearch(ev.target.value)}
                        />

                        <button
                            className='search-button'
                            onClick={async (ev) => {
                                if (window.location.toString().split('/photo')[1]) {
                                    alert('Перед поиском вернитесь в галлерею');
                                } else if (state.photos.length > 0 && state.photoSearchWord != '') {
                                    ev.target.previousSibling.value = '';

                                    state.unsplash.photos.getRandomPhoto({
                                        query: state.photoSearchWord,
                                        count: state.photos.length,
                                        height: 400
                                    }).then(toJson)
                                        .then(photos => {
                                            if (photos.length === state.photos.length) {
                                                props.props.searchPhotos(photos);
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            alert('По вашему запросу ничего не найдено');
                                        })
                                }
                            }}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;