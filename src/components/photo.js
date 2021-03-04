import React from 'react';

const Photo = (props) => {
    let Link = props.Link,
        photo;

    const id = window.location.toString().split('photo/')[1];
    props.props.state.photos.forEach(elem => {
        if (elem.id == id) photo = elem;
    });

    if (!photo) window.location.href = '/';

    let className = photo.liked_by_user ? 'like-button liked' : 'like-button',
        createDate = photo.created_at.split('T')[0];

    return (
        <div>
            <div className='card full-img'>
                <div className='card-image'>
                    <img src = {photo.urls.full} alt= {photo.alt_description}/>
                    <span className='card-title'></span>
                </div>

                <div className="card-content">
                    <p>{photo.alt_description}</p>
                    
                    <time className='card-date'>photo was created: {createDate}</time>
                </div>

                <div className="card-action">
                    <a 
                    href={photo.user.links.html} 
                    target='_blank'
                    className='card-name'
                    >
                    {photo.user.name}
                    </a>

                    <div className='card-likes'>
                        <button 
                        className={className}
                        onClick = {ev => {
                            if (ev.target.classList.contains('liked')) props.props.unlikeFunc(photo.id);
                            else props.props.likeFunc(photo.id);
                        }}
                        />

                        <span>{photo.likes}</span>
                    </div>
                </div>
            </div>
            
            <div>
                <Link to='/'>
                    Вернуться к просмотру галлереи
                </Link>
            </div>
        </div>
    );
}

export default Photo;