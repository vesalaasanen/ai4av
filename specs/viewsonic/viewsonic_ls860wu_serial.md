---
spec_id: admin/viewsonic-ls860wu
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic LS860WU Control Spec"
manufacturer: ViewSonic
model_family: LS860WU
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - LS860WU
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
last_checked_at: 2026-05-31T22:45:10.938Z
generated_at: 2026-05-31T22:45:10.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:45:10.938Z
  matched_actions: 70
  action_count: 70
  confidence: high
  summary: "All 70 spec actions matched literal source commands with correct transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# ViewSonic LS860WU Control Spec

## Summary
Laser phosphor projector with RS-232C control interface. Protocol uses 9-pin D-SUB connector at 19200 baud default. Commands are hex-encoded packets with checksum. Supports power, source routing, image adjustment, and query operations.

<!-- UNRESOLVED: LAN control port not confirmed for this model — note 2 references Pro9 series with port 23; LS860WU may differ -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; also supports 4800/9600/38400 per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  pinout:
    rx: 2
    tx: 3
    gnd: 5
  note: Null modem crossover cable required; only 3 pins needed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # power on/off commands present
- routable       # source input routing commands present
- queryable      # read commands returning state present
- levelable      # contrast, brightness, volume, zoom, focus present
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
- id: quick_power_off
  label: Quick Power Off
  kind: action
  params: []
- id: quick_power_off_on
  label: Quick Power Off Enable
  kind: action
  params: []

# Splash Screen
- id: splash_black
  label: Splash Screen Black
  kind: action
  params: []
- id: splash_blue
  label: Splash Screen Blue
  kind: action
  params: []

# High Altitude Mode
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: high_altitude_auto
  label: High Altitude Mode Auto
  kind: action
  params: []

# Lamp / Light Source Mode
- id: lamp_mode_normal
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lamp_mode_full_normal
  label: Lamp Mode Full Normal
  kind: action
  params: []
- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lamp_mode_eco_extended
  label: Lamp Mode Eco Extended
  kind: action
  params: []

# Presentation Timer
- id: presentation_timer_off
  label: Presentation Timer Off
  kind: action
  params: []
- id: presentation_timer_1
  label: Presentation Timer 1
  kind: action
  params: []
- id: presentation_timer_2
  label: Presentation Timer 2
  kind: action
  params: []
- id: presentation_timer_3
  label: Presentation Timer 3
  kind: action
  params: []

# Image Controls - levelable params
- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0 (min) to 1 (max) encoded as hex byte
- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0 (min) to 1 (max) encoded as hex byte
- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0 (min) to 1 (max) encoded as hex byte

# White Balance - Red Gain
- id: wb_red_gain_increase
  label: White Balance Red Gain Increase
  kind: action
  params: []
- id: wb_red_gain_decrease
  label: White Balance Red Gain Decrease
  kind: action
  params: []

# White Balance - Green Gain
- id: wb_green_gain_increase
  label: White Balance Green Gain Increase
  kind: action
  params: []
- id: wb_green_gain_decrease
  label: White Balance Green Gain Decrease
  kind: action
  params: []

# White Balance - Blue Gain
- id: wb_blue_gain_increase
  label: White Balance Blue Gain Increase
  kind: action
  params: []
- id: wb_blue_gain_decrease
  label: White Balance Blue Gain Decrease
  kind: action
  params: []

# Zoom / Focus
- id: zoom_set
  label: Set Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: Zoom level encoded as hex byte
- id: focus_set
  label: Set Focus
  kind: action
  params:
    - name: value
      type: integer
      description: Focus level encoded as hex byte

# Freeze
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []

# Aspect Ratio
- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  params: []
- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: aspect_16_10
  label: Aspect Ratio 16:10
  kind: action
  params: []
- id: aspect_panorama
  label: Aspect Ratio Panorama
  kind: action
  params: []
- id: aspect_2_35_1
  label: Aspect Ratio 2.35:1
  kind: action
  params: []
