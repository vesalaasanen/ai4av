---
spec_id: admin/sharp-nec-ld-d121
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld D121 Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Ld D121"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Ld D121"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:44:38.758Z
last_checked_at: 2026-06-17T19:59:51.951Z
generated_at: 2026-06-17T19:59:51.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) covering multiple models; the exact Ld D121 model string is not stated verbatim in the source text. Firmware version compatibility not stated."
  - "flow control not stated in source (source states \"Full duplex\" communication mode only)"
  - "exact value ranges for each adjustable not numerically stated in source (limits returned dynamically by gain_parameter_request_3)."
  - "no unsolicited notification / push events documented in source."
  - "no multi-step command sequences described explicitly in source."
  - "no explicit safety interlock procedures or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:59:51.951Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal source hex codes; transport parameters fully documented; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld D121 Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Binary framed command protocol with per-command hex opcodes, ID1/ID2 framing, and checksum bytes. Covers power, input switching, mutes, lens control/memory, picture/volume/aspect adjust, eco mode, edge blending, PIP/PbP, and a broad set of status queries.

<!-- UNRESOLVED: the source is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) covering multiple models; the exact Ld D121 model string is not stated verbatim in the source text. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (source states "Full duplex" communication mode only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: extensive status request commands present
  - levelable    # inferred: VOLUME ADJUST / PICTURE ADJUST / OTHER ADJUST present
  - routable     # inferred: INPUT SW CHANGE input-switching command present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h  88h  00h  00h  00h  88h"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "02h  00h  00h  00h  00h  02h"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h  01h  00h  00h  00h  03h"
    params: []
    notes: During power-off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal value (see Appendix "Supplementary Information by Command" in source). Example 06h = video port.
    notes: Example full command switching to video port: "02h  03h  00h  00h  02h  01h  06h  0Eh".

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h  10h  00h  00h  00h  12h"
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h  11h  00h  00h  00h  13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h  12h  00h  00h  00h  14h"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h  13h  00h  00h  00h  15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h  14h  00h  00h  00h  16h"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h  15h  00h  00h  00h  17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> - <DATA04>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)
    notes: 'Example set brightness to 10: "03h  10h  00h  00h  05h  00h  FFh  00h  0Ah  00h  21h". Set brightness to -10: "03h  10h  00h  00h  05h  00h  FFh  00h  F6h  FFh  0Ch".'

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> - <DATA03>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: byte
        description: Adjustment value (high-order 8 bits)
    notes: 'Example set volume to 10: "03h  10h  00h  00h  05h  05h  00h  00h  0Ah  00h  27h".'

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Value set for the aspect (see Appendix "Supplementary Information by Command" in source).

  - id: other_adjust
    label: Other Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01> - <DATA05>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target. 96h = LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)."
      - name: DATA02
        type: byte
        description: Adjustment target qualifier (FFh when DATA01=96h).
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request
    kind: query
    command: "03h  8Ah  00h  00h  00h  8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time (DATA83-86), filter usage time (DATA87-90). Updated at 1-minute intervals.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h  95h  00h  00h  00h  98h"
    params: []
    notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h  96h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: 'Example get lamp 1 usage time: "03h  96h  00h  00h  02h  00h  01h  9Ch". Eco mode values reflect eco mode. Negative remaining life if replacement deadline exceeded.'

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Key code low byte (WORD-type key code). See source key code list.
      - name: DATA02
        type: byte
        description: Key code high byte.
    notes: 'Key code list (DATA01/DATA02 → name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example send AUTO: "02h  0Fh  00h  00h  02h  05h  00h  18h".'

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h  16h  00h  00h  00h  18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h  17h  00h  00h  00h  19h"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target. Source documents 06h = Periphery Focus.
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: After 7Fh/81h, send 00h to stop. While lens driven, same command can re-issue without stop.

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target.
    notes: Returns upper/lower limits and current value.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h  1Dh  00h  00h  04h  <DATA01> - <DATA04>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop; otherwise adjustment target."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)
    notes: If DATA01=FFh (Stop), mode/value not referenced.

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile number set via LENS PROFILE SET (053-10).

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h  22h  00h  00h  01h  00h  25h"
    params: []
    notes: Returns per-target operation status bitmap (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h  28h  00h  00h  00h  2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: 'Example get brightness: "03h  05h  00h  00h  03h  00h  00h  00h  0Bh". Returns limits, default, current, wide/narrow adjustment widths.'

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h  85h  00h  00h  01h  00h  86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05).

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  01h  87h"
    params: []
    notes: Returns power status, cooling/power-on process flags, operation status.

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  02h  88h"
    params: []
    notes: Returns signal switch process, signal list number (practical = returned + 1), selection signal types, test pattern, displayed content.

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  03h  89h"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display state.

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h  85h  00h  00h  01h  04h  8Ah"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  05h  8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h  B0h  00h  00h  01h  07h  BBh"
    params: []
    notes: Returns Light mode or Lamp mode value depending on projector.

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h  B0h  00h  00h  01h  2Ch  E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Value set for the eco mode (see Appendix "Supplementary Information by Command" in source).

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16>  00h  <CKS>"
    params:
      - name: DATA01_16
        type: string
        description: Projector name, up to 16 bytes (NUL-terminated).

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h  BFh  00h  00h  01h  00h  C0h"
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h  BFh  00h  00h  01h  02h  C2h"
    params: []
    notes: Returns operation status, displayed content, selection signal types, display signal type, video/sound/onscreen mute, freeze status.

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal (see Appendix "Supplementary Information by Command" in source).
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source_query: running_status_request
    notes: From 078-2 DATA03/DATA06 status bytes.

  - id: error_status
    type: bitmask
    source_query: error_status_request
    notes: 12-byte error bitmap (DATA01-12). Covers cover/fan/temp/power/lamp/ formatter/FPGA/mirror-cover/iris/lens errors. See source error information list.

  - id: input_signal_status
    type: composite
    source_query: input_status_request
    notes: Signal list number, selection signal type 1/2, test pattern, displayed content.

  - id: mute_state
    type: composite
    source_query: mute_status_request
    notes: Picture/sound/onscreen/forced-onscreen mute + OSD display state.

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source_query: lamp_information_request_3
    notes: Updated at 1-minute intervals. Hours = value / 3600.

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source_query: lamp_information_request_3
    notes: Negative if replacement deadline exceeded.

  - id: filter_usage_time
    type: integer
    unit: seconds
    source_query: filter_usage_information_request

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source_query: cover_status_request

  - id: model_name
    type: string
    source_query: model_name_request

  - id: serial_number
    type: string
    source_query: serial_number_request

  - id: mac_address
    type: string
    source_query: lan_mac_address_status_request_2

  - id: projector_name
    type: string
    source_query: lan_projector_name_request

  - id: lens_operation_status
    type: bitmask
    source_query: lens_information_request
    notes: Per-target operation status (lens memory, zoom, focus, lens shift H/V).

  - id: command_error
    type: composite
    notes: Response ERR1/ERR2 pair. See source error code list (00h-03h ranges covering unrecognized command, unsupported, invalid value, memory errors, power-off rejection, authority, gain errors, etc.).
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    adjustable_via: picture_adjust
    notes: Parameterized via DATA01=00h; also readable via gain_parameter_request_3.
  - id: picture_contrast
    type: integer
    adjustable_via: picture_adjust
    notes: DATA01=01h.
  - id: picture_color
    type: integer
    adjustable_via: picture_adjust
    notes: DATA01=02h.
  - id: picture_hue
    type: integer
    adjustable_via: picture_adjust
    notes: DATA01=03h.
  - id: picture_sharpness
    type: integer
    adjustable_via: picture_adjust
    notes: DATA01=04h.
  - id: volume
    type: integer
    adjustable_via: volume_adjust
    notes: Also readable via gain_parameter_request_3 (DATA01=05h).
  - id: lamp_light_adjust
    type: integer
    adjustable_via: other_adjust
    notes: DATA01=96h. Also readable via gain_parameter_request_3 (DATA01=96h).
  # UNRESOLVED: exact value ranges for each adjustable not numerically stated in source (limits returned dynamically by gain_parameter_request_3).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / push events documented in source.
