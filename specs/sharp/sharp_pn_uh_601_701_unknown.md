---
spec_id: admin/sharp-pn-uh-601-701
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-UH 601 701 Control Spec"
manufacturer: Sharp
model_family: PN-UH601
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-UH601
    - PN-UH701
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-UH601_701_Operation_Manual.pdf
retrieved_at: 2026-06-12T04:58:19.970Z
last_checked_at: 2026-06-12T19:41:20.869Z
generated_at: 2026-06-12T19:41:20.869Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "pictures showing command format, parameter layout, and response code format were omitted from refined source"
  - "TCP port not stated in source (\"Set a port number on the TV menu (Control port)\")"
  - "unsolicited notifications not documented in source"
  - "no multi-step sequences described in source"
  - "source notes Power On requires \"Quick Start Mode\" = On; this is a"
  - "TCP port number not stated in source; firmware compatibility ranges not stated; pictures showing command/response frame format were omitted from refined source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:41:20.869Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions map to source command table; transport parameters confirmed; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sharp PN-UH 601 701 Control Spec

## Summary
RS-232C and IP control spec for Sharp PN-UH601/PN-UH701 professional LCD monitors. Commands are 8 ASCII codes terminated with CR; PC sends command, monitor replies with OK/ERR response.

<!-- UNRESOLVED: pictures showing command format, parameter layout, and response code format were omitted from refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source ("Set a port number on the TV menu (Control port)")
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source: "When you set your ID and password on the TV menu, you need to enter them as soon as you connect to the TV"
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "POWR0___"  # PO WR 0 _ _ _ (Power Off)
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWR1___"  # PO WR 1 _ _ _ (Power On; requires Quick Start Mode = On)
  params: []

- id: power_on_low_baud
  label: Power On via RS-232C at 9,600 baud
  kind: action
  command: "POWR1___"  # 8 ASCII codes + CR
  params: []
  notes: "Use when Quick mode is Off and display power is off. Set PC baud to 9,600 before sending. Baud auto-reverts after."

- id: input_toggle
  label: Input Toggle
  kind: action
  command: "ITGD____"  # IT GD _ _ _ _
  params: []

- id: input_select_tv
  label: Input Select TV
  kind: action
  command: "ITVD0___"  # IT VD 0 _ _ _
  params: []

- id: input_select
  label: Input Select (0-5)
  kind: action
  command: "IAVD{0-5}__"  # IA VD * _ _ _  (0:TV, 1:HDMI1, 2:HDMI2, 3:VIDEO, 4:USB, 5:Home Network)
  params:
    - name: input
      type: integer
      description: 0=TV, 1=HDMI IN 1, 2=HDMI IN 2, 3=VIDEO IN, 4=USB, 5=Home Network

- id: wide_mode
  label: Wide Mode
  kind: action
  command: "WIDE{**}_"  # WI DE * * _ _  (0:Toggle, 1:Normal, 2:Zoom14:9, 3:Panorama, 4:Full, 5:Cinema16:9, 6:Cinema14:9, 10:DotByDot, 14:Overscan)
  params:
    - name: mode
      type: integer
      description: 0-14 per CONTROL CONTENTS

- id: av_mode
  label: AV Mode Selection
  kind: action
  command: "AVMD{*}___"  # AV MD * _ _ _  (0:Toggle, 1:STANDARD, 2:MOVIE, 4:USER, 5:DYNAMIC, 6:DYNAMIC(Fixed))
  params:
    - name: mode
      type: integer
      description: 0,1,2,4,5,6

- id: mute
  label: Mute
  kind: action
  command: "MUTE{*}___"  # MU TE * _ _ _  (0:Toggle, 1:On, 2:Off)
  params:
    - name: state
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: volume_set
  label: Volume Set
  kind: action
  command: "VOLM{***}_"  # VO LM * * * _  Volume 0-100
  params:
    - name: level
      type: integer
      description: Volume 0-100

- id: channel_analog
  label: Direct Channel (Analog)
  kind: action
  command: "DCCH{***}_"  # DC CH * * * _  Channel 1-135
  params:
    - name: channel
      type: integer
      description: Analog channel 1-135 (Air 2-69, Cable 1-135)

- id: surround
  label: Surround
  kind: action
  command: "ACSU{*}___"  # AC SU * _ _ _  (0:Toggle, 1:On, 2:Off)
  params:
    - name: state
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: audio_selection
  label: Audio Selection (Toggle)
  kind: action
  command: "ACHA____"  # AC HA _ _ _ _
  params: []

- id: channel_digital_air
  label: Direct Channel (Digital Air, two-part)
  kind: action
  command: "DA2P{****}"  # DA 2P * * * *  (0100-9999)
  params:
    - name: channel
      type: integer
      description: Two-part number 0100-9999

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "OFTM{*}___"  # OF TM * _ _ _  (0:Off, 1:30min, 2:1h, 3:1h30, 4:2h, 5:2h30)
  params:
    - name: setting
      type: integer
      description: 0=Off, 1=0:30, 2=1:00, 3=1:30, 4=2:00, 5=2:30

- id: channel_digital_cable_major
  label: Direct Channel (Digital Cable, major)
  kind: action
  command: "DC2U{***}_"  # DC 2U * * * _  (1-999)
  params:
    - name: major
      type: integer
      description: Major channel 1-999

