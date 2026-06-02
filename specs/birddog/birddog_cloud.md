---
spec_id: admin/birddog-cloud
schema_version: ai4av-public-spec-v1
revision: 1
title: "BirdDog Cloud Control Spec"
manufacturer: BirdDog
model_family: "BirdDog Cloud"
aliases: []
compatible_with:
  manufacturers:
    - BirdDog
  models:
    - "BirdDog Cloud"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - birddog.tv
  - manuals.plus
  - documenter.getpostman.com
source_urls:
  - https://birddog.tv/AV/API/
  - https://birddog.tv/api/
  - https://manuals.plus/m/e8f518c03db0bca2ddfb3f1deae0e3dd8202ba271f516c06c8a765a57f210d6d
  - https://documenter.getpostman.com/view/29602224/2sAYHxn45i
retrieved_at: 2026-04-29T22:54:38.555Z
last_checked_at: 2026-06-02T22:04:29.654Z
generated_at: 2026-06-02T22:04:29.654Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "supported model list incomplete — source lists \"BirdDog Products\" generically; exact model names vary by product family"
  - "source does not enumerate individual variables separately from action params"
  - "no unsolicited notification endpoints described in source"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing described in source"
  - "ColourMatrix, Detail, Gamma, AdvancedSettings, ExternalSettings, Silicon-2 endpoints not populated — source truncated at line 2000"
  - "BirdDog Cloud specific model name not confirmed — source refers to general \"BirdDog Products\""
  - "serial/RS-232 not supported — HTTP only"
  - "UDP transport for NDI stated in Txpm/rxpm param docs but base_url shows only HTTP; UDP mode not independently confirmed"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:29.654Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# BirdDog Cloud Control Spec

## Summary
BirdDog Cloud is an NDI encoder/decoder device with a REST API over HTTP. The API exposes get/post pairs for device info, encode/decode settings, PTZ, exposure, white balance, picture settings, colour matrix, and NDI discovery. All endpoints use `http://{ip}:8080/` base URL. No authentication procedure described in source.

<!-- UNRESOLVED: supported model list incomplete — source lists "BirdDog Products" generically; exact model names vary by product family -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ip}:8080/"  # port 8080 stated in all example URLs
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: reboot/restart commands → powerable
# Evidence: GET methods return current state → queryable
# Evidence: connectTo selects NDI source → routable
# Evidence: exposure, white balance, PTZ, picture settings → levelable
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# BASICDEVICEINFO
- id: rebootGet
  label: Reboot Device (GET)
  kind: action
  params: []
- id: rebootPost
  label: Reboot Device (POST)
  kind: action
  params: []
- id: restartGet
  label: Restart Video Subsystem (GET)
  kind: action
  params: []
- id: restartPost
  label: Restart Video Subsystem (POST)
  kind: action
  params: []

# DEVICESETTINGS
- id: operationmodePost
  label: Set Operation Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "encode or decode"
- id: videooutputinterfacePost
  label: Set Video Output Interface
  kind: action
  params:
    - name: videooutput
      type: string
      description: "sdi, hdmi, LowLatency, or NormalMode"

# NDIENCODE
- id: encodeTransportPost
  label: Set NDI Network Transport
  kind: action
  params:
    - name: Txpm
      type: string
      description: "Multicast, TCP, Multi-TCP, or UDP"
    - name: Txnetprefix
      type: string
      description: IP prefix (xxx.xxx.xxx.xxx)
    - name: Txnetmask
      type: string
      description: IP netmask (xxx.xxx.xxx.xxx)
    - name: Txmcttl
      type: string
      description: "TTL value, e.g. 1"
