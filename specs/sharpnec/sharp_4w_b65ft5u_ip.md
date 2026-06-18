---
spec_id: admin/sharp-nec-4w-b65ft5u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 4W B65Ft5U Control Spec"
manufacturer: Sharp/NEC
model_family: "4W B65Ft5U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "4W B65Ft5U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:00:12.452Z
last_checked_at: 2026-06-17T19:31:30.950Z
generated_at: 2026-06-17T19:31:30.950Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "control ID (ID1) and model code (ID2) values not documented; ID2 varies by model"
  - "command timing / inter-command spacing not documented"
  - "flow control not stated; source states \"Full duplex\" communication mode only"
  - "none beyond action params"
  - "source contains no explicit safety interlock procedures or power-on sequencing"
  - "ID1 (control ID) default and ID2 (model code) for the 4W B65Ft5U not stated in source"
  - "Appendix 'Supplementary Information by Command' values not present in refined source"
  - "response timing / timeout values not documented"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:31:30.950Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex commands in source; 100% coverage with no extra commands; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC 4W B65Ft5U Control Spec

## Summary
Sharp/NEC 4W B65Ft5U projector control spec derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP (wired/wireless LAN) control on TCP port 7142. Commands are binary frames consisting of a header, fixed bytes, optional DATA parameters, and a one-byte checksum (low byte of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) values not documented; ID2 varies by model -->
<!-- UNRESOLVED: command timing / inter-command spacing not documented -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported rates: 115200/38400/19200/9600/4800 - default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source states "Full duplex" communication mode only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable    # inferred: many REQUEST commands returning state
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST gain commands present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on, no other command can be accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (including cooling time), no other command can be accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command'."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: data02
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data02
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: "Value set for aspect. See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjustment target. Documented row: DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: byte
        description: "Sub-target (FFh for LAMP/LIGHT ADJUST)."
      - name: data03
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data04
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Lamp 1, 01h Lamp 2 (Lamp 2 only effective on two-lamp models)"
      - name: data02
        type: byte
        description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Key code low byte (WORD). See Key code list, e.g. 02h POWER ON, 05h AUTO."
      - name: data02
        type: byte
        description: Key code high byte (00h for listed codes).

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Lens target. Documented row: 06h Periphery Focus."
      - name: data02
        type: byte
        description: "Content/drive: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +drive, 81h -drive, FDh -0.25s, FEh -0.5s, FFh -1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: Lens target (same encoding as 053 LENS CONTROL DATA01).

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Lens target. FFh = Stop (mode/value not referenced)."
      - name: data02
        type: byte
        description: "Adjustment mode: 00h absolute, 02h relative"
      - name: data03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET (applies to profile selected via 053-10)"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: byte
        description: "Setting value: 00h OFF, 01h ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Profile number: 00h Profile 1, 01h Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "01h freeze ON, 02h freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: byte
        description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Value set for eco mode. See Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: data01_16
        type: string
        description: Projector name (up to 16 bytes), NUL-terminated.

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: byte
        description: "Setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h TOP-LEFT / 01h TOP-RIGHT / 02h BOTTOM-LEFT / 03h BOTTOM-RIGHT; sub input per Appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Setting value: 00h OFF, 01h ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: data02
        type: byte
        description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: 12-byte error information (DATA01-DATA12); bit=0 normal, bit=1 error.

  - id: command_result
    type: enum
    values: [success, error]
    description: Returned in ACK response; ERR1/ERR2 = 00h 00h on success, otherwise error code pair.

  - id: lamp_information
    type: numeric
    description: Lamp usage time (seconds) or remaining life (%) returned per LAMP INFORMATION REQUEST 3.

  - id: filter_usage_information
    type: numeric
    description: Filter usage time (seconds) and filter alarm start time (seconds); -1 if undefined.

  - id: carbon_savings
    type: numeric
    description: Carbon savings kg + mg, max 99999 kg / 999999 mg.

  - id: gain_parameter
    type: composite
    description: Adjustment status, range (upper/lower limits), default, current value, wide/narrow width per GAIN PARAMETER REQUEST 3.

  - id: running_status
    type: composite
    description: Power status, cooling process, power on/off process, operation status bytes.

  - id: input_status
    type: composite
    description: Signal switch process, signal list number, selection signal type, signal list type, test pattern display, content displayed.

  - id: mute_status
    type: composite
    description: Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display flags.

  - id: cover_status
    type: enum
    values: [normal_open, closed]

  - id: lens_information
    type: bitmask
    description: Per-axis (lens memory / zoom / focus / lens shift H / lens shift V) operation state, 0=stop / 1=operating.

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]

  - id: eco_mode
    type: byte
    description: Value set for eco mode (model-dependent Light/Lamp mode).

  - id: lan_projector_name
    type: string

  - id: lan_mac_address
    type: string

  - id: edge_blending_mode
    type: enum
    values: [off, on]

  - id: pip_pbp_setting
    type: composite
    description: MODE / START POSITION / SUB INPUT value per request sub-id.

  - id: base_model_type
    type: composite
    description: Base model type code + model name string.

  - id: serial_number
    type: string

  - id: basic_information
    type: composite
    description: Operation status, content displayed, signal type, mute/freeze flags.

  - id: information_string
    type: string
    description: Horizontal/vertical sync frequency string (English).

  - id: model_name
    type: string

  - id: setting_information
    type: composite
    description: Base model type, sound function availability, profile number.

  - id: lens_control_adjusted_values
    type: composite
    description: Per-axis adjustment range (upper/lower) + current value from LENS CONTROL REQUEST.
