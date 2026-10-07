---
spec_id: admin/atlona-at-uhd-sw-5000ed
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-UHD-SW-5000ED Control Spec"
manufacturer: Atlona
model_family: AT-UHD-SW-5000ED
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-UHD-SW-5000ED
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-UHD-SW-5000ED_API.pdf
  - https://atlona.com/pdf/AT-HDVS-200-TX_TX-PSK_API.pdf
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-SW-5000ED.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-HDVS-200-TX.zip
retrieved_at: 2026-05-22T15:20:43.042Z
last_checked_at: 2026-10-01T06:35:16.893Z
generated_at: 2026-10-01T06:35:16.893Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/REST API not documented; only Telnet/RS-232 described"
  - "baud rate not defaulted; CSpara lists 2400/4800/9600/19200/38400/57600/115200"
  - "defaults not stated; CSpara lists 7 or 8"
  - "defaults not stated; CSpara lists None/Odd/Even"
  - "defaults not stated; CSpara lists 1 or 2"
  - "flow control not addressed in source"
  - "unsolicited event notifications not documented in source"
  - "multi-step macro sequences not documented in source"
  - "no safety warnings or interlock procedures in source"
  - "HTTP control not documented; only Telnet/RS-232 described"
  - "UDP protocol not mentioned in source"
  - "default serial parameters not stated (baud, parity, stop bits defaults unknown)"
  - "firmware version range compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:35:16.893Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions match source commands exactly; transport parameters documented. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Atlona AT-UHD-SW-5000ED Control Spec

## Summary
HDMI switcher with 5 inputs and 2 outputs. Controls via RS-232 or Telnet/TCP/IP. Supports input routing, display power control, audio volume, EDID management, and HDCP settings. Commands are case-sensitive, terminated with CR (0x0d), with 500ms delay between commands.

<!-- UNRESOLVED: HTTP/REST API not documented; only Telnet/RS-232 described -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default Telnet port stated in source
serial:
  baud_rate: null  # UNRESOLVED: baud rate not defaulted; CSpara lists 2400/4800/9600/19200/38400/57600/115200
  data_bits: null  # UNRESOLVED: defaults not stated; CSpara lists 7 or 8
  parity: null  # UNRESOLVED: defaults not stated; CSpara lists None/Odd/Even
  stop_bits: null  # UNRESOLVED: defaults not stated; CSpara lists 1 or 2
  flow_control: null  # UNRESOLVED: flow control not addressed in source
auth:
  type: login  # stated: IPLogin enables/disables credentials; default is "on" per IPLogin description
```

## Traits
```yaml
- powerable  # PWON, PWOFF, PWSTA present
- routable  # x1AVx1 routing commands present
- queryable  # PWSTA, Status, System commands present
- levelable  # VOUT1 volume control present
```

## Actions
```yaml
- id: pwon
  label: Power On
  kind: action
  params: []

- id: pwoff
  label: Power Off
  kind: action
  params: []

- id: pwsta
  label: Get Power State
  kind: query
  params: []
  response: enum [PWON, PWOFF]

- id: status
  label: Get Routing Status
  kind: query
  params: []

- id: system
  label: Get System Status
  kind: query
  params:
    - name: request
      type: string
      const: sta

- id: type
  label: Get Model/SKU
  kind: query
  params: []

- id: version
  label: Get Firmware Version
  kind: query
  params: []

- id: x1avx1
  label: Route Input to Output
  kind: action
  params:
    - name: input
      type: integer
      range: [1, 5]
      description: Input number (1-5)
    - name: output
      type: integer
      range: [1, 2]
      description: Output number (1-2)

- id: x1_
  label: Enable/Disable Output 1
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: x2_
  label: Enable/Disable Output 2
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: audioout
  label: Set Audio Output
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: vout1
  label: Set Audio Volume
  kind: action
  params:
    - name: level
      type: variant
      variants:
        - type: string
          enum: [+, -]
        - type: integer
          range: [-80, 15]
        - type: string
          const: sta

- id: voutmute1
  label: Set Audio Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: display
  label: Trigger Display Power
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: autodispon
  label: Set Auto Display On
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: autodispoff
  label: Set Auto Display Off
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: autopwrmode
  label: Set Auto Power Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DISPAVON, DISPAVSW, AVSW, sta]

- id: autosw
  label: Set Auto Switching
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: edidmset
  label: Assign EDID to Input
  kind: action
  params:
    - name: input
      type: integer
      range: [1, 5]
    - name: edid_preset
      type: integer
      range: [1, 17]

