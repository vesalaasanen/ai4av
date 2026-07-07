---
spec_id: admin/shure-mxa901
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXA901 Control Spec"
manufacturer: Shure
model_family: "Shure MXA901 Conferencing Ceiling Array Microphone"
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - "Shure MXA901 Conferencing Ceiling Array Microphone"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXA901-R
  - https://pubs.shure.com/en-US/docs/commandstrings/MXA901/en-US
  - https://pubs.shure.com/en-US/docs/guide/MXA901/en-US
  - https://pubs.shure.com/en-US/docs/commandstrings
  - https://www.shure.com/en-US/docs/commandstrings
retrieved_at: 2026-06-30T18:08:14.718Z
last_checked_at: 2026-07-07T12:41:18.446Z
generated_at: 2026-07-07T12:41:18.446Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no dedicated MXA901 command-strings page exists on pubs.shure.com (404); this source is the refined MXA-series command-string doc. Power on/off commands are not documented. Serial/RS-232 transport not documented."
  - "array-group setup is procedural (send SET to reporter, which then"
  - "source contains no interlock procedures or power-sequencing warnings."
  - "no power on/off (PW) commands documented for MXA901 (microphone is PoE/powered, no discrete power toggle)."
  - "serial/RS-232 transport not documented; only Ethernet TCP/IP."
  - "firmware baseline for the command set not stated (array-group + status require fw 6.9+; other commands' minimum firmware unspecified)."
  - "source is the refined MXA-series command-string doc; MXA901 lacks a dedicated pubs.shure.com command-strings page."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:41:18.446Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 spec actions verified literally in source; transport (TCP:2202) confirmed; every parameter shape and enum matches source documentation exactly. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Shure MXA901 Control Spec

## Summary
Shure MXA901 is a conferencing ceiling array microphone with Dante network audio and an IntelliMix DSP chain (AEC, automixer, noise filtering). This spec covers its Ethernet TCP/IP command-string control interface for third-party control systems (AMX/Crestron/Extron): mute, LED color/behavior, presets, per-channel and coverage-area gain, beam steering, metering, talker-position reporting, and array-group triangulation.

<!-- UNRESOLVED: no dedicated MXA901 command-strings page exists on pubs.shure.com (404); this source is the refined MXA-series command-string doc. Power on/off commands are not documented. Serial/RS-232 transport not documented. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth/login procedure described in source
# Notes: raw TCP socket. Control system must open connection as "Client".
# For Telnet clients (PuTTY): set Telnet negotiation to disabled or passive;
# active Telnet negotiation is NOT supported. First command after connect may
# return <REP ERR> - resend to recover (per source).
```

## Traits
```yaml
traits:
  - queryable  # inferred: extensive GET query commands documented
  - levelable  # inferred: per-channel / coverage-area gain control documented
```

## Actions
```yaml
# Channel index conventions (from source "Channel Number Assignments"):
#   Auto-coverage ON : 09 (automixer out), 10 (AEC ref in)
#   Auto-coverage OFF: 01-08 (Dante outs / postgate), 09 (automixer out), 10 (AEC ref)
# Index 0 in GET = all applicable channels. Most SETs do not accept 0.

# ---- Device Information ----
- id: get_all
  label: Get All Properties
  kind: query
  command: "< GET ALL >"
  params: []

- id: get_model
  label: Get Model Name
  kind: query
  command: "< GET MODEL >"
  params: []

- id: get_serial_num
  label: Get Serial Number
  kind: query
  command: "< GET SERIAL_NUM >"
  params: []

- id: get_fw_ver
  label: Get Firmware Version
  kind: query
  command: "< GET FW_VER >"
  params: []

- id: get_ip_addr_audio_primary
  label: Get Primary Audio Network IP Address
  kind: query
  command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
  params: []

- id: get_subnet_audio_primary
  label: Get Primary Audio Network Subnet Mask
  kind: query
  command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
  params: []

- id: get_gateway_audio_primary
  label: Get Primary Audio Network Gateway
  kind: query
  command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
  params: []

- id: get_control_mac_addr
  label: Get Control MAC Address
  kind: query
  command: "< GET CONTROL_MAC_ADDR >"
  params: []

- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []

- id: get_na_device_name
  label: Get Dante Device Name
  kind: query
  command: "< GET NA_DEVICE_NAME >"
  params: []

- id: get_chan_name
  label: Get Channel Name
  kind: query
  command: "< GET index CHAN_NAME >"
  params:
    - name: index
      type: integer
      description: "Channel index; auto-cov on: 09; off: 0-09. 0 = all channels."

