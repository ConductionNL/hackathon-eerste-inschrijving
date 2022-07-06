import * as React from "react";
import { useTranslation } from "react-i18next";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import {
  EndServiceTemplate,
  ICollectedData,
} from "../../../templates/templateParts/selfServices/endService/EndServiceTemplate";
import { navigate } from "gatsby";
import {useFirstRegistrationClient} from "../../../hooks/firstRegistration";
import { useState } from "react";

interface MovingStepProps {
  setPreviousStep: () => void;
}

export const ConfirmFormStep: React.FC<MovingStepProps> = ({ setPreviousStep }) => {
  const { t } = useTranslation();
  const [formData] = React.useContext(FirstRegistrationContext);
  const firstRegistrationClient = useFirstRegistrationClient();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const fileUploadMutation = firstRegistrationClient.createZaakDocument({}, {
    onError: () => {
      setFormSubmitting(false);
    },
    onSuccess: () => {}
  })
  const createZaakEigenschap = firstRegistrationClient.createZaakEigenschap({}, {
    onError: () => {
      setFormSubmitting(false);
    },
    onSuccess: () => {}
  });
  const mutation = firstRegistrationClient.createZaak(
    {},
    {
      onError: () => {
        setFormSubmitting(false);
      },
      onSuccess: () => {},
    }
  );

  const onSubmit = async () => {
    setFormSubmitting(true);

    const { id } = await mutation.mutateAsync();
    if (formData.movingDocument && formData.movingDocument.length > 0) {
      await fileUploadMutation.mutateAsync({zaakId: id, fileList: formData.movingDocument});
    }

    for (const property in formData.idDocumentInformation) {
      await createZaakEigenschap.mutateAsync({zaakId: id, eigenschap: property, waarde: formData.idDocumentInformation[property]});
    }
    for (const property in formData.personalInformation) {
      await createZaakEigenschap.mutateAsync({zaakId: id, eigenschap: property, waarde: formData.personalInformation[property]});
    }

    setFormSubmitting(false);
    navigate("/first-registration/success");
  };

  const getCollectedData = (): ICollectedData[] => {
    const documentTypes = {
      "passport": t("Passport"),
      "id": t("ID"),
    };
    const maritalStatuses = {
      "unmarried": t("Unmarried"),
      "married": t("Married"),
      "registeredPartnership": t("Registered partnership"),
    };
    const genders = {
      "male": t("Male"),
      "female": t("Female"),
    };

    const collectedData: ICollectedData[] = [
      { label: t("Document type"), value: documentTypes[formData.idDocumentInformation.documentType] },
      { label: t("Document number"), value: formData.idDocumentInformation.documentNumber },
      { label: t("Issue date of document"), value: formData.idDocumentInformation.documentIssueDate },
      { label: t("Document is valid until"), value: formData.idDocumentInformation.documentExpiryDate },
      { label: t("Which instancy provided the document?"), value: formData.idDocumentInformation.documentProvidedBy },
      { label: t("Foreign ID number / personal number"), value: formData.idDocumentInformation.foreignIdNumber },

      { label: t("Family name"), value: formData.personalInformation.familyName },
      { label: t("Former family name"), value: formData.personalInformation.formerFamilyName },
      { label: t("First name"), value: formData.personalInformation.firstName },
      { label: t("Date of birth"), value: formData.personalInformation.dateOfBirth },
      { label: t("Place of birth"), value: formData.personalInformation.placeOfBirth },
      { label: t("Country of birth"), value: formData.personalInformation.countryOfBirth },
      { label: t("Nationality"), value: formData.personalInformation.nationality },
      { label: t("Marital status"), value: maritalStatuses[formData.personalInformation.maritalStatus] },
      { label: t("Gender"), value: genders[formData.personalInformation.gender] },
      { label: t("Phone number"), value: formData.personalInformation.phoneNumber },
      { label: t("E-mail address"), value: formData.personalInformation.emailAddress },
    ];

    return collectedData;
  };

  return (
    <EndServiceTemplate
      collectedData={getCollectedData()}
      title={t("Confirm the first registration form")}
      handleSubmit={onSubmit}
      setPreviousStep={() => setPreviousStep()}
      disableSubmit={isFormSubmitting}
    />
  );
};
