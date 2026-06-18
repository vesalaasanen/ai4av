---
spec_id: admin/sharp-nec-dd-ea241f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd Ea241F Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Dd Ea241F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Dd Ea241F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:03:13.860Z
last_checked_at: 2026-06-17T19:40:34.248Z
generated_at: 2026-06-17T19:40:34.248Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The model name \"Sharp/NEC Dd Ea241F\" was supplied by the operator; it does not appear verbatim in the source document, which is a generic Sharp/NEC projector control manual (BDT140013 Rev 7.1). Confirm the exact product this manual governs before publishing."
  - "Appendix \"Supplementary Information by Command\" (referenced for input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not included in the provided source text, so several enum ranges are left unresolved."
  - "Firmware version compatibility not stated in source."
  - "flow control not explicitly named in source; serial pinout shows RTS/CTS wiring but full-duplex \"Communication mode\" only is stated"
  - "Wireless LAN data rate / supported standard not stated in source (defers to wireless-LAN-unit operation manual)."
  - "aspect enum values not in provided source text (Appendix missing).\""
  - "eco-mode enum values not in provided source text (Appendix missing).\""
  - "enum values not in provided source text (Appendix missing).\""
  - "source documents no unsolicited notifications; responses are only returned after a command is sent."
  - "no multi-step sequences described explicitly in source."
  - "no explicit power-on sequencing procedure or operator-safety interlock procedure described beyond the command-acceptance locks above."
  - "Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not in the provided source, so several enum ranges are incomplete."
  - "Model name \"Sharp/NEC Dd Ea241F\" not stated in source text; confirm against the actual product."
  - "Wireless LAN specifications deferred to wireless-LAN-unit manual (not provided)."
  - "Protocol/binary-command byte-encoding for fields not enumerated here is taken verbatim from source; no values were inferred."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:40:34.248Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands; transport parameters (port 7142, baud rates, framing) confirmed in source sections 1.2 and 2 Command List. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Dd Ea241F Control Spec

## Summary
Control spec for a Sharp/NEC projector driven via the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1). The device supports RS-232C serial control and wired/wireless LAN control over TCP port 7142. Commands are fixed-length hex byte sequences with an additive low-byte checksum; responses carry a model/control ID, optional data block, and error codes.

