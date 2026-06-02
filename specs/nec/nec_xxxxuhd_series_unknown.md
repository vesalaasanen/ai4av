---
spec_id: admin/nec-xxxxuhd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XxxxUHD Series Control Spec"
manufacturer: NEC
model_family: "XxxxUHD Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XxxxUHD Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:15:15.939Z
last_checked_at: 2026-06-02T22:12:41.788Z
generated_at: 2026-06-02T22:12:41.788Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit not documented; appendix \"Supplementary Information by Command\" not included in source"
  - "no unsolicited event documentation in source"
  - "no explicit multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "Appendix \"Supplementary Information by Command\" not included; input terminal values, aspect values, eco mode values, sub input values not populated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:41.788Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC XxxxUHD Series Control Spec

## Summary
NEC XxxxUHD Series projector. Control via RS-232C serial and wired LAN (TCP). Serial: RS-232C, full duplex, configurable baud rate (115200/38400/19200/9600/4800 bps), 8 data bits, no parity, 1 stop bit. LAN: TCP port 7142, no authentication required.
<!-- UNRESOLVED: wireless LAN unit not documented; appendix "Supplementary Information by Command" not included in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
powerable: true
routable: true
queryable: true
levelable: true
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: input_switch
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal value (hex, e.g. 06h for video)
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed volume value
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see Appendix)
- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
- id: remote_key
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code value (see key code table)
- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive cont plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus timed"
- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop, otherwise adjustment"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit signed position value
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Load by Signal, 01h=Forced Mute"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix)
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
- id: pip_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per item
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal value
    - name: setting
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER, 01h=BNC"
- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  kind: feedback
  params: []
- id: input_status
  label: Input Status Request
  kind: feedback
  params: []
- id: mute_status
  label: Mute Status Request
  kind: feedback
  params: []
- id: running_status
  label: Running Status Request
  kind: feedback
  params: []
- id: setting_request
  label: Setting Request
  kind: feedback
  params: []
- id: model_name_request
  label: Model Name Request
  kind: feedback
  params: []
- id: cover_status_request
  label: Cover Status Request
  kind: feedback
  params: []
- id: information_request
  label: Information Request
  kind: feedback
  params: []
- id: filter_usage_request
  label: Filter Usage Information Request
  kind: feedback
  params: []
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: feedback
  params: []
- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: feedback
  params: []
- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: feedback
  params: []
- id: eco_mode_request
  label: Eco Mode Request
  kind: feedback
  params: []
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: feedback
  params: []
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: feedback
  params: []
- id: pip_request
  label: PIP/Picture by Picture Request
  kind: feedback
  params: []
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: feedback
  params: []
- id: lens_control_request
  label: Lens Control Request
  kind: feedback
  params: []
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: feedback
  params: []
- id: lens_profile_request
  label: Lens Profile Request
  kind: feedback
  params: []
- id: lens_information_request
  label: Lens Information Request
  kind: feedback
  params: []
- id: base_model_type_request
  label: Base Model Type Request
  kind: feedback
  params: []
- id: serial_number_request
  label: Serial Number Request
  kind: feedback
  params: []
- id: basic_information_request
  label: Basic Information Request
  kind: feedback
  params: []
- id: information_string_request
  label: Information String Request
  kind: feedback
  params: []
```

## Variables
```yaml
- id: input_terminal
  type: integer
  description: Current input terminal selection (see Appendix for values)
- id: brightness
  type: integer
  description: Brightness adjustment value
- id: contrast
  type: integer
  description: Contrast adjustment value
- id: color
  type: integer
  description: Color adjustment value
- id: hue
  type: integer
  description: Hue adjustment value
- id: sharpness
  type: integer
  description: Sharpness adjustment value
- id: volume
  type: integer
  description: Volume adjustment value
- id: aspect
  type: integer
  description: Aspect ratio setting
- id: lamp_adjust
  type: integer
  description: Lamp/Light adjustment value
- id: eco_mode
  type: integer
  description: Eco mode setting
- id: projector_name
  type: string
  description: LAN projector name
- id: pip_mode
  type: integer
  description: PIP/Picture-by-Picture mode
- id: edge_blending
  type: integer
  description: Edge blending mode (00h=OFF, 01h=ON)
- id: lens_position
  type: integer
  description: Lens position value
- id: lens_profile
  type: integer
  description: Lens profile number (00h=Profile 1, 01h=Profile 2)
- id: freeze
  type: integer
  description: Freeze state (01h=on, 02h=off)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol uses hexadecimal notation for all command and data bytes.
- Commands require Control ID (ID1) and Model Code (ID2) parameters. Checksum (CKS) calculated as low-order byte of sum of all preceding bytes.
- Power On/Off commands block other commands during execution (including cooling time).
- Input terminal values are documented in the Appendix "Supplementary Information by Command" which is not included in this source.
- Lens peripheral focus (06h) is the only function code documented for command 053 LENS CONTROL.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included; input terminal values, aspect values, eco mode values, sub input values not populated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:15:15.939Z
last_checked_at: 2026-06-02T22:12:41.788Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:41.788Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit not documented; appendix \"Supplementary Information by Command\" not included in source"
- "no unsolicited event documentation in source"
- "no explicit multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "Appendix \"Supplementary Information by Command\" not included; input terminal values, aspect values, eco mode values, sub input values not populated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
