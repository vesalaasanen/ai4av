---
spec_id: admin/sharp-nec-v984q
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V984Q Control Spec"
manufacturer: Sharp/NEC
model_family: V984Q
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - V984Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:26:33.735Z
last_checked_at: 2026-06-19T07:45:43.244Z
generated_at: 2026-06-19T07:45:43.244Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value codes referenced to an \"Appendix\" not present in refined source. Eco mode values similarly referenced. Sub input setting values for PIP/PbP referenced to appendix. Firmware version not stated."
  - "no explicit power-on sequencing requirements beyond interlock notes above."
  - "input terminal value codes referenced to an appendix not in the refined source."
  - "eco mode value list referenced to an appendix not in the refined source."
  - "sub input setting values for PIP/PbP referenced to an appendix not in the refined source."
  - "model code (ID2) value for V984Q not stated in source."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:45:43.244Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source; each command has literal hex match in corresponding manual section; transport parameters (serial 9600/8N1, TCP 7142) all corroborated. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V984Q Control Spec

## Summary
Sharp/NEC V984Q is a large-format professional display/projector controllable via RS-232C serial or TCP/IP LAN (port 7142). This spec covers 53 documented commands including power, input switching, mute (picture/sound/onscreen), picture/volume/aspect adjust, lens control and memory, freeze, eco mode, edge blending, PIP/PbP, and extensive status queries (error, running status, input, lamp/filter usage, model info, serial number).

<!-- UNRESOLVED: input terminal value codes referenced to an "Appendix" not present in refined source. Eco mode values similarly referenced. Sub input setting values for PIP/PbP referenced to appendix. Firmware version not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # configurable: 4800/9600/19200/38400/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex, no flow control type stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: power on/off commands (015/016)
  - routable  # inferred: input switch command (018)
  - queryable  # inferred: many query commands (009/037/078/etc.)
  - levelable  # inferred: volume/picture adjust commands (030-1/030-2)
```

## Actions
```yaml
# Command frame format: <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>
# HDR: 00h-03h = request (varies by command class), 20h-23h = success response,
#      A0h-A3h = error response. ID1 = control ID, ID2 = model code.
# CKS = low-order byte of sum of all preceding bytes (excl. frame markers).
# Commands below show the request payload (excl. ID1/ID2 which are device-specific).

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns 12 bytes of error bitfield data (DATA01-DATA12)."

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other commands accepted during power-on sequence."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other commands accepted during power-off including cooling time."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (e.g. 06h=Video). Full list in appendix not in source."
  notes: "Response DATA01=FFh means error (no signal switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input switch or video signal switch."

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
  notes: "Cleared on input switch, video signal switch, or volume adjustment."

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
  notes: "Cleared on input switch or video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
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
  notes: "Example: brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
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
  notes: "Example: volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Full list in appendix not in source."

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (96h=LAMP/LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Adjustment target low byte (FFh)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-min intervals."

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: "Remaining life negative if replacement deadline exceeded. Example: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: data02
      type: integer
      description: "Key code high byte (see key code list)"
  notes: "Key codes: 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 0Fh00h=MAGNIFY UP, 10h00h=MAGNIFY DOWN, 13h00h=MUTE, 29h00h=PICTURE, 4Bh00h=COMPUTER1, 4Ch00h=COMPUTER2, 4Fh00h=VIDEO1, 51h00h=S-VIDEO1, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after continuous drive (7Fh/81h). Lens can be controlled without stop by reissuing same command."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (same as lens_control DATA01)"
  notes: "Returns upper/lower limits and current value for the lens target."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), mode and value not referenced."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number specified by LENS PROFILE SET (053-10)."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield: Bit0=Lens Memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment width."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Returns label string and value."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or light mode / lamp mode depending on model). Full value list in appendix."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name string (DATA01-17, NUL-terminated)."

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address (DATA01-06)."

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Returns current setting value for the queried parameter."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. Full list in appendix not in source."
  notes: "Sets light mode or lamp mode depending on model."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: data01_to_data16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"
  notes: "Response confirms with first byte of name."

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub input values in appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type (DATA12-13)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number string (DATA01-16, NUL-terminated)."

