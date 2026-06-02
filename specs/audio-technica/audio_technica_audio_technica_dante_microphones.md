---
spec_id: admin/audio-technica-atnd1061
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATND1061 Beamforming Array Microphone Control Spec"
manufacturer: Audio-Technica
model_family: ATND1061LK
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATND1061LK
    - ATND1061DAN
    - ATND1061
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATND1061_IP_Control_Specifications_V4_EN_web_240114.pdf
retrieved_at: 2026-06-01T22:46:22.948Z
last_checked_at: 2026-06-01T23:12:13.711Z
generated_at: 2026-06-01T23:12:13.711Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage, current, and power specifications not stated in source. Authentication credentials or login procedures not documented."
  - "no multi-step sequences explicitly documented in source."
  - "source does not contain explicit safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:13.711Z
  matched_actions: 93
  action_count: 93
  confidence: medium
  summary: "All 93 spec action commands match verbatim in the source; transport port/multicast values confirmed; all 8 source info (MD) commands are represented in spec Feedbacks. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audio-Technica ATND1061 Beamforming Array Microphone Control Spec

## Summary
The Audio-Technica ATND1061 is a beamforming array microphone controllable over IP using TCP (for Set/Get commands) and UDP (for status change notifications / multicast). This spec covers all 99 commands from the official IP Control Specifications document (revision 5.0, 2023-10-27), including input/output channel control, EQ, AEC, AGC, gain share, voice lift, presets, network/Dante settings, device ID, and camera control integration.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage, current, and power specifications not stated in source. Authentication credentials or login procedures not documented. -->

## Transport
```yaml
# IP control uses TCP for host→device Set/Get commands and UDP multicast for
# device→host status change notifications. No login or password procedure is
# described in the source, so auth.type: none.
protocols:
  - tcp
  - udp
addressing:
  tcp_port: 17300        # Table 4-1: default TCP port
  udp_multicast_ip: 239.000.000.100  # Table 5-1: default multicast address
  udp_multicast_port: 17000          # Table 5-1: default multicast port
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (s_powersave, reboot)
# - routable        (s_input_channel_settings, s_output_channel_settings, gain share, AEC routing)
# - queryable       (extensive G* acquisition commands)
# - levelable       (s_input_gain_level, SOCL/SICL faders, EQ bands, AGC, voice lift)
```

