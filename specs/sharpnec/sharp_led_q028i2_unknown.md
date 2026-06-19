---
spec_id: admin/sharp-nec-led-q028i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Q028I2 LED Projector Control Spec"
manufacturer: Sharp/NEC
model_family: Q028I2
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Q028I2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:51:53.201Z
last_checked_at: 2026-06-18T08:08:42.743Z
generated_at: 2026-06-18T08:08:42.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific applicability of each command (manual is generic across NEC projectors); input terminal value table and eco-mode value table live in an \"Appendix: Supplementary Information by Command\" not included in the refined source."
  - "flow control setting not stated (RTS/CTS pins are wired in the cable, full-duplex mode stated)"
  - "appendix not in refined source.\""
  - "appendix not in refined source."
  - "no direct shutter status query documented; inferred from SHUTTER CLOSE/OPEN commands"
  - "value table in Appendix not in refined source"
  - "no unsolicited notification mechanism documented in source."
  - "no multi-step sequences described explicitly in source."
  - "no explicit power-on sequencing or interlock procedures stated beyond command lockout notes."
  - "firmware version compatibility not stated in source."
  - "input terminal value table, aspect value table, eco mode value table, base model type values, and sub-input setting values are defined in an appendix not included in the refined source."
  - "serial flow_control setting not stated (only baud/data/parity/stop + full-duplex mode given)."
  - "ID2 model code value for Q028I2 not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:08:42.743Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Q028I2 LED Projector Control Spec

## Summary
Sharp/NEC Q028I2 is an LED projector controllable via a binary command protocol over RS-232C serial and wired/wireless LAN (TCP). This spec covers the full command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and audio select. Commands are framed hex bytes with a trailing checksum.

<!-- UNRESOLVED: model-specific applicability of each command (manual is generic across NEC projectors); input terminal value table and eco-mode value table live in an "Appendix: Supplementary Information by Command" not included in the refined source. -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP) interfaces.
# Binary frame protocol is identical over both transports.
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for command send/receive over LAN
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # bps, all supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control setting not stated (RTS/CTS pins are wired in the cable, full-duplex mode stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON / POWER OFF commands present
  - queryable  # inferred: numerous status/information request commands present
  - levelable  # inferred: brightness/contrast/volume/lamp-adjust commands present
  - routable  # inferred: INPUT SW CHANGE and audio select present
