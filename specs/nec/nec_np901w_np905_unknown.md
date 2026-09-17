---
spec_id: admin/nec-np901w-np905
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP901W NP905 Control Spec"
manufacturer: NEC
model_family: NP901W
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP901W
    - NP905
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:23:00.930Z
last_checked_at: 2026-09-15T22:17:05.841Z
generated_at: 2026-09-15T22:17:05.841Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-code (ID2) byte values for NP901W / NP905 not in source; the doc defers them to a separate appendix."
  - "source does not document any unsolicited device-initiated notifications."
  - "source does not document any multi-step macro sequences."
  - "firmware version compatibility not stated in source."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-15T22:17:05.841Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions map to 53 source commands (lens memory split into MOVE/STORE/RESET and freeze split into on/off); transport7142/96008N1 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC NP901W NP905 Control Spec

## Summary
Binary control protocol for NEC NP901W / NP905 installation projectors over RS-232C (D-SUB 9P PC CONTROL) or wired LAN (RJ-45, TCP port 7142). Commands are fixed-length or variable-length hex frames with a model-specific ID2 byte, a trailing checksum (low byte of sum of preceding bytes), and a completion response. This spec covers power, input switching, picture/sound/onscreen mute, shutter, freeze, picture/volume/aspect adjustment, lens control and memory, lamp/filter/carbon-savings information, and PIP/edge-blending configuration.

<!-- UNRESOLVED: model-code (ID2) byte values for NP901W / NP905 not in source; the doc defers them to a separate appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; 9600 is one of the supported rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input switch and audio select commands
- queryable       # inferred from numerous status request commands
- levelable       # inferred from picture/volume/aspect adjustment commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Input terminal code (see Appendix "Supplementary Information by Command" in source)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03_lo} {DATA03_hi} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Adjustment target (00=Brightness, 01=Contrast, 02=Color, 03=Hue, 04=Sharpness)
    - name: DATA02
      type: hex
      description: Adjustment mode (00=absolute, 01=relative)
    - name: DATA03_lo
      type: hex
      description: Adjustment value, low-order 8 bits
    - name: DATA03_hi
      type: hex
      description: Adjustment value, high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02_lo} {DATA02_hi} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Adjustment mode (00=absolute, 01=relative)
    - name: DATA02_lo
      type: hex
      description: Adjustment value, low-order 8 bits
    - name: DATA02_hi
      type: hex
      description: Adjustment value, high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Aspect value (see Appendix "Supplementary Information by Command" in source)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 96 FF {DATA03} {DATA04_lo} {DATA04_hi} {CKS}"
  params:
    - name: DATA03
      type: hex
      description: Adjustment mode (00=absolute, 01=relative)
    - name: DATA04_lo
      type: hex
      description: Adjustment value, low-order 8 bits
    - name: DATA04_hi
      type: hex
      description: Adjustment value, high-order 8 bits

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Lamp number (00=Lamp 1, 01=Lamp 2)
    - name: DATA02
      type: hex
      description: Content (01=usage time seconds, 04=remaining life percent)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Content (00=Total Carbon Savings, 01=Carbon Savings during operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Key code low byte (see Key code list in source)
    - name: DATA02
      type: hex
      description: Key code high byte (00h for all listed keys)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Lens target (06h=Periphery Focus; see source for full list)
    - name: DATA02
      type: hex
      description: Drive direction/duration (00=Stop, 01-03,7F=plus; 81,FD-FF=minus)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: Lens target identifier

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03_lo} {DATA03_hi} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "FFh=Stop; otherwise reference Adjustment mode/value"
    - name: DATA02
      type: hex
      description: Adjustment mode (00=absolute, 02=relative)
    - name: DATA03_lo
      type: hex
      description: Adjustment value, low-order 8 bits
    - name: DATA03_hi
      type: hex
      description: Adjustment value, high-order 8 bits

- id: lens_memory_control_move
  label: Lens Memory MOVE
  kind: action
  command: "02 1E 00 00 01 00 {CKS}"
  params: []

- id: lens_memory_control_store
  label: Lens Memory STORE
  kind: action
  command: "02 1E 00 00 01 01 {CKS}"
  params: []

- id: lens_memory_control_reset
  label: Lens Memory RESET
  kind: action
  command: "02 1E 00 00 01 02 {CKS}"
  params: []

- id: reference_lens_memory_control_move
  label: Reference Lens Memory MOVE
  kind: action
  command: "02 1F 00 00 01 00 {CKS}"
  params: []

