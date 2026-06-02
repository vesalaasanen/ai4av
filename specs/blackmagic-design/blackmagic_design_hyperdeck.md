---
spec_id: admin/blackmagic-design-hyperdeck
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blackmagic Design HyperDeck Control Spec"
manufacturer: "Blackmagic Design"
model_family: "HyperDeck Extreme"
aliases: []
compatible_with:
  manufacturers:
    - "Blackmagic Design"
  models:
    - "HyperDeck Extreme"
    - "HyperDeck Extreme HDR"
    - "HyperDeck Extreme 8K HDR"
    - "HyperDeck Studio"
    - "HyperDeck Studio Pro"
    - "HyperDeck Studio Plus"
    - "HyperDeck Studio 4K Pro"
    - "HyperDeck Shuttle"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - https://documents.blackmagicdesign.com/DeveloperManuals/HyperDeckEthernetProtocol.pdf
retrieved_at: 2026-04-30T04:40:45.767Z
last_checked_at: 2026-06-02T21:54:37.032Z
generated_at: 2026-06-02T21:54:37.032Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific firmware version compatibility not stated in source"
  - "exact model feature differences beyond video format support not fully documented"
  - "source describes authenticate command with username/password"
  - "power-on sequencing requirements not stated in source"
  - "exact model-to-feature mapping not fully documented (which models support NAS, slate, etc.)"
  - "maximum concurrent client connections not stated (only that it is limited)"
  - "whether authentication is required by default or only on certain configurations"
  - "watchdog default period not stated"
  - "protocol version number not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:37.032Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions traced to source HyperDeck protocol documentation. Commands match source syntax and parameter structure. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blackmagic Design HyperDeck Control Spec

## Summary
The Blackmagic Design HyperDeck family of disk recorders and playback decks can be controlled over Ethernet via a line-oriented text protocol on TCP port 9993. The protocol supports transport control (play, record, stop, jog, shuttle), clip and timeline management, slot selection, configuration, asynchronous event notifications, and digital slate metadata. This spec covers all models in the HyperDeck range.

<!-- UNRESOLVED: specific firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model feature differences beyond video format support not fully documented -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9993
auth:
  type: password  # UNRESOLVED: source describes authenticate command with username/password
  # and error codes 121 (authentication failed) and 122 (authentication required),
  # but does not state whether auth is required by default or only on certain configurations
```

## Traits
```yaml
traits:
  - powerable    # inferred: reboot command present
  - queryable    # inferred: extensive query commands (transport info, slot info, device info, configuration, clip info)
  - routable     # inferred: slot select, video format selection, input routing commands
  - levelable    # inferred: play speed -5000 to 5000, shuttle speed control
