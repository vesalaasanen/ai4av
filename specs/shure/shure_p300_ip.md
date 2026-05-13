---
spec_id: admin/shure-p300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure P300 Control Spec"
manufacturer: Shure
model_family: "Shure P300"
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - "Shure P300"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-04-30T15:23:25.124Z
generated_at: 2026-04-30T15:23:25.124Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:23:25.124Z
  matched_actions: 68
  action_count: 68
  confidence: high
  summary: "All 68 spec actions matched verbatim; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Shure P300 Control Spec

## Summary

Shure P300 IntelliMix audio processor with Ethernet (TCP/IP) control on port 2202. ASCII command protocol using `< GET|SET xx PARAM >` / `< REP xx PARAM >` framing. Supports Dante and analog I/O, automixing, AEC, AGC, compressor, PEQ, matrix mixing, and metering. 28 audio channels across inputs, outputs, and processing blocks.

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
traits:
  - powerable     # inferred: reboot command present
  - queryable     # inferred: extensive GET/REP command set
  - levelable     # inferred: gain, threshold, ratio, delay controls
  - routable      # inferred: matrix mixer routing commands
```

## Actions

```yaml
actions:
  - id: set_preset
    label: Recall Preset
    kind: action
    command: "< SET PRESET {n} >"
    params:
      - name: n
        type: integer
        min: 1
        max: 10
        description: Preset number (1-10, leading zero optional on SET)

  - id: mute_channel
    label: Mute Channel
    kind: action
    command: "< SET {xx} AUDIO_MUTE ON >"
    params:
      - name: xx
        type: integer
        min: 0
        max: 28
        description: Channel number (00=all, 01-20, 23-28)

  - id: unmute_channel
    label: Unmute Channel
    kind: action
    command: "< SET {xx} AUDIO_MUTE OFF >"
    params:
      - name: xx
        type: integer
        min: 0
        max: 28
        description: Channel number (00=all, 01-20, 23-28)

  - id: toggle_channel_mute
    label: Toggle Channel Mute
    kind: action
    command: "< SET {xx} AUDIO_MUTE TOGGLE >"
    params:
      - name: xx
        type: integer
        min: 0
        max: 28
        description: Channel number (00=all, 01-20, 23-28)

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

  - id: set_flash_on
    label: Flash Lights On
    kind: action
    command: "< SET FLASH ON >"
    params: []

  - id: set_flash_off
    label: Flash Lights Off
    kind: action
    command: "< SET FLASH OFF >"
    params: []

  - id: reboot
    label: Reboot Device
    kind: action
    command: "< SET REBOOT >"
    params: []

  - id: restore_defaults
    label: Restore Default Settings
    kind: action
    command: "< SET DEFAULT_SETTINGS >"
    params: []

  - id: set_peq_filter
    label: Set PEQ Filter Enable
    kind: action
    command: "< SET {xx} PEQ {yy} {state} >"
    params:
      - name: xx
        type: integer
        min: 0
        max: 28
        description: "PEQ block (00=all, 01-08=Dante mic in, 09-10=Dante in, 11-12=Analog in, 13=USB in, 14=Mobile in, 15-16=Dante out 1-2, 17-18=Analog out, 19=USB out, 21=automixer, 23-28=Dante out 3-8)"
      - name: yy
        type: integer
        min: 1
        max: 4
        description: Filter number (01-04 for blocks 01-08/15-21; 01-02 for blocks 09-14)
      - name: state
        type: enum
        values: [ON, OFF]

  - id: set_matrix_route
    label: Set Matrix Mixer Route
    kind: action
    command: "< SET {xx} MATRIX_MXR_ROUTE {yy} {state} >"
    params:
      - name: xx
        type: integer
        description: "Input channel (0, 01-14, 21)"
      - name: yy
        type: integer
        description: "Output channel (0, 15-20, 23-28)"
      - name: state
        type: enum
        values: [ON, OFF]

  - id: set_aec_state
    label: Set AEC State
    kind: action
    command: "< SET {xx} AEC {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08=Dante mic processing)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_aec_reference
    label: Set AEC Reference Signal
    kind: action
    command: "< SET {xx} AEC_REF {n} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 22)"
      - name: n
        type: enum
        values: [DANTEOUT1, DANTEOUT2, DANTEOUT3, DANTEOUT4, DANTEOUT5, DANTEOUT6, DANTEOUT7, DANTEOUT8, ANALOGOUT1, ANALOGOUT2, DANTEIN9, DANTEIN10, ANALOGIN1, ANALOGIN2, USBIN, MOBILEIN]

  - id: set_nlp_state
    label: Set NLP State
    kind: action
    command: "< SET {xx} AEC_NLP {level} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: level
        type: enum
        values: [LOW, MEDIUM, HIGH]

  - id: set_noise_reduction
    label: Set Noise Reduction State
    kind: action
    command: "< SET {xx} NOISE_RED {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: state
        type: enum
        values: [ON, OFF]

  - id: set_noise_reduction_level
    label: Set Noise Reduction Level
    kind: action
    command: "< SET {xx} NOISE_RED_LVL {level} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: level
        type: enum
        values: [LOW, MEDIUM, HIGH]

  - id: set_agc_state
    label: Set AGC State
    kind: action
    command: "< SET {xx} AGC {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_gate_inhibit
    label: Set Gate Inhibit State
    kind: action
    command: "< SET 22 GATE_INHIBIT {state} >"
    params:
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]
    notes: Only works on firmware < 4.1.x

  - id: set_automixer_mode
    label: Set Automixer Mode
    kind: action
    command: "< SET {xx} AUTOMXR_MODE {mode} >"
    params:
      - name: xx
        type: integer
        description: "Automixer channel (00 or 21)"
      - name: mode
        type: enum
        values: [MANUAL, GAINSHARE, GATING]

  - id: set_automixer_mute
    label: Set Automixer Post Gate Mute
    kind: action
    command: "< SET {xx} AUTOMXR_MUTE {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_automixer_lmlo
    label: Set Automixer Last Mic Lock On
    kind: action
    command: "< SET {xx} AUTOMXR_LMLO {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_automixer_always_on
    label: Set Automixer Channel Always On
    kind: action
    command: "< SET {xx} AUTOMXR_ALWAYS_ON {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_automixer_priority
    label: Set Automixer Channel Priority
    kind: action
    command: "< SET {xx} AUTOMXR_PRIORITY {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_compressor_state
    label: Set Compressor State
    kind: action
    command: "< SET {xx} COMPRESSOR {state} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: state
        type: enum
        values: [ON, OFF, TOGGLE]

  - id: set_input_meter_mode
    label: Set Input Meter Display Mode
    kind: action
    command: "< SET INPUT_METER_MODE {mode} >"
    params:
      - name: mode
        type: enum
        values: [PRE_FADER, POST_FADER]

  - id: set_output_meter_mode
    label: Set Output Meter Display Mode
    kind: action
    command: "< SET OUTPUT_METER_MODE {mode} >"
    params:
      - name: mode
        type: enum
        values: [PRE_FADER, POST_FADER]

  - id: set_input_level_switch
    label: Set Analog Input Gain Switch
    kind: action
    command: "< SET {xx} AUDIO_IN_LVL_SWITCH {level} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00, 11, or 12)"
      - name: level
        type: enum
        values: [LINE_LVL, AUX_LVL]

  - id: set_output_level_switch
    label: Set Analog Output Gain Switch
    kind: action
    command: "< SET {xx} AUDIO_OUT_LVL_SWITCH {level} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00, 17, or 18)"
      - name: level
        type: enum
        values: [LINE_LVL, AUX_LVL, MIC_LVL]

  - id: set_onhook_enable
    label: Set Call Status Enable
    kind: action
    command: "< SET ONHOOK_ENABLE {state} >"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: set_direct_out_tap_point
    label: Set Direct Out Tap Point
    kind: action
    command: "< SET {nn} DIRECTOUT_POINT {xx} >"
    params:
      - name: nn
        type: integer
        description: "Channel (00=all, 01-08=Dante input)"
      - name: xx
        type: integer
        min: 0
        max: 3
        description: "0=Pre-gate/Pre Processing, 1=Pre-gate/Post Processing, 2=Post-gate/Pre Processing, 3=Post-gate/Post Processing"
    notes: Firmware 4.1.x and newer
