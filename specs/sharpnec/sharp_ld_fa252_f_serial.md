---
spec_id: admin/sharp-nec-ld-fa252-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa252 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa252 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa252 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:32:41.129Z
last_checked_at: 2026-09-20T22:17:21.825Z
generated_at: 2026-09-20T22:17:21.825Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) is referenced but not included in the source — those enum value sets are unresolved."
  - "firmware version compatibility not stated in source"
  - "standby-mode command reception capability for this model stated as model-dependent (\"Some models cannot receive commands in standby mode\") — not resolved for this model"
  - "flow_control not stated in source (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified)"
  - "input terminal values not in source\""
  - "aspect value list is in the Appendix, not present in source\""
  - "other DATA01 values not present in source\""
  - "eco mode value list is in the Appendix, not present in source\""
  - "in Appendix, not present in source.\""
  - "value list is in the Appendix, not present in source\""
  - "in Appendix, not present in source\""
  - "base model type value list is in the Appendix, not present in source\""
  - "input terminal values are in the Appendix, not present in source\""
  - "value list in Appendix, not present in source\""
  - "current-value readback for picture/volume gains only via 060-1 Gain Parameter Request 3."
  - "no explicit safety warnings or interlock procedures in source. Note: error"
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP sub input values) not included in source"
  - "standby command reception for this model is model-dependent per source"
  - "serial flow control setting not stated"
verification:
  verdict: verified
  checked_at: 2026-09-20T22:17:21.825Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match the source command catalogue1:1, transport parameters verified verbatim, no extras. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC Ld Fa252 F Control Spec

## Summary
Sharp/NEC Ld Fa252 F projector controlled via a binary hexadecimal frame protocol over RS-232C serial (PC CONTROL port) or wired/wireless LAN (TCP port 7142). Covers 53 commands: power, input switching, mutes, picture/volume/aspect/gain adjust, lens control and memory, freeze, shutter, eco mode, edge blending, PIP/PbP, and status/information queries. Source: Projector Control Command Reference Manual (rev 8.0, June 29, 2022).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, sub input values) is referenced but not included in the source — those enum value sets are unresolved. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: standby-mode command reception capability for this model stated as model-dependent ("Some models cannot receive commands in standby mode") — not resolved for this model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # supported values stated in source; selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow_control not stated in source (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON / POWER OFF commands (015/016)
  - queryable  # inferred: extensive request commands (009, 037 series, 078 series, 097 series, 305 series)
  - routable  # inferred: INPUT SW CHANGE command (018)
  - levelable  # inferred: VOLUME ADJUST / PICTURE ADJUST / gain adjust commands (030-1, 030-2, 030-15)
