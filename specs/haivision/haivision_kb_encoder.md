---
spec_id: admin/haivision-kb-encoder
schema_version: ai4av-public-spec-v1
revision: 1
title: "Haivision KB Encoder Control Spec"
manufacturer: Haivision
model_family: "KB Encoder/Transcoder"
aliases: []
compatible_with:
  manufacturers:
    - Haivision
  models:
    - "KB Encoder/Transcoder"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doc.haivision.com
source_urls:
  - "https://doc.haivision.com/__attachments/14418392/KB5.9.2%20API%20Integrator's%20Reference.pdf"
  - https://doc.haivision.com/KB/5.9.2/
retrieved_at: 2026-04-29T23:56:12.709Z
last_checked_at: 2026-06-02T22:07:28.743Z
generated_at: 2026-06-02T22:07:28.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial/RS-232 interface documented; only REST over HTTPS"
  - "firmware version compatibility not stated beyond per-command \"Active for Version\" notes"
  - "no standalone settable parameters beyond those expressed as actions (e.g. setaudiogain is action-based)"
  - "no multi-step sequences explicitly documented as macros"
  - "source does not describe safety warnings, interlock procedures, or power-on sequencing"
  - "binary/byte-level command encoding not documented (REST API only)"
  - "maximum concurrent channels not stated (license-dependent)"
  - "rate limiting behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:28.743Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Haivision KB Encoder Control Spec

## Summary
Haivision KB Encoder/Transcoder — video encoding/transcoding appliance with REST API control over HTTPS on TCP port 1080. Supports channel management, recording control, input/output routing, metadata injection, and configuration loading. JSON and XML request/response formats.

<!-- UNRESOLVED: no serial/RS-232 interface documented; only REST over HTTPS -->
<!-- UNRESOLVED: firmware version compatibility not stated beyond per-command "Active for Version" notes -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{host}:1080/ecs"
  port: 1080
auth:
  type: session
  method: POST /ecs/auth.json with username/password; returns sessionid
  header: "Authorization: {sessionid}"
  session_timeout_minutes: 30
```

## Traits
```yaml
traits:
  - powerable    # inferred: StartChannel/StopChannel commands
  - queryable    # inferred: Get Version, Get System Info, Get Channel State, etc.
  - levelable    # inferred: audio gain control (audiogaindec/audiogaininc/setaudiogain)
  - recordable   # inferred: StartRecord/StopRecord commands
