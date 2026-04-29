---
schema_version: ai4av-public-spec-v1
device_id: birddog/flex-encode
entity_id: birddog_converters
spec_id: admin/birddog-converters
revision: 1
author: admin
title: "BirdDog Converters Control Spec"
status: published
manufacturer: BirdDog
manufacturer_key: birddog
model_family: "Flex Encode"
aliases: []
compatible_with:
  manufacturers:
    - BirdDog
  models:
    - "Flex Encode"
    - "Flex Decode"
    - "WP Encode"
    - "WP Decode"
    - QUAD
    - P200
    - A200
    - A300
    - P100
    - PF120
    - P4k
    - P400
    - Studio
    - Mini
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: birddog_converters_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:21:53.998Z
retrieved_at: 2026-04-23T15:21:53.998Z
last_checked_at: 2026-04-23T15:21:53.998Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:21:53.998Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions matched literally to source paths; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# BirdDog Converters Control Spec

## Summary
BirdDog NDI converters and cameras are controlled via a RESTful HTTP API (version 2.0) on port 8080. The API provides endpoints for device info, NDI encode/decode configuration, PTZ control, exposure, white balance, picture settings, colour matrix, gamma, detail, and Silicon2 streaming (RTSP/SRT/HX/RTMP). Not all endpoints are available on all models.

<!-- UNRESOLVED: exact model-to-endpoint mapping not fully documented — source notes only list models where certain endpoints are NOT present -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<device-ip>:8080"
  port: 8080
auth:
  type: none  # inferred: no auth procedure in source for the control API
```

## Traits
```yaml
traits:
  - powerable       # inferred from reboot/restart commands
  - queryable       # inferred from numerous GET endpoints returning device state
  - levelable       # inferred from audio gain, brightness, contrast, color controls
  - routable        # inferred from NDI source connect/disconnect commands
