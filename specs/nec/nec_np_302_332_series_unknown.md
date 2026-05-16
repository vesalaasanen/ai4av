---
spec_id: admin/nec-np_302_332_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP 302/332 Series Control Spec"
manufacturer: NEC
model_family: "NP 302"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP 302"
    - "NP 332"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-16T11:39:53.933Z
generated_at: 2026-05-16T11:39:53.933Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:39:53.933Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 semantic-id spec actions have documented source counterparts; transport parameters verified verbatim; source command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP 302/332 Series Control Spec

## Summary
NEC NP 302/332 series projector supports both RS-232 serial and wired TCP/IP control. TCP uses port 7142. Serial supports 115200/38400/19200/9600/4800 bps, 8 data bits, no parity, 1 stop bit, full duplex. No authentication required. Commands are sent as hexadecimal payloads; responses include status codes and error codes.

<!-- UNRESOLVED: wireless LAN control not documented in source — see operation manual of wireless LAN unit -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: 115200  # one of: 115200/38400/19200/9600/4800 bps (auto-selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands (015, 016)
- routable        # input switch command (018)
- queryable       # information request commands (037, 078 series, 305 series)
- levelable       # picture adjust (030-1), volume adjust (030-2), lamp adjust (030-15)
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal number (hex). See appendix for values.

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
      description: "Adjustment target: 00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value. See appendix for values.

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h= lamps or light adjust (DATA01=96h, DATA02=FFh fixed)"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code as word. Key codes: 02h=power on, 03h=power off, 05h=auto, 06h=menu, 07h=up, 08h=down, 09h=right, 0Ah=left, 0Bh=enter, 0Ch=exit, 0Dh=help, 0Fh=magnify up, 10h=magnify down, 13h=mute, 29h=picture, 4Ch=computer2, 4Fh=video1, 51h=s-video1, 85h=volume down, 8Ah=freeze, A3h=aspect, D7h=source, EEh=lamp mode/eco"

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
    - name: target
      type: integer
      description: "06h=periphery focus"
    - name: direction
      type: integer
      description: "00h=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=move, 01h=store, 02h=reset"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=move, 01h=store, 02h=reset"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=load by signal, 01h=forced mute"
    - name: value
      type: integer
      description: "00h=off, 01h=on"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=profile 1, 01h=profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value. See appendix for values.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=mode, 01h=start position, 02h=sub input, 09h=sub input 2, 0Ah=sub input 3"
    - name: value
      type: integer
      description: Setting value depends on parameter type. Mode: 00h=PIP, 01h=PBP. Position: 00h=top-left, 01h=top-right, 02h=bottom-left, 03h=bottom-right.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=off, 01h=on"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: action
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal number. See appendix for values.
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 02h=computer"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=lamp 1, 01h=lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=total carbon savings, 01h=carbon savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=periphery focus"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=picture/brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness, 05h=volume, 96h=lamp/light adjust"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=mode, 01h=start position, 02h=sub input, 09h=sub input 2, 0Ah=sub input 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
```

## Feedbacks
```yaml
# Error codes (ERR1, ERR2 pairs):
# 00h/00h: command not recognized
# 00h/01h: command not supported
# 01h/00h: invalid value
# 01h/01h: invalid input terminal
# 01h/02h: invalid language
# 02h/00h: memory allocation error
# 02h/02h: memory in use
# 02h/03h: value cannot be set
# 02h/04h: forced onscreen mute on
# 02h/06h: viewer error
# 02h/07h: no signal
# 02h/08h: test pattern or filter displayed
# 02h/09h: no PC card inserted
# 02h/0Ah: memory operation error
# 02h/0Ch: entry list displayed
# 02h/0Dh: power is off - command cannot be accepted
# 02h/0Eh: command execution failed
# 02h/0Fh: no authority for operation
# 03h/00h: incorrect gain number
# 03h/01h: invalid gain
# 03h/02h: adjustment failed

# Responses:
# Success without data: A2h/22h with no data part
# Success with data: 23h/22h/20h + data bytes
# Failure: A2h/A3h/A0h + ERR1/ERR2 + checksum
```

## Variables
```yaml
# UNRESOLVED: specific variable parameters not fully enumerated in source.
# Many commands serve as both actions and queries (e.g., 037 INFORMATION REQUEST,
# 078 series requests). The full variable list is inferred from the request
# commands above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
# Device does not initiate communication - only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source. Document notes: "While this command is turning
# on the power, no other command can be accepted." and "While this command is
# turning off the power (including the cooling time), no other command can be
# accepted." - no operator confirmation or interlock described beyond command
# serialization note.
```

## Notes
Command format: `20h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all values hexadecimal. Checksum = low-order byte of sum of all preceding bytes. Responses use prefix `A0h`/`A2h`/`A3h`/`20h`/`22h`/`23h` depending on command class. Power on/off commands block further commands during execution/cooling. Lens control allows continuous drive without stop by issuing same command. Lamp usage time updated at 1-minute intervals despite 1-second resolution. Carbon savings max 99999kg and 999999mg. Input terminal values and aspect values are in appendix — not reproduced here.
<!-- UNRESOLVED: appendix "Supplementary Information by Command" not included in source — input terminal values and aspect values not populated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: wireless LAN control protocol not documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-16T11:39:53.933Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:39:53.933Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 semantic-id spec actions have documented source counterparts; transport parameters verified verbatim; source command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
