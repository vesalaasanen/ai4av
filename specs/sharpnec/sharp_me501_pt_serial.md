---
spec_id: admin/sharp-nec-me501-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME501 PT Control Spec"
manufacturer: Sharp/NEC
model_family: "ME501 PT"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "ME501 PT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:17:39.266Z
last_checked_at: 2026-06-18T08:39:22.000Z
generated_at: 2026-06-18T08:39:22.000Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic projector manual; per-model command subset not stated. Input terminal value table, base model type values, and sub-input setting values referenced to an \"Appendix / Supplementary Information by Command\" not included in source text."
  - "flow control not stated; \"Full duplex\" comm mode only stated"
  - "full input-terminal value table not present in source text.\""
  - "full aspect value table not in source text.\""
  - "full value list not in source text.\""
  - "full sub-input table not in source text.\""
  - "full input terminal value table not in source text.\""
  - "full value table in Appendix not present in source text.\""
  - "base model type values in Appendix not present in source text.\""
  - "source contains no explicit safety warnings, interlock procedures,"
  - "full input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input setting values referenced to \"Appendix / Supplementary Information by Command\" — appendix not present in refined source text."
  - "serial flow_control not stated (only \"Full duplex\" mode stated)."
  - "device-default baud rate not stated; five options listed."
  - "firmware version compatibility not stated in source."
  - "ID2 model code value for ME501 PT not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:39:22.000Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action-units (24 actions + 29 query feedbacks) match verbatim hex commands in source; transport port 7142 and serial params confirmed; source command list fully covered. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME501 PT Control Spec

## Summary
Sharp/NEC ME501 PT projector control spec. Binary hex protocol over RS-232C serial and TCP/IP (port 7142). Covers power, input switch, mutes, lens/shutter, picture/volume/aspect adjust, eco mode, PIP/PbP, edge blending, and many status queries. Source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1 — generic manual, may cover multiple Sharp/NEC models beyond ME501 PT.

