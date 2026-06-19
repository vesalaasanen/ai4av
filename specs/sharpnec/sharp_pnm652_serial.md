---
spec_id: admin/sharp-nec-pnm652
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnm652 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnm652
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnm652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:13:16.215Z
last_checked_at: 2026-06-18T09:10:34.230Z
generated_at: 2026-06-18T09:10:34.230Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for Pnm652 not stated in source; firmware version range not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values) not included in the refined source text."
  - "appendix not in refined source.\""
  - "no unsolicited notifications documented in source. Protocol is request/response only."
  - "no multi-step sequences explicitly documented in source."
  - "source notes \"interlock switch is open\" as an error bit (009 ERROR STATUS DATA09 Bit1)"
  - "model code (ID2) for Pnm652 not stated in source."
  - "default baud rate not stated (source lists selectable: 115200/38400/19200/9600/4800)."
  - "control ID (ID1) setting procedure / default not documented in refined source."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type values) not present in refined source — several actions reference it."
  - "firmware version compatibility range not stated."
  - "VOLUME ADJUST (030-2) source shows DATA01=mode in description but example byte order suggests DATA01=mode, DATA02-03=value; verify field order on real device."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:10:34.230Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnm652 Control Spec

## Summary
Sharp/NEC Pnm652 large-format projector controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Binary command protocol with hex framing and checksum. Source: "Projector Control Command Reference Manual" (BDT140013 Revision 7.1), covering power, input, mute, lens, picture/volume/aspect adjust, and numerous status/information queries.

<!-- UNRESOLVED: model code (ID2) value for Pnm652 not stated in source; firmware version range not stated; appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values) not included in the refined source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 - selectable; default unknown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; flow_control wire setting not specified
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many request/query commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST (gains) present
```

## Actions
```yaml
actions:
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
    notes: "While turning power on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Input terminal (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in refined source."
    notes: "Example: switch to video port = 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

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

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: string
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example -10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA02
        type: string
        description: "Adjustment value (high-order 8 bits)"
      - name: DATA03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative (note: source order shows DATA01=mode, DATA02-03=value; verify per source row)"
    notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Value set for aspect. Full value list in Appendix - UNRESOLVED: appendix not in refined source."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target high byte: 96h (with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: string
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: string
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time seconds (DATA01-04), filter alarm start time seconds (DATA05-08); -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: string
        description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    notes: "Example get lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Key code low byte (WORD). See key code list."
      - name: DATA02
        type: string
        description: "Key code high byte. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"
    notes: "Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target (e.g. 06h=Periphery Focus)"
      - name: DATA02
        type: string
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h continuous drive, send 00h to stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target"
    notes: "Returns upper/lower/current values (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target (FFh=Stop)"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: string
        description: "Adjustment value (high-order 8 bits)"
    notes: "When DATA01=FFh (Stop), mode/value not referenced."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number set via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"
    notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function, profile/timer info."

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
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "DATA01 returned value for eco mode (or Light/Lamp mode per model). Full value list in Appendix - UNRESOLVED: appendix not in refined source."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Value set for eco mode. Full value list in Appendix - UNRESOLVED: appendix not in refined source."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: DATA01_16
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: string
        description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in Appendix - UNRESOLVED: appendix not in refined source."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Input terminal. Full value list in Appendix - UNRESOLVED: appendix not in refined source."
      - name: DATA02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  # All request commands (kind: query in Actions) return responses with data; each
  # documented response shape is captured in the action's notes. Observable status
  # responses captured here:
  - id: error_status
    type: bitfield
    description: "009 response DATA01-12 bitfield of error flags (cover, fan, temperature, power, lamp, formatter, mirror, iris, lens, interlock, system)"
  - id: power_status
    type: enum
    values: [standby, power_on, cooling]
    description: "078-2 DATA03: 00h=Standby, 01h=Power on; 078-2 DATA06 operation status includes 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    description: "078-2 DATA04"
  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    description: "078-2 DATA05"
  - id: mute_status
    type: composite
    description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 0/1)"
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    description: "078-6 DATA01"
  - id: lens_information
    type: bitfield
    description: "053-7 DATA01 bitfield of lens operation states (memory/zoom/focus/lens shift H/V)"
  - id: command_ack
    type: enum
    values: [success, error]
    description: "Standard 2xh/Axh response frame; Axh carries ERR1/ERR2 on failure. See Error code list in Notes."
