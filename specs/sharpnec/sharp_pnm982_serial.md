---
spec_id: admin/sharp-nec-pnm982
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PNM982 Control Spec"
manufacturer: Sharp/NEC
model_family: PNM982
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PNM982
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:14:19.333Z
last_checked_at: 2026-06-18T09:11:45.741Z
generated_at: 2026-06-18T09:11:45.741Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual is model-generic; PNM982 device name taken from task input rather than the document body. Specific appendix tables (\"Supplementary Information by Command\") referenced for input-terminal, aspect, eco-mode, base-model-type and sub-input enumerations are NOT included in this refined source and therefore their enum value lists are unresolved."
  - "flow control not explicitly stated (RTS/CTS pins wired per pinout; \"Communication mode: Full duplex\" only)"
  - "appendix not in this refined source.\""
  - "enum in source appendix 'Supplementary Information by Command', not in this refined source.\""
  - "DATA05 role ambiguous in source table.\""
  - "enum in source appendix, not in this refined source.\""
  - "no polled/solicited event/notification model described beyond command/response."
  - "per-target adjustment ranges not tabulated in source."
  - "no explicit power-on sequencing procedure, voltage/current specs, or"
  - "(1) Source is the generic BDT140013 manual — model name \"PNM982\" not stated in the document body; confirm against the specific device. (2) Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input enumerations is NOT present in this refined source, so those enum value lists are unresolved. (3) flow_control serial setting not explicitly stated. (4) Firmware version compatibility range not stated. (5) Protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:11:45.741Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PNM982 Control Spec

## Summary
Binary RS-232C and TCP control protocol for a Sharp/NEC projector (PNM982). Commands are fixed-length hexadecimal frames with a trailing additive checksum byte. The source is the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Both serial (RS-232C, cross cable, PC CONTROL D-SUB 9P) and LAN (wired/wireless, TCP port 7142) transports are documented.

<!-- UNRESOLVED: source manual is model-generic; PNM982 device name taken from task input rather than the document body. Specific appendix tables ("Supplementary Information by Command") referenced for input-terminal, aspect, eco-mode, base-model-type and sub-input enumerations are NOT included in this refined source and therefore their enum value lists are unresolved. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated (RTS/CTS pins wired per pinout; "Communication mode: Full duplex" only)
  communication_mode: full_duplex
addressing:
  port: 7142  # TCP, for both send and receive
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF
  - queryable    # inferred: numerous status/information request commands
  - routable     # inferred: 018 INPUT SW CHANGE
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
```

## Actions
```yaml
# All hex frames are copied verbatim from the source. <ID1> <ID2> <DATA??> <CKS>
# are frame placeholders as written in the manual. CKS = low byte of the sum of all
# preceding bytes (computed at runtime; noted per entry).

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
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (including cooling time)."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal selector (e.g. 06h = video port). Full value list in source appendix 'Supplementary Information by Command' - # UNRESOLVED: appendix not in this refined source."
  notes: "Source example: 02h 03h 00h 00h 02h 01h 06h 0Eh (switch to video port)."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode - 00h absolute, 01h relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high 8 bits)"
  notes: "Source example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Source example (brightness=-10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode - 00h absolute, 01h relative"
    - name: DATA02
      type: byte
      description: "Adjustment value (low 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high 8 bits)"
  notes: "Source example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value - # UNRESOLVED: enum in source appendix 'Supplementary Information by Command', not in this refined source."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target - 96h (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: byte
      description: "Adjustment mode - 00h absolute, 01h relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high 8 bits)"
    - name: DATA05
      type: byte
      description: "Per source row layout - see source; # UNRESOLVED: DATA05 role ambiguous in source table."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lamp selector - 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content - 01h usage time (s), 04h remaining life (%)"
  notes: "Source example (lamp 1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life may be negative past replacement deadline."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Content - 00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte - see key code list in source (2..238). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: "Key code high byte (WORD type; 00h for all listed keys)"
  notes: "Source example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h."

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
      description: "Target - 06h Periphery Focus (per source example)"
    - name: DATA02
      type: byte
      description: "Content/motion - 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens can be re-controlled without stop during motion."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (per source example)"
  notes: "Returns upper/lower limits and current value (DATA02-07)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target - FFh Stop (mode/value ignored when Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode - 00h absolute, 02h relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Operation - 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Operation - 00h MOVE, 01h STORE, 02h RESET"
  notes: "Controls profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting - 00h OFF, 01h ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bitmap: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop,1=operating)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Profile - 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Source example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns range/default/current/widths (DATA01-16)."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power (00h standby,01h on), DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Signal switch process, list number (0-based, +1 for practical), signal types 1/2, test pattern, displayed content."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01 - 00h normal (cover opened), 01h cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Information type - 03h horizontal sync frequency, 04h vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value per projector - # UNRESOLVED: enum in source appendix, not in this refined source."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC (DATA01-06)."

- id: pip_pbyp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Item - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value - # UNRESOLVED: enum in source appendix 'Supplementary Information by Command', not in this refined source."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA
      type: bytes
      description: "Projector name (up to 16 bytes, DATA01-16)"

- id: pip_pbyp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Item - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (mode: 00h PIP, 01h PBP; position: 00h TL, 01h TR, 02h BL, 03h BR; sub-input value per appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Setting - 00h OFF, 01h ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Value list in source appendix."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number string (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "DATA01 operation status, DATA02 displayed content, DATA03-05 signal types, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal - value list in source appendix 'Supplementary Information by Command' - # UNRESOLVED: appendix not in this refined source."
    - name: DATA02
      type: byte
      description: "Setting - 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Query responses carry structured data. Representative response frames (source 2.1/2.3):
- id: ack_success
  type: frame
  description: "Positive ACK - 2Xh/2Yh prefix frame with LEN=00h (no data) or LEN>0 (with data)."
- id: error_response
  type: frame
  description: "Negative ACK - AXh prefix: AXh <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 per source §2.4 error code list (e.g. 02h 0Dh = 'command cannot be accepted because the power is off', 00h 01h = 'command not supported by model', 01h 00h = 'specified value invalid')."
- id: error_status_bitmap
  type: bitmap
  description: "009 response DATA01-12 error bitmap (DATA01 cover/fan/temp/power/lamp; DATA02 lamp usage/formatter/lamp2; DATA03 FPGA/temp-sensor/lamp-data/mirror-cover; DATA04 lamp2/ballast/dust/iris/lens; DATA09 extended status incl. interlock switch open bit1, system errors bit2/bit3)."
# UNRESOLVED: no polled/solicited event/notification model described beyond command/response.
```

## Variables
```yaml
# Settable parameters surfaced as level/value controls. See Actions 030-1, 030-2,
# 030-15, 053-2. Ranges are device-discoverable via 060-1 GAIN PARAMETER REQUEST 3
# (returns upper/lower/default/current per target). Concrete min/max numeric ranges
# are not fixed in this source.
# UNRESOLVED: per-target adjustment ranges not tabulated in source.
```

## Events
```yaml
# No unsolicited notification mechanism described. Protocol is strictly
# command/response (see source §2.3).
```

## Macros
```yaml
# No multi-step command sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted during power-on sequence."
  - "POWER OFF (016): no other command accepted during power-off incl. cooling time."
  - "Error status DATA09 bit1: interlock switch open."
  - "Error code 02h 0Dh: command rejected when power is off."
# UNRESOLVED: no explicit power-on sequencing procedure, voltage/current specs, or
# safety certification data in source. Hardware interlock (cover/interlock switch)
# is observable via 009 error status and 078-6 COVER STATUS REQUEST only.
```

## Notes
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes. Source example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`. Must be computed at runtime for any frame containing `<DATA??>` placeholders.
- **Frame prefixes (source §2.1/§2.3):** command first byte encodes direction+class — `00h/01h/02h/03h` = request classes; response prefixes `20h/21h/22h/23h` = success (2Xh mirrors the request class), `A0h/A1h/A2h/A3h` = error response (AXh mirrors request class). `<ID1>` = projector control ID, `<ID2>` = model code.
- **Wire:** RS-232C cross cable on PC CONTROL (D-SUB 9P): pin2 RxD↔TxD, pin3 TxD↔RxD, pin5 GND, pin7 RTS↔CTS, pin8 CTS↔RTS.
- **LAN:** TCP port 7142 (stated for both send and receive). Wired IEEE 802.3/802.3u auto 10/100; wireless via separate LAN unit (not specified here).
- **Timing:** lamp/filter usage time updated at 1-minute intervals despite 1-second resolution.

<!-- UNRESOLVED: (1) Source is the generic BDT140013 manual — model name "PNM982" not stated in the document body; confirm against the specific device. (2) Appendix "Supplementary Information by Command" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input enumerations is NOT present in this refined source, so those enum value lists are unresolved. (3) flow_control serial setting not explicitly stated. (4) Firmware version compatibility range not stated. (5) Protocol version not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:14:19.333Z
last_checked_at: 2026-06-18T09:11:45.741Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:11:45.741Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual is model-generic; PNM982 device name taken from task input rather than the document body. Specific appendix tables (\"Supplementary Information by Command\") referenced for input-terminal, aspect, eco-mode, base-model-type and sub-input enumerations are NOT included in this refined source and therefore their enum value lists are unresolved."
- "flow control not explicitly stated (RTS/CTS pins wired per pinout; \"Communication mode: Full duplex\" only)"
- "appendix not in this refined source.\""
- "enum in source appendix 'Supplementary Information by Command', not in this refined source.\""
- "DATA05 role ambiguous in source table.\""
- "enum in source appendix, not in this refined source.\""
- "no polled/solicited event/notification model described beyond command/response."
- "per-target adjustment ranges not tabulated in source."
- "no explicit power-on sequencing procedure, voltage/current specs, or"
- "(1) Source is the generic BDT140013 manual — model name \"PNM982\" not stated in the document body; confirm against the specific device. (2) Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input enumerations is NOT present in this refined source, so those enum value lists are unresolved. (3) flow_control serial setting not explicitly stated. (4) Firmware version compatibility range not stated. (5) Protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
