---
spec_id: admin/sharp-nec-xp-a824u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A824U W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A824U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A824U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:51:57.157Z
last_checked_at: 2026-06-19T07:49:45.820Z
generated_at: 2026-06-19T07:49:45.820Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control ID (ID1) and model code (ID2) defaults not stated in source; appendix \"Supplementary Information by Command\" (input terminal values, base model type values, sub input values, eco mode values) is not present in this refined source excerpt"
  - "control ID (ID1) default and model code (ID2) for Xp A824U W not stated in source"
  - "Appendix \"Supplementary Information by Command\" (input terminal values, base model type codes, sub input setting values, eco mode values) is not present in refined source"
  - "flow_control method not explicitly stated (only \"full duplex\" communication mode)"
  - "firmware version compatibility not stated"
  - "no auth / login procedure documented, but no explicit statement that auth is unsupported"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:49:45.820Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions confirmed in source with matching hex opcodes; transport parameters (baud, data bits, parity, stop bits, port) all verified against manual §1.2-1.3. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A824U W Control Spec

## Summary
Sharp/NEC Xp A824U W projector, dual-transport control via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN TCP. Binary command protocol with hex framing, checksum byte, and per-model control/model IDs. Covers power, input switching, mute, picture/volume/aspect adjust, lens control & memory, lamp/filter status, eco mode, PIP/PbP, edge blending, and information queries.

<!-- UNRESOLVED: control ID (ID1) and model code (ID2) defaults not stated in source; appendix "Supplementary Information by Command" (input terminal values, base model type values, sub input values, eco mode values) is not present in this refined source excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; specific flow-control method not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON/OFF commands
  - queryable       # inferred from numerous status/error/info request commands
  - levelable       # inferred from picture/volume/gain adjust commands
  - routable        # inferred from INPUT SW CHANGE / audio select commands
```

## Actions
```yaml
- id: error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. Input SW Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command'); example 06h = video port"

- id: picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. Picture Mute Off"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. Sound Mute On"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. Sound Mute Off"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. Onscreen Mute On"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. Picture Adjust"
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
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (see Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: "030-15. Other Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target hi byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target lo byte (FFh pairs 96h)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time (seconds), 04h remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD key code list: e.g. 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed key codes)"

- id: shutter_close
  label: "051. Shutter Close"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. Shutter Open"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. Lens Control"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h Periphery Focus); other values not enumerated in source"
    - name: DATA02
      type: integer
      description: "Motion: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h −continuous, FDh −0.25s, FEh −0.5s, FFh −1s"

- id: lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector

- id: lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET (applies to profile set via 053-10)"

- id: lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting: 00h OFF, 01h ON"

- id: lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

- id: setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/Picture By Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: Projector name byte 1 (up to 16 bytes total)

- id: pip_picture_by_picture_set
  label: "098-198. PIP/Picture By Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h PIP/01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub input values per Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting: 00h OFF, 01h ON"

- id: base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: integer
      description: "Setting: 00h terminal-specified audio, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: command_ack
  type: ack
  description: "Success response frame; first byte 2Xh/AXh prefix per command class with ID1/ID2 echoed. No-data commands: LEN=00h. Data requests: LEN + DATA bytes appended."

- id: command_error
  type: enum
  description: "Error response frame A[X]h [CMD] <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  values:
    - "ERR1=00h,ERR2=00h: command not recognized"
    - "ERR1=00h,ERR2=01h: command not supported by model"
    - "ERR1=01h,ERR2=00h: specified value invalid"
    - "ERR1=01h,ERR2=01h: specified input terminal invalid"
    - "ERR1=01h,ERR2=02h: specified language invalid"
    - "ERR1=02h,ERR2=00h: memory allocation error"
    - "ERR1=02h,ERR2=02h: memory in use"
    - "ERR1=02h,ERR2=03h: specified value cannot be set"
    - "ERR1=02h,ERR2=04h: forced onscreen mute on"
    - "ERR1=02h,ERR2=06h: viewer error"
    - "ERR1=02h,ERR2=07h: no signal"
    - "ERR1=02h,ERR2=08h: test pattern or filter displayed"
    - "ERR1=02h,ERR2=09h: no PC card inserted"
    - "ERR1=02h,ERR2=0Ah: memory operation error"
    - "ERR1=02h,ERR2=0Ch: entry list displayed"
    - "ERR1=02h,ERR2=0Dh: command cannot be accepted (power off)"
    - "ERR1=02h,ERR2=0Eh: command execution failed"
    - "ERR1=02h,ERR2=0Fh: no authority for operation"
    - "ERR1=03h,ERR2=00h: specified gain number incorrect"
    - "ERR1=03h,ERR2=01h: specified gain invalid"
    - "ERR1=03h,ERR2=02h: adjustment failed"

