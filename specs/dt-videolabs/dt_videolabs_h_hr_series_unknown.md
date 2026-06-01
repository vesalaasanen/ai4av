---
spec_id: admin/dt_videolabs_h_hr_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "DT Videolabs TBX-2201 Control Spec"
manufacturer: "DT Videolabs"
model_family: TBX-2201
aliases: []
compatible_with:
  manufacturers:
    - "DT Videolabs"
  models:
    - TBX-2201
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - agneovo.com
  - resource.datavideo.com
  - github.com
  - dtvideolabs.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.dtvideolabs.com/user-guide-playbackproplus
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-05-20T11:45:24.410Z
generated_at: 2026-05-20T11:45:24.410Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:45:24.410Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "All 45 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# DT Videolabs TBX-2201 Control Spec

## Summary
Commercial display controlled via RS-232C serial or Ethernet LAN (TCP port 5000). Binary packet protocol with XOR checksum, header 0xA6 for commands and 0x21 for reports. Supports Get/Set command pairs for power, display settings, network config, and image adjustments.

<!-- UNRESOLVED: input/source routing commands not documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # Ethernet LAN port number (stated in source)
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
- powerable    # inferred: power state Set/Get commands present
- queryable    # inferred: Get commands returning state present
- levelable    # inferred: backlight, brightness, contrast, volume, etc. present
```

## Actions
```yaml
- id: power_state_set
  label: Set Power State
  kind: action
  params:
    - name: state
      type: integer
      description: 0x01 = Power OFF, 0x02 = Power ON

- id: backlight_level_set
  label: Set Backlight Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: temperature
      type: integer
      description: "0x20=WARM, 0x21=COOL, 0x23=USER, 0x24=NEUTRAL"

- id: volume_level_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: color_range_set
  label: Set Color Range
  kind: action
  params:
    - name: range
      type: integer
      description: "0x00=FULL, 0x01=LIMITED"

- id: led_onoff_set
  label: Set LED ON/OFF
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: signal_info_set
  label: Set Signal Info
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: blue_screen_set
  label: Set Blue Screen
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: logo_set
  label: Set LOGO
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: color_rgb_set
  label: Set Color RGB
  kind: action
  params:
    - name: red
      type: integer
      description: "0-255 (0x00-0xFF)"
    - name: green
      type: integer
      description: "0-255 (0x00-0xFF)"
    - name: blue
      type: integer
      description: "0-255 (0x00-0xFF)"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: black_level_set
  label: Set Black Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: hue_tint_set
  label: Set HUE (TINT)
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100)"

- id: dcr_set
  label: Set DCR
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: gamma
      type: integer
      description: "0x00=2.2, 0x01=2.4, 0x04=2.0, 0x05=S-Curve"

- id: noise_reduction_set
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00=OFF, 0x01=LOW, 0x02=MEDIUM, 0x03=HIGH"

- id: audio_mute_set
  label: Set Audio Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: power_saving_set
  label: Set Power Saving
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

- id: anti_burn_in_set
  label: Set Anti-Burn-in (Pixel Shift)
  kind: action
  params:
    - name: enable
      type: integer
      description: "0x00=OFF, 0x01=ON"
    - name: hours
      type: integer
      description: "0x01=4h, 0x02=5h, 0x03=6h, 0x04=8h"
    - name: type
      type: integer
      description: "0x01=A, 0x02=B, 0x03=C"

- id: network_config_set
  label: Set Network Configuration
  kind: action
  params:
    - name: mode
      type: integer
      description: "0x01=DHCP, 0x02=Static IP"
    - name: address_function
      type: integer
      description: "0x00=Disable, 0x01=IP Address, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"
    - name: address_setting
      type: string
      description: "ASCII hex string for IP/MAC values"

- id: network_name_set
  label: Set Network Name
  kind: action
  params:
    - name: name
      type: string
      description: "Up to 16 ASCII characters (0-9, A-Z, space, +, -, /, :)"

- id: user_input_control_set
  label: Set User Input Control (Key Lock)
  kind: action
  params:
    - name: control
      type: integer
      description: "bitmask: bit2=power key lock, bit1=local keyboard, bit0=remote control; 0x07=unlock all"
- id: network_address_get
  label: Network Address Get
  kind: query
  params:
    - name: address_function
      type: integer
      description: "0x01=IP, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"

- id: network_name_get
  label: Network Name Get
  kind: query
  params: []

- id: miscellaneous_info_get
  label: Miscellaneous Info Get
  kind: query
  params:
    - name: sub_command
      type: integer
      description: "0x02=Operating Hours"

- id: power_state_get
  label: Power State Get
  kind: query
  params: []

- id: keypad_control_get
  label: User Input Control Get
  kind: query
  params: []

- id: backlight_level_get
  label: Backlight Level Get
  kind: query
  params: []

- id: color_temp_get
  label: Color Temp Get
  kind: query
  params: []

- id: volume_get
  label: Volume Get
  kind: query
  params: []

- id: color_range_get
  label: Color Range Get
  kind: query
  params: []

- id: led_onoff_get
  label: LED ON/OFF Get
  kind: query
  params: []

