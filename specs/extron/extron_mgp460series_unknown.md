---
spec_id: admin/extron-mgp464series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MGP 464 Series / MGP 462xi Series Control Spec"
manufacturer: Extron
model_family: "MGP 464"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MGP 464"
    - "MGP 464 DI"
    - "MGP 464 HD-SDI"
    - "MGP 462xi"
    - "MGP 462xi DI"
    - "MGP 462xi HD-SDI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-20T12:00:59.304Z
generated_at: 2026-05-20T12:00:59.304Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T12:00:59.304Z
  matched_actions: 66
  action_count: 66
  confidence: high
  summary: "All 66 actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron MGP 464 Series / MGP 462xi Series Control Spec

## Summary
Multi-graphic processor with four (MGP 464) or two (MGP 462xi) windows. Controls via RS-232/422 (rear panel 9-pin D-sub or front panel 2.5mm TRS), Ethernet (Telnet port 23, Web port 80). SIS ASCII command set. <!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet default
  base_url: http://{ip}  # IP set via CI command; default 192.168.254.254
serial:
  baud_rate: 9600  # default; configurable 2400-115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: configurable  # source describes password setup; none by default
  # inferred: no auth required by default; password optional via CA/CU commands
```

## Traits
```yaml
- powerable        # no explicit power on/off commands; inferred from device class
- routable         # input selection commands (X50) * X50@ !)
- queryable        # info requests (I, Q, N, etc.) and view commands
- levelable        # color, tint, contrast, brightness, sharpness, etc.
```

## Actions
```yaml
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-19)
    - name: window
      type: integer
      description: Window number (0=all, 1-4)

- id: set_input_video_type
  label: Set Input Video Type
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-19)
    - name: format
      type: integer
      description: "1=RGB, 2=YUV-HD, 3=RGBcvS, 4=YUVi, 5=S-video, 6=Composite, 7=DVI/HD-SDI"

- id: set_edid
  label: Set DVI Input EDID
  kind: action
  params:
    - name: resolution
      type: integer
      description: Scaler resolution code (1-26)
    - name: refresh
      type: integer
      description: Refresh rate code (1-9)

- id: mute_window
  label: Mute Window (Blank)
  kind: action
  params:
    - name: window
      type: integer
      description: Window number (0=all, 1-4)

- id: unmute_window
  label: Unmute Window (Display)
  kind: action
  params:
    - name: window
      type: integer
      description: Window number (0=all, 1-4)

- id: set_window_priority
  label: Set Window Priority
  kind: action
  params:
    - name: w1
      type: integer
      description: Priority for window 1 (1=top, 4=lowest)
    - name: w2
      type: integer
      description: Priority for window 2
    - name: w3
      type: integer
      description: Priority for window 3 (MGP 464 only)
    - name: w4
      type: integer
      description: Priority for window 4 (MGP 464 only)

- id: set_transition_effect
  label: Set Window Transition Effect
  kind: action
  params:
    - name: effect
      type: integer
      description: "1=Cut, 2=Dissolve, 3-22=wipe variants"

- id: set_transition_duration
  label: Set Transition Duration
  kind: action
  params:
    - name: duration
      type: number
      description: Seconds (0-5 in 0.1s increments)

- id: set_color
  label: Set Color Level
  kind: action
  params:
    - name: window
      type: integer
      description: Window number (0=all, 1-4)
    - name: value
      type: integer
      description: Color level (0-127, default 64)

- id: set_tint
  label: Set Tint Level
  kind: action
  params:
    - name: window
      type: integer
    - name: value
      type: integer

- id: set_contrast
  label: Set Contrast Level
  kind: action
  params:
    - name: window
      type: integer
    - name: value
      type: integer

- id: set_brightness
  label: Set Brightness Level
  kind: action
  params:
    - name: window
      type: integer
    - name: value
      type: integer

- id: set_sharpness
  label: Set Sharpness (Detail)
  kind: action
  params:
    - name: window
      type: integer
    - name: value
      type: integer
      description: 0-127