```

## Feedbacks

```yaml
feedbacks:
  - id: report_all
    label: Report All Parameters
    type: string
    command: "< GET {xx} ALL >"
    response: "< REP ... >"
    params:
      - name: xx
        description: "Channel (00-21, 23-28)"

  - id: model_number
    label: Model Number
    type: string
    command: "< GET MODEL >"
    response: "< REP MODEL {32-char string} >"

  - id: serial_number
    label: Serial Number
    type: string
    command: "< GET SERIAL_NUM >"
    response: "< REP SERIAL_NUM {32-char string} >"

  - id: channel_name
    label: Channel Name
    type: string
    command: "< GET {xx} CHAN_NAME >"
    response: "< REP {xx} CHAN_NAME {31-char string} >"
    params:
      - name: xx
        description: "Channel (00-20, 23-28)"

  - id: device_id
    label: Device ID
    type: string
    command: "< GET DEVICE_ID >"
    response: "< REP DEVICE_ID {31-char string} >"

  - id: firmware_version
    label: Firmware Version
    type: string
    command: "< GET FW_VER >"
    response: "< REP FW_VER {18-char string} >"

  - id: preset
    label: Current Preset
    type: integer
    command: "< GET PRESET >"
    response: "< REP PRESET nn >"
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  - id: preset_name
    label: Preset Name
    type: string
    command: "< GET PRESET{n} >"
    response: "< REP PRESET{n} {25-char string} >"

  - id: channel_mute
    label: Channel Mute State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUDIO_MUTE >"
    response: "< REP {xx} AUDIO_MUTE {ON|OFF} >"

  - id: device_mute
    label: Device Mute State
    type: enum
    values: [ON, OFF]
    command: "< GET DEVICE_AUDIO_MUTE >"
    response: "< REP DEVICE_AUDIO_MUTE {ON|OFF} >"

  - id: audio_gain
    label: Audio Gain
    type: integer
    command: "< GET {xx} AUDIO_GAIN_HI_RES >"
    response: "< REP {xx} AUDIO_GAIN_HI_RES yyyy >"
    params:
      - name: xx
        description: "Channel (00-20, 22-28)"
    notes: "yyyy range 0000-1400 in 0.1 dB steps"

  - id: input_level_switch
    label: Analog Input Gain Switch
    type: enum
    values: [LINE_LVL, AUX_LVL]
    command: "< GET {xx} AUDIO_IN_LVL_SWITCH >"
    response: "< REP {xx} AUDIO_IN_LVL_SWITCH {LINE_LVL|AUX_LVL} >"

  - id: output_level_switch
    label: Analog Output Gain Switch
    type: enum
    values: [LINE_LVL, AUX_LVL, MIC_LVL]
    command: "< GET {xx} AUDIO_OUT_LVL_SWITCH >"
    response: "< REP {xx} AUDIO_OUT_LVL_SWITCH {value} >"

  - id: flash_state
    label: Flash State
    type: enum
    values: [ON, OFF]
    command: "< GET FLASH >"
    response: "< REP FLASH {ON|OFF} >"

  - id: led_brightness
    label: LED Brightness
    type: enum
    values: [0, 1, 2]
    command: "< GET LED_BRIGHTNESS >"
    response: "< REP LED_BRIGHTNESS n >"
    notes: "0=disabled, 1=dim, 2=default"

  - id: audio_ip_address
    label: Audio IP Address
    type: string
    command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
    response: "< REP IP_ADDR_NET_AUDIO_PRIMARY {15-char IP} >"

  - id: audio_subnet
    label: Audio Subnet Address
    type: string
    command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
    response: "< REP IP_SUBNET_NET_AUDIO_PRIMARY {15-char subnet} >"

  - id: audio_gateway
    label: Audio Gateway Address
    type: string
    command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
    response: "< REP IP_GATEWAY_NET_AUDIO_PRIMARY {15-char gateway} >"

  - id: encryption_status
    label: Encryption Status
    type: enum
    values: [ON, OFF]
    command: "< GET ENCRYPTION >"
    response: "< REP ENCRYPTION {ON|OFF} >"

  - id: peq_filter_state
    label: PEQ Filter State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} PEQ {yy} >"
    response: "< REP {xx} PEQ {yy} {ON|OFF} >"

  - id: input_meter_mode
    label: Input Meter Display Mode
    type: enum
    values: [PRE_FADER, POST_FADER]
    command: "< GET INPUT_METER_MODE >"
    response: "< REP INPUT_METER_MODE {PRE_FADER|POST_FADER} >"

  - id: output_meter_mode
    label: Output Meter Display Mode
    type: enum
    values: [PRE_FADER, POST_FADER]
    command: "< GET OUTPUT_METER_MODE >"
    response: "< REP OUTPUT_METER_MODE {PRE_FADER|POST_FADER} >"

  - id: usb_connection
    label: USB Connection Status
    type: enum
    values: [ON, OFF]
    command: "< GET USB_CONNECT >"
    response: "< REP USB_CONNECT {ON|OFF} >"

  - id: matrix_route
    label: Matrix Mixer Route
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} MATRIX_MXR_ROUTE {yy} >"
    response: "< REP {xx} MATRIX_MXR_ROUTE {yy} {ON|OFF} >"

  - id: matrix_gain
    label: Matrix Mixer Gain
    type: integer
    command: "< GET {xx} MATRIX_MXR_GAIN {yy} >"
    response: "< REP {xx} MATRIX_MXR_GAIN {yy} zzzz >"
    notes: "zzzz range 0000-1400 in 0.1 dB steps"

  - id: control_mac_address
    label: Control Network MAC Address
    type: string
    command: "< GET CONTROL_MAC_ADDR >"
    response: "< REP CONTROL_MAC_ADDR yy:yy:yy:yy:yy:yy >"

  - id: na_channel_name
    label: Network Audio Channel Name
    type: string
    command: "< GET {xx} NA_CHAN_NAME >"
    response: "< REP {xx} NA_CHAN_NAME {31-char string} >"

  - id: na_device_name
    label: Network Audio Device Name
    type: string
    command: "< GET NA_DEVICE_NAME >"
    response: "< REP NA_DEVICE_NAME {31-char string} >"

  - id: aec_state
    label: AEC State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AEC >"
    response: "< REP {xx} AEC {ON|OFF} >"

  - id: aec_reference
    label: AEC Reference Signal
    type: enum
    values: [DANTEOUT1, DANTEOUT2, DANTEOUT3, DANTEOUT4, DANTEOUT5, DANTEOUT6, DANTEOUT7, DANTEOUT8, ANALOGOUT1, ANALOGOUT2, DANTEIN9, DANTEIN10, ANALOGIN1, ANALOGIN2, USBIN, MOBILEIN]
    command: "< GET {xx} AEC_REF >"
    response: "< REP {xx} AEC_REF {n} >"

  - id: nlp_state
    label: NLP State
    type: enum
    values: [LOW, MEDIUM, HIGH]
    command: "< GET {xx} AEC_NLP >"
    response: "< REP {xx} AEC_NLP {LOW|MEDIUM|HIGH} >"

  - id: noise_reduction_state
    label: Noise Reduction State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} NOISE_RED >"
    response: "< REP {xx} NOISE_RED {ON|OFF} >"

  - id: noise_reduction_level
    label: Noise Reduction Level
    type: enum
    values: [LOW, MEDIUM, HIGH]
    command: "< GET {xx} NOISE_RED_LVL >"
    response: "< REP {xx} NOISE_RED_LVL {LOW|MEDIUM|HIGH} >"

  - id: agc_state
    label: AGC State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AGC >"
    response: "< REP {xx} AGC {ON|OFF} >"

  - id: agc_max_cut
    label: AGC Max Cut Value
    type: integer
    command: "< GET {xx} AGC_MAX_CUT >"
    response: "< REP {xx} AGC_MAX_CUT yyy >"
    notes: "yyy range 000-200 (shifted by +20, ×10, actual -20.0 to 0.0 dB)"

  - id: agc_max_boost
    label: AGC Max Boost Value
    type: integer
    command: "< GET {xx} AGC_MAX_BOOST >"
    response: "< REP {xx} AGC_MAX_BOOST yyy >"
    notes: "yyy range 000-200 (actual 0.0 to +20.0 dB in 0.1 dB)"

  - id: agc_target
    label: AGC Target Level
    type: integer
    command: "< GET {xx} AGC_TARGET >"
    response: "< REP {xx} AGC_TARGET yyy >"
    notes: "yyy range 000-500 (shifted by +50, ×10, actual -50.0 to 0.0 dBFS)"

  - id: gate_inhibit_state
    label: Gate Inhibit State
    type: enum
    values: [ON, OFF]
    command: "< GET 22 GATE_INHIBIT >"
    response: "< REP 22 GATE_INHIBIT {ON|OFF} >"
    notes: Only works on firmware < 4.1.x

  - id: automixer_mode
    label: Automixer Mode
    type: enum
    values: [MANUAL, GAINSHARE, GATING]
    command: "< GET {xx} AUTOMXR_MODE >"
    response: "< REP {xx} AUTOMXR_MODE {mode} >"

  - id: automixer_off_attenuation
    label: Automixer Off Attenuation
    type: integer
    command: "< GET {xx} AUTOMXR_OFF_ATT >"
    response: "< REP {xx} AUTOMXR_OFF_ATT yyy >"
    notes: "yyy range 0-107 (shifted by +110, actual -110 to -3 dB)"

  - id: automixer_gate_sensitivity
    label: Automixer Gating Sensitivity
    type: integer
    command: "< GET {xx} AUTOMXR_GATE_SEN >"
    response: "< REP {xx} AUTOMXR_GATE_SEN y >"
    notes: "y range 1-9"

  - id: automixer_max_nom
    label: Automixer Max Number of Mics
    type: integer
    command: "< GET {xx} AUTOMXR_MAX_NOM >"
    response: "< REP {xx} AUTOMXR_MAX_NOM y >"
    notes: "y range 1-8"

  - id: automixer_lmlo
    label: Automixer Last Mic Lock On
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUTOMXR_LMLO >"
    response: "< REP {xx} AUTOMXR_LMLO {ON|OFF} >"

  - id: automixer_holdtime
    label: Automixer Hold Time
    type: integer
    command: "< GET {xx} AUTOMXR_HOLDTIME >"
    response: "< REP {xx} AUTOMXR_HOLDTIME yyyy >"
    notes: "yyyy range 0100-1500 ms"

  - id: automixer_always_on
    label: Automixer Channel Always On
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUTOMXR_ALWAYS_ON >"
    response: "< REP {xx} AUTOMXR_ALWAYS_ON {ON|OFF} >"

  - id: automixer_priority
    label: Automixer Channel Priority
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUTOMXR_PRIORITY >"
    response: "< REP {xx} AUTOMXR_PRIORITY {ON|OFF} >"

  - id: automixer_mute
    label: Automixer Post Gate Mute
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUTOMXR_MUTE >"
    response: "< REP {xx} AUTOMXR_MUTE {ON|OFF} >"

  - id: automixer_gate_status
    label: Automixer Gate Status
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} AUTOMXR_GATE >"
    response: "< REP {xx} AUTOMXR_GATE {ON|OFF} >"
    notes: Read-only gate status per channel

  - id: compressor_state
    label: Compressor State
    type: enum
    values: [ON, OFF]
    command: "< GET {xx} COMPRESSOR >"
    response: "< REP {xx} COMPRESSOR {ON|OFF} >"

  - id: compressor_threshold
    label: Compressor Threshold
    type: integer
    command: "< GET {xx} COMP_THRESHOLD >"
    response: "< REP {xx} COMP_THRESHOLD yyy >"
    notes: "yyy range 000-600 (shifted by +60, ×10, actual -60.0 to 0.0 dB)"

  - id: compressor_ratio
    label: Compressor Ratio
    type: integer
    command: "< GET {xx} COMP_RATIO >"
    response: "< REP {xx} COMP_RATIO yyyy >"
    notes: "yyyy range 0010-1000 (actual 1.0:1 to 100.0:1 in 0.1 increments)"

  - id: delay
    label: Delay
    type: integer
    command: "< GET {xx} DELAY >"
    response: "< REP {xx} DELAY yyyy >"
    notes: "yyyy range 0-1000 ms; 0 = disabled. Channels: 00=all, 17-19"

  - id: meter_rate_in
    label: Input Metering Rate
    type: integer
    command: "< GET METER_RATE_IN >"
    response: "< REP METER_RATE_IN yyyyy >"
    notes: "00000=off, 00100-99999 ms. Values 00001-00099 invalid."

  - id: meter_rate_out
    label: Output Metering Rate
    type: integer
    command: "< GET METER_RATE_OUT >"
    response: "< REP METER_RATE_OUT yyyyy >"
    notes: "00000=off, 00100-99999 ms. Values 00001-00099 invalid."

  - id: meter_rate_proc
    label: Processing Metering Rate
    type: integer
    command: "< GET METER_RATE_PROC >"
    response: "< REP METER_RATE_PROC yyyyy >"
    notes: "00000=off, 00100-99999 ms. Values 00001-00099 invalid."

  - id: meter_rate_erle
    label: ERLE Metering Rate
    type: integer
    command: "< GET METER_RATE_ERLE >"
    response: "< REP METER_RATE_ERLE yyyyy >"
    notes: "00000=off, 00100-99999 ms. Values 00001-00099 invalid."

  - id: meter_rate_agc
    label: AGC Metering Rate
    type: integer
    command: "< GET METER_RATE_AGC >"
    response: "< REP METER_RATE_AGC yyyyy >"
    notes: "00000=off, 00100-99999 ms. Values 00001-00099 invalid."

  - id: direct_out_tap_point
    label: Direct Out Tap Point
    type: integer
    command: "< GET {nn} DIRECTOUT_POINT >"
    response: "< REP {nn} DIRECTOUT_POINT {xx} >"
    notes: "Firmware 4.1.x+. xx: 0=Pre-gate/Pre, 1=Pre-gate/Post, 2=Post-gate/Pre, 3=Post-gate/Post"

  - id: onhook_enable
    label: Call Status Enabled
    type: enum
    values: [ON, OFF]
    command: "< GET ONHOOK_ENABLE >"
    response: "< REP ONHOOK_ENABLE {state} >"

  - id: onhook_state
    label: Call Status State
    type: enum
    values: [ONHOOK, OFFHOOK]
    command: "< GET ONHOOK_STATE >"
    response: "< REP ONHOOK_STATE {state} >"
    notes: "ONHOOK=not in call, OFFHOOK=in call. OFFHOOK when feature disabled."