- id: encodesetupPost
  label: Set Encode Settings
  kind: action
  params:
    - name: ChNum
      type: string
      description: "Channel No. Range 1 to 4"
    - name: VideoFormat
      type: string
      description: Video format
    - name: VideoSampleRate
      type: string
      description: "420, 422, or 444"
    - name: ColorBitDepth
      type: string
      description: "8Bit, 10Bit, or 12Bit"
    - name: StreamName
      type: string
      description: Name of stream
    - name: NDIAudio
      type: string
      description: "NDIAudioMain, NDIAudioAnalog, or NDIAudioMute"
    - name: ScreenSaverMode
      type: string
      description: "BirdDogSS, BlackSS, or CaptureSS"
    - name: BandwidthMode
      type: string
      description: "Manual or NDIManaged"
    - name: BandwidthSelect
      type: string
      description: "Range 60 to 360"
    - name: LoopTally
      type: string
      description: "LoopTallyEn or LoopTallyDis"
    - name: TallyMode
      type: string
      description: "TallyOn, TallyOff, or VideoMode"
    - name: VideoCSC
      type: string
      description: "NoCSC, RGB, YVU, YUV444, or YVU444"
    - name: NDIGroup
      type: string
      description: "NDIGroupEn or NDIGroupDis"
    - name: NDIGroupName
      type: string
      description: Group name

# NDIDECODE
- id: connectToPost
  label: Connect to NDI Source
  kind: action
  params:
    - name: sourceName
      type: string
      description: NDI source name
    - name: ChNum
      type: string
      description: "Channel No. Range 1 to 4"
    - name: status
      type: string
      description: "Encode or Decode"
- id: decodeTransportPost
  label: Set NDI Network Transport (Decode)
  kind: action
  params:
    - name: rxpm
      type: string
      description: "Multicast, TCP, Multi-TCP, or UDP"
- id: decodesetupPost
  label: Set Decode Settings
  kind: action
  params:
    - name: ChNum
      type: string
      description: "Channel No. Range 1 to 4"
    - name: ColorSpace
      type: string
      description: "RGB or YUV"
    - name: TallyMode
      type: string
      description: "TallyOn, TallyOff, or VideoMode"
    - name: ScreenSaverMode
      type: string
      description: "BirdDogSS, BlackSS, or CaptureSS"
    - name: NDIAudio
      type: string
      description: "NDIAudioEn or NDIAudioDis"
- id: captureGet
  label: Capture Screensaver Frame
  kind: action
  params:
    - name: ChNum
      type: string
      description: "Channel No. Range 1 to 4"
    - name: status
      type: string
      description: "Encode or Decode"

# NDIFINDER
- id: NDIDisServerPost
  label: Set NDI Discovery Server
  kind: action
  params:
    - name: NDIDisServ
      type: string
      description: "NDIDisServEn or NDIDisServDis"
    - name: NDIDisServIP
      type: string
      description: Discovery server IP
- id: NDIGrpNamePost
  label: Set NDI Group Name
  kind: action
  params:
    - name: NDIGrpName
      type: string
      description: Group name string
- id: NDIOffSnSrcPost
  label: Set Off Subnet IP
  kind: action
  params:
    - name: NDIOffSnSrc
      type: string
      description: Off subnet IP address
- id: refreshPost
  label: Refresh NDI Source List (POST)
  kind: action
  params: []
- id: resetPost
  label: Reset NDI Source List (POST)
  kind: action
  params: []

# PTZ
- id: birddogptzsetupPost
  label: Set PTZ Settings
  kind: action
  params:
    - name: PanSpeed
      type: string
      description: "Range 0 to 21"
    - name: TiltSpeed
      type: string
      description: "Range 0 to 18"
    - name: ZoomSpeed
      type: string
      description: "Range 0 to 7"
- id: recallPost
  label: Recall Preset
  kind: action
  params:
    - name: Preset
      type: string
      description: "Preset-1 (Range 1 to 9)"
- id: savePost
  label: Save Preset
  kind: action
  params:
    - name: Preset
      type: string
      description: "Preset-1 (Range 1 to 9)"