- id: get_na_chan_name
  label: Get Dante Channel Name
  kind: query
  command: "< GET index NA_CHAN_NAME >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignments. 0 = all channels."

- id: set_flash
  label: Identify Device (Flash LED)
  kind: action
  command: "< SET FLASH flash_state >"
  params:
    - name: flash_state
      type: enum
      values: [ON, OFF]

- id: set_preset
  label: Load Preset
  kind: action
  command: "< SET PRESET ## >"
  params:
    - name: "##"
      type: integer
      description: "Preset number 1-10"

- id: get_preset
  label: Get Active Preset
  kind: query
  command: "< GET PRESET >"
  params: []

- id: get_preset_name
  label: Get Preset Name
  kind: query
  command: "< GET PRESET_NAME nn >"
  params:
    - name: nn
      type: integer
      description: "Preset identifier 1-10"

- id: get_encryption
  label: Get Device Encryption Status
  kind: query
  command: "< GET ENCRYPTION >"
  params: []

- id: set_default_settings
  label: Restore Default Settings
  kind: action
  command: "< SET DEFAULT_SETTINGS >"
  params: []

- id: reboot
  label: Reboot Device
  kind: action
  command: "< SET REBOOT >"
  params: []
  # Note from source: this command sends NO acknowledgement.

- id: set_array_height
  label: Set Array Height
  kind: action
  command: "< SET ARRAY_HEIGHT height >"
  params:
    - name: height
      type: integer
      description: "Height from floor, 122-914 cm (4-30 ft), 1 cm increments"

- id: set_array_height_override
  label: Set Array Height Override
  kind: action
  command: "< SET ARRAY_HEIGHT_OVERRIDE height >"
  params:
    - name: height
      type: integer
      description: "Height from floor, 122-914 cm, 1 cm increments"

# ---- Channel & Coverage Area ----
- id: get_audio_clip_indicator
  label: Get Audio Clip Indicator
  kind: query
  command: "< GET index AUDIO_OUT_CLIP_INDICATOR >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignments. 0 = all channels."

- id: set_audio_gain_hi_res
  label: Set Audio Gain (Digital, Hi-Res)
  kind: action
  command: "< SET index AUDIO_GAIN_HI_RES gain >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignments. 0 not supported for SET."
    - name: gain
      type: integer
      description: "1/10 dB units scaled by 1100; 0-1400 = -110.0 to +30.0 dB"

- id: set_audio_gain_hi_res_inc
  label: Increment Audio Gain (Hi-Res)
  kind: action
  command: "< SET index AUDIO_GAIN_HI_RES inc step >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer
      description: "1/10 dB increment; result must stay in valid SET range"

- id: set_audio_gain_hi_res_dec
  label: Decrement Audio Gain (Hi-Res)
  kind: action
  command: "< SET index AUDIO_GAIN_HI_RES dec step >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer
      description: "1/10 dB decrement; result must stay in valid SET range"

- id: get_audio_gain_hi_res
  label: Get Audio Gain (Hi-Res)
  kind: query
  command: "< GET index AUDIO_GAIN_HI_RES >"
  params:
    - name: index
      type: integer

- id: set_audio_gain_postgate
  label: Set Audio Gain (Postgate)
  kind: action
  command: "< SET index AUDIO_GAIN_POSTGATE gain >"
  params:
    - name: index
      type: integer
    - name: gain
      type: integer
      description: "1/10 dB scaled by 1100; 0-1400 = -109.9 to +30.0 dB"
  # Auto-coverage OFF only.

- id: get_audio_gain_postgate
  label: Get Audio Gain (Postgate)
  kind: query
  command: "< GET index AUDIO_GAIN_POSTGATE >"
  params:
    - name: index
      type: integer

- id: get_audio_in_rms_lvl
  label: Get Audio Level (RMS)
  kind: query
  command: "< GET x AUDIO_IN_RMS_LVL >"
  params:
    - name: x
      type: integer
      description: "Channel index. 0 = all channels."

- id: get_audio_in_peak_lvl
  label: Get Audio Level (Peak)
  kind: query
  command: "< GET index AUDIO_IN_PEAK_LVL >"
  params:
    - name: index
      type: integer

- id: set_device_audio_mute
  label: Set Device Mute
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE cmd >"
  params:
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]

- id: get_device_audio_mute
  label: Get Device Mute
  kind: query
  command: "< GET DEVICE_AUDIO_MUTE >"
  params: []

