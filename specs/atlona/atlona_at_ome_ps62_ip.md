---
spec_id: admin/atlona-at-ome-ps62
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-OME-PS62 Control Spec"
manufacturer: Atlona
model_family: AT-OME-PS62
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-OME-PS62
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T08:46:02.227Z
last_checked_at: 2026-06-02T08:46:02.227Z
generated_at: 2026-06-02T08:46:02.227Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not found in source"
  - "flow control not stated in source"
  - "device does not appear to send unsolicited notifications based on source document."
  - "no explicit multi-step macros described in source."
  - "no safety warnings or interlock procedures in source."
  - "RS-232 flow control (RTS/CTS, XON/XOFF) not stated in source"
  - "firmware version compatibility range not stated in source"
  - "power on/off commands not present in source document"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:46:02.227Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions (27 Actions, 0 Feedbacks with query_command) match source commands verbatim; transport port 9000 and baud 115200 confirmed; source catalogue fully covered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Atlona AT-OME-PS62 Control Spec

## Summary
The Atlona AT-OME-PS62 is a multi-format switcher with USB routing and HDBaseT extension. Control is available via RS-232, Telnet, SSH, and TCP (direct socket on ports 9000–9004). Commands are case-sensitive, terminated with carriage-return (0x0D), with feedback terminated by CR+LF (0x0A). A 500ms delay is required between consecutive commands.

<!-- UNRESOLVED: power on/off commands not found in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9000  # MCU command port; additional TCP ports: 9001-9004 for HDBaseT I/O and RS-232 proxy
  notes:
    - "Port 9001: HDBaseT input 1 RS-232 proxy"
    - "Port 9002: HDBaseT input 2 RS-232 proxy"
    - "Port 9003: HDBaseT output RS-232 proxy"
    - "Port 9004: Local RS-232 display control"
    - "Default Telnet port: 23; SSH port: 22"
serial:
  baud_rate: 115200  # Port 1 (unit control) default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # x?AVx&, x?All, All# route inputs to outputs
- queryable   # Status, InputStatus, Version, Type, IPCFG, VOUT sta, etc.
- levelable   # VOUT volume control, VOUTMute
```

## Actions
```yaml
- id: all_hash
  label: Route Inputs to Corresponding Outputs
  kind: action
  command: "All#"
  params: []
  notes: "Routes input 1 to output 1 and input 2 to output 2. Feedback: x1AVx1, x2AVx2"

- id: aud_set
  label: Route Source Audio to Analog Output
  kind: action
  command: "AUD{output} {source}"
  params:
    - name: output
      type: integer
      description: "Analog output number: 1 or 2"
    - name: source
      type: string
      description: "Audio source: HDBaseT, HDMI, AUX1, AUX2, AUX3"
  notes: "Example: AUD1 HDMI → feedback: AUD1 HDMI; AUD2 AUX3 → feedback: AUD2 AUX3"

- id: blink_set
  label: Enable/Disable Front Panel POWER LED Blink
  kind: action
  command: "Blink{value}"
  params:
    - name: value
      type: string
      description: "on, of, sta"
  notes: "Example: Blink on → feedback: Blink on"

- id: comma_wait_set
  label: Enable/Disable Comma Adding 5-Second Delay Between Commands
  kind: action
  command: "CommaWait{value}"
  params:
    - name: value
      type: string
      description: "on, of, sta"
  notes: "Default is on. Example: CommaWait on → feedback: CommaWait on"

- id: ipcfg_query
  label: Display Current IP Configuration
  kind: query
  command: "IPCFG"
  params: []
  notes: "Feedback returns IP Addr, Netmask, Gateway, telnet Port, ssh Port"

- id: ipdhcp_set
  label: Turn DHCP On/Off
  kind: action
  command: "IPDHCP{value}"
  params:
    - name: value
      type: string
      description: "on, of, sta"
  notes: "Default is on. Example: IPDHCP on → feedback: IPDHCP on"

- id: input_status_query
  label: Display Input Signal Status
  kind: query
  command: "InputStatus"
  params: []
  notes: "Feedback: InputStatus 01 (0=no signal, 1=signal detected per channel)"

- id: input_status_channel_query
  label: Display Signal Status for Specific Input
  kind: query
  command: "InputStatus{input}"
  params:
    - name: input
      type: integer
      description: "Input number: 1 or 2 (optional parameter)"
  notes: "Example: InputStatus2 → feedback: InputStatus2 1"

- id: ipstatic_set
  label: Set Static IP Address
  kind: action
  command: "IPStatic {ip} {netmask} {gateway}"
  params:
    - name: ip
      type: string
      description: "IP address (e.g. 192.168.1.112)"
    - name: netmask
      type: string
      description: "Subnet mask (e.g. 255.255.255.0)"
    - name: gateway
      type: string
      description: "Gateway IP address (e.g. 192.168.1.1)"
  notes: "Example: IPStatic 192.168.1.112 255.255.255.0 192.168.1.1 → feedback: IPStatic 192.168.1.112 255.255.255.0 192.168.1.1"

