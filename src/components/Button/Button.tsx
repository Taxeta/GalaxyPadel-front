import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({
  children,
  className,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button className={`Button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
