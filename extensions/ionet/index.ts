// IO Intelligence (io.net) plugin entrypoint registers its OpenClaw integration.
import { readConfiguredProviderCatalogEntries } from "openclaw/plugin-sdk/provider-catalog-shared";
import { defineSingleProviderPluginEntry } from "openclaw/plugin-sdk/provider-entry";
import { buildProviderReplayFamilyHooks } from "openclaw/plugin-sdk/provider-model-shared";
import { buildProviderToolCompatFamilyHooks } from "openclaw/plugin-sdk/provider-tools";
import manifest from "./openclaw.plugin.json" with { type: "json" };

const PROVIDER_ID = "ionet";

export default defineSingleProviderPluginEntry({
  id: PROVIDER_ID,
  name: "IO Intelligence Provider",
  description: "Official OpenClaw IO Intelligence (io.net) provider plugin",
  manifest,
  provider: {
    label: "IO Intelligence",
    docsPath: "/providers/ionet",
    aliases: ["io-intelligence", "io-net"],
    manifestAuth: {
      noteTitle: "IO Intelligence",
      noteMessage:
        "Manage API keys at https://io.net/docs/guides/intelligence/api-keys-and-secrets",
    },
    catalog: {
      discoveryMode: "strict",
      allowExplicitBaseUrl: true,
      liveModelDiscovery: true,
    },
    augmentModelCatalog: ({ config }) =>
      readConfiguredProviderCatalogEntries({
        config,
        providerId: PROVIDER_ID,
      }),
    ...buildProviderReplayFamilyHooks({
      family: "openai-compatible",
      dropReasoningFromHistory: false,
    }),
    ...buildProviderToolCompatFamilyHooks("openai"),
  },
});
