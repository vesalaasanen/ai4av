---
spec_id: admin/dynalite-pdeg
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dynalite PDEG Control Spec"
manufacturer: Dynalite
model_family: PDEG
aliases: []
compatible_with:
  manufacturers:
    - Dynalite
  models:
    - PDEG
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/ethernet_gateways/integration/dynet_text.html
retrieved_at: 2026-05-12T09:53:29.663Z
last_checked_at: 2026-10-01T13:26:45.830Z
generated_at: 2026-10-01T13:26:45.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number for Telnet access not stated in source."
  - "RS-485 baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "DyNet Text has no EEPROM section (per source), so defaults are session-scoped - no persistent variables listed."
  - "source documents unsolicited network traffic logged to console but does not define discrete event messages for the EG itself."
  - "no multi-step macro sequences described in source."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures."
  - "TCP Telnet port number not stated in source. UNRESOLVED: RS-485 serial parameters (baud/data/parity/stop/flow) not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-01T13:26:45.830Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions map to verbatim source commands across Logical, Physical, and Configuration tables; transport UNRESOLVED values are honest source gaps. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Dynalite PDEG Control Spec

## Summary
The Dynalite PDEG is an Ethernet Gateway (EG) that bridges DyNet lighting networks to external control systems. This spec covers the DyNet Text protocol, a text-based command set sent over RS-485 serial or TCP/Telnet that translates to DyNet1 and DyNet2 messages on the network.

<!-- UNRESOLVED: TCP port number for Telnet access not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: UNRESOLVED  # source does not state this (was null)
serial:
  baud_rate: null  # UNRESOLVED: RS-485 baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- levelable  # inferred from channel level set/query commands
- queryable  # inferred from query command examples (RCP, RCL, RLEDBr, etc.)
```

## Actions
```yaml
# Logical messages
- id: preset
  label: Set Preset
  kind: action
  command: "P {P} {A} {F} {J}"
  params:
    - name: P
      type: integer
      description: Preset Number (0-65279)
    - name: A
      type: integer
      description: Area (0=all, 0-65535)
    - name: F
      type: integer
      description: Fade time in ms (0-83885.91)
    - name: J
      type: integer
      description: Join level (0x00-0xFF)

- id: request_current_preset
  label: Request Current Preset
  kind: query
  command: "RCP {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: channel_level
  label: Fade to Channel Level
  kind: action
  command: "CL {Ch} {CL} {A} {F} {J}"
  params:
    - name: Ch
      type: integer
      description: Channel number (0=all, 0-65535)
    - name: CL
      type: integer
      description: Channel level percent (0-100)
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: ramp_level
  label: Ramp to Channel Level
  kind: action
  command: "RL {Ch} {CL} {A} {F} {J}"
  params:
    - name: Ch
      type: integer
      description: Channel number
    - name: CL
      type: integer
      description: Channel level percent
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: request_channel_level
  label: Request Current Channel Level
  kind: query
  command: "RCL {Ch} {A} {J}"
  params:
    - name: Ch
      type: integer
      description: Channel number
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: stop_fade
  label: Stop Fading in Area
  kind: action
  command: "SF {Ch} {A} {J}"
  params:
    - name: Ch
      type: integer
      description: Channel number
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: off
  label: Turn Off Area
  kind: action
  command: "O {A} {F} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: panic
  label: Panic Area
  kind: action
  command: "Panic {A} {F} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: unpanic
  label: Un-panic Area
  kind: action
  command: "Unpanic {A} {F} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: enable_panel
  label: Enable a Panel
  kind: action
  command: "SB {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: disable_panel
  label: Disable a Panel
  kind: action
  command: "DP {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: preset_offset
  label: Set Preset Offset
  kind: action
  command: "PO {PO} {A} {J}"
  params:
    - name: PO
      type: integer
      description: Preset offset (0-65279)
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: save_preset
  label: Push Current Preset
  kind: action
  command: "SP {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: restore_preset
  label: Pop Current Preset
  kind: action
  command: "RP {A} {F} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: reset_preset
  label: Reset Area to Last Used Preset
  kind: action
  command: "RSetP {A} {F} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: program_current_preset
  label: Program Current Levels to the Current Preset
  kind: action
  command: "PCP {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: program_preset
  label: Program Current Levels to a Given Preset
  kind: action
  command: "PP {P} {A} {J}"
  params:
    - name: P
      type: integer
      description: Preset number
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: led_brightness
  label: Set Indicator LEDs' Active Brightness
  kind: action
  command: "LEDBr {CL} {A} {F} {J}"
  params:
    - name: CL
      type: integer
      description: Channel level percent (0-100)
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: request_led_brightness
  label: Request Indicator LEDs' Active Brightness
  kind: query
  command: "RLEDBr {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: led_backlight_brightness
  label: Set Backlight LEDs' Brightness
  kind: action
  command: "LEDBlBr {CL} {A} {F} {J}"
  params:
    - name: CL
      type: integer
      description: Channel level percent (0-100)
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: request_led_backlight_brightness
  label: Request Backlight LEDs' Brightness
  kind: query
  command: "RLEDBlBr {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: lcd_brightness
  label: Set Display Brightness
  kind: action
  command: "LCDBr {CL} {A} {F} {J}"
  params:
    - name: CL
      type: integer
      description: Channel level percent (0-100)
    - name: A
      type: integer
      description: Area
    - name: F
      type: integer
      description: Fade time ms
    - name: J
      type: integer
      description: Join

