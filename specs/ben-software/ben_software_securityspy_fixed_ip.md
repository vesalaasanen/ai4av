---
spec_id: admin/ben-software-securityspy-fixed
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ben Software SecuritySpy Control Spec"
manufacturer: "Ben Software"
model_family: "SecuritySpy 6"
aliases: []
compatible_with:
  manufacturers:
    - "Ben Software"
  models:
    - "SecuritySpy 6"
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bensoftware.com
source_urls:
  - https://www.bensoftware.com/securityspy/web-server-spec.html
  - https://bensoftware.com/securityspy/web-server-spec.html
retrieved_at: 2026-06-01T10:59:21.972Z
last_checked_at: 2026-05-20T06:13:43.198Z
generated_at: 2026-05-20T06:13:43.198Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T06:13:43.198Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched to source paths; every transport parameter verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Ben Software SecuritySpy Control Spec

## Summary
SecuritySpy is macOS video surveillance software by Ben Software. This spec covers the HTTP web server API for SecuritySpy 6, which provides live video/audio streaming (HTTP multipart, RTSP, HLS), PTZ control, scheduling, camera configuration, event streaming, captured footage management, and system information. The web server runs on a configurable HTTP port (default 8000).

<!-- UNRESOLVED: RTSP protocol details beyond basic endpoint — RTSP is mentioned as co-hosted on the HTTP port but full RTSP protocol mechanics are not documented -->
<!-- UNRESOLVED: HTTPS/RTSPS configuration details (default port 8001 mentioned but no HTTPS-specific endpoints documented) -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 8000  # default port stated in source; configurable via settings-web
  base_url: "http://{host}:8000/"
auth:
  type: basic  # source describes HTTP Basic auth via username:password in URL, Base64 auth parameter, and secure tokens
  # Auth is optional - source says "if you want to password-protect your SecuritySpy server"
```

## Traits
```yaml
- powerable    # cameras can be enabled/disabled via settings-cameras enabled param
- queryable    # systemInfo, cameramodes, getptzcapabilities return device state
- levelable    # brightness, contrast, volume controls in settings-cameras
- routable     # PTZ pan/tilt/zoom/preset commands present
```

## Actions
```yaml
- id: get_live_video
  label: Get Live Video Stream
  kind: action
  method: GET
  path: "video"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number as displayed in Camera Info window
    - name: width
      type: integer
      description: Image width in pixels
    - name: height
      type: integer
      description: Image height in pixels
    - name: quality
      type: integer
      description: "Compression quality 1-100"
    - name: fps
      type: integer
      description: FPS SecuritySpy will attempt to send
    - name: vcodec
      type: string
      description: "Video codec: jpeg, h264, h265, h26x"
  response: multipart/x-mixed-replace JPEG or H.264/H.265 video stream

- id: get_rtsp_stream
  label: Get RTSP Stream
  kind: action
  method: GET
  path: "stream"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
    - name: width
      type: integer
      description: Image width in pixels
    - name: height
      type: integer
      description: Image height in pixels
    - name: fps
      type: integer
      description: Frame rate
    - name: vcodec
      type: string
      description: "Video codec: h264 (default), h265, h26x"
    - name: acodec
      type: string
      description: "Audio codec: aac (default), ulaw, pcm, none"
  response: RTSP video/audio stream (TCP interleaved only)

- id: get_hls_stream
  label: Get HLS Adaptive Stream
  kind: action
  method: GET
  path: "hls"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
  response: H.264 HTTP Live Streaming adaptive video/audio

- id: get_hls_media_playlist
  label: Get HLS Fixed-Quality Stream
  kind: action
  method: GET
  path: "hls_mediaplaylist"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
    - name: quality
      type: integer
      description: "Stream quality: 0=low, 1=medium, 2=high"
  response: H.264 HLS fixed-quality video/audio

- id: get_still_image
  label: Get Still JPEG Image
  kind: action
  method: GET
  path: "image"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
    - name: width
      type: integer
      description: Image width in pixels
    - name: height
      type: integer
      description: Image height in pixels
    - name: quality
      type: integer
      description: "Compression quality 1-100"
  response: Single JPEG image

- id: get_multiplex_view
  label: Get Camera Grid Page
  kind: action
  method: GET
  path: "multiplex"
  params:
    - name: cameras
      type: string
      required: true
      description: Comma-separated list of camera numbers
    - name: cropMode
      type: integer
      description: "0=black bars, 1=crop, 2=stretch"
    - name: format
      type: integer
      description: "0=JPEG, 1=H.264/H.265"
    - name: fps
      type: integer
      description: Max frame rate per stream
    - name: border
      type: integer
      description: Black border width in pixels
    - name: camInfo
      type: integer
      description: "1 to include camera info bar"
    - name: hiRes
      type: integer
      description: "1 for double-resolution (retina)"
  response: HTML page with grid of live video feeds

