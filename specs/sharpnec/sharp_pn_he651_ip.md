---
spec_id: admin/sharp-nec-pn-he651
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HE651 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HE651
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HE651
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:39:56.062Z
last_checked_at: 2026-06-18T09:07:06.057Z
generated_at: 2026-06-18T09:07:06.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not explicitly confirm PN-HE651 is the targeted model for this manual; model name taken from the operator-provided device name. The manual is a generic projector command reference and does not list specific model codes (ID2 model-code table is referenced but not present in the refined source)."
  - "source states \"Full duplex\" communication mode but does not specify flow control wiring beyond RTS/CTS pinout"
  - "aspect variable query path; audio select readback (319-10 has no paired request in source)."
  - "source describes no unsolicited notifications. All responses are replies to issued commands."
  - "source describes no multi-step command sequences as macros."
  - "no explicit power-on sequencing, voltage/current specs, or hard interlock procedures stated in source."
  - "default baud rate not stated (source lists 5 supported rates)."
  - "ID2 model code for PN-HE651 not present in source."
  - "Appendix 'Supplementary Information by Command' (input terminal values, aspect values, eco mode values, sub input values, base model type values) is not in the refined source document."
  - "authority / access-control model referenced by error code 02h 0Fh is not described."
  - "flow control configuration beyond RTS/CTS pinout not specified."
  - "whether wireless LAN uses the same TCP port 7142 is implied but not explicitly stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:07:06.057Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HE651 Control Spec

## Summary
Sharp/NEC projector / large-format display control spec based on the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device exposes a binary command protocol over RS-232C serial and over TCP/IP (wired/wireless LAN). All commands are framed hexadecimal payloads with a trailing checksum byte (sum of preceding bytes, low-order 8 bits).

<!-- UNRESOLVED: source does not explicitly confirm PN-HE651 is the targeted model for this manual; model name taken from the operator-provided device name. The manual is a generic projector command reference and does not list specific model codes (ID2 model-code table is referenced but not present in the refined source). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated - UNRESOLVED which is default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow control wiring beyond RTS/CTS pinout
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many *REQUEST commands return status values
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST present
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
```

## Actions
```yaml
# Frame format: <HDR> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector (00h when default).
# ID2 = model code (00h when default; varies by model - not enumerated in source).
# CKS = checksum = low-order 8 bits of the sum of all preceding bytes.
# Below, commands are shown verbatim from the source with ID1=00h ID2=00h as documented.
# Parameterized DATA bytes are shown as {DATAxx} placeholders.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While this command is turning on the power, no other command can be accepted."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While this command is turning off the power (including cooling time), no other command can be accepted."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command' - values not present in refined source). Example: 06h = video port."

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Auto turned off on input terminal switch or video signal switch."

- id: picture_mute_off_021
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Auto turned off on input terminal switch, video signal switch, or volume adjustment."

- id: sound_mute_off_023
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Auto turned off on input terminal switch or video signal switch."

- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)."
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute value, 01h=relative value)."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode (00h=absolute value, 01h=relative value)."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see Appendix 'Supplementary Information by Command' - values not present in refined source)."

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)."
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)."
    - name: DATA03
      type: integer
      description: "Adjustment mode (00h=absolute value, 01h=relative value)."
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (seconds), filter usage time (seconds)."

- id: filter_usage_information_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time and filter alarm start time in seconds (-1 if undefined)."

- id: lamp_information_request_3_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector (00h=Lamp 1, 01h=Lamp 2 - Lamp 2 only valid on two-lamp models)."
    - name: DATA02
      type: integer
      description: "Content (01h=Lamp usage time seconds, 04h=Lamp remaining life %)."

- id: carbon_savings_information_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD-type key code, see Key code list)."
    - name: DATA02
      type: integer
      description: "Key code high byte."

- id: shutter_close_051
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens adjustment target (06h=Periphery Focus; other values referenced in Appendix, not present in refined source)."
    - name: DATA02
      type: integer
      description: "Drive content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous +, 81h=continuous -, FDh=-0.25s, FEh=-0.5s, FFh=-1s)."

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens adjustment target (same values as 053 LENS CONTROL DATA01)."
  notes: "Returns upper/lower adjustment range and current value."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop; other values not enumerated in source)."
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute value, 02h=relative value)."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)."

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET). Controls profile number selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)."

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)."
    - name: DATA02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bitmask (lens memory, zoom, focus, lens shift H/V)."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)."

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)."
  notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/timer function flags."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types 1 & 2, test pattern display, content displayed."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status (00h=opened, 01h=closed)."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF."

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)."

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (values in Appendix, not present in refined source)."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)."

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the eco mode (values in Appendix, not present in refined source)."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated). Encoded as DATA01-DATA16."

- id: pip_picture_by_picture_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)."
    - name: DATA02
      type: integer
      description: "Setting value (depends on DATA01 - PIP/PICTURE BY PICTURE, TOP-LEFT/TOP-RIGHT/BOTTOM-LEFT/BOTTOM-RIGHT, or sub input setting)."

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name string."

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix 'Supplementary Information by Command' - values not present in refined source)."
    - name: DATA02
      type: integer
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)."
```

## Feedbacks
```yaml
# Each observable state value returned by a *REQUEST command.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01"

