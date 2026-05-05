"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { EVENT } from "@/lib/constants";
import {
  formatMoneyUsd,
  getDiscountedFullPayUsd,
  getListPriceUsd,
  getRemainingUsd,
  normalizeCollectionTarget,
} from "@/lib/pricing";
import type {
  CollectionTarget,
  PaymentStatus,
  RegistrationRow,
} from "@/types/registration";

type StatusFilter = "todos" | PaymentStatus;

function formatRowDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-PA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function statusBadgeVariant(
  s: PaymentStatus
): "default" | "secondary" | "outline" {
  if (s === "pagado") return "default";
  if (s === "abonado") return "secondary";
  return "outline";
}

function montoRestante(r: RegistrationRow): number {
  return getRemainingUsd({
    amountPaid: Number(r.amount_paid ?? 0),
    paymentStatus: r.payment_status,
    collectionTarget: normalizeCollectionTarget(r.collection_target),
  });
}

const money = formatMoneyUsd;

export function RegistrationsDashboard() {
  const router = useRouter();
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [since, setSince] = useState<string>("");

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<RegistrationRow | null>(null);

  const [editStatus, setEditStatus] = useState<PaymentStatus>("pendiente");
  const [editCollectionTarget, setEditCollectionTarget] =
    useState<CollectionTarget>("list");
  const [editAmount, setEditAmount] = useState("0");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchRegistrations = useCallback(() => {
    const supabase = createClient();
    return supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetchRegistrations().then(({ data, error }) => {
      if (cancelled) return;
      if (error) {
        toast.error("No se pudieron cargar los registros.");
        setRows([]);
      } else {
        setRows((data as RegistrationRow[]) ?? []);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [fetchRegistrations]);

  const load = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) setLoading(true);
      const { data, error } = await fetchRegistrations();
      if (error) {
        toast.error("No se pudieron cargar los registros.");
        setRows([]);
      } else {
        setRows((data as RegistrationRow[]) ?? []);
      }
      setLoading(false);
     },
    [fetchRegistrations]
  );

  const filtered = useMemo(() => {
    let list = rows;
    if (statusFilter !== "todos") {
      list = list.filter((r) => r.payment_status === statusFilter);
    }
    if (since) {
      const start = new Date(since);
      start.setHours(0, 0, 0, 0);
      const end = new Date(since);
      end.setHours(23, 59, 59, 999);
      list = list.filter((r) => {
        const d = new Date(r.created_at);
        return d >= start && d <= end;
      });
    }
    return list;
  }, [rows, statusFilter, since]);

  const counts = useMemo(() => {
    const total = rows.length;
    const pendiente = rows.filter((r) => r.payment_status === "pendiente").length;
    const abonado = rows.filter((r) => r.payment_status === "abonado").length;
    const pagado = rows.filter((r) => r.payment_status === "pagado").length;
    return { total, pendiente, abonado, pagado };
  }, [rows]);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function openEdit(r: RegistrationRow) {
    setSelected(r);
    setEditStatus(r.payment_status);
    setEditCollectionTarget(normalizeCollectionTarget(r.collection_target));
    setEditAmount(String(r.amount_paid ?? 0));
    setEditNotes(r.notes ?? "");
    setEditOpen(true);
  }

  function openDelete(r: RegistrationRow) {
    setSelected(r);
    setDeleteOpen(true);
  }

  async function saveEdit() {
    if (!selected) return;
    setSaving(true);
    const supabase = createClient();
    const amount = parseFloat(editAmount.replace(",", ".")) || 0;
    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: editStatus,
        amount_paid: amount,
        collection_target: editCollectionTarget,
        notes: editNotes.trim() || null,
      })
      .eq("id", selected.id);

    setSaving(false);
    if (error) {
      toast.error("No se pudo actualizar.");
      return;
    }
    toast.success("Registro actualizado.");
    setEditOpen(false);
    void load(false);
  }

  async function confirmDelete() {
    if (!selected) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("id", selected.id);
    setDeleting(false);
    if (error) {
      toast.error("No se pudo eliminar.");
      return;
    }
    toast.success("Registro eliminado.");
    setDeleteOpen(false);
    void load(false);
  }

  const previewRemaining = getRemainingUsd({
    amountPaid: parseFloat(editAmount.replace(",", ".")) || 0,
    paymentStatus: editStatus,
    collectionTarget: editCollectionTarget,
  });

  return (
    <div className="mx-auto w-full max-w-7xl rounded-2xl border border-border/80 bg-card/80 px-4 py-8 shadow-sm ring-1 ring-wine/5 md:px-6 md:py-10">
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            Registros · Master Class
          </h1>
          <p className="text-sm text-muted-foreground">
            Inscripciones, abonos, saldo y estado. Lista:{" "}
            <strong>{money(getListPriceUsd())}</strong> · Pago único (
            {EVENT.discountFullPayPercent}% off):{" "}
            <strong>{money(getDiscountedFullPayUsd())}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void load(true)}>
            Actualizar lista
          </Button>
          <Button variant="ghost" size="sm" onClick={() => void logout()}>
            <LogOut className="size-4" />
            Salir
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            ["Total", counts.total],
            ["Pendientes", counts.pendiente],
            ["Con abono", counts.abonado],
            ["Pagado", counts.pagado],
          ] as const
        ).map(([label, n]) => (
          <Card
            key={label}
            className="border-border/80 bg-card shadow-sm ring-1 ring-wine/8"
          >
            <CardContent className="px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">
                {label}
              </p>
              <p className="text-xl font-semibold tabular-nums">
                {loading ? "—" : n}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
        <div className="space-y-2">
          <Label>Filtrar por estado</Label>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Nuevo / pendiente</SelectItem>
              <SelectItem value="abonado">Abono realizado</SelectItem>
              <SelectItem value="pagado">Pagado completo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Fecha de registro</Label>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="date"
              className="w-[200px]"
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
            {since && (
              <Button
                variant="link"
                className="h-auto p-0 text-xs"
                onClick={() => setSince("")}
              >
                Quitar filtro
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
              <TableHead>Fecha registro</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Abono</TableHead>
              <TableHead className="text-right">Restante</TableHead>
              <TableHead className="hidden sm:table-cell">Meta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center">
                  <Loader2 className="mx-auto size-8 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-12 text-center text-muted-foreground"
                >
                  No hay registros.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRowDate(r.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{r.full_name}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.whatsapp}</TableCell>
                  <TableCell className="max-w-[160px] truncate text-sm">
                    {r.email ?? "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {money(Number(r.amount_paid ?? 0))}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {money(montoRestante(r))}
                  </TableCell>
                  <TableCell className="hidden text-xs sm:table-cell">
                    {normalizeCollectionTarget(r.collection_target) ===
                    "discounted_full"
                      ? "−10% · único"
                      : "Lista"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(r.payment_status)}>
                      {r.payment_status === "pendiente" && "Pendiente"}
                      {r.payment_status === "abonado" && "Abonado"}
                      {r.payment_status === "pagado" && "Pagado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Editar"
                        onClick={() => openEdit(r)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Eliminar"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDelete(r)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar registro</DialogTitle>
            <DialogDescription>
              {selected?.full_name} · actualiza estado, abono y notas internas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground leading-relaxed">
              <span className="block">
                Lista: <strong>{money(getListPriceUsd())}</strong> · Pago único
                (−{EVENT.discountFullPayPercent}%):{" "}
                <strong>{money(getDiscountedFullPayUsd())}</strong>
              </span>
              <span className="mt-1 block">
                Restante si guardas:{" "}
                <strong className="text-foreground">
                  {money(previewRemaining)}
                </strong>
              </span>
            </div>
            <div className="space-y-2">
              <Label>Meta de cobro</Label>
              <Select
                value={editCollectionTarget}
                onValueChange={(v) =>
                  setEditCollectionTarget(v as CollectionTarget)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list">
                    Precio lista ({money(getListPriceUsd())}) — cuotas hacia el
                    total publicado
                  </SelectItem>
                  <SelectItem value="discounted_full">
                    Pago único con descuento ({money(getDiscountedFullPayUsd())})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={editStatus}
                onValueChange={(v) => setEditStatus(v as PaymentStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">
                    Pendiente (sin abono o recién registrado)
                  </SelectItem>
                  <SelectItem value="abonado">Abono realizado</SelectItem>
                  <SelectItem value="pagado">Pagado completo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amt">Monto abonado (USD)</Label>
              <Input
                id="amt"
                inputMode="decimal"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas internas</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Comprobante, plan de cuotas, observaciones…"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => void saveEdit()} disabled={saving}>
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar registro</DialogTitle>
            <DialogDescription>
              ¿Eliminar a <strong>{selected?.full_name}</strong>? No se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Eliminar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
