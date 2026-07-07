---
spec_id: admin/panasonic-ptz-auto-tracking
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic Media Production Suite Auto Tracking Plugin Control Spec"
manufacturer: Panasonic
model_family: "Media Production Suite Auto Tracking Plugin"
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - "Media Production Suite Auto Tracking Plugin"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
  - pro-av.panasonic.net
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_AutoTracking/WebApplication_en.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE150A/AW-UE150A_InterfaceSpecification_E.pdf
  - https://pro-av.panasonic.net/en/software/aw-sf100g/
retrieved_at: 2026-07-01T12:59:05.721Z
last_checked_at: 2026-07-07T11:50:00.759Z
generated_at: 2026-07-07T11:50:00.759Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no RS-232C/serial content present in this source despite the known-protocol hint; the source documents an HTTP Web API only. Auth procedure not described. Firmware/plugin version compatibility not stated."
  - "source contains no safety warnings, interlock procedures, or"
  - "known-protocol hint said RS-232C but source is HTTP Web API only; no serial content found. Firmware/plugin version compatibility not stated. Auth procedure not described (inferred none). target_position / target_position_area semantics undefined beyond \"always 0\"."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:50:00.759Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match verbatim source command names and parameters; transport (HTTP GET, port 1337, base URL) verified; complete one-to-one coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Panasonic Media Production Suite Auto Tracking Plugin Control Spec

## Summary
Web API (HTTP 1.1, GET method) to control the Auto Tracking plugin of Panasonic's Media Production Suite software. Provides camera auto-tracking ON/OFF, tracking start/stop, angle/face/preset control, and an Auto Crop Tracking sub-system (crop frames, output routing). Control is via HTTP requests to a CGI endpoint on the host running the Media Production Suite software; cameras must be registered as a single group.

<!-- UNRESOLVED: no RS-232C/serial content present in this source despite the known-protocol hint; the source documents an HTTP Web API only. Auth procedure not described. Firmware/plugin version compatibility not stated. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ip}:1337/cgi-bin/auto_tracking"  # {ip} = IP address of host running Media Production Suite
  port: 1337  # source: "Currently fixed at 1337"
  method: GET  # source: "All HTTP requests are GET method."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: CameraState and CropState return structured state values
```

## Actions
```yaml
# All 21 documented commands enumerated. Two are deprecated (TrackingControl,
# CameraControlView) but listed as distinct source rows, so included per
# coverage rule. Every command takes a mandatory `id` (camera ID, 1-based).
# Response to every command: "200 OK resp:ack" (success) or
# "200 OK resp:nack" (negative acknowledgment). State-get commands also return
# structured parameter values.

- id: camera_control
  label: Camera Control
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CameraControl&id={id}&control={control}"
  description: "Control Auto Tracking function ON/OFF of the target camera."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: control
      type: string
      description: "start: Auto Tracking ON, stop: Auto Tracking OFF"
      values: [start, stop]

- id: camera_setting
  label: Camera Setting
  kind: query
  command: "/cgi-bin/auto_tracking?cmd=CameraSetting&id={id}&face_recognition_id={face_recognition_id}"
  description: "Get or set the face recognition setting of the camera. Omit face_recognition_id to get current setting; include it to set. Response includes id and face_recognition_id. Set face_recognition_id to -1 to clear."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: face_recognition_id
      type: integer
      required: false
      description: "Face recognition data ID; -1 clears selection. Omit to query."

- id: tracking
  label: Tracking
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=Tracking&id={id}&process={process}"
  description: "Start or stop the tracking process of the target camera."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: process
      type: string
      description: "start: start tracking, stop: stop tracking"
      values: [start, stop]

- id: angle
  label: Angle
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=Angle&id={id}&mode={mode}"
  description: "Set the capture size of the tracking target during automatic tracking (Upper Body / Full Body / Full / Off)."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "upper: Upper Body, body: Full Body, full: Full, off: OFF"
      values: [upper, body, full, off]

- id: camera_state
  label: Camera State
  kind: query
  command: "/cgi-bin/auto_tracking?cmd=CameraState&id={id}"
  description: "Get the camera's automatic tracking processing state. Response: id, connection, detection, tracking, lost, angle, preset (10-item CSV), angle_type, target_position, target_position_area, pan_tilt_limit (4-item CSV), face_recognition, auto_face_search, auto_zoom."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."

