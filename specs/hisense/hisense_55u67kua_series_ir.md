---
spec_id: admin/hisense-55u67kua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55U67KUA Series Control Spec"
manufacturer: HiSense
model_family: "55U67KUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "55U67KUA Series"
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
last_checked_at: 2026-05-14T18:17:16.125Z
generated_at: 2026-05-14T18:17:16.125Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.125Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "All 65 spec actions matched; transport verified; full catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 55U67KUA Series Control Spec

## Summary
Prosumer TV supporting both RS-232 serial control and discrete infrared remote commands. Serial protocol uses ASCII-encoded commands over RS-232C at 9600 baud, 8 data bits, no parity, 1 stop bit. IR protocol provides discrete on/off codes for power and input selection. No authentication required for either control method.

<!-- UNRESOLVED: network/IP control not documented in source -->

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
- powerable     # power on/off commands present (POWR, PWRE)
- routable       # input source selection commands present (INPT)
- queryable      # query commands returning state present (INPT????, PMOD????, etc.)
- levelable      # brightness, contrast, volume, etc. present (BRIT, CONT, VOLM, etc.)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Serial: POWR0001; IR discrete: 04FB718E"

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Serial: POWR0000; IR discrete: 04FB728D"

- id: enable_rs232_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
  notes: "Serial: PWRE0001"

- id: disable_rs232_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
  notes: "Serial: PWRE0000"

- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: |
        Input number:
        0 = TV, 1 = TV, 3 = Component, 4 = AV,
        6 = VGA, 9 = HDMI1, 10 = HDMI2, 11 = HDMI3, 12 = HDMI4

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0 = Standard, 2 = Vivid, 3 = EnergySaving,
        4 = Theater, 5 = Game, 6 = Sport

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-20"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: |
        0 = Auto, 2 = Normal, 3 = Zoom, 4 = Wide,
        5 = Direct, 6 = 1-to-1 pixel map, 7 = Panoramic, 8 = Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = On, 2 = Off"

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
      description: "0 = High, 2 = Middle, 3 = Mid-Low, 4 = Low"

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Standard, 2 = Theater, 3 = Music, 4 = Speech, 5 = Late night"

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
      description: "0-100"

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 2 = On"

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Antenna, 2 = Cable"

- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Off, 2 = On, 3 = CC on when mute"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0 = English, 2 = Español, 3 = Français"

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 2 = On"

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = AC ONLY, 1 = ALL"

- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = LOCKED, 1 = LAST VOLUME, 2 = AC RESET, 3 = STANDBY RESET"

- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = ENABLE, 1 = DISABLE, 2 = PARTIAL"

- id: set_panel_key
  label: Set Panel Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = ENABLE, 1 = DISABLE"

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = ENABLE, 1 = DISABLE"

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

