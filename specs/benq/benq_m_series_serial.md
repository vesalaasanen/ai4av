---
spec_id: admin/benq-m-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ M-Series Control Spec"
manufacturer: BenQ
model_family: M-Series
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - M-Series
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-05-05T05:39:58.748Z
generated_at: 2026-05-05T05:39:58.748Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T05:39:58.748Z
  matched_actions: 74
  action_count: 74
  confidence: high
  summary: "All 74 spec actions matched to source RS-232 command table; transport parameters explicitly verified in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# BenQ M-Series Control Spec

## Summary
BenQ M-Series projector RS-232 control protocol. Supports serial RS-232C communication at configurable baud rates (default 115200). Commands use ASCII syntax with `<CR>` terminator. All commands echo input and are case-insensitive.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- routable
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
- id: set_source
  label: Set Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - RGB
        - RGB2
        - ypbr
        - ypbr2
        - dviA
        - dvid
        - hdmi
        - hdmi2
        - vid
        - svid
        - network
        - usbdisplay
        - usbreader
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: mic_volume_up
  label: Mic Volume Up
  kind: action
  params: []
- id: mic_volume_down
  label: Mic Volume Down
  kind: action
  params: []
- id: set_audio_source
  label: Set Audio Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - off
        - RGB
        - RGB2
        - vid
        - ypbr
        - hdmi
        - hdmi2
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - dynamic
        - preset
        - srgb
        - bright
        - livingroom
        - game
        - cine
        - std
        - user1
        - user2
        - user3
        - isfday
        - isfnight
        - threed
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: color_up
  label: Color Up
  kind: action
  params: []
- id: color_down
  label: Color Down
  kind: action
  params: []
- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: temperature
      type: enum
      values:
        - warmer
        - warm
        - normal
        - cool
        - cooler
        - native
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - "4:3"
        - "16:9"
        - "16:10"
        - AUTO
        - REAL
        - LBOX
        - WIDE
        - ANAM
- id: zoom_in
  label: Digital Zoom In
  kind: action
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  params: []
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  params: []
- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  params: []
- id: set_projector_position
  label: Set Projector Position
  kind: action
  params:
    - name: position
      type: enum
      values:
        - FT
        - RE
        - RC
        - FC
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  params: []
- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  params: []
- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  params: []
- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  params: []
- id: standby_network_on
  label: Standby Network On
  kind: action
  params: []
- id: standby_network_off
  label: Standby Network Off
  kind: action
  params: []
- id: standby_microphone_on
  label: Standby Microphone On
  kind: action
  params: []
- id: standby_microphone_off
  label: Standby Microphone Off
  kind: action
  params: []
- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  params: []
- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  params: []
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: enum
      values:
        - "2400"
        - "4800"
        - "9600"
        - "14400"
        - "19200"
        - "38400"
        - "57600"
        - "115200"
- id: lamp_mode_normal
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lamp_mode_smart_eco
  label: Lamp Mode Smart Eco
  kind: action
  params: []
- id: lamp_mode_dual_brightest
  label: Lamp Mode Dual Brightest
  kind: action
  params: []
- id: lamp_mode_dual_reliable
  label: Lamp Mode Dual Reliable
  kind: action
  params: []
- id: lamp_mode_single_alternative
  label: Lamp Mode Single Alternative
  kind: action
  params: []
- id: lamp_mode_single_alternative_eco
  label: Lamp Mode Single Alternative Eco
  kind: action
  params: []
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: nav_up
  label: Up
  kind: action
  params: []
- id: nav_down
  label: Down
  kind: action
  params: []
- id: nav_right
  label: Right
  kind: action
  params: []
- id: nav_left
  label: Left
  kind: action
  params: []
- id: nav_enter
  label: Enter
  kind: action
  params: []
- id: set_3d_mode
  label: Set 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - off
        - auto
        - tb
        - fs
        - fp
        - sbs
        - da
        - iv
        - 2d3d
        - nvidia
- id: remote_receiver_front_rear
  label: Remote Receiver Front+Rear
  kind: action
  params: []
- id: remote_receiver_front
  label: Remote Receiver Front
  kind: action
  params: []
- id: remote_receiver_rear
  label: Remote Receiver Rear
  kind: action
  params: []
- id: instant_on_on
  label: Instant On On
  kind: action
  params: []
- id: instant_on_off
  label: Instant On Off
  kind: action
  params: []
- id: lamp_saver_on
  label: Lamp Saver On
  kind: action
  params: []
- id: lamp_saver_off
  label: Lamp Saver Off
  kind: action
  params: []
- id: projection_log_in_code_on
  label: Projection Log In Code On
  kind: action
  params: []
- id: projection_log_in_code_off
  label: Projection Log In Code Off
  kind: action
  params: []
- id: broadcasting_on
  label: Broadcasting On
  kind: action
  params: []
- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  params: []
- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  params: []
- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - ON
    - OFF
- id: current_source
  label: Current Source
  type: enum
  values:
    - RGB
    - RGB2
    - ypbr
    - ypbr2
    - dviA
    - dvid
    - hdmi
    - hdmi2
    - vid
    - svid
    - network
    - usbdisplay
    - usbreader
- id: mute_status
  label: Mute Status
  type: enum
  values:
    - on
    - off
- id: volume_status
  label: Volume Status
  type: integer
- id: mic_volume_status
  label: Mic Volume Status
  type: integer
- id: audio_source_status
  label: Audio Source Status
  type: enum
  values:
    - off
    - RGB
    - RGB2
    - vid
    - ypbr
    - hdmi
    - hdmi2
- id: picture_mode
  label: Picture Mode
  type: enum
  values:
    - dynamic
    - preset
    - srgb
    - bright
    - livingroom
    - game
    - cine
    - std
    - user1
    - user2
    - user3
    - isfday
    - isfnight
    - threed
- id: contrast_value
  label: Contrast Value
  type: integer
- id: brightness_value
  label: Brightness Value
  type: integer
- id: color_value
  label: Color Value
  type: integer
- id: sharpness_value
  label: Sharpness Value
  type: integer
- id: color_temperature_status
  label: Color Temperature Status
  type: enum
  values:
    - warmer
    - warm
    - normal
    - cool
    - cooler
    - native
- id: aspect_status
  label: Aspect Status
  type: enum
  values:
    - "4:3"
    - "16:9"
    - "16:10"
    - AUTO
    - REAL
    - LBOX
    - WIDE
    - ANAM
- id: brilliant_color_status
  label: Brilliant Color Status
  type: enum
  values:
    - on
    - off
- id: projector_position_status
  label: Projector Position Status
  type: enum
  values:
    - FT
    - RE
    - RC
    - FC
- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  values:
    - on
    - off
- id: direct_power_on_status
  label: Direct Power On Status
  type: enum
  values:
    - on
    - off
- id: signal_power_on_status
  label: Signal Power On Status
  type: enum
  values:
    - on
    - off
- id: standby_network_status
  label: Standby Network Status
  type: enum
  values:
    - on
    - off
- id: standby_microphone_status
  label: Standby Microphone Status
  type: enum
  values:
    - on
    - off
- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  type: enum
  values:
    - on
    - off
- id: current_baud_rate
  label: Current Baud Rate
  type: enum
  values:
    - "2400"
    - "4800"
    - "9600"
    - "14400"
    - "19200"
    - "38400"
    - "57600"
    - "115200"
- id: lamp_hours
  label: Lamp Hours
  type: integer
- id: lamp2_hours
  label: Lamp2 Hours
  type: integer
- id: lamp_mode_status
  label: Lamp Mode Status
  type: enum
  values:
    - lnor
    - eco
    - seco
    - dualbr
    - dualre
    - single
    - singleeco
- id: model_name
  label: Model Name
  type: string
- id: blank_status
  label: Blank Status
  type: enum
  values:
    - on
    - off
- id: freeze_status
  label: Freeze Status
  type: enum
  values:
    - on
    - off
- id: 3d_sync_status
  label: 3D Sync Status
  type: enum
  values:
    - off
    - auto
    - tb
    - fs
    - fp
    - sbs
    - da
    - iv
    - 2d3d
    - nvidia
- id: remote_receiver_status
  label: Remote Receiver Status
  type: enum
  values:
    - fr
    - f
    - r
- id: instant_on_status
  label: Instant On Status
  type: enum
  values:
    - on
    - off
- id: lamp_saver_status
  label: Lamp Saver Status
  type: enum
  values:
    - on
    - off
- id: projection_log_in_code_status
  label: Projection Log In Code Status
  type: enum
  values:
    - on
    - off
- id: broadcasting_status
  label: Broadcasting Status
  type: enum
  values:
    - on
    - off
- id: amx_device_discovery_status
  label: AMX Device Discovery Status
  type: enum
  values:
    - on
    - off
- id: high_altitude_status
  label: High Altitude Mode Status
  type: enum
  values:
    - on
    - off
- id: mac_address
  label: MAC Address
  type: string
```

## Variables
```yaml
```

## Events
```yaml
```

## Macros
```yaml
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command format: `<CR>*key=value#<CR>` (e.g., `<CR>*pow=on#<CR>`). All commands echo the input string in uppercase. Query commands return the current value. Unsupported commands in low power mode (<0.5W standby) return "Block item". Command categories (source, audio, aspect ratio) vary by model.

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-05-05T05:39:58.748Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:39:58.748Z
matched_actions: 74
action_count: 74
confidence: high
summary: "All 74 spec actions matched to source RS-232 command table; transport parameters explicitly verified in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
