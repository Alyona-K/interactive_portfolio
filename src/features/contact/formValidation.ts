import { z } from "zod";

// --- NAME SCHEMA ---
// Ensures name contains only letters, spaces, apostrophes, or hyphens
const nameSchema = z
  .string()
  .min(1, "errors.name.required")
  .superRefine((val, ctx) => {
    if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(val)) {
      ctx.addIssue({
        code: "custom",
        message: "errors.name.invalid",
      });
    }
  });

// --- COMPANY SCHEMA ---
// Minimal requirement: at least 1 character
const companySchema = z.string().min(1, "errors.company.required");

// --- EMAIL SCHEMA ---
// Validates basic email format
const emailSchema = z
  .string()
  .min(1, "errors.email.required")
  .superRefine((val, ctx) => {
    if (val && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(val)) {
      ctx.addIssue({
        code: "custom",
        message: "errors.email.invalid",
      });
    }
  });

// --- MESSAGE SCHEMA ---
// Minimal length + client-side guard against obvious XSS patterns
// Full sanitization must occur on the server
const messageSchema = z
  .string()
  .min(10, "errors.message.minLength")
  .superRefine((val, ctx) => {
    if (/<script[\s\S]*?>/i.test(val) || /on\w+=/i.test(val)) {
      ctx.addIssue({
        code: "custom",
        message: "errors.message.forbiddenContent",
      });
    }
  });

// --- CONTACT FORM SCHEMA ---
// Combines individual field schemas into a single object
export const contactSchema = z.object({
  name: nameSchema,
  company: companySchema,
  email: emailSchema,
  message: messageSchema,
});

// --- CONTACT FORM TYPE ---
export type ContactFormData = z.infer<typeof contactSchema>;

//------------

// import { z } from "zod";

// // --- NAME: только буквы и пробелы ---
// const nameSchema = z
//   .string()
//   .min(1, "errors.name.required")
//   .superRefine((val, ctx) => {
//     if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(val)) {
//       ctx.addIssue({
//         code: "custom",
//         message: "errors.name.invalid",
//       });
//     }
//   });

// // --- COMPANY: минимум 1 символ ---
// const companySchema = z.string().min(1, "errors.company.required");

// // --- EMAIL ---
// const emailSchema = z
//   .string()
//   .min(1, "errors.email.required")
//   .superRefine((val, ctx) => {
//     if (val && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(val)) {
//       ctx.addIssue({
//         code: "custom",
//         message: "errors.email.invalid",
//       });
//     }
//   });

// // --- MESSAGE: минимум 10 символов + базовый санитайзинг ---
// const messageSchema = z
//   .string()
//   .min(10, "errors.message.minLength")
//   .superRefine((val, ctx) => {
//     // базовая проверка на потенциально опасный HTML / inline JS
//     // Это не санитайзинг, а client-side guard от очевидных XSS-паттернов.
//     // Полноценная очистка должна выполняться на сервере.
//     if (/<script[\s\S]*?>/i.test(val) || /on\w+=/i.test(val)) {
//       ctx.addIssue({
//         code: "custom",
//         message: "errors.message.forbiddenContent",
//       });
//     }
//   });

// export const contactSchema = z.object({
//   name: nameSchema,
//   company: companySchema,
//   email: emailSchema,
//   message: messageSchema,
// });

// export type ContactFormData = z.infer<typeof contactSchema>;
