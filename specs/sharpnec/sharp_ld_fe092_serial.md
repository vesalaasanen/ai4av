---
spec_id: admin/sharp-nec-ld-fe092
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LD Fe092 Control Spec"
manufacturer: Sharp/NEC
model_family: "LD Fe092"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LD Fe092"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:23:13.846Z
last_checked_at: 2026-06-17T20:05:34.283Z
generated_at: 2026-06-17T20:05:34.283Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for LD Fe092 not stated in source"
  - "device does not document unsolicited push notifications."
  - "source documents no unsolicited event notifications."
  - "source documents no explicit multi-step macro sequences."
  - "source states no explicit power-on sequencing interlock procedure"
  - "model code (ID2) for LD Fe092 not stated in source"
  - "control ID (ID1) default not stated in source"
  - "appendix enum values (input terminal, aspect, eco mode, base model type, sub-input) not in refined excerpt"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:05:34.283Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly to source command reference; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LD Fe092 Control Spec

## Summary
Sharp/NEC LD Fe092 projector control spec. Supports RS-232C serial and TCP/IP (wired/wireless LAN) control via binary hex command protocol with checksums. Covers power, input switching, mutes, picture/volume/lens adjustment, status queries, lens memory, eco mode, PIP/PbP, edge blending, and device information requests.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for LD Fe092 not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # auto-switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex stated, no flow control field named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands
  - queryable    # inferred from numerous status request commands
  - levelable    # inferred from picture/volume/gain adjustment commands
  - routable     # inferred from INPUT SW CHANGE routing command
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During cooldown, no other command accepted."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (see Appendix 'Supplementary Information by Command'); example 06h = video port"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} - {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} - {DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Aspect value (see Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} - {DATA05} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: enum
      description: "Reserved/FFh"
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type); see key code list e.g. 05h=AUTO, 06h=MENU, 84h=VOLUME UP"
    - name: DATA02
      type: integer
      description: "Key code high byte (typically 00h)"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens function (per source table); 06h=Periphery Focus"
    - name: DATA02
      type: enum
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} - {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens function (FFh=Stop)"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number selected via LENS PROFILE SET."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Eco/Light/Lamp mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
  params:
    - name: name_bytes
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value per DATA01 (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TOP-LEFT...03h=BOTTOM-RIGHT; sub input value see Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: enum
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 carries bitfield error info (cover, fan, temp, lamp, etc.)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time, filter usage time."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time and filter alarm start time (-1 if undefined)."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens function selector"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield of lens function operating states (lens memory, zoom, focus, shift-H/V)."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/clock/sleep timer capability."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling, power-on process, operation status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch, signal list number, selection signal types, test pattern, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state."

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
  notes: "Returns mirror/lens cover status: 00h=opened, 01h=closed."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

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
  notes: "Returns operation status, content displayed, signal types, mute/freeze state."
```

## Feedbacks
```yaml
# Binary command protocol - responses are echoes (2Xh/3Xh ACK frames) or error
# frames (AXh with ERR1/ERR2). No discrete named feedback channels; status is
# pulled via query commands (see Actions, kind: query).
# Error code (ERR1 ERR2) combinations defined by source:
#   00h 00h = command not recognized
#   00h 01h = command not supported by model
#   01h 00h = specified value invalid
#   01h 01h = specified input terminal invalid
#   01h 02h = specified language invalid
#   02h 00h = memory allocation error
#   02h 02h = memory in use
#   02h 03h = specified value cannot be set
#   02h 04h = forced onscreen mute on
#   02h 06h = viewer error
#   02h 07h = no signal
#   02h 08h = test pattern/filter displayed
#   02h 09h = no PC card inserted
#   02h 0Ah = memory operation error
#   02h 0Ch = entry list displayed
#   02h 0Dh = command not accepted (power off)
#   02h 0Eh = command execution failed
#   02h 0Fh = no authority for operation
#   03h 00h = specified gain number incorrect
#   03h 01h = specified gain invalid
#   03h 02h = adjustment failed
# UNRESOLVED: device does not document unsolicited push notifications.
```

## Variables
```yaml
# All settable parameters are exposed via the parameterized Actions above
# (volume, picture adjustments, lens position, eco mode, projector name, etc.).
# No additional standalone variables documented.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on   # while turning on, no other command accepted (per source §3.2)
  - power_off  # during cooldown, no other command accepted (per source §3.3)
notes: >
  Error status (009) surfaces safety-relevant faults: cover error, fan error,
  temperature error (bi-metallic strip and sensor), power error, lamp off /
  replacement moratorium, lamp usage time exceeded, formatter/FPGA error,
  mirror cover error, foreign-matter sensor, interlock switch open,
  ballast communication error, iris calibration error, lens not installed.
# UNRESOLVED: source states no explicit power-on sequencing interlock procedure
# beyond 'no other command accepted during transition'.
```

## Notes
- Command/response frames use hex notation with leading `h` (e.g. `02h`). Frames end in `<CKS>` checksum = low byte of sum of all preceding bytes. ID1 (control ID) and ID2 (model code) appear in ACK/error responses; values vary per projector and are not stated for LD Fe092 in this source.
- Serial config (RS-232C, D-SUB 9P cross cable): full-duplex, baud switchable across 4800/9600/19200/38400/115200. LAN control uses TCP port 7142 over wired (10/100BASE-TX) or wireless LAN.
- Information updates (lamp usage, filter usage) refresh at 1-minute intervals despite 1-second resolution.
- Many parameter enums (input terminal values, aspect values, eco mode values, base model types, sub-input values) are deferred by the source to an "Appendix: Supplementary Information by Command" not included in this refined excerpt.
<!-- UNRESOLVED: model code (ID2) for LD Fe092 not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->
<!-- UNRESOLVED: appendix enum values (input terminal, aspect, eco mode, base model type, sub-input) not in refined excerpt -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
````

Self-check pass: no voltage/current/power invented, ports/baud only stated values, status=draft, confidence=low, all 53 source rows enumerated as actions/queries, payloads verbatim hex with CKS preserved.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:23:13.846Z
last_checked_at: 2026-06-17T20:05:34.283Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:05:34.283Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly to source command reference; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for LD Fe092 not stated in source"
- "device does not document unsolicited push notifications."
- "source documents no unsolicited event notifications."
- "source documents no explicit multi-step macro sequences."
- "source states no explicit power-on sequencing interlock procedure"
- "model code (ID2) for LD Fe092 not stated in source"
- "control ID (ID1) default not stated in source"
- "appendix enum values (input terminal, aspect, eco mode, base model type, sub-input) not in refined excerpt"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
