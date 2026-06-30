---
spec_id: admin/hisense-55u8k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 55U8K Series Control Spec"
manufacturer: Hisense
model_family: "55U8K Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "55U8K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
retrieved_at: 2026-05-10T16:00:29.174Z
last_checked_at: 2026-06-25T15:38:27.551Z
generated_at: 2026-06-25T15:38:27.551Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source"
  - "authentication procedure not described in source"
  - "serial/RS-232 config not stated (commands reference RS-232 but transport is IP)"
  - "port number not stated in source"
  - "response packet structure not documented in source"
  - "discrete variable enumerate-all not separately documented from actions."
  - "unsolicited event notifications not documented in source."
  - "multi-step macros not documented in source."
  - "no other safety warnings or interlock procedures stated in source."
  - "TCP port number, response packet structure, unsolicited event format, firmware compatibility"
verification:
  verdict: verified
  checked_at: 2026-06-25T15:38:27.551Z
  matched_actions: 51
  action_count: 85
  confidence: medium
  summary: "deterministic presence proof: 51/51 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 55U8K Series Control Spec

## Summary
Hisense 55U8K Series consumer LCD TV. IP control protocol using ASCII hex command strings over TCP. Supports power, input routing, picture/sound adjustment, and full IR remote emulation. Two command variants: TV-specific (MAC-addressed) and generic (all TVs).

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: authentication procedure not described in source -->
<!-- UNRESOLVED: serial/RS-232 config not stated (commands reference RS-232 but transport is IP) -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: null  # UNRESOLVED: port number not stated in source
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
  command: POWR0001

- id: power_off
  label: Standby
  kind: action
  params: []
  command: POWR0000

- id: input_tv
  label: Set Input TV
  kind: action
  params: []
  command: INPT0001

- id: input_av
  label: Set Input AV
  kind: action
  params: []
  command: INPT0004

- id: input_component
  label: Set Input Component
  kind: action
  params: []
  command: INPT0003

- id: input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
  command: INPT0009

- id: input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
  command: INPT0010

- id: input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
  command: INPT0011

- id: input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
  command: INPT0012

- id: input_vga
  label: Set Input VGA
  kind: action
  params: []
  command: INPT0006

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - standard: PMOD0000
        - vivid: PMOD0002
        - energy_saving: PMOD0003
        - theater: PMOD0004
        - game: PMOD0005
        - sport: PMOD0006

- id: brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 32]
      command_suffix: 4-digit hex

- id: aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - auto: ASPT0000
        - normal: ASPT0002
        - zoom: ASPT0003
        - wide: ASPT0004
        - direct: ASPT0005
        - 1_to_1_pixel_map: ASPT0006
        - panoramic: ASPT0007
        - cinema: ASPT0008

- id: overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off: OVSN0000
        - on: OVSN0002

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  params: []
  command: RSTP1000

- id: color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: enum
      values:
        - high: CTEM0000
        - middle: CTEM0002
        - mid_low: CTEM0003
        - low: CTEM0004

- id: backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - standard: AMOD0000
        - theater: AMOD0002
        - music: AMOD0003
        - speech: AMOD0004
        - late_night: AMOD0005

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params: []
  command: RSTA2000

- id: volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off: MUTE0000
        - on: MUTE0001

- id: tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off: ASPK0000
        - on: ASPK0002

- id: tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - antenna: TUNR0000
        - cable: TUNR0002

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

- id: caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - off: CC##0000
        - on: CC##0002
        - cc_on_when_mute: CC##0003

- id: osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: enum
      values:
        - english: LANG0000
        - spanish: LANG0002
        - french: LANG0003

- id: standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off: PLED0000
        - on: PLED0002

- id: remote_key
  label: Remote Key Control
  kind: action
  params:
    - name: control
      type: enum
      values:
        - enable: RMOT0000
        - disable: RMOT0001
        - partial: RMOT0002

- id: panel_key
  label: Panel Key Control
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable: PANL0000
        - disable: PANL0001

- id: menu_access
  label: Menu Access Control
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable: MENU0000
        - disable: MENU0001

- id: av_setting_menu
  label: AV Setting Menu Control
  kind: action
  params:
    - name: state
      type: enum
      values:
        - disable: AVMN0000
        - enable: AVMN0001

- id: osd_mode
  label: OSD Mode Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - enable: OSD#0000
        - disable: OSD#0001

- id: input_mode
  label: Input Mode Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - locked: INPM0000
        - selectable: INPM0001
        - ac_reset: INPM0002
        - standby_reset: INPM0003

