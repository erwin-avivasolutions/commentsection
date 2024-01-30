import { useContext, useState } from "react";
import {
  AuthContext,
  CommentData,
  Reply,
  User,
} from "../CommentSection/CommentSection";
import "./Comment.scss";
import { Vote } from "../../molecules/Vote/Vote";
import { CommentAction } from "../../molecules/CommentAction/CommentAction";
import { Icon } from "../../atoms/Icon/Icon";
import { AddComment } from "../AddComment/AddComment";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { Button } from "../../molecules/Button/Button";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Textarea } from "../../molecules/Textarea/Textarea";
import { CommentTopbar } from "../CommentTopbar/CommentTopbar";
import { CommentReplies } from "../CommentReplies/CommentReplies";
import { CommentBody } from "../CommentBody/CommentBody";

type CommentProps = {
  data: CommentData | Reply;
  onCountChange: (key: number | [], newCount: number) => void;
  onDelete: (key: number) => void;
  onUpdate: (comment: CommentData) => void;
  onReply: (
    content: string,
    currentUser: User,
    replyingTo?: string,
    parentKey?: number | undefined
  ) => void;
};

export function Comment({
  data,
  onCountChange,
  onDelete,
  onUpdate,
  onReply,
}: CommentProps) {
  const currentUser = useContext(AuthContext);
  var username = null;
  if (currentUser !== null) {
    username = currentUser.username;
  }

  const [openReply, setOpenReply] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editState, setEditState] = useState(false);
  const [commentText, setCommentText] = useState<string>(
    `@${data.user.username}`
  );

  function openModal() {
    setModalOpen(!isModalOpen);
  }

  function onOpenReply(id: number) {
    setOpenReply(!openReply);
  }

  function onEdit() {
    setEditState(true);
  }

  function onVotePress(newCount: number) {
    onCountChange(data.id, newCount);
  }

  function onUpdatePress(content: string) {
    var withoutName = content.split(" ").slice(1).join(" ");
    data.content = withoutName;

    onUpdate(data);
    setEditState(false);
  }

  function onReplyStart(content: string, currentUser: User) {
    var withoutName = content.split(" ").slice(1).join(" ");
    onReply(withoutName, currentUser, data.user.username, data.id);
    setCommentText(`@${data.user.username}`);
    setOpenReply(!openReply);
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={isModalOpen}
        id={data.id}
        openModal={openModal}
        onDelete={onDelete}
      />

      <div className="comment" key={data.id}>
        <Vote score={data.score} onVotePress={onVotePress} />

        <div className="comment__body">
          <CommentTopbar
            data={data}
            onEdit={onEdit}
            onOpenReply={onOpenReply}
            openModal={openModal}
          />
          <CommentBody
            onUpdatePress={onUpdatePress}
            editState={editState}
            data={data}
          />
        </div>
      </div>
      {openReply && (
        <AddComment
          onCreateComment={onReplyStart}
          value={commentText}
          setValue={setCommentText}
        />
      )}
      <CommentReplies
        onCountChange={onCountChange}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onReply={onReply}
        replies={data.replies}
      />
    </>
  );
}
