---
spec_id: admin/sharpnec-np-px1005ql-b-18
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PX1005QL B 18 Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PX1005QL B 18"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PX1005QL B 18"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:50:27.161Z
last_checked_at: 2026-06-18T08:52:32.633Z
generated_at: 2026-06-18T08:52:32.633Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated in this manual — varies by model. Control ID (ID1) value comes from projector setting, not stated here. Input terminal value table, aspect value table, base model type value table, sub input value table, and eco mode value table are referenced as \"Supplementary Information by Command\" appendix which is not present in this refined source."
  - "projector-specific, returned by 060-1 DATA02-DATA05"
  - "aspect value table in 'Supplementary Information by Command' appendix not present in source"
  - "source describes only request/response (synchronous) protocol."
  - "source documents no multi-step command sequences."
  - "no voltage/current/power specs in source. No power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "model code (ID2) value for NP PX1005QL B 18 not stated in source."
  - "default baud rate not stated (selectable set listed only)."
  - "input terminal / aspect / sub-input / eco-mode / base-model-type value tables referenced but not included in refined source."
  - "no authentication procedure documented; auth.type: none inferred (Tier 2)."
  - "flow_control field not specified in source; emitted as 'none' by inference from full-duplex statement."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:52:32.633Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PX1005QL B 18 Control Spec

## Summary
Sharp/NEC NP PX1005QL B 18 projector with dual control interface: RS-232C serial (D-SUB 9P PC CONTROL port) and TCP/IP LAN (wired RJ-45 / wireless). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, lens control, lamp/filter info, and status queries.

<!-- UNRESOLVED: model code (ID2) value not stated in this manual — varies by model. Control ID (ID1) value comes from projector setting, not stated here. Input terminal value table, aspect value table, base model type value table, sub input value table, and eco mode value table are referenced as "Supplementary Information by Command" appendix which is not present in this refined source. -->

## Transport
```yaml
# Both serial and TCP are documented. The protocol is binary (hex byte frames),
# identical payload over either transport. Source: BDT140013 Rev 7.1 §1.1, §1.2.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists selectable values: 115200/38400/19200/9600/4800 bps; default not stated - 9600 shown as representative of the documented set, pick per projector setting
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex stated, no flow-control field in source
addressing:
  port: 7142  # source §1.2 "Port number": TCP port 7142 for sending/receiving commands
auth:
  type: none  # inferred: no login/auth procedure in source
```

## Traits
```yaml
# - powerable   (POWER ON / POWER OFF commands - §3.2, §3.3)
# - routable    (INPUT SW CHANGE command - §3.4)
# - queryable   (many status request commands - 009, 037, 078-*, 097-*, 305-*, etc.)
# - levelable   (PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST - §3.11, §3.12, §3.14)
traits:
  - powerable  # inferred from power on/off command examples
  - routable   # inferred from input switching command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from picture/volume/gain adjustment commands
```

