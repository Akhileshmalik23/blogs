import { Blog,  User } from "@prisma/client";

export type SafeListing = Omit<Blog, "createdAt"> & {
   createdAt: string;
};


export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
   createdAt: string;
   updatedAt: string;
};
