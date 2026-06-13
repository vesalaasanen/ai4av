---
spec_id: admin/symetrix-prism-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Symetrix Prism Series Control Spec"
manufacturer: Symetrix
model_family: "Prism Series"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Prism Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - symetrixinc.com
  - d3b79pswu7f4ma.cloudfront.net
  - manuals.plus
source_urls:
  - https://usermanual.wiki/Document/SymNetComposercp.1610368993.pdf
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://d3b79pswu7f4ma.cloudfront.net/pdf-download/Jupiter-Control-Protocol.pdf
  - https://manuals.plus/symetrix/prism-8x8-programmable-digital-signal-processor-manual.pdf
  - https://manuals.plus/m/7892b80f0f9db39d2bd22283ff673072d1be514180c65f0d403de81d6549808e_optim.pdf
retrieved_at: 2026-06-12T00:06:56.335Z
last_checked_at: 2026-06-12T20:01:01.754Z
generated_at: 2026-06-12T20:01:01.754Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Prism-specific firmware version, model subvariants, and any Prism-only command extensions not documented in the generic Composer v2.0 protocol."
  - "no explicit multi-step macro sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing procedures"
  - "Prism-specific model variants (e.g. Prism 4x4, Prism 8x8), firmware compatibility ranges, voltage/current/power specs, and any Prism-only command extensions."
verification:
  verdict: verified
  checked_at: 2026-06-12T20:01:01.754Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match their literal wire-level counterparts in the source; transport values (port 48631, baud 57600, 8N1, no flow control) all confirmed; source catalogue is fully represented by the spec. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Symetrix Prism Series Control Spec

## Summary
SymNet Composer v2.0 control protocol for Symetrix Prism Series DSPs (and other Composer-based units: Edge, Radius, Radius AEC, xControl). Provides ASCII text command/response control over RS-232, TCP/IP, and UDP/IP. Commands reference user-assigned controller numbers defined in SymNet Composer software.

<!-- UNRESOLVED: Prism-specific firmware version, model subvariants, and any Prism-only command extensions not documented in the generic Composer v2.0 protocol. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
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
- powerable  # inferred: unit supports reboot via R! command; not a literal power on/off command in source
- routable   # inferred: input/output selector controllers documented
- queryable  # inferred: GS, GSB, GPR, GSYSS, RI, V query commands present
- levelable  # inferred: fader/volume controller commands documented
```

## Actions
```yaml
# CRITICAL: each named opcode in the source = one action. Parameter ranges
# (e.g. CS controller position 0-65535) do not multiply into separate actions.

- id: controller_set
  label: Controller Set (CS)
  kind: action
  command: "CS {controller_number} {controller_position}"
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000) assigned in SymNet Composer
    - name: controller_position
      type: integer
      description: 16-bit value (0-65535)

- id: controller_change
  label: Change Controller (CC)
  kind: action
  command: "CC {controller_number} {dec_inc} {amount}"
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: dec_inc
      type: integer
      description: 0 = decrement, 1 = increment
    - name: amount
      type: integer
      description: Increment/decrement amount (0-65535)

- id: get_controller
  label: Get Controller (GS)
  kind: query
  command: "GS {controller_number}"
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: get_controller_with_number
  label: Get Controller with Controller Number (GS2)
  kind: query
  command: "GS2 {controller_number}"
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: get_preset
  label: Get Preset (GPR)
  kind: query
  command: "GPR"

- id: get_controller_block
  label: Get Controller Block (GSB)
  kind: query
  command: "GSB {controller_number} {block_size}"
  params:
    - name: controller_number
      type: integer
      description: Starting decimal controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)

- id: get_controller_block_with_number
  label: Get Controller Block with Controller Number (GSB2)
  kind: query
  command: "GSB2 {controller_number} {block_size}"
  params:
    - name: controller_number
      type: integer
      description: Starting decimal controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)

- id: get_controller_block_with_number_echo
  label: Get Controller Block with Controller Number, Echo (GSB3)
  kind: query
  command: "GSB3 {controller_number} {block_size}"
  params:
    - name: controller_number
      type: integer
      description: Starting decimal controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)

- id: load_preset
  label: Load Preset (LP)
  kind: action
  command: "LP {preset_number}"
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-1000)

- id: flash_unit_leds
  label: Flash Unit LEDs (FU)
  kind: action
  command: "FU [{cycles}]"
  params:
    - name: cycles
      type: integer
      description: Number of on/off cycles; 0 halts flashing; default 8

