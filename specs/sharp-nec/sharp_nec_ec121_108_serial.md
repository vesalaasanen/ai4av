---
spec_id: admin/sharp-nec-ec121-108
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC Ec121 108 Control Spec"
manufacturer: Sharp-NEC
model_family: "Ec121 108"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "Ec121 108"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-27T18:08:43.990Z
last_checked_at: 2026-10-07T12:55:00.237Z
generated_at: 2026-10-07T12:55:00.237Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is a refined excerpt; the \"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco mode values, sub input values, base model types) is not present, so several parameter value ranges are unresolved. Model name does not appear inside the source text itself; taken from input metadata."
  - "device-selectable - source states supported set 115200/38400/19200/9600/4800 bps; set PC software to match projector"
  - "not stated in communication conditions table (RTS/CTS pins are wired in the cable pinout)"
  - "source does not state an authentication method"
  - "input terminal value table (appendix) not in source"
  - "aspect value table (appendix) not in source"
  - "DATA01 target list appears truncated in refined source (only 06h shown)"
  - "DATA01 target values not stated in source"
  - "eco mode value list (appendix) not in source"
  - "eco mode value table (appendix) not in source"
  - "sub input setting value table (appendix) not in source"
  - "base model type value list (appendix) not in source"
  - "base model type value table (appendix) not in source"
  - "none - section not applicable for this source."
  - "source contains no explicit safety warnings or interlock procedures."
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, PIP/PbP sub input values, base model type values) not present in refined source."
  - "053 LENS CONTROL DATA01 target list truncated in refined source (only 06h Periphery Focus shown)."
  - "053-1 LENS CONTROL REQUEST DATA01 selector values not stated."
  - "serial flow control setting not stated; baud rate is a selectable set, not a single fixed value."
  - "firmware version compatibility and protocol version not stated (document revision BDT140013 Rev 7.1 is a document version, not firmware)."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:55:00.237Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match the source's 53-command list with correct opcode frames; transport values are supported, and the spec has no unsupported auth claim. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Sharp-NEC Ec121 108 Control Spec

## Summary
Control spec for the Sharp-NEC Ec121 108 projector, covering RS-232C serial control (PC CONTROL port, D-SUB 9P) and wired/wireless LAN control (TCP port 7142), based on the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The protocol is a binary hex command/response framing with checksum; ~53 commands cover power, input switching, mutes, picture/volume/lens adjustment, lens memory, status queries, and network settings.

<!-- UNRESOLVED: source document is a refined excerpt; the "Supplementary Information by Command" appendix (input terminal values, aspect values, eco mode values, sub input values, base model types) is not present, so several parameter value ranges are unresolved. Model name does not appear inside the source text itself; taken from input metadata. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: device-selectable - source states supported set 115200/38400/19200/9600/4800 bps; set PC software to match projector
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in communication conditions table (RTS/CTS pins are wired in the cable pinout)
  communication_mode: full_duplex  # stated as "Full duplex"
addressing:
  port: 7142  # stated: 'Use TCP port number "7142" for sending and receiving commands'
auth:
  type: UNRESOLVED  # UNRESOLVED: source does not state an authentication method
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: extensive REQUEST commands returning state
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL present
  - routable     # inferred: INPUT SW CHANGE input switching present
