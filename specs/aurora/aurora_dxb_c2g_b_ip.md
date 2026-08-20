---
spec_id: admin/aurora-dxb-8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Multimedia DXB-8 Control Spec"
manufacturer: Aurora
model_family: DXB-8
aliases: []
compatible_with:
  manufacturers:
    - Aurora
    - "Aurora Multimedia"
  models:
    - DXB-8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - api.auroramultimedia.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/12272/aurora-multimedia-control-systems-dxb-8i-b-manual.pdf
  - https://api.auroramultimedia.com/assets/526d4fa2-902b-4151-a87f-405e7c9304e2
  - https://www.manualslib.com/manual/1817704/Aurora-Dxb-8i-Series.html
  - https://www.manualslib.com/manual/1636397/Aurora-Dxb-8.html
retrieved_at: 2026-08-07T23:07:06.170Z
last_checked_at: 2026-08-19T08:28:38.936Z
generated_at: 2026-08-19T08:28:38.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "known-protocol hint said TCP/IP, but refined source contains RS-232 commands only. Ethernet/IP API not in this source."
  - "exact model variant (DXB-8 vs DXB-8i-G2-B vs \"C2G B\") not disambiguated in source text."
  - "flow control not stated in source"
  - "full response grammar for toggle query (?xTG) and LED-all query not exemplified in source"
  - "no discrete variable registry in source beyond above commands"
  - "source documents no unsolicited notifications. All outputs are responses to commands or programmed button-triggered strings."
  - "no safety-relevant content in source."
  - "known-protocol hint TCP/IP not corroborated by this refined source — RS-232 only here. Prior discover note references DXB8i_Protocols_0_12.pdf \"Network Control API\" not yet obtained; that doc likely covers TCP/IP."
  - "exact model variant — input name \"Dxb C2g B\" vs source \"DXB-8\" vs prior-discover \"DXB-8i-G2-B\". Source text uses \"DXB-8\" throughout."
  - "power spec is 5v 300mA DC (stated) but no fault/current behavior documented."
  - "flow_control not stated; assumed none but unverified."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:28:38.936Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match source command table verbatim; transport baud/format/parity supported; no source commands omitted. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Aurora Multimedia DXB-8 Control Spec

## Summary
Aurora Multimedia DXB-8 is an 8-button wall control panel with two RS-232 serial ports. Panel programmable per-button push/release/hold/toggle strings, LED color states, volume presets, baud config. Units daisy-chain up to 8. This spec covers RS-232 command protocol documented in source.

<!-- UNRESOLVED: known-protocol hint said TCP/IP, but refined source contains RS-232 commands only. Ethernet/IP API not in this source. -->
<!-- UNRESOLVED: exact model variant (DXB-8 vs DXB-8i-G2-B vs "C2G B") not disambiguated in source text. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # factory default; source: "Factory default is 9600", max 115200
  data_bits: 8
  parity: none  # source: "8N1" factory default
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
# Note: two RS-232 ports (port 1 = 4-pin 3.81mm Euro, port 2 = 3-pin 3.81mm Euro).
# Commands target port 1 or 2 via y field. Unit address 1-8 (factory default 1).
```

## Traits
```yaml
# - queryable       (source has ? query commands: ?FM, ?PS, ?RS, ?HS, ?TG, ?BR, ?BL, ?BA)
# - levelable       (source has volume/cmd preset setup: !VB, !VS)
traits:
  - queryable
  - levelable
```

## Actions
```yaml
# Convention: x = unit address 0-8 (factory default 1); y = port 1 or 2; b = button 1-8.
# <cr> = 0x0D. "%" escapes non-printable ASCII hex (%% = literal %). "#" = delay delimiter (## = literal #).
# Each entry below = one distinct opcode row from source command table.

# --- Button string programming (set) ---
- id: set_button_push_string
  label: Button Push String
  kind: action
  command: "!xPSy,b,z<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8 (0 = broadcast, no response)" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }
    - { name: z, type: string, description: "ASCII string (99 bytes max); %xx = hex byte, %% = literal %, #n = delay n*100ms, ## = literal #" }

- id: set_button_release_string
  label: Button Release String
  kind: action
  command: "!xRSy,b,z<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }
    - { name: z, type: string, description: "ASCII string (99 bytes max); same escapes as push" }

