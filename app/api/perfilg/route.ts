import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST: crear PerfilG
export async function POST(req: NextRequest) {
  const { nombre, descripcion } = await req.json()

  const nuevoPerfilG = await prisma.perfilG.create({
    data: { nombre, descripcion },
  })

  return NextResponse.json(nuevoPerfilG)
}

// GET: obtener todos los PerfilG
export async function GET() {
/*
  const perfiles = await prisma.perfilG.findMany({
    orderBy: { id: 'asc' },
  })
*/
  const perfiles = await prisma.perfilG.findMany({
    orderBy: { id: 'asc' },
    include: {
      valoresG: true, // <--- añadir esto
    },
  })
  return NextResponse.json(perfiles)
}