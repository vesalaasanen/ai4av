---
spec_id: admin/extron-da-hd-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DA HD 4K Series Control Spec"
manufacturer: Extron
model_family: "DA2 HD 4K"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DA2 HD 4K"
    - "DA4 HD 4K"
    - "DA6 HD 4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - archive.org
source_urls:
  - https://media.extron.com/public/download/files/userman/da_hd_4k_series_68-2636-01_D.pdf
  - https://www.extron.com/download/files/userman/DTP_HD_DA_4K_68-2545-01_I.pdf
  - https://www.extron.com/download/files/userman/da_hd_4k_plus_68-2880-01_J.pdf
  - https://www.manua.ls/extron/da-hd-4k/manual
  - https://archive.org/download/manualsonline-id-9caf8c39-8046-4f5c-8f0e-9d37e6e941df/9caf8c39-8046-4f5c-8f0e-9d37e6e941df.pdf
retrieved_at: 2026-06-12T18:44:53.601Z
last_checked_at: 2026-06-12T19:17:33.536Z
generated_at: 2026-06-12T19:17:33.536Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "product is retired on Extron's site; no current firmware version range published in this excerpt"
  - "source describes \"unsolicited\" signal/HDCP status responses, but"
  - "no multi-step command sequences documented in source"
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "firmware version range, maximum sink count for user-EDID capture beyond slots 64/65, and any commands not present in this excerpt are not populated."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:17:33.536Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec action commands matched literals in source command table; transport (9600 baud, 8 data bits, 1 stop, no parity) verified; full coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Extron DA HD 4K Series Control Spec

## Summary

The Extron DA HD 4K Series (DA2 HD 4K, DA4 HD 4K, DA6 HD 4K) is a one-input HDMI distribution amplifier family. This spec covers the RS-232 / front-panel USB SIS (Simple Instruction Set) control protocol used to configure video mute, audio mute, color bit depth, TMDS output format, HDCP behavior, EDID Minder assignment, verbose mode, and unit identification.

<!-- UNRESOLVED: product is retired on Extron's site; no current firmware version range published in this excerpt -->

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
  electrical: rs232
  connector_options:
    - rear_panel_3pole_captive_screw  # Tx, Rx, G
    - front_panel_usb_mini_b          # config port, same SIS dialect
  notes: |
    Only one of the two physical ports may be active at a time.
    Front USB recommended for temporary connections; rear RS-232 for permanent.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred: many ?/status queries documented
- levelable       # inferred: per-output mute / format / bit-depth / HDCP mode
- routable        # inferred: TMDS output format and HDCP output mode act as per-output routing
```

## Actions
```yaml
# Power-on banner (informational; not an action - see Feedbacks)
# Banner:  (c) Copyright 2015, Extron Electronics DA HD 4K Series, Vx.xx, <part#>

- id: set_video_mute_output
  label: Set Video Mute (per output)
  kind: action
  command: "Esc X! * X1@ B"          # Esc = W or E in Extron dialect
  params:
    - name: output
      type: integer
      description: "Output number (1..2 DA2, 1..4 DA4, 1..6 DA6)"
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=disabled, 1=video mute (TMDS), 2=video and sync mute"

- id: set_video_mute_all
  label: Set Video Mute (all outputs)
  kind: action
  command: "Esc X1@ B"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]

- id: query_video_mute
  label: Query Video Mute (all outputs)
  kind: query
  command: "Esc B"
  params: []

- id: set_audio_mute_output
  label: Set Audio Mute (per output)
  kind: action
  command: "Esc X! * X@ Z"
  params:
    - name: output
      type: integer
      description: "Output number (1..2/4/6 per model)"
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=disabled, 1=enabled"

- id: set_audio_mute_all
  label: Set Audio Mute (all outputs)
  kind: action
  command: "Esc X@ Z"
  params:
    - name: state
      type: integer
      enum: [0, 1]

- id: query_audio_mute
  label: Query Audio Mute (all outputs)
  kind: query
  command: "Esc Z"
  params: []

- id: set_color_bit_depth_output
  label: Set Video Color Bit Depth (per output)
  kind: action
  command: "Esc V X! * X#"
  params:
    - name: output
      type: integer
    - name: depth
      type: integer
      enum: [0, 1]
      description: "0=auto (EDID-based), 1=force 8-bit"

- id: set_color_bit_depth_all
  label: Set Video Color Bit Depth (all outputs)
  kind: action
  command: "Esc V X#"
  params:
    - name: depth
      type: integer
      enum: [0, 1]

