import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

const Button = ({
  children,
  className,
  text,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button className={`button ${className}`} {...props}>
      {text}
      {children}
    </button>
  );
};

export default Button;
