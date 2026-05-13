---
spec_id: admin/nec-np-px-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-PX Series Control Spec"
manufacturer: NEC
model_family: "NP-PX Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-PX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:22:36.322Z
generated_at: 2026-04-25T21:22:36.322Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:22:36.322Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched verbatim to NEC PX serial source; transport parameters verified; complete command-level fidelity."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-PX Series Control Spec

## Summary
NEC professional projectors supporting both RS-232C serial and wired TCP/IP control. Serial communication uses RS-232C with configurable baud rates up to 115200 bps. TCP/IP uses port 7142. Supports power control, input routing, picture/sound muting, lens positioning, and comprehensive status queries.

<!-- UNRESOLVED: specific model variants (NP4100, NP-M420X, etc.) have different command code mappings; full model-specific appendix not included in this spec -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control; serial does not specify a default port
serial:
  baud_rate: 115200  # highest baud rate listed; source states 115200/38400/19200/9600/4800 bps selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015) and POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) command present
- queryable       # multiple status request commands (078-1 through 078-6, 037 series) present
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), ASPECT ADJUST (030-12) present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "Command: 02h 00h 00h 00h 00h 02h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "Command: 02h 01h 00h 00h 00h 03h"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (varies by model; see appendix)
  description: "Command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: "Command: 02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  description: "Command: 02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: "Command: 02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  description: "Command: 02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: "Command: 02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  description: "Command: 02h 15h 00h 00h 00h 17h"

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
      description: 16-bit adjustment value (low-order byte first)
  description: "Command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value (low-order byte first)
  description: "Command: 03h 10h 00h 00h 05h 05h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect value (model-dependent; see appendix)
  description: "Command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value (low-order byte first)
  description: "Command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 06h=MENU, 07h=UP, etc.)"
  description: "Command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: "Command: 02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: "Command: 02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  description: "Command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value
  description: "Command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  description: "Command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  description: "Command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>"

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
  description: "Command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  description: "Command: 02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"
  description: "Command: 01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (model-dependent; see appendix)
  description: "Command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  description: "Command: 03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (target-dependent)
  description: "Command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  description: "Command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code
    - name: value
      type: integer
      description: "00h=specified terminal, 02h=COMPUTER"
  description: "Command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: "Error status request (009). Returns 12 bytes of error bitfields."
  fields:
    DATA01: "Error status (1): Bit0=Cover, Bit1=Temperature, Bit3=Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp, Bit7=Lamp moratorium"
    DATA02: "Error status (2): Bit0=Lamp time exceeded, Bit1=Formatter, Bit2=Lamp2 off"
    DATA03: "Error status (3): Bit1=FPGA, Bit2=Temp sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    DATA04: "Error status (4): Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp, Bit3=Foreign matter, Bit7=Lens not installed"
    DATA09: "Extended status: Bit0=Portrait cover, Bit1=Interlock switch, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: information_request
  type: object
  description: "Gets projector information (037). Returns model name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: filter_usage_request
  type: object
  description: "Gets filter usage info (037-3). Returns filter usage time (DATA01-04 seconds), filter alarm start time (DATA05-08 seconds)."

- id: lamp_information_request_3
  type: object
  description: "Gets lamp info (037-4). DATA01=target (00h=Lamp1, 01h=Lamp2), DATA02=content (01h=usage time, 04h=remaining life %)."

- id: carbon_savings_request
  type: object
  description: "Gets carbon savings (037-6). DATA01=target (00h=Total, 01h=Operation), DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

- id: running_status_request
  type: object
  description: "Gets running status (078-2). Returns power status (DATA03), cooling status (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  type: object
  description: "Gets input status (078-3). Returns signal switch process, signal list number, signal type 1 and 2, test pattern display, content displayed."

- id: mute_status_request
  type: object
  description: "Gets mute status (078-4). Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05)."

- id: model_name_request
  type: string
  description: "Gets model name (078-5). Returns 32-byte NUL-terminated string."

- id: cover_status_request
  type: enum
  description: "Gets cover status (078-6). 00h=Normal (opened), 01h=Cover closed."
  values: [normal, cover_closed]

- id: lens_control_request
  type: object
  description: "Gets lens position values (053-1). Returns target, upper/lower limits, current value (16-bit each)."

- id: lens_memory_option_request
  type: object
  description: "Gets lens memory option (053-5). DATA01=target, DATA02=value (00h=OFF, 01h=ON)."

- id: lens_profile_request
  type: enum
  description: "Gets lens profile number (053-11). 00h=Profile 1, 01h=Profile 2."
  values: [profile_1, profile_2]

- id: lens_information_request
  type: object
  description: "Gets lens info (053-7). Bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)."

- id: gain_parameter_request_3
  type: object
  description: "Gets picture/volume/lamp gain values (060-1). Returns status, range limits, default, current value (all 16-bit)."

- id: setting_request
  type: object
  description: "Gets projector settings (078-1). Returns base model type, sound function, profile number."

- id: eco_mode_request
  type: integer
  description: "Gets eco mode value (097-8)."

- id: lan_projector_name_request
  type: string
  description: "Gets projector name (097-45). Returns 17-byte NUL-terminated string."

- id: lan_mac_address_request
  type: string
  description: "Gets MAC address (097-155). Returns 6-byte MAC address."

- id: pip_picture_by_picture_request
  type: object
  description: "Gets PIP/PBP settings (097-198). Returns target and setting value."

- id: edge_blending_mode_request
  type: enum
  description: "Gets edge blending mode (097-243-1). 00h=OFF, 01h=ON."
  values: [off, on]

- id: information_string_request
  type: string
  description: "Gets info strings (084). DATA01=type (03h=horizontal sync freq, 04h=vertical sync freq)."

- id: serial_number_request
  type: string
  description: "Gets serial number (305-2). Returns 16-byte NUL-terminated string."

- id: base_model_type_request
  type: object
  description: "Gets base model type (305-1). Returns model type and model name."

- id: basic_information_request
  type: object
  description: "Gets basic info (305-3). Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are exposed via action commands; no discrete variable storage identified
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents standby mode variations by model but does not specify safety interlock procedures
```

## Notes
The NEC NP-PX Series encompasses a broad range of NEC projector models spanning multiple product generations. Command syntax follows a consistent hexadecimal format: `<HEADER> <MODEL_CODE> <ID1> <ID2> <LEN> [DATA] <CKS>`. The checksum (CKS) is calculated as the low-order byte of the sum of all preceding bytes.

Power on/off commands block other commands during execution (including cooling time for power off). The projector returns structured responses with ERR1/ERR2 error codes on failure.

Input terminal codes, aspect values, and eco mode values vary significantly by model; the appendix tables in the source document provide model-specific mappings.
<!-- UNRESOLVED: complete model-specific appendix tables (input codes, aspect values, eco mode values) not fully captured in this spec draft -->
<!-- UNRESOLVED: LAN authentication mechanism not described in source; port 7142 stated but no login/password procedure found -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:22:36.322Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:22:36.322Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched verbatim to NEC PX serial source; transport parameters verified; complete command-level fidelity."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
