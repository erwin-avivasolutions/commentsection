import "./LoadingComment.scss";

export function LoadingComment({}) {
  return (
    <div className="loading-comment comment">
      <div className="loading-comment__vote"></div>

      <div className="loading-comment__body">
        <div className="loading-comment__body--topbar"></div>
        <div className="loading-comment__body--text"></div>
      </div>
    </div>
  );
}
