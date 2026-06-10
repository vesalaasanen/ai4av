---
spec_id: admin/nec-np-p547ul-p627ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP P547UL P627UL Control Spec"
manufacturer: NEC
model_family: NP-P547UL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-P547UL
    - NP-P627UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:56:16.083Z
last_checked_at: 2026-06-10T00:26:03.925Z
generated_at: 2026-06-10T00:26:03.925Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN command control not fully documented (unit sold separately); UNRESOLVED: input terminal hex values require Appendix \"Supplementary Information by Command\" not present in source"
  - "actual enum values require source Appendix"
  - "variables are settable parameters; source describes query+set pairs for eco mode, projector name, PIP/PbP, edge blending, lens memory option - all modeled as actions above with corresponding requests in Feedbacks"
  - "source describes no unsolicited event notifications from the device. All communication is command-response."
  - "no explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "input terminal hex values (DATA01 for INPUT SW CHANGE, AUDIO SELECT SET) reference Appendix not present in this source document"
  - "aspect ratio values require Appendix \"Supplementary Information by Command\""
  - "eco mode values require Appendix \"Supplementary Information by Command\""
  - "sub input values for PIP/PbP require Appendix"
  - "base model type values require Appendix"
  - "selection signal type 2 full value list for INPUT STATUS requires Appendix"
  - "display signal type (DATA05) full enum requires Appendix"
  - "LAMP ADJUST / LIGHT ADJUST parameter details require source clarification"
  - "wireless LAN control capability not documented (unit sold separately)"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:26:03.925Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched source commands; Feedbacks represent 22 additional query commands in source; 53/53 source commands fully represented (28 SET + 25 QUERY); transport values verified. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP P547UL P627UL Control Spec

## Summary
Laser projectors supporting both RS-232C serial and wired LAN (TCP/IP) control. Commands sent via hex-encoded packets with ID1/ID2 control IDs, checksum validation, and structured response frames. TCP port 7142. No authentication procedure described.

<!-- UNRESOLVED: wireless LAN command control not fully documented (unit sold separately); UNRESOLVED: input terminal hex values require Appendix "Supplementary Information by Command" not present in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps - list maximum
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # multiple information request commands present (ERROR STATUS, LAMP INFO, INPUT STATUS, etc.)
- levelable       # VOLUME ADJUST, PICTURE ADJUST, brightness, contrast, color, hue, sharpness
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex). See source Appendix for full list.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value. See source Appendix.

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code. Notable: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 85h=VOLUME UP, 86h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value. See source Appendix.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Up to 16-byte projector name string

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per item. See source Appendix.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal. See source Appendix.
    - name: setting_value
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: object
  properties:
    - name: data01
      type: object
      description: "Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium"
    - name: data02
      type: object
      description: "Bit0=Lamp usage time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit7=Extended status"
    - name: data03
      type: object
      description: "Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 usage exceeded"
    - name: data04
      type: object
      description: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor error, Bit7=Lens not installed"

- id: power_state
  label: Running Status / Power State
  type: enum
  values:
    - standby_sleep
    - standby_power_saving
    - power_on
    - cooling
    - standby_error
    - network_standby

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: forced_onscreen_mute
      type: enum
      values: [off, on]
    - name: onscreen_display
      type: enum
      values: [not_displayed, displayed]

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h"
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: model_name
  label: Model Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: lamp_info
  label: Lamp Information Request 3
  type: object
  properties:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds, returns -1 if undefined

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: integer
      description: "00h=Total, 01h=Operation"
    - name: carbon_kg
      type: number
      description: Kilograms (max 99999)
    - name: carbon_mg
      type: integer
      description: Milligrams (max 999999)

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, on]  # UNRESOLVED: actual enum values require source Appendix

- id: projector_name
  label: LAN Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string
  description: 6-byte MAC address (hex)

