---
spec_id: admin/nec-mexx1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MExx1 Series Control Spec"
manufacturer: NEC
model_family: "MExx1 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "MExx1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:05:40.457Z
last_checked_at: 2026-09-14T22:17:37.628Z
generated_at: 2026-09-14T22:17:37.628Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "- Source is a multi-model manual; exact ME-series subset behavior (e.g. lamp 2 vs single-lamp, PIP/PBP support) varies by model and is not enumerated here."
  - "flow control not explicitly listed; full duplex mode stated but no RTS/CTS software/hardware control fieldaddressing:"
  - "source contains no explicit safety warnings, interlocks, or"
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:37.628Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command table entries with byte-level fidelity; transport115200/8/N/1 and TCP 7142 confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC MExx1 Series Control Spec

## Summary
NEC MExx1 Series projector control via RS-232C and wired/wireless LAN (TCP port 7142). Source: Projector Control Command Reference Manual (BDT140013 Rev7.1). Document covers command frame format, response/error semantics, and 50+ commands for power, input, mute, picture/sound adjustment, lens control, status queries, and network info.

<!-- UNRESOLVED: 
 - Source is a multi-model manual; exact ME-series subset behavior (e.g. lamp 2 vs single-lamp, PIP/PBP support) varies by model and is not enumerated here.
  - Sub-input enum values, aspect ratio values, input terminal values, and eco mode values are referenced to an Appendix "Supplementary Information by Command" that is not included in the source.
-->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; 115200 is the highest listed and commonly the default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none # UNRESOLVED: flow control not explicitly listed; full duplex mode stated but no RTS/CTS software/hardware control fieldaddressing:
  port: 7142 # TCP port number explicitly stated in source: "Use TCP port number '7142'"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from 015 POWER ON, 016 POWER OFF
- routable       # inferred from 018 INPUT SW CHANGE
- queryable      # inferred from numerous status/info request commands
- levelable      # inferred from 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
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
    - name: DATA01
      type: string # hex byte; values defined in Appendix not included in source

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
    - name: DATA01
      type: string  # 00=Brightness 01=Contrast 02=Color 03=Hue 04=Sharpness
    - name: DATA02
      type: string  # 00=absolute 01=relative
    - name: DATA03
      type: string  # adjustment value low byte
    - name: DATA04
      type: string  # adjustment value high byte

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=absolute 01=relative
    - name: DATA02
      type: string  # adjustment value low byte
    - name: DATA03
      type: string  # adjustment value high byte

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: string  # value set for aspect (see Appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string  # 96h
    - name: DATA02
      type: string  # FFh
    - name: DATA03
      type: string  # 00=absolute 01=relative
    - name: DATA04
      type: string  # adjustment value low byte
    - name: DATA05
      type: string  # adjustment value high byte

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
    - name: DATA01
      type: string  # 00=Lamp 1 01=Lamp 2 (lamp 2 only for two-lamp models)
    - name: DATA02
      type: string  # 01=usage time (seconds) 04=remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=Total Carbon Savings 01=Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string  # key code high byte
    - name: DATA02
      type: string  # key code low byte (00h); see Key code list for full mapping

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
    - name: DATA01
      type: string  # 06h=Periphery Focus
    - name: DATA02
      type: string  # 00=Stop 01/02/03=plus 1s/0.5s/0.25s 7Fh=plus drive 81h=minus drive FD/FE/FF=minus 0.25/0.5/1s

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: string  # lens parameter selector (upper/lower limits, current)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string  # FFh=Stop
    - name: DATA02
      type: string  # 00=absolute 02=relative
    - name: DATA03
      type: string  # adjustment value low byte
    - name: DATA04
      type: string  # adjustment value high byte

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=MOVE 01=STORE 02=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=MOVE 01=STORE 02=RESET (operates on profile set by 053-10)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=LOAD BY SIGNAL 01=FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=LOAD BY SIGNAL 01=FORCED MUTE
    - name: DATA02
      type: string  # 00=OFF 01=ON

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
    - name: DATA01
      type: string  # 00=Profile 1 01=Profile 2

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
    - name: DATA01
      type: string  # 00=Brightness 01=Contrast 02=Color 03=Hue 04=Sharpness 05=Volume 96=Lamp/Light Adjust

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 01=On 02=Off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: string  # 03=Horizontal sync freq 04=Vertical sync freq

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

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=MODE 01=START POSITION 02=SUB INPUT 109=SUB INPUT 2 0Ah=SUB INPUT 3

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
    - name: DATA01
      type: string  # value set for eco mode (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01..DATA16} 00 {CKS}"
  params:
    - name: DATA01..DATA16
      type: string  # projector name, up to 16 bytes, NUL-terminated

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=MODE 01=START POSITION 02/09/0Ah=SUB INPUT 1/2/3
    - name: DATA02
      type: string  # mode/position/sub-input value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string  # 00=OFF 01=ON

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
    - name: DATA01
      type: string  # input terminal (see Appendix)
    - name: DATA02
      type: string  # 00=terminal specified in DATA01 01=BNC 02=COMPUTER
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: 12 bytes (DATA01-DATA12) of bit-packed error flags. Bit set1=error. See Error information list in source.
- id: power_state
  type: enum
  values: "standby, power_on, cooling, standby_error, power_saving, network_standby, unsupported"
  description: From RUNNING STATUS REQUEST DATA06 and BASIC INFORMATION REQUEST DATA01.
