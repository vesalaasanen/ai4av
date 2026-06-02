---
spec_id: admin/planar-slm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar SLM Series Control Spec"
manufacturer: Planar
model_family: "Planar Simplicity M Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar Simplicity M Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-06-02T17:23:48.967Z
generated_at: 2026-06-02T17:23:48.967Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not document unsolicited push notifications."
  - "no multi-step macros documented in source."
  - "source contains no explicit safety warnings or interlock procedures beyond"
  - "firmware compatibility ranges; binary/hex command encodings (protocol is ASCII only); SSH credential defaults; numeric KEY values for the few keys whose decimal codes were not transcribed (4, 7, 8, 10, 11, 16)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:48.967Z
  matched_actions: 226
  action_count: 226
  confidence: medium
  summary: "All 226 spec actions match source commands; transport values verified in source; full command-set coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar SLM Series Control Spec

## Summary
Planar Simplicity M Series LCD displays expose an ASCII command protocol over RS-232 (DB9, null-modem). Same command set is also reachable over TCP/UDP port 5000 and (with password auth) over SSH port 2222. Commands use OPCODE(MODIFIERS)OPERATOR OPERANDS TERM structure with terminators [CR], [LF], or `;`.

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 5000   # TCP/UDP "RS232 Network Port" per section 6.1
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # RS-232/TCP/UDP path requires no auth. SSH path (port 2222) uses password - see Notes.
```

## Traits
```yaml
- powerable    # inferred from DISPLAY.POWER and KEY=STDBY.* commands
- queryable    # inferred from numerous '?' query commands
- routable     # inferred from SOURCE.SELECT input routing
- levelable    # inferred from BRIGHTNESS / CONTRAST / VOLUME etc. 0-100 ranges
```

## Actions
```yaml
# ---- Picture ----
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "BRIGHTNESS={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: brightness_query
  label: Query Brightness
  kind: query
  command: "BRIGHTNESS?[CR]"
  params: []

- id: brightness_increment
  label: Increment Brightness
  kind: action
  command: "BRIGHTNESS+[CR]"
  params: []

- id: brightness_decrement
  label: Decrement Brightness
  kind: action
  command: "BRIGHTNESS-[CR]"
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "CONTRAST={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: contrast_query
  label: Query Contrast
  kind: query
  command: "CONTRAST?[CR]"
  params: []

- id: contrast_increment
  label: Increment Contrast
  kind: action
  command: "CONTRAST+[CR]"
  params: []

- id: contrast_decrement
  label: Decrement Contrast
  kind: action
  command: "CONTRAST-[CR]"
  params: []

- id: color_set
  label: Set Color
  kind: action
  command: "COLOR={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: color_query
  label: Query Color
  kind: query
  command: "COLOR?[CR]"
  params: []

- id: color_increment
  label: Increment Color
  kind: action
  command: "COLOR+[CR]"
  params: []

- id: color_decrement
  label: Decrement Color
  kind: action
  command: "COLOR-[CR]"
  params: []

- id: tint_set
  label: Set Tint
  kind: action
  command: "TINT={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: tint_query
  label: Query Tint
  kind: query
  command: "TINT?[CR]"
  params: []

- id: tint_increment
  label: Increment Tint
  kind: action
  command: "TINT+[CR]"
  params: []

- id: tint_decrement
  label: Decrement Tint
  kind: action
  command: "TINT-[CR]"
  params: []

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "SHARPNESS={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100 in increments of 10

- id: sharpness_query
  label: Query Sharpness
  kind: query
  command: "SHARPNESS?[CR]"
  params: []

- id: sharpness_increment
  label: Increment Sharpness
  kind: action
  command: "SHARPNESS+[CR]"
  params: []

- id: sharpness_decrement
  label: Decrement Sharpness
  kind: action
  command: "SHARPNESS-[CR]"
  params: []

- id: noise_reduction_set
  label: Set Noise Reduction
  kind: action
  command: "NOISE.REDUCTION={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]

- id: noise_reduction_query
  label: Query Noise Reduction
  kind: query
  command: "NOISE.REDUCTION?[CR]"
  params: []

- id: colorspace_set
  label: Set Color Space
  kind: action
  command: "COLORSPACE(SETTING)={value}[CR]"
  params:
    - name: value
      type: enum
      values: [RGB, RGB.VIDEO, AUTO]

- id: colorspace_query_setting
  label: Query Color Space Setting
  kind: query
  command: "COLORSPACE(SETTING)?[CR]"
  params: []

- id: colorspace_query_actual
  label: Query Actual Color Space
  kind: query
  command: "COLORSPACE(ACTUAL)?[CR]"
  params: []

- id: colorspace_increment
  label: Increment Color Space
  kind: action
  command: "COLORSPACE+[CR]"
  params: []

- id: colorspace_decrement
  label: Decrement Color Space
  kind: action
  command: "COLORSPACE-[CR]"
  params: []

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE={value}[CR]"
  params:
    - name: value
      type: enum
      values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]

- id: color_temperature_query
  label: Query Color Temperature
  kind: query
  command: "COLOR.TEMPERATURE?[CR]"
  params: []

