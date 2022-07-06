import * as React from "react";
import { useTranslation } from "react-i18next";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import {
  EndServiceTemplate,
  ICollectedData,
} from "../../../templates/templateParts/selfServices/endService/EndServiceTemplate";
import { navigate } from "gatsby";
import { useFirstRegistration } from "../../../hooks/firstRegistration";

interface MovingStepProps {
  setPreviousStep: () => void;
}

export const ConfirmFormStep: React.FC<MovingStepProps> = ({ setPreviousStep }) => {
  const firstRegistrationClient = useFirstRegistration();
  const { t } = useTranslation();
  const [formData] = React.useContext(FirstRegistrationContext);

  const mutation = firstRegistrationClient.submitFirstRegistration(
    {
      movingDocument: undefined,
      idDocumentInformation: {
        documentType: 'passport',
        documentNumber: '123',
        documentIssueDate: '2020-01-01',
        documentExpiryDate: '2028-01-01',
        documentProvidedBy: 'instanceA',
        foreignIdNumber: '456',
      },
      personalInformation: {
        familyName: 'surname',
        formerFamilyName: 'formerSurname',
        firstName: 'firstName',
        dateOfBirth: '2000-01-01',
        placeOfBirth: 'Amsterdam',
        countryOfBirth: 'the Netherlands',
        nationality: 'nl',
        maritalStatus: 'married',
        gender: 'male',
        phoneNumber: '0123456',
        emailAddress: 'email@address.com',
      },
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
      setPreviousStep={() => setPreviousStep()}
    />
  );
};