- id: query_color_bit_depth
  label: Query Video Color Bit Depth
  kind: query
  command: "Esc VBITD }"
  params: []

- id: set_tmds_output_format_output
  label: Set TMDS Output Format (per output)
  kind: action
  command: "Esc X! * X1!"
  params:
    - name: output
      type: integer
    - name: format
      type: integer
      enum: [0, 1, 2, 3, 5, 7]
      description: "0=Auto, 1=DVI RGB 444, 2=HDMI RGB Full, 3=HDMI RGB Limited, 5=HDMI YUV 444 Limited, 7=HDMI YUV 422 Limited"

- id: set_tmds_output_format_all
  label: Set TMDS Output Format (all outputs)
  kind: action
  command: "Esc X1!"
  params:
    - name: format
      type: integer
      enum: [0, 1, 2, 3, 5, 7]

- id: query_tmds_output_format
  label: Query TMDS Output Format
  kind: query
  command: "Esc VTPO }"
  params: []

- id: set_hdcp_authorization
  label: Enable/Disable HDCP Authorization
  kind: action
  command: "Esc E X@"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=disabled, 1=enabled (default)"

- id: query_hdcp_authorization
  label: Query HDCP Authorization Status
  kind: query
  command: "Esc EHDCP }"
  params: []

- id: set_hdcp_output_mode_output
  label: Set HDCP Output Mode (per output)
  kind: action
  command: "Esc S X! * X("
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: |
        0 = Encrypt as required by input (continuous HDMI, 10s DVI)
        1 = Always encrypt (continuous HDMI, 10s DVI)
        2 = Encrypt as required, continuous HDMI+DVI
        3 = Always encrypt, continuous HDMI+DVI

- id: set_hdcp_output_mode_all
  label: Set HDCP Output Mode (all outputs)
  kind: action
  command: "Esc S X("
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]

- id: query_hdcp_output_mode
  label: Query HDCP Output Mode
  kind: query
  command: "Esc SHDCP }"
  params: []

- id: request_signal_status
  label: Request Signal Status (per output)
  kind: query
  command: "Esc LS }"
  params: []

- id: request_hdcp_status
  label: Request HDCP Status (per output)
  kind: query
  command: "Esc HDCP }"
  params: []

- id: assign_edid
  label: Assign EDID from EDID Memory Slot
  kind: action
  command: "Esc A X$"
  params:
    - name: slot
      type: integer
      description: "EDID memory location (see EDID Minder slot table)"

- id: query_assigned_edid
  label: Query Currently Assigned EDID
  kind: query
  command: "Esc AEDID }"
  params: []

- id: store_output_edid
  label: Store Output EDID into User Slot
  kind: action
  command: "Esc S X! * X$"
  params:
    - name: output
      type: integer
      description: "Source output whose EDID is being captured (typically 13-18, see table)"
    - name: slot
      type: integer
      enum: [64, 65]
      description: "User-loadable EDID memory slot"

- id: read_edid_hex
  label: Read EDID as 256-byte Hex Text
  kind: query
  command: "Esc REDID }"
  params: []

- id: query_edid_native_resolution
  label: Query Native Resolution of Assigned EDID
  kind: query
  command: "Esc NEDID }"
  params: []

- id: set_verbose_mode
  label: Set Verbose Response Mode
  kind: action
  command: "Esc X1)"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Clear, 1=Verbose, 2=Tagged queries, 3=Verbose+Tagged"

- id: query_verbose_mode
  label: Query Verbose Mode
  kind: query
  command: "Esc CV }"
  params: []

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "Esc X*"
  params:
    - name: name
      type: string
      description: "Up to 24 chars; alphanumeric + hyphen; first char letter, last char not hyphen"

- id: query_unit_name
  label: Query Unit Name
  kind: query
  command: "Esc CN }"
  params: []

- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []

- id: query_firmware_version
  label: Query Firmware Build
  kind: query
  command: "Q"
  params: []

- id: reset_unit
  label: Reset Unit (Zap)
  kind: action
  command: "Esc ZXXX }"
  params: []
```

## Feedbacks
```yaml
- id: power_on_banner
  type: string
  description: |
    Sent on power-up. Format:
      (c) Copyright 2015, Extron Electronics DA HD 4K Series, V<x.xx>, <part#>
    Terminated with CR/LF. Part number identifies model: 60-1480-01 (DA2), 60-1481-01 (DA4), 60-1482-01 (DA6).

