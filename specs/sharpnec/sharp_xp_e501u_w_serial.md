---
spec_id: admin/sharp-nec-xp-e501u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC XP-E501U-W Control Spec"
manufacturer: Sharp/NEC
model_family: XP-E501U-W
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - XP-E501U-W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:18:14.968Z
last_checked_at: 2026-07-22T07:46:33.395Z
generated_at: 2026-07-22T07:46:33.395Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal numeric codes are referenced as \"Appendix Supplementary Information by Command\" which is not present in the source — DATA01 value tables for INPUT SW CHANGE, AUDIO SELECT SET, and the *Setting value* sub-tables for PIP/PBP SET/REQUEST are absent."
  - "numeric values listed in missing Appendix."
  - "numeric codes in missing Appendix."
  - "full DATA01 list not in this excerpt.\""
  - "non-stop DATA01 target codes not in excerpt.\""
  - "numeric codes in missing Appendix.\""
  - "source references an Appendix \"Supplementary Information by Command\" for"
  - "source does not document unsolicited asynchronous notifications;"
  - "source does not document multi-step macro sequences."
  - "- Firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:46:33.395Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex tokens in source; complete bidirectional coverage with source command catalogue; transport parameters verified in sections 1.1-1.2. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sharp/NEC XP-E501U-W Control Spec

## Summary
RS-232C and LAN (TCP) control protocol for the Sharp/NEC XP-E501U-W projector. Documents binary command frames with hex payloads, parameterised adjustments, status queries, lens/shutter control, and checksum-based framing. Source manual: BDT140013 Revision 7.1 (Projector Control Command Reference Manual).

<!-- UNRESOLVED: input-terminal numeric codes are referenced as "Appendix Supplementary Information by Command" which is not present in the source — DATA01 value tables for INPUT SW CHANGE, AUDIO SELECT SET, and the *Setting value* sub-tables for PIP/PBP SET/REQUEST are absent. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # highest listed; source states 115200/38400/19200/9600/4800 supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: not stated in source; RTS/CTS pins present but flow-control mode not specified
addressing:
  port: 7142  # LAN TCP port per source section 1.2
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands (015, 016)
- routable        # inferred from input switch and PIP/PBP commands
- queryable       # inferred from numerous status request commands
- levelable       # inferred from picture adjust, volume adjust, gain parameter commands
```

## Actions
```yaml
# CRITICAL: per-population policy, every command row from source section 2 (Command List)
# is enumerated below. Hex payloads copied verbatim from source. Parameterised bytes
# use {param} placeholders; CKS = checksum = low byte of sum of all preceding bytes.
#
# Frame format (general): SOH DATA_LEN ID1 ID2 [LEN [DATA...]] CKS
# See source section 2.1 and 2.2 for ID1 (control ID), ID2 (model code), CKS rules.

- id: error_status_request
  label: 009 ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response carries 12 DATA bytes (DATA01-DATA12) of error bit-fields. See source §3.1 for bit assignments."

- id: power_on
  label: 015 POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While powering on, no other command is accepted."

- id: power_off
  label: 016 POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While powering off (incl. cooling), no other command is accepted."

- id: input_switch_change
  label: 018 INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (hex byte). UNRESOLVED: numeric values listed in missing Appendix.

- id: picture_mute_on
  label: 020 PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input switch or video signal switch."

- id: picture_mute_off
  label: 021 PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input switch, video signal switch, or volume adjust."

- id: sound_mute_off
  label: 023 SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input switch or video signal switch."

- id: onscreen_mute_off
  label: 025 ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value low-order byte (signed)"
    - name: DATA04
      type: integer
      description: "Adjustment value high-order byte (signed)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: 030-2 VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value low-order byte"
    - name: DATA03
      type: integer
      description: "Adjustment value high-order byte"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: 030-12 ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (hex). UNRESOLVED: numeric codes in missing Appendix.

