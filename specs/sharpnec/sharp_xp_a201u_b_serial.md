---
spec_id: admin/sharp-nec-xp-a201u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A201U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A201U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A201U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:32:27.942Z
last_checked_at: 2026-06-19T07:49:44.068Z
generated_at: 2026-06-19T07:49:44.068Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated in source; varies by model."
  - "control ID (ID1) runtime value set on projector, not stated."
  - "input terminal DATA01 values referenced to \"Supplementary Information by Command\" appendix not present in refined source."
  - "flow control not stated (full duplex noted only)"
  - "appendix not in source).\""
  - "not in source).\""
  - "source documents no unsolicited notifications. Projector returns responses only after commands."
  - "source documents no multi-step macro sequences."
  - "no voltage/current/power specs in source. No explicit power-on sequencing interlock beyond single-command lockout noted above."
  - "which is factory default)."
  - "ID2 (model code) value for Xp A201U B not in source."
  - "default serial baud rate not stated (5 values listed)."
  - "input terminal DATA01 value list (Appendix 'Supplementary Information by Command' not in refined source)."
  - "aspect DATA01 value list (same appendix)."
  - "eco mode DATA01 value list (same appendix)."
  - "base model type value list (same appendix)."
  - "sub input setting value list (same appendix)."
  - "firmware version compatibility not stated."
  - "protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:49:44.068Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source hex sequences with exact correspondence; transport parameters fully supported; source command list confirms one-to-one coverage. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A201U B Control Spec

## Summary
Sharp/NEC Xp A201U B projector control spec. Supports RS-232C serial and wired/wireless LAN (TCP) control via binary command protocol. Source covers power, input switch, mutes, picture/volume/aspect adjust, lens/shutter, freeze, eco mode, edge blending, PiP/PbP, and numerous status-request queries.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source; varies by model. -->
<!-- UNRESOLVED: control ID (ID1) runtime value set on projector, not stated. -->
<!-- UNRESOLVED: input terminal DATA01 values referenced to "Supplementary Information by Command" appendix not present in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (full duplex noted only)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands
  - queryable       # inferred: many REQUEST commands returning values
  - routable        # inferred: INPUT SW CHANGE command
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST commands
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01..DATA12> <CKS>. Bit-packed error info."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video). Full list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
    notes: "Example (video 06h): 02h 03h 00h 00h 02h 01h 06h 0Eh."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Auto-off on input/video signal switch."

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
    notes: "Auto-off on input switch, video switch, or volume adjust."

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
    notes: "Auto-off on input/video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: DATA02
        type: integer
        description: "Mode: 00h absolute, 01h relative."
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA02
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Source shows DATA01-DATA03 as value bytes (low/high); mode byte fixed 00h absolute in template."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix, UNRESOLVED: not in source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (96h = LAMP/LIGHT ADJUST)."
      - name: DATA02
        type: integer
        description: "FFh per source row."
      - name: DATA03
        type: integer
        description: "Mode: 00h absolute, 01h relative."
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp/filter usage time (seconds)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time and filter alarm start time (seconds). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: integer
        description: "Content: 01h usage time (s), 04h remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type, see key code list)."
      - name: DATA02
        type: integer
        description: "Key code high byte."
    notes: "Key code list includes POWER ON (02h 00h), POWER OFF (03h 00h), AUTO (05h 00h), MENU (06h 00h), UP (07h 00h), DOWN (08h 00h), RIGHT (09h 00h), LEFT (0Ah 00h), ENTER (0Bh 00h), EXIT (0Ch 00h), HELP (0Dh 00h), MAGNIFY UP (0Fh 00h), MAGNIFY DOWN (10h 00h), MUTE (13h 00h), PICTURE (29h 00h), COMPUTER1 (4Bh 00h), COMPUTER2 (4Ch 00h), VIDEO1 (4Fh 00h), S-VIDEO1 (51h 00h), VOLUME UP (84h 00h), VOLUME DOWN (85h 00h), FREEZE (8Ah 00h), ASPECT (A3h 00h), SOURCE (D7h 00h), LAMP MODE/ECO (EEh 00h)."

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target. 06h = Periphery Focus (only value listed in source)."
      - name: DATA02
        type: integer
        description: "Action: 00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +cont, 81h -cont, FDh -0.25s, FEh -0.5s, FFh -1s."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (see 053 DATA01)."
    notes: "Returns upper/lower bounds and current value."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (FFh = stop)."
      - name: DATA02
        type: integer
        description: "Mode: 00h absolute, 02h relative."
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."
    notes: "Controls profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: DATA02
        type: integer
        description: "00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns bit-packed lens operation status (lens memory, zoom, focus, shift H/V)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile: 00h Profile 1, 01h Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile number."

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
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h freeze on, 02h freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "03h horizontal sync freq, 04h vertical sync freq."

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
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (see Appendix, UNRESOLVED: not in source)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: projector_name
        type: string
        description: "Projector name, up to 16 bytes (NUL terminated)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: DATA02
        type: integer
        description: "Setting value (mode/position/sub-input per DATA01)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h OFF, 01h ON."

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
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix, UNRESOLVED: not in source)."
      - name: DATA02
        type: integer
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: enum
    values: [success, error]
    notes: "22h/23h prefix = success response. A2h/A3h prefix + ERR1/ERR2 = error. See error code list."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    notes: "From 078-2 DATA03-DATA06 and 305-3 DATA01."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    notes: "From 037 / 037-4. Updated 1-min intervals."

  - id: filter_usage_time
    type: integer
    unit: seconds
    notes: "From 037-3. -1 if undefined."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    notes: "From 037-4 DATA02=04h. Negative if replacement deadline exceeded."

  - id: mute_status
    type: object
    notes: "From 078-4: picture/sound/onscreen/forced-onscreen/onscreen-display each on/off."

  - id: error_status
    type: bitmask
    notes: "From 009. 12-byte bit-packed error info (DATA01-DATA12)."

  - id: model_name
    type: string

  - id: serial_number
    type: string

  - id: mac_address
    type: string
    notes: "From 097-155. 6-byte MAC."

  - id: projector_name
    type: string
    notes: "From 097-45. Up to 17 bytes."

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    notes: "PICTURE ADJUST target 00h."

  - id: contrast
    type: integer
    notes: "PICTURE ADJUST target 01h."

  - id: color
    type: integer
    notes: "PICTURE ADJUST target 02h."

  - id: hue
    type: integer
    notes: "PICTURE ADJUST target 03h."

  - id: sharpness
    type: integer
    notes: "PICTURE ADJUST target 04h."

  - id: volume
    type: integer
    notes: "VOLUME ADJUST (030-2)."

  - id: lamp_light_adjust
    type: integer
    notes: "OTHER ADJUST target 96h."

  - id: eco_mode
    type: integer
    notes: "098-8 set / 097-8 get. Value range UNRESOLVED (appendix not in source)."

  - id: edge_blending_mode
    type: enum
    values: [off, on]

  - id: freeze
    type: enum
    values: [on, off]

  - id: aspect
    type: integer
    notes: "030-12. Enum values UNRESOLVED (appendix not in source)."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Projector returns responses only after commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    notes: "No other command accepted while power-on in progress."
  - command: power_off
    notes: "No other command accepted during power-off (including cooling time)."
  - command: lens_control
    notes: "Send 00h (stop) after 7Fh/81h continuous drive to halt lens."
