---
spec_id: admin/sharp-nec-xp-a155u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A155U W Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Xp A155U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Xp A155U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:47:14.531Z
last_checked_at: 2026-06-19T07:48:11.099Z
generated_at: 2026-06-19T07:48:11.099Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "flow control scheme not stated (source lists \"Full duplex\" communication mode only)"
  - "default baud rate not stated (source lists 5 supported rates)"
  - "source supports 115200/38400/19200/9600/4800 bps, no single default stated"
  - "source states \"Full duplex\" communication mode only, no flow-control scheme"
  - "no additional settable scalar variables beyond those parameterized in Actions."
  - "populate from source, or remove section if not applicable"
  - "source documents no explicit multi-step command sequences."
  - "source contains no explicit power-on sequencing procedure beyond the above interlocks."
  - "firmware version compatibility range not stated"
  - "default baud rate not stated (5 supported)"
  - "flow-control scheme not stated (only \"Full duplex\" communication mode)"
  - "full enumeration of input terminal values, aspect values, eco-mode values, base-model-type values, and sub-input values referenced as \"see Appendix Supplementary Information by Command\" — appendix not present in this refined source excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:48:11.099Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands with correct parameters and transport values. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A155U W Control Spec

## Summary
Sharp/NEC Xp A155U W is a projector controlled via binary hex commands over RS-232C serial or wired/wireless LAN (TCP port 7142). This spec covers the command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input select, mute, picture/volume/aspect adjust, shutter, lens control and memory, status queries, and LAN/PIP/edge-blend settings.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow control scheme not stated (source lists "Full duplex" communication mode only) -->
<!-- UNRESOLVED: default baud rate not stated (source lists 5 supported rates) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# serial block - values stated in source (1.2 Communication conditions)
serial:
  baud_rate: null  # UNRESOLVED: source supports 115200/38400/19200/9600/4800 bps, no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode only, no flow-control scheme
# tcp block - port stated in source (Port number section)
addressing:
  port: 7142
# auth - no login/auth procedure anywhere in the manual
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable      # inferred: many status request commands present (009, 037 series, 078 series, 305 series)
  - levelable      # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL adjust values
```

## Actions
```yaml
# All 53 command-bearing entries from the source command list (section 2), in source order.
# Command bytes are copied verbatim from the source. Variable DATA fields shown as {param}.
# <ID1> <ID2> are frame identifiers; <CKS> is a checksum computed per source rule
# (low-order byte of sum of all preceding bytes).

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

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value (e.g. 06h = video port; full list in Appendix "Supplementary Information by Command")

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (DATA01=96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Adjustment target low byte (DATA02=FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type) - e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 84h=VOLUME UP, 85h=VOLUME DOWN, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (WORD type) - 00h for all documented keys"

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis (source example shows 06h=Periphery Focus; full list in Appendix)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens axis to query (matches data01 of lens_control)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis (FFh=Stop - ignores mode/value)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set by 053-10 LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01_16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value - for MODE: 00h=PIP, 01h=PICTURE BY PICTURE; for START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values in Appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command")
    - name: data02
      type: integer
      description: "Setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# State values returned by query commands, per source response formats.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
  source: 078-2 RUNNING STATUS REQUEST (DATA03 power status, DATA06 operation status)

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: 078-2 DATA04

- id: picture_mute
  type: enum
  values: [off, on]
  source: 078-4 MUTE STATUS REQUEST DATA01

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
  values: [normal_opened, cover_closed]
  source: 078-6 COVER STATUS REQUEST

- id: error_status
  type: bitmask
  description: 12-byte error bitfield (DATA01-DATA12); bit=0 normal, bit=1 error. Covers cover/fan/temperature/power/lamp/formatter/FPGA/interlock/system errors.
  source: 009 ERROR STATUS REQUEST

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037 INFORMATION REQUEST DATA83-86 / 037-4 LAMP INFORMATION REQUEST 3

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: May be negative if lamp replacement deadline exceeded.
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST DATA01-32

- id: projector_name
  type: string
  source: 097-45 LAN PROJECTOR NAME REQUEST

- id: mac_address
  type: string
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST 2 DATA01-06

- id: eco_mode
  type: enum
  description: Light mode / Lamp mode value - see Appendix "Supplementary Information by Command".
  source: 097-8 ECO MODE REQUEST

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST

- id: pip_pbyb_mode
  type: enum
  values: [pip, picture_by_picture]
  source: 097-198 PIP/PICTURE BY PICTURE REQUEST (DATA01=00h MODE)

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST DATA01-16

- id: base_model_type
  type: string
  source: 305-1 BASE MODEL TYPE REQUEST

- id: lens_information
  type: bitmask
  description: Lens operation bits - Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V); 0=Stop, 1=During operation.
  source: 053-7 LENS INFORMATION REQUEST

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-11 LENS PROFILE REQUEST

