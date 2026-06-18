---
spec_id: admin/canon-vb-m-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon VB-M Series Control Spec"
manufacturer: Canon
model_family: VB-M40
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - VB-M40
    - VB-M600VE
    - VB-M600D
    - VB-M700F
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.canon.com
  - canada-canon.my.site.com
source_urls:
  - https://downloads.canon.com/nw/nvs/misc-pages/nvs-webview-sdk-downloads/BIE-7087-000_WebView_ProgGuide_E.pdf
  - https://canada-canon.my.site.com/customersupport/article/0300764002
retrieved_at: 2026-06-14T20:34:20.992Z
last_checked_at: 2026-06-16T07:02:08.747Z
generated_at: 2026-06-16T07:02:08.747Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default HTTP port not explicitly stated (port 80 appears in examples but is not declared as a default)"
  - "firmware version compatibility range not stated"
  - "VB-M600/VB-M700 do not support pan/tilt/zoom or presets (fixed-lens models)"
  - "default TCP port not explicitly stated in source (port 80 shown in connection response example)"
  - "no multi-step macro sequences described in source"
  - "source does not describe safety interlocks, power sequencing,"
  - "default HTTP port not explicitly stated — port 80 appears in examples but is not declared as default"
  - "H.264 encoding parameters (image size, frame rate, bit rate) configured via separate Setting Protocol, not documented here"
  - "maximum concurrent connections not specified"
  - "control privilege allocation timeout defaults not specified"
  - "precise PTZ ranges for each model variant not fully specified (only example values shown)"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:02:08.747Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions are literally documented as WV-HTTP commands in the source, with matching parameter shapes and transport path /-wvhttp-01-/. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Canon VB-M Series Control Spec

## Summary

Canon VB-M series network cameras (VB-M40, VB-M600VE, VB-M600D, VB-M700F) provide video transmission and PTZ camera control via the WV-HTTP (WebView over HTTP) protocol, an HTTP/1.1-based API. Commands are issued as HTTP GET or POST requests with URI paths prefixed by `/-wvhttp-01-/`. The protocol supports session management, JPEG still image retrieval, MJPEG and H.264 video streaming, PTZ and exposure control, event monitoring, and external I/O control. Authentication uses HTTP Basic Authorization with four privilege tiers (Guest, Authorized User, Privileged Authorized User, Administrator).

<!-- UNRESOLVED: default HTTP port not explicitly stated (port 80 appears in examples but is not declared as a default) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: VB-M600/VB-M700 do not support pan/tilt/zoom or presets (fixed-lens models) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /-wvhttp-01-/
  # UNRESOLVED: default TCP port not explicitly stated in source (port 80 shown in connection response example)
auth:
  type: basic
  description: HTTP Authorization header required. Four privilege tiers - Guest, Authorized User (with/without Privileged Camera Control Authority), Administrator. Access levels determine which commands and parameters are available.
```

## Traits
```yaml
- queryable  # inferred: event command returns comprehensive device state
- levelable  # inferred: zoom, gain, iris, backlight, noise reduction, aperture correction are continuous values
```

## Actions
```yaml
- id: connect
  label: Create Session
  kind: action
  description: Creates a WV-HTTP session. Returns session ID, remaining time, priority, and video stream info.
  params:
    - name: priority
      type: integer
      description: "Priority level. 0 = general user, 5-50 = operator. Default 0."
    - name: v
      type: string
      description: "Video stream specifier. Format <T>[:<W>[x<H>[::<R>]]]. T is jpg or h264."
  response: "s:=<session_id>, connection:=<addr>:<port>, remain:=<seconds>, priority:=<level>, v:=<stream>"

- id: disconnect
  label: Delete Session
  kind: action
  description: Deletes the specified WV-HTTP session.
  params:
    - name: s
      type: string
      required: true
      description: Session identifier.
  response: "OK."

- id: obtain
  label: Obtain Camera Control
  kind: action
  description: Requests camera control privileges. Returns enabled/waiting/disabled state.
  params:
    - name: s
      type: string
      required: true
      description: Session identifier.
  response: "control:=<enabled|waiting|disabled>[:<time_ms>]"

- id: release
  label: Release Camera Control
  kind: action
  description: Releases camera control privileges or cancels waiting state.
  params:
    - name: s
      type: string
      required: true
      description: Session identifier.
  response: "control:=disabled"

- id: param
  label: Get/Set Session Parameters
  kind: action
  description: Retrieves or changes session priority level and video stream settings.
  params:
    - name: s
      type: string
      required: true
      description: Session identifier.
    - name: priority
      type: integer
      description: "New priority level. 0 = general user, 5-50 = operator."
    - name: v
      type: string
      description: "Video stream specifier. Format <T>[:<W>[x<H>[::<R>]]]."
  response: "priority:=<level>, v:=<stream>"

