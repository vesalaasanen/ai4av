---
spec_id: admin/sharp-nec-pnm432
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PNM432 Control Spec"
manufacturer: Sharp/NEC
model_family: PNM432
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PNM432
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:24:07.179Z
last_checked_at: 2026-06-18T09:10:32.287Z
generated_at: 2026-06-18T09:10:32.287Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" (input terminal enum values, aspect values, eco mode values, base model type values, sub input values) not included in refined source — several enum param ranges reference it."
  - "not stated in source (communication mode listed as \"Full duplex\")"
  - "appendix not in source).\""
  - "source describes no unsolicited notifications; all responses are replies to commands."
  - "source documents no named multi-step macro sequences."
  - "no explicit safety interlock procedures or power-on sequencing"
  - "appendix \"Supplementary Information by Command\" not in source — input terminal, aspect, eco mode, base model type, and sub input enum ranges unspecified."
  - "firmware version compatibility not stated in source."
  - "serial flow_control not stated (only \"Full duplex\" comm mode)."
  - "ID2 model code value for PNM432 not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:10:32.287Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PNM432 Control Spec

## Summary
Sharp/NEC PNM432 projector controlled via binary hex protocol over TCP (port 7142) or RS-232C serial (D-SUB 9P). Frames carry control ID, model code, and a low-byte additive checksum. Covers power, input switching, mutes, lens (shift/zoom/focus/memory), picture/volume adjust, eco mode, edge blending, PiP/PbP, freeze, shutter, and status/error queries.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal enum values, aspect values, eco mode values, base model type values, sub input values) not included in refined source — several enum param ranges reference it. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in source (communication mode listed as "Full duplex")
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015. POWER ON / 016. POWER OFF
  - queryable       # inferred from numerous REQUEST commands
  - levelable       # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable        # inferred from 018. INPUT SW CHANGE
