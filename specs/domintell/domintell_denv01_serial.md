---
spec_id: admin/domintell-denv01
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DENV01 Control Spec"
manufacturer: Domintell
model_family: DENV01
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DENV01
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
retrieved_at: 2026-07-02T03:19:30.372Z
last_checked_at: 2026-07-07T11:35:02.855Z
generated_at: 2026-07-07T11:35:02.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "user-supplied metadata stated \"Known protocol: RS-232C\", but the source document explicitly states it only covers Ethernet modules of new generation using Secure WebSockets. RS-232 interfaces (DRS23201/DRS23202) are referenced in §2.1 as deprecated/legacy with no command detail. Serial transport specifics are therefore UNRESOLVED."
  - "exact NewGen `/103` status-request frame syntax for EV1 IOs (§4.8.k) is referenced but not reproduced verbatim in the source excerpt; only the legacy `%S` mnemonic and PING broadcast sample are shown."
  - "physical sensor units, ranges, accuracy not stated in source."
  - "serial (RS-232C) transport - referenced as deprecated in §2.1, no config documented."
  - "exact /103 request frame syntax per §4.8.k not stated verbatim"
  - "unit (°C) and precision not stated verbatim in excerpt"
  - "unit (lux?) and precision not stated verbatim in excerpt"
  - "unit (%) and precision not stated verbatim in excerpt"
  - "unit (hPa?) and precision not stated verbatim in excerpt"
  - "none applicable."
  - "unsolicited status-push format for EV1 sensor changes not detailed in excerpt."
  - "no multi-step sequences described for DENV01 in source."
  - "no device-specific safety/interlock procedure stated for DENV01."
  - "exact `/103` NewGen request/reply frame layout for EV1 sensor IOs (§4.8.k) — referenced but not reproduced in source excerpt."
  - "sensor units, ranges, and encoding (temperature °C, lux, %RH, hPa) not stated verbatim."
  - "serial/RS-232C transport — user metadata named it, but source documents only WSS."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:35:02.855Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec action units matched source: 9 session-level LP commands found verbatim in reserved keywords table, and 4 EV1 IO query targets confirmed in IO mapping table for DENV01; transport port 17481 and WSS URL confirmed verbatim. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Domintell DENV01 Control Spec

## Summary
The Domintell DENV01 (module type `EV1`) is a NewGen environment sensor module for the Domintell2 bus, exposing temperature, ambient luminosity, humidity, and atmospheric pressure inputs. It is controlled/read via the Domintell LightProtocol, spoken over a Secure WebSocket (WSS) to a Domintell communication interface (DNET01/DNET02/DGQG02/DGQG04/...). The module is read-only (sensor inputs); this spec covers LightProtocol session establishment and status querying of the four sensor IOs.

<!-- UNRESOLVED: user-supplied metadata stated "Known protocol: RS-232C", but the source document explicitly states it only covers Ethernet modules of new generation using Secure WebSockets. RS-232 interfaces (DRS23201/DRS23202) are referenced in §2.1 as deprecated/legacy with no command detail. Serial transport specifics are therefore UNRESOLVED. -->
<!-- UNRESOLVED: exact NewGen `/103` status-request frame syntax for EV1 IOs (§4.8.k) is referenced but not reproduced verbatim in the source excerpt; only the legacy `%S` mnemonic and PING broadcast sample are shown. -->
<!-- UNRESOLVED: physical sensor units, ranges, accuracy not stated in source. -->

## Transport
```yaml
# Source states DNET01/DNET02 default port 17481 over Secure WebSocket (wss).
# DGQG02/DGQG04 use the same WSS interface (max 2 connections); DNET0x max 8.
# Per §2.2: "Possibility to set a password" - auth IS required (REQUESTSALT/LOGINPSW).
protocols:
  - http  # Secure WebSocket (wss) = HTTP-upgrade; see addressing.base_url. Inferred mapping wss->http.
addressing:
  base_url: "wss://{ip}:17481"  # verbatim tool example: "wscat -n -c wss://<ip>:17481" (§5.x)
  port: 17481  # stated default for DNET01/DNET02
auth:
  type: hash  # documented: salted-password + nonce, double SHA512 (see §5.5)
  # Flow: REQUESTSALT@<user> -> INFO:REQUESTSALT:...:SALT=<salt>:NONCE=<nonce>:INFO
  #   token = SHA512( nonce + SHA512( password + salt ) )
  #   then LOGINPSW@<user>:<token>
# UNRESOLVED: serial (RS-232C) transport - referenced as deprecated in §2.1, no config documented.
```

