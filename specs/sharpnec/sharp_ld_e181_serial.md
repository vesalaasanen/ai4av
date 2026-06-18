---
spec_id: admin/sharp-nec-ld-e181
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E181 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E181"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E181"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:14:09.527Z
last_checked_at: 2026-06-17T20:01:18.859Z
generated_at: 2026-06-17T20:01:18.859Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific input terminal value table and aspect value table are referenced as an \"Appendix\" that is not included in the source text. Several DATA01 enum domains (input terminal, aspect, eco mode, sub-input) cannot be enumerated without that appendix."
  - "no single default baud rate stated in source"
  - "\"Full duplex\" communication mode stated; RTS/CTS pins wired but flow-control type not specified"
  - "enum values defined in Appendix 'Supplementary Information by Command' (not in source)"
  - "enum values in Appendix (not in source)"
  - "source does not document any push/event mechanism."
  - "source contains error bitfields indicating interlock-switch-open, cover, temperature, and fan faults,"
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (selectable 115200/38400/19200/9600/4800)."
  - "flow-control type not explicitly stated (only 'Full duplex' communication mode)."
  - "model code (ID2) value for Ld E181 not stated in source."
  - "control ID (ID1) default value not stated."
  - "input terminal DATA01 value table, aspect value table, eco mode value table, and sub-input value table referenced as Appendix 'Supplementary Information by Command' — not present in the source text."
  - "full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus shown in extracted table; other rows truncated)."
  - "DATA01/02 lamp selector response for two-lamp models — source notes \"01h effective only for two-lamp projector models\" but does not state whether Ld E181 is one- or two-lamp."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:01:18.859Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command definitions with correct hex opcodes; transport parameters verified against source; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld E181 Control Spec

## Summary
The Sharp/NEC Ld E181 is a projector controllable via an RS-232C serial port (PC CONTROL D-SUB 9P) or a wired/wireless LAN (TCP). This spec covers the binary command protocol documented in the *Projector Control Command Reference Manual* (BDT140013 Revision 7.1): power, input switching, mutes, picture/volume/aspect/lens adjustments, lens memory, status queries, and remote-key emulation.

