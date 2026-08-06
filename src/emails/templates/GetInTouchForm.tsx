import * as React from "react";
import { Html, Body, Text, Preview, Container } from "@react-email/components";
import Footer from "../components/Footer";
import ButtonCta from "../components/ButtonCta";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface GetInTouchRequestData {
  mail_ref: string;
  firstName: string;
  lastName: string;
  email: string;
  dev_email: string;
  phone?: string;
  country?: string;
  reason?: string;
  teamSize?: string;
  message: string;
}

interface GetInTouchRequestFormProps {
  data: GetInTouchRequestData;
}

export default function GetInTouchRequestForm({
  data,
}: GetInTouchRequestFormProps) {
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
        New contact message received from {data.firstName} {data.lastName}.
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
              New Contact Message
              <br />
              Received. Review and
              <br />
              Provide Follow Up
            </EmailTitle>

            <Text style={textStyle}>
              A new message has been submitted through the portfolio website
              contact form.
            </Text>

            <Text style={headerStyle}>Reference</Text>

            <Text style={textStyle}>{data.mail_ref}</Text>

            <Text style={headerStyle}>Contact Information</Text>

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

              <li
                style={{
                  margin: "2px 0",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  padding: "8px 0",
                }}
              >
                Country: {data.country || "N/A"}
              </li>
            </ul>

            <Text style={headerStyle}>Inquiry Details</Text>

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
                Team Size: {data.teamSize || "N/A"}
              </li>
            </ul>

            <Text style={headerStyle}>Message</Text>

            <Text
              style={{
                margin: "2px 0 32px",
                fontSize: "16px",
                lineHeight: "1.5",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {data.message}
            </Text>

            <ButtonCta
              text="Reply to client"
              to={`mailto:${data.email}?subject=Re: Your Contact Request (${data.mail_ref})`}
            />
          </Container>

          <Footer from_email={data.dev_email} to_email={data.email} />
        </Container>
      </Body>
    </Html>
  );
}
