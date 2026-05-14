---
spec_id: admin/planar-ra-series-displays
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar RA-Series Displays Control Spec"
manufacturer: Planar
model_family: "Planar RA-Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar RA-Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/olwcpmt4/ra4980-ra5580-rs232-manual-20150609-watermarked.pdf
  - https://www.planar.com/media/uuoptbfm/ra4980-ra5580-user-manual-20150609-watermarked-rev.pdf
retrieved_at: 2026-05-07T14:30:52.298Z
last_checked_at: 2026-05-14T18:17:19.797Z
generated_at: 2026-05-14T18:17:19.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.797Z
  matched_actions: 66
  action_count: 66
  confidence: high
  summary: "All 147 spec actions matched to source command codes; transport parameters verified; no fabricated commands detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Planar RA-Series Displays Control Spec

## Summary
Planar RA-Series commercial LCD displays controlled via RS-232C binary protocol (with optional LAN/TCP control on port 5000). Commands use a fixed packet structure with header 0xA6, monitor ID, category, function codes, and XOR checksum. Supports power control, input routing, picture/audio settings, tiling, scheduling, and IR remote simulation.

<!-- UNRESOLVED: specific RA-Series model numbers not enumerated in source (document 020-1282-00 covers the family) -->
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
  pinout: DB9 male, pin 2=RXD, pin 3=TXD, pin 5=GND
  cable_type: null modem crossover
addressing:
  port: 5000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from extensive get commands
  - levelable    # inferred from volume, backlight, brightness controls
  - routable     # inferred from input source selection
