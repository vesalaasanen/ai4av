---
spec_id: admin/sharp-nec-led-fa012i2-220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA012I2 220 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA012I2 220"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA012I2 220"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:51:32.146Z
last_checked_at: 2026-06-17T20:11:44.938Z
generated_at: 2026-06-17T20:11:44.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit details not specified (refers to operation manual). Firmware version compatibility not stated."
  - "flow control not stated; source says full-duplex communication mode"
  - "exact min/max ranges only obtainable at runtime via GAIN PARAMETER REQUEST 3 limits; source does not publish static ranges."
  - "no unsolicited notification mechanism described in source. All status is poll-based via request commands."
  - "no multi-step sequences described in source."
  - "source states no explicit power-on sequencing procedure beyond command-blocking behavior."
  - "firmware version compatibility not stated in source."
  - "Appendix 'Supplementary Information by Command' enumerations (input terminal, aspect, eco mode, sub-input, base model type values) not present in source."
  - "ID2 model code value for LED FA012I2 220 not stated."
  - "flow_control not stated in source (full-duplex noted only)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:11:44.938Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands verbatim; transport parameters supported; one-to-one coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA012I2 220 Control Spec

## Summary
Sharp/NEC LED FA012I2 220 projector controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Binary command protocol with hex frames and a low-order-byte additive checksum. Covers power, input switching, picture/volume/aspect adjustment, lens shift/zoom/focus/memory, shutter, freeze, mute, eco mode, edge blending, PiP/PbP, and a broad set of status/information queries.

<!-- UNRESOLVED: wireless LAN unit details not specified (refers to operation manual). Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # auto-switchable; source lists all
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source says full-duplex communication mode
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands
  - queryable   # inferred: extensive status/information request commands
  - levelable   # inferred: brightness/contrast/color/volume/lamp adjust commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on the power, no other command can be accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command can be accepted.

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video). See Appendix 'Supplementary Information by Command'."
  notes: CKS = low-order byte of sum of all preceding bytes. Response DATA01 FFh = ended with error (no signal switch made).

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off on input/video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off on input/video signal switch or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Turned off on input/video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: CKS computed. Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h.

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h.

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at one-minute intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time seconds (DATA01-04), filter alarm start time seconds (DATA05-08). -1 if no time defined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  notes: Example get lamp usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999).

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte. See key code list."
  notes: "Key code list: 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: Closes lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: Opens lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: 06h Periphery Focus (and others per source)"
    - name: DATA02
      type: integer
      description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh drive +, 81h drive -, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: Send 00h to stop after 7Fh/81h. Same command can be reissued while driving to control without stop.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target
  notes: Returns upper/lower limit and current value (each as 16-bit).

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh = Stop"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: If DATA01 = FFh (Stop), mode/value not referenced.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: Controls profile number specified by LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: Returns setting value DATA02 (00h OFF, 01h ON).

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0 Stop / 1 During operation).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns DATA01 profile number (00h Profile 1, 01h Profile 2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
  notes: Returns status, upper/lower limits, default, current, wide/narrow adjustment widths. Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process (DATA01), signal list number -1 (DATA02), selection signal type 1 (DATA03), type 2 (DATA04), list type (DATA05), test pattern (DATA06), content displayed (DATA09).

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05).

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name (DATA01-32, NUL-terminated).

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns DATA01: 00h Normal (cover opened), 01h Cover closed.

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"
  notes: Returns label/info string (English, NUL-terminated).

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value. See Appendix 'Supplementary Information by Command'.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name (DATA01-17, NUL-terminated).

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns MAC address (DATA01-06).

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: Returns DATA02 setting value (mode/position/sub-input per DATA01).

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns DATA01: 00h OFF, 01h ON.

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value. See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} ... {DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (PIP/PbP for MODE; TOP-LEFT/TOP-RIGHT/BOTTOM-LEFT/BOTTOM-RIGHT for position; sub-input value otherwise)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11).

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number (DATA01-16, NUL-terminated).

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status (DATA01), content displayed (DATA02), signal types (DATA03-05), video/sound/onscreen mute (DATA06-08), freeze status (DATA09).

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Success response frame per command: header 2Xh (X = cmd group) + cmd bytes + ID1 ID2 + LEN + DATA + CKS.
# Error response frame: header AXh + cmd bytes + ID1 ID2 + 02h + ERR1 ERR2 + CKS.
- id: command_error
  type: enum
  values:
    - "ERR1/ERR2 00h/00h: command not recognized"
    - "ERR1/ERR2 00h/01h: command not supported by model"
    - "ERR1/ERR2 01h/00h: specified value invalid"
    - "ERR1/ERR2 01h/01h: specified input terminal invalid"
    - "ERR1/ERR2 01h/02h: specified language invalid"
    - "ERR1/ERR2 02h/00h: memory allocation error"
    - "ERR1/ERR2 02h/02h: memory in use"
    - "ERR1/ERR2 02h/03h: specified value cannot be set"
    - "ERR1/ERR2 02h/04h: forced onscreen mute on"
    - "ERR1/ERR2 02h/06h: viewer error"
    - "ERR1/ERR2 02h/07h: no signal"
    - "ERR1/ERR2 02h/08h: test pattern or filter displayed"
    - "ERR1/ERR2 02h/09h: no PC card inserted"
    - "ERR1/ERR2 02h/0Ah: memory operation error"
    - "ERR1/ERR2 02h/0Ch: entry list displayed"
    - "ERR1/ERR2 02h/0Dh: command not accepted (power off)"
    - "ERR1/ERR2 02h/0Eh: command execution failed"
    - "ERR1/ERR2 02h/0Fh: no authority for operation"
    - "ERR1/ERR2 03h/00h: specified gain number incorrect"
    - "ERR1/ERR2 03h/01h: specified gain invalid"
    - "ERR1/ERR2 03h/02h: adjustment failed"
