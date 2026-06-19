---
spec_id: admin/sharp-nec-np-u321h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP U321H Control Spec"
manufacturer: Sharp/NEC
model_family: "NP U321H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP U321H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:20:35.182Z
last_checked_at: 2026-06-18T08:55:18.156Z
generated_at: 2026-06-18T08:55:18.156Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this manual is model-generic; command availability for NP U321H specifically is not enumerated in the provided source. Input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an \"Appendix\" not present in the refined source."
  - "flow control not stated in source (source states \"Full duplex\" communication mode only)"
  - "complete input-terminal value list is in the source Appendix, not provided.\""
  - "aspect value list is in the source Appendix, not provided.\""
  - "eco-mode value list in source Appendix, not provided.\""
  - "no separate variable table in source."
  - "no events described in source."
  - "no macros described in source."
  - "source contains no explicit interlock command sequences or"
  - "firmware version compatibility not stated."
  - "auth credentials/token format — none documented, assumed none."
  - "input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables not present in refined source."
  - "command availability specific to NP U321H not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:55:18.156Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP U321H Control Spec

## Summary
Control spec for the Sharp/NEC NP U321H projector, based on the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device is controllable over RS-232C serial and TCP/IP LAN (wired/wireless) using a binary, hex-encoded command frame with a trailing checksum byte. The manual is a shared reference covering multiple NEC projector models; command support varies by model and is flagged in the source's Appendix ("Supplementary Information by Command").

<!-- UNRESOLVED: this manual is model-generic; command availability for NP U321H specifically is not enumerated in the provided source. Input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an "Appendix" not present in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # selectable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (source states "Full duplex" communication mode only)
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable      # inferred: numerous status/information request commands present
  - levelable      # inferred: picture/volume/lamp adjust commands present
  - routable       # inferred: 018 INPUT SW CHANGE command present
```

## Actions
```yaml
# All command bytes are the literal binary frame payloads as written in the source
# (hex notation). Commands that end in a fixed byte already include the computed
# checksum; commands ending in <CKS> require a checksum computed as the low-order
# one byte of the sum of all preceding bytes (see Notes). Frames containing
# <ID1> <ID2> are RESPONSE frames, not command payloads, and are documented in
# the Feedbacks section.

# --- Power ---
- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command is accepted."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off power (including cooling time), no other command is accepted."

# --- Input switching ---
- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (hex). Source example: 06h = video port. Full value table is in the source Appendix 'Supplementary Information by Command' (not present in refined source)."
  notes: "UNRESOLVED: complete input-terminal value list is in the source Appendix, not provided."

# --- Mute ---
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

# --- Adjustments ---
- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value (hex). Value table is in source Appendix (not present in refined source)."
  notes: "UNRESOLVED: aspect value list is in the source Appendix, not provided."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST (DATA02 = FFh)"
    - name: data02
      type: string
      description: "Target low byte (FFh when DATA01=96h)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- Remote key code ---
- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte. Source table: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed keys)"

# --- Shutter ---
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

# --- Lens ---
- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (FFh=Stop, other values per source DATA01 table)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

# --- Freeze ---
- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"

# --- Eco / LAN / PIP / Edge blending set ---
- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco-mode value (hex). Value table in source Appendix (not present)."
  notes: "UNRESOLVED: eco-mode value list in source Appendix, not provided."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated."

- id: pip_pby_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value; depends on DATA01. MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT. Sub-input values in source Appendix (not present)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

# --- Audio select ---
- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal (hex). Value table in source Appendix (not present)."
    - name: data02
      type: string
      description: "00h=audio from terminal in DATA01, 01h=BNC, 02h=COMPUTER"

# --- Queries (kind: query) ---
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens adjustment target (same as 053 LENS CONTROL DATA01)"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pby_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

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
```

## Feedbacks
```yaml
# Response frame format: first byte encodes command class + result.
#   2Xh = success response (no data or with data)
#   AXh = error response: AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# <ID1> = control ID set on projector; <ID2> = model code.
# Success responses with data use the same DATA layout documented per command
# in the Actions section above.

