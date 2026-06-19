---
spec_id: admin/sharp-nec-led-fc015i-137in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC015I 137in Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC015I 137in"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC015I 137in"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:53:23.668Z
last_checked_at: 2026-06-18T08:04:49.216Z
generated_at: 2026-06-18T08:04:49.216Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Many DATA01 enums (input terminal, eco mode, base model type) refer to \"Appendix / Supplementary Information by Command\" which is not present in this source."
  - "flow control not stated; full-duplex comm mode stated"
  - "not stated), CKS = checksum (low byte of sum)."
  - "enum values in 'Supplementary Information by Command' appendix not present in source). Example: 06h = video port.\""
  - "enum values in 'Supplementary Information by Command' appendix not present in source).\""
  - "enum not stated verbatim in this section).\""
  - "enum in 'Supplementary Information by Command' appendix not present in source).\""
  - "no discrete variable list outside the ADJUST commands."
  - "no event/notification mechanism stated in source."
  - "no macro definitions in source."
  - "no explicit power-on sequencing interlock, voltage/current specs, or"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:04:49.216Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC015I 137in Control Spec

## Summary
Sharp/NEC LED FC015I 137in projector control spec. Supports RS-232C serial (D-SUB 9P cross cable) and TCP/IP LAN (wired/wireless) using binary hex commands on TCP port 7142. Covers power, input switching, mute, picture/volume/aspect adjust, lens control, lens memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Many DATA01 enums (input terminal, eco mode, base model type) refer to "Appendix / Supplementary Information by Command" which is not present in this source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex comm mode stated
  communication_mode: full_duplex  # stated verbatim in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF (015, 016)
  - queryable       # inferred from many *REQUEST commands (009, 037, 078-*, 097-*, 305-*)
  - levelable       # inferred from PICTURE/VOLUME/OTHER ADJUST and LENS CONTROL
  - muteable        # inferred from PICTURE/SOUND/ONSCREEN MUTE commands
```

## Actions
```yaml
# All commands are binary hex payloads. Format: <HEAD> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = projector control ID, ID2 = model code (UNRESOLVED: not stated), CKS = checksum (low byte of sum).
# Checksum computed per source: sum all preceding bytes, take low-order 8 bits.

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>  # DATA01-12 bitfield error info"

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (incl. cooling time)."

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal value (UNRESOLVED: enum values in 'Supplementary Information by Command' appendix not present in source). Example: 06h = video port."

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video switch."

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
  notes: "Cleared on input/video switch or volume adjustment."

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
  notes: "Cleared on input/video switch."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value (UNRESOLVED: enum values in 'Supplementary Information by Command' appendix not present in source)."

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target high byte: 96h=LAMP/LIGHT ADJUST"
    - name: data02
      type: integer
      description: "Target low byte: FFh (fixed for LAMP ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>  # DATA1-49 projector name; DATA83-86 lamp usage seconds; DATA87-90 filter usage seconds"

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>  # DATA1-4 usage seconds; DATA5-8 alarm start seconds (-1 if undefined)"

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: data02
      type: integer
      description: "Key code high byte (always 00h in listed examples)"
  notes: |
    Key code list from source:
    02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT,
    0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE,
    4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN,
    8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO

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
    - name: data01
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Stop continuous drive by sending 00h after 7Fh/81h."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lens target (UNRESOLVED: enum not stated verbatim in this section)."
  response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>  # upper/lower limits + current value"

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "FFh=Stop, otherwise target"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), DATA02-04 ignored."

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>  # bitfield: lens memory/zoom/focus/shift H/shift V operation status"

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
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
    - name: data01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>  # base model type, sound fn, profile fn"

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # DATA03 power, DATA04 cooling, DATA05 power proc, DATA06 op status"

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # signal switch, list num, sig type 1/2, content"

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # picture/sound/onscreen/forced mute + OSD"

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>  # model name NUL-terminated"

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>  # 00h=normal/cover open, 01h=cover closed"

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: "03h=horizontal sync freq, 04h=vertical sync freq"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value depending on projector."

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: data01
      type: integer
      description: "Eco mode value (UNRESOLVED: enum in 'Supplementary Information by Command' appendix not present in source)."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: data01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value: for MODE - 00h=PIP, 01h=PbP. For START POSITION - 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input values: UNRESOLVED (in appendix not present)."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"

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
  response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>  # serial NUL-terminated"

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>  # op status, content, sig type, display type, mute/freeze"

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal (UNRESOLVED: enum in 'Supplementary Information by Command' appendix not present in source)."
    - name: data02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response format for every command: A<HEAD>h <CMD>h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Success responses return ACK data per command (see Actions[].response).