```

## Variables
```yaml
# Settable parameters exposed via dedicated request/set commands (see Actions):
# - brightness, contrast, color, hue, sharpness (PICTURE ADJUST / GAIN PARAMETER REQUEST 3)
# - volume (VOLUME ADJUST / GAIN PARAMETER REQUEST 3)
# - lamp/light adjust (OTHER ADJUST / GAIN PARAMETER REQUEST 3)
# - aspect (ASPECT ADJUST)
# - eco/light/lamp mode (ECO MODE SET / ECO MODE REQUEST)
# - projector name (LAN PROJECTOR NAME SET)
# - lens memory option (LENS MEMORY OPTION SET)
# UNRESOLVED: exact min/max ranges only obtainable at runtime via GAIN PARAMETER REQUEST 3 limits; source does not publish static ranges.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source. All status is poll-based via request commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # projector enters cooling; no commands accepted during cooldown
interlocks: []
notes: >-
  Power-on and power-off sequences block all other commands for the duration of
  the transition (including cooling time). Several error states (cover error,
  temperature error, fan error, lamp replacement moratorium) are reported via
  ERROR STATUS REQUEST and may prevent command acceptance (ERR 02h/0Dh when
  power off). Lens not installed properly, foreign-matter sensor, and interlock
  switch open are reported as error bits.
# UNRESOLVED: source states no explicit power-on sequencing procedure beyond command-blocking behavior.
```

## Notes
- **Frame structure**: Commands begin with a group header byte (00h–03h). Success responses begin with 20h–23h; error responses begin with A0h–A3h. The second byte echoes the command mnemonic. Responses carry ID1 (control ID) and ID2 (model code) which commands do not.
- **Checksum (CKS)**: low-order one byte (8 bits) of the sum of all preceding bytes. Example: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
- **Baud rate** is auto-switchable across 4800/9600/19200/38400/115200 bps; all are valid.
- Serial cable is a cross cable to the PC CONTROL port (D-SUB 9P); pinout documented in source (pin2 RxD, pin3 TxD, pin5 GND, pin7 RTS, pin8 CTS).
- Usage-time fields (lamp/filter) return seconds and update at one-minute intervals.
- Appendix "Supplementary Information by Command" (referenced for input terminal values, aspect values, eco mode values, sub-input values, base model types) is not included in this source excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' enumerations (input terminal, aspect, eco mode, sub-input, base model type values) not present in source. -->
<!-- UNRESOLVED: ID2 model code value for LED FA012I2 220 not stated. -->
<!-- UNRESOLVED: flow_control not stated in source (full-duplex noted only). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:51:32.146Z
last_checked_at: 2026-06-17T20:11:44.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:11:44.938Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands verbatim; transport parameters supported; one-to-one coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit details not specified (refers to operation manual). Firmware version compatibility not stated."
- "flow control not stated; source says full-duplex communication mode"
- "exact min/max ranges only obtainable at runtime via GAIN PARAMETER REQUEST 3 limits; source does not publish static ranges."
- "no unsolicited notification mechanism described in source. All status is poll-based via request commands."
- "no multi-step sequences described in source."
- "source states no explicit power-on sequencing procedure beyond command-blocking behavior."
- "firmware version compatibility not stated in source."
- "Appendix 'Supplementary Information by Command' enumerations (input terminal, aspect, eco mode, sub-input, base model type values) not present in source."
- "ID2 model code value for LED FA012I2 220 not stated."
- "flow_control not stated in source (full-duplex noted only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
