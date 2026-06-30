---
spec_id: admin/sharp-nec-led-fe009i2-104in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE009I2 104IN Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE009I2 104IN"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE009I2 104IN"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:31:02.745Z
last_checked_at: 2026-06-18T08:04:51.575Z
generated_at: 2026-06-18T08:04:51.575Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact marketed model string variants, firmware version compatibility not stated"
  - "flow control not stated in source"
  - "no separate settable parameters outside Actions enumerated"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "source documents power-state interlocks only. No other safety"
  - "appendix pages not present in refined source (input terminal enum, aspect enum, eco mode enum, sub-input enum, base model type enum)"
  - "flow_control not stated for RS-232C"
  - "default baud rate not stated (switchable range 4800–115200 listed)"
  - "ID1 default value / model code (ID2) for this specific model not stated"
  - "firmware version compatibility not stated"
  - "voltage, current, power specifications not in this command-reference manual"
  - "wireless LAN protocol details (deferred to separate unit manual)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:04:51.575Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE009I2 104IN Control Spec

## Summary
Sharp/NEC LED FE009I2 104IN projector/LED display, controlled via RS-232C (PC CONTROL D-SUB 9P) or wired/wireless LAN. Binary command protocol with hex-byte framing, checksum (low-order byte of sum of preceding bytes), and request/response structure. Spec covers 53 documented command entries.

<!-- UNRESOLVED: exact marketed model string variants, firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: POWER ON / POWER OFF commands present (015, 016)
- queryable    # inferred: many query/status request commands present
- levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST present
```

## Actions
```yaml
# NOTE on command format: source lists commands as hex byte sequences with the
# trailing byte being the checksum (CKS = low-order 8 bits of sum of preceding
# bytes). <ID1> (control ID) and <ID2> (model code) are inserted by the
# controller before transmission per section 2.2; CKS must be recomputed when
# parameters or IDs change. Parameterized commands show the variable part in {}.

# --- 009: ERROR STATUS REQUEST ---
- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015: POWER ON ---
- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016: POWER OFF ---
- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018: INPUT SW CHANGE ---
- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value (e.g. 06h = video port). See appendix "Supplementary Information by Command".
    - name: cks
      type: integer
      description: Checksum - low-order 8 bits of sum of preceding bytes.

# --- 020: PICTURE MUTE ON ---
- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021: PICTURE MUTE OFF ---
- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022: SOUND MUTE ON ---
- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023: SOUND MUTE OFF ---
- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024: ONSCREEN MUTE ON ---
- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025: ONSCREEN MUTE OFF ---
- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1: PICTURE ADJUST ---
- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness).
    - name: data02
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative).
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum.

# --- 030-2: VOLUME ADJUST ---
- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative).
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum.

# --- 030-12: ASPECT ADJUST ---
- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Aspect value. See appendix "Supplementary Information by Command".
    - name: cks
      type: integer
      description: Checksum.

# --- 030-15: OTHER ADJUST (LAMP/LIGHT) ---
- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: High byte of adjustment target. Source lists 96h with DATA02=FFh as "LAMP ADJUST / LIGHT ADJUST".
    - name: data02
      type: integer
      description: Low byte of adjustment target (FFh pairs with 96h).
    - name: data03
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative).
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum.

# --- 037: INFORMATION REQUEST ---
- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3: FILTER USAGE INFORMATION REQUEST ---
- id: cmd_037_3_filter_usage_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4: LAMP INFORMATION REQUEST 3 ---
- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Lamp selector (00h=Lamp 1, 01h=Lamp 2 - Lamp 2 effective only on two-lamp models).
    - name: data02
      type: integer
      description: Content (01h=Lamp usage time seconds, 04h=Lamp remaining life %).
    - name: cks
      type: integer
      description: Checksum.

# --- 037-6: CARBON SAVINGS INFORMATION REQUEST ---
- id: cmd_037_6_carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Content (00h=Total Carbon Savings, 01h=Carbon Savings during operation).
    - name: cks
      type: integer
      description: Checksum.

# --- 050: REMOTE KEY CODE ---
- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Key code low byte. Examples - 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO.
    - name: data02
      type: integer
      description: Key code high byte (always 00h per source key code list).
    - name: cks
      type: integer
      description: Checksum.

