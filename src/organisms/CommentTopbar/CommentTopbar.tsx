import { useContext } from "react";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Icon } from "../../atoms/Icon/Icon";
import { CommentAction } from "../../molecules/CommentAction/CommentAction";
import { AuthContext, CommentData } from "../CommentSection/CommentSection";
import "./CommentTopbar.scss";

type CommentTopbarProps = {
  data: CommentData;
  onEdit: () => void;
  onOpenReply: (id: number) => void;
  openModal: () => void;
};

export function CommentTopbar({
  data,
  onEdit,
  onOpenReply,
  openModal,
}: CommentTopbarProps) {
  const currentUser = useContext(AuthContext);

  return (
    <div className="topbar">
      <Avatar imgUrl={data.user.image.png} />
      <span className="topbar__username">{data.user.username}</span>
      <span className="topbar__time">{data.createdAt}</span>
      {currentUser !== null && currentUser.username === data.user.username ? (
        <div className="topbar__actions">
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
  );
}