```

## Actions
```yaml
actions:
  - id: reboot
    label: Reboot Device
    kind: action
    params: []
    http:
      method: GET
      path: /reboot

  - id: reboot_post
    label: Reboot Device (POST)
    kind: action
    params: []
    http:
      method: POST
      path: /reboot

  - id: restart_video
    label: Restart Video Subsystem
    kind: action
    params: []
    http:
      method: GET
      path: /restart

  - id: restart_video_post
    label: Restart Video Subsystem (POST)
    kind: action
    params: []
    http:
      method: POST
      path: /restart

  - id: set_operation_mode
    label: Set Operation Mode
    kind: action
    params:
      - name: mode
        type: string
        enum: [encode, decode]
        description: "Device operation mode"
    http:
      method: POST
      path: /operationmode
    note: "Not present in Flex Encode, Flex Decode, WP Encode, WP Decode, P200/A200/A300, P100/PF120, P4k/P400"

  - id: set_video_output_interface
    label: Set Video Output Interface
    kind: action
    params:
      - name: videooutput
        type: string
        enum: [sdi, hdmi, LowLatency, NormalMode]
        description: "Video output mode"
    http:
      method: POST
      path: /videooutputinterface
    note: "Not present in Studio, Mini, Flex Encode, Flex Decode, WP Encode, WP Decode, QUAD, P200/A200/A300, P100/PF120, P4k/P400"

  - id: set_analog_audio
    label: Set Analog Audio Setup
    kind: action
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
    note: "AnalogAudiooutputselect not present in Flex Encode, WP Encode, QUAD, P200/A200/A300, P100/PF120, P4k/P400"

  - id: set_encode_transport
    label: Set NDI Encode Transport
    kind: action
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

  - id: set_encode_setup
    label: Set NDI Encode Setup
    kind: action
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
      - name: ColorBitDepth
        type: string
        enum: [8Bit, 10Bit, 12Bit]
      - name: StreamName
        type: string
        description: "NDI stream name"
      - name: NDIAudio
        type: string
        enum: [NDIAudioMain, NDIAudioAnalog, NDIAudioMute]
      - name: ScreenSaverMode
        type: string
        enum: [BirdDogSS, BlackSS, CaptureSS]
      - name: BandwidthMode
        type: string
        enum: [Manual, NDIManaged]
      - name: BandwidthSelect
        type: integer
        min: 60
        max: 360
      - name: LoopTally
        type: string
        enum: [LoopTallyEn, LoopTallyDis]
      - name: TallyMode
        type: string
        enum: [TallyOn, TallyOff, VideoMode]
      - name: VideoCSC
        type: string
        enum: [NoCSC, RGB, YVU, YUV444, YVU444]
      - name: NDIGroup
        type: string
        enum: [NDIGroupEn, NDIGroupDis]
      - name: NDIGroupName
        type: string
        description: "NDI group name"
    http:
      method: POST
      path: /encodesetup

  - id: connect_to_ndi_source
    label: Connect to NDI Source
    kind: action
    params:
      - name: sourceName
        type: string
        description: "NDI source name to connect to"
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: status
        type: string
        enum: [Encode, Decode]
    http:
      method: POST
      path: /connectTo

  - id: set_decode_transport
    label: Set NDI Decode Transport
    kind: action
    params:
      - name: rxpm
        type: string
        enum: [Multicast, TCP, Multi-TCP, UDP]
        description: "Transport mode"
    http:
      method: POST
      path: /decodeTransport

  - id: set_decode_setup
    label: Set NDI Decode Setup
    kind: action
    params:
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: ColorSpace
        type: string
        enum: [RGB, YUV]
      - name: TallyMode
        type: string
        enum: [TallyOn, TallyOff, VideoMode]
      - name: ScreenSaverMode
        type: string
        enum: [BirdDogSS, BlackSS, CaptureSS]
      - name: NDIAudio
        type: string
        enum: [NDIAudioEn, NDIAudioDis]
    http:
      method: POST
      path: /decodesetup

  - id: set_ndi_discovery_server
    label: Set NDI Discovery Server
    kind: action
    params:
      - name: NDIDisServ
        type: string
        enum: [NDIDisServEn, NDIDisServDis]
        description: "Enable/disable discovery server"
      - name: NDIDisServIP
        type: string
        description: "Discovery server IP (x.x.x.x)"
    http:
      method: POST
      path: /NDIDisServer

  - id: set_ndi_group_name
    label: Set NDI Group Name
    kind: action
    params:
      - name: groupName
        type: string
        description: "NDI group name"
    http:
      method: POST
      path: /NdiGrpName

  - id: set_off_subnet_source
    label: Set Off-Subnet NDI Source IP
    kind: action
    params:
      - name: ipAddress
        type: string
        description: "Off-subnet IP address (x.x.x.x)"
    http:
      method: POST
      path: /NdiOffSnSrc

  - id: refresh_ndi_list
    label: Refresh NDI Source List
    kind: action
    params: []
    http:
      method: POST
      path: /refresh

  - id: reset_ndi_list
    label: Reset NDI Source List
    kind: action
    params: []
    http:
      method: POST
      path: /reset

  - id: capture_screensaver
    label: Capture Screensaver Frame
    kind: action
    params:
      - name: ChNum
        type: integer
        min: 1
        max: 4
        description: "Channel number"
      - name: status
        type: string
        enum: [Encode, Decode]
    http:
      method: GET
      path: /capture

  - id: set_ptz_setup
    label: Set PTZ Speeds
    kind: action
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

  - id: recall_preset
    label: Recall PTZ Preset
    kind: action
    params:
      - name: Preset
        type: string
        description: "Preset name (Preset-1 through Preset-9)"
    http:
      method: POST
      path: /recall

  - id: save_preset
    label: Save PTZ Preset
    kind: action
    params:
      - name: Preset
        type: string
        description: "Preset name (Preset-1 through Preset-9)"
    http:
      method: POST
      path: /save

  - id: set_exposure
    label: Set Exposure Settings
    kind: action
    params:
      - name: ExpMode
        type: string
        enum: [FULL-AUTO, MANUAL, SHUTTER-PRI, IRIS-PRI, BRIGHT]
      - name: AeResponse
        type: integer
        min: 1
        max: 48
      - name: BackLight
        type: string
        enum: [On, Off]
      - name: BrightLevel
        type: integer
        description: "Range 0 or 5-31"
      - name: ExpCompEn
        type: string
        enum: [On, Off]
      - name: ExpCompLvl
        type: integer
        description: "Range 0-14 or -128 to 127"
      - name: GainLevel
        type: integer
        description: "Range 1 to GainLimit"
      - name: GainLimit
        type: integer
        min: 4
        max: 15
      - name: GainPoint
        type: string
        enum: [On, Off]
      - name: GainPointPosition
        type: integer
        min: 1
        max: 13
      - name: HighSensitivity
        type: string
        enum: [On, Off]
      - name: IrisLevel
        type: integer
        description: "Range 0 or 5-17"
      - name: ShutterControlOverwrite
        type: string
        enum: [On, Off]
      - name: ShutterMaxSpeed
        type: integer
        min: 20
        max: 33
      - name: ShutterMinSpeed
        type: integer
        description: "Range 16 to ShutterMaxSpeed"
      - name: ShutterSpeed
        type: integer
        min: 0
        max: 21
      - name: ShutterSpeedOverwrite
        type: integer
        min: 30
        max: 110
      - name: SlowShutterEn
        type: string
        enum: [On, Off]
      - name: SlowShutterLimit
        type: integer
        min: 1
        max: 6
      - name: Spotlight
        type: string
        enum: [On, Off]
    http:
      method: POST
      path: /birddogexpsetup

  - id: set_white_balance
    label: Set White Balance Settings
    kind: action
    params:
      - name: WbMode
        type: string
        enum: [AUTO, INDOOR, OUTDOOR, OUTDOOR-AUTO, ONEPUSH, ATW, MANUAL, SVL-AUTO, SVL, SVL-OUTDOOR-AUTO]
      - name: RedGain
        type: integer
        min: 0
        max: 255
      - name: BlueGain
        type: integer
        min: 0
        max: 255
      - name: ColorTemp
        type: integer
        min: 2800
        max: 6500
      - name: Speed
        type: integer
        min: 1
        max: 5
      - name: Select
        type: string
        enum: [FL LIGHT, STD, OFF, HIGH SAT]
      - name: Level
        type: integer
        min: 0
        max: 14
      - name: Offset
        type: integer
        min: 0
        max: 14
      - name: Phase
        type: integer
        min: 0
        max: 14
      - name: Matrix
        type: string
        enum: [On, Off]
      - name: RG
        type: integer
        min: -99
        max: 99
      - name: RB
        type: integer
        min: -99
        max: 99
      - name: GR
        type: integer
        min: -99
        max: 99
      - name: GB
        type: integer
        min: -99
        max: 99
      - name: BR
        type: integer
        min: -99
        max: 99
      - name: BG
        type: integer
        min: -99
        max: 99
    http:
      method: POST
      path: /birddogwbsetup

  - id: set_picture
    label: Set Picture Settings
    kind: action
    params:
      - name: Color
        type: integer
        min: 0
        max: 15
      - name: Contrast
        type: integer
        min: 0
        max: 15
      - name: Hue
        type: integer
        min: 0
        max: 15
      - name: Sharpness
        type: integer
        min: -128
        max: 127
      - name: Gamma
        type: integer
        min: 0
        max: 4
      - name: Effect
        type: string
        enum: [BW, Off]
      - name: Flip
        type: string
        enum: [On, Off]
      - name: Mirror
        type: string
        enum: [On, Off]
      - name: Stabilizer
        type: string
        enum: [On, Off]
      - name: IRCutFilter
        type: string
        enum: [Auto, On, Off]
      - name: BackLightCom
        type: string
        enum: [On, Off]
      - name: ChromeSuppress
        type: string
        enum: [OFF, LOW, MEDIUM, HIGH]
      - name: HighlightComp
        type: string
        enum: [OFF, LOW, MEDIUM, HIGH]
      - name: HighlightCompMask
        type: integer
        min: 0
        max: 15
      - name: NoiseReduction
        type: string
        description: "Off or 1-5"
      - name: TWODNR
        type: string
        description: "Off or 1-5"
      - name: ThreeDNR
        type: string
        description: "Off or 1-5"
      - name: WideDynamicRange
        type: string
        description: "Off or 1-6"
      - name: LowLatency
        type: string
        enum: [On, Off]
      - name: NDFilter
        type: integer
        min: 0
        max: 3
    http:
      method: POST
      path: /birddogpicsetup

  - id: set_colour_matrix
    label: Set Colour Matrix
    kind: action
    params:
      - name: ColourGain
        type: integer
        min: 0
        max: 255
      - name: HuePhase
        type: integer
        min: 0
        max: 255
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
    http:
      method: POST
      path: /birddogcmsetup

  - id: set_advanced
    label: Set Advanced Settings
    kind: action
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

  - id: set_external
    label: Set External Settings
    kind: action
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

  - id: set_detail
    label: Set Detail Settings
    kind: action
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

  - id: set_gamma
    label: Set Gamma Settings
    kind: action
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
      - name: Effect
        type: integer
        min: -3
        max: 3
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
      - name: VisibilityEnhancer
        type: string
        enum: [On, Off]
    http:
      method: POST
      path: /birddoggammasetup

  - id: set_silicon2_codec
    label: Set Silicon2 Codec Settings
    kind: action
    params:
      - name: Protocol
        type: string
        enum: [RTSP, SRT, HX, RTMP, DISABLE]
      - name: BitrateControl
        type: string
        enum: [vbr, cbr]
      - name: ModeSel
        type: string
        enum: [Custom, low, med, high, ultra]
      - name: QuantFactorI
        type: integer
        min: 18
        max: 47
      - name: QuantFactorP
        type: integer
        min: 18
        max: 47
      - name: GOPSize
        type: integer
        min: 1
        max: 59
      - name: Bitrate
        type: integer
        min: 1
        max: 80
    http:
      method: POST
      path: /sil2codec

  - id: set_silicon2_encode
    label: Set Silicon2 Encode/Streaming Settings
    kind: action
    params:
      - name: StreamingProtocol
        type: string
        enum: [RTSP, SRT, HX, RTMP, DISABLE]
    http:
      method: POST
      path: /sil2enc
    note: "Full params include RTSP (Port, StreamName, AuthEnable, UserName, Password), SRT (IPAddress, Port, mode, latency, Encryption, passphrase, pbkeylen, streamid), RTMP (ServerSelection, AuthEnable, StreamKeyLocal, StreamKeyRemote, Server, UserName, Password), HaiVisionPlayerSupport"
