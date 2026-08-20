import * as React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/lib/locale";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import {
  Download,
  Globe,
  Hash,
  Search,
  ChevronDown,
  Plus,
  Code,
  Shield,
  Server,
  Users,
  Mic,
  Settings,
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  Globe2,
  Radio,
} from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/* ── Floating star particles ──────────────────────────────────────────────── */

const STAR_POSITIONS = [
  { size: 2, top: 5, left: 12, delay: 0 },
  { size: 1, top: 15, left: 45, delay: 1.2 },
  { size: 3, top: 25, left: 78, delay: 0.5 },
  { size: 1, top: 35, left: 22, delay: 2.1 },
  { size: 2, top: 45, left: 88, delay: 0.8 },
  { size: 1, top: 55, left: 33, delay: 1.5 },
  { size: 3, top: 65, left: 67, delay: 0.3 },
  { size: 2, top: 75, left: 15, delay: 2.4 },
  { size: 1, top: 85, left: 52, delay: 1.8 },
  { size: 2, top: 92, left: 82, delay: 0.7 },
  { size: 1, top: 8, left: 58, delay: 1.1 },
  { size: 2, top: 18, left: 92, delay: 2.2 },
  { size: 1, top: 42, left: 5, delay: 0.9 },
  { size: 3, top: 58, left: 40, delay: 1.6 },
  { size: 1, top: 72, left: 95, delay: 2.5 },
  { size: 2, top: 88, left: 28, delay: 0.4 },
  { size: 1, top: 3, left: 70, delay: 1.3 },
  { size: 2, top: 50, left: 60, delay: 2.0 },
  { size: 1, top: 30, left: 10, delay: 0.6 },
  { size: 2, top: 80, left: 48, delay: 1.9 },
];

function StarParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {STAR_POSITIONS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-foreground/30"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animation: "twinkle 3s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero app-window mockup ───────────────────────────────────────────────── */

interface MockupTranslations {
  brandName: string;
  textChannels: string;
  voiceChannels: string;
  lounge: string;
  general: string;
  timePrefix: string;
  inputPlaceholder: string;
  badge: string;
}

function ProductMockup({ t: m }: { t: MockupTranslations }) {
  const channels = [
    { name: m.general, icon: Hash },
    { name: "annonces", icon: Hash },
    { name: "design-lab", icon: Hash },
    { name: "random", icon: Hash },
  ];
  const messages = [
    { name: "Aïcha", initials: "AL", color: "bg-pink-500/15", text: "Ce soir c'est session anime — je propose l'épisode 5, on en parlait depuis longtemps !", time: "09:41" },
    { name: "Kenji", initials: "KM", color: "bg-violet-500/15", text: "Je prépare le salon vocal et le visionnage groupé. Qui a le popcorn ?", time: "09:43" },
    { name: "June Park", initials: "JP", color: "bg-primary/15", text: "Nice. Je vais revoir les guidelines avant l'appel communautaire de ce soir.", time: "09:47" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-2 rounded-full bg-destructive/70" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-muted/70" />
      </div>
      <div className="grid min-h-77.5 grid-cols-[46px_150px_1fr] overflow-hidden rounded-b-xl bg-background sm:min-h-97.5 sm:grid-cols-[58px_190px_1fr]">
        <aside className="flex flex-col items-center gap-3 border-r border-border bg-muted/40 py-4">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-3.5" />
          </div>
          <div className="flex size-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
            <Plus className="size-3.5" />
          </div>
          <div className="mt-auto flex size-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
            <Settings className="size-3.5" />
          </div>
        </aside>
        <aside className="border-r border-border bg-muted/20 p-3">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {m.brandName}
            </span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
            <Hash className="size-3" /> {m.textChannels}
          </div>
          <div className="flex flex-col gap-1">
            {channels.map((channel, i) => (
              <div
                key={channel.name}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                  i === 0 ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                <Hash className="size-3" />
                {channel.name}
              </div>
            ))}
          </div>
          <div className="mb-3 mt-6 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
            <Mic className="size-3" /> {m.voiceChannels}
          </div>
          <div className="flex items-center gap-2 px-2 text-[11px] text-muted-foreground">
            <Radio className="size-3 text-primary" /> {m.lounge}
          </div>
        </aside>
        <section className="flex min-w-0 flex-col">
          <div className="flex h-11 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <Hash className="size-4 text-muted-foreground" />
              <span className="text-xs font-semibold">{m.general}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Users className="size-3.5" />
              <Search className="size-3.5" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-4 p-4">
            {messages.map((message) => (
              <div key={message.name} className="flex gap-3">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full ${message.color} text-[9px] font-semibold`}
                >
                  {message.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-semibold">{message.name}</span>
                    <span className="text-[9px] text-muted-foreground">
                      {m.timePrefix} {message.time}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="m-3 flex h-9 items-center rounded-lg border border-border bg-muted/40 px-3 text-[10px] text-muted-foreground">
            {m.inputPlaceholder} <Plus className="ml-auto size-3" />
          </div>
        </section>
      </div>
      <div className="pointer-events-none absolute -bottom-5 -right-5 hidden rounded-xl border border-border bg-card p-3 shadow-lg sm:block">
        <div className="flex items-center gap-2 text-[10px] font-medium">
          <Shield className="size-3.5 text-primary" /> {m.badge}
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function PublicHomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Public.home" });

  const prefix = `/${locale}`;

  return (
    <div id="top" className="min-h-screen bg-background text-foreground select-none">
      <Header locale={locale as Locale} />

      <main>
        {/* ══════════════════════════════════════════════════════════════════════
            HERO — First impression
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-border/70">
          <StarParticles />

          <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 pb-20 pt-10 text-center lg:px-8 lg:pb-28 lg:pt-16">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {t("heroBadge")}
              </div>
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                {t("heroTitle")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {t("heroDescription")}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={`${prefix}/download`}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  <Download className="size-4" />
                  {t("heroDownloadCta")}
                </Link>
                <Link
                  href={t("heroBrowserCtaHref")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Code className="size-4" />
                  {t("heroBrowserCta")}
                </Link>
              </div>
            </div>

            <ProductMockup
              t={{
                brandName: t("mockupBrandName"),
                textChannels: t("mockupTextChannels"),
                voiceChannels: t("mockupVoiceChannels"),
                lounge: t("mockupLounge"),
                general: t("mockupGeneral"),
                timePrefix: t("mockupTimePrefix"),
                inputPlaceholder: t("mockupInputPlaceholder"),
                badge: t("mockupBadge"),
              }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            PRODUCT EXPERIENCE — Show the interface
            ══════════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("productBadge")}
              </p>
              <h2 className="max-w-lg text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t("productTitle")}
              </h2>
            </div>
            <p className="max-w-md text-pretty leading-7 text-muted-foreground lg:justify-self-end">
              {t("productDescription")}
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-6 sm:p-8">
              <MessageCircle className="size-5" />
              <h3 className="mt-14 text-lg font-semibold">{t("productFeature1Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("productFeature1Description")}</p>
            </div>
            <div className="bg-card p-6 sm:p-8">
              <Shield className="size-5" />
              <h3 className="mt-14 text-lg font-semibold">{t("productFeature2Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("productFeature2Description")}</p>
            </div>
            <div className="bg-card p-6 sm:p-8">
              <Globe2 className="size-5" />
              <h3 className="mt-14 text-lg font-semibold">{t("productFeature3Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("productFeature3Description")}</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            WHY GUILDERIA — Core principles
            ══════════════════════════════════════════════════════════════════════ */}
        <section id="principles" className="border-y border-border/70 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("whyBadge")}
              </p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t("whyTitle")}
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div>
                <Code className="size-5" />
                <h3 className="mt-6 text-xl font-semibold">{t("whyOpenSourceTitle")}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("whyOpenSourceDescription")}</p>
              </div>
              <div>
                <Check className="size-5" />
                <h3 className="mt-6 text-xl font-semibold">{t("whyFreeTitle")}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("whyFreeDescription")}</p>
              </div>
              <div>
                <Shield className="size-5" />
                <h3 className="mt-6 text-xl font-semibold">{t("whyPrivacyTitle")}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("whyPrivacyDescription")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CLOUD / SELF-HOSTED — Deployment options
            ══════════════════════════════════════════════════════════════════════ */}
        <section id="deploy" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("deployBadge")}
              </p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t("deployTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              {t("deployDescription")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
                <Globe className="size-5" />
              </div>
              <h3 className="mt-16 text-2xl font-semibold">{t("cloudTitle")}</h3>
              <p className="mt-3 max-w-sm leading-7 text-muted-foreground">{t("cloudDescription")}</p>
              <Link
                href={`${prefix}/download`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {t("cloudCta")} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-primary p-7 text-primary-foreground sm:p-9">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10">
                <Server className="size-5" />
              </div>
              <h3 className="mt-16 text-2xl font-semibold">{t("selfHostedTitle")}</h3>
              <p className="mt-3 max-w-sm leading-7 text-primary-foreground/70">{t("selfHostedDescription")}</p>
              <Link
                href="/developers/quickstarts"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {t("selfHostedCta")} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            OPEN SOURCE — Transparency
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-y border-border/70 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("openSourceBadge")}
              </p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t("openSourceTitle")}
              </h2>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
                {t("openSourceDescription")}
              </p>
              <div className="mt-8">
                <Link
                  href="https://github.com/sky-genesis-enterprise/guilderia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  {t("openSourceCta")} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            COMMUNITY / GUILD — Build your guild
            ══════════════════════════════════════════════════════════════════════ */}
        <section id="community" className="border-y border-border/70">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-24 lg:flex-row lg:items-end lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("guildBadge")}
              </p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                {t("guildTitle")}
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-8 text-muted-foreground">
                {t("guildDescription")}
              </p>
            </div>
            <Link
              href={`${prefix}/download`}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {t("guildCta")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FINAL CTA — Conversion
            ══════════════════════════════════════════════════════════════════════ */}
        <section id="start" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="rounded-3xl bg-muted/60 px-6 py-16 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("ctaBadge")}
            </p>
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-tighter sm:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`${prefix}/download`}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Download className="size-4" />
                {t("ctaCta")}
              </Link>
              <Link
                href="https://github.com/sky-genesis-enterprise/guilderia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Code className="size-4" />
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  );
}
