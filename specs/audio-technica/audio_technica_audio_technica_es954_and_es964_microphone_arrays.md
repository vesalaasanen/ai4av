---
spec_id: admin/audio-technica-atdm-0604a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATDM-0604a IP Control Spec (ES954 / ES954 / ES964 Microphone Arrays)"
manufacturer: Audio-Technica
model_family: ATDM-0604a
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATDM-0604a
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATDM-0604a_IP_Control_Protocol_Specifications_EN_Ver1.2_web_231118.pdf
  - https://docs.audio-technica.com/us/ATDM-0604_IP_Control_Protcol_Specification_EN_Ver1.1.3_web_200821.pdf
retrieved_at: 2026-05-07T07:24:57.105Z
last_checked_at: 2026-06-02T17:21:30.749Z
generated_at: 2026-06-02T17:21:30.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The spec covers the ATDM-0604a SmartMixer host; the ES954/ES964 are microphone array models connected to it (selected via `Virtual Mic Mode` values 1=ES954, 4=ES964 in `s_audio_system`). No standalone protocol for ES954/ES964 was found in the source."
  - "no safety warnings, fault procedures, or interlocks documented in source"
  - "firmware version compatibility matrix at the end of the source is cut off (table 6.x) — exact version constraints not captured. The level_meter_notice / fbs_notice parameter count and exact field list depend on firmware; the spec enumerates the documented parameter set. GPO control via ES954/ES964 button press is described in the source as a derived behaviour of `s_operator_general` button_link + `s_gpo_setting` function=0, but the exact LED behaviour is not specified."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:30.749Z
  matched_actions: 141
  action_count: 141
  confidence: medium
  summary: "All 141 spec actions have literal wire-token matches in the source (Table 3-1 enumerates all 140 command rows; two are double-listed so unique count is ~136; spec covers all variants including GPO/peripheral); transport port 17300 and multicast 239.000.000.100:17000 confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audio-Technica ATDM-0604a IP Control Spec

## Summary
IP control protocol for the Audio-Technica ATDM-0604a Digital SmartMixer, which is the device that hosts and controls the ES954 and ES964 microphone arrays (selected via Virtual Mic Mode). Control is carried over TCP port 17300 (commands) and UDP multicast 239.000.000.100 port 17000 (status change notifications). Commands are ASCII text, space-delimited, CR-terminated, with a fixed envelope: `<command>␣<S|O>␣<device_id>␣<unit_id>␣<continue>␣<params>\r`.

<!-- UNRESOLVED: The spec covers the ATDM-0604a SmartMixer host; the ES954/ES964 are microphone array models connected to it (selected via `Virtual Mic Mode` values 1=ES954, 4=ES964 in `s_audio_system`). No standalone protocol for ES954/ES964 was found in the source. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300
  multicast_address: 239.000.000.100  # stated in source Table 5-1
  multicast_port: 17000  # stated in source Table 5-1
auth:
  type: none  # inferred: source documents "Password not required" as default; s_permission can enable password (set Password require=1)
```

## Traits
```yaml
# - queryable       (extensive g_* acquisition / Get Commands present)
# - levelable       (input/output/operator fader level change commands present)
# - routable        (bus assign, output flip, input source routing present)
# - powerable       (not a separate trait; reboot/identify only; no discrete power on/off)
```

## Actions
```yaml
# All commands follow the envelope:
#   <CMD>␣<S|O>␣<device_id(4)>␣<unit_id(2)>␣<continue(2)>␣<params>\r
# S = Set (Handshake), O = One-Way (Get). Continue: NC=no division, CS=head, CM=middle, CE=end.
# Command examples below use S 0000 00 NC as the literal envelope from the source.

# === Individual commands ===
- id: sic
  label: Input CH Level Change
  kind: action
  command: "SICL␣S␣0000␣00␣NC␣{channel},{level}\r"
  params:
    - name: channel
      type: integer
      description: Input channel (0-5 = CH 1-6)
    - name: level
      type: integer
      description: Fader level (0-511, see 6.1 Fader Table; -inf,-120dB to +10dB)
- id: gic
  label: Input CH Level Acquisition
  kind: query
  command: "GICL␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
      description: Input channel (0-5)
- id: sicm
  label: Input CH Mute State Change
  kind: action
  command: "SICM␣S␣0000␣00␣NC␣{channel},{mute}\r"
  params:
    - name: channel
      type: integer
      description: Input channel (0-5)
    - name: mute
      type: integer
      description: 0=Disable, 1=Enable
- id: gicm
  label: Input CH Mute State Acquisition
  kind: query
  command: "GICM␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: soc
  label: Output CH Level Change
  kind: action
  command: "SOCL␣S␣0000␣00␣NC␣{channel},{level}\r"
  params:
    - name: channel
      type: integer
      description: 0-1 = CH 1-2
    - name: level
      type: integer
      description: 0-511
- id: goc
  label: Output CH Level Acquisition
  kind: query
  command: "GOCL␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: socm
  label: Output CH Mute State Change
  kind: action
  command: "SOCM␣S␣0000␣00␣NC␣{channel},{mute}\r"
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer
- id: gocm
  label: Output CH Mute State Acquisition
  kind: query
  command: "GOCM␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: sbus
  label: Bus Assign Change
  kind: action
  command: "SBUS␣S␣0000␣00␣NC␣{input_ch},{bus_ch},{assign},{level}\r"
  params:
    - name: input_ch
      type: integer
      description: 0-5
    - name: bus_ch
      type: integer
      description: 1-3 (BUS1, BUS2, BUS ST)
    - name: assign
      type: integer
      description: 0=Off, 1=Smart Mix Pre, 2=Smart Mix Post
    - name: level
      type: integer
      description: 0-411
- id: gbus
  label: Bus Assign Acquisition
  kind: query
  command: "GBUS␣O␣0000␣00␣NC␣{input_ch},{bus_ch}\r"
  params:
    - name: input_ch
      type: integer
    - name: bus_ch
      type: integer
- id: sop
  label: Operator Fader Level Change
  kind: action
  command: "SOPL␣S␣0000␣00␣NC␣{fader_no},{level}\r"
  params:
    - name: fader_no
      type: integer
    - name: level
      type: integer
      description: 0-100
- id: gop
  label: Operator Fader Level Acquisition
  kind: query
  command: "GOPL␣O␣0000␣00␣NC␣{fader_no}\r"
  params:
    - name: fader_no
      type: integer
- id: sopm
  label: Operator Fader Mute State Change
  kind: action
  command: "SOPM␣S␣0000␣00␣NC␣{fader_no},{mute}\r"
  params:
    - name: fader_no
      type: integer
    - name: mute
      type: integer
- id: gopm
  label: Operator Fader Mute State Acquisition
  kind: query
  command: "GOPM␣O␣0000␣00␣NC␣{fader_no}\r"
  params:
    - name: fader_no
      type: integer
- id: ssmm
  label: SmartMix Mode Change
  kind: action
  command: "SSMM␣S␣0000␣00␣NC␣1,{mode}\r"
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=Gate, 2=Gain Share (group fixed to 1)
- id: gsmm
  label: SmartMix Mode Acquisition
  kind: query
  command: "GSMM␣O␣0000␣00␣NC␣1\r"
  params: []
- id: noom
  label: No. of Open Mic Change
  kind: action
  command: "NOOM␣S␣0000␣00␣NC␣1,{nom}\r"
  params:
    - name: nom
      type: integer
      description: 1-10
- id: gnoom
  label: No. of Open Mic Acquisition
  kind: query
  command: "GNOOM␣O␣0000␣00␣NC␣1\r"
  params: []
- id: callp
  label: Preset Call (CALLP)
  kind: action
  command: "CALLP␣S␣0000␣00␣NC␣{preset}\r"
  params:
    - name: preset
      type: integer
- id: regip
  label: Preset Save (REGIP)
  kind: action
  command: "REGIP␣S␣0000␣00␣NC␣{preset}\r"
  params:
    - name: preset
      type: integer
- id: callpp
  label: Partial Preset Call
  kind: action
  command: "CALLPP␣S␣0000␣00␣NC␣{partial_preset}\r"
  params:
    - name: partial_preset
      type: integer
      description: 1-40
- id: sdid
  label: Device ID Change
  kind: action
  command: "SDID␣S␣0000␣00␣NC␣{device_id}\r"
  params:
    - name: device_id
      type: string
      description: 0000-03E7 hex or 0-999 decimal; depends on SFID format
- id: gdid
  label: Device ID Acquisition (GDID)
  kind: query
  command: "GDID␣O␣0000␣00␣NC\r"
  params: []
- id: sfid
  label: Device ID Format Setting
  kind: action
  command: "SFID␣S␣0000␣00␣NC␣{format}\r"
  params:
    - name: format
      type: integer
      description: 0=Hexadecimal, 1=Decimal

