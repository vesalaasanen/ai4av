---
spec_id: admin/sharp-nec-np-px1004ul-wh
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PX1004UL WH Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PX1004UL WH"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PX1004UL WH"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:58:14.254Z
last_checked_at: 2026-06-18T08:52:31.784Z
generated_at: 2026-06-18T08:52:31.784Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit specifics not documented in this source (refers to separate operation manual)."
  - "input terminal code values, aspect values, eco mode values, base model type values, and sub input values reference an Appendix (\"Supplementary Information by Command\") not present in this refined source."
  - "firmware version compatibility not stated in source."
  - "source does not document any push/event mechanism."
  - "populate if a separate operations manual describes macro sequences."
  - "no explicit safety interlock procedures or power-on sequencing requirements stated in this command reference."
  - "input terminal code values, aspect values, eco mode values, base model type values, and sub input setting values reference an Appendix (\"Supplementary Information by Command\") not included in this refined source."
  - "ID2 model code value for NP PX1004UL WH not stated in this command reference."
  - "default control ID (ID1) value not stated in this command reference."
  - "command timeout / inter-command delay not specified in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:52:31.784Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PX1004UL WH Control Spec

## Summary
Control spec for the Sharp/NEC NP PX1004UL WH projector, derived from the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The device supports RS-232C serial control and wired/wireless LAN control using a binary, checksummed command frame. All commands and responses are expressed in hexadecimal notation with a frame structure of `20h 88h <ID1> <ID2> <LEN> <DATA...> <CKS>`.

<!-- UNRESOLVED: wireless LAN unit specifics not documented in this source (refers to separate operation manual). -->
<!-- UNRESOLVED: input terminal code values, aspect values, eco mode values, base model type values, and sub input values reference an Appendix ("Supplementary Information by Command") not present in this refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # bps, switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex comms, no explicit flow control field stated
  # Note: source states communication mode = Full duplex
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from 015 POWER ON / 016 POWER OFF commands
- queryable      # inferred from extensive REQUEST commands (009, 037, 078-*, 097-*, 305-*)
- levelable      # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
- routable       # inferred from 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
# Frame legend (verbatim from source §2.1):
#   20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>
# ID1 = control ID set on projector; ID2 = model code; CKS = low-byte of sum of all preceding bytes.
# Literal payloads below are copied verbatim including the checksum byte (where fixed).

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

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Values per Appendix 'Supplementary Information by Command'."
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value (per Appendix 'Supplementary Information by Command')."
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (typically 00h for listed codes)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (06h=Periphery Focus; see source for full target list)"
    - name: data02
      type: integer
      description: "Drive content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target identifier"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set via 053-10)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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

- id: cmd_097_155_lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value (per Appendix 'Supplementary Information by Command')"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: projector_name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (varies by target; sub input values per Appendix)"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."

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
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal (values per Appendix 'Supplementary Information by Command')"
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."
```

## Feedbacks
```yaml
# Response frame structure (verbatim from source §2.3):
#   Success (no data):   2Xh <cmd> <ID1> <ID2> 00h <CKS>
#   Success (with data): 2Xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure:             AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# where X = command group byte. ACK byte 2Xh = success, AXh = error.

- id: error_status
  type: bitmask
  values: [DATA01..DATA12]
  description: "Response to 009 ERROR STATUS REQUEST. 12 bytes of bit-packed error flags (cover, fan, temperature, lamp, formatter, mirror cover, foreign matter, ballast, iris, lens, interlock, system errors)."

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "DATA03 of 078-2 RUNNING STATUS REQUEST: 00h=Standby, 01h=Power on, 06h=Standby(error); DATA06 operation status codes 00h/04h/05h/06h/0Fh/10h."

- id: mute_status
  type: enum
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  description: "DATA01-05 of 078-4 MUTE STATUS REQUEST, each 00h=Off / 01h=On."

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  description: "DATA01 of 078-6 COVER STATUS REQUEST."

- id: lamp_information
  type: object
  description: "Response to 037-4: lamp usage time (seconds) or remaining life (%). Negative remaining life if replacement deadline exceeded. Updated at 1-minute intervals."

- id: filter_information
  type: object
  description: "Response to 037-3: filter usage time (seconds) and filter alarm start time (seconds); -1 if undefined."

- id: projector_information
  type: object
  description: "Response to 037: projector name, lamp usage time (seconds), filter usage time (seconds). DATA01-49 name, DATA83-86 lamp time, DATA87-90 filter time."

- id: lens_position
  type: object
  description: "Response to 053-1: upper/lower adjustment limits and current value for requested lens target."

- id: gain_parameter
  type: object
  description: "Response to 060-1: adjustability status, upper/lower/default/current values, wide/narrow adjustment widths for the requested gain."

- id: input_status
  type: object
  description: "Response to 078-3: signal switch process, signal list number (value-1), selection signal types 1 & 2, signal list type, test pattern display, content displayed."

- id: basic_information
  type: object
  description: "Response to 305-3: operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

- id: eco_mode
  type: enum
  description: "Response to 097-8 (values per Appendix). Returns Light mode or Lamp mode depending on projector."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "DATA01 of 097-243-1 response."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "DATA01 of 053-11 LENS PROFILE REQUEST."