```

## Variables

```yaml
variables:
  - id: audio_gain
    label: Audio Gain
    command_set: "< SET {xx} AUDIO_GAIN_HI_RES {yyyy} >"
    command_inc: "< SET {xx} AUDIO_GAIN_HI_RES INC {nn} >"
    command_dec: "< SET {xx} AUDIO_GAIN_HI_RES DEC {nn} >"
    params:
      - name: xx
        type: integer
        description: "Channel (01-20, 22-28)"
      - name: value
        type: integer
        min: 0
        max: 1400
        unit: "0.1 dB"
        description: "0000 to 1400 in 0.1 dB steps"

  - id: matrix_mixer_gain
    label: Matrix Mixer Gain
    command_set: "< SET {xx} MATRIX_MXR_GAIN {yy} {zzzz} >"
    command_inc: "< SET {xx} MATRIX_MXR_GAIN {yy} INC {nn} >"
    command_dec: "< SET {xx} MATRIX_MXR_GAIN {yy} DEC {nn} >"
    params:
      - name: xx
        type: integer
        description: "Input channel (0-14, 21)"
      - name: yy
        type: integer
        description: "Output channel (15-20, 23-28)"
      - name: value
        type: integer
        min: 0
        max: 1400
        unit: "0.1 dB"
        description: "0000 to 1400 in 0.1 dB steps"

  - id: meter_rate_in
    label: Input Metering Rate
    command_set: "< SET METER_RATE_IN {yyyyy} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 99999
        unit: ms
        description: "00000=off, 00100-99999 ms"

  - id: meter_rate_out
    label: Output Metering Rate
    command_set: "< SET METER_RATE_OUT {yyyyy} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 99999
        unit: ms

  - id: meter_rate_proc
    label: Processing Metering Rate
    command_set: "< SET METER_RATE_PROC {yyyyy} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 99999
        unit: ms

  - id: meter_rate_erle
    label: ERLE Metering Rate
    command_set: "< SET METER_RATE_ERLE {yyyyy} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 99999
        unit: ms

  - id: meter_rate_agc
    label: AGC Metering Rate
    command_set: "< SET METER_RATE_AGC {yyyyy} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 99999
        unit: ms

  - id: led_brightness
    label: LED Brightness
    command_set: "< SET LED_BRIGHTNESS {n} >"
    params:
      - name: value
        type: integer
        min: 0
        max: 2
        description: "0=disabled, 1=dim, 2=default"

  - id: agc_max_cut
    label: AGC Max Cut
    command_set: "< SET {xx} AGC_MAX_CUT {yyy} >"
    command_inc: "< SET {xx} AGC_MAX_CUT inc {nnn} >"
    command_dec: "< SET {xx} AGC_MAX_CUT dec {nnn} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: value
        type: integer
        min: 0
        max: 200
        unit: "0.1 dB"
        description: "Shifted by +20, ×10; 000=-20.0 dB, 200=0.0 dB"

  - id: agc_max_boost
    label: AGC Max Boost
    command_set: "< SET {xx} AGC_MAX_BOOST {yyy} >"
    command_inc: "< SET {xx} AGC_MAX_BOOST inc {nnn} >"
    command_dec: "< SET {xx} AGC_MAX_BOOST dec {nnn} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: value
        type: integer
        min: 0
        max: 200
        unit: "0.1 dB"
        description: "000=0.0 dB, 200=+20.0 dB"

  - id: agc_target
    label: AGC Target Level
    command_set: "< SET {xx} AGC_TARGET {yyy} >"
    command_inc: "< SET {xx} AGC_TARGET inc {nnn} >"
    command_dec: "< SET {xx} AGC_TARGET dec {nnn} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 01-08)"
      - name: value
        type: integer
        min: 0
        max: 500
        unit: "0.1 dBFS"
        description: "Shifted by +50, ×10; 000=-50.0 dBFS, 500=0.0 dBFS"

  - id: compressor_threshold
    label: Compressor Threshold
    command_set: "< SET {xx} COMP_THRESHOLD {yyy} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 0
        max: 600
        unit: "0.1 dB"
        description: "Shifted by +60, ×10; 000=-60.0 dB, 600=0.0 dB"

  - id: compressor_ratio
    label: Compressor Ratio
    command_set: "< SET {xx} COMP_RATIO {yyyy} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 10
        max: 1000
        unit: "0.1 ratio"
        description: "0010=1.0:1, 1000=100.0:1"

  - id: delay
    label: Output Delay
    command_set: "< SET {xx} DELAY {yyyy} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00=all, 17=Analog Out 1, 18=Analog Out 2, 19=USB Out)"
      - name: value
        type: integer
        min: 0
        max: 1000
        unit: ms
        description: "0 = disabled"

  - id: automixer_off_attenuation
    label: Automixer Off Attenuation
    command_set: "< SET {xx} AUTOMXR_OFF_ATT {yyy} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 0
        max: 107
        unit: dB
        description: "Shifted by +110; 000=-110 dB, 107=-3 dB"

  - id: automixer_gate_sensitivity
    label: Automixer Gating Sensitivity
    command_set: "< SET {xx} AUTOMXR_GATE_SEN {y} >"
    command_inc: "< SET {xx} AUTOMXR_GATE_SEN inc {n} >"
    command_dec: "< SET {xx} AUTOMXR_GATE_SEN dec {n} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 1
        max: 9

  - id: automixer_max_nom
    label: Automixer Max Number of Mics
    command_set: "< SET {xx} AUTOMXR_MAX_NOM {y} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 1
        max: 8

  - id: automixer_holdtime
    label: Automixer Hold Time
    command_set: "< SET {xx} AUTOMXR_HOLDTIME {yyyy} >"
    params:
      - name: xx
        type: integer
        description: "Channel (00 or 21)"
      - name: value
        type: integer
        min: 100
        max: 1500
        unit: ms
