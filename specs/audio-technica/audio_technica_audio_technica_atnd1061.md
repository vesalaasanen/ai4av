---
spec_id: admin/audio-technica-atnd1061
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATND1061 Control Spec"
manufacturer: Audio-Technica
model_family: ATND1061
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATND1061
    - ATND1061LK
    - ATND1061DAN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATND1061_IP_Control_Specifications_Document_Ver9.0_EN_web_250930.pdf
retrieved_at: 2026-10-07T11:13:01.034Z
last_checked_at: 2026-10-07T11:13:01.034Z
generated_at: 2026-10-07T11:13:01.034Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical connector specifications, power requirements, environmental ratings not stated in source"
  - "static IP default not stated; device uses DHCP/Auto IP per source 4.1"
  - "default not stated in the available source\""
  - "port and default not stated in the available source\""
  - "compound sequences (e.g. full device reset) not documented as macros"
  - "hardware interlock pins, emergency mute procedures not documented in source"
  - "Dante audio mute behavior during network disruption not documented"
  - "static IP address default not stated; device uses DHCP/Auto IP on first boot"
  - "maximum simultaneous TCP connections confirmed as 5 in source 4.1"
  - "GPIO connector specifications not in source"
  - "power consumption / PoE class not stated in source"
  - "physical dimensions, weight not stated in source"
  - "NTP setting was changed to Reserved in doc version 9.0 (removed functionality)"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:13:01.034Z
  matched_actions: 96
  action_count: 96
  confidence: medium
  summary: "All 96 spec actions match the Table 3-1 command list; notices are Events. The source is cut off after 4.3.1, so most parameter shapes were unchecked. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Audio-Technica ATND1061 Control Spec

## Summary

The ATND1061 is a beamforming array microphone with IP control interface. Supports TCP (port 17300) for command/response and UDP multicast notifications; UDP multicast address and port are UNRESOLVED in the available source. Authentication requirements are UNRESOLVED. Controls input/output levels, mute, presets, Voice Lift, Dante networking, camera tracking, and system settings via ASCII command strings terminated with CR (0x0D).

<!-- UNRESOLVED: physical connector specifications, power requirements, environmental ratings not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300  # TCP port; stated in source Table 4-1 and s_network parameter
  # UNRESOLVED: static IP default not stated; device uses DHCP/Auto IP per source 4.1
tcp:
  # CR-terminated ASCII command strings; max 287 bytes including CR
  # Full duplex; up to 5 simultaneous host connections
  # 32-byte Ethernet header + 255 bytes control command
udp:
  # Multicast for unsolicited notifications only
  multicast_address: UNRESOLVED  # exact address not present in the available source
  port: UNRESOLVED  # exact port not present in the available source
auth:
  type: UNRESOLVED  # source does not state this
```

## Traits
```yaml
# Inferred from command catalog:
# - powerable: s_powersave (power save mode), identify, reboot
# - queryable: g_* commands returning Answer responses
# - routable: Dante settings (s_network_dante, g_network_dante), audio system settings
# - levelable: input/output level commands (SICL, SOCL, s_input_gain_level, s_output_level)
# - muteable: input/output mute commands (SICM, SOCM, MUTE, s_mute)
# Camera tracking trait inferred from camera_control_* commands
```

## Actions
```yaml
# Individual Commands (4.2)
- id: SICL
  label: Input CH Level Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "Input channel selection, 0-5 (Beam Ch1-6), 6 (AnalogInput)"
    - name: Level
      type: integer
      description: "Level 0-511; see Fader Table 6.1 for dB mapping (-∞,-120 to +10 dB)"

- id: GICL
  label: Input CH Level Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "Input channel selection, 0-5 (Beam Ch1-6), 6 (AnalogInput)"

- id: SICM
  label: Input CH Mute Status Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "Input channel selection, 0-5 (Beam Ch1-6), 6 (AnalogInput)"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: GICM
  label: Input CH Mute Status Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "Input channel selection, 0-5 (Beam Ch1-6), 6 (AnalogInput)"

- id: SOCL
  label: Output CH Level Change Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "Output channel selection, 0 (AnalogOut)"
    - name: Level
      type: integer
      description: "Level 0-511; see Fader Table 6.1"

- id: GOCL
  label: Output CH Level Acquisition Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "Output channel selection, 0 (AnalogOut)"

- id: SOCM
  label: Output CH Mute Status Change Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "Output channel selection, 0 (AnalogOut)"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: GOCM
  label: Output CH Mute Status Acquisition Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "Output channel selection, 0 (AnalogOut)"

- id: CALLP
  label: Preset Call Request (short form)
  kind: action
  params:
    - name: Preset_Number
      type: integer
      description: "Preset number 0-16"