- id: get_audio_stream
  label: Get Live Audio Stream
  kind: action
  method: GET
  path: "audio"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
  response: G.711 μ-law 8000kHz mono audio stream

- id: send_two_way_audio
  label: Send Two-Way Audio
  kind: action
  method: POST
  path: "audio"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
  body: G.711 μ-law 8000kHz mono audio stream forwarded to camera

- id: list_captured_footage
  label: List Captured Footage
  kind: action
  method: GET
  path: "download"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number(s), can specify multiple
    - name: ccFilesCheck
      type: integer
      description: "1 to include continuous-capture files"
    - name: mcFilesCheck
      type: integer
      description: "1 to include motion-capture files"
    - name: imageFilesCheck
      type: integer
      description: "1 to include still image files"
    - name: ageText
      type: integer
      description: Maximum file age in days
    - name: date1Text
      type: string
      description: Start date (format per General Settings)
    - name: date2Text
      type: string
      description: End date (format per General Settings)
    - name: format
      type: string
      description: "list, grid, or xml"
    - name: results
      type: integer
      description: Max files to return (default 200)
    - name: continuation
      type: string
      description: Continuation token from prior response (XML only)
  response: HTML or XML page with file list and download links

- id: download_file
  label: Download Captured File
  kind: action
  method: GET
  path: "getfile/{cameraNum}/{date}/{filename}"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
    - name: date
      type: string
      required: true
      description: Date in YYYY-MM-DD format
    - name: filename
      type: string
      required: true
      description: URL-encoded file name
  response: Requested file

- id: download_file_high_bandwidth
  label: Download File (High Bandwidth)
  kind: action
  method: GET
  path: "getfilehb/{cameraNum}/{date}/{filename}"
  params:
    - name: cameraNum
      type: integer
      required: true
    - name: date
      type: string
      required: true
      description: YYYY-MM-DD
    - name: filename
      type: string
      required: true
  response: Requested file

- id: download_file_low_bandwidth
  label: Download File (Low Bandwidth)
  kind: action
  method: GET
  path: "getfilelb/{cameraNum}/{date}/{filename}"
  params:
    - name: cameraNum
      type: integer
      required: true
    - name: date
      type: string
      required: true
      description: YYYY-MM-DD
    - name: filename
      type: string
      required: true
  response: Requested file

- id: ptz_command
  label: PTZ Command
  kind: action
  method: GET
  path: "ptz/command"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number
    - name: command
      type: integer
      required: true
      description: "PTZ command: 1=Left, 2=Right, 3=Up, 4=Down, 5=Zoom In, 6=Zoom Out, 7=Home, 8=Up-Left, 9=Up-Right, 10=Down-Left, 11=Down-Right, 12-19=Preset 1-8, 99=Stop, 112-119=Save Preset 1-8"
    - name: speed
      type: integer
      description: "Movement speed 1-100"
  response: '"OK" text if accepted'

- id: set_schedule
  label: Set Camera Schedule
  kind: action
  method: GET
  path: "setSchedule"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: "Camera number, or -1 for all cameras"
    - name: schedule
      type: integer
      required: true
      description: "0=Unarmed 24/7, 1=Armed 24/7, 2=Armed Sunrise-Sunset, 3=Armed Sunset-Sunrise, or custom schedule ID from systemInfo"
    - name: override
      type: integer
      required: true
      description: "0=No override, 1-14=various unarmed/armed duration overrides"
    - name: mode
      type: string
      required: true
      description: "C=Continuous capture, M=Motion capture, A=Actions"
  response: '"OK" text if accepted'

- id: set_schedule_preset
  label: Invoke Schedule Preset
  kind: action
  method: GET
  path: "setPreset"
  params:
    - name: id
      type: integer
      required: true
      description: Schedule preset ID from systemInfo
  response: '"OK" text if accepted'

- id: trigger_motion_detection
  label: Trigger Motion Detection
  kind: action
  method: GET
  path: "triggermd"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: "Camera number, or -1 for all cameras"

