import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export const AuthPage = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" gap={5}>
      <Tabs isFitted variant="enclosed">
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
          <TabPanel>
            <Signin />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
