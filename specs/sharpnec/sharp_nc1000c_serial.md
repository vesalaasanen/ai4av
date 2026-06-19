---
spec_id: admin/sharp-nec-nc1000c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC1000C Control Spec"
manufacturer: Sharp/NEC
model_family: NC1000C
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC1000C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:21:04.129Z
last_checked_at: 2026-06-18T08:32:16.439Z
generated_at: 2026-06-18T08:32:16.439Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name confirmed from input only, not from the source text itself (manual is generic across models). Firmware version compatibility not stated."
  - "source states \"Full duplex\" communication mode but no flow-control line specified"
  - "no event/notification section in source"
  - "no multi-step sequences documented in source"
  - "firmware version compatibility not stated in source."
  - "full enumeration of input-terminal bytes, aspect values, eco-mode values, and sub-input values deferred to manual's Appendix 'Supplementary Information by Command', which is not included in the refined source."
  - "default baud rate not stated (only the supported set)."
  - "ID2 model code value for NC1000C not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:32:16.439Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC1000C Control Spec

## Summary
Sharp/NEC NC1000C projector, controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP). Binary framed command protocol with 1-byte checksum. This spec covers the command reference manual BDT140013 Rev 7.1 (power, input, mute, picture/volume/aspect adjust, lens control + memory, status queries, eco/PIP/edge-blend/audio set, information requests).