- id: reference_lens_memory_control_store
  label: Reference Lens Memory STORE
  kind: action
  command: "02 1F 00 00 01 01 {CKS}"
  params: []

- id: reference_lens_memory_control_reset
  label: Reference Lens Memory RESET
  kind: action
  command: "02 1F 00 00 01 02 {CKS}"
  params: []

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Option (00=LOAD BY SIGNAL, 01=FORCED MUTE)"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Option (00=LOAD BY SIGNAL, 01=FORCED MUTE)"
    - name: DATA02
      type: hex
      description: "Setting value (00=OFF, 01=ON)"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Profile number (00=Profile 1, 01=Profile 2)"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Adjusted value name (00=Brightness, 01=Contrast, 02=Color, 03=Hue, 04=Sharpness, 05=Volume, 96=Lamp/Light)"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_control_on
  label: Freeze Control On
  kind: action
  command: "01 98 00 00 01 01 {CKS}"
  params: []

- id: freeze_control_off
  label: Freeze Control Off
  kind: action
  command: "01 98 00 00 01 02 {CKS}"
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Information type (03=Horizontal sync frequency, 04=Vertical sync frequency)"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Parameter (00=MODE, 01=START POSITION, 02=SUB INPUT/SUB INPUT 1, 09=SUB INPUT 2, 0Ah=SUB INPUT 3)"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Eco mode value (see Appendix in source)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01..16} 00 {CKS}"
  params:
    - name: DATA01_to_DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Parameter (00=MODE, 01=START POSITION, 02=SUB INPUT/SUB INPUT 1, 09=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: DATA02
      type: hex
      description: "Setting value (semantics depend on DATA01; see source)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Setting value (00=OFF, 01=ON)"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Input terminal (see Appendix in source)"
    - name: DATA02
      type: hex
      description: "Setting value (00=specified terminal, 01=BNC, 02=COMPUTER)"
```

## Feedbacks
```yaml
- id: error_status
  type: bytes
  description: Error status bitfield (12 bytes), returned by 009. ERROR STATUS REQUEST.

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_sleep, standby_error, standby_power_saving, network_standby, not_supported]
  description: Power / operation status returned by 078-2 RUNNING STATUS REQUEST (DATA03, DATA06) and 305-3 BASIC INFORMATION REQUEST (DATA01).

- id: picture_mute_state
  type: enum
  values: [off, on]
  description: Returned by 078-4 MUTE STATUS REQUEST (DATA01) and 305-3 BASIC INFORMATION REQUEST (DATA06).

- id: sound_mute_state
  type: enum
  values: [off, on]
  description: Returned by 078-4 MUTE STATUS REQUEST (DATA02) and 305-3 BASIC INFORMATION REQUEST (DATA07).

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  description: Returned by 078-4 MUTE STATUS REQUEST (DATA03) and 305-3 BASIC INFORMATION REQUEST (DATA08).

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  description: Returned by 078-4 MUTE STATUS REQUEST (DATA04).

- id: freeze_state
  type: enum
  values: [off, on]
  description: Returned by 305-3 BASIC INFORMATION REQUEST (DATA09).

- id: cover_state
  type: enum
  values: [normal_cover_open, cover_closed]
  description: Returned by 078-6 COVER STATUS REQUEST (DATA01).

- id: lens_state
  type: bitfield
  description: Per-motor lens status returned by 053-7 LENS INFORMATION REQUEST (Lens memory, Zoom, Focus, Lens Shift H/V).

- id: current_input
  type: object
  description: Current input (Selection signal type 1/2) returned by 078-3 INPUT STATUS REQUEST and 305-3 BASIC INFORMATION REQUEST.

- id: projector_name
  type: string
  description: Returned by 097-45 LAN PROJECTOR NAME REQUEST (up to 17 bytes NUL-terminated).

- id: model_name
  type: string
  description: Returned by 078-5 MODEL NAME REQUEST (up to 32 bytes NUL-terminated).

- id: serial_number
  type: string
  description: Returned by 305-2 SERIAL NUMBER REQUEST (up to 16 bytes NUL-terminated).

- id: mac_address
  type: string
  description: Returned by 097-155 LAN MAC ADDRESS STATUS REQUEST2 (6 bytes).

- id: lamp_usage_time_seconds
  type: integer
  description: Returned by 037-4 LAMP INFORMATION REQUEST 3 (DATA01=lamp number, DATA02=01h).

- id: lamp_remaining_life_percent
  type: integer
  description: Returned by 037-4 LAMP INFORMATION REQUEST 3 (DATA01=lamp number, DATA02=04h); negative if past replacement deadline.

