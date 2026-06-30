---
spec_id: admin/sharp-nec-ld-fe192-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe192 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe192 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe192 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:33:24.959Z
last_checked_at: 2026-06-17T20:07:12.225Z
generated_at: 2026-06-17T20:07:12.225Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compat not stated. Model code (ID2) values not in source — see appendix reference not included. Input terminal DATA01 values, aspect values, eco mode values reference external \"Supplementary Information by Command\" appendix not present in refined source."
  - "not stated (RTS/CTS pins present in pinout)"
  - "appendix not in source.\""
  - "value list in 'Supplementary Information by Command' appendix not in source.\""
  - "no separate unsolicited-notification model documented - all responses are command-triggered."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated in source."
  - "model code (ID2) values not stated — varies by model."
  - "\"Supplementary Information by Command\" appendix referenced but not present in refined source — affects input terminal values, aspect values, eco mode values, sub-input values, base model type values."
  - "serial flow_control not stated (RTS/CTS pins wired in pinout but no handshake mode documented)."
  - "default baud rate among listed options (115200/38400/19200/9600/4800) not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:07:12.225Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands matched verbatim to source; transport params verified; source coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe192 F Control Spec

## Summary
Sharp/NEC Ld Fe192 F projector. BDT140013 Rev 7.1 command reference. Control via RS-232C serial (D-SUB 9P PC CONTROL) and wired/wireless LAN (TCP port 7142). 53 documented commands: power, mute, input switch, picture/volume/aspect adjust, lens control + memory, status queries, eco/PIP/edge-blend set.

<!-- UNRESOLVED: firmware version compat not stated. Model code (ID2) values not in source — see appendix reference not included. Input terminal DATA01 values, aspect values, eco mode values reference external "Supplementary Information by Command" appendix not present in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable: 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated (RTS/CTS pins present in pinout)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable      # inferred: many status/error/info request commands
  - routable       # inferred: 018 INPUT SW CHANGE command
  - levelable      # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
```

## Actions
```yaml
# Commands use hex byte frames. Format: <HDR> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>.
# Request commands from host omit ID1/ID2 (use 00h 00h placeholder). Responses from
# projector carry actual ID1 (control ID) and ID2 (model code). CKS = low byte of
# sum of all preceding bytes.

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
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video port). Full value list in 'Supplementary Information by Command' appendix. UNRESOLVED: appendix not in source."
  notes: "Example switch to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh."

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: "Value low-order 8 bits."
    - name: data04
      type: string
      description: "Value high-order 8 bits."
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: "Value low-order 8 bits."
    - name: data03
      type: string
      description: "Value high-order 8 bits."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. UNRESOLVED: value list in 'Supplementary Information by Command' appendix not in source."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target. DATA01+DATA02 = 96h+FFh → LAMP ADJUST / LIGHT ADJUST."
    - name: data02
      type: string
      description: "Target high byte (FFh for LAMP/LIGHT ADJUST)."
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: "Value low-order 8 bits."
    - name: data05
      type: string
      description: "Value high-order 8 bits."

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

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content: 01h=usage time (s), 04h=remaining life (%)."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte. See key code list (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 4Bh=COMPUTER1, 8Ah=FREEZE, D7h=SOURCE, EEh=LAMP MODE/ECO)."
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed codes)."

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target: 06h=Periphery Focus."
    - name: data02
      type: string
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
  notes: "Send 00h to stop after 7Fh/81h continuous drive."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (per 053 LENS CONTROL)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: FFh=Stop, others = lens target."
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: "Value low-order 8 bits."
    - name: data04
      type: string
      description: "Value high-order 8 bits."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield: lens memory/zoom/focus/lens-shift(H/V) operation state."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile: 00h=Profile 1, 01h=Profile 2."

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
      description: "Gain name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."

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

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze ON, 02h=freeze OFF."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Info type: 03h=horizontal sync freq, 04h=vertical sync freq."

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
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. UNRESOLVED: value list in 'Supplementary Information by Command' appendix not in source."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01-16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Value (mode: 00h=PIP,01h=PbP; position: 00h=TL,01h=TR,02h=BL,03h=BR; sub input values per appendix)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON."

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
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal. UNRESOLVED: value list in 'Supplementary Information by Command' appendix not in source."
    - name: data02
      type: string
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Projector responses: ack frame 2Xh/AXh carries ID1/ID2/LEN/ERR1/ERR2/CKS.
# Success responses carry DATA per command. FFh in response DATA often = error.
# Detailed response payloads documented per command above (see Actions notes).
# UNRESOLVED: no separate unsolicited-notification model documented - all responses are command-triggered.
```

## Variables
```yaml
# All settable parameters exposed as parameterized actions above (picture, volume,
# aspect, lens position, eco mode, PIP/PbP, edge blending, audio select, projector name).
# No additional free-form variables documented.
```

## Events
```yaml
# No unsolicited events documented in source.
```

## Macros
```yaml
# No multi-step sequences documented explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond note that 015 POWER ON / 016 POWER OFF
# reject concurrent commands during transitions. ERROR STATUS REQUEST (009) reports
# cover/fan/temperature/lamp/interlock-switch errors as read-only status bits -
# not a control interlock.
```

## Notes
- Manual revision BDT140013 Rev 7.1.
- Checksum = low byte of sum of all preceding bytes (e.g. `20h+81h+01h+60h+01h+00h=103h → CKS=03h`).
- Serial cable = cross cable, D-SUB 9P. Pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- Wired LAN: RJ-45, auto 10/100 Mbps (IEEE 802.3 / 802.3u). Wireless LAN via separate wireless LAN unit.
- Lamp/filter usage times returned in seconds; updated at 1-minute intervals.
- Lamp remaining life (%) may be negative if replacement deadline exceeded.
- Error code table: ERR1/ERR2 combos cover unrecognized cmd, unsupported model, invalid value, memory errors, power-off rejection, no authority, etc.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model code (ID2) values not stated — varies by model. -->
<!-- UNRESOLVED: "Supplementary Information by Command" appendix referenced but not present in refined source — affects input terminal values, aspect values, eco mode values, sub-input values, base model type values. -->
<!-- UNRESOLVED: serial flow_control not stated (RTS/CTS pins wired in pinout but no handshake mode documented). -->
<!-- UNRESOLVED: default baud rate among listed options (115200/38400/19200/9600/4800) not stated. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:33:24.959Z
last_checked_at: 2026-06-17T20:07:12.225Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:07:12.225Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands matched verbatim to source; transport params verified; source coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compat not stated. Model code (ID2) values not in source — see appendix reference not included. Input terminal DATA01 values, aspect values, eco mode values reference external \"Supplementary Information by Command\" appendix not present in refined source."
- "not stated (RTS/CTS pins present in pinout)"
- "appendix not in source.\""
- "value list in 'Supplementary Information by Command' appendix not in source.\""
- "no separate unsolicited-notification model documented - all responses are command-triggered."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated in source."
- "model code (ID2) values not stated — varies by model."
- "\"Supplementary Information by Command\" appendix referenced but not present in refined source — affects input terminal values, aspect values, eco mode values, sub-input values, base model type values."
- "serial flow_control not stated (RTS/CTS pins wired in pinout but no handshake mode documented)."
- "default baud rate among listed options (115200/38400/19200/9600/4800) not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
