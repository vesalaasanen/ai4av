---
spec_id: admin/domintell-dali04
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DALI04 Control Spec"
manufacturer: Domintell
model_family: DALI04
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DALI04
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://www.domintell.com/en/products/system/power-supply/dali04/
  - "https://pro2.mydomintell.com/share/manual/DALI04/Product%20Datasheet%20-%20DALI04%20-%20EN-NL-FR%20-%20V1.pdf"
retrieved_at: 2026-07-03T08:52:46.425Z
last_checked_at: 2026-07-07T11:32:17.194Z
generated_at: 2026-07-07T11:32:17.194Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - VOICEINFO
  - "DALI04 is a power supply with no specific command set in the source; only its IO mapping (/51/1, module type PS4) is documented. Power, voltage, and current specifications are not stated."
  - "no HTTP base URL - the WebSocket endpoint is wss://<ip>:17481"
  - "DALI04 is a bus power supply. No power-on/off, routing, query,"
  - "DALI04 (PS4) commands - none documented in source."
  - "DALI04-specific status payloads (PS4 IO data format) - source"
  - "DALI04 has no documented settable parameters in the source."
  - "DALI04-specific unsolicited events are not documented."
  - "no multi-step sequences specific to DALI04 documented."
  - "DALI04 is a bus power supply. Source does not document safety"
  - "DALI04 firmware compatibility, electrical specifications (voltage/current/power), fault behavior, and any DALI04-specific commands are not present in the source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:32:17.194Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 LightProtocol session commands matched verbatim in source; only VOICEINFO (voice-assistant-only) is unrepresented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Domintell DALI04 Control Spec

## Summary
The DALI04 is a Domintell bus power supply module used in the Domintell2 home automation system. It is controlled indirectly via the Domintell LightProtocol over a Secured WebSocket (wss) connection to a New Generation Ethernet master module (DNET01, DNET02, DGQG02, DGQG04, ...). This spec covers the LightProtocol transport and the DALI04-specific IO format (`PS4` module type, IO index `/51/1`); direct commands for the power supply are not documented — only its presence in the bus topology.

<!-- UNRESOLVED: DALI04 is a power supply with no specific command set in the source; only its IO mapping (/51/1, module type PS4) is documented. Power, voltage, and current specifications are not stated. -->

## Transport
```yaml
# LightProtocol rides on Secured WebSocket (wss) - the data are encrypted
# frames carried over HTTP. HTTPS/TLS is implicit in "wss".
# Default port is 17481 (stated). Authentication uses salted SHA-512 token.
protocols:
  - tcp
addressing:
  port: 17481
  base_url: ""  # UNRESOLVED: no HTTP base URL - the WebSocket endpoint is wss://<ip>:17481
auth:
  type: password
  # Login sequence: REQUESTSALT@<username> -> hash password+salt with SHA-512,
  # prepend nonce, SHA-512 again, send LOGINPSW@<user>:<hashedtoken>
```

## Traits
```yaml
# UNRESOLVED: DALI04 is a bus power supply. No power-on/off, routing, query,
# or level commands documented in source for this specific module.
# - powerable       (not stated for DALI04)
# - routable        (not stated for DALI04)
# - queryable       (not stated for DALI04)
# - levelable       (not stated for DALI04)
```

## Actions
```yaml
# DALI04-specific commands are not documented in the source.
# Below are the LightProtocol master-level commands required to reach and
# identify any module (including DALI04) on the bus.
# UNRESOLVED: DALI04 (PS4) commands - none documented in source.

- id: get_lightprotocol_version
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []

- id: discover
  label: Discover Device
  kind: query
  command: "DISCOVER"
  params: []

- id: request_salt
  label: Request Salt for User
  kind: query
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string

- id: login_password
  label: Open Session (Password)
  kind: action
  command: "LOGINPSW@{username}:{hashedtoken}"
  params:
    - name: username
      type: string
    - name: hashedtoken
      type: string
      description: sha512( sha512(password+salt) + nonce ) as hex

- id: login_password_legacy
  label: Open Session (Legacy, no password)
  kind: action
  command: "LOGINPSW@:"
  params: []

- id: logout
  label: Close Session
  kind: action
  command: "LOGOUT"
  params: []

- id: hello
  label: Keep Session Open
  kind: action
  command: "HELLO"
  params: []

- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={n}"
  params:
    - name: n
      type: integer
      description: Minutes (0 disables timeout)

- id: appinfo
  label: Download List of Modules (APPINFO)
  kind: query
  command: "APPINFO"
  params: []

- id: ping
  label: Refresh All Statuses
  kind: query
  command: "PING"
  params: []
```

