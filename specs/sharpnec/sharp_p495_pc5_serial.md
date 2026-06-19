---
spec_id: admin/sharpnec-p495-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P495 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "P495 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P495 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:24:28.570Z
last_checked_at: 2026-06-18T09:02:48.430Z
generated_at: 2026-06-18T09:02:48.430Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Wireless LAN unit model/spec not stated. Power/voltage specs not in this control doc. Input terminal value list deferred to vendor Appendix (not in source). Eco mode value list deferred to vendor Appendix. Sub input value list deferred to vendor Appendix."
  - "source documents no unsolicited notifications. All responses are solicited (reply to a command)."
  - "source documents no multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "Input terminal value byte list (Appendix) not in source."
  - "Aspect value byte list (Appendix) not in source."
  - "Eco mode value byte list (Appendix) not in source."
  - "Sub input setting value list (Appendix) not in source."
  - "Base model type value list (Appendix) not in source."
  - "Default baud rate, wireless LAN unit model, firmware version range."
  - "Full key-code list for command 050 may exceed the 25 documented rows; only source-documented keys enumerated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:02:48.430Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P495 Pc5 Control Spec

## Summary
Large-screen projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP port 7142). Spec covers full binary command set: power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, shutter, freeze, status queries (running status, mute, input, lamp/filter usage, model name, serial number, MAC address, eco mode, edge blending, PIP/PbP), and remote key-code emulation. Binary frames: fixed header bytes + DATA + checksum byte (low-order byte of sum of preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated. Wireless LAN unit model/spec not stated. Power/voltage specs not in this control doc. Input terminal value list deferred to vendor Appendix (not in source). Eco mode value list deferred to vendor Appendix. Sub input value list deferred to vendor Appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600      # source: 115200/38400/19200/9600/4800 selectable; default unstated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none   # source: full duplex; RTS/CTS wired at pin level but sw flow_control unstated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands
  - routable     # inferred: INPUT SW CHANGE command
  - queryable    # inferred: extensive status request commands
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST
```

## Actions
```yaml
# All command payloads verbatim from source. Hex notation as written (e.g. "02h").
# Checksum byte (last byte) is the literal example checksum from the source where command is fixed;
# for parameterized commands the <CKS> placeholder is shown and must be computed at runtime
# (low-order byte of the sum of all preceding bytes).

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full list in vendor Appendix 'Supplementary Information by Command' - UNRESOLVED."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video signal switch."

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
  notes: "Cleared on input/video switch or volume adjust."

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
  notes: "Cleared on input/video signal switch."

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
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value byte. Full list in vendor Appendix - UNRESOLVED."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST per source)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh with DATA01=96h per source)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"

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
    - name: DATA01
      type: integer
      description: "Lens target: 06h=Periphery Focus (only value documented in source)"
    - name: DATA02
      type: integer
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus-continuous, 81h=minus-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after 7Fh/81h continuous drive. Same command may be reissued during drive without stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same selector as LENS CONTROL)"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop; Adjustment mode/value ignored when Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift(H), bit4=Lens Shift(V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

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
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03=Power status (00h=Standby,01h=Power on,FFh=Not supported), DATA04=Cooling, DATA05=Power On/Off process, DATA06=Operation status."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (00h off / 01h on)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value depending on model. Value list in vendor Appendix - UNRESOLVED."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value byte. Value list in vendor Appendix - UNRESOLVED."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input list in vendor Appendix - UNRESOLVED)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte. List in vendor Appendix - UNRESOLVED."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Source documents responses to all query commands above. Key enumerated-state responses:
- id: power_status
  type: enum
  values: [standby, power_on]
  source: "078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on, FFh=Not supported)"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 (00h/04h/05h/06h/0Fh/10h)"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: mute_state
  type: object
  source: "078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced-onscreen/OSD display flags)"

- id: error_status
  type: bitfield
  source: "009 ERROR STATUS REQUEST DATA01-12 (cover/fan/temperature/power/lamp/formatter/FPGA/iris/lens-install errors)"

- id: command_ack
  type: enum
  values: [success, error]
  source: "Universal response frame: 2xh = success, Axh = error with ERR1/ERR2 codes"
