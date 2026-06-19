---
spec_id: admin/sharp-nec-led-fc015i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC015I Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC015I"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC015I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:05:45.394Z
last_checked_at: 2026-06-18T08:04:49.952Z
generated_at: 2026-06-18T08:04:49.952Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input terminal value map, aspect value map, eco-mode value map, base model type value map, and sub-input value map are referenced as \"Appendix: Supplementary Information by Command\" but that appendix is not present in the refined source. Wireless LAN communication conditions not detailed (deferred to wireless LAN unit manual)."
  - "eco mode value enum in Appendix not present in source"
  - "aspect value enum in Appendix not present in source"
  - "no event/notification mechanism stated in source."
  - "populate if source contains macro sequences; none found."
  - "source contains no explicit safety interlock procedures,"
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in refined source. Wireless LAN unit specs deferred to separate operation manual. ID2 model code value not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:04:49.952Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC015I Control Spec

## Summary
The Sharp/NEC LED FC015I is a projector controllable via RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, lens, picture/volume adjustment, and status query commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input terminal value map, aspect value map, eco-mode value map, base model type value map, and sub-input value map are referenced as "Appendix: Supplementary Information by Command" but that appendix is not present in the refined source. Wireless LAN communication conditions not detailed (deferred to wireless LAN unit manual). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full-duplex communication mode stated; no flow-control field named
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands present
  - routable       # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET commands present
  - queryable      # inferred: many status request commands present
  - levelable      # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
```

## Actions
```yaml
# Checksum (CKS) rule: sum all preceding bytes, take low-order one byte.
# Framing: command first byte encodes direction+class (02h/03h set, 00h get).
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 carry bitfield error info (cover, fan, temp, lamp, etc.)."

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
  notes: "During power-off (incl. cooling time) no other command accepted."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: integer
      description: "Input terminal value (DATA01). e.g. 06h = video port. Full value map in Appendix not present in source."
  notes: "Response DATA01 FFh = ended with error (no signal switch)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input/video switch."

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
  notes: "Turned off by input/video switch or volume adjust."

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
  notes: "Turned off by input/video switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: enum
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA03 (lo) + DATA04 (hi), signed 16-bit"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: enum
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA02 (lo) + DATA03 (hi)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
  params:
    - name: aspect
      type: integer
      description: "DATA01 aspect value. Value map in Appendix not present in source."

- id: other_adjust_lamp_light
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: enum
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA04 (lo) + DATA05 (hi)"
  notes: "DATA01=96h, DATA02=FFh = LAMP ADJUST / LIGHT ADJUST."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49=projector name, DATA83-86=lamp usage seconds, DATA87-90=filter usage seconds."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04=filter usage seconds, DATA05-08=filter alarm start seconds (-1 if undefined)."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: enum
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: "DATA02: 01h=usage time (seconds), 04h=remaining life (%)"
  notes: "Reflects eco mode. Negative remaining life if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: enum
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key
      type: enum
      description: "DATA01+DATA02 WORD key code, e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 0Dh 00h=HELP, EEh 00h=LAMP MODE/ECO (see Key code list in source)."
  notes: "Response DATA01 FFh = ended with error."

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
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: enum
      description: "DATA01: 06h=Periphery Focus (other targets per Appendix not present)"
    - name: action
      type: enum
      description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens target to read"
  notes: "Response returns upper/lower limit + current value (16-bit each)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01 target (FFh=Stop; mode/value ignored when Stop)"
    - name: mode
      type: enum
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "DATA03 (lo) + DATA04 (hi)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (FFh response = error)"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (FFh response = error)"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: lens memory/zoom/focus/shift(H)/(V) stop vs in-operation."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: enum
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: enum
      description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Response returns status, upper/lower/default/current limits + adjustment widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03=base model type, DATA04=sound function, DATA05=profile function."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03=power status, DATA04=cooling, DATA05=power on/off process, DATA06=operation status."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response carries signal switch status, signal list number, selection signal type 1/2, content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 = model name string (NUL terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=normal (cover opened), 01h=cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: enum
      description: "DATA01: 01h=freeze ON, 02h=freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: enum
      description: "DATA01: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' depending on projector. Value map in Appendix not present in source."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 = projector name string (NUL terminated)."

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 = MAC address."

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "DATA01 eco mode value. Value map in Appendix not present in source."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01} ... {name_16} 00h {checksum}"
  params:
    - name: name
      type: string
      description: "DATA01-16 projector name, up to 16 bytes (NUL appended)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02 setting value. MODE: 00h=PIP,01h=PBP. START POS: 00h-03h corners. Sub-input value map in Appendix not present."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: enum
      description: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type. Value map in Appendix not present."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 = serial number string (NUL terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response carries operation status, content displayed, signal types, mute + freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: integer
      description: "DATA01 input terminal. Value map in Appendix not present in source."
    - name: value
      type: enum
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on]
  source: "078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on)"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 (00h/04h/05h/06h/0Fh/10h)"

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: freeze_state
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST DATA01"