<!-- UNRESOLVED: source is generic projector manual; per-model command subset not stated. Input terminal value table, base model type values, and sub-input setting values referenced to an "Appendix / Supplementary Information by Command" not included in source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # alternatives: 38400, 19200, 9600, 4800 (device default not stated in source)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; "Full duplex" comm mode only stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON, 016 POWER OFF commands present
  - routable     # inferred: 018 INPUT SW CHANGE command present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off incl. cooling time, no other command accepted."

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal value (e.g. 06h = video). See Appendix 'Supplementary Information by Command'. UNRESOLVED: full input-terminal value table not present in source text."
    notes: "Response DATA01 = FFh means ended with error (no signal switch). Checksum CKS = low byte of sum of preceding bytes."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Auto-off on input terminal switch or video signal switch."

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
    notes: "Auto-off on input switch, video signal switch, or volume adjust."

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
    notes: "Auto-off on input switch or video signal switch."

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
    notes: "Example: brightness=10 → '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'. brightness=-10 → '03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch'."

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
    notes: "Example: volume=10 → '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value. See Appendix 'Supplementary Information by Command'. UNRESOLVED: full aspect value table not in source text."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target (DATA01) - only 96h documented = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: integer
        description: "Sub-target - only FFh documented"
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code high byte (WORD type). See key code list."
      - name: data02
        type: integer
        description: "Key code low byte (always 00h per documented list)."
    notes: "Key codes (DATA01/DATA02/Name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

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
        description: "Lens axis - only 06h documented = Periphery Focus"
      - name: data02
        type: integer
        description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h −continuous, FDh −0.25s, FEh −0.5s, FFh −1s"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command may be issued without stop while lens is being driven."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens axis - FFh = Stop (skips mode/value)"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number set via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value. See Appendix 'Supplementary Information by Command'. UNRESOLVED: full value list not in source text."
    notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
    params:
      - name: data01_16
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values: see Appendix. UNRESOLVED: full sub-input table not in source text."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal. See Appendix. UNRESOLVED: full input terminal value table not in source text."
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    query_command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h {ID1} {ID2} 0Ch {DATA01} - {DATA12} {CKS}"
    notes: "DATA01-12 bitmap. 0=normal, 1=error. DATA01: cover/fan/temp/power/lamp. DATA02: lamp usage/formatter/lamp2. DATA03: FPGA/temp sensor/lamp data/mirror cover/lamp2. DATA04: lamp2/ballast/dust/foreign matter/iris/lens. DATA09 extended: portrait/interlock/system errors. DATA05-08/10-12 reserved."

  - id: power_state
    type: enum
    values: [standby, power_on]
    query_command: "00h 85h 00h 00h 01h 01h 87h"  # via 078-2 RUNNING STATUS REQUEST, DATA03
    notes: "DATA03: 00h=Standby, 01h=Power on, FFh=Not supported. Full running status: DATA03 power, DATA04 cooling, DATA05 power-on/off process, DATA06 operation status (00h Standby(Sleep), 04h Power on, 05h Cooling, 06h Standby(error), 0Fh Standby(Power saving), 10h Network standby)."

  - id: input_status
    type: composite
    query_command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h {ID1} {ID2} 10h {DATA01} - {DATA16} {CKS}"
    notes: "DATA01 signal switch process, DATA02 signal list number (practical = returned+1), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed."

  - id: mute_status
    type: composite
    query_command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h {ID1} {ID2} 10h {DATA01} - {DATA16} {CKS}"
    notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off / 01h on)."

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    query_command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h {ID1} {ID2} 01h {DATA01} {CKS}"
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed. Mirror cover or lens cover."

  - id: lens_control_request
    type: composite
    query_command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    response: "22h 1Ch {ID1} {ID2} 08h {data01} 00h {DATA02} - {DATA07} {CKS}"
    notes: "DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit little-endian)."

  - id: lens_memory_option_request
    type: composite
    query_command: "02h 20h 00h 00h 01h {data01} {cks}"
    response: "22h 20h {ID1} {ID2} 02h {data01} {DATA02} {CKS}"
    notes: "DATA01 echoes option (00h LOAD BY SIGNAL, 01h FORCED MUTE). DATA02 setting: 00h OFF, 01h ON."

  - id: lens_information_request
    type: bitmap
    query_command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h {ID1} {ID2} 02h 00h {DATA01} {CKS}"
    notes: "DATA01 bit flags: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V). 0=Stop, 1=During operation. Bits 5-7 reserved."

  - id: lens_profile_request
    type: enum
    values: [profile_1, profile_2]
    query_command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h {ID1} {ID2} 02h {DATA01} {DATA02} {CKS}"
    notes: "DATA01: 00h=Profile 1, 01h=Profile 2. DATA02 reserved."

  - id: gain_parameter_request_3
    type: composite
    query_command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    response: "23h 05h {ID1} {ID2} 10h {data01} - {DATA16} {CKS}"
    notes: "DATA01 adjusted-value name (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light adjust). Response: DATA01 status (00h display not possible, 01h adjust not possible, 02h adjust possible, FFh no such gain), DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 default, DATA08-09 current, DATA10-11 wide adjustment width, DATA12-13 narrow adjustment width, DATA14 default validity."

  - id: projector_information
    type: composite
    query_command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah {ID1} {ID2} 62h {DATA01} - {DATA98} {CKS}"
    notes: "DATA01-49 projector name (NUL-terminated), DATA50-82 reserved, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds), DATA91-98 reserved. Updated at 1-minute intervals."

  - id: filter_usage_information
    type: composite
    query_command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h {ID1} {ID2} 08h {DATA01} - {DATA08} {CKS}"
    notes: "DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds). '-1' if undefined."

  - id: lamp_information_3
    type: composite
    query_command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    response: "23h 96h {ID1} {ID2} 06h {data01} {data02} {DATA03} - {DATA06} {CKS}"
    notes: "DATA01 lamp (00h Lamp 1, 01h Lamp 2 [two-lamp models only]). DATA02 content (01h usage time seconds, 04h remaining life %). DATA03-06 obtained info. Negative remaining life if deadline exceeded. Updated at 1-minute intervals."

  - id: carbon_savings_information
    type: composite
    query_command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    response: "23h 9Ah {ID1} {ID2} 09h {data01} {DATA02} - {DATA09} {CKS}"
    notes: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation. DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: information_string
    type: string
    query_command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    response: "20h D0h {ID1} {ID2} {LEN} {data01} 01h {DATA02} - {DATA??} {CKS}"
    notes: "DATA01 info type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency. DATA02 label length, DATA03-?? info string (NUL-terminated)."

  - id: eco_mode
    type: composite
    query_command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h {ID1} {ID2} 02h 07h {DATA01} {CKS}"
    notes: "DATA01 eco mode value. Returns 'Light mode' or 'Lamp mode' depending on projector. UNRESOLVED: full value table in Appendix not present in source text."

  - id: lan_projector_name
    type: string
    query_command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h {ID1} {ID2} 12h 2Ch {DATA01} - {DATA17} {CKS}"
    notes: "DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address
    type: mac
    query_command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h {ID1} {ID2} 08h 9Ah 00h {DATA01} - {DATA06} {CKS}"
    notes: "DATA01-06 MAC address (6 bytes)."

  - id: pip_pbp_status
    type: composite
    query_command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    response: "23h B0h {ID1} {ID2} 03h C5h {data01} {DATA02} {CKS}"
    notes: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3. DATA02 setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR)."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    query_command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h {ID1} {ID2} 03h DFh 00h {DATA01} {CKS}"
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: base_model_type
    type: composite
    query_command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh {ID1} {ID2} 10h 00h {DATA01} - {DATA15} {CKS}"
    notes: "DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type, DATA14-15 reserved. UNRESOLVED: base model type values in Appendix not present in source text."

  - id: serial_number
    type: string
    query_command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh {ID1} {ID2} 12h 01h 06h {DATA01} - {DATA16} {CKS}"
    notes: "DATA01-16 serial number (NUL-terminated)."

  - id: basic_information
    type: composite
    query_command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh {ID1} {ID2} 10h 02h {DATA01} - {DATA15} {CKS}"
    notes: "DATA01 operation status (00h Standby(Sleep), 04h Power on, 05h Cooling, 06h Standby(error), 0Fh Standby(Power saving), 10h Network standby), DATA02 content displayed, DATA03 selection signal type 1, DATA04 selection signal type 2, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status, DATA10-15 reserved."

  - id: setting_request
    type: composite
    query_command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h {ID1} {ID2} 20h {DATA01} - {DATA32} {CKS}"
    notes: "DATA01-03 base model type, DATA04 sound function (00h not avail, 01h avail), DATA05 profile (00h none, 01h clock, 02h sleep timer, 03h clock+sleep timer), DATA06-32 reserved."

  - id: model_name
    type: string
    query_command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h {ID1} {ID2} 20h {DATA01} - {DATA32} {CKS}"
    notes: "DATA01-32 model name (NUL-terminated)."
