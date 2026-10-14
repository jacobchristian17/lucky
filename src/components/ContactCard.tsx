"use client";

import { useState } from "react";

type Props = { email: string; phone: string; facebook: string; linkedin: string };

// "09562765243" -> "0956 276 5243" for display, "+639562765243" for the sms: link.
const formatPhone = (p: string) => p.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 $2 $3");
const intlPhone = (p: string) => p.replace(/^0/, "+63");
const profileName = (url: string) => url.replace(/\/+$/, "").split("/").pop() ?? url;

const icons = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.1H8.2v3h2.6V21" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.5-3s2.5 1 2.5 3V17" />
    </svg>
  ),
};

type Channel = {
  id: keyof typeof icons;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  actions: { label: string; href?: string; copy?: string; external?: boolean }[];
};

export default function ContactCard({ email, phone, facebook, linkedin }: Props) {
  const [status, setStatus] = useState("");

  const channels: Channel[] = [
    {
      id: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      actions: [
        { label: "Send email", href: `mailto:${email}` },
        { label: "Copy", copy: email },
      ],
    },
  ];
  if (phone) {
    channels.push({
      id: "phone",
      label: "Phone",
      value: formatPhone(phone),
      actions: [
        { label: "Text", href: `sms:${intlPhone(phone)}` },
        { label: "Copy", copy: phone },
      ],
    });
  }
  if (facebook) {
    channels.push({
      id: "facebook",
      label: "Facebook",
      value: profileName(facebook),
      href: facebook,
      external: true,
      actions: [
        { label: "View profile", href: facebook, external: true },
        { label: "Message", href: `https://m.me/${profileName(facebook)}`, external: true },
      ],
    });
  }
  if (linkedin) {
    channels.push({
      id: "linkedin",
      label: "LinkedIn",
      value: profileName(linkedin),
      href: linkedin,
      external: true,
      actions: [{ label: "View profile", href: linkedin, external: true }],
    });
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`${label} copied to your clipboard.`);
    } catch {
      setStatus(`Couldn't copy automatically. Select the ${label.toLowerCase()} and copy it.`);
    }
    setTimeout(() => setStatus(""), 2500);
  }

  const external = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <div className="contact-methods">
      <ul className="channels">
        {channels.map((c) => (
          <li key={c.id} className="channel" data-reveal>
            <span className="channel-icon">{icons[c.id]}</span>
            <div className="channel-body">
              <p className="meta">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="channel-value" {...(c.external ? external : {})}>
                  {c.value}
                </a>
              ) : (
                <span className="channel-value">{c.value}</span>
              )}
              <div className="channel-actions">
                {c.actions.map((a, i) =>
                  a.copy ? (
                    <button
                      key={a.label}
                      type="button"
                      className="btn btn-sm"
                      onClick={() => copy(a.copy!, c.id === "email" ? "Email address" : "Phone number")}
                    >
                      {a.label}
                    </button>
                  ) : (
                    <a
                      key={a.label}
                      href={a.href}
                      className={`btn btn-sm${i === 0 ? " btn-primary" : ""}`}
                      {...(a.external ? external : {})}
                    >
                      {a.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="copy-status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