- id: power_on_input
  label: Power On Input Selection
  kind: action
  params:
    - name: source
      type: enum
      values:
        - last: POIS0000
        - air: POIS0001
        - av: POIS0002
        - component: POIS0003
        - vga: POIS0004
        - hdmi1: POIS0005
        - hdmi2: POIS0006
        - hdmi3: POIS0007
        - hdmi4: POIS0008

- id: speaker_mode
  label: TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - speaker: SPKM0000
        - off: SPKM0001
        - arc_first: SPKM0002

- id: b2b_mode
  label: B2B Function Mode
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable: B2BM0000
        - disable: B2BM0001

- id: usb_behavior
  label: USB Behavior Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - home: USBM0000
        - b2b: USBM0001

- id: pixel_shifting
  label: Pixel Shifting
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off: PSHF0000
        - on: PSHF0001

- id: power_on_command_enable
  label: Power On Command Enable
  kind: action
  params:
    - name: state
      type: enum
      values:
        - disable: PWRE0000
        - enable: PWRE0001

- id: power_off_control_mode
  label: Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - ac_only: PBTN0000
        - all: PBTN0001

- id: volume_control_lock
  label: Volume Control Lock
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - locked: SVOL0000
        - last_volume: SVOL0001
        - ac_reset: SVOL0002
        - standby_reset: SVOL0003

- id: volume_locked_level
  label: Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      command_suffix: 4-digit hex

- id: ir_key
  label: IR Key Emulation
  kind: action
  params:
    - name: key
      type: enum
      values:
        - ch_up: BTTN1034
        - ch_down: BTTN1035
        - vol_up: BTTN1033
        - vol_down: BTTN1032
        - mute: BTTN1031
        - power: BTTN1012
        - back: BTTN1045
        - input: BTTN1036
        - menu: BTTN1038
        - exit: BTTN1046
        - up: BTTN1041
        - down: BTTN1042
        - left: BTTN1043
        - right: BTTN1044
        - ok: BTTN1040
        - play: BTTN1016
        - pause: BTTN1018
        - stop: BTTN1020
        - ffw: BTTN1017
        - frw: BTTN1015
        - next: BTTN1021
        - previous: BTTN1019
        - dash: BTTN1010
        - 0: BTTN1000
        - 1: BTTN1001
        - 2: BTTN1002
        - 3: BTTN1003
        - 4: BTTN1004
        - 5: BTTN1005
        - 6: BTTN1006
        - 7: BTTN1007
        - 8: BTTN1008
        - 9: BTTN1009
        - sleep: BTTN1024
        - cc: BTTN1027
        - red: BTTN1050
        - green: BTTN1051
        - yellow: BTTN1053
        - blue: BTTN1052
        - mediaplayer: BTTN1023
        - connected_home: BTTN1039
        - live_tv: BTTN1055
        - mts_sap: BTTN1054

- id: restore_factory
  label: Restore Factory Settings
  kind: action
  params: []
  command: RSET9999

- id: automatic_search
  label: Automatic Channel Search
  kind: action
  params: []
  command: TSCN0001
```

## Feedbacks
```yaml
# Query commands return current state as enumerated values.
# Response format: ASCII hex string with 0D terminator.
# UNRESOLVED: response packet structure not documented in source

- id: current_input
  label: Current Input Source
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
  query_command: INPT????

- id: current_picture_mode
  label: Current Picture Mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
  query_command: PMOD????

- id: current_brightness
  label: Current Brightness
  type: integer
  range: [0, 100]
  query_command: BRIT????

- id: current_contrast
  label: Current Contrast
  type: integer
  range: [0, 100]
  query_command: CONT????

- id: current_color_saturation
  label: Current Color Saturation
  type: integer
  range: [0, 100]
  query_command: COLR????

- id: current_tint
  label: Current Tint
  type: integer
  range: [0, 100]
  query_command: TINT????

- id: current_sharpness
  label: Current Sharpness
  type: integer
  range: [0, 32]
  query_command: SHRP????

- id: current_aspect_ratio
  label: Current Aspect Ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, 1_to_1_pixel_map, panoramic, cinema]
  query_command: ASPT????

- id: current_overscan
  label: Current Overscan State
  type: enum
  values: [on, off]
  query_command: OVSN????

- id: current_color_temp
  label: Current Color Temperature
  type: enum
  values: [high, middle, mid_low, low]
  query_command: CTEM????

- id: current_backlight
  label: Current Backlight Value
  type: integer
  range: [0, 100]
  query_command: BKLV????

- id: current_sound_mode
  label: Current Sound Mode
  type: enum
  values: [standard, theater, music, speech, late_night]
  query_command: AMOD????

- id: current_volume
  label: Current Volume
  type: integer
  range: [0, 100]
  query_command: VOLM????

- id: current_mute_status
  label: Current Mute Status
  type: enum
  values: [not_muted, muted]
  query_command: MUTE????

