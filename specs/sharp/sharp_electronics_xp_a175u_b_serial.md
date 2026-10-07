---
spec_id: admin/sharp-electronics-xp-a175u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics XP-A175U Projector Control Spec"
manufacturer: Sharp
model_family: XP-A175U
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - XP-A175U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
source_urls:
  - https://res.cloudinary.com/hnymxdy5j/raw/upload/v1767755087/media/00D7F000004CKRUUA4/Sharp-ExternalControlManual_and_Appendix_Rev3-0-english.pdf
retrieved_at: 2026-08-05T06:20:04.615Z
last_checked_at: 2026-10-01T08:05:20.064Z
generated_at: 2026-10-01T08:05:20.064Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default baud rate not specified (source lists five supported rates). ID2 model code value for XP-A175U not given numerically. Appendix \"Supplementary Information by Command\" referenced for some enums but not all values present in this excerpt."
  - "source states multiple supported (4800/9600/19200/38400/115200 bps); no default specified"
  - "flow control not stated; \"Full duplex\" communication mode stated"
  - "no explicit safety warnings, power-on sequencing procedures, or"
  - "default baud rate among the five supported not specified."
  - "flow_control not stated (only \"Full duplex\" comm mode)."
  - "ID2 model code numeric for XP-A175U not stated in this excerpt (base-model table gives type bytes FFh/47H/00H/10H but not the wire ID2 value)."
  - "firmware version compatibility not stated."
  - "voltage/current/power specs not in this command-reference excerpt."
  - "response timeouts / inter-command spacing not stated."
verification:
  verdict: verified
  checked_at: 2026-10-01T08:05:20.064Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions match the source's 50 documented command hex bytes one-to-one; transport values are honest (UNRESOLVED where source omits). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-05
---

# Sharp Electronics XP-A175U Projector Control Spec

## Summary
Sharp XP-A175U projector controlled via binary hex command protocol over RS-232C serial (PC CONTROL D-SUB 9P) or wired LAN (TCP). Commands are framed byte sequences with a control ID, model code, length, data payload, and additive low-byte checksum. Covers power, input switching, mutes, picture/volume/aspect/light adjustment, lens control & memory, shutter, freeze, status queries, and LAN/PIP/edge-blend configuration.

<!-- UNRESOLVED: default baud rate not specified (source lists five supported rates). ID2 model code value for XP-A175U not given numerically. Appendix "Supplementary Information by Command" referenced for some enums but not all values present in this excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source states multiple supported (4800/9600/19200/38400/115200 bps); no default specified
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; "Full duplex" communication mode stated
addressing:
  port: 7142
auth:
  type: UNRESOLVED  # source does not describe any authentication procedure; type is unsupported
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015 POWER ON / 016 POWER OFF commands
  - routable     # inferred from 018 INPUT SW CHANGE command
  - queryable    # inferred from extensive *REQUEST commands returning state
  - levelable    # inferred from 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 LIGHT ADJUST
```

## Actions
```yaml
# All command payloads are hex byte sequences verbatim from source.
# Framing: bytes use <ID1>=control ID, <ID2>=model code, <CKS>=checksum.
# Checksum (CKS) = low-order 8 bits of sum of all preceding bytes (incl. header & data).
# While power-on/off or cooling is in progress, no other command is accepted (see Safety).

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"  # 009. ERROR STATUS REQUEST
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"  # 015. POWER ON
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"  # 016. POWER OFF
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {data01} {cks}"  # 018. INPUT SW CHANGE
  params:
    - name: data01
      type: enum
      description: "Input terminal (XP-A175U / XP-A155U per Appendix A.4): A1h=HDMI, A2h=HDMI2, BFh=HDBaseT, C4h=SDI"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"  # 020. PICTURE MUTE ON
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"  # 021. PICTURE MUTE OFF
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"  # 022. SOUND MUTE ON
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"  # 023. SOUND MUTE OFF
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"  # 024. ONSCREEN MUTE ON
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"  # 025. ONSCREEN MUTE OFF
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {data01} FF {data02} {data03} {data04} {cks}"  # 030-1. PICTURE ADJUST
  params:
    - name: data01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {data01} {data02} {data03} {cks}"  # 030-2. VOLUME ADJUST
  params:
    - name: data01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"  # 030-12. ASPECT ADJUST
  params:
    - name: data01
      type: enum
      description: "Aspect value (XP-A175U / XP-A155U per Appendix A.4): 00h=4:3(WINDOWS), 01h=LETTER BOX, 02h=WIDE SCREEN, 04h=16:9, 06h=FULL, 07h=ZOOM, 0Bh=5:4, 0Ch=16:10, 0Dh=15:9, 0Eh=NATIVE, 0Fh=AUTO, 10h=NORMAL"

