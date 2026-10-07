---
spec_id: admin/theatrixx-cuecore2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Theatrixx CueCore2 Control Spec"
manufacturer: Theatrixx
model_family: CueCore2
aliases: []
compatible_with:
  manufacturers:
    - Theatrixx
  models:
    - CueCore2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.visualproductions.nl
  - ltb.no
  - manualslib.com
  - visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/633ae916812af574aa075201
  - "https://ltb.no/media/multicase/documents/visual%20productions/manual%20visual%20cuecore2_en_11.pdf"
  - https://www.manualslib.com/manual/1870075/Visual-Productions-Cuecore2.html
  - https://www.visualproductions.nl/downloads/manuals
retrieved_at: 2026-08-11T05:31:47.998Z
last_checked_at: 2026-10-07T20:35:19.309Z
generated_at: 2026-10-07T20:35:19.309Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - DateAndTime
  - DaylightST
  - "trigger/task feature detail beyond API command list not enumerated; per-channel / per-zone variants in Show Control not separately itemised."
  - "OSC listen port is user-configurable on Settings -> OSC (12.6), default not stated in source excerpt"
  - "configured in Show Control page; not a wire-format command"
  - "no API-level confirmation requirements documented"
  - "fault behaviour / error recovery sequences not documented in source."
  - "firmware version compatibility, voltage/current specs, full binary/hex encoding of MSC commands, OSC listen port default value, and per-channel/per-zone Show Control action variants not separately itemised."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:35:19.309Z
  matched_actions: 160
  action_count: 160
  confidence: medium
  summary: "All 160 action units match source API tables (OSC/TCP/HTTP/MSC) or Appendix A/B entries; port 7000 and HTTP port 80 confirmed; few trigger types are uncovered. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Theatrixx CueCore2 Control Spec

## Summary
The Theatrixx CueCore2 is a solid-state show controller / DMX node exposing OSC, TCP, UDP, HTTP and MSC control interfaces for external equipment. This spec documents the API command tables (Appendix D), the Show Control trigger sources (Appendix A) and task types (Appendix B) the device supports. Device configuration happens via the vManager tool or web interface.

<!-- UNRESOLVED: trigger/task feature detail beyond API command list not enumerated; per-channel / per-zone variants in Show Control not separately itemised. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - osc
  - http
addressing:
  port: 7000    # default TCP & UDP listen port (Settings -> TCP/IP, p. "12.8 TCP/IP")
  base_url: http://<device-ip>   # HTTP API served on TCP port 80 (Appendix D.3)
osc:
  listen_port: null  # UNRESOLVED: OSC listen port is user-configurable on Settings -> OSC (12.6), default not stated in source excerpt
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login/password/auth procedure described for API commands in source)
```

## Traits
```yaml
- powerable       # inferred: power-cycle behaviour referenced (Startup trigger, p. A.14)
- routable        # inferred: input/output routing via Show Control actions + DMX universe routing (Section 10.2)
- queryable       # inferred: query via /core/hello, core-hello feedback (D.5); state-change feedback messages
- levelable       # inferred: playback intensity, master intensity, fade time, rate commands (D.1, D.2, D.3)
```

## Actions
```yaml
# === OSC API (Appendix D.1) ===
# Prefix `/core/...`; API prefix configurable (Settings -> General, default "core")

- id: osc_pb_go_plus
  label: OSC Playback Go+ (next cue)
  kind: action
  command: "/core/pb/{n}/go+"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: osc_pb_go_minus
  label: OSC Playback Go- (previous cue)
  kind: action
  command: "/core/pb/{n}/go-"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: osc_pb_jump
  label: OSC Playback Jump to cue
  kind: action
  command: "/core/pb/{n}/jump"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: cue
      type: integer
      description: Cue number

- id: osc_pb_release
  label: OSC Playback Release
  kind: action
  command: "/core/pb/{n}/release"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: osc_pb_intensity
  label: OSC Playback Intensity
  kind: action
  command: "/core/pb/{n}/intensity"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: value
      type: float
      description: Intensity value

- id: osc_pb_rate
  label: OSC Playback Rate
  kind: action
  command: "/core/pb/{n}/rate"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: value
      type: float
      description: Rate value

- id: osc_pb_release_all
  label: OSC Release all playbacks
  kind: action
  command: "/core/pb/release"

- id: osc_pb_master_intensity
  label: OSC Master Intensity
  kind: action
  command: "/core/pb/intensity"
  params:
    - name: value
      type: float

- id: osc_pb_master_rate
  label: OSC Master Rate
  kind: action
  command: "/core/pb/rate"
  params:
    - name: value
      type: float