```

## Actions
```yaml
# Command frame: all commands carry a trailing checksum (CKS) = low-order byte of the sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (varies by model). Both appear in responses, not in commands.
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

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value; source example: 06h = Video port. Full value list lives in appendix not present in source"
    # UNRESOLVED: input terminal value table (appendix) not in source
    # Worked example from source: "02h 03h 00h 00h 02h 01h 06h 0Eh" (switch to video)

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
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    # Source examples: brightness=10 → "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"; brightness=-10 → "03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    # Source example: volume=10 → "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Value set for the aspect; value list lives in appendix not present in source"
    # UNRESOLVED: aspect value table (appendix) not in source

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target part 1: 96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Adjustment target part 2: FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
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
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    # Source example: lamp usage time → "03h 96h 00h 00h 02h 00h 01h 9Ch"

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
        description: "Key code low byte (WORD type); see key code list in Notes"
      - name: DATA02
        type: integer
        description: "Key code high byte; 00h for all keys in the documented list"
    # Source example: key "AUTO" → "02h 0Fh 00h 00h 02h 05h 00h 18h"

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
        description: "Lens target; only 06h=Periphery Focus documented in source"
      - name: DATA02
        type: integer
        description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive plus, 81h=drive minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    # UNRESOLVED: DATA01 target list appears truncated in refined source (only 06h shown)

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens adjustment target selector; value list not stated in source"
    # UNRESOLVED: DATA01 target values not stated in source

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop (mode/value not referenced when Stop)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
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
        description: "00h=MOVE, 01h=STORE, 02h=RESET (acts on profile selected via LENS PROFILE SET)"

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

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    # Source example: brightness → "03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

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
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    # UNRESOLVED: eco mode value list (appendix) not in source

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
        description: "Value set for the eco mode; value list lives in appendix not present in source"
    # UNRESOLVED: eco mode value table (appendix) not in source

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01-DATA16
        type: string
        description: "Projector name (up to 16 bytes)"

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
        description: "MODE: 00h=PIP, 01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values live in appendix not present in source"
    # UNRESOLVED: sub input setting value table (appendix) not in source

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    # UNRESOLVED: base model type value list (appendix) not in source

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
        description: "Input terminal value; value list lives in appendix not present in source"
      - name: DATA02
        type: integer
        description: "00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    # UNRESOLVED: input terminal value table (appendix) not in source
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "12 data bytes from 009; bit=1 means error: cover, fan, temperature (bi-metal/sensor/dust), power, lamp off/replacement moratorium/usage time exceeded/data error/not present, formatter, ballast comms, iris calibration, lens not installed, foreign matter sensor, mirror cover, system errors, interlock switch open, portrait cover side up"
  - id: power_status
    type: enum
    values: [standby, power_on, not_supported]
    description: "078-2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"
  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    description: "078-2 DATA04"
  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    description: "078-2 DATA05"
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
  - id: signal_switch_process
    type: enum
    values: [not_executed, during_execution]
    description: "078-3 DATA01"
  - id: signal_list_number
    type: integer
    description: "078-3 DATA02, returned value is practical number minus 1; 00h-C7h; FFh=not supported"
  - id: selected_input
    type: enum
    description: "078-3 DATA03/DATA04 and 305-3: type1 01h-05h = 1-5; type2 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input"
  - id: displayed_content
    type: enum
    values: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_switching]
    description: "078-3 DATA09 / 305-3 DATA02"
  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA01 / 305-3 DATA06"
  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA02 / 305-3 DATA07"
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA03 / 305-3 DATA08"
  - id: forced_onscreen_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA04"
  - id: freeze_state
    type: enum
    values: [off, on]
    description: "305-3 DATA09"
  - id: display_signal_type
    type: enum
    description: "305-3 DATA05: NTSC3.58, NTSC4.43, PAL, PAL60, SECAM, B/W60, B/W50, PALNM, NTSC3.58 LBX, NTSC3.58 SQZ, COMPONENT(60Hz), COMPONENT(50Hz), Unknown, NTSC, PAL-M, PAL-L, FFh=Not Video Input"
  - id: model_name
    type: string
    description: "078-5, NUL-terminated"
  - id: cover_status
    type: enum
    values: [normal_open, cover_closed]
    description: "078-6 DATA01: 00h=Normal (cover opened), 01h=Cover closed"
  - id: lamp_usage_time
    type: integer
    description: "037 DATA83-86 / 037-4, seconds; updated at one-minute intervals"
  - id: lamp_remaining_life
    type: integer
    description: "037-4 content 04h, percent; negative if replacement deadline exceeded; reflects eco mode"
  - id: filter_usage_time
    type: integer
    description: "037 DATA87-90 / 037-3 DATA01-04, seconds; -1 if no time defined"
  - id: filter_alarm_start_time
    type: integer
    description: "037-3 DATA05-08, seconds; -1 if undefined"
  - id: carbon_savings
    type: number
    description: "037-6: kg (max 99999) + mg (max 999999) parts"
  - id: eco_mode_value
    type: integer
    description: "097-8; value meanings in appendix not present in source"
    # UNRESOLVED: eco mode value table (appendix) not in source
  - id: projector_name_lan
    type: string
    description: "097-45, NUL-terminated"
  - id: mac_address
    type: string
    description: "097-155, 6 bytes"
  - id: pip_pbp_setting
    type: enum
    description: "097-198: MODE 00h=PIP/01h=PICTURE BY PICTURE; START POSITION 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub input values UNRESOLVED (appendix missing)"
  - id: edge_blending_state
    type: enum
    values: [off, on]
    description: "097-243-1 DATA01"
  - id: lens_position
    type: object
    description: "053-1: upper limit, lower limit, current value (16-bit each)"
  - id: lens_operation_status
    type: bitmask
    description: "053-7 DATA01: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift (H), bit4 lens shift (V) - 0=Stop, 1=During operation"
  - id: lens_memory_option
    type: enum
    values: [off, on]
    description: "053-5 per option LOAD BY SIGNAL / FORCED MUTE"
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "053-11 DATA01: 00h=Profile 1, 01h=Profile 2"
  - id: gain_parameter
    type: object
    description: "060-1: status, upper/lower limit, default, current value, wide/narrow adjustment width (16-bit each), default validity"
  - id: sound_function_available
    type: boolean
    description: "078-1 DATA04: 00h=not available, 01h=available"
  - id: setting_profile_number
    type: enum
    values: [not_available, clock_function, sleep_timer_function, clock_and_sleep_timer]
    description: "078-1 DATA05"
  - id: sync_frequency_string
    type: string
    description: "084: horizontal/vertical synchronous frequency info string (NUL-terminated)"
  - id: base_model_type
    type: integer
    description: "305-1; value meanings in appendix not present in source"
    # UNRESOLVED: base model type value table (appendix) not in source
  - id: serial_number
    type: string
    description: "305-2, NUL-terminated"
  - id: command_error
    type: enum
    description: "Error response Axh <ERR1> <ERR2> - see error code list in Notes"
