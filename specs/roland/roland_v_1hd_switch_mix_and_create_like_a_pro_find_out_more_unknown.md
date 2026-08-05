---
spec_id: admin/roland-v-1hd-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland V-1HD+ Control Spec"
manufacturer: Roland
model_family: V-1HD+
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - V-1HD+
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-1HD_plus_reference_eng02_W.pdf
retrieved_at: 2026-07-13T20:30:05.962Z
last_checked_at: 2026-07-22T00:42:07.496Z
generated_at: 2026-07-22T00:42:07.496Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB remote-control protocol details not documented in this source excerpt (USB port mentioned but no command spec given)."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "USB remote-control protocol not documented in this excerpt."
  - "single default baud rate not identified (source lists 38400 and 115200 without marking a default)."
  - "firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:42:07.496Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions matched verbatim with correct parameter shapes and ranges. Transport fully verified. Complete bidirectional coverage of source command tokens. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Roland V-1HD+ Control Spec

## Summary
The Roland V-1HD+ is a 4-input HDMI video switcher/mixer with integrated audio mixing, picture-in-picture (PinP), split, and downstream key (DSK) compositing. This spec covers remote control via the RS-232 interface using ASCII command strings. The unit also exposes a USB port for remote control and a DB-9 TALLY connector for program/preview tally output.

<!-- UNRESOLVED: USB remote-control protocol details not documented in this source excerpt (USB port mentioned but no command spec given). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # configurable: 38400 or 115200 (RATE menu). Source states both; no single default value identified.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # source: "Flow control XON/XOFF"; XON=11H, XOFF=13H
auth:
  type: none  # inferred: no auth procedure in source
# Command framing: STX (02H) + 3-char command code + ":param,param" + ";"
# Acknowledgement: ack (06H) returned for accepted commands.
# Verify ack before sending next command.
```

## Traits
```yaml
traits:
  - routable    # inferred: video input/output source selection (IPS, OH1, OH2, PGM, PST)
  - queryable   # inferred: status queries present (QAL, QPL, TLY, VER, ACS)
  - levelable   # inferred: volume, gain, position, key-level numeric adjustments
```

## Actions

```yaml
# Framing note: every command is prefixed with STX (ASCII 02H) and terminated with ";".
# The `command:` field shows the verbatim sent-command string as written in the source,
# with STX represented as "stx" per source notation. Parameters are substituted into
# the {a},{b} placeholders. Accepted commands return "ack" (ASCII 06H).

# ---- Video operations ----
- id: select_video_source
  label: Select Video Source for INPUT 1-4
  kind: action
  command: "stxIPS:a,b;"
  params:
    - name: a
      type: integer
      description: "Input connector: 0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4)"
    - name: b
      type: integer
      description: "Source type: 0 (HDMI), 1 (STILL 1), 2 (STILL 2), 3 (STILL 3), 4 (STILL 4)"

- id: select_output_1
  label: Select Video Output from OUTPUT 1 Connector
  kind: action
  command: "stxOH1:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (Multi-View)"

- id: select_output_2
  label: Select Video Output from OUTPUT 2 Connector
  kind: action
  command: "stxOH2:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM), 1 (PVW), 2 (Multi-View)"

- id: select_pgm
  label: Select Final Output Video (PGM)
  kind: action
  command: "stxPGM:a;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4)"

- id: select_pvw
  label: Select Preview Output Video (PST)
  kind: action
  command: "stxPST:a;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4)"

- id: select_transition_effect
  label: Select Transition Effect
  kind: action
  command: "stxTRS:a;"
  params:
    - name: a
      type: integer
      description: "0 (MIX), 1 (WIPE)"

- id: set_transition_time
  label: Set Video Transition Time
  kind: action
  command: "stxTIM:a;"
  params:
    - name: a
      type: integer
      description: "0 (0.0 sec) - 40 (4.0 sec)"

- id: press_cut
  label: Press the CUT Button
  kind: action
  command: "stxCUT;"
  params: []

- id: press_auto
  label: Press the AUTO Button
  kind: action
  command: "stxATO;"
  params: []

