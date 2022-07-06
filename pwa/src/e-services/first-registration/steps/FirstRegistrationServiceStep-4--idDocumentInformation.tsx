import * as React from "react";
import { FormFieldInput, FormFieldLabel, Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputDate, InputRadio, InputText } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import { FirstRegistrationFormStepsEnum } from "../FirstRegistrationForm";

interface IdDocumentInformationStepProps {
  setNextStep: () => void;
  setPreviousStep: () => void;
}

export const IdDocumentInformationStep: React.FC<IdDocumentInformationStepProps> = ({ setNextStep, setPreviousStep }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useContext(FirstRegistrationContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    setValue(FirstRegistrationFormStepsEnum.idDocumentInformation, formData.idDocumentInformation);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    handleSetFormData(data);
    setNextStep();
  };

  const handleSetFormData = ({ idDocumentInformation }: any) => {
    setFormData({ ...formData, idDocumentInformation });
  };

  return (
    <FormStepTemplate title={t("Information identification document")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.documentType">{t("Document type")}</FormFieldLabel>
          <InputRadio name="idDocumentInformation.documentType" value="passport" label={t("Passport")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="idDocumentInformation.documentType" value="id" label={t("ID")} {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.documentNumber">{t("Document number")}</FormFieldLabel>
          <InputText name="idDocumentInformation.documentNumber" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.issueDateDocument">{t("Issue date of document")}</FormFieldLabel>
          <InputDate name="idDocumentInformation.issueDateDocument" {...{ register, errors }} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.validDateDocument">{t("Document is valid until")}</FormFieldLabel>
          <InputDate name="idDocumentInformation.validDateDocument" {...{ register, errors }} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.documentProvidedBy">{t("Which instancy provided the document?")}</FormFieldLabel>
          <InputText name="idDocumentInformation.documentProvidedBy" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="idDocumentInformation.foreignIdNumber">{t("Foreign ID number / personal number")}</FormFieldLabel>
          <InputText name="idDocumentInformation.foreignIdNumber" {...{register, errors}} validation={{ required: false }} />
        </FormFieldInput>
        <button type="submit">
          <Link icon={<ArrowRightIcon />} iconAlign="start">
            {t("Next step")}
          </Link>
        </button>
      </form>
    </FormStepTemplate>
  );
};
