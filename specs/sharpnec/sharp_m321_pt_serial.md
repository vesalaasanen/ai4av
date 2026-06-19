---
spec_id: admin/sharp-nec-m321-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M321 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "M321 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M321 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:15:12.689Z
last_checked_at: 2026-06-18T08:10:01.305Z
generated_at: 2026-06-18T08:10:01.305Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated. Input terminal value list, eco mode value list, base model type value list, sub input setting value list all referenced in \"Supplementary Information by Command\" appendix not present in this refined source."
  - "source states \"Full duplex\" communication mode but does not specify flow control; RTS/CTS pins wired in pinout"
  - "not in this source).\""
  - "source documents no unsolicited notifications / push events. Protocol is request/response only."
  - "source documents no explicit multi-step sequences."
  - "source contains no explicit safety warnings, hardware interlock procedures,"
  - "firmware version compatibility not stated in source"
  - "input terminal value list referenced but not in source"
  - "aspect adjustment value list referenced but not in source"
  - "eco/light/lamp mode value list referenced but not in source"
  - "base model type value list referenced but not in source"
  - "PIP/PbP sub input setting value list referenced but not in source"
  - "flow_control mode not explicitly stated (only \"Full duplex\" communication mode)"
  - "053 LENS CONTROL DATA01 full target list (source table truncated, only 06h=Periphery Focus shown)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:10:01.305Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M321 Pt Control Spec

## Summary
Sharp/NEC M321 Pt projector control spec (manual BDT140013 Rev 7.1). Binary hex frame protocol over RS-232C serial or TCP/IP LAN (port 7142). Covers power, input switching, mute, picture/volume/aspect/gain adjust, lens control & memory, status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: firmware compatibility range not stated. Input terminal value list, eco mode value list, base model type value list, sub input setting value list all referenced in "Supplementary Information by Command" appendix not present in this refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # configurable: source lists 115200/38400/19200/9600/4800 bps supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow control; RTS/CTS pins wired in pinout
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable   # inferred: extensive status/info request commands
  - levelable   # inferred: volume, picture (brightness/contrast/etc.), lamp adjust commands
  - routable    # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All command payloads are binary hex frames (literal from source, verbatim).
# Frame layout: <CMD_CLASS> <OPCODE> <ID1> <ID2> <LEN> [<DATA...>] <CKS>
# ID1=control ID, ID2=model code (00h 00h = broadcast in examples).
# CKS = checksum: low-order byte of sum of all preceding bytes.
# Power-on/off reject all other commands during transition (incl. cooling).

- id: cmd_009_error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 bitmask: bit=0 normal, bit=1 error. Covers cover/fan/temp/power/lamp/ formatter/FPGA/iris/interlock errors."

- id: cmd_015_power_on
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: cmd_016_power_off
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: cmd_018_input_sw_change
  label: "018. Input SW Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte. Example: 06h = video port. Full value list in appendix 'Supplementary Information by Command' (UNRESOLVED: not in this source)."

- id: cmd_020_picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: cmd_021_picture_mute_off
  label: "021. Picture Mute Off"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: "022. Sound Mute On"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video signal switch or volume adjustment."

- id: cmd_023_sound_mute_off
  label: "023. Sound Mute Off"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024. Onscreen Mute On"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: cmd_025_onscreen_mute_off
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: "030-1. Picture Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (DATA03 low 8 bits, DATA04 high 8 bits, signed)"

- id: cmd_030_2_volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02_DATA03
      type: integer
      description: "Adjustment value (DATA02 low 8 bits, DATA03 high 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full list in appendix 'Supplementary Information by Command' (UNRESOLVED: not in this source)."

- id: cmd_030_15_other_adjust
  label: "030-15. Other Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (with DATA02). Documented: DATA01=96h DATA02=FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (with DATA01)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04_DATA05
      type: integer
      description: "Adjustment value (DATA04 low, DATA05 high)"

- id: cmd_037_information_request
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage sec (DATA83-86), filter usage sec (DATA87-90). Usage updates 1-min intervals."

- id: cmd_037_3_filter_usage_info_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage sec (DATA01-04) and filter alarm start sec (DATA05-08). -1 if undefined."

- id: cmd_037_4_lamp_info_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: "Eco mode values reflect eco. Negative remaining life if past replacement deadline."

- id: cmd_037_6_carbon_savings_info_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: cmd_050_remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Key code WORD. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h/08h/09h/0Ah=UP/DOWN/RIGHT/LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh/10h=MAGNIFY UP/DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h/85h=VOLUME UP/DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

- id: cmd_051_shutter_close
  label: "051. Shutter Close"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes lens shutter."