- id: osc_pb_master_fade
  label: OSC Master Fade Time
  kind: action
  command: "/core/pb/fade"
  params:
    - name: value
      type: string

- id: osc_pb_solo
  label: OSC Start solo playback
  kind: action
  command: "/core/pb/solo"
  params:
    - name: value
      type: integer
      description: Playback index [1, 6]

- id: osc_tr_select
  label: OSC Track Select
  kind: action
  command: "/core/tr/select"
  params:
    - name: value
      type: integer

- id: osc_tr_erase_selected
  label: OSC Erase Selected Track
  kind: action
  command: "/core/tr/erase"

- id: osc_tr_record_selected
  label: OSC Start Recording Selected Track
  kind: action
  command: "/core/tr/record"

- id: osc_tr_stop
  label: OSC Stop Recording
  kind: action
  command: "/core/tr/stop"

- id: osc_tr_n_erase
  label: OSC Erase Track n
  kind: action
  command: "/core/tr/{n}/erase"
  params:
    - name: n
      type: integer
      description: Track index [1, 128]

- id: osc_tr_n_record
  label: OSC Start Recording Track n
  kind: action
  command: "/core/tr/{n}/record"
  params:
    - name: n
      type: integer
      description: Track index [1, 128]

- id: osc_tr_snapshot_dmx
  label: OSC Snapshot DMX Input
  kind: action
  command: "/core/tr/snapshot/dmx"

- id: osc_tr_snapshot_artnet
  label: OSC Snapshot Art-Net Input
  kind: action
  command: "/core/tr/snapshot/artnet"

- id: osc_tr_snapshot_sacn
  label: OSC Snapshot sACN Input
  kind: action
  command: "/core/tr/snapshot/sacn"

- id: osc_tc_start
  label: OSC Internal Timecode Start
  kind: action
  command: "/core/tc/start"

- id: osc_tc_stop
  label: OSC Internal Timecode Stop
  kind: action
  command: "/core/tc/stop"

- id: osc_tc_restart
  label: OSC Internal Timecode Restart
  kind: action
  command: "/core/tc/restart"

- id: osc_tc_pause
  label: OSC Internal Timecode Pause
  kind: action
  command: "/core/tc/pause"

- id: osc_tc_set
  label: OSC Internal Timecode Set
  kind: action
  command: "/core/tc/set"
  params:
    - name: value
      type: string

- id: osc_al_n_a_execute
  label: OSC Execute Action in Actionlist
  kind: action
  command: "/core/al/{list}/{action}/execute"
  params:
    - name: list
      type: integer
      description: Actionlist index [1, 8]
    - name: action
      type: integer
      description: Action index [1, 48]
    - name: arg
      type: string
      description: bool/float/integer argument

- id: osc_al_n_enable
  label: OSC Enable Actionlist
  kind: action
  command: "/core/al/{list}/enable"
  params:
    - name: list
      type: integer
      description: Actionlist index [1, 8]
    - name: value
      type: boolean

- id: osc_tm_n_start
  label: OSC Timer Start
  kind: action
  command: "/core/tm/{n}/start"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: osc_tm_n_stop
  label: OSC Timer Stop
  kind: action
  command: "/core/tm/{n}/stop"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: osc_tm_n_restart
  label: OSC Timer Restart
  kind: action
  command: "/core/tm/{n}/restart"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: osc_tm_n_pause
  label: OSC Timer Pause
  kind: action
  command: "/core/tm/{n}/pause"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: osc_tm_n_set
  label: OSC Timer Set
  kind: action
  command: "/core/tm/{n}/set"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]
    - name: value
      type: string
      description: Time string

- id: osc_va_n_set
  label: OSC Variable Set
  kind: action
  command: "/core/va/{n}/set"
  params:
    - name: n
      type: integer
      description: Variable index [1, 8]
    - name: value
      type: integer
      description: Value in [0, 255]

- id: osc_va_n_refresh
  label: OSC Variable Refresh
  kind: action
  command: "/core/va/{n}/refresh"
  params:
    - name: n
      type: integer
      description: Variable index [1, 8]

- id: osc_va_refresh_all
  label: OSC Refresh All Variables
  kind: action
  command: "/core/va/refresh"

- id: osc_dmx_ch_set
  label: OSC Set DMX Channel
  kind: action
  command: "/core/dmx/{ch}"
  params:
    - name: ch
      type: integer
      description: DMX channel
    - name: value
      type: integer

- id: osc_blink
  label: OSC Blink LED
  kind: action
  command: "/core/blink"

- id: osc_hello
  label: OSC Hello (polling)
  kind: action
  command: "/core/hello"

# === TCP & UDP API (Appendix D.2) ===
# ASCII strings; API prefix configurable (default "core-")

