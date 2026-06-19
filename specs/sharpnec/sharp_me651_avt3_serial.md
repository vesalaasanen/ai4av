---
spec_id: admin/sharpnec-me651-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME651 AVT3 Control Spec"
manufacturer: Sharp/NEC
model_family: "ME651 AVT3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "ME651 AVT3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:50:44.277Z
last_checked_at: 2026-06-18T08:30:56.709Z
generated_at: 2026-06-18T08:30:56.709Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range; input-terminal DATA01 code table (\"Supplementary Information by Command\" appendix) not included in refined source; eco-mode value table referenced but absent"
  - "RTS/CTS pins present in D-SUB 9P pinout but flow-control setting not stated; mode listed as Full Duplex"
  - "exact limits not in refined source; query 060-1 returns upper/lower bounds at runtime"
  - "value table in appendix not present in refined source"
  - "source describes only request/response. No unsolicited notification frames documented."
  - "source documents no explicit multi-step sequences."
  - "source notes interlock-switch bit in 009 error status (DATA09 bit1"
  - "firmware version compatibility not stated; appendix value tables (input terminal / eco mode / sub input / base model type) not in refined source; flow_control setting not stated; voltage/power specs out of scope and not present"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:30:56.709Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME651 AVT3 Control Spec

## Summary
Sharp/NEC ME651 AVT3 display, controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or wired/wireless LAN. Binary hex command protocol framed by `20h`-style request/`22h/23h` ack/`A2h/A3h` error responses; checksum byte on every frame. Manual = "Projector Control Command Reference Manual" BDT140013 Rev 7.1. Source documents 53 distinct commands across power, input, mute, lens, picture/volume gain, status queries, eco/PIP/edge-blend/LAN settings.

<!-- UNRESOLVED: firmware compatibility range; input-terminal DATA01 code table ("Supplementary Information by Command" appendix) not included in refined source; eco-mode value table referenced but absent -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # supported set per source: 4800 / 9600 / 19200 / 38400 / 115200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in D-SUB 9P pinout but flow-control setting not stated; mode listed as Full Duplex
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF
  - queryable    # inferred: large set of status/error/info request commands
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 LAMP/LIGHT ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Frame params common to all commands (from source §2.2):
#   id1 = control ID set on projector; id2 = model code (varies by model)
#   cks = checksum: sum all preceding bytes, take low-order 8 bits
# Each command below shows the request payload verbatim. Acknowledgement frames
# (22h/23h) and error frames (A2h/A3h + ERR1 ERR2) documented in source §3 per
# command. Error codes: see §2.4 (00h00h unrecognized ... 03h02h adjustment failed).

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "20h 88h {id1} {id2} 0Ch {data01} - {data12} {cks}"
  params:
    - name: data01
      type: integer
      description: Error status bytes DATA01-DATA12 (bitfield: cover/fan/temp/lamp/interlock errors)
  note: "Request literal: 00h 88h 00h 00h 00h 88h. Response A0h 88h ... on error."

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  note: "No other command accepted while power-on in progress. Ack 22h 00h {id1} {id2} 00h {cks}."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  note: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Full code list in appendix 'Supplementary Information by Command'."
  note: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh. Ack DATA01=FFh means error/no switch."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  note: "Cleared on input/video switch."

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
  note: "Cleared on input/video switch or volume adjust."

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

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} - {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h Brightness / 01h Contrast / 02h Color / 03h Hue / 04h Sharpness"
    - name: data02
      type: integer
      description: "Mode: 00h absolute / 01h relative"
    - name: data03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high 8 bits)
  note: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} - {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Mode: 00h absolute / 01h relative"
    - name: data02
      type: integer
      description: Value (low 8 bits)
    - name: data03
      type: integer
      description: Value (high 8 bits)
  note: "Example vol=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Aspect value (see appendix 'Supplementary Information by Command')

- id: other_adjust_lamp_light
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} - {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target 96h (LAMP ADJUST / LIGHT ADJUST); DATA02=FFh"
    - name: data03
      type: integer
      description: "Mode: 00h absolute / 01h relative"
    - name: data04
      type: integer
      description: Value (low 8 bits)
    - name: data05
      type: integer
      description: Value (high 8 bits)

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  note: "Response 23h 8Ah ... DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds. Updated 1-min intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  note: "Response DATA01-04 filter usage sec, DATA05-08 filter alarm start sec (-1 if undefined)."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h Lamp 1 / 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h usage time (sec) / 04h remaining life (%)"
  note: "Example lamp1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h Total Carbon Savings / 01h Carbon Savings during operation"
  note: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: data02
      type: integer
      description: Key code high byte (WORD type; e.g. 00h for listed keys)
  note: "Key codes (code/data01/name): 2/02h POWER ON, 3/03h POWER OFF, 5/05h AUTO, 6/06h MENU, 7/07h UP, 8/08h DOWN, 9/09h RIGHT, 10/0Ah LEFT, 11/0Bh ENTER, 12/0Ch EXIT, 13/0Dh HELP, 15/0Fh MAGNIFY UP, 16/10h MAGNIFY DOWN, 19/13h MUTE, 41/29h PICTURE, 75/4Bh COMPUTER1, 76/4Ch COMPUTER2, 79/4Fh VIDEO1, 81/51h S-VIDEO1, 132/84h VOLUME UP, 133/85h VOLUME DOWN, 138/8Ah FREEZE, 163/A3h ASPECT, 215/D7h SOURCE, 238/EEh LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (e.g. 06h Periphery Focus)"
    - name: data02
      type: integer
      description: "00h Stop / 01h +1s / 02h +0.5s / 03h +0.25s / 7Fh plus / 81h minus / FDh -0.25s / FEh -0.5s / FFh -1s"
  note: "Send 00h to stop after 7Fh/81h continuous drive."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Target lens axis
  note: "Response DATA02-07 upper/lower/current value (16-bit)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} - {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (FFh = Stop; mode/value ignored)"
    - name: data02
      type: integer
      description: "Mode: 00h absolute / 02h relative"
    - name: data03
      type: integer
      description: Value (low 8 bits)
    - name: data04
      type: integer
      description: Value (high 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE / 01h STORE / 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE / 01h STORE / 02h RESET"
  note: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL / 01h FORCED MUTE"
  note: "Response DATA02 00h OFF / 01h ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL / 01h FORCED MUTE"
    - name: data02
      type: integer
      description: "00h OFF / 01h ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  note: "Response DATA01 bitfield: bit0 Lens memory / bit1 Zoom / bit2 Focus / bit3 Lens Shift H / bit4 Lens Shift V (0 Stop, 1 During operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h Profile 1 / 01h Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  note: "Response DATA01 00h Profile 1 / 01h Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "00h BRIGHTNESS / 01h CONTRAST / 02h COLOR / 03h HUE / 04h SHARPNESS / 05h VOLUME / 96h LAMP-LIGHT ADJUST"
  note: "Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA01 status (00h display-no / 01h adjust-no / 02h ok / FFh no such gain), DATA02-13 limits/default/current/widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  note: "Response DATA01-03 base model type, DATA04 sound fn (00h no/01h yes), DATA05 profile (00h none/01h clock/02h sleep/03h both)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  note: "Response DATA03 power (00h standby/01h on/FFh n/a), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h standby-sleep/04h on/05h cooling/06h standby-error/0Fh power-saving/10h network standby)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  note: "Response DATA01 signal-switch process, DATA02 signal list number (-1), DATA03/04 selection signal type, DATA05 list type, DATA06 test pattern, DATA09 content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  note: "Response DATA01 picture mute / DATA02 sound mute / DATA03 onscreen mute / DATA04 forced onscreen mute / DATA05 OSD (00h off / 01h on)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  note: "Response DATA01-32 model name (NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  note: "Response DATA01 00h normal (opened) / 01h cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h freeze on / 02h freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "03h horizontal sync frequency / 04h vertical sync frequency"
  note: "Response DATA02 length, DATA03-?? label string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  note: "Response DATA01 eco/light/lamp mode value (see appendix)."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  note: "Response DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  note: "Response DATA01-06 MAC address."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3"
  note: "Response DATA02: MODE 00h PIP/01h PBP; START POSITION 00h TL/01h TR/02h BL/03h BR."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  note: "Response DATA01 00h OFF / 01h ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Eco/light/lamp mode value (see appendix)

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} - {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Projector name bytes (up to 16 bytes), DATA01-DATA16

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3"
    - name: data02
      type: integer
      description: "MODE 00h PIP/01h PBP; START POSITION 00h TL/01h TR/02h BL/03h BR; sub-input code otherwise"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h OFF / 01h ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  note: "Response DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  note: "Response DATA01-16 serial number (NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  note: "Response DATA01 operation status, DATA02 content displayed, DATA03/04 signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal (see appendix)
    - name: data02
      type: integer
      description: "00h terminal specified in DATA01 / 01h BNC"
  note: "Response DATA02 00h success / 01h error."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA04"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06"

- id: error_status
  type: bitfield
  description: "12-byte error bitfield (009 ERROR STATUS REQUEST): cover/fan/temperature/power/lamp/formatter/interlock/lens errors"
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"

- id: mute_status
  type: enum_set
  description: "Picture/sound/onscreen/forced-onscreen/OSD mute flags"
  source: "078-4 MUTE STATUS REQUEST DATA01-DATA05"

- id: input_signal_status
  type: composite
  description: "Signal switch process, list number, signal type, test pattern, content displayed"
  source: "078-3 INPUT STATUS REQUEST"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h); negative if deadline exceeded"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037 INFORMATION REQUEST DATA87-90 / 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04"

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lens_information
  type: bitfield
  description: "Lens operation per axis: memory/zoom/focus/shift-H/shift-V (0 stop, 1 operating)"
  source: "053-7 LENS INFORMATION REQUEST DATA01"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

- id: command_error
  type: composite
  description: "ERR1/ERR2 code pair (§2.4): 00h00h unrecognized, 00h01h unsupported, 01h00h invalid value, 01h01h invalid input, 02h0Dh power off, 02h0Eh exec failed, 02h0Fh no authority, 03h02h adjust failed, ..."
  source: "Every command A2h/A3h error frame"
```

## Variables
```yaml
- id: picture_brightness
  range: [null, null]  # UNRESOLVED: exact limits not in refined source; query 060-1 returns upper/lower bounds at runtime
  query: gain_parameter_request_3 (data01=00h)
  set: picture_adjust (data01=00h)

- id: picture_contrast
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=01h)
  set: picture_adjust (data01=01h)

- id: picture_color
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=02h)
  set: picture_adjust (data01=02h)

- id: picture_hue
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=03h)
  set: picture_adjust (data01=03h)

- id: picture_sharpness
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=04h)
  set: picture_adjust (data01=04h)

