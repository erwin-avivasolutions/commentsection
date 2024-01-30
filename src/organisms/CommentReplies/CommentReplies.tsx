import { useState } from "react";
import { CommentData, Reply, User } from "../CommentSection/CommentSection";
import { Comment } from "../Comment/Comment";
import "./CommentReplies.scss";

type CommentRepliesProps = {
  replies: Reply[];
  onCountChange: (key: number | [], newCount: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (comment: CommentData) => void;
  onReply: (
    content: string,
    currentUser: User,
    replyingTo?: string,
    parentKey?: number | undefined
  ) => void;
};

export function CommentReplies({
  replies,
  onCountChange,
  onDelete,
  onUpdate,
  onReply,
}: CommentRepliesProps) {
  const [showReplies, setShowReplies] = useState(false);

  if (replies === undefined || replies.length === 0) {
    return <></>;
  }

  return (
    <>
      {showReplies === true && (
        <div className="replies">
          <div className="separator"></div>
          <div className="comments">
            {replies.map((reply: Reply) => (
              <Comment
                data={reply as Reply}
                key={reply.id}
                onCountChange={onCountChange}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onReply={onReply}
              />
            ))}
          </div>
        </div>
      )}
      <div className="open-replies">
        <hr />
        <span
          className="open-replies__text"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies === true ? "Hide replies" : "Show replies"}
        </span>
      </div>
    </>
  );
}
