---
spec_id: admin/sharp-nec-led-fc012i-110in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC012I 110IN Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC012I 110IN"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC012I 110IN"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:24:56.254Z
last_checked_at: 2026-06-18T08:03:38.792Z
generated_at: 2026-06-18T08:03:38.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Control ID (ID1) and model code (ID2) per-device values not stated. Full input-terminal / aspect / eco-mode / base-model-type value tables live in an \"Appendix: Supplementary Information by Command\" not present in the refined source."
  - "flow control not stated; RTS/CTS wired on D-SUB per pin table"
  - "exact value map not in refined source"
  - "source documents no unsolicited notifications. All responses are"
  - "no multi-step sequences described in source."
  - "power-on sequencing, voltage/current specs, and fault-recovery"
  - "firmware version compatibility not stated in source"
  - "input-terminal value table (018, 319-10) not in refined source"
  - "aspect value table (030-12) not in refined source"
  - "eco-mode value table (097-8, 098-8) not in refined source"
  - "base-model-type value table (078-1, 305-1) not in refined source"
  - "lens-control target codes (053, 053-1, 053-2) not fully enumerated"
  - "flow_control setting not stated (RTS/CTS physically wired)"
  - "interlock / power-on sequencing procedure not described"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:03:38.792Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC012I 110IN Control Spec

## Summary
Sharp/NEC LED FC012I 110IN is a large-format LED projector controllable over RS-232C serial and TCP/IP LAN. This spec covers the binary command protocol documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input, mute, lens, picture/volume, information queries, and edge-blend / PiP / PaP settings.

<!-- UNRESOLVED: firmware version compatibility not stated. Control ID (ID1) and model code (ID2) per-device values not stated. Full input-terminal / aspect / eco-mode / base-model-type value tables live in an "Appendix: Supplementary Information by Command" not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Serial: RS-232C, D-SUB 9P cross cable, full duplex.
# TCP: port 7142 (both directions), wired/wireless LAN.
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; RTS/CTS wired on D-SUB per pin table
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) / POWER OFF (016)
  - queryable      # inferred: many status/information request commands
  - routable       # inferred: INPUT SW CHANGE (018), audio select (319-10)
  - levelable      # inferred: picture/volume/lens adjustments
  - muteable       # inferred: picture/sound/onscreen/shutter mute commands
```

## Actions
```yaml
# Frame format (all commands): {HEADER} {ID1} {ID2} {LEN} {DATA...} {CKS}
#   ID1  = control ID set on projector
#   ID2  = model code (model-dependent)
#   LEN  = byte length of DATA part following LEN
#   CKS  = checksum = low byte of sum of all preceding bytes
# The command templates below show the fixed header/LEN bytes verbatim and the
# variable DATA bytes as placeholders. ID1/ID2/CKS are runtime-computed.

