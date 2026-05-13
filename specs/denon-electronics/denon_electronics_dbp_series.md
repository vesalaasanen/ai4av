---
spec_id: admin/denon-dbp-2010
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics DBP-2010 Control Spec"
manufacturer: "Denon Electronics"
model_family: DBP-2010
aliases: []
compatible_with:
  manufacturers:
    - "Denon Electronics"
  models:
    - DBP-2010
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T22:58:43.331Z
last_checked_at: 2026-05-05T06:10:41.965Z
generated_at: 2026-05-05T06:10:41.965Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T06:10:41.965Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions matched literal command codes in source; transport parameters verified against serial interface specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Denon Electronics DBP-2010 Control Spec

## Summary
DVD/CD player controlled via RS-232C serial interface. Half-duplex ASCII command protocol with BCC checksum. Supports power, playback, disc navigation, audio/subtitle/angle selection, HDMI output, and setup menu interaction.

<!-- UNRESOLVED: RS-422A interface mentioned but pinout not detailed; RS-232C used as primary -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # Power ON / Power OFF commands present
- queryable  # Request System Status, Request CPU Version present
- routable   # Skip, DirectSelect, Cursor, Menu navigation present
- levelable  # Audio, Subtitle, Zoom, Dimmer, Picture Adjust present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Request power-on from standby. Command: STX, 20h, ETX, BCC

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Request standby. Command: STX, 21h, ETX, BCC

- id: play
  label: Play
  kind: action
  params: []
  description: Start disc playback. Command: STX, 40h, ETX, BCC

- id: stop
  label: Stop
  kind: action
  params: []
  description: Stop playback. Command: STX, 41h, ETX, BCC

- id: pause
  label: Pause
  kind: action
  params: []
  description: Pause playback. Command: STX, 42h, ETX, BCC

- id: skip
  label: Skip
  kind: action
  params:
    - name: direction
      type: enum
      values: ["+", "-"]
      description: Forward (+) or Reverse (-)
    - name: group_number
      type: integer
      description: Group/title number (3 digits BCD)
    - name: chapter_track_number
      type: integer
      description: Chapter/track number (4 digits BCD)
  description: Skip to next/previous track or chapter. Command: STX, 43h, direction, group, chapter/track, ETX, BCC

- id: slow_search
  label: Slow/Search
  kind: action
  params:
    - name: direction
      type: enum
      values: ["+", "-"]
      description: Forward (+) or Reverse (-)
    - name: speed_code
      type: hex
      description: Search speed code (31h-47h). See speed table.
  description: Scan disc at specified speed. Multiple sends required to reach target speed.

- id: setup
  label: Setup
  kind: action
  params: []
  description: Open initial setting menu. Valid only when status is Stop (B).

- id: top_menu
  label: Top Menu
  kind: action
  params: []
  description: Display DVD title menu. Valid for DVD-Video (1) and DVD-Audio (2).

- id: menu
  label: Menu
  kind: action
  params: []
  description: Display DVD root menu. Valid for DVD-Video (1) only.

- id: return
  label: Return
  kind: action
  params: []
  description: Return to previous setup/display menu.

- id: audio
  label: Audio Setting
  kind: action
  params:
    - name: direction
      type: enum
      values: ["+", "-"]
      description: Forward (+) or Reverse (-)
    - name: stream_code
      type: enum
      values: ["+", "-"]
      description: "+" = Primary, "-" = Secondary
  description: Select audio stream on BD/DVD. Returns current stream info.

- id: subtitle
  label: Subtitle Setting
  kind: action
  params:
    - name: direction
      type: enum
      values: ["+", "-"]
    - name: stream_code
      type: hex
      description: 31h=Primary, 32h=Primary Style, 33h=Secondary
  description: Select subtitle track. Returns stream and language info.

- id: angle
  label: Angle Setting
  kind: action
  params:
    - name: direction
      type: enum
      values: ["+", "-"]
  description: Change DVD angle. Returns current and total angle count.

- id: direct_select
  label: Direct Select
  kind: action
  params:
    - name: search_mode
      type: hex
      description: 31h=group/title, 32h=track/chapter
    - name: track_number
      type: integer
      description: 4-digit BCD track number
  description: Directly select track/chapter by number.

- id: cursor
  label: Cursor
  kind: action
  params:
    - name: direction
      type: enum
      values: [left, up, right, down]
      description: Move highlight on setup screen. Codes: 31h=LEFT, 32h=UP, 33h=RIGHT, 34h=DOWN
  description: Move cursor on setup screen.

- id: enter
  label: Enter
  kind: action
  params: []
  description: Confirm selection on setup menu.

- id: request_system_status
  label: Request System Status
  kind: action
  params: []
  description: Query full player status. Returns disc type, audio/video format, playmode, title/track/chapter info, elapsed time.

- id: request_cpu_version
  label: Request CPU Version
  kind: action
  params: []
  description: Query system, drive, and panel microcontroller versions.

- id: open_close
  label: Open/Close
  kind: action
  params: []
  description: Open or close disc tray. Command: STX, 61h, ETX, BCC

- id: hdmi_format
  label: HDMI Format
  kind: action
  params: []
  description: Change HDMI/DVI resolution. Command: STX, 64h, ETX, BCC
  # UNRESOLVED: specific resolution values not detailed in source

- id: program_direct
  label: Program/Direct
  kind: action
  params: []
  description: Set program play mode. Command: STX, 65h, ETX, BCC

- id: clear
  label: Clear
  kind: action
  params: []
  description: Clear programmed tracks. Command: STX, 66h, ETX, BCC

- id: display
  label: Display
  kind: action
  params: []
  description: Show on-screen information. Command: STX, 68h, ETX, BCC