- id: press_pinp
  label: Press the PinP Button
  kind: action
  command: "stxP1S;"
  params: []

- id: press_split
  label: Press the SPLIT Button
  kind: action
  command: "stxSPS;"
  params: []

- id: press_dsk_on
  label: Press the DSK ON Button
  kind: action
  command: "stxDSK;"
  params: []

- id: press_dsk_pvw
  label: Press the DSK PVW Button
  kind: action
  command: "stxDVW;"
  params: []

- id: pinp_adjust_position
  label: PinP Adjust Position of Inset Screen
  kind: action
  command: "stxPP1:a,b;"
  params:
    - name: a
      type: integer
      description: "Horizontal position: -500 - 500"
    - name: b
      type: integer
      description: "Vertical position: -500 - 500"

- id: pinp_adjust_size
  label: Adjust Size of the Inset Screen
  kind: action
  command: "stxPPS:a;"
  params:
    - name: a
      type: integer
      description: "100 (10.0%) - 1000 (100.0%)"

- id: pinp_adjust_zoom
  label: Adjust Zoom Ratio of Inset Screen Video
  kind: action
  command: "stxPPZ:a;"
  params:
    - name: a
      type: integer
      description: "100 (100.0%) - 400 (400.0%)"

- id: set_inset_fade_time
  label: Set Fade-in/out Time for the Inset Screen / Source Video
  kind: action
  command: "stxPTM:a;"
  params:
    - name: a
      type: integer
      description: "0 (0.0 sec) - 40 (4.0 sec). Source lists PTM for both PinP inset fade and DSK source-video fade."
  notes: "Source documents this opcode (PTM) under both the PinP section (inset screen fade) and the DSK section (source video fade). Same opcode; treated as one action."

- id: split_adjust_position
  label: Split Adjust Position of the Video
  kind: action
  command: "stxSPT:a,b;"
  params:
    - name: a
      type: integer
      description: "SPLIT V: horizontal position of left video (A/PGM bus), -500 - 500. SPLIT H: vertical position of upper video (A/PGM bus), -500 - 500."
    - name: b
      type: integer
      description: "SPLIT V: horizontal position of right video (B/PST bus), -500 - 500. SPLIT H: vertical position of lower video (B/PST bus), -500 - 500."

- id: split_adjust_boundary
  label: Adjust the Boundary Position (Split)
  kind: action
  command: "stxSCP:a;"
  params:
    - name: a
      type: integer
      description: "-500 - 500"

- id: dsk_adjust_key_level
  label: DSK Adjust the Key Level (amount of extraction)
  kind: action
  command: "stxKYL:a;"
  params:
    - name: a
      type: integer
      description: "0 - 255"

- id: dsk_adjust_key_gain
  label: DSK Adjust the Key Gain (semi-transmissive region)
  kind: action
  command: "stxKYG:a;"
  params:
    - name: a
      type: integer
      description: "0 - 255"

- id: turn_output_fade
  label: Turn the OUTPUT FADE Knob
  kind: action
  command: "stxOFD:a;"
  params:
    - name: a
      type: integer
      description: "-63 - 64"

# ---- Audio operations ----
- id: adjust_input_volume
  label: Adjust the Input Volume Level
  kind: action
  command: "stxIAL:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4), 4 (AUDIO IN 1), 5 (AUDIO IN 2), 6 (LINE IN), 7 (MIC/AUX IN)"
    - name: b
      type: integer
      description: "-801 (-INF dB), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)"

- id: adjust_output_volume
  label: Adjust the Output Volume Level
  kind: action
  command: "stxOAL:a;"
  params:
    - name: a
      type: integer
      description: "-801 (-INF dB), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)"

- id: adjust_analog_gain
  label: Adjust the Analog Gain for AUDIO IN 1/2, MIC/AUX IN
  kind: action
  command: "stxIAG:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (MIC/AUX IN)"
    - name: b
      type: integer
      description: "0 (0 dB) - 64 (64 dB) when a=0 or 1; 0 (0 dB) - 55 (55 dB) when a=2"

