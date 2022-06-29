import * as React from "react";
import { FirstRegistrationForm } from "../../e-services/first-registration/FirstRegistrationForm";
import { Container } from "@conduction/components";

const FirstRegistrationPage: React.FC = () => {
  return (
    <Container>
      <FirstRegistrationForm />
    </Container>
  );
};

export default FirstRegistrationPage;
