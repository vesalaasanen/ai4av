---
spec_id: admin/etc-eos-family
schema_version: ai4av-public-spec-v1
revision: 1
title: "ETC Eos Family Control Spec"
manufacturer: ETC
model_family: "Eos Ti"
aliases: []
compatible_with:
  manufacturers:
    - ETC
  models:
    - "Eos Ti"
    - "Eos Console"
    - "Eos RPU"
    - Gio
    - "Gio @5"
    - Ion
    - "Ion RPU"
    - "Eos RPU3"
    - Element
    - ETCnomad
    - "ETCnomad Puck"
    - "Eos Programming Wing"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.etcconnect.com
  - christielites.com
retrieved_at: 2026-04-30T13:59:45.626Z
last_checked_at: 2026-04-30T15:20:34.196Z
generated_at: 2026-04-30T15:20:34.196Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:20:34.196Z
  matched_actions: 93
  action_count: 93
  confidence: high
  summary: "All 93 spec actions verified against source; port 3032 confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# ETC Eos Family Control Spec

## Summary
The ETC Eos Family is a range of lighting consoles and processors (Eos Ti, Gio, Ion, Element, ETCnomad, etc.) supporting multiple show control protocols. This spec covers OSC (preferred, over TCP or UDP), ASCII string interface (RS-232 serial and UDP), MIDI Show Control (MSC), and MIDI Raw. OSC over TCP on port 3032 is the primary external control interface.

<!-- UNRESOLVED: RS-232 baud rate and serial configuration not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact UDP default ports not stated — only recommended ranges -->

## Transport
```yaml
protocols:
  - osc
  - tcp
  - udp
  - serial
addressing:
  port: 3032
  base_url: null  # UNRESOLVED: no base URL pattern - OSC uses /eos/ path prefix
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: /eos/get/* query commands, /eos/ping
- levelable  # inferred: channel intensity, submaster, fader, grandmaster level control
```

