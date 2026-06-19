---
spec_id: admin/sharp-nec-np-px2201ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX2201UL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX2201UL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX2201UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:34:58.832Z
last_checked_at: 2026-06-18T08:53:45.553Z
generated_at: 2026-06-18T08:53:45.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "appendix values for input terminal, aspect, eco mode, sub input, base model type referenced but not included in refined source"
  - "source contains no explicit safety warnings or power-on sequencing"
  - "Appendix \"Supplementary Information by Command\" values (input terminal, aspect, eco mode, sub input, base model type) not present in refined source"
  - "ID2 model code value for NP-PX2201UL not stated in source"
  - "default/expected baud rate among the five supported values not stated"
  - "firmware version compatibility not stated"
  - "protocol version not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:53:45.553Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX2201UL Control Spec

## Summary
Sharp/NEC NP-PX2201UL projector control spec covering both RS-232C serial and wired/wireless LAN (TCP) control interfaces. Uses a binary hex frame protocol with per-command checksums (CKS = low-order byte of sum of all preceding bytes). Source documents 53 distinct commands spanning power, input switching, mute, picture/volume adjustment, lens control, lens memory, status queries, and network/device information requests.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: appendix values for input terminal, aspect, eco mode, sub input, base model type referenced but not included in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported values: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; flow_control not explicitly named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from numerous request/query commands
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST commands
```

## Actions
```yaml
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
  notes: "While powering on, no other command accepted."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While powering off (including cooling time), no other command accepted."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Example switching to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

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
  notes: "Turned off by input switch, video signal switch, or volume adjustment."

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
  notes: "Turned off by input terminal switch or video signal switch."

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
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (e.g. 96h for LAMP/LIGHT ADJUST; DATA02=FFh)"
    - name: data02
      type: string
      description: "Adjustment target low byte (FFh when DATA01=96h)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Example lamp1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life returned if deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list, e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1)"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed codes)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Example AUTO key: 02h 0Fh 00h 00h 02h 05h 00h 18h. Key list includes POWER ON/OFF, AUTO, MENU, UP/DOWN/LEFT/RIGHT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO."

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
      type: string
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: data02
      type: string
      description: "Drive command: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop while driving by reissuing same command."

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Returns upper limit, lower limit, and current value (16-bit each)."

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target; FFh=Stop (mode/value ignored)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Controls profile specified by 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Returns DATA02 setting value: 00h=OFF, 01h=ON."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile: 00h=Profile 1, 01h=Profile 2."

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths. Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep functions (DATA05)."

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern, displayed content."

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status."

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (NUL-terminated string, DATA01-32)."

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
  notes: "Returns label/information string (NUL-terminated)."

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light/Lamp mode on some models). See Appendix."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (NUL-terminated, DATA01-17)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. See Appendix 'Supplementary Information by Command'."
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: data01_to_data16
      type: string
      description: "Projector name (up to 16 bytes)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (varies by target: MODE=00h PIP/01h PbP; START POSITION=00h TL/01h TR/02h BL/03h BR; or sub input value)"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (NUL-terminated, DATA01-16)."

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, displayed content, signal types, video/sound/onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value. See Appendix 'Supplementary Information by Command'."
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: string
      description: "Checksum = low-order byte of sum of all preceding bytes."
```

## Feedbacks
```yaml
# Responses are framed binary replies (success: 2Xh/AXh prefix with DATA + CKS;
# error: AXh prefix with ERR1 ERR2 CKS). Error code table documented in source §2.4.
- id: command_response
  type: object
  description: "Binary framed response. Success: 2Xh <ID1> <ID2> LEN <DATA> <CKS>. Error: AXh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."
- id: error_code
  type: enum
  description: "ERR1/ERR2 combinations per source §2.4 (e.g. 00h/00h=unrecognized command, 00h/01h=not supported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Fh=no authority)."
```

## Variables
```yaml
# Settable parameters are exposed as parameterized Actions above (volume, picture
# adjust, aspect, eco mode, lens position, edge blending, PIP/PbP, projector name).
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are solicited
# replies to commands.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress."
  - "POWER OFF: no other command accepted during power-off including cooling time."
# UNRESOLVED: source contains no explicit safety warnings or power-on sequencing
# requirements beyond the command-acceptance interlocks noted above.
```

## Notes
- Command frame format: `XXh YYh <ID1> <ID2> LEN <DATA...> <CKS>`. ID1 = control ID set on projector; ID2 = model code (varies by model). CKS = low-order byte of sum of all preceding bytes (see §2.2 checksum example).
- Serial cable: cross cable, D-SUB 9P on PC CONTROL port. Pin assignment documented in §1.1.
- LAN: RJ-45, 10/100 Mbps auto-switchable, IEEE 802.3 / 802.3u. Wireless LAN via separate wireless LAN unit (see operation manual).
- Usage time fields (lamp, filter) reported in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) returned as negative value if replacement deadline exceeded.
- Many DATA01 selector values (input terminal, aspect, eco mode, sub input, base model type) are defined in an Appendix "Supplementary Information by Command" that is not present in the refined source excerpt.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values (input terminal, aspect, eco mode, sub input, base model type) not present in refined source -->
<!-- UNRESOLVED: ID2 model code value for NP-PX2201UL not stated in source -->
<!-- UNRESOLVED: default/expected baud rate among the five supported values not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version not stated -->
```

Spec done. 53 actions enumerated — every command row from §2 covered, verbatim hex payloads preserved, parameterized commands show variable parts. Appendix values marked UNRESOLVED (referenced but not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:34:58.832Z
last_checked_at: 2026-06-18T08:53:45.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:53:45.553Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "appendix values for input terminal, aspect, eco mode, sub input, base model type referenced but not included in refined source"
- "source contains no explicit safety warnings or power-on sequencing"
- "Appendix \"Supplementary Information by Command\" values (input terminal, aspect, eco mode, sub input, base model type) not present in refined source"
- "ID2 model code value for NP-PX2201UL not stated in source"
- "default/expected baud rate among the five supported values not stated"
- "firmware version compatibility not stated"
- "protocol version not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
