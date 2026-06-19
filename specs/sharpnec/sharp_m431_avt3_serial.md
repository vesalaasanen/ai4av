---
spec_id: admin/sharp-nec-m431-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M431 Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "M431 Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M431 Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:20:17.096Z
last_checked_at: 2026-06-18T08:10:02.810Z
generated_at: 2026-06-18T08:10:02.810Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in the refined source and therefore not enumerated."
  - "flow control not stated (RTS/CTS pins wired in cable pinout; \"Communication mode: Full duplex\" stated)"
  - "appendix not in refined source.\""
  - "appendix not in refined source).\""
  - "value list not in refined source).\""
  - "value list in source appendix, not in refined source"
  - "no additional standalone settable parameters documented outside the action set."
  - "source does not document unsolicited notifications; all responses are"
  - "source documents no multi-step command sequences."
  - "no explicit safety/interlock procedure stated in source."
  - "source appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco/light/lamp mode values) is not present in the refined source document and could not be enumerated."
  - "firmware version compatibility not stated."
  - "serial flow_control not stated (full-duplex mode stated; RTS/CTS pins present in pinout)."
  - "ID1 control ID and ID2 model code byte values for this specific model not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:10:02.810Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M431 Avt3 Control Spec

## Summary
Sharp/NEC M431 Avt3 projector control spec covering the binary command protocol (BDT140013 Rev 7.1). Supports both RS-232C serial and TCP (wired/wireless LAN, port 7142) transports. Covers power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/Picture-by-Picture, and a broad set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated; appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in the refined source and therefore not enumerated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated in source
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all stated as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins wired in cable pinout; "Communication mode: Full duplex" stated)
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands
  - queryable    # inferred: large set of status/information request commands
  - levelable    # inferred: volume, brightness, contrast, color, hue, sharpness, lamp/light adjust
  - routable     # inferred: INPUT SW CHANGE (input terminal / entry list switching)
```

## Actions
```yaml
# Frame notes (from source §2.1-2.2):
#  - Commands shown are the payload bytes as written in the source (hex, "NNh").
#  - <ID1> = control ID set on projector; <ID2> = model code (varies by model).
#  - <CKS> = checksum = low-order byte of the sum of all preceding bytes.
#  - Response success begins "2Nh", error begins "ANh" with <ERR1> <ERR2> (see §2.4).
# Parameter ranges inside one command (e.g. each key code, each input value) do NOT
# multiply into separate actions; each numbered source row = one action here.

actions:
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
    notes: Blocks other commands during power-off incl. cooling time.

  # --- 018. INPUT SW CHANGE ---
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h = video). Full value list in source Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in refined source."
    notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response FFh = ended with error (no signal switch)."

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
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value - full list in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in refined source)."

  # --- 030-15. OTHER ADJUST (LAMP / LIGHT ADJUST) ---
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target high byte - 96h pairs with DATA02=FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: integer
        description: "Target low byte (FFh with 96h)"
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 = projector name; DATA83-86 = lamp usage seconds; DATA87-90 = filter usage seconds. Updated at 1-minute intervals."

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 = filter usage seconds; DATA05-08 = filter alarm start seconds (-1 if undefined)."

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: Remaining life negative if replacement deadline exceeded.

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). See key code list."
      - name: data02
        type: integer
        description: "Key code high byte. Documented keys all use 00h."
    notes: "Key code list (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

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
        description: "Target - documented value 06h = Periphery Focus"
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: After 7Fh/81h, send 00h to stop. Same command may be reissued while driving.

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: Target (same target set as LENS CONTROL)
    notes: "Response returns upper/lower limit + current value (16-bit each)."

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target (FFh = Stop; mode/value ignored when Stop)"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile selected via LENS PROFILE SET (053-10).

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bits: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) - 0=Stop, 1=During operation."

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Response returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "DATA01-03 base model type; DATA04 sound function; DATA05 profile/clock/sleep-timer capability."

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (practical = returned + 1), selection signal types, test pattern, content displayed."

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display."

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
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode / Lamp mode value (appendix - UNRESOLVED: value list not in refined source)."

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

  # --- 097-198. PIP / PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: PIP / Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h=OFF, 01h=ON."

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco/Light/Lamp mode value (appendix - UNRESOLVED: value list not in refined source)."

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"

  # --- 098-198. PIP / PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. SUB INPUT: value list in appendix (UNRESOLVED)."

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type (values in appendix - UNRESOLVED)."

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
    notes: "Returns operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status."

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal (value list in appendix - UNRESOLVED)"
      - name: data02
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: 078-2 RUNNING STATUS REQUEST (DATA03, DATA06); 305-3 BASIC INFORMATION REQUEST (DATA01)
  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: 078-4 MUTE STATUS REQUEST (DATA01)
  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: 078-4 (DATA02)
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: 078-4 (DATA03)
  - id: freeze_state
    type: enum
    values: [off, on]
    source: 305-3 BASIC INFORMATION REQUEST (DATA09)
  - id: input_signal_status
    type: object
    source: 078-3 INPUT STATUS REQUEST
  - id: error_status
    type: bitmask
    source: 009 ERROR STATUS REQUEST (DATA01-DATA12)
    notes: "Cover/fan/temp/power/lamp/mirror-cover/interlock/ballast/iris/lens errors (see source error information list)."
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: 037-4 LAMP INFORMATION REQUEST 3
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: 037-4
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: 037-3 FILTER USAGE INFORMATION REQUEST
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source: 078-6 COVER STATUS REQUEST
  - id: eco_mode
    type: enum
    source: 097-8 ECO MODE REQUEST  # UNRESOLVED: value list in source appendix, not in refined source
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: 097-243-1
  - id: command_error
    type: object
    source: error response frame <ERR1> <ERR2> (§2.4 error code list)
