import * as React from "react";
import {
  HasLivedInNlBeforeFormStep,
  HasLivedInNlUntilFormStep,
 IdDocumentInformationStep, PersonalInformationStep, ConfirmFormStep,
  UntilWhichDateWillYouStayInNlStep,
  WereYouRegisteredInNlAntillesStep,
  CanYouUploadMovingDocumentStep
} from "./steps";
import { IFirstRegistrationData, FirstRegistrationServiceProvider, defaultFirstRegistrationData } from "./FirstRegistrationContext";
import {t} from "i18next";

export type TFirstRegistrationFormServiceSteps = "hasLivedInNlBefore" | "hasLivedInNlUntil" | "untilWhichDateWillYouStayInNl" | "wereYouRegisteredInNlAntilles" | "canYouUploadMovingDocument" | "idDocumentInformation" | "personalInformation" | "confirm" | "endResubmission" | "endInfoRni";

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
        setNextStep={(untilWhichDateWillYouStayInNl) => {
          const date4MonthsFromNow = new Date()
          date4MonthsFromNow.setMonth(date4MonthsFromNow.getMonth() + 4);

          return new Date(untilWhichDateWillYouStayInNl) > date4MonthsFromNow ? setNextStep("wereYouRegisteredInNlAntilles") : setNextStep("endInfoRni")
        }}
        setPreviousStep={setPreviousStep}
      />;

    case "wereYouRegisteredInNlAntilles":
      return <WereYouRegisteredInNlAntillesStep
        setNextStep={(wereYouRegisteredInNlAntilles) => wereYouRegisteredInNlAntilles === "1" ? setNextStep("canYouUploadMovingDocument") : setNextStep("idDocumentInformation")}
        setPreviousStep={setPreviousStep}
      />;

    case "canYouUploadMovingDocument":
      return <CanYouUploadMovingDocumentStep
        setNextStep={() => setNextStep("idDocumentInformation")}
        setPreviousStep={setPreviousStep}
      />;

    case "idDocumentInformation":
      return <IdDocumentInformationStep
        setNextStep={() => setNextStep("personalInformation")}
        setPreviousStep={setPreviousStep}
      />;

    case "personalInformation":
      return <PersonalInformationStep
        setNextStep={() => setNextStep("confirm")}
        setPreviousStep={setPreviousStep}
      />;

    case "confirm":
      return <ConfirmFormStep
        setPreviousStep={setPreviousStep}
      />;

    case "endResubmission":
      return <>{t("The process ends here, because this case is handled as an resubmission from abroad, not as first registration")}</>;

    case "endInfoRni":
      return <>{t("The process ends here, more information needs to be provided about registration RNI")}</>;
  }
};
