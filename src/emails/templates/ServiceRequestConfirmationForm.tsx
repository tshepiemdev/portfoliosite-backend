import * as React from "react";
import { Html, Body, Text, Preview, Container } from "@react-email/components";
import Footer from "../components/Footer";
import ButtonCta from "../components/ButtonCta";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface ServiceRequestConfirmationData {
  mail_ref: string;
  firstName: string;
  email: string;
  dev_email: string;
  service?: string;
  serviceType?: string;
  pricingAlias?: string;
  package?: string;
  packageType?: string;
  price?: number | null;
}

interface ServiceRequestConfirmationFormProps {
  data: ServiceRequestConfirmationData;
}

export default function ServiceRequestConfirmationForm({
  data,
}: ServiceRequestConfirmationFormProps) {
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
        Thank you for submitting your service request. I will review the details
        provided and get back to you with the next steps.
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
              Your Service Request
              <br />
              Was Received
            </EmailTitle>

            <Container style={{ margin: 0, marginBottom: "32px" }}>
              <Text style={textStyle}>Hi {data.firstName},</Text>

              <Text style={{ fontSize: "16px", lineHeight: "1.5" }}>
                Thank you for submitting your service request. I will review the
                details you provided and get back to you with the next steps.
              </Text>

              <Text style={headerStyle}>Summary</Text>

              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <li style={listStyle}>Service: {data.service || "N/A"}</li>

                <li style={listStyle}>Package: {data.package || "N/A"}</li>

                {data.price != null && (
                  <li
                    style={{
                      margin: "2px 0",
                      fontSize: "18px",
                      lineHeight: "1.4",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      padding: "8px 0",
                    }}
                  >
                    Starting Price: R{data.price.toLocaleString("en-ZA")}
                  </li>
                )}
              </ul>

              <Text style={headerStyle}>Reference</Text>

              <Text style={textStyle}>{data.mail_ref}</Text>

              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  paddingTop: "16px",
                  borderTop: "2.5px dotted #CCCCCC",
                  marginTop: "32px",
                }}
              >
                I will contact you soon with the next steps. This email confirms
                that your service request has been received. You can expect a
                response within 7 business days.
              </Text>

              <Text
                style={{
                  fontSize: "12px",
                  lineHeight: "1.5",
                  margin: "48px 0 16px",
                  opacity: 0.8,
                }}
              >
                *Please note that approval of your service request depends on
                current developer availability and available resources.
              </Text>
            </Container>

            <ButtonCta
              text="Browse more services"
              to="https://tshepiem.dev/services"
            />
          </Container>

          <Footer from_email={data.dev_email} to_email={data.email} />
        </Container>
      </Body>
    </Html>
  );
}