- id: tcp_pb_go_plus
  label: TCP/UDP Playback Go+ (next cue)
  kind: action
  command: "core-pb-{n}-go+"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: tcp_pb_go_minus
  label: TCP/UDP Playback Go- (previous cue)
  kind: action
  command: "core-pb-{n}-go-"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: tcp_pb_jump
  label: TCP/UDP Playback Jump to cue
  kind: action
  command: "core-pb-{n}-jump={cue}"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: cue
      type: integer

- id: tcp_pb_release
  label: TCP/UDP Playback Release
  kind: action
  command: "core-pb-{n}-release"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]

- id: tcp_pb_intensity
  label: TCP/UDP Playback Intensity
  kind: action
  command: "core-pb-{n}-intensity={value}"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: value
      type: float

- id: tcp_pb_rate
  label: TCP/UDP Playback Rate
  kind: action
  command: "core-pb-{n}-rate={value}"
  params:
    - name: n
      type: integer
      description: Playback index [1, 6]
    - name: value
      type: float

- id: tcp_pb_release_all
  label: TCP/UDP Release all playbacks
  kind: action
  command: "core-pb-release"

- id: tcp_pb_master_intensity
  label: TCP/UDP Master Intensity
  kind: action
  command: "core-pb-intensity={value}"
  params:
    - name: value
      type: float

- id: tcp_pb_master_rate
  label: TCP/UDP Master Rate
  kind: action
  command: "core-pb-rate={value}"
  params:
    - name: value
      type: float

- id: tcp_pb_master_fade
  label: TCP/UDP Master Fade Time
  kind: action
  command: "core-pb-fade={value}"
  params:
    - name: value
      type: string

- id: tcp_pb_solo
  label: TCP/UDP Start solo playback
  kind: action
  command: "core-pb-solo={value}"
  params:
    - name: value
      type: integer
      description: Playback index [1, 6]

- id: tcp_tr_select
  label: TCP/UDP Track Select
  kind: action
  command: "core-tr-select={value}"
  params:
    - name: value
      type: integer

- id: tcp_tr_erase
  label: TCP/UDP Erase Selected Track
  kind: action
  command: "core-tr-erase"

- id: tcp_tr_record
  label: TCP/UDP Start Recording Selected Track
  kind: action
  command: "core-tr-record"

- id: tcp_tr_stop
  label: TCP/UDP Stop Recording
  kind: action
  command: "core-tr-stop"

- id: tcp_tr_n_erase
  label: TCP/UDP Erase Track n
  kind: action
  command: "core-tr-{n}-erase"
  params:
    - name: n
      type: integer
      description: Track index [1, 128]

- id: tcp_tr_n_record
  label: TCP/UDP Start Recording Track n
  kind: action
  command: "core-tr-{n}-record"
  params:
    - name: n
      type: integer
      description: Track index [1, 128]

- id: tcp_tr_snapshot_dmx
  label: TCP/UDP Snapshot DMX Input
  kind: action
  command: "core-tr-snapshot-dmx"

- id: tcp_tr_snapshot_artnet
  label: TCP/UDP Snapshot Art-Net Input
  kind: action
  command: "core-tr-snapshot-artnet"

- id: tcp_tr_snapshot_sacn
  label: TCP/UDP Snapshot sACN Input
  kind: action
  command: "core-tr-snapshot-sacn"

- id: tcp_tc_start
  label: TCP/UDP Internal Timecode Start
  kind: action
  command: "core-tc-start"

- id: tcp_tc_stop
  label: TCP/UDP Internal Timecode Stop
  kind: action
  command: "core-tc-stop"

- id: tcp_tc_restart
  label: TCP/UDP Internal Timecode Restart
  kind: action
  command: "core-tc-restart"

- id: tcp_tc_pause
  label: TCP/UDP Internal Timecode Pause
  kind: action
  command: "core-tc-pause"

- id: tcp_tc_set
  label: TCP/UDP Internal Timecode Set
  kind: action
  command: "core-tc-set={value}"
  params:
    - name: value
      type: string

- id: tcp_al_n_a_execute
  label: TCP/UDP Execute Action in Actionlist
  kind: action
  command: "core-al-{list}-{action}-execute={arg}"
  params:
    - name: list
      type: integer
      description: Actionlist index [1, 8]
    - name: action
      type: integer
      description: Action index [1, 48]
    - name: arg
      type: string

- id: tcp_al_n_enable
  label: TCP/UDP Enable Actionlist
  kind: action
  command: "core-al-{list}-enable={value}"
  params:
    - name: list
      type: integer
      description: Actionlist index [1, 8]
    - name: value
      type: boolean