## Actions
```yaml
# Action command format (Table 2-3): "<command> <handshake> 0000 00 <continue> <params>\r"
#   handshake: S = ACK/NAK, O = One-Way
#   0000      : Model ID (fixed)
#   00        : Unit No (fixed in host-originated messages; in Answer/Notice it's the Device ID)
#   continue  : NC = no split, CS/CM/CE for split messages
#   params    : comma-separated argument string
# Each command ends with CR (0x0D).

# --- 1. Input CH Level ---
- id: S_Input_CH_Level
  label: Input CH Level Change Request
  kind: action
  command: "SICL S 0000 00 NC {channel},{level}"
  params:
    - name: channel
      type: integer
      description: Input channel selection (0 to 5 = Beam Channel 1 to 6)
    - name: level
      type: integer
      description: Fader level 0 to 511 (-∞, -120 to +10 dB; see Fader Table)

- id: G_Input_CH_Level
  label: Input CH Level Acquisition Request
  kind: query
  command: "GICL O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel selection (0 to 5)

# --- 2. Input CH Mute ---
- id: S_Input_CH_Mute
  label: Input CH Mute Status Change Request
  kind: action
  command: "SICM S 0000 00 NC {channel},{mute}"
  params:
    - name: channel
      type: integer
      description: Input channel selection (0 to 5)
    - name: mute
      type: integer
      description: 0 = without muting, 1 = with muting

- id: G_Input_CH_Mute
  label: Input CH Mute Status Acquisition Request
  kind: query
  command: "GICM O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel selection (0 to 5)

# --- 3. Output CH Level ---
- id: S_Output_CH_Level
  label: Output CH Level Change Request
  kind: action
  command: "SOCL S 0000 00 NC {channel},{level}"
  params:
    - name: channel
      type: integer
      description: Output channel selection (0 = Analog Out)
    - name: level
      type: integer
      description: Fader level 0 to 511 (-∞, -120 to +10 dB)

- id: G_Output_CH_Level
  label: Output CH Level Acquisition Request
  kind: query
  command: "GOCL O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Output channel selection (0 = Analog Out)

# --- 4. Output CH Mute ---
- id: S_Output_CH_Mute
  label: Output CH Mute Status Change Request
  kind: action
  command: "SOCM S 0000 00 NC {channel},{mute}"
  params:
    - name: channel
      type: integer
      description: Output channel selection (0 = Analog Out)
    - name: mute
      type: integer
      description: 0 = without muting, 1 = with muting

- id: G_Output_CH_Mute
  label: Output CH Mute Status Acquisition Request
  kind: query
  command: "GOCM O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Output channel selection (0 = Analog Out)

# --- 5. Preset Call (legacy) ---
- id: CALLP
  label: Preset Call Request (legacy)
  kind: action
  command: "CALLP S 0000 00 NC {bank}"
  params:
    - name: bank
      type: integer
      description: Preset bank number (1 to 16)

# --- 6. Preset Save (legacy) ---
- id: REGIP
  label: Preset Save Request (legacy)
  kind: action
  command: "REGIP S 0000 00 NC {bank}"
  params:
    - name: bank
      type: integer
      description: Preset bank number to save (1 to 16)

# --- 7. Device Mute (short form) ---
- id: MUTE
  label: Device Mute Request (short form)
  kind: action
  command: "MUTE S 0000 00 NC {mute}"
  params:
    - name: mute
      type: integer
      description: 0 = unmute, 1 = mute

# --- 8. VAD Enable ---
- id: SVAD
  label: VAD Enable State Change Request
  kind: action
  command: "SVAD S 0000 00 NC {vad_enable}"
  params:
    - name: vad_enable
      type: integer
      description: 0 = VAD disable, 1 = VAD enable

# --- 9. Device ID Change (string) ---
- id: SDID
  label: Device ID Change Request (string form)
  kind: action
  command: "SDID S 0000 00 NC {device_id}"
  params:
    - name: device_id
      type: string
      description: Device ID (0000 to 03E7 hex, or 0 to 999 decimal; format set by SFID)

# --- 10. Device ID Acquisition (string) ---
- id: GDID
  label: Device ID Acquisition Request (string form)
  kind: query
  command: "GDID O 0000 00 NC"
  params: []

# --- 11. Device ID Format Setting ---
- id: SFID
  label: Device ID Format Setting Request
  kind: action
  command: "SFID S 0000 00 NC {format}"
  params:
    - name: format
      type: integer
      description: 0 = Hexadecimal, 1 = Decimal

# --- 12. Input Gain & Level Setting ---
- id: s_input_gain_level
  label: Input Gain & Level Setting Change Request
  kind: action
  command: "s_input_gain_level S 0000 00 NC {channel},{mic_gain},{line_gain},{level},{reserved},{reserved},{mute},{reserved},{reserved}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5 = Beam Channel 1 to 6)
    - name: mic_gain
      type: integer
      description: Mic gain 0 to 30 (+0 to +30 dB; see Input Gain Table)
    - name: line_gain
      type: integer
      description: Line gain (-)
    - name: level
      type: integer
      description: Fader level 0 to 511
    - name: mute
      type: integer
      description: 0 = without muting, 1 = with muting

- id: g_input_gain_level
  label: Input Gain & Level Setting Acquisition Request
  kind: query
  command: "g_input_gain_level O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)

# --- 13. Input Channel Settings ---
- id: s_input_channel_settings
  label: Input Channel Setting Change Request
  kind: action
  command: "s_input_channel_settings S 0000 00 NC {channel},{source},{phantom},{reserved},{low_cut},{aec},{smart_mix},{reserved},{reserved},{name},{color},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)
    - name: source
      type: integer
      description: 0 = Mic, 1 = Line (analog Ch only)
    - name: phantom
      type: integer
      description: 0 = Off
    - name: low_cut
      type: integer
      description: 0 = Off
    - name: aec
      type: integer
      description: 0 = Off
    - name: smart_mix
      type: integer
      description: 0 = Off
    - name: name
      type: string
      description: Channel name (ASCII, enclosed in double quotes)
    - name: color
      type: integer
      description: 0=Green, 1=Yellow, 2=Brown, 3=Red, 4=Pink, 5=Blue, 6=Gray, 7=DarkGray

- id: g_input_channel_settings
  label: Input Channel Setting Acquisition Request
  kind: query
  command: "g_input_channel_settings O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)

# --- 14. Input EQ ---
- id: s_input_eq
  label: Input EQ Setting Change Request
  kind: action
  command: "s_input_eq S 0000 00 NC {channel},{eq_on_off},{band1_filter_type},{band1_freq},{band1_gain},{band1_q},{reserved},{band2_freq},{band2_gain},{band2_q},{reserved},{band3_freq},{band3_gain},{band3_q},{reserved},{band4_filter_type},{band4_freq},{band4_gain},{band4_q},{eq_mode}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)
    - name: eq_on_off
      type: integer
      description: 0 = Off, 1 = On
    - name: band1_filter_type
      type: integer
      description: 0=LPF/HPF, 1=LSH/HSH, 2=PEQ
    - name: band1_freq
      type: integer
      description: 0 to 480 (20 Hz to 20 kHz; see Frequency Table)
    - name: band1_gain
      type: integer
      description: EQ gain
    - name: band1_q
      type: integer
      description: Q value
    - name: band2_freq
      type: integer
      description: Band 2 frequency
    - name: band2_gain
      type: integer
      description: Band 2 gain
    - name: band2_q
      type: integer
      description: Band 2 Q
    - name: band3_freq
      type: integer
      description: Band 3 frequency
    - name: band3_gain
      type: integer
      description: Band 3 gain
    - name: band3_q
      type: integer
      description: Band 3 Q
    - name: band4_filter_type
      type: integer
      description: Band 4 filter type
    - name: band4_freq
      type: integer
      description: Band 4 frequency
    - name: band4_gain
      type: integer
      description: Band 4 gain
    - name: band4_q
      type: integer
      description: Band 4 Q
    - name: eq_mode
      type: integer
      description: 0 = Easy Mode, 1 = Expert Mode

- id: g_input_eq
  label: Input EQ Setting Acquisition Request
  kind: query
  command: "g_input_eq O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)

# --- 15. AEC Setting ---
- id: s_aec_general
  label: AEC Setting Change Request
  kind: action
  command: "s_aec_general S 0000 00 NC {aec_enable},{aec_reference},{reserved},{reserved},{reserved},{reserved},{nc_attenuation},{reserved},{nlp_enable},{nlp_sensitivity},{nc_enable}"
  params:
    - name: aec_enable
      type: integer
      description: 0 = Off, 1 = On
    - name: aec_reference
      type: integer
      description: 0 = Analog Input, 1 = Digital Input
    - name: nc_attenuation
      type: integer
      description: Noise Canceling attenuation level 0 to 20 (0 to 20 dB)
    - name: nlp_enable
      type: integer
      description: Non-Linear Processing enable (0 = Off)
    - name: nlp_sensitivity
      type: integer
      description: 0 = Low, 1 = Mid, 2 = High
    - name: nc_enable
      type: integer
      description: NC presence (0 = Off)

- id: g_aec_general
  label: AEC Setting Acquisition Request
  kind: query
  command: "g_aec_general O 0000 00 NC"
  params: []

# --- 16. Gain Share (Smart Mix) Setting ---
- id: s_smart_mix
  label: Gain Share Setting Change Request
  kind: action
  command: "s_smart_mix S 0000 00 NC {channel},{reserved},{weight},{reserved},{reserved},{reserved},{reserved},{reserved}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)
    - name: weight
      type: integer
      description: Gain share weight 0 to 60 (-15.0 to +15.0 dB)

- id: g_smart_mix
  label: Gain Share Setting Acquisition Request
  kind: query
  command: "g_smart_mix O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: Input channel (0 to 5)

# --- 17. AGC Setting ---
- id: s_agc
  label: AGC Setting Change Request
  kind: action
  command: "s_agc S 0000 00 NC {enable},{reserved},{target_level}"
  params:
    - name: enable
      type: integer
      description: 0 = Off, 1 = On
    - name: target_level
      type: integer
      description: -10 to 10 (-10 dB to +10 dB)

- id: g_agc
  label: AGC Setting Acquisition Request
  kind: query
  command: "g_agc O 0000 00 NC"
  params: []

# --- 18. Gain Share Mode ---
- id: s_gainshare_mode
  label: Gain Share Mode Change Request
  kind: action
  command: "s_gainshare_mode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0 = Standalone, 1 = Link

- id: g_gainshare_mode
  label: Gain Share Mode Acquisition Request
  kind: query
  command: "g_gainshare_mode O 0000 00 NC"
  params: []

# --- 19. Voice Lift Setting ---
- id: s_voicelift
  label: Voice Lift Setting Change Request
  kind: action
  command: "s_voicelift S 0000 00 NC {processing}"
  params:
    - name: processing
      type: integer
      description: Processing level 1 to 5

- id: g_voicelift
  label: Voice Lift Setting Acquisition Request
  kind: query
  command: "g_voicelift O 0000 00 NC"
  params: []

# --- 20. Voice Lift Channel Settings ---
- id: s_voicelift_channel_settings
  label: Voice Lift Channel Setting Change Request
  kind: action
  command: "s_voicelift_channel_settings S 0000 00 NC {gain},{level},{mute},{name},{color}"
  params:
    - name: gain
      type: integer
      description: Mic gain 0 to 30 (0 to +30 dB)
    - name: level
      type: integer
      description: Level 0 to 511 (-120 to +10 dB)
    - name: mute
      type: integer
      description: 0 = without muting, 1 = with muting
    - name: name
      type: string
      description: Channel name (ASCII in quotes)
    - name: color
      type: integer
      description: 0=Green, 1=Yellow, 2=Brown, 3=Red, 5=Blue, 6=Gray, 7=DarkGray

- id: g_voicelift_channel_settings
  label: Voice Lift Channel Setting Acquisition Request
  kind: query
  command: "g_voicelift_channel_settings O 0000 00 NC"
  params: []

# --- 21. Voice Lift EQ ---
- id: s_voicelift_eq
  label: Voice Lift EQ Setting Change Request
  kind: action
  command: "s_voicelift_eq S 0000 00 NC {eq_on_off},{band1_filter_type},{band1_freq},{band1_gain},{band1_q},{reserved},{band2_freq},{band2_gain},{band2_q},{reserved},{band3_freq},{band3_gain},{band3_q},{reserved},{band4_filter_type},{band4_freq},{band4_gain},{band4_q},{eq_mode}"
  params:
    - name: eq_on_off
      type: integer
      description: 0 = Off, 1 = On
    - name: band1_filter_type
      type: integer
      description: 0=LPF/HPF, 1=LSH/HSH, 2=PEQ
    - name: band1_freq
      type: integer
      description: 0 to 480 (20 Hz to 20 kHz)
    - name: band1_gain
      type: integer
      description: EQ gain
    - name: band1_q
      type: integer
      description: Q value
    - name: band4_filter_type
      type: integer
      description: Band 4 filter type
    - name: band4_freq
      type: integer
      description: Band 4 frequency
    - name: band4_gain
      type: integer
      description: Band 4 gain
    - name: band4_q
      type: integer
      description: Band 4 Q
    - name: eq_mode
      type: integer
      description: 0 = Easy Mode, 1 = Expert Mode

- id: g_voicelift_eq
  label: Voice Lift EQ Setting Acquisition Request
  kind: query
  command: "g_voicelift_eq O 0000 00 NC"
  params: []

# --- 22. Output Level Setting ---
- id: s_output_level
  label: Output Level Setting Change Request
  kind: action
  command: "s_output_level S 0000 00 NC {channel},{level},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out, 1 = Auto Mix
    - name: level
      type: integer
      description: Level 0 to 511 (-∞, -120 to +10 dB)

- id: g_output_level
  label: Output Level Setting Acquisition Request
  kind: query
  command: "g_output_level O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out, 1 = Auto Mix

# --- 23. Output Mute Setting ---
- id: s_output_mute
  label: Output Channel Mute Setting Change Request
  kind: action
  command: "s_output_mute S 0000 00 NC {channel},{mute}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out
    - name: mute
      type: integer
      description: 0 = without muting, 1 = with muting

- id: g_output_mute
  label: Output Channel Mute Setting Acquisition Request
  kind: query
  command: "g_output_mute O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out

# --- 24. Output Channel Settings ---
- id: s_output_channel_settings
  label: Output Channel Setting Change Request
  kind: action
  command: "s_output_channel_settings S 0000 00 NC {channel},{unity},{name},{reserved},{reserved},{reserved},{reserved}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out
    - name: unity
      type: integer
      description: 0 = +4 dBu, 2 = -10 dBv, 3 = -33 dBv
    - name: name
      type: string
      description: Channel name (ASCII in quotes)

- id: g_output_channel_settings
  label: Output Channel Setting Acquisition Request
  kind: query
  command: "g_output_channel_settings O 0000 00 NC {channel}"
  params:
    - name: channel
      type: integer
      description: 0 = Analog Out

# --- 25. Factory Default ---
- id: factory_settings
  label: Factory Default Setting Request
  kind: action
  command: "factory_settings S 0000 00 NC {reset_item}"
  params:
    - name: reset_item
      type: integer
      description: 0 = All Reset (optional)

# --- 26. Device ID (hex form) ---
- id: s_deviceid
  label: Device ID Change Request (hex)
  kind: action
  command: "s_deviceid S 0000 00 NC {device_id}"
  params:
    - name: device_id
      type: string
      description: Device ID 00 to FF

- id: g_deviceid
  label: Device ID Acquisition Request (hex)
  kind: query
  command: "g_deviceid O 0000 00 NC"
  params: []

# --- 27. Permission Setting ---
- id: s_permission
  label: Permission Setting Change Request
  kind: action
  command: "s_permission S 0000 00 NC {device_name},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved},{reserved}"
  params:
    - name: device_name
      type: string
      description: Device name (ASCII in double quotes)

- id: g_permission
  label: Permission Setting Acquisition Request
  kind: query
  command: "g_permission O 0000 00 NC"
  params: []

# --- 28. Network Setting ---
- id: s_network
  label: Network Setting Change Request
  kind: action
  command: "s_network S 0000 00 NC {ip_config_mode},{ip_address},{subnet_mask},{gateway},{allow_discovery},{port_number},{notification},{audio_level_notification},{multicast_address},{multicast_port},{ntp_enabled},{ntp_server},{ntp_port},{time_zone},{daylight_saving},{start_date},{end_date},{camera_control_notification}"
  params:
    - name: ip_config_mode
      type: integer
      description: 0 = Auto, 1 = Static
    - name: ip_address
      type: string
      description: IP address (000.000.000.000 to 255.255.255.255)
    - name: subnet_mask
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Default gateway
    - name: allow_discovery
      type: integer
      description: UPnP 0 = Not detect, 1 = Detect
    - name: port_number
      type: integer
      description: TCP/IP port 1 to 65535
    - name: notification
      type: integer
      description: Information transmission 0 = Not use
    - name: audio_level_notification
      type: integer
      description: 0 = Not use
    - name: multicast_address
      type: string
      description: Multicast group IP
    - name: multicast_port
      type: integer
      description: Multicast port 1 to 65535
    - name: ntp_enabled
      type: integer
      description: 0 = Not use
    - name: ntp_server
      type: string
      description: NTP server address
    - name: ntp_port
      type: integer
      description: NTP port 1 to 65535
    - name: time_zone
      type: string
      description: -1200 to +1400 (±HHMM, 30-min steps)
    - name: daylight_saving
      type: integer
      description: 0 = Not use
    - name: start_date
      type: string
      description: MMDDHHmm (1-hour units)
    - name: end_date
      type: string
      description: MMDDHHmm
    - name: camera_control_notification
      type: integer
      description: 0 = Not use

- id: g_network
  label: Network Setting Acquisition Request
  kind: query
  command: "g_network O 0000 00 NC"
  params: []

# --- 29. Dante Network Setting ---
- id: s_network_dante
  label: Dante Setting Change Request
  kind: action
  command: "s_network_dante S 0000 00 NC {mode},{latency},{primary_ip_mode},{primary_ip},{primary_subnet},{primary_gateway},{reserved},{reserved},{secondary_ip_mode},{secondary_ip},{secondary_subnet},{secondary_gateway}"
  params:
    - name: mode
      type: integer
      description: 0 = Single Cable, 2 = Split
    - name: latency
      type: integer
      description: 1=250us, 2=500us, 3=1ms, 4=2ms, 5=5ms
    - name: primary_ip_mode
      type: integer
      description: 0 = Auto, 1 = Static
    - name: primary_ip
      type: string
      description: Primary IP address
    - name: primary_subnet
      type: string
      description: Primary subnet mask
    - name: primary_gateway
      type: string
      description: Primary gateway
    - name: secondary_ip_mode
      type: integer
      description: Secondary IP acquisition method
    - name: secondary_ip
      type: string
      description: Secondary IP
    - name: secondary_subnet
      type: string
      description: Secondary subnet mask
    - name: secondary_gateway
      type: string
      description: Secondary gateway

- id: g_network_dante
  label: Dante Setting Acquisition Request
  kind: query
  command: "g_network_dante O 0000 00 NC"
  params: []

# --- 30. Firmware Version ---
- id: g_firmware_version
  label: Firmware Version Acquisition Request
  kind: query
  command: "g_firmware_version O 0000 00 NC"
  params: []

# --- 31. Header Color ---
- id: s_header_color
  label: Device Color Setting Change Request
  kind: action
  command: "s_header_color S 0000 00 NC {color}"
  params:
    - name: color
      type: integer
      description: 0=Green, 1=Yellow, 3=Red, 5=Blue, 8=Cyan

- id: g_header_color
  label: Device Color Setting Acquisition Request
  kind: query
  command: "g_header_color O 0000 00 NC"
  params: []

# --- 32. Log Setting ---
- id: s_log
  label: Log Setting Change Request
  kind: action
  command: "s_log S 0000 00 NC {enabled},{output_destination}"
  params:
    - name: enabled
      type: integer
      description: 0 = Disable, 1 = Enable
    - name: output_destination
      type: integer
      description: 0 = Internal, 2 = Syslog

- id: g_log
  label: Log Setting Acquisition Request
  kind: query
  command: "g_log O 0000 00 NC"
  params: []

# --- 33. LED Setting ---
- id: s_led
  label: LED Setting Change Request
  kind: action
  command: "s_led S 0000 00 NC {dimmer},{reserved},{power_save_color},{mute_color},{unmute_color}"
  params:
    - name: dimmer
      type: integer
      description: 0 = OFF, 1 = ON
    - name: power_save_color
      type: integer
      description: 0=Black, 1=Red, 2=Orange, 3=Yellow, 5=Purple, 6=Blue, 7=Aqua, 8=Green, 9=Cyan, 10=White
    - name: mute_color
      type: integer
      description: Mute LED color (0 to 10, same as power save)
    - name: unmute_color
      type: integer
      description: Unmute LED color (0 to 10)

- id: g_led
  label: LED Setting Acquisition Request
  kind: query
  command: "g_led O 0000 00 NC"
  params: []

# --- 34. Preset Call (current) ---
- id: call_preset
  label: Preset Call Request
  kind: action
  command: "call_preset S 0000 00 NC {bank}"
  params:
    - name: bank
      type: integer
      description: Bank number 1 to 16

# --- 35. Preset Save (current) ---
- id: save_preset
  label: Preset Save Request
  kind: action
  command: "save_preset S 0000 00 NC {bank}"
  params:
    - name: bank
      type: integer
      description: Bank number 1 to 16

# --- 36. Preset Bank Name ---
- id: s_name_bank
  label: Preset Bank Name Change Request
  kind: action
  command: "s_name_bank S 0000 00 NC {bank},{name}"
  params:
    - name: bank
      type: integer
      description: Bank number 1 to 16
    - name: name
      type: string
      description: Bank name (ASCII in double quotes)

- id: g_name_bank
  label: Preset Bank Name Acquisition Request
  kind: query
  command: "g_name_bank O 0000 00 NC"
  params: []

# --- 37. Boot Up Preset ---
- id: s_bootup_preset
  label: Boot Up Preset Setting Change Request
  kind: action
  command: "s_bootup_preset S 0000 00 NC {bank}"
  params:
    - name: bank
      type: integer
      description: 0 = Not select, 1 to 16 = Bank 1 to 16

- id: g_bootup_preset
  label: Boot Up Preset Setting Acquisition Request
  kind: query
  command: "g_bootup_preset O 0000 00 NC"
  params: []

# --- 38. Preset Number ---
- id: g_preset_number
  label: Preset Number Acquisition Request
  kind: query
  command: "g_preset_number O 0000 00 NC"
  params: []

# --- 39. File Transfer ---
- id: file_transfer
  label: File Transfer Request
  kind: action
  command: "file_transfer S 0000 00 {continue} {kind},{offset},{size},{binary_data}"
  params:
    - name: continue
      type: string
      description: NC/CS/CM/CE split indicator
    - name: kind
      type: string
      description: p1 top16 = Preset 1 to 16, log = Logging file
    - name: offset
      type: string
      description: 8-hex-char offset, no 0x prefix (e.g. 00000400)
    - name: size
      type: integer
      description: Transfer data size in DEC (1 to 1024)
    - name: binary_data
      type: string
      description: Transfer data (binary)

- id: file_transfer_cancel
  label: File Transfer Cancel Request
  kind: action
  command: "file_transfer_cancel S 0000 00 NC {kind}"
  params:
    - name: kind
      type: string
      description: p1 top16 or log

# --- 40. Export / Import ---
- id: export
  label: Export Request
  kind: query
  command: "export O 0000 00 NC {kind}"
  params:
    - name: kind
      type: string
      description: p1 top16 or log

- id: import
  label: Import Request
  kind: action
  command: "import S 0000 00 NC {kind}"
  params:
    - name: kind
      type: string
      description: p1 top16 or log

# --- 41. Level Meter Notification Interval ---
- id: s_level_meter_interval
  label: Level Meter Notification Interval Change Request
  kind: action
  command: "s_level_meter_interval S 0000 00 NC {interval}"
  params:
    - name: interval
      type: integer
      description: 100 to 300000 (msec)

- id: g_level_meter_interval
  label: Level Meter Notification Interval Acquisition Request
  kind: query
  command: "g_level_meter_interval O 0000 00 NC"
  params: []

# --- 42. Talker Position Interval ---
- id: s_camera_control_interval
  label: Talker Position Interval Change Request
  kind: action
  command: "s_camera_control_interval S 0000 00 NC {interval}"
  params:
    - name: interval
      type: integer
      description: 100 to 300000 (msec)

- id: g_camera_control_interval
  label: Talker Position Interval Acquisition Request
  kind: query
  command: "g_camera_control_interval O 0000 00 NC"
  params: []

# --- 43. Identify ---
- id: identify
  label: Identify Request
  kind: action
  command: "identify S 0000 00 NC"
  params: []

# --- 44. Date Setting ---
- id: s_date
  label: Date Setting Request
  kind: action
  command: "s_date S 0000 00 NC {timestamp}"
  params:
    - name: timestamp
      type: string
      description: YYYYMMDDHHMMSS (four-digit year)

# --- 45. Reboot ---
- id: reboot
  label: Reboot Request
  kind: action
  command: "reboot S 0000 00 NC"
  params: []

# --- 46. Power Save Mode ---
- id: s_powersave
  label: Power Save Mode Request
  kind: action
  command: "s_powersave S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0 = Power save mode canceled, 1 = Power save mode enabled

# --- 47. Device Mute (current) ---
- id: s_mute
  label: Device Mute Request
  kind: action
  command: "s_mute S 0000 00 NC {mute}"
  params:
    - name: mute
      type: integer
      description: 0 = unmute, 1 = mute

- id: g_mute
  label: Device Mute Status Acquisition Request
  kind: query
  command: "g_mute O 0000 00 NC"
  params: []

# --- 48. Dante Tx5 Setting ---
- id: s_dante_tx5
  label: Dante Tx5 Setting Change Request
  kind: action
  command: "s_dante_tx5 S 0000 00 NC {tx5}"
  params:
    - name: tx5
      type: integer
      description: 0 = Priority 4, 1 = Voice Lift Processing Level 1 output

- id: g_dante_tx5
  label: Dante Tx5 Setting Acquisition Request
  kind: query
  command: "g_dante_tx5 O 0000 00 NC"
  params: []

# --- 49. External Control (IR / GPI) ---
- id: s_remotecontrol
  label: External Control Setting Change Request
  kind: action
  command: "s_remotecontrol S 0000 00 NC {ir_power},{ir_mute},{ir_preset},{gpi_port_1},{gpi_port_2}"
  params:
    - name: ir_power
      type: integer
      description: IR remote Power Save Mode link 0 = Not use
    - name: ir_mute
      type: integer
      description: IR remote Mute link 0 = Not use
    - name: ir_preset
      type: integer
      description: IR remote Preset Recall Link 0 = Not use
    - name: gpi_port_1
      type: integer
      description: GPI port 1: 0=Power Save Mode, 1=Mute, 2=Reboot, 3=Camera Control
    - name: gpi_port_2
      type: integer
      description: GPI port 2: same options as port 1

- id: g_remotecontrol
  label: External Control Setting Acquisition Request
  kind: query
  command: "g_remotecontrol O 0000 00 NC"
  params: []

# --- 50. Device Interlock ---
- id: s_synccontrol
  label: Device Interlock Setting Change Request
  kind: action
  command: "s_synccontrol S 0000 00 NC {power},{mute},{preset},{group},{reserved}"
  params:
    - name: power
      type: integer
      description: Power Save Mode interlock 0 = Not interlocked
    - name: mute
      type: integer
      description: Mute interlock 0 = Not interlocked
    - name: preset
      type: integer
      description: Preset Recall Link interlock 0 = Not interlocked
    - name: group
      type: integer
      description: Interlocking group ID 1 to 128

- id: g_synccontrol
  label: Device Interlock Setting Acquisition Request
  kind: query
  command: "g_synccontrol O 0000 00 NC"
  params: []

# --- 51. Audio System ---
- id: s_audio_system
  label: Audio System Setting Change Request
  kind: action
  command: "s_audio_system S 0000 00 NC {reserved},{reserved},{reserved},{reserved},{tx6},{beam_sensitivity},{auto_attenuation},{attenuation_level},{hold_time}"
  params:
    - name: tx6
      type: integer
      description: Dante Tx#6 signal 0 = Automix, 1 = Priority 5
    - name: beam_sensitivity
      type: integer
      description: 0 = Low, 1 = Mid, 2 = High
    - name: auto_attenuation
      type: integer
      description: 0 = Disable, 1 = Enable
    - name: attenuation_level
      type: integer
      description: 0 to 28 (-∞, -30 to -3 dB; see Attenuation Table)
    - name: hold_time
      type: integer
      description: 0 to 100 (0 to 10 sec, 0.1 step)

- id: g_audio_system
  label: Audio System Setting Acquisition Request
  kind: query
  command: "g_audio_system O 0000 00 NC"
  params: []

# --- 52. Camera Device ---
- id: s_camera_device
  label: Camera Device Setting Change Request
  kind: action
  command: "s_camera_device S 0000 00 NC {device_no},{enable},{ip_address},{port_number},{protocol}"
  params:
    - name: device_no
      type: integer
      description: Camera number (1)
    - name: enable
      type: integer
      description: 0 = Not use, 1 = Use
    - name: ip_address
      type: string
      description: Camera IP
    - name: port_number
      type: integer
      description: 1 to 65535
    - name: protocol
      type: integer
      description: 0 = Panasonic, 1 = VISCA over IP

- id: g_camera_device
  label: Camera Device Setting Acquisition Request
  kind: query
  command: "g_camera_device O 0000 00 NC {device_no}"
  params:
    - name: device_no
      type: integer
      description: Camera number (1)

# --- 53. Camera Preset ---
- id: s_camera_preset
  label: Camera Preset Setting Change Request
  kind: action
  command: "s_camera_preset S 0000 00 NC {home},{g1},{g2},{g3},{g4},{g5},{g6},{g7},{g8},{g9},{g10},{g11},{g12},{g13},{g14},{g15}"
  params:
    - name: home
      type: string
      description: HOME / 1 to 100 (Preset number for silent)
    - name: g1
      type: integer
      description: Group 1 position 1 to 100
    - name: g2
      type: integer
      description: Group 2 position 1 to 100
    - name: g3
      type: integer
      description: Group 3 position 1 to 100
    - name: g4
      type: integer
      description: Group 4 position 1 to 100
    - name: g5
      type: integer
      description: Group 5 position 1 to 100
    - name: g6
      type: integer
      description: Group 6 position 1 to 100
    - name: g7
      type: integer
      description: Group 7 position 1 to 100
    - name: g8
      type: integer
      description: Group 8 position 1 to 100
    - name: g9
      type: integer
      description: Group 9 position 1 to 100
    - name: g10
      type: integer
      description: Group 10 position 1 to 100
    - name: g11
      type: integer
      description: Group 11 position 1 to 100
    - name: g12
      type: integer
      description: Group 12 position 1 to 100
    - name: g13
      type: integer
      description: Group 13 position 1 to 100
    - name: g14
      type: integer
      description: Group 14 position 1 to 100
    - name: g15
      type: integer
      description: Group 15 position 1 to 100

- id: g_camera_preset
  label: Camera Preset Setting Acquisition Request
  kind: query
  command: "g_camera_preset O 0000 00 NC"
  params: []

# --- 54. Camera Control Time ---
- id: s_camera_control
  label: Camera Control Time Setting Change Request
  kind: action
  command: "s_camera_control S 0000 00 NC {time_to_recall},{enable_go_home},{time_to_go_home}"
  params:
    - name: time_to_recall
      type: integer
      description: Time to Recall Preset 500 to 10000 (msec)
    - name: enable_go_home
      type: integer
      description: 0 = Not use, 1 = Use
    - name: time_to_go_home
      type: integer
      description: Time to go back Home 500 to 100000 (msec)

- id: g_camera_control
  label: Camera Control Time Setting Acquisition Request
  kind: query
  command: "g_camera_control O 0000 00 NC"
  params: []

# --- 55. Camera Control Pause ---
- id: s_camera_stop
  label: Camera Control Pause Request
  kind: action
  command: "s_camera_stop S 0000 00 NC {stop}"
  params:
    - name: stop
      type: integer
      description: 0 = Unpause, 1 = Pause
```

