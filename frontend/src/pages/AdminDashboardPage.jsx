import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Search,
    Download,
    LogOut,
    Mail,
    Phone,
    MessageCircle,
    RefreshCw,
    Inbox,
    FileText,
    LifeBuoy,
    PencilLine,
    Save,
} from "lucide-react";
import Logo from "@/components/site/Logo";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { api, requireApiUrl, WHATSAPP_NUMBER, formatApiError } from "@/lib/rp";
import { defaultSiteContent, mergeSiteContent } from "@/content/siteContent";
import { cacheSiteContent } from "@/hooks/useSiteContent";

const STATUSES = ["new", "in_progress", "contacted", "resolved", "closed"];

const statusColor = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-amber-50 text-amber-800 border-amber-200",
    contacted: "bg-violet-50 text-violet-700 border-violet-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-slate-50 text-slate-600 border-slate-200",
};

function StatusBadge({ value }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                statusColor[value] || statusColor.new
            }`}
        >
            {value.replace("_", " ")}
        </span>
    );
}

function fmtDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleString("en-IN", {
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

function ContactActions({ email, phone }) {
    const wa = phone
        ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
        : `https://wa.me/${WHATSAPP_NUMBER}`;
    return (
        <div className="flex items-center gap-2">
            <a
                href={`mailto:${email}`}
                title="Email"
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] hover:bg-[#FAF9F6] text-[#475569]"
            >
                <Mail className="h-4 w-4" />
            </a>
            {phone && (
                <a
                    href={`tel:${phone}`}
                    title="Call"
                    className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] hover:bg-[#FAF9F6] text-[#475569]"
                >
                    <Phone className="h-4 w-4" />
                </a>
            )}
            <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] hover:bg-[#FAF9F6] text-[#475569]"
            >
                <MessageCircle className="h-4 w-4" />
            </a>
        </div>
    );
}

function StatusSelect({ value, onChange, testid }) {
    return (
        <select
            value={value}
            data-testid={testid}
            onChange={(e) => onChange(e.target.value)}
            className="text-xs border border-[#E2E8F0] rounded-md px-2 py-1 bg-white text-[#0F172A] focus:ring-2 focus:ring-[#C8322A]/30 outline-none"
        >
            {STATUSES.map((s) => (
                <option key={s} value={s}>
                    {s.replace("_", " ")}
                </option>
            ))}
        </select>
    );
}

function NotesEditor({ initial, onSave, testid }) {
    const [val, setVal] = useState(initial || "");
    const [saving, setSaving] = useState(false);
    const dirty = (val || "") !== (initial || "");
    return (
        <div className="flex items-start gap-2">
            <textarea
                value={val}
                onChange={(e) => setVal(e.target.value)}
                rows={2}
                data-testid={testid}
                placeholder="Internal notes..."
                className="flex-1 text-sm border border-[#E2E8F0] rounded-md px-2 py-1.5 bg-white focus:ring-2 focus:ring-[#C8322A]/30 outline-none resize-y min-h-[44px]"
            />
            {dirty && (
                <button
                    onClick={async () => {
                        setSaving(true);
                        await onSave(val);
                        setSaving(false);
                    }}
                    disabled={saving}
                    className="text-xs px-3 py-1.5 rounded-md bg-[#0F172A] text-white hover:bg-[#0B1325] disabled:opacity-60"
                >
                    {saving ? "Saving" : "Save"}
                </button>
            )}
        </div>
    );
}

function useList(endpoint) {
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const params = {};
            if (q) params.q = q;
            if (status) params.status = status;
            const { data } = await api.get(endpoint, { params });
            setItems(data);
        } catch (err) {
            toast.error(formatApiError(err, "Failed to load"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(); // eslint-disable-next-line
    }, [q, status]);

    return { items, setItems, q, setQ, status, setStatus, loading, reload: load };
}

function FilterBar({ q, setQ, status, setStatus, onRefresh, testidPrefix }) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#475569]" />
                <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    data-testid={`${testidPrefix}-search`}
                    placeholder="Search by name, email, phone..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#C8322A]/30 outline-none text-sm"
                />
            </div>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                data-testid={`${testidPrefix}-status-filter`}
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-sm"
            >
                <option value="">All statuses</option>
                {STATUSES.map((s) => (
                    <option key={s} value={s}>
                        {s.replace("_", " ")}
                    </option>
                ))}
            </select>
            <button
                onClick={onRefresh}
                data-testid={`${testidPrefix}-refresh`}
                className="inline-flex items-center gap-1.5 border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white hover:bg-[#FAF9F6] text-sm text-[#0F172A]"
            >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
        </div>
    );
}

