---
spec_id: admin/sharp-nec-dd-e244f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd E244F Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Dd E244F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Dd E244F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:01:38.770Z
last_checked_at: 2026-06-17T19:40:32.742Z
generated_at: 2026-06-17T19:40:32.742Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "actual marketing model name not stated in the source manual (titled generically \"Projector Control Command Reference Manual\"); model name taken from operator-provided device name. Firmware version range and exact display/light-source specs not stated."
  - "flow control not stated; \"Communication mode: Full duplex\" only given"
  - "response framing for variable-length fields uses <ID1> <ID2> <CKS>"
  - "enum values deferred to source Appendix.\""
  - "numeric ranges/default values for these variables are returned"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step macro sequences."
  - "source documents no power-on sequencing requirements, voltage"
  - "(1) precise model name (operator-supplied), (2) firmware compatibility, (3) power/voltage specs, (4) flow_control, (5) enum values for aspect/eco-mode/input-terminal/sub-input/base-model-type, (6) Control ID and Model code default values."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:40:32.742Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literal hex command sequences verbatim in source; complete coverage with all transport parameters supported. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Dd E244F Control Spec

## Summary
Sharp/NEC Dd E244F is a projector controllable via RS-232C serial and wired/wireless LAN (TCP). This spec covers the binary command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mutes, picture/volume/lens adjust, lens memory, and status queries.

<!-- UNRESOLVED: actual marketing model name not stated in the source manual (titled generically "Projector Control Command Reference Manual"); model name taken from operator-provided device name. Firmware version range and exact display/light-source specs not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; "Communication mode: Full duplex" only given
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from 015 POWER ON / 016 POWER OFF
  - routable    # inferred from 018 INPUT SW CHANGE
  - queryable   # inferred from 009/037/078/etc. status queries
  - levelable   # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 LAMP ADJUST
```

## Actions
```yaml
# All command frames verbatim from source. Parameters shown as <DATA??>. Checksum
# byte (CKS) shown where the source documents it as part of the frame; for
# parameterized frames the CKS placeholder is shown since it is computed at runtime
# per the documented algorithm (sum of all preceding bytes, low-order 8 bits).
#
# Framing: 0x20/0x02/0x03/0x01 = command-class header; response headers 0xA0/0x22/
# 0x23/0x21; error headers 0xA2/0xA3/0xA1. ID1=Control ID, ID2=Model code.