- id: set_channel_mute
  label: Set Channel Mute
  kind: action
  command: "< SET nn AUDIO_MUTE cmd >"
  params:
    - name: nn
      type: integer
      description: "Channel per Channel Number Assignments"
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]

- id: get_channel_mute
  label: Get Channel Mute
  kind: query
  command: "< GET nn AUDIO_MUTE >"
  params:
    - name: nn
      type: integer

- id: set_channel_mute_postgate
  label: Set Channel Mute (Post Gate)
  kind: action
  command: "< SET nn AUDIO_MUTE_POSTGATE cmd >"
  params:
    - name: nn
      type: integer
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
  # Auto-coverage OFF only.

- id: get_channel_mute_postgate
  label: Get Channel Mute (Post Gate)
  kind: query
  command: "< GET nn AUDIO_MUTE_POSTGATE >"
  params:
    - name: nn
      type: integer

- id: get_num_active_mics
  label: Get Active Mic Channels Count
  kind: query
  command: "< GET NUM_ACTIVE_MICS >"
  params: []
  # Auto-coverage OFF only.

- id: set_speech_gating
  label: Set Speech Gating Threshold
  kind: action
  command: "< SET nn SPEECH_GATING state >"
  params:
    - name: nn
      type: integer
      description: "Automix output channel per Channel Number Assignments"
    - name: state
      type: enum
      values: [Off, Low, Medium, High]

- id: get_speech_gating
  label: Get Speech Gating Threshold
  kind: query
  command: "< GET nn SPEECH_GATING >"
  params:
    - name: nn
      type: integer

- id: set_noise_filter
  label: Set Enhanced Noise Filtering
  kind: action
  command: "< SET nn NOISE_FILTER state >"
  params:
    - name: nn
      type: integer
      description: "Automix output channel per Channel Number Assignments"
    - name: state
      type: enum
      values: [ON, OFF]

- id: get_noise_filter
  label: Get Enhanced Noise Filtering
  kind: query
  command: "< GET nn NOISE_FILTER >"
  params:
    - name: nn
      type: integer

- id: set_chan_automix_solo_en
  label: Solo Channel to Automix
  kind: action
  command: "< SET index CHAN_AUTOMIX_SOLO_EN sts >"
  params:
    - name: index
      type: integer
      description: "Mic input channel. 0 = all channels."
    - name: sts
      type: enum
      values: [ENABLE, DISABLE]
  # Auto-coverage OFF only.

- id: get_chan_automix_solo_en
  label: Get Channel Automix Solo
  kind: query
  command: "< GET index CHAN_AUTOMIX_SOLO_EN >"
  params:
    - name: index
      type: integer

- id: set_beam_w
  label: Set Lobe Width
  kind: action
  command: "< SET index BEAM_W width >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignments. 0 = all."
    - name: width
      type: enum
      values: [NARROW, MEDIUM, WIDE]
  # Auto-coverage OFF only.

- id: get_beam_w
  label: Get Lobe Width
  kind: query
  command: "< GET index BEAM_W >"
  params:
    - name: index
      type: integer

- id: set_auto_coverage
  label: Set Automatic Coverage
  kind: action
  command: "< SET AUTO_COVERAGE sts >"
  params:
    - name: sts
      type: enum
      values: [On, Off]

- id: get_auto_coverage
  label: Get Automatic Coverage
  kind: query
  command: "< GET AUTO_COVERAGE >"
  params: []

- id: set_ca_mute
  label: Set Coverage Area Mute
  kind: action
  command: "< SET index CA_MUTE cmd >"
  params:
    - name: index
      type: integer
      description: "Coverage area per Channel Number Assignments. 0 = all."
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
  # Auto-coverage ON only.

- id: get_ca_mute
  label: Get Coverage Area Mute
  kind: query
  command: "< GET index CA_MUTE >"
  params:
    - name: index
      type: integer

- id: set_ca_gain
  label: Set Coverage Area Gain
  kind: action
  command: "< SET index CA_GAIN gain >"
  params:
    - name: index
      type: integer
      description: "Coverage area. All-areas SET not supported."
    - name: gain
      type: integer
      description: "1/10 dB scaled by 1100; 0-1400 = -110 to +30 dB"
  # Auto-coverage ON only.

- id: set_ca_gain_inc
  label: Increment Coverage Area Gain
  kind: action
  command: "< SET index CA_GAIN inc step >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer

- id: set_ca_gain_dec
  label: Decrement Coverage Area Gain
  kind: action
  command: "< SET index CA_GAIN dec step >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer

- id: get_ca_gain
  label: Get Coverage Area Gain
  kind: query
  command: "< GET index CA_GAIN >"
  params:
    - name: index
      type: integer

# ---- Meter Rates ----
- id: set_meter_rate
  label: Set Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE rate >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid (<REP ERR>)"

- id: get_meter_rate
  label: Get Metering Rate (RMS)
  kind: query
  command: "< GET METER_RATE >"
  params: []

- id: set_ca_meter_rate
  label: Set Coverage Area Metering Rate (RMS)
  kind: action
  command: "< SET CA_METER_RATE rate >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid"
  # Auto-coverage ON only.

- id: get_ca_meter_rate
  label: Get Coverage Area Metering Rate (RMS)
  kind: query
  command: "< GET CA_METER_RATE >"
  params: []

- id: set_meter_rate_postgate
  label: Set Post-Gate Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_POSTGATE rate >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid"
  # Auto-coverage OFF only.

- id: get_meter_rate_postgate
  label: Get Post-Gate Metering Rate (RMS)
  kind: query
  command: "< GET METER_RATE_POSTGATE >"
  params: []

- id: set_meter_rate_mxr_gain
  label: Set Automixer Gain Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_MXR_GAIN rate >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid"
  # Auto-coverage OFF only.

- id: get_meter_rate_mxr_gain
  label: Get Automixer Gain Metering Rate (RMS)
  kind: query
  command: "< GET METER_RATE_MXR_GAIN >"
  params: []

- id: set_meter_rate_precomp
  label: Set Metering Rate Pre-Compressor (RMS)
  kind: action
  command: "< SET METER_RATE_PRECOMP ##### >"
  params:
    - name: "#####"
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid"

- id: get_meter_rate_precomp
  label: Get Metering Rate Pre-Compressor (RMS)
  kind: query
  command: "< GET METER_RATE_PRECOMP >"
  params: []

- id: set_meter_rate_aecref
  label: Set AEC Reference In Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_AECREF rate >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms; 0 = off; 1-99 invalid"

- id: get_meter_rate_aecref
  label: Get AEC Reference In Metering Rate (RMS)
  kind: query
  command: "< GET METER_RATE_AECREF >"
  params: []

# ---- LED Status & Behavior ----
- id: get_dev_mute_status_led_state
  label: Get Mute LED State
  kind: query
  command: "< GET DEV_MUTE_STATUS_LED_STATE >"
  params: []

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "< SET LED_BRIGHTNESS level >"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
      description: "0=Disabled,1=20%,2=40%,3=60%,4=80%,5=100%"

- id: get_led_brightness
  label: Get LED Brightness
  kind: query
  command: "< GET LED_BRIGHTNESS >"
  params: []

- id: set_led_color_unmuted
  label: Set LED Color Unmuted
  kind: action
  command: "< SET LED_COLOR_UNMUTED color >"
  params:
    - name: color
      type: enum
      values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]

- id: get_led_color_unmuted
  label: Get LED Color Unmuted
  kind: query
  command: "< GET LED_COLOR_UNMUTED >"
  params: []

- id: set_led_color_muted
  label: Set LED Color Muted
  kind: action
  command: "< SET LED_COLOR_MUTED color >"
  params:
    - name: color
      type: enum
      values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]

- id: get_led_color_muted
  label: Get LED Color Muted
  kind: query
  command: "< GET LED_COLOR_MUTED >"
  params: []

- id: set_led_state_muted
  label: Set LED State Muted
  kind: action
  command: "< SET LED_STATE_MUTED state >"
  params:
    - name: state
      type: enum
      values: [ON, FLASHING, OFF]

- id: get_led_state_muted
  label: Get LED State Muted
  kind: query
  command: "< GET LED_STATE_MUTED >"
  params: []

- id: set_led_state_unmuted
  label: Set LED State Unmuted
  kind: action
  command: "< SET LED_STATE_UNMUTED state >"
  params:
    - name: state
      type: enum
      values: [ON, FLASHING, OFF]

- id: get_led_state_unmuted
  label: Get LED State Unmuted
  kind: query
  command: "< GET LED_STATE_UNMUTED >"
  params: []

- id: set_dev_led_in_state
  label: Set Device LED-In State
  kind: action
  command: "< SET DEV_LED_IN_STATE sts >"
  params:
    - name: sts
      type: enum
      values: [OFF, ON]
      description: "OFF = Mute, ON = Unmute"