- id: aspect_2_35_2
  label: Aspect Ratio 2.35:2
  kind: action
  params: []
- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  params: []

# Source Input - routable
- id: source_dsub_comp1
  label: Source D-Sub / Comp.1
  kind: action
  params: []
- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  params: []
- id: source_hdmi2
  label: Source HDMI 2
  kind: action
  params: []
- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  params: []
- id: source_usb_reader
  label: Source USB Reader / USB1
  kind: action
  params: []
- id: source_lan_wifi
  label: Source LAN / WiFi Display
  kind: action
  params: []
- id: source_usb_display
  label: Source USB Display
  kind: action
  params: []

# Quick Auto Search
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
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

# Volume - levelable
- id: volume_increase
  label: Volume Increase
  kind: action
  params: []
- id: volume_decrease
  label: Volume Decrease
  kind: action
  params: []
- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume level encoded as hex byte

# DDE Mode
- id: dde_film
  label: DDE Mode Film
  kind: action
  params: []
- id: dde_video
  label: DDE Mode Video
  kind: action
  params: []
- id: dde_standard
  label: DDE Mode Standard
  kind: action
  params: []

# Color Temperature
- id: color_temp_6500k
  label: Color Temperature 6500K
  kind: action
  params: []
- id: color_temp_7000k
  label: Color Temperature 7000K
  kind: action
  params: []
- id: color_temp_7500k
  label: Color Temperature 7500K
  kind: action
  params: []
- id: color_temp_9000k
  label: Color Temperature 9000K
  kind: action
  params: []
- id: color_temp_9300k
  label: Color Temperature 9300K
  kind: action
  params: []
- id: color_temp_user1
  label: Color Temperature User1
  kind: action
  params: []
- id: color_temp_user2
  label: Color Temperature User2
  kind: action
  params: []
- id: color_temp_user3
  label: Color Temperature User3
  kind: action
  params: []
- id: color_temp_user4
  label: Color Temperature User4
  kind: action
  params: []

# Color Space
- id: color_space_auto
  label: Color Space Auto
  kind: action
  params: []
- id: color_space_rgb
  label: Color Space RGB
  kind: action
  params: []
- id: color_space_yuv
  label: Color Space YUV
  kind: action
  params: []

# Input Skip - per input index (1-12)
- id: input_skip_set
  label: Input Skip Set
  kind: action
  params:
    - name: input_index
      type: integer
      description: Input index 1-12
    - name: enabled
      type: boolean
      description: true = skip, false = visible

# Factory Reset
- id: reset_factory_default
  label: Reset to Factory Default
  kind: action
  params: []
- id: lan_reset
  label: LAN Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
# Power state - queryable
- id: power_status
  label: Power Status
  type: enum
  values:
    - on
    - off
    - warm_up
    - cool_down

# Splash screen status
- id: splash_status
  label: Splash Screen Status
  type: enum
  values:
    - black
    - blue

# Quick power off status
- id: quick_power_off_status
  label: Quick Power Off Status
  type: enum
  values:
    - off
    - on

# High altitude mode status
- id: high_altitude_status
  label: High Altitude Mode Status
  type: enum
  values:
    - off
    - on
    - auto

# Lamp / light source mode status
- id: lamp_mode_status
  label: Lamp Mode Status
  type: enum
  values:
    - normal
    - full_normal
    - eco
    - eco_extended

# Presentation timer status
- id: presentation_timer_status
  label: Presentation Timer Status
  type: enum
  values:
    - off
    - timer_1
    - timer_2
    - timer_3

# Contrast / Brightness / Sharpness - levelable
- id: contrast_status
  label: Contrast Status
  type: integer
  range: [0, 255]
- id: brightness_status
  label: Brightness Status
  type: integer
  range: [0, 255]
- id: sharpness_status
  label: Sharpness Status
  type: integer
  range: [0, 255]

# White balance gain status (red, green, blue)
- id: wb_red_gain_status
  label: White Balance Red Gain Status
  type: integer
  range: [0, 255]
