---
spec_id: admin/neothings-vandenberg
schema_version: ai4av-public-spec-v1
revision: 1
title: "Neothings Vandenberg Control Spec"
manufacturer: Neothings
model_family: Vandenberg
aliases: []
compatible_with:
  manufacturers:
    - Neothings
  models:
    - Vandenberg
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - neoprointegrator.us
  - manualslib.com
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/02/DOC42-00041-A_Vandenberg_Integrators_Guide.pdf
  - https://www.manualslib.com/manual/1728442/Neopro-Doc42.html
retrieved_at: 2026-06-09T19:25:54.302Z
last_checked_at: 2026-06-10T07:33:47.808Z
generated_at: 2026-06-10T07:33:47.808Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number not stated in source"
  - "number of HDMI inputs/outputs inferred from examples, not explicitly stated"
  - "input/output count ranges not explicitly stated"
  - "TCP port number not stated in source"
  - "exact response strings for power status not stated in source"
  - "exact response format not documented in source"
  - "no continuous variable ranges documented beyond discrete actions above"
  - "no unsolicited notification events documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "exact input/output count not explicitly stated (inferred from examples)"
  - "Toslink input count (8) and SPDIF output count (4) inferred from text, not tabulated"
  - "exact response format for query commands not documented"
  - "firmware version compatibility not stated"
  - "power status query response format not stated"
  - "IP address default/factory values not stated"
  - "memory edit function details not documented"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:33:47.808Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source; transport parameters verified; source fully represented by spec. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Neothings Vandenberg Control Spec

## Summary
Neothings Vandenberg is an HDMI matrix switcher with 8 HDMI inputs, 8 HDMI outputs, 8 SPDIF audio inputs, 4 SPDIF audio outputs, and 8 Toslink digital audio inputs. This spec covers serial (RS-232) and TCP/IP control using an ASCII bracket-delimited command protocol. Audio routing supports two modes: SPDIF (Mode 1) and 7.1 uncompressed (Mode 2).

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: number of HDMI inputs/outputs inferred from examples, not explicitly stated -->
<!-- UNRESOLVED: input/output count ranges not explicitly stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from [P,1] / [P,0] power commands
  - routable   # inferred from [VV]/[VA]/[VX] switching commands
  - queryable  # inferred from [?V]/[?P]/[?S]/[?VX] query commands
  - levelable  # inferred from display brightness commands
```

## Actions
```yaml
actions:
  - id: route_video
    label: Route Video Input to Output
    kind: action
    command: "[VV,{input},{output}]"
    params:
      - name: input
        type: integer
        description: Source input number (1-based); 0 disables the selected output
      - name: output
        type: integer
        description: Output number (1-based); 0 routes input to all outputs
    notes: Routes video only.

  - id: route_audio
    label: Route Audio Input to Output
    kind: action
    command: "[VA,{input},{output}]"
    params:
      - name: input
        type: integer
        description: Audio source input number (1-based); 0 disables the selected output
      - name: output
        type: integer
        description: Output number (1-based); 0 routes input to all outputs
    notes: Routes audio only. Independent of video in Mode 1.

  - id: route_video_audio
    label: Route Video and Audio Input to Output
    kind: action
    command: "[VX,{input},{output}]"
    params:
      - name: input
        type: integer
        description: Source input number (1-based); 0 disables the selected output
      - name: output
        type: integer
        description: Output number (1-based); 0 routes input to all outputs
    notes: Routes both video and audio together.

  - id: power_on
    label: Power On
    kind: action
    command: "[P,1]"
    params: []

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: "[P,0]"
    params: []

  - id: led_off
    label: LED Off
    kind: action
    command: "[S,L,0]"
    params: []

  - id: led_on
    label: LED On
    kind: action
    command: "[S,L,1]"
    params: []

  - id: ir_off
    label: IR Off
    kind: action
    command: "[S,R,0]"
    params: []

  - id: ir_on
    label: IR On
    kind: action
    command: "[S,R,1]"
    params: []

  - id: verbosity_off
    label: Verbosity Off
    kind: action
    command: "[S,V,0]"
    params: []

  - id: verbosity_on
    label: Verbosity On
    kind: action
    command: "[S,V,1]"
    params: []

  - id: display_brightness_25
    label: Display Brightness 25%
    kind: action
    command: "[S,D,25]"
    params: []

  - id: display_brightness_50
    label: Display Brightness 50%
    kind: action
    command: "[S,D,50]"
    params: []

  - id: display_brightness_75
    label: Display Brightness 75%
    kind: action
    command: "[S,D,75]"
    params: []

  - id: display_brightness_100
    label: Display Brightness 100%
    kind: action
    command: "[S,D,100]"
    params: []

  - id: powerup_standby
    label: On Power Up - Standby
    kind: action
    command: "[S,A,0]"
    params: []
    notes: Unit powers into standby mode.

  - id: powerup_on
    label: On Power Up - On
    kind: action
    command: "[S,A,1]"
    params: []
    notes: Unit powers on automatically.

  - id: audio_mode_spdif
    label: Audio Mode 1 - SPDIF Routing
    kind: action
    command: "[S,MODE,1]"
    params: []
    notes: SPDIF digital audio routing mode. Audio routes independently from video.

  - id: audio_mode_71
    label: Audio Mode 2 - 7.1 Routing
    kind: action
    command: "[S,MODE,2]"
    params: []
    notes: 7.1 channel uncompressed audio routing. Audio and video cannot be switched separately in this mode.

  - id: dhcp_off
    label: DHCP Off
    kind: action
    command: "[S,DHCP,0]"
    params: []

  - id: dhcp_on
    label: DHCP On
    kind: action
    command: "[S,DHCP,1]"
    params: []

  - id: set_ip_address
    label: Set IP Address
    kind: action
    command: "[S,IP,{address}]"
    params:
      - name: address
        type: string
        description: IP address in dotted decimal (xx.xx.xx.xx)

  - id: set_gateway
    label: Set Gateway Address
    kind: action
    command: "[S,GW,{address}]"
    params:
      - name: address
        type: string
        description: Gateway IP address in dotted decimal (xx.xx.xx.xx)

  - id: set_netmask
    label: Set Netmask
    kind: action
    command: "[S,NM,{address}]"
    params:
      - name: address
        type: string
        description: Subnet mask in dotted decimal (xx.xx.xx.xx)

  - id: query_firmware
    label: Query Firmware Version
    kind: query
    command: "[?V]"
    params: []

  - id: query_power_status
    label: Query Power Status
    kind: query
    command: "[?P]"
    params: []

  - id: query_setup
    label: Query Setup Values
    kind: query
    command: "[?S]"
    params: []

  - id: query_matrix_state
    label: Query Switching Matrix State
    kind: query
    command: "[?VX]"
    params: []
    notes: Response is in curly brackets and can be re-sent to the matrix to restore state.