```

## Actions
```yaml
actions:
  - id: play
    label: Play
    kind: action
    params:
      - name: speed
        type: integer
        description: "Play speed percentage (-5000 to 5000)"
      - name: loop
        type: boolean
        description: "Loop playback"
      - name: single_clip
        type: boolean
        description: "Play single clip instead of all clips"
      - name: clip_id
        type: integer
        description: "Play from specified clip ID"
      - name: timecode
        type: string
        description: "Play from timecode position (HH:MM:SS:FF)"

  - id: stop
    label: Stop
    kind: action
    params: []

  - id: record
    label: Record
    kind: action
    params:
      - name: name
        type: string
        description: "Name for the recorded clip"

  - id: record_spill
    label: Record Spill
    kind: action
    params:
      - name: slot_id
        type: integer
        description: "Spill recording to specified slot ID"

  - id: goto
    label: Go To
    kind: action
    params:
      - name: clip_id
        type: string
        description: "Clip ID (integer, +/-offset, or start/end)"
      - name: clip
        type: string
        description: "Frame position within clip (integer, +/-offset, or start/end)"
      - name: timeline
        type: string
        description: "Timeline position (integer, +/-offset, or start/end)"
      - name: timecode
        type: string
        description: "Timecode position (HH:MM:SS:FF, +/-duration)"
      - name: slot_id
        type: integer
        description: "Switch to specified slot ID"

  - id: jog
    label: Jog
    kind: action
    params:
      - name: timecode
        type: string
        description: "Jog to timecode (HH:MM:SS:FF, +/-duration)"

  - id: shuttle
    label: Shuttle
    kind: action
    params:
      - name: speed
        type: integer
        description: "Shuttle speed (-5000 to 5000)"

  - id: slot_select
    label: Select Slot
    kind: action
    params:
      - name: slot_id
        type: integer
        description: "Slot ID to select"
      - name: device
        type: string
        description: "Disk device name to select"
      - name: video_format
        type: string
        description: "Video format for clip filtering"

  - id: slot_unblock
    label: Unblock Slot
    kind: action
    params:
      - name: slot_id
        type: integer
        description: "Slot ID to unblock"
      - name: device
        type: string
        description: "Disk device name to unblock"

  - id: external_drive_select
    label: Select External Drive
    kind: action
    params:
      - name: device
        type: string
        description: "External drive device name"

  - id: preview
    label: Preview Mode
    kind: action
    params:
      - name: enable
        type: boolean
        description: "Enable or disable preview mode"

  - id: remote_enable
    label: Remote Control Enable
    kind: action
    params:
      - name: enable
        type: boolean
        description: "Enable or disable remote control"

  - id: remote_override
    label: Remote Override
    kind: action
    params:
      - name: enable
        type: boolean
        description: "Override remote control state for current session"

  - id: playrange_set
    label: Set Play Range
    kind: action
    params:
      - name: clip_id
        type: integer
        description: "Starting clip ID"
      - name: count
        type: integer
        description: "Number of clips to include"
      - name: in
        type: string
        description: "In timecode (HH:MM:SS:FF)"
      - name: out
        type: string
        description: "Out timecode (HH:MM:SS:FF)"
      - name: timeline_in
        type: integer
        description: "Timeline frame in position"
      - name: timeline_out
        type: integer
        description: "Timeline frame out position"

  - id: playrange_clear
    label: Clear Play Range
    kind: action
    params: []

  - id: play_on_startup
    label: Play on Startup
    kind: action
    params:
      - name: enable
        type: boolean
        description: "Enable or disable play on startup"
      - name: single_clip
        type: boolean
        description: "Play single clip or all clips on startup"

  - id: play_option
    label: Play Option
    kind: action
    params:
      - name: stop_mode
        type: string
        description: "Output frame when stopped (lastframe, nextframe, black)"

  - id: configuration
    label: Configure
    kind: action
    params:
      - name: video_input
        type: string
        description: "Video input (SDI, 4xSDI, HDMI, component, composite)"
      - name: audio_input
        type: string
        description: "Audio input (embedded, XLR, RCA)"
      - name: file_format
        type: string
        description: "Recording file format"
      - name: audio_codec
        type: string
        description: "Audio codec (PCM, AAC)"
      - name: timecode_input
        type: string
        description: "Timecode source (external, embedded, internal, preset, clip)"
      - name: timecode_output
        type: string
        description: "Timecode output (clip, timeline)"
      - name: timecode_preference
        type: string
        description: "Timecode type (default, dropframe, nondropframe)"
      - name: timecode_preset
        type: string
        description: "Preset timecode value (HH:MM:SS:FF)"
      - name: audio_input_channels
        type: integer
        description: "Number of audio input channels"
      - name: record_trigger
        type: string
        description: "Record trigger mode (none, recordbit, timecoderun)"
      - name: record_prefix
        type: string
        description: "File name prefix for recordings"
      - name: record_cache
        type: boolean
        description: "Enable or disable record cache"
      - name: append_timestamp
        type: boolean
        description: "Append timestamp to file names"
      - name: usb_spill
        type: boolean
        description: "Enable/disable spilling between USB disks"
      - name: reference_source
        type: string
        description: "Reference signal source (auto, input, external)"
      - name: genlock_input_resync
        type: boolean
        description: "Enable/disable genlock input resync"
      - name: default_standard
        type: string
        description: "Default playback video format"
      - name: xlr_mapping
        type: string
        description: "Map XLR inputs to channels starting from channel N, or none"
      - name: rca_mapping
        type: string
        description: "Map RCA inputs to channels starting from channel N, or none"

  - id: clips_add
    label: Add Clip to Timeline
    kind: action
    params:
      - name: in
        type: string
        description: "In timecode"
      - name: out
        type: string
        description: "Out timecode"
      - name: frame_in
        type: integer
        description: "In frame number"
      - name: frame_out
        type: integer
        description: "Out frame number"
      - name: name
        type: string
        description: "Clip name"

  - id: clips_remove
    label: Remove Clip from Timeline
    kind: action
    params:
      - name: clip_id
        type: integer
        description: "Clip ID to remove"

  - id: clips_clear
    label: Clear Timeline
    kind: action
    params: []

  - id: clips_rebuild
    label: Rebuild Timeline
    kind: action
    params: []

  - id: notify
    label: Set Notifications
    kind: action
    params:
      - name: transport
        type: boolean
      - name: slot
        type: boolean
      - name: remote
        type: boolean
      - name: configuration
        type: boolean
      - name: dropped_frames
        type: boolean
      - name: display_timecode
        type: boolean
      - name: timeline_position
        type: boolean
      - name: playrange
        type: boolean
      - name: cache
        type: boolean
      - name: dynamic_range
        type: boolean
      - name: slate
        type: boolean
      - name: clips
        type: boolean
      - name: disk
        type: boolean
      - name: device_info
        type: boolean
      - name: nas
        type: boolean

  - id: format_prepare
    label: Prepare Format
    kind: action
    params:
      - name: slot_id
        type: integer
        description: "Slot ID (omit for current)"
      - name: device
        type: string
        description: "Disk device name"
      - name: prepare
        type: string
        description: "Filesystem type (exFAT, HFS+)"
      - name: name
        type: string
        description: "Volume name (supports UTF-8)"

  - id: format_confirm
    label: Confirm Format
    kind: action
    params:
      - name: token
        type: string
        description: "Token from format prepare response"

  - id: identify
    label: Identify Device
    kind: action
    params:
      - name: enable
        type: boolean

  - id: watchdog
    label: Set Watchdog
    kind: action
    params:
      - name: period
        type: integer
        description: "Timeout period in seconds (0 to disable)"

  - id: reboot
    label: Reboot
    kind: action
    params: []

  - id: authenticate
    label: Authenticate
    kind: action
    params:
      - name: username
        type: string
        description: "Case-sensitive username"
      - name: password
        type: string
        description: "Case-sensitive password"

  - id: dynamic_range
    label: Set Dynamic Range
    kind: action
    params:
      - name: playback_override
        type: string
        description: "off, Rec709, Rec2020_SDR, HLG, ST2084_300, ST2084_500, ST2084_800, ST2084_1000, ST2084_2000, ST2084_4000, ST2084"
      - name: record_override
        type: string
        description: "off, Rec709, Rec2020_SDR, HLG, ST2084_300, ST2084_500, ST2084_800, ST2084_1000, ST2084_2000, ST2084_4000, ST2084"

  - id: slate_clips
    label: Set Slate Clips
    kind: action
    params:
      - name: reel
        type: integer
        description: "Reel number (1-999)"
      - name: scene_id
        type: string
        description: "Scene ID"
      - name: shot_type
        type: string
        description: "WS, MS, CU, BCU, MCU, ECU, none"
      - name: take
        type: integer
        description: "Take number (1-99)"
      - name: take_scenario
        type: string
        description: "PU, VFX, SER, none"
      - name: take_auto_inc
        type: boolean
      - name: good_take
        type: boolean
      - name: environment
        type: string
        description: "interior, exterior"
      - name: day_night
        type: string
        description: "day, night"

  - id: slate_project
    label: Set Slate Project
    kind: action
    params:
      - name: project_name
        type: string
      - name: camera
        type: string
        description: "Camera index e.g. A"
      - name: director
        type: string
      - name: camera_operator
        type: string

  - id: slate_lens
    label: Set Slate Lens
    kind: action
    params:
      - name: lens_type
        type: string
      - name: iris
        type: string
      - name: focal_length
        type: string
      - name: distance
        type: string
      - name: filter
        type: string

  - id: nas_add
    label: Add NAS Bookmark
    kind: action
    params:
      - name: url
        type: string
        description: "NAS share URL e.g. smb://server.local/path"
      - name: username
        type: string
        description: "Username (optional, defaults to guest)"
      - name: password
        type: string
        description: "Password (optional)"

  - id: nas_remove
    label: Remove NAS Bookmark
    kind: action
    params:
      - name: url
        type: string
        description: "NAS share URL"

  - id: nas_select
    label: Mount NAS Share
    kind: action
    params:
      - name: url
        type: string
        description: "NAS share URL"

  - id: nas_deselect
    label: Unmount NAS Share
    kind: action
    params: []

  - id: quit
    label: Disconnect
    kind: action
    params: []

  - id: ping
    label: Ping
    kind: action
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: transport_info
    type: composite
    description: "Current transport state"
    fields:
      - name: status
        type: enum
        values: [preview, stopped, play, forward, rewind, jog, shuttle, record]
      - name: speed
        type: integer
        description: "Play speed (-5000 to 5000 %)"
      - name: slot_id
        type: string
        description: "Active slot ID or 'none'"
      - name: clip_id
        type: string
        description: "Active clip ID or 'none'"
      - name: single_clip
        type: boolean
      - name: display_timecode
        type: string
        description: "Timecode shown on front panel (HH:MM:SS:FF)"
      - name: timecode
        type: string
        description: "Current timeline/clip timecode (HH:MM:SS:FF)"
      - name: video_format
        type: string
      - name: loop
        type: boolean
      - name: timeline
        type: integer
      - name: input_video_format
        type: string
      - name: dynamic_range
        type: string
      - name: reference_locked
        type: boolean

  - id: device_info
    type: composite
    description: "Device identification"
    fields:
      - name: protocol_version
        type: string
      - name: model
        type: string
      - name: unique_id
        type: string
      - name: slot_count
        type: integer
      - name: software_version
        type: string
      - name: name
        type: string

  - id: slot_info
    type: composite
    description: "Slot status"
    fields:
      - name: slot_id
        type: integer
      - name: slot_name
        type: string
      - name: device_name
        type: string
      - name: status
        type: enum
        values: [empty, mounting, error, mounted]
      - name: volume_name
        type: string
      - name: recording_time
        type: integer
        description: "Available recording time in seconds"
      - name: video_format
        type: string
      - name: blocked
        type: boolean
      - name: remaining_size
        type: integer
        description: "Remaining size in bytes"
      - name: total_size
        type: integer
        description: "Total size in bytes"

  - id: disk_list
    type: composite
    description: "List of playable clips on disk"
    fields:
      - name: slot_id
        type: integer
      - name: clips
        type: array
        description: "List of {index, name, file_format, video_format, duration_timecode}"

  - id: clips_count
    type: composite
    description: "Number of clips on timeline"
    fields:
      - name: clip_count
        type: integer

  - id: clips_get
    type: composite
    description: "Timeline clip info"
    fields:
      - name: clip_count
        type: integer
      - name: clips
        type: array
        description: "List of {clip_id, name, start_timecode, duration_timecode}"

  - id: clip_info
    type: composite
    description: "Individual clip info"
    fields:
      - name: clip_id
        type: integer
      - name: name
        type: string
      - name: start_timecode
        type: string
      - name: duration_timecode
        type: string

  - id: configuration
    type: composite
    description: "Current device configuration"
    fields:
      - name: audio_input
        type: enum
        values: [embedded, XLR, RCA]
      - name: video_input
        type: enum
        values: [SDI, 4xSDI, HDMI, component, composite]
      - name: file_format
        type: string
      - name: audio_codec
        type: enum
        values: [PCM, AAC]
      - name: timecode_input
        type: enum
        values: [external, embedded, preset, clip]
      - name: timecode_output
        type: enum
        values: [clip, timeline]
      - name: timecode_preference
        type: enum
        values: [default, dropframe, nondropframe]
      - name: timecode_preset
        type: string
      - name: audio_input_channels
        type: integer
      - name: record_trigger
        type: enum
        values: [none, recordbit, timecoderun]
      - name: record_prefix
        type: string
      - name: record_cache
        type: boolean
      - name: append_timestamp
        type: boolean
      - name: reference_source
        type: enum
        values: [auto, input, external]
      - name: genlock_input_resync
        type: boolean
      - name: usb_spill
        type: boolean
      - name: default_standard
        type: string
      - name: xlr_mapping
        type: string
      - name: rca_mapping
        type: string

  - id: remote_info
    type: composite
    description: "Remote control state"
    fields:
      - name: enabled
        type: boolean
      - name: override
        type: boolean

  - id: notify_status
    type: composite
    description: "Current notification subscription state"
    fields:
      - name: transport
        type: boolean
      - name: slot
        type: boolean
      - name: remote
        type: boolean
      - name: configuration
        type: boolean
      - name: dropped_frames
        type: boolean
      - name: display_timecode
        type: boolean
      - name: timeline_position
        type: boolean
      - name: playrange
        type: boolean
      - name: cache
        type: boolean
      - name: dynamic_range
        type: boolean
      - name: slate
        type: boolean
      - name: clips
        type: boolean
      - name: disk
        type: boolean
      - name: device_info
        type: boolean
      - name: nas
        type: boolean

  - id: playrange
    type: composite
    description: "Current play range setting"

  - id: play_on_startup
    type: composite
    description: "Play on startup state"
    fields:
      - name: enabled
        type: boolean
      - name: single_clip
        type: boolean

  - id: play_option
    type: composite
    description: "Play stop mode setting"
    fields:
      - name: stop_mode
        type: enum
        values: [lastframe, nextframe, black]

  - id: commands
    type: string
    description: "Supported commands in XML format"

  - id: external_drive_list
    type: array
    description: "Available USB/network drives"

  - id: external_drive_selected
    type: string
    description: "Currently selected external drive"

  - id: cache_info
    type: composite
    description: "Cache status"

  - id: dynamic_range
    type: composite
    description: "Dynamic range settings"

  - id: uptime
    type: string
    description: "Time since last boot"

  - id: spill_order
    type: composite
    description: "Record spill device order"

  - id: nas_list
    type: array
    description: "NAS share bookmarks"

  - id: nas_discovered
    type: array
    description: "NAS servers discovered via mDNS"

  - id: nas_selected
    type: composite
    description: "Currently selected NAS share"

  - id: help
    type: string
    description: "Human-readable help text for all commands"
