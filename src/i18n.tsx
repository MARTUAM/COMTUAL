import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ES' | 'EN';

const translations = {
  ES: {
    nav: {
      inicio: "Inicio",
      representacion: "Representación",
      servicios: "Servicios",
      contacto: "Contacto",
      portal: "Portal"
    },
    hero: {
      title1: "Oficina de Representación",
      title2: "Jurídico-Operativa",
      title3: "México–Estados Unidos",
      description: "Operación, gestión y respaldo estructurado para despachos, empresas y procesos binacionales.",
      badges: [],
      progress: {
        step1: "Estructura Formal",
        step2: "Control Operativo",
        step3: "Certidumbre Jurídica"
      }
    },
    representacion: {
      badge: "01 // Identidad",
      title1: "Enlace Institucional",
      title2: "en Territorio Mexicano",
      description: "COMTUAL actúa como enlace institucional en México para despachos y entidades en Estados Unidos que requieren gestión documental, coordinación administrativa y respaldo operativo.",
      cards: {
        main: {
          title: "Estructura Formal y Trazabilidad",
          description: "Operamos bajo estructura formal, control documental y trazabilidad digital, permitiendo que los procesos se desarrollen sin necesidad de desplazamientos ni intermediaciones informales.",
          stat1: "Control Digital",
          stat2: "Intermediarios"
        },
        secondary: {
          title: "Diferenciador Clave",
          description: "No asesoramos desde la distancia. Ejecutamos y representamos localmente con estándares internacionales.",
          tag1: "Local",
          tag2: "Global"
        }
      }
    },
    enfoque: {
      badge: "NUESTRO ENFOQUE CENTRAL",
      title: "Aliados Estratégicos",
      partners: [
        {
          title: "Despachos legales en EE.UU.",
          desc: "Representación y gestión de trámites en México para firmas estadounidenses."
        },
        {
          title: "Firmas laborales",
          desc: "Soporte en procesos laborales transfronterizos y verificación de antecedentes."
        },
        {
          title: "Firmas migratorias",
          desc: "Asistencia en la obtención de documentación y certificaciones mexicanas."
        },
        {
          title: "Aseguradoras",
          desc: "Investigación y validación de siniestros o reclamaciones en territorio mexicano."
        },
        {
          title: "Empresas con trabajadores",
          desc: "Gestión de nómina, cumplimiento normativo y enlace corporativo."
        },
        {
          title: "Gestión de indemnizaciones",
          desc: "Rastreo de beneficiarios y formalización de pagos en México."
        }
      ]
    },
    servicios: {
      badge: "POR QUÉ ELEGIRNOS",
      title1: "Soluciones",
      title2: "Estratégicas",
      items: [
        {
          title: "Gestión documental certificada",
          items: [
            "Obtención de actas en cualquier entidad.",
            "Búsquedas registrales.",
            "Certificaciones oficiales.",
            "Coordinación de apostillas."
          ]
        },
        {
          title: "Indemnizaciones y sucesiones",
          items: [
            "Representación de beneficiarios.",
            "Trámites ante juntas.",
            "Enlace operativo binacional.",
            "Gestión de pagos."
          ]
        },
        {
          title: "Representación administrativa",
          items: [
            "Comparecencias.",
            "Gestión ante dependencias.",
            "Coordinación notarial.",
            "Cumplimiento normativo."
          ]
        }
      ]
    },
    modelo: {
      badge: "ESTRUCTURA",
      title1: "Modelo de",
      title2: "Negocio",
      title3: "Recomendado",
      items: [
        { title: "Facturación en USD", desc: "Estructura corporativa en EE.UU. para facilitar pagos." },
        { title: "Procesos documentados", desc: "Trazabilidad en cada etapa del servicio." },
        { title: "Portal de seguimiento", desc: "Acceso 24/7 al estatus de sus asuntos." },
        { title: "Tiempos definidos", desc: "SLA's claros para cada tipo de trámite." },
        { title: "Política clara", desc: "Cero tolerancia a la corrupción y prácticas informales." }
      ]
    },
    contacto: {
      title1: "Inicie una",
      title2: "Conversación",
      subtitle: "Contáctenos para evaluar cómo podemos estructurar la representación de sus intereses en México.",
      form: {
        name: "Nombre Completo",
        company: "Empresa / Firma",
        email: "Correo Electrónico",
        message: "Mensaje",
        messagePlaceholder: "Describa brevemente su requerimiento...",
        submit: "ENVIAR MENSAJE",
        sending: "Enviando...",
        success: "Mensaje enviado correctamente.",
        errors: {
          nameRequired: "El nombre es requerido",
          nameLength: "El nombre debe tener al menos 3 caracteres",
          emailRequired: "El correo es requerido",
          emailInvalid: "Ingrese un correo electrónico válido",
          messageRequired: "El mensaje es requerido",
          messageLength: "El mensaje debe tener al menos 10 caracteres"
        }
      },
      info: {
        address: "Ciudad de México, México",
        email: "contacto@comtual.com",
        phone: "+52 (55) 1234-5678"
      }
    },
    footer: {
      description: "Representación institucional en México para asuntos jurídicos y documentales vinculados con Estados Unidos.",
      nav: {
        title: "Navegación"
      },
      legal: {
        title: "Legal",
        privacy: "Aviso de Privacidad",
        terms: "Términos de Uso"
      },
      rights: "Todos los derechos reservados."
    },
    portal: {
      title: "Portal",
      email: "Correo Electrónico",
      password: "Contraseña",
      folio: "Número de folio",
      login: "Iniciar Sesión",
      validate: "Validar Folio",
      sendCode: "Enviar Código",
      forgotPasswordDesc: "Introduce tu correo electrónico y tu número de folio, los validaremos y recibirás un correo con un código de verificación.",
      forgotPasswordLink: "¿Olvidaste tu contraseña?",
      registerLink: "¿No tienes cuenta? Regístrate",
      loginLink: "¿Ya tienes cuenta? Inicia sesión"
    },
    legal: {
      title: "Legal",
      content1: "Toda la información contenida en este sitio web es de carácter informativo y no constituye asesoría legal formal. COMTUAL actúa como una oficina de representación y enlace institucional, facilitando procesos y gestiones en territorio mexicano para entidades extranjeras.",
      content2: "El uso de este sitio web y de nuestros servicios está sujeto a los términos y condiciones aquí descritos. Nos reservamos el derecho de modificar esta información en cualquier momento sin previo aviso."
    },
    privacy: {
      title: "Aviso de Privacidad",
      content1: "En COMTUAL, nos comprometemos a proteger la privacidad y seguridad de sus datos personales. La información recopilada a través de este sitio web o en el transcurso de nuestros servicios se utiliza exclusivamente para los fines acordados y en cumplimiento con las leyes de protección de datos aplicables en México.",
      content2: "No compartimos, vendemos ni distribuimos su información a terceros sin su consentimiento expreso, salvo cuando sea requerido por mandato legal o para la correcta ejecución de los servicios contratados."
    },
    terms: {
      title: "Términos de Uso",
      content1: "Al acceder y utilizar el sitio web de COMTUAL, usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio.",
      content2: "El contenido de este sitio, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de COMTUAL y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción o distribución sin autorización previa."
    }
  },
  EN: {
    nav: {
      inicio: "Home",
      representacion: "Representation",
      servicios: "Services",
      contacto: "Contact",
      portal: "Portal"
    },
    hero: {
      title1: "Representation Office",
      title2: "Legal-Operational",
      title3: "Mexico–United States",
      description: "Operation, management, and structured support for law firms, companies, and binational processes.",
      badges: [],
      progress: {
        step1: "Formal Structure",
        step2: "Operational Control",
        step3: "Legal Certainty"
      }
    },
    representacion: {
      badge: "01 // Identity",
      title1: "Institutional Liaison",
      title2: "in Mexican Territory",
      description: "COMTUAL acts as an institutional liaison in Mexico for law firms and entities in the United States that require document management, administrative coordination, and operational support.",
      cards: {
        main: {
          title: "Formal Structure and Traceability",
          description: "We operate under a formal structure, document control, and digital traceability, allowing processes to develop without the need for travel or informal intermediation.",
          stat1: "Digital Control",
          stat2: "Intermediaries"
        },
        secondary: {
          title: "Key Differentiator",
          description: "We don't advise from a distance. We execute and represent locally with international standards.",
          tag1: "Local",
          tag2: "Global"
        }
      }
    },
    enfoque: {
      badge: "OUR CORE FOCUS",
      title: "Strategic Allies",
      partners: [
        {
          title: "US Law Firms",
          desc: "Representation and management of procedures in Mexico for US firms."
        },
        {
          title: "Labor Firms",
          desc: "Support in cross-border labor processes and background checks."
        },
        {
          title: "Immigration Firms",
          desc: "Assistance in obtaining Mexican documentation and certifications."
        },
        {
          title: "Insurance Companies",
          desc: "Investigation and validation of claims in Mexican territory."
        },
        {
          title: "Companies with Employees",
          desc: "Payroll management, regulatory compliance, and corporate liaison."
        },
        {
          title: "Compensation Management",
          desc: "Tracing of beneficiaries and formalization of payments in Mexico."
        }
      ]
    },
    servicios: {
      badge: "WHY CHOOSE US",
      title1: "Strategic",
      title2: "Solutions",
      items: [
        {
          title: "Certified Document Management",
          items: [
            "Obtaining certificates in any entity.",
            "Registry searches.",
            "Official certifications.",
            "Apostille coordination."
          ]
        },
        {
          title: "Compensations and Successions",
          items: [
            "Representation of beneficiaries.",
            "Procedures before boards.",
            "Binational operational liaison.",
            "Payment management."
          ]
        },
        {
          title: "Administrative Representation",
          items: [
            "Appearances.",
            "Management before agencies.",
            "Notary coordination.",
            "Regulatory compliance."
          ]
        }
      ]
    },
    modelo: {
      badge: "STRUCTURE",
      title1: "Recommended",
      title2: "Business",
      title3: "Model",
      items: [
        { title: "Invoicing in USD", desc: "Corporate structure in the US to facilitate payments." },
        { title: "Documented Processes", desc: "Traceability at each stage of the service." },
        { title: "Tracking Portal", desc: "24/7 access to the status of your matters." },
        { title: "Defined Times", desc: "Clear SLAs for each type of procedure." },
        { title: "Clear Policy", desc: "Zero tolerance for corruption and informal practices." }
      ]
    },
    contacto: {
      title1: "Start a",
      title2: "Conversation",
      subtitle: "Contact us to evaluate how we can structure the representation of your interests in Mexico.",
      form: {
        name: "Full Name",
        company: "Company / Firm",
        email: "Email Address",
        message: "Message",
        messagePlaceholder: "Briefly describe your requirement...",
        submit: "SEND MESSAGE",
        sending: "Sending...",
        success: "Message sent successfully.",
        errors: {
          nameRequired: "Name is required",
          nameLength: "Name must be at least 3 characters",
          emailRequired: "Email is required",
          emailInvalid: "Enter a valid email address",
          messageRequired: "Message is required",
          messageLength: "Message must be at least 10 characters"
        }
      },
      info: {
        address: "Mexico City, Mexico",
        email: "contact@comtual.com",
        phone: "+52 (55) 1234-5678"
      }
    },
    footer: {
      description: "Institutional representation in Mexico for legal and documentary matters linked to the United States.",
      nav: {
        title: "Navigation"
      },
      legal: {
        title: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Use"
      },
      rights: "All rights reserved."
    },
    portal: {
      title: "Portal",
      email: "Email Address",
      password: "Password",
      folio: "Folio Number",
      login: "Log In",
      validate: "Validate Folio",
      sendCode: "Send Code",
      forgotPasswordDesc: "Enter your email address and your folio number, we will validate them and you will receive an email with a verification code.",
      forgotPasswordLink: "Forgot your password?",
      registerLink: "Don't have an account? Sign up",
      loginLink: "Already have an account? Log in"
    },
    legal: {
      title: "Legal",
      content1: "All information contained on this website is for informational purposes and does not constitute formal legal advice. COMTUAL acts as a representation office and institutional liaison, facilitating processes and procedures in Mexican territory for foreign entities.",
      content2: "The use of this website and our services is subject to the terms and conditions described herein. We reserve the right to modify this information at any time without prior notice."
    },
    privacy: {
      title: "Privacy Policy",
      content1: "At COMTUAL, we are committed to protecting the privacy and security of your personal data. The information collected through this website or in the course of our services is used exclusively for the agreed purposes and in compliance with applicable data protection laws in Mexico.",
      content2: "We do not share, sell, or distribute your information to third parties without your express consent, except when required by legal mandate or for the proper execution of the contracted services."
    },
    terms: {
      title: "Terms of Use",
      content1: "By accessing and using the COMTUAL website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our site.",
      content2: "The content of this site, including texts, graphics, logos, and images, is the property of COMTUAL and is protected by intellectual property laws. Its reproduction or distribution without prior authorization is prohibited."
    }
  }
};

type Translations = typeof translations.ES;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('ES');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
