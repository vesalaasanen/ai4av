---
spec_id: admin/sharp-nec-pn-cd701
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-CD701 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-CD701
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-CD701
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:52:40.346Z
last_checked_at: 2026-06-18T09:05:38.744Z
generated_at: 2026-06-18T09:05:38.744Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc titled generically as \"Projector Control Command Reference Manual\"; PN-CD701 model name not confirmed verbatim inside source text. Firmware compatibility, voltage/power specs, and wireless LAN details not stated."
  - "flow_control not stated (full-duplex comms mode stated)"
  - "no discrete settable parameter registry beyond actions; gain/value"
  - "source documents no unsolicited notifications; protocol is"
  - "no multi-step sequences described in source."
  - "model name \"PN-CD701\" supplied by operator; not found verbatim in source text (source is a generic projector command reference). Confirm against device label."
  - "firmware version compatibility not stated."
  - "flow_control not stated (full-duplex mode stated only)."
  - "Appendix value tables (input terminals, aspect, eco mode, base model types) not present in source excerpt — param enums incomplete."
  - "voltage / power / lamp wattage specs not in this source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:05:38.744Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-CD701 Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Binary framed command protocol with hex opcodes, checksum bytes, and ID1/ID2 addressing. Source document is "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Device named per task input as PN-CD701.

<!-- UNRESOLVED: source doc titled generically as "Projector Control Command Reference Manual"; PN-CD701 model name not confirmed verbatim inside source text. Firmware compatibility, voltage/power specs, and wireless LAN details not stated. -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP). Both emitted.
# Command/response framing: leading byte 20h/22h/etc = 20h + command-type;
# frame = <hdr> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>. ID1=control ID set on
# projector; ID2=model code (varies by model). CKS = low byte of sum of all
# preceding bytes. Short command lines in source omit header+ID1/ID2 (checksum
# already included as last byte); full frame adds 20h.. header and ID bytes.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated: "Use TCP port number 7142"
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated (full-duplex comms mode stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST gain controls present
  - routable     # inferred: INPUT SW CHANGE input switching present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response DATA01-DATA12 bitfield error info (0=normal,1=error)."

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
        description: "Input terminal code (e.g. 06h=video). Full list in Appendix."
    notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix)"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "96h for LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high 8 bits)"

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
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "01h=usage time(sec), 04h=remaining life(%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total, 01h=During operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: integer
        description: "Key code high byte"

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
        description: "06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=plus,81h=minus,FDh=-0.25s,FEh=-0.5s,FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop, else target"
      - name: DATA02
        type: integer
        description: "00h=absolute,02h=relative"
      - name: DATA03
        type: integer
        description: "Value (low 8 bits)"
      - name: DATA04
        type: integer
        description: "Value (high 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "00h=OFF,01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Profile1,01h=Profile2"

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
        description: "00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"

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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze ON,02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "03h=Horizontal sync freq,04h=Vertical sync freq"

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

  - id: pip_pictuer_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

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
        description: "Eco mode value (see Appendix)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, DATA01-DATA16)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (see Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF,01h=ON"

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
        description: "Input terminal (see Appendix)"
      - name: DATA02
        type: integer
        description: "00h=terminal in DATA01,01h=BNC,02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing: success ack = A<hdr+cmdtype>h <cmd> <ID1><ID2> <LEN> <DATA> <CKS>;