```

## Variables
```yaml
# All settable parameters are modeled as Actions (see 030-1/030-2/030-12/030-15, 053-* lens
# commands, 079, 098-*, 319-10). No additional settable parameters outside discrete actions.
# UNRESOLVED: none - section not applicable for this source.
```

## Events
```yaml
# Source documents no unsolicited notifications; all feedback is response to a request.
# UNRESOLVED: none - section not applicable for this source.
```

## Macros
```yaml
# Source documents no multi-step sequences.
# UNRESOLVED: none - section not applicable for this source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# (Error status bit "interlock switch is open" is a reported condition, not a procedure.)
```

## Notes
- Source: "Projector Control Command Reference Manual", BDT140013 Revision 7.1 (Sharp/NEC projector command protocol). Protocol identical over serial (PC CONTROL, D-SUB 9P cross cable) and LAN (TCP 7142).
- Serial settings: 8 data bits, no parity, 1 stop bit, full duplex; baud selectable among 115200/38400/19200/9600/4800 bps.
- Framing: command first byte 00h-03h (block), responses echo block with high bit patterns 2xh (success) / Axh (error) plus `<ID1> <ID2>` (control ID, model code), LEN, data, CKS.
- Checksum: sum all preceding bytes, use low-order byte. Example: `20h 81h 01h 60h 01h 00h` → 103h → CKS = 03h.
- Error codes (ERR1/ERR2): 00/00 command not recognized; 00/01 not supported by model; 01/00 invalid value; 01/01 invalid input terminal; 01/02 invalid language; 02/00 memory allocation error; 02/02 memory in use; 02/03 value cannot be set; 02/04 forced onscreen mute on; 02/06 viewer error; 02/07 no signal; 02/08 test pattern/filter displayed; 02/09 no PC card; 02/0A memory operation error; 02/0C entry list displayed; 02/0D power is off; 02/0E execution failed; 02/0F no authority; 03/00 wrong gain number; 03/01 invalid gain; 03/02 adjustment failed.
- Timing: during POWER ON and POWER OFF (including cooling time) no other command is accepted. Lamp/filter usage times update at one-minute intervals.
- Mute side effects: picture/onscreen mute clear on input or video signal switch; sound mute also clears on volume adjustment.
- Lens driving: after 7Fh/81h continuous drive, send 00h to stop; while lens is driving, issuing same command adjusts without stop.
- 053 LENS CONTROL 2: when DATA01=FFh (Stop), mode/value bytes are ignored.
- 078-3 signal list number returned as practical value minus 1.
- Lamp remaining life goes negative when replacement deadline exceeded; lamp values reflect eco mode.
- Remote key code list (key code / DATA01 DATA02 / name): 2=02h 00h POWER ON; 3=03h 00h POWER OFF; 5=05h 00h AUTO; 6=06h 00h MENU; 7=07h 00h UP; 8=08h 00h DOWN; 9=09h 00h RIGHT; 10=0Ah 00h LEFT; 11=0Bh 00h ENTER; 12=0Ch 00h EXIT; 13=0Dh 00h HELP; 15=0Fh 00h MAGNIFY UP; 16=10h 00h MAGNIFY DOWN; 19=13h 00h MUTE; 41=29h 00h PICTURE; 75=4Bh 00h COMPUTER1; 76=4Ch 00h COMPUTER2; 79=4Fh 00h VIDEO1; 81=51h 00h S-VIDEO1; 132=84h 00h VOLUME UP; 133=85h 00h VOLUME DOWN; 138=8Ah 00h FREEZE; 163=A3h 00h ASPECT; 215=D7h 00h SOURCE; 238=EEh 00h LAMP MODE/ECO.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, PIP/PbP sub input values, base model type values) not present in refined source. -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 target list truncated in refined source (only 06h Periphery Focus shown). -->
<!-- UNRESOLVED: 053-1 LENS CONTROL REQUEST DATA01 selector values not stated. -->
<!-- UNRESOLVED: serial flow control setting not stated; baud rate is a selectable set, not a single fixed value. -->
<!-- UNRESOLVED: firmware version compatibility and protocol version not stated (document revision BDT140013 Rev 7.1 is a document version, not firmware). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-27T18:08:43.990Z
last_checked_at: 2026-10-07T12:55:00.237Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:55:00.237Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match the source's 53-command list with correct opcode frames; transport values are supported, and the spec has no unsupported auth claim. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is a refined excerpt; the \"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco mode values, sub input values, base model types) is not present, so several parameter value ranges are unresolved. Model name does not appear inside the source text itself; taken from input metadata."
- "device-selectable - source states supported set 115200/38400/19200/9600/4800 bps; set PC software to match projector"
- "not stated in communication conditions table (RTS/CTS pins are wired in the cable pinout)"
- "source does not state an authentication method"
- "input terminal value table (appendix) not in source"
- "aspect value table (appendix) not in source"
- "DATA01 target list appears truncated in refined source (only 06h shown)"
- "DATA01 target values not stated in source"
- "eco mode value list (appendix) not in source"
- "eco mode value table (appendix) not in source"
- "sub input setting value table (appendix) not in source"
- "base model type value list (appendix) not in source"
- "base model type value table (appendix) not in source"
- "none - section not applicable for this source."
- "source contains no explicit safety warnings or interlock procedures."
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, PIP/PbP sub input values, base model type values) not present in refined source."
- "053 LENS CONTROL DATA01 target list truncated in refined source (only 06h Periphery Focus shown)."
- "053-1 LENS CONTROL REQUEST DATA01 selector values not stated."
- "serial flow control setting not stated; baud rate is a selectable set, not a single fixed value."
- "firmware version compatibility and protocol version not stated (document revision BDT140013 Rev 7.1 is a document version, not firmware)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
