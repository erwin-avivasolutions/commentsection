import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";
import "./Icon.scss";

type IconProps = {
  type: "IconDelete" | "IconEdit" | "IconMinus" | "IconPlus" | "IconReply";
};

const Icons = {
  IconDelete,
  IconEdit,
  IconMinus,
  IconPlus,
  IconReply,
};

export function Icon({ type }: IconProps) {
  const IconComponent = Icons[type];
  return <IconComponent />;
}
