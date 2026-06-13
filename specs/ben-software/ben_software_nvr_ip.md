---
spec_id: admin/ben-software-securityspy
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ben Software SecuritySpy NVR Control Spec"
manufacturer: "Ben Software"
model_family: SecuritySpy
aliases: []
compatible_with:
  manufacturers:
    - "Ben Software"
  models:
    - SecuritySpy
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bensoftware.com
source_urls:
  - https://bensoftware.com/securityspy/web-server-spec.html
  - https://bensoftware.com/securityspy/helpapplescript.html
  - https://bensoftware.com/securityspy/manual/
  - https://bensoftware.com/securityspy/help.php
retrieved_at: 2026-06-12T05:25:54.181Z
last_checked_at: 2026-06-12T19:12:21.249Z
generated_at: 2026-06-12T19:12:21.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "base path not specified beyond resource names"
  - "detailed auth flow not fully specified; source warns URL-embedded creds insecure"
  - "no explicit power on/off commands in source"
  - "inferred from PTZ direction commands"
  - "source documents per-camera static config (settings-cameras) but no"
  - "source describes no multi-step macro sequences"
  - "source contains no explicit safety warnings, interlocks, or"
  - "settingsGeneral/settings-display/etc. POST request/response body schema beyond key=value form not documented. Trigger reason code binary layout in source is 1-indexed (1=Video motion, 2=Audio) not 0-indexed; map above uses 0-indexed bits per the source's bit-0=LSB rule."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:12:21.249Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched source endpoints with exact parameter signatures; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Ben Software SecuritySpy NVR Control Spec

## Summary
SecuritySpy is a macOS-based NVR/video surveillance server from Ben Software. This spec covers the built-in web server's HTTP API used to control PTZ cameras, arm/disarm capture modes, trigger motion detection, manage schedules, read system info, and subscribe to a live event stream. HTTP and RTSP share the same default port (8000 for HTTP, 8001 for HTTPS).

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
protocols:
  - http
  - tcp  # RTSP shares the HTTP port per source
addressing:
  port: 8000
  base_url: "http://{address}/"  # UNRESOLVED: base path not specified beyond resource names
auth:
  type: basic  # inferred: URL-embedded username:password plus auth=base64(username:password) parameter
  # UNRESOLVED: detailed auth flow not fully specified; source warns URL-embedded creds insecure
```

## Traits
```yaml
- powerable  # UNRESOLVED: no explicit power on/off commands in source
- routable  # UNRESOLVED: inferred from PTZ direction commands
- queryable  # inferred from systemInfo, cameramodes, getptzcapabilities queries
```

## Actions
```yaml
- id: ptz_command
  label: PTZ Command
  kind: action
  command: "ptz/command?cameraNum={cameraNum}&command={command}[&speed={speed}]"
  params:
    - name: cameraNum
      type: integer
      description: Camera number as displayed in Camera Info window
    - name: command
      type: integer
      description: "PTZ command number (1=Left, 2=Right, 3=Up, 4=Down, 5=Zoom in, 6=Zoom out, 7=Home, 8=Up-left, 9=Up-right, 10=Down-left, 11=Down-right, 12-19=Preset 1-8, 99=Stop, 112-119=Save Preset 1-8)"
    - name: speed
      type: integer
      description: Movement speed (1-100); optional

- id: ptz_capabilities
  label: Get PTZ Capabilities
  kind: query
  command: "getptzcapabilities?cameraNum={cameraNum}"
  params:
    - name: cameraNum
      type: integer
      description: Camera number

- id: set_schedule
  label: Set Schedule / Override
  kind: action
  command: "setSchedule?cameraNum={cameraNum}&schedule={schedule}&override={override}&mode={mode}"
  params:
    - name: cameraNum
      type: integer
      description: Camera number, or -1 for all cameras
    - name: schedule
      type: integer
      description: "0=Unarmed 24/7, 1=Armed 24/7, 2=Armed Sunrise-Sunset, 3=Armed Sunset-Sunrise, or custom schedule ID from systemInfo"
    - name: override
      type: integer
      description: "0=None, 1=Unarmed until next event, 2=Armed until next event, 3=Unarmed 1h, 4=Armed 1h, 5=Unarmed 2h, 6=Armed 2h, 7=Unarmed 3h, 8=Armed 3h, 9=Unarmed 4h, 10=Armed 4h, 11=Unarmed 5h, 12=Armed 5h, 13=Unarmed 6h, 14=Armed 6h"
    - name: mode
      type: string
      description: "Mode letters, e.g. C, M, A or any combo: C=Continuous, M=Motion, A=Actions"

