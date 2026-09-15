---
spec_id: admin/nec-nec-flat-panel-display
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC Flat Panel Display Control Spec"
manufacturer: NEC
model_family: "NEC Flat Panel Display"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC Flat Panel Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T20:16:00.643Z
last_checked_at: 2026-09-14T22:17:50.021Z
generated_at: 2026-09-14T22:17:50.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled \"Projector Control Command Reference Manual\" — exact flat-panel model coverage and firmware compatibility not stated in source"
  - "flow control not explicitly stated; RTS/CTS pins wired per pin table"
  - "no event/notification mechanism stated in source"
  - "no multi-step sequences described in source"
  - "source documents standby-mode requirements for receiving POWER ON via"
  - "firmware version compatibility not stated in source"
  - "ID1 control ID default value and ID2 model code values not stated in source"
  - "full input-terminal hex code table is model-dependent (\"Configuration varies\" entries in source appendix)"
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:50.021Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions map to source commands with matching hex frame shapes; transport parameters (baud list, 7142, 8/N/1, full duplex) appear verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC Flat Panel Display Control Spec

## Summary
NEC display control protocol over RS-232C (PC CONTROL port, D-SUB 9P) and wired LAN (TCP port 7142). Binary hex command frames with ID1/ID2 addressing and low-order-byte additive checksum (CKS). Source is NEC "Projector Control Command Reference Manual" BDT140013 Rev 7.1, covering power, input switching, mutes, picture/volume adjust, lens control, lamp/filter/eco status, and PIP/PBP settings.

<!-- UNRESOLVED: source document is titled "Projector Control Command Reference Manual" — exact flat-panel model coverage and firmware compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # multiple rates supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins wired per pin table
  mode: full_duplex
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable: inferred from 015/016 power commands
# routable: inferred from 018 input switch command
# queryable: inferred from extensive request commands
# levelable: inferred from 030-1/030-2 adjust commands
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Frame format: <CMD> <M-CODE> 00h 00h <LEN> <DATA...> <CKS>
# CKS = low-order byte of sum of all preceding bytes. ID1 = control ID, ID2 = model code (responses only).
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 are error bit fields (cover, fan, temp, lamp, power errors)"

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while powering on. Standby-mode requirements vary by model."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Input terminal hex code, e.g. 01h=COMPUTER, 02h=COMPUTER2, 06h=VIDEO, 0Bh=S-VIDEO, 10h=Component, A1h=HDMI, A6h=DisplayPort, 20h=LAN/NETWORK, BFh=HDBaseT (full table in source appendix)"
  notes: "Example video switch: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = error, no switch made."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Mute cancelled by input or video signal switch."

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Mute cancelled by input switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Mute cancelled by input or video signal switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: data03_data04
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA03 low, DATA04 high); signed for relative"
  notes: "Set brightness +10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: data02_data03
      type: integer
      description: "Adjustment value, 16-bit little-endian"
  notes: "Set volume 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 08h/09h/10h=ZOOM/WIDE SCREEN/FULL variants"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01_data02
      type: hex
      description: "Adjustment target; 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data03
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: data04_data05
      type: integer
      description: "Adjustment value, 16-bit little-endian"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds. Updated at 1-minute intervals."

- id: filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "DATA01-04 filter usage seconds, DATA05-08 filter alarm start time; -1 if undefined."

- id: lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: enum
      description: "01h=lamp usage time seconds, 04h=lamp remaining life %"
  notes: "Get lamp usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life = deadline exceeded."