- id: set_button_hold_string
  label: Button Hold String
  kind: action
  command: "!xHSy,b,tt,z<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }
    - { name: tt, type: string, description: "Repeat timing; first digit seconds, second digit tenths (e.g. 03 = 300ms)" }
    - { name: z, type: string, description: "ASCII string sent repeatedly every tt interval" }

- id: set_button_toggle_string
  label: Button Toggle String
  kind: action
  command: "!xTGy,b,i,l,z<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }
    - { name: i, type: integer, description: "Instance number 1 or 2" }
    - { name: l, type: string, description: "LED color R/G/B/N (Red/Green/Blue/None)" }
    - { name: z, type: string, description: "ASCII string" }

- id: set_button_command_string
  label: Button Command String
  kind: action
  command: "!xCSy,z<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Button number 1-8" }
    - { name: z, type: string, description: "Serial command to execute on press; unit address inside should be 0; starts with '!'. Used for interlock effects via !BA" }

- id: set_volume_preset_buttons
  label: Setup Volume / Cmd Preset Buttons
  kind: action
  command: "!xVBy,b,c,tt<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8 for volume up" }
    - { name: c, type: integer, description: "Button number 1-8 for volume down" }
    - { name: tt, type: string, description: "Repeat timing; first digit seconds, second digit tenths" }

- id: set_volume_preset_strings
  label: Setup Volume / Cmd Presets (12 strings)
  kind: action
  command: "!xVS,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: s1, type: string, description: "Level 1 string; %xx hex, %% literal %, %, literal comma; %00 = disable" }
    - { name: s2, type: string, description: "Level 2 string" }
    - { name: s3, type: string, description: "Level 3 string" }
    - { name: s4, type: string, description: "Level 4 string" }
    - { name: s5, type: string, description: "Level 5 string" }
    - { name: s6, type: string, description: "Level 6 string" }
    - { name: s7, type: string, description: "Level 7 string" }
    - { name: s8, type: string, description: "Level 8 string" }
    - { name: s9, type: string, description: "Level 9 string" }
    - { name: s10, type: string, description: "Level 10 string" }
    - { name: s11, type: string, description: "Level 11 string" }
    - { name: s12, type: string, description: "Level 12 string (%00 to disable unused)" }

- id: set_baud_rate
  label: Baud Rate Setup
  kind: action
  command: "!xBRy,a,b<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: a, type: integer, description: "Baud rate; enum 2400/4800/9600/19200/38400/57600/115200" }
    - { name: b, type: string, description: "Format; enum 8N1/8E1/8O1" }

- id: set_button_led_individual
  label: Button LED Setup (Individual)
  kind: action
  command: "!xBLy,z1,z2,t<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Button number 1-8" }
    - { name: z1, type: string, description: "Release LED state R/G/B/N" }
    - { name: z2, type: string, description: "Pushed LED state R/G/B/N" }
    - { name: t, type: integer, description: "Toggle mode 0 or 1 (off/on)" }

- id: set_button_led_all
  label: Button LED Setup (All 8 buttons)
  kind: action
  command: "!xBA,r1,p1,r2,p2,r3,p3,r4,p4,r5,p5,r6,p6,r7,p7,r8,p8<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: r1, type: string, description: "Button 1 release state R/G/B/N/X (X=ignore)" }
    - { name: p1, type: string, description: "Button 1 pushed state R/G/B/N/X" }
    - { name: r2, type: string, description: "Button 2 release state" }
    - { name: p2, type: string, description: "Button 2 pushed state" }
    - { name: r3, type: string, description: "Button 3 release state" }
    - { name: p3, type: string, description: "Button 3 pushed state" }
    - { name: r4, type: string, description: "Button 4 release state" }
    - { name: p4, type: string, description: "Button 4 pushed state" }
    - { name: r5, type: string, description: "Button 5 release state" }
    - { name: p5, type: string, description: "Button 5 pushed state" }
    - { name: r6, type: string, description: "Button 6 release state" }
    - { name: p6, type: string, description: "Button 6 pushed state" }
    - { name: r7, type: string, description: "Button 7 release state" }
    - { name: p7, type: string, description: "Button 7 pushed state" }
    - { name: r8, type: string, description: "Button 8 release state" }
    - { name: p8, type: string, description: "Button 8 pushed state" }

