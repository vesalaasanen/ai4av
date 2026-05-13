---
spec_id: admin/anthem-mrx-slm
schema_version: ai4av-public-spec-v1
revision: 1
title: "Anthem MRX SLM Control Spec"
manufacturer: Anthem
model_family: "MRX SLM"
aliases: []
compatible_with:
  manufacturers:
    - Anthem
  models:
    - "MRX SLM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:55:27.136Z
last_checked_at: 2026-04-23T15:08:28.102Z
generated_at: 2026-04-23T15:08:28.102Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - GCBUx
verification:
  verdict: verified
  checked_at: 2026-04-23T15:08:28.102Z
  matched_actions: 108
  action_count: 108
  confidence: high
  summary: "Every spec action matched verbatim in source with correct opcodes and parameters; transport fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Anthem MRX SLM Control Spec

## Summary

The Anthem MRX SLM is an AV receiver/processor controllable via TCP/IP on port 14999 (default) and WebSocket on port 8080. Commands are ASCII strings terminated with semicolons. The protocol supports zone power, input selection, volume, audio listening modes, speaker configuration, bass management, ARC metadata, streaming playback, and system configuration. All queryable settings that change are broadcast asynchronously to all active connections.

<!-- UNRESOLVED: maximum number of simultaneous connections not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: WebSocket sub-protocol / framing details not stated beyond "operates the same way as TCP" -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 14999
auth:
  type: none  # inferred: no auth procedure in source
```

WebSocket is also available on port 8080 with identical command semantics.

## Traits
```yaml
traits:
  - powerable     # Z1POW power on/off commands
  - routable      # Z1INP input selection
  - queryable     # extensive query commands returning state
  - levelable     # Z1VOL, Z1PVOL, Z1TON, Z1BAL, Z1LEV volume/tone/balance/level control
