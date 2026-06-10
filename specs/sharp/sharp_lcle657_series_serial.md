---
spec_id: admin/sharp-lcle657-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE657 Series Control Spec"
manufacturer: Sharp
model_family: "LCLE657 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCLE657 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:56:26.879Z
last_checked_at: 2026-06-10T01:47:01.321Z
generated_at: 2026-06-10T01:47:01.321Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full VCP command table in section 8 references many OP codes; only the most commonly used for control are listed in Actions/Feedbacks below"
  - "firmware version compatibility not stated"
  - "no explicit multi-step macro sequences defined in source beyond the"
  - "source mentions thermal management (VCP-11-ED warning, VCP-10-8A shutdown)"
  - "complete VCP table in section 8 has many additional OP codes not enumerated above (H/V resolution, color enhance, HDR mode, caption settings, CEC sub-commands, etc.)"
  - "TV tuner commands (*1) may not be available on all models"
  - "E328 model does not support Local Dimming (*3)"
  - "flow_control value not explicitly stated in source; set to none as common default for RS-232C display control"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:47:01.321Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 action units matched source VCP or CTL codes with correct shapes; all remaining source commands (query CTL codes, settable VCP-only-in-Variables) are represented in spec Feedbacks or Variables; transport verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCLE657 Series Control Spec

## Summary

Sharp LCLE657 Series LCD monitor with RS-232C and LAN (TCP/IP) external control. Binary packet protocol with ASCII-encoded hex payload, XOR block check code, and SOH/STX/ETX framing. Supports VCP (Get/Set parameter by OP code page + OP code) and CTL (command) message types for power control, input selection, picture/audio adjustments, and diagnostic reads.

