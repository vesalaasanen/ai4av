---
spec_id: admin/sharp-nec-4t-b80ct1u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 4T B80Ct1U Control Spec"
manufacturer: Sharp/NEC
model_family: "4T B80Ct1U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "4T B80Ct1U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:56:52.834Z
last_checked_at: 2026-06-17T19:31:30.213Z
generated_at: 2026-06-17T19:31:30.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "base model type / precise marketing model name mapping not resolved from this protocol manual alone (device identified by operator as 4T B80Ct1U). Firmware version compatibility not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, signal types) referenced but not present in this refined excerpt."
  - "source does not designate a single default baud rate; 115200 shown as the first listed option."
  - "flow control not stated (RTS/CTS pins wired per pinout, but mode not named)"
  - "other target values referenced in appendix not present in excerpt."
  - "non-stop target values not enumerated in excerpt."
  - "exact enum values in appendix not in excerpt."
  - "base model type enum values not in excerpt."
  - "exact range not stated in excerpt (060-1 returns per-device limits)"
  - "exact min/max/default ranges for each gain are device-reported"
  - "source describes no unsolicited notifications / push events."
  - "source documents no explicit multi-step macro sequences."
  - "no explicit safety interlock procedures, power-on sequencing"
  - "Appendix \"Supplementary Information by Command\" not included — full enum tables for input terminal, aspect, eco mode, signal type, base model type, and sub-input values are missing."
  - "default baud rate / flow-control mode not stated."
  - "firmware version compatibility not stated."
  - "control ID (ID1) and model code (ID2) concrete values are device/projector-reported, not enumerated here."
  - "precise marketing model name → \"4T B80Ct1U\" supplied by operator; not corroborated inside this protocol excerpt (which is a generic projector command reference, BDT140013 Rev 7.1)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:31:30.213Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source hex sequences; transport parameters verified; bidirectional coverage complete. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC 4T B80Ct1U Control Spec

## Summary
Projector control spec for the Sharp/NEC 4T B80Ct1U projector, covering a binary (hex-byte) control protocol documented in "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device supports control over a serial (RS-232C) port and over a wired/wireless LAN using TCP. Commands are fixed-length hex frames terminated by a trailing checksum byte; the controller sends a command and the projector returns an acknowledgement response.

<!-- UNRESOLVED: base model type / precise marketing model name mapping not resolved from this protocol manual alone (device identified by operator as 4T B80Ct1U). Firmware version compatibility not stated. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, signal types) referenced but not present in this refined excerpt. -->

