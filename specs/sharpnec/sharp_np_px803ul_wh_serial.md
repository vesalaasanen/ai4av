---
spec_id: admin/sharp-nec-np-px803ul-wh
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PX803UL WH Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PX803UL WH"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PX803UL WH"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:07:04.652Z
last_checked_at: 2026-06-18T08:55:17.269Z
generated_at: 2026-06-18T08:55:17.269Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value codes and eco-mode value codes referenced as Appendix \"Supplementary Information by Command\" — not present in this refined excerpt"
  - "ID2 (model code) value for this specific model not stated in source"
  - "source gives a selectable range, not a single fixed value"
  - "input terminal value list not in excerpt.\""
  - "value list in Appendix not present in excerpt.\""
  - "enum values in Appendix not present in excerpt.\""
  - "device may push status changes, but source documents no event channel."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "ID2 model code for NP PX803UL WH not stated in source"
  - "input terminal value table, eco-mode value table, sub-input value table, base model type value table — all referenced to Appendix not present in excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:55:17.269Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PX803UL WH Control Spec

## Summary
Sharp/NEC NP PX803UL WH large-venue projector. Binary control protocol over RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (port 7142). Manual BDT140013 Rev 7.1 enumerates 53 distinct hex-encoded commands covering power, input switching, mute, picture/volume/aspect/gain adjustment, lens control and memory, information/status queries, remote key emulation, freeze, shutter, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value codes and eco-mode value codes referenced as Appendix "Supplementary Information by Command" — not present in this refined excerpt -->
<!-- UNRESOLVED: ID2 (model code) value for this specific model not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; highest shown
  # UNRESOLVED: source gives a selectable range, not a single fixed value
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states Full duplex but no flow-control field
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF
  - queryable     # inferred: many 078/097/305 status request commands
  - levelable     # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable      # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bit-packed error flags (cover, fan, temp, lamp, formatter, etc.)"

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted during power-on sequence."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during cool-down."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Input terminal value (e.g. 06h = video). See Appendix 'Supplementary Information by Command'."
    notes: "Example payload switches to video (06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. UNRESOLVED: input terminal value list not in excerpt."

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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Value low-order 8 bits"
      - name: DATA04
        type: integer
        description: "Value high-order 8 bits"
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Value low-order 8 bits"
      - name: DATA03
        type: integer
        description: "Value high-order 8 bits"
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Aspect value. UNRESOLVED: value list in Appendix not present in excerpt."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment target - 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: enum
        description: "FFh fixed per source"
      - name: DATA03
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Value low-order 8 bits"
      - name: DATA05
        type: integer
        description: "Value high-order 8 bits"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

  - id: lamp_info_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: enum
        description: "01h=usage time (s), 04h=remaining life (%)"

  - id: carbon_savings_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Key code low byte (see Key code list)"
      - name: DATA02
        type: enum
        description: "Key code high byte"
    notes: "Key code list: POWER ON(02h,00h), POWER OFF(03h,00h), AUTO(05h,00h), MENU(06h,00h), UP(07h,00h), DOWN(08h,00h), RIGHT(09h,00h), LEFT(0Ah,00h), ENTER(0Bh,00h), EXIT(0Ch,00h), HELP(0Dh,00h), MAGNIFY UP(0Fh,00h), MAGNIFY DOWN(10h,00h), MUTE(13h,00h), PICTURE(29h,00h), COMPUTER1(4Bh,00h), COMPUTER2(4Ch,00h), VIDEO1(4Fh,00h), S-VIDEO1(51h,00h), VOLUME UP(84h,00h), VOLUME DOWN(85h,00h), FREEZE(8Ah,00h), ASPECT(A3h,00h), SOURCE(D7h,00h), LAMP MODE/ECO(EEh,00h)"

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
        type: enum
        description: "Target - 06h=Periphery Focus (other targets listed in source)"
      - name: DATA02
        type: enum
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Lens target"
    notes: "Returns upper/lower limit + current value."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Target (FFh=Stop)"
      - name: DATA02
        type: enum
        description: "00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Value low-order 8 bits"
      - name: DATA04
        type: integer
        description: "Value high-order 8 bits"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number selected via 053-10."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Profile 1, 01h=Profile 2"

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
        type: enum
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, profile/timer functions."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power-on process flags, operation status."

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
    notes: "Returns picture/sound/onscreen/forced-onscreen mute state + OSD display flag."

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
        type: enum
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: enum
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

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
        type: enum
        description: "Eco mode value. UNRESOLVED: value list in Appendix not present in excerpt."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: enum
        description: "MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=OFF, 01h=ON"

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
    notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Input terminal value. UNRESOLVED: value list in Appendix not present in excerpt."
      - name: DATA02
        type: enum
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: raw
    description: "Success response frame: first byte 20h/21h/22h/23h with ID1, ID2, LEN, optional DATA, CKS"
  - id: command_error
    type: raw
    description: "Failure response frame: first byte A0h/A1h/A2h/A3h with ID1, ID2, 02h, ERR1, ERR2, CKS. ERR1/ERR2 code table (00h,00h=unrecognized cmd ... 03h,02h=adjustment failed)."
  - id: error_status
    type: bitmap
    description: "DATA01-12 bit-packed error flags: cover/fan/temperature/lamp/formatter/iris/lens errors. 0=normal, 1=error."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    description: "From 078-2 DATA03/06 and 305-3 DATA01."
  - id: input_signal_status
    type: raw
    description: "From 078-3: signal switch flag, list number, type 1/2, test pattern, content displayed."
  - id: mute_status
    type: bitmap
    description: "From 078-4: picture/sound/onscreen/forced-onscreen mute + OSD display."
  - id: cover_status
    type: enum
    values: [normal_open, closed]
  - id: lens_operation_status
    type: bitmap
    description: "From 053-7 DATA01: lens memory / zoom / focus / lens shift H+V running bits."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "Via 030-1 (DATA01=00h) absolute/relative. Query via 060-1."
  - id: contrast
    type: integer
    description: "Via 030-1 (DATA01=01h)."
  - id: color
    type: integer
    description: "Via 030-1 (DATA01=02h)."
  - id: hue
    type: integer
    description: "Via 030-1 (DATA01=03h)."
  - id: sharpness
    type: integer
    description: "Via 030-1 (DATA01=04h)."
  - id: volume
    type: integer
    description: "Via 030-2 (DATA01=05h). Query via 060-1."
  - id: lamp_adjust
    type: integer
    description: "Via 030-15 / 060-1 (DATA01=96h)."
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "Read-only via 037 (DATA83-86) and 037-4 (DATA01=00h, DATA02=01h)."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "Read-only via 037-4 (DATA02=04h). Negative if past replacement deadline."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "Read-only via 037-3 (DATA01-04)."
  - id: projector_name
    type: string
    description: "Via 098-45 (set, max 16 bytes) / 097-45 (get)."
  - id: eco_mode
    type: enum
    description: "Via 098-8 (set) / 097-8 (get). UNRESOLVED: enum values in Appendix not present in excerpt."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Via 098-243-1 (set) / 097-243-1 (get)."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Via 053-10 (set) / 053-11 (get)."
