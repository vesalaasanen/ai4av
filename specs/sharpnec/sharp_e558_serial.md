---
spec_id: admin/sharp-nec-e558
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E558 Control Spec"
manufacturer: Sharp/NEC
model_family: E558
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E558
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:34:18.115Z
last_checked_at: 2026-06-17T19:44:57.934Z
generated_at: 2026-06-17T19:44:57.934Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name not printed in the refined source excerpt (supplied via input device context). Specific model confirmation, firmware range, and voltage/power specs are not present in this document."
  - "flow control not stated (source only states \"Communication mode: Full duplex\")"
  - "source describes only request/response semantics; no push/event mechanism stated."
  - "populate if a later source documents macro sequences."
  - "this refined source excerpt contains no explicit safety warnings,"
  - "- Model name \"E558\" not printed in the refined source excerpt (supplied via input context); the source is the generic Sharp/NEC projector command reference BDT140013 Rev 7.1."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:44:57.934Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched exactly against source with correct hex opcodes, parameter structures, and transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E558 Control Spec

## Summary
Control spec for the Sharp/NEC E558 large-screen display, based on the Sharp/NEC Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device is controllable over RS-232C serial and over wired/wireless LAN using a binary hex-byte command frame with a trailing checksum byte. Covers power, input switching, picture/volume/aspect adjustment, mutes, lens/shutter control, lens memory, status queries, and LAN/PIP/edge-blend settings.

<!-- UNRESOLVED: model name not printed in the refined source excerpt (supplied via input device context). Specific model confirmation, firmware range, and voltage/power specs are not present in this document. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Source documents BOTH a serial (PC CONTROL / D-SUB 9P) connection and a LAN
# connection (wired RJ-45 and wireless). Both are explicit, so both emitted.
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source lists all five as selectable; pick one to match software config
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (source only states "Communication mode: Full duplex")
  duplex: full  # explicit in source
addressing:
  port: 7142  # explicit: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015 POWER ON / 016 POWER OFF
  - routable        # inferred from 018 INPUT SW CHANGE
  - queryable       # inferred from numerous status request commands (009, 037, 078, 097, 305)
  - levelable       # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
```

## Actions
```yaml
# Framing: every command is a hex-byte frame. Last byte CKS is a checksum =
# low-order 8 bits of the sum of all preceding bytes. <ID1>=control ID, <ID2>=model
# code (value varies by model). Fixed commands below show the literal checksum
# verbatim from the source; parameterized commands show the template with the
# variable DATA byte(s) and the computed CKS placeholder.
#
# Source lists each numbered command as a distinct row - emitted one action each.
# Coverage: all 53 command-bearing entries from the source command list.

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
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video). Full value list is in source Appendix 'Supplementary Information by Command'."
    - name: cks
      type: integer
      description: Computed checksum byte (low 8 bits of sum of preceding bytes).
  notes: "Source example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
    - name: cks
      type: integer
      description: Computed checksum byte.

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
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Source example setting volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value (see source Appendix 'Supplementary Information by Command')"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target high byte (96h) / DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 037. INFORMATION REQUEST (query) ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST (query) ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 (query) ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST (query) ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see source Key code list: e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 0Dh=HELP, 85h=VOLUME DOWN, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys).
    - name: cks
      type: integer
      description: Computed checksum byte.

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
      description: "Adjustment target (e.g. 06h=Periphery Focus; other lens axes listed in source)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h/02h/03h=drive + for 1s/0.5s/0.25s, 7Fh=drive +, 81h=drive -, FDh/FEh/FFh=drive - for 0.25s/0.5s/1s"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-1. LENS CONTROL REQUEST (query) ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target byte.
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (acts on profile set via 053-10)"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-5. LENS MEMORY OPTION REQUEST (query) ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-7. LENS INFORMATION REQUEST (query) ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-11. LENS PROFILE REQUEST (query) ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 (query) ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 078-1. SETTING REQUEST (query) ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST (query) ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST (query) ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST (query) ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 084. INFORMATION STRING REQUEST (query) ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
    - name: cks
      type: integer
      description: Computed checksum byte.

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
- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST (query) ---
- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 097-243-1. EDGE BLENDING MODE REQUEST (query) ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value (see source Appendix 'Supplementary Information by Command')"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data16} 00h {cks}"
  params:
    - name: name_bytes
      type: string
      description: "Projector name (DATA01-DATA16, up to 16 bytes, NUL-terminated)"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PBP; START POSITION: 00h-03h corners; sub input value per Appendix)"
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: integer
      description: Computed checksum byte.

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

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal (value list in source Appendix 'Supplementary Information by Command')"
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: integer
      description: Computed checksum byte.
