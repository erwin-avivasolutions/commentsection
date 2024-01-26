import { Icon } from "../../atoms/Icon/Icon";

import "./Vote.scss";

type VoteProps = {
  score: number;
  onVotePress: (score: number) => void;
};

export function Vote({ score, onVotePress }: VoteProps) {
  return (
    <div className="vote">
      <button onClick={() => onVotePress(score + 1)}>
        <Icon type="IconPlus" />
      </button>
      <span className="vote__counter">{score}</span>
      <button onClick={() => onVotePress(score > 0 ? score - 1 : 0)}>
        <Icon type="IconMinus" />
      </button>
    </div>
  );
}
