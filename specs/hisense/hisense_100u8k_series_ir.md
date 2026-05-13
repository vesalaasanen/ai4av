---
spec_id: admin/hisense-100u8k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U8K Series Control Spec"
manufacturer: HiSense
model_family: "100U8K Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U8K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:53:26.291Z
generated_at: 2026-05-04T05:53:26.291Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T05:53:26.291Z
  matched_actions: 232
  action_count: 232
  confidence: high
  summary: "All 232 actions matched source; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 100U8K Series Control Spec

## Summary
Hisense Prosumer TV supporting both RS-232 serial control and discrete IR control. RS-232 protocol uses ASCII command/response format over 9600 baud. Client ID for RS-232 is the last 3 bytes of the TV's Ethernet MAC address. IR section provides Pronto CCF hex codes for discrete remote functions (power, input selection, menu navigation, etc.).

<!-- UNRESOLVED: serial port number not stated — RS-232 DB9 female connector documented but no default port number -->
<!-- UNRESOLVED: no IP/TCP control documented — only RS-232 and IR -->

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

**RS-232 Command Format (ASCII):**

Set command: `S{CLIENT_ID}{COMMAND}{DATA}[CHECKSUM]\r`
Query command: `Q{CLIENT_ID}{COMMAND}????[CHECKSUM]\r`

Response format: `{CLIENT_ID}:OKAY{DATA}[CHECKSUM]\r`

- CLIENT_ID: 3 hex bytes (last 3 of MAC for Smart TV, or "ALL" for broadcast)
- COMMAND: 4 ASCII chars
- DATA: 4 ASCII chars (parameter or "????" for query)
- CHECKSUM: 1 hex byte (8-bit sum of all bytes modulo 256 = 0)
- Termination: carriage return (0x0D)

Common ACKs: OKAY, EROR, WAIT

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # input source selection commands present
- queryable       # query commands for all controllable parameters present
- levelable       # brightness, contrast, color, tint, sharpness, volume, backlight
```

## Actions
```yaml
# Power Control
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "RS-232: POWR0001 | IR: POWER ON discrete code"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "RS-232: POWR0000 | IR: POWER OFF discrete code"

- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
  description: "RS-232: PWRE0001 — allows turning on TV via RS-232 from standby"

- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
  description: "RS-232: PWRE0000"

# Input Selection (RS-232)
- id: set_input_tv
  label: Set Input TV
  kind: action
  params: []
  command: INPT0001

- id: set_input_av
  label: Set Input AV
  kind: action
  params: []
  command: INPT0004

- id: set_input_component
  label: Set Input Component
  kind: action
  params: []
  command: INPT0003

- id: set_input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
  command: INPT0009

- id: set_input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
  command: INPT0010

- id: set_input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
  command: INPT0011

- id: set_input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
  command: INPT0012

- id: set_input_vga
  label: Set Input VGA
  kind: action
  params: []
  command: INPT0006

# Picture Mode
- id: set_picture_mode_standard
  label: Set Picture Mode Standard
  kind: action
  params: []
  command: PMOD0000

- id: set_picture_mode_vivid
  label: Set Picture Mode Vivid
  kind: action
  params: []
  command: PMOD0002

- id: set_picture_mode_energy_saving
  label: Set Picture Mode Energy Saving
  kind: action
  params: []
  command: PMOD0003

- id: set_picture_mode_theater
  label: Set Picture Mode Theater
  kind: action
  params: []
  command: PMOD0004

- id: set_picture_mode_game
  label: Set Picture Mode Game
  kind: action
  params: []
  command: PMOD0005

- id: set_picture_mode_sport
  label: Set Picture Mode Sport
  kind: action
  params: []
  command: PMOD0006

# Image Adjustment (levelable params)
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: BRIT

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: CONT

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: COLR

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: TINT

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-20"
  command: SHRP

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: BKLV

# Aspect Ratio
- id: set_aspect_ratio_auto
  label: Set Aspect Ratio Auto
  kind: action
  params: []
  command: ASPT0000

- id: set_aspect_ratio_normal
  label: Set Aspect Ratio Normal
  kind: action
  params: []
  command: ASPT0002