- id: REGIP
  label: Preset Save Request (short form)
  kind: action
  params:
    - name: Preset_Number
      type: integer
      description: "Preset number 0-16"

- id: MUTE
  label: Device Mute Request (short form)
  kind: action
  params:
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: SVAD
  label: VAD Enable State Change Request
  kind: action
  params:
    - name: VAD_Enabled
      type: integer
      description: "0 = VAD disabled, 1 = VAD enabled"

- id: SDID
  label: Device ID Change Request
  kind: action
  params:
    - name: Device_ID
      type: integer
      description: "Device ID 0000-03E7 (hex) or 0-999 (decimal); format set by SFID"

- id: GDID
  label: Device ID Acquisition Request
  kind: action
  params: []

- id: SFID
  label: Device ID Format Setting Request
  kind: action
  params:
    - name: Format
      type: integer
      description: "0 = Hexadecimal, 1 = Decimal"

# Input Commands (4.3)
- id: s_input_gain_level
  label: Input Gain&Level Setting Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "0-5 (Beam Ch1-6), 6 (Analog)"
    - name: gain_Mic
      type: integer
      description: "Mic gain 0-30 (+0 to +30 dB); see Input Gain Table 6.5; disabled for analog input"
    - name: Level
      type: integer
      description: "Level 0-511 (-120 to +10 dB); see Fader Table 6.1"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: g_input_gain_level
  label: Input Gain&Level Setting Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
      description: "0-5 (Beam Ch1-6), 6 (Analog)"

- id: s_input_channel_settings
  label: Input Channel Setting Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
    - name: Phase
      type: integer
      description: "0 = Normal, 1 = Reverse"
    - name: Fader
      type: integer
      description: "Level 0-511; see Fader Table 6.1"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: g_input_channel_settings
  label: Input Channel Setting Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer

- id: s_input_eq
  label: Input EQ Setting Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
    - name: EQ_Type
      type: integer
      description: "EQ band type (see source Table 4-33 for enumerations)"
    - name: Frequency
      type: integer
      description: "Frequency index; see Frequency Table 6.2"
    - name: Gain
      type: integer
      description: "EQ gain index; see EQ Gain Table 6.4"
    - name: Q
      type: integer
      description: "Q value index; see Q Value Table 6.3"

- id: g_input_eq
  label: Input EQ Setting Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer

- id: s_smart_mix
  label: Gain Share Setting Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
    - name: Mode
      type: integer
      description: "0 = Off, 1 = Gate Mode, 2 = Gain Share Mode"

- id: g_smart_mix
  label: Gain Share Setting Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer

- id: s_aec_general
  label: AEC Setting Change Request
  kind: action
  params:
    - name: AEC_Reference
      type: integer
      description: "AEC reference channel selection"
    - name: AEC_Mode
      type: integer
      description: "0 = Off, 1 = On"

- id: g_aec_general
  label: AEC Setting Acquisition Request
  kind: action
  params: []

- id: s_agc
  label: AGC Setting Change Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer
    - name: AGC_Mode
      type: integer
      description: "0 = Off, 1 = On"

- id: g_agc
  label: AGC Setting Acquisition Request
  kind: action
  params:
    - name: Input_Channel_Select
      type: integer

- id: s_gainshare_mode
  label: Gain Share Mode Change Request
  kind: action
  params:
    - name: Mode
      type: integer
      description: "0 = Gate Mode, 1 = Gain Share Mode"

- id: g_gainshare_mode
  label: Gain Share Mode Acquisition Request
  kind: action
  params: []

- id: s_voicelift
  label: Voice Lift Setting Change Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer
      description: "Voice Lift channel index"
    - name: Enable
      type: integer
      description: "0 = Off, 1 = On"
    - name: Gain
      type: integer
      description: "Gain value"

- id: g_voicelift
  label: Voice Lift Setting Acquisition Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer

- id: s_voicelift_channel_settings
  label: Voice Lift Channel Setting Change Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer
    - name: MaxGain
      type: integer
      description: "Maximum gain"

- id: g_voicelift_channel_settings
  label: Voice Lift Channel Setting Acquisition Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer

- id: s_voicelift_eq
  label: Voice Lift EQ Setting Change Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer
    - name: Band
      type: integer
      description: "EQ band"
    - name: Frequency
      type: integer
      description: "Frequency index"
    - name: Gain
      type: integer
      description: "EQ gain"
    - name: Q
      type: integer
      description: "Q value"

- id: g_voicelift_eq
  label: Voice Lift EQ Setting Acquisition Request
  kind: action
  params:
    - name: VoiceLift_Channel
      type: integer
    - name: Band
      type: integer