```

## Variables
```yaml
variables: []  # No persistent settable variables beyond configuration actions
```

## Events
```yaml
events:
  - id: connection_info
    code: 500
    description: "Sent on connection with protocol version and model name"
    fields:
      - name: protocol_version
        type: string
      - name: model
        type: string

  - id: transport_info_async
    code: 508
    description: "Asynchronous transport state change notification"
    fields:
      - name: status
        type: enum
        values: [preview, stopped, play, forward, rewind, jog, shuttle, record]
      - name: speed
        type: integer
      - name: slot_id
        type: string
      - name: clip_id
        type: string
      - name: single_clip
        type: boolean
      - name: display_timecode
        type: string
      - name: timecode
        type: string
      - name: video_format
        type: string
      - name: loop
        type: boolean
      - name: timeline
        type: integer

  - id: slot_info_async
    code: 502
    description: "Asynchronous slot state change notification"
    fields:
      - name: slot_id
        type: integer
      - name: status
        type: enum
        values: [empty, mounting, error, mounted]
      - name: volume_name
        type: string
      - name: recording_time
        type: integer
      - name: video_format
        type: string
      - name: blocked
        type: boolean

  - id: remote_info_async
    code: 510
    description: "Asynchronous remote control state change notification"
    fields:
      - name: enabled
        type: boolean
      - name: override
        type: boolean

  - id: configuration_async
    code: 511
    description: "Asynchronous configuration change notification"

  - id: connection_rejected
    code: 120
    description: "Connection rejected due to too many concurrent clients"