```

## Actions
```yaml
# General frame: <lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID (00h default), ID2 = model code (00h default).
# CKS = checksum = low byte of sum of all preceding bytes.
# Fixed commands below include the literal checksum verbatim.
# Parameterized commands show {DATAxx}/{CKS} placeholders to be computed.
# Response success uses 20h/21h/22h/23h lead; error uses A0h/A1h/A2h/A3h lead
# with <ERR1> <ERR2>. See Error code list in Notes.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted while power-on is in progress.

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off (incl. cooling time).

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal value (e.g. 06h = video). See Appendix 'Supplementary Information by Command' for full value table. # UNRESOLVED: appendix not in refined source."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value. See Appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix not in refined source."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust) (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)
    - name: DATA05
      type: byte
      description: High-order adjustment value (reserved/unused in documented example)

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Response returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: Returns DATA03-06 obtained info. Negative remaining-life % if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: Returns kg (DATA02-05) and mg (DATA06-09).

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: Key code high byte (00h for all documented keys)

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (06h=Periphery Focus documented; other lens targets per model)"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: After 7Fh/81h, send 00h to stop. Lens can be re-driven without stop during motion.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens adjustment target (matches DATA01 of Lens Control)
  notes: Returns upper/lower limits and current value (DATA02-07).

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target; FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Operates on profile selected via LENS PROFILE SET (053-10).

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Returns DATA02 setting value (00h=OFF, 01h=ON).

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitfield of lens operation state (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V; 0=stop, 1=operating).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns selected reference lens memory profile number (DATA01: 00h=Profile1, 01h=Profile2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Returns status, upper/lower limits, default, current, wide/narrow adjustment widths.

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile number/clock functions (DATA05).

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power process flags, operation status (DATA03-06).

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, content displayed.

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD display state.

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string (DATA01-32, NUL-terminated).

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns mirror/lens cover status (00h=open, 01h=closed).

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=Freeze On, 02h=Freeze Off"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: Returns label/info string (NUL-terminated).

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco (light/lamp) mode value (DATA01). Value table in Appendix. # UNRESOLVED: appendix not in refined source.

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name string (DATA01-17, NUL-terminated).

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns MAC address (DATA01-06).

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: Returns DATA02 setting value (mode/position/sub-input per DATA01).

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns edge blending setting (DATA01: 00h=OFF, 01h=ON).

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Eco/light/lamp mode value. Value table in Appendix. # UNRESOLVED: appendix not in refined source."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, encoded into DATA01-16)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (MODE: 00h=PIP,01h=PbP; POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input value per Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11).

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number string (DATA01-16, NUL-terminated).

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA06 / basic_information_request DATA01

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA04

- id: picture_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA03

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: shutter_state
  type: enum
  values: [closed, open]
  # UNRESOLVED: no direct shutter status query documented; inferred from SHUTTER CLOSE/OPEN commands

- id: cover_status
  type: enum
  values: [open, closed]
  source: cover_status_request DATA01

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: information_request DATA83-86 / lamp_information_request_3

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA02=04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request DATA01-04

- id: error_status
  type: bitfield
  source: error_status_request DATA01-12
  notes: 12-byte error map; see Error information list in Notes.

- id: command_result
  type: enum
  values: [success, error]
  source: response ERR1/ERR2 (non-zero = error); see Error code list in Notes.
```

## Variables
```yaml
- id: brightness
  type: integer
  adjustable: true
  source: picture_adjust (DATA01=00h) / gain_parameter_request_3 (DATA01=00h)

- id: contrast
  type: integer
  adjustable: true
  source: picture_adjust (DATA01=01h) / gain_parameter_request_3 (DATA01=01h)

- id: color
  type: integer
  adjustable: true
  source: picture_adjust (DATA01=02h) / gain_parameter_request_3 (DATA01=02h)

- id: hue
  type: integer
  adjustable: true
  source: picture_adjust (DATA01=03h) / gain_parameter_request_3 (DATA01=03h)

- id: sharpness
  type: integer
  adjustable: true
  source: picture_adjust (DATA01=04h) / gain_parameter_request_3 (DATA01=04h)

- id: volume
  type: integer
  adjustable: true
  source: volume_adjust / gain_parameter_request_3 (DATA01=05h)

- id: lamp_light_adjust
  type: integer
  adjustable: true
  source: other_adjust (DATA01=96h) / gain_parameter_request_3 (DATA01=96h)

- id: aspect
  type: enum
  adjustable: true
  source: aspect_adjust  # UNRESOLVED: value table in Appendix not in refined source

- id: eco_mode
  type: enum
  adjustable: true
  source: eco_mode_set / eco_mode_request  # UNRESOLVED: value table in Appendix not in refined source

- id: projector_name
  type: string
  adjustable: true
  max_length: 16
  source: lan_projector_name_set / lan_projector_name_request

- id: edge_blending
  type: enum
  values: [off, on]
  adjustable: true
  source: edge_blending_mode_set / edge_blending_mode_request

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  adjustable: true
  source: lens_profile_set / lens_profile_request
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source.
# Device only responds to commands (request/response model).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "No other command accepted while POWER ON is executing (015)."
  - description: "No other command accepted during POWER OFF including cooling time (016)."
  - description: "Error 02h 0Dh: command cannot be accepted because power is off."
# UNRESOLVED: no explicit power-on sequencing or interlock procedures stated beyond command lockout notes.
```

## Notes
- **Protocol:** Binary hex frames over RS-232C (D-SUB 9P PC CONTROL port) or TCP port 7142 (wired/wireless LAN). Cable for serial is a cross cable; RTS/CTS and GND pins wired.
- **Frame layout (command):** `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Lead byte indicates command group/response type (00h/01h/02h/03h = commands; 20h-23h = success responses; A0h-A3h = error responses).
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Parameters ID1/ID2:** ID1 = control ID set on projector; ID2 = model code. Commands shown use 00h/00h defaults.
- **Error codes (ERR1/ERR2):** 00h/00h=unrecognized command; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language; 02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set; 02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal; 02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory operation error; 02h/0Ch=entry list displayed; 02h/0Dh=power off; 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
- **Information update granularity:** lamp/filter usage time obtainable in 1-second units but updated at 1-minute intervals.
- **Manual scope:** This is a generic NEC projector command reference (BDT140013 Rev 7.1); model-specific command applicability and several value tables (input terminal, aspect, eco mode, base model type, sub-input) reside in an "Appendix: Supplementary Information by Command" not present in the refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type values, and sub-input setting values are defined in an appendix not included in the refined source. -->
<!-- UNRESOLVED: serial flow_control setting not stated (only baud/data/parity/stop + full-duplex mode given). -->
<!-- UNRESOLVED: ID2 model code value for Q028I2 not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:51:53.201Z
last_checked_at: 2026-06-18T08:08:42.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:08:42.743Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific applicability of each command (manual is generic across NEC projectors); input terminal value table and eco-mode value table live in an \"Appendix: Supplementary Information by Command\" not included in the refined source."
- "flow control setting not stated (RTS/CTS pins are wired in the cable, full-duplex mode stated)"
- "appendix not in refined source.\""
- "appendix not in refined source."
- "no direct shutter status query documented; inferred from SHUTTER CLOSE/OPEN commands"
- "value table in Appendix not in refined source"
- "no unsolicited notification mechanism documented in source."
- "no multi-step sequences described explicitly in source."
- "no explicit power-on sequencing or interlock procedures stated beyond command lockout notes."
- "firmware version compatibility not stated in source."
- "input terminal value table, aspect value table, eco mode value table, base model type values, and sub-input setting values are defined in an appendix not included in the refined source."
- "serial flow_control setting not stated (only baud/data/parity/stop + full-duplex mode given)."
- "ID2 model code value for Q028I2 not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