- id: cooling_in_progress
  type: boolean
  source: "078-2 DATA04"

- id: power_transition_in_progress
  type: boolean
  source: "078-2 DATA05"

- id: error_status
  type: bitmask
  description: "12-byte error info bitmask from 009 ERROR STATUS REQUEST DATA01-DATA12 (cover, fan, temperature, power, lamp, formatter, mirror cover, foreign matter, lens installation, interlock, system errors)."
  source: "009 ERROR STATUS REQUEST"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01 / 305-3 DATA06"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02 / 305-3 DATA07"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03 / 305-3 DATA08"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 DATA09"

- id: cover_status
  type: enum
  values: [opened, closed]
  source: "078-6 COVER STATUS REQUEST"

- id: input_selection
  type: object
  description: "Signal list number, selection signal types 1 & 2, signal list type, test pattern display, content displayed."
  source: "078-3 INPUT STATUS REQUEST"

- id: lamp_usage_time_seconds
  type: integer
  unit: seconds
  source: "037 INFORMATION REQUEST DATA83-86 / 037-4 LAMP INFORMATION REQUEST 3"
  notes: "Updated at one-minute intervals."

- id: lamp_remaining_life_percent
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h)"
  notes: "Negative value if replacement deadline exceeded."

- id: filter_usage_time_seconds
  type: integer
  unit: seconds
  source: "037 INFORMATION REQUEST DATA87-90 / 037-3 FILTER USAGE INFORMATION REQUEST"

- id: carbon_savings_kg
  type: number
  unit: kilogram
  source: "037-6 CARBON SAVINGS INFORMATION REQUEST"

- id: projector_name
  type: string
  source: "037 INFORMATION REQUEST DATA01-49 / 097-45 LAN PROJECTOR NAME REQUEST"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST / 305-1 BASE MODEL TYPE REQUEST DATA03-11"

- id: base_model_type
  type: integer
  source: "078-1 SETTING REQUEST DATA01-03 / 305-1 BASE MODEL TYPE REQUEST"
  notes: "Values in Appendix, not present in refined source."

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

- id: eco_mode
  type: integer
  source: "097-8 ECO MODE REQUEST"
  notes: "Values in Appendix, not present in refined source."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: pip_pbp_setting
  type: object
  description: "MODE (PIP/PICTURE BY PICTURE), START POSITION, SUB INPUT 1/2/3 settings."
  source: "097-198 PIP/PICTURE BY PICTURE REQUEST"

- id: lens_position
  type: object
  description: "Upper/lower adjustment range and current value for the requested lens target."
  source: "053-1 LENS CONTROL REQUEST"

- id: lens_information
  type: bitmask
  description: "Lens operation status (lens memory, zoom, focus, lens shift H/V - stop vs during operation)."
  source: "053-7 LENS INFORMATION REQUEST"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 LENS PROFILE REQUEST"

- id: lens_memory_option
  type: object
  description: "LOAD BY SIGNAL and FORCED MUTE on/off settings."
  source: "053-5 LENS MEMORY OPTION REQUEST"

- id: gain_parameter
  type: object
  description: "Status, upper/lower/default/current values, wide/narrow adjustment widths for a given adjusted value name."
  source: "060-1 GAIN PARAMETER REQUEST 3"

- id: information_string
  type: string
  source: "084 INFORMATION STRING REQUEST"
  notes: "Horizontal/vertical sync frequency strings."

- id: sound_function_available
  type: boolean
  source: "078-1 SETTING REQUEST DATA04"

- id: profile_timer_function
  type: enum
  values: [not_available, clock, sleep_timer, clock_and_sleep_timer]
  source: "078-1 SETTING REQUEST DATA05"

- id: horizontal_sync_frequency
  type: string
  source: "084 INFORMATION STRING REQUEST (DATA01=03h)"

- id: vertical_sync_frequency
  type: string
  source: "084 INFORMATION STRING REQUEST (DATA01=04h)"
```

## Variables
```yaml
# Settable parameters exposed via PICTURE/VOLUME/LAMP ADJUST (030-1, 030-2, 030-15)
# and gain readback (060-1). Discrete action variants live in Actions.
- id: brightness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=00h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"

- id: contrast
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=01h)"
  query_via: "060-1 (DATA01=01h)"

- id: color
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=02h)"
  query_via: "060-1 (DATA01=02h)"

- id: hue
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=03h)"
  query_via: "060-1 (DATA01=03h)"

- id: sharpness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=04h)"
  query_via: "060-1 (DATA01=04h)"

- id: volume
  type: integer
  set_via: "030-2 VOLUME ADJUST"
  query_via: "060-1 (DATA01=05h)"

- id: lamp_light_adjust
  type: integer
  set_via: "030-15 OTHER ADJUST (DATA01=96h DATA02=FFh)"
  query_via: "060-1 (DATA01=96h)"

