---
spec_id: admin/avstumpfl-pixera
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVStumpfl Pixera Control Spec"
manufacturer: "AV Stumpfl"
model_family: Pixera
aliases: []
compatible_with:
  manufacturers:
    - "AV Stumpfl"
    - AVStumpfl
  models:
    - Pixera
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - help.pixera.one
source_urls:
  - https://help.pixera.one/api/pixera-api-documentation-5
  - https://help.pixera.one/api-commands
retrieved_at: 2026-08-30T08:07:58.053Z
last_checked_at: 2026-08-31T11:13:06.125Z
generated_at: 2026-08-31T11:13:06.125Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response framing/serialization on the wire not stated in source"
  - "no separate variable model documented in source"
  - "subscription payload and event message encoding not stated in source"
  - "no multi-step sequences documented explicitly in source"
  - "source contains no safety warnings or interlock procedures."
  - "TCP/UDP port numbers, OSC address space, message delimiter/serialization, and protocol version negotiation are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-31T11:13:06.125Z
  matched_actions: 721
  action_count: 721
  confidence: medium
  summary: "All 721 distinct function signatures in the spec appear verbatim in the source; transport params (0xPX delimiter, configurable port, JSON-RPC 2.0) are stated in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# AVStumpfl Pixera Control Spec

## Summary
AVStumpfl Pixera is a media-server and show-control software platform for projection/multi-display installations. This spec covers the combined API command set documented for PIXERA version 26.1 R 1, exposed over Control, TCP/UDP, and OSC interfaces. The API is function-call based: every command is a named function with typed parameters (handles reference objects obtained via `getInst`/`getHandleFromInstancePath`).

PIXERA acts as the TCP server. The API port is selected by the operator in
PIXERA's API settings rather than fixed by the vendor; the quick-start guide
uses 4023 only as an example. JSON/TCP(dl) messages end with `0xPX`. UDP and
OSC do not support responses.

## Transport
```yaml
protocols:
  - tcp  # stated: "This combines Control, TCP/UDP, OSC"
  - udp  # stated: "This combines Control, TCP/UDP, OSC"
  - osc  # stated: "This combines Control, TCP/UDP, OSC"
addressing:
  port: configurable  # selected in PIXERA API settings; vendor example: 4023
framing:
  tcp_delimiter: "0xPX"
  serialization: jsonrpc-2.0
auth:
  type: none  # inferred: no auth procedure in source (lockUi password is a UI lock, not transport auth)
```

## Traits
```yaml
traits:
  - powerable  # inferred: shutdownSystem/shutDown/wakeUp/startLiveSystem/stopLiveSystem commands present
  - queryable  # inferred: 355 get*/query functions returning values
  - routable  # inferred: assignResourceToLayer, setVideoStreamActiveState, activateScreenMapping commands present
  - levelable  # inferred: setAudioMasterVolume, setVolume, setOpacity, setBrightness commands present
```

