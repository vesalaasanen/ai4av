---
spec_id: admin/atlona-at-uhd-clso-824
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-UHD-CLSO-824 Control Spec"
manufacturer: Atlona
model_family: AT-UHD-CLSO-824
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-UHD-CLSO-824
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-824_V7.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-612ED_V2.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-601_V3.pdf
retrieved_at: 2026-05-22T15:17:53.224Z
last_checked_at: 2026-06-02T21:39:56.445Z
generated_at: 2026-06-02T21:39:56.445Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default TCP/IP port number not stated in source (only that the port is configurable via IPPort X)"
  - "default TCP port number not stated in source; configurable via IPPort X"
  - "source describes optional IPLogin mode (default username \"root\", password \"Atlona\") but does not state whether login is enabled or disabled by default. Source note: \"Login mode should be in off position when the CLSO is used with control systems that do not support passwords.\""
  - "none observed beyond commands above"
  - "no device-originated unsolicited notifications documented"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
  - "default TCP/IP port number (only that IPPort X is configurable); IPLogin default state (on or off); firmware version compatibility range"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:56.445Z
  matched_actions: 75
  action_count: 75
  confidence: medium
  summary: "All 75 spec actions matched verbatim with correct shapes after drift fixes; both output_video '$' delimiter and switch_input_to_outputs '>' prefix now match source; transport confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Atlona AT-UHD-CLSO-824 Control Spec

## Summary
The AT-UHD-CLSO-824 is an Atlona 8-input UHD switcher/scaler with HDBaseT and HDMI outputs. This spec covers the RS-232 and TCP/IP control protocol (Telnet-style ASCII commands terminated with CR/LF), including power, routing, EDID, HDCP, audio, and volume commands.

<!-- UNRESOLVED: default TCP/IP port number not stated in source (only that the port is configurable via IPPort X) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # default; switcher also accepts 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400 via CSpara
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # UNRESOLVED: default TCP port number not stated in source; configurable via IPPort X
  port: null
auth:
  # UNRESOLVED: source describes optional IPLogin mode (default username "root", password "Atlona") but does not state whether login is enabled or disabled by default. Source note: "Login mode should be in off position when the CLSO is used with control systems that do not support passwords."
  type: null
```

## Traits
```yaml
- powerable       # inferred from PWX / PWSTA commands
- routable        # inferred from x1AVx2 / x1All routing commands
- queryable       # inferred from PWSTA, VOUTx sta, IPCFG, System sta, etc.
- levelable       # inferred from VOUT / VIN / VMic volume commands
```

## Actions
```yaml
# Power & System
- id: power
  label: Power
  kind: action
  command: "PW{state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF, STA]
      description: Power state to set, or STA to query

- id: power_status
  label: Power Status Query
  kind: query
  command: "PWSTA"
  params: []

- id: system_status
  label: System Status
  kind: query
  command: "System sta"
  params: []

- id: hdvs_status
  label: HDVS Status
  kind: query
  command: "HDVS sta"
  params: []

- id: version
  label: Firmware Version
  kind: query
  command: "Version {target}"
  params:
    - name: target
      type: enum
      values: [MCU, FPGA, OSD, DSP]

- id: type
  label: Model Number
  kind: query
  command: "Type"
  params: []

- id: lock
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []

- id: unlock
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []

# Route Commands
- id: route_all
  label: Reset All Inputs To Outputs
  kind: action
  command: "All# {pair_spec}"
  params:
    - name: pair_spec
      type: string
      description: 'e.g. "x1AVx1, x2AVx2" - input/output pairs'

- id: output_video
  label: Output Video On/Off/Status
  kind: action
  command: "x{output}$ {state}"  # source: x2$ off — literal '$' delimiter between output and state
  params:
    - name: output
      type: integer
    - name: state
      type: enum
      values: [on, off, sta]