- id: invoke_schedule_preset
  label: Invoke Schedule Preset
  kind: action
  command: "setPreset?id={id}"
  params:
    - name: id
      type: integer
      description: Schedule preset ID from systemInfo

- id: get_camera_modes
  label: Get Camera Modes
  kind: query
  command: "cameramodes?cameraNum={cameraNum}"
  params:
    - name: cameraNum
      type: integer
      description: Camera number

- id: settings_general
  label: General Settings (POST)
  kind: action
  command: "POST settings-general"
  params:
    - name: autoReopen
      type: integer
      description: Reopen after crash (0/1)
    - name: allowSleep
      type: integer
      description: Allow computer sleep (0/1)
    - name: errWindow
      type: integer
      description: Display error window (0/1)
    - name: dismissAlerts
      type: integer
      description: Dismiss alerts after 1 minute (0/1)
    - name: sendDiagnostics
      type: integer
      description: Send diagnostics to developer (0/1)
    - name: updateNotify
      type: integer
      description: Show update notifications (0/1)
    - name: suspendMd
      type: integer
      description: Suspend motion detection when not needed (0/1)
    - name: suspendDecoding
      type: integer
      description: Suspend video decoding when not needed (0/1)
    - name: fullVol
      type: integer
      description: Set computer to full volume before playing sounds (0/1)
    - name: hissReduction
      type: integer
      description: Hiss reduction (0/1)
    - name: muteIncoming
      type: integer
      description: Mute incoming audio when sending audio to camera (0/1)
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
      description: Date display format (0-7)
    - name: timeFormat
      type: integer
      description: Time display format (0=24hr, 1=12hr)
    - name: thumbCrop
      type: integer
      description: Motion thumbnail crop (0-100, 100=widest)
    - name: audioDevice
      type: string
      description: Two-way audio source name
    - name: audioDeviceVol
      type: integer
      description: Two-way audio source volume (1-250, 100=full)

- id: settings_display
  label: Display Settings (POST)
  kind: action
  command: "POST settings-display"
  params:
    - name: camInfo
      type: integer
      description: Show camera info in video windows (0/1)
    - name: floatWindows
      type: integer
      description: Float video windows over other apps (0/1)
    - name: motionBox
      type: integer
      description: Red box around moving objects (0/1)
    - name: kioskMode
      type: integer
      description: Go full screen at launch and after inactivity (0/1)
    - name: lowRate
      type: integer
      description: Reduced live video frame rate (0/1)
    - name: autoClose
      type: integer
      description: Auto-close video windows after inactivity (0/1)
    - name: autoCloseMins
      type: integer
      description: Minutes of inactivity before auto-close
    - name: cropMode
      type: integer
      description: "Live video crop mode (0=black bars, 1=crop, 2=stretch)"
    - name: displayQuality
      type: integer
      description: "Live video display quality (0=auto, 1-4)"
    - name: divThickness
      type: integer
      description: Divider line thickness in pixels
    - name: replaySeconds
      type: integer
      description: Instant video replay duration in seconds

- id: settings_storage
  label: Storage Settings (POST)
  kind: action
  command: "POST settings-storage"
  params:
    - name: path
      type: string
      description: Default capture destination
    - name: removeByAge
      type: integer
      description: Delete files older than specified age (0/1)
    - name: removeAgeSys
      type: integer
      description: Removal age on system volume in days
    - name: removeAgeNonSys
      type: integer
      description: Removal age on non-system volumes in days
    - name: removeBySpace
      type: integer
      description: Delete old files below free space threshold (0/1)
    - name: removeGbSys
      type: integer
      description: Removal threshold on system drive in GB (0=auto)
    - name: removeGbNonSys
      type: integer
      description: Removal threshold on non-system drives in GB (0=auto)
    - name: diskWaitTime
      type: integer
      description: Volume mount timeout in seconds
    - name: usageWarningGb
      type: integer
      description: Usage warning threshold in GB

- id: settings_compression
  label: Compression Settings (POST)
  kind: action
  command: "POST settings-compression"
  params:
    - name: videoCodec
      type: integer
      description: "Video codec (4=JPEG, 5=H.264, 6=H.265)"
    - name: videoQuality
      type: integer
      description: Video quality (1-100)
    - name: audioCodec
      type: integer
      description: "Audio codec (0=none, 2=μ-Law, 3=AAC)"
    - name: audioQuality
      type: integer
      description: Audio quality (1-100)
    - name: jpegQuality
      type: integer
      description: JPEG quality (1-100)
    - name: webQuality
      type: integer
      description: Web streaming quality (1-100)

