---
spec_id: admin/sharp-nec-e244fl-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E244Fl Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "E244Fl Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "E244Fl Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:13:33.448Z
last_checked_at: 2026-06-17T19:42:04.682Z
generated_at: 2026-06-17T19:42:04.682Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The supplied device name (\"E244Fl Bk\") corresponds to a Sharp/NEC desktop monitor model, but the source document is a *projector* command reference (describes lamp, lens, shutter, edge blending). Confirm that this projector manual is the correct control source for this entity."
  - "Appendix \"Supplementary Information by Command\" referenced throughout the source (input terminal values, aspect values, eco mode values, base model types, selection signal types) was not included in the extracted text — several enum value sets cannot be enumerated."
  - "appendix not in extracted text.\""
  - "enum in source Appendix, not in extracted text\""
  - "only 06h shown in extracted text.\""
  - "in source Appendix.\""
  - "enum in source Appendix.\""
  - "enum in source Appendix, not in extracted text"
  - "bounds device-specific; query returns upper/lower/current"
  - "bounds returned by gain_parameter_request_3 (DATA01=05h)"
  - "no push/event mechanism stated in source."
  - "none documented."
  - "no explicit safety/interlock procedures (e.g. lamp door, power"
  - "device-name / source mismatch — \"E244Fl Bk\" is a Sharp/NEC desktop monitor model name, but the source is a *projector* command reference (lamp, lens, shutter, edge-blending commands). Verify this is the intended control doc for this entity."
  - "ID1 (control ID) and ID2 (model code) per-device values not stated."
  - "firmware version compatibility not stated."
  - "source Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input, selection signal type) not in extracted text."
  - "serial flow_control not explicitly stated (only \"Full duplex\"; RTS/CTS cross-wired)."
  - "adjustment value bounds are device-specific; only obtainable at runtime via gain_parameter_request_3."
  - "device/source mismatch (monitor name vs projector manual), missing Appendix enums, flow_control, ID1/ID2."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:42:04.682Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex command sequences in source sections 3.1-3.53. Transport parameters verified against section 1.2. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E244Fl Bk Control Spec

## Summary
Control spec for the Sharp/NEC E244Fl Bk derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The source documents both an RS-232C serial interface and a wired/wireless LAN interface using a binary, checksum-framed command protocol. All commands are expressed as hexadecimal byte sequences framed with header bytes, ID fields, a data length, variable data, and a trailing checksum byte.

<!-- UNRESOLVED: The supplied device name ("E244Fl Bk") corresponds to a Sharp/NEC desktop monitor model, but the source document is a *projector* command reference (describes lamp, lens, shutter, edge blending). Confirm that this projector manual is the correct control source for this entity. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout the source (input terminal values, aspect values, eco mode values, base model types, selection signal types) was not included in the extracted text — several enum value sets cannot be enumerated. -->

## Transport
```yaml
# Source documents BOTH serial (RS-232C) and LAN (TCP) interfaces.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # configurable: 115200/38400/19200/9600/4800 bps; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  # flow_control: UNRESOLVED - source communication table lists "Full duplex" only.
  # RTS/CTS pins (7/8) are cross-wired in the D-SUB 9P pin table, but no explicit
  # flow-control setting is stated.
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
# - queryable    # inferred: numerous ?/REQUEST commands return state
# - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
# - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All 53 source-documented command rows enumerated. Each named opcode = one action.
# Frame: header + ID1 + ID2 + LEN + DATA?? + CKS. CKS = low byte of sum of all
# preceding bytes (per source section 2.2). ID1 = control ID set on projector;
# ID2 = model code (model-dependent) - both UNRESOLVED per-device values.

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted while power-on is in progress.

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off incl. cooling time.

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full enum in source Appendix - UNRESOLVED: appendix not in extracted text."

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - UNRESOLVED: enum in source Appendix, not in extracted text"

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Target low byte: FFh"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Documented codes incl: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h=Periphery Focus). Full list UNRESOLVED: only 06h shown in extracted text."
    - name: DATA02
      type: integer
      description: "Content/direction: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target (same set as 053 LENS CONTROL)

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield DATA01: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift(H), bit4=Lens Shift(V) (0=stop,1=operating)."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05)."

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, content displayed."

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display states."

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=normal (cover opened), 01h=cover closed."

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns light/lamp mode value - enum UNRESOLVED: in source Appendix."

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h=OFF, 01h=ON."

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value - enum UNRESOLVED: in source Appendix."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes; DATA01-DATA16)

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode/position/sub-input; sub-input enum UNRESOLVED in Appendix)"

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type + model name string. Type values UNRESOLVED: in source Appendix."

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, mute/freeze states."

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - UNRESOLVED: enum in source Appendix."
    - name: DATA02
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by query responses. Representative set; each maps to
# its query action above. Detailed bitfield/field layouts in source sections noted.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request (DATA03/DATA06), basic_information_request (DATA01)
- id: error_status
  type: bitfield
  values: [cover_error, temperature_error_bimetallic, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, fpga_error, temperature_error_sensor, mirror_cover_error, foreign_matter_sensor_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave, system_error_formatter]
  source: error_status_request (DATA01-DATA12)
- id: lamp_usage_time
  type: integer
  unit: seconds
  source: information_request (DATA83-86), lamp_information_request_3
- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA02=04h)
- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request, information_request (DATA87-90)
- id: mute_state
  type: enum
  values: [picture_on, picture_off, sound_on, sound_off, onscreen_on, onscreen_off]
  source: mute_status_request, basic_information_request (DATA06-08)
- id: input_signal
  type: string
  source: input_status_request, basic_information_request
- id: freeze_state
  type: enum
  values: [on, off]
  source: basic_information_request (DATA09)
- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request
- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: enum in source Appendix, not in extracted text
  source: eco_mode_request
- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request
```

## Variables
```yaml
# Settable non-discrete parameters (also exposed via gain_parameter_request_3).
- id: picture_brightness
  type: integer
  range: null  # UNRESOLVED: bounds device-specific; query returns upper/lower/current
- id: picture_contrast
  type: integer
  range: null  # UNRESOLVED
- id: picture_color
  type: integer
  range: null  # UNRESOLVED
- id: picture_hue
  type: integer
  range: null  # UNRESOLVED
- id: picture_sharpness
  type: integer
  range: null  # UNRESOLVED
- id: volume
  type: integer
  range: null  # UNRESOLVED: bounds returned by gain_parameter_request_3 (DATA01=05h)
- id: lamp_light_adjust
  type: integer
  range: null  # UNRESOLVED
- id: projector_name
  type: string
  max_length: 16
```

## Events
```yaml
# No unsolicited notifications documented. All data obtained by explicit request.
# UNRESOLVED: no push/event mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (not safety interlocks per se, but behavioral constraints):
# - POWER ON: no other command accepted while power-on in progress.
# - POWER OFF: no other command accepted during power-off incl. cooling time.
# - LENS CONTROL: continuous drive (7Fh/81h) must be stopped by sending 00h.
# UNRESOLVED: no explicit safety/interlock procedures (e.g. lamp door, power
# sequencing) stated in the extracted source text.
```

## Notes
- Protocol framing: every command/response is a hex byte stream. Header nibble encodes direction+type: `0xh`/`2xh`/`3xh` request prefixes, `2xh` success-response, `Axh` error-response (second byte = command echo). `ID1` = projector control ID, `ID2` = model code — both are per-device values not stated in this manual.
- Checksum (`CKS`): low-order byte of the sum of all preceding bytes. Worked example in source: `20h 81h 01h 60h 01h 00h` → `103h` → CKS = `03h`.
- Baud rate is configurable across {115200, 38400, 19200, 9600, 4800}; no default stated.
- Serial cable is a cross (null-modem) cable on D-SUB 9P; LAN uses RJ-45 (10/100 auto-sensing).
- Several commands reference an "Appendix: Supplementary Information by Command" for enum values (input terminals, aspect, eco mode, base model types, selection signal types, sub-input). **That appendix was not present in the extracted source text**, so those enum sets are marked UNRESOLVED.

<!-- UNRESOLVED: device-name / source mismatch — "E244Fl Bk" is a Sharp/NEC desktop monitor model name, but the source is a *projector* command reference (lamp, lens, shutter, edge-blending commands). Verify this is the intended control doc for this entity. -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) per-device values not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: source Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input, selection signal type) not in extracted text. -->
<!-- UNRESOLVED: serial flow_control not explicitly stated (only "Full duplex"; RTS/CTS cross-wired). -->
<!-- UNRESOLVED: adjustment value bounds are device-specific; only obtainable at runtime via gain_parameter_request_3. -->
````