- id: set_settings_general
  label: Set General Settings
  kind: action
  method: POST
  path: "settings-general"
  params:
    - name: autoReopen
      type: integer
      description: "Reopen after crash (0/1)"
    - name: allowSleep
      type: integer
      description: "Allow computer sleep (0/1)"
    - name: errWindow
      type: integer
      description: "Display error window (0/1)"
    - name: dismissAlerts
      type: integer
      description: "Dismiss alerts after 1 min (0/1)"
    - name: sendDiagnostics
      type: integer
      description: "Send diagnostics (0/1)"
    - name: updateNotify
      type: integer
      description: "Show update notifications (0/1)"
    - name: suspendMd
      type: integer
      description: "Suspend motion detection when not needed (0/1)"
    - name: suspendDecoding
      type: integer
      description: "Suspend video decoding when not needed (0/1)"
    - name: fullVol
      type: integer
      description: "Set full volume before sounds (0/1)"
    - name: hissReduction
      type: integer
      description: "Hiss reduction (0/1)"
    - name: muteIncoming
      type: integer
      description: "Mute incoming audio during two-way (0/1)"
    - name: sysName
      type: string
      description: CCTV system name
    - name: settingsPassword
      type: string
      description: Password for settings access
    - name: quittingPassword
      type: string
      description: Password for quitting
    - name: dateFormat
      type: integer
      description: "Date display format (0-7)"
    - name: timeFormat
      type: integer
      description: "0=24hr, 1=12hr"
    - name: thumbCrop
      type: integer
      description: "Motion thumbnail crop (0-100)"
    - name: audioDevice
      type: string
      description: Two-way audio source name
    - name: audioDeviceVol
      type: integer
      description: "Audio source volume (1-250, 100=full)"

- id: set_settings_display
  label: Set Display Settings
  kind: action
  method: POST
  path: "settings-display"
  params:
    - name: camInfo
      type: integer
      description: "Show camera info in video windows (0/1)"
    - name: floatWindows
      type: integer
      description: "Float windows over other apps (0/1)"
    - name: motionBox
      type: integer
      description: "Draw red motion box (0/1)"
    - name: kioskMode
      type: integer
      description: "Full screen at launch (0/1)"
    - name: lowRate
      type: integer
      description: "Reduced live frame rate (0/1)"
    - name: autoClose
      type: integer
      description: "Auto-close windows after inactivity (0/1)"
    - name: autoCloseMins
      type: integer
      description: Minutes of inactivity to auto-close
    - name: cropMode
      type: integer
      description: "Live video crop mode (0=black bars, 1=crop, 2=stretch)"
    - name: displayQuality
      type: integer
      description: "Live video quality (0=auto, 1-4)"
    - name: divThickness
      type: integer
      description: Divider line thickness in pixels
    - name: replaySeconds
      type: integer
      description: Instant replay duration in seconds

- id: set_settings_storage
  label: Set Storage Settings
  kind: action
  method: POST
  path: "settings-storage"
  params:
    - name: path
      type: string
      description: Default capture destination path
    - name: removeByAge
      type: integer
      description: "Delete files by age (0/1)"
    - name: removeAgeSys
      type: integer
      description: Removal age on system volume in days
    - name: removeAgeNonSys
      type: integer
      description: Removal age on non-system volumes in days
    - name: removeBySpace
      type: integer
      description: "Delete files by free space (0/1)"
    - name: removeGbSys
      type: integer
      description: "System drive threshold GB (0=auto)"
    - name: removeGbNonSys
      type: integer
      description: "Non-system drive threshold GB (0=auto)"
    - name: diskWaitTime
      type: integer
      description: Volume mount timeout in seconds
    - name: usageWarningGb
      type: integer
      description: Usage warning threshold in GB

- id: set_settings_compression
  label: Set Compression Settings
  kind: action
  method: POST
  path: "settings-compression"
  params:
    - name: videoCodec
      type: integer
      description: "4=JPEG, 5=H.264, 6=H.265"
    - name: videoQuality
      type: integer
      description: "Video quality 1-100"
    - name: audioCodec
      type: integer
      description: "0=none, 2=μ-Law, 3=AAC"
    - name: audioQuality
      type: integer
      description: "Audio quality 1-100"
    - name: jpegQuality
      type: integer
      description: "JPEG still image quality 1-100"
    - name: webQuality
      type: integer
      description: "Web streaming quality 1-100"

- id: set_settings_email
  label: Set Email Settings
  kind: action
  method: POST
  path: "settings-email"
  params:
    - name: imageCount
      type: integer
      description: Images per email
    - name: imageFps
      type: integer
      description: Image capture rate
    - name: imageSize
      type: integer
      description: "0=full, 1=half, 2=quarter"
    - name: subject
      type: string
      description: Subject text
    - name: reportsEmail
      type: string
      description: Destination for errors/warnings
    - name: statsEmail
      type: string
      description: Destination for daily statistics
    - name: downtimeEmail
      type: string
      description: Destination for downtime warnings
    - name: sendingMethod
      type: integer
      description: "0=relay, 1=SMTP"
    - name: address
      type: string
      description: SMTP server address
    - name: fromName
      type: string
      description: SMTP From name
    - name: fromEmail
      type: string
      description: SMTP From email
    - name: username
      type: string
      description: SMTP username
    - name: password
      type: string
      description: SMTP password
    - name: encryption
      type: integer
      description: "0=none, 2=SSL"

