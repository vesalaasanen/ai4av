---
spec_id: admin/sharp-nec-xp-a824u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A824U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A824U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A824U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:08:21.534Z
last_checked_at: 2026-06-19T07:49:44.881Z
generated_at: 2026-06-19T07:49:44.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power/voltage/current specifications not in source. Firmware version compatibility not stated. Input terminal value tables and key-code-to-input mappings are referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source."
  - "flow_control setting not stated in source (RTS/CTS pins present on D-SUB 9P cable)"
  - "no unsolicited notification mechanism documented in source."
  - "no multi-step sequences described explicitly in source."
  - "source does not document explicit confirmation/interlock procedures beyond the above command-acceptance constraints."
  - "input-terminal / aspect / eco-mode / signal-type / base-model-type / sub-input value tables not in refined source (referenced to a missing appendix)."
  - "flow_control setting not stated (RTS/CTS pins wired but mode unspecified)."
  - "default baud rate not stated (five rates listed as selectable)."
  - "firmware version compatibility not stated."
  - "power/voltage/current specifications not in source."
  - "value tables in missing appendix, flow_control, default baud, firmware version, power specs."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:49:44.881Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source; command opcodes and transport parameters match exactly. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A824U B Control Spec

## Summary
Sharp/NEC Xp A824U B is a projector controllable over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the binary frame protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands and responses are expressed as hexadecimal byte frames with a control-ID/model-code and a trailing checksum byte. TCP port 7142 is used for LAN control.

<!-- UNRESOLVED: power/voltage/current specifications not in source. Firmware version compatibility not stated. Input terminal value tables and key-code-to-input mappings are referenced to an "Appendix / Supplementary Information by Command" not included in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps (selectable); default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow_control setting not stated in source (RTS/CTS pins present on D-SUB 9P cable)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015. POWER ON / 016. POWER OFF commands
  - queryable    # inferred from many status request commands
  - levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST commands
  - routable     # inferred from 018. INPUT SW CHANGE command
```

## Actions
```yaml
# Binary protocol. Frame format: commands begin with a type byte (00h/01h/02h/03h),
# followed by command code, then 00h 00h (ID1/ID2 placeholders on command side),
# data length, data bytes, and a trailing checksum (CKS). CKS = low-order byte of
# the sum of all preceding bytes. ID1 = projector control ID; ID2 = model code
# (appear in responses). Literal frames below are verbatim from the source.
# For parameterized commands, {DATA##} placeholders mark variable bytes; CKS must
# be recomputed for the actual payload.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). Full value list in source Appendix."
    notes: "Example to switch to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared on input/video signal switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared on input/video signal switch or volume adjustment."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared on input/video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see source Appendix for value list)"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target hi byte (96h documented = LAMP/LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target lo byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time, filter usage time. Usage time in seconds, updated per minute."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time and filter alarm start time (seconds). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp select (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)"
      - name: DATA02
        type: integer
        description: "Content (01h=usage time seconds, 04h=remaining life %)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD-type key code)"
      - name: DATA02
        type: integer
        description: "Key code high byte"
    notes: "Key code list documented in source (e.g. 05h 00h=AUTO, 06h 00h=MENU, POWER ON=02h 00h, POWER OFF=03h 00h, VOLUME UP=84h 00h, VOLUME DOWN=85h 00h, FREEZE=8Ah 00h, ASPECT=A3h 00h, LAMP MODE/ECO=EEh 00h, etc.)"

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (06h=Periphery Focus documented)"
      - name: DATA02
        type: integer
        description: "Drive content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s)"
    notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop by reissuing same command while driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (same values as 053. LENS CONTROL DATA01)"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (FFh=Stop)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute, 02h=relative)"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=Stop, mode/value are not referenced."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"
    notes: "Controls profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value (00h=OFF, 01h=ON)"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns lens operation status bitmap (lens memory, zoom, focus, lens shift H/V: 0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number (00h=Profile 1, 01h=Profile 2)"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, clock/sleep-timer function."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status (00h=Normal/opened, 01h=Cover closed)."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value (value list in source Appendix)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picturp_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco/light/lamp mode value (value list in source Appendix)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: DATA01-16
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT ... 03h=BOTTOM-RIGHT; sub input values per Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value (00h=OFF, 01h=ON)"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (value list in source Appendix)"
      - name: DATA02
        type: integer
        description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    description: "12-byte error status (DATA01-12) from 009. ERROR STATUS REQUEST. Bit set to 1 = error. Covers cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/interlock/system errors."
  - id: power_state
    type: enum
    values: [standby, power_on]
    description: "DATA03 of 078-2 RUNNING STATUS REQUEST (00h=Standby, 01h=Power on, FFh=Not supported)."
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "DATA06 of 078-2 (00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby)."
  - id: mute_status
    type: composite
    description: "078-4 MUTE STATUS REQUEST returns picture/sound/onscreen/forced-onscreen mute + onscreen display."
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    description: "078-6 COVER STATUS REQUEST."
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "037-4 / 037 lamp usage time (updated per minute)."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h); negative if replacement deadline exceeded."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "037-3 FILTER USAGE INFORMATION REQUEST."
  - id: lens_status
    type: bitmap
    description: "053-7 LENS INFORMATION REQUEST bitmap (lens memory/zoom/focus/lens shift H/V operation state)."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "053-11 LENS PROFILE REQUEST."
  - id: eco_mode
    type: enum
    description: "097-8 ECO MODE REQUEST value (value list in source Appendix)."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "097-243-1 EDGE BLENDING MODE REQUEST."
  - id: projector_name
    type: string
    description: "097-45 LAN PROJECTOR NAME REQUEST."
  - id: mac_address
    type: string
    description: "097-155 LAN MAC ADDRESS (6 bytes)."
  - id: model_name
    type: string
    description: "078-5 MODEL NAME REQUEST."
  - id: serial_number
    type: string
    description: "305-2 SERIAL NUMBER REQUEST."
  - id: gain_parameter
    type: composite
    description: "060-1 GAIN PARAMETER REQUEST 3 returns status, upper/lower limits, default, current value, wide/narrow adjustment width per gain name."
  - id: execution_result
    type: enum
    values: [success, error]
    description: "Two-byte result returned by set commands (0000h=success, other=error)."
  - id: command_error
    type: composite
    description: "Error response ERR1/ERR2 codes (see source error code list: unrecognized command, unsupported, invalid value, invalid input terminal, memory errors, power off, no authority, etc.)."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "030-1 PICTURE ADJUST DATA01=00h; range queryable via 060-1 (DATA01=00h)."
  - id: contrast
    type: integer
    description: "030-1 DATA01=01h; range via 060-1 (DATA01=01h)."
  - id: color
    type: integer
    description: "030-1 DATA01=02h; range via 060-1 (DATA01=02h)."
  - id: hue
    type: integer
    description: "030-1 DATA01=03h; range via 060-1 (DATA01=03h)."
  - id: sharpness
    type: integer
    description: "030-1 DATA01=04h; range via 060-1 (DATA01=04h)."
  - id: volume
    type: integer
    description: "030-2 VOLUME ADJUST; range via 060-1 (DATA01=05h)."
  - id: lamp_light_adjust
    type: integer
    description: "030-15 OTHER ADJUST (DATA01=96h); range via 060-1 (DATA01=96h)."
  - id: aspect
    type: enum
    description: "030-12 ASPECT ADJUST (value list in source Appendix)."
  - id: projector_name
    type: string
    max_length: 16
    description: "098-45 LAN PROJECTOR NAME SET."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source.
