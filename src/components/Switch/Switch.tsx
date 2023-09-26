import * as React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps: {
    "aria-label"?: string;
  };
}

const Switch = ({
  checked,
  onChange,
  inputProps,
}: SwitchProps): React.ReactElement => {
  return (
    <Switch checked={checked} onChange={onChange} inputProps={inputProps} />
  );
};

export default Switch;
