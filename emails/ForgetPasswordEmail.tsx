import { Html, Heading, Hr, Text } from "@react-email/components";
import * as React from "react";
import { Button } from "@react-email/button";

const ForgetPasswordEmail = ({
  params,
}: {
  params: { name1: string; name2: string; url: string };
}) => {
  return (
    <Html>
      <Heading as="h2">
        Hello {params.name1} {params.name2}
      </Heading>
      <Text>
        This Email is regarding the reseting of Your Password.click the button
        below to reset your Password
      </Text>
      <Button
        href={params.url}
        style={{ background: "#000", color: "#fff", padding: "20px 20px" }}
      >
        Reset Password
      </Button>
      <Hr />
      <Heading as="h3">Regards</Heading>
      <Text>Mathematica</Text>
    </Html>
  );
};

export default ForgetPasswordEmail;