- id: aspect
  type: integer
  set_via: "030-12 ASPECT ADJUST"
  # query_via: UNRESOLVED - no dedicated aspect request command in this source.

- id: eco_mode
  type: integer
  set_via: "098-8 ECO MODE SET"
  query_via: "097-8 ECO MODE REQUEST"
  notes: "Enum values referenced in Appendix, not present in refined source."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  set_via: "098-243-1 EDGE BLENDING MODE SET"
  query_via: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  set_via: "098-198 PIP/PICTURE BY PICTURE SET (DATA01=00h)"

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  set_via: "098-198 PIP/PICTURE BY PICTURE SET (DATA01=01h)"

- id: projector_name
  type: string
  max_length: 16
  set_via: "098-45 LAN PROJECTOR NAME SET"
  query_via: "097-45 LAN PROJECTOR NAME REQUEST"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  set_via: "053-10 LENS PROFILE SET"
  query_via: "053-11 LENS PROFILE REQUEST"

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  set_via: "053-6 LENS MEMORY OPTION SET (DATA01=00h)"
  query_via: "053-5 LENS MEMORY OPTION REQUEST (DATA01=00h)"

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  set_via: "053-6 LENS MEMORY OPTION SET (DATA01=01h)"
  query_via: "053-5 LENS MEMORY OPTION REQUEST (DATA01=01h)"

# UNRESOLVED: aspect variable query path; audio select readback (319-10 has no paired request in source).
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are replies to issued commands.
# The protocol appears strictly request/response.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences as macros.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "While this command is turning off the power (including cooling time), no other command can be accepted."
interlocks:
  - description: "During POWER ON transition no other command is accepted by the projector."
    source: "015 POWER ON notes."
  - description: "During POWER OFF transition (incl. cooling) no other command is accepted by the projector."
    source: "016 POWER OFF notes."
  - description: "Error code 02h 0Dh = 'The command cannot be accepted because the power is off.' Many commands require power-on state."
    source: "2.4 Error code list."
  - description: "Error code 02h 0Fh = 'There is no authority necessary for the operation.'"
    source: "2.4 Error code list. Authority model not described in source."
# UNRESOLVED: no explicit power-on sequencing, voltage/current specs, or hard interlock procedures stated in source.
```

## Notes
- Protocol is binary, framed, little-endian checksum. Every command ends in a single checksum byte = low-order 8 bits of the sum of all preceding bytes (including the leading header byte and ID1/ID2/LEN).
- Response ACK byte (high nibble): `2xh` for 02h-header commands, `2xh` for 01h-header commands, `2xh` for 03h-header commands, `20h`-style for 00h-header commands; `Axh` ACK prefix denotes an error response carrying ERR1/ERR2. `23h` prefix denotes a successful response with returned DATA.
- ID2 (model code) is left at 00h in the documented examples; the model-code-to-device mapping table is not in this refined source. Operators targeting a specific model may need to substitute ID2.
- Several commands reference an "Appendix: Supplementary Information by Command" for value enumerations (input terminal codes, aspect values, eco mode values, sub input setting values, base model types). That appendix is **not present** in the refined source document — all such enum values are marked UNRESOLVED.
- Lamp/filter usage time is updated only at one-minute intervals despite being reported in one-second units.
- Lamp remaining life (%) goes negative once the replacement deadline is exceeded.
- POWER OFF enters a cooling period during which the device is unresponsive to all other commands.

<!-- UNRESOLVED: default baud rate not stated (source lists 5 supported rates). -->
<!-- UNRESOLVED: ID2 model code for PN-HE651 not present in source. -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' (input terminal values, aspect values, eco mode values, sub input values, base model type values) is not in the refined source document. -->
<!-- UNRESOLVED: authority / access-control model referenced by error code 02h 0Fh is not described. -->
<!-- UNRESOLVED: flow control configuration beyond RTS/CTS pinout not specified. -->
<!-- UNRESOLVED: whether wireless LAN uses the same TCP port 7142 is implied but not explicitly stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:39:56.062Z
last_checked_at: 2026-06-18T09:07:06.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:07:06.057Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not explicitly confirm PN-HE651 is the targeted model for this manual; model name taken from the operator-provided device name. The manual is a generic projector command reference and does not list specific model codes (ID2 model-code table is referenced but not present in the refined source)."
- "source states \"Full duplex\" communication mode but does not specify flow control wiring beyond RTS/CTS pinout"
- "aspect variable query path; audio select readback (319-10 has no paired request in source)."
- "source describes no unsolicited notifications. All responses are replies to issued commands."
- "source describes no multi-step command sequences as macros."
- "no explicit power-on sequencing, voltage/current specs, or hard interlock procedures stated in source."
- "default baud rate not stated (source lists 5 supported rates)."
- "ID2 model code for PN-HE651 not present in source."
- "Appendix 'Supplementary Information by Command' (input terminal values, aspect values, eco mode values, sub input values, base model type values) is not in the refined source document."
- "authority / access-control model referenced by error code 02h 0Fh is not described."
- "flow control configuration beyond RTS/CTS pinout not specified."
- "whether wireless LAN uses the same TCP port 7142 is implied but not explicitly stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