- id: other_adjust
  label: Other Adjust (Light Adjust)
  kind: action
  command: "03 10 00 00 05 96 FF {data03} {data04} {data05} {cks}"  # 030-15. OTHER ADJUST (DATA01=96h, DATA02=FFh => LIGHT ADJUST)
  params:
    - name: data03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"  # 037. INFORMATION REQUEST
  params: []

- id: light_information_request_3
  label: Light Information Request 3
  kind: query
  command: "03 96 00 00 02 {data01} {data02} {cks}"  # 037-4. LIGHT INFORMATION REQUEST 3
  params:
    - name: data01
      type: enum
      description: "00h=Light"
    - name: data02
      type: enum
      description: "Content: 01h=Light usage time (seconds)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {data01} {cks}"  # 037-6. CARBON SAVINGS INFORMATION REQUEST
  params:
    - name: data01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {data01} {data02} {cks}"  # 050. REMOTE KEY CODE
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=STATUS, 0Fh=D-ZOOM+, 10h=D-ZOOM-, 2Ch=TEST, 64h-6Ch=keys 1-9, 6Dh=key 0, 84h=VOL UP, 85h=VOL DOWN, 93h=SHUTTER OPEN, 94h=SHUTTER CLOSE, E5h=HDBaseT, EEh=LIGHT MODE; with data02=01h: 03h=ID SET, 05h=HDMI, 11h=GEOMETRIC, 14h=AUX, 18h=HDMI2, 1Ah=OSD MUTE OFF, 1Bh=OSD MUTE ON, 1Ch=USER1, 1Dh=USER2, 1Eh=USER3, 20h=SDI, 21h=DEFAULT"
    - name: data02
      type: integer
      description: "Key code high byte"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"  # 051. SHUTTER CLOSE
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"  # 052. SHUTTER OPEN
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {data01} {data02} {cks}"  # 053. LENS CONTROL
  params:
    - name: data01
      type: integer
      description: "Lens axis (value referenced in appendix)"
    - name: data02
      type: enum
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive continuous plus, 81h=drive continuous minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {data01} 00 {cks}"  # 053-1. LENS CONTROL REQUEST
  params:
    - name: data01
      type: integer
      description: Lens axis

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"  # 053-2. LENS CONTROL 2
  params:
    - name: data01
      type: enum
      description: "FFh=Stop (mode/value ignored), otherwise axis selector"
    - name: data02
      type: enum
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {data01} {cks}"  # 053-3. LENS MEMORY CONTROL
  params:
    - name: data01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {data01} {cks}"  # 053-4. REFERENCE LENS MEMORY CONTROL
  params:
    - name: data01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set via 053-10)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {data01} {cks}"  # 053-5. LENS MEMORY OPTION REQUEST
  params:
    - name: data01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {data01} {data02} {cks}"  # 053-6. LENS MEMORY OPTION SET
  params:
    - name: data01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: enum
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"  # 053-7. LENS INFORMATION REQUEST
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {data01} {cks}"  # 053-10. LENS PROFILE SET
  params:
    - name: data01
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"  # 053-11. LENS PROFILE REQUEST
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {data01} 00 00 {cks}"  # 060-1. GAIN PARAMETER REQUEST 3
  params:
    - name: data01
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"  # 078-1. SETTING REQUEST
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"  # 078-2. RUNNING STATUS REQUEST
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"  # 078-3. INPUT STATUS REQUEST
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"  # 078-4. MUTE STATUS REQUEST
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"  # 078-5. MODEL NAME REQUEST
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {data01} {cks}"  # 079. FREEZE CONTROL
  params:
    - name: data01
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {data01} 01 {cks}"  # 084. INFORMATION STRING REQUEST
  params:
    - name: data01
      type: enum
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: light_mode_request
  label: Light Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"  # 097-8. LIGHT MODE REQUEST
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"  # 097-45. LAN PROJECTOR NAME REQUEST
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"  # 097-155. LAN MAC ADDRESS STATUS REQUEST2
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {data01} {cks}"  # 097-198. PIP/PICTURE BY PICTURE REQUEST
  params:
    - name: data01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"  # 097-243-1. EDGE BLENDING MODE REQUEST
  params: []