```

## Actions
```yaml
actions:
  - id: z1_power
    label: Set Main Zone Power
    kind: action
    command: Z1POWy
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Off, 1=On"

  - id: z1_input
    label: Set Current Input
    kind: action
    command: Z1INPy
    params:
      - name: input
        type: integer
        min: 1
        max: 30
        description: Input number

  - id: z1_volume
    label: Set Volume (dB)
    kind: action
    command: Z1VOLyy
    params:
      - name: volume_db
        type: number
        min: -90
        max: 10
        description: Volume in dB

  - id: z1_volume_up
    label: Volume Up 0.5 dB
    kind: action
    command: Z1VUP
    params: []

  - id: z1_volume_down
    label: Volume Down 0.5 dB
    kind: action
    command: Z1VDN
    params: []

  - id: z1_pct_volume
    label: Set Volume (percentage)
    kind: action
    command: Z1PVOLyy
    params:
      - name: volume_pct
        type: integer
        min: 0
        max: 100
        description: Volume 0-100%

  - id: z1_pct_volume_up
    label: Volume Up 1%
    kind: action
    command: Z1PVUP
    params: []

  - id: z1_pct_volume_down
    label: Volume Down 1%
    kind: action
    command: Z1PVDN
    params: []

  - id: z1_mute
    label: Set Mute
    kind: action
    command: Z1MUTy
    params:
      - name: state
        type: string
        values: ["0", "1", "t"]
        description: "0=Unmute, 1=Mute, t=Toggle"

  - id: z1_listening_mode
    label: Set Audio Listening Mode
    kind: action
    command: Z1ALMy
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3, 4, 5, 7, 8, 9]
        description: "0=None, 1=Automatic, 2=AnthemLogic-Cinema, 3=AnthemLogic-Music, 4=Dolby Surround, 5=DTS Neural:X, 7=All Channel Stereo, 8=Mono, 9=All Channel Mono"

  - id: z1_listening_mode_up
    label: Listening Mode Up
    kind: action
    command: Z1AUP
    params: []

  - id: z1_listening_mode_down
    label: Listening Mode Down
    kind: action
    command: Z1ADN
    params: []

  - id: z1_tone
    label: Adjust Tone
    kind: action
    command: Z1TONyzz
    params:
      - name: type
        type: integer
        values: [0, 1]
        description: "0=Bass, 1=Treble"
      - name: value
        type: number
        min: -10
        max: 10
        step: 0.5
        description: dB value

  - id: z1_tone_up
    label: Tone Up 0.5 dB
    kind: action
    command: Z1TUPy
    params:
      - name: type
        type: integer
        values: [0, 1]
        description: "0=Bass, 1=Treble"

  - id: z1_tone_down
    label: Tone Down 0.5 dB
    kind: action
    command: Z1TDNy
    params:
      - name: type
        type: integer
        values: [0, 1]
        description: "0=Bass, 1=Treble"

  - id: z1_balance
    label: Adjust Balance
    kind: action
    command: Z1BALyyy
    params:
      - name: balance
        type: number
        min: -5
        max: 5
        step: 0.5
        description: "Negative=left, positive=right"

  - id: z1_balance_left
    label: Balance Left 0.5
    kind: action
    command: Z1BLT
    params: []

  - id: z1_balance_right
    label: Balance Right 0.5
    kind: action
    command: Z1BRI
    params: []

  - id: z1_level
    label: Adjust Level
    kind: action
    command: Z1LEVyzz
    params:
      - name: channel
        type: string
        values: ["1", "5", "7", "8", "A", "D"]
        description: "1=Subwoofer, 5=Fronts, 7=Center, 8=Surrounds, A=Heights, D=LFE"
      - name: value_db
        type: integer
        min: -10
        max: 10
        description: "dB value (LFE max=0)"

  - id: z1_level_up
    label: Level Up 0.5 dB
    kind: action
    command: Z1LUPy
    params:
      - name: channel
        type: string
        values: ["1", "5", "7", "8", "A", "D"]

  - id: z1_level_down
    label: Level Down 0.5 dB
    kind: action
    command: Z1LDNy
    params:
      - name: channel
        type: string
        values: ["1", "5", "7", "8", "A", "D"]

  - id: z1_sim_ir
    label: Simulate IR Command
    kind: action
    command: Z1SIMyyyy
    params:
      - name: key
        type: integer
        description: "IR key code (0-36)"

  - id: play_control
    label: Streaming Play Control
    kind: action
    command: PLAYCTRLx
    params:
      - name: action
        type: integer
        values: [0, 2, 3, 4]
        description: "0=Stop, 2=Play/Pause, 3=Previous, 4=Next"

  - id: set_play_mode
    label: Set Play Mode
    kind: action
    command: PLAYMODEx
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3, 4, 5]
        description: "0=Normal, 1=Shuffle, 2=Repeat One, 3=Shuffle Repeat One, 4=Repeat All, 5=Shuffle Repeat All"

  - id: insert_input
    label: Insert Input
    kind: action
    command: IIAIi
    params:
      - name: input
        type: integer
        min: 1
        max: 30

  - id: delete_input
    label: Delete Input
    kind: action
    command: IDAIi
    params:
      - name: input
        type: integer
        min: 1
        max: 30

  - id: set_input_name
    label: Set Input Name
    kind: action
    command: ISiINyyyy
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: name
        type: string
        description: Hex-encoded UTF-8, up to 64 bytes

  - id: set_video_input_type
    label: Set Video Input Source
    kind: action
    command: ISiVIDx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: source
        type: integer
        values: [0, 1]
        description: "0=None, 1=HDMI"

  - id: set_audio_input_type
    label: Set Audio Input Source
    kind: action
    command: ISiAIJx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: source
        type: integer
        values: [0, 1, 2, 3, 4, 5, 6]
        description: "0=None, 1=HDMI, 2=HDMI eARC, 3=Digital Optical, 4=Analog, 5=Streaming, 6=Bluetooth"

  - id: set_input_speaker_profile
    label: Set Speaker Profile for Input
    kind: action
    command: ISiSPp
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: profile
        type: integer
        min: 0
        max: 3
        description: "0=Profile 1 through 3=Profile 4"

  - id: set_input_arc
    label: Enable/Disable ARC for Input
    kind: action
    command: ISiARCx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Off, 1=On"

  - id: set_input_dolby_post
    label: Set Dolby Audio Post-Processing
    kind: action
    command: ISiDVx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: mode
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Off, 1=Movie, 2=Music, 3=Night"

  - id: set_input_dolby_speaker_virt
    label: Set Dolby Speaker Virtualization
    kind: action
    command: ISiDSVx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: state
        type: integer
        values: [0, 1]

  - id: set_input_dynamic_range
    label: Set Dynamic Range Control
    kind: action
    command: ISiDDRCx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: mode
        type: integer
        values: [0, 1, 2]
        description: "0=Off, 1=On, 2=Auto"

  - id: set_input_audio_preset
    label: Set Audio Mode Preset
    kind: action
    command: ISiPSx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: preset
        type: integer
        values: [-1, 0, 1, 2, 3, 4, 5, 7, 8, 9]
        description: "-1=Last Used, 0=None, 1=Automatic, 2=AnthemLogic-Cinema, 3=AnthemLogic-Music, 4=Dolby Surround, 5=DTS Neural:X, 7=All Channel Stereo, 8=Mono, 9=All Channel Mono"

  - id: set_input_lip_sync
    label: Set Lip Sync Delay
    kind: action
    command: ISiLSxxx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: delay_ms
        type: integer
        min: 0
        max: 150
        step: 5
        description: Delay in ms

  - id: set_input_trim
    label: Set Input Trim
    kind: action
    command: ISiITx
    params:
      - name: input
        type: integer
        min: 1
        max: 30
      - name: trim_db
        type: number
        min: -12
        max: 12
        step: 0.5

  - id: set_language
    label: Set Language
    kind: action
    command: GCLx
    params:
      - name: language
        type: integer
        values: [0, 1, 2, 3, 4, 5]
        description: "0=English, 1=Chinese, 2=German, 3=Spanish, 4=French, 5=Italian"

  - id: set_distance_units
    label: Set Distance Units
    kind: action
    command: GCDUx
    params:
      - name: units
        type: integer
        values: [0, 1]
        description: "0=Feet, 1=Centimetres"

  - id: set_volume_scale
    label: Set Master Volume Scale
    kind: action
    command: GCMVSx
    params:
      - name: scale
        type: integer
        values: [0, 1]
        description: "0=percentage, 1=dB"

  - id: set_max_volume
    label: Set Maximum Volume
    kind: action
    command: GCMMVx
    params:
      - name: max_db
        type: number
        min: -40
        max: 10
        step: 0.5

  - id: set_power_on_volume
    label: Set Power-On Volume
    kind: action
    command: GCMPOVx
    params:
      - name: volume
        type: string
        description: "0=Last Used, 1=-90 dB, or dB value up to max volume in 0.5 dB steps"

  - id: set_power_on_input
    label: Set Power-On Input
    kind: action
    command: GCMPOIx
    params:
      - name: input
        type: string
        description: "0=Last Used, or 1-30"

  - id: set_no_signal_power_off
    label: Set No Signal Power Off
    kind: action
    command: GCNSPOx
    params:
      - name: timeout
        type: integer
        values: [0, 1, 2, 3, 4, 5, 7]
        description: "0=5min, 1=10min, 2=20min, 3=1hr, 4=2hr, 5=6hr, 7=Never"

  - id: set_standby_hdmi_bypass
    label: Set Standby HDMI Bypass
    kind: action
    command: GCSHDMIBx
    params:
      - name: state
        type: integer
        values: [0, 1]

  - id: set_cec_control
    label: Set CEC Control
    kind: action
    command: GCCECCx
    params:
      - name: state
        type: integer
        values: [0, 1]

  - id: set_cec_power_off
    label: Set CEC Power-Off Control
    kind: action
    command: GCCPFCx
    params:
      - name: state
        type: integer
        values: [0, 1]

  - id: set_hdmi_audio_tv
    label: Set HDMI Audio to TV
    kind: action
    command: GCCTVAx
    params:
      - name: state
        type: integer
        values: [0, 1]

  - id: set_device_name
    label: Set Device Name
    kind: action
    command: GCDNccc
    params:
      - name: name
        type: string
        description: Hex-encoded UTF-8, up to 64 bytes

  - id: set_tcp_port
    label: Set IP Control TCP Port
    kind: action
    command: GCTCPx
    params:
      - name: port
        type: integer
        min: 1025
        max: 49150

  - id: set_ir_control
    label: Set IR Control
    kind: action
    command: GCIRx
    params:
      - name: mode
        type: integer
        values: [0, 1, 2]
        description: "0=Off, 1=Front IR, 2=Rear IR"

  - id: set_surround_matrixing
    label: Set Surround Matrixing Mode
    kind: action
    command: SSAMSy
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3, 4, 5, 6, 7]
        description: "0=Surround, 1=Front(Bi-Amp), 2=Front In-Ceiling, 3=Front Dolby, 4=Front On-Wall, 5=Middle In-Ceiling, 6=Back In-Ceiling, 7=Back On-Wall"

  - id: set_speaker_profile_name
    label: Set Speaker Profile Name
    kind: action
    command: SSSPp0yyyy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: name
        type: string
        description: Hex-encoded UTF-8, up to 64 bytes

  - id: set_speaker_enable
    label: Enable/Disable Speaker
    kind: action
    command: SSSPpXy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: speaker_id
        type: string
        values: ["1", "7", "8", "A"]
        description: "1=Subwoofer, 7=Center, 8=Surround, A=Height"
      - name: state
        type: integer
        values: [0, 1]

  - id: set_lfe_low_pass
    label: Set LFE Low Pass Filter
    kind: action
    command: BMSPp0y
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: frequency
        type: integer
        description: "40-120 Hz step 10, 130=Bypass"

  - id: set_crossover
    label: Set Crossover Frequency
    kind: action
    command: BMSPpXy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: speaker_id
        type: string
        values: ["5", "7", "8", "A"]
        description: "5=Front, 7=Center, 8=Surround, A=Height"
      - name: frequency
        type: integer
        description: "40-250 Hz step 10, 30=Off"

  - id: set_sub_phase_freq
    label: Set Subwoofer Phase Frequency
    kind: action
    command: BMSPp10y
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: frequency
        type: integer
        min: 40
        max: 120

  - id: set_sub_phase
    label: Set Subwoofer Phase
    kind: action
    command: BMSPp11y
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: degrees
        type: integer
        min: 0
        max: 120

  - id: set_sub_polarity
    label: Set Subwoofer Polarity
    kind: action
    command: BMSPp12y
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: polarity
        type: integer
        values: [0, 1]
        description: "0=Normal, 1=Inverted"

  - id: set_speaker_distance
    label: Set Speaker Distance
    kind: action
    command: LPSPpXy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: speaker_id
        type: string
        values: ["1", "5", "6", "9", "A", "B", "E", "F"]
        description: "1=Sub, 5=FL, 6=FR, 9=Ctr, A=SL, B=SR, E=HL, F=HR"
      - name: distance
        type: integer
        min: 0
        max: 180
        description: "Feet 0-30 step 2in, or cm 0-900 step 5cm"

  - id: set_calibration_level
    label: Set Calibration Level
    kind: action
    command: LCSPp0y
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: level_db
        type: number
        min: -15
        max: 15
        step: 0.5

  - id: set_speaker_level
    label: Set Speaker Level (Profile)
    kind: action
    command: LCSPpXy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: speaker_id
        type: string
        values: ["1", "5", "6", "9", "A", "B", "E", "F"]
        description: "1=Sub, 5=FL, 6=FR, 9=Ctr, A=SL, B=SR, E=HL, F=HR"
      - name: level_db
        type: number
        min: -12
        max: 12
        step: 0.5

  - id: set_test_tone
    label: Set Test Tone
    kind: action
    command: LCSPpKy
    params:
      - name: profile
        type: integer
        min: 1
        max: 4
      - name: speaker
        type: string
        description: "Hex bitmask: 00000000=Off, 00000001=Sub, 00000010=FL, 00000020=FR, 00000100=Ctr, 00000200=SL, 00000400=SR, 00002000=HL, 00004000=HR"

  - id: copy_settings
    label: Copy Settings
    kind: action
    command: CPYSxy
    params:
      - name: source
        type: integer
        values: [0, 1, 2]
        description: "0=Current, 1=User, 2=Installer"
      - name: dest
        type: integer
        values: [0, 1, 2]
        description: "0=Current, 1=User, 2=Installer"

  - id: load_factory_settings
    label: Load Factory Settings
    kind: action
    command: LDFDS
    params: []

  - id: reset_otf_settings
    label: Reset On-The-Fly Settings
    kind: action
    command: LOTFS
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    query: Z1POW?
    values: [off, on]

  - id: current_input
    type: integer
    query: Z1INP?
    description: "Input number 1-30"

  - id: volume_db
    type: number
    query: Z1VOL?
    description: "Volume in dB, -90 to +10"

  - id: volume_pct
    type: integer
    query: Z1PVOL?
    description: "Volume 0-100%"

  - id: mute_state
    type: enum
    query: Z1MUT?
    values: [unmuted, muted]

  - id: listening_mode
    type: enum
    query: Z1ALM?
    values: [none, automatic, anthemlogic_cinema, anthemlogic_music, dolby_surround, dts_neural_x, all_channel_stereo, mono, all_channel_mono]

  - id: tone_bass
    type: number
    query: Z1TON0?
    description: "Bass -10 to +10 dB"

  - id: tone_treble
    type: number
    query: Z1TON1?
    description: "Treble -10 to +10 dB"

  - id: balance
    type: number
    query: Z1BAL?
    description: "-5 to +5"

  - id: model_info
    type: string
    query: IDQ?
    description: "Model, software version, region, build date"

  - id: model_name
    type: string
    query: IDM?

  - id: software_version
    type: string
    query: IDS?

  - id: serial_number
    type: string
    query: GSN?

  - id: region
    type: string
    query: IDR?
    values: [US, EU, CN]

  - id: build_date
    type: string
    query: IDB?

  - id: hardware_version
    type: string
    query: IDH?

  - id: host_firmware
    type: string
    query: IDHOST?

  - id: hdmi_firmware
    type: string
    query: IDHDMI?

  - id: wifi_mac
    type: string
    query: WMAC?

  - id: ethernet_mac
    type: string
    query: EMAC?

  - id: network_status
    type: string
    query: NMST?
    description: "IP address, 'Up', 'Down', or 'Connecting'"

  - id: psu_temperature
    type: number
    query: PSUT?

  - id: hdmi_temperature
    type: number
    query: HDMIT?

  - id: video_input_resolution
    type: enum
    query: Z1VIR?
    values: [no_input, other, 1080p60, 1080p50, 1080p24, 1080i60, 1080i50, 720p60, 720p50, 576p50, 576i50, 480p60, 480i60, 3D, 4k60, 4k50, 4k30, 4k25, 4k24, 4k48]

  - id: audio_input_channels
    type: enum
    query: Z1AIC?
    values: [no_input, other, mono, 2ch, 5_1, 7_1, dolby_atmos, dts_x]

  - id: audio_input_format
    type: enum
    query: Z1AIF?
    values: [no_input, analog, pcm, dolby, dsd, dts, dolby_atmos, dts_x]

  - id: audio_bit_rate
    type: integer
    query: Z1BRT?
    description: "Bit rate in kbps"

  - id: audio_sample_rate
    type: integer
    query: Z1SRT?
    description: "Sample rate in kHz"

  - id: audio_bit_depth
    type: enum
    query: Z1BDP?
    values: ["16-bit", "24-bit", "32-bit", unknown]

  - id: audio_format_name
    type: string
    query: Z1AIN?

  - id: audio_bit_rate_name
    type: string
    query: Z1AIR?

  - id: input_count
    type: integer
    query: ICN?

  - id: input_name
    type: string
    query: ISiIN?
    description: "Per input 1-30"

  - id: input_video_source
    type: enum
    query: ISiVID?
    values: [none, hdmi]

  - id: input_audio_source
    type: enum
    query: ISiAIJ?
    values: [none, hdmi, hdmi_earc, digital_optical, analog, streaming, bluetooth]

  - id: input_speaker_profile
    type: integer
    query: ISiSP?

  - id: input_arc
    type: enum
    query: ISiARC?
    values: [off, on]

  - id: arc_valid
    type: enum
    query: Z1ARCVAL?
    values: [not_valid, valid]

  - id: arc_upload_date
    type: string
    query: Z1ARCUPL?

  - id: arc_name
    type: string
    query: Z1ARCNAM?

  - id: track_duration
    type: integer
    query: PLAYDUR?
    description: "Duration in seconds"

  - id: track_title
    type: string
    query: PLAYTITL?

  - id: track_album
    type: string
    query: PLAYALB?

  - id: track_artist
    type: string
    query: PLAYART?

  - id: track_cover_art_url
    type: string
    query: PLAYCOVR?

  - id: play_mode
    type: enum
    query: PLAYMODE?
    values: [normal, shuffle, repeat_one, shuffle_repeat_one, repeat_all, shuffle_repeat_all]

  - id: play_position
    type: integer
    query: PLAYTIME?
    description: "Position in seconds"

  - id: streaming_service
    type: string
    query: PLAYSRVC?

  - id: play_allow_previous
    type: boolean
    query: PLAYAPRV?

  - id: play_allow_next
    type: boolean
    query: PLAYANXT?

  - id: play_allow_playpause
    type: boolean
    query: PLAYAPP?

  - id: play_allow_shuffle_repeat
    type: string
    query: PLAYASRM?
    description: "Bitmask: shuffle, repeatOne, shuffleRepeatOne, repeatAll, shuffleRepeatAll"
