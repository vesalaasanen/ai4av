---
spec_id: admin/sharp-nec-ld-fa312
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa312 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa312"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa312"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:06:53.190Z
last_checked_at: 2026-06-17T20:03:01.085Z
generated_at: 2026-06-17T20:03:01.085Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Input terminal value table (Appendix \"Supplementary Information by Command\") not in source — DATA01 values for INPUT SW CHANGE / AUDIO SELECT SET partially documented. Eco mode value set not in source (refers to Appendix). Base model type values not in source (refers to Appendix)."
  - "full table in Appendix, not in source\""
  - "in Appendix, not in source\""
  - "full sub-input table in Appendix\""
  - "source documents no unsolicited notifications. All responses are command-acknowledgements."
  - "source documents no explicit multi-step sequences."
  - "source contains no explicit operator-safety confirmation procedures beyond the interlock flags above."
  - "ID2 model code for Ld Fa312 not in source. Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in the refined source provided. Firmware version range not stated. Voltage/power/current specs not in this command reference (likely in operator manual). Protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:03:01.085Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex sequences in source; transport parameters fully supported; one-to-one coverage with no excess source commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa312 Control Spec

## Summary
Sharp/NEC Ld Fa312 projector control spec. Binary RS-232C protocol over D-SUB 9P serial (cross cable) and/or wired/wireless LAN (TCP port 7142). 53 documented commands covering power, input switching, mute (picture/sound/onscreen), lens control, lens memory, picture/volume adjust, status queries, eco mode, edge blending, PIP/PbP, and information requests. Command frames are hex byte sequences with a checksum byte.

<!-- UNRESOLVED: firmware version compatibility not stated. Input terminal value table (Appendix "Supplementary Information by Command") not in source — DATA01 values for INPUT SW CHANGE / AUDIO SELECT SET partially documented. Eco mode value set not in source (refers to Appendix). Base model type values not in source (refers to Appendix). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as configurable; 9600 is one valid option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states full-duplex; specific flow_control not named
addressing:
  port: 7142  # source: "Use TCP port number 7142"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands
  - queryable    # inferred from many status/info request commands
  - levelable    # inferred from picture/volume/lamp adjust commands
  - muteable     # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During cooldown, no other command accepted."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Input terminal hex value (e.g. 06h=Video). Full table in Appendix - UNRESOLVED."
    notes: "Example video: 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: cmd_021_picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: cmd_023_sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: string
        description: "Mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Aspect value - UNRESOLVED: full table in Appendix, not in source"

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "96h for LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: string
        description: "FFh"
      - name: DATA03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (sec), filter usage time (sec)"

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time and alarm start time (sec); -1 if undefined"

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: string
        description: "01h=usage time (sec), 04h=remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Key code low byte (see key code table)"
      - name: DATA02
        type: string
        description: "Key code high byte"
    notes: "Examples: POWER ON=02h 00h, POWER OFF=03h 00h, AUTO=05h 00h, MENU=06h 00h, UP=07h 00h, DOWN=08h 00h, RIGHT=09h 00h, LEFT=0Ah 00h, ENTER=0Bh 00h, EXIT=0Ch 00h, HELP=0Dh 00h, MAGNIFY UP=0Fh 00h, MAGNIFY DOWN=10h 00h, MUTE=13h 00h, PICTURE=29h 00h, COMPUTER1=4Bh 00h, COMPUTER2=4Ch 00h, VIDEO1=4Fh 00h, S-VIDEO1=51h 00h, VOLUME UP=84h 00h, VOLUME DOWN=85h 00h, FREEZE=8Ah 00h, ASPECT=A3h 00h, SOURCE=D7h 00h, LAMP MODE/ECO=EEh 00h"

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Lens operation target (e.g. 06h=Periphery Focus)"
      - name: DATA02
        type: string
        description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Lens target (same set as 053)"
    notes: "Returns upper/lower limits and current value"

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "FFh=Stop, otherwise lens target"
      - name: DATA02
        type: string
        description: "Mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile selected by 053-10"

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: string
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns lens operation status bitmap"

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile/clock/sleep info"

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status"

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types"

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-OSD mute status"

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h=Normal (cover opened), 01h=Cover closed"

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Eco mode value table - UNRESOLVED: in Appendix, not in source"

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Eco mode value - UNRESOLVED: in Appendix, not in source"

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name, up to 16 bytes (NUL-terminated)"

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: string
        description: "Mode value (PIP=00h/PbP=01h), position (TL/TR/BL/BR=00h-03h), or sub-input value - UNRESOLVED: full sub-input table in Appendix"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Base model type values - UNRESOLVED: in Appendix, not in source"

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute/freeze status"

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Input terminal - UNRESOLVED: full table in Appendix, not in source"
      - name: DATA02
        type: string
        description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status_response
    type: bitmap
    description: "12-byte error bitmap returned by 009 (cover/fan/temp/power/lamp/formatter/etc.)"

  - id: command_result_status
    type: enum
    values: [success, error]
    description: "DATA01-02 of adjustment commands: 0000h=success, other=error"

  - id: command_error_codes
    type: composite
    description: "ERR1/ERR2 pair per source table 2.4 - covers unrecognized command, unsupported model, invalid value, invalid input, invalid language, memory errors, power-off reject, no signal, authority, gain errors, etc."

  - id: power_status
    type: enum
    values: [standby, power_on]
    description: "From 078-2: 00h=Standby, 01h=Power on"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2/305-3: 00h/04h/05h/06h/0Fh/10h"

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "From 078-6: 00h=Normal(opened), 01h=Closed"
```

## Variables
```yaml
variables:
  - id: volume_level
    type: integer
    description: "Sound volume - set via 030-2, queried via 060-1 (DATA01=05h)"

  - id: brightness
    type: integer
    description: "Picture brightness - set/queried via 030-1 / 060-1 (DATA01=00h)"

  - id: contrast
    type: integer
    description: "Picture contrast - DATA01=01h"

  - id: color
    type: integer
    description: "Picture color - DATA01=02h"

  - id: hue
    type: integer
    description: "Picture hue - DATA01=03h"

  - id: sharpness
    type: integer
    description: "Picture sharpness - DATA01=04h"

  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust - DATA01=96h"

  - id: eco_mode
    type: string
    description: "Eco/Light/Lamp mode - set via 098-8, queried via 097-8. Value table UNRESOLVED (Appendix)."

  - id: projector_name
    type: string
    description: "LAN projector name, up to 16 bytes - set via 098-45, queried via 097-45"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Set via 098-243-1, queried via 097-243-1"

  - id: selected_input
    type: string
    description: "Active input terminal - set via 018, queried via 078-3/305-3"
```

## Events
```yaml
events: []  # UNRESOLVED: source documents no unsolicited notifications. All responses are command-acknowledgements.
```

## Macros
```yaml
macros: []  # UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON (015): no other command accepted during power-on sequence"
  - description: "POWER OFF (016): no other command accepted during cooldown"
  - description: "Cover error / interlock switch open flagged in 009 ERROR STATUS (DATA09 Bit1)"
notes:
  - "Forced onscreen mute (ERR1=02h ERR2=04h) blocks certain commands"
  - "Commands rejected when power off: ERR1=02h ERR2=0Dh"
# UNRESOLVED: source contains no explicit operator-safety confirmation procedures beyond the interlock flags above.
```

## Notes
- **Frame format:** `20h/02h/03h/01h/00h {MT2} {ID1} {ID2} {LEN} {DATA...} {CKS}`. Request frames lead with 00h/01h/02h/03h; responses lead with 20h/21h/22h/23h (success) or A0h/A1h/A2h/A3h (error).
- **Checksum:** low-order byte of the sum of all preceding bytes (per source §2.2).
- **ID1:** control ID set on projector. **ID2:** model code (varies by model — UNRESOLVED for Ld Fa312).
- **Baud rate:** configurable among 4800/9600/19200/38400/115200 — pick 9600 as default-secure choice in this draft; verify against actual device config.
- **RS-232 cable:** D-SUB 9P cross cable (null modem). Pin 2/3 crossed, 7/8 crossed, 5 GND straight.
- **LAN port:** RJ-45, 10/100 Mbps auto-sensing.
- **Lamp usage/filter usage updated at 1-minute intervals** even though data is second-precision.
- **Two-lamp models only:** DATA01=01h (Lamp 2) valid on 037-4.

<!-- UNRESOLVED: ID2 model code for Ld Fa312 not in source. Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in the refined source provided. Firmware version range not stated. Voltage/power/current specs not in this command reference (likely in operator manual). Protocol version not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:06:53.190Z
last_checked_at: 2026-06-17T20:03:01.085Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:03:01.085Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex sequences in source; transport parameters fully supported; one-to-one coverage with no excess source commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Input terminal value table (Appendix \"Supplementary Information by Command\") not in source — DATA01 values for INPUT SW CHANGE / AUDIO SELECT SET partially documented. Eco mode value set not in source (refers to Appendix). Base model type values not in source (refers to Appendix)."
- "full table in Appendix, not in source\""
- "in Appendix, not in source\""
- "full sub-input table in Appendix\""
- "source documents no unsolicited notifications. All responses are command-acknowledgements."
- "source documents no explicit multi-step sequences."
- "source contains no explicit operator-safety confirmation procedures beyond the interlock flags above."
- "ID2 model code for Ld Fa312 not in source. Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input values — not present in the refined source provided. Firmware version range not stated. Voltage/power/current specs not in this command reference (likely in operator manual). Protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
