---
spec_id: admin/samsung-pn64h5000afxza-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung PN64H5000AFXZA Control Spec"
manufacturer: Samsung
model_family: PN64H5000AFXZA
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - PN64H5000AFXZA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - image-us.samsung.com
  - github.com
  - developer.samsung.com
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - https://developer.samsung.com/smarttv
retrieved_at: 2026-05-26T06:26:25.582Z
last_checked_at: 2026-10-07T12:36:43.894Z
generated_at: 2026-10-07T12:36:43.894Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source lists Power Off with the remark \"Use WoL, WoW\" but does not establish the transport or map power commands to RS-232 or network control."
  - "no standalone settable parameters found in source beyond action-based controls"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "RS-232 port number not stated in source (device-specific, not documented in generic command list)"
  - "serial ID range not stated in source"
  - "response timing not stated"
  - "error code dictionary not fully populated from source"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:36:43.894Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 semantic-id actions map one-to-one to source rows with matching ranges and enums; transport is entirely UNRESOLVED; source is a generic Samsung TV list, not model-specific. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Samsung PN64H5000AFXZA Control Spec

## Summary
Samsung PN64H5000AFXZA is a 64-inch commercial plasma display in the PN-H series. The supplied source lists Samsung TV control commands, including power, volume, input, picture, sound, and remote key controls. It does not specify the physical transport configuration or authentication.

<!-- UNRESOLVED: the source lists Power Off with the remark "Use WoL, WoW" but does not establish the transport or map power commands to RS-232 or network control. -->

## Transport
```yaml
protocols: UNRESOLVED
serial:
  baud_rate: UNRESOLVED
  data_bits: UNRESOLVED
  parity: UNRESOLVED
  stop_bits: UNRESOLVED
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable       # source lists Power Off, with the remark "Use WoL, WoW"; transport mapping unresolved
- levelable       # volume (0-100), contrast, brightness, sharpness, color, tint, backlight
- routable        # input source selection (HDMI1-4, COMPONENT1, USB)
- queryable       # get TV status, get video status commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Volume level 0-100

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: Contrast level 0-50

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [-5, 5]
      description: Brightness level -5 to 5

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 20]
      description: Sharpness level 0-20

- id: color_set
  label: Set Color
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: Color level 0-50

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [-15, 15]
      description: Tint level -15 to 15

- id: backlight_set
  label: Set Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: Backlight level 0-50

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - Dynamic
        - Standard
        - Movie
        - Natural
        - FilmmakerMode
        - HDRplus
        - CAL-NIGHT
        - CAL-DAY

- id: input_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - HDMI1
        - HDMI2
        - HDMI3
        - HDMI4
        - COMPONENT1
        - USB

- id: picture_size_set
  label: Set Picture Size
  kind: action
  params:
    - name: size
      type: enum
      values:
        - "16:9"
        - "4:3"

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: channel_set
  label: Set Channel
  kind: action
  params:
    - name: number
      type: integer
      range: [0, 999]
      description: Channel number (ATV: 1-135, DTV: 0-999)

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - Standard
        - Amplify
        - Optimized
        - Natural
        - ClearVoiceII

- id: speaker_select
  label: Select Speaker
  kind: action
  params:
    - name: target
      type: enum
      values:
        - Internal
        - External

- id: remote_key
  label: Remote Key Emulation
  kind: action
  params:
    - name: key
      type: enum
      values:
        - cursor_up
        - cursor_down
        - cursor_left
        - cursor_right
        - menu
        - home
        - enter
        - fast_forward
        - rewind
        - play
        - stop
        - pause
        - return
        - exit
        - power
        - number1
        - number2
        - number3
        - number4
        - number5
        - number6
        - number7
        - number8
        - number9
        - number0
        - caption
        - dash
        - red
        - green
        - yellow
        - blue
        - multiview
        - webBrowser
        - netflix
        - amazon

- id: digital_clean_view_set
  label: Set Digital Clean View
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - Auto
        - Off

- id: auto_motion_plus_set
  label: Set Auto Motion Plus
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - Auto
        - Custom

- id: amp_blur_reduction_set
  label: Set AMP Blur Reduction
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 10]
      description: Blur reduction level 0-10

- id: art_mode_on
  label: Art Mode On
  kind: action
  params: []

- id: art_mode_off
  label: Art Mode Off
  kind: action
  params: []

- id: power_on_or_reboot
  label: Power On or Reboot
  kind: action
  params: []

- id: air_cable_selection
  label: Air/Cable Selection
  kind: action
  params: []

- id: selection_tv_plus
  label: Selection/TV Plus
  kind: action
  params: []

- id: usb_source_control
  label: USB Source Control
  kind: action
  params:
    - name: device_name
      type: string
    - name: device_id
      type: string

- id: rvu_source_control_deprecated
  label: RVUSourceControl (Deprecated)
  kind: action
  params:
    - name: device_name
      type: string
    - name: device_id
      type: string

- id: picture_calibration_mode_control_deprecated
  label: Picture Calibration Mode Control (Deprecated)
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - Off
        - On

- id: audio_out_optical
  label: Audio Out/Optical
  kind: action
  params:
    - name: volume
      type: integer
      range: [0, 100]
      description: volume(0~100)
    - name: mute
      type: enum
      values:
        - Mute On
        - Mute Off

- id: app_direct_apps_access
  label: App Direct Apps Access
  kind: action
  params:
    - name: app
      type: enum
      values:
        - VUDU
        - pandora
        - vudu
        - youTube
        - hulu

- id: first_screen_app_control
  label: First Screen App Control
  kind: action
  params:
    - name: application_name
      type: string

- id: multiview_multi_view_control
  label: Multiview Multi-View Control
  kind: action
  params: []

- id: display_rotator
  label: Display Rotator
  kind: action
  params:
    - name: orientation
      type: string
      description: Auto Rotating Mount orientation
```

