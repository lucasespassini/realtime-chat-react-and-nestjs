import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

export const AuthPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { signin, signup } = useAuthStore();

  const [formData, setFormData] = useState({} as FormData);

  const Cadastro = useCallback(async () => {
    try {
      await signup(formData.username, formData.password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Ocorreu um erro.",
        description: error.response.data.message,
        isClosable: true,
        status: "error",
        duration: 3000,
      });
    }
  }, [formData.password, formData.username, navigate, signup, toast]);

  const Entrar = useCallback(async () => {
    try {
      await signin(formData.username, formData.password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Ocorreu um erro.",
        description: error.response.data.message,
        isClosable: true,
        status: "error",
        duration: 3000,
      });
    }
  }, [formData.password, formData.username, navigate, signin, toast]);

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" gap={5}>
      <Tabs
        isFitted
        variant="enclosed"
        onChange={() => setFormData({} as FormData)}
      >
        <TabList>
          <Tab>Login</Tab>
          <Tab>Cadastro</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card w="400px">
              <CardHeader>
                <Heading size="md">Entrar</Heading>
              </CardHeader>

              <CardBody>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={formData.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    value={formData.password || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </FormControl>
              </CardBody>

              <CardFooter>
                <Button colorScheme="whatsapp" onClick={Entrar}>
                  Entrar
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card w="400px">
              <CardHeader>
                <Heading size="md">Cadastro</Heading>
              </CardHeader>

              <CardBody>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={formData.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    value={formData.password || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </FormControl>
              </CardBody>

              <CardFooter>
                <Button colorScheme="whatsapp" onClick={Cadastro}>
                  Cadastrar
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