- id: get_dev_led_in_state
  label: Get Device LED-In State
  kind: query
  command: "< GET DEV_LED_IN_STATE >"
  params: []

# ---- DSP ----
- id: set_bypass_all_eq
  label: Bypass All EQ
  kind: action
  command: "< SET BYPASS_ALL_EQ sts >"
  params:
    - name: sts
      type: enum
      values: [ON, OFF, TOGGLE]
  # Auto-coverage OFF only.

- id: get_bypass_all_eq
  label: Get Bypass All EQ
  kind: query
  command: "< GET BYPASS_ALL_EQ >"
  params: []

- id: set_bypass_imx
  label: Bypass IntelliMix
  kind: action
  command: "< SET BYPASS_IMX sts >"
  params:
    - name: sts
      type: enum
      values: [ON, OFF, TOGGLE]
  # Auto-coverage OFF only.

- id: get_bypass_imx
  label: Get Bypass IntelliMix
  kind: query
  command: "< GET BYPASS_IMX >"
  params: []

# ---- Camera System Integration ----
- id: set_talker_position_rate
  label: Set Talker Position Reporting Rate
  kind: action
  command: "< SET TALKER_POSITION_RATE rate >"
  params:
    - name: rate
      type: integer
      description: "0=disable(default); 100-99999 ms; invalid(1-99/>99999) echoes current"

- id: get_talker_position_rate
  label: Get Talker Position Reporting Rate
  kind: query
  command: "< GET TALKER_POSITION_RATE >"
  params: []

- id: set_talker_position_sensitivity
  label: Set Talker Position Sensitivity
  kind: action
  command: "< SET TALKER_POSITION_SENSITIVITY sensitivity >"
  params:
    - name: sensitivity
      type: enum
      values: ["0", "1", "2", "4", "5", "6", "7", "8", "9"]
      description: "Loc:0=Med,1=Low,2=High; VAD:4=Med,5=High,6=Lowest,7=Low; HeightCorr:8=off,9=on"

- id: get_talker_position_sensitivity
  label: Get Talker Position Sensitivity
  kind: query
  command: "< GET TALKER_POSITION_SENSITIVITY >"
  params: []

- id: get_automix_gate_out_ext_sig
  label: Get Automixer Gate Out Status for Lobes
  kind: query
  command: "< GET index AUTOMIX_GATE_OUT_EXT_SIG >"
  params:
    - name: index
      type: integer
      description: "Dante mic input per Channel Number Assignments. 0 = all."

- id: set_autofocus
  label: Set Autofocus
  kind: action
  command: "< SET AUTOFOCUS status >"
  params:
    - name: status
      type: enum
      values: [ON, OFF]

- id: get_autofocus
  label: Get Autofocus
  kind: query
  command: "< GET AUTOFOCUS >"
  params: []

- id: get_automix_gate_out_ca
  label: Get Automixer Gate Out Status for Coverage Areas
  kind: query
  command: "< GET index AUTOMIX_GATE_OUT_CA >"
  params:
    - name: index
      type: integer
      description: "Coverage area per Channel Number Assignments. 0 = all."
  # Auto-coverage ON only.

- id: set_beam_x
  label: Set X-Axis Lobe Steering
  kind: action
  command: "< SET index BEAM_X position >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignments. 0 = all."
    - name: position
      type: integer
      description: "0-3048 cm; actual -1524..+1524 cm after -1524 offset"
  # Auto-coverage OFF only. X-axis parallel to LED bar.

- id: get_beam_x
  label: Get X-Axis Lobe Steering
  kind: query
  command: "< GET index BEAM_X >"
  params:
    - name: index
      type: integer

- id: set_beam_y
  label: Set Y-Axis Lobe Steering
  kind: action
  command: "< SET index BEAM_Y position >"
  params:
    - name: index
      type: integer
    - name: position
      type: integer
      description: "0-3048 cm; actual -1524..+1524 cm after -1524 offset"
  # Auto-coverage OFF only. Y-axis perpendicular to x.

- id: get_beam_y
  label: Get Y-Axis Lobe Steering
  kind: query
  command: "< GET index BEAM_Y >"
  params:
    - name: index
      type: integer

- id: set_beam_z
  label: Set Z-Axis Lobe Steering
  kind: action
  command: "< SET index BEAM_Z height >"
  params:
    - name: index
      type: integer
    - name: height
      type: integer
      description: "0-914 cm distance down from array"
  # Auto-coverage OFF only.

- id: get_beam_z
  label: Get Z-Axis Lobe Steering
  kind: query
  command: "< GET index BEAM_Z >"
  params:
    - name: index
      type: integer