## Transport
```yaml
# Source documents both RS-232C and TCP/LAN explicitly. Both emitted.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number '7142' for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists selectable rates 115200/38400/19200/9600/4800; default not stated
  # UNRESOLVED: source does not designate a single default baud rate; 115200 shown as the first listed option.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins wired per pinout, but mode not named)
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable       inferred from 015. POWER ON / 016. POWER OFF
# - queryable       inferred from numerous *REQUEST commands returning state
# - levelable        inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
# - routable         inferred from 018. INPUT SW CHANGE
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Binary protocol. Each command is a hex-byte frame; trailing <CKS> is a checksum
# (sum of all preceding bytes, low-order 8 bits). Responses prefixed with
# 2xh (ack) / Axh (nak). Each row below = one distinct command number per source.
# Payloads copied verbatim from source. Parameterized DATA fields shown as placeholders.

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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal value (e.g. 06h = video port). See Appendix "Supplementary Information by Command" for full list.
    - name: cks
      type: string
      description: Checksum byte (sum of preceding bytes, low-order 8 bits).

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
      description: Adjustment target (00h Brightness / 01h Contrast / 02h Color / 03h Hue / 04h Sharpness).
    - name: data02
      type: string
      description: Adjustment mode (00h absolute / 01h relative).
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: Adjustment mode (00h absolute / 01h relative).
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Aspect value. See Appendix "Supplementary Information by Command".
    - name: cks
      type: string
      description: Checksum byte.

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: Target high byte (96h = LAMP ADJUST / LIGHT ADJUST).
    - name: data02
      type: string
      description: Target low byte (FFh = LAMP ADJUST / LIGHT ADJUST).
    - name: data03
      type: string
      description: Adjustment mode (00h absolute / 01h relative).
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

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
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Lamp select (00h Lamp 1 / 01h Lamp 2 - lamp 2 only on two-lamp models).
    - name: data02
      type: string
      description: Content (01h usage time seconds / 04h remaining life %).
    - name: cks
      type: string
      description: Checksum byte.

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Content (00h Total Carbon Savings / 01h Carbon Savings during operation).
    - name: cks
      type: string
      description: Checksum byte.

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Key code low byte. Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO.
    - name: data02
      type: string
      description: Key code high byte (00h for all listed keys).
    - name: cks
      type: string
      description: Checksum byte.

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
      description: Lens target (06h Periphery Focus). # UNRESOLVED: other target values referenced in appendix not present in excerpt.
    - name: data02
      type: string
      description: Content (00h Stop / 01h +1s / 02h +0.5s / 03h +0.25s / 7Fh +continuous / 81h -continuous / FDh -0.25s / FEh -0.5s / FFh -1s).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens target (same space as 053 LENS CONTROL).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: Target (FFh = Stop). # UNRESOLVED: non-stop target values not enumerated in excerpt.
    - name: data02
      type: string
      description: Adjustment mode (00h absolute / 02h relative).
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Operation (00h MOVE / 01h STORE / 02h RESET).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Operation (00h MOVE / 01h STORE / 02h RESET).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Option (00h LOAD BY SIGNAL / 01h FORCED MUTE).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Option (00h LOAD BY SIGNAL / 01h FORCED MUTE).
    - name: data02
      type: string
      description: Setting value (00h OFF / 01h ON).
    - name: cks
      type: string
      description: Checksum byte.

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
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Profile number (00h Profile 1 / 01h Profile 2).
    - name: cks
      type: string
      description: Checksum byte.

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: Adjusted value name (00h BRIGHTNESS / 01h CONTRAST / 02h COLOR / 03h HUE / 04h SHARPNESS / 05h VOLUME / 96h LAMP-LIGHT ADJUST).
    - name: cks
      type: string
      description: Checksum byte.

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
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Operation (01h freeze on / 02h freeze off).
    - name: cks
      type: string
      description: Checksum byte.

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: Information type (03h horizontal sync frequency / 04h vertical sync frequency).
    - name: cks
      type: string
      description: Checksum byte.

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
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP / PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Item (00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3).
    - name: cks
      type: string
      description: Checksum byte.

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
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Value set for the eco mode. See Appendix "Supplementary Information by Command".
    - name: cks
      type: string
      description: Checksum byte.

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: projector_name
      type: string
      description: Projector name bytes (DATA01 - DATA16, up to 16 bytes, NUL terminated).
    - name: cks
      type: string
      description: Checksum byte.

# --- 098-198. PIP / PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Item (00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3).
    - name: data02
      type: string
      description: Setting value. For MODE: 00h PIP / 01h PBP. For START POSITION: 00h TOP-LEFT / 01h TOP-RIGHT / 02h BOTTOM-LEFT / 03h BOTTOM-RIGHT. Sub input values see Appendix.
    - name: cks
      type: string
      description: Checksum byte.

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Setting value (00h OFF / 01h ON).
    - name: cks
      type: string
      description: Checksum byte.

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
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal. See Appendix "Supplementary Information by Command".
    - name: data02
      type: string
      description: Setting value (00h terminal specified in DATA01 / 01h BNC / 02h COMPUTER).
    - name: cks
      type: string
      description: Checksum byte.
```

