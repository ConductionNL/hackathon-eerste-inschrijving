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

export enum FirstRegistrationFormStepsEnum {
  hasLivedInNlBefore = 'hasLivedInNlBefore',
  hasLivedInNlUntil = 'hasLivedInNlUntil',
  untilWhichDateWillYouStayInNl = 'untilWhichDateWillYouStayInNl',
  wereYouRegisteredInNlAntilles = 'wereYouRegisteredInNlAntilles',
  canYouUploadMovingDocument = 'canYouUploadMovingDocument',
  idDocumentInformation = 'idDocumentInformation',
  personalInformation = 'personalInformation',
  confirm = 'confirm',
  endResubmission = 'endResubmission',
  endInfoRni = 'endInfoRni',
}

export type TFirstRegistrationFormServiceSteps = FirstRegistrationFormStepsEnum.hasLivedInNlBefore | FirstRegistrationFormStepsEnum.hasLivedInNlUntil | FirstRegistrationFormStepsEnum.untilWhichDateWillYouStayInNl | FirstRegistrationFormStepsEnum.wereYouRegisteredInNlAntilles | FirstRegistrationFormStepsEnum.canYouUploadMovingDocument | FirstRegistrationFormStepsEnum.idDocumentInformation | FirstRegistrationFormStepsEnum.personalInformation | FirstRegistrationFormStepsEnum.confirm | FirstRegistrationFormStepsEnum.endResubmission | FirstRegistrationFormStepsEnum.endInfoRni;

export const FirstRegistrationForm: React.FC = () => {
  const [step, setStep] = React.useState<TFirstRegistrationFormServiceSteps>(FirstRegistrationFormStepsEnum.hasLivedInNlBefore);
  const [visitedSteps, setVisitedSteps] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState<IFirstRegistrationData>(defaultFirstRegistrationData);

  const setNextStep = (nextStep: TFirstRegistrationFormServiceSteps) => {
    setVisitedSteps([...visitedSteps, step]);
    setStep(nextStep);
  }
  const setPreviousStep = () => {
    const lastVisitedStep = visitedSteps.pop();

    setStep((lastVisitedStep ? lastVisitedStep : FirstRegistrationFormStepsEnum.hasLivedInNlBefore) as TFirstRegistrationFormServiceSteps);
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
    case FirstRegistrationFormStepsEnum.hasLivedInNlBefore:
      return <HasLivedInNlBeforeFormStep setNextStep={(hasLivedInNlBefore) => {
        setNextStep(hasLivedInNlBefore === "1" ? FirstRegistrationFormStepsEnum.hasLivedInNlUntil : FirstRegistrationFormStepsEnum.untilWhichDateWillYouStayInNl);
      }} />;

    case FirstRegistrationFormStepsEnum.hasLivedInNlUntil:
      return <HasLivedInNlUntilFormStep
        setNextStep={(hasLivedInNlUntil) => new Date(hasLivedInNlUntil) < new Date('1994-10-01') ? setNextStep(FirstRegistrationFormStepsEnum.untilWhichDateWillYouStayInNl) : setNextStep(FirstRegistrationFormStepsEnum.endResubmission)}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.untilWhichDateWillYouStayInNl:
      return <UntilWhichDateWillYouStayInNlStep
        setNextStep={(untilWhichDateWillYouStayInNl) => {
          const date4MonthsFromNow = new Date()
          date4MonthsFromNow.setMonth(date4MonthsFromNow.getMonth() + 4);

          return new Date(untilWhichDateWillYouStayInNl) > date4MonthsFromNow ? setNextStep(FirstRegistrationFormStepsEnum.wereYouRegisteredInNlAntilles) : setNextStep(FirstRegistrationFormStepsEnum.endInfoRni)
        }}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.wereYouRegisteredInNlAntilles:
      return <WereYouRegisteredInNlAntillesStep
        setNextStep={(wereYouRegisteredInNlAntilles) => wereYouRegisteredInNlAntilles === "1" ? setNextStep(FirstRegistrationFormStepsEnum.canYouUploadMovingDocument) : setNextStep(FirstRegistrationFormStepsEnum.idDocumentInformation)}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.canYouUploadMovingDocument:
      return <CanYouUploadMovingDocumentStep
        setNextStep={() => setNextStep(FirstRegistrationFormStepsEnum.idDocumentInformation)}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.idDocumentInformation:
      return <IdDocumentInformationStep
        setNextStep={() => setNextStep(FirstRegistrationFormStepsEnum.personalInformation)}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.personalInformation:
      return <PersonalInformationStep
        setNextStep={() => setNextStep(FirstRegistrationFormStepsEnum.confirm)}
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.confirm:
      return <ConfirmFormStep
        setPreviousStep={setPreviousStep}
      />;

    case FirstRegistrationFormStepsEnum.endResubmission:
      return <>{t("The process ends here, because this case is handled as an resubmission from abroad, not as first registration")}</>;

    case FirstRegistrationFormStepsEnum.endInfoRni:
      return <>{t("The process ends here, more information needs to be provided about registration RNI")}</>;
  }
};