- id: edidcopy
  label: Copy EDID to Memory
  kind: action
  params:
    - name: output
      type: integer
      range: [1, 2]
    - name: memory_location
      type: integer
      range: [1, 8]

- id: hdcpset
  label: Set HDCP Reporting Mode
  kind: action
  params:
    - name: input
      type: integer
      range: [1, 5]
    - name: state
      type: enum
      values: [on, off, auto, sta]

- id: broadcast
  label: Set Broadcast Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: feedbacksw
  label: Set Feedback Verification
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: lock
  label: Lock Front Panel
  kind: action
  params: []

- id: unlock
  label: Unlock Front Panel
  kind: action
  params: []

- id: pwlock
  label: Lock Power Button
  kind: action
  params: []

- id: blink
  label: Blink Power LED
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: mreset
  label: Factory Reset
  kind: action
  params: []

- id: reboot
  label: Soft Reboot
  kind: action
  params: []

- id: ipcfg
  label: Get Network Settings
  kind: query
  params: []

- id: ipdhcp
  label: Set DHCP Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: ipstatic
  label: Set Static IP
  kind: action
  params:
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway
      type: string

- id: iplogin
  label: Set Telnet Login
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: ipadduser
  label: Add User
  kind: action
  params:
    - name: username
      type: string
      max_length: 20
    - name: password
      type: string
      max_length: 20

- id: ipdeluser
  label: Delete User
  kind: action
  params:
    - name: username
      type: string

- id: ipport
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      range: [0, 65535]

- id: iptimeout
  label: Set Session Timeout
  kind: action
  params:
    - name: interval
      type: integer
      range: [1, 60000]

- id: ipquit
  label: Close Telnet Session
  kind: action
  params: []

- id: cspara
  label: Set RS-232 Port Parameters
  kind: action
  params:
    - name: config
      type: object
      properties:
        baud_rate:
          type: integer
          enum: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
        data_bits:
          type: integer
          enum: [7, 8]
        parity:
          type: string
          enum: [None, Odd, Even]
        stop_bits:
          type: integer
          enum: [1, 2]

- id: trigip
  label: Send IP Command to Display
  kind: action
  params:
    - name: tcp
      type: integer
      range: [1, 2]
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]

- id: trigrs
  label: Send RS-232 Command to Display
  kind: action
  params:
    - name: zone
      type: integer
      const: 1
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]

- id: trigcec
  label: Send CEC Command to Display
  kind: action
  params:
    - name: zone
      type: integer
      const: 1
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]

- id: setcmd
  label: Assign Command to Button
  kind: action
  params:
    - name: action
      type: enum
      values: [on, off, vol+, vol-, mute, fbkoff, fbkon, fbkmute]
    - name: command
      type: string

- id: setend
  label: Set EOL Character
  kind: action
  params:
    - name: action
      type: enum
      values: [on, off, vol+, vol-, mute]
    - name: eol
      type: enum
      values: [None, CR, LF, CR-LF, Space, STX, ETX, Null]

- id: irfon
  label: Enable IR Receiver
  kind: action
  params: []

- id: iroff
  label: Disable IR Receiver
  kind: action
  params: []

- id: diswarmup
  label: Set Display Warm-Up Time
  kind: action
  params:
    - name: seconds
      type: integer
      range: [0, 300]

- id: lampcool
  label: Set Lamp Cool-Down Time
  kind: action
  params:
    - name: seconds
      type: integer
      range: [0, 300]

- id: pwrkeymode
  label: Set Power Key Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DISPAVON, DISPAVSW, AVSW, ALWAYSON]

- id: buttonpower
  label: Assign Power Button Protocol
  kind: action
  params:
    - name: protocol
      type: enum
      values: [NONE, CEC, RS-232, IP, sta]

- id: buttonvol
  label: Assign Volume Button Protocol
  kind: action
  params:
    - name: protocol
      type: enum
      values: [AUD, RS-232, IP, sta]

- id: ctltype
  label: Set Display Control Protocol
  kind: action
  params:
    - name: protocol
      type: enum
      values: [rs-232, ip, cec, sta]

- id: repeatcmd
  label: Set Repeat Command Feature
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]

- id: repcmtime
  label: Set Repeat Command Count
  kind: action
  params:
    - name: count
      type: integer
      range: [2, 4]

- id: rs232para
  label: Set HDBaseT RS-232 Parameters
  kind: action
  params:
    - name: input
      type: integer
      range: [1, 3]
    - name: config
      type: object
      properties:
        baud_rate:
          type: integer
          enum: [2400, 9600, 19200, 38400, 56000, 57600, 115200]
        data_bits:
          type: integer
          enum: [7, 8]
        parity:
          type: string
          enum: [None, Odd, Even]
        stop_bits:
          type: integer
          enum: [1, 2]

