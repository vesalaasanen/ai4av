---
spec_id: admin/amx-precis
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMX Precis PR-Series Control Spec"
manufacturer: AMX
model_family: PR-0402
aliases: []
compatible_with:
  manufacturers:
    - AMX
  models:
    - PR-0402
    - PR-0404
    - PR-0602
    - PR-0808
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hardware-reference-manual-precis-pr-series-matrix-switchers
retrieved_at: 2026-05-03T16:47:36.204Z
last_checked_at: 2026-10-07T14:03:32.178Z
generated_at: 2026-10-07T14:03:32.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no multi-step macro sequences described in source"
  - "firmware version compatibility not stated in source"
  - "command response timing/latency not specified"
  - "maximum concurrent Telnet/SSH sessions not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T14:03:32.178Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec action units match source commands with correct shapes; serial and port 23 transport supported; catalogue essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# AMX Precis PR-Series Control Spec

## Summary
AMX Precis PR-Series HDMI matrix switchers (PR-0402, PR-0404, PR-0602, PR-0808) with RS-232 serial and TCP/Telnet control. RS-232 provides a subset of the API (configuration and switching commands only); Telnet exposes the full command set including system, network, and security management. Commands are ASCII-based with colon-delimited parameters.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: default telnet username/password are null (blank))
```

## Traits
```yaml
- powerable    # standby on/off command
- routable     # video and audio routing commands (VI/VO/CI/CO switching)
- queryable    # extensive get commands for input/output status, resolution, HDCP, etc.
- levelable    # audio mute control
```

## Actions
```yaml
# --- System Commands (Telnet only) ---
- id: help
  label: Help
  kind: action
  params: []
  transport: tcp

- id: help_detail
  label: Help Detail
  kind: action
  params:
    - name: command
      type: string
      description: Command name to get details for
  transport: tcp

- id: ping
  label: Ping
  kind: action
  params:
    - name: ip_address
      type: string
      description: IP address to ping
  transport: tcp

- id: reboot
  label: Reboot
  kind: action
  params: []
  transport: tcp

- id: reset_factory
  label: Factory Reset
  kind: action
  params: []
  transport: tcp

- id: factoryfwimage
  label: Restore Factory Firmware
  kind: action
  params: []
  transport: tcp

- id: set_serial
  label: Set Serial Port On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  transport: tcp

- id: set_baud
  label: Set Serial Parameters
  kind: action
  params:
    - name: baud_rate
      type: enum
      values: [115200, 57600, 38400, 19200, 9600, 4800, 2400]
    - name: data_bits
      type: enum
      values: [7, 8]
    - name: parity
      type: enum
      values: [E, O, N]
    - name: stop_bits
      type: enum
      values: [1, 2]
  transport: tcp

- id: set_key_lock
  label: Set Front Panel Key Lock
  kind: action
  params:
    - name: level
      type: enum
      values: [all, menu, off]
  transport: tcp

- id: exit
  label: Close Session
  kind: action
  params: []
  transport: tcp

# --- Network Commands (Telnet only) ---
- id: set_friendly
  label: Set Hostname
  kind: action
  params:
    - name: name
      type: string
      description: Friendly name / hostname
  transport: tcp

- id: set_ip
  label: Set IP Configuration
  kind: action
  params:
    - name: hostname
      type: string
    - name: type
      type: enum
      values: [dhcp, static]
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway
      type: string
  transport: tcp

- id: set_dns
  label: Set DNS Configuration
  kind: action
  params:
    - name: domain_suffix
      type: string
    - name: dns_entry_1
      type: string
    - name: dns_entry_2
      type: string
    - name: dns_entry_3
      type: string
  transport: tcp

- id: set_ethernet_mode
  label: Set Ethernet Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [auto, "100 full", "10 half"]
  transport: tcp

- id: renew_dhcp
  label: Renew DHCP Lease
  kind: action
  params: []
  transport: tcp

# --- Security Commands (Telnet only) ---
- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (0 to disable telnet)
  transport: tcp

- id: set_telnet_username
  label: Set Telnet Username
  kind: action
  params:
    - name: username
      type: string
  transport: tcp

