import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";

type FormInputProps = {
  label: string;
};

export const FormInput = ({
  label,
  type,
  ...rest
}: FormInputProps & InputProps) => {
  const [labelPosition, setLabelPosition] = useState<"bottom" | "top">(
    "bottom"
  );

  const handleInputFocus = useCallback(() => setLabelPosition("top"), []);

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) =>
      !e.target.value ? setLabelPosition("bottom") : setLabelPosition("top"),
    []
  );

  useEffect(() => handleInputFocus(), [handleInputFocus]);

  return (
    <FormControl>
      <FormLabel
        transition=".2s"
        position="absolute"
        style={
          labelPosition === "top"
            ? {
                top: -13,
                left: 0,
                opacity: 0.7,
                fontSize: ".85rem",
              }
            : {
                top: 9,
                left: 5,
                opacity: 0.9,
                fontSize: ".9rem",
              }
        }
      >
        {label}
      </FormLabel>
      <Input
        type={type}
        variant="flushed"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </FormControl>
  );
};
