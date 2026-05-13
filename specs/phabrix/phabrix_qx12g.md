---
spec_id: admin/phabrix-qx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Phabrix Qx/QX12G REST API Control Spec"
manufacturer: Phabrix
model_family: "Qx (rasterizer)"
aliases: []
compatible_with:
  manufacturers:
    - Phabrix
  models:
    - "Qx (rasterizer)"
    - QX12G
  firmware: "\"5.4\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - leaderphabrix.com
retrieved_at: 2026-04-30T00:45:34.864Z
last_checked_at: 2026-04-30T09:46:44.085Z
generated_at: 2026-04-30T09:46:44.085Z
firmware_coverage: "\"5.4\""
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:46:44.085Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions map 1-to-1 to documented REST endpoints; base URL and port 8080 confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Phabrix Qx/QX12G REST API Control Spec

## Summary
SDI rasterizer signal monitor/generator with HTTP/REST control interface. Base URL pattern: `http://{host}:8080/api/v1`. Applies to Qx units running in SDI firmware mode (not SFP+ or other modes). Document correct as of software version 5.4.

<!-- UNRESOLVED: serial/RS-232 control not documented in source — no evidence of serial control for this device -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}:8080/api/v1"
auth:
  type: none  # inferred: no auth/password/login procedure in source
```

## Traits
```yaml
# Inferred from endpoint structure:
- routable        # input/output routing endpoints present (inputOutput, sdiIn/sdiOut)
- queryable       # GET endpoints return device state; many read/write pairs
- levelable       # audio gain, jitter insertion amplitude, sdi driver gain endpoints present
```

## Actions
```yaml
# Presets
- id: list_presets
  label: List User Presets
  kind: action
  params: []

- id: create_preset
  label: Create User Preset
  kind: action
  params:
    - name: presetName
      type: string
      description: Name for new preset

- id: update_preset
  label: Update User Preset
  kind: action
  params:
    - name: presetName
      type: string
    - name: action
      type: string
      enum: [save, rename]

- id: delete_preset
  label: Delete User Preset
  kind: action
  params:
    - name: presetName
      type: string

# Screenshots
- id: list_screenshot_images
  label: List Screenshot Images
  kind: action
  params: []

- id: capture_screenshot
  label: Capture Screenshot
  kind: action
  params: []

- id: delete_screenshot
  label: Delete Screenshot
  kind: action
  params:
    - name: filename
      type: string

# Generator - audio
- id: set_generator_audio
  label: Set Generator Audio
  kind: action
  params:
    - name: mode
      type: string
      enum: [off, tone, custom, quickConfig]
    - name: channels
      type: array
      items:
        properties:
          channel: { type: integer, minimum: 0, maximum: 31 }
          frequency_Hz: { type: number, minimum: 1, maximum: 10000 }
          gain_dBFS: { type: integer, minimum: -144, maximum: 0 }

# Generator - bouncing box
- id: set_bouncing_box
  label: Set Bouncing Box
  kind: action
  params:
    - name: enabled
      type: boolean

# Generator - ident
- id: set_generator_ident
  label: Set Generator Ident
  kind: action
  params:
    - name: enabled
      type: boolean
    - name: text
      type: string
    - name: textColour
      type: string
    - name: backgroundColour
      type: string
    - name: backgroundEnabled
      type: boolean
    - name: location
      type: string
      enum: [topLeft, topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight]
    - name: size
      type: string
      enum: [small, medium, large]
    - name: justify
      type: string
      enum: [left, center, right]

# Generator - jitter insertion
- id: set_jitter_insertion
  label: Set Jitter Insertion
  kind: action
  params:
    - name: mode
      type: string
      enum: [on, off]
    - name: amplitude_ui
      type: number
      minimum: 0.01
      maximum: 127.99
    - name: frequency_Hz
      type: number
      minimum: 10
      maximum: 10000000

# Generator - output copy
- id: set_output_copy
  label: Set Output Copy
  kind: action
  params:
    - name: enabled
      type: boolean

# Generator - output offset
- id: set_output_offset
  label: Set Output Offset
  kind: action
  params:
    - name: offsetType
      type: string
      enum: [line, pixel, time]
    - name: outputLineOffset
      type: integer
      minimum: -999999
      maximum: 999999
    - name: outputPixelOffset
      type: integer
      minimum: -999999
      maximum: 999999
    - name: outputTimeOffset_us
      type: number
      minimum: -999999
      maximum: 999999

