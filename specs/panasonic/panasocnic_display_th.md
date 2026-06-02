---
spec_id: admin/panasonic-th_cq1-control-spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-86/75/65/55/50/43CQ1U Control Spec"
manufacturer: Panasonic
model_family: TH-86CQ1U
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-86CQ1U
    - TH-75CQ1U
    - TH-65CQ1U
    - TH-55CQ1U
    - TH-50CQ1U
    - TH-43CQ1U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - portal.7thsense.one
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - https://portal.7thsense.one/medialon-help/mxmPanasonicDisplayTH.html
retrieved_at: 2026-05-05T02:54:10.121Z
last_checked_at: 2026-05-05T05:41:49.532Z
generated_at: 2026-05-05T05:41:49.532Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power save mode behavior only documented as \"power status query returns 0 incl power save mode on/off\" — specific commands to configure power save not present"
  - "no discrete settable parameters beyond action commands"
  - "no unsolicited event documentation found in source"
  - "no multi-step macro sequences documented in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "power save mode configuration commands not documented"
  - "TV minor channel number handling not fully clarified"
  - "Telnet-specific behavior beyond socket protocol not detailed"
verification:
  verdict: verified
  checked_at: 2026-05-05T05:41:49.532Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched source commands with correct shapes and parameters; transport values verified against source; spec represents control command set comprehensively. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Panasonic TH-86/75/65/55/50/43CQ1U Control Spec

## Summary
4K LCD display supporting both RS-232C serial and LAN (TCP/IP socket) control. Commands for power, input routing, audio, picture, TV tuning, and network configuration. Default LAN credentials: `dispadmin` / `@Panasonic`.

<!-- UNRESOLVED: power save mode behavior only documented as "power status query returns 0 incl power save mode on/off" — specific commands to configure power save not present -->

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
  port: 10101  # LAN port (fixed)
auth:
  type: login  # default credentials required
  credentials:
    username: dispadmin
    password: "@Panasonic"
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
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
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: enum
      values:
        - TV1
        - HM1
        - HM2
        - PC1
        - UD1
      description: "TV1: TV, HM1: HDMI1, HM2: HDMI2, PC1: PC, UD1: USB"
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      range: [000, 100]
      description: "000 ~ 100"
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: mute
      type: enum
      values: [0, 1]
      description: "0: mute off, 1: mute on"
- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - FULL
        - NORM
        - NATV
        - ZOOM
      description: "FULL: Full, NORM: Normal, NATV: Native (Dot by Dot), ZOOM: Zoom"
- id: tv_channel_up
  label: TV Channel Up
  kind: action
  params: []
- id: tv_channel_down
  label: TV Channel Down
  kind: action
  params: []
- id: set_analog_tv_channel
  label: Set Analog TV Channel
  kind: action
  params:
    - name: source
      type: enum
      values: [0, 1]
      description: "0: Air, 1: Cable"
    - name: channel
      type: integer
      range: [002, 069]
      description: "Air: 002-069, Cable: 001-135"
- id: set_digital_tv_channel
  label: Set Digital TV Channel
  kind: action
  params:
    - name: source
      type: enum
      values: [0, 1]
      description: "0: Air, 1: Cable"
    - name: major_channel
      type: integer
      range: [0, 65535]
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - DYN
        - GRH
        - SPT
        - CNM
        - STD
        - CTM
      description: "DYN: Dynamic, GRH: Graphic, SPT: Sports, CNM: Cinema, STD: Standard, CTM: Custom"
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [000, 050]
      description: "000 ~ 050"
- id: lan_setup
  label: LAN Network Setup
  kind: action
  params:
    - name: ip_octets
      type: object
      properties:
        ip1: { type: integer, range: [0, 255] }
        ip2: { type: integer, range: [0, 255] }
        ip3: { type: integer, range: [0, 255] }
        ip4: { type: integer, range: [0, 255] }
        subnet1: { type: integer, range: [0, 255] }
        subnet2: { type: integer, range: [0, 255] }
        subnet3: { type: integer, range: [0, 255] }
        subnet4: { type: integer, range: [0, 255] }
        gateway1: { type: integer, range: [0, 255] }
        gateway2: { type: integer, range: [0, 255] }
        gateway3: { type: integer, range: [0, 255] }
        gateway4: { type: integer, range: [0, 255] }
        dhcp: { type: enum, values: [0, 1] }
- id: set_lan_username
  label: Set LAN Username
  kind: action
  params:
    - name: username
      type: string
      maxLength: 16
- id: set_lan_password
  label: Set LAN Password
  kind: action
  params:
    - name: password
      type: string
      maxLength: 16
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [0, 1]
  description: "0: Standby (Off, incl power save mode), 1: Power ON (On)"
- id: current_input
  label: Current Input
  type: enum
  values:
    - TV1
    - HM1
    - HM2
    - PC1
    - UD1
- id: current_volume
  label: Current Volume
  type: integer
  range: [000, 100]
- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values: [0, 1]
  description: "0: mute off, 1: mute on"
- id: aspect_status
  label: Aspect Ratio Status
  type: enum
  values:
    - FULL
    - NORM
    - NATV
    - ZOOM
- id: picture_mode_status
  label: Picture Mode Status
  type: enum
  values:
    - DYN
    - GRH
    - SPT
    - CNM
    - STD
    - CTM
- id: backlight_status
  label: Backlight Level Status
  type: integer
  range: [000, 050]
- id: lan_network_status
  label: LAN Network Settings
  type: object
  properties:
    ip_address: { type: string }
    subnet_mask: { type: string }
    gateway: { type: string }
    dhcp: { type: enum, values: [0, 1] }
- id: lan_username
  label: LAN Username
  type: string
- id: software_version
  label: Software Version
  type: string
  description: "Example: 1.0000"
- id: software_version_lan_mcu
  label: LAN MCU Software Version
  type: string
  description: "Example: 01.00"
- id: model_info
  label: Model Info
  type: object
  properties:
    size: { type: enum, values: [43, 50, 55, 65, 75, 86] }
    series: { type: string }
- id: serial_number
  label: Serial Number
  type: string
  description: "9 to 15 alphanumeric ASCII characters"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation found in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Serial command format: STX + [COMMAND] + [PARAMETERS] + ETX. Colons required even when no parameters.
- LAN uses TCP socket on port 10101. After connecting, login via username/password exchange.
- If no data exchanged for 1 minute over LAN, display disconnects for security.
- Wait for response before sending next serial command.
- Incorrect commands return `ER401`.
- Disconnect LAN: CTRL+C, CTRL+D, `BYE\r\n`, or FIN packet.
<!-- UNRESOLVED: power save mode configuration commands not documented -->
<!-- UNRESOLVED: TV minor channel number handling not fully clarified -->
<!-- UNRESOLVED: Telnet-specific behavior beyond socket protocol not detailed -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - portal.7thsense.one
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - https://portal.7thsense.one/medialon-help/mxmPanasonicDisplayTH.html
retrieved_at: 2026-05-05T02:54:10.121Z
last_checked_at: 2026-05-05T05:41:49.532Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:41:49.532Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched source commands with correct shapes and parameters; transport values verified against source; spec represents control command set comprehensively. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power save mode behavior only documented as \"power status query returns 0 incl power save mode on/off\" — specific commands to configure power save not present"
- "no discrete settable parameters beyond action commands"
- "no unsolicited event documentation found in source"
- "no multi-step macro sequences documented in source"
- "no explicit safety warnings or interlock procedures in source"
- "power save mode configuration commands not documented"
- "TV minor channel number handling not fully clarified"
- "Telnet-specific behavior beyond socket protocol not detailed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
