---
spec_id: admin/sharp-nec-ld-fe153
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe153 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe153"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe153"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:00:11.727Z
last_checked_at: 2026-06-17T20:07:11.405Z
generated_at: 2026-06-17T20:07:11.405Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Ld Fe153\" supplied by operator; source doc is a generic projector command reference (BDT140013 Rev 7.1) and does not itself name the Ld Fe153 model. Firmware version compatibility not stated."
  - "flow_control not stated; RTS/CTS pins wired (full-duplex comm mode)"
  - "eco mode enum values not listed in source body (refers to Appendix)"
  - "model \"Ld Fe153\" not named inside source doc (generic projector command ref BDT140013 Rev 7.1)."
  - "firmware version compatibility not stated."
  - "eco mode enum values (097-8/098-8) reference an Appendix not included in the refined source."
  - "input terminal byte table for 018/319-10 references an Appendix not included in the refined source."
  - "sub-input setting value table for 097-198/098-198 references an Appendix not included in the refined source."
  - "serial flow_control mode not explicitly stated (hardware RTS/CTS present, comm mode full-duplex)."
  - "base model type code table (305-1, 078-1) references an Appendix not included in the refined source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:07:11.405Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source commands; transport parameters verified against §1.2 serial/LAN spec; source command list fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe153 Control Spec

## Summary
Sharp/NEC projector (Ld Fe153) control spec covering the binary command protocol documented in the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Supports RS-232C serial and TCP (wired/wireless LAN) transports. Commands are hexadecimal framed packets with a trailing additive checksum byte.

<!-- UNRESOLVED: model name "Ld Fe153" supplied by operator; source doc is a generic projector command reference (BDT140013 Rev 7.1) and does not itself name the Ld Fe153 model. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow_control not stated; RTS/CTS pins wired (full-duplex comm mode)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF)
# - queryable       (numerous status requests: 009, 037*, 060-1, 078*, 084, 097*, 305*)
# - routable        (018 INPUT SW CHANGE)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL)
traits:
  - powerable  # inferred from power command examples
  - queryable  # inferred from query command examples
  - routable   # inferred from routing command examples
  - levelable  # inferred from volume/adjust command examples
```

## Actions
```yaml
- id: error_status_request
  label: 009 ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015 POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016 POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018 INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal byte (e.g. 06h = video port); see Appendix "Supplementary Information by Command"

- id: picture_mute_on
  label: 020 PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021 PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023 SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025 ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: 030-2 VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: 030-12 ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect; see Appendix "Supplementary Information by Command"

- id: other_adjust
  label: 030-15 OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h = LAMP/LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh for LAMP ADJUST)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: 037 INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3 FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4 LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lamp selector (00h Lamp 1, 01h Lamp 2 - lamp 2 only for two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h usage time seconds, 04h remaining life %)

- id: carbon_savings_information_request
  label: 037-6 CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Content (00h total Carbon Savings, 01h Carbon Savings during operation)

- id: remote_key_code
  label: 050 REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (WORD key code; see key code list in source §3.19)
    - name: DATA02
      type: integer
      description: Key code high byte

- id: shutter_close
  label: 051 SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (06h Periphery Focus; other lens axes per source)
    - name: DATA02
      type: integer
      description: Drive content (00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +, 81h -, FDh -0.25s, FEh -0.5s, FFh -1s)

- id: lens_control_request
  label: 053-1 LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector

- id: lens_control_2
  label: 053-2 LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis (FFh = Stop, skip mode/value)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 02h relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: 053-3 LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: reference_lens_memory_control
  label: 053-4 REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: lens_memory_option_request
  label: 053-5 LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: 053-6 LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h OFF, 01h ON)

- id: lens_information_request
  label: 053-7 LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10 LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h Profile 1, 01h Profile 2)

- id: lens_profile_request
  label: 053-11 LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1 GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST)

- id: setting_request
  label: 078-1 SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2 RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: 078-3 INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: 078-4 MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: 078-5 MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6 COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: 079 FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Freeze state (01h on, 02h off)

- id: information_string_request
  label: 084 INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

- id: eco_mode_request
  label: 097-8 ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45 LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155 LAN MAC ADDRESS STATUS REQUEST 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198 PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

- id: edge_blending_mode_request
  label: 097-243-1 EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8 ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode; see Appendix "Supplementary Information by Command"

- id: lan_projector_name_set
  label: 098-45 LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: 098-198 PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (mode: 00h PIP / 01h PbP; position: 00h-03h corners; sub input: per Appendix)

- id: edge_blending_mode_set
  label: 098-243-1 EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h OFF, 01h ON)

