---
spec_id: admin/sharp-nec-pa302w-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA302W BK Control Spec"
manufacturer: Sharp/NEC
model_family: "PA302W BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "PA302W BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:49:48.918Z
last_checked_at: 2026-06-18T09:16:04.731Z
generated_at: 2026-06-18T09:16:04.731Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"PA302W BK\" inferred from input device name; source document is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not name a specific model."
  - "input terminal values (Appendix \"Supplementary Information by Command\") not present in source excerpt."
  - "aspect values, eco mode values, sub-input values not present in source excerpt (referenced Appendix absent)."
  - "flow control not stated in source; source states \"Full duplex\" communication mode only"
  - "source does not separately document persistent settable variables"
  - "source does not document any unsolicited notifications; all"
  - "source does not describe explicit multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version not stated."
  - "flow_control not stated in source."
  - "control ID (ID1) and model code (ID2) per-device values not stated."
  - "Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) absent from source excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:16:04.731Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have verbatim hex command frames confirmed in source; transport port 7142 and baud rates confirmed; source catalogue exhausted by the spec. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA302W BK Control Spec

## Summary
Sharp/NEC PA302W BK projector control spec. Covers both RS-232C serial (PC CONTROL D-SUB 9P, cross cable) and LAN (wired/wireless) control. Binary hex command protocol with checksummed frames.

<!-- UNRESOLVED: model name "PA302W BK" inferred from input device name; source document is generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) and does not name a specific model. -->
<!-- UNRESOLVED: input terminal values (Appendix "Supplementary Information by Command") not present in source excerpt. -->
<!-- UNRESOLVED: aspect values, eco mode values, sub-input values not present in source excerpt (referenced Appendix absent). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; source states "Full duplex" communication mode only
addressing:
  port: 7142  # TCP port for command send/receive over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    # inferred: POWER ON / POWER OFF commands present
