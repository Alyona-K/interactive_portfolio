import { contactSchema } from "./formValidation";

/* --------------------------------------------------
   CONTACT SCHEMA VALIDATION
   Tests all edge cases for form input validation
   using Zod schema to ensure correct error messages
-------------------------------------------------- */
describe("contactSchema validation", () => {
  const validData = {
    name: "Alyona Ivanova",
    company: "My Company",
    email: "test@example.com",
    message: "Hello! This is a valid message.",
  };

  it("passes validation with valid data", () => {
    // Ensure schema accepts valid inputs without throwing
    expect(() => contactSchema.parse(validData)).not.toThrow();
  });

  // --- NAME FIELD --- 
  it("fails if name is empty", () => {
    const data = { ...validData, name: "" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Verify correct error message for required name
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.name.required");
    }
  });

  it("fails if name contains invalid characters", () => {
    const data = { ...validData, name: "Алёна123" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Verify correct error message for invalid characters
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.name.invalid");
    }
  });

  // --- COMPANY FIELD ---
  it("fails if company is empty", () => {
    const data = { ...validData, company: "" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Verify correct error message for required company
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.company.required");
    }
  });

  // --- EMAIL FIELD ---
  it("fails if email is empty", () => {
    const data = { ...validData, email: "" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Verify correct error message for required email
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.email.required");
    }
  });

  it("fails if email is invalid", () => {
    const data = { ...validData, email: "invalid-email" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Verify correct error message for invalid email format
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.email.invalid");
    }
  });

  // --- MESSAGE FIELD ---
  it("fails if message is too short", () => {
    const data = { ...validData, message: "short" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Validate minimum length constraint for message
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("errors.message.minLength");
    }
  });

  it("fails if message contains <script>", () => {
    const data = { ...validData, message: "<script>alert(1)</script>" };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Ensure XSS content is rejected
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "errors.message.forbiddenContent",
      );
    }
  });

  it("fails if message contains on* attributes", () => {
    const data = {
      ...validData,
      message: 'Click me <div onclick="alert(1)"></div>',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);

    // Ensure event handlers are blocked for security
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "errors.message.forbiddenContent",
      );
    }
  });
});

//---------

// import { contactSchema } from "./formValidation";

// describe("contactSchema validation", () => {
//   const validData = {
//     name: "Алёна Иванова",
//     company: "My Company",
//     email: "test@example.com",
//     message: "Привет! Это корректное сообщение.",
//   };

//   it("passes validation with valid data", () => {
//     expect(() => contactSchema.parse(validData)).not.toThrow();
//   });

//   /* -------------------- NAME -------------------- */
//   it("fails if name is empty", () => {
//     const data = { ...validData, name: "" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.name.required");
//     }
//   });

//   it("fails if name contains invalid characters", () => {
//     const data = { ...validData, name: "Алёна123" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.name.invalid");
//     }
//   });

//   /* -------------------- COMPANY -------------------- */
//   it("fails if company is empty", () => {
//     const data = { ...validData, company: "" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.company.required");
//     }
//   });

//   /* -------------------- EMAIL -------------------- */
//   it("fails if email is empty", () => {
//     const data = { ...validData, email: "" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.email.required");
//     }
//   });

//   it("fails if email is invalid", () => {
//     const data = { ...validData, email: "invalid-email" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.email.invalid");
//     }
//   });

//   /* -------------------- MESSAGE -------------------- */
//   it("fails if message is too short", () => {
//     const data = { ...validData, message: "short" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.message.minLength");
//     }
//   });

//   it("fails if message contains <script>", () => {
//     const data = { ...validData, message: "<script>alert(1)</script>" };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.message.forbiddenContent");
//     }
//   });

//   it("fails if message contains on* attributes", () => {
//     const data = { ...validData, message: 'Click me <div onclick="alert(1)"></div>' };
//     const result = contactSchema.safeParse(data);
//     expect(result.success).toBe(false);
//     if (!result.success) {
//       expect(result.error.issues[0].message).toBe("errors.message.forbiddenContent");
//     }
//   });
// });
