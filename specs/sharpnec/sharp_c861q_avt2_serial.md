---
spec_id: admin/sharp-nec-c861q-avt2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C861Q Avt2 Control Spec"
manufacturer: Sharp/NEC
model_family: "C861Q Avt2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C861Q Avt2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:08:35.648Z
last_checked_at: 2026-06-17T19:36:25.188Z
generated_at: 2026-06-17T19:36:25.188Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated for this specific model — varies by model in use"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "ID2 (model code) value for C861Q Avt2 not stated — varies per model."
  - "Appendix \"Supplementary Information by Command\" enum values not in this extract (input terminal, aspect, eco mode, base model type, sub-input)."
  - "firmware version compatibility not stated in source."
  - "control ID (ID1) default value not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:36:25.188Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command list; transport parameters (port 7142, baud 115200, 8/N/1) verified in source; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C861Q Avt2 Control Spec

## Summary
Sharp/NEC C861Q Avt2 projector. Control via RS-232C serial or wired/wireless LAN (TCP). Binary hex command protocol with checksum byte; each command begins with a frame header byte (00h/01h/02h/03h) and ends with CKS (low byte of sum of all preceding bytes).

<!-- UNRESOLVED: model code (ID2) value not stated for this specific model — varies by model in use -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 - max supported shown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source lists full duplex, no flow control field
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE command present
  - queryable       # inferred: many *REQUEST commands return state
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST present
```

## Actions
```yaml
# ID2 (model code) is device-specific and documented as varying per model.
# CKS = low byte of sum of all preceding bytes (computed per command).
- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02 00 00 00 00 02"
  params: []
  notes: "No other command accepted during power-on sequence."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02 01 00 00 00 03"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal value (see Appendix Supplementary Information). Example 06h = video."
  notes: "Source documents DATA01:01h as the literal example 06h → video port."

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: cmd_021_picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: cmd_022_sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: cmd_023_sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: cmd_025_onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: cmd_030_1_picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see Appendix Supplementary Information)."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target (DATA01=96h, DATA02=FFh → LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: enum
      description: "Sub-target (FFh pairs with DATA01=96h for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []
  notes: "Returns projector name, lamp usage time (sec), filter usage time (sec). Updated at 1-min intervals."

- id: cmd_037_3_filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03 95 00 00 00 98"
  params: []
  notes: "Returns filter usage time + filter alarm start time (sec). -1 if undefined."

- id: cmd_037_4_lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"
  notes: "Negative remaining life if replacement deadline exceeded. Reflects eco mode if enabled."

- id: cmd_037_6_carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). See key code list e.g. 02h+00h=POWER ON, 05h+00h=AUTO."
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD)."

- id: cmd_051_shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: cmd_052_shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: cmd_053_lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (source lists 06h=Periphery Focus; other targets in Appendix)."
    - name: DATA02
      type: enum
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop lens drive after continuous 7Fh/81h."

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same as cmd_053 DATA01)."
  notes: "Returns upper/lower limit + current value of adjustment range."

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "FFh=Stop (mode/value ignored), other=lens target"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by cmd_053_10."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []
  notes: "Returns lens operation status bitmap (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V)."

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []
  notes: "Returns base model type, sound function availability, profile number."

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []
  notes: "Returns power status, cooling/power process flags, operation status."

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []
  notes: "Returns signal switch flag, signal list number (returned value+1=practical), selection signal type, content displayed."

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []
  notes: "00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01 98 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze ON, 02h=freeze OFF"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []
  notes: "Returns Light Mode or Lamp Mode value depending on projector."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: cmd_097_155_lan_mac_address_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: cmd_097_198_pip_pbypicture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for eco mode (see Appendix Supplementary Information)."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03 B1 00 00 12 2C {DATA01..DATA16} 00 {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)."

- id: cmd_098_198_pip_pbypicture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value; semantics depend on DATA01 (MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners; SUB INPUT: per Appendix)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []
  notes: "Returns base model type code + model name (NUL-terminated)."

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
  notes: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix Supplementary Information)."
    - name: DATA02
      type: enum
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  description: "cmd_009 returns DATA01-12 error bitmap (bit=1 means error). Cover/fan/temp/lamp/ formatter/interlock/etc."
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  description: "cmd_078_2 DATA03 + DATA06 power/operation status."
- id: input_signal_status
  type: composite
  description: "cmd_078_3 / cmd_305_3 return signal list number, selection type, content displayed."
