---
spec_id: admin/sharp-nec-np-p502h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P502H Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P502H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P502H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:16:50.984Z
last_checked_at: 2026-06-23T07:49:56.535Z
generated_at: 2026-06-23T07:49:56.535Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) not present in refined source — parameter enums left abstract"
  - "full input terminal value list not in refined source"
  - "aspect value list not in refined source"
  - "full DATA01 target value list beyond 06h not shown in refined source"
  - "eco mode value list not in refined source"
  - "base model type value list not in refined source"
  - "input terminal byte values not in refined source"
  - "enum values not in refined source"
  - "no async event frames described."
  - "none documented."
  - "source contains no explicit electrical-safety interlock procedures; only behavioral interlocks above."
  - "appendix \"Supplementary Information by Command\" not in refined source — input terminal byte values, aspect values, eco mode values, base model type values, sub input values, and full lens control DATA01 target list are referenced but not enumerated."
  - "firmware version compatibility not stated in source."
  - "model code (ID2) value for NP P502H not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:49:56.535Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim; transport verified; one-to-one coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P502H Control Spec

## Summary
Sharp/NEC NP P502H LCD projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). Spec covers the binary hex command protocol documented in BDT140013 Revision 7.1, including power, input switching, mutes, lens control, picture/volume adjustment, and status queries.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, sub input values) not present in refined source — parameter enums left abstract -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; 9600 is one valid value
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex stated, no flow control field in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable, queryable, levelable, routable inferred from command evidence below
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All payloads verbatim from BDT140013 Rev 7.1. Command frame format:
#   <HEADER> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# CKS = checksum: low-order byte of sum of all preceding bytes.
# Fixed commands below show the literal bytes; the response frame inserts ID1/ID2.

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
  notes: While power-on in progress, no other command accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command accepted.

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video port). Full value list in appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: "Checksum byte = low byte of sum of preceding bytes."
  notes: Response DATA01 FFh means error (no signal switch made).
  # UNRESOLVED: full input terminal value list not in refined source

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte (low byte of sum of preceding bytes).

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value byte. Full list in appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: Checksum byte.
  # UNRESOLVED: aspect value list not in refined source

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {data03} {data04} {data05} {cks}"
  params:
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.
  notes: Source lists DATA01=96h, DATA02=FFh as the only adjustment target (LAMP/LIGHT ADJUST).

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals.

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined.

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
    - name: cks
      type: string
      description: Checksum byte.

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: string
      description: Checksum byte.

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: string
      description: Key code high byte (00h for all listed keys).
    - name: cks
      type: string
      description: Checksum byte.

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
      description: "Lens target. 06h=Periphery Focus. Other values per source appendix."
    - name: data02
      type: string
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    - name: cks
      type: string
      description: Checksum byte.
  notes: After 7Fh/81h, send 00h to stop. Lens can be re-driven without stop while in motion.
  # UNRESOLVED: full DATA01 target value list beyond 06h not shown in refined source

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens target selector.
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns upper/lower limit and current value (16-bit each).

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (FFh = Stop, in which case data02-04 ignored)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum byte.

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum byte.
  notes: Acts on profile number selected via LENS PROFILE SET (053-10).

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns bitmask DATA01 - bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=in operation).

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns status, upper/lower/default/current values, wide/narrow adjustment width.

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile/timer function.

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power-on process flags, operation status.

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal type, content displayed.

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display state.

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
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=Freeze ON, 02h=Freeze OFF"
    - name: cks
      type: string
      description: Checksum byte.

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: string
      description: Checksum byte.

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns light/lamp mode value. Value list in appendix.
  # UNRESOLVED: eco mode value list not in refined source

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: string
      description: Checksum byte.

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Eco mode value byte. List in appendix.
    - name: cks
      type: string
      description: Checksum byte.
  # UNRESOLVED: eco mode value list not in refined source

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated).
    - name: cks
      type: string
      description: Checksum byte.

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (depends on data01). MODE: 00h=PIP/01h=PBP. START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT."
    - name: cks
      type: string
      description: Checksum byte.

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum byte.

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type and model name string.
  # UNRESOLVED: base model type value list not in refined source

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
  notes: Returns operation status, content displayed, signal types, mute/freeze state.
- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte. Values per appendix 'Supplementary Information by Command'."
    - name: data02
      type: string
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: string
      description: Checksum byte (low byte of sum of preceding bytes).
  # UNRESOLVED: input terminal byte values not in refined source
