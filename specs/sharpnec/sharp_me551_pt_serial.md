---
spec_id: admin/sharp-nec-me551-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me551 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "Me551 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Me551 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:21:53.281Z
last_checked_at: 2026-06-18T08:30:55.778Z
generated_at: 2026-06-18T08:30:55.778Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Me551 Pt\" supplied by operator; source doc is generic Sharp/NEC projector command reference (no model-specific confirmation). Firmware version compatibility, voltage/power specs, and exact model-code (ID2) per device not stated."
  - "flow control not stated in source (full-duplex mode noted)"
  - "no additional standalone settable variables beyond the actions listed."
  - "no unsolicited event frames described in source."
  - "no multi-step sequences described in source."
  - "exact ID2 model code for Me551 Pt not stated. Appendix \"Supplementary Information by Command\" (input terminal values, base model types, eco mode values, sub-input values) referenced but not included in this refined excerpt. Flow control method not specified. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:30:55.778Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Me551 Pt Control Spec

## Summary
Sharp/NEC Me551 Pt projector/display controlled via RS-232C or wired/wireless LAN (TCP). Binary framed protocol with checksums (BDT140013 Rev 7.1). Covers power, input switching, mute, picture/volume/aspect adjust, lens control & memory, status queries, and image-meld settings (PIP/PbP, edge blending).

<!-- UNRESOLVED: model name "Me551 Pt" supplied by operator; source doc is generic Sharp/NEC projector command reference (no model-specific confirmation). Firmware version compatibility, voltage/power specs, and exact model-code (ID2) per device not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode noted)
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: 015 POWER ON / 016 POWER OFF present
- routable    # inferred: 018 INPUT SW CHANGE present
- queryable   # inferred: numerous request/status commands present
- levelable   # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
```

## Actions
```yaml
# All 53 catalogued commands from section 2 (Command List). Each named opcode = one action.
# <ID1>=control ID, <ID2>=model code, <CKS>=checksum (low byte of sum of preceding bytes).

- id: cmd_009_error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: cmd_016_power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Input terminal value (see Appendix; e.g. 06h=video)

- id: cmd_020_picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: byte
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: byte
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high 8 bits)

- id: cmd_030_2_volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02
      type: byte
      description: Adjustment value (low 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high 8 bits)

- id: cmd_030_12_aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Aspect value (see Appendix)

- id: cmd_030_15_other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target hi (96h=LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: byte
      description: Adjustment target lo (FFh)
    - name: DATA03
      type: byte
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA04
      type: byte
      description: Adjustment value (low 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high 8 bits)

- id: cmd_037_information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lamp (00h=Lamp1, 01h=Lamp2 [two-lamp models only])
    - name: DATA02
      type: byte
      description: Content (01h=usage time sec, 04h=remaining life %)

- id: cmd_037_6_carbon_savings_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=during operation"

- id: cmd_050_remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01_DATA02
      type: word
      description: "Key code (WORD); e.g. 05h 00h=AUTO, 06h 00h=MENU, 02h 00h=POWER ON (see key code list)"

- id: cmd_051_shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lens target (06h=Periphery Focus)
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h/02h/03h=plus 1s/0.5s/0.25s, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus 0.25s/0.5s/1s"

- id: cmd_053_1_lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lens target

- id: cmd_053_2_lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lens target (FFh=Stop)
    - name: DATA02
      type: byte
      description: Mode (00h=absolute, 02h=relative)
    - name: DATA03
      type: byte
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high 8 bits)

- id: cmd_053_3_lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_5_lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Profile number (00h=Profile1, 01h=Profile2)"

- id: cmd_053_11_lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: cmd_097_8_eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_request2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_pbp_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Eco mode value (see Appendix)

- id: cmd_098_45_lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes)

- id: cmd_098_198_pip_pbp_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: Setting value per DATA01 (see Appendix)

- id: cmd_098_243_1_edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Input terminal (see Appendix)
    - name: DATA02
      type: byte
      description: "00h=terminal-specified, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing: ACK bytes by command class.
# 2xh = success response to 02h-class command; A2h = error (carries <ERR1> <ERR2>)
# 3xh = success response to 03h-class; A3h = error
# 0xh/2xh (20h) = success response to 00h-class; A0h = error
# 1xh = success to 01h-class; A1h = error

- id: ack_power
  type: enum
  values: [success, error]

- id: error_code
  type: struct
  description: "ERR1/ERR2 pair. ERR1: 00h=unrecognized/unsupported, 01h=invalid value/input/lang, 02h=memory/busy/state. ERR2 selects sub-cause."

- id: running_status
  type: enum
  description: "DATA06 of 078-2: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Power saving, 10h=Network standby"

- id: power_status
  type: enum
  values: [standby, power_on]

- id: input_signal_status
  type: struct
  description: "From 078-3: signal list number, type1, type2, content displayed"
```

## Variables
```yaml
# Settable parameters not covered as discrete actions already enumerated above.
# Picture/volume/aspect/lens values are parameterized within their actions.
# Eco mode value, projector name, edge blending mode handled by their set actions.
# UNRESOLVED: no additional standalone settable variables beyond the actions listed.
```

## Events
```yaml
# Source documents only command→response (solicited). No unsolicited notification frames.
# UNRESOLVED: no unsolicited event frames described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while powering on, no other command is accepted (explicit in source)."
  - "016 POWER OFF: while powering off (incl. cooling time), no other command is accepted (explicit in source)."
  - "Picture/onscreen mute auto-clear on input/video signal switch (explicit)."
  - "Sound mute auto-clear on input switch / video signal switch / volume adjustment (explicit)."
# Voltage/power specs, fault recovery sequences: UNRESOLVED - not stated in source.
```

## Notes
- Protocol is binary, big-endian hex framed. Checksum = low-order byte of sum of all preceding bytes.
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model — value for Me551 Pt not stated in this doc).
- Response ACK byte mirrors command class: `2xh`/`3xh`/`2xh(20h)`/`1xh` = success; `Axh` = error with ERR1/ERR2.
- Error codes documented (section 2.4): 00h/01h unsupported, 01h/xx invalid value, 02h/xx busy/state errors, 03h/xx gain errors.
- Serial cable = cross/straight per PC CONTROL D-SUB 9P pinout (pin2/3 RXD/TXD, pin7/8 RTS/CTS).
- LAN: wired (10/100 auto) or wireless (separate wireless LAN unit, see its manual).

<!-- UNRESOLVED: exact ID2 model code for Me551 Pt not stated. Appendix "Supplementary Information by Command" (input terminal values, base model types, eco mode values, sub-input values) referenced but not included in this refined excerpt. Flow control method not specified. Firmware version compatibility not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:21:53.281Z
last_checked_at: 2026-06-18T08:30:55.778Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:30:55.778Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Me551 Pt\" supplied by operator; source doc is generic Sharp/NEC projector command reference (no model-specific confirmation). Firmware version compatibility, voltage/power specs, and exact model-code (ID2) per device not stated."
- "flow control not stated in source (full-duplex mode noted)"
- "no additional standalone settable variables beyond the actions listed."
- "no unsolicited event frames described in source."
- "no multi-step sequences described in source."
- "exact ID2 model code for Me551 Pt not stated. Appendix \"Supplementary Information by Command\" (input terminal values, base model types, eco mode values, sub-input values) referenced but not included in this refined excerpt. Flow control method not specified. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
