import { getTranslations } from "next-intl/server";
import { type Locale } from "@/lib/locale";
import { HeaderClient } from "./HeaderClient";
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
  ExternalLink,
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
              href: "/discovery",
              icon: <Globe className="h-5 w-5" />,
            },
            {
              label: t("discoverFeatures"),
              description: t("discoverFeaturesDesc"),
              href: "/features",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              label: t("discoverGuilds"),
              description: t("discoverGuildsDesc"),
              href: "/discovery",
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
              href: "/download",
              icon: <Cloud className="h-5 w-5" />,
            },
            {
              label: t("discoverSelfHost"),
              description: t("discoverSelfHostDesc"),
              href: "/download",
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
              href: "/features",
              icon: <Package className="h-5 w-5" />,
            },
            {
              label: t("productsGuilds"),
              description: t("productsGuildsDesc"),
              href: "/discovery",
              icon: <Users className="h-5 w-5" />,
            },
            {
              label: t("productsChannels"),
              description: t("productsChannelsDesc"),
              href: "/features",
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
              href: "/features",
              icon: <Mic className="h-5 w-5" />,
            },
            {
              label: t("productsBots"),
              description: t("productsBotsDesc"),
              href: "/features",
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
              href: "/security",
              icon: <Shield className="h-5 w-5" />,
            },
            {
              label: t("safetyPrivacy"),
              description: t("safetyPrivacyDesc"),
              href: "/security",
              icon: <Lock className="h-5 w-5" />,
            },
            {
              label: t("safetyData"),
              description: t("safetyDataDesc"),
              href: "/security",
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
              href: "/security",
              icon: <Server className="h-5 w-5" />,
            },
            {
              label: t("safetyReport"),
              description: t("safetyReportDesc"),
              href: "/security",
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
              href: "/discovery",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              label: t("questsCommunity"),
              href: "/discovery",
              icon: <Users className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "questsActivities",
          items: [
            {
              label: t("questsEvents"),
              href: "/quests",
              icon: <Calendar className="h-5 w-5" />,
            },
            {
              label: t("questsChallenges"),
              href: "/quests",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              label: t("questsContribute"),
              href: "/download",
              icon: <GitBranch className="h-5 w-5" />,
            },
            {
              label: t("questsBadges"),
              href: "/quests",
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
              href: "/security",
              icon: <LifeBuoy className="h-5 w-5" />,
            },
            {
              label: t("supportDocumentation"),
              href: "/developers",
              icon: <BookOpen className="h-5 w-5" />,
            },
            {
              label: t("supportFaq"),
              href: "/security",
              icon: <HelpCircle className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "supportConnect",
          items: [
            {
              label: t("supportStatus"),
              href: "/security",
              icon: <Activity className="h-5 w-5" />,
              external: true,
            },
            {
              label: t("supportContact"),
              href: "/security",
              icon: <Mail className="h-5 w-5" />,
            },
            {
              label: t("supportCommunity"),
              href: "/discovery",
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
              href: "/developers",
              icon: <Code className="h-5 w-5" />,
            },
            {
              label: t("devApi"),
              href: "/developers",
              icon: <Terminal className="h-5 w-5" />,
            },
            {
              label: t("devBots"),
              href: "/developers",
              icon: <Bot className="h-5 w-5" />,
            },
            {
              label: t("devSdk"),
              href: "/developers",
              icon: <Package className="h-5 w-5" />,
            },
          ],
        },
        {
          titleKey: "devTools",
          items: [
            {
              label: t("devWebhooks"),
              href: "/developers",
              icon: <Webhook className="h-5 w-5" />,
            },
            {
              label: t("devApps"),
              href: "/developers",
              icon: <Grid className="h-5 w-5" />,
            },
            {
              label: t("devIntegrations"),
              href: "/developers",
              icon: <Plug className="h-5 w-5" />,
            },
            {
              label: t("devGithub"),
              href: "https://github.com/skygenesisenterprise/guilderia",
              icon: <ExternalLink className="h-5 w-5" />,
              external: true,
            },
          ],
        },
      ],
    },
    {
      type: "link" as const,
      label: t("careers"),
      href: "/company",
    },
  ];

  const translations = {
    brandName: t("brandName"),
    downloads: t("downloads"),
    blog: t("blog"),
    careers: t("careers"),
    openGuilderia: t("openGuilderia"),
    menuLabel: "Open menu",
  };

  return (
    <HeaderClient
      locale={locale}
      translations={translations}
      links={links}
      navigation={navigation}
    />
  );
}
