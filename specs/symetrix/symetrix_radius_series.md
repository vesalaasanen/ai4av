---
spec_id: admin/symetrix-radius
schema_version: ai4av-public-spec-v1
revision: 1
title: "Symetrix Radius Series Control Spec"
manufacturer: Symetrix
model_family: "Symetrix Radius"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Symetrix Radius"
    - "Symetrix Edge"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - https://aca.im/driver_docs/Symetrix/SymNet_Composer_control_prot_2.0.pdf
retrieved_at: 2026-05-07T07:59:05.079Z
last_checked_at: 2026-05-08T15:46:56.395Z
generated_at: 2026-05-08T15:46:56.395Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-485 control requires Symetrix ARC units; not fully documented in this source"
  - "no explicit multi-step macros documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "controller number mapping to specific DSP parameters requires SymNet Composer configuration"
  - "Site Identifier configuration requires SymNet Composer; default rebroadcast behavior noted but not command-based"
  - "RS-485 control not detailed (requires ARC units)"
verification:
  verdict: verified
  checked_at: 2026-05-08T15:46:56.395Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions have literal source counterparts with matching wire tokens, parameters, and ranges. Transport (port 48631, 57600 baud, TCP/UDP/serial) verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Symetrix Radius Series Control Spec

## Summary
DSP matrix processor controllable via RS-232, TCP/IP, and UDP. Text-based ASCII command protocol with controller numbers (1-10000) and preset recall (1-1000). Supports fader automation, push data, and unsolicited notifications over Ethernet.

<!-- UNRESOLVED: RS-485 control requires Symetrix ARC units; not fully documented in this source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 48631
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: reboot command (R!) present
- queryable  # inferred: GS, GPR, GS2 commands returning state
- levelable  # inferred: fader control commands (CS, CC)
```

## Actions
```yaml
- id: controller_set
  label: Controller Set
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Controller number (1-10000)
    - name: position
      type: integer
      description: Controller position (0-65535)

- id: change_controller
  label: Change Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Controller number (1-10000)
    - name: direction
      type: integer
      description: 0=decrement, 1=increment
    - name: amount
      type: integer
      description: Amount to change (0-65535)

- id: get_controller
  label: Get Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Controller number (1-10000)

- id: get_controller_with_number
  label: Get Controller with Number
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Controller number (1-10000)

- id: get_preset
  label: Get Preset
  kind: action
  params: []

- id: get_controller_block
  label: Get Controller Block
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of controllers (max 256)

- id: get_controller_block_with_number
  label: Get Controller Block with Number
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of controllers (max 256)

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-1000)

- id: flash_unit_leds
  label: Flash Unit LEDs
  kind: action
  params:
    - name: cycles
      type: integer
      description: Number of flash cycles (default 8, 0 halts)

- id: set_system_string
  label: Set System String
  kind: action
  params:
    - name: unit
      type: integer
      description: Unit enumerator
    - name: resource
      type: integer
      description: Resource number (1000=speed dial number, 1001=name, 1004=digits)
    - name: enum
      type: integer
      description: Enum index (0-19)
    - name: card
      type: integer
      description: Card slot (0-3 for A-D)
    - name: channel
      type: integer
      description: Channel index
    - name: value
      type: string
      description: String value to set

- id: get_system_string
  label: Get System String
  kind: action
  params:
    - name: unit
      type: integer
      description: Unit enumerator
    - name: resource
      type: integer
      description: Resource number
    - name: enum
      type: integer
      description: Enum index
    - name: card
      type: integer
      description: Card slot (0-3)
    - name: channel
      type: integer
      description: Channel index

- id: push_enable_disable
  label: Global Push Enable/Disable
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_enable
  label: Push Enable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_disable
  label: Push Disable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: get_push_enabled
  label: Get Push-enabled Controllers
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_refresh
  label: Push Refresh
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_clear
  label: Push Clear
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: set_push_interval
  label: Set Push Interval
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Interval in ms (20-30000, default 100)

