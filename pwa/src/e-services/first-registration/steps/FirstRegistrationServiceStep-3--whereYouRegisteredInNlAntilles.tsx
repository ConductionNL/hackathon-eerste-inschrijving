import * as React from "react";
import { FormFieldInput, Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputRadio } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";

interface WhereYouRegisteredInNlAntillesStepProps {
  setNextStep: (whereYouRegisteredInNlAntilles: string) => void;
  setPreviousStep: () => void;
}

export const WhereYouRegisteredInNlAntillesStep: React.FC<WhereYouRegisteredInNlAntillesStepProps> = ({ setNextStep, setPreviousStep }) => {
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
    setValue("whereYouRegisteredInNlAntilles", formData.whereYouRegisteredInNlAntilles);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    handleSetFormData(data)
    setNextStep(data.whereYouRegisteredInNlAntilles);
  };

  const handleSetFormData = ({ whereYouRegisteredInNlAntilles }: any) => {
    setFormData({ ...formData, whereYouRegisteredInNlAntilles });
  };

  return (
    <FormStepTemplate title={t("Where you recently registered as resident in the Netherlands Antilles?")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldInput>
          <InputRadio name="whereYouRegisteredInNlAntilles" value="1" label={t("Yes")} {...{register, errors}} validation={{ required: true }} />
          <InputRadio name="whereYouRegisteredInNlAntilles" value="0" label={t("No")} {...{register, errors}} validation={{ required: true }} />
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
