---
spec_id: admin/magewell-usb-fusion-v2_0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Magewell USB Fusion V2.0 Control Spec"
manufacturer: Magewell
model_family: "USB Fusion"
aliases: []
compatible_with:
  manufacturers:
    - Magewell
  models:
    - "USB Fusion"
  firmware: 2.4.68
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/usb-fusion-api/usb-fusion-api-en_US.pdf
retrieved_at: 2026-04-30T13:13:07.891Z
last_checked_at: 2026-10-07T21:04:31.280Z
generated_at: 2026-10-07T21:04:31.280Z
firmware_coverage: 2.4.68
protocol_coverage: []
known_gaps:
  - "no RS-232, UDP, or OSC support documented"
  - "TCP control port default value not explicitly stated in source; examples use 9000"
  - "WebSocket event types/format not documented beyond URL pattern"
  - "SRT stream port default not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:04:31.280Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 action units match documented endpoints with agreeing parameter shapes, transport claims are source-supported, and every source endpoint is represented in the spec. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Magewell USB Fusion V2.0 Control Spec

## Summary
Magewell USB Fusion V2.0 is a multi-input video capture/streaming device with HDMI, USB webcam, and screencast sources. Control via REST HTTP API (JSON), firmware 2.4.68+. No serial control documented.

<!-- UNRESOLVED: no RS-232, UDP, or OSC support documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://[device-ip]"  # stated: "Request Domain: The device network card IP (IPv4) address"
auth:
  type: session  # stated: session cookie sid-[serial-number]=xxx; password sha256 hash
```

## Traits
```yaml
- powerable       # block-goto-sleep, fall-to-sleep, wake/sleep events
- queryable       # get-summary-info, get-device-status, get-streaming-status, etc.
- routable        # set-launch-scene, switch-presentation, set-hdmi-output-mode
- levelable       # set-volume-config, set-audio-card-mixer, set-mic-gain
```

## Actions
```yaml
# General
- id: block_goto_sleep
  label: Prevent Device from Sleeping
  kind: action
  params:
    - name: block
      type: integer
      description: "0: No; 1: Yes"
- id: fall_to_sleep
  label: Put Device to Sleep
  kind: action
- id: reboot
  label: Reboot Device
  kind: action  # requires admin
- id: reset
  label: Reset Device
  kind: action  # requires admin
- id: set_launch_scene
  label: Set Landing Scene
  kind: action
  params:
    - name: launchScene
      type: integer
      description: Landing scene ID
- id: set_auto_switch_settings
  label: Set Auto Switch Policy
  kind: action
  params:
    - name: autoSwitchType
      type: integer
      description: "0: Disable; 2: Higher priority; 3: New signal"
    - name: autoSwitchSequence
      type: array
      description: "Signal priority: 1=HDMI 1, 2=HDMI 2, 3=WEBCAM, 31=Screencast"
- id: set_auto_backup
  label: Set Auto Backup
  kind: action
  params:
    - name: autoBackup
      type: integer
    - name: backupSchedule
      type: integer
    - name: backupStartTime
      type: integer
    - name: backupEndTime
      type: integer
- id: set_sleep_policy
  label: Set Sleep Policy
  kind: action
  params:
    - name: gotoSleep
      type: integer
      description: "0: Never; 1: 30min; 2: 1h; 3: 2h; 4: 4h; 5: 8h; 6: 12h"
- id: set_reboot_when_wake_up
  label: Set Reboot on Wake-up
  kind: action
  params:
    - name: rebootWhenWakeUp
      type: boolean
- id: set_usb_mirror
  label: Set Mirror USB-C Output
  kind: action
  params:
    - name: usbMirror
      type: integer
      description: "0: No; 1: Yes"

# App Settings
- id: set_app_pairing_status
  label: Start/Stop App Pairing
  kind: action
  params:
    - name: enable
      type: boolean
- id: set_app_password
  label: Set App Login Mode
  kind: action
  params:
    - name: pairingMode
      type: integer
      description: "0: Free login; 1: Password; 2: Pairing"
    - name: new-password
      type: string
