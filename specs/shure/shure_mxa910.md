---
spec_id: admin/shure-mxa910
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXA910 Control Spec"
manufacturer: Shure
model_family: MXA910
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXA910
    - MXA910-S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
retrieved_at: 2026-05-05T02:33:44.507Z
last_checked_at: 2026-05-05T05:41:54.471Z
generated_at: 2026-05-05T05:41:54.471Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T05:41:54.471Z
  matched_actions: 96
  action_count: 96
  confidence: high
  summary: "All 96 spec actions have literal command matches in source; transport parameters confirmed; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Shure MXA910 Control Spec

## Summary
The Shure MXA910 Microflex Advance is a ceiling-array microphone with 8 individually steerable lobes, automixing, DSP (AEC, noise reduction, compression), and Dante networking. Control is via TCP/IP (Ethernet) using ASCII command strings in angle-bracket delimiters (`< GET ... >`, `< SET ... >`, `< REP ... >`, `< SAMPLE ... >`). The device sends unsolicited `REPORT` messages when parameters change, eliminating the need for polling.

<!-- UNRESOLVED: some commands are firmware-version-gated (v2.0, v3.0, v4.0, v4.5) but exact compatibility matrix not fully documented -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # REBOOT command
- levelable    # audio gain, LED brightness
- queryable    # extensive GET/REPORT command set
- muteable     # per-channel and device-level mute
- presetable   # 10 preset slots
```

## Actions
```yaml
- id: get_all
  label: Get All Parameters
  kind: action
  description: Requests REPORT strings for all parameters. Use on first power-on.
  command: "< GET x ALL >"
  params:
    - name: channel
      type: integer
      description: "0=all, 1-8=individual channels, 9=automix output"

- id: get_model
  label: Get Model Number
  kind: query
  command: "< GET MODEL >"
  response: "< REP MODEL {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params: []

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "< GET SERIAL_NUM >"
  response: "< REP SERIAL_NUM {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params: []

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "< GET FW_VER >"
  response: "< REP FW_VER {yyyyyyyyyyyyyyyyyy} >"
  params: []

- id: get_audio_ip_address
  label: Get Audio IP Address
  kind: query
  command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
  response: "< REP IP_ADDR_NET_AUDIO_PRIMARY {yyyyyyyyyyyyyyy} >"
  params: []

- id: get_audio_subnet
  label: Get Audio Subnet Address
  kind: query
  command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
  response: "< REP IP_SUBNET_NET_AUDIO_PRIMARY {yyyyyyyyyyyyyyy} >"
  params: []

- id: get_audio_gateway
  label: Get Audio Gateway Address
  kind: query
  command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
  response: "< REP IP_GATEWAY_NET_AUDIO_PRIMARY {yyyyyyyyyyyyyyy} >"
  params: []

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "< GET x CHAN_NAME >"
  response: "< REP x CHAN_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: channel
      type: integer
      description: "0=all, 1-9=individual"

- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  response: "< REP DEVICE_ID {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params: []

- id: get_audio_gain
  label: Get Audio Gain
  kind: query
  command: "< GET x AUDIO_GAIN_HI_RES >"
  response: "< REP x AUDIO_GAIN_HI_RES yyyy >"
  params:
    - name: channel
      type: integer
      description: "1-9 (0 not valid)"

- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_HI_RES yyyy >"
  params:
    - name: channel
      type: integer
      description: "1-9 (0 not valid)"
    - name: gain
      type: integer
      min: 0
      max: 1400
      unit: "0.1 dB"
      description: "0000 to 1400 in 0.1 dB steps"

- id: increase_audio_gain
  label: Increase Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_HI_RES INC nn >"
  params:
    - name: channel
      type: integer
      description: "1-9"
    - name: increment
      type: integer
      unit: "0.1 dB"
      description: "Amount to increase in 0.1 dB steps"

- id: decrease_audio_gain
  label: Decrease Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_HI_RES DEC nn >"
  params:
    - name: channel
      type: integer
      description: "1-9"
    - name: decrement
      type: integer
      unit: "0.1 dB"
      description: "Amount to decrease in 0.1 dB steps"

