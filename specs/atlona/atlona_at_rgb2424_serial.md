---
spec_id: admin/atlona-at-rgb2424
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB2424 Control Spec"
manufacturer: Atlona
model_family: AT-RGB2424
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB2424
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.bzbexpress.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://files.bzbexpress.com/files/attachments/17032/atlona-at-rgb2424-manual.pdf
  - https://www.manualslib.com/manual/632369/Atlona-At-Rgb0802-To-At-Rgb6464.html
  - https://atlona.com
retrieved_at: 2026-06-15T06:41:51.397Z
last_checked_at: 2026-08-05T07:19:24.111Z
generated_at: 2026-08-05T07:19:24.111Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Ethernet/IP control port is listed in the spec table (RJ-45, optional accessory) but no IP protocol/port details are given in the source. RS-232 only below."
  - "source documents an 8-digit password feature (\"Set Password\", \"/+xxxxxxxx;\") but does not specify default credentials or login handshake"
  - "source does not expose any continuous settable parameters (no volume, gain, brightness)."
  - "source contains one operational warning (\"make sure the RGBHV connectors from the sources and to the destination should be in the same Order, Otherwise it could cause color loss or no output signal at all\") but no formal safety interlock or power-on sequencing procedure."
  - "firmware version range, default password, Ethernet/IP control protocol, command-response framing (delimiters, line ending) are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:19:24.111Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions and transport values are present verbatim in the RS-232 command table and spec section. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Atlona AT-RGB2424 Control Spec

## Summary
The Atlona AT-RGB2424 is a 24x24 professional RGBHV/Component Video matrix switcher. This spec covers its RS-232 serial control protocol (9600 8N1) using the ASCII command set documented in section 6.0 of the AT-RGB0802–AT-RGB6464 user manual, which Atlona publishes as the canonical reference for the AT-RGB2424.

<!-- UNRESOLVED: Ethernet/IP control port is listed in the spec table (RJ-45, optional accessory) but no IP protocol/port details are given in the source. RS-232 only below. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # UNRESOLVED: source documents an 8-digit password feature ("Set Password", "/+xxxxxxxx;") but does not specify default credentials or login handshake
```

## Traits
```yaml
- routable  # inferred from input/output routing commands (V, A, B, P, All# etc.)
- queryable  # inferred from Status[x1], Status, S[x], /*Type;, /^Version; queries
```

## Actions
```yaml
# System Commands
- id: query_model
  label: Query Model
  kind: query
  command: "/*Type;"
  params: []

- id: set_password
  label: Set Password
  kind: action
  command: "/+xxxxxxxx;"
  params:
    - name: password
      type: string
      description: 8-digit numeric password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: buzzer_off
  label: Turn Off Buzzer
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Turn On Buzzer
  kind: action
  command: "/:BellOn;"
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "/^Version;"
  params: []

- id: switch_to_creator2
  label: Switch to CREATOR 2.0 Command System
  kind: action
  command: "/~CREATOR20;"
  params: []

# Operation Commands
- id: input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "[x1]All"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)

- id: all_passthrough
  label: Transfer All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: all_outputs_off
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: input_to_matching_output
  label: Route Input to Matching Output
  kind: action
  command: "[x1]#"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based); routed to same-numbered output

- id: switch_off_output
  label: Switch Off Output
  kind: action
  command: "[x1]$"
  params:
    - name: output
      type: integer
      description: Output channel number (1-based)

- id: route_video
  label: Route Video Signal
  kind: action
  command: "[x1]V[x2]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: output
      type: integer
      description: Output channel number (1-based)

- id: route_video_multi
  label: Route Video Signal to Multiple Outputs
  kind: action
  command: "[x1]V[x2],[x3],[x4]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: outputs
      type: string
      description: Comma-separated list of output channel numbers

- id: route_audio
  label: Route Audio Signal
  kind: action
  command: "[x1]A[x2]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: output
      type: integer
      description: Output channel number (1-based)

- id: route_audio_multi
  label: Route Audio Signal to Multiple Outputs
  kind: action
  command: "[x1]A[x2],[x3],[x4]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: outputs
      type: string
      description: Comma-separated list of output channel numbers

- id: route_video_and_audio
  label: Route Both Video and Audio Signals
  kind: action
  command: "[x1]B[x2]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: output
      type: integer
      description: Output channel number (1-based)

- id: route_video_and_audio_multi
  label: Route Both Video and Audio Signals to Multiple Outputs
  kind: action
  command: "[x1]B[x2],[x3],[x4]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: outputs
      type: string
      description: Comma-separated list of output channel numbers

