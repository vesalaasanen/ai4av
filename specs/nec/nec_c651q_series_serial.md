---
spec_id: admin/nec-c651q-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C651Q Series Control Spec"
manufacturer: NEC
model_family: C651Q
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - C651Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T09:17:01.326Z
last_checked_at: 2026-06-03T07:26:08.129Z
generated_at: 2026-06-03T07:26:08.129Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit control not documented in source; commands differ per model"
  - "flow control not specified in source"
  - "structured variable inventory not extracted; commands provide data fields"
  - "no unsolicited event notifications documented in source;"
  - "no explicit multi-step macro sequences documented in source"
  - "interlock switch states documented in error bitfield but no explicit"
  - "wireless LAN unit control — \"see the operation manual of the wireless LAN unit to be used\""
  - "input terminal value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
  - "aspect value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
  - "eco mode value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
  - "sub input setting values — \"see the Appendix 'Supplementary Information by Command'\""
  - "base model type values — \"see the Appendix 'Supplementary Information by Command'\""
  - "standby mode command acceptance — \"Some models cannot receive commands in standby mode\""
  - "flow control (RTS/CTS used in physical pinout but software control not documented)"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:26:08.129Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "Complete match: 53/53 actions present (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# NEC C651Q Series Control Spec

## Summary
Professional multi-lamp LCD projector controllable via RS-232C serial and wired TCP/IP Ethernet. Supports power control, input routing, picture/sound mute, lens control, lamp monitoring, eco mode, and comprehensive status queries. Both serial (RS-232C) and LAN (TCP port 7142) interfaces are documented.

<!-- UNRESOLVED: wireless LAN unit control not documented in source; commands differ per model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps - source lists all
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified in source
addressing:
  port: 7142  # TCP port for LAN commands
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable: POWER ON / POWER OFF commands present
# routable: INPUT SW CHANGE command present
# queryable: multiple INFORMATION REQUEST, STATUS REQUEST commands present
# levelable: PICTURE ADJUST, VOLUME ADJUST, ASPECT ADJUST commands present
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# 009. ERROR STATUS REQUEST
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  command: 00h 88h 00h 00h 00h 88h

# 015. POWER ON
- id: power_on
  label: Power On
  kind: action
  params: []
  command: 02h 00h 00h 00h 00h 02h

# 016. POWER OFF
- id: power_off
  label: Power Off
  kind: action
  params: []
  command: 02h 01h 00h 00h 00h 03h

# 018. INPUT SW CHANGE
- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex); see appendix for full list
  command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>

# 020. PICTURE MUTE ON
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command: 02h 10h 00h 00h 00h 12h

# 021. PICTURE MUTE OFF
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command: 02h 11h 00h 00h 00h 13h

# 022. SOUND MUTE ON
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  command: 02h 12h 00h 00h 00h 14h

# 023. SOUND MUTE OFF
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command: 02h 13h 00h 00h 00h 15h

# 024. ONSCREEN MUTE ON
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command: 02h 14h 00h 00h 00h 16h

# 025. ONSCREEN MUTE OFF
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command: 02h 15h 00h 00h 00h 17h

# 030-1. PICTURE ADJUST
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order then high-order 8 bits)
  command: 03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>

# 030-2. VOLUME ADJUST
- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order then high-order 8 bits)
  command: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>

# 030-12. ASPECT ADJUST
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect value; see appendix for full list
  command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>

# 030-15. OTHER ADJUST
- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order then high-order 8 bits)
  command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>

# 037. INFORMATION REQUEST
- id: information_request
  label: Information Request
  kind: action
  params: []
  command: 03h 8Ah 00h 00h 00h 8Dh

# 037-3. FILTER USAGE INFORMATION REQUEST
- id: filter_usage_request
  label: Filter Usage Information Request
  kind: action
  params: []
  command: 03h 95h 00h 00h 00h 98h

# 037-4. LAMP INFORMATION REQUEST 3
- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  command: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>

# 037-6. CARBON SAVINGS INFORMATION REQUEST
- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  command: 03h 9Ah 00h 00h 01h <DATA01> <CKS>

# 050. REMOTE KEY CODE
- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD type); see key code table for mapping"
  command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>

# 051. SHUTTER CLOSE
- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command: 02h 16h 00h 00h 00h 18h

# 052. SHUTTER OPEN
- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command: 02h 17h 00h 00h 00h 19h

# 053. LENS CONTROL
- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: content
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=Drive 1s+, 02h=Drive 0.5s+, 03h=Drive 0.25s+, 7Fh=Drive+, 81h=Drive-, FDh=Drive 0.25s-, FEh=Drive 0.5s-, FFh=Drive 1s-"
  command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>