- id: s_voicelift_outputselect
  label: Voice Lift Output Select Setting Change Request
  kind: action
  params:
    - name: Tx6_Signal
      type: integer
      description: "0 = Automix, 1 = Priority5"
    - name: Beam_Sensitivity
      type: integer
      description: "0 = Low, 1 = Mid, 2 = High"
    - name: Auto_Attenuation
      type: integer
      description: "0 = Disabled, 1 = Enabled"
    - name: Attenuation_Level
      type: integer
      description: "0-28; see Attenuation Level Table 6.7"
    - name: Hold_Time
      type: integer
      description: "0-100 (0-10 sec, 0.1 step)"

- id: g_voicelift_outputselect
  label: Voice Lift Output Select Setting Acquisition Request
  kind: action
  params: []

# Output Commands (4.4)
- id: s_output_level
  label: Output Level Setting Change Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"
    - name: Level
      type: integer
      description: "Level 0-511; see Fader Table 6.1"

- id: g_output_level
  label: Output Level Setting Acquisition Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"

- id: s_output_mute
  label: Output Channel Mute Setting Change Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: g_output_mute
  label: Output Channel Mute Setting Acquisition Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"

- id: s_output_channel_settings
  label: Output Channel Setting Change Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer
    - name: Phase
      type: integer
      description: "0 = Normal, 1 = Reverse"
    - name: Fader
      type: integer
      description: "Level 0-511; see Fader Table 6.1"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: g_output_channel_settings
  label: Output Channel Setting Acquisition Request
  kind: action
  params:
    - name: Output_Channel_Select
      type: integer

# System Commands (4.5)
- id: factory_settings
  label: Factory Default Setting Request
  kind: action
  params: []

- id: s_deviceid
  label: Device ID Change Request (System)
  kind: action
  params:
    - name: Device_ID
      type: integer
      description: "Device ID 00-FF (hex)"

- id: g_deviceid
  label: Device ID Acquisition Request (System)
  kind: action
  params: []

- id: s_permission
  label: Permission Setting Change Request
  kind: action
  params:
    - name: Device_Name
      type: string
      description: "Device name string (ASCII, enclosed in double quotes)"

- id: g_permission
  label: Permission Setting Acquisition Request
  kind: action
  params: []

- id: s_network
  label: Network Setting Change Request
  kind: action
  params:
    - name: IP_Config_Mode
      type: integer
      description: "0 = Auto, 1 = Static"
    - name: IP_Address
      type: string
      description: "IP address string (when static)"
    - name: Subnet_Mask
      type: string
      description: "Subnet mask string (when static)"
    - name: Gateway_Address
      type: string
      description: "Default gateway string"
    - name: Port_Number
      type: integer
      description: "TCP port number for IP control (1-65535)"
    - name: Notification
      type: integer
      description: "Information transmission status: 0 = Not used, 1 = Used"
    - name: Audio_Level_Notification
      type: integer
      description: "Audio Level notification: 0 = Not used, 1 = Used"
    - name: Multicast_Address
      type: string
      description: "Multicast group address for UDP notifications"
    - name: Multicast_Port_Number
      type: integer
      description: "Multicast port number for UDP notifications (1-65535)"
    - name: Camera_Control_Notification
      type: integer
      description: "Camera Control notification: 0 = Not used, 1 = Used"

- id: g_network
  label: Network Setting Acquisition Request
  kind: action
  params: []

- id: s_network_dante
  label: Dante Setting Change Request
  kind: action
  params:
    - name: Mode
      type: integer
      description: "0 = Single Cable, 2 = Split"
    - name: Latency
      type: integer
      description: "1 = 250 usec, 2 = 500 usec, 3 = 1 msec, 4 = 2 msec, 5 = 5 msec"
    - name: IP_Config_Mode_Primary
      type: integer
      description: "0 = Auto, 1 = Static"
    - name: IP_Address_Primary
      type: string
    - name: Subnet_Mask_Primary
      type: string
    - name: Gateway_Address_Primary
      type: string
    - name: IP_Config_Mode_Secondary
      type: integer
      description: "0 = Auto, 1 = Static (same as Primary)"
    - name: IP_Address_Secondary
      type: string
    - name: Subnet_Mask_Secondary
      type: string
    - name: Gateway_Address_Secondary
      type: string

- id: g_network_dante
  label: Dante Setting Acquisition Request
  kind: action
  params: []

- id: g_firmware_version
  label: Firmware Version Acquisition Request
  kind: action
  params: []

- id: s_header_color
  label: Device Color Setting Change Request
  kind: action
  params:
    - name: Header_Color
      type: integer
      description: "0 = Green, 1 = Yellow, 3 = Red, 5 = Blue, 8 = Cyan"

- id: g_header_color
  label: Device Color Setting Acquisition Request
  kind: action
  params: []

