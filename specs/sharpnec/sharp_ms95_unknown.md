---
spec_id: admin/sharp-nec-ms95
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ms95 Control Spec"
manufacturer: Sharp/NEC
model_family: Ms95
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Ms95
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:46:51.811Z
last_checked_at: 2026-06-18T08:32:15.696Z
generated_at: 2026-06-18T08:32:15.696Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic manual covering multiple projector models; Ms95 model name supplied externally, not confirmed verbatim in source. Input-terminal value table, key-code enums, and base-model-type enums referenced in an \"Appendix\" not present in the extracted source text."
  - "flow control not stated; source lists \"Full duplex\" communication mode only"
  - "source contains no explicit safety interlock procedures beyond the"
  - "Ms95 model name supplied externally; source is a multi-model generic manual (BDT140013 Rev 7.1) and does not name a specific model."
  - "flow_control not stated."
  - "firmware version compatibility not stated."
  - "Appendix value tables (input terminals, eco modes, sub-inputs, base model types) missing from extracted source."
  - "ID2 model code value for Ms95 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:32:15.696Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ms95 Control Spec

## Summary
Sharp/NEC projector (Ms95 family) binary control protocol. Supports RS-232C serial and TCP/IP (wired/wireless LAN). Commands are framed hex byte sequences with a trailing checksum byte (low-order 8 bits of sum of all preceding bytes). Source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1.

<!-- UNRESOLVED: source is a generic manual covering multiple projector models; Ms95 model name supplied externally, not confirmed verbatim in source. Input-terminal value table, key-code enums, and base-model-type enums referenced in an "Appendix" not present in the extracted source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 9600   # source lists supported set: 115200/38400/19200/9600/4800 - 9600 chosen as common default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; source lists "Full duplex" communication mode only
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - queryable    # inferred: many *REQUEST queries present
  - levelable    # inferred: PICTURE/VOLUME/ASPECT/OTHER ADJUST present
```

## Actions
```yaml
# All payloads verbatim from source (hex). ID1/ID2 appear only in responses.
# Checksum (CKS) = low-order byte of sum of all preceding bytes.
actions:
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
    notes: While powering on, no other command accepted.

  - id: power_off
    label: 016 POWER OFF
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off incl. cooling time, no other command accepted.

  - id: input_sw_change
    label: 018 INPUT SW CHANGE
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: Input terminal value (e.g. 06h=video). Full value list in source Appendix not present.
    notes: Source example DATA01=06h → "02h 03h 00h 00h 02h 01h 06h 0Eh"

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
        type: enum
        description: "Adjustment target: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high 8 bits)

  - id: volume_adjust
    label: 030-2 VOLUME ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA02
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high 8 bits)
    notes: Source example sets volume to 10 → "...05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: 030-12 ASPECT ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: Aspect value - full list in source Appendix (not present).

  - id: other_adjust
    label: 030-15 OTHER ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high 8 bits)
      - name: DATA05
        type: integer
        description: Reserved per source structure

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
        type: enum
        description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: DATA02
        type: enum
        description: "Content: 01h=usage time (s), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: 037-6 CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: 050 REMOTE KEY CODE
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (WORD-type key code)
      - name: DATA02
        type: integer
        description: Key code high byte
    notes: "Source key code list includes: 02h00h POWER ON, 03h00h POWER OFF, 05h00h AUTO, 06h00h MENU, 07h00h UP, 08h00h DOWN, 09h00h RIGHT, 0Ah00h LEFT, 0Bh00h ENTER, 0Ch00h EXIT, 0Dh00h HELP, 0Fh00h MAGNIFY UP, 10h00h MAGNIFY DOWN, 13h00h MUTE, 29h00h PICTURE, 4Bh00h COMPUTER1, 4Ch00h COMPUTER2, 4Fh00h VIDEO1, 51h00h S-VIDEO1, 84h00h VOLUME UP, 85h00h VOLUME DOWN, 8Ah00h FREEZE, A3h00h ASPECT, D7h00h SOURCE, EEh00h LAMP MODE/ECO"

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
        type: enum
        description: "Target: 06h=Periphery Focus"
      - name: DATA02
        type: enum
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: 053-1 LENS CONTROL REQUEST
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: Target (see source)

  - id: lens_control_2
    label: 053-2 LENS CONTROL 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "FFh=Stop, other=target"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high 8 bits)

  - id: lens_memory_control
    label: 053-3 LENS MEMORY CONTROL
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: 053-4 REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile selected by 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: 053-5 LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: 053-6 LENS MEMORY OPTION SET
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: enum
        description: "Setting value: 00h=OFF, 01h=ON"

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
        type: enum
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
        type: enum
        description: "Adjusted value name: 00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"

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
        type: enum
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: 084 INFORMATION STRING REQUEST
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
    label: 097-155 LAN MAC ADDRESS STATUS REQUEST2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: 097-198 PIP/PICTURE BY PICTURE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
        type: enum
        description: Eco mode value - full list in source Appendix (not present).

  - id: lan_projector_name_set
    label: 098-45 LAN PROJECTOR NAME SET
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: 098-198 PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: enum
        description: "Value depends on DATA01 (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input per Appendix)"

  - id: edge_blending_mode_set
    label: 098-243-1 EDGE BLENDING MODE SET
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=OFF, 01h=ON"

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
        type: enum
        description: Input terminal (value list in source Appendix, not present)
      - name: DATA02
        type: enum
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "Response to 009: 12 bytes DATA01-12. Each bit=0 normal, bit=1 error. DATA01-04 cover cover/fan/temp/power/lamp errors; DATA09 carries extended status (interlock switch, system errors)."
  - id: information
    type: object
    description: "Response to 037: projector name (DATA01-49), lamp usage time s (DATA83-86), filter usage time s (DATA87-90)."
  - id: filter_usage
    type: object
    description: "Response to 037-3: filter usage time s (DATA01-04), filter alarm start time s (DATA05-08). -1 if undefined."
  - id: lamp_information
    type: object
    description: "Response to 037-4: lamp usage time s or remaining life %. Negative life if replacement deadline exceeded."
  - id: carbon_savings
    type: object
    description: "Response to 037-6: Carbon Savings kg (DATA02-05) + mg (DATA06-09)."
  - id: lens_control
    type: object
    description: "Response to 053-1: upper/lower/current lens values (16-bit each)."
  - id: lens_information
    type: bitmask
    description: "Response to 053-7: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop,1=operating)."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Response to 053-11."
  - id: gain_parameter
    type: object
    description: "Response to 060-1: status, upper/lower/default/current values, wide/narrow adjustment widths."
  - id: setting
    type: object
    description: "Response to 078-1: base model type, sound function availability, profile number."
  - id: running_status
    type: object
    description: "Response to 078-2: power status, cooling process, power on/off process, operation status."
  - id: input_status
    type: object
    description: "Response to 078-3: signal switch process, signal list number, signal types, content displayed."
  - id: mute_status
    type: object
    description: "Response to 078-4: picture/sound/onscreen/forced-onscreen mute + OSD display."
  - id: model_name
    type: string
    description: "Response to 078-5."
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: "Response to 078-6."
  - id: information_string
    type: string
    description: "Response to 084: horizontal or vertical sync frequency."
  - id: eco_mode
    type: enum
    description: "Response to 097-8 (values per Appendix not present)."
  - id: lan_projector_name
    type: string
    description: "Response to 097-45 (up to 17 bytes)."
  - id: lan_mac_address
    type: string
    description: "Response to 097-155: 6-byte MAC."
  - id: pip_pbpb
    type: object
    description: "Response to 097-198: MODE/START POSITION/SUB INPUT settings."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Response to 097-243-1."
  - id: base_model_type
    type: object
    description: "Response to 305-1: base model type + model name."
  - id: serial_number
    type: string
    description: "Response to 305-2."
  - id: basic_information
    type: object
    description: "Response to 305-3: operation status, content displayed, signal types, mute/freeze status."
