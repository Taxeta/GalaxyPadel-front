import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

const Button = ({
  children,
  className,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