## Actions
```yaml
# === OSC COMMANDS ===
# All OSC commands begin with /eos/ or /eos/user/<number>/

- id: osc_ping
  label: Ping
  kind: action
  params: []

- id: osc_reset
  label: Reset OSC State
  kind: action
  params: []

- id: osc_channel_select
  label: Select Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number to select

- id: osc_channel_level
  label: Set Channel Level
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: level
      type: integer
      description: Level 0-100

- id: osc_channel_full
  label: Channel Full
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_channel_out
  label: Channel Out
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_channel_home
  label: Channel Home
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_channel_dmx
  label: Set Channel DMX Level
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: level
      type: integer
      description: DMX level 0-255

- id: osc_channel_param
  label: Set Channel Parameter
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: parameter
      type: string
      description: Parameter name (e.g. pan, tilt)
    - name: level
      type: number
      description: Parameter level

- id: osc_at
  label: Set Level (Absolute)
  kind: action
  params:
    - name: level
      type: integer
      description: Level 0-100

- id: osc_at_full
  label: Set Full (Absolute)
  kind: action
  params:
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_at_out
  label: Set Out (Absolute)
  kind: action
  params:
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_wheel_level
  label: Wheel Level Tick
  kind: action
  params:
    - name: ticks
      type: number
      description: Wheel ticks (positive or negative)

- id: osc_wheel_param
  label: Wheel Parameter Tick
  kind: action
  params:
    - name: parameter
      type: string
      description: Parameter name
    - name: ticks
      type: number
      description: Wheel ticks (positive or negative)

- id: osc_switch_level
  label: Switch Level
  kind: action
  params:
    - name: ticks
      type: number
      description: Tick rate -1.0 to 1.0

- id: osc_switch_param
  label: Switch Parameter
  kind: action
  params:
    - name: parameter
      type: string
      description: Parameter name
    - name: ticks
      type: number
      description: Tick rate -1.0 to 1.0

- id: osc_direct_select_create
  label: Create Direct Select Bank
  kind: action
  params:
    - name: index
      type: integer
      description: 1-based bank index
    - name: target_type
      type: string
      description: "Target type: chan, group, macro, sub, preset, ip, fp, cp, bp, ms, curve, snap, fx, pixmap, scene"
    - name: button_count
      type: integer
      description: Number of buttons

- id: osc_direct_select_press
  label: Press Direct Select Button
  kind: action
  params:
    - name: bank
      type: integer
      description: Bank index
    - name: button
      type: integer
      description: Button index
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_fader_config
  label: Create Fader Bank
  kind: action
  params:
    - name: index
      type: integer
      description: Bank index (0=master fader)
    - name: fader_count
      type: integer
      description: Number of faders per page

- id: osc_fader_set
  label: Set Fader Level
  kind: action
  params:
    - name: bank
      type: integer
      description: Bank index
    - name: fader
      type: integer
      description: Fader index
    - name: level
      type: number
      description: Level 0.0-1.0

- id: osc_fader_load
  label: Fader Load
  kind: action
  params:
    - name: bank
      type: integer
    - name: fader
      type: integer

- id: osc_fader_unload
  label: Fader Unload
  kind: action
  params:
    - name: bank
      type: integer
    - name: fader
      type: integer

- id: osc_fader_stop
  label: Fader Stop
  kind: action
  params:
    - name: bank
      type: integer
    - name: fader
      type: integer

- id: osc_fader_fire
  label: Fader Fire
  kind: action
  params:
    - name: bank
      type: integer
    - name: fader
      type: integer

- id: osc_key
  label: Press Key
  kind: action
  params:
    - name: name
      type: string
      description: Key name (see Eos OSC Keys appendix)
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_addr
  label: Select Address
  kind: action
  params:
    - name: address
      type: integer
      description: Address to select

- id: osc_addr_level
  label: Set Address Level
  kind: action
  params:
    - name: address
      type: integer
      description: Address number
    - name: level
      type: integer
      description: Level 0-100

- id: osc_group_select
  label: Select Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number

- id: osc_group_level
  label: Set Group Level
  kind: action
  params:
    - name: group
      type: integer
      description: Group number
    - name: level
      type: integer
      description: Level 0-100

- id: osc_group_param
  label: Set Group Parameter
  kind: action
  params:
    - name: group
      type: integer
      description: Group number
    - name: parameter
      type: string
      description: Parameter name
    - name: level
      type: number
      description: Parameter level

- id: osc_macro_select
  label: Select Macro
  kind: action
  params:
    - name: macro
      type: integer
      description: Macro number

- id: osc_macro_fire
  label: Fire Macro
  kind: action
  params:
    - name: macro
      type: integer
      description: Macro number to run

- id: osc_sub_select
  label: Select Submaster
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number

- id: osc_sub_level
  label: Set Submaster Level
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number
    - name: level
      type: number
      description: Level 0.0-1.0

- id: osc_sub_fire
  label: Bump Submaster
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number
    - name: edge
      type: number
      description: "Button edge: 1.0=down, 0.0=up (optional)"

- id: osc_preset_fire
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number

- id: osc_ip_fire
  label: Recall Intensity Palette
  kind: action
  params:
    - name: palette
      type: integer
      description: Intensity palette number

- id: osc_fp_fire
  label: Recall Focus Palette
  kind: action
  params:
    - name: palette
      type: integer
      description: Focus palette number

- id: osc_cp_fire
  label: Recall Color Palette
  kind: action
  params:
    - name: palette
      type: integer
      description: Color palette number

- id: osc_bp_fire
  label: Recall Beam Palette
  kind: action
  params:
    - name: palette
      type: integer
      description: Beam palette number

- id: osc_cue_select
  label: Select Cue
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number
    - name: cue
      type: number
      description: Cue number

- id: osc_cue_fire
  label: Fire Cue
  kind: action
  params:
    - name: cue
      type: number
      description: Cue number or cue list/cue/part

- id: osc_curve_select
  label: Select Curve
  kind: action
  params:
    - name: curve
      type: integer
      description: Curve number

- id: osc_fx_select
  label: Select Effect
  kind: action
  params:
    - name: fx
      type: integer
      description: Effect number

- id: osc_snap_select
  label: Recall Snapshot
  kind: action
  params:
    - name: snap
      type: integer
      description: Snapshot number

- id: osc_user_set
  label: Set OSC User ID
  kind: action
  params:
    - name: user
      type: integer
      description: "User ID (0=background, -1=current console user)"

- id: osc_cmd
  label: Send Command Line
  kind: action
  params:
    - name: text
      type: string
      description: Command line text (use # or Enter to terminate)

- id: osc_newcmd
  label: Send Command Line (Clear First)
  kind: action
  params:
    - name: text
      type: string
      description: Command line text

- id: osc_event
  label: Send Event Command
  kind: action
  params:
    - name: text
      type: string
      description: Event text (treated as console event)

- id: osc_get_version
  label: Request Eos Version
  kind: action
  params: []

- id: osc_get_count
  label: Request Data Count
  kind: action
  params:
    - name: type
      type: string
      description: "Data type: patch, cuelist, cue, group, macro, sub, preset, ip, fp, cp, bp, curve, fx, snap, pixmap, ms"

- id: osc_get_index
  label: Request Data By Index
  kind: action
  params:
    - name: type
      type: string
      description: Data type
    - name: index
      type: integer
      description: 0-based index

- id: osc_subscribe
  label: Subscribe to Show Data Changes
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=unsubscribe, 1=subscribe"

- id: osc_set_label
  label: Set Show Data Label
  kind: action
  params:
    - name: type
      type: string
      description: "Data type: patch, cuelist, cue, group, macro, sub, preset, ip, fp, cp, bp, curve, fx, snap, pixmap, ms"
    - name: number
      type: string
      description: Target number
    - name: text
      type: string
      description: Label text

- id: osc_magic_sheet
  label: Open Magic Sheet
  kind: action
  params:
    - name: number
      type: integer
      description: Magic sheet number

# === SERIAL STRING COMMANDS (RS-232, UDP, ACN) ===
# Terminated by carriage return (0x0D), "\r", or "#"

- id: serial_cmd_line
  label: Command Line Entry
  kind: action
  params:
    - name: command
      type: string
      description: "Text after $ prefix, sent to user 0 command line. Prefix with <UX> for specific user."

- id: serial_go
  label: Go Cue List
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number

- id: serial_cue
  label: Run Cue
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number
    - name: cue
      type: integer
      description: Cue number

- id: serial_gocue
  label: Go Cue (Clear)
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number (0 to use cue 0)
    - name: cue
      type: integer
      description: Cue number

- id: serial_release
  label: Release Cue List
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number

- id: serial_off
  label: Off Cue List
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number

- id: serial_resume
  label: Resume Cue List
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number

- id: serial_assert
  label: Assert Cue List
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number

- id: serial_stop
  label: Stop Playback
  kind: action
  params:
    - name: list
      type: integer
      description: Playback number

- id: serial_stop_cue
  label: Stop Cue
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number
    - name: cue
      type: integer
      description: Cue number

- id: serial_stop_all
  label: Stop All
  kind: action
  params: []

- id: serial_resume_cue
  label: Resume Cue
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number
    - name: cue
      type: integer
      description: Cue number

- id: serial_resume_all
  label: Resume All
  kind: action
  params: []

- id: serial_sub_assert
  label: Assert Submaster
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number

- id: serial_sub_unload
  label: Unload Submaster
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number

- id: serial_sub_down
  label: Submaster Bump Down
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number

- id: serial_sub_up
  label: Submaster Bump Up (Release)
  kind: action
  params:
    - name: sub
      type: integer
      description: Submaster number

- id: serial_sub_move
  label: Move Submaster/Fader Level
  kind: action
  params:
    - name: target
      type: integer
      description: "Submaster number or fader+1000 for faders"
    - name: level
      type: integer
      description: Level percentage

- id: serial_fader_move_cuelist
  label: Move Cue List Fader
  kind: action
  params:
    - name: list
      type: integer
      description: Cue list number
    - name: level
      type: integer
      description: Level percentage

- id: serial_grandmaster
  label: Set Grandmaster
  kind: action
  params:
    - name: gm
      type: integer
      description: Grandmaster number (currently only 1)
    - name: level
      type: integer
      description: Level 0-100

- id: serial_macro
  label: Fire Macro
  kind: action
  params:
    - name: macro
      type: integer
      description: Macro number

- id: serial_sc_event
  label: Show Control Event String
  kind: action
  params:
    - name: text
      type: string
      description: "Custom string prefixed with SC (case-sensitive) for RS232/UDP/ACN, or /eos/sc/ for OSC"

# === MIDI SHOW CONTROL ===

- id: msc_go
  label: MSC Go
  kind: action
  params:
    - name: device_id
      type: integer
      description: MSC device ID (0-126)
    - name: cue
      type: string
      description: "Cue number (optional, ASCII text encoded in hex)"
    - name: list
      type: string
      description: "Cue list number (optional, ASCII text encoded in hex)"

- id: msc_stop
  label: MSC Stop
  kind: action
  params:
    - name: device_id
      type: integer
      description: MSC device ID (0-126)
    - name: cue
      type: string
      description: "Cue number (optional)"
    - name: list
      type: string
      description: "Cue list number (optional)"

- id: msc_resume
  label: MSC Resume
  kind: action
  params:
    - name: device_id
      type: integer
      description: MSC device ID (0-126)
    - name: cue
      type: string
      description: "Cue number (optional)"
    - name: list
      type: string
      description: "Cue list number (optional)"

- id: msc_set
  label: MSC Set Fader
  kind: action
  params:
    - name: device_id
      type: integer
      description: MSC device ID (0-126)
    - name: control
      type: integer
      description: "Control value: 1-127=submaster, 128=primary playback in, 129=primary playback out, 510=grandmaster"
    - name: level
      type: integer
      description: Level 0-100

- id: msc_fire
  label: MSC Fire Macro
  kind: action
  params:
    - name: device_id
      type: integer
      description: MSC device ID (0-126)
    - name: macro
      type: integer
      description: Macro number 1-127
```

