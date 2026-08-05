---
spec_id: admin/domintell-dpbr04
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DPBR04 Control Spec"
manufacturer: Domintell
model_family: DPBR04
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DPBR04
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/DNET02/domintell_ligthprotocol-v5-20201027.pdf
retrieved_at: 2026-07-03T09:10:23.268Z
last_checked_at: 2026-07-21T21:56:52.305Z
generated_at: 2026-07-21T21:56:52.305Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the general LightProtocol interface guide, not a DPBR04 datasheet. Physical/electrical specs, RGB colour control commands, and exact LED behaviour are not detailed for this device."
  - "user-indicated transport \"RS-232C\" — source references legacy RS-232 gateways (DRS23201/DRS23202) but states this document covers WSS new-gen only and defers RS-232 to a separate PDF (DS_RS232_ETH_Interfaces). No serial configuration (baud/data bits/parity) is present in this source."
  - "legacy RS-232C transport exists on DRS23201/DRS23202 but is NOT documented"
  - "no settable continuous parameter documented for DPBR04 (LEDs are on/off/toggle only;"
  - "no DPBR04-specific safety/interlock content in source."
  - "firmware/DAP version compatibility not stated for DPBR04."
  - "RS-232C serial configuration (baud/data bits/parity/stop bits) not in this source."
  - "RGB colour command set for BR4 LEDs not documented here."
  - "exact APPINFO line format/fields for a BR4 entry not shown (only generic legacy examples)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:56:52.305Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 DPBR04+session actions matched verbatim source text with correct shapes; S scoped to DPBR04 command surface plus the session/gateway commands the spec explicitly enumerates. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Domintell DPBR04 Control Spec

## Summary
The Domintell DPBR04 is a "Glass rainbow 4 Push Button (RGB)" module on the Domintell2 bus: 4 push-button inputs and 4 RGB LED indicators. It is controlled via the Domintell LightProtocol through a gateway/Central-Unit module (DNET01, DNET02, DGQG02, DGQG04). This source documents the new-generation interface: a Secured WebSocket (wss) session on TCP port 17481 with salted-hash password authentication, over which legacy LightProtocol ASCII frames (module type `BR4`) are sent. DPBR04 is a legacy (non-NewGen) module, so it uses the legacy frame format.

<!-- UNRESOLVED: source is the general LightProtocol interface guide, not a DPBR04 datasheet. Physical/electrical specs, RGB colour control commands, and exact LED behaviour are not detailed for this device. -->
<!-- UNRESOLVED: user-indicated transport "RS-232C" — source references legacy RS-232 gateways (DRS23201/DRS23202) but states this document covers WSS new-gen only and defers RS-232 to a separate PDF (DS_RS232_ETH_Interfaces). No serial configuration (baud/data bits/parity) is present in this source. -->

## Transport
```yaml
# Source explicitly: "This document only covers Ethernet modules of new generation
# (DNET02, DGQG04, DGQG02, ...) using Secured Websockets instead of RS232 or UDP socket."
# WSS = WebSocket over TLS over TCP. Closest enum fit = tcp.
protocols:
  - tcp
addressing:
  port: 17481
  base_url: "wss://<ip>:17481"
  notes: "Secured WebSocket (wss). Up to 8 simultaneous connections on DNET01/02; up to 2 on DGQG02/04."
auth:
  type: salted_hash_password  # documented: REQUESTSALT + LOGINPSW SHA-512 challenge-response
# serial:  # UNRESOLVED: legacy RS-232C transport exists on DRS23201/DRS23202 but is NOT documented
#   in this source (deferred to DS_RS232_ETH_Interfaces_v1_27_08.pdf). baud_rate/data_bits/
#   parity/stop_bits not stated - do not assume.
```

## Traits
```yaml
# - queryable: %S status query documented; APPINFO/PING/GETLPVER/DISCOVER session queries documented (Tier 2 inference)
traits:
  - queryable
```