- id: settings_email
  label: Email Settings (POST)
  kind: action
  command: "POST settings-email"
  params:
    - name: imageCount
      type: integer
      description: Number of images per email
    - name: imageFps
      type: integer
      description: Image capture rate
    - name: imageSize
      type: integer
      description: "Image size (0=full, 1=half, 2=quarter)"
    - name: subject
      type: string
      description: Subject text
    - name: reportsEmail
      type: string
      description: Errors/warnings destination
    - name: statsEmail
      type: string
      description: Daily statistics destination
    - name: downtimeEmail
      type: string
      description: Downtime warnings destination
    - name: sendingMethod
      type: integer
      description: "Sending method (0=relay, 1=SMTP)"
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
      description: "SMTP encryption (0=none, 2=SSL)"

- id: settings_web
  label: Web Settings (POST)
  kind: action
  command: "POST settings-web"
  params:
    - name: http
      type: integer
      description: Enable HTTP server (0/1)
    - name: https
      type: integer
      description: Enable HTTPS server (0/1)
    - name: portHttp
      type: integer
      description: HTTP port
    - name: portHttps
      type: integer
      description: HTTPS port
    - name: autoNatHttp
      type: integer
      description: Automatic port forwarding for HTTP (0/1)
    - name: autoNatHttps
      type: integer
      description: Automatic port forwarding for HTTPS (0/1)
    - name: ddnsName
      type: string
      description: Dynamic DNS name
    - name: insecure
      type: integer
      description: Reduce HTTPS security for older clients (0/1)
    - name: bonjour
      type: integer
      description: Advertise via Bonjour (0/1)
    - name: log
      type: integer
      description: Write log of all connections (0/1)

