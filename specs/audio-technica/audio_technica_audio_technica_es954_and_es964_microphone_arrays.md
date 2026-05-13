---
spec_id: admin/audio-technica-atdm-0604a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATDM-0604a IP Control Spec"
manufacturer: Audio-Technica
model_family: ATDM-0604a
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATDM-0604a
    - ES954
    - ES964
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audio-technica.com
  - docs.audio-technica.com
retrieved_at: 2026-05-04T15:16:41.162Z
last_checked_at: 2026-05-08T15:39:07.488Z
generated_at: 2026-05-08T15:39:07.488Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-08T15:39:07.488Z
  matched_actions: 121
  action_count: 121
  confidence: high
  summary: "All 121 spec actions matched source commands; transport parameters (TCP/UDP, port 17300) confirmed; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Audio-Technica ATDM-0604a IP Control Spec

## Summary
IP-controlled Digital SmartMixer supporting TCP and UDP on port 17300. ASCII text-based command protocol with no authentication. Controls input/output levels, faders, EQ, dynamics, AEC, SmartMix groups, presets, and array microphone mute. ES954 (1ch) and ES964 (4ch) appear as Virtual Mic Mode endpoints in parameters.

<!-- UNRESOLVED: source covers ATDM-0604a SmartMixer; ES954/ES964 are microphone arrays that connect via AT-LINK, not directly IP-controlled. Commands (s_arraymic_mute, etc.) apply to the SmartMixer that hosts them. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300  # stated: Table 4-1 default port 17300
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from command set:
# - levelable: input/output level change commands (SICL, SOCL, etc.)
# - routable: bus assign commands (SBUS, GBUS)
# - queryable: acquisition commands returning state (GICL, GOCL, etc.)
# - powerable: power on/off not in source - not inferred
Traits:
  - levelable
  - routable
  - queryable
```

## Actions
```yaml
# Set commands (S prefix) - host → device
# Get commands (G prefix) - host → device, Answer response
# Request commands - unsolicited from device

- id: sicL
  label: Input CH Level Change
  kind: action
  params:
    - name: channel
      type: integer
      description: Input channel 0-5 (Channel 1-6)
    - name: level
      type: integer
      description: Level 0-511 (−∞ to +10dB)

- id: sicM
  label: Input CH Mute State Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer

- id: socL
  label: Output CH Level Change
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-1 (Output 1-2)
    - name: level
      type: integer

- id: socM
  label: Output CH Mute State Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer

- id: sbus
  label: Bus Assign Change
  kind: action
  params:
    - name: input_channel
      type: integer
    - name: bus_channel
      type: integer
      description: 1-3 (BUS 1, BUS 2, BUS ST)
    - name: bus_assign
      type: integer
      description: 0=Off, 1=SmartMix Pre, 2=SmartMix Post
    - name: level
      type: integer

- id: sopL
  label: Operator Fader Level Change
  kind: action
  params:
    - name: fader_no
      type: integer
    - name: level
      type: integer

- id: sopM
  label: Operator Fader Mute State Change
  kind: action
  params:
    - name: fader_no
      type: integer
    - name: mute
      type: integer

- id: ssmM
  label: SmartMix Mode Change
  kind: action
  params:
    - name: group
      type: integer
      description: Fixed to 1
    - name: mode
      type: integer
      description: 0=Off, 1=Gate, 2=Gain Share

- id: nooM
  label: No. of Open Mic Change
  kind: action
  params:
    - name: group
      type: integer
    - name: nom
      type: integer
      description: 1-10

- id: callp
  label: Preset Call
  kind: action
  params:
    - name: preset_number
      type: integer

- id: regip
  label: Preset Save
  kind: action
  params:
    - name: preset_number
      type: integer

- id: callpp
  label: Partial Preset Call
  kind: action
  params:
    - name: partial_preset_number
      type: integer
      description: 1-40

- id: sdid
  label: Device ID Change
  kind: action
  params:
    - name: device_id
      type: integer
      description: 0-999 or 0-999

