---
spec_id: admin/sharp-nec-nc2443ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2443ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC2443ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2443ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:15:20.100Z
last_checked_at: 2026-09-20T22:17:50.928Z
generated_at: 2026-09-20T22:17:50.928Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific appendix (\"Supplementary Information by Command\") not present in source — input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values are referenced but not enumerated."
  - "firmware version compatibility not stated in source."
  - "model name \"NC2443ML\" taken from task input; the source manual is generic to NEC-made projectors and does not name this model."
  - "source lists selectable rates 115200/38400/19200/9600/4800 bps, no single fixed value"
  - "flow control setting not stated in source"
  - "value list in source Appendix, not present in extracted text"
  - "no explicit safety warnings or interlock procedures in extracted source."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values) referenced but absent from extracted source."
  - "baud rate selectable among 115200/38400/19200/9600/4800 bps; per-model default not stated."
  - "serial flow control setting not stated."
  - "firmware version compatibility not stated."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-20T22:17:50.928Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match the source's53 command sections verbatim; transport parameters verified; full coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC NC2443ML Control Spec

## Summary
Control spec for the Sharp/NEC NC2443ML projector, derived from the vendor "Projector Control Command Reference Manual" (BDT140013, Revision 7.1). The projector is controlled over RS-232C serial or wired LAN (TCP port 7142) using framed binary commands with a trailing checksum byte.

<!-- UNRESOLVED: model-specific appendix ("Supplementary Information by Command") not present in source — input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values are referenced but not enumerated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model name "NC2443ML" taken from task input; the source manual is generic to NEC-made projectors and does not name this model. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists selectable rates 115200/38400/19200/9600/4800 bps, no single fixed value
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control setting not stated in source
  mode: full_duplex  # stated as "Full duplex"
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from power on/off commands (015/016)
- routable    # inferred from input switch command (018)
- queryable   # inferred from extensive request commands (009, 037 family, 078 family, etc.)
- levelable   # inferred from picture/volume/lamp adjust commands (030 family)
```

## Actions
```yaml
# Frame format: all commands carry a trailing checksum byte (CKS) = low-order 8 bits of
# the sum of all preceding bytes. {DATAxx} are parameter placeholders.

- id: error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response 20h 88h <ID1> <ID2> 0Ch DATA01-12 CKS; bits set to 1 indicate errors (fan, lamp, temperature, cover, interlock switch, etc.)"

- id: power_on
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power is turning on"

- id: power_off
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time"

- id: input_sw_change
  label: "018. Input SW Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (e.g. 06h = video port); full value list in source Appendix, not present in extracted text - UNRESOLVED"
  notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Mute cleared by input terminal switch or video signal switch"

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
  notes: "Mute cleared by input switch, signal switch, or volume adjustment"

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
    - name: target
      type: enum
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: mode
      type: enum
      description: "DATA02: 00h absolute, 01h relative"
    - name: value
      type: integer
      description: "DATA03 low-order 8 bits, DATA04 high-order 8 bits (signed; example -10 = F6h FFh)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: mode
      type: enum
      description: "DATA01: 00h absolute, 01h relative"
    - name: value
      type: integer
      description: "DATA02 low-order 8 bits, DATA03 high-order 8 bits"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: aspect
      type: integer
      description: "Aspect value; value list in source Appendix, not present in extracted text - UNRESOLVED"

- id: lamp_light_adjust
  label: "030-15. Other Adjust (Lamp/Light Adjust)"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: target
      type: string
      description: "DATA01=96h, DATA02=FFh fixed for LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: enum
      description: "DATA03: 00h absolute, 01h relative"
    - name: value
      type: integer
      description: "DATA04 low-order 8 bits, DATA05 high-order 8 bits"

- id: information_request
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds); updated at one-minute intervals"

- id: filter_usage_information_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s); -1 if undefined"

- id: lamp_information_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: lamp
      type: enum
      description: "DATA01: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: "DATA02: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch; remaining life negative if replacement deadline exceeded"

- id: carbon_savings_information_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: type
      type: enum
      description: "DATA01: 00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)"