- id: adjust_input_audio_delay
  label: Adjust Delay Time of Input Audio
  kind: action
  command: "stxADT:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4), 4 (AUDIO IN 1), 5 (AUDIO IN 2), 6 (LINE IN), 7 (MIC/AUX IN)"
    - name: b
      type: integer
      description: "0 (0.0 ms) - 5000 (500.0 ms)"

- id: press_limiter
  label: Press the LIMITER Button
  kind: action
  command: "stxLIM;"
  params: []

- id: stereo_link_toggle
  label: Long-press the SETUP Button (stereo link function on/off)
  kind: action
  command: "stxLNK;"
  params: []

- id: set_input_mute
  label: Specify the Mute Function for Input Audio
  kind: action
  command: "stxIAM:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4), 4 (AUDIO IN 1), 5 (AUDIO IN 2), 6 (LINE IN), 7 (MIC/AUX IN)"
    - name: b
      type: integer
      description: "0 (MUTE OFF), 1 (MUTE ON)"

- id: set_input_solo
  label: Specify the Solo Function for Input Audio
  kind: action
  command: "stxIAS:a,b;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4), 4 (AUDIO IN 1), 5 (AUDIO IN 2), 6 (LINE IN), 7 (MIC/AUX IN)"
    - name: b
      type: integer
      description: "0 (SOLO OFF), 1 (SOLO ON)"

# ---- Other operations ----
- id: select_button_function
  label: Select Functions for Buttons [1/5]-[4/8]
  kind: action
  command: "stxMOD:a;"
  params:
    - name: a
      type: integer
      description: "0 (STILL IMAGE), 1 (PinP SOURCE), 2 (MEMORY 1-4), 3 (MEMORY 5-8)"

- id: press_numbered_button
  label: Press Button [1/5]-[4/8]
  kind: action
  command: "stxMNS:a;"
  params:
    - name: a
      type: integer
      description: "0 (1/5) - 3 (4/8)"

- id: set_hdcp
  label: Set HDCP On/Off
  kind: action
  command: "stxHCP:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (ON)"

- id: recall_preset_memory
  label: Recall Preset Memory
  kind: action
  command: "stxMEM:a;"
  params:
    - name: a
      type: integer
      description: "0 (1), 1 (2), 2 (3), 3 (4), 4 (5), 5 (6), 6 (7), 7 (8)"

- id: set_memory_inset_fade_time
  label: Set the Fade-in Time for the Inset Screen when Recalling a Memory
  kind: action
  command: "stxPFT:a;"
  params:
    - name: a
      type: integer
      description: "0 (0.0 sec) - 10 (1.0 sec)"

- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "stxTPT:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (75% COLOR BAR), 2 (100% COLOR BAR), 3 (RAMP), 4 (STEP), 5 (HATCH)"

- id: set_test_tone
  label: Set Test Tone
  kind: action
  command: "stxTTN:a;"
  params:
    - name: a
      type: integer
      description: "0 (OFF), 1 (-20dB@1kHz: 1kHz), 2 (-10dB@1kHz: 1kHz), 3 (0dB@1kHz: 1kHz), 4 (-20dB@1kHz: 500Hz), 5 (-10dB@1kHz: 500Hz), 6 (0dB@1kHz: 500Hz)"

# ---- Query commands ----
- id: query_volume_level
  label: Acquire Information on Volume Level
  kind: query
  command: "stxQAL:a;"
  params:
    - name: a
      type: integer
      description: "0 (INPUT 1), 1 (INPUT 2), 2 (INPUT 3), 3 (INPUT 4), 4 (AUDIO IN 1), 5 (AUDIO IN 2), 6 (LINE IN), 7 (MIC/AUX IN), 8 (ALL)"

- id: query_control_status
  label: Retrieve Status of Controls
  kind: query
  command: "stxQPL:a;"
  params:
    - name: a
      type: integer
      description: "0 (PGM/A), 1 (PST/B), 2 (MODE 1/5-4/8), 3 (MODE), 4 (TRANSITION), 5 (SPLIT), 6 (PinP), 7 (DSK PVW), 8 (DSK ON), 9 (LIMITER), 10 (LINK), 11 (Video fade level), 12 (ALL)"

