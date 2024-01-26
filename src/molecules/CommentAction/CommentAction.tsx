import "./CommentAction.scss";

type CommentActionProps = {
  text: string;
  type: "edit" | "delete" | "reply";
  icon: JSX.Element;
  id: number;
  onPress: (id: number) => void;
};

export function CommentAction({
  text,
  type,
  icon,
  id,
  onPress,
}: CommentActionProps) {
  return (
    <button className={`comment-action ${type}`} onClick={() => onPress(id)}>
      {icon}
      <span>{text}</span>
    </button>
  );
}