- id: s_log
  label: Log Setting Change Request
  kind: action
  params:
    - name: Enabled
      type: integer
      description: "0 = Disabled, 1 = Enabled"
    - name: Output_Destination
      type: integer
      description: "0 = Internal, 2 = Syslog"

- id: g_log
  label: Log Setting Acquisition Request
  kind: action
  params: []

- id: s_remotecontrol
  label: External Control Setting Change Request
  kind: action
  params:
    - name: Power
      type: integer
      description: "IR remote Power: 0 = Not used"
    - name: Mute
      type: integer
      description: "IR remote Mute: 0 = Not used"
    - name: Preset
      type: integer
      description: "IR remote Preset Recall Link: 0 = Not used"
    - name: GPI_Port1
      type: integer
      description: "GPI port 1: 0 = Power Save Mode, 1 = Mute, 2 = Reboot, 3 = Camera Control"
    - name: GPI_Port2
      type: integer
      description: "GPI port 2: same enumerations as GPI Port 1"

- id: g_remotecontrol
  label: External Control Setting Acquisition Request
  kind: action
  params: []

- id: s_synccontrol
  label: Device Sync Control Change Request
  kind: action
  params:
    - name: Power
      type: integer
      description: "Power Save Mode sync: 0 = Not synchronized"
    - name: Mute
      type: integer
      description: "Mute sync: 0 = Not synchronized"
    - name: Preset
      type: integer
      description: "Preset Recall Link sync: 0 = Not synchronized"
    - name: Group
      type: integer
      description: "Sync group ID 1-128"

- id: g_synccontrol
  label: Device Sync Control Acquisition Request
  kind: action
  params: []

- id: s_audio_system
  label: Audio System Setting Change Request
  kind: action
  params:
    - name: Tx6_Signal
      type: integer
      description: "Dante Tx#6 Signal: 0 = Automix, 1 = Priority5"
    - name: Beam_Sensitivity
      type: integer
      description: "0 = Low, 1 = Mid, 2 = High"
    - name: Auto_Attenuation
      type: integer
      description: "0 = Disabled, 1 = Enabled"
    - name: Attenuation_Level
      type: integer
      description: "0-28; see Attenuation Level Table 6.7"
    - name: Hold_Time
      type: integer
      description: "0-100 (0-10 sec, 0.1 step)"

- id: g_audio_system
  label: Audio System Setting Acquisition Request
  kind: action
  params: []

- id: call_preset
  label: Preset Call Request (system form)
  kind: action
  params:
    - name: Preset_Number
      type: integer
      description: "Preset number 0-16"

- id: save_preset
  label: Preset Save Request (system form)
  kind: action
  params:
    - name: Preset_Number
      type: integer
      description: "Preset number 0-16"

- id: s_name_bank
  label: Preset Bank Name Change Request
  kind: action
  params:
    - name: Bank_Number
      type: integer
    - name: Name
      type: string
      description: "Bank name string (UTF-8)"

- id: g_name_bank
  label: Preset Bank Name Acquisition Request
  kind: action
  params:
    - name: Bank_Number
      type: integer

- id: s_bootup_preset
  label: Boot Up Preset Setting Change Request
  kind: action
  params:
    - name: Preset_Number
      type: integer
      description: "Preset number loaded at boot; 0 = No preset"

- id: g_bootup_preset
  label: Boot Up Preset Setting Acquisition Request
  kind: action
  params: []

- id: g_preset_number
  label: Preset Number Acquisition Request
  kind: action
  params: []

- id: file_transfer
  label: File Transfer Request
  kind: action
  params:
    - name: File_Type
      type: string
      description: "p1top16 (preset) or log (logfile)"
    - name: Data
      type: string
      description: "File data (base64 encoded content for preset files)"

- id: file_transfer_cancel
  label: File Transfer Cancel Request
  kind: action
  params: []

- id: export
  label: Export Request
  kind: action
  params:
    - name: File_Type
      type: string
      description: "p1top16 (preset) or log (logfile)"

- id: import
  label: Import Request
  kind: action
  params:
    - name: File_Type
      type: string
      description: "p1top16 (preset) or log (logfile)"
    - name: Data
      type: string
      description: "File data"

- id: s_level_meter_interval
  label: Level Meter Notification Interval Change Request
  kind: action
  params:
    - name: Interval
      type: integer
      description: "Interval in milliseconds"

- id: g_level_meter_interval
  label: Level Meter Notification Interval Acquisition Request
  kind: action
  params: []

- id: s_camera_control_interval
  label: Talker Position Notification Interval Change Request
  kind: action
  params:
    - name: Interval
      type: integer
      description: "Interval in milliseconds"

- id: g_camera_control_interval
  label: Talker Position Notification Interval Acquisition Request
  kind: action
  params: []

