---
spec_id: admin/sharp-nec-led-e012i-217in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E012I 217In Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC LED E012I 217In"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC LED E012I 217In"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:44:56.792Z
last_checked_at: 2026-06-17T20:10:06.882Z
generated_at: 2026-06-17T20:10:06.882Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID2 model code byte for this specific projector not stated in source (generic multi-model manual)."
  - "control ID (ID1) default value not stated."
  - "flow_control mode not explicitly stated (RTS/CTS pins present in pin assignment but flow control use not documented)."
  - "firmware version compatibility range not stated."
  - "RTS/CTS pins present in pin assignment but flow control mode not stated"
  - "source does not describe asynchronous push events; projector only responds to commands."
  - "source does not describe power-on sequencing requirements beyond the interlock notes above."
  - "source mentions interlock switch (DATA09 bit1 of error status) but does not document an interlock command sequence."
  - "ID1 control ID default and ID2 model code for LED E012I 217In not stated."
  - "enum value tables referenced to \"Appendix Supplementary Information by Command\" not present in refined source (input terminal, aspect, eco mode, sub input, base model type)."
  - "serial flow_control mode (RTS/CTS pinout present but usage not documented)."
  - "LED E012I 217In is single-lamp LED — lamp 2 / LAMP INFORMATION REQUEST 3 DATA01=01h applicability not confirmed for this model."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:10:06.882Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source hex command tokens and parameters; transport settings confirmed in source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E012I 217In Control Spec

## Summary
Sharp/NEC projector (LED E012I 217In) controlled via an RS-232C serial port (PC CONTROL, D-SUB 9P) or a wired/wireless LAN (TCP port 7142). This spec covers the binary hex command catalogue documented in the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1), including power, input switching, mutes, picture/volume/aspect/lamp adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and status/error/lamp/filter/info requests.

<!-- UNRESOLVED: ID2 model code byte for this specific projector not stated in source (generic multi-model manual). -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: flow_control mode not explicitly stated (RTS/CTS pins present in pin assignment but flow control use not documented). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: "115200/38400/19200/9600/4800 bps"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in pin assignment but flow control mode not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF present
  - levelable     # inferred: picture/volume/lamp adjust present
  - queryable     # inferred: many status / info request commands present
  - shutterable   # inferred: 051 SHUTTER CLOSE / 052 SHUTTER OPEN present
```

## Actions
```yaml
# All 55 documented commands enumerated. Hex payloads are verbatim from the source.
# Each command frame is: <op1> <op2> 00h 00h <LEN> <DATA...> <CKS>.
# CKS (checksum) = low-order one byte of sum of all preceding bytes (see source §2.2).
# ID1 = control ID set on projector; ID2 = model code. Both UNRESOLVED for this device.

# ---- Error / status queries (kind: query) ----
- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA1-12 are error bitfields (0=normal, 1=error). See source error list."

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response 23h 8Ah ... 62h. DATA01-49 projector name; DATA83-86 lamp usage time (s); DATA87-90 filter usage time (s)."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "DATA01-04 filter usage time (s); DATA05-08 filter alarm start time (s); -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: enum
      values: ["00h=Lamp1", "01h=Lamp2"]
    - name: content
      type: enum
      values: ["01h=usage_time_seconds", "04h=remaining_life_percent"]
  notes: "Lamp 2 only effective on two-lamp models. Negative remaining life if replacement deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: enum
      values: ["00h=total", "01h=during_operation"]
  notes: "DATA02-05 kg (max 99999); DATA06-09 mg (max 999999)."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: enum
      description: "Lens adjustment target (e.g. zoom/focus/shift). Source table truncated; see source §3.23."
  notes: "Response DATA02-07: upper/lower limits + current value (16-bit)."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: enum
      values: ["00h=LOAD_BY_SIGNAL", "01h=FORCED_MUTE"]
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=operating)."

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile1, 01h=Profile2."

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: enum
      values: ["00h=PICTURE/BRIGHTNESS", "01h=PICTURE/CONTRAST", "02h=PICTURE/COLOR", "03h=PICTURE/HUE", "04h=PICTURE/SHARPNESS", "05h=VOLUME", "96h=LAMP_ADJUST/LIGHT_ADJUST"]
  notes: "Response DATA01 status (00 display-not-possible, 01 adjust-not-possible, 02 possible, FF no such gain); DATA02-13 limits/default/current/wide/narrow."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "DATA01-03 base model type; DATA04 sound function (00 not avail, 01 avail); DATA05 profile/timer function."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power status; DATA04 cooling; DATA05 power on/off process; DATA06 operation status (00 standby-sleep, 04 power on, 05 cooling, 06 standby-error, 0F standby-power-saving, 10 network-standby)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "DATA01 signal switch process; DATA02 signal list number (practical = returned+1); DATA03 selection signal type 1; DATA04 selection signal type 2 (01 COMPUTER, 02 VIDEO, 03 S-VIDEO, 04 COMPONENT, 20 DVI-D, 21 HDMI, 22 DisplayPort); DATA09 content displayed."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00 off, 01 on)."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h normal (cover open), 01h cover closed."

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
  params:
    - name: info_type
      type: enum
      values: ["03h=horizontal_sync_frequency", "04h=vertical_sync_frequency"]
  notes: "Response DATA02 string length, DATA03+ label/info string (NUL-terminated)."

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01: eco/light/lamp mode value. Per-model mapping; see Appendix Supplementary Information by Command."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address (6 bytes)."

