---
spec_id: admin/sharp-nec-np-pe455ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PE455UL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PE455UL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PE455UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:44:10.399Z
last_checked_at: 2026-06-18T08:50:00.071Z
generated_at: 2026-06-18T08:50:00.071Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Eco mode / aspect / input-terminal enum value tables referenced but held in an external Appendix (\"Supplementary Information by Command\") not present in source text. Exact sub-input enum values for PIP/PbP unresolved."
  - "source does not designate a single default baud rate; operator must select one of the listed values"
  - "flow control not stated; full-duplex communication mode stated"
  - "source describes no unsolicited notifications / async push events."
  - "source documents no explicit multi-step macro sequences."
  - "source has no explicit safety interlock procedures (e.g. lamp-door,"
  - "ID2 model code byte for NP-PE455UL not stated in source."
  - "Appendix \"Supplementary Information by Command\" not in source text — input terminal, aspect, eco mode, sub-input enums missing."
  - "default baud rate not designated (5 options listed)."
  - "flow control not stated (full-duplex mode only stated)."
  - "053 LENS CONTROL DATA01 target table truncated in source (only 06h=Periphery Focus shown)."
  - "firmware version compatibility not stated."
  - "protocol version / command set version beyond \"BDT140013 Rev 7.1\" not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:50:00.071Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PE455UL Control Spec

## Summary
Sharp/NEC NP-PE455UL projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP port 7142). Binary framed protocol with checksum. Covers power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and many status/error/lamp/filter queries (command reference BDT140013 Rev 7.1).

<!-- UNRESOLVED: firmware version compatibility not stated. Eco mode / aspect / input-terminal enum value tables referenced but held in an external Appendix ("Supplementary Information by Command") not present in source text. Exact sub-input enum values for PIP/PbP unresolved. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as switchable; 115200 is the top stated rate
  # UNRESOLVED: source does not designate a single default baud rate; operator must select one of the listed values
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex communication mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many *REQUEST commands returning values
  - levelable    # inferred: PICTURE/VOLUME/LAMP adjust commands present
  - routable     # inferred: INPUT SW CHANGE command present (input selection)
```

## Actions
```yaml
# Framing: every command is hex-byte framed. Format per source §2.1:
#   <CMD1> <CMD2> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# CKS = checksum = low byte of sum of all preceding bytes (per §2.2).
# Commands below use the literal fixed payload when source gives one (CKS shown
# verbatim from source). Parameterized commands show the variable DATA bytes.

actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>..<DATA12> <CKS>. DATA01-12 = error bitmap (0=normal, 1=error). See source §3.1 for full bit map."

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
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal byte. Source example: 06h = video port. Full enum held in Appendix 'Supplementary Information by Command' (UNRESOLVED)."
    notes: "Response DATA01=FFh means ended with error (no signal switch)."

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>..<DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>..<DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. Enum held in Appendix 'Supplementary Information by Command' (UNRESOLVED)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>..<DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Target low byte: FFh (per source table)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
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
    notes: "Returns 98-byte block: DATA01-49 projector name, DATA83-86 lamp usage sec, DATA87-90 filter usage sec."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 filter usage sec; DATA05-08 filter alarm start sec. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time sec, 04h=remaining life %"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type). Source key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed keys)"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target. Source shows 06h=Periphery Focus. Other lens targets (zoom/focus/shift) UNRESOLVED - table truncated in source."
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (same set as 053 LENS CONTROL)"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>..<DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target; FFh=Stop (mode/value ignored when Stop)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitmap: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep function."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "03h=horizontal sync freq, 04h=vertical sync freq"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns 'Light mode' or 'Lamp mode' depending on projector. Enum UNRESOLVED - in Appendix."

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
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
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
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. Enum UNRESOLVED - in Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"
    params:
      - name: DATA01to16
        type: string
        description: "Projector name (up to 16 bytes), NUL-terminated."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input value UNRESOLVED - in Appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

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
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal byte (enum in Appendix, UNRESOLVED)."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_status
    type: enum
    values: [success, error]
    notes: "Every command returns a response frame. Success: leading byte 2xh/20h with no ERR. Error: leading byte Axh/A0h with <ERR1> <ERR2>. ERR codes per source §2.4 (00h/00h=unrecognized, 00h/01h=unsupported, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed, etc.)."

  - id: error_status
    type: bitmap
    notes: "From 009 ERROR STATUS REQUEST. DATA01-12 bitmap: cover, fan, temp, power, lamp off, lamp replace due, formatter, FPGA, mirror cover, lens not installed, foreign matter, iris calibration, ballast comm, interlock switch open, system errors. Full bit map in source §3.1."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "From 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01."

  - id: input_signal
    type: string
    notes: "From 078-3 INPUT STATUS REQUEST - signal type 1/2, list number, displayed content."

  - id: mute_state
    type: object
    notes: "From 078-4 MUTE STATUS REQUEST: picture, sound, onscreen, forced onscreen, OSD display."

  - id: lamp_info
    type: object
    notes: "From 037-4: lamp usage sec + remaining life %."

  - id: lens_operation
    type: bitmap
    notes: "From 053-7 LENS INFORMATION REQUEST: memory, zoom, focus, shift H, shift V operating flags."

  - id: cover_state
    type: enum
    values: [normal_opened, closed]
    notes: "From 078-6 COVER STATUS REQUEST."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    set_via: picture_adjust (DATA01=00h)
    range: UNRESOLVED  # bounds returned dynamically by 060-1 GAIN PARAMETER REQUEST 3
  - id: picture_contrast
    set_via: picture_adjust (DATA01=01h)
    range: UNRESOLVED
  - id: picture_color
    set_via: picture_adjust (DATA01=02h)
    range: UNRESOLVED
  - id: picture_hue
    set_via: picture_adjust (DATA01=03h)
    range: UNRESOLVED
  - id: picture_sharpness
    set_via: picture_adjust (DATA01=04h)
    range: UNRESOLVED
  - id: volume
    set_via: volume_adjust
    range: UNRESOLVED  # bounds via 060-1 (DATA01=05h)
  - id: lamp_light_adjust
    set_via: other_adjust (DATA01=96h, DATA02=FFh)
    range: UNRESOLVED
  - id: eco_mode
    set_via: eco_mode_set
    range: UNRESOLVED  # enum in Appendix
  - id: aspect
    set_via: aspect_adjust
    range: UNRESOLVED  # enum in Appendix
  - id: projector_name
    set_via: lan_projector_name_set
    range: "up to 16 bytes"
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / async push events.
# All responses are solicited (returned after a command). Device-initiated
# events not documented.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "While this command is turning off the power (including the cooling time), no other command can be accepted."
  - power_on   # source: "While this command is turning on the power, no other command can be accepted."
