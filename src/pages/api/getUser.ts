import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient

export default async function handle(req: NextApiRequest, res: NextApiResponse){
  const user = await prisma.user.findFirst({
    where: {
      email: 'kala@gmail'
    }
  })
    res.json(user)
  }
