---
spec_id: admin/sharp-nec-xp-a175u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A175U W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A175U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A175U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:38:36.414Z
last_checked_at: 2026-06-19T07:49:43.226Z
generated_at: 2026-06-19T07:49:43.226Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for Xp A175U W not stated — varies by model, must be read from device."
  - "default control ID (ID1) not stated."
  - "firmware version compatibility range not stated."
  - "input terminal DATA01 value map and aspect/eco-mode value maps live in an Appendix (\"Supplementary Information by Command\") not included in the refined source."
  - "full DATA01 lens-target map truncated in refined source (only 06h Periphery Focus shown)"
  - "enum values not in refined source"
  - "ID1 control ID and ID2 model code values not stated for this model."
  - "input-terminal DATA01 value map, aspect value map, eco-mode value map, sub-input map, base-model-type values all live in source Appendix \"Supplementary Information by Command\" — not present in refined text."
  - "053 LENS CONTROL DATA01 target map truncated (only 06h Periphery Focus shown)."
  - "voltage/current/power specs, firmware compatibility range, protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:49:43.226Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands matched verbatim against source with correct parameter shapes; transport parameters (port 7142, baud rates, serial settings) verified; source command catalogue fully represented (1:1 coverage). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A175U W Control Spec

## Summary
Sharp/NEC Xp A175U W LCD projector. Control via RS-232C serial (D-SUB 9P PC CONTROL) and TCP/IP LAN (wired RJ-45 or optional wireless LAN unit). Binary hex protocol with frame checksum. Covers full command catalogue from "Projector Control Command Reference Manual" (BDT140013 Rev 7.1): power, input switch, mutes, picture/volume/aspect/gain adjust, lens control + memory, status/error/information queries, eco/edge-blend/PIP/PbP, remote key code, audio select.

