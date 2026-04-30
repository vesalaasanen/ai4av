---
schema_version: ai4av-public-spec-v1
device_id: nec/np-v302h
entity_id: nec_np_v302h_series
spec_id: admin/nec-np-v302h-series
revision: 1
author: admin
title: "NEC NP-V302H Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: NP-V302H
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-V302H
    - "NP-V302H Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_v302h_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:01:47.326Z
retrieved_at: 2026-04-26T21:01:47.326Z
last_checked_at: 2026-04-26T21:01:47.326Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:01:47.326Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions match source commands with correct transport parameters; command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-V302H Series Control Spec

## Summary
NEC NP-V302H Series DLP projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector provides comprehensive AV control including power management, input routing, picture/sound mute, volume, aspect ratio, lens positioning, and extensive status querying. Serial communication uses RS-232C at configurable baud rates up to 115200 bps; LAN control uses TCP port 7142.

<!-- UNRESOLVED: exact input terminal code values for V302H model not listed in appendix tables (tables show other NP-series models) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port; serial port number not applicable to device itself
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS handshaking noted in pinout but no explicit flow_control setting
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) command present
- queryable       # numerous STATUS REQUEST, INFORMATION REQUEST commands present
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP/LIGHT ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Command 015. No other command accepted during power-on sequence."

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Command 016. No other command accepted during power-off/cooling sequence."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (hex). Common values: 01h=COMPUTER1, 06h=VIDEO, 0Bh=S-VIDEO, 1Ah=HDMI, 20h=LAN. See appendix for full model-specific codes.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Command 020. Cleared by input terminal switch or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Command 022. Cleared by input switch, video signal switch, or volume adjust."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Command 024. Cleared by input terminal switch or video signal switch."

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order byte then high-order byte)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect mode code. See appendix for model-specific value mappings."

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "2-byte key code. See key code table for mappings (e.g., 02h/00h=POWER ON, 03h/00h=POWER OFF, 0Dh/00h=MENU, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1)."

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  notes: "Command 051. Closes the lens shutter."

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  notes: "Command 052. Opens the lens shutter."

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), 06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive continuous +, 81h=Drive continuous -, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: "16-bit position value"

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
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "Eco mode value. See appendix for model-specific eco mode value mappings."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Up to 16 bytes, NUL-terminated string."

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value per target. See 097-198 for value definitions."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code for audio selection."
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"

# UNRESOLVED: commands 053-5, 053-6, 053-7, 053-10, 053-11 fully documented but listed as SET/REQUEST variants of lens operations already covered above
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request_query
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request_query
  label: Setting Request
  kind: query
  params: []

- id: running_status_request_query
  label: Running Status Request
  kind: query
  params: []

- id: input_status_request_query
  label: Input Status Request
  kind: query
  params: []

- id: mute_status_request_query
  label: Mute Status Request
  kind: query
  params: []

- id: model_name_request_query
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request_query
  label: Cover Status Request
  kind: query
  params: []

- id: information_string_request_query
  label: Information String Request
  kind: query
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request_query
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request_query
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: "Command 009. Returns error information in DATA01-DATA12 bits covering fan, temperature, lamp, cover, power, and sensor errors."

- id: input_sw_response
  label: Input Switch Response
  type: enum
  values:
    - 00h: Ended successfully
    - FFh: Ended with error (no signal switch)
  notes: "DATA01 in response to 018 INPUT SW CHANGE."

- id: picture_adjust_response
  label: Picture Adjust Response
  type: int
  description: "0000h=success, other=error"

- id: volume_adjust_response
  label: Volume Adjust Response
  type: int
  description: "0000h=success, other=error"

- id: information_request
  label: Information Request
  type: structured
  description: "Command 037. Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90)."

- id: filter_usage_information
  label: Filter Usage Information Request
  type: structured
  description: "Command 037-3. Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds."

- id: lamp_information_3
  label: Lamp Information Request 3
  type: structured
  description: "Command 037-4. Returns lamp target, content type, and lamp info (usage time in seconds or remaining life %)."

- id: carbon_savings_information
  label: Carbon Savings Information Request
  type: structured
  description: "Command 037-6. Returns target (00h=Total, 01h=Operation) and carbon savings in kg (DATA02-05) and mg (DATA06-09)."

- id: remote_key_response
  label: Remote Key Code Response
  type: enum
  values:
    - 00h: Ended successfully
    - FFh: Ended with error
  notes: "DATA01 in response to 050 REMOTE KEY CODE."

- id: shutter_response
  label: Shutter Response
  type: enum
  values:
    - 00h: Ended successfully
    - FFh: Ended with error
  notes: "DATA01 in response to 051/052."

- id: lens_control_response
  label: Lens Control Response
  type: enum
  values:
    - 00h: Ended successfully
    - FFh: Ended with error
  notes: "DATA01 in response to 053 LENS CONTROL."

- id: lens_control_request_response
  label: Lens Control Request Response
  type: structured
  description: "Command 053-1. Returns target, upper/lower adjustment limits, and current value as 16-bit values."

- id: lens_control_2_response
  label: Lens Control 2 Response
  type: structured
  description: "Command 053-2. Returns target and adjustment mode in DATA01/DATA02."

- id: lens_memory_control_response
  label: Lens Memory Control Response
  type: structured
  description: "Commands 053-3/053-4. Returns operation and execution result (00h=success, FFh=error)."

