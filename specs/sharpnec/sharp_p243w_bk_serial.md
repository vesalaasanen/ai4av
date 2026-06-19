---
spec_id: admin/sharp-nec-p243w-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P243W Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "P243W Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P243W Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:53:38.290Z
last_checked_at: 2026-06-18T08:58:03.198Z
generated_at: 2026-06-18T08:58:03.198Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is a generic Sharp/NEC projector command reference; model-specific support flags and \"Supplementary Information by Command\" appendix (input-terminal value tables, base-model-type values, eco-mode values, sub-input values) are referenced but not included in the refined excerpt. Firmware compatibility not stated."
  - "no unsolicited notification events documented in source."
  - "no multi-step sequences described explicitly in source."
  - "source does not specify voltage/current/power specs, fault recovery sequences, or full power-on sequencing requirements. Error bitmasks indicate fault detection (cover, fan, temperature, interlock switch open) but explicit safety interlock procedures are not documented."
  - "\"Supplementary Information by Command\" appendix (input-terminal value map, base-model-type values, eco-mode values, sub-input values) referenced repeatedly but not present in the refined excerpt."
  - "model code (ID2) value for P243W Bk not stated in source."
  - "which 030-1 picture-adjust targets / 053 lens-control targets / 097-198 sub-inputs are actually supported on this model not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:58:03.198Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P243W Bk Control Spec

## Summary
Sharp/NEC projector control spec derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Covers RS-232C serial and TCP/IP (wired/wireless LAN) control of power, input switching, picture/volume/mute, lens, shutter, lens memory, eco mode, PIP/PbP, edge blending, and a broad set of status queries using a binary hex command frame with a trailing checksum byte.

<!-- UNRESOLVED: source document is a generic Sharp/NEC projector command reference; model-specific support flags and "Supplementary Information by Command" appendix (input-terminal value tables, base-model-type values, eco-mode values, sub-input values) are referenced but not included in the refined excerpt. Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # auto-negotiable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; hardware flow lines (RTS/CTS) wired in pinout
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF commands
  - routable       # inferred from INPUT SW CHANGE command
  - queryable      # inferred from numerous status request commands
  - levelable      # inferred from PICTURE/VOLUME/LAMP adjust commands
  - mutable        # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
actions:
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
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Input terminal value (e.g. 06h = video port). See "Supplementary Information by Command" appendix.
      - name: cks
        type: string
        description: Checksum byte (low-order 8 bits of sum of all preceding bytes)

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
    command: "03h 10h 00h 00h 05h {data01} FFh {data02}-{data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: string
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: string
        description: Adjustment value (high-order 8 bits)
      - name: cks
        type: string
        description: Checksum byte

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01}-{data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: string
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: string
        description: Adjustment value (high-order 8 bits)
      - name: cks
        type: string
        description: Checksum byte

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Aspect value. See "Supplementary Information by Command" appendix.
      - name: cks
        type: string
        description: Checksum byte

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01}-{data05} {cks}"
    params:
      - name: data01
        type: string
        description: "96h for LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: string
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: string
        description: Adjustment value (high-order 8 bits)
      - name: cks
        type: string
        description: Checksum byte

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
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "01h=usage time (s), 04h=remaining life (%)"
      - name: cks
        type: string
        description: Checksum byte

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
      - name: cks
        type: string
        description: Checksum byte

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (e.g. 05h=AUTO, 06h=MENU, 4Bh=COMPUTER1, 84h=VOLUME UP)"
      - name: data02
        type: string
        description: Key code high byte (00h for listed keys)
      - name: cks
        type: string
        description: Checksum byte

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (e.g. 06h=Periphery Focus)"
      - name: data02
        type: string
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Lens target
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01}-{data04} {cks}"
    params:
      - name: data01
        type: string
        description: "FFh=Stop, otherwise lens target"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: string
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: string
        description: Adjustment value (high-order 8 bits)
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: string
        description: Checksum byte

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "00h=OFF, 01h=ON"
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Profile 1, 01h=Profile 2"
      - name: cks
        type: string
        description: Checksum byte

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
      - name: cks
        type: string
        description: Checksum byte

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
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"
      - name: cks
        type: string
        description: Checksum byte

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
      - name: cks
        type: string
        description: Checksum byte

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
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: cks
        type: string
        description: Checksum byte

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Eco mode value. See "Supplementary Information by Command" appendix.
      - name: cks
        type: string
        description: Checksum byte

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
    params:
      - name: data01-data16
        type: string
        description: Projector name (up to 16 bytes)
      - name: cks
        type: string
        description: Checksum byte

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: Setting value (mode/position/sub-input). See appendix for sub-input values.
      - name: cks
        type: string
        description: Checksum byte

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=OFF, 01h=ON"
      - name: cks
        type: string
        description: Checksum byte

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
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Input terminal value. See "Supplementary Information by Command" appendix.
      - name: data02
        type: string
        description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
      - name: cks
        type: string
        description: Checksum byte
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    source: running_status_request DATA03 / basic_information_request DATA01

  - id: error_status
    type: bitmask
    description: 12-byte error information (DATA01-DATA12) from error_status_request. Bits encode cover, fan, temperature, power, lamp, formatter, FPGA, mirror-cover, ballast, iris, interlock, and system errors.

  - id: mute_state
    type: object
    description: Picture/sound/onscreen/forced-onscreen mute booleans + OSD display flag (mute_status_request DATA01-DATA05)

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]

  - id: lens_status
    type: bitmask
    description: Lens operation bits (lens memory, zoom, focus, lens shift H/V) from lens_information_request
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    access: read_write
    description: Picture brightness; adjustable via picture_adjust (target 00h), readable via gain_parameter_request_3
  - id: contrast
    type: integer
    access: read_write
  - id: color
    type: integer
    access: read_write
  - id: hue
    type: integer
    access: read_write
  - id: sharpness
    type: integer
    access: read_write
  - id: volume
    type: integer
    access: read_write
  - id: lamp_light_adjust
    type: integer
    access: read_write
  - id: lamp_usage_time
    type: integer
    unit: seconds
    access: read_only
  - id: lamp_remaining_life
    type: integer
    unit: percent
    access: read_only
  - id: filter_usage_time
    type: integer
    unit: seconds
    access: read_only
  - id: eco_mode
    type: string
    access: read_write
  - id: lan_projector_name
    type: string
    access: read_write
    max_length: 16
  - id: edge_blending_mode
    type: enum
    values: ["off", "on"]
    access: read_write
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source.
# All status data is obtained via explicit request commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While powering on, no other command is accepted."
  - command: power_off
    note: "During power-off (including cooling time), no other command is accepted."
  - command: lens_control
    note: "Error code 02h 0Fh = no authority; 02h 0Dh = power off rejects command. Shutter/lens require powered-on state."