- id: error_status
  type: bitmask
  source: "009 ERROR STATUS REQUEST DATA01-DATA12 (bitfield: cover, fan, temp, lamp, mirror cover, interlock, etc.)"

- id: command_ack
  type: enum
  values: [success, error]
  source: "Response frame ACK bytes; ERR1/ERR2 carry error code on failure"
```

## Variables
```yaml
- id: brightness
  type: integer
  access: read_write
  source: "030-1 PICTURE ADJUST (target 00h) / 060-1 GAIN PARAMETER REQUEST 3 (00h)"

- id: contrast
  type: integer
  access: read_write
  source: "030-1 (01h) / 060-1 (01h)"

- id: color
  type: integer
  access: read_write
  source: "030-1 (02h) / 060-1 (02h)"

- id: hue
  type: integer
  access: read_write
  source: "030-1 (03h) / 060-1 (03h)"

- id: sharpness
  type: integer
  access: read_write
  source: "030-1 (04h) / 060-1 (04h)"

- id: volume
  type: integer
  access: read_write
  source: "030-2 VOLUME ADJUST / 060-1 (05h)"

- id: lamp_light_adjust
  type: integer
  access: read_write
  source: "030-15 OTHER ADJUST (96h) / 060-1 (96h)"

- id: lamp_usage_time
  type: integer
  unit: seconds
  access: read_only
  source: "037 DATA83-86 / 037-4 (content 01h)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  access: read_only
  source: "037-4 (content 04h)"

- id: filter_usage_time
  type: integer
  unit: seconds
  access: read_only
  source: "037 DATA87-90 / 037-3 DATA01-04"

- id: eco_mode
  type: integer
  access: read_write
  source: "097-8 / 098-8"
  # UNRESOLVED: eco mode value enum in Appendix not present in source

- id: projector_name
  type: string
  access: read_write
  source: "097-45 / 098-45"

- id: aspect
  type: integer
  access: write_only
  source: "030-12 ASPECT ADJUST"
  # UNRESOLVED: aspect value enum in Appendix not present in source
```

## Events
```yaml
# Device returns responses only to issued commands (synchronous request/response).
# No unsolicited notification protocol documented.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step command sequences explicitly described as macros in source.
# UNRESOLVED: populate if source contains macro sequences; none found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Power commands block all other commands during execution: 015 POWER ON accepts
  no other command while turning on; 016 POWER OFF accepts none during power-off
  incl. cooling time. 018 INPUT SW CHANGE may return FFh (no switch made) if no
  signal present. Error code 02h 0Dh = "command cannot be accepted because the
  power is off." Error code 02h 0Fh = "no authority necessary for the operation."
  # UNRESOLVED: source contains no explicit safety interlock procedures,
  # power-on sequencing requirements, or voltage/current specs. Interlock
  # switch open status is reported in 009 ERROR STATUS REQUEST DATA09 Bit1 but
  # no control-side interlock procedure is documented.
```

## Notes
- Manual revision: BDT140013 Rev 7.1.
- Serial cable: cross cable to PC CONTROL port (D-SUB 9P). Pin assignment: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS (crossed to external device).
- LAN: RJ-45 wired (10/100 Mbps auto) or wireless LAN unit. TCP port 7142.
- Binary framing: commands/responses expressed in hex. Common params: ID1 (control ID), ID2 (model code), CKS (checksum = low byte of sum of all preceding bytes), LEN (data length), ERR1/ERR2 (response error codes).
- Response prefixes: `2xh`/`2xh` echo success with optional data; `Axh` prefix = error response carrying ERR1/ERR2.
- Usage times update at one-minute intervals despite one-second resolution.
- Lamp remaining life returns negative percent if replacement deadline exceeded.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in refined source. Wireless LAN unit specs deferred to separate operation manual. ID2 model code value not stated. -->
````

Spec ready. 53 actions, all hex payloads verbatim. Gaps marked UNRESOLVED (Appendix value maps, firmware, wireless LAN, ID2 model code).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:05:45.394Z
last_checked_at: 2026-06-18T08:04:49.952Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:04:49.952Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input terminal value map, aspect value map, eco-mode value map, base model type value map, and sub-input value map are referenced as \"Appendix: Supplementary Information by Command\" but that appendix is not present in the refined source. Wireless LAN communication conditions not detailed (deferred to wireless LAN unit manual)."
- "eco mode value enum in Appendix not present in source"
- "aspect value enum in Appendix not present in source"
- "no event/notification mechanism stated in source."
- "populate if source contains macro sequences; none found."
- "source contains no explicit safety interlock procedures,"
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in refined source. Wireless LAN unit specs deferred to separate operation manual. ID2 model code value not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