```

## Variables
```yaml
# Settable parameters exposed above as actions (PICTURE/VOLUME/ASPECT/OTHER ADJUST, LENS targets,
# LENS PROFILE, FREEZE, ECO MODE, EDGE BLENDING, PIP/PbP, AUDIO SELECT). No additional standalone
# variables documented.
# UNRESOLVED: none beyond action params
```

## Events
```yaml
# Source documents no unsolicited notifications. All device output is a response to a command.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    rule: "While POWER ON is executing, no other command is accepted."
  - command: power_off
    rule: "While POWER OFF is executing (including cooling time), no other command is accepted."
  - command: lens_control
    rule: "Continuous drive (DATA02=7Fh/-81h) must be stopped by subsequently sending DATA02=00h."
# UNRESOLVED: source contains no explicit safety interlock procedures or power-on sequencing
# requirements beyond the per-command execution locks noted above.
```

## Notes
- Command frame structure: `20h 88h <ID1> <ID2> <LEN> <DATA01>...<DATA??> <CKS>` (request header 20h/02h/03h/etc; response header A0h/22h/A2h/23h/A3h on success, error responses carry `<ERR1> <ERR2>`).
- Checksum (CKS) = low-order byte of the sum of all preceding bytes.
- `ID1` = projector control ID; `ID2` = model code (varies by model). Neither default value is stated in source.
- Usage-time queries update at one-minute intervals despite one-second resolution.
- Lamp remaining life (%) is returned negative if the replacement deadline is exceeded.
- Several DATA fields reference an "Appendix: Supplementary Information by Command" not included in this refined excerpt (input terminal codes, aspect values, eco-mode values, base model type codes, sub-input values).
<!-- UNRESOLVED: ID1 (control ID) default and ID2 (model code) for the 4W B65Ft5U not stated in source -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' values not present in refined source -->
<!-- UNRESOLVED: response timing / timeout values not documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:00:12.452Z
last_checked_at: 2026-06-17T19:31:30.950Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:31:30.950Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex commands in source; 100% coverage with no extra commands; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "control ID (ID1) and model code (ID2) values not documented; ID2 varies by model"
- "command timing / inter-command spacing not documented"
- "flow control not stated; source states \"Full duplex\" communication mode only"
- "none beyond action params"
- "source contains no explicit safety interlock procedures or power-on sequencing"
- "ID1 (control ID) default and ID2 (model code) for the 4W B65Ft5U not stated in source"
- "Appendix 'Supplementary Information by Command' values not present in refined source"
- "response timing / timeout values not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
