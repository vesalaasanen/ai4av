---
spec_id: admin/atlona-at-rgb1624
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB1624 Control Spec"
manufacturer: Atlona
model_family: AT-RGB1624
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB1624
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
retrieved_at: 2026-06-07T20:58:15.188Z
last_checked_at: 2026-08-05T07:19:10.494Z
generated_at: 2026-08-05T07:19:10.494Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number for the optional Ethernet accessory is not stated in the source. Firmware version is not stated. Response/acknowledgement format for query commands is not specified in source."
  - "TCP/IP port number not stated in source (Ethernet listed as \"Optional accessory\", RJ-45, 10/100 full/half-duplex)"
  - "response format for Status, S[x], /*Type;, /^Version; not stated in source."
  - "no other parameter-only commands in source."
  - "source does not document unsolicited notifications from the device."
  - "source does not document any multi-step macro sequences."
  - "source contains one BNC-order caution (\"RGBHV connectors from the"
  - "TCP/IP port number for Ethernet accessory. Firmware version. Response grammar for query commands. Whether the optional Ethernet module accepts the same ASCII command set as RS-232. HEX byte encodings for the command set (Custom Code Tab supports HEX but source does not tabulate the byte sequences)."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:19:10.494Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match documented source commands with compatible parameter shapes, and declared serial transport values are supported. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-07
---

# Atlona AT-RGB1624 Control Spec

## Summary
The Atlona AT-RGB1624 is a 16x24 RGB / Component Video matrix switcher with audio, controlled via RS-232 (and an optional Ethernet/TCP-IP accessory). This spec covers the RS-232 command set documented in the vendor manual, including the Switcher 2.0 ASCII command protocol for routing, presets, status queries, and system commands.

<!-- UNRESOLVED: TCP/IP port number for the optional Ethernet accessory is not stated in the source. Firmware version is not stated. Response/acknowledgement format for query commands is not specified in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP/IP port number not stated in source (Ethernet listed as "Optional accessory", RJ-45, 10/100 full/half-duplex)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no serial-session login documented; the 8-digit password is a local front-panel lockout set via RS-232, not an RS-232 login prompt
```

**Notes on transport:**
- Serial connector: RS-232 female 9-pin D-sub.
- Pinout: 2 = TX, 3 = RX, 5 = GND.
- Ethernet is an "Optional accessory" (RJ-45 Female), protocol TCP/IP, 10/100 full/half-duplex. No port number stated.
- Command-chain terminator on the ASCII wire is `.` per the Custom Code Tab example (e.g. `1B7.2A4.` chains two routing commands). Individual table-listed commands may be sent without the trailing `.` when not chaining.
- Commands may be sent in ASCII or HEX format per the application's Custom Code Tab. The source command table documents the ASCII form only; the HEX form is not tabulated in the source.

## Traits
```yaml
- routable   # inferred: input/output routing commands present (V/A/B/P/All forms)
- queryable  # inferred: query commands returning state present (Status, S[x], /*Type;, /^Version;)
```

## Actions
```yaml
# Each row from the source command table is emitted as a separate action.
# Variable parts (e.g. [x1], [x2], [Y]) are shown in the command template.

# --- System Commands ---
- id: get_model_info
  label: Get Model Info
  kind: query
  command: "/*Type;"
  params: []

- id: set_password
  label: Set Front-Panel Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 8-digit numeric password for front-panel lockout

- id: lock_keyboard
  label: Lock Front-Panel Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Front-Panel Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: buzzer_off
  label: Turn Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Turn Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: switch_creator20
  label: Switch to CREATOR2.0 Command System
  kind: action
  command: "/~CREATOR20;"
  params: []

# --- Routing: single input to all outputs ---
- id: route_input_to_all_outputs
  label: Route Input [x1] to All Outputs
  kind: action
  command: "{x1}All"
  params:
    - name: x1
      type: integer
      description: Input channel number

# --- Routing: bulk ---
- id: route_matching_inputs_to_outputs
  label: Route Each Input to Matching Output (1->1, 2->2, ...)
  kind: action
  command: "All#"
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

# --- Routing: identity / single off ---
- id: route_input_x1_to_output_x1
  label: Route Input [x1] to Output [x1] (Identity)
  kind: action
  command: "{x1}#"
  params:
    - name: x1
      type: integer
      description: Channel number (input and output)