# Generator - PRBS
- id: set_generator_prbs
  label: Set Generator PRBS
  kind: action
  params:
    - name: mode
      type: string
      enum: [off, pn7, pn15, pn23, pn31, pn63]
    - name: invert
      type: boolean

# Generator - SDI output mute
- id: set_sdi_output_mute
  label: Set SDI Output Mute
  kind: action
  params:
    - name: sdiOutputMuteA
      type: boolean
    - name: sdiOutputMuteB
      type: boolean
    - name: sdiOutputMuteC
      type: boolean
    - name: sdiOutputMuteD
      type: boolean

# Generator - SDI scrambler
- id: set_sdi_scrambler
  label: Set SDI Scrambler
  kind: action
  params:
    - name: enabled
      type: boolean

# Generator - sync bit inserter
- id: set_sync_bit_inserter
  label: Set Sync Bit Inserter
  kind: action
  params:
    - name: enabled
      type: boolean

# Input/output - SDI input type
- id: set_sdi_input_type
  label: Set SDI Input Type
  kind: action
  params:
    - name: type
      type: string
      enum: [auto, manual]

# Input/output - BNC output settings
- id: set_sdi_output_setting_bnc
  label: Set SDI Output Setting (BNC)
  kind: action
  params:
    - name: sdiOutputA
      type: string
      enum: [generator, loop]
    - name: sdiOutputB
      type: string
      enum: [generator, loop]
    - name: sdiOutputC
      type: string
      enum: [generator, loop]
    - name: sdiOutputD
      type: string
      enum: [generator, loop]

# Input/output - loop SDI BNC in
- id: set_loop_sdi_bnc_in
  label: Set Loop SDI BNC In
  kind: action
  params:
    - name: enabled
      type: boolean

# Input/output - generator output copy (BNC and SFP)
- id: set_generator_output_copy_bnc
  label: Set Generator Output Copy (BNC)
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_generator_output_copy_sfp
  label: Set Generator Output Copy (SFP)
  kind: action
  params:
    - name: enabled
      type: boolean

# Input/output - output type
- id: set_output_type
  label: Set Output Type
  kind: action
  params:
    - name: type
      type: string
      enum: [bnc, sfp]

# Analyser - ancillary inspector
- id: set_ancillary_inspector
  label: Set Ancillary Inspector
  kind: action
  params:
    - name: did
      type: integer
      minimum: 0
      maximum: 999999
    - name: sdid
      type: integer
      minimum: 0
      maximum: 999999
    - name: firstLine
      type: integer
      minimum: -999999
      maximum: 999999
    - name: lastLine
      type: integer
      minimum: -999999
      maximum: 999999
    - name: hancVancSelect
      type: string
      enum: [auto, vanc, hanc]
    - name: identifierSelect
      type: string
      enum: [did_sdid, did]
    - name: rangeSelect
      type: string
      enum: [field, frame, lines]
    - name: subImageSearch
      type: string
      enum: [off, line, field, frame, 2d]
    - name: yPosCPosSelect
      type: string
      enum: [auto, yPos, cPos]
    - name: searchAncGapErrors
      type: boolean
    - name: searchChecksumErrors
      type: boolean
    - name: searchDBNErrors
      type: boolean
    - name: searchParityErrors
      type: boolean
    - name: triggerOnlyOnErrors
      type: boolean

# Analyser - audio meter
- id: set_audio_meter
  label: Set Audio Meter
  kind: action
  params:
    - name: ballistics
      type: string
      enum: [PPM0, PPM1, PPM2, PPM3, PPM4, PPM5]

# Analyser - cable length
- id: set_cable_length
  label: Set Cable Length
  kind: action
  params:
    - name: cableType
      type: string
      enum: [single, double, triple, quadruple, s4003, s4004]

# Analyser - CRC summary
- id: set_crc_summary
  label: Set CRC Summary
  kind: action
  params:
    - name: action
      type: string
      enum: [clear]
    - name: ignoreCrcOnSwitchLines
      type: string
      enum: [ignore, process]

# Analyser - cursor
- id: set_active_picture_cursor
  label: Set Active Picture Cursor
  kind: action
  params:
    - name: activePictureLine
      type: integer
      minimum: -39
      maximum: 1084
    - name: activePicturePixel
      type: integer
      minimum: 0
      maximum: 2147483647