- id: other_adjust
  label: 030-15 OTHER ADJUST (LAMP/LIGHT ADJUST)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "High byte of adjustment target - 96h for LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Low byte of adjustment target - FFh for LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value low-order byte"
    - name: DATA05
      type: integer
      description: "Adjustment value high-order byte"

- id: information_request
  label: 037 INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns 98 DATA bytes: projector name (1-49), reserved (50-82), lamp usage seconds (83-86), filter usage seconds (87-90), reserved (91-98). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: 037-3 FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns 8 DATA bytes: filter usage seconds (1-4), filter alarm start seconds (5-8). Undefined time returns -1."

- id: lamp_information_request
  label: 037-4 LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp number: 00h Lamp 1, 01h Lamp 2 (dual-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time seconds, 04h remaining life %"
  notes: "Example (Lamp1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Updated at 1-minute intervals."

- id: carbon_savings_information_request
  label: 037-6 CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: 050 REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). See source §3.19 Key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD). See source §3.19 Key code list."
  notes: "Key codes enumerated: POWER ON (02h/00h), POWER OFF (03h/00h), AUTO (05h/00h), MENU (06h/00h), UP/DOWN/RIGHT/LEFT (07h-0Ah/00h), ENTER (0Bh/00h), EXIT (0Ch/00h), HELP (0Dh/00h), MAGNIFY UP/DOWN (0Fh/10h/00h), MUTE (13h/00h), PICTURE (29h/00h), COMPUTER1/2 (4Bh/4Ch/00h), VIDEO1 (4Fh/00h), S-VIDEO1 (51h/00h), VOLUME UP/DOWN (84h/85h/00h), FREEZE (8Ah/00h), ASPECT (A3h/00h), SOURCE (D7h/00h), LAMP MODE/ECO (EEh/00h). Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h"

- id: shutter_close
  label: 051 SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 LENS CONTROL (drives)
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. 06h = Periphery Focus. UNRESOLVED: full DATA01 list not in this excerpt."
    - name: DATA02
      type: integer
      description: "Motion: 00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh plus continuous, 81h minus continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: "Send 00h after 7Fh/81h to stop continuous drive."

- id: lens_control_request
  label: 053-1 LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same encoding as 053 LENS CONTROL)"
  notes: "Returns 7 DATA bytes: target (1), upper limit lo/hi (2-3), lower limit lo/hi (4-5), current lo/hi (6-7)."

- id: lens_control_2
  label: 053-2 LENS CONTROL 2 (absolute/relative)
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh = Stop (other bytes ignored). UNRESOLVED: non-stop DATA01 target codes not in excerpt."
    - name: DATA02
      type: integer
      description: "00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value low-order byte"
    - name: DATA04
      type: integer
      description: "Adjustment value high-order byte"

- id: lens_memory_control
  label: 053-3 LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4 REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET. Operates on profile selected by 053-10."

- id: lens_memory_option_request
  label: 053-5 LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6 LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7 LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bit field: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=stop, 1=during operation)."

- id: lens_profile_set
  label: 053-10 LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11 LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns current profile number (00h Profile 1, 01h Profile 2)."

- id: gain_parameter_request
  label: 060-1 GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
  notes: "Returns 16 DATA bytes: status, upper/lower limits, default, current, wide/narrow widths, default-valid flag."

- id: setting_request
  label: 078-1 SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns 32 DATA bytes: base model type (1-3), sound function (4), profile number (5), reserved (6-32)."

- id: running_status_request
  label: 078-2 RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns 16 DATA bytes including power status (3), cooling process (4), power on/off process (5), operation status (6)."

- id: input_status_request
  label: 078-3 INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns 16 DATA bytes describing input signal status (signal switch process, signal list number, selection signal type, content displayed, test pattern state)."

- id: mute_status_request
  label: 078-4 MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns 16 DATA bytes: picture mute (1), sound mute (2), onscreen mute (3), forced onscreen mute (4), onscreen display (5)."

- id: model_name_request
  label: 078-5 MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns 32 DATA bytes (NUL-terminated model name string)."

