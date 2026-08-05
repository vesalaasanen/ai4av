---
spec_id: admin/atlona-at-ome-ms42
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-OME-MS42 Control Spec"
manufacturer: Atlona
model_family: AT-OME-MS42
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-OME-MS42
  firmware: "\"1.1.4\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-OME-MS42_API.pdf
  - https://atlona.com/pdf/AT-OME-MS42-HDBT_API.pdf
  - https://atlona.com/pdf/AT-OME-MS52W_API.pdf
  - https://atlona.com/pdf/AT-OME-PS62_API.pdf
  - https://atlona.com/product/at-ome-ms42/
retrieved_at: 2026-05-04T18:55:08.142Z
last_checked_at: 2026-07-12T08:45:04.121Z
generated_at: 2026-07-12T08:45:04.121Z
firmware_coverage: "\"1.1.4\""
protocol_coverage: []
known_gaps:
  - "USB 2.0 vs 3.x data rate specifications not in source"
  - "ports 9001 (HDBaseT RS-232 passthrough) and 9002 (local RS-232) - not standalone control ports"
  - "source does not describe unsolicited event notifications"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "USB data rate (2.0 vs 3.x) not stated in source"
  - "HDBaseT version/revision not stated in source"
  - "Max cable lengths not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:45:04.121Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched literally against source commands; transport parameters (port 9000, 115200 baud, 8-bit/no-parity/1-stop) verified in source; one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Atlona AT-OME-MS42 Control Spec

## Summary
The AT-OME-MS42 is a 4x2 matrix switcher with USB-C, DisplayPort, and HDMI inputs supporting video, audio, and USB routing.  Control via TCP (ports 9000/9001/9002), Telnet (port 23), SSH, or RS-232.  Command set includes power control, input/output routing, audio muting, network configuration, and USB host routing.  500ms delay required between commands.  Commands terminated with CR (0x0d); feedback terminated with CR+LF (0x0a).

<!-- UNRESOLVED: USB 2.0 vs 3.x data rate specifications not in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9000  # MCU / TCP socket
  # UNRESOLVED: ports 9001 (HDBaseT RS-232 passthrough) and 9002 (local RS-232) - not standalone control ports
telnet_port: 23  # default Telnet port stated in source
serial:
  baud_rate: 115200  # default stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples in source:
powerable: true
routable: true
queryable: true
levelable: true  # VOUTMute, xY$ commands
```

## Actions
```yaml
# Power
- id: PWON
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: PWOFF
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: PWSTA
  label: Power Status
  kind: query
  command: "PWSTA"
  params: []

- id: Reboot
  label: Reboot
  kind: action
  command: "Reboot"
  params: []

# Routing
- id: xYAVxZ
  label: Switch Input to Output
  kind: action
  command: "x{input}AVx{output}"  # e.g. x3AVx1
  params:
    - name: input
      type: integer
      description: "Input number: 1=USB-C, 2=DisplayPort, 3=HDMI1, 4=HDMI2"
    - name: output
      type: integer
      description: "Output number: 1=HDMI, 2=HDBaseT (or output flag in matrix mode)"

- id: xY$
  label: Enable/Disable Video Output
  kind: action
  command: "x{output}$ {state}"  # e.g. x2$ of
  params:
    - name: output
      type: integer
      description: "Output: 1=HDMI, 2=HDBaseT"
    - name: state
      type: enum
      values: [on, of, sta]
      description: "on=enable, of=disable, sta=query"

- id: VOUTMute
  label: Mute/Unmute Output Volume
  kind: action
  command: "VOUTMute{output} {state}"  # e.g. VOUTMute2 of
  params:
    - name: output
      type: integer
      description: "Output: 1=HDMI, 2=HDBaseT"
    - name: state
      type: enum
      values: [on, off, sta]

# Audio
- id: LRAUD
  label: Enable/Disable Analog Audio Output
  kind: action
  command: "LRAUD {state}"  # e.g. LRAUD on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

# USB
- id: USBHostLogic
  label: Set USB Mode
  kind: action
  command: "USBHostLogic {mode}"  # e.g. USBHostLogic follow video
  params:
    - name: mode
      type: enum
      values: [follow usb, follow video, manual, sta]
      description: "follow usb, follow video, manual, sta"

