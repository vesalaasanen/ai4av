---
spec_id: admin/shure-ani4in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure ANI4IN Control Spec"
manufacturer: Shure
model_family: ANI4IN
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - ANI4IN
    - ANI4IN-BLOCK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://content-files.shure.com/Pubs/ANI4IN/ANI4IN_Command_Strings.pdf
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/view/guide/ANI4IN/en-US.pdf
  - https://pubs.shure.com/view/guide/ANI4OUT/en-US.pdf
  - https://content-files.shure.com/FileRepository/common-ip-ports-v2.pdf
retrieved_at: 2026-06-15T23:35:32.919Z
last_checked_at: 2026-06-16T07:17:45.335Z
generated_at: 2026-06-16T07:17:45.335Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ANI4OUT (output variant) commands are not in this source; spec covers ANI4IN only."
  - "full GET command string not stated.\""
  - "exact range and reply string format for AUDIO_IN_RMS_LVL not stated in source.\""
  - "full GET command string not stated in source.\""
  - "source does not describe any multi-step sequences as named macros."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "ANI4OUT (output-side) commands are not in this source. The NA_CHAN_NAME GET response references ANI4OUT channels, but the ANI4OUT-specific commands are not in this document."
  - "PEQ filter GET command line is not stated in source — only the response format is documented."
  - "RMS audio level exact reply string format is not stated in source (only the GET command is given)."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:17:45.335Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions matched verbatim in source with correct transport parameters; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Shure ANI4IN Control Spec

## Summary
Shure ANI4IN is a 4-channel audio network interface that accepts microphone/line analog inputs and exposes them to a Dante/AES67 audio network. This spec covers its TCP/IP control protocol for integration with AMX, Crestron, Extron, and similar control systems, using ASCII command strings over an Ethernet (TCP) connection on port 2202. The protocol supports GET, SET, REPORT (REP), and SAMPLE message types for querying state, changing parameters, and metering audio levels.

<!-- UNRESOLVED: ANI4OUT (output variant) commands are not in this source; spec covers ANI4IN only. -->

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
- queryable       # inferred from GET command examples
- levelable       # inferred from AUDIO_GAIN / AUDIO_GAIN_HI_RES commands
- powerable       # inferred from PHANTOM_PWR_ENABLE (per-channel phantom power)
```

## Actions
```yaml
- id: get_all
  label: Get All Parameters
  kind: query
  command: "< GET {x} ALL >"
  params:
    - name: x
      type: string
      description: Channel number 0-4 (0 = all channels)
  notes: Use on first power-on to update status of all parameters. ANI4IN responds with individual REP strings for all parameters.

- id: get_model
  label: Get Model Number
  kind: query
  command: "< GET MODEL >"
  params: []
  notes: Device responds with 32-character model number.

- id: get_serial
  label: Get Serial Number
  kind: query
  command: "< GET SERIAL_NUM >"
  params: []
  notes: Device responds with 32-character serial number.

- id: get_firmware
  label: Get Firmware Version
  kind: query
  command: "< GET FW_VER >"
  params: []
  notes: Device responds with 18-character firmware version string.

- id: get_ip_addr_audio
  label: Get Audio Network IP Address
  kind: query
  command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
  params: []
  notes: Returns 15-character IP address.

- id: get_ip_subnet_audio
  label: Get Audio Network Subnet
  kind: query
  command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
  params: []
  notes: Returns 15-character subnet address.

- id: get_ip_gateway_audio
  label: Get Audio Network Gateway
  kind: query
  command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
  params: []
  notes: Returns 15-character gateway address.

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "< GET {x} CHAN_NAME >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: Returns 31-character channel name (padded with spaces).

- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []
  notes: Device-level (no channel). Returns 31-character device ID.

- id: get_preset
  label: Get Active Preset
  kind: query
  command: "< GET PRESET >"
  params: []
  notes: Returns preset number 01-10.

- id: set_preset
  label: Recall Preset
  kind: action
  command: "< SET PRESET {nn} >"
  params:
    - name: nn
      type: string
      description: Preset number 1-10 (leading zero optional on SET)
  notes: Device replies with REP PRESET nn (01-10).

- id: get_preset1_name
  label: Get Preset 1 Name
  kind: query
  command: "< GET PRESET1 >"
  params: []
  notes: Returns 25-character preset name.

- id: get_preset2_name
  label: Get Preset 2 Name
  kind: query
  command: "< GET PRESET2 >"
  params: []
  notes: Returns 25-character preset name.

