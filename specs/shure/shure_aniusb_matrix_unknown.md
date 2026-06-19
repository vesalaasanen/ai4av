---
spec_id: admin/shure-aniusb-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure ANIUSB MATRIX Control Spec"
manufacturer: Shure
model_family: ANIUSB-MATRIX
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - ANIUSB-MATRIX
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/ANIUSB-Matrix
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/ANIUSB-MATRIX/en-US
  - https://www.shure.com/en-US/docs/commandstrings/ANIUSB-MATRIX
  - https://techportal.shure.com/en
retrieved_at: 2026-06-18T03:25:32.173Z
last_checked_at: 2026-06-19T07:54:39.014Z
generated_at: 2026-06-19T07:54:39.014Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source; voltage/power specs not in this document; firmware V1 vs V3 differentiation only noted for GET ALL syntax"
  - "no multi-step sequences described explicitly in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility range not stated"
  - "device power specifications not in this document"
  - "error code catalogue beyond < REP ERR > not provided"
  - "connection keepalive / heartbeat behavior not documented"
  - "max concurrent TCP connections not stated"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:54:39.014Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions matched verbatim in source; transport parameters confirmed; complete coverage of source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Shure ANIUSB MATRIX Control Spec

## Summary
The Shure ANIUSB-MATRIX is an audio network interface / matrix mixer for Dante, analog, and USB audio routing, controlled via Ethernet (TCP/IP) using ASCII command strings. This spec covers the command-string protocol: GET/SET/REP/SAMPLE message types, channel-scoped audio gain/mute, matrix mixer routing/gain, presets, PEQ, metering, and call-status features.

<!-- UNRESOLVED: firmware compatibility range not stated in source; voltage/power specs not in this document; firmware V1 vs V3 differentiation only noted for GET ALL syntax -->

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
# - powerable    # not present - device has no power on/off command (reboot only)
# - routable     # inferred: matrix mixer routing + audio route presets present
- routable      # inferred from MATRIX_MXR_ROUTE / PRESET_AUDIO_ROUTE commands
- queryable     # inferred from GET command examples
- levelable     # inferred from AUDIO_GAIN_HI_RES / MATRIX_MXR_GAIN commands
```

## Actions
```yaml
# Channel map (xx in commands): 00=All, 01-04=Dante Inputs, 05=Analog Input,
# 06=USB Input, 07-08=Dante Outputs, 09=Analog Output, 10=USB Output.
# All payloads ASCII, verbatim angle-bracket syntax from source.

- id: get_all_v3
  label: Get All (V3)
  kind: query
  command: "< GET ALL >"
  params: []
  notes: "Use on first power on to view status of all parameters. ANIUSB-MATRIX-V3 firmware."

- id: get_all_v1
  label: Get All (V1 only)
  kind: query
  command: "< GET xx ALL >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number; 00 = all channels (V1 requires channel)"

- id: get_model
  label: Get Model Number
  kind: query
  command: "< GET MODEL >"
  params: []

- id: get_serial_num
  label: Get Serial Number
  kind: query
  command: "< GET SERIAL_NUM >"
  params: []

- id: get_chan_name
  label: Get Channel Name
  kind: query
  command: "< GET xx CHAN_NAME >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []
  notes: "No channel character - applies to entire ANIUSB."

- id: get_fw_ver
  label: Get Firmware Version
  kind: query
  command: "< GET FW_VER >"
  params: []

- id: get_preset
  label: Get Preset
  kind: query
  command: "< GET PRESET >"
  params: []

- id: set_preset
  label: Set Preset
  kind: action
  command: "< SET PRESET nn >"
  params:
    - name: nn
      type: integer
      description: "Preset number 1-10 (leading zero optional on SET)"

- id: get_preset_name
  label: Get Preset Name
  kind: query
  command: "< GET PRESET{n} >"
  params:
    - name: n
      type: integer
      description: "Preset number 1-10"

- id: get_preset_audio_route
  label: Get Preset Audio Route
  kind: query
  command: "< GET PRESET_AUDIO_ROUTE >"
  params: []

