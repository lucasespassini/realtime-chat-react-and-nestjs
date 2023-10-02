import { Button, Flex, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { ImageInput } from "../../components/Form/ImageInput";
import { Colors } from "../../constants/Colors";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

type FormDataState = {
  imageSrc: string;
  image: FileList;
};

export const SelectIcon = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({} as FormDataState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateIcon = useCallback(async () => {
    try {
      setIsSubmitting(true);

      if (!formData?.image) return;

      const form: FormData = new FormData();
      form.append("icon", formData.image[0]);

      await api.patch("/users/update-icon", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast({
        title: "Ocorreu ao salvar sua foto.",
        isClosable: true,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
      navigate("/");
    }
  }, [formData, navigate, toast]);

  return (
    <Flex alignItems="center" justifyContent="center" flexDir="column" gap={5}>
      <ImageInput
        image={formData.imageSrc || ""}
        onChange={(e) =>
          e.target?.files.length > 0 &&
          setFormData({
            image: e.target.files,
            imageSrc: URL.createObjectURL(e.target.files[0]),
          })
        }
      />

      <Button
        type="submit"
        size="sm"
        colorScheme="red"
        isDisabled={!formData.imageSrc}
        onClick={() => setFormData({} as FormDataState)}
      >
        Remover foto
      </Button>

      <Button
        type="submit"
        fontWeight="700"
        bgColor={Colors.WHITE}
        isLoading={isSubmitting}
        onClick={updateIcon}
      >
        Continuar
      </Button>
    </Flex>
  );
};