- id: set_aspect_ratio_zoom
  label: Set Aspect Ratio Zoom
  kind: action
  params: []
  command: ASPT0003

- id: set_aspect_ratio_wide
  label: Set Aspect Ratio Wide
  kind: action
  params: []
  command: ASPT0004

- id: set_aspect_ratio_direct
  label: Set Aspect Ratio Direct
  kind: action
  params: []
  command: ASPT0005

- id: set_aspect_ratio_1to1
  label: Set Aspect Ratio 1-to-1 Pixel Map
  kind: action
  params: []
  command: ASPT0006

- id: set_aspect_ratio_panoramic
  label: Set Aspect Ratio Panoramic
  kind: action
  params: []
  command: ASPT0007

- id: set_aspect_ratio_cinema
  label: Set Aspect Ratio Cinema
  kind: action
  params: []
  command: ASPT0008

# Overscan
- id: set_overscan_on
  label: Set Overscan On
  kind: action
  params: []
  command: OVSN0000

- id: set_overscan_off
  label: Set Overscan Off
  kind: action
  params: []
  command: OVSN0002

# Color Temperature
- id: set_color_temp_high
  label: Set Color Temp High
  kind: action
  params: []
  command: CTEM0000

- id: set_color_temp_middle
  label: Set Color Temp Middle
  kind: action
  params: []
  command: CTEM0002

- id: set_color_temp_mid_low
  label: Set Color Temp Mid-Low
  kind: action
  params: []
  command: CTEM0003

- id: set_color_temp_low
  label: Set Color Temp Low
  kind: action
  params: []
  command: CTEM0004

# Audio
- id: set_sound_mode_standard
  label: Set Sound Mode Standard
  kind: action
  params: []
  command: AMOD0000

- id: set_sound_mode_theater
  label: Set Sound Mode Theater
  kind: action
  params: []
  command: AMOD0002

- id: set_sound_mode_music
  label: Set Sound Mode Music
  kind: action
  params: []
  command: AMOD0003

- id: set_sound_mode_speech
  label: Set Sound Mode Speech
  kind: action
  params: []
  command: AMOD0004

- id: set_sound_mode_late_night
  label: Set Sound Mode Late Night
  kind: action
  params: []
  command: AMOD0005

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: VOLM

- id: set_mute_on
  label: Mute On
  kind: action
  params: []
  command: MUTE0001

- id: set_mute_off
  label: Mute Off
  kind: action
  params: []
  command: MUTE0000

- id: set_tv_speaker_on
  label: TV Speaker On
  kind: action
  params: []
  command: ASPK0002

- id: set_tv_speaker_off
  label: TV Speaker Off
  kind: action
  params: []
  command: ASPK0000

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []
  command: RSTA2000

# Tuner / Channel
- id: set_tuner_antenna
  label: Set Tuner Antenna
  kind: action
  params: []
  command: TUNR0000

- id: set_tuner_cable
  label: Set Tuner Cable
  kind: action
  params: []
  command: TUNR0002

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  command: CHAN0001

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  command: CHAN0000

- id: auto_search
  label: Automatic Search
  kind: action
  params: []
  command: TSCN0001

# Caption Control
- id: set_caption_off
  label: Caption Off
  kind: action
  params: []
  command: CC##0000

- id: set_caption_on
  label: Caption On
  kind: action
  params: []
  command: CC##0002

- id: set_caption_mute
  label: Caption On When Mute
  kind: action
  params: []
  command: CC##0003

# OSD / Language
- id: set_osd_english
  label: Set OSD English
  kind: action
  params: []
  command: LANG0000

- id: set_osd_spanish
  label: Set OSD Español
  kind: action
  params: []
  command: LANG0002

- id: set_osd_french
  label: Set OSD Français
  kind: action
  params: []
  command: LANG0003

# Display / LED
- id: set_standby_led_on
  label: Standby LED On
  kind: action
  params: []
  command: PLED0002

- id: set_standby_led_off
  label: Standby LED Off
  kind: action
  params: []
  command: PLED0000

# Factory Reset
- id: factory_reset
  label: Restore Factory Settings
  kind: action
  params: []
  command: RSET9999

# Picture Reset
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
  command: RSTP1000