# Error code pairs (ERR1, ERR2) - see Notes for full table.
- id: command_ack
  type: raw
  description: "Binary ACK response. <ERR1>=00h 00h = unrecognized cmd; 00h 01h = not supported by model; 01h 00h = invalid value; 01h 01h = invalid input terminal; 01h 02h = invalid language; 02h 00h = memory alloc error; 02h 02h = memory in use; 02h 03h = value cannot be set; 02h 04h = forced onscreen mute on; 02h 06h = viewer error; 02h 07h = no signal; 02h 08h = test pattern/filter displayed; 02h 09h = no PC card; 02h 0Ah = memory op error; 02h 0Ch = entry list displayed; 02h 0Dh = power off (cmd rejected); 02h 0Eh = execution failed; 02h 0Fh = no authority; 03h 00h = gain number incorrect; 03h 01h = gain invalid; 03h 02h = adjustment failed."
```

## Variables
```yaml
# Most adjustable values (brightness, contrast, volume, etc.) are exposed via 030-* ADJUST actions
# and queried via 060-1 GAIN PARAMETER REQUEST 3. No separate variable registry documented.
# UNRESOLVED: no discrete variable list outside the ADJUST commands.
```

## Events
```yaml
# No unsolicited notifications documented. Projector responds only to commands.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences documented as macros.
# UNRESOLVED: no macro definitions in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015): no other command accepted during power-on sequence."
  - "Power Off (016): no other command accepted during power-off incl. cooling time."
  - "Commands rejected when power off (ERR1=02h ERR2=0Dh: 'command cannot be accepted because the power is off')."
  - "Picture/Onscreen mute cleared on input/video switch. Sound mute also cleared on volume adjust."
# UNRESOLVED: no explicit power-on sequencing interlock, voltage/current specs, or
# safety warnings present in this refined source excerpt. Error bitfield (009) reports
# cover/fan/temp/lamp/interlock errors but no operator procedure documented.
```

## Notes

**Command framing.** Every command/response is binary hex. Format per source §2.1:
`<HEAD> <CMD> <ID1> <ID2> <LEN> <DATA??...> <CKS>` where HEAD differs by message class:
- `00h`/`01h`/`02h`/`03h` — request commands (different message classes)
- `20h`/`21h`/`22h`/`23h` — success responses
- `A0h`/`A1h`/`A2h`/`A3h` — error responses

**ID1** = projector control ID (set on device). **ID2** = model code, varies by model — UNRESOLVED, no fixed value in source. **CKS** = checksum: low-order 8 bits of sum of all preceding bytes.

**Response conventions** (§2.3): data-less commands return success response with empty DATA. Data-requesting commands return DATA populated. Failures return `<ERR1> <ERR2>`.

**Source document**: "Projector Control Command Reference Manual" BDT140013 Revision 7.1. Document covers both RS-232C serial (D-SUB 9P cross cable) and wired/wireless LAN with TCP port 7142.

**Multiple baud rates** supported on serial: 115200/38400/19200/9600/4800 bps — pick one in software settings.

**Reserved bits** in many response fields marked "fixed to 0" or "reserved for the system" should not be interpreted as meaningful state.

<!-- UNRESOLVED: -->
<!-- - Firmware version compatibility range not stated -->
<!-- - ID2 model code value for this specific model not stated -->
<!-- - Input terminal, eco mode, aspect, base model type enum values referenced in 'Supplementary Information by Command' appendix, which is NOT present in this refined source. -->
<!-- - Wireless LAN unit specifications (deferred to separate operation manual) -->
<!-- - Voltage / current / power specs not in source -->
<!-- - Fault recovery sequences / power-on sequencing beyond interlock notes not documented -->
```

Spec done. 53 commands enumerated verbatim from source. Serial+TCP dual transport. No fabricated values. UNRESOLVED markers on appendix-dependent enums + ID2 model code + firmware.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:53:23.668Z
last_checked_at: 2026-06-18T08:04:49.216Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:04:49.216Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Many DATA01 enums (input terminal, eco mode, base model type) refer to \"Appendix / Supplementary Information by Command\" which is not present in this source."
- "flow control not stated; full-duplex comm mode stated"
- "not stated), CKS = checksum (low byte of sum)."
- "enum values in 'Supplementary Information by Command' appendix not present in source). Example: 06h = video port.\""
- "enum values in 'Supplementary Information by Command' appendix not present in source).\""
- "enum not stated verbatim in this section).\""
- "enum in 'Supplementary Information by Command' appendix not present in source).\""
- "no discrete variable list outside the ADJUST commands."
- "no event/notification mechanism stated in source."
- "no macro definitions in source."
- "no explicit power-on sequencing interlock, voltage/current specs, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