- id: color_temperature_increment
  label: Increment Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE+[CR]"
  params: []

- id: color_temperature_decrement
  label: Decrement Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE-[CR]"
  params: []

- id: gamma_set
  label: Set Gamma
  kind: action
  command: "GAMMA={value}[CR]"
  params:
    - name: value
      type: enum
      values: ["1.8","1.9","2.0","2.1","2.2","2.3","2.4","2.5",NATIVE,SGAMMA,DIMAGE]

- id: gamma_query
  label: Query Gamma
  kind: query
  command: "GAMMA?[CR]"
  params: []

- id: gamma_increment
  label: Increment Gamma
  kind: action
  command: "GAMMA+[CR]"
  params: []

- id: gamma_decrement
  label: Decrement Gamma
  kind: action
  command: "GAMMA-[CR]"
  params: []

- id: gain_set
  label: Set RGB Gain
  kind: action
  command: "GAIN({color})={value}[CR]"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: value
      type: integer
      description: 0-255 per channel; ALL takes three operands

- id: gain_query
  label: Query RGB Gain
  kind: query
  command: "GAIN({color})?[CR]"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]

- id: gain_increment
  label: Increment RGB Gain
  kind: action
  command: "GAIN({color})+[CR]"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]

- id: gain_decrement
  label: Decrement RGB Gain
  kind: action
  command: "GAIN({color})-[CR]"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]

- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={value}[CR]"
  params:
    - name: value
      type: integer
      description: 1-100

- id: backlight_intensity_query
  label: Query Backlight Intensity
  kind: query
  command: "BACKLIGHT.INTENSITY?[CR]"
  params: []

- id: backlight_intensity_increment
  label: Increment Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY+[CR]"
  params: []

- id: backlight_intensity_decrement
  label: Decrement Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY-[CR]"
  params: []

- id: smart_power_set
  label: Set Smart Power
  kind: action
  command: "SMART.POWER={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, MEDIUM, HIGH]

- id: smart_power_query
  label: Query Smart Power
  kind: query
  command: "SMART.POWER?[CR]"
  params: []

- id: overscan_set
  label: Set Overscan
  kind: action
  command: "OVERSCAN={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: overscan_query
  label: Query Overscan
  kind: query
  command: "OVERSCAN?[CR]"
  params: []

- id: revert_image_settings
  label: Revert Image Settings (Picture Reset)
  kind: action
  command: "REVERT.IMAGE.SETTINGS[CR]"
  params: []

# ---- Screen ----
- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  command: "ASPECT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [FILL, 4X3, NATIVE, 21X9, CUSTOM]

- id: aspect_query
  label: Query Aspect Ratio
  kind: query
  command: "ASPECT?[CR]"
  params: []

- id: aspect_increment
  label: Increment Aspect Ratio
  kind: action
  command: "ASPECT+[CR]"
  params: []

- id: aspect_decrement
  label: Decrement Aspect Ratio
  kind: action
  command: "ASPECT-[CR]"
  params: []

- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "AUTO.ADJUST[CR]"
  params: []

- id: custom_zoom_set
  label: Set Custom Zoom
  kind: action
  command: "CUSTOM.ZOOM({axis})={value}[CR]"
  params:
    - name: axis
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]
    - name: value
      type: integer
      description: 0-100

- id: custom_zoom_query
  label: Query Custom Zoom
  kind: query
  command: "CUSTOM.ZOOM({axis})?[CR]"
  params:
    - name: axis
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]

- id: custom_zoom_increment
  label: Increment Custom Zoom
  kind: action
  command: "CUSTOM.ZOOM({axis})+[CR]"
  params:
    - name: axis
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]

- id: custom_zoom_decrement
  label: Decrement Custom Zoom
  kind: action
  command: "CUSTOM.ZOOM({axis})-[CR]"
  params:
    - name: axis
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]

- id: pan_set
  label: Set Image Position
  kind: action
  command: "PAN({axis})={value}[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      description: 0-100

- id: pan_query
  label: Query Image Position
  kind: query
  command: "PAN({axis})?[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: pan_increment
  label: Increment Image Position
  kind: action
  command: "PAN({axis})+[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: pan_decrement
  label: Decrement Image Position
  kind: action
  command: "PAN({axis})-[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: phase_set
  label: Set Phase
  kind: action
  command: "PHASE={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: phase_query
  label: Query Phase
  kind: query
  command: "PHASE?[CR]"
  params: []

- id: phase_increment
  label: Increment Phase
  kind: action
  command: "PHASE+[CR]"
  params: []

- id: phase_decrement
  label: Decrement Phase
  kind: action
  command: "PHASE-[CR]"
  params: []

- id: tracking_set
  label: Set Tracking
  kind: action
  command: "TRACKING={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: tracking_query
  label: Query Tracking
  kind: query
  command: "TRACKING?[CR]"
  params: []

- id: tracking_increment
  label: Increment Tracking
  kind: action
  command: "TRACKING+[CR]"
  params: []

- id: tracking_decrement
  label: Decrement Tracking
  kind: action
  command: "TRACKING-[CR]"
  params: []

