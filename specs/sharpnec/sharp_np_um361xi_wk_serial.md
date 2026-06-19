---
spec_id: admin/sharp-nec-np-um361xi-wk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP Um361Xi Wk Control Spec"
manufacturer: Sharp/NEC
model_family: "NP Um361Xi Wk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP Um361Xi Wk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:57:40.201Z
last_checked_at: 2026-06-18T08:56:41.522Z
generated_at: 2026-06-18T08:56:41.522Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value enums (Appendix \"Supplementary Information"
  - "not explicitly stated (RTS/CTS pins present, full-duplex mode stated)"
  - "enum in Appendix not present in source\""
  - "no dedicated safety/interlock section in source."
  - "Appendix \"Supplementary Information by Command\" not in source"
  - "flow_control not explicitly stated (RTS/CTS pins wired, full-duplex stated)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:56:41.522Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP Um361Xi Wk Control Spec

## Summary
Sharp/NEC NP Um361Xi Wk projector controlled via RS-232C serial or TCP/IP LAN
(wired/wireless). Binary hex-frame protocol with a trailing checksum byte (low
byte of sum of all preceding bytes). This spec covers the command catalogue from
the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: input-terminal value enums (Appendix "Supplementary Information
by Command") not present in source. Eco-mode value enums also in that appendix.
flow_control not explicitly stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # bps, all supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not explicitly stated (RTS/CTS pins present, full-duplex mode stated)
  duplex: full
addressing:
  port: 7142  # TCP, stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
# Frame format: <CMD bytes> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Checksum = low-order one byte of sum of all preceding bytes.
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: picture/volume/lamp adjust commands present
  - routable     # inferred: INPUT SW CHANGE command present
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
    notes: "No other command accepted while power-on is in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (incl. cooling time)."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal byte. Example 06h = video port. Full enum: # UNRESOLVED (Appendix not in source)"

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
        type: integer
        description: "Adjustment target: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Value low 8 bits"
      - name: DATA04
        type: integer
        description: "Value high 8 bits"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Value low 8 bits"
      - name: DATA03
        type: integer
        description: "Value high 8 bits"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. # UNRESOLVED: enum in Appendix not present in source"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "96h = LAMP/LIGHT ADJUST (DATA02=FFh)"
      - name: DATA02
        type: integer
        description: "FFh when DATA01=96h"
      - name: DATA03
        type: integer
        description: "Mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Value low 8 bits"
      - name: DATA05
        type: integer
        description: "Value high 8 bits"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (s), filter usage time (s)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "01h=usage time(s), 04h=remaining life(%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total, 01h=during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Examples: 02h=POWER ON,03h=POWER OFF,05h=AUTO,06h=MENU,07h=UP,08h=DOWN,09h=RIGHT,0Ah=LEFT,0Bh=ENTER,0Ch=EXIT,0Dh=HELP,0Fh=MAGNIFY UP,10h=MAGNIFY DOWN,13h=MUTE,29h=PICTURE,4Bh=COMPUTER1,4Ch=COMPUTER2,4Fh=VIDEO1,51h=S-VIDEO1,84h=VOLUME UP,85h=VOLUME DOWN,8Ah=FREEZE,A3h=ASPECT,D7h=SOURCE,EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for listed codes)"

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
        description: "06h = Periphery Focus"
      - name: DATA02
        type: integer
        description: "00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+continuous,81h=-continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens axis target (see 053 DATA01)"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens axis (FFh=Stop)"
      - name: DATA02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Value low 8 bits"
      - name: DATA04
        type: integer
        description: "Value high 8 bits"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET (acts on profile from 053-10)"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "DATA01 bitfield: lens memory/zoom/focus/shift(H/V) operation state."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
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
        type: integer
        description: "00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile/timer function."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "DATA03 power, DATA04 cooling, DATA05 power-on/off proc, DATA06 op status."

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
    notes: "DATA01: 00h=normal(open), 01h=closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "03h=horizontal sync freq, 04h=vertical sync freq"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Eco/Light/Lamp mode value enum: # UNRESOLVED (Appendix not in source)"

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
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. # UNRESOLVED: enum in Appendix not present in source"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (NUL terminated)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Value (MODE: 00h=PIP/01h=PiP-by-PiP; POS: 00h-03h corners; sub-input: # UNRESOLVED Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
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

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. # UNRESOLVED: enum in Appendix not present in source"
      - name: DATA02
        type: integer
        description: "00h=terminal-specified, 01h=BNC"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: enum
    description: "Per-command success/failure ack frame."
    values: [success, error]
    notes: "Success frame prefix: 2Xh (X=cmd group). Error frame prefix A Xh with <ERR1> <ERR2>."
  - id: error_status_bitfield
    type: bitfield
    description: "009 response DATA01-12 error flags (bit=1 => error)."
  - id: running_status
    type: composite
    description: "078-2 response: power/cooling/operation-status bytes."
  - id: mute_status
    type: composite
    description: "078-4 response: picture/sound/onscreen/forced-onscreen mute bytes."
  - id: input_status
    type: composite
    description: "078-3 response: signal switch, list number, signal type."
```

## Variables
```yaml
variables:
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From 037/037-4; updated at 1-min intervals."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From 037/037-3."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From 037-4 (DATA02=04h); negative if past replacement deadline."
  - id: carbon_savings
    type: number
    unit: kg
    description: "From 037-6; kg (DATA02-05) + mg (DATA06-09)."
  - id: projector_name
    type: string
    description: "LAN projector name (097-45 / set via 098-45)."
  - id: eco_mode
    type: integer
    description: "097-8 value; enum # UNRESOLVED (Appendix)."
```

## Events
```yaml
# No unsolicited notifications documented in source. Responses are command-driven only.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # blocks all other commands during cool-down
  - power_on   # blocks all other commands during warm-up
interlocks: []
notes: >
  Source notes power-on/off block other commands during transitions. No explicit
  safety interlock procedure, voltage/current specs, or fault-recovery sequences
  are documented in this command reference.
# UNRESOLVED: no dedicated safety/interlock section in source.
```

## Notes
- All commands/responses are hex byte frames terminated by a checksum byte
  (`<CKS>`), computed as the low-order one byte of the sum of all preceding
  bytes (see source example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- Frame structure: `<CMD1> <CMD2> <ID1> <ID2> <LEN> <DATA...> <CKS>`. `ID1` is
  the projector's control ID; `ID2` is the model code.
- Success response prefixes mirror command group (`2Xh`); error response uses
  `A Xh` with `<ERR1> <ERR2>`. See source error code table (ERR1/ERR2 combos).
- Lamp/filter usage times update at one-minute intervals despite one-second
  resolution.
- For two-lamp models, lamp 2 (`DATA01=01h`) is valid in 037-4.
- Input terminal enums, eco-mode enums, and sub-input enums reference an
  Appendix ("Supplementary Information by Command") not present in this source.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source
— affects input terminal, eco mode, aspect, and sub-input value enums. -->
<!-- UNRESOLVED: flow_control not explicitly stated (RTS/CTS pins wired, full-duplex stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
````

Spec done. 53 actions = every source row. Serial+TCP both populated. CKS frame + checksum rule in Transport/Notes. Enums missing (Appendix not in source) marked UNRESOLVED, no fabrication.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:57:40.201Z
last_checked_at: 2026-06-18T08:56:41.522Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:56:41.522Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value enums (Appendix \"Supplementary Information"
- "not explicitly stated (RTS/CTS pins present, full-duplex mode stated)"
- "enum in Appendix not present in source\""
- "no dedicated safety/interlock section in source."
- "Appendix \"Supplementary Information by Command\" not in source"
- "flow_control not explicitly stated (RTS/CTS pins wired, full-duplex stated)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