- id: error_status_bits
  type: bitmask
  description: "DATA01-DATA12 from command 009; per-bit error flags covering cover/fan/temperature/power/lamp/formatter/mirror-cover/iris/lens/ballast/interlock/system errors. Full mapping in source §3.1."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_signal_state
  type: composite
  description: "From 078-3/305-3: signal switch process, list number, selection signal types 1/2, content displayed, test pattern, video mute, sound mute, onscreen mute, freeze status."

- id: mute_state
  type: composite
  description: "From 078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each on/off)."

- id: lens_status
  type: bitmask
  description: "From 053-7 DATA01 bits: lens memory, zoom, focus, lens-shift-H, lens-shift-V operation state."

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]
```

## Variables
```yaml
- id: projector_name
  type: string
  description: "Projector name on LAN (read via 097-45, write via 098-45, up to 16 bytes)."

- id: lamp_remaining_life_percent
  type: integer
  description: "Lamp remaining life %, queried via 037-4 DATA02=04h; negative if replacement deadline exceeded."

- id: lamp_usage_seconds
  type: integer
  description: "Lamp usage in seconds, queried via 037-4 DATA02=01h; updated at 1-minute intervals."

- id: filter_usage_seconds
  type: integer
  description: "Filter usage time in seconds, queried via 037-3."

- id: picture_brightness
  type: integer
  description: "Picture brightness, adjusted via 030-1 DATA01=00h; range queried via 060-1 DATA01=00h."

- id: picture_contrast
  type: integer
  description: "Picture contrast, adjusted via 030-1 DATA01=01h."

- id: picture_color
  type: integer
  description: "Picture color, adjusted via 030-1 DATA01=02h."

- id: picture_hue
  type: integer
  description: "Picture hue, adjusted via 030-1 DATA01=03h."

- id: picture_sharpness
  type: integer
  description: "Picture sharpness, adjusted via 030-1 DATA01=04h."

- id: volume
  type: integer
  description: "Sound volume, adjusted via 030-2; range queried via 060-1 DATA01=05h."

- id: eco_mode
  type: integer
  description: "Eco/Light/Lamp mode (read 097-8, write 098-8); value semantics per Appendix."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "Reference lens memory profile, set via 053-10, queried via 053-11."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "Edge blending, set via 098-243-1, queried via 097-243-1."

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: "PIP/PbP mode (097-198/098-198 DATA01=00h)."

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: "PIP/PbP start position (097-198/098-198 DATA01=01h)."
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are replies to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source:
# - POWER ON command blocks all other commands during power-on sequence (§3.2).
# - POWER OFF command blocks all other commands during cooldown (§3.3).
# - Some commands rejected with ERR 02h/0Dh "command cannot be accepted (power off)" when projector is off.
# No explicit safety interlock procedure, power-on sequencing requirement, or voltage/current data stated in source.
```

## Notes
- Checksum (CKS): sum of all preceding bytes, low-order one byte. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Command frame format: leading byte encodes direction/class (`0Xh` request, `2Xh` success response, `AXh` error response); followed by command opcode, `<ID1> <ID2>` (control ID + model code), `LEN`, optional DATA bytes, `CKS`.
- ID1 = projector's configured control ID; ID2 = model code (model-specific).
- Serial port: D-SUB 9P PC CONTROL, cross cable. Pin 2 RxD / 3 TxD / 5 GND / 7 RTS / 8 CTS.
- LAN: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit. TCP port 7142.
- Lamp/filter usage time has 1-second resolution but updates at 1-minute intervals.

<!-- UNRESOLVED: control ID (ID1) default and model code (ID2) for Xp A824U W not stated in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, base model type codes, sub input setting values, eco mode values) is not present in refined source -->
<!-- UNRESOLVED: flow_control method not explicitly stated (only "full duplex" communication mode) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no auth / login procedure documented, but no explicit statement that auth is unsupported -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:51:57.157Z
last_checked_at: 2026-06-19T07:49:45.820Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:49:45.820Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions confirmed in source with matching hex opcodes; transport parameters (baud, data bits, parity, stop bits, port) all verified against manual §1.2-1.3. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control ID (ID1) and model code (ID2) defaults not stated in source; appendix \"Supplementary Information by Command\" (input terminal values, base model type values, sub input values, eco mode values) is not present in this refined source excerpt"
- "control ID (ID1) default and model code (ID2) for Xp A824U W not stated in source"
- "Appendix \"Supplementary Information by Command\" (input terminal values, base model type codes, sub input setting values, eco mode values) is not present in refined source"
- "flow_control method not explicitly stated (only \"full duplex\" communication mode)"
- "firmware version compatibility not stated"
- "no auth / login procedure documented, but no explicit statement that auth is unsupported"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