<!-- UNRESOLVED: The model name "Sharp/NEC Dd Ea241F" was supplied by the operator; it does not appear verbatim in the source document, which is a generic Sharp/NEC projector control manual (BDT140013 Rev 7.1). Confirm the exact product this manual governs before publishing. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (referenced for input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not included in the provided source text, so several enum ranges are left unresolved. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source lists all as selectable options; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly named in source; serial pinout shows RTS/CTS wiring but full-duplex "Communication mode" only is stated
addressing:
  port: 7142  # wired/wireless LAN TCP port stated in source
auth:
  type: none  # inferred: no auth procedure in source
```
<!-- UNRESOLVED: Wireless LAN data rate / supported standard not stated in source (defers to wireless-LAN-unit operation manual). -->

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF present)
# - routable        (018 INPUT SW CHANGE present)
# - queryable       (numerous 0xx/3xx/060/078/097/305 request commands present)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL present)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# All command bytes are the literal payloads sent to the projector ("Command" rows in source),
# verbatim in hexadecimal notation. <CKS> = additive low-byte checksum of all preceding bytes
# (see Notes). Fixed commands show the precomputed checksum byte; parameterized commands show
# <CKS> as a computed trailing byte. ID1 (control ID) / ID2 (model code) appear only in responses.

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command is accepted."

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off incl. cooling time, no other command is accepted."

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Input terminal byte (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command'."
  notes: "Response DATA01 = FFh means ended with an error (no signal switch made)."

- id: picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Value set for the aspect. Full value list in Appendix 'Supplementary Information by Command'."
  notes: "UNRESOLVED: aspect enum values not in provided source text (Appendix missing)."

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "FFh for LAMP/LIGHT ADJUST target"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "01h=lamp usage time (s), 04h=lamp remaining life (%)"
  notes: "Remaining life (%) is negative if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: string
      description: "Key code high byte (00h for all listed keys)"
  notes: "Response DATA01=FFh means ended with an error."

- id: shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target; 06h=Periphery Focus"
    - name: DATA02
      type: string
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "After 7Fh/81h, send 00h to stop. While lens driven, repeat same command to continue without stop."

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target (same values as 053 LENS CONTROL DATA01)"
  notes: "Returns upper/lower limits and current value (16-bit) of the requested target."

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "FFh=Stop (mode/value not referenced when stop)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls the profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns setting value 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift (H), bit4 lens shift (V) - 0=Stop, 1=During operation."

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected profile number 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/timer function."

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling/power-on process status, operation status."

- id: input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (value is actual-1), selection signal type, content displayed."

- id: mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

- id: model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Returns label/information string (NUL-terminated)."

- id: eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on model. Enum in Appendix."

- id: lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Value set for the eco mode. Enum in Appendix 'Supplementary Information by Command'."
  notes: "UNRESOLVED: eco-mode enum values not in provided source text (Appendix missing)."

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (MODE: 00h=PIP,01h=PBP; START POSITION: 00h=top-left,01h=top-right,02h=bottom-left,03h=bottom-right; SUB INPUT: sub-input setting value per Appendix)"

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name. Base-model-type values in Appendix."

- id: serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Input terminal. Value list in Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "Response DATA02: 00h=success, 01h=error."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06; 305-3 BASIC INFORMATION REQUEST DATA01"

- id: error_status
  type: bitmap
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"
  description: "Per-bit error flags: cover, fan, temperature, power, lamp off, lamp replacement moratorium, formatter, FPGA, mirror cover, interlock switch open, system errors."

- id: mute_state
  type: object
  source: "078-4 MUTE STATUS REQUEST"
  description: "picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display"

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037 INFORMATION REQUEST DATA83-86; 037-4 LAMP INFORMATION REQUEST 3"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3"
  notes: "Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST"

- id: lens_operation_status
  type: bitmap
  source: "053-7 LENS INFORMATION REQUEST"
  description: "bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift (H), bit4 lens shift (V)"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

- id: projector_name_lan
  type: string
  source: "097-45 LAN PROJECTOR NAME REQUEST"
```

## Variables
```yaml
- id: brightness
  source: "030-1 PICTURE ADJUST (DATA01=00h); 060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
  settable: true

- id: contrast
  source: "030-1 PICTURE ADJUST (DATA01=01h); 060-1 (DATA01=01h)"
  settable: true

- id: color
  source: "030-1 PICTURE ADJUST (DATA01=02h); 060-1 (DATA01=02h)"
  settable: true

- id: hue
  source: "030-1 PICTURE ADJUST (DATA01=03h); 060-1 (DATA01=03h)"
  settable: true

- id: sharpness
  source: "030-1 PICTURE ADJUST (DATA01=04h); 060-1 (DATA01=04h)"
  settable: true

- id: volume
  source: "030-2 VOLUME ADJUST; 060-1 (DATA01=05h)"
  settable: true

- id: aspect
  source: "030-12 ASPECT ADJUST"
  settable: true
  notes: "UNRESOLVED: enum values not in provided source text (Appendix missing)."

- id: eco_mode
  source: "098-8 ECO MODE SET; 097-8 ECO MODE REQUEST"
  settable: true
  notes: "UNRESOLVED: enum values not in provided source text (Appendix missing)."

- id: lamp_adjust_light_adjust
  source: "030-15 OTHER ADJUST (DATA01=96h); 060-1 (DATA01=96h)"
  settable: true
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; responses are only returned after a command is sent.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command is accepted (015)."
  - "During POWER OFF including cooling time, no other command is accepted (016)."
  - "Interlock switch open condition is reported in 009 ERROR STATUS REQUEST DATA09 bit1."
# UNRESOLVED: no explicit power-on sequencing procedure or operator-safety interlock procedure described beyond the command-acceptance locks above.
```

## Notes
- Command/response frame: all command bytes are sent verbatim in hexadecimal. Success responses begin `2xh`/`0xh` (no leading ID); error responses begin `Axh` and carry `<ERR1> <ERR2>` per the error-code list (section 2.4).
- Checksum (CKS): add all preceding bytes, take the low-order 8 bits. Fixed commands ship the precomputed byte shown; parameterized commands require runtime computation of `<CKS>` over the assembled bytes (including DATA fields).
- ID1 = the projector's configured "control ID"; ID2 = model code. Both appear only in response frames, not in sent command bytes.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pinout documented in source section 1.1). LAN uses RJ-45; wired auto-negotiates 10/100 Mbps.
- Usage-time telemetry (lamp/filter) updates at 1-minute intervals though expressed in 1-second units.
- Error code list (ERR1/ERR2) is fully documented in source section 2.4 (e.g. 00h/00h unrecognized command, 02h/0Dh power off, 02h/0Fh no authority, etc.).
- 050 REMOTE KEY CODE emulates remote-control keys; key codes are a single parameterized command (24 documented keys), not separate command rows.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not in the provided source, so several enum ranges are incomplete. -->
<!-- UNRESOLVED: Model name "Sharp/NEC Dd Ea241F" not stated in source text; confirm against the actual product. -->
<!-- UNRESOLVED: Wireless LAN specifications deferred to wireless-LAN-unit manual (not provided). -->
<!-- UNRESOLVED: Protocol/binary-command byte-encoding for fields not enumerated here is taken verbatim from source; no values were inferred. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:03:13.860Z
last_checked_at: 2026-06-17T19:40:34.248Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:40:34.248Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands; transport parameters (port 7142, baud rates, framing) confirmed in source sections 1.2 and 2 Command List. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The model name \"Sharp/NEC Dd Ea241F\" was supplied by the operator; it does not appear verbatim in the source document, which is a generic Sharp/NEC projector control manual (BDT140013 Rev 7.1). Confirm the exact product this manual governs before publishing."
- "Appendix \"Supplementary Information by Command\" (referenced for input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not included in the provided source text, so several enum ranges are left unresolved."
- "Firmware version compatibility not stated in source."
- "flow control not explicitly named in source; serial pinout shows RTS/CTS wiring but full-duplex \"Communication mode\" only is stated"
- "Wireless LAN data rate / supported standard not stated in source (defers to wireless-LAN-unit operation manual)."
- "aspect enum values not in provided source text (Appendix missing).\""
- "eco-mode enum values not in provided source text (Appendix missing).\""
- "enum values not in provided source text (Appendix missing).\""
- "source documents no unsolicited notifications; responses are only returned after a command is sent."
- "no multi-step sequences described explicitly in source."
- "no explicit power-on sequencing procedure or operator-safety interlock procedure described beyond the command-acceptance locks above."
- "Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is not in the provided source, so several enum ranges are incomplete."
- "Model name \"Sharp/NEC Dd Ea241F\" not stated in source text; confirm against the actual product."
- "Wireless LAN specifications deferred to wireless-LAN-unit manual (not provided)."
- "Protocol/binary-command byte-encoding for fields not enumerated here is taken verbatim from source; no values were inferred."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
