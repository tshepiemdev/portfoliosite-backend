import * as React from "react";
import { Html, Body, Text, Preview, Container } from "@react-email/components";
import Footer from "../components/Footer";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface SubscriptionConfirmationData {
  email: string;
  unsubscribeUrl: string;
}

interface SubscriptionConfirmationProps {
  data: SubscriptionConfirmationData;
}

export default function SubscriptionConfirmation({
  data,
}: SubscriptionConfirmationProps) {
  const textStyle = {
    fontSize: "14px",
    lineHeight: "1.2",
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

  const headerStyle = {
    margin: "28px 0 4px",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
    textTransform: "uppercase" as const,
    color: "#666666",
  };

  return (
    <Html>
      <Preview>Congratulations! Your blog subscription is now active.</Preview>

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
              padding: "16px",
            }}
          >
            <EmailLogo />

            <EmailTitle marginBottom="32">
              Congratulations!
              <br />
              Your Blog Subscription
              <br />
              Is Now Active
            </EmailTitle>

            <Container style={{ margin: 0, marginBottom: "32px" }}>
              <Text style={textStyle}>Hi there,</Text>

              <Text style={textStyle}>
                Thank you for confirming your email address. You're now
                subscribed to the tshepiem&#8203;.dev blog and will receive
                updates whenever new articles are published.
              </Text>

              <Text style={headerStyle}>Your subscription details:</Text>

              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <li style={listStyle}>
                  Email:{" "}
                  <span
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {data.email}
                  </span>
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
                  Status: Active
                </li>
              </ul>
            </Container>

            <Text
              style={{
                fontSize: "12px",
                lineHeight: "1.5",
                margin: "48px 0 16px",
                opacity: 0.8,
              }}
            >
              *You can unsubscribe at any time using the unsubscribe link
              included in every newsletter and this email.
            </Text>
          </Container>

          <Footer to_email={data.email} unsubscribeUrl={data.unsubscribeUrl} />
        </Container>
      </Body>
    </Html>
  );
}
