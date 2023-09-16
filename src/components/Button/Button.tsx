import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  actionOnClick?: () => void;
}

const Button = ({
  children,
  actionOnClick,
  className,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button
      className={`button ${className}`}
      onClick={actionOnClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
