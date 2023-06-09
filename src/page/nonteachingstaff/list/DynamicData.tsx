import {
  Box,
  Flex,
  InputLeftElement,
  Input,
  FormLabel,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import {
  LocationCity,
  LockOpen,
  PersonOutlineOutlined,
  Phone,
} from "@mui/icons-material";
import { BiEnvelope } from "react-icons/bi";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import { useState } from "react";
export const HomeComp = () => {
  return <Box>Home</Box>;
};

export const Information = ({ nonteachingstaff }: any) => {
  return (
    <Flex
      boxShadow={{ base: "none", md: "md" }}
      w="100%"
      p={10}
      direction={"column"}
      gap={2}
      h={400}
      overflowY="auto"
    >
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          NAME
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.firstname} {nonteachingstaff.lastname}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          ADDRESS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.address}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          DEPARTMENT
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.department}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          GENDER
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.gender}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          MARITAL STATUS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.maritalstatus
            ? nonteachingstaff.maritalstatus
            : "N/A"}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          RANK
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.rank ? nonteachingstaff.rank : "N/A"}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          CONTACT
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {nonteachingstaff.contact ? nonteachingstaff.contact : "N/A"}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          LAST LOGIN
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>N/A</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          IP ADDRESS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>N/A</Box>
      </Flex>
    </Flex>
  );
};

export const ChangePassword = ({ nonteachingstaff }: any) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("nonteachingstaffId");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const updatePassword = async () => {
    if (
      oldPassword === nonteachingstaff.password &&
      confirmNewPassword === newPassword
    ) {
      const passwords = {
        newPassword,
      };
      try {
        const res = await myAPIClient.put(
          `/nonteachingstaff/${id}`,
          passwords,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setNewPassword("");
        setOldPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("CHeck passwords and try again");
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <form
      style={{
        display: "flex",
        width: "100%",
        height: "max-content",
        gap: "10",
        flexDirection: "column",
        boxShadow: "2p  2px 2px 2px rgba(0,0,0,0.4",
      }}
    >
      <FormLabel>New Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
      </InputGroup>
      <FormLabel>Confirm New Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
      </InputGroup>
      <FormLabel>Old Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
      </InputGroup>
      <Button colorScheme={primaryColor.name} mt={4} onClick={updatePassword}>
        Change Password
      </Button>
    </form>
  );
};

export const Settings = ({ nonteachingstaff }: any) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("nonteachingstaffId");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const updatenonteachingstaff = async () => {
    const updates = {
      username,
      email,
      contact,
      address,
    };
    try {
      const res = await myAPIClient.put(`/nonteachingstaff/${id}`, updates, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setAddress("");
      setEmail("");
      setContact("");
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex
      boxShadow={"base"}
      w="100%"
      p={10}
      h="max-content"
      direction={"column"}
      gap={2}
    >
      <FormLabel>Username</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<PersonOutlineOutlined />}
        />
        <Input
          isRequired
          type="text"
          placeholder={nonteachingstaff.username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Email</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<BiEnvelope />}
        />
        <Input
          isRequired
          type="text"
          placeholder={nonteachingstaff.email ? nonteachingstaff.email : ""}
          onChange={(e) => setEmail(e.target.value)}
          // placeholder="Email"
        />
      </InputGroup>
      <FormLabel>Contact</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<Phone />}
        />
        <Input
          isRequired
          type="text"
          placeholder={nonteachingstaff.contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Address</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LocationCity />}
        />
        <Input
          isRequired
          type="text"
          placeholder={nonteachingstaff.address}
          // placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </InputGroup>
      <Button
        disabled={!contact && !username && !address && !email}
        colorScheme={primaryColor.name}
        onClick={updatenonteachingstaff}
      >
        Update
      </Button>
    </Flex>
  );
};
