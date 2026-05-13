---
spec_id: admin/key_digital-kd_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital KD-4x4CSA / KD-8x8CSA Control Spec"
manufacturer: "Key Digital"
model_family: KD-4x4CSA
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
  models:
    - KD-4x4CSA
    - KD-8x8CSA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - keydigital.org
retrieved_at: 2026-05-12T09:53:33.248Z
last_checked_at: 2026-05-08T15:43:08.354Z
generated_at: 2026-05-08T15:43:08.354Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-08T15:43:08.354Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched literal commands in source; transport parameters verified; comprehensive command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Key Digital KD-4x4CSA / KD-8x8CSA Control Spec

## Summary
HDMI matrix switcher supporting 4x4 (KD-4x4CSA) and 8x8 (KD-8x8CSA) configurations. Control via RS-232 serial and TCP/IP (Telnet default). Commands include video input routing, audio output enable/disable, EDID management, power control, and system status query. Commands are not case-sensitive; carriage return + line feed required at end of each command string.

<!-- UNRESOLVED: whether KD-8x8CSA has identical command set not independently confirmed — inferred from same document -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default TCP port; source shows TCP Port = 0023 in STA output
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
- powerable  # PN (power on), PF (power off) commands present
- routable   # SPO xx SI yy (video input routing) present
- queryable  # STA command returns full system state
- levelable  # SPO xx AA/DA E/D (audio output enable/disable) present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns unit on. Command: PN

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns unit off. Command: PF

- id: set_video_routing
  label: Set Video Input Routing
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: input
      type: integer
      description: Input number (01-04, U=Up, D=Down)
  description: Routes video input yy to output xx. Command: SPO xx SI yy

- id: set_video_output_power
  label: Set Video Output Power
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: power
      type: enum
      values: [ON, OFF]
  description: Enable/disable video output. Command: SPO xx ON/OFF

- id: set_audio_analog_output
  label: Set External Analog Audio Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: state
      type: enum
      values: [E, D]
      description: E=Enable, D=Disable
  description: Enable/disable external analog audio output. Command: SPO xx AA E/D

- id: set_audio_digital_output
  label: Set External Digital Audio Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: state
      type: enum
      values: [E, D]
      description: E=Enable, D=Disable
  description: Enable/disable external digital audio output. Command: SPO xx DA E/D

- id: copy_edid_from_output
  label: Copy EDID from Output to Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-04, or A for all)
    - name: output
      type: integer
      description: Output number (01-04) to copy EDID from
  description: Copy EDID from HDMI output yy to input xx. Command: SPC EDID xx H yy

- id: copy_edid_from_preset
  label: Copy EDID from Default Preset
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-04, or A for all)
    - name: preset
      type: integer
      description: Preset number (01-15)
  description: Copy default EDID preset zz to input xx. Command: SPC EDID xx D zz

- id: set_host_ip
  label: Set Host IP Address
  kind: action
  params:
    - name: ip
      type: string
      pattern: "\\d{3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
      description: IP address octets (000-255 each)
  description: Set TCP/IP host IP address. Command: SPCETIPA xxx.xxx.xxx.xxx

- id: set_netmask
  label: Set Net Mask
  kind: action
  params:
    - name: mask
      type: string
      pattern: "\\d{3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
      description: Netmask octets (000-255 each)
  description: Set TCP/IP netmask. Command: SPCETIPM xxx.xxx.xxx.xxx

- id: set_router_ip
  label: Set Router IP Address
  kind: action
  params:
    - name: ip
      type: string
      pattern: "\\d{3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
      description: Router IP octets (000-255 each)
  description: Set TCP/IP router/gateway address. Command: SPCETIPR xxx.xxx.xxx.xxx

- id: set_tcp_port
  label: Set TCP/IP Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (0001-9999)
  description: Set TCP/IP port. Command: SPCETIPP zzzz

- id: apply_network_reboot
  label: Apply Network Config and Reboot
  kind: action
  params: []
  description: Reboot network with new IP settings. Command: SPCETIPB

- id: set_system_address
  label: Set System Address
  kind: action
  params:
    - name: address
      type: integer
      description: System address (00-99); 00=Single unit mode
  description: Set system address for multi-unit control. Command: SPC Axx

- id: set_rs232_baud_rate
  label: Set RS-232 Baud Rate
  kind: action
  params:
    - name: rate_code
      type: integer
      description: Baud rate code (0=57600, 1=38400, 2=19200, 3=9600, 4=4800)
  description: Change RS-232 serial baud rate. Command: SPC RSB z

