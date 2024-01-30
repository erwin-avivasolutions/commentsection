import { useEffect, useState, createContext } from "react";
import { AddComment } from "../AddComment/AddComment";
import { LoadingComment } from "../../molecules/LoadingComment/LoadingComment";
import { Comment } from "../Comment/Comment";
import "./CommentSection.scss";

export const AuthContext = createContext<User | null>(null);

export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replies: Reply[];
  user: User;
};

export type Reply = Exclude<CommentData, "replies"> & {
  replyingTo: string;
};

export function CommentSection({}) {
  //todo get comments first
  useEffect(() => {
    fetchCommentData();
  }, []);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function fetchCommentData() {
    try {
      const response = await fetch("http://localhost:443/get-comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = `An error has occurred loading comments: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      var sortedComments = data.comments.sort(
        (a: CommentData, b: CommentData) => {
          return a.score > b.score ? -1 : 1;
        }
      );
      setComments([...sortedComments]);
      setCurrentUser(data.currentUser);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
    }
  }

  function deleteComment(key: number) {
    var newComments = comments.filter((comment) => {
      if (comment.id === key) {
        return false;
      }

      if (comment.replies !== null && comment.replies.length > 0) {
        comment.replies = comment.replies.filter((reply) => reply.id !== key);
      }

      return true;
    });

    setComments([...newComments]);
  }

  function createComment(
    content: string,
    currentUser: User,
    replyingTo?: string,
    parentKey?: number
  ) {
    if (parentKey) {
      const newComment = {
        id: new Date().getTime(),
        content: content,
        createdAt: new Date(Date.now()).toLocaleString().split(",")[0],
        score: 0,
        user: currentUser,
        replyingTo: replyingTo,
      };
      var newComments = comments.map((comment) => {
        if (comment.id === parentKey) {
          comment.replies.push(newComment as Reply);
        } else if (comment.replies.length > 0) {
          comment.replies.map((reply) => {
            if (reply.id === parentKey) {
              comment.replies.push(newComment as Reply);
            }
          });
        }

        return comment;
      });

      setComments([...newComments]);
    } else {
      const newComment = {
        id: new Date().getTime(),
        content: content,
        createdAt: new Date(Date.now()).toLocaleString().split(",")[0],
        score: 0,
        user: currentUser,
        replies: [],
      };

      setComments([...comments, newComment]);
      setCommentText("");
    }
  }

  function updateCount(key: number | [], newCount: number) {
    var newComments = comments.map((comment) => {
      if (comment.id === key) {
        comment.score = newCount;
      } else if (comment.replies !== null && comment.replies.length > 0) {
        comment.replies.forEach((reply) => {
          if (reply.id === key) {
            reply.score = newCount;
          }
        });
      }

      return comment;
    });

    newComments = newComments.sort((a, b) => {
      return a.score > b.score ? -1 : 1;
    });

    setComments([...newComments]);
  }

  function updateComment(comment: CommentData) {
    const updated = comments.map((item) => {
      if (item.id === comment.id) {
        item.content = comment.content;
      } else if (item.replies.length > 0) {
        item.replies.map((reply) => {
          if (reply.id === comment.id) {
            reply.content = comment.content;
          }

          return reply;
        });
      }

      return item;
    });

    setComments([...updated]);
  }

  return (
    <>
      {loading ? (
        <>
          <LoadingComment />
          <LoadingComment />
          <LoadingComment />
        </>
      ) : (
        <AuthContext.Provider value={currentUser}>
          {comments.map((comment: CommentData) => {
            return (
              <Comment
                data={comment}
                onCountChange={updateCount}
                key={comment.id}
                onDelete={deleteComment}
                onUpdate={updateComment}
                onReply={createComment}
              />
            );
          })}
          <AddComment
            onCreateComment={createComment}
            value={commentText}
            setValue={setCommentText}
          />
        </AuthContext.Provider>
      )}
    </>
  );
}