- id: image
  label: Get JPEG Still Image
  kind: action
  description: Requests a JPEG still image. Can be used sessionless or with a session. Supports pan/tilt/zoom control in sessionless mode.
  params:
    - name: s
      type: string
      description: Session identifier. If omitted, operates sessionless.
    - name: v
      type: string
      description: "Video stream specifier. Format <T>[:<W>[x<H>]]. jpg only in sessionless mode."
    - name: zoom
      type: string
      description: "Zoom position/operation. <pos> in 0.01 deg, d[]<diff>, v[]<ratio>, or stop/tele/wide."
    - name: pan
      type: string
      description: "Pan position. <pos> in 0.01 deg (right positive), d[]<diff>, v[]<diff>, or stop/left/right."
    - name: tilt
      type: string
      description: "Tilt position. <pos> in 0.01 deg (up positive), d[]<diff>, v[]<diff>, or stop/up/down."
    - name: cache
      type: string
      description: "HTTP cache. on/1 or off/0. Default off."
  response: JPEG image data (Content-Type: image/jpeg)

- id: video
  label: Stream Video
  kind: action
  description: Requests MJPEG or H.264 video stream transmission. Continues until session ends, duration expires, or client disconnects.
  params:
    - name: s
      type: string
      description: Session identifier. If omitted, operates sessionless.
    - name: v
      type: string
      description: "Video stream specifier. Format <T>[:<W>[x<H>[::<R>]]]. T is jpg or h264."
    - name: duration
      type: integer
      description: "Transmission time in seconds. 0 = unlimited. Default 0."
    - name: type
      type: string
      description: "Buffering policy. live (discard for newest) or rec (buffer to prevent loss). Default live."
  response: MJPEG multipart stream or MP4 fragment H.264 stream

- id: event
  label: Get Event/State Information
  kind: action
  description: Retrieves device state and event notifications. First call returns all info; subsequent calls return differentials. Can stream.
  params:
    - name: s
      type: string
      description: Session identifier. If omitted, returns all info immediately.
    - name: item
      type: string
      description: "Hierarchical item filter. e.g. c (camera), s (system). Prefix with ! to exclude."
    - name: type
      type: string
      description: "Set to stream for continuous differential notifications."
    - name: timeout
      type: integer
      description: "Response time limit in seconds."
  response: "timestamp=<ts>, realtime=<rt>, <item>:=<value> or <item>==<value>"

- id: panorama
  label: Get Panorama Image
  kind: action
  description: Retrieves panorama image data. Administrators only when sessionless. Supports conditional GET via If-Modified-Since.
  params:
    - name: s
      type: string
      description: Session identifier.
    - name: panorama
      type: integer
      description: "Panorama number for camera c. 0 is interpreted as 1."
  response: JPEG panorama image (Content-Type: image/jpeg)

- id: control
  label: Camera Control
  kind: action
  description: Controls PTZ, exposure, white balance, focus, day-night mode, image stabilization, noise reduction, external outputs, and more. Camera control privileges required for most parameters. Multiple parameters can be specified simultaneously.
  params:
    - name: s
      type: string
      description: Session identifier.
    - name: priority
      type: integer
      description: "Priority level for sessionless control. 0 = general, 5-50 = operator."
    - name: c
      type: integer
      description: Camera number to select.
    - name: exp
      type: string
      description: "Exposure mode. auto, flickerfree, tv, manual."
    - name: slowshutter
      type: integer
      description: Auto slow shutter (shutter speed reciprocal). Ignored in manual exposure.
    - name: shutter
      type: integer
      description: Shutter speed (reciprocal). Used in tv or manual mode.
    - name: backlight
      type: integer
      description: Backlight adjustment value.
    - name: meter
      type: string
      description: "Metering system. center, average, spot."
    - name: iris
      type: integer
      description: Aperture value. Low = open, high = closed. Manual mode only.
    - name: gain
      type: integer
      description: AGC gain value. Manual mode only.
    - name: wb
      type: string
      description: "White balance. auto, manual, one_shot, sodium, halogen, mercury, fluorescent_w, fluorescent_l, fluorescent_h."
    - name: rb_gain
      type: string
      description: "RB gain in RRRR-BBBB format. Manual WB only."
    - name: dn
      type: string
      description: "Day-night mode. on/1 or off/0. Privileged users only. Ignored in auto day-night mode."
    - name: dn_mode
      type: string
      description: "Day-night switching mode. manual or auto1. Privileged users only."
    - name: is
      type: string
      description: "Image stabilization. off, on1 (small), on2 (large). VB-M40 only. Privileged users only."
    - name: nr
      type: integer
      description: Noise reduction level.
    - name: ac
      type: integer
      description: Aperture correction value.
    - name: shade
      type: string
      description: "Smart shade control. on/1 or off/0."
    - name: shade_p
      type: integer
      description: Smart shade control strength parameter (0+).
    - name: focus
      type: string
      description: "Focus mode/operation. auto, manual, infinity, one_shot, stop, near, far."
    - name: focus_value
      type: integer
      description: Focus value. Manual mode only. Depends on zoom position.
    - name: zoom
      type: string
      description: "Zoom position/operation. <pos> in 0.01 deg, d[]<diff>, v[]<ratio>, stop, tele, wide."
    - name: zoom_pos_speed
      type: integer
      description: Speed for position-specified zoom.
    - name: zoom_dir_speed
      type: integer
      description: Speed for direction-specified zoom (tele/wide).
    - name: pan
      type: string
      description: "Pan position/operation. <pos> in 0.01 deg (right positive), d[]<diff>, v[]<diff>, stop, left, right."
    - name: pan_pos_speed
      type: integer
      description: Speed for position-specified pan.
    - name: pan_dir_speed
      type: integer
      description: Speed for direction-specified pan (left/right).
    - name: tilt
      type: string
      description: "Tilt position/operation. <pos> in 0.01 deg (up positive), d[]<diff>, v[]<diff>, stop, up, down."
    - name: tilt_pos_speed
      type: integer
      description: Speed for position-specified tilt.
    - name: tilt_dir_speed
      type: integer
      description: Speed for direction-specified tilt (up/down).
    - name: view
      type: string
      description: "Viewable range restriction. on/1 or off/0. Administrator only, requires session."
  response: "<item>:=<changing_value>, <item>==<unchanging_value>"