- id: request_lcd_brightness
  label: Request Display Brightness
  kind: query
  command: "RLCDBr {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: set_temperature_setpoint
  label: Set Temperature Setpoint
  kind: action
  command: "STmpSP {Tmp} {A} {J}"
  params:
    - name: Tmp
      type: number
      description: Temperature in °C (-127.99 to 127.99)
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: temperature_setpoint_reply
  label: Send a Reply Temperature Setpoint Message
  kind: action
  command: "TmpSP {Tmp} {A} {J}"
  params:
    - name: Tmp
      type: number
      description: Temperature in °C
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: request_temperature_setpoint
  label: Request a Temperature Setpoint
  kind: query
  command: "RTmpSP {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: temperature_reply
  label: Send a Reply Actual Temperature Message
  kind: action
  command: "Tmp {Tmp} {A} {J}"
  params:
    - name: Tmp
      type: number
      description: Temperature in °C
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

- id: request_temperature
  label: Request Actual Temperature
  kind: query
  command: "RTmp {A} {J}"
  params:
    - name: A
      type: integer
      description: Area
    - name: J
      type: integer
      description: Join

# Physical messages
- id: reset_device
  label: Reset Device
  kind: action
  command: "Reset {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code (0x00-0xFF, 0xAA=Any)
    - name: BN
      type: integer
      description: Box number (0x0000-0xFFFF, 0x5555=Any)

- id: version
  label: Sign on Device
  kind: query
  command: "V {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: start_task
  label: Start Task Engine Task
  kind: action
  command: "STT {TN} {DC} {BN}"
  params:
    - name: TN
      type: integer
      description: Task number (0-255)
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: stop_task
  label: Stop Task Engine Task
  kind: action
  command: "SPT {TN} {DC} {BN}"
  params:
    - name: TN
      type: integer
      description: Task number
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: pause_task
  label: Pause Task Engine Task
  kind: action
  command: "PT {TN} {DC} {BN}"
  params:
    - name: TN
      type: integer
      description: Task number
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: trigger_event
  label: Trigger Event Scheduler Event
  kind: action
  command: "TE {EN} {DC} {BN}"
  params:
    - name: EN
      type: integer
      description: Event number (0-65535)
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: enable_event
  label: Enable Event Scheduler Event
  kind: action
  command: "EE {EN} {DC} {BN}"
  params:
    - name: EN
      type: integer
      description: Event number
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: disable_event
  label: Disable Event Scheduler Event
  kind: action
  command: "DE {EN} {DC} {BN}"
  params:
    - name: EN
      type: integer
      description: Event number
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: request_time
  label: Request Current Time
  kind: query
  command: "RT {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: request_date
  label: Request Date
  kind: query
  command: "RD {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: set_time
  label: Set Current Time
  kind: action
  command: "ST {H} {M} {S}"
  params:
    - name: H
      type: integer
      description: Hours (0-23)
    - name: M
      type: integer
      description: Minutes (0-59)
    - name: S
      type: integer
      description: Seconds (0-59)

