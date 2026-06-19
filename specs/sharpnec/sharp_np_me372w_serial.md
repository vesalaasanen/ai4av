---
spec_id: admin/sharp-nec-np-me372w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME372W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME372W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME372W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:28:20.414Z
last_checked_at: 2026-06-18T08:38:33.575Z
generated_at: 2026-06-18T08:38:33.575Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, and base-model-type value maps is not present in the refined source, so enumerated values for those parameterized commands are incomplete."
  - "appendix not in refined source"
  - "source documents adjustable parameters (brightness/contrast/color/hue/sharpness/volume/lamp-adjust)"
  - "source describes only request/response. No unsolicited notification frames documented."
  - "no multi-step sequences described in source."
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" (input-terminal, aspect, eco-mode, base-model-type, sub-input value maps) not present in refined source — parameterized commands for these cannot be fully enumerated."
  - "flow_control not named in source; full-duplex stated but hardware flow control unspecified."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:38:33.575Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME372W Control Spec

## Summary
Control spec for the Sharp/NEC NP ME372W projector, derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Covers binary-frame control over both RS-232C serial and TCP/IP (LAN port 7142). Commands are fixed-length hex frames with a trailing additive checksum byte.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input-terminal, aspect, eco-mode, and base-model-type value maps is not present in the refined source, so enumerated values for those parameterized commands are incomplete. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex stated; no flow-control field named in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable     # inferred: numerous 037/078/305 status request commands
  - levelable     # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable      # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# All command payloads are verbatim hex frames from the source. <ID1> = control ID,
# <ID2> = model code, <CKS> = additive checksum (low byte of sum of all preceding bytes).
# Query commands use prefix 00h/02h/03h; normal replies use 20h/22h/23h; error replies A0h/A2h/A3h.

- id: error_status_request
  label: 009 Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015 Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016 Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018 Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (e.g. 06h = video port). Full value map in Appendix "Supplementary Information by Command".  # UNRESOLVED: appendix not in refined source

- id: picture_mute_on
  label: 020 Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021 Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023 Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025 Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: 030-2 Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: 030-12 Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Aspect value code. Full value map in Appendix "Supplementary Information by Command".  # UNRESOLVED: appendix not in refined source

- id: other_adjust
  label: 030-15 Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "FFh (fixed per source for LAMP ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: 037 Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3 Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4 Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time (seconds), 04h remaining life (%)"

- id: carbon_savings_information_request
  label: 037-6 Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: 050 Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys)

- id: shutter_close
  label: 051 Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis: 06h Periphery Focus (and others per source)"
    - name: DATA02
      type: integer
      description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"

- id: lens_control_request
  label: 053-1 Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens axis (see 053 Lens Control)

- id: lens_control_2
  label: 053-2 Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis; FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: 053-3 Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4 Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET (acts on profile set by 053-10)"

- id: lens_memory_option_request
  label: 053-5 Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6 Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7 Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10 Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11 Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1 Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

- id: setting_request
  label: 078-1 Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2 Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: 078-3 Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: 078-4 Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: 078-5 Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6 Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: 079 Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: 084 Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

- id: eco_mode_request
  label: 097-8 Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45 LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155 LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198 PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1 Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8 Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value. Full value map in Appendix "Supplementary Information by Command".  # UNRESOLVED: appendix not in refined source

- id: lan_projector_name_set
  label: 098-45 LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: 098-198 PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode/position/sub-input per DATA01). Sub-input values in Appendix."

- id: edge_blending_mode_set
  label: 098-243-1 Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON"

- id: base_model_type_request
  label: 305-1 Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: 305-2 Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3 Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: 319-10 Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (Appendix "Supplementary Information by Command").
    - name: DATA02
      type: integer
      description: "Audio source: 00h terminal in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Responses are frame-prefixed (20h/22h/23h success, A0h/A2h/A3h error).
# Success frames echo the command prefix with LEN + data; error frames carry ERR1/ERR2.
- id: power_on_response
  type: enum
  values: [success, error]
  description: "Response prefix 22h 00h (success) or A2h 00h (error with ERR1/ERR2)"

- id: error_status
  type: bitmask
  description: "009 response: DATA01-04 error bits, DATA09 extended status (cover/interlock/system errors)"

- id: lamp_information
  type: object
  description: "037-4 response: usage seconds + remaining life %"

- id: filter_usage
  type: object
  description: "037-3 response: usage seconds + alarm start seconds (-1 if undefined)"

- id: running_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06 operation status"

- id: mute_status
  type: object
  description: "078-4 response: picture/sound/onscreen/forced-onscreen/onscreen-display flags"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 DATA01"
```

## Variables
```yaml
# UNRESOLVED: source documents adjustable parameters (brightness/contrast/color/hue/sharpness/volume/lamp-adjust)
# via 030-* set and 060-1 get, but absolute range/default tables are returned dynamically by the device,
# not enumerated in the source. Ranges are device-reported at runtime.
```

## Events
```yaml
# UNRESOLVED: source describes only request/response. No unsolicited notification frames documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational constraints (not safety interlocks):
#   - 015 POWER ON / 016 POWER OFF: no other command accepted while power transition in progress (incl. cooling).
#   - 020/022/024 mute commands auto-clear on input/video switch (and volume adjust for sound mute).
# No explicit safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- Binary frame protocol. All payloads are hex bytes; `<ID1>` = projector control ID, `<ID2>` = model code, `<CKS>` = additive checksum (low byte of sum of all preceding bytes).
- Reply prefixes: `20h/22h/23h` = success (command-class dependent), `A0h/A2h/A3h` = error with ERR1/ERR2 codes (see source §2.4 error code list).
- Serial supports selectable baud 115200/38400/19200/9600/4800 bps; spec records 9600 as a documented valid value — configure per deployment.
- TCP control uses port 7142 (stated in source §1.2).
- Remote key code (050) key map enumerated verbatim from source table.
- Error status (009) error-information bit map documented verbatim in source §3.1.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input-terminal, aspect, eco-mode, base-model-type, sub-input value maps) not present in refined source — parameterized commands for these cannot be fully enumerated. -->
<!-- UNRESOLVED: flow_control not named in source; full-duplex stated but hardware flow control unspecified. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:28:20.414Z
last_checked_at: 2026-06-18T08:38:33.575Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:38:33.575Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, and base-model-type value maps is not present in the refined source, so enumerated values for those parameterized commands are incomplete."
- "appendix not in refined source"
- "source documents adjustable parameters (brightness/contrast/color/hue/sharpness/volume/lamp-adjust)"
- "source describes only request/response. No unsolicited notification frames documented."
- "no multi-step sequences described in source."
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" (input-terminal, aspect, eco-mode, base-model-type, sub-input value maps) not present in refined source — parameterized commands for these cannot be fully enumerated."
- "flow_control not named in source; full-duplex stated but hardware flow control unspecified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
