---
spec_id: admin/sharp-nec-ea271u-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EA271U Control Spec"
manufacturer: Sharp/NEC
model_family: "EA271U Bk Sv"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA271U Bk Sv"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:11:14.256Z
last_checked_at: 2026-06-17T19:56:56.520Z
generated_at: 2026-06-17T19:56:56.520Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device/source mismatch — source is a projector manual, device"
  - "source lists \"Full duplex\" communication mode but no explicit flow-control setting; RTS/CTS pins are wired in the D-SUB 9P pinout"
  - "full response-payload decoding not exhaustively enumerated; see source for each query's DATA layout."
  - "no event/notification mechanism stated."
  - "no macros described."
  - "SOURCE/DEVICE MISMATCH — declared device \"EA271U Bk Sv\" is a"
  - "firmware version compatibility not stated in source."
  - "full enum value lists for input terminal, aspect, eco mode, and"
  - "serial flow_control not explicitly stated (RTS/CTS pins wired)."
  - "wireless LAN transport details not specified in this document."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:56:56.520Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source commands; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC EA271U Control Spec

## Summary
<!-- CRITICAL MISMATCH: The declared device name "EA271U Bk Sv" is a desktop
     monitor, but the supplied source document is the NEC "Projector Control
     Command Reference Manual" (BDT140013 Rev 7.1). The source never mentions
     the EA271U. It describes a generic NEC projector command set (lamp, lens,
     shutter, eco/lamp modes, edge blending). Treat the action/feedback content
     below as projector-protocol data, NOT verified coverage of the EA271U
     monitor. Source/device pairing is UNRESOLVED and likely wrong. -->
Spec covers the RS-232C + TCP (LAN) command protocol documented in the
supplied NEC projector command reference. Transport is a binary hex frame
protocol with checksums, usable over both serial (PC CONTROL D-SUB 9P) and
wired/wireless LAN (TCP port 7142).

<!-- UNRESOLVED: device/source mismatch — source is a projector manual, device
     is a monitor. No model-specific confirmation of EA271U support in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# Wireless LAN also referenced in source but its transport details are deferred
# to "the operation manual of the wireless LAN unit" - not specified here.
addressing:
  port: 7142  # TCP port stated by source for sending/receiving commands
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source lists "Full duplex" communication mode but no explicit flow-control setting; RTS/CTS pins are wired in the D-SUB 9P pinout
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON / POWER OFF commands present
  - queryable  # inferred: extensive status/information request commands present
  - routable  # inferred: INPUT SW CHANGE command present
  - levelable  # inferred: VOLUME ADJUST / PICTURE ADJUST commands present
```

## Actions
```yaml
# Binary hex frame protocol. Each command shows the literal payload verbatim
# from the source, followed by ID1/ID2 and any DATA bytes, then checksum (CKS).
# CKS is computed as the low-order byte of the sum of all preceding bytes
# (see source §2.2). Parameterized commands show <DATAxx> placeholders.
# Response formats:
#   2xh ack = success (x mirrors command's high byte), Axh = error with ERR1/ERR2.

# === 009. ERROR STATUS REQUEST ===
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# === 015. POWER ON ===
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# === 016. POWER OFF ===
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# === 018. INPUT SW CHANGE ===
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (DATA01). e.g. 06h = video port. Full value list is in source Appendix 'Supplementary Information by Command' (not included in refined text)."

# === 020. PICTURE MUTE ON ===
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# === 021. PICTURE MUTE OFF ===
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# === 022. SOUND MUTE ON ===
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# === 023. SOUND MUTE OFF ===
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# === 024. ONSCREEN MUTE ON ===
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# === 025. ONSCREEN MUTE OFF ===
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# === 030-1. PICTURE ADJUST ===
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target (DATA01): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA02): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "Adjustment value 16-bit little-endian (DATA03 low, DATA04 high)"

# === 030-2. VOLUME ADJUST ===
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      description: "Adjustment mode (DATA01): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "Volume value 16-bit little-endian (DATA02 low, DATA03 high)"

# === 030-12. ASPECT ADJUST ===
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect_value
      type: integer
      description: "Aspect value (DATA01); full value list in source Appendix (not in refined text)"

