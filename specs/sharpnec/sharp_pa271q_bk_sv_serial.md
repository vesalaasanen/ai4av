---
spec_id: admin/sharp-nec-pa271q-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA271Q BK SV Control Spec"
manufacturer: Sharp/NEC
model_family: "PA271Q BK SV"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "PA271Q BK SV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:14:50.644Z
last_checked_at: 2026-06-18T09:04:24.470Z
generated_at: 2026-06-18T09:04:24.470Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source is a generic projector command manual and does not name a specific model in its body; the model \"PA271Q BK SV\" is taken from the operator-supplied device name, not from a statement inside the source document. Base-model-type appendix values are referenced but not reproduced in the refined source. Firmware compatibility, voltage/power specs, and flow control are not stated."
  - "flow control not stated in source (RTS/CTS pins wired but mode not specified)"
  - "none beyond action-backed parameters."
  - "no event/notification mechanism documented."
  - "none described in source."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility not stated in source."
  - "input-terminal / aspect / eco-mode / sub-input enum value tables live in the source Appendix \"Supplementary Information by Command\", which is not present in the refined source artifact — those enums are noted but not enumerated."
  - "model code (ID2) value for this specific model not stated in source."
  - "serial flow_control mode not stated (RTS/CTS pins are wired but hardware vs. no flow control is unspecified)."
  - "voltage / current / power specifications not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:04:24.470Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA271Q BK SV Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C (D-SUB 9P, PC CONTROL port) and wired/wireless LAN (TCP port 7142) control of a projector device. The source is the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1) documenting a binary, checksum-framed command protocol with ~53 commands spanning power, input switching, mute, picture/volume/aspect adjust, lens control & memory, status queries, eco/PIP/edge-blend set, and information requests.

<!-- UNRESOLVED: The source is a generic projector command manual and does not name a specific model in its body; the model "PA271Q BK SV" is taken from the operator-supplied device name, not from a statement inside the source document. Base-model-type appendix values are referenced but not reproduced in the refined source. Firmware compatibility, voltage/power specs, and flow control are not stated. -->

## Transport
```yaml
# Source documents both a serial (RS-232C) PC CONTROL port and a wired/wireless
# LAN path using TCP port 7142. Both are populated (Tier 1 - explicitly stated).
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all five stated as supported; default NOT stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired but mode not specified)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many *REQUEST query commands returning values
  - routable     # inferred: INPUT SW CHANGE + audio select routing present
  - levelable    # inferred: VOLUME / PICTURE / LAMP adjust commands present
```

## Actions
```yaml
# All command bytes are VERBATIM from the source (hex with "h" suffix, space-separated).
# Every framed command ends in a checksum byte (CKS) = low-order byte of the sum of
# all preceding bytes. For parameterized commands the source shows <CKS>; computed at
# runtime. Fixed-byte commands below include the literal checksum from the source.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h  88h  00h  00h  00h  88h"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h  00h  00h  00h  00h  02h"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h  01h  00h  00h  00h  03h"
    params: []
    notes: During power-off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). Full value list in source Appendix 'Supplementary Information by Command' - not reproduced in refined source."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h  10h  00h  00h  00h  12h"
    params: []

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h  11h  00h  00h  00h  13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h  12h  00h  00h  00h  14h"
    params: []

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h  13h  00h  00h  00h  15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h  14h  00h  00h  00h  16h"
    params: []

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h  15h  00h  00h  00h  17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> - <DATA04> <CKS>"
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
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> - <DATA03> <CKS>"
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
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Value set for the aspect (enum in source Appendix - not reproduced in refined source)"

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h  10h  00h  00h  05h  96h  FFh  <DATA03> - <DATA05> <CKS>"
    params:
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: DATA01=96h, DATA02=FFh fixed for LAMP ADJUST / LIGHT ADJUST.

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h  8Ah  00h  00h  00h  8Dh"
    params: []
    notes: Returns projector name, lamp usage time (s), filter usage time (s).

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h  95h  00h  00h  00h  98h"
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h  96h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h  9Ah  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h  0Fh  00h  00h  02h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Source key-code table includes POWER ON(02h), POWER OFF(03h), AUTO(05h), MENU(06h), UP(07h), DOWN(08h), RIGHT(09h), LEFT(0Ah), ENTER(0Bh), EXIT(0Ch), HELP(0Dh), MAGNIFY UP(0Fh), MAGNIFY DOWN(10h), MUTE(13h), PICTURE(29h), COMPUTER1(4Bh), COMPUTER2(4Ch), VIDEO1(4Fh), S-VIDEO1(51h), VOLUME UP(84h), VOLUME DOWN(85h), FREEZE(8Ah), ASPECT(A3h), SOURCE(D7h), LAMP MODE/ECO(EEh)."
      - name: DATA02
        type: integer
        description: Key code high byte (00h for all listed codes)

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h  16h  00h  00h  00h  18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h  17h  00h  00h  00h  19h"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h  18h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (06h=Periphery Focus shown in source; other targets in Appendix)"
      - name: DATA02
        type: integer
        description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target selector

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h  1Dh  00h  00h  04h  <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop (mode/value ignored), else lens target"
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
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h  1Eh  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h  1Fh  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile selected via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h  20h  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h  21h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h  22h  00h  00h  01h  00h  25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h  27h  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h  28h  00h  00h  00h  2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  00h  86h"
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  01h  87h"
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  02h  88h"
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  03h  89h"
    params: []

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  04h  8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  05h  8Bh"
    params: []

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h  98h  00h  00h  01h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  01h  07h  BBh"
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  01h  2Ch  E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  02h  C5h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h  B1h  00h  00h  02h  07h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (enum in source Appendix - not reproduced in refined source)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16>  00h  <CKS>"
    params:
      - name: DATA01_DATA16
        type: string
        description: Projector name (up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h  B1h  00h  00h  03h  C5h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (mode/position/sub-input per DATA01; sub-input enum in Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  01h  00h  C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  01h  02h  C2h"
    params: []

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h  C9h  00h  00h  03h  09h  <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (value list in source Appendix - not reproduced in refined source)"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Query responses / observable states derived from the *REQUEST commands above.
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: running_status_request (DATA03/DATA06), basic_information_request (DATA01)

  - id: error_status
    type: bitmask
    description: 12-byte error information (DATA01-DATA12) from error_status_request; bit=1 => error.

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: lamp_information_request_3 (DATA02=01h); updated at 1-minute intervals.

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: lamp_information_request_3 (DATA02=04h); negative if replacement deadline exceeded.

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: filter_usage_information_request

  - id: mute_state
    type: object
    description: picture/sound/onscreen/forced-onscreen mute flags from mute_status_request.

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: cover_status_request

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: lens_profile_request

  - id: model_name
    type: string
    source: model_name_request

  - id: serial_number
    type: string
    source: serial_number_request

  - id: mac_address
    type: string
    source: lan_mac_address_status_request_2
```