# ---- Sources ----
- id: source_select_set
  label: Source Select
  kind: action
  command: "SOURCE.SELECT={source}[CR]"
  params:
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: source_select_query
  label: Query Source Select
  kind: query
  command: "SOURCE.SELECT?[CR]"
  params: []

- id: source_select_increment
  label: Increment Source Select
  kind: action
  command: "SOURCE.SELECT+[CR]"
  params: []

- id: source_select_decrement
  label: Decrement Source Select
  kind: action
  command: "SOURCE.SELECT-[CR]"
  params: []

- id: source_scan_set
  label: Set Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]

- id: source_scan_query
  label: Query Auto Scan Sources
  kind: query
  command: "SOURCE.SCAN?[CR]"
  params: []

- id: source_scan_increment
  label: Increment Source Scan
  kind: action
  command: "SOURCE.SCAN+[CR]"
  params: []

- id: source_scan_decrement
  label: Decrement Source Scan
  kind: action
  command: "SOURCE.SCAN-[CR]"
  params: []

- id: failover_source_set
  label: Set Failover Source
  kind: action
  command: "FAILOVER.SOURCE({slot})={source}[CR]"
  params:
    - name: slot
      type: integer
      description: 1-9 or ALL (255)
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: failover_source_query
  label: Query Failover Source
  kind: query
  command: "FAILOVER.SOURCE({slot})?[CR]"
  params:
    - name: slot
      type: integer

- id: source_message_query
  label: Query Source Message
  kind: query
  command: "SOURCE.MESSAGE?[CR]"
  params: []

# ---- Audio ----
- id: audio_volume_set
  label: Set Volume
  kind: action
  command: "AUDIO.VOLUME={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_volume_query
  label: Query Volume
  kind: query
  command: "AUDIO.VOLUME?[CR]"
  params: []

- id: audio_volume_increment
  label: Increment Volume
  kind: action
  command: "AUDIO.VOLUME+[CR]"
  params: []

- id: audio_volume_decrement
  label: Decrement Volume
  kind: action
  command: "AUDIO.VOLUME-[CR]"
  params: []

- id: audio_volume_line_set
  label: Set Line Out Volume
  kind: action
  command: "AUDIO.VOLUME.LINE={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_volume_line_query
  label: Query Line Out Volume
  kind: query
  command: "AUDIO.VOLUME.LINE?[CR]"
  params: []

- id: audio_volume_line_increment
  label: Increment Line Out Volume
  kind: action
  command: "AUDIO.VOLUME.LINE+[CR]"
  params: []

- id: audio_volume_line_decrement
  label: Decrement Line Out Volume
  kind: action
  command: "AUDIO.VOLUME.LINE-[CR]"
  params: []

- id: volume_max_set
  label: Set Maximum Volume
  kind: action
  command: "VOLUME.MAX={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: volume_max_query
  label: Query Maximum Volume
  kind: query
  command: "VOLUME.MAX?[CR]"
  params: []

- id: volume_max_increment
  label: Increment Maximum Volume
  kind: action
  command: "VOLUME.MAX+[CR]"
  params: []

- id: volume_max_decrement
  label: Decrement Maximum Volume
  kind: action
  command: "VOLUME.MAX-[CR]"
  params: []

- id: volume_min_set
  label: Set Minimum Volume
  kind: action
  command: "VOLUME.MIN={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: volume_min_query
  label: Query Minimum Volume
  kind: query
  command: "VOLUME.MIN?[CR]"
  params: []

- id: volume_min_increment
  label: Increment Minimum Volume
  kind: action
  command: "VOLUME.MIN+[CR]"
  params: []

- id: volume_min_decrement
  label: Decrement Minimum Volume
  kind: action
  command: "VOLUME.MIN-[CR]"
  params: []

- id: audio_mute_set
  label: Set Mute
  kind: action
  command: "AUDIO.MUTE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_mute_query
  label: Query Mute
  kind: query
  command: "AUDIO.MUTE?[CR]"
  params: []

- id: audio_balance_set
  label: Set Audio Balance
  kind: action
  command: "AUDIO.BALANCE={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_balance_query
  label: Query Audio Balance
  kind: query
  command: "AUDIO.BALANCE?[CR]"
  params: []

- id: audio_balance_increment
  label: Increment Audio Balance
  kind: action
  command: "AUDIO.BALANCE+[CR]"
  params: []

- id: audio_balance_decrement
  label: Decrement Audio Balance
  kind: action
  command: "AUDIO.BALANCE-[CR]"
  params: []

- id: audio_bass_set
  label: Set Bass
  kind: action
  command: "AUDIO.BASS={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_bass_query
  label: Query Bass
  kind: query
  command: "AUDIO.BASS?[CR]"
  params: []

- id: audio_bass_increment
  label: Increment Bass
  kind: action
  command: "AUDIO.BASS+[CR]"
  params: []

- id: audio_bass_decrement
  label: Decrement Bass
  kind: action
  command: "AUDIO.BASS-[CR]"
  params: []

