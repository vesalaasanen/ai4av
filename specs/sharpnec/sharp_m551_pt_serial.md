---
spec_id: admin/sharp-nec-m551-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M551 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "M551 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M551 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:40:11.782Z
last_checked_at: 2026-06-18T08:11:18.794Z
generated_at: 2026-06-18T08:11:18.794Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "default baud rate (one of 4800/9600/19200/38400/115200) not singled out in source"
  - "input terminal value table (Appendix \"Supplementary Information by Command\") not present in source extract"
  - "aspect value table referenced from source appendix, not in extract"
  - "eco mode value table referenced from source appendix, not in extract"
  - "base model type value table referenced from source appendix, not in extract"
  - "sub input setting value table referenced from source appendix, not in extract"
  - "flow_control not explicitly stated in source (full-duplex communication mode stated)"
  - "not in source extract.\""
  - "source describes no unsolicited notifications. All responses are"
  - "source describes no multi-step sequences."
  - "source contains no explicit power-on sequencing procedure beyond"
  - "firmware version compatibility not stated in source"
  - "default serial baud rate not singled out (5 supported values stated)"
  - "serial flow_control not explicitly stated (full-duplex mode stated, RTS/CTS pins present on D-SUB 9P)"
  - "input terminal / aspect / eco mode / base model type / sub input value tables live in source appendix not included in this extract"
  - "ID2 model code value for M551 Pt not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:11:18.794Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M551 Pt Control Spec

## Summary
Control spec for the Sharp/NEC M551 Pt projector (BDT140013 Rev 7.1 Command Reference). Covers RS-232C serial control (PC CONTROL D-SUB 9P, cross cable) and wired/wireless LAN control (TCP port 7142). Binary framed protocol with hex opcodes, ID1/ID2, length, data, and a trailing additive low-byte checksum.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: default baud rate (one of 4800/9600/19200/38400/115200) not singled out in source -->
<!-- UNRESOLVED: input terminal value table (Appendix "Supplementary Information by Command") not present in source extract -->
<!-- UNRESOLVED: aspect value table referenced from source appendix, not in extract -->
<!-- UNRESOLVED: eco mode value table referenced from source appendix, not in extract -->
<!-- UNRESOLVED: base model type value table referenced from source appendix, not in extract -->
<!-- UNRESOLVED: sub input setting value table referenced from source appendix, not in extract -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # supported set; default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not explicitly stated in source (full-duplex communication mode stated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 053 LENS CONTROL present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response 20h 88h <ID1> <ID2> 0Ch <DATA01..DATA12> <CKS>; DATA01-12 carry bit-packed error flags (see source error information list)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While powering on, no other command accepted. ACK 22h 00h <ID1> <ID2> 00h <CKS>; NAK A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time) no other command accepted. ACK 22h 01h <ID1> <ID2> 00h <CKS>; NAK A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (DATA01). Example value 06h = video port. Full value table in source appendix 'Supplementary Information by Command' - # UNRESOLVED: not in source extract."
    notes: "ACK 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; DATA01=FFh means ended with error (no signal switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

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
    notes: "Cleared by input/video switch or volume adjustment."

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
    notes: "Cleared by input/video switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01 - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: mode
        type: enum
        description: "DATA02 - 00h absolute value, 01h relative value."
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value high-order 8 bits."
    notes: "Response 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; DATA01+02 = 0000h success, other = error."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "DATA01 - 00h absolute value, 01h relative value."
      - name: value_lo
        type: integer
        description: "DATA02 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA03 adjustment value high-order 8 bits."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: "DATA01 - value set for the aspect. Full table in source appendix 'Supplementary Information by Command' - # UNRESOLVED: not in source extract."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: target_lo
        type: enum
        description: "DATA01 - 96h LAMP ADJUST / LIGHT ADJUST (only value documented)."
      - name: target_hi
        type: integer
        description: "DATA02 - FFh per source table for LAMP/LIGHT ADJUST."
      - name: mode
        type: enum
        description: "DATA03 - 00h absolute value, 01h relative value."
      - name: value_lo
        type: integer
        description: "DATA04 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA05 adjustment value high-order 8 bits."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response 23h 8Ah <ID1> <ID2> 62h <DATA01..DATA98> <CKS>; DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response 23h 95h <ID1> <ID2> 08h <DATA01..DATA08> <CKS>; DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: enum
        description: "DATA01 - 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: content
        type: enum
        description: "DATA02 - 01h lamp usage time (seconds), 04h lamp remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: enum
        description: "DATA01 - 00h Total Carbon Savings, 01h Carbon Savings during operation."
    notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: enum
        description: "DATA01+DATA02 key code (WORD). Per source key code list - 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."
    notes: "ACK 22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>; FFh = ended with error."

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01 - 06h Periphery Focus (only value documented in source extract)."
      - name: content
        type: enum
        description: "DATA02 - 00h Stop, 01h drive 1s +, 02h drive 0.5s +, 03h drive 0.25s +, 7Fh drive + (continuous), 81h drive -, FDh drive 0.25s -, FEh drive 0.5s -, FFh drive 1s -."
    notes: "Continuous drive (7Fh/81h) must be stopped by sending 00h. While lens driving, repeated same command adjusts without a stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 lens adjustment target (matches 053 LENS CONTROL target)."
    notes: "Response DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit, lo/hi)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01 - FFh Stop (mode/value ignored), other values = lens axis target."
      - name: mode
        type: enum
        description: "DATA02 - 00h absolute value, 02h relative value."
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value high-order 8 bits."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01 - 00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01 - 00h MOVE, 01h STORE, 02h RESET."
    notes: "Operates on the profile number selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01 - 00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01 - 00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: value
        type: enum
        description: "DATA02 - 00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V); 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: enum
        description: "DATA01 - 00h Profile 1, 01h Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: name
        type: enum
        description: "DATA01 - 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST."
    notes: "Response DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist), DATA02-11 upper/lower/default/current/wide/narrow ranges, DATA14 default validity."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03 base model type, DATA04 sound function (00h none / 01h available), DATA05 profile number (00h none / 01h clock / 02h sleep timer / 03h clock + sleep timer)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response DATA03 power status (00h Standby / 01h Power on / FFh not supported), DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h Standby(Sleep) / 04h Power on / 05h Cooling / 06h Standby(error) / 0Fh Standby(Power saving) / 10h Network standby)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response DATA01 signal switch process, DATA02 signal list number (returns practical-1), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER / 02h VIDEO / 03h S-VIDEO / 04h COMPONENT / 07h VIEWER(1-5) / 20h DVI-D / 21h HDMI / 22h DisplayPort / 23h VIEWER(6-10) / FFh Not Source Input), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (each 00h off / 01h on)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32 model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01 - 00h Normal (cover opened), 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: enum
        description: "DATA01 - 01h freeze on, 02h freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: enum
        description: "DATA01 - 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value depending on projector. Value table in source appendix - # UNRESOLVED: not in source extract."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06 MAC address bytes."

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01 - 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
    notes: "Response DATA02 setting value; MODE 00h PIP / 01h PBP; START POSITION 00h TOP-LEFT / 01h TOP-RIGHT / 02h BOTTOM-LEFT / 03h BOTTOM-RIGHT."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01 - 00h OFF, 01h ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value. Value table in source appendix - # UNRESOLVED: not in source extract."
    notes: "Sets Light mode or Lamp mode depending on projector."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "DATA01-16 projector name (up to 16 bytes), NUL-padded."

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01 - 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: value
        type: integer
        description: "DATA02 setting value (MODE: 00h PIP / 01h PBP; START POSITION: 00h TL / 01h TR / 02h BL / 03h BR; SUB INPUT: value per appendix - # UNRESOLVED)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: enum
        description: "DATA01 - 00h OFF, 01h ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type. Value table in source appendix - # UNRESOLVED: not in source extract."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16 serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response DATA01 operation status (00h Standby(Sleep) / 04h Power on / 05h Cooling / 06h Standby(error) / 0Fh Standby(Power saving) / 10h Network standby), DATA02 content displayed, DATA03/04 selection signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal code. Full table in source appendix 'Supplementary Information by Command' - # UNRESOLVED: not in source extract."
      - name: setting_value
        type: enum
        description: "DATA02 - 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