## Feedbacks
```yaml
# LightProtocol server -> client system messages, framed as
# INFO:...:INFO or ERROR:...:ERROR

- id: info_waiting_for_login
  type: string
  description: "Server welcome message requesting LOGIN"
  example: "INFO:Waiting for LOGINPSW:INFO"

- id: info_requestsalt
  type: string
  description: "Reply to REQUESTSALT - supplies username, nonce, salt"
  example: "INFO:REQUESTSALT:USERNAME=toto:NONCE=9301906811536867321:SALT=1007182019:INFO"

- id: info_session_opened
  type: string
  example: "INFO:Session opened:INFO"

- id: info_session_closed_by_server
  type: string
  example: "INFO:Session closed by server:INFO"

- id: info_session_timeout
  type: string
  example: "INFO:Session timeout:INFO"

- id: info_world
  type: string
  description: "Reply to HELLO"
  example: "INFO:World:INFO"

- id: info_timeout_disabled
  type: string
  example: "INFO:Timeout disabled. Socket will never be closed unless you send LOGOUT or the connecion is lost !:INFO"

- id: info_timeout_set
  type: string
  description: "Confirms timeout value in minutes"
  example: "INFO:Timeout set to <n>min:INFO"

- id: info_discover_reply
  type: string
  description: "Reply to DISCOVER (since PROG M 43.7)"
  example: "INFO:I AM A DGQG04-192.168.1.250-169.254.162.138-17481-54000001WSS:INFO"

- id: error_invalid_loginpsw
  type: string
  example: "ERROR:Invalid LOGINPSW. Use REQUESTSALT@<username> and LOGINPSW@<username>:<hashedpsw>:ERROR"

- id: error_deprecated_login
  type: string
  example: "ERROR:Deprecated. Use REQUESTSALT@<username> and LOGINPSW@<username>:<hashedpsw>:ERROR"

- id: error_readonly_user
  type: string
  description: "Viewer attempting write command (PROG M 43.7+)"
  example: "ERROR:Command denied. Read-only user:ERROR"

- id: dali04_io_presence
  type: string
  description: "DALI04 appears in APPINFO with module type PS4 and IO index /51/1"
  example: "PS4/51/1Bus power supply"
# UNRESOLVED: DALI04-specific status payloads (PS4 IO data format) - source
# refers to section 4.8.k for full IO format which is not present in this excerpt.
```

## Variables
```yaml
# UNRESOLVED: DALI04 has no documented settable parameters in the source.
```

## Events
```yaml
# UNRESOLVED: DALI04-specific unsolicited events are not documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences specific to DALI04 documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: DALI04 is a bus power supply. Source does not document safety
# warnings, interlocks, or power-on sequencing for the DALI04 specifically.
# (General Ethernet wiring warning: "Do NOT connect Domintell bus on the RJ45
# connector, this can cause fatal damages to the module." - applies to all
# NewGen Ethernet masters, not DALI04.)
```

## Notes
- The DALI04 is a "Bus power supply" (PS4) module type, minimum DAP version 40.1. It exposes a single IO at APPINFO index `/51/1`. The source defers its full IO data format to section 4.8.k of the LightProtocol guide, which is not present in this excerpt.
- This spec therefore covers the LightProtocol master transport (wss://:17481, SHA-512 password hash login, INFO/ERROR system messages) required to reach the DALI04 on the bus, rather than DALI04-specific control commands.
- Default port is 17481 for both DNET01/DNET02 and DGQG02/DGQG04.
- DNET01/DNET02: max 8 simultaneous wss connections; DGQG02/DGQG04: max 2.
- IP addressing: DHCP or static (static recommended).
- Legacy UDP support is limited to 1 channel on DNET01/DNET02 (backward compat for DETH02).
- Available login generation depends on firmware: empty user DB / legacy `LOGINPSW@:` (no password) / salted-SHA-512 `LOGINPSW@<user>:<token>`.
- Authentication algorithm: `sha512( sha512(password + salt) + nonce )`, SHA-512 throughout, hex-encoded.
- From PROG M 43.7: role-based permissions (None / Viewer / Administrator).

<!-- UNRESOLVED: DALI04 firmware compatibility, electrical specifications (voltage/current/power), fault behavior, and any DALI04-specific commands are not present in the source. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://www.domintell.com/en/products/system/power-supply/dali04/
  - "https://pro2.mydomintell.com/share/manual/DALI04/Product%20Datasheet%20-%20DALI04%20-%20EN-NL-FR%20-%20V1.pdf"
retrieved_at: 2026-07-03T08:52:46.425Z
last_checked_at: 2026-07-07T11:32:17.194Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:32:17.194Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 LightProtocol session commands matched verbatim in source; only VOICEINFO (voice-assistant-only) is unrepresented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- VOICEINFO
- "DALI04 is a power supply with no specific command set in the source; only its IO mapping (/51/1, module type PS4) is documented. Power, voltage, and current specifications are not stated."
- "no HTTP base URL - the WebSocket endpoint is wss://<ip>:17481"
- "DALI04 is a bus power supply. No power-on/off, routing, query,"
- "DALI04 (PS4) commands - none documented in source."
- "DALI04-specific status payloads (PS4 IO data format) - source"
- "DALI04 has no documented settable parameters in the source."
- "DALI04-specific unsolicited events are not documented."
- "no multi-step sequences specific to DALI04 documented."
- "DALI04 is a bus power supply. Source does not document safety"
- "DALI04 firmware compatibility, electrical specifications (voltage/current/power), fault behavior, and any DALI04-specific commands are not present in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