- id: set_front_panel_buttons
  label: Enable/Disable Front Panel Buttons
  kind: action
  params:
    - name: state
      type: enum
      values: [E, D]
      description: E=Enable, D=Disable
  description: Lock/unlock front panel pushbuttons. Command: SPC FB E/D

- id: factory_reset_no_network
  label: Factory Reset (Preserve Network)
  kind: action
  params: []
  description: Reset to factory defaults without changing network settings. Command: SPCDF 00

- id: factory_reset_all
  label: Factory Reset (All Settings)
  kind: action
  params: []
  description: Reset all settings to factory defaults including network. Command: SPCDF

- id: show_help
  label: Show Help
  kind: action
  params: []
  description: Returns full API in readable format. Command: H

- id: show_status
  label: Show Global System Status
  kind: action
  params: []
  description: Returns current state of power, RS232 config, network settings, video routing, and audio output status. Command: STA

- id: set_output_debug_mode
  label: Set Output Debug Mode
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: state
      type: enum
      values: [ON, OFF]
  description: Enable/disable debug mode for output. Command: SPO xx DBG ON/OFF

- id: set_output_video_format_mode
  label: Set Output Video Format Mode
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-04, or A for all)
    - name: mode
      type: enum
      values: [A, D, H]
      description: A=Auto, D=Forced DVI, H=Bypass
  description: Set output video format mode. Command: SPO xx HFM A/D/H
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, OFF]
  description: Current power state; returned by STA command

- id: video_output_state
  type: object
  properties:
    - name: input
      type: integer
      description: Currently routed input number (01-04)
    - name: output
      type: enum
      values: [ON, OFF]
      description: Output power state
    - name: link
      type: enum
      values: [ON, OFF]
    - name: dbg
      type: enum
      values: [ON, OFF]
      description: Debug mode state
    - name: format
      type: string
      description: Video format mode (AUTO, DVI, Bypass)
  description: Per-output video state; returned by STA command

- id: audio_output_state
  type: object
  properties:
    - name: analog
      type: enum
      values: [Enabled, Disabled]
    - name: digital
      type: enum
      values: [Enabled, Disabled]
  description: Per-output audio state; returned by STA command

- id: network_status
  type: object
  properties:
    - name: mac_address
      type: string
    - name: host_ip
      type: string
    - name: net_mask
      type: string
    - name: router_ip
      type: string
    - name: tcp_port
      type: integer
  description: Network configuration; returned by STA command

- id: system_address
  type: integer
  description: Current system address (00-99); returned by STA command

- id: firmware_version
  type: string
  description: Firmware version; returned by STA command (e.g., "1.02")

- id: front_panel_state
  type: enum
  values: [Enabled, Disabled]
  description: Front panel lock state; returned by STA command

- id: edid_input_state
  type: object
  properties:
    - name: edid
      type: string
      description: EDID preset name/number
    - name: link
      type: enum
      values: [ON, OFF]
  description: Per-input EDID and link status; returned by STA command
```

## Variables
```yaml
# No discrete settable parameters beyond the action params above.
# All configurable state is addressed via action commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification structure described in source.
# Source states "if a new command is received, a prompt should be sent back"
# suggesting response-only (query/response) model, not push events.
```

## Macros
```yaml
# No explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
Commands are not case-sensitive. Spaces in command syntax are for readability only — commands must be sent WITHOUT spaces (e.g., `SPO01SI02`, not `SPO 01 SI 02`). Carriage return + line feed required at end of every command string. System address prefix (zz=01-99) may precede any command for multi-unit daisy-chain control.

Video format modes: A=Auto (EDID-driven), D=Forced DVI, H=Bypass (pass through without conversion).

EDID presets 01-15 map to specific resolution/audio combinations; preset 04 (1080p60, 2Ch PCM) is factory default.

Network default: IP 192.168.0.239, port 23 (Telnet). MAC address shown in STA output: 18:98:66:E9:7C:B1.

## Provenance

```yaml
source_domains:
  - keydigital.com
  - keydigital.org
retrieved_at: 2026-05-12T09:53:33.248Z
last_checked_at: 2026-05-08T15:43:08.354Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:43:08.354Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched literal commands in source; transport parameters verified; comprehensive command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