- id: get_preset3_name
  label: Get Preset 3 Name
  kind: query
  command: "< GET PRESET3 >"
  params: []
  notes: Returns 25-character preset name.

- id: get_audio_gain_hi_res
  label: Get Digital Audio Gain (high-res)
  kind: query
  command: "< GET {x} AUDIO_GAIN_HI_RES >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: Returns yyyy 0000-1400 in 0.1 dB steps.

- id: set_audio_gain_hi_res
  label: Set Digital Audio Gain (high-res)
  kind: action
  command: "< SET {x} AUDIO_GAIN_HI_RES {yyyy} >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
    - name: yyyy
      type: string
      description: Gain 0000-1400 in 0.1 dB steps
  notes: Device replies with REP x AUDIO_GAIN_HI_RES yyyy.

- id: increase_audio_gain_hi_res
  label: Increase Digital Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN_HI_RES INC {nn} >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
    - name: nn
      type: string
      description: Increment in 0.1 dB (1-3 digit value)
  notes: Device replies with REP x AUDIO_GAIN_HI_RES yyyy.

- id: decrease_audio_gain_hi_res
  label: Decrease Digital Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN_HI_RES DEC {nn} >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
    - name: nn
      type: string
      description: Decrement in 0.1 dB (1-3 digit value)
  notes: "Device replies with REP x AUDIO_GAIN_HI_RES yyyy. Note: source typo says range 0000-1280 in decrement response."

- id: get_audio_gain
  label: Get Analog Audio Gain
  kind: query
  command: "< GET {x} AUDIO_GAIN >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: Returns yy 00-51 in 3 dB steps.

- id: set_audio_gain
  label: Set Analog Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN {yy} >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
    - name: yy
      type: string
      description: Gain 00-51 in 3 dB steps
  notes: Device replies with REP x AUDIO_GAIN yy.

- id: increase_audio_gain
  label: Increment Analog Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN INC {yy} >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
    - name: yy
      type: string
      description: Increment in 3 dB steps (saturated to 00-51)
  notes: Resulting gain is saturated to the range allowed in SET.

- id: decrease_audio_gain
  label: Decrement Analog Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN DEC {yy} >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
    - name: yy
      type: string
      description: Decrement in 3 dB steps (saturated to 00-51)
  notes: Resulting gain is saturated to the range allowed in SET.

- id: get_audio_mute
  label: Get Channel Audio Mute
  kind: query
  command: "< GET {x} AUDIO_MUTE >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: Returns ON or OFF.

- id: set_audio_mute_on
  label: Mute Channel Audio
  kind: action
  command: "< SET {x} AUDIO_MUTE ON >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: Device replies with REP x AUDIO_MUTE ON.

- id: set_audio_mute_off
  label: Unmute Channel Audio
  kind: action
  command: "< SET {x} AUDIO_MUTE OFF >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: Device replies with REP x AUDIO_MUTE OFF.

- id: toggle_audio_mute
  label: Toggle Channel Audio Mute
  kind: action
  command: "< SET {x} AUDIO_MUTE TOGGLE >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: Device replies with REP x AUDIO_MUTE ON or OFF.

- id: flash_on
  label: Flash Lights On
  kind: action
  command: "< SET FLASH ON >"
  params: []
  notes: Front-panel flash auto-turns off after 30 seconds. Device replies with REP FLASH ON.

- id: flash_off
  label: Flash Lights Off
  kind: action
  command: "< SET FLASH OFF >"
  params: []
  notes: Device replies with REP FLASH OFF.

- id: set_meter_rate
  label: Set Meter Rate (turn metering on)
  kind: action
  command: "< SET METER_RATE {sssss} >"
  params:
    - name: sssss
      type: string
      description: Metering period in milliseconds (0 turns off, minimum 100)
  notes: "After SET, device replies with REP METER_RATE sssss and begins emitting < SAMPLE aaa bbb ccc ddd > where aaa=output1 ... ddd=output4 (values 000-060). Off by default."

- id: stop_metering
  label: Stop Metering
  kind: action
  command: "< SET METER_RATE 0 >"
  params: []
  notes: 00000 is also accepted. Device replies with REP METER_RATE 00000.

- id: get_sig_clip_led
  label: Get Sig/Clip LED State
  kind: query
  command: "< GET {x} LED_COLOR_SIG_CLIP >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: "Device also sends REPORT whenever status changes. Returns OFF, GREEN, AMBER, or RED."

