import * as React from "react";
import { Html, Body, Text, Preview, Container } from "@react-email/components";
import Footer from "../components/Footer";
import ButtonCta from "../components/ButtonCta";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface ServiceRequestData {
  mail_ref: string;
  firstName: string;
  lastName: string;
  email: string;
  dev_email: string;
  phone?: string;
  country?: string;
  company?: string;
  service?: string;
  serviceType?: string;
  pricingAlias?: string;
  package?: string;
  packageType?: string;
  price?: number | null;
  pricingType?: string;
  budget?: string;
  startTime?: string;
  message: string;
}

interface ServiceRequestFormProps {
  data: ServiceRequestData;
}

export default function ServiceRequestForm({ data }: ServiceRequestFormProps) {
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
    fontSize: "14px",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
  };

  const listStyle = {
    margin: "2px 0",
    fontSize: "16px",
    lineHeight: "1.4",
    fontFamily: "'Instrument Serif', Georgia, serif",
    padding: "8px 0",
    borderBottom: "1.5px dotted #CCCCCC",
  };

  return (
    <Html>
      <Preview>
        New service request received from {data.firstName} {data.lastName}.
      </Preview>

      <Body
        style={{
          margin: 0,
          padding: "12px 0 0",
          backgroundColor: "#FFFFFF",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: 0,
          }}
        >
          <Container
            style={{
              margin: 0,
              padding: "16px 16px 48px",
            }}
          >
            <EmailLogo />

            <EmailTitle>
              New Service Request
              <br />
              Received. Review and
              <br />
              Provide Follow Up
            </EmailTitle>

            <Text style={textStyle}>
              A new service request has been submitted through the portfolio
              website service request form.
            </Text>

            <Text style={headerStyle}>Reference</Text>

            <Text style={textStyle}>{data.mail_ref}</Text>

            <Text style={headerStyle}>Client Information</Text>

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              <li style={listStyle}>
                Name: {data.firstName} {data.lastName}
              </li>

              <li style={listStyle}>Email: {data.email}</li>

              <li style={listStyle}>Phone: {data.phone || "N/A"}</li>

              <li style={listStyle}>Country: {data.country || "N/A"}</li>

              <li
                style={{
                  margin: "2px 0",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  padding: "8px 0",
                }}
              >
                Company: {data.company || "N/A"}
              </li>
            </ul>

            <Text style={headerStyle}>Service Details</Text>

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              <li style={listStyle}>Service: {data.service || "N/A"}</li>

              <li style={listStyle}>
                Service Type: {data.serviceType || "N/A"}
              </li>

              <li style={listStyle}>Package: {data.package || "N/A"}</li>

              <li style={listStyle}>
                Package Type: {data.packageType || "N/A"}
              </li>

              {data.price != null && (
                <li style={listStyle}>
                  Price: R{data.price.toLocaleString("en-ZA")}
                </li>
              )}

              <li style={listStyle}>
                Pricing Type: {data.pricingType || "N/A"}
              </li>

              <li style={listStyle}>Budget: {data.budget || "N/A"}</li>

              <li
                style={{
                  margin: "2px 0",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  padding: "8px 0",
                }}
              >
                Preferred Start: {data.startTime || "N/A"}
              </li>
            </ul>

            <Text style={headerStyle}>Project Message</Text>

            <Text
              style={{
                margin: "2px 0 32px",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {data.message}
            </Text>

            <ButtonCta
              text="Reply to client"
              to={`mailto:${data.email}?subject=Re: Your Service Request (${data.mail_ref})`}
            />
          </Container>

          <Footer to_email={data.email} />
        </Container>
      </Body>
    </Html>
  );
}