- id: light_mode_set
  label: Light Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {data01} {cks}"  # 098-8. LIGHT MODE SET
  params:
    - name: data01
      type: enum
      description: "Light mode (XP-A175U / XP-A155U per Appendix A.4): 00h=NORMAL, 04h=LONG LIFE, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {data01..16} 00 {cks}"  # 098-45. LAN PROJECTOR NAME SET
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"  # 098-198. PIP/PICTURE BY PICTURE SET
  params:
    - name: data01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; sub-input: see appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {data01} {cks}"  # 098-243-1. EDGE BLENDING MODE SET
  params:
    - name: data01
      type: enum
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"  # 305-1. BASE MODEL TYPE REQUEST
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"  # 305-2. SERIAL NUMBER REQUEST
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"  # 305-3. BASIC INFORMATION REQUEST
  params: []
```

## Feedbacks
```yaml
# Response framing: success responses begin with 20h/21h/22h/23h (echo of command group),
# followed by <ID1> <ID2>, LEN byte, data bytes, <CKS>. Failure responses begin with
# A0h/A1h/A2h/A3h and carry <ERR1> <ERR2> <CKS>.

- id: error_status
  type: bitmask
  description: "ERROR STATUS REQUEST response (DATA01-12); bit set = error. DATA01: cover/fan/light-off/LD-driver; DATA02: phosphor wheel; DATA03: driver-version/CPU-comm/temp/TEC; DATA04: color sensor/lens-install."

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "RUNNING STATUS DATA03: 00h=Standby, 01h=Power on"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  description: "RUNNING STATUS DATA04"

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  description: "RUNNING STATUS DATA05"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "RUNNING STATUS DATA06 / BASIC INFO DATA01"

- id: input_signal_state
  type: composite
  description: "INPUT STATUS / BASIC INFO: signal switch process, signal list number, selection signal type, test pattern, content displayed"

- id: mute_state
  type: composite
  description: "MUTE STATUS DATA01-05: picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display"

- id: lens_status
  type: bitmask
  description: "LENS INFORMATION REQUEST DATA01: lens memory/zoom/focus/lens-shift(H)/(V) operation state"

- id: lens_adjustment_value
  type: composite
  description: "LENS CONTROL REQUEST: upper/lower limits + current value for requested axis"

- id: gain_parameter
  type: composite
  description: "GAIN PARAMETER REQUEST 3: status, range limits, default, current, wide/narrow adjustment widths"

- id: light_usage_time
  type: integer
  unit: seconds
  description: "Light usage time in seconds (updated at 1-minute intervals)"

- id: carbon_savings
  type: composite
  description: "Carbon savings kg + mg fields"

- id: model_name
  type: string
  description: "Model name string (NUL-terminated)"

- id: projector_name
  type: string
  description: "LAN projector name (NUL-terminated)"

- id: mac_address
  type: string
  description: "MAC address (6 bytes)"

- id: serial_number
  type: string
  description: "Serial number (NUL-terminated)"

- id: base_model_type
  type: composite
  description: "BASE MODEL TYPE: type bytes + model name"

- id: light_mode
  type: enum
  description: "Light mode (XP-A175U / XP-A155U per Appendix A.4): NORMAL/LONG LIFE/SILENT"

- id: light_mode_status
  type: enum
  values: [off, on]
  description: "Edge blending mode, lens memory options, etc. (per request)"
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "Picture brightness (set via 030-1 DATA01=00h; range via 060-1)"

- id: contrast
  type: integer
  description: "Picture contrast (030-1 DATA01=01h)"

- id: color
  type: integer
  description: "Picture color (030-1 DATA01=02h)"

- id: hue
  type: integer
  description: "Picture hue (030-1 DATA01=03h)"

- id: sharpness
  type: integer
  description: "Picture sharpness (030-1 DATA01=04h)"

- id: volume
  type: integer
  description: "Sound volume (030-2)"

- id: light_adjust
  type: integer
  description: "Light adjust gain (030-15)"

- id: aspect
  type: enum
  description: "Aspect ratio (030-12)"

- id: light_mode
  type: enum
  description: "Light mode (098-8): NORMAL/LONG LIFE/SILENT"