## Feedbacks
```yaml
- id: tv_status_get
  label: Get TV Status
  kind: feedback
  query_command: Get TV Status
  returns:
    - Active Source
    - Picture Size
    - Picture Mode
    - Sound Mode
    - contrast
    - brightness

- id: video_status_get
  label: Get Video Status
  kind: feedback
  query_command: Get Video Status
  returns:
    - sharpness
    - color
    - tint
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source beyond action-based controls
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- The source lists Power Off with the remark "Use WoL, WoW"; it does not specify the transport or explain power-on behavior.
- Input source control only works when physical port is connected; TV returns error if port absent.
- Ambient Mode: Exit key not effective when Ambient Mode is ON — only "First Screen" works as exit.
- HDMI4 acts as HDBT on Terrace model.
- TV Plus channel selection supported from 2022 products.
- FilmmakerMode available from 2020 TVs with FMM content.
- Natural and Optimized sound modes deprecated 2022.
- Digital Clean View renamed to Noise Reduction on 2020 TVs; Brightness renamed to Shadow Detail on 2020 TVs.
- Backlight renamed to Brightness on 2020 TVs.
- Auto Motion Plus renamed to Picture Clarity on 2020 TVs.

<!-- UNRESOLVED: RS-232 port number not stated in source (device-specific, not documented in generic command list) -->
<!-- UNRESOLVED: serial ID range not stated in source -->
<!-- UNRESOLVED: response timing not stated -->
<!-- UNRESOLVED: error code dictionary not fully populated from source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - image-us.samsung.com
  - github.com
  - developer.samsung.com
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - https://developer.samsung.com/smarttv
retrieved_at: 2026-05-26T06:26:25.582Z
last_checked_at: 2026-10-07T12:36:43.894Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:36:43.894Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 semantic-id actions map one-to-one to source rows with matching ranges and enums; transport is entirely UNRESOLVED; source is a generic Samsung TV list, not model-specific. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source lists Power Off with the remark \"Use WoL, WoW\" but does not establish the transport or map power commands to RS-232 or network control."
- "no standalone settable parameters found in source beyond action-based controls"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "RS-232 port number not stated in source (device-specific, not documented in generic command list)"
- "serial ID range not stated in source"
- "response timing not stated"
- "error code dictionary not fully populated from source"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