## Actions
```yaml
# Legacy LightProtocol frame (source 4.6.c):
#   ModType(3) + SerialNumber(6 hex) + '-' + OutputNumber(1-2 hex) + ActionParams(%...)
# DPBR04 I/O mapping (source 4.5, module type BR4):
#   buttons  1..4  -> command output number 1..4, action %Pn
#   LED ind. 1..4  -> command output number 1..4, actions toggle / %I / %O
# Role: push-sim and LED control require Administrator role (PROG M >= 43.7); Viewer is read-only.
# Variable parts: {serial} = 6-char hex module serial; {button}/{led} = 1..4; {type} = 1..4.

- id: simulate_push_button
  label: Simulate Push Button
  kind: action
  command: "BR4{serial}-{button}%P{type}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6 hexadecimal chars (e.g. 00004F)"
    - name: button
      type: integer
      description: "Button number 1..4"
    - name: type
      type: integer
      description: "1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push"

- id: toggle_led
  label: Toggle LED Indicator
  kind: action
  command: "BR4{serial}-{led}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6 hexadecimal chars"
    - name: led
      type: integer
      description: "LED indicator number 1..4"

- id: set_led_on
  label: Set LED Indicator On
  kind: action
  command: "BR4{serial}-{led}%I"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6 hexadecimal chars"
    - name: led
      type: integer
      description: "LED indicator number 1..4"

- id: set_led_off
  label: Set LED Indicator Off
  kind: action
  command: "BR4{serial}-{led}%O"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6 hexadecimal chars"
    - name: led
      type: integer
      description: "LED indicator number 1..4"

- id: status_query
  label: Status Query
  kind: query
  command: "BR4{serial}%S"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6 hexadecimal chars"
  notes: "%S asks module status; IO index must be omitted. Returns cached value from gateway RAM (NewGen masters); not a fresh bus poll. For NewGen masters (DGQG02/04/...) only available from O.S. 25.3.0 (DAP 40.1+) for legacy modules."

# --- LightProtocol session / gateway-level commands (source 4.1, 5.x) ---
# These establish/maintain the WSS session required before any BR4 command is
# accepted. All are documented in the source; min. role per 4.1 reserved-keywords tables.

- id: request_salt
  label: Request Salt
  kind: action
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: "Registered GoldenGate account username"
  notes: "Pre-auth. Reply: INFO:REQUESTSALT:USERNAME=<u>:NONCE=<nonce>:SALT=<salt>:INFO"

- id: login
  label: Login
  kind: action
  command: "LOGINPSW@{username}:{hashedpsw}"
  params:
    - name: username
      type: string
      description: "Registered GoldenGate account username"
    - name: hashedpsw
      type: string
      description: "SHA512( SHA512(password + salt) + nonce ) as lowercase hex string"
  notes: "hashedpsw = sha512( sha512(password + salt) + nonce ). First-gen firmware (welcome 'INFO:Waiting for LOGINPSW:INFO' with no NONCE): send bare 'LOGINPSW@:'. Success reply: INFO:Session opened:INFO"

- id: logout
  label: Logout
  kind: action
  command: "LOGOUT"
  params: []
  notes: "Close the session. Reply: INFO:Closing session:INFO"

- id: hello_keepalive
  label: Keepalive (HELLO)
  kind: action
  command: "HELLO"
  params: []
  notes: "Heartbeat; send approximately every 50s to keep session open. Reply: INFO:World:INFO"

- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={minutes}"
  params:
    - name: minutes
      type: integer
      description: "Timeout in minutes; 0 disables timeout (session then closes only on LOGOUT or connection loss)"
  notes: "TIMEOUT=0 reply: INFO:Timeout disabled. Socket will never be closed unless you send LOGOUT or the connection is lost !:INFO. TIMEOUT=<n> reply: INFO:Timeout set to <n>min:INFO"

- id: request_appinfo
  label: Request APPINFO
  kind: query
  command: "APPINFO"
  params: []
  notes: "Download full installation IO list (modules, inputs, outputs, groups, scenes, clocks, ...). Stream ends with 'END APPINFO'. Min. role: Viewer."

- id: ping_all_statuses
  label: Ping (Refresh All Statuses)
  kind: query
  command: "PING"
  params: []
  notes: "Reply: PONG followed by a dump of all IO statuses (no end-of-list marker). Use sparingly - generates bus traffic and returns cached RAM values on NewGen masters. Invoke only after (re)connect. Min. role: Viewer."

- id: get_lightprotocol_version
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []
  notes: "Available from PROG M 43.7. Reply: INFO:LPVER=<x.y.z>:INFO (e.g. INFO:LPVER=43.7.1:INFO). Requires an open session. Min. role: All."

- id: discover_gateway
  label: Discover Gateway
  kind: query
  command: "DISCOVER"
  params: []
  notes: "Available from PROG M 43.7. Reply: INFO:I AM A <model>-<ip>-<ip2>-17481-<serial>WSS:INFO. Min. role: All."

- id: voiceinfo_query
  label: VoiceInfo Query
  kind: query
  command: "VOICEINFO"
  params: []
  notes: "Reserved for voice-assistant server to request configuration. Only available on DNET02, from PROG M 40.0. Min. role: Viewer."
```

