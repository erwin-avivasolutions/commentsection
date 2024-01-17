import React, { ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';

import './Vote.scss';

type VoteProps = {
    children: ReactNode
}

export function Vote({children}: VoteProps) {
    return (
        <div className='vote'>
            {children}
        </div>
    )
}