- id: wb_green_gain_status
  label: White Balance Green Gain Status
  type: integer
  range: [0, 255]
- id: wb_blue_gain_status
  label: White Balance Blue Gain Status
  type: integer
  range: [0, 255]

# Zoom / Focus status
- id: zoom_status
  label: Zoom Status
  type: integer
  range: [0, 255]
- id: focus_status
  label: Focus Status
  type: integer
  range: [0, 255]

# Freeze status
- id: freeze_status
  label: Freeze Status
  type: enum
  values:
    - off
    - on

# Aspect ratio status
- id: aspect_ratio_status
  label: Aspect Ratio Status
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

# Source input status - routable
- id: source_input_status
  label: Source Input Status
  type: enum
  values:
    - dsub_comp1
    - hdmi1
    - hdmi2
    - hdbaset
    - usb_reader_usb1
    - lan_wifi
    - usb_display

# Quick auto search status
- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  values:
    - off
    - on

# Mute status
- id: mute_status
  label: Mute Status
  type: enum
  values:
    - off
    - on
  note: Only active when input source is applied

# Volume status - levelable
- id: volume_status
  label: Volume Status
  type: integer
  range: [0, 255]

# DDE mode status
- id: dde_mode_status
  label: DDE Mode Status
  type: enum
  values:
    - film
    - video
    - standard

# Color temperature status
- id: color_temp_status
  label: Color Temperature Status
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

# Color space status
- id: color_space_status
  label: Color Space Status
  type: enum
  values:
    - auto
    - rgb
    - yuv

# Input skip status - per input index
- id: input_skip_status
  label: Input Skip Status
  type: object
  properties:
    input_index:
      type: integer
      range: [1, 12]
    enabled:
      type: boolean
```

## Variables
```yaml
# HDMI Range setting affects video levels
- id: hdmi_range
  label: HDMI Range
  type: enum
  values:
    - enhanced_full    # 0-255 steps
    - normal_limited   # 16-235 steps
  note: Affects HDMI input processing only

# Light source usage time - read-only, reported in hours
- id: light_source_hours
  label: Light Source Hours
  type: integer
  unit: hours
  note: Format: 4-byte little-endian hex in response packet

# Operating temperature - read-only, reported in degrees C
- id: operating_temperature
  label: Operating Temperature
  type: number
  unit: degC
  note: Format: 4-byte little-endian hex in response packet, value / 10
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Device responds only to commands; does not initiate status pushes.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power state transitions: do not send commands during Warm Up or Cool Down states.
    Source states: "Please do not perform other commands" during these phases.
  - Mute only active when input source is applied (note 8).
  - Auto Adjust only active for non-digital sources such as VGA/Computer1/D-sub (note 8).
  - After Reset to Factory Default, user must reboot projector to clear parameters (note 9).
  - Power Off command requires LAN control settings / Standby LAN Control set to "ON" for LAN reboot (note 7).
# UNRESOLVED: voltage, current, power consumption not stated in source.
```

## Notes
Command packet format: 8-byte hex payload followed by 1-byte checksum. Response packets are 16 bytes (1-byte format) or variable length (2-byte format with additional data). Read commands use 07 prefix; write commands use 06 prefix. All multi-byte values are little-endian.

RS-232 default baud is 19200; supports 4800, 9600, 19200, 38400. LAN control noted for Pro9 series on port 23; LAN control for LS860WU not explicitly documented in this source — port 4661 referenced for "LAN control" generically but applicability to LS860WU is unconfirmed.

Freeze function returns 1-byte response mapped per value table 3.2.1.

Factory Reset and LAN Reset require projector reboot to clear stored parameters.

<!-- UNRESOLVED: LAN control port number for LS860WU specifically not stated in source -->
<!-- UNRESOLVED: HDMI CEC control not mentioned in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error recovery sequences not described in source -->

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
last_checked_at: 2026-05-31T22:45:10.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:45:10.938Z
matched_actions: 70
action_count: 70
confidence: high
summary: "All 70 spec actions matched literal source commands with correct transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