<!-- UNRESOLVED: model name confirmed from input only, not from the source text itself (manual is generic across models). Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but no flow-control line specified
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # POWER ON / POWER OFF present
  - queryable     # extensive status / information requests
  - levelable     # picture, volume, lamp/light gain adjust
  - routable      # INPUT SW CHANGE
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: During power-off (including cooling time), no other command accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: string
        description: "Input terminal byte (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full value list."
    notes: "Response DATA01=FFh means ended with error (no signal switch made)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: Turned off on input/video switch.

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
    notes: Turned off on input/video switch or volume adjust.

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
    notes: Turned off on input/video switch.

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: enum
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: "Example set brightness to 10: 03 10 00 00 05 00 FF 00 0A 00 21. Example set brightness to -10: 03 10 00 00 05 00 FF 00 F6 FF 0C."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: enum
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: "Example set volume to 10: 03 10 00 00 05 05 00 00 0A 00 27."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {value} 00 {checksum}"
    params:
      - name: value
        type: string
        description: "Aspect value byte. See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target_lo
        type: string
        description: "Adjustment target low byte (96h=LAMP ADJUST/LIGHT ADJUST, paired with FFh in target_hi)"
      - name: target_hi
        type: string
        description: "Adjustment target high byte (FFh with DATA01=96h)"
      - name: mode
        type: enum
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Usage time updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: enum
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: enum
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    notes: "Example get lamp usage time: 03 96 00 00 02 00 01 9C. Negative remaining life returned if replacement deadline exceeded. Reflects eco mode if enabled."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {code_lo} {code_hi} {checksum}"
    params:
      - name: code_lo
        type: string
        description: "Key code low byte (see key code list)"
      - name: code_hi
        type: string
        description: "Key code high byte (always 00h in listed codes)"
    notes: "Key code list (code, DATA01, DATA02, name): 2/02/00 POWER ON, 3/03/00 POWER OFF, 5/05/00 AUTO, 6/06/00 MENU, 7/07/00 UP, 8/08/00 DOWN, 9/09/00 RIGHT, 10/0A/00 LEFT, 11/0B/00 ENTER, 12/0C/00 EXIT, 13/0D/00 HELP, 15/0F/00 MAGNIFY UP, 16/10/00 MAGNIFY DOWN, 19/13/00 MUTE, 41/29/00 PICTURE, 75/4B/00 COMPUTER1, 76/4C/00 COMPUTER2, 79/4F/00 VIDEO1, 81/51/00 S-VIDEO1, 132/84/00 VOLUME UP, 133/85/00 VOLUME DOWN, 138/8A/00 FREEZE, 163/A3/00 ASPECT, 215/D7/00 SOURCE, 238/EE/00 LAMP MODE/ECO. Example AUTO: 02 0F 00 00 02 05 00 18."

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
    command: "02 18 00 00 02 {target} {content} {checksum}"
    params:
      - name: target
        type: string
        description: "Lens target (06h=Periphery Focus)"
      - name: content
        type: enum
        description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens may be re-commanded without stop while driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: string
        description: Lens target byte
    notes: "Returns upper/lower adjustment limits and current value (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: string
        description: "Lens target (FFh=Stop)"
      - name: mode
        type: enum
        description: "00h=absolute value, 02h=relative value"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: If target=FFh (Stop), mode/value ignored.

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile number set by LENS PROFILE SET (053-10).

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns setting value 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: enum
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: "Returns profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {name} 00 00 {checksum}"
    params:
      - name: name
        type: enum
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: "Example get brightness: 03 05 00 00 03 00 00 00 0B. Returns status, upper/lower limits, default, current, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types, test pattern, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []
    notes: Returns model name string (DATA01-32, NUL-terminated).

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Returns mirror/lens cover status (00h=Normal/opened, 01h=Cover closed)."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 {value} {checksum}"
    params:
      - name: value
        type: enum
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {type} 01 {checksum}"
    params:
      - name: type
        type: enum
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    notes: Returns label/info string (NUL-terminated).

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns eco mode value (Light mode / Lamp mode depending on projector). Values in Appendix."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []
    notes: Returns projector name string (DATA01-17, NUL-terminated).

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: Returns MAC address (6 bytes).

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {item} {checksum}"
    params:
      - name: item
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "Returns setting value (00h=OFF, 01h=ON)."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: string
        description: "Eco mode value. See Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {name_01-16} 00 {checksum}"
    params:
      - name: name_01-16
        type: string
        description: Projector name bytes (up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {item} {value} {checksum}"
    params:
      - name: item
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: string
        description: "Setting value (MODE: 00h=PIP/01h=PBP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub-input values per Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11, NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []
    notes: Returns serial number string (DATA01-16, NUL-terminated).

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 {input} {value} {checksum}"
    params:
      - name: input
        type: string
        description: "Input terminal byte. See Appendix 'Supplementary Information by Command'."
      - name: value
        type: enum
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: enum
    description: "Ack framing. Success responses begin 2Xh (class byte = command byte | 20h); error responses begin A_Xh and carry ERR1/ERR2."
  - id: error_status
    type: bitfield
    description: "DATA01-12 bitfield from ERROR STATUS REQUEST (009). Bits encode cover/fan/temperature/power/lamp/formatter/mirror-cover/ballast/iris/lens/interlock errors."
```

## Variables
```yaml
variables:
  - id: brightness
    description: "PICTURE ADJUST target 00h (absolute/relative, 16-bit signed)"
  - id: contrast
    description: "PICTURE ADJUST target 01h"
  - id: color
    description: "PICTURE ADJUST target 02h"
  - id: hue
    description: "PICTURE ADJUST target 03h"
  - id: sharpness
    description: "PICTURE ADJUST target 04h"
  - id: volume
    description: "VOLUME ADJUST (absolute/relative, 16-bit signed)"
  - id: lamp_light_adjust
    description: "OTHER ADJUST target 96h/FFh"
  - id: lens_profile
    description: "Reference lens memory profile (Profile 1 / Profile 2)"
```

## Events
```yaml
# Source documents no unsolicited notifications; all data returned in response to commands.
# UNRESOLVED: no event/notification section in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational interlocks (not safety interlocks):
#   - POWER ON: while turning on, no other command accepted.
#   - POWER OFF: during power-off incl. cooling time, no other command accepted.
#   - LENS CONTROL: continuous drive (7Fh/81h) must be stopped with 00h.
# No electrical/voltage/interlock safety procedures documented.
```

## Notes
- Command framing: `20h 88h <ID1> <ID2> <LEN> <DATA...> <CKS>` for queries; commands sent by host omit the leading 20h/ID1/ID2 framing shown for responses — the actual command bytes are the short hex strings listed above (e.g. POWER ON = `02 00 00 00 00 02`).
- Checksum (CKS): sum of all preceding bytes, low-order one byte. Example: `20+81+01+60+01+00 = 103h → CKS=03h`.
- ID1 = projector Control ID; ID2 = model code (varies by model).
- Response class bytes: success = command byte OR 20h (e.g. 02h→22h, 03h→23h, 00h→20h, 01h→21h); error = command byte OR A0h (e.g. 02h→A2h).
- Error codes (ERR1/ERR2) documented in §2.4; common ones include 00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 02h/0Dh power off, 02h/0Eh execution failed, 02h/0Fh no authority.
- Serial cable is cross (null-modem); PC CONTROL port is D-SUB 9P. LAN port is RJ-45 (10/100 Mbps auto).
- Baud rate selectable across 4800/9600/19200/38400/115200; default not stated in source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full enumeration of input-terminal bytes, aspect values, eco-mode values, and sub-input values deferred to manual's Appendix 'Supplementary Information by Command', which is not included in the refined source. -->
<!-- UNRESOLVED: default baud rate not stated (only the supported set). -->
<!-- UNRESOLVED: ID2 model code value for NC1000C not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:21:04.129Z
last_checked_at: 2026-06-18T08:32:16.439Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:32:16.439Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name confirmed from input only, not from the source text itself (manual is generic across models). Firmware version compatibility not stated."
- "source states \"Full duplex\" communication mode but no flow-control line specified"
- "no event/notification section in source"
- "no multi-step sequences documented in source"
- "firmware version compatibility not stated in source."
- "full enumeration of input-terminal bytes, aspect values, eco-mode values, and sub-input values deferred to manual's Appendix 'Supplementary Information by Command', which is not included in the refined source."
- "default baud rate not stated (only the supported set)."
- "ID2 model code value for NC1000C not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