# Power Off Control Mode
- id: set_power_off_ac_only
  label: Power Off Control AC Only
  kind: action
  params: []
  command: PBTN0000

- id: set_power_off_all
  label: Power Off Control All
  kind: action
  params: []
  command: PBTN0001

# Volume Control Lock
- id: set_volume_locked
  label: Volume Control Locked
  kind: action
  params: []
  command: SVOL0000

- id: set_volume_last
  label: Volume Last
  kind: action
  params: []
  command: SVOL0001

- id: set_volume_ac_reset
  label: Volume AC Reset
  kind: action
  params: []
  command: SVOL0002

- id: set_volume_standby_reset
  label: Volume Standby Reset
  kind: action
  params: []
  command: SVOL0003

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  command: VLFL

# Remote / Panel Key Control
- id: set_remote_enable
  label: Remote Key Enable
  kind: action
  params: []
  command: RMOT0000

- id: set_remote_disable
  label: Remote Key Disable
  kind: action
  params: []
  command: RMOT0001

- id: set_remote_partial
  label: Remote Key Partial
  kind: action
  params: []
  command: RMOT0002

- id: set_panel_key_enable
  label: Panel Key Enable
  kind: action
  params: []
  command: PANL0000

- id: set_panel_key_disable
  label: Panel Key Disable
  kind: action
  params: []
  command: PANL0001

- id: set_menu_access_enable
  label: Menu Access Enable
  kind: action
  params: []
  command: MENU0000

- id: set_menu_access_disable
  label: Menu Access Disable
  kind: action
  params: []
  command: MENU0001

- id: set_av_menu_enable
  label: AV Setting Menu Enable
  kind: action
  params: []
  command: AVMN0001

- id: set_av_menu_disable
  label: AV Setting Menu Disable
  kind: action
  params: []
  command: AVMN0000

- id: set_osd_mode_enable
  label: OSD Mode Enable
  kind: action
  params: []
  command: OSD#0000

- id: set_osd_mode_disable
  label: OSD Mode Disable
  kind: action
  params: []
  command: OSD#0001

- id: set_input_mode_locked
  label: Input Mode Locked
  kind: action
  params: []
  command: INPM0000

- id: set_input_mode_selectable
  label: Input Mode Selectable
  kind: action
  params: []
  command: INPM0001

- id: set_input_mode_ac_reset
  label: Input Mode AC Reset
  kind: action
  params: []
  command: INPM0002

- id: set_input_mode_standby_reset
  label: Input Mode Standby Reset
  kind: action
  params: []
  command: INPM0003

- id: set_power_on_input_last
  label: Power On Input Last
  kind: action
  params: []
  command: POIS0000

- id: set_power_on_input_air
  label: Power On Input Air
  kind: action
  params: []
  command: POIS0001

- id: set_power_on_input_av
  label: Power On Input AV
  kind: action
  params: []
  command: POIS0002

- id: set_power_on_input_component
  label: Power On Input Component
  kind: action
  params: []
  command: POIS0003

# IR Button Simulator (RS-232 remote button commands)
- id: ir_button_ch_up
  label: CH+
  kind: action
  params: []
  command: BTTN1034

- id: ir_button_ch_down
  label: CH-
  kind: action
  params: []
  command: BTTN1035

- id: ir_button_vol_up
  label: VOL+
  kind: action
  params: []
  command: BTTN1033

- id: ir_button_vol_down
  label: VOL-
  kind: action
  params: []
  command: BTTN1032

- id: ir_button_power
  label: POWER
  kind: action
  params: []
  command: BTTN1012

- id: ir_button_mute
  label: MUTE
  kind: action
  params: []
  command: BTTN1031

- id: ir_button_menu
  label: MENU
  kind: action
  params: []
  command: BTTN1038

- id: ir_button_exit
  label: EXIT
  kind: action
  params: []
  command: BTTN1046

- id: ir_button_up
  label: UP
  kind: action
  params: []
  command: BTTN1041

- id: ir_button_down
  label: DOWN
  kind: action
  params: []
  command: BTTN1042

- id: ir_button_left
  label: LEFT
  kind: action
  params: []
  command: BTTN1043

- id: ir_button_right
  label: RIGHT
  kind: action
  params: []
  command: BTTN1044