- id: tcp_tm_n_start
  label: TCP/UDP Timer Start
  kind: action
  command: "core-tm-{n}-start"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: tcp_tm_n_stop
  label: TCP/UDP Timer Stop
  kind: action
  command: "core-tm-{n}-stop"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: tcp_tm_n_restart
  label: TCP/UDP Timer Restart
  kind: action
  command: "core-tm-{n}-restart"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: tcp_tm_n_pause
  label: TCP/UDP Timer Pause
  kind: action
  command: "core-tm-{n}-pause"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]

- id: tcp_tm_n_set
  label: TCP/UDP Timer Set
  kind: action
  command: "core-tm-{n}-set={value}"
  params:
    - name: n
      type: integer
      description: Timer index [1, 4]
    - name: value
      type: string

- id: tcp_va_n_set
  label: TCP/UDP Variable Set
  kind: action
  command: "core-va-{n}-set={value}"
  params:
    - name: n
      type: integer
      description: Variable index [1, 8]
    - name: value
      type: integer
      description: Value in [0, 255]

- id: tcp_va_n_refresh
  label: TCP/UDP Variable Refresh
  kind: action
  command: "core-va-{n}-refresh"
  params:
    - name: n
      type: integer
      description: Variable index [1, 8]

- id: tcp_va_refresh_all
  label: TCP/UDP Refresh All Variables
  kind: action
  command: "core-va-refresh"

- id: tcp_dmx_ch_set
  label: TCP/UDP Set DMX Channel
  kind: action
  command: "core-dmx-{ch}={value}"
  params:
    - name: ch
      type: integer
      description: DMX channel
    - name: value
      type: integer

- id: tcp_blink
  label: TCP/UDP Blink LED
  kind: action
  command: "core-blink"

- id: tcp_hello
  label: TCP/UDP Hello (polling)
  kind: action
  command: "core-hello"

# === HTTP API (Appendix D.3) ===
# Port 80; URL form `http://<ip>/ajax/...`

- id: http_pb_go_plus
  label: HTTP Playback Go+ (next cue)
  kind: action
  command: "GET /ajax/pb{nn}/go+"
  params:
    - name: nn
      type: string
      description: Two-digit playback index [01, 06]

- id: http_pb_go_minus
  label: HTTP Playback Go- (previous cue)
  kind: action
  command: "GET /ajax/pb{nn}/go-"

- id: http_pb_jump
  label: HTTP Playback Jump to cue
  kind: action
  command: "GET /ajax/pb{nn}/jmp={cue}"
  params:
    - name: cue
      type: integer
      description: Cue number [1, 32]

- id: http_pb_release
  label: HTTP Release playback
  kind: action
  command: "GET /ajax/pb{nn}/rel"

- id: http_pb_intensity
  label: HTTP Set playback intensity
  kind: action
  command: "GET /ajax/pb{nn}/int={value}"
  params:
    - name: value
      type: float
      description: Intensity [0.0, 1.0]

- id: http_pb_rate
  label: HTTP Set playback rate
  kind: action
  command: "GET /ajax/pb{nn}/rat={value}"
  params:
    - name: value
      type: float
      description: Rate [-1.0, 1.0]

- id: http_release_all
  label: HTTP Release all playbacks
  kind: action
  command: "GET /ajax/rel"

- id: http_master_intensity
  label: HTTP Set master intensity
  kind: action
  command: "GET /ajax/int={value}"
  params:
    - name: value
      type: float
      description: Intensity [0.0, 1.0]

- id: http_master_rate
  label: HTTP Set master rate
  kind: action
  command: "GET /ajax/rat={value}"
  params:
    - name: value
      type: float
      description: Rate [-1.0, 1.0]

- id: http_master_fade
  label: HTTP Set master fade
  kind: action
  command: "GET /ajax/fad={value}"
  params:
    - name: value
      type: string

- id: http_pb_solo
  label: HTTP Start solo playback
  kind: action
  command: "GET /ajax/pb/sol={value}"
  params:
    - name: value
      type: integer
      description: Playback index [1, 6]

- id: http_tr_snapshot_dmx
  label: HTTP Snapshot DMX
  kind: action
  command: "GET /ajax/tr/snapshot/dmx"

- id: http_tr_snapshot_artnet
  label: HTTP Snapshot Art-Net
  kind: action
  command: "GET /ajax/tr/snapshot/artnet"

- id: http_tr_snapshot_sacn
  label: HTTP Snapshot sACN
  kind: action
  command: "GET /ajax/tr/snapshot/sacn"

- id: http_al_execute
  label: HTTP Execute action in actionlist
  kind: action
  command: "GET /ajax/al{nn}/{action}/exe={value}"
  params:
    - name: nn
      type: string
      description: Two-digit actionlist index [01, 08]
    - name: action
      type: integer
      description: Action index
    - name: value
      type: string

