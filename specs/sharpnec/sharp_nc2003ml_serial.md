---
spec_id: admin/sharp-nec-nc2003ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2003ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC2003ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2003ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:51:51.153Z
last_checked_at: 2026-06-18T08:33:24.785Z
generated_at: 2026-06-18T08:33:24.785Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "ID1 (control ID) and ID2 (model code) parameter values are projector-configured and not fixed in source"
  - "Appendix \"Supplementary Information by Command\" values (input terminal codes, eco mode values, aspect values, base model types, sub input values) not present in refined source"
  - "source contains no explicit multi-step sequences to enumerate as macros."
  - "Appendix \"Supplementary Information by Command\" not included in refined source — input terminal codes, eco mode values, aspect values, base model type codes, and sub input values are referenced but undefined here."
  - "ID1 control ID default and ID2 model code for NC2003ML not stated."
  - "firmware version compatibility range not stated."
  - "TCP keepalive / connection timeout behavior not stated."
  - "power on/off cooldown durations (numeric) not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:33:24.785Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC2003ML Control Spec

## Summary
The Sharp/NEC NC2003ML is a projector controllable via RS-232C serial or TCP/IP LAN. This spec covers the binary command protocol documented in BDT140013 Revision 7.1, including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, and system settings.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) parameter values are projector-configured and not fixed in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values (input terminal codes, eco mode values, aspect values, base model types, sub input values) not present in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as supported rates; 115200 shown as highest
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source states "Communication mode: Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF commands present)
# - queryable       (numerous status/information request commands)
# - routable        (INPUT SW CHANGE, AUDIO SELECT SET present)
# - levelable       (PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL present)
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal code (e.g. 06h for video port) - see Appendix Supplementary Information by Command"

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: DATA02
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value - see Appendix Supplementary Information by Command"

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST; DATA02=FFh)"
    - name: DATA02
      type: string
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lamp selector (00h=Lamp 1, 01h=Lamp 2 - two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content (01h=usage time seconds, 04h=remaining life %)"

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte - see Key code list (e.g. 05h=AUTO, 07h=UP, 8Ah=FREEZE)"
    - name: DATA02
      type: string
      description: "Key code high byte (typically 00h)"

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target (06h=Periphery Focus)"
    - name: DATA02
      type: string
      description: "Content (00h=Stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s)"

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target (06h=Periphery Focus)"

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: string
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value (00h=OFF, 01h=ON)"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value - see Appendix Supplementary Information by Command"

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: cmd_098_198_pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (varies by DATA01; sub input values per Appendix)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Setting value (00h=OFF, 01h=ON)"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal - see Appendix Supplementary Information by Command"
    - name: DATA02
      type: string
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
# Common response envelopes. Successful response prefix = command-class byte | 20h;
# responses carry <ID1> <ID2>, optional data, and <CKS>. Errors carry <ERR1> <ERR2>.
# Per-command response shapes documented in source section 3.x.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2_running_status_request DATA03 / cmd_305_3_basic_information_request DATA01
- id: error_status
  type: bitmask
  values:
    - cover_error
    - temperature_error_bimetallic
    - fan_error
    - power_error
    - lamp_off
    - lamp_replacement_due
    - formatter_error
    - lamp_2_off
    - fpga_error
    - temperature_error_sensor
    - lamp_not_present
    - lamp_2_not_present
    - lamp_2_data_error
    - temperature_error_dust
    - foreign_matter_sensor_error
    - ballast_comm_error
    - iris_calibration_error
    - lens_not_installed
    - interlock_switch_open
    - system_error_slave_cpu
    - system_error_formatter
  source: cmd_009_error_status_request DATA01-DATA12
- id: mute_state
  type: object
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: cmd_078_4_mute_status_request
- id: input_signal_status
  type: object
  source: cmd_078_3_input_status_request
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cmd_078_6_cover_status_request
- id: execution_result
  type: enum
  values: [success, error]
  source: response DATA01+DATA02 = 0000h vs other
- id: response_error
  type: object
  values: [unrecognized_command, unsupported_model, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_not_settable, forced_onscreen_mute, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, wrong_gain_number, invalid_gain, adjustment_failed]
  source: ERR1/ERR2 code list (section 2.4)
```

## Variables
```yaml
# Settable parameters exposed via dedicated SET commands (mirrored in Actions):
- name: picture_brightness
  set_via: cmd_030_1_picture_adjust (DATA01=00h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=00h)
- name: picture_contrast
  set_via: cmd_030_1_picture_adjust (DATA01=01h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=01h)
- name: picture_color
  set_via: cmd_030_1_picture_adjust (DATA01=02h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=02h)
- name: picture_hue
  set_via: cmd_030_1_picture_adjust (DATA01=03h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=03h)
- name: picture_sharpness
  set_via: cmd_030_1_picture_adjust (DATA01=04h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=04h)
- name: volume
  set_via: cmd_030_2_volume_adjust
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=05h)
- name: lamp_light_adjust
  set_via: cmd_030_15_other_adjust
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=96h)
- name: aspect
  set_via: cmd_030_12_aspect_adjust