# All status must be polled via the *REQUEST commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on power, no other command can be accepted."
  - command: power_off
    note: "During power-off (including cooling time), no other command can be accepted."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# warnings documented in source. Lock-out behavior during power transitions
# noted above from command descriptions.
```

## Notes
- Binary framed protocol. Commands shown are the controller-to-projector (bare) form; responses return framed with leading byte (20h/21h/22h/23h for success, A0h/A1h/A2h/A3h for error), ID1 (control ID), ID2 (model code), LEN, and trailing CKS checksum.
- Checksum (CKS): sum all preceding bytes, take low-order 8 bits. Worked source example: `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.
- ID1 = projector control ID; ID2 = model code (varies by model).
- Many DATA field enums reference "Appendix - Supplementary Information by Command" which is not present in the refined source excerpt; those enum value lists are therefore UNRESOLVED.
- Usage-time values return in seconds; display as hours via /3600. Updated at 1-minute intervals.
- Both RS-232C serial and LAN (TCP 7142) transports are documented. Serial is cross-cable D-SUB 9P; LAN supports wired (10/100 Mbps auto) and optional wireless LAN unit.

<!-- UNRESOLVED: -->
<!-- - Model "Sharp/NEC Ld D121" not stated verbatim in source; source is generic multi-model manual (BDT140013 Rev 7.1). -->
<!-- - Default baud rate not stated (source lists 5 options). -->
<!-- - Flow control not stated (source states "Full duplex" communication mode only). -->
<!-- - Firmware version compatibility not stated. -->
<!-- - Appendix "Supplementary Information by Command" value tables (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not included in refined source excerpt. -->
<!-- - Voltage / current / power specs not in this control-protocol document. -->
<!-- - Auth: no login procedure documented; assumed none. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:44:38.758Z
last_checked_at: 2026-06-17T19:59:51.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:59:51.951Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal source hex codes; transport parameters fully documented; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) covering multiple models; the exact Ld D121 model string is not stated verbatim in the source text. Firmware version compatibility not stated."
- "flow control not stated in source (source states \"Full duplex\" communication mode only)"
- "exact value ranges for each adjustable not numerically stated in source (limits returned dynamically by gain_parameter_request_3)."
- "no unsolicited notification / push events documented in source."
- "no multi-step command sequences described explicitly in source."
- "no explicit safety interlock procedures or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