<!-- UNRESOLVED: full VCP command table in section 8 references many OP codes; only the most commonly used for control are listed in Actions/Feedbacks below -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # CTL-C203-D6 power control (ON/OFF)
  - queryable    # VCP Get parameter + power status read
  - levelable    # backlight, contrast, sharpness, color, tint, balance, volume, etc.
  - routable     # VCP-00-60 input select (VGA, AV, HDMI1-3, MP, Tuner)
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    description: "CTL-C203-D6: set power mode ON (0001h)"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    description: "CTL-C203-D6: set power mode OFF (0004h)"
    params: []

  - id: save_current_settings
    label: Save Current Settings
    kind: action
    description: "CTL-0C: store all adjusted values to non-volatile memory"
    params: []

  - id: input_select
    label: Select Input
    kind: action
    description: "VCP-00-60 (Set parameter): select video input source"
    params:
      - name: source
        type: enum
        values:
          - VGA  # 0001h
          - AV  # 0005h
          - Tuner  # 0009h
          - VGA_YPbPr  # 000Ch
          - HDMI1  # 0011h
          - HDMI2  # 0012h
          - HDMI3  # 0082h
          - Media_Player  # 0087h
        description: "Input source (hex value as 16-bit ASCII-encoded)"

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    description: "VCP-02-1A"
    params:
      - name: mode
        type: enum
        values: [HighBright, Standard, Custom, Dynamic, Energy_Savings, HDR_Video, Conferencing]

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    description: "VCP-02-70"
    params:
      - name: mode
        type: enum
        values: [NORMAL, FULL, ZOOM, "1:1"]

  - id: set_backlight
    label: Set Backlight
    kind: action
    description: "VCP-00-10: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_contrast
    label: Set Contrast
    kind: action
    description: "VCP-00-12: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    description: "VCP-00-87: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_color
    label: Set Color
    kind: action
    description: "VCP-00-8A: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_tint
    label: Set Tint
    kind: action
    description: "VCP-00-90: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    description: "VCP-00-0C: Warm(0023h), Normal(003Fh), Cool(005Ah)"
    params:
      - name: value
        type: enum
        values: [Warm, Normal, Cool]

  - id: set_overscan
    label: Set Overscan
    kind: action
    description: "VCP-02-E3"
    params:
      - name: mode
        type: enum
        values: [Off, On, Auto]

  - id: set_dimming
    label: Set Dimming Setting
    kind: action
    description: "VCP-11-4E"
    params:
      - name: mode
        type: enum
        values: [OFF, Dynamic_Backlight, Local_Dimming]

  - id: set_noise_reduction
    label: Set Noise Reduction
    kind: action
    description: "VCP-02-20"
    params:
      - name: level
        type: enum
        values: [OFF, Low, Mid, High]

  - id: set_gamma
    label: Set Gamma
    kind: action
    description: "VCP-02-68"
    params:
      - name: mode
        type: enum
        values: [Native, "2.2", "2.4", HDR_Hybrid_Log, HDR_ST2084_PQ]

  - id: set_sound_mode
    label: Set Sound Mode
    kind: action
    description: "VCP-10-B2"
    params:
      - name: mode
        type: enum
        values: [Standard, Movie, Music, Custom]

  - id: set_balance
    label: Set Balance
    kind: action
    description: "VCP-00-93: range 0000h-0064h (Left to Right)"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_surround
    label: Set Surround
    kind: action
    description: "VCP-02-34"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_mute
    label: Set Mute
    kind: action
    description: "VCP-11-E9"
    params:
      - name: mode
        type: enum
        values: [Audio, Video, Audio_and_Video]

  - id: set_key_lock
    label: Set Key Lock
    kind: action
    description: "VCP-00-FB"
    params:
      - name: mode
        type: enum
        values: [Off, Mode2, Mode1]

  - id: set_ir_lock
    label: Set IR Lock
    kind: action
    description: "VCP-02-3F"
    params:
      - name: mode
        type: enum
        values: [Off, Mode2, Mode1]

  - id: set_cec
    label: Set CEC
    kind: action
    description: "VCP-11-76"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_edid
    label: Set EDID Mode
    kind: action
    description: "VCP-10-AA"
    params:
      - name: mode
        type: enum
        values: [Mode_0, Mode_1, Mode_2]

  - id: set_video_range
    label: Set HDMI Video Range
    kind: action
    description: "VCP-10-40"
    params:
      - name: mode
        type: enum
        values: [Expanded_Signal, Raw_Signal, Auto]

  - id: set_language
    label: Set OSD Language
    kind: action
    description: "VCP-00-68"
    params:
      - name: language
        type: enum
        values: [English, Deutsch, Francais, Espanol]

  - id: set_monitor_id
    label: Set Monitor ID
    kind: action
    description: "VCP-02-3E: range 0001h-0064h"
    params:
      - name: id
        type: integer
        min: 1
        max: 100

  - id: factory_reset
    label: Factory Reset
    kind: action
    description: "VCP-02-CB with value 0001h (All)"
    params: []

  - id: send_remote_code
    label: Send Remote Control Code
    kind: action
    description: "CTL-C210: emulate IR remote via RS-232C"
    params:
      - name: code
        type: enum
        values: [PICTURE, ASPECT, SOUND, "1", "2", "3", "4", "5", "6", "7", "8", "9", DASH, "0", INFO, MENU, EXIT, UP, DOWN, LEFT, RIGHT, OK, VOL_UP, VOL_DOWN, CH_UP, CH_DOWN, MUTE, FREEZE, CC, MTS]
      - name: repeat
        type: integer
        description: "Repeat count (D09-10)"

  - id: set_direct_tv_channel
    label: Set Direct TV Channel
    kind: action
    description: "CTL-C22D: write major/minor channel"
    params:
      - name: major_high
        type: integer
      - name: major_low
        type: integer
      - name: minor
        type: integer

  - id: set_input_name
    label: Set Input Label Name
    kind: action
    description: "CTL-CA04-04: write custom label for designated input terminal (max 14 chars)"
    params:
      - name: terminal
        type: enum
        values: [VGA_RGB, AV, Tuner, VGA_YPbPr, HDMI1, HDMI2, HDMI3, Media_Player]
      - name: name
        type: string
        max_length: 14

  - id: reset_input_name
    label: Reset Input Label Name
    kind: action
    description: "CTL-CA04-05: reset label for designated terminal or all terminals"
    params:
      - name: terminal
        type: enum
        values: [All, VGA_RGB, AV, Tuner, VGA_YPbPr, HDMI1, HDMI2, HDMI3, Media_Player]

  - id: set_audio_input
    label: Set Audio Input
    kind: action
    description: "VCP-02-2E"
    params:
      - name: source
        type: enum
        values: [Audio1_AudioIn, Audio2_AV, HDMI1, TV, HDMI2, HDMI3, MP]

  - id: set_quick_start
    label: Set Quick Start
    kind: action
    description: "VCP-11-EA"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_led_indicator
    label: Set LED Indicator
    kind: action
    description: "VCP-02-BE"
    params:
      - name: mode
        type: enum
        values: [On, Off]

  - id: set_internal_speakers
    label: Set Internal Speakers
    kind: action
    description: "VCP-11-BA"
    params:
      - name: mode
        type: enum
        values: [Off, On, Auto]

  - id: set_thermal_shutdown
    label: Set Thermal Shutdown
    kind: action
    description: "VCP-10-8A"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_power_supply
    label: Set Power Supply
    kind: action
    description: "VCP-11-75"
    params:
      - name: mode
        type: enum
        values: [On, Off]

  - id: set_adaptive_contrast
    label: Set Adaptive Contrast
    kind: action
    description: "VCP-02-8D"
    params:
      - name: mode
        type: enum
        values: [Off, Low, Mid, High]
  - id: set_color_preset
    label: Set Color Temperature Preset
    kind: action
    description: "VCP-00-14: color temperature preset"
    params:
      - name: mode
        type: enum
        values: [Native, Custom]

  - id: set_red_gain
    label: Set Red Gain
    kind: action
    description: "VCP-00-16: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_green_gain
    label: Set Green Gain
    kind: action
    description: "VCP-00-18: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_blue_gain
    label: Set Blue Gain
    kind: action
    description: "VCP-00-1A: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_ambient_light_sensing
    label: Set Ambient Light Sensing
    kind: action
    description: "VCP-10-C8"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_color_enhance
    label: Set Color Enhance
    kind: action
    description: "VCP-11-EC"
    params:
      - name: mode
        type: enum
        values: [Off, Vivid, Wide]

  - id: set_hdr_mode
    label: Set HDR Mode
    kind: action
    description: "VCP-11-E5"
    params:
      - name: mode
        type: enum
        values: [Low, Mid, High]

  - id: set_noise_reduction_detail
    label: Set Noise Reduction Detail
    kind: action
    description: "VCP-02-26"
    params:
      - name: level
        type: enum
        values: [OFF, Low, Mid, High]

  - id: set_sharpness_detail
    label: Set Sharpness Detail
    kind: action
    description: "VCP-00-8C: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_color_saturation
    label: Set Color Saturation
    kind: action
    description: "VCP-02-1F: range 0000h-0064h"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: reset_category
    label: Reset Settings Category
    kind: action
    description: "VCP-02-CB: reset specific settings category"
    params:
      - name: category
        type: enum
        values: [Picture, Adjust, Audio, Network]

  - id: reset_audio
    label: Reset Audio Settings
    kind: action
    description: "VCP-02-31: reset audio to default (0001h)"
    params: []

  - id: set_caption_display
    label: Set Caption Display
    kind: action
    description: "VCP-10-84: closed caption or text channel"
    params:
      - name: mode
        type: enum
        values: [Off, CC1, CC2, CC3, CC4, Text1, Text2, Text3, Text4]

  - id: set_digital_captions
    label: Set Digital Captions
    kind: action
    description: "VCP-10-A1: digital caption service selection"
    params:
      - name: service
        type: enum
        values: [Off, CS1, CS2, CS3, CS4, CS5, CS6]

  - id: set_auto_input_change
    label: Set Auto Input Change
    kind: action
    description: "VCP-02-40: auto input change mode"
    params:
      - name: mode
        type: enum
        values: [First, None, Custom]

  - id: set_auto_input_priority
    label: Set Auto Input Priority
    kind: action
    description: "VCP-10-2E/2F/30: input source for priority slot (slot_1=2E, slot_2=2F, slot_3=30)"
    params:
      - name: slot
        type: enum
        values: [slot_1, slot_2, slot_3]
      - name: source
        type: enum
        values: [VGA, AV, VGA_YPbPr, HDMI1, HDMI2, HDMI3]

  - id: set_cec_auto_turn_off
    label: Set CEC Auto Turn Off
    kind: action
    description: "VCP-11-77"
    params:
      - name: mode
        type: enum
        values: [Disable, Enable]

  - id: set_cec_audio_receiver
    label: Set CEC Audio Receiver
    kind: action
    description: "VCP-11-78"
    params:
      - name: mode
        type: enum
        values: [Disable, Enable]

  - id: set_cec_device_list
    label: Set CEC Device List
    kind: action
    description: "VCP-11-79"
    params:
      - name: mode
        type: enum
        values: [NO, YES]

  - id: set_vga_mode
    label: Set VGA Mode
    kind: action
    description: "VCP-10-8E: VGA signal mode"
    params:
      - name: mode
        type: enum
        values: [RGB, YPbPr]

  - id: auto_adjust
    label: Auto Adjust
    kind: action
    description: "VCP-00-1E: execute VGA auto setup (0001h)"
    params: []

  - id: set_control_interface
    label: Set Control Interface
    kind: action
    description: "VCP-10-3E: external control interface selection"
    params:
      - name: mode
        type: enum
        values: [RS_232C, LAN]

  - id: set_information_osd
    label: Set Information OSD
    kind: action
    description: "VCP-02-3D"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_audio_language
    label: Set Audio Language
    kind: action
    description: "VCP-10-B3"
    params:
      - name: language
        type: enum
        values: [English, Francais, Espanol]

  - id: set_audio_source_mts
    label: Set Audio Source MTS
    kind: action
    description: "VCP-02-2C: audio source (MTS) selection"
    params:
      - name: source
        type: enum
        values: [main, sub, main_sub, stereo, mono, dual, SAP]

  - id: set_thermal_warning
    label: Set Thermal Warning
    kind: action
    description: "VCP-11-ED: thermal management warning message"
    params:
      - name: mode
        type: enum
        values: [Off, On]

  - id: set_temperature_sensor
    label: Set Temperature Sensor
    kind: action
    description: "VCP-02-78: select built-in temperature sensor for reading"
    params:
      - name: sensor
        type: integer
        min: 1
        max: 3

  - id: set_h_resolution
    label: Set H Resolution
    kind: action
    description: "VCP-02-50: horizontal resolution (VGA), range 0000h-FFFFh"
    params:
      - name: value
        type: integer
        min: 0
        max: 65535

  - id: set_v_resolution
    label: Set V Resolution
    kind: action
    description: "VCP-02-51: vertical resolution (VGA), range 0000h-FFFFh"
    params:
      - name: value
        type: integer
        min: 0
        max: 65535
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    description: "CTL-01D6: current power mode"
    values: [On, Standby, Reserved, Off]

  - id: power_state_result
    label: Power State Read Result
    type: enum
    values: [No_Error, Unsupported]

  - id: timing_report
    label: Timing Report
    type: object
    description: "CTL-07: horizontal/vertical frequency, sync polarity, stability"
    fields:
      - name: ss
        description: "Timing status: bit7=out of range, bit6=unstable, bit1=H sync polarity, bit0=V sync polarity"
      - name: h_freq
        description: "Horizontal frequency in 0.01kHz units"
      - name: v_freq
        description: "Vertical frequency in 0.01Hz units"

  - id: get_parameter_reply
    label: Get Parameter Reply
    type: object
    description: "VCP Get parameter reply: result, OP code page, OP code, type, max value, current value"
    fields:
      - name: result
        type: enum
        values: [No_Error, Unsupported]
      - name: op_code_page
        type: integer
      - name: op_code
        type: integer
      - name: type
        type: enum
        values: [Set_Parameter, Momentary]
      - name: max_value
        type: integer
      - name: current_value
        type: integer

  - id: serial_number
    label: Serial Number
    type: string
    description: "CTL-C216: device serial number (max 30 chars)"

  - id: model_name
    label: Model Name
    type: string
    description: "CTL-C217: device model name (max 36 chars)"

  - id: mac_address
    label: MAC Address
    type: string
    description: "CTL-C220: MAC address (max 12 hex chars)"

  - id: firmware_version
    label: Firmware Version
    type: string
    description: "CTL-CA02: version string (R + major.period.minor1.minor2.minor3.branch1.branch2)"

  - id: input_name
    label: Input Label Name
    type: string
    description: "CTL-CA04-03: custom label for designated input terminal (max 14 chars)"

  - id: direct_tv_channel
    label: Direct TV Channel
    type: object
    description: "CTL-C22C: current major/minor channel"
    fields:
      - name: major_high
      - name: major_low
      - name: minor

  - id: temperature_sensor
    label: Temperature Sensor Reading
    type: integer
    description: "VCP-02-79: temperature in 0.5 degC units, 2's complement (0032h = +25.0C)"