```

## Feedbacks
```yaml
- id: session_info
  type: object
  description: Session state returned by connect and event commands.
  fields:
    - name: s
      description: Session identifier
    - name: connection
      description: "Camera address and HTTP port"
    - name: remain
      description: "Remaining session time in seconds (0 = unlimited)"
    - name: priority
      description: Session priority level
    - name: v
      description: Active video stream

- id: control_privilege_state
  type: enum
  values: [enabled, waiting, disabled]
  description: "Camera control privilege state. May include time suffix in ms."

- id: camera_state
  type: object
  description: Camera state items retrievable via event command (Appendix A.3 / B.3).
  fields:
    - name: c.<c>.exp
      description: "Exposure mode: auto, flickerfree, tv, manual"
    - name: c.<c>.focus
      description: "Focus mode: auto, manual, infinity"
    - name: c.<c>.zoom
      description: "Zoom position in 0.01 degree units"
    - name: c.<c>.pan
      description: "Pan position in 0.01 degree units"
    - name: c.<c>.tilt
      description: "Tilt position in 0.01 degree units"
    - name: c.<c>.dn
      description: "Day-night mode: on/off"
    - name: c.<c>.wb
      description: "White balance mode"
    - name: c.<c>.status
      description: "Camera status: enabled/disabled"

- id: system_info
  type: object
  description: System-level information retrievable via event command.
  fields:
    - name: s.name
      description: Model name
    - name: s.firm
      description: Firmware version
    - name: s.ptcl
      description: Protocol version
    - name: s.stream
      description: Available stream list
    - name: s.start
      description: Startup time

- id: external_io_state
  type: object
  description: External input/output terminal states.
  fields:
    - name: i.<i>
      description: "External input <i> status. 0=off, 1=on"
    - name: o.<o>
      description: "External output <o> status. 0=off, 1=on"

- id: preset_info
  type: object
  description: Preset position data (VB-M40 only; VB-M600/700 have 0 presets).
  fields:
    - name: n.preset
      description: Number of presets
    - name: p.<p>.pan
      description: Preset pan value
    - name: p.<p>.tilt
      description: Preset tilt value
    - name: p.<p>.zoom
      description: Preset zoom value
    - name: p.<p>.focus
      description: Preset focus mode/value

- id: intelligent_function_status
  type: object
  description: Intelligent function detection status.
  fields:
    - name: n.active
      description: "Intelligent function status. 0=off, 1=on, -1=invalid"
    - name: r.<r>
      description: "Rule <r> detection status. 0=off, 1=on"

- id: livescope_status
  type: integer
  description: "Extended response header indicating command result. 0 = success."
  values: [0, 301, 302, 303, 401, 403, 404, 406, 407, 408, 501, 503, 507, 508]
```

## Variables
```yaml
- id: exposure_mode
  label: Exposure Mode
  type: enum
  values: [auto, flickerfree, tv, manual]
  set_via: control command, param c.<c>.exp

- id: white_balance_mode
  label: White Balance Mode
  type: enum
  values: [auto, manual, one_shot, sodium, halogen, mercury, fluorescent_w, fluorescent_l, fluorescent_h]
  set_via: control command, param c.<c>.wb