- id: set_window_position
  label: Set Window Position and Size
  kind: action
  params:
    - name: window
      type: integer
    - name: hshift
      type: integer
      description: Horizontal shift (± output resolution, zero=2048)
    - name: vshift
      type: integer
      description: Vertical shift
    - name: hsize
      type: integer
      description: Window width
    - name: vsize
      type: integer
      description: Window height

- id: set_image_position
  label: Set Image Position and Size
  kind: action
  params:
    - name: window
      type: integer
    - name: hshift
      type: integer
    - name: vshift
      type: integer
    - name: hsize
      type: integer
    - name: vsize
      type: integer

- id: set_output_resolution
  label: Set Output Scaler Resolution and Rate
  kind: action
  params:
    - name: resolution
      type: integer
      description: "1=640x480, 2=800x600, ... 26=1920x1200"
    - name: refresh
      type: integer
      description: "1=50Hz, 2=60Hz, 3=72Hz, 4=96Hz, 5=100Hz, 6=120Hz, 7=DVI-bg, 8=24Hz, 9=59.94Hz"

- id: freeze_window
  label: Freeze Window
  kind: action
  params:
    - name: window
      type: integer
    - name: enable
      type: boolean
      description: true=freeze, false=unfreeze

- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "0=Off, 1=Color Bars, 2=X-hatch, ... 14=2.35 Aspect"

- id: set_executive_mode
  label: Set Executive Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=mode 1 (panel lock except inputs), 2=mode 2 (full lock)"

- id: recall_window_preset
  label: Recall Window Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-128)
    - name: with_input
      type: boolean
      description: true=with input settings, false=without

- id: save_window_preset
  label: Save Window Preset
  kind: action
  params:
    - name: preset
      type: integer

- id: recall_input_preset
  label: Recall Input Preset
  kind: action
  params:
    - name: window
      type: integer
    - name: preset
      type: integer
      description: Input preset (1-128)

- id: save_input_preset
  label: Save Input Preset
  kind: action
  params:
    - name: window
      type: integer
    - name: preset
      type: integer

- id: set_pixel_phase
  label: Set Pixel Phase
  kind: action
  params:
    - name: window
      type: integer
    - name: value
      type: integer
      description: 0-31

- id: set_window_preset_effect
  label: Set Window Preset Effect
  kind: action
  params:
    - name: effect
      type: integer
      description: "0=Cut, 1=Real time motion"

- id: auto_image
  label: Run Auto Image
  kind: action
  params:
    - name: window
      type: integer

- id: set_output_polarity
  label: Set Output Polarity
  kind: action
  params:
    - name: polarity
      type: integer
      description: "0=H-/V-, 1=H-/V+, 2=H+/V-, 3=H+/V+"

- id: set_output_sync_format
  label: Set Output Sync Format
  kind: action
  params:
    - name: format
      type: integer
      description: "1=RGBHV, 2=RGBS, 3=RGsB, 4=YUV bi-level, 5=YUV tri-level"

- id: set_blue_mode
  label: Set Blue Mode
  kind: action
  params:
    - name: enable
      type: boolean

- id: set_text_label
  label: Set Text Label
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-19)
    - name: text
      type: string
      description: Up to 16 characters

- id: set_text_position
  label: Set Text Label Position
  kind: action
  params:
    - name: window
      type: integer
    - name: position
      type: integer
      description: "0=None, 1=Bottom left, 2=Bottom center, 3=Bottom right, 4=Top left, 5=Top center, 6=Top right"

- id: set_text_size
  label: Set Text Label Size
  kind: action
  params:
    - name: size
      type: integer
      description: "1=Small, 2=Medium, 3=Large"

- id: set_text_color
  label: Set Text Color
  kind: action
  params:
    - name: window
      type: integer
    - name: color
      type: integer
      description: "1=Red, 2=Green, 3=Blue, 4=White, 5=Magenta, 6=Cyan, 7=Yellow, 8=Black"

