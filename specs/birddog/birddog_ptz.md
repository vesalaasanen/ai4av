---
schema_version: ai4av-public-spec-v1
device_id: birddog/birddog-ptz
entity_id: birddog_ptz
spec_id: admin/birddog-ptz
revision: 1
author: admin
title: "BirdDog PTZ Control Spec"
status: published
manufacturer: BirdDog
manufacturer_key: birddog
model_family: "BirdDog PTZ"
aliases: []
compatible_with:
  manufacturers:
    - BirdDog
  models:
    - "BirdDog PTZ"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: birddog_ptz_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:21:56.733Z
retrieved_at: 2026-04-23T15:21:56.733Z
last_checked_at: 2026-04-23T15:21:56.733Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:21:56.733Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions verified against source endpoints with complete path coverage and correct transport parameters."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# BirdDog PTZ Control Spec

## Summary

BirdDog PTZ cameras and encoders/decoders are controlled via a RESTful HTTP API (version 2.0) on port 8080. The API provides endpoints for device info, NDI encode/decode configuration, PTZ movement and presets, camera exposure/white balance/picture settings, colour matrix, gamma, detail, external I/O, and Silicon2 streaming codecs (RTSP, SRT, RTMP, HX). Multiple BirdDog product lines share this API (P200/A200/A300, P100/PF120, P4k/P400, Flex, WP, QUAD).

<!-- UNRESOLVED: specific PTZ pan/tilt/zoom continuous-move commands not documented — only speed settings and preset recall/save are described -->
<!-- UNRESOLVED: no error response codes or error handling documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<device-ip>:8080"
  port: 8080
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: reboot and restart endpoints present
  - queryable       # inferred: extensive GET endpoints returning device state
  - levelable       # inferred: pan/tilt/zoom speed, audio gain, exposure, picture parameters with ranges
