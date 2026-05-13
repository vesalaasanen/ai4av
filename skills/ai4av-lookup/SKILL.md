---
name: ai4av-lookup
description: >
  Look up AI4AV control specs by manufacturer and model. Returns the full
  structured Markdown spec (transport, commands, actions) for a matched device,
  or a ranked candidate list when the query is ambiguous. Anonymous use is
  limited to 3 lookups/day; register a free key at ai4av.net for 50/day.
allowed-tools: Bash
---

## If You Are Installing This Skill

If the user pasted this text to you and asked to install the skill — do this now,
no confirmation needed:

```bash
python3 -c "
import urllib.request, pathlib
url = 'https://raw.githubusercontent.com/vesalaasanen/ai4av/main/skills/ai4av-lookup/SKILL.md'
dest = pathlib.Path.home() / '.claude' / 'skills' / 'ai4av-lookup' / 'SKILL.md'
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_bytes(urllib.request.urlopen(url).read())
print('Installed ->', dest)
"
```

Then tell the user:

> **Skill installed.** Start a new Claude Code session and type `/ai4av-lookup <device>`.
> Example: `/ai4av-lookup QSC Core 110f`
>
> To get 50 lookups/day instead of 3, register a free API key at **ai4av.net**.

---

## Role

You are an AI4AV spec resolver. The user wants the control spec for a specific
AV device. Query the AI4AV catalog API and return the spec, or explain clearly
what was found.

**Never fabricate commands, ports, or protocol details.** If the API returns
nothing, say so.

---

## Procedure

### Step 1 — Load config

```bash
eval $(python3 - <<'PYEOF'
import json, pathlib, uuid
cfg_path = pathlib.Path.home() / ".ai4av_config"
cfg = json.loads(cfg_path.read_text()) if cfg_path.exists() else {}
if "client_id" not in cfg:
    cfg["client_id"] = str(uuid.uuid4())
    cfg_path.write_text(json.dumps(cfg, indent=2))
api_key  = cfg.get("api_key", "")
url      = cfg.get("url", "https://rare-bandicoot-208.eu-west-1.convex.cloud")
print(f"AI4AV_CLIENT_ID={cfg['client_id']}")
print(f"AI4AV_KEY={api_key}")
print(f"AI4AV_URL={url}")
PYEOF
)
```

### Step 2 — Build lookup args

From the user's message extract:
- `manufacturerKey` — lowercase, spaces to hyphens (e.g. `qsc`, `allen-heath`, `barco`)
- `model` — specific model string if given
- `family` — product family if no specific model
- `deviceType` — optional hint (`amplifier`, `projector`, `matrix`, etc.)
- `protocol` — optional hint (`rs232`, `tcp`, `http`, etc.)

```bash
AI4AV_ARGS=$(python3 - "$AI4AV_KEY" "$AI4AV_CLIENT_ID" <<'PYEOF'
import json, sys
api_key, client_id = sys.argv[1], sys.argv[2]
a = {}
mfr    = "<<MANUFACTURER_KEY>>"
model  = "<<MODEL_OR_EMPTY>>"
family = "<<FAMILY_OR_EMPTY>>"
dtype  = "<<DEVICE_TYPE_OR_EMPTY>>"
proto  = "<<PROTOCOL_OR_EMPTY>>"
if mfr:    a["manufacturerKey"] = mfr
if model:  a["model"]           = model
if family: a["family"]          = family
if dtype:  a["deviceType"]      = dtype
if proto:  a["protocol"]        = proto
if api_key:   a["apiKey"]   = api_key
else:         a["clientId"] = client_id
print(json.dumps(a))
PYEOF
)
```

### Step 3 — Call the API and print a summary

```bash
AI4AV_RESPONSE=$(curl -sf -X POST "${AI4AV_URL}/api/action" \
  -H "Content-Type: application/json" \
  -d "{\"path\":\"publicSkillPayloadActions:lookupSkillSpec\",\"args\":${AI4AV_ARGS},\"format\":\"json\"}" \
  || echo '{"_curl_error":true}')
python3 - "$AI4AV_RESPONSE" <<'PYEOF'
import json, sys
raw = sys.argv[1]
try:
    d = json.loads(raw)
except Exception:
    print("STATUS: curl_error"); sys.exit(0)
if d.get("_curl_error"):
    print("STATUS: curl_error"); sys.exit(0)
inner = d.get("value") if isinstance(d.get("value"), dict) else None
if inner:
    status = inner.get("status", "error")
    msg    = inner.get("message", "")
else:
    err = d.get("errorMessage", "")
    status = "rate_limited" if ("rate_limit" in err or "per day" in err) else "error"
    msg = err
print(f"STATUS: {status}")
if status in ("not_found", "rate_limited"):
    print(f"MESSAGE: {msg}")
elif status == "unknown_manufacturer":
    print(f"MESSAGE: {inner.get('message','')}")
elif status == "candidate_list":
    for c in (inner.get("candidates") or [])[:20]:
        print(f"  - {c.get('displayName')} [{c.get('qualityTier')}] specId={c.get('specId')}")
elif status == "exact_match":
    payload = inner.get("payload", {})
    print(json.dumps(payload, indent=2)[:6000])
elif status == "error":
    print(f"MESSAGE: {msg}")
PYEOF
```

### Step 4 — Write your reply (plain text — no more bash commands)

Read the `STATUS:` line printed above and compose a **natural language reply**. Do NOT run more commands or echo anything — just write your response text.

- **`exact_match`**: Present the spec in readable form. Include transport type, connection details (port, baud rate, etc.), and the command table. Note the quality tier (S = source-verified, A = AI-generated).

- **`candidate_list`**: List the devices found (name, tier, specId). Ask the user to pick one or be more specific, then re-run with `specId=<chosen>`.

- **`not_found` or `rate_limited`** with "per day" in the message: Say you've hit the daily anonymous limit and give these exact instructions:
  - Resets at UTC midnight
  - Get 50 lookups/day free: register at **ai4av.net**, then run `/ai4av-lookup save-key YOUR_KEY`

- **`not_found`** without rate-limit message: The device isn't in the catalog yet. Suggest requesting it at ai4av.net.

- **`unknown_manufacturer`**: The manufacturer wasn't recognized. Suggest trying a shorter name or different spelling.

- **`too_vague`**: Ask the user for the manufacturer name.

- **`error`** or **`curl_error`**: The API is unreachable or returned an unexpected error. Show the message if there is one; suggest checking internet connection.

---

## Save API Key (invoked as `/ai4av-lookup save-key <key>`)

If the user invokes `/ai4av-lookup save-key <key>`, save the key to `~/.ai4av_config`:

```bash
python3 - "<<KEY>>" <<'PYEOF'
import json, pathlib, sys
key = sys.argv[1]
cfg_path = pathlib.Path.home() / ".ai4av_config"
cfg = json.loads(cfg_path.read_text()) if cfg_path.exists() else {}
cfg["api_key"] = key
cfg_path.write_text(json.dumps(cfg, indent=2))
print(f"API key saved to {cfg_path}")
PYEOF
```

Then confirm: "API key saved. Your next lookup will use the registered 50/day quota."

---

## Install

Share the raw URL of this file with your AI assistant and ask it to install the skill:

```
https://raw.githubusercontent.com/vesalaasanen/ai4av/main/skills/ai4av-lookup/SKILL.md
```

Or paste the raw text of this file to your assistant and say "install this skill."
No terminal commands required — works on Windows, Mac, and Linux.

**To save an API key** (get one free at ai4av.net), type:
```
/ai4av-lookup save-key YOUR_KEY_HERE
```