## Feedbacks
```yaml
# Common reply templates. Every Set command returns ACK or NAK; every Get command
# returns Answer (or NAK on error). The source documents explicit NAK error codes:
#   01 = Syntax error
#   02 = Invalid command
#   03 = Splitting transmission error
#   04 = Parameter error
#   05 = Transmission timeout (unused)
#   90 = Busy
#   92 = Busy (Save mode)
#   93 = Busy (Extension, unused)
#   99 = Other errors

- id: ack
  type: object
  description: |
    Acknowledgement of a successful Set command. Format: "{command} ACK\r"
    e.g. "factory_settings ACK\r"

- id: nak
  type: object
  description: |
    Negative acknowledgement. Format: "{command} NAK {error_code}\r"
    e.g. "factory_settings NAK 01\r"

- id: answer
  type: object
  description: |
    Get-command response. Format: "{command} {model_id} {unit_no} {continue} {params}\r"
    where model_id=0000 (fixed), unit_no=Device ID (00 to FF), continue=NC/CS/CM/CE.
```

## Variables
```yaml
# State variables queryable via the G* commands listed in the Actions section.
# Each variable below corresponds to one or more Get commands enumerated above.

- id: power_save_mode
  type: enum
  values: [canceled, enabled]
  query: g_audio_system power save mode (s_powersave sets it)

- id: device_mute
  type: enum
  values: [unmuted, muted]
  query: g_mute

- id: device_id_hex
  type: string
  description: 00 to FF
  query: g_deviceid

- id: device_id_string
  type: string
  description: 0000 to 03E7 hex, or 0 to 999 decimal
  query: GDID

- id: firmware_version
  type: string
  description: XX.XX.XX
  query: g_firmware_version

- id: gain_share_mode
  type: enum
  values: [standalone, link]
  query: g_gainshare_mode

- id: agc_enable
  type: enum
  values: [off, on]
  query: g_agc

- id: voice_lift_processing
  type: integer
  description: 1 to 5
  query: g_voicelift

- id: bootup_preset
  type: integer
  description: 0 = not select, 1 to 16
  query: g_bootup_preset

- id: preset_number
  type: integer
  description: Current preset bank number
  query: g_preset_number

- id: dante_tx5_signal
  type: enum
  values: [priority4, voicelift_level1]
  query: g_dante_tx5

- id: dante_tx6_signal
  type: enum
  values: [automix, priority5]
  query: g_audio_system (Tx6 field)

- id: beam_sensitivity
  type: enum
  values: [low, mid, high]
  query: g_audio_system

- id: auto_attenuation
  type: enum
  values: [disable, enable]
  query: g_audio_system

- id: vad_enable
  type: enum
  values: [disabled, enabled]
  query: SVAD (set-only; no Get documented in source)
```

