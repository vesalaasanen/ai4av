---
spec_id: admin/sharp-nec-led-fe031i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE031I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE031I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE031I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:18:15.673Z
last_checked_at: 2026-06-18T08:07:22.056Z
generated_at: 2026-06-18T08:07:22.056Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference; model name \"FE031I2\" is operator-supplied and does not appear verbatim in the source text. Firmware version compatibility, voltage/power specs, and per-model input terminal value tables (referenced as \"Supplementary Information by Command\" appendix) are not present in this refined excerpt."
  - "flow control not stated; communication mode stated as \"Full duplex\""
  - "exact min/max not stated; limits queryable via 060-1"
  - "numeric ranges for all adjustments not stated in source; runtime limits obtainable via 060-1 GAIN PARAMETER REQUEST 3."
  - "no unsolicited notifications documented in source. All state is polled via request commands."
  - "no multi-step sequences documented explicitly in source."
  - "no explicit safety warnings or interlock procedures in source."
  - "model name \"LED FE031I2\" supplied by operator, not found verbatim in source text (generic projector manual)."
  - "input terminal value tables, eco mode value tables, aspect value tables, sub-input setting values, and base model type values are referenced as an appendix (\"Supplementary Information by Command\") not included in this refined excerpt."
  - "numeric adjustment ranges (min/max) for brightness/contrast/color/hue/sharpness/volume/lamp-adjust not stated; must be queried at runtime via 060-1."
  - "serial flow control not stated (only \"Full duplex\" communication mode stated)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:07:22.056Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE031I2 Control Spec

## Summary
The Sharp/NEC LED FE031I2 is an LED projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec covers the binary frame command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mutes, picture/volume/aspect adjustment, lens control & memory, status queries, and LAN/PIP/edge-blending configuration. Commands are binary hex frames with a trailing additive checksum byte.

<!-- UNRESOLVED: source is a generic projector command reference; model name "FE031I2" is operator-supplied and does not appear verbatim in the source text. Firmware version compatibility, voltage/power specs, and per-model input terminal value tables (referenced as "Supplementary Information by Command" appendix) are not present in this refined excerpt. -->

## Transport
```yaml
# Source documents both a serial (RS-232C) and a LAN (TCP) interface.
# Frame format (binary hex): [type] [cmd] [00h] [00h] [len] [data...] [checksum]
# Responses prefix: 20h/21h/22h/23h (success), A0h/A1h/A2h/A3h (error).
# Checksum = low-order byte of sum of all preceding bytes (see Notes).
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists multiple selectable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; communication mode stated as "Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from 015 POWER ON / 016 POWER OFF
- queryable    # inferred from numerous status/information request commands
- routable     # inferred from 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
- levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
```