- id: set_encoder_format
  label: Set Preview Quality
  kind: action
  params:
    - name: encodeMode
      type: integer
      description: "0: 720p; 1: 1080p; 2: Auto; 3: Customize"
    - name: resolution
      type: string
    - name: duration
      type: integer
    - name: video-bitrate
      type: integer
- id: set_network_port
  label: Set Network Protocol Port
  kind: action
  params:
    - name: control-port
      type: integer
      description: TCP control port
    - name: stream-port
      type: integer
      description: SRT stream port
- id: set_observer_settings
  label: Set Watcher
  kind: action
  params:
    - name: observerCount
      type: integer
      description: "0: None; 1: 1; 2: 2"
    - name: observerLocked
      type: boolean
    - name: observerAnnotateEnable
      type: boolean

# Input
- id: export_edid
  label: Export HDMI Input EDID
  kind: action
  params:
    - name: source-id
      type: integer
      description: "0: HDMI 1; 1: HDMI 2"
    - name: file-name
      type: string
- id: set_default_edid
  label: Restore Default HDMI Input EDID
  kind: action
  params:
    - name: smart-edid
      type: boolean
    - name: data
      type: string
- id: set_edid_config
  label: Change HDMI Input EDID
  kind: action
  params:
    - name: source-id
      type: integer
    - name: smart-edid
      type: boolean
    - name: data
      type: string
- id: set_video_config
  label: Change HDMI Video Source Config
  kind: action
  params:
    - name: source-id
      type: integer
    - name: in-auto-color-fmt
      type: boolean
    - name: in-color-fmt
      type: string
    - name: in-auto-quant-range
      type: boolean
    - name: in-quant-range
      type: string
    - name: brightness
      type: integer
    - name: contrast
      type: integer
    - name: hue
      type: integer
    - name: saturation
      type: integer
    - name: deinterlace
      type: string
    - name: out-mirror
      type: boolean
- id: set_webcam_config
  label: Change Web Camera Config
  kind: action
  params:
    - name: width
      type: integer
    - name: height
      type: integer
    - name: fps
      type: integer
    - name: fourcc
      type: string
    - name: out-mirror
      type: boolean
- id: set_webcam
  label: Switch Web Camera Device
  kind: action
  params:
    - name: dev-path
      type: string
- id: set_projection_screen_config
  label: Enable/Disable Screencast Protocols
  kind: action
  params:
    - name: airPlayEnable
      type: integer
    - name: miracastEnable
      type: integer
    - name: googleCastEnable
      type: integer
- id: set_screencast_bg_color
  label: Set Screencast Background Color
  kind: action
  params:
    - name: screencastBGColor
      type: integer
- id: set_screencast_cut_black_edge_enable
  label: Crop Black Bars for Screencast
  kind: action
  params:
    - name: cropBlackArea
      type: integer
      description: "1: Yes; 0: No"
- id: set_screencast_format_enable
  label: Overlay Screencast Image Size/Frame Rate
  kind: action
  params:
    - name: screencastFormatEnable
      type: integer
- id: set_screencast_name_enable
  label: Overlay Screencast Device Name
  kind: action
  params:
    - name: screencastNameEnable
      type: integer
- id: set_screencast_overlay_fade_out
  label: FTB for Screencast Overlay
  kind: action
  params:
    - name: screencastOverlayFadeOut
      type: integer
      description: "0: Never; 1: 5s; 2: 10s; 3: 20s; 4: 30s; 5: 1min"
- id: set_mirroring_passcode
  label: Set Screencast Security Authentication
  kind: action
  params:
    - name: mirroringVerificationMode
      type: integer
      description: "0: None; 1: Password; 2: Onscreen Code"
    - name: mirroringPasscode
      type: string

# Output
- id: export_output_edid
  label: Export HDMI Output EDID
  kind: action
  params:
    - name: file-name
      type: string
- id: set_hdmi_output_mode
  label: Set HDMI Output Image
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: HDMI 1; 1: HDMI 2; 2: PROGRAM"
- id: set_hdmi_output_res
  label: Set HDMI Output Resolution
  kind: action
  params:
    - name: width
      type: integer
    - name: height
      type: integer
    - name: fps
      type: integer
