import * as React from "react";
import { Link } from "@gemeente-denhaag/components-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FormStepTemplate } from "../../../templates/templateParts/formStep/FormStepTemplate";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import { InputFile } from "@conduction/components";

interface CanYouUploadMovingDocumentStepProps {
  setNextStep: () => void;
  setPreviousStep: () => void;
}

export const CanYouUploadMovingDocumentStep: React.FC<CanYouUploadMovingDocumentStepProps> = ({ setNextStep, setPreviousStep }) => {
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
    // TODO: WARNING: for some reason the line below makes the FileList become empty in the FormData..
    //  Removing it will keep the FileList filled, but will result in an unfilled file field after stepping back to this step using the "Previous step" button.
    // setValue("movingDocument", formData.movingDocument);
  }, [formData]);

  const handleSetPreviousStep = () => {
    handleSetFormData(getValues());
    setPreviousStep();
  };

  const onSubmit = (data: any): void => {
    console.log(data);
    handleSetFormData(data);
    setNextStep();
  };

  const handleSetFormData = ({ movingDocument }: any) => {
    setFormData({ ...formData, movingDocument });
  };

  return (
    <FormStepTemplate title={t("Where you recently registered as resident in the Netherlands Antilles?")} setPreviousStep={handleSetPreviousStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFile name="movingDocument" {...{ register, errors }} validation={{ required: true }} />

        <button type="submit">
          <Link icon={<ArrowRightIcon />} iconAlign="start">
            {t("Next step")}
          </Link>
        </button>
      </form>
    </FormStepTemplate>
  );
};