- id: basic_info_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal type, mute/freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Full list in appendix not in source."
    - name: data02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: "12-byte error bitfield from ERROR STATUS REQUEST (009). Covers cover/fan/temp/power/lamp errors."
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From RUNNING STATUS REQUEST (078-2) DATA06."
- id: input_signal_type
  type: enum
  description: "From INPUT STATUS REQUEST (078-3). Signal type 1 and 2."
- id: mute_state
  type: object
  description: "From MUTE STATUS REQUEST (078-4). Picture/sound/onscreen/forced mute + OSD display."
- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "From INFORMATION REQUEST (037) DATA83-86 or LAMP INFO REQUEST 3 (037-4)."
- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "From LAMP INFO REQUEST 3 (037-4). Negative if replacement deadline exceeded."
- id: filter_usage_time
  type: integer
  unit: seconds
  description: "From FILTER USAGE INFO REQUEST (037-3) DATA01-04."
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "From COVER STATUS REQUEST (078-6)."
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "Picture brightness. Set via PICTURE ADJUST (030-1) DATA01=00h."
- id: contrast
  type: integer
  description: "Picture contrast. Set via PICTURE ADJUST (030-1) DATA01=01h."
- id: color
  type: integer
  description: "Picture color. Set via PICTURE ADJUST (030-1) DATA01=02h."
- id: hue
  type: integer
  description: "Picture hue. Set via PICTURE ADJUST (030-1) DATA01=03h."
- id: sharpness
  type: integer
  description: "Picture sharpness. Set via PICTURE ADJUST (030-1) DATA01=04h."
- id: volume
  type: integer
  description: "Sound volume. Set via VOLUME ADJUST (030-2)."
- id: lamp_light_adjust
  type: integer
  description: "Lamp/light adjust. Set via OTHER ADJUST (030-15) DATA01=96h."
- id: eco_mode
  type: integer
  description: "Eco/light/lamp mode. Set via ECO MODE SET (098-8). Values in appendix."
- id: projector_name
  type: string
  max_length: 16
  description: "LAN projector name. Set via LAN PROJECTOR NAME SET (098-45)."
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "Reference lens memory profile. Set via LENS PROFILE SET (053-10)."
```

## Events
```yaml
# No unsolicited notifications documented in source. Device only responds to commands.
# Responses are solicited (request/response model with ACK/error frames).
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # power-off triggers cooling sequence; no commands accepted during
interlocks:
  - "No other command accepted during power-on sequence (015)."
  - "No other command accepted during power-off including cooling time (016)."
  - "Interlock switch open triggers error (DATA09 Bit1 in ERROR STATUS REQUEST)."
# UNRESOLVED: no explicit power-on sequencing requirements beyond interlock notes above.
```

## Notes
- Command frame: request bytes followed by `<ID1> <ID2>` (device-specific control ID + model code), `<LEN>` (data length), `<DATA...>`, `<CKS>` (checksum).
- Checksum = low-order byte of sum of all preceding bytes (including header, ID1, ID2, LEN, DATA).
- Success response headers: 20h-23h (class-specific). Error response headers: A0h-A3h with ERR1/ERR2 codes.
- Error codes: ERR1/ERR2 pairs. Common: 00h/00h=unrecognized, 00h/01h=unsupported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Fh=no authority.
- Serial cable: cross cable, D-SUB 9P. Pin 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- Usage times updated at 1-minute intervals despite 1-second resolution.

<!-- UNRESOLVED: input terminal value codes referenced to an appendix not in the refined source. -->
<!-- UNRESOLVED: eco mode value list referenced to an appendix not in the refined source. -->
<!-- UNRESOLVED: sub input setting values for PIP/PbP referenced to an appendix not in the refined source. -->
<!-- UNRESOLVED: model code (ID2) value for V984Q not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:26:33.735Z
last_checked_at: 2026-06-19T07:45:43.244Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:45:43.244Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source; each command has literal hex match in corresponding manual section; transport parameters (serial 9600/8N1, TCP 7142) all corroborated. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value codes referenced to an \"Appendix\" not present in refined source. Eco mode values similarly referenced. Sub input setting values for PIP/PbP referenced to appendix. Firmware version not stated."
- "no explicit power-on sequencing requirements beyond interlock notes above."
- "input terminal value codes referenced to an appendix not in the refined source."
- "eco mode value list referenced to an appendix not in the refined source."
- "sub input setting values for PIP/PbP referenced to an appendix not in the refined source."
- "model code (ID2) value for V984Q not stated in source."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
