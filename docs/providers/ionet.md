---
summary: "Use IO Intelligence (io.net)'s OpenAI-compatible API with OpenClaw"
read_when:
  - You want to run OpenClaw with IO Intelligence models
  - You need the io.net provider id, key, or endpoint
title: "IO Intelligence"
---

IO Intelligence is io.net's hosted model API serving popular open-weight
models behind a single OpenAI-compatible endpoint and API key. Most OpenAI
SDKs work against it by switching the base URL. OpenClaw provides IO
Intelligence through the official external `@openclaw/ionet-provider` plugin.
Model refs use the `ionet/org/model` form, for example
`ionet/openai/gpt-oss-20b`.

## Install plugin

```bash
openclaw plugins install @openclaw/ionet-provider
```

Installation applies to a running Gateway automatically; otherwise it takes effect
on the next startup. See [Apply changes and inspect](/plugins/manage-plugins#apply-changes-and-inspect).

## Get an API key

1. Sign in at [io.net](https://io.net/)
2. Open [API keys and secrets](https://io.net/docs/guides/intelligence/api-keys-and-secrets) and create a key

## CLI setup

```bash
openclaw onboard --ionet-api-key <key>
```

Or set the environment variable:

```bash
export IONET_API_KEY="<your-...key>" # pragma: allowlist secret
```

## Config snippet

```json5
{
  env: { vars: { IONET_API_KEY: "<your-ionet-api-key>" } }, // pragma: allowlist secret
  agents: {
    defaults: {
      model: { primary: "ionet/openai/gpt-oss-20b" },
    },
  },
}
```

## Defaults

| Setting       | Value                                          |
| ------------- | ---------------------------------------------- |
| Plugin        | `@openclaw/ionet-provider`                     |
| Provider id   | `ionet`                                        |
| Aliases       | `io-intelligence`, `io-net`                    |
| Base URL      | `https://api.intelligence.io.solutions/api/v1` |
| Env var       | `IONET_API_KEY`                                |
| Default model | `ionet/openai/gpt-oss-20b`                     |

## Available models

OpenClaw ships a static starting catalog and refreshes the list live from
`https://api.intelligence.io.solutions/api/v1/models` once `IONET_API_KEY` is
configured. Use `/models ionet` or `openclaw models list --provider ionet` to
see the current list.

Model ids are Hugging Face-style `org/name` routes used with the `ionet/`
prefix:

```text
ionet/deepseek-ai/DeepSeek-V4.1-Flash
ionet/deepseek-ai/DeepSeek-R1-0528
ionet/moonshotai/Kimi-K3
ionet/moonshotai/Kimi-K2.7-Code
ionet/zai-org/GLM-5.3
ionet/zai-org/GLM-5.3-Flash
ionet/openai/gpt-oss-120b
ionet/openai/gpt-oss-20b
ionet/meta-llama/Llama-3.3-70B-Instruct
ionet/Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar
...and more
```

The default model `openai/gpt-oss-20b` sits in the lowest io.net access tier
so it works for every account. Some catalog routes require a higher account
tier; if a route returns an access error, pick another model from
`openclaw models list --provider ionet`.

## When to choose IO Intelligence

- Hosted open-weight model access with an OpenAI-compatible API.
- DeepSeek, Kimi, GLM, Qwen, or Llama-family routes through a single
  provider account.
- Another hosted fallback path beside DeepInfra, NovitaAI, OpenRouter, or
  direct vendor APIs.

Choose a direct vendor provider when you need vendor-native request
parameters or support contracts. Choose a local provider when the model must
run on your own hardware or network boundary.

## Troubleshooting

- `401`/`403`: verify the key in IO Intelligence's key management page and
  re-run `openclaw onboard --auth-choice ionet-api-key` if the stored profile
  is stale.
- Access-tier errors on a specific route: that model requires a higher io.net
  account tier; choose a lower-tier model from
  `openclaw models list --provider ionet`.
- Unknown model errors: use the exact `ionet/<route-id>` returned by
  `openclaw models list --provider ionet`.

## Related

- [Model providers](/concepts/model-providers)
- [Provider directory](/providers/index)