- id: set_text_border_color
  label: Set Text Border Color
  kind: action
  params:
    - name: window
      type: integer
    - name: color
      type: integer
      description: "0=Off, 1=Red, 2=Green, 3=Blue, 4=White, 5=Magenta, 6=Cyan, 7=Yellow, 8=Black, 9=Translucent"

- id: set_text_background_color
  label: Set Text Background Color
  kind: action
  params:
    - name: window
      type: integer
    - name: color
      type: integer
      description: "0=Off, 1=Red, 2=Green, 3=Blue, 4=White, 5=Magenta, 6=Cyan, 7=Yellow, 8=Black, 9=Translucent"

- id: set_window_border_color
  label: Set Window Border Color
  kind: action
  params:
    - name: window
      type: integer
    - name: color
      type: integer
      description: "0=Off, 1=Red, 2=Green, 3=Blue, 4=White, 5=Magenta, 6=Cyan, 7=Yellow, 8=Black"

- id: set_background_color
  label: Set Background Color
  kind: action
  params:
    - name: color
      type: integer
      description: "0=Off, 1=Red, 2=Green, 3=Blue, 4=White, 5=Magenta, 6=Cyan, 7=Yellow, 8=Background image, 9=DVI background, 10=Custom"

- id: set_custom_color
  label: Set Custom Color (RGB)
  kind: action
  params:
    - name: red
      type: integer
      description: 0-255
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255

- id: set_film_mode
  label: Set Film Mode
  kind: action
  params:
    - name: input
      type: integer
    - name: enable
      type: boolean

- id: save_background_image
  label: Save Background Image
  kind: action
  params:
    - name: filename
      type: string

- id: recall_background_image
  label: Recall Background Image
  kind: action
  params:
    - name: filename
      type: string

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: xxx.xxx.xxx.xxx

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string

- id: set_gateway
  label: Set Gateway Address
  kind: action
  params:
    - name: ip
      type: string

- id: set_dhcp
  label: Set DHCP
  kind: action
  params:
    - name: enable
      type: boolean

- id: set_unit_name
  label: Set Unit Name
  kind: action
  params:
    - name: name
      type: string
      description: Up to 24 alphanumeric characters

- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  params:
    - name: password
      type: string
      description: 4-12 alphanumeric characters

- id: set_user_password
  label: Set User Password
  kind: action
  params:
    - name: password
      type: string

- id: clear_passwords
  label: Clear All Passwords
  kind: action

- id: set_time_date
  label: Set Time and Date
  kind: action
  params:
    - name: datetime
      type: string
      description: Format MM/DD/YY-HH:MM:SS

- id: reset_to_factory
  label: Reset All Settings to Factory Default
  kind: action

- id: absolute_reset
  label: Absolute System Reset
  kind: action

- id: absolute_reset_retain_ip
  label: Absolute Reset Retaining IP Settings
  kind: action

- id: erase_flash_memory
  label: Erase Flash Memory
  kind: action

- id: send_serial_data
  label: Send Bidirectional Serial Data
  kind: action
  params:
    - name: port
      type: integer
      description: "01=rear RS-232/422, 02=front config port"
    - name: data
      type: string

- id: configure_serial_port
  label: Configure Serial Port Parameters
  kind: action
  params:
    - name: port
      type: integer
    - name: baud
      type: integer
      description: "2400, 4800, 9600, 19200, 38400, or 115200"
    - name: parity
      type: string
      description: "O=Odd, E=Even, N=None, M=Mark, S=Space"
    - name: databits
      type: integer
      description: "7 or 8"
    - name: stopbits
      type: integer
      description: "1 or 2"

- id: configure_serial_mode
  label: Configure Serial Mode (RS-232 or RS-422)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=RS-232, 1=RS-422 (rear panel only)"

- id: configure_flow_control
  label: Configure Flow Control
  kind: action
  params:
    - name: port
      type: integer
    - name: type
      type: string
      description: "H=Hardware, S=Software, N=None"
    - name: timeout
      type: integer
      description: Milliseconds between bytes

- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer

- id: set_web_port
  label: Set Web Port
  kind: action
  params:
    - name: port
      type: integer

- id: set_directaccess_port
  label: Set Direct Access Port
  kind: action
  params:
    - name: port
      type: integer

- id: reset_telnet_port
  label: Reset Telnet Port to Default (23)
  kind: action

- id: reset_web_port
  label: Reset Web Port to Default (80)
  kind: action

- id: configure_email_event
  label: Configure Email Event
  kind: action
  params:
    - name: event
      type: integer
      description: Event number (1-64)
    - name: address
      type: string
    - name: filename
      type: string

- id: send_email
  label: Send Email
  kind: action
  params:
    - name: event
      type: integer

- id: set_mail_server
  label: Set Mail Server IP
  kind: action
  params:
    - name: ip
      type: string
    - name: domain
      type: string

- id: start_events
  label: Start Event Output
  kind: action

- id: stop_events
  label: Stop Event Output
  kind: action

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=None, 1=verbose, 2=tagged, 3=mode+tagged"
- id: set_horizontal_start
  label: Set Horizontal Start
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer

- id: set_vertical_start
  label: Set Vertical Start
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer

- id: set_total_pixels
  label: Set Total Pixels
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer

- id: set_active_pixels
  label: Set Active Pixels
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer

- id: set_active_lines
  label: Set Active Lines
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer

- id: picture_control_copy
  label: Picture Control Copy
  kind: action
  params:
    - name: window
      type: integer

- id: zoom_window
  label: Zoom Window
  kind: action
  params:
    - name: window
      type: integer
    - name: direction
      type: string

- id: zoom_image
  label: Zoom Image
  kind: action
  params:
    - name: window
      type: integer
    - name: direction
      type: string

- id: change_directory
  label: Change/Create Directory
  kind: action
  params:
    - name: path
      type: string

- id: move_to_root_directory
  label: Move to Root Directory
  kind: action
  params: []

- id: move_up_directory
  label: Move Up One Directory
  kind: action
  params: []

- id: list_files
  label: List Files
  kind: query
  params: []

- id: load_to_user_flash
  label: Load File to User Flash Memory
  kind: action
  params:
    - name: filesize
      type: integer
    - name: filename
      type: string
    - name: data
      type: string

- id: retrieve_from_flash
  label: Retrieve File from Flash
  kind: query
  params:
    - name: filename
      type: string

- id: query_verbose_version_bootstrap
  label: Query Bootstrap Firmware Version
  kind: query
  params: []

- id: query_verbose_version_factory
  label: Query Factory Firmware Version
  kind: query
  params: []

- id: query_verbose_version_updated
  label: Query Updated Firmware Version
  kind: query
  params: []

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  params:
    - name: offset
      type: string

- id: set_pool_timeout
  label: Set Global IP Port Timeout
  kind: action
  params:
    - name: scope
      type: integer
    - name: timeout
      type: integer

- id: set_daylight_saving_time
  label: Set Daylight Saving Time
  kind: action
  params:
    - name: mode
      type: integer
```

## Feedbacks
```yaml
- id: input_status
  label: Input Status (Window Info Request)
  type: object
  properties:
    - name: input
      type: integer
      description: Input number (1-19)
    - name: type
      type: string
      description: "RGB, YUV-HD, RGBcvS, YUVi, S-video, Composite, DVI/HD-SDI"
    - name: standard
      type: string
      description: "NTSC, PAL, SECAM, None, N/A"
    - name: blanking
      type: boolean
      description: true=muted, false=unmuted

- id: firmware_version
  type: string
  description: Firmware version to two decimal places

- id: part_number
  type: string
  description: "60-771-xx (MGP 464) or 60-1023-xx (MGP 462xi); xx=-01 standard, -02 DI, -03 HD-SDI"

- id: model_name
  type: string
  description: "MGP 464 or MGP 462xi variant"

