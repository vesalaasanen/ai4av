---
spec_id: admin/roland-vr-400uhd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland VR-400UHD Control Spec"
manufacturer: Roland
model_family: VR-400UHD
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - VR-400UHD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/VR-400UHD_Control_eng01_W.pdf
retrieved_at: 2026-07-13T20:40:06.148Z
last_checked_at: 2026-07-22T00:42:08.726Z
generated_at: 2026-07-22T00:42:08.726Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source text/file metadata describes the V-4EX; the actual document body is the VR-400UHD Remote Control Guide. The entity_id in front matter reflects the user-supplied V-4EX identifier; the model field reflects the source-stated VR-400UHD. Operator must reconcile which device this entity actually represents before publishing."
  - "flow control not stated; pinout shows DTR/DSR/RTS/CTS wired internally on the unit side"
  - "source states \"password settings must be configured beforehand; enter the password you already set\" but does not document the password format, challenge, or login sequence"
  - "source lists range \"0-4\" but enumerates 9 named formats. Mapping ambiguous; verify against device."
  - "source documents no unsolicited/notification events. All responses are solicited (ack/err/get-response/ver-response)."
  - "source does not describe power-on sequencing, thermal interlocks, or explicit safety warnings."
  - "device identity mismatch (V-4EX vs VR-400UHD) — operator reconciliation required."
  - "auth login sequence / password format not documented."
  - "RS-232 flow control not documented."
  - "video input format (set,97,3,0) range/format mapping ambiguous."
  - "firmware/software version not stated (returned dynamically via `ver`)."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:42:08.726Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions verified in source command table; explicit commands plus the generic set/get forms fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Roland VR-400UHD Control Spec

## Summary
The Roland VR-400UHD is a 4-channel digital video mixer with built-in audio mixer, multiviewer, DSK, PinP, still store, logo, and scaling. This spec covers remote control over LAN (TCP/IP via Telnet) and RS-232, using shared ASCII commands of the form `set`/`get`/`ver` with `[lf]` (0x0A) terminators.

<!-- UNRESOLVED: source text/file metadata describes the V-4EX; the actual document body is the VR-400UHD Remote Control Guide. The entity_id in front matter reflects the user-supplied V-4EX identifier; the model field reflects the source-stated VR-400UHD. Operator must reconcile which device this entity actually represents before publishing. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023
serial:
  baud_rate: 9600  # source lists 9,600 and 38,400 bps; default not stated
  alt_baud_rates: [38400]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; pinout shows DTR/DSR/RTS/CTS wired internally on the unit side
  code_set: ASCII
auth:
  type: password  # UNRESOLVED: source states "password settings must be configured beforehand; enter the password you already set" but does not document the password format, challenge, or login sequence
```

**Notes on transport:**
- LAN uses Telnet over TCP/IP on port 8023.
- RS-232 uses a DB-9 male connector, synchronous/asynchronous full-duplex, ASCII code set.
- RS-232 cable must be crossover (null-modem): unit RXD↔controller RXD, unit TXD↔controller TXD, GND↔GND. Pins 4-6 and 7-8 are linked internally inside the VR-400UHD.
- Baud rate selectable between 9600 and 38400 bps; source does not state the factory default.

## Traits
```yaml
traits:
  - routable  # inferred: program/preset scene select, DSK source, PinP source, still source, scaler input/output
  - queryable  # inferred: `get` and `ver` commands return current values
  - levelable  # inferred: volume, AUX send, reverb send, pan, DSK/PinP blend, output fade
```

## Actions
```yaml
# All command strings are verbatim from the source command table. `[lf]` = ASCII 0x0A terminator.
# Numeric operands use decimal values per source parameter columns.
# Response column omitted from this spec; see Feedbacks section for ack/error/ver responses.

- id: select_program_scene
  label: Select the program scene (PGM1 in DUAL mode)
  kind: action
  command: "set,97,46,0,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 63]
      description: "Scene index 0-63 (maps to 1-1 - 8-8)"

- id: select_preset_scene
  label: Select the preset scene (PGM2 in DUAL mode)
  kind: action
  command: "set,97,46,1,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 63]
      description: "Scene index 0-63 (maps to 1-1 - 8-8)"

- id: press_cut
  label: Press the [CUT] button
  kind: action
  command: "set,98,43,0,1[lf]"
  params: []

- id: press_auto
  label: Press the [AUTO] button
  kind: action
  command: "set,98,42,0,1[lf]"
  params: []

- id: press_output_fade
  label: Press the [OUTPUT FADE] button
  kind: action
  command: "set,97,25,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PGM (DUAL Mode: PGM1)", 1: "DUAL Mode: PGM2" }
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: set_dsk_onoff
  label: Set the [DSK] button on/off
  kind: action
  command: "set,97,79,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: set_logo_onoff
  label: Set the [LOGO] button on/off
  kind: action
  command: "set,97,63,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: switch_mix_wipe
  label: Switch between MIX/WIPE
  kind: action
  command: "set,97,48,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "MIX", 1: "WIPE" }