- id: audio_treble_set
  label: Set Treble
  kind: action
  command: "AUDIO.TREBLE={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_treble_query
  label: Query Treble
  kind: query
  command: "AUDIO.TREBLE?[CR]"
  params: []

- id: audio_treble_increment
  label: Increment Treble
  kind: action
  command: "AUDIO.TREBLE+[CR]"
  params: []

- id: audio_treble_decrement
  label: Decrement Treble
  kind: action
  command: "AUDIO.TREBLE-[CR]"
  params: []

- id: audio_speakers_set
  label: Set Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_speakers_query
  label: Query Internal Speakers
  kind: query
  command: "AUDIO.SPEAKERS?[CR]"
  params: []

- id: audio_out_sync_set
  label: Set Audio Out Sync
  kind: action
  command: "AUDIO.OUT.SYNC={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_out_sync_query
  label: Query Audio Out Sync
  kind: query
  command: "AUDIO.OUT.SYNC?[CR]"
  params: []

# ---- Power ----
- id: display_power_set
  label: Set Display Power
  kind: action
  command: "DISPLAY.POWER={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: display_power_query
  label: Query Display Power
  kind: query
  command: "DISPLAY.POWER?[CR]"
  params: []

- id: auto_on_set
  label: Set Auto Power On
  kind: action
  command: "AUTO.ON={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON, LAST.STATUS]

- id: auto_on_query
  label: Query Auto Power On
  kind: query
  command: "AUTO.ON?[CR]"
  params: []

- id: auto_on_increment
  label: Increment Auto Power On
  kind: action
  command: "AUTO.ON+[CR]"
  params: []

- id: auto_on_decrement
  label: Decrement Auto Power On
  kind: action
  command: "AUTO.ON-[CR]"
  params: []

- id: power_down_mode_set
  label: Set Power Down Mode
  kind: action
  command: "POWER.DOWN.MODE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]

- id: power_down_mode_query
  label: Query Power Down Mode
  kind: query
  command: "POWER.DOWN.MODE?[CR]"
  params: []

- id: off_timer_set
  label: Set Off Timer
  kind: action
  command: "OFF.TIMER={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-24 hours

- id: off_timer_query
  label: Query Off Timer
  kind: query
  command: "OFF.TIMER?[CR]"
  params: []

- id: off_timer_increment
  label: Increment Off Timer
  kind: action
  command: "OFF.TIMER+[CR]"
  params: []

- id: off_timer_decrement
  label: Decrement Off Timer
  kind: action
  command: "OFF.TIMER-[CR]"
  params: []

# ---- Boot source ----
- id: boot_source_input_set
  label: Set Boot Source Input
  kind: action
  command: "BOOT.SOURCE.INPUT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]

- id: boot_source_input_query
  label: Query Boot Source Input
  kind: query
  command: "BOOT.SOURCE.INPUT?[CR]"
  params: []

- id: boot_source_last_set
  label: Set Boot Source Last Input
  kind: action
  command: "BOOT.SOURCE.LAST={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: boot_source_last_query
  label: Query Boot Source Last Input
  kind: query
  command: "BOOT.SOURCE.LAST?[CR]"
  params: []

- id: boot_source_playlist_set
  label: Set Boot Source Playlist
  kind: action
  command: "BOOT.SOURCE.PLAYLIST={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-7

- id: boot_source_playlist_query
  label: Query Boot Source Playlist
  kind: query
  command: "BOOT.SOURCE.PLAYLIST?[CR]"
  params: []

- id: boot_source_playlist_increment
  label: Increment Boot Source Playlist
  kind: action
  command: "BOOT.SOURCE.PLAYLIST+[CR]"
  params: []

- id: boot_source_playlist_decrement
  label: Decrement Boot Source Playlist
  kind: action
  command: "BOOT.SOURCE.PLAYLIST-[CR]"
  params: []

# ---- Panel saving ----
- id: panel_saving_backlight_set
  label: Set Backlight Panel Saving
  kind: action
  command: "PANEL.SAVING.BACKLIGHT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: panel_saving_backlight_query
  label: Query Backlight Panel Saving
  kind: query
  command: "PANEL.SAVING.BACKLIGHT?[CR]"
  params: []

- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: pixel_orbit_query
  label: Query Pixel Orbit
  kind: query
  command: "PIXEL.ORBIT?[CR]"
  params: []

# ---- Network ----
- id: ipv4_address_query
  label: Query IP Address
  kind: query
  command: "IPV4.ADDRESS?[CR]"
  params: []

- id: ipv4_address_set
  label: Set Static IP Address
  kind: action
  command: 'IPV4.ADDRESS(STATIC)="{value}"[CR]'
  params:
    - name: value
      type: string
      description: IPv4 dotted address

- id: ipv4_netmask_query
  label: Query Subnet Mask
  kind: query
  command: "IPV4.NETMASK?[CR]"
  params: []

- id: ipv4_netmask_set
  label: Set Static Subnet Mask
  kind: action
  command: 'IPV4.NETMASK(STATIC)="{value}"[CR]'
  params:
    - name: value
      type: string

- id: ipv4_gateway_query
  label: Query Default Gateway
  kind: query
  command: "IPV4.GATEWAY?[CR]"
  params: []

