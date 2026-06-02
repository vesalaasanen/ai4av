---
spec_id: admin/atlona-at-juno-451
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-JUNO-451 / AT-JUNO-451-HDBT Control Spec"
manufacturer: Atlona
model_family: AT-JUNO-451
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-JUNO-451
    - AT-JUNO-451-HDBT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
retrieved_at: 2026-05-14T10:37:36.393Z
last_checked_at: 2026-06-01T23:12:10.628Z
generated_at: 2026-06-01T23:12:10.628Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents firmware 1.2.10 in examples but does not state a supported range. AT-JUNO-451-HDBT is discontinued per source."
  - "explicit default not stated in source."
  - "default not stated in source"
  - "IPLogin command toggles Telnet login on/off; default state not stated. Set per IPDelUser/IPAddUser credentials."
  - "source text maps to None/Odd/Even names; numeric encoding 0/1/2 inferred from CSpara[115200,8,0,1] example."
  - "source table row reads \"1 ... 2\" but device has 4 inputs (xYAVx1) and EDIDCopy uses 1-4; likely OCR error."
  - "see edid_mset"
  - "source does not document persistent settable variables distinct from action parameters; section omitted."
  - "source does not document multi-step macro sequences; section omitted."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the destructive nature of Mreset and the PWOFF/PWON power cycle."
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:10.628Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions matched literal commands in source; full bidirectional coverage with transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Atlona AT-JUNO-451 / AT-JUNO-451-HDBT Control Spec

## Summary
4K/UHD four-input HDMI switcher with auto-switching and optical audio return. ASCII command protocol over Telnet (TCP/IP port 23) and RS-232, terminated with carriage return (0x0d); feedback terminated with CR+LF (0x0a 0x0d). Web GUI also accessible on HTTP port 80. Source covers both AT-JUNO-451 and AT-JUNO-451-HDBT (HDBT variant discontinued, replaced by AT-OPUS-RX41).

<!-- UNRESOLVED: source documents firmware 1.2.10 in examples but does not state a supported range. AT-JUNO-451-HDBT is discontinued per source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 23
  base_url: http://<ip>/
serial:
  baud_rate: 9600  # default per Atlona convention; CSpara may change at runtime. UNRESOLVED: explicit default not stated in source.
  data_bits: 8     # UNRESOLVED: default not stated in source
  parity: none     # UNRESOLVED: default not stated in source
  stop_bits: 1     # UNRESOLVED: default not stated in source
  flow_control: none
auth:
  type: password  # UNRESOLVED: IPLogin command toggles Telnet login on/off; default state not stated. Set per IPDelUser/IPAddUser credentials.
```

## Traits
```yaml
- powerable   # inferred from PWON / PWOFF / PWSTA commands
- routable    # inferred from xYAVx1 routing command
- queryable   # inferred from IPCFG, Status, PWSTA, Version, Type, System, RAtlMac queries
- levelable   # inferred from HDMIAud, Toslink, AudioSRC audio control
```

## Actions
```yaml
- id: audio_src_set
  label: Set Optical Audio Source
  kind: action
  command: "AudioSRC {source}"
  params:
    - name: source
      type: enum
      values: [SPDIF, ARC]
  notes: Use argument "sta" to query current setting.

- id: audio_src_query
  label: Get Optical Audio Source
  kind: query
  command: "AudioSRC sta"
  params: []

- id: autosw_set
  label: Set Auto-Switching Mode
  kind: action
  command: "AutoSW {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: autosw_query
  label: Get Auto-Switching Mode
  kind: query
  command: "AutoSW sta"
  params: []

- id: blink_set
  label: Set POWER LED Blink
  kind: action
  command: "Blink {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: POWER LED alternates blue/red while on.

- id: blink_query
  label: Get POWER LED Blink State
  kind: query
  command: "Blink sta"
  params: []

- id: broadcast_set
  label: Set Broadcast Mode
  kind: action
  command: "Broadcast {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: Default ON per source.

- id: broadcast_query
  label: Get Broadcast Mode
  kind: query
  command: "Broadcast sta"
  params: []

- id: cspara_set
  label: Set Serial Port Parameters
  kind: action
  command: "CSpara[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      enum: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
    - name: data
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]   # UNRESOLVED: source text maps to None/Odd/Even names; numeric encoding 0/1/2 inferred from CSpara[115200,8,0,1] example.
    - name: stop
      type: integer
      enum: [1, 2]
  notes: Brackets required; no spaces between comma-separated args.

- id: cspara_query
  label: Get Serial Port Parameters
  kind: query
  command: "CSpara[sta]"
  params: []

- id: edid_copy
  label: Save Downstream EDID to Memory
  kind: action
  command: "EDIDCopy{input} {memory}"
  params:
    - name: input
      type: integer
      range: [1, 4]
    - name: memory
      type: integer
      range: [1, 8]
  notes: No space between EDIDCopy and first argument.

