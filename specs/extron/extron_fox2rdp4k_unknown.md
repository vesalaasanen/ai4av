---
spec_id: admin/extron-fox2rdp4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOX II R DP 4K Control Spec"
manufacturer: Extron
model_family: "FOX II R DP 4K"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOX II R DP 4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2540-01_D.pdf
  - https://www.extron.com/download/files/userman/68-2540-50_C_FOXIIDP.pdf
  - https://www.extron.com/product/fox2rdp4k
retrieved_at: 2026-07-02T20:51:05.388Z
last_checked_at: 2026-07-07T11:40:26.131Z
generated_at: 2026-07-07T11:40:26.131Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Exact first-party PDF URL not located (see recovery notes); spec derived from refined excerpt of 68-2540-01 Rev. D user guide covering both T and R units."
  - "exact response payload formats for each feedback are documented in source using symbol placeholders (X#, X$, X&, X1#, X1%, X1^, X1(, X2#, etc.). Verbatim response strings per query are listed in the Actions section command responses; see source lines 398-491 for full mapping."
  - "analog audio return gain range appears as -18 to +24 dB in 1 dB steps in source, but the receiver Product Configuration Software slide control shows -18 to +10 dB; discrepancy unresolved."
  - "EDID Minder change message (EdidMdr nn]) is documented for transmitter only; not emitted by receiver."
  - "no multi-step command sequences documented in source."
  - "no explicit safety warnings, interlock lockouts, or power-on sequencing requirements beyond the physical reset procedures. Physical reset procedures (Mode 1 factory-firmware reset for one power cycle; Mode 5 factory-defaults reset excluding firmware) involve power cycling and are documented in the source but are hardware-initiated, not SIS-controlled."
  - "(1) Exact first-party PDF URL for the FOX II R DP 4K user manual not located — prior attempts probed extron.com/download/files/userman/68-2053-01_*.pdf revision/suffix variants (all 404) and ManualsLib/Mans.io mirrors (none found). Source refined excerpt is from 68-2540-01 Rev. D which covers both T and R units. (2) Firmware version compatibility range not stated. (3) Analog audio gain range discrepancy (-18..+24 SIS vs -18..+10 software slide) unresolved. (4) Protocol version number not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:40:26.131Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec receiver commands matched verbatim to source; transport parameters verified; complete coverage of documented receiver SIS command set. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron FOX II R DP 4K Control Spec

## Summary
The Extron FOX II R DP 4K is a DisplayPort fiber optic receiver that receives video, audio, and control signals from a matching FOX II T DP 4K transmitter over fiber. This spec covers SIS (Simple Instruction Set) control of the receiver via the rear-panel Remote RS-232 port (3-pole captive screw) and the front-panel Configuration port (mini USB B), both of which share the same serial protocol. RS-232 pass-through over fiber is also supported up to 115200 baud.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Exact first-party PDF URL not located (see recovery notes); spec derived from refined excerpt of 68-2540-01 Rev. D user guide covering both T and R units. -->

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
  type: none
```

Notes: Source states both the rear Remote RS-232 port and the front-panel Configuration port (mini USB B) use the same serial parameters and accept the same SIS commands. Both ports may be active simultaneously; the command reaching the processor first is handled first. `auth.type: none` inferred — source describes no login/password procedure. Pass-through RS-232 over fiber runs up to 115200 baud (independent of the local control port rate). Baud/data-bits/parity/stop-bits/flow-control values are stated verbatim in the source.

## Traits
```yaml
traits:
  - queryable
  - levelable
