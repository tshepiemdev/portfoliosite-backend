import * as React from "react";
import { Section, Text, Link, Img, Row, Column } from "@react-email/components";

interface FooterProps {
  to_email: string;
  unsubscribeUrl?: string;
}

const navigationLinks = [
  {
    label: "Help Center",
    href: "https://tshepiem.dev/help-center",
  },
  {
    label: "Services",
    href: "https://tshepiem.dev/services",
  },
  {
    label: "Pricing",
    href: "https://tshepiem.dev/pricing",
  },
  {
    label: "Blog",
    href: "https://tshepiem.dev/blog",
  },
  {
    label: "Legal",
    href: "https://tshepiem.dev/legal",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/tshepiem.dev",
    icon: "https://res.cloudinary.com/dea3pml8w/image/upload/instagram-logo-fill.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tshepangkgaphola",
    icon: "https://res.cloudinary.com/dea3pml8w/image/upload/linkedin.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/tshepiemdev",
    icon: "https://res.cloudinary.com/dea3pml8w/image/upload/github-icon.svg",
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@tshepiem.dev",
    icon: "https://res.cloudinary.com/dea3pml8w/image/upload/threads.svg",
  },
  {
    name: "Twitter/X",
    href: "https://x.com/tshepiem.dev",
    icon: "https://res.cloudinary.com/dea3pml8w/image/upload/twitter.svg",
  },
];

export default function Footer({ to_email, unsubscribeUrl }: FooterProps) {
  const linkStyle = {
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
    color: "#666",
  };

  const textStyle = {
    margin: 0,
    marginTop: "12px",
    fontSize: "12.5px",
    color: "#666",
    lineHeight: "1.4",
    fontFamily: "Arial, sans-serif",
    maxWidth: "460px",
  };

  const iconColumnStyle = {
    paddingRight: "12px",
    opacity: 0.5,
    verticalAlign: "middle",
  };

  return (
    <Section
      style={{
        margin: 0,
        padding: "24px 16px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f2f0",
      }}
    >
      <Section style={{ margin: 0 }}>
        {navigationLinks.map(({ label, href }) => (
          <Row
            key={href}
            style={{
              margin: "4px 0 0",
            }}
          >
            <Link style={linkStyle} href={href}>
              {label}
            </Link>
          </Row>
        ))}

        {unsubscribeUrl && (
          <Row style={{ margin: "4px 0 0" }}>
            <Link style={linkStyle} href={unsubscribeUrl}>
              Unsubscribe
            </Link>
          </Row>
        )}
      </Section>

      <Section
        style={{
          margin: 0,
          width: "164px",
        }}
      >
        <Row
          style={{
            margin: "22px 0 12px",
          }}
        >
          {socialLinks.map(({ name, href, icon }, index) => (
            <Column
              key={href}
              style={{
                width: "22px",
                padding: 0,
                paddingRight: index < socialLinks.length - 1 ? "6px" : 0,
                verticalAlign: "middle",
              }}
            >
              <Link
                href={href}
                style={{
                  display: "block",
                  width: "22px",
                  height: "22px",
                }}
              >
                <Img
                  src={icon}
                  alt={name}
                  width="22"
                  height="22"
                  style={{
                    display: "block",
                    width: "22px",
                    height: "22px",
                    opacity: 0.5,
                  }}
                />
              </Link>
            </Column>
          ))}
        </Row>
      </Section>

      <Text style={textStyle}>
        This is an automated confirmation from tshepiem&#8203;.dev. You are
        receiving this email because a form submission was made using your email
        address{" "}
        <Link
          style={{
            color: "#666",
            textDecoration: "underline",
          }}
          href={`mailto:${to_email}`}
        >
          {to_email}
        </Link>{" "}
        through the tshepiem&#8203;.dev website.
      </Text>

      <Text style={textStyle}>
        &copy; 2026 tshepiem&#8203;.dev. All rights reserved.
      </Text>

      <Row
        style={{
          marginTop: "8px",
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
            width="12"
            height="12"
            alt="tshepiem.dev logo"
            style={{
              display: "block",
            }}
          />
        </Column>

        <Column>
          <Text
            style={{
              margin: "1px 0 0",
              fontSize: "14.5px",
              lineHeight: "14px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <strong>tshepiem&#8203;.dev</strong>
          </Text>
        </Column>
      </Row>
    </Section>
  );
}
