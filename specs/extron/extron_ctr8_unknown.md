---
spec_id: admin/extron-ctr8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron CTR 8 Control Spec"
manufacturer: Extron
model_family: "CTR 8"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "CTR 8"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualshelf.com
  - support.displaymanager.net
  - github.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2524-01_B.pdf
  - https://www.manualshelf.com/manual/extron-electronics/ctr-8/setup-guide-user-guide-english.html
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
  - https://github.com/mefranklin6/Extron-Frontend-API
  - https://www.extron.com/download/files/userman/68-2524-50_A.pdf
retrieved_at: 2026-06-15T20:44:01.634Z
last_checked_at: 2026-06-16T07:02:13.148Z
generated_at: 2026-06-16T07:02:13.148Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full firmware version range not stated; part number 60-1408-01 observed only in the power-on banner example. Official user manual PDF URL could not be recovered (see recovery notes); this draft was generated from a refined text excerpt, so some table rows may be misaligned."
  - "flow control not stated in source"
  - "source row for 'set all tally ports' is partially garbled ('EX@X@X@X@X@X@X@X@ Taly ...'); exact command shape inferred from the query-all counterpart.\""
  - "exact trigger conditions and full payload set for contact_port_status_change"
  - "no multi-step sequences explicitly described in source."
  - "no explicit safety/interlock procedures stated beyond cabling notes."
  - "official user-manual PDF URL not recovered; several attempts timed out (see recovery notes). This draft relies on a refined text excerpt whose command/response table rows are partially garbled, so the exact payload shape of `set_all_tally_ports` and the `contact_port_status_change` event should be verified against the primary manual before promotion past `draft`."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:02:13.148Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions matched literally to source command table; transport parameters verified; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Extron CTR 8 Control Spec

## Summary
The Extron CTR 8 is an Eight Input Contact Closure to RS-232 Converter that generates Extron Simple Instruction Set (SIS) commands. It is controlled via SIS commands over an RS-232 serial link (the Remote port) and can in turn drive a downstream Extron switcher over its COM port. The device supports a Default operating mode (single input selection) and an Advanced mode (independent contact/tally control, multi-input selection, and host monitoring of unsolicited status messages).

<!-- UNRESOLVED: full firmware version range not stated; part number 60-1408-01 observed only in the power-on banner example. Official user manual PDF URL could not be recovered (see recovery notes); this draft was generated from a refined text excerpt, so some table rows may be misaligned. -->

## Transport
```yaml
# The host controls the CTR 8 through the Remote RS-232 port (fixed 9600 8N1).
# A second port (COM) is used by the CTR 8 to drive a downstream Extron switcher
# and has a configurable baud rate (9600/19200/38400/57600, 8N1) - see Notes.
protocols:
  - serial
serial:
  baud_rate: 9600          # Remote RS-232 port (fixed per source)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none       # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable     # inferred: input selection commands (1!..8!) route contact/tally
  - queryable    # inferred: multiple query commands (mode, contact, tally, firmware)
```