```

## Variables
```yaml
# Discrete settable params (not covered as actions) - none beyond those already
# represented as parameterized Actions above. Picture/volume/aspect/lens-adjust
# ranges returned dynamically by 060-1 GAIN PARAMETER REQUEST 3.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# Source documents no named multi-step macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note: 015 POWER ON / 016 POWER OFF reject
# other commands during transition (incl. cooling time), and 009 ERROR STATUS
# REQUEST bit DATA09 Bit1 'interlock switch is open' is reported - but no
# operator interlock procedure is documented.
```

## Notes
- All commands are binary hex frames. Format: `{lead} {cmd} {ID1} {ID2} {LEN} {DATA...} {CKS}`. Lead bytes: `00h`=request group, `01h`=freeze group, `02h`=control group, `03h`=set/adjust group. Response leads: `20h`/`21h`/`22h`/`23h` (success), `A0h`/`A1h`/`A2h`/`A3h` (error).
- Checksum (CKS) = low-order byte of sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` → `103h` → CKS=`03h`.
- ID1 = control ID set on projector. ID2 = model code (varies by model). ERR1/ERR2 returned on failure (see source §2.4 error code list — 30 distinct error codes documented).
- Power On (015) and Power Off (016) reject all other commands during the transition. Picture/Sound/Onscreen mute auto-clear on input switch or signal switch.
- Source is generic "Projector Control Command Reference Manual" BDT140013 Rev 7.1. May cover multiple Sharp/NEC projector models; per-model command subset not stated.

<!-- UNRESOLVED: full input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input setting values referenced to "Appendix / Supplementary Information by Command" — appendix not present in refined source text. -->
<!-- UNRESOLVED: serial flow_control not stated (only "Full duplex" mode stated). -->
<!-- UNRESOLVED: device-default baud rate not stated; five options listed. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: ID2 model code value for ME501 PT not stated in source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:17:39.266Z
last_checked_at: 2026-06-18T08:39:22.000Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:39:22.000Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action-units (24 actions + 29 query feedbacks) match verbatim hex commands in source; transport port 7142 and serial params confirmed; source command list fully covered. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic projector manual; per-model command subset not stated. Input terminal value table, base model type values, and sub-input setting values referenced to an \"Appendix / Supplementary Information by Command\" not included in source text."
- "flow control not stated; \"Full duplex\" comm mode only stated"
- "full input-terminal value table not present in source text.\""
- "full aspect value table not in source text.\""
- "full value list not in source text.\""
- "full sub-input table not in source text.\""
- "full input terminal value table not in source text.\""
- "full value table in Appendix not present in source text.\""
- "base model type values in Appendix not present in source text.\""
- "source contains no explicit safety warnings, interlock procedures,"
- "full input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input setting values referenced to \"Appendix / Supplementary Information by Command\" — appendix not present in refined source text."
- "serial flow_control not stated (only \"Full duplex\" mode stated)."
- "device-default baud rate not stated; five options listed."
- "firmware version compatibility not stated in source."
- "ID2 model code value for ME501 PT not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
