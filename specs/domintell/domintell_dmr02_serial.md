---
spec_id: admin/domintell-dmr02
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DMR02 Control Spec"
manufacturer: Domintell
model_family: DMR02
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DMR02
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - "https://pro.domintell.com/web/content/128477?unique=629bd9ea594552ec0083be340314f0fca903ca56&download=true"
retrieved_at: 2026-07-03T09:13:11.559Z
last_checked_at: 2026-07-07T11:35:04.397Z
generated_at: 2026-07-07T11:35:04.397Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Input context labelled the protocol \"RS-232C\", but this source document explicitly states it only covers Ethernet modules using Secured WebSockets (WSS), not RS-232 or UDP. RS-232 interfaces (DRS23201/DRS23202) are mentioned only as deprecated/legacy context and are out of scope. This spec therefore documents WSS control per the source."
  - "The source references section \"4.8.k IO type list, status and data format\" for the NewGen relay control/status payloads of DMR02 (MR2), but that section's content is not present in the refined source document. Relay-level set/reset/query command payloads and status frame format are therefore UNRESOLVED."
  - "Electrical/load ratings of the 8 relays (voltage, current) are not stated in this source."
  - "base_url scheme/host not stated generically; source examples show wss://<ip>:17481"
  - "The source's I/O mapping for DMR02 (MR2) states"
  - "DMR02 (MR2) per-relay status frame format - source references"
  - "no settable non-discrete parameter documented for DMR02 in this source."
  - "no multi-step sequence documented for DMR02 in this source."
  - "relay contact/load ratings (voltage, current) and any interlock /"
  - "relay-level NewGen command/status payloads for MR2 (section 4.8.k not in source)."
  - "relay electrical ratings."
  - "protocol version pinning beyond the >= PROG M 43.7 feature gates noted."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:35:04.397Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions (session open/auth, logout, hello, timeout, appinfo, ping, getlpver, discover) matched verbatim in the source; transport port 17481 and WSS scheme confirmed; source command catalogue matches spec scope exactly. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Domintell DMR02 Control Spec

## Summary
The DMR02 is a Domintell NewGen bus module providing 8 monopolar relay outputs (LightProtocol module ID `MR2`). It is not addressed directly; it is controlled through a Domintell master/gateway module (DGQG02/DGQG04/DNET01/DNET02) over a Secured WebSocket (WSS) connection using the Domintell LightProtocol on default TCP port 17481. This spec covers the LightProtocol session/control interface documented for NewGen Ethernet gateways.

<!-- UNRESOLVED: Input context labelled the protocol "RS-232C", but this source document explicitly states it only covers Ethernet modules using Secured WebSockets (WSS), not RS-232 or UDP. RS-232 interfaces (DRS23201/DRS23202) are mentioned only as deprecated/legacy context and are out of scope. This spec therefore documents WSS control per the source. -->
<!-- UNRESOLVED: The source references section "4.8.k IO type list, status and data format" for the NewGen relay control/status payloads of DMR02 (MR2), but that section's content is not present in the refined source document. Relay-level set/reset/query command payloads and status frame format are therefore UNRESOLVED. -->
<!-- UNRESOLVED: Electrical/load ratings of the 8 relays (voltage, current) are not stated in this source. -->

## Transport
```yaml
# Source explicitly covers Ethernet gateways (DNET01/DNET02/DGQG02/DGQG04)
# using Secured WebSockets. The DMR02 is a bus module reached via such a gateway.
protocols:
  - tcp  # inferred from IP/WSS control description; connection is WebSocket over TCP
addressing:
  # UNRESOLVED: base_url scheme/host not stated generically; source examples show wss://<ip>:17481
  base_url: "wss://<ip>:17481"
  port: 17481
auth:
  type: salted_hashed_password  # source documents REQUESTSALT + LOGINPSW SHA-512 salted/nonce-hashed credential scheme
  notes: >
    Accounts created in GoldenGate. Hash = sha512( sha512(password + salt) + nonce ).
    First-gen modules accept a bare "LOGINPSW@:" to open a session (no user/pw).
    Newer gateways send INFO:Waiting for LOGINPSW:NONCE=<n>:INFO and require
    REQUESTSALT@<username> then LOGINPSW@<username>:<hashedpsw>.
```

## Traits
```yaml
# - powerable  # inferred: 8 monopolar relay outputs (on/off) - DMR02 is a relay module
# - queryable  # inferred: status query (%S legacy / /103 NewGen) and PING refresh documented
```