```

## Events
```yaml
# No unsolicited notification frames documented in source. All responses are request/response.
# UNRESOLVED: device may push status changes, but source documents no event channel.
```

## Macros
```yaml
# Source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power-on sequence locks out all other commands until complete (015 POWER ON)."
  - "Power-off / cooling sequence locks out all other commands until complete (016 POWER OFF)."
  - "Lens control: continuous-drive (7Fh / 81h) must be stopped by sending DATA02=00h."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the per-command lockout notes above.
```

## Notes
- Command/response frames use hex notation; first byte identifies direction/type: `0x`-prefixed opcodes are host→projector commands, `2xh` success responses, `Axh` error responses.
- Checksum (CKS) = low byte of sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- ID1 = projector Control ID (configurable). ID2 = model code, varies by model — value for NP PX803UL WH not stated in this excerpt.
- LAN transport: TCP port 7142 (stated explicitly). 10/100 Mbps auto-sensing, IEEE 802.3 / 802.3u.
- Serial: baud selectable among 115200 / 38400 / 19200 / 9600 / 4800 bps; 8N1, full duplex. Highest rate listed in `baud_rate` field — operator must match projector setting.
- "Supplementary Information by Command" appendix (referenced for input terminal, eco-mode, sub-input, base-model-type value tables) is not present in this refined excerpt.
<!-- UNRESOLVED: ID2 model code for NP PX803UL WH not stated in source -->
<!-- UNRESOLVED: input terminal value table, eco-mode value table, sub-input value table, base model type value table — all referenced to Appendix not present in excerpt -->
```

Spec emitted: 53 actions (full source coverage), dual transport, all literal hex payloads verbatim. UNRESOLVED markers for missing appendix value tables + ID2 model code + firmware.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:07:04.652Z
last_checked_at: 2026-06-18T08:55:17.269Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:55:17.269Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value codes and eco-mode value codes referenced as Appendix \"Supplementary Information by Command\" — not present in this refined excerpt"
- "ID2 (model code) value for this specific model not stated in source"
- "source gives a selectable range, not a single fixed value"
- "input terminal value list not in excerpt.\""
- "value list in Appendix not present in excerpt.\""
- "enum values in Appendix not present in excerpt.\""
- "device may push status changes, but source documents no event channel."
- "source contains no explicit safety warnings, interlock procedures, or"
- "ID2 model code for NP PX803UL WH not stated in source"
- "input terminal value table, eco-mode value table, sub-input value table, base model type value table — all referenced to Appendix not present in excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