- id: set_record_encoder_format
  label: Set Recording Parameters
  kind: action
  params:
    - name: duration
      type: integer
    - name: video-bitrate
      type: integer
    - name: resolution
      type: string
    - name: codeType
      type: integer
      description: "0: H.264; 1: H.265"
    - name: profile
      type: integer
    - name: encodingMode
      type: integer
      description: "0: VBR; 1: CBR"
    - name: keyframeInterval
      type: integer
    - name: audioBitrate
      type: integer
    - name: splitMode
      type: integer
    - name: splitBlock
      type: integer
    - name: fileNamePrefix
      type: string
    - name: savePath
      type: string
    - name: fileExtention
      type: integer
      description: "0: MP4; 1: MOV"
    - name: recordSourceId
      type: integer
    - name: recordWithAudio
      type: integer
    - name: scheduleMode
      type: integer
    - name: scheduleStartDate
      type: integer
    - name: scheduleEndDate
      type: integer
    - name: weeklyDate
      type: integer
    - name: scheduleRecordTime
      type: object
    - name: scheduleRecordCache
      type: array

# Album
- id: remove_album_file
  label: Delete Album Files
  kind: action
  params:
    - name: ids
      type: string
      description: File IDs, comma-separated

# Streaming
- id: add_rtmp
  label: Add RTMP Stream
  kind: action
  params:
    - name: type
      type: integer
      description: "1: RTMP"
    - name: name
      type: string
    - name: url
      type: string
    - name: streamKey
      type: string
    - name: authentication
      type: boolean
    - name: userName
      type: string
    - name: password
      type: string
    - name: autoSwitch
      type: boolean
    - name: encoder
      type: object
- id: update_rtmp
  label: Change RTMP Stream Configuration
  kind: action
  params:
    - name: id
      type: integer
    - name: type
      type: integer
    - name: name
      type: string
    - name: url
      type: string
    - name: streamKey
      type: string
    - name: authentication
      type: boolean
    - name: userName
      type: string
    - name: password
      type: string
    - name: autoSwitch
      type: boolean
    - name: encoder
      type: object
- id: remove_stream_server
  label: Delete Streaming Server
  kind: action
  params:
    - name: id
      type: integer
- id: start_streaming
  label: Start Streaming
  kind: action
  params:
    - name: id
      type: integer
- id: stop_streaming
  label: Stop Streaming
  kind: action
  params:
    - name: id
      type: integer

# Audio
- id: set_audio_card_mixer
  label: Set Sound Card Property
  kind: action
  params:
    - name: card
      type: integer
    - name: id
      type: integer
    - name: vol
      type: integer
      description: "0-100"
- id: set_mic_gain
  label: Set Mic Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: "0: Disabled; 1: Enabled"
- id: set_mic_monitor
  label: Set Monitor Mic
  kind: action
  params:
    - name: monitor
      type: boolean
- id: set_usb_audio
  label: Set USB Audio Device Usage
  kind: action
  params:
    - name: target
      type: integer
      description: "0: With camera; 1: Global mic; 2: Playback"
    - name: dev-path
      type: string
    - name: audioOffset
      type: integer
- id: set_volume_config
  label: Set Volume
  kind: action
  params:
    - name: id
      type: integer
    - name: db
      type: integer
      description: "dB, range -70 to 0"
    - name: mute
      type: boolean

# Presentation
- id: switch_presentation
  label: Switch Presentation
  kind: action
  params:
    - name: id
      type: integer
- id: update_button_mode
  label: Change Device Button Binding Mode
  kind: action
  params:
    - name: showId
      type: integer
    - name: modeOfButton
      type: integer
      description: "0: Default; 1: Custom; 2: Auto"
- id: update_scene_of_button
  label: Set Custom Button Function
  kind: action
  params:
    - name: showId
      type: integer
    - name: sceneOfButton1
      type: integer
    - name: sceneOfButton2
      type: integer
    - name: sceneOfButton3
      type: integer
    - name: sceneOfButton4
      type: integer
    - name: sceneOfButton5
      type: integer

# System/User
- id: set_datetime
  label: Set Date and Time
  kind: action  # requires admin
  params:
    - name: datetime
      type: integer
      description: Timestamp in ms since 1970-01-01
    - name: timezone
      type: string
- id: set_device_name
  label: Set Device Name
  kind: action  # requires admin
  params:
    - name: deviceName
      type: string
