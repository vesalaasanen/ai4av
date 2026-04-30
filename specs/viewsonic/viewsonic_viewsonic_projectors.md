---
schema_version: ai4av-public-spec-v1
device_id: viewsonic/viewsonic-projectors
entity_id: viewsonic_viewsonic_projectors
spec_id: admin/viewsonic-projectors
revision: 1
author: admin
title: "ViewSonic Projectors Control Spec"
status: published
manufacturer: ViewSonic
manufacturer_key: viewsonic
model_family: "ViewSonic Projectors"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "ViewSonic Projectors"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "ViewSonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "ViewSonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-26T22:56:46.252Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T22:56:46.252Z
  matched_actions: 112
  action_count: 112
  confidence: high
  summary: "All 112 spec actions matched source; transport parameters verified; comprehensive command coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# ViewSonic Projectors Control Spec

## Summary
ViewSonic projectors supporting RS-232 (DSUB 9-Pin) and LAN (TCP/IP) control. Default serial settings: 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control. LAN control uses port 4661 (port 23 for Pro9 series). Commands use a checksum-protected packet format with projector acknowledgment. No authentication required.

<!-- UNRESOLVED: specific model names not enumerated in source; this spec covers the general protocol applicable to ViewSonic projectors supporting this command set -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200  # default; also supports 4800/9600/38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 4661  # LAN control port; port 23 for Pro9 series (per source note 2)
auth:
  type: none  # inferred: no auth procedure in source
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
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_read
  label: Read Power Status
  kind: action
  params: []

# Splash Screen
- id: splash_black
  label: Set Splash Screen Black
  kind: action
  params: []
- id: splash_blue
  label: Set Splash Screen Blue
  kind: action
  params: []
- id: splash_read
  label: Read Splash Screen Status
  kind: action
  params: []

# Quick Power Off
- id: quick_power_off_set
  label: Set Quick Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: quick_power_off_read
  label: Read Quick Power Off Status
  kind: action
  params: []

# High Altitude Mode
- id: high_altitude_off
  label: Set High Altitude Mode OFF
  kind: action
  params: []
- id: high_altitude_on
  label: Set High Altitude Mode ON
  kind: action
  params: []
- id: high_altitude_auto
  label: Set High Altitude Mode AUTO
  kind: action
  params: []
- id: high_altitude_read
  label: Read High Altitude Mode Status
  kind: action
  params: []

# Lamp / Light Source Mode
- id: lamp_normal
  label: Set Lamp Mode Normal
  kind: action
  params: []
- id: lamp_full_normal
  label: Set Lamp Mode Full Normal
  kind: action
  params: []
- id: lamp_eco
  label: Set Lamp Mode Eco
  kind: action
  params: []
- id: lamp_eco_extended
  label: Set Lamp Mode Eco Extended
  kind: action
  params: []
- id: lamp_read
  label: Read Lamp Mode Status
  kind: action
  params: []

# Presentation Timer
- id: timer_off
  label: Set Presentation Timer OFF
  kind: action
  params: []
- id: timer_1
  label: Set Presentation Timer 1
  kind: action
  params: []
- id: timer_2
  label: Set Presentation Timer 2
  kind: action
  params: []
- id: timer_3
  label: Set Presentation Timer 3
  kind: action
  params: []
- id: timer_read
  label: Read Presentation Timer Status
  kind: action
  params: []

# Contrast
- id: contrast_write
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0=reset, 1+=increment
- id: contrast_read
  label: Read Contrast Status
  kind: action
  params: []

# Brightness
- id: brightness_write
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0=reset, 1+=increment
- id: brightness_read
  label: Read Brightness Status
  kind: action
  params: []

# White Balance Red Gain
- id: wb_red_increase
  label: White Balance Red Gain Increase
  kind: action
  params: []
- id: wb_red_decrease
  label: White Balance Red Gain Decrease
  kind: action
  params: []
- id: wb_red_read
  label: Read White Balance Red Gain Status
  kind: action
  params: []

# White Balance Green Gain
- id: wb_green_increase
  label: White Balance Green Gain Increase
  kind: action
  params: []
- id: wb_green_decrease
  label: White Balance Green Gain Decrease
  kind: action
  params: []
- id: wb_green_read
  label: Read White Balance Green Gain Status
  kind: action
  params: []

# White Balance Blue Gain
- id: wb_blue_increase
  label: White Balance Blue Gain Increase
  kind: action
  params: []
- id: wb_blue_decrease
  label: White Balance Blue Gain Decrease
  kind: action
  params: []
- id: wb_blue_read
  label: Read White Balance Blue Gain Status
  kind: action
  params: []

# Sharpness
- id: sharpness_write
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0=reset, 1+=increment
- id: sharpness_read
  label: Read Sharpness Status
  kind: action
  params: []

# Zoom
- id: zoom_write
  label: Set Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 1=in, 2=out
- id: zoom_read
  label: Read Zoom Status
  kind: action
  params: []

# Focus
- id: focus_write
  label: Set Focus
  kind: action
  params:
    - name: value
      type: integer
      description: 1=near, 2=far