- id: set_date
  label: Set Date
  kind: action
  command: "SD {DoW} {Day} {Mon} {Yr}"
  params:
    - name: DoW
      type: string
      description: Day of week (Sun..Sat)
    - name: Day
      type: integer
      description: Day of month (1-31)
    - name: Mon
      type: string
      description: Month (Jan..Dec)
    - name: Yr
      type: integer
      description: Year (0-99 or 2000-2099)

- id: set_physical_temperature_setpoint
  label: Set Physical Temperature Setpoint
  kind: action
  command: "SPhyTmpSP {DC} {BN} {Tmp}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number
    - name: Tmp
      type: number
      description: Temperature in °C

- id: physical_temperature_setpoint_reply
  label: Send a Reply Physical Temperature Setpoint Message
  kind: action
  command: "PhyTmpSP {DC} {BN} {Tmp}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number
    - name: Tmp
      type: number
      description: Temperature in °C

- id: request_physical_temperature_setpoint
  label: Request a Physical Temperature Setpoint
  kind: query
  command: "RPhyTmpSP {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

- id: physical_temperature_reply
  label: Send a Reply Physical Actual Temperature Message
  kind: action
  command: "PhyTmp {DC} {BN} {Tmp}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number
    - name: Tmp
      type: number
      description: Temperature in °C

- id: request_physical_temperature
  label: Request Physical Actual Temperature
  kind: query
  command: "RPhyTmp {DC} {BN}"
  params:
    - name: DC
      type: integer
      description: Device code
    - name: BN
      type: integer
      description: Box number

# Configuration messages
- id: set_default_area
  label: Set Default Area
  kind: action
  command: "A {A}"
  params:
    - name: A
      type: integer
      description: Area (0-65535)

- id: request_default_area
  label: Request Default Area
  kind: query
  command: "A?"

- id: set_default_fade
  label: Set Default Fade Time (ms)
  kind: action
  command: "F {F}"
  params:
    - name: F
      type: integer
      description: Fade time in ms (0-83885.91)

- id: request_default_fade
  label: Request Default Fade Time
  kind: query
  command: "F?"

- id: set_default_join
  label: Set Default Join
  kind: action
  command: "J {J}"
  params:
    - name: J
      type: integer
      description: Join (0x00-0xFF)

- id: request_default_join
  label: Request Default Join
  kind: query
  command: "J?"

- id: set_default_channel
  label: Set Default Channel
  kind: action
  command: "Ch {Ch}"
  params:
    - name: Ch
      type: integer
      description: Channel number (0-65535)

- id: request_default_channel
  label: Request Default Channel
  kind: query
  command: "Ch?"

- id: area_min_max
  label: Set Maximum and Minimum Areas of Interest
  kind: action
  command: "AMM {A} {A}"
  params:
    - name: A
      type: integer
      description: Min area
    - name: A
      type: integer
      description: Max area

- id: request_area_min_max
  label: Request Maximum and Minimum Areas
  kind: query
  command: "AMM?"

- id: brief
  label: Set to Short Display of Reply Messages
  kind: action
  command: "Brief"

- id: verbose
  label: Set to Long Display of Reply Messages
  kind: action
  command: "Verbose"

- id: reply_ok
  label: Set Whether OK is Printed After Each Command
  kind: action
  command: "ReplyOK {TF}"
  params:
    - name: TF
      type: integer
      description: 0 or 1

- id: settings
  label: Display Current Settings
  kind: query
  command: "Settings"

- id: who_are_you
  label: Ask Gateway Device to Sign on
  kind: query
  command: "WhoAreYou"

- id: echo
  label: Repeat the Command Back
  kind: action
  command: "Echo {TF}"
  params:
    - name: TF
      type: integer
      description: 0 or 1

