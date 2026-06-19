---
spec_id: admin/sharp-nec-m651-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M651 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "M651 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M651 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:23.877Z
last_checked_at: 2026-06-18T08:12:30.721Z
generated_at: 2026-06-18T08:12:30.721Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Input terminal value table (\"Supplementary Information by Command\") and eco-mode value table not included in refined source."
  - "source does not designate a single default"
  - "flow control not stated; communication mode is full-duplex"
  - "Appendix \"Supplementary Information by Command\" (input terminal values,"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "default baud not designated by source (5 rates listed). Flow control not stated. Input terminal value table, eco-mode value table, base model type value table, sub-input value table referenced but not present in refined source. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:12:30.721Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M651 Pt Control Spec

## Summary
Sharp/NEC M651 Pt large-format display/projector. Control via RS-232C serial (D-SUB 9P PC CONTROL port) and LAN (wired RJ-45 / wireless unit) using binary hex-framed commands on TCP port 7142. Manual revision BDT140013 Rev 7.1 covers 53 distinct commands: power, input switch, mutes, lens control, lamp info, status queries, eco/PIP/edge-blend set.

<!-- UNRESOLVED: firmware version compatibility not stated. Input terminal value table ("Supplementary Information by Command") and eco-mode value table not included in refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 4800/9600/19200/38400/115200; 9600 shown as default convention - UNRESOLVED: source does not designate a single default
  baud_rate_supported: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; communication mode is full-duplex
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF
  - queryable       # inferred: many status request commands
  - levelable       # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable        # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Frame format (all commands): <MT> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID (default 00h), ID2 = model code (default 00h)
# CKS = checksum: low byte of sum of all preceding bytes
# Commands emitted verbatim from source (ID1=ID2=00h as documented).

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

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (e.g. 06h=video). See Appendix 'Supplementary Information by Command'."
  notes: "Example to video: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value; see Appendix 'Supplementary Information by Command'"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "96h (LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "FFh (when DATA01=96h)"
    - name: DATA03
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)"

- id: carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total, 01h=During operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type)"
    - name: DATA02
      type: integer
      description: "Key code high byte (typically 00h)"
  notes: "Key code list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"

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
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus drive, 81h=minus drive, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

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
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

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
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
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
      type: integer
      description: "Eco mode value; see Appendix 'Supplementary Information by Command'"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-padded)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR)"

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
      description: "Input terminal; see Appendix 'Supplementary Information by Command'"
    - name: DATA02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Standard ACK frame on command success: 2Xh <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Standard NACK frame on command failure: AXh <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
- id: command_ack
  type: frame
  description: "Success response; MT byte high nibble 2h"

- id: command_nack
  type: frame
  description: "Error response; MT byte high nibble Ah, carries ERR1/ERR2 codes"

- id: error_code
  type: enum
  description: "ERR1/ERR2 pair from NACK frame"
  values:
    - "00h/00h: command not recognized"
    - "00h/01h: command not supported by model"
    - "01h/00h: specified value invalid"
    - "01h/01h: specified input terminal invalid"
    - "01h/02h: specified language invalid"
    - "02h/00h: memory allocation error"
    - "02h/02h: memory in use"
    - "02h/03h: specified value cannot be set"
    - "02h/04h: forced onscreen mute on"
    - "02h/06h: viewer error"
    - "02h/07h: no signal"
    - "02h/08h: test pattern or filter displayed"
    - "02h/09h: no PC card inserted"
    - "02h/0Ah: memory operation error"
    - "02h/0Ch: entry list displayed"
    - "02h/0Dh: command not accepted (power off)"
    - "02h/0Eh: command execution failed"
    - "02h/0Fh: no authority for operation"
    - "03h/00h: specified gain number incorrect"
    - "03h/01h: specified gain invalid"
    - "03h/02h: adjustment failed"
```

## Variables
```yaml
# Query responses return multi-byte DATA fields; see Notes for layout per command.
# No discrete settable variable outside Actions enumerated above.
# UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values,
# eco-mode values, base model type values, sub-input values) not present in refined source.
```

## Events
```yaml
# Source describes no unsolicited notifications. Device responds only to host commands.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note 015 POWER ON / 016 POWER OFF reject
# other commands during power transition / cooling (documented behavioral note,
# not a safety interlock).
```

## Notes
- Manual revision: BDT140013 Rev 7.1.
- Frame layout: `<MT> <CMD> <ID1> <ID2> <LEN> <DATA??...> <CKS>`. MT high nibble: `0h`=class, `2h`=ack, `3h`=ack-with-data, `Ah`=nack.
- Checksum: sum all preceding bytes, take low-order byte.
- ID1=control ID (projector-set), ID2=model code; both default `00h` in command examples.
- POWER ON rejects all other commands while powering on. POWER OFF rejects during power-off incl. cooling time.
- Lamp/filter usage time returned in seconds; updated at 1-minute intervals.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Two-lamp models only: DATA01=01h selects Lamp 2.
- Lens drive: after `7Fh`/`81h` continuous drive, send `00h` to stop.
- PICTURE/SOUND/ONSCREEN mute auto-clears on input switch or video signal switch.
- Wireless LAN: supported via optional wireless LAN unit (config not in this manual).

<!-- UNRESOLVED: default baud not designated by source (5 rates listed). Flow control not stated. Input terminal value table, eco-mode value table, base model type value table, sub-input value table referenced but not present in refined source. Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:23.877Z
last_checked_at: 2026-06-18T08:12:30.721Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:12:30.721Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Input terminal value table (\"Supplementary Information by Command\") and eco-mode value table not included in refined source."
- "source does not designate a single default"
- "flow control not stated; communication mode is full-duplex"
- "Appendix \"Supplementary Information by Command\" (input terminal values,"
- "source contains no explicit safety warnings, interlock procedures,"
- "default baud not designated by source (5 rates listed). Flow control not stated. Input terminal value table, eco-mode value table, base model type value table, sub-input value table referenced but not present in refined source. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
