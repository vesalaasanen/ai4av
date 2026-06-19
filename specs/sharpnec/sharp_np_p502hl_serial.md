---
spec_id: admin/sharp-nec-np-p502hl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P502HL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P502HL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P502HL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:20:04.480Z
last_checked_at: 2026-06-18T08:48:57.783Z
generated_at: 2026-06-18T08:48:57.783Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table (DATA01 of 018/319-10), eco-mode value table, base-model-type value table, sub-input value table, and aspect value table are referenced as \"Supplementary Information by Command\" appendix which is not present in the refined source."
  - "data02 meaning for OTHER ADJUST not clearly enumerated beyond LAMP row"
  - "absolute adjustment ranges (upper/lower/default) are returned"
  - "source describes no unsolicited notifications; all responses are"
  - "source describes no multi-step sequences. Remove if not applicable."
  - "source states no external interlock sequencing or voltage/power"
  - "firmware version compatibility not stated in source"
  - "default baud rate not designated by source (only the option set)"
  - "appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source"
  - "030-15 OTHER ADJUST DATA02 column not clearly enumerated beyond the LAMP ADJUST row"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:48:57.783Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P502HL Control Spec

## Summary
Sharp/NEC NP P502HL projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control per the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are binary hex frames with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). The spec enumerates power, mute, input switching, lens, picture/volume adjust, lamp/filter/carbon-savings information, status queries, and LAN/PIP/edge-blending configuration commands.

<!-- UNRESOLVED: input-terminal value table (DATA01 of 018/319-10), eco-mode value table, base-model-type value table, sub-input value table, and aspect value table are referenced as "Supplementary Information by Command" appendix which is not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; pick per device config
  # baud_rate_options: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex per source; no hardware flow control stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # 015 POWER ON / 016 POWER OFF present
