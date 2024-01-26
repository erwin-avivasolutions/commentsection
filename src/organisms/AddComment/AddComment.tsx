import React, { useEffect, useState } from "react";
import { Textarea } from "../../molecules/Textarea/Textarea";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Button } from "../../molecules/Button/Button";
import { User } from "../CommentSection/CommentSection";
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
  parentKey?: number;
  replyingTo?: string;
};

export function AddComment({
  value,
  setValue,
  onCreateComment,
  parentKey,
  replyingTo,
}: AddCommentProps) {
  useEffect(() => fetchUserData(), []);
  const [user, setUser] = useState<User | null>(null);

  function fetchUserData() {
    const data = localStorage.getItem("currentUser");

    if (data !== null) {
      setUser(JSON.parse(data));
    }
  }

  if (user === null) {
    return <></>;
  }

  function startCreation() {
    if (user !== null) {
      onCreateComment(value, user);
    }
  }

  return (
    <div className="add-comment">
      <Avatar imgUrl={user.image.png} />
      <Textarea value={value} setValue={setValue} />
      <Button
        type="primary"
        text="Send"
        onPress={() => {
          startCreation();
        }}
      />
    </div>
  );
}
