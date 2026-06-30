---
spec_id: admin/sharp-nec-led-e025i-217
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Led E025I 217 Control Spec"
manufacturer: Sharp/NEC
model_family: "Led E025I 217"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Led E025I 217"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:43:36.798Z
last_checked_at: 2026-06-17T20:11:43.448Z
generated_at: 2026-06-17T20:11:43.448Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model string not printed verbatim in refined source (source is generic projector command manual; \"Led E025I 217\" taken from task input)."
  - "default baud rate not stated (5 rates supported)."
  - "wireless LAN unit specs / port details not in source."
  - "flow_control not stated; RTS/CTS pins wired per pinout table"
  - "source documents no unsolicited notifications. Device is poll-only."
  - "source documents no multi-step command sequences."
  - "full power-on sequencing / warmup timing not specified in source."
  - "appendix \"Supplementary Information by Command\" not included in refined source — input-terminal/aspect/eco-mode/sub-input/base-model-type enum tables missing."
  - "flow_control not stated."
  - "firmware version compatibility not stated in source."
  - "wireless LAN port/specs external to source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:11:43.448Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched verbatim against BDT140013 Rev 7.1 source; transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Led E025I 217 Control Spec

## Summary
Sharp/NEC LED projector. Control via RS-232C (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP port 7142). Spec covers full binary command catalogue from BDT140013 Rev 7.1 — power, mute, input switch, picture/volume/aspect adjust, lens control + memory, information/status queries, eco/PIP/edge-blend set, audio select.

<!-- UNRESOLVED: exact model string not printed verbatim in refined source (source is generic projector command manual; "Led E025I 217" taken from task input). -->
<!-- UNRESOLVED: default baud rate not stated (5 rates supported). -->
<!-- UNRESOLVED: wireless LAN unit specs / port details not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # supported: 115200/38400/19200/9600/4800; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated; RTS/CTS pins wired per pinout table
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred: many status/information request commands
  - levelable    # inferred: volume/brightness/contrast/lamp-adjust set commands
  - routable     # inferred: 018 INPUT SW CHANGE command
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: Response DATA01-DATA12 carry bitfield error info. No CKS appended (command is self-contained 6 bytes; CKS rule applies to framed commands with ID).

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: No other command accepted while power turning on.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: No other command accepted during power-off incl. cooling time.

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte (DATA01). e.g. 06h=video port. See appendix 'Supplementary Information by Command' for full list."

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
    command: "03h 10h 00h 00h 05h {target} FFh {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value (high-order 8 bits)"
    notes: DATA02 adjustment mode byte fixed FFh in source template (00h=absolute, 01h=relative documented but template uses FFh).

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {value_lo} {value_hi} {checksum}"
    params:
      - name: value_lo
        type: integer
        description: "DATA02 adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "DATA03 adjustment value (high-order 8 bits)"
    notes: DATA01 mode byte fixed 00h (absolute) per source template.

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
    params:
      - name: aspect
        type: integer
        description: "DATA01 aspect value. See appendix 'Supplementary Information by Command'."

  - id: other_adjust_lamp_light
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {value_lo} {value_hi} {checksum}"
    params:
      - name: value_lo
        type: integer
        description: "DATA04 adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "DATA05 adjustment value (high-order 8 bits)"
    notes: DATA01/DATA02 fixed 96h/FFh (LAMP ADJUST / LIGHT ADJUST). DATA03 mode fixed by context.

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90).

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time + filter alarm start time (sec). -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: content
        type: integer
        description: "DATA02: 01h=usage time (sec), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "DATA01: 00h=Total, 01h=during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {code_lo} {code_hi} {checksum}"
    params:
      - name: code_lo
        type: integer
        description: "DATA01 key code low byte (WORD). e.g. 05h=AUTO, 02h=POWER ON, 0Dh=FREEZE."
      - name: code_hi
        type: integer
        description: "DATA02 key code high byte (00h for all listed codes)."

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
    command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target. 06h=Periphery Focus documented."
      - name: action
        type: integer
        description: "DATA02: 00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh=plus, 81h=minus, FDh/-0.25s, FEh/-0.5s, FFh/-1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target"
    notes: Returns upper/lower limit + current value (16-bit each).

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01: FFh=Stop (mode/value ignored)"
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute, 02h=relative"
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value low byte"
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value high byte"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile selected by 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitfield (lens memory/zoom/focus/shift-h/shift-v operation status).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00h=Profile1, 01h=Profile2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: integer
        description: "DATA01: 00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function, profile/clock/sleep-timer function.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status, cooling/power process, operation status.

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
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: integer
        description: "DATA01: 01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
    params:
      - name: type
        type: integer
        description: "DATA01: 03h=horizontal sync freq, 04h=vertical sync freq"

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

  - id: lan_mac_address_request_2
    label: LAN MAC Address Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: integer
        description: "DATA01: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value. See appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h {checksum}"
    params:
      - name: name_bytes
        type: string
        description: "DATA01-16 projector name (up to 16 bytes, NUL-terminated)"

  - id: pip_pbp_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: integer
        description: "DATA01: 00h=MODE,01h=START POSITION,02h=SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting (MODE: 00h=PIP/01h=PbP; START POSITION: 00-03h corners)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF, 01h=ON"

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
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "DATA01 input terminal. See appendix 'Supplementary Information by Command'."
      - name: value
        type: integer
        description: "DATA02: 00h=terminal-specified, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: raw
    description: "Success ACK: 2Xh/AXh prefix + ID1 ID2 + LEN + data + CKS. e.g. POWER ON ack = 22h 00 <ID1> <ID2> 00h <CKS>"

  - id: command_error
    type: enum
    description: "Error response: AXh prefix + ID1 ID2 + 02h + ERR1 ERR2 + CKS"
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern/filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command not accepted (power off)"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"

  - id: error_status_bitfield
    type: raw
    description: "009 response DATA01-DATA12 error bitfield (bit=1 => error). Covers cover/fan/temp/power/lamp/formatter/FPGA/iris/ballast/lens errors."

  - id: power_state
    type: enum
    description: "From 078-2 DATA03 / 305-3 DATA01"
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: mute_state
    type: object
    description: "From 078-4: picture/sound/onscreen/forced-onscreen/OSD each on/off"

  - id: input_signal_state
    type: object
    description: "From 078-3 / 305-3: signal type, list number, displayed content"
