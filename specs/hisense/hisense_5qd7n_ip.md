---
spec_id: admin/hisense-5qd7n
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5QD7N Control Spec"
manufacturer: HiSense
model_family: 5QD7N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5QD7N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
retrieved_at: 2026-07-21T23:02:15.662Z
last_checked_at: 2026-10-01T11:38:32.533Z
generated_at: 2026-10-01T11:38:32.533Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no auth mechanism described in source"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macros described in source"
  - "firmware version compatibility not stated"
  - "no binary encoding tables beyond hex byte examples provided"
  - "no authentication mechanism described"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:38:32.533Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec action units are present verbatim in the source's command table with matching opcodes, enums, and shapes; transport port matches. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 5QD7N Control Spec

## Summary
Commercial display panel controlled via TCP/IP hex string commands on port 8000. Same command set as RS-232. Supports power, screen, input routing, image adjustments, sound mode, scheduling, and queryable state. Wake-on-LAN supported for wired networks only.

<!-- UNRESOLVED: no auth mechanism described in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 8000  # default; range 5000-12000 if 8000 occupied
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # power off, screen off/on, AC power mode
- routable        # HDMI1/HDMI2/DP/VGA/PC/DVI input selection
- queryable       # query commands for power, source, volume, brightness, network, etc.
- levelable       # volume, brightness, contrast, sharpness, color temperature
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: screen_off
  label: Screen Off
  kind: action
  params: []

- id: screen_on
  label: Screen On
  kind: action
  params: []

- id: reboot
  label: Reboot
  kind: action
  params: []

- id: set_ac_power_on_mode
  label: Set AC Power On Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=direct, 1=last, 2=standby

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: 0x16=DP, 0x17=VGA, 0x0E=HDMI1, 0x0F=HDMI2, 0x0C=PC, 0x09=DVI

- id: set_screen_rotation
  label: Set Screen Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: 0=landscape, 1=portrait

- id: set_mute
  label: Set Mute
  kind: action
  params: []

- id: set_unmute
  label: Set Unmute
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: 0-100

- id: set_backlight_brightness
  label: Set Backlight Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: 0-30

- id: set_backlight_brightness_auto_adjust
  label: Set Backlight Brightness Auto Adjust
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=off, 1=on

- id: set_date
  label: Set Date
  kind: action
  params:
    - name: year
      type: integer
    - name: month
      type: integer
    - name: day
      type: integer

- id: set_time
  label: Set Time
  kind: action
  params:
    - name: hour
      type: integer
    - name: minute
      type: integer
    - name: second
      type: integer

- id: set_schedule_power_on
  label: Set Schedule Power On
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=off, 1=everyday
    - name: hour
      type: integer
    - name: minute
      type: integer

- id: set_schedule_power_off
  label: Set Schedule Power Off
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=off, 1=everyday
    - name: hour
      type: integer
    - name: minute
      type: integer

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0x20=32 (source must be DP/VGA/HDMI/PC/DVI)

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0=off, 1=low, 2=medium, 3=high, 4=auto (source must be DP/VGA/HDMI/PC/DVI)

- id: set_image_scaling
  label: Set Image Scaling
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=full, 1=16:9, 2=4:3, 3=scaling1, 4=scaling2, 5=point-to-point

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=standard, 1=bright, 2=soft, 3=movie, 4=text, 5=gaming, 12=nature

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=standard, 1=music, 2=news, 8=movie, 16=sports, 32=custom, 48=voice, 64=meeting

- id: set_eye_protection_mode
  label: Set Eye Protection Mode
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=off, 1=on

- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  params: []

- id: set_anti_burn_in
  label: Set Anti-Burn-In (Image Retention)
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=off, 1=on

- id: set_power_on_delay
  label: Set Power On Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: 2-255 seconds, 0=off

- id: set_video_wall
  label: Set Video Wall
  kind: action
  params:
    - name: vertical_count
      type: integer
    - name: horizontal_count
      type: integer
    - name: position
      type: integer
      description: Device position number

- id: set_static_ip
  label: Set Static IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: IP address (4 bytes)
    - name: subnet
      type: string
      description: Subnet mask (4 bytes)
    - name: gateway
      type: string
      description: Gateway (4 bytes)
    - name: dns
      type: string
      description: DNS (4 bytes)

- id: set_usb_lock
  label: Set USB Lock
  kind: action
  params:
    - name: locked
      type: integer
      description: 0=lock, 1=enable

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: send_remote_key
  label: Send Remote Controller Key Code
  kind: action
  params:
    - name: key
      type: integer
      description: 0x0000=Menu, 0x0001=UP, 0x0002=DOWN, 0x0003=LEFT, 0x0004=RIGHT, 0x0005=OK, 0x0006=Return, 0x0007=Source

- id: open_settings
  label: Open Settings
  kind: action
  params: []

- id: open_home
  label: Open Home
  kind: action
  params: []

- id: open_cms
  label: Open CMS
  kind: action
  params: []

