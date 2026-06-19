---
spec_id: admin/sharp-nec-led-q039i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED Q039I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED Q039I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED Q039I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:41:33.560Z
last_checked_at: 2026-06-18T08:08:43.617Z
generated_at: 2026-06-18T08:08:43.617Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input terminal DATA01 value map referenced to an external \"Appendix: Supplementary Information by Command\" not present in this refined source. Model code (ID2) value not documented. Eco mode (DATA01) value map referenced to external appendix. Aspect (DATA01) value map referenced to external appendix."
  - "flow control not stated in source (RTS/CTS pins wired in cable)"
  - "source does not enumerate a discrete variable table."
  - "source contains no explicit safety-interlock command sequences"
  - "ID2 (model code) value for LED Q039I2 not stated in source."
  - "Input terminal DATA01 value map referenced to external \"Appendix: Supplementary Information by Command\" — not in this refined source. Affects 018, 097-198, 098-198, 319-10."
  - "Eco mode DATA01 value map referenced to external appendix. Affects 097-8, 098-8."
  - "Aspect DATA01 value map referenced to external appendix. Affects 030-12."
  - "053 LENS CONTROL DATA01 targets other than 06h (Periphery Focus) not enumerated in this manual."
  - "firmware version compatibility, protocol version number, default baud rate, flow control mode not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:08:43.617Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED Q039I2 Control Spec

## Summary
Sharp/NEC LED Q039I2 projector. Control via RS-232C serial (D-SUB 9P, PC CONTROL port) or wired/wireless LAN (TCP port 7142). Binary hex-byte command protocol with per-message checksum (low-order byte of sum of preceding bytes). Manual reference BDT140013 Revision 7.1 covers power, input switching, picture/volume/lens adjustment, lamp/filter diagnostics, lens memory, PIP/PbP, edge blending, eco mode, and freeze.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input terminal DATA01 value map referenced to an external "Appendix: Supplementary Information by Command" not present in this refined source. Model code (ID2) value not documented. Eco mode (DATA01) value map referenced to external appendix. Aspect (DATA01) value map referenced to external appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default unknown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired in cable)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands (015/016)
  - routable      # inferred: INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
  - queryable     # inferred: extensive status/info requests (009, 037, 078, 097, 305)
  - levelable     # inferred: PICTURE/VOLUME/LAMP ADJUST (030-1/030-2/030-15)
  - mutable       # inferred: picture/sound/onscreen mute on/off (020-025)
```

## Actions
```yaml
# All commands use hex-byte frames. General frame layout (from §2.1):
#   <CMD1> <CMD2> 00h 00h <LEN> [<DATA...>] <CKS>
# Response success: leading byte 2xh (bit6 set). Response error: leading byte Axh.
# Checksum (CKS): low-order one byte of sum of all preceding bytes.
# ID1 = control ID configured on projector. ID2 = model code (model-specific).
# <ID1> <ID2> are inserted in responses between bytes 3 and 4 per source frame examples.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes:
    - "Response DATA01-12: bitfield error info. DATA09 extended status (interlock switch open = Bit1)."

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes:
    - "No other commands accepted during power-on sequence."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes:
    - "No other commands accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal hex byte. Source example uses 06h (video port). Full value map in external 'Supplementary Information by Command' appendix - UNRESOLVED."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes:
    - "Cleared on input/video signal switch."

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
  notes:
    - "Cleared on input/video switch or volume adjust."

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
  notes:
    - "Cleared on input/video signal switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits."
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits."
  notes:
    - "Source example: brightness=10 → 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: "Adjustment value low-order 8 bits."
    - name: data03
      type: string
      description: "Adjustment value high-order 8 bits."
  notes:
    - "Source example: volume=10 → 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value hex byte. Value map in external 'Supplementary Information by Command' appendix - UNRESOLVED."

- id: other_adjust_lamp_light
  label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {data03} {data04} {data05} {cks}"
  params:
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: "Adjustment value low-order 8 bits."
    - name: data05
      type: string
      description: "Adjustment value high-order 8 bits."
  notes:
    - "DATA01=96h, DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST target."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes:
    - "Response DATA01-49 projector name; DATA83-86 lamp usage sec; DATA87-90 filter usage sec. Updated at 1-min intervals."

- id: filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes:
    - "Response DATA01-04 filter usage sec; DATA05-08 filter alarm start sec (-1 if undefined)."

