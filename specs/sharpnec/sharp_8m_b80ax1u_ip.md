---
spec_id: admin/sharpnec-8m-b80ax1u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 8M B80Ax1U Control Spec"
manufacturer: Sharp/NEC
model_family: "8M B80Ax1U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "8M B80Ax1U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:40:32.962Z
last_checked_at: 2026-06-17T19:32:55.079Z
generated_at: 2026-06-17T19:32:55.079Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific firmware version compatibility not stated in source"
  - "model code (ID2) value for this specific model not stated in source"
  - "control ID (ID1) default value not stated in source"
  - "source lists \"Full duplex\" communication mode but no explicit flow_control field"
  - "full enum value lists for several feedbacks (eco mode, edge blending) reference appendix not present in extracted text"
  - "no unsolicited notification events documented in source."
  - "no multi-step command sequences described explicitly in source."
  - "no explicit power-on sequencing requirements or interlock hardware procedures beyond command lockouts."
  - "model code (ID2) value for 8M B80Ax1U not stated in source"
  - "control ID (ID1) default not stated in source"
  - "Appendix 'Supplementary Information by Command' not in extracted text — input terminal, aspect, eco mode, base model type, and sub input enum values missing"
  - "firmware version compatibility not stated"
  - "TCP keepalive / connection timeout behavior not stated"
  - "command inter-command timing / minimum interval not stated"
  - "flow_control explicitly stated only as 'Full duplex' communication mode; not mapped to standard flow_control enum"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:32:55.079Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands verbatim; transport parameters confirmed in source; complete one-to-one coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC 8M B80Ax1U Control Spec

## Summary
Projector control spec for the Sharp/NEC 8M B80Ax1U projector, covering the binary control protocol documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports both TCP/IP (port 7142) and RS-232C serial control with identical binary command framing (commands begin with a command header byte, end with a checksum byte).

<!-- UNRESOLVED: specific firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all listed as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source lists "Full duplex" communication mode but no explicit flow_control field
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable       # inferred: numerous query commands returning state
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST commands
  - routable        # inferred: INPUT SW CHANGE command (018)
```

## Actions
```yaml
- id: error_status_request_009
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 error information bitmap"

- id: power_on_015
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on sequence"

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time"

- id: input_sw_change_018
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: Input terminal selector byte (e.g. 06h = video port)
  notes: "Response DATA01 = FFh on error (no switch made)"

- id: picture_mute_on_020
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off_021
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off_023
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: data02
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust_030_2
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {checksum}"
  params:
    - name: data01
      type: integer
      description: "Value set for the aspect (see Appendix 'Supplementary Information by Command')"
  notes: "Aspect values defined in source appendix not included in extracted text"

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data05
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86), filter usage time (DATA87-90)"

- id: filter_usage_info_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04), filter alarm start time (DATA05-08). -1 if undefined"

- id: lamp_info_request_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Lamp selector (00h=Lamp1, 01h=Lamp2 - Lamp2 only on two-lamp models)"
    - name: data02
      type: integer
      description: "Content (01h=usage time seconds, 04h=remaining life %)"

- id: carbon_savings_info_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list: e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: data02
      type: integer
      description: "Key code high byte (WORD type - 00h for all listed keys)"
  notes: "Response DATA01=FFh on error"

- id: shutter_close_051
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Lens target (06h=Periphery Focus)"
    - name: data02
      type: integer
      description: "Drive content (00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus)"
  notes: "Send 00h after 7Fh/81h to stop continuous drive"

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {checksum}"
  params:
    - name: data01
      type: integer
      description: Lens target selector
  notes: "Returns adjustment range upper/lower limits and current value (DATA02-07)"

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: data03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data04
      type: integer
      description: Adjustment value high-order 8 bits
  notes: "If DATA01=FFh (Stop), DATA02-DATA04 not referenced"

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"
  notes: "Controls profile specified by 053-10 LENS PROFILE SET"

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: data02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: lens_information_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - 0=Stop, 1=During operation"

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

- id: lens_profile_request_053_11
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected profile number (DATA01: 00h=Profile 1, 01h=Profile 2)"

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {checksum}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"
  notes: "Returns DATA01-16: status, range limits, default, current value, adjustment widths"

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns DATA01-03 base model type, DATA04 sound function, DATA05 profile number"

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns DATA03 power status (00h=Standby, 01h=Power on), DATA04 cooling, DATA05 power process, DATA06 operation status"

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch status, signal list number, selection signal types, content displayed"

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display"

- id: model_name_request_078_5
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns DATA01-32 model name (NUL-terminated string)"

- id: cover_status_request_078_6
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01 (00h=Normal/cover opened, 01h=Cover closed)"

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {checksum}"
  params:
    - name: data01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns DATA01 eco mode value (see Appendix). May reflect Light mode or Lamp mode depending on model"

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns DATA01-17 projector name (NUL-terminated string)"

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns DATA01-06 MAC address"

- id: pip_pbp_request_097_198
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01 (00h=OFF, 01h=ON)"

- id: eco_mode_set_098_8
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Value set for the eco mode (see Appendix 'Supplementary Information by Command')"
  notes: "Eco mode values defined in source appendix not included in extracted text"

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {checksum}"
  params:
    - name: data01_to_data16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_pbp_set_098_198
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)"

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: base_model_type_request_305_1
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type"

- id: serial_number_request_305_2
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns DATA01-16 serial number (NUL-terminated string)"

