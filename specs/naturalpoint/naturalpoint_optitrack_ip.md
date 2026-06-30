---
spec_id: admin/naturalpoint-optitrack
schema_version: ai4av-public-spec-v1
revision: 1
title: "NaturalPoint OptiTrack (NatNet) Control Spec"
manufacturer: NaturalPoint
model_family: "OptiTrack (Motive NatNet server)"
aliases: []
compatible_with:
  manufacturers:
    - NaturalPoint
  models:
    - "OptiTrack (Motive NatNet server)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.optitrack.com
source_urls:
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-remote-requests-commands
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-4.5
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-class-function-reference
  - https://docs.optitrack.com/motive/data-streaming
  - https://docs.optitrack.com/developer-tools
retrieved_at: 2026-06-29T19:09:57.013Z
last_checked_at: 2026-06-30T07:12:10.143Z
generated_at: 2026-06-30T07:12:10.143Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "discovery/multicast/local-clock parameters not covered; only remote-request commands documented."
  - "source describes response handling as raw byte arrays parsed by caller (BitConverter.ToInt32 / ToSingle)."
  - "documented only as \"0 if successful\"; no enum values listed"
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "no firmware version compatibility ranges stated; only \"Motive 3.0 or above\" for subscription commands."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:12:10.143Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions verified against source; transport parameters confirmed; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# NaturalPoint OptiTrack (NatNet) Control Spec

## Summary
Spec covers remote NatNet commands sent from a client application to the Motive server over a UDP connection. Commands are plain strings, comma-delimited, transmitted via `NatNetClient::SendMessageAndWait`. The reference Motive server is part of the NaturalPoint OptiTrack motion-capture product line.

<!-- UNRESOLVED: discovery/multicast/local-clock parameters not covered; only remote-request commands documented. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 1510
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No power/routing/level/queryable traits apply at the documented level.
# GetProperty/SetProperty return Int values and could be considered queryable.
- queryable  # inferred: query commands returning values present
```

## Actions
```yaml
- id: units_to_millimeters
  label: UnitsToMillimeters
  kind: query
  command: "UnitsToMillimeters"
  params: []
- id: frame_rate
  label: FrameRate
  kind: query
  command: "FrameRate"
  params: []
- id: current_mode
  label: CurrentMode
  kind: query
  command: "CurrentMode"
  params: []
- id: start_recording
  label: StartRecording
  kind: action
  command: "StartRecording"
  params: []
- id: stop_recording
  label: StopRecording
  kind: action
  command: "StopRecording"
  params: []
- id: live_mode
  label: LiveMode
  kind: action
  command: "LiveMode"
  params: []
- id: edit_mode
  label: EditMode
  kind: action
  command: "EditMode"
  params: []
- id: timeline_play
  label: TimelinePlay
  kind: action
  command: "TimelinePlay"
  params: []
- id: timeline_stop
  label: TimelineStop
  kind: action
  command: "TimelineStop"
  params: []
- id: set_playback_take_name
  label: SetPlaybackTakeName
  kind: action
  command: "SetPlaybackTakeName,{TakeName}"
  params:
    - name: TakeName
      type: string
      description: Take name
- id: set_record_take_name
  label: SetRecordTakeName
  kind: action
  command: "SetRecordTakeName,{TakeName}"
  params:
    - name: TakeName
      type: string
      description: Take name
- id: set_current_session
  label: SetCurrentSession
  kind: action
  command: "SetCurrentSession,{SessionName}"
  params:
    - name: SessionName
      type: string
      description: Session name (or absolute path)
- id: current_session_path
  label: CurrentSessionPath
  kind: query
  command: "CurrentSessionPath"
  params: []
- id: set_playback_start_frame
  label: SetPlaybackStartFrame
  kind: action
  command: "SetPlaybackStartFrame,{FrameNumber}"
  params:
    - name: FrameNumber
      type: integer
      description: Frame number
- id: set_playback_stop_frame
  label: SetPlaybackStopFrame
  kind: action
  command: "SetPlaybackStopFrame,{FrameNumber}"
  params:
    - name: FrameNumber
      type: integer
      description: Frame number
- id: set_playback_current_frame
  label: SetPlaybackCurrentFrame
  kind: action
  command: "SetPlaybackCurrentFrame,{FrameNumber}"
  params:
    - name: FrameNumber
      type: integer
      description: Frame number
- id: set_playback_looping_enable
  label: SetPlaybackLooping (Enable)
  kind: action
  command: "SetPlaybackLooping"
  params: []
- id: set_playback_looping_disable
  label: SetPlaybackLooping (Disable)
  kind: action
  command: "SetPlaybackLooping, 0"
  params: []
- id: enable_asset
  label: EnableAsset
  kind: action
  command: "EnableAsset,{AssetName}"
  params:
    - name: AssetName
      type: string
      description: Asset name (rigid body / skeleton)