# --- 051: SHUTTER CLOSE ---
- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052: SHUTTER OPEN ---
- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053: LENS CONTROL ---
- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target. Source documents 06h=Periphery Focus.
    - name: data02
      type: integer
      description: Drive command (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-1: LENS CONTROL REQUEST ---
- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target (see 053 LENS CONTROL).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-2: LENS CONTROL 2 ---
- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: Target (FFh=Stop; otherwise adjustment target). When Stop, mode and value are not referenced.
    - name: data02
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative).
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-3: LENS MEMORY CONTROL ---
- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-4: REFERENCE LENS MEMORY CONTROL ---
- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-5: LENS MEMORY OPTION REQUEST ---
- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-6: LENS MEMORY OPTION SET ---
- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE).
    - name: data02
      type: integer
      description: Setting value (00h=OFF, 01h=ON).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-7: LENS INFORMATION REQUEST ---
- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10: LENS PROFILE SET ---
- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2).
    - name: cks
      type: integer
      description: Checksum.

# --- 053-11: LENS PROFILE REQUEST ---
- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1: GAIN PARAMETER REQUEST 3 ---
- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Adjusted value name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust).
    - name: cks
      type: integer
      description: Checksum.

# --- 078-1: SETTING REQUEST ---
- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2: RUNNING STATUS REQUEST ---
- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3: INPUT STATUS REQUEST ---
- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4: MUTE STATUS REQUEST ---
- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5: MODEL NAME REQUEST ---
- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6: COVER STATUS REQUEST ---
- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079: FREEZE CONTROL ---
- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation (01h=Freeze On, 02h=Freeze Off).
    - name: cks
      type: integer
      description: Checksum.

# --- 084: INFORMATION STRING REQUEST ---
- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency).
    - name: cks
      type: integer
      description: Checksum.

# --- 097-8: ECO MODE REQUEST ---
- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45: LAN PROJECTOR NAME REQUEST ---
- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155: LAN MAC ADDRESS STATUS REQUEST 2 ---
- id: cmd_097_155_lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198: PIP / PICTURE BY PICTURE REQUEST ---
- id: cmd_097_198_pip_pbp_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Content (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3).
    - name: cks
      type: integer
      description: Checksum.

# --- 097-243-1: EDGE BLENDING MODE REQUEST ---
- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8: ECO MODE SET ---
- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Eco/Light/Lamp mode value. See appendix "Supplementary Information by Command".
    - name: cks
      type: integer
      description: Checksum.

# --- 098-45: LAN PROJECTOR NAME SET ---
- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Projector name byte 1.
    - name: data02
      type: integer
      description: Projector name byte 2.
    - name: data03
      type: integer
      description: Projector name byte 3.
    - name: data04
      type: integer
      description: Projector name byte 4.
    - name: data05
      type: integer
      description: Projector name byte 5.
    - name: data06
      type: integer
      description: Projector name byte 6.
    - name: data07
      type: integer
      description: Projector name byte 7.
    - name: data08
      type: integer
      description: Projector name byte 8.
    - name: data09
      type: integer
      description: Projector name byte 9.
    - name: data10
      type: integer
      description: Projector name byte 10.
    - name: data11
      type: integer
      description: Projector name byte 11.
    - name: data12
      type: integer
      description: Projector name byte 12.
    - name: data13
      type: integer
      description: Projector name byte 13.
    - name: data14
      type: integer
      description: Projector name byte 14.
    - name: data15
      type: integer
      description: Projector name byte 15.
    - name: data16
      type: integer
      description: Projector name byte 16 (up to 16 bytes total).
    - name: cks
      type: integer
      description: Checksum.

# --- 098-198: PIP / PICTURE BY PICTURE SET ---
- id: cmd_098_198_pip_pbp_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3).
    - name: data02
      type: integer
      description: Setting value - interpretation depends on DATA01 (MODE: 00h=PIP/01h=PBP; START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; SUB INPUT*: sub input value per appendix).
    - name: cks
      type: integer
      description: Checksum.

# --- 098-243-1: EDGE BLENDING MODE SET ---
- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Setting value (00h=OFF, 01h=ON).
    - name: cks
      type: integer
      description: Checksum.

# --- 305-1: BASE MODEL TYPE REQUEST ---
- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2: SERIAL NUMBER REQUEST ---
- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3: BASIC INFORMATION REQUEST ---
- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10: AUDIO SELECT SET ---
- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal. See appendix "Supplementary Information by Command".
    - name: data02
      type: integer
      description: Setting value (00h=terminal-specified, 01h=BNC, 02h=COMPUTER).
    - name: cks
      type: integer
      description: Checksum.