- id: switch_off_output_x1
  label: Switch Off Output [x1]
  kind: action
  command: "{x1}$"
  params:
    - name: x1
      type: integer
      description: Output channel number to switch off

# --- Routing: video only (single) ---
- id: route_video_x1_to_x2
  label: Route Video Input [x1] to Output [x2]
  kind: action
  command: "{x1} V{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

# --- Routing: video only (multi-output) ---
- id: route_video_x1_to_x2_x3_x4
  label: Route Video Input [x1] to Outputs [x2], [x3], [x4]
  kind: action
  command: "{x1} V{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: First output channel
    - name: x3
      type: integer
      description: Second output channel
    - name: x4
      type: integer
      description: Third output channel

# --- Routing: audio only (single) ---
- id: route_audio_x1_to_x2
  label: Route Audio Input [x1] to Output [x2]
  kind: action
  command: "{x1} A{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

# --- Routing: audio only (multi-output) ---
- id: route_audio_x1_to_x2_x3_x4
  label: Route Audio Input [x1] to Outputs [x2], [x3], [x4]
  kind: action
  command: "{x1} A{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: First output channel
    - name: x3
      type: integer
      description: Second output channel
    - name: x4
      type: integer
      description: Third output channel

# --- Routing: both audio and video (single) ---
- id: route_both_x1_to_x2
  label: Route Both A+V Input [x1] to Output [x2]
  kind: action
  command: "{x1} B{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

# --- Routing: both audio and video (multi-output) ---
- id: route_both_x1_to_x2_x3_x4
  label: Route Both A+V Input [x1] to Outputs [x2], [x3], [x4]
  kind: action
  command: "{x1} B{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: First output channel
    - name: x3
      type: integer
      description: Second output channel
    - name: x4
      type: integer
      description: Third output channel

# --- Routing: group outputs ---
- id: route_input_x1_to_group_x2
  label: Route Input [x1] to All Outputs in Group [x2]
  kind: action
  command: "{x1}P{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output group number

- id: group_outputs_x2_x3_x4_under_x1
  label: Group Output Channels [x2], [x3], [x4] Under Group [x1]
  kind: action
  command: "{x1}PP{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Group number to assign
    - name: x2
      type: integer
      description: First output channel in group
    - name: x3
      type: integer
      description: Second output channel in group
    - name: x4
      type: integer
      description: Third output channel in group

- id: get_group_outputs
  label: Get Output Channels in Group [x]
  kind: query
  command: "S{x}"
  params:
    - name: x
      type: integer
      description: Group number

# --- Status queries ---
- id: get_status_of_output_x1
  label: Get Input Routed to Output [x1]
  kind: query
  command: "Status{x1}"
  params:
    - name: x1
      type: integer
      description: Output channel number

- id: get_status_all
  label: Get Status of All Outputs (One by One)
  kind: query
  command: "Status"
  params: []

# --- Presets ---
- id: save_preset_y
  label: Save Current Routing to Preset [Y]
  kind: action
  command: "Save{Y}"
  params:
    - name: Y
      type: integer
      description: Preset slot number (0-9)

- id: recall_preset_y
  label: Recall Preset [Y]
  kind: action
  command: "Recall{Y}"
  params:
    - name: Y
      type: integer
      description: Preset slot number (0-9)

- id: clear_preset_y
  label: Clear Preset [Y]
  kind: action
  command: "Clear{Y}"
  params:
    - name: Y
      type: integer
      description: Preset slot number (0-9)

# --- Alternate routing syntax (asterisk form) ---
- id: route_both_x1_to_x2_alt
  label: Route Both A+V Input [x1] to Output [x2] (alt syntax)
  kind: action
  command: "{x1}*{x2}!"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_audio_x1_to_x2_alt
  label: Route Audio Input [x1] to Output [x2] (alt syntax)
  kind: action
  command: "{x1}*{x2}$"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_video_x1_to_x2_alt_percent
  label: Route Video Input [x1] to Output [x2] (alt syntax, %)
  kind: action
  command: "{x1}*{x2}%"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_video_x1_to_x2_alt_amp
  label: Route Video Input [x1] to Output [x2] (alt syntax, &)
  kind: action
  command: "{x1}*{x2}&"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number