- id: cover_status_request
  label: 078-6 COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 1 DATA byte: 00h cover open (normal), 01h cover closed."

- id: freeze_control
  label: 079 FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: 084 INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"

- id: eco_mode_request
  label: 097-8 ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns value of Light/Lamp mode. UNRESOLVED: numeric codes in missing Appendix."

- id: lan_projector_name_request
  label: 097-45 LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns 17 DATA bytes (NUL-terminated projector name)."

- id: lan_mac_address_status_request
  label: 097-155 LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6 DATA bytes (MAC address)."

- id: pip_pbp_request
  label: 097-198 PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "DATA02 value for MODE: 00h PIP, 01h PICTURE BY PICTURE. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT. Sub-input values in missing Appendix."

- id: edge_blending_mode_request
  label: 097-243-1 EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h OFF, 01h ON."

- id: eco_mode_set
  label: 098-8 ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value for Light/Lamp mode. UNRESOLVED: numeric codes in missing Appendix."

- id: lan_projector_name_set
  label: 098-45 LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} ... {DATA16} 00h {CKS}"
  params:
    - name: DATA01-DATA16
      type: string
      description: "Projector name up to 16 bytes, NUL-terminated"

- id: pip_pbp_set
  label: 098-198 PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "See source §3.48 for MODE/START POSITION values; sub-input values in missing Appendix."

- id: edge_blending_mode_set
  label: 098-243-1 EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON"

- id: base_model_type_request
  label: 305-1 BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns 15 DATA bytes: base model type (1-2), model name NUL string (3-11), base model type (12-13), reserved (14-15)."

- id: serial_number_request
  label: 305-2 SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16 DATA bytes (NUL-terminated serial number string)."

- id: basic_information_request
  label: 305-3 BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns 15 DATA bytes: operation status, content displayed, selection signal type 1/2, display signal type, video mute, sound mute, onscreen mute, freeze status."

- id: audio_select_set
  label: 319-10 AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. UNRESOLVED: numeric codes in missing Appendix."
    - name: DATA02
      type: integer
      description: "00h terminal specified by DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: 12-byte error bit-field returned by 009 ERROR STATUS REQUEST. See source §3.1 table for DATA01-DATA12 bit assignments (cover error, fan error, lamp off, temperature error, formatter error, FPGA error, mirror cover, interlock, ballast comm, etc.).
- id: power_status
  type: enum
  values: [standby, power_on]
  description: DATA03 of 078-2 RUNNING STATUS REQUEST (00h standby, 01h power on, FFh not supported).
- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: DATA04 of 078-2.
- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: DATA05 of 078-2.
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
  description: DATA06 of 078-2 / DATA01 of 305-3.
- id: content_displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_switching, not_supported]
  description: DATA02 of 305-3.
- id: selection_signal_type_2
  type: enum
  values: [computer, video, s_video, component, viewer_1_5, dvi_d, hdmi, display_port, viewer_6_10, not_source_input, not_supported]
  description: DATA04 of 305-3 / DATA04 of 078-3.
- id: picture_mute
  type: enum
  values: [off, on]
  description: DATA01 of 078-4 MUTE STATUS REQUEST.
- id: sound_mute
  type: enum
  values: [off, on]
  description: DATA02 of 078-4.
- id: onscreen_mute
  type: enum
  values: [off, on]
  description: DATA03 of 078-4.
- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  description: DATA04 of 078-4.
- id: cover_status
  type: enum
  values: [open, closed]
  description: 078-6 COVER STATUS REQUEST (00h normal/cover opened, 01h cover closed).
- id: lens_status
  type: object
  description: 053-7 LENS INFORMATION REQUEST bit field (lens memory / zoom / focus / lens shift H / lens shift V; 0=stop, 1=operating).
- id: lamp_usage_seconds
  type: integer
  description: Lamp usage time in seconds (037 INFORMATION REQUEST DATA83-86 or 037-4 DATA03-06).
- id: filter_usage_seconds
  type: integer
  description: Filter usage time in seconds (037-3 DATA01-04).
