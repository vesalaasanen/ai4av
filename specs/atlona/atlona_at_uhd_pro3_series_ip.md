---
spec_id: admin/atlona-at-uhd-pro3-44m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-UHD-PRO3-44M Control Spec"
manufacturer: Atlona
model_family: AT-UHD-PRO3-44M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-UHD-PRO3-44M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-66M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-88M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-PRO3-44M.pdf
retrieved_at: 2026-04-29T11:04:01.368Z
last_checked_at: 2026-07-12T08:45:04.868Z
generated_at: 2026-07-12T08:45:04.868Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 baud rate defaults not stated for local control port; CSpara sets it"
  - "default baud rate not stated; CSpara sets 115200 max"
  - "no standalone settable parameter variables beyond action params"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macro sequences in source"
  - "local RS-232 master port default baud rate not stated in source"
  - "EDID custom memory save/load details not fully specified"
  - "SDDP protocol details not documented in this spec excerpt"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:45:04.868Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions matched literally in source; transport parameters verified; bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Atlona AT-UHD-PRO3-44M Control Spec

## Summary
Atlona 4×4 HDMI matrix switcher with TCP/IP and RS-232 control. Supports Telnet on port 23, HTTP on port 80, configurable serial RS-232, audio volume control, preset routing, and user authentication. Command terminator is carriage-return (0x0d); feedback terminates with CR+LF (0x0a).

<!-- UNRESOLVED: RS-232 baud rate defaults not stated for local control port; CSpara sets it -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet default port
  base_url: http://{device_ip}
serial:
  baud_rate: 9600  # UNRESOLVED: default baud rate not stated; CSpara sets 115200 max
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: login  # IPLogin defaults to on; credentials required for Telnet
  credentials: user/password  # configured via IPAddUser
```

## Traits
```yaml
- powerable      # PWON, PWOFF present
- routable       # x?AVx? routing commands present
- queryable      # PWSTA, Status, IPCFG, Version present
- levelable      # VOUT volume control present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: power_status
  label: Power Status
  kind: query
  command: "PWSTA"
  params: []

- id: route_input_to_output
  label: Route Input to Output(s)
  kind: action
  command: "x{input}AVx{outputs}"
  params:
    - name: input
      type: integer
      description: Input number (1-4)
    - name: outputs
      type: string
      description: Output(s) separated by commas, no spaces (1-5). Source example x3AVx2,x3,x4

- id: route_input_to_all
  label: Route Input to All Outputs
  kind: action
  command: "x{input}All"
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: enable_output
  label: Enable Output Channel
  kind: action
  command: "x{channel}${state}"
  params:
    - name: channel
      type: integer
      description: Output channel (1-4)
    - name: state
      type: string
      enum: [on, off, sta]

- id: save_preset
  label: Save Preset
  kind: action
  command: "Save{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-50)

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-50)

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-50)

- id: reset_factory_default
  label: Reset to Factory Default
  kind: action
  command: "Mreset"
  params: []

- id: reset_matrix
  label: Reset Matrix (One-to-One Routing)
  kind: action
  command: "All#"
  params: []

- id: volume_out
  label: Set Output Volume
  kind: action
  command: "VOUT{output} {level}"
  params:
    - name: output
      type: integer
      description: Output number (1-5, 7)
    - name: level
      type: number
      description: Volume in dB (-79 to +15) or increment/decrement (+/-)

- id: volume_mute
  label: Set Volume Mute
  kind: action
  command: "VOUTMute{zone} {state}"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: state
      type: string
      enum: [on, off, sta]

- id: set_edid
  label: Set EDID for Input
  kind: action
  command: "EDIDMSet{input} {edid}"
  params:
    - name: input
      type: integer
      description: Input number (1-4)
    - name: edid
      type: string
      description: EDID selection (default, save1-save10, int1-int23, sta)

- id: mirror_hdmi
  label: Mirror HDMI Output
  kind: action
  command: "MirrorHdmi{hdmi_output} {video_output}"
  params:
    - name: hdmi_output
      type: integer
      description: HDMI output port (5)
    - name: video_output
      type: string
      description: Video output (Out1-Out4)

- id: unmirror_hdmi
  label: Unmirror HDMI Output
  kind: action
  command: "UnMirror{hdmi_output}"
  params:
    - name: hdmi_output
      type: integer
      description: HDMI output port (5)

