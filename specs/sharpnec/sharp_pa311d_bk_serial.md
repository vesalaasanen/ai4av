---
spec_id: admin/sharp-nec-pa311d-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA311D-BK Control Spec"
manufacturer: Sharp/NEC
model_family: PA311D-BK
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PA311D-BK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:23:10.696Z
last_checked_at: 2026-06-23T08:40:12.586Z
generated_at: 2026-06-23T08:40:12.586Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated; flow_control not stated; default baud not stated (5 listed); ID1 control ID / ID2 model code runtime values not stated"
  - "not stated (comm mode = full duplex)"
  - "no dedicated aspect query in source"
  - "source documents no unsolicited notifications. All responses are command-replies (A*h prefix = error, 2*h = success)."
  - "source documents no named multi-step sequences."
  - "not specified"
  - "model code (ID2) value for PA311D-BK not in source"
  - "default baud rate not stated (5 listed: 115200/38400/19200/9600/4800)"
  - "flow_control not stated"
  - "firmware version compatibility not stated"
  - "input terminal byte values referenced to \"Appendix Supplementary Information by Command\" not present in this refined excerpt"
  - "aspect value byte space referenced to Appendix not present in this excerpt"
  - "eco mode value byte space referenced to Appendix not present in this excerpt"
  - "base model type values referenced to Appendix not present in this excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-23T08:40:12.586Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command opcodes verified verbatim in source; transport parameters (port 7142, baud rates, serial settings) confirmed. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA311D-BK Control Spec

## Summary
Sharp/NEC PA311D-BK projector control spec. Source covers RS-232C serial and wired/wireless LAN (TCP) control via binary hex command frames with checksum. 53 distinct commands: power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, status queries, eco/edge-blend/PIP set, info requests.

<!-- UNRESOLVED: firmware version range not stated; flow_control not stated; default baud not stated (5 listed); ID1 control ID / ID2 model code runtime values not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists 5 supported rates; default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated (comm mode = full duplex)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands
  - queryable      # inferred: many *REQUEST commands returning state
  - levelable      # inferred: PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL
  - routable       # inferred: INPUT SW CHANGE / AUDIO SELECT SET / PIP sub-input
```

## Actions
```yaml
- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-12 = error bitmap. See error info list (cover/fan/temp/lamp/formatter/mirror/interlock)."

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on sequence."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h=Video). See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: integer
      description: "Checksum = low byte of sum of all preceding bytes."
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response FFh = error."

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

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
  notes: "Cleared by input/video switch or volume adjust."

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
      description: "Target: 00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
    - name: data02
      type: integer
      description: "Mode: 00h=absolute 01h=relative"
    - name: data03
      type: integer
      description: "Value low byte"
    - name: data04
      type: integer
      description: "Value high byte"
    - name: cks
      type: integer
      description: "Checksum (low byte of preceding sum)."
  notes: "Brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: ...F6h FFh 0Ch."

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Mode: 00h=absolute 01h=relative"
    - name: data02
      type: integer
      description: "Value low byte"
    - name: data03
      type: integer
      description: "Value high byte"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST (Lamp/Light Adjust)"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target hi byte (96h for LAMP/LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Target lo byte (FFh)"
    - name: data03
      type: integer
      description: "Mode: 00h=absolute 01h=relative"
    - name: data04
      type: integer
      description: "Value low byte"
    - name: data05
      type: integer
      description: "Value high byte"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage sec (DATA83-86), filter usage sec (DATA87-90). Updated 1-min intervals."

- id: cmd_037_3_filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage sec (DATA01-04) and filter alarm start sec (DATA05-08). -1 if undefined."