- id: set_settings_web
  label: Set Web Server Settings
  kind: action
  method: POST
  path: "settings-web"
  params:
    - name: http
      type: integer
      description: "Enable HTTP server (0/1)"
    - name: https
      type: integer
      description: "Enable HTTPS server (0/1)"
    - name: portHttp
      type: integer
      description: HTTP port
    - name: portHttps
      type: integer
      description: HTTPS port
    - name: autoNatHttp
      type: integer
      description: "Auto port forwarding HTTP (0/1)"
    - name: autoNatHttps
      type: integer
      description: "Auto port forwarding HTTPS (0/1)"
    - name: ddnsName
      type: string
      description: Dynamic DNS name
    - name: insecure
      type: integer
      description: "Reduce HTTPS security for older clients (0/1)"
    - name: bonjour
      type: integer
      description: "Advertise via Bonjour (0/1)"
    - name: log
      type: integer
      description: "Write connection log file (0/1)"

- id: set_settings_cameras
  label: Set Camera Settings
  kind: action
  method: POST
  path: "settings-cameras"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number (required)
    - name: enabled
      type: integer
      description: "Enable camera (0/1)"
    - name: name
      type: string
      description: Camera name
    - name: address
      type: string
      description: "IP address or hostname"
    - name: portHttp
      type: integer
      description: Camera HTTP port
    - name: portRtsp
      type: integer
      description: Camera RTSP port
    - name: username
      type: string
      description: Camera username
    - name: password
      type: string
      description: Camera password
    - name: format
      type: integer
      description: "Video streaming format (0-15)"
    - name: inputNum
      type: integer
      description: Input/stream number
    - name: transformation
      type: integer
      description: "Transformation (0-5)"
    - name: brightness
      type: integer
      description: "Brightness (0-100)"
    - name: contrast
      type: integer
      description: "Contrast (0-100)"
    - name: overlay
      type: integer
      description: "Text overlay enabled (0/1)"
    - name: overlayText
      type: string
      description: Overlay text content
    - name: overlaySize
      type: integer
      description: Overlay font size
    - name: overlayPos
      type: integer
      description: "Overlay position (0-3)"
    - name: motionSensitivity
      type: integer
      description: "Motion detection sensitivity (1-100)"
    - name: mcMovie
      type: integer
      description: "Motion capture movie enabled (0/1)"
    - name: mcMovieFps
      type: integer
      description: Motion capture movie frame rate
    - name: mcMoviePre
      type: integer
      description: Motion capture pre-capture seconds
    - name: mcMoviePost
      type: integer
      description: Motion capture post-capture seconds
    - name: ccMovie
      type: integer
      description: "Continuous capture movie enabled (0/1)"
    - name: ccMovieFps
      type: integer
      description: Continuous capture movie frame rate
    - name: aSoundName
      type: string
      description: Action sound filename
    - name: aSoundVolume
      type: integer
      description: "Action sound volume (1-100)"
    - name: aEmail
      type: string
      description: Action email address(es)
    - name: aScriptName
      type: string
      description: Action script name

- id: list_sounds
  label: List Sounds
  kind: action
  method: GET
  path: "sounds"
  params:
    - name: format
      type: string
      description: "html or xml"
  response: HTML or XML list of installed sounds

- id: list_scripts
  label: List Scripts
  kind: action
  method: GET
  path: "scripts"
  params:
    - name: format
      type: string
      description: "html or xml"
  response: HTML or XML list of installed scripts
- id: get_ptz_controls_page
  label: Get PTZ Controls Page
  kind: action
  method: GET
  path: "ptz/controls"
  params:
    - name: cameraNum
      type: integer
      required: true
      description: Camera number as displayed in the Camera Info window
  response: HTML page with buttons to control the PTZ of the specified camera
```

## Feedbacks
```yaml
- id: camera_modes
  type: object
  description: Three-line plain text: Continuous Capture, Motion Capture, Actions armed status
  query:
    method: GET
    path: "cameramodes"
    params:
      - name: cameraNum
        type: integer
        required: true
  values:
    - key: continuous_capture
      type: enum
      values: [ARMED, DISARMED]
    - key: motion_capture
      type: enum
      values: [ARMED, DISARMED]
    - key: actions
      type: enum
      values: [ARMED, DISARMED]

