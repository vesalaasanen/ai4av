---
spec_id: admin/sharp-nec-ld-fe123-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe123 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe123 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe123 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:20:04.463Z
last_checked_at: 2026-06-17T20:07:09.892Z
generated_at: 2026-06-17T20:07:09.892Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific ID2 (model code) value not stated; varies by model."
  - "appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, sub input values, base model types) not present in refined source — referenced but not included."
  - "flow control not stated in source (full-duplex comm mode stated, RTS/CTS pins present on D-SUB 9P)"
  - "adjustment range not stated in source (returned dynamically by gain request)"
  - "range not stated"
  - "enum values referenced in appendix not present in refined source"
  - "source does not document any push/event mechanism."
  - "none described."
  - "no explicit safety warnings, power-on sequencing procedures, or"
  - "firmware version compatibility not stated in source."
  - "model-specific ID2 (model code) value not stated."
  - "input terminal code table, aspect value table, eco mode value table, sub input value table, base model type table — all referenced as appendix \"Supplementary Information by Command\" but absent from refined source."
  - "flow_control setting not stated (RTS/CTS pins wired but usage unspecified)."
  - "voltage / current / power specs not present in refined source (control doc only)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:07:09.892Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source hex commands verbatim. Transport parameters verified. Complete one-to-one coverage with source command list. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe123 U Control Spec

## Summary
Sharp/NEC projector (Ld Fe123 U) controlled via binary protocol over RS-232 serial or wired/wireless LAN (TCP). Frame format is hex byte sequences beginning with a header byte (00h–03h for commands, 20h/21h/22h/23h/A0h–A3h for responses) and terminated by a checksum byte. This spec covers the full command catalogue in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/gain adjustment, lens control and memory, status queries, eco mode, PIP/PBP, edge blending, audio select, and information requests.

<!-- UNRESOLVED: model-specific ID2 (model code) value not stated; varies by model. -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values (input terminal codes, aspect values, eco mode values, sub input values, base model types) not present in refined source — referenced but not included. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # selectably supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex comm mode stated, RTS/CTS pins present on D-SUB 9P)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
  - queryable    # inferred from numerous status/information request commands
  - levelable    # inferred from PICTURE / VOLUME / GAIN adjust commands
```

## Actions
```yaml
# Frame note: command bytes shown verbatim from source. <ID1> = control ID,
# <ID2> = model code (in responses only), <CKS> = checksum (low byte of sum of
# all preceding bytes). Parameterized DATA bytes shown as {DATAxx}.
# Source: BDT140013 Rev 7.1, section 3.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see appendix Supplementary Information by Command; e.g. 06h = video port)"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see appendix Supplementary Information by Command)"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp number (00h=Lamp 1, 01h=Lamp 2 [two-lamp models only])"
    - name: DATA02
      type: integer
      description: "Content (01h=lamp usage time seconds, 04h=lamp remaining life %)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type key code; see key code list)"
    - name: DATA02
      type: integer
      description: "Key code high byte"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Drive content (00h=Stop, 01h/02h/03h=plus 1s/0.5s/0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh/FEh/FFh=minus 0.25s/0.5s/1s)"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function target"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust)"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the eco mode (see appendix Supplementary Information by Command)"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA16} 00h {CKS}"
  params:
    - name: projector_name
      type: string
      description: "Projector name (up to 16 bytes), occupies DATA01-DATA16"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01 target)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see appendix Supplementary Information by Command)"
    - name: DATA02
      type: integer
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
# Each query action returns a framed response; success responses begin with
# 20h/21h/22h/23h (with ID1/ID2) and error responses begin with A0h-A3h
# followed by ERR1/ERR2 error codes.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request / basic_information_request DATA01

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA04

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA03

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request DATA01

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_request DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request DATA01

- id: lamp_remaining_life
  type: integer
  source: lamp_information_request_3 (DATA02=04h), DATA03-06, percent (negative past deadline)

- id: lamp_usage_time
  type: integer
  source: lamp_information_request_3 (DATA02=01h) / information_request, seconds (updated 1-min intervals)

- id: filter_usage_time
  type: integer
  source: filter_usage_information_request DATA01-04, seconds

- id: execution_result
  type: enum
  values: [success, error]
  source: shared success/error response frame per command
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "PICTURE / BRIGHTNESS (set via picture_adjust, read via gain_parameter_request_3 DATA01=00h)"
  # UNRESOLVED: adjustment range not stated in source (returned dynamically by gain request)

- id: contrast
  type: integer
  description: "PICTURE / CONTRAST"
  # UNRESOLVED: range not stated