# === Input commands ===
- id: s_input_gain_level
  label: Input Gain & Level Setting Change
  kind: action
  command: "s_input_gain_level␣S␣0000␣00␣NC␣{ch},{mic_gain},{line_gain},{level},{max_en},{max_val},{mute},{vm_gain}\r"
  params:
    - name: ch
      type: integer
      description: 0-5 (Input 1-6)
    - name: mic_gain
      type: integer
      description: 0-40 (+20dB to +60dB)
    - name: line_gain
      type: integer
      description: 0-40 (-20dBu to -60dBu)
    - name: level
      type: integer
      description: 0-511
    - name: max_en
      type: integer
      description: Max volume enable 0/1
    - name: max_val
      type: integer
      description: Max volume value 0-511
    - name: mute
      type: integer
      description: 0=Disable, 1=Enable
    - name: vm_gain
      type: integer
      description: Virtual Mic gain 0-40
- id: g_input_gain_level
  label: Input Gain & Level Setting Acquisition
  kind: query
  command: "g_input_gain_level␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: input_gain_level_meter_notice
  label: Input Gain/Level Setting Notice
  kind: notification
  command: "MD␣input_gain_level_notice␣0000␣00␣NC␣{ch},{mic_gain},{line_gain},{level},{mute}\r"
  params:
    - name: ch
      type: integer
    - name: mic_gain
      type: integer
    - name: line_gain
      type: integer
    - name: level
      type: integer
    - name: mute
      type: integer
- id: s_input_channel_settings
  label: Input Channel Setting Change
  kind: action
  command: "s_input_channel_settings␣S␣0000␣00␣NC␣{ch},{source},{phantom},{phase},{lowcut},{aec},{smartmix},{link},{bus1},{bus2},{reserved},{bus_st},\"{name}\",{color},{orient},{tilt},{pattern},{fader_group},{mono},{unit_type},{atlink_id},{channel}\r"
  params:
    - name: ch
      type: integer
      description: 0-5
    - name: source
      type: integer
      description: 0=Mic,1=Line+4dBu,2=Line 0dBV,3=Line -10dBV,4=Line -20dBV,5=USB,6=Virtual Mic,8=A-T LINK,10=A-T LINK MIX port A,11=A-T LINK MIX port B
    - name: phantom
      type: integer
      description: 0=Off
    - name: phase
      type: integer
      description: 0=Normal, 1=Invert
    - name: lowcut
      type: integer
      description: 0=Off
    - name: aec
      type: integer
      description: 0=Off
    - name: smartmix
      type: integer
      description: 0=Off
    - name: link
      type: integer
      description: 0=Unlink, 1=Link
    - name: bus1
      type: integer
      description: 0=Off
    - name: bus2
      type: integer
      description: 0=Off
    - name: reserved
      type: string
      description: Fixed "0"
    - name: bus_st
      type: integer
      description: 0=Off
    - name: name
      type: string
      description: Quoted channel name
    - name: color
      type: integer
      description: 0-7 (Green,Yellow,Brown,Red,Pink,Blue,Gray,DarkGray)
    - name: orient
      type: integer
      description: 0-330 (30-deg steps)
    - name: tilt
      type: integer
      description: 0=0deg, 45=45deg
    - name: pattern
      type: integer
      description: 0=Wide, 1=Normal, 2=Omni
    - name: fader_group
      type: integer
      description: 0=None, 1-8 = Group A-H
    - name: mono
      type: integer
      description: 0=Off (Input ST only)
    - name: unit_type
      type: string
      description: A-T LINK unit type (1-FF) when source=8
    - name: atlink_id
      type: string
      description: A-T LINK device ID (1-255)
    - name: channel
      type: string
      description: A-T LINK channel (1-255)
- id: g_input_channel_settings
  label: Input Channel Setting Acquisition
  kind: query
  command: "g_input_channel_settings␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: g_input_channel_settings2
  label: Input Channel Setting Acquisition 2
  kind: query
  command: "g_input_channel_settings2␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: s_input_eq
  label: Input EQ Setting Change
  kind: action
  command: "s_input_eq␣S␣0000␣00␣NC␣{ch},{eq_on},{b1_enable},{b1_type},{b1_freq},{b1_gain},{b1_q},{b2_enable},{b2_freq},{b2_gain},{b2_q},{b3_enable},{b3_freq},{b3_gain},{b3_q},{b4_enable},{b4_type},{b4_freq},{b4_gain},{b4_q},{eq_mode}\r"
  params:
    - name: ch
      type: integer
    - name: eq_on
      type: integer
      description: 0=Off
    - name: b1_enable
      type: integer
    - name: b1_type
      type: integer
    - name: b1_freq
      type: integer
      description: 0-480 (20Hz-20kHz)
    - name: b1_gain
      type: integer
    - name: b1_q
      type: integer
    - name: b2_enable
      type: integer
    - name: b2_freq
      type: integer
    - name: b2_gain
      type: integer
    - name: b2_q
      type: integer
    - name: b3_enable
      type: integer
    - name: b3_freq
      type: integer
    - name: b3_gain
      type: integer
    - name: b3_q
      type: integer
    - name: b4_enable
      type: integer
    - name: b4_type
      type: integer
    - name: b4_freq
      type: integer
    - name: b4_gain
      type: integer
    - name: b4_q
      type: integer
    - name: eq_mode
      type: integer
      description: 0=EasyMode, 1=Expert Mode
- id: g_input_eq
  label: Input EQ Setting Acquisition
  kind: query
  command: "g_input_eq␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: s_fbs_general
  label: FBS Common Setting Change
  kind: action
  command: "s_fbs_general␣S␣0000␣00␣NC␣{detection},{response}\r"
  params:
    - name: detection
      type: integer
      description: 0=Low,1=Mid,2=High
    - name: response
      type: integer
      description: 0=slow, 1=fast
- id: g_fbs_general
  label: FBS Common Setting Acquisition
  kind: query
  command: "g_fbs_general␣O␣0000␣00␣NC\r"
  params: []
- id: s_fbs_input
  label: FBS Setting Change (Input)
  kind: action
  command: "s_fbs␣S␣0000␣00␣NC␣{channel},{proc_type},{enable},{b1},{b2},{b3},{b4},{b5},{b6},{b7},{b8}\r"
  params:
    - name: channel
      type: integer
      description: 0-5
    - name: proc_type
      type: integer
      description: 0=Reset,1=All Static,2=Copy to EQ (Output only),3=Band Setting
    - name: enable
      type: integer
      description: 0=Off
    - name: b1
      type: integer
      description: 0=Off (Static select)
    - name: b2
      type: integer
    - name: b3
      type: integer
    - name: b4
      type: integer
    - name: b5
      type: integer
    - name: b6
      type: integer
    - name: b7
      type: integer
    - name: b8
      type: integer
- id: s_fbs_output
  label: FBS Setting Change (Output)
  kind: action
  command: "s_fbs␣S␣0000␣00␣NC␣{channel},{proc_type},{enable},{b1},{b2},{b3},{b4},{b5},{b6},{b7},{b8}\r"
  params:
    - name: channel
      type: integer
      description: 12-13 (Output CH 1-2) or 20 (Output ST)
    - name: proc_type
      type: integer
    - name: enable
      type: integer
    - name: b1
      type: integer
    - name: b2
      type: integer
    - name: b3
      type: integer
    - name: b4
      type: integer
    - name: b5
      type: integer
    - name: b6
      type: integer
    - name: b7
      type: integer
    - name: b8
      type: integer
- id: g_fbs
  label: FBS Setting Acquisition
  kind: query
  command: "g_fbs␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: s_input_channel_comp_settings
  label: Input Channel Dynamics Setting Change
  kind: action
  command: "s_input_channel_comp_settings␣S␣0000␣00␣NC␣{ch},{enable},{comp_type},{threshold},{ratio},{attack},{release},{output_gain},{b1_freq},{b1_gain},{b1_q},{b2_freq},{b2_gain},{b2_q},{side_chain},{lowcut}\r"
  params:
    - name: ch
      type: integer
    - name: enable
      type: integer
      description: 0=Off
    - name: comp_type
      type: integer
      description: 0=Comp, 1=DeEsser
    - name: threshold
      type: integer
      description: 0-60 (-60dB to 0dB)
    - name: ratio
      type: integer
      description: 0=1:1.4,1=1:2,2=1:4,3=1:6,4=1:10,5=+inf
    - name: attack
      type: integer
      description: 0,25,50,100,200,400,800,1600,3200,10000 msec
    - name: release
      type: integer
      description: 50,100,200,400,800,1000,2000 msec
    - name: output_gain
      type: integer
      description: 0-20 (-10dB to +10dB)
    - name: b1_freq
      type: integer
    - name: b1_gain
      type: integer
    - name: b1_q
      type: integer
    - name: b2_freq
      type: integer
    - name: b2_gain
      type: integer
    - name: b2_q
      type: integer
    - name: side_chain
      type: integer
      description: 0=Off
    - name: lowcut
      type: integer
      description: 0=Off