- id: cooling_in_progress
  type: enum
  values: "not_executed, in_progress, unsupported"
- id: power_on_off_in_progress
  type: enum
  values: "not_executed, in_progress, unsupported"
- id: input_signal_state
  type: object
  description: From INPUT STATUS REQUEST DATA01-DATA10 (signal switch process, signal list number, signal types, content displayed).
- id: picture_mute
  type: enum
  values: "off, on"
- id: sound_mute
  type: enum
  values: "off, on"
- id: onscreen_mute
  type: enum
  values: "off, on"
- id: forced_onscreen_mute
  type: enum
  values: "off, on"
- id: cover_status
  type: enum
  values: "normal_open, cover_closed"
- id: freeze_status
  type: enum
  values: "off, on"
- id: model_name
  type: string
- id: serial_number
  type: string
- id: projector_name
  type: string
- id: mac_address
  type: string
  description: 6-byte MAC address from DATA01-DATA06.
- id: lamp_usage_time_seconds
  type: integer
  description: Seconds (obtained in1-second units; updated at 1-minute intervals).
- id: lamp_remaining_life_percent
  type: integer
  description: Negative value returned if lamp replacement deadline exceeded.
- id: filter_usage_time_seconds
  type: integer
  description: -1 if undefined.
- id: filter_alarm_start_time_seconds
  type: integer
  description: -1 if undefined.
- id: carbon_savings_kg
  type: integer
  description: Max 99999 kg.
- id: carbon_savings_mg
  type: integer
  description: Max 999999 mg.
- id: lens_memory_status
  type: object
  description: Bit-packed; bit 0=Lens memory, bit 1=Zoom, bit 2=Focus, bit 3=Lens Shift H, bit 4=Lens Shift V; 0=stop 1=during operation.
- id: lens_position_current
  type: integer
  description: 16-bit current value with upper/lower limits.
- id: lens_profile_selected
  type: enum
  values: "profile_1, profile_2"
- id: eco_mode
  type: integer
  description: Model-dependent (Light mode or Lamp mode); specific values in Appendix.
- id: edge_blending_mode
  type: enum
  values: "off, on"
- id: pip_mode
  type: enum
  values: "pip, picture_by_picture"
- id: pip_start_position
  type: enum
  values: "top_left, top_right, bottom_left, bottom_right"
- id: sync_frequency_hz
  type: string
  description: Horizontal or vertical sync frequency string.
- id: setting_profile_info
  type: object
  description: DATA01-DATA03 base model type, DATA04 sound function, DATA05 profile number.
```

## Variables
```yaml
- id: projector_name
  type: string
  description: Up to 16-byte NUL-terminated string set via 098-45.
- id: eco_mode
  type: enum
  description: Model-dependent; see Appendix for valid values.
- id: edge_blending_mode
  type: enum
  values: "off, on"
- id: pip_mode
  type: enum
  values: "pip, picture_by_picture"
- id: pip_start_position
  type: enum
  values: "top_left, top_right, bottom_left, bottom_right"
- id: pip_sub_input
  type: enum
  description: SUB INPUT 1/2/3; valid values in Appendix.
- id: lens_memory_load_by_signal
  type: enum
  values: "off, on"
- id: lens_memory_forced_mute
  type: enum
  values: "off, on"
- id: audio_select
  type: object
  description: Per-input audio select (DATA02: 00=terminal-as-DATA01 01=BNC 02=COMPUTER).
```

## Events
```yaml
# Source describes only request/response transactions. No unsolicited notification# stream is documented. Section left empty pending source evidence.
```

## Macros
```yaml
# No multi-step sequences are documented in the source. Section omitted.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements beyond the note that no other command can
# be accepted while POWER ON / POWER OFF (including cooling) is in progress.
```

## Notes
Frame format (hex bytes): `SOH-like header {CMD1} {CMD2} 00 00 {LEN} {DATA...} {CKS}` where CKS = low-order byte of sum of all preceding bytes. Response on success begins with `2{cmd}` (`20h`/`21h`/`22h`/`23h` for non-data, data, opt-data, opt-data-with-extra respectively), error responses begin with `A{cmd}` and carry ERR1+ERR2. Full frame header bytes per command type are preserved above (e.g. `02 00 00 00 00 02` for POWER ON).

Source is a multi-model umbrella manual. Several commands (input terminal values, aspect ratio values, eco mode values, sub-input values, base model type values) reference an Appendix "Supplementary Information by Command" not present here — these enum values are unresolved. Commands like PIP/PBP and Lamp 2 are model-dependent.

While POWER ON or POWER OFF (including cooling) is in progress, no other command is accepted.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:05:40.457Z
last_checked_at: 2026-09-14T22:17:37.628Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:37.628Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command table entries with byte-level fidelity; transport115200/8/N/1 and TCP 7142 confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "- Source is a multi-model manual; exact ME-series subset behavior (e.g. lamp 2 vs single-lamp, PIP/PBP support) varies by model and is not enumerated here."
- "flow control not explicitly listed; full duplex mode stated but no RTS/CTS software/hardware control fieldaddressing:"
- "source contains no explicit safety warnings, interlocks, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
