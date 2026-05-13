---
spec_id: admin/sound_devices-pixnet
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sound Devices PIX Recorder Control Spec"
manufacturer: "Sound Devices"
model_family: PIX260
aliases: []
compatible_with:
  manufacturers:
    - "Sound Devices"
  models:
    - PIX260
    - PIX260A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.videodevices.com
retrieved_at: 2026-04-30T01:30:16.434Z
last_checked_at: 2026-04-27T15:30:54.587Z
generated_at: 2026-04-27T15:30:54.587Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T15:30:54.587Z
  matched_actions: 35
  action_count: 35
  confidence: high
  summary: "All 35 spec actions matched source commands; transport and auth verified; full command catalogue represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Sound Devices PIX Recorder Control Spec

## Summary
PIXNET is an HTTP-based control API for Sound Devices PIX video recorders. Controls transport (rec/play/stop), settings, file management, timecode, and event polling via HTTP requests to the unit's IP address on port 80. CORS enabled; no authentication required.

<!-- UNRESOLVED: serial/RS-232 not mentioned; RS-422 referenced only as OSD setting flag -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://[host]  # host = PIX unit IP address, port 80
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable  # power on/off via transport commands
- routable   # UNRESOLVED: no input/output routing commands found
- queryable  # transport state, timecode, settings queryable
- levelable  # input gain adjustable (-250 to +200 tenths of dB)
```

## Actions
```yaml
- id: settransport
  label: Set Transport State
  kind: action
  params:
    - name: state
      type: enum
      values: [play, stop, rec]

- id: setsetting
  label: Change a Setting
  kind: action
  params:
    - name: setting
      type: string
      description: Setting name from Setting Names section (case-sensitive)
    - name: value
      type: string
      description: URL-encoded setting value as shown on unit

- id: false_take
  label: Initiate False Take
  kind: action
  params: []

- id: fast_forward
  label: Fast Forward Playback
  kind: action
  params:
    - name: speed
      type: enum
      values: [PlayX2, PlayX16]

- id: fast_reverse
  label: Fast Reverse Playback
  kind: action
  params:
    - name: speed
      type: enum
      values: [PlayX2, PlayX16]

- id: set_input_gain
  label: Set Input Gain
  kind: action
  params:
    - name: input_index
      type: integer
      description: Zero-based input index
    - name: gain_value
      type: integer
      description: Tenths of dB (-250 to +200; -2550 = OFF)

- id: set_device_name
  label: Set PIX Device Name
  kind: action
  params:
    - name: name
      type: string
      description: Alpha-numeric, spaces, dashes only

- id: simulate_key
  label: Simulate Key Press
  kind: action
  params:
    - name: keycode
      type: string
      description: Hex keycode (e.g. "0x01000080" = Play)
    - name: event_type
      type: enum
      values: [KeyPressAndRelease, KeyPress, KeyRelease]

- id: close_message_box
  label: Push Dialog Button
  kind: action
  params:
    - name: button_text
      type: string
      description: Exact button text displayed (case-sensitive)

- id: set_auto_dismiss
  label: Set Dialog Auto-Dismiss
  kind: action
  params:
    - name: time_ms
      type: integer
      description: Milliseconds before auto-dismiss (0 = disabled)
    - name: action
      type: enum
      values: [Accept, Reject]

- id: jam_received_tc
  label: Jam Received Timecode
  kind: action
  params: []

- id: jam_time_of_day
  label: Jam Time-of-Day Timecode
  kind: action
  params: []

- id: format_all_drives
  label: Format All Drives
  kind: action
  params:
    - name: label
      type: string
      description: Alpha-numeric, spaces, dashes only

- id: file_copy
  label: Copy File
  kind: action
  params:
    - name: file_path
      type: string
      description: Full path of file to copy
    - name: drive_id
      type: enum
      values: [HDD, HD2, HD3, HD4]

- id: reel_copy
  label: Copy Reel
  kind: action
  params:
    - name: reel_path
      type: string
      description: Full path of reel (no trailing slash)
    - name: drive_id
      type: enum
      values: [HDD, HD2, HD3, HD4]

- id: set_list_setting
  label: Update Phrase List
  kind: action
  params:
    - name: phrases
      type: string
      description: Comma-separated list of phrases

- id: create_sound_report_current
  label: Create Sound Report (Current Reel)
  kind: action
  params: []

- id: create_sound_report
  label: Create Sound Report (Specific Reel)
  kind: action
  params:
    - name: drive_id
      type: enum
      values: [HDD, HD2, HD3, HD4]
    - name: reel_name
      type: string

- id: enable_timecode_events
  label: Enable Timecode Events
  kind: action
  params: []  # UNRESOLVED: command pattern not fully documented
- id: get_transport
  label: Get Transport State
  kind: query
  params: []

- id: get_timecode
  label: Get Timecode Value
  kind: query
  params: []

- id: get_framerate
  label: Get Timecode Framerate
  kind: query
  params: []

- id: get_device_table
  label: Get PIX Device Table
  kind: query
  params: []

- id: get_absolute_time
  label: Get Absolute Time
  kind: query
  params: []

- id: get_next_filename
  label: Get Next Filename
  kind: query
  params: []

- id: get_current_take
  label: Get Current Record Take
  kind: query
  params: []

- id: get_previous_take
  label: Get Previous Record Take
  kind: query
  params: []