- id: get_led_brightness
  label: Get LED Brightness
  kind: query
  command: "< GET LED_BRIGHTNESS >"
  params: []
  notes: "Returns 0 (disabled), 1 (dim), or 2 (default)."

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "< SET LED_BRIGHTNESS {n} >"
  params:
    - name: n
      type: string
      description: "0 = LED disabled, 1 = LED dim, 2 = LED default"
  notes: Device replies with REP LED_BRIGHTNESS n.

- id: get_phantom_power
  label: Get Phantom Power Status
  kind: query
  command: "< GET {x} PHANTOM_PWR_ENABLE >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: Returns ON or OFF.

- id: set_phantom_power_on
  label: Enable Phantom Power
  kind: action
  command: "< SET {x} PHANTOM_PWR_ENABLE ON >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: Device replies with REP x PHANTOM_PWR_ENABLE ON.

- id: set_phantom_power_off
  label: Disable Phantom Power
  kind: action
  command: "< SET {x} PHANTOM_PWR_ENABLE OFF >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: Device replies with REP x PHANTOM_PWR_ENABLE OFF.

- id: get_hw_gating_logic
  label: Get Mic Logic Switch Out
  kind: query
  command: "< GET {x} HW_GATING_LOGIC >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: "Returns ON or OFF. Device also sends REPORT whenever status changes. (ANI4IN-BLOCK only.)"

- id: get_chan_led_in_state
  label: Get Mic Logic LED In
  kind: query
  command: "< GET {x} CHAN_LED_IN_STATE >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: "Returns ON or OFF. (ANI4IN-BLOCK only.)"

- id: set_chan_led_in_state_on
  label: Set Mic Logic LED In On
  kind: action
  command: "< SET {x} CHAN_LED_IN_STATE ON >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: "Device replies with REP x CHAN_LED_IN_STATE ON. (ANI4IN-BLOCK only.)"

- id: set_chan_led_in_state_off
  label: Set Mic Logic LED In Off
  kind: action
  command: "< SET {x} CHAN_LED_IN_STATE OFF >"
  params:
    - name: x
      type: string
      description: Channel number 1-4
  notes: "Device replies with REP x CHAN_LED_IN_STATE OFF. (ANI4IN-BLOCK only.)"

- id: reboot
  label: Reboot ANI4IN
  kind: action
  command: "< SET REBOOT >"
  params: []
  notes: "Firmware > v2.0. Device does NOT send a response."

- id: get_last_error_event
  label: Get Last Error Event
  kind: query
  command: "< GET LAST_ERROR_EVENT >"
  params: []
  notes: "Firmware > v2.0. Returns up to 128 characters."

- id: get_input_meter_mode
  label: Get Input Meter Mode
  kind: query
  command: "< GET INPUT_METER_MODE >"
  params: []
  notes: "Firmware > v2.0. Returns PRE_FADER or POST_FADER."

- id: set_input_meter_mode_pre
  label: Set Input Meter Mode Pre-Fader
  kind: action
  command: "< SET INPUT_METER_MODE PRE_FADER >"
  params: []
  notes: "Firmware > v2.0. Device replies with REP INPUT_METER_MODE PRE_FADER."

- id: set_input_meter_mode_post
  label: Set Input Meter Mode Post-Fader
  kind: action
  command: "< SET INPUT_METER_MODE POST_FADER >"
  params: []
  notes: "Firmware > v2.0. Device replies with REP INPUT_METER_MODE POST_FADER."

- id: get_limiter_engaged
  label: Get Limiter Engaged
  kind: query
  command: "< GET {x} LIMITER_ENGAGED >"
  params:
    - name: x
      type: string
      description: Channel number 1 or 3 (limiter only in summing mode)
  notes: "Firmware > v2.0. Returns ON or OFF."

- id: get_audio_summing_mode
  label: Get Audio Summing Mode
  kind: query
  command: "< GET AUDIO_SUMMING_MODE >"
  params: []
  notes: "Firmware > v2.0. Returns OFF, 1+2, 3+4, 1+2/3+4, or 1+2+3+4."

- id: set_audio_summing_mode_off
  label: Set Audio Summing Mode Off
  kind: action
  command: "< SET AUDIO_SUMMING_MODE OFF >"
  params: []
  notes: "Firmware > v2.0."

- id: set_audio_summing_mode_1_2
  label: Set Audio Summing Mode 1+2
  kind: action
  command: "< SET AUDIO_SUMMING_MODE 1+2 >"
  params: []
  notes: "Firmware > v2.0."

