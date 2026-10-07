---
spec_id: admin/sharp-nec-e181-162
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC E181 162 Control Spec"
manufacturer: Sharp-NEC
model_family: "E181 162"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "E181 162"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-30T13:01:30.842Z
last_checked_at: 2026-10-01T12:59:29.777Z
generated_at: 2026-10-01T12:59:29.777Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source names no specific firmware; commands reference \"Base model type\" appendix not included in refined source"
  - "source mentions full-duplex but no explicit flow control"
  - "source describes command/response only; no unsolicited notifications documented."
  - "source describes individual commands only; no multi-step sequences documented."
  - "source mentions \"interlock switch is open\" as an error bit in ERROR STATUS"
  - "source mentions flow_control only indirectly via \"Full duplex\" but does not name RTS/CTS handshaking settings. Ethernet specifics (auto-negotiation) confirmed; port 7142 stated."
verification:
  verdict: verified
  checked_at: 2026-10-01T12:59:29.777Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions match source hex sequences one-to-one; transport values (baud 115200, port 7142) verified in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Sharp-NEC E181 162 Control Spec

## Summary
RS-232C / LAN control spec for Sharp-NEC E181 162 projector. Source: BDT140013 Revision 7.1 projector control command reference manual. Commands cover power, input selection, picture/sound/onscreen mute, picture adjustments, lens control, lamp/filter info, and configuration.

<!-- UNRESOLVED: source names no specific firmware; commands reference "Base model type" appendix not included in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # highest supported; source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source mentions full-duplex but no explicit flow control
addressing:
  port: 7142
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input switch change and PIP commands
- queryable       # inferred from many status request commands
- levelable       # inferred from picture/volume adjust commands
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00 88 00 00 00 88"  # last byte is checksum (low-order 8 bits of sum of preceding bytes)
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: input
      type: integer
      description: Input terminal code (e.g. 06h = video port; see source appendix)

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03 10 00 00 05 {target:00-04} FF {mode:00|01} {val_lo} {val_hi} {CKS}"
  params:
    - name: target
      type: integer
      description: "00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed; low-order byte first

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03 10 00 00 05 05 00 {mode:00|01} {val_lo} {val_hi} {CKS}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed; low-order byte first

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: aspect
      type: integer
      description: Aspect code (see source appendix)

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST)"
  kind: action
  command: "03 10 00 00 05 96 FF {mode:00|01} {val_lo} {val_hi} {CKS}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03 96 00 00 02 {lamp:00|01} {content:01|04} {CKS}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp1, 01h=Lamp2"
    - name: content
      type: integer
      description: "01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: scope
      type: integer
      description: "00h=Total, 01h=during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02 0F 00 00 02 {key_lo} {key_hi} {CKS}"
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (see source Key code list: 0002h=POWER ON, 0003h=POWER OFF, etc.)

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus (see source for other targets)"
    - name: drive
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+run, 81h=-run, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: target
      type: integer
      description: Lens adjustment target

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02 1D 00 00 04 {DATA01:FF=Stop} {mode:00|02} {val_lo} {val_hi} {CKS}"
  params:
    - name: drive
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit value

- id: lens_memory_move
  label: "053-3. LENS MEMORY CONTROL - MOVE"
  kind: action
  command: "02 1E 00 00 01 00 {CKS}"
  params: []

- id: lens_memory_store
  label: "053-3. LENS MEMORY CONTROL - STORE"
  kind: action
  command: "02 1E 00 00 01 01 {CKS}"
  params: []

- id: lens_memory_reset
  label: "053-3. LENS MEMORY CONTROL - RESET"
  kind: action
  command: "02 1E 00 00 01 02 {CKS}"
  params: []

- id: reference_lens_memory_move
  label: "053-4. REFERENCE LENS MEMORY CONTROL - MOVE"
  kind: action
  command: "02 1F 00 00 01 00 {CKS}"
  params: []

- id: reference_lens_memory_store
  label: "053-4. REFERENCE LENS MEMORY CONTROL - STORE"
  kind: action
  command: "02 1F 00 00 01 01 {CKS}"
  params: []

- id: reference_lens_memory_reset
  label: "053-4. REFERENCE LENS MEMORY CONTROL - RESET"
  kind: action
  command: "02 1F 00 00 01 02 {CKS}"
  params: []

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02 21 00 00 02 {option:00|01} {value:00|01} {CKS}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light adjust"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_on
  label: "079. FREEZE CONTROL - ON"
  kind: action
  command: "01 98 00 00 01 01 {CKS}"
  params: []

