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

Install this skill as a normal AI-agent skill folder named `ai4av-lookup`.
It is usable from Claude Code, Codex, and other systems that load Markdown
skills.

For Codex, use the Skill Installer with this GitHub path:

```
https://github.com/vesalaasanen/ai4av/tree/main/skills/ai4av-lookup
```

If no installer is available, copy this folder to the agent's configured skills
directory:

- Codex: `$CODEX_HOME/skills/ai4av-lookup`, or `~/.codex/skills/ai4av-lookup`
  when `CODEX_HOME` is unset.
- Claude Code: `~/.claude/skills/ai4av-lookup`.
- Other agents: the configured skill/plugin directory for that runtime.

Codex install command:

```bash
python3 -c "
import os, urllib.request, pathlib
base = 'https://raw.githubusercontent.com/vesalaasanen/ai4av/main/skills/ai4av-lookup'
home = pathlib.Path.home()
root = pathlib.Path(os.environ.get('CODEX_HOME', home / '.codex'))
dest = root / 'skills' / 'ai4av-lookup'
for rel in ('SKILL.md', 'agents/openai.yaml'):
    path = dest / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(urllib.request.urlopen(f'{base}/{rel}').read())
print('Installed ->', dest)
"
```

Claude Code install command:

```bash
python3 -c "
import urllib.request, pathlib
base = 'https://raw.githubusercontent.com/vesalaasanen/ai4av/main/skills/ai4av-lookup'
dest = pathlib.Path.home() / '.claude' / 'skills' / 'ai4av-lookup'
for rel in ('SKILL.md', 'agents/openai.yaml'):
    path = dest / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(urllib.request.urlopen(f'{base}/{rel}').read())
print('Installed ->', dest)
"
```

Then tell the user:

> **Skill installed.** Restart your AI agent so it can load the new skill.
> Example prompt: `/ai4av-lookup download the verified control spec for Christie Spyder X20`
> In Claude Code, `/ai4av-lookup build me a source and volume control web app for my LG OLED series TV` also works.
>
> To get 50 lookups/day instead of 3, register a free API key at **ai4av.net**.

---

## Role

You are an AI4AV spec resolver. The user wants the control spec for a specific
AV device. Query the AI4AV catalog API and return the spec, or explain clearly
what was found.

If the user asks for a downstream artifact such as a downloaded spec file, an
integration stub, or a small control UI, first resolve the device spec with this
skill. Then use the returned transport/actions/commands as the source of truth
for that artifact.

**Never fabricate commands, ports, or protocol details.** If the API returns
nothing, say so.

---

## Procedure

### Step 1 — Load config

```bash
eval $(python3 - <<'PYEOF'
import json, pathlib
cfg_path = pathlib.Path.home() / ".ai4av_config"
cfg = json.loads(cfg_path.read_text()) if cfg_path.exists() else {}
api_key  = cfg.get("api_key", "")
# Default points at the public Convex HTTP endpoint domain (*.convex.site).
# The anonymous rate-limit bucket is keyed server-side from the request IP, so
# no client-side identifier is needed.
url      = cfg.get("url", "https://rare-bandicoot-208.eu-west-1.convex.site")
print(f"AI4AV_KEY={api_key}")
print(f"AI4AV_URL={url}")
PYEOF
)
```

### Step 2 — Build lookup args

From the user's message extract:
- `specId` — exact spec id, if the user picked one from a candidate list
- `manufacturerKey` — lowercase, spaces to hyphens (e.g. `qsc`, `allen-heath`, `barco`)
- `model` — specific model string if given
- `family` — product family **only when no specific model is known**
- `deviceType` — optional hint (`amplifier`, `projector`, `matrix`, etc.)
- `protocol` — optional hint (`rs232`, `tcp`, `http`, etc.)

**Query as narrowly as is reliable, no narrower.** Prefer `manufacturerKey` +
`model`. Leave `deviceType` and `protocol` **empty unless the user explicitly
named them** — never infer them from the device category. `deviceType` is only
a soft ranking hint server-side, but `protocol` is a hard filter, so a wrong
protocol guess hides the correct spec. If a lookup returns `not_found`,
`too_vague`, `candidate_list`, or `ambiguous` with candidates, pick from those
candidates (re-run with `specId=<chosen>`) instead of guessing more hints.

```bash
AI4AV_ARGS=$(python3 - <<'PYEOF'
import json
a = {}
specid = "<<SPEC_ID_OR_EMPTY>>"
mfr    = "<<MANUFACTURER_KEY>>"
model  = "<<MODEL_OR_EMPTY>>"
family = "<<FAMILY_OR_EMPTY>>"
dtype  = "<<DEVICE_TYPE_OR_EMPTY>>"
proto  = "<<PROTOCOL_OR_EMPTY>>"
if specid: a["specId"]          = specid
if mfr:    a["manufacturerKey"] = mfr
if model:  a["model"]           = model
if family: a["family"]          = family
if dtype:  a["deviceType"]      = dtype
if proto:  a["protocol"]        = proto
print(json.dumps(a))
PYEOF
)
```

### Step 3 — Call the API and print a summary