```

## Actions
```yaml
# Frame format: <payload> <CKS>. CKS = low-order byte of the sum of all preceding bytes.
# ID1 (control ID set on projector) and ID2 (model code) appear only in responses.
# All payloads verbatim from source (hex notation preserved).
actions:
  - id: error_status_request
    label: "009 Error Status Request"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
  - id: power_on
    label: "015 Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command is accepted."
  - id: power_off
    label: "016 Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time), no other command is accepted."
  - id: input_sw_change
    label: "018 Input SW Change"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Input terminal hex byte. Example from source: 06h = Video port. Full input-terminal value list is in the Appendix (not present in source) - # UNRESOLVED: input terminal values not in source"
    example: "02h 03h 00h 00h 02h 01h 06h 0Eh  # switch to video port"
  - id: picture_mute_on
    label: "020 Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."
  - id: picture_mute_off
    label: "021 Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []
  - id: sound_mute_on
    label: "022 Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."
  - id: sound_mute_off
    label: "023 Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []
  - id: onscreen_mute_on
    label: "024 Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."
  - id: onscreen_mute_off
    label: "025 Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []
  - id: picture_adjust
    label: "030-1 Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data03
        type: integer
        description: "Adjustment value, low-order 8 bits"
      - name: data04
        type: integer
        description: "Adjustment value, high-order 8 bits"
    example: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h  # brightness = 10"
  - id: volume_adjust
    label: "030-2 Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data02
        type: integer
        description: "Adjustment value, low-order 8 bits"
      - name: data03
        type: integer
        description: "Adjustment value, high-order 8 bits"
    example: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h  # volume = 10"
  - id: aspect_adjust
    label: "030-12 Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Aspect value - # UNRESOLVED: aspect value list is in the Appendix, not present in source"
  - id: other_adjust
    label: "030-15 Other Adjust (Lamp/Light Adjust)"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: data01
        type: string
        description: "DATA01=96h combined with DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST (only target documented in source)"
      - name: data02
        type: string
        description: "FFh (fixed for LAMP ADJUST / LIGHT ADJUST)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data04
        type: integer
        description: "Adjustment value, low-order 8 bits"
      - name: data05
        type: integer
        description: "Adjustment value, high-order 8 bits"
  - id: information_request
    label: "037 Information Request"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 projector name, DATA83-86 lamp usage time (s), DATA87-90 filter usage time (s). Updated at one-minute intervals."
  - id: filter_usage_information_request
    label: "037-3 Filter Usage Information Request"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s); -1 if undefined."
  - id: lamp_information_request_3
    label: "037-4 Lamp Information Request 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    example: "03h 96h 00h 00h 02h 00h 01h 9Ch  # get lamp 1 usage time"
  - id: carbon_savings_information_request
    label: "037-6 Carbon Savings Information Request"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."
  - id: remote_key_code
    label: "050 Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: keycode
        type: string
        description: "WORD key code as DATA01/DATA02. Documented keys: 02h 00h POWER ON; 03h 00h POWER OFF; 05h 00h AUTO; 06h 00h MENU; 07h 00h UP; 08h 00h DOWN; 09h 00h RIGHT; 0Ah 00h LEFT; 0Bh 00h ENTER; 0Ch 00h EXIT; 0Dh 00h HELP; 0Fh 00h MAGNIFY UP; 10h 00h MAGNIFY DOWN; 13h 00h MUTE; 29h 00h PICTURE; 4Bh 00h COMPUTER1; 4Ch 00h COMPUTER2; 4Fh 00h VIDEO1; 51h 00h S-VIDEO1; 84h 00h VOLUME UP; 85h 00h VOLUME DOWN; 8Ah 00h FREEZE; A3h 00h ASPECT; D7h 00h SOURCE; EEh 00h LAMP MODE/ECO"
    example: "02h 0Fh 00h 00h 02h 05h 00h 18h  # send key code AUTO"
  - id: shutter_close
    label: "051 Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
  - id: shutter_open
    label: "052 Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
  - id: lens_control
    label: "053 Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 06h=Periphery Focus is the only value documented in this source - # UNRESOLVED: other DATA01 values not present in source"
      - name: data02
        type: string
        description: "Drive: 00h=Stop; 01h=drive 1s plus; 02h=drive 0.5s plus; 03h=drive 0.25s plus; 7Fh=drive plus (continuous); 81h=drive minus (continuous); FDh=drive 0.25s minus; FEh=drive 0.5s minus; FFh=drive 1s minus"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. While the lens is being driven, the same command may be reissued without a stop."
  - id: lens_control_request
    label: "053-1 Lens Control Request"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment target (same coding as command 053)"
    notes: "Response returns upper/lower adjustment limits and current value (16-bit, DATA02-07)."
  - id: lens_control_2
    label: "053-2 Lens Control 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: data01
        type: string
        description: "FFh=Stop (mode/value not referenced when Stop)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: data03
        type: integer
        description: "Adjustment value, low-order 8 bits"
      - name: data04
        type: integer
        description: "Adjustment value, high-order 8 bits"
  - id: lens_memory_control
    label: "053-3 Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
  - id: reference_lens_memory_control
    label: "053-4 Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls the profile number selected via command 053-10 LENS PROFILE SET."
  - id: lens_memory_option_request
    label: "053-5 Lens Memory Option Request"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  - id: lens_memory_option_set
    label: "053-6 Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"
  - id: lens_information_request
    label: "053-7 Lens Information Request"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bit field: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift (H), Bit4 lens shift (V) - 0=Stop, 1=During operation."
  - id: lens_profile_set
    label: "053-10 Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"
  - id: lens_profile_request
    label: "053-11 Lens Profile Request"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
  - id: gain_parameter_request_3
    label: "060-1 Gain Parameter Request 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    example: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh  # get brightness adjusted value"
    notes: "Response DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist), DATA02-13 adjustment range/default/current/widths, DATA14 default validity."
  - id: setting_request
    label: "078-1 Setting Request"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03 base model type, DATA04 sound function (00h not available / 01h available), DATA05 profile number."
  - id: running_status_request
    label: "078-2 Running Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response DATA03 power status (00h standby / 01h power on / FFh not supported), DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h standby sleep, 04h power on, 05h cooling, 06h standby error, 0Fh standby power saving, 10h network standby)."
  - id: input_status_request
    label: "078-3 Input Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response DATA01 signal switch process, DATA02 signal list number (returned value = practical value - 1), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 signal list type, DATA06 test pattern, DATA09 content displayed."
  - id: mute_status_request
    label: "078-4 Mute Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off / 01h on each)."
  - id: model_name_request
    label: "078-5 Model Name Request"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32 model name (NUL-terminated)."
  - id: cover_status_request
    label: "078-6 Cover Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."
  - id: freeze_control
    label: "079 Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"
  - id: information_string_request
    label: "084 Information String Request"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=horizontal synchronous frequency, 04h=vertical synchronous frequency"
  - id: eco_mode_request
    label: "097-8 Eco Mode Request"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value depending on projector - # UNRESOLVED: eco mode value list is in the Appendix, not present in source"
  - id: lan_projector_name_request
    label: "097-45 LAN Projector Name Request"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17 projector name (NUL-terminated)."
  - id: lan_mac_address_status_request_2
    label: "097-155 LAN MAC Address Status Request 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06 MAC address."
  - id: pip_pbp_request
    label: "097-198 PIP/Picture By Picture Request"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION values: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values # UNRESOLVED: in Appendix, not present in source."
  - id: edge_blending_mode_request
    label: "097-243-1 Edge Blending Mode Request"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h=OFF, 01h=ON."
  - id: eco_mode_set
    label: "098-8 Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Value for the eco mode - # UNRESOLVED: value list is in the Appendix, not present in source"
    notes: "Sets Light mode or Lamp mode depending on projector."
  - id: lan_projector_name_set
    label: "098-45 LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-padded"
  - id: pip_pbp_set
    label: "098-198 PIP/Picture By Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value: MODE 00h=PIP / 01h=PICTURE BY PICTURE; START POSITION 00h=TOP-LEFT / 01h=TOP-RIGHT / 02h=BOTTOM-LEFT / 03h=BOTTOM-RIGHT; sub input values # UNRESOLVED: in Appendix, not present in source"
  - id: edge_blending_mode_set
    label: "098-243-1 Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h=OFF, 01h=ON"
  - id: base_model_type_request
    label: "305-1 Base Model Type Request"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type - # UNRESOLVED: base model type value list is in the Appendix, not present in source"
  - id: serial_number_request
    label: "305-2 Serial Number Request"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16 serial number (NUL-terminated)."
  - id: basic_information_request
    label: "305-3 Basic Information Request"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response DATA01 operation status, DATA02 content displayed, DATA03-04 selection signal type, DATA05 display signal type (video systems), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."
  - id: audio_select_set
    label: "319-10 Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Input terminal - # UNRESOLVED: input terminal values are in the Appendix, not present in source"
      - name: data02
        type: string
        description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses: success ACK frames begin 2Xh (e.g. "22h 00h <ID1> <ID2> 00h <CKS>"), query success