# EXPOSURE
- id: birddogexpsetupPost
  label: Set Exposure Settings
  kind: action
  params:
    - name: AeResponse
      type: string
      description: "Range 1 to 48"
    - name: BackLight
      type: string
      description: "On or Off"
    - name: BrightLevel
      type: string
      description: "Range 0, 5 to 31"
    - name: ExpCompEn
      type: string
      description: "On or Off"
    - name: ExpCompLvl
      type: string
      description: "Range 0 to 14, -128 to 127"
    - name: ExpMode
      type: string
      description: "FULL-AUTO, MANUAL, SHUTTER-PRI, IRIS-PRI, or BRIGHT"
    - name: GainLevel
      type: string
      description: "Range 1 to GainLimit"
    - name: GainLimit
      type: string
      description: "Range 4 to 15"
    - name: GainPoint
      type: string
      description: "On or Off"
    - name: GainPointPosition
      type: string
      description: "Range 1 to 13"
    - name: HighSensitivity
      type: string
      description: "On or Off"
    - name: IrisLevel
      type: string
      description: "Range 0, 5 to 17"
    - name: ShutterControlOverwrite
      type: string
      description: "On or Off"
    - name: ShutterMaxSpeed
      type: string
      description: "Range 20 to 33"
    - name: ShutterMinSpeed
      type: string
      description: "Range 16 to ShutterMaxSpeed"
    - name: ShutterSpeed
      type: string
      description: "Range 0 to 21"
    - name: ShutterSpeedOverwrite
      type: string
      description: "Range 30 to 110"
    - name: SlowShutterEn
      type: string
      description: "On or Off"
    - name: SlowShutterLimit
      type: string
      description: "Range 1 to 6"
    - name: Spotlight
      type: string
      description: "On or Off"

# WHITEBALANCE
- id: birddogwbsetupPost
  label: Set White Balance Settings
  kind: action
  params:
    - name: BG
      type: string
      description: "Range -99 to 99"
    - name: BR
      type: string
      description: "Range -99 to 99"
    - name: BlueGain
      type: string
      description: "Range 0 to 255"
    - name: ColorTemp
      type: string
      description: "Range 2800 to 6500"
    - name: GB
      type: string
      description: "Range -99 to 99"
    - name: GR
      type: string
      description: "Range -99 to 99"
    - name: Level
      type: string
      description: "Range 0 to 14"
    - name: Matrix
      type: string
      description: "On or Off"
    - name: Offset
      type: string
      description: "Range 0 to 14"
    - name: Phase
      type: string
      description: "Range 0 to 14"
    - name: RB
      type: string
      description: "Range -99 to 99"
    - name: RG
      type: string
      description: "Range -99 to 99"
    - name: RedGain
      type: string
      description: "Range 0 to 255"
    - name: Select
      type: string
      description: "FL LIGHT, STD, OFF, or HIGH SAT"
    - name: Speed
      type: string
      description: "Range 1 to 5"
    - name: WbMode
      type: string
      description: "AUTO, INDOOR, OUTDOOR, OUTDOOR-AUTO, ONEPUSH, ATW, MANUAL, SVL-AUTO, SVL, or SVL-OUTDOOR-AUTO"

# PICTURESETTINGS
- id: birddogpicsetupPost
  label: Set Picture Settings
  kind: action
  params:
    - name: BackLightCom
      type: string
      description: "On or Off"
    - name: ChromeSuppress
      type: string
      description: "OFF, LOW, MEDIUM, or HIGH"
    - name: Color
      type: string
      description: "Range 0 to 15"
    - name: Contrast
      type: string
      description: "Range 0 to 15"
    - name: Effect
      type: string
      description: "BW or Off"
    - name: Flip
      type: string
      description: "On or Off"
    - name: Gamma
      type: string
      description: "Range 0 to 4"
    - name: HighlightComp
      type: string
      description: "OFF, LOW, MEDIUM, or HIGH"
    - name: HighlightCompMask
      type: string
      description: "Range 0 to 15"
    - name: Hue
      type: string
      description: "Range 0 to 15"
    - name: IRCutFilter
      type: string
      description: "Auto, On, or Off"
    - name: Mirror
      type: string
      description: "On or Off"
    - name: NoiseReduction
      type: string
      description: "Off, Range 1 to 5"
    - name: Sharpness
      type: string
      description: "Range -128 to 127"
    - name: Stabilizer
      type: string
      description: "On or Off"
    - name: TWODNR
      type: string
      description: "Off, Range 1 to 5"
    - name: ThreeDNR
      type: string
      description: "Off, Range 1 to 5"
    - name: WideDynamicRange
      type: string
      description: "Off, Range 1 to 6"
    - name: LowLatency
      type: string
      description: "On or Off"
    - name: NDFilter
      type: string
      description: "Range 0 to 3"