# All data is obtained via explicit request commands (polling model).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source:
# - POWER ON: while turning on, no other command accepted.
# - POWER OFF: during power-off incl. cooling time, no other command accepted.
# - Error code 02h 0Dh: command rejected when power is off.
# - DATA09 bit1 of error status: interlock switch is open (safety-relevant).
# UNRESOLVED: source does not document explicit confirmation/interlock procedures beyond the above command-acceptance constraints.
```

## Notes
- Binary frame protocol. Every frame ends with a checksum byte (CKS) = low-order byte of the sum of all preceding bytes.
- Response prefix byte indicates result type: `2xh` = success echo, `Axh` = error response (carries ERR1/ERR2). Success responses for data requests (`20h`/`23h`) include ID1/ID2, length, and data; action echoes (`22h`) omit data.
- ID1 (control ID) and ID2 (model code) are echoed in responses; commands send `00h` in those positions.
- Serial cable is a cross (null-modal) cable; pinout: 2↔3 (RxD/TxD), 7↔8 (RTS/CTS), 5=GND.
- Usage-time fields (lamp/filter) return seconds, updated at one-minute intervals.
- Many value tables (input terminal codes, aspect values, eco-mode values, signal-type codes, base-model-type codes, sub-input setting values) are referenced by the source to an "Appendix / Supplementary Information by Command" that is NOT present in the refined source text.

<!-- UNRESOLVED: input-terminal / aspect / eco-mode / signal-type / base-model-type / sub-input value tables not in refined source (referenced to a missing appendix). -->
<!-- UNRESOLVED: flow_control setting not stated (RTS/CTS pins wired but mode unspecified). -->
<!-- UNRESOLVED: default baud rate not stated (five rates listed as selectable). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: power/voltage/current specifications not in source. -->
````

Spec done. 53 commands enumerated verbatim, all hex payloads copied from source. Gaps marked UNRESOLVED: value tables in missing appendix, flow_control, default baud, firmware version, power specs.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:08:21.534Z
last_checked_at: 2026-06-19T07:49:44.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:49:44.881Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source; command opcodes and transport parameters match exactly. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power/voltage/current specifications not in source. Firmware version compatibility not stated. Input terminal value tables and key-code-to-input mappings are referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source."
- "flow_control setting not stated in source (RTS/CTS pins present on D-SUB 9P cable)"
- "no unsolicited notification mechanism documented in source."
- "no multi-step sequences described explicitly in source."
- "source does not document explicit confirmation/interlock procedures beyond the above command-acceptance constraints."
- "input-terminal / aspect / eco-mode / signal-type / base-model-type / sub-input value tables not in refined source (referenced to a missing appendix)."
- "flow_control setting not stated (RTS/CTS pins wired but mode unspecified)."
- "default baud rate not stated (five rates listed as selectable)."
- "firmware version compatibility not stated."
- "power/voltage/current specifications not in source."
- "value tables in missing appendix, flow_control, default baud, firmware version, power specs."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