- id: g_camera_control_notice
  label: Talker Position Information Acquisition Request
  kind: action
  params: []

- id: identify
  label: Identify Request
  kind: action
  params: []

- id: s_date
  label: Date Setting Request
  kind: action
  params:
    - name: Year
      type: integer
      description: "Year"
    - name: Month
      type: integer
      description: "Month (1-12)"
    - name: Day
      type: integer
      description: "Day (1-31)"
    - name: Hour
      type: integer
      description: "Hour (0-23)"
    - name: Minute
      type: integer
      description: "Minute (0-59)"
    - name: Second
      type: integer
      description: "Second (0-59)"

- id: reboot
  label: Reboot Request
  kind: action
  params: []

- id: s_powersave
  label: Power Save Mode Request
  kind: action
  params:
    - name: Mode
      type: integer
      description: "0 = Power save mode canceled, 1 = Power save mode"

- id: s_mute
  label: Device Mute Request (system form)
  kind: action
  params:
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: g_mute
  label: Device Mute Status Acquisition Request
  kind: action
  params: []

- id: s_dante_tx5
  label: Dante Tx5 Setting Change Request
  kind: action
  params:
    - name: Enable
      type: integer
      description: "0 = Not used, 1 = Used"
    - name: Gain
      type: integer
      description: "Gain value"

- id: g_dante_tx5
  label: Dante Tx5 Setting Acquisition Request
  kind: action
  params: []

- id: s_roomtype
  label: Room Type Setting Change Request
  kind: action
  params:
    - name: Room_Type
      type: integer
      description: "Room type enumeration (see source Table 4-146)"

- id: g_roomtype
  label: Room Type Setting Acquisition Request
  kind: action
  params: []

# Camera Commands (4.6)
- id: s_camera_device
  label: Camera Device Setting Change Request
  kind: action
  params:
    - name: Device_No
      type: integer
      description: "Camera number 1"
    - name: Enable
      type: integer
      description: "0 = Not used, 1 = Used"
    - name: IP_Address
      type: string
      description: "Camera IP address"
    - name: Port_Number
      type: integer
      description: "Camera port number (1-65535)"
    - name: Protocol
      type: integer
      description: "0 = Panasonic, 1 = VISCA over IP"

- id: g_camera_device
  label: Camera Device Setting Acquisition Request
  kind: action
  params:
    - name: Device_No
      type: integer
      description: "Camera number"

- id: s_camera_preset
  label: Camera Preset Setting Change Request
  kind: action
  params:
    - name: HOME
      type: integer
      description: "HOME position: HOME (silent) or 1-100 (Preset 1-100)"
    - name: Group1
      type: integer
      description: "Position for Group1 (1-100)"
    - name: Group2
      type: integer
    - name: Group3
      type: integer
    - name: Group4
      type: integer
    - name: Group5
      type: integer
    - name: Group6
      type: integer
    - name: Group7
      type: integer
    - name: Group8
      type: integer
    - name: Group9
      type: integer
    - name: Group10
      type: integer
    - name: Group11
      type: integer
    - name: Group12
      type: integer
    - name: Group13
      type: integer
    - name: Group14
      type: integer
    - name: Group15
      type: integer

- id: g_camera_preset
  label: Camera Preset Setting Acquisition Request
  kind: action
  params: []

- id: s_camera_control
  label: Camera Control Time Setting Change Request
  kind: action
  params:
    - name: Time_to_Recall_Preset
      type: integer
      description: "500-10000 msec"
    - name: Enable_go_back_Home
      type: integer
      description: "0 = Not used, 1 = Used"
    - name: Time_to_go_back_Home
      type: integer
      description: "500-100000 msec"

- id: g_camera_control
  label: Camera Control Time Setting Acquisition Request
  kind: action
  params: []

- id: s_camera_stop
  label: Camera Control Pause Request
  kind: action
  params:
    - name: Stop
      type: integer
      description: "0 = Pause released, 1 = Paused"
```

## Feedbacks
```yaml
# Acknowledgement responses (sent over TCP)
- id: ACK
  label: Acknowledge
  description: "ACK response to a Set command. Format: COMMAND␣ACK␣CR"
  type: binary

- id: NAK
  label: Negative Acknowledge
  description: "NAK response with error code. Format: COMMAND␣NAK␣XX␣CR where XX is error code"
  type: object
  properties:
    - name: Error_Code
      type: string
      description: "01=Syntax error, 02=Invalid command, 03=Splitting error, 04=Parameter error, 05=Transmission timeout, 90=Busy, 92=Busy (Save mode), 93=Busy (Extension), 99=Other error"

