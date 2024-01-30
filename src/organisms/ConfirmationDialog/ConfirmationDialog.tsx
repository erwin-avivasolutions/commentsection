import { ReactNode, useEffect, useRef } from "react";
import { Button } from "../../molecules/Button/Button";
import "./ConfirmationDialog.scss";

type ConfirmationDialogProps = {
  isOpen: boolean;
  id: number;
  openModal: () => void;
  onDelete: (id: number) => void;
};

export function ConfirmationDialog({
  isOpen,
  id,
  openModal,
  onDelete,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current?.open && !isOpen) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className={`${isOpen ? "modal" : ""} `}
      ref={dialogRef}
      onCancel={openModal}
    >
      <h3>Delete comment?</h3>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone
      </p>
      <div className="modal__buttons">
        <Button
          type="tertiary"
          text="No, cancel"
          onClick={() => {
            openModal();
          }}
        />
        <Button
          type="secondary"
          text="Yes, delete"
          onClick={() => {
            openModal();
            onDelete(id);
          }}
        />
      </div>
    </dialog>
  );
}