```

## Feedbacks
```yaml
# Successful command response frame (no data): <20h|21h|22h|23h> <MT> <ID1> <ID2> 00h <CKS>
# Successful command response frame (with data): <20h|21h|22h|23h> <MT> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error response frame: A{MT}h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Header high nibble: 2=success returning command type, A=error.
# ERR1/ERR2 codes per source §2.4 (e.g. 00h/00h = unrecognized, 02h/0Dh = power off, 02h/0Fh = no authority).

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06; 305-3 BASIC INFORMATION REQUEST DATA01

- id: error_status
  type: bitmask
  source: 009 ERROR STATUS REQUEST DATA01-DATA12
  notes: 12-byte error bitmask covering cover/fan/temp/lamp/ballast/iris/lens-cover errors.

- id: command_ack
  type: enum
  values: [success, error]
  notes: Every command returns an ack frame. Error carries ERR1/ERR2 codes.
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume level (set via 030-2 VOLUME ADJUST, read via 060-1 with data01=05h).
- id: brightness
  type: integer
  description: Picture brightness (set via 030-1 data01=00h, read via 060-1 data01=00h).
- id: contrast
  type: integer
  description: Picture contrast (set via 030-1 data01=01h, read via 060-1 data01=01h).
- id: color
  type: integer
  description: Picture color (set via 030-1 data01=02h, read via 060-1 data01=02h).
- id: hue
  type: integer
  description: Picture hue (set via 030-1 data01=03h, read via 060-1 data01=03h).
- id: sharpness
  type: integer
  description: Picture sharpness (set via 030-1 data01=04h, read via 060-1 data01=04h).
- id: lamp_light_adjust
  type: integer
  description: Lamp/light adjust (set via 030-15, read via 060-1 data01=96h).
- id: lamp_usage_time_seconds
  type: integer
  description: Lamp usage time in seconds, updated at 1-minute intervals.
- id: filter_usage_time_seconds
  type: integer
  description: Filter usage time in seconds.
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes).
- id: eco_mode
  type: string
  description: Eco/light/lamp mode value.  # UNRESOLVED: enum values not in refined source
```

## Events
```yaml
# Protocol is request/response. No unsolicited notifications documented in source.
# UNRESOLVED: no async event frames described.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on in progress, projector accepts no other command."
  - command: power_off
    note: "During power-off (including cooling time), projector accepts no other command."
  - command: picture_mute_on
    note: Picture mute auto-clears on input terminal switch or video signal switch.
  - command: sound_mute_on
    note: Sound mute auto-clears on input switch, video signal switch, or volume adjustment.
  - command: onscreen_mute_on
    note: Onscreen mute auto-clears on input terminal switch or video signal switch.
# UNRESOLVED: source contains no explicit electrical-safety interlock procedures; only behavioral interlocks above.
```

## Notes
- Frame format: `<HEADER> <ID1> <ID2> <LEN> <DATA??...> <CKS>`. ID1 = projector control ID; ID2 = model code (varies per model). CKS = low-order byte of sum of all preceding bytes.
- Response header high nibble `2` = success (echoing command message type), `A` = error (carries ERR1/ERR2).
- Source: BDT140013 Revision 7.1 (Sharp/NEC Projector Control Command Reference Manual).
- Known protocol input said RS-232C; source also explicitly documents wired/wireless LAN with TCP port 7142 — both transports included.
- Baud rate is configurable (115200/38400/19200/9600/4800); 9600 chosen as the default-populated value but any of the listed rates is valid.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not in refined source — input terminal byte values, aspect values, eco mode values, base model type values, sub input values, and full lens control DATA01 target list are referenced but not enumerated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model code (ID2) value for NP P502H not stated in source. -->
````

Spec done. 53 actions, all hex payloads verbatim. Serial+TCP both populated from source. Appendix enums marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:16:50.984Z
last_checked_at: 2026-06-23T07:49:56.535Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:49:56.535Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim; transport verified; one-to-one coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) not present in refined source — parameter enums left abstract"
- "full input terminal value list not in refined source"
- "aspect value list not in refined source"
- "full DATA01 target value list beyond 06h not shown in refined source"
- "eco mode value list not in refined source"
- "base model type value list not in refined source"
- "input terminal byte values not in refined source"
- "enum values not in refined source"
- "no async event frames described."
- "none documented."
- "source contains no explicit electrical-safety interlock procedures; only behavioral interlocks above."
- "appendix \"Supplementary Information by Command\" not in refined source — input terminal byte values, aspect values, eco mode values, base model type values, sub input values, and full lens control DATA01 target list are referenced but not enumerated."
- "firmware version compatibility not stated in source."
- "model code (ID2) value for NP P502H not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