- id: lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content: 01h=usage time sec, 04h=remaining life %."
  notes:
    - "Remaining life may be negative if replacement deadline exceeded. Source example: usage time query → 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes:
    - "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD)."
    - name: data02
      type: string
      description: "Key code high byte (WORD)."
  notes:
    - "Key code table: POWER ON 02h/00h; POWER OFF 03h/00h; AUTO 05h/00h; MENU 06h/00h; UP 07h/00h; DOWN 08h/00h; RIGHT 09h/00h; LEFT 0Ah/00h; ENTER 0Bh/00h; EXIT 0Ch/00h; HELP 0Dh/00h; MAGNIFY UP 0Fh/00h; MAGNIFY DOWN 10h/00h; MUTE 13h/00h; PICTURE 29h/00h; COMPUTER1 4Bh/00h; COMPUTER2 4Ch/00h; VIDEO1 4Fh/00h; S-VIDEO1 51h/00h; VOLUME UP 84h/00h; VOLUME DOWN 85h/00h; FREEZE 8Ah/00h; ASPECT A3h/00h; SOURCE D7h/00h; LAMP MODE/ECO EEh/00h."

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target. Source documents 06h=Periphery Focus. Other targets referenced but not enumerated in this manual - UNRESOLVED."
    - name: data02
      type: string
      description: "Drive content: 00h=Stop; 01h=+1s; 02h=+0.5s; 03h=+0.25s; 7Fh=+continuous; 81h=-continuous; FDh=-0.25s; FEh=-0.5s; FFh=-1s."
  notes:
    - "Send 00h to stop after 7Fh/81h continuous drive. Same command may be reissued during drive without stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target byte (see 053 LENS CONTROL DATA01)."
  notes:
    - "Response DATA02-07: upper/lower/current range values (16-bit, little-endian)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (FFh=Stop). Adjustment mode/value ignored when Stop."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits."
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes:
    - "Controls profile number set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes:
    - "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes:
    - "Response DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust."
  notes:
    - "Response DATA01 status: 00h=Display not possible, 01h=Adjust not possible, 02h=Adjust possible, FFh=No such gain. DATA02-13 range/default/current/wide/narrow widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes:
    - "Response DATA01-03 base model type; DATA04 sound function; DATA05 profile/clock/sleep timer."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes:
    - "Response DATA03 power (00h=Standby,01h=On); DATA04 cooling; DATA05 power-on/off proc; DATA06 operation status (00h Standby-Sleep,04h Power on,05h Cooling,06h Standby-error,0Fh Power saving,10h Network standby)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes:
    - "Response: DATA01 signal switch; DATA02 list number (practical = returned+1); DATA03/DATA04 selection signal type; DATA05 list type; DATA06 test pattern; DATA09 content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes:
    - "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display. Each 00h=Off, 01h=On."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes:
    - "Response DATA01-32 model name (NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes:
    - "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=Freeze ON, 02h=Freeze OFF."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
  notes:
    - "Response DATA02 string length, DATA03-?? label/info string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes:
    - "Response DATA01 eco/light/lamp mode value. Value map in external appendix - UNRESOLVED."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes:
    - "Response DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes:
    - "Response DATA01-06 MAC address bytes."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes:
    - "Response DATA02 setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input value map in external appendix - UNRESOLVED."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes:
    - "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco/light/lamp mode value. Value map in external appendix - UNRESOLVED."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16)."

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Setting value (varies by target). See 097-198 notes for MODE/START POSITION values."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes:
    - "Response DATA01-02 + DATA12-13 base model type; DATA03-11 model name."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes:
    - "Response DATA01-16 serial number (NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes:
    - "Response DATA01 operation status, DATA02 content displayed, DATA03/DATA04 signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal. Value map in external 'Supplementary Information by Command' appendix - UNRESOLVED."
    - name: data02
      type: string
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Response frame conventions:
#   - Success no-data response: leading byte 2xh, <ID1> <ID2>, LEN=00h, <CKS>
#   - Success with-data response: leading byte 2xh, <ID1> <ID2>, LEN, <DATA...>, <CKS>
#   - Error response: leading byte Axh, <ID1> <ID2>, LEN=02h, <ERR1> <ERR2> <CKS>
# ERR1/ERR2 code combinations (§2.4):
#   00h/00h Command not recognized
#   00h/01h Command not supported by model
#   01h/00h Specified value invalid
#   01h/01h Specified input terminal invalid
#   01h/02h Specified language invalid
#   02h/00h Memory allocation error
#   02h/02h Memory in use
#   02h/03h Specified value cannot be set
#   02h/04h Forced onscreen mute on
#   02h/06h Viewer error
#   02h/07h No signal
#   02h/08h Test pattern/filter displayed
#   02h/09h No PC card inserted
#   02h/0Ah Memory operation error
#   02h/0Ch Entry list displayed
#   02h/0Dh Command not accepted (power off)
#   02h/0Eh Command execution failed
#   02h/0Fh No authority for operation
#   03h/00h Specified gain number incorrect
#   03h/01h Specified gain invalid
#   03h/02h Adjustment failed

