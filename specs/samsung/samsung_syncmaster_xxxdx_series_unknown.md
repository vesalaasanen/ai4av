---
spec_id: admin/samsung-syncmaster-xxxdx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SyncMaster xxxDX Series Control Spec"
manufacturer: Samsung
model_family: "SyncMaster 42TS"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "SyncMaster 42TS"
    - "SyncMaster 42PS"
    - "SyncMaster P50Hn"
    - "SyncMaster P50F"
    - "SyncMaster P50Fn"
    - "SyncMaster P63F"
    - "SyncMaster P63Fn"
    - "SyncMaster 320MX"
    - "SyncMaster 320MXn"
    - "SyncMaster 400CX"
    - "SyncMaster 400CXn"
    - "SyncMaster 400MX"
    - "SyncMaster 400MXn"
    - "SyncMaster 460CX"
    - "SyncMaster 460CXn"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - image-us.samsung.com
  - aca.im
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-05-03T15:30:35.928Z
last_checked_at: 2026-05-18T16:49:10.267Z
generated_at: 2026-05-18T16:49:10.267Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:49:10.267Z
  matched_actions: 61
  action_count: 61
  confidence: high
  summary: "All 61 spec actions match semantic descriptions to documented MDC protocol commands; transport parameters verified against source; complete coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Samsung SyncMaster xxxDX Series Control Spec

## Summary

Samsung SyncMaster MDC (Multiple Display Control) protocol v2.2 for commercial LCD/PDP displays. Binary RS-232 serial protocol with daisy-chain networking support (up to 100 devices). Covers power, input routing, image adjustments, audio, video wall, lamp control, and diagnostic queries.

<!-- UNRESOLVED: protocol version compatibility range not stated beyond v2.2 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from power on/off commands
- queryable    # inferred from status/query commands
- routable     # inferred from input source select commands
- levelable    # inferred from volume/brightness/contrast controls
```

## Actions
```yaml
- id: power_set
  label: Set Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level 0-100"

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Mute Off, 1 = Mute On"

- id: input_source_set
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: "Input source code: 0x14=PC, 0x1E=BNC, 0x18=DVI, 0x0C=AV, 0x04=S-Video, 0x08=Component, 0x20=MagicNet, 0x1F=DVI_VIDEO, 0x30=RF(TV), 0x40=DTV, 0x21=HDMI, 0x22=HDMI_PC"

- id: picture_size_set
  label: Set Picture Size
  kind: action
  params:
    - name: aspect
      type: integer
      description: "Aspect ratio code (varies by input source)"