# UNRESOLVED: no voltage/current/power specs in source. No explicit power-on sequencing interlock beyond single-command lockout noted above.
```

## Notes
- Command format: `{20h..3Fh} {opcode} {ID1} {ID2} {LEN} {DATA...} {CKS}`. First byte encodes direction/type (02h/03h = set command, 22h/23h = success ack, A2h/A3h = error ack, 20h = get response).
- ID1 = control ID set on projector (runtime, not fixed). ID2 = model code (varies by model, UNRESOLVED for this model).
- Checksum (CKS): sum of all preceding bytes, low-order 8 bits.
- Serial baud rate configurable: 115200/38400/19200/9600/4800 bps. Source does not state default; 115200 used as placeholder above (UNRESOLVED: which is factory default).
- TCP port 7142 stated for LAN command send/receive.
- Response errors carried in ERR1/ERR2 (see §2.4 error code list, 24 entries documented in source).
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.

<!-- UNRESOLVED: ID2 (model code) value for Xp A201U B not in source. -->
<!-- UNRESOLVED: default serial baud rate not stated (5 values listed). -->
<!-- UNRESOLVED: input terminal DATA01 value list (Appendix 'Supplementary Information by Command' not in refined source). -->
<!-- UNRESOLVED: aspect DATA01 value list (same appendix). -->
<!-- UNRESOLVED: eco mode DATA01 value list (same appendix). -->
<!-- UNRESOLVED: base model type value list (same appendix). -->
<!-- UNRESOLVED: sub input setting value list (same appendix). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol version not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:32:27.942Z
last_checked_at: 2026-06-19T07:49:44.068Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:49:44.068Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source hex sequences with exact correspondence; transport parameters fully supported; source command list confirms one-to-one coverage. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated in source; varies by model."
- "control ID (ID1) runtime value set on projector, not stated."
- "input terminal DATA01 values referenced to \"Supplementary Information by Command\" appendix not present in refined source."
- "flow control not stated (full duplex noted only)"
- "appendix not in source).\""
- "not in source).\""
- "source documents no unsolicited notifications. Projector returns responses only after commands."
- "source documents no multi-step macro sequences."
- "no voltage/current/power specs in source. No explicit power-on sequencing interlock beyond single-command lockout noted above."
- "which is factory default)."
- "ID2 (model code) value for Xp A201U B not in source."
- "default serial baud rate not stated (5 values listed)."
- "input terminal DATA01 value list (Appendix 'Supplementary Information by Command' not in refined source)."
- "aspect DATA01 value list (same appendix)."
- "eco mode DATA01 value list (same appendix)."
- "base model type value list (same appendix)."
- "sub input setting value list (same appendix)."
- "firmware version compatibility not stated."
- "protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