- id: set_preset_audio_route
  label: Set Preset Audio Route
  kind: action
  command: "< SET PRESET_AUDIO_ROUTE nn >"
  params:
    - name: nn
      type: integer
      description: "Routing preset number 01-10"

- id: get_audio_gain
  label: Get Audio Gain
  kind: query
  command: "< GET xx AUDIO_GAIN_HI_RES >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  command: "< SET xx AUDIO_GAIN_HI_RES yyyy >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"
    - name: yyyy
      type: integer
      description: "ASCII 0000-1400; steps of one-tenth dB"

- id: inc_audio_gain
  label: Increase Audio Gain by n dB
  kind: action
  command: "< SET xx AUDIO_GAIN_HI_RES INC nn >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"
    - name: nn
      type: integer
      description: "Amount in one-tenth dB; single/double/triple digit"

- id: dec_audio_gain
  label: Decrease Audio Gain by n dB
  kind: action
  command: "< SET xx AUDIO_GAIN_HI_RES DEC nn >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"
    - name: nn
      type: integer
      description: "Amount in one-tenth dB; single/double/triple digit"

- id: get_audio_in_lvl_switch
  label: Get Analog Input Gain Switch
  kind: query
  command: "< GET xx AUDIO_IN_LVL_SWITCH >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 or 05"

- id: set_audio_in_lvl_switch
  label: Set Analog Input Gain Switch
  kind: action
  command: "< SET xx AUDIO_IN_LVL_SWITCH {LINE_LVL|AUX_LVL} >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 or 05"
    - name: state
      type: enum
      description: "LINE_LVL or AUX_LVL"

- id: get_chan_audio_mute
  label: Get Channel Audio Mute
  kind: query
  command: "< GET xx AUDIO_MUTE >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: mute_chan_audio
  label: Mute Channel Audio
  kind: action
  command: "< SET xx AUDIO_MUTE ON >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: unmute_chan_audio
  label: Unmute Channel Audio
  kind: action
  command: "< SET xx AUDIO_MUTE OFF >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: toggle_chan_audio_mute
  label: Toggle Channel Audio Mute
  kind: action
  command: "< SET xx AUDIO_MUTE TOGGLE >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: get_device_audio_mute
  label: Get Device Audio Mute
  kind: query
  command: "< GET DEVICE_AUDIO_MUTE >"
  params: []

- id: set_device_audio_mute
  label: Set Device Audio Mute
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE {ON|OFF|TOGGLE} >"
  params:
    - name: state
      type: enum
      description: "ON, OFF, or TOGGLE"

- id: get_audio_out_lvl_switch
  label: Get Analog Output Gain Switch
  kind: query
  command: "< GET xx AUDIO_OUT_LVL_SWITCH >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 or 09"

- id: set_audio_out_lvl_switch
  label: Set Analog Output Gain Switch
  kind: action
  command: "< SET xx AUDIO_OUT_LVL_SWITCH {LINE_LVL|AUX_LVL|MIC_LVL} >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 or 09"
    - name: state
      type: enum
      description: "LINE_LVL, AUX_LVL, or MIC_LVL"

- id: flash_on
  label: Flash Lights On
  kind: action
  command: "< SET FLASH ON >"
  params: []
  notes: "Flash auto-off after 30 seconds."

- id: flash_off
  label: Flash Lights Off
  kind: action
  command: "< SET FLASH OFF >"
  params: []

- id: metering_on
  label: Turn Metering On
  kind: action
  command: "< SET METER_RATE sssss >"
  params:
    - name: sssss
      type: integer
      description: "Milliseconds 00100-99999; 00000 = off; 00001-00099 invalid (REP ERR)"

- id: metering_off
  label: Stop Metering
  kind: action
  command: "< SET METER_RATE 0 >"
  params: []

- id: get_led_brightness
  label: Get LED Brightness
  kind: query
  command: "< GET LED_BRIGHTNESS >"
  params: []

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "< SET LED_BRIGHTNESS n >"
  params:
    - name: n
      type: enum
      description: "0=LED disabled, 1=LED dim, 2=LED default"

