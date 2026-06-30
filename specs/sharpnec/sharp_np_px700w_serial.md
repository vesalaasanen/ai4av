---
spec_id: admin/sharp-nec-np-px700w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX700W Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX700W
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX700W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:18:34.850Z
last_checked_at: 2026-06-18T08:53:46.293Z
generated_at: 2026-06-18T08:53:46.293Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input terminal value list (DATA01 of INPUT SW CHANGE), eco mode value list, and aspect value list referenced as \"Supplementary Information by Command\" appendix not present in refined source."
  - "flow control not explicitly stated (full-duplex communication mode noted)"
  - "source describes no unsolicited notifications. All responses are direct replies to commands."
  - "source documents no named multi-step sequences."
  - "no power-on sequencing requirements or external interlock procedures stated beyond command-level accept-block notes above."
  - "appendix value tables (input terminal codes, aspect codes, eco mode codes, sub input codes, base model type codes) not present in refined source."
  - "serial flow_control not explicitly specified (full-duplex mode only stated)."
  - "firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:53:46.293Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX700W Control Spec

## Summary
The Sharp/NEC NP-PX700W is an LCD projector supporting external control via RS-232C serial and TCP/IP LAN. This spec covers the binary command protocol (BDT140013 Rev 7.1) using hex-framed commands with control ID, model code, data length, payload, and checksum bytes.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input terminal value list (DATA01 of INPUT SW CHANGE), eco mode value list, and aspect value list referenced as "Supplementary Information by Command" appendix not present in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 4800/9600/19200/38400/115200 as configurable; 9600 used here as default-able common value but actual selectable set is [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (full-duplex communication mode noted)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) and POWER OFF (016) commands present
  - queryable      # inferred: many request commands (009, 037, 037-3, 037-4, 037-6, 053-1, 053-5, 053-7, 053-11, 060-1, 078-x, 084, 097-x, 305-x)
  - levelable      # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST, LENS CONTROL adjustment commands
  - routable       # inferred: INPUT SW CHANGE (018), AUDIO SELECT SET (319-10)
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
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). Full value list in appendix not present in refined source."
    notes: "Response DATA01 FFh = ended with error (no signal switch)."

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

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
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

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value (full list in appendix not present in refined source)"

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {data03} {data04} {data05} {cks}"
    params:
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "DATA01=96h, DATA02=FFh fixed for LAMP ADJUST / LIGHT ADJUST target."

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
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"
    notes: "Eco mode values reflected when enabled. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: integer
        description: "Key code high byte (typically 00h)"

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
        type: integer
        description: "Target (06h=Periphery Focus per source row; other values for zoom/focus/shift not enumerated in this row)"
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command can be issued without stop while driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens adjustment target selector"
    notes: "Returns adjustment range upper/lower limits and current value."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
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
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), mode/value not referenced."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns setting value 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, range, default, current value, adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep function (DATA05)."

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
    notes: "Returns signal switch process, signal list number, selection signal type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced onscreen mute status and OSD display."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns label length and NUL-terminated string."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode / Lamp mode value (full list in appendix not present in refined source)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Returns setting value (sub input value list in appendix not present in refined source)."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value (full list in appendix not present in refined source)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data16} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Projector name bytes (up to 16 bytes, NUL-terminated)"

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "Setting value (varies by target). MODE: 00h=PIP, 01h=PBP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in appendix."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11, NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal (full value list in appendix not present in refined source)"
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    description: "12-byte error status from 009 ERROR STATUS REQUEST. DATA01-04 cover cover/fan/temp/lamp errors; DATA09 extended status."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03/DATA06."
  - id: mute_state
    type: composite
    description: "Picture/Sound/Onscreen/Forced-onscreen mute flags from 078-4."
  - id: cover_state
    type: enum
    values: [normal_opened, closed]
  - id: lens_operation_state
    type: bitfield
    description: "From 053-7: lens memory/zoom/focus/shift H/shift V stop-or-operating."
  - id: command_ack
    type: enum
    values: [success, error]
    description: "Response byte A0h/A1h/A2h/A3h prefix indicates command class ack; ERR1/ERR2 carry failure cause."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "PICTURE/BRIGHTNESS via 030-1 (DATA01=00h)."
  - id: contrast
    type: integer
    description: "PICTURE/CONTRAST via 030-1 (DATA01=01h)."
  - id: color
    type: integer
    description: "PICTURE/COLOR via 030-1 (DATA01=02h)."
  - id: hue
    type: integer
    description: "PICTURE/HUE via 030-1 (DATA01=03h)."
  - id: sharpness
    type: integer
    description: "PICTURE/SHARPNESS via 030-1 (DATA01=04h)."
  - id: volume
    type: integer
    description: "VOLUME via 030-2."
  - id: lamp_light_adjust
    type: integer
    description: "LAMP/LIGHT ADJUST via 030-15 (DATA01=96h)."
  - id: eco_mode
    type: integer
    description: "Eco/Light/Lamp mode via 098-8 / 097-8."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
  - id: freeze_state
    type: enum
    values: [on, off]
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
  - id: projector_name
    type: string
    description: "LAN projector name via 098-45 (up to 16 bytes)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are direct replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on the power, no other command can be accepted."
  - command: power_off
    note: "While turning off the power (including the cooling time), no other command can be accepted."
  - command: lens_control_continuous
    note: "After continuous-drive (7Fh/81h), must send 00h to stop lens."
# UNRESOLVED: no power-on sequencing requirements or external interlock procedures stated beyond command-level accept-block notes above.
```

## Notes
- Frame format: `20h 88h <ID1> <ID2> <LEN> <DATA01>-<DATA?? <CKS>`. Response prefixes: `A0h/A1h/A2h/A3h` mirror command class byte (`00h/01h/02h/03h`).
- Checksum: sum all preceding bytes, take low-order 8 bits.
- ID1 = control ID set on projector; ID2 = model code (varies per model).
- ERR1/ERR2 error code table spans 00h-00h through 03h-02h (see section 2.4 of source).
- Lamp/filter usage returned in 1-second units but refreshed at 1-minute intervals.
- For two-lamp projector models only, Lamp 2 selector (DATA01=01h) is effective.
- Source appendix "Supplementary Information by Command" (referenced by INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, PIP/PBP sub input, AUDIO SELECT input terminal, base model type values) is not present in the refined source document.
<!-- UNRESOLVED: appendix value tables (input terminal codes, aspect codes, eco mode codes, sub input codes, base model type codes) not present in refined source. -->
<!-- UNRESOLVED: serial flow_control not explicitly specified (full-duplex mode only stated). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:18:34.850Z
last_checked_at: 2026-06-18T08:53:46.293Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:53:46.293Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input terminal value list (DATA01 of INPUT SW CHANGE), eco mode value list, and aspect value list referenced as \"Supplementary Information by Command\" appendix not present in refined source."
- "flow control not explicitly stated (full-duplex communication mode noted)"
- "source describes no unsolicited notifications. All responses are direct replies to commands."
- "source documents no named multi-step sequences."
- "no power-on sequencing requirements or external interlock procedures stated beyond command-level accept-block notes above."
- "appendix value tables (input terminal codes, aspect codes, eco mode codes, sub input codes, base model type codes) not present in refined source."
- "serial flow_control not explicitly specified (full-duplex mode only stated)."
- "firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
