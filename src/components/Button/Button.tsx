import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  children,
  ...props
}: Partial<ButtonProps>): React.ReactElement => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