- id: get_audio_out_clip_indicator
  label: Get Audio Clip Indicator
  kind: query
  command: "< GET xx AUDIO_OUT_CLIP_INDICATOR >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number 00 through 10"

- id: get_ip_addr_net_audio_primary
  label: Get Audio IP Address
  kind: query
  command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
  params: []

- id: get_ip_subnet_net_audio_primary
  label: Get Audio Subnet Address
  kind: query
  command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
  params: []

- id: get_ip_gateway_net_audio_primary
  label: Get Audio Gateway Address
  kind: query
  command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
  params: []

- id: get_limiter_engaged
  label: Get Limiter Status
  kind: query
  command: "< GET xx LIMITER_ENGAGED >"
  params:
    - name: xx
      type: string
      description: "ASCII OUTPUT channel number 07 through 10"

- id: get_encryption_ch
  label: Get Encryption Status
  kind: query
  command: "< GET xx ENCRYPTION_CH >"
  params:
    - name: xx
      type: string
      description: "ASCII channel number"

- id: reboot
  label: Reboot ANIUSB
  kind: action
  command: "< SET REBOOT >"
  params: []

- id: get_peq_filter_enable
  label: Get PEQ Filter Enable
  kind: query
  command: "< GET xx PEQ yy >"
  params:
    - name: xx
      type: string
      description: "PEQ block 07 or 10; 00 = all blocks"
    - name: yy
      type: string
      description: "PEQ filter 01-04 within block; 00 = all filters"

- id: set_peq_filter_enable
  label: Set PEQ Filter Enable
  kind: action
  command: "< SET xx PEQ yy {ON|OFF} >"
  params:
    - name: xx
      type: string
      description: "PEQ block 07 or 10; 00 = all blocks"
    - name: yy
      type: string
      description: "PEQ filter 01-04 within block; 00 = all filters"
    - name: state
      type: enum
      description: "ON or OFF"

- id: get_input_meter_mode
  label: Get Input Meter Display Mode
  kind: query
  command: "< GET INPUT_METER_MODE >"
  params: []

- id: set_input_meter_mode
  label: Set Input Meter Display Mode
  kind: action
  command: "< SET INPUT_METER_MODE {PRE_FADER|POST_FADER} >"
  params:
    - name: state
      type: enum
      description: "PRE_FADER or POST_FADER"

- id: get_output_meter_mode
  label: Get Output Meter Display Mode
  kind: query
  command: "< GET OUTPUT_METER_MODE >"
  params: []

- id: set_output_meter_mode
  label: Set Output Meter Display Mode
  kind: action
  command: "< SET OUTPUT_METER_MODE {PRE_FADER|POST_FADER} >"
  params:
    - name: state
      type: enum
      description: "PRE_FADER or POST_FADER"

- id: get_usb_connect
  label: Get USB Connection Status
  kind: query
  command: "< GET USB_CONNECT >"
  params: []

- id: get_matrix_mxr_route
  label: Get Matrix Mixer Routing
  kind: query
  command: "< GET xx MATRIX_MXR_ROUTE yy >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"

- id: set_matrix_mxr_route
  label: Set Matrix Mixer Routing
  kind: action
  command: "< SET xx MATRIX_MXR_ROUTE yy {ON|OFF} >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"
    - name: state
      type: enum
      description: "ON or OFF"

- id: get_matrix_mxr_gain
  label: Get Matrix Mixer Gain
  kind: query
  command: "< GET xx MATRIX_MXR_GAIN yy >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"

- id: set_matrix_mxr_gain
  label: Set Matrix Mixer Gain
  kind: action
  command: "< SET xx MATRIX_MXR_GAIN yy zzzz >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"
    - name: zzzz
      type: integer
      description: "ASCII 0000-1400; steps of one-tenth dB"

- id: inc_matrix_mxr_gain
  label: Increment Matrix Mixer Gain
  kind: action
  command: "< SET xx MATRIX_MXR_GAIN yy INC nn >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"
    - name: nn
      type: integer
      description: "Steps of one-tenth dB"