- id: basic_information_request_305_3
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, mute/freeze status"

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: integer
      description: "Input terminal (see Appendix)"
    - name: data02
      type: integer
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  description: "Error information from command 009. DATA01-12 bitmaps: cover, fan, temperature, power, lamp, formatter, mirror cover, interlock switch, foreign matter, lens installed, iris calibration, ballast comms, system errors"
- id: power_status
  type: enum
  values: [standby, power_on]
  description: "From command 078-2 DATA03"
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From command 078-2 DATA06"
- id: mute_status
  type: object
  description: "From command 078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display"
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "From command 078-6"
- id: response_ack
  type: enum
  values: [success, error]
  description: "Generic command ack. Response header byte distinguishes type: 2Xh success, AXh error"
# UNRESOLVED: full enum value lists for several feedbacks (eco mode, edge blending) reference appendix not present in extracted text
```

## Variables
```yaml
- id: picture_brightness
  description: Picture brightness (command 030-1, target 00h)
- id: picture_contrast
  description: Picture contrast (command 030-1, target 01h)
- id: picture_color
  description: Picture color (command 030-1, target 02h)
- id: picture_hue
  description: Picture hue (command 030-1, target 03h)
- id: picture_sharpness
  description: Picture sharpness (command 030-1, target 04h)
- id: volume
  description: Sound volume (command 030-2)
- id: lamp_light_adjust
  description: LAMP ADJUST / LIGHT ADJUST (command 030-15, target 96h/FFh)
- id: aspect
  description: Aspect setting (command 030-12)
- id: eco_mode
  description: Eco mode value (command 098-8 set / 097-8 read)
- id: projector_name
  description: LAN projector name (command 098-45 set / 097-45 read)
- id: lens_memory_load_by_signal
  description: Lens memory option LOAD BY SIGNAL (command 053-6)
- id: lens_memory_forced_mute
  description: Lens memory option FORCED MUTE (command 053-6)
- id: edge_blending_mode
  description: Edge blending mode (command 098-243-1 set / 097-243-1 read)
- id: pip_pbp_mode
  description: PIP / Picture By Picture mode (command 098-198)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source.
# All responses are command/ack pairs.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON (015) is executing, no other command can be accepted."
    source: "3.2 [ 015. POWER ON ]"
  - id: power_off_lockout
    description: "While POWER OFF (016) is executing (including cooling time), no other command can be accepted."
    source: "3.3 [ 016. POWER OFF ]"
  - id: lens_drive_stop
    description: "After sending 7Fh (drive plus) or 81h (drive minus) in LENS CONTROL (053) DATA02, must send 00h to stop lens drive."
    source: "3.22 [ 053. LENS CONTROL ]"
# UNRESOLVED: no explicit power-on sequencing requirements or interlock hardware procedures beyond command lockouts.
# Error bitmap (command 009) reports interlock switch open, cover errors, foreign matter sensor, lens-not-installed - these are status indicators, not documented interlock sequences.
```

## Notes
- All command/response frames use the same structure: `header <ID1> <ID2> LEN <DATA...> <CKS>`. ID1 is the projector control ID, ID2 is the model code (model-specific, not stated in this source).
- Checksum (CKS): sum of all preceding bytes, low-order 8 bits. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- Error responses use header byte `AXh` (where X matches command group) and carry ERR1/ERR2 codes (see source section 2.4 for full error code list, codes 00h-03h × 00h-0Fh).
- Source documents a generic command set covering multiple Sharp/NEC projector models; model-specific value tables (input terminal values, aspect values, eco mode values, base model types, sub input values) live in an Appendix "Supplementary Information by Command" that is **not present in the extracted source text**. Parameter enum values for those actions reference the appendix.
- Two-lamp variants (Lamp 2 selectors in commands 037-4) only apply to two-lamp projector models.
- Source: BDT140013 Revision 7.1, Projector Control Command Reference Manual.

<!-- UNRESOLVED: model code (ID2) value for 8M B80Ax1U not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' not in extracted text — input terminal, aspect, eco mode, base model type, and sub input enum values missing -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: TCP keepalive / connection timeout behavior not stated -->
<!-- UNRESOLVED: command inter-command timing / minimum interval not stated -->
<!-- UNRESOLVED: flow_control explicitly stated only as 'Full duplex' communication mode; not mapped to standard flow_control enum -->
````

Spec ready. 53 actions, all payloads verbatim. UNRESOLVED markers on appendix-dependent enums, model/control IDs, firmware version.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:40:32.962Z
last_checked_at: 2026-06-17T19:32:55.079Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:32:55.079Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands verbatim; transport parameters confirmed in source; complete one-to-one coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific firmware version compatibility not stated in source"
- "model code (ID2) value for this specific model not stated in source"
- "control ID (ID1) default value not stated in source"
- "source lists \"Full duplex\" communication mode but no explicit flow_control field"
- "full enum value lists for several feedbacks (eco mode, edge blending) reference appendix not present in extracted text"
- "no unsolicited notification events documented in source."
- "no multi-step command sequences described explicitly in source."
- "no explicit power-on sequencing requirements or interlock hardware procedures beyond command lockouts."
- "model code (ID2) value for 8M B80Ax1U not stated in source"
- "control ID (ID1) default not stated in source"
- "Appendix 'Supplementary Information by Command' not in extracted text — input terminal, aspect, eco mode, base model type, and sub input enum values missing"
- "firmware version compatibility not stated"
- "TCP keepalive / connection timeout behavior not stated"
- "command inter-command timing / minimum interval not stated"
- "flow_control explicitly stated only as 'Full duplex' communication mode; not mapped to standard flow_control enum"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
