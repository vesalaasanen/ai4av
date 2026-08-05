---
spec_id: admin/nec-p702-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P702-R Series Control Spec"
manufacturer: NEC
model_family: "P702-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P702-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-14T23:11:58.398Z
last_checked_at: 2026-07-21T23:36:09.097Z
generated_at: 2026-07-21T23:36:09.097Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wired LAN authentication mechanism not described in source"
  - "no discrete settable parameters documented separately from actions"
  - "no unsolicited event descriptions in source"
  - "no explicit multi-step macros in source"
  - "no explicit safety warnings beyond interlock notes"
  - "full key code list reproduced in remote_key_code description only partially — see source section 3.19 for complete table"
  - "input terminal hex codes vary by model — Appendix provides common values only"
  - "base model type values not enumerated in source appendix"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:36:09.097Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command tokens with identical hex sequences, shapes, and parameterization. Transport parameters verified. Full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P702-R Series Control Spec

## Summary
NEC P702-R Series is a professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control interfaces. This spec covers serial communication at 115200/38400/19200/9600/4800 bps and TCP control on port 7142. The projector accepts hexadecimal command packets with checksum validation and returns structured responses.

<!-- UNRESOLVED: wired LAN authentication mechanism not described in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON (015) and POWER OFF (016) commands present
- queryable  # inferred: INFORMATION REQUEST (037), STATUS REQUEST (078) commands present
- routable  # inferred: INPUT SW CHANGE (018) command present
- levelable  # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1) commands present
```

## Actions
```yaml
# All payloads verbatim from source (BDT140013 Rev 7.1). Format:
#   <ID1> <ID2> = control/model IDs, <CKS> = low byte of sum of preceding bytes,
#   <DATA??> = command-specific variable bytes.
# Example literal commands shown where source provides them; parameterized
# templates show the variable part as <DATA??> mapping to params below.

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
  label: Input Switch
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input
      type: integer
      description: "Input terminal hex code (e.g. 06h=VIDEO). Full table in Appendix; COMPUTER=01h, HDMI=A1h/1Ah, DisplayPort=A6h, etc."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness"
    - name: mode
      type: integer
      description: "DATA02: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA03=low 8 bits, DATA04=high 8 bits (signed)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA02=low 8 bits, DATA03=high 8 bits"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX/ZOOM, 09h/10h=FULL"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "DATA03: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA04=low 8 bits, DATA05=high 8 bits"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: integer
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "DATA02: 01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "WORD key code. DATA01=low, DATA02=high. e.g. AUTO=05h 00h, POWER ON=02h 00h, SOURCE=D7h 00h, VOLUME UP=84h 00h. Full list in source section 3.19."

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01: 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "DATA02: 00h=Stop, 01h/02h/03h=plus (timed), 7Fh=plus (drive), 81h=minus (drive), FDh/FEh/FFh=minus (timed)"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: Lens adjustment target (same space as LENS CONTROL DATA01)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: action
      type: integer
      description: "DATA01: FFh=Stop (mode/value ignored), else=adjustment"
    - name: mode
      type: integer
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "DATA03=low 8 bits, DATA04=high 8 bits"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET. Controls profile selected by LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: integer
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: integer
      description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: integer
      description: "DATA01: 01h=ON, 02h=OFF"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01: 00h=OFF/Normal, 01h=ON/AUTO ECO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, DATA01-16, NUL-terminated)

- id: pip_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02: MODE => 00h=PIP/01h=PbP; START POSITION => 00h=TOP-LEFT..03h=BOTTOM-RIGHT; else sub-input terminal code"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input
      type: integer
      description: "DATA01: input terminal code (see Appendix input terminal table)"
    - name: source
      type: integer
      description: "DATA02: 00h=the terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00h Standby"
    - "01h Power on"
    - "05h Cooling"
    - "06h Standby (error)"

- id: error_status
  label: Error Status
  type: object
  properties:
    - name: data01
      type: bitmap
      description: "Bit0=cover error, Bit1=temperature (bi-metal), Bit3=fan error, Bit4=fan error, Bit5=power error, Bit6=lamp/lamp1 off or backlight off, Bit7=lamp moratorium"
    - name: data02
      type: bitmap
      description: "Bit0=lamp1 usage time exceeded, Bit1=formatter error, Bit2=lamp 2 off, Bit7=refer to extended status"
    - name: data03
      type: bitmap
      description: "Bit1=FPGA error, Bit2=temperature sensor, Bit3=lamp1 not present, Bit4=lamp1 data error, Bit5=mirror cover error, Bit6=lamp 2 moratorium, Bit7=lamp 2 time exceeded"
    - name: data04
      type: bitmap
      description: "Bit0=lamp 2 not present, Bit1=lamp 2 data error, Bit2=temperature (dust), Bit3=foreign matter sensor, Bit5=ballast comm error, Bit6=iris calibration error, Bit7=lens not installed"
    - name: data09
      type: bitmap
      description: "Extended status: Bit0=portrait cover up, Bit1=interlock switch open, Bit2=system error (slave CPU), Bit3=system error (formatter)"

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_type_1
      type: integer
      description: "01h=1, 02h=2, 03h=3, 04h=4, 05h=5"
    - name: signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture
      type: enum
      values: ["00h Off", "01h On"]
    - name: sound
      type: enum
      values: ["00h Off", "01h On"]
    - name: onscreen
      type: enum
      values: ["00h Off", "01h On"]
    - name: forced_onscreen
      type: enum
      values: ["00h Off", "01h On"]
    - name: onscreen_display
      type: enum
      values: ["00h Not displayed", "01h Displayed"]