- id: set_array_group
  label: Create / Set Array Group
  kind: action
  command: "< SET ARRAY_GROUP devMAC(n) device_position(n) >"
  params:
    - name: members
      type: string
      description: "Repeated devMAC(n) X Y Z triples, n=1..4 (2-4 arrays). Or 'OFF'. Firmware 6.9+."
  # Reporter device receives; positions relative to common reference point (cm).

- id: get_array_group
  label: Get Array Group
  kind: query
  command: "< GET ARRAY_GROUP >"
  params: []

- id: get_array_group_status
  label: Get Array Group Status
  kind: query
  command: "< GET ARRAY_GROUP_STATUS >"
  params: []
  # Firmware 6.9+. Reporter reports per-member status (OK/CONNECTION_ERROR/...).

- id: set_ca_dynamic
  label: Set Dynamic Coverage Area Position
  kind: action
  command: "< SET index CA_DYNAMIC position >"
  params:
    - name: index
      type: integer
      description: "Coverage area. 0 = all."
    - name: position
      type: string
      description: "Xmin Ymax Xmax Ymin (cm), each shifted +1524. Size 183-1524 cm. Max 8 areas."
  # Auto-coverage ON only.

- id: get_ca_dynamic
  label: Get Dynamic Coverage Area Position
  kind: query
  command: "< GET index CA_DYNAMIC >"
  params:
    - name: index
      type: integer
```

## Feedbacks
```yaml
# Observable states reported via < REP ... > in response to GET or after SET.
- id: model
  type: string
  values: "32-char padded"

- id: serial_num
  type: string
  values: "32-char alphanumeric padded"

- id: fw_ver
  type: string
  values: "18-char, 3 versions 0-65535 each, '*' if invalid"

- id: ip_addr_audio_primary
  type: string
  values: "15-char IP (padded)"

- id: subnet_audio_primary
  type: string
  values: "15-char dotted mask (padded)"

- id: gateway_audio_primary
  type: string
  values: "15-char dotted gateway (padded)"

- id: control_mac_addr
  type: string
  values: "17-char 00:0E:DD:FF:F1:63 format"

- id: device_id
  type: string
  values: "up to 31 chars, padded"

- id: na_device_name
  type: string
  values: "up to 31 chars, padded"

- id: chan_name
  type: string
  values: "31-char channel name, padded"

- id: na_chan_name
  type: string
  values: "31-char Dante channel name, padded"

- id: flash_state
  type: enum
  values: [ON, OFF]

- id: preset
  type: integer
  values: "1-10"

- id: preset_name
  type: string
  values: "25-char name; '{empty}' if unset"

- id: encryption
  type: enum
  values: [ON, OFF]

- id: default_settings_result
  type: integer
  values: "00 = restore successful"

- id: array_height
  type: integer
  values: "122-914 cm"

- id: audio_clip_indicator
  type: enum
  values: [ON, OFF]

- id: audio_gain_hi_res
  type: integer
  values: "0-1400 (= -110.0..+30.0 dB)"

- id: audio_gain_postgate
  type: integer
  values: "0-1400 (= -109.9..+30.0 dB)"

- id: audio_in_rms_lvl
  type: integer
  values: "00-60"

- id: audio_in_peak_lvl
  type: integer
  values: "000-060"

- id: device_audio_mute
  type: enum
  values: [ON, OFF]

- id: channel_mute
  type: enum
  values: [ON, OFF]

- id: channel_mute_postgate
  type: enum
  values: [ON, OFF]

- id: num_active_mics
  type: integer

- id: speech_gating
  type: enum
  values: [Off, Low, Medium, High]

- id: noise_filter
  type: enum
  values: [ON, OFF]

- id: chan_automix_solo_en
  type: enum
  values: [ENABLE, DISABLE]

- id: beam_w
  type: enum
  values: [NARROW, MEDIUM, WIDE]

- id: auto_coverage
  type: enum
  values: [On, Off]

- id: ca_mute
  type: enum
  values: [On, Off]

- id: ca_gain
  type: integer
  values: "0-1400 (= -110..+30 dB)"

- id: meter_rate
  type: integer
  values: "100-99999 ms, 0=off"

- id: ca_meter_rate
  type: integer
  values: "100-99999 ms, 0=off"

- id: meter_rate_postgate
  type: integer
  values: "100-99999 ms, 0=off"

- id: meter_rate_mxr_gain
  type: integer
  values: "100-99999 ms, 0=off"