## Actions
```yaml
# Session / connection-layer commands (documented verbatim in source §4.1, §5).
# These are gateway-level; relay-level MR2 control payloads are UNRESOLVED (see §4.8.k absent).

- id: open_session_no_auth
  label: Open Session (no credentials)
  kind: action
  command: "LOGINPSW@:"
  params: []
  notes: "For first-gen gateways whose welcome line is INFO:Waiting for LOGINPSW:INFO (no NONCE)."

- id: request_salt
  label: Request Salt
  kind: query
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: Account username created in GoldenGate
  notes: "Reply: INFO:REQUESTSALT:USERNAME=<u>:NONCE=<n>:SALT=<s>:INFO"

- id: open_session_hashed
  label: Open Session (hashed salted password)
  kind: action
  command: "LOGINPSW@{username}:{hashedpsw}"
  params:
    - name: username
      type: string
      description: Account username
    - name: hashedpsw
      type: string
      description: "sha512( sha512(password + salt) + nonce ) as lowercase hex"
  notes: "Success: INFO:Session opened:INFO. Failure: ERROR:Invalid credentials:ERROR"

- id: logout
  label: Close Session
  kind: action
  command: "LOGOUT"
  params: []

- id: hello
  label: Session Heartbeat
  kind: action
  command: "HELLO"
  params: []
  notes: "Keep session open; send roughly every 50s. Reply: INFO:World:INFO"

- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={minutes}"
  params:
    - name: minutes
      type: integer
      description: "Timeout in minutes; 0 disables (socket-only expiry)"
  notes: "TIMEOUT=0 reply: INFO:Timeout disabled...; else INFO:Timeout set to <n>min:INFO"

- id: appinfo
  label: Download Application/IO List
  kind: query
  command: "APPINFO"
  params: []
  notes: "Streams APPINFO lines, terminated by 'END APPINFO'."

- id: ping
  label: Refresh Statuses
  kind: query
  command: "PING"
  params: []
  notes: "Reply PONG then cached RAM statuses of all IO. Do not poll periodically."

- id: getlpver
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []
  notes: ">= PROG M 43.7. Reply: INFO:LPVER=<ver>:INFO"

- id: discover
  label: Discover Gateway
  kind: query
  command: "DISCOVER"
  params: []
  notes: ">= PROG M 43.7. Reply e.g. INFO:I AM A DGQG04-192.168.1.250-169.254.162.138-17481-54000001WSS:INFO"

# --- DMR02 (MR2) relay-level control ----------------------------------------
# UNRESOLVED: The source's I/O mapping for DMR02 (MR2) states
# "Please see 4.8.k IO type list, status and data format" for the NewGen
# command/status format, but section 4.8.k content is NOT present in this
# refined source. The documented legacy action parameters (%S, %I, %O, none)
# apply to legacy modules (e.g. DMR01 'DMR'); the source does NOT confirm they
# apply to NewGen MR2. Per-device relay set/reset/toggle/query payloads for
# MR2 outputs at IO index /1/1 ... /1/8 are therefore UNRESOLVED.
#
# Inferred (NOT verified) NewGen status line shape, from a DGQG02 example only:
#   MR2/{serial}/1/{ioindex}/{8 relay bits}   # DO NOT IMPLEMENT without 4.8.k
```

## Feedbacks
```yaml
# Session-level feedback frames documented verbatim in source §4.2.
- id: info_frame
  type: text
  values:
    - "INFO:Waiting for LOGINPSW:INFO"
    - "INFO:Waiting for LOGINPSW:NONCE=<n>:INFO"
    - "INFO:REQUESTSALT:USERNAME=<u>:NONCE=<n>:SALT=<s>:INFO"
    - "INFO:Session opened:INFO"
    - "INFO:World:INFO"
    - "INFO:Session closed by server:INFO"
    - "INFO:Session timeout:INFO"
    - "INFO:Timeout disabled. Socket will never be closed unless you send LOGOUT or the connecion is lost !:INFO"
    - "INFO:Timeout set to <n>min:INFO"
- id: error_frame
  type: text
  values:
    - "ERROR:Invalid LOGINPSW. Use REQUESTSALT@<username> and LOGINPSW@<username>:<hashedpsw>:ERROR"
    - "ERROR:Invalid credentials:ERROR"
    - "ERROR:Invalid command. Use REQUESTSALT@<username> and LOGINPSW@<username>:<hashedpsw>:ERROR"
    - "ERROR:Command denied. Read-only user:ERROR"
    - "ERROR:User database empty. Connect first with GoldenGate:ERROR"
    - "ERROR:Deprecated. Use REQUESTSALT@<username> and LOGINPSW@<username>:<hashedpsw>:ERROR"
- id: pong
  type: text
  values: ["PONG"]
- id: discover_reply
  type: text
  values: ["INFO:I AM A <model>-<ip>-<ip>-17481-<serial>WSS:INFO"]
- id: lpver_reply
  type: text
  values: ["INFO:LPVER=<version>:INFO"]
# UNRESOLVED: DMR02 (MR2) per-relay status frame format - source references
# 4.8.k (absent). Legacy packed 'Oxx' format documented only for DMR01 (DMR),
# not confirmed for NewGen MR2.
```