- id: rs232zone
  label: Send Command to HDBaseT Zone
  kind: action
  params:
    - name: zone
      type: integer
      range: [1, 3]
    - name: command
      type: string
- id: cliipaddr
  label: Set Controlled Device IP Address
  kind: action
  params:
    - name: ip_address
      type: string
      description: IP address in dot-decimal notation (0 ... 255 per byte); DHCP must be disabled first

- id: climode
  label: Set Controlled Device Login Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [login, non-login, sta]

- id: clipass
  label: Set Controlled Device Password
  kind: action
  params:
    - name: password
      type: string
      max_length: 20

- id: cliport
  label: Set Controlled Device Listening Port
  kind: action
  params:
    - name: port
      type: variant
      variants:
        - type: integer
          range: [0, 65535]
        - type: string
          const: sta

- id: cliuser
  label: Set Controlled Device Username
  kind: action
  params:
    - name: username
      type: string
      max_length: 20

- id: help
  label: List Available Commands
  kind: query
  params:
    - name: command
      type: string
      optional: true
      description: Command name for command-specific help
```

## Feedbacks
```yaml
# Feedback strings from source:
# - "Command FAILED" for invalid commands
# - Each command echoes itself on success
# - Power states: PWON, PWOFF
# - Routing status: e.g. "x2AVx1"
# - System response includes Model, MAC Addr, IP, Firmware version, etc.
```

## Variables
```yaml
# Audio volume level
- id: audio_volume_level
  label: Audio Volume Level
  type: integer
  range: [-80, 15]
  readable: true
  writable: true

# Audio mute state
- id: audio_mute_state
  label: Audio Mute State
  type: enum
  values: [on, off]
  readable: true
  writable: true

# Broadcast mode
- id: broadcast_mode
  label: Broadcast Mode
  type: enum
  values: [on, off]
  readable: true
  writable: true

# Feedback verification
- id: feedback_verification
  label: Feedback Verification
  type: enum
  values: [on, off]
  readable: true
  writable: true
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step macro sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are case-sensitive
- Each command terminated with carriage-return (0x0d); feedback terminated with CR+LF (0x0a)
- 500ms delay required between commands
- Command syntax varies: some use space before brackets, some don't; some require brackets, some don't
- Default Telnet port: 23
- Default login: enabled (IPLogin default is "on")
- Default password: "Atlona" per CliPass description
- "Command FAILED" returned when command fails or entered incorrectly
- Output enable/disable commands (x1$, x2$) control each output independently
- Routing command syntax example "x2AVx1" routes input 2 to output 1
- Volume level range: -80 to +15 dB
- EDID presets 1-17 include various resolutions (720P, 1080P, 1280x800, 1366x768, 2160P, 4K420)
- HDCP modes: on (compliant), off (non-compliant), auto (display-driven)
- IR receiver can be enabled/disabled; POWER button LED can blink for unit identification
- Front panel lock prevents accidental button presses
- Multiple control paths to display: IP, RS-232, CEC via TrigIP/TrigRS/TrigCEC
<!-- UNRESOLVED: HTTP control not documented; only Telnet/RS-232 described -->
<!-- UNRESOLVED: UDP protocol not mentioned in source -->
<!-- UNRESOLVED: default serial parameters not stated (baud, parity, stop bits defaults unknown) -->
<!-- UNRESOLVED: firmware version range compatibility not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-UHD-SW-5000ED_API.pdf
  - https://atlona.com/pdf/AT-HDVS-200-TX_TX-PSK_API.pdf
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-SW-5000ED.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-HDVS-200-TX.zip
retrieved_at: 2026-05-22T15:20:43.042Z
last_checked_at: 2026-10-01T06:35:16.893Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:35:16.893Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions match source commands exactly; transport parameters documented. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/REST API not documented; only Telnet/RS-232 described"
- "baud rate not defaulted; CSpara lists 2400/4800/9600/19200/38400/57600/115200"
- "defaults not stated; CSpara lists 7 or 8"
- "defaults not stated; CSpara lists None/Odd/Even"
- "defaults not stated; CSpara lists 1 or 2"
- "flow control not addressed in source"
- "unsolicited event notifications not documented in source"
- "multi-step macro sequences not documented in source"
- "no safety warnings or interlock procedures in source"
- "HTTP control not documented; only Telnet/RS-232 described"
- "UDP protocol not mentioned in source"
- "default serial parameters not stated (baud, parity, stop bits defaults unknown)"
- "firmware version range compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