- id: get_audio_gain_postgate
  label: Get Post-Gate Audio Gain
  kind: query
  command: "< GET x AUDIO_GAIN_POSTGATE >"
  response: "< REP x AUDIO_GAIN_POSTGATE yyyy >"
  firmware: ">3.0"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_audio_gain_postgate
  label: Set Post-Gate Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_POSTGATE yyyy >"
  firmware: ">3.0"
  params:
    - name: channel
      type: integer
      description: "1-8 (0 not valid)"
    - name: gain
      type: integer
      min: 0
      max: 1400
      unit: "0.1 dB"

- id: increase_audio_gain_postgate
  label: Increase Post-Gate Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_POSTGATE INC nn >"
  firmware: ">3.0"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: increment
      type: integer
      unit: "0.1 dB"

- id: decrease_audio_gain_postgate
  label: Decrease Post-Gate Audio Gain
  kind: action
  command: "< SET x AUDIO_GAIN_POSTGATE DEC nn >"
  firmware: ">3.0"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: decrement
      type: integer
      unit: "0.1 dB"

- id: get_echo_reduction_gain
  label: Get Echo Reduction Reference Gain
  kind: query
  command: "< GET AUDIO_GAIN_ECHO_RED >"
  response: "< REP AUDIO_GAIN_ECHO_RED yyyy >"
  firmware: "v3.0 only"
  params: []

- id: set_echo_reduction_gain
  label: Set Echo Reduction Reference Gain
  kind: action
  command: "< SET AUDIO_GAIN_ECHO_RED yyyy >"
  firmware: "v3.0 only"
  params:
    - name: gain
      type: integer
      min: 0
      max: 1400
      unit: "0.1 dB"
      description: "-109.9 dB to 30.0 dB"

- id: increase_echo_reduction_gain
  label: Increase Echo Reduction Reference Gain
  kind: action
  command: "< SET AUDIO_GAIN_ECHO_RED INC yyyy >"
  firmware: "v3.0 only"
  params:
    - name: increment
      type: integer
      unit: "0.1 dB"

- id: decrease_echo_reduction_gain
  label: Decrease Echo Reduction Reference Gain
  kind: action
  command: "< SET AUDIO_GAIN_ECHO_RED DEC yyyy >"
  firmware: "v3.0 only"
  params:
    - name: decrement
      type: integer
      unit: "0.1 dB"

- id: get_echo_reduction_level
  label: Get Echo Reduction Level
  kind: query
  command: "< GET ECHO_RED >"
  response: "< REP ECHO_RED sts >"
  firmware: "v3.0 only"
  params: []

- id: set_echo_reduction_level
  label: Set Echo Reduction Level
  kind: action
  command: "< SET ECHO_RED sts >"
  firmware: "v3.0 only"
  params:
    - name: level
      type: enum
      values: [OFF, SOFT, MED, HARD]

- id: get_channel_mute
  label: Get Channel Mute
  kind: query
  command: "< GET x AUDIO_MUTE >"
  response: "< REP x AUDIO_MUTE ON|OFF >"
  params:
    - name: channel
      type: integer
      description: "0-9. Mute is pre-meter."

- id: mute_channel
  label: Mute Channel
  kind: action
  command: "< SET x AUDIO_MUTE ON >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: unmute_channel
  label: Unmute Channel
  kind: action
  command: "< SET x AUDIO_MUTE OFF >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: toggle_channel_mute
  label: Toggle Channel Mute
  kind: action
  command: "< SET x AUDIO_MUTE TOGGLE >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: get_device_mute
  label: Get Device Mute
  kind: query
  command: "< GET DEVICE_AUDIO_MUTE >"
  response: "< REP DEVICE_AUDIO_MUTE ON|OFF >"
  params: []

- id: mute_device
  label: Mute Device
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE ON >"
  params: []

- id: unmute_device
  label: Unmute Device
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE OFF >"
  params: []

- id: toggle_device_mute
  label: Toggle Device Mute
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE TOGGLE >"
  params: []

- id: get_clip_status
  label: Get Output Clip Status
  kind: query
  command: "< GET x AUDIO_OUT_CLIP_INDICATOR >"
  response: "< REP x AUDIO_OUT_CLIP_INDICATOR ON|OFF >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: set_flash_on
  label: Flash Lights On
  kind: action
  command: "< SET FLASH ON >"
  description: "Flashes LED indicator. Auto-off after 30 seconds."
  params: []