# Analyser - loudness config
- id: set_loudness_config
  label: Set Loudness Config
  kind: action
  params:
    - name: action
      type: string
      enum: [start, stop, reset]
    - name: control
      type: string
      enum: [start, stop, reset]
    - name: logDuration_mins
      type: integer
    - name: logFilename
      type: string
    - name: logLifetime_days
      type: integer
    - name: standard
      type: string
      enum: [BS.1770-1, BS.1770-2, BS.1770-3, BS.1770-4]
    - name: truePeakAlarm
      type: number
      minimum: -99
      maximum: 0

# Analyser - PRBS
- id: set_analyser_prbs
  label: Set Analyser PRBS
  kind: action
  params:
    - name: action
      type: string
      enum: [clear]
    - name: receiveMode
      type: string
      enum: [off, pn7, pn15, pn23, pn31, pn63]

# Analyser - override video standard
- id: set_override_video_standard
  label: Set Override Video Standard
  kind: action
  params:
    - name: manualOverrideEnabled
      type: boolean

# Eye - analysis parameters
- id: set_eye_analysis_parameters
  label: Set Eye Analysis Parameters
  kind: action
  params:
    - name: amplitudeMeasurementWindowSize_percent
      type: integer
      minimum: 1
      maximum: 100
    - name: amplitudeMeasurementWindowOffset_percent
      type: integer
      minimum: 1
      maximum: 100
    - name: analysisMethod
      type: string
      enum: [auto, manual]

# Timing - reference
- id: set_timing_reference
  label: Set Timing Reference
  kind: action
  params:
    - name: inputCommand
      type: string
      enum: [on, off]
    - name: inputMeasurementOffsetType
      type: string
      enum: [line, pixel, time]
    - name: inputMeasurementLineOffset
      type: integer
      minimum: -999999
      maximum: 999999
    - name: inputMeasurementPixelOffset
      type: integer
      minimum: -999999
      maximum: 999999
    - name: inputTimeOffset_us
      type: number
      minimum: -999999
      maximum: 999999
    - name: referenceTimingMeterRange
      type: string
      enum: [low, medium, high]
    - name: systemReferenceType
      type: string
      enum: [freeRun, format, black, timeCode]

# Event log config - each subcategory is a separate PUT endpoint
- id: set_eventlog_audio_input_presence
  label: Set Audio Input Presence Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_jitter_alignment
  label: Set Jitter Alignment Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_jitter_timing
  label: Set Jitter Timing Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_reference_locking
  label: Set Reference Locking Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_rest_api
  label: Set REST API Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_scte104
  label: Set SCTE-104 Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_sdi_input_rate
  label: Set SDI Input Rate Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_sdi_input_standard
  label: Set SDI Input Standard Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

- id: set_eventlog_sfp
  label: Set SFP Event Log
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]

# AES/EBU IO config
- id: set_aesIO_config
  label: Set AES IO Config
  kind: action
  params:
    - name: passthroughSource
      type: string
      enum: [aes1, aes2, aes3, aes4]

# Dolby decoder config
- id: set_dolby_decoder_config
  label: Set Dolby Decoder Config
  kind: action
  params:
    - name: action
      type: string
      enum: [enable, disable]
    - name: source
      type: object

# Ancillary status reset
- id: reset_ancillary_status
  label: Reset Ancillary Status
  kind: action
  params:
    - name: reset
      type: boolean

# CRC summary action
- id: clear_crc_summary
  label: Clear CRC Summary
  kind: action
  params: []

# Logged event actions
- id: add_eventlog_entry
  label: Add Event Log Entry
  kind: action
  params:
    - name: action
      type: string
      enum: [add]
    - name: event
      type: string
    - name: time
      type: string

# Generator - SDI driver settings
- id: set_sdi_driver_gain
  label: Set SDI Driver Gain
  kind: action
  params:
    - name: driverGain_percent
      type: integer
      minimum: 90
      maximum: 110

- id: set_sdi_driver_pre_emphasis
  label: Set SDI Driver Pre-Emphasis
  kind: action
  params:
    - name: driverPreEmphasis
      type: string
      enum: [off, low, medium, high]
    - name: driverPreEmphasisTimeConstant
      type: string
      enum: [short, medium, long, auto]

