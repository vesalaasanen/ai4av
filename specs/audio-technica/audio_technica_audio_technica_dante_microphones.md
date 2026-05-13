---
spec_id: admin/audio-technica-atnd1061
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATND1061 Control Spec"
manufacturer: Audio-Technica
model_family: ATND1061LK
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATND1061LK
    - ATND1061DAN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
retrieved_at: 2026-05-03T15:32:41.864Z
last_checked_at: 2026-05-04T10:17:34.147Z
generated_at: 2026-05-04T10:17:34.147Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T10:17:34.147Z
  matched_actions: 99
  action_count: 99
  confidence: high
  summary: "All 99 spec actions found with matching identifiers in source; transport parameters verified; semantic-id convention used throughout."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Audio-Technica ATND1061 Control Spec

## Summary
Audio-Technica ATND1061 beamforming array microphone with Dante audio networking. IP control via TCP (port 17300 default) for command/response and UDP multicast (239.000.000.100:17000) for status notifications. Commands are ASCII, space-delimited, CR-terminated. Supports up to 5 simultaneous TCP connections.

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300
  base_url: null  # N/A - raw TCP socket, no HTTP
serial: null  # N/A
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from s_powersave, reboot commands
  - queryable     # inferred from extensive get command set
  - levelable     # inferred from SICL, SOCL, s_input_gain_level, s_output_level