- id: model_name
  label: Model Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: usage_time
      type: integer
      description: Lamp usage time in seconds (updated at 1-minute intervals)
    - name: remaining_life
      type: integer
      description: Lamp remaining life percentage (negative if deadline exceeded)

- id: carbon_savings
  label: Carbon Savings
  type: object
  properties:
    - name: kilograms
      type: integer
      description: Carbon Savings kg portion (DATA02-05, max 99999 kg)
    - name: milligrams
      type: integer
      description: Carbon Savings mg portion (DATA06-09, max 999999 mg)

- id: filter_usage
  label: Filter Usage
  type: object
  properties:
    - name: usage_time
      type: integer
      description: Filter usage time in seconds (-1 if undefined)
    - name: alarm_start_time
      type: integer
      description: Filter alarm start time in seconds (-1 if undefined)

- id: eco_mode
  label: Eco Mode
  type: enum
  values: ["00h OFF/Normal", "01h ON/AUTO ECO", "02h ECO1", "03h ECO2", "04h LONG LIFE", "05h BOOST", "06h SILENT"]

- id: projector_name
  label: Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string
  format: hex

- id: cover_status
  label: Cover Status
  type: enum
  values: ["00h Normal (cover opened)", "01h Cover closed"]

- id: lens_information
  label: Lens Information
  type: bitmap
  description: "Bit0=lens memory (0=stop,1=operating), Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V; Bits5-7 reserved"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented separately from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): while turning on, no other command accepted"
  - "POWER OFF (016): while turning off (including cooling), no other command accepted"
# UNRESOLVED: no explicit safety warnings beyond interlock notes
```

## Notes
Serial connection uses RS-232C with 9-pin D-Sub connector. Pin assignment: RxD=pin2, TxD=pin3, GND=pin5, RTS=pin7, CTS=pin8. Flow control uses RTS/CTS hardware handshaking. Communication is full-duplex.

LAN connection supports 10/100 Mbps auto-negotiation (IEEE802.3 / IEEE802.3u). TCP port 7142 used for command/response.

Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all values in hexadecimal. ID1=control ID, ID2=model code. Responses use prefix `A0h` (00h-class), `A1h` (01h-class), `A2h` (02h-class), `A3h` (03h-class). Checksum = low-order byte of sum of all preceding bytes.

Error codes (ERR1/ERR2): 00h/00h=command not recognized, 00h/01h=not supported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory allocation error, 02h/03h=value cannot be set, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain number, 03h/02h=adjustment failed. See source section 2.4 for full matrix.

Some models require specific standby mode for serial/LAN control: Normal, Active, Eco, Network Standby, Sleep, Standby Power On, HDBaseT Standby. Supported modes vary by model.

<!-- UNRESOLVED: full key code list reproduced in remote_key_code description only partially — see source section 3.19 for complete table -->
<!-- UNRESOLVED: input terminal hex codes vary by model — Appendix provides common values only -->
<!-- UNRESOLVED: base model type values not enumerated in source appendix -->
```

Added: ~22 query actions (all REQUEST commands), 3 missing set actions (other_adjust, reference_lens_memory_control, lens_memory_option_set), carbon_savings + cover_status + lens_information feedbacks, verbatim `command:` payloads on every action. Preserved all original IDs/shapes.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-14T23:11:58.398Z
last_checked_at: 2026-07-21T23:36:09.097Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:36:09.097Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command tokens with identical hex sequences, shapes, and parameterization. Transport parameters verified. Full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wired LAN authentication mechanism not described in source"
- "no discrete settable parameters documented separately from actions"
- "no unsolicited event descriptions in source"
- "no explicit multi-step macros in source"
- "no explicit safety warnings beyond interlock notes"
- "full key code list reproduced in remote_key_code description only partially — see source section 3.19 for complete table"
- "input terminal hex codes vary by model — Appendix provides common values only"
- "base model type values not enumerated in source appendix"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