## Variables
```yaml
# UNRESOLVED: no settable non-discrete parameter documented for DMR02 in this source.
```

## Events
```yaml
# Unsolicited device push documented: master clock line sent each minute, and
# INFO:Session closed by server:INFO / INFO:Session timeout:INFO (server-initiated).
- id: master_clock
  type: text
  values: ["HH:MM DD/MM/YYYY"]  # NewGen masters use DD/MM/YYYY (4-digit year)
  notes: "Sent each minute by DGQG master. Not sent for DAP 31.0-41.6."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequence documented for DMR02 in this source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source warning (gateway wiring, not relay-load): "Do NOT connect Domintell bus
# on the RJ45 connector, this can cause fatal damages to the module."
# UNRESOLVED: relay contact/load ratings (voltage, current) and any interlock /
# power-on sequencing for the 8 monopolar relays are not stated in this source.
```

## Notes
- DMR02 is a Domintell **bus** module (module ID `MR2`, NewGen). It is reached via a master/gateway over WSS; it is not connected to directly. Addressing uses the module's 6-hex-digit bus serial number plus its NewGen IO index `/1/1` … `/1/8` (8 monopolar relays).
- DMR02 (MR2) minimum DAP version per source: `>= 42.5 and < 43.0` OR `>= 43.3`.
- Gateways enforce role-based permissions from `PROG M 43.7`: `None` / `Viewer` (read-only) / `Administrator`. Action commands require Admin; status/query commands require at least Viewer.
- Concurrency limits stated: DNET01/DNET02 max 8 simultaneous WSS connections (plus 1 legacy UDP); DGQG02/DGQG04 max 2 simultaneous WSS connections.
- LightProtocol strings are case-insensitive (auto-uppercased); leading/trailing spaces trimmed; `<CR>`/`<LF>`/`<TAB>` map to 0x0D/0x0A/0x09; frames may NOT be concatenated with `&` (NewGen).

<!-- UNRESOLVED: relay-level NewGen command/status payloads for MR2 (section 4.8.k not in source). -->
<!-- UNRESOLVED: relay electrical ratings. -->
<!-- UNRESOLVED: protocol version pinning beyond the >= PROG M 43.7 feature gates noted. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - "https://pro.domintell.com/web/content/128477?unique=629bd9ea594552ec0083be340314f0fca903ca56&download=true"
retrieved_at: 2026-07-03T09:13:11.559Z
last_checked_at: 2026-07-07T11:35:04.397Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:35:04.397Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions (session open/auth, logout, hello, timeout, appinfo, ping, getlpver, discover) matched verbatim in the source; transport port 17481 and WSS scheme confirmed; source command catalogue matches spec scope exactly. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Input context labelled the protocol \"RS-232C\", but this source document explicitly states it only covers Ethernet modules using Secured WebSockets (WSS), not RS-232 or UDP. RS-232 interfaces (DRS23201/DRS23202) are mentioned only as deprecated/legacy context and are out of scope. This spec therefore documents WSS control per the source."
- "The source references section \"4.8.k IO type list, status and data format\" for the NewGen relay control/status payloads of DMR02 (MR2), but that section's content is not present in the refined source document. Relay-level set/reset/query command payloads and status frame format are therefore UNRESOLVED."
- "Electrical/load ratings of the 8 relays (voltage, current) are not stated in this source."
- "base_url scheme/host not stated generically; source examples show wss://<ip>:17481"
- "The source's I/O mapping for DMR02 (MR2) states"
- "DMR02 (MR2) per-relay status frame format - source references"
- "no settable non-discrete parameter documented for DMR02 in this source."
- "no multi-step sequence documented for DMR02 in this source."
- "relay contact/load ratings (voltage, current) and any interlock /"
- "relay-level NewGen command/status payloads for MR2 (section 4.8.k not in source)."
- "relay electrical ratings."
- "protocol version pinning beyond the >= PROG M 43.7 feature gates noted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