```

## Events

```yaml
events:
  - id: sample_in
    label: Input Audio Metering Sample
    pattern: "< SAMPLE_IN aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk lll mmm nnn >"
    notes: "14 input channel levels, 000-060 representing -60 to 0 dBFS. Sent at configured METER_RATE_IN interval."

  - id: sample_out
    label: Output Audio Metering Sample
    pattern: "< SAMPLE_OUT aaa bbb ccc ddd eee fff ... >"
    notes: "Output channel levels, 000-060 representing -60 to 0 dBFS. Channels: Dante out 1-2, Analog out, USB out, Mobile out, Dante out 3-8. Sent at METER_RATE_OUT interval."

  - id: sample_proc
    label: Processing Block Metering Sample
    pattern: "< SAMPLE_PROC aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk lll >"
    notes: "12 channels: 1-8=pre-AGC on Dante inputs, 9=automixer out, 10=pre-compressor, 11=AEC ref. 000-060 = -60 to 0 dBFS."

  - id: sample_erle
    label: ERLE Metering Sample
    pattern: "< SAMPLE_ERLE aaa bbb ccc ddd eee fff ggg hhh >"
    notes: "8 channels, 00-40 representing 0-40 dB ERLE in 1 dB increments."

  - id: sample_agc
    label: AGC Metering Sample
    pattern: "< SAMPLE_AGC aaa bbb ccc ddd eee fff ggg hhh >"
    notes: "8 channels, 00-40 representing -20 to +20 dB (scaled by +20). Sent at METER_RATE_AGC interval."

  - id: unsolicited_rep
    label: Unsolicited Parameter Report
    pattern: "< REP {xx} {PARAM} {value} >"
    notes: "Most parameters send REPORT when they change on the device. Not necessary to constantly poll."
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source beyond the muting best-practice scenario
```

## Safety

```yaml
confirmation_required_for:
  - reboot
  - restore_defaults
