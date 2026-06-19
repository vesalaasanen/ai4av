---
spec_id: admin/sharp-nec-led-fa025i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA025I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA025I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA025I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:03:34.351Z
last_checked_at: 2026-06-18T08:02:19.589Z
generated_at: 2026-06-18T08:02:19.589Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value codes, aspect value codes, eco mode value codes, base model type codes, and sub input setting values are referenced to an \"Appendix: Supplementary Information by Command\" not present in this refined source. Firmware version compatibility not stated."
  - "value list in Appendix not present in source"
  - "no event/notification section in source."
  - "populate if source contains macro sequences."
  - "Appendix \"Supplementary Information by Command\" referenced multiple times (input terminal values, aspect values, eco mode values, base model type values, sub input setting values) is not present in this refined source document. Firmware version compatibility not stated. Protocol version not stated. Whether TCP connection stays persistent or per-command not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:02:19.589Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 command actions matched verbatim in source with exact hex payloads; transport parameters fully verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA025I2 Control Spec

## Summary
Sharp/NEC LED FA025I2 projector control spec. Binary hex command protocol over both RS-232C serial and TCP/IP (wired/wireless LAN). Commands use framed hex payloads with checksum byte; responses carry ID1/ID2 plus data or error codes.

<!-- UNRESOLVED: input terminal value codes, aspect value codes, eco mode value codes, base model type codes, and sub input setting values are referenced to an "Appendix: Supplementary Information by Command" not present in this refined source. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable; 115200 shown first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full-duplex communication mode stated; no flow-control field in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
- queryable    # inferred: many status/information request commands present
- levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST present
```

## Actions
```yaml
# All command payloads verbatim from source (hex bytes). ID1/ID2/CKS appear in
# the framed protocol; literal command bytes below are exactly as documented.
# Checksum (CKS) = low byte of sum of all preceding bytes.

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
      type: string
      description: Input terminal byte (e.g. 06h = video port). Full value list in Appendix "Supplementary Information by Command" not present in this source.
    - name: cks
      type: string
      description: Checksum byte = low byte of sum of all preceding bytes.

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
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Aspect value byte. Full value list in Appendix not present in this source.
    - name: cks
      type: string
      description: Checksum byte.

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: data02
      type: string
      description: "Adjustment target low byte (FFh per source table)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"
    - name: cks
      type: string
      description: Checksum byte.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: string
      description: Checksum byte.

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD). Source key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: string
      description: Key code high byte (00h for all listed keys).
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: "Lens target (06h=Periphery Focus per source)"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens target byte.
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (FFh=Stop per source)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum byte.

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: "01h=freeze on, 02h=freeze off"
    - name: cks
      type: string
      description: Checksum byte.

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: string
      description: Checksum byte.

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
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: Eco mode value byte. Full value list in Appendix not present in this source.
    - name: cks
      type: string
      description: Checksum byte.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes), NUL-terminated.
    - name: cks
      type: string
      description: Checksum byte.

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (context-dependent on data01). MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input values in Appendix not present."
    - name: cks
      type: string
      description: Checksum byte.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum byte.

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
      type: string
      description: Input terminal byte. Full value list in Appendix not present in this source.
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: string
      description: Checksum byte.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on]
  source: 078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on)

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 DATA06 (00h/04h/05h/06h/0Fh/10h)

- id: picture_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: freeze_status
  type: enum
  values: [off, on]
  source: 305-3 DATA09

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: 078-6 DATA01

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037 DATA83-86 / 037-4 DATA03-06

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 DATA01-04

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 (content 04h); negative if replacement deadline exceeded

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: value list in Appendix not present in source
  source: 097-8 / 098-8

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 / 098-243-1 DATA01

- id: error_status
  type: bitmask
  description: 12-byte error information bitfield (DATA01-DATA12) covering cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/system errors.
  source: 009 ERROR STATUS REQUEST

- id: command_error
  type: enum
  values: [unrecognized_command, command_not_supported, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_not_settable, forced_onscreen_mute, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, incorrect_gain_number, invalid_gain, adjustment_failed]
  source: 2.4 Error code list (ERR1/ERR2 combinations)
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=00h)

- id: picture_contrast
  type: integer
  source: 030-1 (DATA01=01h)

- id: picture_color
  type: integer
  source: 030-1 (DATA01=02h)

- id: picture_hue
  type: integer
  source: 030-1 (DATA01=03h)

- id: picture_sharpness
  type: integer
  source: 030-1 (DATA01=04h)

- id: volume
  type: integer
  source: 030-2 VOLUME ADJUST

- id: lamp_light_adjust
  type: integer
  source: 030-15 OTHER ADJUST (DATA01=96h)

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-10 / 053-11

- id: projector_name
  type: string
  max_length: 16
  source: 097-45 / 098-45
```

## Events
```yaml
# No unsolicited notification protocol documented. Device responds only to commands.
# UNRESOLVED: no event/notification section in source.
```

## Macros
```yaml
# No multi-step command sequences explicitly documented in source.
# UNRESOLVED: populate if source contains macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is executing, no other command can be accepted."
  - command: power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted."
  - command: lens_control
    note: "After sending 7Fh/81h (continuous drive), must send 00h to stop lens motion."
# Error code 02h 0Dh: command rejected when power is off - implicit power-state interlock.
# Error code 02h 0Fh: no authority for operation.
```

## Notes
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; 115200 listed first (likely default). Both endpoints must match.
- Command frame: literal hex bytes; checksum (CKS) = low-order byte of sum of all preceding bytes.
- Response frame prefixes: `20h`/`21h`/`22h`/`23h` = success (echoes command group), `A0h`/`A1h`/`A2h`/`A3h` = error response with ERR1/ERR2.
- ID1 = projector control ID setting; ID2 = model code (model-specific).
- Lamp/filter usage times update at one-minute intervals despite one-second resolution.
- Two-lamp projector models only: Lamp 2 selectors (DATA01=01h) effective.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced multiple times (input terminal values, aspect values, eco mode values, base model type values, sub input setting values) is not present in this refined source document. Firmware version compatibility not stated. Protocol version not stated. Whether TCP connection stays persistent or per-command not stated. -->
````

Spec done. 53 commands, all hex payloads verbatim. Serial+TCP both documented, port 7142 explicit, no auth inferred. Appendix value tables referenced but absent → marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:03:34.351Z
last_checked_at: 2026-06-18T08:02:19.589Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:02:19.589Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 command actions matched verbatim in source with exact hex payloads; transport parameters fully verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value codes, aspect value codes, eco mode value codes, base model type codes, and sub input setting values are referenced to an \"Appendix: Supplementary Information by Command\" not present in this refined source. Firmware version compatibility not stated."
- "value list in Appendix not present in source"
- "no event/notification section in source."
- "populate if source contains macro sequences."
- "Appendix \"Supplementary Information by Command\" referenced multiple times (input terminal values, aspect values, eco mode values, base model type values, sub input setting values) is not present in this refined source document. Firmware version compatibility not stated. Protocol version not stated. Whether TCP connection stays persistent or per-command not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
