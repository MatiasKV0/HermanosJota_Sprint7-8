//iconos
const MailIcon = () => (
  <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
      clipRule="evenodd"
    />
  </svg>
);

const ChatIcon = () => (
  <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ContactoInfo() {
  const info = [
    {
      key: "email-general",
      icon: <MailIcon />,
      label: "Email general",
      value: "info@hermanosjota.com.ar",
      href: "mailto:info@hermanosjota.com.ar",
    },
    {
      key: "ventas",
      icon: <MailIcon />,
      label: "Ventas",
      value: "ventas@hermanosjota.com.ar",
      href: "mailto:ventas@hermanosjota.com.ar",
    },
    {
      key: "whatsapp",
      icon: <PhoneIcon />,
      label: "WhatsApp",
      value: "+54 11 4567-8900",
      href: "https://wa.me/5411456789000",
    },
    {
      key: "sitio",
      icon: <GlobeIcon />,
      label: "Sitio web",
      value: "www.hermanosjota.com.ar",
      href: "https://www.hermanosjota.com.ar",
    },
    {
      key: "instagram",
      icon: <ChatIcon />,
      label: "Instagram",
      value: "@hermanosjota_ba",
      href: "https://instagram.com/hermanosjota_ba",
    },
  ];

  return (
    <>
      <h3>Contacto Digital</h3>
      {info.map((item) => (
        <div className="info-item" key={item.key}>
          {item.icon}
          <div className="info-text">
            <strong>{item.label}:</strong>
            <br />
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {item.value}
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
