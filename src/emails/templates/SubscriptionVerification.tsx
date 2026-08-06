import * as React from "react";
import {
  Html,
  Body,
  Text,
  Preview,
  Container,
  Link,
} from "@react-email/components";
import Footer from "../components/Footer";
import ButtonCta from "../components/ButtonCta";
import EmailTitle from "../components/EmailTitle";
import EmailLogo from "../components/EmailLogo";

export interface SubscriptionVerificationData {
  email: string;
  verifyUrl: string;
  unsubscribeUrl: string;
}

interface SubscriptionVerificationProps {
  data: SubscriptionVerificationData;
}

export default function SubscriptionVerification({
  data,
}: SubscriptionVerificationProps) {
  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
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
        Confirm your subscription to receive new articles from tshepiem.dev
        blog.
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
              Confirm Your
              <br />
              Blog Subscription
            </EmailTitle>

            <Container style={{ margin: 0, marginBottom: "16px" }}>
              <Text style={textStyle}>Hi there,</Text>

              <Text style={textStyle}>
                Thank you for subscribing to tshepiem&#8203;.dev blog. Please
                confirm your email address to start receiving new articles
                directly in your inbox.{" "}
                <Link
                  href="https://tshepiem.dev/legal/tshepiemdev-website-blog-subscription-terms"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Terms.
                </Link>{" "}
                apply.
              </Text>

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
                  Status: Pending (Awaiting your confirmation)
                </li>
              </ul>
            </Container>

            <ButtonCta text="Confirm Subscription" to={data.verifyUrl} />

            <Text
              style={{
                fontSize: "12px",
                lineHeight: "1.5",
                margin: "48px 0 16px",
                opacity: 0.8,
              }}
            >
              *If you did not request this subscription, you can safely ignore
              this email or alternatively contact support@tshepiem.dev.
            </Text>
          </Container>

          <Footer
            from_email="hello@tshepiem.dev"
            to_email={data.email}
            unsubscribeUrl={data.unsubscribeUrl}
          />
        </Container>
      </Body>
    </Html>
  );
}