```

`queryable` inferred from numerous status/info request commands (2S, 4S, 5S, 6S, 20S, I, Q, N, 40S, B, G, ECN}, EVBITD}, ENHDCP}, EOHDCP}, X1$Z). `levelable` inferred from analog audio gain/attenuation commands (X^G, X*g, +G, -G).

## Actions
```yaml
actions:
  - id: video_mute_on
    label: Mute Video Output
    kind: action
    command: "1B"
    params: []
  - id: video_sync_mute_on
    label: Mute Video And Sync
    kind: action
    command: "2B"
    params: []
  - id: video_mute_off
    label: Output Video
    kind: action
    command: "0B"
    params: []
  - id: video_mute_status_query
    label: Video Mute Status Query
    kind: query
    command: "B"
    params: []
  - id: hdcp_notification_enable
    label: Enable HDCP Green Screen Notification
    kind: action
    command: "EN1HDCP}"
    params: []
  - id: hdcp_notification_disable
    label: Disable HDCP Green Screen Notification
    kind: action
    command: "EN0HDCP}"
    params: []
  - id: hdcp_notification_view
    label: HDCP Notification Status Query
    kind: query
    command: "ENHDCP}"
    params: []
  - id: audio_gain_set
    label: Set Analog Audio Gain
    kind: action
    command: "X^G"
    params:
      - name: gain
        type: integer
        description: "Gain value (X^ symbol in source). Range 00 to 24. Case-sensitive: uppercase G."
  - id: audio_attenuation_set
    label: Set Analog Audio Attenuation
    kind: action
    command: "X*g"
    params:
      - name: attenuation
        type: integer
        description: "Attenuation value (X* symbol in source). Range 00 to 18. Case-sensitive: lowercase g."
  - id: audio_level_increment
    label: Increment Audio Level 1 dB
    kind: action
    command: "+G"
    params: []
  - id: audio_level_decrement
    label: Decrement Audio Level 1 dB
    kind: action
    command: "-G"
    params: []
  - id: audio_level_show
    label: Show Audio Input Level
    kind: query
    command: "G"
    params: []
  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "X1)*1Z"
    params:
      - name: target
        type: integer
        description: "Audio target (X1) symbol in source). 0 = mute all, 1 = mute DisplayPort, 2 = mute analog."
  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "X1)*0Z"
    params:
      - name: target
        type: integer
        description: "Audio target (X1) symbol in source). 0 = all, 1 = DisplayPort, 2 = analog."
  - id: audio_mute_status_query
    label: Audio Mute Status Query
    kind: query
    command: "X1$Z"
    params:
      - name: target
        type: integer
        description: "Audio output (X1$ symbol in source). 1 = digital, 2 = analog."
  - id: video_bit_depth_auto
    label: Video Bit Depth Follow Input
    kind: action
    command: "EV0BITD}"
    params: []
  - id: video_bit_depth_force_8bit
    label: Video Bit Depth Force 8-bit
    kind: action
    command: "EV1BITD}"
    params: []
  - id: video_bit_depth_view
    label: Video Bit Depth Query
    kind: query
    command: "EVBITD}"
    params: []
  - id: receiver_name_set
    label: Set Receiver Name
    kind: action
    command: "EX1@CN}"
    params:
      - name: name
        type: string
        description: "Receiver name (X1@ symbol in source). Up to 24 alphanumeric characters or hyphen; first char must be a letter; last char cannot be hyphen; no spaces; case-insensitive."
  - id: receiver_name_reset
    label: Reset Receiver Name To Default
    kind: action
    command: "E•CN}"
    params: []
  - id: receiver_name_view
    label: View Receiver Name
    kind: query
    command: "ECN}"
    params: []
  - id: rx_link_status_query
    label: Rx Link Tx-to-Rx Status Query
    kind: query
    command: "2S"
    params: []
  - id: input_video_status_query
    label: Input Video Status Query
    kind: query
    command: "4S"
    params: []
  - id: audio_input_status_query
    label: Audio Input Status Query
    kind: query
    command: "5S"
    params: []
  - id: hdcp_status_query
    label: HDCP Output Encoding Status Query
    kind: query
    command: "6S"
    params: []
  - id: temperature_query
    label: Internal Temperature Query
    kind: query
    command: "20S"
    params: []
  - id: full_status_query
    label: Full Status Query
    kind: query
    command: "I"
    params: []
  - id: firmware_version_query
    label: Firmware Version Query
    kind: query
    command: "Q"
    params: []
  - id: hdcp_output_status_query
    label: HDCP Output Status Request
    kind: query
    command: "EOHDCP}"
    params: []
  - id: part_number_query
    label: Part Number Query
    kind: query
    command: "N"
    params: []
  - id: sfp_status_query
    label: SFP Module Status Query
    kind: query
    command: "40S"
    params: []
  - id: audio_reset
    label: Reset Return Audio Gain And Attenuation
    kind: action
    command: "EZA}"
    params: []
  - id: system_reset
    label: System Reset To Factory Defaults
    kind: action
    command: "EZXXX}"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: video_mute_state
    type: enum
    values:
      - off
      - video_mute
      - video_sync_mute
  - id: hdcp_notification_state
    type: enum
    values:
      - "off"
      - "on"
  - id: audio_level
    type: number
  - id: audio_mute_state
    type: enum
    values:
      - unmuted
      - muted
  - id: video_bit_depth
    type: enum
    values:
      - auto
      - "8-bit"
  - id: rx_link_state
    type: enum
    values:
      - not_detected
      - detected
  - id: input_video_state
    type: enum
    values:
      - not_detected
      - detected
  - id: audio_input_state
    type: enum
    values:
      - not_detected
      - detected
  - id: hdcp_output_state
    type: enum
    values:
      - no_sink
      - hdcp_sink
      - non_hdcp_sink
  - id: internal_temperature
    type: string
  - id: firmware_version
    type: string
  - id: part_number
    type: string
  - id: receiver_name
    type: string