- id: meter_rate_precomp
  type: integer
  values: "100-99999 ms, 0=off"

- id: meter_rate_aecref
  type: integer
  values: "100-99999 ms, 0=off"

- id: dev_mute_status_led_state
  type: enum
  values: [ON, OFF]
  description: "ON=MUTED, OFF=UNMUTED"

- id: led_brightness
  type: enum
  values: ["0", "1", "2", "3", "4", "5"]

- id: led_color_unmuted
  type: enum
  values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]

- id: led_color_muted
  type: enum
  values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]

- id: led_state_muted
  type: enum
  values: [ON, FLASHING, OFF]

- id: led_state_unmuted
  type: enum
  values: [ON, FLASHING, OFF]

- id: dev_led_in_state
  type: enum
  values: [OFF, ON]

- id: bypass_all_eq
  type: enum
  values: [ON, OFF]

- id: bypass_imx
  type: enum
  values: [ON, OFF]

- id: talker_position_rate
  type: integer
  values: "5-digit in REP (00100=100ms); 0=off"

- id: talker_position_sensitivity
  type: integer

- id: automix_gate_out_ext_sig
  type: enum
  values: [ON, OFF]

- id: autofocus
  type: enum
  values: [ON, OFF]

- id: automix_gate_out_ca
  type: enum
  values: [On, Off]

- id: beam_x
  type: integer

- id: beam_y
  type: integer

- id: beam_z
  type: integer

- id: array_group
  type: string
  description: "devMAC(n) X Y Z repeated, or OFF"

- id: array_group_status
  type: string
  description: "devMAC(n) STATUS(n); STATUS in OK/CONNECTION_ERROR/PROTOCOL_ERROR/INCOMPATIBLE/TOO_FAR/OFF"

- id: ca_dynamic
  type: string
  description: "Xmin Ymax Xmax Ymin (4-digit cm in REP)"

- id: error
  type: enum
  values: [ERR]
  description: "< REP ERR > on invalid/unavailable command"
```

## Variables
```yaml
# Continuous settable params (also exposed as actions; listed here as addressable state).
- id: audio_gain_hi_res
  type: integer
  range: "0-1400 (-110.0..+30.0 dB, 0.1 dB units)"
  unit: "dB (1/10)"

- id: audio_gain_postgate
  type: integer
  range: "0-1400 (-109.9..+30.0 dB, 0.1 dB units)"
  unit: "dB (1/10)"

- id: ca_gain
  type: integer
  range: "0-1400 (-110..+30 dB, 0.1 dB units)"
  unit: "dB (1/10)"

- id: array_height
  type: integer
  range: "122-914"
  unit: "cm"

- id: meter_rate
  type: integer
  range: "0,100-99999"
  unit: "ms"

- id: talker_position_rate
  type: integer
  range: "0,100-99999"
  unit: "ms"

- id: beam_x_position
  type: integer
  range: "0-3048 (offset 1524)"
  unit: "cm"

- id: beam_y_position
  type: integer
  range: "0-3048 (offset 1524)"
  unit: "cm"

- id: beam_z_height
  type: integer
  range: "0-914"
  unit: "cm"
```

## Events
```yaml
# Unsolicited notifications emitted by the device (metering samples, talker positions,
# and reporter-side array-group status updates). Only sent while the corresponding
# meter/talker rate is non-zero.
- id: meter_sample
  command: "< SAMPLE aaa >"
  description: "Auto-cov ON: single automixer-out level. Auto-cov OFF: 9 space-separated levels (000-060, -60..0 dBFS)."

- id: ca_meter_sample
  command: "< SAMPLE_CA aaa bbb ccc ddd eee fff ggg hhh >"
  description: "Per coverage-area RMS levels (000-060). Auto-cov ON only."

- id: meter_sample_postgate
  command: "< SAMPLE aaa bbb ccc ddd eee fff ggg hhh iii >"
  description: "Per mic-input post-gate levels. Auto-cov OFF only."

- id: meter_sample_mxr_gain
  command: "< SAMPLE aaa bbb ccc ddd eee fff ggg hhh iii >"
  description: "Per mic-input automixer gain levels. Auto-cov OFF only."

- id: meter_sample_precomp
  command: "< SAMPLE_PRECOMP aaa >"
  description: "Pre-compressor RMS level(s)."

- id: meter_sample_aecref
  command: "< SAMPLE_AECREF aaa >"
  description: "AEC reference in RMS level."