- id: cmd_097_198_pip_pbp_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: enum
      values: ["00h=MODE", "01h=START_POSITION", "02h=SUB_INPUT/SUB_INPUT_1", "09h=SUB_INPUT_2", "0Ah=SUB_INPUT_3"]
  notes: "Response DATA02 depends on target: MODE 00h PIP / 01h PbP; START_POSITION 00 TL/01 TR/02 BL/03 BR; sub input values per Appendix."

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "DATA01-02 base model type; DATA03-11 model name (NUL-terminated); DATA12-13 base model type."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "DATA01 operation status; DATA02 content displayed; DATA03/04 signal types; DATA05 display signal type; DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status (00 off, 01 on)."

# ---- Power / mute / shutter / freeze ----
- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on sequence."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

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
  notes: "Cleared by input/video switch or volume adjust."

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
  notes: "Cleared by input/video switch."

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

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

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: enum
      values: ["01h=ON", "02h=OFF"]

# ---- Input / audio select ----
- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: enum
      description: "DATA01 input terminal value (e.g. 06h=video). Full list in Appendix Supplementary Information by Command."
  notes: "Response DATA01 FFh = ended with error (no signal switch)."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {setting} {checksum}"
  params:
    - name: input_terminal
      type: enum
      description: "Input terminal value; see Appendix."
    - name: setting
      type: enum
      values: ["00h=terminal_specified_in_DATA01", "01h=BNC", "02h=COMPUTER"]

# ---- Picture / volume / aspect / lamp adjust ----
- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: enum
      values: ["00h=BRIGHTNESS", "01h=CONTRAST", "02h=COLOR", "03h=HUE", "04h=SHARPNESS"]
    - name: mode
      type: enum
      values: ["00h=ABSOLUTE", "01h=RELATIVE"]
    - name: value_lo
      type: integer
      description: "Low-order 8 bits of adjustment value."
    - name: value_hi
      type: integer
      description: "High-order 8 bits of adjustment value."
  notes: "Response DATA01-02 execution result (0000h success)."

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: enum
      values: ["00h=ABSOLUTE", "01h=RELATIVE"]
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {checksum}"
  params:
    - name: aspect_value
      type: enum
      description: "DATA01 aspect value; see Appendix Supplementary Information by Command."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp / Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: enum
      values: ["00h=ABSOLUTE", "01h=RELATIVE"]
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer
  notes: "DATA01=96h DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST."

# ---- Remote / lens / lens memory ----
- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: enum
      description: "Key code low byte (see source key code list)."
    - name: data02
      type: enum
      description: "Key code high byte (WORD type; see source key code list)."
  notes: "Source key code list: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO (data02 always 00h)."

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: enum
      values: ["06h=PERIPHERY_FOCUS"]
      description: "Source shows target 06h; other targets not listed in this manual revision."
    - name: action
      type: enum
      values: ["00h=STOP", "01h=DRIVE_PLUS_1s", "02h=DRIVE_PLUS_0.5s", "03h=DRIVE_PLUS_0.25s", "7Fh=DRIVE_PLUS_CONTINUOUS", "81h=DRIVE_MINUS_CONTINUOUS", "FDh=DRIVE_MINUS_0.25s", "FEh=DRIVE_MINUS_0.5s", "FFh=DRIVE_MINUS_1s"]
  notes: "Send 00h after 7Fh/81h to stop continuous drive."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: enum
      values: ["FFh=STOP"]
      description: "Other targets per model; see source §3.24."
    - name: mode
      type: enum
      values: ["00h=ABSOLUTE", "02h=RELATIVE"]
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer
  notes: "If DATA01=FFh (STOP), mode/value ignored."

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      values: ["00h=MOVE", "01h=STORE", "02h=RESET"]

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      values: ["00h=MOVE", "01h=STORE", "02h=RESET"]
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: enum
      values: ["00h=LOAD_BY_SIGNAL", "01h=FORCED_MUTE"]
    - name: value
      type: enum
      values: ["00h=OFF", "01h=ON"]

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: enum
      values: ["00h=PROFILE_1", "01h=PROFILE_2"]