- id: filter_alarm_start_seconds
  type: integer
  description: Filter alarm start time in seconds (037-3 DATA05-08). -1 if undefined.
- id: lamp_remaining_life_percent
  type: integer
  description: 037-4 with DATA02=04h. Negative if replacement deadline exceeded.
- id: carbon_savings_kg
  type: integer
  description: Total or operating carbon savings in kilograms (037-6).
- id: carbon_savings_mg
  type: integer
  description: Total or operating carbon savings in milligrams (037-6).
- id: model_name
  type: string
  description: 078-5 MODEL NAME REQUEST (NUL-terminated, up to 32 bytes).
- id: serial_number
  type: string
  description: 305-2 SERIAL NUMBER REQUEST (NUL-terminated, up to 16 bytes).
- id: base_model_type
  type: integer
  description: 305-1 BASE MODEL TYPE REQUEST.
- id: mac_address
  type: string
  description: 097-155 LAN MAC ADDRESS STATUS REQUEST2 (6 bytes).
- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: 097-243-1 EDGE BLENDING MODE REQUEST.
```

## Variables
```yaml
# UNRESOLVED: source references an Appendix "Supplementary Information by Command" for
# numeric value tables (input terminals, aspect values, eco mode values, sub-input
# values, base model types) that is NOT included in the source excerpt.
# Variables below are settable parameters exposed as actions, not separate variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited asynchronous notifications;
# every response described is tied to a command/response cycle.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON and POWER OFF commands must complete (including cooling) before any other command can be accepted by the projector. Issuing commands during these windows is rejected."
    source_section: "§3.2 POWER ON, §3.3 POWER OFF"
  - description: "While lens is being driven (continuous mode 7Fh/81h), same command may be re-issued to continue without a stop; otherwise send 00h to halt."
    source_section: "§3.22 LENS CONTROL"
  - description: "Picture mute / sound mute / onscreen mute are auto-cleared by input switch, video signal switch, or volume adjust (where applicable)."
    source_section: "§3.5-3.10 MUTE commands"
```

## Notes
- All commands use a binary frame with checksum (CKS) = low-order byte of sum of all preceding bytes. Source §2.2.
- ID1 = Control ID configured on the projector; ID2 = model-specific code.
- Responses return ERR1/ERR2 error codes per source §2.4 (e.g. 02h 0Dh = "command cannot be accepted because the power is off").
- Baud rate is configurable 115200/38400/19200/9600/4800; default not stated in source.
- LAN TCP port is fixed at 7142 per source §1.2.

<!-- UNRESOLVED:
- Firmware version compatibility not stated in source.
- Baud rate default not stated (source lists supported rates).
- Wireless LAN unit details: "see the operation manual of the wireless LAN unit to be used" — not in this excerpt.
- Pin-by-pin RS-232C flow control behaviour (RTS/CTS pins present but mode unspecified).
- Numeric code tables for input terminals, aspect, eco mode, sub-input (PIP/PBP), audio select terminals, and base model types are referenced as "Appendix Supplementary Information by Command" but that appendix is not present in the source document.
-->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:18:14.968Z
last_checked_at: 2026-07-22T07:46:33.395Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:46:33.395Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex tokens in source; complete bidirectional coverage with source command catalogue; transport parameters verified in sections 1.1-1.2. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal numeric codes are referenced as \"Appendix Supplementary Information by Command\" which is not present in the source — DATA01 value tables for INPUT SW CHANGE, AUDIO SELECT SET, and the *Setting value* sub-tables for PIP/PBP SET/REQUEST are absent."
- "numeric values listed in missing Appendix."
- "numeric codes in missing Appendix."
- "full DATA01 list not in this excerpt.\""
- "non-stop DATA01 target codes not in excerpt.\""
- "numeric codes in missing Appendix.\""
- "source references an Appendix \"Supplementary Information by Command\" for"
- "source does not document unsolicited asynchronous notifications;"
- "source does not document multi-step macro sequences."
- "- Firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
