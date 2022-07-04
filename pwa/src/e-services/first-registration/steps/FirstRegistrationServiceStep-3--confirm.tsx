import * as React from "react";
import { useTranslation } from "react-i18next";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import {
  EndServiceTemplate,
  ICollectedData,
} from "../../../templates/templateParts/selfServices/endService/EndServiceTemplate";
import { navigate } from "gatsby";
import {useFirstRegistration} from "../../../hooks/firstRegistration";

interface MovingStepProps {
  setPreviousStep: (hasLivedInNlBefore: string) => void;
}

export const ConfirmFormStep: React.FC<MovingStepProps> = ({ setPreviousStep }) => {
  const firstRegistrationClient = useFirstRegistration();
  const { t } = useTranslation();
  const [formData] = React.useContext(FirstRegistrationContext);

  const mutation = firstRegistrationClient.submitFirstRegistration(
    {
      documentType: 'passport',
      documentIssueDate: '',
      documentExpiryDate: '',
      issueByInstancy: '',
      foreignPersonalId: '12345',
      surname: 'ten Laak',
      previousSurname: '',
      firstname: 'Jaap',
      dateOfBirth: '20-11-2001',
      birthplace: 'Leiden',
      countryOfBirth: 'The Netherlands',
      nationality: 'nl',
      maritalStatus: 'married',
      gender: 'male',
      phoneNumber: '+31612345689',
      emailAddress: 'k.deheer@simgroep.nl',
    },
    {
      onSuccess: () => {
        navigate("/my-cases");
      },
    }
  );

  const onSubmit = (): void => {
    mutation.mutate();
  };

  const getCollectedData = (): ICollectedData[] => {
    const collectedData: ICollectedData[] = [
      { label: t("Has lived in the Netherlands before"), value: formData.hasLivedInNlBefore },
      { label: t("Has lived in the Netherlands until"), value: formData.hasLivedInNlUntil },
    ];

    return collectedData;
  };

  return (
    <EndServiceTemplate
      collectedData={getCollectedData()}
      title={t("Confirm the first registration form")}
      handleSubmit={onSubmit}
      setPreviousStep={() => setPreviousStep(formData.hasLivedInNlBefore)}
    />
  );
};
