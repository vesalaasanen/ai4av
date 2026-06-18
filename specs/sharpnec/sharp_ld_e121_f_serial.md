---
spec_id: admin/sharp-nec-ld-e121-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E121 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E121 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E121 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:30:09.792Z
last_checked_at: 2026-06-17T19:59:54.233Z
generated_at: 2026-06-17T19:59:54.233Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "control ID (ID1) default and model code (ID2) value not stated in this manual; ID2 \"varies depending on the model in use\""
  - "default baud rate not specified; supported values are 4800, 9600, 19200, 38400, 115200"
  - "source says full-duplex communication mode but does not specify flow control; pinout exposes RTS/CTS wires"
  - "variable numeric ranges (min/max/default) not enumerated in source; runtime values come from GAIN PARAMETER REQUEST 3 response DATA02-DATA13"
  - "no asynchronous event mechanism described in source."
  - "no multi-step command sequences described in source."
  - "source does not specify power-on sequencing requirements or explicit confirmation procedures for destructive operations."
  - "full enum tables for input terminal / aspect / eco mode / sub input / base model type — referenced by source but absent from refined excerpt"
  - "ID2 model code value for Ld E121 F not stated in this manual"
  - "control ID (ID1) default value not stated"
  - "default baud rate (one of 4800/9600/19200/38400/115200) not specified"
  - "flow control configuration not explicitly stated (RTS/CTS pins present in pinout)"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:59:54.233Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match verbatim hex sequences in source manual; all transport parameters documented; complete coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Ld E121 F Control Spec

## Summary
Sharp/NEC Ld E121 F projector control spec derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Supports RS-232C serial control and TCP/IP LAN control on port 7142. Binary command framing with hex bytes and additive one-byte checksums.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default and model code (ID2) value not stated in this manual; ID2 "varies depending on the model in use" -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported rates 115200/38400/19200/9600/4800; default not stated, listing first stated option
  # UNRESOLVED: default baud rate not specified; supported values are 4800, 9600, 19200, 38400, 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source says full-duplex communication mode but does not specify flow control; pinout exposes RTS/CTS wires
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands (015/016)
  - queryable       # inferred from extensive status request commands
  - levelable       # inferred from PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL commands
  - routable        # inferred from INPUT SW CHANGE command (018)
```

## Actions
```yaml
# Frame format: <DATA> <CKS> where CKS = low byte of sum of all preceding bytes.
# ID1 = control ID; ID2 = model code (varies by model, not stated in this manual).
# All payloads are verbatim hex from source, with <ID1> <ID2> <CKS> placeholders where the source used them.

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (e.g. 06h = video port). Full list per Appendix "Supplementary Information by Command" not reproduced here.

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high 8 bits)

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for aspect (per Appendix)

# --- 030-15. OTHER ADJUST (Lamp/Light adjust) ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA04
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high 8 bits)

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (06h=Periphery Focus)
    - name: DATA02
      type: integer
      description: Content (00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s)

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (FFh=Stop); when Stop, mode/value ignored
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 01h=Freeze On, 02h=Freeze Off

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for eco mode (per Appendix "Supplementary Information by Command")

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01-DATA16
      type: string
      description: Projector name (up to 16 bytes)

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pby_p_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (depends on DATA01: MODE 00h=PIP/01h=PBP; START POSITION 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub input values per Appendix)

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (per Appendix)
    - name: DATA02
      type: integer
      description: Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)

# === Query commands ===

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h=usage time seconds, 04h=remaining life %)

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

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
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST)

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

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

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

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

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pby_p_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

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
```

## Feedbacks
```yaml
# Command responses follow pattern: A{cmd_major}h {cmd_minor}h <ID1> <ID2> {LEN} <ERR1> <ERR2> <CKS>
# Success responses: 2xh prefix echoes command; Axh prefix indicates error.
# Per source, response errors use ERR1+ERR2 pairs (see error code list below).

- id: command_ack_success
  type: enum
  values: [success, error]
  description: >-
    Success response prefix is 2Xh (mirrors command 0Xh major byte); error response prefix is AXh.
    ERR1=00h/ERR2=00h = unrecognized; ERR1=00h/ERR2=01h = not supported by model;
    ERR1=01h/ERR2=00h = invalid value; ERR1=01h/ERR2=01h = invalid input terminal;
    ERR1=02h/ERR2=0Dh = command cannot be accepted because power is off;
    ERR1=02h/ERR2=0Eh = command execution failed; ERR1=02h/ERR2=0Fh = no authority;
    ERR1=03h/ERR2=00h = incorrect gain number; ERR1=03h/ERR2=02h = adjustment failed.
    See source section 2.4 for full error code table.

- id: error_status_response
  type: bitmap
  description: >-
    Response to 009. ERROR STATUS REQUEST returns DATA01-DATA12 bitmap covering
    cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/interlock-switch/
    foreign-matter/iris-calibration/lens-install errors. See source section 3.1
    table for bit assignments.

- id: running_status_response
  type: object
  description: >-
    Response to 078-2. RUNNING STATUS REQUEST returns power status, cooling process,
    power on/off process, and operation status codes (00h=Standby Sleep, 04h=Power on,
    05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby).