- id: dec_matrix_mxr_gain
  label: Decrement Matrix Mixer Gain
  kind: action
  command: "< SET xx MATRIX_MXR_GAIN yy DEC nn >"
  params:
    - name: xx
      type: string
      description: "INPUT channel number 00-06"
    - name: yy
      type: string
      description: "OUTPUT channel number 00 or 07-10"
    - name: nn
      type: integer
      description: "Steps of one-tenth dB"

- id: get_logic_mute
  label: Get Logic Mute
  kind: query
  command: "< GET LOGIC_MUTE >"
  params: []

- id: set_logic_mute
  label: Set Logic Mute
  kind: action
  command: "< SET LOGIC_MUTE sts >"
  params:
    - name: sts
      type: enum
      description: "ON (muted) or OFF (unmuted) - system mute sync state"

- id: get_onhook_enable
  label: Get Call Status Enable
  kind: query
  command: "< GET ONHOOK_ENABLE >"
  params: []

- id: set_onhook_enable
  label: Enable or Disable Call Status
  kind: action
  command: "< SET ONHOOK_ENABLE state >"
  params:
    - name: state
      type: enum
      description: "ON or OFF - enables/disables Call status feature"

- id: get_onhook_state
  label: Report Call Status State
  kind: query
  command: "< GET ONHOOK_STATE >"
  params: []
```

## Feedbacks
```yaml
# REP messages - ANIUSB replies to GET/SET and broadcasts on GUI/local change.
- id: rep_model
  type: string
  values: []
  notes: "< REP MODEL {yyyy...} > - 32 chars"

- id: rep_serial_num
  type: string
  values: []
  notes: "< REP SERIAL_NUM {yyyy...} > - 32 chars"

- id: rep_chan_name
  type: string
  values: []
  notes: "< REP xx CHAN_NAME {yyyy...} > - 31 chars"

- id: rep_device_id
  type: string
  values: []
  notes: "< REP DEVICE_ID {yyyy...} > - 31 chars"

- id: rep_fw_ver
  type: string
  values: []
  notes: "< REP FW_VER {yyyy...} > - 18 chars"

- id: rep_preset
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  notes: "< REP PRESET nn > - 01-10 active; 0 = none"

- id: rep_preset_name
  type: string
  values: []
  notes: "< REP PRESET{n} {yyyy...} > - 25 chars"

- id: rep_preset_audio_route
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  notes: "< REP PRESET_AUDIO_ROUTE nn > - active routing preset 01-10; 0 = none"

- id: rep_audio_gain
  type: integer
  values: []
  notes: "< REP xx AUDIO_GAIN_HI_RES yyyy > - 0000-1400 (0.1 dB steps)"

- id: rep_audio_in_lvl_switch
  type: enum
  values: [LINE_LVL, AUX_LVL]

- id: rep_chan_audio_mute
  type: enum
  values: [ON, OFF]

- id: rep_device_audio_mute
  type: enum
  values: [ON, OFF]

- id: rep_audio_out_lvl_switch
  type: enum
  values: [LINE_LVL, AUX_LVL, MIC_LVL]

- id: rep_flash
  type: enum
  values: [ON, OFF]

- id: rep_meter_rate
  type: integer
  values: []
  notes: "< REP METER_RATE sssss > - 00000-99999 ms; 00000 = off"

- id: rep_led_brightness
  type: enum
  values: ["0", "1", "2"]
  notes: "0=disabled, 1=dim, 2=default"

- id: rep_audio_out_clip_indicator
  type: enum
  values: [ON, OFF]

- id: rep_ip_addr_net_audio_primary
  type: string
  values: []
  notes: "15-char IP address"

- id: rep_ip_subnet_net_audio_primary
  type: string
  values: []
  notes: "15-char subnet address"

- id: rep_ip_gateway_net_audio_primary
  type: string
  values: []
  notes: "15-char gateway address"

- id: rep_limiter_engaged
  type: enum
  values: [ON, OFF]

- id: rep_encryption_ch
  type: enum
  values: [ON, OFF]

- id: rep_reboot
  type: string
  values: []
  notes: "< REP REBOOT >"

- id: rep_peq_filter_enable
  type: enum
  values: [ON, OFF]

- id: rep_input_meter_mode
  type: enum
  values: [PRE_FADER, POST_FADER]