- id: input_to_all_outputs
  label: Input To All Outputs
  kind: action
  command: "x{input}All"
  params:
    - name: input
      type: integer

- id: switch_input_to_output
  label: Switch Input To Output
  kind: action
  command: "x{input}AVx{output}"
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: switch_input_to_outputs
  label: Switch Input To Multiple Outputs
  kind: action
  command: ">x{input}AV{outputs}"  # source: >x1AVx1,x2 — leading '>' prefix for multi-output switch
  params:
    - name: input
      type: integer
    - name: outputs
      type: string
      description: 'Comma-separated output list, e.g. "x1,x2"'

- id: vga_mode
  label: Set VGA Port Mode
  kind: action
  command: "VGAMSet {mode}"
  params:
    - name: mode
      type: enum
      values: [vga, comp]

- id: ir_on
  label: Front Panel IR On
  kind: action
  command: "IRON"
  params: []

- id: ir_off
  label: Front Panel IR Off
  kind: action
  command: "IROFF"
  params: []

- id: output_status
  label: Output Status (Single)
  kind: query
  command: "Statusx{output}"
  params:
    - name: output
      type: integer

- id: route_status
  label: Current Routes Status
  kind: query
  command: "Status"
  params: []

- id: save_route
  label: Save Current Route
  kind: action
  command: "Save{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot number

- id: recall_route
  label: Recall Saved Route
  kind: action
  command: "Recall{memory}"
  params:
    - name: memory
      type: integer

# EDID Commands
- id: edid_default
  label: Set Input EDID To Default
  kind: action
  command: "EDIDMSet{input} default"
  params:
    - name: input
      type: integer

- id: edid_save
  label: Set Input EDID To Saved Memory
  kind: action
  command: "EDIDMSet{input} save{memory}"
  params:
    - name: input
      type: integer
    - name: memory
      type: integer

- id: edid_internal
  label: Set Input EDID To Internal
  kind: action
  command: "EDIDMSet{input} int{internal}"
  params:
    - name: input
      type: integer
    - name: internal
      type: integer
      description: 'Internal EDID number (1-19)'

- id: edid_status
  label: Input EDID Status
  kind: query
  command: "EDIDMSet{input} sta"
  params:
    - name: input
      type: integer

- id: edid_copy_output
  label: Copy Output EDID To Memory
  kind: action
  command: "EDIDOut{output} mem{memory}"
  params:
    - name: output
      type: integer
    - name: memory
      type: integer

# VGA Preferred Timing
- id: vga_preferred_timing
  label: Set VGA Preferred Timing
  kind: action
  command: "PrefTimg8 {timing}"
  params:
    - name: timing
      type: integer
      description: 'Timing index 0-7'

- id: vga_preferred_timing_status
  label: VGA Preferred Timing Status
  kind: query
  command: "PrefTimgsta"
  params: []

- id: list_pref
  label: List Preferred Timings Or EDIDs
  kind: query
  command: "List {target}"
  params:
    - name: target
      type: enum
      values: [Pref, EDID]

# HDCP
- id: hdcp_set
  label: Set HDCP Reporting Mode
  kind: action
  command: "HDCPSet{input} {mode}"
  params:
    - name: input
      type: integer
    - name: mode
      type: enum
      values: [on, off, sta]

# Audio
- id: analog_audio_source
  label: Set Analog Output Audio Source
  kind: action
  command: "AUD{output} {port}"
  params:
    - name: output
      type: integer
      description: 'Analog output number (1-2)'
    - name: port
      type: integer
      description: 'HDMI/HDBaseT port to follow'

- id: ducking
  label: Set Audio Ducking
  kind: action
  command: "Ducking{output} {state}"
  params:
    - name: output
      type: integer
    - name: state
      type: enum
      values: [on, off]

- id: mixer_source
  label: Set Analog Output Mixer Source
  kind: action
  command: "Mixer{output} {source}"
  params:
    - name: output
      type: integer
    - name: source
      type: integer
      description: 'Mixer source (0=None, 1=AUX1)'

