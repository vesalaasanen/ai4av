---
spec_id: admin/hisense-85u78qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 85U78QG Series Control Spec"
manufacturer: HiSense
model_family: "85U78QG Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "85U78QG Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - archive.org
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://archive.org/details/hisense_rs232_doc
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-14T10:38:57.048Z
last_checked_at: 2026-10-07T13:44:37.946Z
generated_at: 2026-10-07T13:44:37.946Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Set Schedule for Power On (C1 3E 00 00)"
  - "PC Input (C1 08 00 00 xx 0C)"
  - "DVI Input (C1 08 00 00 xx 09)"
  - "Set Eye Protection (truncated row)"
  - "The source groups products into E / BM-GM / DM-GM50D series without an explicit model-to-series map, so assignment of the 85U78QG to the BM/GM series is inferred from the deterministic command extraction. No firmware version, electrical, or mechanical specs are present in the source."
  - "source does not state whether multiple concurrent client connections are supported, nor any idle/timeout behavior."
  - "no unsolicited/notification behaviour described in source."
  - "no multi-step sequences described in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "checksum algorithm not documented — cannot synthesize frames with arbitrary data without it."
  - "command timing / inter-frame spacing / response timeout not stated."
  - "max concurrent TCP clients not stated."
  - "sub-model feature matrix (811 / 551 qualifiers) not reconciled against 85U78QG."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:44:37.946Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 action units match source frames and port 8088; only minor variants unrepresented; series-level guide. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# HiSense 85U78QG Series Control Spec

## Summary
The HiSense 85U78QG Series is a commercial display controllable over TCP/IP. This spec covers the BM/GM-series IP control protocol, which exchanges ASCII-framed command strings on TCP port 8088. The display runs an embedded IP control server that must be launched from the on-screen settings before a client can connect. Commands use a fixed frame: start code, length, command code, ID, data, verify (checksum), end code.

<!-- UNRESOLVED: The source groups products into E / BM-GM / DM-GM50D series without an explicit model-to-series map, so assignment of the 85U78QG to the BM/GM series is inferred from the deterministic command extraction. No firmware version, electrical, or mechanical specs are present in the source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 8088
  # No base_url: this is a raw TCP socket protocol, not HTTP.
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login/password procedure described in source)
```

Connection notes:
- Launch the IP Control app on the display (Settings → Remote Control → Network control → Enable). The server starts automatically when the app opens.
- Default port 8088. If occupied, any port in 5000–12000 may be selected on the display.
- Client connects as a TCP Client (e.g. Net Assist) to the display's static IP + port.
- BM/GM series accepts ASCII command frames, NOT hex. (E series and DM/GM50D series use hex on different ports — out of scope for this model.)
- A static IP is recommended for stable control access.

<!-- UNRESOLVED: source does not state whether multiple concurrent client connections are supported, nor any idle/timeout behavior. -->

## Traits
```yaml
traits:
  - powerable    # inferred: Power On/Off + Screen on/off + Reboot commands present
  - queryable    # inferred: Inquire Function / Source / Smart Backlight queries return state
  - levelable    # inferred: Set Volume / Brightness / Contrast / Definition commands present
  - routable     # inferred: Switch Source Command (HDMI1/HDMI2/DP/VGA) present
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: screen_on_off_on_send_command
  label: "Screen on/off On Send command"
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 01 F6 BB CC"
  params: []

- id: screen_on_off_on_receive_command
  label: "Screen on/off On Receive command"
  kind: action
  command: "AB AB 00 07 C1 31 00 01 01 01 F6 CD CD"
  params: []

- id: screen_on_off_off_send_command
  label: "Screen on/off Off Send command"
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 00 F7 BB CC"
  params: []

- id: screen_on_off_off_receive_command
  label: "Screen on/off Off Receive command"
  kind: action
  command: "AB AB 00 07 C1 31 00 01 01 00 F7 CD CD"
  params: []

- id: reboot_the_hisense_display_send_command
  label: "Reboot the HISENSE DISPLAY Send command"
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"
  params: []

- id: reboot_the_hisense_display_receive_command
  label: "Reboot the HISENSE DISPLAY Receive command"
  kind: action
  command: "AB AB 00 06 C1 1E 00 00 01 D8 CD CD"
  params: []

