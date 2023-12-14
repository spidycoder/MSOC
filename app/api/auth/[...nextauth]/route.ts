import NextAuth from "next-auth/next";
import { options } from "./options";

const handlers = NextAuth(options);

export {handlers as GET,handlers as POST};