- id: disable_asset
  label: DisableAsset
  kind: action
  command: "DisableAsset,{AssetName}"
  params:
    - name: AssetName
      type: string
      description: Asset name (rigid body / skeleton)
- id: get_property
  label: GetProperty
  kind: query
  command: "GetProperty,{NodeName},{PropertyName}"
  params:
    - name: NodeName
      type: string
      description: Node name (or Streaming ID for rigid bodies)
    - name: PropertyName
      type: string
      description: Property name (must match Motive display name exactly)
- id: set_property
  label: SetProperty
  kind: action
  command: "SetProperty,{NodeName},{PropertyName},{Value}"
  params:
    - name: NodeName
      type: string
      description: Node name (empty if not applicable; "model #[serial]" for cameras)
    - name: PropertyName
      type: string
      description: Property name (must match Motive display name exactly)
    - name: Value
      type: string
      description: Desired property value
- id: get_take_property
  label: GetTakeProperty
  kind: query
  command: "GetTakeProperty,{TakeName},{PropertyName}"
  params:
    - name: TakeName
      type: string
      description: Take name (empty for currently loaded take)
    - name: PropertyName
      type: string
      description: Property name (see Properties: Take)
- id: current_take_length
  label: CurrentTakeLength
  kind: query
  command: "CurrentTakeLength"
  params: []
- id: recalibrate_asset
  label: RecalibrateAsset
  kind: action
  command: "RecalibrateAsset,{AssetName}"
  params:
    - name: AssetName
      type: string
      description: Asset name
- id: reset_asset_orientation
  label: ResetAssetOrientation
  kind: action
  command: "ResetAssetOrientation,{AssetName}"
  params:
    - name: AssetName
      type: string
      description: Asset name
- id: subscribe_to_data
  label: SubscribeToData (Unicast subscription)
  kind: action
  command: "SubscribeToData,{DataType},{All|Asset}"
  params:
    - name: DataType
      type: string
      description: Data type to subscribe to
    - name: Asset
      type: string
      description: "All or specific asset name"
- id: subscribe_by_id
  label: SubscribeByID (Unicast subscription)
  kind: action
  command: "SubscribeByID,{DataType},{ID}"
  params:
    - name: DataType
      type: string
      description: Data type to subscribe to
    - name: ID
      type: integer
      description: Asset ID
```

## Feedbacks
```yaml
# UNRESOLVED: source describes response handling as raw byte arrays parsed by caller (BitConverter.ToInt32 / ToSingle).
# No structured response schema is documented.
- id: command_op_result
  label: Command Operation Result
  type: integer
  values: []  # UNRESOLVED: documented only as "0 if successful"; no enum values listed
  notes: Returned via the server response buffer; parsed with BitConverter.ToInt32 in SDK samples.
- id: units_to_millimeters
  label: UnitsToMillimeters
  type: float
  values: []
- id: frame_rate
  label: FrameRate
  type: float
  values: []
- id: current_mode
  label: CurrentMode
  type: enum
  values: [live, edit]
  notes: 0 = Live, 1 = Edit
- id: current_session_path
  label: CurrentSessionPath
  type: string
  values: []
```

## Variables
```yaml
- id: playback_take_name
  label: Playback Take Name
  type: string
- id: record_take_name
  label: Record Take Name
  type: string
- id: current_session
  label: Current Session
  type: string
- id: playback_start_frame
  label: Playback Start Frame
  type: integer
- id: playback_stop_frame
  label: Playback Stop Frame
  type: integer
- id: playback_current_frame
  label: Playback Current Frame
  type: integer
- id: playback_looping
  label: Playback Looping
  type: boolean
  values: [true, false]
- id: playback_take_length
  label: Current Take Length
  type: integer
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source describes `SendMessageAndWait(command, tries=10, timeout=20)` defaults and `SendMessageAndWait(command, 3, 100)` sample usage.
- Source notes subscription commands work with Unicast streaming protocol only (Motive 3.0+).
- Source notes that beginning with Motive 3.1, eSync 2 access no longer requires the device serial number in the Node name.

<!-- UNRESOLVED: no firmware version compatibility ranges stated; only "Motive 3.0 or above" for subscription commands. -->

## Provenance

```yaml
source_domains:
  - docs.optitrack.com
source_urls:
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-remote-requests-commands
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-4.5
  - https://docs.optitrack.com/developer-tools/natnet-sdk/natnet-class-function-reference
  - https://docs.optitrack.com/motive/data-streaming
  - https://docs.optitrack.com/developer-tools
retrieved_at: 2026-06-29T19:09:57.013Z
last_checked_at: 2026-06-30T07:12:10.143Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:12:10.143Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions verified against source; transport parameters confirmed; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "discovery/multicast/local-clock parameters not covered; only remote-request commands documented."
- "source describes response handling as raw byte arrays parsed by caller (BitConverter.ToInt32 / ToSingle)."
- "documented only as \"0 if successful\"; no enum values listed"
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "no firmware version compatibility ranges stated; only \"Motive 3.0 or above\" for subscription commands."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
