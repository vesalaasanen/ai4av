---
spec_id: admin/sharp-nec-e244f-bk
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sharp/NEC E244F Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "E244F Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "E244F Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-17T17:36:32.707Z
last_checked_at: 2026-07-22T00:46:49.454Z
generated_at: 2026-07-22T00:46:49.454Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source title is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1). Many commands (shutter, lens, lamp, edge blending) are projector-only — not applicable to E244F Bk monitor. Model-fit per-command unverified. Firmware version not stated."
  - "source does not name E244F Bk; model-fit per-command unverified."
  - "firmware version compatibility not stated in source."
  - "full input-terminal value list (DATA01 of 018, 319-10) referenced to \"Appendix Supplementary Information by Command\" not present in refined source."
  - "full aspect value list (030-12 DATA01) referenced to appendix not present in refined source."
  - "full eco mode value list (097-8 / 098-8 DATA01) referenced to appendix not present in refined source."
  - "sub input setting value list (097-198 / 098-198) referenced to appendix not present in refined source."
  - "base model type value list (078-1, 305-1) referenced to appendix not present in refined source."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:46:49.454Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command opcodes verified as verbatim matches in source; transport parameters confirmed; comprehensive one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC E244F Bk Control Spec

## Summary
Sharp/NEC E244F Bk display. Binary RS-232C + LAN (TCP) control protocol, hex-byte framed commands w/ checksum. 53 commands documented in source: power, mutes, input switch, lens control/memory, picture/volume/aspect adjust, status queries, network/lamp/eco settings, freeze, shutter, PIP/PbP, edge blending, audio select.

<!-- UNRESOLVED: source title is generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Many commands (shutter, lens, lamp, edge blending) are projector-only — not applicable to E244F Bk monitor. Model-fit per-command unverified. Firmware version not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source: "115200/38400/19200/9600/4800 bps" all supported; 9600 is common default, others selectable
  baud_rates_supported: [4800, 9600, 19200, 38400, 115200]  # verbatim from source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: RTS/CTS wired pin 7/8 cross; full duplex stated; flow control policy not explicit
addressing:
  port: 7142  # source: "Use TCP port number 7142"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # 015 POWER ON / 016 POWER OFF
  - queryable       # many *REQUEST commands return status
  - levelable       # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, lens adjustments
  - routable        # 018 INPUT SW CHANGE, 319-10 AUDIO SELECT
```

## Actions
```yaml
# Frame: <CMD> <SUB> <ID1> <ID2> <LEN> <DATA...> <CKS>. Checksum = low byte of sum of all preceding bytes.
# 53 distinct commands, each its own source row.

- id: cmd_009_error_status_request
  label: "009 ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA1-12 error bitfield. DATA09 extended status includes interlock switch open (bit1), system errors (bits2/3)."

- id: cmd_015_power_on
  label: "015 POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on sequence."

- id: cmd_016_power_off
  label: "016 POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: "018 INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value (hex). e.g. 06h=video port. See Appendix 'Supplementary Information by Command' for full list."
    - name: cks
      type: string
      description: "Checksum byte = low byte of sum of preceding bytes."

- id: cmd_020_picture_mute_on
  label: "020 PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: cmd_021_picture_mute_off
  label: "021 PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: "022 SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input switch, video signal switch, or volume adjustment."

- id: cmd_023_sound_mute_off
  label: "023 SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024 ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: cmd_025_onscreen_mute_off
  label: "025 ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: "030-1 PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: "Adjustment value (low 8 bits)."
    - name: data04
      type: string
      description: "Adjustment value (high 8 bits)."

- id: cmd_030_2_volume_adjust
  label: "030-2 VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: "Value (low 8 bits)."
    - name: data03
      type: string
      description: "Value (high 8 bits)."

- id: cmd_030_12_aspect_adjust
  label: "030-12 ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: cmd_030_15_other_adjust
  label: "030-15 OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target. Known: 96h = LAMP/LIGHT ADJUST."
    - name: data02
      type: string
      description: "Sub-target (e.g. FFh for LAMP ADJUST)."
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: "Value (low 8 bits)."
    - name: data05
      type: string
      description: "Value (high 8 bits)."

- id: cmd_037_information_request
  label: "037 INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (D01-49), lamp usage time sec (D83-86), filter usage time sec (D87-90)."