- id: tracking_control
  label: Tracking Control (Deprecated)
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=TrackingControl&id={id}&enable={enable}"
  description: "DEPRECATED - use Tracking command instead. Same processing as Tracking. Controls start/stop of tracking."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: enable
      type: string
      description: "on: start tracking, off: stop tracking"
      values: [on, off]

- id: camera_control_view
  label: Camera Control View (Deprecated)
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CameraControlView&id={id}&control={control}"
  description: "DEPRECATED - use Camera Control command instead. Same processing as Camera Control. Controls Auto Tracking function ON/OFF."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: control
      type: string
      description: "start: Auto Tracking ON, stop: Auto Tracking OFF"
      values: [start, stop]

- id: target_face
  label: Target Face
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=TargetFace&id={id}&mode={mode}&face_id={face_id}&name={name}"
  description: "Select or clear the target face. Select by face_id or by name (URL-encoded, e.g. %22BOB%22). If multiple faces share a name, the smallest face_id wins."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "select: select the face, clear: clear the face selection"
      values: [select, clear]
    - name: face_id
      type: integer
      required: false
      description: "Face ID shown on the Select Face screen of the GUI."
    - name: name
      type: string
      required: false
      description: "Face name, enclosed in URL-encoded quotes (%22)."

- id: auto_face_search
  label: Auto Face Search
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=AutoFaceSearch&id={id}&mode={mode}"
  description: "Enable or disable the Auto Face Search function."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "0: disabled, 1: enabled"
      values: ["0", "1"]

- id: preset
  label: Preset
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=Preset&id={id}&mode={mode}&preset_num={preset_num}"
  description: "Set, clear, or recall a camera preset position (range 1-100)."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "set: register, clear: delete, recall: recall"
      values: [set, clear, recall]
    - name: preset_num
      type: integer
      description: "Preset number, range 1 to 100."

- id: crop_function
  label: Crop Function
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropFunction&id={id}&function={function}"
  description: "Control Auto Crop Tracking function ON/OFF of the target camera."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: function
      type: string
      description: "on: Auto Crop Tracking ON, off: Auto Crop Tracking OFF"
      values: [on, off]

- id: crop_start_stop
  label: Crop Start Stop
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropStartStop&id={id}&target={target}&process={process}"
  description: "Start or stop the tracking process of the specified Crop frame."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Target crop frame."
      values: [yellow, green, magenta]
    - name: process
      type: string
      description: "start: start tracking, stop: stop tracking"
      values: [start, stop]

- id: crop_angle
  label: Crop Angle
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropAngle&id={id}&target={target}&mode={mode}"
  description: "Set how the target person within the specified crop frame is captured (Upper Body / Full Body / Full / Off) during Auto Crop Tracking."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Target crop frame."
      values: [yellow, green, magenta]
    - name: mode
      type: string
      description: "upper: Upper Body, body: Full Body, full: Full, off: Off"
      values: [upper, body, full, off]

- id: crop_state
  label: Crop State
  kind: query
  command: "/cgi-bin/auto_tracking?cmd=CropState&id={id}"
  description: "Get Auto Crop Tracking information and camera crop settings. Response: id, function, start_stop (array Y/G/M), tracking_status (array Y/G/M), angle (array Y/G/M), target_face (array Y/G/M), auto_face_search (array Y/G/M), crop_adjust, crop_output, sdi_output_select, ndi_output_select, ip2_output_select."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."

- id: crop_target_face
  label: Crop Target Face
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropTargetFace&id={id}&target={target}&mode={mode}&face_id={face_id}&name={name}"
  description: "Configure face recognition settings for a specified crop frame. Select by face_id or by name (URL-encoded)."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Target crop frame."
      values: [yellow, green, magenta]
    - name: mode
      type: string
      description: "select: select the face, clear: clear the face selection"
      values: [select, clear]
    - name: face_id
      type: integer
      required: false
      description: "Face ID shown on the Select Face screen of the GUI."
    - name: name
      type: string
      required: false
      description: "Face name, enclosed in URL-encoded quotes (%22)."