- id: remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: key_code
      type: enum
      description: "WORD key code (DATA01, DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO"
  notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
    - name: target
      type: integer
      description: "DATA01: 06h Periphery Focus (only value present in extracted source; other targets likely lost in extraction - UNRESOLVED)"
    - name: drive
      type: enum
      description: "DATA02: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh drive plus, 81h drive minus, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: "Send 00h to stop continuous drive (7Fh/81h); same command can re-issue during motion without stop"

- id: lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: target
      type: integer
      description: "Lens target to query; target value list truncated in extracted source - UNRESOLVED"
  notes: "Response DATA02-07: upper limit, lower limit, current value (each 16-bit)"

- id: lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: integer
      description: "DATA01: FFh Stop (other targets truncated in extracted source - UNRESOLVED)"
    - name: mode
      type: enum
      description: "DATA02: 00h absolute, 02h relative"
    - name: value
      type: integer
      description: "DATA03 low-order 8 bits, DATA04 high-order 8 bits"

- id: lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"
  notes: "Controls profile number selected via LENS PROFILE SET (053-10)"

- id: lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Response DATA02: 00h OFF, 01h ON"

- id: lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: value
      type: enum
      description: "DATA02: 00h OFF, 01h ON"

- id: lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitmap: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=operating)"

- id: lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: profile
      type: enum
      description: "DATA01: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h Profile 1, 01h Profile 2"

- id: gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: gain
      type: enum
      description: "DATA01: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
  notes: "Response DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustable, FFh no such gain), DATA02-13 ranges/default/current/wide/narrow widths"

- id: setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03 base model type (values in Appendix - UNRESOLVED), DATA04 sound function (00h/01h), DATA05 profile (clock/sleep timer)"

- id: running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03 power status (00h standby, 01h power on, FFh unsupported), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h sleep, 04h power on, 05h cooling, 06h standby error, 0Fh power saving, 10h network standby)"

- id: input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: signal switch process, signal list number (returned value + 1 = actual), signal type 1/2, signal list type, test pattern, displayed content"

- id: mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off, 01h on)"

- id: model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL-terminated)"

- id: cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h normal (cover opened), 01h cover closed (mirror/lens cover)"

- id: freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: state
      type: enum
      description: "DATA01: 01h freeze on, 02h freeze off"

- id: information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: info_type
      type: enum
      description: "DATA01: 03h horizontal sync frequency, 04h vertical sync frequency"
  notes: "Response carries label/info string, NUL-terminated"

- id: eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco mode value (also Light/Lamp mode depending on model); value list in Appendix - UNRESOLVED"

- id: lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL-terminated)"

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address"

- id: pip_pbp_request
  label: "097-198. PIP/Picture By Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Response DATA02: mode 00h PIP/01h PbP; position 00h TL/01h TR/02h BL/03h BR; sub-input values in Appendix - UNRESOLVED"

- id: edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h OFF, 01h ON"

- id: eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: value
      type: integer
      description: "Eco mode value (also Light/Lamp mode); value list in Appendix - UNRESOLVED"

- id: lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes"

- id: pip_pbp_set
  label: "098-198. PIP/Picture By Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub-input values in Appendix - UNRESOLVED"

- id: edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: value
      type: enum
      description: "DATA01: 00h OFF, 01h ON"

- id: base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 and DATA12-13 base model type (values in Appendix - UNRESOLVED), DATA03-11 model name"

- id: serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL-terminated)"

- id: basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: operation status, displayed content, signal types, video signal type, video/sound/onscreen mute, freeze status"

- id: audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value; value list in Appendix - UNRESOLVED"
    - name: audio_source
      type: enum
      description: "DATA02: 00h audio from terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  values: [cover_error, fan_error, temperature_error_bimetal, power_error, lamp_off, lamp_replacement_moratorium, lamp_usage_time_over, formatter_error, fpga_error, temperature_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_states, ballast_communication_error, foreign_matter_sensor, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  notes: "From 009 response DATA01-12; bit=1 means error"

- id: power_state
  type: enum
  values: [standby, power_on]
  notes: "From 078-2 DATA03"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  notes: "From 078-2 DATA06 / 305-3 DATA01"

- id: cooling_in_progress
  type: boolean
  notes: "From 078-2 DATA04"