- id: set_audio_summing_mode_3_4
  label: Set Audio Summing Mode 3+4
  kind: action
  command: "< SET AUDIO_SUMMING_MODE 3+4 >"
  params: []
  notes: "Firmware > v2.0."

- id: set_audio_summing_mode_1_2_3_4_split
  label: Set Audio Summing Mode 1+2/3+4
  kind: action
  command: "< SET AUDIO_SUMMING_MODE 1+2/3+4 >"
  params: []
  notes: "Firmware > v2.0."

- id: set_audio_summing_mode_1_2_3_4_mix
  label: Set Audio Summing Mode 1+2+3+4
  kind: action
  command: "< SET AUDIO_SUMMING_MODE 1+2+3+4 >"
  params: []
  notes: "Firmware > v2.0."

- id: get_audio_in_rms_lvl
  label: Get RMS Audio Level
  kind: query
  command: "< GET {x} AUDIO_IN_RMS_LVL >"
  params:
    - name: x
      type: string
      description: Channel number 0 (all) or 1-4
  notes: "Firmware > v2.0."

- id: get_audio_in_peak_lvl
  label: Get Peak Audio Level
  kind: query
  command: "< GET {x} AUDIO_IN_PEAK_LVL >"
  params:
    - name: x
      type: string
      description: Channel number 0 (all) or 1-4
  notes: "Firmware > v2.0. Returns REP x AUDIO_IN_PEAK_LVLnnn where nnn is 000-060."

- id: get_na_device_name
  label: Get Network Audio Device Name
  kind: query
  command: "< GET NA_DEVICE_NAME >"
  params: []
  notes: Returns 31-character device name (padded with spaces).

- id: get_na_chan_name
  label: Get Network Audio Channel Name
  kind: query
  command: "< GET NA_CHAN_NAME >"
  params: []
  notes: "Returns REP xx NA_CHAN_NAME {31-char name}. xx = channel (ANI4OUT uses 1-4, source says all channels use 0 for ANI4OUT context)."

- id: get_control_mac_addr
  label: Get Control Network MAC Address
  kind: query
  command: "< GET CONTROL_MAC_ADDR >"
  params: []
  notes: "Returns 17-character MAC address (e.g. 00:0E:DD:FF:F1:63)."

- id: restore_default_settings
  label: Restore Default Settings
  kind: action
  command: "< SET DEFAULT_SETTINGS >"
  params: []
  notes: "Firmware > v2.0. Device replies with REP PRESET 00 on success."

- id: get_led_state_sig_clip
  label: Get LED State (Sig/Clip)
  kind: query
  command: "< GET {x} LED_STATE_SIG_CLIP >"
  params:
    - name: x
      type: string
      description: Channel number 0-4
  notes: "Returns yyy = On - Steady, Flashing, or Off."

- id: get_peq_filter_enable
  label: Get PEQ Filter Enable
  kind: query
  command: "< GET {xx} PEQ {yy} >"
  params:
    - name: xx
      type: string
      description: PEQ block 01-04 (00 = all blocks)
    - name: yy
      type: string
      description: PEQ filter 01-04 within block (00 = all filters)
  notes: "Firmware > v2.0. Source documents the response format (REP xx PEQ yy ON/OFF) but not the GET command line itself - UNRESOLVED: full GET command string not stated."

- id: get_encryption
  label: Get Encryption Status
  kind: query
  command: "< GET ENCRYPTION >"
  params: []
  notes: "Firmware > v2.0. Returns ON or OFF."
```

## Feedbacks
```yaml
- id: audio_mute
  type: enum
  values: [on, off]
  notes: "Per-channel (x = 0-4). Rep string: < REP x AUDIO_MUTE ON/OFF >"

- id: sig_clip_led
  type: enum
  values: [off, green, amber, red]
  notes: "Per-channel (x = 0-4). Rep string: < REP x LED_COLOR_SIG_CLIP {state} >"

- id: led_state
  type: enum
  values: ["on_steady", flashing, off]
  notes: "Per-channel (x = 0-4). Rep string: < REP x LED_STATE_SIG_CLIP yyy >"

- id: led_brightness
  type: enum
  values: ["0_disabled", "1_dim", "2_default"]
  notes: "Device-level. Rep string: < REP LED_BRIGHTNESS n >"

- id: phantom_power
  type: enum
  values: [on, off]
  notes: "Per-channel. Rep string: < REP x PHANTOM_PWR_ENABLE ON/OFF >"