- id: lock
  label: Lock Front Panel Buttons
  kind: action
  command: "Lock"
  params: []
  notes: "Feedback: Lock"

- id: mreset
  label: Reset Unit to Default Settings
  kind: action
  command: "Mreset"
  params: []
  notes: "No feedback returned; unit powers off and then back on."

- id: repeat_cmd_set
  label: Enable/Disable Display Command Repeat
  kind: action
  command: "RepeatCmd{value}"
  params:
    - name: value
      type: string
      description: "on, of, sta"
  notes: "Example: RepeatCmd sta → feedback: RepeatCmd on"

- id: rep_cmd_time_set
  label: Set Display Command Repeat Count
  kind: action
  command: "RepCmdTime {amount}"
  params:
    - name: amount
      type: variant
      description: "2-4, sta"
  notes: "Example: RepeatCmd 3 → feedback: RepeatCmd 3"

- id: rs232para_set
  label: Set RS-232 Baud Rate/Data Bits/Parity/Stop Bits for HDBaseT Output
  kind: action
  command: "RS232para[{baud},{data_bits},{parity},{stop_bits}]"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 2400, 9600, 19200, 38400, 56000, 57600, 115200"
    - name: data_bits
      type: integer
      description: "Data bits: 7 or 8"
    - name: parity
      type: string
      description: "Parity bit: None, Odd, Even"
    - name: stop_bits
      type: integer
      description: "Stop bits: 1 or 2"
  notes: "No spaces permitted; brackets required. Example: RS232para[115200,8,0,1] → feedback: RS232para[115200,8,0,1]"

- id: rs232para_query
  label: Query Current RS-232 Parameters for HDBaseT Output
  kind: query
  command: "RS232para sta"
  params: []
  notes: "Space before sta, no brackets. Feedback: RS232para[115200,8,0,1]"

- id: rs232zone_send
  label: Trigger HDBaseT RX RS-232 Port to Send Command to Display
  kind: action
  command: "RS232zone{port}[{cmd}]"
  params:
    - name: port
      type: integer
      description: "HDBaseT port: 1 (Input 1), 2 (Input 2), 3 (Output)"
    - name: cmd
      type: string
      description: "Command string to forward"
  notes: "Example: RS232zone2[VOL23] → feedback: RS232zone2[VOL23]"

- id: set_mono_set
  label: Set Audio Output Between Stereo and Mono
  kind: action
  command: "SetMono{output} {value}"
  params:
    - name: output
      type: integer
      description: "Analog output: 1 or 2"
    - name: value
      type: string
      description: "on (mono), of (stereo), sta"
  notes: "Example: SetMono1 of → feedback: SetMono1 of; SetMono2 on → feedback: SetMono2 on"

- id: status_query
  label: Display Current Routing State
  kind: query
  command: "Status"
  params: []
  notes: "Feedback: x3Vx1 (current route state)"

- id: type_query
  label: Display Model Information
  kind: query
  command: "Type"
  params: []
  notes: "Feedback: AT-OME-PS62"

- id: unlock
  label: Unlock Front Panel Buttons
  kind: action
  command: "Unlock"
  params: []
  notes: "Feedback: Unlock"

- id: usb_mode_set
  label: Set USB Switching Mode
  kind: action
  command: "UsbMode{mode}"
  params:
    - name: mode
      type: integer
      description: "0=Follow USB, 1=Manual, 2=Follow Video"
  notes: "Example: UsbMode 0 → feedback: UsbMode 0"

- id: usb_route_set
  label: Set USB Source Device
  kind: action
  command: "UsbRoute{source}"
  params:
    - name: source
      type: variant
      description: "1=USB port 1, 2=USB port 2, 3=HDBaseT output, 4=USB-C, 5=HDBaseT input 1, 6=HDBaseT input 2, sta"
  notes: "Example: UsbRoute 3 → feedback: UsbRoute 3"

- id: version_query
  label: Display Current Firmware Version
  kind: query
  command: "Version"
  params: []
  notes: "Feedback: 1.0.00"

- id: vout_set
  label: Set Audio Output Volume Level
  kind: action
  command: "VOUT{zone} {level}"
  params:
    - name: zone
      type: integer
      description: "1=HDBaseT OUT, 2=HDMI OUT, 3=Analog OUT 1, 4=Analog OUT 2"
    - name: level
      type: variant
      description: "Integer -90 to 10, or + to increment by 1, or - to decrement by 1, or sta"
  notes: "Example: VOUT1 4 → feedback: VOUT1 4; VOUT1 + → feedback: VOUT1 5"

- id: vout_mute_set
  label: Mute/Unmute Audio Output Zone
  kind: action
  command: "VOUTMute{zone} {value}"
  params:
    - name: zone
      type: integer
      description: "1=zone 1, 2=zone 2, 3=Aux 1, 4=Aux 2"
    - name: value
      type: string
      description: "on (mute), of (unmute), sta"
  notes: "No space between command and zone parameter. Example: VOUTMute1 sta → feedback: VOUTMute1 on"