- id: set_baud_rate
  label: Set RS-232 Master Port Parameters
  kind: action
  command: "CSpara[{baud_rate},{data_bits},{parity},{stop_bits}]"
  params:
    - name: baud_rate
      type: integer
      enum: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
    - name: data_bits
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]  # 0=None, 1=Odd, 2=Even
    - name: stop_bits
      type: integer
      enum: [1, 2]
  notes: "CSpara sets the MASTER serial port. Use sta (no brackets, with space) to query."

- id: rs232para_zone
  label: Set RS-232 HDBaseT Zone Port Parameters
  kind: action
  command: "RS232para[{baud_rate},{data_bits},{parity},{stop_bits}]"
  params:
    - name: baud_rate
      type: integer
      enum: [2400, 9600, 19200, 38400, 56000, 57600, 115200]
    - name: data_bits
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]  # 0=None, 1=Odd, 2=Even
    - name: stop_bits
      type: integer
      enum: [1, 2]
  notes: "RS232para sets RS-232 over the HDBaseT (ZONE OUT) ports - distinct from CSpara (master port). Use 'RS232para sta' (no brackets, with space) to query."

- id: rs232_zone_command
  label: RS-232 Zone Command
  kind: action
  command: "RS232zone{zone}[{command}]"
  params:
    - name: zone
      type: integer
      description: Output port zone (1-4)
    - name: command
      type: string
      description: Command string (no spaces)

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []

- id: enable_ir
  label: Enable IR Window
  kind: action
  command: "IRON"
  params: []

- id: disable_ir
  label: Disable IR Window
  kind: action
  command: "IROFF"
  params: []

- id: enable_syslock
  label: Enable SSH Lock
  kind: action
  command: "syslock {state}"
  params:
    - name: state
      type: string
      enum: [on, off, sta]

- id: set_static_ip
  label: Set Static IP Configuration
  kind: action
  command: "IPStatic {ip_address} {subnet_mask} {gateway}"
  params:
    - name: ip_address
      type: string
      description: IP address (dot-decimal)
    - name: subnet_mask
      type: string
      description: Subnet mask (dot-decimal)
    - name: gateway
      type: string
      description: Gateway address (dot-decimal)

- id: enable_dhcp
  label: Enable DHCP
  kind: action
  command: "IPDHCP {state}"
  params:
    - name: state
      type: string
      enum: [on, off, sta]

- id: add_ip_user
  label: Add IP User
  kind: action
  command: "IPAddUser {username} {password}"
  params:
    - name: username
      type: string
      description: User name (max 20 chars)
    - name: password
      type: string
      description: Password (max 20 chars)

- id: delete_ip_user
  label: Delete IP User
  kind: action
  command: "IPDelUser {username}"
  params:
    - name: username
      type: string

- id: change_ip_password
  label: Change IP Password
  kind: action
  command: "IPChangePass {username} {old_password} {new_password} {confirm_password}"
  params:
    - name: username
      type: string
    - name: old_password
      type: string
    - name: new_password
      type: string
    - name: confirm_password
      type: string

- id: enable_login
  label: Enable Login Requirement
  kind: action
  command: "IPLogin {state}"
  params:
    - name: state
      type: string
      enum: [on, off, sta]

- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  command: "IPPort {port}"
  params:
    - name: port
      type: integer
      description: Port number (0-65535)

- id: set_http_port
  label: Set HTTP Port
  kind: action
  command: "HTTPPort {port}"
  params:
    - name: port
      type: integer
      description: Port number (0-65535)

- id: set_timeout
  label: Set Telnet Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      description: Timeout in seconds (1-60000)

- id: set_host_name
  label: Set Host Name
  kind: action
  command: "set_host_name {name}"
  params:
    - name: name
      type: string
      description: Host name string (max 40 chars, no spaces)

- id: show_host_name
  label: Show Host Name
  kind: query
  command: "show_host_name"
  params: []

- id: enable_broadcast
  label: Enable Broadcast Mode
  kind: action
  command: "Broadcast {state}"
  params:
    - name: state
      type: string
      enum: [on, off, sta]

- id: blink_power
  label: Blink Power LED
  kind: action
  command: "Blink {state}"
  params:
    - name: state
      type: string
      enum: [on, off, sta]

- id: save_edid
  label: Save EDID to Memory
  kind: action
  command: "EDIDOut{output} {memory}"
  params:
    - name: output
      type: integer
      description: Output number (1-4)
    - name: memory
      type: string
      description: Memory location (save1-save10)

- id: sddp_announce
  label: Send SDDP Announcement
  kind: action
  command: "sddp_announce"
  params: []

- id: telnet_quit
  label: Close Telnet Session
  kind: action
  command: "IPQuit"
  params: []