# 053-1. LENS CONTROL REQUEST
- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: content
      type: integer
      description: Content code
  command: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>

# 053-2. LENS CONTROL 2
- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: content
      type: integer
      description: "FFh=Stop"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value
  command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>

# 053-3. LENS MEMORY CONTROL
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>

# 053-4. REFERENCE LENS MEMORY CONTROL
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>

# 053-5. LENS MEMORY OPTION REQUEST
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  command: 02h 20h 00h 00h 01h <DATA01> <CKS>

# 053-6. LENS MEMORY OPTION SET
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"
  command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>

# 053-7. LENS INFORMATION REQUEST
- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []
  command: 02h 22h 00h 00h 01h 00h 25h

# 053-10. LENS PROFILE SET
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command: 02h 27h 00h 00h 01h <DATA01> <CKS>

# 053-11. LENS PROFILE REQUEST
- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
  command: 02h 28h 00h 00h 00h 2Ah

# 060-1. GAIN PARAMETER REQUEST 3
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  command: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>

# 078-1. SETTING REQUEST
- id: setting_request
  label: Setting Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 00h 86h

# 078-2. RUNNING STATUS REQUEST
- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 01h 87h

# 078-3. INPUT STATUS REQUEST
- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 02h 88h

# 078-4. MUTE STATUS REQUEST
- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 03h 89h

# 078-5. MODEL NAME REQUEST
- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 04h 8Ah

# 078-6. COVER STATUS REQUEST
- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 05h 8Bh

# 079. FREEZE CONTROL
- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: content
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off"
  command: 01h 98h 00h 00h 01h <DATA01> <CKS>

# 084. INFORMATION STRING REQUEST
- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  command: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>

# 097-8. ECO MODE REQUEST
- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 07h BBh

# 097-45. LAN PROJECTOR NAME REQUEST
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 2Ch E0h

# 097-155. LAN MAC ADDRESS STATUS REQUEST2
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh

# 097-198. PIP/PICTURE BY PICTURE REQUEST
- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  command: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>

# 097-243-1. EDGE BLENDING MODE REQUEST
- id: edge_blend_request
  label: Edge Blending Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h DFh 00h 94h

# 098-8. ECO MODE SET
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_value
      type: integer
      description: Eco mode value; see appendix for full list
  command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>

# 098-45. LAN PROJECTOR NAME SET
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated
  command: 03h B1h 00h 00h 12h 2Ch <DATA01-DATA16> 00h <CKS>

# 098-198. PIP/PICTURE BY PICTURE SET
- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: Varies by content type
  command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>

# 098-243-1. EDGE BLENDING MODE SET
- id: edge_blend_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"
  command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>

# 305-1. BASE MODEL TYPE REQUEST
- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 00h C0h

# 305-2. SERIAL NUMBER REQUEST
- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 02h 01h 06h C8h

# 305-3. BASIC INFORMATION REQUEST
- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 02h C2h

# 319-10. AUDIO SELECT SET
- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value; see appendix
    - name: setting_value
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
  command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>
```

## Feedbacks
```yaml
# Success response format (no data):
# A2h <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Success response format (with data):
# A3h <CMD> <ID1> <ID2> LEN <DATA...> <CKS>
# Query response format:
# 23h <CMD> <ID1> <ID2> LEN <DATA...> <CKS>
# 20h <CMD> <ID1> <ID2> LEN <DATA...> <CKS>
# 22h <CMD> <ID1> <ID2> LEN <DATA...> <CKS>

# Error codes (ERR1/ERR2 pairs):
- id: err_unrecognized
  label: Command not recognized
  type: enum
  values: ["ERR1=00h, ERR2=00h"]
- id: err_not_supported
  label: Command not supported
  type: enum
  values: ["ERR1=00h, ERR2=01h"]
- id: err_invalid_value
  label: Invalid value specified
  type: enum
  values: ["ERR1=01h, ERR2=00h"]
- id: err_invalid_input_terminal
  label: Invalid input terminal
  type: enum
  values: ["ERR1=01h, ERR2=01h"]
- id: err_invalid_language
  label: Invalid language
  type: enum
  values: ["ERR1=01h, ERR2=02h"]
- id: err_memory_allocation
  label: Memory allocation error
  type: enum
  values: ["ERR1=02h, ERR2=00h"]
- id: err_memory_in_use
  label: Memory in use
  type: enum
  values: ["ERR1=02h, ERR2=02h"]