- id: http_al_enable
  label: HTTP Enable actionlist
  kind: action
  command: "GET /ajax/al{nn}/ena={value}"
  params:
    - name: value
      type: boolean

- id: http_blink
  label: HTTP Blink LED
  kind: action
  command: "GET /ajax/bli"

# === Show Control task types (Appendix B) - outbound ===
# These are configured in Show Control rather than driven via API; listed for completeness.

- id: task_playback_control
  label: Show Control Playback Task
  kind: action
  command: ""  # UNRESOLVED: configured in Show Control page; not a wire-format command
  notes: See Appendix B.1 for feature/function matrix (Jump, Intensity, Set Rate, Transport, Play State, Fader Start).

- id: task_playback_master
  label: Show Control Playback Master Task
  kind: action
  command: ""
  notes: See Appendix B.2.

- id: task_track
  label: Show Control Track Task
  kind: action
  command: ""
  notes: See Appendix B.3 (Program/Record/Erase, Intensity Map, Snapshot capture).

- id: task_udp_send
  label: Show Control UDP Send Task
  kind: action
  command: ""
  notes: See Appendix B.4 (Send Float/Unsigned/Bool/String/Bytes/Wake-on-LAN).

- id: task_osc_send
  label: Show Control OSC Send Task
  kind: action
  command: ""
  notes: See Appendix B.5 (Send Float/Unsigned/Bool/String/Colour).

- id: task_dmx_manipulate
  label: Show Control DMX Task
  kind: action
  command: ""
  notes: See Appendix B.6 (Universe HTP/Clear, Channel Set/Toggle/Control, Bump, RGB, RGBW, XY, XxYy, Ii, Block, Block RGBW, Block CW).

- id: task_midi_send
  label: Show Control MIDI Send Task
  kind: action
  command: ""
  notes: See Appendix B.7.

- id: task_mmc_send
  label: Show Control MMC Send Task
  kind: action
  command: ""
  notes: See Appendix B.8 (Start/Stop/Restart/Pause/Record/Deferred Play/Record Exit/Record Pause/Eject/Chase/Fast Forward/Rewind/Goto).

- id: task_gpi_refresh
  label: Show Control GPI Refresh Task
  kind: action
  command: ""
  notes: See Appendix B.9.

- id: task_time_server_refresh
  label: Show Control Time Server Refresh Task
  kind: action
  command: ""
  notes: See Appendix B.10.

- id: task_variable
  label: Show Control Variable Task
  kind: action
  command: ""
  notes: See Appendix B.11 (Set Toggle/Control/Inverted Control/Increment/Decrement/Continuous/Single Dimmer/Curve/Refresh).

- id: task_system_blink
  label: Show Control System Blink Task
  kind: action
  command: ""
  notes: See Appendix B.12.

- id: task_action_link
  label: Show Control Action Link Task
  kind: action
  command: ""
  notes: See Appendix B.13.

- id: task_actionlist_enable
  label: Show Control Actionlist Enable Task
  kind: action
  command: ""
  notes: See Appendix B.14.

- id: task_randomizer_refresh
  label: Show Control Randomizer Refresh Task
  kind: action
  command: ""
  notes: See Appendix B.15.

- id: task_timer
  label: Show Control Timer Task
  kind: action
  command: ""
  notes: See Appendix B.16.

- id: task_timecode
  label: Show Control Timecode Task
  kind: action
  command: ""
  notes: See Appendix B.17.

# === Show Control trigger sources (Appendix A) - events the device reacts to ===
# These describe incoming signals/timers/schedules that fire actions; enumerated for completeness.

- id: trigger_gpi_channel_change
  label: Trigger - GPI Channel Change
  kind: action
  command: ""
  notes: A.1 - Channel/Port number/Change: port state changes (digital or analog).

- id: trigger_gpi_channel_up
  label: Trigger - GPI Channel Up
  kind: action
  command: ""
  notes: A.1 - port opens.

- id: trigger_gpi_channel_down
  label: Trigger - GPI Channel Down
  kind: action
  command: ""
  notes: A.1 - port closes.

- id: trigger_gpi_channel_enter
  label: Trigger - GPI Channel Enter Range
  kind: action
  command: ""
  notes: A.1 - analog level enters 0-19, 20-39, 40-59, 60-79 or 80-100% range.

- id: trigger_gpi_channel_leave
  label: Trigger - GPI Channel Leave Range
  kind: action
  command: ""
  notes: A.1 - analog level leaves named range.

- id: trigger_gpi_binary_combination
  label: Trigger - GPI Binary Combination
  kind: action
  command: ""
  notes: A.1 - port combination value matches (port values 1/2/4/8).