## Actions
```yaml
# ---------------------------------------------------------------------------
# Symbol legend (verbatim from source "Symbols Used in this Guide"):
#   E   = Escape key  (0x1B)
#   ]   = carriage return + line feed (CR/LF, 0x0D 0x0A)
#   }   = carriage return, no line feed (0x0D)
#   •   = Space (0x20)
#   X)  = input number 0-8 (Default mode); 1-8 only in Advanced mode
#   X!  = operating mode: 0 = Default, 1 = Advanced
#   X@  = selection / contact / tally state: 0 = off/not-selected, 1 = on/selected
#   X#  = A/V mute mode: 0 = none (default), 1 = ch0 mute, 2 = video+audio mute, 3 = video+sync mute
#   X$  = mute LED mode: 0 = always on (default), 1 = off when muted, 2 = blink when muted
#   X2% = baud rate: 9600, 19200, 38400, 57600 (default 9600)
# Commands are NOT case-sensitive unless noted (S/s, I/i, N/n, Q/q accepted).
# ---------------------------------------------------------------------------

# --- Operating mode ---
- id: set_operating_mode
  label: Set Operating Mode
  kind: action
  command: "E{mode}"
  params:
    - name: mode
      type: integer
      description: "0 = Default mode, 1 = Advanced mode (source symbol X!)"
  notes: "E = Escape (0x1B). Response: 'Mode {mode}]'."

- id: query_operating_mode
  label: Query Operating Mode
  kind: query
  command: "E MODE }"
  params: []
  notes: "Response: '{mode}]'. E = Escape (0x1B)."

# --- Default mode: input selection ---
- id: select_input
  label: Select Input
  kind: action
  command: "{input}!"
  params:
    - name: input
      type: integer
      description: "Input number 0-8 (source symbol X)). 0 deselects."
  notes: "Response: 'Chn •{input}]'. Default mode only."

- id: view_last_selected_input
  label: View Last Selected Input
  kind: query
  command: "!"
  params: []
  notes: "Response: '{input}]'."

- id: query_contact_status_default
  label: Query Contact Closure Status (Default Mode)
  kind: query
  command: "S"
  params: []
  notes: "'s' also accepted. Response: eight X@ digits (least-significant input on far left), e.g. '01000000]' = input 2 selected."

# --- Unidirectional serial data port (COM port configuration) ---
- id: configure_com_port
  label: Configure COM Port Parameters
  kind: action
  command: "E 2*{baud},n,8,1CP }"
  params:
    - name: baud
      type: integer
      description: "Baud rate for the COM (switcher) port - 9600, 19200, 38400, or 57600 (source symbol X2%). Parity n=none, 8 data bits, 1 stop bit."
  notes: "Example from source: 'E 2* 19200,n,8,1CP }'. Response: 'Cpn2 • Ccp {baud},N,8,1 ]'."

- id: view_com_port_parameters
  label: View COM Port Parameters
  kind: query
  command: "E 2CP }"
  params: []
  notes: "Response: '{baud},N,8,1 ]'."

# --- Advanced mode: contact ports ---
- id: query_individual_contact_port
  label: Query Individual Contact Port
  kind: query
  command: "{input}S"
  params:
    - name: input
      type: integer
      description: "Port 1-8 (Advanced mode only)."
  notes: "Response: '{state}]' (X@)."

- id: query_all_contact_ports
  label: Query All Contact Ports
  kind: query
  command: "S"
  params: []
  notes: "'s' also accepted. Response: eight X@ digits.]"

# --- Advanced mode: tally ports ---
- id: set_individual_tally_port
  label: Set Individual Tally Port
  kind: action
  command: "E{input}*{state}TALY }"
  params:
    - name: input
      type: integer
      description: "Tally port 1-8 (Advanced mode)."
    - name: state
      type: integer
      description: "0 = off, 1 = on (source symbol X@)."
  notes: "Response: 'Taly {input}*{state}]'."

- id: query_individual_tally_port
  label: Query Individual Tally Port
  kind: query
  command: "E{input}TALY }"
  params:
    - name: input
      type: integer
      description: "Tally port 1-8 (Advanced mode)."
  notes: "Response: '{state}]' (X@)."

- id: set_all_tally_ports
  label: Set All Tally Ports
  kind: action
  command: "E{states8}TALY }"
  params:
    - name: states8
      type: string
      description: "Eight X@ digits (0/1), one per tally port 1-8."
  notes: "Response: 'Taly {states8}]'. UNRESOLVED: source row for 'set all tally ports' is partially garbled ('EX@X@X@X@X@X@X@X@ Taly ...'); exact command shape inferred from the query-all counterpart."

- id: query_all_tally_ports
  label: Query All Tally Ports
  kind: query
  command: "E TALY }"
  params: []
  notes: "Response: eight X@ digits.]"

# --- A/V mute mode (both modes) ---
- id: configure_av_mute_mode
  label: Configure A/V Mute Mode
  kind: action
  command: "E{mute_mode}*{led_mode}MUTM }"
  params:
    - name: mute_mode
      type: integer
      description: "X#: 0 = normal/no mute (default), 1 = channel 0 mute, 2 = video mute + audio mute, 3 = video + sync mute."
    - name: led_mode
      type: integer
      description: "X$: 0 = LED always on (default), 1 = off when muted, 2 = blink when muted. LED mode settable only when mute mode is 1, 2, or 3."
  notes: "Response: 'Mutm {mute_mode}*{led_mode}]'."

- id: view_av_mute_mode
  label: View A/V Mute Mode Setting
  kind: query
  command: "E MUTM }"
  params: []
  notes: "Response: '{mute_mode}*{led_mode}]'."

# --- Other / system ---
- id: information_request
  label: Information Request
  kind: query
  command: "I"
  params: []
  notes: "'i' also accepted. Response: 'CTR • 8 ]'."

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
  notes: "'n' also accepted. Response: '60-xxxx-xx ]' (observed value 60-1408-01 in power-on banner)."

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "'q' also accepted. Response: '{x.xx} ]' (two decimal places)."

- id: query_full_firmware_version
  label: Query Full Firmware Version
  kind: query
  command: "*Q"
  params: []
  notes: "'*q' also accepted. Response: '{x.xx.xxxx} ]'."

- id: factory_reset
  label: Reset All Device Settings to Factory
  kind: action
  command: "E zXXX }"
  params: []
  notes: "Response: 'Zpx ]'. 'XXX' is a literal confirmation string typed by the operator. E = Escape (0x1B)."
```

