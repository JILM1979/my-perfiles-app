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

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()
  
    const valG = await prisma.valG.findUnique({
      where: { id },
    })
  
    if (!valG) {
      return NextResponse.json({ error: 'ValG no encontrado' }, { status: 404 })
    }
  
    if (valG.valor?.trim() === '') {
      return NextResponse.json({ error: 'Valor vacío no permitido' }, { status: 400 })
    }
  
    await prisma.valG.delete({
      where: { id },
    })
  
    return NextResponse.json({ eliminado: valG.valor?.toUpperCase() || 'SIN VALOR' })
  }

  