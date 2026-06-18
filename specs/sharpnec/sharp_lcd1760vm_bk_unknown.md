---
spec_id: admin/sharp-nec-lcd1760vm-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LCD1760VM BK Control Spec"
manufacturer: Sharp/NEC
model_family: "LCD1760VM BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LCD1760VM BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:42:25.540Z
last_checked_at: 2026-06-17T19:58:26.527Z
generated_at: 2026-06-17T19:58:26.527Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Default baud rate not stated in source (configurable list given). Input terminal value map, eco-mode value map, aspect value map, and base-model-type value map are referenced to an Appendix \"Supplementary Information by Command\" that is not present in this source text. Firmware version compatibility not stated. Model-specific command support matrix not present."
  - "default baud rate not stated; source lists supported options 115200/38400/19200/9600/4800 bps"
  - "source describes no unsolicited notifications; all responses are command-acknowledgement."
  - "source documents no multi-step sequences."
  - "Appendix \"Supplementary Information by Command\" not present in this source — value maps for input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), base model type (078-1/305-1), selection signal type, and PIP sub-input are referenced but not defined here. Default baud rate not stated. Firmware version compatibility not stated. Model name \"LCD1760VM BK\" supplied by operator; source document is a generic Sharp/NEC Projector Control Command Reference (BDT140013 Rev 7.1) not naming this model explicitly."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:58:26.527Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source hex sequences; transport parameters confirmed; source command catalogue fully represented by spec. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LCD1760VM BK Control Spec