- id: repeat
  label: Repeat
  kind: action
  params:
    - name: mode
      type: enum
      values: [repeat, a_b]
      description: "31h=REPEAT, 32h=A-B"
  description: Set repeat mode.

- id: random
  label: Random
  kind: action
  params: []
  description: Set random playback mode. Command: STX, 6Bh, ETX, BCC

- id: marker
  label: Marker
  kind: action
  params: []
  description: Show marker screen. Command: STX, 6Ch, ETX, BCC

- id: zoom
  label: Zoom
  kind: action
  params: []
  description: Expand picture. Command: STX, 6Dh, ETX, BCC
  # UNRESOLVED: specific zoom levels not detailed

- id: dimmer
  label: Dimmer
  kind: action
  params: []
  description: Adjust VFD luminance. Command: STX, 6Eh, ETX, BCC
  # UNRESOLVED: dimmer levels not detailed

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params: []
  description: Show picture adjustment menu. Command: STX, 6Fh, ETX, BCC

- id: pure_direct
  label: Pure Direct
  kind: action
  params:
    - name: mode
      type: enum
      values: [select, memory]
      description: "31h=SELECT, 32h=MEMORY"
  description: Pure direct mode control.

- id: auto_transfer_mode
  label: Auto Transfer Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [one_time, auto]
      description: "31h=One Time, 32h=Auto"
  description: Set status information auto-transfer mode.

- id: function
  label: Function
  kind: action
  params:
    - name: code
      type: enum
      values: [red, green, blue, yellow]
      description: "31h=RED, 32h=GREEN, 33h=BLUE, 34h=YELLOW"
  description: Execute disk-specific function (color buttons).

- id: main_sub
  label: Main/Sub
  kind: action
  params: []
  description: Toggle picture-in-picture main/sub stream. Command: STX, 73h, ETX, BCC

- id: mode
  label: Mode
  kind: action
  params: []
  description: Call various functions. Command: STX, 74h, ETX, BCC
  # UNRESOLVED: specific mode values not detailed in source
- id: hdmi_select
  label: HDMI Select
  kind: action
  params: []
  description: Select HDMI output mode. Command: STX, 63h, ETX, BCC

- id: call
  label: Call
  kind: action
  params: []
  description: Call/recall a programmed entry track. Command: STX, 67h, ETX, BCC
```

## Feedbacks
```yaml
- id: command_ok
  label: Command OK
  type: enum
  values: [20h]
  description: Command accepted. Returned as answer code.

- id: invalid_command
  label: Invalid Command
  type: enum
  values: [30h]
  description: Command not recognized.

- id: format_error
  label: Format Error
  type: enum
  values: [31h]
  description: Inappropriate command format.

- id: order_track_none
  label: Order Track None
  type: enum
  values: [32h]
  description: Specified track/chapter/title/group does not exist.

- id: order_time_none
  label: Order Time None
  type: enum
  values: [33h]
  description: Specified time does not exist.

- id: nak
  label: NAK
  type: enum
  values: [15h]
  description: Communication error - retransmit immediately.

- id: system_status
  label: System Status
  type: object
  description: Response to Request System Status. Contains disc type, audio format, channel, dialog, subtitle, angle, playmode, title/track/chapter numbers, elapsed time.
  fields:
    disc_type: string
    audio_format: string
    audio_channel: string
    dialog: string
    subtitle: string
    angle: integer
    playmode: string
    title_group: integer
    track_chapter: integer
    elapsed_time: string

- id: cpu_version
  label: CPU Version
  type: object
  description: Response to Request CPU Version. Contains system, drive, and panel microcon controller version numbers.
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters separate from actions observed in source.
# All observed parameters are command arguments rather than independent variables.
```

## Events
```yaml
# UNRESOLVED: no unsolicited status notifications described in source.
# The AUTO TRANSFER MODE command (71h) suggests optional auto-reporting capability
# but parameter details and trigger conditions not specified.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences described as macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: "Power switch turned on"
    description: "Unit cannot receive any commands for about 5 seconds after power switch is turned on."
  - condition: "Standby mode"
    description: "When in standby, unit only accepts OPEN/CLOSE, PLAY, POWER ON commands from front panel or IR remote. Serial command behavior in standby not fully specified."
# UNRESOLVED: no explicit interlock procedures for mechanical movement (disc tray) safety.
```

## Notes
Command interval MIN 40µsec between bytes. Host must wait for reply before issuing next command. Max command transmission time 40msec. Max answer-back latency 5sec. NAK response within 80msec of error detection. Unit retransmits answer within 40msec of receiving NAK from host. If no answer within 6sec, host retransmits command.

Protocol is half-duplex. BCC checksum computed over CC + PC0...PCn + ETX fields, expressed as two ASCII hex digits (BCCH high nibble, BCCL low nibble).

<!-- UNRESOLVED: RS-422A interface details not fully specified; only RS-232C pinout provided -->
<!-- UNRESOLVED: HDMI format command has no documented resolution/value table -->
<!-- UNRESOLVED: zoom levels and dimmer levels not documented -->
<!-- UNRESOLVED: Mode command functionality not detailed -->
<!-- UNRESOLVED: AUTO TRANSFER MODE auto-reporting trigger conditions not specified -->
<!-- UNRESOLVED: HDMISelect command (63h) listed in command table but no detailed spec in source -->
<!-- UNRESOLVED: CALL command (67h) listed in command table but no detailed spec in source -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T22:58:43.331Z
last_checked_at: 2026-05-05T06:10:41.965Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T06:10:41.965Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions matched literal command codes in source; transport parameters verified against serial interface specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
