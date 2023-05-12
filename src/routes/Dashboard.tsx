import {
  Avatar,
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Admin from "../layouts/Admin";
import { FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";

export default function Dashboard() {
  return (
    <Admin>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={8}
          bg="white"
        >
          <Center mb={4}>
            <Avatar size="2xl" icon={<FaChalkboardTeacher />} bg="blue.500" />
          </Center>
          <VStack spacing={2}>
            <Heading size="lg" textAlign="center">
              0
            </Heading>
            <Text fontSize="md" textAlign="center">
              Teacher Accounts
            </Text>
          </VStack>
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={8}
          bg="white"
        >
          <Center mb={4}>
            <Avatar size="2xl" icon={<FaGraduationCap />} bg="blue.500" />
          </Center>
          <VStack spacing={2}>
            <Heading size="lg" textAlign="center">
              0
            </Heading>
            <Text fontSize="md" textAlign="center">
              Student Accounts
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Admin>
  );
}