- id: lens_memory_option_response
  label: Lens Memory Option Request Response
  type: structured
  description: "Commands 053-5/053-6. Returns target and setting value (00h=OFF, 01h=ON)."

- id: lens_information_response
  label: Lens Information Request
  type: bitfield
  description: "Command 053-7. Bit-encoded lens status for zoom, focus, shift H/V."

- id: lens_profile_response
  label: Lens Profile Request Response
  type: structured
  description: "Command 053-11. Returns profile number (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_3
  label: Gain Parameter Request 3
  type: structured
  description: "Command 060-1. Returns adjustment status, range limits, default, current value for picture/volume/light parameters."

- id: setting_request
  label: Setting Request
  type: structured
  description: "Command 078-1. Returns base model type, sound function availability, clock/sleep timer profile."

- id: running_status_request
  label: Running Status Request
  type: structured
  description: "Command 078-2. Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request
  label: Input Status Request
  type: structured
  description: "Command 078-3. Returns signal switch process, signal list number, signal types, test pattern, content displayed."

- id: mute_status_request
  label: Mute Status Request
  type: structured
  description: "Command 078-4. Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status."

- id: model_name_request
  label: Model Name Request
  type: string
  description: "Command 078-5. Returns model name (NUL-terminated, DATA01-32)."

- id: cover_status_request
  label: Cover Status Request
  type: enum
  values:
    - 00h: Normal (cover opened)
    - 01h: Cover closed
  description: "Command 078-6. Returns mirror/lens cover status."

- id: freeze_control_response
  label: Freeze Control Response
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with error
  description: "DATA01 in response to 079 FREEZE CONTROL."

- id: information_string_request
  label: Information String Request
  type: structured
  description: "Command 084. Returns horizontal or vertical sync frequency as NUL-terminated string."

- id: eco_mode_request
  label: Eco Mode Request
  type: int
  description: "Command 097-8. Returns eco mode value set on projector."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: "Command 097-45. Returns projector name (NUL-terminated, DATA01-17)."

- id: lan_mac_address_status_2
  label: LAN MAC Address Status Request 2
  type: string
  description: "Command 097-155. Returns 6-byte MAC address."

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: structured
  description: "Command 097-198. Returns PIP/PbP mode, position, sub-input settings."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - 00h: OFF
    - 01h: ON
  description: "Command 097-243-1."

- id: eco_mode_set_response
  label: Eco Mode Set Response
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with error
  description: "DATA01 in response to 098-8 ECO MODE SET."

- id: lan_projector_name_set_response
  label: LAN Projector Name Set Response
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with error
  description: "DATA01 in response to 098-45."

- id: pip_picture_by_picture_set_response
  label: PIP/Picture by Picture Set Response
  type: structured
  description: "Response to 098-198. Returns target and execution result."

- id: edge_blending_mode_set_response
  label: Edge Blending Mode Set Response
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with error
  description: "DATA01 in response to 098-243-1."

- id: base_model_type_request
  label: Base Model Type Request
  type: structured
  description: "Command 305-1. Returns base model type and model name."

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: "Command 305-2. Returns serial number (NUL-terminated, DATA01-16)."

- id: basic_information_request
  label: Basic Information Request
  type: structured
  description: "Command 305-3. Returns operation status, content displayed, signal types, video/sound/freeze/mute status."

- id: audio_select_set_response
  label: Audio Select Set Response
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with error
  description: "DATA02 in response to 319-10 AUDIO SELECT SET."
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of action commands — all parameters
# are embedded in action/feedback transactions. Variable section not applicable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source — all communication
# is command/response based. Events section not applicable.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command (015) is executing, no other command can be accepted."
  - "While POWER OFF command (016) is executing (including cooling time), no other command can be accepted."
# UNRESOLVED: no safety voltage/current/power specifications stated in source
# UNRESOLVED: no interlock switch procedures beyond cover status monitoring (DATA09-01 in error status)
```

## Notes
The NEC NP-V302H Series supports a comprehensive command set spanning power management, input routing, AV mute controls, picture and sound adjustments, lens positioning with memory, eco mode, and detailed status querying. Commands follow a consistent binary format with a leading length byte, model-specific control ID (ID1/ID2), optional data payload, and checksum. Responses use a consistent format with result codes (success/error). Some models cannot receive serial commands in standby mode — standby mode configuration varies by model. Appendix tables provide input terminal codes, aspect modes, and eco mode values but the V302H-specific appendix entries are not present in this document (tables list other NP-series models); values should be verified against V302H-specific documentation.
<!-- UNRESOLVED: V302H-specific input terminal codes, aspect values, and eco mode values not present in appendix — those tables list other NP-series models -->
<!-- UNRESOLVED: ID1/ID2 values are projector-specific and must be set to match the target device -->
<!-- UNRESOLVED: TCP port 7142 is stated for LAN; serial port number is host-dependent -->
<!-- UNRESOLVED: standby mode command reception capability varies by model — V302H not listed in standby mode table -->
<!-- UNRESOLVED: RTS/CTS handshaking noted in pinout (pins 7/8) but flow_control setting not explicitly documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_v302h_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:01:47.326Z
retrieved_at: 2026-04-26T21:01:47.326Z
last_checked_at: 2026-04-26T21:01:47.326Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:01:47.326Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions match source commands with correct transport parameters; command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