<!-- UNRESOLVED: model-specific input terminal value table and aspect value table are referenced as an "Appendix" that is not included in the source text. Several DATA01 enum domains (input terminal, aspect, eco mode, sub-input) cannot be enumerated without that appendix. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists selectable rates 115200/38400/19200/9600/4800 bps; no default stated
  # UNRESOLVED: no single default baud rate stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: "Full duplex" communication mode stated; RTS/CTS pins wired but flow-control type not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: numerous *REQUEST commands return state
  - routable     # inferred: INPUT SW CHANGE, AUDIO SELECT SET
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST
```

## Actions
```yaml
# Command framing (from §2.1): commands are hex byte sequences.
#   Request first byte   = opcode class (00h..03h, plus 01h)
#   Ack/response byte[0] = opcode + 20h (e.g. 02h -> 22h ack, 03h -> 23h ack)
#   Error response       = opcode + A0h (e.g. 02h -> A2h, 03h -> A3h)
# ID1 = control ID, ID2 = model code. CKS = checksum = low byte of sum of all preceding bytes.
# All payloads below are VERBATIM from the source (hex, space-separated as printed).
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"  # DATA01-12: error bitfields
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    response: "22h 00h <ID1> <ID2> 00h <CKS>"
    notes: "No other command accepted while power-on is in progress."
    params: []

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    response: "22h 01h <ID1> <ID2> 00h <CKS>"
    notes: "No other command accepted during power-off (incl. cooling time)."
    params: []

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"  # FFh = ended with error
    notes: "Example (switch to video, DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh"
    params:
      - name: data01
        type: byte
        description: "Input terminal selector. Values defined in Appendix 'Supplementary Information by Command' (NOT included in source). Example value 06h = video port."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    response: "22h 10h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    response: "22h 11h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    response: "22h 12h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    response: "22h 13h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    response: "22h 14h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    response: "22h 15h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # 0000h = success
    notes: "DATA01 target: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness. DATA02 mode: 00h=absolute,01h=relative. DATA03/04 = value low/high byte. Example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"
    params:
      - { name: data01, type: byte, description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)" }
      - { name: data02, type: byte, description: "Adjustment mode (00h=absolute, 01h=relative)" }
      - { name: data03, type: byte, description: "Adjustment value (low-order 8 bits)" }
      - { name: data04, type: byte, description: "Adjustment value (high-order 8 bits)" }

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # 0000h = success
    notes: "DATA01 mode: 00h=absolute,01h=relative. DATA02/03 = value low/high byte. Example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"
    params:
      - { name: data01, type: byte, description: "Adjustment mode (00h=absolute, 01h=relative)" }
      - { name: data02, type: byte, description: "Adjustment value (low-order 8 bits)" }
      - { name: data03, type: byte, description: "Adjustment value (high-order 8 bits)" }

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # 0000h = success
    notes: "DATA01 aspect value domain defined in Appendix (NOT included in source)."
    params:
      - { name: data01, type: byte, description: "Value set for the aspect (domain in Appendix 'Supplementary Information by Command', not in source)" }

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # 0000h = success
    notes: "DATA01=96h DATA02=FFh -> LAMP ADJUST / LIGHT ADJUST. DATA03 mode: 00h=absolute,01h=relative. DATA04/05 = value low/high byte."
    params:
      - { name: data01, type: byte, description: "Adjustment target high byte (96h = LAMP/LIGHT ADJUST)" }
      - { name: data02, type: byte, description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)" }
      - { name: data03, type: byte, description: "Adjustment mode (00h=absolute, 01h=relative)" }
      - { name: data04, type: byte, description: "Adjustment value (low-order 8 bits)" }
      - { name: data05, type: byte, description: "Adjustment value (high-order 8 bits)" }

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01> - <DATA98> <CKS>"
    notes: "DATA01-49=Projector name (NUL-terminated). DATA83-86=Lamp usage time (sec). DATA87-90=Filter usage time (sec). Usage time updated at 1-minute intervals."
    params: []

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01> - <DATA08> <CKS>"
    notes: "DATA01-04=Filter usage time (sec). DATA05-08=Filter alarm start time (sec); -1 if undefined."
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "23h 96h <ID1> <ID2> 06h <DATA01> - <DATA06> <CKS>"
    notes: "DATA01: 00h=Lamp1, 01h=Lamp2 (two-lamp models only). DATA02: 01h=usage time(sec), 04h=remaining life(%). DATA03-06=value. Example (Lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life returned if replacement deadline exceeded."
    params:
      - { name: data01, type: byte, description: "Lamp selector (00h=Lamp 1, 01h=Lamp 2)" }
      - { name: data02, type: byte, description: "Content (01h=usage time seconds, 04h=remaining life %)" }

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01> - <DATA09> <CKS>"
    notes: "DATA01: 00h=Total, 01h=during operation. DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."
    params:
      - { name: data01, type: byte, description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation" }

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"  # FFh = error
    notes: "DATA01/DATA02 = WORD key code. Example (AUTO, code 5): 02h 0Fh 00h 00h 02h 05h 00h 18h. Key codes from source table: 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 0Fh00h=MAGNIFY UP, 10h00h=MAGNIFY DOWN, 13h00h=MUTE, 29h00h=PICTURE, 4Bh00h=COMPUTER1, 4Ch00h=COMPUTER2, 4Fh00h=VIDEO1, 51h00h=S-VIDEO1, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO."
    params:
      - { name: data01, type: byte, description: "Key code low byte (see key code list)" }
      - { name: data02, type: byte, description: "Key code high byte (see key code list)" }

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    response: "22h 16h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    response: "22h 17h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"  # FFh = error
    notes: "DATA01 target: 06h=Periphery Focus (other targets listed in source table). DATA02 content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s. Send 00h to stop after 7Fh/81h."
    params:
      - { name: data01, type: byte, description: "Lens target (06h=Periphery Focus; full list in source §3.22)" }
      - { name: data02, type: byte, description: "Motion content (00h stop, 01h/02h/03h timed +, 7Fh continuous +, 81h continuous -, FDh/FEh/FFh timed -)" }

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> - <DATA07> <CKS>"
    notes: "DATA02/03=upper limit low/high, DATA04/05=lower limit low/high, DATA06/07=current value low/high."
    params:
      - { name: data01, type: byte, description: "Lens target to query" }

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    response: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01 target (FFh=Stop; mode/value ignored when Stop). DATA02 mode: 00h=absolute, 02h=relative. DATA03/04=value low/high."
    params:
      - { name: data01, type: byte, description: "Lens target (FFh = Stop)" }
      - { name: data02, type: byte, description: "Adjustment mode (00h=absolute, 02h=relative)" }
      - { name: data03, type: byte, description: "Adjustment value (low-order 8 bits)" }
      - { name: data04, type: byte, description: "Adjustment value (high-order 8 bits)" }

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # FFh = error
    notes: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
    params:
      - { name: data01, type: byte, description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)" }

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"  # FFh = error
    notes: "Operates on profile selected by 053-10 LENS PROFILE SET. DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
    params:
      - { name: data01, type: byte, description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)" }

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. DATA02: 00h=OFF, 01h=ON."
    params:
      - { name: data01, type: byte, description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)" }

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. DATA02: 00h=OFF, 01h=ON."
    params:
      - { name: data01, type: byte, description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)" }
      - { name: data02, type: byte, description: "Setting value (00h=OFF, 01h=ON)" }

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    notes: "DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation. Bits 5-7 reserved."
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=Profile 1, 01h=Profile 2."
    params:
      - { name: data01, type: byte, description: "Profile number (00h=Profile 1, 01h=Profile 2)" }

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=Profile 1, 01h=Profile 2. DATA02 reserved."
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    response: "23h 05h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    notes: "DATA01 target: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA01 status: 00h=display N/A, 01h=adjust N/A, 02h=adjustable, FFh=gain does not exist. DATA02-13 = limits/default/current/wide/narrow widths."
    params:
      - { name: data01, type: byte, description: "Adjusted value name (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light adjust)" }

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
    notes: "DATA01-03=Base model type. DATA04=Sound function (00h N/A, 01h available). DATA05=Profile (00h N/A, 01h=Clock, 02h=Sleep timer, 03h=both). DATA06-32 reserved."
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    notes: "DATA03=Power status (00h Standby, 01h Power on, FFh unsupported). DATA04=Cooling process. DATA05=Power On/Off process. DATA06=Operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby power-saving, 10h Network standby)."
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    notes: "DATA01=signal switch process. DATA02=signal list number (returned value = practical - 1). DATA03=signal type 1. DATA04=signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)). DATA05=list type. DATA06=test pattern. DATA09=content displayed."
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    notes: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (each 00h Off / 01h On)."
    params: []

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
    notes: "DATA01-32 = model name (NUL-terminated string)."
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."
    params: []

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    notes: "DATA01: 01h=freeze ON, 02h=freeze OFF."
    params:
      - { name: data01, type: byte, description: "01h = freeze on, 02h = freeze off" }

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02> - <DATA??> <CKS>"
    notes: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency. DATA02=label length. DATA03-??=label string (NUL-terminated)."
    params:
      - { name: data01, type: byte, description: "Information type (03h=H-sync freq, 04h=V-sync freq)" }

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    notes: "DATA01 = eco mode value (domain in Appendix 'Supplementary Information by Command', not in source). Returns 'Light mode' or 'Lamp mode' depending on projector."
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01> - <DATA17> <CKS>"
    notes: "DATA01-17 = projector name (NUL-terminated)."
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> - <DATA06> <CKS>"
    notes: "DATA01-06 = MAC address (6 bytes)."
    params: []

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3. DATA02 setting value: for MODE 00h=PIP/01h=PBP; for START POSITION 00h=TL/01h=TR/02h=BL/03h=BR; sub-input values in Appendix (not in source)."
    params:
      - { name: data01, type: byte, description: "Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)" }

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    notes: "DATA01: 00h=OFF, 01h=ON."
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    notes: "DATA01 = eco mode value (domain in Appendix 'Supplementary Information by Command', not in source). Sets 'Light mode' or 'Lamp mode' depending on projector."
    params:
      - { name: data01, type: byte, description: "Eco mode value (domain in Appendix, not in source)" }

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    notes: "DATA01-16 = projector name (up to 16 bytes)."
    params:
      - { name: data01_16, type: bytes, description: "Projector name (up to 16 bytes)" }

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3. DATA02 setting value (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input values in Appendix, not in source)."
    params:
      - { name: data01, type: byte, description: "Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)" }
      - { name: data02, type: byte, description: "Setting value (varies by DATA01; sub-input domains in Appendix)" }

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    notes: "DATA01: 00h=OFF, 01h=ON."
    params:
      - { name: data01, type: byte, description: "00h = OFF, 01h = ON" }

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01> - <DATA15> <CKS>"
    notes: "DATA01-02 / DATA12-13 = base model type. DATA03-11 = model name (NUL-terminated). DATA14-15 reserved. Base model type value domain in Appendix (not in source)."
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01> - <DATA16> <CKS>"
    notes: "DATA01-16 = serial number (NUL-terminated)."
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01> - <DATA15> <CKS>"
    notes: "DATA01=operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby power-saving, 10h Network standby). DATA02=content displayed. DATA03/04=signal type. DATA05=display signal type. DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze (each 00h Off / 01h On)."
    params: []

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"  # DATA02: 00h success, 01h error
    notes: "DATA01=input terminal (domain in Appendix, not in source). DATA02 setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    params:
      - { name: data01, type: byte, description: "Input terminal (domain in Appendix, not in source)" }
      - { name: data02, type: byte, description: "Setting value (00h = terminal in DATA01, 01h = BNC, 02h = COMPUTER)" }
```

## Feedbacks
```yaml
# Observable state returned by the query (REQUEST) actions above. Each maps to its query action's DATA payload.
feedbacks:
  - id: error_status
    type: bitfield
    values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp_2_off, fpga_error, temperature_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp_2_replacement_due, lamp_2_usage_exceeded, lamp_2_not_present, lamp_2_data_error, temperature_dust, foreign_matter_sensor, ballast_comm_error, iris_calibration_error, lens_not_installed, portrait_cover_up, interlock_switch_open, system_error_slave, system_error_formatter]
    source: error_status_request DATA01-12
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: running_status_request DATA03/06 ; basic_information_request DATA01
  - id: input_signal_state
    type: composite
    source: input_status_request DATA01-09
  - id: mute_state
    type: composite
    values: { picture_mute: [off, on], sound_mute: [off, on], onscreen_mute: [off, on], forced_onscreen_mute: [off, on], onscreen_display: [off, on] }
    source: mute_status_request DATA01-05
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: lamp_information_request_3 (DATA02=01h) ; information_request DATA83-86
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: lamp_information_request_3 (DATA02=04h) ; negative if deadline exceeded
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: filter_usage_information_request DATA01-04 ; information_request DATA87-90
  - id: carbon_savings
    type: composite
    source: carbon_savings_information_request DATA02-09
  - id: lens_position
    type: composite
    source: lens_control_request DATA02-07
  - id: lens_operation_status
    type: bitfield
    values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
    source: lens_information_request DATA01
  - id: eco_mode
    type: enum
    # UNRESOLVED: enum values defined in Appendix 'Supplementary Information by Command' (not in source)
    source: eco_mode_request DATA01
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: edge_blending_mode_request DATA01
  - id: pip_pbp_state
    type: composite
    source: pip_pbp_request DATA01-02
  - id: projector_name
    type: string
    source: lan_projector_name_request ; information_request DATA01-49
  - id: mac_address
    type: string
    source: lan_mac_address_status_request_2 DATA01-06
  - id: model_name
    type: string
    source: model_name_request DATA01-32
  - id: serial_number
    type: string
    source: serial_number_request DATA01-16
  - id: base_model_type
    type: composite
    source: base_model_type_request DATA01-15
  - id: horizontal_sync_frequency
    type: string
    source: information_string_request (DATA01=03h)
  - id: vertical_sync_frequency
    type: string
    source: information_string_request (DATA01=04h)
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source: cover_status_request DATA01
  - id: freeze_state
    type: enum
    values: [off, on]
    source: basic_information_request DATA09
  - id: gain_parameter
    type: composite
    source: gain_parameter_request_3 DATA01-16 (per target: brightness/contrast/color/hue/sharpness/volume/lamp_adjust)
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: lens_profile_request DATA01
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
variables:
  - id: picture_brightness
    type: integer
    set_via: picture_adjust (DATA01=00h) ; query via gain_parameter_request_3 (DATA01=00h)
  - id: picture_contrast
    type: integer
    set_via: picture_adjust (DATA01=01h)
  - id: picture_color
    type: integer
    set_via: picture_adjust (DATA01=02h)
  - id: picture_hue
    type: integer
    set_via: picture_adjust (DATA01=03h)
  - id: picture_sharpness
    type: integer
    set_via: picture_adjust (DATA01=04h)
  - id: volume
    type: integer
    set_via: volume_adjust
  - id: lamp_light_adjust
    type: integer
    set_via: other_adjust (DATA01=96h, DATA02=FFh)
  - id: aspect
    type: enum
    # UNRESOLVED: enum values in Appendix (not in source)
    set_via: aspect_adjust
  - id: eco_mode
    type: enum
    # UNRESOLVED: enum values in Appendix (not in source)
    set_via: eco_mode_set
  - id: projector_name
    type: string
    max_length: 16
    set_via: lan_projector_name_set
  - id: lens_memory_load_by_signal
    type: enum
    values: [off, on]
    set_via: lens_memory_option_set (DATA01=00h)
  - id: lens_memory_forced_mute
    type: enum
    values: [off, on]
    set_via: lens_memory_option_set (DATA01=01h)
