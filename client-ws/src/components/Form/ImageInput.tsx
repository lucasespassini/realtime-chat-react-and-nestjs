import { Avatar, Box, Input, InputProps } from "@chakra-ui/react";

type ImageInputProps = { image: string };

export const ImageInput = ({
  image,
  ...rest
}: ImageInputProps & InputProps) => {
  return (
    <>
      <Box as="label" htmlFor="icon" borderRadius="50%" cursor="pointer">
        <Avatar size="xl" src={image} bgColor="#A0AEC0" />
      </Box>

      <Input type="file" id="icon" display="none" accept="image/*" {...rest} />
    </>
  );
};
