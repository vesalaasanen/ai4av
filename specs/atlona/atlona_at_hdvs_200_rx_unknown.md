---
spec_id: admin/atlona-at-hdvs-200-rx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDVS-200-RX Control Spec"
manufacturer: Atlona
model_family: AT-HDVS-200-RX
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDVS-200-RX
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
last_checked_at: 2026-05-14T21:31:27.668Z
generated_at: 2026-05-14T21:31:27.668Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:31:27.668Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched source commands by semantic intent; transport port verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Atlona AT-HDVS-200-RX Control Spec

## Summary
HDBaseT scaler with TCP/IP (Telnet) and RS-232 control interfaces. Supports video input routing, picture adjustment, audio volume, relay control, and network configuration. Command terminator is CR (0x0d); feedback terminator is CR+LF (0x0a).

<!-- UNRESOLVED: HDVS-200-RX is a receiver; source docs do not describe transmitter side (AT-HDVS-200-TX) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet port, from IPCFG / System feedback
  base_url: ""  # UNRESOLVED: HTTP base URL not stated in source
serial:
  baud_rate: null  # UNRESOLVED: RS-232 default baud rate not stated; configurable via RS232para and CSpara
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
auth:
  type: null  # UNRESOLVED: auth type configurable via IPLogin command; source does not state default
```

## Traits
```yaml
# evidence from source:
powerable: false  # no power on/off commands in source
routable: true   # Input command for active input selection
queryable: true  # sta argument on most commands
levelable: true  # VOUT (volume), BRT (brightness), CTRST (contrast), etc.
```

## Actions
```yaml
- id: aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Full, 1=16:9, 2=16:10, 3=4:3, 4=Keep Ratio, 5=Letterbox Top

- id: bass
  label: Adjust Bass
  kind: action
  params:
    - name: value
      type: integer
      description: -15 to 12, or +/-, or sta

- id: blink
  label: Set DN Button Blink
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: broadcast
  label: Set Broadcast Mode
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: brt
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100, or sta

- id: cspara
  label: Configure RS-232 2 Port
  kind: action
  params:
    - name: baud
      type: integer
      description: 2400, 4800, 9600, 19200, 38400, 57600, 115200
    - name: data_bits
      type: integer
      description: 7 or 8
    - name: parity
      type: integer
      description: 0=None, 1=Odd, 2=Even
    - name: stop_bits
      type: integer
      description: 1 or 2

- id: ctrst
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100, or sta

- id: hdbtrs232
  label: Configure HDBaseT IN Port
  kind: action
  params:
    - name: baud
      type: integer
      description: 2400, 4800, 9600, 19200, 38400, 57600, 115200
    - name: data_bits
      type: integer
      description: 7 or 8
    - name: parity
      type: integer
      description: 0=None, 1=Odd, 2=Even
    - name: stop_bits
      type: integer
      description: 1 or 2

- id: hdcpset
  label: Set HDCP Reporting Mode
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: hdmiaud
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: help
  label: Display Help
  kind: action
  params:
    - name: command
      type: string
      description: Optional command name

- id: hue
  label: Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100, or sta

- id: hzoom
  label: Set Horizontal Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 50, or sta

- id: input
  label: Set Active Input
  kind: action
  params:
    - name: source
      type: string
      description: HDMI, VGA, or sta
    - name: port
      type: integer
      description: 1 to 2 (required for HDMI)

- id: ipadduser
  label: Add Telnet User
  kind: action
  params:
    - name: username
      type: string
      description: Max 20 characters
    - name: password
      type: string
      description: Max 20 characters

- id: ipcfg
  label: Display Network Settings
  kind: action
  params: []

- id: ipdeluser
  label: Delete Telnet User
  kind: action
  params:
    - name: username
      type: string

- id: ipdhcp
  label: Set DHCP Mode
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: iplogin
  label: Set Login Requirement
  kind: action
  params:
    - name: state
      type: string
      description: on, off, or sta

- id: ipport
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: 0 to 65535, or sta