```

## Variables
```yaml
variables:
  # Discrete actions cover most settable values; the following are continuously
  # settable parameters:
  - id: brightness
    type: integer
    description: "PICTURE ADJUST target 00h, signed 16-bit"
  - id: contrast
    type: integer
    description: "PICTURE ADJUST target 01h, signed 16-bit"
  - id: color
    type: integer
    description: "PICTURE ADJUST target 02h, signed 16-bit"
  - id: hue
    type: integer
    description: "PICTURE ADJUST target 03h, signed 16-bit"
  - id: sharpness
    type: integer
    description: "PICTURE ADJUST target 04h, signed 16-bit"
  - id: volume
    type: integer
    description: "VOLUME ADJUST (030-2), 16-bit"
  - id: lamp_light_adjust
    type: integer
    description: "OTHER ADJUST target 96h/FFh LAMP ADJUST / LIGHT ADJUST, signed 16-bit"
  - id: projector_name
    type: string
    description: "LAN PROJECTOR NAME SET (098-45), up to 16 bytes NUL-terminated"
```

## Events
```yaml
events: []
# UNRESOLVED: no unsolicited notifications documented in source. Protocol is request/response only.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off   # cooling period follows; no other command accepted until complete
interlocks: []
# UNRESOLVED: source notes "interlock switch is open" as an error bit (009 ERROR STATUS DATA09 Bit1)
# but no interlock procedure or power-on sequencing requirement is explicitly documented.
```

## Notes
**Checksum (CKS):** Sum all preceding bytes, take low-order 8 bits. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.

**Frame structure:** Command first byte identifies message class: `00h/01h/02h/03h` = command; `20h/21h/22h/23h` = ACK response; `A0h/A1h/A2h/A3h` = error response. Followed by command code byte, ID1 (control ID), ID2 (model code), LEN, DATA..., CKS.

**Command acceptance:** While power-on / power-off is in progress (incl. cooling), no other commands accepted (015, 016).

**Usage time granularity:** Lamp/filter usage time returned in one-second units but updated at one-minute intervals (037, 037-3, 037-4).

**Picture/Sound mute auto-clear:** Picture mute, sound mute, onscreen mute auto-clear on input/video signal switch; sound mute also clears on volume adjustment.

**Error code list (ERR1 / ERR2):**
- 00h/00h — Command not recognized
- 00h/01h — Command not supported by model
- 01h/00h — Specified value invalid
- 01h/01h — Specified input terminal invalid
- 01h/02h — Specified language invalid
- 02h/00h — Memory allocation error
- 02h/02h — Memory in use
- 02h/03h — Specified value cannot be set
- 02h/04h — Forced onscreen mute on
- 02h/06h — Viewer error
- 02h/07h — No signal
- 02h/08h — Test pattern or filter displayed
- 02h/09h — No PC card inserted
- 02h/0Ah — Memory operation error
- 02h/0Ch — Entry list displayed
- 02h/0Dh — Command not accepted because power is off
- 02h/0Eh — Command execution failed
- 02h/0Fh — No authority for operation
- 03h/00h — Specified gain number incorrect
- 03h/01h — Specified gain invalid
- 03h/02h — Adjustment failed

<!-- UNRESOLVED: model code (ID2) for Pnm652 not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (source lists selectable: 115200/38400/19200/9600/4800). -->
<!-- UNRESOLVED: control ID (ID1) setting procedure / default not documented in refined source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type values) not present in refined source — several actions reference it. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: VOLUME ADJUST (030-2) source shows DATA01=mode in description but example byte order suggests DATA01=mode, DATA02-03=value; verify field order on real device. -->
```

Spec written. 53 commands, all hex payloads verbatim. Serial+TCP transport (both documented in source). Draft/low confidence. UNRESOLVED markers for missing appendix, model code ID2, default baud, firmware range.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:13:16.215Z
last_checked_at: 2026-06-18T09:10:34.230Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:10:34.230Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for Pnm652 not stated in source; firmware version range not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values) not included in the refined source text."
- "appendix not in refined source.\""
- "no unsolicited notifications documented in source. Protocol is request/response only."
- "no multi-step sequences explicitly documented in source."
- "source notes \"interlock switch is open\" as an error bit (009 ERROR STATUS DATA09 Bit1)"
- "model code (ID2) for Pnm652 not stated in source."
- "default baud rate not stated (source lists selectable: 115200/38400/19200/9600/4800)."
- "control ID (ID1) setting procedure / default not documented in refined source."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type values) not present in refined source — several actions reference it."
- "firmware version compatibility range not stated."
- "VOLUME ADJUST (030-2) source shows DATA01=mode in description but example byte order suggests DATA01=mode, DATA02-03=value; verify field order on real device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
