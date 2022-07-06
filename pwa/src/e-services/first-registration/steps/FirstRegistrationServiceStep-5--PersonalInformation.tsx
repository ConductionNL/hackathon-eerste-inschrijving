import * as React from "react";
import { FormFieldInput, FormFieldLabel, Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputDate, InputRadio, InputText } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import { FirstRegistrationFormStepsEnum } from "../FirstRegistrationForm";

interface PersonalInformationStepProps {
  setNextStep: () => void;
  setPreviousStep: () => void;
}

export const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ setNextStep, setPreviousStep }) => {
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
    setValue(FirstRegistrationFormStepsEnum.personalInformation, formData.personalInformation);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    handleSetFormData(data);
    setNextStep();
  };

  const handleSetFormData = ({ personalInformation }: any) => {
    setFormData({ ...formData, personalInformation });
  };

  return (
    <FormStepTemplate title={t("Personal information")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.familyName">{t("Family name")}</FormFieldLabel>
          <InputText name="personalInformation.familyName" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.formerFamilyName">{t("Former family name")}</FormFieldLabel>
          <InputText name="personalInformation.formerFamilyName" {...{register, errors}} validation={{ required: false }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.firstName">{t("First name")}</FormFieldLabel>
          <InputText name="personalInformation.firstName" {...{ register, errors }} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.dateOfBirth">{t("Date of birth")}</FormFieldLabel>
          <InputDate name="personalInformation.dateOfBirth" {...{ register, errors }} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.placeOfBirth">{t("Place of birth")}</FormFieldLabel>
          <InputText name="personalInformation.placeOfBirth" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.countryOfBirth">{t("Country of birth")}</FormFieldLabel>
          <InputText name="personalInformation.countryOfBirth" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.nationality">{t("Nationality")}</FormFieldLabel>
          <InputText name="personalInformation.nationality" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.maritalStatus">{t("Marital status")}</FormFieldLabel>
          <InputRadio name="personalInformation.maritalStatus" value="married" label={t("Married")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="personalInformation.maritalStatus" value="unmarried" label={t("Unmarried")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="personalInformation.maritalStatus" value="registeredPartnership" label={t("Registered partnership")} {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.gender">{t("Gender")}</FormFieldLabel>
          <InputRadio name="personalInformation.gender" value="male" label={t("Male")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="personalInformation.gender" value="female" label={t("Female")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="personalInformation.gender" value="other" label={t("Other")} {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.phoneNumber">{t("Phone number")}</FormFieldLabel>
          <InputText name="personalInformation.phoneNumber" {...{register, errors}} validation={{ required: true }} />
        </FormFieldInput>
        <FormFieldInput>
          <FormFieldLabel htmlFor="personalInformation.emailAddress">{t("E-mail address")}</FormFieldLabel>
          <InputText name="personalInformation.emailAddress" {...{register, errors}} validation={{ required: true }} />
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