<!-- UNRESOLVED: model code (ID2) value for Xp A175U W not stated — varies by model, must be read from device. -->
<!-- UNRESOLVED: default control ID (ID1) not stated. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: input terminal DATA01 value map and aspect/eco-mode value maps live in an Appendix ("Supplementary Information by Command") not included in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists selectable rates 115200/38400/19200/9600/4800 bps; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source does not state flow control mode (RTS/CTS pins are wired)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
- levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
- queryable    # inferred: extensive status/information request commands
```

## Actions
```yaml
# Binary protocol. Command frames verbatim from source. Parameters:
#   ID1 = control ID set on projector; ID2 = model code (varies by model);
#   CKS = checksum = low-order byte of sum of all preceding bytes.
# Response ack frames begin 2xh; error response frames begin Axh (carry ERR1/ERR2).

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
- id: input_switch_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video port). Full map in source Appendix; not included in refined text."
  notes: "Example (select video, DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
      type: string
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits"
  notes: "Example brightness=+10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data02
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data03
      type: string
      description: "Adjustment value high-order 8 bits"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value - full map in source Appendix; not in refined text"

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte - source documents 96h for LAMP/LIGHT ADJUST"
    - name: data02
      type: string
      description: "Adjustment target low byte - source documents FFh"
    - name: data03
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data04
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data05
      type: string
      description: "Adjustment value high-order 8 bits"

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time sec (DATA01-04) and filter alarm start time sec (DATA05-08). -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h lamp usage time (sec), 04h lamp remaining life (%)"
  notes: "Remaining life is negative if replacement deadline exceeded. Example (lamp1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD). See key code list."
    - name: data02
      type: string
      description: "Key code high byte. See key code list."
  notes: |
    Key code list (key, DATA01, DATA02, name):
    2=02h/00h POWER ON; 3=03h/00h POWER OFF; 5=05h/00h AUTO; 6=06h/00h MENU;
    7=07h/00h UP; 8=08h/00h DOWN; 9=09h/00h RIGHT; 10=0Ah/00h LEFT;
    11=0Bh/00h ENTER; 12=0Ch/00h EXIT; 13=0Dh/00h HELP; 15=0Fh/00h MAGNIFY UP;
    16=10h/00h MAGNIFY DOWN; 19=13h/00h MUTE; 41=29h/00h PICTURE;
    75=4Bh/00h COMPUTER1; 76=4Ch/00h COMPUTER2; 79=4Fh/00h VIDEO1;
    81=51h/00h S-VIDEO1; 132=84h/00h VOLUME UP; 133=85h/00h VOLUME DOWN;
    138=8Ah/00h FREEZE; 163=A3h/00h ASPECT; 215=D7h/00h SOURCE; 238=EEh/00h LAMP MODE/ECO.
    Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h

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
      type: string
      description: "Lens target. Source documents 06h = Periphery Focus. Other target values truncated in refined source."
    - name: data02
      type: string
      description: "Motion: 00h Stop; 01h +1s; 02h +0.5s; 03h +0.25s; 7Fh drive +; 81h drive -; FDh -0.25s; FEh -0.5s; FFh -1s"
  notes: "Send 00h after 7Fh/81h to stop continuous drive. Same command may be issued without stop while lens is driving."
  # UNRESOLVED: full DATA01 lens-target map truncated in refined source (only 06h Periphery Focus shown)

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (same space as 053 LENS CONTROL DATA01)"
  notes: "Returns upper/lower limit + current value (DATA02-07)."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh = Stop; otherwise lens target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits"
  notes: "If DATA01=FFh (Stop), mode/value not referenced."

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Acts on profile number selected via 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Returns setting value DATA02: 00h OFF, 01h ON."

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h OFF, 01h ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift(H), bit4 Lens Shift(V); 0=Stop,1=During operation."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h Profile 1, 01h Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h Profile 1, 01h Profile 2."

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Returns DATA01 status, upper/lower/default/current limits, wide/narrow widths. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

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
  notes: "DATA03 Power status (00h Standby, 01h Power on, FFh Not supported); DATA04 Cooling; DATA05 Power On/Off process; DATA06 Operation status (00h Standby(Sleep), 04h Power on, 05h Cooling, 06h Standby(error), 0Fh Standby(Power saving), 10h Network standby)."

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (practical = returned + 1), selection signal type 1/2, signal list type, test pattern, content displayed."

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 Picture mute, DATA02 Sound mute, DATA03 Onscreen mute, DATA04 Forced onscreen mute, DATA05 Onscreen display (each 00h Off / 01h On)."

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
  notes: "DATA01: 00h Normal (cover opened), 01h Cover closed."

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h Freeze on, 02h Freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light/Lamp mode per model). Value map in source Appendix."

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h OFF, 01h ON."

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value - full map in source Appendix; not in refined text"

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (MODE: 00h PIP/01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input map in Appendix)"

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h OFF, 01h ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

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
  notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal - full map in source Appendix; not in refined text"
    - name: data02
      type: string
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Response framing: success ack = 2xh frames; data response = 2xh with DATA bytes;
# error response = Axh frames carrying ERR1/ERR2 + CKS. ERR1/ERR2 codes per source error list.

- id: power_state
  type: enum
  values: [standby, power_on]
  source: "078-2 RUNNING STATUS REQUEST DATA03; 00h=Standby, 01h=Power on"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: error_status
  type: bitmap
  source: "009 ERROR STATUS REQUEST DATA01-12"
  notes: "Bits encode cover/fan/temperature/power/lamp/formatter/mirror-cover/iris/interlock/system errors. DATA09 bit1 = interlock switch open."

- id: input_status
  type: object
  source: "078-3 INPUT STATUS REQUEST"

- id: mute_status
  type: object
  source: "078-4 DATA01-05 (picture/sound/onscreen/forced-onscreen/OSD)"

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lamp_info
  type: object
  source: "037-4 LAMP INFORMATION REQUEST 3 (usage time sec, remaining life %)"

- id: filter_usage
  type: object
  source: "037-3 (usage time sec, alarm start time sec)"

- id: carbon_savings
  type: object
  source: "037-6 (kg + mg components)"

- id: projector_info
  type: object
  source: "037 (name, lamp usage sec, filter usage sec)"

- id: gain_parameter
  type: object
  source: "060-1 (limits, default, current, widths)"

- id: eco_mode
  type: enum
  source: "097-8 (value map in Appendix)"
  # UNRESOLVED: enum values not in refined source

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"

- id: lens_info
  type: bitmap
  source: "053-7 DATA01 (memory/zoom/focus/shift-H/shift-V motion state)"

- id: lens_control_value
  type: object
  source: "053-1 (upper/lower/current)"