# Each query action above returns a framed response (20h/23h prefix depending on
# opcode group) with a 02h ACK body or an A0h/A1h/A2h/A3h NAK body carrying
# ERR1/ERR2. Concrete feedback channels below.
feedbacks:
  - id: command_ack
    type: enum
    values: [success, error]
    description: "Per-command ACK/NAK. ACK body 00h (no data) or data bytes; NAK body carries ERR1/ERR2 per source error code list."

  - id: error_status
    type: bitfield
    description: "From 009 ERROR STATUS REQUEST - DATA01-12 bit-packed errors (cover, fan, temperature, power, lamp off, lamp replacement moratorium, lamp usage limit, formatter, FPGA, mirror cover, foreign matter, ballast comm, iris calibration, lens not installed, interlock switch open, system errors)."

  - id: power_status
    type: enum
    values: [standby, power_on, not_supported]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03 - 00h Standby / 01h Power on / FFh Not supported."

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2 RUNNING STATUS REQUEST DATA06."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From 037 INFORMATION REQUEST DATA83-86 or 037-4 LAMP INFORMATION REQUEST 3. Updated at 1-minute intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From 037-4 LAMP INFORMATION REQUEST 3 (content 04h). Negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From 037/037-3."

  - id: mute_status
    type: object
    description: "From 078-4 MUTE STATUS REQUEST - picture/sound/onscreen/forced-onscreen/onscreen-display flags."

  - id: lens_operation_status
    type: bitfield
    description: "From 053-7 LENS INFORMATION REQUEST DATA01 - lens memory / zoom / focus / lens shift H+V operation bits."

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: "From 078-6 COVER STATUS REQUEST DATA01."
```

## Variables
```yaml
# Settable parameters surfaced via dedicated set/adjust commands. Listed here as
# observable settable variables distinct from discrete actions.
variables:
  - id: picture_brightness
    type: integer
    description: "Via 030-1 PICTURE ADJUST (target 00h)."
  - id: picture_contrast
    type: integer
    description: "Via 030-1 PICTURE ADJUST (target 01h)."
  - id: picture_color
    type: integer
    description: "Via 030-1 PICTURE ADJUST (target 02h)."
  - id: picture_hue
    type: integer
    description: "Via 030-1 PICTURE ADJUST (target 03h)."
  - id: picture_sharpness
    type: integer
    description: "Via 030-1 PICTURE ADJUST (target 04h)."
  - id: volume
    type: integer
    description: "Via 030-2 VOLUME ADJUST."
  - id: aspect
    type: enum
    description: "Via 030-12 ASPECT ADJUST. Value table UNRESOLVED (source appendix not in extract)."
  - id: lamp_light_adjust
    type: integer
    description: "Via 030-15 OTHER ADJUST (target 96h/FFh)."
  - id: eco_mode
    type: enum
    description: "Via 098-8 ECO MODE SET. Value table UNRESOLVED (source appendix not in extract)."
  - id: projector_name
    type: string
    description: "Via 098-45 LAN PROJECTOR NAME SET (up to 16 bytes)."
  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]
    description: "Via 098-198 (item 00h)."
  - id: pip_pbp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
    description: "Via 098-198 (item 01h)."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Via 098-243-1."
  - id: freeze_state
    type: enum
    values: [on, off]
    description: "Via 079 FREEZE CONTROL."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Via 053-10 LENS PROFILE SET."
  - id: lens_memory_load_by_signal
    type: enum
    values: [off, on]
    description: "Via 053-6 (option 00h)."
  - id: lens_memory_forced_mute
    type: enum
    values: [off, on]
    description: "Via 053-6 (option 01h)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# replies to commands.
