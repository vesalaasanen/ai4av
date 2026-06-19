---
spec_id: admin/sharp-nec-ma431-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC MA431 IR Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC MA431 IR"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC MA431 IR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:28:45.598Z
last_checked_at: 2026-06-18T08:13:44.010Z
generated_at: 2026-06-18T08:13:44.010Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model name not stated verbatim in source (source is a generic \"Projector Control Command Reference Manual\", BDT140013 Rev 7.1); model taken from task input."
  - "firmware version compatibility not stated in source."
  - "flow control not stated in source (only \"Full duplex\" communication mode given)"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "exact model name not stated verbatim in source document."
  - "firmware version compatibility not stated."
  - "serial flow_control not stated (only \"Full duplex\" communication mode given)."
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, sub input values, base model types) not included in the provided refined source excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:13:44.010Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC MA431 IR Control Spec

## Summary
Projector control spec for the Sharp/NEC MA431 IR, a lamp-based projector. Covers external device control over RS-232C serial and wired/wireless LAN (TCP port 7142). Commands are binary hex frames with an ID1/ID2 header and a trailing checksum byte computed as the low byte of the sum of all preceding bytes.

<!-- UNRESOLVED: exact model name not stated verbatim in source (source is a generic "Projector Control Command Reference Manual", BDT140013 Rev 7.1); model taken from task input. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200/38400/19200/9600/4800  # source lists multiple selectable rates (bps)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (only "Full duplex" communication mode given)
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous request/status query commands
  - levelable    # inferred from picture/volume/lens adjustment commands
```

## Actions
```yaml
# All command bytes are verbatim from the source. Hex notation preserved as "NNh".
# Frame: <header bytes> <ID1> <ID2> <LEN> <DATA...> <CKS> where CKS = low byte of sum of all preceding bytes.
# ID1 = control ID, ID2 = model code (both vary by device; shown as <ID1> <ID2>).

- id: error_status_request_009
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command accepted.

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (including cooling time), no other command accepted.

- id: input_sw_change_018
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value (e.g. 06h = video port). See appendix "Supplementary Information by Command".
  notes: Response DATA01=FFh means ended with error (no signal switch).

- id: picture_mute_on_020
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input terminal switch or video signal switch.

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
  notes: Turned off by input/video switch or volume adjustment.

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
  notes: Turned off by input terminal switch or video signal switch.

- id: onscreen_mute_off_025
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
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

- id: volume_adjust_030_2
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

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Value set for the aspect. See appendix "Supplementary Information by Command".

- id: other_adjust_030_15
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target (DATA01): 96h=LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)"
    - name: data02
      type: integer
      description: "Adjustment target (DATA02): FFh for LAMP/LIGHT ADJUST"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals.

- id: filter_usage_info_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). -1 if undefined.

- id: lamp_info_request_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: Remaining life (%) is negative if lamp replacement deadline exceeded.

- id: carbon_savings_info_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). Values: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: Key code high byte (always 00h in source key code list).

- id: shutter_close_051
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: Closes the lens shutter.

- id: shutter_open_052
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: Opens the lens shutter.

- id: lens_control_053
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"
  notes: After 7Fh/81h, send 00h to stop.

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens adjustment target (e.g. periphery focus).
  notes: Returns upper/lower limits and current value (16-bit each).

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (FFh=Stop; adjustment mode/value ignored when Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls the profile number selected by LENS PROFILE SET (053-10).

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set_053_6
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

- id: lens_info_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns operation status bits for lens memory/zoom/focus/lens shift (H/V).

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns selected reference lens memory profile number.

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Returns status, upper/lower limits, default, current value, adjustment widths.

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05).

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power process flags, operation status.

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number (practical = returned+1), signal types, content displayed.

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display states.

- id: model_name_request_078_5
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string (NUL-terminated).

- id: cover_status_request_078_6
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: Returns label/information string (NUL-terminated).

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value. See appendix "Supplementary Information by Command".

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name string (NUL-terminated, DATA01-17).

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns 6-byte MAC address (DATA01-06).

- id: pip_pbp_request_097_198
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: Returns mode/start-position/sub-input setting value. See appendix for sub input values.

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Value set for the eco/light/lamp mode. See appendix "Supplementary Information by Command".

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes), supplied as DATA01-DATA16.

- id: pip_pbp_set_098_198
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Mode value (00h=PIP, 01h=PICTURE BY PICTURE) or start position (00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT) or sub input value"

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11).

- id: serial_number_request_305_2
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number string (NUL-terminated, DATA01-16).

- id: basic_information_request_305_3
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value. See appendix "Supplementary Information by Command".
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request_078_2 / basic_information_request_305_3 DATA01

- id: error_status
  type: bitmask
  values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, fpga_error, mirror_cover_error, foreign_matter_sensor, ballast_comm_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave, system_error_formatter]
  source: error_status_request_009 DATA01-DATA12

- id: mute_state
  type: enum
  values: [picture_mute_on, sound_mute_on, onscreen_mute_on, forced_onscreen_mute_on]
  source: mute_status_request_078_4

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request_078_6
```

## Variables
```yaml
# Settable parameters also represented as actions above (PICTURE/VOLUME/ASPECT/ECO/LENS).
# No additional standalone settable variables beyond those actions.
```

## Events
```yaml
# Source documents no unsolicited notifications. Device only responds to commands.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Power-on/off note that "no other command can be
# accepted" during transition is a device behavior note, not a documented interlock.
```

## Notes
- All command/response frames are binary hex. Notation "NNh" preserved verbatim from source (e.g. `02h`, `A2h`).
- Frame structure: `<header> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Response headers use high bit set (e.g. command `02h` → ack `22h`, error `A2h`).
- Checksum (CKS): low-order byte of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Error responses carry ERR1/ERR2 code pairs (see source section 2.4). Common: `02h 0Dh` = command rejected because power is off; `00h 01h` = command not supported by model; `02h 0Fh` = no authority.
- Serial cable must be a cross cable; PC CONTROL port is D-SUB 9P. RTS/CTS crossed (pins 7↔8).
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps — match projector setting; no single fixed default stated.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Information request (037) and several 078/305 requests omit the error response frame in the source listing but follow the same A0h/A3h error pattern.

<!-- UNRESOLVED: exact model name not stated verbatim in source document. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not stated (only "Full duplex" communication mode given). -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, sub input values, base model types) not included in the provided refined source excerpt. -->
````

Spec built. 53 commands enumerated (matches source command list 1:1), dual transport serial+TCP, all hex payloads verbatim, checksum method documented, no fabricated values. Gaps marked `UNRESOLVED`: firmware version, serial flow_control, model name confirmation, appendix lookup tables not in excerpt.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:28:45.598Z
last_checked_at: 2026-06-18T08:13:44.010Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:13:44.010Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model name not stated verbatim in source (source is a generic \"Projector Control Command Reference Manual\", BDT140013 Rev 7.1); model taken from task input."
- "firmware version compatibility not stated in source."
- "flow control not stated in source (only \"Full duplex\" communication mode given)"
- "source contains no explicit safety warnings, interlock procedures, or"
- "exact model name not stated verbatim in source document."
- "firmware version compatibility not stated."
- "serial flow_control not stated (only \"Full duplex\" communication mode given)."
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, sub input values, base model types) not included in the provided refined source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