- id: g_input_channel_comp_settings
  label: Input Channel Dynamics Setting Acquisition
  kind: query
  command: "g_input_channel_comp_settings␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: s_aec_general
  label: AEC Setting Change
  kind: action
  command: "s_aec_general␣S␣0000␣00␣NC␣{mode},{aec_ref},{reserved},{send_ref},{reserved},{input_bus},{out1},{out2},{out_st},{aec_atten},{nc_atten},{nlp_en},{nlp_sens}\r"
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=AEC, 2=Noise Canceling
    - name: aec_ref
      type: integer
      description: 0-5 (CH 1-6) / 12-13 (Out 1-2) / 22 (Out ST) / 23 (External)
    - name: reserved
      type: string
      description: Not used
    - name: send_ref
      type: integer
      description: 0=Off
    - name: reserved
      type: string
    - name: input_bus
      type: integer
      description: 0=Bus 1, 1=Bus 2, 10=Bus ST
    - name: out1
      type: integer
      description: 0=Off
    - name: out2
      type: integer
    - name: out_st
      type: integer
    - name: aec_atten
      type: integer
      description: 0-20 (AEC attenuation dB)
    - name: nc_atten
      type: integer
      description: 0-20 (NC attenuation dB)
    - name: nlp_en
      type: integer
      description: 0=Off
    - name: nlp_sens
      type: integer
      description: 0=Low,1=Mid,2=High
- id: g_aec_general
  label: AEC Setting Acquisition
  kind: query
  command: "g_aec_general␣O␣0000␣00␣NC\r"
  params: []
- id: s_smart_mix
  label: Smart Mix Setting Change
  kind: action
  command: "s_smart_mix␣S␣0000␣00␣NC␣{ch},{group},{gs_weight},{priority},{can_cut},{off_atten},{threshold}\r"
  params:
    - name: ch
      type: integer
    - name: group
      type: integer
      description: 1 (SmartMix Group 1)
    - name: gs_weight
      type: integer
      description: 0-60 (-15.0 to +15.0)
    - name: priority
      type: integer
      description: 0=Off
    - name: can_cut
      type: integer
      description: 0=Off
    - name: off_atten
      type: integer
      description: 0-60
    - name: threshold
      type: integer
      description: 0-20
- id: g_smart_mix
  label: Smart Mix Setting Acquisition
  kind: query
  command: "g_smart_mix␣O␣0000␣00␣NC␣{ch}\r"
  params:
    - name: ch
      type: integer
- id: s_smart_mix_general
  label: Smart Mix Common Setting Change
  kind: action
  command: "s_smart_mix_general␣S␣0000␣00␣NC␣{mode},{last_mic_on},{hold_time},{noma},{nom},{priority_mode},{gt_en},{gt_level},{group}\r"
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=Gate, 2=Gain Share
    - name: last_mic_on
      type: integer
      description: 0=Off
    - name: hold_time
      type: integer
      description: 100..10000 msec (one of fixed values)
    - name: noma
      type: integer
      description: 0=Off
    - name: nom
      type: integer
      description: 1-10
    - name: priority_mode
      type: integer
      description: 0=Mode 1, 1=Mode 2
    - name: gt_en
      type: integer
      description: 0=Off
    - name: gt_level
      type: integer
      description: 0-80 (-80dB to 0dB)
    - name: group
      type: integer
      description: 1 (fixed)
- id: g_smart_mix_general
  label: Smart Mix Common Setting Acquisition
  kind: query
  command: "g_smart_mix_general␣O␣0000␣00␣NC␣1\r"
  params: []
- id: s_ducker_general
  label: Ducker Setting Change
  kind: action
  command: "s_ducker_general␣S␣0000␣00␣NC␣{enable}\r"
  params:
    - name: enable
      type: integer
      description: 0=Off
- id: g_ducker_general
  label: Ducker Setting Acquisition
  kind: query
  command: "g_ducker_general␣O␣0000␣00␣NC\r"
  params: []
- id: open_channel_notice
  label: Open Channel State Notice
  kind: notification
  command: "MD␣open_channel_notice␣0000␣00␣NC␣{ch},{status}\r"
  params:
    - name: ch
      type: integer
    - name: status
      type: integer
      description: 0=Close, 1=Open
- id: cancut_notice
  label: Can Cut Notice
  kind: notification
  command: "MD␣cancut_notice␣0000␣00␣NC␣{i1},{i2},{i3},{i4},{i5},{i6}\r"
  params:
    - name: i1
      type: integer
      description: Input 1 Off/On
    - name: i2
      type: integer
    - name: i3
      type: integer
    - name: i4
      type: integer
    - name: i5
      type: integer
    - name: i6
      type: integer
- id: fbs_notice_input
  label: FBS Notice (Input)
  kind: notification
  command: "MD␣fbs_notice␣0000␣00␣NC␣{channel},{proc_type},{enable},{b1_static},{b1_freq},{b1_gain},{b1_q},{b2_static},{b2_freq},{b2_gain},{b2_q},{b3_static},{b3_freq},{b3_gain},{b3_q},{b4_static},{b4_freq},{b4_gain},{b4_q},{b5_static},{b5_freq},{b5_gain},{b5_q},{b6_static},{b6_freq},{b6_gain},{b6_q},{b7_static},{b7_freq},{b7_gain},{b7_q},{b8_static},{b8_freq},{b8_gain},{b8_q}\r"
  params:
    - name: channel
      type: integer
      description: 0-5 (Input) or 12-13 (Out 1-2) or 20 (Out ST L) or 21 (Out ST R)
- id: fbs_notice_output
  label: FBS Notice (Output)
  kind: notification
  command: "MD␣fbs_notice␣0000␣00␣NC␣{channel},{proc_type},{enable},{b1_static},{b1_freq},{b1_gain},{b1_q},{b2_static},{b2_freq},{b2_gain},{b2_q},{b3_static},{b3_freq},{b3_gain},{b3_q},{b4_static},{b4_freq},{b4_gain},{b4_q},{b5_static},{b5_freq},{b5_gain},{b5_q},{b6_static},{b6_freq},{b6_gain},{b6_q},{b7_static},{b7_freq},{b7_gain},{b7_q},{b8_static},{b8_freq},{b8_gain},{b8_q}\r"
  params:
    - name: channel
      type: integer
      description: 12-13/20-21 for output variants

# === Output commands ===
- id: s_output_level
  label: Output Level Setting Change
  kind: action
  command: "s_output_level␣S␣0000␣00␣NC␣{channel},{level},{max_en},{max_val},{min_en},{min_val}\r"
  params:
    - name: channel
      type: integer
      description: 0-1 (Output 1-2) or 10 (Output ST)
    - name: level
      type: integer
      description: 0-511
    - name: max_en
      type: integer
    - name: max_val
      type: integer
    - name: min_en
      type: integer
    - name: min_val
      type: integer
- id: g_output_level
  label: Output Level Setting Acquisition
  kind: query
  command: "g_output_level␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: output_level_notice
  label: Output Level Setting Notice
  kind: notification
  command: "MD␣output_level_notice␣0000␣00␣NC␣{channel},{level}\r"
  params:
    - name: channel
      type: integer
    - name: level
      type: integer
- id: s_output_mute
  label: Output Channel Mute Setting Change
  kind: action
  command: "s_output_mute␣S␣0000␣00␣NC␣{channel},{mute}\r"
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer
- id: g_output_mute
  label: Output Channel Mute Setting Acquisition
  kind: query
  command: "g_output_mute␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: output_mute_notice
  label: Output Mute Setting Notice
  kind: notification
  command: "MD␣output_mute_notice␣0000␣00␣NC␣{channel},{mute}\r"
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer
- id: s_output_channel_settings
  label: Output Channel Setting Change
  kind: action
  command: "s_output_channel_settings␣S␣0000␣00␣NC␣{channel},{unity},\"{name}\",{color},{fader_group}\r"
  params:
    - name: channel
      type: integer
      description: 0-1
    - name: unity
      type: integer
      description: 0=+4dBu,1=0dBv,2=-10dBv,3=-33dBv (ST only)
    - name: name
      type: string
      description: Quoted channel name
    - name: color
      type: integer
      description: 0-7
    - name: fader_group
      type: integer
      description: 0=None, 1-8 = Group A-H