```

## Variables
```yaml
# Settable parameters are represented as Actions (030-1 PICTURE ADJUST, 030-2 VOLUME
# ADJUST, 030-12 ASPECT ADJUST, 030-15 OTHER ADJUST, 053 LENS CONTROL family,
# 098-8 ECO MODE SET, 098-45 LAN PROJECTOR NAME SET, 098-198 PIP/PbP SET,
# 098-243-1 EDGE BLENDING SET, 319-10 AUDIO SELECT SET).
# UNRESOLVED: no additional standalone settable parameters documented outside the action set.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications; all responses are
# replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes:
#  - POWER ON / POWER OFF block all other commands during execution (incl. cooling).
#  - ERROR STATUS REQUEST (009) exposes an interlock-switch-open bit (DATA09 Bit1) and
#    cover/mirror-cover/lens-not-installed errors as observable status, but the source
#    describes NO interlock procedure or power-on sequencing requirement.
# UNRESOLVED: no explicit safety/interlock procedure stated in source.
```

## Notes
- Reference manual: "Projector Control Command Reference Manual", BDT140013 Revision 7.1.
- Command/response framing (§2.1): commands are hex byte strings; `<ID1>` = projector control ID, `<ID2>` = model code. Success responses begin with `2Nh`, error responses with `ANh` carrying `<ERR1> <ERR2>`.
- Checksum `<CKS>` = low-order byte of the sum of all preceding bytes (§2.2). For parameterized commands the checksum must be recomputed for the actual parameter bytes.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (RTS/CTS crossed).
- Lamp/filter usage times are returned in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) is negative once the replacement deadline is exceeded.

<!-- UNRESOLVED: source appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, sub-input values, eco/light/lamp mode values) is not present in the refined source document and could not be enumerated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not stated (full-duplex mode stated; RTS/CTS pins present in pinout). -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code byte values for this specific model not stated in source. -->
````

Spec done. 53 actions, one per source row. Hex verbatim. Both transports, port 7142, serial config from source. Caveman still active next turns.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:20:17.096Z
last_checked_at: 2026-06-18T08:10:02.810Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:10:02.810Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in the refined source and therefore not enumerated."
- "flow control not stated (RTS/CTS pins wired in cable pinout; \"Communication mode: Full duplex\" stated)"
- "appendix not in refined source.\""
- "appendix not in refined source).\""
- "value list not in refined source).\""
- "value list in source appendix, not in refined source"
- "no additional standalone settable parameters documented outside the action set."
- "source does not document unsolicited notifications; all responses are"
- "source documents no multi-step command sequences."
- "no explicit safety/interlock procedure stated in source."
- "source appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco/light/lamp mode values) is not present in the refined source document and could not be enumerated."
- "firmware version compatibility not stated."
- "serial flow_control not stated (full-duplex mode stated; RTS/CTS pins present in pinout)."
- "ID1 control ID and ID2 model code byte values for this specific model not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