- id: trigger_gpi_short_press
  label: Trigger - GPI Short Press
  kind: action
  command: ""
  notes: A.1 - short closure on port.

- id: trigger_gpi_long_press
  label: Trigger - GPI Long Press
  kind: action
  command: ""
  notes: A.1 - long closure on port.

- id: trigger_midi_message
  label: Trigger - MIDI Message
  kind: action
  command: ""
  notes: A.2 - MIDI address change/down/up.

- id: trigger_dmx_input_channel_change
  label: Trigger - DMX Input Channel Change
  kind: action
  command: ""
  notes: A.3.

- id: trigger_dmx_input_universe_change
  label: Trigger - DMX Input Universe A/B Change
  kind: action
  command: ""
  notes: A.3.

- id: trigger_dmx_receiving_start
  label: Trigger - DMX Receiving Started
  kind: action
  command: ""
  notes: A.3.

- id: trigger_playback_state_change
  label: Trigger - Playback State Change
  kind: action
  command: ""
  notes: A.4 - playback active/release/released/playing/running + intensity/cuechange/trackbegin.

- id: trigger_udp_message
  label: Trigger - UDP Message
  kind: action
  command: ""
  notes: A.5 - string match; max 31 chars; supports `trigger=value` parameter passing.

- id: trigger_tcp_message
  label: Trigger - TCP Message
  kind: action
  command: ""
  notes: A.6 - string match; max 31 chars.

- id: trigger_osc_message
  label: Trigger - OSC Message
  kind: action
  command: ""
  notes: A.7 - URI match; max 31 chars including leading `/`.

- id: trigger_artnet_channel_change
  label: Trigger - Art-Net Channel Change
  kind: action
  command: ""
  notes: A.8.

- id: trigger_artnet_universe_change
  label: Trigger - Art-Net Universe A/B Change
  kind: action
  command: ""
  notes: A.8.

- id: trigger_sacn_channel_change
  label: Trigger - sACN Channel Change
  kind: action
  command: ""
  notes: A.9.

- id: trigger_sacn_universe_change
  label: Trigger - sACN Universe A/B Change
  kind: action
  command: ""
  notes: A.9.

- id: trigger_timecode_frame
  label: Trigger - Timecode Frame
  kind: action
  command: ""
  notes: A.10.

- id: trigger_kiosc
  label: Trigger - Kiosc Button/Fader
  kind: action
  command: ""
  notes: A.11 - Button/Fader change/down/up.

- id: trigger_scheduler_weekday_time
  label: Trigger - Scheduler Weekday and Time
  kind: action
  command: ""
  notes: A.12.

- id: trigger_scheduler_sunrise
  label: Trigger - Scheduler Sunrise
  kind: action
  command: ""
  notes: A.12.

- id: trigger_scheduler_sunset
  label: Trigger - Scheduler Sunset
  kind: action
  command: ""
  notes: A.12.

- id: trigger_scheduler_timespan
  label: Trigger - Scheduler Timespan
  kind: action
  command: ""
  notes: A.12 - index [1, 4], start/finish/change.

- id: trigger_randomizer_result
  label: Trigger - Randomizer Result
  kind: action
  command: ""
  notes: A.13.

- id: trigger_system_startup
  label: Trigger - System Startup
  kind: action
  command: ""
  notes: A.14 - fired on power-up (network may not yet be online).

- id: trigger_system_network_change
  label: Trigger - System Network Connection Change
  kind: action
  command: ""
  notes: A.14.

- id: trigger_system_released_by_master
  label: Trigger - System Released By Master
  kind: action
  command: ""
  notes: A.14 - e.g. CueluxPro connection change.

- id: trigger_variable_change
  label: Trigger - Variable Change
  kind: action
  command: ""
  notes: A.15 - variable index [1, 10] (API supports 1-8; Show Control has 10), range [0, 255], change/equal/stop equal.

- id: trigger_timer_change
  label: Trigger - Timer Change
  kind: action
  command: ""
  notes: A.16 - timer index [1, 4], start/stop/change, plus stream of current time.

- id: trigger_actionlist_enable_change
  label: Trigger - Actionlist Enable Change
  kind: action
  command: ""
  notes: A.17 - actionlist index, change/down/up.

# === MSC API (Appendix D.4) ===

- id: msc_go
  label: MSC Go
  kind: action
  command: "Go"

- id: msc_timed_go
  label: MSC Timed Go
  kind: action
  command: "TimedGo"
  params:
    - name: Playback
      type: UNRESOLVED
      description: Playback=qlist
    - name: Cue
      type: UNRESOLVED
      description: Cue=qnumber
    - name: fadetime
      type: UNRESOLVED
      description: fadetime=timecode