- id: ipv4_gateway_set
  label: Set Static Default Gateway
  kind: action
  command: 'IPV4.GATEWAY(STATIC)="{value}"[CR]'
  params:
    - name: value
      type: string

- id: network_dhcp_set
  label: Set DHCP
  kind: action
  command: "NETWORK.DHCP={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: network_dhcp_query
  label: Query DHCP
  kind: query
  command: "NETWORK.DHCP?[CR]"
  params: []

- id: network_dns1_query
  label: Query DNS Server 1
  kind: query
  command: "NETWORK.DNS1?[CR]"
  params: []

- id: network_dns1_set
  label: Set Static DNS Server 1
  kind: action
  command: 'NETWORK.DNS1(STATIC)="{value}"[CR]'
  params:
    - name: value
      type: string

- id: network_dns2_query
  label: Query DNS Server 2
  kind: query
  command: "NETWORK.DNS2?[CR]"
  params: []

- id: network_dns2_set
  label: Set Static DNS Server 2
  kind: action
  command: 'NETWORK.DNS2(STATIC)="{value}"[CR]'
  params:
    - name: value
      type: string

- id: network_mac_query
  label: Query MAC Address
  kind: query
  command: "NETWORK.MAC?[CR]"
  params: []

- id: network_ntpserver_set
  label: Set NTP Server
  kind: action
  command: 'NETWORK.NTPSERVER="{value}"[CR]'
  params:
    - name: value
      type: string

- id: network_ntpserver_query
  label: Query NTP Server
  kind: query
  command: "NETWORK.NTPSERVER?[CR]"
  params: []

- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  command: "NETWORK.NTP={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: network_ntp_query
  label: Query Use Network Time
  kind: query
  command: "NETWORK.NTP?[CR]"
  params: []

# ---- HDMI / CEC ----
- id: cec_enable_set
  label: Set HDMI CEC
  kind: action
  command: "CEC.ENABLE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: cec_enable_query
  label: Query HDMI CEC
  kind: query
  command: "CEC.ENABLE?[CR]"
  params: []

- id: cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  command: "CEC.STANDBY={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: cec_standby_query
  label: Query HDMI CEC Standby
  kind: query
  command: "CEC.STANDBY?[CR]"
  params: []

- id: hdmi_version_set
  label: Set HDMI Version
  kind: action
  command: "HDMI.VERSION={value}[CR]"
  params:
    - name: value
      type: enum
      values: [HDMI14, HDMI20]

- id: hdmi_version_query
  label: Query HDMI Version
  kind: query
  command: "HDMI.VERSION?[CR]"
  params: []

# ---- OSD / menus ----
- id: osd_position_set
  label: Set OSD Position
  kind: action
  command: "OSD.POSITION({axis})={value}[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      description: 0-100

- id: osd_position_query
  label: Query OSD Position
  kind: query
  command: "OSD.POSITION({axis})?[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: osd_position_increment
  label: Increment OSD Position
  kind: action
  command: "OSD.POSITION({axis})+[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: osd_position_decrement
  label: Decrement OSD Position
  kind: action
  command: "OSD.POSITION({axis})-[CR]"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0=OFF, or 5-120 in increments of 5

- id: osd_timeout_query
  label: Query OSD Timeout
  kind: query
  command: "OSD.TIMEOUT?[CR]"
  params: []

- id: osd_timeout_increment
  label: Increment OSD Timeout
  kind: action
  command: "OSD.TIMEOUT+[CR]"
  params: []

- id: osd_timeout_decrement
  label: Decrement OSD Timeout
  kind: action
  command: "OSD.TIMEOUT-[CR]"
  params: []

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0=OFF, or 5-100 in increments of 5

- id: osd_transparency_query
  label: Query OSD Transparency
  kind: query
  command: "OSD.TRANSPARENCY?[CR]"
  params: []

- id: osd_transparency_increment
  label: Increment OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY+[CR]"
  params: []

- id: osd_transparency_decrement
  label: Decrement OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY-[CR]"
  params: []

- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE[CR]"
  params: []

- id: orientation_set
  label: Set OSD Rotation
  kind: action
  command: "ORIENTATION={value}[CR]"
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]

- id: orientation_query
  label: Query OSD Rotation
  kind: query
  command: "ORIENTATION?[CR]"
  params: []

- id: info_timeout_set
  label: Set Information OSD Timeout
  kind: action
  command: "INFO.TIMEOUT={value}[CR]"
  params:
    - name: value
      type: integer
      description: 0-60

- id: info_timeout_query
  label: Query Information OSD Timeout
  kind: query
  command: "INFO.TIMEOUT?[CR]"
  params: []

- id: info_timeout_increment
  label: Increment Information OSD Timeout
  kind: action
  command: "INFO.TIMEOUT+[CR]"
  params: []

- id: info_timeout_decrement
  label: Decrement Information OSD Timeout
  kind: action
  command: "INFO.TIMEOUT-[CR]"
  params: []

- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  command: "SPLASH.SCREEN={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON, USER]