- id: set_push_threshold
  label: Set Push Threshold
  kind: action
  params:
    - name: parameter_thresh
      type: integer
      description: Threshold for non-meter parameters (0-65535)
    - name: meter_thresh
      type: integer
      description: Threshold for meters (0-65535)

- id: set_baud
  label: Set Baud
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate (1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200)

- id: set_quiet_mode
  label: Set Quiet Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_echo_mode
  label: Set Echo Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: no_operation
  label: No Operation
  kind: action
  params: []

- id: quit_tcp_session
  label: Quit TCP Session
  kind: action
  params: []

- id: get_ip_address
  label: Get IP Address
  kind: action
  params: []

- id: get_version
  label: Get Version
  kind: action
  params: []

- id: reboot
  label: Reboot
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: Acknowledgement
  type: string
  values:
    - ACK
    - NAK
  description: Command acceptance response

- id: controller_position
  label: Controller Position
  type: integer
  values: [0-65535]
  description: Response to GS command

- id: controller_with_position
  label: Controller with Position
  type: string
  description: Response to GS2 - format "<NUMBER> <POSITION>"

- id: controller_block
  label: Controller Block
  type: string
  description: Response to GSB - multiple lines of 5-digit positions

- id: preset_number
  label: Preset Number
  type: string
  description: Response to GPR - 4-digit preset number (0000-1000)

- id: ip_address
  label: IP Address
  type: string
  description: Response to RI - e.g. "192.168.100.150"

- id: firmware_version
  label: Firmware Version
  type: string
  description: Response to V command (verbose mode)
```

## Variables
```yaml
# Fader position formula (16-bit, 0-65535):
# Volume dB = MIN + (MAX - MIN) * (POSITION / 65535)
# For standard faders: MIN=-72, MAX=+12 dB

# Meter level formula:
# Level dBu = 72 * (POSITION / 65535) - 48
# Range: -48 dBu to +24 dBu (0 dBFS)

# LED state:
# 65535 = ON, 0 = OFF
```

## Events
```yaml
# Push data format (unsolicited):
# #<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>
# Example:
# #00007=12321<CR>
# Up to 64 strings may be sent together.

# Push interval: default 100ms, configurable via PUI (20-30000ms)
# Push threshold: amount of change required before push (default 1)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # R! command reboots the unit
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Commands terminated by `<CR>` (ASCII 13). Command format: `<COMMAND> <PARAM1> <PARAM2> ...<CR>`. TCP/IP supports up to 4 simultaneous sessions; 5th connection closes least-recently-used. UDP responses sent to last-received IP and port (saved non-volatile). RS-232 and Ethernet maintain independent quiet/echo mode settings. Push data broadcasts on both RS-232 and Ethernet simultaneously.
<!-- UNRESOLVED: controller number mapping to specific DSP parameters requires SymNet Composer configuration -->
<!-- UNRESOLVED: Site Identifier configuration requires SymNet Composer; default rebroadcast behavior noted but not command-based -->
<!-- UNRESOLVED: RS-485 control not detailed (requires ARC units) -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - https://aca.im/driver_docs/Symetrix/SymNet_Composer_control_prot_2.0.pdf
retrieved_at: 2026-05-07T07:59:05.079Z
last_checked_at: 2026-05-08T15:46:56.395Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:46:56.395Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions have literal source counterparts with matching wire tokens, parameters, and ranges. Transport (port 48631, 57600 baud, TCP/UDP/serial) verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-485 control requires Symetrix ARC units; not fully documented in this source"
- "no explicit multi-step macros documented in source"
- "no safety warnings or interlock procedures stated in source"
- "controller number mapping to specific DSP parameters requires SymNet Composer configuration"
- "Site Identifier configuration requires SymNet Composer; default rebroadcast behavior noted but not command-based"
- "RS-485 control not detailed (requires ARC units)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