- id: msc_go_off
  label: MSC Go Off
  kind: action
  command: "GoOff"
  params:
    - name: qnumber
      type: UNRESOLVED
      description: if qnumber is the active cue or qnumber equals 0xFF

- id: msc_go_jam_clock
  label: MSC Go Jam Clock
  kind: action
  command: "GoJamClock"
  params:
    - name: Playback
      type: UNRESOLVED
      description: Playback=qlist
    - name: Cue
      type: UNRESOLVED
      description: Cue=qnumber

- id: msc_standby_fw
  label: MSC Standby Fw
  kind: action
  command: "StandbyFw"
  params:
    - name: Playback
      type: UNRESOLVED
      description: Playback=qlist
    - name: Cue
      type: UNRESOLVED
      description: Cue=qnumber

- id: msc_standby_bw
  label: MSC Standby Bw
  kind: action
  command: "StandbyBw"
  params:
    - name: Playback
      type: UNRESOLVED
      description: Playback=qlist
    - name: Cue
      type: UNRESOLVED
      description: Cue=qnumber

- id: msc_all_of
  label: MSC All Of
  kind: action
  command: "AllOf"

- id: msc_reset
  label: MSC Reset
  kind: action
  command: "Reset"

- id: msc_stop
  label: MSC Stop
  kind: action
  command: "Stop"

- id: msc_load
  label: MSC Load
  kind: action
  command: "Load"
  params:
    - name: Cue
      type: UNRESOLVED
      description: Cue=qnumber

- id: msc_start_clock
  label: MSC Start Clock
  kind: action
  command: "StartClock"

- id: msc_stop_clock
  label: MSC Stop Clock
  kind: action
  command: "StopClock"

- id: msc_zero_clock
  label: MSC Zero Clock
  kind: action
  command: "ZeroClock"

- id: msc_set_clock
  label: MSC Set Clock
  kind: action
  command: "SetClock"

- id: msc_chase_on
  label: MSC Chase On
  kind: action
  command: "ChaseOn"

- id: msc_chase_of
  label: MSC Chase Of
  kind: action
  command: "ChaseOf"

```

## Feedbacks
```yaml
# Per Appendix D.5, the CueCore2 sends the following OSC/UDP feedback messages
# to the last four OSC and last four UDP clients whenever state changes.

- id: pb_n_intensity_fb
  type: float
  osc_message: "/core/pb/{n}/intensity"
  udp_message: "core-pb-{n}-intensity"

- id: pb_n_rate_fb
  type: float
  osc_message: "/core/pb/{n}/rate"
  udp_message: "core-pb-{n}-rate"

- id: pb_master_intensity_fb
  type: float
  osc_message: "/core/pb/intensity"
  udp_message: "core-pb-intensity"

- id: pb_master_rate_fb
  type: float
  osc_message: "/core/pb/rate"
  udp_message: "core-pb-rate"

- id: pb_master_fade_fb
  type: string
  osc_message: "/core/pb/fade"
  udp_message: "core-pb-fade"

- id: pb_n_active_fb
  type: string
  osc_message: "/core/pb/{n}/active"
  udp_message: "core-pb-{n}-active"

- id: pb_n_cue_fb
  type: string
  osc_message: "/core/pb/{n}/cue"
  udp_message: "core-pb-{n}-cue"

- id: al_n_enable_fb
  type: boolean
  osc_message: "/core/al/{n}/enable"
  udp_message: "core-al-{n}-enable"

- id: hello_reply_fb
  type: string
  osc_message: "/core/hello"
  udp_message: "core-hello"
  query_command: "/core/hello"
  notes: Reply to the polling command; useful for verifying the unit is online.

- id: goodbye_remove_fb
  type: string
  osc_message: "/core/goodbye"
  udp_message: "core-goodbye"
  notes: Sent to explicitly remove a client from the feedback list.

```

## Variables
```yaml
# The CueCore2 supports 10 internal variables per the Show Control pages (Appendix A.15),
# but the OSC/TCP/UDP/HTTP API (Appendix D.1/D.2) only references variable indices [1, 8].

- id: variable_n
  type: integer
  range: [0, 255]
  api_range_index: [1, 8]
  show_control_range_index: [1, 10]
  notes: "Set via /core/va/{n}/set, core-va-{n}-set, GET /ajax/va... or Show Control Variable task (B.11)."

- id: timer_n
  type: string
  api_range_index: [1, 4]
  notes: "Set via /core/tm/{n}/set=HH:MM:SS.f or core-tm-{n}-set=...; auto-stops at 00:00.0."

