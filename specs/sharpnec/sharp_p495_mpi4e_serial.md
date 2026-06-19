---
spec_id: admin/sharp-nec-p495-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P495 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "P495 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P495 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:03:10.635Z
last_checked_at: 2026-06-18T08:59:06.358Z
generated_at: 2026-06-18T08:59:06.358Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control ID and model code (ID1/ID2) byte values not stated in this source"
  - "input terminal value table (DATA01 of 018/319) referenced to an Appendix not present in this refined source"
  - "eco mode value enumeration, base model type values, aspect values, sub-input values all reference an Appendix not present in this refined source"
  - "full input-terminal value table not in this source; references Appendix 'Supplementary Information by Command'.\""
  - "value table references Appendix 'Supplementary Information by Command'.\""
  - "value table references Appendix.\""
  - "min not stated; returned in GAIN PARAMETER REQUEST 3 range"
  - "no unsolicited notification frames documented in source."
  - "no explicit multi-step command sequences documented in source."
  - "full safety section lives in the parent operation"
  - "default baud rate not stated (only selectable list given)"
  - "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source"
  - "ID1 control ID default and ID2 model code for P495 Mpi4E not stated"
  - "firmware version compatibility not stated"
  - "protocol/manual revision (BDT140013 Rev 7.1) noted but no device firmware range stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:06.358Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P495 Mpi4E Control Spec

## Summary
Sharp/NEC P495 Mpi4E large-format projector controlled via binary protocol over RS-232C (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP port 7142). Spec covers 51 documented commands: power, input switching, mutes, picture/volume/aspect/gain adjustment, lens & lens-memory control, shutter, freeze, eco mode, PIP/PbP, edge blending, plus status/error/info queries.

<!-- UNRESOLVED: control ID and model code (ID1/ID2) byte values not stated in this source -->
<!-- UNRESOLVED: input terminal value table (DATA01 of 018/319) referenced to an Appendix not present in this refined source -->
<!-- UNRESOLVED: eco mode value enumeration, base model type values, aspect values, sub-input values all reference an Appendix not present in this refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode: Full duplex"
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on serial baud: source states five selectable rates (115200/38400/19200/9600/4800 bps); default is UNRESOLVED. Implementer must confirm device-configured rate before connecting.

## Traits
```yaml
# - powerable     # inferred from POWER ON / POWER OFF commands
# - routable      # inferred from INPUT SW CHANGE command
# - queryable     # inferred from many status/info request commands
# - levelable     # inferred from PICTURE/VOLUME/ASPECT/GAIN adjust commands
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). UNRESOLVED: full input-terminal value table not in this source; references Appendix 'Supplementary Information by Command'."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video signal switch."

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
  notes: "Cleared on input/video switch or volume adjustment."

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
  notes: "Cleared on input/video switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. UNRESOLVED: value table references Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns 98 data bytes incl. projector name (DATA01-49), lamp usage time (DATA83-86, sec), filter usage time (DATA87-90, sec). Updated 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, sec) and filter alarm start time (DATA05-08, sec). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h lamp usage time (sec), 04h lamp remaining life (%)"
  notes: "Eco mode reflected in returned values. Negative remaining life if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type key code). See key code table: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: 06h Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh + continuous, 81h − continuous, FDh −0.25s, FEh −0.5s, FFh −1s"
  notes: "Send 00h to stop after 7Fh/81h continuous drive."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target"
  notes: "Returns adjustment range upper/lower limits and current value (DATA02-07)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh = Stop (mode/value not referenced)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET"
  notes: "Controls profile number set via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield (DATA01): Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
  notes: "Returns 16 data bytes incl. status, range limits, default, current, wide/narrow adjustment widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, signal types, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), OSD display (DATA05)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns 32-byte model name (NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns status: 00h normal (cover opened), 01h cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze ON, 02h freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on model. UNRESOLVED: value table references Appendix."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns 17-byte projector name (NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Sub input setting values reference Appendix 'Supplementary Information by Command'."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns setting value: 00h OFF, 01h ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. UNRESOLVED: value table references Appendix 'Supplementary Information by Command'."
  notes: "Sets Light mode or Lamp mode depending on model."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16), NUL-terminated"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; sub-input values per Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11). Value table references Appendix."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16-byte serial number (NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status (DATA01-09)."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. UNRESOLVED: value table references Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Audio source: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: command_ack
  type: ack
  values: [success, error]
  notes: "Ack frames share the request's 2nd byte with leading nibble swapped 2→2/A. Example: POWER ON success = 22h 00h <ID1> <ID2> 00h <CKS>; failure = A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."

- id: error_status
  type: bitfield
  values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_replacement_due, lamp2_usage_exceeded, lamp2_not_present, ballast_comm_error, foreign_matter_sensor_error, iris_calibration_error, lens_not_installed, portrait_cover_up, interlock_switch_open, system_error_slave, system_error_formatter]
  notes: "DATA01-12 of 009 response. Per-bit meaning documented in source error information list."

- id: power_state
  type: enum
  values: [standby, power_on]
  notes: "DATA03 of 078-2 response: 00h Standby, 01h Power On, FFh Not supported."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  notes: "DATA06 of 078-2: 00h/04h/05h/06h/0Fh/10h."

- id: mute_states
  type: bitfield
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, osd_displayed]
  notes: "DATA01-05 of 078-4 response, each 00h Off / 01h On."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  notes: "DATA01 of 078-6: 00h normal (cover opened), 01h cover closed."

- id: lens_operation_status
  type: bitfield
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  notes: "DATA01 of 053-7: 0=Stop, 1=During operation, per bit."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  notes: "DATA01 of 053-11: 00h Profile 1, 01h Profile 2."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  notes: "DATA01 of 097-243-1."
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  min: null  # UNRESOLVED: min not stated; returned in GAIN PARAMETER REQUEST 3 range
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-1 DATA01=00h. Range returned by 060-1 DATA01=00h."

- id: picture_contrast
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-1 DATA01=01h. Range returned by 060-1 DATA01=01h."

- id: picture_color
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-1 DATA01=02h. Range returned by 060-1 DATA01=02h."

- id: picture_hue
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-1 DATA01=03h. Range returned by 060-1 DATA01=03h."

- id: picture_sharpness
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-1 DATA01=04h. Range returned by 060-1 DATA01=04h."

- id: volume
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-2. Range returned by 060-1 DATA01=05h."

- id: lamp_light_adjust
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Adjusted via 030-15 DATA01=96h/DATA02=FFh. Range returned by 060-1 DATA01=96h."

- id: projector_name
  type: string
  max_length: 16
  notes: "Set via 098-45, queried via 097-45 (up to 16 bytes, NUL-terminated)."

- id: eco_mode
  type: integer
  min: null  # UNRESOLVED
  max: null  # UNRESOLVED
  notes: "Set via 098-8, queried via 097-8. Value table references Appendix."

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  notes: "Option 00h of 053-6 / queried via 053-5."

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  notes: "Option 01h of 053-6 / queried via 053-5."

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]
  notes: "098-198 DATA01=00h: 00h PIP, 01h PbP."

- id: pip_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  notes: "098-198 DATA01=01h."

- id: edge_blending_enabled
  type: enum
  values: [off, on]
  notes: "098-243-1."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification frames documented in source.
# All responses are solicited (command ack / query reply / error reply).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents commands that block further input during transitions:
#   - 015 POWER ON: "no other command can be accepted" while turning on
#   - 016 POWER OFF: "no other command can be accepted" during power-off incl. cooling time
# Source also references an interlock switch in the 009 error bitfield
# (DATA09 Bit1 "The interlock switch is open"), but no interlock procedure,
# power-on sequencing requirement, or voltage/power warning is stated in this
# refined source. UNRESOLVED: full safety section lives in the parent operation
# manual, not this command reference.
```