- id: cmd_037_3_filter_usage_information_request
  label: "037-3 FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time + alarm start time (sec). -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: "037-4 LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6 CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total, 01h=During operation."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_050_remote_key_code
  label: "050 REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type)."
    - name: data02
      type: string
      description: "Key code high byte. Known key codes (DATA01/DATA02 -> name): 02/00=POWER ON, 03/00=POWER OFF, 05/00=AUTO, 06/00=MENU, 07/00=UP, 08/00=DOWN, 09/00=RIGHT, 0A/00=LEFT, 0B/00=ENTER, 0C/00=EXIT, 0D/00=HELP, 0F/00=MAGNIFY UP, 10/00=MAGNIFY DOWN, 13/00=MUTE, 29/00=PICTURE, 4B/00=COMPUTER1, 4C/00=COMPUTER2, 4F/00=VIDEO1, 51/00=S-VIDEO1, 84/00=VOLUME UP, 85/00=VOLUME DOWN, 8A/00=FREEZE, A3/00=ASPECT, D7/00=SOURCE, EE/00=LAMP MODE/ECO."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_051_shutter_close
  label: "051 SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: "052 SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: "053 LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target. Known: 06h=Periphery Focus."
    - name: data02
      type: string
      description: "Drive content: 00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus (continuous), 81h=Drive minus (continuous), FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "After 7Fh/81h continuous drive, send 00h to stop. While lens is being driven, same command can be reissued without stop."

- id: cmd_053_1_lens_control_request
  label: "053-1 LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target (same encoding as 053 LENS CONTROL DATA01)."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Returns upper/lower limit and current value of adjustment range for target."

- id: cmd_053_2_lens_control_2
  label: "053-2 LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target, or FFh=Stop (when Stop, DATA02-04 not referenced)."
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: "Value (low 8 bits)."
    - name: data04
      type: string
      description: "Value (high 8 bits)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_053_3_lens_memory_control
  label: "053-3 LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4 REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Operates on the profile number selected by 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5 LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Returns DATA02 setting value: 00h=OFF, 01h=ON."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6 LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_053_7_lens_information_request
  label: "053-7 LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V). 0=Stop, 1=During operation."

- id: cmd_053_10_lens_profile_set
  label: "053-10 LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_053_11_lens_profile_request
  label: "053-11 LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile number (00h=Profile 1, 01h=Profile 2); DATA02 reserved."

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1 GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Returns 16-byte block: adjustment status, upper/lower/default/current values, wide/narrow adjustment widths, default validity."

- id: cmd_078_1_setting_request
  label: "078-1 SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns DATA01-03 base model type, DATA04 sound function (00h=Not available/01h=Available), DATA05 profile number."

- id: cmd_078_2_running_status_request
  label: "078-2 RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns DATA03 power status (00h=Standby, 01h=Power on, FFh=Not supported), DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

- id: cmd_078_3_input_status_request
  label: "078-3 INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: cmd_078_4_mute_status_request
  label: "078-4 MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display. All 00h=Off/01h=On."

- id: cmd_078_5_model_name_request
  label: "078-5 MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns DATA01-32 model name (NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: "078-6 COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: "079 FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=Freeze ON, 02h=Freeze OFF."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_084_information_string_request
  label: "084 INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Returns label/information string (NUL-terminated)."

