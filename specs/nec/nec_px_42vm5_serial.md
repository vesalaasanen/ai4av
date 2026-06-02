---
spec_id: admin/nec-px-42vm5
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PX-42VM5 Control Spec"
manufacturer: NEC
model_family: PX-42VM5
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - PX-42VM5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:39:05.619Z
last_checked_at: 2026-05-31T06:48:45.485Z
generated_at: 2026-05-31T06:48:45.485Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN not fully documented in source"
  - "no single default stated; source lists 115200/38400/19200/9600/4800 bps"
  - "RTS/CTS shown in pinout but no flow control config stated"
  - "feedbacks defined by response structure in source"
  - "detailed variable mappings require appendix \"Supplementary Information by Command\""
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences described in source"
  - "power-on sequencing, voltage/current specs not stated"
  - "appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, sub input values)"
  - "wireless LAN unit details deferred to separate operation manual"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:48:45.485Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match semantically to source commands with identical purpose and parameters; transport parameters verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# NEC PX-42VM5 Control Spec

## Summary
NEC PX-42VM5 professional projector supporting RS-232C serial and wired LAN control. Supports power on/off, input switching, picture/sound/onscreen mute, lens control, and comprehensive status queries via hex-based command protocol with checksum.

<!-- UNRESOLVED: wireless LAN not fully documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: LAN connection documented with TCP port 7142
serial:
  baud_rate: null  # UNRESOLVED: no single default stated; source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS shown in pinout but no flow control config stated
addressing:
  port: 7142  # TCP port for LAN commands
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON/OFF commands present
- routable   # inferred: INPUT SW CHANGE command present
- queryable  # inferred: INFORMATION REQUEST, STATUS REQUEST, MODEL NAME REQUEST, etc. present
- levelable  # inferred: VOLUME ADJUST, PICTURE ADJUST, GAIN PARAMETER REQUEST present
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

- id: input_sw_change
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
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect setting value (see appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP/LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD type, e.g. 02h=POWER ON, 03h=POWER OFF, 0Fh=MAGNIFY UP, etc.)"

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
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=plus 1s/0.5s/0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value

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
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
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
      description: Eco mode value (see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

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
    - name: value
      type: integer
      description: "00h=specified terminal, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: Lens control target

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: feedbacks defined by response structure in source
# All commands return A0h/A1h/A2h/A3h prefix with ERR1/ERR2 codes
# Error codes: 00h00h=unrecognized, 00h01h=unsupported, 01h00h=invalid value,
#              01h01h=invalid input terminal, 01h02h=invalid language,
#              02h00h=memory alloc, 02h02h=memory in use, 02h03h=cannot set,
#              02h04h=forced onscreen mute, 02h06h=viewer error, 02h07h=no signal,
#              02h08h=test pattern, 02h09h=no PC card, 02h0Ah=memory operation,
#              02h0Ch=entry list displayed, 02h0Dh=power off, 02h0Eh=exec failed,
#              02h0Fh=no authority, 03h00h=wrong gain number, 03h01h=invalid gain,
#              03h02h=adjustment failed
```

## Variables
```yaml
# UNRESOLVED: detailed variable mappings require appendix "Supplementary Information by Command"
# Input terminal values, aspect values, eco mode values, sub input values not fully stated
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command executes, no other command accepted"
  - "While POWER OFF command executes (including cooling time), no other command accepted"
  # UNRESOLVED: power-on sequencing, voltage/current specs not stated
```

## Notes
Serial and TCP command protocol uses hex format: `20h <ID1> <ID2> 0Ch <DATA...> <CKS>` for commands, `A0h/A1h/A2h/A3h <ID1> <ID2> <LEN> <DATA...> <CKS>` for responses. Checksum = low-order byte of sum of all preceding bytes. Flow control: RTS/CTS hardware handshaking shown in pinout (pins 7/8). Projector name, serial number, lamp/filter usage time obtainable via query commands. Carbon savings, eco mode, PIP/PbP, edge blending configurable.
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values not included (input terminal codes, aspect values, eco mode values, sub input values) -->
<!-- UNRESOLVED: wireless LAN unit details deferred to separate operation manual -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:39:05.619Z
last_checked_at: 2026-05-31T06:48:45.485Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:48:45.485Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match semantically to source commands with identical purpose and parameters; transport parameters verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN not fully documented in source"
- "no single default stated; source lists 115200/38400/19200/9600/4800 bps"
- "RTS/CTS shown in pinout but no flow control config stated"
- "feedbacks defined by response structure in source"
- "detailed variable mappings require appendix \"Supplementary Information by Command\""
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences described in source"
- "power-on sequencing, voltage/current specs not stated"
- "appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, sub input values)"
- "wireless LAN unit details deferred to separate operation manual"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
