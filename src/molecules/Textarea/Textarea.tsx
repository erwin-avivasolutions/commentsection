import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import './Textarea.scss';

type TextareaProps = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
}

export function Textarea({ value, setValue }: TextareaProps) {
    return (
        <textarea className='textarea' value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setValue(e.target.value)}}>
        </textarea>
    )
}