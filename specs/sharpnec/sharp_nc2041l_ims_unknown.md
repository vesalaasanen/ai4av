---
spec_id: admin/sharp-nec-nc2041l-ims
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2041L IMS Control Spec"
manufacturer: Sharp/NEC
model_family: NC2041L
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2041L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:26:36.621Z
last_checked_at: 2026-09-20T22:18:25.863Z
generated_at: 2026-09-20T22:18:25.863Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic multi-model command reference; model-specific support (input terminal values, aspect values, eco mode values, base model types, key code availability) is deferred to an Appendix (\"Supplementary Information by Command\") not included in the source text"
  - "ID2 model code values not stated in source"
  - "standby command reception capability for this model not stated in source"
  - "RTS/CTS pins wired per pinout but flow control setting not stated in source"
  - "eco mode values deferred to Appendix, not in source"
  - "numeric adjustment ranges for"
  - "input terminal value table, aspect value table, eco mode value table, base model type table, sub-input value table not in source (deferred to Appendix)"
  - "default/serial baud rate selection mechanism not stated"
  - "053-1 lens axis selector values not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-09-20T22:18:25.863Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source sections 3.1–3.53 verbatim with correct hex shapes; transport values (port 7142, baud list, 8N1) appear in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC NC2041L Control Spec

## Summary
Binary hex control protocol for Sharp/NEC projectors (source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1), applicable to the NC2041L. Supports RS-232C serial (PC CONTROL port) and wired/wireless LAN (TCP port 7142). Covers power, input switching, mutes, picture/volume adjust, lens control/memory, status and information queries.

<!-- UNRESOLVED: source is a generic multi-model command reference; model-specific support (input terminal values, aspect values, eco mode values, base model types, key code availability) is deferred to an Appendix ("Supplementary Information by Command") not included in the source text -->
<!-- UNRESOLVED: ID2 model code values not stated in source -->
<!-- UNRESOLVED: standby command reception capability for this model not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200/38400/19200/9600/4800  # supported set as stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired per pinout but flow control setting not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands (015/016)
  - routable     # inferred from INPUT SW CHANGE command (018)
  - queryable    # inferred from extensive request commands (009, 037 series, 078 series, etc.)
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST commands (030-1, 030-2)
```

## Actions
```yaml
# Frame format: <cmd bytes> <ID1> <ID2> <LEN> <DATA..> <CKS> (responses); commands carry fixed payload.
# CKS = low-order byte of sum of all preceding bytes.
- id: error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
- id: power_on
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
- id: power_off
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
- id: input_sw_change
  label: "018. Input Switch Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command'; example: 06h = video port)"
- id: picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
- id: picture_mute_off
  label: "021. Picture Mute Off"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []
- id: sound_mute_on
  label: "022. Sound Mute On"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
- id: sound_mute_off
  label: "023. Sound Mute Off"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []
- id: onscreen_mute_on
  label: "024. Onscreen Mute On"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
- id: onscreen_mute_off
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []
- id: picture_adjust
  label: "030-1. Picture Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
- id: volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
- id: aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value (see Appendix 'Supplementary Information by Command'; values not in source)"
- id: other_adjust
  label: "030-15. Other Adjust (Lamp/Light Adjust)"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: data05
      type: integer
      description: "Per source layout DATA01-DATA05 follow LEN; DATA02=FFh fixed per table"
- id: information_request
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
- id: filter_usage_information_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
- id: lamp_information_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Information type: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
- id: carbon_savings_information_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
- id: remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type); see key code list in Notes"
    - name: data02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
- id: shutter_close
  label: "051. Shutter Close"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
- id: shutter_open
  label: "052. Shutter Open"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
- id: lens_control
  label: "053. Lens Control"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "06h = Periphery Focus"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive plus, 81h=drive minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
- id: lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lens adjustment axis selector (value not enumerated in source)"
- id: lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "FFh=Stop (mode/value not referenced)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
- id: lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET; controls profile set via 053-10"
- id: lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
- id: lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF, 01h=ON"
- id: lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
- id: lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
- id: lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
- id: gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
- id: setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
- id: running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
- id: input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
- id: mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
- id: model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
- id: cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
- id: freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
- id: information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"
- id: eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
- id: lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
- id: pip_pbp_request
  label: "097-198. PIP/Picture-by-Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
- id: edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
- id: eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Eco mode value (see Appendix; values not in source). Sets Light mode or Lamp mode depending on projector."
- id: lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16), NUL-terminated"
- id: pip_pbp_set
  label: "098-198. PIP/Picture-by-Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=top-left, 01h=top-right, 02h=bottom-left, 03h=bottom-right; sub input values per Appendix"
- id: edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"
- id: base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
- id: serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
- id: basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
- id: audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal (values per Appendix; not in source)"
    - name: data02
      type: integer
      description: "00h=audio from terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  values: [cover_error, fan_error, temperature_error_bimetallic, temperature_error_sensor, power_error, lamp_off, lamp_replacement_moratorium, lamp_usage_time_exceeded, formatter_error, fpga_error, lamp_data_error, mirror_cover_error, lamp2_off, lamp2_moratorium, lamp2_usage_time_exceeded, lamp2_not_present, ballast_communication_error, temperature_error_dust, foreign_matter_sensor_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter, portrait_cover_side_up]
  source: "009 response DATA01-DATA12; bit=1 means error"
- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA03/DATA06, 305-3 DATA01"
- id: input_status
  type: object
  values: [signal_switch_process, signal_list_number, selection_signal_type_1, selection_signal_type_2, signal_list_type, test_pattern_display, content_displayed]
  source: "078-3 DATA01-DATA16"
- id: mute_status
  type: object
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: "078-4 DATA01-DATA05; each 00h=off/01h=on"
- id: lamp_usage_time
  type: integer
  values: "seconds; updated at 1-minute intervals"
  source: "037 DATA83-86, 037-4 (DATA02=01h)"
- id: lamp_remaining_life
  type: integer
  values: "percent; negative if replacement deadline exceeded"
  source: "037-4 (DATA02=04h)"
- id: filter_usage_time
  type: integer
  values: "seconds; -1 if undefined"
  source: "037-3 DATA01-04"
- id: carbon_savings
  type: object
  values: [total_kg, operation_kg]
  source: "037-6 DATA02-09"
- id: lens_status
  type: bitmap
  values: [lens_memory_operation, zoom_operation, focus_operation, lens_shift_h_operation, lens_shift_v_operation]
  source: "053-7 DATA01; bit=1 means during operation"
- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: eco mode values deferred to Appendix, not in source
  source: "097-8 response DATA01"
- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  source: "097-198 (DATA01=00h) DATA02"
- id: projector_name
  type: string
  source: "097-45 response DATA01-17"
- id: model_name
  type: string
  source: "078-5 response DATA01-32"
- id: serial_number
  type: string
  source: "305-2 response DATA01-16"
- id: mac_address
  type: string
  source: "097-155 response DATA01-06"
- id: gain_parameter
  type: object
  values: [status, upper_limit, lower_limit, default_value, current_value, wide_adjustment_width, narrow_adjustment_width]
  source: "060-1 response DATA01-16"
- id: error_response
  type: object
  values: "ERR1/ERR2 code pairs per error code list (see Notes)"
  source: "Axh error responses"
```

## Variables
```yaml
# Settable parameters (volume, picture levels, eco mode, edge blending, PIP/PbP, lens memory
# options, projector name) are represented as parameterized Actions per source command structure.
# No additional variables beyond those actions. <!-- UNRESOLVED: numeric adjustment ranges for
# picture/volume/lamp adjust not stated in source (query 060-1 returns ranges from device) -->
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are solicited command replies.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source states no explicit interlock procedures. Error status bitmap (009) reports
# "interlock switch is open" (DATA09 bit1) as an observable error condition only.
```

## Notes
- Checksum: CKS = low-order one byte of the sum of all preceding bytes. Example: 20h+81h+01h+60h+01h+00h=103h → CKS=03h.
- Command frame: fixed 6-byte prefix for most commands; responses echo ID1 (control ID set on projector), ID2 (model code, varies by model), LEN, data, CKS. Error responses: A<x>h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.
- POWER ON (015) and POWER OFF (016) accept no other command while power transition (including cooling) is in progress.
- Picture/onscreen mute auto-cancel on input terminal switch or video signal switch; sound mute also cancels on volume adjustment.
- Some models cannot receive LAN commands in standby mode ("Standby Mode setting for receiving commands" — model-specific, not detailed in source).
- Signal list number returned by 078-3 is actual value minus 1; add 1 for practical number.
- Lamp/filter usage times obtainable in 1-second units but updated at 1-minute intervals.
- Remote key codes (050), WORD type: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO.
- Error codes (ERR1/ERR2): 00h/00h unrecognized command; 00h/01h not supported by model; 01h/00h invalid value; 01h/01h invalid input terminal; 01h/02h invalid language; 02h/00h memory allocation; 02h/02h memory in use; 02h/03h value cannot be set; 02h/04h forced onscreen mute on; 02h/06h viewer error; 02h/07h no signal; 02h/08h test pattern/filter displayed; 02h/09h no PC card; 02h/0Ah memory operation error; 02h/0Ch entry list displayed; 02h/0Dh power off; 02h/0Eh execution failed; 02h/0Fh no authority; 03h/00h wrong gain number; 03h/01h invalid gain; 03h/02h adjustment failed.
- Serial cable: cross cable, D-SUB 9P PC CONTROL port; pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS.
- Document is generic Sharp/NEC projector command reference (BDT140013 Rev 7.1 + Appendix BDT140014); Appendix tables with per-model values (input terminals, aspect, eco mode, base model types) were not present in source text.
<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type table, sub-input value table not in source (deferred to Appendix) -->
<!-- UNRESOLVED: default/serial baud rate selection mechanism not stated -->
<!-- UNRESOLVED: 053-1 lens axis selector values not enumerated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:26:36.621Z
last_checked_at: 2026-09-20T22:18:25.863Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:18:25.863Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source sections 3.1–3.53 verbatim with correct hex shapes; transport values (port 7142, baud list, 8N1) appear in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic multi-model command reference; model-specific support (input terminal values, aspect values, eco mode values, base model types, key code availability) is deferred to an Appendix (\"Supplementary Information by Command\") not included in the source text"
- "ID2 model code values not stated in source"
- "standby command reception capability for this model not stated in source"
- "RTS/CTS pins wired per pinout but flow control setting not stated in source"
- "eco mode values deferred to Appendix, not in source"
- "numeric adjustment ranges for"
- "input terminal value table, aspect value table, eco mode value table, base model type table, sub-input value table not in source (deferred to Appendix)"
- "default/serial baud rate selection mechanism not stated"
- "053-1 lens axis selector values not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
