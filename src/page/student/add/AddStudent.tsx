import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  Input,
  WrapItem,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Button,
  Select,
  AlertIcon,
  Alert,
  CircularProgress,
} from "@chakra-ui/react";
import {
  AirportShuttleOutlined,
  ClassOutlined,
  DateRange,
  Home,
  HomeOutlined,
  Person,
  PersonAddAlt1,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneOutlined,
  ViewStreamOutlined,
  WcOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { BiEnvelope } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase/firebase";

export const AddStudent = () => {
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [profileimage, setProfileimage] = useState<any>(undefined);
  const [role, setRole] = useState("");
  const [password, setpassword] = useState("");
  const [hostel, setHostel] = useState("");
  const [transport, setTransport] = useState("");
  const [clas, setClass] = useState("");
  const [stream, setStream] = useState("");
  const [parentname, setParentname] = useState("");
  const [parentcontact, setParentcontact] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileimage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(profileimage);
    }
  };

  const addstudent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const student: any = {
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      contact,
      gender,
      address,
      parentcontact,
      parentname,
      clas,
      stream,
      hostel,
      transport,
      dateofbirth,
      // profileimage,
    };

    setIsLoading(true);
    if (profileimage !== null) {
      const datai = new FormData();
      const fileName = Date.now() + profileimage.name;
      datai.append("name", fileName);
      datai.append("file", profileimage);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, profileimage);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            student.profileimage = downloadURL;
          });
          try {
            await myAPIClient.post("/students", student, {
              headers: {
                token: `token ${token}`,
              },
            });

            // ALSO INTERACT WITH MONGODB********************************
            try {
              await axios.post(
                `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_RESULTS
                }auth/register`,
                student
              );
            } catch (err) {
              console.log(err);
            }

            setEmail("");
            setUsername("");
            setpassword("");
            setGender("");
            setDateofbirth("");
            setFirstname("");
            setLastname("");
            setRole("");
            setParentcontact("");
            setParentname("");
            setProfileimage("");
            setContact("");
            setStream("");
            setClass("");
            setHostel("");
            setTransport("");
            setAddress("");

            setIsLoading(false);
            setSuccess(true);
            setError(false);
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
          }
        }
      );

      // Upload IMage to uploads folder on the backend **********************************************
      // This will be replaced by firebase and then commented out later *****************************
      // try {
      //   await myAPIClient.post("/upload", datai, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      // } catch (err) {
      //   setError(true);
      //   setSuccess(false);
      // }
    }
  };

  // REGISTER STUDENT ENDS HERE *********************************************************************

  // Get all classes
  const [classes, setClasses] = useState<any>([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `token ${token}`,
          },
        });
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
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
            Student Registration
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
          <Person />
          <Text fontWeight="bold" fontSize={14}>
            Student
          </Text>
          <FaAngleRight />
          <PersonAddAlt1 />
          <Text fontWeight="bold" fontSize={14}>
            Add Student
          </Text>
        </Box>
      </Flex>

      <Box boxShadow="base" p={4}>
        <Flex
          align="center"
          justify={"center"}
          borderRadius={3}
          bg="#fcc107"
          w="95%"
          p={4}
          h={50}
        >
          <Text textAlign={"center"}>
            *************All the fields marked with * are required ***********
          </Text>
        </Flex>
        <form
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <WrapItem
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                First Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
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
                  value={firstname}
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setFirstname(e.target.value);
                  }}
                  placeholder="First Name"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Last Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<PersonOutline />}
                />
                <Input
                  isRequired
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Username<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<Person />}
                />
                <Input
                  isRequired
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Email</FormLabel>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </InputGroup>
            </Center>

            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Class<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <Select
                  placeholder="Select Class"
                  value={clas}
                  onChange={(e) => setClass(e.target.value)}
                  w={"100%"}
                >
                  {classes?.map((c: any) => (
                    <option key={c.classNumeral} value={c.classNumeral}>
                      {c.classNumeral}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Center>

            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Stream</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ViewStreamOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  placeholder="Stream"
                />
              </InputGroup>
            </Center>

            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Role</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ClassOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Parent Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ClassOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={parentname}
                  onChange={(e) => setParentname(e.target.value)}
                  placeholder="Parent Name"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Parent Contact<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<PhoneOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={parentcontact}
                  onChange={(e) => setParentcontact(e.target.value)}
                  placeholder="Parent Contact"
                />
              </InputGroup>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Address<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<Home />}
                />
                <Input
                  isRequired
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Student Contact</FormLabel>
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
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Date of Birth<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<DateRange />}
                />
                <Input
                  isRequired
                  type="text"
                  value={dateofbirth}
                  onChange={(e) => setDateofbirth(e.target.value)}
                  placeholder="Date of Birth"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Gender<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<WcOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Hostel/Dormitory</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<HomeOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  placeholder="Hostel/Dormitory"
                />
              </InputGroup>
            </Center>

            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Transport</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<AirportShuttleOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  placeholder="Transport"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Password<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<GiPadlock />}
                />
                <Input
                  isRequired
                  type="text"
                  value={password}
                  // onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setpassword(e.target.value);
                  }}
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Profile Image<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                border={"none"}
                onChange={onUploadImage}
                isRequired
                type="file"
              />
            </Center>

            {error && (
              <Alert p={6} w={"90%"} status="error">
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}

            {success && (
              <Alert p={6} w={"90%"} status="success">
                <AlertIcon />
                Success, student has been added successfully!
              </Alert>
            )}

            <Button
              variant={"solid"}
              colorScheme={primaryColor.name}
              px={20}
              py={4}
              onClick={addstudent}
              disabled={
                !username ||
                !password ||
                !firstname ||
                !lastname ||
                !gender ||
                !address ||
                !dateofbirth ||
                !profileimage ||
                !clas ||
                !parentname ||
                !parentcontact
              }
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="white" />
              ) : (
                "Add Student"
              )}
            </Button>
          </WrapItem>
        </form>
        {/* </Flex> */}
      </Box>
    </Box>
  );
};
