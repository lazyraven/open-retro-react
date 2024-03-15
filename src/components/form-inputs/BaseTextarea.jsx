import { useRef, useEffect } from "react";

export default function BaseTextarea(props) {
  const { value, ...restProps } = props;
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = "0px";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textareaRef, value]);

  return <textarea ref={textareaRef} value={value} {...restProps} />;
}