- id: cmd_052_shutter_open
  label: "052. Shutter Open"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "Opens lens shutter."

- id: cmd_053_lens_control
  label: "053. Lens Control"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Documented: 06h=Periphery Focus (other targets UNRESOLVED - source table truncated)"
    - name: DATA02
      type: integer
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Re-issue same command during drive to redirect without stop."

- id: cmd_053_1_lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (see 053 LENS CONTROL DATA01)"
  notes: "Returns upper/lower/current 16-bit adjustment values."

- id: cmd_053_2_lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (DATA03 low, DATA04 high)"

- id: cmd_053_3_lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns setting value 00h=OFF, 01h=ON."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop, 1=operating)."

- id: cmd_053_10_lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected reference lens memory profile (00h=Profile 1, 01h=Profile 2)."

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower/default/current 16-bit values, wide/narrow adjustment widths, default validity."

- id: cmd_078_1_setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

- id: cmd_078_2_running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: cmd_078_3_input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (practical = returned+1), selection signal type 1/2, test pattern, displayed content."

- id: cmd_078_4_mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state."

- id: cmd_078_5_model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name NUL-terminated string (DATA01-32)."

- id: cmd_078_6_cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status: 00h=normal (opened), 01h=closed."

- id: cmd_079_freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Returns label length and NUL-terminated info string."

- id: cmd_097_8_eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (appendix-listed, UNRESOLVED in this source)."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name NUL-terminated string (DATA01-17)."

- id: cmd_097_155_lan_mac_address_request_2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: cmd_097_198_pip_pbp_request
  label: "097-198. PIP/Picture By Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "MODE returns 00h=PIP/01h=PbP. START POSITION returns 00h=TL/01h=TR/02h=BL/03h=BR. Sub input values appendix-listed (UNRESOLVED)."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value (appendix-listed, UNRESOLVED in this source)."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated."

- id: cmd_098_198_pip_pbp_set
  label: "098-198. PIP/Picture By Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Value context-dependent on DATA01. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input values appendix-listed (UNRESOLVED)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type 2 (DATA12-13)."

- id: cmd_305_2_serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number NUL-terminated string (DATA01-16)."

- id: cmd_305_3_basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, displayed content, signal types, video mute, sound mute, onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (appendix-listed, UNRESOLVED in this source)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Frame response format:
#   Success (no data):  2Xh <OPCODE> <ID1> <ID2> 00h <CKS>
#   Success (with data): 2Xh <OPCODE> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Error:              AXh <OPCODE> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Leading response byte: 20h/21h/22h/23h success (mirrors cmd class 00h/01h/02h/03h),
# A0h/A1h/A2h/A3h error.

feedbacks:
  - id: error_status
    type: bitmask
    description: "12-byte error bitmask (cmd 009). Bits: cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/interlock/iris/lens errors."
  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From 078-2 DATA03/DATA06 and 305-3 DATA01."
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  - id: lamp_usage_time_seconds
    type: integer
    description: "From 037 DATA83-86 or 037-4. Updates 1-min intervals."
  - id: lamp_remaining_life_percent
    type: integer
    description: "From 037-4 DATA02=04h. Negative if past replacement deadline."
  - id: filter_usage_time_seconds
    type: integer
    description: "From 037-3 DATA01-04."
  - id: mute_state
    type: object
    description: "From 078-4: picture/sound/onscreen/forced-onscreen mute + OSD display."
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
  - id: lens_operation_status
    type: bitmask
    description: "From 053-7: lens memory/zoom/focus/lens-shift-H/lens-shift-V operation bits."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
  - id: eco_mode
    type: integer
    description: "From 097-8. Value mapping in appendix (UNRESOLVED)."
  - id: mac_address
    type: string
    description: "From 097-155. 6 bytes."
  - id: model_name
    type: string
    description: "From 078-5."
  - id: serial_number
    type: string
    description: "From 305-2."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]