- id: ir_button_ok
  label: OK/ENTER
  kind: action
  params: []
  command: BTTN1040

- id: ir_button_back
  label: BACK
  kind: action
  params: []
  command: BTTN1045

- id: ir_button_input
  label: INPUT
  kind: action
  params: []
  command: BTTN1036

- id: ir_button_0
  label: Digit 0
  kind: action
  params: []
  command: BTTN1000

- id: ir_button_1
  label: Digit 1
  kind: action
  params: []
  command: BTTN1001

- id: ir_button_2
  label: Digit 2
  kind: action
  params: []
  command: BTTN1002

- id: ir_button_3
  label: Digit 3
  kind: action
  params: []
  command: BTTN1003

- id: ir_button_4
  label: Digit 4
  kind: action
  params: []
  command: BTTN1004

- id: ir_button_5
  label: Digit 5
  kind: action
  params: []
  command: BTTN1005

- id: ir_button_6
  label: Digit 6
  kind: action
  params: []
  command: BTTN1006

- id: ir_button_7
  label: Digit 7
  kind: action
  params: []
  command: BTTN1007

- id: ir_button_8
  label: Digit 8
  kind: action
  params: []
  command: BTTN1008

- id: ir_button_9
  label: Digit 9
  kind: action
  params: []
  command: BTTN1009

- id: ir_button_dash
  label: Dash
  kind: action
  params: []
  command: BTTN1010

- id: ir_button_sleep
  label: SLEEP
  kind: action
  params: []
  command: BTTN1024

- id: ir_button_guide
  label: Guide
  kind: action
  params: []
  command: BTTN1055

- id: ir_button_freeze
  label: Freeze
  kind: action
  params: []
  command: BTTN1026

- id: ir_button_cc
  label: CC
  kind: action
  params: []
  command: BTTN1027

- id: ir_button_media_player
  label: Media Player
  kind: action
  params: []
  command: BTTN1023

- id: ir_button_live_tv
  label: Live TV
  kind: action
  params: []
  command: BTTN1055

- id: ir_button_pause
  label: Pause
  kind: action
  params: []
  command: BTTN1018

- id: ir_button_play
  label: Play
  kind: action
  params: []
  command: BTTN1016

- id: ir_button_stop
  label: Stop
  kind: action
  params: []
  command: BTTN1020

- id: ir_button_frw
  label: FRW
  kind: action
  params: []
  command: BTTN1015

- id: ir_button_ffw
  label: FFW
  kind: action
  params: []
  command: BTTN1017

- id: ir_button_previous
  label: Previous
  kind: action
  params: []
  command: BTTN1019

- id: ir_button_next
  label: Next
  kind: action
  params: []
  command: BTTN1021

- id: ir_button_connected_home
  label: Connected Home
  kind: action
  params: []
  command: BTTN1039

- id: ir_button_red
  label: Red Button
  kind: action
  params: []
  command: BTTN1050

- id: ir_button_green
  label: Green Button
  kind: action
  params: []
  command: BTTN1051

- id: ir_button_yellow
  label: Yellow Button
  kind: action
  params: []
  command: BTTN1053

- id: ir_button_blue
  label: Blue Button
  kind: action
  params: []
  command: BTTN1052

- id: ir_button_pip
  label: PIP Toggle
  kind: action
  params: []
  description: "IR discrete code: 04FB A956"

- id: ir_button_pip_input
  label: PIP Input
  kind: action
  params: []
  description: "IR discrete code: 04FB AA55"

- id: ir_button_pip_swap
  label: PIP Swap
  kind: action
  params: []
  description: "IR discrete code: 04FB AB54"

- id: ir_button_pip_position
  label: PIP Position
  kind: action
  params: []
  description: "IR discrete code: 04FB AC53"

- id: ir_button_pip_size
  label: PIP Size
  kind: action
  params: []
  description: "IR discrete code: 04FB AD52"

# IR Discrete Input Selection
- id: ir_input_hdmi1
  label: HDMI.1
  kind: action
  params: []
  description: "IR discrete code: 04FB 7C83"

- id: ir_input_hdmi2
  label: HDMI.2
  kind: action
  params: []
  description: "IR discrete code: 04FB 7D82"

