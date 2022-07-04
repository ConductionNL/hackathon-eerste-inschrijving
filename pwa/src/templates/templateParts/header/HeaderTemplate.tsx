import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { Container, PrimaryTopNav, SecondaryTopNav } from "@conduction/components";
import { navigate } from "gatsby";
import {t} from "i18next";

export const HeaderTemplate: React.FC = () => {
  const primaryTopNavItems = [{ label: t("Home"), handleClick: () => navigate("/") }];
  const secondaryTopNavItems = [{ label: "SIM", handleClick: () => window.open("https://www.simgroep.nl/") }];

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <Container layoutClassName={styles.secondaryNavContainer}>
          <SecondaryTopNav items={secondaryTopNavItems} />
        </Container>
      </div>

      <Container layoutClassName={styles.headingContainer}>
        <Heading1 className={styles.title}>{t("First registration")}</Heading1>
      </Container>

      <Container>
        <PrimaryTopNav items={primaryTopNavItems} />
      </Container>
    </header>
  );
};