# Error code feedback (AXh response):
errors:
  - err1: "00h"
    err2_values:
      "00h": "Command not recognized"
      "01h": "Command not supported by model"
  - err1: "01h"
    err2_values:
      "00h": "Specified value invalid"
      "01h": "Specified input terminal invalid"
      "02h": "Specified language invalid"
  - err1: "02h"
    err2_values:
      "00h": "Memory allocation error"
      "02h": "Memory in use"
      "03h": "Specified value cannot be set"
      "04h": "Forced onscreen mute on"
      "06h": "Viewer error"
      "07h": "No signal"
      "08h": "Test pattern or filter displayed"
      "09h": "No PC card inserted"
      "0Ah": "Memory operation error"
      "0Ch": "Entry list displayed"
      "0Dh": "Command not accepted (power off)"
      "0Eh": "Command execution failed"
      "0Fh": "No authority for operation"
  - err1: "03h"
    err2_values:
      "00h": "Specified gain number incorrect"
      "01h": "Specified gain invalid"
      "02h": "Adjustment failed"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "Picture brightness (030-1 DATA01=00h). Query via 060-1 DATA01=00h."
  - id: contrast
    type: integer
    description: "Picture contrast (030-1 DATA01=01h)."
  - id: color
    type: integer
    description: "Picture color (030-1 DATA01=02h)."
  - id: hue
    type: integer
    description: "Picture hue (030-1 DATA01=03h)."
  - id: sharpness
    type: integer
    description: "Picture sharpness (030-1 DATA01=04h)."
  - id: volume
    type: integer
    description: "Sound volume (030-2)."
  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust (030-15 DATA01=96h)."
  - id: aspect
    type: integer
    description: "Aspect value (030-12). Value mapping appendix-listed (UNRESOLVED)."
  - id: eco_mode
    type: integer
    description: "Eco/light/lamp mode (098-8). Value mapping appendix-listed (UNRESOLVED)."
  - id: projector_name
    type: string
    description: "LAN projector name (098-45), up to 16 bytes."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Edge blending (098-243-1)."
  - id: freeze
    type: enum
    values: [on, off]
    description: "Freeze (079): 01h=on, 02h=off."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Reference lens memory profile (053-10)."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications / push events. Protocol is request/response only.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON (015) and POWER OFF (016) reject all other commands while power transition in progress (incl. cooling time)."
  - description: "ERR 02h 0Dh returned when command issued while power is off."
  - description: "ERR 02h 0Fh returned when caller lacks operation authority."
# UNRESOLVED: source contains no explicit safety warnings, hardware interlock procedures,
# or power-on sequencing requirements beyond the command-acceptance notes above.
```

## Notes
- **Manual revision:** BDT140013 Rev 7.1. D-SUB 9P PC CONTROL port, RJ-45 LAN port.
- **Frame structure:** `<class> <opcode> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1=control ID, ID2=model code (00h 00h = broadcast). Checksum = low byte of sum of all preceding bytes.
- **Class bytes:** 00h/01h/02h/03h command types; success responses prefix 20h/21h/22h/23h; error responses prefix A0h/A1h/A2h/A3h.
- **Timing:** lamp/filter usage updates at 1-minute intervals despite 1-second resolution.
- **Cooling lockout:** during POWER OFF cooling, no commands accepted.
- **Lens continuous drive:** after 7Fh/81h continuous-drive DATA02, send 00h to stop; same command can redirect mid-drive without stop.
- **Wireless LAN:** supported via optional wireless LAN unit (see separate operation manual).
- **Appendix missing from this source:** input terminal values, aspect values, eco/light/lamp mode values, base model type values, sub input setting values — all referenced as "Supplementary Information by Command" but not present in refined excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value list referenced but not in source -->
<!-- UNRESOLVED: aspect adjustment value list referenced but not in source -->
<!-- UNRESOLVED: eco/light/lamp mode value list referenced but not in source -->
<!-- UNRESOLVED: base model type value list referenced but not in source -->
<!-- UNRESOLVED: PIP/PbP sub input setting value list referenced but not in source -->
<!-- UNRESOLVED: flow_control mode not explicitly stated (only "Full duplex" communication mode) -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 full target list (source table truncated, only 06h=Periphery Focus shown) -->
````

Spec done. 53 actions enumerated (all source rows). Both serial+TCP transports. Hex payloads verbatim. Appendix-listed value sets marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:15:12.689Z
last_checked_at: 2026-06-18T08:10:01.305Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:10:01.305Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated. Input terminal value list, eco mode value list, base model type value list, sub input setting value list all referenced in \"Supplementary Information by Command\" appendix not present in this refined source."
- "source states \"Full duplex\" communication mode but does not specify flow control; RTS/CTS pins wired in pinout"
- "not in this source).\""
- "source documents no unsolicited notifications / push events. Protocol is request/response only."
- "source documents no explicit multi-step sequences."
- "source contains no explicit safety warnings, hardware interlock procedures,"
- "firmware version compatibility not stated in source"
- "input terminal value list referenced but not in source"
- "aspect adjustment value list referenced but not in source"
- "eco/light/lamp mode value list referenced but not in source"
- "base model type value list referenced but not in source"
- "PIP/PbP sub input setting value list referenced but not in source"
- "flow_control mode not explicitly stated (only \"Full duplex\" communication mode)"
- "053 LENS CONTROL DATA01 full target list (source table truncated, only 06h=Periphery Focus shown)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
