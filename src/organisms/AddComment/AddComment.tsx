import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "../../molecules/Textarea/Textarea";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Button } from "../../molecules/Button/Button";
import { AuthContext, User } from "../CommentSection/CommentSection";
import "./AddComment.scss";

type AddCommentProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onCreateComment: (
    content: string,
    currentUser: User,
    replyingTo?: string,
    parentKey?: number | undefined
  ) => void;
};

export function AddComment({
  value,
  setValue,
  onCreateComment,
}: AddCommentProps) {
  const user = useContext(AuthContext);

  function startCreation() {
    if (user !== null) {
      onCreateComment(value, user);
    }
  }

  if (user === null) {
    return <></>;
  }

  return (
    <div className="add-comment">
      <Avatar imgUrl={user.image.png} />
      <Textarea value={value} onChange={setValue} />
      <Button
        type="primary"
        text="Send"
        onClick={() => {
          startCreation();
        }}
      />
    </div>
  );
}
