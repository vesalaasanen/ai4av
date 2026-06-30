---
spec_id: admin/sharp-nec-pn-hy501
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HY501 Projector Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HY501
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HY501
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:35:25.529Z
last_checked_at: 2026-06-18T09:08:15.519Z
generated_at: 2026-06-18T09:08:15.519Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state PN-HY501 model name explicitly (generic projector manual); model supplied by operator. Input terminal enum values, aspect values, base model type values, sub-input values, and eco mode values reference an Appendix (\"Supplementary Information by Command\") not included in the refined source."
  - "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
  - "enum table not in refined source\""
  - "enum in source Appendix\""
  - "enum in source Appendix 'Supplementary Information by Command'\""
  - "lamp usage time, filter usage time, lamp remaining life, carbon savings, gain parameter ranges,"
  - "numeric ranges/default values require runtime GAIN PARAMETER REQUEST 3 query; not statically stated in source"
  - "source does not document any unsolicited notifications; device appears strictly request/response."
  - "source does not describe multi-step sequences."
  - "source contains no explicit safety interlock procedures or power-on sequencing beyond the"
  - "PN-HY501 model name not stated in source manual (generic projector command reference)."
  - "firmware version compatibility not stated."
  - "ID1 control ID and ID2 model code default values not stated."
  - "input terminal / aspect / base model type / sub-input / eco-mode enum tables live in source Appendix not included here."
  - "serial flow-control scheme not named (only \"Full duplex\" stated)."
  - "no authentication or login procedure described; auth.type inferred as none."
  - "wireless LAN command transport specifics deferred to wireless-LAN-unit operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:08:15.519Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HY501 Projector Control Spec

## Summary
Sharp/NEC PN-HY501 large-format display/projector controlled via a binary hex-frame protocol over TCP/IP (port 7142) or RS-232C serial. This spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/lamp adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries. Commands are fixed-length hex frames terminated by a checksum byte; responses echo the command code with success (2xh) or error (Axh) prefixes.

<!-- UNRESOLVED: source does not state PN-HY501 model name explicitly (generic projector manual); model supplied by operator. Input terminal enum values, aspect values, base model type values, sub-input values, and eco mode values reference an Appendix ("Supplementary Information by Command") not included in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # selectable per source: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name a flow-control scheme
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: extensive REQUEST command set (status, information, lamp, filter, etc.)
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / LAMP ADJUST commands present
  - routable     # inferred: INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10) routing commands present
```

## Actions
```yaml
actions:
  # ---- Power ----
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

  # ---- Input routing ----
  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal selector (e.g. 06h = video). Full enum in source Appendix 'Supplementary Information by Command'. # UNRESOLVED: enum table not in refined source"
    notes: "Example (DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. # UNRESOLVED: enum in source Appendix"
      - name: DATA02
        type: byte
        description: "Setting value: 00h = terminal specified in DATA01, 01h = BNC, 02h = COMPUTER"

  # ---- Mute ----
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

  # ---- Picture / volume / aspect / lamp adjust ----
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. # UNRESOLVED: enum in source Appendix 'Supplementary Information by Command'"

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Adjustment target low byte: FFh"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  # ---- Remote / shutter / freeze ----
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). Documented codes: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all documented codes)"
    notes: "Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h = freeze on, 02h = freeze off"

  # ---- Lens control ----
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target. Documented: 06h = Periphery Focus"
      - name: DATA02
        type: byte
        description: "Drive content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "Send 00h to stop continuous drive (7Fh/81h)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (FFh = Stop; when Stop, DATA02-DATA04 ignored)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on the profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  # ---- Eco / name / PIP / edge blending set ----
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Eco/Light/Lamp mode value. # UNRESOLVED: enum in source Appendix"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input values in source Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  # ==================== Queries ====================
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
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    notes: "Example lamp1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (e.g. 06h = Periphery Focus)"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
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
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
        type: byte
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
feedbacks:
  - id: power_state
    type: enum
    source: "078-2 RUNNING STATUS REQUEST -> DATA03"
    values: [standby, power_on]
    notes: "DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

  - id: operation_status
    type: enum
    source: "078-2 RUNNING STATUS REQUEST -> DATA06"
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: error_status
    type: bitmask
    source: "009 ERROR STATUS REQUEST -> DATA01..DATA12"
    notes: "DATA01-04 hardware/fan/temp/lamp error bits; DATA09 extended status (interlock switch, system errors). Bit=1 indicates error."

  - id: mute_status
    type: object
    source: "078-4 MUTE STATUS REQUEST"
    notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (each 00h=Off, 01h=On)"

  - id: cover_status
    type: enum
    source: "078-6 COVER STATUS REQUEST -> DATA01"
    values: [normal_open, closed]
    notes: "00h=Normal(cover opened), 01h=Cover closed"

  - id: command_response_ack
    type: enum
    notes: "Success responses use prefix 2xh (e.g. 22h/23h/20h/21h) echoing command. Error responses use prefix Axh with ERR1/ERR2 codes (see source 2.4 error code list)."

  # UNRESOLVED: lamp usage time, filter usage time, lamp remaining life, carbon savings, gain parameter ranges,
  #             input signal type, signal list number, projector name, MAC address, serial number, base model
  #             type, and information strings are returned as data payloads but require per-query response parsing.