# responses begin 2Xh with LEN + DATA, error responses begin AXh with <ERR1> <ERR2> <CKS>.
feedbacks:
  - id: command_error
    type: enum
    description: "Error response: A{cmd}h {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}. ERR1/ERR2 pairs: 00h/00h unrecognized command; 00h/01h not supported by model; 01h/00h invalid value; 01h/01h invalid input terminal; 01h/02h invalid language; 02h/00h memory allocation error; 02h/02h memory in use; 02h/03h value cannot be set; 02h/04h forced onscreen mute on; 02h/06h viewer error; 02h/07h no signal; 02h/08h test pattern or filter displayed; 02h/09h no PC card; 02h/0Ah memory operation error; 02h/0Ch entry list displayed; 02h/0Dh power is off; 02h/0Eh execution failed; 02h/0Fh no authority; 03h/00h wrong gain number; 03h/01h invalid gain; 03h/02h adjustment failed"
  - id: error_status
    type: bitmask
    description: "Command 009 response, DATA01-12 bit fields (bit=1 means error). DATA01: cover, temperature (bimetal), fan, power, lamp off, lamp replacement moratorium. DATA02: lamp usage time exceeded, formatter error, lamp 2 off. DATA03: FPGA error, temperature sensor error, lamp not present, lamp data error, mirror cover error, lamp 2 moratorium, lamp 2 time exceeded. DATA04: lamp 2 not present, lamp 2 data error, dust temperature error, foreign matter sensor, ballast comm error, iris calibration error, lens not installed. DATA09 extended: portrait cover side up, interlock switch open, system error (slave CPU / formatter)."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "Via 078-2 DATA03/DATA06 and 305-3 DATA01"
  - id: input_status
    type: object
    description: "Via 078-3 / 305-3: signal switch process, signal list number (returned = actual - 1), signal type 1/2, list type, test pattern, content displayed"
  - id: mute_status
    type: object
    description: "Via 078-4 / 305-3: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display, freeze status - each 00h off / 01h on"
  - id: lamp_usage_time
    type: integer
    description: "Seconds, via 037 (DATA83-86) or 037-4; updated at one-minute intervals"
  - id: lamp_remaining_life
    type: integer
    description: "Percent, via 037-4 (content 04h); negative if replacement deadline exceeded"
  - id: filter_usage_time
    type: integer
    description: "Seconds, via 037-3 / 037"
  - id: carbon_savings
    type: number
    description: "kg (DATA02-05) + mg (DATA06-09), via 037-6"
  - id: model_name
    type: string
    description: "Via 078-5"
  - id: serial_number
    type: string
    description: "Via 305-2"
  - id: projector_name
    type: string
    description: "Via 097-45"
  - id: mac_address
    type: string
    description: "6 bytes, via 097-155"
  - id: cover_status
    type: enum
    values: [open, closed]
    description: "Via 078-6: mirror cover or lens cover"
  - id: eco_mode
    type: enum
    description: "Via 097-8 - # UNRESOLVED: value list in Appendix, not present in source"
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Via 097-243-1"
  - id: sync_frequency
    type: string
    description: "Horizontal (03h) / vertical (04h) synchronous frequency strings, via 084"
  - id: lens_operation_status
    type: bitmask
    description: "Via 053-7: bits for lens memory, zoom, focus, lens shift H/V - 0=Stop, 1=During operation"