- id: g_output_channel_settings
  label: Output Channel Setting Acquisition
  kind: query
  command: "g_output_channel_settings␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: s_output_eq
  label: Output EQ Setting Change (12-band)
  kind: action
  command: "s_output_eq␣S␣0000␣00␣NC␣{channel},{eq_on},{b1_enable},{b1_type},{b1_freq},{b1_gain},{b1_q},{b2_enable},{b2_freq},{b2_gain},{b2_q},{b3_enable},{b3_freq},{b3_gain},{b3_q},{b4_enable},{b4_freq},{b4_gain},{b4_q},{b5_enable},{b5_freq},{b5_gain},{b5_q},{b6_enable},{b6_freq},{b6_gain},{b6_q},{b7_enable},{b7_freq},{b7_gain},{b7_q},{b8_enable},{b8_freq},{b8_gain},{b8_q},{b9_enable},{b9_freq},{b9_gain},{b9_q},{b10_enable},{b10_freq},{b10_gain},{b10_q},{b11_enable},{b11_freq},{b11_gain},{b11_q},{b12_enable},{b12_type},{b12_freq},{b12_gain},{b12_q}\r"
  params:
    - name: channel
      type: integer
      description: 0-1 (or 10 for Output ST)
    - name: eq_on
      type: integer
- id: g_output_eq
  label: Output EQ Setting Acquisition
  kind: query
  command: "g_output_eq␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: s_output_12eq_func
  label: 12-Band EQ Function Request
  kind: action
  command: "s_output_12eq_func␣S␣0000␣00␣NC␣{channel},{proc_type},{preset_no}\r"
  params:
    - name: channel
      type: integer
      description: 0-1
    - name: proc_type
      type: integer
      description: 0=Flat,1=Recall,2=Save,3=Reset
    - name: preset_no
      type: integer
      description: 1-20
- id: s_dynamics_delay
  label: Dynamics & Delay Setting Change
  kind: action
  command: "s_dynamics_delay␣S␣0000␣00␣NC␣{channel},{prepost},{comp_en},{comp_type},{threshold},{ratio},{attack},{release},{output_gain},{b1_freq},{b1_gain},{b1_q},{b2_freq},{b2_gain},{b2_q},{side_chain},{lowcut},{lim_en},{lim_thresh},{delay_en},{delay_time}\r"
  params:
    - name: channel
      type: integer
      description: 0-1
    - name: prepost
      type: integer
      description: 0=Pre, 1=Post
    - name: comp_en
      type: integer
    - name: comp_type
      type: integer
      description: 0=Comp,1=DeEsser
    - name: threshold
      type: integer
    - name: ratio
      type: integer
    - name: attack
      type: integer
    - name: release
      type: integer
    - name: output_gain
      type: integer
    - name: b1_freq
      type: integer
    - name: b1_gain
      type: integer
    - name: b1_q
      type: integer
    - name: b2_freq
      type: integer
    - name: b2_gain
      type: integer
    - name: b2_q
      type: integer
    - name: side_chain
      type: integer
    - name: lowcut
      type: integer
    - name: lim_en
      type: integer
    - name: lim_thresh
      type: integer
    - name: delay_en
      type: integer
    - name: delay_time
      type: integer
      description: 0-1000 msec
- id: g_dynamics_delay
  label: Dynamics & Delay Setting Acquisition
  kind: query
  command: "g_dynamics_delay␣O␣0000␣00␣NC␣{channel}\r"
  params:
    - name: channel
      type: integer
- id: s_usb_out
  label: USB Output Setting Change
  kind: action
  command: "s_usb_out␣S␣0000␣00␣NC␣{out1_bus},{out2_bus},{send_level}\r"
  params:
    - name: out1_bus
      type: integer
      description: 0=Off,1-2=CH 1-2,3=ST(L),4=NC
    - name: out2_bus
      type: integer
      description: 0=Off,1-2=CH 1-2,3=ST(R),4=NC
    - name: send_level
      type: integer
      description: 0-411
- id: g_usb_out
  label: USB Output Setting Acquisition
  kind: query
  command: "g_usb_out␣O␣0000␣00␣NC\r"
  params: []
- id: s_oscillator
  label: Oscillator Control Setting Change
  kind: action
  command: "s_oscillator␣S␣0000␣00␣NC␣{enable},{source},{frequency},{level},{ch1_assign},{ch2_assign},{st_assign}\r"
  params:
    - name: enable
      type: integer
      description: 0=Off
    - name: source
      type: integer
      description: 0=Sine Wave, 1=Pink Noise
    - name: frequency
      type: integer
      description: 0=100Hz, 1=1kHz, 2=10kHz
    - name: level
      type: integer
      description: 0-121 (-inf,-120dB to 0dB)
    - name: ch1_assign
      type: integer
    - name: ch2_assign
      type: integer
    - name: st_assign
      type: integer
- id: g_oscillator
  label: Oscillator Control Setting Acquisition
  kind: query
  command: "g_oscillator␣O␣0000␣00␣NC\r"
  params: []

# === Operator page commands ===
- id: s_operator_general
  label: Operator Page Common Setting Change
  kind: action
  command: "s_operator_general␣S␣0000␣00␣NC␣{button_link}\r"
  params:
    - name: button_link
      type: integer
      description: 0=ArrayMic Off/GPO Off, 1=ArrayMic On/GPO Off, 2=ArrayMic Off/GPO On, 3=Both On
- id: g_operator_general
  label: Operator Page Common Setting Acquisition
  kind: query
  command: "g_operator_general␣O␣0000␣00␣NC\r"
  params: []
- id: s_operator_pagesettings
  label: Operator Page Setting Change
  kind: action
  command: "s_operator_pagesettings␣S␣0000␣00␣NC␣{recall_preset},{num_preset},{fader_resume},{logout_btn},{switch_btn}\r"
  params:
    - name: recall_preset
      type: integer
      description: 0=Off
    - name: num_preset
      type: integer
      description: 1-6
    - name: fader_resume
      type: integer
      description: 0=Off
    - name: logout_btn
      type: integer
      description: 0=Off
    - name: switch_btn
      type: integer
      description: 0-3 (ArrayMic/GPO1/GPO2 combinations)
- id: g_operator_pagesettings
  label: Operator Page Setting Acquisition
  kind: query
  command: "g_operator_pagesettings␣O␣0000␣00␣NC\r"
  params: []
- id: s_operator_channel
  label: Operator Page Channel Setting Change
  kind: action
  command: "s_operator_channel␣S␣0000␣00␣NC␣{fader_ch},\"{name}\",{icon},{level},{max_en},{max_val},{min_en},{min_val}\r"
  params:
    - name: fader_ch
      type: integer
      description: 1-8
    - name: name
      type: string
      description: Quoted fader name
    - name: icon
      type: integer
      description: 0=Mic,1=Aux,2=PC,3=Chat,4=Spk,5=Rec
    - name: level
      type: integer
      description: 0-100
    - name: max_en
      type: integer
    - name: max_val
      type: integer
    - name: min_en
      type: integer
    - name: min_val
      type: integer
- id: g_operator_channel
  label: Operator Page Channel Setting Acquisition
  kind: query
  command: "g_operator_channel␣O␣0000␣00␣NC␣{fader_ch}\r"
  params:
    - name: fader_ch
      type: integer
- id: operator_channel_notice
  label: Operator Page Channel Setting Notification
  kind: notification
  command: "MD␣operator_channel_notice␣0000␣00␣NC␣{fader_ch},{level},{mute},{page}\r"
  params:
    - name: fader_ch
      type: integer
    - name: level
      type: integer
    - name: mute
      type: integer
    - name: page
      type: integer
      description: 1=Page 1
- id: s_operator_assign
  label: Operator Page Assign Channel Setting Change
  kind: action
  command: "s_operator_assign␣S␣0000␣00␣NC␣{fader_ch},{ch_type},{show_mute},{show_fader},{l1},{l2},{l3},{l4},{l5},{l6},{l7},{l8}\r"
  params:
    - name: fader_ch
      type: integer
    - name: ch_type
      type: integer
      description: 0=Input, 1=Output, 2=Group
    - name: show_mute
      type: integer
      description: 0=Off
    - name: show_fader
      type: integer
      description: 0=Off
    - name: l1
      type: integer
      description: 0=Off (Input 1 / Output 1 / Group A)
    - name: l2
      type: integer
    - name: l3
      type: integer
    - name: l4
      type: integer
    - name: l5
      type: integer
    - name: l6
      type: integer
    - name: l7
      type: integer
    - name: l8
      type: integer
- id: g_operator_assign
  label: Operator Page Assign Channel Setting Acquisition
  kind: query
  command: "g_operator_assign␣O␣0000␣00␣NC␣{fader_ch}\r"
  params:
    - name: fader_ch
      type: integer
- id: s_operator_mute
  label: Operator Page Channel Mute
  kind: action
  command: "s_operator_mute␣S␣0000␣00␣NC␣{fader_ch},{mute}\r"
  params:
    - name: fader_ch
      type: integer
    - name: mute
      type: integer
      description: 0=No Mute