- id: sfid
  label: Device ID Format Setting
  kind: action
  params:
    - name: format
      type: integer
      description: 0=Hex, 1=Decimal

- id: s_input_gain_level
  label: Input Gain&Level Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: gain_mic
      type: integer
      description: 0-40 (+20dB to +60dB)
    - name: gain_line
      type: integer
      description: 0-40 (−20dBu to −60dBu)
    - name: level
      type: integer
    - name: max_volume_enable
      type: integer
    - name: max_volume_value
      type: integer
    - name: mute
      type: integer
    - name: gain_virtual_mic
      type: integer

- id: s_input_channel_settings
  label: Input Channel Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: integer
      description: 0=Mic, 1=Line+4dBu, 2=Line0dBV, 3=Line-10dBV, 4=Line-20dBV, 5=USB, 6=Virtual Mic, 8=A-T LINK, 10=A-T LINK MIX(port A), 11=A-T LINK MIX(port B)
    - name: phantom_power
      type: integer
    - name: phase
      type: integer
    - name: low_cut
      type: integer
    - name: aec
      type: integer
    - name: smart_mix
      type: integer
    - name: link
      type: integer
    - name: bus1_assign
      type: integer
    - name: bus2_assign
      type: integer
    - name: bus_st_assign
      type: integer
    - name: name
      type: string
    - name: color
      type: integer
    - name: virtual_mic_orientation
      type: integer
    - name: virtual_mic_tilt
      type: integer
    - name: virtual_mic_pattern
      type: integer
    - name: fader_group
      type: integer
    - name: mono
      type: integer

- id: s_input_eq
  label: Input EQ Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: eq_on_off
      type: integer
    - name: band1_enable
      type: integer
    - name: band1_filter_type
      type: integer
    - name: band1_frequency
      type: integer
    - name: band1_gain
      type: integer
    - name: band1_q
      type: integer
    - name: band2_enable
      type: integer
    - name: band2_frequency
      type: integer
    - name: band2_gain
      type: integer
    - name: band2_q
      type: integer
    - name: band3_enable
      type: integer
    - name: band3_frequency
      type: integer
    - name: band3_gain
      type: integer
    - name: band3_q
      type: integer
    - name: band4_enable
      type: integer
    - name: band4_filter_type
      type: integer
    - name: band4_frequency
      type: integer
    - name: band4_gain
      type: integer
    - name: band4_q
      type: integer
    - name: eq_mode
      type: integer
      description: 0=EasyMode, 1=Expert Mode

- id: s_fbs_general
  label: FBS Common Setting Change
  kind: action
  params:
    - name: detection
      type: integer
      description: 0=Low, 1=Mid, 2=High
    - name: response
      type: integer
      description: 0=Slow, 1=Fast

- id: s_fbs
  label: FBS Setting Change
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (Input 1-6), 12-13 (Output 1-2), 20 (Output ST)
    - name: processing_type
      type: integer
      description: 0=Reset, 1=All Static, 2=Copy to EQ, 3=Band Setting
    - name: enable
      type: integer
    - name: band1_static
      type: integer
    - name: band2_static
      type: integer
    - name: band3_static
      type: integer
    - name: band4_static
      type: integer
    - name: band5_static
      type: integer
    - name: band6_static
      type: integer
    - name: band7_static
      type: integer
    - name: band8_static
      type: integer

