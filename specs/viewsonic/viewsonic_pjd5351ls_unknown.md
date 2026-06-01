---
spec_id: admin/viewsonic-pjd5351ls
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic PJD5351LS Control Spec"
manufacturer: ViewSonic
model_family: PJD5351LS
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - PJD5351LS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-19T17:13:33.595Z
generated_at: 2026-05-19T17:13:33.595Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:13:33.595Z
  matched_actions: 81
  action_count: 81
  confidence: high
  summary: "All 81 spec actions matched to source RS-232 command list entries with correct polarity and shape; transport port 4661 confirmed in source note 2."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# ViewSonic PJD5351LS Control Spec

## Summary
ViewSonic projector supporting RS-232 and LAN (TCP) control. Generic projector protocol applicable to all ViewSonic projectors. Serial: DSUB 9-Pin Male, crossover cable required, 3-wire control. LAN: same command format as serial but with hex-to-backslash substitution via port 4661.

<!-- UNRESOLVED: specific port/baud defaults not stated; multiple baud rates supported (2400–115200). Specific firmware version not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null
  data_bits: 8
  parity: null
  stop_bits: null
  flow_control: null
addressing:
  port: 4661
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_status
  label: Power Status
  kind: query
  params: []

- id: projector_status
  label: Projector Status
  kind: query
  params: []

- id: reset_all_settings
  label: Reset All Settings
  kind: action
  params: []

- id: reset_color_settings
  label: Reset Color Settings
  kind: action
  params: []

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Black
        - Blue
        - ViewSonic
        - ScreenCapture
        - "OFF"

- id: quick_power_off
  label: Quick Power Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: high_altitude_mode
  label: High Altitude Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: light_source_mode
  label: Light Source Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Normal
        - Eco
        - DynamicEco
        - SuperEco

- id: message
  label: Message
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: projector_position
  label: Projector Position
  kind: action
  params:
    - name: value
      type: enum
      values:
        - FrontTable
        - RearTable
        - RearCeiling
        - FrontCeiling

- id: d3_sync
  label: 3D Sync
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "OFF"
        - Auto
        - FrameSequential
        - FramePacking
        - TopBottom
        - SidebySide

- id: d3_sync_invert
  label: 3D Sync Invert
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: contrast_get
  label: Contrast Get Value
  kind: query
  params: []

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: brightness_get
  label: Brightness Get Value
  kind: query
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Auto
        - 4:3
        - 16:9
        - 16:10
        - Anamorphic
        - Wide
        - 2.35:1
        - Panorama
        - Native
        - Cycle

- id: aspect_ratio_get
  label: Aspect Ratio Get Value
  kind: query
  params: []

- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []

- id: horizontal_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: enum
      values:
        - ShiftRight
        - ShiftLeft

- id: horizontal_position_get
  label: Horizontal Position Get Value
  kind: query
  params: []

- id: vertical_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: enum
      values:
        - ShiftUp
        - ShiftDown

- id: vertical_position_get
  label: Vertical Position Get Value
  kind: query
  params: []

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Warm
        - Normal
        - Neutral
        - Cool

- id: color_temperature_get
  label: Color Temperature Get Value
  kind: query
  params: []

- id: blank
  label: Blank
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: keystone_vertical
  label: Keystone Vertical
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: keystone_vertical_get
  label: Keystone Vertical Get Value
  kind: query
  params: []

- id: keystone_horizontal
  label: Keystone Horizontal
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: keystone_horizontal_get
  label: Keystone Horizontal Get Value
  kind: query
  params: []

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Brightest
        - Movie
        - Standard
        - sRGB
        - Dynamic
        - Rec709
        - DICOMSIM
        - Sports
        - Photo
        - Presentation
        - Gaming
        - Vivid
        - ISFDay
        - ISFNight
        - Cycle

- id: color_mode_status
  label: Color Mode Status
  kind: query
  params: []

- id: reset_current_color_settings
  label: Reset Current Color Settings
  kind: action
  params: []

- id: isf_mode
  label: ISF Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: isf_mode_status
  label: ISF Mode Status
  kind: query
  params: []

- id: hdr
  label: HDR
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Auto
        - SDR

- id: hdr_status
  label: HDR Status
  kind: query
  params: []

- id: primary_color
  label: Primary Color
  kind: action
  params:
    - name: value
      type: enum
      values:
        - R
        - G
        - B
        - C
        - M
        - Y

- id: primary_color_status
  label: Primary Color Status
  kind: query
  params: []

- id: hue
  label: Hue/Tint
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: hue_get
  label: Hue/Tint Get Value
  kind: query
  params: []

- id: saturation
  label: Saturation
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: saturation_get
  label: Saturation Get Value
  kind: query
  params: []

- id: gain
  label: Gain
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: gain_get
  label: Gain Get Value
  kind: query
  params: []

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Decrease
        - Increase

- id: sharpness_get
  label: Sharpness Get Value
  kind: query
  params: []

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: freeze_status
  label: Freeze Status
  kind: query
  params: []

- id: source_input
  label: Source Input
  kind: action
  params:
    - name: value
      type: enum
      values:
        - DSubComp1
        - DSubComp2
        - HDMI1
        - HDMI2
        - HDMI3
        - HDMIMHL4
        - CompositeVideo
        - SVideo
        - DVI
        - Component
        - HDBaseT
        - USBC
        - USBReader
        - LANWiFiDisplay
        - USBDisplay

- id: source_input_status
  label: Source Input Status
  kind: query
  params: []

- id: quick_auto_search
  label: Quick Auto Search
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: mute
  label: Mute
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: volume
  label: Volume
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Increase
        - Decrease