- id: set_telnet_password
  label: Set Telnet Password
  kind: action
  params:
    - name: password
      type: string
  transport: tcp

- id: set_ssh_port
  label: Set SSH Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (0 to disable SSH)
  transport: tcp

- id: set_ssh_username
  label: Set SSH Username
  kind: action
  params:
    - name: username
      type: string
  transport: tcp

- id: set_ssh_password
  label: Set SSH Password
  kind: action
  params:
    - name: password
      type: string
  transport: tcp

# --- Configuration Commands - Input (RS-232 + Telnet) ---
- id: set_vidin_portname
  label: Set Input Port Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel (1-8)
    - name: name
      type: string
      description: Port name

- id: set_vidin_hdcp
  label: Set Input HDCP Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel (1-8)
    - name: hdcp
      type: enum
      values: [on, off]

- id: set_vidin_edidmode
  label: Set Input EDID Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel (1-8)
    - name: mode
      type: enum
      values: [auto, "all hd resolutions", "hd wide screen", "hd full screen", 4k, 4k60, custom]

- id: set_vidin_prefedid
  label: Set Input Preferred EDID
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel (1-8)
    - name: edid
      type: string
      description: Preferred resolution (e.g. 1920x1080p,60)

- id: set_vidin_ediddata
  label: Set Input Custom EDID Data
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel (1-8)
    - name: edid_data
      type: string
      description: 256-byte EDID hex data

# --- Configuration Commands - Output (RS-232 + Telnet) ---
- id: set_vidout_portname
  label: Set Output Port Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: name
      type: string
      description: Port name

- id: set_vidout_hdcp
  label: Set Output HDCP Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: mode
      type: enum
      values: [auto, "HDCP2.2", "HDCP1.4", "NO-HDCP"]

- id: set_vidout_osd
  label: Set Output OSD State
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_vidout_osd_color
  label: Set Output OSD Color
  kind: action
  params:
    - name: color
      type: enum
      values: [black, blue]

- id: set_vidout_osd_pos
  label: Set Output OSD Position
  kind: action
  params:
    - name: position
      type: enum
      values: [TR, TL, BR, BL, C]

- id: set_vidout_cec_power
  label: Set Output CEC Power
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: state
      type: enum
      values: [on, off]

- id: set_vidout_cec_standby
  label: Set Output CEC Standby
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)

- id: set_vidout_cec_makeactive
  label: Set Output CEC Make Active
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)

- id: set_vidout_cec_disp_auto
  label: Set Output CEC Display Auto
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: state
      type: enum
      values: [on, off]

- id: set_vidout_cec_sleep_timeout
  label: Set Output CEC Sleep Timeout
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: timeout
      type: integer
      description: Timeout in minutes (1-30)

- id: set_vidout_mute
  label: Set Output Video Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: state
      type: enum
      values: [on, off]

- id: set_vidout_blank
  label: Set Output Video Blank
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: pattern
      type: enum
      values: [black, red, green, blue]

- id: set_vidout_sleep
  label: Set Output TMDS Sleep
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: state
      type: enum
      values: [on, off]

- id: set_vidout_sleep_delay
  label: Set Output Sleep Delay
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: delay
      type: integer
      description: Delay in seconds (0-1800)

- id: set_audout_mute
  label: Set Output Audio Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: state
      type: enum
      values: [on, off]

- id: set_audout_format
  label: Set Output Audio Format
  kind: action
  params:
    - name: channel
      type: integer
      description: Output channel (1-8)
    - name: format
      type: enum
      values: [all, hdmi, analog]

# --- Switching Commands (RS-232 + Telnet) ---
- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)

- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)

- id: set_preset_name
  label: Set Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)
    - name: name
      type: string

- id: set_auto_switch
  label: Set Auto Switch
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: PR-0402 only

- id: set_switch_video
  label: Route Video Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel (0=no input, 1-8 per model)
    - name: output
      type: string
      description: Output channel(s) or 'all' (comma-separated, e.g. '1,2,3')

- id: set_switch_av
  label: Route Audio+Video Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel (0=no input, 1-8 per model)
    - name: output
      type: string
      description: Output channel(s) or 'all' (comma-separated, e.g. '1,2,3')

