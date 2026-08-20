import { getTranslations } from "next-intl/server";
import { type Locale } from "@/lib/locale";
import { HeaderClient } from "./HeaderClient";
import { getDomainUrl } from "@/lib/domains";
import {
  Globe,
  Sparkles,
  Users,
  Cloud,
  Server,
  Package,
  MessageSquare,
  Mic,
  Bot,
  Shield,
  Lock,
  Database,
  Flag,
  Compass,
  Calendar,
  Zap,
  GitBranch,
  Award,
  LifeBuoy,
  BookOpen,
  HelpCircle,
  Activity,
  Mail,
  Code,
  Terminal,
  Webhook,
  Grid,
  Plug,
} from "lucide-react";

interface HeaderProps {
  locale?: Locale;
}

export async function Header({ locale: initialLocale }: HeaderProps) {
  const locale = initialLocale || "fr";
  const t = await getTranslations({ locale, namespace: "Header" });

  const links = {
    home: "/",
    downloads: "/download",
    signup: "/login",
  };

  const navigation = [
    {
      type: "link" as const,
      label: t("downloads"),
      href: "/download",
    },
    {
      type: "dropdown" as const,
      label: t("discover"),
      sections: [
        {
          titleKey: "discoverOverview",
          items: [
            {
              label: t("discoverOverview"),
              description: t("discoverOverviewDesc"),
              href: "/discovery/overview",
              icon: <Globe className="h-5 w-5" />,
            },
            {
              label: t("discoverFeatures"),
              description: t("discoverFeaturesDesc"),
              href: "/discovery/features",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              label: t("discoverGuilds"),
              description: t("discoverGuildsDesc"),
              href: "/discovery/guilds",
              icon: <Users className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "discoverDeploy",
          items: [
            {
              label: t("discoverCloud"),
              description: t("discoverCloudDesc"),
              href: "/discovery/cloud",
              icon: <Cloud className="h-5 w-5" />,
            },
            {
              label: t("discoverSelfHost"),
              description: t("discoverSelfHostDesc"),
              href: "/discovery/self-host",
              icon: <Server className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "dropdown" as const,
      label: t("products"),
      sections: [
        {
          titleKey: "productsCore",
          items: [
            {
              label: t("productsOverview"),
              description: t("productsOverviewDesc"),
              href: "/products/overview",
              icon: <Package className="h-5 w-5" />,
            },
            {
              label: t("productsGuilds"),
              description: t("productsGuildsDesc"),
              href: "/products/guilds",
              icon: <Users className="h-5 w-5" />,
            },
            {
              label: t("productsChannels"),
              description: t("productsChannelsDesc"),
              href: "/products/channels",
              icon: <MessageSquare className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "productsFeatures",
          items: [
            {
              label: t("productsVoice"),
              description: t("productsVoiceDesc"),
              href: "/products/voices",
              icon: <Mic className="h-5 w-5" />,
            },
            {
              label: t("productsBots"),
              description: t("productsBotsDesc"),
              href: "/products/bots",
              icon: <Bot className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "dropdown" as const,
      label: t("safety"),
      sections: [
        {
          titleKey: "safetyProtection",
          items: [
            {
              label: t("safetyOverview"),
              description: t("safetyOverviewDesc"),
              href: "/security/overview",
              icon: <Shield className="h-5 w-5" />,
            },
            {
              label: t("safetyPrivacy"),
              description: t("safetyPrivacyDesc"),
              href: "/security/privacy",
              icon: <Lock className="h-5 w-5" />,
            },
            {
              label: t("safetyData"),
              description: t("safetyDataDesc"),
              href: "/security/data",
              icon: <Database className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "safetyOperations",
          items: [
            {
              label: t("safetyInfrastructure"),
              description: t("safetyInfrastructureDesc"),
              href: "/security/infrastructure",
              icon: <Server className="h-5 w-5" />,
            },
            {
              label: t("safetyReport"),
              description: t("safetyReportDesc"),
              href: "/security/report",
              icon: <Flag className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "dropdown" as const,
      label: t("quests"),
      sections: [
        {
          titleKey: "questsExplore",
          items: [
            {
              label: t("questsDiscoverGuilds"),
              href: "/quests/guilds",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              label: t("questsCommunity"),
              href: "/quests/community",
              icon: <Users className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "questsActivities",
          items: [
            {
              label: t("questsEvents"),
              href: "/quests/events",
              icon: <Calendar className="h-5 w-5" />,
            },
            {
              label: t("questsChallenges"),
              href: "/quests/challenges",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              label: t("questsContribute"),
              href: "/quests/contribute",
              icon: <GitBranch className="h-5 w-5" />,
            },
            {
              label: t("questsBadges"),
              href: "/quests/badges",
              icon: <Award className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "dropdown" as const,
      label: t("support"),
      sections: [
        {
          titleKey: "supportResources",
          items: [
            {
              label: t("supportHelpCenter"),
              href: "/support/help-center",
              icon: <LifeBuoy className="h-5 w-5" />,
            },
            {
              label: t("supportDocumentation"),
              href: "/support/documentation",
              icon: <BookOpen className="h-5 w-5" />,
            },
            {
              label: t("supportFaq"),
              href: "/support/faq",
              icon: <HelpCircle className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "supportConnect",
          items: [
            {
              label: t("supportStatus"),
              href: "/support/status",
              icon: <Activity className="h-5 w-5" />,
              external: true,
            },
            {
              label: t("supportContact"),
              href: "/support/contact",
              icon: <Mail className="h-5 w-5" />,
            },
            {
              label: t("supportCommunity"),
              href: "/support/community",
              icon: <Users className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "link" as const,
      label: t("blog"),
      href: "/blog",
    },
    {
      type: "dropdown" as const,
      label: t("developers"),
      sections: [
        {
          titleKey: "devDevelop",
          items: [
            {
              label: t("devPortal"),
              href: "/developers/portal",
              icon: <Code className="h-5 w-5" />,
            },
            {
              label: t("devApi"),
              href: "/developers/api",
              icon: <Terminal className="h-5 w-5" />,
            },
            {
              label: t("devBots"),
              href: "/developers/bots",
              icon: <Bot className="h-5 w-5" />,
            },
            {
              label: t("devSdk"),
              href: "/developers/sdk",
              icon: <Package className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "devTools",
          items: [
            {
              label: t("devWebhooks"),
              href: "/developer/webhooks",
              icon: <Webhook className="h-5 w-5" />,
            },
            {
              label: t("devApps"),
              href: "/developers/apps",
              icon: <Grid className="h-5 w-5" />,
            },
            {
              label: t("devIntegrations"),
              href: "/developers/integrations",
              icon: <Plug className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
    {
      type: "link" as const,
      label: t("careers"),
      href: "/careers",
    },
  ];

  const translations = {
    brandName: t("brandName"),
    downloads: t("downloads"),
    blog: t("blog"),
    careers: t("careers"),
    openGuilderia: t("openGuilderia"),
    login: t("login"),
    menuLabel: "Open menu",
  };

  return (
    <HeaderClient
      locale={locale}
      translations={translations}
      links={links}
      navigation={navigation}
      ctaUrls={{
        login: getDomainUrl("sso", "/login"),
        app: getDomainUrl("main", "/channels/me"),
      }}
    />
  );
}