- id: Answer
  label: Setting Status Return (Answer)
  description: "Answer response to a Get command. Format: COMMAND␣ModelID␣UnitNo␣ContinueSelect␣Parameters␣CR"
  type: object
  properties:
    - name: Model_ID
      type: string
      description: "0000 (fixed, not used)"
    - name: Unit_No
      type: string
      description: "Device ID 00-FF"
    - name: Continue_Select
      type: string
      description: "NC=No split, CS=Head of split, CM=Middle of split, CE=End of split"
```

## Variables
```yaml
# Settable parameters that are not discrete actions
# Network Settings
- id: network_ip_config_mode
  label: IP Config Mode
  type: enum
  values: [0, 1]
  descriptions: ["Auto", "Static"]

- id: network_ip_address
  label: IP Address
  type: string
  description: "IPv4 address string"

- id: network_subnet_mask
  label: Subnet Mask
  type: string
  description: "IPv4 subnet mask string"

- id: network_gateway
  label: Gateway Address
  type: string
  description: "IPv4 default gateway string"

- id: network_port_number
  label: TCP Control Port Number
  type: integer
  description: "1-65535"

- id: network_multicast_address
  label: Multicast Address (UDP notifications)
  type: string
  description: "UNRESOLVED: default not stated in the available source"

- id: network_multicast_port
  label: Multicast Port Number (UDP notifications)
  type: integer
  description: "UNRESOLVED: port and default not stated in the available source"

# Dante Settings
- id: dante_mode
  label: Dante Network Configuration Mode
  type: enum
  values: [0, 2]
  descriptions: ["Single Cable", "Split"]

- id: dante_latency
  label: Dante Latency
  type: enum
  values: [1, 2, 3, 4, 5]
  descriptions: ["250 usec", "500 usec", "1 msec", "2 msec", "5 msec"]

# Audio System
- id: audio_tx6_signal
  label: Dante Tx#6 Signal
  type: enum
  values: [0, 1]
  descriptions: ["Automix", "Priority5"]

- id: audio_beam_sensitivity
  label: Beam Sensitivity
  type: enum
  values: [0, 1, 2]
  descriptions: ["Low", "Mid", "High"]

- id: audio_auto_attenuation
  label: Auto Attenuation
  type: enum
  values: [0, 1]
  descriptions: ["Disabled", "Enabled"]

- id: audio_attenuation_level
  label: Attenuation Level
  type: integer
  description: "0-28; see Attenuation Level Table 6.7"

- id: audio_hold_time
  label: Hold Time
  type: integer
  description: "0-100 (0-10 sec, 0.1 step)"

# Device Settings
- id: device_id
  label: Device ID
  type: integer
  description: "Device ID 0000-03E7 (hex) or 0-999 (decimal)"

- id: device_id_format
  label: Device ID Format
  type: enum
  values: [0, 1]
  descriptions: ["Hexadecimal", "Decimal"]

- id: device_name
  label: Device Name
  type: string
  description: "Device name string (ASCII)"

- id: device_color
  label: Header Color
  type: enum
  values: [0, 1, 3, 5, 8]
  descriptions: ["Green", "Yellow", "Red", "Blue", "Cyan"]

- id: power_save_mode
  label: Power Save Mode
  type: enum
  values: [0, 1]
  descriptions: ["Normal", "Power save mode"]

- id: device_mute
  label: Device Mute
  type: enum
  values: [0, 1]
  descriptions: ["Not muted", "Muted"]

- id: room_type
  label: Room Type
  type: integer
  description: "Room type enumeration"

- id: bootup_preset
  label: Boot Up Preset
  type: integer
  description: "Preset number loaded at boot (0 = No preset)"

- id: preset_number
  label: Current Preset Bank Number
  type: integer
  description: "0-16"

# Notification Intervals
- id: level_meter_interval
  label: Level Meter Notification Interval
  type: integer
  description: "Interval in milliseconds (default UNRESOLVED in the available source)"

- id: camera_control_interval
  label: Talker Position Notification Interval
  type: integer
  description: "Interval in milliseconds (default UNRESOLVED in the available source)"

# Voice Lift
- id: voicelift_enable
  label: Voice Lift Enable
  type: enum
  values: [0, 1]
  descriptions: ["Off", "On"]

- id: voicelift_gain
  label: Voice Lift Gain
  type: integer

- id: voicelift_maxgain
  label: Voice Lift Channel Max Gain
  type: integer

# Dante Tx5
- id: dante_tx5_enable
  label: Dante Tx5 Enable
  type: enum
  values: [0, 1]
  descriptions: ["Not used", "Used"]

- id: dante_tx5_gain
  label: Dante Tx5 Gain
  type: integer

# Sync Control
- id: sync_power
  label: Power Sync Enable
  type: enum
  values: [0, 1]
  descriptions: ["Not synchronized", "Synchronized"]