## Actions
```yaml
# 721 actions: every distinct function signature in the source, deduplicated across
# repeated per-object rows (e.g. getName/getInstancePath repeated per object type).
# kind: query = function has a declared return type; kind: action = void function.
# command: holds the function signature verbatim from the source (the wire payload).
- id: get_api_revision
  label: "get Api Revision"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getApiRevision()"  # verbatim function signature from source
  params: []
- id: get_has_function
  label: "get Has Function"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getHasFunction(string functionName)"  # verbatim function signature from source
  params:
    - name: functionName
      type: string
      description: "function name"
- id: output_debug
  label: "output Debug"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "outputDebug(string message)"  # verbatim function signature from source
  params:
    - name: message
      type: string
      description: "message"
- id: get_license_json
  label: "get License Json"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLicenseJson()"  # verbatim function signature from source
  params: []
- id: get_current_time
  label: "get Current Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getCurrentTime()"  # verbatim function signature from source
  params: []
- id: get_current_time_as_string
  label: "get Current Time As String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentTimeAsString()"  # verbatim function signature from source
  params: []
- id: noop
  label: "noop"
  kind: action
  command: "noop()"  # verbatim function signature from source
  params: []
- id: request_callback
  label: "request Callback"
  kind: action
  command: "requestCallback(string functionName)"  # verbatim function signature from source
  params:
    - name: functionName
      type: string
      description: "function name"
- id: read_file_string
  label: "read File String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "readFileString(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: write_file_string
  label: "write File String"
  kind: action
  command: "writeFileString(string path, string fileStr)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: fileStr
      type: string
      description: "file str"
- id: get_access_recipe
  label: "get Access Recipe"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getAccessRecipe(string hdlPath)"  # verbatim function signature from source
  params:
    - name: hdlPath
      type: string
      description: "hdl path"
- id: poll_monitoring
  label: "poll Monitoring"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "pollMonitoring()"  # verbatim function signature from source
  params: []
- id: unsubscribe_monitoring_subject
  label: "unsubscribe Monitoring Subject"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "unsubscribeMonitoringSubject(string subject)"  # verbatim function signature from source
  params:
    - name: subject
      type: string
      description: "subject"
- id: subscribe_monitoring_subject
  label: "subscribe Monitoring Subject"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "subscribeMonitoringSubject(string subject)"  # verbatim function signature from source
  params:
    - name: subject
      type: string
      description: "subject"
- id: set_monitoring_event_mode
  label: "set Monitoring Event Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setMonitoringEventMode(string mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: string
      description: "mode"
- id: monitoring_event
  label: "monitoring Event"
  kind: action
  command: "monitoringEvent(string eventDescription)"  # verbatim function signature from source
  params:
    - name: eventDescription
      type: string
      description: "event description"
- id: set_show_context_in_replies
  label: "set Show Context In Replies"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setShowContextInReplies(boolean doShow)"  # verbatim function signature from source
  params:
    - name: doShow
      type: boolean
      description: "do show"
- id: set_monitoring_has_delimiter
  label: "set Monitoring Has Delimiter"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setMonitoringHasDelimiter(boolean hasDelimiter)"  # verbatim function signature from source
  params:
    - name: hasDelimiter
      type: boolean
      description: "has delimiter"
- id: run_js_script
  label: "run Js Script"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "runJsScript(string jsFunction, string jsCode)"  # verbatim function signature from source
  params:
    - name: jsFunction
      type: string
      description: "js function"
    - name: jsCode
      type: string
      description: "js code"
- id: dynamic_rebuild_from_json_description
  label: "dynamic Rebuild From Json Description"
  kind: action
  command: "dynamicRebuildFromJsonDescription(string deviceName, string jsonDescription, string folder)"  # verbatim function signature from source
  params:
    - name: deviceName
      type: string
      description: "device name"
    - name: jsonDescription
      type: string
      description: "json description"
    - name: folder
      type: string
      description: "folder"
- id: reset_selective_rendering_frame_counters
  label: "reset Selective Rendering Frame Counters"
  kind: action
  command: "resetSelectiveRenderingFrameCounters()"  # verbatim function signature from source
  params: []
- id: get_conveyor
  label: "get Conveyor"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getConveyor(string conveyorName)"  # verbatim function signature from source
  params:
    - name: conveyorName
      type: string
      description: "conveyor name"
- id: send_string
  label: "send String"
  kind: action
  command: "sendString(string str)"  # verbatim function signature from source
  params:
    - name: str
      type: string
      description: "str"
- id: set_transport_mode_on_timeline_at_index
  label: "set Transport Mode On Timeline At Index"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTransportModeOnTimelineAtIndex(int index, int mode)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
    - name: mode
      type: integer
      description: "mode"
- id: set_transport_mode_on_timeline
  label: "set Transport Mode On Timeline"
  kind: action
  command: "setTransportModeOnTimeline(string timelineName, int mode)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
    - name: mode
      type: integer
      description: "mode"
- id: toggle_transport
  label: "toggle Transport"
  kind: action
  command: "toggleTransport(string timelineName)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
- id: get_transport_mode_on_timeline
  label: "get Transport Mode On Timeline"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getTransportModeOnTimeline(string timelineName)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
- id: start_first_timeline
  label: "start First Timeline"
  kind: action
  command: "startFirstTimeline()"  # verbatim function signature from source
  params: []
- id: pause_first_timeline
  label: "pause First Timeline"
  kind: action
  command: "pauseFirstTimeline()"  # verbatim function signature from source
  params: []
- id: stop_first_timeline
  label: "stop First Timeline"
  kind: action
  command: "stopFirstTimeline()"  # verbatim function signature from source
  params: []
- id: set_opacity_on_timeline
  label: "set Opacity On Timeline"
  kind: action
  command: "setOpacityOnTimeline(string timelineName, double opacity)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
    - name: opacity
      type: number
      description: "opacity"
- id: get_opacity_on_timeline
  label: "get Opacity On Timeline"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getOpacityOnTimeline(string timelineName)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
- id: set_pos_value
  label: "set Pos Value"
  kind: action
  command: "setPosValue(double val)"  # verbatim function signature from source
  params:
    - name: val
      type: number
      description: "val"
- id: set_pos_value_xy
  label: "set Pos Value XY"
  kind: action
  command: "setPosValueXY(double valX, double valY)"  # verbatim function signature from source
  params:
    - name: valX
      type: number
      description: "val x"
    - name: valY
      type: number
      description: "val y"
- id: set_param_value
  label: "set Param Value"
  kind: action
  command: "setParamValue(string path, double value)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: value
      type: number
      description: "value"
- id: apply_cue_at_index_on_timeline_at_index
  label: "apply Cue At Index On Timeline At Index"
  kind: action
  command: "applyCueAtIndexOnTimelineAtIndex(int cueIndex, int timelineIndex, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: cueIndex
      type: integer
      description: "cue index"
    - name: timelineIndex
      type: integer
      description: "timeline index"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_number_on_timeline_at_index
  label: "apply Cue Number On Timeline At Index"
  kind: action
  command: "applyCueNumberOnTimelineAtIndex(int cueNumber, int timelineIndex, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: cueNumber
      type: integer
      description: "cue number"
    - name: timelineIndex
      type: integer
      description: "timeline index"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_number_on_timeline
  label: "apply Cue Number On Timeline"
  kind: action
  command: "applyCueNumberOnTimeline(string timelineName, int cueNumber, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
    - name: cueNumber
      type: integer
      description: "cue number"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_on_timeline
  label: "apply Cue On Timeline"
  kind: action
  command: "applyCueOnTimeline(string timelineName, string cueName, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: timelineName
      type: string
      description: "timeline name"
    - name: cueName
      type: string
      description: "cue name"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: add_resource_to_folder
  label: "add Resource To Folder"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "addResourceToFolder(string namePath, string filePath)"  # verbatim function signature from source
  params:
    - name: namePath
      type: string
      description: "name path"
    - name: filePath
      type: string
      description: "file path"
- id: assign_resource_to_layer
  label: "assign Resource To Layer"
  kind: action
  command: "assignResourceToLayer(string resourcePath, string layerPath)"  # verbatim function signature from source
  params:
    - name: resourcePath
      type: string
      description: "resource path"
    - name: layerPath
      type: string
      description: "layer path"
- id: refresh_resource
  label: "refresh Resource"
  kind: action
  command: "refreshResource(string resourcePath)"  # verbatim function signature from source
  params:
    - name: resourcePath
      type: string
      description: "resource path"
- id: set_transport_mode_on_layer
  label: "set Transport Mode On Layer"
  kind: action
  command: "setTransportModeOnLayer(string layerPath, int mode, boolean loop)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: mode
      type: integer
      description: "mode"
    - name: loop
      type: boolean
      description: "loop"
- id: get_transport_mode_on_layer
  label: "get Transport Mode On Layer"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getTransportModeOnLayer(string layerPath)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
- id: get_resource_assigned_to_layer
  label: "get Resource Assigned To Layer"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getResourceAssignedToLayer(string layerPath)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
- id: assign_resource_to_clip_at_time_by_dmx_id
  label: "assign Resource To Clip At Time By Dmx Id"
  kind: action
  command: "assignResourceToClipAtTimeByDmxId(string layerPath, int dmxFolderId, int dmxFileId, double time)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: dmxFolderId
      type: integer
      description: "dmx folder id"
    - name: dmxFileId
      type: integer
      description: "dmx file id"
    - name: time
      type: number
      description: "time"
- id: assign_resource_to_clip_at_hmsf_string_by_dmx_id
  label: "assign Resource To Clip At HMSF String By Dmx Id"
  kind: action
  command: "assignResourceToClipAtHMSFStringByDmxId(string layerPath, int dmxFolderId, int dmxFileId, string hmsf)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: dmxFolderId
      type: integer
      description: "dmx folder id"
    - name: dmxFileId
      type: integer
      description: "dmx file id"
    - name: hmsf
      type: string
      description: "hmsf"
- id: assign_resource_to_clip_at_hmsf_by_dmx_id
  label: "assign Resource To Clip At HMSF By Dmx Id"
  kind: action
  command: "assignResourceToClipAtHMSFByDmxId(string layerPath, int dmxFolderId, int dmxFileId, int h, int m, int s, int f)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: dmxFolderId
      type: integer
      description: "dmx folder id"
    - name: dmxFileId
      type: integer
      description: "dmx file id"
    - name: h
      type: integer
      description: "h"
    - name: m
      type: integer
      description: "m"
    - name: s
      type: integer
      description: "s"
    - name: f
      type: integer
      description: "f"
- id: set_current_time_of_timeline
  label: "set Current Time Of Timeline"
  kind: action
  command: "setCurrentTimeOfTimeline(string name, int time)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: time
      type: integer
      description: "time"
- id: set_current_time_of_timeline_in_seconds
  label: "set Current Time Of Timeline In Seconds"
  kind: action
  command: "setCurrentTimeOfTimelineInSeconds(string name, double time)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: time
      type: number
      description: "time"
- id: set_current_time_and_transport_mode_of_timeline_in_seconds
  label: "set Current Time And Transport Mode Of Timeline In Seconds"
  kind: action
  command: "setCurrentTimeAndTransportModeOfTimelineInSeconds(string name, double time, int mode)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: time
      type: number
      description: "time"
    - name: mode
      type: integer
      description: "mode"
- id: get_fps_of_timeline
  label: "get Fps Of Timeline"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getFpsOfTimeline(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_current_time_of_timeline
  label: "get Current Time Of Timeline"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getCurrentTimeOfTimeline(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_current_time_of_timeline_in_seconds
  label: "get Current Time Of Timeline In Seconds"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getCurrentTimeOfTimelineInSeconds(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_current_hmsf_of_timeline
  label: "get Current HMSF Of Timeline"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentHMSFOfTimeline(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_current_countdown_of_timeline
  label: "get Current Countdown Of Timeline"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getCurrentCountdownOfTimeline(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_current_countdown_hmsf_of_timeline
  label: "get Current Countdown HMSF Of Timeline"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentCountdownHMSFOfTimeline(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: block_ui_timeline_updates
  label: "block Ui Timeline Updates"
  kind: action
  command: "blockUiTimelineUpdates(boolean doBlock, optional terminationDurationInMs)"  # verbatim function signature from source
  params:
    - name: doBlock
      type: boolean
      description: "do block"
    - name: terminationDurationInMs
      type: string
      description: "termination duration in ms (optional)"
- id: start_opacity_animation_of_timeline
  label: "start Opacity Animation Of Timeline"
  kind: action
  command: "startOpacityAnimationOfTimeline(string name, boolean fadeIn, double fullFadeDuration)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: fadeIn
      type: boolean
      description: "fade in"
    - name: fullFadeDuration
      type: number
      description: "full fade duration"
- id: create_clip_on_layer_at_time_with_resource
  label: "create Clip On Layer At Time With Resource"
  kind: action
  command: "createClipOnLayerAtTimeWithResource(string layerPath, double time, string resourcePath)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: time
      type: number
      description: "time"
    - name: resourcePath
      type: string
      description: "resource path"
- id: remove_clip_on_layer_with_index
  label: "remove Clip On Layer With Index"
  kind: action
  command: "removeClipOnLayerWithIndex(string layerPath, int clipIndex)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: clipIndex
      type: integer
      description: "clip index"
- id: remove_all_clips_on_layer
  label: "remove All Clips On Layer"
  kind: action
  command: "removeAllClipsOnLayer(string layerPath)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
- id: get_clip_duration_in_seconds_with_index
  label: "get Clip Duration In Seconds With Index"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getClipDurationInSecondsWithIndex(string layerPath, int clipIndex)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: clipIndex
      type: integer
      description: "clip index"
- id: get_clip_duration_in_frames_with_index
  label: "get Clip Duration In Frames With Index"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getClipDurationInFramesWithIndex(string layerPath, int clipIndex)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: clipIndex
      type: integer
      description: "clip index"
- id: get_clip_time_in_seconds_with_index
  label: "get Clip Time In Seconds With Index"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getClipTimeInSecondsWithIndex(string layerPath, int clipIndex)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: clipIndex
      type: integer
      description: "clip index"
- id: get_clip_end_time_in_seconds_with_index
  label: "get Clip End Time In Seconds With Index"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getClipEndTimeInSecondsWithIndex(string layerPath, int clipIndex)"  # verbatim function signature from source
  params:
    - name: layerPath
      type: string
      description: "layer path"
    - name: clipIndex
      type: integer
      description: "clip index"
- id: get_resource_duration_in_seconds
  label: "get Resource Duration In Seconds"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getResourceDurationInSeconds(string resourcePath)"  # verbatim function signature from source
  params:
    - name: resourcePath
      type: string
      description: "resource path"
- id: get_param_value
  label: "get Param Value"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getParamValue(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: set_timecode_input
  label: "set Timecode Input"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "setTimecodeInput(int hour, int minute, int second, int frame, double elapsedTime, boolean running, int freshMode, int stateToken, int format)"  # verbatim function signature from source
  params:
    - name: hour
      type: integer
      description: "hour"
    - name: minute
      type: integer
      description: "minute"
    - name: second
      type: integer
      description: "second"
    - name: frame
      type: integer
      description: "frame"
    - name: elapsedTime
      type: number
      description: "elapsed time"
    - name: running
      type: boolean
      description: "running"
    - name: freshMode
      type: integer
      description: "fresh mode"
    - name: stateToken
      type: integer
      description: "state token"
    - name: format
      type: integer
      description: "format"
- id: take_over_all_clients
  label: "take Over All Clients"
  kind: action
  command: "takeOverAllClients()"  # verbatim function signature from source
  params: []
- id: set_pause_smpte_input
  label: "set Pause Smpte Input"
  kind: action
  command: "setPauseSmpteInput(boolean doPause)"  # verbatim function signature from source
  params:
    - name: doPause
      type: boolean
      description: "do pause"
- id: set_allow_control_protocol_outputs
  label: "set Allow Control Protocol Outputs"
  kind: action
  command: "setAllowControlProtocolOutputs(boolean allow)"  # verbatim function signature from source
  params:
    - name: allow
      type: boolean
      description: "allow"
- id: close_app
  label: "close App"
  kind: action
  command: "closeApp(boolean saveProject)"  # verbatim function signature from source
  params:
    - name: saveProject
      type: boolean
      description: "save project"
- id: load_project
  label: "load Project"
  kind: action
  command: "loadProject(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: save_project
  label: "save Project"
  kind: action
  command: "saveProject()"  # verbatim function signature from source
  params: []
- id: save_project_as
  label: "save Project As"
  kind: action
  command: "saveProjectAs(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: get_project_name
  label: "get Project Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getProjectName()"  # verbatim function signature from source
  params: []
- id: set_project_name
  label: "set Project Name"
  kind: action
  command: "setProjectName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_project_directory
  label: "get Project Directory"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getProjectDirectory()"  # verbatim function signature from source
  params: []
- id: get_control_multi_user_session_name
  label: "get Control Multi User Session Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getControlMultiUserSessionName()"  # verbatim function signature from source
  params: []
- id: shutdown_system
  label: "shutdown System"
  kind: action
  command: "shutdownSystem(optional mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: string
      description: "mode (optional)"
- id: get_live_system_ips
  label: "get Live System Ips"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getLiveSystemIps()"  # verbatim function signature from source
  params: []
- id: get_live_system_state
  label: "get Live System State"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLiveSystemState(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: live_system_state_change
  label: "live System State Change"
  kind: action
  command: "liveSystemStateChange(string ip, string state)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
    - name: state
      type: string
      description: "state"
- id: shutdown_live_system
  label: "shutdown Live System"
  kind: action
  command: "shutdownLiveSystem(string ip, optional mode)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
    - name: mode
      type: string
      description: "mode (optional)"
- id: wake_live_system
  label: "wake Live System"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "wakeLiveSystem(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: get_live_system_mac_address
  label: "get Live System Mac Address"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLiveSystemMacAddress(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: start_live_system
  label: "start Live System"
  kind: action
  command: "startLiveSystem(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: start_live_systems
  label: "start Live Systems"
  kind: action
  command: "startLiveSystems()"  # verbatim function signature from source
  params: []
- id: stop_live_system
  label: "stop Live System"
  kind: action
  command: "stopLiveSystem(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: stop_live_systems
  label: "stop Live Systems"
  kind: action
  command: "stopLiveSystems()"  # verbatim function signature from source
  params: []
- id: restart_live_system
  label: "restart Live System"
  kind: action
  command: "restartLiveSystem(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: restart_live_systems
  label: "restart Live Systems"
  kind: action
  command: "restartLiveSystems()"  # verbatim function signature from source
  params: []
- id: remote_system_state_change
  label: "remote System State Change"
  kind: action
  command: "remoteSystemStateChange(string ip, string state)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
    - name: state
      type: string
      description: "state"
- id: get_remote_system_ips
  label: "get Remote System Ips"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getRemoteSystemIps()"  # verbatim function signature from source
  params: []
- id: get_remote_system_state
  label: "get Remote System State"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getRemoteSystemState(string ip)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
- id: set_video_stream_active_state
  label: "set Video Stream Active State"
  kind: action
  command: "setVideoStreamActiveState(string ip, string device, boolean isActive)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
    - name: device
      type: string
      description: "device"
    - name: isActive
      type: boolean
      description: "is active"
- id: get_video_stream_active_state
  label: "get Video Stream Active State"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getVideoStreamActiveState(string ip, string device)"  # verbatim function signature from source
  params:
    - name: ip
      type: string
      description: "ip"
    - name: device
      type: string
      description: "device"
- id: get_default_clip_durations_as_json_string
  label: "get Default Clip Durations As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getDefaultClipDurationsAsJsonString()"  # verbatim function signature from source
  params: []
- id: toggle_output_identification
  label: "toggle Output Identification"
  kind: action
  command: "toggleOutputIdentification()"  # verbatim function signature from source
  params: []
- id: toggle_on_screen_stats
  label: "toggle On Screen Stats"
  kind: action
  command: "toggleOnScreenStats()"  # verbatim function signature from source
  params: []
- id: set_all_assigned_outputs
  label: "set All Assigned Outputs"
  kind: action
  command: "setAllAssignedOutputs(boolean active)"  # verbatim function signature from source
  params:
    - name: active
      type: boolean
      description: "active"
- id: get_live_systems
  label: "get Live Systems"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getLiveSystems()"  # verbatim function signature from source
  params: []
- id: live_system_not_available
  label: "live System Not Available"
  kind: action
  command: "liveSystemNotAvailable(int reason, handle system)"  # verbatim function signature from source
  params:
    - name: reason
      type: integer
      description: "reason"
    - name: system
      type: string
      description: "system"
- id: get_multi_user_members
  label: "get Multi User Members"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getMultiUserMembers()"  # verbatim function signature from source
  params: []
- id: get_usage_presets
  label: "get Usage Presets"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getUsagePresets()"  # verbatim function signature from source
  params: []
- id: get_name
  label: "get Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getName()"  # verbatim function signature from source
  params: []
- id: get_ip
  label: "get Ip"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getIp()"  # verbatim function signature from source
  params: []
- id: get_state
  label: "get State"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getState()"  # verbatim function signature from source
  params: []
- id: get_performance_monitoring_values_json
  label: "get Performance Monitoring Values Json"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getPerformanceMonitoringValuesJson()"  # verbatim function signature from source
  params: []
- id: get_performance_monitoring_values_json_ex
  label: "get Performance Monitoring Values Json Ex"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getPerformanceMonitoringValuesJsonEx(string filter)"  # verbatim function signature from source
  params:
    - name: filter
      type: string
      description: "filter"
- id: reset_cumulative_performance_monitoring_values
  label: "reset Cumulative Performance Monitoring Values"
  kind: action
  command: "resetCumulativePerformanceMonitoringValues()"  # verbatim function signature from source
  params: []
- id: ensure_file_distribution
  label: "ensure File Distribution"
  kind: action
  command: "ensureFileDistribution(boolean includeNotUsedYet)"  # verbatim function signature from source
  params:
    - name: includeNotUsedYet
      type: boolean
      description: "include not used yet"
- id: shut_down
  label: "shut Down"
  kind: action
  command: "shutDown(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: wake_up
  label: "wake Up"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "wakeUp()"  # verbatim function signature from source
  params: []
- id: get_mac_address
  label: "get Mac Address"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getMacAddress()"  # verbatim function signature from source
  params: []
- id: reset_engine
  label: "reset Engine"
  kind: action
  command: "resetEngine()"  # verbatim function signature from source
  params: []
- id: restart_engine
  label: "restart Engine"
  kind: action
  command: "restartEngine()"  # verbatim function signature from source
  params: []
- id: start_engine
  label: "start Engine"
  kind: action
  command: "startEngine()"  # verbatim function signature from source
  params: []
- id: close_engine
  label: "close Engine"
  kind: action
  command: "closeEngine()"  # verbatim function signature from source
  params: []
- id: trigger_backup
  label: "trigger Backup"
  kind: action
  command: "triggerBackup(optional applyControlCommand)"  # verbatim function signature from source
  params:
    - name: applyControlCommand
      type: string
      description: "apply control command (optional)"
- id: get_structure_json
  label: "get Structure Json"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getStructureJson()"  # verbatim function signature from source
  params: []
- id: get_inst
  label: "get Inst"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getInst(string instancePath)"  # verbatim function signature from source
  params:
    - name: instancePath
      type: string
      description: "instance path"
- id: ref
  label: "ref"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "ref()"  # verbatim function signature from source
  params: []
- id: set_backup_role
  label: "set Backup Role"
  kind: action
  command: "setBackupRole(int role)"  # verbatim function signature from source
  params:
    - name: role
      type: integer
      description: "role"
- id: get_backup_role
  label: "get Backup Role"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getBackupRole()"  # verbatim function signature from source
  params: []
- id: move_mappings_to_outputs
  label: "move Mappings To Outputs"
  kind: action
  command: "moveMappingsToOutputs(handle hdlSrc, string outputIdPathMapStr)"  # verbatim function signature from source
  params:
    - name: hdlSrc
      type: string
      description: "hdl src"
    - name: outputIdPathMapStr
      type: string
      description: "output id path map str"
- id: set_usage_preset_name
  label: "set Usage Preset Name"
  kind: action
  command: "setUsagePresetName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_usage_preset_name
  label: "get Usage Preset Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getUsagePresetName()"  # verbatim function signature from source
  params: []
- id: update_usage_preset
  label: "update Usage Preset"
  kind: action
  command: "updateUsagePreset()"  # verbatim function signature from source
  params: []
- id: save_usage_preset_as
  label: "save Usage Preset As"
  kind: action
  command: "saveUsagePresetAs(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: apply_usage_preset
  label: "apply Usage Preset"
  kind: action
  command: "applyUsagePreset()"  # verbatim function signature from source
  params: []
- id: apply_usage_preset_with_name
  label: "apply Usage Preset With Name"
  kind: action
  command: "applyUsagePresetWithName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: export_usage_preset
  label: "export Usage Preset"
  kind: action
  command: "exportUsagePreset(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: import_usage_preset
  label: "import Usage Preset"
  kind: action
  command: "importUsagePreset(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: clear_exported_mappings
  label: "clear Exported Mappings"
  kind: action
  command: "clearExportedMappings(string path, boolean onlyServicePath)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: onlyServicePath
      type: boolean
      description: "only service path"
- id: export_mappings
  label: "export Mappings"
  kind: action
  command: "exportMappings(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: import_mappings
  label: "import Mappings"
  kind: action
  command: "importMappings(string path, string outputIdPathMapStr)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: outputIdPathMapStr
      type: string
      description: "output id path map str"
- id: export_mappings_directly
  label: "export Mappings Directly"
  kind: action
  command: "exportMappingsDirectly(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: import_mappings_directly
  label: "import Mappings Directly"
  kind: action
  command: "importMappingsDirectly(string path, string outputIdPathMapStr)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: outputIdPathMapStr
      type: string
      description: "output id path map str"
- id: export_mappings_to_live_system_path
  label: "export Mappings To Live System Path"
  kind: action
  command: "exportMappingsToLiveSystemPath(string parentPath)"  # verbatim function signature from source
  params:
    - name: parentPath
      type: string
      description: "parent path"
- id: import_mappings_from_live_system_path
  label: "import Mappings From Live System Path"
  kind: action
  command: "importMappingsFromLiveSystemPath(string parentPath)"  # verbatim function signature from source
  params:
    - name: parentPath
      type: string
      description: "parent path"
- id: clear_exported_mappings_at_live_system_path
  label: "clear Exported Mappings At Live System Path"
  kind: action
  command: "clearExportedMappingsAtLiveSystemPath(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: get_graphics_devices
  label: "get Graphics Devices"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getGraphicsDevices()"  # verbatim function signature from source
  params: []
- id: get_enabled_outputs
  label: "get Enabled Outputs"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getEnabledOutputs()"  # verbatim function signature from source
  params: []
- id: get_all_outputs
  label: "get All Outputs"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getAllOutputs()"  # verbatim function signature from source
  params: []
- id: get_video_stream_outputs
  label: "get Video Stream Outputs"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getVideoStreamOutputs()"  # verbatim function signature from source
  params: []
- id: get_video_stream_inputs
  label: "get Video Stream Inputs"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getVideoStreamInputs()"  # verbatim function signature from source
  params: []
- id: set_audio_master_volume
  label: "set Audio Master Volume"
  kind: action
  command: "setAudioMasterVolume(int channel, double volume)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
    - name: volume
      type: number
      description: "volume"
- id: get_audio_master_volume
  label: "get Audio Master Volume"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getAudioMasterVolume(int channel)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
- id: set_audio_master_mute
  label: "set Audio Master Mute"
  kind: action
  command: "setAudioMasterMute(int channel, boolean state)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
    - name: state
      type: boolean
      description: "state"
- id: get_audio_master_mute
  label: "get Audio Master Mute"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getAudioMasterMute(int channel)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
- id: toggle_audio_master_mute
  label: "toggle Audio Master Mute"
  kind: action
  command: "toggleAudioMasterMute(int channel)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
- id: set_audio_timecode_input
  label: "set Audio Timecode Input"
  kind: action
  command: "setAudioTimecodeInput(int channel, boolean state)"  # verbatim function signature from source
  params:
    - name: channel
      type: integer
      description: "channel"
    - name: state
      type: boolean
      description: "state"
- id: delete_unused_files_from_cache
  label: "delete Unused Files From Cache"
  kind: action
  command: "deleteUnusedFilesFromCache()"  # verbatim function signature from source
  params: []
- id: get_instance_path
  label: "get Instance Path"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getInstancePath()"  # verbatim function signature from source
  params: []
- id: update
  label: "update"
  kind: action
  command: "update()"  # verbatim function signature from source
  params: []
- id: apply
  label: "apply"
  kind: action
  command: "apply(string destinationIp)"  # verbatim function signature from source
  params:
    - name: destinationIp
      type: string
      description: "destination ip"
- id: import_from_file
  label: "import From File"
  kind: action
  command: "importFromFile(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: export_to_file
  label: "export To File"
  kind: action
  command: "exportToFile(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: set_active
  label: "set Active"
  kind: action
  command: "setActive(boolean active)"  # verbatim function signature from source
  params:
    - name: active
      type: boolean
      description: "active"
- id: get_active
  label: "get Active"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getActive()"  # verbatim function signature from source
  params: []
- id: set_identify
  label: "set Identify"
  kind: action
  command: "setIdentify(boolean state)"  # verbatim function signature from source
  params:
    - name: state
      type: boolean
      description: "state"
- id: get_identify
  label: "get Identify"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIdentify()"  # verbatim function signature from source
  params: []
- id: get_assigned_screens
  label: "get Assigned Screens"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getAssignedScreens()"  # verbatim function signature from source
  params: []
- id: get_assigned_projectors
  label: "get Assigned Projectors"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getAssignedProjectors()"  # verbatim function signature from source
  params: []
- id: get_enabled
  label: "get Enabled"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getEnabled()"  # verbatim function signature from source
  params: []
- id: get_for_preview
  label: "get For Preview"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getForPreview()"  # verbatim function signature from source
  params: []
- id: set_is_output_aggregate
  label: "set Is Output Aggregate"
  kind: action
  command: "setIsOutputAggregate(boolean state)"  # verbatim function signature from source
  params:
    - name: state
      type: boolean
      description: "state"
- id: get_is_output_aggregate
  label: "get Is Output Aggregate"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsOutputAggregate()"  # verbatim function signature from source
  params: []
- id: set_aggregate_dims
  label: "set Aggregate Dims"
  kind: action
  command: "setAggregateDims(int horizontalCount, int verticalCount)"  # verbatim function signature from source
  params:
    - name: horizontalCount
      type: integer
      description: "horizontal count"
    - name: verticalCount
      type: integer
      description: "vertical count"
- id: get_aggregate_dims
  label: "get Aggregate Dims"
  returns: "int[]"  # verbatim return type from source
  kind: query
  command: "getAggregateDims()"  # verbatim function signature from source
  params: []
- id: get_available
  label: "get Available"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getAvailable()"  # verbatim function signature from source
  params: []
- id: get_ip_address
  label: "get Ip Address"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getIpAddress()"  # verbatim function signature from source
  params: []
- id: set_ip_address
  label: "set Ip Address"
  kind: action
  command: "setIpAddress(string ipAddress)"  # verbatim function signature from source
  params:
    - name: ipAddress
      type: string
      description: "ip address"
- id: get_device_type
  label: "get Device Type"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getDeviceType()"  # verbatim function signature from source
  params: []
- id: get_show_dims_in_pixels
  label: "get Show Dims In Pixels"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getShowDimsInPixels()"  # verbatim function signature from source
  params: []
- id: get_show_scale_as_size
  label: "get Show Scale As Size"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getShowScaleAsSize()"  # verbatim function signature from source
  params: []
- id: set_fade_to_time_duration
  label: "set Fade To Time Duration"
  kind: action
  command: "setFadeToTimeDuration(int timeInMilliseconds)"  # verbatim function signature from source
  params:
    - name: timeInMilliseconds
      type: integer
      description: "time in milliseconds"
- id: get_fade_to_time_duration
  label: "get Fade To Time Duration"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getFadeToTimeDuration()"  # verbatim function signature from source
  params: []
- id: set_fade_to_time_delay
  label: "set Fade To Time Delay"
  kind: action
  command: "setFadeToTimeDelay(int timeInMilliseconds)"  # verbatim function signature from source
  params:
    - name: timeInMilliseconds
      type: integer
      description: "time in milliseconds"
- id: get_fade_to_time_delay
  label: "get Fade To Time Delay"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getFadeToTimeDelay()"  # verbatim function signature from source
  params: []
- id: get_transcoding_presets
  label: "get Transcoding Presets"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getTranscodingPresets()"  # verbatim function signature from source
  params: []
- id: add_or_change_transcoding_preset
  label: "add Or Change Transcoding Preset"
  kind: action
  command: "addOrChangeTranscodingPreset(string preset)"  # verbatim function signature from source
  params:
    - name: preset
      type: string
      description: "preset"
- id: set_auto_distribution_rule
  label: "set Auto Distribution Rule"
  kind: action
  command: "setAutoDistributionRule(int rule)"  # verbatim function signature from source
  params:
    - name: rule
      type: integer
      description: "rule"
- id: get_auto_distribution_rule
  label: "get Auto Distribution Rule"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getAutoDistributionRule()"  # verbatim function signature from source
  params: []
- id: get_screen_with_name
  label: "get Screen With Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getScreenWithName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: set_named_screen_position
  label: "set Named Screen Position"
  kind: action
  command: "setNamedScreenPosition(string name, optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_screens
  label: "get Screens"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getScreens()"  # verbatim function signature from source
  params: []
- id: get_screen_names
  label: "get Screen Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getScreenNames()"  # verbatim function signature from source
  params: []
- id: get_first_timeline_with_home_screen
  label: "get First Timeline With Home Screen"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getFirstTimelineWithHomeScreen(string screenName)"  # verbatim function signature from source
  params:
    - name: screenName
      type: string
      description: "screen name"
- id: get_studio_cameras
  label: "get Studio Cameras"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getStudioCameras()"  # verbatim function signature from source
  params: []
- id: get_screen_groups
  label: "get Screen Groups"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getScreenGroups()"  # verbatim function signature from source
  params: []
- id: get_screen_group_names
  label: "get Screen Group Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getScreenGroupNames()"  # verbatim function signature from source
  params: []
- id: get_id
  label: "get Id"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getId()"  # verbatim function signature from source
  params: []
- id: set_position
  label: "set Position"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPosition(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_position
  label: "get Position"
  kind: action
  command: "getPosition()"  # verbatim function signature from source
  params: []
- id: set_rotation
  label: "set Rotation"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setRotation(optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: get_rotation
  label: "get Rotation"
  kind: action
  command: "getRotation()"  # verbatim function signature from source
  params: []
- id: set_scale
  label: "set Scale"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setScale(optional xScale, optional yScale, optional zScale)"  # verbatim function signature from source
  params:
    - name: xScale
      type: string
      description: "x scale (optional)"
    - name: yScale
      type: string
      description: "y scale (optional)"
    - name: zScale
      type: string
      description: "z scale (optional)"
- id: get_scale
  label: "get Scale"
  kind: action
  command: "getScale()"  # verbatim function signature from source
  params: []
- id: set_pos_rot
  label: "set Pos Rot"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPosRot(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: set_pos_rot_and_perspective_pos
  label: "set Pos Rot And Perspective Pos"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPosRotAndPerspectivePos(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional perspXPos, optional perspYPos, optional perspZPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: perspXPos
      type: string
      description: "persp x pos (optional)"
    - name: perspYPos
      type: string
      description: "persp y pos (optional)"
    - name: perspZPos
      type: string
      description: "persp z pos (optional)"
- id: set_pos_rot_scale
  label: "set Pos Rot Scale"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPosRotScale(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional xScale, optional yScale, optional zScale)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: xScale
      type: string
      description: "x scale (optional)"
    - name: yScale
      type: string
      description: "y scale (optional)"
    - name: zScale
      type: string
      description: "z scale (optional)"
- id: set_pos_with_perspective_follow_and_damping
  label: "set Pos With Perspective Follow And Damping"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPosWithPerspectiveFollowAndDamping(optional xPos, optional yPos, optional zPos, optional dApiPerspectiveFollowOverride, optional dApiDampingScreenMs, optional dApiDampingPerspectiveMs)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: dApiPerspectiveFollowOverride
      type: string
      description: "d api perspective follow override (optional)"
    - name: dApiDampingScreenMs
      type: string
      description: "d api damping screen ms (optional)"
    - name: dApiDampingPerspectiveMs
      type: string
      description: "d api damping perspective ms (optional)"
- id: get_perspectives
  label: "get Perspectives"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getPerspectives()"  # verbatim function signature from source
  params: []
- id: get_perspective_for_screen_group
  label: "get Perspective For Screen Group"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getPerspectiveForScreenGroup(string screenGroupName)"  # verbatim function signature from source
  params:
    - name: screenGroupName
      type: string
      description: "screen group name"
- id: get_persepective
  label: "get Persepective"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getPersepective()"  # verbatim function signature from source
  params: []
- id: snap_perspective_corners_to_screen
  label: "snap Perspective Corners To Screen"
  kind: action
  command: "snapPerspectiveCornersToScreen(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: set_perspective_position
  label: "set Perspective Position"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPerspectivePosition(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: set_perspective_position_with_look_at
  label: "set Perspective Position With Look At"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPerspectivePositionWithLookAt(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_perspective_position
  label: "get Perspective Position"
  kind: action
  command: "getPerspectivePosition()"  # verbatim function signature from source
  params: []
- id: set_perspective_rotation
  label: "set Perspective Rotation"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPerspectiveRotation(optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: get_perspective_rotation
  label: "get Perspective Rotation"
  kind: action
  command: "getPerspectiveRotation()"  # verbatim function signature from source
  params: []
- id: set_camera_position
  label: "set Camera Position"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setCameraPosition(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: set_camera_position_with_look_at
  label: "set Camera Position With Look At"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setCameraPositionWithLookAt(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_camera_position
  label: "get Camera Position"
  kind: action
  command: "getCameraPosition()"  # verbatim function signature from source
  params: []
- id: set_camera_rotation
  label: "set Camera Rotation"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setCameraRotation(optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: get_camera_rotation
  label: "get Camera Rotation"
  kind: action
  command: "getCameraRotation()"  # verbatim function signature from source
  params: []
- id: set_content_sampling_frustum_base
  label: "set Content Sampling Frustum Base"
  kind: action
  command: "setContentSamplingFrustumBase(double x, double y, double width, double height, double rotation, double originScreenId)"  # verbatim function signature from source
  params:
    - name: x
      type: number
      description: "x"
    - name: y
      type: number
      description: "y"
    - name: width
      type: number
      description: "width"
    - name: height
      type: number
      description: "height"
    - name: rotation
      type: number
      description: "rotation"
    - name: originScreenId
      type: number
      description: "origin screen id"
- id: run_calibration
  label: "run Calibration"
  kind: action
  command: "runCalibration(string mode, string diff)"  # verbatim function signature from source
  params:
    - name: mode
      type: string
      description: "mode"
    - name: diff
      type: string
      description: "diff"
- id: close_calibration
  label: "close Calibration"
  kind: action
  command: "closeCalibration(string diff)"  # verbatim function signature from source
  params:
    - name: diff
      type: string
      description: "diff"
- id: edit_calibration
  label: "edit Calibration"
  kind: action
  command: "editCalibration(string diff)"  # verbatim function signature from source
  params:
    - name: diff
      type: string
      description: "diff"
- id: finished_calibration
  label: "finished Calibration"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "finishedCalibration(boolean finished)"  # verbatim function signature from source
  params:
    - name: finished
      type: boolean
      description: "finished"
- id: distribute_loaded_calibration_and_reload
  label: "distribute Loaded Calibration And Reload"
  kind: action
  command: "distributeLoadedCalibrationAndReload()"  # verbatim function signature from source
  params: []
- id: reset_warp_file
  label: "reset Warp File"
  kind: action
  command: "resetWarpFile(string diff)"  # verbatim function signature from source
  params:
    - name: diff
      type: string
      description: "diff"
- id: load_warp_file
  label: "load Warp File"
  kind: action
  command: "loadWarpFile(string filePath)"  # verbatim function signature from source
  params:
    - name: filePath
      type: string
      description: "file path"
- id: load_warp_file_with_diff
  label: "load Warp File With Diff"
  kind: action
  command: "loadWarpFileWithDiff(string filePath, string diff)"  # verbatim function signature from source
  params:
    - name: filePath
      type: string
      description: "file path"
    - name: diff
      type: string
      description: "diff"
- id: add_warp_file
  label: "add Warp File"
  kind: action
  command: "addWarpFile(string filePath)"  # verbatim function signature from source
  params:
    - name: filePath
      type: string
      description: "file path"
- id: add_warp_file_with_diff
  label: "add Warp File With Diff"
  kind: action
  command: "addWarpFileWithDiff(string filePath, string diff)"  # verbatim function signature from source
  params:
    - name: filePath
      type: string
      description: "file path"
    - name: diff
      type: string
      description: "diff"
- id: load_color_calibration
  label: "load Color Calibration"
  kind: action
  command: "loadColorCalibration(string calibrationName)"  # verbatim function signature from source
  params:
    - name: calibrationName
      type: string
      description: "calibration name"
- id: run_color_calibration
  label: "run Color Calibration"
  kind: action
  command: "runColorCalibration()"  # verbatim function signature from source
  params: []
- id: set_is_visible
  label: "set Is Visible"
  kind: action
  command: "setIsVisible(boolean isVisible)"  # verbatim function signature from source
  params:
    - name: isVisible
      type: boolean
      description: "is visible"
- id: get_is_visible
  label: "get Is Visible"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsVisible()"  # verbatim function signature from source
  params: []
- id: set_is_projectable
  label: "set Is Projectable"
  kind: action
  command: "setIsProjectable(boolean isProjectable)"  # verbatim function signature from source
  params:
    - name: isProjectable
      type: boolean
      description: "is projectable"
- id: get_is_projectable
  label: "get Is Projectable"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsProjectable()"  # verbatim function signature from source
  params: []
- id: trigger_refresh_mapping
  label: "trigger Refresh Mapping"
  kind: action
  command: "triggerRefreshMapping()"  # verbatim function signature from source
  params: []
- id: reset_all_color_corrections
  label: "reset All Color Corrections"
  kind: action
  command: "resetAllColorCorrections()"  # verbatim function signature from source
  params: []
- id: set_color_correction_with_path
  label: "set Color Correction With Path"
  kind: action
  command: "setColorCorrectionWithPath(string path, float value)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: value
      type: number
      description: "value"
- id: get_color_correction_with_path
  label: "get Color Correction With Path"
  returns: "float"  # verbatim return type from source
  kind: query
  command: "getColorCorrectionWithPath(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: set_color_correction_as_json_string
  label: "set Color Correction As Json String"
  kind: action
  command: "setColorCorrectionAsJsonString(string colorCorrection)"  # verbatim function signature from source
  params:
    - name: colorCorrection
      type: string
      description: "color correction"
- id: get_color_correction_as_json_string
  label: "get Color Correction As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getColorCorrectionAsJsonString()"  # verbatim function signature from source
  params: []
- id: get_output
  label: "get Output"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getOutput()"  # verbatim function signature from source
  params: []
- id: set_blackout
  label: "set Blackout"
  kind: action
  command: "setBlackout(boolean isActive)"  # verbatim function signature from source
  params:
    - name: isActive
      type: boolean
      description: "is active"
- id: get_blackout
  label: "get Blackout"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getBlackout()"  # verbatim function signature from source
  params: []
- id: get_handle_from_instance_path
  label: "get Handle From Instance Path"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getHandleFromInstancePath(string instancePath)"  # verbatim function signature from source
  params:
    - name: instancePath
      type: string
      description: "instance path"
- id: set_position_2
  label: "set Position"
  kind: action
  command: "setPosition(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_position_2
  label: "get Position"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getPosition(double xPos, double yPos, double zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
- id: set_rotation_2
  label: "set Rotation"
  kind: action
  command: "setRotation(optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: set_rotation_quat
  label: "set Rotation Quat"
  kind: action
  command: "setRotationQuat(optional xQuat, optional yQuat, optional zQuat, optional wQuat)"  # verbatim function signature from source
  params:
    - name: xQuat
      type: string
      description: "x quat (optional)"
    - name: yQuat
      type: string
      description: "y quat (optional)"
    - name: zQuat
      type: string
      description: "z quat (optional)"
    - name: wQuat
      type: string
      description: "w quat (optional)"
- id: get_rotation_2
  label: "get Rotation"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getRotation(double xPos, double yPos, double zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
- id: set_transformation
  label: "set Transformation"
  kind: action
  command: "setTransformation(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional fov, optional aspectRatio)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: fov
      type: string
      description: "fov (optional)"
    - name: aspectRatio
      type: string
      description: "aspect ratio (optional)"
- id: set_transformation_quat
  label: "set Transformation Quat"
  kind: action
  command: "setTransformationQuat(optional xPos, optional yPos, optional zPos, optional xQuat, optional yQuat, optional zQuat, optional wQuat, optional fov, optional aspectRatio)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xQuat
      type: string
      description: "x quat (optional)"
    - name: yQuat
      type: string
      description: "y quat (optional)"
    - name: zQuat
      type: string
      description: "z quat (optional)"
    - name: wQuat
      type: string
      description: "w quat (optional)"
    - name: fov
      type: string
      description: "fov (optional)"
    - name: aspectRatio
      type: string
      description: "aspect ratio (optional)"
- id: set_transformation_and_lens_props
  label: "set Transformation And Lens Props"
  kind: action
  command: "setTransformationAndLensProps(double xPos, double yPos, double zPos, double xRot, double yRot, double zRot, double fov, double aspectRatio, double nearClip, double farClip, double aperture, double focus, double iris, double k1, double k2, double centerX, double centerY, double panelWidth)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xRot
      type: number
      description: "x rot"
    - name: yRot
      type: number
      description: "y rot"
    - name: zRot
      type: number
      description: "z rot"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
    - name: nearClip
      type: number
      description: "near clip"
    - name: farClip
      type: number
      description: "far clip"
    - name: aperture
      type: number
      description: "aperture"
    - name: focus
      type: number
      description: "focus"
    - name: iris
      type: number
      description: "iris"
    - name: k1
      type: number
      description: "k1"
    - name: k2
      type: number
      description: "k2"
    - name: centerX
      type: number
      description: "center x"
    - name: centerY
      type: number
      description: "center y"
    - name: panelWidth
      type: number
      description: "panel width"
- id: set_transformation_and_lens_props_quat
  label: "set Transformation And Lens Props Quat"
  kind: action
  command: "setTransformationAndLensPropsQuat(double xPos, double yPos, double zPos, double xQuat, double yQuat, double zQuat, double wQuat, double fov, double aspectRatio, double nearClip, double farClip, double aperture, double focus, double iris, double k1, double k2, double centerX, double centerY, double panelWidth)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xQuat
      type: number
      description: "x quat"
    - name: yQuat
      type: number
      description: "y quat"
    - name: zQuat
      type: number
      description: "z quat"
    - name: wQuat
      type: number
      description: "w quat"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
    - name: nearClip
      type: number
      description: "near clip"
    - name: farClip
      type: number
      description: "far clip"
    - name: aperture
      type: number
      description: "aperture"
    - name: focus
      type: number
      description: "focus"
    - name: iris
      type: number
      description: "iris"
    - name: k1
      type: number
      description: "k1"
    - name: k2
      type: number
      description: "k2"
    - name: centerX
      type: number
      description: "center x"
    - name: centerY
      type: number
      description: "center y"
    - name: panelWidth
      type: number
      description: "panel width"
- id: set_transformation_and_lens_props_ext
  label: "set Transformation And Lens Props Ext"
  kind: action
  command: "setTransformationAndLensPropsExt(double xPos, double yPos, double zPos, double xRot, double yRot, double zRot, double fov, double aspectRatio, double nearClip, double farClip, double aperture, double focus, double focalDistance, double zoom, double iris, double k1, double k2, double k3, double p1, double p2, double centerX, double centerY, double panelWidth, double overscan, optional focalLength, optional focalLengthDistorted)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xRot
      type: number
      description: "x rot"
    - name: yRot
      type: number
      description: "y rot"
    - name: zRot
      type: number
      description: "z rot"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
    - name: nearClip
      type: number
      description: "near clip"
    - name: farClip
      type: number
      description: "far clip"
    - name: aperture
      type: number
      description: "aperture"
    - name: focus
      type: number
      description: "focus"
    - name: focalDistance
      type: number
      description: "focal distance"
    - name: zoom
      type: number
      description: "zoom"
    - name: iris
      type: number
      description: "iris"
    - name: k1
      type: number
      description: "k1"
    - name: k2
      type: number
      description: "k2"
    - name: k3
      type: number
      description: "k3"
    - name: p1
      type: number
      description: "p1"
    - name: p2
      type: number
      description: "p2"
    - name: centerX
      type: number
      description: "center x"
    - name: centerY
      type: number
      description: "center y"
    - name: panelWidth
      type: number
      description: "panel width"
    - name: overscan
      type: number
      description: "overscan"
    - name: focalLength
      type: string
      description: "focal length (optional)"
    - name: focalLengthDistorted
      type: string
      description: "focal length distorted (optional)"
- id: set_transformation_and_lens_props_ext_quat
  label: "set Transformation And Lens Props Ext Quat"
  kind: action
  command: "setTransformationAndLensPropsExtQuat(double xPos, double yPos, double zPos, double xQuat, double yQuat, double zQuat, double wQuat, double fov, double aspectRatio, double nearClip, double farClip, double aperture, double focus, double focalDistance, double zoom, double iris, double k1, double k2, double k3, double p1, double p2, double centerX, double centerY, double panelWidth, double overscan, optional focalLength, optional focalLengthDistorted)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xQuat
      type: number
      description: "x quat"
    - name: yQuat
      type: number
      description: "y quat"
    - name: zQuat
      type: number
      description: "z quat"
    - name: wQuat
      type: number
      description: "w quat"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
    - name: nearClip
      type: number
      description: "near clip"
    - name: farClip
      type: number
      description: "far clip"
    - name: aperture
      type: number
      description: "aperture"
    - name: focus
      type: number
      description: "focus"
    - name: focalDistance
      type: number
      description: "focal distance"
    - name: zoom
      type: number
      description: "zoom"
    - name: iris
      type: number
      description: "iris"
    - name: k1
      type: number
      description: "k1"
    - name: k2
      type: number
      description: "k2"
    - name: k3
      type: number
      description: "k3"
    - name: p1
      type: number
      description: "p1"
    - name: p2
      type: number
      description: "p2"
    - name: centerX
      type: number
      description: "center x"
    - name: centerY
      type: number
      description: "center y"
    - name: panelWidth
      type: number
      description: "panel width"
    - name: overscan
      type: number
      description: "overscan"
    - name: focalLength
      type: string
      description: "focal length (optional)"
    - name: focalLengthDistorted
      type: string
      description: "focal length distorted (optional)"
- id: set_tracking_input_pause
  label: "set Tracking Input Pause"
  kind: action
  command: "setTrackingInputPause(boolean pause)"  # verbatim function signature from source
  params:
    - name: pause
      type: boolean
      description: "pause"
- id: get_tracking_input_pause
  label: "get Tracking Input Pause"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getTrackingInputPause()"  # verbatim function signature from source
  params: []
- id: set_use_position_properties_from_tracking
  label: "set Use Position Properties From Tracking"
  kind: action
  command: "setUsePositionPropertiesFromTracking(boolean pause)"  # verbatim function signature from source
  params:
    - name: pause
      type: boolean
      description: "pause"
- id: get_use_position_properties_from_tracking
  label: "get Use Position Properties From Tracking"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getUsePositionPropertiesFromTracking()"  # verbatim function signature from source
  params: []
- id: set_use_rotation_properties_from_tracking
  label: "set Use Rotation Properties From Tracking"
  kind: action
  command: "setUseRotationPropertiesFromTracking(boolean pause)"  # verbatim function signature from source
  params:
    - name: pause
      type: boolean
      description: "pause"
- id: get_use_rotation_properties_from_tracking
  label: "get Use Rotation Properties From Tracking"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getUseRotationPropertiesFromTracking()"  # verbatim function signature from source
  params: []
- id: set_project_on_associated_screens
  label: "set Project On Associated Screens"
  kind: action
  command: "setProjectOnAssociatedScreens(boolean state)"  # verbatim function signature from source
  params:
    - name: state
      type: boolean
      description: "state"
- id: get_project_on_associated_screens
  label: "get Project On Associated Screens"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getProjectOnAssociatedScreens()"  # verbatim function signature from source
  params: []
- id: move_to_top
  label: "move To Top"
  kind: action
  command: "moveToTop()"  # verbatim function signature from source
  params: []
- id: set_transformation_2
  label: "set Transformation"
  kind: action
  command: "setTransformation(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional fov, optional aspectRatio, optional lockLookAtPt)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: fov
      type: string
      description: "fov (optional)"
    - name: aspectRatio
      type: string
      description: "aspect ratio (optional)"
    - name: lockLookAtPt
      type: string
      description: "lock look at pt (optional)"
- id: set_generalized_perspective_position
  label: "set Generalized Perspective Position"
  kind: action
  command: "setGeneralizedPerspectivePosition(optional xPos, optional yPos, optional zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
- id: get_projector_with_name
  label: "get Projector With Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getProjectorWithName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_projectors
  label: "get Projectors"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getProjectors()"  # verbatim function signature from source
  params: []
- id: get_projector_names
  label: "get Projector Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getProjectorNames()"  # verbatim function signature from source
  params: []
- id: activate_screen_mapping
  label: "activate Screen Mapping"
  kind: action
  command: "activateScreenMapping(double screenId, boolean isActive)"  # verbatim function signature from source
  params:
    - name: screenId
      type: number
      description: "screen id"
    - name: isActive
      type: boolean
      description: "is active"
- id: set_render_order_id
  label: "set Render Order Id"
  kind: action
  command: "setRenderOrderId(double screenId, int orderId)"  # verbatim function signature from source
  params:
    - name: screenId
      type: number
      description: "screen id"
    - name: orderId
      type: integer
      description: "order id"
- id: get_render_order_id
  label: "get Render Order Id"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getRenderOrderId(double screenId)"  # verbatim function signature from source
  params:
    - name: screenId
      type: number
      description: "screen id"
- id: set_softedge_visible
  label: "set Softedge Visible"
  kind: action
  command: "setSoftedgeVisible(string screenName, boolean visible)"  # verbatim function signature from source
  params:
    - name: screenName
      type: string
      description: "screen name"
    - name: visible
      type: boolean
      description: "visible"
- id: get_output_2
  label: "get Output"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getOutput(optional index)"  # verbatim function signature from source
  params:
    - name: index
      type: string
      description: "index (optional)"
- id: set_output
  label: "set Output"
  kind: action
  command: "setOutput(handle outputHandle)"  # verbatim function signature from source
  params:
    - name: outputHandle
      type: string
      description: "output handle"
- id: set_horizontal_lens_shift
  label: "set Horizontal Lens Shift"
  kind: action
  command: "setHorizontalLensShift(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_horizontal_lens_shift
  label: "get Horizontal Lens Shift"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getHorizontalLensShift()"  # verbatim function signature from source
  params: []
- id: set_vertical_lens_shift
  label: "set Vertical Lens Shift"
  kind: action
  command: "setVerticalLensShift(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_vertical_lens_shift
  label: "get Vertical Lens Shift"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getVerticalLensShift()"  # verbatim function signature from source
  params: []
- id: set_brightness
  label: "set Brightness"
  kind: action
  command: "setBrightness(int value)"  # verbatim function signature from source
  params:
    - name: value
      type: integer
      description: "value"
- id: get_brightness
  label: "get Brightness"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getBrightness()"  # verbatim function signature from source
  params: []
- id: set_fov
  label: "set Fov"
  kind: action
  command: "setFov(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_fov
  label: "get Fov"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getFov()"  # verbatim function signature from source
  params: []
- id: set_throw_ratio
  label: "set Throw Ratio"
  kind: action
  command: "setThrowRatio(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_throw_ratio
  label: "get Throw Ratio"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getThrowRatio()"  # verbatim function signature from source
  params: []
- id: set_look_at_point
  label: "set Look At Point"
  kind: action
  command: "setLookAtPoint(double x, double y, double z)"  # verbatim function signature from source
  params:
    - name: x
      type: number
      description: "x"
    - name: y
      type: number
      description: "y"
    - name: z
      type: number
      description: "z"
- id: get_look_at_point
  label: "get Look At Point"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getLookAtPoint()"  # verbatim function signature from source
  params: []
- id: set_resolution
  label: "set Resolution"
  kind: action
  command: "setResolution(int x, int y)"  # verbatim function signature from source
  params:
    - name: x
      type: integer
      description: "x"
    - name: y
      type: integer
      description: "y"
- id: get_resolution
  label: "get Resolution"
  returns: "int[]"  # verbatim return type from source
  kind: query
  command: "getResolution()"  # verbatim function signature from source
  params: []
- id: get_resources
  label: "get Resources"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getResources()"  # verbatim function signature from source
  params: []
- id: get_resource_folder_with_name_path
  label: "get Resource Folder With Name Path"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getResourceFolderWithNamePath(string namePath)"  # verbatim function signature from source
  params:
    - name: namePath
      type: string
      description: "name path"
- id: get_resource_folders
  label: "get Resource Folders"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getResourceFolders()"  # verbatim function signature from source
  params: []
- id: get_transcoding_folders
  label: "get Transcoding Folders"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getTranscodingFolders()"  # verbatim function signature from source
  params: []
- id: get_json_descrip
  label: "get Json Descrip"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getJsonDescrip()"  # verbatim function signature from source
  params: []
- id: set_name
  label: "set Name"
  kind: action
  command: "setName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_resource_at_index
  label: "get Resource At Index"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getResourceAtIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_resource_by_name
  label: "get Resource By Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getResourceByName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: add_resource
  label: "add Resource"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "addResource(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: add_resources_from_directory
  label: "add Resources From Directory"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "addResourcesFromDirectory(string path, boolean removeOthers, boolean checkRedundancy)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: removeOthers
      type: boolean
      description: "remove others"
    - name: checkRedundancy
      type: boolean
      description: "check redundancy"
- id: add_resources_from_directory_remove_assets
  label: "add Resources From Directory Remove Assets"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "addResourcesFromDirectoryRemoveAssets(string path, boolean removeOthers, boolean checkRedundancy)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
    - name: removeOthers
      type: boolean
      description: "remove others"
    - name: checkRedundancy
      type: boolean
      description: "check redundancy"
- id: add_internal_resource
  label: "add Internal Resource"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "addInternalResource(string signature, int resKind)"  # verbatim function signature from source
  params:
    - name: signature
      type: string
      description: "signature"
    - name: resKind
      type: integer
      description: "res kind"
- id: create_folders_from
  label: "create Folders From"
  kind: action
  command: "createFoldersFrom(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: refresh_resources
  label: "refresh Resources"
  kind: action
  command: "refreshResources()"  # verbatim function signature from source
  params: []
- id: move_resource_to_this
  label: "move Resource To This"
  kind: action
  command: "moveResourceToThis(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: remove_this
  label: "remove This"
  kind: action
  command: "removeThis()"  # verbatim function signature from source
  params: []
- id: remove_this_including_assets
  label: "remove This Including Assets"
  kind: action
  command: "removeThisIncludingAssets()"  # verbatim function signature from source
  params: []
- id: remove_all_contents
  label: "remove All Contents"
  kind: action
  command: "removeAllContents()"  # verbatim function signature from source
  params: []
- id: remove_all_contents_including_assets
  label: "remove All Contents Including Assets"
  kind: action
  command: "removeAllContentsIncludingAssets()"  # verbatim function signature from source
  params: []
- id: delete_all_contents_assets_from_live_system
  label: "delete All Contents Assets From Live System"
  kind: action
  command: "deleteAllContentsAssetsFromLiveSystem(handle apEntityLiveSystemHandle)"  # verbatim function signature from source
  params:
    - name: apEntityLiveSystemHandle
      type: string
      description: "ap entity live system handle"
- id: reset_distribution_targets
  label: "reset Distribution Targets"
  kind: action
  command: "resetDistributionTargets()"  # verbatim function signature from source
  params: []
- id: change_distribution_target
  label: "change Distribution Target"
  kind: action
  command: "changeDistributionTarget(handle apEntityLiveSystemHandle, boolean shouldDistribute)"  # verbatim function signature from source
  params:
    - name: apEntityLiveSystemHandle
      type: string
      description: "ap entity live system handle"
    - name: shouldDistribute
      type: boolean
      description: "should distribute"
- id: replace_resources_by_string
  label: "replace Resources By String"
  kind: action
  command: "replaceResourcesByString(string searchString, string replaceString, string path)"  # verbatim function signature from source
  params:
    - name: searchString
      type: string
      description: "search string"
    - name: replaceString
      type: string
      description: "replace string"
    - name: path
      type: string
      description: "path"
- id: get_dmx_id
  label: "get Dmx Id"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getDmxId()"  # verbatim function signature from source
  params: []
- id: get_combined_dmx_id
  label: "get Combined Dmx Id"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getCombinedDmxId()"  # verbatim function signature from source
  params: []
- id: set_dmx_id
  label: "set Dmx Id"
  kind: action
  command: "setDmxId(int id)"  # verbatim function signature from source
  params:
    - name: id
      type: integer
      description: "id"
- id: distribute_resources
  label: "distribute Resources"
  kind: action
  command: "distributeResources(boolean includeSubFolders)"  # verbatim function signature from source
  params:
    - name: includeSubFolders
      type: boolean
      description: "include sub folders"
- id: get_used_transcoding_preset
  label: "get Used Transcoding Preset"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getUsedTranscodingPreset()"  # verbatim function signature from source
  params: []
- id: set_used_transcoding_preset
  label: "set Used Transcoding Preset"
  kind: action
  command: "setUsedTranscodingPreset(string preset)"  # verbatim function signature from source
  params:
    - name: preset
      type: string
      description: "preset"
- id: get_transcode_automatically
  label: "get Transcode Automatically"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getTranscodeAutomatically()"  # verbatim function signature from source
  params: []
- id: set_transcode_automatically
  label: "set Transcode Automatically"
  kind: action
  command: "setTranscodeAutomatically(boolean autoTranscode)"  # verbatim function signature from source
  params:
    - name: autoTranscode
      type: boolean
      description: "auto transcode"
- id: get_use_rx_cache_as_destination
  label: "get Use Rx Cache As Destination"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getUseRxCacheAsDestination()"  # verbatim function signature from source
  params: []
- id: set_rx_cache_as_destination
  label: "set Rx Cache As Destination"
  kind: action
  command: "setRxCacheAsDestination(boolean useRxCache)"  # verbatim function signature from source
  params:
    - name: useRxCache
      type: boolean
      description: "use rx cache"
- id: get_destination_directory
  label: "get Destination Directory"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getDestinationDirectory()"  # verbatim function signature from source
  params: []
- id: set_destination_directory
  label: "set Destination Directory"
  kind: action
  command: "setDestinationDirectory(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: delete_files_on_systems
  label: "delete Files On Systems"
  kind: action
  command: "deleteFilesOnSystems()"  # verbatim function signature from source
  params: []
- id: delete_asset_from_live_system
  label: "delete Asset From Live System"
  kind: action
  command: "deleteAssetFromLiveSystem(handle apEntityLiveSystemHandle)"  # verbatim function signature from source
  params:
    - name: apEntityLiveSystemHandle
      type: string
      description: "ap entity live system handle"
- id: get_fps
  label: "get Fps"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getFps()"  # verbatim function signature from source
  params: []
- id: get_resolution_2
  label: "get Resolution"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getResolution()"  # verbatim function signature from source
  params: []
- id: get_is_active
  label: "get Is Active"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsActive()"  # verbatim function signature from source
  params: []
- id: get_video_stream_modes
  label: "get Video Stream Modes"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getVideoStreamModes()"  # verbatim function signature from source
  params: []
- id: set_video_stream_mode
  label: "set Video Stream Mode"
  kind: action
  command: "setVideoStreamMode(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_duration
  label: "get Duration"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getDuration()"  # verbatim function signature from source
  params: []
- id: get_type
  label: "get Type"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getType()"  # verbatim function signature from source
  params: []
- id: set_current_version
  label: "set Current Version"
  kind: action
  command: "setCurrentVersion(string version)"  # verbatim function signature from source
  params:
    - name: version
      type: string
      description: "version"
- id: get_current_version
  label: "get Current Version"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentVersion()"  # verbatim function signature from source
  params: []
- id: get_versions
  label: "get Versions"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getVersions()"  # verbatim function signature from source
  params: []
- id: get_version_suffix
  label: "get Version Suffix"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getVersionSuffix()"  # verbatim function signature from source
  params: []
- id: rescan_versions
  label: "rescan Versions"
  kind: action
  command: "rescanVersions()"  # verbatim function signature from source
  params: []
- id: get_thumbnail_as_base64
  label: "get Thumbnail As Base64"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getThumbnailAsBase64()"  # verbatim function signature from source
  params: []
- id: get_has_pending_transfer
  label: "get Has Pending Transfer"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getHasPendingTransfer()"  # verbatim function signature from source
  params: []
- id: get_is_in_use
  label: "get Is In Use"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getIsInUse()"  # verbatim function signature from source
  params: []
- id: get_last_usage_begin_time
  label: "get Last Usage Begin Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getLastUsageBeginTime()"  # verbatim function signature from source
  params: []
- id: get_last_usage_begin_time_as_string
  label: "get Last Usage Begin Time As String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLastUsageBeginTimeAsString()"  # verbatim function signature from source
  params: []
- id: get_last_usage_end_time
  label: "get Last Usage End Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getLastUsageEndTime()"  # verbatim function signature from source
  params: []
- id: get_last_usage_end_time_as_string
  label: "get Last Usage End Time As String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLastUsageEndTimeAsString()"  # verbatim function signature from source
  params: []
- id: get_file_path
  label: "get File Path"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getFilePath()"  # verbatim function signature from source
  params: []
- id: set_text
  label: "set Text"
  kind: action
  command: "setText(string text)"  # verbatim function signature from source
  params:
    - name: text
      type: string
      description: "text"
- id: get_text
  label: "get Text"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getText()"  # verbatim function signature from source
  params: []
- id: set_font_with_name
  label: "set Font With Name"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setFontWithName(string fontName)"  # verbatim function signature from source
  params:
    - name: fontName
      type: string
      description: "font name"
- id: get_font_name
  label: "get Font Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getFontName()"  # verbatim function signature from source
  params: []
- id: set_font_with_path
  label: "set Font With Path"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setFontWithPath(string fontPath)"  # verbatim function signature from source
  params:
    - name: fontPath
      type: string
      description: "font path"
- id: set_horizontal_text_alignment
  label: "set Horizontal Text Alignment"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setHorizontalTextAlignment(int textAlignment)"  # verbatim function signature from source
  params:
    - name: textAlignment
      type: integer
      description: "text alignment"
- id: get_horizontal_text_alignment
  label: "get Horizontal Text Alignment"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getHorizontalTextAlignment()"  # verbatim function signature from source
  params: []
- id: set_vertical_text_alignment
  label: "set Vertical Text Alignment"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setVerticalTextAlignment(int textAlignment)"  # verbatim function signature from source
  params:
    - name: textAlignment
      type: integer
      description: "text alignment"
- id: get_vertical_text_alignment
  label: "get Vertical Text Alignment"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getVerticalTextAlignment()"  # verbatim function signature from source
  params: []
- id: set_line_height
  label: "set Line Height"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setLineHeight(double lineHeight)"  # verbatim function signature from source
  params:
    - name: lineHeight
      type: number
      description: "line height"
- id: get_line_height
  label: "get Line Height"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getLineHeight()"  # verbatim function signature from source
  params: []
- id: get_text_measurements_width_and_height
  label: "get Text Measurements Width And Height"
  returns: "int[]"  # verbatim return type from source
  kind: query
  command: "getTextMeasurementsWidthAndHeight()"  # verbatim function signature from source
  params: []
- id: set_url
  label: "set Url"
  kind: action
  command: "setUrl(string url)"  # verbatim function signature from source
  params:
    - name: url
      type: string
      description: "url"
- id: get_url
  label: "get Url"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getUrl()"  # verbatim function signature from source
  params: []
- id: set_color_transform_path
  label: "set Color Transform Path"
  kind: action
  command: "setColorTransformPath(string colorTransformPath)"  # verbatim function signature from source
  params:
    - name: colorTransformPath
      type: string
      description: "color transform path"
- id: set_color_transform_lut_resource
  label: "set Color Transform Lut Resource"
  kind: action
  command: "setColorTransformLutResource(string resourcePath)"  # verbatim function signature from source
  params:
    - name: resourcePath
      type: string
      description: "resource path"
- id: get_color_transform_path
  label: "get Color Transform Path"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getColorTransformPath()"  # verbatim function signature from source
  params: []
- id: get_color_transform_lut_resource
  label: "get Color Transform Lut Resource"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getColorTransformLutResource()"  # verbatim function signature from source
  params: []
- id: clear_color_transform_path
  label: "clear Color Transform Path"
  kind: action
  command: "clearColorTransformPath()"  # verbatim function signature from source
  params: []
- id: refresh
  label: "refresh"
  kind: action
  command: "refresh(string text)"  # verbatim function signature from source
  params:
    - name: text
      type: string
      description: "text"
- id: distribute
  label: "distribute"
  kind: action
  command: "distribute()"  # verbatim function signature from source
  params: []
- id: remove_multiresource_index
  label: "remove Multiresource Index"
  kind: action
  command: "removeMultiresourceIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: add_multiresource_item
  label: "add Multiresource Item"
  kind: action
  command: "addMultiresourceItem(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: get_multiresource_items
  label: "get Multiresource Items"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getMultiresourceItems()"  # verbatim function signature from source
  params: []
- id: replace_multiresource_item_by_index
  label: "replace Multiresource Item By Index"
  kind: action
  command: "replaceMultiresourceItemByIndex(int index, double id)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
    - name: id
      type: number
      description: "id"
- id: set_multiresource_resolution
  label: "set Multiresource Resolution"
  kind: action
  command: "setMultiresourceResolution(int width, int height)"  # verbatim function signature from source
  params:
    - name: width
      type: integer
      description: "width"
    - name: height
      type: integer
      description: "height"
- id: set_multiresource_item_sizeby_index
  label: "set Multiresource Item Sizeby Index"
  kind: action
  command: "setMultiresourceItemSizebyIndex(int index, double width, double height)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
    - name: width
      type: number
      description: "width"
    - name: height
      type: number
      description: "height"
- id: set_multiresource_item_positionby_index
  label: "set Multiresource Item Positionby Index"
  kind: action
  command: "setMultiresourceItemPositionbyIndex(int index, double x, double y)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
    - name: x
      type: number
      description: "x"
    - name: y
      type: number
      description: "y"
- id: set_use_gradient
  label: "set Use Gradient"
  kind: action
  command: "setUseGradient(boolean useGradient)"  # verbatim function signature from source
  params:
    - name: useGradient
      type: boolean
      description: "use gradient"
- id: get_use_gradient
  label: "get Use Gradient"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getUseGradient()"  # verbatim function signature from source
  params: []
- id: set_colors
  label: "set Colors"
  kind: action
  command: "setColors(uint[] argbCols, double[] positions, string[] colNames, optional useGradient)"  # verbatim function signature from source
  params:
    - name: argbCols
      type: string
      description: "argb cols"
    - name: positions
      type: string
      description: "positions"
    - name: colNames
      type: string
      description: "col names"
    - name: useGradient
      type: string
      description: "use gradient (optional)"
- id: set_color_at_index
  label: "set Color At Index"
  kind: action
  command: "setColorAtIndex(int index, int red, int green, int blue, int alpha, double position, string name, optional useGradient)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
    - name: red
      type: integer
      description: "red"
    - name: green
      type: integer
      description: "green"
    - name: blue
      type: integer
      description: "blue"
    - name: alpha
      type: integer
      description: "alpha"
    - name: position
      type: number
      description: "position"
    - name: name
      type: string
      description: "name"
    - name: useGradient
      type: string
      description: "use gradient (optional)"
- id: get_color_at_index
  label: "get Color At Index"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getColorAtIndex(int colorIndex)"  # verbatim function signature from source
  params:
    - name: colorIndex
      type: integer
      description: "color index"
- id: get_color_position_at_index
  label: "get Color Position At Index"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getColorPositionAtIndex(int colorIndex)"  # verbatim function signature from source
  params:
    - name: colorIndex
      type: integer
      description: "color index"
- id: launch_virtual_world
  label: "launch Virtual World"
  kind: action
  command: "launchVirtualWorld(string action)"  # verbatim function signature from source
  params:
    - name: action
      type: string
      description: "action"
- id: get_unreal_world
  label: "get Unreal World"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getUnrealWorld()"  # verbatim function signature from source
  params: []
- id: set_multi_resource_item_restricted_service_ips
  label: "set Multi Resource Item Restricted Service Ips"
  kind: action
  command: "setMultiResourceItemRestrictedServiceIps(int itemIndex, string[] ipAdresses)"  # verbatim function signature from source
  params:
    - name: itemIndex
      type: integer
      description: "item index"
    - name: ipAdresses
      type: string
      description: "ip adresses"
- id: get_multi_resource_item_restricted_service_ips
  label: "get Multi Resource Item Restricted Service Ips"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getMultiResourceItemRestrictedServiceIps(int itemIndex)"  # verbatim function signature from source
  params:
    - name: itemIndex
      type: integer
      description: "item index"
- id: replace
  label: "replace"
  kind: action
  command: "replace(string path)"  # verbatim function signature from source
  params:
    - name: path
      type: string
      description: "path"
- id: set_compositing_resource_create_layer_screen_aligned
  label: "set Compositing Resource Create Layer Screen Aligned"
  kind: action
  command: "setCompositingResourceCreateLayerScreenAligned(boolean createLayerScreenAligned)"  # verbatim function signature from source
  params:
    - name: createLayerScreenAligned
      type: boolean
      description: "create layer screen aligned"
- id: get_compositing_resource_create_layer_screen_aligned
  label: "get Compositing Resource Create Layer Screen Aligned"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getCompositingResourceCreateLayerScreenAligned()"  # verbatim function signature from source
  params: []
- id: transcode_with_exisitng_preset
  label: "transcode With Exisitng Preset"
  kind: action
  command: "transcodeWithExisitngPreset(string presetName, boolean useRxCache, string destinationPath, int startFrame, int endFrame, uint serviceId)"  # verbatim function signature from source
  params:
    - name: presetName
      type: string
      description: "preset name"
    - name: useRxCache
      type: boolean
      description: "use rx cache"
    - name: destinationPath
      type: string
      description: "destination path"
    - name: startFrame
      type: integer
      description: "start frame"
    - name: endFrame
      type: integer
      description: "end frame"
    - name: serviceId
      type: integer
      description: "service id"
- id: transcode_with_settings
  label: "transcode With Settings"
  kind: action
  command: "transcodeWithSettings(string settings, boolean useRxCache, string destinationPath, int startFrame, int endFrame, uint serviceId)"  # verbatim function signature from source
  params:
    - name: settings
      type: string
      description: "settings"
    - name: useRxCache
      type: boolean
      description: "use rx cache"
    - name: destinationPath
      type: string
      description: "destination path"
    - name: startFrame
      type: integer
      description: "start frame"
    - name: endFrame
      type: integer
      description: "end frame"
    - name: serviceId
      type: integer
      description: "service id"
- id: move_to_transcoding_folder
  label: "move To Transcoding Folder"
  kind: action
  command: "moveToTranscodingFolder(string folderPath)"  # verbatim function signature from source
  params:
    - name: folderPath
      type: string
      description: "folder path"
- id: set_project_path
  label: "set Project Path"
  kind: action
  command: "setProjectPath(string projectPath)"  # verbatim function signature from source
  params:
    - name: projectPath
      type: string
      description: "project path"
- id: get_project_path
  label: "get Project Path"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getProjectPath()"  # verbatim function signature from source
  params: []
- id: get_level_names
  label: "get Level Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getLevelNames()"  # verbatim function signature from source
  params: []
- id: load_level
  label: "load Level"
  kind: action
  command: "loadLevel(string levelName)"  # verbatim function signature from source
  params:
    - name: levelName
      type: string
      description: "level name"
- id: set_custom_argument_state
  label: "set Custom Argument State"
  kind: action
  command: "setCustomArgumentState(string customArgument, boolean isActive)"  # verbatim function signature from source
  params:
    - name: customArgument
      type: string
      description: "custom argument"
    - name: isActive
      type: boolean
      description: "is active"
- id: get_custom_argument_state
  label: "get Custom Argument State"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getCustomArgumentState(string customArgument)"  # verbatim function signature from source
  params:
    - name: customArgument
      type: string
      description: "custom argument"
- id: set_custom_arguments
  label: "set Custom Arguments"
  kind: action
  command: "setCustomArguments(string[] customArguments)"  # verbatim function signature from source
  params:
    - name: customArguments
      type: string
      description: "custom arguments"
- id: get_custom_arguments
  label: "get Custom Arguments"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getCustomArguments()"  # verbatim function signature from source
  params: []
- id: set_primary_render_node
  label: "set Primary Render Node"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPrimaryRenderNode(string nodeIp)"  # verbatim function signature from source
  params:
    - name: nodeIp
      type: string
      description: "node ip"
- id: get_primary_render_node_ip
  label: "get Primary Render Node Ip"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getPrimaryRenderNodeIp()"  # verbatim function signature from source
  params: []
- id: set_sync_frames_latency
  label: "set Sync Frames Latency"
  kind: action
  command: "setSyncFramesLatency(int frames)"  # verbatim function signature from source
  params:
    - name: frames
      type: integer
      description: "frames"
- id: get_sync_frames_latency
  label: "get Sync Frames Latency"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getSyncFramesLatency()"  # verbatim function signature from source
  params: []
- id: set_update_interval
  label: "set Update Interval"
  kind: action
  command: "setUpdateInterval(int interval)"  # verbatim function signature from source
  params:
    - name: interval
      type: integer
      description: "interval"
- id: get_update_interval
  label: "get Update Interval"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getUpdateInterval()"  # verbatim function signature from source
  params: []
- id: set_alpha_handling
  label: "set Alpha Handling"
  kind: action
  command: "setAlphaHandling(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_alpha_handling
  label: "get Alpha Handling"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getAlphaHandling()"  # verbatim function signature from source
  params: []
- id: get_event_trigger_names
  label: "get Event Trigger Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getEventTriggerNames()"  # verbatim function signature from source
  params: []
- id: trigger_event_by_name
  label: "trigger Event By Name"
  kind: action
  command: "triggerEventByName(string triggerName)"  # verbatim function signature from source
  params:
    - name: triggerName
      type: string
      description: "trigger name"
- id: create_n_display_config
  label: "create N Display Config"
  kind: action
  command: "createNDisplayConfig()"  # verbatim function signature from source
  params: []
- id: set_launch_participants
  label: "set Launch Participants"
  kind: action
  command: "setLaunchParticipants(string[] participantNames)"  # verbatim function signature from source
  params:
    - name: participantNames
      type: string
      description: "participant names"
- id: get_launch_participants
  label: "get Launch Participants"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getLaunchParticipants()"  # verbatim function signature from source
  params: []
- id: run_unreal
  label: "run Unreal"
  kind: action
  command: "runUnreal()"  # verbatim function signature from source
  params: []
- id: kill_unreal
  label: "kill Unreal"
  kind: action
  command: "killUnreal(optional byProcessIds)"  # verbatim function signature from source
  params:
    - name: byProcessIds
      type: string
      description: "by process ids (optional)"
- id: distribute_project_to_clients
  label: "distribute Project To Clients"
  kind: action
  command: "distributeProjectToClients(boolean useIgnoreFile)"  # verbatim function signature from source
  params:
    - name: useIgnoreFile
      type: boolean
      description: "use ignore file"
- id: get_timeline_at_index
  label: "get Timeline At Index"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getTimelineAtIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_timeline_from_name
  label: "get Timeline From Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getTimelineFromName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_timelines
  label: "get Timelines"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getTimelines()"  # verbatim function signature from source
  params: []
- id: get_timeline_names
  label: "get Timeline Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getTimelineNames()"  # verbatim function signature from source
  params: []
- id: get_timelines_selected
  label: "get Timelines Selected"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getTimelinesSelected()"  # verbatim function signature from source
  params: []
- id: create_timeline
  label: "create Timeline"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createTimeline()"  # verbatim function signature from source
  params: []
- id: duplicate_this
  label: "duplicate This"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "duplicateThis(optional withoutClipsCues)"  # verbatim function signature from source
  params:
    - name: withoutClipsCues
      type: string
      description: "without clips cues (optional)"
- id: select_this
  label: "select This"
  kind: action
  command: "selectThis()"  # verbatim function signature from source
  params: []
- id: get_zoom_factor
  label: "get Zoom Factor"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getZoomFactor()"  # verbatim function signature from source
  params: []
- id: set_zoom_factor
  label: "set Zoom Factor"
  kind: action
  command: "setZoomFactor(double zoomFactor)"  # verbatim function signature from source
  params:
    - name: zoomFactor
      type: number
      description: "zoom factor"
- id: get_vertical_scroll_offset
  label: "get Vertical Scroll Offset"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getVerticalScrollOffset()"  # verbatim function signature from source
  params: []
- id: set_vertical_scroll_offset
  label: "set Vertical Scroll Offset"
  kind: action
  command: "setVerticalScrollOffset(int offset)"  # verbatim function signature from source
  params:
    - name: offset
      type: integer
      description: "offset"
- id: get_horizontal_scroll_offset
  label: "get Horizontal Scroll Offset"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getHorizontalScrollOffset()"  # verbatim function signature from source
  params: []
- id: set_horizontal_scroll_offset
  label: "set Horizontal Scroll Offset"
  kind: action
  command: "setHorizontalScrollOffset(int offset)"  # verbatim function signature from source
  params:
    - name: offset
      type: integer
      description: "offset"
- id: move_in_render_order
  label: "move In Render Order"
  kind: action
  command: "moveInRenderOrder(boolean moveDown)"  # verbatim function signature from source
  params:
    - name: moveDown
      type: boolean
      description: "move down"
- id: set_render_order
  label: "set Render Order"
  kind: action
  command: "setRenderOrder(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_render_order
  label: "get Render Order"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getRenderOrder()"  # verbatim function signature from source
  params: []
- id: get_layers
  label: "get Layers"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getLayers()"  # verbatim function signature from source
  params: []
- id: get_layer_from_name
  label: "get Layer From Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getLayerFromName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_layer_names
  label: "get Layer Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getLayerNames()"  # verbatim function signature from source
  params: []
- id: get_layers_selected
  label: "get Layers Selected"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getLayersSelected()"  # verbatim function signature from source
  params: []
- id: select_layer_by_index
  label: "select Layer By Index"
  kind: action
  command: "selectLayerByIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: select_layer_by_names
  label: "select Layer By Names"
  kind: action
  command: "selectLayerByNames(string[] layerNames)"  # verbatim function signature from source
  params:
    - name: layerNames
      type: string
      description: "layer names"
- id: get_layer_at_index
  label: "get Layer At Index"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getLayerAtIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: create_layer
  label: "create Layer"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createLayer()"  # verbatim function signature from source
  params: []
- id: create_cue_layer
  label: "create Cue Layer"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createCueLayer()"  # verbatim function signature from source
  params: []
- id: create_clips_from_json_string
  label: "create Clips From Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "createClipsFromJsonString(string jsonString)"  # verbatim function signature from source
  params:
    - name: jsonString
      type: string
      description: "json string"
- id: remove_clips_from_json_string
  label: "remove Clips From Json String"
  kind: action
  command: "removeClipsFromJsonString(string jsonString)"  # verbatim function signature from source
  params:
    - name: jsonString
      type: string
      description: "json string"
- id: get_cue_infos_as_json_string
  label: "get Cue Infos As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCueInfosAsJsonString()"  # verbatim function signature from source
  params: []
- id: get_cues
  label: "get Cues"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getCues()"  # verbatim function signature from source
  params: []
- id: get_cues_for_layer_by_name
  label: "get Cues For Layer By Name"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getCuesForLayerByName(string layerName)"  # verbatim function signature from source
  params:
    - name: layerName
      type: string
      description: "layer name"
- id: get_cues_selected
  label: "get Cues Selected"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getCuesSelected()"  # verbatim function signature from source
  params: []
- id: get_cue_names
  label: "get Cue Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getCueNames()"  # verbatim function signature from source
  params: []
- id: get_cue_at_index
  label: "get Cue At Index"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCueAtIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_cue_from_name
  label: "get Cue From Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCueFromName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_cue_from_number
  label: "get Cue From Number"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCueFromNumber(int number)"  # verbatim function signature from source
  params:
    - name: number
      type: integer
      description: "number"
- id: get_cue_from_number_components
  label: "get Cue From Number Components"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCueFromNumberComponents(int main, int sub, int detail)"  # verbatim function signature from source
  params:
    - name: main
      type: integer
      description: "main"
    - name: sub
      type: integer
      description: "sub"
    - name: detail
      type: integer
      description: "detail"
- id: apply_cue_with_name
  label: "apply Cue With Name"
  kind: action
  command: "applyCueWithName(string name, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_with_number
  label: "apply Cue With Number"
  kind: action
  command: "applyCueWithNumber(int number, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: number
      type: integer
      description: "number"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_with_number_components
  label: "apply Cue With Number Components"
  kind: action
  command: "applyCueWithNumberComponents(int main, int sub, int detail, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: main
      type: integer
      description: "main"
    - name: sub
      type: integer
      description: "sub"
    - name: detail
      type: integer
      description: "detail"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: apply_cue_with_number_string
  label: "apply Cue With Number String"
  kind: action
  command: "applyCueWithNumberString(string numberStr, optional blendDuration)"  # verbatim function signature from source
  params:
    - name: numberStr
      type: string
      description: "number str"
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: create_cue
  label: "create Cue"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createCue(string name, double timeInFrames, int operation, handle cueLayerHandle)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: timeInFrames
      type: number
      description: "time in frames"
    - name: operation
      type: integer
      description: "operation"
    - name: cueLayerHandle
      type: string
      description: "cue layer handle"
- id: remove_cues
  label: "remove Cues"
  kind: action
  command: "removeCues()"  # verbatim function signature from source
  params: []
- id: create_pause_cue_before_selected_clips
  label: "create Pause Cue Before Selected Clips"
  kind: action
  command: "createPauseCueBeforeSelectedClips(handle cueLayerHandle)"  # verbatim function signature from source
  params:
    - name: cueLayerHandle
      type: string
      description: "cue layer handle"
- id: play
  label: "play"
  kind: action
  command: "play()"  # verbatim function signature from source
  params: []
- id: pause
  label: "pause"
  kind: action
  command: "pause()"  # verbatim function signature from source
  params: []
- id: stop
  label: "stop"
  kind: action
  command: "stop()"  # verbatim function signature from source
  params: []
- id: toggle_transport_2
  label: "toggle Transport"
  kind: action
  command: "toggleTransport()"  # verbatim function signature from source
  params: []
- id: store
  label: "store"
  kind: action
  command: "store()"  # verbatim function signature from source
  params: []
- id: reset
  label: "reset"
  kind: action
  command: "reset()"  # verbatim function signature from source
  params: []
- id: get_attributes
  label: "get Attributes"
  kind: action
  command: "getAttributes()"  # verbatim function signature from source
  params: []
- id: set_current_frame
  label: "set Current Frame"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setCurrentFrame(int time)"  # verbatim function signature from source
  params:
    - name: time
      type: integer
      description: "time"
- id: set_current_time
  label: "set Current Time"
  kind: action
  command: "setCurrentTime(int time)"  # verbatim function signature from source
  params:
    - name: time
      type: integer
      description: "time"
- id: get_current_time_2
  label: "get Current Time"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getCurrentTime()"  # verbatim function signature from source
  params: []
- id: scrub_current_time
  label: "scrub Current Time"
  kind: action
  command: "scrubCurrentTime(int frames)"  # verbatim function signature from source
  params:
    - name: frames
      type: integer
      description: "frames"
- id: get_current_hmsf
  label: "get Current HMSF"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentHMSF()"  # verbatim function signature from source
  params: []
- id: set_transport_mode
  label: "set Transport Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTransportMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_transport_mode
  label: "get Transport Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getTransportMode()"  # verbatim function signature from source
  params: []
- id: move_to_next_cue
  label: "move To Next Cue"
  kind: action
  command: "moveToNextCue()"  # verbatim function signature from source
  params: []
- id: move_to_next_cue_ignore_properties
  label: "move To Next Cue Ignore Properties"
  kind: action
  command: "moveToNextCueIgnoreProperties()"  # verbatim function signature from source
  params: []
- id: get_cue_next
  label: "get Cue Next"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCueNext()"  # verbatim function signature from source
  params: []
- id: move_to_previous_cue
  label: "move To Previous Cue"
  kind: action
  command: "moveToPreviousCue()"  # verbatim function signature from source
  params: []
- id: move_to_previous_cue_ignore_properties
  label: "move To Previous Cue Ignore Properties"
  kind: action
  command: "moveToPreviousCueIgnoreProperties()"  # verbatim function signature from source
  params: []
- id: get_cue_previous
  label: "get Cue Previous"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getCuePrevious()"  # verbatim function signature from source
  params: []
- id: ignore_next_cue
  label: "ignore Next Cue"
  kind: action
  command: "ignoreNextCue()"  # verbatim function signature from source
  params: []
- id: ignore_next_cue_with_operation
  label: "ignore Next Cue With Operation"
  kind: action
  command: "ignoreNextCueWithOperation(int cueOperation)"  # verbatim function signature from source
  params:
    - name: cueOperation
      type: integer
      description: "cue operation"
- id: blend_to_time
  label: "blend To Time"
  kind: action
  command: "blendToTime(double goalTime, double blendDuration, optional preloadDelayInMilliseconds)"  # verbatim function signature from source
  params:
    - name: goalTime
      type: number
      description: "goal time"
    - name: blendDuration
      type: number
      description: "blend duration"
    - name: preloadDelayInMilliseconds
      type: string
      description: "preload delay in milliseconds (optional)"
- id: blend_to_time_with_transport_mode
  label: "blend To Time With Transport Mode"
  kind: action
  command: "blendToTimeWithTransportMode(double goalTime, double blendDuration, int transportMode, optional preloadDelayInMilliseconds)"  # verbatim function signature from source
  params:
    - name: goalTime
      type: number
      description: "goal time"
    - name: blendDuration
      type: number
      description: "blend duration"
    - name: transportMode
      type: integer
      description: "transport mode"
    - name: preloadDelayInMilliseconds
      type: string
      description: "preload delay in milliseconds (optional)"
- id: set_blend_to_time_mode
  label: "set Blend To Time Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setBlendToTimeMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: set_speed_factor
  label: "set Speed Factor"
  kind: action
  command: "setSpeedFactor(double factor)"  # verbatim function signature from source
  params:
    - name: factor
      type: number
      description: "factor"
- id: get_speed_factor
  label: "get Speed Factor"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getSpeedFactor()"  # verbatim function signature from source
  params: []
- id: set_opacity
  label: "set Opacity"
  kind: action
  command: "setOpacity(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_opacity
  label: "get Opacity"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getOpacity()"  # verbatim function signature from source
  params: []
- id: start_opacity_animation
  label: "start Opacity Animation"
  kind: action
  command: "startOpacityAnimation(boolean fadeIn, double fullFadeDuration)"  # verbatim function signature from source
  params:
    - name: fadeIn
      type: boolean
      description: "fade in"
    - name: fullFadeDuration
      type: number
      description: "full fade duration"
- id: set_smpte_mode
  label: "set Smpte Mode"
  kind: action
  command: "setSmpteMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_smpte_mode
  label: "get Smpte Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getSmpteMode()"  # verbatim function signature from source
  params: []
- id: store_recorded_values
  label: "store Recorded Values"
  kind: action
  command: "storeRecordedValues()"  # verbatim function signature from source
  params: []
- id: set_smpte_input_behaviour
  label: "set Smpte Input Behaviour"
  kind: action
  command: "setSmpteInputBehaviour(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_smpte_input_behaviour
  label: "get Smpte Input Behaviour"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getSmpteInputBehaviour()"  # verbatim function signature from source
  params: []
- id: set_smpte_offset
  label: "set Smpte Offset"
  kind: action
  command: "setSmpteOffset(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_smpte_offset
  label: "get Smpte Offset"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getSmpteOffset()"  # verbatim function signature from source
  params: []
- id: reset_recorded_values
  label: "reset Recorded Values"
  kind: action
  command: "resetRecordedValues()"  # verbatim function signature from source
  params: []
- id: get_timeline_infos_as_json_string
  label: "get Timeline Infos As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getTimelineInfosAsJsonString()"  # verbatim function signature from source
  params: []
- id: start_preview_edit
  label: "start Preview Edit"
  kind: action
  command: "startPreviewEdit(double goalTime)"  # verbatim function signature from source
  params:
    - name: goalTime
      type: number
      description: "goal time"
- id: end_preview_edit
  label: "end Preview Edit"
  kind: action
  command: "endPreviewEdit(boolean moveToPreview, optional blendDurationInMs)"  # verbatim function signature from source
  params:
    - name: moveToPreview
      type: boolean
      description: "move to preview"
    - name: blendDurationInMs
      type: string
      description: "blend duration in ms (optional)"
- id: set_current_preview_edit_time
  label: "set Current Preview Edit Time"
  kind: action
  command: "setCurrentPreviewEditTime(int time)"  # verbatim function signature from source
  params:
    - name: time
      type: integer
      description: "time"
- id: set_current_preview_edit_time_to_cue_time
  label: "set Current Preview Edit Time To Cue Time"
  kind: action
  command: "setCurrentPreviewEditTimeToCueTime(int cueNumber)"  # verbatim function signature from source
  params:
    - name: cueNumber
      type: integer
      description: "cue number"
- id: get_current_preview_edit_time
  label: "get Current Preview Edit Time"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getCurrentPreviewEditTime()"  # verbatim function signature from source
  params: []
- id: set_preview_edit_transport_mode
  label: "set Preview Edit Transport Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setPreviewEditTransportMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_preview_edit_transport_mode
  label: "get Preview Edit Transport Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getPreviewEditTransportMode()"  # verbatim function signature from source
  params: []
- id: get_nodes
  label: "get Nodes"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getNodes()"  # verbatim function signature from source
  params: []
- id: get_parameters
  label: "get Parameters"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getParameters()"  # verbatim function signature from source
  params: []
- id: get_node_with_name
  label: "get Node With Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getNodeWithName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_param_with_name
  label: "get Param With Name"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getParamWithName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_spatial_parameters_at_time
  label: "get Spatial Parameters At Time"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getSpatialParametersAtTime(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_timeline
  label: "get Timeline"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getTimeline()"  # verbatim function signature from source
  params: []
- id: reset_layer
  label: "reset Layer"
  kind: action
  command: "resetLayer()"  # verbatim function signature from source
  params: []
- id: get_layer_json_descrip
  label: "get Layer Json Descrip"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLayerJsonDescrip()"  # verbatim function signature from source
  params: []
- id: set_layer_json_descrip
  label: "set Layer Json Descrip"
  kind: action
  command: "setLayerJsonDescrip(string descrip, boolean makeAllDominant)"  # verbatim function signature from source
  params:
    - name: descrip
      type: string
      description: "descrip"
    - name: makeAllDominant
      type: boolean
      description: "make all dominant"
- id: init_from_json_descrip
  label: "init From Json Descrip"
  kind: action
  command: "initFromJsonDescrip(string descrip)"  # verbatim function signature from source
  params:
    - name: descrip
      type: string
      description: "descrip"
- id: set_opacity_2
  label: "set Opacity"
  kind: action
  command: "setOpacity(double value, optional fadeTimeMs)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
    - name: fadeTimeMs
      type: string
      description: "fade time ms (optional)"
- id: reset_opacity
  label: "reset Opacity"
  kind: action
  command: "resetOpacity()"  # verbatim function signature from source
  params: []
- id: set_volume
  label: "set Volume"
  kind: action
  command: "setVolume(double value, optional fadeTimeMs)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
    - name: fadeTimeMs
      type: string
      description: "fade time ms (optional)"
- id: get_volume
  label: "get Volume"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getVolume()"  # verbatim function signature from source
  params: []
- id: reset_volume
  label: "reset Volume"
  kind: action
  command: "resetVolume()"  # verbatim function signature from source
  params: []
- id: mute_layer
  label: "mute Layer"
  kind: action
  command: "muteLayer()"  # verbatim function signature from source
  params: []
- id: un_mute_layer
  label: "un Mute Layer"
  kind: action
  command: "unMuteLayer()"  # verbatim function signature from source
  params: []
- id: get_is_layer_muted
  label: "get Is Layer Muted"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsLayerMuted()"  # verbatim function signature from source
  params: []
- id: mute_audio
  label: "mute Audio"
  kind: action
  command: "muteAudio()"  # verbatim function signature from source
  params: []
- id: un_mute_audio
  label: "un Mute Audio"
  kind: action
  command: "unMuteAudio()"  # verbatim function signature from source
  params: []
- id: get_is_audio_muted
  label: "get Is Audio Muted"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsAudioMuted()"  # verbatim function signature from source
  params: []
- id: get_dmx_mute_state
  label: "get Dmx Mute State"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getDmxMuteState()"  # verbatim function signature from source
  params: []
- id: set_dmx_mute_state
  label: "set Dmx Mute State"
  kind: action
  command: "setDmxMuteState(uint muteState)"  # verbatim function signature from source
  params:
    - name: muteState
      type: integer
      description: "mute state"
- id: toggle_explicit_mute
  label: "toggle Explicit Mute"
  kind: action
  command: "toggleExplicitMute(uint flag)"  # verbatim function signature from source
  params:
    - name: flag
      type: integer
      description: "flag"
- id: set_transport
  label: "set Transport"
  kind: action
  command: "setTransport(int mode, boolean loop)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
    - name: loop
      type: boolean
      description: "loop"
- id: reset_transport_mode
  label: "reset Transport Mode"
  kind: action
  command: "resetTransportMode()"  # verbatim function signature from source
  params: []
- id: get_transport_loop
  label: "get Transport Loop"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getTransportLoop()"  # verbatim function signature from source
  params: []
- id: set_transport_ping_pong
  label: "set Transport Ping Pong"
  kind: action
  command: "setTransportPingPong(boolean doPingPong)"  # verbatim function signature from source
  params:
    - name: doPingPong
      type: boolean
      description: "do ping pong"
- id: get_transport_ping_pong
  label: "get Transport Ping Pong"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getTransportPingPong()"  # verbatim function signature from source
  params: []
- id: set_playback_speed
  label: "set Playback Speed"
  kind: action
  command: "setPlaybackSpeed(double speed)"  # verbatim function signature from source
  params:
    - name: speed
      type: number
      description: "speed"
- id: get_playback_speed
  label: "get Playback Speed"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getPlaybackSpeed()"  # verbatim function signature from source
  params: []
- id: assign_resource
  label: "assign Resource"
  kind: action
  command: "assignResource(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: assign_resource_with_fade
  label: "assign Resource With Fade"
  kind: action
  command: "assignResourceWithFade(double id, double fadeDuration)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
    - name: fadeDuration
      type: number
      description: "fade duration"
- id: get_assigned_resource
  label: "get Assigned Resource"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getAssignedResource()"  # verbatim function signature from source
  params: []
- id: reset_assigned_resource
  label: "reset Assigned Resource"
  kind: action
  command: "resetAssignedResource()"  # verbatim function signature from source
  params: []
- id: get_assigned_model_resource
  label: "get Assigned Model Resource"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getAssignedModelResource()"  # verbatim function signature from source
  params: []
- id: reset_assigned_model_resource
  label: "reset Assigned Model Resource"
  kind: action
  command: "resetAssignedModelResource()"  # verbatim function signature from source
  params: []
- id: get_fx_names
  label: "get Fx Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getFxNames()"  # verbatim function signature from source
  params: []
- id: set_fade_duration_dominant_resource_change
  label: "set Fade Duration Dominant Resource Change"
  kind: action
  command: "setFadeDurationDominantResourceChange(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: get_fade_duration_dominant_resource_change
  label: "get Fade Duration Dominant Resource Change"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getFadeDurationDominantResourceChange()"  # verbatim function signature from source
  params: []
- id: create_clip
  label: "create Clip"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createClip()"  # verbatim function signature from source
  params: []
- id: create_clip_at_time
  label: "create Clip At Time"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createClipAtTime(double timeInFrames)"  # verbatim function signature from source
  params:
    - name: timeInFrames
      type: number
      description: "time in frames"
- id: control_clip_border
  label: "control Clip Border"
  kind: action
  command: "controlClipBorder(handle clip, boolean isEnter, boolean isIncremental, double entryTime)"  # verbatim function signature from source
  params:
    - name: clip
      type: string
      description: "clip"
    - name: isEnter
      type: boolean
      description: "is enter"
    - name: isIncremental
      type: boolean
      description: "is incremental"
    - name: entryTime
      type: number
      description: "entry time"
- id: get_clip_at_index
  label: "get Clip At Index"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getClipAtIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: get_clips
  label: "get Clips"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getClips()"  # verbatim function signature from source
  params: []
- id: get_clip_current
  label: "get Clip Current"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getClipCurrent(int offset)"  # verbatim function signature from source
  params:
    - name: offset
      type: integer
      description: "offset"
- id: get_clips_selected
  label: "get Clips Selected"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getClipsSelected()"  # verbatim function signature from source
  params: []
- id: remove_clips
  label: "remove Clips"
  kind: action
  command: "removeClips()"  # verbatim function signature from source
  params: []
- id: set_home_screen_from_screen_name
  label: "set Home Screen From Screen Name"
  kind: action
  command: "setHomeScreenFromScreenName(string screenName)"  # verbatim function signature from source
  params:
    - name: screenName
      type: string
      description: "screen name"
- id: get_home_screen_name
  label: "get Home Screen Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getHomeScreenName()"  # verbatim function signature from source
  params: []
- id: set_scale_unit_mode
  label: "set Scale Unit Mode"
  kind: action
  command: "setScaleUnitMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_scale_unit_mode
  label: "get Scale Unit Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getScaleUnitMode()"  # verbatim function signature from source
  params: []
- id: set_render_only_on_home_screen
  label: "set Render Only On Home Screen"
  kind: action
  command: "setRenderOnlyOnHomeScreen(boolean onlyOnHomeScreen)"  # verbatim function signature from source
  params:
    - name: onlyOnHomeScreen
      type: boolean
      description: "only on home screen"
- id: get_render_only_on_home_screen
  label: "get Render Only On Home Screen"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getRenderOnlyOnHomeScreen()"  # verbatim function signature from source
  params: []
- id: set_origin
  label: "set Origin"
  kind: action
  command: "setOrigin(int origin)"  # verbatim function signature from source
  params:
    - name: origin
      type: integer
      description: "origin"
- id: get_origin
  label: "get Origin"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getOrigin()"  # verbatim function signature from source
  params: []
- id: set_screen_group_presence
  label: "set Screen Group Presence"
  kind: action
  command: "setScreenGroupPresence(handle[] screenGroups)"  # verbatim function signature from source
  params:
    - name: screenGroups
      type: string
      description: "screen groups"
- id: get_screen_group_presence
  label: "get Screen Group Presence"
  returns: "handle[]"  # verbatim return type from source
  kind: query
  command: "getScreenGroupPresence()"  # verbatim function signature from source
  params: []
- id: set_screen_group_presence_by_name
  label: "set Screen Group Presence By Name"
  kind: action
  command: "setScreenGroupPresenceByName(string[] screenGroupNames)"  # verbatim function signature from source
  params:
    - name: screenGroupNames
      type: string
      description: "screen group names"
- id: get_screen_group_presence_names
  label: "get Screen Group Presence Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getScreenGroupPresenceNames()"  # verbatim function signature from source
  params: []
- id: set2d_oriented_transformation
  label: "set2d Oriented Transformation"
  kind: action
  command: "set2dOrientedTransformation(boolean use2dOriented)"  # verbatim function signature from source
  params:
    - name: use2dOriented
      type: boolean
      description: "use2d oriented"
- id: get2d_oriented_transformation
  label: "get2d Oriented Transformation"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "get2dOrientedTransformation()"  # verbatim function signature from source
  params: []
- id: set_blend_mode
  label: "set Blend Mode"
  kind: action
  command: "setBlendMode(string blendMode)"  # verbatim function signature from source
  params:
    - name: blendMode
      type: string
      description: "blend mode"
- id: get_blend_mode
  label: "get Blend Mode"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getBlendMode()"  # verbatim function signature from source
  params: []
- id: add_effect_by_id
  label: "add Effect By Id"
  kind: action
  command: "addEffectById(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: set_preload_permanently
  label: "set Preload Permanently"
  kind: action
  command: "setPreloadPermanently(boolean doPreloadPermanently)"  # verbatim function signature from source
  params:
    - name: doPreloadPermanently
      type: boolean
      description: "do preload permanently"
- id: get_preload_permanently
  label: "get Preload Permanently"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getPreloadPermanently()"  # verbatim function signature from source
  params: []
- id: set_restrict_to_service_with_ips
  label: "set Restrict To Service With Ips"
  kind: action
  command: "setRestrictToServiceWithIps(boolean doRestrict, string[] ipAdresses)"  # verbatim function signature from source
  params:
    - name: doRestrict
      type: boolean
      description: "do restrict"
    - name: ipAdresses
      type: string
      description: "ip adresses"
- id: get_restrict_to_service
  label: "get Restrict To Service"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getRestrictToService()"  # verbatim function signature from source
  params: []
- id: get_restricted_service_ips
  label: "get Restricted Service Ips"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getRestrictedServiceIps()"  # verbatim function signature from source
  params: []
- id: get_offsets
  label: "get Offsets"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getOffsets()"  # verbatim function signature from source
  params: []
- id: set_offsets
  label: "set Offsets"
  kind: action
  command: "setOffsets(optional x, optional y, optional z, optional xr, optional yr, optional zr, optional xScale, optional yScale, optional zScale)"  # verbatim function signature from source
  params:
    - name: x
      type: string
      description: "x (optional)"
    - name: y
      type: string
      description: "y (optional)"
    - name: z
      type: string
      description: "z (optional)"
    - name: xr
      type: string
      description: "xr (optional)"
    - name: yr
      type: string
      description: "yr (optional)"
    - name: zr
      type: string
      description: "zr (optional)"
    - name: xScale
      type: string
      description: "x scale (optional)"
    - name: yScale
      type: string
      description: "y scale (optional)"
    - name: zScale
      type: string
      description: "z scale (optional)"
- id: set_current_values_to_offset
  label: "set Current Values To Offset"
  kind: action
  command: "setCurrentValuesToOffset(int typeIndex, optional resetDominant, optional removeKeyframesClips)"  # verbatim function signature from source
  params:
    - name: typeIndex
      type: integer
      description: "type index"
    - name: resetDominant
      type: string
      description: "reset dominant (optional)"
    - name: removeKeyframesClips
      type: string
      description: "remove keyframes clips (optional)"
- id: execute_java_script_on_current_web_resource
  label: "execute Java Script On Current Web Resource"
  kind: action
  command: "executeJavaScriptOnCurrentWebResource(string script)"  # verbatim function signature from source
  params:
    - name: script
      type: string
      description: "script"
- id: set_time
  label: "set Time"
  kind: action
  command: "setTime(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_time
  label: "get Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getTime()"  # verbatim function signature from source
  params: []
- id: set_duration
  label: "set Duration"
  kind: action
  command: "setDuration(double duration)"  # verbatim function signature from source
  params:
    - name: duration
      type: number
      description: "duration"
- id: set_label
  label: "set Label"
  kind: action
  command: "setLabel(string label)"  # verbatim function signature from source
  params:
    - name: label
      type: string
      description: "label"
- id: get_label
  label: "get Label"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLabel()"  # verbatim function signature from source
  params: []
- id: get_play_mode
  label: "get Play Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getPlayMode()"  # verbatim function signature from source
  params: []
- id: set_play_mode
  label: "set Play Mode"
  kind: action
  command: "setPlayMode(int playMode)"  # verbatim function signature from source
  params:
    - name: playMode
      type: integer
      description: "play mode"
- id: get_speed
  label: "get Speed"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getSpeed()"  # verbatim function signature from source
  params: []
- id: set_speed
  label: "set Speed"
  kind: action
  command: "setSpeed(double speed)"  # verbatim function signature from source
  params:
    - name: speed
      type: number
      description: "speed"
- id: get_blend_frames
  label: "get Blend Frames"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getBlendFrames()"  # verbatim function signature from source
  params: []
- id: set_blend_frames
  label: "set Blend Frames"
  kind: action
  command: "setBlendFrames(boolean doFrameblending)"  # verbatim function signature from source
  params:
    - name: doFrameblending
      type: boolean
      description: "do frameblending"
- id: get_inpoint
  label: "get Inpoint"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getInpoint()"  # verbatim function signature from source
  params: []
- id: set_inpoint
  label: "set Inpoint"
  kind: action
  command: "setInpoint(double inpoint)"  # verbatim function signature from source
  params:
    - name: inpoint
      type: number
      description: "inpoint"
- id: get_outpoint
  label: "get Outpoint"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getOutpoint()"  # verbatim function signature from source
  params: []
- id: set_outpoint
  label: "set Outpoint"
  kind: action
  command: "setOutpoint(double inpoint)"  # verbatim function signature from source
  params:
    - name: inpoint
      type: number
      description: "inpoint"
- id: assign_resource_2
  label: "assign Resource"
  kind: action
  command: "assignResource(double resId, optional setToResourceDuration)"  # verbatim function signature from source
  params:
    - name: resId
      type: number
      description: "res id"
    - name: setToResourceDuration
      type: string
      description: "set to resource duration (optional)"
- id: get_assigned_resource_name
  label: "get Assigned Resource Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getAssignedResourceName()"  # verbatim function signature from source
  params: []
- id: set_to_resource_duration
  label: "set To Resource Duration"
  kind: action
  command: "setToResourceDuration()"  # verbatim function signature from source
  params: []
- id: create_event
  label: "create Event"
  kind: action
  command: "createEvent(string namePath, double time, double value)"  # verbatim function signature from source
  params:
    - name: namePath
      type: string
      description: "name path"
    - name: time
      type: number
      description: "time"
    - name: value
      type: number
      description: "value"
- id: create_event_in_pixel_space
  label: "create Event In Pixel Space"
  kind: action
  command: "createEventInPixelSpace(string namePath, double time, double value)"  # verbatim function signature from source
  params:
    - name: namePath
      type: string
      description: "name path"
    - name: time
      type: number
      description: "time"
    - name: value
      type: number
      description: "value"
- id: remove_event
  label: "remove Event"
  kind: action
  command: "removeEvent(string namePath, double time)"  # verbatim function signature from source
  params:
    - name: namePath
      type: string
      description: "name path"
    - name: time
      type: number
      description: "time"
- id: create_pause_cue_before_clip
  label: "create Pause Cue Before Clip"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "createPauseCueBeforeClip(handle cueLayerHandle)"  # verbatim function signature from source
  params:
    - name: cueLayerHandle
      type: string
      description: "cue layer handle"
- id: get_keyframes_as_json_string
  label: "get Keyframes As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getKeyframesAsJsonString()"  # verbatim function signature from source
  params: []
- id: get_node_from_id
  label: "get Node From Id"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getNodeFromId(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: get_instance_path_2
  label: "get Instance Path"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getInstancePath(handle apEntityThisHandle)"  # verbatim function signature from source
  params:
    - name: apEntityThisHandle
      type: string
      description: "ap entity this handle"
- id: set_values
  label: "set Values"
  kind: action
  command: "setValues(double[] values)"  # verbatim function signature from source
  params:
    - name: values
      type: string
      description: "values"
- id: get_values
  label: "get Values"
  returns: "double[]"  # verbatim return type from source
  kind: query
  command: "getValues()"  # verbatim function signature from source
  params: []
- id: reset_values
  label: "reset Values"
  kind: action
  command: "resetValues()"  # verbatim function signature from source
  params: []
- id: store_values
  label: "store Values"
  kind: action
  command: "storeValues()"  # verbatim function signature from source
  params: []
- id: mute
  label: "mute"
  kind: action
  command: "mute()"  # verbatim function signature from source
  params: []
- id: un_mute
  label: "un Mute"
  kind: action
  command: "unMute()"  # verbatim function signature from source
  params: []
- id: toggle_mute
  label: "toggle Mute"
  kind: action
  command: "toggleMute()"  # verbatim function signature from source
  params: []
- id: get_is_muted
  label: "get Is Muted"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsMuted()"  # verbatim function signature from source
  params: []
- id: get_is_channel
  label: "get Is Channel"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsChannel()"  # verbatim function signature from source
  params: []
- id: set_value
  label: "set Value"
  kind: action
  command: "setValue(timelineParamValue value, optional fadeTimeMs)"  # verbatim function signature from source
  params:
    - name: value
      type: string
      description: "value"
    - name: fadeTimeMs
      type: string
      description: "fade time ms (optional)"
- id: set_value_relativ
  label: "set Value Relativ"
  kind: action
  command: "setValueRelativ(double value, optional fadeTimeMs)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
    - name: fadeTimeMs
      type: string
      description: "fade time ms (optional)"
- id: get_value
  label: "get Value"
  returns: "timelineParamValue"  # verbatim return type from source
  kind: query
  command: "getValue()"  # verbatim function signature from source
  params: []
- id: reset_value
  label: "reset Value"
  kind: action
  command: "resetValue()"  # verbatim function signature from source
  params: []
- id: store_value
  label: "store Value"
  kind: action
  command: "storeValue()"  # verbatim function signature from source
  params: []
- id: store_value_and_remove_other
  label: "store Value And Remove Other"
  kind: action
  command: "storeValueAndRemoveOther()"  # verbatim function signature from source
  params: []
- id: set_transport_attributes
  label: "set Transport Attributes"
  kind: action
  command: "setTransportAttributes(int mode, double speed, boolean loop, int inpoint, int outpoint)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
    - name: speed
      type: number
      description: "speed"
    - name: loop
      type: boolean
      description: "loop"
    - name: inpoint
      type: integer
      description: "inpoint"
    - name: outpoint
      type: integer
      description: "outpoint"
- id: apply_2
  label: "apply"
  kind: action
  command: "apply(optional blendDuration)"  # verbatim function signature from source
  params:
    - name: blendDuration
      type: string
      description: "blend duration (optional)"
- id: blend_to_this
  label: "blend To This"
  kind: action
  command: "blendToThis(double blendDuration)"  # verbatim function signature from source
  params:
    - name: blendDuration
      type: number
      description: "blend duration"
- id: get_index
  label: "get Index"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getIndex()"  # verbatim function signature from source
  params: []
- id: set_name_2
  label: "set Name"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_note
  label: "get Note"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getNote()"  # verbatim function signature from source
  params: []
- id: set_note
  label: "set Note"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setNote(string note)"  # verbatim function signature from source
  params:
    - name: note
      type: string
      description: "note"
- id: get_operation
  label: "get Operation"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getOperation()"  # verbatim function signature from source
  params: []
- id: set_operation
  label: "set Operation"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setOperation(int operation)"  # verbatim function signature from source
  params:
    - name: operation
      type: integer
      description: "operation"
- id: get_jump_mode
  label: "get Jump Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getJumpMode()"  # verbatim function signature from source
  params: []
- id: set_jump_mode
  label: "set Jump Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setJumpMode(int jumpMode)"  # verbatim function signature from source
  params:
    - name: jumpMode
      type: integer
      description: "jump mode"
- id: get_jump_goal_time
  label: "get Jump Goal Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getJumpGoalTime()"  # verbatim function signature from source
  params: []
- id: set_jump_goal_time
  label: "set Jump Goal Time"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setJumpGoalTime(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_jump_goal_label
  label: "get Jump Goal Label"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getJumpGoalLabel()"  # verbatim function signature from source
  params: []
- id: get_jump_goal_cue
  label: "get Jump Goal Cue"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getJumpGoalCue()"  # verbatim function signature from source
  params: []
- id: set_jump_goal_label
  label: "set Jump Goal Label"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setJumpGoalLabel(string jumpGoalLabel)"  # verbatim function signature from source
  params:
    - name: jumpGoalLabel
      type: string
      description: "jump goal label"
- id: get_number
  label: "get Number"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getNumber()"  # verbatim function signature from source
  params: []
- id: get_number_components
  label: "get Number Components"
  returns: "int[]"  # verbatim return type from source
  kind: query
  command: "getNumberComponents()"  # verbatim function signature from source
  params: []
- id: set_number
  label: "set Number"
  kind: action
  command: "setNumber(int number)"  # verbatim function signature from source
  params:
    - name: number
      type: integer
      description: "number"
- id: set_number_with_components
  label: "set Number With Components"
  kind: action
  command: "setNumberWithComponents(int main, int sub, int detail)"  # verbatim function signature from source
  params:
    - name: main
      type: integer
      description: "main"
    - name: sub
      type: integer
      description: "sub"
    - name: detail
      type: integer
      description: "detail"
- id: set_number_with_string
  label: "set Number With String"
  kind: action
  command: "setNumberWithString(string numberStr)"  # verbatim function signature from source
  params:
    - name: numberStr
      type: string
      description: "number str"
- id: get_wait_duration
  label: "get Wait Duration"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getWaitDuration()"  # verbatim function signature from source
  params: []
- id: set_wait_duration
  label: "set Wait Duration"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setWaitDuration(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_blend_duration
  label: "get Blend Duration"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getBlendDuration()"  # verbatim function signature from source
  params: []
- id: set_blend_duration
  label: "set Blend Duration"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setBlendDuration(double timeInFrames)"  # verbatim function signature from source
  params:
    - name: timeInFrames
      type: number
      description: "time in frames"
- id: get_fade_to_this_duration_override
  label: "get Fade To This Duration Override"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getFadeToThisDurationOverride()"  # verbatim function signature from source
  params: []
- id: set_fade_to_this_duration_override
  label: "set Fade To This Duration Override"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setFadeToThisDurationOverride(int durationInMs)"  # verbatim function signature from source
  params:
    - name: durationInMs
      type: integer
      description: "duration in ms"
- id: get_fade_to_this_delay_override
  label: "get Fade To This Delay Override"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getFadeToThisDelayOverride()"  # verbatim function signature from source
  params: []
- id: set_fade_to_this_delay_override
  label: "set Fade To This Delay Override"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setFadeToThisDelayOverride(int delayInMs)"  # verbatim function signature from source
  params:
    - name: delayInMs
      type: integer
      description: "delay in ms"
- id: set_time_2
  label: "set Time"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTime(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: get_timeline_to_trigger_name
  label: "get Timeline To Trigger Name"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getTimelineToTriggerName()"  # verbatim function signature from source
  params: []
- id: set_timeline_to_trigger
  label: "set Timeline To Trigger"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTimelineToTrigger(string nameTimeline)"  # verbatim function signature from source
  params:
    - name: nameTimeline
      type: string
      description: "name timeline"
- id: get_timeline_to_trigger_mode
  label: "get Timeline To Trigger Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getTimelineToTriggerMode()"  # verbatim function signature from source
  params: []
- id: set_timeline_to_trigger_time_mode
  label: "set Timeline To Trigger Time Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTimelineToTriggerTimeMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_timeline_trigger_mode
  label: "get Timeline Trigger Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getTimelineTriggerMode()"  # verbatim function signature from source
  params: []
- id: set_timeline_trigger_mode
  label: "set Timeline Trigger Mode"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTimelineTriggerMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_timeline_trigger_apply_time
  label: "get Timeline Trigger Apply Time"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getTimelineTriggerApplyTime()"  # verbatim function signature from source
  params: []
- id: set_timeline_trigger_apply_time
  label: "set Timeline Trigger Apply Time"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTimelineTriggerApplyTime(double time)"  # verbatim function signature from source
  params:
    - name: time
      type: number
      description: "time"
- id: set_timeline_trigger_apply_cue
  label: "set Timeline Trigger Apply Cue"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "setTimelineTriggerApplyCue(string goalCueLabel)"  # verbatim function signature from source
  params:
    - name: goalCueLabel
      type: string
      description: "goal cue label"
- id: is_active
  label: "is Active"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "isActive()"  # verbatim function signature from source
  params: []
- id: set_activity
  label: "set Activity"
  kind: action
  command: "setActivity(int idState)"  # verbatim function signature from source
  params:
    - name: idState
      type: integer
      description: "id state"
- id: get_countdown
  label: "get Countdown"
  returns: "double"  # verbatim return type from source
  kind: query
  command: "getCountdown()"  # verbatim function signature from source
  params: []
- id: get_countdown_hmsf
  label: "get Countdown HMSF"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCountdownHMSF()"  # verbatim function signature from source
  params: []
- id: set_command
  label: "set Command"
  kind: action
  command: "setCommand(string conveyorName, string commandData)"  # verbatim function signature from source
  params:
    - name: conveyorName
      type: string
      description: "conveyor name"
    - name: commandData
      type: string
      description: "command data"
- id: set_color
  label: "set Color"
  kind: action
  command: "setColor(int red, int green, int blue)"  # verbatim function signature from source
  params:
    - name: red
      type: integer
      description: "red"
    - name: green
      type: integer
      description: "green"
    - name: blue
      type: integer
      description: "blue"
- id: get_color
  label: "get Color"
  returns: "int[]"  # verbatim return type from source
  kind: query
  command: "getColor()"  # verbatim function signature from source
  params: []
- id: set_marker_positions
  label: "set Marker Positions"
  kind: action
  command: "setMarkerPositions(double[] positions, int[] markerIds)"  # verbatim function signature from source
  params:
    - name: positions
      type: string
      description: "positions"
    - name: markerIds
      type: string
      description: "marker ids"
- id: load_device_ui
  label: "load Device Ui"
  kind: action
  command: "loadDeviceUi(string devicePath)"  # verbatim function signature from source
  params:
    - name: devicePath
      type: string
      description: "device path"
- id: activate_previous_func
  label: "activate Previous Func"
  kind: action
  command: "activatePreviousFunc()"  # verbatim function signature from source
  params: []
- id: activate_next_func
  label: "activate Next Func"
  kind: action
  command: "activateNextFunc()"  # verbatim function signature from source
  params: []
- id: get_last_activated_func
  label: "get Last Activated Func"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getLastActivatedFunc()"  # verbatim function signature from source
  params: []
- id: device_activated
  label: "device Activated"
  kind: action
  command: "deviceActivated(string devicePath, boolean withSelection)"  # verbatim function signature from source
  params:
    - name: devicePath
      type: string
      description: "device path"
    - name: withSelection
      type: boolean
      description: "with selection"
- id: func_activated
  label: "func Activated"
  kind: action
  command: "funcActivated(string funcPath, boolean withSelection)"  # verbatim function signature from source
  params:
    - name: funcPath
      type: string
      description: "func path"
    - name: withSelection
      type: boolean
      description: "with selection"
- id: set_func_body_state
  label: "set Func Body State"
  kind: action
  command: "setFuncBodyState(string funcPath, string state)"  # verbatim function signature from source
  params:
    - name: funcPath
      type: string
      description: "func path"
    - name: state
      type: string
      description: "state"
- id: get_func_body_state
  label: "get Func Body State"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getFuncBodyState(string funcPath)"  # verbatim function signature from source
  params:
    - name: funcPath
      type: string
      description: "func path"
- id: set_tag
  label: "set Tag"
  kind: action
  command: "setTag(string tag, string text)"  # verbatim function signature from source
  params:
    - name: tag
      type: string
      description: "tag"
    - name: text
      type: string
      description: "text"
- id: set_editor_is_using_blocks
  label: "set Editor Is Using Blocks"
  kind: action
  command: "setEditorIsUsingBlocks(boolean useBlocks)"  # verbatim function signature from source
  params:
    - name: useBlocks
      type: boolean
      description: "use blocks"
- id: set_control_page
  label: "set Control Page"
  kind: action
  command: "setControlPage(string pageName)"  # verbatim function signature from source
  params:
    - name: pageName
      type: string
      description: "page name"
- id: get_control_pages
  label: "get Control Pages"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getControlPages()"  # verbatim function signature from source
  params: []
- id: get_current_control_page
  label: "get Current Control Page"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getCurrentControlPage()"  # verbatim function signature from source
  params: []
- id: select_preview_camera_by_index
  label: "select Preview Camera By Index"
  kind: action
  command: "selectPreviewCameraByIndex(int index)"  # verbatim function signature from source
  params:
    - name: index
      type: integer
      description: "index"
- id: select_preview_camera_by_name
  label: "select Preview Camera By Name"
  kind: action
  command: "selectPreviewCameraByName(string name)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
- id: get_preview_camera_names
  label: "get Preview Camera Names"
  returns: "string[]"  # verbatim return type from source
  kind: query
  command: "getPreviewCameraNames()"  # verbatim function signature from source
  params: []
- id: lock_ui
  label: "lock Ui"
  kind: action
  command: "lockUi(string password)"  # verbatim function signature from source
  params:
    - name: password
      type: string
      description: "password"
- id: unlock_ui
  label: "unlock Ui"
  kind: action
  command: "unlockUi(string password)"  # verbatim function signature from source
  params:
    - name: password
      type: string
      description: "password"
- id: toggle_lock_ui
  label: "toggle Lock Ui"
  kind: action
  command: "toggleLockUi(string password)"  # verbatim function signature from source
  params:
    - name: password
      type: string
      description: "password"
- id: get_combo_box_with_id
  label: "get Combo Box With Id"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "getComboBoxWithId(double id)"  # verbatim function signature from source
  params:
    - name: id
      type: number
      description: "id"
- id: set_app_mode
  label: "set App Mode"
  kind: action
  command: "setAppMode(int mode)"  # verbatim function signature from source
  params:
    - name: mode
      type: integer
      description: "mode"
- id: get_app_mode
  label: "get App Mode"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getAppMode()"  # verbatim function signature from source
  params: []
- id: get_display_testpattern
  label: "get Display Testpattern"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getDisplayTestpattern()"  # verbatim function signature from source
  params: []
- id: set_display_testpattern
  label: "set Display Testpattern"
  kind: action
  command: "setDisplayTestpattern(boolean display)"  # verbatim function signature from source
  params:
    - name: display
      type: boolean
      description: "display"
- id: toggle_output_freeze
  label: "toggle Output Freeze"
  kind: action
  command: "toggleOutputFreeze()"  # verbatim function signature from source
  params: []
- id: get_preview_camera_as_json_string
  label: "get Preview Camera As Json String"
  returns: "string"  # verbatim return type from source
  kind: query
  command: "getPreviewCameraAsJsonString()"  # verbatim function signature from source
  params: []
- id: set_preview_camera_as_json_string
  label: "set Preview Camera As Json String"
  kind: action
  command: "setPreviewCameraAsJsonString(string cameraFrustrumStateString)"  # verbatim function signature from source
  params:
    - name: cameraFrustrumStateString
      type: string
      description: "camera frustrum state string"
- id: set_disable_content_rendering
  label: "set Disable Content Rendering"
  kind: action
  command: "setDisableContentRendering(boolean state)"  # verbatim function signature from source
  params:
    - name: state
      type: boolean
      description: "state"
- id: get_is_content_rendering_disabled
  label: "get Is Content Rendering Disabled"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsContentRenderingDisabled()"  # verbatim function signature from source
  params: []
- id: set_disable_workspace_rendering
  label: "set Disable Workspace Rendering"
  kind: action
  command: "setDisableWorkspaceRendering(boolean state)"  # verbatim function signature from source
  params:
    - name: state
      type: boolean
      description: "state"
- id: get_is_workspace_rendering_disabled
  label: "get Is Workspace Rendering Disabled"
  returns: "boolean"  # verbatim return type from source
  kind: query
  command: "getIsWorkspaceRenderingDisabled()"  # verbatim function signature from source
  params: []
- id: clear
  label: "clear"
  kind: action
  command: "clear()"  # verbatim function signature from source
  params: []
- id: add_item
  label: "add Item"
  kind: action
  command: "addItem(string item, int id)"  # verbatim function signature from source
  params:
    - name: item
      type: string
      description: "item"
    - name: id
      type: integer
      description: "id"
- id: set_selected_id
  label: "set Selected Id"
  kind: action
  command: "setSelectedId(int id)"  # verbatim function signature from source
  params:
    - name: id
      type: integer
      description: "id"
- id: get_selected_id
  label: "get Selected Id"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getSelectedId()"  # verbatim function signature from source
  params: []
- id: set_registered
  label: "set Registered"
  kind: action
  command: "setRegistered(handle[] hdls, int expectedFrequency, int dampingMs, string[] usageHints)"  # verbatim function signature from source
  params:
    - name: hdls
      type: string
      description: "hdls"
    - name: expectedFrequency
      type: integer
      description: "expected frequency"
    - name: dampingMs
      type: integer
      description: "damping ms"
    - name: usageHints
      type: string
      description: "usage hints"
- id: reload_registered
  label: "reload Registered"
  kind: action
  command: "reloadRegistered()"  # verbatim function signature from source
  params: []
- id: register_projector
  label: "register Projector"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "registerProjector(string name, int expectedFrequency, int dampingMs)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: expectedFrequency
      type: integer
      description: "expected frequency"
    - name: dampingMs
      type: integer
      description: "damping ms"
- id: set_pos_rot_2
  label: "set Pos Rot"
  kind: action
  command: "setPosRot(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
- id: register_screen
  label: "register Screen"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "registerScreen(string name, int expectedFrequency, int dampingMs)"  # verbatim function signature from source
  params:
    - name: name
      type: string
      description: "name"
    - name: expectedFrequency
      type: integer
      description: "expected frequency"
    - name: dampingMs
      type: integer
      description: "damping ms"
- id: set_pos_rot_and_perspective_pos_2
  label: "set Pos Rot And Perspective Pos"
  kind: action
  command: "setPosRotAndPerspectivePos(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional perspXPos, optional perspYPos, optional perspZPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: perspXPos
      type: string
      description: "persp x pos (optional)"
    - name: perspYPos
      type: string
      description: "persp y pos (optional)"
    - name: perspZPos
      type: string
      description: "persp z pos (optional)"
- id: set_pos_rot_scale_2
  label: "set Pos Rot Scale"
  kind: action
  command: "setPosRotScale(optional xPos, optional yPos, optional zPos, optional xRot, optional yRot, optional zRot, optional xScale, optional yScale, optional zScale)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: xRot
      type: string
      description: "x rot (optional)"
    - name: yRot
      type: string
      description: "y rot (optional)"
    - name: zRot
      type: string
      description: "z rot (optional)"
    - name: xScale
      type: string
      description: "x scale (optional)"
    - name: yScale
      type: string
      description: "y scale (optional)"
    - name: zScale
      type: string
      description: "z scale (optional)"
- id: set_pos_with_perspective_follow_and_damping_2
  label: "set Pos With Perspective Follow And Damping"
  kind: action
  command: "setPosWithPerspectiveFollowAndDamping(optional xPos, optional yPos, optional zPos, optional perspectiveFollowOverride, optional dampingScreenMs, optional dampingPerspectiveMs)"  # verbatim function signature from source
  params:
    - name: xPos
      type: string
      description: "x pos (optional)"
    - name: yPos
      type: string
      description: "y pos (optional)"
    - name: zPos
      type: string
      description: "z pos (optional)"
    - name: perspectiveFollowOverride
      type: string
      description: "perspective follow override (optional)"
    - name: dampingScreenMs
      type: string
      description: "damping screen ms (optional)"
    - name: dampingPerspectiveMs
      type: string
      description: "damping perspective ms (optional)"
- id: enable_logging
  label: "enable Logging"
  kind: action
  command: "enableLogging(boolean enable)"  # verbatim function signature from source
  params:
    - name: enable
      type: boolean
      description: "enable"
- id: register_param
  label: "register Param"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "registerParam(string instancePath)"  # verbatim function signature from source
  params:
    - name: instancePath
      type: string
      description: "instance path"
- id: set_value_2
  label: "set Value"
  kind: action
  command: "setValue(double value)"  # verbatim function signature from source
  params:
    - name: value
      type: number
      description: "value"
- id: register_camera
  label: "register Camera"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "registerCamera(string cameraName, int expectedFrequency)"  # verbatim function signature from source
  params:
    - name: cameraName
      type: string
      description: "camera name"
    - name: expectedFrequency
      type: integer
      description: "expected frequency"
- id: set_position_3
  label: "set Position"
  kind: action
  command: "setPosition(double xPos, double yPos, double zPos)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
- id: set_rotation_3
  label: "set Rotation"
  kind: action
  command: "setRotation(double xRot, double yRot, double zRot)"  # verbatim function signature from source
  params:
    - name: xRot
      type: number
      description: "x rot"
    - name: yRot
      type: number
      description: "y rot"
    - name: zRot
      type: number
      description: "z rot"
- id: set_rotation_quat_2
  label: "set Rotation Quat"
  kind: action
  command: "setRotationQuat(double xQuat, double yQuat, double zQuat, double wQuat)"  # verbatim function signature from source
  params:
    - name: xQuat
      type: number
      description: "x quat"
    - name: yQuat
      type: number
      description: "y quat"
    - name: zQuat
      type: number
      description: "z quat"
    - name: wQuat
      type: number
      description: "w quat"
- id: set_transformation_3
  label: "set Transformation"
  kind: action
  command: "setTransformation(double xPos, double yPos, double zPos, double xRot, double yRot, double zRot, double fov, double aspectRatio)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xRot
      type: number
      description: "x rot"
    - name: yRot
      type: number
      description: "y rot"
    - name: zRot
      type: number
      description: "z rot"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
- id: set_transformation_quat_2
  label: "set Transformation Quat"
  kind: action
  command: "setTransformationQuat(double xPos, double yPos, double zPos, double xQuat, double yQuat, double zQuat, double wQuat, double fov, double aspectRatio)"  # verbatim function signature from source
  params:
    - name: xPos
      type: number
      description: "x pos"
    - name: yPos
      type: number
      description: "y pos"
    - name: zPos
      type: number
      description: "z pos"
    - name: xQuat
      type: number
      description: "x quat"
    - name: yQuat
      type: number
      description: "y quat"
    - name: zQuat
      type: number
      description: "z quat"
    - name: wQuat
      type: number
      description: "w quat"
    - name: fov
      type: number
      description: "fov"
    - name: aspectRatio
      type: number
      description: "aspect ratio"
- id: register_perspective
  label: "register Perspective"
  returns: "handle"  # verbatim return type from source
  kind: query
  command: "registerPerspective(string screenName, int expectedFrequency)"  # verbatim function signature from source
  params:
    - name: screenName
      type: string
      description: "screen name"
    - name: expectedFrequency
      type: integer
      description: "expected frequency"
- id: get_supported_unreal_plugin_version
  label: "get Supported Unreal Plugin Version"
  returns: "int"  # verbatim return type from source
  kind: query
  command: "getSupportedUnrealPluginVersion()"  # verbatim function signature from source
  params: []
```