- id: power_on_off_power_on_send_command
  label: "Power On/Off Power on Send command"
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"
  params: []

- id: power_on_off_power_on_receive_command
  label: "Power On/Off Power on Receive command"
  kind: action
  command: "AB AB 00 08 C1 15 00 00 01 BB BB DD CD CD"
  params: []

- id: power_on_off_power_off_send_command
  label: "Power On/Off Power off Send command"
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 AA AA DD BB CC"
  params: []

- id: power_on_off_power_off_receive_command
  label: "Power On/Off Power off Receive command"
  kind: action
  command: "AB AB 00 08 C1 15 00 00 01 AA AA DD CD CD"
  params: []

- id: mute_control_mute_off_send_command
  label: "Mute Control Mute off Send command"
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 00 E1 BB CC"
  params: []

- id: mute_control_mute_off_receive_command
  label: "Mute Control Mute off Receive command"
  kind: action
  command: "AB AB 00 07 C1 26 00 00 01 00 E1 CD CD"
  params: []

- id: mute_control_mute_on_send_command
  label: "Mute Control Mute on Send command"
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 01 E0 BB CC"
  params: []

- id: mute_control_mute_on_receive_command
  label: "Mute Control Mute on Receive command"
  kind: action
  command: "AB AB 00 07 C1 26 00 00 01 01 E0 CD CD"
  params: []

- id: vga_automatic_adjustment_send_command
  label: "VGA Automatic Adjustment Send command"
  kind: action
  command: "DD FF 00 06 C1 01 00 00 01 C7 BB CC"
  params: []

- id: vga_automatic_adjustment_receive_command
  label: "VGA Automatic Adjustment Receive command"
  kind: action
  command: "AB AB 00 06 C1 01 00 00 01 C7 CD CD"
  params: []

- id: restore_factory_settings_send_command
  label: "Restore Factory Settings Send command"
  kind: action
  command: "DD FF 00 06 C1 10 00 00 01 D6 BB CC"
  params: []

- id: restore_factory_settings_receive_command
  label: "Restore Factory Settings Receive command"
  kind: action
  command: "AB AB 00 06 C1 10 00 00 01 D6 CD CD"
  params: []

- id: set_inquiring_screen_on_off_send_command
  label: "Set Inquiring Screen On/Off Send command"
  kind: action
  command: "DD FF 00 06 C1 32 00 01 01 F5 BB CC"
  params: []

- id: picture_mode_standard_mode_send
  label: "Picture Mode Standard Mode Send"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 07 C9 BB CC"
  params: []

- id: picture_mode_standard_mode_receive
  label: "Picture Mode Standard Mode Receive"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 07 C9 CD CD"
  params: []

- id: picture_mode_soft_send
  label: "Picture Mode Soft Send"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 09 C7 BB CC"
  params: []

- id: picture_mode_soft_receive
  label: "Picture Mode Soft Receive"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 09 C7 CD CD"
  params: []

- id: picture_mode_movie_mode_send
  label: "Picture Mode Movie Mode Send"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 0A C4 BB CC"
  params: []

- id: picture_mode_movie_mode_receive
  label: "Picture Mode Movie Mode Receive"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 0A C4 CD CD"
  params: []

- id: picture_mode_vivid_send
  label: "Picture Mode Vivid Send"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 08 C6 BB CC"
  params: []

- id: picture_mode_vivid_receive
  label: "Picture Mode Vivid Receive"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 08 C6 CD CD"
  params: []

- id: set_volume
  label: "Set Volume"
  kind: action
  command: "C1 27 00 00"
  params:
    - name: Volume Value
      value: UNRESOLVED

- id: set_time_day_month_year
  label: "Set Time (Day/Month/Year)"
  kind: action
  command: "C1 1C 00 00"
  params:
    - name: Day
      value: UNRESOLVED
    - name: Month
      value: UNRESOLVED
    - name: Year
      value: UNRESOLVED

- id: set_time_hour_minute_second
  label: "Set Time (Hour/Minute/Second)"
  kind: action
  command: "C1 1D 00 00"
  params:
    - name: Hour
      value: UNRESOLVED
    - name: Minute
      value: UNRESOLVED
    - name: Second
      value: UNRESOLVED