# ---- Eco / projector name / PIP / edge blending ----
- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: enum
      description: "Eco/light/lamp mode value; per-model mapping, see Appendix Supplementary Information by Command."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes_01-16} 00h {checksum}"
  params:
    - name: name_bytes_01-16
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16)."
  notes: "Length byte 12h = 18 (DATA01-16 + trailing 00h)."

- id: cmd_098_198_pip_pbp_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: enum
      values: ["00h=MODE", "01h=START_POSITION", "02h=SUB_INPUT/SUB_INPUT_1", "09h=SUB_INPUT_2", "0Ah=SUB_INPUT_3"]
    - name: value
      type: enum
      description: "MODE: 00h PIP / 01h PbP. START_POSITION: 00 TL / 01 TR / 02 BL / 03 BR. SUB INPUT values per Appendix."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: enum
      values: ["00h=OFF", "01h=ON"]
```

## Feedbacks
```yaml
# Each query command returns a structured response with one or more observable values.
# Source documents responses via DATA?? byte layouts (see command notes).
# Enumerated feedback channels (verbatim from source response tables):
- id: error_status
  type: bitmask
  sources: [cmd_009_error_status_request]
  description: "DATA01-12 bitfields. Bit set=error (cover, fan, temp, lamp, formatter, mirror cover, lens-not-installed, interlock switch, system errors)."

- id: power_status
  type: enum
  values: [standby, power_on]
  sources: [cmd_078_2_running_status_request]
  description: "DATA03 00h standby / 01h power on."

- id: cooling_in_progress
  type: enum
  values: [no, yes]
  sources: [cmd_078_2_running_status_request]

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  sources: [cmd_078_2_running_status_request, cmd_305_3_basic_information_request]

- id: input_signal_type
  type: enum
  values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER]
  sources: [cmd_078_3_input_status_request, cmd_305_3_basic_information_request]

- id: picture_mute
  type: enum
  values: [off, on]
  sources: [cmd_078_4_mute_status_request, cmd_305_3_basic_information_request]

- id: sound_mute
  type: enum
  values: [off, on]
  sources: [cmd_078_4_mute_status_request, cmd_305_3_basic_information_request]

- id: onscreen_mute
  type: enum
  values: [off, on]
  sources: [cmd_078_4_mute_status_request, cmd_305_3_basic_information_request]

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  sources: [cmd_078_4_mute_status_request]

- id: freeze_status
  type: enum
  values: [off, on]
  sources: [cmd_305_3_basic_information_request]

- id: cover_status
  type: enum
  values: [normal_open, closed]
  sources: [cmd_078_6_cover_status_request]

- id: lamp_usage_time
  type: integer
  unit: seconds
  sources: [cmd_037_information_request, cmd_037_4_lamp_information_request_3]
  notes: "Updated at one-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  sources: [cmd_037_4_lamp_information_request_3]
  notes: "Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  sources: [cmd_037_information_request, cmd_037_3_filter_usage_information_request]

- id: model_name
  type: string
  sources: [cmd_078_5_model_name_request, cmd_305_1_base_model_type_request]

- id: serial_number
  type: string
  sources: [cmd_305_2_serial_number_request]

- id: mac_address
  type: string
  sources: [cmd_097_155_lan_mac_address_status_request_2]

- id: projector_name_lan
  type: string
  sources: [cmd_097_45_lan_projector_name_request]

- id: horizontal_sync_frequency
  type: string
  sources: [cmd_084_information_string_request]

- id: vertical_sync_frequency
  type: string
  sources: [cmd_084_information_string_request]

- id: eco_mode
  type: enum
  sources: [cmd_097_8_eco_mode_request]

- id: edge_blending_mode
  type: enum
  values: [off, on]
  sources: [cmd_097_243_1_edge_blending_mode_request]

- id: lens_operation_status
  type: bitmask
  sources: [cmd_053_7_lens_information_request]
  description: "Bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0 stop, 1 operating)."

- id: lens_profile_selected
  type: enum
  values: [profile_1, profile_2]
  sources: [cmd_053_11_lens_profile_request]
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
- id: brightness
  type: integer
  sources: [cmd_030_1_picture_adjust, cmd_060_1_gain_parameter_request_3]
  absolute_mode: "DATA02=00h"
  range: "Per device limits returned by cmd_060_1 (DATA02-05)."

- id: contrast
  type: integer
  sources: [cmd_030_1_picture_adjust, cmd_060_1_gain_parameter_request_3]