- id: crop_auto_face_search
  label: Crop Auto Face Search
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropAutoFaceSearch&id={id}&target={target}&mode={mode}"
  description: "Enable or disable the Auto Face Search function for the specified crop frame."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Target crop frame."
      values: [yellow, green, magenta]
    - name: mode
      type: string
      description: "0: disabled, 1: enabled"
      values: ["0", "1"]

- id: crop_adjust
  label: Crop Adjust
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropAdjust&id={id}&target={target}"
  description: "Select which crop frame is the Crop Adjust frame (the frame for which positional adjustments can be made)."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Target crop frame to assign as Crop Adjust."
      values: [yellow, green, magenta]

- id: crop_output
  label: Crop Output
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=CropOutput&id={id}&target={target}"
  description: "Specify which crop frame is output to the output interfaces. To actually output crop video, also send SDI/NDI/IP2 Output Select commands."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: target
      type: string
      description: "Crop frame to assign to Crop Output."
      values: [yellow, green, magenta]

- id: sdi_output_select
  label: SDI Output Select
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=SDIOutputSelect&id={id}&mode={mode}"
  description: "Switch the camera's SDI output between Full image and Crop image. When Crop selected, outputs the frame set by Crop Output."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "0: Full image, 1: Crop image"
      values: ["0", "1"]

- id: ndi_output_select
  label: NDI Output Select
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=NDIOutputSelect&id={id}&mode={mode}"
  description: "Switch the camera's NDI output between Full image and Crop image. When Crop selected, outputs the frame set by Crop Output."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "0: Full image, 1: Crop image"
      values: ["0", "1"]

- id: ip2_output_select
  label: IP2 Output Select
  kind: action
  command: "/cgi-bin/auto_tracking?cmd=IP2OutputSelect&id={id}&mode={mode}"
  description: "Switch the camera's IP2 output between Full image and Crop image. When Crop selected, outputs the frame set by Crop Output."
  params:
    - name: id
      type: integer
      description: "Camera ID number (starting from 1)."
    - name: mode
      type: string
      description: "0: Full image, 1: Crop image"
      values: ["0", "1"]
```

## Feedbacks
```yaml
- id: generic_response
  type: enum
  description: "All commands return 'resp:ack' on success or 'resp:nack' on negative acknowledgment. nack is also returned for any error command or invalid camera ID."
  values: [ack, nack]

- id: camera_control_message
  type: string
  description: "On nack from CameraControl / CropFunction, the cause is returned as 'message:[cause]'."

- id: camera_setting_face_recognition_id
  type: integer
  description: "Returned by CameraSetting get: face_recognition_id of the registered face data. -1 means cleared; NULL means no data registered."

- id: camera_state_connection
  type: enum
  description: "CameraState field 'connection'."
  values: ["0: No communication / disruption", "1: Communication in progress"]

- id: camera_state_detection
  type: enum
  description: "CameraState field 'detection'."
  values: ["0: target not detected", "1: target detected"]

- id: camera_state_tracking
  type: enum
  description: "CameraState field 'tracking'."
  values: ["0: tracking stopped", "1: tracking executing"]

- id: camera_state_lost
  type: enum
  description: "CameraState field 'lost'."
  values: ["0: LOST not detected", "1: LOST detected"]

- id: camera_state_angle
  type: enum
  description: "CameraState field 'angle' (Angle command feasibility)."
  values: ["0: Angle request possible", "1: Angle request not possible"]

- id: camera_state_preset
  type: string
  description: "CameraState field 'preset'. 10-item CSV (Home, Preset1..Preset9); each 0=cannot recall, 1=can recall."

- id: camera_state_angle_type
  type: enum
  description: "CameraState field 'angle_type'."
  values: ["0: Upper Body Shot", "1: Full Body Shot", "2: Full Shot", "3: Control Off"]

- id: camera_state_pan_tilt_limit
  type: string
  description: "CameraState field 'pan_tilt_limit'. 4-item CSV (up, down, left, right); 0=Release, 1=Set."

- id: crop_state_function
  type: enum
  description: "CropState field 'function'."
  values: ["0: Auto Crop Tracking OFF", "1: Auto Crop Tracking ON"]