- id: change_wipe_pattern
  label: Change the WIPE pattern
  kind: action
  command: "set,97,49,0,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 3]
      description: "0-3 (patterns 1-4)"

- id: set_transition_time
  label: Set transition time
  kind: action
  command: "set,97,18,0,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 20]
      description: "0.0-2.0 sec (units of 0.1 sec)"

- id: set_auto_transition_onoff
  label: Set the [AUTO TRANSITION] button on/off
  kind: action
  command: "set,97,19,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: adjust_volume
  label: Adjust the volume
  kind: action
  command: "set,97,139,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      range: [0, 127]
      description: "Level"

- id: set_solo_onoff
  label: Turn the solo function on/off
  kind: action
  command: "set,97,138,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: set_mute_onoff
  label: Turn the mute function on/off
  kind: action
  command: "set,97,137,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: adjust_aux_send_level
  label: Adjust the AUX send level
  kind: action
  command: "set,97,144,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      range: [0, 127]
      description: "Level"

- id: adjust_pan
  label: MIC1-MIC6 channel Adjust the pan
  kind: action
  command: "set,97,140,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      range: [-50, 50]
      description: "L-C-R (-50 = full L, 0 = center, 50 = full R)"

- id: adjust_reverb_send_level
  label: Adjust the reverb send level
  kind: action
  command: "set,97,141,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      range: [0, 127]
      description: "Level"

- id: set_usb_send_onoff
  label: Turn USB send on/off
  kind: action
  command: "set,97,143,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: set_aux_pre_post
  label: Set AUX PRE/POST
  kind: action
  command: "set,97,145,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "MIC1-MIC6 Channel"
    - name: b
      type: integer
      enum: { 0: "PRE", 1: "POST" }

- id: set_dsk_source
  label: Set DSK source
  kind: action
  command: "set,97,77,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "DSK1", 1: "DSK2" }
    - name: b
      type: integer
      range: [0, 5]
      description: "Video input 1-6"

- id: set_dsk_key_source
  label: Set DSK key source
  kind: action
  command: "set,97,78,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "DSK1", 1: "DSK2" }
    - name: b
      type: integer
      range: [0, 5]
      description: "Audio input 1-6"

- id: set_dsk_blend
  label: Set DSK blend
  kind: action
  command: "set,97,80,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "DSK1", 1: "DSK2" }
    - name: b
      type: integer
      range: [0, 127]
      description: "Level"

- id: set_dsk_auto_fade
  label: Set DSK auto fade
  kind: action
  command: "set,97,81,{a},{b},{c}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "DSK1", 1: "DSK2" }
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }
    - name: c
      type: integer
      range: [0, 20]
      description: "Time"

- id: set_logo_position
  label: Set LOGO position
  kind: action
  command: "set,97,64,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 8]
      description: "H position"
    - name: b
      type: integer
      range: [0, 15]
      description: "V position"

- id: set_logo_scale
  label: Set LOGO scale
  kind: action
  command: "set,97,65,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "Scales 1-4"

- id: set_logo_fade
  label: Set LOGO fade
  kind: action
  command: "set,97,66,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "OFF", 1: "ON" }
    - name: b
      type: integer
      range: [0, 20]
      description: "Time"

- id: set_freeze
  label: Set freeze
  kind: action
  command: "set,97,67,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "OFF", 1: "ON" }

- id: set_still_format
  label: Set still format
  kind: action
  command: "set,97,68,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "FULL", 1: "LG", 2: "RG", 3: "CG" }

- id: set_still_source
  label: Set still source
  kind: action
  command: "set,97,69,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "STILL1", 1: "STILL2" }
    - name: b
      type: integer
      range: [0, 5]
      description: "Video input 1-6"

- id: set_pinp_source
  label: Set PinP source
  kind: action
  command: "set,97,70,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      range: [0, 5]
      description: "Video input 1-6"

- id: set_pinp_position
  label: Set PinP position
  kind: action
  command: "set,97,71,{a},{b},{c}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      range: [-50, 50]
      description: "H position"
    - name: c
      type: integer
      range: [-50, 50]
      description: "V position"

- id: set_pinp_size
  label: Set PinP size
  kind: action
  command: "set,97,72,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      range: [0, 100]
      description: "Size"

- id: set_pinp_aspect
  label: Set PinP aspect
  kind: action
  command: "set,97,73,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      enum: { 0: "16:9", 1: "4:3" }

