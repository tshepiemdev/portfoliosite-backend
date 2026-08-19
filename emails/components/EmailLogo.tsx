import * as React from "react";
import { Img } from "@react-email/components";

export default function EmailLogo({}) {
  return (
    <Img
      src="https://res.cloudinary.com/dea3pml8w/image/upload/tshepiem.dev-logo.svg"
      width="28"
      height="28"
      alt="Logo"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "4px",
        marginTop: "16px",
      }}
    />
  );
}