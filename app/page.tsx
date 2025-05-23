'use client'

import { useEffect, useState } from 'react'

type PerfilG = {
  id: number
  nombre: string
  descripcion: string | null
}

export default function Home() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [perfiles, setPerfiles] = useState<PerfilG[]>([])

  const fetchPerfiles = async () => {
    const res = await fetch('/api/perfilg')
    const data = await res.json()
    setPerfiles(data)
  }

  const crearPerfilG = async () => {
    const res = await fetch('/api/perfilg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion }),
    })
    if (res.ok) {
      setNombre('')
      setDescripcion('')
      fetchPerfiles() // Recargar lista tras crear
    }
  }

  useEffect(() => {
    fetchPerfiles()
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-2xl mb-4">Crear PerfilG</h1>
      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          className="border p-2 mr-2"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={crearPerfilG}
        >
          Crear
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">PerfilesG existentes</h2>
      <ul className="space-y-2">
        {perfiles.map((perfil) => (
          <li key={perfil.id} className="border p-3 rounded">
            <strong>{perfil.nombre}</strong>
            <div className="text-sm text-gray-600">{perfil.descripcion}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}