## Events
```yaml
# Unsolicited status change notifications sent by the device via UDP multicast
# to 239.000.000.100:17000. Common format (Table 2-8):
#   "MD <command> 0000 {device_id} {continue} {params}\r"
# Suppressed when IP Control Setting Notification (or Audio Level Notification, or
# Camera Control Notification, depending on the event) is 0 in the network setting.

- id: level_meter_notice
  description: |
    Periodic level meter report. Includes per-beam post-fader levels (0 to 61),
    analog in/out (0 to 61), auto mix (0 to 61), voice lift channel (0 to 61),
    AEC ERL (0 to 60), and gain share meters per beam (0 to 15). Default
    interval 100 ms (set by s_level_meter_interval, range 100 to 300000 ms).
  format: "MD level_meter_notice 0000 {device_id} NC {level_0..6},{reserved*5},{level_12},{level_13},{level_14},{reserved*7},{level_22},{reserved*7},{level_32..37},{reserved*2}\r"

- id: input_gain_level_meter_notice
  description: |
    Sent when input gain/level setting changes from the device. Suppressed when
    IP Control Setting Notification = 0.
  format: "MD input_gain_level_meter_notice 0000 {device_id} NC {channel},{mic_gain},{line_gain},{level},{mute}\r"

- id: output_level_notice
  description: |
    Sent when output level setting changes from the device.
  format: "MD output_level_notice 0000 {device_id} NC {channel},{level}\r"

- id: output_mute_notice
  description: |
    Sent when output mute setting changes from the device.
  format: "MD output_mute_notice 0000 {device_id} NC {channel},{mute}\r"

- id: recall_preset_notice
  description: |
    Sent when a preset is recalled from the device (e.g. via GPI or front panel).
  format: "MD recall_preset_notice 0000 {device_id} NC {bank}\r"

- id: talkerposition_notice
  description: |
    Periodic talker position / camera control report. Suppressed when IP Control
    Setting Camera Control Notification = 0. Default interval 100 ms
    (s_camera_control_interval, range 100 to 300000 ms).
  format: "MD talkerposition_notice 0000 {device_id} NC {status},{channel},{angle},{rotate},{camera_no}\r"
  fields:
    - name: status
      enum: [not_speaking, speaking]
    - name: channel
      description: 0 to 5 = Beam Channel 1 to 6; omitted when out of range or status=0
    - name: angle
      description: Elevation 0 to 90
    - name: rotate
      description: Rotation 0 to 360
    - name: camera_no
      description: 0 = no camera area, 1 to 15 = camera area

- id: powersave_notice
  description: |
    Sent when the device's power save mode state changes.
  format: "MD powersave_notice 0000 {device_id} NC {mode}\r"
  fields:
    - name: mode
      enum: [canceled, enabled]

- id: mute_notice
  description: |
    Sent when the device's mute state changes.
  format: "MD mute_notice 0000 {device_id} NC {mute}\r"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
# Factory default reset (factory_settings) is a single command, not a macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Device Interlock Setting (s_synccontrol)
# provides programmable interlock behavior between Power Save Mode, Mute, and
# Preset Recall Link across 128 groups, but this is functional configuration,
# not a documented safety-critical interlock.
```