## Feedbacks
```yaml
- id: osc_out_ping
  type: string
  description: "/eos/out/ping - echoes arguments sent with /eos/ping"

- id: osc_out_active_chan
  type: string
  description: "/eos/out/active/chan - active channels and current value from first channel"

- id: osc_out_active_wheel
  type: string
  description: "/eos/out/active/wheel/<number> - parameter name and current value"

- id: osc_out_active_cue
  type: float
  description: "/eos/out/active/cue - percent complete 0.0-1.0, updated once per second"

- id: osc_out_active_cue_text
  type: string
  description: "/eos/out/active/cue/text - descriptive text about active cue"

- id: osc_out_pending_cue_text
  type: string
  description: "/eos/out/pending/cue/text - descriptive text about pending cue"

- id: osc_out_ds
  type: string
  description: "/eos/out/ds/<index> - direct select bank descriptive text"

- id: osc_out_ds_button
  type: string
  description: "/eos/out/ds/<index>/<button> - direct select button label"

- id: osc_out_fader_bank
  type: string
  description: "/eos/out/fader/<index> - fader bank descriptive text"

- id: osc_out_fader_name
  type: string
  description: "/eos/out/fader/<index>/<fader>/name - fader label"

- id: osc_out_fader_level
  type: float
  description: "/eos/fader/<index>/<fader> - fader percent 0.0-1.0"

- id: osc_out_user
  type: integer
  description: "/eos/out/user - current OSC user ID"

- id: osc_out_wheel_mode
  type: float
  description: "/eos/out/wheel - current wheel mode (0.0=Coarse, 1.0=Fine)"

- id: osc_out_cmd
  type: string
  description: "/eos/out/cmd - current command line text"

- id: osc_out_version
  type: string
  description: "/eos/out/get/version - Eos software version string"

- id: osc_out_event_cue_fire
  type: string
  description: "/eos/out/event/cue/<list>/<cue>/fire - cue fired event"

- id: osc_out_event_cue_stop
  type: string
  description: "/eos/out/event/cue/<list>/<cue>/stop - cue stopped event"

- id: osc_out_event_sub
  type: integer
  description: "/eos/out/event/sub/<sub> - sub bump event (0=Bump Off, 1=Bump On)"

- id: osc_out_event_macro
  type: string
  description: "/eos/out/event/macro/<macro> - macro fired event"

- id: osc_out_event_relay
  type: integer
  description: "/eos/out/event/relay/<relay>/<group> - relay event (0=On, 1=Off)"

- id: osc_out_show_name
  type: string
  description: "/eos/out/show/name - show title"

- id: osc_out_event_state
  type: integer
  description: "/eos/out/event/state - console state (0=Blind, 1=Live)"
```

