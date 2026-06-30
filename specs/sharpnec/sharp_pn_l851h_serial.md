---
spec_id: admin/sharp-nec-pn-l851h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-L851H Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC PN-L851H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC PN-L851H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:02:43.014Z
last_checked_at: 2026-06-18T09:08:17.757Z
generated_at: 2026-06-18T09:08:17.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command manual (lamp, lens, shutter, edge-blending features); whether every command applies to the PN-L851H large-format display is not confirmed. Firmware compatibility not stated."
  - "full success-response byte layouts for 030-*/053-*/084/097-* not exhaustively mirrored here; see source sections 3.11-3.53."
  - "source documents no explicit safety warnings or interlock procedures."
  - "firmware version compatibility not stated in source."
  - "full ID2 (model code) value for PN-L851H not stated in source."
  - "Appendix input-terminal / eco-mode / sub-input value tables not present in refined source."
  - "whether all projector-centric commands (lamp, shutter, lens, edge-blending) apply to PN-L851H is unconfirmed."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:08:17.757Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-L851H Control Spec

## Summary
Control spec for the Sharp/NEC PN-L851H based on the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device exposes a binary hex-framed control protocol over both RS-232C serial and TCP/IP (LAN) transports. Every command carries a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). Covers power, input switching, mute, picture/volume/aspect adjust, shutter, lens control & memory, status/information queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: source is a generic projector command manual (lamp, lens, shutter, edge-blending features); whether every command applies to the PN-L851H large-format display is not confirmed. Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; no explicit flow-control field
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth/login procedure in source
```

**Frame format:** `20h/02h/03h/01h/00h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>`. IDs: ID1 = projector control ID; ID2 = model code (model-dependent). CKS = low-order byte of sum of all preceding bytes. Commands/parameters expressed in hex notation in source.

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015/016)
  - queryable    # inferred: many status/information request commands
  - levelable    # inferred: PICTURE/VOLUME/ASPECT/GAIN adjust commands
  - routable     # inferred: INPUT SW CHANGE (018), audio select (319-10)
```

## Actions
```yaml
# CKS field = checksum (computed). DATA?? and CKS are variable/computed per frame.
# Hex notation preserved verbatim from source.

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
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte. e.g. 06h = video port. See Appendix 'Supplementary Information by Command' in source for full table."

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
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. See Appendix 'Supplementary Information by Command' in source."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST."
    - name: data02
      type: integer
      description: "Target low byte: FFh for LAMP/LIGHT ADJUST."
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
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
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 02h=POWER ON, 03h=POWER OFF, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: data02
      type: integer
      description: "Key code high byte (00h for all listed keys)."

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
      description: "Lens target. e.g. 06h=Periphery Focus. Full target table not fully enumerated in source."
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target to query."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target. FFh=Stop (mode/value ignored)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
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
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET. Operates on profile selected via 053-10."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

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
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST."

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
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

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
      type: integer
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
      type: integer
      description: "Eco mode value. See Appendix 'Supplementary Information by Command' in source."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: integer
      description: "Setting value (varies by DATA01). For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

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
      type: integer
      description: "Input terminal. See Appendix 'Supplementary Information by Command' in source."
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Response frames follow pattern: A0h/A1h/A2h/A3h <CMD> <ID1> <ID2> <LEN> <ERR1> <ERR2> <CKS>
# (failure) or with DATA on success. Each query command above has a matching
# success-response shape documented in source. Key response payloads:

- id: error_status_response
  type: bitmask
  source_command: error_status_request
  description: "DATA01-DATA12 error bitmap. Bit=0 normal, Bit=1 error. Covers cover/fan/temp/power/lamp/formatter/mirror-cover/iris/lens errors; DATA09 extended status (interlock switch open, system errors)."

- id: power_status
  type: enum
  values: [standby, power_on]
  source_command: running_status_request
  description: "DATA03 of 078-2 response: 00h=Standby, 01h=Power on, FFh=Not supported."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source_command: running_status_request
  description: "DATA06 of 078-2 response: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

- id: mute_status
  type: object
  source_command: mute_status_request
  description: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (each 00h=Off/01h=On)."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source_command: cover_status_request
  description: "DATA01 of 078-6: 00h=Normal(cover opened), 01h=Cover closed."

- id: lamp_usage_time
  type: integer
  unit: seconds
  source_command: lamp_information_request_3
  description: "DATA03-DATA06. Updated at one-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  source_command: lamp_information_request_3
  description: "DATA03-DATA06 when content=04h. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  source_command: filter_usage_information_request
  description: "DATA01-DATA04. '-1' if undefined."

- id: model_name
  type: string
  source_command: model_name_request
  description: "DATA01-DATA32 NUL-terminated."

- id: serial_number
  type: string
  source_command: serial_number_request
  description: "DATA01-DATA16 NUL-terminated."

- id: mac_address
  type: string
  source_command: lan_mac_address_status_request2
  description: "DATA01-DATA06 (6 bytes)."

- id: eco_mode
  type: raw
  source_command: eco_mode_request
  description: "DATA01. Value set for eco/light/lamp mode. See Appendix."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source_command: edge_blending_mode_request

# UNRESOLVED: full success-response byte layouts for 030-*/053-*/084/097-* not exhaustively mirrored here; see source sections 3.11-3.53.
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions above (picture/volume/
# aspect/gain/lens/eco/PIP/edge-blend/audio). No additional standalone variable model
# is stated separately in the source.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are command-initiated.
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents no explicit safety warnings or interlock procedures.
# Notes from source relevant to sequencing (not safety interlocks per se):
#  - POWER ON (015): no other command accepted while power-on in progress.
#  - POWER OFF (016): no other command accepted during power-off incl. cooling time.
#  - Error status (009) bitmaps report interlock-switch-open and cover errors, but
#    no command-level interlock procedure is documented.
```

## Notes
- Binary hex-framed protocol. All bytes written in source as `NNh` notation; CKS is computed (low-order byte of sum of all preceding bytes).
- Two identifiers required per frame: ID1 (control ID set on projector) and ID2 (model code, model-dependent).
- Serial supports baud rates 115200/38400/19200/9600/4800 (device auto-configures per software settings); 8 data bits, no parity, 1 stop bit, full duplex.
- TCP command port fixed at 7142.
- Remote key code (050) key table is large; see source section 3.19 Table "Key code list" for the full set (sample values captured in action params).
- Input-terminal, base-model-type, eco-mode, and sub-input value tables are referenced to an Appendix ("Supplementary Information by Command") not included in this refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full ID2 (model code) value for PN-L851H not stated in source. -->
<!-- UNRESOLVED: Appendix input-terminal / eco-mode / sub-input value tables not present in refined source. -->
<!-- UNRESOLVED: whether all projector-centric commands (lamp, shutter, lens, edge-blending) apply to PN-L851H is unconfirmed. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:02:43.014Z
last_checked_at: 2026-06-18T09:08:17.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:08:17.757Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command manual (lamp, lens, shutter, edge-blending features); whether every command applies to the PN-L851H large-format display is not confirmed. Firmware compatibility not stated."
- "full success-response byte layouts for 030-*/053-*/084/097-* not exhaustively mirrored here; see source sections 3.11-3.53."
- "source documents no explicit safety warnings or interlock procedures."
- "firmware version compatibility not stated in source."
- "full ID2 (model code) value for PN-L851H not stated in source."
- "Appendix input-terminal / eco-mode / sub-input value tables not present in refined source."
- "whether all projector-centric commands (lamp, shutter, lens, edge-blending) apply to PN-L851H is unconfirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