- id: settings_cameras
  label: Camera Settings (POST)
  kind: action
  command: "POST settings-cameras"
  params:
    - name: cameraNum
      type: integer
      description: REQUIRED. Camera number
    - name: address
      type: string
      description: IP or hostname
    - name: portHttp
      type: integer
      description: HTTP port
    - name: portRtsp
      type: integer
      description: RTSP port
    - name: username
      type: string
      description: Camera username
    - name: password
      type: string
      description: Camera password
    - name: format
      type: integer
      description: Video streaming format (0-15)
    - name: inputNum
      type: integer
      description: Input/stream number
    - name: request
      type: string
      description: Manual profile path
    - name: recompressVideo
      type: integer
      description: Recompress video (0/1)
    - name: recompressAudio
      type: integer
      description: Recompress audio (0/1)
    - name: enabled
      type: integer
      description: Enable camera (0/1)
    - name: name
      type: string
      description: Camera name
    - name: transformation
      type: integer
      description: Transformation (0-5)
    - name: brightness
      type: integer
      description: Brightness (0-100)
    - name: contrast
      type: integer
      description: Contrast (0-100)
    - name: overlay
      type: integer
      description: Text overlay enabled (0/1)
    - name: overlayText
      type: string
      description: Text overlay text
    - name: overlaySize
      type: integer
      description: Text overlay font size
    - name: overlayPos
      type: integer
      description: Text overlay position (0-3)
    - name: audioDevice
      type: string
      description: "Device name (n=this network device, x=none)"
    - name: path
      type: string
      description: Camera-specific capture destination
    - name: motionSensitivity
      type: integer
      description: Motion detection sensitivity (1-100)
    - name: mcTriggerMotion
      type: integer
      description: Motion-capture motion trigger (0/1)
    - name: mcTriggerMotionA
      type: integer
      description: Motion-capture animal motion trigger (0/1)
    - name: mcTriggerMotionH
      type: integer
      description: Motion-capture human motion trigger (0/1)
    - name: mcTriggerMotionV
      type: integer
      description: Motion-capture vehicle motion trigger (0/1)
    - name: mcTriggerArrivesA
      type: integer
      description: Motion-capture animal arrival trigger (0/1)
    - name: mcTriggerArrivesH
      type: integer
      description: Motion-capture human arrival trigger (0/1)
    - name: mcTriggerArrivesV
      type: integer
      description: Motion-capture vehicle arrival trigger (0/1)
    - name: mcTriggerDepartsA
      type: integer
      description: Motion-capture animal departure trigger (0/1)
    - name: mcTriggerDepartsH
      type: integer
      description: Motion-capture human departure trigger (0/1)
    - name: mcTriggerDepartsV
      type: integer
      description: Motion-capture vehicle departure trigger (0/1)
    - name: mcTriggerAudio
      type: integer
      description: Motion-capture audio trigger (0/1)
    - name: aTriggerMotion
      type: integer
      description: Actions motion trigger (0/1)
    - name: aTriggerMotionA
      type: integer
      description: Actions animal motion trigger (0/1)
    - name: aTriggerMotionH
      type: integer
      description: Actions human motion trigger (0/1)
    - name: aTriggerMotionV
      type: integer
      description: Actions vehicle motion trigger (0/1)
    - name: aTriggerArrivesA
      type: integer
      description: Actions animal arrival trigger (0/1)
    - name: aTriggerArrivesH
      type: integer
      description: Actions human arrival trigger (0/1)
    - name: aTriggerArrivesV
      type: integer
      description: Actions vehicle arrival trigger (0/1)
    - name: aTriggerDepartsA
      type: integer
      description: Actions animal departure trigger (0/1)
    - name: aTriggerDepartsH
      type: integer
      description: Actions human departure trigger (0/1)
    - name: aTriggerDepartsV
      type: integer
      description: Actions vehicle departure trigger (0/1)
    - name: aTriggerAudio
      type: integer
      description: Actions audio trigger (0/1)
    - name: ccMovie
      type: integer
      description: Continuous-capture movie (0/1)
    - name: ccMovieFps
      type: integer
      description: Continuous-capture movie fps
    - name: ccMoviePlaybackFps
      type: integer
      description: Continuous-capture movie playback fps
    - name: ccFreq
      type: integer
      description: "Continuous-capture new file frequency (0-2)"
    - name: ccImage
      type: integer
      description: Continuous-capture images (0/1)
    - name: ccImageInterval
      type: integer
      description: Continuous-capture images interval seconds
    - name: webcamName
      type: string
      description: Webcam image filename
    - name: webcamFreq
      type: integer
      description: Webcam image frequency seconds
    - name: ccRemoveAge
      type: integer
      description: Continuous-capture auto-delete days
    - name: mcMovie
      type: integer
      description: Motion-capture movie (0/1)
    - name: mcMovieFps
      type: integer
      description: Motion-capture movie fps
    - name: mcMoviePre
      type: integer
      description: Motion-capture pre-capture seconds
    - name: mcMoviePost
      type: integer
      description: Motion-capture post-capture seconds
    - name: mcImage
      type: integer
      description: Motion-capture images (0/1)
    - name: mcImageInterval
      type: integer
      description: Motion-capture images interval seconds
    - name: mcImagePost
      type: integer
      description: Motion-capture post-capture seconds
    - name: mcRemoveAge
      type: integer
      description: Motion-capture auto-delete days
    - name: aSoundName
      type: string
      description: Sound filename
    - name: aSoundDuration
      type: integer
      description: Sound duration seconds
    - name: aSoundVolume
      type: integer
      description: Sound volume (1-100)
    - name: aScriptName
      type: string
      description: Script name
    - name: aEmail
      type: string
      description: Email address(es)
    - name: aShellCommand
      type: string
      description: Shell command
    - name: aComeFront
      type: integer
      description: Come to front (0/1)
    - name: aRedBox
      type: integer
      description: Red box highlight (0/1)
    - name: aNotification
      type: integer
      description: macOS notification (0/1)
    - name: aDelay
      type: integer
      description: Delay before seconds
    - name: aReset
      type: integer
      description: Reset time seconds

- id: trigger_motion_detection
  label: Trigger Motion Detection
  kind: action
  command: "triggermd?cameraNum={cameraNum}"
  params:
    - name: cameraNum
      type: integer
      description: Camera number, or -1 for all

- id: get_system_info
  label: Get System Information
  kind: query
  command: "systemInfo?format={format}"
  params:
    - name: format
      type: string
      description: "Optional: xml or json. Omit for legacy XML."

- id: subscribe_event_stream
  label: Subscribe Event Stream
  kind: action
  command: "eventStream?version=3[&format=multipart]"
  params:
    - name: format
      type: string
      description: "Optional: multipart. Otherwise plain text."
```

## Feedbacks
```yaml
- id: ptz_command_ack
  type: enum
  values: ["OK"]
  description: Returned by ptz/command on success

- id: set_schedule_ack
  type: enum
  values: ["OK"]
  description: Returned by setSchedule on success

- id: set_preset_ack
  type: enum
  values: ["OK"]
  description: Returned by setPreset on success

- id: camera_modes
  type: object
  description: "Three lines of plain text, one per mode: C:ARMED/DISARMED, M:ARMED/DISARMED, A:ARMED/DISARMED. Lines may be separated by LF (10) or CR (13)."

