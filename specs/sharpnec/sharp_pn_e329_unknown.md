---
spec_id: admin/sharp-nec-pn-e329
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn E329 Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn E329"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn E329"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:18:50.095Z
last_checked_at: 2026-06-18T09:05:41.314Z
generated_at: 2026-06-18T09:05:41.314Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source document is a generic Sharp/NEC Projector Control Command Reference Manual and does not name the Pn E329 explicitly; model-to-command applicability and any Pn E329-specific command subset are not stated."
  - "firmware version compatibility not stated in source."
  - "default baud rate not singled out (five rates listed); the device selects one per software configuration."
  - "authentication / login procedure not described anywhere in source."
  - "source does not enumerate explicit min/max/default numeric"
  - "no event/notification mechanism documented in source."
  - "source documents no multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock"
  - "exact model code (ID2) for Pn E329 not stated in source."
  - "which of the 53 commands are supported on Pn E329 specifically (vs. the generic projector family) not stated — requires the per-command Appendix or the device itself."
  - "default baud rate — source lists 4800/9600/19200/38400/115200 as software-configurable, no default."
  - "voltage/current/power specifications — not present in this command reference document."
  - "firmware version compatibility — not stated."
  - "protocol version number — not stated (document revision 7.1 is the manual revision, not a wire-protocol version)."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:05:41.314Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Pn E329 Control Spec

## Summary
Control spec for the Sharp/NEC Pn E329 projector, derived from the Sharp/NEC Projector Control Command Reference Manual (BDT140013 Revision 7.1). The device supports two transports: an RS-232C serial connection (D-SUB 9P PC CONTROL port) and a TCP/IP LAN connection (wired RJ-45 or optional wireless LAN unit) using TCP port 7142. The protocol is binary, frame-based with a leading 20h/02h/03h/01h/00h marker, model/control IDs (ID1/ID2), a data-length byte (LEN), variable data, and a trailing checksum byte (CKS).

<!-- UNRESOLVED: the source document is a generic Sharp/NEC Projector Control Command Reference Manual and does not name the Pn E329 explicitly; model-to-command applicability and any Pn E329-specific command subset are not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not singled out (five rates listed); the device selects one per software configuration. -->
<!-- UNRESOLVED: authentication / login procedure not described anywhere in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # one of 4800/9600/19200/38400/115200 - source lists all five, no default singled out
  baud_rate_options: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; flow_control wire use (RTS/CTS) per pinout but not configured as hw flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - routable     # inferred: INPUT SW CHANGE (018) command present
  - queryable    # inferred: numerous status/info request commands present
  - levelable    # inferred: VOLUME ADJUST (030-2) / PICTURE ADJUST (030-1) present
```

## Actions
```yaml
# Binary frame protocol. Each command shown as the literal payload bytes
# from the source (hex, space-separated). <ID1> = control ID, <ID2> = model
# code, <CKS> = checksum (low byte of sum of all preceding bytes).
# Parameterized commands show <DATA..> placeholders verbatim as the source
# documents them.

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
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal selector (e.g. 06h = video port). Full value list in source Appendix "Supplementary Information by Command".

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
      description: Value set for the aspect. Full value list in source Appendix "Supplementary Information by Command".