- id: ipstatic
  label: Set Static IP Configuration
  kind: action
  params:
    - name: ip
      type: string
      description: IP address in dot-decimal notation
    - name: subnet
      type: string
      description: Subnet mask in dot-decimal notation
    - name: gateway
      type: string
      description: Gateway address in dot-decimal notation

- id: iptimeout
  label: Set Telnet Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: 1 to 60000

- id: kitmode
  label: Display Model and IP Info
  kind: action
  params:
    - name: value
      type: string
      description: sta

- id: mreset
  label: Factory Reset
  kind: action
  params: []

- id: picturerst
  label: Reset Picture Settings
  kind: action
  params: []

- id: preftimg
  label: Set Preferred Input Timing
  kind: action
  params:
    - name: timing
      type: integer
      description: 0 to 9

- id: relayact
  label: Set Relay State
  kind: action
  params:
    - name: relay
      type: integer
      description: 1 to 2
    - name: state
      type: string
      description: open, close, sta

- id: relayauto
  label: Set Relay Auto Mode
  kind: action
  params:
    - name: state
      type: string
      description: on, off, ?

- id: relaypulsetime
  label: Set Relay Pulse Time
  kind: action
  params:
    - name: seconds
      type: integer
      description: 0 to 30, or sta

- id: relaytype
  label: Set Relay Type
  kind: action
  params:
    - name: type
      type: string
      description: pulse, closed, sta

- id: rs232para
  label: Configure RS-232 1 Port
  kind: action
  params:
    - name: baud
      type: integer
      description: 2400, 9600, 19200, 38400, 56000, 57600, 115200
    - name: data_bits
      type: integer
      description: 7 or 8
    - name: parity
      type: integer
      description: 0=None, 1=Odd, 2=Even
    - name: stop_bits
      type: integer
      description: 1 or 2

- id: rs232zone
  label: Send Command to Display
  kind: action
  params:
    - name: command
      type: string
      description: Command string sent through RS-232 1 to connected display

- id: satrt
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100, or sta

- id: sharp
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100, or sta

- id: system
  label: Display System Info
  kind: action
  params:
    - name: value
      type: string
      description: sta

- id: treble
  label: Adjust Treble
  kind: action
  params:
    - name: value
      type: integer
      description: -12 to 15, or +/-, or sta

- id: type
  label: Display Model
  kind: action
  params: []

- id: version
  label: Display Firmware Version
  kind: action
  params:
    - name: target
      type: string
      description: MCU or VSRX

- id: vidoutres
  label: Set Video Output Resolution
  kind: action
  params:
    - name: resolution
      type: integer
      description: 0 to 28, or sta

- id: vout
  label: Adjust Volume
  kind: action
  params:
    - name: value
      type: integer
      description: -80 to 6, or +/-, or no argument for sta

- id: voutmute
  label: Set Audio Mute
  kind: action
  params:
    - name: state
      type: string
      description: on, off, sta

- id: vzoom
  label: Set Vertical Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 50, or sta

- id: zoom
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: string
      description: on, off, sta
```

## Feedbacks
```yaml
# Feedback format: device echoes command and returns current value
# Example: "Aspect 1 Aspect 1"
# Most commands with sta argument return current value as feedback
- id: aspect_feedback
  type: string
  description: Echoes command and current aspect ratio value

- id: bass_feedback
  type: string
  description: Echoes command and current bass value

- id: blink_feedback
  type: string
  description: Echoes command and current blink setting

- id: broadcast_feedback
  type: string
  description: Echoes command and current broadcast mode

- id: brt_feedback
  type: string
  description: Echoes command and current brightness value

- id: cspara_feedback
  type: string
  description: Echoes bracketed RS-232 2 port configuration

- id: ctrst_feedback
  type: string
  description: Echoes command and current contrast value

- id: hdbtrs232_feedback
  type: string
  description: Echoes bracketed HDBaseT IN port configuration

- id: hdcpset_feedback
  type: string
  description: Echoes command and current HDCP setting