- id: set_brightness
  label: "Set Brightness"
  kind: action
  command: "C1 36 00 00"
  params:
    - name: brightness
      value: UNRESOLVED

- id: set_contrast
  label: "Set Contrast"
  kind: action
  command: "C1 37 00 00"
  params:
    - name: contrast
      value: UNRESOLVED

- id: set_color_temperature
  label: "Set Color Temperature"
  kind: action
  command: "C1 39 00 00"
  params:
    - name: value
      enum: ["01 stands for Cold", "02 stands for Slight Cold", "03 stands for Slight Warm", "04 stands for Warm", "00 stands for Standard"]

- id: set_zoom
  label: "Set Zoom"
  kind: action
  command: "C1 3B 00 00"
  params:
    - name: value
      enum: ["02 stands for Zoom Standard", "others stand for Full Screen"]

- id: set_boot_time_delay
  label: "Set Boot Time Delay"
  kind: action
  command: "C1 3C 00 00"
  params:
    - name: value
      enum: ["01 stands for delay of 10s", "02 stands for delay of 20s", "03 stands for delay of 30s", "00 stands for delay of 0s"]

- id: set_definition
  label: "Set Definition"
  kind: action
  command: "C1 38 00 00"
  params:
    - name: Definition Value
      value: UNRESOLVED

- id: set_image_denoising
  label: "Set Image Denoising"
  kind: action
  command: "C1 3A 00 00"
  params:
    - name: value
      enum: ["00 stands for Off", "01 stands for Low", "02 stands for Medium", "03 stands for High", "04 stands for Auto"]

- id: set_smart_backlight
  label: "Set Smart Backlight"
  kind: action
  command: "C1 32 00 02"
  params:
    - name: mode
      enum: ["01 XX stands for Bright Light", "02 XX stands for Soft Light", "03 XX stands for Light Sensed Frequency Conversion", "04 XX stands for Stereo Frequency Conversion", "05 XX stands for Comfortable Frequency Conversion", "06 XX stands for Custom"]
    - name: value
      value: UNRESOLVED

- id: set_boot_time
  label: "Set Boot Time"
  kind: action
  command: "C1 3E 00 02"
  params:
    - name: Day
      value: UNRESOLVED
    - name: Hour
      value: UNRESOLVED
    - name: Minute
      value: UNRESOLVED

- id: set_power_off_time
  label: "Set Power Off Time"
  kind: action
  command: "C1 FF 00 15"
  params:
    - name: Day
      value: UNRESOLVED
    - name: Hour
      value: UNRESOLVED
    - name: Minute
      value: UNRESOLVED

- id: protect_against_screen_burn
  label: "Protect against screen burn"
  kind: action
  command: "C1 33 00 00"
  params:
    - name: value
      enum: ["00 means off", "01 means on"]

- id: remote_enabled_disabled
  label: "Remote Enabled/Disabled"
  kind: action
  command: "C1 70 00 00"
  params:
    - name: value
      enum: ["When XX is 01, disable Remote Control", "When XX is 00, enable Remote Control"]

- id: set_screen_rotation
  label: "Set Screen Rotation"
  kind: action
  command: "C1 35 00 00"
  params:
    - name: value
      enum: ["00 stands for rotating 0 degree", "01 stands for rotating 90 degrees"]

- id: switch_source_command
  label: "Switch Source Command"
  kind: action
  command: "C1 08 00 01"
  params:
    - name: source
      enum: ["0E(HDMI1)", "0F(HDMI2)", "16(DP)", "17 D9(VGA)"]

- id: set_ac_power_on_mode
  label: "Set AC Power On Mode"
  kind: action
  command: "DD FF 00 07 C1 FF 00 09 xx zz yy BB CC"
  params:
    - name: power_on_mode
      enum: ["00 – direct", "01 – last", "02 – standby"]

- id: set_backlight_brightness
  label: "Set Backlight Brightness"
  kind: action
  command: "DD FF 00 08 C1 32 00 00 xx 06 zz yy BB CC"
  params:
    - name: brightness
      value: UNRESOLVED

- id: set_backlight_brightness_auto_adjust
  label: "Set Backlight Brightness Auto Adjust"
  kind: action
  command: "DD FF 00 07 C1 34 00 00 xx zz yy BB CC"
  params:
    - name: value
      enum: ["00 - off", "01 - on"]