- id: ir_input_hdmi3
  label: HDMI.3
  kind: action
  params: []
  description: "IR discrete code: 04FB 7E81"

- id: ir_input_hdmi4
  label: HDMI.4
  kind: action
  params: []
  description: "IR discrete code: 04FB 7F80"

- id: ir_input_hdmi5
  label: HDMI.5
  kind: action
  params: []
  description: "IR discrete code: 04FB 807F"

- id: ir_input_vga
  label: VGA
  kind: action
  params: []
  description: "IR discrete code: 04FB 817E"

- id: ir_input_usb
  label: USB
  kind: action
  params: []
  description: "IR discrete code: 04FB 827D"

- id: ir_input_tv_tuner
  label: TV TUNER1
  kind: action
  params: []
  description: "IR discrete code: 04FB 748B"

# IR Aspect Ratio
- id: ir_aspect_wide
  label: Aspect Ratio Wide 16:9
  kind: action
  params: []
  description: "IR discrete code: 04FB 857A"

- id: ir_aspect_normal
  label: Aspect Ratio Normal 4:3
  kind: action
  params: []
  description: "IR discrete code: 04FB 8679"

- id: ir_aspect_cinema
  label: Aspect Ratio Cinema
  kind: action
  params: []
  description: "IR discrete code: 04FB 8778"

- id: ir_aspect_panorama
  label: Aspect Ratio Panorama
  kind: action
  params: []
  description: "IR discrete code: 04FB 8877"

- id: ir_aspect_zoom
  label: Aspect Ratio Zoom
  kind: action
  params: []
  description: "IR discrete code: 04FB 8976"

# IR Other Functions
- id: ir_picture_mode_toggle
  label: Picture Mode Toggle
  kind: action
  params: []
  description: "IR discrete code: 04FB 837C"

- id: ir_sound_mode_toggle
  label: Sound Mode Toggle
  kind: action
  params: []
  description: "IR discrete code: 04FB 847B"

- id: ir_channel_list
  label: Channel List
  kind: action
  params: []
  description: "IR discrete code: 04FB 8A75"

- id: ir_fav_channel
  label: Favorite Channel
  kind: action
  params: []
  description: "IR discrete code: 04FB 8B74"

- id: ir_sleep
  label: Sleep Timer
  kind: action
  params: []
  description: "IR discrete code: 04FB 8C73"

- id: ir_tv_menu_toggle
  label: TV Menu Toggle
  kind: action
  params: []
  description: "IR discrete code: 04FB 8D72"

- id: ir_home
  label: Home
  kind: action
  params: []
  description: "IR discrete code: 04FB 8E71"

- id: ir_tools
  label: Tools / Second Menu
  kind: action
  params: []
  description: "IR discrete code: 04FB 8F70"

- id: ir_info_display_toggle
  label: Info / Display Toggle
  kind: action
  params: []
  description: "IR discrete code: 04FB A45B"
```

## Feedbacks
```yaml
# Query responses return current state value in data field
# Format: {CLIENT_ID}:OKAY{DATA}[CHECKSUM]\r

- id: power_state
  label: Power State
  type: enum
  values:
    - "0"  # Standby
    - "1"  # Power on
  command: POWR????
  description: "Query: Q{CLIENT_ID}POWR????[CHECKSUM]\r"

- id: current_input
  label: Current Input
  type: enum
  values:
    - "1"   # TV
    - "3"   # Component
    - "4"   # AV
    - "6"   # VGA
    - "9"   # HDMI1
    - "10"  # HDMI2
    - "11"  # HDMI3
    - "12"  # HDMI4
  command: INPT????
  description: "Query: Q{CLIENT_ID}INPT????[CHECKSUM]\r"

- id: current_picture_mode
  label: Current Picture Mode
  type: enum
  values:
    - "0"  # Standard
    - "2"  # Vivid
    - "3"  # Energy Saving
    - "4"  # Theater
    - "5"  # Game
    - "6"  # Sport
  command: PMOD????
  description: "Query: Q{CLIENT_ID}PMOD????[CHECKSUM]\r"

- id: current_brightness
  label: Brightness
  type: integer
  range: [0, 100]
  command: BRIT????
  description: "Query: Q{CLIENT_ID}BRIT????[CHECKSUM]\r"