- name: eco_mode
  set_via: cmd_098_8_eco_mode_set
  query_via: cmd_097_8_eco_mode_request
- name: lan_projector_name
  set_via: cmd_098_45_lan_projector_name_set
  query_via: cmd_097_45_lan_projector_name_request
- name: pip_pbp_mode
  set_via: cmd_098_198_pip_pbp_set (DATA01=00h)
  query_via: cmd_097_198_pip_pbp_request (DATA01=00h)
- name: pip_pbp_start_position
  set_via: cmd_098_198_pip_pbp_set (DATA01=01h)
  query_via: cmd_097_198_pip_pbp_request (DATA01=01h)
- name: pip_pbp_sub_input_1
  set_via: cmd_098_198_pip_pbp_set (DATA01=02h)
  query_via: cmd_097_198_pip_pbp_request (DATA01=02h)
- name: pip_pbp_sub_input_2
  set_via: cmd_098_198_pip_pbp_set (DATA01=09h)
  query_via: cmd_097_198_pip_pbp_request (DATA01=09h)
- name: pip_pbp_sub_input_3
  set_via: cmd_098_198_pip_pbp_set (DATA01=0Ah)
  query_via: cmd_097_198_pip_pbp_request (DATA01=0Ah)
- name: edge_blending_mode
  set_via: cmd_098_243_1_edge_blending_mode_set
  query_via: cmd_097_243_1_edge_blending_mode_request
- name: lens_memory_load_by_signal
  set_via: cmd_053_6_lens_memory_option_set (DATA01=00h)
  query_via: cmd_053_5_lens_memory_option_request (DATA01=00h)
- name: lens_memory_forced_mute
  set_via: cmd_053_6_lens_memory_option_set (DATA01=01h)
  query_via: cmd_053_5_lens_memory_option_request (DATA01=01h)
- name: lens_profile
  set_via: cmd_053_10_lens_profile_set
  query_via: cmd_053_11_lens_profile_request
```

## Events
```yaml
# Source documents no unsolicited notifications. Responses are strictly request/reply.
```

## Macros
```yaml
# UNRESOLVED: source contains no explicit multi-step sequences to enumerate as macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "While this command is turning on the power, no other command can be accepted."
  - command: cmd_016_power_off
    note: "While this command is turning off the power (including the cooling time), no other command can be accepted."
# Source states lens shutter close/open and cover/interlock error reporting but
# does not document a power-on interlock sequence or forced confirmation.
```

## Notes
- Binary protocol. Every command/response frame is a sequence of hex bytes. Frame layout: `[class] [cmd] <ID1> <ID2> [LEN] [DATA...] <CKS>`.
- ID1 = control ID configured on projector. ID2 = model code (model-dependent). Commands in source are shown with literal `00h 00h` in the ID1/ID2 positions; responses echo the projector's actual ID1/ID2.
- Checksum (CKS) = low-order byte of the sum of all preceding bytes (see source section 2.2).
- While lens is being driven (cmd_053_lens_control with 7Fh/81h), issuing the same command continues motion without an explicit stop; sending DATA02=00h stops driving.
- Picture/Sound/Onscreen mute auto-clears on input terminal switch, video signal switch, or (sound mute only) volume adjustment.
- Usage-time counters update at one-minute intervals even though the unit reports one-second resolution.
- If lamp replacement deadline is exceeded, lamp remaining life (%) returns negative.
- If no time is defined for filter alarm start time, `-1` is returned.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in refined source — input terminal codes, eco mode values, aspect values, base model type codes, and sub input values are referenced but undefined here. -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code for NC2003ML not stated. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: TCP keepalive / connection timeout behavior not stated. -->
<!-- UNRESOLVED: power on/off cooldown durations (numeric) not stated. -->
````

53 actions, all payloads verbatim. Auth inferred none. Port 7142 + RS-232C both documented. Appendix values + ID1/ID2 + firmware marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:51:51.153Z
last_checked_at: 2026-06-18T08:33:24.785Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:33:24.785Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "ID1 (control ID) and ID2 (model code) parameter values are projector-configured and not fixed in source"
- "Appendix \"Supplementary Information by Command\" values (input terminal codes, eco mode values, aspect values, base model types, sub input values) not present in refined source"
- "source contains no explicit multi-step sequences to enumerate as macros."
- "Appendix \"Supplementary Information by Command\" not included in refined source — input terminal codes, eco mode values, aspect values, base model type codes, and sub input values are referenced but undefined here."
- "ID1 control ID default and ID2 model code for NC2003ML not stated."
- "firmware version compatibility range not stated."
- "TCP keepalive / connection timeout behavior not stated."
- "power on/off cooldown durations (numeric) not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