- id: edid_mset
  label: Assign EDID to Input
  kind: action
  command: "EDIDMSet{input} {preset} {memory}"
  params:
    - name: input
      type: integer
      range: [1, 2]   # UNRESOLVED: source table row reads "1 ... 2" but device has 4 inputs (xYAVx1) and EDIDCopy uses 1-4; likely OCR error.
    - name: preset
      type: integer
      range: [1, 24]
    - name: memory
      type: integer
      range: [1, 8]
      required: false
  notes: Use "EDIDMSet{input} sta" to query current EDID. Preset table in source.

- id: edid_mset_query
  label: Get EDID Assigned to Input
  kind: query
  command: "EDIDMSet{input} sta"
  params:
    - name: input
      type: integer
      range: [1, 2]   # UNRESOLVED: see edid_mset

- id: hdcp_set
  label: Set HDCP Reporting Mode
  kind: action
  command: "HDCPSet{input} {state}"
  params:
    - name: input
      type: integer
      range: [1, 4]
    - name: state
      type: enum
      values: [on, off]
  notes: No space between HDCPSet and first argument.

- id: hdcp_query
  label: Get HDCP Reporting Mode
  kind: query
  command: "HDCPSet{input} sta"
  params:
    - name: input
      type: integer
      range: [1, 4]

- id: hdmi_aud_set
  label: Set HDMI Audio Output
  kind: action
  command: "HDMIAud {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: hdmi_aud_query
  label: Get HDMI Audio Output State
  kind: query
  command: "HDMIAud sta"
  params: []

- id: help
  label: List Available Commands
  kind: query
  command: "help"
  params: []

- id: help_command
  label: Get Help on Specific Command
  kind: query
  command: "help {command}"
  params:
    - name: command
      type: string

- id: input_broadcast_set
  label: Set Input Broadcast
  kind: action
  command: "InputBroadcast {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: When on, InputStatus fires on source connect and on auto-switch events.

- id: input_broadcast_query
  label: Get Input Broadcast State
  kind: query
  command: "InputBroadcast sta"
  params: []

- id: input_status
  label: Get All Input States
  kind: query
  command: "InputStatus"
  params: []
  notes: Returns 4-digit string e.g. "InputStatus 0100" - one digit per input (1=connected, 0=empty).

- id: input_status_one
  label: Get Single Input State
  kind: query
  command: "InputStatus{input}"
  params:
    - name: input
      type: integer
      range: [1, 4]
  notes: No space between InputStatus and argument.

- id: ip_add_user
  label: Add Telnet/Web User
  kind: action
  command: "IPAddUser {username} {password}"
  params:
    - name: username
      type: string
      max_length: 20
    - name: password
      type: string
      max_length: 20

- id: ip_cfg
  label: Get Network Settings
  kind: query
  command: "IPCFG"
  params: []
  notes: Returns MAC, IP, netmask, gateway, Telnet port, HTTP port.

- id: ip_del_user
  label: Delete Telnet/Web User
  kind: action
  command: "IPDelUser {username}"
  params:
    - name: username
      type: string

- id: ip_dhcp_set
  label: Set DHCP Mode
  kind: action
  command: "IPDHCP {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_dhcp_query
  label: Get DHCP Mode
  kind: query
  command: "IPDHCP sta"
  params: []

- id: ip_login_set
  label: Set Telnet Login Required
  kind: action
  command: "IPLogin {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: "on" = credentials required, "off" = no login. Same credentials as web GUI.

- id: ip_port_set
  label: Set Telnet Listening Port
  kind: action
  command: "IPPort {port}"
  params:
    - name: port
      type: integer
      range: [0, 65535]

- id: ip_port_query
  label: Get Telnet Listening Port
  kind: query
  command: "IPPort sta"
  params: []

- id: ip_quit
  label: Close Current Telnet Session
  kind: action
  command: "IPQuit"
  params: []

- id: ip_static
  label: Set Static IP Address
  kind: action
  command: "IPStatic {ip} {netmask} {gateway}"
  params:
    - name: ip
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string
  notes: Each byte 0-255, dot-decimal, space-separated. DHCP must be off first. Default static IP 192.168.1.254.

- id: ip_timeout
  label: Set Telnet Inactivity Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      range: [1, 60000]

- id: ir_off
  label: Disable IR Receiver
  kind: action
  command: "IROFF"
  params: []

- id: ir_on
  label: Enable IR Receiver
  kind: action
  command: "IRON"
  params: []

- id: lock
  label: Lock Front Panel Buttons
  kind: action
  command: "Lock"
  params: []

- id: mreset
  label: Factory Reset
  kind: action
  command: "Mreset"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: power_status
  label: Get Power State
  kind: query
  command: "PWSTA"
  params: []

- id: mac_query
  label: Get MAC Address
  kind: query
  command: "RAtlMac"
  params: []