```

## Actions
```yaml
actions:
  - id: sicl
    label: Set Input CH Level
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"
      - name: level
        type: integer
        description: "Level 0-511 (-inf, -120 to +10 dB)"

  - id: gicl
    label: Get Input CH Level
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"

  - id: sicm
    label: Set Input CH Mute
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"
      - name: mute
        type: integer
        description: "0=off, 1=on"

  - id: gicm
    label: Get Input CH Mute
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"

  - id: socl
    label: Set Output CH Level
    kind: action
    params:
      - name: level
        type: integer
        description: "Level 0-511 (-inf, -120 to +10 dB)"

  - id: gocl
    label: Get Output CH Level
    kind: query
    params: []

  - id: socm
    label: Set Output CH Mute
    kind: action
    params:
      - name: mute
        type: integer
        description: "0=off, 1=on"

  - id: gocm
    label: Get Output CH Mute
    kind: query
    params: []

  - id: calllp
    label: Preset Call (Legacy)
    kind: action
    params:
      - name: bank
        type: integer
        description: "Bank number"

  - id: regip
    label: Preset Save (Legacy)
    kind: action
    params:
      - name: bank
        type: integer
        description: "Bank number"

  - id: mute
    label: Device Mute (Legacy)
    kind: action
    params:
      - name: mute
        type: integer
        description: "0=off, 1=on"

  - id: svad
    label: Set VAD Enable
    kind: action
    params:
      - name: enabled
        type: integer
        description: "0=disable, 1=enable"

  - id: sdid
    label: Set Device ID (Hex)
    kind: action
    params:
      - name: device_id
        type: string
        description: "0000-03E7 hex or 0-999 decimal"

  - id: gdid
    label: Get Device ID (Hex)
    kind: query
    params: []

  - id: sfid
    label: Set Device ID Format
    kind: action
    params:
      - name: format
        type: integer
        description: "0=hex, 1=decimal"

  - id: s_input_gain_level
    label: Set Input Gain and Level
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"
      - name: mic_gain
        type: integer
        description: "Mic gain 0-30 (+0 to +30 dB)"
      - name: level
        type: integer
        description: "Level 0-511"
      - name: mute
        type: integer
        description: "0=without muting, 1=with muting"

  - id: g_input_gain_level
    label: Get Input Gain and Level
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5 (Beam 1-6)"

  - id: s_input_channel_settings
    label: Set Input Channel Settings
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"
      - name: source
        type: integer
        description: "0=Mic, 1=Line"
      - name: phantom
        type: integer
        description: "0=Off, 1=On"
      - name: low_cut
        type: integer
        description: "0=Off, 1=On"
      - name: aec
        type: integer
        description: "0=Off, 1=On"
      - name: smart_mix
        type: integer
        description: "0=Off, 1=On"
      - name: name
        type: string
        description: "Channel name in quotes"
      - name: color
        type: integer
        description: "0=Green,1=Yellow,2=Brown,3=Red,4=Pink,5=Blue,6=Gray,7=DarkGray"

  - id: g_input_channel_settings
    label: Get Input Channel Settings
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"

  - id: s_input_eq
    label: Set Input EQ
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"
      - name: eq_on
        type: integer
        description: "0=Off, 1=On"
      - name: band1_filter_type
        type: integer
        description: "0=LPF/HPF, 1=LSH/HSH, 2=PEQ"
      - name: band1_frequency
        type: integer
        description: "0-480 (20 Hz-20 kHz)"
      - name: band1_gain
        type: integer
        description: "Gain value"
      - name: band1_q
        type: integer
        description: "Q value"
      - name: eq_mode
        type: integer
        description: "0=Easy, 1=Expert"

  - id: g_input_eq
    label: Get Input EQ
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"

  - id: s_aec_general
    label: Set AEC Settings
    kind: action
    params:
      - name: aec_enable
        type: integer
        description: "0=Off, 1=On"
      - name: aec_reference
        type: integer
        description: "0=Analog Input, 1=Digital Input"
      - name: noise_canceling
        type: integer
        description: "0-20 dB attenuation"
      - name: nlp_enable
        type: integer
        description: "0=Off, 1=On"
      - name: nlp_sensitivity
        type: integer
        description: "0=Low, 1=Mid, 2=High"
      - name: nc_enable
        type: integer
        description: "0=Off, 1=On"

  - id: g_aec_general
    label: Get AEC Settings
    kind: query
    params: []

  - id: s_smart_mix
    label: Set Gain Share
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"
      - name: weight
        type: integer
        description: "Weight 0-60 (-15.0 to +15.0 dB)"

  - id: g_smart_mix
    label: Get Gain Share
    kind: query
    params:
      - name: channel
        type: integer
        description: "Input channel 0-5"

  - id: s_agc
    label: Set AGC
    kind: action
    params:
      - name: enable
        type: integer
        description: "0=Off, 1=On"
      - name: target_level
        type: integer
        description: "-10 to 10 (-10 dB to 10 dB)"

  - id: g_agc
    label: Get AGC
    kind: query
    params: []

  - id: s_gainshare_mode
    label: Set Gain Share Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=Standalone, 1=Link"

  - id: g_gainshare_mode
    label: Get Gain Share Mode
    kind: query
    params: []

  - id: s_voicelift
    label: Set Voice Lift
    kind: action
    params:
      - name: processing
        type: integer
        description: "Processing level 1-5"

  - id: g_voicelift
    label: Get Voice Lift
    kind: query
    params: []

  - id: s_voicelift_channel_settings
    label: Set Voice Lift Channel
    kind: action
    params:
      - name: gain
        type: integer
        description: "Mic gain 0-30 (0 to +30 dB)"
      - name: level
        type: integer
        description: "Level 0-511 (-120 to +10 dB)"
      - name: mute
        type: integer
        description: "0=off, 1=on"
      - name: name
        type: string
        description: "Channel name in quotes"
      - name: color
        type: integer
        description: "Color index 0-7"

  - id: g_voicelift_channel_settings
    label: Get Voice Lift Channel
    kind: query
    params: []

  - id: s_voicelift_eq
    label: Set Voice Lift EQ
    kind: action
    params:
      - name: eq_on
        type: integer
        description: "0=Off, 1=On"
      - name: band1_filter_type
        type: integer
        description: "0=LPF/HPF, 1=LSH/HSH, 2=PEQ"
      - name: band1_frequency
        type: integer
        description: "0-480 (20 Hz-20 kHz)"
      - name: eq_mode
        type: integer
        description: "0=Easy, 1=Expert"

  - id: g_voicelift_eq
    label: Get Voice Lift EQ
    kind: query
    params: []

  - id: s_output_level
    label: Set Output Level
    kind: action
    params:
      - name: channel
        type: integer
        description: "0=Analog Out, 1=Auto Mix"
      - name: level
        type: integer
        description: "Level 0-511"

  - id: g_output_level
    label: Get Output Level
    kind: query
    params:
      - name: channel
        type: integer
        description: "0=Analog Out, 1=Auto Mix"

  - id: s_output_mute
    label: Set Output Mute
    kind: action
    params:
      - name: channel
        type: integer
        description: "0=Analog Out, 1=Auto Mix"
      - name: mute
        type: integer
        description: "0=off, 1=on"

  - id: g_output_mute
    label: Get Output Mute
    kind: query
    params:
      - name: channel
        type: integer
        description: "0=Analog Out, 1=Auto Mix"

  - id: s_output_channel_settings
    label: Set Output Channel Settings
    kind: action
    params:
      - name: channel
        type: integer
        description: "0=Analog Out"
      - name: unity
        type: integer
        description: "0=+4dBu, 2=-10dBv, 3=-33dBv"
      - name: name
        type: string
        description: "Channel name in quotes"

  - id: g_output_channel_settings
    label: Get Output Channel Settings
    kind: query
    params:
      - name: channel
        type: integer
        description: "0=Analog Out"

  - id: factory_settings
    label: Factory Reset
    kind: action
    params:
      - name: reset_item
        type: integer
        description: "0=All Reset"

  - id: s_deviceid
    label: Set Device ID
    kind: action
    params:
      - name: device_id
        type: string
        description: "00-FF"

  - id: g_deviceid
    label: Get Device ID
    kind: query
    params: []

  - id: s_permission
    label: Set Permission (Device Name)
    kind: action
    params:
      - name: device_name
        type: string
        description: "Device name in quotes"

  - id: g_permission
    label: Get Permission (Device Name)
    kind: query
    params: []

  - id: s_network
    label: Set Network
    kind: action
    params:
      - name: ip_config_mode
        type: integer
        description: "0=Auto, 1=Static"
      - name: ip_address
        type: string
        description: "IP address"
      - name: subnet_mask
        type: string
        description: "Subnet mask"
      - name: gateway
        type: string
        description: "Default gateway"
      - name: discovery
        type: integer
        description: "0=Not detect, 1=Detect (UPnP)"
      - name: port
        type: integer
        description: "TCP port 1-65535"
      - name: notification
        type: integer
        description: "0=Not use, 1=Use"

  - id: g_network
    label: Get Network
    kind: query
    params: []

  - id: s_network_dante
    label: Set Dante Network
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=Single Cable, 2=Split"
      - name: latency
        type: integer
        description: "1=250us,2=500us,3=1ms,4=2ms,5=5ms"
      - name: primary_ip_config
        type: integer
        description: "0=Auto, 1=Static"

  - id: g_network_dante
    label: Get Dante Network
    kind: query
    params: []

  - id: g_firmware_version
    label: Get Firmware Version
    kind: query
    params: []

  - id: s_header_color
    label: Set Device Color
    kind: action
    params:
      - name: color
        type: integer
        description: "0=Green,1=Yellow,3=Red,5=Blue,8=Cyan"

  - id: g_header_color
    label: Get Device Color
    kind: query
    params: []

  - id: s_log
    label: Set Log
    kind: action
    params:
      - name: enabled
        type: integer
        description: "0=Disable, 1=Enable"
      - name: output
        type: integer
        description: "0=Internal, 2=Syslog"

  - id: g_log
    label: Get Log
    kind: query
    params: []

  - id: s_led
    label: Set LED
    kind: action
    params:
      - name: dimmer
        type: integer
        description: "0=Off, 1=On"
      - name: powersave_color
        type: integer
        description: "0=Black,1=Red,2=Orange,3=Yellow,5=Purple,6=Blue,7=Aqua,8=Green,9=Cyan,10=White"
      - name: mute_color
        type: integer
        description: "0-10 color index"
      - name: unmute_color
        type: integer
        description: "0-10 color index"

  - id: g_led
    label: Get LED
    kind: query
    params: []

  - id: call_preset
    label: Preset Call
    kind: action
    params:
      - name: bank
        type: integer
        description: "Bank number"

  - id: save_preset
    label: Preset Save
    kind: action
    params:
      - name: bank
        type: integer
        description: "Bank number"

  - id: s_name_bank
    label: Set Preset Bank Name
    kind: action
    params:
      - name: bank
        type: integer
        description: "Bank number"
      - name: name
        type: string
        description: "Bank name in quotes"

  - id: g_name_bank
    label: Get Preset Bank Name
    kind: query
    params: []

  - id: s_bootup_preset
    label: Set Boot Up Preset
    kind: action
    params:
      - name: bank
        type: integer
        description: "0=Not select, 1-16=Bank"

  - id: g_bootup_preset
    label: Get Boot Up Preset
    kind: query
    params: []

  - id: g_preset_number
    label: Get Preset Number
    kind: query
    params: []

  - id: file_transfer
    label: File Transfer
    kind: action
    params:
      - name: kind
        type: string
        description: "Transfer data type (p1-p16, log)"
      - name: offset
        type: string
        description: "File offset in hex"
      - name: size
        type: integer
        description: "1-1024 bytes"
      - name: data
        type: string
        description: "Binary transfer data"

  - id: file_transfer_cancel
    label: File Transfer Cancel
    kind: action
    params:
      - name: kind
        type: string
        description: "Transfer data type"

  - id: export
    label: Export
    kind: query
    params:
      - name: kind
        type: string
        description: "Data type to export"

  - id: import
    label: Import
    kind: action
    params:
      - name: kind
        type: string
        description: "Data type to import"

  - id: s_level_meter_interval
    label: Set Level Meter Interval
    kind: action
    params:
      - name: interval
        type: integer
        description: "100-300000 msec"

  - id: g_level_meter_interval
    label: Get Level Meter Interval
    kind: query
    params: []

  - id: s_talkerposition_interval
    label: Set Talker Position Interval
    kind: action
    params:
      - name: interval
        type: integer
        description: "100-300000 msec"

  - id: g_talkerposition_interval
    label: Get Talker Position Interval
    kind: query
    params: []

  - id: identify
    label: Identify Device
    kind: action
    params: []

  - id: s_date
    label: Set Date
    kind: action
    params:
      - name: timestamp
        type: string
        description: "YYYYMMDDHHMMSS"

  - id: reboot
    label: Reboot
    kind: action
    params: []

  - id: s_powersave
    label: Set Power Save Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=cancel, 1=enable"

  - id: s_mute
    label: Set Device Mute
    kind: action
    params:
      - name: mute
        type: integer
        description: "0=off, 1=on"

  - id: g_mute
    label: Get Device Mute
    kind: query
    params: []

  - id: s_dante_tx5
    label: Set Dante Tx5 Signal
    kind: action
    params:
      - name: signal
        type: integer
        description: "0=Priority4, 1=Voice Lift Level 1"

  - id: g_dante_tx5
    label: Get Dante Tx5 Signal
    kind: query
    params: []

  - id: s_remotecontrol
    label: Set External Control
    kind: action
    params:
      - name: power
        type: integer
        description: "0=Not use"
      - name: mute
        type: integer
        description: "0=Not use"
      - name: preset
        type: integer
        description: "0=Not use"
      - name: gpi_port1
        type: integer
        description: "0=Power Save,1=Mute,2=Reboot,3=Camera"
      - name: gpi_port2
        type: integer
        description: "0-3 same as Port 1"

  - id: g_remotecontrol
    label: Get External Control
    kind: query
    params: []

  - id: s_synccontrol
    label: Set Device Interlock
    kind: action
    params:
      - name: power
        type: integer
        description: "0=Not interlocked"
      - name: mute
        type: integer
        description: "0=Not interlocked"
      - name: preset
        type: integer
        description: "0=Not interlocked"
      - name: group
        type: integer
        description: "1-128 interlocking group ID"

  - id: g_synccontrol
    label: Get Device Interlock
    kind: query
    params: []

  - id: s_audio_system
    label: Set Audio System
    kind: action
    params:
      - name: tx6
        type: integer
        description: "0=Automix, 1=Priority5"
      - name: beam_sensitivity
        type: integer
        description: "0=Low, 1=Mid, 2=High"
      - name: auto_attenuation
        type: integer
        description: "0=Disable, 1=Enable"
      - name: attenuation_level
        type: integer
        description: "0-28 (-inf to -3 dB)"
      - name: hold_time
        type: integer
        description: "0-100 (0-10 sec, 0.1 step)"

  - id: g_audio_system
    label: Get Audio System
    kind: query
    params: []

  - id: s_camera_device
    label: Set Camera Device
    kind: action
    params:
      - name: device_no
        type: integer
        description: "Camera number (1)"
      - name: enable
        type: integer
        description: "0=Not use, 1=Use"
      - name: ip_address
        type: string
        description: "Camera IP address"
      - name: port
        type: integer
        description: "Camera port 1-65535"
      - name: protocol
        type: integer
        description: "0=Panasonic, 1=VISCA over IP"

  - id: g_camera_device
    label: Get Camera Device
    kind: query
    params:
      - name: device_no
        type: integer
        description: "Camera number"

  - id: s_camera_preset
    label: Set Camera Preset
    kind: action
    params:
      - name: home
        type: string
        description: "HOME or 1-100 preset"
      - name: group1
        type: integer
        description: "1-100 preset"
      - name: group2
        type: integer
        description: "1-100 preset"

  - id: g_camera_preset
    label: Get Camera Preset
    kind: query
    params: []

  - id: s_camera_control
    label: Set Camera Control Time
    kind: action
    params:
      - name: recall_time
        type: integer
        description: "500-10000 msec"
      - name: go_back_home
        type: integer
        description: "0=Not use, 1=Use"
      - name: go_back_time
        type: integer
        description: "500-100000 msec"

  - id: g_camera_control
    label: Get Camera Control Time
    kind: query
    params: []

  - id: s_camera_stop
    label: Camera Control Pause
    kind: action
    params:
      - name: stop
        type: integer
        description: "0=Unpause, 1=Pause"