- id: send_daisy_chain_address8
  label: Send String to Address 8 Port (Daisy Chain Mode)
  kind: action
  command: "!8PD,z<cr>"
  params:
    - { name: z, type: string, description: "ASCII string to send out last unit's port 2 in daisy chain" }

- id: set_unit_address
  label: Set Address
  kind: action
  command: "!xADDRy<cr>"
  params:
    - { name: x, type: integer, description: "0-8; 0 forces reassign to new address; known address to reassign" }
    - { name: y, type: integer, description: "New address 1-8" }

# --- Factory test loop (documented in source factory-test section, not command table) ---
- id: factory_test_loop
  label: Factory Test Loop String
  kind: action
  command: "!test<cr>"
  params: []
  description: "RS-232 loop test string used during factory test mode (port 1 <-> port 2). Source: 'Send string !test<cr> to be responded with ~test<cr>.'"

# --- Query commands (? = query, ~ = response) ---
- id: query_firmware_revision
  label: Query Firmware Revision
  kind: query
  command: "?xFM<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8; 0 forces response regardless of unit address" }

- id: query_button_push_string
  label: Query Button Push String
  kind: query
  command: "?xPSy,b<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }

- id: query_button_release_string
  label: Query Button Release String
  kind: query
  command: "?xRSy,b<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }

- id: query_hold_string
  label: Query Hold String
  kind: query
  command: "?xHSy,b<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }

- id: query_toggle_string
  label: Query Toggle String
  kind: query
  command: "?xTGy,b,i<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }
    - { name: b, type: integer, description: "Button number 1-8" }
    - { name: i, type: integer, description: "Instance number 1 or 2" }

- id: query_baud_rate_setup
  label: Query Baud Rate Setup
  kind: query
  command: "?xBRy<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Port number 1 or 2" }

- id: query_button_led_individual
  label: Query Button LED Setup (Individual)
  kind: query
  command: "?xBLy<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
    - { name: y, type: integer, description: "Button number 1-8" }

- id: query_button_led_all
  label: Query Button LED Setup (All)
  kind: query
  command: "?xBA<cr>"
  params:
    - { name: x, type: integer, description: "Unit address 0-8" }
```

## Feedbacks
```yaml
# Source: response prefix is ~ (echo of command). Examples verbatim from source:
- id: firmware_revision_response
  type: string
  description: "Response to ?xFM. Example verbatim: ~1FM-2.0<cr>"

- id: push_string_response
  type: string
  description: "Response to !xPS or ?xPS. Example verbatim: ~4PS2,1,Hello_World<cr>"

- id: release_string_response
  type: string
  description: "Response to !xRS or ?xRS. Example verbatim: ~3RS1,1,Hello_There<cr>"

- id: hold_string_response
  type: string
  description: "Response to ?xHS. Example verbatim: ~1HS1,1,Hello_World<cr>"

- id: baud_rate_response
  type: string
  description: "Response to !xBR or ?xBR. Example verbatim: ~1BR1,38400,8N1<cr>"

- id: button_led_individual_response
  type: string
  description: "Response to !xBL or ?xBL. Example verbatim: ~2BL3,B,R,1<cr> (release Blue, push Red, toggle on)"

- id: factory_test_loop_response
  type: string
  description: "RS-232 loop test response during factory test mode. Verbatim: ~test<cr> (reply to !test<cr>)"
