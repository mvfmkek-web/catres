"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  FileText,
  Key,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
} from "lucide-react"

type Client = {
  id: number
  name: string
  email: string
  phone: string | null
  created_at: string
}

type Quotation = {
  id: number
  product_name: string
  message: string
  status: string
  created_at: string
  client_name: string
  client_email: string
  client_phone: string | null
}

type Tab = "clients" | "quotations" | "password"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("clients")
  const [clients, setClients] = useState<Client[]>([])
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(false)

  // Password change state
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwMessage, setPwMessage] = useState({ type: "", text: "" })

  const fetchClients = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/clients")
      if (res.status === 401) {
        router.push("/admin")
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setClients(data)
    } catch {
      // handle error silently
    } finally {
      setLoading(false)
    }
  }, [router])

  const fetchQuotations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/quotations")
      if (res.status === 401) {
        router.push("/admin")
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setQuotations(data)
    } catch {
      // handle error silently
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (activeTab === "clients") fetchClients()
    if (activeTab === "quotations") fetchQuotations()
  }, [activeTab, fetchClients, fetchQuotations])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const handleStatusChange = async (id: number, status: string) => {
    await fetch("/api/admin/quotations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    fetchQuotations()
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMessage({ type: "", text: "" })

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMessage({ type: "error", text: "Las contrasenas no coinciden" })
      return
    }

    if (pwForm.newPassword.length < 6) {
      setPwMessage({ type: "error", text: "La nueva contrasena debe tener al menos 6 caracteres" })
      return
    }

    setPwLoading(true)
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwForm.currentPassword,
          newPassword: pwForm.newPassword,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setPwMessage({ type: "error", text: data.error })
      } else {
        setPwMessage({ type: "success", text: "Contrasena actualizada correctamente" })
        setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      }
    } catch {
      setPwMessage({ type: "error", text: "Error del servidor" })
    } finally {
      setPwLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-2.5 py-1 text-xs font-medium text-[#92400e]">
            <Clock className="h-3 w-3" /> Pendiente
          </span>
        )
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <CheckCircle className="h-3 w-3" /> Contactado
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#d1fae5] px-2.5 py-1 text-xs font-medium text-[#065f46]">
            <CheckCircle className="h-3 w-3" /> Completado
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
            <XCircle className="h-3 w-3" /> Cancelado
          </span>
        )
      default:
        return <span className="text-xs text-muted-foreground">{status}</span>
    }
  }

  const tabs = [
    { id: "clients" as Tab, label: "Clientes", icon: Users, count: clients.length },
    { id: "quotations" as Tab, label: "Cotizaciones", icon: FileText, count: quotations.length },
    { id: "password" as Tab, label: "Cambiar Clave", icon: Key },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Panel de Administracion</h1>
              <p className="text-xs text-muted-foreground">Catres Clinicos Chile</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesion
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Clients Tab */}
        {activeTab === "clients" && (
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Clientes Nuevos</h2>
              <button
                onClick={fetchClients}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Actualizar
              </button>
            </div>
            {clients.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <Users className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                <p className="text-sm">No hay clientes registrados aun</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Telefono
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Fecha Registro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{client.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{client.email}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{client.phone || "No registrado"}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(client.created_at).toLocaleDateString("es-CL")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Quotations Tab */}
        {activeTab === "quotations" && (
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Cotizaciones de Clientes</h2>
              <button
                onClick={fetchQuotations}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Actualizar
              </button>
            </div>
            {quotations.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <FileText className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                <p className="text-sm">No hay cotizaciones aun</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {quotations.map((q) => (
                  <div key={q.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-semibold text-foreground">{q.product_name}</span>
                          {getStatusBadge(q.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{q.client_name}</span>
                          {" - "}
                          {q.client_email}
                          {q.client_phone && ` - ${q.client_phone}`}
                        </p>
                        {q.message && <p className="mt-1 text-sm text-muted-foreground">{q.message}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(q.created_at).toLocaleDateString("es-CL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="contacted">Contactado</option>
                          <option value="completed">Completado</option>
                          <option value="cancelled">Cancelado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="mx-auto max-w-md">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Cambiar Contrasena</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ingresa tu contrasena actual y luego la nueva contrasena
                </p>
              </div>

              {pwMessage.text && (
                <div
                  className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                    pwMessage.type === "error"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-[#d1fae5] text-[#065f46]"
                  }`}
                >
                  {pwMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="currentPw" className="mb-1.5 block text-sm font-medium text-foreground">
                    Contrasena Actual
                  </label>
                  <div className="relative">
                    <input
                      id="currentPw"
                      type={showCurrentPw ? "text" : "password"}
                      required
                      value={pwForm.currentPassword}
                      onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showCurrentPw ? "Ocultar" : "Mostrar"}
                    >
                      {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPw" className="mb-1.5 block text-sm font-medium text-foreground">
                    Nueva Contrasena
                  </label>
                  <div className="relative">
                    <input
                      id="newPw"
                      type={showNewPw ? "text" : "password"}
                      required
                      minLength={6}
                      value={pwForm.newPassword}
                      onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Minimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showNewPw ? "Ocultar" : "Mostrar"}
                    >
                      {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPw" className="mb-1.5 block text-sm font-medium text-foreground">
                    Confirmar Nueva Contrasena
                  </label>
                  <input
                    id="confirmPw"
                    type="password"
                    required
                    minLength={6}
                    value={pwForm.confirmPassword}
                    onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Repite la nueva contrasena"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pwLoading}
                  className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {pwLoading ? "Actualizando..." : "Cambiar Contrasena"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