- id: USBHostRoute
  label: Set USB Host Routing
  kind: action
  command: "USBHostRoute {port}"  # e.g. USBHostRoute C
  params:
    - name: port
      type: enum
      values: [C, 1, 2, 3, sta]
      description: "C=USB-C, 1=USB Host 1, 2=USB Host 2, 3=remote HDBaseT"

- id: UsbVbusControl
  label: Toggle USB Vbus
  kind: action
  command: "UsbVbusControl {state}"  # e.g. UsbVbusControl on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

# Network
- id: IPDHCP
  label: Enable/Disable DHCP
  kind: action
  command: "IPDHCP {state}"  # e.g. IPDHCP on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: IPStatic
  label: Set Static IP
  kind: action
  command: "IPStatic {X} {Y} {Z}"  # e.g. IPStatic 192.168.1.112 255.255.255.0 192.168.1.1
  params:
    - name: X
      type: string
      description: "IP address (dot-decimal)"
    - name: Y
      type: string
      description: "Subnet mask (dot-decimal)"
    - name: Z
      type: string
      description: "Gateway (dot-decimal)"

- id: IP802.1x
  label: Set 802.1x Security
  kind: action
  command: "IP802.1x {setting}"  # e.g. IP802.1x TTLS
  params:
    - name: setting
      type: enum
      values: [disable, PEAP, TTLS, TLS, sta]

# Panel lock
- id: Lock
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []

- id: Unlock
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []

# Display / emulation
- id: DispBtn
  label: Display Button
  kind: action
  command: "DispBtn {state}"  # e.g. DispBtn on
  params:
    - name: state
      type: enum
      values: [on, off, tog, sta]

- id: Blink
  label: Blink Power LED
  kind: action
  command: "Blink {state}"  # e.g. Blink on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

# HDMI +5V
- id: OutHdmi5vKeep
  label: HDMI Out +5V Keep
  kind: action
  command: "OutHdmi5vKeep {state}"  # e.g. OutHdmi5vKeep on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

# Factory reset
- id: Mreset
  label: Factory Reset
  kind: action
  command: "Mreset"
  params: []

# RS-232 passthrough (legacy)
- id: RS232zone
  label: RS-232 Zone Command
  kind: action
  command: "RS232zone[{command}]"  # e.g. RS232zone[test]
  params:
    - name: command
      type: string
      description: "Command string to send to HDBaseT RS-232 port (deprecated)"
  notes: Deprecated; use TCP socket on port 9001 instead

# Command repeat
- id: RepCmdTime
  label: Set Command Repeat Count
  kind: action
  command: "RepCmdTime {times}"  # e.g. RepCmdTime 3
  params:
    - name: times
      type: integer
      range: [2, 4, sta]

- id: RepeatCmd
  label: Enable/Disable Repeat Command
  kind: action
  command: "RepeatCmd {state}"  # e.g. RepeatCmd on
  params:
    - name: state
      type: enum
      values: [on, off, sta]

# Query-only (no args, no params needed in action struct)
- id: Status
  label: Routing Status
  kind: query
  command: "Status"
  params: []

- id: Type
  label: Model Type
  kind: query
  command: "Type"
  params: []

- id: Version
  label: Firmware Version
  kind: query
  command: "Version"
  params: []

- id: IPCFG
  label: IP Configuration
  kind: query
  command: "IPCFG"
  params: []

- id: InputStatus
  label: Input Status
  kind: query
  command: "InputStatus"
  params: []

# Help
- id: help
  label: Help
  kind: query
  command: "help {command}"  # e.g. help ; help Blink (command name optional)
  params:
    - name: command
      type: string
      required: false
      description: "Optional command name to get help on; omit to list all commands"
```

## Feedbacks
```yaml
# Acknowledgement strings
- id: command_failed
  type: enum
  values: [Command FAILED]
  description: "Returned when command is unrecognized or malformed"

- id: power_state
  type: enum
  values: [PWON, PWSTA display values]
  description: "PWSTA returns PWON when powered on; 0 or 1 for power state"

- id: input_status
  type: string
  description: "4-character binary string, e.g. 0100 - 1=source detected, 0=no source"

- id: routing_status
  type: string
  description: "Format x2AVx1,x2AVx2 - shows current input-to-output routing"

- id: model_name
  type: string
  description: "Type command returns AT-OME-MS42"

- id: firmware_version
  type: string
  description: "Version command returns version string (source example: 1.0.05)"

