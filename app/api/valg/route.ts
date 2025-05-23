import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { clave, valor, perfilGId } = await req.json()

  const nuevoValG = await prisma.valG.create({
    data: {
      clave,
      valor,
      perfilGId,
    },
  })

  return NextResponse.json(nuevoValG)
}