```

## Feedbacks
```yaml
feedbacks:
  - id: device_info
    label: Device Info
    type: object
    fields:
      - name: FirmwareVersion
        type: string
      - name: Format
        type: string
        description: "Device manufacturer extended format"
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
        enum: [ONLINE, OFFLINE, CAMERA INITIALIZING, NO VIDEO]
    http:
      method: GET
      path: /about

  - id: hostname
    label: Hostname
    type: string
    http:
      method: GET
      path: /hostname

  - id: hardware_version
    label: Hardware Version
    type: string
    http:
      method: GET
      path: /version

  - id: operation_mode
    label: Operation Mode
    type: string
    enum: [encode, decode]
    http:
      method: GET
      path: /operationmode
    note: "Not present in Flex Encode, Flex Decode, WP Encode, WP Decode, P200/A200/A300, P100/PF120, P4k/P400"

  - id: video_output_interface
    label: Video Output Interface
    type: string
    enum: [sdi, hdmi, LowLatency, NormalMode]
    http:
      method: GET
      path: /videooutputinterface

  - id: analog_audio_setup
    label: Analog Audio Setup
    type: object
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

  - id: encode_transport
    label: NDI Encode Transport Settings
    type: object
    fields:
      - name: Txpm
        type: string
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
    label: NDI Encode Setup
    type: object
    http:
      method: GET
      path: /encodesetup

  - id: connected_ndi_source
    label: Connected NDI Source
    type: object
    fields:
      - name: sourceName
        type: string
    http:
      method: GET
      path: /connectTo

  - id: decode_transport
    label: NDI Decode Transport Settings
    type: object
    fields:
      - name: rxpm
        type: string
    http:
      method: GET
      path: /decodeTransport

  - id: decode_setup
    label: NDI Decode Setup
    type: object
    http:
      method: GET
      path: /decodesetup

  - id: decode_status
    label: NDI Decode Status
    type: object
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

  - id: ndi_source_list
    label: NDI Source List
    type: object
    http:
      method: GET
      path: /List

  - id: ndi_discovery_server
    label: NDI Discovery Server
    type: object
    fields:
      - name: NDIDisServ
        type: string
      - name: NDIDisServIP
        type: string
    http:
      method: GET
      path: /NDIDisServer

  - id: ndi_group_name
    label: NDI Group Name
    type: string
    http:
      method: GET
      path: /NDIGrpName

  - id: off_subnet_source
    label: Off-Subnet Source IP
    type: string
    http:
      method: GET
      path: /NDIOffSnSrc

  - id: ptz_setup
    label: PTZ Speed Settings
    type: object
    fields:
      - name: PanSpeed
        type: string
      - name: TiltSpeed
        type: string
      - name: ZoomSpeed
        type: string
    http:
      method: GET
      path: /birddogptzsetup

  - id: exposure_setup
    label: Exposure Settings
    type: object
    http:
      method: GET
      path: /birddogexpsetup

  - id: white_balance_setup
    label: White Balance Settings
    type: object
    http:
      method: GET
      path: /birddogwbsetup

  - id: picture_setup
    label: Picture Settings
    type: object
    http:
      method: GET
      path: /birddogpicsetup

  - id: colour_matrix_setup
    label: Colour Matrix Settings
    type: object
    http:
      method: GET
      path: /birddogcmsetup

  - id: advanced_setup
    label: Advanced Settings
    type: object
    http:
      method: GET
      path: /birddogadvancesetup

  - id: external_setup
    label: External Settings
    type: object
    http:
      method: GET
      path: /birddogexternalsetup

  - id: detail_setup
    label: Detail Settings
    type: object
    http:
      method: GET
      path: /birddogdetsetup

  - id: gamma_setup
    label: Gamma Settings
    type: object
    http:
      method: GET
      path: /birddoggammasetup

  - id: silicon2_codec
    label: Silicon2 Codec Settings
    type: object
    http:
      method: GET
      path: /birddogsil2codec

  - id: silicon2_encode
    label: Silicon2 Encode/Streaming Settings
    type: object
    http:
      method: GET
      path: /birddogsil2enc