# --- 030-15. OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST) ---
- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (with DATA02): 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh when DATA01=96h"
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

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

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
      description: "Key code low byte (WORD). See source Key code list (e.g. 02h=POWER ON, 05h=AUTO, 06h=MENU)."
    - name: DATA02
      type: integer
      description: Key code high byte (WORD). 00h for all listed keys.

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
      description: "Lens axis: 06h=Periphery Focus (only value listed in source for this command)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector (e.g. 06h=Periphery Focus per 053)

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (FFh=Stop per source row; other values per Appendix)"
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

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

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
- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode. Full value list in source Appendix.

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated).

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode/position/sub-input per DATA01). See source Appendix for sub-input values."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal. Value list in source Appendix "Supplementary Information by Command".
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All commands return an A0h/A1h/A2h/A3h response frame echoing the command
# marker + <ID1> <ID2>, a LEN byte, and either DATA or <ERR1> <ERR2> plus <CKS>.
# Generic error envelope for every command:
- id: command_error
  type: enum
  values:
    - "00h 00h: command not recognized"
    - "00h 01h: command not supported by model"
    - "01h 00h: specified value invalid"
    - "01h 01h: specified input terminal invalid"
    - "01h 02h: specified language invalid"
    - "02h 00h: memory allocation error"
    - "02h 02h: memory in use"
    - "02h 03h: specified value cannot be set"
    - "02h 04h: forced onscreen mute on"
    - "02h 06h: viewer error"
    - "02h 07h: no signal"
    - "02h 08h: test pattern or filter displayed"
    - "02h 09h: no PC card inserted"
    - "02h 0Ah: memory operation error"
    - "02h 0Ch: entry list displayed"
    - "02h 0Dh: command not accepted (power off)"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority for operation"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"

# Per-command data responses (DATA fields) documented in source:
- id: error_status_data
  type: bitmask
  description: "009 response: DATA01-12 error bitfield (cover, fan, temperature, lamp, mirror cover, interlock, etc.)"
- id: information_data
  type: object
  description: "037 response: DATA01-49 projector name, DATA83-86 lamp usage (s), DATA87-90 filter usage (s)"
- id: filter_usage_data
  type: object
  description: "037-3 response: DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s); -1 if undefined"
- id: lamp_information_data
  type: object
  description: "037-4 response: DATA03-06 obtained info (usage seconds or remaining life %)"
- id: carbon_savings_data
  type: object
  description: "037-6 response: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)"
- id: lens_control_data
  type: object
  description: "053-1 response: DATA02-07 adjustment range upper/lower + current value"
- id: lens_information_data
  type: bitmask
  description: "053-7 response: DATA01 operation status bits (lens memory, zoom, focus, lens shift H/V)"
- id: gain_parameter_data
  type: object
  description: "060-1 response: DATA01-16 status, range upper/lower, default, current, wide/narrow adjustment widths"
- id: setting_data
  type: object
  description: "078-1 response: DATA01-03 base model type, DATA04 sound function, DATA05 profile number"
- id: running_status_data
  type: enum
  description: "078-2 response: DATA03 power status, DATA04 cooling, DATA05 power process, DATA06 operation status"
- id: input_status_data
  type: object
  description: "078-3 response: signal switch, signal list number, selection signal type 1/2, content displayed"
- id: mute_status_data
  type: bitmask
  description: "078-4 response: picture/sound/onscreen/forced-onscreen mute + OSD display bits"
- id: model_name_data
  type: string
  description: "078-5 response: DATA01-32 model name (NUL-terminated)"
- id: cover_status_data
  type: enum
  values: ["00h: normal (cover opened)", "01h: cover closed"]
- id: information_string_data
  type: string
  description: "084 response: horizontal/vertical sync frequency string"
- id: eco_mode_data
  type: enum
  description: "097-8 response: eco/light/lamp mode value (per Appendix)"
- id: lan_projector_name_data
  type: string
  description: "097-45 response: DATA01-17 projector name (NUL-terminated)"
- id: lan_mac_address_data
  type: string
  description: "097-155 response: DATA01-06 MAC address"
- id: pip_pbp_data
  type: object
  description: "097-198 response: mode/start-position/sub-input values"
- id: edge_blending_data
  type: enum
  values: ["00h: OFF", "01h: ON"]
- id: base_model_type_data
  type: object
  description: "305-1 response: DATA01-02 / DATA12-13 base model type, DATA03-11 model name"
- id: serial_number_data
  type: string
  description: "305-2 response: DATA01-16 serial number (NUL-terminated)"
- id: basic_information_data
  type: object
  description: "305-3 response: operation status, content displayed, signal types, mute/freeze bits"
