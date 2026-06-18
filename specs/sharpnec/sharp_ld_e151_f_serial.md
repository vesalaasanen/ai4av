---
spec_id: admin/sharp-nec-ld-e151-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E151 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E151 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E151 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:08:59.571Z
last_checked_at: 2026-06-17T20:01:18.107Z
generated_at: 2026-06-17T20:01:18.107Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default baud rate not stated (5 rates supported). flow_control type not stated. control ID (ID1) and model code (ID2) values per-device. firmware version. many DATA value sets deferred to an \"Appendix / Supplementary Information by Command\" not included in the source text (input terminal codes, aspect codes, eco-mode codes, base model types, sub-input codes)."
  - "flow control not stated (RTS/CTS pins wired on D-SUB 9; full-duplex stated)"
  - "per-DATA-field response decodings for information requests (037,"
  - "populate if a separate macro/reference document exists."
  - "no voltage/current/power specs, error-recovery sequences, or"
  - "firmware version compatibility not stated. Default baud rate not stated (5 supported). Flow control type not stated. ID1 (control ID) and ID2 (model code) values are per-device and not given. Many DATA value sets (input terminal codes, aspect codes, eco-mode values, base-model types, PIP sub-input codes) are deferred to an \"Appendix / Supplementary Information by Command\" that is not present in the provided source text."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:01:18.107Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex payloads from source; transport parameters confirmed; full command coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld E151 F Control Spec

## Summary
Sharp/NEC Ld E151 F projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45, wireless via optional LAN unit). Binary, hex-byte, checksummed command protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). 53 documented commands covering power, input switching, mute, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, status/information queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: default baud rate not stated (5 rates supported). flow_control type not stated. control ID (ID1) and model code (ID2) values per-device. firmware version. many DATA value sets deferred to an "Appendix / Supplementary Information by Command" not included in the source text (input terminal codes, aspect codes, eco-mode codes, base model types, sub-input codes). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all supported per source; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins wired on D-SUB 9; full-duplex stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF present)
# - queryable       (many status/information request commands)
# - levelable       (VOLUME ADJUST, PICTURE ADJUST, LAMP/LIGHT ADJUST)
# - routable        (INPUT SW CHANGE, audio select)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Command/response framing (from source §2.1):
#   Command: <lead> <cmd> 00h 00h <LEN> <DATA...> <CKS>
#   Success response: <lead+20h> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Error response:   <lead+A0h> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# CKS (checksum) = low-order byte of sum of all preceding bytes. ID1 = control
# ID set on projector; ID2 = model code (varies by model). Both are per-device.
# All payloads below are verbatim hex bytes from the source.