function MobileCard({ children }) {
    return (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-2">
            {children}
        </div>
    );
}

const contentFieldClass =
    "w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:ring-2 focus:ring-[#C8322A]/30 outline-none";

function ContentInput({ label, value, onChange, multiline = false, rows = 3 }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
            {multiline ? (
                <textarea
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className={`${contentFieldClass} mt-1.5 resize-y`}
                />
            ) : (
                <input
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${contentFieldClass} mt-1.5`}
                />
            )}
        </label>
    );
}

function ContentArrayEditor({ label, value, onChange, rows = 5 }) {
    return (
        <ContentInput
            label={label}
            value={(value || []).join("\n")}
            onChange={(text) =>
                onChange(text.split("\n").map((item) => item.trim()).filter(Boolean))
            }
            multiline
            rows={rows}
        />
    );
}

function ContentSection({ title, children }) {
    return (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#0F172A]">{title}</h2>
            <div className="mt-5 grid gap-4">{children}</div>
        </section>
    );
}

function ContentPanel() {
    const [content, setContent] = useState(defaultSiteContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/admin/content");
            setContent(mergeSiteContent(defaultSiteContent, data?.content));
        } catch (err) {
            toast.error(formatApiError(err, "Failed to load site content"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const update = (path, value) => {
        setContent((current) => {
            const next = structuredClone(current);
            let target = next;
            path.slice(0, -1).forEach((key) => {
                target = target[key];
            });
            target[path[path.length - 1]] = value;
            return next;
        });
    };

    const save = async () => {
        setSaving(true);
        try {
            const { data } = await api.put("/admin/content", { content });
            const merged = mergeSiteContent(defaultSiteContent, data?.content);
            setContent(merged);
            cacheSiteContent(merged);
            toast.success("Website content saved");
        } catch (err) {
            toast.error(formatApiError(err, "Failed to save content"));
        } finally {
            setSaving(false);
        }
    };

    const setStat = (index, key, value) => {
        const stats = [...(content.home.stats || [])];
        stats[index] = { ...stats[index], [key]: value };
        update(["home", "stats"], stats);
    };

    if (loading) {
        return (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-[#475569]">
                Loading site content...
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-[#C8322A]/20 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="font-display text-2xl font-bold text-[#0F172A]">
                        Site content
                    </h2>
                    <p className="mt-1 text-sm text-[#475569]">
                        Edit public website copy here. Changes are saved to the
                        database and appear on the website without changing code.
                    </p>
                </div>
                <button
                    onClick={save}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 text-sm transition-colors disabled:opacity-60"
                >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save content"}
                </button>
            </div>

            <ContentSection title="Homepage hero">
                <ContentInput
                    label="Small red label"
                    value={content.home.hero.eyebrow}
                    onChange={(v) => update(["home", "hero", "eyebrow"], v)}
                />
                <div className="grid md:grid-cols-2 gap-4">
                    <ContentInput
                        label="Headline first part"
                        value={content.home.hero.headlinePrefix}
                        onChange={(v) => update(["home", "hero", "headlinePrefix"], v)}
                    />
                    <ContentInput
                        label="Headline red part"
                        value={content.home.hero.headlineHighlight}
                        onChange={(v) => update(["home", "hero", "headlineHighlight"], v)}
                    />
                </div>
                <ContentInput
                    label="Hero paragraph"
                    value={content.home.hero.body}
                    onChange={(v) => update(["home", "hero", "body"], v)}
                    multiline
                    rows={4}
                />
                <ContentArrayEditor
                    label="Brand promise chips, one per line"
                    value={content.home.hero.promises}
                    onChange={(v) => update(["home", "hero", "promises"], v)}
                    rows={4}
                />
            </ContentSection>

            <div className="grid lg:grid-cols-2 gap-5">
                <ContentSection title="Homepage cards">
                    <ContentInput
                        label="Advisory card title"
                        value={content.home.hero.advisoryTitle}
                        onChange={(v) => update(["home", "hero", "advisoryTitle"], v)}
                    />
                    <ContentInput
                        label="Advisory card body"
                        value={content.home.hero.advisoryBody}
                        onChange={(v) => update(["home", "hero", "advisoryBody"], v)}
                        multiline
                    />
                    <ContentArrayEditor
                        label="Advisory bullets, one per line"
                        value={content.home.hero.advisoryPoints}
                        onChange={(v) => update(["home", "hero", "advisoryPoints"], v)}
                    />
                    <ContentInput
                        label="Claim card title"
                        value={content.home.hero.claimTitle}
                        onChange={(v) => update(["home", "hero", "claimTitle"], v)}
                    />
                    <ContentInput
                        label="Claim card body"
                        value={content.home.hero.claimBody}
                        onChange={(v) => update(["home", "hero", "claimBody"], v)}
                        multiline
                    />
                    <ContentArrayEditor
                        label="Claim bullets, one per line"
                        value={content.home.hero.claimPoints}
                        onChange={(v) => update(["home", "hero", "claimPoints"], v)}
                    />
                </ContentSection>

                <ContentSection title="Why RightPolicy">
                    <ContentInput
                        label="Small label"
                        value={content.home.why.eyebrow}
                        onChange={(v) => update(["home", "why", "eyebrow"], v)}
                    />
                    <ContentInput
                        label="Heading"
                        value={content.home.why.title}
                        onChange={(v) => update(["home", "why", "title"], v)}
                    />
                    <ContentInput
                        label="Paragraph"
                        value={content.home.why.body}
                        onChange={(v) => update(["home", "why", "body"], v)}
                        multiline
                        rows={4}
                    />
                    <ContentArrayEditor
                        label="Comparison rows, one per line"
                        value={content.home.why.rows}
                        onChange={(v) => update(["home", "why", "rows"], v)}
                        rows={7}
                    />
                </ContentSection>
            </div>

            <ContentSection title="Homepage numbers">
                <div className="grid md:grid-cols-2 gap-4">
                    {(content.home.stats || []).map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-[#E2E8F0] bg-[#FAF9F6] p-4 grid grid-cols-[7rem_1fr] gap-3"
                        >
                            <ContentInput
                                label="Number"
                                value={stat.value}
                                onChange={(v) => setStat(index, "value", v)}
                            />
                            <ContentInput
                                label="Description"
                                value={stat.label}
                                onChange={(v) => setStat(index, "label", v)}
                            />
                        </div>
                    ))}
                </div>
            </ContentSection>

            <div className="grid lg:grid-cols-2 gap-5">
                <ContentSection title="About page">
                    <ContentInput
                        label="Small label"
                        value={content.about.eyebrow}
                        onChange={(v) => update(["about", "eyebrow"], v)}
                    />
                    <ContentInput
                        label="Main heading"
                        value={content.about.title}
                        onChange={(v) => update(["about", "title"], v)}
                    />
                    <ContentInput
                        label="Intro paragraph"
                        value={content.about.body}
                        onChange={(v) => update(["about", "body"], v)}
                        multiline
                    />
                    <ContentInput
                        label="Founder label"
                        value={content.about.founderLabel}
                        onChange={(v) => update(["about", "founderLabel"], v)}
                    />
                    <ContentInput
                        label="Founder name"
                        value={content.about.founderName}
                        onChange={(v) => update(["about", "founderName"], v)}
                    />
                    <ContentInput
                        label="Founder summary"
                        value={content.about.founderSummary}
                        onChange={(v) => update(["about", "founderSummary"], v)}
                        multiline
                    />
                    <ContentInput
                        label="Founder note heading"
                        value={content.about.founderNoteTitle}
                        onChange={(v) => update(["about", "founderNoteTitle"], v)}
                    />
                    <ContentArrayEditor
                        label="Founder note paragraphs, one paragraph per line"
                        value={content.about.founderNoteParagraphs}
                        onChange={(v) => update(["about", "founderNoteParagraphs"], v)}
                        rows={5}
                    />
                </ContentSection>

                <ContentSection title="Contact page">
                    <ContentInput
                        label="Small label"
                        value={content.contact.eyebrow}
                        onChange={(v) => update(["contact", "eyebrow"], v)}
                    />
                    <ContentInput
                        label="Main heading"
                        value={content.contact.title}
                        onChange={(v) => update(["contact", "title"], v)}
                    />
                    <ContentInput
                        label="Intro paragraph"
                        value={content.contact.body}
                        onChange={(v) => update(["contact", "body"], v)}
                        multiline
                    />
                    <ContentInput
                        label="Location card title"
                        value={content.contact.locationTitle}
                        onChange={(v) => update(["contact", "locationTitle"], v)}
                    />
                    <ContentInput
                        label="Location line 1"
                        value={content.contact.locationLine1}
                        onChange={(v) => update(["contact", "locationLine1"], v)}
                    />
                    <ContentInput
                        label="Location line 2"
                        value={content.contact.locationLine2}
                        onChange={(v) => update(["contact", "locationLine2"], v)}
                        multiline
                    />
                </ContentSection>
            </div>
        </div>
    );
}

/* ---------- Inquiries Panel ---------- */
function InquiriesPanel() {
    const list = useList("/admin/inquiries");

    const updateOne = async (id, patch) => {
        try {
            const { data } = await api.patch(`/admin/inquiries/${id}`, patch);
            list.setItems((arr) => arr.map((it) => (it.id === id ? data : it)));
            toast.success("Updated");
        } catch (err) {
            toast.error(formatApiError(err));
        }
    };

    return (
        <div className="space-y-4">
            <FilterBar
                {...list}
                onRefresh={list.reload}
                testidPrefix="inquiries"
            />
            <div className="hidden lg:block rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#F3F4F6] text-[#0F172A]">
                        <tr>
                            <th className="text-left p-3 font-semibold">Submitted</th>
                            <th className="text-left p-3 font-semibold">Name</th>
                            <th className="text-left p-3 font-semibold">Contact</th>
                            <th className="text-left p-3 font-semibold">Type</th>
                            <th className="text-left p-3 font-semibold">Message</th>
                            <th className="text-left p-3 font-semibold">Status</th>
                            <th className="text-left p-3 font-semibold">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.items.map((it) => (
                            <tr
                                key={it.id}
                                data-testid={`inquiry-row-${it.id}`}
                                className="border-t border-[#E2E8F0] align-top"
                            >
                                <td className="p-3 text-[#475569] whitespace-nowrap">
                                    {fmtDate(it.created_at)}
                                </td>
                                <td className="p-3 font-medium text-[#0F172A]">{it.name}</td>
                                <td className="p-3">
                                    <div className="text-[#0F172A]">{it.email}</div>
                                    <div className="text-[#475569]">{it.phone}</div>
                                    <div className="mt-1.5">
                                        <ContactActions email={it.email} phone={it.phone} />
                                    </div>
                                </td>
                                <td className="p-3 text-[#475569]">
                                    {it.insurance_type || "-"}
                                </td>
                                <td className="p-3 max-w-xs">
                                    <div className="text-[#475569] line-clamp-3">
                                        {it.message || "-"}
                                    </div>
                                </td>
                                <td className="p-3 space-y-1">
                                    <StatusBadge value={it.status} />
                                    <div>
                                        <StatusSelect
                                            value={it.status}
                                            testid={`inquiry-status-${it.id}`}
                                            onChange={(v) => updateOne(it.id, { status: v })}
                                        />
                                    </div>
                                </td>
                                <td className="p-3 min-w-[260px]">
                                    <NotesEditor
                                        initial={it.notes}
                                        testid={`inquiry-notes-${it.id}`}
                                        onSave={(notes) => updateOne(it.id, { notes })}
                                    />
                                </td>
                            </tr>
                        ))}
                        {!list.loading && list.items.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-[#475569]">
                                    No inquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
                {list.items.map((it) => (
                    <MobileCard key={it.id}>
                        <div className="flex items-center justify-between">
                            <div className="font-medium text-[#0F172A]">{it.name}</div>
                            <StatusBadge value={it.status} />
                        </div>
                        <div className="text-xs text-[#475569]">{fmtDate(it.created_at)}</div>
                        <div className="text-sm text-[#0F172A]">{it.email}</div>
                        <div className="text-sm text-[#475569]">
                            {it.phone} · {it.insurance_type || "-"}
                        </div>
                        {it.message && (
                            <p className="text-sm text-[#475569]">{it.message}</p>
                        )}
                        <div className="flex items-center justify-between gap-2">
                            <StatusSelect
                                value={it.status}
                                onChange={(v) => updateOne(it.id, { status: v })}
                            />
                            <ContactActions email={it.email} phone={it.phone} />
                        </div>
                        <NotesEditor
                            initial={it.notes}
                            onSave={(notes) => updateOne(it.id, { notes })}
                        />
                    </MobileCard>
                ))}
                {!list.loading && list.items.length === 0 && (
                    <div className="text-center text-[#475569] py-10">
                        No inquiries found.
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- Uploads Panel ---------- */
function UploadsPanel() {
    const list = useList("/admin/policy-uploads");

    const updateOne = async (id, patch) => {
        try {
            const { data } = await api.patch(`/admin/policy-uploads/${id}`, patch);
            list.setItems((arr) => arr.map((it) => (it.id === id ? data : it)));
            toast.success("Updated");
        } catch (err) {
            toast.error(formatApiError(err));
        }
    };

    const downloadFile = async (it) => {
        try {
            const tok = localStorage.getItem("rp_admin_token");
            const res = await fetch(requireApiUrl(`/admin/policy-uploads/${it.id}/download`), {
                headers: { Authorization: `Bearer ${tok}` },
            });
            if (!res.ok) throw new Error("Download failed");
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = it.filename;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err.message || "Download failed");
        }
    };

    return (
        <div className="space-y-4">
            <FilterBar {...list} onRefresh={list.reload} testidPrefix="uploads" />
            <div className="hidden lg:block rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#F3F4F6] text-[#0F172A]">
                        <tr>
                            <th className="text-left p-3 font-semibold">Submitted</th>
                            <th className="text-left p-3 font-semibold">Name</th>
                            <th className="text-left p-3 font-semibold">Contact</th>
                            <th className="text-left p-3 font-semibold">File</th>
                            <th className="text-left p-3 font-semibold">Status</th>
                            <th className="text-left p-3 font-semibold">Admin notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.items.map((it) => (
                            <tr
                                key={it.id}
                                data-testid={`upload-row-${it.id}`}
                                className="border-t border-[#E2E8F0] align-top"
                            >
                                <td className="p-3 text-[#475569] whitespace-nowrap">
                                    {fmtDate(it.created_at)}
                                </td>
                                <td className="p-3 font-medium text-[#0F172A]">{it.name}</td>
                                <td className="p-3">
                                    <div className="text-[#0F172A]">{it.email}</div>
                                    <div className="text-[#475569]">{it.phone}</div>
                                    <div className="mt-1.5">
                                        <ContactActions email={it.email} phone={it.phone} />
                                    </div>
                                </td>
                                <td className="p-3">
                                    <button
                                        data-testid={`upload-download-${it.id}`}
                                        onClick={() => downloadFile(it)}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] border border-[#E2E8F0] rounded-md px-2.5 py-1.5 hover:bg-[#FAF9F6]"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                        {it.filename}
                                    </button>
                                    <div className="mt-1 text-xs text-[#475569]">
                                        {(it.size_bytes / 1024).toFixed(0)} KB
                                    </div>
                                    {it.notes && (
                                        <div className="mt-1 text-xs text-[#475569] italic">
                                            “{it.notes}”
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 space-y-1">
                                    <StatusBadge value={it.status} />
                                    <div>
                                        <StatusSelect
                                            value={it.status}
                                            testid={`upload-status-${it.id}`}
                                            onChange={(v) => updateOne(it.id, { status: v })}
                                        />
                                    </div>
                                </td>
                                <td className="p-3 min-w-[260px]">
                                    <NotesEditor
                                        initial={it.admin_notes}
                                        testid={`upload-notes-${it.id}`}
                                        onSave={(admin_notes) =>
                                            updateOne(it.id, { admin_notes })
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                        {!list.loading && list.items.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-[#475569]">
                                    No uploads found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-3">
                {list.items.map((it) => (
                    <MobileCard key={it.id}>
                        <div className="flex items-center justify-between">
                            <div className="font-medium text-[#0F172A]">{it.name}</div>
                            <StatusBadge value={it.status} />
                        </div>
                        <div className="text-xs text-[#475569]">{fmtDate(it.created_at)}</div>
                        <div className="text-sm text-[#0F172A]">{it.email}</div>
                        <div className="text-sm text-[#475569]">{it.phone}</div>
                        <button
                            onClick={() => downloadFile(it)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] border border-[#E2E8F0] rounded-md px-2.5 py-1.5 hover:bg-[#FAF9F6]"
                        >
                            <Download className="h-3.5 w-3.5" />
                            {it.filename}
                        </button>
                        <div className="flex items-center justify-between gap-2">
                            <StatusSelect
                                value={it.status}
                                onChange={(v) => updateOne(it.id, { status: v })}
                            />
                            <ContactActions email={it.email} phone={it.phone} />
                        </div>
                        <NotesEditor
                            initial={it.admin_notes}
                            onSave={(admin_notes) => updateOne(it.id, { admin_notes })}
                        />
                    </MobileCard>
                ))}
            </div>
        </div>
    );
}

/* ---------- Claims Panel ---------- */
function ClaimsPanel() {
    const list = useList("/admin/claim-requests");

    const updateOne = async (id, patch) => {
        try {
            const { data } = await api.patch(`/admin/claim-requests/${id}`, patch);
            list.setItems((arr) => arr.map((it) => (it.id === id ? data : it)));
            toast.success("Updated");
        } catch (err) {
            toast.error(formatApiError(err));
        }
    };

    return (
        <div className="space-y-4">
            <FilterBar {...list} onRefresh={list.reload} testidPrefix="claims" />
            <div className="hidden lg:block rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#F3F4F6] text-[#0F172A]">
                        <tr>
                            <th className="text-left p-3 font-semibold">Submitted</th>
                            <th className="text-left p-3 font-semibold">Name</th>
                            <th className="text-left p-3 font-semibold">Contact</th>
                            <th className="text-left p-3 font-semibold">Insurer / Policy</th>
                            <th className="text-left p-3 font-semibold">Type</th>
                            <th className="text-left p-3 font-semibold">Message</th>
                            <th className="text-left p-3 font-semibold">Status</th>
                            <th className="text-left p-3 font-semibold">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.items.map((it) => (
                            <tr
                                key={it.id}
                                data-testid={`claim-row-${it.id}`}
                                className="border-t border-[#E2E8F0] align-top"
                            >
                                <td className="p-3 text-[#475569] whitespace-nowrap">
                                    {fmtDate(it.created_at)}
                                </td>
                                <td className="p-3 font-medium text-[#0F172A]">{it.name}</td>
                                <td className="p-3">
                                    <div className="text-[#0F172A]">{it.email}</div>
                                    <div className="text-[#475569]">{it.phone}</div>
                                    <div className="mt-1.5">
                                        <ContactActions email={it.email} phone={it.phone} />
                                    </div>
                                </td>
                                <td className="p-3 text-[#475569]">
                                    <div>{it.insurer || "-"}</div>
                                    <div className="text-xs">{it.policy_number || ""}</div>
                                </td>
                                <td className="p-3 text-[#475569]">{it.claim_type || "-"}</td>
                                <td className="p-3 max-w-xs">
                                    <div className="text-[#475569] line-clamp-3">
                                        {it.message || "-"}
                                    </div>
                                </td>
                                <td className="p-3 space-y-1">
                                    <StatusBadge value={it.status} />
                                    <div>
                                        <StatusSelect
                                            value={it.status}
                                            testid={`claim-status-${it.id}`}
                                            onChange={(v) => updateOne(it.id, { status: v })}
                                        />
                                    </div>
                                </td>
                                <td className="p-3 min-w-[260px]">
                                    <NotesEditor
                                        initial={it.notes}
                                        testid={`claim-notes-${it.id}`}
                                        onSave={(notes) => updateOne(it.id, { notes })}
                                    />
                                </td>
                            </tr>
                        ))}
                        {!list.loading && list.items.length === 0 && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-[#475569]">
                                    No claim requests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-3">
                {list.items.map((it) => (
                    <MobileCard key={it.id}>
                        <div className="flex items-center justify-between">
                            <div className="font-medium text-[#0F172A]">{it.name}</div>
                            <StatusBadge value={it.status} />
                        </div>
                        <div className="text-xs text-[#475569]">{fmtDate(it.created_at)}</div>
                        <div className="text-sm text-[#0F172A]">{it.email}</div>
                        <div className="text-sm text-[#475569]">{it.phone}</div>
                        <div className="text-sm text-[#475569]">
                            {it.insurer || "-"} · {it.claim_type || "-"}
                        </div>
                        {it.message && (
                            <p className="text-sm text-[#475569]">{it.message}</p>
                        )}
                        <div className="flex items-center justify-between gap-2">
                            <StatusSelect
                                value={it.status}
                                onChange={(v) => updateOne(it.id, { status: v })}
                            />
                            <ContactActions email={it.email} phone={it.phone} />
                        </div>
                        <NotesEditor
                            initial={it.notes}
                            onSave={(notes) => updateOne(it.id, { notes })}
                        />
                    </MobileCard>
                ))}
            </div>
        </div>
    );
}

/* ---------- Page ---------- */
export default function AdminDashboardPage() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        inquiries: { total: 0, new: 0 },
        policy_uploads: { total: 0, new: 0 },
        claim_requests: { total: 0, new: 0 },
    });
    const [tab, setTab] = useState("inquiries");

    const loadStats = async () => {
        try {
            const { data } = await api.get("/admin/stats");
            setStats(data);
        } catch {}
    };
    useEffect(() => {
        loadStats();
    }, [tab]);

    const logout = () => {
        localStorage.removeItem("rp_admin_token");
        navigate("/admin/login", { replace: true });
    };

    const cards = useMemo(
        () => [
            {
                k: "content",
                label: "Website copy",
                icon: PencilLine,
                total: "Edit",
                new: "Database",
            },
            {
                k: "inquiries",
                label: "Consultation requests",
                icon: Inbox,
                ...stats.inquiries,
            },
            {
                k: "uploads",
                label: "Policy uploads",
                icon: FileText,
                ...stats.policy_uploads,
            },
            {
                k: "claims",
                label: "Claim support requests",
                icon: LifeBuoy,
                ...stats.claim_requests,
            },
        ],
        [stats]
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            <Toaster position="top-center" richColors />
            <header className="bg-white border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
                    <Link to="/" className="flex items-center gap-3">
                        <Logo asLink={false} className="h-10" />
                        <span className="text-[#475569] font-medium text-sm hidden sm:inline">
                            / admin
                        </span>
                    </Link>
                    <button
                        data-testid="admin-logout"
                        onClick={logout}
                        className="inline-flex items-center gap-1.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-lg px-3 py-1.5 hover:bg-[#FAF9F6]"
                    >
                        <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-[#475569]">
                        Manage incoming consultations, policy reviews, and claim support
                        requests.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cards.map((c) => (
                        <button
                            key={c.k}
                            data-testid={`stat-card-${c.k}`}
                            onClick={() => setTab(c.k)}
                            className={`rounded-2xl border p-5 text-left transition-colors ${
                                tab === c.k
                                    ? "border-[#C8322A]/40 bg-white shadow-sm"
                                    : "border-[#E2E8F0] bg-white hover:border-[#C8322A]/30"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                    <c.icon className="h-5 w-5" />
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#C8322A]">
                                    {c.k === "content" ? c.new : `${c.new} new`}
                                </span>
                            </div>
                            <div className="mt-4 font-display text-3xl font-bold text-[#0F172A]">
                                {c.total}
                            </div>
                            <div className="text-sm text-[#475569]">{c.label}</div>
                        </button>
                    ))}
                </div>

                <Tabs value={tab} onValueChange={setTab}>
                    <TabsList
                        data-testid="admin-tabs"
                        className="bg-white border border-[#E2E8F0]"
                    >
                        <TabsTrigger value="inquiries" data-testid="tab-inquiries">
                            Inquiries
                        </TabsTrigger>
                        <TabsTrigger value="content" data-testid="tab-content">
                            Site content
                        </TabsTrigger>
                        <TabsTrigger value="uploads" data-testid="tab-uploads">
                            Policy uploads
                        </TabsTrigger>
                        <TabsTrigger value="claims" data-testid="tab-claims">
                            Claim requests
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="inquiries" className="mt-4">
                        <InquiriesPanel />
                    </TabsContent>
                    <TabsContent value="content" className="mt-4">
                        <ContentPanel />
                    </TabsContent>
                    <TabsContent value="uploads" className="mt-4">
                        <UploadsPanel />
                    </TabsContent>
                    <TabsContent value="claims" className="mt-4">
                        <ClaimsPanel />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