# === 030-15. OTHER ADJUST ===
- id: other_adjust
  label: Other Adjust (Lamp/Light Gain)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "16-bit little-endian (DATA04 low, DATA05 high)"

# === 037. INFORMATION REQUEST ===
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# === 037-3. FILTER USAGE INFORMATION REQUEST ===
- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# === 037-4. LAMP INFORMATION REQUEST 3 ===
- id: lamp_info_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: enum
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: "DATA02: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

# === 037-6. CARBON SAVINGS INFORMATION REQUEST ===
- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: enum
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# === 050. REMOTE KEY CODE ===
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD), DATA01 low / DATA02 high. Key list (source §3.19): 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

# === 051. SHUTTER CLOSE ===
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# === 052. SHUTTER OPEN ===
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# === 053. LENS CONTROL ===
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 06h=Periphery Focus (source table header)"
    - name: motion
      type: enum
      description: "DATA02: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus (continuous), 81h=minus (continuous), FDh=-0.25s, FEh=-0.5s, FFh=-1s"

# === 053-1. LENS CONTROL REQUEST ===
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target identifier (DATA01)"

# === 053-2. LENS CONTROL 2 ===
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01: FFh=Stop (mode/value ignored)"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA02): 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "16-bit little-endian (DATA03 low, DATA04 high)"

# === 053-3. LENS MEMORY CONTROL ===
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

# === 053-4. REFERENCE LENS MEMORY CONTROL ===
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (controls profile selected by 053-10)"

# === 053-5. LENS MEMORY OPTION REQUEST ===
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# === 053-6. LENS MEMORY OPTION SET ===
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "DATA02: 00h=OFF, 01h=ON"

# === 053-7. LENS INFORMATION REQUEST ===
- id: lens_info_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# === 053-10. LENS PROFILE SET ===
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

# === 053-11. LENS PROFILE REQUEST ===
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# === 060-1. GAIN PARAMETER REQUEST 3 ===
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: enum
      description: "DATA01: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

# === 078-1. SETTING REQUEST ===
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# === 078-2. RUNNING STATUS REQUEST ===
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# === 078-3. INPUT STATUS REQUEST ===
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# === 078-4. MUTE STATUS REQUEST ===
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# === 078-5. MODEL NAME REQUEST ===
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# === 078-6. COVER STATUS REQUEST ===
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# === 079. FREEZE CONTROL ===
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      description: "DATA01: 01h=freeze ON, 02h=freeze OFF"

# === 084. INFORMATION STRING REQUEST ===
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: type
      type: enum
      description: "DATA01: 03h=horizontal sync frequency, 04h=vertical sync frequency"

# === 097-8. ECO MODE REQUEST ===
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# === 097-45. LAN PROJECTOR NAME REQUEST ===
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# === 097-155. LAN MAC ADDRESS STATUS REQUEST2 ===
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# === 097-198. PIP/PICTURE BY PICTURE REQUEST ===
- id: pip_pbypicture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# === 097-243-1. EDGE BLENDING MODE REQUEST ===
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# === 098-8. ECO MODE SET ===
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: eco_mode_value
      type: integer
      description: "Eco mode value (DATA01); full value list in source Appendix (not in refined text)"

# === 098-45. LAN PROJECTOR NAME SET ===
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> ... <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16)"

# === 098-198. PIP/PICTURE BY PICTURE SET ===
- id: pip_pbypicture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (DATA02); e.g. MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00-03h corners. Sub-input values in Appendix."

# === 098-243-1. EDGE BLENDING MODE SET ===
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: enum
      description: "DATA01: 00h=OFF, 01h=ON"

# === 305-1. BASE MODEL TYPE REQUEST ===
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# === 305-2. SERIAL NUMBER REQUEST ===
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# === 305-3. BASIC INFORMATION REQUEST ===
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# === 319-10. AUDIO SELECT SET ===
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (DATA01); values in source Appendix"
    - name: setting_value
      type: enum
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Binary responses: 2xh prefix = success ack (echoes command high byte), with
# optional DATA block; Axh prefix = error, carrying ERR1/ERR2 + CKS.
- id: command_ack
  type: raw
  description: "Success acknowledgement frame: 2xh <ID1> <ID2> <LEN> [<DATA...>] <CKS>"
