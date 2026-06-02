---
spec_id: admin/wyrestorm-h2x-h2xc-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm H2X/H2XC Matrix Switcher API"
manufacturer: Wyrestorm
model_family: MX-1010-HDBT-H2X
aliases: []
compatible_with:
  manufacturers:
    - Wyrestorm
  models:
    - MX-1010-HDBT-H2X
    - MX-1616-HDBT-H2X
    - MX-1010-H2XC
    - MX-1616-H2XC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T07:07:00.165Z
last_checked_at: 2026-06-02T07:07:00.165Z
generated_at: 2026-06-02T07:07:00.165Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol authentication is undocumented; default factory IP is 192.168.11.143; no username/password flow described."
  - "source describes no unsolicited notifications or async events."
  - "source describes no multi-step command sequences or scene macros"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware compatibility ranges; auth/session model; unsolicited event stream; safety interlocks; full EDID code semantics for code 31 (EDID Write payload format)."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:07:00.165Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions matched literal command tokens in source; transport parameters verified; full bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Wyrestorm H2X/H2XC Matrix Switcher API

## Summary
ASCII API for the Wyrestorm H2X and H2XC HDBaseT matrix switcher families (MX-1010 and MX-1616 chassis, HDBT and H2XC variants). Covers video/audio routing, per-output audio gain and mute, EQ, audio delay, CEC display power, HDCP/EDID management, source zone lockout, AVR priority, diagnostics and reboot. Command framing is ASCII terminated by `<CR><LF>` reachable over RS-232 (57600 8N1) and TCP/IP (port 23).

<!-- UNRESOLVED: protocol authentication is undocumented; default factory IP is 192.168.11.143; no username/password flow described. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  host: 192.168.11.143  # default IP from source
  port: 23
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from SET SW / SET AUDIOSW routing commands
- levelable  # inferred from VOLGAIN_*, MUTE, AUDIO_EQ commands
- queryable  # inferred from extensive GET / status query commands
- powerable  # inferred from CEC_PWR display on/off commands
```

## Actions
```yaml
# === Video / Audio routing (Section 4.1) ===
- id: switch_video
  label: Switch Video Input to Output
  kind: action
  command: "SET SW{in} {out}\r\n"
  params:
    - name: in
      type: string
      description: Video input {in1..in16}
    - name: out
      type: string
      description: Video output {out1..out16, all}

- id: query_video_mapping
  label: Query Video Input Mapping
  kind: query
  command: "GET MP{out}\r\n"
  params:
    - name: out
      type: string
      description: Video output {out1..out16, all}

- id: set_audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  command: "SET AUDIOSW_M {prm}\r\n"
  params:
    - name: prm
      type: enum
      values: [on, off]
      description: "on = audio independent from video; off = audio follows video"

- id: query_audio_switch_mode
  label: Query Audio Switch Mode
  kind: query
  command: "GET AUDIOSW_M {prm}\r\n"
  params:
    - name: prm
      type: enum
      values: [on, off]

- id: switch_audio
  label: Switch Audio Input to Output
  kind: action
  command: "SET AUDIOSW{in} {out}\r\n"
  params:
    - name: in
      type: string
      description: Audio input {hdmi1..hdmi16, spdif1..spdif16, arc1..arc16}
    - name: out
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: query_audio_mapping
  label: Query Audio Input Mapping
  kind: query
  command: "GET AUDIOMP{out}\r\n"
  params:
    - name: out
      type: string
      description: Audio output {audioout1..audioout16, all}

# === Audio Output Volume / Mute (Section 4.1) ===
- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  command: "SET VOLGAIN_DATA{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: integer
      description: "Gain in dB. Range depends on firmware: -10..10 on pre-v1.3/v1.4 main boards; -80..0 (2dB steps) on v1.3+ (10x10) / v1.4+ (16x16)."

- id: query_output_gain
  label: Query Current Output Gain
  kind: query
  command: "GET VOLGAIN_DATA{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: mute_audio
  label: Mute Audio
  kind: action
  command: "SET MUTE{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {spdifout1..spdifout16, audioout1..audioout16, all}
    - name: prm
      type: enum
      values: [on, off]
      description: "on = mute, off = unmute"

- id: query_mute_state
  label: Query Current Audio Mute State
  kind: query
  command: "GET MUTE{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {spdifout1..spdifout16, audioout1..audioout16, all}

