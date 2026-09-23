---
spec_id: admin/vaddio-wallview-hd18-hd19-hd20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio WallVIEW HD18 HD19 HD20 Control Spec"
manufacturer: Vaddio
model_family: "ClearVIEW HD-18"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ClearVIEW HD-18"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - res.cloudinary.com
  - manualshelf.com
  - fullcompass.com
source_urls:
  - "https://web.archive.org/web/20130516083824/http://www.vaddio.com/images/downloads/HD-18%20Command%20List%209-10-09.pdf"
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/998-6900-007_Manual.pdf"
  - https://www.manualshelf.com/manual/vaddio/wallview-ccu-hd-19/user-guide-english.html
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Vaddio_ClearVIEW_HD-20_Manual.pdf"
retrieved_at: 2026-09-05T00:13:44.799Z
last_checked_at: 2026-09-22T11:49:37.052Z
generated_at: 2026-09-22T11:49:37.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled \"ClearVIEW HD-18 Command List\"; explicit confirmation that HD-19/HD-20 share this command set is not in the source text. Model list populated from source title only."
  - "VISCA-like protocols commonly emit completion/error socket"
  - "source contains no safety warnings, interlock procedures, or"
  - "no TCP/IP control documented; RS-232 only per this source."
  - "firmware version compatibility not stated in source."
  - "HD-19 / HD-20 model applicability not stated in source text."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:49:37.052Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 75 command rows and 20 inquiry rows from source appear verbatim in spec; transport parameters all match. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-05
---

# Vaddio WallVIEW HD18 HD19 HD20 Control Spec

## Summary
RS-232 control protocol for the Vaddio ClearVIEW HD-18 camera (the camera module used in the WallVIEW HD-18 family). Protocol is VISCA-like — "similar, but not identical to the Sony VISCA command set" — carried over an RJ-45 RS-232 port at 9600 bps 8N1, no flow control. Covers power, zoom, focus, white balance, gain/iris, presets, pan/tilt drive, tally, and image enhancement commands plus a full inquiry (query) set.

<!-- UNRESOLVED: source document is titled "ClearVIEW HD-18 Command List"; explicit confirmation that HD-19/HD-20 share this command set is not in the source text. Model list populated from source title only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated as "(default)"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "No Flow control"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (CAM_Power On/Off commands)
# - queryable    (full inquiry command list)
# - levelable    (gain, iris, aperture, gamma, chroma, knee direct-set commands)
traits:
  - powerable   # inferred from CAM_Power command examples
  - queryable   # inferred from inquiry command examples
  - levelable   # inferred from gain/iris/aperture/enhancement set commands
