import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import { FormInput } from "../components/Form/FormInput";

type FormData = {
  username: string;
  password: string;
};

export const AuthPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { signin, signup } = useAuthStore();

  const [formData, setFormData] = useState({} as FormData);
  const [isSignup, setIsSignup] = useState(false);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        isSignup ? await signup(formData) : await signin(formData);

        navigate("/");
      } catch (error) {
        toast({
          title: "Ocorreu um erro.",
          description: error?.response?.data?.message,
          isClosable: true,
          status: "error",
          duration: 3000,
        });
      }
    },
    [isSignup, signup, formData, signin, navigate, toast]
  );

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" gap={5}>
      <Tabs
        isFitted
        variant="enclosed"
        onChange={(i) => {
          setIsSignup(!!i);
          setFormData({} as FormData);
        }}
      >
        <TabList>
          <Tab
            _selected={{
              color: "#94a3b8",
              borderColor: "#94a3b8",
              borderBottomColor: "#fff",
            }}
          >
            Login
          </Tab>
          <Tab
            _selected={{
              color: "#94a3b8",
              borderColor: "#94a3b8",
              borderBottomColor: "#fff",
            }}
          >
            Cadastro
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            as="form"
            w="400px"
            my={5}
            display="flex"
            flexDir="column"
            gap={7}
            onSubmit={submit}
          >
            <FormInput
              label="Nome"
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <FormInput
              type="password"
              label="Senha"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button mt={5} type="submit" colorScheme="whiteAlpha">
              Entrar
            </Button>
          </TabPanel>

          <TabPanel
            as="form"
            w="400px"
            my={5}
            display="flex"
            flexDir="column"
            gap={7}
            onSubmit={submit}
          >
            <FormInput
              label="Nome"
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <FormInput
              type="password"
              label="Senha"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button mt={5} type="submit" colorScheme="whiteAlpha">
              Cadastro
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
