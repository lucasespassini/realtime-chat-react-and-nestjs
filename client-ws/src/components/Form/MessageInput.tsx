import { Input, InputProps } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors";

export const MessageInput = ({ ...rest }: InputProps) => {
  return (
    <Input
      borderRadius={999}
      bgColor={Colors.SECONDARY}
      borderColor={Colors.BORDER_COLOR}
      _hover={{}}
      _focusVisible={{}}
      {...rest}
    />
  );
};