- id: ptz_capabilities
  type: bitmask
  description: "Single number whose binary digits indicate PTZ capabilities (1=Pan/Tilt, 2=Home, 4=Zoom, 8=Presets, 16=Speed, 32=Continuous)"
  query:
    method: GET
    path: "getptzcapabilities"
    params:
      - name: cameraNum
        type: integer
        required: true

- id: system_info
  type: document
  description: "XML or JSON document with server info, camera list, names, connection status, modes, resolution, PTZ capabilities, device info"
  query:
    method: GET
    path: "systemInfo"
    params:
      - name: format
        type: string
        description: "xml or json"

- id: settings
  type: document
  description: "Current settings for a section in XML or JSON format"
  query:
    method: GET
    path: "settings-{section}"
    params:
      - name: section
        type: string
        description: "general, display, storage, compression, email, web, cameras"
      - name: cameraNum
        type: integer
        description: Required for cameras section
      - name: format
        type: string
        description: "xml or json"
```

## Variables
```yaml
# UNRESOLVED: individual settable parameters (brightness, contrast, etc.) are documented as
# POST params to settings-cameras rather than as discrete variables. See Actions section.
```

## Events
```yaml
- id: event_stream
  description: "Live event stream via long-lived HTTP connection. Format: [TIME] [EVENT_NUM] [CAM_NUM] [EVENT] [INFO]"
  subscribe:
    method: GET
    path: "eventStream"
    params:
      - name: version
        type: integer
        required: true
        description: "Protocol version (use 3)"
      - name: format
        type: string
        description: "Set to 'multipart' for multipart/mixed stream"
  event_types:
    - code: ARM_C
      description: Continuous Capture mode armed
    - code: DISARM_C
      description: Continuous Capture mode disarmed
    - code: ARM_M
      description: Motion Capture mode armed
    - code: DISARM_M
      description: Motion Capture mode disarmed
    - code: ARM_A
      description: Actions mode armed
    - code: DISARM_A
      description: Actions mode disarmed
    - code: ERROR
      description: Error for specified camera; INFO contains error codes and description
    - code: CONFIGCHANGE
      description: Configuration change for specified camera
    - code: OFFLINE
      description: Camera went offline
    - code: ONLINE
      description: Camera came online
    - code: MOTION
      description: Motion detected; INFO contains bounding box X Y W H
    - code: MOTION_END
      description: Motion stopped (only after MOTION event)
    - code: CLASSIFY
      description: AI classification results; INFO contains prediction percentages for humans, vehicles, animals
    - code: TRIGGER_M
      description: Motion Capture triggered; INFO contains trigger reason bitmask
    - code: TRIGGER_A
      description: Actions triggered; INFO contains trigger reason bitmask
    - code: FILE
      description: File created/recording finished; INFO contains full file path
    - code: NULL
      description: Heartbeat sent every 10 seconds
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- RTSP transport supports TCP interleaved only (not UDP).
- Event stream uses line feed (10) or carriage return (13) between lines depending on SecuritySpy version.
- The `auth` parameter on any request accepts Base64-encoded `username:password`. The URL Generator in SecuritySpy can generate URLs with secure authentication tokens.
- Settings endpoints accept GET with `format=xml` or `format=json` to retrieve current values, and POST to update.
- PTZ command 99 (Stop) only applies to cameras supporting continuous movement.
- Camera numbers are zero-based as displayed in the Camera Info window.
- Schedule override values 1-14 cover various armed/unarmed durations (1-6 hours).
- Trigger reason bitmask (17 bits): video motion, audio, AppleScript, camera event, web server event, cross-camera trigger, manual, human movement, vehicle movement, HomeKit, animal movement, human arrival/departure, vehicle arrival/departure, animal arrival/departure.

<!-- UNRESOLVED: HTTPS/RTSPS endpoint details (port 8001 mentioned but no dedicated HTTPS commands documented) -->
<!-- UNRESOLVED: maximum concurrent connection limits not stated -->
<!-- UNRESOLVED: error response format for failed commands not documented beyond PTZ "OK" -->
<!-- UNRESOLVED: rate limits or throttling behavior not stated -->

## Provenance

```yaml
source_domains:
  - bensoftware.com
source_urls:
  - https://www.bensoftware.com/securityspy/web-server-spec.html
  - https://bensoftware.com/securityspy/web-server-spec.html
retrieved_at: 2026-06-01T10:59:21.972Z
last_checked_at: 2026-05-20T06:13:43.198Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T06:13:43.198Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched to source paths; every transport parameter verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