```

<!-- UNRESOLVED: exact response payload formats for each feedback are documented in source using symbol placeholders (X#, X$, X&, X1#, X1%, X1^, X1(, X2#, etc.). Verbatim response strings per query are listed in the Actions section command responses; see source lines 398-491 for full mapping. -->

## Variables
```yaml
variables:
  - id: audio_gain
    type: integer
    unit: dB
    range:
      min: -18
      max: 24
  - id: receiver_name
    type: string
    max_length: 24
```

<!-- UNRESOLVED: analog audio return gain range appears as -18 to +24 dB in 1 dB steps in source, but the receiver Product Configuration Software slide control shows -18 to +10 dB; discrepancy unresolved. -->

## Events
```yaml
events:
  - id: power_on_copyright
    description: "Unit-initiated power-on copyright message. Payload format: (c) Copyright 20nn, Extron Electronics FOX II R DP 4K YY•, Vx.xx, 60-nnnn-xx] where Vx.xx is firmware version, 60-nnnn-xx is part number, YY is SM (singlemode) or MM (multimode)."
  - id: link_video_status_change
    description: "Unit-initiated link/video status change. Payload format: Lnk n•SigI n•Hdcpi y•AudO n•RX] where n=0/1 signal detect, y=0 no sink / 1 HDCP sink / 2 non-HDCP sink."
  - id: hot_plug
    description: "Unit-initiated hot-plug event when DisplayPort connector is plugged or unplugged. Payload: HplgO]"
```

<!-- UNRESOLVED: EDID Minder change message (EdidMdr nn]) is documented for transmitter only; not emitted by receiver. -->

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: no multi-step command sequences documented in source. -->

## Safety
```yaml
confirmation_required_for:
  - system_reset
  - audio_reset
interlocks:
  - id: alarm_port_no_light
    description: "Alarm port pins 1 and 2 are shorted together when no light is detected on the fiber input."
  - id: dual_fiber_required_for_responses
    description: "If only one fiber optic cable is connected, RS-232 or IR reports from the controlled device are not received. Two fiber cables required to receive responses from the controlled device."
