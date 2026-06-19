---
spec_id: admin/sharp-nec-nc1843ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC1843ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC1843ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC1843ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:13:34.632Z
last_checked_at: 2026-06-18T08:33:24.043Z
generated_at: 2026-06-18T08:33:24.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the refined source is a generic NEC projector command reference (BDT140013 Rev 7.1) and does not name the NC1843ML model explicitly; model mapping supplied by operator. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is referenced by the source but not included in the refined extract."
  - "flow control not explicitly stated (full-duplex comm mode only)"
  - "no unsolicited notification events documented in source; all"
  - "no multi-step sequences documented in source."
  - "no power-on sequencing procedure or explicit safety interlock"
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" not included — input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables are referenced but not extracted."
  - "model-specific applicability of two-lamp / PIP / edge-blend features to the NC1843ML not stated in this generic reference."
  - "serial flow_control not explicitly specified (only \"full duplex\" comm mode stated)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:33:24.043Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC1843ML Control Spec

## Summary
Sharp/NEC NC1843ML projector control spec derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Covers binary RS-232C serial and TCP/IP (port 7142) control: power, input switching, mute, picture/volume/lens adjust, lens memory, shutter, freeze, status queries, error reporting, and LAN/PIP/edge-blend settings. Frame format is binary hex with a trailing checksum byte.

<!-- UNRESOLVED: the refined source is a generic NEC projector command reference (BDT140013 Rev 7.1) and does not name the NC1843ML model explicitly; model mapping supplied by operator. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is referenced by the source but not included in the refined extract. -->

## Transport
```yaml
# Source documents both RS-232C serial and wired/wireless LAN (TCP). Both populated.
# Frame structure (from §2.1/§2.2): [Cat][Cmd][ID1][ID2][LEN][DATA...][CKS].
# Commands in the source use ID1=00h ID2=00h as placeholders; the projector's
# actual control ID (ID1) and model code (ID2) must be substituted, and the
# checksum (CKS) recomputed. CKS = low byte of sum of all preceding bytes.
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated (full-duplex comm mode only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable: POWER ON/OFF commands present (015/016)
# - queryable: numerous status/info request commands present (009, 037 family, 078 family, 097 family, 305 family)
# - levelable: picture/volume/lamp adjust commands present (030-1/030-2/030-15)
traits:
  - powerable   # inferred from power on/off commands
  - queryable   # inferred from query commands
  - levelable   # inferred from volume/picture/gain adjust commands
```

## Actions
```yaml
# All command byte strings copied verbatim from source. {DATAxx} = parameter
# byte(s); {CKS} = checksum to be computed. ID1/ID2 shown as 00h placeholders.
# kind: query entries request data and receive a data-bearing response.

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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: input_terminal
      type: byte
      description: "Input terminal value (DATA01). e.g. 06h = video port. See Appendix 'Supplementary Information by Command'."

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: byte
      description: "DATA02 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: byte
      description: "DATA03 adjustment value (low 8 bits)"
    - name: value_high
      type: byte
      description: "DATA04 adjustment value (high 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: mode
      type: byte
      description: "DATA01 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: byte
      description: "DATA02 adjustment value (low 8 bits)"
    - name: value_high
      type: byte
      description: "DATA03 adjustment value (high 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: aspect_value
      type: byte
      description: "DATA01 aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01/02 target: 96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: byte
      description: "DATA03 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: byte
      description: "DATA04 adjustment value (low 8 bits)"
    - name: value_high
      type: byte
      description: "DATA05 adjustment value (high 8 bits)"

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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: lamp
      type: byte
      description: "DATA01: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: content
      type: byte
      description: "DATA02: 01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: type
      type: byte
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: key_code
      type: word
      description: "DATA01/DATA02 key code (WORD). e.g. POWER ON=02h/00h, AUTO=05h/00h, MENU=06h/00h, UP=07h/00h, DOWN=08h/00h, VOLUME UP=84h/00h, FREEZE=8Ah/00h, ASPECT=A3h/00h, LAMP MODE/ECO=EEh/00h (full list in source §3.19)."

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
    - name: target
      type: byte
      description: "DATA01 target (e.g. 06h=Periphery Focus; other lens axes per source)"
    - name: content
      type: byte
      description: "DATA02: 00h=Stop, 7Fh=drive plus, 81h=drive minus, 01h/02h/03h=plus 1s/0.5s/0.25s, FFh/FEh/FDh=minus 1s/0.5s/0.25s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 lens target to read adjustment range/current value"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 target (FFh=Stop; mode/value ignored when Stop)"
    - name: mode
      type: byte
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value_low
      type: byte
      description: "DATA03 adjustment value (low 8 bits)"
    - name: value_high
      type: byte
      description: "DATA04 adjustment value (high 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: action
      type: byte
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: action
      type: byte
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set via LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: byte
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: profile
      type: byte
      description: "DATA01: 00h=Profile1, 01h=Profile2"

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
    - name: name
      type: byte
      description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: state
      type: byte
      description: "DATA01: 01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: type
      type: byte
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
    - name: item
      type: byte
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: value
      type: byte
      description: "DATA01 eco-mode value. See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "DATA01-16 projector name (up to 16 bytes, NUL terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: item
      type: byte
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: byte
      description: "DATA02 setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00-03h; SUB INPUT values per Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: value
      type: byte
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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: input_terminal
      type: byte
      description: "DATA01 input terminal. See Appendix 'Supplementary Information by Command'."
    - name: value
      type: byte
      description: "DATA02: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states surfaced by query responses.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA03 / basic_information_request DATA01

- id: error_status
  type: bitmask
  description: "12-byte error info (DATA01-12) from error_status_request; bit set = fault (cover, fan, temp, lamp, etc.)"
  source: error_status_request

- id: mute_state
  type: enum
  description: "Picture/Sound/Onscreen mute on/off (DATA01-03) and forced onscreen mute (DATA04)"
  source: mute_status_request

- id: input_state
  type: enum
  description: "Selected input signal type and content displayed"
  source: input_status_request

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 (DATA01=00h, DATA02=01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA01=00h, DATA02=04h); negative if deadline exceeded
```

