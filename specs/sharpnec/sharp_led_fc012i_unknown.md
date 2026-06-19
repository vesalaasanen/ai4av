---
spec_id: admin/sharp-nec-led-fc012i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC012I Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC012I"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC012I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:56:22.556Z
last_checked_at: 2026-06-18T08:03:40.718Z
generated_at: 2026-06-18T08:03:40.718Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal DATA01 value map (referenced to \"Supplementary Information by Command\" appendix not present in source); eco mode DATA01 value map (appendix reference); sub input setting value map (appendix reference); aspect value map (appendix reference); base model type values (appendix reference)"
  - "full DATA01 input terminal value map is in an appendix not present in source."
  - "aspect value map is in an appendix not present in source."
  - "eco mode value map is in an appendix not present in source."
  - "sub input setting value map is in an appendix not present in source."
  - "base model type value map is in an appendix not present in source."
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step command sequences."
  - "input terminal DATA01 value map (appendix not in source)"
  - "aspect DATA01 value map (appendix not in source)"
  - "eco mode DATA01 value map (appendix not in source)"
  - "PIP sub input setting value map (appendix not in source)"
  - "base model type value map (appendix not in source)"
  - "firmware version compatibility not stated in source"
  - "protocol version number not stated in source"
  - "response timing / inter-command delay limits not stated"
  - "ID2 model code value for LED FC012I not stated (varies by model)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:03:40.718Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC012I Control Spec

## Summary
Sharp/NEC projector (BDT140013 Rev 7.1 Projector Control Command Reference). Binary control protocol over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). Commands and responses are hex-framed with control ID (ID1), model code (ID2), data length (LEN), data bytes, and a one-byte checksum (CKS) computed as the low byte of the sum of all preceding bytes. Query commands return device status; action commands control power, input, mute, lens, picture, volume, and other settings.

<!-- UNRESOLVED: input terminal DATA01 value map (referenced to "Supplementary Information by Command" appendix not present in source); eco mode DATA01 value map (appendix reference); sub input setting value map (appendix reference); aspect value map (appendix reference); base model type values (appendix reference) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # bps, selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
  - routable        # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# Notes on framing (common to all commands):
#   <ID1> = control ID set on projector; <ID2> = model code; <CKS> = checksum =
#   low byte of sum of all preceding bytes. LEN = data length of bytes after LEN.
#   Response opcodes: 2xh = normal exec ack (20h..23h), Axh = error response.
#   All payloads verbatim from source (hex, 'h' suffix preserved).

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command accepted.

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning off (incl. cooling time), no other command accepted.

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see appendix 'Supplementary Information by Command'). Example: 06h = video port."
  # UNRESOLVED: full DATA01 input terminal value map is in an appendix not present in source.

- id: picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off on input/video switch.

- id: picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off on input/video switch or volume adjustment.

- id: sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Turned off on input/video switch.

- id: onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see appendix 'Supplementary Information by Command')."
  # UNRESOLVED: aspect value map is in an appendix not present in source.

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "96h for LAMP ADJUST / LIGHT ADJUST (DATA02 = FFh)."
    - name: DATA02
      type: integer
      description: "FFh with DATA01 96h."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49 = projector name; DATA83-86 = lamp usage time (sec); DATA87-90 = filter usage time (sec). Updated at one-minute intervals."

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 = filter usage time (sec); DATA05-08 = filter alarm start time (sec). -1 if undefined."

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%). Negative remaining life if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Response DATA02-05 = kg (max 99999); DATA06-09 = mg (max 999999)."

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte. Examples (DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO."

- id: shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "06h=Periphery Focus."
    - name: DATA02
      type: integer
      description: "00h=Stop; 01h=drive 1s plus; 02h=drive 0.5s plus; 03h=drive 0.25s plus; 7Fh=drive plus; 81h=drive minus; FDh=drive 0.25s minus; FEh=drive 0.5s minus; FFh=drive 1s minus."
  notes: After 7Fh/81h, send 00h to stop.

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target (matches LENS CONTROL DATA01).
  notes: "Response DATA02-03 = upper limit; DATA04-05 = lower limit; DATA06-07 = current value."

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: Controls profile number set by LENS PROFILE SET.

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON."

- id: lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Response DATA01=adjusted value status (00h=display not possible, 01h=adjust not possible, 02h=adjust possible, FFh=gain does not exist); DATA02-09=upper/lower/default/current (16-bit pairs); DATA10-13=wide/narrow adjustment widths; DATA14=default validity."

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03=base model type; DATA04=sound function (00h=not available, 01h=available); DATA05=profile number."

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03=power status (00h=Standby, 01h=Power on, FFh=not supported); DATA04=cooling process; DATA05=power on/off process; DATA06=operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby)."

- id: input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response DATA01=signal switch process; DATA02=signal list number-1; DATA03=selection signal type 1; DATA04=selection signal type 2; DATA05=signal list type; DATA06=test pattern display; DATA09=content displayed."

- id: mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (00h=Off, 01h=On)."

- id: model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Response DATA01-32 = model name (NUL-terminated).

- id: cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off."

- id: information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00 <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."

- id: eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco mode value (or Light/Lamp mode value depending on model).
  # UNRESOLVED: eco mode value map is in an appendix not present in source.