- id: current_contrast
  label: Contrast
  type: integer
  range: [0, 100]
  command: CONT????
  description: "Query: Q{CLIENT_ID}CONT????[CHECKSUM]\r"

- id: current_color
  label: Color Saturation
  type: integer
  range: [0, 100]
  command: COLR????
  description: "Query: Q{CLIENT_ID}COLR????[CHECKSUM]\r"

- id: current_tint
  label: Tint
  type: integer
  range: [0, 100]
  command: TINT????
  description: "Query: Q{CLIENT_ID}TINT????[CHECKSUM]\r"

- id: current_sharpness
  label: Sharpness
  type: integer
  range: [0, 20]
  command: SHRP????
  description: "Query: Q{CLIENT_ID}SHRP????[CHECKSUM]\r"

- id: current_backlight
  label: Backlight
  type: integer
  range: [0, 100]
  command: BKLV????
  description: "Query: Q{CLIENT_ID}BKLV????[CHECKSUM]\r"

- id: current_aspect_ratio
  label: Aspect Ratio
  type: enum
  values:
    - "0"  # Auto
    - "2"  # Normal
    - "3"  # Zoom
    - "4"  # Wide
    - "5"  # Direct
    - "6"  # 1-to-1 Pixel Map
    - "7"  # Panoramic
    - "8"  # Cinema
  command: ASPT????
  description: "Query: Q{CLIENT_ID}ASPT????[CHECKSUM]\r"

- id: overscan_state
  label: Overscan
  type: enum
  values:
    - "0"  # On
    - "2"  # Off
  command: OVSN????
  description: "Query: Q{CLIENT_ID}OVSN????[CHECKSUM]\r"

- id: current_color_temp
  label: Color Temperature
  type: enum
  values:
    - "0"  # High
    - "2"  # Middle
    - "3"  # Mid-Low
    - "4"  # Low
  command: CTEM????
  description: "Query: Q{CLIENT_ID}CTEM????[CHECKSUM]\r"

- id: current_sound_mode
  label: Sound Mode
  type: enum
  values:
    - "0"  # Standard
    - "2"  # Theater
    - "3"  # Music
    - "4"  # Speech
    - "5"  # Late Night
  command: AMOD????
  description: "Query: Q{CLIENT_ID}AMOD????[CHECKSUM]\r"

- id: current_volume
  label: Volume
  type: integer
  range: [0, 100]
  command: VOLM????
  description: "Query: Q{CLIENT_ID}VOLM????[CHECKSUM]\r"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted
  command: MUTE????
  description: "Query: Q{CLIENT_ID}MUTE????[CHECKSUM]\r"

- id: tv_speaker_state
  label: TV Speaker
  type: enum
  values:
    - "0"  # Off
    - "2"  # On
  command: ASPK????
  description: "Query: Q{CLIENT_ID}ASPK????[CHECKSUM]\r"

- id: tuner_mode
  label: Tuner Mode
  type: enum
  values:
    - "0"  # Antenna
    - "2"  # Cable
  command: TUNR????
  description: "Query: Q{CLIENT_ID}TUNR????[CHECKSUM]\r"

- id: caption_control
  label: Caption Control
  type: enum
  values:
    - "0"  # Off
    - "2"  # On
    - "3"  # On When Mute
  command: CC##????
  description: "Query: Q{CLIENT_ID}CC##????[CHECKSUM]\r"

- id: osd_language
  label: OSD Language
  type: enum
  values:
    - "0"  # English
    - "2"  # Español
    - "3"  # Français
  command: LANG????
  description: "Query: Q{CLIENT_ID}LANG????[CHECKSUM]\r"

- id: standby_led_state
  label: Standby LED
  type: enum
  values:
    - "0"  # Off
    - "2"  # On
  command: PLED????
  description: "Query: Q{CLIENT_ID}PLED????[CHECKSUM]\r"

- id: power_off_control_mode
  label: Power Off Control Mode
  type: enum
  values:
    - "0"  # AC Only
    - "1"  # All
  command: PBTN????
  description: "Query: Q{CLIENT_ID}PBTN????[CHECKSUM]\r"