- id: s_arraymic_mute
  label: Array Mic Mute Control
  kind: action
  command: "s_arraymic_mute␣S␣0000␣00␣NC␣{mute},{virtual_mic}\r"
  params:
    - name: mute
      type: integer
      description: 0=No mute
    - name: virtual_mic
      type: integer
      description: 0=Virtual Mic 1, 1=Virtual Mic 2
- id: g_arraymic_mute
  label: Array Mic Mute Status Acquisition
  kind: query
  command: "g_arraymic_mute␣O␣0000␣00␣NC␣{virtual_mic}\r"
  params:
    - name: virtual_mic
      type: integer
- id: arraymic_mute_notice
  label: Array Mic Mute Status Notice
  kind: notification
  command: "MD␣arraymic_mute_notice␣0000␣00␣NC␣{mute},{virtual_mic}\r"
  params:
    - name: mute
      type: integer
    - name: virtual_mic
      type: integer
- id: rec_status_notice
  label: Recording Status Notification
  kind: notification
  command: "MD␣rec_status_notice␣0000␣00␣NC␣{recorder_status}\r"
  params:
    - name: recorder_status
      type: integer
      description: 0=Stopped,1=Recording,2=Recording paused,3=Replaying,4=Replaying paused

# === System commands ===
- id: factory_settings
  label: Factory Default Setting
  kind: action
  command: "factory_settings␣S␣0000␣00␣NC␣0\r"
  params: []
- id: g_deviceid
  label: Device ID Acquisition (g_deviceid)
  kind: query
  command: "g_deviceid␣O␣0000␣00␣NC\r"
  params: []
- id: s_permission
  label: Permission Setting Change
  kind: action
  command: "s_permission␣S␣0000␣00␣NC␣\"{device_name}\",{password_require},{password},{reserved}\r"
  params:
    - name: device_name
      type: string
      description: Quoted device name
    - name: password_require
      type: integer
      description: 0=Password not required, 1=Password required
    - name: password
      type: string
      description: Alphanumeric; omitted if Password require=0
    - name: reserved
      type: string
- id: g_permission
  label: Permission Setting Acquisition
  kind: query
  command: "g_permission␣O␣0000␣00␣NC\r"
  params: []
- id: s_network
  label: Network Setting Change
  kind: action
  command: "s_network␣S␣0000␣00␣NC␣{ip_mode},{ip_addr},{subnet},{gateway},{reserved},{upnp},{port},{notification},{audio_notify},{multicast_addr},{multicast_port},{ntp_en},{ntp_addr},{ntp_port},{tz},{dst},{dst_start},{dst_end},{reserved},{multicast_port2}\r"
  params:
    - name: ip_mode
      type: integer
      description: 0=Auto, 1=Static
    - name: ip_addr
      type: string
      description: 000.000.000.000 to 255.255.255.255
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: reserved
      type: string
    - name: upnp
      type: integer
      description: 0=Not detect, 1=Detect
    - name: port
      type: integer
      description: 1-65535
    - name: notification
      type: integer
      description: 0=Not use
    - name: audio_notify
      type: integer
      description: 0=Not use
    - name: multicast_addr
      type: string
    - name: multicast_port
      type: integer
      description: 1-65535
    - name: ntp_en
      type: integer
      description: 0=Not use
    - name: ntp_addr
      type: string
    - name: ntp_port
      type: integer
    - name: tz
      type: integer
      description: -1200 to +1400 (HHMM, 30-min units)
    - name: dst
      type: integer
      description: 0=Not use
    - name: dst_start
      type: string
      description: MMDDHHmm
    - name: dst_end
      type: string
      description: MMDDHHmm
    - name: reserved
      type: string
    - name: multicast_port2
      type: integer
      description: DECT-WLM
- id: g_network
  label: Network Setting Acquisition
  kind: query
  command: "g_network␣O␣0000␣00␣NC\r"
  params: []
- id: g_network2
  label: Network Setting Acquisition 2
  kind: query
  command: "g_network2␣O␣0000␣00␣NC\r"
  params: []
- id: g_firmware_version
  label: Firmware Version Acquisition
  kind: query
  command: "g_firmware_version␣O␣0000␣00␣NC\r"
  params: []
- id: s_header_color
  label: Header Color Setting Change
  kind: action
  command: "s_header_color␣S␣0000␣00␣NC␣{color}\r"
  params:
    - name: color
      type: integer
      description: 0=White,1=Green,2=Yellow,3=Orange,4=Purple,5=Blue,6=Cyan
- id: g_header_color
  label: Header Color Setting Acquisition
  kind: query
  command: "g_header_color␣O␣0000␣00␣NC\r"
  params: []
- id: s_link
  label: A-T LINK Mode Setting Change
  kind: action
  command: "s_link␣S␣0000␣00␣NC␣{mode}\r"
  params:
    - name: mode
      type: integer
      description: 0=Extension, 1=Primary
- id: g_link
  label: A-T LINK Mode Setting Acquisition
  kind: query
  command: "g_link␣O␣0000␣00␣NC\r"
  params: []
- id: g_link_extstatus
  label: A-T LINK Status Acquisition
  kind: query
  command: "g_link_extstatus␣O␣0000␣00␣NC␣{extension}\r"
  params:
    - name: extension
      type: integer
      description: 1-7
- id: s_connected_limit
  label: Connected Device Limit Setting Change
  kind: action
  command: "s_connected_limit␣S␣0000␣00␣NC␣{restrict},{ip1},{ip2},{ip3},{ip4},{ip5}\r"
  params:
    - name: restrict
      type: integer
      description: 0=Not permit, 1=Permit
    - name: ip1
      type: string
    - name: ip2
      type: string
    - name: ip3
      type: string
    - name: ip4
      type: string
    - name: ip5
      type: string
- id: g_connected_limit
  label: Connected Device Limit Setting Acquisition
  kind: query
  command: "g_connected_limit␣O␣0000␣00␣NC\r"
  params: []
- id: s_audio_system
  label: Audio System Setting Change
  kind: action
  command: "s_audio_system␣S␣0000␣00␣NC␣{gain_unit},{delay_unit},{output_flip},{input_eqdyn},{vm_mode},{gpo1_en},{gpo1_on},{gpo1_off},{gpo2_en},{gpo2_on},{gpo2_off}\r"
  params:
    - name: gain_unit
      type: integer
      description: 0=dBu/dBV, 1=dB
    - name: delay_unit
      type: integer
      description: 0=ms,1=M,2=Ft
    - name: output_flip
      type: integer
      description: 0=Off
    - name: input_eqdyn
      type: integer
      description: 0=EQ, 1=Dyn
    - name: vm_mode
      type: integer
      description: 0=Off,1=ES954,4=ES964
    - name: gpo1_en
      type: integer
      description: 0=Disable, 1=Enable
    - name: gpo1_on
      type: integer
      description: 0=Close,1=Open,2=Pulse(short),3=Pulse invert(short),4=Pulse(long),5=Pulse invert(long)
    - name: gpo1_off
      type: integer
    - name: gpo2_en
      type: integer
    - name: gpo2_on
      type: integer
    - name: gpo2_off
      type: integer
- id: g_audio_system
  label: Audio System Setting Acquisition
  kind: query
  command: "g_audio_system␣O␣0000␣00␣NC\r"
  params: []
- id: s_front_panel
  label: Front Panel Setting Change
  kind: action
  command: "s_front_panel␣S␣0000␣00␣NC␣{recall_preset},{led_dimmer}\r"
  params:
    - name: recall_preset
      type: integer
      description: 0=Disable
    - name: led_dimmer
      type: integer
      description: 0=Disable
- id: g_front_panel
  label: Front Panel Setting Acquisition
  kind: query
  command: "g_front_panel␣O␣0000␣00␣NC\r"
  params: []
- id: s_front_panel_limit
  label: Front Panel Function Setting Change
  kind: action
  command: "s_front_panel_limit␣S␣0000␣00␣NC␣{function},{target},{channel},{enable}\r"
  params:
    - name: function
      type: integer
      description: 0=Level
    - name: target
      type: integer
      description: 0=Input Channel, 1=Output Channel
    - name: channel
      type: integer
      description: 0-5 (Input) or 0-1 (Output)
    - name: enable
      type: integer
      description: 0=Disable
- id: g_front_panel_limit
  label: Front Panel Function Setting Acquisition
  kind: query
  command: "g_front_panel_limit␣O␣0000␣00␣NC␣{function},{target},{channel}\r"
  params:
    - name: function
      type: integer
    - name: target
      type: integer
    - name: channel
      type: integer
- id: s_log
  label: Log Setting Change
  kind: action
  command: "s_log␣S␣0000␣00␣NC␣{enabled},{destination}\r"
  params:
    - name: enabled
      type: integer
      description: 0=Disable
    - name: destination
      type: integer
      description: 0=Internal, 2=Syslog