interlocks:
  - "Power-off locks out all other commands during cooling period."
  - "Power-on locks out all other commands during power-on sequence."
  - "ERR 02h/0Dh: command rejected because power is off."
  - "ERR 02h/0Fh: no authority for operation."
# UNRESOLVED: source has no explicit safety interlock procedures (e.g. lamp-door,
# high-voltage). Error bitmap reports cover/interlock-switch/lamp errors but
# no documented recovery sequence.
```

## Notes
Binary framed protocol, hex bytes. Frame format per §2.1: `<CMD1> <CMD2> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = control ID configured on projector; ID2 = model code (varies by model — not stated for NP-PE455UL). Checksum = low byte of sum of all preceding bytes (worked example in §2.2). Success response leading byte = 2xh; error response leading byte = Axh with ERR1/ERR2.

Lamp/filter usage times returned in seconds, updated at 1-minute intervals. Negative remaining-life % means lamp replacement deadline exceeded.

Source repeatedly defers enum tables (input terminal, aspect, eco mode, sub-input) to an external Appendix titled "Supplementary Information by Command" — that appendix is NOT present in the supplied refined text. Those enums marked UNRESOLVED throughout.

Model code (ID2) for NP-PE455UL not stated — every command needs it; UNRESOLVED.

<!-- UNRESOLVED: ID2 model code byte for NP-PE455UL not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source text — input terminal, aspect, eco mode, sub-input enums missing. -->
<!-- UNRESOLVED: default baud rate not designated (5 options listed). -->
<!-- UNRESOLVED: flow control not stated (full-duplex mode only stated). -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 target table truncated in source (only 06h=Periphery Focus shown). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol version / command set version beyond "BDT140013 Rev 7.1" not stated. -->
````

Spec output above. 53 commands enumerated (one per source row). Model code ID2 + appendix enums + default baud = main gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:44:10.399Z
last_checked_at: 2026-06-18T08:50:00.071Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:50:00.071Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Eco mode / aspect / input-terminal enum value tables referenced but held in an external Appendix (\"Supplementary Information by Command\") not present in source text. Exact sub-input enum values for PIP/PbP unresolved."
- "source does not designate a single default baud rate; operator must select one of the listed values"
- "flow control not stated; full-duplex communication mode stated"
- "source describes no unsolicited notifications / async push events."
- "source documents no explicit multi-step macro sequences."
- "source has no explicit safety interlock procedures (e.g. lamp-door,"
- "ID2 model code byte for NP-PE455UL not stated in source."
- "Appendix \"Supplementary Information by Command\" not in source text — input terminal, aspect, eco mode, sub-input enums missing."
- "default baud rate not designated (5 options listed)."
- "flow control not stated (full-duplex mode only stated)."
- "053 LENS CONTROL DATA01 target table truncated in source (only 06h=Periphery Focus shown)."
- "firmware version compatibility not stated."
- "protocol version / command set version beyond \"BDT140013 Rev 7.1\" not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