- id: command_error
  type: raw
  description: "Error frame: Axh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 code table in source §2.4 (e.g. 00h/00h=unrecognized, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Fh=no authority)."
- id: error_status_bits
  type: raw
  description: "009 response DATA01-DATA12 bitfield error flags (cover/fan/temp/lamp/mirror-cover/interlock/system errors)."
- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "From 078-2 DATA03/DATA06 and 305-3 DATA01."
- id: mute_status
  type: enum
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]
  description: "From 078-4 DATA01-DATA04."
# UNRESOLVED: full response-payload decoding not exhaustively enumerated; see source for each query's DATA layout.
```

## Variables
```yaml
# Settable parameters surfaced via dedicated commands (also represented as actions above):
- id: brightness
  description: "PICTURE ADJUST target 00h"
- id: contrast
  description: "PICTURE ADJUST target 01h"
- id: color
  description: "PICTURE ADJUST target 02h"
- id: hue
  description: "PICTURE ADJUST target 03h"
- id: sharpness
  description: "PICTURE ADJUST target 04h"
- id: volume
  description: "VOLUME ADJUST (030-2)"
- id: lamp_light_adjust
  description: "OTHER ADJUST target 96h/FFh (030-15)"
- id: eco_mode
  description: "ECO MODE SET (098-8)"
- id: lan_projector_name
  description: "LAN PROJECTOR NAME SET (098-45), up to 16 bytes"
- id: edge_blending_mode
  description: "EDGE BLENDING MODE SET (098-243-1)"
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: no event/notification mechanism stated.
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
# UNRESOLVED: no macros described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
#  - POWER ON: while powering on, no other command accepted (3.2).
#  - POWER OFF: while powering off (incl. cooling time), no other command accepted (3.3).
#  - LENS CONTROL (053): continuous-drive values (7Fh/81h) must be stopped by sending 00h afterwards.
# No explicit safety interlock procedures or power-on sequencing requirements stated.
```

## Notes
- Frame format (source §2.1): commands/responses are hex byte strings within a
  frame; parameters shown as `<ID1> <ID2> <DATAxx> <CKS>`.
- Checksum (CKS): low-order one byte of the sum of all preceding bytes.
- Common params: ID1 = projector control ID; ID2 = model code (varies by model);
  LEN = data length of trailing DATA block; DATA?? = variable-length data.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pinout in
  source §1.1); RTS/CTS and TxD/RxD crossed, GND common.
- LAN: wired RJ-45 (10/100 auto) and optional wireless LAN unit. TCP port 7142
  for command send/receive.

<!-- UNRESOLVED: SOURCE/DEVICE MISMATCH — declared device "EA271U Bk Sv" is a
     desktop monitor; source is the NEC Projector Control Command Reference
     (BDT140013 Rev 7.1) with no mention of EA271U. Action/feedback content is
     projector protocol data, not verified EA271U coverage. Re-verify source
     attribution before promoting this spec. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full enum value lists for input terminal, aspect, eco mode, and
     sub-input values live in source Appendix "Supplementary Information by
     Command", which was not present in the refined text. -->
<!-- UNRESOLVED: serial flow_control not explicitly stated (RTS/CTS pins wired). -->
<!-- UNRESOLVED: wireless LAN transport details not specified in this document. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:11:14.256Z
last_checked_at: 2026-06-17T19:56:56.520Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:56:56.520Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source commands; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device/source mismatch — source is a projector manual, device"
- "source lists \"Full duplex\" communication mode but no explicit flow-control setting; RTS/CTS pins are wired in the D-SUB 9P pinout"
- "full response-payload decoding not exhaustively enumerated; see source for each query's DATA layout."
- "no event/notification mechanism stated."
- "no macros described."
- "SOURCE/DEVICE MISMATCH — declared device \"EA271U Bk Sv\" is a"
- "firmware version compatibility not stated in source."
- "full enum value lists for input terminal, aspect, eco mode, and"
- "serial flow_control not explicitly stated (RTS/CTS pins wired)."
- "wireless LAN transport details not specified in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
