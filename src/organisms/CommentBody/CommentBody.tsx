import { useState } from "react";
import { Button } from "../../molecules/Button/Button";
import { Textarea } from "../../molecules/Textarea/Textarea";
import { CommentData, Reply } from "../CommentSection/CommentSection";
import "./CommentBody.scss";

type CommentBodyProps = {
  editState: boolean;
  data: CommentData;
  onUpdatePress: (content: string) => void;
};
export function CommentBody({
  editState,
  data,
  onUpdatePress,
}: CommentBodyProps) {
  const [content, setContent] = useState(
    `${
      (data as Reply).replyingTo !== undefined &&
      "@" + (data as Reply).replyingTo
    } ${data.content}`
  );
  return (
    <div className="body_text">
      {editState === true ? (
        <>
          <Textarea value={content} onChange={setContent} />
          <Button
            type="primary"
            text="Update"
            onClick={() => onUpdatePress(content)}
          />
        </>
      ) : (
        <div>
          {(data as Reply).replyingTo !== undefined && (
            <span className="body_reply">@{(data as Reply).replyingTo} </span>
          )}
          {data.content}
        </div>
      )}
    </div>
  );
}