- id: base_model_type_request
  label: 305-1 BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: 305-2 SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3 BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: 319-10 AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal; see Appendix "Supplementary Information by Command"
    - name: DATA02
      type: integer
      description: Setting value (00h terminal specified in DATA01, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  # from 078-2 DATA06 / 305-3 DATA01 operation status

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  # from 078-2 DATA04

- id: error_status
  type: bitmap
  values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, fpga_error, temperature_error_sensor, lamp_not_present, mirror_cover_error, iris_calibration_error, interlock_switch_open, system_error_slave, system_error_formatter]
  # from 009 ERROR STATUS REQUEST DATA01-12 bit fields

- id: input_signal
  type: composite
  values: [computer, video, s_video, component, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10]
  # from 078-3 / 305-3 selection signal type

- id: mute_state
  type: composite
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]
  # from 078-4 MUTE STATUS REQUEST

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  # from 078-6 COVER STATUS REQUEST

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: eco mode enum values not listed in source body (refers to Appendix)
  # from 097-8 ECO MODE REQUEST

- id: edge_blending_mode
  type: enum
  values: [off, on]
  # from 097-243-1

- id: lamp_usage_time
  type: integer
  values: seconds
  # from 037-4 DATA03-06

- id: lamp_remaining_life
  type: integer
  values: percent
  # from 037-4 DATA03-06 (content 04h); negative if past deadline

- id: filter_usage_time
  type: integer
  values: seconds
  # from 037-3 DATA01-04
```

## Variables
```yaml
# 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST, and 053 LENS
# adjustment ranges are readable via 060-1 GAIN PARAMETER REQUEST 3, which returns
# upper/lower/default/current values per gain. Treat as queryable state, not
# standalone settable variables beyond the actions above.
```

## Events
```yaml
# No unsolicited notifications documented; all responses are command-driven.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on power, no other command can be accepted (source §3.2)."
  - command: power_off
    note: "While turning off power (including cooling time), no other command can be accepted (source §3.3)."
  - command: error_status_cover
    note: "009 error bit DATA09 Bit1: interlock switch open - error condition (source §3.1)."
# No explicit power-on sequencing requirements stated beyond the above.
```

## Notes
- Checksum (CKS): sum all preceding bytes, take low-order one byte of result (source §2.2). Example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Command frame format: `20h/22h/23h/02h/03h/01h/00h <ID1> <ID2> LEN <DATA..> <CKS>`. First byte encodes message class (request/ack/error). `ID1` = control ID set on projector; `ID2` = model code (varies by model).
- Error responses use `A0h/A1h/A2h/A3h` prefix with `<ERR1> <ERR2>` per source §2.4 error code list (e.g. `02h 0Dh` = command rejected because power is off).
- Usage-time queries (lamp/filter) update only at one-minute intervals though stored in one-second units.
- Serial: cross cable required; PC CONTROL port D-SUB 9P (pins 2/3 RXD/TXD, 5 GND, 7/8 RTS/CTS).
- LAN: wired RJ-45 (10/100 auto) or optional wireless LAN unit; both use TCP port 7142.

<!-- UNRESOLVED: model "Ld Fe153" not named inside source doc (generic projector command ref BDT140013 Rev 7.1). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: eco mode enum values (097-8/098-8) reference an Appendix not included in the refined source. -->
<!-- UNRESOLVED: input terminal byte table for 018/319-10 references an Appendix not included in the refined source. -->
<!-- UNRESOLVED: sub-input setting value table for 097-198/098-198 references an Appendix not included in the refined source. -->
<!-- UNRESOLVED: serial flow_control mode not explicitly stated (hardware RTS/CTS present, comm mode full-duplex). -->
<!-- UNRESOLVED: base model type code table (305-1, 078-1) references an Appendix not included in the refined source. -->

---

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:00:11.727Z
last_checked_at: 2026-06-17T20:07:11.405Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:07:11.405Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source commands; transport parameters verified against §1.2 serial/LAN spec; source command list fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Ld Fe153\" supplied by operator; source doc is a generic projector command reference (BDT140013 Rev 7.1) and does not itself name the Ld Fe153 model. Firmware version compatibility not stated."
- "flow_control not stated; RTS/CTS pins wired (full-duplex comm mode)"
- "eco mode enum values not listed in source body (refers to Appendix)"
- "model \"Ld Fe153\" not named inside source doc (generic projector command ref BDT140013 Rev 7.1)."
- "firmware version compatibility not stated."
- "eco mode enum values (097-8/098-8) reference an Appendix not included in the refined source."
- "input terminal byte table for 018/319-10 references an Appendix not included in the refined source."
- "sub-input setting value table for 097-198/098-198 references an Appendix not included in the refined source."
- "serial flow_control mode not explicitly stated (hardware RTS/CTS present, comm mode full-duplex)."
- "base model type code table (305-1, 078-1) references an Appendix not included in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