## Feedbacks
```yaml
- id: contact_state
  type: string
  description: "Eight-digit contact status string (X@ per input, LSB = input 1 on far left)."

- id: tally_state
  type: string
  description: "Eight-digit tally status string (X@ per port)."

- id: operating_mode
  type: enum
  values: [default, advanced]

- id: av_mute_mode
  type: enum
  values: [none, channel0_mute, video_audio_mute, video_sync_mute]

- id: com_port_parameters
  type: string
  description: "'{baud},N,8,1' (e.g. '9600,N,8,1')."

- id: error_code
  type: enum
  values: ["E10", "E13", "E14"]
  description: "E10 = invalid command; E13 = invalid value (too large); E14 = invalid for current configuration/mode."
```

## Variables
```yaml
- id: operating_mode_var
  description: "Default (0) vs Advanced (1) mode - determines available command set."
- id: av_mute_mode_var
  description: "Mute mode 0-3 (X#)."
- id: mute_led_mode_var
  description: "LED mode 0-2 (X$); settable only when mute mode != 0."
- id: com_baud_rate_var
  description: "COM port baud rate (9600/19200/38400/57600). Remote port is fixed at 9600."
```

## Events
```yaml
# Unsolicited messages the CTR 8 sends to the host (no host response required).
- id: power_on_banner
  description: >
    Sent when the CTR 8 is first switched on:
    '(c) Copyright 20{yy}, Extron Electronics, CTR 8, V{x.xx}, 60-1408-01 ]'
    where {yy} = firmware release year and {x.xx} = firmware version.
  payload_example: "(c) Copyright 20{yy}, Extron Electronics, CTR 8, V{x.xx}, 60-1408-01 ]"

- id: contact_port_status_change
  description: >
    In Advanced mode, sent on a physical contact open/close from ports 1-8.
    Format: '{X#}•{X@}]' (mute mode, space, contact state). Source labels this row 'Sts'.
  payload_example: "{X#}•{X@}]"

# UNRESOLVED: exact trigger conditions and full payload set for contact_port_status_change
# are only partially described in the source excerpt.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset   # operator must type literal 'XXX' confirmation string
interlocks: []
notes: >
  Source gives general rear-panel cabling cautions only (do not connect
  "Show Me" cables to the +V tally voltage pin; ground pin optional for Show Me
  cables). No power-sequencing or interlock procedure is described.
# UNRESOLVED: no explicit safety/interlock procedures stated beyond cabling notes.
```

