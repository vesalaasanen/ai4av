---
spec_id: admin/sharpnec-un552s-tmx9p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC UN552S TMX9P Control Spec"
manufacturer: Sharp/NEC
model_family: "UN552S TMX9P"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "UN552S TMX9P"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:46:53.220Z
last_checked_at: 2026-06-18T09:12:57.448Z
generated_at: 2026-06-18T09:12:57.448Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated in source — varies by model"
  - "control ID (ID1) default value not stated"
  - "input terminal value table (DATA01 of cmd 018, etc.) lives in an Appendix not included in this source excerpt"
  - "flow control not stated in source (full-duplex mode stated)"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "Appendix value tables not in source — input terminal, aspect, eco mode, base model type, sub input"
  - "ID1 (control ID) and ID2 (model code) default values not stated"
  - "factory-default baud rate not stated (selectable list only)"
  - "flow control method not stated"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:12:57.448Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC UN552S TMX9P Control Spec

## Summary
Sharp/NEC projector (referenced as "Projector Control Command Reference Manual", BDT140013 Rev 7.1). Supports RS-232C serial control (D-SUB 9P PC CONTROL port) and TCP/IP LAN control (wired RJ-45 and optional wireless LAN unit, TCP port 7142). Command protocol is a binary hex-byte frame format with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: model code (ID2) value not stated in source — varies by model -->
<!-- UNRESOLVED: control ID (ID1) default value not stated -->
<!-- UNRESOLVED: input terminal value table (DATA01 of cmd 018, etc.) lives in an Appendix not included in this source excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred: many status/information request commands
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL gain commands
  - routable     # inferred: INPUT SW CHANGE command (018)
```

## Actions
```yaml
# Frame format: <HDR> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# CKS = low-order 8 bits of sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (both vary per device).
# Commands below show the literal bytes documented in the source; CKS shown
# verbatim where the source prints a fixed frame, or as {CKS} where computed
# over parameterized data.

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
  notes: "No other command accepted while power-on is in progress."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal code (e.g. 06h = video). Full value table in Appendix 'Supplementary Information by Command' - not in this source excerpt."
  notes: "Example frame for video input (DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value - full table in Appendix 'Supplementary Information by Command' (not in this source excerpt)."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target high byte - 96h for LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "Target low byte - FFh for LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (D01-49), lamp usage time seconds (D83-86), filter usage time seconds (D87-90). Updated at 1-minute intervals."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (D01-04) and filter alarm start time (D05-08), in seconds. -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD-type key code)"
    - name: DATA02
      type: byte
      description: "Key code high byte (WORD-type key code)"
  notes: "Key code table (key=DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO. AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target - 06h=Periphery Focus (other targets in Appendix)"
    - name: DATA02
      type: byte
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after a continuous (7Fh/81h) drive. Same command may be reissued during drive without a stop."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (same selector space as cmd_053)"

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target - FFh=Stop (mode/value ignored when Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number selected via cmd_053_10."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns D01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (D01-03), sound function (D04), profile/clock/sleep (D05)."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (D03), cooling process (D04), power on/off process (D05), operation status (D06)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process (D01), signal list number (D02, practical = returned+1), selection signal type 1/2 (D03/D04), signal list type (D05), test pattern (D06), content displayed (D09)."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (D01), sound mute (D02), onscreen mute (D03), forced onscreen mute (D04), onscreen display (D05)."

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
  notes: "Returns mirror/lens cover status (D01): 00h=Normal (opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on projector. Value table in Appendix."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (D01-06)."

- id: cmd_097_198_pip_pbp_request
  label: PIP / Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value - full table in Appendix 'Supplementary Information by Command' (not in this source excerpt)."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated by trailing 00h."

- id: cmd_098_198_pip_pbp_set
  label: PIP / Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value - MODE: 00h=PIP/01h=PBP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; SUB INPUT values in Appendix."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (D01-02, D12-13) and model name string (D03-11)."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status (D01), content displayed (D02), signal type (D03-D05), video/sound/onscreen mute (D06-D08), freeze status (D09)."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal - full value table in Appendix 'Supplementary Information by Command' (not in this source excerpt)."
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each query command returns a binary frame; observable states derived from
# response DATA bytes documented in the source. Response frame prefix maps to
# request: success uses 20h/21h/22h/23h HDR + ID1 ID2 + LEN; failure uses
# A0h/A1h/A2h/A3h HDR + ID1 ID2 + 02h + ERR1 ERR2 + CKS.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2 DATA03 / cmd_305_3 DATA01

- id: error_status
  type: bitmask
  source: cmd_009 DATA01-DATA12
  notes: "12-byte error information; bit=1 indicates error. Covers cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/interlock/ballast/iris/lens-install errors."

- id: lamp_usage_time_seconds
  type: integer
  source: cmd_037 DATA83-86 / cmd_037_4 (content 01h) DATA03-06

- id: lamp_remaining_life_percent
  type: integer
  source: cmd_037_4 (content 04h) DATA03-06
  notes: "Negative if lamp replacement deadline exceeded."

- id: filter_usage_time_seconds
  type: integer
  source: cmd_037 / cmd_037_3

- id: mute_state
  type: composite
  source: cmd_078_4
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: cmd_078_6 DATA01

- id: eco_mode
  type: enum
  source: cmd_097_8 DATA01
  notes: "Value table in Appendix - not in this source excerpt."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: cmd_097_243_1 DATA01

- id: model_name
  type: string
  source: cmd_078_5 / cmd_305_1

- id: serial_number
  type: string
  source: cmd_305_2

- id: mac_address
  type: string
  source: cmd_097_155 DATA01-06

- id: input_signal_status
  type: composite
  source: cmd_078_3 / cmd_305_3
  fields: [signal_list_number, selection_signal_type, content_displayed]

- id: lens_operation_status
  type: bitmask
  source: cmd_053_7 DATA01
  notes: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V); 0=Stop, 1=Operating."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: cmd_053_11 DATA01