- id: lens_memory_option
  type: enum
  values: [off, on]
  source: "053-5"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 DATA01"

- id: pip_pbp
  type: object
  source: "097-198 (mode/start-position/sub-inputs)"

- id: mac_address
  type: string
  source: "097-155 DATA01-06"

- id: projector_name
  type: string
  source: "097-45 / 037 DATA01-N"

- id: model_name
  type: string
  source: "078-5 DATA01-32"

- id: serial_number
  type: string
  source: "305-2 DATA01-16"

- id: base_model_type
  type: string
  source: "305-1 DATA01-02 / DATA12-13"

- id: setting
  type: object
  source: "078-1 (base model type, sound fn, profile/clock fn)"

- id: basic_information
  type: object
  source: "305-3 (operation status, signal type, mutes, freeze)"

- id: sync_frequency
  type: object
  source: "084 DATA01=03h horizontal, 04h vertical"
```

## Variables
```yaml
# All adjustments are issued as discrete command actions (030-1/030-2/030-12/030-15, lens cmds),
# not via a separate variable namespace. Current values are readable via 060-1 GAIN PARAMETER REQUEST 3.
# No additional settable variable namespace documented.
```

## Events
```yaml
# None documented. All responses are solicited (reply to a command). No unsolicited push notifications described.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling time) no other command accepted
  - power_on   # source: during power-on no other command accepted
interlocks:
  - "DATA09 bit1 of ERROR STATUS REQUEST (009): interlock switch open → reported as error"
  - "Cover error, fan error, temperature error (bi-metallic + sensor), mirror cover error, lens-not-installed reported via error status bits"
power_sequencing:
  - "POWER ON (015) and POWER OFF (016) block all other commands for the duration of the power transition / cooling period"
notes: "Error conditions surfaced only by polling 009 ERROR STATUS REQUEST; no unsolicited fault event."
```

## Notes
- Protocol is binary hex frames over RS-232C (D-SUB 9P, cross cable) or TCP port 7142. Full-duplex serial.
- Checksum = low-order byte of the sum of all preceding bytes (incl. the leading opcode byte). Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- Command frames shown are the literal host→projector bytes. Ack frames begin `2xh`; error frames begin `Axh` and carry ERR1/ERR2.
- ID1 = projector control ID (configurable on device); ID2 = model code (varies per model). Neither is given for Xp A175U W in source — must be read from the device (e.g. via 078-5 / 305-1 / 305-2).
- Lamp/filter usage times update at 1-minute intervals though returned in 1-second units.
- Error code pairs (ERR1/ERR2) catalogued in source §2.4 (e.g. 00h/00h unrecognized command; 02h/0Dh power off; 02h/0Fh no authority; 03h/02h adjustment failed).

<!-- UNRESOLVED: ID1 control ID and ID2 model code values not stated for this model. -->
<!-- UNRESOLVED: input-terminal DATA01 value map, aspect value map, eco-mode value map, sub-input map, base-model-type values all live in source Appendix "Supplementary Information by Command" — not present in refined text. -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 target map truncated (only 06h Periphery Focus shown). -->
<!-- UNRESOLVED: voltage/current/power specs, firmware compatibility range, protocol version not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:38:36.414Z
last_checked_at: 2026-06-19T07:49:43.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:49:43.226Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands matched verbatim against source with correct parameter shapes; transport parameters (port 7142, baud rates, serial settings) verified; source command catalogue fully represented (1:1 coverage). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for Xp A175U W not stated — varies by model, must be read from device."
- "default control ID (ID1) not stated."
- "firmware version compatibility range not stated."
- "input terminal DATA01 value map and aspect/eco-mode value maps live in an Appendix (\"Supplementary Information by Command\") not included in the refined source."
- "full DATA01 lens-target map truncated in refined source (only 06h Periphery Focus shown)"
- "enum values not in refined source"
- "ID1 control ID and ID2 model code values not stated for this model."
- "input-terminal DATA01 value map, aspect value map, eco-mode value map, sub-input map, base-model-type values all live in source Appendix \"Supplementary Information by Command\" — not present in refined text."
- "053 LENS CONTROL DATA01 target map truncated (only 06h Periphery Focus shown)."
- "voltage/current/power specs, firmware compatibility range, protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