- id: cmd_037_4_lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp1 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=usage sec 04h=remaining life %"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Eco mode reflected. Negative remaining life if deadline exceeded. Usage example: 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: cmd_037_6_carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total 01h=During operation"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
    - name: cks
      type: integer
      description: "Checksum."

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
      description: "Target: 06h=Periphery Focus (others per Appendix)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop 01h=+1s 02h=+0.5s 03h=+0.25s 7Fh=+cont 81h=-cont FDh=-0.25s FEh=-0.5s FFh=-1s"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Send 00h after 7Fh/81h to stop. Same cmd reissued during drive = continue."

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Target lens axis"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Returns upper/lower/current value (16-bit each)."

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: FFh=Stop"
    - name: data02
      type: integer
      description: "Mode: 00h=absolute 02h=relative"
    - name: data03
      type: integer
      description: "Value low byte"
    - name: data04
      type: integer
      description: "Value high byte"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE 01h=STORE 02h=RESET"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE 01h=STORE 02h=RESET"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Operates on profile set via 053-10."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL 01h=FORCED MUTE"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF 01h=ON"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bitmap: Bit0=LensMem Bit1=Zoom Bit2=Focus Bit3=LensShift(H) Bit4=LensShift(V) (0=stop 1=operating)."

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Profile 1 01h=Profile 2"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns 00h=Profile1 01h=Profile2."

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=BRIGHTNESS 01h=CONTRAST 02h=COLOR 03h=HUE 04h=SHARPNESS 05h=VOLUME 96h=LAMP/LIGHT ADJUST"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns range/default/current/wide/narrow widths."

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile (DATA05)."

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03=Power(00h standby/01h on) DATA04=Cooling DATA05=PowerOnOff process DATA06=Op status(00h standby sleep/04h on/05h cooling/06h standby err/0Fh power save/10h net standby)."

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Signal switch proc, list number (value-1), type1/2 (01h COMPUTER 02h VIDEO 03h S-VIDEO 04h COMPONENT 20h DVI-D 21h HDMI 22h DisplayPort 23h VIEWER6-10 07h VIEWER1-5), test pattern, content displayed."

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 PictureMute DATA02 SoundMute DATA03 OnscreenMute DATA04 ForcedOnscreenMute DATA05 OSD (00h off/01h on)."

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns NUL-terminated model name string (DATA01-32)."

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=normal(open) 01h=closed."

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze ON 02h=freeze OFF"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=Horizontal sync freq 04h=Vertical sync freq"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Returns variable-length label/freq string."

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light/Lamp mode value (see Appendix)."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns NUL-terminated projector name (DATA01-17)."

- id: cmd_097_155_lan_mac_address_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC (DATA01-06)."

- id: cmd_097_198_pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h=OFF 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco/Light/Lamp mode value (see Appendix)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Projector name bytes 1-16 (up to 16 bytes, NUL-terminated)"
    - name: cks
      type: integer
      description: "Checksum."
  notes: "DATA01-16 = name up to 16 bytes."

- id: cmd_098_198_pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE 01h=START POSITION 02h=SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Mode val (00h PIP/01h PBP) OR position (00h TL/01h TR/02h BL/03h BR) OR sub-input value (see Appendix)"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=OFF 01h=ON"
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type. See Appendix."

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns NUL-terminated serial number (DATA01-16)."

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "DATA01 op status, DATA02 content, DATA03/04 signal type, DATA05 video signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."
- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte. See Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Audio source: 00h=terminal specified in DATA01 01h=BNC 02h=COMPUTER"
    - name: cks
      type: integer
      description: "Checksum (low byte of sum of all preceding bytes)."
  notes: "Response DATA02: 00h=ended successfully 01h=ended with an error."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA04"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA04"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 DATA01"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 DATA09"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"

- id: lamp_remaining_life_pct
  type: integer
  source: "037-4 (DATA03-06 when DATA02=04h). Negative if deadline exceeded."

- id: lamp_usage_seconds
  type: integer
  source: "037-4 (DATA03-06 when DATA02=01h). Updated 1-min intervals."

- id: filter_usage_seconds
  type: integer
  source: "037-3 DATA01-04"

- id: error_status_bitmap
  type: bytes
  source: "009 DATA01-12. Bit=1 means error (cover/fan/temp/lamp/formatter/mirror cover/interlock/lens-installed)."
```

## Variables
```yaml
- id: brightness
  set_via: cmd_030_1_picture_adjust (data01=00h)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=00h)

- id: contrast
  set_via: cmd_030_1_picture_adjust (data01=01h)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=01h)

- id: color
  set_via: cmd_030_1_picture_adjust (data01=02h)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=02h)

- id: hue
  set_via: cmd_030_1_picture_adjust (data01=03h)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=03h)

- id: sharpness
  set_via: cmd_030_1_picture_adjust (data01=04h)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=04h)

- id: volume
  set_via: cmd_030_2_volume_adjust
  query_via: cmd_060_1_gain_parameter_request_3 (data01=05h)

- id: lamp_light_adjust
  set_via: cmd_030_15_other_adjust (data01=96h FFh)
  query_via: cmd_060_1_gain_parameter_request_3 (data01=96h)