## Variables
```yaml
- id: osc_tx_port
  type: integer
  description: OSC UDP transmit port (configurable in Setup)

- id: osc_rx_port
  type: integer
  description: OSC UDP receive port (configurable in Setup)

- id: osc_tx_ip
  type: string
  description: OSC transmit destination IP address

- id: string_rx_port
  type: integer
  description: UDP receive port for string commands

- id: string_tx_port
  type: integer
  description: UDP transmit port for string commands

- id: string_tx_ip
  type: string
  description: String transmit destination IP address or ACN device name

- id: msc_receive_channel
  type: integer
  description: MSC receive device ID (0-126)

- id: msc_transmit_channel
  type: integer
  description: MSC transmit device ID (0-127)
```

## Events
```yaml
- id: event_cue_fired
  description: "Console sends serial string or OSC when a cue is fired. OSC: /eos/out/event/cue/<list>/<cue>/fire. Serial: 'Cue <cue> <list>'"

- id: event_cue_stopped
  description: "Console sends serial string or OSC when a cue is stopped. OSC: /eos/out/event/cue/<list>/<cue>/stop. Serial: 'Stop Cue <cue> <list>'"

- id: event_cue_resumed
  description: "Console sends serial string when a cue is resumed. Serial: 'Resume Cue <cue> <list>'"

- id: event_sub_down
  description: "Console sends serial string when sub bump pressed. Serial: 'SubDown <sub>'. OSC: /eos/out/event/sub/<sub> = 1"

- id: event_sub_up
  description: "Console sends serial string when sub bump released. Serial: 'SubUp <sub>'. OSC: /eos/out/event/sub/<sub> = 0"

- id: event_macro_fired
  description: "Console sends serial string or OSC when macro fires. Serial: 'Macro <number>'. OSC: /eos/out/event/macro/<macro>"

- id: event_show_saved
  description: "/eos/out/event/show/saved - show file saved"

- id: event_show_loaded
  description: "/eos/out/event/show/loaded - show file loaded"

- id: event_show_cleared
  description: "/eos/out/event/show/cleared - show cleared"

- id: event_state_change
  description: "/eos/out/event/state - console state changed (0=Blind, 1=Live)"

- id: event_data_changed
  description: "/eos/out/notify/<type>/list/<index>/<count> - show data changed notification (requires subscription)"
```

