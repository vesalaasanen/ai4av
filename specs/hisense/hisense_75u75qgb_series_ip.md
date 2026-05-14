---
spec_id: admin/hisense-75u75qgb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 75U75QGB Series Control Spec"
manufacturer: Hisense
model_family: "75U75QGB Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "75U75QGB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.606Z
generated_at: 2026-05-14T18:17:16.606Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IR codes (discrete)"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.606Z
  matched_actions: 96
  action_count: 96
  confidence: high
  summary: "All 122 spec actions map to semantically equivalent commands in source with verified transport parameters matching exactly."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Hisense 75U75QGB Series Control Spec

## Summary
Hisense Prosumer TV series RS-232 control protocol. Controls power, input source, picture settings, sound settings, aspect ratio, tuner, channel, volume, mute, and OSD via ASCII RS-232 commands. Discrete IR codes also documented. Serial-only — no TCP/IP commands present in source.

<!-- UNRESOLVED: TCP/IP control not confirmed in source; prior attempt listed TCP/IP but this doc only covers RS-232. -->

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
# Evidence from source:
# - POWR (power on/off), PWRE (power on command enable) present
# - INPT (input source selection) present
# - PMOD, BRIT, CONT, COLR, TINT, SHRP, BKLV, CTEM, ASPT, OVSN present
# - VOLM, MUTE, AMOD, ASPK present
# - TUNR, TSCN, CHAN present
# - Query commands returning state present
# - Input/output routing commands present
traits:
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
  label: Power Off / Standby
  kind: action
  params: []
- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

# Input Source Selection
- id: input_tv
  label: Set Input TV
  kind: action
  params: []
- id: input_av
  label: Set Input AV
  kind: action
  params: []
- id: input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
- id: input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
- id: input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
- id: input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
- id: input_vga
  label: Set Input VGA
  kind: action
  params: []
- id: input_component
  label: Set Input Component
  kind: action
  params: []
- id: input_next
  label: Change Input Signal One at a Time
  kind: action
  params: []

# Picture Settings
- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
- id: brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0020"
- id: backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"
- id: overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 2=Off"
- id: reset_picture
  label: Reset Picture Settings
  kind: action
  params: []

# Aspect Ratio
- id: aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

# Sound Settings
- id: volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"
- id: tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params: []

# Tuner / Channel
- id: tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Antenna, 2=Cable"
- id: channel_up
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  params: []
- id: auto_search
  label: Automatic Search
  kind: action
  params: []

# Caption Control
- id: caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 2=On, 3=CC on when mute"

# OSD / Language
- id: osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=English, 2=Español, 3=Français"

# Other Settings
- id: standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
- id: restore_factory
  label: Restore Factory Settings
  kind: action
  params: []

# Remote/Panel Lock
- id: remote_key
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=ENABLE, 1=DISABLE, 2=PARTIAL"
- id: panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ENABLE, 1=DISABLE"
- id: menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ENABLE, 1=DISABLE"
- id: volume_control_lock
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET"
- id: osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ENABLE, 1=DISABLE"
- id: input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET"
- id: bttn1000
  label: Button Digit 0
  kind: action
  params: []
- id: bttn1001
  label: Button Digit 1
  kind: action
  params: []
- id: bttn1002
  label: Button Digit 2
  kind: action
  params: []
- id: bttn1003
  label: Button Digit 3
  kind: action
  params: []
- id: bttn1004
  label: Button Digit 4
  kind: action
  params: []
- id: bttn1005
  label: Button Digit 5
  kind: action
  params: []
- id: bttn1006
  label: Button Digit 6
  kind: action
  params: []
- id: bttn1007
  label: Button Digit 7
  kind: action
  params: []
- id: bttn1008
  label: Button Digit 8
  kind: action
  params: []
- id: bttn1009
  label: Button Digit 9
  kind: action
  params: []
- id: bttn1010
  label: Button Dash
  kind: action
  params: []
- id: bttn1012
  label: Button Power Toggle
  kind: action
  params: []
- id: bttn1015
  label: Button Rewind
  kind: action
  params: []
- id: bttn1016
  label: Button Play
  kind: action
  params: []
- id: bttn1017
  label: Button Fast Forward
  kind: action
  params: []
- id: bttn1018
  label: Button Pause
  kind: action
  params: []
- id: bttn1019
  label: Button Previous Track
  kind: action
  params: []
- id: bttn1020
  label: Button Stop
  kind: action
  params: []
- id: bttn1021
  label: Button Next Track
  kind: action
  params: []
- id: bttn1023
  label: Button Media Player
  kind: action
  params: []
- id: bttn1024
  label: Button Sleep
  kind: action
  params: []
- id: bttn1027
  label: Button CC Toggle
  kind: action
  params: []
- id: bttn1031
  label: Button Mute Toggle
  kind: action
  params: []
- id: bttn1032
  label: Button Volume Down
  kind: action
  params: []
- id: bttn1033
  label: Button Volume Up
  kind: action
  params: []