## Feedbacks
```yaml
# All functions with a declared return type (see Actions, kind: query) return a value.
# Representative return shapes observed in source signatures:
# - string (e.g. getProjectName, getCurrentHMSFOfTimeline, getLiveSystemState)
# - boolean (e.g. getHasFunction, getBlackout, getIsLayerMuted)
# - int / double (e.g. getCurrentTimeOfTimeline, getFpsOfTimeline, getAudioMasterVolume)
# - handle (object references, e.g. getTimelineAtIndex, getResourceByName)
# UNRESOLVED: response framing/serialization on the wire not stated in source
```

## Variables
```yaml
# Settable parameters are modeled as parameterized Actions in this spec (setters with
# typed params, e.g. setOpacityOnTimeline, setAudioMasterVolume, setBrightness).
# UNRESOLVED: no separate variable model documented in source
```

## Events
```yaml
# Callback / notification handlers documented as function rows in the source.
# The device/API invokes these; payload framing not documented.
- id: monitoring_event
  label: Monitoring Event
  command: "monitoringEvent(string eventDescription)"
- id: live_system_state_change
  label: Live System State Change
  command: "liveSystemStateChange(string ip,string state)"
- id: remote_system_state_change
  label: Remote System State Change
  command: "remoteSystemStateChange(string ip,string state)"
- id: live_system_not_available
  label: Live System Not Available
  command: "liveSystemNotAvailable(int reason,handle system)"
- id: device_activated
  label: Device Activated
  command: "deviceActivated(string devicePath,boolean withSelection)"
- id: func_activated
  label: Func Activated
  command: "funcActivated(string funcPath,boolean withSelection)"
# UNRESOLVED: subscription payload and event message encoding not stated in source
# (subscribeMonitoringSubject / setMonitoringEventMode / requestCallback exist for subscription)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: shutdown/closeApp/shutdownSystem commands are destructive to a live show;
# no confirmation procedure is documented in source.
```

