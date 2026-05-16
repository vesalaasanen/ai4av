---
spec_id: admin/atlona-at-juno-451
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-JUNO-451 Control Spec"
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
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-14T21:33:10.148Z
generated_at: 2026-05-14T21:33:10.148Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:33:10.148Z
  matched_actions: 36
  action_count: 36
  confidence: high
  summary: "All 36 spec actions have literal counterparts in the source with correct parameters and transport values verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Atlona AT-JUNO-451 Control Spec

## Summary
HDMI switcher with 4 inputs, auto-switching, and de-embedded optical audio output. Supports TCP/IP control via Telnet (port 23) and HTTP (port 80), plus RS-232 serial control. Control protocol is ASCII text-based, terminated with CR (0x0d), feedback terminated with CR+LF (0x0a).

<!-- UNRESOLVED: RS-232 cable wiring diagram not present in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet port - from IPCFG / System commands
  # HTTP port: 80 - stated in IPCFG output
auth:
  type: none  # inferred: no auth procedure in source; IPLogin command exists but default state unknown
serial:
  baud_rate: 9600  # default per CSpara docs
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not discussed in source
```

## Traits
```yaml
- powerable       # PWON, PWOFF, PWSTA present
- routable        # xYAVx1 routing commands present
- queryable       # Status, InputStatus, PWSTA, System, Version present
- levelable       # AudioSRC, HDMIAud, Toslink present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_status
  label: Power Status
  kind: action
  params: []
- id: route_input
  label: Route Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)
- id: set_audio_source
  label: Set Audio Source
  kind: action
  params:
    - name: source
      type: string
      description: "SPDIF, ARC, or sta (query current)"
- id: auto_switch
  label: Auto Switching
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta (query)"
- id: input_broadcast
  label: Input Broadcast
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta (query)"
- id: input_status
  label: Input Status
  kind: action
  params:
    - name: input
      type: integer
      description: "Optional 1-4; returns 0=no source, 1=source connected"
- id: blink
  label: Blink LED
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta (query)"
- id: lock
  label: Lock Front Panel
  kind: action
  params: []
- id: unlock
  label: Unlock Front Panel
  kind: action
  params: []
- id: hdcp_set
  label: Set HDCP Reporting
  kind: action
  params:
    - name: input
      type: integer
      description: "Input 1-4"
    - name: state
      type: string
      description: "on, off, or sta"
- id: hdmi_audio
  label: HDMI Audio
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta"
- id: toslink
  label: Toslink Port
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta"
- id: edid_copy
  label: EDID Copy
  kind: action
  params:
    - name: input
      type: integer
      description: "1-4"
    - name: memory
      type: integer
      description: "1-8"
- id: edid_mset
  label: EDID Assign
  kind: action
  params:
    - name: input
      type: integer
      description: "1-2"
    - name: preset
      type: integer
      description: "1-24 EDID preset"
- id: cspara
  label: Serial Port Config
  kind: action
  params:
    - name: baud
      type: integer
      description: "2400, 4800, 9600, 19200, 38400, 57600, 115200"
    - name: data_bits
      type: integer
      description: "7 or 8"
    - name: parity
      type: string
      description: "0=None, 1=Odd, 2=Even"
    - name: stop_bits
      type: integer
      description: "1 or 2"
- id: broadcast
  label: Broadcast Mode
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta"
- id: ip_add_user
  label: Add TCP/IP User
  kind: action
  params:
    - name: username
      type: string
      description: "Max 20 chars"
    - name: password
      type: string
      description: "Max 20 chars"
- id: ip_del_user
  label: Delete TCP/IP User
  kind: action
  params:
    - name: username
      type: string
      description: "User to delete"
- id: ip_dhcp
  label: DHCP Mode
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta"
- id: ip_static
  label: Set Static IP
  kind: action
  params:
    - name: ip
      type: string
      description: "IP address"
    - name: mask
      type: string
      description: "Subnet mask"
    - name: gateway
      type: string
      description: "Gateway IP"
- id: ip_timeout
  label: Telnet Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: "1-60000"
- id: ip_port
  label: Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: "0-65535"
- id: ip_login
  label: Telnet Login
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or sta"
- id: ip_quit
  label: Close Telnet Session
  kind: action
  params: []
- id: ip_cfg
  label: Network Config
  kind: action
  params: []
- id: system
  label: System Info
  kind: action
  params: []
- id: version
  label: Firmware Version
  kind: action
  params: []
- id: type
  label: Model Type
  kind: action
  params: []
- id: mac_addr
  label: MAC Address
  kind: action
  params: []
- id: mreset
  label: Factory Reset
  kind: action
  params: []
- id: ir_on
  label: IR Receiver On
  kind: action
  params: []
- id: ir_off
  label: IR Receiver Off
  kind: action
  params: []
- id: status
  label: Routing Status
  kind: action
  params: []
- id: help
  label: Help
  kind: action
  params:
    - name: command
      type: string
      description: "Optional command name"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [PWON, PWOFF]
- id: input_state
  label: Input State
  type: string
  description: "4-char string, each char 0=no source or 1=source connected"
- id: routing_state
  label: Routing State
  type: string
  description: "Format xYAVx1 where Y is input number"
- id: command_failed
  label: Command Failed
  type: string
  description: "Feedback when command fails or is entered incorrectly"
- id: connection_lost
  label: Connection Lost
  type: string
  description: "Returned after IPQuit command"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation in source; InputBroadcast triggers
# automatic InputStatus response when enabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command termination: CR (0x0d); feedback termination: CR+LF (0x0a). Commands are case-sensitive. Broadcast mode ON causes web GUI changes to also be sent to control system via TCP/IP. Default static IP: 192.168.1.254. Telnet port 23, HTTP port 80. Factory reset (Mreset) clears all TCP/IP users and network settings. JUNO-451-HDBT discontinued; recommended replacement is OPUS-RX41.
<!-- UNRESOLVED: RS-232 connector pinout not in source -->
<!-- UNRESOLVED: power consumption not stated -->
<!-- UNRESOLVED: HDCP content decryption behavior not confirmed -->
<!-- UNRESOLVED: default IPLogin state (on/off) not stated -->
<!-- UNRESOLVED: auto-switching trigger threshold/sensitivity not documented -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-14T21:33:10.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:33:10.148Z
matched_actions: 36
action_count: 36
confidence: high
summary: "All 36 spec actions have literal counterparts in the source with correct parameters and transport values verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
