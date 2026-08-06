import * as React from "react";
import { Section, Text, Link, Img, Row, Column } from "@react-email/components";

interface FooterProps {
  from_email: string;
  to_email: string;
  unsubscribeUrl?: string;
}

export default function Footer({
  from_email,
  to_email,
  unsubscribeUrl,
}: FooterProps) {
  const legalStyle = {
    margin: 0,
    marginRight: "12px",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
    color: "#666",
    textDecoration: "underline",
  };

  const linkColumnStyle = {
    width: "24px",
    height: "24px",
  };

  const iconColumnStyle = {
    margin: 0,
    width: "12px",
    height: "12px",
    paddingRight: "12px",
    opacity: "0.5",
  };

  return (
    <Section
      style={{
        margin: 0,
        marginTop: "0px",
        padding: "24px 16px 24px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f2f0",
      }}
    >
      <Text
        style={{
          margin: "0",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.4",
          fontFamily: "Arial, sans-serif",
        }}
      >
        This is an automated confirmation from tshepiem&#8203;.dev. This email
        was sent to <Link href={`mailto:${to_email}`}>{to_email}</Link> because
        a form was submitted through{" "}
        <Link href="https://tshepiem.dev">tshepiem&#8203;.dev</Link>.
      </Text>

      <Section>
        <Row style={{ margin: 0, marginTop: "16px" }}>
          <Column style={linkColumnStyle}>
            <Link style={legalStyle} href="https://tshepiem.dev/blog">
              Blog
            </Link>
          </Column>

          <Column style={linkColumnStyle}>
            <Link style={legalStyle} href="https://tshepiem.dev/services">
              Services
            </Link>
          </Column>

          <Column style={linkColumnStyle}>
            <Link style={legalStyle} href="https://tshepiem.dev/pricing">
              Pricing
            </Link>
          </Column>

          <Column style={linkColumnStyle}>
            <Link style={legalStyle} href="https://tshepiem.dev/legal">
              Legal
            </Link>
          </Column>

          <Column style={linkColumnStyle}>
            <Link style={legalStyle} href="https://tshepiem.dev/help-center">
              Help
            </Link>
          </Column>

          <Column>
            {unsubscribeUrl && (
              <Link style={legalStyle} href={unsubscribeUrl}>
                Unsubscribe
              </Link>
            )}
          </Column>
        </Row>
      </Section>

      <Section>
        <Row style={{ margin: "22px 0" }}>
          <Column style={iconColumnStyle}>
            <Link href="https://www.instagram.com/tshepiem.dev">
              <Img
                src="https://res.cloudinary.com/dea3pml8w/image/upload/instagram-logo-fill.svg"
                alt="Instagram"
                width="22"
                height="22"
              />
            </Link>
          </Column>

          <Column style={iconColumnStyle}>
            <Link href="https://www.linkedin.com/in/tshepangkgaphola">
              <Img
                src="https://res.cloudinary.com/dea3pml8w/image/upload/linkedin.svg"
                alt="LinkedIn"
                width="22"
                height="22"
              />
            </Link>
          </Column>

          <Column style={iconColumnStyle}>
            <Link href="https://github.com/tshepiemdev">
              <Img
                src="https://res.cloudinary.com/dea3pml8w/image/upload/github-icon.svg"
                alt="GitHub"
                width="22"
                height="22"
              />
            </Link>
          </Column>

          <Column style={iconColumnStyle}>
            <Link href="https://www.threads.com/@tshepiem.dev">
              <Img
                src="https://res.cloudinary.com/dea3pml8w/image/upload/threads.svg"
                alt="Threads"
                width="22"
                height="22"
              />
            </Link>
          </Column>

          <Column style={{ opacity: "0.5" }}>
            <Link href="https://x.com/tshepiem.dev">
              <Img
                src="https://res.cloudinary.com/dea3pml8w/image/upload/twitter.svg"
                alt="Twitter/X"
                width="22"
                height="22"
              />
            </Link>
          </Column>
        </Row>
      </Section>

      <Row
        style={{
          marginTop: "16px",
          marginBottom: "8px",
        }}
      >
        <Column
          style={{
            width: "18px",
            verticalAlign: "middle",
          }}
        >
          <Img
            src="https://res.cloudinary.com/dea3pml8w/image/upload/tshepiem.dev-logo.svg"
            width="14"
            height="14"
            alt="tshepiem.dev logo"
            style={{
              display: "block",
            }}
          />
        </Column>

        <Column>
          <Text
            style={{
              margin: "0",
              marginTop: "1px",
              fontSize: "14px",
              lineHeight: "14px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <strong>tshepiem&#8203;.dev</strong>
          </Text>
        </Column>
      </Row>

      <Text
        style={{
          margin: "0",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.4",
          fontFamily: "Arial, sans-serif",
          maxWidth: "400px",
        }}
      >
        &copy; 2026 tshepiem&#8203;.dev. All rights reserved. Creative & skilled
        developer based in South Africa, Pretoria.
      </Text>
    </Section>
  );
}
