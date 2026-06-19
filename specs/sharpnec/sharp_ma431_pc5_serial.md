---
spec_id: admin/sharpnec-ma431-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma431 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma431 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma431 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:19:51.124Z
last_checked_at: 2026-06-18T08:13:44.759Z
generated_at: 2026-06-18T08:13:44.759Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal enums, aspect values, eco mode values, base model type values, sub input values) not present in refined source — DATA enums referencing the appendix cannot be fully enumerated."
  - "no unsolicited async notification model documented; all responses are command-reply only."
  - "appendix-defined enum ranges (eco mode values, aspect values, base model"
  - "source documents no unsolicited events; device is strict request/response."
  - "source documents no multi-step macro sequences."
  - "source states that POWER ON/OFF reject all other commands during the"
  - "firmware version compatibility not stated in source."
  - "input terminal, aspect, eco mode, base model type, sub input enums live in \"Appendix — Supplementary Information by Command\" which is not included in the refined source artifact; the affected actions carry a note pointing to that appendix."
  - "power/voltage/current specifications not present in refined source."
  - "wireless LAN unit specifics deferred to per-model operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:13:44.759Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma431 Pc5 Control Spec

## Summary
Sharp/NEC projector (Ma431 Pc5) controlled via RS-232C serial (D-SUB 9P PC CONTROL port) or wired/wireless LAN (TCP). Spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect/lamp adjustments, shutter, lens control & memory, freeze, eco mode, PIP/PbP, edge blending, and a large set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated; appendix "Supplementary Information by Command" (input terminal enums, aspect values, eco mode values, base model type values, sub input values) not present in refined source — DATA enums referencing the appendix cannot be fully enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five selectable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Communication mode: Full duplex"; RTS/CTS pins wired per pinout table
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable    # inferred: many status/information request commands present
  - routable     # inferred: 018 INPUT SW CHANGE present
  - levelable    # inferred: 030-1 PICTURE / 030-2 VOLUME / 030-15 gain adjusts present
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
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (incl. cooling time)."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full enum in Appendix 'Supplementary Information by Command'."
  notes: "Example: switch to video port = 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = ended with error (no signal switch)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

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
  notes: "Cleared by input/video switch or volume adjustment."

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
  notes: "Cleared by input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. brightness=-10: ...F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - enum in Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (DATA01=96h for LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time (s), 04h remaining life (%)"
  notes: "Example get lamp usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life % returned if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD; 00h for all listed codes)"
  notes: "Response DATA01 FFh = ended with error."

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
      description: "Lens target; source documents 06h = Periphery Focus (other values referenced in appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +, 81h drive -, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"
  notes: "After 7Fh/81h, send 00h to stop. While lens driving, repeat command to control without stop. Response FFh = error."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target selector"
  notes: "Returns upper/lower limits and current value (16-bit, little-endian) for the requested lens target."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Response FFh = ended with error."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Operates on profile number selected by 053-10 LENS PROFILE SET. Response FFh = error."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Response DATA02: 00h OFF, 01h ON."

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
  notes: "Returns DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) - 0=Stop, 1=During operation. Bits 5-7 reserved."

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
  notes: "Returns DATA01: 00h Profile 1, 01h Profile 2. DATA02 reserved."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status/limits/default/current/wide-narrow widths (16 bytes)."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04: 00h N/A, 01h avail), profile number (DATA05: 00h N/A, 01h Clock, 02h Sleep timer, 03h both)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 Power (00h Standby, 01h On, FFh N/A); DATA04 Cooling; DATA05 Power On/Off process; DATA06 Operation status (00h Standby/Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Power saving, 10h Network standby)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (-1 vs practical), selection signal type 1 & 2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/HDMI/DisplayPort/VIEWER etc.), signal list type, test pattern, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 Picture mute, DATA02 Sound mute, DATA03 Onscreen mute, DATA04 Forced onscreen mute, DATA05 Onscreen display - each 00h Off / 01h On."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h Normal (cover opened), 01h Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h Freeze on, 02h Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency"
  notes: "Returns label length (DATA02) and label/info string (DATA03+, NUL-terminated)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns DATA01 eco mode value (enum in appendix). Returns Light mode or Lamp mode depending on model."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name DATA01-17 (NUL-terminated)."

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address DATA01-06."

- id: pip_pbp_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "MODE values: 00h PIP, 01h PbP. START POSITION: 00h TL, 01h TR, 02h BL, 03h BR. Sub input enum in appendix."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h OFF, 01h ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (enum in appendix). Sets Light mode or Lamp mode depending on model."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Projector name bytes 1-16 (up to 16 bytes, NUL-padded)"