```

## Variables
```yaml
- id: brightness
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=00h; bounds queryable via 060-1 GAIN PARAMETER REQUEST 3"

- id: contrast
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=01h"

- id: color
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=02h"

- id: hue
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=03h"

- id: sharpness
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=04h"

- id: volume
  type: integer
  source: "030-2 VOLUME ADJUST"

- id: lamp_adjust
  type: integer
  source: "030-15 OTHER ADJUST (LAMP/LIGHT ADJUST)"

- id: aspect
  type: enum
  source: "030-12 ASPECT ADJUST - value list UNRESOLVED (vendor Appendix)"

- id: eco_mode
  type: enum
  source: "098-8 ECO MODE SET - value list UNRESOLVED (vendor Appendix)"

- id: edge_blending
  type: enum
  values: [off, on]
  source: "098-243-1 EDGE BLENDING MODE SET"

- id: projector_name
  type: string
  source: "098-45 LAN PROJECTOR NAME SET (up to 16 bytes)"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are solicited (reply to a command).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond noting POWER ON/OFF reject concurrent commands
# during transition (documented as Notes on actions 015/016, not a formal interlock).
```

## Notes
- Binary protocol. Frame layout per source: `[cmd bytes] <DATA...> <CKS>`. Responses framed with leading `2xh` (success) / `Axh` (error) byte, ID1 (control ID), ID2 (model code), LEN, payload, CKS.
- Checksum = low-order byte of sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` → `103h` → CKS = `03h`.
- Serial cable is cross (null-modem); PC CONTROL port D-SUB 9P. Pins: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: RJ-45 wired per IEEE 802.3 / 802.3u auto-negotiation 10/100 Mbps. TCP port 7142 for command send/receive. Wireless LAN via optional wireless LAN unit (model/spec UNRESOLVED).
- Baud rate selectable across {4800, 9600, 19200, 38400, 115200}; default value UNRESOLVED — picked 9600 as one documented option, operator should confirm device setting.
- Error code table (ERR1/ERR2) covers: unrecognized command, unsupported by model, invalid value, invalid input terminal, invalid language, memory errors, forced onscreen mute, viewer error, no signal, test pattern displayed, no PC card, memory op error, entry list displayed, power-off rejection, execution failure, no authority, invalid gain number/value, adjustment failed. See source §2.4 for full table.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals. Lamp remaining life (%) is negative if replacement deadline exceeded.
- "01h" (Lamp 2) selectors effective only on two-lamp projector models.

<!-- UNRESOLVED: Input terminal value byte list (Appendix) not in source. -->
<!-- UNRESOLVED: Aspect value byte list (Appendix) not in source. -->
<!-- UNRESOLVED: Eco mode value byte list (Appendix) not in source. -->
<!-- UNRESOLVED: Sub input setting value list (Appendix) not in source. -->
<!-- UNRESOLVED: Base model type value list (Appendix) not in source. -->
<!-- UNRESOLVED: Default baud rate, wireless LAN unit model, firmware version range. -->
<!-- UNRESOLVED: Full key-code list for command 050 may exceed the 25 documented rows; only source-documented keys enumerated. -->
````

53 actions = all command rows in source §2 list. Payloads verbatim. Serial + TCP both emitted (both Tier-1 stated). Auth inferred none. Appendix-deferred value lists marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:24:28.570Z
last_checked_at: 2026-06-18T09:02:48.430Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:02:48.430Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Wireless LAN unit model/spec not stated. Power/voltage specs not in this control doc. Input terminal value list deferred to vendor Appendix (not in source). Eco mode value list deferred to vendor Appendix. Sub input value list deferred to vendor Appendix."
- "source documents no unsolicited notifications. All responses are solicited (reply to a command)."
- "source documents no multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "Input terminal value byte list (Appendix) not in source."
- "Aspect value byte list (Appendix) not in source."
- "Eco mode value byte list (Appendix) not in source."
- "Sub input setting value list (Appendix) not in source."
- "Base model type value list (Appendix) not in source."
- "Default baud rate, wireless LAN unit model, firmware version range."
- "Full key-code list for command 050 may exceed the 25 documented rows; only source-documented keys enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