```

## Variables
```yaml
# Settable parameters surfaced as discrete actions above (volume, picture
# gains, lamp/light adjust, eco mode, projector name, lens position, edge
# blending, PIP/PbP). No additional settable continuous variables beyond
# those actions are described as standalone variables in the source.
# UNRESOLVED: source does not enumerate explicit min/max/default numeric
# ranges for most settables outside the GAIN PARAMETER REQUEST 3 response.
```

## Events
```yaml
# Source describes no unsolicited / push notifications. All data is returned
# only in response to a request command.
# UNRESOLVED: no event/notification mechanism documented in source.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): while power-on is in progress, no other command can be accepted."
  - "POWER OFF (016): while power-off (including cooling time) is in progress, no other command can be accepted."
  - "Several commands return error 02h 0Dh ('command cannot be accepted because the power is off') - commands requiring power-on state will be rejected in standby."
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements beyond the command-level
# interlock notes above. Voltage / current / power specs are not in this
# document (command reference only).
```

## Notes
- Source is the generic Sharp/NEC **Projector Control Command Reference Manual** (document code BDT140013, Revision 7.1). It is not Pn E329-specific; command availability per model is governed by each command's Appendix entry ("Supplementary Information by Command"), which is not included in this refined source excerpt.
- Binary frame structure: `[Marker] [CMD] <ID1> <ID2> [LEN] [DATA...] <CKS>`. Markers: 00h/01h/02h/03h = request, 20h/21h/22h/23h = success response, A0h/A1h/A2h/A3h = error response (high bit set).
- Checksum (CKS) = low-order byte (8 bits) of the sum of all preceding bytes in the frame. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- ID1 = projector control ID (set on device); ID2 = model code (varies by model).
- Serial cable is a **cross (null-modem)** cable on D-SUB 9P; pinout in source §1.1.
- Lamp/filter usage times are returned in **seconds**, updated at one-minute intervals. Lamp remaining life (%) can be negative if the replacement deadline is exceeded.
- Two-lamp projector models only: lamp 2 selectors (DATA01=01h) are valid.
- For commands referencing "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types, sub-input values), the value enumerations live in the source Appendix which was not part of the refined excerpt — those param descriptions are marked accordingly.

<!-- UNRESOLVED: exact model code (ID2) for Pn E329 not stated in source. -->
<!-- UNRESOLVED: which of the 53 commands are supported on Pn E329 specifically (vs. the generic projector family) not stated — requires the per-command Appendix or the device itself. -->
<!-- UNRESOLVED: default baud rate — source lists 4800/9600/19200/38400/115200 as software-configurable, no default. -->
<!-- UNRESOLVED: voltage/current/power specifications — not present in this command reference document. -->
<!-- UNRESOLVED: firmware version compatibility — not stated. -->
<!-- UNRESOLVED: protocol version number — not stated (document revision 7.1 is the manual revision, not a wire-protocol version). -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:18:50.095Z
last_checked_at: 2026-06-18T09:05:41.314Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:05:41.314Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source document is a generic Sharp/NEC Projector Control Command Reference Manual and does not name the Pn E329 explicitly; model-to-command applicability and any Pn E329-specific command subset are not stated."
- "firmware version compatibility not stated in source."
- "default baud rate not singled out (five rates listed); the device selects one per software configuration."
- "authentication / login procedure not described anywhere in source."
- "source does not enumerate explicit min/max/default numeric"
- "no event/notification mechanism documented in source."
- "source documents no multi-step macro sequences."
- "source contains no explicit safety warnings, interlock"
- "exact model code (ID2) for Pn E329 not stated in source."
- "which of the 53 commands are supported on Pn E329 specifically (vs. the generic projector family) not stated — requires the per-command Appendix or the device itself."
- "default baud rate — source lists 4800/9600/19200/38400/115200 as software-configurable, no default."
- "voltage/current/power specifications — not present in this command reference document."
- "firmware version compatibility — not stated."
- "protocol version number — not stated (document revision 7.1 is the manual revision, not a wire-protocol version)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