- id: get_type
  label: Get Model Type
  kind: query
  command: "Type {detail}"
  params:
    - name: detail
      type: string
      enum: [full]
      description: Optional full argument (omit for model only)

- id: get_version
  label: Get Firmware Version
  kind: query
  command: "Version"
  params: []

- id: get_network_config
  label: Get Network Configuration
  kind: query
  command: "IPCFG"
  params: []

- id: get_status
  label: Get Routing Status
  kind: query
  command: "Status"
  params: []

- id: get_output_status
  label: Get Output Routing Status
  kind: query
  command: "Statusx {output}"
  params:
    - name: output
      type: integer
      description: Output number (1-5)

- id: help
  label: Display Available Commands
  kind: query
  command: "help {command_name}"
  params:
    - name: command_name
      type: string
      description: Optional command name to get specific help (omit to list all commands)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWOFF]

- id: routing_status
  type: string
  description: Format x1AVx1,x2AVx2,x3AVx3,x4AVx4 for each output

- id: network_config
  type: string
  description: "MAC addr, IP addr, Netmask, Gateway, Web Port, IP Port"

- id: serial_params
  type: string
  description: "Format: baud_rate,data_bits,parity,stop_bits"

- id: volume_level
  type: string
  description: "Format: VOUTn value"

- id: mute_state
  type: enum
  values: [on, off]

- id: output_state
  type: enum
  values: [on, off]

- id: edid_setting
  type: string
  description: "EDID assignment confirmation"

- id: login_state
  type: enum
  values: [on, off]

- id: dhcp_state
  type: enum
  values: [on, off]

- id: broadcast_state
  type: enum
  values: [on, off]

- id: blink_state
  type: enum
  values: [on, off]

- id: telnet_connection_lost
  type: string
  value: "Connection lost..."
  description: Sent when Telnet session closes

- id: model_type
  type: string

- id: firmware_version
  type: string
  description: "Format: Firmware x.x.xx"

- id: host_name
  type: string

- id: sddp_processed
  type: string
  value: "SDDP Announcement processed!"

- id: preset_saved
  type: string

- id: preset_cleared
  type: string

- id: factory_reset
  type: string

- id: matrix_reset
  type: string
  value: "All#"

- id: help_list
  type: string
  description: "Available command list"

- id: command_failed
  type: string
  value: "Command FAILED"
  description: Returned when a command fails or is entered incorrectly
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameter variables beyond action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: syslock_ssh
    description: "When syslock is enabled, web server shuts down and all ports close except SSH (TCP 22). Local RS-232 master port remains active."
  - id: static_ip_before_manual
    description: "Setting static IP requires DHCP to be disabled first via IPDHCP command."
```

## Notes
Command terminator: carriage-return (0x0d). Feedback terminator: carriage-return + line-feed (0x0a). All commands are case-sensitive and must be entered as documented. If a command fails or is entered incorrectly, the feedback is "Command FAILED". Telnet default port 23, HTTP default port 80. Default IPLogin is on (login required). Default DHCP is on. Default Telnet timeout is 300 seconds. Default static IP is 192.168.1.254. Blink command causes POWER LED to flash blue for physical identification. syslock enables SSH on TCP 22 and shuts down web server. CSpara configures the MASTER RS-232 port; RS232para configures the HDBaseT (ZONE OUT) RS-232 ports — these are distinct commands. RS232zone passes commands through to connected display devices.
<!-- UNRESOLVED: local RS-232 master port default baud rate not stated in source -->
<!-- UNRESOLVED: EDID custom memory save/load details not fully specified -->
<!-- UNRESOLVED: SDDP protocol details not documented in this spec excerpt -->
````

Changes: +3 actions (`rs232para_zone`, `show_host_name`, `help`), added verbatim `command:` payload to all 44 actions, added `sta` to output/mute enums (source lists it), +1 feedback (`command_failed`), CSpara label clarified as master port, notes updated re: CSpara vs RS232para distinction + case-sensitivity + default static IP.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-66M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-88M_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-PRO3-44M.pdf
retrieved_at: 2026-04-29T11:04:01.368Z
last_checked_at: 2026-07-12T08:45:04.868Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:45:04.868Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions matched literally in source; transport parameters verified; bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 baud rate defaults not stated for local control port; CSpara sets it"
- "default baud rate not stated; CSpara sets 115200 max"
- "no standalone settable parameter variables beyond action params"
- "no unsolicited event notifications described in source"
- "no explicit multi-step macro sequences in source"
- "local RS-232 master port default baud rate not stated in source"
- "EDID custom memory save/load details not fully specified"
- "SDDP protocol details not documented in this spec excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
