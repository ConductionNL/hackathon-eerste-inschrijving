import * as React from "react";
import { Button, Heading1 } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {usePet} from "../../hooks/pet";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();

  const pets = usePet().getPets();

  console.log(pets.data);

  return (
    <Container>
      <Heading1>{t('First registration')}</Heading1>

      <p>
        {t('Welcome at the first registration e-service. Click on the start button below to start the process.')}
      </p>

      <Button onClick={() => navigate('/first-registration')}>{t('Start')}</Button>
    </Container>
  );
};