- id: ip_config
  type: string
  description: "IPCFG returns: IP Addr, Netmask, Gateway, Telnet Port"

- id: dhcp_state
  type: enum
  values: [on, off, sta]

- id: blink_state
  type: enum
  values: [on, off, sta]

- id: lock_state
  type: enum
  values: [locked, unlocked]

- id: audio_output_state
  type: enum
  values: [on, off, sta]

- id: vout_mute_state
  type: enum
  values: [on, off, sta]

- id: video_output_state
  type: enum
  values: [on, of, sta]

- id: usb_host_logic
  type: enum
  values: [follow usb, follow video, manual, sta]

- id: usb_host_route
  type: enum
  values: [C, 1, 2, 3, sta]

- id: usb_vbus_state
  type: enum
  values: [on, off, sta]

- id: hdmi_5v_keep_state
  type: enum
  values: [on, off, sta]

- id: 802.1x_state
  type: enum
  values: [disable, PEAP, TTLS, TLS, sta]

- id: repeat_cmd_state
  type: enum
  values: [on, off, sta]

- id: rep_cmd_time
  type: integer
  description: "Returns current repeat count setting"
```

## Variables
```yaml
# Settable parameters that are not discrete actions
- id: ip_address
  type: string
  description: Current IP address; set via IPStatic

- id: subnet_mask
  type: string
  description: Subnet mask; set via IPStatic

- id: gateway
  type: string
  description: Gateway address; set via IPStatic

- id: static_ip_config
  type: object
  description: IP address, subnet mask, and gateway set together via IPStatic command

- id: telnet_port
  type: integer
  description: Telnet port number (default 23); returned in IPCFG output

- id: repeat_count
  type: integer
  description: Number of times a command is repeated (2-4); set via RepCmdTime

- id: repeat_enabled
  type: boolean
  description: Whether RepCmdTime feature is enabled; set via RepeatCmd
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
# The device sends feedback only in response to commands, not autonomously
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: RS-232 pin assignments vary; DB9 pin 2/3 may be reversed on some devices
```

## Notes
- Commands are case-sensitive.
- 500ms minimum delay between consecutive commands.
- Command terminator: CR (0x0d); feedback terminator: CR+LF (0x0a).
- RS-232 passthrough via TCP port 9001 sends data bit-for-bit to connected display's RS-232 port. TCP socket must remain open to receive responses.
- Port 9000: MCU (similar to Telnet). Port 9001: HDBaseT RS-232 passthrough. Port 9002: Local RS-232.
- Telnet default port: 23. SSH also supported.
- RS-232 defaults: 115200, 8-bit, None, 1.
- RS232zone command is deprecated; TCP socket on port 9001 is the recommended passthrough method.
- Blink command: POWER LED flashes blue until Blink off or device reboot.
- xYAVxZ in matrix mode: outputs 1 and 2 can be specified as flags for simultaneous routing.
- help command: bare `help` lists all commands; `help {name}` returns help for a single command.
<!-- UNRESOLVED: USB data rate (2.0 vs 3.x) not stated in source -->
<!-- UNRESOLVED: HDBaseT version/revision not stated in source -->
<!-- UNRESOLVED: Max cable lengths not stated in source -->
````

Done. Added missing `help` action + verbatim `command:` payloads to all 29 actions. Marked query-type commands (`PWSTA`, `Status`, `Type`, `Version`, `IPCFG`, `InputStatus`, `help`) `kind: query`. Preserved all existing IDs/params/shapes.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-OME-MS42_API.pdf
  - https://atlona.com/pdf/AT-OME-MS42-HDBT_API.pdf
  - https://atlona.com/pdf/AT-OME-MS52W_API.pdf
  - https://atlona.com/pdf/AT-OME-PS62_API.pdf
  - https://atlona.com/product/at-ome-ms42/
retrieved_at: 2026-05-04T18:55:08.142Z
last_checked_at: 2026-07-12T08:45:04.121Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:45:04.121Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched literally against source commands; transport parameters (port 9000, 115200 baud, 8-bit/no-parity/1-stop) verified in source; one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB 2.0 vs 3.x data rate specifications not in source"
- "ports 9001 (HDBaseT RS-232 passthrough) and 9002 (local RS-232) - not standalone control ports"
- "source does not describe unsolicited event notifications"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "USB data rate (2.0 vs 3.x) not stated in source"
- "HDBaseT version/revision not stated in source"
- "Max cable lengths not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