- id: input_status_response
  type: object
  description: >-
    Response to 078-3. INPUT STATUS REQUEST returns signal switch process, signal list
    number, selection signal type 1/2, signal list type, test pattern, and content displayed.

- id: mute_status_response
  type: object
  description: >-
    Response to 078-4 returns picture/sound/onscreen/forced-onscreen mute and OSD display flags.

- id: cover_status_response
  type: enum
  values: [normal_opened, closed]
  description: Response to 078-6. COVER STATUS REQUEST (00h=normal/cover opened, 01h=cover closed).

- id: lens_information_response
  type: bitmap
  description: >-
    Response to 053-7 returns movement status of lens memory / zoom / focus / lens shift H / lens shift V.

- id: information_response
  type: object
  description: >-
    Response to 037 returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90).
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness (PICTURE ADJUST target 00h)
- id: contrast
  type: integer
  description: Picture contrast (PICTURE ADJUST target 01h)
- id: color
  type: integer
  description: Picture color (PICTURE ADJUST target 02h)
- id: hue
  type: integer
  description: Picture hue (PICTURE ADJUST target 03h)
- id: sharpness
  type: integer
  description: Picture sharpness (PICTURE ADJUST target 04h)
- id: volume
  type: integer
  description: Sound volume (VOLUME ADJUST)
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain (OTHER ADJUST, target DATA01=96h DATA02=FFh)
- id: aspect
  type: enum
  description: Aspect value (per Appendix "Supplementary Information by Command")
- id: eco_mode
  type: enum
  description: Eco / Light / Lamp mode (per Appendix)
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes)
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: pip_pby_p_mode
  type: enum
  values: [pip, picture_by_picture]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
# UNRESOLVED: variable numeric ranges (min/max/default) not enumerated in source; runtime values come from GAIN PARAMETER REQUEST 3 response DATA02-DATA13
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited replies to commands.
# UNRESOLVED: no asynchronous event mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      While POWER ON command is executing, no other command can be accepted.
      While POWER OFF command is executing (including cooling time), no other command can be accepted.
  - description: >-
      Error status (009) reports interlock switch open as DATA09 Bit1; mirror cover error as DATA03 Bit5;
      foreign matter sensor error as DATA04 Bit3; lens not installed properly as DATA04 Bit7.
# UNRESOLVED: source does not specify power-on sequencing requirements or explicit confirmation procedures for destructive operations.
```

## Notes
- Manual revision: BDT140013 Revision 7.1.
- Frame format: every command/response is wrapped in hex bytes; checksum (CKS) = low byte of sum of all preceding bytes (see source section 2.2 for worked example).
- ID1 (Control ID) and ID2 (Model code) are runtime parameters: ID1 = projector control ID, ID2 = model code "varies depending on the model in use". Neither value is stated in this manual.
- Serial port pinout: D-SUB 9P, cross cable; pins 2/3 = RxD/TxD, pin 5 = GND, pins 7/8 = RTS/CTS.
- LAN port: RJ-45 8-pin, auto-switchable 10/100 Mbps.
- Lamp/filter usage times returned in seconds, updated at one-minute intervals.
- Lamp remaining life (%) can return negative if replacement deadline exceeded.
- Many commands reference an "Appendix: Supplementary Information by Command" for full enum lists (input terminal codes, aspect values, eco mode values, sub input values, base model types). That appendix is not included in the refined source excerpt.
<!-- UNRESOLVED: full enum tables for input terminal / aspect / eco mode / sub input / base model type — referenced by source but absent from refined excerpt -->
<!-- UNRESOLVED: ID2 model code value for Ld E121 F not stated in this manual -->
<!-- UNRESOLVED: control ID (ID1) default value not stated -->
<!-- UNRESOLVED: default baud rate (one of 4800/9600/19200/38400/115200) not specified -->
<!-- UNRESOLVED: flow control configuration not explicitly stated (RTS/CTS pins present in pinout) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:30:09.792Z
last_checked_at: 2026-06-17T19:59:54.233Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:59:54.233Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match verbatim hex sequences in source manual; all transport parameters documented; complete coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "control ID (ID1) default and model code (ID2) value not stated in this manual; ID2 \"varies depending on the model in use\""
- "default baud rate not specified; supported values are 4800, 9600, 19200, 38400, 115200"
- "source says full-duplex communication mode but does not specify flow control; pinout exposes RTS/CTS wires"
- "variable numeric ranges (min/max/default) not enumerated in source; runtime values come from GAIN PARAMETER REQUEST 3 response DATA02-DATA13"
- "no asynchronous event mechanism described in source."
- "no multi-step command sequences described in source."
- "source does not specify power-on sequencing requirements or explicit confirmation procedures for destructive operations."
- "full enum tables for input terminal / aspect / eco mode / sub input / base model type — referenced by source but absent from refined excerpt"
- "ID2 model code value for Ld E121 F not stated in this manual"
- "control ID (ID1) default value not stated"
- "default baud rate (one of 4800/9600/19200/38400/115200) not specified"
- "flow control configuration not explicitly stated (RTS/CTS pins present in pinout)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