## Notes
- **Document version**: IP Control Specifications v5.0 (2023-10-27). Earlier revisions (1.0–4.0) changed command examples, corrected dB notation, and added Voice Lift / Dante Tx5 / Device ID / camera-related commands.
- **Two products covered**: ATND1061LK and ATND1061DAN share this command set. The base model "ATND1061" is referenced throughout the document.
- **Connection model**: TCP (control plane) + UDP multicast (status plane). Up to 5 simultaneous TCP connections per device; excess connections are refused.
- **Message framing**: All commands are space-delimited ASCII with comma-separated parameters. Each message ends with CR (0x0D). String parameters are enclosed in double quotes; embedded double-quote characters are doubled.
- **Handshake modes**: `S` = ACK/NAK response expected, `O` = one-way (no ACK). `H` (handshake) is documented but unused.
- **Continue Select**: `NC` = no split, `CS/CM/CE` for split messages. Used for multi-part replies (e.g. `g_name_bank` listing 16 bank names).
- **Simultaneous connections**: 5-device limit. After disconnect, device state is cleared and re-enters connection-wait.
- **Reboot required**: Changes to network settings (`s_network`) and Dante settings (`s_network_dante`) require a reboot to take effect.
- **Notification gating**: All status change notifications are suppressed when the corresponding notification flag in network settings is 0 (Notification / Audio Level Notification / Camera Control Notification).
- **Level Meter default interval**: 100 ms, configurable 100–300000 ms.
- **Preset banks**: 16 banks. Each bank has a user-assignable name (`s_name_bank`).
- **Fader table**: Linear 0–511 maps to -∞, -120 dB to +10 dB (see source appendix Table 6.1).
- **Frequency table**: EQ band frequencies encoded 0–480 mapping to 20 Hz–20 kHz.
- **Firmware version compatibility**: Not stated in source.
- **Power/electrical specs**: Not stated in source.
- **Authentication**: No login, password, or token mechanism is described; control is unauthenticated on the IP control port.

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATND1061_IP_Control_Specifications_V4_EN_web_240114.pdf
retrieved_at: 2026-06-01T22:46:22.948Z
last_checked_at: 2026-06-01T23:12:13.711Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:13.711Z
matched_actions: 93
action_count: 93
confidence: medium
summary: "All 93 spec action commands match verbatim in the source; transport port/multicast values confirmed; all 8 source info (MD) commands are represented in spec Feedbacks. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage, current, and power specifications not stated in source. Authentication credentials or login procedures not documented."
- "no multi-step sequences explicitly documented in source."
- "source does not contain explicit safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