- id: volume
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=05h)
  set: volume_adjust

- id: lamp_light_adjust
  range: [null, null]  # UNRESOLVED
  query: gain_parameter_request_3 (data01=96h)
  set: other_adjust_lamp_light

- id: eco_mode
  values: []  # UNRESOLVED: value table in appendix not present in refined source
  query: eco_mode_request
  set: eco_mode_set

- id: edge_blending_mode
  values: [off, on]
  query: edge_blending_mode_request
  set: edge_blending_mode_set
```

## Events
```yaml
# UNRESOLVED: source describes only request/response. No unsolicited notification frames documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes interlock-switch bit in 009 error status (DATA09 bit1
# "interlock switch is open") and power-on/off lockout (no other command accepted
# during power transition incl. cooling), but states no explicit safety procedure,
# confirmation sequence, or power-on ordering requirement.
```

## Notes
Frame = header byte + cmd bytes + `{id1}{id2}` + LEN + DATA + `{cks}`. `{id1}`=control ID set on projector, `{id2}`=model code (model-specific). Checksum = low byte of sum of all preceding bytes (source §2.2). Example: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS=03h. Acknowledgement headers: `22h`(02h cmd)/`23h`(03h cmd)/`21h`(01h)/`20h`(00h) carry no error; error headers `A0h/A1h/A2h/A3h` carry ERR1+ERR2. Power on/off reject all other commands during transition (incl. cooling). Lens continuous drive (7Fh/81h) needs explicit 00h stop. Lamp/filter usage updated 1-min intervals though stored in 1-sec units. Lamp remaining life goes negative past replacement deadline. Refined source omits appendix "Supplementary Information by Command" → input-terminal codes, eco-mode values, sub-input codes, base-model-type codes UNRESOLVED.
<!-- UNRESOLVED: firmware version compatibility not stated; appendix value tables (input terminal / eco mode / sub input / base model type) not in refined source; flow_control setting not stated; voltage/power specs out of scope and not present -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:50:44.277Z
last_checked_at: 2026-06-18T08:30:56.709Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:30:56.709Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range; input-terminal DATA01 code table (\"Supplementary Information by Command\" appendix) not included in refined source; eco-mode value table referenced but absent"
- "RTS/CTS pins present in D-SUB 9P pinout but flow-control setting not stated; mode listed as Full Duplex"
- "exact limits not in refined source; query 060-1 returns upper/lower bounds at runtime"
- "value table in appendix not present in refined source"
- "source describes only request/response. No unsolicited notification frames documented."
- "source documents no explicit multi-step sequences."
- "source notes interlock-switch bit in 009 error status (DATA09 bit1"
- "firmware version compatibility not stated; appendix value tables (input terminal / eco mode / sub input / base model type) not in refined source; flow_control setting not stated; voltage/power specs out of scope and not present"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
