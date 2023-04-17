import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import {
  Home,
  LocationOn,
  PersonAddAlt1,
  PersonOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import { Information, ChangePassword, Settings, HomeComp } from "./DynamicData";

export const Profile = ({ nonteachingstaffId }: any) => {
  const token = localStorage.getItem("token");
  const id = nonteachingstaffId;
  //   const id = localStorage.getItem("nonteachingstaffId");

  const [nonteachingstaff, setNonteachingstaff] = useState<any>({});

  useEffect(() => {
    const getNonteachingstaff = async () => {
      try {
        const res = await myAPIClient.get(`/nonteachingstaff/${id}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setNonteachingstaff(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getNonteachingstaff();
  }, []);

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        h={70}
        p={5}
        my={3}
      >
        <Box display={"flex"}>
          <Heading as={"h5"} color={primaryColor.color}>
            Member Profile
          </Heading>
          <Text>SMS</Text>
        </Box>
        <Box display={"flex"} alignItems="center" gap={2}>
          <Home />
          <Link to="/">
            <Text fontWeight="bold" fontSize={14}>
              Home
            </Text>
          </Link>
          <FaAngleRight />
          <PersonOutline />
          <Text fontWeight="bold" fontSize={14}>
            Member
          </Text>
          <FaAngleRight />
          <PersonAddAlt1 />
          <Text fontWeight="bold" fontSize={14}>
            {nonteachingstaff.lastname}'s Profile
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={2}
            flexDirection={"column"}
            height="max-content"
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #2e5984"
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Image
                      width={40}
                      borderRadius="50%"
                      objectFit="cover"
                      height={40}
                      src={`${nonteachingstaff?.profileimage}`}
                    />
                    <Box>
                      <Text
                        p={2}
                        textAlign="center"
                        fontSize={15}
                        fontWeight="bold"
                      >
                        {`${nonteachingstaff?.firstname} ${nonteachingstaff.lastname}`}
                      </Text>
                      <Text pb={2} textAlign="center" fontSize={17}>
                        Non Teaching Staff
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text>Email </Text>
                    <Text fontSize={13} color={"#2e5984"}>
                      {" "}
                      {nonteachingstaff?.email}
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text>Contact </Text>
                    <Text fontSize={13} color={"#2e5984"}>
                      {" "}
                      {nonteachingstaff?.contact}
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text>DOB </Text>
                    <Text fontSize={13} color={"#2e5984"}>
                      {nonteachingstaff?.dateofbirth}
                    </Text>
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="100%"
                    colorScheme={primaryColor.name}
                  >
                    Suspend {nonteachingstaff?.lastname}
                  </Button>
                </Box>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            h={"max-content"}
            gap={4}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              pb={0}
              borderTop="3px solid #2e5984"
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="flex-start"
                gap="2"
                justifyContent="flex-start"
                flexDirection="row"
                pb={3}
              >
                <Tabs variant="unstyled">
                  <TabList>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Home
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Information
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Change Password
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Settings
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HomeComp />
                    </TabPanel>
                    <TabPanel>
                      <Box px={4} overflowX={"auto"}>
                        <Information nonteachingstaff={nonteachingstaff} />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <ChangePassword nonteachingstaff={nonteachingstaff} />
                    </TabPanel>
                    <TabPanel>
                      <Settings nonteachingstaff={nonteachingstaff} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Box>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #2e5984"
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box>
                    <Box>
                      <Text p={2} fontSize={22} fontWeight="bold">
                        About {nonteachingstaff.lastname}
                      </Text>
                      <Text p={2} fontSize={19} fontWeight="bold">
                        Education
                      </Text>
                    </Box>
                  </Box>

                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={17} fontWeight="bold">
                      Department
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
                      Rank
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
                      Year
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={14}> {nonteachingstaff.department} </Text>
                    <Text fontSize={14}> {nonteachingstaff.rank} </Text>
                    <Text fontSize={14}> {new Date().getFullYear()} </Text>
                  </Flex>

                  <Box
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Flex flexDirection="row" alignItems={"center"} gap={2}>
                      <LocationOn />
                      <Text fontSize={18} fontWeight="bold">
                        Location
                      </Text>
                    </Flex>
                    <Text fontSize={14} color="gray">
                      {nonteachingstaff.address}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