# Volume
- id: set_mono
  label: Set Analog Output Mono/Stereo
  kind: action
  command: "SetMono{output} {mode}"
  params:
    - name: output
      type: integer
    - name: mode
      type: enum
      values: [on, off]
      description: 'on=mono, off=stereo'

- id: vout_up
  label: Output Volume Up One Step
  kind: action
  command: "VOUT{zone} +"
  params:
    - name: zone
      type: integer

- id: vout_down
  label: Output Volume Down One Step
  kind: action
  command: "VOUT{zone} -"
  params:
    - name: zone
      type: integer

- id: vout_set
  label: Set Output Volume Level
  kind: action
  command: "VOUT{zone} {level}"
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: 'Volume in dB, -90 to 30'

- id: vout_status
  label: Output Volume Status
  kind: query
  command: "VOUT{zone} sta"
  params:
    - name: zone
      type: integer

- id: vin_up
  label: Input Volume Up One Step
  kind: action
  command: "VIN{input} +"
  params:
    - name: input
      type: integer

- id: vin_down
  label: Input Volume Down One Step
  kind: action
  command: "VIN{input} -"
  params:
    - name: input
      type: integer

- id: vin_set
  label: Set Input Volume Level
  kind: action
  command: "VIN{input} {level}"
  params:
    - name: input
      type: integer
    - name: level
      type: integer
      description: 'Volume in dB'

- id: vin_status
  label: Input Volume Status
  kind: query
  command: "VIN{input} sta"
  params:
    - name: input
      type: integer

- id: vin_mute
  label: Input Audio Mute
  kind: action
  command: "VINMute{input} {state}"
  params:
    - name: input
      type: integer
      description: '1=Cat5 in1, 2=Cat5 in2, 3=Cat5 in3, 4=HDMI4, 5=HDMI5, 6=HDMI6, 7=HDMI7, 8=VGA(LINE3), 9=AUX1-source, 10=AUX2-source'
    - name: state
      type: enum
      values: [on, off, sta]

- id: vout_mute
  label: Output Volume Mute
  kind: action
  command: "VOUTMute{output} {state}"
  params:
    - name: output
      type: integer
    - name: state
      type: enum
      values: [on, off]

- id: vmic_up
  label: Mic Input Volume Up
  kind: action
  command: "VMic{mic} +"
  params:
    - name: mic
      type: integer

- id: vmic_down
  label: Mic Input Volume Down
  kind: action
  command: "VMic{mic} -"
  params:
    - name: mic
      type: integer

- id: vmic_set
  label: Set Mic Input Level
  kind: action
  command: "VMic{mic} {level}"
  params:
    - name: mic
      type: integer
    - name: level
      type: integer
      description: 'Mic level in dB'

- id: vmic_status
  label: Mic Input Level Status
  kind: query
  command: "VMic{mic} sta"
  params:
    - name: mic
      type: integer

# RS-232 Configuration
- id: cs_para
  label: Set Switcher Serial Parameters
  kind: action
  command: "CSpara[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      description: 'Baud rate: 2400, 4800, 9600, 19200, 38400, 57600, 115200, or 230400'
    - name: data
      type: integer
      description: 'Data bits (must be 8)'
    - name: parity
      type: integer
      description: 'Parity (must be 0 = None)'
    - name: stop
      type: integer
      description: 'Stop bits (must be 1)'

- id: rs232_para
  label: Output RS-232 Parameters Status
  kind: query
  command: "RS232para"
  params: []

# TCP/IP Commands
- id: ipcfg
  label: IP Configuration Status
  kind: query
  command: "IPCFG"
  params: []

- id: ip_timeout
  label: Set TCP/IP Inactivity Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      description: 'Default 45 seconds'

- id: ip_quit
  label: TCP/IP Logout
  kind: action
  command: "IPQuit"
  params: []

