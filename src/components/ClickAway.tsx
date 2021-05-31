import React, { useEffect, useRef } from "react";

export default function ClickAway(props: {
  children: React.ReactNode;
  callback: Function;
}) {
  const { callback, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickAwayHandler = (event: any) => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        //unsubcribe event
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
    clickAwayHandler(ref);
  });

  return (
    <div className="display-none" ref={ref}>
      {" "}
      {children}{" "}
    </div>
  );
}