- id: s_input_channel_comp_settings
  label: Input Channel Dynamics Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: enable
      type: integer
    - name: comp_deesser
      type: integer
      description: 0=Comp, 1=DeEsser
    - name: threshold
      type: integer
      description: 0-60 (−60dB to 0dB)
    - name: ratio
      type: integer
      description: 0=1:1.4, 1=1:2, 2=1:4, 3=1:6, 4=1:10, 5=+∞
    - name: attack_time
      type: integer
      description: 0=0msec, 25=0.25msec, 50=0.5msec, 100=1msec, 200=2msec, 400=4msec, 800=8msec, 1600=16msec, 3200=32msec, 10000=100msec
    - name: release_time
      type: integer
      description: 50,100,200,400,800,1000,2000msec
    - name: output_gain
      type: integer
      description: 0-20 (10dB to −10dB)
    - name: deesser_band1_filter_type
      type: integer
    - name: deesser_band1_frequency
      type: integer
    - name: deesser_band1_gain
      type: integer
    - name: deesser_band1_q
      type: integer
    - name: deesser_band2_filter_type
      type: integer
    - name: deesser_band2_frequency
      type: integer
    - name: deesser_band2_gain
      type: integer
    - name: deesser_band2_q
      type: integer
    - name: deesser_side_chain
      type: integer
    - name: deesser_low_cut
      type: integer

- id: s_aec_general
  label: AEC Setting Change
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=AEC, 2=Noise Canceling
    - name: aec_reference
      type: integer
      description: 0-5 (Input 1-6), 12-13 (Output 1-2), 22 (Output ST), 23 (External)
    - name: send_reference
      type: integer
    - name: input_bus_select
      type: integer
      description: 0=Bus1, 1=Bus2, 10=Bus ST
    - name: output1
      type: integer
    - name: output2
      type: integer
    - name: output_st
      type: integer
    - name: aec_attenuation
      type: integer
      description: 0-20 (0 to 20dB)
    - name: noise_canceling_attenuation
      type: integer
    - name: non_linear_processing_enable
      type: integer
    - name: non_linear_processing_sensitivity
      type: integer
      description: 0=Low, 1=Mid, 2=High

- id: s_smart_mix
  label: Smart Mix Setting Change
  kind: action
  params: []

- id: s_smart_mix_general
  label: Smart Mix Common Setting Change
  kind: action
  params: []

- id: s_ducker_general
  label: Ducker Setting Change
  kind: action
  params: []

- id: s_output_level
  label: Output Level Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: level
      type: integer

- id: s_output_mute
  label: Output Channel Mute Setting Change
  kind: action
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer

- id: s_output_channel_settings
  label: Output Channel Setting Change
  kind: action
  params: []

- id: s_output_eq
  label: Output EQ Setting Change
  kind: action
  params: []

- id: s_output_12eq_func
  label: 12 Band EQ Function Request
  kind: action
  params: []

- id: s_dynamics_delay
  label: Dynamics&Delay Setting Change
  kind: action
  params: []

- id: s_usb_out
  label: USB Output Setting Change
  kind: action
  params: []

- id: s_oscillator
  label: Oscillator Control Setting Change
  kind: action
  params: []

- id: s_operator_general
  label: Operator Page Common Setting Change
  kind: action
  params: []

- id: s_operator_pagesettings
  label: Operator Page Setting Change
  kind: action
  params: []

- id: s_operator_channel
  label: Operator Page Channel Setting Change
  kind: action
  params: []

- id: s_operator_assign
  label: Operator Page Assign Channel Setting Change
  kind: action
  params: []

- id: s_operator_mute
  label: Operator Page Channel Mute
  kind: action
  params:
    - name: operator_fader_no
      type: integer
    - name: mute
      type: integer

- id: s_arraymic_mute
  label: ArrayMic Mute Control
  kind: action
  params:
    - name: unit_type
      type: integer
      description: 1=ES954, 4=ES964
    - name: mute
      type: integer
      description: 0=Off, 1=On

- id: factory_settings
  label: Factory Default Setting
  kind: action
  params: []

- id: s_permission
  label: Permission Setting Change
  kind: action
  params: []

- id: s_network
  label: Network Setting Change
  kind: action
  params: []

- id: s_header_color
  label: Header Color Setting Change
  kind: action
  params: []

- id: s_link
  label: AT-LINK Mode Setting Change
  kind: action
  params: []

- id: s_connected_limit
  label: Connected Device Limit Setting Change
  kind: action
  params: []

- id: s_audio_system
  label: Audio System Setting Change
  kind: action
  params: []