- id: ip_add_user
  label: List TCP/IP Users
  kind: query
  command: "IPAddUser"
  params: []

- id: ip_add_user_create
  label: Add TCP/IP User
  kind: action
  command: "IPAddUser {user} {password}"
  params:
    - name: user
      type: string
    - name: password
      type: string

- id: ip_del_user
  label: Delete TCP/IP User
  kind: action
  command: "IPDelUser {user}"
  params:
    - name: user
      type: string

- id: ip_dhcp_status
  label: DHCP Status
  kind: query
  command: "IPDHCP sta"
  params: []

- id: ip_dhcp_on
  label: DHCP On
  kind: action
  command: "IPDHCP on"
  params: []

- id: ip_dhcp_off
  label: DHCP Off
  kind: action
  command: "IPDHCP off"
  params: []

- id: ip_static
  label: Set Static IP
  kind: action
  command: "IPStatic {address} {netmask} {gateway}"
  params:
    - name: address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string

- id: ip_port
  label: Set TCP/IP Port
  kind: action
  command: "IPPort {port}"
  params:
    - name: port
      type: integer

- id: ip_login_status
  label: IP Login Status
  kind: query
  command: "IPLogin sta"
  params: []

- id: ip_login_on
  label: Enable IP Login
  kind: action
  command: "IPLogin on"
  params: []

- id: ip_login_off
  label: Disable IP Login
  kind: action
  command: "IPLogin off"
  params: []

- id: broadcast_status
  label: Broadcast Mode Status
  kind: query
  command: "Broadcast sta"
  params: []

- id: broadcast_on
  label: Enable Broadcast Mode
  kind: action
  command: "Broadcast on"
  params: []

- id: broadcast_off
  label: Disable Broadcast Mode
  kind: action
  command: "Broadcast off"
  params: []

- id: cli_mode
  label: Set Control Device IP Mode
  kind: action
  command: "CliMode {mode}"
  params:
    - name: mode
      type: enum
      values: [sta, login, non-login]

- id: cli_user
  label: Set IP Username
  kind: action
  command: "CliUser {username}"
  params:
    - name: username
      type: string
      description: 'Leave blank to display current username'

- id: cli_pass
  label: Set IP Password
  kind: action
  command: "CliPass {password}"
  params:
    - name: password
      type: string

- id: cli_ipaddr
  label: Set Controlled Device IP Address
  kind: action
  command: "CliIPAddr {address}"
  params:
    - name: address
      type: string

- id: cli_port
  label: Set Controlled Device TCP/IP Port
  kind: action
  command: "CliPort {port}"
  params:
    - name: port
      type: integer

- id: cli_netmask
  label: Set Controlled Device Netmask
  kind: action
  command: "CliNetmask {netmask}"
  params:
    - name: netmask
      type: string

- id: cli_gateway
  label: Set Controlled Device Gateway
  kind: action
  command: "CliGateway {gateway}"
  params:
    - name: gateway
      type: string

- id: cli_dns
  label: Set Controlled Device DNS
  kind: action
  command: "CliDNS {dns}"
  params:
    - name: dns
      type: string

- id: cli_dnsaddr
  label: Set Controlled Device DNS Address
  kind: action
  command: "CliDNSAddr {address}"
  params:
    - name: address
      type: string
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWOFF]
  description: Returned by PWX / PWSTA

- id: command_failed
  type: constant
  value: "Command FAILED"
  description: Returned when a command is incorrect or fails

- id: lock_state
  type: enum
  values: [Lock, Unlock]
  description: Returned by Lock / Unlock commands

- id: hdcp_state
  type: enum
  values: [on, off, sta]
  description: Returned by HDCPSetX Y

- id: vout_level
  type: integer
  description: Returned by VOUT commands; value in dB (-90 to 30)

- id: vin_level
  type: integer
  description: Returned by VIN commands; value in dB