- id: splash_screen_query
  label: Query Splash Screen
  kind: query
  command: "SPLASH.SCREEN?[CR]"
  params: []

- id: splash_screen_increment
  label: Increment Splash Screen
  kind: action
  command: "SPLASH.SCREEN+[CR]"
  params: []

- id: splash_screen_decrement
  label: Decrement Splash Screen
  kind: action
  command: "SPLASH.SCREEN-[CR]"
  params: []

# ---- Locks / LED / Remote ----
- id: ir_lock_set
  label: Set IR Remote Lock
  kind: action
  command: "IR.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: ir_lock_query
  label: Query IR Remote Lock
  kind: query
  command: "IR.LOCK?[CR]"
  params: []

- id: key_lock_set
  label: Set Keypad Lock
  kind: action
  command: "KEY.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: key_lock_query
  label: Query Keypad Lock
  kind: query
  command: "KEY.LOCK?[CR]"
  params: []

- id: led_enable_set
  label: Set Status LED
  kind: action
  command: "LED.ENABLE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: led_enable_query
  label: Query Status LED
  kind: query
  command: "LED.ENABLE?[CR]"
  params: []

- id: key_send
  label: Send Remote Key
  kind: action
  command: "KEY={value}[CR]"
  params:
    - name: value
      type: enum
      description: See section 5.1 Key table
      values:
        - UP
        - DOWN
        - MENU
        - SOURCE
        - VOLUME.PLUS
        - VOLUME.MINUS
        - EXIT
        - LEFT
        - ENTER
        - PREV
        - RIGHT
        - KEY.0
        - KEY.1
        - KEY.2
        - KEY.3
        - KEY.4
        - KEY.5
        - KEY.6
        - KEY.7
        - KEY.8
        - KEY.9
        - MUTE
        - STDBY.TOGGLE
        - STDBY.ENTER
        - STDBY.EXIT
        - MENU.PREV
        - TOP
        - PRESETS
        - PRESET1
        - PRESET2
        - PRESET3
        - PRESET4
        - ZONE1
        - ZONE2
        - ZONE3
        - ZONE4
        - PIP.MODE
        - PIP.SWAP
        - HDMI1
        - HDMI2
        - HDMI3
        - HDMI4
        - DISPLAY.PORT
        - DVI
        - VGA
        - OPS
        - WALL
        - COLOR
        - MISC
        - ARROW.LEFT
        - ARROW.RIGHT
        - STAR.STAR

# ---- Identity / status ----
- id: model_id_query
  label: Query Model ID
  kind: query
  command: "MODEL.ID?[CR]"
  params: []

- id: model_series_query
  label: Query Model Series
  kind: query
  command: "MODEL.SERIES?[CR]"
  params: []

- id: serial_number_query
  label: Query Serial Number
  kind: query
  command: "SERIAL.NUMBER?[CR]"
  params: []

- id: build_info_query
  label: Query Version Info
  kind: query
  command: "BUILD.INFO?[CR]"
  params: []

- id: uptime_query
  label: Query Operation Hours
  kind: query
  command: "UPTIME?[CR]"
  params: []

- id: temperature_query
  label: Query Thermal Status
  kind: query
  command: "TEMPERATURE?[CR]"
  params: []

- id: system_state_query
  label: Query System State
  kind: query
  command: "SYSTEM.STATE?[CR]"
  params: []

- id: monitor_id_set
  label: Set Monitor ID
  kind: action
  command: "MONITOR.ID={value}[CR]"
  params:
    - name: value
      type: integer
      description: 1-255

- id: monitor_id_query
  label: Query Monitor ID
  kind: query
  command: "MONITOR.ID?[CR]"
  params: []

- id: monitor_id_increment
  label: Increment Monitor ID
  kind: action
  command: "MONITOR.ID+[CR]"
  params: []

- id: monitor_id_decrement
  label: Decrement Monitor ID
  kind: action
  command: "MONITOR.ID-[CR]"
  params: []

# ---- Time / schedule ----
- id: time_set
  label: Set Date/Time Field
  kind: action
  command: "TIME({field})={value}[CR]"
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE, ALL]
    - name: value
      type: integer
      description: Unsigned int per field

- id: time_query
  label: Query Date/Time Field
  kind: query
  command: "TIME({field})?[CR]"
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE, ALL]

- id: time_day_query
  label: Query Day of Week
  kind: query
  command: "TIME.DAY?[CR]"
  params: []

- id: time_month_set
  label: Set Time Month
  kind: action
  command: "TIME.MONTH={value}[CR]"
  params:
    - name: value
      type: enum
      values: [JANUARY,FEBRUARY,MARCH,APRIL,MAY,JUNE,JULY,AUGUST,SEPTEMBER,OCTOBER,NOVEMBER,DECEMBER]

- id: time_month_query
  label: Query Time Month
  kind: query
  command: "TIME.MONTH?[CR]"
  params: []

- id: time_string_query
  label: Query Time String
  kind: query
  command: "TIME.STRING?[CR]"
  params: []

