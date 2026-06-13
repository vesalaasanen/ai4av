---
spec_id: admin/nec-pxm3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PXM3 Series Projector Control Spec"
manufacturer: NEC
model_family: "PXM3 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PXM3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T17:27:09.190Z
last_checked_at: 2026-06-11T13:46:46.363Z
generated_at: 2026-06-11T13:46:46.363Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port number (7142) stated; serial port path is \"PC CONTROL\" D-SUB 9P. No auth procedure documented for either transport."
  - "response payloads documented per command; would require 1:1 feedback"
  - "input terminal values, aspect values, eco mode values, and"
  - "source documents only request/response model; no unsolicited"
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "full enumeration of input terminals, aspect codes, eco mode values, base model type codes, sub-input codes, gain number ranges — all in unprovided Appendix."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:46:46.363Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched with literal hex opcodes in source; transport parameters verified against source documentation. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# NEC PXM3 Series Projector Control Spec

## Summary
NEC PXM3 Series projector control via RS-232C serial (D-SUB 9P, PC CONTROL) and wired/wireless LAN (TCP port 7142). Binary framed protocol with header byte, command ID, ID1/ID2, length, data, and checksum (low-order byte of sum of preceding bytes).

<!-- UNRESOLVED: LAN port number (7142) stated; serial port path is "PC CONTROL" D-SUB 9P. No auth procedure documented for either transport. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 listed first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex
addressing:
  port: 7142  # TCP port for LAN control per source section 1.2
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from POWER ON/OFF commands
- routable        # inferred from INPUT SW CHANGE, AUDIO SELECT SET
- queryable       # inferred from INFORMATION REQUEST, status query commands
- levelable       # inferred from VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST
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
      type: hex_byte
      description: Input terminal code (e.g. 06h for video port)

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
      type: hex_byte
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
    - name: DATA02
      type: hex_byte
      description: Mode (00h absolute, 01h relative)
    - name: DATA03
      type: hex_byte
      description: Adjustment value low byte
    - name: DATA04
      type: hex_byte
      description: Adjustment value high byte

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: Mode (00h absolute, 01h relative)
    - name: DATA02
      type: hex_byte
      description: Adjustment value low byte
    - name: DATA03
      type: hex_byte
      description: Adjustment value high byte

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: Aspect value

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: Target (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: hex_byte
      description: Target sub-code (FFh for LAMP/LIGHT ADJUST)
    - name: DATA03
      type: hex_byte
      description: Mode (00h absolute, 01h relative)
    - name: DATA04
      type: hex_byte
      description: Adjustment value low byte
    - name: DATA05
      type: hex_byte
      description: Adjustment value high byte

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
      type: hex_byte
      description: Lamp (00h Lamp 1, 01h Lamp 2 - Lamp 2 only on two-lamp models)
    - name: DATA02
      type: hex_byte
      description: Content (01h usage time seconds, 04h remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h Total, 01h during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: Key code high byte
    - name: DATA02
      type: hex_byte
      description: Key code low byte

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
      type: hex_byte
      description: Target (06h Periphery Focus, etc.)
    - name: DATA02
      type: hex_byte
      description: Drive direction/duration (00h Stop, 7Fh plus, 81h minus, etc.)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: Lens target identifier

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: FFh Stop, or target identifier
    - name: DATA02
      type: hex_byte
      description: Mode (00h absolute, 02h relative)
    - name: DATA03
      type: hex_byte
      description: Value low byte
    - name: DATA04
      type: hex_byte
      description: Value high byte

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h MOVE, 01h STORE, 02h RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h MOVE, 01h STORE, 02h RESET

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE
    - name: DATA02
      type: hex_byte
      description: 00h OFF, 01h ON

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
      type: hex_byte
      description: Profile number (00h Profile 1, 01h Profile 2)

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
      type: hex_byte
      description: Adjusted value name (00h Brightness, 05h Volume, 96h Lamp/Light, etc.)

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
      type: hex_byte
      description: 01h freeze on, 02h freeze off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 03h horizontal sync frequency, 04h vertical sync frequency

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
      type: hex_byte
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3

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
      type: hex_byte
      description: Eco mode value (model-specific; see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01-16} 00 {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3
    - name: DATA02
      type: hex_byte
      description: Setting value (depends on DATA01)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex_byte
      description: 00h OFF, 01h ON

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
      type: hex_byte
      description: Input terminal
    - name: DATA02
      type: hex_byte
      description: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER
```

## Feedbacks
```yaml
# UNRESOLVED: response payloads documented per command; would require 1:1 feedback
# table mirroring each action's <ID1> <ID2> LEN DATA.. <CKS> structure.
# Removed pending per-action implementation.
```

## Variables
```yaml
# UNRESOLVED: input terminal values, aspect values, eco mode values, and
# sub-input setting values all reference an "Appendix: Supplementary
# Information by Command" not included in the source. Marked unresolved.
```

## Events
```yaml
# UNRESOLVED: source documents only request/response model; no unsolicited
# notifications described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements documented in source beyond "no other command accepted while
# POWER ON/OFF in progress" (operational, not safety).
```

## Notes
- Protocol uses binary frames: header, command byte, ID1/ID2, data length, variable data, checksum (low byte of sum of preceding bytes).
- Source notes: "No other command can be accepted" while POWER ON or POWER OFF (including cooling) is in progress.
- The appendix "Supplementary Information by Command" referenced throughout (input terminals, aspect values, eco mode values, base model type codes, sub-input codes) is NOT included in the source — these parameter values are unresolved.
- Lamp usage time and filter usage time are reported in seconds; readings update at one-minute intervals.
- MAC address response example: 01h-23h-45h-67h-89h-ABh.
- LAN connection data rate auto-switches 10/100 Mbps; supports IEEE802.3 / IEEE802.3u.

<!-- UNRESOLVED: full enumeration of input terminals, aspect codes, eco mode values, base model type codes, sub-input codes, gain number ranges — all in unprovided Appendix. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T17:27:09.190Z
last_checked_at: 2026-06-11T13:46:46.363Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:46:46.363Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched with literal hex opcodes in source; transport parameters verified against source documentation. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port number (7142) stated; serial port path is \"PC CONTROL\" D-SUB 9P. No auth procedure documented for either transport."
- "response payloads documented per command; would require 1:1 feedback"
- "input terminal values, aspect values, eco mode values, and"
- "source documents only request/response model; no unsolicited"
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "full enumeration of input terminals, aspect codes, eco mode values, base model type codes, sub-input codes, gain number ranges — all in unprovided Appendix."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