```

## Feedbacks
```yaml
# Response grammar is not explicitly documented in the source (only example
# application inputs like "1B7.2A4." are shown; the device's reply format is
# implied by Status commands but not specified in a table).
# UNRESOLVED: response format for Status, S[x], /*Type;, /^Version; not stated in source.
```

## Variables
```yaml
# No standalone settable parameters are documented in the source beyond the
# password (already covered as a discrete action). No variable block applies.
# UNRESOLVED: no other parameter-only commands in source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains one BNC-order caution ("RGBHV connectors from the
# sources and to the destination should be in the same Order, otherwise it
# could cause color loss or no output signal at all") but this is a wiring
# installation note, not a command-level safety interlock. No command-level
# safety warnings, interlocks, or power-on sequencing requirements are
# documented in the source.
```

## Notes
- The source manual covers multiple sibling matrix models in the Atlona RGB family (AT-RGB48/642, AT-RGB48/6432, AT-RGB48/6448, AT-RGB6464) and a master/slave cascade section for combining units. Channel counts in the command grammar ([x1], [x2], etc.) are model-dependent; this spec targets the AT-RGB1624 (16 in x 24 out).
- The "Custom Code Tab" example `1B7.2A4.` demonstrates chained ASCII routing commands: `1` (input 1) `B` (both A+V) `7` (output 7) `.` (terminator), then `2` `A` (audio only) `4` `.` (output 4). The terminator is `.` for chained ASCII command sequences. Single commands may be sent without the trailing `.`.
- Commands may be sent in ASCII or HEX format per the Custom Code Tab. The source command table documents the ASCII form only; the HEX byte sequences are not tabulated in the source.
- The `Status`, `S[x]`, `Status[x1]`, `/*Type;`, and `/^Version;` commands are documented as query types per the source "Acquires ..." wording; response format is implied but not specified.
- Two routing syntaxes coexist: the `<input><mode><output>` form (e.g. `3 V10`, `12 B6`) and the `<input>*<output><symbol>` form (e.g. `3*10%`). Both `%` and `&` symbols appear in the source for the same video-routing operation ("Transfer video signals from input channel [x1] to output channel [x2]"); both are emitted as actions per the source's row-by-row presentation.
- The source row `[x1]$ [x1]$.` shows the off-single-output command in two equivalent forms: with and without the trailing `.` terminator. Emitted as a single action (`{x1}$`); the terminator follows the chained-command convention noted above.
- Ethernet control requires an "Optional accessory" RJ-45 module; the source does not state the TCP port or whether the same ASCII command set is tunneled over TCP.
- Front-panel button operation (e.g. press sequence `3`, `AV`, `6`, `END`, `ENTER` to route input 3 A+V to output 6) is documented in the source but is a hardware button operation, not an RS-232 command, and is therefore not emitted as an action. The equivalent RS-232 syntax is `3 B6` (or `3*6!`).
- The "Save[Y]" / "Recall[Y]" / "Clear[Y]" preset grammar uses capital Y to denote the preset slot (0-9) per the source; other commands use lowercase [x] / [x1] notation.
- The application software is named "Switcher 2.0" / "Switch 2.0" in the source (both spellings appear).
<!-- UNRESOLVED: TCP/IP port number for Ethernet accessory. Firmware version. Response grammar for query commands. Whether the optional Ethernet module accepts the same ASCII command set as RS-232. HEX byte encodings for the command set (Custom Code Tab supports HEX but source does not tabulate the byte sequences). -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
retrieved_at: 2026-06-07T20:58:15.188Z
last_checked_at: 2026-08-05T07:19:10.494Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:19:10.494Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match documented source commands with compatible parameter shapes, and declared serial transport values are supported. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number for the optional Ethernet accessory is not stated in the source. Firmware version is not stated. Response/acknowledgement format for query commands is not specified in source."
- "TCP/IP port number not stated in source (Ethernet listed as \"Optional accessory\", RJ-45, 10/100 full/half-duplex)"
- "response format for Status, S[x], /*Type;, /^Version; not stated in source."
- "no other parameter-only commands in source."
- "source does not document unsolicited notifications from the device."
- "source does not document any multi-step macro sequences."
- "source contains one BNC-order caution (\"RGBHV connectors from the"
- "TCP/IP port number for Ethernet accessory. Firmware version. Response grammar for query commands. Whether the optional Ethernet module accepts the same ASCII command set as RS-232. HEX byte encodings for the command set (Custom Code Tab supports HEX but source does not tabulate the byte sequences)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