actions:
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfields: cover, fan, temperature, power, lamp (1/2) off/replacement/data errors, formatter, FPGA, mirror cover, foreign matter, ballast comm, iris calibration, lens-install, extended status (interlock switch open, portrait cover, system errors)."

  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning power on, no other command accepted."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time), no other command accepted."

  - id: input_sw_change_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal code. Example given: 06h = video port. Full code list deferred to Appendix 'Supplementary Information by Command' (not in source)."
    notes: "Response DATA01 FFh = ended with error (no signal switch made). CKS = low byte of sum of preceding bytes."

  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Auto-off on input/video switch."

  - id: picture_mute_off_021
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on_022
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Auto-off on input/video switch or volume adjustment."

  - id: sound_mute_off_023
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on_024
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Auto-off on input/video switch."

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03_DATA04
        type: integer
        description: "Adjustment value, low byte (DATA03) + high byte (DATA04). Source ex: brightness=10 -> 00h 0Ah 00h; brightness=-10 -> F6h FFh."
    notes: "Response DATA01-DATA02: 0000h = success, else error."

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02_DATA03
        type: integer
        description: "Adjustment value, low byte (DATA02) + high byte (DATA03). Source ex: volume=10 -> 0Ah 00h."
    notes: "Response DATA01-DATA02: 0000h = success, else error."

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value code. Full list deferred to Appendix 'Supplementary Information by Command' (not in source)."
    notes: "Response DATA01-DATA02: 0000h = success, else error."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte. Documented: 96h = LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)."
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (96h/FFh = LAMP/LIGHT ADJUST)."
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04_DATA05
        type: integer
        description: "Adjustment value, low (DATA04) + high (DATA05)."
    notes: "Response DATA01-DATA02: 0000h = success, else error."

  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated 1-min intervals."

  - id: filter_usage_information_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s); -1 if undefined."

  - id: lamp_information_request_3_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)."
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)."
    notes: "Returns DATA03-06 value. Eco mode reflected. Negative remaining-life % if replacement deadline exceeded."

  - id: carbon_savings_information_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Returns DATA02-05 kg (max 99999) + DATA06-09 mg (max 999999)."

  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01_DATA02
        type: integer
        description: "WORD key code. Key list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."
    notes: "Response DATA01 FFh = error. Source ex (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h."

  - id: shutter_close_051
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open_052
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control_053
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens axis. Documented: 06h=Periphery Focus."
      - name: DATA02
        type: integer
        description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "Send 00h to stop after 7Fh/81h. Lens can be re-controlled without stop while driving."

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens axis (see 053)."
    notes: "Returns DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (each low+high byte)."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens axis. FFh = Stop (mode/value ignored)."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03_DATA04
        type: integer
        description: "Adjustment value, low (DATA03) + high (DATA04)."

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Response DATA01 FFh = error."

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Controls profile selected via 053-10 LENS PROFILE SET. Response DATA01 FFh = error."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Returns DATA02 setting: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  - id: lens_information_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0 lens-memory, Bit1 zoom, Bit2 focus, Bit3 lens-shift-H, Bit4 lens-shift-V (0=Stop, 1=During operation); Bits5-7 reserved."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile (00h=Profile 1, 01h=Profile 2); DATA02 reserved."

  - id: gain_parameter_request_3_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Returns status (DATA01: 00h display-N/A, 01h adjust-N/A, 02h OK, FFh no such gain), upper/lower limits, default, current, wide/narrow step widths, default-validity."

  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns DATA01-03 base model type, DATA04 sound function (00h N/A, 01h available), DATA05 profile number (00h none, 01h clock, 02h sleep, 03h both)."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns DATA03 power (00h standby, 01h on, FFh N/A), DATA04 cooling, DATA05 power-on/off process, DATA06 operation status (00h standby-sleep, 04h power-on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby)."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (returned value = practical-1), selection signal type 1/2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER), signal list type, test pattern, content displayed."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off, 01h on)."

  - id: model_name_request_078_5
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns DATA01-32 model name (NUL-terminated)."

  - id: cover_status_request_078_6
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=normal (cover opened), 01h=cover closed (mirror/lens cover)."

  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off."

  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency."
    notes: "Returns DATA02 label length + DATA03-?? label string (NUL-terminated)."

  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco/light/lamp mode value. Value set deferred to Appendix (not in source)."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address_status_request_2_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address. Source ex: 01h-23h-45h-67h-89h-ABh."

  - id: pip_pbypicture_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: "Returns DATA02 setting (MODE: 00h PIP / 01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input codes in Appendix)."

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco/light/lamp mode value (value set in Appendix, not in source)."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name, up to 16 bytes."
    notes: "Response DATA01: confirmed input terminal echo."

  - id: pip_pbypicture_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: integer
        description: "Setting (MODE: 00h PIP / 01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input codes in Appendix)."

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  - id: base_model_type_request_305_1
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns DATA01-02 + DATA12-13 base model type, DATA03-11 model name (NUL-terminated). Type values in Appendix."

  - id: serial_number_request_305_2
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns DATA01-16 serial number (NUL-terminated)."

  - id: basic_information_request_305_3
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type (video standards), video/sound/onscreen mute, freeze status."

  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (codes in Appendix)."
      - name: DATA02
        type: integer
        description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    notes: "Response DATA02: 00h success, 01h error."