## Traits
```yaml
# DENV01 is a read-only sensor module; no settable outputs documented.
- queryable  # inferred: status-query commands (PING, /103, %S) return sensor values
```

## Actions
```yaml
# LightProtocol session commands (apply to the communication interface hosting DENV01).
# DENV01-specific IO addressing uses NewGen frame: <ModType>/<serial>/<ioType>/<ioIndex>/<cmd>
# where ModType=EV1. Per-IO status request uses /103 (NewGen); legacy %S is not available
# for NewGen modules per source note in §4.6.d.

- id: get_lp_version
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []

- id: discover
  label: Discover Host Device
  kind: query
  command: "DISCOVER"
  params: []

- id: request_salt
  label: Request Salt and Nonce
  kind: query
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: Account username configured via GoldenGate.

- id: login
  label: Open Session (Login)
  kind: action
  command: "LOGINPSW@{username}:{hashed_token}"
  params:
    - name: username
      type: string
      description: Account username.
    - name: hashed_token
      type: string
      description: SHA512( nonce + SHA512( password + salt ) ) as hex string.

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

- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={minutes}"
  params:
    - name: minutes
      type: integer
      description: Timeout in minutes; 0 disables (socket-bound).

- id: appinfo
  label: Download Application (Module/IO List)
  kind: query
  command: "APPINFO"
  params: []

- id: ping
  label: Refresh All Statuses
  kind: query
  command: "PING"
  params: []

# DENV01 per-IO status queries (NewGen /103). Exact /103 payload verbatim not reproduced
# in source excerpt (§4.8.k referenced); template below follows the NewGen addressing
# pattern shown in the PING broadcast sample (EV1/<serial>/<ioType>/<ioIndex>).
- id: query_temperature
  label: Query Temperature (/8/1)
  kind: query
  command: "EV1/{serial}/8/1/103"  # UNRESOLVED: exact /103 request frame syntax per §4.8.k not stated verbatim
  params:
    - name: serial
      type: string
      description: Module serial number (decimal), from APPINFO.

- id: query_luminosity
  label: Query Ambient Luminosity (/36/1)
  kind: query
  command: "EV1/{serial}/36/1/103"  # UNRESOLVED: exact /103 request frame syntax per §4.8.k not stated verbatim
  params:
    - name: serial
      type: string
      description: Module serial number (decimal), from APPINFO.

- id: query_humidity
  label: Query Humidity (/37/1)
  kind: query
  command: "EV1/{serial}/37/1/103"  # UNRESOLVED: exact /103 request frame syntax per §4.8.k not stated verbatim
  params:
    - name: serial
      type: string
      description: Module serial number (decimal), from APPINFO.

- id: query_pressure
  label: Query Atmospheric Pressure (/38/1)
  kind: query
  command: "EV1/{serial}/38/1/103"  # UNRESOLVED: exact /103 request frame syntax per §4.8.k not stated verbatim
  params:
    - name: serial
      type: string
      description: Module serial number (decimal), from APPINFO.
```

## Feedbacks
```yaml
# DENV01 sensor inputs (NewGen status reported via PING broadcast or /103 reply).
# Exact value encoding per §4.8.k not reproduced in source excerpt.
- id: temperature
  type: number  # UNRESOLVED: unit (°C) and precision not stated verbatim in excerpt
  values: []
- id: ambient_luminosity
  type: number  # UNRESOLVED: unit (lux?) and precision not stated verbatim in excerpt
  values: []
- id: humidity
  type: number  # UNRESOLVED: unit (%) and precision not stated verbatim in excerpt
  values: []
- id: atmospheric_pressure
  type: number  # UNRESOLVED: unit (hPa?) and precision not stated verbatim in excerpt
  values: []

# Session-level messages (LP server -> client), verbatim from §4.2:
- id: info_message
  type: string
  values: []  # framed as INFO:<text>:INFO
- id: error_message
  type: string
  values: []  # framed as ERROR:<text>:ERROR
- id: discover_reply
  type: string
  values: []  # e.g. "INFO:I AM A DGQG04-192.168.1.250-169.254.162.138-17481-54000001WSS:INFO"
- id: session_state
  type: enum
  values: [waiting_login, opened, closed_by_server, timeout, closed]
```

## Variables
```yaml
# No settable parameters on DENV01 (read-only sensor module).
# UNRESOLVED: none applicable.
```