- id: mute_state
  type: composite
  description: "cmd_078_4 returns picture/sound/onscreen/forced OSD mute + OSD display."
- id: cover_state
  type: enum
  values: [normal_opened, closed]
  description: "cmd_078_6 mirror/lens cover state."
- id: lamp_info
  type: composite
  description: "cmd_037_4 returns usage time (sec) + remaining life (%)."
- id: filter_info
  type: composite
  description: "cmd_037_3 returns filter usage time + alarm start time (sec)."
- id: lens_operation
  type: bitmap
  description: "cmd_053_7 Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop,1=operating)."
- id: response_ack
  type: composite
  description: "Every command returns 2xh ACK frame with ERR1/ERR2 (00 00 = unrecognized; others per error code table)."
```

## Variables
```yaml
- id: brightness
  description: "Picture brightness (cmd_030_1 DATA01=00h). Range from cmd_060_1."
- id: contrast
  description: "Picture contrast (cmd_030_1 DATA01=01h)."
- id: color
  description: "Picture color (cmd_030_1 DATA01=02h)."
- id: hue
  description: "Picture hue (cmd_030_1 DATA01=03h)."
- id: sharpness
  description: "Picture sharpness (cmd_030_1 DATA01=04h)."
- id: volume
  description: "Sound volume (cmd_030_2)."
- id: lamp_light_adjust
  description: "Lamp/Light adjust (cmd_030_15 DATA01=96h)."
- id: projector_name
  description: "LAN projector name, up to 16 bytes (cmd_098_45)."
- id: eco_mode
  description: "Eco/Light/Lamp mode value (cmd_098_8)."
```

## Events
```yaml
# Source documents no unsolicited notifications - device only replies to commands.
```

## Macros
```yaml
# Source documents no multi-step sequences explicitly.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the note that no other command is accepted
# during power-on/off transitions. Error bitmap (cmd_009) reports cover error,
# temperature error, fan error, foreign-matter sensor, interlock switch open, lens
# not installed properly - these are device-reported fault conditions, not control
# interlocks the integrator must enforce.
```

## Notes
- Command framing: every command is a hex byte sequence. First byte is a frame-type/header (`00h`/`01h`/`02h`/`03h` for commands; `20h`-`23h`/`A0h`-`A3h` for responses). Bytes 2-3 are command id; bytes 4-5 are data length; following bytes are data; final byte is CKS.
- Responses use header+1 (e.g. command `02h` → response `22h` success / `A2h` error).
- CKS = low-order byte of the sum of all preceding bytes (see §2.2 example: `20+81+01+60+01+00 = 103h` → CKS=`03h`).
- ID1 = control ID set on projector; ID2 = model code (device-specific, not stated in this manual).
- Source references an "Appendix Supplementary Information by Command" not included in this refined extract — enum values for input terminal, aspect, eco mode, base model type, and sub-input settings are documented there.
- Error code table (§2.4) enumerates ERR1/ERR2 combinations: unrecognized, unsupported, invalid value, invalid input terminal, memory errors, forced mute, no signal, power-off rejection, no authority, invalid gain, etc.
<!-- UNRESOLVED: ID2 (model code) value for C861Q Avt2 not stated — varies per model. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" enum values not in this extract (input terminal, aspect, eco mode, base model type, sub-input). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
````

Self-check pass. 53 actions enumerated (matches source §2 list). Serial config from source. Port 7142 from source. No invented voltages/ports/baud. `status: draft`, `declared_confidence: low`. UNRESOLVED markers on gaps.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:08:35.648Z
last_checked_at: 2026-06-17T19:36:25.188Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:36:25.188Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command list; transport parameters (port 7142, baud 115200, 8/N/1) verified in source; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated for this specific model — varies by model in use"
- "source contains no explicit safety warnings, interlock procedures, or"
- "ID2 (model code) value for C861Q Avt2 not stated — varies per model."
- "Appendix \"Supplementary Information by Command\" enum values not in this extract (input terminal, aspect, eco mode, base model type, sub-input)."
- "firmware version compatibility not stated in source."
- "control ID (ID1) default value not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