## Variables
```yaml
# Settable parameters surfaced as variables (set via the *set commands above).
- id: eco_mode
  type: enum
  description: "Eco/Light/Lamp mode value (values in Appendix)"
  set_command: eco_mode_set
  get_command: eco_mode_request

- id: projector_name
  type: string
  max_length: 16
  set_command: lan_projector_name_set
  get_command: lan_projector_name_request

- id: edge_blending_mode
  type: enum
  values: [off, on]
  set_command: edge_blending_mode_set
  get_command: edge_blending_mode_request

- id: volume
  type: integer
  set_command: volume_adjust
  get_command: gain_parameter_request_3
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source; all
# responses are command replies.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON is executing, no other command can be accepted. (source §3.2)"
  - id: power_off_lockout
    description: "While POWER OFF is executing (including cooling time), no other command can be accepted. (source §3.3)"
  - id: interlock_switch
    description: "Error status DATA09 bit1 reports 'interlock switch is open' as a fault condition. No recovery procedure stated. (source §3.1)"
# UNRESOLVED: no power-on sequencing procedure or explicit safety interlock
# recovery steps stated in source; only the error/fault bits above are documented.
```

## Notes
- **Protocol is binary hex, not ASCII.** All commands are byte sequences with a trailing checksum (CKS = low byte of the sum of all preceding bytes). Example from source: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- **ID1/ID2:** `ID1` = projector control ID, `ID2` = model code. The source renders commands with `00h` placeholders for ID1/ID2; an implementation must substitute the target projector's actual values and recompute CKS. Responses from the projector include the real ID1/ID2 (prefix bytes `2Xh` = success, `AXh` = error).
- **Response prefixes:** success responses begin with `2Xh` (X = category), error responses begin with `AXh` and carry `<ERR1> <ERR2>` error codes (see source §2.4 for the full code list).
- **Usage-time resolution:** lamp/filter usage times are reported in seconds but updated only at one-minute intervals.
- **Source coverage:** command reference BDT140013 Rev 7.1 documents 53 commands; all are enumerated above. Several commands defer parameter enum tables to an Appendix ("Supplementary Information by Command") that is not present in the refined extract.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables are referenced but not extracted. -->
<!-- UNRESOLVED: model-specific applicability of two-lamp / PIP / edge-blend features to the NC1843ML not stated in this generic reference. -->
<!-- UNRESOLVED: serial flow_control not explicitly specified (only "full duplex" comm mode stated). -->
```

Spec done. 53 commands, all verbatim hex payloads. Serial+TCP transport, port 7142, baud set selectable. Appendix tables + firmware = UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:13:34.632Z
last_checked_at: 2026-06-18T08:33:24.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:33:24.043Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the refined source is a generic NEC projector command reference (BDT140013 Rev 7.1) and does not name the NC1843ML model explicitly; model mapping supplied by operator. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) is referenced by the source but not included in the refined extract."
- "flow control not explicitly stated (full-duplex comm mode only)"
- "no unsolicited notification events documented in source; all"
- "no multi-step sequences documented in source."
- "no power-on sequencing procedure or explicit safety interlock"
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" not included — input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables are referenced but not extracted."
- "model-specific applicability of two-lamp / PIP / edge-blend features to the NC1843ML not stated in this generic reference."
- "serial flow_control not explicitly specified (only \"full duplex\" comm mode stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