- id: carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01_data02
      type: enum
      description: "Key code WORD, e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h-0Ah 00h=UP/DOWN/RIGHT/LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE (full table in source)"
  notes: "Send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = error."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes lens shutter."

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "Opens lens shutter."

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: hex
      description: "06h=Periphery Focus"
    - name: data02
      type: enum
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "Send 00h to stop continuous drive. Response DATA01 FFh = error."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: hex
      description: "Lens adjustment target"
  notes: "Response: upper/lower limits + current value, 16-bit little-endian pairs."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: hex
      description: "FFh=Stop (mode/value ignored)"
    - name: data02
      type: enum
      description: "00h=absolute value, 02h=relative value"
    - name: data03_data04
      type: integer
      description: "Adjustment value, 16-bit little-endian"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: enum
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bit field: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=operating)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Response: adjustment status, upper/lower limits, default, current value, wide/narrow widths. Get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep-timer capability."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03 power status (00h standby, 01h on, FFh unsupported), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h sleep, 04h on, 05h cooling, 06h error, 0Fh power saving, 10h network standby)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: signal switch process, signal list number (returned value + 1 = actual), signal type 1/2, test pattern, displayed content."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD (00h off, 01h on)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name, NUL-terminated."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=normal (cover opened), 01h=cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: enum
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Response: label/information string, NUL-terminated."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco/light/lamp mode value, e.g. 00h=OFF/NORMAL, 01h=AUTO ECO/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name, NUL-terminated."

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "MODE response: 00h=PIP, 01h=PBP. START POSITION: 00h=top-left, 01h=top-right, 02h=bottom-left, 03h=bottom-right."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Eco/light/lamp mode value per source appendix (00h OFF, 01h AUTO ECO/ON, 02h ECO1, 03h ECO2, 04h LONG LIFE, 05h BOOST, 06h SILENT)"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: data01_data16
      type: string
      description: "Projector name, up to 16 bytes"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: enum
      description: "MODE: 00h=PIP, 01h=PBP. START POSITION: 00h=top-left, 01h=top-right, 02h=bottom-left, 03h=bottom-right. Sub input values per source appendix."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response: DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number, NUL-terminated."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: operation status, displayed content, signal types, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: hex
      description: "Input terminal value per source appendix"
    - name: data02
      type: enum
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "Audio select input values: 00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B."
```

## Feedbacks
```yaml
# Success ACK pattern: response echoes command code with high bit set (e.g. 02h->22h, 03h->23h),
# then <ID1> <ID2> <LEN> [DATA] <CKS>.
- id: command_ack
  type: ack
  description: "Echo response frame; e.g. POWER ON ACK = 22h 00h <ID1> <ID2> 00h <CKS>"

- id: error_response
  type: enum
  description: "Failure response: Axh <code> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>, e.g. A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
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
    - "02h 0Dh: command not accepted because power is off"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority for operation"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"

- id: power_state
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS DATA03/DATA06"

- id: error_status
  type: bitmask
  description: "From 009 response DATA01-12: cover, fan, temperature, power, lamp off/replacement, lamp usage exceeded, formatter, ballast comm, iris calibration, lens not installed, interlock switch open, system errors"

- id: mute_state
  type: enum
  values: [on, off]
  description: "From 078-4: picture, sound, onscreen, forced onscreen mute states"

- id: cover_state
  type: enum
  values: [opened, closed]
  description: "From 078-6 COVER STATUS"
```

## Variables
```yaml
# Settable parameters are covered by discrete actions (030-1, 030-2, 030-12, 030-15, 098-8, 098-45, 098-198, 098-243-1, 319-10).
# No additional settable parameters outside Actions.
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are command-initiated.
# UNRESOLVED: no event/notification mechanism stated in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents standby-mode requirements for receiving POWER ON via
# serial/LAN (Normal, Active, Eco, NETWORK STANDBY, SLEEP, etc. - varies by model) but
# states no explicit interlock procedures or safety warnings.
```

## Notes
- Binary protocol. All commands hex bytes; CKS checksum = low-order byte of sum of all preceding bytes. Example: 20h+81h+01h+60h+01h+00h=103h → CKS=03h.
- Responses use command code with high bit set (02h→22h ACK, A2h error; 03h→23h/A3h; 00h→20h/A0h; 01h→21h/A1h) and include device ID1/ID2.
- Serial: D-SUB 9P PC CONTROL port; pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS. LAN: RJ-45, 10/100 Mbps auto-sensing, TCP port 7142.
- POWER ON/OFF reject all other commands during power transition and cooling.
- Picture/sound/onscreen mutes auto-cancel on input or signal switch.
- Lamp/filter usage counters update at 1-minute intervals despite 1-second resolution.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Standby mode must support command reception for POWER ON; supported modes vary by model (serial vs LAN vs HDBaseT standby).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID1 control ID default value and ID2 model code values not stated in source -->
<!-- UNRESOLVED: full input-terminal hex code table is model-dependent ("Configuration varies" entries in source appendix) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T20:16:00.643Z
last_checked_at: 2026-09-14T22:17:50.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:50.021Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions map to source commands with matching hex frame shapes; transport parameters (baud list, 7142, 8/N/1, full duplex) appear verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled \"Projector Control Command Reference Manual\" — exact flat-panel model coverage and firmware compatibility not stated in source"
- "flow control not explicitly stated; RTS/CTS pins wired per pin table"
- "no event/notification mechanism stated in source"
- "no multi-step sequences described in source"
- "source documents standby-mode requirements for receiving POWER ON via"
- "firmware version compatibility not stated in source"
- "ID1 control ID default value and ID2 model code values not stated in source"
- "full input-terminal hex code table is model-dependent (\"Configuration varies\" entries in source appendix)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
