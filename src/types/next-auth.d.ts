import "next-auth";

export declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  interface AdapterUser {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
