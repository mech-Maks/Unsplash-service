import React from 'react';

const CardItem = (props) => {
    // console.log(props);
    let description = ';'
    if (props.description == '') description = 'This picture doesn\'t have description';
    else description = props.description;
    let Link = props.Link,
        photoUrl = "/photo/"+props.imgId;
    return (
        <li className='card'>
            <Link to={photoUrl}>
                <div className='card-image'>
                    <img src = {props.img} alt= {description}/>
                    <span className='card-title'></span>
                </div>
            </Link>

            <div className="card-content">
                <p>{description}</p>
                
                <time className='card-date'>photo was created: {props.createDate}</time>
            </div>

            <div className="card-action">
                <a 
                href={props.author_url} 
                target='_blank'
                className='card-name'
                >
                {props.author_name}
                </a>

                <div className='card-likes'>
                    <button 
                    className={props.className}
                    onClick = {ev => {
                        if (ev.target.classList.contains('liked')) props.unlikeFunc(props.imgId);
                        else props.likeFunc(props.imgId);
                    }}
                    />

                    <span>{props.likes_amount}</span>
                </div>
            </div>
        </li>
    )
}

export default CardItem;