- id: talker_positions
  command: "< SAMPLE TALKER_POSITIONS POSITION[1..n] >"
  description: "1..n talker sets, each {LobeID} {CoverageAreaID} {X Y Z} {reserved}. MXA901 X/Y range -427..+427 cm; Z 0-914 cm. Reported only when rate>0 and talker inside a coverage area."

- id: array_group_status_update
  command: "< REP ARRAY_GROUP_STATUS devMAC(n) STATUS(n) >"
  description: "Unsolicited status update from reporter device when a member changes state (rejoin/error/recovery). Firmware 6.9+."
```

## Macros
```yaml
# No explicit multi-step sequences documented as named macros.
# UNRESOLVED: array-group setup is procedural (send SET to reporter, which then
# self-organizes) but not packaged as a macro by the source.
```

## Safety
```yaml
confirmation_required_for:
  - set_default_settings  # restores factory defaults; destructive to configuration
  - reboot                 # drops connection; no acknowledgement sent
interlocks: []
# UNRESOLVED: source contains no interlock procedures or power-sequencing warnings.
```

## Notes
- **Transport quirk:** raw TCP socket on port 2202, opened by the control system as Client. Active Telnet negotiation breaks communication; Telnet clients must use disabled/passive negotiation. With PuTTY, the first command may return `< REP ERR >` — resend to recover.
- **Auto-coverage governs command availability.** Many commands are gated: `AUDIO_GAIN_POSTGATE`, `AUDIO_MUTE_POSTGATE`, `NUM_ACTIVE_MICS`, `CHAN_AUTOMIX_SOLO_EN`, `BEAM_W`, `BEAM_X/Y/Z`, `BYPASS_ALL_EQ`, `BYPASS_IMX`, and the post-gate/mixer-gain meter rates work only with auto-coverage OFF. `CA_MUTE`, `CA_GAIN`, `CA_METER_RATE`, `AUTOMIX_GATE_OUT_CA`, `CA_DYNAMIC` work only with auto-coverage ON.
- **Gain encoding:** all gain params are in 1/10 dB units scaled by 1100 (value `v` = `(dB + 110) * 10`); range 0–1400 spans −110.0 to +30.0 dB.
- **Coordinate offsets:** beam X/Y positions and dynamic coverage-area corners are offset by +1524 cm (50 ft) so values are always non-negative 0–3048. Interpret by subtracting 1524.
- **Array group (firmware 6.9+):** 2–4 same-orientation arrays; one reporter, rest followers. Members must be within 12 ft (366 cm) of each other or `TOO_FAR` is reported. Talker positions then reported relative to a common reference point.
- **`REBOOT` sends no acknowledgement** — control system must not wait for a response.

<!-- UNRESOLVED: no power on/off (PW) commands documented for MXA901 (microphone is PoE/powered, no discrete power toggle). -->
<!-- UNRESOLVED: serial/RS-232 transport not documented; only Ethernet TCP/IP. -->
<!-- UNRESOLVED: firmware baseline for the command set not stated (array-group + status require fw 6.9+; other commands' minimum firmware unspecified). -->
<!-- UNRESOLVED: source is the refined MXA-series command-string doc; MXA901 lacks a dedicated pubs.shure.com command-strings page. -->
````

## Provenance

```yaml
source_domains:
  - shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXA901-R
  - https://pubs.shure.com/en-US/docs/commandstrings/MXA901/en-US
  - https://pubs.shure.com/en-US/docs/guide/MXA901/en-US
  - https://pubs.shure.com/en-US/docs/commandstrings
  - https://www.shure.com/en-US/docs/commandstrings
retrieved_at: 2026-06-30T18:08:14.718Z
last_checked_at: 2026-07-07T12:41:18.446Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:41:18.446Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 spec actions verified literally in source; transport (TCP:2202) confirmed; every parameter shape and enum matches source documentation exactly. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no dedicated MXA901 command-strings page exists on pubs.shure.com (404); this source is the refined MXA-series command-string doc. Power on/off commands are not documented. Serial/RS-232 transport not documented."
- "array-group setup is procedural (send SET to reporter, which then"
- "source contains no interlock procedures or power-sequencing warnings."
- "no power on/off (PW) commands documented for MXA901 (microphone is PoE/powered, no discrete power toggle)."
- "serial/RS-232 transport not documented; only Ethernet TCP/IP."
- "firmware baseline for the command set not stated (array-group + status require fw 6.9+; other commands' minimum firmware unspecified)."
- "source is the refined MXA-series command-string doc; MXA901 lacks a dedicated pubs.shure.com command-strings page."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