- id: standby_on
  label: Standby On
  kind: action
  params: []
  transport: tcp

- id: standby_off
  label: Standby Off
  kind: action
  params: []
  transport: tcp
```

## Feedbacks
```yaml
- id: fwversion
  type: string
  description: Firmware version of all upgradable components
  transport: tcp
  query_command: fwversion

- id: fwupdatestatus
  type: string
  description: Current firmware update progress/status
  transport: tcp
  query_command: fwupdatestatus

- id: serial_number
  type: string
  description: Device serial number
  transport: tcp
  query_command: get sn

- id: baud_settings
  type: object
  description: Current serial port communication parameters
  transport: tcp
  query_command: get baud

- id: key_lock_state
  type: enum
  values: [all, menu, off]
  transport: tcp
  query_command: get key lock

- id: friendly_name
  type: string
  description: Device hostname
  transport: tcp
  query_command: get friendly

- id: ip_config
  type: object
  description: IP configuration (hostname, type, address, subnet, gateway, MAC)
  transport: tcp
  query_command: get ip

- id: dns_config
  type: object
  description: DNS server configuration
  transport: tcp
  query_command: get dns

- id: ethernet_mode
  type: enum
  values: [auto, "100 full", "10 half"]
  transport: tcp
  query_command: get ethernet mode

- id: vidin_portname
  type: string
  description: Input port name
  params:
    - name: channel
      type: integer
  query_command: "get vidin portname:{channel}"

- id: vidin_hdcp
  type: enum
  values: [on, off]
  description: Input HDCP mode
  params:
    - name: channel
      type: integer
  query_command: "get vidin hdcp:{channel}"

- id: vidin_res
  type: string
  description: Input video resolution (e.g. 1920x1080p,60) or 'no video'
  params:
    - name: channel
      type: integer
  query_command: "get vidin res:{channel}"

- id: vidin_status
  type: enum
  values: ["valid signal", "no signal"]
  description: Input signal presence status
  params:
    - name: channel
      type: integer
  query_command: "get vidin status:{channel}"

- id: vidin_edidmode
  type: string
  description: Input EDID mode
  params:
    - name: channel
      type: integer
  query_command: "get vidin edidmode:{channel}"

- id: vidin_prefedid
  type: string
  description: Input preferred EDID resolution
  params:
    - name: channel
      type: integer
  query_command: "get vidin prefedid:{channel}"

- id: vidin_ediddata
  type: string
  description: Input EDID hex data
  params:
    - name: channel
      type: integer
  query_command: "get vidin ediddata:{channel}"

- id: vidout_portname
  type: string
  description: Output port name
  params:
    - name: channel
      type: integer
  query_command: "get vidout portname:{channel}"

- id: vidout_hdcp
  type: string
  description: Output HDCP mode (auto, HDCP2.2, HDCP1.4, NO-HDCP)
  params:
    - name: channel
      type: integer
  query_command: "get vidout hdcp:{channel}"

- id: vidout_res
  type: string
  description: Output video resolution or 'no signal'
  params:
    - name: channel
      type: integer
  query_command: "get vidout res:{channel}"

- id: vidout_osd
  type: enum
  values: [on, off]
  query_command: get vidout osd

- id: vidout_osd_color
  type: enum
  values: [black, blue]
  query_command: get vidout osd color

- id: vidout_osd_pos
  type: enum
  values: [TR, TL, BR, BL, C]
  query_command: get vidout osd pos

- id: vidout_cec_power
  type: string
  description: CEC power status from sink (on, fail, or 'No attached sink')
  params:
    - name: channel
      type: integer
  query_command: "get vidout cec power:{channel}"

- id: vidout_cec_disp_auto
  type: enum
  values: [on, off]
  params:
    - name: channel
      type: integer
  query_command: "get vidout cec disp auto:{channel}"

- id: vidout_cec_sleep_timeout
  type: integer
  description: CEC display auto on/off delay in minutes
  params:
    - name: channel
      type: integer
  query_command: "get vidout cec sleep timeout:{channel}"

