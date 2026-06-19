---
spec_id: admin/sharp-nec-me651-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME651 PT Control Spec"
manufacturer: Sharp/NEC
model_family: "ME651 PT"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "ME651 PT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:38:48.861Z
last_checked_at: 2026-06-18T08:30:58.447Z
generated_at: 2026-06-18T08:30:58.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID2 (model code) byte value for ME651 PT not stated in this command reference — required for the <ID2> field in every command/response frame."
  - "control ID (ID1) default value not stated — set via projector menu."
  - "flow_control not specified."
  - "input terminal DATA01 value table is in an external \"Appendix: Supplementary Information by Command\" not present in source."
  - "flow control not stated (only \"Full duplex\" comm mode given)"
  - "not in source.\""
  - "no unsolicited notification frames documented in source. All responses are command/ack only."
  - "no multi-step sequences described in source."
  - "no explicit safety interlock procedure or power-on sequencing beyond the"
  - "ID2 model code value for ME651 PT."
  - "input terminal DATA01 code table (referenced Appendix missing from source)."
  - "aspect value table (referenced Appendix missing from source)."
  - "eco mode value table (referenced Appendix missing from source)."
  - "base model type value table (referenced Appendix missing from source)."
  - "sub input setting value table for PIP/PbP (referenced Appendix missing from source)."
  - "flow_control not specified (only \"Full duplex\" comm mode stated)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:30:58.447Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME651 PT Control Spec

## Summary
Sharp/NEC ME651 PT large-format projector. Supports RS-232C serial control via the PC CONTROL (D-SUB 9P) port and TCP/IP network control via wired/wireless LAN on port 7142. This spec covers the binary command protocol (BDT140013 Rev 7.1) — power, mute, input switching, picture/volume/aspect/lens adjustment, lens memory, shutter, freeze, eco mode, edge blending, PIP/PBP, and an extensive set of status/information requests.

<!-- UNRESOLVED: ID2 (model code) byte value for ME651 PT not stated in this command reference — required for the <ID2> field in every command/response frame. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated — set via projector menu. -->
<!-- UNRESOLVED: flow_control not specified. -->
<!-- UNRESOLVED: input terminal DATA01 value table is in an external "Appendix: Supplementary Information by Command" not present in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate:
    # source lists multiple selectable rates
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (only "Full duplex" comm mode given)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands (015, 016)
  - queryable       # inferred from extensive status/information request commands
  - routable        # inferred from INPUT SW CHANGE (018)
  - levelable       # inferred from PICTURE/VOLUME/OTHER ADJUST and lens control
```

## Actions
```yaml
# Frame layout: <cmd-byte> <op> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID (projector-set), ID2 = model code, CKS = low byte of sum of all preceding bytes.
# Parameterized commands show <DATA> placeholders; literal commands shown verbatim.
actions:
  - id: cmd_009_error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: cmd_016_power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: cmd_018_input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal code (e.g. 06h = video port). Full table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."

  - id: cmd_020_picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: cmd_021_picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video signal switch or volume adjustment."

  - id: cmd_023_sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: cmd_025_onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: cmd_030_2_volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: cmd_030_12_aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Aspect value - full table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."

  - id: cmd_030_15_other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
      - name: data03
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: cmd_037_information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: cmd_037_3_filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: integer
        description: "Key code high byte (00h for all listed keys)"

  - id: cmd_051_shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 06h=Periphery Focus (only value listed in source)"
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "Continuous drive (7Fh/81h) requires 00h to stop."

  - id: cmd_053_1_lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: Target (same set as LENS CONTROL, e.g. 06h=Periphery Focus)
    notes: "Returns upper/lower limit + current value of adjustment range."

  - id: cmd_053_2_lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target (FFh=Stop - when stop, mode/value ignored)"
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: cmd_053_3_lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) - each 0=Stop / 1=During operation."

  - id: cmd_053_10_lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: cmd_060_1_gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile function (DATA05)."

  - id: cmd_078_2_running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power process flags, operation status."

  - id: cmd_078_3_input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types, content displayed."

  - id: cmd_078_4_mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + onscreen display flags."

  - id: cmd_078_5_model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: cmd_079_freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: cmd_084_information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode / Lamp mode value depending on projector. Value table in Appendix - UNRESOLVED."

  - id: cmd_097_45_lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: cmd_097_155_lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: cmd_097_198_pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: cmd_098_8_eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Eco mode value - table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."

  - id: cmd_098_45_lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (DATA01-16, up to 16 bytes), NUL-terminated via trailing 00h."

  - id: cmd_098_198_pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in Appendix - UNRESOLVED."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) + model name (DATA03-11). Type table in Appendix - UNRESOLVED."

  - id: cmd_305_2_serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (DATA01-16, NUL-terminated)."

  - id: cmd_305_3_basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: cmd_319_10_audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal - table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
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
    source: "078-2 RUNNING STATUS REQUEST / 305-3 BASIC INFORMATION REQUEST"
  - id: error_status
    type: bitfield
    description: "12-byte error/status bitfield from 009 ERROR STATUS REQUEST (cover, fan, temp, lamp, etc.)"
  - id: input_signal_status
    type: object
    description: "From 078-3 INPUT STATUS REQUEST - signal list number, signal types, content displayed."
  - id: mute_status
    type: object
    description: "From 078-4 - picture/sound/onscreen/forced onscreen mute + onscreen display."
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
  - id: lens_operation_status
    type: bitfield
    description: "From 053-7 - bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V."
