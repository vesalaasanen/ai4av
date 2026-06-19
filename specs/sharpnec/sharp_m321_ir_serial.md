---
spec_id: admin/sharp-nec-m321-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M321 Ir Control Spec"
manufacturer: Sharp/NEC
model_family: "M321 Ir"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M321 Ir"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:58:35.403Z
last_checked_at: 2026-06-18T08:08:44.492Z
generated_at: 2026-06-18T08:08:44.492Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "precise model-family coverage of manual BDT140013 not confirmed against M321 Ir"
  - "flow control not stated in serial conditions table"
  - "no unsolicited event mechanism stated in source"
  - "power-on sequencing / warm-up delays beyond command-blocking not specified."
  - "lamp replacement moratorium / cooling duration values not specified."
  - "firmware version compatibility not stated"
  - "flow_control not in serial conditions table"
  - "Appendix \"Supplementary Information by Command\" value tables (input terminal, aspect, eco mode, base model type, sub-input) not included in this source excerpt"
  - "precise ID2 model code value for M321 Ir not stated"
  - "wireless LAN unit details not specified"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:08:44.492Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M321 Ir Control Spec

## Summary
Control spec for the Sharp/NEC M321 Ir projector (Projector Control Command Reference Manual, BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (port 7142). Commands use a binary framed protocol: each command is a sequence of hex bytes terminated by a checksum byte (CKS = low-order byte of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: precise model-family coverage of manual BDT140013 not confirmed against M321 Ir -->

## Transport
```yaml
# Both serial and LAN (TCP) supported per source §1.1 and §1.2.
# Serial config explicitly stated; TCP port explicitly stated.
# No flow_control value stated in the serial conditions table.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate:
    - 4800
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in serial conditions table
  communication_mode: full_duplex  # stated in source serial conditions
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF present)
# - routable        (018 INPUT SW CHANGE present)
# - queryable       (many *REQUEST commands returning values)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST)
traits:
  - powerable  # inferred from power command examples
  - routable  # inferred from routing/input command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from volume/picture adjust command examples
```

## Actions
```yaml
# All commands below are binary hex-byte sequences as written in source §3.
# CKS = checksum = low-order byte of the sum of all preceding bytes.
# <ID1> = control ID set on projector; <ID2> = model code (both appear in responses).
# Parameterized commands show the variable <DATA> / <CKS> parts; the literal fixed
# bytes are copied verbatim from the source.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield of error states (cover/fan/temp/lamp/etc.)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off incl. cooling, no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal selector (hex), e.g. 06h = video port. See Appendix 'Supplementary Information by Command'."
    notes: "CKS computed over all preceding bytes. Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

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
    notes: "Cleared by input/video switch or volume adjust."

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
    notes: "Cleared by input/video switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: string
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data03
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data02
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data03
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value (hex). See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte (96h=FFh = LAMP/LIGHT ADJUST)."
      - name: data02
        type: string
        description: "Adjustment target low byte (FFh)."
      - name: data03
        type: string
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data04
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data05
        type: integer
        description: "Adjustment value high-order 8 bits."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (s) and filter alarm start time (s). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: string
        description: "Content: 01h usage time (s), 04h remaining life (%)."
    notes: "Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."
    notes: "Returns kg (DATA02-05) and mg (DATA06-09)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte. Examples: 02h POWER ON, 05h AUTO, 06h MENU, 4Bh COMPUTER1, 8Ah FREEZE, A3h ASPECT, EEh LAMP MODE/ECO."
      - name: data02
        type: string
        description: "Key code high byte (typically 00h)."
    notes: "Full key code list in source §3.19. Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (e.g. 06h Periphery Focus)."
      - name: data02
        type: string
        description: "Motion: 00h Stop, 01h/02h/03h drive +1s/+0.5s/+0.25s, 7Fh drive+, 81h drive-, FDh/FEh/FFh drive -0.25s/-0.5s/-1s."
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command can repeat without stop while driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target selector (matches LENS CONTROL data01)."
    notes: "Returns upper/lower limit and current value (each as low+high 8 bits)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (FFh = Stop)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h absolute, 02h relative."
      - name: data03
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "If data01=FFh (Stop), mode/value ignored."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET."
    notes: "Controls profile number set via LENS PROFILE SET (053-10)."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
    notes: "Returns setting value (00h OFF, 01h ON)."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: string
        description: "Setting value: 00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift(H), Bit4 lens shift(V) op state."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h Profile 1, 01h Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number (00h/01h)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST."
    notes: "Returns status, upper/lower limit, default, current, wide/narrow adjustment width. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, profile/clock function."

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
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, displayed content."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen mute, forced onscreen mute, onscreen display states."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name (NUL-terminated string)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h Normal (cover opened), 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h freeze on, 02h freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency."
    notes: "Returns label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value. See Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (NUL-terminated, 17 bytes)."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
    notes: "Returns setting value (mode/position/sub-input per DATA01)."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns edge blending setting (00h OFF, 01h ON)."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco/light/lamp mode value (hex). See Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes), emitted as DATA01-DATA16."
    notes: "Template: 03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: string
        description: "Setting value (PIP/PbP mode, corner position, or sub-input selector per DATA01)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h OFF, 01h ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name (NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (NUL-terminated, 16 bytes)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, displayed content, signal types, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal (hex). See Appendix 'Supplementary Information by Command'."
      - name: data02
        type: string
        description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
# Responses use frame: <resp_header> <ID1> <ID2> <LEN> <DATA> <CKS>
# Success headers: A0h (009/078/084/305), A1h (079), A2h (015-053), A3h (030/037/053/060/097/098/319)
# Error frame: <A?h> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST (DATA06) / 305-3 BASIC INFORMATION REQUEST (DATA01)"

  - id: input_signal
    type: object
    description: "Signal list number, selection signal type 1/2, test pattern, displayed content."
    source: "078-3 INPUT STATUS REQUEST / 305-3 BASIC INFORMATION REQUEST (DATA02-DATA05)"

  - id: mute_state
    type: object
    description: "Picture/sound/onscreen/forced-onscreen mute and onscreen display flags."
    source: "078-4 MUTE STATUS REQUEST (DATA01-DATA05)"

  - id: error_status
    type: bitfield
    description: "DATA01-DATA12 bitfield: cover, fan, temperature, power, lamp, formatter, mirror cover, interlock switch, foreign matter, iris errors."
    source: "009 ERROR STATUS REQUEST"

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: "078-6 COVER STATUS REQUEST"

  - id: lamp_info
    type: object
    description: "Lamp usage time (s) and remaining life (%). Negative remaining life if deadline exceeded."
    source: "037-4 LAMP INFORMATION REQUEST 3"

  - id: filter_usage
    type: object
    description: "Filter usage time (s) and filter alarm start time (s). -1 if undefined."
    source: "037-3 FILTER USAGE INFORMATION REQUEST"

  - id: eco_mode
    type: enum
    source: "097-8 ECO MODE REQUEST"

  - id: freeze_status
    type: enum
    values: [off, on]
    source: "305-3 BASIC INFORMATION REQUEST (DATA09)"

  - id: model_name
    type: string
    source: "078-5 MODEL NAME REQUEST"

  - id: serial_number
    type: string
    source: "305-2 SERIAL NUMBER REQUEST"

  - id: mac_address
    type: string
    source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

  - id: projector_name
    type: string
    source: "097-45 LAN PROJECTOR NAME REQUEST"

  - id: gain_parameters
    type: object
    description: "Per-adjustable (brightness/contrast/color/hue/sharpness/volume/lamp): status, limits, default, current, widths."
    source: "060-1 GAIN PARAMETER REQUEST 3"

  - id: lens_position
    type: object
    description: "Upper/lower limit and current value for selected lens target."
    source: "053-1 LENS CONTROL REQUEST"

  - id: lens_operation_status
    type: bitfield
    description: "Lens memory, zoom, focus, lens shift H/V operation states."
    source: "053-7 LENS INFORMATION REQUEST"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST"

  - id: pip_pbp_setting
    type: object
    description: "PIP/PbP mode, start position, sub-input settings."
    source: "097-198 PIP/PICTURE BY PICTURE REQUEST"

  - id: error_code
    type: object
    description: "ERR1/ERR2 error code pair. See error code list in source §2.4 (unrecognized cmd, unsupported, invalid value, invalid input, memory errors, power off, no authority, gain errors, etc.)."
    source: "Error frame returned on command failure (§2.3/§2.4)"
```

## Variables
```yaml
# Settable continuous parameters are handled via the ADJUST actions (030-1 PICTURE,
# 030-2 VOLUME, 030-12 ASPECT, 030-15 OTHER). Range limits are queryable via
# 060-1 GAIN PARAMETER REQUEST 3.
variables:
  - id: brightness
    type: integer
    description: "Picture brightness (030-1 target 00h). Range via 060-1."
  - id: contrast
    type: integer
    description: "Picture contrast (030-1 target 01h). Range via 060-1."
  - id: color
    type: integer
    description: "Picture color (030-1 target 02h). Range via 060-1."
  - id: hue
    type: integer
    description: "Picture hue (030-1 target 03h). Range via 060-1."
  - id: sharpness
    type: integer
    description: "Picture sharpness (030-1 target 04h). Range via 060-1."
  - id: volume
    type: integer
    description: "Sound volume (030-2). Range via 060-1 target 05h."
  - id: lamp_light_adjust
    type: integer
    description: "Lamp/light adjust (030-15 / 060-1 target 96h). Range via 060-1."
  - id: projector_name
    type: string
    description: "LAN projector name (098-45 LAN PROJECTOR NAME SET), up to 16 bytes."
```

## Events
```yaml
# No unsolicited notifications documented in source.
events: []  # UNRESOLVED: no unsolicited event mechanism stated in source
```

## Macros
```yaml
# No multi-step command sequences documented in source.
macros: []
```

## Safety
```yaml
# From explicit source text only - no inference.
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling) no other command accepted
interlocks:
  - id: power_on_blocking
    description: "While POWER ON is executing, no other command can be accepted (§3.2)."
  - id: power_off_cooling_blocking
    description: "During POWER OFF (including cooling time), no other command can be accepted (§3.3)."
  - id: safety_interlock_switch
    description: "Error status DATA09 Bit1 'The interlock switch is open' indicates a safety interlock condition (§3.1 error list)."
# UNRESOLVED: power-on sequencing / warm-up delays beyond command-blocking not specified.
# UNRESOLVED: lamp replacement moratorium / cooling duration values not specified.
```

## Notes
- Command/response framing: a command is a hex-byte series; responses return with header byte `2xh`/`3xh` (success) or `Axh` (echoed opcode on success/error variants). See source §2.1.
- Checksum (CKS) = low-order one byte of the sum of all preceding bytes. Worked example in source §2.2: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- ID1 = control ID configured on projector; ID2 = model code (varies by model). Both appear in response frames, not in the command frames shown.
- Usage-time fields (lamp/filter) are reported in one-second units but updated only at one-minute intervals.
- Several commands defer value tables to an Appendix ("Supplementary Information by Command") not present in this refined excerpt; those param value domains are therefore UNRESOLVED here.
- Wireless LAN control is mentioned (§1.1) but delegates config to the wireless unit's manual — not specified here.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow_control not in serial conditions table -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" value tables (input terminal, aspect, eco mode, base model type, sub-input) not included in this source excerpt -->
<!-- UNRESOLVED: precise ID2 model code value for M321 Ir not stated -->
<!-- UNRESOLVED: wireless LAN unit details not specified -->
````

Spec done. 53 actions, all command payloads verbatim from source. Both serial+TCP transport captured (port 7142 explicit, serial config explicit, flow_control UNRESOLVED). Auth none inferred. Traits powerable/routable/queryable/levelable. Safety interlocks from explicit text. Appendix value tables marked UNRESOLVED since not in refined excerpt.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:58:35.403Z
last_checked_at: 2026-06-18T08:08:44.492Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:08:44.492Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "precise model-family coverage of manual BDT140013 not confirmed against M321 Ir"
- "flow control not stated in serial conditions table"
- "no unsolicited event mechanism stated in source"
- "power-on sequencing / warm-up delays beyond command-blocking not specified."
- "lamp replacement moratorium / cooling duration values not specified."
- "firmware version compatibility not stated"
- "flow_control not in serial conditions table"
- "Appendix \"Supplementary Information by Command\" value tables (input terminal, aspect, eco mode, base model type, sub-input) not included in this source excerpt"
- "precise ID2 model code value for M321 Ir not stated"
- "wireless LAN unit details not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
