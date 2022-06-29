import * as React from "react";
import { useTranslation } from "react-i18next";
import { FirstRegistrationContext } from "../FirstRegistrationContext";
import {
  EndServiceTemplate,
  ICollectedData,
} from "../../../templates/templateParts/selfServices/endService/EndServiceTemplate";
import { navigate } from "gatsby";

interface MovingStepProps {
  setPreviousStep: () => void;
}

export const ConfirmFormStep: React.FC<MovingStepProps> = ({ setPreviousStep }) => {
  const { t } = useTranslation();
  const [formData] = React.useContext(FirstRegistrationContext);

  const onSubmit = (): void => {
    // Todo: send data to gateway
    navigate("/my-cases");
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
      title={t("Confirm your move")}
      handleSubmit={onSubmit}
      {...{ setPreviousStep }}
    />
  );
};