- id: focus_read
  label: Read Focus Status
  kind: action
  params: []

# Freeze
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: freeze_read
  label: Read Freeze Status
  kind: action
  params: []

# Aspect Ratio
- id: aspect_auto
  label: Set Aspect Ratio Auto
  kind: action
  params: []
- id: aspect_4_3
  label: Set Aspect Ratio 4:3
  kind: action
  params: []
- id: aspect_16_9
  label: Set Aspect Ratio 16:9
  kind: action
  params: []
- id: aspect_16_10
  label: Set Aspect Ratio 16:10
  kind: action
  params: []
- id: aspect_panorama
  label: Set Aspect Ratio Panorama
  kind: action
  params: []
- id: aspect_2_35_1
  label: Set Aspect Ratio 2.35:1
  kind: action
  params: []
- id: aspect_2_35_2
  label: Set Aspect Ratio 2.35:2
  kind: action
  params: []
- id: aspect_native
  label: Set Aspect Ratio Native
  kind: action
  params: []
- id: aspect_read
  label: Read Aspect Ratio Status
  kind: action
  params: []

# Source Input
- id: source_dsub_comp1
  label: Set Source D-Sub / Comp.1
  kind: action
  params: []
- id: source_hdmi1
  label: Set Source HDMI 1
  kind: action
  params: []
- id: source_hdmi2
  label: Set Source HDMI 2
  kind: action
  params: []
- id: source_hbaset
  label: Set Source HbaseT
  kind: action
  params: []
- id: source_usb_reader
  label: Set Source USB Reader / USB1
  kind: action
  params: []
- id: source_lan_wifi
  label: Set Source LAN / WiFi Display
  kind: action
  params: []
- id: source_usb_display
  label: Set Source USB Display
  kind: action
  params: []
- id: source_read
  label: Read Source Status
  kind: action
  params: []

# Quick Auto Search
- id: quick_auto_search_on
  label: Set Quick Auto Search ON
  kind: action
  params: []
- id: quick_auto_search_off
  label: Set Quick Auto Search OFF
  kind: action
  params: []
- id: quick_auto_search_read
  label: Read Quick Auto Search Status
  kind: action
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_read
  label: Read Mute Status
  kind: action
  params: []

# Volume
- id: volume_increase
  label: Volume Increase
  kind: action
  params: []
- id: volume_decrease
  label: Volume Decrease
  kind: action
  params: []
- id: volume_set
  label: Volume Set Value
  kind: action
  params:
    - name: value
      type: integer
      description: Volume level value
- id: volume_read
  label: Read Volume Status
  kind: action
  params: []

# DDE Mode
- id: dde_film
  label: Set DDE Mode Film
  kind: action
  params: []
- id: dde_video
  label: Set DDE Mode Video
  kind: action
  params: []
- id: dde_standard
  label: Set DDE Mode Standard
  kind: action
  params: []
- id: dde_read
  label: Read DDE Mode Status
  kind: action
  params: []

# Color Temperature
- id: color_temp_6500k
  label: Set Color Temperature 6500K
  kind: action
  params: []
- id: color_temp_7000k
  label: Set Color Temperature 7000K
  kind: action
  params: []
- id: color_temp_7500k
  label: Set Color Temperature 7500K
  kind: action
  params: []
- id: color_temp_9000k
  label: Set Color Temperature 9000K
  kind: action
  params: []
- id: color_temp_9300k
  label: Set Color Temperature 9300K
  kind: action
  params: []
- id: color_temp_user1
  label: Set Color Temperature User1
  kind: action
  params: []
- id: color_temp_user2
  label: Set Color Temperature User2
  kind: action
  params: []
- id: color_temp_user3
  label: Set Color Temperature User3
  kind: action
  params: []
- id: color_temp_user4
  label: Set Color Temperature User4
  kind: action
  params: []
- id: color_temp_read
  label: Read Color Temperature Status
  kind: action
  params: []

# Color Space
- id: colorspace_auto
  label: Set Color Space Auto
  kind: action
  params: []
- id: colorspace_rgb
  label: Set Color Space RGB
  kind: action
  params: []
- id: colorspace_yuv
  label: Set Color Space YUV
  kind: action
  params: []
- id: colorspace_read
  label: Read Color Space Status
  kind: action
  params: []

# Input Skip (multiple inputs; input number encoded in command byte)
- id: input_skip_write
  label: Set Input Skip
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0-based)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: input_skip_read
  label: Read Input Skip Status
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0-based)

# Factory Reset
- id: reset_factory
  label: Reset to Factory Default
  kind: action
  params: []
- id: lan_reset
  label: LAN Reset
  kind: action
  params: []
- id: light_source_hours_query
  label: Light Source Usage Hours Query
  kind: action
  params: []
  description: "Query the light source usage hours. Source specifies this as a query command returning usage hours for the projector lamp/LED/laser."

- id: temperature_query
  label: Temperature Query
  kind: action
  params: []
  description: "Query the projector internal temperature status. Returns temperature reading in degrees Celsius or status code."