- id: freeze_off
  label: "079. FREEZE CONTROL - OFF"
  kind: action
  command: "01 98 00 00 01 02 {CKS}"
  params: []

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: info_type
      type: integer
      description: "03h=H sync freq, 04h=V sync freq"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_request
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: field
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: mode
      type: integer
      description: Eco/Light/Lamp mode value (see source appendix)

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03 B1 00 00 12 2C {name (up to 16 bytes)} 00 {CKS}"
  params:
    - name: name
      type: string
      description: Projector name, up to 16 bytes

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: field
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per field (see source appendix for sub-input values)

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code (see source appendix)
    - name: setting
      type: integer
      description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: 12-byte error information from ERROR STATUS REQUEST (cover, fan, lamp, temperature, interlock, etc.)

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]
  description: From RUNNING STATUS REQUEST DATA03 (00h/01h/FFh)

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: From RUNNING STATUS REQUEST DATA04

- id: power_on_off_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: From RUNNING STATUS REQUEST DATA05

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
  description: From RUNNING STATUS REQUEST DATA06

- id: picture_mute_status
  type: enum
  values: [off, on]
  description: From MUTE STATUS REQUEST DATA01

- id: sound_mute_status
  type: enum
  values: [off, on]
  description: From MUTE STATUS REQUEST DATA02

- id: onscreen_mute_status
  type: enum
  values: [off, on]
  description: From MUTE STATUS REQUEST DATA03

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  description: From MUTE STATUS REQUEST DATA04

- id: model_name
  type: string
  description: From MODEL NAME REQUEST (NUL-terminated, up to 32 bytes)

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]
  description: From COVER STATUS REQUEST DATA01 (00h/01h)

- id: lens_state
  type: object
  description: From LENS INFORMATION REQUEST - bitfield of lens memory/zoom/focus/H-shift/V-shift running state

- id: filter_usage_time
  type: integer
  description: Seconds (from FILTER USAGE INFORMATION REQUEST DATA01-04); -1 if undefined

- id: filter_alarm_start_time
  type: integer
  description: Seconds (from FILTER USAGE INFORMATION REQUEST DATA05-08); -1 if undefined

- id: lamp_usage_time
  type: integer
  description: Seconds (from LAMP INFORMATION REQUEST 3)

- id: lamp_remaining_life
  type: integer
  description: Percent (from LAMP INFORMATION REQUEST 3 DATA02=04h); negative if past deadline

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: From EDGE BLENDING MODE REQUEST DATA01

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: From PIP/PICTURE BY PICTURE REQUEST DATA01=00h DATA02

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: From PIP/PICTURE BY PICTURE REQUEST DATA01=01h DATA02

- id: serial_number
  type: string
  description: From SERIAL NUMBER REQUEST (NUL-terminated, up to 16 bytes)

- id: mac_address
  type: string
  description: From LAN MAC ADDRESS STATUS REQUEST2 (6 bytes)

- id: lan_projector_name
  type: string
  description: From LAN PROJECTOR NAME REQUEST (NUL-terminated, up to 17 bytes)
```

## Variables
```yaml
# Discrete-set/settable values modeled as actions above. Continuous numeric params (volume,
# brightness, contrast, etc.) and lens position use the parameterized picture_adjust /
# volume_adjust / lens_control_2 actions.
```

## Events
```yaml
# UNRESOLVED: source describes command/response only; no unsolicited notifications documented.
```

## Macros
```yaml
# UNRESOLVED: source describes individual commands only; no multi-step sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "interlock switch is open" as an error bit in ERROR STATUS
# DATA09 bit1, but does not document an interlock procedure.
```

## Notes
Commands use a framed hex protocol: header (1 byte) + command ID (1 byte) + ID1 (control ID) + ID2 (model code) + LEN (data length) + DATA bytes + CKS (checksum, low-order byte of sum of preceding bytes). Default baud is 115200 but 38400/19200/9600/4800 also supported. LAN uses TCP port 7142. Base model type and per-field input/aspect/eco-mode value tables referenced as "Appendix Supplementary Information by Command" are not included in the refined source. While power-on/off commands are executing, no other command can be accepted.

<!-- UNRESOLVED: source mentions flow_control only indirectly via "Full duplex" but does not name RTS/CTS handshaking settings. Ethernet specifics (auto-negotiation) confirmed; port 7142 stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-30T13:01:30.842Z
last_checked_at: 2026-10-01T12:59:29.777Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:59:29.777Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions match source hex sequences one-to-one; transport values (baud 115200, port 7142) verified in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source names no specific firmware; commands reference \"Base model type\" appendix not included in refined source"
- "source mentions full-duplex but no explicit flow control"
- "source describes command/response only; no unsolicited notifications documented."
- "source describes individual commands only; no multi-step sequences documented."
- "source mentions \"interlock switch is open\" as an error bit in ERROR STATUS"
- "source mentions flow_control only indirectly via \"Full duplex\" but does not name RTS/CTS handshaking settings. Ethernet specifics (auto-negotiation) confirmed; port 7142 stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