```

## Events
```yaml
# No unsolicited notifications documented. The projector only responds to commands.
# UNRESOLVED: source does not document any push/event mechanism.
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    constraint: "While POWER ON is in progress, no other command can be accepted."
  - command: power_off
    constraint: "While POWER OFF is in progress (including cooling time), no other command can be accepted."
  - command: lens_control
    constraint: "After sending 7Fh (continuous +) or 81h (continuous -) in DATA02, lens drive must be stopped by sending 00h."
# UNRESOLVED: source contains error bitfields indicating interlock-switch-open, cover, temperature, and fan faults,
# but does not describe explicit power-on sequencing or operator interlock procedures beyond the command-acceptance
# constraints above. Populate further only from explicit source text.
```

## Notes
- **Framing**: All commands/responses are binary hex. Request opcodes are `00h`–`03h` (plus `01h`); successful acknowledgements echo the opcode plus `20h` (e.g. `02h`→`22h`, `03h`→`23h`); error responses use opcode plus `A0h` (e.g. `02h`→`A2h`, `03h`→`A3h`).
- **Checksum (CKS)**: low-order one byte of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **Common parameters**: `ID1` = control ID set on projector; `ID2` = model code (model-dependent); `LEN` = byte length of trailing DATA part; `DATA??` = variable-length data; `ERR1`/`ERR2` = response error codes (see §2.4).
- **Error codes (ERR1/ERR2)** — verbatim from source §2.4:
  - `00h/00h` command not recognized · `00h/01h` command not supported by model · `01h/00h` specified value invalid · `01h/01h` specified input terminal invalid · `01h/02h` specified language invalid · `02h/00h` memory allocation error · `02h/02h` memory in use · `02h/03h` specified value cannot be set · `02h/04h` forced onscreen mute on · `02h/06h` viewer error · `02h/07h` no signal · `02h/08h` test pattern/filter displayed · `02h/09h` no PC card inserted · `02h/0Ah` memory operation error · `02h/0Ch` entry list displayed · `02h/0Dh` command cannot be accepted because power is off · `02h/0Eh` command execution failed · `02h/0Fh` no authority for operation · `03h/00h` specified gain number incorrect · `03h/01h` specified gain invalid · `03h/02h` adjustment failed.
- **Auto-clearing mutes**: Picture/Sound/Onscreen mute are automatically turned off by input-terminal switch or video-signal switch (sound mute also clears on volume adjustment).
- **Lamp usage timing**: usage time returned in one-second units but updated only at one-minute intervals.
- **Serial cable**: cross (null-modem) cable required; D-SUB 9P. Pin 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- **LAN**: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (selectable 115200/38400/19200/9600/4800). -->
<!-- UNRESOLVED: flow-control type not explicitly stated (only 'Full duplex' communication mode). -->
<!-- UNRESOLVED: model code (ID2) value for Ld E181 not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: input terminal DATA01 value table, aspect value table, eco mode value table, and sub-input value table referenced as Appendix 'Supplementary Information by Command' — not present in the source text. -->
<!-- UNRESOLVED: full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus shown in extracted table; other rows truncated). -->
<!-- UNRESOLVED: DATA01/02 lamp selector response for two-lamp models — source notes "01h effective only for two-lamp projector models" but does not state whether Ld E181 is one- or two-lamp. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:14:09.527Z
last_checked_at: 2026-06-17T20:01:18.859Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:01:18.859Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command definitions with correct hex opcodes; transport parameters verified against source; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific input terminal value table and aspect value table are referenced as an \"Appendix\" that is not included in the source text. Several DATA01 enum domains (input terminal, aspect, eco mode, sub-input) cannot be enumerated without that appendix."
- "no single default baud rate stated in source"
- "\"Full duplex\" communication mode stated; RTS/CTS pins wired but flow-control type not specified"
- "enum values defined in Appendix 'Supplementary Information by Command' (not in source)"
- "enum values in Appendix (not in source)"
- "source does not document any push/event mechanism."
- "source contains error bitfields indicating interlock-switch-open, cover, temperature, and fan faults,"
- "firmware version compatibility not stated in source."
- "default baud rate not stated (selectable 115200/38400/19200/9600/4800)."
- "flow-control type not explicitly stated (only 'Full duplex' communication mode)."
- "model code (ID2) value for Ld E181 not stated in source."
- "control ID (ID1) default value not stated."
- "input terminal DATA01 value table, aspect value table, eco mode value table, and sub-input value table referenced as Appendix 'Supplementary Information by Command' — not present in the source text."
- "full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus shown in extracted table; other rows truncated)."
- "DATA01/02 lamp selector response for two-lamp models — source notes \"01h effective only for two-lamp projector models\" but does not state whether Ld E181 is one- or two-lamp."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