- id: cmd_097_8_eco_mode_request
  label: "097-8 ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns DATA01 eco mode value. Per projector, returns 'Light mode' or 'Lamp mode'. See Appendix 'Supplementary Information by Command'."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45 LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns DATA01-17 projector name (NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155 LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns DATA01-06 MAC address (6 bytes)."

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198 PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Returns DATA02 setting value. MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION values: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1 EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: "098-8 ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Value set for the eco mode. See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Per projector, sets 'Light mode' or 'Lamp mode'."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45 LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Projector name byte 1."
    - name: data02
      type: string
      description: "Projector name byte 2."
    - name: data03
      type: string
      description: "Projector name byte 3."
    - name: data04
      type: string
      description: "Projector name byte 4."
    - name: data05
      type: string
      description: "Projector name byte 5."
    - name: data06
      type: string
      description: "Projector name byte 6."
    - name: data07
      type: string
      description: "Projector name byte 7."
    - name: data08
      type: string
      description: "Projector name byte 8."
    - name: data09
      type: string
      description: "Projector name byte 9."
    - name: data10
      type: string
      description: "Projector name byte 10."
    - name: data11
      type: string
      description: "Projector name byte 11."
    - name: data12
      type: string
      description: "Projector name byte 12."
    - name: data13
      type: string
      description: "Projector name byte 13."
    - name: data14
      type: string
      description: "Projector name byte 14."
    - name: data15
      type: string
      description: "Projector name byte 15."
    - name: data16
      type: string
      description: "Projector name byte 16."
    - name: cks
      type: string
      description: "Checksum byte."
  notes: "Projector name up to 16 bytes; trailing 00h terminator after DATA16."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198 PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. SUB INPUT: see Appendix."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1 EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte."

- id: cmd_305_1_base_model_type_request
  label: "305-1 BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type."

- id: cmd_305_2_serial_number_request
  label: "305-2 SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns DATA01-16 serial number (NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: "305-3 BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10 AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value. See Appendix 'Supplementary Information by Command'."
    - name: data02
      type: string
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: string
      description: "Checksum byte."
```

## Feedbacks
```yaml
# Response framing (per source section 2.3): success response echoes command with high bit set on
# first byte (e.g. POWER ON -> A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>). Data-bearing success
# prefixes first byte with 20h/22h/23h depending on command class. Failure response sets top nibble
# to Axh and carries ERR1/ERR2 per source section 2.4 error code list.
# Each query action above documents its specific return payload in `notes`.
```

## Variables
```yaml
# Settable parameters not modeled as discrete actions are covered by ADJUST-family actions
# (030-1 PICTURE, 030-2 VOLUME, 030-12 ASPECT, 030-15 OTHER, 053/053-2 LENS) and SET-family
# actions (098-8 ECO, 098-45 NAME, 098-198 PIP, 098-243-1 EDGE BLEND, 319-10 AUDIO SELECT).
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are command-driven.
```

## Macros
```yaml
# Source describes no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "No other command accepted during power-on sequence."
  - command: cmd_016_power_off
    note: "No other command accepted during power-off incl. cooling time."
  - command: cmd_053_lens_control
    note: "Continuous lens drive (DATA02=7Fh/81h) must be explicitly stopped with DATA02=00h."
# Error status (009) bitfield surfaces cover error, temperature error, fan error, interlock switch
# open, foreign matter sensor - monitor via periodic 009 query if reliability required.
```

## Notes
- Source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1.
- Frame layout: `<CMD> <SUB> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Checksum = low byte of sum of all preceding bytes (per source section 2.2 / example on p.10).
- Error response codes documented in source section 2.4 (ERR1/ERR2 combinations, e.g. 02h/0Dh = "command cannot be accepted because the power is off").
- Many commands (shutter, lens family, lamp adjust, edge blending, PIP/PbP) are projector-oriented; E244F Bk is a desktop monitor. Per-command applicability not stated in source.

<!-- UNRESOLVED: source does not name E244F Bk; model-fit per-command unverified. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full input-terminal value list (DATA01 of 018, 319-10) referenced to "Appendix Supplementary Information by Command" not present in refined source. -->
<!-- UNRESOLVED: full aspect value list (030-12 DATA01) referenced to appendix not present in refined source. -->
<!-- UNRESOLVED: full eco mode value list (097-8 / 098-8 DATA01) referenced to appendix not present in refined source. -->
<!-- UNRESOLVED: sub input setting value list (097-198 / 098-198) referenced to appendix not present in refined source. -->
<!-- UNRESOLVED: base model type value list (078-1, 305-1) referenced to appendix not present in refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-17T17:36:32.707Z
last_checked_at: 2026-07-22T00:46:49.454Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:46:49.454Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command opcodes verified as verbatim matches in source; transport parameters confirmed; comprehensive one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source title is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1). Many commands (shutter, lens, lamp, edge blending) are projector-only — not applicable to E244F Bk monitor. Model-fit per-command unverified. Firmware version not stated."
- "source does not name E244F Bk; model-fit per-command unverified."
- "firmware version compatibility not stated in source."
- "full input-terminal value list (DATA01 of 018, 319-10) referenced to \"Appendix Supplementary Information by Command\" not present in refined source."
- "full aspect value list (030-12 DATA01) referenced to appendix not present in refined source."
- "full eco mode value list (097-8 / 098-8 DATA01) referenced to appendix not present in refined source."
- "sub input setting value list (097-198 / 098-198) referenced to appendix not present in refined source."
- "base model type value list (078-1, 305-1) referenced to appendix not present in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