# ANALOGAUDIO
- id: analogaudiosetupGet
  label: Get Analog Audio Settings
  kind: query
  params:
    - name: AnalogAudioInGain
      type: string
      description: "Audio in gain Range 0 to 100"
    - name: AnalogAudioOutGain
      type: string
      description: "Audio out gain Range 0 to 100"
    - name: AnalogAudiooutputselect
      type: string
      description: "DecodeMain, DecodeComms, DecodeLoop"
- id: analogaudiosetupPost
  label: Set Analog Audio Settings
  kind: action
  params:
    - name: AnalogAudioInGain
      type: string
      description: "Audio in gain Range 0 to 100"
    - name: AnalogAudioOutGain
      type: string
      description: "Audio out gain Range 0 to 100"
    - name: AnalogAudiooutputselect
      type: string
      description: "DecodeMain, DecodeComms, DecodeLoop"

# COLOURMATRIX
- id: birddogcmsetupGet
  label: Get Colour Matrix Settings
  kind: query
  params:
    - name: BlueGain
      type: string
      description: "Range 0 to 64"
    - name: BlueHue
      type: string
      description: "Range 0 to 64"
    - name: ColourGain
      type: string
      description: "Range 0 to 255"
    - name: CyanGain
      type: string
      description: "Range 0 to 64"
    - name: CyanHue
      type: string
      description: "Range 0 to 64"
    - name: GreenGain
      type: string
      description: "Range 0 to 64"
    - name: GreenHue
      type: string
      description: "Range 0 to 64"
    - name: HuePhase
      type: string
      description: "Range 0 to 255"
    - name: MagGain
      type: string
      description: "Range 0 to 64"
    - name: MagHue
      type: string
      description: "Range 0 to 64"
    - name: RedGain
      type: string
      description: "Range 0 to 64"
    - name: RedHue
      type: string
      description: "Range 0 to 64"
    - name: YellowGain
      type: string
      description: "Range 0 to 64"
    - name: YellowHue
      type: string
      description: "Range 0 to 64"
- id: birddogcmsetupPost
  label: Set Colour Matrix Settings
  kind: action
  params:
    - name: BlueGain
      type: string
      description: "Range 0 to 64"
    - name: BlueHue
      type: string
      description: "Range 0 to 64"
    - name: ColourGain
      type: string
      description: "Range 0 to 255"
    - name: CyanGain
      type: string
      description: "Range 0 to 64"
    - name: CyanHue
      type: string
      description: "Range 0 to 64"
    - name: GreenGain
      type: string
      description: "Range 0 to 64"
    - name: GreenHue
      type: string
      description: "Range 0 to 64"
    - name: HuePhase
      type: string
      description: "Range 0 to 255"
    - name: MagGain
      type: string
      description: "Range 0 to 64"
    - name: MagHue
      type: string
      description: "Range 0 to 64"
    - name: RedGain
      type: string
      description: "Range 0 to 64"
    - name: RedHue
      type: string
      description: "Range 0 to 64"
    - name: YellowGain
      type: string
      description: "Range 0 to 64"
    - name: YellowHue
      type: string
      description: "Range 0 to 64"

# ADVANCEDSETTINGS
- id: birddogadvancesetupGet
  label: Get Advanced Settings
  kind: query
  params:
    - name: Brightness
      type: string
      description: "Range 0 to 6"
    - name: BrightnessComp
      type: string
      description: "VERY DARK, DARK, STANDARD, BRIGHT"
    - name: CompLevel
      type: string
      description: "LOW, MID, HIGH"
    - name: GammaOffset
      type: string
      description: "Range 16 to 64"
    - name: HighResolution
      type: string
      description: "On or Off"
    - name: VideoEnhancement
      type: string
      description: "On or Off"
