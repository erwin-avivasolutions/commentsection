import React from 'react';
import './Label.scss';

type LabelProps = {
    text: string
}

export function Label({text}: LabelProps) {
    return (
        <span className='label'>
            {text}
        </span>
    )
}