- id: aspect
  set_via: cmd_030_12_aspect_adjust
  query_via: null  # UNRESOLVED: no dedicated aspect query in source

- id: eco_mode
  set_via: cmd_098_8_eco_mode_set
  query_via: cmd_097_8_eco_mode_request

- id: projector_name
  set_via: cmd_098_45_lan_projector_name_set
  query_via: cmd_097_45_lan_projector_name_request

- id: lens_memory_load_by_signal
  set_via: cmd_053_6_lens_memory_option_set (data01=00h)
  query_via: cmd_053_5_lens_memory_option_request (data01=00h)

- id: lens_memory_forced_mute
  set_via: cmd_053_6_lens_memory_option_set (data01=01h)
  query_via: cmd_053_5_lens_memory_option_request (data01=01h)

- id: lens_profile
  set_via: cmd_053_10_lens_profile_set
  query_via: cmd_053_11_lens_profile_request

- id: pip_pbp_mode
  set_via: cmd_098_198_pip_pbp_set (data01=00h)
  query_via: cmd_097_198_pip_pbp_request (data01=00h)

- id: pip_pbp_start_position
  set_via: cmd_098_198_pip_pbp_set (data01=01h)
  query_via: cmd_097_198_pip_pbp_request (data01=01h)

- id: edge_blending
  set_via: cmd_098_243_1_edge_blending_mode_set
  query_via: cmd_097_243_1_edge_blending_mode_request
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are command-replies (A*h prefix = error, 2*h = success).
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - cmd_016_power_off  # source: no other command accepted during power-off incl cooling
  - cmd_051_shutter_close  # optical path blocked
interlocks:
  - "POWER ON (015) blocks all other commands during ramp-up."
  - "POWER OFF (016) blocks all other commands during cooling time."
  - "PICTURE/SOUND/ONSCREEN mute auto-clear on input/video switch (source explicit)."
  - "SOUND mute also clears on volume adjust."
  - "DATA09 bit1 of error status (009): interlock switch open."
  - "Lens drive continuous (7Fh/81h) requires explicit Stop (00h)."
power_on_sequence: null  # UNRESOLVED: not specified
```

## Notes
- Command/response frame: leading byte indicates type — `02h/03h/01h/00h` = command, `22h/23h/21h/20h` = success response, `A2h/A3h/A1h/A0h` = error response.
- Checksum (CKS) = low-order byte of sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- ID1 = projector control ID (runtime-set). ID2 = model code (varies by model). Both are runtime parameters, not documented constants.
<!-- UNRESOLVED: model code (ID2) value for PA311D-BK not in source -->
<!-- UNRESOLVED: default baud rate not stated (5 listed: 115200/38400/19200/9600/4800) -->
<!-- UNRESOLVED: flow_control not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: input terminal byte values referenced to "Appendix Supplementary Information by Command" not present in this refined excerpt -->
<!-- UNRESOLVED: aspect value byte space referenced to Appendix not present in this excerpt -->
<!-- UNRESOLVED: eco mode value byte space referenced to Appendix not present in this excerpt -->
<!-- UNRESOLVED: base model type values referenced to Appendix not present in this excerpt -->
```

Spec above. 53 actions, every payload verbatim from source. Serial+TCP both populated (port 7142 explicit). Default baud/flow/firmware/mark UNRESOLVED. Appendix-referenced value tables marked UNRESOLVED (not in refined excerpt).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:23:10.696Z
last_checked_at: 2026-06-23T08:40:12.586Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T08:40:12.586Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command opcodes verified verbatim in source; transport parameters (port 7142, baud rates, serial settings) confirmed. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated; flow_control not stated; default baud not stated (5 listed); ID1 control ID / ID2 model code runtime values not stated"
- "not stated (comm mode = full duplex)"
- "no dedicated aspect query in source"
- "source documents no unsolicited notifications. All responses are command-replies (A*h prefix = error, 2*h = success)."
- "source documents no named multi-step sequences."
- "not specified"
- "model code (ID2) value for PA311D-BK not in source"
- "default baud rate not stated (5 listed: 115200/38400/19200/9600/4800)"
- "flow_control not stated"
- "firmware version compatibility not stated"
- "input terminal byte values referenced to \"Appendix Supplementary Information by Command\" not present in this refined excerpt"
- "aspect value byte space referenced to Appendix not present in this excerpt"
- "eco mode value byte space referenced to Appendix not present in this excerpt"
- "base model type values referenced to Appendix not present in this excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