- id: set_timezone
  label: Set Time Zone
  kind: action  # requires admin
  params:
    - name: timezone
      type: string
- id: login
  label: Log In
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string
      description: SHA256 hash of plaintext password
- id: logout
  label: Log Out
  kind: action
- id: user_add
  label: Add User
  kind: action  # requires admin
  params:
    - name: username
      type: string
    - name: password
      type: string
      description: SHA256 hash
    - name: role
      type: integer
      description: "0: Normal; 1: Administrator"
- id: user_del
  label: Delete User
  kind: action  # requires admin
  params:
    - name: username
      type: string
- id: change_password
  label: Change Login Password
  kind: action
  params:
    - name: oldPassword
      type: string
    - name: newPassword
      type: string

# Queries
- id: get_server_launch_scenes
  label: Get Landing Scene List
  kind: action
- id: get_encoder_params
  label: Get Preview Quality Parameters
  kind: action
- id: get_wifi_list
  label: Get Wi-Fi List
  kind: action
- id: get_vumeter_info
  label: Get Audio Level
  kind: action
- id: get_device_base_info
  label: Get Basic Device Info
  kind: action
- id: get_record_encoder_params
  label: Get Recording Parameters
  kind: action
- id: get_streaming_status
  label: Get Streaming Status
  kind: action
- id: get_default_stream_server_config
  label: Get Default Streaming Configuration
  kind: action
- id: get_summary_info
  label: Get Device Summary
  kind: action
- id: get_album_files_list
  label: Get Album File List
  kind: action
  params:
    - name: type
      type: integer
      description: "0: All the files; 1: Screenshot; 2: Recorded video"
- id: get_def_video_config
  label: Get Default HDMI Video Configuration
  kind: action
- id: get_video_config
  label: Get HDMI Video Configuration
  kind: action
- id: get_app_settings
  label: Get App Settings
  kind: action
- id: get_signal_info
  label: Get HDMI Input Signal Status
  kind: action
  params:
    - name: signal-info-types
      type: array
      description: "Signal type, including video-info, audio-info, hdmi-info and info-frames"
- id: get_edid_config
  label: Get HDMI Input EDID
  kind: action
- id: get_webcam_list
  label: Get Web Camera Device List
  kind: action
- id: get_usb_output_config
  label: Get USB Output Configuration
  kind: action
- id: get_usb_audio_list
  label: Get External Audio Device List
  kind: action
  params:
    - name: target
      type: integer
      description: "0: Get available audio devices for Web Camera.; 1: Get available microphone devices.; 2: Get available USB audio playback devices."
- id: get_audio_card_list
  label: Get Sound Card Device List
  kind: action
- id: get_volume_config
  label: Get Volume
  kind: action
```

## Feedbacks
```yaml
# Device Status
- id: summary_info
  type: object
  description: Device status dashboard (V2.0 and V2.5 API versions)
  query_command: get-summary-info
  properties:
    - device: DeviceInfo
    - out: USBOutData

- id: device_status
  type: object
  description: Full device status including scene, recording, streaming, annotations
  query_command: get-device-status
  properties:
    - deviceName: string
    - serialNumber: string
    - firmwareVersion: string
    - hardwareVersion: string
    - deviceWorkingStatus: integer
    - ftbEnable: integer
    - recordStatus: RecordStatus
    - sceneStatus: SceneStatus
    - musicStatus: MusicStatus
    - srtStatus: SrtStatus
    - videoPlayerStatus: VideoPlayerStatus

# Input Signal
- id: signal_info
  type: object
  description: HDMI input signal status
  query_command: get-signal-info
  properties:
    - video-info: VideoInfoData
    - audio-info: AudioInfoData
    - hdmi-info: HdmiInfoData
    - info-frames: array

- id: hdmi_output_info
  type: object
  description: HDMI output signal status
  query_command: get-hdmi-output-info

- id: webcam_list
  type: array
  description: Web Camera device list
  query_command: get-webcam-list

# Settings
- id: general_settings
  type: object
  description: General device settings
  query_command: get-server-settings

- id: app_settings
  type: object
  description: App settings including pairing, encoding, ports
  query_command: get-app-settings

- id: video_config
  type: object
  description: HDMI video source configuration
  query_command: get-video-config