- id: g_log
  label: Log Setting Acquisition
  kind: query
  command: "g_log␣O␣0000␣00␣NC\r"
  params: []
- id: call_preset
  label: Preset Call (call_preset)
  kind: action
  command: "call_preset␣S␣0000␣00␣NC␣{preset}\r"
  params:
    - name: preset
      type: integer
- id: save_preset
  label: Preset Save
  kind: action
  command: "save_preset␣S␣0000␣00␣NC␣{preset}\r"
  params:
    - name: preset
      type: integer
- id: s_name_bank
  label: Preset Bank Name Change
  kind: action
  command: "s_name_bank␣S␣0000␣00␣NC␣{bank},\"{name}\"\r"
  params:
    - name: bank
      type: integer
    - name: name
      type: string
      description: Quoted bank name
- id: g_name_bank
  label: Preset Bank Name Acquisition
  kind: query
  command: "g_name_bank␣O␣0000␣00␣NC\r"
  params: []
- id: s_bootup_preset
  label: Boot Up Preset Setting Change
  kind: action
  command: "s_bootup_preset␣S␣0000␣00␣NC␣{bank}\r"
  params:
    - name: bank
      type: integer
      description: 0=Not select, 1-6=Bank 1-6
- id: g_bootup_preset
  label: Boot Up Preset Setting Acquisition
  kind: query
  command: "g_bootup_preset␣O␣0000␣00␣NC\r"
  params: []
- id: s_preset_general
  label: Preset Common Setting Change
  kind: action
  command: "s_preset_general␣S␣0000␣00␣NC␣{recall_link}\r"
  params:
    - name: recall_link
      type: integer
      description: 0=Off
- id: g_preset_general
  label: Preset Common Setting Acquisition
  kind: query
  command: "g_preset_general␣O␣0000␣00␣NC\r"
  params: []
- id: g_preset_number
  label: Preset Number Acquisition
  kind: query
  command: "g_preset_number␣O␣0000␣00␣NC\r"
  params: []
- id: recall_preset_notice
  label: Preset Call Notification
  kind: notification
  command: "MD␣recall_preset_notice␣0000␣00␣NC␣{bank}\r"
  params:
    - name: bank
      type: integer
- id: call_partial_preset
  label: Partial Preset Call (call_partial_preset)
  kind: action
  command: "call_partial_preset␣S␣0000␣00␣NC␣{partial}\r"
  params:
    - name: partial
      type: integer
      description: 1-40
- id: g_partial_preset_number
  label: Partial Preset Number Acquisition
  kind: query
  command: "g_partial_preset_number␣O␣0000␣00␣NC\r"
  params: []
- id: recall_partial_preset_notice
  label: Partial Preset Call Notification
  kind: notification
  command: "MD␣recall_partial_preset_notice␣0000␣00␣NC␣{partial}\r"
  params:
    - name: partial
      type: integer
- id: file_transfer
  label: File Transfer Request
  kind: action
  command: "file_transfer␣S␣0000␣00␣{CS|CM|CE}␣{kind},{offset_hex},{size_dec},{binary_data}\r"
  params:
    - name: kind
      type: string
      description: p1..p6 preset, i1..i20 input EQ, iall, o1..o20 output EQ, oall, l1..l2 language, log
    - name: offset_hex
      type: string
      description: 00000000 to FFFFFFFF, no 0x prefix
    - name: size_dec
      type: integer
      description: 1-1024
    - name: binary_data
      type: string
      description: Raw bytes
- id: file_transfer_cancel
  label: File Transfer Cancel
  kind: action
  command: "file_transfer_cancel␣S␣0000␣00␣NC␣{kind}\r"
  params:
    - name: kind
      type: string
- id: export
  label: Export Request
  kind: query
  command: "export␣O␣0000␣00␣NC␣{kind}\r"
  params:
    - name: kind
      type: string
- id: import
  label: Import Request
  kind: action
  command: "import␣S␣0000␣00␣NC␣{kind}\r"
  params:
    - name: kind
      type: string
- id: s_level_meter_interval
  label: Level Meter Notification Interval Setting Change
  kind: action
  command: "s_level_meter_interval␣S␣0000␣00␣NC␣{interval}\r"
  params:
    - name: interval
      type: integer
      description: 100 or more msec
- id: g_level_meter_interval
  label: Level Meter Notification Interval Setting Acquisition
  kind: query
  command: "g_level_meter_interval␣O␣0000␣00␣NC\r"
  params: []
- id: g_level_meter
  label: Level Meter Acquisition
  kind: query
  command: "g_level_meter␣O␣0000␣00␣NC␣{monitor_point}\r"
  params:
    - name: monitor_point
      type: integer
      description: 0-23
- id: level_meter_notice
  label: Level Meter Notification
  kind: notification
  command: "MD␣level_meter_notice␣0000␣00␣NC␣{l0},{l1},{l2},{l3},{l4},{l5},{l6},{l7},{l8},{l9},{l10},{l11},{l12},{l13},{l14},{l15},{l16},{l17},{l18},{l19},{l20},{l21},{l22},{l23}\r"
  params:
    - name: l0
      type: integer
      description: Input 1 post-fader (0-61)
    - name: l1
      type: integer
    - name: l2
      type: integer
    - name: l3
      type: integer
    - name: l4
      type: integer
    - name: l5
      type: integer
    - name: l6
      type: integer
      description: Input ST L
    - name: l7
      type: integer
      description: Input ST R
    - name: l8
      type: integer
      description: Output 1
    - name: l9
      type: integer
      description: Output 2
    - name: l10
      type: integer
      description: Output ST L
    - name: l11
      type: integer
      description: Output ST R
    - name: l12
      type: integer
      description: AEC ERL Input 1
    - name: l13
      type: integer
    - name: l14
      type: integer
    - name: l15
      type: integer
    - name: l16
      type: integer
    - name: l17
      type: integer
    - name: l18
      type: integer
      description: Gainshare Input 1
    - name: l19
      type: integer
    - name: l20
      type: integer
    - name: l21
      type: integer
    - name: l22
      type: integer
    - name: l23
      type: integer
- id: identify
  label: Identify Request
  kind: action
  command: "identify␣S␣0000␣00␣NC\r"
  params: []
- id: s_date
  label: Date Setting
  kind: action
  command: "s_date␣S␣0000␣00␣NC␣{timestamp}\r"
  params:
    - name: timestamp
      type: string
      description: YYYYMMDDHHMMSS
- id: reboot
  label: Reboot Request
  kind: action
  command: "reboot␣S␣0000␣00␣NC\r"
  params: []
- id: ip_control_start_notice
  label: IP Control Start Notification
  kind: notification
  command: "MD␣ip_control_start_notice␣0000␣00␣NC␣1\r"
  params: []
- id: zidip
  label: IP Command Compatibility Setting Change
  kind: action
  command: "ZIDIP␣S␣0000␣00␣NC␣{type}\r"
  params:
    - name: type
      type: integer
      description: 0=Use Device ID/Unit ID, 1=Use Model ID/Device ID (old system)
- id: s_gpo_setting
  label: GPO Setting Change
  kind: action
  command: "s_gpo_setting␣S␣0000␣00␣NC␣{gpo1_en},{gpo1_func},\"{gpo1_text}\",{gpo1_on},{gpo1_off},{gpo2_en},{gpo2_func},\"{gpo2_text}\",{gpo2_on},{gpo2_off}\r"
  params:
    - name: gpo1_en
      type: integer
      description: 0=Disable, 1=Enable
    - name: gpo1_func
      type: integer
      description: 0=ArrayMic,1=GPO,2-9=Fader 1-8,10-17=Fader Mute 1-8
    - name: gpo1_text
      type: string
      description: Display name
    - name: gpo1_on
      type: integer
      description: 0=Close,1=Open,2=Pulse(short),3=Pulse invert(short),4=Pulse(long),5=Pulse invert(long)
    - name: gpo1_off
      type: integer
    - name: gpo2_en
      type: integer
    - name: gpo2_func
      type: integer
    - name: gpo2_text
      type: string
    - name: gpo2_on
      type: integer
    - name: gpo2_off
      type: integer
- id: g_gpo_setting
  label: GPO Setting Acquisition
  kind: query
  command: "g_gpo_setting␣O␣0000␣00␣NC\r"
  params: []
- id: s_gpo_action
  label: GPO Control
  kind: action
  command: "s_gpo_action␣S␣0000␣00␣NC␣{kind},{action}\r"
  params:
    - name: kind
      type: integer
      description: 0=GPO Switch 1, 1=GPO Switch 2
    - name: action
      type: integer
      description: 0=Off