```

## Actions
```yaml
# Protocol: VISCA-like hex byte sequences over RS-232, terminated with FF.
# "8x" header: x = camera address (source notation kept verbatim).
# Hex strings copied verbatim from source, including apparent source typos
# (noted in Notes). Parameterized nibbles shown as in source (p, q, r, s, V, WW, VV, etc.).
actions:
  # --- System ---
  - id: address_set
    label: Address Set (Broadcast)
    kind: action
    command: "88 30 01 FF"
    params: []
  - id: if_clear
    label: Interface Clear (Broadcast)
    kind: action
    command: "88 01 00 01 FF"
    params: []
  - id: command_cancel
    label: Command Cancel
    kind: action
    command: "8x 2p FF"
    params:
      - name: p
        type: integer
        description: "Socket number (1 to 2)"

  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "8x 01 04 00 02 FF"
    params: []
  - id: power_off
    label: Power Off
    kind: action
    command: "8x 01 04 00 03 FF"
    params: []

  # --- Zoom ---
  - id: zoom_stop
    label: Zoom Stop
    kind: action
    command: "8x 01 04 07 00 FF"
    params: []
  - id: zoom_tele_standard
    label: Zoom Tele (Standard)
    kind: action
    command: "8x 01 04 07 02 FF"
    params: []
  - id: zoom_wide_standard
    label: Zoom Wide (Standard)
    kind: action
    command: "8x 01 04 07 03 FF"
    params: []
  - id: zoom_tele_variable
    label: Zoom Tele (Variable)
    kind: action
    command: "8x 01 04 07 2p FF"
    params:
      - name: p
        type: integer
        description: "Speed, 0 (Slow) to 7 (Fast)"
  - id: zoom_wide_variable
    label: Zoom Wide (Variable)
    kind: action
    command: "8x 01 04 07 3p FF"
    params:
      - name: p
        type: integer
        description: "Speed, 0 (Slow) to 7 (Fast)"
  - id: zoom_direct
    label: Zoom Direct (Absolute)
    kind: action
    command: "8x 01 04 47 0p 0q 0r 0s FF"
    params:
      - name: pqrs
        type: string
        description: "Zoom position, 4 hex nibbles (see zoom position inquiry for range)"
  - id: zoom_direct_variable
    label: Zoom Direct (Variable Speed)
    kind: action
    command: "8x 01 7E 01 4A 0V 0p0q0r 0s FF"
    params:
      - name: V
        type: integer
        description: "Speed, 0-7"
      - name: pqrs
        type: string
        description: "Zoom position, 4 hex nibbles"

  # --- Focus ---
  - id: focus_stop
    label: Focus Stop
    kind: action
    command: "8x 01 04 08 00 FF"
    params: []
  - id: focus_far_standard
    label: Focus Far (Standard)
    kind: action
    command: "8x 01 04 08 02 FF"
    params: []
  - id: focus_near_standard
    label: Focus Near (Standard)
    kind: action
    command: "8x 01 04 08 03 FF"
    params: []
  - id: focus_far_variable
    label: Focus Far (Variable)
    kind: action
    command: "8x 01 04 08 2p FF"
    params:
      - name: p
        type: integer
        description: "Speed, 0 (Slow) to 7 (Fast)"
  - id: focus_near_variable
    label: Focus Near (Variable)
    kind: action
    command: "8x 01 04 08 3p FF"
    params:
      - name: p
        type: integer
        description: "Speed, 0 (Slow) to 7 (Fast)"
  - id: autofocus_on
    label: Auto Focus
    kind: action
    command: "8x 01 04 38 02 FF"
    params: []
  - id: manual_focus_on
    label: Manual Focus
    kind: action
    command: "8x 01 04 38 03 FF"
    params: []
  - id: focus_auto_manual_toggle
    label: Focus Auto/Manual Toggle
    kind: action
    command: "8x 01 04 38 10 FF"
    params: []

  # --- White Balance ---
  - id: wb_auto
    label: White Balance Auto
    kind: action
    command: "8x 01 04 35 00 FF"
    params: []
  - id: wb_manual
    label: White Balance Manual
    kind: action
    command: "8x 01 04 35 05 FF"
    params: []

  # --- Red Gain ---
  - id: r_gain_reset
    label: Red Gain Reset
    kind: action
    command: "8x 01 04 03 00 FF"
    params: []
  - id: r_gain_up
    label: Red Gain Up
    kind: action
    command: "8x 01 04 03 02 FF"
    params: []
  - id: r_gain_down
    label: Red Gain Down
    kind: action
    command: "81 01 04 03 03 FF"
    params: []
  - id: r_gain_direct
    label: Red Gain Direct
    kind: action
    command: "81 01 04 43 00 0p0q0r FF"
    params:
      - name: pqr
        type: string
        description: "Red gain, 000-1FF (3 hex nibbles)"

  # --- Blue Gain ---
  - id: b_gain_reset
    label: Blue Gain Reset
    kind: action
    command: "8x 01 04 04 00 FF"
    params: []
  - id: b_gain_up
    label: Blue Gain Up
    kind: action
    command: "8x 01 04 04 02 FF"
    params: []
  - id: b_gain_down
    label: Blue Gain Down
    kind: action
    command: "81 01 04 04 03 FF"
    params: []
  - id: b_gain_direct
    label: Blue Gain Direct
    kind: action
    command: "81 01 04 44 00 0p0q0r FF"
    params:
      - name: pqr
        type: string
        description: "Blue gain, 000-1FF (3 hex nibbles)"

  # --- Auto Exposure / Iris / Gain ---
  - id: ae_full_auto
    label: Auto Exposure Full Auto
    kind: action
    command: "81 01 04 39 00 FF"
    params: []
  - id: ae_manual
    label: Auto Exposure Manual Control Mode
    kind: action
    command: "81 01 04 39 03 FF"
    params: []
  - id: iris_reset
    label: Iris Reset
    kind: action
    command: "81 01 04 0B 00 FF"
    params: []
  - id: iris_up
    label: Iris Up
    kind: action
    command: "81 01 04 0B 02 FF"
    params: []
  - id: iris_down
    label: Iris Down
    kind: action
    command: "81 01 04 0B 03 FF"
    params: []
  - id: iris_direct
    label: Iris Direct
    kind: action
    command: "81 01 04 4B 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Iris value, 0x00-0x11 (2 hex nibbles)"
  - id: gain_reset
    label: Gain Reset
    kind: action
    command: "81 01 04 0C 00 FF"
    params: []
  - id: gain_up
    label: Gain Up
    kind: action
    command: "81 01 04 0C 02 FF"
    params: []
  - id: gain_down
    label: Gain Down
    kind: action
    command: "81 01 04 0C 03 FF"
    params: []
  - id: gain_direct
    label: Gain Direct
    kind: action
    command: "81 01 04 4C 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Gain value, 0x00-0x1E (2 hex nibbles)"

  # --- Backlight / Aperture ---
  - id: backlight_on
    label: Backlight On
    kind: action
    command: "81 01 04 33 02 FF"
    params: []
  - id: backlight_off
    label: Backlight Off
    kind: action
    command: "81 01 04 33 03 FF"
    params: []
  - id: aperture_reset
    label: Aperture Reset
    kind: action
    command: "81 01 04 02 00 FF"
    params: []
  - id: aperture_up
    label: Aperture Up
    kind: action
    command: "81 01 04 02 02 FF"
    params: []
  - id: aperture_down
    label: Aperture Down
    kind: action
    command: "81 01 04 02 03 FF"
    params: []
  - id: aperture_direct
    label: Aperture Direct
    kind: action
    command: "81 01 04 42 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Aperture value, 0x00-0x3F (2 hex nibbles)"

  # --- Preset Memory ---
  - id: memory_reset
    label: Preset Memory Reset
    kind: action
    command: "81 01 04 3F 00 0p FF"
    params:
      - name: p
        type: string
        description: "Memory number, 0-0xF (1 hex nibble)"
  - id: memory_set
    label: Preset Memory Set
    kind: action
    command: "81 01 04 3F 01 0p FF"
    params:
      - name: p
        type: string
        description: "Memory number, 0-0xF (1 hex nibble)"
  - id: memory_recall
    label: Preset Memory Recall
    kind: action
    command: "81 01 04 3F 02 0p FF"
    params:
      - name: p
        type: string
        description: "Memory number, 0-0xF (1 hex nibble)"

  # --- Camera ID ---
  - id: camera_id_write
    label: Camera ID Write
    kind: action
    command: "81 01 04 22 0p 0q 0r 0s FF"
    params:
      - name: pqrs
        type: string
        description: "Camera ID, 0000-FFFF (4 hex nibbles)"

  # --- IR Receive ---
  - id: ir_receive_on
    label: IR Receive On
    kind: action
    command: "81 01 06 08 02 FF"
    params: []
  - id: ir_receive_off
    label: IR Receive Off
    kind: action
    command: "81 01 06 08 03 FF"
    params: []
  - id: ir_receive_toggle
    label: IR Receive On/Off Toggle
    kind: action
    command: "81 01 06 08 10 FF"
    params: []
  - id: ir_receive_return_on
    label: IR Receive Return On
    kind: action
    command: "81 01 7D 01 03 00 00 FF"
    params: []
  - id: ir_receive_return_off
    label: IR Receive Return Off
    kind: action
    command: "81 01 7D 01 13 00 00 FF"
    params: []

  # --- Pan/Tilt Drive ---
  - id: ptz_up
    label: Pan-Tilt Up
    kind: action
    command: "81 01 06 01 VV WW 03 01 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_down
    label: Pan-Tilt Down
    kind: action
    command: "81 01 06 01 VV WW 03 02 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_left
    label: Pan-Tilt Left
    kind: action
    command: "81 01 06 01 VV WW 01 03 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_right
    label: Pan-Tilt Right
    kind: action
    command: "81 01 06 01 VV WW 02 03 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_up_left
    label: Pan-Tilt Up-Left
    kind: action
    command: "81 01 06 01 VV WW 01 01 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_up_right
    label: Pan-Tilt Up-Right
    kind: action
    command: "81 01 06 01 VV WW 02 01 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_down_left
    label: Pan-Tilt Down-Left
    kind: action
    command: "81 01 06 01 VV WW 01 02 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_down_right
    label: Pan-Tilt Down-Right
    kind: action
    command: "81 01 06 01 VV WW 02 02 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_stop
    label: Pan-Tilt Stop
    kind: action
    command: "81 01 06 01 VV WW 03 03 FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
  - id: ptz_absolute_position
    label: Pan-Tilt Absolute Position
    kind: action
    command: "81 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
    params:
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
      - name: YYYY
        type: string
        description: "Pan position (4 hex nibbles); range defined in inquiry list"
      - name: ZZZZ
        type: string
        description: "Tilt position (4 hex nibbles); range defined in inquiry list"
  - id: ptz_home
    label: Pan-Tilt Home
    kind: action
    command: "81 01 06 04 FF"
    params: []
  - id: ptz_reset
    label: Pan-Tilt Reset
    kind: action
    command: "81 01 06 05 FF"
    params: []

  # --- Tally ---
  - id: tally_on
    label: Tally On
    kind: action
    command: "81 01 7E 01 0A 00 02 FF"
    params: []
  - id: tally_off
    label: Tally Off
    kind: action
    command: "81 01 7E 01 0A 00 03 FF"
    params: []

  # --- Preset Speed / Motor Config ---
  - id: preset_speed_set
    label: Preset Pan/Tilt Speed Set
    kind: action
    command: "81 01 7E 01 0B WW VV ZZ FF"
    params:
      - name: WW
        type: string
        description: "Pan speed, 0x01-0x18"
      - name: VV
        type: string
        description: "Tilt speed, 0x01-0x14"
      - name: ZZ
        type: integer
        description: "Zoom speed, 0-7"
  - id: motor_config_hard_stops
    label: Motor Config Hard Motor Stops
    kind: action
    command: "81 01 7E 01 70 00 00 FF"
    params: []
  - id: motor_config_soft_stops
    label: Motor Config Soft Motor Stops
    kind: action
    command: "81 01 7E 01 70 00 01 FF"
    params: []

  # --- Image Enhancement ---
  - id: black_level_set
    label: Black Level (Pedestal) Set
    kind: action
    command: "81 01 7E 53 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Black level, 0x01-0xFD (2 hex nibbles)"
  - id: gamma_set
    label: Gamma Set
    kind: action
    command: "81 01 7E 54 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Gamma, 0x00-0x8F (2 hex nibbles)"
  - id: chroma_set
    label: Chroma Set
    kind: action
    command: "81 01 7E 55 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Chroma, 0x08-0x1F (2 hex nibbles)"
  - id: knee_set
    label: Knee Set
    kind: action
    command: "81 01 7E 55 00 00 0p0q FF"
    params:
      - name: pq
        type: string
        description: "Knee, 0x00-0x7F (2 hex nibbles); NOTE packet in source duplicates Chroma packet (byte 55) - kept verbatim"

  # --- Inquiry (query) commands ---
  - id: power_query
    label: Power Status Query
    kind: query
    command: "8x 09 04 00 FF"
    params: []
  - id: zoom_position_query
    label: Zoom Position Query
    kind: query
    command: "8x 09 04 47 FF"
    params: []
  - id: wb_mode_query
    label: White Balance Mode Query
    kind: query
    command: "8x 09 04 35 FF"
    params: []
  - id: r_gain_query
    label: Red Gain Query
    kind: query
    command: "8x 09 04 43 FF"
    params: []
  - id: b_gain_query
    label: Blue Gain Query
    kind: query
    command: "8x 09 04 44 FF"
    params: []
  - id: ae_mode_query
    label: Auto Exposure Mode Query
    kind: query
    command: "8x 09 04 39 FF"
    params: []
  - id: iris_query
    label: Iris Query
    kind: query
    command: "81 09 04 4B FF"
    params: []
  - id: gain_query
    label: Gain Query
    kind: query
    command: "81 09 04 4C FF"
    params: []
  - id: backlight_mode_query
    label: Backlight Mode Query
    kind: query
    command: "81 09 04 33 FF"
    params: []
  - id: aperture_query
    label: Aperture Query
    kind: query
    command: "81 09 04 42 FF"
    params: []
  - id: memory_query
    label: Preset Memory Query
    kind: query
    command: "81 09 04 3F FF"
    params: []
  - id: camera_id_query
    label: Camera ID Query
    kind: query
    command: "81 09 04 3F FF"
    params: []  # NOTE: source lists same packet as MemoryInq; response differs (see Feedbacks)
  - id: ir_receive_query
    label: IR Receive Query
    kind: query
    command: "81 09 06 08 FF"
    params: []
  - id: pan_tilt_max_speed_query
    label: Pan-Tilt Max Speed Query
    kind: query
    command: "81 09 06 11 FF"
    params: []
  - id: pan_tilt_position_query
    label: Pan-Tilt Position Query
    kind: query
    command: "81 09 06 12 FF"
    params: []
  - id: tally_query
    label: Tally Query
    kind: query
    command: "81 09 7E 01 0A FF"
    params: []
  - id: preset_speed_query
    label: Preset Speed Query
    kind: query
    command: "81 09 7E 01 0B FF"
    params: []
  - id: motor_config_query
    label: Motor Config Query
    kind: query
    command: "81 09 7E 01 70 FF"
    params: []
  - id: black_level_query
    label: Black Level Query
    kind: query
    command: "81 01 7E 53 FF"
    params: []  # NOTE: source uses 01 not 09 in class byte - kept verbatim
  - id: gamma_query
    label: Gamma Query
    kind: query
    command: "81 01 7E 54 FF"
    params: []  # NOTE: source uses 01 not 09 in class byte - kept verbatim
  - id: chroma_query
    label: Chroma Query
    kind: query
    command: "81 01 7E 55 FF"
    params: []  # NOTE: source uses 01 not 09 in class byte - kept verbatim
  - id: knee_query
    label: Knee Query
    kind: query
    command: "81 01 7E 56 FF"
    params: []  # NOTE: source uses 01 not 09 in class byte - kept verbatim