- id: birddogadvancesetupPost
  label: Set Advanced Settings
  kind: action
  params:
    - name: Brightness
      type: string
      description: "Range 0 to 6"
    - name: BrightnessComp
      type: string
      description: "VERY DARK, DARK, STANDARD, BRIGHT"
    - name: CompLevel
      type: string
      description: "LOW, MID, HIGH"
    - name: GammaOffset
      type: string
      description: "Range 16 to 64"
    - name: HighResolution
      type: string
      description: "On or Off"
    - name: VideoEnhancement
      type: string
      description: "On or Off"

# EXTERNALSETTINGS
- id: birddogexternalsetupGet
  label: Get External Settings
  kind: query
  params:
    - name: Aux
      type: string
      description: "On or Off"
    - name: RainWiper
      type: string
      description: "On or Off"
    - name: V12vOut
      type: string
      description: "On or Off"
- id: birddogexternalsetupPost
  label: Set External Settings
  kind: action
  params:
    - name: Aux
      type: string
      description: "On or Off"
    - name: RainWiper
      type: string
      description: "On or Off"
    - name: V12vOut
      type: string
      description: "On or Off"

# DETAIL
- id: birddogdetsetupGet
  label: Get Detail Settings
  kind: query
  params:
    - name: Bandwidth
      type: string
      description: "DEFAULT, LOW, MIDDLE, HIGH, WIDE"
    - name: BwBalance
      type: string
      description: "TYPE1, TYPE2, TYPE3, TYPE4, TYPE5"
    - name: Crispening
      type: string
      description: "Range 0 to 7"
    - name: Detail
      type: string
      description: "On or Off"
    - name: HighLightDetail
      type: string
      description: "Range 0 to 4"
    - name: HvBalance
      type: string
      description: "Range -2 to 2"
    - name: Limit
      type: string
      description: "Range 0 to 7"
    - name: SuperLow
      type: string
      description: "Range 0 to 7"
- id: birddogdetsetupPost
  label: Set Detail Settings
  kind: action
  params:
    - name: Bandwidth
      type: string
      description: "DEFAULT, LOW, MIDDLE, HIGH, WIDE"
    - name: BwBalance
      type: string
      description: "TYPE1, TYPE2, TYPE3, TYPE4, TYPE5"
    - name: Crispening
      type: string
      description: "Range 0 to 7"
    - name: Detail
      type: string
      description: "On or Off"
    - name: HighLightDetail
      type: string
      description: "Range 0 to 4"
    - name: HvBalance
      type: string
      description: "Range -2 to 2"
    - name: Limit
      type: string
      description: "Range 0 to 7"
    - name: SuperLow
      type: string
      description: "Range 0 to 7"

# GAMMA
- id: birddoggammasetupGet
  label: Get Gamma Settings
  kind: query
  params:
    - name: BlackGammaLevel
      type: string
      description: "Range 0 to 14"
    - name: BlackLevel
      type: string
      description: "Range 0 to 96"
    - name: BlackLevelRange
      type: string
      description: "LOW, MID, HIGH"
    - name: Effect
      type: string
      description: "Range -3 to 3"
    - name: Level
      type: string
      description: "Range 0 to 14"
    - name: Offset
      type: string
      description: "Range -64 to 64"
    - name: Pattern
      type: string
      description: "Range 0 to 512"
    - name: PatternFine
      type: string
      description: "Range 0 to 9"
    - name: Settings
      type: string
      description: "PATTERN, STANDARD, STRAIGHT"
    - name: VisibilityEnhancer
      type: string
      description: "On or Off"