```

## Variables
```yaml
variables:
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037 / 037-4 - updated at 1-minute intervals."
  - id: lamp_remaining_life_percent
    type: integer
    unit: percent
    source: "037-4 (content 04h). Negative if replacement deadline exceeded."
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037 / 037-3"
  - id: filter_alarm_start_time
    type: integer
    unit: seconds
    source: "037-3 - -1 if undefined."
  - id: carbon_savings_total
    type: number
    unit: kilogram
    source: "037-6 (DATA01=00h)"
  - id: carbon_savings_operation
    type: number
    unit: kilogram
    source: "037-6 (DATA01=01h)"
  - id: picture_brightness
    type: integer
    source: "030-1 (DATA01=00h) / 060-1 (00h)"
  - id: picture_contrast
    type: integer
    source: "030-1 (01h) / 060-1 (01h)"
  - id: picture_color
    type: integer
    source: "030-1 (02h) / 060-1 (02h)"
  - id: picture_hue
    type: integer
    source: "030-1 (03h) / 060-1 (03h)"
  - id: picture_sharpness
    type: integer
    source: "030-1 (04h) / 060-1 (04h)"
  - id: volume
    type: integer
    source: "030-2 / 060-1 (05h)"
  - id: lamp_light_adjust
    type: integer
    source: "030-15 (96h) / 060-1 (96h)"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification frames documented in source. All responses are command/ack only.
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
interlocks:
  - "During POWER ON (015), no other command accepted until power-on completes."
  - "During POWER OFF (016), no other command accepted until cooling finishes."
  - "Forced onscreen mute (ERR 02h 04h) blocks certain commands."
  - "Command rejected when power is off (ERR 02h 0Dh)."
  - "Interlock switch open is reported via 009 ERROR STATUS (DATA09 bit1)."
# UNRESOLVED: no explicit safety interlock procedure or power-on sequencing beyond the
# above implicit lockouts stated in source.
```

## Notes
- Reference manual: BDT140013 Revision 7.1. Generic NEC projector command set — applies across many models; not ME651 PT specific in framing.
- All command/response frames are binary hex; CKS = low-order byte of sum of all preceding bytes (incl. the leading cmd byte, op, ID1, ID2, LEN, and DATA).
- Response leading byte encodes class: `2xh` success ack, `Axh` error ack (where x = command-group nibble matching the request).
- Lamp/filter usage times update at 1-minute intervals despite 1-second resolution.
- 050 REMOTE KEY CODE emulates the IR remote — useful for one-shot commands (AUTO, ASPECT, SOURCE, MENU nav) lacking dedicated opcodes.
- ID2 (model code) byte is model-specific and not in this reference — must be obtained from the model's operation manual or discovered by sniffing an existing controller.
<!-- UNRESOLVED: ID2 model code value for ME651 PT. -->
<!-- UNRESOLVED: input terminal DATA01 code table (referenced Appendix missing from source). -->
<!-- UNRESOLVED: aspect value table (referenced Appendix missing from source). -->
<!-- UNRESOLVED: eco mode value table (referenced Appendix missing from source). -->
<!-- UNRESOLVED: base model type value table (referenced Appendix missing from source). -->
<!-- UNRESOLVED: sub input setting value table for PIP/PbP (referenced Appendix missing from source). -->
<!-- UNRESOLVED: flow_control not specified (only "Full duplex" comm mode stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

53 commands enumerated. Serial (multi-baud) + TCP 7142 both in source → emitted both. ID2 model code + appendix tables flagged UNRESOLVED (referenced but not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:38:48.861Z
last_checked_at: 2026-06-18T08:30:58.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:30:58.447Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID2 (model code) byte value for ME651 PT not stated in this command reference — required for the <ID2> field in every command/response frame."
- "control ID (ID1) default value not stated — set via projector menu."
- "flow_control not specified."
- "input terminal DATA01 value table is in an external \"Appendix: Supplementary Information by Command\" not present in source."
- "flow control not stated (only \"Full duplex\" comm mode given)"
- "not in source.\""
- "no unsolicited notification frames documented in source. All responses are command/ack only."
- "no multi-step sequences described in source."
- "no explicit safety interlock procedure or power-on sequencing beyond the"
- "ID2 model code value for ME651 PT."
- "input terminal DATA01 code table (referenced Appendix missing from source)."
- "aspect value table (referenced Appendix missing from source)."
- "eco mode value table (referenced Appendix missing from source)."
- "base model type value table (referenced Appendix missing from source)."
- "sub input setting value table for PIP/PbP (referenced Appendix missing from source)."
- "flow_control not specified (only \"Full duplex\" comm mode stated)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