## Variables
```yaml
# Settable parameters are exposed as Actions (picture/volume/aspect/lens/eco/PIP/
# edge-blend/audio-select SET commands). No additional settable parameters exist
# outside those action commands.
# UNRESOLVED: none beyond action-backed parameters.
```

## Events
```yaml
# Source describes no unsolicited notifications; all responses are replies to commands.
# UNRESOLVED: no event/notification mechanism documented.
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
# UNRESOLVED: none described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (not safety interlocks per se, but command-acceptance constraints):
#   - During POWER ON ramp-up, no other command is accepted.
#   - During POWER OFF (incl. cooling time), no other command is accepted.
#   - Error code 02h/0Dh => "command cannot be accepted because the power is off".
#   - Error code 02h/0Fh => "no authority necessary for the operation".
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in the refined source.
```

## Notes
- Command framing: every command is a hex byte stream. Response framing uses leading byte `2Xh` (success, X=command-class) or `AXh` (error) followed by `<ID1> <ID2>`, length, payload, `<CKS>`. ID1 = projector control ID; ID2 = model code (model-dependent).
- Checksum (CKS) = low-order one byte of the sum of all preceding bytes. Worked source example: `20h+81h+01h+60h+01h+00h = 103h` => CKS = `03h`.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS).
- LAN: wired 10/100 Mbps auto-sensing (RJ-45), or wireless via a separate wireless-LAN unit (see that unit's manual). TCP port 7142 for command send/receive.
- Information queries (lamp/filter usage) update only at 1-minute intervals though returned in 1-second units.
- Baud rate is selectable among five values; the source does not designate a default.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / sub-input enum value tables live in the source Appendix "Supplementary Information by Command", which is not present in the refined source artifact — those enums are noted but not enumerated. -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source. -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins are wired but hardware vs. no flow control is unspecified). -->
<!-- UNRESOLVED: voltage / current / power specifications not stated in source. -->
````

Spec done. 53 actions, all hex verbatim + checksums. Serial+TCP(7142). Traits powerable/queryable/routable/levelable. Gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:14:50.644Z
last_checked_at: 2026-06-18T09:04:24.470Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:04:24.470Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source is a generic projector command manual and does not name a specific model in its body; the model \"PA271Q BK SV\" is taken from the operator-supplied device name, not from a statement inside the source document. Base-model-type appendix values are referenced but not reproduced in the refined source. Firmware compatibility, voltage/power specs, and flow control are not stated."
- "flow control not stated in source (RTS/CTS pins wired but mode not specified)"
- "none beyond action-backed parameters."
- "no event/notification mechanism documented."
- "none described in source."
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility not stated in source."
- "input-terminal / aspect / eco-mode / sub-input enum value tables live in the source Appendix \"Supplementary Information by Command\", which is not present in the refined source artifact — those enums are noted but not enumerated."
- "model code (ID2) value for this specific model not stated in source."
- "serial flow_control mode not stated (RTS/CTS pins are wired but hardware vs. no flow control is unspecified)."
- "voltage / current / power specifications not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