- id: s_front_panel
  label: Front Panel Setting Change
  kind: action
  params: []

- id: s_front_panel_limit
  label: Front Panel Function Setting Change
  kind: action
  params: []

- id: s_log
  label: Log Setting Change
  kind: action
  params: []

- id: call_preset
  label: Preset Call (system)
  kind: action
  params: []

- id: save_preset
  label: Preset Save (system)
  kind: action
  params: []

- id: s_name_bank
  label: Preset Bank Name Change
  kind: action
  params: []

- id: s_bootup_preset
  label: Boot Up Preset Setting Change
  kind: action
  params: []

- id: s_preset_general
  label: Preset Common Setting Change
  kind: action
  params: []

- id: call_partial_preset
  label: Partial Preset Call (system)
  kind: action
  params: []

- id: file_transfer
  label: File Transfer Request
  kind: action
  params: []

- id: file_transfer_cancel
  label: File Transfer Cancel Request
  kind: action
  params: []

- id: export
  label: Export Request
  kind: action
  params: []

- id: import
  label: Import Request
  kind: action
  params: []

- id: s_level_meter_interval
  label: Level Meter Notification Interval Setting Change
  kind: action
  params: []

- id: s_date
  label: Date Setting
  kind: action
  params: []

- id: reboot
  label: Reboot Request
  kind: action
  params: []

- id: zidip
  label: IP Command Compatibility Setting Change
  kind: action
  params: []

- id: s_gpo_setting
  label: GPO Setting Change
  kind: action
  params: []

- id: s_gpo_action
  label: GPO Control
  kind: action
  params: []

- id: s_peripheral_deviceid
  label: Connected Device's Device ID Setting
  kind: action
  params: []

# Get commands
- id: gicL
  label: Input CH Level Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: gicM
  label: Input CH Mute State Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: gocL
  label: Output CH Level Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: gocM
  label: Output CH Mute State Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: gbus
  label: Bus Assign Acquisition
  kind: action
  params:
    - name: input_channel
      type: integer
    - name: bus_channel
      type: integer

- id: gopL
  label: Operator Fader Level Acquisition
  kind: action
  params:
    - name: fader_no
      type: integer

- id: gopM
  label: Operator Fader Mute State Acquisition
  kind: action
  params:
    - name: fader_no
      type: integer

- id: gsmM
  label: SmartMix Mode Acquisition
  kind: action
  params:
    - name: group
      type: integer

- id: gnooM
  label: No. of Open Mic Acquisition
  kind: action
  params:
    - name: group
      type: integer

- id: gdid
  label: Device ID Acquisition
  kind: action
  params: []

- id: g_input_gain_level
  label: Input Gain&Level Setting Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: g_input_channel_settings
  label: Input Channel Setting Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: g_input_channel_settings2
  label: Input Channel Setting Acquisition 2
  kind: action
  params:
    - name: channel
      type: integer

- id: g_input_eq
  label: Input EQ Setting Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: g_fbs_general
  label: FBS Common Setting Acquisition
  kind: action
  params: []

- id: g_fbs
  label: FBS Setting Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: g_input_channel_comp_settings
  label: Input Channel Dynamics Setting Acquisition
  kind: action
  params:
    - name: channel
      type: integer

- id: g_aec_general
  label: AEC Setting Acquisition
  kind: action
  params: []

- id: g_smart_mix
  label: Smart Mix Setting Acquisition
  kind: action
  params: []

- id: g_smart_mix_general
  label: Smart Mix Common Setting Acquisition
  kind: action
  params: []

- id: g_ducker_general
  label: Ducker Setting Acquisition
  kind: action
  params: []

- id: g_output_level
  label: Output Level Setting Acquisition
  kind: action
  params: []

- id: g_output_mute
  label: Output Channel Mute Setting Acquisition
  kind: action
  params: []

- id: g_output_channel_settings
  label: Output Channel Setting Acquisition
  kind: action
  params: []