```

## Variables
```yaml
# Per-input and per-profile settings that are settable but not discrete actions
# are represented as actions above with their corresponding feedbacks.
# UNRESOLVED: determine if additional variable entries are needed beyond action/feedback pairs
```

## Events
```yaml
events:
  - id: bulk_settings_changed
    description: "BSC1 - Sent when bulk operations change settings. Control system must invalidate all cached settings and re-query."
    format: BSC1

  - id: async_state_change
    description: "All queryable settings that can change are reported asynchronously to all active connections whenever a change occurs."
    format: "<CommandCode><Value>"

  - id: ddp_broadcast_connect
    description: "Device Discovery Protocol broadcast when unit establishes a network connection."

  - id: ddp_broadcast_disconnect
    description: "Device Discovery Protocol broadcast when unit shuts down (powering_off byte set to 1)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Only a few commands are valid in standby: all queries and ZxPOW, ZxINP, ZxVOL, ZxPVOL. All other commands return invalid."
  - description: "ISiARC must not be set to 1 if Z1ARCVAL? is 0."
  - description: "GCCPFC (CEC Power-Off) requires CEC to be ON."
  - description: "GCCTVA (HDMI Audio to TV) requires CEC to be OFF."
# UNRESOLVED: power-on sequencing beyond 'IP control in standby' not detailed
```

## Notes

- Commands use semicolon `;` as the only valid separator/terminator. Query responses also terminate with semicolon.
- Successful commands return `;` after execution. For immediate feedback, append the query command: e.g. `Z1VOL-28;Z1VOL?;`.
- Unexecutable recognized commands return `!E<OriginalCommand>`. Invalid commands return `!I<OriginalCommand>`.
- Average command processing latency is 20ms.
- Multiple commands can be combined in a single message.
- Textual data uses hex-encoded UTF-8 (2 hex chars per ASCII byte, 4-6 for multi-byte).
- If maximum connections are exceeded, the oldest connection is forcibly closed.
- WebSocket on port 8080 operates identically to the TCP socket.
- Terse volume mapping: 0%=-90dB, 4%=-74dB (step 4), 11%=-53dB (step 3), 20%=-35dB (step 2), 30%=-25dB (step 1), 100%=+10dB (step 0.5).
- Device Discovery Protocol (DDP) uses binary UDP broadcast on the local subnet with a structured packet containing device name, model, serial number, TCP port, and extended metadata.

<!-- UNRESOLVED: maximum simultaneous connections not stated -->
<!-- UNRESOLVED: DDP UDP port number not stated -->
<!-- UNRESOLVED: WebSocket framing/upgrade details not specified beyond "operates the same way" -->
<!-- UNRESOLVED: error recovery / reconnection behavior not documented -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:55:27.136Z
last_checked_at: 2026-04-23T15:08:28.102Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:08:28.102Z
matched_actions: 108
action_count: 108
confidence: high
summary: "Every spec action matched verbatim in source with correct opcodes and parameters; transport fully verified."
```

## Known Gaps

```yaml
- GCBUx
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
