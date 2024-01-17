import React from 'react';
import './Icon.scss';
import { ReactComponent as IconDelete } from '../../assets/images/icon-delete.svg'; 
import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg'; 
import { ReactComponent as IconMinus } from '../../assets/images/icon-minus.svg'; 
import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg'; 
import { ReactComponent as IconReply } from '../../assets/images/icon-reply.svg'; 

type IconProps = {
    type: "IconDelete" | "IconEdit" | "IconMinus" | "IconPlus" | "IconReply"
}

export function Icon({type}: IconProps) {
    const Icons: Record<IconProps['type'], any> = {
        IconDelete: <IconDelete className='icon'/>,
        IconEdit: <IconEdit className='icon'/>,
        IconMinus: <IconMinus className='icon'/>,
        IconPlus: <IconPlus className='icon'/>,
        IconReply: <IconReply className='icon'/>
    }

    return Icons[type];
}