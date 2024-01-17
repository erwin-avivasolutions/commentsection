import React, { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../../molecules/Button/Button';

import './Modal.scss';

type ModalProps = {
    isOpen: boolean,
    children: ReactNode,
    openModal: () => void,
}

export function Modal({ isOpen, children, openModal }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if(dialogRef.current?.open && !isOpen) {
            dialogRef.current?.close();
        }
        else if (!dialogRef.current?.open && isOpen) {
            dialogRef.current?.showModal();
        }
    });

    return (
        <dialog className={`modal`} ref={dialogRef} onCancel={openModal}>
            {children}
        </dialog>
    )
}