- id: timezone_set
  label: Set Time Zone
  kind: action
  command: "TIMEZONE={value}[CR]"
  params:
    - name: value
      type: enum
      description: See section 5.2 Timezone table (85 named values, e.g. UTCM0800.PACIFIC.TIME, UTCP0900.TOKYO.OSAKA)

- id: timezone_query
  label: Query Time Zone
  kind: query
  command: "TIMEZONE?[CR]"
  params: []

- id: timezone_increment
  label: Increment Time Zone
  kind: action
  command: "TIMEZONE+[CR]"
  params: []

- id: timezone_decrement
  label: Decrement Time Zone
  kind: action
  command: "TIMEZONE-[CR]"
  params: []

- id: schedule_set
  label: Set Schedule Parameter
  kind: action
  command: "SCHEDULE({slot},{parameter})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, ENABLE, END.MINUTE, END.HOUR, INPUT, PLAYLIST, DAY.MON, DAY.TUE, DAY.WED, DAY.THU, DAY.FRI, DAY.SAT, DAY.SUN, END.TIME.NEXT.DAY, ALL]
    - name: value
      type: integer
      description: Unsigned int per parameter

- id: schedule_query
  label: Query Schedule Parameter
  kind: query
  command: "SCHEDULE({slot},{parameter})?[CR]"
  params:
    - name: slot
      type: integer
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, ENABLE, END.MINUTE, END.HOUR, INPUT, PLAYLIST, DAY.MON, DAY.TUE, DAY.WED, DAY.THU, DAY.FRI, DAY.SAT, DAY.SUN, END.TIME.NEXT.DAY, ALL]

- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  command: "SCHEDULE.DAY({slot},{day})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: day
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
    - name: value
      type: enum
      values: [OFF, ON]

- id: schedule_day_query
  label: Query Schedule Day
  kind: query
  command: "SCHEDULE.DAY({slot},{day})?[CR]"
  params:
    - name: slot
      type: integer
    - name: day
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]

- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({slot})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: value
      type: enum
      values: [ONCE, EVERY.WEEK]

- id: schedule_frequency_query
  label: Query Schedule Frequency
  kind: query
  command: "SCHEDULE.FREQUENCY({slot})?[CR]"
  params:
    - name: slot
      type: integer

- id: schedule_input_set
  label: Set Schedule Input
  kind: action
  command: "SCHEDULE.INPUT({slot})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: schedule_input_query
  label: Query Schedule Input
  kind: query
  command: "SCHEDULE.INPUT({slot})?[CR]"
  params:
    - name: slot
      type: integer

- id: schedule_input_increment
  label: Increment Schedule Input
  kind: action
  command: "SCHEDULE.INPUT({slot})+[CR]"
  params:
    - name: slot
      type: integer

- id: schedule_input_decrement
  label: Decrement Schedule Input
  kind: action
  command: "SCHEDULE.INPUT({slot})-[CR]"
  params:
    - name: slot
      type: integer

# ---- Language / system ----
- id: language_set
  label: Set Language
  kind: action
  command: "LANGUAGE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]

- id: language_query
  label: Query Language
  kind: query
  command: "LANGUAGE?[CR]"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})[CR]"
  params:
    - name: scope
      type: enum
      values: [USER, PICTURE, AUDIO, CONFIG1, CONFIG2, ADV.SETTINGS, SCREEN]

- id: system_reboot
  label: System Reboot
  kind: action
  command: "SYSTEM.REBOOT[CR]"
  params: []
```

## Feedbacks
```yaml
- id: response_ack
  type: enum
  description: Acknowledgment for action commands with no operator (response form "@ACK")
  values: [ACK]

- id: response_nak
  type: enum
  description: Negative acknowledgment - command received but cannot be processed (response form "^NAK")
  values: [NAK]

- id: response_error
  type: enum
  description: Error response (response form "!ERR n" with n in 1,3,4,5,6)
  values:
    - "ERR 1"   # Invalid syntax
    - "ERR 3"   # Command not recognized
    - "ERR 4"   # Invalid modifier
    - "ERR 5"   # Invalid operands
    - "ERR 6"   # Invalid operator

- id: system_state
  type: enum
  description: Reported by SYSTEM.STATE?
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN]

- id: display_power_state
  type: enum
  description: Reported by DISPLAY.POWER?
  values: [OFF, ON]

- id: aspect_state
  type: enum
  values: [FILL, 4X3, NATIVE, 21X9, CUSTOM]

- id: source_state
  type: enum
  description: Reported by SOURCE.SELECT?
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: mute_state
  type: enum
  values: [OFF, ON]

- id: thermal_status
  type: string
  description: Reported by TEMPERATURE? as e.g. "41.50C 106.70F"

- id: model_id_string
  type: string
  description: Reported by MODEL.ID? (e.g. "SLM552")

- id: model_series_string
  type: string
  description: Reported by MODEL.SERIES? (always "Simplicity" for this product)

- id: serial_number_string
  type: string
  description: Reported by SERIAL.NUMBER?

- id: build_info_string
  type: string
  description: Reported by BUILD.INFO?

- id: uptime_hours
  type: integer
  description: Reported by UPTIME? in operation hours
```

## Variables
```yaml
- name: brightness
  type: integer
  range: [0, 100]
