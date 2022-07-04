import * as React from "react";
import { HasLivedInNlBeforeFormStep, HasLivedInNlUntilFormStep, ConfirmFormStep } from "./steps";
import { IFirstRegistrationData, FirstRegistrationServiceProvider, defaultFirstRegistrationData } from "./FirstRegistrationContext";

export type TFirstRegistrationFormServiceSteps = "hasLivedInNlBefore" | "hasLivedInNlUntil" | "howLongWillYouStay" | "confirm" | "endResubmission";

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
      return <HasLivedInNlUntilFormStep setNextStep={(hasLivedInNlUntil) => new Date(hasLivedInNlUntil) < new Date('1994-10-01') ? setStep("confirm") : setStep("endResubmission")} handleSetStep={setStep} />;

    case "howLongWillYouStay":
      return <></>;

    case "confirm":
      return <ConfirmFormStep setPreviousStep={(hasLivedInNlBefore) => setStep(hasLivedInNlBefore === "1" ? "hasLivedInNlUntil" :"hasLivedInNlBefore")} />;

    case "endResubmission":
      return <>Het proces eindigt hier, het gaat namelijk om een herbevestiging vanuit het buitenland, niet een eerste inschrijving</>;
  }
};
