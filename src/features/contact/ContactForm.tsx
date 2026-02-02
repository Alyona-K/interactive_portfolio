import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/Input";
import Textarea from "@/shared/ui/Textarea";
import Button from "@/shared/ui/Button";
import ContactFormResultModal from "@/features/contact/ContactFormResultModal";
import emailjs from "@emailjs/browser";
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "./emailjsConfig";
import {
  contactSchema,
  ContactFormData,
} from "@/features/contact/formValidation";
import "./ContactForm.scss";

/**
 * ContactForm component
 * Handles input state, validation, and submission via EmailJS.
 * Displays success or error modal after submission.
 */
export const ContactForm: React.FC = () => {
  const { t } = useTranslation("common");

  // --- FORM STATE ---
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  // --- VALIDATION ERRORS ---
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  // --- SUBMISSION STATE ---
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(
    null
  );

  // --- INPUT CHANGE HANDLER ---
  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /**
   * Handles form submission
   * Validates inputs with zod schema
   * Sends email via EmailJS
   * Shows modal with success/error state
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- VALIDATE FORM ---
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    setStatus("sending");

    try {
      // --- EMAILJS SUBMISSION ---
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...form,
          time: new Date().toLocaleString(), // include submission timestamp
        },
        PUBLIC_KEY
      );

      // --- RESET FORM & SHOW SUCCESS MODAL ---
      setForm({ name: "", company: "", email: "", message: "" });
      setSubmitResult("success");
      setIsModalOpen(true);
    } catch (err) {
      console.error("EmailJS error:", err);

      // --- SHOW ERROR MODAL ---
      setSubmitResult("error");
      setIsModalOpen(true);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__columns">
          <div className="contact-form__left-col">
            <div className="contact-form__input-wrap">
              <Input
                name="name"
                label={t("formLabels.name")}
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <span className="contact-form__error">{t(errors.name)}</span>
              )}
            </div>

            <div className="contact-form__input-wrap">
              <Input
                name="company"
                label={t("formLabels.company")}
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
              {errors.company && (
                <span className="contact-form__error">{t(errors.company)}</span>
              )}
            </div>

            <div className="contact-form__input-wrap">
              <Input
                name="email"
                type="email"
                label="Email:"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="contact-form__error">{t(errors.email)}</span>
              )}
            </div>
          </div>

          <div className="contact-form__right-col">
            <div className="contact-form__input-wrap">
              <Textarea
                name="message"
                placeholder={t("formLabels.placeholder")}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
              {errors.message && (
                <span className="contact-form__error">{t(errors.message)}</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === "sending"}
              className="contact-form__btn btn"
            >
              {status === "sending" ? t("states.sending") : t("buttons.submit")}
            </Button>
          </div>
        </div>
      </form>

      {/* Modal for submission result */}
      <ContactFormResultModal
        isOpen={isModalOpen}
        result={submitResult}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ContactForm;


///---------------

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Input from "@/shared/ui/Input";
// import Textarea from "@/shared/ui/Textarea";
// import Button from "@/shared/ui/Button";
// import ContactFormResultModal from "@/features/contact/ContactFormResultModal";
// import emailjs from "@emailjs/browser";
// import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "./emailjsConfig";
// import {
//   contactSchema,
//   ContactFormData,
// } from "@/features/contact/formValidation";
// import "./ContactForm.scss";

// export const ContactForm: React.FC = () => {
//   const { t } = useTranslation("common");

//   const [form, setForm] = useState<ContactFormData>({
//     name: "",
//     company: "",
//     email: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<
//     Partial<Record<keyof ContactFormData, string>>
//   >({});

//   const [status, setStatus] = useState<"idle" | "sending">("idle");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(
//     null
//   );

//   const handleChange = (field: keyof ContactFormData, value: string) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Валидация через zod
//     const result = contactSchema.safeParse(form);
//     if (!result.success) {
//       const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
//       result.error.issues.forEach((issue) => {
//         const path = issue.path[0] as keyof ContactFormData;
//         newErrors[path] = issue.message;
//       });
//       setErrors(newErrors);
//       return;
//     }

//     setStatus("sending");

//     try {
//       await emailjs.send(
//         SERVICE_ID,
//         TEMPLATE_ID,
//         {
//           ...form,
//           time: new Date().toLocaleString(),
//         },
//         PUBLIC_KEY
//       );

//       setForm({ name: "", company: "", email: "", message: "" });
//       setSubmitResult("success");
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error("EmailJS error:", err);
//       setSubmitResult("error");
//       setIsModalOpen(true);
//     } finally {
//       setStatus("idle");
//     }
//   };

//   return (
//     <>
//       <form className="contact-form" onSubmit={handleSubmit} noValidate>
//         <div className="contact-form__columns">
//           <div className="contact-form__left-col">
//             <div className="contact-form__input-wrap">
//               <Input
//                 name="name"
//                 label={t("formLabels.name")}
//                 value={form.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//               />
//               {errors.name && (
//                 <span className="contact-form__error">{t(errors.name)}</span>
//               )}
//             </div>

//             <div className="contact-form__input-wrap">
//               <Input
//                 name="company"
//                 label={t("formLabels.company")}
//                 value={form.company}
//                 onChange={(e) => handleChange("company", e.target.value)}
//               />
//               {errors.company && (
//                 <span className="contact-form__error">{t(errors.company)}</span>
//               )}
//             </div>

//             <div className="contact-form__input-wrap">
//               <Input
//                 name="email"
//                 type="email"
//                 label="Email:"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//               />
//               {errors.email && (
//                 <span className="contact-form__error">{t(errors.email)}</span>
//               )}
//             </div>
//           </div>

//           <div className="contact-form__right-col">
//             <div className="contact-form__input-wrap">
//               <Textarea
//                 name="message"
//                 placeholder={t("formLabels.placeholder")}
//                 value={form.message}
//                 onChange={(e) => handleChange("message", e.target.value)}
//               />
//               {errors.message && (
//                 <span className="contact-form__error">{t(errors.message)}</span>
//               )}
//             </div>

//             <Button
//               type="submit"
//               disabled={status === "sending"}
//               className="contact-form__btn btn"
//             >
//               {status === "sending" ? t("states.sending") : t("buttons.submit")}
//             </Button>
//           </div>
//         </div>
//       </form>

//       {/* Модалка для успеха / ошибки */}
//       <ContactFormResultModal
//         isOpen={isModalOpen}
//         result={submitResult}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// };

// export default ContactForm;