- id: video_mute_state
  type: enum
  values: [disabled, video_mute, video_and_sync_mute]

- id: audio_mute_state
  type: enum
  values: [disabled, enabled]

- id: color_bit_depth_state
  type: enum
  values: [auto, force_8bit]

- id: tmds_output_format_state
  type: enum
  values: [auto, dvi_rgb_444, hdmi_rgb_full, hdmi_rgb_limited, hdmi_yuv_444_limited, hdmi_yuv_422_limited]

- id: hdcp_authorization_state
  type: enum
  values: [disabled, enabled]

- id: hdcp_output_mode_state
  type: enum
  values: [follow_input, always_encrypt, follow_input_continuous_dvi, always_encrypt_continuous_dvi]

- id: signal_status
  type: enum
  values: [undetected, detected]

- id: edid_slot
  type: integer
  description: 0..65; factory slots 1..12, captured-output slots 13..18, user slots 19,20,64,65

- id: firmware_build
  type: string
  description: "Firmware build to two decimal places, e.g. 1.23"

- id: part_number
  type: string
  values: ["60-1480-01", "60-1481-01", "60-1482-01"]
```

## Variables
```yaml
# No continuously variable settable parameters (volume/gain/brightness) are
# documented in this source. All values are enumerated discrete settings.
```

## Events
```yaml
# UNRESOLVED: source describes "unsolicited" signal/HDCP status responses, but
# does not specify the trigger conditions or unsolicited push model. Treat as
# query-only (action-triggered) for now.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements documented in this excerpt. Source notes that HDCP failure on a
# non-compliant sink yields a green screen on that output channel, but this is
# a behavior note, not an interlock.
```

## Notes

- **Port exclusivity:** the rear-panel 3-pole RS-232 captive-screw port and the front-panel mini-USB Config port share a single logical serial channel. Disconnect the other when configuring over one.
- **Cable wiring:** Tx↔Rx crossover, ground-to-ground. If shielded cable with drain wire is used, tie the drain to ground at both ends.
- **Electrical note:** each HDMI output carries +5 VDC up to 250 mA on pin 18, current-limited. Source-stated; included here for reference, not as a control spec.
- **HDCP caveat:** device is a repeater for HDCP key negotiation but does NOT report itself as a repeater nor forward a KSV list.
- **Audio behavior:** if a connected sink does not support the input audio format, that output's audio is muted (not the entire unit).
- **Default EDID:** 720p @ 60 Hz with 2-channel audio (slot 9).
- **EDID retention:** assigned EDID is held in EEPROM at the HDMI input and survives power cycles; reset clears it.
- **HPD behavior:** HPD is held high on all inputs while powered; it drops low only during EDID update.
- **SIS escape character:** the `Esc` placeholder used in command templates above is `W` or `E` (Extron SIS escape) — either is accepted.
- **CR/LF:** all responses terminate with CR/LF; CR alone (`|`) is also accepted as a response terminator.
- **Product status:** the DA HD 4K Series is marked retired on Extron's site; the suggested replacement is the DA HD 4K PLUS Series (covered by a separate spec family).

<!-- UNRESOLVED: firmware version range, maximum sink count for user-EDID capture beyond slots 64/65, and any commands not present in this excerpt are not populated. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - archive.org
source_urls:
  - https://media.extron.com/public/download/files/userman/da_hd_4k_series_68-2636-01_D.pdf
  - https://www.extron.com/download/files/userman/DTP_HD_DA_4K_68-2545-01_I.pdf
  - https://www.extron.com/download/files/userman/da_hd_4k_plus_68-2880-01_J.pdf
  - https://www.manua.ls/extron/da-hd-4k/manual
  - https://archive.org/download/manualsonline-id-9caf8c39-8046-4f5c-8f0e-9d37e6e941df/9caf8c39-8046-4f5c-8f0e-9d37e6e941df.pdf
retrieved_at: 2026-06-12T18:44:53.601Z
last_checked_at: 2026-06-12T19:17:33.536Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:17:33.536Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec action commands matched literals in source command table; transport (9600 baud, 8 data bits, 1 stop, no parity) verified; full coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product is retired on Extron's site; no current firmware version range published in this excerpt"
- "source describes \"unsolicited\" signal/HDCP status responses, but"
- "no multi-step command sequences documented in source"
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "firmware version range, maximum sink count for user-EDID capture beyond slots 64/65, and any commands not present in this excerpt are not populated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