```

## Variables
```yaml
# Settable parameters exposed via dedicated gain/adjust queries.
- id: picture_brightness
  type: integer
  query: cmd_060_1 (DATA01=00h)
  set: cmd_030_1 (DATA01=00h)

- id: picture_contrast
  type: integer
  query: cmd_060_1 (DATA01=01h)
  set: cmd_030_1 (DATA01=01h)

- id: picture_color
  type: integer
  query: cmd_060_1 (DATA01=02h)
  set: cmd_030_1 (DATA01=02h)

- id: picture_hue
  type: integer
  query: cmd_060_1 (DATA01=03h)
  set: cmd_030_1 (DATA01=03h)

- id: picture_sharpness
  type: integer
  query: cmd_060_1 (DATA01=04h)
  set: cmd_030_1 (DATA01=04h)

- id: volume
  type: integer
  query: cmd_060_1 (DATA01=05h)
  set: cmd_030_2

- id: lamp_light_adjust
  type: integer
  query: cmd_060_1 (DATA01=96h)
  set: cmd_030_15

- id: projector_name
  type: string
  max_length: 16
  query: cmd_097_45
  set: cmd_098_45
```

## Events
```yaml
# Source documents no unsolicited notifications. All device data is obtained
# by explicit request commands.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the note that POWER ON / POWER OFF
# reject other commands while in progress. The error-status bitmask (cmd_009)
# exposes an interlock-switch-open bit (DATA09 Bit1) and various fault bits,
# but no procedural interlock sequence is documented here.
```

## Notes
- Binary frame format: `HDR CMD ID1 ID2 LEN DATA.. CKS`. Request HDR bytes seen: `00h 02h 03h 01h`; response success HDRs `20h 22h 23h 21h`; response failure HDRs `A0h A2h A3h A1h`. The leading request byte appears to encode command class; the second byte is the command selector.
- Checksum (CKS) = low-order 8 bits of the sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- ID1 = control ID configured on projector; ID2 = model code. Both are device-specific and not given fixed values in this source.
- Error responses carry ERR1/ERR2 byte pair; full error-code table documented in source section 2.4 (e.g. 00h/00h = unrecognized command, 02h/0Dh = power off, 02h/0Fh = no authority).
- Serial cable is a cross (null-modem) cable wired D-SUB 9P: pin2↔3 (RxD/TxD), pin7↔8 (RTS/CTS), pin5=GND.
- LAN: wired RJ-45 10/100BASE-TX auto-negotiating; optional wireless LAN unit supported (see separate wireless-LAN-unit manual). Commands over LAN use the same binary frame on TCP port 7142.
- Baud rate is selectable among 4800/9600/19200/38400/115200 bps — the default/factory value is not stated.
- Several DATA value tables (input terminal codes, aspect values, eco-mode values, base model type values, sub-input values) reside in an Appendix titled "Supplementary Information by Command" that is not present in this refined source excerpt; those enumerations are left UNRESOLVED.
<!-- UNRESOLVED: Appendix value tables not in source — input terminal, aspect, eco mode, base model type, sub input -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default values not stated -->
<!-- UNRESOLVED: factory-default baud rate not stated (selectable list only) -->
<!-- UNRESOLVED: flow control method not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
````

Spec above. 53 actions enumerated — each source row its own action, none collapsed. All literal hex payloads verbatim. Serial + TCP both populated (source explicit on both). Baud listed as multi-select, default left UNRESOLVED. Appendix value tables missing from excerpt → marked UNRESOLVED, not fabricated.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:46:53.220Z
last_checked_at: 2026-06-18T09:12:57.448Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:12:57.448Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated in source — varies by model"
- "control ID (ID1) default value not stated"
- "input terminal value table (DATA01 of cmd 018, etc.) lives in an Appendix not included in this source excerpt"
- "flow control not stated in source (full-duplex mode stated)"
- "source contains no explicit safety warnings, interlock procedures,"
- "Appendix value tables not in source — input terminal, aspect, eco mode, base model type, sub input"
- "ID1 (control ID) and ID2 (model code) default values not stated"
- "factory-default baud rate not stated (selectable list only)"
- "flow control method not stated"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