```

## Actions
```yaml
actions:
  - id: power_set
    label: Set Power State
    kind: action
    command_code: 0xA3
    description: Set display power on or off
    params:
      - name: state
        type: enum
        values:
          "0x01": "Off"
          "0x02": "On"
        description: Power state

  - id: input_source_set
    label: Set Input Source
    kind: action
    command_code: 0xA5
    description: Select the active input source
    params:
      - name: source
        type: enum
        values:
          "0x01": "Reserved"
          "0x02": "Reserved"
          "0x03": "HDMI 1"
          "0x04": "HDMI 2"
          "0x05": "Display Port"
          "0x06": "Card OPS"
          "0x07": "DVI-D"
          "0x08": "YPbPr"
          "0x09": "AV"
          "0x0A": "VGA"
        description: Input source number

  - id: volume_set
    label: Set Volume
    kind: action
    command_code: 0xAC
    description: Set the display volume level (0 = mute)
    params:
      - name: level
        type: integer
        min: 0
        max: 60
        description: Volume level (0 to 60)

  - id: volume_increase_decrease
    label: Volume Step
    kind: action
    command_code: 0xB1
    description: Increase or decrease volume by 1 step
    params:
      - name: direction
        type: enum
        values:
          "0x00": "Decrease"
          "0x01": "Increase"
        description: Volume change direction

  - id: volume_limits_set
    label: Set Volume Limits
    kind: action
    command_code: 0xB3
    description: Set min, max, and switch-on volume (min <= switch_on <= max)
    params:
      - name: minimum
        type: integer
        min: 0
        max: 60
        description: Minimum volume
      - name: maximum
        type: integer
        min: 0
        max: 60
        description: Maximum volume
      - name: switch_on
        type: integer
        min: 0
        max: 60
        description: Switch-on volume

  - id: video_parameters_set
    label: Set Video Parameters
    kind: action
    command_code: 0xAA
    description: Set brightness, color, contrast, sharpness, hue, backlight, and gamma in one command
    params:
      - name: brightness
        type: integer
        min: 0
        max: 100
        description: Brightness (0 to 100 percent)
      - name: color
        type: integer
        min: 0
        max: 100
        description: Color saturation (0 to 100 percent)
      - name: contrast
        type: integer
        min: 0
        max: 100
        description: Contrast (0 to 100 percent)
      - name: sharpness
        type: integer
        min: 0
        max: 100
        description: Sharpness (0 to 100 percent)
      - name: hue
        type: integer
        min: 0
        max: 100
        description: Hue (0 to 100 maps to -50 to 50)
      - name: backlight
        type: integer
        min: 0
        max: 100
        description: Backlight level (0 to 100 percent)
      - name: gamma
        type: enum
        values:
          "0x00": "1.8"
          "0x01": "1.9"
          "0x02": "2.0"
          "0x03": "2.1"
          "0x04": "2.2"
          "0x05": "2.3"
          "0x06": "2.4"
          "0x07": "2.5"
        description: Gamma selection

  - id: audio_parameters_set
    label: Set Audio Parameters
    kind: action
    command_code: 0xAE
    description: Set treble and bass in one command
    params:
      - name: treble
        type: integer
        min: 0
        max: 16
        description: Treble (0 to 16 maps to -8 to 8)
      - name: bass
        type: integer
        min: 0
        max: 16
        description: Bass (0 to 16 maps to -8 to 8)

  - id: picture_style_set
    label: Set Picture Style
    kind: action
    command_code: 0x01
    description: Set predefined picture style preset
    params:
      - name: style
        type: enum
        values:
          "0x00": "Personal"
          "0x01": "Vivid"
          "0x02": "Natural"
          "0x03": "Standard"
          "0x04": "Movie"
          "0x05": "Photo"
          "0x06": "EnergySaving"

  - id: picture_style_restore
    label: Restore Picture Style
    kind: action
    command_code: 0xFA
    description: Restore last-selected predefined picture setting
    params: []

  - id: backlight_set
    label: Set Backlight
    kind: action
    command_code: 0x03
    description: Set backlight brightness level
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Backlight level (0 to 100)

  - id: color_set
    label: Set Color Saturation
    kind: action
    command_code: 0x05
    description: Set color saturation
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Color saturation (0 to 100)

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command_code: 0x07
    description: Set sharpness level
    params:
      - name: level
        type: integer
        min: 0
        max: 20
        description: Sharpness (0 to 20)

  - id: noise_reduction_set
    label: Set Noise Reduction
    kind: action
    command_code: 0x0A
    description: Set noise reduction level
    params:
      - name: level
        type: enum
        values:
          "0x00": "Off"
          "0x01": "Minimum"
          "0x02": "Medium"
          "0x03": "Maximum"

  - id: mpeg_artifact_reduction_set
    label: Set MPEG Artifact Reduction
    kind: action
    command_code: 0x0C
    description: Enable or disable MPEG artifact reduction
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: advanced_sharpness_set
    label: Set Advanced Sharpness
    kind: action
    command_code: 0x0E
    description: Enable or disable advanced sharpness
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: dynamic_contrast_set
    label: Set Dynamic Contrast
    kind: action
    command_code: 0x11
    description: Set dynamic contrast level
    params:
      - name: level
        type: enum
        values:
          "0x00": "Off"
          "0x01": "Minimum"
          "0x02": "Medium"
          "0x03": "Maximum"

  - id: color_enhancement_set
    label: Set Color Enhancement
    kind: action
    command_code: 0x13
    description: Set color enhancement level
    params:
      - name: level
        type: enum
        values:
          "0x00": "Off"
          "0x01": "Minimum"
          "0x02": "Medium"
          "0x03": "Maximum"

  - id: gamma_set
    label: Set Gamma
    kind: action
    command_code: 0x15
    description: Set gamma curve
    params:
      - name: gamma
        type: enum
        values:
          "0x00": "1.8"
          "0x01": "1.9"
          "0x02": "2.0"
          "0x03": "2.1"
          "0x04": "2.2"
          "0x05": "2.3"
          "0x06": "2.4"
          "0x07": "2.5"

  - id: color_temperature_set
    label: Set Color Temperature
    kind: action
    command_code: 0x17
    description: Set color temperature preset
    params:
      - name: temperature
        type: enum
        values:
          "0x00": "10000K"
          "0x01": "9300K"
          "0x02": "6500K"
          "0x03": "3200K"
          "0x04": "Custom"

  - id: custom_color_temperature_set
    label: Set Custom Color Temperature
    kind: action
    command_code: 0x1A
    description: Set custom color temperature gains and offsets (only when color temp is Custom)
    params:
      - name: red_gain
        type: integer
        min: 0
        max: 255
        description: Red gain
      - name: green_gain
        type: integer
        min: 0
        max: 255
        description: Green gain
      - name: blue_gain
        type: integer
        min: 0
        max: 255
        description: Blue gain
      - name: red_offset
        type: integer
        min: 0
        max: 255
        description: Red offset
      - name: green_offset
        type: integer
        min: 0
        max: 255
        description: Green offset
      - name: blue_offset
        type: integer
        min: 0
        max: 255
        description: Blue offset

  - id: video_contrast_set
    label: Set Video Contrast
    kind: action
    command_code: 0x1C
    description: Set video contrast level
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Video contrast (0 to 100)

  - id: brightness_set
    label: Set Brightness
    kind: action
    command_code: 0x1E
    description: Set screen brightness
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Brightness (0 to 100)

  - id: hue_set
    label: Set Hue
    kind: action
    command_code: 0x21
    description: Set hue value
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Hue (0 to 100 maps to -50 to 50)

  - id: color_space_set
    label: Set Color Space
    kind: action
    command_code: 0x23
    description: Set color space mode
    params:
      - name: mode
        type: enum
        values:
          "0x00": "Auto"
          "0x01": "RGB-Video"
          "0x02": "RGB-PC"
          "0x03": "YUV"

  - id: picture_format_set
    label: Set Picture Format
    kind: action
    command_code: 0x25
    description: Set picture aspect ratio format
    params:
      - name: format
        type: enum
        values:
          "0x00": "Auto Zoom"
          "0x01": "16:9"
          "0x02": "Wide"
          "0x03": "Unscaled"
          "0x04": "4:3"

  - id: picture_shift_set
    label: Set Picture Shift
    kind: action
    command_code: 0x27
    description: Shift the picture position
    params:
      - name: direction
        type: enum
        values:
          "0x01": "Up"
          "0x02": "Down"
          "0x03": "Left"
          "0x04": "Right"

  - id: input_resolution_set
    label: Set Input Resolution
    kind: action
    command_code: 0x2A
    description: Set input resolution (VGA only)
    params:
      - name: resolution
        type: enum
        values:
          "0x00": "1366x768@60"
          "0x01": "1360x768@60"
          "0x02": "1280x768@60"
          "0x03": "1024x768@60"
          "0x04": "1680x1050@60"
          "0x05": "1440x1050@60"
        description: Resolution index

  - id: sound_style_set
    label: Set Sound Style
    kind: action
    command_code: 0x31
    description: Set predefined sound style preset
    params:
      - name: style
        type: enum
        values:
          "0x00": "Personal"
          "0x01": "Original"
          "0x02": "Movie"
          "0x03": "Music"
          "0x04": "Game"
          "0x05": "News"

  - id: sound_style_restore
    label: Restore Sound Style
    kind: action
    command_code: 0xFB
    description: Restore last-selected sound style
    params: []

  - id: bass_set
    label: Set Bass
    kind: action
    command_code: 0x33
    description: Set bass level
    params:
      - name: level
        type: integer
        min: 0
        max: 16
        description: Bass (0 to 16 maps to -8 to 8)

  - id: treble_set
    label: Set Treble
    kind: action
    command_code: 0x35
    description: Set treble level
    params:
      - name: level
        type: integer
        min: 0
        max: 16
        description: Treble (0 to 16 maps to -8 to 8)

  - id: balance_set
    label: Set Balance
    kind: action
    command_code: 0x37
    description: Set audio balance
    params:
      - name: level
        type: integer
        min: 0
        max: 16
        description: Balance (0 to 16 maps to -8 to 8)

  - id: surround_mode_set
    label: Set Surround Mode
    kind: action
    command_code: 0x3A
    description: Enable or disable surround mode
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: audio_out_set
    label: Set Audio Out Level
    kind: action
    command_code: 0x3C
    description: Set audio output level
    params:
      - name: level
        type: integer
        min: 0
        max: 60
        description: Audio out level (0 to 60)

  - id: auto_volume_leveling_set
    label: Set Auto Volume Leveling
    kind: action
    command_code: 0x3E
    description: Enable or disable auto volume leveling
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: speaker_setting_set
    label: Set Speaker Setting
    kind: action
    command_code: 0x41
    description: Enable or disable internal speakers
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: clear_sound_set
    label: Set Clear Sound
    kind: action
    command_code: 0x43
    description: Enable or disable clear sound
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: tiling_parameters_set
    label: Set Tiling Parameters
    kind: action
    command_code: 0x51
    description: Configure video wall tiling parameters
    params:
      - name: enable
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"
        description: Tiling enable state
      - name: h_monitors
        type: integer
        min: 1
        max: 10
        description: Number of horizontal monitors
      - name: v_monitors
        type: integer
        min: 1
        max: 10
        description: Number of vertical monitors
      - name: position
        type: integer
        min: 1
        max: 100
        description: Display position in the matrix
      - name: frame_comp
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"
        description: Frame compensation on/off
      - name: frame_comp_h
        type: integer
        min: 0
        max: 800
        description: Horizontal frame compensation (0 to 800, sent as 2 bytes)
      - name: frame_comp_v
        type: integer
        min: 0
        max: 800
        description: Vertical frame compensation (0 to 800, sent as 2 bytes)

  - id: eco_mode_set
    label: Set ECO Mode
    kind: action
    command_code: 0x65
    description: Set ECO/power mode
    params:
      - name: mode
        type: enum
        values:
          "0x00": "Normal"
          "0x01": "Low Power Standby"

  - id: auto_search_set
    label: Set Auto Search
    kind: action
    command_code: 0x67
    description: Set auto input search behavior
    params:
      - name: mode
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"
          "0x02": "Failover"

  - id: failover_set
    label: Set Failover Priority
    kind: action
    command_code: 0x6A
    description: Set failover input priority order (7 slots)
    params:
      - name: priority_1
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 1st priority input
      - name: priority_2
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 2nd priority input
      - name: priority_3
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 3rd priority input
      - name: priority_4
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 4th priority input
      - name: priority_5
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 5th priority input
      - name: priority_6
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 6th priority input
      - name: priority_7
        type: enum
        values:
          "0x00": "Reserved"
          "0x01": "HDMI 1"
          "0x02": "HDMI 2"
          "0x03": "DisplayPort"
          "0x04": "OPS"
          "0x05": "DVI-D"
          "0x06": "YPbPr"
          "0x07": "AV"
          "0x08": "VGA"
        description: 7th priority input

  - id: daylight_saving_set
    label: Set Daylight Saving
    kind: action
    command_code: 0x6C
    description: Set daylight saving time mode
    params:
      - name: mode
        type: enum
        values:
          "0x00": "Daylight saving time"
          "0x01": "Standard time"

  - id: date_set
    label: Set Date
    kind: action
    command_code: 0x6E
    description: Set the display clock date
    params:
      - name: year
        type: integer
        min: 14
        max: 99
        description: Year (hex 0x0E to 0x63 = 2014 to 2099)
      - name: month
        type: integer
        min: 1
        max: 12
        description: Month (1 = JAN through 12 = DEC)
      - name: day
        type: integer
        min: 1
        max: 31
        description: Day of month (range depends on month)

  - id: time_set
    label: Set Time
    kind: action
    command_code: 0x71
    description: Set the display clock time
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
        description: Hour (0 to 23)
      - name: minute
        type: integer
        min: 0
        max: 59
        description: Minute (0 to 59)

  - id: scheduling_parameters_set
    label: Set Scheduling Parameters
    kind: action
    command_code: 0x73
    description: Set scheduling page parameters (up to 7 pages)
    params:
      - name: page
        type: integer
        min: 1
        max: 7
        description: Schedule page number (encoded in bits 7-4 with enable in bits 3-0)
      - name: enable
        type: enum
        values:
          "0x00": "Disable"
          "0x01": "Enable"
        description: Page enable state
      - name: start_hour
        type: integer
        min: 0
        max: 23
        description: Start time hour (24 = NULL)
      - name: start_minute
        type: integer
        min: 0
        max: 59
        description: Start time minute (60 = NULL)
      - name: end_hour
        type: integer
        min: 0
        max: 23
        description: End time hour (24 = NULL)
      - name: end_minute
        type: integer
        min: 0
        max: 59
        description: End time minute (60 = NULL)
      - name: video_source
        type: enum
        values:
          "0x00": "NULL"
          "0x03": "HDMI 1"
          "0x04": "HDMI 2"
          "0x05": "Display Port"
          "0x06": "OPS"
          "0x07": "DVI-D"
          "0x08": "YPbPr"
          "0x09": "AV"
          "0x0A": "VGA"
        description: Video source for this schedule
      - name: working_days
        type: integer
        min: 0
        max: 255
        description: Bitfield of working days (bit0=every week, bit1=Mon, bit2=Tue, bit3=Wed, bit4=Thu, bit5=Fri, bit6=Sat, bit7=Sun)

  - id: sleep_timer_set
    label: Set Sleep Timer
    kind: action
    command_code: 0x75
    description: Set sleep timer in minutes
    params:
      - name: minutes
        type: integer
        min: 0
        max: 240
        description: Sleep timer in minutes (0 to 240)

  - id: cec_set
    label: Set CEC
    kind: action
    command_code: 0x77
    description: Enable or disable CEC
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: local_kb_lock_set
    label: Set Local KB Lock
    kind: action
    command_code: 0x7A
    description: Lock or unlock local keyboard/buttons
    params:
      - name: state
        type: enum
        values:
          "0x00": "Unlock"
          "0x01": "Lock All"

  - id: rc_lock_set
    label: Set RC Lock
    kind: action
    command_code: 0x7C
    description: Lock or unlock remote control
    params:
      - name: state
        type: enum
        values:
          "0x00": "Unlock"
          "0x01": "Lock All"

  - id: pixel_shift_set
    label: Set Pixel Shift
    kind: action
    command_code: 0x7E
    description: Enable or disable pixel shift
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: smart_power_set
    label: Set Smart Power
    kind: action
    command_code: 0x81
    description: Enable or disable smart power
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: wake_on_lan_set
    label: Set Wake On LAN
    kind: action
    command_code: 0x83
    description: Enable or disable Wake On LAN
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: switch_on_state_set
    label: Set Switch On State
    kind: action
    command_code: 0x85
    description: Set power-on default behavior
    params:
      - name: state
        type: enum
        values:
          "0x00": "On"
          "0x01": "Standby"
          "0x02": "Last Status"

  - id: led_set
    label: Set LED State
    kind: action
    command_code: 0x87
    description: Enable or disable front LED
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: switch_on_delay_set
    label: Set Switch On Delay
    kind: action
    command_code: 0x8A
    description: Set power-on delay in seconds
    params:
      - name: seconds
        type: integer
        min: 0
        max: 60
        description: Switch-on delay (0 to 60 seconds)

  - id: logo_set
    label: Set Logo
    kind: action
    command_code: 0x8C
    description: Enable or disable power-on logo
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: apm_set
    label: Set Advanced Power Management
    kind: action
    command_code: 0x8E
    description: Set APM auto-off timer in minutes
    params:
      - name: minutes
        type: integer
        min: 0
        max: 60
        description: APM timeout (0 = Off, 1 to 60 minutes)

  - id: information_osd_set
    label: Set Information OSD
    kind: action
    command_code: 0x91
    description: Enable or disable information OSD display
    params:
      - name: state
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"

  - id: displayport_version_set
    label: Set DisplayPort Version
    kind: action
    command_code: 0x93
    description: Set DisplayPort protocol version
    params:
      - name: version
        type: enum
        values:
          "0x00": "1.1a"
          "0x01": "1.2"

  - id: cooling_fan_set
    label: Set Cooling Fan
    kind: action
    command_code: 0x95
    description: Set cooling fan mode
    params:
      - name: mode
        type: enum
        values:
          "0x00": "Off"
          "0x01": "On"
          "0x02": "Auto"

  - id: rs232_control_port_set
    label: Set Control Port
    kind: action
    command_code: 0x97
    description: Select control port interface
    params:
      - name: port
        type: enum
        values:
          "0x00": "RS232"
          "0x01": "LAN (RJ-45)"

  - id: osd_timeout_set
    label: Set OSD Timeout
    kind: action
    command_code: 0x9A
    description: Set OSD menu timeout in seconds
    params:
      - name: seconds
        type: integer
        min: 0
        max: 60
        description: OSD timeout (0 to 60 seconds)

  - id: auto_adjust
    label: Auto Adjust
    kind: action
    command_code: 0xFC
    description: Trigger VGA auto adjust
    params: []

  - id: factory_reset
    label: Factory Reset
    kind: action
    command_code: 0xFD
    description: Reset all settings to factory defaults
    params: []

  - id: ir_remote
    label: IR Remote Command
    kind: action
    command_code: 0xDB
    description: Simulate IR remote key press
    params:
      - name: key
        type: enum
        values:
          "0xA0": "Power"
          "0xA1": "Menu"
          "0xA2": "Input"
          "0xA3": "Vol_Up"
          "0xA4": "Vol_Down"
          "0xA5": "Mute"
          "0xA6": "Cursor_Up"
          "0xA7": "Cursor_Down"
          "0xA8": "Cursor_Left"
          "0xA9": "Cursor_Right"
          "0xB1": "OK"
          "0xB2": "Return"
          "0xC1": "Red"
          "0xC2": "Green"
          "0xC3": "Yellow"
          "0xC4": "Blue"
          "0xD1": "Format"
          "0xD2": "Info"
          "0x00": "Btn_0"
          "0x01": "Btn_1"
          "0x02": "Btn_2"
          "0x03": "Btn_3"
          "0x04": "Btn_4"
          "0x05": "Btn_5"
          "0x06": "Btn_6"
          "0x07": "Btn_7"
          "0x08": "Btn_8"
          "0x09": "Btn_9"
        description: IR key code
  - id: serial_number
    label: Serial Number
    command_code: 0xC4
    kind: query
    description: Get the serial number of the display (Get-only; response format not detailed in source)
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command_code: 0xA4
    type: enum
    values:
      "0x01": "Off"
      "0x02": "On"
    description: Current power state

  - id: input_source
    label: Input Source
    command_code: 0xA6
    type: enum
    values:
      "0x01": "Reserved"
      "0x02": "Reserved"
      "0x03": "HDMI 1"
      "0x04": "HDMI 2"
      "0x05": "Display Port"
      "0x06": "Card OPS"
      "0x07": "DVI-D"
      "0x08": "YPbPr"
      "0x09": "AV"
      "0x0A": "VGA"
    description: Current input source

  - id: volume
    label: Volume
    command_code: 0xAD
    type: integer
    min: 0
    max: 60
    description: Current volume level

  - id: video_parameters
    label: Video Parameters
    command_code: 0xAB
    type: compound
    description: Current brightness, color, contrast, sharpness, hue, backlight, gamma

  - id: audio_parameters
    label: Audio Parameters
    command_code: 0xAF
    type: compound
    description: Current treble and bass values

  - id: picture_style
    label: Picture Style
    command_code: 0x02
    type: enum
    values:
      "0x00": "Personal"
      "0x01": "Vivid"
      "0x02": "Natural"
      "0x03": "Standard"
      "0x04": "Movie"
      "0x05": "Photo"
      "0x06": "EnergySaving"
    description: Current picture style preset

  - id: backlight
    label: Backlight
    command_code: 0x04
    type: integer
    min: 0
    max: 100
    description: Current backlight level

  - id: color_state
    label: Color Saturation
    command_code: 0x06
    type: integer
    min: 0
    max: 100
    description: Current color saturation

  - id: sharpness
    label: Sharpness
    command_code: 0x08
    type: integer
    min: 0
    max: 20
    description: Current sharpness

  - id: noise_reduction
    label: Noise Reduction
    command_code: 0x0B
    type: enum
    values:
      "0x00": "Off"
      "0x01": "Minimum"
      "0x02": "Medium"
      "0x03": "Maximum"
    description: Current noise reduction state

  - id: mpeg_artifact_reduction
    label: MPEG Artifact Reduction
    command_code: 0x0D
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current MPEG artifact reduction state

  - id: advanced_sharpness
    label: Advanced Sharpness
    command_code: 0x0F
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current advanced sharpness state

  - id: dynamic_contrast
    label: Dynamic Contrast
    command_code: 0x12
    type: enum
    values:
      "0x00": "Off"
      "0x01": "Minimum"
      "0x02": "Medium"
      "0x03": "Maximum"
    description: Current dynamic contrast state

  - id: color_enhancement
    label: Color Enhancement
    command_code: 0x14
    type: enum
    values:
      "0x00": "Off"
      "0x01": "Minimum"
      "0x02": "Medium"
      "0x03": "Maximum"
    description: Current color enhancement state

  - id: gamma
    label: Gamma
    command_code: 0x16
    type: enum
    values:
      "0x00": "1.8"
      "0x01": "1.9"
      "0x02": "2.0"
      "0x03": "2.1"
      "0x04": "2.2"
      "0x05": "2.3"
      "0x06": "2.4"
      "0x07": "2.5"
    description: Current gamma setting

  - id: color_temperature
    label: Color Temperature
    command_code: 0x18
    type: enum
    values:
      "0x00": "10000K"
      "0x01": "9300K"
      "0x02": "6500K"
      "0x03": "3200K"
      "0x04": "Custom"
    description: Current color temperature

  - id: custom_color_temperature
    label: Custom Color Temperature
    command_code: 0x1B
    type: compound
    description: Red/Green/Blue gain and offset values (6 bytes, each 0 to 255)

  - id: video_contrast
    label: Video Contrast
    command_code: 0x1D
    type: integer
    min: 0
    max: 100
    description: Current video contrast

  - id: brightness
    label: Brightness
    command_code: 0x1F
    type: integer
    min: 0
    max: 100
    description: Current screen brightness

  - id: hue
    label: Hue
    command_code: 0x22
    type: integer
    min: 0
    max: 100
    description: Current hue (0 to 100 maps to -50 to 50)

  - id: color_space
    label: Color Space
    command_code: 0x24
    type: enum
    values:
      "0x00": "Auto"
      "0x01": "RGB-Video"
      "0x02": "RGB-PC"
      "0x03": "YUV"
    description: Current color space

  - id: picture_format
    label: Picture Format
    command_code: 0x26
    type: enum
    values:
      "0x00": "Auto Zoom"
      "0x01": "16:9"
      "0x02": "Wide"
      "0x03": "Unscaled"
      "0x04": "4:3"
    description: Current picture format

  - id: picture_shift
    label: Picture Shift Position
    command_code: 0x28
    type: compound
    description: H and V position values

  - id: input_resolution
    label: Input Resolution
    command_code: 0x2B
    type: compound
    description: Current input resolution (VGA only)

  - id: sound_style
    label: Sound Style
    command_code: 0x32
    type: enum
    values:
      "0x00": "Personal"
      "0x01": "Original"
      "0x02": "Movie"
      "0x03": "Music"
      "0x04": "Game"
      "0x05": "News"
    description: Current sound style preset

  - id: bass
    label: Bass
    command_code: 0x34
    type: integer
    min: 0
    max: 16
    description: Current bass level (0 to 16 maps to -8 to 8)

  - id: treble
    label: Treble
    command_code: 0x36
    type: integer
    min: 0
    max: 16
    description: Current treble level (0 to 16 maps to -8 to 8)

  - id: balance
    label: Balance
    command_code: 0x38
    type: integer
    min: 0
    max: 16
    description: Current balance (0 to 16 maps to -8 to 8)

  - id: surround_mode
    label: Surround Mode
    command_code: 0x3B
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current surround mode state

  - id: audio_out
    label: Audio Out
    command_code: 0x3D
    type: integer
    min: 0
    max: 60
    description: Current audio out level

  - id: auto_volume_leveling
    label: Auto Volume Leveling
    command_code: 0x3F
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current auto volume leveling state

  - id: speaker_setting
    label: Speaker Setting
    command_code: 0x42
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current speaker setting

  - id: clear_sound
    label: Clear Sound
    command_code: 0x44
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current clear sound state

  - id: tiling_parameters
    label: Tiling Parameters
    command_code: 0x52
    type: compound
    description: Current tiling enable, H/V monitors, position, frame compensation

  - id: eco_mode
    label: ECO Mode
    command_code: 0x66
    type: enum
    values:
      "0x00": "Normal"
      "0x01": "Low Power Standby"
    description: Current ECO mode

  - id: auto_search
    label: Auto Search
    command_code: 0x68
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
      "0x02": "Failover"
    description: Current auto search state

  - id: failover
    label: Failover Priority
    command_code: 0x6B
    type: compound
    description: Current failover priority order (7 slots)

  - id: daylight_saving
    label: Daylight Saving
    command_code: 0x6D
    type: enum
    values:
      "0x00": "Daylight saving time"
      "0x01": "Standard time"
    description: Current daylight saving mode

  - id: date
    label: Date
    command_code: 0x6F
    type: compound
    description: Year, month, day

  - id: time
    label: Time
    command_code: 0x72
    type: compound
    description: Hour and minute

  - id: scheduling_parameters
    label: Scheduling Parameters
    command_code: 0x74
    type: compound
    description: Schedule page settings

  - id: sleep_timer
    label: Sleep Timer
    command_code: 0x76
    type: integer
    min: 0
    max: 240
    description: Current sleep timer value in minutes

  - id: cec
    label: CEC
    command_code: 0x78
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current CEC state

  - id: local_kb_lock
    label: Local KB Lock
    command_code: 0x7B
    type: enum
    values:
      "0x00": "Unlock"
      "0x01": "Lock All"
    description: Current local keyboard lock state

  - id: rc_lock
    label: RC Lock
    command_code: 0x7D
    type: enum
    values:
      "0x00": "Unlock"
      "0x01": "Lock All"
    description: Current remote control lock state

  - id: pixel_shift
    label: Pixel Shift
    command_code: 0x7F
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current pixel shift state

  - id: smart_power
    label: Smart Power
    command_code: 0x82
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current smart power state

  - id: wake_on_lan
    label: Wake On LAN
    command_code: 0x84
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current Wake On LAN state

  - id: switch_on_state
    label: Switch On State
    command_code: 0x86
    type: enum
    values:
      "0x00": "On"
      "0x01": "Standby"
      "0x02": "Last Status"
    description: Current switch-on state setting

  - id: led_state
    label: LED State
    command_code: 0x88
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current LED state

  - id: switch_on_delay
    label: Switch On Delay
    command_code: 0x8B
    type: integer
    min: 0
    max: 60
    description: Current switch-on delay in seconds

  - id: logo_state
    label: Logo State
    command_code: 0x8D
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current power-on logo state

  - id: apm
    label: Advanced Power Management
    command_code: 0x8F
    type: integer
    min: 0
    max: 60
    description: APM timeout in minutes (0 = Off)

  - id: information_osd
    label: Information OSD
    command_code: 0x92
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
    description: Current information OSD state

  - id: displayport_version
    label: DisplayPort Version
    command_code: 0x94
    type: enum
    values:
      "0x00": "1.1a"
      "0x01": "1.2"
    description: Current DisplayPort version

  - id: cooling_fan
    label: Cooling Fan
    command_code: 0x96
    type: enum
    values:
      "0x00": "Off"
      "0x01": "On"
      "0x02": "Auto"
    description: Current cooling fan mode

  - id: rs232_control_port
    label: Control Port
    command_code: 0x98
    type: enum
    values:
      "0x00": "RS232"
      "0x01": "LAN (RJ-45)"
    description: Current control port setting

  - id: osd_timeout
    label: OSD Timeout
    command_code: 0x9B
    type: integer
    min: 0
    max: 60
    description: Current OSD timeout in seconds

  - id: operating_hours
    label: Operating Hours
    command_code: 0xC2
    type: integer
    description: Total operating hours (16-bit, MSB+LSB)

  - id: temperature
    label: Temperature Sensor
    command_code: 0xC6
    type: integer
    min: 0
    max: 100
    description: Temperature sensor reading in Celsius (plus or minus 3 degrees)

  - id: model_name
    label: Model Name
    command_code: 0xC8
    type: compound
    description: Model name or firmware version string