```

## Macros
```yaml
macros: []  # No multi-step sequences explicitly defined in source
```

## Safety
```yaml
confirmation_required_for:
  - format_confirm  # requires token from format_prepare
interlocks:
  - playback stops when switching to preview mode
  - switching to playback not permitted during record; must stop first
  - remote: enable must be true or override must be true for ethernet control to work
  - file format changes may cause deck reboot (response 213), closing client connection
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes
The HyperDeck protocol is line-oriented text over TCP. Commands use a `{command}: {param}: {value}` syntax with optional multiline form. Client messages may use LF or CR LF line terminators; server responses use CR LF. Error codes range from 100-199 (failures), successful responses 200-299, and asynchronous notifications 500-599. The `notify` command enables/disables async event subscriptions (all disabled by default). Video format and file format support varies by model. Clip IDs are invalidated when clips are removed from the timeline. The `remote: override` setting is session-scoped and resets when the connection closes.

<!-- UNRESOLVED: exact model-to-feature mapping not fully documented (which models support NAS, slate, etc.) -->
<!-- UNRESOLVED: maximum concurrent client connections not stated (only that it is limited) -->
<!-- UNRESOLVED: whether authentication is required by default or only on certain configurations -->
<!-- UNRESOLVED: watchdog default period not stated -->
<!-- UNRESOLVED: protocol version number not stated -->

## Provenance

```yaml
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - https://documents.blackmagicdesign.com/DeveloperManuals/HyperDeckEthernetProtocol.pdf
retrieved_at: 2026-04-30T04:40:45.767Z
last_checked_at: 2026-06-02T21:54:37.032Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:37.032Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions traced to source HyperDeck protocol documentation. Commands match source syntax and parameter structure. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific firmware version compatibility not stated in source"
- "exact model feature differences beyond video format support not fully documented"
- "source describes authenticate command with username/password"
- "power-on sequencing requirements not stated in source"
- "exact model-to-feature mapping not fully documented (which models support NAS, slate, etc.)"
- "maximum concurrent client connections not stated (only that it is limited)"
- "whether authentication is required by default or only on certain configurations"
- "watchdog default period not stated"
- "protocol version number not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