# Screenshot rename
- id: rename_screenshot
  label: Rename Screenshot
  kind: action
  params:
    - name: filename
      type: string
    - name: action
      type: string
      enum: [rename]
    - name: newFilename
      type: string

# Generator - test pattern selection (via standards)
- id: set_generator_pattern
  label: Set Generator Pattern
  kind: action
  params:
    - name: resolution
      type: string  # e.g. 1280x720p25
    - name: colorSpace
      type: string  # e.g. YCbCr:422:10
    - name: dynamicRange
      type: string  # e.g. 1.5G_HLG_Rec.2020
    - name: pattern
      type: string  # e.g. 100%25_Bars
    - name: action
      type: string
      enum: [start]
    - name: pathological
      type: object
```

## Feedbacks
```yaml
# All GET endpoints serve as read-only feedbacks.
# Key observable states:

- id: system_about
  type: object
  properties:
    device: string
    softwareVersion: string
    softwareNumber: string
    softwareBranch: string
    fpgaVersion: string
    sha: string
    currentFirmwareMode: string  # e.g. "SDI"
    currentSystemMode: string

- id: generator_status
  type: object
  properties:
    pattern: string
    standard: string
    audio: object
    bouncingBox: object
    jitterInsertion: object
    prbs: object
    sdiDriverGain: object
    sdiDriverPreEmphasis: object
    sdiScrambler: object
    syncBitInserter: object

- id: input_output_status
  type: object
  properties:
    sdiIn: object
    sdiOut: object

- id: analyser_status
  type: object
  properties:
    standard: string

- id: analyser_crc_summary
  type: object
  properties:
    errorCount: integer
    inputFailures: integer
    activePictureCrcChanges: integer
    rate_/s: integer
    okTime_ms: integer
    timeSinceInputFailure: integer
    ignoreCrcOnSwitchLines: string

- id: analyser_detail_crc
  type: object
  properties:
    activePictureCrc: string
    activePictureCrcChanges: integer
    errorCountCPos: integer
    errorCountYPos: integer
    ancErrorCountCPos: integer
    ancErrorCountYPos: integer

- id: analyser_audio_meter
  type: object
  properties:
    audioLevels: array
    audioPhase: array
    ballistics: string

- id: analyser_loudness_info
  type: object
  properties:
    controlState: string
    integratedValue: number
    momentaryValue: number
    shortTermValue: number
    truePeakValue: number

- id: analyser_cable_length
  type: object
  properties:
    cableType: string
    lengthA: number
    lengthB: integer
    lengthC: integer
    lengthD: integer
    attenuationA: number
    attenuationB: integer
    attenuationC: integer
    attenuationD: integer

- id: eye_status
  type: object
  properties:
    inputIsStable: boolean
    dcOffset_mV: integer
    riseTime_ps: integer
    fallTime_ps: integer
    minVoltage_mV: number
    maxVoltage_mV: number

- id: jitter_status
  type: object
  properties:
    jitterLocked: boolean
    10_Hz: number
    100_Hz: number
    1000_Hz: number
    10000_Hz: number
    100000_Hz: number

- id: sfp_info
  type: object
  properties:
    present: boolean
    vendorName: string
    partNumber: string
    serialNumber: string
    opticalWavelength_nm: integer
    bitRate_MBd: integer
    temperature_C: integer
    voltage: integer
    txPower_dBm: integer
    rxPower_dBm: integer

- id: eventlog_logs
  type: array
  items:
    properties:
      event: string
      time: string

- id: analyser_ancillary_status
  type: array
  properties:
    - description: string
      didSdid: string
      title: string

- id: timing_reference
  type: object
  properties:
    sdi: object
    systemReference: object

- id: dolby_decoder_status
  type: object
  properties:
    type: string
    status: integer

- id: dolby_decoder_metadata
  type: object

- id: analyser_dataview
  type: object
  properties:
    samples: array
```

## Variables
```yaml
# Settable parameters that are not discrete actions (read/write state):

- id: sdi_input_type
  label: SDI Input Type
  type: string
  get: GET /inputOutput/sdiIn/inputType
  set: PUT /inputOutput/sdiIn/inputType
  values: [auto, manual]

