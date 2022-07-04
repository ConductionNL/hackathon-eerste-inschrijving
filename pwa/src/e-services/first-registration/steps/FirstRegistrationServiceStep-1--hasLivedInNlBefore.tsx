import * as React from "react";
import { Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputRadio } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";

interface FirstRegistrationStepProps {
  setNextStep: (hasLivedInNlBefore: string) => void;
}

export const HasLivedInNlBeforeFormStep: React.FC<FirstRegistrationStepProps> = ({setNextStep}) => {
  const {t} = useTranslation();
  const [formData, setFormData] = React.useContext(FirstRegistrationContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  React.useEffect(() => {
    setValue("hasLivedInNlBefore", formData.hasLivedInNlBefore);
  }, [formData]);

  const onSubmit = (data: any): void => {
    setFormData({...formData, hasLivedInNlBefore: data.hasLivedInNlBefore});
    setNextStep(data.hasLivedInNlBefore);
  };

  return (
    <FormStepTemplate title={t("Have you lived in the Netherlands before?")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputRadio name="hasLivedInNlBefore" value="1" label={t("Yes")} {...{register, errors}} validation={{ required: true }} />
        <InputRadio name="hasLivedInNlBefore" value="0" label={t("No")} {...{register, errors}} validation={{ required: true }} />

        <button type="submit">
          <Link icon={<ArrowRightIcon/>} iconAlign="start">
            {t("Next step")}
          </Link>
        </button>
      </form>
    </FormStepTemplate>
  );
};