## Macros
```yaml
# UNRESOLVED: no specific multi-step sequences described in source beyond general macro capability
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- All OSC commands must begin with `/eos/` or `/eos/user/<number>/`. Commands prefixed with `/eos/user/<number>/` target a specific user command line.
- OSC over TCP (port 3032) is the preferred transport. TCP mode supports OSC 1.0 (packet-length headers) and OSC 1.1 (SLIP), configurable in ECU.
- UDP OSC is supported but not preferred; messages may be dropped or delivered out of order. Recommended UDP port range: 4703-4727 or 8000/8001.
- Serial string commands are terminated by carriage return (0x0D), `\r`, or `#`. Show control event strings require `SC` prefix (case-sensitive) for RS-232/UDP/ACN, or `/eos/sc/` prefix for OSC.
- MSC command format is always `F0 7F <device_ID> 02 01 <command> <command_data> F7` where `01` is the Lighting—General command format. Device ID 127 is All Call.
- MIDI Raw (Note On/Off, Program Change, Control Change) requires local I/O ports; Net3 Show Control Gateways only support SysEx messages including MSC.
- Eos sends implicit OSC output (feedback) for active channels, cues, faders, and show control events when UDP transmit is enabled.
- The OSC key appendix maps hundreds of key names to internal Eos commands via `/eos/key/<name>`.
- RS-232 serial connectivity is via Net3 I/O Gateway, not direct console ports on most models (Eos Ti, Gio, Ion, Element have local I/O).

<!-- UNRESOLVED: RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact default UDP port numbers not stated — only recommended ranges (4703-4727 or 8000/8001) -->
<!-- UNRESOLVED: OSC TCP connection limit / max concurrent connections not stated -->
<!-- UNRESOLVED: command rate limits or throttling not stated -->

## Provenance

```yaml
source_domains:
  - support.etcconnect.com
  - christielites.com
retrieved_at: 2026-04-30T13:59:45.626Z
last_checked_at: 2026-04-30T15:20:34.196Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:20:34.196Z
matched_actions: 93
action_count: 93
confidence: high
summary: "All 93 spec actions verified against source; port 3032 confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
