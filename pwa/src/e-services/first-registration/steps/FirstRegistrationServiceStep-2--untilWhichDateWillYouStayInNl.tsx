import * as React from "react";
import { FormFieldInput, FormFieldLabel, Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputDate } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import { TFirstRegistrationFormServiceSteps } from "../FirstRegistrationForm";

interface UntilWhichDateWillYouStayInNlStepProps {
  setNextStep: () => void;
  setPreviousStep: () => void;
}

export const UntilWhichDateWillYouStayInNlStep: React.FC<UntilWhichDateWillYouStayInNlStepProps> = ({ setNextStep, setPreviousStep }) => {
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
    setValue("untilWhichDateWillYouStayInNl", formData.untilWhichDateWillYouStayInNl);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    handleSetFormData(data)
    setNextStep();
  };

  const handleSetFormData = ({ untilWhichDateWillYouStayInNl }: any) => {
    setFormData({ ...formData, untilWhichDateWillYouStayInNl });
  };

  return (
    <FormStepTemplate title={t("Until which date will you live in the Netherlands?")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldInput>
          <FormFieldLabel htmlFor="untilWhichDateWillYouStayInNl">{t("Date")}</FormFieldLabel>
          <InputDate name="untilWhichDateWillYouStayInNl" {...{ register, errors }} validation={{ required: true }} />
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
