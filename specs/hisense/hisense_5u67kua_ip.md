---
spec_id: admin/hisense-5u67kua
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 5U67KUA Control Spec"
manufacturer: Hisense
model_family: 5U67KUA
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 5U67KUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
  - builders.intel.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - https://builders.intel.com/docs/networkbuilders/hisense-ops-brings-more-compute-power-to-interactive-displays-1770982710.pdf
retrieved_at: 2026-05-12T19:17:07.221Z
last_checked_at: 2026-06-02T22:07:48.345Z
generated_at: 2026-06-02T22:07:48.345Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control protocol not documented in source — only RS-232 serial and discrete IR covered"
  - "TCP/IP control - source documents RS-232 only"
  - "source does not document unsolicited event/notification messages from TV."
  - "no explicit multi-step macro sequences documented in source."
  - "fault behavior, error recovery sequences, and voltage/power specs not in source."
  - "TCP/IP control protocol not documented in this source"
  - "port number for TCP control not stated (source covers RS-232 only)"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:48.345Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# Hisense 5U67KUA Control Spec

## Summary
Prosumer LCD TV supporting both RS-232 serial control and discrete IR. RS-232 protocol uses ASCII command/response format over 9600 8N1. Supports multi-TV addressing via MAC address-derived client IDs and broadcast (ALL). Protocol documented in "HISENSE RS232 CONTROL GUIDE" V3.6 (2017).

<!-- UNRESOLVED: TCP/IP control protocol not documented in source — only RS-232 serial and discrete IR covered -->

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

# UNRESOLVED: TCP/IP control - source documents RS-232 only
```

## Traits
```yaml
# inferred from command set presence:
powerable: true
routable: true   # INPT (input source selection)
queryable: true  # QUERY variants for all major commands
levelable: true  # BRIT, CONT, COLR, TINT, SHRP, VOLM, BKLV
```

## Actions
```yaml
# Format: S[CLIENT_ID][COMMAND][DATA][CHECKSUM]<CR>
# CLIENT_ID = last 3 bytes of MAC address (hex) for Smart TV, or menu-selected value
# BROADCAST = ALL
# Query prefix: Q instead of S, DATA = ???? , response: [CLIENT_ID]:[ACK][DATA4][CHECKSUM]<CR>

- id: power_on
  label: Power On
  kind: action
  params: []
  protocol: serial
  command: POWR0001
  description: Power on TV

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
  protocol: serial
  command: POWR0000
  description: Enter standby

- id: input_tv
  label: Set Input TV
  kind: action
  params: []
  protocol: serial
  command: INPT0001

- id: input_av
  label: Set Input AV
  kind: action
  params: []
  protocol: serial
  command: INPT0004

- id: input_component
  label: Set Input Component
  kind: action
  params: []
  protocol: serial
  command: INPT0003

- id: input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
  protocol: serial
  command: INPT0009

- id: input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
  protocol: serial
  command: INPT0010

- id: input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
  protocol: serial
  command: INPT0011

- id: input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
  protocol: serial
  command: INPT0012

- id: input_vga
  label: Set Input VGA
  kind: action
  params: []
  protocol: serial
  command: INPT0006

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [standard, vivid, energy_saving, theater, game, sport]
      description: "PMOD0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "BRIT0000-0100"

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "CONT0000-0100"

- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "COLR0000-0100"

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "TINT0000-0100"

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]
      description: "SHRP0000-0020"

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [auto, normal, zoom, wide, direct, pixel_1to1, panoramic, cinema]
      description: "ASPT0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel map, 0007=Panoramic, 0008=Cinema"

- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: "OVSN0000=On, 0002=Off"

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: enum
      values: [high, middle, mid_low, low]
      description: "CTEM0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

- id: backlight_set
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "BKLV0000-0100"

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [standard, theater, music, speech, late_night]
      description: "AMOD0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late Night"

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "VOLM0000-0100"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  protocol: serial
  command: MUTE0001

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  protocol: serial
  command: MUTE0000

- id: tv_speaker_set
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "ASPK0000=Off, 0002=On"

- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [antenna, cable]
      description: "TUNR0000=Antenna, 0002=Cable"

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  protocol: serial
  command: CHAN0001

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  protocol: serial
  command: CHAN0000