- id: set_flash_off
  label: Flash Lights Off
  kind: action
  command: "< SET FLASH OFF >"
  params: []

- id: get_flash
  label: Get Flash State
  kind: query
  command: "< GET FLASH >"
  response: "< REP FLASH ON|OFF >"
  params: []

- id: get_meter_rate
  label: Get Metering Rate
  kind: query
  command: "< GET METER_RATE >"
  response: "< REP METER_RATE sssss >"
  params: []

- id: set_meter_rate
  label: Set Metering Rate
  kind: action
  command: "< SET METER_RATE sssss >"
  params:
    - name: rate_ms
      type: integer
      min: 0
      max: 99999
      unit: ms
      description: "0=off, min 100, max 99999. Off by default."

- id: stop_metering
  label: Stop Metering
  kind: action
  command: "< SET METER_RATE 0 >"
  params: []

- id: get_meter_rate_postgate
  label: Get Post-Gate Metering Rate
  kind: query
  command: "< GET METER_RATE_POSTGATE >"
  response: "< REP METER_RATE_POSTGATE sssss >"
  firmware: ">3.0"
  params: []

- id: set_meter_rate_postgate
  label: Set Post-Gate Metering Rate
  kind: action
  command: "< SET METER_RATE_POSTGATE sssss >"
  firmware: ">3.0"
  params:
    - name: rate_ms
      type: integer
      min: 0
      max: 99999
      unit: ms

- id: get_meter_rate_mxr_gain
  label: Get Automixer Gain Metering Rate
  kind: query
  command: "< GET METER_RATE_MXR_GAIN >"
  response: "< REP METER_RATE_MXR_GAIN sssss >"
  firmware: ">3.0"
  params: []

- id: set_meter_rate_mxr_gain
  label: Set Automixer Gain Metering Rate
  kind: action
  command: "< SET METER_RATE_MXR_GAIN sssss >"
  firmware: ">3.0"
  params:
    - name: rate_ms
      type: integer
      min: 0
      max: 99999
      unit: ms

- id: get_meter_rate_precomp
  label: Get Pre-Compressor Metering Rate
  kind: query
  command: "< GET METER_RATE_PRECOMP >"
  response: "< REP METER_RATE_PRECOMP sssss >"
  firmware: ">4.0"
  params: []

- id: set_meter_rate_precomp
  label: Set Pre-Compressor Metering Rate
  kind: action
  command: "< SET METER_RATE_PRECOMP sssss >"
  firmware: ">4.0"
  params:
    - name: rate_ms
      type: integer
      min: 0
      max: 99999
      unit: ms

- id: get_meter_rate_aecref
  label: Get AEC Reference Metering Rate
  kind: query
  command: "< GET METER_RATE_AECREF >"
  response: "< REP METER_RATE_AECREF sssss >"
  firmware: ">4.0"
  params: []

- id: set_meter_rate_aecref
  label: Set AEC Reference Metering Rate
  kind: action
  command: "< SET METER_RATE_AECREF sssss >"
  firmware: ">4.0"
  params:
    - name: rate_ms
      type: integer
      min: 0
      max: 99999
      unit: ms

- id: get_peak_level
  label: Get Audio Peak Level
  kind: query
  command: "< GET x AUDIO_IN_PEAK_LVL >"
  response: "< REP x AUDIO_IN_PEAK_LVL nnn >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: get_rms_level
  label: Get Audio RMS Level
  kind: query
  command: "< GET x AUDIO_IN_RMS_LVL >"
  response: "< REP x AUDIO_IN_RMS_LVL nnn >"
  params:
    - name: channel
      type: integer
      description: "0-9"

- id: get_preset
  label: Get Current Preset
  kind: query
  command: "< GET PRESET >"
  response: "< REP PRESET nn >"
  params: []

- id: set_preset
  label: Load Preset
  kind: action
  command: "< SET PRESET nn >"
  params:
    - name: preset
      type: integer
      min: 1
      max: 10
      description: "Preset number 1-10 (leading zero optional)"