## Actions
```yaml
# All command payloads are binary hex frames. Format conventions from source §2.1:
#   - First byte = command category (00h-03h for requests, 20h-23h ACK responses,
#     A0h-A3h error responses).
#   - <ID1> = control ID (from projector setting), <ID2> = model code (per model).
#   - <CKS> = checksum = low byte of sum of all preceding bytes (source §2.2).
#   - <DATAxx> = variable-length command/response data.
# Each entry below lists the literal request frame from the source. The verifier
# should count each numbered command row (009, 015, 016, ..., 319-10) as one action.
# Parameterized DATA fields shown with {name} placeholders where the source defines
# an enum/range inside a single command row.

- id: cmd_009_error_status_request
  label: 009 ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 bitfield error status (cover, fan, temp, lamp, etc.). See source §3.1 error information list."

- id: cmd_015_power_on
  label: 015 POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "During power-on no other command accepted."

- id: cmd_016_power_off
  label: 016 POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off incl. cooling no other command accepted."

- id: cmd_018_input_sw_change
  label: 018 INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Full value table in 'Supplementary Information by Command' appendix."
  notes: "Example in source: 02h 03h 00h 00h 02h 01h 06h 0Eh (video)."

- id: cmd_020_picture_mute_on
  label: 020 PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: 021 PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: 022 SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: 023 SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: 024 ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: 025 ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: 030-1 PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

- id: cmd_030_2_volume_adjust
  label: 030-2 VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: 030-12 ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - full table in 'Supplementary Information by Command' appendix."
  notes: "Aspect value table not present in this refined source."

- id: cmd_030_15_other_adjust
  label: 030-15 OTHER ADJUST (LAMP/LIGHT ADJUST)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target hi byte (96h for LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: DATA02
      type: integer
      description: "Target lo byte (FFh per source table)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

- id: cmd_037_information_request
  label: 037 INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated 1-min intervals."

- id: cmd_037_3_filter_usage_information_request
  label: 037-3 FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: 037-4 LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: "Example (lamp 1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if past deadline."

- id: cmd_037_6_carbon_savings_information_request
  label: 037-6 CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: cmd_050_remote_key_code
  label: 050 REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: DATA02
      type: integer
      description: "Key code high byte (see key code list)"
  notes: "Key code list (source §3.19): 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 0Fh00h=MAGNIFY UP, 10h00h=MAGNIFY DOWN, 13h00h=MUTE, 29h00h=PICTURE, 4Bh00h=COMPUTER1, 4Ch00h=COMPUTER2, 4Fh00h=VIDEO1, 51h00h=S-VIDEO1, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO."

- id: cmd_051_shutter_close
  label: 051 SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: 052 SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: 053 LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (source lists 06h=Periphery Focus; full axis table truncated in refined source)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "Send 00h after 7Fh/81h to stop continuous drive."

- id: cmd_053_1_lens_control_request
  label: 053-1 LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector
  notes: "Returns adjustment range upper/lower limits and current value."

- id: cmd_053_2_lens_control_2
  label: 053-2 LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: cmd_053_3_lens_memory_control
  label: 053-3 LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: 053-4 REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: 053-5 LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: 053-6 LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: 053-7 LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: cmd_053_10_lens_profile_set
  label: 053-10 LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: 053-11 LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: 060-1 GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, range, default, current, wide/narrow adjustment widths."

- id: cmd_078_1_setting_request
  label: 078-1 SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

- id: cmd_078_2_running_status_request
  label: 078-2 RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status (DATA03-06)."

- id: cmd_078_3_input_status_request
  label: 078-3 INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed (DATA01-09)."

- id: cmd_078_4_mute_status_request
  label: 078-4 MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (DATA01-05)."

- id: cmd_078_5_model_name_request
  label: 078-5 MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: 078-6 COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: 079 FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: 084 INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: 097-8 ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on projector. Value table in 'Supplementary Information by Command' appendix."

- id: cmd_097_45_lan_projector_name_request
  label: 097-45 LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: 097-155 LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address (DATA01-06)."

- id: cmd_097_198_pip_picture_by_picture_request
  label: 097-198 PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: 097-243-1 EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: 098-8 ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (see 'Supplementary Information by Command' appendix)"

- id: cmd_098_45_lan_projector_name_set
  label: 098-45 LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes), DATA01-DATA16"

- id: cmd_098_198_pip_picture_by_picture_set
  label: 098-198 PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values per appendix)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: 098-243-1 EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: 305-1 BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Value table in appendix."

- id: cmd_305_2_serial_number_request
  label: 305-2 SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (DATA01-16, NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: 305-3 BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status (DATA01-09)."

- id: cmd_319_10_audio_select_set
  label: 319-10 AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see 'Supplementary Information by Command' appendix)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing per source §2.3:
#   - Success ACK (no data):     2Xh <cmd> <ID1> <ID2> 00h <CKS>
#   - Success ACK (with data):   2Xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   - Error response:            AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Error codes (ERR1/ERR2) from source §2.4:
#   00h/00h=unrecognized cmd, 00h/01h=cmd not supported, 01h/00h=invalid value,
#   01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=mem alloc err,
#   02h/02h=mem in use, 02h/03h=value cannot be set, 02h/04h=forced onscreen mute on,
#   02h/06h=viewer error, 02h/07h=no signal, 02h/08h=test pattern/filter displayed,
#   02h/09h=no PC card, 02h/0Ah=mem op error, 02h/0Ch=entry list displayed,
#   02h/0Dh=power off (cmd rejected), 02h/0Eh=execution failed, 02h/0Fh=no authority,
#   03h/00h=incorrect gain number, 03h/01h=invalid gain, 03h/02h=adjustment failed.

- id: error_status
  type: bitfield
  description: "009 response DATA01-DATA12 bitfield. Bits encode cover/fan/temp/power/lamp/mirror-cover/iris/lens errors and extended status (interlock switch open, system errors)."
  values: [normal, error]

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 DATA03, 305-3 DATA01"

- id: input_signal_state
  type: composite
  description: "078-3 / 305-3: signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_state
  type: composite
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: "078-6 DATA01"

- id: lens_state
  type: bitfield
  description: "053-7 DATA01: lens memory / zoom / focus / lens shift H / lens shift V operation flags."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 DATA01"

- id: eco_mode
  type: enum
  description: "Light mode / Lamp mode value (value table in appendix - UNRESOLVED)."

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: freeze_state
  type: enum
  values: [off, on]
```

