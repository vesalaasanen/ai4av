---
spec_id: admin/nec-e552-r
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E552-R Control Spec"
manufacturer: NEC
model_family: E552-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E552-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T16:46:34.695Z
last_checked_at: 2026-09-14T22:17:39.084Z
generated_at: 2026-09-14T22:17:39.084Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility, model-specific input/aspect/eco value ranges (see appendix tables in source)"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source documents no other safety warnings beyond mute/power interlock behavior"
  - "firmware version compatibility, exact standby mode behavior per model, complete per-model input/aspect/eco value tables (referenced as \"Appendix: Supplementary Information by Command\" but partial in source)"
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:39.084Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command-list opcodes byte-for-byte; transport values verified; source catalogue fully represented (53/53). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC E552-R Control Spec

## Summary
NEC E552-R projector. RS-232C and wired LAN control. Protocol uses framed binary commands with checksum. LAN control uses TCP port 7142. Covers power, input selection, picture/sound/onscreen mute, shutter, lens control and memory, freeze, picture adjustments, volume, aspect, ECO mode, PIP/PBP, edge blending, and various information/status requests.

<!-- UNRESOLVED: firmware compatibility, model-specific input/aspect/eco value ranges (see appendix tables in source) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; primary per source order
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: rts_cts  # source shows RTS/CTS on pins 7/8
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from input switch command examples
- queryable       # inferred from query command examples
- levelable       # inferred from picture/volume adjust examples
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
      type: hex
      description: Input terminal code (see Input terminal values table)

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
  command: "03 10 00 00 05 {DATA01} FF {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03_DATA04
      type: hex
      description: Adjustment value (low-order 8 bits / high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02_DATA03
      type: hex
      description: Adjustment value (low-order 8 bits / high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Aspect mode (see Aspect values table)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 96 FF {DATA03}-{DATA05} {CKS}"
  params:
    - name: DATA03
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA04_DATA05
      type: hex
      description: Adjustment value (low-order 8 bits / high-order 8 bits)

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
      type: hex
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2)
    - name: DATA02
      type: hex
      description: Content (01h=usage time, 04h=remaining life)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Type (00h=Total, 01h=during operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: hex
      description: Key code (see Key code list; e.g. 05h 00h=AUTO)

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
      type: hex
      description: Target (06h=Periphery Focus)
    - name: DATA02
      type: hex
      description: Drive (00h=Stop, 01h/02h/03h=plus step, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus step)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Target adjustment

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Operation (FFh=Stop)
    - name: DATA02
      type: hex
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: DATA03_DATA04
      type: hex
      description: Adjustment value (low-order 8 bits / high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: DATA02
      type: hex
      description: Setting value (00h=OFF, 01h=ON)

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
      type: hex
      description: Profile number (00h=Profile 1, 01h=Profile 2)

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
      type: hex
      description: Adjusted value name (00h=Picture/Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust)

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
      type: hex
      description: Freeze state (01h=On, 02h=Off)

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Information type (03h=H-sync, 04h=V-sync)

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
  label: PIP/PBP Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Item (00h=MODE, 01h=START POSITION, 02h/09h/0Ah=SUB INPUT)

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
      type: hex
      description: Eco mode value (see Eco mode values table)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01}-{DATA16} 00 {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/PBP Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Item (00h=MODE, 01h=START POSITION, 02h/09h/0Ah=SUB INPUT)
    - name: DATA02
      type: hex
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Setting value (00h=Off, 01h=On)

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
      type: hex
      description: Input terminal
    - name: DATA02
      type: hex
      description: Setting value (00h=same terminal, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: 12-byte error bitfield (DATA01-DATA12). See source for per-bit meanings.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, network_standby, standby_power_saving, standby_sleep]
- id: input_signal_type_1
  type: integer
  description: Selection signal type 1 (1-5)
- id: input_signal_type_2
  type: hex
  description: Selection signal type 2 (01h=COMPUTER, 02h=VIDEO, 21h=HDMI, etc.)
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: forced_onscreen_mute
  type: enum
  values: [off, on]
- id: cover_status
  type: enum
  values: [cover_open, cover_closed]
- id: lamp_usage_time
  type: integer
  description: Seconds (low/high bytes)
- id: filter_usage_time
  type: integer
  description: Seconds (low/high bytes)
- id: eco_mode
  type: hex
  description: Eco mode value (see Eco mode values table)
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: projector_name
  type: string
  description: NUL-terminated, up to 16 bytes
- id: model_name
  type: string
  description: NUL-terminated
- id: serial_number
  type: string
  description: NUL-terminated
- id: mac_address
  type: string
  description: 6 bytes returned as hex string
- id: freeze_state
  type: enum
  values: [off, on]
- id: lens_position
  type: integer
  description: Current value (low/high bytes) with upper/lower limits
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
- id: lens_memory_status
  type: object
  description: Bitfield (lens memory, zoom, focus, shift H, shift V state)
```

## Variables
```yaml
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes)
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
- id: audio_select
  type: hex
  description: Audio source per input terminal
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for:
  - power_on
  - power_off
interlocks:
  - "While power on/off is in progress (including cooling time), no other command can be accepted"
  - "While picture/sound mute is on, input switch or signal switch cancels it"
# UNRESOLVED: source documents no other safety warnings beyond mute/power interlock behavior
```

## Notes
Command framing: header byte (00h-03h), command low byte, ID1, ID2, length, data, checksum. Checksum = low-order byte of sum of all preceding bytes.

LAN: TCP port 7142. Wired LAN supports 10/100 Mbps auto-negotiation. Pin assignments per source pinout tables.

Standby mode affects command reception. Specific standby modes (Normal, Active, Eco, NETWORK STANDBY, SLEEP, etc.) vary by model and connection type (serial vs LAN). Some models require specific standby mode for command reception.

Input terminal hex codes, aspect mode codes, eco mode codes, and selection signal type codes are model-dependent — see appendix tables in source for valid values per model.

<!-- UNRESOLVED: firmware version compatibility, exact standby mode behavior per model, complete per-model input/aspect/eco value tables (referenced as "Appendix: Supplementary Information by Command" but partial in source) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T16:46:34.695Z
last_checked_at: 2026-09-14T22:17:39.084Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:39.084Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command-list opcodes byte-for-byte; transport values verified; source catalogue fully represented (53/53). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility, model-specific input/aspect/eco value ranges (see appendix tables in source)"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source documents no other safety warnings beyond mute/power interlock behavior"
- "firmware version compatibility, exact standby mode behavior per model, complete per-model input/aspect/eco value tables (referenced as \"Appendix: Supplementary Information by Command\" but partial in source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