- id: volume_range
  label: Volume Range
  type: integer
  range: [0, 100]
  command: MAVL????
  description: "Query: Q{CLIENT_ID}MAVL????[CHECKSUM]\r"

- id: volume_control_mode
  label: Volume Control
  type: enum
  values:
    - "0"  # Locked
    - "1"  # Last Volume
    - "2"  # AC Reset
    - "3"  # Standby Reset
  command: SVOL????
  description: "Query: Q{CLIENT_ID}SVOL????[CHECKSUM]\r"

- id: volume_locked_level
  label: Volume Locked Level
  type: integer
  range: [0, 100]
  command: VLFL????
  description: "Query: Q{CLIENT_ID}VLFL????[CHECKSUM]\r"

- id: remote_key_state
  label: Remote Key State
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable
    - "2"  # Partial
  command: RMOT????
  description: "Query: Q{CLIENT_ID}RMOT????[CHECKSUM]\r"

- id: panel_key_state
  label: Panel Key State
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable
  command: PANL????
  description: "Query: Q{CLIENT_ID}PANL????[CHECKSUM]\r"

- id: menu_access_state
  label: Menu Access
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable
  command: MENU????
  description: "Query: Q{CLIENT_ID}MENU????[CHECKSUM]\r"

- id: av_menu_state
  label: AV Setting Menu
  type: enum
  values:
    - "0"  # Disable
    - "1"  # Enable
  command: AVMN????
  description: "Query: Q{CLIENT_ID}AVMN????[CHECKSUM]\r"

- id: osd_mode_state
  label: OSD Mode
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable
  command: OSD#????
  description: "Query: Q{CLIENT_ID}OSD#????[CHECKSUM]\r"

- id: input_mode_state
  label: Input Mode
  type: enum
  values:
    - "0"  # Locked
    - "1"  # Selectable
    - "2"  # AC Reset
    - "3"  # Standby Reset
  command: INPM????
  description: "Query: Q{CLIENT_ID}INPM????[CHECKSUM]\r"

- id: power_on_command_setting
  label: RS-232 Remote Power On
  type: enum
  values:
    - "0"  # Disabled
    - "1"  # Enabled
  command: PWRE????
  description: "Query: Q{CLIENT_ID}PWRE????[CHECKSUM]\r — not available in STANDBY mode"
```

## Variables
```yaml
# Settable parameters that are not discrete on/off actions
# These match the levelable params with range constraints

- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
  default: 50

- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
  default: 50

- id: color_saturation
  label: Color Saturation
  type: integer
  range: [0, 100]
  default: 50

- id: tint
  label: Tint
  type: integer
  range: [0, 100]
  default: 50

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 20]
  default: 10

- id: backlight
  label: Backlight
  type: integer
  range: [0, 100]
  default: 80

- id: volume
  label: Volume
  type: integer
  range: [0, 100]
  default: 20

- id: volume_locked_level
  label: Volume Locked Level
  type: integer
  range: [0, 100]
  default: 0
```

## Events
```yaml
# UNRESOLVED: document does not describe unsolicited event notifications from TV
# RS-232 protocol appears to be purely request/response — no主动 push events documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS-232 port must be enabled in Custom Install menu (access: Quick Settings > 7310)"
  - description: "Power On Command must be enabled in Custom Install menu to control power from standby via RS-232"
  - description: "MAC address of TV required for client ID — press Menu > Network > Network Information to obtain"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond setup notes
```

## Notes
RS-232 DB9 female connector on TV chassis. Use USB-to-Serial adapter if controller has only USB. Protocol is case-sensitive ASCII. Checksum is 8-bit sum of all bytes including checksum byte = 0 mod 256. Termination is carriage return (0x0D).

Two command variants: TV-specific (uses last 3 MAC bytes as client ID, e.g., "5FA") and generic (uses "ALL" for broadcast). Examples use MAC suffix "465" in TV-specific column.

IR discrete codes use Pronto CCF hex format — full CCF code strings provided in source for each function. IR codes use custom 04FB device code with data codes and complements as documented in tables.

Power on via RS-232 requires enabling Power On Command in Custom Install menu before TV goes to standby.

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:53:26.291Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T05:53:26.291Z
matched_actions: 232
action_count: 232
confidence: high
summary: "All 232 actions matched source; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