## Summary
Projector control spec covering the Sharp/NEC LCD1760VM BK via the vendor Projector Control Command Reference (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (port 7142). Commands are binary hex-framed with an additive checksum byte. This spec enumerates all 53 documented commands: power, input switch, mute, picture/volume/aspect adjust, lamp/filter/carbon info queries, remote key code, lens control and lens-memory family, status/model/serial requests, eco/PIP/edge-blend set, and audio select.

<!-- UNRESOLVED: Default baud rate not stated in source (configurable list given). Input terminal value map, eco-mode value map, aspect value map, and base-model-type value map are referenced to an Appendix "Supplementary Information by Command" that is not present in this source text. Firmware version compatibility not stated. Model-specific command support matrix not present. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: default baud rate not stated; source lists supported options 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex per source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable  - inferred from POWER ON (015) / POWER OFF (016)
# queryable  - inferred from many status/info request commands
# levelable  - inferred from PICTURE ADJUST (030-1) / VOLUME ADJUST (030-2) / OTHER ADJUST (030-15)
# routable   - inferred from INPUT SW CHANGE (018)
```

## Actions
```yaml
# Checksum (CKS) = low-order byte (8 bits) of the sum of all preceding bytes.
# Commands shown verbatim from source; _<DATA??>_ and _<CKS>_ are variable/computed fields.

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
  notes: "While turning on the power, no other command can be accepted."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off (incl. cooling time), no other command can be accepted."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal hex value (e.g. 06h=video). Map in Appendix 'Supplementary Information by Command' not present in source."

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
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value. Map in Appendix 'Supplementary Information by Command' not present in source."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target high byte (with DATA02): 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "Adjustment target low byte (96h FFh = LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: string
      description: "Key code high byte (00h for all listed keys)"

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
      type: string
      description: "Lens target. 06h=Periphery Focus (others not enumerated in source header)"
    - name: DATA02
      type: string
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target (same set as LENS CONTROL)"

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

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
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

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

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      type: string
      description: "Eco mode value. Map in Appendix 'Supplementary Information by Command' not present in source."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (MODE: 00h=PIP,01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; sub-input map in Appendix)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

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
      type: string
      description: "Input terminal. Map in Appendix 'Supplementary Information by Command' not present in source."
    - name: DATA02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All commands return a framed response: ACK frames carry DATA; error frames carry ERR1/ERR2.
# Response framing by command class (from source section 2.3):
#   - success, no-data req: 2xh {op} {ID1} {ID2} 00h {CKS}
#   - success, data req:    2xh {op} {ID1} {ID2} LEN {DATA...} {CKS}
#   - failure:              Axh {op} {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}
# ERR1/ERR2 error code map (source section 2.4):
#   00h/00h=unrecognized cmd; 00h/01h=cmd not supported by model;
#   01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language;
#   02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set;
#   02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal;
#   02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory operation error;
#   02h/0Ch=entry list displayed; 02h/0Dh=command not accepted (power off);
#   02h/0Eh=command execution failed; 02h/0Fh=no authority for operation;
#   03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
```

## Variables
```yaml
# Settable continuous/parameter values surfaced via dedicated request/set command pairs:
#   - picture: brightness, contrast, color, hue, sharpness (030-1 set / 060-1 request)
#   - volume (030-2 set / 060-1 request)
#   - aspect (030-12 set)
#   - lamp/light adjust (030-15 set / 060-1 request)
#   - lens position (053 / 053-2 / 053-1 request)
#   - eco mode (098-8 set / 097-8 request)
#   - projector name (098-45 set / 097-45 request)
#   - PIP/PbP mode, start position, sub inputs (098-198 set / 097-198 request)
#   - edge blending mode (098-243-1 set / 097-243-1 request)
# Ranges returned dynamically by GAIN PARAMETER REQUEST 3 (060-1) per target.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are command-acknowledgement.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes behavioral interlocks (not safety interlocks):
#   - POWER ON/OFF reject all other commands while in progress (incl. cooling).
#   - Several commands return ERR 02h/0Dh when power is off.
# No explicit safety warnings, power-on sequencing requirements, or physical
# interlock procedures are stated in this source text.
```

## Notes
- Command frame format: `20h/02h/03h/01h/00h  {op}  {ID1} {ID2}  LEN  {DATA...}  {CKS}`. Leading byte encodes command class; `ID1`=control ID set on projector, `ID2`=model code. Checksum = low byte of sum of all preceding bytes (worked example in source: `20h+81h+01h+60h+01h+00h=103h` → CKS `03h`).
- Serial: RS-232C cross cable, D-SUB 9P, pins 2/3 RxD/TxD, 5 GND, 7/8 RTS/CTS. Full duplex.
- LAN: RJ-45 wired (10/100 Mbps auto) or optional wireless LAN unit. TCP port 7142.
- Lamp/filter usage time returned in one-second units but updated at one-minute intervals.
- Two-lamp projector models only: lamp-2 selectors (DATA01=01h) are effective.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in this source — value maps for input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), base model type (078-1/305-1), selection signal type, and PIP sub-input are referenced but not defined here. Default baud rate not stated. Firmware version compatibility not stated. Model name "LCD1760VM BK" supplied by operator; source document is a generic Sharp/NEC Projector Control Command Reference (BDT140013 Rev 7.1) not naming this model explicitly. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:42:25.540Z
last_checked_at: 2026-06-17T19:58:26.527Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:58:26.527Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source hex sequences; transport parameters confirmed; source command catalogue fully represented by spec. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Default baud rate not stated in source (configurable list given). Input terminal value map, eco-mode value map, aspect value map, and base-model-type value map are referenced to an Appendix \"Supplementary Information by Command\" that is not present in this source text. Firmware version compatibility not stated. Model-specific command support matrix not present."
- "default baud rate not stated; source lists supported options 115200/38400/19200/9600/4800 bps"
- "source describes no unsolicited notifications; all responses are command-acknowledgement."
- "source documents no multi-step sequences."
- "Appendix \"Supplementary Information by Command\" not present in this source — value maps for input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), base model type (078-1/305-1), selection signal type, and PIP sub-input are referenced but not defined here. Default baud rate not stated. Firmware version compatibility not stated. Model name \"LCD1760VM BK\" supplied by operator; source document is a generic Sharp/NEC Projector Control Command Reference (BDT140013 Rev 7.1) not naming this model explicitly."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