## Actions
```yaml
# All command bytes are VERBATIM from source. <CKS> = computed checksum byte.
# Parameterized commands show variable bytes in braces; fixed commands show full literal frame.

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
  notes: While power-on is in progress, no other command is accepted.

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command is accepted.

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal byte (e.g. 06h = video port). Values defined in appendix "Supplementary Information by Command".
  notes: Example to switch to video port: "02h 03h 00h 00h 02h 01h 06h 0Eh". Response DATA01 FFh = ended with error (no signal switch).

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input terminal switch or video signal switch.

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
  notes: Turned off by input switch, video signal switch, or volume adjustment.

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
  notes: Turned off by input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
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
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: Example brightness=10 -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h". Response DATA01-02 0000h = success.

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: Example volume=10 -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Aspect value; see appendix "Supplementary Information by Command".

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (DATA01): 96h for LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "Adjustment target low byte (DATA02): FFh for LAMP/LIGHT ADJUST"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: Adjusts various gains (LAMP ADJUST / LIGHT ADJUST).

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds. -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: Example lamp1 usage -> "03h 96h 00h 00h 02h 00h 01h 9Ch". Negative remaining life if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999).

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Key code low byte (WORD type). See key code list.
    - name: data02
      type: string
      description: Key code high byte.
  notes: "Key code list (DATA01/DATA02): POWER ON 02h/00h, POWER OFF 03h/00h, AUTO 05h/00h, MENU 06h/00h, UP 07h/00h, DOWN 08h/00h, RIGHT 09h/00h, LEFT 0Ah/00h, ENTER 0Bh/00h, EXIT 0Ch/00h, HELP 0Dh/00h, MAGNIFY UP 0Fh/00h, MAGNIFY DOWN 10h/00h, MUTE 13h/00h, PICTURE 29h/00h, COMPUTER1 4Bh/00h, COMPUTER2 4Ch/00h, VIDEO1 4Fh/00h, S-VIDEO1 51h/00h, VOLUME UP 84h/00h, VOLUME DOWN 85h/00h, FREEZE 8Ah/00h, ASPECT A3h/00h, SOURCE D7h/00h, LAMP MODE/ECO EEh/00h. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = error."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: Opens the lens shutter.

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target (e.g. 06h=Periphery Focus)"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus drive, 81h=minus drive, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: After 7Fh/81h, send 00h to stop. Lens can be re-driven mid-motion by issuing same command.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Adjustment target (same as lens_control DATA01).
  notes: Returns upper/lower limit and current value (DATA02-07).

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target (FFh=Stop)"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: If DATA01=FFh (Stop), mode/value ignored.

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Response DATA02 setting: 00h=OFF, 01h=ON.

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitfield - Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=Stop, 1=During operation).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns DATA01 profile (00h=Profile 1, 01h=Profile 2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Example brightness -> "03h 05h 00h 00h 03h 00h 00h 00h 0Bh". Returns status, limits, default, current, wide/narrow adjustment widths.

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05).

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number (returned value is practical-1), selection signal type, test pattern, content displayed.

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off/01h=On).

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string DATA01-32 (NUL terminated).

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed.

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: Returns label length (DATA02) and info string (DATA03..).

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco mode value (Light mode / Lamp mode depending on model). Values in appendix.

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name DATA01-17 (NUL terminated).

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns MAC address DATA01-06.

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns DATA01: 00h=OFF, 01h=ON.

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Eco mode value; see appendix "Supplementary Information by Command".

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Projector name byte 1 (up to 16 bytes total, DATA01-16).
  notes: Sets projector name (up to 16 bytes) followed by 00h terminator.

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; sub input values per appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

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
  notes: Returns serial number DATA01-16 (NUL terminated).

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal; see appendix "Supplementary Information by Command".
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06; 305-3 BASIC INFORMATION REQUEST DATA01

- id: error_status
  type: bitmask
  description: 12-byte error bitfield from 009 ERROR STATUS REQUEST (cover, fan, temperature, lamp, formatter, mirror cover, interlock, system errors, etc.).
  source: 009 DATA01-12

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037 DATA83-86; 037-4 DATA03-06

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 (content 04h); negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037 DATA87-90; 037-3 DATA01-04

- id: mute_state
  type: enum
  description: Picture/sound/onscreen/forced-onscreen mute flags.
  source: 078-4 MUTE STATUS REQUEST; 305-3 DATA06-08

- id: input_signal_status
  type: composite
  description: Signal list number, selection signal type 1/2, content displayed.
  source: 078-3 INPUT STATUS REQUEST; 305-3 DATA02-05

- id: lens_status
  type: bitmask
  description: Lens memory/zoom/focus/lens-shift-H/lens-shift-V motion state (0=stop,1=operating).
  source: 053-7 LENS INFORMATION REQUEST DATA01

- id: command_execution_result
  type: enum
  values: [success, error]
  description: Returned in ERR1/ERR2 on failure; see error code list (Notes).
  source: section 2.4
```

## Variables
```yaml
- id: brightness
  range: null  # UNRESOLVED: exact min/max not stated; limits queryable via 060-1
  set_via: 030-1 PICTURE ADJUST (target 00h)
- id: contrast
  range: null
  set_via: 030-1 (target 01h)
- id: color
  range: null
  set_via: 030-1 (target 02h)
- id: hue
  range: null
  set_via: 030-1 (target 03h)
- id: sharpness
  range: null
  set_via: 030-1 (target 04h)
- id: volume
  range: null
  set_via: 030-2 VOLUME ADJUST
- id: lamp_light_adjust
  range: null
  set_via: 030-15 OTHER ADJUST (target 96h/FFh)
# UNRESOLVED: numeric ranges for all adjustments not stated in source; runtime limits obtainable via 060-1 GAIN PARAMETER REQUEST 3.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. All state is polled via request commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Notes from source: POWER ON/OFF block all other commands during transition (incl. cooling time);
# 009 ERROR STATUS DATA09 Bit1 reports "interlock switch is open" as an error condition, but no
# procedural interlock sequence is documented here.
```