```

## Variables
```yaml
variables:
  - id: audio_input_gain
    label: Analog Audio Input Gain
    type: integer
    min: 0
    max: 100
    endpoint: /analogaudiosetup
    param: AnalogAudioInGain

  - id: audio_output_gain
    label: Analog Audio Output Gain
    type: integer
    min: 0
    max: 100
    endpoint: /analogaudiosetup
    param: AnalogAudioOutGain

  - id: pan_speed
    label: Pan Speed
    type: integer
    min: 0
    max: 21
    endpoint: /birddogptzsetup
    param: PanSpeed

  - id: tilt_speed
    label: Tilt Speed
    type: integer
    min: 0
    max: 18
    endpoint: /birddogptzsetup
    param: TiltSpeed

  - id: zoom_speed
    label: Zoom Speed
    type: integer
    min: 0
    max: 7
    endpoint: /birddogptzsetup
    param: ZoomSpeed

  - id: bandwidth_select
    label: NDI Bandwidth
    type: integer
    min: 60
    max: 360
    endpoint: /encodesetup
    param: BandwidthSelect

  - id: srt_latency
    label: SRT Latency
    type: integer
    min: 80
    max: 8000
    endpoint: /sil2enc
    param: latency
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- The API uses both GET and POST for some operations (reboot, restart, refresh, reset) — both methods produce the same result.
- All parameter values are sent and received as strings, even for numeric ranges.
- Many endpoints accept `ChNum` (channel number, range 1-4) for multi-channel devices like the QUAD.
- Endpoint availability varies by model; source documents exclusions (e.g., "not present in Flex Encode, WP Encode...") but does not provide a definitive inclusion matrix.
- The Silicon2 endpoints (`/sil2codec`, `/sil2enc`) use slightly different paths in POST examples (`/sil2codec` vs `/birddogsil2codec` for GET) — this may be a documentation inconsistency.
- POST bodies use `Content-Type: application/json` for structured params and `Content-Type: text/plain` for simple string values (e.g., operation mode, group name).
- The API version documented is 2.0.0.
<!-- UNRESOLVED: exact model-to-endpoint availability matrix not fully specified -->
<!-- UNRESOLVED: no error response codes or error handling documented -->
<!-- UNRESOLVED: no rate limiting or concurrency guidance documented -->
<!-- UNRESOLVED: RTSP/SRT/RTMP streaming auth parameters (user/pass, passphrase) documented but not the control API auth -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: birddog_converters_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:21:53.998Z
retrieved_at: 2026-04-23T15:21:53.998Z
last_checked_at: 2026-04-23T15:21:53.998Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:21:53.998Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions matched literally to source paths; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