```

## Variables
```yaml
# Settable parameters handled via Actions (picture/volume/aspect/lamp/eco/PIP/edge-blend/lens-memory-option).
# No additional standalone variables documented beyond those actions.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Device is poll-only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # documented: no command accepted during cool-down
  - shutter_close  # lens shutter mechanical action
interlocks:
  - "Power ON/OFF blocks all other commands during transition (incl. cooling time)."
  - "Picture/Sound/Onscreen mute auto-clear on input/video-signal switch."
  - "DATA09 bit1 of 009 error response: interlock switch open flag."
# UNRESOLVED: full power-on sequencing / warmup timing not specified in source.
```

## Notes
- Binary protocol. Framed commands carry `<ID1>` (control ID) + `<ID2>` (model code) after the command byte; CKS = low byte of sum of all preceding bytes. Checksum must be computed by implementer — not pre-baked except where source prints full example.
- Baud options: 115200 / 38400 / 19200 / 9600 / 4800. Default UNRESOLVED — picked 9600 placeholder; verify on device.
- TCP port 7142 (stated). Wireless LAN unit specs external to this manual.
- Several DATA values reference appendix "Supplementary Information by Command" not present in refined source — input terminal list, aspect values, eco-mode values, sub-input values, base-model-type values all UNRESOLVED for their full enum.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Usage times update at 1-minute intervals though stored in 1-second units.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not included in refined source — input-terminal/aspect/eco-mode/sub-input/base-model-type enum tables missing. -->
<!-- UNRESOLVED: flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: wireless LAN port/specs external to source. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:43:36.798Z
last_checked_at: 2026-06-17T20:11:43.448Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:11:43.448Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched verbatim against BDT140013 Rev 7.1 source; transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model string not printed verbatim in refined source (source is generic projector command manual; \"Led E025I 217\" taken from task input)."
- "default baud rate not stated (5 rates supported)."
- "wireless LAN unit specs / port details not in source."
- "flow_control not stated; RTS/CTS pins wired per pinout table"
- "source documents no unsolicited notifications. Device is poll-only."
- "source documents no multi-step command sequences."
- "full power-on sequencing / warmup timing not specified in source."
- "appendix \"Supplementary Information by Command\" not included in refined source — input-terminal/aspect/eco-mode/sub-input/base-model-type enum tables missing."
- "flow_control not stated."
- "firmware version compatibility not stated in source."
- "wireless LAN port/specs external to source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