# error response = A0h.. with <ERR1><ERR2>. Verbatim frames per command:
feedbacks:
  - id: error_status_response
    command: "009"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"
    type: bitfield
    description: "DATA01-12 error bits (0=normal,1=error)."

  - id: power_on_ack
    command: "015"
    response: "22h 00h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: power_off_ack
    command: "016"
    response: "22h 01h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: input_sw_change_ack
    command: "018"
    response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
    type: ack
    description: "DATA01=FFh means ended with error (no switch)."

  - id: picture_mute_on_ack
    command: "020"
    response: "22h 10h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: picture_mute_off_ack
    command: "021"
    response: "22h 11h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: sound_mute_on_ack
    command: "022"
    response: "22h 12h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: sound_mute_off_ack
    command: "023"
    response: "22h 13h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: onscreen_mute_on_ack
    command: "024"
    response: "22h 14h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: onscreen_mute_off_ack
    command: "025"
    response: "22h 15h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: picture_adjust_result
    command: "030-1"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: enum
    description: "DATA01-02=0000h success, else error."

  - id: volume_adjust_result
    command: "030-2"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: enum

  - id: aspect_adjust_result
    command: "030-12"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: enum

  - id: other_adjust_result
    command: "030-15"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: enum

  - id: information_response
    command: "037"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01> - <DATA98> <CKS>"
    type: struct
    description: "DATA01-49 projector name; DATA83-86 lamp usage(sec); DATA87-90 filter usage(sec)."

  - id: filter_usage_response
    command: "037-3"
    response: "23h 95h <ID1> <ID2> 08h <DATA01> - <DATA08> <CKS>"
    type: struct

  - id: lamp_information_response
    command: "037-4"
    response: "23h 96h <ID1> <ID2> 06h <DATA01> - <DATA06> <CKS>"
    type: struct

  - id: carbon_savings_response
    command: "037-6"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01> - <DATA09> <CKS>"
    type: struct

  - id: remote_key_code_ack
    command: "050"
    response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"
    type: ack
    description: "DATA01=FFh = ended with error."

  - id: shutter_close_ack
    command: "051"
    response: "22h 16h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: shutter_open_ack
    command: "052"
    response: "22h 17h <ID1> <ID2> 00h <CKS>"
    type: ack

  - id: lens_control_ack
    command: "053"
    response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"
    type: ack

  - id: lens_control_request_response
    command: "053-1"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> - <DATA07> <CKS>"
    type: struct

  - id: lens_control_2_ack
    command: "053-2"
    response: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: lens_memory_control_ack
    command: "053-3"
    response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: reference_lens_memory_control_ack
    command: "053-4"
    response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: lens_memory_option_request_response
    command: "053-5"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: struct

  - id: lens_memory_option_set_ack
    command: "053-6"
    response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: lens_information_response
    command: "053-7"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    type: bitfield

  - id: lens_profile_set_ack
    command: "053-10"
    response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: lens_profile_request_response
    command: "053-11"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: struct

  - id: gain_parameter_response
    command: "060-1"
    response: "23h 05h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    type: struct

  - id: setting_response
    command: "078-1"
    response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
    type: struct

  - id: running_status_response
    command: "078-2"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    type: struct
    description: "DATA03 power status; DATA06 operation status."

  - id: input_status_response
    command: "078-3"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    type: struct

  - id: mute_status_response
    command: "078-4"
    response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
    type: struct

  - id: model_name_response
    command: "078-5"
    response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
    type: string

  - id: cover_status_response
    command: "078-6"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    type: enum
    description: "00h=normal(open),01h=closed."

  - id: freeze_control_ack
    command: "079"
    response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    type: ack

  - id: information_string_response
    command: "084"
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02> - <DATA??> <CKS>"
    type: string

  - id: eco_mode_response
    command: "097-8"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    type: enum

  - id: lan_projector_name_response
    command: "097-45"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01> - <DATA17> <CKS>"
    type: string

  - id: lan_mac_address_response
    command: "097-155"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> - <DATA06> <CKS>"
    type: struct

  - id: pip_pbp_response
    command: "097-198"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    type: struct

  - id: edge_blending_mode_response
    command: "097-243-1"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    type: enum

  - id: eco_mode_set_ack
    command: "098-8"
    response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    type: ack

  - id: lan_projector_name_set_ack
    command: "098-45"
    response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    type: ack

  - id: pip_pbp_set_ack
    command: "098-198"
    response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    type: ack

  - id: edge_blending_mode_set_ack
    command: "098-243-1"
    response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    type: ack

  - id: base_model_type_response
    command: "305-1"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01> - <DATA15> <CKS>"
    type: struct

  - id: serial_number_response
    command: "305-2"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01> - <DATA16> <CKS>"
    type: string

  - id: basic_information_response
    command: "305-3"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01> - <DATA15> <CKS>"
    type: struct

  - id: audio_select_set_ack
    command: "319-10"
    response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
    type: ack
    description: "DATA02: 00h=success,01h=error."

  # Generic error response (applies to all commands):
  - id: command_error
    response: "A<hdr>h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    type: enum
    description: "ERR1/ERR2 error code combo (see Notes)."
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameter registry beyond actions; gain/value
# ranges are returned dynamically via 060-1 GAIN PARAMETER REQUEST 3. Remove if
# not applicable.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; protocol is
# request/response only.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    rule: "No other command accepted while power-on in progress."
  - command: "016. POWER OFF"
    rule: "No other command accepted during power-off including cooling time."
  - command: "053. LENS CONTROL"
    rule: "Continuous drive (7Fh/81h) must be stopped by sending 00h."
# Source error code 02h 0Dh: "command cannot be accepted because power is off"
# implies power-state interlock on most commands. Not enumerated per-command.
```

## Notes
- Framing: full command frame = `<20h + cmdtype> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = control ID set on projector; ID2 = model code (varies by model). CKS = low-order byte of sum of all preceding bytes (example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- The short command strings in the Actions section are copied verbatim from the source; they include the trailing checksum byte but omit the leading header byte and ID1/ID2, exactly as the source prints them.
- Error codes (ERR1/ERR2): 00h/00h=unrecognized; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 02h/0Dh=power off; 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h-03h/02h=gain errors (full list in source §2.4).
- Lamp/filter usage returned in seconds, updated at 1-minute intervals. Lamp remaining life (%) can be negative if replacement deadline exceeded.
- Wireless LAN: see separate wireless LAN unit operation manual (not in this source).
- Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco mode values, sub input values, base model types) is referenced but NOT included in this refined source excerpt.

<!-- UNRESOLVED: model name "PN-CD701" supplied by operator; not found verbatim in source text (source is a generic projector command reference). Confirm against device label. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow_control not stated (full-duplex mode stated only). -->
<!-- UNRESOLVED: Appendix value tables (input terminals, aspect, eco mode, base model types) not present in source excerpt — param enums incomplete. -->
<!-- UNRESOLVED: voltage / power / lamp wattage specs not in this source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:52:40.346Z
last_checked_at: 2026-06-18T09:05:38.744Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:05:38.744Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc titled generically as \"Projector Control Command Reference Manual\"; PN-CD701 model name not confirmed verbatim inside source text. Firmware compatibility, voltage/power specs, and wireless LAN details not stated."
- "flow_control not stated (full-duplex comms mode stated)"
- "no discrete settable parameter registry beyond actions; gain/value"
- "source documents no unsolicited notifications; protocol is"
- "no multi-step sequences described in source."
- "model name \"PN-CD701\" supplied by operator; not found verbatim in source text (source is a generic projector command reference). Confirm against device label."
- "firmware version compatibility not stated."
- "flow_control not stated (full-duplex mode stated only)."
- "Appendix value tables (input terminals, aspect, eco mode, base model types) not present in source excerpt — param enums incomplete."
- "voltage / power / lamp wattage specs not in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
