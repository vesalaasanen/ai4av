---
spec_id: admin/sharpnec-c981q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C981Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "C981Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C981Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:32:57.325Z
last_checked_at: 2026-06-17T19:38:59.438Z
generated_at: 2026-06-17T19:38:59.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control ID (ID1) and model code (ID2) not given fixed values in source — set per device. Input terminal value table referenced in \"Appendix\" not present in this excerpt. Aspect/eco-mode value tables not present in this excerpt. Firmware version not stated."
  - "source states \"Full duplex\" communication mode only; no flow-control field stated"
  - "source does not define a separate variable list outside of action DATA params."
  - "source describes responses to commands only; no unsolicited event/notification protocol documented."
  - "source documents no multi-step macro sequences."
  - "source contains no explicit safety interlock procedures or power-sequencing warnings beyond command lockout notes."
  - "Appendix tables referenced (input terminal values, aspect values, eco-mode values, sub-input values, base model type values) are not present in this source excerpt."
  - "firmware version compatibility not stated."
  - "control ID (ID1) and model code (ID2) default values not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:38:59.438Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action units matched verbatim against source command details; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C981Q Avt3 Control Spec

## Summary
Sharp/NEC C981Q Avt3 projector. Supports RS-232C serial and TCP/IP LAN control (TCP port 7142). Binary command protocol: 6-byte header `20h 88h <ID1> <ID2> <LEN> <DATA...> <CKS>` style with checksum (low byte of sum of all preceding bytes). Covers power, input switching, mutes, lens control, lamp info, status queries, and LAN settings.

<!-- UNRESOLVED: control ID (ID1) and model code (ID2) not given fixed values in source — set per device. Input terminal value table referenced in "Appendix" not present in this excerpt. Aspect/eco-mode value tables not present in this excerpt. Firmware version not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode only; no flow-control field stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable       # inferred: many status REQUEST commands present
  - routable        # inferred: INPUT SW CHANGE (018) and PIP SUB INPUT commands present
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response returns 12 DATA bytes of error bitmasks; ERR1/ERR2 on failure."

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = Video). Full table in source Appendix."
  notes: "Response DATA01 = FFh indicates ended with error / no signal switch."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness / 01h Contrast / 02h Color / 03h Hue / 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute / 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute / 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - full table in source Appendix"

- id: other_adjust
  label: Other Adjust / Lamp-Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target - source documents 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Documented value 96h (paired with DATA01)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute / 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns 98 DATA bytes incl. projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."

- id: filter_usage_info_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds; -1 if undefined."

- id: lamp_info_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h Lamp 1 / 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time (sec) / 04h remaining life (%)"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings / 01h Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD key code) - see source key code list"
    - name: DATA02
      type: integer
      description: "Key code high byte (documented 00h for all listed keys)"

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target - source documents 06h = Periphery Focus"
    - name: DATA02
      type: integer
      description: "00h Stop / 01h +1s / 02h +0.5s / 03h +0.25s / 7Fh +continuous / 81h -continuous / FDh -0.25s / FEh -0.5s / FFh -1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (mirrors LENS CONTROL DATA01)"

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target - FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute / 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE / 01h STORE / 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE / 01h STORE / 02h RESET"
  notes: "Operates on profile number selected by LENS PROFILE SET (053-10)."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL / 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL / 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF / 01h ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bitmask: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=Stop,1=operation)."

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1 / 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h Brightness / 01h Contrast / 02h Color / 03h Hue / 04h Sharpness / 05h Volume / 96h Lamp-Light Adjust"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep function."

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power status, DATA04 cooling process, DATA05 power on/off process, DATA06 operation status."

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern, content displayed."

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h Normal (cover opened) / 01h Cover closed."

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h Freeze ON / 02h Freeze OFF"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h Horizontal sync frequency / 04h Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: PIP / Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value - full table in source Appendix"

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name_bytes
      type: string
      description: "Projector name bytes DATA01-16 (up to 16 bytes, NUL-terminated)"

- id: pip_pbp_set
  label: PIP / Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode/position/sub-input per source table)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF / 01h ON"

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, mute/freeze states."

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - full table in source Appendix"
    - name: DATA02
      type: integer
      description: "Setting value: 00h = terminal specified in DATA01 / 01h BNC / 02h COMPUTER"
```

## Feedbacks
```yaml
- id: command_response_ack
  type: object
  description: "Success response format: <A0/A1/A2/A3h> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>"

- id: command_error_response
  type: object
  description: "Failure response: <AXh> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  values:
    - "ERR1/ERR2 combinations documented in source error code list (e.g. 00h 00h = unrecognized command, 02h 0Dh = power off, 02h 0Eh = execution failed)"
```

## Variables
```yaml
# No standalone settable parameter registry beyond Actions enumerated above.
# UNRESOLVED: source does not define a separate variable list outside of action DATA params.
```

## Events
```yaml
# UNRESOLVED: source describes responses to commands only; no unsolicited event/notification protocol documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on in progress"
  - "POWER OFF (016): no other command accepted during power-off including cooling time"
# UNRESOLVED: source contains no explicit safety interlock procedures or power-sequencing warnings beyond command lockout notes.
```

## Notes
- **Checksum (CKS):** low-order one byte of sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Frame format:** commands/responses in hex. Header bytes encode command class; `<ID1>` is control ID (per-device setting), `<ID2>` is model code (model-specific), `<LEN>` is data-length of following DATA bytes.
- **Response prefix codes:** `2Xh` = success response, `AXh` = error response (X mirrors command class).
- **Lamp/filter usage:** returned in seconds, updated at 1-minute intervals.
- **ID1/ID2 are per-device/per-model parameters** — source does not give fixed values.
<!-- UNRESOLVED: Appendix tables referenced (input terminal values, aspect values, eco-mode values, sub-input values, base model type values) are not present in this source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) default values not stated. -->
````

Spec covers 55 distinct commands (one per source row), verbatim payloads, serial+TCP transport, draft/low. Gaps marked UNRESOLVED per policy — Appendix tables not in this excerpt.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:32:57.325Z
last_checked_at: 2026-06-17T19:38:59.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:38:59.438Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action units matched verbatim against source command details; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control ID (ID1) and model code (ID2) not given fixed values in source — set per device. Input terminal value table referenced in \"Appendix\" not present in this excerpt. Aspect/eco-mode value tables not present in this excerpt. Firmware version not stated."
- "source states \"Full duplex\" communication mode only; no flow-control field stated"
- "source does not define a separate variable list outside of action DATA params."
- "source describes responses to commands only; no unsolicited event/notification protocol documented."
- "source documents no multi-step macro sequences."
- "source contains no explicit safety interlock procedures or power-sequencing warnings beyond command lockout notes."
- "Appendix tables referenced (input terminal values, aspect values, eco-mode values, sub-input values, base model type values) are not present in this source excerpt."
- "firmware version compatibility not stated."
- "control ID (ID1) and model code (ID2) default values not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