- id: query_tally_output
  label: Retrieve Output Status of INPUT 1-4 (Tally)
  kind: query
  command: "stxTLY;"
  params: []

- id: acquire_unit_status
  label: Acquire Status of the Unit
  kind: query
  command: "stxACS;"
  params: []

- id: query_version
  label: Version Information
  kind: query
  command: "stxVER;"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: raw
  description: "Acknowledgement. ASCII 06H (ack) returned for accepted commands. Verify before sending next command."

- id: volume_level_response
  type: raw
  command: "stxQAL:b;"
  description: "Response to QAL query. b = -801 (-INF dB) - 100 (10.0 dB) per channel; when a=8 (ALL) returns all levels e.g. stxQAL:100,80,70,60,50,40,30,20;"

- id: control_status_response
  type: raw
  command: "stxQPL:b;"
  description: "Response to QPL query. Values depend on a (see QPL params). When a=12 (ALL) returns all fields e.g. stxQPL:0,3,2,1,1,0,0,0,0,0,0;"

- id: tally_response
  type: raw
  command: "stxTLY:a,b,c,d;"
  description: "Response to TLY query. a-d = 0 (Dark), 1 (Red: final output), 2 (Green: preview output) for INPUT 1-4. e.g. stxTLY:1,2,0,0;"

- id: version_response
  type: raw
  command: "VER:V-1HD PLUS,a;"
  description: "Response to VER query. a = version number (ASCII text)."
```

## Variables
```yaml
# No discrete settable parameters beyond those enumerated as Actions.
```

## Events
```yaml
- id: error
  type: raw
  command: "stxERR:a;"
  description: "Spontaneously sent when an error is detected. a = 0 (Syntax error: received command contains an error), 5 (Out of range error: a parameter is out of range)."

- id: flow_control_xon
  type: raw
  command: "XON (11H)"
  description: "Flow control signal spontaneously sent from this unit."

- id: flow_control_xoff
  type: raw
  command: "XOFF (13H)"
  description: "Flow control signal spontaneously sent from this unit."
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in this source excerpt. Tally output is open-collector,
# max 12 V / 200 mA per the TALLY connector specification (informational, not an interlock).
```

## Notes
- RS-232 must be enabled: press [MENU] → "TALLY/RS-232" → set "RS-232" to "ON".
- TALLY output must be enabled separately via the same menu ("TALLY" → "ON").
- Use an RS-232 crossover cable between unit and controller. Pins 4-6 and 7-8 are cross-connected inside the unit.
- RS-232 connector: DB-9 male. TALLY connector: DB-9 female (open-collector tally, pins 2-5 = PGM/A [1]-[4], pins 6-9 = PST/B [1]-[4], pin 1 = GND).
- Command framing: STX (02H) + 3-char command code + optional ":param,param" + ";". All ASCII.
- After each command, wait for ack (06H) before sending the next.
- RATE menu offers 38400 or 115200 bps; the controlling device must match the configured rate.
- Source reference: "Roland V-1HD+ RS-232 / Tally Control Excerpt, Reference Manual, Ver 1.10 and later. © 2020 Roland Corporation."

<!-- UNRESOLVED: USB remote-control protocol not documented in this excerpt. -->
<!-- UNRESOLVED: single default baud rate not identified (source lists 38400 and 115200 without marking a default). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
```

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-1HD_plus_reference_eng02_W.pdf
retrieved_at: 2026-07-13T20:30:05.962Z
last_checked_at: 2026-07-22T00:42:07.496Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:42:07.496Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions matched verbatim with correct parameter shapes and ranges. Transport fully verified. Complete bidirectional coverage of source command tokens. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB remote-control protocol details not documented in this source excerpt (USB port mentioned but no command spec given)."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "USB remote-control protocol not documented in this excerpt."
- "single default baud rate not identified (source lists 38400 and 115200 without marking a default)."
- "firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