# UNRESOLVED: source does not specify voltage/current/power specs, fault recovery sequences, or full power-on sequencing requirements. Error bitmasks indicate fault detection (cover, fan, temperature, interlock switch open) but explicit safety interlock procedures are not documented.
```

## Notes
- **Command frame format:** commands are binary hex sequences. Request frames omit `<ID1> <ID2>` in this manual's compact notation, but responses include ID1 (control ID), ID2 (model code), and CKS (checksum). Checksum = low-order 8 bits of the sum of all preceding bytes (including any ID bytes present in the transmitted frame). See worked example in source §2.2.
- **Cooling lockout:** after POWER OFF the projector cannot accept commands until the cooling interval completes; callers must retry.
- **Mute auto-release:** PICTURE/SOUND/ONSCREEN mute is automatically cleared on input-terminal switch, video-signal switch (and volume adjust for sound mute).
- **Lamp query scope:** LAMP INFORMATION REQUEST 3 returns eco-mode-adjusted values; remaining life is negative if the replacement deadline is exceeded.
- **Update granularity:** usage counters (lamp/filter) return one-second units but are internally updated at one-minute intervals.
- <!-- UNRESOLVED: "Supplementary Information by Command" appendix (input-terminal value map, base-model-type values, eco-mode values, sub-input values) referenced repeatedly but not present in the refined excerpt. -->
- <!-- UNRESOLVED: model code (ID2) value for P243W Bk not stated in source. -->
- <!-- UNRESOLVED: which 030-1 picture-adjust targets / 053 lens-control targets / 097-198 sub-inputs are actually supported on this model not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:53:38.290Z
last_checked_at: 2026-06-18T08:58:03.198Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:58:03.198Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is a generic Sharp/NEC projector command reference; model-specific support flags and \"Supplementary Information by Command\" appendix (input-terminal value tables, base-model-type values, eco-mode values, sub-input values) are referenced but not included in the refined excerpt. Firmware compatibility not stated."
- "no unsolicited notification events documented in source."
- "no multi-step sequences described explicitly in source."
- "source does not specify voltage/current/power specs, fault recovery sequences, or full power-on sequencing requirements. Error bitmasks indicate fault detection (cover, fan, temperature, interlock switch open) but explicit safety interlock procedures are not documented."
- "\"Supplementary Information by Command\" appendix (input-terminal value map, base-model-type values, eco-mode values, sub-input values) referenced repeatedly but not present in the refined excerpt."
- "model code (ID2) value for P243W Bk not stated in source."
- "which 030-1 picture-adjust targets / 053 lens-control targets / 097-198 sub-inputs are actually supported on this model not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