- id: timespan_n
  type: string
  show_control_range_index: [1, 4]
  notes: "Defined on Settings page (12.14); power-cycle safe."

- id: randomizer_value
  type: integer
  range: [0, 255]
  notes: "Refreshed by /core/va/refresh or Randomizer task (B.15)."

```

## Events
```yaml
# Unsolicited feedback sent to registered OSC/UDP clients.
# See "Feedbacks" section for full set; "hello" can be used as a polling/presence event.

- id: feedback_hello_event
  description: Reply to /core/hello or core-hello; indicates device presence at expected IP+port.

- id: feedback_goodbye_event
  description: Sent before client removed from feedback list (also on power-cycle which clears the list).

- id: feedback_actionlist_enable_change
  description: Actionlist enable checkbox toggled.

- id: feedback_pb_n_state_change
  description: Playback n intensity/rate/active/cue change.

```

## Macros
```yaml
# Multi-step sequences are constructed in the Show Control page using triggers + tasks.
# No fixed macro API is documented beyond the named templates in Appendix C:
# Receiving DMX, Receiving Art-Net, Receiving sACN, DMX -> Playbacks, OSC -> Playbacks,
# UDP -> Playbacks, Art-Net -> Playbacks, Kiosc -> Playbacks, DMX -> MIDI,
# Digital GPI -> 4 Playbacks.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: no API-level confirmation requirements documented
interlocks:
  - "GPI port: do not apply more than 10V - risk of permanent damage (Settings 12.13)."
  - "Firmware upgrade: do not interrupt power during upgrade (vManager 13.2)."
  - "Password-protected device: long-press reset button to disable password and revert static IP to factory defaults (Settings 12.1)."
# UNRESOLVED: fault behaviour / error recovery sequences not documented in source.

```

## Notes
- API prefix defaults to `core` (OSC) / `core-` (TCP/UDP). The prefix is configurable in Settings -> General (12.1) to prevent feedback loops between multiple Visual Productions units (D.5.1).
- TCP and UDP default listen port is 7000 (Settings 12.8). HTTP API listens on port 80 (D.3). OSC listen port and outgoing IPs are configurable in Settings -> OSC (12.6); up to four outgoing IPs, `ipaddress:port` format.
- The CueCore2 supports 6 playbacks, up to 128 tracks, 10 variables (Show Control) / 8 variables (API), 4 timers, 8 actionlists of up to 48 actions each, 4 timespans, 4 OSC outgoing IPs.
- Password protection (web interface) prevents unauthorised configuration changes (12.1); disabled by web button or long-press of reset button.
- `core-hello` / `/core/hello` doubles as a presence/ping command.
- All API commands are textual (OSC URIs, ASCII strings for TCP/UDP, GET URLs for HTTP). MSC over MIDI is also supported (D.4) for playback/cue/timecode control but byte-level MSC encoding is not transcribed in this excerpt.
- UDP message triggers (A.5) and TCP message triggers (A.6) accept user-defined strings up to 31 characters; UDP additionally supports `trigger=value` parameter syntax.
- Wake-on-LAN (B.4) recommended target: `255.255.255.255:7`.

<!-- UNRESOLVED: firmware version compatibility, voltage/current specs, full binary/hex encoding of MSC commands, OSC listen port default value, and per-channel/per-zone Show Control action variants not separately itemised. -->

## Provenance

```yaml
source_domains:
  - api.visualproductions.nl
  - ltb.no
  - manualslib.com
  - visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/633ae916812af574aa075201
  - "https://ltb.no/media/multicase/documents/visual%20productions/manual%20visual%20cuecore2_en_11.pdf"
  - https://www.manualslib.com/manual/1870075/Visual-Productions-Cuecore2.html
  - https://www.visualproductions.nl/downloads/manuals
retrieved_at: 2026-08-11T05:31:47.998Z
last_checked_at: 2026-10-07T20:35:19.309Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:35:19.309Z
matched_actions: 160
action_count: 160
confidence: medium
summary: "All 160 action units match source API tables (OSC/TCP/HTTP/MSC) or Appendix A/B entries; port 7000 and HTTP port 80 confirmed; few trigger types are uncovered. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- DateAndTime
- DaylightST
- "trigger/task feature detail beyond API command list not enumerated; per-channel / per-zone variants in Show Control not separately itemised."
- "OSC listen port is user-configurable on Settings -> OSC (12.6), default not stated in source excerpt"
- "configured in Show Control page; not a wire-format command"
- "no API-level confirmation requirements documented"
- "fault behaviour / error recovery sequences not documented in source."
- "firmware version compatibility, voltage/current specs, full binary/hex encoding of MSC commands, OSC listen port default value, and per-channel/per-zone Show Control action variants not separately itemised."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