```

## Actions
```yaml
actions:
  - id: reboot
    label: Reboot Device
    kind: action
    description: "Immediately initiates a full device reboot. Supports both GET and POST."
    params: []
    http:
      method: POST
      path: /reboot

  - id: restart
    label: Restart Video Subsystem
    kind: action
    description: "Restarts the video subsystem. Supports both GET and POST."
    params: []
    http:
      method: POST
      path: /restart

  - id: set_operation_mode
    label: Set Operation Mode
    kind: action
    description: "Switch between NDI encode and NDI decode mode."
    params:
      - name: mode
        type: string
        enum: [encode, decode]
        description: "Device operation mode"
    http:
      method: POST
      path: /operationmode
      content_type: text/plain

  - id: set_video_output_interface
    label: Set Video Output Interface
    kind: action
    description: "Switch between sdi/hdmi or LowLatency/NormalMode."
    params:
      - name: videooutput
        type: string
        enum: [sdi, hdmi, LowLatency, NormalMode]
        description: "Video output mode"
    http:
      method: POST
      path: /videooutputinterface
      content_type: text/plain

  - id: set_ptz_speed
    label: Set PTZ Speeds
    kind: action
    description: "Set pan, tilt, and zoom movement speeds."
    params:
      - name: PanSpeed
        type: integer
        min: 0
        max: 21
        description: "Pan speed"
      - name: TiltSpeed
        type: integer
        min: 0
        max: 18
        description: "Tilt speed"
      - name: ZoomSpeed
        type: integer
        min: 0
        max: 7
        description: "Zoom speed"
    http:
      method: POST
      path: /birddogptzsetup
      content_type: application/json

  - id: recall_preset
    label: Recall Preset
    kind: action
    description: "Recall a saved PTZ preset position."
    params:
      - name: Preset
        type: string
        description: "Preset name, e.g. Preset-1 (range 1 to 9)"
    http:
      method: POST
      path: /recall
      content_type: application/json

  - id: save_preset
    label: Save Preset
    kind: action
    description: "Save current PTZ position as a preset."
    params:
      - name: Preset
        type: string
        description: "Preset name, e.g. Preset-1 (range 1 to 9)"
    http:
      method: POST
      path: /save
      content_type: application/json

  - id: set_encode_transport
    label: Set NDI Encode Transport
    kind: action
    description: "Set NDI network transport settings."
    params:
      - name: Txpm
        type: string
        enum: [Multicast, TCP, Multi-TCP, UDP]
        description: "Transport mode"
      - name: Txnetprefix
        type: string
        description: "Network prefix (x.x.x.x)"
      - name: Txnetmask
        type: string
        description: "Network mask (x.x.x.x)"
      - name: Txmcttl
        type: string
        description: "Multicast TTL"
    http:
      method: POST
      path: /encodeTransport
      content_type: application/json

  - id: set_encode_setup
    label: Set Encode Setup
    kind: action
    description: "Set NDI encode settings including video format, stream name, audio, bandwidth."
    params:
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: VideoFormat
        type: string
        description: "Video format"
      - name: VideoSampleRate
        type: string
        enum: ["420", "422", "444"]
        description: "Chroma subsampling"
      - name: ColorBitDepth
        type: string
        enum: [8Bit, 10Bit, 12Bit]
        description: "Color bit depth"
      - name: StreamName
        type: string
        description: "NDI stream name"
      - name: NDIAudio
        type: string
        enum: [NDIAudioMain, NDIAudioAnalog, NDIAudioMute]
        description: "Audio source"
      - name: ScreenSaverMode
        type: string
        enum: [BirdDogSS, BlackSS, CaptureSS]
        description: "Screensaver mode"
      - name: BandwidthMode
        type: string
        enum: [Manual, NDIManaged]
        description: "Bandwidth management mode"
      - name: BandwidthSelect
        type: integer
        min: 60
        max: 360
        description: "Bandwidth limit"
      - name: LoopTally
        type: string
        enum: [LoopTallyEn, LoopTallyDis]
        description: "Loop tally enable/disable"
      - name: TallyMode
        type: string
        enum: [TallyOn, TallyOff, VideoMode]
        description: "Tally mode"
      - name: VideoCSC
        type: string
        enum: [NoCSC, RGB, YVU, YUV444, YVU444]
        description: "Color space conversion"
      - name: NDIGroup
        type: string
        enum: [NDIGroupEn, NDIGroupDis]
        description: "NDI group enable/disable"
      - name: NDIGroupName
        type: string
        description: "NDI group name"
    http:
      method: POST
      path: /encodesetup
      content_type: application/json

  - id: connect_to_ndi_source
    label: Connect to NDI Source
    kind: action
    description: "Connect decoder to an NDI source."
    params:
      - name: sourceName
        type: string
        description: "NDI source name"
    http:
      method: POST
      path: /connectTo
      content_type: application/json

  - id: set_decode_transport
    label: Set NDI Decode Transport
    kind: action
    description: "Set NDI decode network transport mode."
    params:
      - name: rxpm
        type: string
        enum: [Multicast, TCP, Multi-TCP, UDP]
        description: "Receive transport mode"
    http:
      method: POST
      path: /decodeTransport
      content_type: application/json

  - id: set_decode_setup
    label: Set Decode Setup
    kind: action
    description: "Set NDI decode settings."
    params:
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: ColorSpace
        type: string
        enum: [RGB, YUV]
        description: "Color space"
      - name: TallyMode
        type: string
        enum: [TallyOn, TallyOff, VideoMode]
        description: "Tally mode"
      - name: ScreenSaverMode
        type: string
        enum: [BirdDogSS, BlackSS, CaptureSS]
        description: "Screensaver mode"
      - name: NDIAudio
        type: string
        enum: [NDIAudioEn, NDIAudioDis]
        description: "NDI audio enable/disable"
    http:
      method: POST
      path: /decodesetup
      content_type: application/json

  - id: set_analog_audio
    label: Set Analog Audio Setup
    kind: action
    description: "Set analog audio gain and output select."
    params:
      - name: AnalogAudioInGain
        type: integer
        min: 0
        max: 100
        description: "Audio input gain"
      - name: AnalogAudioOutGain
        type: integer
        min: 0
        max: 100
        description: "Audio output gain"
      - name: AnalogAudiooutputselect
        type: string
        enum: [DecodeMain, DecodeComms, DecodeLoop]
        description: "Audio output select"
    http:
      method: POST
      path: /analogaudiosetup
      content_type: application/json

  - id: set_exposure
    label: Set Exposure Settings
    kind: action
    description: "Set camera exposure parameters."
    params:
      - name: ExpMode
        type: string
        enum: [FULL-AUTO, MANUAL, SHUTTER-PRI, IRIS-PRI, BRIGHT]
        description: "Exposure mode"
      - name: AeResponse
        type: integer
        min: 1
        max: 48
        description: "AE response"
      - name: BackLight
        type: string
        enum: [On, Off]
        description: "Backlight compensation"
      - name: BrightLevel
        type: integer
        description: "Brightness level (0, 5-31)"
      - name: ExpCompEn
        type: string
        enum: [On, Off]
        description: "Exposure compensation enable"
      - name: ExpCompLvl
        type: integer
        description: "Exposure compensation level (0-14, -128 to 127)"
      - name: GainLevel
        type: integer
        description: "Gain level (1 to GainLimit)"
      - name: GainLimit
        type: integer
        min: 4
        max: 15
        description: "Gain limit"
      - name: GainPoint
        type: string
        enum: [On, Off]
        description: "Gain point"
      - name: GainPointPosition
        type: integer
        min: 1
        max: 13
        description: "Gain point position"
      - name: HighSensitivity
        type: string
        enum: [On, Off]
        description: "High sensitivity mode"
      - name: IrisLevel
        type: integer
        description: "Iris level (0, 5-17)"
      - name: ShutterControlOverwrite
        type: string
        enum: [On, Off]
        description: "Shutter control overwrite"
      - name: ShutterMaxSpeed
        type: integer
        min: 20
        max: 33
        description: "Maximum shutter speed"
      - name: ShutterMinSpeed
        type: integer
        description: "Minimum shutter speed (16 to ShutterMaxSpeed)"
      - name: ShutterSpeed
        type: integer
        min: 0
        max: 21
        description: "Shutter speed"
      - name: ShutterSpeedOverwrite
        type: integer
        min: 30
        max: 110
        description: "Shutter speed overwrite"
      - name: SlowShutterEn
        type: string
        enum: [On, Off]
        description: "Slow shutter enable"
      - name: SlowShutterLimit
        type: integer
        min: 1
        max: 6
        description: "Slow shutter limit"
      - name: Spotlight
        type: string
        enum: [On, Off]
        description: "Spotlight mode"
    http:
      method: POST
      path: /birddogexpsetup
      content_type: application/json

  - id: set_white_balance
    label: Set White Balance
    kind: action
    description: "Set white balance mode and parameters."
    params:
      - name: WbMode
        type: string
        enum: [AUTO, INDOOR, OUTDOOR, OUTDOOR-AUTO, ONEPUSH, ATW, MANUAL, SVL-AUTO, SVL, SVL-OUTDOOR-AUTO]
        description: "White balance mode"
      - name: ColorTemp
        type: integer
        min: 2800
        max: 6500
        description: "Color temperature (K)"
      - name: RedGain
        type: integer
        min: 0
        max: 255
        description: "Red gain"
      - name: BlueGain
        type: integer
        min: 0
        max: 255
        description: "Blue gain"
      - name: Speed
        type: integer
        min: 1
        max: 5
        description: "WB speed"
      - name: Select
        type: string
        enum: [FL LIGHT, STD, OFF, HIGH SAT]
        description: "WB select"
      - name: Matrix
        type: string
        enum: [On, Off]
        description: "Matrix enable"
      - name: Level
        type: integer
        min: 0
        max: 14
        description: "Level"
      - name: Phase
        type: integer
        min: 0
        max: 14
        description: "Phase"
      - name: Offset
        type: integer
        min: 0
        max: 14
        description: "Offset"
      - name: RG
        type: integer
        min: -99
        max: 99
        description: "RG"
      - name: RB
        type: integer
        min: -99
        max: 99
        description: "RB"
      - name: GR
        type: integer
        min: -99
        max: 99
        description: "GR"
      - name: GB
        type: integer
        min: -99
        max: 99
        description: "GB"
      - name: BR
        type: integer
        min: -99
        max: 99
        description: "BR"
      - name: BG
        type: integer
        min: -99
        max: 99
        description: "BG"
    http:
      method: POST
      path: /birddogwbsetup
      content_type: application/json

  - id: set_picture
    label: Set Picture Settings
    kind: action
    description: "Set picture parameters including color, contrast, flip, mirror, noise reduction."
    params:
      - name: Color
        type: integer
        min: 0
        max: 15
        description: "Color level"
      - name: Contrast
        type: integer
        min: 0
        max: 15
        description: "Contrast level"
      - name: Hue
        type: integer
        min: 0
        max: 15
        description: "Hue level"
      - name: Sharpness
        type: integer
        min: -128
        max: 127
        description: "Sharpness"
      - name: Flip
        type: string
        enum: [On, Off]
        description: "Vertical flip"
      - name: Mirror
        type: string
        enum: [On, Off]
        description: "Horizontal mirror"
      - name: Gamma
        type: integer
        min: 0
        max: 4
        description: "Gamma preset"
      - name: Effect
        type: string
        enum: [BW, Off]
        description: "Picture effect"
      - name: IRCutFilter
        type: string
        enum: [Auto, On, Off]
        description: "IR cut filter"
      - name: NoiseReduction
        type: string
        description: "Noise reduction (Off, 1-5)"
      - name: TWODNR
        type: string
        description: "2D noise reduction (Off, 1-5)"
      - name: ThreeDNR
        type: string
        description: "3D noise reduction (Off, 1-5)"
      - name: WideDynamicRange
        type: string
        description: "Wide dynamic range (Off, 1-6)"
      - name: Stabilizer
        type: string
        enum: [On, Off]
        description: "Image stabilizer"
      - name: BackLightCom
        type: string
        enum: [On, Off]
        description: "Backlight compensation"
      - name: ChromeSuppress
        type: string
        enum: [OFF, LOW, MEDIUM, HIGH]
        description: "Chroma suppression"
      - name: HighlightComp
        type: string
        enum: [OFF, LOW, MEDIUM, HIGH]
        description: "Highlight compensation"
      - name: HighlightCompMask
        type: integer
        min: 0
        max: 15
        description: "Highlight compensation mask"
      - name: LowLatency
        type: string
        enum: [On, Off]
        description: "Low latency mode"
      - name: NDFilter
        type: integer
        min: 0
        max: 3
        description: "ND filter position"
    http:
      method: POST
      path: /birddogpicsetup
      content_type: application/json

  - id: set_colour_matrix
    label: Set Colour Matrix
    kind: action
    description: "Set colour matrix gain and hue for RGBCMY channels."
    params:
      - name: RedGain
        type: integer
        min: 0
        max: 64
      - name: RedHue
        type: integer
        min: 0
        max: 64
      - name: GreenGain
        type: integer
        min: 0
        max: 64
      - name: GreenHue
        type: integer
        min: 0
        max: 64
      - name: BlueGain
        type: integer
        min: 0
        max: 64
      - name: BlueHue
        type: integer
        min: 0
        max: 64
      - name: CyanGain
        type: integer
        min: 0
        max: 64
      - name: CyanHue
        type: integer
        min: 0
        max: 64
      - name: MagGain
        type: integer
        min: 0
        max: 64
      - name: MagHue
        type: integer
        min: 0
        max: 64
      - name: YellowGain
        type: integer
        min: 0
        max: 64
      - name: YellowHue
        type: integer
        min: 0
        max: 64
      - name: ColourGain
        type: integer
        min: 0
        max: 255
      - name: HuePhase
        type: integer
        min: 0
        max: 255
    http:
      method: POST
      path: /birddogcmsetup
      content_type: application/json

  - id: set_advanced
    label: Set Advanced Settings
    kind: action
    description: "Set advanced image parameters."
    params:
      - name: Brightness
        type: integer
        min: 0
        max: 6
      - name: BrightnessComp
        type: string
        enum: [VERY DARK, DARK, STANDARD, BRIGHT]
      - name: CompLevel
        type: string
        enum: [LOW, MID, HIGH]
      - name: GammaOffset
        type: integer
        min: 16
        max: 64
      - name: HighResolution
        type: string
        enum: [On, Off]
      - name: VideoEnhancement
        type: string
        enum: [On, Off]
    http:
      method: POST
      path: /birddogadvancesetup
      content_type: application/json

  - id: set_external
    label: Set External I/O
    kind: action
    description: "Set external output controls (Aux, RainWiper, 12V out)."
    params:
      - name: Aux
        type: string
        enum: [On, Off]
      - name: RainWiper
        type: string
        enum: [On, Off]
      - name: V12vOut
        type: string
        enum: [On, Off]
    http:
      method: POST
      path: /birddogexternalsetup
      content_type: application/json

  - id: set_detail
    label: Set Detail Settings
    kind: action
    description: "Set image detail parameters."
    params:
      - name: Detail
        type: string
        enum: [On, Off]
      - name: Bandwidth
        type: string
        enum: [DEFAULT, LOW, MIDDLE, HIGH, WIDE]
      - name: BwBalance
        type: string
        enum: [TYPE1, TYPE2, TYPE3, TYPE4, TYPE5]
      - name: Crispening
        type: integer
        min: 0
        max: 7
      - name: HighLightDetail
        type: integer
        min: 0
        max: 4
      - name: HvBalance
        type: integer
        min: -2
        max: 2
      - name: Limit
        type: integer
        min: 0
        max: 7
      - name: SuperLow
        type: integer
        min: 0
        max: 7
    http:
      method: POST
      path: /birddogdetsetup
      content_type: application/json

  - id: set_gamma
    label: Set Gamma Settings
    kind: action
    description: "Set gamma curve parameters."
    params:
      - name: Settings
        type: string
        enum: [PATTERN, STANDARD, STRAIGHT]
      - name: BlackGammaLevel
        type: integer
        min: 0
        max: 14
      - name: BlackLevel
        type: integer
        min: 0
        max: 96
      - name: BlackLevelRange
        type: string
        enum: [LOW, MID, HIGH]
      - name: Level
        type: integer
        min: 0
        max: 14
      - name: Offset
        type: integer
        min: -64
        max: 64
      - name: Pattern
        type: integer
        min: 0
        max: 512
      - name: PatternFine
        type: integer
        min: 0
        max: 9
      - name: Effect
        type: integer
        min: -3
        max: 3
      - name: VisibilityEnhancer
        type: string
        enum: [On, Off]
    http:
      method: POST
      path: /birddoggammasetup
      content_type: application/json

  - id: set_ndi_discovery_server
    label: Set NDI Discovery Server
    kind: action
    description: "Set NDI discovery server enable and IP address."
    params:
      - name: NDIDisServ
        type: string
        enum: [NDIDisServEn, NDIDisServDis]
      - name: NDIDisServIP
        type: string
        description: "Discovery server IP (x.x.x.x)"
    http:
      method: POST
      path: /NDIDisServer
      content_type: application/json

  - id: set_ndi_group_name
    label: Set NDI Group Name
    kind: action
    description: "Set NDI group name."
    params:
      - name: groupName
        type: string
        description: "NDI group name"
    http:
      method: POST
      path: /NdiGrpName
      content_type: text/plain

  - id: set_ndi_off_subnet_source
    label: Set Off Subnet IP
    kind: action
    description: "Set off-subnet NDI source IP."
    params:
      - name: ipAddress
        type: string
        description: "IP address (x.x.x.x)"
    http:
      method: POST
      path: /NdiOffSnSrc
      content_type: text/plain

  - id: refresh_ndi_list
    label: Refresh NDI Source List
    kind: action
    description: "Refresh the list of NDI sources on the network."
    params: []
    http:
      method: POST
      path: /refresh

  - id: reset_ndi_list
    label: Reset NDI Source List
    kind: action
    description: "Reset the NDI source list."
    params: []
    http:
      method: POST
      path: /reset

  - id: capture_screensaver
    label: Capture Screensaver Frame
    kind: action
    description: "Capture a screensaver frame for encode/decode."
    params:
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: status
        type: string
        enum: [Encode, Decode]
        description: "Capture target"
    http:
      method: GET
      path: /capture

  - id: set_sil2_codec
    label: Set Silicon2 Codec
    kind: action
    description: "Set Silicon2 codec settings for RTSP, SRT, RTMP, HX streaming protocols."
    params:
      - name: Protocol
        type: string
        enum: [RTSP, SRT, HX, RTMP, DISABLE]
        description: "Streaming protocol"
      - name: BitrateControl
        type: string
        enum: [vbr, cbr]
        description: "Bitrate control mode"
      - name: ModeSel
        type: string
        enum: [Custom, low, med, high, ultra]
        description: "Quality preset"
      - name: QuantFactorI
        type: integer
        min: 18
        max: 47
        description: "I-frame quantization factor"
      - name: QuantFactorP
        type: integer
        min: 18
        max: 47
        description: "P-frame quantization factor"
      - name: GOPSize
        type: integer
        min: 1
        max: 59
        description: "Group of pictures size"
      - name: Bitrate
        type: integer
        min: 1
        max: 80
        description: "Bitrate (Mbps)"
    http:
      method: POST
      path: /birddogsil2codec
      content_type: application/json

  - id: set_sil2_encode
    label: Set Silicon2 Encode
    kind: action
    description: "Configure Silicon2 encoding transport (RTSP, SRT, RTMP) with connection parameters."
    params:
      - name: StreamingProtocol
        type: string
        enum: [RTSP, SRT, HX, RTMP, DISABLE]
        description: "Active streaming protocol"
      - name: RTSP_Port
        type: string
        description: "RTSP port"
      - name: RTSP_StreamName
        type: string
        description: "RTSP stream name"
      - name: RTSP_AuthEnable
        type: string
        description: "RTSP auth enable"
      - name: SRT_Port
        type: string
        description: "SRT port"
      - name: SRT_mode
        type: string
        enum: [caller, listener, rendezvous]
        description: "SRT mode"
      - name: SRT_latency
        type: integer
        min: 80
        max: 8000
        description: "SRT latency"
      - name: SRT_Encryption
        type: string
        description: "SRT encryption (true/false)"
      - name: RTMP_ServerSelection
        type: string
        enum: [local, remote]
        description: "RTMP server selection"
    http:
      method: POST
      path: /birddogsil2enc
      content_type: application/json