```

<!-- UNRESOLVED: no explicit safety warnings, interlock lockouts, or power-on sequencing requirements beyond the physical reset procedures. Physical reset procedures (Mode 1 factory-firmware reset for one power cycle; Mode 5 factory-defaults reset excluding firmware) involve power cycling and are documented in the source but are hardware-initiated, not SIS-controlled. -->

## Notes
- Symbol conventions (shared transmitter/receiver): `]` = CR/LF, `}` = CR (no LF), `|` = pipe (interchangeable with `}`), `•` = hard space, `E` = Escape (hex 1B), `W` interchangeable with `E`. Character `0` is the digit zero; `O` is capital letter o.
- All unit-to-host responses terminate with `]` (CR/LF).
- Set-gain (`G`) and set-attenuation (`g`) commands are case-sensitive; increment/decrement/show are not case-sensitive.
- Error response codes: `E10` invalid command, `E13` invalid parameter, `E14` invalid command for this configuration, `E17` invalid command for signal type, `E22` busy.
- The front-panel Configuration port (mini USB B) and rear Remote RS-232 port share the same serial parameters and SIS command set; both may be active simultaneously.
- RS-232/IR pass-through over fiber supported up to 115200 baud; RS-232 and IR may be active simultaneously.
- DisplayPort cable guideline: do not exceed 6.5 ft (2 m) on the receiver output; use only Extron-supplied high-speed digital cable.
- This spec targets the receiver (FOX II R DP 4K). Transmitter-only commands (EDID Minder resolution set/save, audio input format select, color bars test pattern, HDCP authorized device, transmitter name/status) are excluded as out of family scope but share the same symbol definitions and command/response conventions.

<!-- UNRESOLVED: (1) Exact first-party PDF URL for the FOX II R DP 4K user manual not located — prior attempts probed extron.com/download/files/userman/68-2053-01_*.pdf revision/suffix variants (all 404) and ManualsLib/Mans.io mirrors (none found). Source refined excerpt is from 68-2540-01 Rev. D which covers both T and R units. (2) Firmware version compatibility range not stated. (3) Analog audio gain range discrepancy (-18..+24 SIS vs -18..+10 software slide) unresolved. (4) Protocol version number not stated. -->
````

## Provenance

```yaml
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2540-01_D.pdf
  - https://www.extron.com/download/files/userman/68-2540-50_C_FOXIIDP.pdf
  - https://www.extron.com/product/fox2rdp4k
retrieved_at: 2026-07-02T20:51:05.388Z
last_checked_at: 2026-07-07T11:40:26.131Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:40:26.131Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec receiver commands matched verbatim to source; transport parameters verified; complete coverage of documented receiver SIS command set. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Exact first-party PDF URL not located (see recovery notes); spec derived from refined excerpt of 68-2540-01 Rev. D user guide covering both T and R units."
- "exact response payload formats for each feedback are documented in source using symbol placeholders (X#, X$, X&, X1#, X1%, X1^, X1(, X2#, etc.). Verbatim response strings per query are listed in the Actions section command responses; see source lines 398-491 for full mapping."
- "analog audio return gain range appears as -18 to +24 dB in 1 dB steps in source, but the receiver Product Configuration Software slide control shows -18 to +10 dB; discrepancy unresolved."
- "EDID Minder change message (EdidMdr nn]) is documented for transmitter only; not emitted by receiver."
- "no multi-step command sequences documented in source."
- "no explicit safety warnings, interlock lockouts, or power-on sequencing requirements beyond the physical reset procedures. Physical reset procedures (Mode 1 factory-firmware reset for one power cycle; Mode 5 factory-defaults reset excluding firmware) involve power cycling and are documented in the source but are hardware-initiated, not SIS-controlled."
- "(1) Exact first-party PDF URL for the FOX II R DP 4K user manual not located — prior attempts probed extron.com/download/files/userman/68-2053-01_*.pdf revision/suffix variants (all 404) and ManualsLib/Mans.io mirrors (none found). Source refined excerpt is from 68-2540-01 Rev. D which covers both T and R units. (2) Firmware version compatibility range not stated. (3) Analog audio gain range discrepancy (-18..+24 SIS vs -18..+10 software slide) unresolved. (4) Protocol version number not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