- id: current_tv_speaker
  label: Current TV Speaker State
  type: enum
  values: [off, on]
  query_command: ASPK????

- id: current_tuner_mode
  label: Current Tuner Mode
  type: enum
  values: [antenna, cable]
  query_command: TUNR????

- id: current_caption_control
  label: Current Caption Control
  type: enum
  values: [off, on, cc_on_when_mute]
  query_command: CC##????

- id: current_osd_language
  label: Current OSD Language
  type: enum
  values: [english, spanish, french]
  query_command: LANG????

- id: current_standby_led
  label: Current Standby LED State
  type: enum
  values: [off, on]
  query_command: PLED????

- id: current_power_off_control_mode
  label: Current Power Off Control Mode
  type: enum
  values: [ac_only, all]
  query_command: PBTN????

- id: current_volume_range
  label: Current Volume Range
  type: integer
  range: [0, 100]
  query_command: MAVL????

- id: current_volume_control
  label: Current Volume Control Mode
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  query_command: SVOL????

- id: current_volume_locked_level
  label: Current Volume Locked Level
  type: integer
  range: [0, 100]
  query_command: VLFL????

- id: current_remote_key_mode
  label: Current Remote Key Mode
  type: enum
  values: [enable, disable, partial]
  query_command: RMOT????

- id: current_panel_key_mode
  label: Current Panel Key Mode
  type: enum
  values: [enable, disable]
  query_command: PANL????

- id: current_menu_access_mode
  label: Current Menu Access Mode
  type: enum
  values: [enable, disable]
  query_command: MENU????

- id: current_av_setting_menu_mode
  label: Current AV Setting Menu Mode
  type: enum
  values: [disable, enable]
  query_command: AVMN????

- id: current_osd_mode
  label: Current OSD Mode
  type: enum
  values: [enable, disable]
  query_command: OSD#????

- id: current_input_mode
  label: Current Input Mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  query_command: INPM????

- id: current_power_on_input
  label: Current Power On Input Selection
  type: enum
  values: [last, air, av, component, vga, hdmi1, hdmi2, hdmi3, hdmi4]
  query_command: POIS????

- id: current_speaker_mode
  label: Current Speaker Mode
  type: enum
  values: [speaker, off, arc_first]
  query_command: SPKM????

- id: current_b2b_mode
  label: Current B2B Mode
  type: enum
  values: [enable, disable]
  query_command: B2BM????

- id: current_usb_behavior
  label: Current USB Behavior
  type: enum
  values: [home, b2b]
  query_command: USBM????

- id: current_pixel_shifting
  label: Current Pixel Shifting State
  type: enum
  values: [off, on]
  query_command: PSHF????

- id: current_power_on_command_enable
  label: Current Power On Command Enable State
  type: enum
  values: [disabled, enabled]
  query_command: PWRE????
```

## Variables
```yaml
# All settable parameters also support direct query via ???? suffix.
# UNRESOLVED: discrete variable enumerate-all not separately documented from actions.
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source.
# Device may send power state changes or input change events, but protocol not specified.
```

## Macros
```yaml
# UNRESOLVED: multi-step macros not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: factory_reset_warning
    description: Restore Factory Settings (RSET9999) resets all user preferences. Requires manual reconfiguration.
    confirmation_required: true
# UNRESOLVED: no other safety warnings or interlock procedures stated in source.
```

## Notes

Command format: ASCII hex strings (space-separated bytes) terminated with `0D` (CR). Commands exist in two variants: TV-specific (prefixed with MAC address last 3 digits, e.g., `53 34 36 35` = "S465") and generic (`53 41 4C 4C` = "SALL") for all Hisense TVs. TV-specific commands required for RS-232 mode; generic commands work over IP control.

Sample generic command encoding (Power On): `53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D`

Sample TV-specific command encoding (Power On, MAC suffix 465): `53 34 36 35 50 4F 57 52 30 30 30 31 05 0D`

<!-- UNRESOLVED: TCP port number, response packet structure, unsolicited event format, firmware compatibility -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
retrieved_at: 2026-05-10T16:00:29.174Z
last_checked_at: 2026-06-25T15:38:27.551Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:38:27.551Z
matched_actions: 51
action_count: 85
confidence: medium
summary: "deterministic presence proof: 51/51 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source"
- "authentication procedure not described in source"
- "serial/RS-232 config not stated (commands reference RS-232 but transport is IP)"
- "port number not stated in source"
- "response packet structure not documented in source"
- "discrete variable enumerate-all not separately documented from actions."
- "unsolicited event notifications not documented in source."
- "multi-step macros not documented in source."
- "no other safety warnings or interlock procedures stated in source."
- "TCP port number, response packet structure, unsolicited event format, firmware compatibility"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
