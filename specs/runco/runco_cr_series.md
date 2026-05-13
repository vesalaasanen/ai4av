---
spec_id: admin/runco-cr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Runco CR Series Control Spec"
manufacturer: Runco
model_family: "Crystal Series LCD Display"
aliases: []
compatible_with:
  manufacturers:
    - Runco
  models:
    - "Crystal Series LCD Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hdtvsolutions.com
retrieved_at: 2026-04-29T22:01:17.094Z
last_checked_at: 2026-04-30T09:48:21.302Z
generated_at: 2026-04-30T09:48:21.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:48:21.302Z
  matched_actions: 63
  action_count: 63
  confidence: high
  summary: "All 63 spec actions found as literal substrings in source with matching wire codes; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Runco CR Series Control Spec

## Summary

Runco Crystal Series LCD Display controlled via RS-232 serial. ASCII command set covers power, input routing, volume, aspect ratio, PIP, picture modes, TV channel, caption, and full IR remote emulation. No carriage return required; acknowledgement is `]` + 4-digit code or `-N/A` for invalid.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # NOTE: baud rate configurable via ISF Calibration menu (115200, 19200, 9600, 2400)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - routable     # input selection commands
  - levelable    # volume control
  - queryable    # command acknowledgement responses
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "[SAB0001"
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: "[SAB0000"
    params: []

  - id: set_volume
    label: Set Audio Volume
    kind: action
    command: "[S3A0{volume:03d}"
    params:
      - name: volume
        type: integer
        min: 0
        max: 100
        description: "Volume level (000-100)"

  - id: volume_up
    label: Volume Up
    kind: action
    command: "[+3A"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "[-3A"
    params: []

  - id: select_input
    label: Select Main Input
    kind: action
    command: "[S4A000{input}"
    params:
      - name: input
        type: integer
        values: [0, 1, 2, 3, 5, 6]
        description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 5=DVI, 6=RGB"

  - id: select_aspect_ratio
    label: Select Aspect Ratio
    kind: action
    command: "[S4E000{mode}"
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Standard 4x3, 1=VirtualWide, 2=Letterbox, 3=Anamorphic"

  - id: select_input1_composite
    label: Select Composite Video for Input1
    kind: action
    command: "[S4F0101"
    params: []

  - id: select_input1_svideo
    label: Select S-Video for Input1
    kind: action
    command: "[S4F0102"
    params: []

  - id: select_input2_composite
    label: Select Composite Video for Input2
    kind: action
    command: "[S4F0201"
    params: []

  - id: select_input2_svideo
    label: Select S-Video for Input2
    kind: action
    command: "[S4F0202"
    params: []

  - id: select_input3_composite
    label: Select Composite Video for Input3
    kind: action
    command: "[S4F0301"
    params: []

  - id: select_input3_component
    label: Select Component Video for Input3
    kind: action
    command: "[S4F0303"
    params: []

  - id: select_pip_input
    label: Select PIP Input
    kind: action
    command: "[S4G000{input}"
    params:
      - name: input
        type: integer
        values: [0, 1, 2, 3, 5, 6]
        description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 5=DVI, 6=RGB"

  - id: select_picture_mode
    label: Select Picture Mode
    kind: action
    command: "[SBA000{mode}"
    params:
      - name: mode
        type: integer
        values: [0, 1, 2]
        description: "0=Custom, 1=ISF Night, 2=ISF Day"

  - id: set_caption
    label: Set Caption On/Off
    kind: action
    command: "[SCA000{state}"
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=off, 1=on"

  - id: channel_up
    label: TV Channel Up
    kind: action
    command: "[+CB"
    params: []

  - id: channel_down
    label: TV Channel Down
    kind: action
    command: "[-CB"
    params: []

  - id: select_favorite_channel
    label: Select Favorite Channel
    kind: action
    command: "[SCC000{channel}"
    params:
      - name: channel
        type: integer
        values: [1, 2, 3, 4]
        description: "1=FC1, 2=FC2, 3=FC3, 4=FC4"

  - id: set_pip_mode
    label: Set PIP Mode
    kind: action
    command: "[SDA000{mode}"
    params:
      - name: mode
        type: integer
        values: [0, 1, 2]
        description: "0=OFF, 1=PIP, 2=PBP"

  - id: set_pip_size
    label: Set PIP Size
    kind: action
    command: "[SDB000{size}"
    params:
      - name: size
        type: integer
        values: [0, 1, 2]
        description: "0=small, 1=medium, 2=large"

  # --- IR remote emulation (key) commands ---

  - id: key_off
    label: Key OFF
    kind: action
    command: "[key0002"
    params: []

  - id: key_on
    label: Key ON
    kind: action
    command: "[key0015"
    params: []

  - id: key_number
    label: Key Number
    kind: action
    command: "[key{code:04d}"
    params:
      - name: code
        type: integer
        values: [4, 5, 6, 8, 9, 10, 12, 13, 14, 17]
        description: "Digit 1-9,0 mapped to key codes 0004-0017"

  - id: key_number_100
    label: Key Number 100
    kind: action
    command: "[key0035"
    params: []

  - id: key_dash
    label: Key Dash
    kind: action
    command: "[key0023"
    params: []

  - id: key_timer_off
    label: Key Timer Off
    kind: action
    command: "[key0001"
    params: []

  - id: key_input1
    label: Key Input1
    kind: action
    command: "[key0105"
    params: []

  - id: key_input2
    label: Key Input2
    kind: action
    command: "[key0027"
    params: []

  - id: key_input3
    label: Key Input3
    kind: action
    command: "[key0028"
    params: []

  - id: key_dvi
    label: Key DVI
    kind: action
    command: "[key0102"
    params: []

  - id: key_rgb_hd
    label: Key RGB HD
    kind: action
    command: "[key0101"
    params: []

  - id: key_tv
    label: Key TV
    kind: action
    command: "[key0019"
    params: []

  - id: key_custom
    label: Key Custom
    kind: action
    command: "[key0003"
    params: []

  - id: key_isf_night
    label: Key ISF Night
    kind: action
    command: "[key0062"
    params: []

  - id: key_isf_day
    label: Key ISF Day
    kind: action
    command: "[key0031"
    params: []

  - id: key_anamorphic
    label: Key Anamorphic
    kind: action
    command: "[key0040"
    params: []

  - id: key_4x3
    label: Key 4x3
    kind: action
    command: "[key0043"
    params: []

  - id: key_letterbox
    label: Key Letterbox
    kind: action
    command: "[key0039"
    params: []

  - id: key_virtualwide
    label: Key VirtualWide
    kind: action
    command: "[key0126"
    params: []

  - id: key_right
    label: Key Right Arrow
    kind: action
    command: "[key0007"
    params: []

  - id: key_down
    label: Key Down Arrow
    kind: action
    command: "[key0016"
    params: []

  - id: key_up
    label: Key Up Arrow
    kind: action
    command: "[key0018"
    params: []

  - id: key_left
    label: Key Left Arrow
    kind: action
    command: "[key0011"
    params: []

  - id: key_enter
    label: Key Enter
    kind: action
    command: "[key0046"
    params: []

  - id: key_menu
    label: Key Menu
    kind: action
    command: "[key0026"
    params: []

  - id: key_exit
    label: Key Exit
    kind: action
    command: "[key0100"
    params: []

  - id: key_pip_aspect
    label: Key PIP Aspect Ratio
    kind: action
    command: "[key0063"
    params: []

  - id: key_pip_size
    label: Key PIP Size
    kind: action
    command: "[key0047"
    params: []

  - id: key_pip_position
    label: Key PIP Position
    kind: action
    command: "[key0034"
    params: []

  - id: key_pip
    label: Key PIP
    kind: action
    command: "[key0032"
    params: []

  - id: key_pmode
    label: Key P.MODE
    kind: action
    command: "[key0037"
    params: []

  - id: key_sswap
    label: Key S.SWAP
    kind: action
    command: "[key0052"
    params: []

  - id: key_swap
    label: Key SWAP
    kind: action
    command: "[key0033"
    params: []

  - id: key_tv_av
    label: Key TV/AV
    kind: action
    command: "[key0036"
    params: []

  - id: key_smode
    label: Key S.MODE
    kind: action
    command: "[key0053"
    params: []

  - id: key_surround
    label: Key Surround
    kind: action
    command: "[key0054"
    params: []

  - id: key_mts_sap
    label: Key MTS/SAP
    kind: action
    command: "[key0024"
    params: []

  - id: key_mute
    label: Key Mute
    kind: action
    command: "[key0091"
    params: []

  - id: key_fav_ch1
    label: Key Favorite Channel 1
    kind: action
    command: "[key0057"
    params: []

  - id: key_fav_ch2
    label: Key Favorite Channel 2
    kind: action
    command: "[key0045"
    params: []

  - id: key_fav_ch3
    label: Key Favorite Channel 3
    kind: action
    command: "[key0044"
    params: []

  - id: key_fav_ch4
    label: Key Favorite Channel 4
    kind: action
    command: "[key0055"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: string
    description: "Valid command acknowledged with ] followed by 4-digit code; invalid returns -N/A"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond volume (covered in actions)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands are ASCII. No carriage return required.
- Command Ack setting (ISF Calibration menu) controls echo/display of serial commands at source. Can be set to Off to suppress.
- Baud rate configurable via ISF Calibration menu: 115200 (default), 19200, 9600, or 2400.
- Null-modem RS-232 cable with 9-pin female connector required (pin 2=RX, 3=TX, 5=GND).
- Two command categories: direct serial commands (`[Sxx`, `[+xx`, `[-xx`) and IR remote emulation (`[key` prefix).
<!-- UNRESOLVED: no query/readback commands documented — source only describes set/action commands -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
```

Spec generated. 48 actions (20 direct serial + 28 key emulation). RS-232 only, 115200 baud default, no auth. No query/readback commands in source — feedbacks section minimal.

## Provenance

```yaml
source_domains:
  - hdtvsolutions.com
retrieved_at: 2026-04-29T22:01:17.094Z
last_checked_at: 2026-04-30T09:48:21.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:48:21.302Z
matched_actions: 63
action_count: 63
confidence: high
summary: "All 63 spec actions found as literal substrings in source with matching wire codes; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
