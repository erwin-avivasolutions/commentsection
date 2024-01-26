import { useState } from "react";
import { CommentData, Reply, User } from "../CommentSection/CommentSection";
import "./Comment.scss";
import { Vote } from "../../molecules/Vote/Vote";
import { CommentAction } from "../../molecules/CommentAction/CommentAction";
import { Icon } from "../../atoms/Icon/Icon";
import { AddComment } from "../AddComment/AddComment";
import { Modal } from "../Modal/Modal";
import { Button } from "../../molecules/Button/Button";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Textarea } from "../../molecules/Textarea/Textarea";

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
  let username = null;
  const LS = localStorage.getItem("currentUser");
  if (LS !== null) {
    username = JSON.parse(LS).username;
  }

  const [openReply, setOpenReply] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState(
    `${
      (data as Reply).replyingTo !== undefined &&
      "@" + (data as Reply).replyingTo
    } ${data.content}`
  );
  const [showReplies, setShowReplies] = useState(false);
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

  function onUpdatePress() {
    let withoutName = content.split(" ").slice(1).join(" ");
    data.content = withoutName;

    onUpdate(data);
    setEditState(false);
  }

  function onReplyStart(content: string, currentUser: User) {
    console.log("test");
    let withoutName = content.split(" ").slice(1).join(" ");
    onReply(withoutName, currentUser, data.user.username, data.id);
    setCommentText(`@${data.user.username}`);
    setOpenReply(!openReply);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} openModal={openModal}>
        <h3>Delete comment?</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
        <div className="modal__buttons">
          <Button
            type="tertiary"
            text="No, cancel"
            onPress={() => {
              openModal();
            }}
          />
          <Button
            type="secondary"
            text="Yes, delete"
            onPress={() => {
              onDelete(data.id);
            }}
          />
        </div>
      </Modal>
      <div className="comment" key={data.id}>
        <div className="comment__vote">
          <Vote score={data.score} onVotePress={onVotePress} />
        </div>

        <div className="comment__body">
          <div className="comment__body--topbar">
            <Avatar imgUrl={data.user.image.png} />
            <span className="comment__body--username">
              {data.user.username}
            </span>
            <span className="comment__body--time">{data.createdAt}</span>
            {username !== null && username === data.user.username ? (
              <div className="comment__body--actions">
                <CommentAction
                  text="Delete"
                  type="delete"
                  icon={<Icon type="IconDelete" />}
                  id={data.id}
                  onPress={() => openModal()}
                />
                <CommentAction
                  text="Edit"
                  type="edit"
                  icon={<Icon type="IconEdit" />}
                  id={data.id}
                  onPress={() => onEdit()}
                />
              </div>
            ) : (
              <CommentAction
                text="Reply"
                type="reply"
                icon={<Icon type="IconReply" />}
                id={data.id}
                onPress={() => onOpenReply(data.id)}
              />
            )}
          </div>
          <div className="comment__body--text">
            {editState === true ? (
              <>
                <Textarea value={content} setValue={setContent} />
                <Button
                  type="primary"
                  text="Update"
                  onPress={() => {
                    onUpdatePress();
                  }}
                />
              </>
            ) : (
              <div>
                {(data as Reply).replyingTo !== undefined && (
                  <span className="comment__body--reply">
                    @{(data as Reply).replyingTo}{" "}
                  </span>
                )}
                {data.content}
              </div>
            )}
          </div>
        </div>
      </div>
      {openReply && (
        <AddComment
          onCreateComment={onReplyStart}
          value={commentText}
          setValue={setCommentText}
        />
      )}
      {data.replies !== null &&
        data.replies !== undefined &&
        data.replies.length > 0 && (
          <>
            {showReplies === true && (
              <div className="replies">
                <div className="separator"></div>
                <div className="comments">
                  {data.replies.map((reply: CommentData) => {
                    return (
                      <Comment
                        data={reply as Reply}
                        key={reply.id}
                        onCountChange={onCountChange}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onReply={onReply}
                      />
                    );
                  })}
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
        )}
    </>
  );
}