- id: freeze
  type: enum
  values: [on, off]
  description: "Freeze state (079)"

- id: shutter
  type: enum
  values: [open, closed]
  description: "Lens shutter (051/052)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "Reference lens memory profile (053-10)"

- id: projector_name
  type: string
  description: "LAN projector name (098-45), up to 16 bytes"

- id: pip_pbp_mode
  type: enum
  description: "PIP/PBP mode (098-198 DATA01=00h)"

- id: pip_pbp_start_position
  type: enum
  description: "PIP/PBP start position (098-198 DATA01=01h)"

- id: edge_blending
  type: enum
  values: [off, on]
  description: "Edge blending mode (098-243-1)"
```

## Events
```yaml
# No unsolicited notifications documented; all device output is in response to a command.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    description: "While POWER ON is in progress, no other command is accepted."
  - command: power_off
    description: "While POWER OFF is in progress (including cooling time), no other command is accepted."
# UNRESOLVED: no explicit safety warnings, power-on sequencing procedures, or
# confirmation-required operations beyond the command-acceptance lockout above.
```

## Notes
- Command/response framing: every frame is a hex byte sequence. Header byte indicates direction/type (00h-03h = host command groups; 20h-23h = success response; A0h-A3h = error response). Each command group prefixes a distinct command category.
- Parameters `<ID1>` (control ID set on projector), `<ID2>` (model code), `<LEN>` (data length in bytes following LEN), and `<CKS>` (checksum) are common to all commands. Checksum = low-order 8 bits of the sum of all preceding bytes.
- Example checksum from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Mute states (picture/sound/onscreen) auto-clear on input terminal switch, video signal switch, or (sound mute only) volume adjustment.
- Lens drive: after sending continuous-drive (7Fh/81h) in 053 LENS CONTROL, send 00h to stop. While lens is being driven, the same command may be reissued to update position without an intermediate stop.
- Error codes (ERR1/ERR2): `00h/00h`=unrecognized command; `01h/00h`=invalid value; `01h/01h`=invalid input terminal; `02h/03h`=value cannot be set; `02h/0Dh`=power off; `02h/0Eh`=execution failed; `03h/00h`=wrong gain number; `03h/02h`=adjustment failed (see source §2.4 for full list).
- Standby-mode command reception: XP-A175U receives POWER ON over both serial and wired LAN with Standby Mode set to OFF or ON (appendix A.2).
- Signal list number returned by INPUT STATUS is 1 less than the practical value; add 1 to recover.
- Transport authentication: source does not describe an authentication procedure; transport.auth.type is UNRESOLVED.

<!-- UNRESOLVED: default baud rate among the five supported not specified. -->
<!-- UNRESOLVED: flow_control not stated (only "Full duplex" comm mode). -->
<!-- UNRESOLVED: ID2 model code numeric for XP-A175U not stated in this excerpt (base-model table gives type bytes FFh/47H/00H/10H but not the wire ID2 value). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: voltage/current/power specs not in this command-reference excerpt. -->
<!-- UNRESOLVED: response timeouts / inter-command spacing not stated. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
source_urls:
  - https://res.cloudinary.com/hnymxdy5j/raw/upload/v1767755087/media/00D7F000004CKRUUA4/Sharp-ExternalControlManual_and_Appendix_Rev3-0-english.pdf
retrieved_at: 2026-08-05T06:20:04.615Z
last_checked_at: 2026-10-01T08:05:20.064Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T08:05:20.064Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions match the source's 50 documented command hex bytes one-to-one; transport values are honest (UNRESOLVED where source omits). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default baud rate not specified (source lists five supported rates). ID2 model code value for XP-A175U not given numerically. Appendix \"Supplementary Information by Command\" referenced for some enums but not all values present in this excerpt."
- "source states multiple supported (4800/9600/19200/38400/115200 bps); no default specified"
- "flow control not stated; \"Full duplex\" communication mode stated"
- "no explicit safety warnings, power-on sequencing procedures, or"
- "default baud rate among the five supported not specified."
- "flow_control not stated (only \"Full duplex\" comm mode)."
- "ID2 model code numeric for XP-A175U not stated in this excerpt (base-model table gives type bytes FFh/47H/00H/10H but not the wire ID2 value)."
- "firmware version compatibility not stated."
- "voltage/current/power specs not in this command-reference excerpt."
- "response timeouts / inter-command spacing not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