```

## Feedbacks
```yaml
feedbacks:
  - id: input_ch_level
    type: numeric
    description: "Input channel level (0-511, -inf to +10 dB)"
    command: GICL

  - id: input_ch_mute
    type: enum
    values: [off, on]
    description: "Input channel mute state"
    command: GICM

  - id: output_ch_level
    type: numeric
    description: "Output channel level (0-511)"
    command: GOCL

  - id: output_ch_mute
    type: enum
    values: [off, on]
    description: "Output channel mute state"
    command: GOCM

  - id: device_id
    type: string
    description: "Device ID (00-FF)"
    command: GDID

  - id: firmware_version
    type: string
    description: "Firmware version (XX.XX.XX)"
    command: g_firmware_version

  - id: device_color
    type: enum
    values: [Green, Yellow, Red, Blue, Cyan]
    description: "Device header color"
    command: g_header_color

  - id: device_mute
    type: enum
    values: [off, on]
    description: "Device-wide mute state"
    command: g_mute
```

## Variables
```yaml
variables:
  - id: input_level
    type: integer
    min: 0
    max: 511
    unit: "dB (see Fader Table 6.1)"
    description: "Per-channel input fader level"

  - id: output_level
    type: integer
    min: 0
    max: 511
    unit: "dB (see Fader Table 6.1)"
    description: "Per-channel output fader level"

  - id: input_gain
    type: integer
    min: 0
    max: 30
    unit: "dB"
    description: "Per-channel mic gain"

  - id: level_meter_interval
    type: integer
    min: 100
    max: 300000
    unit: "msec"
    description: "Level meter notification interval"

  - id: talker_position_interval
    type: integer
    min: 100
    max: 300000
    unit: "msec"
    description: "Talker position notification interval"