## Feedbacks
```yaml
# Status frame format (source 4.7.a): ModType(3) + Serial(6 hex) + [IO] + DataType(1) + Data(n*2 hex)
# DPBR04 status types: I = inputs (buttons, packed bitmap), O = outputs (LEDs, packed bitmap).
# LSB = button/LED 1. e.g. source sample "BR4    4FI02" => button 2 pressed on s/n 0x00004F.

- id: button_input_state
  type: packed_bitmap
  frame: "BR4{serial}I{hex}"
  description: "Push-button input bitmap; bit0=button1 ... bit3=button4"

- id: led_output_state
  type: packed_bitmap
  frame: "BR4{serial}O{hex}"
  description: "LED indicator output bitmap; bit0=LED1 ... bit3=LED4"

# --- Session / gateway-level query responses & signals (source 4.1, 4.2, 5.x) ---

- id: lightprotocol_version
  type: string
  frame: "INFO:LPVER={version}:INFO"
  description: "Reply to GETLPVER (e.g. INFO:LPVER=43.7.1:INFO)"

- id: gateway_discovery
  type: string
  frame: "INFO:I AM A {model}-{ip}-{ip2}-17481-{serial}WSS:INFO"
  description: "Reply to DISCOVER (since PROG M 43.7)"

- id: appinfo_stream
  type: text
  frame: "APPINFO (PROG M {version} ...) => {appname} :"
  description: "APPINFO response block; multiple lines follow, terminated by 'END APPINFO'"

- id: pong_status_dump
  type: text
  frame: "PONG"
  description: "Acknowledge to PING; immediately followed by a dump of all IO status frames (no end marker)"

- id: session_opened
  type: signal
  frame: "INFO:Session opened:INFO"
  description: "Successful login acknowledgement"

- id: session_timeout
  type: signal
  frame: "INFO:Session timeout:INFO"
  description: "Server closing session due to inactivity / no HELLO"

- id: session_closed_by_server
  type: signal
  frame: "INFO:Session closed by server:INFO"
  description: "Server-initiated close (e.g. a new DAP file was received)"

- id: invalid_credentials_error
  type: signal
  frame: "ERROR:Invalid credentials:ERROR"
  description: "Login rejected - bad username, password, or hashing"

- id: command_denied_error
  type: signal
  frame: "ERROR:Command denied. Read-only user:ERROR"
  description: "Read-only (Viewer) user attempted an action command (since PROG M 43.7)"

- id: user_database_empty_error
  type: signal
  frame: "ERROR:User database empty. Connect first with GoldenGate:ERROR"
  description: "No account created yet; GoldenGate configuration required first"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameter documented for DPBR04 (LEDs are on/off/toggle only;
# RGB colour values are not specified in this source).
```

## Events
```yaml
# Unsolicited status frames are pushed by the gateway when a button is pressed/released or an LED
# changes (same format as Feedbacks). System messages arrive inside INFO:...:INFO / ERROR:...:ERROR tags.
- id: status_update
  description: "Unsolicited BR4 status frame on state change (format as Feedbacks)"
- id: system_message
  description: "INFO:...:INFO or ERROR:...:ERROR tag from LightProtocol server (session/gateway level)"
```

## Macros
```yaml
# Documented multi-step WSS session login (source 5.5). Required before any BR4 command is accepted.
- id: wss_session_login
  steps:
    - "Open wss://<ip>:17481"
    - "Receive INFO:Waiting for LOGINPSW:NONCE=<nonce>:INFO"
    - "Send REQUESTSALT@<username>"
    - "Receive INFO:REQUESTSALT:USERNAME=<u>:NONCE=<nonce>:SALT=<salt>:INFO"
    - "Compute hashedpsw = SHA512( SHA512(password + salt) + nonce )  (hex strings)"
    - "Send LOGINPSW@<username>:<hashedpsw>"
    - "Receive INFO:Session opened:INFO"
  notes: "Older firmware uses first-gen login: send bare 'LOGINPSW@:' after INFO:Waiting for LOGINPSW:INFO."

- id: keepalive_and_teardown
  steps:
    - "Send HELLO every ~50s -> receive INFO:World:INFO  (or TIMEOUT=0 to disable)"
    - "Send APPINFO to download IO list; terminate on 'END APPINFO'"
    - "Send PING -> PONG + status dump (use sparingly)"
    - "Send LOGOUT on exit -> INFO:Closing session:INFO"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no DPBR04-specific safety/interlock content in source.
# General gateway warning in source: do NOT connect the Domintell bus to the RJ45 (Ethernet) connector
# of the gateway - fatal damage. (Applies to DNET/DGQG gateway, not the DPBR04 module itself.)
```