- id: status
  label: Get Routing State
  kind: query
  command: "Status"
  params: []
  notes: Returns "xYAVx1" - Y is the active input.

- id: system
  label: Get System Configuration
  kind: query
  command: "System sta"
  params: []
  notes: Returns model, MAC, address type, IP, netmask, gateway, HTTP port, Telnet port, firmware, uptime, power status.

- id: toslink_set
  label: Set OPTICAL Port
  kind: action
  command: "Toslink {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: toslink_query
  label: Get OPTICAL Port State
  kind: query
  command: "Toslink sta"
  params: []

- id: type
  label: Get Model
  kind: query
  command: "Type"
  params: []

- id: unlock
  label: Unlock Front Panel Buttons
  kind: action
  command: "Unlock"
  params: []

- id: version
  label: Get Firmware Version
  kind: query
  command: "Version"
  params: []

- id: route_input
  label: Route Input to Output
  kind: action
  command: "x{input}AVx1"
  params:
    - name: input
      type: integer
      range: [1, 4]
  notes: Routes specified input to the single HDMI output.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWOFF]
  description: Returned by PWSTA command.

- id: input_states
  type: string
  description: Returned by InputStatus. 4-digit string, one digit per input 1-4. 1=source connected, 0=empty.

- id: routing_state
  type: string
  description: Returned by Status. Format "xYAVx1" where Y is the active input (1-4).

- id: network_settings
  type: string
  description: Returned by IPCFG. Multi-line: MAC, IP, netmask, gateway, Telnet port, HTTP port.

- id: system_config
  type: string
  description: Returned by System sta. Multi-line: model, MAC, address type, IP, netmask, gateway, HTTP port, Telnet port, firmware, uptime, power status.

- id: firmware_version
  type: string
  description: Returned by Version. Example "1.2.10".

- id: model
  type: string
  description: Returned by Type. Example "AT-JUNO-451".

- id: mac_address
  type: string
  description: Returned by RAtlMac. Format "b8-98-b0-00-56-c9".

- id: command_failed
  type: enum
  values: ["Command FAILED"]
  description: Returned when a command fails or is entered incorrectly.

- id: serial_params
  type: string
  description: Returned by CSpara[sta]. Format "CSpara[baud,data,parity,stop]".
```

## Variables
```yaml
# UNRESOLVED: source does not document persistent settable variables distinct from action parameters; section omitted.
```

## Events
```yaml
- id: input_state_change
  description: InputStatus payload broadcast when InputBroadcast is on and a source is connected/disconnected or auto-switching occurs.
  payload_format: "InputStatus {states}"   # 4-digit string

- id: system_change_broadcast
  description: System state changes broadcast to web GUI and TCP/IP control when Broadcast is on.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences; section omitted.
```

## Safety
```yaml
confirmation_required_for:
  - Mreset   # factory reset - destructive
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the destructive nature of Mreset and the PWOFF/PWON power cycle.
```

## Notes
- All commands and feedback are ASCII, case-sensitive. Commands terminated with carriage return (0x0d). Feedback terminated with carriage return + line feed (0x0a 0x0d).
- "sta" argument is the universal query suffix used by most settable commands (e.g. `AutoSW sta`, `IPPort sta`, `Toslink sta`).
- Source PDF title page references both AT-JUNO-451 and AT-JUNO-451-HDBT. The HDBT variant is discontinued per source (recommended replacement AT-OPUS-RX41).
- CSpara argument parity is encoded numerically in examples (0=None, 1=Odd, 2=Even per `CSpara[115200,8,0,1]`); the source's parameter table also lists symbolic names "None, Odd, Even" — devices may accept either form.
- For TCP/IP, the unit uses Telnet-style ASCII on port 23 (default, configurable via IPPort). HTTP port 80 hosts the web GUI for the same control surface.
- WebFetch of refined source confirmed: PDF was AT-JUNO-451_HDBT_API.pdf v3 (Jul 2023). API protocol is identical for both 451 and 451-HDBT.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
retrieved_at: 2026-05-14T10:37:36.393Z
last_checked_at: 2026-06-01T23:12:10.628Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:10.628Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions matched literal commands in source; full bidirectional coverage with transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents firmware 1.2.10 in examples but does not state a supported range. AT-JUNO-451-HDBT is discontinued per source."
- "explicit default not stated in source."
- "default not stated in source"
- "IPLogin command toggles Telnet login on/off; default state not stated. Set per IPDelUser/IPAddUser credentials."
- "source text maps to None/Odd/Even names; numeric encoding 0/1/2 inferred from CSpara[115200,8,0,1] example."
- "source table row reads \"1 ... 2\" but device has 4 inputs (xYAVx1) and EDIDCopy uses 1-4; likely OCR error."
- "see edid_mset"
- "source does not document persistent settable variables distinct from action parameters; section omitted."
- "source does not document multi-step macro sequences; section omitted."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the destructive nature of Mreset and the PWOFF/PWON power cycle."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