- id: caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, on_when_mute]
      description: "CC##0000=Off, 0002=On, 0003=CC on when mute"

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  params: []
  protocol: serial
  command: RSTP1000

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params: []
  protocol: serial
  command: RSTA2000

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  protocol: serial
  command: RSET9999

- id: osd_language_set
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: enum
      values: [english, spanish, french]
      description: "LANG0000=English, 0002=Español, 0003=Français"

- id: standby_led_set
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "PLED0000=Off, 0002=On"

- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
  protocol: serial
  command: PWRE0001
  description: Allows TV to be powered on via RS-232 while in standby

- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
  protocol: serial
  command: PWRE0000

- id: remote_key_send
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: string
      description: "BTTN1XXX - Remote Control Buttons simulator. Values: 1000=Digit0, 1001=Digit1...1012=POWER, 1031=MUTE, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1036=INPUT, 1038=MENU, 1040=OK/ENTER, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1045=BACK, 1046=EXIT, 1024=SLEEP, etc."

- id: remote_lock_set
  label: Set Remote Key Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [enable, disable, partial]
      description: "RMOT0000=Enable, 0001=Disable, 0002=Partial"

- id: panel_key_set
  label: Set Panel Key Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]
      description: "PANL0000=Enable, 0001=Disable"

- id: menu_access_set
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]
      description: "MENU0000=Enable, 0001=Disable"

- id: osd_mode_set
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]
      description: "OSD#0000=Enable, 0001=Disable"

- id: input_mode_set
  label: Set Input Mode Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [locked, selectable, ac_reset, standby_reset]
      description: "INPM0000=Locked, 0001=Selectable, 0002=AC Reset, 0003=Standby Reset"

- id: volume_control_set
  label: Set Volume Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [locked, last_volume, ac_reset, standby_reset]
      description: "SVOL0000=Locked, 0001=Last Volume, 0002=AC Reset, 0003=Standby Reset"

- id: volume_locked_level_set
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "VLFL0000-0100"

- id: max_volume_level_set
  label: Set Maximum Volume Level
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "MAVL0000-0100"

- id: power_off_control_set
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ac_only, all]
      description: "PBTN0000=AC Only, 0001=ALL"

- id: power_on_input_set
  label: Set Power On Input Selection
  kind: action
  params:
    - name: source
      type: enum
      values: [last, air, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
      description: "POIS0000=Last, 0001=Air, 0002=AV, 0003=Component, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4, 0006=VGA"

- id: av_setting_menu_set
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: "AVMN0000=Disable, 0001=Enable"
- id: tv_speaker_mode_set
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "SPKM0000=Speaker, 0001=Off, 0002=ARC First"

- id: b2b_mode_set
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "B2BM0000=Enable, 0001=Disable"

- id: usb_behavior_set
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: string
      description: "USBM0000=Home, 0001=B2B"

- id: pixel_shifting_set
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: string
      description: "PSHF0000=Off, 0001=On"

- id: auto_channel_scan
  label: Automatic Channel Search
  kind: action
  params: []
  command: TSCN0001
```

## Feedbacks
```yaml
# Query command format: Q[CLIENT_ID][COMMAND]????[CHECKSUM]<CR>
# Response: [CLIENT_ID]:[ACK][DATA4][CHECKSUM]<CR>
# ACK values: OKAY, EROR, WAIT

- id: power_state
  label: Power State
  type: enum
  values: [standby, on]
  query: POWR????

- id: current_input
  label: Current Input
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
  query: INPT????

- id: current_picture_mode
  label: Current Picture Mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
  query: PMOD????

- id: current_brightness
  label: Current Brightness
  type: integer
  range: [0, 100]
  query: BRIT????

- id: current_contrast
  label: Current Contrast
  type: integer
  range: [0, 100]
  query: CONT????

- id: current_color_saturation
  label: Current Color Saturation
  type: integer
  range: [0, 100]
  query: COLR????

- id: current_tint
  label: Current Tint
  type: integer
  range: [0, 100]
  query: TINT????

- id: current_sharpness
  label: Current Sharpness
  type: integer
  range: [0, 20]
  query: SHRP????

- id: current_aspect_ratio
  label: Current Aspect Ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_1to1, panoramic, cinema]
  query: ASPT????

- id: overscan_state
  label: Overscan State
  type: enum
  values: [on, off]
  query: OVSN????

- id: current_color_temp
  label: Current Color Temperature
  type: enum
  values: [high, middle, mid_low, low]
  query: CTEM????