- id: set_sound_mode
  label: "Set Sound Mode"
  kind: action
  command: "DD FF 00 07 C1 FF 00 03 xx zz yy BB CC"
  params:
    - name: value
      enum: ["00 - standard", "01 - music", "02 - news", "08 - movie", "10 - sports", "20 - custom", "30 - voice", "40 - meeting"]

- id: set_video_wall
  label: "Set Video Wall"
  kind: action
  command: "DD FF 00 09 C1 0A 00 00 xx zz zz zz yy BB CC"
  params:
    - name: vertical_devices
      value: UNRESOLVED
    - name: horizontal_devices
      value: UNRESOLVED
    - name: current_device_position
      value: UNRESOLVED

- id: set_static_ip_address_of_lan
  label: "Set Static IP Address of LAN"
  kind: action
  command: "DD FF 00 16 C1 1B 30 00 xx zz ... zz yy BB CC"
  params:
    - name: ip_address
      value: "4 bytes"
    - name: subnet_mask
      value: "4 bytes"
    - name: gateway
      value: "4 bytes"
    - name: dns
      value: "4 bytes"

- id: set_usb_lock
  label: "Set USB Lock"
  kind: action
  command: "DD FF 00 07 C1 FF 00 0E xx zz yy BB CC"
  params:
    - name: value
      enum: ["00 - lock USB", "01 - enable USB"]

- id: send_remote_controller_key_code
  label: "Send Remote Controller Key Code"
  kind: action
  command: "DD FF 00 08 C1 17 00 00 xx zz zz yy BB CC"
  params:
    - name: key_code
      enum: ["00 00 - Menu", "00 01 - UP", "00 02 - DOWN", "00 03 - LEFT", "00 04 - RIGHT", "00 05 - OK", "00 06 - Return", "00 07 - Source"]

- id: open_settings
  label: "Open Settings"
  kind: action
  command: "DD FF 00 06 C1 41 00 00 xx yy BB CC"
  params: []

- id: open_home
  label: "Open Home"
  kind: action
  command: "DD FF 00 06 C1 FF 00 1A xx yy BB CC"
  params: []

- id: open_cms
  label: "Open CMS"
  kind: action
  command: "DD FF 00 06 C1 FF 00 13 xx yy BB CC"
  params: []

- id: open_screen_cast
  label: "Open Screen Cast"
  kind: action
  command: "DD FF 00 06 C1 43 00 00 xx yy BB CC"
  params: []

- id: turn_on_hotspot
  label: "Turn on Hotspot"
  kind: action
  command: "DD FF 00 06 C1 44 00 00 xx yy BB CC"
  params: []

- id: take_screenshot
  label: "Take Screenshot"
  kind: action
  command: "DD FF 00 06 C1 4B 00 00 xx yy BB CC"
  params: []
```

## Feedbacks
```yaml
- id: get_smart_backlight_send_command
  label: "Get Smart Backlight Send command"
  kind: query
  query_command: "DD FF 00 06 C1 3E 00 01 01 F9 BB CC"

- id: inquire_function_command_send_command
  label: "Inquire Function Command Send command"
  kind: query
  query_command: "DD FF 00 06 C1 28 00 00 01 EE BB CC"

- id: inquire_current_source_command_send_command
  label: "Inquire Current Source Command Send command"
  kind: query
  query_command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"

- id: inquire_the_software_version
  label: "Inquire the Software Version"
  kind: query
  query_command: "C1 1B 00 00"

- id: query_screen_status
  label: "Query Screen Status"
  kind: query
  query_command: "C1 32 00 01"

- id: query_brightness
  label: "Query Brightness"
  kind: query
  query_command: "C1 36 00 01"

- id: query_network_status
  label: "Query Network Status"
  kind: query
  query_command: "C1 FF 00 16"

- id: query_sound_mode
  label: "Query Sound Mode"
  kind: query
  query_command: "C1 FF 00 02"

- id: query_ac_power_on_status
  label: "Query AC Power On Status"
  kind: query
  query_command: "C1 FF 00 08"

- id: query_ip_address
  label: "Query IP Address"
  kind: query
  query_command: "C1 1B 20 00"

- id: query_device_temperature
  label: "Query Device Temperature"
  kind: query
  query_command: "C1 FE 00 00"