# IR-only discrete actions (no serial equivalent)
- id: ir_select_hdmi1
  label: Select HDMI1 (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB7C83"

- id: ir_select_hdmi2
  label: Select HDMI2 (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB7D82"

- id: ir_select_hdmi3
  label: Select HDMI3 (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB7E81"

- id: ir_select_hdmi4
  label: Select HDMI4 (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB7F80"

- id: ir_select_hdmi5
  label: Select HDMI5 (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB807F"

- id: ir_select_vga
  label: Select VGA (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB817E"

- id: ir_select_usb
  label: Select USB (IR)
  kind: action
  params: []
  notes: "IR discrete code: 04FB827D"
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  notes: "Serial: MAVL(0000-0100)"

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  notes: "Serial: VLFL(0000-0100)"

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = DISABLE, 1 = ENABLE"
  notes: "Serial: AVMN0000/AVMN0001"

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = ENABLE, 1 = DISABLE"
  notes: "Serial: OSD#0000/OSD#0001"

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = LOCKED, 1 = SELECTABLE, 2 = AC RESET, 3 = STANDBY RESET"
  notes: "Serial: INPM0000-INPM0003"

- id: set_power_on_input_selection
  label: Set Power On Input Selection
  kind: action
  params:
    - name: input
      type: integer
      description: "0 = LAST, 1 = Air, 2 = AV, 3 = Component, 4 = VGA, 5 = HDMI1, 6 = HDMI2, 7 = HDMI3, 8 = HDMI4"
  notes: "Serial: POIS0000-POIS0008"

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = SPEAKER, 1 = OFF, 2 = ARC FIRST"
  notes: "Serial: SPKM0000/SPKM0001/SPKM0002"

- id: set_b2b_function_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = ENABLE, 1 = DISABLE"
  notes: "Serial: B2BM0000/B2BM0001"

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Home, 1 = B2B"
  notes: "Serial: USBM0000/USBM0001"

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Serial: PSHF0000/PSHF0001"

- id: automatic_channel_search
  label: Automatic Channel Search
  kind: action
  params: []
  notes: "Serial: TSCN0001"

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  notes: "Serial: CHAN0000"

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  notes: "Serial: CHAN0001"

- id: bttn_ch_plus
  label: Remote Button CH+
  kind: action
  params: []
  notes: "Serial: BTTN1034"

- id: bttn_ch_minus
  label: Remote Button CH-
  kind: action
  params: []
  notes: "Serial: BTTN1035"

- id: bttn_vol_minus
  label: Remote Button VOL-
  kind: action
  params: []
  notes: "Serial: BTTN1032"

- id: bttn_vol_plus
  label: Remote Button VOL+
  kind: action
  params: []
  notes: "Serial: BTTN1033"

- id: bttn_back
  label: Remote Button BACK
  kind: action
  params: []
  notes: "Serial: BTTN1045"

- id: bttn_power
  label: Remote Button POWER
  kind: action
  params: []
  notes: "Serial: BTTN1012"

- id: bttn_mute
  label: Remote Button MUTE
  kind: action
  params: []
  notes: "Serial: BTTN1031"

- id: bttn_dash
  label: Remote Button DASH
  kind: action
  params: []
  notes: "Serial: BTTN1010"

- id: bttn_input
  label: Remote Button INPUT
  kind: action
  params: []
  notes: "Serial: BTTN1036"

- id: bttn_media_player
  label: Remote Button Media Player (HiMedia)
  kind: action
  params: []
  notes: "Serial: BTTN1023"

- id: bttn_ok_enter
  label: Remote Button OK/ENTER
  kind: action
  params: []
  notes: "Serial: BTTN1040"

- id: bttn_menu
  label: Remote Button MENU
  kind: action
  params: []
  notes: "Serial: BTTN1038"

- id: bttn_exit
  label: Remote Button EXIT
  kind: action
  params: []
  notes: "Serial: BTTN1046"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]

- id: current_input
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]

- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]

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

- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_1_to_1, panoramic, cinema]

- id: overscan_state
  type: enum
  values: [on, off]

- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]

- id: backlight
  type: integer
  range: [0, 100]

- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]

- id: volume
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [off, on]

- id: tv_speaker_state
  type: enum
  values: [off, on]

- id: tuner_mode
  type: enum
  values: [antenna, cable]

- id: caption_control
  type: enum
  values: [off, on, cc_on_when_mute]

- id: standby_led
  type: enum
  values: [off, on]

- id: rs232_power_on_enabled
  type: boolean

- id: rs232_power_on_setting
  type: enum
  values: [disabled, enabled]
```

## Variables
```yaml
# UNRESOLVED: no variables beyond those covered by Feedbacks
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# Serial command format for reference:
# Set: S[CLIENT_ID][COMMAND][DATA][CHECKSUM][0x0D]
# Query: Q[CLIENT_ID][COMMAND]????[CHECKSUM][0x0D]
# Response: [CLIENT_ID]:OKAY|DATA[CHECKSUM][0x0D]
# CLIENT_ID = last 3 bytes of MAC for Smart TV, or selected ID for Feature TV
# CHECKSUM = 8-bit checksum ensuring total equals zero
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "RS-232 port must be enabled in Custom Install menu (access: Quick Settings > 7310)"
  - "To keep RS-232 active in standby, set Power On Command to Enable in Custom Install Menu"
# UNRESOLVED: no explicit safety warnings in source beyond menu access procedure
```

## Notes
Protocol is case-sensitive. Serial uses ASCII encoding with carriage-return (0x0D) termination. Checksum is 8-bit, calculated so the sum of all bytes including checksum equals zero. For TV-specific commands, CLIENT_ID is the last 3 bytes of the TV's MAC address. "ALL" can be used as broadcast CLIENT_ID. "WAIT" acknowledgement indicates command accepted but not yet completed.

IR discrete codes use Pronto CCF format; hex codes in 04FB[DATA][~DATA] format.
<!-- UNRESOLVED: TCP/IP control protocol not documented -->
<!-- UNRESOLVED: network port number not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.125Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.125Z
matched_actions: 64
action_count: 64
confidence: high
summary: "All 65 spec actions matched; transport verified; full catalogue coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
