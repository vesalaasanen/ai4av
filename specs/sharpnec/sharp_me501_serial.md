---
spec_id: admin/sharpnec-me501
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME501 Control Spec"
manufacturer: Sharp/NEC
model_family: ME501
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - ME501
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:33:35.569Z
last_checked_at: 2026-06-18T08:29:54.562Z
generated_at: 2026-06-18T08:29:54.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for ME501 not stated in source — required for command framing. Input terminal DATA01 values referenced in \"Appendix: Supplementary Information by Command\" which is not present in the refined source. Aspect adjust values, base model type values, sub input setting values, eco mode values, display signal type details likewise reference that missing appendix."
  - "flow control not explicitly stated (RTS/CTS pins present in pinout)"
  - "PIP/PbP, eco mode, audio select, base model type, signal type enum value lists referenced in source appendix not present in refined text"
  - "source describes command/response model only; no unsolicited notifications documented"
  - "no multi-step sequences explicitly described in source"
  - "error code 0Fh 'no authority for operation' implies access control exists but mechanism not described"
  - "Source \"Appendix: Supplementary Information by Command\" not present in refined text — input terminal codes, aspect values, base model types, eco mode values, sub input values, display signal type list are all referenced but not extracted."
  - "model code (ID2) for ME501 not stated — required to build complete command frames."
  - "default baud rate among the 5 listed rates not stated."
  - "flow_control not explicitly stated in source (RTS/CTS pins wired per pinout, communication mode stated as \"Full duplex\" only)."
  - "ME501 model code (ID2), baud default, flow control, appendix-referenced value lists (input terminals / aspect / eco / sub-input / base-model-type)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:29:54.562Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME501 Control Spec

## Summary
Sharp/NEC ME501 projector control spec via RS-232C serial and TCP/IP LAN (port 7142). Covers power, input switching, mutes, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a large set of status/identity/error query commands using binary hex frames with checksum.

<!-- UNRESOLVED: model code (ID2) value for ME501 not stated in source — required for command framing. Input terminal DATA01 values referenced in "Appendix: Supplementary Information by Command" which is not present in the refined source. Aspect adjust values, base model type values, sub input setting values, eco mode values, display signal type details likewise reference that missing appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 - default not stated; 9600 shown as lowest supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (RTS/CTS pins present in pinout)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from POWER ON / POWER OFF commands (015, 016)
- queryable   # inferred from many status request commands
- levelable   # inferred from PICTURE/VOLUME/ASPECT/GAIN adjust commands
- routable    # inferred from INPUT SW CHANGE command (018)
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

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full list in source appendix "Supplementary Information by Command".
  notes: "CKS = checksum byte (low-order 8 bits of sum of preceding bytes)"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value - see source appendix "Supplementary Information by Command"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "FFh (per source table)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
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
  notes: "Response DATA01-49=projector name, DATA83-86=lamp usage time (sec), DATA87-90=filter usage time (sec)"

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04=filter usage time (sec), DATA05-08=filter alarm start time (sec)"

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (always 00h per source table)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (lens axis)
  notes: "Response DATA02-07 = upper/lower limit + current value (16-bit LE pairs)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop, else adjustment target"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop, 1=During operation)"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03=base model type, DATA04=sound function, DATA05=profile/clock/sleep timer"

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03=power status, DATA04=cooling, DATA05=power on/off process, DATA06=operation status"

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display"

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode / Lamp mode value - see source appendix for value mapping"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 = projector name (NUL-terminated)"

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 = MAC address"

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value - see source appendix for value mapping

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values - see source appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02=base model type, DATA03-11=model name (NUL-terminated), DATA12-13=base model type"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 = serial number (NUL-terminated)"

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: operation status, content displayed, signal type 1/2, display signal type, video/sound/onscreen mute, freeze status"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal - see source appendix
    - name: DATA02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, power_on]
  source: running_status_request DATA03 (00h=Standby, 01h=Power on)

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, standby_power_saving_alt]
  source: running_status_request DATA06 (00h/04h/05h/06h/0Fh/10h)

- id: mute_status
  type: object
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: mute_status_request DATA01-05

- id: error_status
  type: bitfield
  description: 12-byte error bitmap from error_status_request (DATA01-12)
  source: error_status_request

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request DATA01

- id: lens_information
  type: bitfield
  description: Lens motor activity bits (lens memory, zoom, focus, lens shift H, lens shift V)
  source: lens_information_request DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request DATA01

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_request DATA01

# UNRESOLVED: PIP/PbP, eco mode, audio select, base model type, signal type enum value lists referenced in source appendix not present in refined text
```

## Variables
```yaml
- id: brightness
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=00h)
  write_command: picture_adjust (DATA01=00h)