```

## Variables
```yaml
# All settable parameters are covered by the Actions section above.
# The device uses a Get/Set command pair pattern rather than persistent variables.
```

## Events
```yaml
# No unsolicited notification events documented in source.
# All responses are solicited via Get commands or ACK/NACK/NAV replies to Set commands.
```

## Macros
```yaml
# No macro sequences defined in source.
```

## Safety
```yaml
confirmation_required_for:
  - "factory_reset"
destructive_actions:
  - "factory_reset"
warnings:
  - "Factory reset restores all settings to factory defaults"
  - "No reply when wrong monitor ID address is used"
interlocks: []
cooldowns: []
```

## Notes
Binary protocol uses fixed packet structure: Header (0xA6), Monitor ID (1-255), Category (0x00), Code0, Code1, Length (N+3), Data Control (0x01), Data[0..N], Checksum (XOR of all bytes except checksum). Response header is 0x21.

Monitor ID must match target display. No reply sent when wrong ID used. New command must wait for ACK from previous command; retry after 500ms if no response. ACK = command executed. NACK = unknown command code. NAV = parameter not available or checksum error.

Volume set to 0 mutes display but does not overwrite system mute status. Hue and bass/treble/balance use offset encoding: midpoint value (0x32 for hue = 0, 0x08 for audio = 0) represents center of range.

Tiling frame compensation values 0-800 are sent as 2-byte big-endian. Scheduling page number and enable are encoded together in a single byte (bits 7-4 = page number 1-7, bits 3-0 = enable 0/1).

<!-- UNRESOLVED: specific RA-Series model numbers (e.g. RA435, RA555) not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: LAN protocol details beyond port number not specified (assumed same binary packet format over TCP) -->
<!-- UNRESOLVED: maximum concurrent connections over LAN not stated -->
<!-- UNRESOLVED: serial number get command (0xC4) referenced in summary table but not detailed in body -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/olwcpmt4/ra4980-ra5580-rs232-manual-20150609-watermarked.pdf
  - https://www.planar.com/media/uuoptbfm/ra4980-ra5580-user-manual-20150609-watermarked-rev.pdf
retrieved_at: 2026-05-07T14:30:52.298Z
last_checked_at: 2026-05-14T18:17:19.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.797Z
matched_actions: 66
action_count: 66
confidence: high
summary: "All 147 spec actions matched to source command codes; transport parameters verified; no fabricated commands detected."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
