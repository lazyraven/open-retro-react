import {
  CheckCircleIcon,
  InformationCircleIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function BaseAlert({ type, title, text, alertIcon }) {
  const alertTypes = {
    success: "SUCCESS",
    danger: "DANGER",
    warning: "WARNING",
    info: "INFO",
    bell: "BELL",
  };

  let classes = {
    bg: `bg-blue-50`,
    icon: `text-blue-500`,
    title: `text-blue-900`,
    text: `text-blue-800`,
  };

  switch (type) {
    case alertTypes.success:
      classes = {
        bg: `bg-emerald-50`,
        icon: `text-emerald-500`,
        title: `text-emerald-900`,
        text: `text-emerald-800`,
      };
      break;
    case alertTypes.danger:
      classes = {
        bg: `bg-red-50`,
        icon: `text-red-500`,
        title: `text-red-900`,
        text: `text-red-800`,
      };
      break;
    case alertTypes.warning:
      classes = {
        bg: `bg-yellow-50`,
        icon: `text-yellow-500`,
        title: `text-yellow-900`,
        text: `text-yellow-800`,
      };
      break;
    case alertTypes.bell:
      classes = {
        bg: `bg-purple-50`,
        icon: `text-purple-500`,
        title: `text-purple-900`,
        text: `text-purple-800`,
      };
      break;
    default:
      "";
  }

  const AlertIcon = (props) => {
    switch (type) {
      case alertTypes.success:
        return <CheckCircleIcon {...props} />;
      case alertTypes.warning:
        return <ExclamationTriangleIcon {...props} />;
      case alertTypes.bell:
        return <BellAlertIcon {...props} />;
      default:
        return <InformationCircleIcon {...props} />;
    }
  };

  return (
    <div className={"flex items-start gap-x-2 rounded-md p-3 " + classes.bg}>
      <div className="flex">
        {alertIcon || (
          <AlertIcon
            className={"h-6 w-6 " + classes.icon}
            aria-hidden="true"
          ></AlertIcon>
        )}
      </div>
      <div className={"flex flex-col gap-y-1 " + classes.text}>
        <h6 className={"font-semibold " + classes.title}>{title}</h6>
        <p className={classes.text}>{text}</p>
      </div>
    </div>
  );
}