## Notes
- **Command frame format:** `20h/02h/03h/01h/00h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>` — leading byte encodes message class (00h query, 01h/02h/03h action). Ack frames swap high nibble of the 2nd byte from `2` to `2` (success: 22h/23h/21h/20h) or `8`-ish (error: A2h/A3h/A1h/A0h).
- **Checksum:** sum of all preceding bytes, low-order 8 bits. Documented in source §2.2 with worked example.
- **ID1 (Control ID)** and **ID2 (Model code)** are runtime values — Control ID set on projector, Model code varies by model. Not fixed in spec.
- **Baud rate:** five selectable rates; default not stated in this source. Connector: D-SUB 9P cross cable.
- **LAN:** wired 10/100 Mbps auto-negotiable (IEEE 802.3 / 802.3u); wireless via optional wireless LAN unit (see operation manual).
- **Error codes (ERR1/ERR2)** fully enumerated in source §2.4 (00h–03h × 00h–0Fh); reused across all action/query error replies.
- **Appendix references:** input terminal values, aspect values, eco mode values, base model type values, selection signal type, and sub-input setting values all live in an Appendix ("Supplementary Information by Command") not present in this refined source. Marked UNRESOLVED where relevant.

<!-- UNRESOLVED: default baud rate not stated (only selectable list given) -->
<!-- UNRESOLVED: Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code for P495 Mpi4E not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol/manual revision (BDT140013 Rev 7.1) noted but no device firmware range stated -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:03:10.635Z
last_checked_at: 2026-06-18T08:59:06.358Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:06.358Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control ID and model code (ID1/ID2) byte values not stated in this source"
- "input terminal value table (DATA01 of 018/319) referenced to an Appendix not present in this refined source"
- "eco mode value enumeration, base model type values, aspect values, sub-input values all reference an Appendix not present in this refined source"
- "full input-terminal value table not in this source; references Appendix 'Supplementary Information by Command'.\""
- "value table references Appendix 'Supplementary Information by Command'.\""
- "value table references Appendix.\""
- "min not stated; returned in GAIN PARAMETER REQUEST 3 range"
- "no unsolicited notification frames documented in source."
- "no explicit multi-step command sequences documented in source."
- "full safety section lives in the parent operation"
- "default baud rate not stated (only selectable list given)"
- "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source"
- "ID1 control ID default and ID2 model code for P495 Mpi4E not stated"
- "firmware version compatibility not stated"
- "protocol/manual revision (BDT140013 Rev 7.1) noted but no device firmware range stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