actions:
  - id: error_status_request_009
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"   # 009. ERROR STATUS REQUEST (literal)
    params: []

  - id: power_on_015
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"   # 015. POWER ON (literal)
    params: []
    notes: No other command accepted while power-on in progress.

  - id: power_off_016
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"   # 016. POWER OFF (literal)
    params: []
    notes: No other command accepted during power-off (including cooling time).

  - id: input_switch_018
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {CKS}"   # 018. INPUT SW CHANGE
    params:
      - name: input
        type: integer
        description: Input terminal value (e.g. 06h = video). Full list in Appendix "Supplementary Information by Command" - UNRESOLVED.

  - id: picture_mute_on_020
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"   # 020. PICTURE MUTE ON (literal)
    params: []

  - id: picture_mute_off_021
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"   # 021. PICTURE MUTE OFF (literal)
    params: []

  - id: sound_mute_on_022
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"   # 022. SOUND MUTE ON (literal)
    params: []

  - id: sound_mute_off_023
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"   # 023. SOUND MUTE OFF (literal)
    params: []

  - id: onscreen_mute_on_024
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"   # 024. ONSCREEN MUTE ON (literal)
    params: []

  - id: onscreen_mute_off_025
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"   # 025. ONSCREEN MUTE OFF (literal)
    params: []

  - id: picture_adjust_030_1
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {CKS}"   # 030-1. PICTURE ADJUST
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust_030_2
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {CKS}"   # 030-2. VOLUME ADJUST
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust_030_12
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {CKS}"   # 030-12. ASPECT ADJUST
    params:
      - name: value
        type: integer
        description: Aspect value - full list in Appendix "Supplementary Information by Command" (UNRESOLVED).

  - id: other_adjust_030_15
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {CKS}"   # 030-15. OTHER ADJUST
    params:
      - name: target_lo
        type: integer
        description: "96h (LAMP ADJUST / LIGHT ADJUST)"
      - name: target_hi
        type: integer
        description: "FFh (fixed per source)"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: remote_key_code_050
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {CKS}"   # 050. REMOTE KEY CODE
    params:
      - name: key_lo
        type: integer
        description: "Key code low byte (WORD type). Source-listed keys: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: key_hi
        type: integer
        description: "Key code high byte (00h for all listed keys)"

  - id: shutter_close_051
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"   # 051. SHUTTER CLOSE (literal)
    params: []

  - id: shutter_open_052
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"   # 052. SHUTTER OPEN (literal)
    params: []

  - id: lens_control_053
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {target} {action} {CKS}"   # 053. LENS CONTROL
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus (only value listed in source)"
      - name: action
        type: integer
        description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request_053_1
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {CKS}"   # 053-1. LENS CONTROL REQUEST
    params:
      - name: target
        type: integer
        description: Lens adjustment target (value not enumerated in source - UNRESOLVED).

  - id: lens_control_2_053_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {CKS}"   # 053-2. LENS CONTROL 2
    params:
      - name: target
        type: integer
        description: "FFh=Stop; otherwise lens adjustment target (not further enumerated - UNRESOLVED)"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control_053_3
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {CKS}"   # 053-3. LENS MEMORY CONTROL
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control_053_4
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {CKS}"   # 053-4. REFERENCE LENS MEMORY CONTROL
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile set via 053-10."

  - id: lens_memory_option_request_053_5
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {CKS}"   # 053-5. LENS MEMORY OPTION REQUEST
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set_053_6
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {CKS}"   # 053-6. LENS MEMORY OPTION SET
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request_053_7
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"   # 053-7. LENS INFORMATION REQUEST (literal)
    params: []

  - id: lens_profile_set_053_10
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {CKS}"   # 053-10. LENS PROFILE SET
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request_053_11
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"   # 053-11. LENS PROFILE REQUEST (literal)
    params: []

  - id: freeze_control_079
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {value} {CKS}"   # 079. FREEZE CONTROL
    params:
      - name: value
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set_098_8
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {CKS}"   # 098-8. ECO MODE SET
    params:
      - name: value
        type: integer
        description: Eco mode value - full list in Appendix "Supplementary Information by Command" (UNRESOLVED).

  - id: lan_projector_name_set_098_45
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_01-16} 00h {CKS}"   # 098-45. LAN PROJECTOR NAME SET
    params:
      - name: name_01-16
        type: string
        description: Projector name, up to 16 bytes (NUL-terminated).

  - id: pip_pbp_set_098_198
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {target} {value} {CKS}"   # 098-198. PIP/PICTURE BY PICTURE SET
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "When MODE: 00h=PIP, 01h=PbP. When START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values: Appendix (UNRESOLVED)."

  - id: edge_blending_mode_set_098_243_1
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {CKS}"   # 098-243-1. EDGE BLENDING MODE SET
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set_319_10
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {CKS}"   # 319-10. AUDIO SELECT SET
    params:
      - name: input
        type: integer
        description: Input terminal value - full list in Appendix (UNRESOLVED).
      - name: value
        type: integer
        description: "00h=terminal specified in input, 01h=BNC, 02h=COMPUTER"

  # ---- Information / status queries (kind: query) ----

  - id: information_request_037
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"   # 037. INFORMATION REQUEST (literal)
    params: []

  - id: filter_usage_information_request_037_3
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"   # 037-3. FILTER USAGE INFORMATION REQUEST (literal)
    params: []

  - id: lamp_information_request_3_037_4
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"   # 037-4. LAMP INFORMATION REQUEST 3
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request_037_6
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {CKS}"   # 037-6. CARBON SAVINGS INFORMATION REQUEST
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: gain_parameter_request_3_060_1
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {CKS}"   # 060-1. GAIN PARAMETER REQUEST 3
    params:
      - name: name
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request_078_1
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"   # 078-1. SETTING REQUEST (literal)
    params: []

  - id: running_status_request_078_2
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"   # 078-2. RUNNING STATUS REQUEST (literal)
    params: []

  - id: input_status_request_078_3
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"   # 078-3. INPUT STATUS REQUEST (literal)
    params: []

  - id: mute_status_request_078_4
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"   # 078-4. MUTE STATUS REQUEST (literal)
    params: []

  - id: model_name_request_078_5
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"   # 078-5. MODEL NAME REQUEST (literal)
    params: []

  - id: cover_status_request_078_6
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"   # 078-6. COVER STATUS REQUEST (literal)
    params: []

  - id: information_string_request_084
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {CKS}"   # 084. INFORMATION STRING REQUEST
    params:
      - name: type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request_097_8
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"   # 097-8. ECO MODE REQUEST (literal)
    params: []

  - id: lan_projector_name_request_097_45
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"   # 097-45. LAN PROJECTOR NAME REQUEST (literal)
    params: []

  - id: lan_mac_address_status_request2_097_155
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"   # 097-155. LAN MAC ADDRESS STATUS REQUEST2 (literal)
    params: []

  - id: pip_pbp_request_097_198
    label: PIP/Picture-by-Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {target} {CKS}"   # 097-198. PIP/PICTURE BY PICTURE REQUEST
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request_097_243_1
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"   # 097-243-1. EDGE BLENDING MODE REQUEST (literal)
    params: []

  - id: base_model_type_request_305_1
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"   # 305-1. BASE MODEL TYPE REQUEST (literal)
    params: []

  - id: serial_number_request_305_2
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"   # 305-2. SERIAL NUMBER REQUEST (literal)
    params: []

  - id: basic_information_request_305_3
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"   # 305-3. BASIC INFORMATION REQUEST (literal)
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: 078-2 RUNNING STATUS REQUEST, DATA06; 305-3 BASIC INFORMATION REQUEST, DATA01

  - id: cooling_in_progress
    type: enum
    values: [not_executed, during_execution]
    source: 078-2 DATA04

  - id: power_on_off_in_progress
    type: enum
    values: [not_executed, during_execution]
    source: 078-2 DATA05

  - id: picture_mute
    type: enum
    values: [off, on]
    source: 078-4 MUTE STATUS REQUEST, DATA01

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

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: 078-6 COVER STATUS REQUEST, DATA01

  - id: error_status
    type: bitmask
    description: 12-byte bitmap (DATA01-DATA12) of fan / temperature / lamp / formatter / FPGA / mirror-cover / foreign-matter / iris / lens-not-installed / interlock-switch-open / system errors. See 009 ERROR STATUS REQUEST for full bit map.
    source: 009 ERROR STATUS REQUEST

  - id: lens_operation_status
    type: bitmask
    description: Lens memory / Zoom / Focus / Lens Shift(H) / Lens Shift(V) operation state, one bit each (0=stop, 1=during operation).
    source: 053-7 LENS INFORMATION REQUEST, DATA01

  - id: eco_mode
    type: integer
    source: 097-8 ECO MODE REQUEST  # UNRESOLVED: exact value map not in refined source

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: 097-243-1 EDGE BLENDING MODE REQUEST

  - id: mac_address
    type: string
    source: 097-155 LAN MAC ADDRESS STATUS REQUEST2
