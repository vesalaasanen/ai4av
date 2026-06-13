---
spec_id: admin/sharp-4t-b70cj1u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp 4T-B70CJ1U Control Spec"
manufacturer: Sharp
model_family: 4T-B70CJ1U
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - 4T-B70CJ1U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - manualslib.com
  - proav.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://www.manualslib.com/manual/3235123/SHARP-AQUOS-4T-80CJ1U.html
  - https://proav.sharpusa.com/products/displays/4T-B80CJ1U
retrieved_at: 2026-04-29T12:24:30.113Z
last_checked_at: 2026-06-12T19:38:25.691Z
generated_at: 2026-06-12T19:38:25.691Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP port number not stated in source, must configure via TV menu"
  - "specific response code format (normal vs problem) not shown in source table"
  - "port number set via TV menu, no default stated"
  - "ID/password configurable via TV menu, type not specified"
  - "no settable parameters beyond discrete actions"
  - "no unsolicited notifications described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "response code format (normal/problem) mentioned but specific codes not listed in source"
  - "TCP port default not stated, must configure via TV menu"
  - "auth.type not specified (ID/password configurable but type unknown)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:38:25.691Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched literally in source command table; transport parameters verified verbatim; complete coverage of source commands. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Sharp 4T-B70CJ1U Control Spec

## Summary
Sharp consumer TV supporting TCP/IP and RS-232C control. Command format: 4-char ASCII command + 4-char parameter (left-aligned, space-padded) + CR. RS-232C default 115200 8N1. TCP port and optional ID/password are set via the TV menu. Connection drops after 3 minutes of inactivity.

<!-- UNRESOLVED: IP port number not stated in source, must configure via TV menu -->
<!-- UNRESOLVED: specific response code format (normal vs problem) not shown in source table -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: port number set via TV menu, no default stated
  port: null
  notes: "Service: None (Do not select Telnet or SSH). Host IP address set on TV menu."
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # UNRESOLVED: ID/password configurable via TV menu, type not specified
  type: null
  notes: "When ID and password set on TV menu, must be entered as soon as the TCP connection is established."
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "POWR0___\r"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWR1___\r"
  params: []

- id: input_toggle
  label: Input Selection (Toggle)
  kind: action
  command: "ITGD0___\r"
  params: []

- id: input_tv
  label: Input Selection (TV)
  kind: action
  command: "ITVD0___\r"
  params: []

- id: wide_mode
  label: Wide Mode
  kind: action
  command: "WIDE{*___}\r"
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=Normal, 2=Zoom 14:9, 3=Panorama, 4=Full, 5=Cinema 16:9, 6=Cinema 14:9, 10=Dot by Dot, 14=Overscan

- id: select_input
  label: Input Selection (0-5)
  kind: action
  command: "IAVD{*___}\r"
  params:
    - name: input
      type: integer
      description: 0=TV, 1=HDMI IN 1, 2=HDMI IN 2, 3=VIDEO IN, 4=USB, 5=Home Network

- id: av_mode
  label: AV Mode Selection
  kind: action
  command: "AVMD{*___}\r"
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=STANDARD, 2=MOVIE, 4=USER, 5=DYNAMIC, 6=DYNAMIC (Fixed)

- id: mute
  label: Mute
  kind: action
  command: "MUTE{*___}\r"
  params:
    - name: state
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: volume
  label: Volume
  kind: action
  command: "VOLM{****}\r"
  params:
    - name: level
      type: integer
      description: Volume 0-100

- id: surround
  label: Surround
  kind: action
  command: "ACSU{*___}\r"
  params:
    - name: state
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: audio_selection_toggle
  label: Audio Selection (Toggle)
  kind: action
  command: "ACHA0___\r"
  params: []

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "OFTM{*___}\r"
  params:
    - name: minutes
      type: integer
      description: 0=Off, 1=30min, 2=60min, 3=90min, 4=120min, 5=150min

- id: direct_channel_analog
  label: Direct Channel (Analog)
  kind: action
  command: "DCCH{***_}\r"
  params:
    - name: channel
      type: integer
      description: Channel 1-135 (Air 2-69, Cable 1-135)

- id: direct_channel_digital_air_two_part
  label: Direct Channel (Digital Air Two-Part)
  kind: action
  command: "DA2P{****}\r"
  params:
    - name: channel
      type: integer
      description: 0100-9999 (major+minor, 2-digit + 2-digit)

- id: direct_channel_digital_cable_front
  label: Direct Channel (Digital Cable Two-Part Front)
  kind: action
  command: "DC2U{***_}\r"
  params:
    - name: channel
      type: integer
      description: 1-999 (major channel, front half of two-part cable number)

