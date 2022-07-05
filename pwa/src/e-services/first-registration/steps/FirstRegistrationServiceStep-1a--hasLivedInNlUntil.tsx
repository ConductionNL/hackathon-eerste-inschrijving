import * as React from "react";
import { FormFieldInput, FormFieldLabel, Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputDate } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";

interface HasLivedInNlUntilFormStepProps {
  setNextStep: (hasLivedInNlUntil: string) => void;
  setPreviousStep: () => string | undefined;
}

export const HasLivedInNlUntilFormStep: React.FC<HasLivedInNlUntilFormStepProps> = ({ setNextStep, setPreviousStep }) => {
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
    setValue("hasLivedInNlUntil", formData.hasLivedInNlUntil);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    handleSetFormData(data)
    setNextStep(data.hasLivedInNlUntil);
  };

  const handleSetFormData = (data: any) => {
    setFormData({ ...formData, hasLivedInNlUntil: data.hasLivedInNlUntil });
  };

  return (
    <FormStepTemplate title={t("Until which date have you lived in the Netherlands?")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldInput>
          <FormFieldLabel htmlFor="hasLivedInNlUntil">{t("Moving date")}</FormFieldLabel>
          <InputDate name="hasLivedInNlUntil" {...{ register, errors }} validation={{ required: true }} />
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