- id: g_output_eq
  label: Output EQ Setting Acquisition
  kind: action
  params: []

- id: g_dynamics_delay
  label: Dynamics&Delay Setting Acquisition
  kind: action
  params: []

- id: g_usb_out
  label: USB Output Setting Acquisition
  kind: action
  params: []

- id: g_oscillator
  label: Oscillator Control Setting Acquisition
  kind: action
  params: []

- id: g_operator_general
  label: Operator Page Common Setting Acquisition
  kind: action
  params: []

- id: g_operator_pagesettings
  label: Operator Page Setting Acquisition
  kind: action
  params: []

- id: g_operator_channel
  label: Operator Page Channel Setting Acquisition
  kind: action
  params: []

- id: g_operator_assign
  label: Operator Page Assign Channel Setting Acquisition
  kind: action
  params: []

- id: g_arraymic_mute
  label: ArrayMic Mute Status Acquisition
  kind: action
  params:
    - name: unit_type
      type: integer
      description: 1=ES954, 4=ES964

- id: g_deviceid
  label: Device ID Acquisition (system)
  kind: action
  params: []

- id: g_permission
  label: Permission Setting Acquisition
  kind: action
  params: []

- id: g_network
  label: Network Setting Acquisition
  kind: action
  params: []

- id: g_firmware_version
  label: Firmware Version Acquisition
  kind: action
  params: []

- id: g_header_color
  label: Header Color Setting Acquisition
  kind: action
  params: []

- id: g_link
  label: AT-LINK Mode Setting Acquisition
  kind: action
  params: []

- id: g_link_extstatus
  label: AT-LINK Status Acquisition
  kind: action
  params: []

- id: g_connected_limit
  label: Connected Device Limit Setting Acquisition
  kind: action
  params: []

- id: g_audio_system
  label: Audio System Setting Acquisition
  kind: action
  params: []

- id: g_front_panel
  label: Front Panel Setting Acquisition
  kind: action
  params: []

- id: g_front_panel_limit
  label: Front Panel Function Setting Acquisition
  kind: action
  params: []

- id: g_log
  label: Log Setting Acquisition
  kind: action
  params: []

- id: g_name_bank
  label: Preset Bank Name Acquisition
  kind: action
  params: []

- id: g_bootup_preset
  label: Boot Up Preset Setting Acquisition
  kind: action
  params: []

- id: g_preset_general
  label: Preset Common Setting Acquisition
  kind: action
  params: []

- id: g_preset_number
  label: Preset Number Acquisition
  kind: action
  params: []

- id: g_partial_preset_number
  label: Partial Preset Number Acquisition
  kind: action
  params: []

- id: g_level_meter_interval
  label: Level Meter Notification Interval Setting Acquisition
  kind: action
  params: []

- id: g_level_meter
  label: Level Meter Acquisition
  kind: action
  params: []

- id: g_gpo_setting
  label: GPO Setting Acquisition
  kind: action
  params: []

- id: g_gpo_action
  label: GPO Status Acquisition
  kind: action
  params: []

- id: g_peripheral_status
  label: Connected Device Status Acquisition
  kind: action
  params: []

- id: g_peripheral_info
  label: Connected Device Information Acquisition
  kind: action
  params: []
```

## Feedbacks
```yaml
# ACK - positive acknowledgement to Set Command
# NAK - negative acknowledgement; includes 2-byte error code
#   01=Syntax error, 02=Invalid command, 03=Splitting transmission error,
#   04=Parameter error, 05=Transmission timeout, 06=Device ID duplicate,
#   90=Busy, 92=Busy (Save mode), 93=Busy (Extension), 99=Other errors
# Answer - response to Get Command (G prefix)
# Information - unsolicited status change notification (MD prefix)
# Request - unsolicited request from device to host (RQ prefix); not supported per source

- id: ack
  label: Acknowledge
  type: string
  values:
    - ACK

- id: nak
  label: Negative Acknowledge
  type: object
  properties:
    - name: error_code
      type: string
      description: 2-byte hex error code