- id: input_status
  type: composite
  notes: "From 078-3: signal switch in progress, signal list number, selection signal type 1/2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/VIEWER/DVI-D/HDMI/DisplayPort), test pattern displayed, displayed content"

- id: picture_mute_state
  type: enum
  values: [on, off]

- id: sound_mute_state
  type: enum
  values: [on, off]

- id: onscreen_mute_state
  type: enum
  values: [on, off]

- id: freeze_state
  type: enum
  values: [on, off]

- id: lamp_usage_time
  type: integer
  unit: seconds
  notes: "From 037/037-4; updated at one-minute intervals"

- id: lamp_remaining_life
  type: integer
  unit: percent
  notes: "From 037-4; negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  unit: seconds

- id: cover_status
  type: enum
  values: [opened, closed]

- id: lens_operation_status
  type: bitmap
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  notes: "From 053-7; per-axis stop/operating"

- id: eco_mode
  type: enum  # UNRESOLVED: value list in source Appendix, not present in extracted text

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: model_name
  type: string
  notes: "From 078-5"

- id: serial_number
  type: string
  notes: "From 305-2"

- id: mac_address
  type: string
  notes: "From 097-155"

- id: projector_name
  type: string
  notes: "From 037 / 097-45; settable via 098-45"

- id: sync_frequencies
  type: string
  notes: "From 084: horizontal/vertical sync frequency strings"
```

## Variables
```yaml
# Settable parameters are represented as parameterized actions in Actions
# (volume_adjust, picture_adjust, lamp_light_adjust, eco_mode_set, pip_pbp_set,
# edge_blending_mode_set, audio_select_set, lan_projector_name_set,
# lens_memory_option_set). No separate variable entries required.
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are solicited
# replies to commands.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in extracted source.
# Operational note: interlock switch open state is reportable via 009 error status DATA09 bit1.
```

## Notes
- Frame format: `20h/02h/03h/00h/01h <cmd> 00h 00h <LEN> <DATA...> <CKS>`. First byte is destination (00h-03h command classes), responses echo with high bit set (2xh/3xh/Axh/Bxh) plus `<ID1> <ID2>` and LEN.
- Checksum: sum all preceding bytes, take low-order 8 bits. Worked example from source: `20h+81h+01h+60h+01h+00h=103h` → CKS = 03h.
- Error responses: `Axh/Bxh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`; error code table in source section 2.4 (e.g. 02h/0Dh = "command cannot be accepted because the power is off", 02h/0Fh = "no authority for operation").
- No other command is accepted while power is turning on (015) or turning off including cooling (016).
- Lamp/filter usage times update at one-minute intervals despite one-second resolution.
- Some models cannot receive commands in standby mode (see source Appendix — not present in extracted text).
- Serial cable is cross-wired: D-SUB 9P, pin2 RxD↔TxD, pin3 TxD↔RxD, pin5 GND, pin7 RTS↔CTS, pin8 CTS↔RTS.
- Source manual revision: BDT140013 Rev 7.1 (revision history up to 8.0, June 29 2022, in principal document).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values) referenced but absent from extracted source. -->
<!-- UNRESOLVED: baud rate selectable among 115200/38400/19200/9600/4800 bps; per-model default not stated. -->
<!-- UNRESOLVED: serial flow control setting not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:15:20.100Z
last_checked_at: 2026-09-20T22:17:50.928Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:17:50.928Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match the source's53 command sections verbatim; transport parameters verified; full coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific appendix (\"Supplementary Information by Command\") not present in source — input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values are referenced but not enumerated."
- "firmware version compatibility not stated in source."
- "model name \"NC2443ML\" taken from task input; the source manual is generic to NEC-made projectors and does not name this model."
- "source lists selectable rates 115200/38400/19200/9600/4800 bps, no single fixed value"
- "flow control setting not stated in source"
- "value list in source Appendix, not present in extracted text"
- "no explicit safety warnings or interlock procedures in extracted source."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values) referenced but absent from extracted source."
- "baud rate selectable among 115200/38400/19200/9600/4800 bps; per-model default not stated."
- "serial flow control setting not stated."
- "firmware version compatibility not stated."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