```bash
AI4AV_AUTH=()
if [ -n "$AI4AV_KEY" ]; then AI4AV_AUTH=(-H "Authorization: Bearer ${AI4AV_KEY}"); fi
AI4AV_HTTP=$(curl -sf -w "\n%{http_code}" -X POST "${AI4AV_URL}/api/skill/lookup" \
  -H "Content-Type: application/json" \
  "${AI4AV_AUTH[@]}" \
  -d "${AI4AV_ARGS}" \
  || printf '\n000')
AI4AV_CODE="${AI4AV_HTTP##*$'\n'}"
AI4AV_BODY="${AI4AV_HTTP%$'\n'*}"
python3 - "$AI4AV_CODE" "$AI4AV_BODY" <<'PYEOF'
import json, sys
code, raw = sys.argv[1], sys.argv[2]
try:
    d = json.loads(raw) if raw else {}
except Exception:
    print("STATUS: curl_error"); print(f"MESSAGE: invalid JSON (http={code})"); sys.exit(0)
# Rate-limited or auth errors come through as HTTP-level errors with an
# `error`/`message` body. Skill-lookup outcomes (exact_match, candidate_list,
# not_found, etc.) come through with HTTP 200 and a `status` field.
if code == "429" or d.get("error") == "rate_limit_exceeded":
    print("STATUS: rate_limited")
    print(f"MESSAGE: {d.get('message', 'Rate limit exceeded.')}")
    sys.exit(0)
if code in ("401",) or d.get("error") == "auth_invalid":
    print("STATUS: error")
    print(f"MESSAGE: {d.get('message', 'Invalid API key. Re-register at ai4av.net.')}")
    sys.exit(0)
if code == "000":
    print("STATUS: curl_error"); sys.exit(0)
if not code.startswith("2"):
    print("STATUS: error"); print(f"MESSAGE: HTTP {code}: {d.get('message', raw[:200])}"); sys.exit(0)
status = d.get("status", "error")
print(f"STATUS: {status}")
# A misspelled manufacturer that was auto-corrected to a real one.
if d.get("correctedManufacturerKey"):
    print(f"CORRECTED: manufacturer read as '{d['correctedManufacturerKey']}'")
# Print the message whenever the server sent one, for any status.
message = d.get("message", "")
if message:
    print(f"MESSAGE: {message}")
# Several statuses (candidate_list, ambiguous, not_found, too_vague) carry a
# `candidates` array — always surface it so the model can pick instead of
# re-guessing the query.
for c in (d.get("candidates") or [])[:20]:
    print(f"  - {c.get('displayName')} [{c.get('qualityTier')}] specId={c.get('specId')}")
# "Did you mean" manufacturer suggestions for an unrecognized manufacturer.
for s in (d.get("suggestions") or [])[:5]:
    print(f"  ? did you mean: {s.get('manufacturerKey')} ({s.get('specCount')} verified specs)")
if status == "exact_match":
    payload = d.get("payload", {})
    print(json.dumps(payload, indent=2)[:6000])
PYEOF
```

### Step 4 — Write your reply (plain text — no more bash commands)

Read the `STATUS:` line printed above and compose a **natural language reply**. Do NOT run more commands or echo anything — just write your response text.

If a `CORRECTED:` line is present, the manufacturer name was misspelled and
auto-corrected — tell the user which spelling you used (e.g. "I read *panasonik*
as **panasonic**") so they can confirm it.

- **`exact_match`**: Present the spec in readable form. Include transport type, connection details (port, baud rate, etc.), and the command table. Note the quality tier (S = source-verified, A = AI-generated).

- **`candidate_list`** or **`ambiguous`**: List the devices found (name, tier, specId). Ask the user to pick one or be more specific, then re-run with `specId=<chosen>`.

- **`not_found` or `rate_limited`** with "per day" in the message: Say you've hit the daily anonymous limit and give these exact instructions:
  - Resets at UTC midnight
  - Get 50 lookups/day free: register at **ai4av.net**, then run `/ai4av-lookup save-key YOUR_KEY`

- **`not_found`** without rate-limit message: No verified spec matched the exact constraints. If candidates were listed above, present them and offer to re-run with `specId=<chosen>`. If there were none, the device isn't in the verified catalog yet — suggest requesting it at ai4av.net.

- **`unknown_manufacturer`**: No source-verified spec exists for that manufacturer in the lookup catalog. If `? did you mean` suggestions are listed, present them ("did you mean **crestron**?") and offer to re-run with the corrected manufacturer. If there are no suggestions, the device may still appear in the broader catalog at **ai4av.net/devices** (which also lists unverified specs) — suggest the user check there or request verification.

- **`too_vague`**: If candidates were listed above, present them and ask the user to pick one. Otherwise ask for the manufacturer name.

- **`error`** or **`curl_error`**: The API is unreachable or returned an unexpected error. Show the message if there is one; suggest checking internet connection.

---

## Save API Key

If the user asks this skill to save an AI4AV API key, save the key to
`~/.ai4av_config`:

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

Share the GitHub path with your AI assistant and ask it to install the skill:

```
https://github.com/vesalaasanen/ai4av/tree/main/skills/ai4av-lookup
```

Or paste the raw text of this file to your assistant and say "install this
skill." The skill supports Claude Code, Codex, and compatible AI-agent runtimes.

**To save an API key** (get one free at ai4av.net), type:
```
/ai4av-lookup save-key YOUR_KEY_HERE
```