- id: screen_mode_set
  label: Set Screen Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "Screen mode code: 0x01=16:9, 0x04=Zoom, 0x31=Wide Zoom, 0x0B=4:3"

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "Contrast 0-100 (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "Brightness 0-100 (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "Sharpness 0-100, even steps only (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: color_set
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: "Color saturation 0-100 (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "Tint 0-100, NTSC only, even steps only (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: red_gain_set
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "Red gain 0-100 (PC/BNC only)"

- id: green_gain_set
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "Green gain 0-100 (PC/BNC only)"

- id: blue_gain_set
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "Blue gain 0-100 (PC/BNC only)"

- id: red_offset_set
  label: Set Red Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "Red offset 0-100 (PC/BNC, signal balance must be on)"

- id: green_offset_set
  label: Set Green Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "Green offset 0-100 (PC/BNC, signal balance must be on)"

- id: blue_offset_set
  label: Set Blue Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "Blue offset 0-100 (PC/BNC, signal balance must be on)"

- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "Treble 0-100, 40 steps"

- id: bass_set
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "Bass 0-100, 40 steps"

- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "Balance 0-100, 22 steps (L=100-value, R=value)"

- id: coarse_set
  label: Set Coarse
  kind: action
  params:
    - name: direction
      type: integer
      description: "0 = Decrease, 1 = Increase (PC/BNC only)"

- id: fine_set
  label: Set Fine
  kind: action
  params:
    - name: direction
      type: integer
      description: "0 = Decrease, 1 = Increase (PC/BNC only)"

- id: h_position_set
  label: Set Horizontal Position
  kind: action
  params:
    - name: direction
      type: integer
      description: "0 = Left, 1 = Right (PC/BNC only)"

- id: v_position_set
  label: Set Vertical Position
  kind: action
  params:
    - name: direction
      type: integer
      description: "0 = Up, 1 = Down (PC/BNC only)"

- id: clear_menu
  label: Clear Menu
  kind: action
  params: []

- id: remote_set
  label: Set Remote Control Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = IR Disable, 1 = IR Enable"

- id: rgb_contrast_set
  label: Set RGB Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "RGB contrast 0-100 (PC/BNC/DVI)"

- id: rgb_brightness_set
  label: Set RGB Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "RGB brightness 0-100 (PC/BNC/DVI)"

- id: auto_adjustment
  label: Trigger Auto Adjustment
  kind: action
  params: []

- id: color_tone_set
  label: Set Color Tone
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Cool2, 1=Cool1, 2=Normal, 3=Warm1, 4=Warm2, 0x50=Off (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: "Color temperature 0-10 (only when Color Tone is Off)"

- id: pixel_shift_set
  label: Set Pixel Shift
  kind: action
  params:
    - name: enable
      type: integer
      description: "0 = Off, 1 = On"
    - name: h_dot
      type: integer
      description: "Horizontal dot shift 0-4"
    - name: v_line
      type: integer
      description: "Vertical line shift 0-4"
    - name: time
      type: integer
      description: "Shift interval 1-4"

- id: video_wall_set
  label: Set Video Wall Position
  kind: action
  params:
    - name: position
      type: integer
      description: "Wall position code encoding grid and cell number"

- id: video_wall_on_set
  label: Set Video Wall On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: video_wall_mode_set
  label: Set Video Wall Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Natural, 1 = Full"

- id: video_wall_user_set
  label: Set Video Wall User Config
  kind: action
  params:
    - name: wall_div
      type: integer
      description: "Wall divider code (H x V grid)"
    - name: wall_sno
      type: integer
      description: "Set number 1-25"

- id: auto_lamp_set
  label: Set Auto Lamp
  kind: action
  params:
    - name: max_hour
      type: integer
      description: "Max time hour 1-12"
    - name: max_minute
      type: integer
      description: "Max time minute 0-59"
    - name: max_ampm
      type: integer
      description: "0 = PM, 1 = AM"
    - name: max_value
      type: integer
      description: "Max lamp value 0-100"
    - name: min_hour
      type: integer
      description: "Min time hour 1-12"
    - name: min_minute
      type: integer
      description: "Min time minute 0-59"
    - name: min_ampm
      type: integer
      description: "0 = PM, 1 = AM"
    - name: min_value
      type: integer
      description: "Min lamp value 0-100, 0xFF=Off"

- id: manual_lamp_set
  label: Set Manual Lamp
  kind: action
  params:
    - name: value
      type: integer
      description: "Lamp value 0-100, 0xFF=Off"

- id: safety_screen_run_set
  label: Run Safety Screen
  kind: action
  params:
    - name: screen_type
      type: integer
      description: "0=Off, 1=Signal Pattern, 2=All White, 3=Scroll, 4=Bar, 6=Eraser"

- id: sbp_timer_set
  label: Set Screen Burn Protection Timer
  kind: action
  params:
    - name: timer
      type: integer
      description: "0=Off, 1=Pattern, 2=All White, 3=Inverse, 4=Bar, 5=Bar & Inverse"
    - name: period
      type: integer
      description: "Period 1-24 hours"
    - name: time
      type: integer
      description: "Duration 1-30 minutes"

- id: safety_lock_set
  label: Set Safety Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: panel_lock_set
  label: Set Panel Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Unlock, 1 = Lock"

- id: osd_set
  label: Set OSD On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "Video: 0x00=Dynamic, 0x01=Standard, 0x02=Movie, 0x03=Custom, 0x50=Off. PC: 0x10=Entertain, 0x11=Internet, 0x12=Text, 0x13=Custom, 0x50=Off"

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0x00=Standard, 0x01=Music, 0x02=Movie, 0x03=Speech, 0x04=Custom"

- id: nr_mode_set
  label: Set Noise Reduction
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On (ATV/DTV/AV/S-Video/Component/HDMI)"

- id: pc_color_tone_set
  label: Set PC Color Tone
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Custom, 1=Cool, 2=Normal, 3=Warm, 0x50=Off (PC/BNC/DVI)"

- id: auto_adjustment_enable_set
  label: Set Auto Adjustment Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable"

- id: all_keys_lock_set
  label: Set All Keys Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Unlock, 1 = Lock (IR + panel)"

- id: srs_tsxt_set
  label: Set SRS TS XT
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: film_mode_set
  label: Set Film Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: signal_balance_set
  label: Set Signal Balance
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On (PC/BNC only)"

- id: sb_gain_set
  label: Set Signal Balance Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "Signal balance gain 0-100 (PC/BNC only)"

- id: sb_sharpness_set
  label: Set Signal Balance Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "Signal balance sharpness 0-100 (PC/BNC only)"

- id: temperature_set
  label: Set Temperature Threshold
  kind: action
  params:
    - name: value
      type: integer
      description: "Temperature threshold 45-125 C"

- id: brightness_sensor_set
  label: Set Brightness Sensor
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: dynamic_contrast_set
  label: Set Dynamic Contrast
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On (ATV/DTV/AV/S-Video/Component/HDMI only)"

- id: time_set
  label: Set Clock
  kind: action
  params:
    - name: ampm
      type: integer
      description: "1 = AM, 0 = PM"
    - name: hour
      type: integer
      description: "Hour 1-12"
    - name: minute
      type: integer
      description: "Minute 0-59"

- id: on_timer_set
  label: Set On Timer
  kind: action
  params:
    - name: ampm
      type: integer
      description: "1 = AM, 0 = PM"
    - name: hour
      type: integer
      description: "Hour 1-12"
    - name: minute
      type: integer
      description: "Minute 0-59"
    - name: volume
      type: integer
      description: "Power-on volume 0-100"
    - name: enabled
      type: integer
      description: "0 = Off, 1 = On"

- id: off_timer_set
  label: Set Off Timer
  kind: action
  params:
    - name: ampm
      type: integer
      description: "1 = AM, 0 = PM"
    - name: hour
      type: integer
      description: "Hour 1-12"
    - name: minute
      type: integer
      description: "Minute 0-59"
    - name: enabled
      type: integer
      description: "0 = Off, 1 = On"

- id: channel_set
  label: Set Channel
  kind: action
  params:
    - name: country
      type: integer
      description: "Country code (0=Korea, 1=USA, ...)"
    - name: atv_dtv
      type: integer
      description: "0 = Analog, 1 = Digital"
    - name: air_cable
      type: integer
      description: "0 = Air, 1 = Cable"
    - name: channel
      type: integer
      description: "Analog 1-135, Digital 0-999"
    - name: sel_minor
      type: integer
      description: "0 = no minor, 1 = minor selected"
    - name: minor_ch
      type: integer
      description: "Minor channel 0-999 (DTV only)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["off", "on"]

- id: volume_level
  type: integer
  values: "0-100"

- id: mute_state
  type: enum
  values: ["off", "on"]

- id: input_source
  type: enum
  values: [PC, BNC, DVI, AV, S-Video, Component, MagicNet, DVI_VIDEO, RF_TV, DTV, HDMI, HDMI_PC]

- id: picture_size
  type: integer

- id: contrast
  type: integer
  values: "0-100"

- id: brightness
  type: integer
  values: "0-100"

- id: sharpness
  type: integer
  values: "0-100"

- id: color
  type: integer
  values: "0-100"

- id: tint
  type: integer
  values: "0-100"

- id: color_tone
  type: enum
  values: [Cool2, Cool1, Normal, Warm1, Warm2, Off]

- id: color_temperature
  type: integer
  values: "0-10"

- id: screen_size
  type: integer
  values: "0-255 (inches)"

- id: pixel_shift
  type: composite
  values: "enable, h_dot, v_line, time"

- id: video_wall
  type: integer

- id: video_wall_mode
  type: enum
  values: [Natural, Full]

- id: video_wall_on
  type: enum
  values: ["off", "on"]

- id: lamp_error
  type: enum
  values: [Normal, Error]

- id: temperature_error
  type: enum
  values: [Normal, Error]

- id: brightness_sensor_error
  type: enum
  values: [Normal, Error]

- id: sync_error
  type: enum
  values: [Normal, Error, NoSync]

- id: current_temperature
  type: integer

- id: fan_error
  type: enum
  values: [Normal, Error]

- id: panel_on_time
  type: integer

- id: serial_number
  type: string

- id: software_version
  type: string

- id: model_number
  type: composite
  values: "species (panel type), model code, tv_support"

- id: model_name
  type: string

- id: maintenance_status
  type: composite
  values: "power, screen_size, source, auto_lamp_config, manual_lamp, safety_screen, video_wall_config"

- id: audio_status
  type: composite
  values: "treble, bass, balance"

- id: video_status
  type: composite
  values: "contrast, brightness, sharpness, color, tint, color_tone, color_temp"

- id: rgb_status
  type: composite
  values: "contrast, brightness, color_tone, color_temp, red_gain, green_gain, blue_gain"

- id: remote_status
  type: enum
  values: ["disable", "enable"]

- id: safety_lock
  type: enum
  values: ["off", "on"]

- id: panel_lock
  type: enum
  values: ["unlock", "lock"]

- id: osd_status
  type: enum
  values: ["off", "on"]

- id: picture_mode
  type: integer

- id: sound_mode
  type: integer

- id: nr_mode
  type: enum
  values: ["off", "on"]

- id: dynamic_contrast
  type: enum
  values: ["off", "on"]

- id: brightness_sensor
  type: enum
  values: ["off", "on"]

- id: clock
  type: composite
  values: "ampm, hour, minute"

- id: on_timer
  type: composite
  values: "ampm, hour, minute, volume, enabled, source"

- id: off_timer
  type: composite
  values: "ampm, hour, minute, enabled"
```

## Variables
```yaml
# All continuous-range settable values are represented as actions with params above.
# No additional variables beyond those covered by Actions and Feedbacks.
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are ACK/NAK to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: safety lock (0x5D) and panel lock (0x5F) operate regardless of power state.
# Pixel shift cannot operate when Video Wall is on or Zoom is set.
# Video Wall controls do not operate in MagicNet mode.
# Never infer additional safety requirements - source does not describe interlock sequences.
```

## Notes

Binary RS-232 protocol. Frame format: `[Header 0xAA][Command][ID][Data Length][Data...][Checksum]`.

- ID 0 is encoded as 0xFF. Broadcast to all devices uses ID 0xFE (no ACK response).
- Checksum is sum of all bytes excluding header, modulo 256 (discard overflow digit).
- ACK format: `[0xAA][0xFF][ID][Data Length]['A'][r-CMD][Data...][Checksum]`.
- NAK format: `[0xAA][0xFF][ID][3]['N'][r-CMD][ERR][Checksum]`. ERR 0=checksum error, 1=other.
- Max cable distance: 4m. Daisy-chain via RS232-In (9-pin) to RS232-Out.
- Some controls are input-source-dependent (e.g., contrast/brightness split into video vs RGB paths).
- Sharpness steps: even values only (0,2,4..100). Treble/Bass: 40 steps. Balance: 22 steps.
- Video Wall must be off to control Picture Size and Screen Mode.

<!-- UNRESOLVED: exact pinout beyond pins 2(TxD), 3(RxD), 5(GND) not stated -->
<!-- UNRESOLVED: whether DTR/RTS handshaking is required for some models -->
<!-- UNRESOLVED: maximum daisy-chain length beyond 4m cable limit -->

## Provenance

```yaml
source_domains:
  - image-us.samsung.com
  - aca.im
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-05-03T15:30:35.928Z
last_checked_at: 2026-05-18T16:49:10.267Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:49:10.267Z
matched_actions: 61
action_count: 61
confidence: high
summary: "All 61 spec actions match semantic descriptions to documented MDC protocol commands; transport parameters verified against source; complete coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
