---
spec_id: admin/sharp-nec-xp-p701u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC XP-P701U W Control Spec"
manufacturer: Sharp/NEC
model_family: "XP-P701U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "XP-P701U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:25:06.272Z
last_checked_at: 2026-06-19T07:51:19.306Z
generated_at: 2026-06-19T07:51:19.306Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) is not present in this refined excerpt — parameter enum tables are incomplete for commands that reference it."
  - "source gives a range, not a single default; non-selected rates omitted"
  - "source states \"Full duplex\" communication mode but does not name an RS-232 flow-control scheme"
  - "not in source.\""
  - "range returned dynamically by gain_parameter_request_3, not stated as a fixed spec"
  - "value enum referenced to appendix not present in source"
  - "source describes no unsolicited notifications; all responses are"
  - "source documents no multi-step sequences."
  - "no explicit power-on sequencing procedure stated beyond the"
  - "appendix \"Supplementary Information by Command\" is referenced by INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, and AUDIO SELECT SET but is not present in this refined excerpt — their full parameter enums are incomplete."
  - "firmware version compatibility not stated in source."
  - "default baud rate not pinned (source lists five supported rates)."
  - "flow-control scheme not named (source states full-duplex only)."
  - "response frame for 050 REMOTE KEY CODE success uses 22h 0Fh prefix with DATA01 echo; FFh = error."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:51:19.306Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source; every hex command and transport parameter confirmed verbatim in BDT140013 revision 7.1. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC XP-P701U W Control Spec

## Summary
Projector control spec for the Sharp/NEC XP-P701U W, covering the binary frame protocol documented in BDT140013 Revision 7.1. Supports RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). Commands are fixed-length hex frames with a trailing additive low-byte checksum (CKS).

<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input-terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) is not present in this refined excerpt — parameter enum tables are incomplete for commands that reference it. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; pick per device config
  # UNRESOLVED: source gives a range, not a single default; non-selected rates omitted
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name an RS-232 flow-control scheme
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE routing command present
  - queryable    # inferred: many *REQUEST status queries present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST level commands present
```

## Actions
```yaml
# All frames verbatim from source. CKS = additive low-byte checksum of all
# preceding bytes. <ID1> = control ID, <ID2> = model code (set per projector).
# Response prefixes: 2xh = success (no data), 2xh+data = success (with data),
# Axh = error frame with <ERR1> <ERR2>. See Notes + Safety for timing/interlock.

actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitmask (cover/fan/temp/lamp/formatter/interlock/etc.). See source §3.1."

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
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h = video). Full list in appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
    notes: "Response DATA01=FFh means ended with error (no switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input switch or video-signal switch."

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
    notes: "Cleared by input switch, video-signal switch, or volume adjustment."

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
    notes: "Cleared by input switch or video-signal switch."

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
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Response DATA01+DATA02 = 0000h success, else error. Example set brightness to 10: '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set volume to 10: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value. Full enum in appendix - UNRESOLVED: not in source."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target high byte. Source documents DATA01=96h => LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: integer
        description: "Adjustment target low byte. 96h/FFh => LAMP ADJUST / LIGHT ADJUST."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h usage seconds, 04h remaining life %."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD). See key code list in Notes."
      - name: data02
        type: integer
        description: "Key code high byte (always 00h per source list)."
    notes: "Response DATA01=FFh => error. Key codes (DATA01/DATA02/Name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

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
        type: integer
        description: "Target: 06h Periphery Focus (per source row)."
      - name: data02
        type: integer
        description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s."
    notes: "To stop after 7Fh/81h, send DATA02=00h. Response DATA01=FFh => error."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target to read."
    notes: "Returns upper/lower limit + current value (4 bytes each pair)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target (FFh = Stop; when Stop, mode/value ignored)."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."
    notes: "Controls profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting value: 00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) - each 0=Stop/1=Operating."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number (00h/01h); DATA02 reserved."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."
    notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (practical = returned+1), selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns NUL-terminated model name (DATA01-32)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h Normal (cover opened), 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h Freeze ON, 02h Freeze OFF."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency."
    notes: "Returns variable-length NUL-terminated label/info string."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value. Value enum in appendix - UNRESOLVED: not in source."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns NUL-terminated projector name (DATA01-17)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h OFF, 01h ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco/light/lamp mode value. Value enum in appendix - UNRESOLVED: not in source."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: data01_16
        type: string
        description: "Projector name bytes (up to 16 bytes), NUL-terminated."
    notes: "Source field labelled DATA01-16 (up to 16 bytes)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h TL / 01h TR / 02h BL / 03h BR; SUB INPUT values per appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h OFF, 01h ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Value enum in appendix - UNRESOLVED: not in source."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns NUL-terminated serial number (DATA01-16)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal. Value enum in appendix - UNRESOLVED: not in source."
      - name: data02
        type: integer
        description: "Setting value: 00h the terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    source_action: error_status_request
    description: "12-byte error bitmask (cover, fan, temperature, lamp, formatter, interlock, etc.). Bit=0 normal, Bit=1 error."

  - id: command_execution_result
    type: enum
    values: [success, error]
    description: "Every command returns either a 2xh success frame or an Axh error frame carrying <ERR1> <ERR2>. See source §2.4 for full error-code matrix."

  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
    source_action: running_status_request

  - id: input_switch_result
    type: enum
    values: [switched, error_no_signal_switch]
    source_action: input_sw_change

  - id: lens_status
    type: bitmask
    description: "Per-lens-target operating bit (0=Stop, 1=Operating)."
    source_action: lens_information_request

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source_action: cover_status_request
```

## Variables
```yaml
variables:
  - id: brightness
    set_via: picture_adjust
    range: null  # UNRESOLVED: range returned dynamically by gain_parameter_request_3, not stated as a fixed spec

  - id: contrast
    set_via: picture_adjust
    range: null  # UNRESOLVED

  - id: color
    set_via: picture_adjust
    range: null  # UNRESOLVED

  - id: hue
    set_via: picture_adjust
    range: null  # UNRESOLVED

  - id: sharpness
    set_via: picture_adjust
    range: null  # UNRESOLVED

  - id: volume
    set_via: volume_adjust
    range: null  # UNRESOLVED

  - id: lamp_light_adjust
    set_via: other_adjust
    range: null  # UNRESOLVED

  - id: projector_name
    set_via: lan_projector_name_set
    max_length_bytes: 16

  - id: eco_mode
    set_via: eco_mode_set
    # UNRESOLVED: value enum referenced to appendix not present in source
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: no other command accepted during power-off incl. cooling time
  - power_on   # source: no other command accepted while power-on in progress