- id: get_preset_name
  label: Get Preset Name
  kind: query
  command: "< GET PRESETn >"
  response: "< REP PRESETn {yyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: preset
      type: integer
      min: 1
      max: 10
      description: "Preset number (appended directly, e.g. PRESET1, PRESET2)"

- id: get_gate_status
  label: Get Gate Out Status
  kind: query
  command: "< GET x AUTOMIX_GATE_OUT_EXT_SIG >"
  response: "< REP x AUTOMIX_GATE_OUT_EXT_SIG ON|OFF >"
  description: "Unsolicited REP sent on change. Useful for camera tracking."
  params:
    - name: channel
      type: integer
      description: "0-8"

- id: get_led_state
  label: Get LED State
  kind: query
  command: "< GET DEV_LED_IN_STATE >"
  response: "< REP DEV_LED_IN_STATE ON|OFF >"
  params: []

- id: set_led_state
  label: Set LED State
  kind: action
  command: "< SET DEV_LED_IN_STATE ON|OFF >"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: get_led_brightness
  label: Get LED Brightness
  kind: query
  command: "< GET LED_BRIGHTNESS >"
  response: "< REP LED_BRIGHTNESS n >"
  params: []

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "< SET LED_BRIGHTNESS n >"
  params:
    - name: brightness
      type: integer
      description: "fw<=v3: 0=disabled, 1=dim, 2=default. fw>v3: 0=disabled, 1=20%, 2=40%, 3=60%, 4=80%, 5=100%"

- id: get_led_mute_color
  label: Get LED Mute Color
  kind: query
  command: "< GET LED_COLOR_MUTED >"
  response: "< REP LED_COLOR_MUTED nnnn >"
  params: []

- id: set_led_mute_color
  label: Set LED Mute Color
  kind: action
  command: "< SET LED_COLOR_MUTED nnnn >"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, PINK, PURPLE, YELLOW, ORANGE, WHITE]
      description: "fw>v3 also supports: GOLD, YELLOWGREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, LIGHTPURPLE, VIOLET, ORCHID"

- id: get_led_unmute_color
  label: Get LED Unmute Color
  kind: query
  command: "< GET LED_COLOR_UNMUTED >"
  response: "< REP LED_COLOR_UNMUTED nnnn >"
  params: []

- id: set_led_unmute_color
  label: Set LED Unmute Color
  kind: action
  command: "< SET LED_COLOR_UNMUTED nnnn >"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, PINK, PURPLE, YELLOW, ORANGE, WHITE]
      description: "fw>v3 also supports: GOLD, YELLOWGREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, LIGHTPURPLE, VIOLET, ORCHID"

- id: get_led_mute_behavior
  label: Get LED Mute Behavior
  kind: query
  command: "< GET LED_STATE_MUTED >"
  response: "< REP LED_STATE_MUTED nnn >"
  params: []

- id: set_led_mute_behavior
  label: Set LED Mute Behavior
  kind: action
  command: "< SET LED_STATE_MUTED nnn >"
  params:
    - name: behavior
      type: enum
      values: [ON, OFF, FLASHING]

- id: get_led_unmute_behavior
  label: Get LED Unmute Behavior
  kind: query
  command: "< GET LED_STATE_UNMUTED >"
  response: "< REP LED_STATE_UNMUTED nnn >"
  params: []

- id: set_led_unmute_behavior
  label: Set LED Unmute Behavior
  kind: action
  command: "< SET LED_STATE_UNMUTED nnn >"
  params:
    - name: behavior
      type: enum
      values: [ON, OFF, FLASHING]

- id: get_beam_x
  label: Get X-Axis Beam Steering
  kind: query
  command: "< GET x BEAM_X >"
  response: "< REP x BEAM_X nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_beam_x
  label: Set X-Axis Beam Steering
  kind: action
  command: "< SET x BEAM_X nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: position_cm
      type: integer
      min: 0
      max: 3048
      unit: cm
      description: "0000-3048 cm. 1524 = centerline."

- id: get_beam_y
  label: Get Y-Axis Beam Steering
  kind: query
  command: "< GET x BEAM_Y >"
  response: "< REP x BEAM_Y nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_beam_y
  label: Set Y-Axis Beam Steering
  kind: action
  command: "< SET x BEAM_Y nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: position_cm
      type: integer
      min: 0
      max: 3048
      unit: cm
      description: "0000-3048 cm. 1524 = centerline."