- id: query_picture_mode
  label: "Query Picture Mode"
  kind: query
  query_command: "C1 6D 00 00"

- id: query_usb_status
  label: "Query USB Status"
  kind: query
  query_command: "C1 6E 00 00"

- id: query_eye_protection_mode
  label: "Query Eye Protection Mode"
  kind: query
  query_command: "C1 FF 00 1D"

- id: query_sn
  label: "Query SN"
  kind: query
  query_command: "C1 FF 00 0B"

- id: query_mac_address
  label: "Query MAC Address"
  kind: query
  query_command: "C1 6C 00 00"

- id: query_volume
  label: "Query volume"
  kind: query
  query_command: "C1 7D 00 00"

- id: query_serial_port_id
  label: "Query Serial Port ID"
  kind: query
  query_command: "C1 1B 10 00"

- id: query_brand
  label: "Query brand"
  kind: query
  query_command: "C1 FE 00 01"

- id: query_model
  label: "Query model"
  kind: query
  query_command: "C1 FE 00 02"
```

## Variables
```yaml
# Settable parameters carried as action data fields (volume 0-100, brightness,
# contrast, definition, color temperature enum, rotation 0/90 deg, zoom,
# boot delay, image denoising, smart backlight mode+value, boot/power-off
# time, schedule pages). Each is enumerated in its source command row and is
# not restated here to avoid duplication with the merged Actions block.
```

## Events
```yaml
# UNRESOLVED: no unsolicited/notification behaviour described in source.
# All responses appear to be replies to issued commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Reboot, factory reset, and power-off
# commands exist but carry no documented confirmation/interlock policy.
```

## Notes
- Command frame layout (BM/GM series, ASCII hex digit pairs): `Start | Length | CommandCode | ID | Data | Verify | End`. Send frames use start `DD FF` / end `BB CC`; receive (ack) frames use start `AB AB` / end `CD CD`.
- `Length` byte counts the bytes from CommandCode through Verify. `ID` is `01` in all documented examples. `Verify` is a per-frame checksum byte computed over the preceding bytes — the algorithm is NOT documented in the source; values shown are examples only.
- Several commands are annotated "(811 not support)" or "(only 551 support)" in the source, indicating sub-model variation within the BM/GM family. The 85U78QG's support for those rows is UNRESOLVED.
- Wake-on-LAN is supported: enable in Settings → Switch on/off → Wake-on LAN, then send a magic packet over Ethernet on the same LAN. Magic-packet format is not specified in the source.
- Key simulation (command code `0xB0` / `C1 17` in related series) and a schedule system (command `0x5A`/`0x5B` in E series; boot/power-off time in BM/GM) allow time-based and remote-key automation.

<!-- UNRESOLVED: checksum algorithm not documented — cannot synthesize frames with arbitrary data without it. -->
<!-- UNRESOLVED: command timing / inter-frame spacing / response timeout not stated. -->
<!-- UNRESOLVED: max concurrent TCP clients not stated. -->
<!-- UNRESOLVED: sub-model feature matrix (811 / 551 qualifiers) not reconciled against 85U78QG. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - archive.org
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://archive.org/details/hisense_rs232_doc
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-14T10:38:57.048Z
last_checked_at: 2026-10-07T13:44:37.946Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:44:37.946Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 action units match source frames and port 8088; only minor variants unrepresented; series-level guide. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Set Schedule for Power On (C1 3E 00 00)"
- "PC Input (C1 08 00 00 xx 0C)"
- "DVI Input (C1 08 00 00 xx 09)"
- "Set Eye Protection (truncated row)"
- "The source groups products into E / BM-GM / DM-GM50D series without an explicit model-to-series map, so assignment of the 85U78QG to the BM/GM series is inferred from the deterministic command extraction. No firmware version, electrical, or mechanical specs are present in the source."
- "source does not state whether multiple concurrent client connections are supported, nor any idle/timeout behavior."
- "no unsolicited/notification behaviour described in source."
- "no multi-step sequences described in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "checksum algorithm not documented — cannot synthesize frames with arbitrary data without it."
- "command timing / inter-frame spacing / response timeout not stated."
- "max concurrent TCP clients not stated."
- "sub-model feature matrix (811 / 551 qualifiers) not reconciled against 85U78QG."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
