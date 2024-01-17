import React from 'react';
import './Avatar.scss';

type AvatarProps = {
    imgUrl: string,
}

export function Avatar({imgUrl}: AvatarProps) {
    return (
        <div className='avatar'>
            <img src={imgUrl} />
        </div>
    )
}