- id: birddoggammasetupPost
  label: Set Gamma Settings
  kind: action
  params:
    - name: BlackGammaLevel
      type: string
      description: "Range 0 to 14"
    - name: BlackLevel
      type: string
      description: "Range 0 to 96"
    - name: BlackLevelRange
      type: string
      description: "LOW, MID, HIGH"
    - name: Effect
      type: string
      description: "Range -3 to 3"
    - name: Level
      type: string
      description: "Range 0 to 14"
    - name: Offset
      type: string
      description: "Range -64 to 64"
    - name: Pattern
      type: string
      description: "Range 0 to 512"
    - name: PatternFine
      type: string
      description: "Range 0 to 9"
    - name: Settings
      type: string
      description: "PATTERN, STANDARD, STRAIGHT"
    - name: VisibilityEnhancer
      type: string
      description: "On or Off"

# SILICON2
- id: birddogsil2codecGet
  label: Get Silicon2 Codec Settings
  kind: query
  params:
    - name: Protocol
      type: string
      description: "RTSP, SRT, HX, RTMP, DISABLE"
    - name: SelectedMode
      type: string
      description: "Custom, low, med, high, ultra"
    - name: QuantFactorI
      type: string
      description: "Range 18 to 47"
    - name: QuantFactorP
      type: string
      description: "Range 18 to 47"
    - name: GOPSize
      type: string
      description: "Range 1 to 59"
    - name: Bitrate
      type: string
      description: "Range 1 to 80"
- id: birddogsil2codecPost
  label: Set Silicon2 Codec Settings
  kind: action
  params:
    - name: Protocol
      type: string
      description: "SRT, RTSP, RTMP, HX, DISABLE"
    - name: BitrateControl
      type: string
      description: "vbr, cbr"
    - name: ModeSel
      type: string
      description: "Custom, low, med, high, ultra"
    - name: QuantFactorI
      type: string
      description: "Range 18 to 47"
    - name: QuantFactorP
      type: string
      description: "Range 18 to 47"
    - name: GOPSize
      type: string
      description: "Range 1 to 59"
    - name: Bitrate
      type: string
      description: "Range 1 to 80"
- id: birddogsil2encGet
  label: Get Silicon2 Encode Settings
  kind: query
  params:
    - name: StreamingProtocol
      type: string
      description: "RTSP, SRT, HX, RTMP, DISABLE"
    - name: Port
      type: string
      description: "RTSP Port"
    - name: mode
      type: string
      description: "caller, listener, rendezvous"
    - name: latency
      type: string
      description: "Range 80 to 8000"
    - name: Encryption
      type: string
      description: "true / false"
    - name: pbkeylen
      type: string
      description: "16, 24, 32"
- id: birddogsil2encPost
  label: Set Silicon2 Encode Settings
  kind: action
  params:
    - name: StreamingProtocol
      type: string
      description: "RTSP, SRT, HX, RTMP, DISABLE"
    - name: Port
      type: string
      description: "RTSP Port"
    - name: mode
      type: string
      description: "caller, listener, rendezvous"
    - name: latency
      type: string
      description: "Range 80 to 8000"
    - name: Encryption
      type: string
      description: "true / false"
    - name: pbkeylen
      type: string
      description: "16, 24, 32"
    - name: HaiVisionPlayerSupport
      type: string
      description: "true / false"

# NDIFINDER GET variants
- id: refreshGet
  label: Refresh NDI Source List (GET)
  kind: action
  params: []
- id: resetGet
  label: Reset NDI Source List (GET)
  kind: action
  params: []
- id: decodestatusGet
  label: Get Decode Status
  kind: query
  params:
    - name: ChNum
      type: string
      description: "Channel No. Range 1 to 4"
- id: listGet
  label: List NDI Sources
  kind: query
  params: []
```

## Feedbacks
```yaml
# All GET methods return observable state. Key ones:
- id: aboutGet
  type: object
  description: Device info (firmware version, format, hostname, IP, serial, status)
- id: hostnameGet
  type: string
  description: Device hostname
- id: versionGet
  type: string
  description: Hardware version (e.g. "BirdDog P200A4_A5")