```

## Variables
```yaml
# All settable parameters in this protocol are discrete commands (see Actions);
# no separate variable model is defined by the source.
# UNRESOLVED: current-value readback for picture/volume gains only via 060-1 Gain Parameter Request 3.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source. Note: error
# status (009 DATA09 Bit1) reports "the interlock switch is open" as a device fault bit;
# power commands block all other commands during on/off transitions (incl. cooling).
```

## Notes
- Binary hex frame protocol: every command ends with CKS = low-order byte of sum of all preceding bytes (worked example: `20h 81h 01h 60h 01h 00h` → 103h → CKS 03h).
- Response frames echo command code with high bit patterns: normal ACK `2Xh`, query data response `2Xh` + LEN + DATA, error `AXh` + ERR1/ERR2. ID1 (control ID set on projector) and ID2 (model code) are returned in responses.
- Serial cable must be a cross cable on the PC CONTROL D-SUB 9P port (pin 2 RxD↔TxD, 3 TxD↔RxD, 5 GND, 7 RTS↔CTS, 8 CTS↔RTS).
- LAN: wired IEEE802.3/802.3u auto-negotiated 10/100; wireless via optional wireless LAN unit; TCP port 7142.
- Lamp/filter usage times are reported in one-second units but updated at one-minute intervals.
- Commands 015/016 reject all other commands during the power transition and cooling period.
- Document revision history in source: rev 8.0 (2022-06-29) is the current command set.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, PIP sub input values) not included in source -->
<!-- UNRESOLVED: standby command reception for this model is model-dependent per source -->
<!-- UNRESOLVED: serial flow control setting not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:32:41.129Z
last_checked_at: 2026-09-20T22:17:21.825Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:17:21.825Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match the source command catalogue1:1, transport parameters verified verbatim, no extras. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) is referenced but not included in the source — those enum value sets are unresolved."
- "firmware version compatibility not stated in source"
- "standby-mode command reception capability for this model stated as model-dependent (\"Some models cannot receive commands in standby mode\") — not resolved for this model"
- "flow_control not stated in source (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified)"
- "input terminal values not in source\""
- "aspect value list is in the Appendix, not present in source\""
- "other DATA01 values not present in source\""
- "eco mode value list is in the Appendix, not present in source\""
- "in Appendix, not present in source.\""
- "value list is in the Appendix, not present in source\""
- "in Appendix, not present in source\""
- "base model type value list is in the Appendix, not present in source\""
- "input terminal values are in the Appendix, not present in source\""
- "value list in Appendix, not present in source\""
- "current-value readback for picture/volume gains only via 060-1 Gain Parameter Request 3."
- "no explicit safety warnings or interlock procedures in source. Note: error"
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP sub input values) not included in source"
- "standby command reception for this model is model-dependent per source"
- "serial flow control setting not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