- id: open_screen_cast
  label: Open Screen Cast
  kind: action
  params: []

- id: turn_on_hotspot
  label: Turn On Hotspot
  kind: action
  params: []

- id: take_screenshot
  label: Take Screenshot
  kind: action
  params: []

- id: freeze_screen
  label: Freeze Screen
  kind: action
  params:
    - name: freeze
      type: integer
      description: 1=freeze, 0=unfreeze
```

## Feedbacks
```yaml
- id: tv_status_response
  label: TV Status Response
  kind: feedback
  description: Response to Query TV Status
  params:
    - name: volume
      type: integer
    - name: source
      type: string
      description: "05 01=PC, 05 02=DVI, 05 03=DP, 05 04=HDMI2, 05 05=HDMI1, 08 01=VGA"
    - name: power
      type: string
      description: "00=power on, FF=power off"
    - name: mute
      type: string
      description: "01=mute, 00=unmute"
    - name: signal
      type: string
      description: "00=no signal, 01=has signal"

- id: screen_status_response
  label: Screen Status Response
  kind: feedback
  params:
    - name: state
      type: string
      description: "00=screen off, 01=screen on"

- id: source_response
  label: Source Response
  kind: feedback
  params:
    - name: source
      type: string

- id: sw_version_response
  label: SW Version Response
  kind: feedback
  params:
    - name: date
      type: string
      description: Year Month Day

- id: backlight_brightness_response
  label: Backlight Brightness Response
  kind: feedback
  params:
    - name: mode
      type: integer
      description: "01=bright, 02=soft, 03=auto adjust, 04=stereo freq conversion, 05=comfort freq conversion, 06=custom"
    - name: value
      type: integer
      description: Backlight brightness 0-30 (when mode is custom)

- id: brightness_response
  label: Brightness Response
  kind: feedback
  params:
    - name: value
      type: integer

- id: network_status_response
  label: Network Status Response
  kind: feedback
  params:
    - name: connected
      type: string
      description: "00=no network, 01=network connected"

- id: sound_mode_response
  label: Sound Mode Response
  kind: feedback
  params:
    - name: mode
      type: integer

- id: ac_power_on_status_response
  label: AC Power On Status Response
  kind: feedback
  params:
    - name: mode
      type: string
      description: "00=power on, 01=last mode, 02=standby"

- id: ip_address_response
  label: IP Address Response
  kind: feedback
  params:
    - name: ip
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: dns
      type: string

- id: device_temperature_response
  label: Device Temperature Response
  kind: feedback
  params:
    - name: celsius
      type: integer

- id: picture_mode_response
  label: Picture Mode Response
  kind: feedback
  params:
    - name: mode
      type: integer

- id: usb_status_response
  label: USB Status Response
  kind: feedback
  params:
    - name: locked
      type: string
      description: "00=off, 01=on"

- id: eye_protection_mode_response
  label: Eye Protection Mode Response
  kind: feedback
  params:
    - name: enabled
      type: string
      description: "00=off, 01=on"

- id: serial_number_response
  label: Serial Number Response
  kind: feedback
  params:
    - name: sn
      type: string
      description: 23 bytes ASCII

- id: device_id_response
  label: Device ID Response
  kind: feedback
  params:
    - name: id
      type: string
      description: 32 bytes

- id: mac_address_response
  label: MAC Address Response
  kind: feedback
  params:
    - name: mac
      type: string
      description: 6 bytes hex

- id: volume_response
  label: Volume Response
  kind: feedback
  params:
    - name: volume
      type: integer

- id: serial_port_id_response
  label: Serial Port ID Response
  kind: feedback
  params:
    - name: id
      type: integer

- id: brand_response
  label: Brand Response
  kind: feedback
  params:
    - name: brand
      type: string
      description: ASCII brand name

- id: model_response
  label: Model Response
  kind: feedback
  params:
    - name: model
      type: string
      description: ASCII model name
```

## Variables
```yaml
# All image and audio parameters are settable via actions with integer params.
# No separate Variables section required.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
IP control uses same hex command format as RS-232. Default port 8000; alternate range 5000–12000. Wake On LAN requires wired network and dedicated WoL software or magic packet. Sending a scheduled power-on/off clears all prior schedule settings. Video wall command overwrites previous configuration. Factory reset clears all user settings. Screen off only blanks the display; power remains on.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no binary encoding tables beyond hex byte examples provided -->
<!-- UNRESOLVED: no authentication mechanism described -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
retrieved_at: 2026-07-21T23:02:15.662Z
last_checked_at: 2026-10-01T11:38:32.533Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:38:32.533Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec action units are present verbatim in the source's command table with matching opcodes, enums, and shapes; transport port matches. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no auth mechanism described in source"
- "no unsolicited event notifications described in source"
- "no explicit multi-step macros described in source"
- "firmware version compatibility not stated"
- "no binary encoding tables beyond hex byte examples provided"
- "no authentication mechanism described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