- id: lens_position
  label: Lens Control Request
  type: object
  properties:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_info
  label: Lens Information
  type: object
  properties:
    - name: lens_memory
      type: enum
      values: [stop, during_operation]
    - name: zoom
      type: enum
      values: [stop, during_operation]
    - name: focus
      type: enum
      values: [stop, during_operation]
    - name: lens_shift_h
      type: enum
      values: [stop, during_operation]
    - name: lens_shift_v
      type: enum
      values: [stop, during_operation]

- id: basic_info
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_being_switched]
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
    - name: video_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: freeze_status
      type: enum
      values: [off, on]

- id: information_request
  label: Information Request
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)

- id: gain_parameter
  label: Gain Parameter Request 3
  type: object
  properties:
    - name: status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, specified_gain_not_exist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer

- id: pip_picture_by_picture
  label: PIP/Picture by Picture Request
  type: object

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, cover_closed]

- id: lens_profile
  label: Lens Profile Request
  type: enum
  values: [profile_1, profile_2]

- id: lens_memory_option
  label: Lens Memory Option Request
  type: object
  properties:
    - name: option
      type: enum
      values: [load_by_signal, forced_mute]
    - name: value
      type: enum
      values: [off, on]
```

## Variables
```yaml
# UNRESOLVED: variables are settable parameters; source describes query+set pairs for eco mode, projector name, PIP/PbP, edge blending, lens memory option - all modeled as actions above with corresponding requests in Feedbacks
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited event notifications from the device. All communication is command-response.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command packet structure: `[PREAMBLE] [MODEL] <ID1> <ID2> [LEN] [DATA...] [CKS]` — preamble and model bytes vary by command class (00h/01h/02h/03h for queries, 20h/22h/23h for responses). Checksum = low-order byte of sum of all preceding bytes. Power on/off commands block other commands during execution (including cooling time for power off). Lens drive commands (7Fh/81h) can be stopped by sending 00h. Lamp usage time updates at 1-minute intervals despite 1-second resolution. Power state enum from RUNNING STATUS: 00h=Standby(Sleep), 01h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby.

<!-- UNRESOLVED: input terminal hex values (DATA01 for INPUT SW CHANGE, AUDIO SELECT SET) reference Appendix not present in this source document -->
<!-- UNRESOLVED: aspect ratio values require Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: eco mode values require Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: sub input values for PIP/PbP require Appendix -->
<!-- UNRESOLVED: base model type values require Appendix -->
<!-- UNRESOLVED: selection signal type 2 full value list for INPUT STATUS requires Appendix -->
<!-- UNRESOLVED: display signal type (DATA05) full enum requires Appendix -->
<!-- UNRESOLVED: LAMP ADJUST / LIGHT ADJUST parameter details require source clarification -->
<!-- UNRESOLVED: wireless LAN control capability not documented (unit sold separately) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:56:16.083Z
last_checked_at: 2026-06-10T00:26:03.925Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:26:03.925Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched source commands; Feedbacks represent 22 additional query commands in source; 53/53 source commands fully represented (28 SET + 25 QUERY); transport values verified. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN command control not fully documented (unit sold separately); UNRESOLVED: input terminal hex values require Appendix \"Supplementary Information by Command\" not present in source"
- "actual enum values require source Appendix"
- "variables are settable parameters; source describes query+set pairs for eco mode, projector name, PIP/PbP, edge blending, lens memory option - all modeled as actions above with corresponding requests in Feedbacks"
- "source describes no unsolicited event notifications from the device. All communication is command-response."
- "no explicit multi-step macros described in source"
- "no safety warnings or interlock procedures stated in source"
- "input terminal hex values (DATA01 for INPUT SW CHANGE, AUDIO SELECT SET) reference Appendix not present in this source document"
- "aspect ratio values require Appendix \"Supplementary Information by Command\""
- "eco mode values require Appendix \"Supplementary Information by Command\""
- "sub input values for PIP/PbP require Appendix"
- "base model type values require Appendix"
- "selection signal type 2 full value list for INPUT STATUS requires Appendix"
- "display signal type (DATA05) full enum requires Appendix"
- "LAMP ADJUST / LIGHT ADJUST parameter details require source clarification"
- "wireless LAN control capability not documented (unit sold separately)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