- id: error_response
  type: object
  description: "AXh-frame failure response carrying ERR1/ERR2 codes per §2.4 error code list (unrecognized command, unsupported, invalid value, invalid input, memory errors, power off, no authority, gain errors, etc.)."
```

## Variables
```yaml
- id: volume
  type: integer
  description: "Audio volume (set via 030-2 VOLUME ADJUST, queried via 060-1 with data01=05h)."

- id: brightness
  type: integer
  description: "Picture brightness (set via 030-1 with data01=00h, queried via 060-1 with data01=00h)."

- id: contrast
  type: integer
  description: "Picture contrast (030-1 data01=01h / 060-1 data01=01h)."

- id: color
  type: integer
  description: "Picture color (030-1 data01=02h / 060-1 data01=02h)."

- id: hue
  type: integer
  description: "Picture hue (030-1 data01=03h / 060-1 data01=03h)."

- id: sharpness
  type: integer
  description: "Picture sharpness (030-1 data01=04h / 060-1 data01=04h)."

- id: lamp_adjust
  type: integer
  description: "Lamp/Light adjust (030-15 data01=96h / 060-1 data01=96h)."

- id: eco_mode
  type: enum
  description: "Eco/Light/Lamp mode (set via 098-8, queried via 097-8). Values per Appendix."

- id: projector_name
  type: string
  description: "LAN projector name, up to 16 bytes (set via 098-45, queried via 097-45)."

- id: lens_memory_option_load_by_signal
  type: enum
  values: [off, on]
  description: "Lens memory LOAD BY SIGNAL option (053-5/053-6)."

- id: lens_memory_option_forced_mute
  type: enum
  values: [off, on]
  description: "Lens memory FORCED MUTE option (053-5/053-6)."

- id: edge_blending
  type: enum
  values: [off, on]
  description: "Edge blending mode (098-243-1 / 097-243-1)."
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited (command/response model).
# UNRESOLVED: source does not document any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: populate if a separate operations manual describes macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (not formal interlocks, but operational constraints):
#   - 015 POWER ON: while powering on, no other command can be accepted.
#   - 016 POWER OFF: while powering off (including cooling time), no other command can be accepted.
#   - Error code 02h/0Dh: "The command cannot be accepted because the power is off."
#   - Error code 02h/0Fh: "There is no authority necessary for the operation."
#   - DATA09 Bit1 of 009 error status: "The interlock switch is open."
# <!-- UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated in this command reference. -->
```

## Notes
- Command frame format (§2.1): `20h 88h <ID1> <ID2> <LEN> <DATA01> - <DATA12> <CKS>`. All values hexadecimal.
- ID1 = control ID set on the projector; ID2 = model code (varies by model).
- Checksum (CKS): sum all preceding bytes, take low-order one byte. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- Response ACK byte: leading byte `2Xh` (where X matches command group) = success; `AXh` = error carrying ERR1/ERR2.
- Serial cable must be a cross cable wired to the PC CONTROL port (D-SUB 9P): pin2=RxD, pin3=TxD, pin5=GND, pin7=RTS, pin8=CTS.
- Picture/Sound/Onscreen mute auto-clears on input terminal switch or video signal switch (per §3.5, §3.7, §3.9). Sound mute also clears on volume adjustment.
- Lamp/filter usage time reported in one-second units but only refreshed at one-minute intervals.
- 098-198 PIP/PBP SET response DATA01 codes differ from request (response uses 00h/01h/02h/03h/04h; request uses 00h/01h/02h/09h/0Ah) — see source §3.48.
- 053 LENS CONTROL: after sending 7Fh (continuous +) or 81h (continuous -), send 00h to stop. Lens can be re-driven without explicit stop while in motion.
- Reference lens memory commands (053-4, 053-10, 053-11) operate on the profile number selected via 053-10.

<!-- UNRESOLVED: input terminal code values, aspect values, eco mode values, base model type values, and sub input setting values reference an Appendix ("Supplementary Information by Command") not included in this refined source. -->
<!-- UNRESOLVED: ID2 model code value for NP PX1004UL WH not stated in this command reference. -->
<!-- UNRESOLVED: default control ID (ID1) value not stated in this command reference. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: command timeout / inter-command delay not specified in source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:58:14.254Z
last_checked_at: 2026-06-18T08:52:31.784Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:52:31.784Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit specifics not documented in this source (refers to separate operation manual)."
- "input terminal code values, aspect values, eco mode values, base model type values, and sub input values reference an Appendix (\"Supplementary Information by Command\") not present in this refined source."
- "firmware version compatibility not stated in source."
- "source does not document any push/event mechanism."
- "populate if a separate operations manual describes macro sequences."
- "no explicit safety interlock procedures or power-on sequencing requirements stated in this command reference."
- "input terminal code values, aspect values, eco mode values, base model type values, and sub input setting values reference an Appendix (\"Supplementary Information by Command\") not included in this refined source."
- "ID2 model code value for NP PX1004UL WH not stated in this command reference."
- "default control ID (ID1) value not stated in this command reference."
- "command timeout / inter-command delay not specified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