- id: direct_channel_digital_cable_rear
  label: Direct Channel (Digital Cable Two-Part Rear)
  kind: action
  command: "DC2L{***_}\r"
  params:
    - name: channel
      type: integer
      description: 0-999 (minor channel, rear half of two-part cable number)

- id: direct_channel_digital_cable_one_part_less
  label: Direct Channel (Digital Cable One-Part <10000)
  kind: action
  command: "DC10{****}\r"
  params:
    - name: channel
      type: integer
      description: 0-6383

- id: direct_channel_digital_cable_one_part_more
  label: Direct Channel (Digital Cable One-Part >10000)
  kind: action
  command: "DC11{****}\r"
  params:
    - name: channel
      type: integer
      description: 0-9999

- id: channel_up
  label: Channel Up
  kind: action
  command: "CHUP0___\r"
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  command: "CHDW0___\r"
  params: []

- id: closed_caption_toggle
  label: Closed Caption Toggle
  kind: action
  command: "CLCPx___\r"
  params: []

- id: remote_button
  label: Remote Control Button
  kind: action
  command: "RCKY{****}\r"
  params:
    - name: button
      type: integer
      description: 0-9=0-9, 10=DOT, 12=POWER, 13=DISPLAY, 23=OPTION, 24=SLEEP, 31=MUTE, 32=VOL-, 33=VOL+, 34=CH-, 35=CH+, 36=INPUT, 38=MENU, 39=APPS, 40=ENTER, 41=up, 42=down, 43=left, 44=right, 45=RETURN, 46=EXIT, 49=AUDIO, 50=A (red), 51=B (green), 52=C (blue), 53=D (yellow), 61=MANUAL

- id: baud_rate_change_9600
  label: RS232C Baud Rate Change (9600)
  kind: action
  command: "BAUD0096\r"
  params: []

- id: baud_rate_change_115200
  label: RS232C Baud Rate Change (115200)
  kind: action
  command: "BAUD1152\r"
  params: []

- id: power_state_query
  label: Power State Query
  kind: query
  command: "POWR?___\r"
  params: []

- id: device_name_query
  label: Device Name Query
  kind: query
  command: "TVNM1___\r"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "MNRD1___\r"
  params: []

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "SWVN1___\r"
  params: []

- id: ip_protocol_version_query
  label: IP Protocol Version Query
  kind: query
  command: "IPPV1___\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: Query via POWR?___ (POWR0 = Off/Standby, POWR1 = On)

- id: device_name
  type: string
  description: Query via TVNM1___

- id: model_name
  type: string
  description: Query via MNRD1___

- id: software_version
  type: string
  description: Query via SWVN1___

- id: ip_protocol_version
  type: string
  description: Query via IPPV1___
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
# System boot messages are emitted on the SERVICE ONLY minijack during power on/off - ignore.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format: 4-char command + 4-char parameter (left-aligned, space-padded) + CR (8 ASCII codes total).
- Parameter chars: 0-9, x, blank, ? (x is wildcard for any digit; ? is query).
- "ERR" returned when parameter out of range.
- Connection drops after 3 min of no communication.
- Do NOT select Telnet or SSH service for IP control — service must be "None".
- Power On (POWR1___) requires "Initial Setup" → "Quick Start Mode" = On. If Quick Start is Off and "Wake on Wi-Fi/LAN" is Enable, power on is possible via Wake-on-LAN magic packet.
- When Quick Start is Off and the display is off, only POWR1___ works at 9600 baud; after sending it, the baud rate reverts to the prior setting.
- The SERVICE ONLY minijack outputs system boot messages during power on/off — ignore these.
- BAUD command switches RS-232C between 9600 and 115200.
- Wait for OK response before sending the next command (no concurrent commands).

<!-- UNRESOLVED: response code format (normal/problem) mentioned but specific codes not listed in source -->
<!-- UNRESOLVED: TCP port default not stated, must configure via TV menu -->
<!-- UNRESOLVED: auth.type not specified (ID/password configurable but type unknown) -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - manualslib.com
  - proav.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://www.manualslib.com/manual/3235123/SHARP-AQUOS-4T-80CJ1U.html
  - https://proav.sharpusa.com/products/displays/4T-B80CJ1U
retrieved_at: 2026-04-29T12:24:30.113Z
last_checked_at: 2026-06-12T19:38:25.691Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:38:25.691Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched literally in source command table; transport parameters verified verbatim; complete coverage of source commands. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP port number not stated in source, must configure via TV menu"
- "specific response code format (normal vs problem) not shown in source table"
- "port number set via TV menu, no default stated"
- "ID/password configurable via TV menu, type not specified"
- "no settable parameters beyond discrete actions"
- "no unsolicited notifications described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "response code format (normal/problem) mentioned but specific codes not listed in source"
- "TCP port default not stated, must configure via TV menu"
- "auth.type not specified (ID/password configurable but type unknown)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
