---
spec_id: admin/hisense-116u7qg-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 116U7QG PRO Series Control Spec"
manufacturer: Hisense
model_family: "116U7QG PRO Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "116U7QG PRO Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-12T19:13:05.398Z
last_checked_at: 2026-06-02T22:07:42.296Z
generated_at: 2026-06-02T22:07:42.296Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "TCP/IP control path not documented — only RS-232 and discrete IR in source"
  - "discrete IR pronto CCF codes not structured as actions — raw hex arrays only"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:42.296Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# Hisense 116U7QG PRO Series Control Spec

## Summary
Prosumer large-format TV with RS-232 control protocol. Supports power on/off, input routing, picture and audio adjustment, queryable state. Discrete IR also documented; RS-232 is primary control interface.

<!-- UNRESOLVED: discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only -->

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

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input identifier (0=TV, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4)

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=On, 2=Off

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late Night

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Antenna, 2=Cable

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 2=On, 3=CC on when mute

- id: reset_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC ONLY, 1=ALL

- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100

- id: set_remote_key
  label: Set Remote Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial

- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset

- id: set_power_on_input_select
  label: Set Power On Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: 0=LAST, 1=Air, 2=AV, 3=Component
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]

- id: current_input
  type: enum
  values: [0, 1, 3, 4, 6, 9, 10, 11, 12]

- id: current_picture_mode
  type: enum
  values: [0, 2, 3, 4, 5, 6]

- id: current_aspect_ratio
  type: enum
  values: [0, 2, 3, 4, 5, 6, 7, 8]

- id: overscan_state
  type: enum
  values: [0, 2]

- id: current_color_temp
  type: enum
  values: [0, 2, 3, 4]

- id: current_sound_mode
  type: enum
  values: [0, 2, 3, 4, 5]

- id: mute_state
  type: enum
  values: [0, 1]

- id: current_tv_speaker
  type: enum
  values: [0, 2]

- id: current_tuner_mode
  type: enum
  values: [0, 2]

- id: caption_control_state
  type: enum
  values: [0, 2, 3]

- id: current_osd_language
  type: enum
  values: [0, 2, 3]

- id: standby_led_state
  type: enum
  values: [0, 2]

- id: current_power_off_control_mode
  type: enum
  values: [0, 1]

- id: current_volume_control
  type: enum
  values: [0, 1, 2, 3]

- id: current_remote_key
  type: enum
  values: [0, 1, 2]

- id: current_panel_key
  type: enum
  values: [0, 1]

- id: current_menu_access
  type: enum
  values: [0, 1]

- id: current_av_setting_menu
  type: enum
  values: [0, 1]

- id: current_osd_mode
  type: enum
  values: [0, 1]

- id: current_input_mode
  type: enum
  values: [0, 1, 2, 3]

- id: current_power_on_input_select
  type: enum
  values: [0, 1, 2, 3]
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]

- id: contrast
  type: integer
  range: [0, 100]

- id: color_saturation
  type: integer
  range: [0, 100]

- id: tint
  type: integer
  range: [0, 100]

- id: sharpness
  type: integer
  range: [0, 20]

- id: backlight
  type: integer
  range: [0, 100]

- id: volume
  type: integer
  range: [0, 100]

- id: volume_locked_level
  type: integer
  range: [0, 100]
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
interlocks:
  - name: RS-232 during standby
    description: To keep RS-232 port active while TV is in standby, set "Power On Command" to Enable in the Custom Install menu before exiting. Without this, the TV cannot be powered on via RS-232 from standby.
  - name: Custom Install menu required
    description: RS-232 control requires enabling it in the Custom Install menu (access code 7310) before use.
```

## Notes
RS-232 protocol is case-sensitive. Commands are ASCII with checksum. Termination is carriage return (0x0D). Client ID for Smart TVs is the last 3 bytes of the Ethernet MAC address; for Feature TVs it is selected in the TV menu; "ALL" broadcasts to all TVs. Query commands return 4-byte response data followed by checksum.

Command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][0x0D]` for set, `Q[CLIENT_ID][COMMAND]????[CHECKSUM][0x0D]` for query. Acknowledgements: `OKAY`, `EROR`, `WAIT`.

Broadcast (ALL) uses generic HEX command format; TV-specific commands include MAC address suffix.

<!-- UNRESOLVED: TCP/IP control path not documented — only RS-232 and discrete IR in source -->
<!-- UNRESOLVED: discrete IR pronto CCF codes not structured as actions — raw hex arrays only -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-12T19:13:05.398Z
last_checked_at: 2026-06-02T22:07:42.296Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:42.296Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "TCP/IP control path not documented — only RS-232 and discrete IR in source"
- "discrete IR pronto CCF codes not structured as actions — raw hex arrays only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