- id: err_cannot_set
  label: Cannot set specified value
  type: enum
  values: ["ERR1=02h, ERR2=03h"]
- id: err_forced_onscreen_mute
  label: Forced onscreen mute on
  type: enum
  values: ["ERR1=02h, ERR2=04h"]
- id: err_viewer_error
  label: Viewer error
  type: enum
  values: ["ERR1=02h, ERR2=06h"]
- id: err_no_signal
  label: No signal
  type: enum
  values: ["ERR1=02h, ERR2=07h"]
- id: err_test_pattern
  label: Test pattern or filter displayed
  type: enum
  values: ["ERR1=02h, ERR2=08h"]
- id: err_no_pc_card
  label: No PC card inserted
  type: enum
  values: ["ERR1=02h, ERR2=09h"]
- id: err_memory_operation
  label: Memory operation error
  type: enum
  values: ["ERR1=02h, ERR2=0Ah"]
- id: err_entry_list_displayed
  label: Entry list displayed
  type: enum
  values: ["ERR1=02h, ERR2=0Ch"]
- id: err_power_off
  label: Power is off
  type: enum
  values: ["ERR1=02h, ERR2=0Dh"]
- id: err_command_failed
  label: Command execution failed
  type: enum
  values: ["ERR1=02h, ERR2=0Eh"]
- id: err_no_authority
  label: No authority for operation
  type: enum
  values: ["ERR1=02h, ERR2=0Fh"]
- id: err_incorrect_gain_number
  label: Incorrect gain number
  type: enum
  values: ["ERR1=03h, ERR2=00h"]
- id: err_invalid_gain
  label: Invalid gain specified
  type: enum
  values: ["ERR1=03h, ERR2=01h"]
- id: err_adjustment_failed
  label: Adjustment failed
  type: enum
  values: ["ERR1=03h, ERR2=02h"]
```

## Variables
```yaml
# All queryable parameters documented in Feedbacks/Actions are Variables
# UNRESOLVED: structured variable inventory not extracted; commands provide data fields
# that serve as variables (power status, input status, lamp usage, etc.)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source;
# projector only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on  # "While this command is turning on the power, no other command can be accepted."
  - power_off  # "While this command is turning off the power (including the cooling time), no other command can be accepted."
interlocks: []
# UNRESOLVED: interlock switch states documented in error bitfield but no explicit
# interlock procedure in source (DATA09 Bit1: "The interlock switch is open.")
```

## Notes
Serial communication uses 9-byte command format with checksum. Multi-baud rate support (115200/38400/19200/9600/4800) — specific rate negotiation not documented. LAN uses TCP port 7142 with identical command format. Two-lamp models support Lamp 2 commands; single-lamp models should send 00h for DATA01.

<!-- UNRESOLVED: wireless LAN unit control — "see the operation manual of the wireless LAN unit to be used" -->
<!-- UNRESOLVED: input terminal value enumeration — "see the Appendix 'Supplementary Information by Command'" -->
<!-- UNRESOLVED: aspect value enumeration — "see the Appendix 'Supplementary Information by Command'" -->
<!-- UNRESOLVED: eco mode value enumeration — "see the Appendix 'Supplementary Information by Command'" -->
<!-- UNRESOLVED: sub input setting values — "see the Appendix 'Supplementary Information by Command'" -->
<!-- UNRESOLVED: base model type values — "see the Appendix 'Supplementary Information by Command'" -->
<!-- UNRESOLVED: standby mode command acceptance — "Some models cannot receive commands in standby mode" -->
<!-- UNRESOLVED: flow control (RTS/CTS used in physical pinout but software control not documented) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T09:17:01.326Z
last_checked_at: 2026-06-03T07:26:08.129Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:26:08.129Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "Complete match: 53/53 actions present (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit control not documented in source; commands differ per model"
- "flow control not specified in source"
- "structured variable inventory not extracted; commands provide data fields"
- "no unsolicited event notifications documented in source;"
- "no explicit multi-step macro sequences documented in source"
- "interlock switch states documented in error bitfield but no explicit"
- "wireless LAN unit control — \"see the operation manual of the wireless LAN unit to be used\""
- "input terminal value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
- "aspect value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
- "eco mode value enumeration — \"see the Appendix 'Supplementary Information by Command'\""
- "sub input setting values — \"see the Appendix 'Supplementary Information by Command'\""
- "base model type values — \"see the Appendix 'Supplementary Information by Command'\""
- "standby mode command acceptance — \"Some models cannot receive commands in standby mode\""
- "flow control (RTS/CTS used in physical pinout but software control not documented)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
