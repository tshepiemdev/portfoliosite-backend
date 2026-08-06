import * as React from "react";
import { Html, Body, Text, Preview, Container } from "@react-email/components";
import Footer from "../components/Footer";
import ButtonCta from "../components/ButtonCta";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface GetInTouchConfirmationData {
  mail_ref: string;
  firstName: string;
  email: string;
  dev_email: string;
  reason?: string;
  message: string;
}

interface GetInTouchConfirmationFormProps {
  data: GetInTouchConfirmationData;
}

export default function GetInTouchConfirmationForm({
  data,
}: GetInTouchConfirmationFormProps) {
  const headerStyle = {
    margin: "28px 0 4px",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
    textTransform: "uppercase" as const,
    color: "#666666",
  };

  const textStyle = {
    margin: "2px 0",
    fontSize: "16px",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
  };

  const listStyle = {
    margin: "2px 0",
    fontSize: "18px",
    lineHeight: "1.4",
    fontFamily: "'Instrument Serif', Georgia, serif",
    padding: "8px 0",
    borderBottom: "1.5px dotted #CCCCCC",
  };

  return (
    <Html>
      <Preview>
        Thank you for getting in touch. Your message has been received and I
        will get back to you soon.
      </Preview>

      <Body
        style={{
          margin: 0,
          padding: "12px 0 0",
          backgroundColor: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: 0,
          }}
        >
          <Container
            style={{
              margin: 0,
              padding: "16px",
            }}
          >
            <EmailLogo />

            <EmailTitle>
              Your Message
              <br />
              Was Received
            </EmailTitle>

            <Container style={{ margin: 0, marginBottom: "32px" }}>
              <Text style={textStyle}>Hi {data.firstName},</Text>

              <Text style={{ fontSize: "16px", lineHeight: "1.5" }}>
                Thank you for getting in touch. I have received your message and
                will review the details you provided before getting back to you.
              </Text>

              <Text style={headerStyle}>Summary</Text>

              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <li style={listStyle}>
                  Reason: {data.reason || "General Inquiry"}
                </li>

                <li
                  style={{
                    margin: "2px 0",
                    fontSize: "18px",
                    lineHeight: "1.4",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    padding: "8px 0",
                  }}
                >
                  Reference: {data.mail_ref}
                </li>
              </ul>

              <Text style={headerStyle}>Your Message</Text>

              <Text style={{ fontSize: "16px", lineHeight: "1.5" }}>
                {data.message}
              </Text>

              <Text
                style={{
                  fontSize: "12px",
                  lineHeight: "1.5",
                  margin: "48px 0 16px",
                  opacity: 0.8,
                }}
              >
                * I will respond as soon as possible. You can expect a reply
                within 7 business days depending on the nature of your inquiry.
              </Text>
            </Container>

            <ButtonCta text="Explore my portfolio" to="https://tshepiem.dev" />
          </Container>

          <Footer from_email={data.dev_email} to_email={data.email} />
        </Container>
      </Body>
    </Html>
  );
}
