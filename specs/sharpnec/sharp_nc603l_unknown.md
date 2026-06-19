---
spec_id: admin/sharp-nec-nc603l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC603L Control Spec"
manufacturer: Sharp/NEC
model_family: NC603L
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC603L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:42:18.571Z
last_checked_at: 2026-06-18T08:34:44.037Z
generated_at: 2026-06-18T08:34:44.037Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are per-device values not fixed in source."
  - "flow control not stated in source (source states \"Full duplex\" communication mode only)"
  - "valid integer ranges for picture/volume/lamp adjust are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3; fixed min/max not stated in this manual."
  - "no event/notification section in source."
  - "no macros documented."
  - "source contains no explicit safety interlock procedures, power-on sequencing requirements, or confirmation-required operations beyond the command-acceptance notes above."
  - "firmware version compatibility not stated."
  - "control ID (ID1) default and model code (ID2) value not stated."
  - "serial flow control not stated (only \"Full duplex\" mode documented)."
  - "full enumerated value lists for input terminal, aspect, eco mode, and sub-input are in an Appendix not present in this source."
  - "picture/volume/lamp adjust min/max/default ranges — device-reported at runtime via 060-1, not fixed in manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:34:44.037Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC603L Control Spec

## Summary
The Sharp/NEC NC603L is a projector controllable via RS-232C serial or TCP/IP LAN (port 7142) using a binary hex command protocol. This spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are per-device values not fixed in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (source states "Full duplex" communication mode only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF present)
# - queryable       (many status/information request commands present)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 LAMP ADJUST)
# - routable        (018 INPUT SW CHANGE present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Notes on protocol framing (from source sec 2.1-2.2):
#  - Commands/responses are binary hex byte sequences.
#  - <ID1> = Control ID set on projector; <ID2> = model code (per-device).
#  - <CKS> = checksum = low-order byte of sum of all preceding bytes.
#  - Command opcodes listed below are the fixed leading bytes (e.g. "02h 00h ...").
#    Parameterized fields shown as {var}; checksum computed over full frame.
#  - All payloads below are verbatim from the source unless marked parameterized.

# --- 009. ERROR STATUS REQUEST (query) ---
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

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full value list. Example full frame for 06h: 02h 03h 00h 00h 02h 01h 06h 0Eh"
  notes: "Response DATA01=FFh means ended with error (no signal switch made)."

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example (brightness=-10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Value set for the aspect. See Appendix 'Supplementary Information by Command'."

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "FFh (for LAMP/LIGHT ADJUST target)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). See key code list."
    - name: data02
      type: integer
      description: "Key code high byte. See key code list."
  notes: "Key code list (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means error."

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target. Source documents 06h = Periphery Focus."
    - name: data02
      type: integer
      description: "Content/motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop. Response DATA01=FFh means error."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target. FFh=Stop (mode/value ignored). Other target values not enumerated in source for this command."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number set via 053-10 LENS PROFILE SET."

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Value set for the eco mode. See Appendix 'Supplementary Information by Command'."
  notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."
  notes: "DATA01-16 = projector name (up to 16 bytes)."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input values per Appendix."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# --- 037. INFORMATION REQUEST (query) ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST (query) ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 (query) ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative if replacement deadline exceeded."

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST (query) ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999). Example (2460.06375kg): 23h 9Ah <ID1> <ID2> 09h 00h 9Ch 90h 00h 00h 06h F9h 00h 00h <CKS>"

# --- 053-1. LENS CONTROL REQUEST (query) ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens target (same target values as 053 LENS CONTROL).
  notes: "Returns upper/lower limits and current value (16-bit each)."

# --- 053-5. LENS MEMORY OPTION REQUEST (query) ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns setting value 00h=OFF, 01h=ON."

# --- 053-7. LENS INFORMATION REQUEST (query) ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

# --- 053-11. LENS PROFILE REQUEST (query) ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

# --- 060-1. GAIN PARAMETER REQUEST 3 (query) ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current, wide/narrow adjustment widths."

# --- 078-1. SETTING REQUEST (query) ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05)."

# --- 078-2. RUNNING STATUS REQUEST (query) ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power status (00h=Standby,01h=Power on), DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

# --- 078-3. INPUT STATUS REQUEST (query) ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (practical = returned+1), selection signal type, test pattern, content displayed."

# --- 078-4. MUTE STATUS REQUEST (query) ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display."

# --- 078-5. MODEL NAME REQUEST (query) ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST (query) ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

# --- 084. INFORMATION STRING REQUEST (query) ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST (query) ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST (query) ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 (query) ---
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Example MAC 01h-23h-45h-67h-89h-ABh response: 23h B0h <ID1> <ID2> 08h 9Ah 00h 01h 23h 45h 67h 89h ABh <CKS>"

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST (query) ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST (query) ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 305-1. BASE MODEL TYPE REQUEST (query) ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST (query) ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST (query) ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
# Query responses are device-state-dependent binary frames (see Actions notes).
# Representative feedback shapes derived from documented response payloads:

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST / 305-3 BASIC INFORMATION REQUEST (DATA03/DATA01 operation status)"