- id: get_beam_z
  label: Get Beam Height
  kind: query
  command: "< GET x BEAM_Z >"
  response: "< REP x BEAM_Z nnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_beam_z
  label: Set Beam Height
  kind: action
  command: "< SET x BEAM_Z nnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: height_cm
      type: integer
      min: 0
      max: 914
      unit: cm
      description: "000-914 cm. Distance down from MXA910."

- id: get_beam_w
  label: Get Beam Width
  kind: query
  command: "< GET x BEAM_W >"
  response: "< REP x BEAM_W nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_beam_w
  label: Set Beam Width
  kind: action
  command: "< SET x BEAM_W nnnn >"
  params:
    - name: channel
      type: integer
      description: "1-8"
    - name: width
      type: enum
      values: [WIDE, MEDIUM, NARROW]

- id: get_beam_x_autofocus
  label: Get Autofocus X-Axis Position
  kind: query
  command: "< GET x BEAM_X_AF >"
  response: "< REP x BEAM_X_AF position >"
  firmware: ">4.5"
  description: "Position 0-3048 cm. Subtract 1524 offset for -1524 to +1524 cm range."
  params:
    - name: channel
      type: integer
      description: "0=all, 1-8"

- id: get_beam_y_autofocus
  label: Get Autofocus Y-Axis Position
  kind: query
  command: "< GET x BEAM_Y_AF >"
  response: "< REP x BEAM_Y_AF position >"
  firmware: ">4.5"
  description: "Position 0-3048 cm. Subtract 1524 offset for -1524 to +1524 cm range."
  params:
    - name: channel
      type: integer
      description: "0=all, 1-8"

- id: get_beam_z_autofocus
  label: Get Autofocus Beam Height
  kind: query
  command: "< GET x BEAM_Z_AF >"
  response: "< REP x BEAM_Z_AF height >"
  firmware: ">4.5"
  description: "Height 0-914 cm."
  params:
    - name: channel
      type: integer
      description: "0=all, 1-8"

- id: clear_autofocus
  label: Clear Autofocus Positions
  kind: action
  command: "< SET CLEAR_AF >"
  response: "< REP CLEAR_AF status >"
  firmware: ">4.5"
  params: []

- id: reboot
  label: Reboot Device
  kind: action
  command: "< SET REBOOT >"
  description: "Device reboots immediately. No response sent."
  firmware: ">2.0"
  params: []

- id: get_low_shelf_filter
  label: Get Low Shelf Filter
  kind: query
  command: "< GET LOW_SHELF_FILTER >"
  response: "< REP LOW_SHELF_FILTER ON|OFF >"
  firmware: "v2.0 only"
  params: []

- id: set_low_shelf_filter
  label: Set Low Shelf Filter
  kind: action
  command: "< SET LOW_SHELF_FILTER ON|OFF|TOGGLE >"
  firmware: "v2.0 only"
  params:
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]

- id: get_bypass_eq
  label: Get Bypass All EQ
  kind: query
  command: "< GET BYPASS_ALL_EQ >"
  response: "< REP BYPASS_ALL_EQ sts >"
  firmware: ">3.0"
  params: []

- id: set_bypass_eq
  label: Set Bypass All EQ
  kind: action
  command: "< SET BYPASS_ALL_EQ sts >"
  firmware: ">3.0"
  params:
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]

- id: get_eq_contour
  label: Get EQ Contour
  kind: query
  command: "< GET EQ_CONTOUR >"
  response: "< REP EQ_CONTOUR sts >"
  firmware: ">3.0"
  params: []

- id: set_eq_contour
  label: Set EQ Contour
  kind: action
  command: "< SET EQ_CONTOUR sts >"
  firmware: ">3.0"
  params:
    - name: mode
      type: enum
      values: [OFF, HIGH_PASS, LOW_SHELF, MULTI_BAND]
      description: "Sent as 1=OFF, 2=HIGH_PASS, 3=LOW_SHELF, 4=MULTI_BAND"