- id: color
  type: integer
  description: "PICTURE / COLOR"
  # UNRESOLVED: range not stated

- id: hue
  type: integer
  description: "PICTURE / HUE"
  # UNRESOLVED: range not stated

- id: sharpness
  type: integer
  description: "PICTURE / SHARPNESS"
  # UNRESOLVED: range not stated

- id: volume
  type: integer
  description: "Sound volume (set via volume_adjust, read via gain_parameter_request_3 DATA01=05h)"
  # UNRESOLVED: range not stated

- id: lamp_light_adjust
  type: integer
  description: "LAMP ADJUST / LIGHT ADJUST (set via other_adjust, read via gain_parameter_request_3 DATA01=96h)"
  # UNRESOLVED: range not stated

- id: eco_mode
  type: integer
  description: "Eco / Light / Lamp mode (set via eco_mode_set, read via eco_mode_request)"
  # UNRESOLVED: enum values referenced in appendix not present in refined source

- id: projector_name
  type: string
  description: "LAN projector name (up to 16 bytes)"
  source: lan_projector_name_set / lan_projector_name_request
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited by commands.
# UNRESOLVED: source does not document any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences documented in source.
# UNRESOLVED: none described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is executing, no other command can be accepted."
  - command: power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted."
# UNRESOLVED: no explicit safety warnings, power-on sequencing procedures, or
# hardware interlock procedures documented in the refined source beyond the
# above command-acceptance interlocks. Error bit for interlock switch open is
# reported in error_status_request DATA09 Bit1.
```

## Notes
- Manual revision: BDT140013 Rev 7.1.
- Binary frame protocol. Command headers: `00h`–`03h`. Success response headers: `20h`/`21h`/`22h`/`23h` (echo command byte, include ID1/ID2). Error response headers: `A0h`/`A1h`/`A2h`/`A3h` (echo command byte, include ERR1/ERR2).
- Checksum (CKS): sum all preceding bytes, take low-order one byte.
- `<ID1>` = control ID configured on projector; `<ID2>` = model code (varies by model).
- Serial: RS-232C cross cable on PC CONTROL port (D-SUB 9P, pin 2 RxD / 3 TxD / 5 GND / 7 RTS / 8 CTS). Full duplex.
- LAN: RJ-45, 10/100 Mbps auto-negotiation. Wireless LAN via optional wireless LAN unit.
- TCP port 7142.
- Baud rate is selectable across 4800/9600/19200/38400/115200 — pick one to match projector config.
- Mute (picture/sound/onscreen) auto-clears on input terminal switch or video signal switch; sound mute also clears on volume adjust.
- Lens control continuous drive (`7Fh` plus / `81h` minus) must be stopped by sending `00h`.
- Lamp/filter usage time updates at one-minute intervals though reported in one-second units.
- Error code list (ERR1/ERR2) catalogued in source section 2.4 (command-not-recognized, not-supported, invalid value, invalid input terminal, memory errors, forced mute, no signal, power-off rejection, no authority, etc.).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model-specific ID2 (model code) value not stated. -->
<!-- UNRESOLVED: input terminal code table, aspect value table, eco mode value table, sub input value table, base model type table — all referenced as appendix "Supplementary Information by Command" but absent from refined source. -->
<!-- UNRESOLVED: flow_control setting not stated (RTS/CTS pins wired but usage unspecified). -->
<!-- UNRESOLVED: voltage / current / power specs not present in refined source (control doc only). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:20:04.463Z
last_checked_at: 2026-06-17T20:07:09.892Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:07:09.892Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source hex commands verbatim. Transport parameters verified. Complete one-to-one coverage with source command list. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific ID2 (model code) value not stated; varies by model."
- "appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, sub input values, base model types) not present in refined source — referenced but not included."
- "flow control not stated in source (full-duplex comm mode stated, RTS/CTS pins present on D-SUB 9P)"
- "adjustment range not stated in source (returned dynamically by gain request)"
- "range not stated"
- "enum values referenced in appendix not present in refined source"
- "source does not document any push/event mechanism."
- "none described."
- "no explicit safety warnings, power-on sequencing procedures, or"
- "firmware version compatibility not stated in source."
- "model-specific ID2 (model code) value not stated."
- "input terminal code table, aspect value table, eco mode value table, sub input value table, base model type table — all referenced as appendix \"Supplementary Information by Command\" but absent from refined source."
- "flow_control setting not stated (RTS/CTS pins wired but usage unspecified)."
- "voltage / current / power specs not present in refined source (control doc only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