- id: set_pinp_border
  label: Set PinP border
  kind: action
  command: "set,97,74,{a},{b},{c}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      range: [0, 50]
      description: "H position"
    - name: c
      type: integer
      range: [0, 50]
      description: "V position"

- id: set_pinp_auto_fade
  label: Set PinP auto fade
  kind: action
  command: "set,97,75,{a},{b},{c}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      enum: { 0: "OFF", 1: "ON" }
    - name: c
      type: integer
      range: [0, 20]
      description: "Time"

- id: set_pinp_blend
  label: Set PinP blend
  kind: action
  command: "set,97,76,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "PinP1", 1: "PinP2" }
    - name: b
      type: integer
      range: [0, 127]
      description: "Level"

- id: set_input_hd_sd
  label: Input HD/SD
  kind: action
  command: "set,97,47,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "AUTO", 1: "HD", 2: "SD" }

- id: switch_video_input_format_output
  label: Switch video input format (output)
  kind: action
  command: "set,97,3,0,{a}[lf]"
  params:
    - name: a
      type: integer
      description: "0-4 (Auto, 1080/59.94p, 1080/50p, 1080/29.97Hz, 1080/25Hz, 1080/24Hz, 1080/23.98Hz, 720/59.94p, 720/50p)"
      # UNRESOLVED: source lists range "0-4" but enumerates 9 named formats. Mapping ambiguous; verify against device.

- id: set_scaler_input
  label: Set scaler input
  kind: action
  command: "set,97,4,{a},{b}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 5]
      description: "Video input 1-6"
    - name: b
      type: integer
      enum: { 0: "AUTO", 1: "480p/59.94", 2: "576p/50", 3: "1080p/59.94", 4: "1080p/50", 5: "1080p/29.97", 6: "1080p/25", 7: "1080p/24", 8: "1080p/23.98" }

- id: set_scaler_output
  label: Set scaler output
  kind: action
  command: "set,97,5,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "Auto", 1: "480p/59.94", 2: "576p/50", 3: "720/59.94p", 4: "720/50p", 5: "1080/59.94p", 6: "1080/50p", 7: "1080/29.97p", 8: "1080/25p", 9: "1080/24p", 10: "1080/23.98p", 11: "2160/59.94p", 12: "2160/50p" }

- id: set_output_fade
  label: Set output fade
  kind: action
  command: "set,97,6,0,{a}[lf]"
  params:
    - name: a
      type: integer
      range: [0, 100]
      description: "0-100%"
  notes: "Source response column shows ack as `ack,97,5,0,[a][lf]` (likely typo for 97,6)."

- id: set_pgm_output
  label: Set PGM output
  kind: action
  command: "set,97,0,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "Program out", 1: "Multi view out" }

- id: set_pvw_output
  label: Set PVW output
  kind: action
  command: "set,97,1,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "Program out", 1: "Multi view out" }

- id: set_multiview_layout
  label: Set multi-view layout
  kind: action
  command: "set,97,2,0,{a}[lf]"
  params:
    - name: a
      type: integer
      enum: { 0: "2 divisions", 1: "3 divisions", 2: "4 divisions", 3: "5 divisions", 4: "6 divisions" }

- id: switcher_initialize
  label: Switcher initialize
  kind: action
  command: "set,98,0,0,1[lf]"
  params: []

- id: switcher_reset
  label: Switcher reset
  kind: action
  command: "set,98,1,0,1[lf]"
  params: []

- id: set_generic
  label: Generic parameter set
  kind: action
  command: "set,{category},{id},{sub_id},{value}[lf]"
  params:
    - name: category
      type: integer
      description: "Category ID"
    - name: id
      type: integer
      description: "Parameter ID"
    - name: sub_id
      type: integer
      description: "Sub-ID"
    - name: value
      type: integer
      description: "Value"
  notes: "Generic form documented in source Command Format section; specific set commands enumerated above are preferred."

- id: get_model_name
  label: Get model name
  kind: query
  command: "ver[lf]"
  params: []
  response: "ver,{model name},{software version}[lf]"

- id: get_generic
  label: Generic parameter get
  kind: query
  command: "get,{category},{id},{sub_id}[lf]"
  params:
    - name: category
      type: integer
    - name: id
      type: integer
    - name: sub_id
      type: integer
  response: "set,{category},{id},{sub_id},{value}[lf]"
  notes: "Generic form documented in source Command Format section."
```

## Feedbacks
```yaml
- id: ack_response
  label: Acknowledgement
  type: string
  description: "Returned when a set command is correctly received. Form: `ack,{category},{id},{sub_id},{value}[lf]` mirroring the sent command."
  values: ["ack,<echo of sent set command>"]

- id: err_response
  label: Error response
  type: string
  description: "Returned when a command could not be correctly received."
  values: ["err,{transmitted command}[lf]"]