- id: get_bypass_intellimix
  label: Get Bypass IntelliMix
  kind: query
  command: "< GET BYPASS_IMX >"
  response: "< REP BYPASS_IMX sts >"
  firmware: ">4.0"
  params: []

- id: set_bypass_intellimix
  label: Set Bypass IntelliMix
  kind: action
  command: "< SET BYPASS_IMX sts >"
  firmware: ">4.0"
  description: "Bypasses AEC, noise reduction, compressor, delay, and AGC."
  params:
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]

- id: get_network_device_name
  label: Get Network Audio Device Name
  kind: query
  command: "< GET NA_DEVICE_NAME >"
  response: "< REP NA_DEVICE_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params: []

- id: get_network_channel_name
  label: Get Network Audio Channel Name
  kind: query
  command: "< GET xx NA_CHAN_NAME >"
  response: "< REP xx NA_CHAN_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: channel
      type: integer
      description: "0=all, 1-9"

- id: get_mac_address
  label: Get Control Network MAC Address
  kind: query
  command: "< GET CONTROL_MAC_ADDR >"
  response: "< REP CONTROL_MAC_ADDR yy:yy:yy:yy:yy:yy >"
  params: []

- id: get_device_mute_led_state
  label: Get Device Mute LED State
  kind: query
  command: "< GET DEV_MUTE_STATUS_LED_STATE >"
  response: "< REP DEV_MUTE_STATUS_LED_STATE ON|OFF >"
  description: "ON=MUTED, OFF=UNMUTED"
  params: []

- id: restore_defaults
  label: Restore Default Settings
  kind: action
  command: "< SET DEFAULT_SETTINGS >"
  response: "< REP PRESET xx > (xx=00 on success)"
  firmware: ">2.0"
  params: []

- id: get_active_mics
  label: Get Active Mic Channels
  kind: query
  command: "< GET NUM_ACTIVE_MICS >"
  response: "< REP NUM_ACTIVE_MICS x >"
  params: []

- id: get_peq_filter
  label: Get PEQ Filter Enable
  kind: query
  command: "< GET xx PEQ yy >"
  response: "< REP xx PEQ yy ON|OFF >"
  firmware: ">2.0"
  params:
    - name: block
      type: integer
      min: 0
      max: 4
      description: "PEQ block 01-04, 00=all"
    - name: filter
      type: integer
      min: 0
      max: 4
      description: "PEQ filter 01-04 within block, 00=all"

- id: set_peq_filter
  label: Set PEQ Filter Enable
  kind: action
  command: "< SET xx PEQ yy ON|OFF >"
  firmware: ">2.0"
  params:
    - name: block
      type: integer
      min: 0
      max: 4
      description: "PEQ block 01-04, 00=all"
    - name: filter
      type: integer
      min: 0
      max: 4
      description: "PEQ filter 01-04 within block, 00=all"
    - name: state
      type: enum
      values: [ON, OFF]

- id: get_automix_solo
  label: Get Automix Channel Solo Enable
  kind: query
  command: "< GET x CHAN_AUTOMIX_SOLO_EN >"
  response: "< REP x CHAN_AUTOMIX_SOLO_EN ENABLE|DISABLE >"
  params:
    - name: channel
      type: integer
      description: "1-8"

- id: set_automix_solo
  label: Set Automix Channel Solo Enable
  kind: action
  command: "< SET x CHAN_AUTOMIX_SOLO_EN ENABLE|DISABLE >"
  params:
    - name: channel
      type: integer
      description: "1-8 (0 not valid)"
    - name: state
      type: enum
      values: [ENABLE, DISABLE]

- id: get_encryption
  label: Get Encryption Status
  kind: query
  command: "< GET ENCRYPTION >"
  response: "< REP ENCRYPTION ON|OFF >"
  firmware: ">2.0"
  params: []
```

## Feedbacks
```yaml
- id: report
  type: string
  description: "Generic REP response. Device sends unsolicited REP when any parameter changes. Format: < REP x PARAMETER value >"

- id: sample_meter
  type: string
  description: "Audio level sample. Format: < SAMPLE aaa bbb ccc ddd eee fff ggg hhh iii >. Values 000-060 representing -60 to 0 dBFS."

