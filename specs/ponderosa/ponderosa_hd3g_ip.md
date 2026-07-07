---
spec_id: admin/ponderosa-hd3g
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ponderosa HD3G Control Spec"
manufacturer: Ponderosa
model_family: "Ponderosa HD3G"
aliases: []
compatible_with:
  manufacturers:
    - Ponderosa
  models:
    - "Ponderosa HD3G"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - www1.kramerav.com
  - kramerav.com
source_urls:
  - https://www1.kramerav.com/downloads/manuals/ponderosa_manual_with_madianav.pdf
  - https://www.kramerav.com/products/sierra-video-matrices
retrieved_at: 2026-07-01T13:41:46.468Z
last_checked_at: 2026-07-07T11:50:03.183Z
generated_at: 2026-07-07T11:50:03.183Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/Telnet control port not stated in source. Web (MediaNAV) login defaults documented but apply to web server, not Host protocol. Voltage/power specs, fault behavior, firmware compatibility not stated."
  - "Telnet/TCP control port not stated in source (do not assume 23)"
  - "flow control not stated in source"
  - "complete G syntax undocumented here.\""
  - "salvo setup procedure not described (only T trigger documented)."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "TCP/Telnet control port not stated. Flow control not stated. Full G-command syntax deferred to factory/website. Salvo register range (16 vs 32). Firmware/protocol version compatibility not stated. Voltage/current/power specs and fault recovery not in excerpt."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:50:03.183Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched literally to source commands with correct parameter shapes and framing; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Ponderosa HD3G Control Spec

## Summary
Ponderosa HD3G is a 3G-SDI routing switcher (Sierra Video 3G Series / MediaNAV family) controllable via the SVS Host ASCII protocol over serial (RS-232/RS-422) and Ethernet (TCP/IP, Telnet). Commands are framed between a `**` leader and `!!` trailer; the device returns `** OK !!` on success. This spec covers crosspoint routing (X/Y/V), status inquiries (I/Q/L/N/O/S), update reporting (U), salvo triggers (T), and configuration (G).

<!-- UNRESOLVED: TCP/Telnet control port not stated in source. Web (MediaNAV) login defaults documented but apply to web server, not Host protocol. Voltage/power specs, fault behavior, firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: Telnet/TCP control port not stated in source (do not assume 23)
serial:
  baud_rate: 115200  # factory default per source; 9600 and 38400 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no login procedure described for the Host protocol command set (web server login is separate - see Notes)
```

## Traits
```yaml
traits:
  - routable   # inferred from X/Y/V crosspoint connect commands
  - queryable  # inferred from I/Q/L/N/O/S status inquiries
```

## Actions
```yaml
# Framing: every command string = "**" leader + command(s) + "!!" trailer.
# Device not act until final "!" received. Upper/lower case both accepted inbound.
# All input/output/level numbers are 1-based.
actions:
  - id: capabilities_inquiry
    label: Capabilities Inquiry
    kind: query
    command: "** I !!"
    params: []
    notes: Returns implemented command letters terminated by "~", e.g. " ILSX~".

  - id: model_version_inquiry
    label: Model Name and Software Version Inquiry
    kind: query
    command: "** Q !!"
    params: []
    notes: Returns " Q<model>~<version>~", e.g. " QSmall~V2.1~".

  - id: size_level_names_inquiry
    label: Routing Switcher Size and Level Names Inquiry
    kind: query
    command: "** L !!"
    params: []
    notes: Returns " L<outputs>,<levels>,<inputs>,<level1>~<level2>~...~~".

  - id: source_status_inquiry
    label: Source Status Inquiry
    kind: query
    command: "** N{source} !!"
    params:
      - name: source
        type: integer
        description: Source (input) number, 1-based.

  - id: output_status_inquiry
    label: Output Status Inquiry
    kind: query
    command: "** O{output} !!"
    params:
      - name: output
        type: integer
        description: Output number, 1-based.

  - id: status_inquiry
    label: Full Status Inquiry
    kind: query
    command: "** S !!"
    params: []

  - id: update_mode_set
    label: Update Request Mode Set
    kind: action
    command: "** U{mode} !!"
    params:
      - name: mode
        type: integer
        description: "0=off; 1=async X change reports; 2=sync X reports; 3=async V reports; 4=sync V reports. Bare 'U' (no number) queries current mode."
    notes: Controls automatic output change reports sent on crosspoint changes.

  - id: connect_levels
    label: Connect Levels
    kind: action
    command: "** V{output},{in1},{in2},... !!"
    params:
      - name: output
        type: integer
        description: Output number, 1-based.
      - name: inputs
        type: integer_list
        description: "Comma-separated input per level (one entry per level). 0=leave unchanged; '-' (dash)=disconnect. Trailing levels may be omitted (left unchanged)."
    notes: Makes one connection per level to the given output.

  - id: connect_crosspoint
    label: Connect Crosspoint
    kind: action
    command: "** X{output},{input},{level} !!"
    params:
      - name: output
        type: integer
        description: Output number, 1-based.
      - name: input
        type: integer
        description: Input number, 1-based.
      - name: level
        type: integer
        description: "Level number, 1-based. 0 = all levels (AFV)."

  - id: connect_afv
    label: Connect All Levels (AFV)
    kind: action
    command: "** Y{output},{input} !!"
    params:
      - name: output
        type: integer
        description: Output number, 1-based.
      - name: input
        type: integer
        description: Input number, 1-based.

  - id: trigger_salvo
    label: Trigger Salvo
    kind: action
    command: "** T{register} !!"
    params:
      - name: register
        type: integer
        description: "Salvo register number, 1-32 (summary table says 1-16; detail text says 1 to 32 - UNRESOLVED range discrepancy)."
    notes: On failure aborts and reports "ERROR Salvo Has Locked Xpts".

  - id: config_command
    label: Configuration Query/Modify (G)
    kind: action
    command: "** G {params}~ !!"
    params:
      - name: params
        type: string
        description: Configuration parameter token(s); tilde-delimited. Example from source "G SRC_NAMES,1,0~".
    notes: "Full G-command details NOT in source - source defers to factory/website. UNRESOLVED: complete G syntax undocumented here."