## Events
```yaml
# Unsolicited LP-server notifications (§4.2):
- id: welcome_waiting_login
  description: "INFO:Waiting for LOGINPSW:NONCE=<nonce>:INFO - sent on socket open."
- id: session_opened
  description: "INFO:Session opened:INFO - reply to successful LOGINPSW."
- id: session_closed_by_server
  description: "INFO:Session closed by server:INFO - server-initiated close (e.g. new DAP received)."
- id: session_timeout
  description: "INFO:Session timeout:INFO - no HELLO/action before timeout."
- id: end_appinfo
  description: "END APPINFO - marks end of APPINFO dump."
- id: pong
  description: "PONG - acknowledge to PING; status lines follow."
# UNRESOLVED: unsolicited status-push format for EV1 sensor changes not detailed in excerpt.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described for DENV01 in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains one general hardware warning (§2.3): do NOT connect the Domintell bus
# to the RJ45 connector - causes fatal damage. This applies to the communication interface,
# not the DENV01 sensor module directly. No DENV01-specific interlock or power-sequencing
# requirement is documented.
# UNRESOLVED: no device-specific safety/interlock procedure stated for DENV01.
```

## Notes
- DENV01 is module type `EV1` (NewGen, min DAP version 33). Its sibling DENV02 (`EV2`) adds a CO2/air-quality sensor (§4.3, §4.5).
- IO map (§4.5): `/8/1` temperature, `/36/1` ambient luminosity, `/37/1` humidity, `/38/1` atmospheric pressure.
- DENV01 uses the NewGen IO type list / status / data format (§4.8.k). Legacy `%S` status query is NOT available for NewGen modules — use `/103` (§4.6.d note, §5.9).
- On NewGen masters (DGQG02/04), `PING` returns cached RAM values; it does NOT poll the module. To get a fresh sensor reading, query the specific IO via `/103` (§5.9 note 2).
- Strings are case-insensitive and auto-uppercased; trailing CR/LF supported; leading/trailing spaces trimmed (§4.6.b).
- Auth requires a user account created via the GoldenGate configuration software; first connection with empty user DB yields `ERROR:User database empty...` (§5.5.a).
- Recommended heartbeat cadence: HELLO every ~50 s unless `TIMEOUT=0` is set (§5.8).
<!-- UNRESOLVED: exact `/103` NewGen request/reply frame layout for EV1 sensor IOs (§4.8.k) — referenced but not reproduced in source excerpt. -->
<!-- UNRESOLVED: sensor units, ranges, and encoding (temperature °C, lux, %RH, hPa) not stated verbatim. -->
<!-- UNRESOLVED: serial/RS-232C transport — user metadata named it, but source documents only WSS. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
retrieved_at: 2026-07-02T03:19:30.372Z
last_checked_at: 2026-07-07T11:35:02.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:35:02.855Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec action units matched source: 9 session-level LP commands found verbatim in reserved keywords table, and 4 EV1 IO query targets confirmed in IO mapping table for DENV01; transport port 17481 and WSS URL confirmed verbatim. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "user-supplied metadata stated \"Known protocol: RS-232C\", but the source document explicitly states it only covers Ethernet modules of new generation using Secure WebSockets. RS-232 interfaces (DRS23201/DRS23202) are referenced in §2.1 as deprecated/legacy with no command detail. Serial transport specifics are therefore UNRESOLVED."
- "exact NewGen `/103` status-request frame syntax for EV1 IOs (§4.8.k) is referenced but not reproduced verbatim in the source excerpt; only the legacy `%S` mnemonic and PING broadcast sample are shown."
- "physical sensor units, ranges, accuracy not stated in source."
- "serial (RS-232C) transport - referenced as deprecated in §2.1, no config documented."
- "exact /103 request frame syntax per §4.8.k not stated verbatim"
- "unit (°C) and precision not stated verbatim in excerpt"
- "unit (lux?) and precision not stated verbatim in excerpt"
- "unit (%) and precision not stated verbatim in excerpt"
- "unit (hPa?) and precision not stated verbatim in excerpt"
- "none applicable."
- "unsolicited status-push format for EV1 sensor changes not detailed in excerpt."
- "no multi-step sequences described for DENV01 in source."
- "no device-specific safety/interlock procedure stated for DENV01."
- "exact `/103` NewGen request/reply frame layout for EV1 sensor IOs (§4.8.k) — referenced but not reproduced in source excerpt."
- "sensor units, ranges, and encoding (temperature °C, lux, %RH, hPa) not stated verbatim."
- "serial/RS-232C transport — user metadata named it, but source documents only WSS."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