- id: vmic_level
  type: integer
  description: Returned by VMic commands; value in dB

- id: route_pair
  type: string
  description: 'Returned by routing commands, e.g. "x3AVx2"'

- id: broadcast_state
  type: enum
  values: [on, off]
  description: Returned by Broadcast commands

- id: ip_login_state
  type: enum
  values: [on, off]
  description: Returned by IPLogin commands

- id: dhcp_state
  type: enum
  values: [on, off]
  description: Returned by IPDHCP commands
```

## Variables
```yaml
# No source-described persistent settable variables beyond the action parameter space.
# UNRESOLVED: none observed beyond commands above
```

## Events
```yaml
# Source mentions unsolicited display-control strings sent by HDVS devices via RS-232 master port:
# "#*PORTx[WP_Display[Off]$ CR ] CR" and "#*PORTx[WP_Display[On]$ CR ] CR"
# and query "RS232zoneX[WP_Display[?]$ CR ] CR".
# These are HDVS→CLSO events, not CLSO events.
# UNRESOLVED: no device-originated unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements found in source
```

## Notes
All commands (TCP/IP) must be terminated with carriage return + line feed. Feedback is also terminated with CR/LF. Commands are case-sensitive.

RS-232 default: 115200 bps, 8 data bits, no parity, 1 stop bit, no flow control. Switcher also accepts 2400, 4800, 9600, 19200, 38400, 57600, 230400 via CSpara command. Per source, when changing CSpara the data/parity/stop must remain 8/0/1.

RS-232 DB9 pin convention: pin 2 TX, pin 3 RX, pin 5 ground (some devices reverse pins 2/3).

TCP/IP auth: optional via IPLogin. When enabled, default credentials are username "root" / password "Atlona" (same as webGUI). Source recommends leaving IPLogin off when integrating with control systems that do not support passwords.

Default TCP/IP inactivity timeout: 45 seconds (IPTimeout). Default broadcast mode: on.

There are 15 RS-232 zones on the back of the switcher: zones 1-10 are RS-232 ports, zone 11-13 are HDBaseT input ports 1-3, zones 14-15 are HDBaseT output ports 1-2.

Internal EDID presets numbered 1-19 are listed in the source (e.g. 01 2160P60 Multi CH, 02 2160P60 2CH, ..., 19 800x600 RGB 2CH).

VGA preferred timing indices: 00 Default, 03 1280x800, 06 1280x720.

Analog output mixer source mapping: Analog Out 1 → 1=AFV HDMI/HDBaseT Out 1, 3=AUX1; Analog Out 2 → 1=AFV HDMI/HDBaseT Out 2, 3=AUX1.

<!-- UNRESOLVED: default TCP/IP port number (only that IPPort X is configurable); IPLogin default state (on or off); firmware version compatibility range -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-824_V7.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-612ED_V2.pdf
  - https://atlona.com/pdf/manuals/AT-UHD-CLSO-601_V3.pdf
retrieved_at: 2026-05-22T15:17:53.224Z
last_checked_at: 2026-06-02T21:39:56.445Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:56.445Z
matched_actions: 75
action_count: 75
confidence: medium
summary: "All 75 spec actions matched verbatim with correct shapes after drift fixes; both output_video '$' delimiter and switch_input_to_outputs '>' prefix now match source; transport confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default TCP/IP port number not stated in source (only that the port is configurable via IPPort X)"
- "default TCP port number not stated in source; configurable via IPPort X"
- "source describes optional IPLogin mode (default username \"root\", password \"Atlona\") but does not state whether login is enabled or disabled by default. Source note: \"Login mode should be in off position when the CLSO is used with control systems that do not support passwords.\""
- "none observed beyond commands above"
- "no device-originated unsolicited notifications documented"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
- "default TCP/IP port number (only that IPPort X is configurable); IPLogin default state (on or off); firmware version compatibility range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