- id: set_system_string
  label: Set System String (SSYSS)
  kind: action
  command: "SSYSS {unit}.{resource}.{enum}.{card}.{channel}={value}"
  params:
    - name: unit
      type: integer
      description: Unit enumerator (e.g. 1 for unit labeled Edge-1)
    - name: resource
      type: integer
      description: Resource number (1000=speed dial number, 1001=speed dial name, 1004=telephone digits for direct dial)
    - name: enum
      type: integer
      description: Zero-based enum (0-19 for speed dials 1-20)
    - name: card
      type: integer
      description: Card slot (0-3 for A-D)
    - name: channel
      type: integer
      description: Zero-based channel (0 where not applicable)
    - name: value
      type: string
      description: String value to set

- id: get_system_string
  label: Get System String (GSYSS)
  kind: query
  command: "GSYSS {unit}.{resource}.{enum}.{card}.{channel}"
  params:
    - name: unit
      type: integer
      description: Unit enumerator
    - name: resource
      type: integer
      description: Resource number (1000-1006)
    - name: enum
      type: integer
      description: Zero-based enum (0-19 for speed dials)
    - name: card
      type: integer
      description: Card slot (0-3 for A-D)
    - name: channel
      type: integer
      description: Zero-based channel

- id: push_global_enable_disable
  label: Global Push Enable/Disable (PU)
  kind: action
  command: "PU {on_off} [{low} [{high}]]"
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: push_enable
  label: Push Enable (PUE)
  kind: action
  command: "PUE [{low} [{high}]]"
  params:
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: push_disable
  label: Push Disable (PUD)
  kind: action
  command: "PUD [{low} [{high}]]"
  params:
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: get_push_enabled_controllers
  label: Get Push-enabled Controllers (GPU)
  kind: query
  command: "GPU [{low} [{high}]]"
  params:
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: push_refresh
  label: Push Refresh (PUR)
  kind: action
  command: "PUR [{low} [{high}]]"
  params:
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: push_clear
  label: Push Clear (PUC)
  kind: action
  command: "PUC [{low} [{high}]]"
  params:
    - name: low
      type: integer
      description: Optional lowest controller number (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number (1-10000)

- id: set_push_interval
  label: Set Push Interval (PUI)
  kind: action
  command: "PUI {milliseconds}"
  params:
    - name: milliseconds
      type: integer
      description: Push interval in ms (20-30000)

- id: set_push_threshold
  label: Set Push Threshold (PUT)
  kind: action
  command: "PUT [{parameter_thresh} [{meter_thresh}]]"
  params:
    - name: parameter_thresh
      type: integer
      description: Optional parameter threshold (0-65535)
    - name: meter_thresh
      type: integer
      description: Optional meter threshold (0-65535)

- id: set_baud
  label: Set Baud (SB)
  kind: action
  command: "SB {baud}"
  params:
    - name: baud
      type: integer
      description: Baud rate; one of 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200

- id: set_quiet_mode
  label: Set Quiet Mode (SQ)
  kind: action
  command: "SQ {on_off}"
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON

- id: set_echo_mode
  label: Set Echo Mode (EH)
  kind: action
  command: "EH {on_off}"
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON

- id: nop
  label: NOP (No Operation)
  kind: action
  command: "NOP"

- id: quit_tcp_session
  label: Quit TCP/IP Session (Q!)
  kind: action
  command: "Q!"

- id: get_ip_address
  label: Get IP Address (RI)
  kind: query
  command: "RI"

- id: get_version
  label: Get Version (V)
  kind: query
  command: "V"

- id: reboot
  label: Reboot Device (R!)
  kind: action
  command: "R!"

- id: prefix_echo
  label: Echo Mode Prefix ($e)
  kind: action
  command: "$e {command}"
  params:
    - name: command
      type: string
      description: Command to execute with one-time echo

- id: prefix_verbose
  label: Verbose Mode Prefix ($v)
  kind: action
  command: "$v {command}"
  params:
    - name: command
      type: string
      description: Command to execute with one-time verbose response

- id: prefix_quiet
  label: Quiet Mode Prefix ($q)
  kind: action
  command: "$q {command}"
  params:
    - name: command
      type: string
      description: Command to execute with one-time quiet response
```

## Feedbacks
```yaml
- id: ack
  label: ACK
  type: string
  values: ["ACK"]

- id: nak
  label: NAK
  type: string
  values: ["NAK"]
  description: Returned when command is interpreted but fails for any reason (e.g. controller number does not exist, invalid block size, Q! sent on non-TCP connection)

- id: pushed_data
  label: Pushed Controller Data
  type: string
  description: Format "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>"; 5-digit zero-padded number and position; up to 64 strings per push batch

- id: push_settings
  label: Push Settings (GPU 0)
  type: string
  description: Global=0/1 then five 5-digit values: global lower limit, global upper limit, parameter threshold, meter threshold, push interval in ms
```

## Variables
```yaml
# Per-controller 16-bit values (0-65535) interpreted according to the parameter
# type assigned in SymNet Composer (fader, button, input/output selector, meter,
# LED, ratio, frequency, width/Q, attack/release/hold, pan, delay, gain,
# threshold, depth, etc.). The mapping is site-specific.
- id: controller_value
  label: Controller Position
  type: integer
  range: 0-65535
  description: Universal 16-bit value; interpretation depends on the controller's assigned parameter type in SymNet Composer
```

## Events
```yaml
- id: pushed_change
  label: Pushed Parameter Change
  description: Unsolicited GSB2-format data sent out RS-232 and Ethernet (UDP+TCP) when a push-enabled controller's underlying parameter changes. Default push interval 100ms. Up to 64 strings per interval.
- id: pushed_system_string
  label: Pushed System String
  description: Unsolicited system string pushes (speed dial name/number changes, etc.) enabled via Tools->Site Preferences "Enable System String Pushing". Sent out RS-232 and Ethernet.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing procedures
# documented in the source. Source notes the rear panel reset button erases
# accessory port settings and "should only be used as a last resort since it
# also resets many other settings" but does not document a formal safety
# procedure.
```

## Notes
- Protocol is text/ASCII; commands terminated with carriage return (<CR>, ASCII 13). Commands may optionally include a zero-termination character on input but not on output.
- Same command syntax works identically over RS-232, TCP/IP, and UDP/IP — the Ethernet protocol is the RS-232 command protocol carried over an Ethernet network.
- TCP/IP control uses no Telnet options or escape sequences. Up to 4 concurrent TCP telnet sessions; a 5th connection evicts the least recently used session.
- UDP responses go to the last received IP:port (saved in non-volatile memory across power cycles). TCP must re-initiate after power cycle.
- RS-232 default: 57600 baud, 8 data bits, 1 stop bit, no parity, no flow control. Echo OFF, Quiet Mode ON at startup. SB/SQ/EH commands modify these at runtime; settings persist across power cycles but are overridden by the next pushed Site File.
- Push is globally enabled at power-on; individual controllers must also be enabled via PUE (or have "Enable Push" set in SymNet Composer). Baud 115200 recommended if pushing a large volume of data.
- Controller numbers 1-10000, assigned per-site in SymNet Composer. A value of 0 generally means "minimum" and 65535 means "maximum" for the assigned parameter type; 16-bit resolution is quantized to parameter granularity on read-back.
- Fader formula: Volume dB = -72 + 84 * (controller_position/65535); OFF when position=0. Generic: MIN + (MAX-MIN) * (position/65535).
- The "Firmware Version" example in the V command section shows Prism/Edge/Radius-class firmware (Dante, ARC-Web, RS-232 firmware V1.55, etc.); version example is illustrative, not authoritative for any specific unit.
- This spec is derived from the SymNet Composer v2.0 control protocol document which is shared by Edge, Radius, Radius AEC, xControl, and other Composer-based units (including Prism per vendor FAQ). Prism-specific command extensions or limitations are not documented in the source.

<!-- UNRESOLVED: Prism-specific model variants (e.g. Prism 4x4, Prism 8x8), firmware compatibility ranges, voltage/current/power specs, and any Prism-only command extensions. -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - symetrixinc.com
  - d3b79pswu7f4ma.cloudfront.net
  - manuals.plus
source_urls:
  - https://usermanual.wiki/Document/SymNetComposercp.1610368993.pdf
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://d3b79pswu7f4ma.cloudfront.net/pdf-download/Jupiter-Control-Protocol.pdf
  - https://manuals.plus/symetrix/prism-8x8-programmable-digital-signal-processor-manual.pdf
  - https://manuals.plus/m/7892b80f0f9db39d2bd22283ff673072d1be514180c65f0d403de81d6549808e_optim.pdf
retrieved_at: 2026-06-12T00:06:56.335Z
last_checked_at: 2026-06-12T20:01:01.754Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:01:01.754Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match their literal wire-level counterparts in the source; transport values (port 48631, baud 57600, 8N1, no flow control) all confirmed; source catalogue is fully represented by the spec. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Prism-specific firmware version, model subvariants, and any Prism-only command extensions not documented in the generic Composer v2.0 protocol."
- "no explicit multi-step macro sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing procedures"
- "Prism-specific model variants (e.g. Prism 4x4, Prism 8x8), firmware compatibility ranges, voltage/current/power specs, and any Prism-only command extensions."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