- id: def_video_config
  type: object
  description: Default HDMI video source configuration
  query_command: get-def-video-config

- id: edid_config
  type: object
  description: HDMI input EDID configuration
  query_command: get-edid-config

# Streaming
- id: streaming_status
  type: object
  description: Live streaming status
  query_command: get-streaming-status
  properties:
    - id: integer
    - state: integer  # 0: Unknown; 1: Connecting; 2: Connected; 3: Failed
    - speed: integer
    - duration: integer

- id: stream_server_list
  type: array
  description: Streaming server list
  query_command: get-default-stream-server-config

- id: default_stream_server_config
  type: object
  description: Default streaming configuration
  query_command: get-default-stream-server-config

# Audio
- id: volume_config
  type: object
  description: Volume configuration for all inputs/outputs
  query_command: get-volume-config

- id: vu_meter_info
  type: object
  description: Real-time audio levels
  query_command: get-vumeter-info

- id: audio_card_list
  type: array
  description: Sound card device list
  query_command: get-audio-card-list

- id: audio_card_mixer
  type: array
  description: Sound card properties
  query_command: get-audio-card-mixer

- id: mic_gain
  type: object
  description: Mic gain status
  query_command: get-mic-gain
  properties:
    - gain: integer  # 0: Disabled; 1: Enabled
    - monitor: boolean

- id: usb_audio_list
  type: object
  description: External USB audio device list
  query_command: get-usb-audio-list

# Album
- id: album_files_list
  type: object
  description: Recorded videos and screenshots
  query_command: get-album-files-list

# System
- id: device_info
  type: object
  description: Device information
  query_command: get-device-info
  properties:
    - serialNumber: string
    - mac: string
    - model: string
    - deviceName: string
    - firmwareVersion: string
    - hardwareVersion: string

- id: device_base_info
  type: object
  description: Basic device info
  query_command: get-device-base-info

- id: wifi_list
  type: array
  description: Wi-Fi network list
  query_command: get-wifi-list

- id: user_list
  type: array
  description: System user list
  query_command: get-all

- id: ping
  type: boolean
  description: Network connection test (no auth required)
  query_command: ping

# Recording
- id: record_encoder_params
  type: object
  description: Recording parameters
  query_command: get-record-encoder-params

- id: usb_output_config
  type: object
  description: USB output (UVC/UAC) configuration
  query_command: get-usb-output-config
```

## Variables
```yaml
# Scene/Presentation (queried via scene list APIs)
- id: scene_list
  type: array
  description: Landing scene list with layers, sources, GFX
  query_command: get-server-launch-scenes

# Encoding preview params
- id: encoder_params
  type: object
  description: Available encoding parameters for preview
  query_command: get-encoder-params
```

## Events
```yaml
# WebSocket: ws://[device-ip]:[control-port]/
# Monitor device status changes and annotation drawing
# Control port from app settings
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Device cannot sleep during: live streaming, recording, file backup, screencast, capturing
  - condition: "Device busy (recording/streaming/backup) blocks fall-to-sleep"
    reference: "error code 11 MW_STATUS_DEVICE_BUSY"
```

## Notes
Default login: username `Admin`, password `admin` (SHA256: `c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f`). Session expires on device power-off or restart. API versioning: V2.6.0+ uses `/mwapi/V2.0/` path prefix; V2.5.0 and below use `/mwapi/` without version. Ping endpoint requires no authentication.

<!-- UNRESOLVED: TCP control port default value not explicitly stated in source; examples use 9000 -->
<!-- UNRESOLVED: WebSocket event types/format not documented beyond URL pattern -->
<!-- UNRESOLVED: SRT stream port default not stated -->

## Provenance

```yaml
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/usb-fusion-api/usb-fusion-api-en_US.pdf
retrieved_at: 2026-04-30T13:13:07.891Z
last_checked_at: 2026-10-07T21:04:31.280Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:04:31.280Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 action units match documented endpoints with agreeing parameter shapes, transport claims are source-supported, and every source endpoint is represented in the spec. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no RS-232, UDP, or OSC support documented"
- "TCP control port default value not explicitly stated in source; examples use 9000"
- "WebSocket event types/format not documented beyond URL pattern"
- "SRT stream port default not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