- id: day_night_mode
  label: Day-Night Mode
  type: enum
  values: ["on", "off"]
  set_via: control command, param c.<c>.dn

- id: day_night_switching_mode
  label: Day-Night Switching Mode
  type: enum
  values: [manual, auto1]
  set_via: control command, param c.<c>.dn_mode

- id: focus_mode
  label: Focus Mode
  type: enum
  values: [auto, manual, infinity]
  set_via: control command, param c.<c>.focus

- id: image_stabilization
  label: Image Stabilization
  type: enum
  values: [off, on1, on2]
  set_via: control command, param c.<c>.is
  notes: VB-M40 only

- id: metering_system
  label: Metering System
  type: enum
  values: [center, average, spot]
  set_via: control command, param c.<c>.meter
```

## Events
```yaml
- id: control_privilege_change
  description: "Notified via event command when camera control privileges change (obtained, released, or forfeited by another client)."
  payload: "control:=<enabled|waiting|disabled>[:<time_ms>]"

- id: session_param_change
  description: "Notified via event command when session parameters (priority, video stream) change."
  payload: "priority:=<level>, v:=<stream>"

- id: camera_state_change
  description: "Notified via event command when camera PTZ, exposure, focus, white balance, or other controlled parameters change."
  payload: "<item>:=<new_value>"

- id: external_io_change
  description: "Notified via event command when external input/output terminal states change."
  payload: "i.<i>:=<0|1>, o.<o>:=<0|1>"

- id: intelligent_detection
  description: "Notified via event command when intelligent function rules trigger."
  payload: "r.<r>:=<0|1>"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks, power sequencing,
# or damage-prevention procedures for PTZ mechanical limits
```

## Notes

- **Command ordering:** Commands must be sent sequentially — wait for a response before sending the next command. Pipelining is not supported despite HTTP/1.1 compliance.
- **Control privilege model:** PTZ and camera control requires obtaining control privileges via `obtain` command. Privileged sessions (priority 5–50) can preempt lower-priority sessions. The preempted session receives an event notification.
- **VB-M600/VB-M700 differences:** These models lack pan/tilt/zoom motors (fixed lens), image stabilization, and preset support. The `control` command parameter set differs (see Appendix B).
- **VB-M40 PTZ range (from event example):** Pan ±170.00°, Tilt −90.00° to +10.00° (ceiling/upright dependent). Zoom 2.80° to 55.40° horizontal angle of view.
- **Video formats:** MJPEG via multipart/x-mixed-replace, or H.264 via MP4 fragment format. H.264 parameters (image size, frame rate, bit rate) are configured via the Setting Protocol, not WV-HTTP.
- **HTTP upload:** The camera can push event-triggered JPEG images and notifications to an external HTTP server (Appendix F).
- **Sessionless operation:** `image` and `event` commands can be used without creating a session first.
- **Recommendation:** Individual control commands should be sent at intervals of 200 ms or more, especially for mechanical operations (pan, tilt, zoom, day-night switching).

<!-- UNRESOLVED: default HTTP port not explicitly stated — port 80 appears in examples but is not declared as default -->
<!-- UNRESOLVED: H.264 encoding parameters (image size, frame rate, bit rate) configured via separate Setting Protocol, not documented here -->
<!-- UNRESOLVED: maximum concurrent connections not specified -->
<!-- UNRESOLVED: control privilege allocation timeout defaults not specified -->
<!-- UNRESOLVED: precise PTZ ranges for each model variant not fully specified (only example values shown) -->

## Provenance

```yaml
source_domains:
  - downloads.canon.com
  - canada-canon.my.site.com
source_urls:
  - https://downloads.canon.com/nw/nvs/misc-pages/nvs-webview-sdk-downloads/BIE-7087-000_WebView_ProgGuide_E.pdf
  - https://canada-canon.my.site.com/customersupport/article/0300764002
retrieved_at: 2026-06-14T20:34:20.992Z
last_checked_at: 2026-06-16T07:02:08.747Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:02:08.747Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions are literally documented as WV-HTTP commands in the source, with matching parameter shapes and transport path /-wvhttp-01-/. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default HTTP port not explicitly stated (port 80 appears in examples but is not declared as a default)"
- "firmware version compatibility range not stated"
- "VB-M600/VB-M700 do not support pan/tilt/zoom or presets (fixed-lens models)"
- "default TCP port not explicitly stated in source (port 80 shown in connection response example)"
- "no multi-step macro sequences described in source"
- "source does not describe safety interlocks, power sequencing,"
- "default HTTP port not explicitly stated — port 80 appears in examples but is not declared as default"
- "H.264 encoding parameters (image size, frame rate, bit rate) configured via separate Setting Protocol, not documented here"
- "maximum concurrent connections not specified"
- "control privilege allocation timeout defaults not specified"
- "precise PTZ ranges for each model variant not fully specified (only example values shown)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
