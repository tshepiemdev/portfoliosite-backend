import * as React from "react";
import { Section, Text, Link, Img, Button } from "@react-email/components";

interface buttonProps {
  text: string;
  to: string;
}

export default function ButtonCta({ text, to }: buttonProps) {
  return (
    <Button
      href={to}
      style={{
        display: "inline-block",
        margin: "0px",
        padding: "16px 24px",
        backgroundColor: "#000000",
        color: "#ffffff",
        borderRadius: "90px",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      {text}
    </Button>
  );
}