- id: color
  type: integer
  sources: [cmd_030_1_picture_adjust, cmd_060_1_gain_parameter_request_3]

- id: hue
  type: integer
  sources: [cmd_030_1_picture_adjust, cmd_060_1_gain_parameter_request_3]

- id: sharpness
  type: integer
  sources: [cmd_030_1_picture_adjust, cmd_060_1_gain_parameter_request_3]

- id: volume
  type: integer
  sources: [cmd_030_2_volume_adjust, cmd_060_1_gain_parameter_request_3]

- id: lamp_light_adjust
  type: integer
  sources: [cmd_030_15_other_adjust, cmd_060_1_gain_parameter_request_3]
  gain_target: "DATA01=96h DATA02=FFh"

- id: aspect
  type: enum
  sources: [cmd_030_12_aspect_adjust]
  notes: "Enum values per Appendix Supplementary Information by Command."
```

## Events
```yaml
# No unsolicited notifications documented.
# UNRESOLVED: source does not describe asynchronous push events; projector only responds to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    notes: "While powering on, no other command is accepted."
  - command: cmd_016_power_off
    notes: "While powering off (including cooling time), no other command is accepted."
  - error_code: "ERR1=02h ERR2=0Dh"
    notes: "Command rejected because power is off."
  - error_code: "ERR1=02h ERR2=0Fh"
    notes: "No authority for the operation."
# UNRESOLVED: source does not describe power-on sequencing requirements beyond the interlock notes above.
# UNRESOLVED: source mentions interlock switch (DATA09 bit1 of error status) but does not document an interlock command sequence.
```

## Notes
- Reference manual identifier: **BDT140013 Rev 7.1**. Generic multi-model Sharp/NEC projector manual; not specific to LED E012I 217In. Some commands/values vary by model — see "Appendix: Supplementary Information by Command" referenced throughout but not included in the refined source excerpt.
- Frame format: `op1 op2 00h 00h LEN DATA?? CKS`. Response frames prefix op1 with `20h/21h/22h/23h` (success) or `A0h/A1h/A2h/A3h` (failure, followed by `<ERR1> <ERR2> <CKS>`).
- Checksum = low-order byte of the sum of all preceding bytes (incl. header and LEN). Source example: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS 03h.
- Error code pairs (ERR1/ERR2) are documented in source §2.4 (e.g. 00h/00h unrecognized, 00h/01h not supported by model, 01h/00h invalid value, 02h/0Dh power off, 02h/0Eh execution failed, 02h/0Fh no authority).
- ID1 (control ID) and ID2 (model code) byte values for this specific projector are not stated in this generic manual — must be read from the device configuration.
- Several "see Appendix Supplementary Information by Command" cross-references appear (input terminal values, aspect values, eco mode values, sub input values, base model types). That appendix was not present in the refined source excerpt; enum values for those parameters are UNRESOLVED.

<!-- UNRESOLVED: ID1 control ID default and ID2 model code for LED E012I 217In not stated. -->
<!-- UNRESOLVED: enum value tables referenced to "Appendix Supplementary Information by Command" not present in refined source (input terminal, aspect, eco mode, sub input, base model type). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: serial flow_control mode (RTS/CTS pinout present but usage not documented). -->
<!-- UNRESOLVED: LED E012I 217In is single-lamp LED — lamp 2 / LAMP INFORMATION REQUEST 3 DATA01=01h applicability not confirmed for this model. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:44:56.792Z
last_checked_at: 2026-06-17T20:10:06.882Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:10:06.882Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source hex command tokens and parameters; transport settings confirmed in source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID2 model code byte for this specific projector not stated in source (generic multi-model manual)."
- "control ID (ID1) default value not stated."
- "flow_control mode not explicitly stated (RTS/CTS pins present in pin assignment but flow control use not documented)."
- "firmware version compatibility range not stated."
- "RTS/CTS pins present in pin assignment but flow control mode not stated"
- "source does not describe asynchronous push events; projector only responds to commands."
- "source does not describe power-on sequencing requirements beyond the interlock notes above."
- "source mentions interlock switch (DATA09 bit1 of error status) but does not document an interlock command sequence."
- "ID1 control ID default and ID2 model code for LED E012I 217In not stated."
- "enum value tables referenced to \"Appendix Supplementary Information by Command\" not present in refined source (input terminal, aspect, eco mode, sub input, base model type)."
- "serial flow_control mode (RTS/CTS pinout present but usage not documented)."
- "LED E012I 217In is single-lamp LED — lamp 2 / LAMP INFORMATION REQUEST 3 DATA01=01h applicability not confirmed for this model."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