```

## Feedbacks
```yaml
# All feedback is solicited (response to a query command). No unsolicited events
# are documented. Key response payloads:
feedbacks:
  - id: power_state
    type: enum
    source_query: running_status_request_078_2
    values: [standby, power_on, standby_error, power_saving, network_standby]
    notes: "DATA03 (00h/01h) + DATA06 operation status codes."

  - id: error_status
    type: bitmask
    source_query: error_status_request_009
    values: [cover_error, fan_error, temperature_bimetallic, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor, lamp_not_present, mirror_cover_error, lamp2_replacement_due, lamp2_usage_exceeded, ballast_comm_error, iris_calibration_error, lens_install, interlock_switch_open, system_error_slave, system_error_formatter]
    notes: "DATA01-04 + DATA09 bitfields."

  - id: mute_state
    type: enum
    source_query: mute_status_request_078_4
    values: [off, on]
    notes: "Separate fields for picture/sound/onscreen/forced-onscreen mute."

  - id: cover_state
    type: enum
    source_query: cover_status_request_078_6
    values: [normal_open, closed]

  - id: command_ack
    type: enum
    values: [success, error]
    notes: "Every command returns a success frame (lead+20h) or error frame (lead+A0h) with ERR1/ERR2 codes."

  # UNRESOLVED: per-DATA-field response decodings for information requests (037,
  # 037-3/4/6, 078-3, 084, 305-3) are partial - full value tables reference an
  # Appendix "Supplementary Information by Command" not present in the source text.
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    set_via: volume_adjust_030_2
    query_via: gain_parameter_request_3_060_1  # DATA01=05h
    notes: "Absolute or relative; range returned by gain-parameter request."

  - id: brightness
    type: integer
    set_via: picture_adjust_030_1  # DATA01=00h
    query_via: gain_parameter_request_3_060_1  # DATA01=00h

  - id: contrast
    type: integer
    set_via: picture_adjust_030_1  # DATA01=01h
    query_via: gain_parameter_request_3_060_1  # DATA01=01h

  - id: color
    type: integer
    set_via: picture_adjust_030_1  # DATA01=02h
    query_via: gain_parameter_request_3_060_1  # DATA01=02h

  - id: hue
    type: integer
    set_via: picture_adjust_030_1  # DATA01=03h
    query_via: gain_parameter_request_3_060_1  # DATA01=03h

  - id: sharpness
    type: integer
    set_via: picture_adjust_030_1  # DATA01=04h
    query_via: gain_parameter_request_3_060_1  # DATA01=04h

  - id: lamp_light_adjust
    type: integer
    set_via: other_adjust_030_15  # DATA01=96h DATA02=FFh
    query_via: gain_parameter_request_3_060_1  # DATA01=96h

  - id: lens_position
    type: integer
    set_via: [lens_control_053, lens_control_2_053_2]
    query_via: lens_control_request_053_1
    notes: "Per-axis absolute/relative drive; range returned by request."

  - id: eco_mode
    type: integer
    set_via: eco_mode_set_098_8
    query_via: eco_mode_request_097_8
    notes: "Value set deferred to Appendix (not in source)."

  - id: projector_name
    type: string
    set_via: lan_projector_name_set_098_45
    query_via: lan_projector_name_request_097_45
    notes: "Up to 16 bytes."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    set_via: lens_profile_set_053_10
    query_via: lens_profile_request_053_11
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited (reply to
# a command). Section not applicable.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if a separate macro/reference document exists.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on_015
    rule: "While power-on is in progress, no other command is accepted."
  - command: power_off_016
    rule: "During power-off (including cooling time), no other command is accepted."
  - command: lens_control_053
    rule: "After sending 7Fh/81h (continuous drive), must send 00h (Stop) to halt lens motion."
# UNRESOLVED: no voltage/current/power specs, error-recovery sequences, or
# power-on ordering requirements stated in source. Interlock switch open is
# reported as an error bit (DATA09 Bit1) but no user-facing interlock procedure documented.
```

## Notes
- Binary, checksummed hex-byte protocol over both RS-232C and TCP/IP (LAN). Same command set on both transports.
- RS-232C: D-SUB 9P PC CONTROL port, cross cable. Pins 2/3 = RxD/TxD, 5 = GND, 7/8 = RTS/CTS. Full duplex, 8N1, baud 4800/9600/19200/38400/115200.
- TCP: port 7142 (stated). Wired 10/100BASE-TX auto-negotiate, or wireless via optional LAN unit.
- Checksum (CKS): low-order byte of the sum of all preceding bytes. Worked example: `20h 81h 01h 60h 01h 00h` -> 103h -> CKS=03h.
- Responses: success frame lead byte = command lead + 20h; error frame lead byte = command lead + A0h, carrying ERR1/ERR2.
- Error codes (ERR1/ERR2) include: unrecognized command (00/00), not supported by model (00/01), invalid value (01/00), invalid input terminal (01/01), power off (02/0Dh), execution failed (02/0Eh), no authority (02/0Fh), no signal (02/07h), memory in use (02/02h), forced onscreen mute on (02/04h), incorrect gain number (03/00), adjustment failed (03/02). Full list in §2.4.
- Lamp/filter usage time reported in seconds; updated at 1-minute intervals. Lamp remaining life (%) goes negative if replacement deadline exceeded.

<!-- UNRESOLVED: firmware version compatibility not stated. Default baud rate not stated (5 supported). Flow control type not stated. ID1 (control ID) and ID2 (model code) values are per-device and not given. Many DATA value sets (input terminal codes, aspect codes, eco-mode values, base-model types, PIP sub-input codes) are deferred to an "Appendix / Supplementary Information by Command" that is not present in the provided source text. -->
````

Spec done. 53 actions enumerated, all hex payloads verbatim. UNRESOLVED markers kept for appendix-deferred value sets, default baud, flow control, ID1/ID2, firmware.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:08:59.571Z
last_checked_at: 2026-06-17T20:01:18.107Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:01:18.107Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex payloads from source; transport parameters confirmed; full command coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default baud rate not stated (5 rates supported). flow_control type not stated. control ID (ID1) and model code (ID2) values per-device. firmware version. many DATA value sets deferred to an \"Appendix / Supplementary Information by Command\" not included in the source text (input terminal codes, aspect codes, eco-mode codes, base model types, sub-input codes)."
- "flow control not stated (RTS/CTS pins wired on D-SUB 9; full-duplex stated)"
- "per-DATA-field response decodings for information requests (037,"
- "populate if a separate macro/reference document exists."
- "no voltage/current/power specs, error-recovery sequences, or"
- "firmware version compatibility not stated. Default baud rate not stated (5 supported). Flow control type not stated. ID1 (control ID) and ID2 (model code) values are per-device and not given. Many DATA value sets (input terminal codes, aspect codes, eco-mode values, base-model types, PIP sub-input codes) are deferred to an \"Appendix / Supplementary Information by Command\" that is not present in the provided source text."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