- id: dotted_network_address
  label: Use "Device (??hex) Box??" or "??.??" for Physical Properties
  kind: action
  command: "DNA {TF}"
  params:
    - name: TF
      type: integer
      description: 0 or 1
```

## Feedbacks
```yaml
- id: preset_reply
  type: string
  description: Reply with current preset number, area, and join

- id: channel_level_reply
  type: string
  description: Reply with channel level (channel, area, target %, current %, join)

- id: led_brightness_reply
  type: string
  description: Reply with indicator LED brightness, area, and join

- id: led_backlight_brightness_reply
  type: string
  description: Reply with backlight LED brightness, area, and join

- id: lcd_brightness_reply
  type: string
  description: Reply with display brightness, area, and join

- id: temperature_setpoint_reply_logical
  type: string
  description: Reply with logical temperature setpoint, area, and join

- id: temperature_reply_logical
  type: string
  description: Reply with logical actual temperature, area, and join

- id: temperature_setpoint_reply_physical
  type: string
  description: Reply with physical temperature setpoint and device

- id: temperature_reply_physical
  type: string
  description: Reply with physical actual temperature and device

- id: version_reply
  type: string
  description: Signon reply with port, device, box, and version

- id: time_reply
  type: string
  description: Time reply in24h format with DST/standard indicator

- id: date_reply
  type: string
  description: Date reply with DoW, day, month, year

- id: time_date_reply
  type: string
  description: Combined time and date reply (DyNet2)

- id: ok_ack
  type: string
  description: "OK" acknowledgement after each command (suppressed when a configuration response follows)

- id: default_area_reply
  type: string
  description: "A=<Ad>"

- id: default_fade_reply
  type: string
  description: "F=<Fd>"

- id: default_join_reply
  type: string
  description: "J=<Jd>"

- id: default_channel_reply
  type: string
  description: "Ch=<Chd>"

- id: area_min_max_reply
  type: string
  description: "AMin=<Ad>, AMax=<Ad>"

- id: who_are_you_reply
  type: string
  description: "I am EG (dchex) Box <Bd>, <V>"

- id: settings_reply
  type: string
  description: Current DyNet Text engine settings
```

## Variables
```yaml
# UNRESOLVED: DyNet Text has no EEPROM section (per source), so defaults are session-scoped - no persistent variables listed.
```

## Events
```yaml
# UNRESOLVED: source documents unsolicited network traffic logged to console but does not define discrete event messages for the EG itself.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing procedures.
```

## Notes
DyNet Text commands and arguments are not case-sensitive. Over RS-485 each command must be preceded by an asterisk (`*`) as a synchronization character; over Telnet this is optional. Arguments may be separated by spaces and/or a single comma. Integer arguments accept decimal or `0x`-prefixed hex values. Temperature values use0.01°C resolution. Each Area/Fade/Join/Channel value used in a command becomes the new session default for that argument type (exceptions: AreaMinMax does not set default Area; JoinLevel sets default Join to its third argument). Typically, EG Port 1 is RS-485 and Port 2 is Ethernet/Telnet.

<!-- UNRESOLVED: TCP Telnet port number not stated in source. UNRESOLVED: RS-485 serial parameters (baud/data/parity/stop/flow) not stated in source. -->

## Provenance

```yaml
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/ethernet_gateways/integration/dynet_text.html
retrieved_at: 2026-05-12T09:53:29.663Z
last_checked_at: 2026-10-01T13:26:45.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T13:26:45.830Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions map to verbatim source commands across Logical, Physical, and Configuration tables; transport UNRESOLVED values are honest source gaps. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number for Telnet access not stated in source."
- "RS-485 baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "DyNet Text has no EEPROM section (per source), so defaults are session-scoped - no persistent variables listed."
- "source documents unsolicited network traffic logged to console but does not define discrete event messages for the EG itself."
- "no multi-step macro sequences described in source."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures."
- "TCP Telnet port number not stated in source. UNRESOLVED: RS-485 serial parameters (baud/data/parity/stop/flow) not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