- id: vidout_mute
  type: enum
  values: [on, off]
  params:
    - name: channel
      type: integer
  query_command: "get vidout mute:{channel}"

- id: vidout_blank
  type: string
  description: Video blank pattern (black, red, green, blue)
  params:
    - name: channel
      type: integer
  query_command: "get vidout blank:{channel}"

- id: vidout_sleep
  type: enum
  values: [on, off]
  params:
    - name: channel
      type: integer
  query_command: "get vidout sleep:{channel}"

- id: vidout_sleep_delay
  type: integer
  description: TMDS sleep on/off delay in seconds
  params:
    - name: channel
      type: integer
  query_command: "get vidout sleep delay:{channel}"

- id: audout_mute
  type: enum
  values: [on, off]
  params:
    - name: channel
      type: integer
  query_command: "get audout mute:{channel}"

- id: audout_format
  type: enum
  values: [all, hdmi, analog]
  params:
    - name: channel
      type: integer
  query_command: "get audout format:{channel}"

- id: vidout_ediddata
  type: string
  description: Output sink EDID hex data
  params:
    - name: channel
      type: integer
  query_command: "get vidout ediddata:{channel}"

- id: preset_name
  type: string
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)
  query_command: "get preset name:{preset}"

- id: auto_switch
  type: enum
  values: [on, off]
  notes: PR-0402 only
  query_command: get auto switch

- id: switch_vi
  type: string
  description: Which outputs are routed from specified video input
  params:
    - name: input
      type: integer
  query_command: "get switch VI{input}"

- id: switch_vo
  type: string
  description: Which video input is routed to specified output
  params:
    - name: output
      type: integer
  query_command: "get switch VO{output}"

- id: switch_ci
  type: string
  description: Which outputs are routed from specified audio+video input
  params:
    - name: input
      type: integer
  query_command: "get switch CI{input}"

- id: switch_co
  type: string
  description: Which audio+video input is routed to specified output
  params:
    - name: output
      type: integer
  query_command: "get switch CO{output}"
```

## Variables
```yaml
# No continuous variables identified; all parameters are discrete actions or queries.
```

## Events
```yaml
- id: vidin_status_unsolicited
  type: enum
  values: ["valid signal", "no signal"]
  description: Unsolicited signal presence feedback on input ports
  notes: Source states vidin status command is used for unsolicited feedback
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - action: standby_on
    reason: Device cannot receive signal in standby; requires standby off to resume
  - action: reset_factory
    reason: Irreversible factory reset (preserves IP settings)
  - action: factoryfwimage
    reason: Restores factory firmware image; requires power-on during process
  - action: reboot
    reason: Device reboot
interlocks: []
```

## Notes
- RS-232 API is a subset of the Telnet API — no System, Network, or Security commands available over serial.
- Default Telnet port is 23. Default Telnet username and password are blank (null).
- Default SSH credentials are admin/admin.
- Default Web GUI credentials are administrator/password.
- Switching commands support comma-separated output channels (e.g. `set switch VI2O1,2,3`) and `ALL` keyword.
- Input `0` in switching commands selects "no input" (disconnect). Output `0` selects "no output".
- Maximum channel counts vary by model: PR-0402 (4x2), PR-0404 (4x4), PR-0602 (6x2), PR-0808 (8x8).
- `set auto switch` is PR-0402 only.
- EDID auto mode switches to Custom when EDID data is uploaded via command.
- Non-PCM audio (Dolby/DTS) auto-mutes analog line out regardless of audio format setting.
- Standby on requires interactive Y/N confirmation over Telnet.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: command response timing/latency not specified -->
<!-- UNRESOLVED: maximum concurrent Telnet/SSH sessions not stated -->

## Provenance

```yaml
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hardware-reference-manual-precis-pr-series-matrix-switchers
retrieved_at: 2026-05-03T16:47:36.204Z
last_checked_at: 2026-10-07T14:03:32.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T14:03:32.178Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec action units match source commands with correct shapes; serial and port 23 transport supported; catalogue essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no multi-step macro sequences described in source"
- "firmware version compatibility not stated in source"
- "command response timing/latency not specified"
- "maximum concurrent Telnet/SSH sessions not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