- id: filter_usage_time_seconds
  type: integer
  description: Returned by 037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04).

- id: filter_alarm_start_time_seconds
  type: integer
  description: Returned by 037-3 FILTER USAGE INFORMATION REQUEST (DATA05-08); -1 if undefined.

- id: carbon_savings_kg
  type: integer
  description: Carbon savings value returned by 037-6 CARBON SAVINGS INFORMATION REQUEST.

- id: gain_parameter_range
  type: object
  description: Adjustment range, default, current, and step width returned by 060-1 GAIN PARAMETER REQUEST 3.

- id: eco_mode_value
  type: hex
  description: Eco/Lamp/Light mode value returned by 097-8 ECO MODE REQUEST.

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]
  description: PIP/PBP mode returned by 097-198 PIP/PICTURE BY PICTURE REQUEST.

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: Returned by 097-243-1 EDGE BLENDING MODE REQUEST.

- id: response_error
  type: object
  description: ERR1/ERR2 error code returned in response frame; see Error code list in source.
```

## Variables
```yaml
- id: lan_projector_name
  type: string
  description: Settable projector name (up to 16 bytes) via 098-45 LAN PROJECTOR NAME SET.

- id: aspect_ratio
  type: hex
  description: Settable via 030-12 ASPECT ADJUST (DATA01); specific values deferred to source Appendix.

- id: input_terminal
  type: hex
  description: Settable via 018 INPUT SW CHANGE (DATA01); specific values deferred to source Appendix.

- id: eco_mode
  type: hex
  description: Settable via 098-8 ECO MODE SET (DATA01); specific values deferred to source Appendix.

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]
  description: Settable via 098-198 PIP/PICTURE BY PICTURE SET (DATA01=00h, DATA02).

- id: pip_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: Settable via 098-198 PIP/PICTURE BY PICTURE SET (DATA01=01h).

- id: pip_sub_input
  type: hex
  description: Settable sub-input for PIP/PBP sub window via 098-198 PIP/PICTURE BY PICTURE SET.

- id: edge_blending
  type: enum
  values: [off, on]
  description: Settable via 098-243-1 EDGE BLENDING MODE SET (DATA01).

- id: audio_select
  type: object
  description: Input terminal + audio routing via 319-10 AUDIO SELECT SET.

- id: lens_load_by_signal
  type: enum
  values: [off, on]
  description: Lens memory option via 053-6 LENS MEMORY OPTION SET (DATA01=00h).

- id: lens_forced_mute
  type: enum
  values: [off, on]
  description: Lens memory option via 053-6 LENS MEMORY OPTION SET (DATA01=01h).

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: Selected reference lens memory profile via 053-10 LENS PROFILE SET.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited device-initiated notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - lens_memory_reset
  - reference_lens_memory_reset
interlocks: []
# Source states that during POWER ON or POWER OFF execution (including cooling) the projector accepts no other commands; treat as an implicit interlock.
```

## Notes
- All command and response frames use hexadecimal notation. The trailing CKS byte is the low-order 8 bits of the sum of all preceding bytes (excluding the CKS itself).
- The `ID1` byte is the projector's Control ID; `ID2` is the model code. Source defers per-model ID2 values to the Appendix "Supplementary Information by Command", which is not included in this excerpt.
- Input terminal codes, aspect ratio values, eco/lamp mode values, sub-input values for PIP/PBP, and base-model-type values are likewise deferred to the Appendix. Treat any reference to these in source-fragment examples as illustrative only.
- LAN framing on TCP port 7142 uses the same command/response structure as the RS-232C serial interface; the source does not document an authentication or session handshake for either transport.
- Source lists multiple supported baud rates (115200 / 38400 / 19200 / 9600 / 4800). Spec defaults to 9600 8N1 since it is the most commonly cited NEC default, but operators may switch to any supported rate listed above.
- Lens-control commands 053 / 053-2 are mutually coordinated: sending 7Fh or 81h starts continuous drive; sending 00h stops it.
- The "050. REMOTE KEY CODE" command allows arbitrary remote-control key emulation; treat it as a privileged operation.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:23:00.930Z
last_checked_at: 2026-09-15T22:17:05.841Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:17:05.841Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions map to 53 source commands (lens memory split into MOVE/STORE/RESET and freeze split into on/off); transport7142/96008N1 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-code (ID2) byte values for NP901W / NP905 not in source; the doc defers them to a separate appendix."
- "source does not document any unsolicited device-initiated notifications."
- "source does not document any multi-step macro sequences."
- "firmware version compatibility not stated in source."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
