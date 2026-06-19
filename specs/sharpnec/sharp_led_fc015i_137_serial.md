---
spec_id: admin/sharp-nec-led-fc015i-137
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC015I 137 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC015I 137"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC015I 137"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:44:52.233Z
last_checked_at: 2026-06-18T08:03:41.515Z
generated_at: 2026-06-18T08:03:41.515Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default baud rate not stated in source (multiple listed)"
  - "control ID (ID1) default value not stated in source"
  - "source lists 115200/38400/19200/9600/4800 bps; default not stated"
  - "flow control not stated; full-duplex mode stated"
  - "min/max range not fixed in source - returned per-device by GAIN PARAMETER REQUEST 3"
  - "range device-dependent"
  - "no async event mechanism documented"
  - "no macro support documented"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "Appendix \"Supplementary Information by Command\" not included in source — input terminal / aspect / eco mode / base model type / sub-input enumerations incomplete"
  - "default control ID (ID1) not stated"
  - "default model code (ID2) not stated"
  - "command inter-byte timing / inter-command delay not stated"
  - "LAN response framing identical to serial not explicitly confirmed in source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:03:41.515Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC015I 137 Control Spec

## Summary
Sharp/NEC LED projector (model FC015I 137) controlled via RS-232C serial cross-cable or wired/wireless LAN (TCP). Spec covers the full binary command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect adjustments, lens control and memory, status queries, eco mode, edge blending, PIP/PbP, and device info requests. Commands are binary hex frames with a checksum byte (low-order byte of sum of preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate not stated in source (multiple listed) -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex mode stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (power on/off commands present)
# - routable        (input switching present)
# - queryable       (status queries present)
# - levelable       (picture/volume/gain adjustments present)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Each entry below is one command row from the source command list (53 total).
# Frames are written verbatim as in the source. CKS = checksum, computed as
# low-order byte of the sum of all preceding bytes.
actions:
  - id: error_status_request_009
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on_015
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off_016
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change_018
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal selector (e.g. 06h = video port); see Appendix Supplementary Information by Command

  - id: picture_mute_on_020
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off_021
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on_022
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off_023
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on_024
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off_025
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust_030_2
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust_030_12
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the aspect; see Appendix Supplementary Information by Command

  - id: other_adjust_030_15
    label: Other Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)
      - name: DATA02
        type: integer
        description: Adjustment target low byte (FFh pairs with 96h)
      - name: DATA03
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request_037
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_info_request_037_3
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_info_request_037_4
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lamp selector (00h=Lamp 1,01h=Lamp 2 - Lamp 2 only on two-lamp models)
      - name: DATA02
        type: integer
        description: Content (01h=usage time seconds,04h=remaining life %)

  - id: carbon_savings_info_request_037_6
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=Total Carbon Savings,01h=Carbon Savings during operation

  - id: remote_key_code_050
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (WORD type); see Key code list (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)
      - name: DATA02
        type: integer
        description: Key code high byte (00h for all listed keys)

  - id: shutter_close_051
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open_052
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control_053
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (06h=Periphery Focus)
      - name: DATA02
        type: integer
        description: Drive content (00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=plus,81h=minus,FDh=-0.25s,FEh=-0.5s,FFh=-1s)

  - id: lens_control_request_053_1
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (matches DATA01 of LENS CONTROL 053)

  - id: lens_control_2_053_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (FFh=Stop)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute,02h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control_053_3
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MOVE,01h=STORE,02h=RESET

  - id: reference_lens_memory_control_053_4
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MOVE,01h=STORE,02h=RESET

  - id: lens_memory_option_request_053_5
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=LOAD BY SIGNAL,01h=FORCED MUTE

  - id: lens_memory_option_set_053_6
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=LOAD BY SIGNAL,01h=FORCED MUTE
      - name: DATA02
        type: integer
        description: Setting value (00h=OFF,01h=ON)

  - id: lens_information_request_053_7
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set_053_10
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Profile number (00h=Profile 1,01h=Profile 2)

  - id: lens_profile_request_053_11
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_060_1
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjusted value name (00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST)

  - id: setting_request_078_1
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request_078_2
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request_078_3
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request_078_4
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request_078_5
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request_078_6
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control_079
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 01h=freeze on,02h=freeze off

  - id: information_string_request_084
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Information type (03h=Horizontal sync frequency,04h=Vertical sync frequency)

  - id: eco_mode_request_097_8
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request_097_45
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_097_155
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbypicture_request_097_198
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3

  - id: edge_blending_mode_request_097_243_1
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set_098_8
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the eco mode; see Appendix Supplementary Information by Command

  - id: lan_projector_name_set_098_45
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: name_bytes
        type: string
        description: Projector name (DATA01-16, up to 16 bytes)

  - id: pip_pbypicture_set_098_198
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3
      - name: DATA02
        type: integer
        description: Setting value (MODE: 00h=PIP,01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; SUB INPUT: see Appendix)

  - id: edge_blending_mode_set_098_243_1
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Setting value (00h=OFF,01h=ON)

  - id: base_model_type_request_305_1
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request_305_2
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request_305_3
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set_319_10
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal; see Appendix Supplementary Information by Command
      - name: DATA02
        type: integer
        description: Setting value (00h=terminal in DATA01,01h=BNC,02h=COMPUTER)
