---
spec_id: admin/sharp-nec-m431-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M431 2 Control Spec"
manufacturer: Sharp/NEC
model_family: "M431 2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M431 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:09:20.476Z
last_checked_at: 2026-06-18T08:10:02.054Z
generated_at: 2026-06-18T08:10:02.054Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Model-specific value tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) are referenced in an \"Appendix: Supplementary Information by Command\" that is not included in the refined source text."
  - "eco mode enum values not in refined source (referenced Appendix absent)."
  - "no event/notification protocol stated in source."
  - "no macros documented in source."
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" value tables not present in refined source — input terminal values, aspect values, eco mode values, base model types, sub-input setting values, and additional LENS CONTROL DATA01 targets cannot be enumerated."
  - "default baud rate not stated (115200 listed first but not confirmed as default)."
  - "ID1 control ID default and ID2 model code value for M431 2 not stated in this source."
  - "serial flow_control — RTS/CTS pins wired but explicit flow-control mode (none/hardware) not named in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:10:02.054Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M431 2 Control Spec

## Summary
Sharp/NEC M431 2 projector control spec derived from the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Covers RS-232C serial control and wired/wireless LAN (TCP) control using a binary framed protocol with checksum. Enumerates all 53 documented commands spanning power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, status queries, eco mode, PIP/PbP, edge blending, and system information.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model-specific value tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) are referenced in an "Appendix: Supplementary Information by Command" that is not included in the refined source text. -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP) connection methods.
# Framing identical across transports: binary hex bytes with trailing checksum
# (CKS = low-order byte of sum of all preceding bytes).
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists selectable: 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; RTS/CTS pins present but flow control mode not explicitly named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF commands present)
# - routable        (INPUT SW CHANGE / AUDIO SELECT SET / PIP sub-input commands present)
# - queryable       (extensive status request commands present)
# - levelable       (PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST present)
traits:
  - powerable  # inferred from 015/016 power commands
  - routable   # inferred from 018 INPUT SW CHANGE
  - queryable  # inferred from 078/097/305 status request commands
  - levelable  # inferred from 030-1/030-2/030-15 adjust commands
```

## Actions
```yaml
# All payloads are VERBATIM hex bytes from the source. Where a DATA field is
# parameterized, the variable part is shown as {DATAxx}. CKS is the checksum:
# low-order one byte of the sum of all preceding bytes (see source 2.2).
# Response success frames use 2xh prefix; error frames use Axh prefix with ERR1/ERR2.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command'). Example 06h = video port."
  notes: "Example from source: 02h 03h 00h 00h 02h 01h 06h 0Eh (select video port). Response DATA01=FFh means ended with error (no signal switch)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video signal switch or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see Appendix 'Supplementary Information by Command')."