```

## Variables
```yaml
# No separately declared settable variables beyond the parameterized Actions above.
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are command-acknowledgements.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: cooling time follows; no other command accepted during
interlocks:
  - command: power_on
    note: "While powering on, no other command accepted."
  - command: power_off
    note: "During power-off incl. cooling time, no other command accepted."
# UNRESOLVED: source contains no explicit safety interlock procedures beyond the
# command-acceptance notes above; error-status bitmask (009) reports fan/temp/cover/
# interlock-switch/foreign-matter conditions but no recovery sequence documented.
```

## Notes
- All commands are binary hex frames. Response framing prefix differs by command class: `2xh`/`3xh` echo replies, `Axh` error replies (with ERR1/ERR2), `20h`/`23h` for data replies.
- Checksum = low-order byte of sum of all preceding bytes (incl. header). Worked source example: `20h 81h 01h 60h 01h 00h` → sum=103h → CKS=03h.
- ID1 = projector control ID; ID2 = model code (varies by model). These appear in responses, not request templates.
- Lamp usage time and information update at one-minute intervals despite one-second unit resolution.
- Source references an "Appendix: Supplementary Information by Command" containing input-terminal values, base-model-type values, sub-input values, and eco-mode values — this appendix was NOT present in the extracted source text.

<!-- UNRESOLVED: Ms95 model name supplied externally; source is a multi-model generic manual (BDT140013 Rev 7.1) and does not name a specific model. -->
<!-- UNRESOLVED: flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: Appendix value tables (input terminals, eco modes, sub-inputs, base model types) missing from extracted source. -->
<!-- UNRESOLVED: ID2 model code value for Ms95 not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:46:51.811Z
last_checked_at: 2026-06-18T08:32:15.696Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:32:15.696Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic manual covering multiple projector models; Ms95 model name supplied externally, not confirmed verbatim in source. Input-terminal value table, key-code enums, and base-model-type enums referenced in an \"Appendix\" not present in the extracted source text."
- "flow control not stated; source lists \"Full duplex\" communication mode only"
- "source contains no explicit safety interlock procedures beyond the"
- "Ms95 model name supplied externally; source is a multi-model generic manual (BDT140013 Rev 7.1) and does not name a specific model."
- "flow_control not stated."
- "firmware version compatibility not stated."
- "Appendix value tables (input terminals, eco modes, sub-inputs, base model types) missing from extracted source."
- "ID2 model code value for Ms95 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