- id: signal_info_get
  label: Signal Info Get
  kind: query
  params: []

- id: blue_screen_get
  label: Blue Screen Get
  kind: query
  params: []

- id: logo_get
  label: LOGO Get
  kind: query
  params: []

- id: color_rgb_get
  label: Color RGB Get
  kind: query
  params: []

- id: platform_version_get
  label: Platform/Version Labels Get
  kind: query
  params:
    - name: label_type
      type: integer
      description: "0x00=F/W version, 0x01=Model Name"

- id: brightness_get
  label: Brightness Get
  kind: query
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  params: []

- id: black_level_get
  label: Black Level Get
  kind: query
  params: []

- id: sharpness_get
  label: Sharpness Get
  kind: query
  params: []

- id: hue_tint_get
  label: HUE (TINT) Get
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - 0x01  # Power OFF
    - 0x02  # Power ON

- id: backlight_level
  type: integer
  range: [0, 100]

- id: color_temperature
  type: enum
  values:
    - 0x20  # WARM
    - 0x21  # COOL
    - 0x23  # USER
    - 0x24  # NEUTRAL

- id: volume_level
  type: integer
  range: [0, 100]

- id: color_range
  type: enum
  values:
    - 0x00  # FULL
    - 0x01  # LIMITED

- id: led_onoff
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: signal_info
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: blue_screen
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: logo
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: color_rgb
  type: object
  properties:
    red: { type: integer, range: [0, 255] }
    green: { type: integer, range: [0, 255] }
    blue: { type: integer, range: [0, 255] }

- id: brightness
  type: integer
  range: [0, 100]

- id: contrast
  type: integer
  range: [0, 100]

- id: black_level
  type: integer
  range: [0, 100]

- id: sharpness
  type: integer
  range: [0, 100]

- id: hue_tint
  type: integer
  range: [0, 100]

- id: saturation
  type: integer
  range: [0, 100]

- id: dcr
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: gamma
  type: enum
  values:
    - 0x00  # 2.2
    - 0x01  # 2.4
    - 0x04  # 2.0
    - 0x05  # S-Curve

- id: noise_reduction
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # LOW
    - 0x02  # MEDIUM
    - 0x03  # HIGH

- id: audio_mute
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: power_saving
  type: enum
  values:
    - 0x00  # OFF
    - 0x01  # ON

- id: anti_burn_in
  type: object
  properties:
    enable: { type: integer, description: "0x00=OFF, 0x01=ON" }
    hours: { type: integer, description: "0x01=4h, 0x02=5h, 0x03=6h, 0x04=8h" }
    type: { type: integer, description: "0x01=A, 0x02=B, 0x03=C" }

- id: network_config
  type: object
  properties:
    mode: { type: integer, description: "0x01=DHCP, 0x02=Static IP" }
    address_function: { type: integer }
    address_setting: { type: string }

- id: network_name
  type: string

- id: user_input_control
  type: integer
  description: "bitmask: bit2=power key lock, bit1=local keyboard, bit0=remote control"

- id: misc_operating_hours
  type: integer
  description: "16-bit unsigned integer, MSB first (Data[1]=MSB, Data[2]=LSB)"

- id: platform_version_label
  type: string
  description: "up to 36 ASCII characters; 0x00=F/W version, 0x01=Model Name"

- id: command_status
  type: enum
  values:
    - 0x00  # Completed / ACK
    - 0x03  # NACK: command canceled or value incorrect
    - 0x04  # NAV: parse error or checksum error
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are represented as Actions with Set/Get pairs.
# No discrete Variables section required beyond the Feedbacks above.
```

## Events
```yaml
# UNRESOLVED: device does not send unsolicited events. All responses are direct replies
# to commands (ACK/NAV/NACK). No push-style event channel documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Command format: [Header=0xA6] [Monitor ID 1-255] [Category=0x00] [Code0] [Code1] [Length] [Data Control=0x01] [Data[0]…Data[N]] [Checksum]. Checksum = XOR of all bytes except checksum itself.
- Report format: [Header=0x21] [Monitor ID] [Category=0x00] [Page=0x00] [Length] [Data Control=0x01] [Data[0]…Data[N]] [Checksum].
- Response codes: 0x00=ACK (success), 0x03=NACK (command canceled or value not permitted), 0x04=NAV (parse error / checksum error).
- No reply sent when wrong Monitor ID used (broadcast 0 still gets no response).
- Retry allowed if no response within 500ms.
- Serial and Ethernet share same port (5000 TCP) and command format.
- IP address assignment not documented (refer to user manual per source section 1.3).
<!-- UNRESOLVED: input/source routing commands not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: default Monitor ID not stated -->
<!-- UNRESOLVED: voltage/power specifications not stated -->

## Provenance

```yaml
source_domains:
  - agneovo.com
  - resource.datavideo.com
  - github.com
  - dtvideolabs.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.dtvideolabs.com/user-guide-playbackproplus
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-05-20T11:45:24.410Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:45:24.410Z
matched_actions: 45
action_count: 45
confidence: high
summary: "All 45 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
