import React from 'react';
import './Button.scss';

type ButtonProps = {
    text: string,
    type: "primary" | "secondary" | "tertiary",
    onPress: () => void
}

export function Button({text, type, onPress}: ButtonProps) {
    return (
        <button className={`button ${type}`} onClick={() => {onPress()}}>
            {text}
        </button>
    )
}