- id: pip_pbp_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub input enum in appendix)"
  notes: "Response uses DATA01 00h MODE, 03h SUB INPUT 2, 04h SUB INPUT 3 (different from request codes - see source 3.48)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11, NUL-terminated). Type enum in appendix."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number DATA01-16 (NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status (DATA01-09)."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (enum in appendix)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h = terminal specified in DATA01, 01h BNC, 02h COMPUTER"
  notes: "Response DATA02: 00h success, 01h error."
```

## Feedbacks
```yaml
# Success/failure ack returned after every command per source §2.3.
- id: command_ack
  type: ack
  description: "Standard response frame. Success: 2Xh/AXh prefix with optional DATA; failure: AXh prefix with ERR1+ERR2."
- id: error_response
  type: enum
  description: "ERR1/ERR2 byte pair per §2.4 error code list"
  values:
    - "00h 00h: command not recognized"
    - "00h 01h: command not supported by model"
    - "01h 00h: specified value invalid"
    - "01h 01h: specified input terminal invalid"
    - "01h 02h: specified language invalid"
    - "02h 00h: memory allocation error"
    - "02h 02h: memory in use"
    - "02h 03h: specified value cannot be set"
    - "02h 04h: forced onscreen mute on"
    - "02h 06h: viewer error"
    - "02h 07h: no signal"
    - "02h 08h: test pattern or filter displayed"
    - "02h 09h: no PC card inserted"
    - "02h 0Ah: memory operation error"
    - "02h 0Ch: entry list displayed"
    - "02h 0Dh: command not accepted - power off"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority for operation"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"
- id: error_status_bitfield
  type: bitfield
  description: "12-byte error status returned by 009 ERROR STATUS REQUEST (DATA01-12). Bits: cover/fan/temp/power/lamp errors, formatter/FPGA errors, mirror cover, interlock switch, system errors (full map in source §3.1)."
- id: lens_status_bitfield
  type: bitfield
  description: "DATA01 from 053-7: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) - 0 Stop / 1 During operation."
# UNRESOLVED: no unsolicited async notification model documented; all responses are command-reply only.
```

## Variables
```yaml
# Settable parameters already represented as Actions (030-1 PICTURE, 030-2 VOLUME,
# 030-12 ASPECT, 030-15 LAMP/LIGHT, 098-8 ECO MODE, 098-45 LAN NAME, 098-198 PIP/PbP,
# 098-243-1 EDGE BLENDING, 319-10 AUDIO SELECT). No additional settable variables
# outside those action payloads are documented.
# UNRESOLVED: appendix-defined enum ranges (eco mode values, aspect values, base model
# types, sub input values, input terminal values) not present in refined source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited events; device is strict request/response.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states that POWER ON/OFF reject all other commands during the
# power transition (incl. cooling time) and that some operations require authority
# (ERR 02h 0Fh "no authority for operation"), but does not document explicit
# confirmation/interlock procedures. No power-on sequencing, voltage, or current
# data is present in the refined source.
```

## Notes
- **Frame format:** every command/response is a hex byte sequence wrapped in framing bytes. Generic forms: command `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>`; success ack `2Xh` prefix (where X matches command's second byte) optionally followed by DATA; error ack `AXh` prefix followed by `02h <ERR1> <ERR2> <CKS>`.
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Common parameters:** ID1 = control ID set on projector; ID2 = model code (varies by model); LEN = data length (bytes) following LEN; DATA?? = variable-length data; ERR1/ERR2 = response error code pair.
- **Timing:** lamp usage and filter usage times are returned in 1-second units but updated only at 1-minute intervals.
- **Two-lamp models:** DATA01 `01h` (Lamp 2) in LAMP INFORMATION REQUEST 3 is effective only on two-lamp projector models.
- **Lens drive quirk:** after sending `7Fh` (drive +) or `81h` (drive −) in 053 LENS CONTROL, an explicit `00h` (Stop) must be sent to halt.
- **Lamp remaining life:** negative `%` value is returned once the lamp replacement deadline is exceeded.
- **Document version:** Projector Control Command Reference Manual, BDT140013 Revision 7.1.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: input terminal, aspect, eco mode, base model type, sub input enums live in "Appendix — Supplementary Information by Command" which is not included in the refined source artifact; the affected actions carry a note pointing to that appendix. -->
<!-- UNRESOLVED: power/voltage/current specifications not present in refined source. -->
<!-- UNRESOLVED: wireless LAN unit specifics deferred to per-model operation manual. -->
```

Spec done. 53 commands covered — all rows from source §3. Power/mute/lens/shutter/freeze/eco/PIP/edge-blend/input-switch + all `078-*`/`037-*`/`097-*`/`098-*`/`305-*`/`319-*` queries. Two transports (serial + TCP 7142). All gaps marked `UNRESOLVED`.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:19:51.124Z
last_checked_at: 2026-06-18T08:13:44.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:13:44.759Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal enums, aspect values, eco mode values, base model type values, sub input values) not present in refined source — DATA enums referencing the appendix cannot be fully enumerated."
- "no unsolicited async notification model documented; all responses are command-reply only."
- "appendix-defined enum ranges (eco mode values, aspect values, base model"
- "source documents no unsolicited events; device is strict request/response."
- "source documents no multi-step macro sequences."
- "source states that POWER ON/OFF reject all other commands during the"
- "firmware version compatibility not stated in source."
- "input terminal, aspect, eco mode, base model type, sub input enums live in \"Appendix — Supplementary Information by Command\" which is not included in the refined source artifact; the affected actions carry a note pointing to that appendix."
- "power/voltage/current specifications not present in refined source."
- "wireless LAN unit specifics deferred to per-model operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