```

## Actions
```yaml
actions:
  - id: login
    label: Login
    kind: action
    method: POST
    path: /ecs/auth.json
    params:
      - name: username
        type: string
        description: Valid user
      - name: password
        type: string
        description: Valid password
    response: Returns sessionid on success; 403 HTTP error on failure

  - id: logout
    label: Logout
    kind: action
    method: DELETE
    path: /ecs/auth.json
    params: []

  - id: get_version
    label: Get Version
    kind: query
    method: GET
    path: /ecs/version.json
    params: []

  - id: get_system_info
    label: Get System Information
    kind: query
    method: GET
    path: /ecs/system.json
    params: []

  - id: get_system_time
    label: Get System Time
    kind: query
    method: GET
    path: /ecs/time.json
    params: []

  - id: get_ecs_state
    label: Get ECS State
    kind: query
    method: GET
    path: /ecs.json
    params: []

  - id: get_license
    label: Get License Parameter
    kind: query
    method: GET
    path: /ecs/license.json
    params: []

  - id: reset_license
    label: Reset License
    kind: action
    method: DELETE
    path: /ecs/license.json
    params: []

  - id: get_license_state
    label: Get License State
    kind: query
    method: GET
    path: /ecs/license/state.json
    params: []

  - id: get_channel_list
    label: Get Channel List
    kind: query
    method: GET
    path: /ecs/channels.json
    params: []

  - id: create_channel
    label: Create Channel
    kind: action
    method: POST
    path: /ecs/channels.json
    params:
      - name: label
        type: string
        description: Unique label/name of the new channel
      - name: id
        type: string
        required: false
        description: Optional unique id (GUID). Auto-generated if empty.
      - name: previewonly
        type: string
        required: false
        description: '"1" for preview-only channel (no encoders/outputs)'

  - id: get_channel_state
    label: Get Channel State
    kind: query
    method: GET
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name

  - id: delete_channel
    label: Delete Channel
    kind: action
    method: DELETE
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name

  - id: start_channel
    label: Start Channel
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: command
        type: string
        description: StartChannel
      - name: param
        type: string
        required: false
        description: Optional; "startrecord" to start recording on all file outputs

  - id: prepare_stop
    label: Prepare Stop Channel
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: command
        type: string
        description: PrepareStop
      - name: param
        type: string
        required: false

  - id: stop_channel
    label: Stop Channel
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: command
        type: string
        description: StopChannel
      - name: param
        type: string
        required: false

  - id: start_record
    label: Start Recording
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: command
        type: string
        description: StartRecord
      - name: param
        type: string
        required: false

  - id: stop_record
    label: Stop Recording
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: command
        type: string
        description: StopRecord
      - name: param
        type: string
        required: false

  - id: input_audio_gain_dec
    label: Decrease Input Audio Gain
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/inputs/{input_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: input_id
        type: string
        description: Input label, e.g. "Device_DeckLink_Baseband_2"
      - name: command
        type: string
        description: audiogaindec - decreases audio gain by 5.0 dB
      - name: param
        type: string
        required: false

  - id: input_audio_gain_inc
    label: Increase Input Audio Gain
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/inputs/{input_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: input_id
        type: string
        description: Input label
      - name: command
        type: string
        description: audiogaininc - increases audio gain by 5.0 dB
      - name: param
        type: string
        required: false

  - id: set_input_audio_gain
    label: Set Input Audio Gain
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/inputs/{input_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: input_id
        type: string
        description: Input label
      - name: command
        type: string
        description: setaudiogain
      - name: param
        type: string
        description: "dB value, range -20 to +40 (e.g. \"-10.0\")"

  - id: enable_output
    label: Enable Output
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/outputs/{encode_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: encode_id
        type: string
        description: Output label specified at creation
      - name: command
        type: string
        description: EnableOutput
      - name: param
        type: string
        required: false

  - id: disable_output
    label: Disable Output
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/outputs/{encode_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: encode_id
        type: string
        description: Output label specified at creation
      - name: command
        type: string
        description: DisableOutput
      - name: param
        type: string
        required: false

  - id: get_channel_signals
    label: Get Channel Signal List
    kind: query
    method: GET
    path: /ecs/channels/{channel_id}/signals.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: option
        type: string
        required: false
        description: "time, timespan, or index"
      - name: option_value
        type: string
        required: false
        description: "HH:MM:SS:mmm for time, seconds for timespan, integer for index"

  - id: get_video_preview
    label: Get Video Preview
    kind: query
    method: GET
    path: /ecs/channels/{channel_id}/preview.jpg
    params:
      - name: channel_id
        type: string
        description: Channel label or name
    response: JPEG image (default 356x200, quality 80)

  - id: inject_metadata
    label: Inject Metadata
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/outputs/{output_id}/streams/{stream_id}.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: output_id
        type: string
        description: Encode identifier
      - name: stream_id
        type: string
        description: Stream component label from channel state
      - name: data
        type: array
        description: Array of metadata objects with label, type (int/double/bool/string), and value

  - id: inject_adcue
    label: Inject AdCue Message
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/inputs/{input_id}/adcue.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: input_id
        type: string
        description: Input label
      - name: type
        type: string
        description: "SpliceOut or scte35"
      - name: cue
        type: string
        required: false
        description: SCTE-35 message in XML (only for scte35 type)
      - name: duration
        type: string
        description: Ad insertion duration in seconds
      - name: offset
        type: string
        required: false
        description: Offset from current stream time in seconds
      - name: repeat
        type: string
        required: false
        description: '"true" if repetition of previous message'

  - id: get_channel_configs
    label: Get Channel Configurations
    kind: query
    method: GET
    path: /ecs/channelconfigs.json
    params: []

  - id: review_channel_config
    label: Review Channel Configuration
    kind: query
    method: GET
    path: /ecs/channels/{channel_id}/preset.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name

  - id: load_channel_config
    label: Load Channel Configuration
    kind: action
    method: PUT
    path: /ecs/channels/{channel_id}/preset.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
      - name: config
        type: object
        description: Full channel configuration object (JSON)

  - id: get_config_label
    label: Get Configuration Label
    kind: query
    method: GET
    path: /ecs/channels/{channel_id}/preset/label.json
    params:
      - name: channel_id
        type: string
        description: Channel label or name
```

## Feedbacks
```yaml
feedbacks:
  - id: version_info
    type: object
    description: ECS version (major, minor, subminor, build, type)
    source: get_version

  - id: system_info
    type: object
    description: CPU, memory, Decklink cards, uptime
    source: get_system_info

  - id: system_time
    type: object
    description: Local and UTC time (year, month, day, hour, minute, second)
    source: get_system_time

  - id: ecs_state
    type: object
    description: Current ECS state
    source: get_ecs_state

  - id: license_info
    type: object
    description: License details (channels, demo_mode, expired, valid, dates, etc.)
    source: get_license

  - id: license_state
    type: object
    description: License state (mac, registered_channels, type)
    source: get_license_state

  - id: channel_list
    type: array
    description: Running channels with id, label, outoforder, port, startcounter
    source: get_channel_list

  - id: channel_state
    type: object
    description: Full state data for a specified channel
    source: get_channel_state

  - id: channel_signals
    type: array
    description: Signal events on a channel (INPUT_VIDEO_FORMAT, INPUT_AUDIO_FORMAT, CHANNEL_START, etc.)
    source: get_channel_signals

  - id: config_label
    type: string
    description: Label of a channel's configuration
    source: get_config_label

  - id: channel_configs
    type: array
    description: All channel configurations available in the web interface (running and idle)
    source: get_channel_configs

  - id: api_response_message
    type: object
    description: Standard response with messages array (info/warning/error type + text)
    source: all mutations
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond those expressed as actions (e.g. setaudiogain is action-based)
```

## Events
```yaml
events:
  - id: channel_start_signal
    description: Channel started (CHANNEL_START signal)

  - id: channel_stop_signal
    description: Channel stopped (CHANNEL_STOP signal)

  - id: input_signal_lost
    description: Input component detects no input signal (INPUT_SIGNAL_LOST)

  - id: input_signal_restored
    description: Input signal detected after loss (LOST_CAPTURE_SIGNAL_BACK)

  - id: input_video_format
    description: Video format of received stream - width:height:framerate

  - id: input_audio_format
    description: Audio format of received stream - samplerate:channels:bitspersample

  - id: stream_started
    description: Network stream started (STREAM_STARTED)

  - id: stream_stopped
    description: Network stream stopped (STREAM_STOPPED)

  - id: scte35_message
    description: SCTE-35/104 message received on input

  - id: error
    description: Unhandled error signal with error string

  - id: low_input_framerate
    description: Input video framerate below expected

  - id: low_input_samplerate
    description: Input audio sample rate below expected
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented as macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- API is HTTPS-only (TLS/SSL required). Self-signed certificate used by default; custom certificate configurable.
- Session IDs expire 30 minutes after last API call or on logout.
- Both JSON (`.json`) and XML (`.xml`) URL suffixes are supported for request/response content type negotiation.
- `PrepareStop` should be called before `StopChannel` to flush buffers and close recordings gracefully.
- Channel IDs referenced in the API are GUIDs (128-bit hex, 8-4-4-4-12 format) or channel labels.
- Standard error codes include: `KULA_ERROR_ALREADY_EXISTS`, `KULA_ERROR_LICENSE_NO_FREE_CHANNEL`, `KULA_ERROR_WRONG_STATE`, etc.
- API documented at version 5.9.2 (document ID HVS-ID-API-KB-5.9.2). Individual commands have varying "Active for Version" minimums (4.0–5.9+).

<!-- UNRESOLVED: binary/byte-level command encoding not documented (REST API only) -->
<!-- UNRESOLVED: maximum concurrent channels not stated (license-dependent) -->
<!-- UNRESOLVED: rate limiting behavior not documented -->

## Provenance

```yaml
source_domains:
  - doc.haivision.com
source_urls:
  - "https://doc.haivision.com/__attachments/14418392/KB5.9.2%20API%20Integrator's%20Reference.pdf"
  - https://doc.haivision.com/KB/5.9.2/
retrieved_at: 2026-04-29T23:56:12.709Z
last_checked_at: 2026-06-02T22:07:28.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:28.743Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial/RS-232 interface documented; only REST over HTTPS"
- "firmware version compatibility not stated beyond per-command \"Active for Version\" notes"
- "no standalone settable parameters beyond those expressed as actions (e.g. setaudiogain is action-based)"
- "no multi-step sequences explicitly documented as macros"
- "source does not describe safety warnings, interlock procedures, or power-on sequencing"
- "binary/byte-level command encoding not documented (REST API only)"
- "maximum concurrent channels not stated (license-dependent)"
- "rate limiting behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
