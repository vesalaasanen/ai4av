---
spec_id: admin/sharpnec-un552v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC UN552V Control Spec"
manufacturer: Sharp/NEC
model_family: UN552V
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - UN552V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:19:57.642Z
last_checked_at: 2026-06-18T09:12:58.335Z
generated_at: 2026-06-18T09:12:58.335Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc titled \"Projector Control\" but applied to UN552V display; lens/shutter/lamp commands may not all apply to this model. Firmware version compatibility not stated. Input terminal value table (DATA01 of cmd 018, 319-10) referenced in \"Appendix: Supplementary Information by Command\" which is not present in the refined source."
  - "flow control not stated (RTS/CTS pins wired per pin table but mode not documented)"
  - "appendix-referenced enum ranges (input terminal, eco mode,"
  - "no explicit safety interlock procedures or power-on sequencing"
  - "ID2 model code value for UN552V not stated."
  - "input terminal / aspect / eco-mode / sub-input enum value tables live in an Appendix not present in the refined source."
  - "default baud rate among the 5 supported values (115200/38400/19200/9600/4800) not stated."
  - "serial flow control mode not stated despite RTS/CTS pins wired in the D-SUB 9P table."
  - "firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:12:58.335Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC UN552V Control Spec

## Summary
Sharp/NEC UN552V display controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP). Binary command protocol: each frame carries header bytes, control/model ID, length, optional data bytes, and a checksum byte. This spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: source doc titled "Projector Control" but applied to UN552V display; lens/shutter/lamp commands may not all apply to this model. Firmware version compatibility not stated. Input terminal value table (DATA01 of cmd 018, 319-10) referenced in "Appendix: Supplementary Information by Command" which is not present in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins wired per pin table but mode not documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable     # inferred: many *REQUEST commands return state
  - levelable     # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable      # inferred: 018 INPUT SW CHANGE, 098-198 PIP/PbP sub-input routing
```

## Actions
```yaml
# All command payloads verbatim from source (hex). <ID1>, <ID2>, <CKS>, DATA??
# are parameter placeholders per source §2.1/§2.2. Checksum = low byte of sum of
# all preceding bytes (source §2.2).

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command accepted.

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off incl. cooling time, no other command accepted.

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte. Source example: 06h = video port. Full value table in Appendix 'Supplementary Information by Command' (not in refined source)."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared by input/video switch.

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Cleared by input/video switch or volume adjustment.

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Cleared by input/video switch.

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: integer
      description: Adjustment value, low-order 8 bits.
    - name: data04
      type: integer
      description: Adjustment value, high-order 8 bits.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: integer
      description: Adjustment value, low-order 8 bits.
    - name: data03
      type: integer
      description: Adjustment value, high-order 8 bits.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value (full value table in Appendix 'Supplementary Information by Command' - not in refined source)."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST (only target listed)."
    - name: data02
      type: integer
      description: "Sub-target; FFh pairs with 96h per source table."
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: integer
      description: Adjustment value, low-order 8 bits.
    - name: data05
      type: integer
      description: Adjustment value, high-order 8 bits.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp/filter usage time (sec).

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time + filter alarm start time (sec). "-1" if undefined.

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)."
    - name: data02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). See source key-code list: e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis. Source lists 06h=Periphery Focus."
    - name: data02
      type: integer
      description: "Content/motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.
  notes: After 7Fh/81h, send 00h to stop.

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens axis (same as cmd 053 DATA01).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "FFh=Stop (skips mode/value)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: integer
      description: Adjustment value, low-order 8 bits.
    - name: data04
      type: integer
      description: Adjustment value, high-order 8 bits.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.
  notes: Acts on profile selected by cmd 053-10.

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: integer
      description: "Setting: 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns per-axis motion status bitmap (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V).

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile: 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound-function flag, profile number.

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power process flags, operation status.

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco-mode value (full value table in Appendix 'Supplementary Information by Command' - not in refined source)."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name, up to 16 bytes (NUL-terminated).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: integer
      description: "Setting value - MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT. SUB INPUT: per Appendix (not in refined source)."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal (full value table in Appendix 'Supplementary Information by Command' - not in refined source)."
    - name: data02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: integer
      description: Checksum, low byte of sum of all preceding bytes.
