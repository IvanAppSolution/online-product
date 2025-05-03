import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
// import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "@/actions/email";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: schema,        
    }),
    emailAndPassword: {  
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
              to: user.email,
              subject: "Reset your password",
              text: `Click the link to reset your password: ${url}`,
            });
          },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
      },
    user: {
      additionalFields: {
        // Add any additional fields you want to include in the user object 
        role: {
          type: "string",
          default: "user",
        },
      },
    },
    plugins: [openAPI(), admin()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
