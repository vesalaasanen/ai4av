---
spec_id: admin/sharp-nec-ea193mi-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ea193Mi Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "Ea193Mi Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ea193Mi Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:30:59.716Z
last_checked_at: 2026-06-17T19:46:40.786Z
generated_at: 2026-06-17T19:46:40.786Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is generic projector manual, does NOT name \"Ea193Mi Bk\". Ea193Mi is an NEC LCD monitor product line; the source describes a projector with lamp, lens shift, lens memory, shutter — likely wrong/mismatched source artifact for this device. Confirm correct source before publishing."
  - "Firmware version compatibility not stated in source."
  - "ID2 (model code) value per-device not stated."
  - "\"Supplementary Information by Command\" appendix referenced but not present in refined source — many enum value lists (input terminal, aspect, eco mode, base model type, sub input) unavailable."
  - "default baud not stated"
  - "flow control not explicitly stated; \"Full duplex\" communication mode only"
  - "appendix not in refined source.\""
  - "source describes no unsolicited notifications; all responses are command-ack."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "model name \"Ea193Mi Bk\" not in source — source is generic projector manual."
  - "firmware version compatibility not stated."
  - "default baud rate not stated (only supported set)."
  - "flow control not stated."
  - "ID2 model code per device not enumerated."
  - "appendix enum lists (input terminal / aspect / eco mode / base model / sub input) not in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:46:40.786Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched verbatim to source with correct opcodes, parameters, and transport. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ea193Mi Bk Control Spec

## Summary
RS-232C and TCP/LAN control spec for a Sharp/NEC projector. Source is the vendor "Projector Control Command Reference Manual" (BDT140013 rev 7.1), a binary-frame protocol covering power, input switching, mutes, picture/volume/lens adjustments, lens memory, lamp/filter/carbon info queries, and status/setting requests. Transport over serial (RS-232C cross cable, D-SUB 9P) or wired/wireless LAN (TCP port 7142).

<!-- UNRESOLVED: Source is generic projector manual, does NOT name "Ea193Mi Bk". Ea193Mi is an NEC LCD monitor product line; the source describes a projector with lamp, lens shift, lens memory, shutter — likely wrong/mismatched source artifact for this device. Confirm correct source before publishing. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: ID2 (model code) value per-device not stated. -->
<!-- UNRESOLVED: "Supplementary Information by Command" appendix referenced but not present in refined source — many enum value lists (input terminal, aspect, eco mode, base model type, sub input) unavailable. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for send/receive per source §1.2
serial:
  baud_rate: 9600  # source lists supported set: 115200/38400/19200/9600/4800 bps; default not stated, 9600 shown is lowest-supported placeholder - UNRESOLVED: default baud not stated
  supported_baud_rates: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; "Full duplex" communication mode only
  communication_mode: full_duplex
  connector: D-SUB_9P  # PC CONTROL port, cross cable per source pin table
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE, AUDIO SELECT SET present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: PICTURE/VOLUME/LAMP adjust commands present
  - mutable         # inferred: picture/sound/onscreen mute on/off present