```

## Feedbacks
```yaml
feedbacks:
  - id: ok_ack
    type: string
    values: ["** OK !!"]
    notes: Success acknowledgement returned after any executed command string.

  - id: error_ack
    type: string
    values: ["** ERROR {description} !!"]
    notes: "Returned on error; remainder of command string ignored. Optional descriptive string, e.g. 'ERROR Syntax: No Number:XX'."

  - id: capabilities_response
    type: string
    notes: Response to I inquiry - space + command letters + "~".

  - id: model_version_response
    type: string
    notes: Response to Q inquiry - " Q<model>~<version>~".

  - id: size_levels_response
    type: string
    notes: Response to L inquiry - " L<outs>,<levels>,<ins>,<names>~~".

  - id: source_status_response
    type: string
    notes: Response to N inquiry - series of X and/or Y commands describing where the source is routed.

  - id: output_status_response
    type: string
    notes: "Response to O inquiry - single V command, single Y command, or L X commands (one per level). '-' = not connected; '0' = unknown/unmapped/nonexistent."

  - id: status_response
    type: string
    notes: Response to S inquiry - series of V/strings describing current routing.

  - id: update_mode_response
    type: enum
    values: [0, 1, 2, 3, 4]
    notes: Response to bare "U" inquiry - current update mode.
```

## Variables
```yaml
variables:
  - id: update_mode
    type: enum
    values: [0, 1, 2, 3, 4]
    description: Automatic output change report mode (set via U command).
# No other settable non-discrete parameters documented in source.
```

## Events
```yaml
events:
  - id: powerup_reset
    description: "Unsolicited '** RESET !!' sent on serial port when routing switcher powers up."

  - id: crosspoint_change_report
    description: "When update mode is 1-4, device sends X or V command(s) reporting changed crosspoints after a connect command (X for modes 1-2, V for modes 3-4). E.g. '** X5,12,2 !!'."
```

## Macros
```yaml
# No multi-step macro sequences explicitly documented in source.
# UNRESOLVED: salvo setup procedure not described (only T trigger documented).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in this excerpt.
```

## Notes
- Command framing: leader `**` ... trailer `!!`. Whole string buffered until final `!`. Inbound whitespace/control chars (< SPACE, plus DEL 7F) ignored. Outbound always uppercase except in names.
- Input/output/level numbers are 1-based (never 0); `0` inside a connect command means "leave unchanged", `-` (dash) means "disconnect".
- Serial: three 9-pin Host ports, factory default 115200/8/N/1, each switchable RS-232 or RS-422 (also 9600, 38400 baud). RS-485 used for control panels (separate from Host protocol).
- Ethernet: 10/100 Base-T, protocols ARP/ICMP/TCP/IP/Telnet/HTTP. Web server (MediaNAV) is a separate control surface with its own login (default IP 192.168.1.200, user "admin", password "password") — distinct from the Host protocol over Telnet, which has no documented login.
- Salvo register range discrepancy: Command Summary table shows `T{1-16}`; T-command detail text says "register number from 1 to 32".

<!-- UNRESOLVED: TCP/Telnet control port not stated. Flow control not stated. Full G-command syntax deferred to factory/website. Salvo register range (16 vs 32). Firmware/protocol version compatibility not stated. Voltage/current/power specs and fault recovery not in excerpt. -->

## Provenance

```yaml
source_domains:
  - www1.kramerav.com
  - kramerav.com
source_urls:
  - https://www1.kramerav.com/downloads/manuals/ponderosa_manual_with_madianav.pdf
  - https://www.kramerav.com/products/sierra-video-matrices
retrieved_at: 2026-07-01T13:41:46.468Z
last_checked_at: 2026-07-07T11:50:03.183Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:50:03.183Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched literally to source commands with correct parameter shapes and framing; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/Telnet control port not stated in source. Web (MediaNAV) login defaults documented but apply to web server, not Host protocol. Voltage/power specs, fault behavior, firmware compatibility not stated."
- "Telnet/TCP control port not stated in source (do not assume 23)"
- "flow control not stated in source"
- "complete G syntax undocumented here.\""
- "salvo setup procedure not described (only T trigger documented)."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "TCP/Telnet control port not stated. Flow control not stated. Full G-command syntax deferred to factory/website. Salvo register range (16 vs 32). Firmware/protocol version compatibility not stated. Voltage/current/power specs and fault recovery not in excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