- id: g_gpo_action
  label: GPO Status Acquisition
  kind: query
  command: "g_gpo_action␣O␣0000␣00␣NC\r"
  params: []
- id: gpo_action_notice
  label: GPO Control Notification
  kind: notification
  command: "MD␣gpo_action_notice␣0000␣00␣NC␣{kind},{action}\r"
  params:
    - name: kind
      type: integer
    - name: action
      type: integer

# === Connected device (peripheral) commands ===
- id: g_peripheral_status
  label: Connected Device Status Acquisition
  kind: query
  command: "g_peripheral_status␣O␣0000␣00␣NC\r"
  params: []
- id: g_peripheral_info
  label: Connected Device Information Acquisition
  kind: query
  command: "g_peripheral_info␣O␣0000␣00␣NC␣{unit_id},{serial}\r"
  params:
    - name: unit_id
      type: string
      description: 00-FF; can be omitted to query all
    - name: serial
      type: integer
      description: 0-99999999; can be omitted
- id: s_peripheral_deviceid
  label: Connected Device Device ID Setting
  kind: action
  command: "s_peripheral_deviceid␣S␣0000␣00␣NC␣{unit_id},{serial},{device_id},{check}\r"
  params:
    - name: unit_id
      type: string
      description: 00-FF
    - name: serial
      type: integer
      description: 0-99999999
    - name: device_id
      type: integer
      description: 0-999
    - name: check
      type: integer
      description: 0=No duplicate check, 1=Duplicate check
- id: peripheral_status_notice
  label: Connected Device Status Notification
  kind: notification
  command: "MD␣peripheral_status_notice␣0000␣00␣NC␣{atcp_port_a},{atcp_port_b},{atnd_port_a},{atnd_port_b},{esw_port_a},{esw_port_b}\r"
  params:
    - name: atcp_port_a
      type: integer
    - name: atcp_port_b
      type: integer
    - name: atnd_port_a
      type: integer
    - name: atnd_port_b
      type: integer
    - name: esw_port_a
      type: integer
    - name: esw_port_b
      type: integer
- id: peripheral_info_notice
  label: Connected Device Information Notification
  kind: notification
  command: "MD␣peripheral_info_notice␣0000␣00␣NC␣{unit_id},{serial},\"{name}\",{version},{connect_status},{topology},{mac},{device_id}\r"
  params:
    - name: unit_id
      type: string
    - name: serial
      type: integer
    - name: name
      type: string
    - name: version
      type: string
    - name: connect_status
      type: integer
      description: 0=Not connected, 1=Connected
    - name: topology
      type: string
      description: A001 to D999
    - name: mac
      type: string
    - name: device_id
      type: integer
```

## Feedbacks
```yaml
# Responses observed during command handling.
- id: ack
  type: enum
  values: [ack]
  description: "<COMMAND>␣ACK\r - successful Set command response"
- id: nak
  type: enum
  values: [nak]
  description: "<COMMAND>␣NAK␣<error_code>\r - Set command error"
- id: nak_error_codes
  type: enum
  description: Error codes returned in NAK
  values:
    - 01  # Syntax error
    - 02  # Invalid command
    - 03  # Splitting transmission error
    - 04  # Parameter error
    - 05  # Transmission timeout (not used)
    - 06  # Device ID duplicate
    - 90  # Busy
    - 92  # Busy (Save mode)
    - 93  # Busy (Extension)
    - 99  # Other errors
- id: ip_control_start
  type: enum
  values: [started]
  description: Sent once when IP control is enabled after power up
- id: open_channel_status
  type: enum
  values: [close, open]
  description: Per-input channel open/close state from open_channel_notice
- id: cancut_status
  type: enum
  values: [off, on]
  description: Per-input Priority/CanCut state from cancut_notice
- id: recorder_status
  type: enum
  values: [stopped, recording, recording_paused, replaying, replaying_paused]
- id: gpo_switch_state
  type: enum
  values: [off, on]
  description: GPO Switch 1/2 state from g_gpo_action answer
- id: firmware_version
  type: string
  description: XX.XX.XX format from g_firmware_version answer
- id: preset_number
  type: integer
  description: Bank number returned by g_preset_number (e.g. 6)
- id: partial_preset_number
  type: integer
  description: 1-40 returned by g_partial_preset_number
```

## Variables
```yaml
# Observable state values returned by Get Commands.
- id: input_channel_level
  type: integer
  description: Per-input fader level 0-511; -inf,-120dB to +10dB
- id: input_channel_mute
  type: enum
  values: [disable, enable]
- id: output_channel_level
  type: integer
  description: 0-511
- id: output_channel_mute
  type: enum
  values: [disable, enable]
- id: bus_assign
  type: object
  description: per (input, bus) tuple: {assign: off|smart_mix_pre|smart_mix_post, level: 0-411}
- id: operator_fader_level
  type: integer
  description: 0-100 per fader
- id: operator_fader_mute
  type: enum
  values: [no_mute, mute]
- id: smartmix_mode
  type: enum
  values: [off, gate, gain_share]
- id: num_open_mic
  type: integer
  description: 1-10
- id: device_id
  type: string
  description: 0000-03E7 hex or 0-999 decimal
- id: device_id_format
  type: enum
  values: [hex, decimal]
- id: input_gain_mic
  type: integer
  description: 0-40 (+20dB to +60dB)
- id: input_gain_line
  type: integer
  description: 0-40 (-20dBu to -60dBu)
- id: input_gain_virtual_mic
  type: integer
  description: 0-40
- id: input_source
  type: enum
  values: [mic, line_+4dbu, line_0dbv, line_-10dbv, line_-20dbv, usb, virtual_mic, at_link, at_link_mix_a, at_link_mix_b]
- id: phantom_power
  type: enum
  values: [off]
- id: phase
  type: enum
  values: [normal, invert]
- id: lowcut
  type: enum
  values: [off]
- id: aec_mode
  type: enum
  values: [off, aec, noise_canceling]
- id: aec_reference
  type: integer
  description: 0-5 (CH 1-6), 12-13 (Out 1-2), 22 (Out ST), 23 (External)
- id: virtual_mic_mode
  type: enum
  values: [off, es954, es964]
- id: fader_group
  type: enum
  values: [none, group_a, group_b, group_c, group_d, group_e, group_f, group_g, group_h]
- id: gain_unit
  type: enum
  values: [dbu_dbv, db]
- id: delay_unit
  type: enum
  values: [ms, m, ft]
- id: output_flip
  type: enum
  values: [off]
- id: input_eq_dyn_view
  type: enum
  values: [eq, dyn]
- id: header_color
  type: enum
  values: [white, green, yellow, orange, purple, blue, cyan]
- id: at_link_mode
  type: enum
  values: [extension, primary]
- id: network_ip_mode
  type: enum
  values: [auto, static]
- id: network_port
  type: integer
  description: 1-65535; default 17300
- id: network_multicast_address
  type: string
  description: Default 239.000.000.100
- id: network_multicast_port
  type: integer
  description: Default 17000
- id: network_mac
  type: string
- id: permission_require_password
  type: enum
  values: [no, yes]
- id: permission_password
  type: string
  description: Alphanumeric; omitted if password not required
- id: log_enabled
  type: enum
  values: [disable, enable]
- id: log_destination
  type: enum
  values: [internal, syslog]
- id: front_panel_recall_preset
  type: enum
  values: [disable, enable]
- id: front_panel_led_dimmer
  type: enum
  values: [disable, enable]
- id: level_meter
  type: object
  description: 24 levels; post-fader (0-61), AEC ERL (0-60), gainshare (0-15)
- id: datetime
  type: string
  description: YYYYMMDDHHMMSS via s_date
- id: eq_band
  type: object
  description: per band: {enable, type, freq 0-480, gain, q}
- id: compressor
  type: object
  description: comp/de-esser params (threshold 0-60, ratio, attack, release, output_gain)
- id: delay
  type: object
  description: enable + delay_time 0-1000 msec
- id: limiter
  type: object
  description: enable + threshold 0-60
- id: gpo_config
  type: object
  description: per GPO: {enable, function (0=ArrayMic,1=GPO,2-9=Fader,10-17=Fader Mute), display name, on_action, off_action}
- id: usb_output
  type: object
  description: out1_bus, out2_bus, send_level 0-411
- id: oscillator
  type: object
  description: enable, source, frequency, level, per-channel assign
- id: ducker
  type: enum
  values: [off, on]
- id: front_panel_function
  type: object
  description: per fader: {function, target (0=Input,1=Output), channel, enable}
- id: bootup_preset
  type: integer
  description: 0=Not select, 1-6=Bank 1-6
- id: preset_recall_link
  type: enum
  values: [off, on]
- id: call_partial_preset_number
  type: integer
  description: 1-40
- id: arraymic_mute
  type: object
  description: per virtual mic (1-2): {mute}