```

## Actions
```yaml
# All command/response payloads are hex bytes, verbatim from source.
# Frame legend:
#   <ID1> = control ID set on projector
#   <ID2> = model code (varies by model)
#   <CKS> = checksum = low-order one byte of sum of all preceding bytes
#   <DATA??> = variable-length data per command
# Response prefixes: 2xh = success (group code mirrors command group), Axh = error (with ERR1/ERR2).
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>; DATA1-12 = 12 bytes of bitfield error info (0=normal, 1=error)"

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
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value; e.g. 06h = Video port. Full enum in appendix (UNRESOLVED: appendix not in source)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

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

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value; full enum in appendix (UNRESOLVED: appendix not in source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target; DATA01=96h with DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Adjustment target sub-code (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response carries 98 bytes: DATA01-49=Projector name, DATA83-86=Lamp usage time(s), DATA87-90=Filter usage time(s). Updated at 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04=Filter usage time(s), DATA05-08=Filter alarm start time(s); -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=Lamp usage time(s), 04h=Lamp remaining life(%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD-type key code)"
      - name: DATA02
        type: byte
        description: "Key code high byte"
    notes: "Key code table (DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO."

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target; source lists 06h=Periphery Focus"
      - name: DATA02
        type: byte
        description: "Drive command: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h, send 00h to stop. Lens may be re-driven without stop while in motion."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (see 053 LENS CONTROL)"
    notes: "Response DATA02-07: upper limit lo/hi, lower limit lo/hi, current value lo/hi."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target; FFh=Stop (mode/value ignored)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Response DATA02: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop,1=During operation); bits 5-7 reserved."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: "Response: DATA01=status(00h not displayable,01h not adjustable,02h adjustable,FFh no such gain), DATA02-13 limits/defaults/current/wide/narrow widths, DATA14 default valid flag."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response: DATA01-03=Base model type (appendix values), DATA04=Sound function(00h no/01h yes), DATA05=Profile(00h none/01h clock/02h sleep/03h clock+sleep)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response: DATA03=Power(00h Standby/01h Power on/FFh unsupported), DATA04=Cooling process, DATA05=Power On/Off process, DATA06=Operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Power saving, 10h Network standby)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response: DATA01=Signal switch process, DATA02=Signal list number (returned as value-1), DATA03=Selection signal type 1, DATA04=Selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER 6-10, 07h VIEWER 1-5), DATA05=Signal list type, DATA06=Test pattern display, DATA09=Content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (00h off/01h on each)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32 = model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=Freeze ON, 02h=Freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Response DATA01 = eco mode value; enum in appendix (UNRESOLVED)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17 = projector name (NUL-terminated)."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06 = MAC address bytes."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value; enum in appendix (UNRESOLVED)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    params:
      - name: DATA01-16
        type: bytes
        description: "Projector name, up to 16 bytes"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value; MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub input values per appendix (UNRESOLVED)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response DATA01-02 and DATA12-13 = base model type codes (appendix), DATA03-11 = model name (NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16 = serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response: DATA01=Operation status, DATA02=Content displayed, DATA03-04=Selection signal type 1/2, DATA05=Display signal type, DATA06=Video mute, DATA07=Sound mute, DATA08=Onscreen mute, DATA09=Freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (appendix; UNRESOLVED)."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable state values mirrored from query responses.
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06; 305-3 BASIC INFORMATION REQUEST DATA01"

  - id: picture_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01"

  - id: sound_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA02"

  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA03"

  - id: freeze_state
    type: enum
    values: [off, on]
    source: "305-3 BASIC INFORMATION REQUEST DATA09"

  - id: cover_state
    type: enum
    values: [normal_open, closed]
    source: "078-6 COVER STATUS REQUEST DATA01"

  - id: shutter_state
    type: enum
    values: [open, closed]
    source: "051 SHUTTER CLOSE / 052 SHUTTER OPEN"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST DATA01"

  - id: input_signal
    type: string
    source: "078-3 INPUT STATUS REQUEST"

  - id: lamp_usage_hours
    type: number
    source: "037-4 LAMP INFORMATION REQUEST 3 (seconds / 3600)"

  - id: lamp_remaining_life_pct
    type: number
    source: "037-4 LAMP INFORMATION REQUEST 3 DATA02=04h; negative if past deadline"

  - id: filter_usage_hours
    type: number
    source: "037-3 FILTER USAGE INFORMATION REQUEST (seconds / 3600)"

  - id: error_status
    type: bytes
    source: "009 ERROR STATUS REQUEST - 12-byte bitfield"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=00h); query via 060-1 (DATA01=00h)"
  - id: contrast
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=01h)"
  - id: color
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=02h)"
  - id: hue
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=03h)"
  - id: sharpness
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=04h)"
  - id: volume
    type: integer
    source: "030-2 VOLUME ADJUST"
  - id: lamp_light_adjust
    type: integer
    source: "030-15 OTHER ADJUST (DATA01=96h DATA02=FFh)"
  - id: projector_name
    type: string
    source: "098-45 LAN PROJECTOR NAME SET (max 16 bytes)"
  - id: eco_mode
    type: byte
    source: "098-8 ECO MODE SET (enum in appendix; UNRESOLVED)"
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "POWER OFF locks command acceptance during cooling period (see 016)."
  - "POWER ON locks command acceptance during power-on sequence (see 015)."
  - "Error bitfield (009) reports cover, fan, temperature, lamp, mirror-cover, foreign-matter sensor and interlock switch states; treat as health indicators, not safety interlocks to drive."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements stated in the source beyond the lockout notes above.
```

## Notes
- Binary protocol: every frame's final byte before `<CKS>` is summed; checksum = low byte of sum.
- Response prefixes by group: success = `2xh` mirroring command group; error = `Axh` carrying `<ERR1> <ERR2>`.
- Lamp/filter usage time returned in seconds, refreshed at 1-minute granularity.
- Many enum value tables (input terminals, aspect, eco mode, base model type, sub input) live in a referenced appendix "Supplementary Information by Command" that is not present in the refined source text.
- ID2 (model code) varies by model — set from projector configuration; not enumerated here.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not in source — input terminal, aspect, eco mode, base model type, and sub input enum ranges unspecified. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow_control not stated (only "Full duplex" comm mode). -->
<!-- UNRESOLVED: ID2 model code value for PNM432 not stated in source. -->
````

53 actions emitted (matches all rows in §2 command list + §3 detail). Unresolved marked for appendix enums, flow_control, firmware, ID2.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:24:07.179Z
last_checked_at: 2026-06-18T09:10:32.287Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:10:32.287Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" (input terminal enum values, aspect values, eco mode values, base model type values, sub input values) not included in refined source — several enum param ranges reference it."
- "not stated in source (communication mode listed as \"Full duplex\")"
- "appendix not in source).\""
- "source describes no unsolicited notifications; all responses are replies to commands."
- "source documents no named multi-step macro sequences."
- "no explicit safety interlock procedures or power-on sequencing"
- "appendix \"Supplementary Information by Command\" not in source — input terminal, aspect, eco mode, base model type, and sub input enum ranges unspecified."
- "firmware version compatibility not stated in source."
- "serial flow_control not stated (only \"Full duplex\" comm mode)."
- "ID2 model code value for PNM432 not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