- id: answer
  label: Setting Status Response
  type: object
  description: Response format to Get commands; format varies per command

- id: information
  label: Status Change Notification
  type: object
  description: Unsolicited MD-prefixed notifications from device

- id: input_gain_level_meter_notice
  label: Input Gain/Level Setting Notice
  type: object

- id: output_level_notice
  label: Output Level Setting Notice
  type: object

- id: output_mute_notice
  label: Output Mute Setting Notice
  type: object

- id: open_channel_notice
  label: Open Channel State Notice
  type: object

- id: cancut_notice
  label: Can Cut Notice
  type: object

- id: fbs_notice
  label: FBS Notice
  type: object

- id: operator_channel_notice
  label: Operator Page Channel Setting Notification
  type: object

- id: arraymic_mute_notice
  label: ArrayMic Mute Status Notice
  type: object

- id: rec_status_notice
  label: Recording Status Notification
  type: object

- id: recall_preset_notice
  label: Preset Call Notification
  type: object

- id: recall_partial_preset_notice
  label: Partial Preset Call Notification
  type: object

- id: level_meter_notice
  label: Level Meter Notification
  type: object

- id: ip_control_start_notice
  label: IP Control Start Notification
  type: object

- id: gpo_action_notice
  label: GPO Control Notification
  type: object

- id: peripheral_status_notice
  label: Connected Device Status Notification
  type: object

- id: peripheral_info_notice
  label: Connected Device Information Notification
  type: object
```

## Variables
```yaml
# UNRESOLVED: variables are GET/SET paired; see Actions for read/write pairs.
# Key settable parameters with defined ranges:
#   Input level: 0-511 (−∞ to +10dB)
#   Output level: 0-511 (−∞ to +10dB)
#   Operator fader: 0-100
#   Input gain (Mic): 0-40 (+20dB to +60dB)
#   Input gain (Line): 0-40 (−20dBu to −60dBu)
#   Phantom power: 0=Off (explicit in source; no "on" value stated)
```

## Events
```yaml
# Device → host unsolicited notifications (Information / Request):
# UNRESOLVED: not all events fully documented in source. Key events include:
#   open_channel_notice, cancut_notice, fbs_notice, level_meter_notice,
#   arraymic_mute_notice, recall_preset_notice, peripheral_status_notice,
#   ip_control_start_notice, gpo_action_notice.
# Request commands from device are stated as "(Not supported)" by the source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes

Command format: `Command␣HandshakeSelect␣DeviceID␣UnitID␣ContinueSelect␣Parameters␣CR`

- Delimiter: single-byte space (0x20)
- Parameters: ASCII; UTF-8 for named strings
- End character: CR (0x0D)
- Maximum data length: 287 bytes (32 byte header + 255 byte payload)
- Simultaneous TCP connections: max 5 devices
- Device ID system supports new format (0000–0999, A001–B099) and legacy (0000 fixed)
- ID format switched via `ZIDIP` command
- ES954 (unit_type=1) and ES964 (unit_type=4) are Virtual Mic Mode devices on AT-LINK network; their mute is controlled via ATDM-0604a commands `s_arraymic_mute` / `g_arraymic_mute`.

<!-- UNRESOLVED: source document is ATDM-0604a IP Control Protocol Specifications v1.2; ES954/ES964 are listed as compatible Virtual Mic products but are microphone arrays connected via AT-LINK to the SmartMixer — direct IP control is via the ATDM-0604a host. Port 17300 is default, no explicit statement that it cannot be changed. -->

## Provenance

```yaml
source_domains:
  - audio-technica.com
  - docs.audio-technica.com
retrieved_at: 2026-05-04T15:16:41.162Z
last_checked_at: 2026-05-08T15:39:07.488Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:39:07.488Z
matched_actions: 121
action_count: 121
confidence: high
summary: "All 121 spec actions matched source commands; transport parameters (TCP/UDP, port 17300) confirmed; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
