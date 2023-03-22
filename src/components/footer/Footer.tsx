import { Icon } from "@iconify/react";
import { LinkedIn, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import useTheme from "../../theme/useTheme";
import { Text } from "../../ui";
import Box from "../box/Box";

const Footer = () => {
  const {
    theme: {
      layout: { footerPosition },
    },
  } = useTheme();
  if (footerPosition === "hidden") return <></>;

  return (
    <StyledFooter
      className={`footer_position--${footerPosition} ${
        footerPosition === "fixed" ? "fg-theme" : ""
      }`}
    >
      <Text varient="body1" weight="medium">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/Ashik-AD"
          target={"_blank"}
          className="text-primary"
        >
          Quadral Technologies
        </a>
      </Text>
      <Box display="flex" space={0.6}>
        <a href="https://github.com/Ashik-AD" target={"_blank"}>
          <LinkedIn />
        </a>
        <a href="https://linkedin.com/in/ashikdhimal" target={"_blank"}>
          <Twitter />{" "}
        </a>
      </Box>
    </StyledFooter>
  );
};
export default Footer;
const StyledFooter = styled("footer")`
  width: 100%;
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  z-index: 1;

  &.footer_position--fixed {
    position: sticky;
    bottom: 0;
    border-radius: 0.6rem;
    margin: 0 auto;
    width: calc(100% - 2rem);
  }
`;
