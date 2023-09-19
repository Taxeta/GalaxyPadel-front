import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  actionOnClick?: () => void;
  text?: string;
}

const Button = ({
  children,
  actionOnClick,
  className,
  text,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button
      className={`button ${className}`}
      onClick={actionOnClick}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