interlocks:
  - description: "Do NOT mute microphones locally when AEC/automixer active - mute P300 automixer output via logic control instead. Local mic muting breaks AEC continuous processing."
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes

- All commands and responses are ASCII, framed with `<` and `>`.
- Channel numbers (xx) are two-digit ASCII: 00-28. See channel assignment table in source.
- Most parameters send unsolicited `< REP ... >` on change — polling not required after initial `< GET xx ALL >` on power-up.
- Gain values use shifted/scaled integer encoding (documented per command). All in 0.1 dB resolution.
- Metering sample data: 000-060 = -60 to 0 dBFS.
- Meter rates: values 00001-00099 ms are invalid and return `< REP ERR >`.
- Flash auto-disables after 30 seconds.
- Preset numbers: SET accepts 1-10 (leading zero optional); REP always returns 01-10.
- Some commands require firmware 4.1.x or newer (Dante outputs 3-8 channels 23-28, DIRECTOUT_POINT, GATE_INHIBIT deprecated).
- Static IP configuration requires Shure Designer software; control IP used for TCP/IP communication.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: keep-alive / heartbeat mechanism not documented -->
<!-- UNRESOLVED: maximum concurrent connections not stated -->
<!-- UNRESOLVED: command delimiter beyond angle brackets not specified -->
<!-- UNRESOLVED: error response format only mentioned as <REP ERR> for metering — full error catalog not in source -->

## Provenance

```yaml
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-04-30T15:23:25.124Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:23:25.124Z
matched_actions: 68
action_count: 68
confidence: high
summary: "All 68 spec actions matched verbatim; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