```

## Feedbacks
```yaml
feedbacks:
  - id: error_response
    type: enum
    values: ["E"]
    description: Returned as [E] when a command has invalid parameters or syntax error.

  - id: matrix_state_response
    type: string
    description: >
      Returned in curly brackets { } after valid switching commands. Contains the
      full switching matrix state. Can be re-used as input back to the matrix or
      for memory edit function.

  - id: firmware_version
    type: string
    description: Response to [?V] query. Exact format not documented in source.

  - id: power_status
    type: enum
    values: ["on", "off"]
    description: Response to [?P] query. Exact response format not documented in source.
    # UNRESOLVED: exact response strings for power status not stated in source

  - id: setup_values
    type: string
    description: Response to [?S] query. Exact format not documented in source.
    # UNRESOLVED: exact response format not documented in source
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented beyond discrete actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
macros:
  - id: group_command
    label: Group Command
    description: >
      Multiple commands wrapped in curly brackets: {[cmd1][cmd2][cmd3]}.
      Produces a single combined response. Also used for memory edit function.
    steps:
      - Send {[command1][command2]...[commandN]}
      - Receive single { } response encompassing all results
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Commands are not case sensitive.
- Numbers are 1 or 2 digits; leading zeroes optional.
- Spaces not permitted within square brackets — will generate error [E].
- No carriage return or special terminator needed; closing bracket triggers processing.
- Characters outside brackets are discarded.
- Serial port is DCE (use straight-through cable to DTE host); DE-9 female connector.
- TCP/IP uses the same command set as serial.
- One-way commands can be sent regardless of matrix state, including standby.
- In Standby Mode all outputs are virtually disconnected; HDMI ports consume less power.
- Audio Mode 1 (SPDIF): audio routes independently from video. 24 unique digital audio sources possible.
- Audio Mode 2 (7.1): audio and video cannot be switched separately; 7.1 audio only routable to HDMI outputs, not SPDIF.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: exact input/output count not explicitly stated (inferred from examples) -->
<!-- UNRESOLVED: Toslink input count (8) and SPDIF output count (4) inferred from text, not tabulated -->
<!-- UNRESOLVED: exact response format for query commands not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: power status query response format not stated -->
<!-- UNRESOLVED: IP address default/factory values not stated -->
<!-- UNRESOLVED: memory edit function details not documented -->

## Provenance

```yaml
source_domains:
  - neoprointegrator.us
  - manualslib.com
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/02/DOC42-00041-A_Vandenberg_Integrators_Guide.pdf
  - https://www.manualslib.com/manual/1728442/Neopro-Doc42.html
retrieved_at: 2026-06-09T19:25:54.302Z
last_checked_at: 2026-06-10T07:33:47.808Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:33:47.808Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source; transport parameters verified; source fully represented by spec. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number not stated in source"
- "number of HDMI inputs/outputs inferred from examples, not explicitly stated"
- "input/output count ranges not explicitly stated"
- "TCP port number not stated in source"
- "exact response strings for power status not stated in source"
- "exact response format not documented in source"
- "no continuous variable ranges documented beyond discrete actions above"
- "no unsolicited notification events documented in source"
- "no safety warnings or interlock procedures stated in source"
- "exact input/output count not explicitly stated (inferred from examples)"
- "Toslink input count (8) and SPDIF output count (4) inferred from text, not tabulated"
- "exact response format for query commands not documented"
- "firmware version compatibility not stated"
- "power status query response format not stated"
- "IP address default/factory values not stated"
- "memory edit function details not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