- id: get_value_response
  label: Get value response
  type: string
  description: "Returned in response to a `get` command, returning the current value."
  values: ["set,{category},{id},{sub_id},{value}[lf]"]

- id: ver_response
  label: Version response
  type: string
  description: "Returned in response to `ver`."
  values: ["ver,{model name},{software version}[lf]"]
```

## Variables
```yaml
# All settable parameters are enumerated as Actions above (each maps to a single category/id/sub-id).
# Generic variable structure: { category, id, sub_id } -> integer value, read via `get` and written via `set`.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited/notification events. All responses are solicited (ack/err/get-response/ver-response).
```

## Macros
```yaml
# Source documents one explicit operational sequence rule: "When sending a sequence of commands to the unit from a controller, after each one, be sure to verify that an 'ack' response is returned before sending the next command."
# No named multi-step macros are enumerated.
```

## Safety
```yaml
confirmation_required_for:
  - switcher_initialize  # source: "Switcher initialize" - initialize/reset; semantics not detailed
  - switcher_reset       # source: "Switcher reset" - destructive; semantics not detailed
interlocks: []
notes: |
  Source states: "When sending a sequence of commands to the unit from a controller, after each one,
  be sure to verify that an 'ack' response is returned before sending the next command." Treat as a
  mandatory sequencing interlock for command chains.
# UNRESOLVED: source does not describe power-on sequencing, thermal interlocks, or explicit safety warnings.
```

## Notes
- **Device identity discrepancy:** The user-supplied device name and source artifact filename identify this as a Roland **V-4EX** 4-Channel Digital Video Mixer, but the actual refined source text is the **VR-400UHD Remote Control Guide**. The front-matter `entity_id` reflects the supplied V-4EX identifier; `compatible_with.models` reflects the source-stated VR-400UHD. The operator must reconcile this mismatch before publishing — either by sourcing the correct V-4EX manual or re-pointing the entity.
- **Command terminator:** `[lf]` is ASCII `0x0A` (LF). Source notes "H indicates a hexadecimal value."
- **Shared command set:** Commands are common to LAN and RS-232 interfaces.
- **Password auth:** Source states password is required for LAN ("network and password settings must be configured beforehand; when connecting, enter the password you already set") but does not document the login sequence, password format, or challenge — `auth.type: password` set but the protocol is UNRESOLVED.
- **Output fade typo:** Source response column for `set,97,6,0,[a]` (output fade) reads `ack,97,5,0,...` (likely a documentation typo for 97,6). Flagged on the action.
- **Video input format ambiguity:** Source lists range "0–4" but enumerates 9 named formats — mapping is ambiguous and needs device verification.
- **Baud rate:** Source states both 9600 and 38400 bps are supported; factory default is not stated. Both are emitted.

<!-- UNRESOLVED: device identity mismatch (V-4EX vs VR-400UHD) — operator reconciliation required. -->
<!-- UNRESOLVED: auth login sequence / password format not documented. -->
<!-- UNRESOLVED: RS-232 flow control not documented. -->
<!-- UNRESOLVED: video input format (set,97,3,0) range/format mapping ambiguous. -->
<!-- UNRESOLVED: firmware/software version not stated (returned dynamically via `ver`). -->
````

Spec above. 49 actions enumerated (47 source-table rows + 2 generic `set`/`get` forms). Big flag: source identity mismatch V-4EX vs VR-400UHD — operator reconcile before publish.

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/VR-400UHD_Control_eng01_W.pdf
retrieved_at: 2026-07-13T20:40:06.148Z
last_checked_at: 2026-07-22T00:42:08.726Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:42:08.726Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions verified in source command table; explicit commands plus the generic set/get forms fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source text/file metadata describes the V-4EX; the actual document body is the VR-400UHD Remote Control Guide. The entity_id in front matter reflects the user-supplied V-4EX identifier; the model field reflects the source-stated VR-400UHD. Operator must reconcile which device this entity actually represents before publishing."
- "flow control not stated; pinout shows DTR/DSR/RTS/CTS wired internally on the unit side"
- "source states \"password settings must be configured beforehand; enter the password you already set\" but does not document the password format, challenge, or login sequence"
- "source lists range \"0-4\" but enumerates 9 named formats. Mapping ambiguous; verify against device."
- "source documents no unsolicited/notification events. All responses are solicited (ack/err/get-response/ver-response)."
- "source does not describe power-on sequencing, thermal interlocks, or explicit safety warnings."
- "device identity mismatch (V-4EX vs VR-400UHD) — operator reconciliation required."
- "auth login sequence / password format not documented."
- "RS-232 flow control not documented."
- "video input format (set,97,3,0) range/format mapping ambiguous."
- "firmware/software version not stated (returned dynamically via `ver`)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