actions:
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
    notes: "While powering on, no other command can be accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "Includes cooling time; no other command accepted during power-off."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). See source Appendix 'Supplementary Information by Command'."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Turned off by input/video switch."

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
    notes: "Turned off by input/video switch or volume adjustment."

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
    notes: "Turned off by input/video switch."

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
      - name: data01
        type: byte
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: byte
        description: "Mode: 00h absolute, 01h relative."
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Mode: 00h absolute, 01h relative."
      - name: data02
        type: byte
        description: "Value (low-order 8 bits)."
      - name: data03
        type: byte
        description: "Value (high-order 8 bits)."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: "Aspect value. See source Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Target: 96h = LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: byte
        description: "FFh (per source table pairing)."
      - name: data03
        type: byte
        description: "Mode: 00h absolute, 01h relative."
      - name: data04
        type: byte
        description: "Value (low-order 8 bits)."
      - name: data05
        type: byte
        description: "Value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (s), filter usage time (s)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time and alarm start time (seconds); -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: byte
        description: "01h usage time (s), 04h remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Key code low byte (see source key code list, e.g. 02h POWER ON, 06h MENU, 0Dh HELP)."
      - name: data02
        type: byte
        description: "Key code high byte (00h for all listed keys)."

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
      - name: data01
        type: byte
        description: "Target: 06h = Periphery Focus."
      - name: data02
        type: byte
        description: "00h Stop, 01h drive +1s, 02h +0.5s, 03h +0.25s, 7Fh drive +, 81h drive -, FDh -0.25s, FEh -0.5s, FFh -1s."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: "Lens target (same semantics as 053 DATA01)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Target; FFh = Stop (mode/value ignored)."
      - name: data02
        type: byte
        description: "Mode: 00h absolute, 02h relative."
      - name: data03
        type: byte
        description: "Value (low-order 8 bits)."
      - name: data04
        type: byte
        description: "Value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET. Operates on profile selected by 053-10."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: byte
        description: "00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Bitfield DATA01: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift(H), Bit4 Lens Shift(V)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Profile 1, 01h Profile 2."

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
      - name: data01
        type: byte
        description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light adjust."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile/clock function flags."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power process state, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, signal types, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD state."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "00h Normal (cover opened), 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "01h Freeze on, 02h Freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: byte
        description: "03h Horizontal sync frequency, 04h Vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value depending on projector."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbyp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Eco/Light/Lamp mode value. See source Appendix."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    params:
      - name: data01_16
        type: string
        description: "Projector name, up to 16 bytes (NUL-terminated)."

  - id: pip_pbyp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: byte
        description: "Setting value (PIP=00h, PbP=01h for MODE; corner for START POSITION; sub-input value otherwise)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h OFF, 01h ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute/freeze state."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Input terminal value. See source Appendix."
      - name: data02
        type: byte
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    description: "009 ERROR STATUS REQUEST response (DATA01-12). Bit set=error."
    fields: [cover_error, temperature_bimetal, fan_error, power_error, lamp_off, lamp_replace_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor, mirror_cover_error, lamp2_replace_due, lamp2_usage_exceeded, foreign_matter_sensor, iris_calibration, lens_not_installed, interlock_switch_open, system_error_slave, system_error_formatter]

  - id: power_status
    type: enum
    values: [standby, power_on, not_supported]
    description: "078-2 DATA03."

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "078-2/305-3 DATA01."

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution, not_supported]

  - id: power_onoff_process
    type: enum
    values: [not_executed, during_execution, not_supported]

  - id: input_signal_status
    type: composite
    description: "078-3 response (signal list number, selection signal type 1/2, content displayed)."

  - id: mute_status
    type: composite
    description: "078-4 response (picture/sound/onscreen/forced-onscreen mute + OSD)."
    fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]

  - id: model_name
    type: string
    description: "078-5 response (NUL-terminated)."

  - id: cover_status
    type: enum
    values: [normal_opened, closed]

  - id: projector_information
    type: composite
    description: "037 response (projector name, lamp usage seconds, filter usage seconds)."

  - id: filter_usage
    type: composite
    description: "037-3 response (filter usage seconds, filter alarm start seconds)."

  - id: lamp_information
    type: composite
    description: "037-4 response (usage seconds or remaining life %)."

  - id: carbon_savings
    type: composite
    description: "037-6 response (kg + mg components)."

  - id: lens_position
    type: composite
    description: "053-1 response (upper/lower limit + current value per lens target)."

  - id: lens_operation_status
    type: bitfield
    description: "053-7 DATA01 (lens memory, zoom, focus, lens shift H/V in-motion flags)."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "053-11 response."

  - id: gain_parameter
    type: composite
    description: "060-1 response (limits, default, current, wide/narrow step, default validity)."

  - id: base_model_type
    type: composite
    description: "305-1 response (base model type code + model name string)."

  - id: serial_number
    type: string
    description: "305-2 response (NUL-terminated)."

  - id: basic_information
    type: composite
    description: "305-3 response (operation status, content displayed, signal types, mute/freeze)."

  - id: projector_setting
    type: composite
    description: "078-1 response (base model type, sound function, profile/clock function flags)."

  - id: eco_mode_value
    type: scalar
    description: "097-8 response (Light/Lamp mode value)."

  - id: lan_projector_name
    type: string
    description: "097-45 response."

  - id: lan_mac_address
    type: string
    description: "097-155 response (6 bytes)."

  - id: pip_pbyp_value
    type: composite
    description: "097-198 response (mode/start-position/sub-input value)."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "097-243-1 response."

  - id: sync_frequency
    type: string
    description: "084 response (horizontal 03h / vertical 04h sync frequency string)."

  - id: command_ack
    type: enum
    description: "Generic successful response echoes header 2xh with no data; 0xh+ERR1/ERR2 on failure."
    values: [ok, error]

  # <!-- UNRESOLVED: response framing for variable-length fields uses <ID1> <ID2> <CKS>
  # placeholders documented by source but device-ID values themselves are runtime-
  # configurable (Control ID) and not enumerated in the source. -->
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    description: "030-1 DATA01=00h target."
  - id: picture_contrast
    type: integer
    description: "030-1 DATA01=01h target."
  - id: picture_color
    type: integer
    description: "030-1 DATA01=02h target."
  - id: picture_hue
    type: integer
    description: "030-1 DATA01=03h target."
  - id: picture_sharpness
    type: integer
    description: "030-1 DATA01=04h target."
  - id: volume
    type: integer
    description: "030-2 sound volume."
  - id: lamp_light_adjust
    type: integer
    description: "030-15 LAMP ADJUST / LIGHT ADJUST (DATA01=96h)."
  - id: aspect
    type: enum
    description: "030-12 aspect value. # UNRESOLVED: enum values deferred to source Appendix."
  - id: eco_mode
    type: enum
    description: "098-8/097-8. # UNRESOLVED: enum values deferred to source Appendix."
  - id: projector_name
    type: string
    description: "098-45 LAN projector name (max 16 bytes)."
  # <!-- UNRESOLVED: numeric ranges/default values for these variables are returned
  # dynamically by the 060-1 GAIN PARAMETER REQUEST and are not enumerated as
  # constants in the source. -->