```

## Actions
```yaml
# Frame format: commands are hex byte strings; <ID1> = control ID, <ID2> = model
# code (device-specific), <CKS> = checksum (low byte of sum of all preceding bytes).
# All command bytes below are verbatim from source §3.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Returns DATA01-12 bitfield error info (cover/fan/temp/lamp/formatter/etc.)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted during power-on sequence."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h=video port). Full list in 'Supplementary Information by Command' appendix - UNRESOLVED: appendix not in refined source."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: "Cleared on input/video switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02 12 00 00 00 14"
    params: []
    notes: "Cleared on input/video switch or volume adjust."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02 14 00 00 00 16"
    params: []
    notes: "Cleared on input/video switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 {data01} FF {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: "Value low 8 bits"
      - name: data04
        type: integer
        description: "Value high 8 bits"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: "Value low 8 bits"
      - name: data03
        type: integer
        description: "Value high 8 bits"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value byte - list in 'Supplementary Information by Command' appendix - UNRESOLVED: appendix not in refined source."

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
    kind: action
    command: "03 10 00 00 05 {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target high byte (96h for LAMP/LIGHT ADJUST)"
      - name: data02
        type: integer
        description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: data03
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Value low 8 bits"
      - name: data05
        type: integer
        description: "Value high 8 bits"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage sec (DATA83-86), filter usage sec (DATA87-90). Updated 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage sec (DATA01-04), filter alarm start sec (DATA05-08). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=usage sec, 04h=remaining life %"
    notes: "Negative remaining-life % returned if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total, 01h=During operation"
    notes: "Returns kg (DATA02-05) and mg (DATA06-09)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD). E.g. 05h=AUTO, 06h=MENU, 07h=UP, 4Bh=COMPUTER1, 8Ah=FREEZE, D7h=SOURCE, EEh=LAMP MODE/ECO. See full key code list in source §3.19."
      - name: data02
        type: integer
        description: "Key code high byte (00h for all listed codes)"

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02 18 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target (source shows 06h=Periphery Focus)"
      - name: data02
        type: integer
        description: "Action: 00h=stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive plus, 81h=drive minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "After 7Fh/81h send 00h to stop. Same command during drive overrides without stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {data01} 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target"
    notes: "Returns upper/lower range and current value (16-bit)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target (FFh=Stop)"
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: "Value low 8 bits"
      - name: data04
        type: integer
        description: "Value high 8 bits"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns DATA02 setting 00h=OFF / 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitfield: lens memory/zoom/focus/shift(H)/(V) stop-or-operating."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {data01} 00 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns 16-byte block: status, upper/lower/default/current range, wide/narrow adjust width."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Returns power status, cooling/power-on process, operation status (DATA03-06)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch, list number, signal type 1/2, list type, test pattern, content."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display (DATA01-05)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Returns 00h=Normal(opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {data01} 01 {cks}"
    params:
      - name: data01
        type: integer
        description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns Light mode or Lamp mode depending on projector. Values in appendix - UNRESOLVED."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []

  - id: lan_mac_address_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: "Returns MAC address DATA01-06."

  - id: pip_pbypicture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "Returns 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value - list in appendix - UNRESOLVED."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {data01..data16} 00 {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16)"
    notes: "Param name encoded across DATA01-16 + trailing 00h."

  - id: pip_pbypicture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners; sub-input value list in appendix - UNRESOLVED)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Returns base model type + model name (DATA03-11 NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns op status, content displayed, signal type, video/sound/onscreen mute, freeze (DATA01-09)."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal - list in appendix - UNRESOLVED"
      - name: data02
        type: integer
        description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: frame
    description: "Every command returns a response frame. Success: leading byte 20h/21h/22h/23h (mirrors command class) + ID1 ID2 + LEN + data + CKS. Failure: leading byte A0h/A1h/A2h/A3h + ID1 ID2 + 02h + ERR1 ERR2 + CKS."
  - id: error_codes
    type: enum
    description: "ERR1/ERR2 byte pair per source §2.4 error table (00h/00h=unrecognized, 00h/01h=unsupported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 02h/0Dh=power off, 02h/0Eh=exec failed, 02h/0Fh=no authority, etc.)."
```

## Variables
```yaml
# N/A - settable parameters are encoded as DATA bytes inside Actions above.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are command-ack.
```

## Macros
```yaml
# N/A - source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on sequence runs, no other command accepted (source §3.2)."
  - command: power_off
    note: "During power-off incl. cooling time, no other command accepted (source §3.3)."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the per-command 'no other command accepted'
# notes above. Voltage/current/power specs not present in source.
```

## Notes
- **Source/device mismatch (critical):** operator supplied device name "Sharp/NEC Ea193Mi Bk" (an NEC LCD monitor) but the refined source is the generic "Projector Control Command Reference Manual" (BDT140013 rev 7.1) describing a projector with lamp, lens shift, lens memory, and lens shutter. Confirm whether this is the correct source artifact for the Ea193Mi before publishing.
- **Checksum:** CKS = low byte of sum of all preceding bytes (source §2.2 worked example: 20+81+01+60+01+00 = 103h → CKS=03h).
- **Frame parameters:** ID1 = control ID set on projector; ID2 = model code (device-specific, not enumerated in source); LEN = data length following LEN.
- **Response framing:** success response leading byte = command leading byte OR'd with 20h; failure response leading byte = command leading byte OR'd with 20h, plus 80h (i.e. A0h/A1h/A2h/A3h).
- **Appendix missing:** "Supplementary Information by Command" appendix is referenced by multiple commands (input terminal values, aspect values, eco mode values, base model type values, sub input values) but is not present in the refined source — those enum lists are UNRESOLVED.
- **Baud rate:** source lists supported rates 115200/38400/19200/9600/4800 bps but does not state the default/factory rate. `baud_rate: 9600` in Transport is a placeholder from the supported set, not a stated default — UNRESOLVED.

<!-- UNRESOLVED: model name "Ea193Mi Bk" not in source — source is generic projector manual. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: default baud rate not stated (only supported set). -->
<!-- UNRESOLVED: flow control not stated. -->
<!-- UNRESOLVED: ID2 model code per device not enumerated. -->
<!-- UNRESOLVED: appendix enum lists (input terminal / aspect / eco mode / base model / sub input) not in refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:30:59.716Z
last_checked_at: 2026-06-17T19:46:40.786Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:46:40.786Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched verbatim to source with correct opcodes, parameters, and transport. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is generic projector manual, does NOT name \"Ea193Mi Bk\". Ea193Mi is an NEC LCD monitor product line; the source describes a projector with lamp, lens shift, lens memory, shutter — likely wrong/mismatched source artifact for this device. Confirm correct source before publishing."
- "Firmware version compatibility not stated in source."
- "ID2 (model code) value per-device not stated."
- "\"Supplementary Information by Command\" appendix referenced but not present in refined source — many enum value lists (input terminal, aspect, eco mode, base model type, sub input) unavailable."
- "default baud not stated"
- "flow control not explicitly stated; \"Full duplex\" communication mode only"
- "appendix not in refined source.\""
- "source describes no unsolicited notifications; all responses are command-ack."
- "source contains no explicit safety warnings, interlock procedures, or"
- "model name \"Ea193Mi Bk\" not in source — source is generic projector manual."
- "firmware version compatibility not stated."
- "default baud rate not stated (only supported set)."
- "flow control not stated."
- "ID2 model code per device not enumerated."
- "appendix enum lists (input terminal / aspect / eco mode / base model / sub input) not in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