- id: current_backlight
  label: Current Backlight
  type: integer
  range: [0, 100]
  query: BKLV????

- id: current_sound_mode
  label: Current Sound Mode
  type: enum
  values: [standard, theater, music, speech, late_night]
  query: AMOD????

- id: current_volume
  label: Current Volume
  type: integer
  range: [0, 100]
  query: VOLM????

- id: mute_state
  label: Mute State
  type: enum
  values: [not_muted, muted]
  query: MUTE????

- id: tv_speaker_state
  label: TV Speaker State
  type: enum
  values: [off, on]
  query: ASPK????

- id: tuner_mode
  label: Tuner Mode
  type: enum
  values: [antenna, cable]
  query: TUNR????

- id: caption_mode
  label: Caption Mode
  type: enum
  values: [off, on, on_when_mute]
  query: CC##????

- id: standby_led_state
  label: Standby LED State
  type: enum
  values: [off, on]
  query: PLED????

- id: remote_lock_state
  label: Remote Key Lock State
  type: enum
  values: [enable, disable, partial]
  query: RMOT????

- id: panel_key_state
  label: Panel Key State
  type: enum
  values: [enable, disable]
  query: PANL????

- id: menu_access_state
  label: Menu Access State
  type: enum
  values: [enable, disable]
  query: MENU????

- id: osd_mode_state
  label: OSD Mode State
  type: enum
  values: [enable, disable]
  query: OSD#????

- id: input_mode_state
  label: Input Mode Lock State
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  query: INPM????

- id: volume_control_state
  label: Volume Control Mode
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  query: SVOL????

- id: volume_locked_level
  label: Volume Locked Level
  type: integer
  range: [0, 100]
  query: VLFL????

- id: max_volume_level
  label: Maximum Volume Level
  type: integer
  range: [0, 100]
  query: MAVL????

- id: power_off_control_mode
  label: Power Off Control Mode
  type: enum
  values: [ac_only, all]
  query: PBTN????

- id: rs232_power_on_enabled
  label: RS-232 Remote Power On Enabled
  type: boolean
  query: PWRE????
```

## Variables
```yaml
# No standalone settable variables beyond action parameters.
# All parameters encoded directly in action commands.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event/notification messages from TV.
# TV sends only synchronous ACK responses to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: rs232_power_enable
    description: >-
      RS-232 port must be explicitly enabled in Custom Install menu
      (code 7-3-1-0 on remote) before serial control is operational.
      If power-on control is needed while TV is in standby,
      "Power On Command" setting must be set to Enable before exiting
      the Custom Install menu.
  - id: power_on_rs232_dependency
    description: >-
      POWRON command only works when RS-232 Remote Power On has been
      enabled via PWRE0001. Without this enable, the TV cannot be
      powered on via RS-232 from standby.
# UNRESOLVED: fault behavior, error recovery sequences, and voltage/power specs not in source.
```

## Notes
Serial protocol is ASCII over RS-232C. Command format: `[S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM]<CR>`. CLIENT_ID for Smart TV = last 3 bytes of Ethernet MAC address (hex). Broadcast = `ALL`. Checksum is 8-bit modulo-256 sum of all bytes including CHECKSUM itself = 0.

Protocol documented as V3.6 (2017-04-17). Models covered include the Prosumer TV series including 5U67KUA.

IR section provides discrete Pronto CCF codes for use with IR学习型遥控器 transmitters — separate from RS-232 control.

ACK responses: `OKAY` (success), `EROR` (error), `WAIT` (processing — poll again).

<!-- UNRESOLVED: TCP/IP control protocol not documented in this source -->
<!-- UNRESOLVED: port number for TCP control not stated (source covers RS-232 only) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
  - builders.intel.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - https://builders.intel.com/docs/networkbuilders/hisense-ops-brings-more-compute-power-to-interactive-displays-1770982710.pdf
retrieved_at: 2026-05-12T19:17:07.221Z
last_checked_at: 2026-06-02T22:07:48.345Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:48.345Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control protocol not documented in source — only RS-232 serial and discrete IR covered"
- "TCP/IP control - source documents RS-232 only"
- "source does not document unsolicited event/notification messages from TV."
- "no explicit multi-step macro sequences documented in source."
- "fault behavior, error recovery sequences, and voltage/power specs not in source."
- "TCP/IP control protocol not documented in this source"
- "port number for TCP control not stated (source covers RS-232 only)"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