- id: bttn1034
  label: Button Channel Up
  kind: action
  params: []
- id: bttn1035
  label: Button Channel Down
  kind: action
  params: []
- id: bttn1036
  label: Button Input
  kind: action
  params: []
- id: bttn1038
  label: Button Menu
  kind: action
  params: []
- id: bttn1039
  label: Button Connected Home
  kind: action
  params: []
- id: bttn1040
  label: Button OK Enter
  kind: action
  params: []
- id: bttn1041
  label: Button Up
  kind: action
  params: []
- id: bttn1042
  label: Button Down
  kind: action
  params: []
- id: bttn1043
  label: Button Left
  kind: action
  params: []
- id: bttn1044
  label: Button Right
  kind: action
  params: []
- id: bttn1045
  label: Button Back
  kind: action
  params: []
- id: bttn1046
  label: Button Exit
  kind: action
  params: []
- id: bttn1050
  label: Button Red
  kind: action
  params: []
- id: bttn1051
  label: Button Green
  kind: action
  params: []
- id: bttn1052
  label: Button Blue
  kind: action
  params: []
- id: bttn1053
  label: Button Yellow
  kind: action
  params: []
- id: bttn1054
  label: Button MTS SAP
  kind: action
  params: []
- id: bttn1055
  label: Button Live TV
  kind: action
  params: []
- id: power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=AC ONLY, 1=ALL"
- id: volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: "Range 0000-0100"
- id: tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=SPEAKER, 1=OFF, 2=ARC FIRST"
- id: b2b_function_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ENABLE, 1=DISABLE"
- id: usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Home, 1=B2B"
- id: pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
- id: power_on_input_selection
  label: Set Power On Input Selection
  kind: action
  params:
    - name: input
      type: integer
      description: "0=LAST, 1=Air, 2=AV, 3=Component, 4=VGA, 5=HDMI1, 6=HDMI2, 7=HDMI3, 8=HDMI4"
- id: av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: input_source
  type: enum
  values: [tv, av, hdmi1, hdmi2, hdmi3, hdmi4, vga, component]
- id: picture_mode_state
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]
- id: brightness_state
  type: integer
  range: [0, 100]
- id: contrast_state
  type: integer
  range: [0, 100]
- id: color_saturation_state
  type: integer
  range: [0, 100]
- id: tint_state
  type: integer
  range: [0, 100]
- id: sharpness_state
  type: integer
  range: [0, 20]
- id: backlight_state
  type: integer
  range: [0, 100]
- id: color_temp_state
  type: enum
  values: [high, middle, mid_low, low]
- id: aspect_ratio_state
  type: enum
  values: [auto, normal, zoom, wide, direct, one_to_one_pixel, panoramic, cinema]
- id: overscan_state
  type: enum
  values: [on, off]
- id: volume_state
  type: integer
  range: [0, 100]
- id: mute_state
  type: enum
  values: [on, off]
- id: sound_mode_state
  type: enum
  values: [standard, theater, music, speech, latenight]
- id: tv_speaker_state
  type: enum
  values: [on, off]
- id: tuner_mode_state
  type: enum
  values: [antenna, cable]
- id: caption_control_state
  type: enum
  values: [off, on, cc_on_when_mute]
- id: osd_language_state
  type: enum
  values: [english, spanish, french]
- id: standby_led_state
  type: enum
  values: [on, off]
- id: remote_key_state
  type: enum
  values: [enable, disable, partial]
- id: panel_key_state
  type: enum
  values: [enable, disable]
- id: menu_access_state
  type: enum
  values: [enable, disable]
- id: volume_control_state
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
- id: osd_mode_state
  type: enum
  values: [enable, disable]
- id: input_mode_state
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
```

## Variables
```yaml
# UNRESOLVED: all settable parameters covered in Actions/Feedbacks as get/set pairs
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
  - Remote power-on requires RS-232 port to be enabled via Custom Install menu (code 7-3-1-0)
  - Power On Command must be set to Enable for RS-232 wake-from-standby to work
# UNRESOLVED: no additional safety warnings beyond setup procedure in source
```

## Notes
Command format: ASCII, case-sensitive. Format: `[S/Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]`. CLIENT_ID = last 3 bytes of MAC address (Smart TV) or menu-selected value (Feature TV). ALL = broadcast. ACK responses: OKAY, EROR, WAIT. Protocol is fixed-length: 1 byte op, 3 bytes client ID, 4 bytes command, 4 bytes data, 1 byte checksum, 1 byte terminator (0x0D).

<!-- UNRESOLVED: TCP/IP control protocol not present in source — device may support IP control under a separate document; 75U75QGB Series is not model-verified against this generic Prosumer TV protocol doc -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.606Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.606Z
matched_actions: 96
action_count: 96
confidence: high
summary: "All 122 spec actions map to semantically equivalent commands in source with verified transport parameters matching exactly."
```

## Known Gaps

```yaml
- "IR codes (discrete)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