- id: rep_output_meter_mode
  type: enum
  values: [PRE_FADER, POST_FADER]

- id: rep_usb_connect
  type: enum
  values: [ON, OFF]

- id: rep_matrix_mxr_route
  type: enum
  values: [ON, OFF]

- id: rep_matrix_mxr_gain
  type: integer
  values: []
  notes: "< REP xx MATRIX_MXR_GAIN yy zzzz > - 0000-1400 (0.1 dB steps)"

- id: rep_logic_mute
  type: enum
  values: [ON, OFF]

- id: rep_onhook_enable
  type: enum
  values: [ON, OFF]

- id: rep_onhook_state
  type: enum
  values: [ONHOOK, OFFHOOK]
  notes: "ONHOOK = not in call, OFFHOOK = in call; always OFFHOOK when Call status disabled"

- id: rep_err
  type: string
  values: []
  notes: "< REP ERR > - sent on invalid command (e.g. empty preset load, METER_RATE 00001-00099)"
```

## Variables
```yaml
- id: audio_gain
  description: "Per-channel audio gain (0.1 dB steps, 0000-1400)"
  unit: "0.1 dB"

- id: matrix_mxr_gain
  description: "Per input/output matrix mixer crosspoint gain (0.1 dB steps, 0000-1400)"
  unit: "0.1 dB"

- id: meter_rate
  description: "Audio metering sample interval in milliseconds"
  unit: "ms"
```

## Events
```yaml
# REP messages broadcast unsolicited when parameters change on the ANIUSB or via GUI:
# any REP listed in Feedbacks may arrive unprompted. Specifically documented:
# "Most parameters will send a REPORT command when they change."
- id: unsolicited_rep
  description: "REP string broadcast when a parameter changes locally or via GUI; no need to constantly poll"
  payload_format: "< REP ... >"

- id: sample
  description: "Audio level meter sample, sent at configured METER_RATE interval"
  payload_format: "< SAMPLE aaa bbb ccc ddd eee fff ggg hhh iii jjj >"
  notes: "Each value 000-060 representing -60 to 0 dBFS for channels 1-10"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. REBOOT command exists but no sequencing
# caution stated in source.
```

## Notes
- Control system is AMX, Crestron, or Extron; select "Client" mode in the AMX/Crestron program.
- All messages and level/gain indicators are ASCII (not binary).
- Channel numbering: `00` = all channels, `01-04` = Dante Inputs, `05` = Analog Input, `06` = USB Input, `07-08` = Dante Outputs, `09` = Analog Output, `10` = USB Output.
- Two firmware families in field: V1 uses `< GET xx ALL >` (channel required), V3 uses `< GET ALL >`.
- METER_RATE values 00001-00099 are invalid and return `< REP ERR >`.
- SET PRESET with leading zero is optional; GET/REP PRESET always uses 01-10 (0 = none active).
- Flash auto-disables after 30 seconds.
- Limiters only on output channels 07-10; PEQ only on blocks 07 and 10.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: device power specifications not in this document -->
<!-- UNRESOLVED: error code catalogue beyond < REP ERR > not provided -->
<!-- UNRESOLVED: connection keepalive / heartbeat behavior not documented -->
<!-- UNRESOLVED: max concurrent TCP connections not stated -->

## Provenance

```yaml
source_domains:
  - shure.com
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/ANIUSB-Matrix
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/ANIUSB-MATRIX/en-US
  - https://www.shure.com/en-US/docs/commandstrings/ANIUSB-MATRIX
  - https://techportal.shure.com/en
retrieved_at: 2026-06-18T03:25:32.173Z
last_checked_at: 2026-06-19T07:54:39.014Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:54:39.014Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions matched verbatim in source; transport parameters confirmed; complete coverage of source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source; voltage/power specs not in this document; firmware V1 vs V3 differentiation only noted for GET ALL syntax"
- "no multi-step sequences described explicitly in source"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility range not stated"
- "device power specifications not in this document"
- "error code catalogue beyond < REP ERR > not provided"
- "connection keepalive / heartbeat behavior not documented"
- "max concurrent TCP connections not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
