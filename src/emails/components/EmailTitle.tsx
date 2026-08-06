import * as React from "react";
import { Heading } from "@react-email/components";

interface EmailTitleProps {
  children: React.ReactNode;
  marginBottom?: string;
}

export default function EmailTitle({
  children,
  marginBottom = "48",
}: EmailTitleProps) {
  return (
    <Heading
      style={{
        margin: `24px 0 ${marginBottom}px`,
        fontWeight: "500",
        fontSize: "24px",
        lineHeight: "1",
        fontFamily: "'Instrument Serif', Georgia, serif",
      }}
    >
      {children}
    </Heading>
  );
}