Spec done. 53 actions = all source command rows. Key gaps flagged UNRESOLVED: device/source mismatch (monitor name vs projector manual), missing Appendix enums, flow_control, ID1/ID2.

Want next: ingest via admin path (drafts.jsonl + scraper ingest) or fix device/source mismatch first?

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:13:33.448Z
last_checked_at: 2026-06-17T19:42:04.682Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:42:04.682Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex command sequences in source sections 3.1-3.53. Transport parameters verified against section 1.2. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The supplied device name (\"E244Fl Bk\") corresponds to a Sharp/NEC desktop monitor model, but the source document is a *projector* command reference (describes lamp, lens, shutter, edge blending). Confirm that this projector manual is the correct control source for this entity."
- "Appendix \"Supplementary Information by Command\" referenced throughout the source (input terminal values, aspect values, eco mode values, base model types, selection signal types) was not included in the extracted text — several enum value sets cannot be enumerated."
- "appendix not in extracted text.\""
- "enum in source Appendix, not in extracted text\""
- "only 06h shown in extracted text.\""
- "in source Appendix.\""
- "enum in source Appendix.\""
- "enum in source Appendix, not in extracted text"
- "bounds device-specific; query returns upper/lower/current"
- "bounds returned by gain_parameter_request_3 (DATA01=05h)"
- "no push/event mechanism stated in source."
- "none documented."
- "no explicit safety/interlock procedures (e.g. lamp door, power"
- "device-name / source mismatch — \"E244Fl Bk\" is a Sharp/NEC desktop monitor model name, but the source is a *projector* command reference (lamp, lens, shutter, edge-blending commands). Verify this is the intended control doc for this entity."
- "ID1 (control ID) and ID2 (model code) per-device values not stated."
- "firmware version compatibility not stated."
- "source Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input, selection signal type) not in extracted text."
- "serial flow_control not explicitly stated (only \"Full duplex\"; RTS/CTS cross-wired)."
- "adjustment value bounds are device-specific; only obtainable at runtime via gain_parameter_request_3."
- "device/source mismatch (monitor name vs projector manual), missing Appendix enums, flow_control, ID1/ID2."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