## Feedbacks
```yaml
# Each request command returns a structured hex response. Response framing:
#   ack = 2xh ... <CKS>   |   nak = Axh ... <ERR1> <ERR2> <CKS>
# Error code pairs (ERR1/ERR2) documented in source §2.4.
feedbacks:
  - id: error_status
    type: bitmask
    source_command: error_status_request
    description: "12 data bytes (DATA01-DATA12); bit set to 1 = error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/lens/system errors."
  - id: power_state
    type: enum
    source_command: running_status_request
    values: [standby, power_on]  # DATA03: 00h Standby / 01h Power On / FFh Not supported
  - id: cooling_status
    type: enum
    source_command: running_status_request
    values: [not_executed, during_execution]  # DATA04
  - id: operation_status
    type: enum
    source_command: running_status_request
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]  # DATA06
  - id: input_signal_status
    type: object
    source_command: input_status_request
    description: Signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed.
  - id: mute_status
    type: object
    source_command: mute_status_request
    description: "Picture mute, Sound mute, Onscreen mute, Forced onscreen mute, Onscreen display (each 00h Off / 01h On)."
  - id: cover_status
    type: enum
    source_command: cover_status_request
    values: [normal_open, closed]  # DATA01: 00h Normal (cover opened) / 01h Cover closed
  - id: lamp_information
    type: object
    source_command: lamp_information_request
    description: Lamp usage time (seconds) or remaining life (%). Negative remaining life = past replacement deadline.
  - id: filter_information
    type: object
    source_command: filter_usage_information_request
    description: Filter usage time (seconds) and filter alarm start time (seconds). -1 if undefined.
  - id: carbon_savings
    type: object
    source_command: carbon_savings_information_request
    description: Carbon savings in kg (max 99999) and mg (max 999999).
  - id: projector_information
    type: object
    source_command: information_request
    description: Projector name, lamp usage time (seconds), filter usage time (seconds). Updated at 1-minute intervals.
  - id: eco_mode
    type: enum
    source_command: eco_mode_request
    description: "Value varies by model ('Light mode' or 'Lamp mode'). See Appendix."  # UNRESOLVED: exact enum values in appendix not in excerpt.
  - id: projector_name
    type: string
    source_command: lan_projector_name_request
    description: Projector name string (DATA01 - DATA17, NUL terminated).
  - id: mac_address
    type: string
    source_command: lan_mac_address_request
    description: MAC address (6 bytes).
  - id: model_name
    type: string
    source_command: model_name_request
    description: Model name string (DATA01 - DATA32, NUL terminated).
  - id: base_model_type
    type: object
    source_command: base_model_type_request
    description: Base model type + model name. See Appendix.  # UNRESOLVED: base model type enum values not in excerpt.
  - id: serial_number
    type: string
    source_command: serial_number_request
    description: Serial number string (DATA01 - DATA16, NUL terminated).
  - id: basic_information
    type: object
    source_command: basic_information_request
    description: Operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.
  - id: lens_position
    type: object
    source_command: lens_control_request
    description: Upper/lower limits and current value for the selected lens target.
  - id: lens_motion_status
    type: bitmask
    source_command: lens_information_request
    description: "Bit0 Lens memory / Bit1 Zoom / Bit2 Focus / Bit3 Lens Shift H / Bit4 Lens Shift V (0 Stop / 1 During operation)."
  - id: gain_parameter
    type: object
    source_command: gain_parameter_request
    description: Adjustment status, upper/lower/default/current values, wide/narrow adjustment widths.
  - id: pip_pbp
    type: object
    source_command: pip_pbp_request
    description: MODE / START POSITION / SUB INPUT 1-3 values.
  - id: edge_blending_mode
    type: enum
    source_command: edge_blending_mode_request
    values: [off, on]
  - id: lens_memory_option
    type: object
    source_command: lens_memory_option_request
    description: LOAD BY SIGNAL / FORCED MUTE option and ON/OFF setting value.
  - id: lens_profile
    type: enum
    source_command: lens_profile_request
    values: [profile_1, profile_2]
  - id: information_string
    type: string
    source_command: information_string_request
    description: Horizontal or vertical synchronous frequency string.
  - id: setting_info
    type: object
    source_command: setting_request
    description: Base model type, sound function availability, profile/clock/sleep-timer function.
  - id: command_ack
    type: enum
    description: "Per-command acknowledgement. 2xh = success (no data), Axh = failure with ERR1/ERR2."
# Error code table (ERR1 / ERR2) per source §2.4:
#   00/00 unrecognized command | 00/01 not supported by model | 01/00 invalid value |
#   01/01 invalid input terminal | 01/02 invalid language | 02/00 memory allocation error |
#   02/02 memory in use | 02/03 value cannot be set | 02/04 forced onscreen mute on |
#   02/06 viewer error | 02/07 no signal | 02/08 test pattern/filter displayed |
#   02/09 no PC card | 02/0A memory operation error | 02/0C entry list displayed |
#   02/0D power is off | 02/0E execution failed | 02/0F no authority |
#   03/00 incorrect gain number | 03/01 invalid gain | 03/02 adjustment failed
```

