---
spec_id: admin/interactive-technologies-cueserver
schema_version: ai4av-public-spec-v1
revision: 1
title: "Interactive Technologies CueServer Control Spec"
manufacturer: "Interactive Technologies"
model_family: "CueServer 2"
aliases: []
compatible_with:
  manufacturers:
    - "Interactive Technologies"
  models:
    - "CueServer 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.interactive-online.com
source_urls:
  - https://docs.interactive-online.com/cs2/1.0/en/topic/cuescript-protocol
  - https://docs.interactive-online.com/cs2/1.0/en/topic/cgi-api
  - https://docs.interactive-online.com/cs2/1.0/en/topic/command-syntax
  - https://docs.interactive-online.com/cs2/1.0/en/topic/serial-ports
retrieved_at: 2026-05-04T10:35:50.950Z
last_checked_at: 2026-06-03T07:13:06.088Z
generated_at: 2026-06-03T07:13:06.088Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial port configuration (baud rate, data bits, parity, stop bits) not included in source excerpt"
  - "HTTP port number and base URL not stated in source"
  - "detailed command syntax for most CueScript commands not in source excerpt"
  - "KiNET, sACN, Art-Net, CueStation protocol details not in source excerpt"
  - "HTTP port number not stated in source"
  - "HTTP base URL / path prefix not stated (CGI paths like /exe.cgi, /get.cgi, /pcmd.cgi, /set.cgi inferred from endpoint names)"
  - "serial config not in source excerpt"
  - "the following action commands are listed in source but syntax/params not fully documented:"
  - "response formats for get.cgi endpoints not documented in source excerpt"
  - "set.cgi parameter names/types not documented in source excerpt"
  - "no unsolicited event/notification details in source excerpt"
  - "macro definition format and stored macro structure not documented in source excerpt"
  - "no safety warnings or interlock procedures in source excerpt"
  - "serial port configuration not in source excerpt"
  - "HTTP CGI API full URL patterns and response formats not in source excerpt"
  - "effect properties, system variables list not in source excerpt"
  - "KiNET and CueStation protocol details not in source excerpt"
  - "Ethernet port numbers table referenced but not included in excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:13:06.088Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "Complete action inventory matches source (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Interactive Technologies CueServer Control Spec

## Summary
The Interactive Technologies CueServer 2 is a DMX lighting controller that executes CueScript commands via UDP, HTTP (CGI API), and serial interfaces. This spec covers the CueScript protocol over UDP (port 52737), the HTTP CGI API, and serial CueScript — though serial configuration details are not available in the source excerpt.

<!-- UNRESOLVED: serial port configuration (baud rate, data bits, parity, stop bits) not included in source excerpt -->
<!-- UNRESOLVED: HTTP port number and base URL not stated in source -->
<!-- UNRESOLVED: detailed command syntax for most CueScript commands not in source excerpt -->
<!-- UNRESOLVED: KiNET, sACN, Art-Net, CueStation protocol details not in source excerpt -->

## Transport
```yaml
protocols:
  - udp
  - http
  - serial
addressing:
  port: 52737  # UDP port for CueScript Protocol
  multicast_group: 239.255.204.2
  # UNRESOLVED: HTTP port number not stated in source
  # UNRESOLVED: HTTP base URL / path prefix not stated (CGI paths like /exe.cgi, /get.cgi, /pcmd.cgi, /set.cgi inferred from endpoint names)
serial:
  baud_rate: null  # UNRESOLVED: serial config not in source excerpt
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: Reboot command present
  - levelable     # inferred: At command for channel levels
  - queryable     # inferred: get.cgi queries return state
  - routable      # inferred: DMX input/output routing commands present
```

## Actions
```yaml
actions:
  - id: cue_go
    label: Cue Go
    kind: action
    description: "Execute (go) a cue. Syntax: Cue <number> Go (shorthand: Q<n>G)"
    params:
      - name: cue_number
        type: integer
        description: Cue number to execute
    examples:
      - "Cue 1 Go"
      - "Q1G"

  - id: macro_run
    label: Macro Run
    kind: action
    description: "Run a macro. Syntax: Macro <number> (shorthand: M<n>)"
    params:
      - name: macro_number
        type: integer
        description: Macro number to run
    examples:
      - "Macro 7"
      - "M7"

  - id: channel_at
    label: Channel At Level
    kind: action
    description: "Set channel(s) to a level. Syntax: Channel <range> At <level> (shorthand: C<range>A<level>)"
    params:
      - name: channels
        type: string
        description: "Channel selection (e.g. '1>10' for range)"
      - name: level
        type: string
        description: "Level value (e.g. FL for full)"
    examples:
      - "Channel 1>10 At FL"
      - "C1>10AFL"

  - id: button_on
    label: Button On
    kind: action
    description: "Turn a button on. Syntax: Button <number> On"
    params:
      - name: button_number
        type: integer
        description: Button number

  - id: button_off
    label: Button Off
    kind: action
    description: "Turn a button off. Syntax: Button <number> Off"
    params:
      - name: button_number
        type: integer
        description: Button number

  - id: reboot
    label: Reboot
    kind: action
    description: Reboot the CueServer device
    params: []

  - id: playback_clear
    label: Playback Clear
    kind: action
    description: "Clear a playback. Syntax: Playback <number> Clear"
    params:
      - name: playback_number
        type: integer
        description: Playback number

  - id: exe_cgi
    label: Execute CGI Command
    kind: action
    description: "Send CueScript command via HTTP exe.cgi endpoint"
    params:
      - name: command
        type: string
        description: CueScript command string

  # UNRESOLVED: the following action commands are listed in source but syntax/params not fully documented:
  # Assert, Assign (=), Audio, Clear, Disable, Enable, Fade, Follow, Input, Join,
  # Length, Link, Lock, Log, Off, Offset, On, Park, Preset, Press, Random,
  # Record, Record Cue, Record Group, Record Preset, Record Stream, Record Stop,
  # Release, Remainder, Reset, Return, Set, SMPTE, Stack, Start, Stop, Toggle,
  # Unpark, Update, Update Cue, Update Group, Update Preset, Update Stream,
  # Update Stop, Unlock, Wait, Write, Zone
  - id: assert
    label: Assert
    kind: action
    description: "Assert command. Asserts a condition or state on the selection."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: params
        type: string
        description: UNRESOLVED

  - id: assign
    label: Assign
    kind: action
    description: "Assign (=) command. Assigns a value to a variable or property."
    params:
      - name: target
        type: string
        description: Target variable or property
      - name: value
        type: string
        description: Value to assign

  - id: audio
    label: Audio
    kind: action
    description: "Audio command. Controls audio properties or playback on the CueServer."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: clear
    label: Clear
    kind: action
    description: "Clear command. Clears the current selection or a named object."
    params:
      - name: selection
        type: string
        description: Target to clear

  - id: disable
    label: Disable
    kind: action
    description: "Disable command. Disables a selected object or feature."
    params:
      - name: selection
        type: string
        description: Target to disable

  - id: enable
    label: Enable
    kind: action
    description: "Enable command. Enables a selected object or feature."
    params:
      - name: selection
        type: string
        description: Target to enable

  - id: fade
    label: Fade
    kind: action
    description: "Fade command. Fades a selection to a level over a duration."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: params
        type: string
        description: UNRESOLVED

  - id: follow
    label: Follow
    kind: action
    description: "Follow command. Causes the selection to follow another object."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: params
        type: string
        description: UNRESOLVED

  - id: go
    label: Go
    kind: action
    description: "Go command. Executes the current or named cue."
    params:
      - name: selection
        type: string
        description: UNRESOLVED

  - id: input
    label: Input
    kind: action
    description: "Input command. Controls or configures an input source."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: join
    label: Join
    kind: action
    description: "Join command. Joins a selection to a group or playback."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: params
        type: string
        description: UNRESOLVED

  - id: length
    label: Length
    kind: action
    description: "Length command. Sets the fade length (time) for a selection."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: time
        type: string
        description: UNRESOLVED

  - id: link
    label: Link
    kind: action
    description: "Link command. Links a selection to another object."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: params
        type: string
        description: UNRESOLVED

  - id: lock
    label: Lock
    kind: action
    description: "Lock command. Locks a selection such as a playback or channel."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: log
    label: Log
    kind: action
    description: "Log command. Writes a message to the system log."
    params:
      - name: message
        type: string
        description: UNRESOLVED

  - id: off
    label: Off
    kind: action
    description: "Off command. Turns off a selection such as a channel, playback, or button."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: offset
    label: Offset
    kind: action
    description: "Offset command. Offsets a level or value for a selection."
    params:
      - name: selection
        type: string
        description: Target selection
      - name: value
        type: string
        description: UNRESOLVED

  - id: on
    label: On
    kind: action
    description: "On command. Turns on a selection such as a channel, playback, or button."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: park
    label: Park
    kind: action
    description: "Park command. Parks (holds) a channel or selection at its current level."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: preset
    label: Preset
    kind: action
    description: "Preset command. Recalls or applies a preset to a selection."
    params:
      - name: preset_number
        type: integer
        description: Preset number
      - name: selection
        type: string
        description: UNRESOLVED

  - id: press
    label: Press
    kind: action
    description: "Press command. Simulates a button press."
    params:
      - name: button_number
        type: integer
        description: Button number

  - id: random
    label: Random
    kind: action
    description: "Random command. Generates or applies a random value to a selection."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: record
    label: Record
    kind: action
    description: "Record command. Records the current state to a cue or object."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: record_cue
    label: Record Cue
    kind: action
    description: "Record Cue command. Records the current state to a specific cue."
    params:
      - name: cue_number
        type: integer
        description: Cue number

  - id: record_group
    label: Record Group
    kind: action
    description: "Record Group command. Records the current state to a group."
    params:
      - name: group_number
        type: integer
        description: Group number

  - id: record_preset
    label: Record Preset
    kind: action
    description: "Record Preset command. Records the current state to a preset."
    params:
      - name: preset_number
        type: integer
        description: Preset number

  - id: record_stream
    label: Record Stream
    kind: action
    description: "Record Stream command. Starts recording a live DMX stream."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: record_stop
    label: Record Stop
    kind: action
    description: "Record Stop command. Stops an active recording."
    params: []

  - id: release
    label: Release
    kind: action
    description: "Release command. Releases a selection from control."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: remainder
    label: Remainder
    kind: action
    description: "Remainder command. Applies an action to the remainder of a selection."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: reset
    label: Reset
    kind: action
    description: "Reset command. Resets a selection to its default state."
    params:
      - name: selection
        type: string
        description: UNRESOLVED

  - id: return
    label: Return
    kind: action
    description: "Return command. Returns from a subroutine or macro call."
    params: []

  - id: set
    label: Set
    kind: action
    description: "Set command. Sets a property or variable to a value."
    params:
      - name: target
        type: string
        description: Property or variable name
      - name: value
        type: string
        description: UNRESOLVED

  - id: smpte
    label: SMPTE
    kind: action
    description: "SMPTE command. Synchronizes or triggers actions based on SMPTE timecode."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: stack
    label: Stack
    kind: action
    description: "Stack command. Controls cue stack behavior."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: start
    label: Start
    kind: action
    description: "Start command. Starts a playback, effect, or process."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: stop
    label: Stop
    kind: action
    description: "Stop command. Stops a playback, effect, or process."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: toggle
    label: Toggle
    kind: action
    description: "Toggle command. Toggles the state of a selection."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: unpark
    label: Unpark
    kind: action
    description: "Unpark command. Releases a parked channel or selection."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: update
    label: Update
    kind: action
    description: "Update command. Updates a cue or object with the current state."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: update_cue
    label: Update Cue
    kind: action
    description: "Update Cue command. Updates a specific cue with the current state."
    params:
      - name: cue_number
        type: integer
        description: Cue number

  - id: update_group
    label: Update Group
    kind: action
    description: "Update Group command. Updates a group with the current state."
    params:
      - name: group_number
        type: integer
        description: Group number

  - id: update_preset
    label: Update Preset
    kind: action
    description: "Update Preset command. Updates a preset with the current state."
    params:
      - name: preset_number
        type: integer
        description: Preset number

  - id: update_stream
    label: Update Stream
    kind: action
    description: "Update Stream command. Updates a recording stream."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: update_stop
    label: Update Stop
    kind: action
    description: "Update Stop command. Stops updating a stream."
    params: []

  - id: unlock
    label: Unlock
    kind: action
    description: "Unlock command. Unlocks a previously locked selection."
    params:
      - name: selection
        type: string
        description: Target selection

  - id: wait
    label: Wait
    kind: action
    description: "Wait command. Pauses execution for a specified duration."
    params:
      - name: duration
        type: number
        description: Duration in seconds

  - id: write
    label: Write
    kind: action
    description: "Write command. Writes data to an output or file."
    params:
      - name: params
        type: string
        description: UNRESOLVED

  - id: zone
    label: Zone
    kind: action
    description: "Zone command. Selects or controls a zone."
    params:
      - name: zone_number
        type: integer
        description: Zone number

  - id: break
    label: Break
    kind: action
    description: "Break command. Exits the current loop or conditional block."
    params: []

  - id: if_then_else
    label: If..Then..Else
    kind: action
    description: "Conditional logic command. Executes commands based on a condition."
    params:
      - name: condition
        type: string
        description: Condition expression
      - name: then_command
        type: string
        description: Command to execute if condition is true
      - name: else_command
        type: string
        description: UNRESOLVED

  - id: pcmd_cgi
    label: Execute pcmd.cgi Command
    kind: action
    description: "Send a CueScript command via HTTP pcmd.cgi endpoint."
    params:
      - name: command
        type: string
        description: CueScript command string
```

## Feedbacks
```yaml
feedbacks:
  - id: button_values
    type: object
    description: "Button values (get.cgi?bv)"

  - id: dmx_output
    type: object
    description: "DMX output data (get.cgi?out)"

  - id: dmx_input
    type: object
    description: "DMX input data (get.cgi?in)"

  - id: playback_info
    type: object
    description: "Playback info (get.cgi?pi)"

  - id: playback_values
    type: object
    description: "Playback values (get.cgi?p*)"

  - id: system_status
    type: object
    description: "System status (get.cgi?ss)"

  - id: system_log
    type: object
    description: "System log (get.cgi?log)"

  - id: network_info
    type: object
    description: "Network info (get.cgi?net)"

  - id: cue_stack_info
    type: object
    description: "Cue stack info (get.cgi?csi)"

  - id: zone_data
    type: object
    description: "Zone data (get.cgi?zones)"

  - id: variables
    type: object
    description: "System variables (get.cgi?var)"

  - id: ping
    type: object
    description: "Ping response (get.cgi?ping)"

  # UNRESOLVED: response formats for get.cgi endpoints not documented in source excerpt
  # Additional get.cgi endpoints without format details: cc, cpu, ecc, epi, fed,
  # grp, hdi, pzi, rs, ti, ts
```

## Variables
```yaml
variables:
  - id: audio_properties
    type: object
    description: "Audio properties (set.cgi?audio)"

  - id: lcd_properties
    type: object
    description: "LCD properties (set.cgi?lcd)"

  - id: network_properties
    type: object
    description: "Network properties (set.cgi?net)"

  - id: time_properties
    type: object
    description: "Time properties (set.cgi?time)"

  - id: station_color_properties
    type: object
    description: "Station color properties (set.cgi?stcol)"

  # UNRESOLVED: set.cgi parameter names/types not documented in source excerpt
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification details in source excerpt
```

## Macros
```yaml
# The CueServer has a built-in Macro command (Macro <number>), and CueScript
# supports sequencing with semicolons (e.g. "Button 1 On; Wait 3.5; Button 1 Off").
# UNRESOLVED: macro definition format and stored macro structure not documented in source excerpt
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source excerpt
```

## Notes
- CueScript commands can be abbreviated (e.g. `Q1G` for `Cue 1 Go`, `M7` for `Macro 7`, `C1>10AFL` for `Channel 1>10 At FL`).
- Multiple commands can be chained with semicolons: `Button 1 On; Wait 3.5; Button 1 Off`.
- Conditional logic is supported via `If..Then..Else`.
- UDP packets can be sent unicast to the CueServer IP or multicast to 239.255.204.2.
- The device also speaks sACN, Art-Net, and KiNET for DMX-over-Ethernet; these are lighting transport protocols, not control interfaces.
- CueStation Protocol is referenced but not documented in the source excerpt.

<!-- UNRESOLVED: serial port configuration not in source excerpt -->
<!-- UNRESOLVED: HTTP CGI API full URL patterns and response formats not in source excerpt -->
<!-- UNRESOLVED: effect properties, system variables list not in source excerpt -->
<!-- UNRESOLVED: KiNET and CueStation protocol details not in source excerpt -->
<!-- UNRESOLVED: Ethernet port numbers table referenced but not included in excerpt -->

## Provenance

```yaml
source_domains:
  - docs.interactive-online.com
source_urls:
  - https://docs.interactive-online.com/cs2/1.0/en/topic/cuescript-protocol
  - https://docs.interactive-online.com/cs2/1.0/en/topic/cgi-api
  - https://docs.interactive-online.com/cs2/1.0/en/topic/command-syntax
  - https://docs.interactive-online.com/cs2/1.0/en/topic/serial-ports
retrieved_at: 2026-05-04T10:35:50.950Z
last_checked_at: 2026-06-03T07:13:06.088Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:13:06.088Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "Complete action inventory matches source (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial port configuration (baud rate, data bits, parity, stop bits) not included in source excerpt"
- "HTTP port number and base URL not stated in source"
- "detailed command syntax for most CueScript commands not in source excerpt"
- "KiNET, sACN, Art-Net, CueStation protocol details not in source excerpt"
- "HTTP port number not stated in source"
- "HTTP base URL / path prefix not stated (CGI paths like /exe.cgi, /get.cgi, /pcmd.cgi, /set.cgi inferred from endpoint names)"
- "serial config not in source excerpt"
- "the following action commands are listed in source but syntax/params not fully documented:"
- "response formats for get.cgi endpoints not documented in source excerpt"
- "set.cgi parameter names/types not documented in source excerpt"
- "no unsolicited event/notification details in source excerpt"
- "macro definition format and stored macro structure not documented in source excerpt"
- "no safety warnings or interlock procedures in source excerpt"
- "serial port configuration not in source excerpt"
- "HTTP CGI API full URL patterns and response formats not in source excerpt"
- "effect properties, system variables list not in source excerpt"
- "KiNET and CueStation protocol details not in source excerpt"
- "Ethernet port numbers table referenced but not included in excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