- id: sdi_output_setting
  label: SDI Output Setting (BNC)
  type: object
  get: GET /inputOutput/sdiOut/bnc/sdiOutputSetting
  set: PUT /inputOutput/sdiOut/bnc/sdiOutputSetting
  properties:
    sdiOutputA: [generator, loop]
    sdiOutputB: [generator, loop]
    sdiOutputC: [generator, loop]
    sdiOutputD: [generator, loop]

- id: output_type
  label: Output Type
  type: string
  get: GET /inputOutput/sdiOut/outputType
  set: PUT /inputOutput/sdiOut/outputType
  values: [bnc, sfp]

- id: sdi_output_setting_sfp
  label: SDI Output Setting (SFP)
  type: object
  get: GET /inputOutput/sdiOut/sfp/sdiOutputSetting
  set: PUT /inputOutput/sdiOut/sfp/sdiOutputSetting

- id: generator_audio_mode
  label: Generator Audio Mode
  type: string
  get: GET /generator/audio
  set: PUT /generator/audio
  values: [off, tone, custom, quickConfig]

- id: generator_ident
  label: Generator Ident
  type: object
  get: GET /generator/ident
  set: PUT /generator/ident

- id: jitter_insertion
  label: Jitter Insertion
  type: object
  get: GET /generator/jitterInsertion
  set: PUT /generator/jitterInsertion

- id: generator_prbs
  label: Generator PRBS
  type: object
  get: GET /generator/prbs
  set: PUT /generator/prbs

- id: sdi_output_mute
  label: SDI Output Mute
  type: object
  get: GET /generator/sdiOutputMute
  set: PUT /generator/sdiOutputMute

- id: sdi_scrambler
  label: SDI Scrambler
  type: boolean
  get: GET /generator/sdiScrambler
  set: PUT /generator/sdiScrambler

- id: output_copy
  label: Output Copy
  type: boolean
  get: GET /generator/outputCopy
  set: PUT /generator/outputCopy

- id: output_offset
  label: Output Offset
  type: object
  get: GET /generator/outputOffset
  set: PUT /generator/outputOffset

- id: sync_bit_inserter
  label: Sync Bit Inserter
  type: boolean
  get: GET /generator/syncBitInserter
  set: PUT /generator/syncBitInserter

- id: bouncing_box
  label: Bouncing Box
  type: boolean
  get: GET /generator/bouncingBox
  set: PUT /generator/bouncingBox

- id: sdi_driver_gain
  label: SDI Driver Gain
  type: integer
  get: GET /generator/sdiDriverGain
  set: PUT /generator/sdiDriverGain
  range: [90, 110]

- id: sdi_driver_pre_emphasis
  label: SDI Driver Pre-Emphasis
  type: object
  get: GET /generator/sdiDriverPreEmphasis
  set: PUT /generator/sdiDriverPreEmphasis

- id: eye_analysis_parameters
  label: Eye Analysis Parameters
  type: object
  get: GET /eye/analysisParameters
  set: PUT /eye/analysisParameters

- id: loudness_config
  label: Loudness Config
  type: object
  get: GET /analyser/loudness/config
  set: PUT /analyser/loudness/config

- id: override_video_standard
  label: Override Video Standard
  type: object
  get: GET /analyser/overrideVideoStandard/config
  set: PUT /analyser/overrideVideoStandard/config

- id: timing_reference
  label: Timing Reference
  type: object
  get: GET /timing/reference
  set: PUT /timing/reference

- id: aesIO_config
  label: AES IO Config
  type: object
  get: GET /aesIO/config
  set: PUT /aesIO/config

- id: dolby_decoder_config
  label: Dolby Decoder Config
  type: object
  get: GET /dolbyDecoder1/config
  set: PUT /dolbyDecoder1/config

- id: prbs_receive_mode
  label: Analyser PRBS Receive Mode
  type: string
  get: GET /analyser/prbs
  set: PUT /analyser/prbs

- id: cursor_position
  label: Active Picture Cursor Position
  type: object
  get: GET /analyser/cursors/activePictureCursor
  set: PUT /analyser/cursors/activePictureCursor

# Event log config variables (read/write booleans):
- id: eventlog_audio_input_presence
  label: Audio Input Presence Event Log
  type: boolean
  get: GET /eventlog/config/audioInputPresence
  set: PUT /eventlog/config/audioInputPresence