- id: channel_digital_cable_minor
  label: Direct Channel (Digital Cable, minor)
  kind: action
  command: "DC2L{***}_"  # DC 2L * * * _  (0-999)
  params:
    - name: minor
      type: integer
      description: Minor channel 0-999

- id: channel_digital_cable_one_part_low
  label: Direct Channel (Digital Cable, one-part <10000)
  kind: action
  command: "DC10{****}"  # DC 10 * * * *  (0-6383)
  params:
    - name: channel
      type: integer
      description: One-part number 0-6383

- id: channel_digital_cable_one_part_high
  label: Direct Channel (Digital Cable, one-part >=10000)
  kind: action
  command: "DC11{****}"  # DC 11 * * * *  (0-9999)
  params:
    - name: channel
      type: integer
      description: One-part number 0-9999

- id: channel_up
  label: Channel Up
  kind: action
  command: "CHUP____"  # CH UP _ _ _ _
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  command: "CHDW____"  # CH DW _ _ _ _
  params: []

- id: closed_caption_toggle
  label: Closed Caption Toggle
  kind: action
  command: "CLCPx___"  # CL CP x _ _ _  (x = any digit; toggle)
  params: []

- id: device_name
  label: Device Name (Query)
  kind: query
  command: "TVNM1___"  # TV NM 1 _ _ _ _
  params: []

- id: model_name
  label: Model Name (Query)
  kind: query
  command: "MNRD1___"  # MN RD 1 _ _ _ _
  params: []

- id: software_version
  label: Software Version (Query)
  kind: query
  command: "SWVN1___"  # SW VN 1 _ _ _ _
  params: []

- id: ip_protocol_version
  label: IP Protocol Version (Query)
  kind: query
  command: "IPPV1___"  # IP PV 1 _ _ _ _
  params: []

- id: remote_key
  label: Remote Control Button
  kind: action
  command: "RCKY{**}_"  # RC KY * * _ _  (0-9:0-9, 10:DOT, 12:POWER, 13:DISPLAY, 23:OPTION, 24:SLEEP, 31:MUTE, 32:VOL-, 33:VOL+, 34:CHup, 35:CHdn, 36:INPUT, 38:MENU, 39:APPS, 40:ENTER, 45:RETURN, 46:EXIT, 49:AUDIO, 50:A/red, 51:B/green, 52:C/blue, 53:D/yellow, 61:MANUAL)
  params:
    - name: key
      type: integer
      description: Key code per CONTROL CONTENTS

- id: baud_rate_9600
  label: Set RS-232C Baud Rate 9,600
  kind: action
  command: "BAUD0096"  # BA UD 0 0 9 6
  params: []

- id: baud_rate_115200
  label: Set RS-232C Baud Rate 115,200
  kind: action
  command: "BAUD1152"  # BA UD 1 1 5 2
  params: []
```

## Feedbacks
```yaml
# Response format details not present in refined source (picture omitted)
# Per source, monitor returns OK on success or ERR when parameter out of range
- id: response_ok
  type: enum
  values: [ok]
- id: response_err
  type: enum
  values: [err]
  description: Returned when input parameter is not within adjustable range
```

## Variables
```yaml
# Source defines command-parameterized values (volume, channel, mode enums)
# No persistent variable setters beyond per-command parameters
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes Power On requires "Quick Start Mode" = On; this is a
# device-side menu precondition rather than a host-side interlock. No explicit
# safety warnings or interlocks documented.
```

## Notes
- IP control uses TCP; Telnet and SSH must NOT be selected as service (per source: "None (Do not select Telnet or SSH)").
- TCP port is configured on the TV menu ("Control port") — not stated as a fixed value in source.
- TCP session times out after 3 minutes of no communication.
- TCP requires login ID + password set on TV menu (entered on connect).
- Command framing: 8 ASCII codes + CR. Underbar `_` in parameter column = space. Asterisk `*` = user-supplied value from CONTROL CONTENTS.
- Pictures showing exact command frame, parameter layout, and response code format were omitted from refined source; only the table of opcodes is fully present.
- RS-232C connects via SERVICE ONLY minijack terminal (requires conversion cable, not standard D-sub).
- Baud rate change commands exist; Power-On via RS-232C at 9,600 baud is supported when display is off and Quick mode is Off (baud auto-reverts after).
- Wake-on-LAN (Magic Packet) supported when Wake on Wi-Fi/LAN = Enable and Quick Start = Off.
```

<!-- UNRESOLVED: TCP port number not stated in source; firmware compatibility ranges not stated; pictures showing command/response frame format were omitted from refined source -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-UH601_701_Operation_Manual.pdf
retrieved_at: 2026-06-12T04:58:19.970Z
last_checked_at: 2026-06-12T19:41:20.869Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:41:20.869Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions map to source command table; transport parameters confirmed; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "pictures showing command format, parameter layout, and response code format were omitted from refined source"
- "TCP port not stated in source (\"Set a port number on the TV menu (Control port)\")"
- "unsolicited notifications not documented in source"
- "no multi-step sequences described in source"
- "source notes Power On requires \"Quick Start Mode\" = On; this is a"
- "TCP port number not stated in source; firmware compatibility ranges not stated; pictures showing command/response frame format were omitted from refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
