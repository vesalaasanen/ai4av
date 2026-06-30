---
spec_id: admin/sharpnec-np-pa621x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PA621X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PA621X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PA621X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:22:52.823Z
last_checked_at: 2026-06-18T08:49:56.856Z
generated_at: 2026-06-18T08:49:56.856Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated in source"
  - "model code (ID2) value for this specific model not stated in source"
  - "flow control not explicitly named (source states full-duplex only)"
  - "detailed feedback payload schemas for lamp/filter/carbon/information responses are large; not all enumerated here."
  - "full variable min/max/default ranges model-specific; gain_parameter_request_3 returns them per device."
  - "no event/notification mechanism described in source."
  - "no multi-step sequences described in source."
  - "source documents no power-on sequencing interlocks beyond the \"no other command accepted\" notes."
  - "model code (ID2) for NP PA621X not stated in source"
  - "control ID (ID1) default value not stated in source"
  - "flow_control not explicitly named; source states \"Full duplex\" only"
  - "firmware version compatibility range not stated in source"
  - "input terminal / aspect / eco-mode enum values referenced as \"see Appendix\" but appendix not present in source text"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:49:56.856Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PA621X Control Spec

## Summary
Sharp/NEC NP PA621X projector control spec derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Device supports control over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). Binary hex command framing with checksum byte.

<!-- UNRESOLVED: firmware version range not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported set: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly named (source states full-duplex only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (power on/off commands present)
# - routable     (input switch commands present)
# - queryable    (many status request commands returning values)
# - levelable    (volume / picture adjust commands present)
```

## Actions
```yaml
# Frame: 20h/02h/03h/01h/00h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID, ID2 = model code. CKS = low byte of sum of all preceding bytes.
# Each command below lists the literal payload from the source, verbatim.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command"; example 06h = video port)

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target hi-byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target lo-byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (WORD type, see Key code list in source)
    - name: DATA02
      type: integer
      description: Key code high byte

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (06h=Periphery Focus; other axes per source)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+, 81h=-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, DATA01-DATA16)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: Setting value (varies by DATA01; see Appendix "Supplementary Information by Command")

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each query command returns a framed response: <RespHi> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Success responses use prefix 20h/22h/23h/21h matching command class.
# Error responses use prefix A0h/A2h/A3h/A1h with ERR1/ERR2 codes (see source 2.4).
- id: error_status
  type: bitmap
  description: 12-byte error bitmap (DATA01-DATA12) - bit set = error
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
- id: mute_state
  type: composite
  description: picture/sound/onscreen/forced-onscreen/onscreen-display mute flags
- id: cover_status
  type: enum
  values: [normal_open, closed]
- id: eco_mode_value
  type: integer
- id: edge_blending_state
  type: enum
  values: [off, on]
# UNRESOLVED: detailed feedback payload schemas for lamp/filter/carbon/information responses are large; not all enumerated here.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness (DATA01=00h)
- id: contrast
  type: integer
  description: Picture contrast (DATA01=01h)
- id: color
  type: integer
- id: hue
  type: integer
- id: sharpness
  type: integer
- id: volume
  type: integer
- id: lamp_light_adjust
  type: integer
  description: LAMP ADJUST / LIGHT ADJUST (DATA01=96h)
- id: aspect
  type: enum
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes)
# UNRESOLVED: full variable min/max/default ranges model-specific; gain_parameter_request_3 returns them per device.
```

## Events
```yaml
# Source documents no unsolicited notifications - all responses are command/reply.
# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While power-on is in progress, no other command can be accepted.
  - command: power_off
    note: While power-off (including cooling time) is in progress, no other command can be accepted.
# UNRESOLVED: source documents no power-on sequencing interlocks beyond the "no other command accepted" notes.
```

## Notes
- Command framing: `20h/02h/03h/01h/00h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>` for queries/sets (prefix varies by command class — 00h/01h/02h/03h). Response prefix mirrors command class with high bit set (20h→ok, A0h→err, etc.).
- Checksum: sum of all preceding bytes, take low-order 8 bits.
- ID1 = control ID set on projector; ID2 = model code (varies by model).
- Usage-time fields update at 1-minute intervals though stored in 1-second units.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Sound/picture/onscreen mute auto-clear on input switch, video signal switch, or (sound mute only) volume adjustment.

<!-- UNRESOLVED: model code (ID2) for NP PA621X not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->
<!-- UNRESOLVED: flow_control not explicitly named; source states "Full duplex" only -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: input terminal / aspect / eco-mode enum values referenced as "see Appendix" but appendix not present in source text -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:22:52.823Z
last_checked_at: 2026-06-18T08:49:56.856Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:49:56.856Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated in source"
- "model code (ID2) value for this specific model not stated in source"
- "flow control not explicitly named (source states full-duplex only)"
- "detailed feedback payload schemas for lamp/filter/carbon/information responses are large; not all enumerated here."
- "full variable min/max/default ranges model-specific; gain_parameter_request_3 returns them per device."
- "no event/notification mechanism described in source."
- "no multi-step sequences described in source."
- "source documents no power-on sequencing interlocks beyond the \"no other command accepted\" notes."
- "model code (ID2) for NP PA621X not stated in source"
- "control ID (ID1) default value not stated in source"
- "flow_control not explicitly named; source states \"Full duplex\" only"
- "firmware version compatibility range not stated in source"
- "input terminal / aspect / eco-mode enum values referenced as \"see Appendix\" but appendix not present in source text"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