- id: command_ack
  type: enum
  values: [success, error]
  description: "Every command returns a success frame (2Xh) or error frame (AXh with ERR1/ERR2)."

- id: error_status
  type: bitmask
  description: "009 response DATA01-DATA12 error bitfield (cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/etc.). Bit=1 => error."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS REQUEST DATA06 (00h standby, 04h power on, 05h cooling, 06h standby error, 0Fh power saving, 10h network standby)."

- id: mute_state
  type: object
  description: "078-4 response: picture/sound/onscreen/forced-onscreen mute + OSD display flags."

- id: lamp_info
  type: object
  description: "037-4 response: lamp usage time (seconds) / remaining life (%). Negative remaining life if replacement deadline exceeded."

- id: filter_info
  type: object
  description: "037-3 response: filter usage time + filter alarm start time (seconds). -1 if undefined."

- id: error_codes
  type: table
  description: "ERR1/ERR2 pairs (2.4). Examples: 00h/00h=unrecognized command, 00h/01h=not supported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority."
```

## Variables
```yaml
# Settable continuous parameters are driven via the adjust actions above
# (picture/volume/lamp). No additional standalone variables documented.
# UNRESOLVED: no separate variable table in source.
```

## Events
```yaml
# Source describes request/response only; no unsolicited notifications documented.
# UNRESOLVED: no events described in source.
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: no macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: cooling time blocks all other commands after power off
interlocks:
  - id: interlock_switch
    type: status_only
    description: "Error-status DATA09 bit1 = interlock switch open (observable via 009 request); no control sequence documented."
  - id: power_transition_lockout
    type: behavioral
    description: "During power-on and power-off (incl. cooling) the projector accepts no other commands (source: commands 015/016)."
# UNRESOLVED: source contains no explicit interlock command sequences or
# power-on sequencing procedures; only behavioral notes and a status bit.
```

## Notes
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes in the frame. Example from source: `20h+81h+01h+60h+01h+00h = 103h => CKS=03h`.
- **Frame parameters:** `ID1` = projector control ID; `ID2` = model code (varies by model); `LEN` = data length following LEN; `ERR1`/`ERR2` = response error codes (see 2.4).
- **Serial:** RS-232C, full duplex, 8N1, baud selectable 4800–115200. Cross (null-modem) cable on PC CONTROL D-SUB 9P.
- **LAN:** wired RJ-45 (10/100 Auto) or wireless LAN unit; TCP port 7142 for command send/receive.
- **Model-generic manual:** BDT140013 Rev 7.1 is a shared command reference. Per-command support and several value tables (input terminal, aspect, eco mode, base model type, sub-input) live in the source Appendix ("Supplementary Information by Command"), which was not included in the refined source text.
- **Usage-time resolution:** lamp/filter usage times are returned in seconds but updated by the projector at one-minute intervals.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: auth credentials/token format — none documented, assumed none. -->
<!-- UNRESOLVED: input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables not present in refined source. -->
<!-- UNRESOLVED: command availability specific to NP U321H not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:20:35.182Z
last_checked_at: 2026-06-18T08:55:18.156Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:55:18.156Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this manual is model-generic; command availability for NP U321H specifically is not enumerated in the provided source. Input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an \"Appendix\" not present in the refined source."
- "flow control not stated in source (source states \"Full duplex\" communication mode only)"
- "complete input-terminal value list is in the source Appendix, not provided.\""
- "aspect value list is in the source Appendix, not provided.\""
- "eco-mode value list in source Appendix, not provided.\""
- "no separate variable table in source."
- "no events described in source."
- "no macros described in source."
- "source contains no explicit interlock command sequences or"
- "firmware version compatibility not stated."
- "auth credentials/token format — none documented, assumed none."
- "input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables not present in refined source."
- "command availability specific to NP U321H not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