```

## Variables
```yaml
variables:
  - id: volume
    description: "Sound volume level (set via 030-2 VOLUME ADJUST, read via 060-1 GAIN PARAMETER REQUEST 3 DATA01=05h)"
  - id: brightness
    description: "Picture brightness (set via 030-1 DATA01=00h, read via 060-1 DATA01=00h)"
  - id: contrast
    description: "Picture contrast (set via 030-1 DATA01=01h, read via 060-1 DATA01=01h)"
  - id: color
    description: "Picture color (set via 030-1 DATA01=02h, read via 060-1 DATA01=02h)"
  - id: hue
    description: "Picture hue (set via 030-1 DATA01=03h, read via 060-1 DATA01=03h)"
  - id: sharpness
    description: "Picture sharpness (set via 030-1 DATA01=04h, read via 060-1 DATA01=04h)"
  - id: lamp_light_adjust
    description: "Lamp/Light adjust level (set via 030-15, read via 060-1 DATA01=96h)"
  # UNRESOLVED: numeric ranges/default values require runtime GAIN PARAMETER REQUEST 3 query; not statically stated in source
```

## Events
```yaml
events: []
# UNRESOLVED: source does not document any unsolicited notifications; device appears strictly request/response.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on is in progress."
  - "POWER OFF (016): no other command accepted during power-off including cooling time."
  - "Error response 02h 0Fh: 'no authority necessary for the operation' implies an authority/lock concept, undocumented."
warnings:
  - "Error status DATA09 Bit1: interlock switch open flag is reported via 009 ERROR STATUS REQUEST."
# UNRESOLVED: source contains no explicit safety interlock procedures or power-on sequencing beyond the
#             command-acceptance notes above. Voltage/current/power specs not present in source.
```

## Notes
- **Protocol framing:** All commands/responses are hex byte frames. Format: `{20h/02h/01h/03h/00h} {cmd} <ID1> <ID2> {LEN} <DATA..> <CKS>`. `<ID1>` = control ID set on projector; `<ID2>` = model code (model-dependent); `<CKS>` = checksum = low-order byte of the sum of all preceding bytes.
- **Checksum example:** `20h 81h 01h 60h 01h 00h` → sum = 103h → checksum = 03h.
- **Response prefixes:** success = `2xh` (20h/21h/22h/23h depending on command class byte), error = `Axh` (A0h/A1h/A2h/A3h) carrying ERR1/ERR2. The command-class leading byte (00h/01h/02h/03h) maps to the response success/error prefix (20h/21h/22h/23h and A0h/A1h/A2h/A3h).
- **Error codes (source 2.4):** ERR1/ERR2 pairs cover unrecognized command (00h/00h), unsupported (00h/01h), invalid value (01h/00h), invalid input (01h/01h), power off rejection (02h/0Dh), execution failure (02h/0Eh), no authority (02h/0Fh), invalid gain (03h/00h), etc.
- **Usage-time resolution:** lamp/filter usage times are returned in seconds but updated at one-minute intervals.
- **Two-lamp models:** LAMP INFORMATION REQUEST 3 DATA01=01h (Lamp 2) effective only on two-lamp projector models.
- Several commands reference an Appendix "Supplementary Information by Command" for input-terminal enums, aspect values, base-model-type values, sub-input values, and eco-mode values. That appendix is not present in the refined source; those enums are marked UNRESOLVED.

<!-- UNRESOLVED: PN-HY501 model name not stated in source manual (generic projector command reference). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code default values not stated. -->
<!-- UNRESOLVED: input terminal / aspect / base model type / sub-input / eco-mode enum tables live in source Appendix not included here. -->
<!-- UNRESOLVED: serial flow-control scheme not named (only "Full duplex" stated). -->
<!-- UNRESOLVED: no authentication or login procedure described; auth.type inferred as none. -->
<!-- UNRESOLVED: wireless LAN command transport specifics deferred to wireless-LAN-unit operation manual. -->

---

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:35:25.529Z
last_checked_at: 2026-06-18T09:08:15.519Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:08:15.519Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state PN-HY501 model name explicitly (generic projector manual); model supplied by operator. Input terminal enum values, aspect values, base model type values, sub-input values, and eco mode values reference an Appendix (\"Supplementary Information by Command\") not included in the refined source."
- "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
- "enum table not in refined source\""
- "enum in source Appendix\""
- "enum in source Appendix 'Supplementary Information by Command'\""
- "lamp usage time, filter usage time, lamp remaining life, carbon savings, gain parameter ranges,"
- "numeric ranges/default values require runtime GAIN PARAMETER REQUEST 3 query; not statically stated in source"
- "source does not document any unsolicited notifications; device appears strictly request/response."
- "source does not describe multi-step sequences."
- "source contains no explicit safety interlock procedures or power-on sequencing beyond the"
- "PN-HY501 model name not stated in source manual (generic projector command reference)."
- "firmware version compatibility not stated."
- "ID1 control ID and ID2 model code default values not stated."
- "input terminal / aspect / base model type / sub-input / eco-mode enum tables live in source Appendix not included here."
- "serial flow-control scheme not named (only \"Full duplex\" stated)."
- "no authentication or login procedure described; auth.type inferred as none."
- "wireless LAN command transport specifics deferred to wireless-LAN-unit operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