## Notes
- Source is the combined API command list for PIXERA version 26.1 R 1 ("This combines Control, TCP/UDP, OSC"), published at https://help.pixera.one/api-commands.
- Version-specific docs ship with each installer at `C:\Program Files\AV Stumpfl\Pixera\build_26-1_R_1\data\api\docs`.
- Object model: handles reference objects (timelines, layers, resources, screens, projectors, live systems); obtained via `getInst(string instancePath)` / `getHandleFromInstancePath(string instancePath)` / collection getters. "How to get and use API Handles" is a related guide not included in this source.
- 881 raw signature rows in source; 721 distinct signatures after deduplicating exact repeats of per-object common methods (e.g. `getName`, `getIp`, `getInstancePath`, `getInst` appear identically for many object types).
- Duplicated function names with different signatures are kept as separate actions with `_2`/`_3` id suffixes (e.g. `setPosition`, `setTransformation` variants on screens vs. registered projectors vs. cameras).
- UI can be locked/unlocked with a password via `lockUi(string password)` / `unlockUi(string password)` / `toggleLockUi(string password)`; this is application UI lock, not transport auth.
<!-- UNRESOLVED: TCP/UDP port numbers, OSC address space, message delimiter/serialization, and protocol version negotiation are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - help.pixera.one
source_urls:
  - https://help.pixera.one/api/pixera-api-documentation-5
  - https://help.pixera.one/api-commands
retrieved_at: 2026-08-30T08:07:58.053Z
last_checked_at: 2026-08-31T11:13:06.125Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-31T11:13:06.125Z
matched_actions: 721
action_count: 721
confidence: medium
summary: "All 721 distinct function signatures in the spec appear verbatim in the source; transport params (0xPX delimiter, configurable port, JSON-RPC 2.0) are stated in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response framing/serialization on the wire not stated in source"
- "no separate variable model documented in source"
- "subscription payload and event message encoding not stated in source"
- "no multi-step sequences documented explicitly in source"
- "source contains no safety warnings or interlock procedures."
- "TCP/UDP port numbers, OSC address space, message delimiter/serialization, and protocol version negotiation are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