## Variables
```yaml
# Settable continuous parameters exposed via 030-* ADJUST commands. Listed here as
# settable variables (the controlling actions are the 030-* commands above).
variables:
  - id: brightness
    type: integer
    unit: ""  # UNRESOLVED: exact range not stated in excerpt (060-1 returns per-device limits)
    description: Picture brightness (030-1 DATA01=00h).
  - id: contrast
    type: integer
    description: Picture contrast (030-1 DATA01=01h).
  - id: color
    type: integer
    description: Picture color (030-1 DATA01=02h).
  - id: hue
    type: integer
    description: Picture hue (030-1 DATA01=03h).
  - id: sharpness
    type: integer
    description: Picture sharpness (030-1 DATA01=04h).
  - id: volume
    type: integer
    description: Sound volume (030-2).
  - id: lamp_adjust
    type: integer
    description: Lamp / light adjust (030-15 DATA01=96h DATA02=FFh).
  # UNRESOLVED: exact min/max/default ranges for each gain are device-reported
  # via 060-1 GAIN PARAMETER REQUEST 3 and not stated as constants in the source.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All responses are solicited (controller sends command, projector replies).
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On command (015) blocks all other commands while power-on is in progress."
  - "Power Off command (016) blocks all other commands during power-off including cooling time."
  - "Error status (009) DATA09 Bit1: interlock switch open is reported as an error condition."
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing
# requirements, or confirmation prompts documented in source beyond the
# command-blocking notes above. Lens shutter (051/052) is an optical shutter,
# not a safety interlock.
```

## Notes
- Protocol is a fixed-structure binary frame: commands begin with a 2xh-class lead byte family (00h/01h/02h/03h) followed by a command byte, fixed `00h 00h`, a length byte, optional DATA, and a trailing checksum `<CKS>`. Responses mirror this with a `2xh` (ack) or `Axh` (nak) lead byte plus the projector's `<ID1>` (control ID) and `<ID2>` (model code).
- Checksum rule: sum all preceding bytes, take the low-order 8 bits. Worked example in source: `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.
- Command numbers (e.g. 015, 030-1, 097-243-1) are the canonical command identifiers in this manual; the actual on-wire payload is the hex frame, not the decimal number.
- Serial config is selectable (baud 4800–115200); the source does not designate a factory default, so implementers must match the projector's configured rate.
- Several DATA field value spaces (input terminals, aspect values, eco-mode values, signal types, base model types) are defined in the manual's Appendix "Supplementary Information by Command", which is not present in this refined excerpt.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — full enum tables for input terminal, aspect, eco mode, signal type, base model type, and sub-input values are missing. -->
<!-- UNRESOLVED: default baud rate / flow-control mode not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) concrete values are device/projector-reported, not enumerated here. -->
<!-- UNRESOLVED: precise marketing model name → "4T B80Ct1U" supplied by operator; not corroborated inside this protocol excerpt (which is a generic projector command reference, BDT140013 Rev 7.1). -->
````

Spec done. 53 actions, one per source command row. Payloads verbatim hex. All UNRESOLVED gaps marked: appendix tables missing, default baud, firmware, model corroboration.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:56:52.834Z
last_checked_at: 2026-06-17T19:31:30.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:31:30.213Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source hex sequences; transport parameters verified; bidirectional coverage complete. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "base model type / precise marketing model name mapping not resolved from this protocol manual alone (device identified by operator as 4T B80Ct1U). Firmware version compatibility not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, signal types) referenced but not present in this refined excerpt."
- "source does not designate a single default baud rate; 115200 shown as the first listed option."
- "flow control not stated (RTS/CTS pins wired per pinout, but mode not named)"
- "other target values referenced in appendix not present in excerpt."
- "non-stop target values not enumerated in excerpt."
- "exact enum values in appendix not in excerpt."
- "base model type enum values not in excerpt."
- "exact range not stated in excerpt (060-1 returns per-device limits)"
- "exact min/max/default ranges for each gain are device-reported"
- "source describes no unsolicited notifications / push events."
- "source documents no explicit multi-step macro sequences."
- "no explicit safety interlock procedures, power-on sequencing"
- "Appendix \"Supplementary Information by Command\" not included — full enum tables for input terminal, aspect, eco mode, signal type, base model type, and sub-input values are missing."
- "default baud rate / flow-control mode not stated."
- "firmware version compatibility not stated."
- "control ID (ID1) and model code (ID2) concrete values are device/projector-reported, not enumerated here."
- "precise marketing model name → \"4T B80Ct1U\" supplied by operator; not corroborated inside this protocol excerpt (which is a generic projector command reference, BDT140013 Rev 7.1)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