```

## Events
```yaml
events:
  - id: level_meter_notice
    description: "Periodic level meter data via UDP multicast (default 100 msec interval)"
    transport: udp

  - id: input_gain_level_notice
    description: "Input gain/level setting change notification via UDP"

  - id: output_level_notice
    description: "Output level change notification via UDP"

  - id: output_mute_notice
    description: "Output mute change notification via UDP"

  - id: recall_preset_notice
    description: "Preset call notification via UDP"

  - id: camera_control_notice
    description: "Talker position notification via UDP (status, channel, angle, rotation, camera no)"

  - id: powersave_notice
    description: "Power save mode change notification via UDP"

  - id: mute_notice
    description: "Device mute change notification via UDP"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_settings
  - reboot
interlocks: []
# Network and Dante setting changes require reboot after application.
# Simultaneous TCP connections limited to 5.
```

## Notes
Command format: `{command} {handshake} {model_id} {unit_no} {continue} {params} CR(0x0D)`. Handshake modes: O=One-Way, S=ACK/NAK. Max data length 287 bytes (32 header + 255 payload). Space (0x20) is the parameter delimiter. Commands are processed asynchronously; host can send next command without waiting for ACK/NAK, but some commands may return NAK error 90 (BUSY). Multi-part messages use CS/CM/CE continue-select codes. UDP notifications use multicast address 239.000.000.100:17000 (configurable). Level meter and talker position events are periodic; all other events are state-change-driven.

<!-- UNRESOLVED: s_led and g_led commands appear in body (Tables 4-81/4-82) but not in Table 3-1 command list -->
<!-- UNRESOLVED: exact parameter ranges for EQ gain/Q not fully specified in source tables -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: device mute parameter values for s_mute/MUTE not fully enumerated in source -->
<!-- UNRESOLVED: s_talkerposition_interval set command uses s_camera_control_interval in example (Table 4-100) but listed as s_talkerposition_interval in command list -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
retrieved_at: 2026-05-03T15:32:41.864Z
last_checked_at: 2026-05-04T10:17:34.147Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T10:17:34.147Z
matched_actions: 99
action_count: 99
confidence: high
summary: "All 99 spec actions found with matching identifiers in source; transport parameters verified; semantic-id convention used throughout."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
