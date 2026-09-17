// IO Intelligence tests cover index plugin behavior.
import { registerSingleProviderPlugin } from "openclaw/plugin-sdk/plugin-test-runtime";
import { describe, expect, it } from "vitest";
import plugin from "./index.js";

describe("ionet provider plugin", () => {
  it("registers IO Intelligence as an OpenAI-compatible provider", async () => {
    const provider = await registerSingleProviderPlugin(plugin);

    expect(provider.id).toBe("ionet");
    expect(provider.aliases).toEqual(["io-intelligence", "io-net"]);
    expect(provider.envVars).toEqual(["IONET_API_KEY"]);
    expect(provider.auth?.map((method) => method.id)).toEqual(["api-key"]);
    expect(provider.auth?.[0]?.starterModel).toBe("ionet/openai/gpt-oss-20b");

    const result = await provider.staticCatalog?.run({
      config: {},
      env: {},
      resolveProviderApiKey: () => ({}),
    } as never);
    const catalogProvider = result && "provider" in result ? result.provider : undefined;
    expect(catalogProvider?.baseUrl).toBe("https://api.intelligence.io.solutions/api/v1");
    expect(catalogProvider?.models?.map((model) => model.id)).toContain("openai/gpt-oss-20b");
  });
});