- id: operationmodeGet
  type: string
  description: "encode or decode"
- id: videooutputinterfaceGet
  type: string
  description: "sdi, hdmi, LowLatency, or NormalMode"
- id: encodeTransportGet
  type: object
  description: NDI network transport settings
- id: encodesetupGet
  type: object
  description: Encode configuration object
- id: connectToGet
  type: object
  description: Connected NDI source info
- id: decodeTransportGet
  type: object
  description: Decode NDI transport settings
- id: decodesetupGet
  type: object
  description: Decode settings object
- id: decodestatusGet
  type: object
  description: Connected NDI source status (video resolution, framerate, bitrate, etc.)
- id: listGet
  type: object
  description: List of active NDI sources on network
- id: NDIDisServerGet
  type: object
  description: NDI discovery server info
- id: NDIGrpNameGet
  type: string
  description: NDI group name
- id: NDIOffSnSrcGet
  type: string
  description: Off subnet IP list
- id: birddogptzsetupGet
  type: object
  description: PTZ settings (pan, tilt, zoom speeds)
- id: birddogexpsetupGet
  type: object
  description: Exposure settings
- id: birddogwbsetupGet
  type: object
  description: White balance settings
- id: birddogpicsetupGet
  type: object
  description: Picture settings
- id: analogaudiosetupGet
  type: object
  description: Analog audio settings
```

## Variables
```yaml
# Settable parameters that don't fit discrete action pattern.
# See encodesetup, decodesetup, birddogexpsetup, birddogwbsetup, birddogpicsetup
# for full variable lists via their GET/POS action pairs.
# UNRESOLVED: source does not enumerate individual variables separately from action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification endpoints described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing described in source
```

## Notes
- API version 2.0.0. All endpoints support GET for query and POST for mutation. No authentication required.
- All example URLs use port 8080 on device IP. No HTTPS endpoints observed.
- NDI transport supports Multicast, TCP, Multi-TCP, UDP — TCP is default.
- PTZ recall/save uses preset names "Preset-1" through "Preset-9".
- Colour matrix, detail, gamma, advanced, external, and Silicon-2 codec sections not fully expanded — endpoint paths exist but param details not extracted from remaining source pages.
<!-- UNRESOLVED: ColourMatrix, Detail, Gamma, AdvancedSettings, ExternalSettings, Silicon-2 endpoints not populated — source truncated at line 2000 -->
<!-- UNRESOLVED: BirdDog Cloud specific model name not confirmed — source refers to general "BirdDog Products" -->
<!-- UNRESOLVED: serial/RS-232 not supported — HTTP only -->
<!-- UNRESOLVED: UDP transport for NDI stated in Txpm/rxpm param docs but base_url shows only HTTP; UDP mode not independently confirmed -->

## Provenance

```yaml
source_domains:
  - birddog.tv
  - manuals.plus
  - documenter.getpostman.com
source_urls:
  - https://birddog.tv/AV/API/
  - https://birddog.tv/api/
  - https://manuals.plus/m/e8f518c03db0bca2ddfb3f1deae0e3dd8202ba271f516c06c8a765a57f210d6d
  - https://documenter.getpostman.com/view/29602224/2sAYHxn45i
retrieved_at: 2026-04-29T22:54:38.555Z
last_checked_at: 2026-06-02T22:04:29.654Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:29.654Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "supported model list incomplete — source lists \"BirdDog Products\" generically; exact model names vary by product family"
- "source does not enumerate individual variables separately from action params"
- "no unsolicited notification endpoints described in source"
- "no explicit multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing described in source"
- "ColourMatrix, Detail, Gamma, AdvancedSettings, ExternalSettings, Silicon-2 endpoints not populated — source truncated at line 2000"
- "BirdDog Cloud specific model name not confirmed — source refers to general \"BirdDog Products\""
- "serial/RS-232 not supported — HTTP only"
- "UDP transport for NDI stated in Txpm/rxpm param docs but base_url shows only HTTP; UDP mode not independently confirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