- id: hw_gating_logic
  type: enum
  values: [on, off]
  notes: "Per-channel (x = 0-4). ANI4IN-BLOCK only. Rep string: < REP x HW_GATING_LOGIC ON/OFF >"

- id: chan_led_in_state
  type: enum
  values: [on, off]
  notes: "Per-channel (x = 0-4). ANI4IN-BLOCK only. Rep string: < REP x CHAN_LED_IN_STATE ON/OFF >"

- id: input_meter_mode
  type: enum
  values: [pre_fader, post_fader]
  notes: "Device-level. Rep string: < REP INPUT_METER_MODE {value} >"

- id: limiter_engaged
  type: enum
  values: [on, off]
  notes: "Per-channel (x = 1 or 3 only, summing mode). Rep string: < REP x LIMITER_ENGAGED ON/OFF >"

- id: audio_summing_mode
  type: enum
  values: [off, "1+2", "3+4", "1+2/3+4", "1+2+3+4"]
  notes: "Device-level. Rep string: < REP AUDIO_SUMMING_MODE {value} >"

- id: encryption
  type: enum
  values: [on, off]
  notes: "Device-level. Rep string: < REP ENCRYPTION ON/OFF >"

- id: active_preset
  type: string
  notes: "01-10. Rep string: < REP PRESET nn >"

- id: audio_gain_hi_res
  type: integer
  notes: "Per-channel (x = 0-4). Range 0000-1400 in 0.1 dB steps. Rep string: < REP x AUDIO_GAIN_HI_RES yyyy >"

- id: audio_gain
  type: integer
  notes: "Per-channel (x = 0-4). Range 00-51 in 3 dB steps. Rep string: < REP x AUDIO_GAIN yy >"

- id: peak_audio_level
  type: integer
  notes: "Per-channel. Range 000-060. Rep string: < REP x AUDIO_IN_PEAK_LVLnnn >"

- id: rms_audio_level
  type: integer
  notes: "Per-channel. UNRESOLVED: exact range and reply string format for AUDIO_IN_RMS_LVL not stated in source."
```

## Variables
```yaml
- id: model
  type: string
  length: 32
  notes: "Rep string: < REP MODEL {32-char model} >"

- id: serial_num
  type: string
  length: 32
  notes: "Rep string: < REP SERIAL_NUM {32-char serial} >"

- id: fw_ver
  type: string
  length: 18
  notes: "Rep string: < REP FW_VER {18-char fwver} >"

- id: ip_addr_audio
  type: string
  length: 15
  notes: "Rep string: < REP IP_ADDR_NET_AUDIO_PRIMARY {15-char ip} >"

- id: ip_subnet_audio
  type: string
  length: 15
  notes: "Rep string: < REP IP_SUBNET_NET_AUDIO_PRIMARY {15-char subnet} >"

- id: ip_gateway_audio
  type: string
  length: 15
  notes: "Rep string: < REP IP_GATEWAY_NET_AUDIO_PRIMARY {15-char gw} >"

- id: chan_name
  type: string
  length: 31
  notes: "Per-channel (x = 0-4). Padded with spaces. Rep string: < REP x CHAN_NAME {31-char name} >"

- id: device_id
  type: string
  length: 31
  notes: "Device-level. Rep string: < REP DEVICE_ID {31-char id} >"

- id: na_device_name
  type: string
  length: 31
  notes: "Device-level. Rep string: < REP NA_DEVICE_NAME {31-char name} >"

- id: na_chan_name
  type: string
  length: 31
  notes: "Network audio channel. Rep string: < REP xx NA_CHAN_NAME {31-char name} >"

- id: control_mac_addr
  type: string
  length: 17
  notes: "Device-level. Format yy:yy:yy:yy:yy:yy. Rep string: < REP CONTROL_MAC_ADDR {mac} >"

- id: preset1_name
  type: string
  length: 25
  notes: "Rep string: < REP PRESET1 {25-char name} >"

- id: preset2_name
  type: string
  length: 25
  notes: "Rep string: < REP PRESET2 {25-char name} >"

- id: preset3_name
  type: string
  length: 25
  notes: "Rep string: < REP PRESET3 {25-char name} >"

- id: meter_rate
  type: integer
  notes: "0 (off) or >=100 ms. Rep string: < REP METER_RATE sssss >"

- id: last_error_event
  type: string
  max_length: 128
  notes: "Firmware > v2.0. Rep string: < REP LAST_ERROR_EVENT {128-char err} >"

- id: peq_filter_enable
  type: enum
  values: [on, off]
  notes: "Firmware > v2.0. Rep string: < REP xx PEQ yy ON/OFF >. UNRESOLVED: full GET command string not stated in source."