- id: error_state
  type: bitmask
  description: "12-byte error information bitmap from 009 ERROR STATUS REQUEST (DATA01-DATA12). Bits encode cover, fan, temperature, lamp, formatter, FPGA, mirror cover, interlock, system errors."

- id: mute_state
  type: object
  description: "078-4 MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen mute + onscreen display flags."

- id: lens_operation_state
  type: bitmask
  description: "053-7 LENS INFORMATION REQUEST DATA01: lens memory/zoom/focus/lens-shift H+V stop-or-operating."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST"
```

## Variables
```yaml
# Settable parameters exposed via dedicated adjust commands (also represented as Actions).
# Listed here as the canonical settable variables.

- id: picture_brightness
  type: integer
  command: "030-1 PICTURE ADJUST (DATA01=00h)"

- id: picture_contrast
  type: integer
  command: "030-1 PICTURE ADJUST (DATA01=01h)"

- id: picture_color
  type: integer
  command: "030-1 PICTURE ADJUST (DATA01=02h)"

- id: picture_hue
  type: integer
  command: "030-1 PICTURE ADJUST (DATA01=03h)"

- id: picture_sharpness
  type: integer
  command: "030-1 PICTURE ADJUST (DATA01=04h)"

- id: volume
  type: integer
  command: "030-2 VOLUME ADJUST"

- id: aspect
  type: integer
  command: "030-12 ASPECT ADJUST"

- id: lamp_light_level
  type: integer
  command: "030-15 OTHER ADJUST (LAMP/LIGHT ADJUST)"

- id: eco_mode
  type: integer
  command: "098-8 ECO MODE SET"

- id: lan_projector_name
  type: string
  command: "098-45 LAN PROJECTOR NAME SET"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  command: "098-243-1 EDGE BLENDING MODE SET"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  command: "053-10 LENS PROFILE SET"

# UNRESOLVED: valid integer ranges for picture/volume/lamp adjust are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3; fixed min/max not stated in this manual.
```

## Events
```yaml
# No unsolicited notifications documented in source. Device responds only to commands.
# UNRESOLVED: no event/notification section in source.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "015 POWER ON: while powering on, no other command accepted."
  - "016 POWER OFF: while powering off (incl. cooling time), no other command accepted."
  - "009 ERROR STATUS REQUEST exposes an interlock-switch-open bit (DATA09 Bit1) and system error bits (DATA09 Bit2/Bit3) that indicate fault conditions."
# UNRESOLVED: source contains no explicit safety interlock procedures, power-on sequencing requirements, or confirmation-required operations beyond the command-acceptance notes above.
```

## Notes
- Protocol is binary hex; all commands/responses are byte sequences, not ASCII.
- Framing: first byte is a message-type/opcode prefix (`00h`/`01h`/`02h`/`03h` = command classes; `20h`/`21h`/`22h`/`23h` = successful-response counterparts; `A0h`-`A3h` = error-response counterparts). `<ID1>` = control ID set on projector, `<ID2>` = model code; both per-device values not fixed in source.
- Checksum `<CKS>` = low-order byte of the sum of all preceding bytes (see source sec 2.2 example).
- Serial: RS-232C cross cable on PC CONTROL port (D-SUB 9P). LAN: RJ-45, TCP port 7142. Wireless LAN also supported via separate wireless LAN unit (see operation manual).
- Baud rate is selectable among 4800/9600/19200/38400/115200 bps; spec lists 115200 as the default value field but device configuration determines the active rate.
- Many input-terminal, aspect, eco-mode, and sub-input value tables are referenced to an "Appendix: Supplementary Information by Command" not included in this refined source; those enums are marked as Appendix-referenced in the relevant params.
- Error responses use `<ERR1> <ERR2>` code pairs (see source sec 2.4); e.g. `02h 0Dh` = "command cannot be accepted because the power is off".

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: control ID (ID1) default and model code (ID2) value not stated. -->
<!-- UNRESOLVED: serial flow control not stated (only "Full duplex" mode documented). -->
<!-- UNRESOLVED: full enumerated value lists for input terminal, aspect, eco mode, and sub-input are in an Appendix not present in this source. -->
<!-- UNRESOLVED: picture/volume/lamp adjust min/max/default ranges — device-reported at runtime via 060-1, not fixed in manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:42:18.571Z
last_checked_at: 2026-06-18T08:34:44.037Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:34:44.037Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are per-device values not fixed in source."
- "flow control not stated in source (source states \"Full duplex\" communication mode only)"
- "valid integer ranges for picture/volume/lamp adjust are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3; fixed min/max not stated in this manual."
- "no event/notification section in source."
- "no macros documented."
- "source contains no explicit safety interlock procedures, power-on sequencing requirements, or confirmation-required operations beyond the command-acceptance notes above."
- "firmware version compatibility not stated."
- "control ID (ID1) default and model code (ID2) value not stated."
- "serial flow control not stated (only \"Full duplex\" mode documented)."
- "full enumerated value lists for input terminal, aspect, eco mode, and sub-input are in an Appendix not present in this source."
- "picture/volume/lamp adjust min/max/default ranges — device-reported at runtime via 060-1, not fixed in manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