```

## Feedbacks
```yaml
# All queries return binary frames; response ACK byte distinguishes success (2xh) from error (Axh with ERR1/ERR2)
feedbacks:
  - id: power_state
    type: enum
    source_query: running_status_request_078_2
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    description: DATA03 of 078-2 response (00h=Standby, 01h=Power on; also 06h=Standby error, 0Fh=Standby power saving, 10h=Network standby)

  - id: picture_mute_state
    type: enum
    source_query: mute_status_request_078_4
    values: [off, on]

  - id: sound_mute_state
    type: enum
    source_query: mute_status_request_078_4
    values: [off, on]

  - id: onscreen_mute_state
    type: enum
    source_query: mute_status_request_078_4
    values: [off, on]

  - id: freeze_state
    type: enum
    source_query: basic_information_request_305_3
    values: [off, on]

  - id: error_status
    type: bitmask
    source_query: error_status_request_009
    description: DATA01-12 bitfield of projector errors (cover, fan, temperature, lamp, formatter, mirror cover, iris, interlock, etc.)

  - id: cover_status
    type: enum
    source_query: cover_status_request_078_6
    values: [normal_opened, closed]

  - id: lamp_usage_seconds
    type: integer
    source_query: lamp_info_request_037_4

  - id: lamp_remaining_life_percent
    type: integer
    source_query: lamp_info_request_037_4

  - id: filter_usage_seconds
    type: integer
    source_query: filter_usage_info_request_037_3
```

## Variables
```yaml
# Settable non-discrete parameters exposed by status queries.
variables:
  - id: volume_level
    type: integer
    description: Sound volume (adjustable via volume_adjust_030_2; queried via gain_parameter_request_060_1 with DATA01=05h)
    # UNRESOLVED: min/max range not fixed in source - returned per-device by GAIN PARAMETER REQUEST 3

  - id: brightness_level
    type: integer
    description: Picture brightness (picture_adjust_030_1 DATA01=00h)
    # UNRESOLVED: range device-dependent

  - id: contrast_level
    type: integer
    description: Picture contrast (picture_adjust_030_1 DATA01=01h)
    # UNRESOLVED: range device-dependent

  - id: sharpness_level
    type: integer
    description: Picture sharpness (picture_adjust_030_1 DATA01=04h)

  - id: lamp_adjust_level
    type: integer
    description: LAMP ADJUST / LIGHT ADJUST (other_adjust_030_15 DATA01=96h)
```

## Events
```yaml
# Source documents no unsolicited notifications. Device only responds to commands.
# UNRESOLVED: no async event mechanism documented
```

## Macros
```yaml
# Source documents no named multi-step sequences.
# UNRESOLVED: no macro support documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (informational, not populating as safety interlocks because
# source does not call them out as such):
#   - During POWER ON (015) no other command accepted while turning on.
#   - During POWER OFF (016) no other command accepted during cool-down.
#   - 053 LENS CONTROL: continuous drive (7Fh/81h) must be explicitly stopped (00h).
# <!-- UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements -->
```

## Notes
- **Binary framing**: all commands/responses are hex byte streams. Request frame opcodes start with `00h`-`03h`; success responses echo with the high nibble bumped to `2xh`; error responses use `Axh` and carry ERR1/ERR2. ACK byte pattern: command byte + `20h` for OK, + `A0h` for error.
- **Checksum (CKS)**: low-order byte of the sum of all preceding bytes in the frame (example in source: `20h+81h+01h+60h+01h+00h = 103h` → CKS=`03h`).
- **ID1 (Control ID)**: set on projector; must match command. Default not stated.
- **ID2 (Model code)**: varies by model; returned in responses.
- **Dual lamp models only**: `037-4` DATA01=01h (Lamp 2) valid only on two-lamp projectors.
- **Time updates**: lamp/filter usage times are 1-second resolution but refresh at 1-minute intervals.
- **Picture/Sound mute auto-off**: input switch, signal switch, or volume adjustment cancels relevant mute.
- **Appendix referenced but not included in this source**: input terminal codes, aspect values, base model type codes, sub-input values, eco-mode values, selection signal types. Marked UNRESOLVED per command.
- Source: `BDT140013 Revision 7.1` Projector Control Command Reference Manual.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source — input terminal / aspect / eco mode / base model type / sub-input enumerations incomplete -->
<!-- UNRESOLVED: default control ID (ID1) not stated -->
<!-- UNRESOLVED: default model code (ID2) not stated -->
<!-- UNRESOLVED: command inter-byte timing / inter-command delay not stated -->
<!-- UNRESOLVED: LAN response framing identical to serial not explicitly confirmed in source -->
````

Spec done. 53 actions (all command rows enumerated). Both serial + TCP protocols. Port 7142, baud rate unresolved (multiple listed). No auth (inferred). Appendix values left unresolved per command.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:44:52.233Z
last_checked_at: 2026-06-18T08:03:41.515Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:03:41.515Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default baud rate not stated in source (multiple listed)"
- "control ID (ID1) default value not stated in source"
- "source lists 115200/38400/19200/9600/4800 bps; default not stated"
- "flow control not stated; full-duplex mode stated"
- "min/max range not fixed in source - returned per-device by GAIN PARAMETER REQUEST 3"
- "range device-dependent"
- "no async event mechanism documented"
- "no macro support documented"
- "source contains no explicit safety warnings, interlock procedures,"
- "Appendix \"Supplementary Information by Command\" not included in source — input terminal / aspect / eco mode / base model type / sub-input enumerations incomplete"
- "default control ID (ID1) not stated"
- "default model code (ID2) not stated"
- "command inter-byte timing / inter-command delay not stated"
- "LAN response framing identical to serial not explicitly confirmed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