- id: route_input_to_group
  label: Route Input to Group of Outputs
  kind: action
  command: "[x1]P[x2]"
  params:
    - name: input
      type: integer
      description: Input channel number (1-based)
    - name: group
      type: integer
      description: Group number

- id: define_group
  label: Group Outputs Under Group Number
  kind: action
  command: "[x1]PP[x2],[x3],[x4]"
  params:
    - name: group
      type: integer
      description: Group number to define
    - name: outputs
      type: string
      description: Comma-separated list of output channel numbers

- id: query_group_outputs
  label: Query Outputs in Group
  kind: query
  command: "S[x]"
  params:
    - name: group
      type: integer
      description: Group number

- id: query_output_route
  label: Query Input for Output
  kind: query
  command: "Status[x1]"
  params:
    - name: output
      type: integer
      description: Output channel number (1-based)

- id: query_all_routes
  label: Query All Input/Output Routes
  kind: query
  command: "Status"
  params: []

- id: save_preset
  label: Save Current Routing to Preset
  kind: action
  command: "Save[Y]"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-9)

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall[Y]"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-9)

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear[Y]"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-9)

# CREATOR 2.0 command-system variants
- id: creator2_route_both
  label: CREATOR 2.0: Route Both Video and Audio
  kind: action
  command: "[X1]*[X2]!"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: creator2_route_audio
  label: CREATOR 2.0: Route Audio
  kind: action
  command: "[X1]*[X2]$"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: creator2_route_video_pct
  label: CREATOR 2.0: Route Video (%)
  kind: action
  command: "[X1]*[X2]%"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: creator2_route_video_amp
  label: CREATOR 2.0: Route Video (&)
  kind: action
  command: "[X1]*[X2]&"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number
```

## Feedbacks
```yaml
- id: model_info
  type: string
  description: Response to /*Type; - model identifier string
- id: firmware_version
  type: string
  description: Response to /^Version; - software version string
- id: group_membership
  type: string
  description: Response to S[x] - list of output channels in the named group
- id: output_route
  type: string
  description: Response to Status[x1] - input channel routed to the queried output
- id: all_routes
  type: string
  description: Response to Status - full input-to-output routing map, one output per line
```

## Variables
```yaml
# Preset slots (0-9) are settable via Save/Recall/Clear and treated as discrete state.
# UNRESOLVED: source does not expose any continuous settable parameters (no volume, gain, brightness).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains one operational warning ("make sure the RGBHV connectors from the sources and to the destination should be in the same Order, Otherwise it could cause color loss or no output signal at all") but no formal safety interlock or power-on sequencing procedure.
```

## Notes
- Source manual covers the entire AT-RGB0802 → AT-RGB6464 family; ManualsLib lists AT-RGB2424 in the "also suitable for" list, so the command set in section 6.0 is the canonical reference for the AT-RGB2424.
- Serial pinout per source: pin 2 = TX, pin 3 = RX, pin 5 = GND (9-pin female D connector on the unit).
- Bundled control application is "Switcher 2.0" (also called "CREATOR 2.0"); the `/~CREATOR20;` command switches the unit into the alternate command system documented in the last four rows of the command table.
- Ethernet (RJ-45) is listed as an "optional accessory" in the spec table but no IP protocol, port, or command mapping is provided in the source — IP control is therefore not covered by this spec.
- Front-panel button syntax ("Input + AV/VIDEO/AUDIO + Output + END + ENTER") mirrors the ASCII operation commands but is not independently enumerated above.
<!-- UNRESOLVED: firmware version range, default password, Ethernet/IP control protocol, command-response framing (delimiters, line ending) are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.bzbexpress.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://files.bzbexpress.com/files/attachments/17032/atlona-at-rgb2424-manual.pdf
  - https://www.manualslib.com/manual/632369/Atlona-At-Rgb0802-To-At-Rgb6464.html
  - https://atlona.com
retrieved_at: 2026-06-15T06:41:51.397Z
last_checked_at: 2026-08-05T07:19:24.111Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:19:24.111Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions and transport values are present verbatim in the RS-232 command table and spec section. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Ethernet/IP control port is listed in the spec table (RJ-45, optional accessory) but no IP protocol/port details are given in the source. RS-232 only below."
- "source documents an 8-digit password feature (\"Set Password\", \"/+xxxxxxxx;\") but does not specify default credentials or login handshake"
- "source does not expose any continuous settable parameters (no volume, gain, brightness)."
- "source contains one operational warning (\"make sure the RGBHV connectors from the sources and to the destination should be in the same Order, Otherwise it could cause color loss or no output signal at all\") but no formal safety interlock or power-on sequencing procedure."
- "firmware version range, default password, Ethernet/IP control protocol, command-response framing (delimiters, line ending) are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