- id: sample_postgate_meter
  type: string
  description: "Post-gate audio level sample. Format: < SAMPLE_POSTGATE aaa bbb ccc ddd eee fff ggg hhh >. Values 000-060."
  firmware: ">3.0"

- id: sample_mxr_gain_meter
  type: string
  description: "Automixer gain level sample. Format: < SAMPLE_MXR_GAIN aaa bbb ccc ddd eee fff ggg hhh >. Values 000-060."
  firmware: ">3.0"

- id: sample_precomp_meter
  type: string
  description: "Pre-compressor audio level sample. Format: < SAMPLE_PRECOMP aaa >. Values 000-060."
  firmware: ">4.0"

- id: sample_aecref_meter
  type: string
  description: "AEC reference audio level sample. Format: < SAMPLE_AECREF aaa >. Values 000-060."
  firmware: ">4.0"
```

## Variables
```yaml
- id: audio_gain
  type: integer
  min: 0
  max: 1400
  unit: "0.1 dB"
  description: "Per-channel audio gain. Channel 0 invalid for SET."

- id: audio_gain_postgate
  type: integer
  min: 0
  max: 1400
  unit: "0.1 dB"
  description: "Per-channel post-gate audio gain. Channels 1-8."
  firmware: ">3.0"

- id: meter_rate
  type: integer
  min: 0
  max: 99999
  unit: ms
  description: "Metering sample period. 0=off, min=100 ms."

- id: led_brightness
  type: integer
  description: "fw<=v3: 0=disabled, 1=dim, 2=default. fw>v3: 0=disabled, 1-5 (20%-100%)."

- id: beam_x_position
  type: integer
  min: 0
  max: 3048
  unit: cm
  description: "X-axis lobe position. 1524 = centerline. X-axis parallel to Shure logo."

- id: beam_y_position
  type: integer
  min: 0
  max: 3048
  unit: cm
  description: "Y-axis lobe position. 1524 = centerline. Y-axis perpendicular to Shure logo."

- id: beam_z_height
  type: integer
  min: 0
  max: 914
  unit: cm
  description: "Lobe height, distance down from MXA910."

- id: beam_width
  type: enum
  values: [WIDE, MEDIUM, NARROW]

- id: preset
  type: integer
  min: 1
  max: 10
```

## Events
```yaml
- id: parameter_change_report
  description: "Unsolicited REP sent when any parameter changes on device or via GUI. No polling needed."

- id: clip_status_change
  description: "Unsolicited REP for AUDIO_OUT_CLIP_INDICATOR when clip status changes."

- id: gate_status_change
  description: "Unsolicited REP for AUTOMIX_GATE_OUT_EXT_SIG when gate state changes. Useful for camera tracking."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot
  - restore_defaults
interlocks: []
```

## Notes
- All command strings are ASCII, delimited by angle brackets: `< COMMAND >`.
- Channel numbering: 0=all channels, 1-8=individual channels, 9=automix output, 10=echo reduction/AEC reference (firmware dependent).
- Gain values use 0.1 dB resolution (0000-1400 representing the full range).
- Metering levels are 000-060, representing -60 to 0 dBFS.
- Flash auto-off after 30 seconds.
- Device sends unsolicited REPORT on parameter change — polling not required.
- Some commands are firmware-version-gated; source notes v2.0, v3.0, v4.0, and v4.5 thresholds.
- LED color palette expanded in firmware > v3.0 (additional colors: GOLD, YELLOWGREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, LIGHTPURPLE, VIOLET, ORCHID).
- REBOOT command produces no response (device restarts immediately).
- Channel 10 meaning changes between firmware 3.x (Echo Reduction reference) and 4.x (AEC reference).
<!-- UNRESOLVED: exact firmware version where MXA910-S model variant diverges in behavior, if any -->
<!-- UNRESOLVED: connection keepalive/timeout behavior not documented -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: command rate limits or throttling not stated -->

## Provenance

```yaml
source_domains:
  - pubs.shure.com
retrieved_at: 2026-05-05T02:33:44.507Z
last_checked_at: 2026-05-05T05:41:54.471Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:41:54.471Z
matched_actions: 96
action_count: 96
confidence: high
summary: "All 96 spec actions have literal command matches in source; transport parameters confirmed; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
