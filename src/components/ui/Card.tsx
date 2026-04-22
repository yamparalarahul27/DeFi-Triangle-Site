import { forwardRef, type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...rest }, ref) => {
    const base =
      "bg-white border border-[rgba(17,17,19,0.08)] rounded-sm raised-frosted";
    const composed = `${base} ${className}`.trim();
    return <div ref={ref} className={composed} {...rest} />;
  }
);

Card.displayName = "Card";

export { Card };