- id: carbon_savings
  type: number
  unit: kilogram
  source: 037-6 CARBON SAVINGS INFORMATION REQUEST
```

## Variables
```yaml
# Settable parameters that are not discrete one-shot actions.
# (Discrete value-set commands live in Actions above; this section left empty.)
# UNRESOLVED: no additional settable scalar variables beyond those parameterized in Actions.
```

## Events
```yaml
# Source documents no unsolicited notifications - all responses are replies to commands.
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "While POWER ON is executing, no other command can be accepted (source: 3.2 [015. POWER ON])."
  - description: "While POWER OFF is executing (including cooling time), no other command can be accepted (source: 3.3 [016. POWER OFF])."
  - description: "Command may be rejected with ERR1=02h ERR2=0Dh when power is off (source: 2.4 Error code list)."
# UNRESOLVED: source contains no explicit power-on sequencing procedure beyond the above interlocks.
```

## Notes
- Binary command framing: all commands/responses are hex byte sequences. Format per source: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`.
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model).
- `<CKS>` checksum = low-order one byte of the sum of all preceding bytes (worked example in source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`).
- Responses use leading byte prefix: `2xh`/`Axh`/`Bxh`... where the high nibble indicates command class outcome; `<ERR1> <ERR2>` carry error codes on failure (see source 2.4 Error code list).
- Source lists 5 supported baud rates (115200/38400/19200/9600/4800); caller must match the projector's configured rate. No single default stated.
- Error code 02h 0Dh ("command cannot be accepted because the power is off") affects many non-power commands — implementers should gate state-modifying commands on power state.
- Information fields (lamp/filter usage) update at one-minute intervals despite one-second resolution.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: default baud rate not stated (5 supported) -->
<!-- UNRESOLVED: flow-control scheme not stated (only "Full duplex" communication mode) -->
<!-- UNRESOLVED: full enumeration of input terminal values, aspect values, eco-mode values, base-model-type values, and sub-input values referenced as "see Appendix Supplementary Information by Command" — appendix not present in this refined source excerpt -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:47:14.531Z
last_checked_at: 2026-06-19T07:48:11.099Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:48:11.099Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands with correct parameters and transport values. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "flow control scheme not stated (source lists \"Full duplex\" communication mode only)"
- "default baud rate not stated (source lists 5 supported rates)"
- "source supports 115200/38400/19200/9600/4800 bps, no single default stated"
- "source states \"Full duplex\" communication mode only, no flow-control scheme"
- "no additional settable scalar variables beyond those parameterized in Actions."
- "populate from source, or remove section if not applicable"
- "source documents no explicit multi-step command sequences."
- "source contains no explicit power-on sequencing procedure beyond the above interlocks."
- "firmware version compatibility range not stated"
- "default baud rate not stated (5 supported)"
- "flow-control scheme not stated (only \"Full duplex\" communication mode)"
- "full enumeration of input terminal values, aspect values, eco-mode values, base-model-type values, and sub-input values referenced as \"see Appendix Supplementary Information by Command\" — appendix not present in this refined source excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