- id: error_status
  type: bitfield
  description: "DATA01-12 bitfield from 009 ERROR STATUS REQUEST. Bit set = error."
  values:
    - "DATA01: cover, fan, power, lamp-off, lamp-replacement"
    - "DATA02: lamp-usage-exceeded, formatter, lamp2-off, extend-status-ref"
    - "DATA03: FPGA, temp-sensor, lamp-not-present, lamp-data-error, mirror-cover, lamp2-replacement, lamp2-usage-exceeded"
    - "DATA04: lamp2-not-present, lamp2-data-error, dust-temp, foreign-matter, ballast-comm, iris-calibration, lens-not-installed"
    - "DATA09 extended: portrait-cover-up, interlock-switch-open, slave-CPU-system-error, formatter-system-error"
```

## Variables
```yaml
# Settable parameters exposed via single-shot adjust commands are represented
# as Actions (030-1, 030-2, 030-12, 030-15, 053-2). No separate persistent
# variable registry documented in source.
# UNRESOLVED: source does not enumerate a discrete variable table.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited
# (returned only after a command is sent).
```

## Macros
```yaml
# Source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted during power-on sequence."
  - "POWER OFF (016): no other command accepted during power-off incl. cooling time."
  - "DATA09 Bit1 (extended status): interlock switch open - projector reports this state via 009 ERROR STATUS REQUEST."
  - "Lens shutter (051/052) and cover status (078-6) - close-before-transport convention implied; no explicit interlock sequence documented."
# UNRESOLVED: source contains no explicit safety-interlock command sequences
# beyond the power-on/off acceptance lockouts. Voltage/current/power specs not
# in this refined document. Power-on sequencing beyond single-command acceptance
# not stated.
```

## Notes
- Command frame format: `<CMD1> <CMD2> 00h 00h <LEN> [<DATA...>] <CKS>` (request), with `<ID1> <ID2>` inserted after byte 3 in responses. Source §2.1–2.2.
- Checksum = low-order byte of sum of all preceding bytes (inclusive of CMD1).
- Source example checksum: `20h 81h 01h 60h 01h 00h` → sum = 103h → CKS = 03h.
- Default baud rate not stated; source lists 115200/38400/19200/9600/4800 as configurable. Selected `115200` as representative; verify on device.
- Serial cable: cross (null-modem), D-SUB 9P. RTS/CTS and TxD/RxD crossed; pins 1/4/6/9 unused.
- TCP: port 7142 (both directions, same port).
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- Lamp remaining life (%) may be negative if replacement deadline exceeded.
- Two-lamp models: DATA01=01h (Lamp 2) valid only on two-lamp projector models.
- Signal list number returned is practical value −1 (add 1 for true number).

<!-- UNRESOLVED: ID2 (model code) value for LED Q039I2 not stated in source. -->
<!-- UNRESOLVED: Input terminal DATA01 value map referenced to external "Appendix: Supplementary Information by Command" — not in this refined source. Affects 018, 097-198, 098-198, 319-10. -->
<!-- UNRESOLVED: Eco mode DATA01 value map referenced to external appendix. Affects 097-8, 098-8. -->
<!-- UNRESOLVED: Aspect DATA01 value map referenced to external appendix. Affects 030-12. -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 targets other than 06h (Periphery Focus) not enumerated in this manual. -->
<!-- UNRESOLVED: firmware version compatibility, protocol version number, default baud rate, flow control mode not stated in source. -->
```

Spec written. 53 commands, all hex-byte payloads verbatim from source. Serial + TCP (port 7142). No fabrication — UNRESOLVED markers cover external-appendix value maps (input terminal, eco mode, aspect, lens targets) referenced but absent from refined source.

Want me ingest via admin path (`drafts.jsonl` + `scraper.ts ingest`) now?

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:41:33.560Z
last_checked_at: 2026-06-18T08:08:43.617Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:08:43.617Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input terminal DATA01 value map referenced to an external \"Appendix: Supplementary Information by Command\" not present in this refined source. Model code (ID2) value not documented. Eco mode (DATA01) value map referenced to external appendix. Aspect (DATA01) value map referenced to external appendix."
- "flow control not stated in source (RTS/CTS pins wired in cable)"
- "source does not enumerate a discrete variable table."
- "source contains no explicit safety-interlock command sequences"
- "ID2 (model code) value for LED Q039I2 not stated in source."
- "Input terminal DATA01 value map referenced to external \"Appendix: Supplementary Information by Command\" — not in this refined source. Affects 018, 097-198, 098-198, 319-10."
- "Eco mode DATA01 value map referenced to external appendix. Affects 097-8, 098-8."
- "Aspect DATA01 value map referenced to external appendix. Affects 030-12."
- "053 LENS CONTROL DATA01 targets other than 06h (Periphery Focus) not enumerated in this manual."
- "firmware version compatibility, protocol version number, default baud rate, flow control mode not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