- id: volume_write_value
  label: Volume Write Value
  kind: action
  params:
    - name: value
      type: integer

- id: volume_get
  label: Volume Get Value
  kind: query
  params: []

- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: enum
      values:
        - English
        - French
        - German
        - Italian
        - Spanish
        - Russian
        - TraditionalChinese
        - SimplifiedChinese
        - Japanese
        - Korean
        - Swedish
        - Dutch
        - Turkish
        - Czech
        - Portuguese
        - Thai
        - Polish
        - Finnish
        - Arabic
        - Indonesian
        - Hindi
        - Vietnamese

- id: language_status
  label: Language Status
  kind: query
  params: []

- id: light_source_usage_time_reset
  label: Light Source Usage Time Reset
  kind: action
  params: []

- id: light_source_usage_time_get
  label: Light Source Usage Time Get
  kind: query
  params: []

- id: hdmi_format
  label: HDMI Format
  kind: action
  params:
    - name: value
      type: enum
      values:
        - RGB
        - YUV
        - Auto

- id: hdmi_format_status
  label: HDMI Format Status
  kind: query
  params: []

- id: hdmi_range
  label: HDMI Range
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Enhanced
        - Normal
        - Auto

- id: hdmi_range_status
  label: HDMI Range Status
  kind: query
  params: []

- id: cec
  label: CEC
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "ON"
        - "OFF"

- id: cec_status
  label: CEC Status
  kind: query
  params: []

- id: error_status
  label: Error Status
  kind: query
  params: []

- id: brilliant_color
  label: Brilliant Color
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "OFF"
        - Color1
        - Color2
        - Color3
        - Color4
        - Color5
        - Color6
        - Color7
        - Color8
        - Color9
        - Color10

- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  params: []

- id: remote_control_code
  label: Remote Control Code
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Code1
        - Code2
        - Code3
        - Code4
        - Code5
        - Code6
        - Code7
        - Code8

- id: remote_control_code_status
  label: Remote Control Code Status
  kind: query
  params: []

- id: screen_color
  label: Screen Color
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "OFF"
        - Blackboard
        - Greenboard
        - Whiteboard
        - Blueboard

- id: screen_color_status
  label: Screen Color Status
  kind: query
  params: []

- id: over_scan
  label: Over Scan
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "OFF"
        - Value1
        - Value2
        - Value3
        - Value4
        - Value5

- id: over_scan_get
  label: Over Scan Get Value
  kind: query
  params: []

- id: remote_key
  label: Remote Key
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Menu
        - Exit
        - Top
        - Bottom
        - Left
        - Right
        - Source
        - Enter
        - Auto
        - MyButton

- id: operating_temperature_get
  label: Operating Temperature Get
  kind: query
  params: []

- id: lamp_mode_cycle
  label: Lamp Mode Cycle
  kind: action
  params: []

- id: audio_mode_cycle
  label: Audio Mode Cycle
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "ON"
    - "OFF"

- id: projector_state
  label: Projector State
  type: enum
  values:
    - WarmUp
    - CoolDown
    - PowerOn
    - PowerDown

- id: error_code
  label: Error Status
  type: object
```

## Variables
```yaml
- id: contrast_value
  label: Contrast Value
  type: integer

- id: brightness_value
  label: Brightness Value
  type: integer

- id: aspect_ratio_value
  label: Aspect Ratio Value
  type: integer

- id: horizontal_position_value
  label: Horizontal Position Value
  type: integer

- id: vertical_position_value
  label: Vertical Position Value
  type: integer

- id: color_temperature_value
  label: Color Temperature Value
  type: integer

- id: keystone_vertical_value
  label: Keystone Vertical Value
  type: integer

- id: keystone_horizontal_value
  label: Keystone Horizontal Value
  type: integer

- id: primary_color_value
  label: Primary Color Value
  type: integer

- id: hue_value
  label: Hue/Tint Value
  type: integer

- id: saturation_value
  label: Saturation Value
  type: integer

- id: gain_value
  label: Gain Value
  type: integer

- id: sharpness_value
  label: Sharpness Value
  type: integer

- id: volume_value
  label: Volume Value
  type: integer

- id: light_source_usage_hours
  label: Light Source Usage Hours
  type: integer

- id: operating_temperature_value
  label: Operating Temperature (Celsius)
  type: number

- id: over_scan_value
  label: Over Scan Value
  type: integer
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Projector Status commands: during Warm Up or Cool Down states, do not send other commands. Wait for Power On state before issuing further commands."
  source: "Note 7 - Status explanation"
```

## Notes
Spec covers all ViewSonic projectors. Serial uses crossover (null modem) cable; only 3 pins needed for control. LAN control uses same command format as serial with 0x-to-\ substitution via port 4661. Command packet format includes checksum byte. Response packets may be 1-byte or 2-byte format depending on command type. Multiple baud rates supported: 2400/4800/9600/14400/19200/38400/115200 — specific default not stated. HDMI Range values map to different step ranges (Enhanced: 0–255, Normal: 16–235). Light Source Usage Time response format uses bytes 7–10 as HEX2DEC(ddccbbaa). Error status response is 32 bytes total (20 items). When first response byte is 0x00, function is disabled (greyed out in OSD).
<!-- UNRESOLVED: baud rate default not stated. Data bits only inferred as 8. Parity/stop bits/flow control not stated. Specific firmware version compatibility not stated. TCP keepalive or session behavior not documented. -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-19T17:13:33.595Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:13:33.595Z
matched_actions: 81
action_count: 81
confidence: high
summary: "All 81 spec actions matched to source RS-232 command list entries with correct polarity and shape; transport port 4661 confirmed in source note 2."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
