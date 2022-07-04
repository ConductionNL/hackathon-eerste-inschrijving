import * as React from "react";
import { HasLivedInNlBeforeFormStep, HasLivedInNlUntilFormStep, ConfirmFormStep, UntilWhichDateWillYouStayInNlStep } from "./steps";
import { IFirstRegistrationData, FirstRegistrationServiceProvider, defaultFirstRegistrationData } from "./FirstRegistrationContext";

export type TFirstRegistrationFormServiceSteps = "hasLivedInNlBefore" | "hasLivedInNlUntil" | "untilWhichDateWillYouStayInNl" | "confirm" | "endResubmission";

export const FirstRegistrationForm: React.FC = () => {
  const [step, setStep] = React.useState<TFirstRegistrationFormServiceSteps>("hasLivedInNlBefore");
  const [visitedSteps, setVisitedSteps] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState<IFirstRegistrationData>(defaultFirstRegistrationData);

  const setNextStep = (nextStep: TFirstRegistrationFormServiceSteps) => {
    setVisitedSteps([...visitedSteps, step]);
    setStep(nextStep);
  }
  const setPreviousStep = () => {
    const lastVisitedStep = visitedSteps.pop();
    console.log(lastVisitedStep);

    setStep((lastVisitedStep ? lastVisitedStep : "hasLivedInNlBefore") as TFirstRegistrationFormServiceSteps);
    setVisitedSteps(visitedSteps.slice(-1));

    return lastVisitedStep;
  }

  return (
    <FirstRegistrationServiceProvider value={[formData, setFormData]}>
      <FirstRegistrationServiceFormStep {...{ step, setNextStep, setPreviousStep }} />
    </FirstRegistrationServiceProvider>
  );
};

interface FirstRegistrationServiceFormStepProps {
  step: TFirstRegistrationFormServiceSteps;
  setNextStep: (step: TFirstRegistrationFormServiceSteps) => void;
  setPreviousStep: () => string | undefined;
}

const FirstRegistrationServiceFormStep: React.FC<FirstRegistrationServiceFormStepProps> = ({ step, setNextStep, setPreviousStep }) => {
  switch (step) {
    case "hasLivedInNlBefore":
      return <HasLivedInNlBeforeFormStep setNextStep={(hasLivedInNlBefore) => {
        setNextStep(hasLivedInNlBefore === "1" ? "hasLivedInNlUntil" : "untilWhichDateWillYouStayInNl");
      }} />;

    case "hasLivedInNlUntil":
      return <HasLivedInNlUntilFormStep
        setNextStep={(hasLivedInNlUntil) => new Date(hasLivedInNlUntil) < new Date('1994-10-01') ? setNextStep("untilWhichDateWillYouStayInNl") : setNextStep("endResubmission")}
        setPreviousStep={setPreviousStep}
      />;

    case "untilWhichDateWillYouStayInNl":
      return <UntilWhichDateWillYouStayInNlStep
        setNextStep={() => setNextStep("confirm")}
        setPreviousStep={setPreviousStep}
      />;

    case "confirm":
      return <ConfirmFormStep
        setPreviousStep={setPreviousStep}
      />;

    case "endResubmission":
      return <>Het proces eindigt hier, het gaat namelijk om een herbevestiging vanuit het buitenland, niet een eerste inschrijving</>;
  }
};