```

## Feedbacks
```yaml
# Response prefix "y0 50" per source notation (y = response address nibble).
# Response packets verbatim from the HD-18 Inquiry List.
feedbacks:
  - id: power_state
    type: enum
    query: power_query
    values:
      - { value: "y0 50 02 FF", label: "on" }
      - { value: "y0 50 03 FF", label: "off (standby)" }
  - id: zoom_position
    type: integer
    query: zoom_position_query
    response_format: "y0 50 0p0q0r 0s FF"
    description: "Zoom position, 4 hex nibbles pqrs"
  - id: wb_mode
    type: enum
    query: wb_mode_query
    values:
      - { value: "y0 50 00 FF", label: "auto" }
      - { value: "y0 50 05 FF", label: "manual" }
  - id: r_gain
    type: integer
    query: r_gain_query
    response_format: "y0 50 00 0p0q0r FF"
    description: "Red gain, 000-1FF"
  - id: b_gain
    type: integer
    query: b_gain_query
    response_format: "y0 50 00 0p0q0r FF"
    description: "Blue gain, 000-1FF"
  - id: ae_mode
    type: enum
    query: ae_mode_query
    values:
      - { value: "y0 50 00 FF", label: "auto exposure mode" }
      - { value: "y0 50 03 FF", label: "manual control mode" }
  - id: iris
    type: integer
    query: iris_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Iris, 0x00-0x11"
  - id: gain
    type: integer
    query: gain_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Gain, 0x00-0x1E"
  - id: backlight_mode
    type: enum
    query: backlight_mode_query
    values:
      - { value: "y0 50 02 FF", label: "on" }
      - { value: "y0 50 03 FF", label: "off" }
  - id: aperture
    type: integer
    query: aperture_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Aperture, 0x00-0x3F"
  - id: memory
    type: integer
    query: memory_query
    response_format: "y0 50 0p FF"
    description: "Memory number, 0-0xF"
  - id: camera_id
    type: integer
    query: camera_id_query
    response_format: "y0 50 0p0q0r 0s FF"
    description: "Camera ID, 0000-FFFF"
  - id: ir_receive_state
    type: enum
    query: ir_receive_query
    values:
      - { value: "y0 50 02 FF", label: "on" }
      - { value: "y0 50 03 FF", label: "off" }
  - id: pan_tilt_max_speed
    type: string
    query: pan_tilt_max_speed_query
    response_format: "y0 50 WW VV FF"
    description: "WW pan speed (0x01-0x18), VV tilt speed (0x01-0x14)"
  - id: pan_tilt_position
    type: string
    query: pan_tilt_position_query
    response_format: "y0 50 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
    description: "YYYY pan, ZZZZ tilt positions"
  - id: tally_state
    type: enum
    query: tally_query
    values:
      - { value: "y0 50 02 FF", label: "on" }
      - { value: "y0 50 03 FF", label: "off" }
  - id: preset_speed
    type: string
    query: preset_speed_query
    response_format: "y0 50 WW VV ZZ FF"
    description: "WW pan (0x01-0x18), VV tilt (0x01-0x14), ZZ zoom (0-7)"
  - id: motor_config
    type: enum
    query: motor_config_query
    values:
      - { value: "y0 50 00 FF", label: "hard motor stops" }
      - { value: "y0 50 01 FF", label: "soft motor stops" }
  - id: black_level
    type: integer
    query: black_level_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Black level, 0x01-0xFD"
  - id: gamma
    type: integer
    query: gamma_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Gamma, 0x00-0x8F"
  - id: chroma
    type: integer
    query: chroma_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Chroma, 0x08-0x1F"
  - id: knee
    type: integer
    query: knee_query
    response_format: "y0 50 00 00 0p0q FF"
    description: "Knee, 0x00-0x7F"