- id: lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Response DATA01-17 = projector name (NUL-terminated).

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Response DATA01-06 = MAC address.

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "Response DATA02: for MODE 00h=PIP, 01h=PICTURE BY PICTURE; for START POSITION 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."
  # UNRESOLVED: sub input setting value map is in an appendix not present in source.

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (or Light/Lamp mode depending on model).
  # UNRESOLVED: eco mode value map is in an appendix not present in source.

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes).

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."
  # UNRESOLVED: sub input setting value map is in an appendix not present in source.

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON."

- id: base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02=base model type; DATA03-11=model name (NUL-terminated); DATA12-13=base model type."
  # UNRESOLVED: base model type value map is in an appendix not present in source.

- id: serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Response DATA01-16 = serial number (NUL-terminated).

- id: basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response DATA01=operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby); DATA02=content displayed; DATA03-04=selection signal type; DATA05=display signal type; DATA06=video mute; DATA07=sound mute; DATA08=onscreen mute; DATA09=freeze status."

- id: audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see appendix 'Supplementary Information by Command').
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
  # UNRESOLVED: full DATA01 input terminal value map is in an appendix not present in source.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: 078-2 DATA04

- id: picture_mute
  type: enum
  values: [off, on]
  source: 078-4 MUTE STATUS REQUEST DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA04

- id: freeze_state
  type: enum
  values: [off, on]
  source: 305-3 DATA09

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: 078-6 COVER STATUS REQUEST DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST DATA01

- id: error_status
  type: bitmask
  description: 12-byte error field from 009 ERROR STATUS REQUEST (DATA01-12).
  source: 009 ERROR STATUS REQUEST

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST

- id: mac_address
  type: string
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST2

- id: projector_name
  type: string
  source: 097-45 LAN PROJECTOR NAME REQUEST

- id: eco_mode
  type: enum
  # UNRESOLVED: eco mode value map is in an appendix not present in source.
  source: 097-8 ECO MODE REQUEST

- id: response_error
  type: enum
  description: Error code pair (ERR1, ERR2) returned in Axh error responses.
  source: "2.4 Error code list"
```

## Variables
```yaml
# No discrete non-action settable parameters beyond those exposed as Actions
# (PICTURE ADJUST targets, VOLUME, LAMP ADJUST, aspect, lens position, etc.).
# Those are modeled as Actions with params above.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (returned after a command). No async event framing described.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on (015): while turning on, no other command accepted."
  - "Power off (016): while turning off (including cooling time), no other command accepted."
  - "Lens control (053): after continuous drive (7Fh/81h), must send 00h to stop."
  - "Error code 02h 0Dh: command rejected because power is off."
  - "Error code 02h 0Fh: no authority for the operation."
# No explicit power-on sequencing procedure or interlock wiring described beyond
# the command-acceptance windows above.
```

## Notes
- Manual revision: BDT140013 Revision 7.1.
- Checksum (CKS): sum all preceding bytes, take low-order one byte. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- Framing: commands use leading opcode bytes (00h-03h for requests/sets, 02h for direct exec), responses use 2xh (success) / Axh (error). DATA length is given in LEN byte.
- Serial: RS-232C cross cable, PC CONTROL D-SUB 9P. Pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: TCP port 7142 (wired RJ-45 10/100 Mbps auto-negotiating, plus optional wireless LAN unit).
- Lamp 2 (DATA01=01h) valid only on two-lamp projector models.
- Usage times (lamp/filter) update at one-minute intervals though resolution is one-second.
- Lamp remaining life returns negative if replacement deadline is exceeded.
- Several value maps (input terminal, aspect, eco mode, sub input, base model type) are referenced to a "Supplementary Information by Command" appendix that is not present in this refined source document.

<!-- UNRESOLVED: input terminal DATA01 value map (appendix not in source) -->
<!-- UNRESOLVED: aspect DATA01 value map (appendix not in source) -->
<!-- UNRESOLVED: eco mode DATA01 value map (appendix not in source) -->
<!-- UNRESOLVED: PIP sub input setting value map (appendix not in source) -->
<!-- UNRESOLVED: base model type value map (appendix not in source) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: response timing / inter-command delay limits not stated -->
<!-- UNRESOLVED: ID2 model code value for LED FC012I not stated (varies by model) -->
````

Spec ready. 53 actions = full source command list. RS-232 + TCP, port 7142 verbatim, baud list verbatim, no invented values. Unresolved markers on all 5 appendix-referenced value maps (input/aspect/eco/sub-input/base-model) + firmware/protocol versions.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:56:22.556Z
last_checked_at: 2026-06-18T08:03:40.718Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:03:40.718Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal DATA01 value map (referenced to \"Supplementary Information by Command\" appendix not present in source); eco mode DATA01 value map (appendix reference); sub input setting value map (appendix reference); aspect value map (appendix reference); base model type values (appendix reference)"
- "full DATA01 input terminal value map is in an appendix not present in source."
- "aspect value map is in an appendix not present in source."
- "eco mode value map is in an appendix not present in source."
- "sub input setting value map is in an appendix not present in source."
- "base model type value map is in an appendix not present in source."
- "source documents no unsolicited notifications. All responses are"
- "source documents no explicit multi-step command sequences."
- "input terminal DATA01 value map (appendix not in source)"
- "aspect DATA01 value map (appendix not in source)"
- "eco mode DATA01 value map (appendix not in source)"
- "PIP sub input setting value map (appendix not in source)"
- "base model type value map (appendix not in source)"
- "firmware version compatibility not stated in source"
- "protocol version number not stated in source"
- "response timing / inter-command delay limits not stated"
- "ID2 model code value for LED FC012I not stated (varies by model)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