```

## Feedbacks
```yaml
# Response frame format per source §2.3:
#   Success (no data): <20..2x h> <cmd> <ID1> <ID2> <LEN=00h> <CKS>
#   Success (with data): <20..2x h> <cmd> <ID1> <ID2> <LEN> <DATA??..> <CKS>
#   Failure:            <A0..A3 h> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 codes per source §2.4 (selected):
#   00h/00h = unrecognized command
#   00h/01h = not supported by model
#   01h/00h = invalid value
#   01h/01h = invalid input terminal
#   02h/0Dh = power off, command not accepted
#   02h/0Eh = execution failed
#   02h/0Fh = no authority
#   03h/02h = adjustment failed

- id: error_status_response
  type: bitmap
  description: 12-byte error info returned by cmd 009 (bit=1 → error).

- id: running_status_response
  type: structured
  description: Power status, cooling/power process flags, operation status (cmd 078-2).

- id: input_status_response
  type: structured
  description: Signal switch process, signal list number, selection signal type (cmd 078-3).

- id: mute_status_response
  type: structured
  description: Picture/Sound/Onscreen/Forced-onscreen mute + OSD display flags (cmd 078-4).

- id: execution_result
  type: enum
  values: [success, error]
  description: 0000h = success; other = error (returned by 030-1/030-2/030-12/030-15/319-10).
```

## Variables
```yaml
# Discrete settable parameters not already modeled as Actions are absent;
# all settable state in source is driven through Actions above.
# UNRESOLVED: appendix-referenced enum ranges (input terminal, eco mode,
# aspect, sub-input) not present in refined source.
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are solicited
# by commands (§2.3).
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off          # source: during power-off incl. cooling, no other command accepted
  - shutter_close      # obscures output
interlocks:
  - "Power ON/OFF: no other command accepted while power transition in progress (incl. cooling)."
  - "Forced onscreen mute (ERR 02h/04h) can block command execution."
  - "Interlock switch open → extended error status DATA09 Bit1 (cmd 009)."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements stated in source beyond the command-acceptance notes above.
```

## Notes
- Binary protocol, little-endian byte order for 16-bit values (low byte first).
- Checksum = low-order byte of sum of all preceding frame bytes (source §2.2 worked example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`).
- ID1 = control ID set on projector; ID2 = model code (model-specific, not enumerated in refined source).
- Response success/failure is encoded by the high nibble of the first response byte: `2xh` = success, `Axh` = error (per §2.3 example and §3.x response templates).
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Source is the generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Some commands (lens shift, shutter, lamp 2, two-lamp models) may not apply to the UN552V display.

<!-- UNRESOLVED: ID2 model code value for UN552V not stated. -->
<!-- UNRESOLVED: input terminal / aspect / eco-mode / sub-input enum value tables live in an Appendix not present in the refined source. -->
<!-- UNRESOLVED: default baud rate among the 5 supported values (115200/38400/19200/9600/4800) not stated. -->
<!-- UNRESOLVED: serial flow control mode not stated despite RTS/CTS pins wired in the D-SUB 9P table. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:19:57.642Z
last_checked_at: 2026-06-18T09:12:58.335Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:12:58.335Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc titled \"Projector Control\" but applied to UN552V display; lens/shutter/lamp commands may not all apply to this model. Firmware version compatibility not stated. Input terminal value table (DATA01 of cmd 018, 319-10) referenced in \"Appendix: Supplementary Information by Command\" which is not present in the refined source."
- "flow control not stated (RTS/CTS pins wired per pin table but mode not documented)"
- "appendix-referenced enum ranges (input terminal, eco mode,"
- "no explicit safety interlock procedures or power-on sequencing"
- "ID2 model code value for UN552V not stated."
- "input terminal / aspect / eco-mode / sub-input enum value tables live in an Appendix not present in the refined source."
- "default baud rate among the 5 supported values (115200/38400/19200/9600/4800) not stated."
- "serial flow control mode not stated despite RTS/CTS pins wired in the D-SUB 9P table."
- "firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