- id: contrast
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=01h)
  write_command: picture_adjust (DATA01=01h)

- id: color
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=02h)
  write_command: picture_adjust (DATA01=02h)

- id: hue
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=03h)
  write_command: picture_adjust (DATA01=03h)

- id: sharpness
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=04h)
  write_command: picture_adjust (DATA01=04h)

- id: volume
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=05h)
  write_command: volume_adjust

- id: lamp_light_adjust
  type: integer
  access: read_write
  read_command: gain_parameter_request_3 (DATA01=96h)
  write_command: other_adjust (DATA01=96h)

- id: lamp_usage_time_seconds
  type: integer
  access: read_only
  read_command: lamp_information_request_3 (DATA02=01h)

- id: lamp_remaining_life_percent
  type: integer
  access: read_only
  read_command: lamp_information_request_3 (DATA02=04h)

- id: filter_usage_time_seconds
  type: integer
  access: read_only
  read_command: filter_usage_information_request

- id: projector_name
  type: string
  access: read_write
  read_command: lan_projector_name_request
  write_command: lan_projector_name_set
```

## Events
```yaml
# UNRESOLVED: source describes command/response model only; no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress"
  - "POWER OFF: no other command accepted during power-off including cooling time"
# UNRESOLVED: error code 0Fh 'no authority for operation' implies access control exists but mechanism not described
```

## Notes
- Binary protocol. Frame layout: `{cmd} {sub} {ID1} {ID2} {LEN} {DATA...} {CKS}` where CKS = low byte of sum of all preceding bytes. Worked example in source §2.2.
- Response framing: success prefix = command byte | 0x80 (e.g. cmd `02h` → resp `22h`, `03h` → `23h`, `00h` → `20h`, `01h` → `21h`); error prefix = `A{cmd}` (e.g. `A2h`, `A3h`, `A0h`, `A1h`). Error responses carry `<ERR1> <ERR2>`.
- ID1 = control ID set on projector; ID2 = model code (varies by model — **UNRESOLVED**: ME501 model code not stated).
- Full error code table in source §2.4 (ERR1/ERR2 combinations).
- Serial baud is selectable (115200/38400/19200/9600/4800); default not stated in source.
- LAN wired 10/100BASE-TX auto-negotiation; wireless via optional dongle (separate manual).
- Command list page references (009–319) map to manual pages 13–85.
- `LAN PROJECTOR NAME SET` response DATA01 echo shown as `01h`/`02h` for input terminal in source table for AUDIO SELECT — appears to be a layout artifact in the source; values here follow the AUDIO SELECT SET table.
<!-- UNRESOLVED: Source "Appendix: Supplementary Information by Command" not present in refined text — input terminal codes, aspect values, base model types, eco mode values, sub input values, display signal type list are all referenced but not extracted. -->
<!-- UNRESOLVED: model code (ID2) for ME501 not stated — required to build complete command frames. -->
<!-- UNRESOLVED: default baud rate among the 5 listed rates not stated. -->
<!-- UNRESOLVED: flow_control not explicitly stated in source (RTS/CTS pins wired per pinout, communication mode stated as "Full duplex" only). -->
````

Spec above. 53 actions enumerated (every numbered row in source §2 command list). Gaps flagged UNRESOLVED: ME501 model code (ID2), baud default, flow control, appendix-referenced value lists (input terminals / aspect / eco / sub-input / base-model-type).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:33:35.569Z
last_checked_at: 2026-06-18T08:29:54.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:29:54.562Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for ME501 not stated in source — required for command framing. Input terminal DATA01 values referenced in \"Appendix: Supplementary Information by Command\" which is not present in the refined source. Aspect adjust values, base model type values, sub input setting values, eco mode values, display signal type details likewise reference that missing appendix."
- "flow control not explicitly stated (RTS/CTS pins present in pinout)"
- "PIP/PbP, eco mode, audio select, base model type, signal type enum value lists referenced in source appendix not present in refined text"
- "source describes command/response model only; no unsolicited notifications documented"
- "no multi-step sequences explicitly described in source"
- "error code 0Fh 'no authority for operation' implies access control exists but mechanism not described"
- "Source \"Appendix: Supplementary Information by Command\" not present in refined text — input terminal codes, aspect values, base model types, eco mode values, sub input values, display signal type list are all referenced but not extracted."
- "model code (ID2) for ME501 not stated — required to build complete command frames."
- "default baud rate among the 5 listed rates not stated."
- "flow_control not explicitly stated in source (RTS/CTS pins wired per pinout, communication mode stated as \"Full duplex\" only)."
- "ME501 model code (ID2), baud default, flow control, appendix-referenced value lists (input terminals / aspect / eco / sub-input / base-model-type)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