- id: sync_mute
  label: Mute Sync Enable
  type: enum
  values: [0, 1]
  descriptions: ["Not synchronized", "Synchronized"]

- id: sync_preset
  label: Preset Sync Enable
  type: enum
  values: [0, 1]
  descriptions: ["Not synchronized", "Synchronized"]

- id: sync_group
  label: Sync Group ID
  type: integer
  description: "1-128"
```

## Events
```yaml
# Unsolicited UDP multicast notifications; multicast address and port are UNRESOLVED in the available source
# Only sent when corresponding Notification bit is enabled in s_network

- id: level_meter_notice
  label: Level Meter Notification
  description: "Periodic level meter data. Multicast UDP. Interval set by s_level_meter_interval."
  type: object
  properties:
    - name: Post_Fader_Meter_Level_0
      type: integer
      description: "Beam Channel 1 level meter 0-61"
    - name: Post_Fader_Meter_Level_1
      type: integer
      description: "Beam Channel 2 level meter 0-61"
    - name: Post_Fader_Meter_Level_2
      type: integer
      description: "Beam Channel 3 level meter 0-61"
    - name: Post_Fader_Meter_Level_3
      type: integer
      description: "Beam Channel 4 level meter 0-61"
    - name: Post_Fader_Meter_Level_4
      type: integer
      description: "Beam Channel 5 level meter 0-61"
    - name: Post_Fader_Meter_Level_5
      type: integer
      description: "Beam Channel 6 level meter 0-61"
    - name: Post_Fader_Meter_Level_6
      type: integer
      description: "AnalogInput level meter 0-61"
    - name: AEC_ERL_Meter
      type: integer
      description: "AEC ERL level meter 0-60"
    - name: Gain_Share_Meter_Beam_1_to_6
      type: integer
      description: "Beam Channel gain share meter 0-15 each"

- id: input_gain_level_notice
  label: Input Gain&Level Setting Notification
  description: "Sent via UDP multicast when input gain/level is changed on device."
  type: object
  properties:
    - name: Input_Channel_Select
      type: integer
      description: "0-5 (Beam Ch1-6), 6 (Analog)"
    - name: gain_Mic
      type: integer
      description: "Mic gain 0-40 (+20 to +60 dB)"
    - name: gain_Line
      type: integer
      description: "Line gain 0-40 (-20 to -60 dBu)"
    - name: Level
      type: integer
      description: "Level 0-511"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: output_level_notice
  label: Output Level Setting Notification
  description: "Sent via UDP multicast when output level is changed on device."
  type: object
  properties:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"
    - name: Level
      type: integer
      description: "Level 0-511"

- id: output_mute_notice
  label: Output Channel Mute Setting Notification
  description: "Sent via UDP multicast when output mute is changed on device."
  type: object
  properties:
    - name: Output_Channel_Select
      type: integer
      description: "0 (AnalogOut)"
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"

- id: recall_preset_notice
  label: Preset Call Notification
  description: "Sent via UDP multicast when a preset is called from the device."
  type: object
  properties:
    - name: Preset_Number
      type: integer
      description: "Preset number 0-16"

- id: camera_control_notice
  label: Talker Position Notification
  description: "Periodic talker position data. Multicast UDP. Interval set by s_camera_control_interval."
  type: object
  properties:
    - name: Status
      type: integer
      description: "0 = Not speaking, 1 = Speaking"
    - name: Channel
      type: integer
      description: "Beam channel 0-5 (enabled when Status=1)"
    - name: Angle
      type: integer
      description: "Elevation angle 0-90"
    - name: Rotate
      type: integer
      description: "Rotation angle 0-360"
    - name: CameraNo
      type: integer
      description: "Camera area number 0 (No camera area), 1-15"

- id: powersave_notice
  label: Power Save Mode Notification
  description: "Sent via UDP multicast when power save mode status changes."
  type: object
  properties:
    - name: mode
      type: integer
      description: "0 = Power save mode canceled, 1 = Power save mode"

- id: mute_notice
  label: Device Mute Notification
  description: "Sent via UDP multicast when device mute status changes."
  type: object
  properties:
    - name: Mute
      type: integer
      description: "0 = Not muted, 1 = Muted"
```

## Macros
```yaml
# Multi-step sequences described in source
# No explicit macros described; operations are single commands
# UNRESOLVED: compound sequences (e.g. full device reset) not documented as macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_change_reboot
    description: "After changing network settings (s_network), the ATND1061 must be rebooted (reboot) for changes to take effect."
    # inferred from source 4.5.4: "If the network settings are changed, the ATND1061 needs to be rebooted"
  - id: file_transfer_split
    description: "Divided messages (file_transfer with CS/CM/CE continuation) must be sent in correct order. CM/CE without prior CS returns NAK 03."
    # from source 4.5.21 and error code 03