- id: set_volume_fixed_variable
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  command: "SET VOLGAIN_FIX{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: [on, off]
      description: "on = fixed; off = variable"

- id: query_volume_fixed_variable
  label: Query Audio Out Level Setting
  kind: query
  command: "GET VOLGAIN_FIX{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: [on, off]

- id: set_mute_method
  label: Set Attenuation Method for Mute
  kind: action
  command: "SET MUTE_M{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: [cut, ramp]
      description: "cut = direct to mute; ramp = ramps to mute level"

- id: query_mute_method
  label: Query Output Mute Method
  kind: query
  command: "GET MUTE_M{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: volume_increase
  label: Increase Volume Output Level
  kind: action
  command: "SET VOLGAIN_INC{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: volume_decrease
  label: Decrease Volume Output Level
  kind: action
  command: "SET VOLGAIN_DEC{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: set_volume_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  command: "SET VOLGAIN_STEP{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: ["2", "4", "8"]
      description: Step length in dB

- id: query_volume_step
  label: Query Step Length of Volume Increase/Decrease
  kind: query
  command: "GET VOLGAIN_STEP{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: ["2", "4", "8"]

# === Audio Delay (Section 4.1) ===
- id: set_audio_delay
  label: Set Audio Output Delay Time
  kind: action
  command: "SET AUDIO_D{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: integer
      description: "Delay in milliseconds, 0..500 (0 = no delay)"

- id: query_audio_delay
  label: Query Audio Output Delay Time
  kind: query
  command: "GET AUDIO_D{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

# === EQ (Section 4.1) ===
- id: enable_eq
  label: Enable EQ
  kind: action
  command: "SET EQ_FN{aout} {prm}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: prm
      type: enum
      values: [on, off]
      description: "on = enable EQ, off = bypass EQ"

- id: query_eq_status
  label: Query EQ Function Status
  kind: query
  command: "GET EQ_FN{aout}\r\n"
  params:
    - name: aout
      type: string
      description: Audio output {audioout1..audioout16, all}

- id: set_eq_level
  label: Set Audio Out EQ Level
  kind: action
  command: "SET AUDIO_EQ{out} {freq} {gain}\r\n"
  params:
    - name: out
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: freq
      type: enum
      values: ["31", "62", "125", "250", "500", "2000", "4000", "8000", "16000"]
      description: "Frequency in Hz"
    - name: gain
      type: integer
      description: "Gain in dB, -10..10"

- id: query_eq_level
  label: Query Audio Out EQ Level
  kind: query
  command: "GET AUDIO_EQ{out} {freq}\r\n"
  params:
    - name: out
      type: string
      description: Audio output {audioout1..audioout16, all}
    - name: freq
      type: enum
      values: ["31", "62", "125", "250", "500", "2000", "4000", "8000", "16000"]

# === Scenes (Section 4.1) ===
- id: save_video_scene
  label: Save Video Scene
  kind: action
  command: "SAVE PRESET_V{prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Scene number 1..20
  notes: "10x10 Main Board FW below v1.3 / 16x16 Main Board FW below v1.4"

- id: recall_video_scene
  label: Recall Video Scene
  kind: action
  command: "RESTORE PRESET_V{prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Scene number 1..20

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  command: "SAVE PRESET_A{prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Scene number 1..20
  notes: "Requires 10x10 Main Board FW v1.3+ or 16x16 Main Board FW v1.4+"

- id: recall_audio_scene
  label: Recall Audio Scene
  kind: action
  command: "RESTORE PRESET_A{prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Scene number 1..20
  notes: "Requires 10x10 Main Board FW v1.3+ or 16x16 Main Board FW v1.4+"

# === Display Power Control (Section 4.2) ===
- id: set_cec_power
  label: Power Display On/Off
  kind: action
  command: "SET CEC_PWR{out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: Output {hdmiout1..hdmiout16, hdbtout1..hdbtout16, all}
    - name: prm
      type: enum
      values: [on, off]

- id: query_cec_power
  label: Query CEC Power Status
  kind: query
  command: "GET CEC_PWR{out}\r\n"
  params:
    - name: out
      type: string
      description: Output {hdmiout1..hdmiout16, hdbtout1..hdbtout16, all}

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  command: "SET AUTOCEC_D{out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: Output (HDBT/HDMI)
    - name: prm
      type: integer
      description: "Delay in minutes, 0..30. 0 powers display off immediately if no active signal."

- id: query_cec_power_delay
  label: Query CEC Power Delay Time
  kind: query
  command: "GET AUTOCEC_D{out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: Output (HDBT/HDMI)
    - name: prm
      type: integer
      description: "0..30 minutes"

# === HDCP / EDID (Section 5.1) ===
- id: set_input_hdcp
  label: Set Input HDCP On/Off
  kind: action
  command: "SET HDCP_S{in} {prm}\r\n"
  params:
    - name: in
      type: string
      description: Input {in1..in16, all}
    - name: prm
      type: enum
      values: [on, off]

- id: query_input_hdcp
  label: Query Input HDCP Status
  kind: query
  command: "GET HDCP_S{in}\r\n"
  params:
    - name: in
      type: string
      description: Input {in1..in16, all}

- id: query_edid_dip
  label: Query EDID Dip Switch Status
  kind: query
  command: "GET EDID_DIP\r\n"
  params: []
  notes: "Response carries prm 0..15"

- id: set_input_edid
  label: Set Input EDID
  kind: action
  command: "SET EDID{in} {prm}\r\n"
  params:
    - name: in
      type: string
      description: Input {in1..in16, all}
    - name: prm
      type: integer
      description: "EDID code per EDID Parameter Table (0..31)"

- id: query_all_inputs_edid
  label: Query All Inputs EDID Status
  kind: query
  command: "GET EDID{all}\r\n"
  params:
    - name: all
      type: string
      description: Literal "all" or per-input {in1..in16}

# === Global Matrix Functions (Section 5.2) ===
- id: set_ir_callback
  label: Set IR Call Back Control
  kind: action
  command: "SET IRBACK_FN{prm}\r\n"
  params:
    - name: prm
      type: enum
      values: [on, off]

- id: query_ir_callback
  label: Query IR Call Back Status
  kind: query
  command: "GET IRBACK_FN\r\n"
  params: []

- id: set_long_reach
  label: Set Long Reach Mode On/Off
  kind: action
  command: "SET LR_FN{prm1} {prm2}\r\n"
  params:
    - name: prm1
      type: string
      description: Literal "hdbtall"
    - name: prm2
      type: enum
      values: [on, off]

- id: query_long_reach
  label: Query Long Reach Mode Status
  kind: query
  command: "GET LR_FN{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Literal "hdbtall"

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  command: "SET IR_SYSCODE{prm1}\r\n"
  params:
    - name: prm1
      type: enum
      values: ["00", "4E", "all"]
      description: "00 = standard codes, 4E = extended, all = accept both"

- id: query_ir_system_codes
  label: Query IR System Codes
  kind: query
  command: "GET IR_SYSCODE\r\n"
  params: []

- id: set_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  command: "SET SW_M{prm}\r\n"
  params:
    - name: prm
      type: enum
      values: [normal, quick]

- id: query_switching_mode
  label: Query Matrix Switching Mode
  kind: query
  command: "GET SW_M\r\n"
  params: []

- id: set_avr_priority
  label: Set AVR Priority Mode (Zone Lock)
  kind: action
  command: "SET ZONE_LOCK{out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: Output {hdmiout1..hdmiout16, hdbtout1..hdbtout16, all}
    - name: prm
      type: enum
      values: [on, off]

- id: query_avr_priority
  label: Query AVR Priority Mode Status
  kind: query
  command: "GET ZONE_LOCK{out}\r\n"
  params:
    - name: out
      type: string
      description: Output {hdmiout1..hdmiout16, hdbtout1..hdbtout16, all}

- id: set_source_zone_lockout
  label: Select Sources a Zone Can Access
  kind: action
  command: "SET ZONE_R{out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: Output {out1..out16, all}
    - name: prm
      type: string
      description: 4-hex-digit bitmask per Source Zone Lockout Parameter Table
  notes: "Use H2XSource Lockout Command Calculator for custom masks"

- id: query_source_zone_lockout
  label: Query Sources a Zone Can Access
  kind: query
  command: "GET ZONE_R{out}\r\n"
  params:
    - name: out
      type: string
      description: Output {out1..out16, all}

# === Remote Device Passthrough over HDBaseT (Section 6) ===
- id: hdbt_passthrough
  label: Route Command to Remote Device over HDBaseT
  kind: action
  command: "05 55 55 57 {card} {baud} {parity} {length} {devicecmd}"
  params:
    - name: card
      type: string
      description: Card slot hex per Section 6.2 (e.g. 02 for HDBT out slot 2, 11 for HDBT in 1)
    - name: baud
      type: string
      description: Device baud hex per Section 6.3 (e.g. 06 = 9600, 0B = 57600)
    - name: parity
      type: string
      description: Parity hex per Section 6.4 (00=none, 01=odd, 02=even, 03=mark, 04=space)
    - name: length
      type: string
      description: Device command length in bytes (hex) per Section 6.5
    - name: devicecmd
      type: string
      description: Device command payload as HEX bytes (ASCII commands must be converted to HEX)
  notes: "Sent as raw hex bytes, not ASCII. Header is fixed 05 55 55 57."

# === Diagnostics (Section 7) ===
- id: query_input_cable_status
  label: Query Input Cable Connection Status
  kind: query
  command: "GET CABLEC_IN{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Input {in1..in16, all}

- id: query_output_cable_status
  label: Query Output Cable Connection Status
  kind: query
  command: "GET CABLEC_IN{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Output {hdmiout1..hdmiout16, hdbtout1..hdbtout16, all}
  notes: "Source document uses mnemonic CABLEC_IN for both input and output cable queries; treated as source typo. Response returns {connected, not connected}."

- id: query_hdbt_input_link_quality
  label: Query HDBaseT Input Link Quality
  kind: query
  command: "GET HDBTL_IN{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Input {hdbtin1..hdbtin16, all}
  notes: "Response prm2 1..10 or 'no link'"

- id: query_hdbt_output_link_quality
  label: Query HDBaseT Output Link Quality
  kind: query
  command: "GET HDBTL_OUT{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Output {hdbtout1..hdbtout16, all}
  notes: "Response prm2 1..10 or 'no link'"

- id: query_card_connection
  label: Query Card Connection Status
  kind: query
  command: "GET CARD_C{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Slot {slot1..slot16, all}
  notes: "Response prm2 {connected, not connected}"

- id: query_card_type
  label: Query Card Type
  kind: query
  command: "GET CARD_T{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Slot {slot1..slot16, all}
  notes: "Response prm2 {hdmi, hdbt}"

- id: query_card_communication
  label: Query Card Communication Status With Motherboard
  kind: query
  command: "GET CARD_COM{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Slot {slot1..slot16, all}
  notes: "Response prm2 {good, none}"

- id: query_card_status
  label: Query Board/Card Status
  kind: query
  command: "GET CARD_S{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Target {mainboard, card1..card16, all}
  notes: "Response prm2 {good, none}"

- id: query_fan_status
  label: Query Fan Status
  kind: query
  command: "GET FANS{prm1}\r\n"
  params:
    - name: prm1
      type: string
      description: Fan {fan1..fan4, all}
  notes: "Response prm2 {working, unworking}"

# === Reboot / Reset ===
- id: reboot
  label: Reboot the Matrix
  kind: action
  command: "REBOOT {prm}\r\n"
  params:
    - name: prm
      type: string
      description: Target {all, mainboard, ledboard, card1..card16}

- id: factory_reset
  label: Restore Factory Defaults
  kind: action
  command: "RESET\r\n"
  params: []
```

## Feedbacks
```yaml
- id: video_mapping
  type: object
  description: "MP{in} {out} - current input routed to given output"
- id: audio_mapping
  type: object
  description: "AUDIOMP{in} {out} - current audio routing"
- id: output_gain
  type: integer
  description: "VOLGAIN_DATA{aout} {prm} - dB; range depends on firmware (-10..10 or -80..0)"
- id: mute_state
  type: enum
  values: [on, off]
  description: "MUTE{aout} {prm}"
- id: volume_fixed_variable
  type: enum
  values: [on, off]
  description: "VOLGAIN_FIX{aout} {prm}"
- id: mute_method
  type: enum
  values: [cut, ramp]
  description: "MUTE_M{aout} {prm}"
- id: audio_delay
  type: integer
  description: "AUDIO_D{aout} {prm} - milliseconds, 0..500"
- id: eq_status
  type: enum
  values: [on, off]
  description: "EQ_FN{aout} {prm}"
- id: eq_level
  type: object
  description: "AUDIO_EQ{out} {freq} {gain}"
- id: cec_power_status
  type: enum
  values: [on, off]
  description: "CEC_PWR{out} {prm}"
- id: cec_power_delay
  type: integer
  description: "AUTOCEC_D{out} {prm} - minutes, 0..30"
- id: hdcp_status
  type: enum
  values: [on, off]
  description: "HDCP_S{in} {prm}"
- id: edid_dip
  type: integer
  description: "EDID_DIP{prm} - 0..15"
- id: edid_status
  type: object
  description: "EDID{in} {prm} per EDID Parameter Table"
- id: ir_callback_status
  type: enum
  values: [on, off]
- id: long_reach_status
  type: enum
  values: [on, off]
- id: ir_system_codes
  type: enum
  values: ["00", "4E", "all"]
- id: switching_mode
  type: enum
  values: [normal, quick]
- id: avr_priority_status
  type: enum
  values: [on, off]
- id: source_zone_lockout
  type: string
  description: "ZONE_R{out} {prm} - 4-hex-digit bitmask"
- id: cable_connection
  type: enum
  values: [connected, "not connected"]
- id: hdbt_link_quality
  type: string
  description: "HDBTL_IN/OUT{prm1} {prm2} - 1..10 or 'no link'"
- id: card_connection
  type: enum
  values: [connected, "not connected"]
- id: card_type
  type: enum
  values: [hdmi, hdbt]
- id: card_communication
  type: enum
  values: [good, none]
- id: card_status
  type: enum
  values: [good, none]
- id: fan_status
  type: enum
  values: [working, unworking]
```

## Variables
```yaml
# No discrete "settable variable" surface beyond the parameterized actions above.
# All settable parameters (gain, delay, EQ band gain, source mask, etc.) are
# covered as action params. Section intentionally empty.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications or async events.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences or scene macros
# beyond Scene Save/Recall (which is already covered as discrete actions).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command framing is ASCII terminated by `<CR><LF>`. Source does not document any binary framing, escape sequences, or checksums.
- Key words are case sensitive per source Section 3.
- Firmware gating is real and matters: audio scene commands and the lower -80..0 dB gain range require 10x10 Main Board FW v1.3+ or 16x16 Main Board FW v1.4+. Scene preset range differs: 1..20 (current) vs 1..8 (legacy — not enumerated in this document revision).
- EDID parameter table (codes 0..31) covers Copy-from-output (0..15), fixed 1080p/4K presets (16..29), Smart EDID (30), and EDID Write (31). Action `set_input_edid` accepts these codes as the `prm` integer.
- Source Zone Lockout bitmask uses a 4-hex-digit string (e.g. `AAAA` = odd-numbered sources on 16x16). The `set_source_zone_lockout` action takes the literal hex string.
- HDBT passthrough (Section 6) is a raw-bytes command, not ASCII: header `05 55 55 57` followed by card slot, baud code, parity code, length byte, then the device command in hex. ASCII commands to the remote device must be converted to hex bytes.
- Source typo: `GET CABLEC_IN` is documented for both input and output cable queries. Preserved verbatim.
- Default IP `192.168.11.143` and TCP port `23` are the only network defaults stated. No gateway, subnet, or DHCP behavior documented.
- No authentication, encryption, or session handshake documented. Source treats the API as a plain TCP socket on port 23.

<!-- UNRESOLVED: firmware compatibility ranges; auth/session model; unsolicited event stream; safety interlocks; full EDID code semantics for code 31 (EDID Write payload format). -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T07:07:00.165Z
last_checked_at: 2026-06-02T07:07:00.165Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:07:00.165Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions matched literal command tokens in source; transport parameters verified; full bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol authentication is undocumented; default factory IP is 192.168.11.143; no username/password flow described."
- "source describes no unsolicited notifications or async events."
- "source describes no multi-step command sequences or scene macros"
- "source contains no safety warnings, interlock procedures, or"
- "firmware compatibility ranges; auth/session model; unsolicited event stream; safety interlocks; full EDID code semantics for code 31 (EDID Write payload format)."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
