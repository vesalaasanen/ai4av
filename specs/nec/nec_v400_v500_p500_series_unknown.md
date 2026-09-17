---
spec_id: admin/nec-v400-v500-p500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC V400 V500 P500 Series Control Spec"
manufacturer: NEC
model_family: "V400 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "V400 Series"
    - "V500 Series"
    - "P500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:11:15.202Z
last_checked_at: 2026-09-15T22:17:43.069Z
generated_at: 2026-09-15T22:17:43.069Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID1 (Control ID) is a runtime parameter; ID2 (model code) varies by model — values are not enumerated in the refined source and must be supplied at runtime from the actual projector."
  - "source describes command/response semantics only; no unsolicited"
  - "source defines only single-command sequences; no multi-step"
  - "explicit interlock procedures / power-on sequencing / lamp"
  - "input terminal byte mapping, base model type table, eco/light/lamp mode value table, aspect value table, PIP/PBP sub-input value table — all deferred to the appendix which is not included in the refined source."
verification:
  verdict: verified
  checked_at: 2026-09-15T22:17:43.069Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 action units match the source's command catalogue hex sequences byte-for-byte; transport parameters all appear verbatim in the source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# NEC V400 V500 P500 Series Control Spec

## Summary
This spec covers the RS-232C and wired/wireless LAN control protocol for the NEC V400, V500, and P500 series projectors, based on the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Commands are framed hex byte sequences with model-dependent ID bytes and a trailing checksum; TCP port 7142 is used for LAN control.

<!-- UNRESOLVED: ID1 (Control ID) is a runtime parameter; ID2 (model code) varies by model — values are not enumerated in the refined source and must be supplied at runtime from the actual projector. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; highest listed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full duplex stated, no flow control mentioned
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from POWER ON / POWER OFF commands
- routable        # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
- queryable       # inferred from numerous status/information requests
- levelable       # inferred from VOLUME ADJUST and PICTURE ADJUST commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal byte (e.g. 06h = video). See appendix for full list.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: integer
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: aspect_value
      type: integer
      description: Aspect value byte (see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: target_lo
      type: integer
      description: 96h for LAMP ADJUST / LIGHT ADJUST
    - name: target_hi
      type: integer
      description: FFh for LAMP ADJUST / LIGHT ADJUST
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: lamp
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=usage time (seconds), 04h=remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: kind
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: key_code_lo
      type: integer
      description: Key code low byte (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)
    - name: key_code_hi
      type: integer
      description: Key code high byte (00h for all listed keys)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: target
      type: integer
      description: Lens axis (e.g. 06h=Periphery Focus; see source for full list)
    - name: content
      type: integer
      description: 00h=Stop, 01h=1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=continuous plus, 81h=continuous minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: target
      type: integer
      description: Lens axis to query

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: integer
      description: Lens axis; FFh=Stop
    - name: mode
      type: integer
      description: 00h=absolute, 02h=relative
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control_move
  label: Lens Memory Control - Move
  kind: action
  command: "02 1E 00 00 01 00 {CKS}"
  params: []

- id: lens_memory_control_store
  label: Lens Memory Control - Store
  kind: action
  command: "02 1E 00 00 01 01 {CKS}"
  params: []

- id: lens_memory_control_reset
  label: Lens Memory Control - Reset
  kind: action
  command: "02 1E 00 00 01 02 {CKS}"
  params: []

- id: reference_lens_memory_control_move
  label: Reference Lens Memory Control - Move
  kind: action
  command: "02 1F 00 00 01 00 {CKS}"
  params: []

- id: reference_lens_memory_control_store
  label: Reference Lens Memory Control - Store
  kind: action
  command: "02 1F 00 00 01 01 {CKS}"
  params: []

- id: reference_lens_memory_control_reset
  label: Reference Lens Memory Control - Reset
  kind: action
  command: "02 1F 00 00 01 02 {CKS}"
  params: []

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: value
      type: integer
      description: 00h=OFF, 01h=ON

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: target
      type: integer
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light adjust

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_control_on
  label: Freeze Control - On
  kind: action
  command: "01 98 00 00 01 01 {CKS}"
  params: []

- id: freeze_control_off
  label: Freeze Control - Off
  kind: action
  command: "01 98 00 00 01 02 {CKS}"
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: info_type
      type: integer
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: field
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: eco_mode_value
      type: integer
      description: Eco/Light/Lamp mode value (see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01..DATA16} 00 {CKS}"
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: field
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (depends on field; see source)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: setting
      type: integer
      description: 00h=OFF, 01h=ON

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal (see appendix)
    - name: setting
      type: integer
      description: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER
```

## Feedbacks
```yaml
- id: error_status
  type: struct
  description: 12-byte error status payload (DATA01-DATA12). Bits set to 1 indicate the named error (cover, fan, temperature, lamp, formatter, etc.).

- id: power_state
  type: enum
  values: [standby, power_on, standby_sleep, standby_error, standby_power_saving, network_standby, cooling]

- id: picture_mute_state
  type: enum
  values: [off, on]

- id: sound_mute_state
  type: enum
  values: [off, on]

- id: onscreen_mute_state
  type: enum
  values: [off, on]

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]