interlocks:
  - "During POWER ON execution, no other command can be accepted. (source §3.2)"
  - "During POWER OFF execution (including cooling time), no other command can be accepted. (source §3.3)"
  - "Commands issued while power is off return ERR1=02h ERR2=0Dh ('The command cannot be accepted because the power is off'). (source §2.4)"
  - "Interlock switch open is reported via error status DATA09 Bit1. (source §3.1)"
  - "Lens-not-installed-properly is reported via error status DATA04 Bit7. (source §3.1)"
# UNRESOLVED: no explicit power-on sequencing procedure stated beyond the
# command-acceptance interlocks above.
```

## Notes
- **Frame format:** every command/response is a hex byte series. Layout per source §2.1: `20h 88h <ID1> <ID2> 0Ch <DATA01> … <DATA12> <CKS>`.
- **Checksum (CKS):** add all preceding bytes; take the low-order one byte of the sum. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h` (source §2.2).
- **Response prefixes:** `2xh` = command success (no data part), `2xh` + DATA = success with data, `Axh` + `<ERR1> <ERR2>` = error frame (source §2.3). The leading hex digit of the second byte identifies the command; the leading digit `2`/`A` encodes success/error.
- **Common parameters:** `<ID1>` = control ID set on the projector; `<ID2>` = model code (varies by model); `<LEN>` = data-length byte following LEN; `<DATA??>` = variable-length payload (source §2.2).
- **Error codes (§2.4):** full matrix — `00h/00h` unrecognized, `00h/01h` not supported by model, `01h/00h` invalid value, `01h/01h` invalid input terminal, `01h/02h` invalid language, `02h/00h` memory allocation error, `02h/02h` memory in use, `02h/03h` value cannot be set, `02h/04h` forced onscreen mute on, `02h/06h` viewer error, `02h/07h` no signal, `02h/08h` test pattern/filter displayed, `02h/09h` no PC card inserted, `02h/0Ah` memory operation error, `02h/0Ch` entry list displayed, `02h/0Dh` power is off, `02h/0Eh` command execution failed, `02h/0Fh` no authority, `03h/00h` incorrect gain number, `03h/01h` invalid gain, `03h/02h` adjustment failed.
- **Lens control:** continuous drive (`7Fh`/`81h`) must be followed by `00h` to stop. While the lens is being driven, the same command can be re-issued without an intermediate stop.
- **Timing:** lamp/filter usage is reported in seconds but updated by the projector at one-minute intervals.
- **Reference document:** BDT140013 Revision 7.1.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" is referenced by INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, and AUDIO SELECT SET but is not present in this refined excerpt — their full parameter enums are incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not pinned (source lists five supported rates). -->
<!-- UNRESOLVED: flow-control scheme not named (source states full-duplex only). -->
<!-- UNRESOLVED: response frame for 050 REMOTE KEY CODE success uses 22h 0Fh prefix with DATA01 echo; FFh = error. -->
````

Spec emitted. 53 actions, all hex payloads verbatim from BDT140013 r7.1. Both transports (serial + TCP:7142) populated from source. Gaps marked UNRESOLVED — biggest one = appendix "Supplementary Information by Command" missing from refined excerpt (5 commands reference it for enum values).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:25:06.272Z
last_checked_at: 2026-06-19T07:51:19.306Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:51:19.306Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source; every hex command and transport parameter confirmed verbatim in BDT140013 revision 7.1. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) is not present in this refined excerpt — parameter enum tables are incomplete for commands that reference it."
- "source gives a range, not a single default; non-selected rates omitted"
- "source states \"Full duplex\" communication mode but does not name an RS-232 flow-control scheme"
- "not in source.\""
- "range returned dynamically by gain_parameter_request_3, not stated as a fixed spec"
- "value enum referenced to appendix not present in source"
- "source describes no unsolicited notifications; all responses are"
- "source documents no multi-step sequences."
- "no explicit power-on sequencing procedure stated beyond the"
- "appendix \"Supplementary Information by Command\" is referenced by INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, and AUDIO SELECT SET but is not present in this refined excerpt — their full parameter enums are incomplete."
- "firmware version compatibility not stated in source."
- "default baud rate not pinned (source lists five supported rates)."
- "flow-control scheme not named (source states full-duplex only)."
- "response frame for 050 REMOTE KEY CODE success uses 22h 0Fh prefix with DATA01 echo; FFh = error."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