```

## Events
```yaml
# <!-- UNRESOLVED: source documents no unsolicited notifications. All responses are
# replies to commands (including the 0xh error-header responses with ERR1/ERR2). -->
```

## Macros
```yaml
# <!-- UNRESOLVED: source documents no multi-step macro sequences. -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "While powering on, no other command can be accepted."
  - command: "016. POWER OFF"
    note: "During power-off (including cooling time), no other command can be accepted."
  - command: "053. LENS CONTROL"
    note: "After issuing 7Fh (drive +) or 81h (drive -), lens must be stopped by sending 00h."
  - command: "009. ERROR STATUS REQUEST"
    note: "Interlock switch open is surfaced as DATA09 Bit1; system errors (Slave CPU / Formatter) as DATA09 Bit2/Bit3."
# <!-- UNRESOLVED: source documents no power-on sequencing requirements, voltage
# ratings, or full interlock procedures; the above are operational lockouts only. -->
```

## Notes
- Manual revision: BDT140013 Rev 7.1. Source is generic "Projector Control Command Reference Manual" — not model-specific in title.
- Command framing: request header byte encodes class (`00h`/`01h`/`02h`/`03h`), success-response headers are `20h`/`21h`/`22h`/`23h`, error-response headers are `A0h`/`A1h`/`A2h`/`A3h`. The `<ID1>`/`<ID2>` (Control ID, Model code) and trailing `<CKS>` bytes are runtime values per the documented checksum rule: sum of all preceding bytes, low-order 8 bits.
- Checksum example from source: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Serial port uses D-SUB 9P cross cable; pin assignment documented (2↔3, 7↔8 crossed, 5=GND).
- LAN port is RJ-45; TCP port 7142 for command send/receive.
- Error responses carry ERR1/ERR2 codes (full table in source §2.4), including `02h 0Dh` "command cannot be accepted because the power is off".
- Multiple command sub-tables (aspect values, eco-mode values, input-terminal values, base-model-type values, sub-input values) are deferred to a source Appendix not present in the refined text; values left UNRESOLVED.
<!-- UNRESOLVED: (1) precise model name (operator-supplied), (2) firmware compatibility, (3) power/voltage specs, (4) flow_control, (5) enum values for aspect/eco-mode/input-terminal/sub-input/base-model-type, (6) Control ID and Model code default values. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:01:38.770Z
last_checked_at: 2026-06-17T19:40:32.742Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:40:32.742Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literal hex command sequences verbatim in source; complete coverage with all transport parameters supported. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "actual marketing model name not stated in the source manual (titled generically \"Projector Control Command Reference Manual\"); model name taken from operator-provided device name. Firmware version range and exact display/light-source specs not stated."
- "flow control not stated; \"Communication mode: Full duplex\" only given"
- "response framing for variable-length fields uses <ID1> <ID2> <CKS>"
- "enum values deferred to source Appendix.\""
- "numeric ranges/default values for these variables are returned"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step macro sequences."
- "source documents no power-on sequencing requirements, voltage"
- "(1) precise model name (operator-supplied), (2) firmware compatibility, (3) power/voltage specs, (4) flow_control, (5) enum values for aspect/eco-mode/input-terminal/sub-input/base-model-type, (6) Control ID and Model code default values."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