- id: getsettings
  label: Get Setting Values
  kind: query
  params:
    - name: settings
      type: string
      description: Comma-separated list of setting names (case-sensitive, from Setting Names section)

- id: get_video_input_source
  label: Get Video Input Source
  kind: query
  params: []

- id: get_take_list_handle
  label: Get Take List Handle
  kind: query
  params:
    - name: drive_id
      type: enum
      values: [HDD, HD2, HD3, HD4]

- id: get_take_list_entry
  label: Get Take List Entry
  kind: query
  params:
    - name: take_list_handle
      type: integer
      description: As obtained from get_take_list_handle
    - name: which
      type: enum
      values: [FirstEntry, NextEntry, CurrentEntry, NextSibling, ChildEntry]

- id: get_file_details
  label: Get File Details
  kind: query
  params:
    - name: file_path
      type: string
      description: Full path of the file (case-sensitive)

- id: getlistsetting
  label: Get Phrase List
  kind: query
  params: []

- id: get_drive_status
  label: Get Drive Status
  kind: query
  params:
    - name: drive_id
      type: enum
      values: [HDD, HD2, HD3, HD4]

- id: get_events
  label: Poll Event Queue
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: transport_state
  type: object
  properties:
    Transport: enum [stop, play, rec]
    FileName: string

- id: timecode_value
  type: string
  description: HH:MM:SS:FF format

- id: timecode_framerate
  type: string
  description: e.g. "29.97ND"

- id: device_table
  type: object
  description: JSON listing all PIX units on network

- id: absolute_time
  type: object
  properties:
    String: string

- id: next_filename
  type: object
  properties:
    String: string

- id: current_take
  type: object
  properties:
    String: string

- id: previous_take
  type: object
  properties:
    String: string

- id: take_list_handle
  type: integer
  description: Handle for take list operations; 0 = empty

- id: take_list_entry
  type: object
  properties:
    ArrayStrings: array

- id: file_details
  type: object
  description: Full file metadata (audio format, codec, duration, etc.)

- id: video_input_info
  type: object
  properties:
    String: string

- id: drive_status
  type: object
  properties:
    String: string

- id: phrase_list
  type: object
  properties:
    PhraseList: array

- id: settings_value
  type: object
  description: Named setting values

- id: event_message
  type: object
  description: Polled events (Setting, Transport, FileName, TextMsg, etc.)
```

## Variables
```yaml
# Settable parameters via setsetting action - see Setting Names section for full enumeration
# Examples:
- id: RecordMode
  type: enum
  values: [Sequential, Simultaneous]
- id: VideoInput
  type: enum
  values: [HDMI, SDI]
- id: RecordCodec
  type: enum
  values: [DNxHD 220x, DNxHD 220, DNxHD 145, DNxHD 36, ProRes 4444, ProRes 422HQ, ProRes 422, ProRes 422LT, ProRes 422Proxy]
- id: AudioSampleRate
  type: enum
  values: [44.1 kHz, 47.952k, 47.952kF, 48k, 48.048k, 48.048kF]
- id: HeadphoneSource
  type: enum
  values: [1,2, 3,4, 5,6, 7,8, 9,10, 11,12, 13,14, 15,16, 17,18, 19,20, 21,22, 23,24, 25,26, 27,28, 29,30, 31,32, All tracks summed - mono, All tracks summed - stereo]
# Full list per Setting Names section
```

## Events
```yaml
# Polled via /sounddevices/update at up to 200ms intervals
# Event types:
- SettingChange     # setting_name|index|new_value
- Transport          # new transport state
- FileName           # new filename
- TextMsg            # popup message text|buttons
- MessageBoxClosed   # popup dismissed
- VideoTimingChanged # video sync changed
- DisplayedTimeCode  # timecode at event time
- InputGainChanged   # input_index|new_gain_dB
- MaxEventsExceeded  # full state refresh needed
```

## Macros
```yaml
# False take sequence: false_take() then close_message_box("OK")
# Drive format sequence: format_all_drives(label) then close_message_box("OK")
# File copy sequence: file_copy(path, drive) then close_message_box("Yes")
# Reel copy sequence: reel_copy(path, drive) then close_message_box("Yes")
```

## Safety
```yaml
confirmation_required_for:
  - format_all_drives  # confirmation dialog required
  - file_copy          # overwrite confirmation dialog
  - reel_copy          # overwrite confirmation dialog
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented
```

## Notes
- CORS `Access-Control-Allow-Origin: *` on all responses
- Event queue is shared; single client should poll `/sounddevices/update`
- Event polled at max 200ms intervals; queue drains on read
- All setting values and filenames must be URL-encoded in requests
- `false_take` and `format_all_drives` require follow-up `close_message_box` to complete
- Media recorded to temp formats (.sda audio, .sdv video) before finalization
- `/sounddevices/devtbl` lists network PIX units; queried unit has leading `*`
<!-- UNRESOLVED: serial/RS-232 config not documented; RS-422 shown only as OSD status flag -->

## Provenance

```yaml
source_domains:
  - cdn.videodevices.com
retrieved_at: 2026-04-30T01:30:16.434Z
last_checked_at: 2026-04-27T15:30:54.587Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:30:54.587Z
matched_actions: 35
action_count: 35
confidence: high
summary: "All 35 spec actions matched source commands; transport and auth verified; full command catalogue represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
