'use client'

import { useEffect, useState } from 'react'


type ValG = {
  id: number
  clave: string
  valor: string | null
}

type PerfilG = {
  id: number
  nombre: string
  descripcion: string | null
  valoresG: ValG[]
}


export default function Home() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [perfiles, setPerfiles] = useState<PerfilG[]>([])
  const [expandido, setExpandido] = useState<number | null>(null)
  const [nuevoValor, setNuevoValor] = useState<Record<number, { clave: string; valor: string }>>({})
  const [auditoria, setAuditoria] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const fetchPerfiles = async () => {
    const res = await fetch('/api/perfilg')
    const data = await res.json()
    setPerfiles(data)
  }

  const eliminarValG = async (id: number) => {
    setError(null)
  
    try {
      const res = await fetch('/api/valg', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
  
      const data = await res.json()
  
      if (!res.ok) throw new Error(data.error || 'Error al borrar')
  
      setAuditoria((prev) => [...prev, data.eliminado])
      fetchPerfiles()
    } catch (err: any) {
      setError(err.message)
    }
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

  const crearValG = async (perfilGId: number) => {
    const datos = nuevoValor[perfilGId]
    if (!datos?.clave) return
  
    await fetch('/api/valg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clave: datos.clave,
        valor: datos.valor,
        perfilGId,
      }),
    })
  
    // Limpiar campos
    setNuevoValor((prev) => ({ ...prev, [perfilGId]: { clave: '', valor: '' } }))
    fetchPerfiles()
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
          <li key={perfil.id} className="border p-4 rounded space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <strong>{perfil.nombre}</strong>
                <div className="text-sm text-gray-600">{perfil.descripcion}</div>
              </div>
              <button
                className="text-blue-600 text-sm underline"
                onClick={() =>
                  setExpandido((prev) => (prev === perfil.id ? null : perfil.id))
                }
              >
                {expandido === perfil.id ? 'Ocultar valores' : 'Ver valores'}
              </button>
            </div>

            {expandido === perfil.id && (
              <div className="pl-4">
                <ul className="mb-2 space-y-1">
                  {perfil.valoresG.length === 0 && <li className="text-gray-400">Sin valores</li>}
                  {perfil.valoresG.map((val) => (
                    <li key={val.id} className="text-sm flex justify-between items-center">
                      <span>
                        🔹 <strong>{val.clave}</strong>: {val.valor}
                      </span>
                      <button
                        className="text-red-600 text-xs ml-2 underline"
                        onClick={() => eliminarValG(val.id)}
                      >
                        Borrar
                      </button>
                    </li>
                  ))}
                  
                </ul>

                <div className="flex gap-2 mb-2">
                  <input
                    className="border p-1 text-sm"
                    placeholder="Clave"
                    value={nuevoValor[perfil.id]?.clave || ''}
                    onChange={(e) =>
                      setNuevoValor((prev) => ({
                        ...prev,
                        [perfil.id]: {
                          ...prev[perfil.id],
                          clave: e.target.value,
                        },
                      }))
                    }
                  />
                  <input
                    className="border p-1 text-sm"
                    placeholder="Valor"
                    value={nuevoValor[perfil.id]?.valor || ''}
                    onChange={(e) =>
                      setNuevoValor((prev) => ({
                        ...prev,
                        [perfil.id]: {
                          ...prev[perfil.id],
                          valor: e.target.value,
                        },
                      }))
                    }
                  />
                  <button
                    className="bg-green-500 text-white px-2 text-sm rounded"
                    onClick={() => crearValG(perfil.id)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}


        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mt-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {auditoria.length > 0 && (
          <div className="bg-gray-100 border border-gray-400 p-4 rounded mt-8">
            <h3 className="font-bold mb-2">🧾 Auditoría de eliminaciones</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {auditoria.map((val, i) => (
                <li key={i}>{val}</li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </main>
  )
}