# UNRESOLVED: hardware interlock pins, emergency mute procedures not documented in source
# UNRESOLVED: Dante audio mute behavior during network disruption not documented
```

## Notes

**Command Syntax**: ASCII strings, space-delimited fields, CR (0x0D) terminator. ASCII for commands, UTF-8 for text parameters (device names, bank names).

**Command Format (TCP)**:
```
COMMAND␣HandshakeSelect␣ModelID␣UnitNo␣ContinueSelect␣Parameters...␣CR
```
- HandshakeSelect: H=Handshake (unused), O=One-Way, S=ACK/NAK format
- ModelID: 0000 (fixed, not used)
- UnitNo: 00 (fixed, not used)
- ContinueSelect: NC=No split, CS=Head, CM=Middle, CE=End

**ACK/NAK Response**: TCP only.
- ACK format: `COMMAND␣ACK␣CR`
- NAK format: `COMMAND␣NAK␣XX␣CR` (XX = error code)

**Answer Response**: TCP only, returned for Get commands.

**UDP Multicast**: Device sends unsolicited notifications via UDP multicast. The multicast address and port are UNRESOLVED in the available source. Notifications only sent when enabled in network settings (s_network parameter bits). Default interval is UNRESOLVED in the available source.

**Error Codes**:
- 01: Syntax error
- 02: Invalid command
- 03: Splitting transmission error
- 04: Parameter error
- 05: Transmission timeout (not used)
- 90: Busy
- 92: Busy (Save mode)
- 93: Busy (Extension) (not used)
- 99: Other error

**Fader Table**: Level values 0-511 map to dB; 0 = -∞, 1 = -120 dB, 511 = +10 dB. See Table 6.1.

**Level Meters**: Post-fader meters 0-61, AEC(ERL) meter 0-60, Gain Share meters 0-15.

**Input Gain Table**: Mic gain 0-30 maps to +0 to +30 dB; Line gain 0-40 maps to -20 to -60 dBu. See Table 6.5.

**Attenuation Level Table**: Values 0-28 map to -∞, -30 to -3 dB. See Table 6.7.

**Q Value Table**: Values 0-31 map to Q 0.3-60. See Table 6.3.

**Frequency Table**: 32-415 index values map to 20 Hz-20 kHz. See Table 6.2.

**Camera Control**: Panasonic (protocol=0) or VISCA over IP (protocol=1). Camera area numbers 1-15.

**Version Correspondence**: Source document Table 6.8 shows ATND1061DAN supports firmware 1.0.0-1.4.0; ATND1061LK supports 1.0.0-1.4.0. Camera sync added in doc version 4.0 (firmware 1.2.0+). Voice Lift added in doc version 5.0 (firmware 1.3.0+). Talker position added in doc version 8.0 (firmware 1.4.0+).

<!-- UNRESOLVED: static IP address default not stated; device uses DHCP/Auto IP on first boot -->
<!-- UNRESOLVED: maximum simultaneous TCP connections confirmed as 5 in source 4.1 -->
<!-- UNRESOLVED: GPIO connector specifications not in source -->
<!-- UNRESOLVED: power consumption / PoE class not stated in source -->
<!-- UNRESOLVED: physical dimensions, weight not stated in source -->
<!-- UNRESOLVED: NTP setting was changed to Reserved in doc version 9.0 (removed functionality) -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATND1061_IP_Control_Specifications_Document_Ver9.0_EN_web_250930.pdf
retrieved_at: 2026-10-07T11:13:01.034Z
last_checked_at: 2026-10-07T11:13:01.034Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:13:01.034Z
matched_actions: 96
action_count: 96
confidence: medium
summary: "All 96 spec actions match the Table 3-1 command list; notices are Events. The source is cut off after 4.3.1, so most parameter shapes were unchecked. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical connector specifications, power requirements, environmental ratings not stated in source"
- "static IP default not stated; device uses DHCP/Auto IP per source 4.1"
- "default not stated in the available source\""
- "port and default not stated in the available source\""
- "compound sequences (e.g. full device reset) not documented as macros"
- "hardware interlock pins, emergency mute procedures not documented in source"
- "Dante audio mute behavior during network disruption not documented"
- "static IP address default not stated; device uses DHCP/Auto IP on first boot"
- "maximum simultaneous TCP connections confirmed as 5 in source 4.1"
- "GPIO connector specifications not in source"
- "power consumption / PoE class not stated in source"
- "physical dimensions, weight not stated in source"
- "NTP setting was changed to Reserved in doc version 9.0 (removed functionality)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
