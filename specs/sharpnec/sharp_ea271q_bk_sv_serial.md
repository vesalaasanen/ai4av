---
spec_id: admin/sharpnec-ea271q-bksv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EA271Q BK SV Control Spec"
manufacturer: Sharp/NEC
model_family: "EA271Q BK SV"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA271Q BK SV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:54:48.267Z
last_checked_at: 2026-06-17T19:56:55.659Z
generated_at: 2026-06-17T19:56:55.659Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual (BDT140013 r7.1) is a generic projector command reference; exact model coverage of EA271Q BK SV not enumerated. Input terminal values and eco-mode values referenced to a separate \"Supplementary Information by Command\" appendix not included in this source."
  - "source states \"Communication mode: Full duplex\" but no flow_control (RTS/CTS/XON) value given"
  - "source documents parameterized adjustment values (brightness, contrast,"
  - "no unsolicited notification format documented in source. All responses"
  - "no multi-step sequences explicitly described in source."
  - "no explicit safety interlock procedures, lamp-replacement lockout"
  - "exact model coverage (the source is a generic projector command reference manual, BDT140013 r7.1, not a model-specific EA271Q document)."
  - "ID2 model code value for EA271Q BK SV not stated in source."
  - "flow_control serial parameter not stated."
  - "input terminal, aspect, eco mode, base model type enumeration values not in source (referenced appendix missing)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:56:55.659Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands match source literals exactly; transport parameters confirmed; source command list enumerates exactly these 53 commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC EA271Q BK SV Control Spec

## Summary
Sharp/NEC projector control via RS-232C serial and wired/wireless LAN (TCP). Binary frame protocol with checksum. Covers power, input switching, mute, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, edge blending, PIP/PbP, and information requests.

<!-- UNRESOLVED: source manual (BDT140013 r7.1) is a generic projector command reference; exact model coverage of EA271Q BK SV not enumerated. Input terminal values and eco-mode values referenced to a separate "Supplementary Information by Command" appendix not included in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable options: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Communication mode: Full duplex" but no flow_control (RTS/CTS/XON) value given
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from many *_REQUEST query commands
  - levelable    # inferred from VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST
```

## Actions
```yaml
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (incl. cooling time)."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (see Supplementary Information appendix). Example: 06h = video port."
    notes: "Response DATA01 = FFh indicates ended with error (no signal switch)."

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: cmd_021_picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: cmd_023_sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
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

  - id: cmd_030_2_volume_adjust
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

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value (see Supplementary Information appendix)"

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Target (96h / FFh = LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: byte
        description: "FFh fixed per source table"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: cmd_037_3_filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: cmd_037_4_lamp_info_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "01h=Lamp usage time (s), 04h=Lamp remaining life (%)"

  - id: cmd_037_6_carbon_savings_info_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: byte
        description: "Key code high byte"

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Target (e.g. 06h=Periphery Focus)"
      - name: DATA02
        type: byte
        description: "00h=Stop; 01h/02h/03h=drive + for 1s/0.5s/0.25s; 7Fh=drive +; 81h=drive -; FDh/FEh/FFh=drive - for 0.25s/0.5s/1s"

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target to query"

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop, otherwise target"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value (see Supplementary Information appendix)"

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: name_bytes
        type: byte[16]
        description: "Projector name (DATA01-DATA16, up to 16 bytes)"

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (context-dependent on DATA01)"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (see Supplementary Information appendix)"
      - name: DATA02
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: response_success
    type: ack
    description: "Response with no error (ERR1=00h, ERR2=00h style). Response frame first byte indicates class: 20h/21h/22h/23h = success."
  - id: response_error
    type: enum
    description: "Error response with ERR1/ERR2 codes; first byte A0h/A1h/A2h/A3h."
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern or filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command cannot be accepted because power is off"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"
```

## Variables
```yaml
# UNRESOLVED: source documents parameterized adjustment values (brightness, contrast,
# color, hue, sharpness, volume, lamp/light adjust) under 030-* and 060-1, but range
# bounds are returned dynamically via GAIN PARAMETER REQUEST 3, not stated as constants.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format documented in source. All responses
# appear to be solicited (in reply to a command).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on is in progress (source §3.2)."
  - "POWER OFF: no other command accepted during power-off including cooling time (source §3.3)."
  - "PICTURE/SOUND/ONSCREEN MUTE ON: cleared automatically on input terminal switch or video signal switch (source §3.5, §3.7, §3.9)."
  - "SOUND MUTE ON: also cleared by sound volume adjustment (source §3.7)."
# UNRESOLVED: no explicit safety interlock procedures, lamp-replacement lockout
# sequencing, or power-on sequencing requirements stated beyond the above behavioral
# notes. Error bit "interlock switch is open" (DATA09 Bit1 of ERROR STATUS REQUEST)
# indicates a hardware interlock exists but its procedure is not documented here.
```

## Notes
- Frame format: `20h 88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>`. `ID1` = control ID set on projector; `ID2` = model code (model-dependent); `CKS` = low byte of sum of all preceding bytes.
- Response first byte encodes class: `2xh` = success, `Axh` = error (where `x` mirrors the command class byte).
- Serial settings: 8N1, full duplex, baud selectable (115200/38400/19200/9600/4800).
- LAN: TCP port 7142; 10/100 Mbps auto-sensing wired (IEEE 802.3 / 802.3u). Wireless via separate wireless LAN unit.
- Lamp usage time and filter usage time are updated at one-minute intervals despite one-second unit resolution.
- Lamp remaining life returns a negative percentage once the replacement deadline is exceeded.
- Many commands reference an "Supplementary Information by Command" appendix for input-terminal values, aspect values, base model type values, and eco mode values — that appendix is not in the provided source.

<!-- UNRESOLVED: exact model coverage (the source is a generic projector command reference manual, BDT140013 r7.1, not a model-specific EA271Q document). -->
<!-- UNRESOLVED: ID2 model code value for EA271Q BK SV not stated in source. -->
<!-- UNRESOLVED: flow_control serial parameter not stated. -->
<!-- UNRESOLVED: input terminal, aspect, eco mode, base model type enumeration values not in source (referenced appendix missing). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:54:48.267Z
last_checked_at: 2026-06-17T19:56:55.659Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:56:55.659Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands match source literals exactly; transport parameters confirmed; source command list enumerates exactly these 53 commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual (BDT140013 r7.1) is a generic projector command reference; exact model coverage of EA271Q BK SV not enumerated. Input terminal values and eco-mode values referenced to a separate \"Supplementary Information by Command\" appendix not included in this source."
- "source states \"Communication mode: Full duplex\" but no flow_control (RTS/CTS/XON) value given"
- "source documents parameterized adjustment values (brightness, contrast,"
- "no unsolicited notification format documented in source. All responses"
- "no multi-step sequences explicitly described in source."
- "no explicit safety interlock procedures, lamp-replacement lockout"
- "exact model coverage (the source is a generic projector command reference manual, BDT140013 r7.1, not a model-specific EA271Q document)."
- "ID2 model code value for EA271Q BK SV not stated in source."
- "flow_control serial parameter not stated."
- "input terminal, aspect, eco mode, base model type enumeration values not in source (referenced appendix missing)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