- id: error_status_query
  label: Error Status Query
  kind: action
  params: []
  description: "Query the projector error status. Returns current error code or error bitfield indicating fault conditions."
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - on
    - off
    - warm_up
    - cool_down
- id: splash_screen_state
  label: Splash Screen State
  type: enum
  values:
    - black
    - blue
- id: high_altitude_mode
  label: High Altitude Mode
  type: enum
  values:
    - off
    - on
    - auto
- id: lamp_mode
  label: Lamp / Light Source Mode
  type: enum
  values:
    - normal
    - full_normal
    - eco
    - eco_extended
- id: presentation_timer
  label: Presentation Timer
  type: enum
  values:
    - off
    - timer_1
    - timer_2
    - timer_3
- id: quick_power_off
  label: Quick Power Off
  type: enum
  values:
    - off
    - on
- id: freeze_state
  label: Freeze State
  type: enum
  values:
    - off
    - on
- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values:
    - auto
    - 4_3
    - 16_9
    - 16_10
    - panorama
    - 2_35_1
    - 2_35_2
    - native
- id: source_input
  label: Source Input
  type: enum
  values:
    - dsub_comp1
    - hdmi1
    - hdmi2
    - hbaset
    - usb_reader_usb1
    - lan_wifi
    - usb_display
- id: quick_auto_search
  label: Quick Auto Search
  type: enum
  values:
    - off
    - on
- id: mute_state
  label: Mute State
  type: enum
  values:
    - off
    - on
- id: volume_level
  label: Volume Level
  type: integer
- id: dde_mode
  label: DDE Mode
  type: enum
  values:
    - film
    - video
    - standard
- id: color_temperature
  label: Color Temperature
  type: enum
  values:
    - 6500k
    - 7000k
    - 7500k
    - 9000k
    - 9300k
    - user1
    - user2
    - user3
    - user4
- id: color_space
  label: Color Space
  type: enum
  values:
    - auto
    - rgb
    - yuv
- id: contrast_level
  label: Contrast Level
  type: integer
- id: brightness_level
  label: Brightness Level
  type: integer
- id: sharpness_level
  label: Sharpness Level
  type: integer
- id: zoom_level
  label: Zoom Level
  type: integer
- id: focus_level
  label: Focus Level
  type: integer
- id: white_balance_red
  label: White Balance Red Gain
  type: integer
- id: white_balance_green
  label: White Balance Green Gain
  type: integer
- id: white_balance_blue
  label: White Balance Blue Gain
  type: integer
- id: input_skip_state
  label: Input Skip State
  type: enum
  values:
    - off
    - on
- id: light_source_usage_hours
  label: Light Source Usage Hours
  type: integer
  description: Returns hours as HEX2DEC(ddccbbaa) from bytes 7-10
- id: temperature
  label: Operating Temperature
  type: number
  description: Returns temperature in degrees C as HEX2DEC(ddccbbaa)/10 from bytes 7-10
```

## Variables
```yaml
# All settable parameters are represented as Actions with params.
# No separate Variables section required.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
# Projector sends command acknowledgement after each received command.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: "Warm-up state"
    description: "Do not perform other commands during warm-up. System is initializing HW/FW."
  - condition: "Cool-down state"
    description: "Do not perform other commands during cool-down. System is closing HW/FW."
  - condition: "LAN power-on after power off"
    description: "Set LAN control settings/Standby LAN Control to ON before rebooting projector via LAN after power off."
confirmation_required_for:
  - reset_factory  # User must reboot projector to clear parameters after factory reset
```

## Notes
- Commands use a checksum-protected packet format. Every command sent by the control unit receives a response from the projector.
- RS-232 uses null modem (crossover) cable; only pins 2 (RXD), 3 (TXD), and 5 (GND) are required.
- LAN control command format is identical to RS-232, replacing "0x" prefix with "\".
- Response packets are either 1 byte or 2 bytes indicating status, followed by an acknowledgement packet (0x03 0x14 0x00 0x00 0x00 0x14).
- A response of "0x00 0x14 0x00 0x00 0x00 0x14" with first byte "0x00" indicates the function is disabled (greyed out in OSD).
- Mute function is only active when an input source is applied.
- Auto Adjust function is only active for non-digital input sources (VGA/Computer1/D-sub).
- HDMI Range: Enhanced/Full = 0-255 steps; Normal/Limited = 16-235 steps.
- Light Source Usage Time response format: bytes 7-10 as HEX2DEC(ddccbbaa).
- Temperature response format: bytes 7-10 as HEX2DEC(ddccbbaa)/10 = degrees C.

<!-- UNRESOLVED: specific projector models covered by this protocol not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error recovery sequences not documented -->
<!-- UNRESOLVED: command timing specifications (inter-command delays) not stated -->
<!-- UNRESOLVED: Pro9 series uses LAN port 23; other models use port 4661 - exact model-to-port mapping not specified -->

## Provenance

```yaml
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "ViewSonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "ViewSonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-26T22:56:46.252Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:56:46.252Z
matched_actions: 112
action_count: 112
confidence: high
summary: "All 112 spec actions matched source; transport parameters verified; comprehensive command coverage confirmed."
```

## Known Gaps

```yaml
[]
```
