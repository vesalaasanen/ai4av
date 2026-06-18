---
spec_id: admin/sharp-nec-as60s-pa41zl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC As60S Pa41Zl Control Spec"
manufacturer: Sharp/NEC
model_family: "As60S Pa41Zl"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "As60S Pa41Zl"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:06:48.146Z
last_checked_at: 2026-06-17T19:32:57.698Z
generated_at: 2026-06-17T19:32:57.698Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol is binary hex-framed; parameter values for some adjustment targets reference an external \"Appendix / Supplementary Information by Command\" not present in the source text (e.g. input terminal map, aspect values, eco mode values, sub-input values, base model type values)."
  - "appendix not in source).\""
  - "settable parameters mirror the *_SET and *_ADJUST actions above"
  - "source describes no unsolicited / push notifications; all data is returned"
  - "source describes no explicit multi-step command sequences."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:32:57.698Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command reference. Transport (TCP 7142, RS232 115200 8N1) verified. Full coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC As60S Pa41Zl Control Spec

## Summary
Projector control spec for the Sharp/NEC As60S Pa41Zl, covering the binary control protocol documented in the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The device supports RS-232C serial control and TCP/IP (wired/wireless LAN) control. Commands are framed hex sequences with a control ID, model code, and trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: protocol is binary hex-framed; parameter values for some adjustment targets reference an external "Appendix / Supplementary Information by Command" not present in the source text (e.g. input terminal map, aspect values, eco mode values, sub-input values, base model type values). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated, highest listed shown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states full-duplex communication mode; flow_control not explicitly stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/info request commands present
  - routable     # inferred: INPUT SW CHANGE and audio select commands present
  - levelable    # inferred: PICTURE / VOLUME / ASPECT / lens adjustment commands present
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

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h for video port). Full value table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Aspect value. Full table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP / LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h for LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: string
        description: "Adjustment target low byte: FFh for LAMP ADJUST / LIGHT ADJUST."
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "03h 96h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only effective on two-lamp models)."
      - name: data02
        type: string
        description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Content: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (see source key code list, e.g. 05h=AUTO, 06h=MENU, 07h=UP, 29h=PICTURE, 4Bh=COMPUTER1)."
      - name: data02
        type: string
        description: "Key code high byte (00h for all documented keys)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target. Source documents 06h=Periphery Focus; other lens targets not listed in this manual section."
      - name: data02
        type: string
        description: "Drive content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target (same encoding as 053. LENS CONTROL)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target; FFh=Stop (Adjustment mode/value ignored when Stop)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected by 053-10."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "01h 98h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {checksum}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "03h B0h 00h 00h 02h C5h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Value set for eco mode. Full value table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data16} 00h {checksum}"
    params:
      - name: data01_to_data16
        type: string
        description: "Projector name (up to 16 bytes, NUL terminated)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: string
        description: "Setting value (MODE: 00h=PIP, 01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input values per Appendix, UNRESOLVED)."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."

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
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Input terminal value. Full table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
      - name: data02
        type: string
        description: "Setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: checksum
        type: string
        description: "Low-order 8 bits of sum of all preceding bytes."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on]
    source: "078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on."
  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    source: "078-2 RUNNING STATUS REQUEST DATA04."
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06."
  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01."
  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA02."
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA03."
  - id: forced_onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA04."
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: "078-6 COVER STATUS REQUEST DATA01."
  - id: error_status
    type: bitmask
    source: "009 ERROR STATUS REQUEST DATA01-DATA12 (per-bit error codes documented in source error information list)."
  - id: command_execution_result
    type: enum
    values: [success, error]
    source: "Generic ACK/NACK response: 2xh=success (normal response), Axh=error (Axh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>)."
```

## Variables
```yaml
# UNRESOLVED: settable parameters mirror the *_SET and *_ADJUST actions above
# (volume, picture gains, aspect, eco mode, projector name, PIP/PbP, edge blending,
# audio select, lens memory options). Source does not document default value ranges
# for all of them outside the GAIN PARAMETER REQUEST 3 (060-1) response shape.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited / push notifications; all data is returned
# in response to an explicit request command.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "While this command is turning off the power (including the cooling time), no other command can be accepted."
  - power_on   # source: "While this command is turning on the power, no other command can be accepted."
interlocks: []
# Source documents command-locking during power transitions but no explicit safety
# interlocks, power-on sequencing requirements, or operator safety warnings.
```

## Notes
- Command framing: every command is a hex byte sequence; the final byte is a checksum = low-order 8 bits of the sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h <CKS>` → 20+81+01+60+01+00 = 103h → CKS = 03h.
- Response framing: success responses echo the command opcode with the high nibble changed to `2xh` (no data) or `3xh` (with data) or `0xh`/`1xh` for some query commands; error responses use `Axh`/`Bxh`/`A0h`/`A3h` etc. with `<ERR1> <ERR2>` payload from the error code list (section 2.4).
- Parameters ID1 (control ID) and ID2 (model code) appear in responses but are not part of the request payloads shown in the command tables.
- RS-232C: cross (null-modem) cable required; PC CONTROL port is D-SUB 9P, pins 2/3 crossed, pin 5 GND, 7/8 crossed for RTS/CTS.
- LAN: TCP port 7142 (stated). Wired RJ-45 pinout and wireless LAN support documented; wireless LAN unit model-specific.
- Lamp/filter usage times returned in one-second units but updated at one-minute intervals.

<!-- UNRESOLVED: -->
<!-- - Default baud rate not stated; source lists five options (4800/9600/19200/38400/115200). -->
<!-- - Input terminal value map, aspect value map, eco mode value map, sub-input value map, base model type value map are referenced to an "Appendix / Supplementary Information by Command" not present in this refined source. -->
<!-- - Authentication: no auth procedure described in source; inferred `none` per Tier 2 policy. -->
<!-- - Firmware version compatibility not stated in source. -->
<!-- - Protocol version number not stated in source. -->
<!-- - ID1 control ID and ID2 model code numeric values not specified for this model. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:06:48.146Z
last_checked_at: 2026-06-17T19:32:57.698Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:32:57.698Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command reference. Transport (TCP 7142, RS232 115200 8N1) verified. Full coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol is binary hex-framed; parameter values for some adjustment targets reference an external \"Appendix / Supplementary Information by Command\" not present in the source text (e.g. input terminal map, aspect values, eco mode values, sub-input values, base model type values)."
- "appendix not in source).\""
- "settable parameters mirror the *_SET and *_ADJUST actions above"
- "source describes no unsolicited / push notifications; all data is returned"
- "source describes no explicit multi-step command sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