- id: other_adjust
  label: Other Adjust (LAMP/LIGHT ADJUST)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Reserved per source DATA layout."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time seconds (DATA01-04), filter alarm start time seconds (DATA05-08). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
  notes: "Example get lamp usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life returned if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Returns kilograms (DATA02-05, max 99999 kg) and milligrams (DATA06-09, max 999999 mg)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed codes)."
  notes: "Example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means error."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source documents 06h=Periphery Focus (other targets referenced in Appendix)."
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
  notes: "After 7Fh/81h, send 00h to stop. Same command may be issued during drive without stop."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (see 053 LENS CONTROL DATA01)."
  notes: "Returns upper/lower limits and current value (DATA02-07)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. FFh=Stop (mode/value not referenced when Stop)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Controls profile number specified in 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Returns setting value DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST."
  notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current, wide/narrow widths (DATA01-16)."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03: 00h=Standby, 01h=Power on), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05)."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string DATA01-32 (NUL terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
  notes: "Returns label/information string (NUL terminated)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (DATA01; see Appendix for value table)."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name DATA01-17 (NUL terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address DATA01-06."

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "Returns DATA02 setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the eco mode (see Appendix 'Supplementary Information by Command')."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Projector name byte 1 (up to 16 bytes total DATA01-DATA16)."
  notes: "Projector name up to 16 bytes (DATA01-16) followed by NUL (00h)."

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input values per Appendix)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number DATA01-16 (NUL terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status (DATA01-15)."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command')."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Each query action above returns a framed response. Observable states:
- id: power_state
  type: enum
  values: [standby, power_on]
  source: "078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on); 305-3 DATA01"

- id: cooling_state
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 RUNNING STATUS REQUEST DATA04"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06"

- id: error_status
  type: bitfield
  source: "009 ERROR STATUS REQUEST DATA01-12 (bit=1 indicates error: cover, fan, temperature, power, lamp off, lamp replacement, formatter, FPGA, mirror cover, ballast, iris, lens, interlock switch, system errors)"

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA03"

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: freeze_state
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA03-06); 037 INFORMATION REQUEST (DATA83-86)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3 content 04h (negative if replacement deadline exceeded)"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04); 037 (DATA87-90)"
```

## Variables
```yaml
# Settable parameters also exposed as discrete actions above (030-1/030-2/030-12/030-15, 098-*).
- id: volume
  type: integer
  description: "Sound volume (set via 030-2 VOLUME ADJUST; readable via 060-1 DATA01=05h)."

- id: brightness
  type: integer
  description: "Picture brightness (set via 030-1 DATA01=00h; readable via 060-1 DATA01=00h)."

- id: contrast
  type: integer
  description: "Picture contrast (set/read via 030-1 / 060-1 DATA01=01h)."

- id: eco_mode
  type: integer
  description: "Eco / light / lamp mode value (set via 098-8; readable via 097-8; value table in Appendix)."
  # UNRESOLVED: eco mode enum values not in refined source (referenced Appendix absent).
```

## Events
```yaml
# Source describes only request/response. No unsolicited notification frames documented.
# UNRESOLVED: no event/notification protocol stated in source.
```

## Macros
```yaml
# Source describes no multi-step command sequences.
# UNRESOLVED: no macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on the power, no other command can be accepted."
  - command: power_off
    note: "While turning off the power (including the cooling time), no other command can be accepted."
  - command: error_status_request
    note: "DATA09 Bit1 = interlock switch open (reported as error bit)."
# No explicit power-on sequencing procedure documented.
```

## Notes
- **Protocol framing:** All commands/responses are binary hex byte frames. General command form: `20h 88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>` (per 2.1). Success response prefix is `2xh`; error response prefix is `Axh` with `<ERR1> <ERR2> <CKS>`.
- **Checksum (CKS):** low-order one byte (8 bits) of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **ID1:** control ID set on the projector. **ID2:** model code (varies by model).
- **Baud rate** is selectable among 115200/38400/19200/9600/4800 bps; the source does not state a default. The value `115200` recorded above is the first listed, not a confirmed default.
- **LAN:** wired (RJ-45, 10/100 Mbps auto) and wireless LAN units supported; TCP port 7142 for command send/receive. Wireless LAN unit details not in this source.
- **Error codes:** full ERR1/ERR2 table in source 2.4 (e.g. 00h/00h = unrecognized command, 02h/0Dh = command rejected because power is off, 02h/0Fh = no authority).
- **Usage time** is readable in one-second units but updated by the projector at one-minute intervals.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" value tables not present in refined source — input terminal values, aspect values, eco mode values, base model types, sub-input setting values, and additional LENS CONTROL DATA01 targets cannot be enumerated. -->
<!-- UNRESOLVED: default baud rate not stated (115200 listed first but not confirmed as default). -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code value for M431 2 not stated in this source. -->
<!-- UNRESOLVED: serial flow_control — RTS/CTS pins wired but explicit flow-control mode (none/hardware) not named in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:09:20.476Z
last_checked_at: 2026-06-18T08:10:02.054Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:10:02.054Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Model-specific value tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) are referenced in an \"Appendix: Supplementary Information by Command\" that is not included in the refined source text."
- "eco mode enum values not in refined source (referenced Appendix absent)."
- "no event/notification protocol stated in source."
- "no macros documented in source."
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" value tables not present in refined source — input terminal values, aspect values, eco mode values, base model types, sub-input setting values, and additional LENS CONTROL DATA01 targets cannot be enumerated."
- "default baud rate not stated (115200 listed first but not confirmed as default)."
- "ID1 control ID default and ID2 model code value for M431 2 not stated in this source."
- "serial flow_control — RTS/CTS pins wired but explicit flow-control mode (none/hardware) not named in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