## Notes
- **Two serial ports.** The *Remote* RS-232 port is the host control interface (fixed 9600, 8N1). The *COM* port is an output the CTR 8 uses to drive a downstream Extron switcher; its baud rate is configurable (9600/19200/38400/57600, 8N1) via the `configure_com_port` action. This spec's `serial` block describes the Remote control port.
- **Operating modes.** Default mode ties all contact/tally pins together (selecting one input deselects the rest). Advanced mode decouples them, enabling multi-input selection, independent tally control, and host monitoring of unsolicited status messages — intended for use with a control processor such as an Extron IP Link attached to the Remote port.
- **A/V muting.** Triggered only by contact closure (press selected input again to mute, once more to unmute). SIS input selection (e.g. `1!` twice) does *not* trigger the de-select/mute state. Three mute modes (1/2/3) emit different downstream SIS strings on the COM port (see source A/V mute command table: `0!`, `0B`/`1B`/`2B`, `0Z`/`1Z`).
- **LED modes.** LED of the selected input is always on (mode 0, default), off when muted (1), or blinking when muted (2). LED mode is settable only when A/V mute mode is 1, 2, or 3.
- **Case sensitivity.** Commands are not case-sensitive unless noted; `S/s`, `I/i`, `N/n`, `Q/q` are all accepted.
- **Part number** observed in the power-on banner: `60-1408-01`.
- **Symbol legend** for command strings is documented at the top of the Actions block (`E`=Escape 0x1B, `]`=CR/LF, `}`=CR, `•`=Space).

<!-- UNRESOLVED: official user-manual PDF URL not recovered; several attempts timed out (see recovery notes). This draft relies on a refined text excerpt whose command/response table rows are partially garbled, so the exact payload shape of `set_all_tally_ports` and the `contact_port_status_change` event should be verified against the primary manual before promotion past `draft`. -->
````

Spec output above. Faithful to refined excerpt; `set_all_tally_ports` + `contact_port_status_change` flagged UNRESOLVED (source rows garbled). Confidence `low` — verify against primary manual pre-promote.

## Provenance

```yaml
source_domains:
  - extron.com
  - manualshelf.com
  - support.displaymanager.net
  - github.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2524-01_B.pdf
  - https://www.manualshelf.com/manual/extron-electronics/ctr-8/setup-guide-user-guide-english.html
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
  - https://github.com/mefranklin6/Extron-Frontend-API
  - https://www.extron.com/download/files/userman/68-2524-50_A.pdf
retrieved_at: 2026-06-15T20:44:01.634Z
last_checked_at: 2026-06-16T07:02:13.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:02:13.148Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions matched literally to source command table; transport parameters verified; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full firmware version range not stated; part number 60-1408-01 observed only in the power-on banner example. Official user manual PDF URL could not be recovered (see recovery notes); this draft was generated from a refined text excerpt, so some table rows may be misaligned."
- "flow control not stated in source"
- "source row for 'set all tally ports' is partially garbled ('EX@X@X@X@X@X@X@X@ Taly ...'); exact command shape inferred from the query-all counterpart.\""
- "exact trigger conditions and full payload set for contact_port_status_change"
- "no multi-step sequences explicitly described in source."
- "no explicit safety/interlock procedures stated beyond cabling notes."
- "official user-manual PDF URL not recovered; several attempts timed out (see recovery notes). This draft relies on a refined text excerpt whose command/response table rows are partially garbled, so the exact payload shape of `set_all_tally_ports` and the `contact_port_status_change` event should be verified against the primary manual before promotion past `draft`."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