```

## Feedbacks
```yaml
# Each successful response echoes the command opcode with 2Xh/A-prefix; error
# responses use AXh prefix with ERR1/ERR2 error codes per section 2.4.
- id: response_ack
  type: ack
  description: Successful command echoed back with leading byte 2Xh (e.g. 22h for 02h-class) and no data part.
- id: response_error
  type: enum
  description: Error response with AXh prefix, ERR1 and ERR2 codes per section 2.4 list (see Notes).
- id: response_data
  type: raw
  description: Response with data part attached (format varies per command - see source section 3).
```

## Variables
```yaml
# UNRESOLVED: no separate settable parameters outside Actions enumerated
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on in progress"
  - "POWER OFF (016): no other command accepted during power-off and cooling time"
# UNRESOLVED: source documents power-state interlocks only. No other safety
# procedures, voltage/current specs, or power-on sequencing requirements stated.
```

## Notes
- **Checksum (CKS):** low-order 8 bits of the sum of all preceding bytes in the command/response frame. Must be recomputed when any byte (including parameters) changes. Worked example in source section "Example of checksum calculation".
- **ID1 / ID2 framing:** source section 2.2 defines ID1 (control ID) and ID2 (model code) as parameters inserted before the LEN/data part on transmission. The command bytes listed in section 3 are the *logical* form; full wire format requires wrapping with header + ID1 + ID2 per section 2.1 (`20h <OP> <ID1> <ID2> <LEN> <DATA...> <CKS>`).
- **Response framing:** responses use A-prefix on leading byte (e.g. POWER ON response is `A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`).
- **Error codes (ERR1, ERR2):** documented combinations in source section 2.4 — e.g. `00h 00h` unrecognized command, `00h 01h` unsupported by model, `01h 00h` invalid value, `02h 0Dh` power off (command not accepted), `02h 0Eh` execution failed, `02h 0Fh` no authority, `03h 02h` adjustment failed.
- **Baud rate switchable:** source lists 115200 / 38400 / 19200 / 9600 / 4800 bps. Default value not stated; pick the highest documented (115200) as the `baud_rate` and note the switchable range here.
- **Power interlocks:** commands rejected with ERR1=02h ERR2=0Dh ("command cannot be accepted because the power is off") when projector is not powered on. See 015/016 timing notes in Safety.
- **Lamp usage / filter usage:** time counters update at one-minute intervals even though resolution is one-second.
- **Appendix "Supplementary Information by Command":** referenced by multiple commands (018 input terminal values, 030-12 aspect values, 098-8 eco mode values, 097-198 sub-input values, 305-1 base model types, 319-10 input terminal). Source document provided does NOT contain the appendix pages — those enum tables are UNRESOLVED.
- **Wireless LAN:** source mentions a wireless LAN unit but defers to "operation manual of the wireless LAN unit" for details — not specified here.

<!-- UNRESOLVED: appendix pages not present in refined source (input terminal enum, aspect enum, eco mode enum, sub-input enum, base model type enum) -->
<!-- UNRESOLVED: flow_control not stated for RS-232C -->
<!-- UNRESOLVED: default baud rate not stated (switchable range 4800–115200 listed) -->
<!-- UNRESOLVED: ID1 default value / model code (ID2) for this specific model not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage, current, power specifications not in this command-reference manual -->
<!-- UNRESOLVED: wireless LAN protocol details (deferred to separate unit manual) -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:31:02.745Z
last_checked_at: 2026-06-18T08:04:51.575Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:04:51.575Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact marketed model string variants, firmware version compatibility not stated"
- "flow control not stated in source"
- "no separate settable parameters outside Actions enumerated"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "source documents power-state interlocks only. No other safety"
- "appendix pages not present in refined source (input terminal enum, aspect enum, eco mode enum, sub-input enum, base model type enum)"
- "flow_control not stated for RS-232C"
- "default baud rate not stated (switchable range 4800–115200 listed)"
- "ID1 default value / model code (ID2) for this specific model not stated"
- "firmware version compatibility not stated"
- "voltage, current, power specifications not in this command-reference manual"
- "wireless LAN protocol details (deferred to separate unit manual)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