# - queryable    # inferred: many *REQUEST commands returning state present
# - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST present
```

## Actions
```yaml
# Protocol framing: command frames are hex byte sequences. Common params:
#   ID1 = control ID, ID2 = model code, CKS = checksum (low byte of sum of all
#   preceding bytes). LEN = data length following LEN.
# Each action lists the literal command bytes (command template where parameterized).
# ACK/error response frame: A{x}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01..DATA12> <CKS>. DATA01-12 = 12 bytes of bit-packed error info (see source error list)."

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command accepted."

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling), no other command accepted."

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal value (see Appendix in source). Example 06h = video port."
  notes: "Example: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means error (no signal switch)."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video signal switch."

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared on input/video switch or volume adjust."

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared on input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02..DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "Adjustment value low byte."
    - name: value_high
      type: integer
      description: "Adjustment value high byte."
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; 0000h=ok else error."

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01..DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "Adjustment value low byte."
    - name: value_high
      type: integer
      description: "Adjustment value high byte."
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: value
      type: integer
      description: "Aspect value (see Appendix in source)."

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01..DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST."
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "Adjustment value low byte."
    - name: value_high
      type: integer
      description: "Adjustment value high byte."

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: 23h 8Ah <ID1> <ID2> 62h <DATA01..DATA98> <CKS>. DATA01-49=projector name, DATA83-86=lamp usage time (sec), DATA87-90=filter usage time (sec)."

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04=filter usage time (sec), DATA05-08=filter alarm start time (sec). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (only two-lamp models)."
    - name: content
      type: integer
      description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)."
  notes: "Example lamp usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Response DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_low
      type: integer
      description: "Key code low byte. See key code list."
    - name: key_high
      type: integer
      description: "Key code high byte."
  notes: "Example AUTO (key 5): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means error. Key list includes POWER ON(02h,00h), POWER OFF(03h,00h), AUTO, MENU, UP, DOWN, RIGHT, LEFT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO (see source table)."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus. Other target values referenced in source for this family."
    - name: action
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
  notes: "Send 00h to stop after continuous drive. Response DATA01=FFh means error."

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens adjustment target identifier."
  notes: "Response DATA02-07 = upper/lower/current value (16-bit LE)."

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01..DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "FFh=Stop; other values select axis."
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative."
    - name: value_low
      type: integer
      description: "Adjustment value low byte."
    - name: value_high
      type: integer
      description: "Adjustment value high byte."
  notes: "If DATA01=FFh (Stop), mode/value ignored."

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Controls profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON."

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bit field: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA02-13 = upper/lower/default/current/wide/narrow adjustment bounds."

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03=base model type, DATA04=sound function, DATA05=profile number."

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03=power status (00h=Standby, 01h=Power on, FFh=unsupported), DATA04=cooling, DATA05=power process, DATA06=operation status (00h=Standby/Sleep, 04h=Power on, 05h=Cooling, 06h=Standby/error, 0Fh=Standby/Power saving, 10h=Network standby)."

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response DATA01=signal switch process, DATA02=signal list number (-1 of practical), DATA03/04=signal type, DATA05=list type, DATA06=test pattern, DATA09=content displayed."

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display. 00h=Off, 01h=On."

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32=model name (NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off."

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency."
  notes: "Response DATA03+ = NUL-terminated label/info string."

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light/Lamp mode value (see Appendix in source)."

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17=projector name (NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 = 6-byte MAC address."

- id: pip_pbp_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "Eco/Light/Lamp mode value (see Appendix in source)."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01..DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes."

- id: pip_pbp_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: value
      type: integer
      description: "MODE: 00h=PIP, 01h=PBP. START POS: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02=base model type, DATA03-11=model name (NUL-terminated), DATA12-13=base model type."

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16=serial number (NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response DATA01=operation status, DATA02=content displayed, DATA03/04=signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (see Appendix in source)."
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Acknowledgement frame: {A0/A1/A2/A3}h {cmd} <ID1> <ID2> <LEN> [<DATA...>] <CKS>
# Error frame: same prefix with <ERR1> <ERR2> instead of data.
# Error codes (ERR1,ERR2):
#   00h,00h = command not recognized
#   00h,01h = command not supported by model
#   01h,00h = specified value invalid
#   01h,01h = specified input terminal invalid
#   01h,02h = specified language invalid
#   02h,00h = memory allocation error
#   02h,02h = memory in use
#   02h,03h = specified value cannot be set
#   02h,04h = forced onscreen mute on
#   02h,06h = viewer error
#   02h,07h = no signal
#   02h,08h = test pattern/filter displayed
#   02h,09h = no PC card inserted
#   02h,0Ah = memory operation error
#   02h,0Ch = entry list displayed
#   02h,0Dh = command cannot be accepted because power is off
#   02h,0Eh = command execution failed
#   02h,0Fh = no authority for operation
#   03h,00h = specified gain number incorrect
#   03h,01h = specified gain invalid
#   03h,02h = adjustment failed
```

## Variables
```yaml
# UNRESOLVED: source does not separately document persistent settable variables
# outside the Actions above (set commands are listed as actions per coverage rule).
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications; all
# responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source does not describe explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015): no other command accepted while power-on in progress."
  - "Power Off (016): no other command accepted during power-off incl. cooling time."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing beyond the command-acceptance notes above.
```

## Notes
- Binary hex protocol: each command is a byte sequence. `<ID1>` = projector control ID, `<ID2>` = model code. Checksum (`<CKS>`) = low byte of sum of all preceding bytes (incl. command header).
- Source is generic projector command reference (BDT140013 Rev 7.1); model name inferred from input metadata, not from document body.
- Serial cable: D-SUB 9P cross cable. Pin 2/3 = RxD/TxD cross, pin 5 = GND, pin 7/8 = RTS/CTS cross.
- LAN port: RJ-45 8-pin, 10/100 Mbps auto-switchable, IEEE 802.3 / 802.3u.
- Many commands reference an "Appendix: Supplementary Information by Command" for value tables (input terminals, aspect values, eco mode values, sub-input values, base model types) — that appendix is NOT present in the source excerpt and corresponding value enumerations are left UNRESOLVED.

<!-- UNRESOLVED: firmware version not stated. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) per-device values not stated. -->
<!-- UNRESOLVED: Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) absent from source excerpt. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:49:48.918Z
last_checked_at: 2026-06-18T09:16:04.731Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:16:04.731Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have verbatim hex command frames confirmed in source; transport port 7142 and baud rates confirmed; source catalogue exhausted by the spec. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"PA302W BK\" inferred from input device name; source document is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not name a specific model."
- "input terminal values (Appendix \"Supplementary Information by Command\") not present in source excerpt."
- "aspect values, eco mode values, sub-input values not present in source excerpt (referenced Appendix absent)."
- "flow control not stated in source; source states \"Full duplex\" communication mode only"
- "source does not separately document persistent settable variables"
- "source does not document any unsolicited notifications; all"
- "source does not describe explicit multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version not stated."
- "flow_control not stated in source."
- "control ID (ID1) and model code (ID2) per-device values not stated."
- "Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) absent from source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