```

## Variables
```yaml
# All settable parameters in this source are exposed as discrete direct-set
# commands (see Actions: iris_direct, gain_direct, r_gain_direct, b_gain_direct,
# aperture_direct, black_level_set, gamma_set, chroma_set, knee_set).
# No separate non-command variables documented.
variables: []
```

## Events
```yaml
# No unsolicited notification messages documented in source.
# UNRESOLVED: VISCA-like protocols commonly emit completion/error socket
# acknowledgements, but this source documents none.
events: []
```

## Macros
```yaml
# No multi-step sequences documented in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Protocol is "similar, but not identical to the Sony VISCA command set"; not all VISCA commands supported, and many HD-18-specific commands exist. Some commands in other VISCA dialects (e.g. focus one-push) may not work.
- RJ-45 RS-232 pinout per source: pin 3 = IR Out (TTL), pin 4/5 = IR differential pair to HD-18 Quick-Connect, pin 6 = IR ground, pin 7 = RXD (from TXD of control source), pin 8 = TXD (to RXD of control source). Pins 1, 2 unused.
- Header notation: commands written `8x` are address-parameterized (x = camera address); response prefix written `y0 50` in the inquiry list. Hardcoded `81` headers in some rows kept verbatim from source.
- Pan range: 8044 – 7FBC (-32,700 to +32,700). Tilt range: E891 – 4C2B (-5,999 to +19,499). Source notes actual pan/tilt ranges are defined in the inquiry list, and ranges marked `+` are "supported in future release".
- Source anomalies kept verbatim, flagged for verification against device: (1) KNE.Enhance command packet uses byte `55`, identical to CRM.Enhance — likely should be `56`; (2) CAM_IDInq packet `81 09 04 3F FF` duplicates CAM_MemoryInq; (3) BLK/GMA/CRM/KNE inquiry rows use class byte `01` instead of `09` used by all other inquiries; (4) KNE range printed "0x0-07F".
- No acknowledgment/error response packets (other than inquiry replies) documented in source.
<!-- UNRESOLVED: no TCP/IP control documented; RS-232 only per this source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: HD-19 / HD-20 model applicability not stated in source text. -->
````

## Provenance

```yaml
source_domains:
  - web.archive.org
  - res.cloudinary.com
  - manualshelf.com
  - fullcompass.com
source_urls:
  - "https://web.archive.org/web/20130516083824/http://www.vaddio.com/images/downloads/HD-18%20Command%20List%209-10-09.pdf"
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/998-6900-007_Manual.pdf"
  - https://www.manualshelf.com/manual/vaddio/wallview-ccu-hd-19/user-guide-english.html
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Vaddio_ClearVIEW_HD-20_Manual.pdf"
retrieved_at: 2026-09-05T00:13:44.799Z
last_checked_at: 2026-09-22T11:49:37.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:49:37.052Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 75 command rows and 20 inquiry rows from source appear verbatim in spec; transport parameters all match. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled \"ClearVIEW HD-18 Command List\"; explicit confirmation that HD-19/HD-20 share this command set is not in the source text. Model list populated from source title only."
- "VISCA-like protocols commonly emit completion/error socket"
- "source contains no safety warnings, interlock procedures, or"
- "no TCP/IP control documented; RS-232 only per this source."
- "firmware version compatibility not stated in source."
- "HD-19 / HD-20 model applicability not stated in source text."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