- id: ptz_capabilities_bitmask
  type: integer
  description: "Single number from getptzcapabilities. Convert to binary; bits 1=Pan/Tilt, 2=Home, 4=Zoom, 8=Presets, 16=Speed, 32=Continuous movement."

- id: trigger_reason_code
  type: integer
  description: "Bitfield from TRIGGER_M/TRIGGER_A: bit0=motion, bit1=audio, bit2=AppleScript, bit3=camera event, bit4=web server event, bit5=other-camera trigger, bit6=manual, bit7=human movement, bit8=vehicle movement, bit9=HomeKit, bit10=animal movement, bit11=human arrival, bit12=human departure, bit13=vehicle arrival, bit14=vehicle departure, bit15=animal arrival, bit16=animal departure"
```

## Variables
```yaml
# UNRESOLVED: source documents per-camera static config (settings-cameras) but no
# run-time variable read/write endpoint distinct from settings-cameras POST.
```

## Events
```yaml
- id: arm_c
  type: notification
  description: Camera's Continuous Capture mode armed
- id: disarm_c
  type: notification
  description: Camera's Continuous Capture mode disarmed
- id: arm_m
  type: notification
  description: Camera's Motion Capture mode armed
- id: disarm_m
  type: notification
  description: Camera's Motion Capture mode disarmed
- id: arm_a
  type: notification
  description: Camera's Actions mode armed
- id: disarm_a
  type: notification
  description: Camera's Actions mode disarmed
- id: error
  type: notification
  description: Error for specified camera; INFO=error codes
- id: configchange
  type: notification
  description: Configuration change for specified camera
- id: offline
  type: notification
  description: Specified camera went offline
- id: online
  type: notification
  description: Specified camera came online
- id: motion
  type: notification
  description: "Motion detected; INFO=X Y W H bounding box"
- id: motion_end
  type: notification
  description: Motion stopped (issued after MOTION)
- id: classify
  type: notification
  description: "AI classification; INFO=prediction percentages (HUMAN/VEHICLE/ANIMAL)"
- id: trigger_m
  type: notification
  description: "Motion Capture triggered; INFO=trigger reason code"
- id: trigger_a
  type: notification
  description: "Actions triggered; INFO=trigger reason code"
- id: file
  type: notification
  description: "Recording/file complete; INFO=full path to file"
- id: null
  type: notification
  description: Heartbeat sent every 10 seconds
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements
```

## Notes
- HTTP and RTSP share the same default port: 8000 for HTTP/RTSP, 8001 for HTTPS/RTSPS.
- Settings POSTs accept only the parameters the caller wishes to change; unspecified keys are left untouched.
- Authentication can be passed via URL-embedded `username:password@` or via the `auth=base64(user:pass)` query parameter. Source warns URL-embedded credentials are insecure and recommends the SecuritySpy URL Generator for secure tokens.
- `setSchedule` returns plain "OK" on success; no per-field error format documented.
- Continuous-movement PTZ cameras (bit 6 of ptz_capabilities) require command 99 (Stop) after every move/zoom command 1-11.
- Event stream uses a 14-character timestamp `YYYYMMDDHHMMSS`. New event types may be added; clients should ignore unknown types.
<!-- UNRESOLVED: settingsGeneral/settings-display/etc. POST request/response body schema beyond key=value form not documented. Trigger reason code binary layout in source is 1-indexed (1=Video motion, 2=Audio) not 0-indexed; map above uses 0-indexed bits per the source's bit-0=LSB rule. -->

## Provenance

```yaml
source_domains:
  - bensoftware.com
source_urls:
  - https://bensoftware.com/securityspy/web-server-spec.html
  - https://bensoftware.com/securityspy/helpapplescript.html
  - https://bensoftware.com/securityspy/manual/
  - https://bensoftware.com/securityspy/help.php
retrieved_at: 2026-06-12T05:25:54.181Z
last_checked_at: 2026-06-12T19:12:21.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:12:21.249Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched source endpoints with exact parameter signatures; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "base path not specified beyond resource names"
- "detailed auth flow not fully specified; source warns URL-embedded creds insecure"
- "no explicit power on/off commands in source"
- "inferred from PTZ direction commands"
- "source documents per-camera static config (settings-cameras) but no"
- "source describes no multi-step macro sequences"
- "source contains no explicit safety warnings, interlocks, or"
- "settingsGeneral/settings-display/etc. POST request/response body schema beyond key=value form not documented. Trigger reason code binary layout in source is 1-indexed (1=Video motion, 2=Audio) not 0-indexed; map above uses 0-indexed bits per the source's bit-0=LSB rule."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