- routable     # 018 INPUT SW CHANGE present
- levelable    # 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST present
- queryable    # many *REQUEST commands returning values present
```

## Actions
```yaml
# All command payloads verbatim from source (hex frames incl. checksum byte).
# Response frames carry <ID1> <ID2> (control ID + model code); command frames as
# documented do not include ID bytes. <CKS> = checksum = low 8 bits of sum of
# preceding bytes. Unparameterized commands show the full literal frame.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Input terminal value (e.g. 06h = video port); full table in "Supplementary Information by Command" appendix

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
    - name: data02
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: data03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: data02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Aspect value; full table in "Supplementary Information by Command" appendix

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target; 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "0"  # UNRESOLVED: data02 meaning for OTHER ADJUST not clearly enumerated beyond LAMP row
    - name: data03
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: data04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data05
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Lamp selector (00h Lamp 1, 01h Lamp 2; Lamp 2 only on two-lamp models)
    - name: data02
      type: integer
      description: Content (01h lamp usage time seconds, 04h lamp remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Content (00h Total Carbon Savings, 01h Carbon Savings during operation)

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
    - name: data01
      type: integer
      description: "Target; 06h = Periphery Focus"
    - name: data02
      type: integer
      description: "Content (00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive + continuous, 81h drive - continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s)"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Target lens axis

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target (FFh = Stop)"
    - name: data02
      type: integer
      description: Adjustment mode (00h absolute, 02h relative)
    - name: data03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: data04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: data02
      type: integer
      description: Setting value (00h OFF, 01h ON)

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Profile number (00h Profile 1, 01h Profile 2)

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
    - name: data01
      type: integer
      description: "Adjusted value name (00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST)"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

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

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Operation (01h freeze on, 02h freeze off)

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00 <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

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

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Item (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

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
    - name: data01
      type: integer
      description: Eco mode value; full table in "Supplementary Information by Command" appendix

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name bytes (DATA01-DATA16, up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Item (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub-input values per appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Setting value (00h OFF, 01h ON)

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

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Input terminal; values in "Supplementary Information by Command" appendix
    - name: data02
      type: integer
      description: "Setting value (00h = terminal specified in DATA01, 01h BNC, 02h COMPUTER)"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error info (DATA01-DATA12) from 009 response; bit=1 means error

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: From 078-2 DATA03/DATA06 and 305-3 DATA01

- id: input_signal_state
  type: composite
  description: Input signal status from 078-3 (signal type 1/2, signal list number, content)

- id: mute_state
  type: composite
  description: 078-4 returns picture mute, sound mute, onscreen mute, forced onscreen mute, OSD

- id: cover_state
  type: enum
  values: [normal_open, closed]
  description: 078-6 mirror/lens cover status

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: 037-4 lamp usage; updated at 1-minute intervals

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: 037-4 lamp remaining life; negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  description: 037-3 filter usage time; -1 if undefined

- id: carbon_savings
  type: composite
  description: 037-6 returns kg (DATA02-05) and mg (DATA06-09) components

- id: lens_operation_status
  type: bitmask
  description: 053-7 lens memory/zoom/focus/lens-shift-H/lens-shift-V operation bits

- id: eco_mode
  type: enum
  description: 097-8 returns eco/light/lamp mode; value table in appendix

- id: edge_blending_mode
  type: enum
  values: ["off", "on"]

- id: mac_address
  type: string
  description: 097-155 returns 6-byte MAC

- id: projector_name
  type: string
  description: 097-45 returns up to 17-byte NUL-terminated name
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume (set via 030-2, read via 060-1 data01=05h)
- id: picture_brightness
  type: integer
  description: Picture brightness (030-1 data01=00h / 060-1 data01=00h)
- id: picture_contrast
  type: integer
  description: Picture contrast (030-1 data01=01h / 060-1 data01=01h)
- id: picture_color
  type: integer
  description: Picture color (030-1 data01=02h / 060-1 data01=02h)
- id: picture_hue
  type: integer
  description: Picture hue (030-1 data01=03h / 060-1 data01=03h)
- id: picture_sharpness
  type: integer
  description: Picture sharpness (030-1 data01=04h / 060-1 data01=04h)
- id: lamp_adjust
  type: integer
  description: Lamp/light adjust (030-15 / 060-1 data01=96h)
# UNRESOLVED: absolute adjustment ranges (upper/lower/default) are returned
# dynamically by 060-1 and not statically documented in source.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# replies to commands. Remove section if device emits no async events.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences. Remove if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While power-on is in progress, no other command can be accepted (source 3.2).
  - command: power_off
    note: While power-off (including cooling time) is in progress, no other command can be accepted (source 3.3).
  - command: "*"
    condition: power_off
    note: "Error code 02h 0Dh: command cannot be accepted because power is off."
# UNRESOLVED: source states no external interlock sequencing or voltage/power
# specifications. The interlock-switch-open bit appears in 009 DATA09 bit1 as a
# status flag, not a procedure.
```

## Notes
- Source manual: BDT140013 Revision 7.1.
- All commands are binary hex frames. Final byte is the checksum (CKS) = low-order 8 bits of the sum of all preceding bytes. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum `03h`.
- Command frames in this manual do NOT include ID1 (control ID) / ID2 (model code); those appear only in response frames (`<ID1> <ID2>`). Implementer must substitute the device's configured control ID and model code when parsing responses.
- Error responses use prefix `A?h` (high nibble A) with ERR1/ERR2 codes per source §2.4.
- Several value tables (input terminal, aspect, eco mode, base model type, sub-input) are referenced as the "Supplementary Information by Command" appendix, which is not present in the refined source document.
- Baud rate is selectable from {4800, 9600, 19200, 38400, 115200}; 9600 is recorded as a representative default but the source does not designate a single default.
- Lens continuous drive (`7Fh`/`81h` in 053) must be followed by `00h` to stop.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate not designated by source (only the option set) -->
<!-- UNRESOLVED: appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source -->
<!-- UNRESOLVED: 030-15 OTHER ADJUST DATA02 column not clearly enumerated beyond the LAMP ADJUST row -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:20:04.480Z
last_checked_at: 2026-06-18T08:48:57.783Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:48:57.783Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table (DATA01 of 018/319-10), eco-mode value table, base-model-type value table, sub-input value table, and aspect value table are referenced as \"Supplementary Information by Command\" appendix which is not present in the refined source."
- "data02 meaning for OTHER ADJUST not clearly enumerated beyond LAMP row"
- "absolute adjustment ranges (upper/lower/default) are returned"
- "source describes no unsolicited notifications; all responses are"
- "source describes no multi-step sequences. Remove if not applicable."
- "source states no external interlock sequencing or voltage/power"
- "firmware version compatibility not stated in source"
- "default baud rate not designated by source (only the option set)"
- "appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source"
- "030-15 OTHER ADJUST DATA02 column not clearly enumerated beyond the LAMP ADJUST row"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