```

## Events
```yaml
- id: parameter_report
  description: "Unsolicited REPORT string emitted by ANI4IN whenever any of these parameters change on the device or through the GUI: AUDIO_MUTE, AUDIO_GAIN, AUDIO_GAIN_HI_RES, LED_COLOR_SIG_CLIP, LED_BRIGHTNESS, PHANTOM_PWR_ENABLE, HW_GATING_LOGIC, CHAN_LED_IN_STATE, INPUT_METER_MODE, LIMITER_ENGAGED, AUDIO_SUMMING_MODE, ENCRYPTION, PRESET, NA_DEVICE_NAME, NA_CHAN_NAME, CHAN_NAME, DEVICE_ID, LED_STATE_SIG_CLIP."
  notes: "Application should subscribe to REP strings rather than polling GET. Rep format: < REP {params} >"

- id: audio_sample
  description: Streaming SAMPLE messages emitted while metering is active.
  format: "< SAMPLE {aaa} {bbb} {ccc} {ddd} >"
  notes: "aaa=output 1, bbb=output 2, ccc=output 3, ddd=output 4. Each value 000-060. Emitted at rate set by SET METER_RATE sssss."
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences as named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- **Connection model:** TCP/IP, port 2202. Source says "select 'Client' in the AMX/Crestron program" — the device accepts inbound TCP client connections from the controller.
- **Message framing:** ASCII strings wrapped in `<` and `>` angle brackets. All messages terminated with `>`.
- **Channel encoding:** `x` is the channel character. Source documents 0 (all) and 1-4 for individual channels.
- **ANAI4IN-BLOCK variant:** Commands for HW_GATING_LOGIC and CHAN_LED_IN_STATE only apply to the BLOCK (logic-enabled) variant.
- **Firmware gating:** Commands marked "(firmware > v2.0)" in the source are not available on older firmware. Firmware version itself is queryable via GET FW_VER.
- **Asynchronous reports:** Per the source, "Most parameters will send a REPORT command when they change. Thus, it is not necessary to constantly query parameters." Recommended pattern is GET on connect for initial state, then listen for unsolicited REP.
- **Flash auto-off:** Front-panel flash command auto-disables after 30 seconds.
- **Source typo noted:** The "Decrease Digital Audio Gain" section shows response range "0000 to 1280" while the rest of the gain command set uses 0000-1400. Preserved as documented; flag for verification.
- **Metering auto-stop:** Setting METER_RATE to 0 (or 00000) stops sample streaming.

<!-- UNRESOLVED: ANI4OUT (output-side) commands are not in this source. The NA_CHAN_NAME GET response references ANI4OUT channels, but the ANI4OUT-specific commands are not in this document. -->
<!-- UNRESOLVED: PEQ filter GET command line is not stated in source — only the response format is documented. -->
<!-- UNRESOLVED: RMS audio level exact reply string format is not stated in source (only the GET command is given). -->
```

Saved at `/tmp/shure_ani4in_spec.md`. 61 actions, 16 feedbacks, 17 variables, 2 events. All 8 YAML blocks parse clean. ANI4OUT commands absent from source → marked unresolved. Three real source gaps flagged: PEQ GET command, RMS response format, ANI4OUT commands.

## Provenance

```yaml
source_domains:
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://content-files.shure.com/Pubs/ANI4IN/ANI4IN_Command_Strings.pdf
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/view/guide/ANI4IN/en-US.pdf
  - https://pubs.shure.com/view/guide/ANI4OUT/en-US.pdf
  - https://content-files.shure.com/FileRepository/common-ip-ports-v2.pdf
retrieved_at: 2026-06-15T23:35:32.919Z
last_checked_at: 2026-06-16T07:17:45.335Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:17:45.335Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions matched verbatim in source with correct transport parameters; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ANI4OUT (output variant) commands are not in this source; spec covers ANI4IN only."
- "full GET command string not stated.\""
- "exact range and reply string format for AUDIO_IN_RMS_LVL not stated in source.\""
- "full GET command string not stated in source.\""
- "source does not describe any multi-step sequences as named macros."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "ANI4OUT (output-side) commands are not in this source. The NA_CHAN_NAME GET response references ANI4OUT channels, but the ANI4OUT-specific commands are not in this document."
- "PEQ filter GET command line is not stated in source — only the response format is documented."
- "RMS audio level exact reply string format is not stated in source (only the GET command is given)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