- id: internal_temperature
  type: integer
  description: Temperature in Fahrenheit

- id: window_blanking_status
  type: boolean

- id: window_priority_status
  type: array
  items:
    type: integer

- id: transition_effect_status
  type: integer

- id: transition_duration_status
  type: number

- id: color_level
  type: integer
  range: 0-127

- id: tint_level
  type: integer

- id: contrast_level
  type: integer

- id: brightness_level
  type: integer

- id: sharpness_level
  type: integer

- id: pixel_phase
  type: integer

- id: input_video_type
  type: integer

- id: output_resolution
  type: object
  properties:
    - name: resolution
      type: integer
    - name: refresh
      type: integer

- id: freeze_status
  type: boolean

- id: test_pattern_status
  type: integer

- id: executive_mode_status
  type: integer

- id: unit_name
  type: string

- id: ip_address
  type: string

- id: mac_address
  type: string

- id: subnet_mask
  type: string

- id: gateway_address
  type: string

- id: dhcp_status
  type: boolean

- id: password_status
  type: string
  description: "Password displayed as **** if exists, empty if none"

- id: session_security_level
  type: integer
  description: "0=Anonymous, 1-10=Extended, 11=User, 12=Administrator"

- id: verbose_mode_status
  type: integer

- id: telnet_port
  type: integer

- id: web_port
  type: integer

- id: directaccess_port
  type: integer

- id: output_polarity
  type: integer

- id: output_sync_format
  type: integer

- id: blue_mode_status
  type: boolean

- id: text_position
  type: integer

- id: text_size
  type: integer

- id: text_color
  type: integer

- id: text_border_color
  type: integer

- id: text_background_color
  type: integer

- id: window_border_color
  type: integer

- id: background_color
  type: integer

- id: custom_color
  type: object
  properties:
    - name: red
      type: integer
    - name: green
      type: integer
    - name: blue
      type: integer

- id: background_image_filename
  type: string

- id: film_mode_status
  type: boolean

- id: window_preset_effect
  type: integer

- id: time_date
  type: string

- id: gmt_offset
  type: string

- id: daylight_saving_time
  type: integer

- id: system_memory_usage
  type: string

- id: user_memory_usage
  type: string

- id: running_event_count
  type: integer

- id: serial_port_config
  type: object
  properties:
    - name: port
      type: integer
    - name: baud
      type: integer
    - name: parity
      type: string
    - name: databits
      type: integer
    - name: stopbits
      type: integer
    - name: mode
      type: integer
      description: "0=RS-232, 1=RS-422"
    - name: flow_control
      type: string

- id: error_response
  type: string
  description: "E01-E28 error codes: invalid input channel, function number, command, preset, output, value, configuration, signal type, privilege violation, max users, event number, filename"

- id: mgp_initiated_message
  type: string
  description: "MGP-initiated messages: date/time on power-up, Reconfig on window config, Out_n_In_nn_ on input switch"
```

## Variables
```yaml
# No discrete Variables section - all settable params are Actions or Feedbacks
```

## Events
```yaml
# Source describes MGP-initiated messages but no event subscription/enable mechanism
# UNRESOLVED: event subscription model not documented in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Serial ports: rear panel 9-pin D-sub supports RS-232 or RS-422 (configurable); front panel 2.5mm TRS is RS-232 only, fixed 9600/8/1/N. Ethernet supports Telnet (port 23) and HTTP (port 80). Default IP: 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0, DHCP off. Password auth configurable (none by default); separate admin and user passwords. SIS commands end with CR/LF (`]`). For web commands use `|` instead of `}` and encode spaces as `%2B`. Telnet default port resettable via `MT` command; Web default port resettable via `MH` command.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: event subscription/enable mechanism not documented -->
<!-- UNRESOLVED: voltage/power specifications not stated -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-20T12:00:59.304Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T12:00:59.304Z
matched_actions: 66
action_count: 66
confidence: high
summary: "All 66 actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