## Notes
- **Frame format (binary):** command `[type] [cmd] 00h 00h [LEN] [DATA...] [CKS]`; success response `[20h|21h|22h|23h] [cmd] [ID1] [ID2] [LEN] [DATA...] [CKS]`; error response `[A0h|A1h|A2h|A3h] [cmd] [ID1] [ID2] 02h [ERR1] [ERR2] [CKS]`.
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Common params:** ID1 = projector control ID; ID2 = model code; LEN = data length following LEN; DATA?? = variable data; ERR1/ERR2 = error codes (see section 2.4 list).
- **Error codes (ERR1/ERR2):** 00h/00h unrecognized command; 00h/01h not supported by model; 01h/00h invalid value; 01h/01h invalid input terminal; 01h/02h invalid language; 02h/00h memory allocation error; 02h/02h memory in use; 02h/03h value cannot be set; 02h/04h forced onscreen mute on; 02h/06h viewer error; 02h/07h no signal; 02h/08h test pattern/filter displayed; 02h/09h no PC card; 02h/0Ah memory operation error; 02h/0Ch entry list displayed; 02h/0Dh command rejected (power off); 02h/0Eh execution failed; 02h/0Fh no authority; 03h/00h incorrect gain number; 03h/01h invalid gain; 03h/02h adjustment failed.
- **Usage-time granularity:** lamp/filter usage time reported in seconds but updated at 1-minute intervals.
- **Serial pinout:** PC CONTROL D-SUB 9P cross cable — Pin2 RxD, Pin3 TxD, Pin5 GND, Pin7 RTS, Pin8 CTS.

<!-- UNRESOLVED: model name "LED FE031I2" supplied by operator, not found verbatim in source text (generic projector manual). -->
<!-- UNRESOLVED: input terminal value tables, eco mode value tables, aspect value tables, sub-input setting values, and base model type values are referenced as an appendix ("Supplementary Information by Command") not included in this refined excerpt. -->
<!-- UNRESOLVED: numeric adjustment ranges (min/max) for brightness/contrast/color/hue/sharpness/volume/lamp-adjust not stated; must be queried at runtime via 060-1. -->
<!-- UNRESOLVED: serial flow control not stated (only "Full duplex" communication mode stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

Spec output above. 53 actions, one per source command row, payloads verbatim. Need ingest next?

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:18:15.673Z
last_checked_at: 2026-06-18T08:07:22.056Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:07:22.056Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference; model name \"FE031I2\" is operator-supplied and does not appear verbatim in the source text. Firmware version compatibility, voltage/power specs, and per-model input terminal value tables (referenced as \"Supplementary Information by Command\" appendix) are not present in this refined excerpt."
- "flow control not stated; communication mode stated as \"Full duplex\""
- "exact min/max not stated; limits queryable via 060-1"
- "numeric ranges for all adjustments not stated in source; runtime limits obtainable via 060-1 GAIN PARAMETER REQUEST 3."
- "no unsolicited notifications documented in source. All state is polled via request commands."
- "no multi-step sequences documented explicitly in source."
- "no explicit safety warnings or interlock procedures in source."
- "model name \"LED FE031I2\" supplied by operator, not found verbatim in source text (generic projector manual)."
- "input terminal value tables, eco mode value tables, aspect value tables, sub-input setting values, and base model type values are referenced as an appendix (\"Supplementary Information by Command\") not included in this refined excerpt."
- "numeric adjustment ranges (min/max) for brightness/contrast/color/hue/sharpness/volume/lamp-adjust not stated; must be queried at runtime via 060-1."
- "serial flow control not stated (only \"Full duplex\" communication mode stated)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
