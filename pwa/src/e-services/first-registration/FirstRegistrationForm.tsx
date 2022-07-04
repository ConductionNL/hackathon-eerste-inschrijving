import * as React from "react";
import { HasLivedInNlBeforeFormStep, HasLivedInNlUntilFormStep, ConfirmFormStep } from "./steps";
import { IFirstRegistrationData, FirstRegistrationServiceProvider, defaultFirstRegistrationData } from "./FirstRegistrationContext";

export type TFirstRegistrationFormServiceSteps = "hasLivedInNlBefore" | "hasLivedInNlUntil" | "confirm";

export const FirstRegistrationForm: React.FC = () => {
  const [step, setStep] = React.useState<TFirstRegistrationFormServiceSteps>("hasLivedInNlBefore");
  const [formData, setFormData] = React.useState<IFirstRegistrationData>(defaultFirstRegistrationData);

  return (
    <FirstRegistrationServiceProvider value={[formData, setFormData]}>
      <FirstRegistrationServiceFormStep {...{ step, setStep }} />
    </FirstRegistrationServiceProvider>
  );
};

interface FirstRegistrationServiceFormStepProps {
  step: TFirstRegistrationFormServiceSteps;
  setStep: React.Dispatch<React.SetStateAction<TFirstRegistrationFormServiceSteps>>;
}

const FirstRegistrationServiceFormStep: React.FC<FirstRegistrationServiceFormStepProps> = ({ step, setStep }) => {
  switch (step) {
    case "hasLivedInNlBefore":
      return <HasLivedInNlBeforeFormStep setNextStep={(hasLivedInNlBefore) => setStep(hasLivedInNlBefore === "1" ? "hasLivedInNlUntil" : "confirm")} />;

    case "hasLivedInNlUntil":
      return <HasLivedInNlUntilFormStep setNextStep={() => setStep("confirm")} handleSetStep={setStep} />;

    case "confirm":
      return <ConfirmFormStep setPreviousStep={(hasLivedInNlBefore) => setStep(hasLivedInNlBefore === "1" ? "hasLivedInNlUntil" :"hasLivedInNlBefore")} />;
  }
};