```

## Variables

```yaml
variables:
  - id: backlight
    label: Backlight
    vcp: "00-10"
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: contrast
    label: Contrast
    vcp: "00-12"
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: sharpness
    label: Sharpness
    vcp: "00-87"
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: color
    label: Color
    vcp: "00-8A"
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: tint
    label: Tint
    vcp: "00-90"
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: video_black_level
    label: Video Black Level
    vcp: "00-92"
    type: integer
    min: 0
    max: 100

  - id: balance
    label: Balance
    vcp: "00-93"
    type: integer
    min: 0
    max: 100

  - id: h_position
    label: H Position (VGA)
    vcp: "00-20"
    type: integer
    min: 0
    max: 100

  - id: v_position
    label: V Position (VGA)
    vcp: "00-30"
    type: integer
    min: 0
    max: 100

  - id: clock
    label: Clock (VGA)
    vcp: "00-0E"
    type: integer
    min: 0
    max: 100

  - id: phase
    label: Phase (VGA)
    vcp: "00-3E"
    type: integer
    min: 0
    max: 100

  - id: audio_delay
    label: Audio Delay
    vcp: "10-CB"
    type: integer
    min: 0
    max: 100

  - id: osd_transparency
    label: OSD Transparency
    vcp: "02-B8"
    type: enum
    values: [Off, "30%", "50%", "70%"]