```

## Feedbacks
```yaml
# One entry per observable state / query response payload described in source.
- id: error_status
  type: bitfield
  description: "12-byte error status (DATA01-DATA12). Bit=0 normal, Bit=1 error. Covers cover/fan/temperature/power/lamp/ formatter/mirror-cover/interlock/system errors (see source error information list)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From RUNNING STATUS REQUEST DATA03/DATA06 and BASIC INFORMATION REQUEST DATA01."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]

- id: input_signal_status
  type: object
  description: "INPUT STATUS REQUEST: signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status
  type: object
  description: "MUTE STATUS REQUEST DATA01-05: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

- id: model_name
  type: string
  description: "MODEL NAME REQUEST DATA01-32 (NUL-terminated)."

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]

- id: projector_info
  type: object
  description: "INFORMATION REQUEST DATA01-98: projector name, lamp usage time (s), filter usage time (s)."

- id: filter_usage
  type: object
  description: "FILTER USAGE INFORMATION REQUEST: filter usage time (s), filter alarm start time (s). -1 if undefined."

- id: lamp_info
  type: object
  description: "LAMP INFORMATION REQUEST 3: lamp usage time (s) or remaining life (%). Negative remaining life if replacement deadline exceeded."

- id: carbon_savings
  type: object
  description: "CARBON SAVINGS INFORMATION REQUEST: total/operation carbon savings in kg and mg."

- id: lens_position
  type: object
  description: "LENS CONTROL REQUEST: upper/lower limits and current value (16-bit) for requested lens axis."

- id: lens_info
  type: bitfield
  description: "LENS INFORMATION REQUEST DATA01: per-axis operation state (lens memory, zoom, focus, lens shift H/V)."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: lens_memory_option
  type: object
  description: "LENS MEMORY OPTION REQUEST: option (LOAD BY SIGNAL / FORCED MUTE) + ON/OFF."

- id: gain_parameter
  type: object
  description: "GAIN PARAMETER REQUEST 3: status, upper/lower/default/current value, wide/narrow adjustment width, default validity."

- id: setting_info
  type: object
  description: "SETTING REQUEST: base model type, sound function availability, profile/clock/sleep-timer function."

- id: information_string
  type: string
  description: "INFORMATION STRING REQUEST: horizontal or vertical sync frequency label/string."

- id: eco_mode
  type: enum
  description: "ECO MODE REQUEST value (Light/Lamp mode; value list in source Appendix)."

- id: lan_projector_name
  type: string
  description: "LAN PROJECTOR NAME REQUEST DATA01-17 (NUL-terminated)."

- id: lan_mac_address
  type: string
  description: "LAN MAC ADDRESS STATUS REQUEST2 DATA01-06 (6 bytes)."

- id: pip_pbyb_setting
  type: object
  description: "PIP/PBP REQUEST: mode, start position, sub input 1/2/3 values."

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: base_model_type
  type: object
  description: "BASE MODEL TYPE REQUEST: base model type code + model name string."

- id: serial_number
  type: string
  description: "SERIAL NUMBER REQUEST DATA01-16 (NUL-terminated)."

- id: basic_information
  type: object
  description: "BASIC INFORMATION REQUEST: operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

- id: command_result
  type: enum
  values: [success, error]
  description: "Generic acknowledgement. 2Xh-frame ack with DATA=0000h or requested data = success; A Xh-frame with ERR1/ERR2 = error (see error code list)."
```

## Variables
```yaml
- id: volume
  description: "Sound volume (set via 030-2 VOLUME ADJUST; readable via 060-1 with DATA01=05h)."
- id: brightness
  description: "Picture brightness (030-1 DATA01=00h / 060-1 DATA01=00h)."
- id: contrast
  description: "Picture contrast (030-1 DATA01=01h / 060-1 DATA01=01h)."
- id: color
  description: "Picture color (030-1 DATA01=02h / 060-1 DATA01=02h)."
- id: hue
  description: "Picture hue (030-1 DATA01=03h / 060-1 DATA01=03h)."
- id: sharpness
  description: "Picture sharpness (030-1 DATA01=04h / 060-1 DATA01=04h)."