- name: contrast
  type: integer
  range: [0, 100]
- name: color
  type: integer
  range: [0, 100]
- name: tint
  type: integer
  range: [0, 100]
- name: sharpness
  type: integer
  range: [0, 100]
  notes: in increments of 10
- name: backlight_intensity
  type: integer
  range: [1, 100]
- name: volume
  type: integer
  range: [0, 100]
- name: volume_line
  type: integer
  range: [0, 100]
- name: volume_max
  type: integer
  range: [0, 100]
- name: volume_min
  type: integer
  range: [0, 100]
- name: balance
  type: integer
  range: [0, 100]
- name: bass
  type: integer
  range: [0, 100]
- name: treble
  type: integer
  range: [0, 100]
- name: gain_red
  type: integer
  range: [0, 255]
- name: gain_green
  type: integer
  range: [0, 255]
- name: gain_blue
  type: integer
  range: [0, 255]
- name: phase
  type: integer
  range: [0, 100]
- name: tracking
  type: integer
  range: [0, 100]
- name: off_timer_hours
  type: integer
  range: [0, 24]
- name: info_timeout
  type: integer
  range: [0, 60]
- name: osd_timeout
  type: integer
  notes: 0=OFF or 5-120 step 5
- name: osd_transparency
  type: integer
  notes: 0=OFF or 5-100 step 5
- name: monitor_id
  type: integer
  range: [1, 255]
- name: ipv4_address
  type: string
- name: ipv4_netmask
  type: string
- name: ipv4_gateway
  type: string
- name: dns1
  type: string
- name: dns2
  type: string
- name: mac_address
  type: string
- name: ntp_server
  type: string
- name: power_on_delay
  type: float
  notes: fixed-point seconds (example in source: POWER.ON.DELAY=0.1)
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications.
# All responses are reactive to commands (`:` response, `@ACK`, `^NAK`, `!ERR n`).
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset    # RESET wipes user/picture/audio/config settings
  - system_reboot    # forces system restart
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures beyond
# the factory-reset / reboot semantics noted above.
```

## Notes
- Termination: every command and response is terminated with `[CR]` (0x0D), `[LF]` (0x0A), or `;`. The response uses the same terminator as the command. Spec uses `[CR]` placeholder; substitute the chosen terminator.
- Case insensitive on the wire (`brightness`, `BRIGHTNESS`, `BrIgHtNeSs` all equivalent). Responses are always uppercase.
- Whitespace tolerant: `BRIGHTNESS=50`, `BRIGHTNESS = 50`, `BRIGHTNESS    =    50` are all valid.
- Numeric opcodes are accepted in place of named opcodes (e.g. `200=100` for `BRIGHTNESS=100`). Numeric command codes are listed in source section 5 but the named form is preferred in this spec.
- Read operators: `?` returns the named value, `#` returns the numeric value. This spec uses `?` form by default.
- Modifiers may be omitted; device substitutes a default (e.g. `ASPECT=AUTO` = `ASPECT(CURRENT)=AUTO`).
- DB9 wiring: pins 2=RXD, 3=TXD, 5=GND. Use a null-modem (crossover) cable to host. 2.5mm TRRS alternative connector documented (Tip=TXD, 1st Ring=RXD, Sleeve=GND).
- Network transports:
  - TCP/UDP port 5000 — same command set as RS-232. Requires "RS232 Network Port" enabled on display (Settings > Signage Display > Network Application).
  - SSH port 2222 — requires SSH service enabled and password authentication configured on the display. SSH2 only.
- TCP/UDP/SSH availability requires `POWER.DOWN.MODE` set to `WAKE.ON.SIGNAL` or `ALWAYS.ON`.
- A subset of commands work while the display is in standby — flagged "Available in Standby" in source: `DISPLAY.POWER`, `KEY` (power-on / power-toggle only), `SYSTEM.STATE`.
- String operands are double-quoted; `\"` and `\\` are escapes for `"` and `\` inside strings.
- Fixed-point operands use decimal notation (e.g. `POWER.ON.DELAY=0.1`).
- `MODEL.SERIES` always returns `"Simplicity"` on this product family.
- KEY codes for unmapped buttons (TOP, PRESETS, ZONE2-4, PIP.MODE, etc.) accept the wire value but are documented as "Not used" in source; they may have no behavioral effect.
<!-- UNRESOLVED: firmware compatibility ranges; binary/hex command encodings (protocol is ASCII only); SSH credential defaults; numeric KEY values for the few keys whose decimal codes were not transcribed (4, 7, 8, 10, 11, 16). -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-06-02T17:23:48.967Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:48.967Z
matched_actions: 226
action_count: 226
confidence: medium
summary: "All 226 spec actions match source commands; transport values verified in source; full command-set coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not document unsolicited push notifications."
- "no multi-step macros documented in source."
- "source contains no explicit safety warnings or interlock procedures beyond"
- "firmware compatibility ranges; binary/hex command encodings (protocol is ASCII only); SSH credential defaults; numeric KEY values for the few keys whose decimal codes were not transcribed (4, 7, 8, 10, 11, 16)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
