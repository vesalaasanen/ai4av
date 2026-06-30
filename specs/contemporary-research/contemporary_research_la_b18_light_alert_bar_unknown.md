---
spec_id: admin/contemporary-research-la-b18-light-alert-bar
schema_version: ai4av-public-spec-v1
revision: 1
title: "Contemporary Research La B18 Light Alert Bar Control Spec"
manufacturer: "Contemporary Research"
model_family: "La B18"
aliases: []
compatible_with:
  manufacturers:
    - "Contemporary Research"
  models:
    - "La B18"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/LA-B18_Product_Manual_122025.pdf
retrieved_at: 2026-06-30T00:30:14.555Z
last_checked_at: 2026-06-30T06:58:28.820Z
generated_at: 2026-06-30T06:58:28.820Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; flow_control not stated; web page HTTP command API not documented (only serial/UDP ASCII strings)."
  - "not stated in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated."
  - "serial flow_control not stated."
  - "HTTP/web REST API command set not documented — only ASCII serial/UDP strings."
  - "response time guarantees beyond ~125ms delay note."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:58:28.820Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched exactly to wire-level command tokens in the source; transport parameters fully verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Contemporary Research La B18 Light Alert Bar Control Spec

## Summary
RGB LED light alert bar with full-duplex ASCII serial control over RS-232 (3.5mm TRS), USB virtual com port, Telnet/TCP (port 23), and UDP (port 31936). Supports up to 9 user color presets (R/G/B levels 0–100) with looping via Time On / Next Preset parameters, P1 logic input contact-closure recall, and a password-protected web configuration page.

<!-- UNRESOLVED: firmware version compatibility not stated; flow_control not stated; web page HTTP command API not documented (only serial/UDP ASCII strings). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 9600  # factory default; configurable 1200-230.4K via R5= command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in source
  # Note: USB virtual com port fixed at 115.2K baud, 8N1 (same protocol, separate transport).
addressing:
  port: 23  # Telnet/TCP default
udp:
  receive_port: 31936
  feedback_port: 31935
  # UDP command format prefixes device number: "{device}>cmd". Status responses sent
  # to directed broadcast IP at port 31935.
auth:
  type: none  # inferred: no login procedure for ASCII serial/TCP/UDP control path
  # Note: web page (Settings) is password protected; password derived from last 3
  # bytes of MAC (e.g. MAC 00-14-C8-20-01-BA -> "2001BA"). Separate from control protocol auth.
```

## Traits
```yaml
- levelable   # R/G/B output levels 0-100
- queryable   # numerous query commands return state (IY, NP=, MC, MN, HR, ID, IB)
```

## Actions
```yaml
# Command framing: ASCII ">" prefix + 2-char command + optional params + CR ($0D).
# UDP framing: "{device}>cmd" + CR. Responses: "<cmd ..." + CR/LF.
# Parameterized actions shown with variable part in braces.

# --- Output level control ---
- id: set_red_level
  label: Set Red Level
  kind: action
  command: "SR={level}"
  params:
    - name: level
      type: integer
      description: Red level 0-100
- id: set_green_level
  label: Set Green Level
  kind: action
  command: "SG={level}"
  params:
    - name: level
      type: integer
      description: Green level 0-100
- id: set_blue_level
  label: Set Blue Level
  kind: action
  command: "SB={level}"
  params:
    - name: level
      type: integer
      description: Blue level 0-100

# --- Presets ---
- id: save_preset
  label: Save Preset
  kind: action
  command: "S{n}"
  params:
    - name: n
      type: integer
      description: Preset number 1-9
- id: recall_preset
  label: Recall Preset
  kind: action
  command: "P{n}"
  params:
    - name: n
      type: integer
      description: Preset number 0-9; 0 sets output off
- id: set_preset_on_time
  label: Set Preset On Time
  kind: action
  command: "I{n}={x}"
  params:
    - name: n
      type: integer
      description: Preset number 0-9
    - name: x
      type: integer
      description: "0 = static; 1-240 = on time in 1/10s increments"
- id: clear_all_on_times
  label: Clear All On Times
  kind: action
  command: "I0"
  params: []
- id: set_next_preset
  label: Set Next Preset
  kind: action
  command: "N{n}"
  params:
    - name: n
      type: integer
      description: Preset number to transition to after current preset's Time On
- id: set_preset_name
  label: Set Preset Name
  kind: action
  command: "NP={n},{x}"
  params:
    - name: n
      type: integer
      description: Preset number 0-9
    - name: x
      type: string
      description: Preset name, up to 10 alphanumeric characters

# --- Network setup ---
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "IP={addr}"
  params:
    - name: addr
      type: string
      description: IP address xxx.xxx.xxx.xxx
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "IM={mask}"
  params:
    - name: mask
      type: string
      description: Subnet mask xxx.xxx.xxx.xxx
- id: set_default_gateway
  label: Set Default Gateway
  kind: action
  command: "IG={gw}"
  params:
    - name: gw
      type: string
      description: Gateway address xxx.xxx.xxx.xxx
- id: set_ip_mode
  label: Set IP Mode
  kind: action
  command: "IY={mode}"
  params:
    - name: mode
      type: integer
      description: "1 = Static, 2 = DHCP (default)"
- id: set_tcp_port
  label: Set TCP Port
  kind: action
  command: "IX={port}"
  params:
    - name: port
      type: integer
      description: Receive port for Telnet/TCP; default 23