## Notes
- **Source scope mismatch:** the refined document is the Domintell *LightProtocol interface guide for new-generation Ethernet modules* (DNET01/02, DGQG02/04), not a DPBR04 product datasheet. The DPBR04 is one legacy bus module addressed within it. All electrical/physical specs, firmware ranges, and RGB colour semantics for the push-button are absent.
- **Transport discrepancy:** user/inputs indicated `RS-232C` and the file is named `..._serial`, but the source text explicitly states it covers Secured WebSocket (wss) new-gen interfaces and refers legacy RS-232 (DRS23201/DRS23202) to a separate PDF. Transport above reflects the source as-is; serial config is left UNRESOLVED rather than fabricated.
- **Authentication (source 5.3/5.5):** `hashedpsw = SHA512( SHA512(password + salt) + nonce )`. Accounts created via GoldenGate config software. Roles since PROG M 43.7: None / Viewer (read-only) / Administrator. LED control and push-button simulation require Administrator.
- **Button vs LED addressing:** both buttons and LEDs use command output numbers 1..4; disambiguated by the action suffix (`%P` = button, none/`%I`/`%O` = LED). APPINFO IO indices differ (buttons at 1..4, LEDs at 5..8) but command output numbers are per the source's I/O mapping table.
- **Case/encoding:** LightProtocol strings are case-insensitive (lowercased to upper). CR/LF supported at end of line; leading/trailing spaces trimmed. Recommend ASCII only.
- **Frame concatenation:** frames can no longer be joined with `&`.
- **RGB colour control:** the DPBR04 is described as RGB, but no colour/level command (e.g. `%X`/`%D`) is documented for module type `BR4` in this source — only on/off/toggle. Colour handling UNRESOLVED.
- **Session commands added in this revision:** GETLPVER, DISCOVER, REQUESTSALT, LOGINPSW, LOGOUT, HELLO, TIMEOUT, APPINFO, PING, VOICEINFO are gateway/session-level LightProtocol commands documented in source 4.1 + chapter 5; they are prerequisites to driving any BR4 frame over the WSS interface and are enumerated as Actions for implementability. Their verbatim payloads, min. roles and version gates are taken directly from the source.

<!-- UNRESOLVED: firmware/DAP version compatibility not stated for DPBR04. -->
<!-- UNRESOLVED: RS-232C serial configuration (baud/data bits/parity/stop bits) not in this source. -->
<!-- UNRESOLVED: RGB colour command set for BR4 LEDs not documented here. -->
<!-- UNRESOLVED: exact APPINFO line format/fields for a BR4 entry not shown (only generic legacy examples). -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/DNET02/domintell_ligthprotocol-v5-20201027.pdf
retrieved_at: 2026-07-03T09:10:23.268Z
last_checked_at: 2026-07-21T21:56:52.305Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:56:52.305Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 DPBR04+session actions matched verbatim source text with correct shapes; S scoped to DPBR04 command surface plus the session/gateway commands the spec explicitly enumerates. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the general LightProtocol interface guide, not a DPBR04 datasheet. Physical/electrical specs, RGB colour control commands, and exact LED behaviour are not detailed for this device."
- "user-indicated transport \"RS-232C\" — source references legacy RS-232 gateways (DRS23201/DRS23202) but states this document covers WSS new-gen only and defers RS-232 to a separate PDF (DS_RS232_ETH_Interfaces). No serial configuration (baud/data bits/parity) is present in this source."
- "legacy RS-232C transport exists on DRS23201/DRS23202 but is NOT documented"
- "no settable continuous parameter documented for DPBR04 (LEDs are on/off/toggle only;"
- "no DPBR04-specific safety/interlock content in source."
- "firmware/DAP version compatibility not stated for DPBR04."
- "RS-232C serial configuration (baud/data bits/parity/stop bits) not in this source."
- "RGB colour command set for BR4 LEDs not documented here."
- "exact APPINFO line format/fields for a BR4 entry not shown (only generic legacy examples)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