events: []
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # projector enters cooling period; no other command accepted during cool-down
  - shutter_close  # optical output blocked
interlocks:
  - "During POWER ON ramp-up, no other command can be accepted (source §3.2)."
  - "During POWER OFF including cooling time, no other command can be accepted (source §3.3)."
  - "Commands issued while power is off return ERR1=02h ERR2=0Dh ('The command cannot be accepted because the power is off')."
  - "Forced onscreen mute (ERR1=02h ERR2=04h) can block command execution."
  - "Interlock switch open or portrait cover side up surfaces in ERROR STATUS REQUEST DATA09."
# UNRESOLVED: source contains no explicit power-on sequencing procedure beyond
# the per-command interlock notes above; no voltage/current/power values stated.
```

## Notes
- **Protocol framing:** every command/response is a hex byte stream. Format `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`. `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model); `<CKS>` = additive checksum, low-order byte of sum of all preceding bytes. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.
- **Response prefix groups:** `2xh` = ACK, `Axh` = NAK (with ERR1/ERR2). First command byte 00h/01h/02h/03h maps to response ACK prefix 20h/21h/22h/23h and NAK prefix A0h/A1h/A2h/A3h.
- **Timing:** lamp/filter usage time updated at one-minute intervals even though values are in one-second units.
- **Multi-baud:** serial supports 4800/9600/19200/38400/115200 bps — match the projector's configured rate; default rate UNRESOLVED.
- **Two-lamp models:** LAMP INFORMATION REQUEST 3 DATA01=01h (Lamp 2) only valid on two-lamp models.
- **Appendix tables referenced but absent from this source extract:** input terminal codes, aspect values, eco mode values, base model type values, sub input setting values. All marked UNRESOLVED inline.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default serial baud rate not singled out (5 supported values stated) -->
<!-- UNRESOLVED: serial flow_control not explicitly stated (full-duplex mode stated, RTS/CTS pins present on D-SUB 9P) -->
<!-- UNRESOLVED: input terminal / aspect / eco mode / base model type / sub input value tables live in source appendix not included in this extract -->
<!-- UNRESOLVED: ID2 model code value for M551 Pt not stated in source -->
````

Spec done. 53 actions (one per source command row). Tier-1 direct values only; Tier-2 inferences flagged; appendix tables + default baud + ID2 model code marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:40:11.782Z
last_checked_at: 2026-06-18T08:11:18.794Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:11:18.794Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "default baud rate (one of 4800/9600/19200/38400/115200) not singled out in source"
- "input terminal value table (Appendix \"Supplementary Information by Command\") not present in source extract"
- "aspect value table referenced from source appendix, not in extract"
- "eco mode value table referenced from source appendix, not in extract"
- "base model type value table referenced from source appendix, not in extract"
- "sub input setting value table referenced from source appendix, not in extract"
- "flow_control not explicitly stated in source (full-duplex communication mode stated)"
- "not in source extract.\""
- "source describes no unsolicited notifications. All responses are"
- "source describes no multi-step sequences."
- "source contains no explicit power-on sequencing procedure beyond"
- "firmware version compatibility not stated in source"
- "default serial baud rate not singled out (5 supported values stated)"
- "serial flow_control not explicitly stated (full-duplex mode stated, RTS/CTS pins present on D-SUB 9P)"
- "input terminal / aspect / eco mode / base model type / sub input value tables live in source appendix not included in this extract"
- "ID2 model code value for M551 Pt not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
