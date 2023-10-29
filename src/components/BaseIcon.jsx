import icons from "../helpers/icons";
export default function BaseIcon(props) {
  return (
    <i className={`${props.className || "flex h-6 w-6"}`}>
      {icons[props.iconName]}
    </i>
    // <i>{icons[props.iconName]}</i>
  );
}