```

## Events

```yaml
events:
  - id: null_message
    description: >
      Monitor returns NULL message ('BE') on timeout (10s default), unsupported message type,
      BCC error, or during long-running operations (power on/off, auto setup, input change,
      factory reset). Controller must wait and retry.
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source beyond the
# typical procedure examples (backlight change = get → set → save)
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions thermal management (VCP-11-ED warning, VCP-10-8A shutdown)
# but does not specify interlock sequences. Power operations can return NULL during execution.
```

## Notes

- **Packet interval:** Controller must wait >600ms between commands (both RS-232C and LAN).
- **LAN keepalive:** Monitor disconnects TCP after 15 minutes of inactivity; controller must reconnect.
- **Packet structure:** `SOH(01h) + Reserved('0') + Destination + Source('0') + MsgType + MsgLen(2 ASCII) + STX(02h) + Payload + ETX(03h) + BCC(XOR) + CR(0Dh)`.
- **BCC calculation:** XOR of all bytes from Reserved (D1) through ETX (inclusive), result placed before CR delimiter.
- **Byte encoding:** All numeric fields are ASCII-encoded hex (byte 3Ah → chars '3','A').
- **Monitor ID addressing:** Destination byte maps Monitor ID 1-100 to hex addresses 41h-A4h; '*' (2Ah) broadcasts to all monitors in daisy chain. Group IDs A-J map to 31h-3Ah.
- **Reply convention:** In replies, destination is always '0' (controller), source is monitor's own ID.
- **Temperature sensor:** Value is 2's complement in 0.5 degC units. Select sensor via VCP-02-78 (set), read via VCP-02-79 (get).
- **NULL message:** Returned when monitor is busy (power on/off, auto setup, input change). Controller should retry after interval.

<!-- UNRESOLVED: complete VCP table in section 8 has many additional OP codes not enumerated above (H/V resolution, color enhance, HDR mode, caption settings, CEC sub-commands, etc.) -->
<!-- UNRESOLVED: TV tuner commands (*1) may not be available on all models -->
<!-- UNRESOLVED: E328 model does not support Local Dimming (*3) -->
<!-- UNRESOLVED: flow_control value not explicitly stated in source; set to none as common default for RS-232C display control -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:56:26.879Z
last_checked_at: 2026-06-10T01:47:01.321Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:47:01.321Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 action units matched source VCP or CTL codes with correct shapes; all remaining source commands (query CTL codes, settable VCP-only-in-Variables) are represented in spec Feedbacks or Variables; transport verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full VCP command table in section 8 references many OP codes; only the most commonly used for control are listed in Actions/Feedbacks below"
- "firmware version compatibility not stated"
- "no explicit multi-step macro sequences defined in source beyond the"
- "source mentions thermal management (VCP-11-ED warning, VCP-10-8A shutdown)"
- "complete VCP table in section 8 has many additional OP codes not enumerated above (H/V resolution, color enhance, HDR mode, caption settings, CEC sub-commands, etc.)"
- "TV tuner commands (*1) may not be available on all models"
- "E328 model does not support Local Dimming (*3)"
- "flow_control value not explicitly stated in source; set to none as common default for RS-232C display control"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