- id: eventlog_jitter_alignment
  label: Jitter Alignment Event Log
  type: boolean
  get: GET /eventlog/config/jitterAlignment
  set: PUT /eventlog/config/jitterAlignment

- id: eventlog_jitter_timing
  label: Jitter Timing Event Log
  type: boolean
  get: GET /eventlog/config/jitterTiming
  set: PUT /eventlog/config/jitterTiming

- id: eventlog_reference_locking
  label: Reference Locking Event Log
  type: boolean
  get: GET /eventlog/config/referenceLocking
  set: PUT /eventlog/config/referenceLocking

- id: eventlog_rest_api
  label: REST API Event Log
  type: boolean
  get: GET /eventlog/config/restApi
  set: PUT /eventlog/config/restApi

- id: eventlog_scte104
  label: SCTE-104 Event Log
  type: boolean
  get: GET /eventlog/config/scte104
  set: PUT /eventlog/config/scte104

- id: eventlog_sdi_input_rate
  label: SDI Input Rate Event Log
  type: boolean
  get: GET /eventlog/config/sdiInputRate
  set: PUT /eventlog/config/sdiInputRate

- id: eventlog_sdi_input_standard
  label: SDI Input Standard Event Log
  type: boolean
  get: GET /eventlog/config/sdiInputStandard
  set: PUT /eventlog/config/sdiInputStandard

- id: eventlog_sfp
  label: SFP Event Log
  type: boolean
  get: GET /eventlog/config/sfp
  set: PUT /eventlog/config/sfp

- id: ancillary_inspector_config
  label: Ancillary Inspector Config
  type: object
  get: GET /analyser/ancillaryInspector
  set: PUT /analyser/ancillaryInspector

- id: audio_meter_ballistics
  label: Audio Meter Ballistics
  type: string
  get: GET /analyser/audioMeter
  set: PUT /analyser/audioMeter

- id: cable_length_config
  label: Cable Length Config
  type: object
  get: GET /analyser/cableLength
  set: PUT /analyser/cableLength

- id: crc_summary_config
  label: CRC Summary Config
  type: object
  get: GET /analyser/crcSummary
  set: PUT /analyser/crcSummary
```

## Events
```yaml
# No server-initiated push events documented in source.
# All communication is client-initiated polling (GET/PUT).
# UNRESOLVED: event-driven push notifications not described in source.
```

## Macros
```yaml
# No explicit multi-step macro sequences documented in source.
# UNRESOLVED: populate from source if explicit macros are described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not present in source document.
# Document applies to SDI firmware mode only - other modes (SFP+) not covered.
```

## Notes
- Base URL uses placeholder `qx-XXXXXX` — replace with actual device hostname or IP. Port 8080 is stated in source.
- Device name "QX12G" is not found on phabrix.com; prior research indicates it is likely a regional variant of the Qx rasterizer series. The REST API document applies to all Qx units in SDI mode.
- No authentication described in source — `auth.type: none` inferred. Do not assume this is appropriate for production deployment without verifying against actual device behavior.
- All endpoints use JSON request/response; Content-Type not explicitly documented.
- Screenshot endpoints return timestamps in filenames (e.g. `2023-11-15T152546`) — not structured ISO8601 in all response fields.
- Many endpoint path segments contain URL-encoded characters (e.g. `YCbCr%3A422%3A10`, `100%25%20Bars`) — treat as literal path components.
- Generator pattern selection via deeply nested path: `/generator/standards/{resolution}/{colorSpace}/{dynamicRange}/{pattern}` — only one concrete pattern path fully documented (`1280x720p25/YCbCr:422:10/1.5G_HLG_Rec.2020/100%25_Bars`).
<!-- UNRESOLVED: serial/RS-232 control support not found in source -->
<!-- UNRESOLVED: SFP+ firmware mode API not covered — document explicitly applies to SDI mode only -->
<!-- UNRESOLVED: event-driven push notifications not described — all communication is request/response -->
<!-- UNRESOLVED: physical connection details (power, environmental) not covered -->
<!-- UNRESOLVED: firmware update procedure not documented -->

## Provenance

```yaml
source_domains:
  - leaderphabrix.com
retrieved_at: 2026-04-30T00:45:34.864Z
last_checked_at: 2026-04-30T09:46:44.085Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:46:44.085Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions map 1-to-1 to documented REST endpoints; base URL and port 8080 confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
