---
spec_id: admin/sharp-electronics-xp-a824u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics XP-A824U-W Control Spec"
manufacturer: Sharp
model_family: XP-A824U-W
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - XP-A824U-W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/A104U-W_Installation_manual_EN.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/common_ascii_e_SH.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/authentication_flow_e_SH.pdf
  - https://sharp-displays.jp.sharp/dl/en/pj_manual/a104u.html
  - https://sharp-displays.jp.sharp/dl/en/index.html
retrieved_at: 2026-08-11T07:32:31.895Z
last_checked_at: 2026-08-19T09:44:40.371Z
generated_at: 2026-08-19T09:44:40.371Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete command list (source says \"Contact your local dealer for a full list of the PC Control Codes\"); lens/menu feedback responses; Art-Net default universe/subnet not stated"
  - "populate if source describes push/asynchronous state change messages."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "framing bytes for Command Format A (header/trailer/checksum) not documented in excerpt; default Art-Net universe/subnet not stated; full ASCII command list behind vendor URL; feedback responses beyond input + error tables not present in excerpt"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:44:40.371Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions (9 binary Format A + 9 ASCII Format B) appear verbatim in source tables; transport (TCP 7142, baud rates) verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp Electronics XP-A824U-W Control Spec

## Summary
Installation-class DLP projector supporting HDMI1, HDMI2 and HDBaseT inputs. This spec covers the RS-232 PC Control port (D-Sub 9P), LAN/HDBaseT TCP control (port 7142), HTTP server, PJLink, CRESTRON ROOMVIEW, AMX Device Discovery, Extron XTP, and Art-Net DMX-over-Ethernet lighting control. Both binary (Command Format A) and ASCII (Command Format B) PC control code tables are documented in the source.

<!-- UNRESOLVED: complete command list (source says "Contact your local dealer for a full list of the PC Control Codes"); lens/menu feedback responses; Art-Net default universe/subnet not stated -->

## Transport
```yaml
# Source documents RS-232 (PC CONTROL D-Sub 9P), LAN/HDBaseT TCP (port 7142),
# HTTP server, PJLink, CRESTRON ROOMVIEW, AMX Device Discovery, Extron XTP, Art-Net.
# Serial settings: 115200/38400/19200/9600/4800 bps, 8-N-1, no flow control, full duplex
# (selectable via SETUP -> CONTROL(1) -> COMMUNICATION SPEED).
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 is the menu default (SETUP -> CONTROL(1) -> COMMUNICATION SPEED default 38400 bps, max 115200 bps)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for command transmit/receive via LAN and via HDBaseT
  base_url: http://<projector-ip>/  # inferred: HTTP server mentioned for edge blending UI; base URL pattern not explicitly stated in source
auth:
  type: none  # inferred: no login/password procedure documented for PC Control port or TCP 7142; HTTP server has ON/OFF/AUTH. setting in NETWORK SERVICE menu
```

## Traits
```yaml
- powerable        # POWER ON/OFF commands present (binary + ASCII)
- routable         # INPUT SELECT HDMI1/HDMI2/HDBaseT commands present
- queryable        # Status/error commands present (see Feedbacks); command format includes responses
- levelable        # LIGHT ADJUST, LENS SHIFT, FOCUS, ZOOM, KEYSTONE present via Art-Net DMX
- mappable         # PIP/PICTURE BY PICTURE with SUB INPUT routing
```

## Actions
```yaml
# Command Format A (binary, RS-232 / TCP 7142). Each row copied verbatim from source table.
# Header / trailer framing bytes not documented in source - UNRESOLVED below.
- id: power_on_a
  label: Power On (Command Format A)
  kind: action
  command: "02 00 00 00 00 02"  # literal payload from source, verbatim
  params: []
- id: power_off_a
  label: Power Off (Command Format A)
  kind: action
  command: "02 01 00 00 00 03"  # literal payload from source, verbatim
  params: []
- id: input_select_hdmi1_a
  label: Input Select HDMI1 (Command Format A)
  kind: action
  command: "02 03 00 00 02 01 A1 A9"  # literal payload from source, verbatim
  params: []
- id: input_select_hdmi2_a
  label: Input Select HDMI2 (Command Format A)
  kind: action
  command: "02 03 00 00 02 01 A2 AA"  # literal payload from source, verbatim
  params: []
- id: input_select_hdbaset_a
  label: Input Select HDBaseT (Command Format A)
  kind: action
  command: "02 03 00 00 02 01 BF C7"  # literal payload from source, verbatim
  params: []
- id: blank_on_a
  label: Blank On (Command Format A)
  kind: action
  command: "02 10 00 00 00 12"
  params: []
- id: blank_off_a
  label: Blank Off (Command Format A)
  kind: action
  command: "02 11 00 00 00 13"
  params: []
- id: mute_on_a
  label: Mute On (Command Format A)
  kind: action
  command: "02 12 00 00 00 14"
  params: []
- id: mute_off_a
  label: Mute Off (Command Format A)
  kind: action
  command: "02 13 00 00 00 15"
  params: []

# Command Format B (ASCII, RS-232 / TCP 7142). SP=20H, CR=0DH per source notes.
- id: power_on_b
  label: Power On (Command Format B)
  kind: action
  command: "POWR(SP)(SP)(SP)1(CR)"  # SP=0x20, CR=0x0D per source
  params: []
- id: power_off_b
  label: Power Off (Command Format B)
  kind: action
  command: "POWR(SP)(SP)(SP)0(CR)"
  params: []
- id: input_select_hdmi1_b
  label: Input Select HDMI1 (Command Format B)
  kind: action
  command: "IRGB(SP)(SP)31(CR)"
  params: []
- id: input_select_hdmi2_b
  label: Input Select HDMI2 (Command Format B)
  kind: action
  command: "IRGB(SP)(SP)32(CR)"
  params: []
- id: input_select_hdbaset_b
  label: Input Select HDBaseT (Command Format B)
  kind: action
  command: "INET(SP)(SP)51(CR)"
  params: []
- id: av_mute_off_b
  label: AV Mute Off (Command Format B)
  kind: action
  command: "IMBK(SP)(SP)(SP)0(CR)"
  params: []
- id: av_mute_on_b
  label: AV Mute On (Command Format B)
  kind: action
  command: "IMBK(SP)(SP)(SP)1(CR)"
  params: []
- id: mute_off_b
  label: Mute Off (Command Format B)
  kind: action
  command: "MUTE(SP)(SP)(SP)0(CR)"
  params: []
- id: mute_on_b
  label: Mute On (Command Format B)
  kind: action
  command: "MUTE(SP)(SP)(SP)1(CR)"
  params: []
```

## Feedbacks
```yaml
# ASCII input command responses (source: "Parameters for this device" table).
- id: input_response
  type: enum
  values: [hdmi1, hdmi2, hdbaset]
# ASCII status / error responses (source: "Status command" table).
- id: error_status
  type: enum
  values:
    - error:temp
    - error:fan
    - error:light
    - error:lens
    - error:system
```

## Variables
```yaml
# Settable parameters documented via menu (mirrored as ASCII control where applicable).
# Source explicitly enumerates "Communication speed" 4800/9600/19200/38400/115200 bps
# on the PC CONTROL port.
- name: communication_speed
  type: enum
  values: [4800, 9600, 19200, 38400, 115200]
  description: RS-232 baud rate, selectable via SETUP -> CONTROL(1) -> COMMUNICATION SPEED (default 38400 bps per menu table).
```

## Events
```yaml
# Source documents status responses only (replies to query commands). No unsolicited
# notification scheme documented.
# UNRESOLVED: populate if source describes push/asynchronous state change messages.
```

## Macros
```yaml
# Synchronous Control (per source) coordinates power on/off, AV mute, shutter, signal mute,
# dynamic contrast and auto black shutter across 2-4 projectors on LAN. Multi-step sequence
# documented at SETUP -> CONTROL(2) -> SYNCHRONOUS CONTROL.
- id: synchronous_control_setup
  label: Synchronous Control setup (MAIN projector)
  steps:
    - SETUP -> CONTROL(2) -> SYNCHRONOUS CONTROL -> MODE = MAIN
    - SETUP -> CONTROL(2) -> SYNCHRONOUS CONTROL -> UNITS = 2|3|4
    - Set SUB1, SUB2, SUB3 IP addresses
    - Confirm with OK; sub-projectors receive MODE, MAIN IP, SIGNAL MUTE
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements related to the control interface. Mentions to
# "heat protection functions" and a "Thermometer symbol" exist in menu docs but are
# not protocol-level safety statements.
```

## Notes
- Two command formats selectable via SETUP → CONTROL(1) → COMMAND FORMAT (A or B). Source notes "(SP) = 20H ASCII, (CR) = 0DH ASCII" for Format B.
- Source directs operator to "https://www.sharp-nec-displays.com/dl/en/pj_manual/lineup.html" for the full ASCII command list — the provided excerpt is partial.
- TCP control available via LAN (auto 10/100 Mbps) and via HDBaseT (100 Mbps), both using TCP port 7142.
- HTTP server can be set to OFF / ON / AUTH. (menu SETUP → NETWORK → NETWORK SERVICE → HTTP SERVER).
- PJLink (CLASS1 / CLASS2), CRESTRON ROOMVIEW, CRESTRON CONTROL (ENABLE / CONTROLLER IP / IP ID), AMX Device Discovery, Extron XTP, Art-Net, and PC CONTROL (with AUTH.) are independently toggleable.
- Art-Net DMX channels documented in source table (POWER, INPUT, BLANK, SHUTTER, FREEZE, LIGHT ADJUST, LENS SHIFT H/V, FOCUS, ZOOM, KEYSTONE H/V, LOCK). Default universe / subnet not stated.
- PC CONTROL connector pinout: pin 2 RxD, pin 3 TxD, pin 5 GND, pin 7 RTS, pin 8 CTS; pins 1/4/6/9 unused.

<!-- UNRESOLVED: framing bytes for Command Format A (header/trailer/checksum) not documented in excerpt; default Art-Net universe/subnet not stated; full ASCII command list behind vendor URL; feedback responses beyond input + error tables not present in excerpt -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/A104U-W_Installation_manual_EN.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/common_ascii_e_SH.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/projector/manual/authentication_flow_e_SH.pdf
  - https://sharp-displays.jp.sharp/dl/en/pj_manual/a104u.html
  - https://sharp-displays.jp.sharp/dl/en/index.html
retrieved_at: 2026-08-11T07:32:31.895Z
last_checked_at: 2026-08-19T09:44:40.371Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:44:40.371Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions (9 binary Format A + 9 ASCII Format B) appear verbatim in source tables; transport (TCP 7142, baud rates) verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete command list (source says \"Contact your local dealer for a full list of the PC Control Codes\"); lens/menu feedback responses; Art-Net default universe/subnet not stated"
- "populate if source describes push/asynchronous state change messages."
- "source contains no explicit safety warnings, interlock procedures, or"
- "framing bytes for Command Format A (header/trailer/checksum) not documented in excerpt; default Art-Net universe/subnet not stated; full ASCII command list behind vendor URL; feedback responses beyond input + error tables not present in excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