```

## Variables
```yaml
# Per-parameter adjustable values exposed via 060-1 GAIN PARAMETER REQUEST 3 and
# the matching 030-x adjust commands. Min/max/default/current values are returned
# per gain name in the 060-1 response (DATA02-DATA14).
variables:
  - id: brightness
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=00h)
    write_command: picture_adjust_030_1 (target=00h)

  - id: contrast
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=01h)
    write_command: picture_adjust_030_1 (target=01h)

  - id: color
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=02h)
    write_command: picture_adjust_030_1 (target=02h)

  - id: hue
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=03h)
    write_command: picture_adjust_030_1 (target=03h)

  - id: sharpness
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=04h)
    write_command: picture_adjust_030_1 (target=04h)

  - id: volume
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=05h)
    write_command: volume_adjust_030_2

  - id: lamp_light_adjust
    type: integer
    read_command: gain_parameter_request_3_060_1 (name=96h)
    write_command: other_adjust_030_15

  - id: lamp_usage_time_seconds
    type: integer
    read_command: lamp_information_request_3_037_4 (content=01h)

  - id: lamp_remaining_life_pct
    type: integer
    read_command: lamp_information_request_3_037_4 (content=04h)

  - id: filter_usage_time_seconds
    type: integer
    read_command: filter_usage_information_request_037_3

  - id: filter_alarm_start_time_seconds
    type: integer
    read_command: filter_usage_information_request_037_3

  - id: total_carbon_savings_kg
    type: number
    read_command: carbon_savings_information_request_037_6 (type=00h)

  - id: projector_name
    type: string
    read_command: lan_projector_name_request_097_45
    write_command: lan_projector_name_set_098_45
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (one response per command).
events: []
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source:
#  - POWER ON (015): no other command accepted while power-on is in progress.
#  - POWER OFF (016): no other command accepted during power-off incl. cooling time.
#  - 009 ERROR STATUS REQUEST bit DATA09.Bit1: "the interlock switch is open."
#    Presence of an interlock switch is documented; full interlock procedure is
#    NOT described in source.
# UNRESOLVED: power-on sequencing, voltage/current specs, and fault-recovery
# procedures are not present in the refined source.
```

## Notes
- Source: Projector Control Command Reference Manual, BDT140013 Rev 7.1.
- Protocol is binary; all bytes shown as `NNh` (hex). Frame = `{HEADER} {ID1} {ID2} {LEN} {DATA...} {CKS}`.
- Checksum: low-order byte of the sum of all preceding bytes. Worked example in source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- `ID1` (control ID) and `ID2` (model code) are per-device values not specified in source — runtime parameters.
- Response ACK header uses `Axh` prefix mirroring the command's `0xh` (e.g. `02h`→`22h` success / `A2h` error).
- Error responses carry `<ERR1> <ERR2>` per the §2.4 error-code table (24 codes documented).
- Lamp/filter usage times returned in seconds, updated at one-minute granularity.
- Source references an "Appendix: Supplementary Information by Command" containing the full input-terminal, aspect, eco-mode, and base-model-type value tables. That appendix is NOT in the refined source — several params above are marked UNRESOLVED pending it.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input-terminal value table (018, 319-10) not in refined source -->
<!-- UNRESOLVED: aspect value table (030-12) not in refined source -->
<!-- UNRESOLVED: eco-mode value table (097-8, 098-8) not in refined source -->
<!-- UNRESOLVED: base-model-type value table (078-1, 305-1) not in refined source -->
<!-- UNRESOLVED: lens-control target codes (053, 053-1, 053-2) not fully enumerated -->
<!-- UNRESOLVED: flow_control setting not stated (RTS/CTS physically wired) -->
<!-- UNRESOLVED: interlock / power-on sequencing procedure not described -->
```

Spec built. 51 actions (one per documented command opcode). Serial + TCP transport. All hex payloads verbatim. UNRESOLVED markers for appendix-dependent value tables + firmware. Ready for ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:24:56.254Z
last_checked_at: 2026-06-18T08:03:38.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:03:38.792Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Control ID (ID1) and model code (ID2) per-device values not stated. Full input-terminal / aspect / eco-mode / base-model-type value tables live in an \"Appendix: Supplementary Information by Command\" not present in the refined source."
- "flow control not stated; RTS/CTS wired on D-SUB per pin table"
- "exact value map not in refined source"
- "source documents no unsolicited notifications. All responses are"
- "no multi-step sequences described in source."
- "power-on sequencing, voltage/current specs, and fault-recovery"
- "firmware version compatibility not stated in source"
- "input-terminal value table (018, 319-10) not in refined source"
- "aspect value table (030-12) not in refined source"
- "eco-mode value table (097-8, 098-8) not in refined source"
- "base-model-type value table (078-1, 305-1) not in refined source"
- "lens-control target codes (053, 053-1, 053-2) not fully enumerated"
- "flow_control setting not stated (RTS/CTS physically wired)"
- "interlock / power-on sequencing procedure not described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