- id: x_all
  label: Set Input to All Outputs
  kind: action
  command: "x{input}All"
  params:
    - name: input
      type: integer
      description: "Input source: 1-6"
  notes: "Example: x3All → feedback: x3AVx1, x3AVx2"

- id: x_avx
  label: Switch Audio/Video Input to Specific Output (Matrix Mode)
  kind: action
  command: "x{input}AVx{output}"
  params:
    - name: input
      type: integer
      description: "Input: 1-6"
    - name: output
      type: integer
      description: "Output: 1-2"
  notes: "Example: x2AVx1 → feedback: x2AVx1; x5AVx2 → feedback: x5AVx2"
```

## Feedbacks
```yaml
- id: routing_state
  label: Routing State
  type: string
  notes: "Returns comma-separated route strings, e.g. x1AVx1, x2AVx2 (from Status or All# / x?All / x?AVx&)"

- id: input_status
  label: Input Signal Status
  type: string
  notes: "0=no signal detected, 1=signal detected per channel; from InputStatus"

- id: ipcfg_output
  label: IP Configuration
  type: string
  notes: "Returns IP Addr, Netmask, Gateway, telnet Port, ssh Port from IPCFG"

- id: model_name
  label: Model Name
  type: string
  notes: "Returns AT-OME-PS62 from Type command"

- id: firmware_version
  label: Firmware Version
  type: string
  notes: "Returns version string (e.g. 1.0.00) from Version command"

- id: blink_state
  label: LED Blink State
  type: enum
  values: [on, of]
  notes: "Returned by Blink sta"

- id: comma_wait_state
  label: CommaWait State
  type: enum
  values: [on, of]
  notes: "Returned by CommaWait sta"

- id: dhcp_state
  label: DHCP State
  type: enum
  values: [on, of]
  notes: "Returned by IPDHCP sta"

- id: repeat_cmd_state
  label: Repeat Command State
  type: enum
  values: [on, of]
  notes: "Returned by RepeatCmd sta"

- id: rep_cmd_time_state
  label: Repeat Command Count
  type: integer
  notes: "Range 2-4; returned by RepCmdTime sta"

- id: rs232_para_state
  label: RS-232 Parameters
  type: string
  notes: "Returns RS232para[baud,data_bits,parity,stop_bits] from RS232para sta"

- id: mono_state
  label: Mono/Stereo State
  type: enum
  values: [on, of]
  notes: "on=mono, of=stereo; returned by SetMono{output} sta"

- id: usb_mode_state
  label: USB Mode
  type: integer
  notes: "0=Follow USB, 1=Manual, 2=Follow Video; returned by UsbMode"

- id: usb_route_state
  label: USB Route
  type: variant
  notes: "Returns source index 1-6 from UsbRoute sta"

- id: volume_level
  label: Volume Level
  type: integer
  notes: "Range -90 to 10 per zone; returned by VOUT{zone} sta"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, of]
  notes: "on=muted, of=unmuted; returned by VOUTMute{zone} sta"
```

## Variables
```yaml
# No standalone settable parameters — all settings are command-driven actions.
```

## Events
```yaml
# UNRESOLVED: device does not appear to send unsolicited notifications based on source document.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Commands are case-sensitive. Failed or incorrectly entered commands return "Command FAILED".
- Each command is terminated with carriage-return (0x0D); feedback is terminated with CR+LF (0x0A).
- A 500ms delay between consecutive commands is required.
- Port 9000 is the MCU command port. Ports 9001–9004 are direct TCP-to-RS-232 proxy ports; all data sent to those ports is forwarded bit-for-bit to the respective RS-232 output. No additional payload wrapping is needed for proxy ports.
- RS232para command uses brackets with comma-separated values and no spaces; use `RS232para sta` (with space, no brackets) to query current settings.
- SetMono and VOUTMute: no space between the command name and the zone/output number; space precedes the value parameter.
- Mreset returns no feedback — unit powers off and then powers back on.
- Default Telnet port: 23; SSH port: 22. RS-232 unit control defaults: 115200, 8-bit, None parity, 1 stop bit.
- RS232para configures baud parameters for the HDBaseT output RS-232 port, not the unit control port.
<!-- UNRESOLVED: RS-232 flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: power on/off commands not present in source document -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T08:46:02.227Z
last_checked_at: 2026-06-02T08:46:02.227Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:46:02.227Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions (27 Actions, 0 Feedbacks with query_command) match source commands verbatim; transport port 9000 and baud 115200 confirmed; source catalogue fully covered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not found in source"
- "flow control not stated in source"
- "device does not appear to send unsolicited notifications based on source document."
- "no explicit multi-step macros described in source."
- "no safety warnings or interlock procedures in source."
- "RS-232 flow control (RTS/CTS, XON/XOFF) not stated in source"
- "firmware version compatibility range not stated in source"
- "power on/off commands not present in source document"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