- id: hdmiaud_feedback
  type: string
  description: Echoes command and current HDMI audio setting

- id: help_feedback
  type: string
  description: Lists all available commands or help for specific command

- id: hue_feedback
  type: string
  description: Echoes command and current hue value

- id: hzoom_feedback
  type: string
  description: Echoes command and current horizontal zoom value

- id: input_feedback
  type: string
  description: Echoes command and current active input

- id: ipcfg_feedback
  type: string
  description: Network settings including IP address, netmask, gateway, IP port

- id: ipadduser_feedback
  type: string
  description: Confirms user added with "TCP/IP user was added"

- id: ipdeluser_feedback
  type: string
  description: Confirms user deleted with "TCP/IP user was deleted"

- id: ipdhcp_feedback
  type: string
  description: Echoes command and current DHCP setting

- id: iplogin_feedback
  type: string
  description: Echoes command and current login requirement setting

- id: ipport_feedback
  type: string
  description: Echoes command and current Telnet port

- id: ipstatic_feedback
  type: string
  description: Echoes command and static IP configuration

- id: iptimeout_feedback
  type: string
  description: Echoes command and current timeout interval

- id: kitmode_feedback
  type: string
  description: Model name and IP address of transmitter

- id: mreset_feedback
  type: string
  description: Echoes "Mreset" on factory reset

- id: picturerst_feedback
  type: string
  description: Echoes "PictureRst" on picture settings reset

- id: preftimg_feedback
  type: string
  description: Echoes command and preferred input timing

- id: relayact_feedback
  type: string
  description: Echoes command and relay state

- id: relayauto_feedback
  type: string
  description: Echoes command and current relay auto setting

- id: relaypulsetime_feedback
  type: string
  description: Echoes command and current pulse time

- id: relaytype_feedback
  type: string
  description: Echoes command and current relay type

- id: rs232para_feedback
  type: string
  description: Echoes bracketed RS-232 1 port configuration

- id: rs232zone_feedback
  type: string
  description: Echoes command sent to display device

- id: satrt_feedback
  type: string
  description: Echoes command and current saturation value

- id: sharp_feedback
  type: string
  description: Echoes command and current sharpness value

- id: system_feedback
  type: string
  description: Model, MAC address, address type, IP, netmask, gateway, HTTP port, Telnet port, firmware, uptime

- id: treble_feedback
  type: string
  description: Echoes command and current treble value

- id: type_feedback
  type: string
  description: Model name "AT-HDVS-200-RX"

- id: version_feedback
  type: string
  description: Firmware version string (e.g., "V1.1.28" for MCU)

- id: vidoutres_feedback
  type: string
  description: Echoes command and current output resolution

- id: vout_feedback
  type: string
  description: Echoes command and current volume value

- id: voutmute_feedback
  type: string
  description: Echoes command and current mute setting

- id: vzoom_feedback
  type: string
  description: Echoes command and current vertical zoom value

- id: zoom_feedback
  type: string
  description: Echoes command and current overscan setting
```

## Variables
```yaml
# No independent variables - all settable parameters are Actions with sta query capability
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 1 port (RS232para) sends commands to connected display device. RS-232 2 port (CSpara) controls the AT-HDVS-200-RX itself. HDBaseT IN port has its own serial config (HDBTRS232). Default Telnet port is 23, HTTP port is 80 (from System feedback). Default static IP is 192.168.1.254. Broadcast mode couples web GUI and Telnet control when enabled. RelayAuto "follow display status" ties relay state to projector power state.
<!-- UNRESOLVED: default IPLogin state (on/off) not stated in source -->
<!-- UNRESOLVED: default baud rate for RS-232 ports not stated in source -->
<!-- UNRESOLVED: RS-232 wiring diagram not in source -->
<!-- UNRESOLVED: maximum RS-232 command string length not stated in source -->

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
last_checked_at: 2026-05-14T21:31:27.668Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:31:27.668Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched source commands by semantic intent; transport port verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