- id: crop_state_start_stop
  type: string
  description: "CropState field 'start_stop'. Array (Yellow, Green, Magenta); each 0=Stop, 1=Start."

- id: crop_state_tracking_status
  type: string
  description: "CropState field 'tracking_status'. Array of strings (Yellow, Green, Magenta): Stopped / Tracking / Lost."

- id: crop_state_angle
  type: string
  description: "CropState field 'angle'. Array of strings (Yellow, Green, Magenta): Upper / Body / Full / Off."

- id: crop_state_target_face
  type: string
  description: "CropState field 'target_face'. Array of integer face IDs (Yellow, Green, Magenta)."

- id: crop_state_auto_face_search
  type: string
  description: "CropState field 'auto_face_search'. Per-crop-frame setting (Yellow, Green, Magenta); 0=OFF, 1=ON."

- id: crop_state_crop_adjust
  type: enum
  description: "CropState field 'crop_adjust' (current Crop Adjust frame)."
  values: [yellow, green, magenta]

- id: crop_state_crop_output
  type: enum
  description: "CropState field 'crop_output' (frame routed to outputs)."
  values: [yellow, green, magenta]

- id: crop_state_sdi_output_select
  type: enum
  description: "CropState field 'sdi_output_select'."
  values: ["0: FULL image", "1: Crop image"]

- id: crop_state_ndi_output_select
  type: enum
  description: "CropState field 'ndi_output_select'."
  values: ["0: FULL image", "1: Crop image"]

- id: crop_state_ip2_output_select
  type: enum
  description: "CropState field 'ip2_output_select'."
  values: ["0: FULL image", "1: Crop image"]
```

## Variables
```yaml
# Settable parameters handled as discrete actions above (angle mode, face
# recognition id, auto face search on/off, preset, crop frame targets, output
# selects). No additional continuous/level variables documented.
```

## Events
```yaml
# No unsolicited notifications documented. The API is request/response only.
```

## Macros
```yaml
# No multi-step sequences explicitly documented. Note: source hints that
# outputting crop video requires Crop Output + one of SDI/NDI/IP2 Output Select
# (two-step), but this is implied sequencing, not an explicit macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Cameras must be registered as a **single group** in Media Production Suite; multi-group registration breaks camera specification via the Web API (Section 1.2).
- Port is **fixed at 1337** (Section 2.2, Table 2.2-1).
- All requests use **HTTP GET** (Section 2.1).
- Response format: `200 OK resp:ack` or `200 OK resp:nack[,param:value,...]` (Section 2.2).
- CameraState fields `target_position` (always `0,0`) and `target_position_area` (always `0,0,0,0`) are documented as **not supported**.
- Deprecated commands `TrackingControl` and `CameraControlView` are retained for compatibility; prefer `Tracking` and `CameraControl` (Sections 3.6, 3.7).
- Section 2.4 lists unsupported legacy commands (Camera Setting excl. face recognition, Target, Image, Set/Get/Edit Face Recognition, Clip Face Image, Auto Zoom) — intentionally not enumerated as actions.

<!-- UNRESOLVED: known-protocol hint said RS-232C but source is HTTP Web API only; no serial content found. Firmware/plugin version compatibility not stated. Auth procedure not described (inferred none). target_position / target_position_area semantics undefined beyond "always 0". -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
  - pro-av.panasonic.net
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_AutoTracking/WebApplication_en.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE150A/AW-UE150A_InterfaceSpecification_E.pdf
  - https://pro-av.panasonic.net/en/software/aw-sf100g/
retrieved_at: 2026-07-01T12:59:05.721Z
last_checked_at: 2026-07-07T11:50:00.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:50:00.759Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match verbatim source command names and parameters; transport (HTTP GET, port 1337, base URL) verified; complete one-to-one coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no RS-232C/serial content present in this source despite the known-protocol hint; the source documents an HTTP Web API only. Auth procedure not described. Firmware/plugin version compatibility not stated."
- "source contains no safety warnings, interlock procedures, or"
- "known-protocol hint said RS-232C but source is HTTP Web API only; no serial content found. Firmware/plugin version compatibility not stated. Auth procedure not described (inferred none). target_position / target_position_area semantics undefined beyond \"always 0\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