- id: cover_state
  type: enum
  values: [normal_cover_opened, cover_closed]

- id: freeze_state
  type: enum
  values: [off, on]

- id: input_signal_type_1
  type: enum
  values: [1, 2, 3, 4, 5]

- id: input_signal_type_2
  type: enum
  values: [computer, video, s_video, component, viewer_1_5, dvi_d, hdmi, display_port, viewer_6_10, not_source_input, reserved]

- id: lamp_usage_seconds
  type: integer
  description: Lamp usage time in seconds (one-minute update granularity).

- id: filter_usage_seconds
  type: integer
  description: Filter usage time in seconds.

- id: filter_alarm_start_seconds
  type: integer
  description: Filter alarm start time in seconds. -1 if undefined.

- id: lamp_remaining_life_percent
  type: integer
  description: Lamp remaining life percentage. Negative if replacement deadline exceeded.

- id: carbon_savings_kg
  type: integer
  description: Carbon savings in kilograms (max 99999).

- id: carbon_savings_mg
  type: integer
  description: Carbon savings in milligrams (max 999999).

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]

- id: lens_profile_selected
  type: enum
  values: [profile_1, profile_2]

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: eco_mode_value
  type: integer
  description: Current eco/light/lamp mode value (see appendix).

- id: mac_address
  type: string
  description: 6-byte MAC address.

- id: model_name
  type: string
  description: NUL-terminated model name string.

- id: serial_number
  type: string
  description: NUL-terminated serial number string.

- id: projector_name
  type: string
  description: NUL-terminated projector name (up to 16 bytes).

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: content_displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_being_switched]
```

## Variables
```yaml
# Tunable parameters with documented ranges (returned by gain_parameter_request_3)
- id: brightness
  type: integer
  description: Picture brightness adjustment value (signed 16-bit).

- id: contrast
  type: integer
  description: Picture contrast adjustment value.

- id: color
  type: integer
  description: Picture color saturation adjustment value.

- id: hue
  type: integer
  description: Picture hue adjustment value.

- id: sharpness
  type: integer
  description: Picture sharpness adjustment value.

- id: volume
  type: integer
  description: Sound volume adjustment value.

- id: lamp_adjust
  type: integer
  description: Lamp/light adjust value (varies by model).
```

## Events
```yaml
# UNRESOLVED: source describes command/response semantics only; no unsolicited
# event notification scheme is documented in the refined excerpt.
```

## Macros
```yaml
# UNRESOLVED: source defines only single-command sequences; no multi-step
# macro procedures are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Cover error, interlock switch open, or lens-not-installed error states are reported via error_status_request (DATA01 bit flags). No automatic shutdown procedure documented in source."
  # UNRESOLVED: explicit interlock procedures / power-on sequencing / lamp
  # cool-down interlocks are not documented in the refined excerpt (only that
  # power commands reject other commands while in progress).
```

## Notes
- All command bytes are hex; the trailing `<CKS>` byte is the low-order 8 bits of the sum of all preceding bytes.
- `<ID1>` (Control ID) and `<ID2>` (Model code) fields are not enumerated in this refined excerpt; runtime code must supply them per target projector.
- LAN control uses TCP port 7142; serial supports 115200/38400/19200/9600/4800 bps (8N1, full duplex). Spec records 115200 as the primary baud.
- Power ON/OFF reject other commands while in progress (including cooling time).
- Several commands reference an appendix "Supplementary Information by Command" for enum value tables not present in this refined excerpt (input terminal codes, base model types, eco mode values, aspect values, sub-input values).

<!-- UNRESOLVED: input terminal byte mapping, base model type table, eco/light/lamp mode value table, aspect value table, PIP/PBP sub-input value table — all deferred to the appendix which is not included in the refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:11:15.202Z
last_checked_at: 2026-09-15T22:17:43.069Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:17:43.069Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 action units match the source's command catalogue hex sequences byte-for-byte; transport parameters all appear verbatim in the source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID1 (Control ID) is a runtime parameter; ID2 (model code) varies by model — values are not enumerated in the refined source and must be supplied at runtime from the actual projector."
- "source describes command/response semantics only; no unsolicited"
- "source defines only single-command sequences; no multi-step"
- "explicit interlock procedures / power-on sequencing / lamp"
- "input terminal byte mapping, base model type table, eco/light/lamp mode value table, aspect value table, PIP/PBP sub-input value table — all deferred to the appendix which is not included in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