# --- Serial communication config ---
- id: enable_echo
  label: Enable Echo
  kind: action
  command: "EE={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Disable, 1=RS-232, 2=TCP, 3=RS-232+TCP (default), 4=USB, 5=RS-232+USB, 6=TCP+USB, 7=RS-232+USB+TCP"
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "R5={rate}"
  params:
    - name: rate
      type: integer
      description: "0=1200, 1=2400, 2=4800, 3=9600 (default), 4=19.2K, 5=38.4K, 6=115.2K, 7=230.4K"

# --- Unit ---
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "NM={name}"
  params:
    - name: name
      type: string
      description: LA-B18 name, up to 20 characters

# --- Queries (kind: query) ---
- id: query_ip_mode
  label: Query IP Mode
  kind: query
  command: "IY"
  params: []
- id: query_all_preset_names
  label: Query All Preset Names
  kind: query
  command: "NP"
  params: []
- id: query_preset_name
  label: Query Preset Name
  kind: query
  command: "NP={n}"
  params:
    - name: n
      type: integer
      description: Preset number 0-9
- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "MC"
  params: []
- id: query_model_name
  label: Query Model Name
  kind: query
  command: "MN"
  params: []
- id: query_hardware_version
  label: Query Hardware Version
  kind: query
  command: "HR"
  params: []
- id: query_id
  label: Query ID (Model + Firmware)
  kind: query
  command: "ID"
  params: []
- id: query_bootloader
  label: Query Bootloader Version
  kind: query
  command: "IB"
  params: []
- id: help
  label: Help
  kind: query
  command: "HE"
  params: []

# --- System / maintenance ---
- id: reload_factory_defaults
  label: Reload Factory Defaults
  kind: action
  command: "Z!"
  params: []
  # Reconfigures unit to factory defaults. IP will not revert to default until Z] or power cycle.
- id: reload_factory_defaults_retain_web_password
  label: Reload Factory Defaults (Retain Web Password)
  kind: action
  command: "Z!2"
  params: []
- id: reboot
  label: Reboot
  kind: action
  command: "Z]"
  params: []
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: "Device echoes received command, e.g. command '>P6' → response '<P6'"
- id: ip_mode_state
  type: enum
  values: [Static, DHCP]
  description: "Response to IY query, e.g. '<IY DHCP'"
- id: preset_name_response
  type: string
  description: "Response to NP= set/query, e.g. '<NP 2 Mauve'"
- id: preset_names_all
  type: string
  description: "Response to NP query - all preset names as comma-separated sequence"
- id: mac_address
  type: string
  description: "Response to MC query"
- id: model_name
  type: string
  description: "Response to MN query"
- id: hardware_version
  type: string
  description: "Response to HR query"
- id: id_string
  type: string
  description: "Response to ID query (product model + application firmware version)"
- id: bootloader_version
  type: string
  description: "Response to IB query"
- id: help_text
  type: string
  description: "Response to HE query - list of serial commands"
```

## Variables
```yaml
# Preset structure: each preset n (0-9) holds red/green/blue levels (0-100),
# Time On (0 or 1-240 in 1/10s), Next Preset (preset number), and Name (≤10 chars).
# Set/queried via the Save/Recall/Set commands above rather than a single variable slot.
```

## Events
```yaml
# Status responses are unsolicited after control commands or user actions, delayed ~125ms,
# sending most recent status. May be enabled/disabled per connection type (EE= command).
```

## Macros
```yaml
# Looped presets: chain of ≥2 presets defined via Set Preset On Time + Set Next Preset.
# Recalling any preset in the loop initiates it; selecting Preset 0 or a non-loop preset stops it.
# Example red/blue flash loop documented in source (Preset 1: R50/G0/B0/T5/Next=2;
# Preset 2: R0/G0/B50/T5/Next=1).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Contact-closure P1 logic input and DIP-switch
# programming sequences described but not marked as safety interlocks.
```

## Notes
- RS-232 3.5mm TRS pinout: Tip=TX, Ring=RX, Sleeve=Common. Accepts 0–5 VDC non-standard swing (IR port compatibility).
- Status responses intentionally delayed ~125ms after control commands; can be enabled/disabled per connection type.
- Web page password: default derived from last 3 bytes of MAC, entered uppercase without punctuation (e.g. MAC `00-14-C8-20-01-BA` → `2001BA`). Up to 20 chars after change. "Preset Ctl while logged out" option allows password-free preset recall while protecting settings.
- UDP device addressing: command prefix `{device}>cmd`. Reserved device numbers (multiples of 256) broadcast to the next 255 units; device 4095 = all units. Device 0 = demo mode (steps presets 1–7, 3s dwell). Set via SW1 (bits 1–8) + SW2 (bits 1–4).
- P1 Logic Input: 3 contact inputs + 12 VDC; modes 0 (unused), 1 (Trigger, presets 1–9 momentary/latching), 2 (Static, presets 0–7 latching), 3 (Static+1, presets 1–8 latching). Shorting pin to ground = logic high.
- USB virtual com port fixed at 115.2K baud, 8N1 (separate from configurable RS-232 port).
- Help command `HE` returns full command list from device.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: HTTP/web REST API command set not documented — only ASCII serial/UDP strings. -->
<!-- UNRESOLVED: response time guarantees beyond ~125ms delay note. -->

## Provenance

```yaml
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/LA-B18_Product_Manual_122025.pdf
retrieved_at: 2026-06-30T00:30:14.555Z
last_checked_at: 2026-06-30T06:58:28.820Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:58:28.820Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched exactly to wire-level command tokens in the source; transport parameters fully verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; flow_control not stated; web page HTTP command API not documented (only serial/UDP ASCII strings)."
- "not stated in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated."
- "serial flow_control not stated."
- "HTTP/web REST API command set not documented — only ASCII serial/UDP strings."
- "response time guarantees beyond ~125ms delay note."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