- id: lamp_light_adjust
  description: "Lamp/Light adjust (030-15 / 060-1 DATA01=96h)."
- id: aspect
  description: "Aspect value (030-12 ASPECT ADJUST; value list in source Appendix)."
- id: eco_mode_value
  description: "Eco / Light / Lamp mode (098-8 ECO MODE SET; value list in source Appendix)."
- id: lan_projector_name_var
  description: "Projector name string up to 16 bytes (098-45 LAN PROJECTOR NAME SET)."
- id: pip_pbyp_mode
  description: "PIP vs Picture-By-Picture and start position / sub inputs (098-198)."
- id: edge_blending_on_off
  description: "Edge blending on/off (098-243-1)."
- id: freeze_state
  description: "Freeze on/off (079 FREEZE CONTROL)."
- id: audio_select
  description: "Audio select per input terminal (319-10)."
- id: lens_profile_select
  description: "Reference lens memory profile 1/2 (053-10 LENS PROFILE SET)."
```

## Events
```yaml
# No unsolicited notifications documented.
# UNRESOLVED: source describes only request/response semantics; no push/event mechanism stated.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if a later source documents macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: this refined source excerpt contains no explicit safety warnings,
# interlock procedures, or power-on sequencing requirements. Note: source states
# that during POWER ON / POWER OFF (incl. cooling time) no other command can be
# accepted - this is a device behavior note, not an interlock procedure. Never
# inferred; only populate from explicit source text.
```

## Notes
- **Command framing:** All commands and responses are binary hex-byte frames. A command frame begins with a command-class byte; responses use a leading `2Xh` byte for success acknowledgement and `AXh` for error. `<ID1>` = control ID, `<ID2>` = model code (model-dependent), `<CKS>` = checksum, `<LEN>` = data length.
- **Checksum (CKS):** low-order 8 bits of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **Serial config:** RS-232C, cross cable, D-SUB 9P PC CONTROL port. Pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS. Baud rate selectable from 4800/9600/19200/38400/115200. Full duplex.
- **LAN config:** wired RJ-45 (10/100 Mbps auto) or wireless LAN unit. TCP port 7142 for command send/receive.
- **Power-state lockout:** while POWER ON is executing, or POWER OFF (including cooling time) is executing, no other command is accepted.
- **Picture/Sound/Onscreen mute auto-clear:** mute is turned off on input terminal switch, video signal switch, and (sound mute) volume adjustment.
- **Lens drive:** for continuous lens drive, send `7Fh` (plus) or `81h` (minus) in DATA02 then `00h` to stop; re-issuing the same command during drive continues motion without a stop.
- **Usage-time resolution:** lamp/filter usage time returned in one-second units but updated at one-minute intervals.
- **Error codes:** ERR1/ERR2 combinations documented in source (e.g. 00h/00h = unrecognized command, 01h/00h = invalid value, 02h/0Dh = command rejected because power is off, 02h/0Fh = no authority). Full table in source section 2.4.
- **Sub-tables referenced but not in this excerpt:** input terminal values, aspect values, eco-mode values, sub-input setting values, and base-model-type codes live in the source Appendix "Supplementary Information by Command", which is not present in this refined excerpt.

<!-- UNRESOLVED:
  - Model name "E558" not printed in the refined source excerpt (supplied via input context); the source is the generic Sharp/NEC projector command reference BDT140013 Rev 7.1.
  - Firmware version compatibility range not stated.
  - Voltage / current / power specifications not in this document.
  - Flow control setting not stated (only "Full duplex" mode given).
  - Exact numeric value lists for input terminal / aspect / eco-mode / sub-input / base-model-type parameters require the source Appendix not included in this excerpt.
  - ID1 (control ID) and ID2 (model code) default/valid ranges not stated in this excerpt.
-->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:34:18.115Z
last_checked_at: 2026-06-17T19:44:57.934Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:44:57.934Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched exactly against source with correct hex opcodes, parameter structures, and transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name not printed in the refined source excerpt (supplied via input device context). Specific model confirmation, firmware range, and voltage/power specs are not present in this document."
- "flow control not stated (source only states \"Communication mode: Full duplex\")"
- "source describes only request/response semantics; no push/event mechanism stated."
- "populate if a later source documents macro sequences."
- "this refined source excerpt contains no explicit safety warnings,"
- "- Model name \"E558\" not printed in the refined source excerpt (supplied via input context); the source is the generic Sharp/NEC projector command reference BDT140013 Rev 7.1."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