```

## Feedbacks
```yaml
feedbacks:
  - id: device_info
    type: object
    description: "Basic device info from /about endpoint"
    fields:
      - name: FirmwareVersion
        type: string
      - name: Format
        type: string
        description: "Hardware format, e.g. CAM 1"
      - name: HostName
        type: string
      - name: IPAddress
        type: string
      - name: NetworkConfigMethod
        type: string
        enum: [DHCP, STATIC]
      - name: SerialNumber
        type: string
      - name: Status
        type: string
        enum: [ONLINE, OFFLINE, "CAMERA INITIALIZING", "NO VIDEO"]
    http:
      method: GET
      path: /about

  - id: hostname
    type: string
    description: "Device hostname (NDI hostname)"
    http:
      method: GET
      path: /hostname

  - id: hardware_version
    type: string
    description: "Hardware version identifier, e.g. BirdDog P200A4_A5"
    http:
      method: GET
      path: /version

  - id: operation_mode
    type: string
    enum: [encode, decode]
    description: "Current operation mode"
    http:
      method: GET
      path: /operationmode

  - id: video_output_interface
    type: string
    enum: [sdi, hdmi, LowLatency, NormalMode]
    description: "Current video output interface mode"
    http:
      method: GET
      path: /videooutputinterface

  - id: ptz_speed
    type: object
    description: "Current PTZ speed settings"
    fields:
      - name: PanSpeed
        type: integer
        min: 0
        max: 21
      - name: TiltSpeed
        type: integer
        min: 0
        max: 18
      - name: ZoomSpeed
        type: integer
        min: 0
        max: 7
    http:
      method: GET
      path: /birddogptzsetup

  - id: encode_transport
    type: object
    description: "Current NDI encode transport settings"
    fields:
      - name: Txpm
        type: string
        enum: [Multicast, TCP, Multi-TCP, UDP]
      - name: Txnetprefix
        type: string
      - name: Txnetmask
        type: string
      - name: Txmcttl
        type: string
    http:
      method: GET
      path: /encodeTransport

  - id: encode_setup
    type: object
    description: "Current NDI encode settings"
    http:
      method: GET
      path: /encodesetup

  - id: decode_status
    type: object
    description: "Connected NDI source decode status"
    fields:
      - name: Videoresolution
        type: string
      - name: VideoFramerate
        type: string
      - name: VideoSamplerate
        type: string
      - name: Audiochannels
        type: string
      - name: AudioSamplerate
        type: string
      - name: AverageBitrate
        type: string
    http:
      method: GET
      path: /decodestatus

  - id: connected_ndi_source
    type: object
    description: "Currently connected NDI source"
    fields:
      - name: sourceName
        type: string
    http:
      method: GET
      path: /connectTo

  - id: ndi_source_list
    type: object
    description: "List of active NDI sources on the network"
    http:
      method: GET
      path: /List

  - id: decode_setup
    type: object
    description: "Current NDI decode settings"
    http:
      method: GET
      path: /decodesetup

  - id: analog_audio_setup
    type: object
    description: "Current analog audio settings"
    fields:
      - name: AnalogAudioInGain
        type: string
      - name: AnalogAudioOutGain
        type: string
      - name: AnalogAudiooutputselect
        type: string
    http:
      method: GET
      path: /analogaudiosetup

  - id: exposure_setup
    type: object
    description: "Current exposure settings (ExpMode, GainLevel, IrisLevel, ShutterSpeed, etc.)"
    http:
      method: GET
      path: /birddogexpsetup

  - id: white_balance_setup
    type: object
    description: "Current white balance settings (WbMode, ColorTemp, RedGain, BlueGain, etc.)"
    http:
      method: GET
      path: /birddogwbsetup

  - id: picture_setup
    type: object
    description: "Current picture settings (Color, Contrast, Sharpness, Flip, Mirror, etc.)"
    http:
      method: GET
      path: /birddogpicsetup

  - id: colour_matrix_setup
    type: object
    description: "Current colour matrix settings"
    http:
      method: GET
      path: /birddogcmsetup

  - id: advanced_setup
    type: object
    description: "Current advanced settings"
    http:
      method: GET
      path: /birddogadvancesetup

  - id: external_setup
    type: object
    description: "Current external I/O settings (Aux, RainWiper, V12vOut)"
    http:
      method: GET
      path: /birddogexternalsetup

  - id: detail_setup
    type: object
    description: "Current detail settings"
    http:
      method: GET
      path: /birddogdetsetup

  - id: gamma_setup
    type: object
    description: "Current gamma settings"
    http:
      method: GET
      path: /birddoggammasetup

  - id: ndi_discovery_server
    type: object
    description: "NDI discovery server settings"
    fields:
      - name: NDIDisServ
        type: string
      - name: NDIDisServIP
        type: string
    http:
      method: GET
      path: /NDIDisServer

  - id: sil2_codec
    type: object
    description: "Silicon2 codec settings for all protocols"
    http:
      method: GET
      path: /birddogsil2codec

  - id: sil2_encode
    type: object
    description: "Silicon2 encode transport settings (RTSP, SRT, RTMP)"
    http:
      method: GET
      path: /birddogsil2enc
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables distinct from actions identified in source;
# all parameters are exposed via POST action endpoints rather than independent variable slots
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
- The API accepts both GET and POST for reboot and restart endpoints — using GET for state-changing operations is unconventional.
- All parameter values are sent as strings even when numeric (e.g. `"PanSpeed":"8"`).
- The PTZ section only documents speed settings and preset recall/save; continuous pan/tilt/zoom move commands are not described in this API version.
- Some endpoints vary in availability across product lines (e.g., `operationmode` not available on Flex, WP, P200/A200/A300, P100/PF120, P4k/P400).
- The Silicon2 codec/encode endpoints manage secondary streaming protocols (RTSP on port 3489, SRT on port 7900, RTMP on port 1935) independent of the main NDI transport.
- Response content type varies: JSON for most POST endpoints, plain text for some GET endpoints.

<!-- UNRESOLVED: continuous PTZ move (pan left/right, tilt up/down, zoom in/out) commands not documented -->
<!-- UNRESOLVED: no error response codes or error handling documented -->
<!-- UNRESOLVED: no rate limiting or command timing constraints documented -->
<!-- UNRESOLVED: specific firmware version compatibility for this API version 2.0 not stated -->
<!-- UNRESOLVED: product-specific endpoint availability matrix not fully documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: birddog_ptz_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:21:56.733Z
retrieved_at: 2026-04-23T15:21:56.733Z
last_checked_at: 2026-04-23T15:21:56.733Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:21:56.733Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions verified against source endpoints with complete path coverage and correct transport parameters."
```

## Known Gaps

```yaml
[]
```