- id: operator_page_common
  type: object
  description: {button_link: 0-3 (ArrayMic/GPO combinations)}
- id: operator_page
  type: object
  description: {recall_preset, num_preset 1-6, fader_resume, logout_btn, switch_btn}
- id: operator_channel
  type: object
  description: per fader 1-8: {name, icon (0-5), level 0-100, max/min enable+value}
- id: operator_assign
  type: object
  description: per fader: {ch_type 0-2, show_mute, show_fader, l1-l8}
- id: operator_mute
  type: object
  description: per fader: {mute}
- id: connected_device
  type: object
  description: per peripheral: {unit_id, serial 0-99999999, name, version, connect_status 0-1, topology A001-D999, mac, device_id 0-999}
- id: access_restrict
  type: object
  description: {restrict 0-1, ip1, ip2, ip3, ip4, ip5}
- id: identify_response
  type: enum
  values: [ack]
  description: ACK is the only response to identify
- id: factory_settings_response
  type: enum
  values: [ack, nak]
  description: ACK on success; NAK on error
- id: reboot_response
  type: enum
  values: [ack]
```

## Events
```yaml
# Unsolicited notifications sent over UDP multicast 239.000.000.100:17000
- id: ip_control_start_notice_event
  description: Sent when IP control becomes enabled after power up. Envelope: MD␣ip_control_start_notice␣{device_id}␣{unit_id}␣NC␣1\r
- id: open_channel_notice_event
  description: Sent when Smart Mix Active state changes. Envelope: MD␣open_channel_notice␣...␣{ch},{status 0|1}\r
- id: cancut_notice_event
  description: Sent when Smart Mix Gate Priority/CanCut changes. Envelope: MD␣cancut_notice␣...␣{i1..i6}\r
- id: input_gain_level_notice_event
  description: Sent when input gain/level changes. Envelope: MD␣input_gain_level_notice␣...␣{ch},{mic},{line},{level},{mute}\r
- id: output_level_notice_event
  description: Envelope: MD␣output_level_notice␣...␣{ch},{level}\r
- id: output_mute_notice_event
  description: Envelope: MD␣output_mute_notice␣...␣{ch},{mute}\r
- id: fbs_notice_event
  description: Sent when FBS detects howling. Envelope: MD␣fbs_notice␣...␣{channel},{proc},{enable},8×{static,freq,gain,q}\r
- id: operator_channel_notice_event
  description: Sent when operator page fader level changes. Envelope: MD␣operator_channel_notice␣...␣{ch},{level},{mute},{page}\r
- id: arraymic_mute_notice_event
  description: Sent when Array Mic mute state changes. Envelope: MD␣arraymic_mute_notice␣...␣{mute},{virtual_mic}\r
- id: rec_status_notice_event
  description: Sent when recording state changes. Envelope: MD␣rec_status_notice␣...␣{recorder_status 0-4}\r
- id: recall_preset_notice_event
  description: Sent when device calls a preset. Envelope: MD␣recall_preset_notice␣...␣{bank}\r
- id: recall_partial_preset_notice_event
  description: Sent when device calls a partial preset. Envelope: MD␣recall_partial_preset_notice␣...␣{partial 1-40}\r
- id: gpo_action_notice_event
  description: Sent when GPO switch changes. Envelope: MD␣gpo_action_notice␣...␣{kind 0|1},{action}\r
- id: peripheral_status_notice_event
  description: Sent on change in connected peripheral counts. Envelope: MD␣peripheral_status_notice␣...␣{atcp,atnd,esw port A/B counts}\r
- id: peripheral_info_notice_event
  description: Sent on change in peripheral info. Envelope: MD␣peripheral_info_notice␣...␣{unit_id,serial,name,version,status,topology,mac,device_id}\r
- id: level_meter_notice_event
  description: Sent periodically (interval set via s_level_meter_interval, default 100 msec). Envelope: MD␣level_meter_notice␣...␣24 levels
```

## Macros
```yaml
# Sequences the source describes for typical workflows.
- id: connection_establish
  description: Host opens TCP socket to port 17300. Up to 5 simultaneous connections allowed; extras fail.
- id: command_response
  description: Set command flow: host → device ACK/NAK. Get command flow: host → Answer. Asynchronous - host may send next command without waiting.
- id: notification_subscription
  description: Set s_network Notification=1, Audio Level Notification=1 to receive UDP multicast notifications on 239.000.000.100:17000.
- id: gpo_array_mic_link
  description: Set s_operator_general button_link and s_gpo_setting function=0 (ArrayMic) to bind Array Mic mute to a GPO switch.
- id: factory_reset
  description: Send factory_settings␣S␣0000␣00␣NC␣0\r to reset all settings.
- id: file_import_export
  description: import initiates, then file_transfer pushes data with CS/CM/CE continue markers; export reads back via file_transfer-style response.
```

## Safety
```yaml
confirmation_required_for:
  - factory_settings  # erases all settings
interlocks: []
# UNRESOLVED: no safety warnings, fault procedures, or interlocks documented in source
```

## Notes

The source document is the "ATDM-0604a IP Control Protocol Specifications" version 1.2 (2023/09/14), published by Audio-Technica Corporation. The ATDM-0604a is the SmartMixer that hosts the ES954 and ES964 microphone arrays as "Virtual Mic" inputs — the mic arrays themselves do not speak this IP protocol; they are selected via the `s_audio_system` `Virtual Mic Mode` parameter (1=ES954, 4=ES964) and mute-controlled via `s_arraymic_mute`.

Command envelope: every TCP message is a single line of ASCII text terminated by CR (0x0D). Delimiter is a single-byte space (0x20). The frame structure is:

```
<COMMAND>␣<S|O|H>␣<4-char device id>␣<2-char unit/category id>␣<2-char continue: NC|CS|CM|CE>␣<params>\r
```

TCP port 17300 for commands. UDP multicast 239.000.000.100 port 17000 for status notifications. Full-duplex 10/100 Mbps on RJ45 (CAT5e+). Up to 5 simultaneous TCP connections; commands are processed asynchronously, so subsequent commands may be sent before ACK/NAK/Answer returns (NAK 90=BUSY is the busy response).

Old vs new command format: `ZIDIP` (4.6.45) toggles between the new system (Device ID 0000-0999 + Category ID 00-FF) and the old system (Device ID 0000 fixed, Unit ID 00-FF fixed to FF for IDs ≥ 256). Most commands in this spec use the new format.

Authentication: `s_permission` allows enabling a login password (default is "Password not required"). NAK error code 02 returns for unknown commands or commands that cannot be used for the current device.

Fader / level mappings: 0-511 covers -inf to +10dB; 0-411 covers -inf to 0dB; 0-100 is the operator fader scale; 0-40 maps to mic gain +20dB to +60dB. See Appendix tables 6.1-6.5 in the source for exact value-to-dB conversions.

Models controlled via A-T LINK: ATCP-W01 (80), ATCP-W02 (81), ESW-R4180LK (C0), ATND1061LK (C1).

<!-- UNRESOLVED: firmware version compatibility matrix at the end of the source is cut off (table 6.x) — exact version constraints not captured. The level_meter_notice / fbs_notice parameter count and exact field list depend on firmware; the spec enumerates the documented parameter set. GPO control via ES954/ES964 button press is described in the source as a derived behaviour of `s_operator_general` button_link + `s_gpo_setting` function=0, but the exact LED behaviour is not specified. -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ATDM-0604a_IP_Control_Protocol_Specifications_EN_Ver1.2_web_231118.pdf
  - https://docs.audio-technica.com/us/ATDM-0604_IP_Control_Protcol_Specification_EN_Ver1.1.3_web_200821.pdf
retrieved_at: 2026-05-07T07:24:57.105Z
last_checked_at: 2026-06-02T17:21:30.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:30.749Z
matched_actions: 141
action_count: 141
confidence: medium
summary: "All 141 spec actions have literal wire-token matches in the source (Table 3-1 enumerates all 140 command rows; two are double-listed so unique count is ~136; spec covers all variants including GPO/peripheral); transport port 17300 and multicast 239.000.000.100:17000 confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The spec covers the ATDM-0604a SmartMixer host; the ES954/ES964 are microphone array models connected to it (selected via `Virtual Mic Mode` values 1=ES954, 4=ES964 in `s_audio_system`). No standalone protocol for ES954/ES964 was found in the source."
- "no safety warnings, fault procedures, or interlocks documented in source"
- "firmware version compatibility matrix at the end of the source is cut off (table 6.x) — exact version constraints not captured. The level_meter_notice / fbs_notice parameter count and exact field list depend on firmware; the spec enumerates the documented parameter set. GPO control via ES954/ES964 button press is described in the source as a derived behaviour of `s_operator_general` button_link + `s_gpo_setting` function=0, but the exact LED behaviour is not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
