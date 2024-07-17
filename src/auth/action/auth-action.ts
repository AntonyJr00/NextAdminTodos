import prisma from "@/app/lib/prisma";
import { authOptions } from "@/auth";
import bcrypjs from "bcryptjs";
import { getServerSession } from "next-auth";

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return await session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return await createUser(email, password);

  return !bcrypjs.compareSync(password, user.password ?? "") ? null : user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypjs.hashSync(password),
      name: email.split("@")[0],
    },
  });
  return user;
};
