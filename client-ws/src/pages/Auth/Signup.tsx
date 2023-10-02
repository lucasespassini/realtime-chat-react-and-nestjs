import { Button, Flex, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { Colors } from "../../constants/Colors";
import { useAuthStore } from "../../stores/auth";
import { SelectIcon } from "./SelectIcon";

type FormData = {
  username: string;
  password: string;
};

export const Signup = () => {
  const toast = useToast();

  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({} as FormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        await signup(formData);
        setStep(1);
      } catch (error) {
        toast({
          title: "Ocorreu um erro.",
          description: error?.response?.data?.message,
          isClosable: true,
          status: "error",
          duration: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, signup, toast]
  );

  return step === 0 ? (
    <Flex as="form" w="400px" flexDir="column" my={5} gap={7} onSubmit={submit}>
      <FormInput
        label="Nome"
        value={formData.username || ""}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <FormInput
        type="password"
        label="Senha"
        value={formData.password || ""}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button
        mt={5}
        type="submit"
        fontWeight="700"
        bgColor={Colors.WHITE}
        isLoading={isSubmitting}
      >
        Cadastro
      </Button>
    </Flex>
  ) : (
    <SelectIcon />
  );
};
