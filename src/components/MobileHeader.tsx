import { Row, Text } from "@once-ui-system/core";
import React from "react";

const MobileHeader = () => {
  return (
    <Row
      fitHeight
      position="relative"
      as="header"
      zIndex={9}
      fillWidth
      padding="8"
      horizontal="center"
      data-border="rounded"
      hide
      s={{
        hide: false,
      }}
    >
      <Row
        paddingLeft="12"
        fillWidth
        vertical="center"
        horizontal="center"
        textVariant="body-default-s"
      >
        <Text size="xl">KD</Text>
      </Row>
    </Row>
  );
};

export default MobileHeader;