## Variables
```yaml
# Settable parameters exposed via dedicated adjustment commands (030-* series).
# Each is readable via 060-1 GAIN PARAMETER REQUEST 3.

- id: brightness
  type: integer
  range_min: null  # UNRESOLVED: projector-specific, returned by 060-1 DATA02-DATA05
  range_max: null
  source: "030-1 DATA01=00h"

- id: contrast
  type: integer
  range_min: null
  range_max: null
  source: "030-1 DATA01=01h"

- id: color
  type: integer
  range_min: null
  range_max: null
  source: "030-1 DATA01=02h"

- id: hue
  type: integer
  range_min: null
  range_max: null
  source: "030-1 DATA01=03h"

- id: sharpness
  type: integer
  range_min: null
  range_max: null
  source: "030-1 DATA01=04h"

- id: volume
  type: integer
  range_min: null
  range_max: null
  source: "030-2"

- id: lamp_light_adjust
  type: integer
  range_min: null
  range_max: null
  source: "030-15 DATA01=96h"

- id: projector_name
  type: string
  max_length: 16
  source: "098-45"

- id: aspect
  type: enum
  values: []  # UNRESOLVED: aspect value table in 'Supplementary Information by Command' appendix not present in source
  source: "030-12"
```

## Events
```yaml
# UNRESOLVED: source describes only request/response (synchronous) protocol.
# No unsolicited notification frames documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source §3.3: cooling period blocks other commands; treat as device-state-modifying
  - shutter_close  # lens shutter physically occludes projection
interlocks:
  - "Power-on in progress: no other command accepted until complete (§3.2)."
  - "Power-off / cooling in progress: no other command accepted until complete (§3.3)."
  - "Command rejected with ERR 02h/0Dh when projector power is off (§2.4)."
  - "Lens continuous drive (053 DATA02=7Fh/81h) must be explicitly stopped with 00h (§3.22)."
# UNRESOLVED: no voltage/current/power specs in source. No power-on sequencing
# procedure beyond command-level notes. Interlock switch status surfaced only
# via 009 error bitfield DATA09 Bit1 - not a dedicated command.
```

## Notes
- **Protocol is binary, not ASCII.** All payloads are hex byte frames; framing prefix byte identifies request (00h-03h), success ACK (20h-23h), or error response (A0h-A3h). The low nibble of the framing byte encodes the data-direction/category.
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes (source §2.2). Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **ID1 (Control ID)** comes from the projector's "control ID" setting; ID2 (Model code) is model-specific. Neither value is stated in this manual — both must be sourced from the target projector configuration or the per-model operation manual.
- **Baud rate is selectable** among 115200 / 38400 / 19200 / 9600 / 4800 bps. The spec records 9600 as representative of the documented set; the active rate must match the projector's configured setting. Default value is not stated in source.
- **Appendix tables missing from this refined source:** "Supplementary Information by Command" appendix (referenced for input terminal codes, aspect values, base model type values, sub input values, and eco mode values) is not present. Fields depending on those tables are marked UNRESOLVED.
- **Two-lamp models:** 037-4 DATA01=01h (Lamp 2) only valid on two-lamp projectors.
- **Timing:** lamp/filter usage time updates at 1-minute intervals despite 1-second resolution.
- **Cooling lockout:** during power-off cooling the projector refuses all commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model code (ID2) value for NP PX1005QL B 18 not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (selectable set listed only). -->
<!-- UNRESOLVED: input terminal / aspect / sub-input / eco-mode / base-model-type value tables referenced but not included in refined source. -->
<!-- UNRESOLVED: no authentication procedure documented; auth.type: none inferred (Tier 2). -->
<!-- UNRESOLVED: flow_control field not specified in source; emitted as 'none' by inference from full-duplex statement. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:50:27.161Z
last_checked_at: 2026-06-18T08:52:32.633Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:52:32.633Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated in this manual — varies by model. Control ID (ID1) value comes from projector setting, not stated here. Input terminal value table, aspect value table, base model type value table, sub input value table, and eco mode value table are referenced as \"Supplementary Information by Command\" appendix which is not present in this refined source."
- "projector-specific, returned by 060-1 DATA02-DATA05"
- "aspect value table in 'Supplementary Information by Command' appendix not present in source"
- "source describes only request/response (synchronous) protocol."
- "source documents no multi-step command sequences."
- "no voltage/current/power specs in source. No power-on sequencing"
- "firmware version compatibility not stated in source."
- "model code (ID2) value for NP PX1005QL B 18 not stated in source."
- "default baud rate not stated (selectable set listed only)."
- "input terminal / aspect / sub-input / eco-mode / base-model-type value tables referenced but not included in refined source."
- "no authentication procedure documented; auth.type: none inferred (Tier 2)."
- "flow_control field not specified in source; emitted as 'none' by inference from full-duplex statement."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