# UNRESOLVED: full response grammar for toggle query (?xTG) and LED-all query not exemplified in source
```

## Variables
```yaml
# Settable persistent config exposed via dedicated commands (already listed in Actions):
# - unit_address (1-8)        via !xADDRy
# - baud_rate per port        via !xBRy,a,b   (2400-115200; 8N1/8E1/8O1)
# - button LED states         via !xBLy / !xBA
# - per-button strings        via !xPS / !xRS / !xHS / !xTG / !xCS
# - volume presets            via !xVB / !xVS
# UNRESOLVED: no discrete variable registry in source beyond above commands
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All outputs are responses to commands or programmed button-triggered strings.
```

## Macros
```yaml
# Source documents inline macro capability via "#" delay delimiter inside button strings:
# "#n" = n*100ms delay between commands (n=0-9). "##" = literal #.
# Example verbatim: !1PS1,1,Hello string 1%0D#5Hello string 2%0D<cr>
#   -> sends "Hello string 1<cr>", waits 500ms, sends "Hello string 2<cr>"
# No separate named-macro opcode in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source has no explicit safety warnings, interlock procedures, or power-on sequencing.
# Factory reset (!ADDR/hold buttons 3&4 10s) reverts config non-destructively.
# UNRESOLVED: no safety-relevant content in source.
```

## Notes
- Buttons 1-4 = left column top-to-bottom; 5-8 = right column top-to-bottom.
- Unit address factory default 1. Address 0 = broadcast (received by all, no response).
- Daisy chain: up to 8 units linked port2->port1. All commands pass through to com1 of unit 1. Last unit must be address 8 to use its port 2; use `!8PD,z<cr>` to target that port.
- Factory reset (hold buttons 3 & 4, 10s): sets both RS-232 ports to 9600 8N1, address to 1, button 1 push=!1B1<cr>, release=!1R1<cr>, incrementing for all 8 buttons. LEDs default blue.
- Escape rules in strings: `%xx` = hex byte, `%%` = literal %, `%,` = literal comma, `#n` = delay n*100ms, `##` = literal #. Max string 99 bytes.
- `<cr>` = 0x0D (13 decimal), NOT URL delimiter %0D.
- Firmware update mode: hold buttons 1&8 (port 1) or 4&5 (port 2) 5s, or hold 7&8 while applying power.

<!-- UNRESOLVED: known-protocol hint TCP/IP not corroborated by this refined source — RS-232 only here. Prior discover note references DXB8i_Protocols_0_12.pdf "Network Control API" not yet obtained; that doc likely covers TCP/IP. -->
<!-- UNRESOLVED: exact model variant — input name "Dxb C2g B" vs source "DXB-8" vs prior-discover "DXB-8i-G2-B". Source text uses "DXB-8" throughout. -->
<!-- UNRESOLVED: power spec is 5v 300mA DC (stated) but no fault/current behavior documented. -->
<!-- UNRESOLVED: flow_control not stated; assumed none but unverified. -->
````

Upgrade done. Added 1 action (`factory_test_loop` / `!test<cr>`). All 20 command-table opcodes already present + preserved. Transport stays serial-only — no TCP content in source. All existing IDs/shapes kept verbatim.

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - api.auroramultimedia.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/12272/aurora-multimedia-control-systems-dxb-8i-b-manual.pdf
  - https://api.auroramultimedia.com/assets/526d4fa2-902b-4151-a87f-405e7c9304e2
  - https://www.manualslib.com/manual/1817704/Aurora-Dxb-8i-Series.html
  - https://www.manualslib.com/manual/1636397/Aurora-Dxb-8.html
retrieved_at: 2026-08-07T23:07:06.170Z
last_checked_at: 2026-08-19T08:28:38.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:28:38.936Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match source command table verbatim; transport baud/format/parity supported; no source commands omitted. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "known-protocol hint said TCP/IP, but refined source contains RS-232 commands only. Ethernet/IP API not in this source."
- "exact model variant (DXB-8 vs DXB-8i-G2-B vs \"C2G B\") not disambiguated in source text."
- "flow control not stated in source"
- "full response grammar for toggle query (?xTG) and LED-all query not exemplified in source"
- "no discrete variable registry in source beyond above commands"
- "source documents no unsolicited notifications. All outputs are responses to commands or programmed button-triggered strings."
- "no safety-relevant content in source."
- "known-protocol hint TCP/IP not corroborated by this refined source — RS-232 only here. Prior discover note references DXB8i_Protocols_0_12.pdf \"Network Control API\" not yet obtained; that doc likely covers TCP/IP."
- "exact model variant — input name \"Dxb C2g B\" vs source \"DXB-8\" vs prior-discover \"DXB-8i-G2-B\". Source text uses \"DXB-8\" throughout."
- "power spec is 5v 300mA DC (stated) but no fault/current behavior documented."
- "flow_control not stated; assumed none but unverified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
