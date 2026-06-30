---
spec_id: admin/zeevee-inc-hdb2840-na
schema_version: ai4av-public-spec-v1
revision: 1
title: "ZeeVee HDB2840 NA Control Spec"
manufacturer: "ZeeVee Inc"
model_family: "HDB2840 NA"
aliases: []
compatible_with:
  manufacturers:
    - "ZeeVee Inc"
  models:
    - "HDB2840 NA"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zvcli-user-manual/
  - https://www.zeevee.com/hdbridge-2840-na-configuration-guide/
retrieved_at: 2026-06-30T05:15:49.370Z
last_checked_at: 2026-06-30T07:14:08.717Z
generated_at: 2026-06-30T07:14:08.717Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is the generic ZvCli User Manual which documents the ZvPro 250 / ZvBox 150 families; exact feature mapping to the HDB2840 NA SKU is not stated. Voltage/power specs, fault behavior, and firmware compatibility ranges are not stated. Some commands (firmware update, script read/write, troubleshooting reports) require a USB connection + ZvCli host and are NOT available over the serial interface per source note."
  - "no formal enumerated value tables for most query responses; outputs are free-form text blocks."
  - "populate if a variables abstraction is required by the platform."
  - "populate if device emits async notifications (not stated in source)."
  - "exact HDB2840 NA SKU feature mapping (source is the generic ZvCli manual for ZvPro 250 / ZvBox 150)."
  - "firmware version compatibility range not stated."
  - "voltage / current / power specifications not stated."
  - "fault behavior / error recovery sequences not documented."
  - "whether the U+2010 hyphen vs ASCII hyphen matters to the device parser — not confirmed on hardware."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:14:08.717Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched verbatim against source commands; transport parameters fully supported; bidirectional coverage confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ZeeVee HDB2840 NA Control Spec

## Summary
ZeeVee ZvBox/ZvPro encoding appliances (RF-over-coax MPEG2 encoders) controlled via an RS-232C serial console using the ZvCli command language. This spec covers the serial CLI command set: status queries, RF/broadcast configuration, A/V input selection, MPEG2 encoding controls, program (HDTV channel) metadata, and system maintenance commands.

<!-- UNRESOLVED: Source is the generic ZvCli User Manual which documents the ZvPro 250 / ZvBox 150 families; exact feature mapping to the HDB2840 NA SKU is not stated. Voltage/power specs, fault behavior, and firmware compatibility ranges are not stated. Some commands (firmware update, script read/write, troubleshooting reports) require a USB connection + ZvCli host and are NOT available over the serial interface per source note. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon/xoff  # software (Xon / Xoff) flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable       (show commands return state: system-status, av-status, config, analysis, zvcli-info)
# - routable        (video-source / audio-for-* input selection present)
# - levelable       (led-brightness, rf-power enum control present)
traits:
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# NOTE: Command strings preserve the source's hyphen glyph (‐, U+2010) verbatim.
# Several commands are USB/ZvCli-only (not on serial) - marked in notes.

# ---- Status Commands ----
- id: show_system_status
  label: Show System Status
  kind: query
  command: "show system‐status"
  params: []
- id: show_av_status
  label: Show Audio/Video Status
  kind: query
  command: "show av‐status"
  params: []
- id: show_config
  label: Show Configuration
  kind: query
  command: "show config"
  params: []
- id: show_analysis
  label: Analyze Current Configuration and Status
  kind: query
  command: "show analysis"
  params: []
- id: show_zvcli_info
  label: Show ZvCli Information
  kind: query
  command: "show zvcli‐info"
  params: []

# ---- RF, Cable and Broadcast Commands ----
- id: system_cable_scan
  label: Cable Scan
  kind: action
  command: "system cable‐scan [ cable‐plan {standard | HRC | IRC | auto‐detect }]"
  params:
    - name: cable_plan
      type: string
      description: "Optional cable plan: standard | HRC | IRC | auto-detect. Omitted = auto-detect."
- id: system_cable_print_last_scan_results
  label: Show Last Cable Scan Results
  kind: query
  command: "system cable‐print‐last‐scan‐results"
  params: []
- id: set_rf_output
  label: Set RF Output On/Off
  kind: action
  command: "set rf‐output {off | on}"
  params:
    - name: state
      type: string
      description: "off | on. Factory default: on."
- id: set_rf_channel
  label: Set RF Channel
  kind: action
  command: "set rf‐channel <2..135>"
  params:
    - name: channel
      type: integer
      description: "RF channel, 2..135. Factory default: 2. Requires RF output off first."
- id: set_cable_plan
  label: Set Cable Plan
  kind: action
  command: "set cable‐plan {standard | hrc | irc}"
  params:
    - name: plan
      type: string
      description: "standard | hrc | irc. Factory default: standard."
- id: set_rf_power
  label: Set RF Output Power
  kind: action
  command: "set rf‐power {1‐lowest | 2‐low | 3‐medium | 4‐high | 5‐highest}"
  params:
    - name: level
      type: string
      description: "1-lowest | 2-low | 3-medium | 4-high | 5-highest. Factory default: 5-highest. ~5 dBmV steps, max +25 dBmV."

# ---- Audio Input Commands ----
- id: set_audio_for_component
  label: Set Audio Input for Component
  kind: action
  command: "set audio‐for‐component {analog | spdif‐optical | spdif‐coax | usb | none}"
  params:
    - name: source
      type: string
      description: "analog | spdif-optical | spdif-coax | usb | none (ZvPro 250); spdif-optical | spdif-coax | usb | none (ZvBox 150)."
- id: set_audio_for_vga
  label: Set Audio Input for VGA
  kind: action
  command: "set audio‐for‐vga {analog | spdif‐optical | spdif‐coax | usb | none}"
  params:
    - name: source
      type: string
      description: "analog | spdif-optical | spdif-coax | usb | none (ZvPro 250); spdif-optical | spdif-coax | usb | none (ZvBox 150)."

# ---- Video Input Commands ----
- id: set_video_source
  label: Select Active Video Source
  kind: action
  command: "set video‐source {component | vga | idle‐screen | test‐image‐1 | test‐image‐2}"
  params:
    - name: source
      type: string
      description: "component | vga | idle-screen | test-image-1 | test-image-2. Factory default: component."
- id: set_vga_edid_underscan_resolution_1080
  label: Set VGA EDID Underscan Resolution (1080)
  kind: action
  command: "set vga‐edid‐underscan‐resolution‐1080 {<resolution>}"
  params:
    - name: resolution
      type: string
      description: "Resolution e.g. 1808x1017 (factory default). See source table for supported enumerations."
- id: set_vga_edid_underscan_resolution_720
  label: Set VGA EDID Underscan Resolution (720)
  kind: action
  command: "set vga‐edid‐underscan‐resolution‐720 {<resolution>}"
  params:
    - name: resolution
      type: string
      description: "Resolution e.g. 1208x679 (factory default). See source table for supported enumerations."
- id: set_custom_idle_screen
  label: Set Custom Idle Screen
  kind: action
  command: "set custom‐idle‐screen \"{filename}\""
  params:
    - name: filename
      type: string
      description: "Image path; <=1280x720, converted to 32-bit PNG. Takes effect after restart."
- id: set_custom_watermark
  label: Set Custom Watermark
  kind: action
  command: "set custom‐watermark \"{filename}\""
  params:
    - name: filename
      type: string
      description: "Image path; <=64x64, converted to 32-bit PNG. Takes effect after restart."
- id: video_calibrate_vga
  label: Calibrate VGA Input
  kind: action
  command: "video calibrate‐vga"
  params: []

# ---- Video Output Commands ----
- id: set_output_frame_rate_for_720p
  label: Set Output Frame Rate for 720p
  kind: action
  command: "set output‐frame‐rate‐for‐720p {30fps | 60fps}"
  params:
    - name: rate
      type: string
      description: "30fps | 60fps. Factory default: 60fps. ZvPro line only."
- id: set_vga_output_resolution
  label: Set Output Resolution for VGA Input
  kind: action
  command: "set vga‐output‐resolution {auto | 720p}"
  params:
    - name: resolution
      type: string
      description: "auto | 720p. Factory default: auto."

# ---- Program (HDTV Channel) Information ----
- id: set_short_channel_name
  label: Set Short Channel Name
  kind: action
  command: "set mpeg2 program {video1} short‐channel‐name \"name\""
  params:
    - name: name
      type: string
      description: "Name <=7 chars. Factory default: ZvCast."
- id: set_long_channel_name
  label: Set Long Channel Name
  kind: action
  command: "set mpeg2 program {video1} long‐channel‐name \"name\""
  params:
    - name: name
      type: string
      description: "Name <=64 chars. Factory default: Welcome to ZeeVee ZvCast."
- id: set_hdtv_channel
  label: Set HDTV Channel Number
  kind: action
  command: "set mpeg2 program {video1} hdtv‐channel <0..1023>.<0..1023>"
  params:
    - name: channel
      type: string
      description: "major.minor, each 0..1023. Factory default: 2.1. Requires RF output off first."
- id: set_eit_name
  label: Set EIT Name
  kind: action
  command: "set mpeg2 program {video1} eit‐name \"name\""
  params:
    - name: name
      type: string
      description: "Program guide name <=132 chars. Factory default: Video Over COAX."
- id: set_eit_tv_rating
  label: Set EIT TV Rating
  kind: action
  command: "set mpeg2 program {video1} eit‐tv‐rating {TV‐Y | TV‐G | TV‐PG | TV‐14 | TV‐MA | TV‐MA‐LSV}"
  params:
    - name: rating
      type: string
      description: "TV-Y | TV-G | TV-PG | TV-14 | TV-MA | TV-MA-LSV. Factory default: TV-G."

# ---- MPEG2 Encoding Control ----
- id: set_output_data_rate
  label: Set Encoding Bit Rate
  kind: action
  command: "set mpeg2 output‐data‐rate {low | normal | high}"
  params:
    - name: rate
      type: string
      description: "low | normal | high. Factory default: high. Low and Normal have same effect."
- id: set_watermark_visual
  label: Set Visual Watermark
  kind: action
  command: "set watermark‐visual {off | on}"
  params:
    - name: state
      type: string
      description: "off | on. Factory default: on."

# ---- Advanced MPEG2 and Transport ----
- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  command: "set mpeg2 audio‐delay <1..10>"
  params:
    - name: delay
      type: integer
      description: "1..10. Factory default: 4. >4 = single frame time per unit; <4 = two frame times per unit."
- id: set_dc_coefficient_size
  label: Set DC Coefficient Precision
  kind: action
  command: "set mpeg2 dc‐coefficient‐size {8‐bit | 9‐bit | 10‐bit | 11‐bit}"
  params:
    - name: size
      type: string
      description: "8-bit | 9-bit | 10-bit | 11-bit. Factory default: 10-bit."
- id: set_program_number
  label: Set Program Number
  kind: action
  command: "set mpeg2 program {video1} program‐number <1..65535>"
  params:
    - name: number
      type: integer
      description: "1..65535. Factory default: 1. Requires system restart after change."
- id: set_starting_pid_number
  label: Set Starting PID Number
  kind: action
  command: "set mpeg2 starting‐pid‐number <32..8190>"
  params:
    - name: pid
      type: integer
      description: "32..8190. Factory default: 256. Four PIDs allocated. Requires system restart after change."

# ---- System Maintenance (USB + ZvCli host; NOT on serial interface) ----
- id: download_check
  label: Download Check
  kind: action
  command: "download check"
  params: []
  notes: "Requires Internet connection. USB/ZvCli only - not available on serial interface."
- id: download_firmware
  label: Download Firmware
  kind: action
  command: "download firmware"
  params: []
  notes: "Requires Internet connection. USB/ZvCli only - not available on serial interface."
- id: download_zvcli
  label: Download ZvCli
  kind: action
  command: "download zvcli"
  params: []
  notes: "Requires Internet connection. USB/ZvCli only - not available on serial interface."
- id: script_write_config_to_file
  label: Write Configuration to File
  kind: action
  command: "script write‐config‐to‐file <file>"
  params:
    - name: file
      type: string
      description: "File path."
  notes: "USB/ZvCli only - not available on serial interface."
- id: script_read_config_from_file
  label: Read Configuration from File
  kind: action
  command: "script read‐config‐from‐file <file>"
  params:
    - name: file
      type: string
      description: "File path."
  notes: "USB/ZvCli only - not available on serial interface."
- id: system_send_troubleshooting_report
  label: Send Troubleshooting Report
  kind: action
  command: "system send‐troubleshooting‐report"
  params: []
  notes: "Requires Internet connection. USB/ZvCli only - not available on serial interface."
- id: system_show_saved_troubleshooting_reports
  label: Show Saved Troubleshooting Reports
  kind: query
  command: "system show‐saved‐troubleshooting‐reports"
  params: []
  notes: "USB/ZvCli only - not available on serial interface."
- id: system_send_saved_troubleshooting_reports
  label: Send Saved Troubleshooting Reports
  kind: action
  command: "system send‐saved‐troubleshooting‐reports"
  params: []
  notes: "Requires Internet connection. USB/ZvCli only - not available on serial interface."

# ---- Advanced Firmware Download and Installation (USB + ZvCli) ----
- id: download_advanced_show_downloadable_firmware
  label: Show Downloadable Firmware
  kind: query
  command: "download advanced show‐downloadable‐firmware [passphrase \"passphrase\"]"
  params:
    - name: passphrase
      type: string
      description: "Optional passphrase."
  notes: "USB/ZvCli only."
- id: download_advanced_get_downloadable_firmware
  label: Get Downloadable Firmware
  kind: action
  command: "download advanced get‐downloadable‐firmware model {ZvPro‐250 | ZvBox‐150} [filename \"name\"]"
  params:
    - name: model
      type: string
      description: "ZvPro-250 | ZvBox-150."
    - name: filename
      type: string
      description: "Optional filename."
  notes: "USB/ZvCli only."
- id: download_advanced_show_downloaded_firmware
  label: Show Downloaded Firmware
  kind: query
  command: "download advanced show‐downloaded‐firmware"
  params: []
  notes: "USB/ZvCli only."
- id: download_advanced_install_downloaded_firmware
  label: Install Downloaded Firmware
  kind: action
  command: "download advanced install‐downloaded‐firmware filename \"name\""
  params:
    - name: filename
      type: string
      description: "Filename to install."
  notes: "USB/ZvCli only."
- id: download_advanced_remove_downloaded_firmware
  label: Remove Downloaded Firmware
  kind: action
  command: "download advanced remove‐downloaded‐firmware"
  params: []
  notes: "USB/ZvCli only."

# ---- Miscellaneous Commands ----
- id: system_transmit_ir
  label: Transmit IR Code for Learning
  kind: action
  command: "system transmit‐ir {video‐source‐component | video‐source‐vga | video‐source‐idle‐screen}"
  params:
    - name: source
      type: string
      description: "video-source-component | video-source-vga | video-source-idle-screen. Sent once per invocation."
- id: set_date
  label: Set Date/Time
  kind: action
  command: "set date year <year> month <month> day <day> hour <hour> minute <minute> second <second>"
  params:
    - name: year
      type: integer
      description: "2008-2028."
    - name: month
      type: integer
      description: "1-12."
    - name: day
      type: integer
      description: "1-31."
    - name: hour
      type: integer
      description: "0-23."
    - name: minute
      type: integer
      description: "0-59."
    - name: second
      type: integer
      description: "0-59."
  notes: "Use UTC time when setting via serial port."
- id: set_zvbox_name
  label: Set ZvBox Name
  kind: action
  command: "set zvbox‐name \"name\""
  params:
    - name: name
      type: string
      description: "<=16 chars; upper/lower letters, numbers, underscore, hyphen."
- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "set led‐brightness {high | medium | low | off}"
  params:
    - name: level
      type: string
      description: "high | medium | low | off. Factory default: high. ZvBox-150 only."
- id: set_select_button
  label: Enable/Disable Select Button
  kind: action
  command: "set select‐button {enabled | disabled}"
  params:
    - name: state
      type: string
      description: "enabled | disabled. Factory default: enabled. ZvPro-250 only."
- id: set_to_factory_defaults
  label: Reset to Factory Defaults
  kind: action
  command: "set to‐factory‐defaults"
  params: []
  notes: "Resets all settings; unit reboots after reset."
- id: system_reboot
  label: Reboot ZvBox
  kind: action
  command: "system reboot"
  params: []
  notes: "Forces complete reboot; takes several minutes."
- id: system_restart
  label: Restart Video Processing
  kind: action
  command: "system restart"
  params: []
  notes: "Restarts all video processing; broadcast temporarily stops. Required after program-number or starting-pid-number changes."
- id: system_identify
  label: Identify Physical ZvBox
  kind: action
  command: "system identify"
  params: []
  notes: "Flashes LEDs for ~10 seconds for rack identification."
- id: help
  label: Help
  kind: query
  command: "help"
  params: []
- id: quit
  label: Quit / Exit
  kind: action
  command: "quit -or‐ exit"
  params: []
```

## Feedbacks
```yaml
# Responses to query commands; source shows rich multi-line text output per query.
- id: system_status_response
  type: text
  description: "Multi-line system status: model, serial number, hardware/uboot/firmware revisions, temperature, boot counts, EDID resolutions, serial baud rate, date/time, uptime."
- id: av_status_response
  type: text
  description: "Multi-line A/V status: transmit status, RF/hdtv channel, modulation, cable-plan, input video/audio source+format, output formats, closed-caption state."
- id: config_response
  type: text
  description: "Current configuration as a list of set commands + values; copy-pasteable into a script."
- id: analysis_response
  type: text
  description: "Warnings: ZvCli/firmware version, date mismatch, unrecognized video/audio input, RF conflict."
- id: zvcli_info_response
  type: text
  description: "ZvCli version string and copyright."
- id: success_ack
  type: text
  values: ["Success"]
  description: "Acknowledgement returned on successful set/action command."
# UNRESOLVED: no formal enumerated value tables for most query responses; outputs are free-form text blocks.
```

## Variables
```yaml
# Settable parameters exposed via discrete actions above (rf-channel, rf-power, audio-delay,
# program-number, starting-pid-number, edid resolutions, channel names, etc.).
# No separately-addressable continuous variables beyond the action parameters.
# UNRESOLVED: populate if a variables abstraction is required by the platform.
```

## Events
```yaml
# Source documents no unsolicited notifications; CLI is request/response.
# UNRESOLVED: populate if device emits async notifications (not stated in source).
```

## Macros
```yaml
# Source documents a script file mechanism (script read/write-config) executed as a
# batch of set commands, with the convention of bracketing scripts with
# `set rf-output off` ... `set rf-output on`. See Safety interlocks.
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot        # forces full reboot, several minutes, broadcast stops
  - set_to_factory_defaults  # resets all settings then reboots
  - download_advanced_install_downloaded_firmware  # firmware change
interlocks:
  - description: "RF output must be OFF before changing rf-channel or hdtv-channel; must be turned back ON for the ZvBox to broadcast. Scripts must begin with `set rf-output off` and end with `set rf-output on`."
    commands: [set_rf_output, set_rf_channel, set_hdtv_channel]
  - description: "Video processing must be restarted (`system restart`) after changing program-number or starting-pid-number for the new value to take effect."
    commands: [set_program_number, set_starting_pid_number, system_restart]
  - description: "Custom idle-screen and watermark changes do not take effect until the system is restarted."
    commands: [set_custom_idle_screen, set_custom_watermark, system_restart]
# No voltage/current/power values stated in source.
```

## Notes
- Serial config: RS-232, 9600 8-N-1, software Xon/Xoff flow control. Stated both in the header "Serial Port Specifications" and confirmed by `show system-status` (`Serial console baud rate : 9600 (8-N-1)`).
- Command strings use the source's hyphen glyph (U+2010 ‐) verbatim throughout; implementers should treat `‐` and ASCII `-` as equivalent pending on-device confirmation.
- CLI syntax conventions: `<>` encase a value, `{}` encase a mandatory choice, `[]` encase optional parameters. Lines beginning with `#` are comments (script files only). Strings with spaces need `"quotes"`.
- Firmware update, script file read/write, and troubleshooting-report commands require a USB connection + ZvCli host and are explicitly noted as NOT available over the serial interface.
- RF output power: max +25 dBmV, five ~5 dBmV steps (1-lowest .. 5-highest).
- DTS audio encoding not supported. Test images broadcast in 720p.

<!-- UNRESOLVED: exact HDB2840 NA SKU feature mapping (source is the generic ZvCli manual for ZvPro 250 / ZvBox 150). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: voltage / current / power specifications not stated. -->
<!-- UNRESOLVED: fault behavior / error recovery sequences not documented. -->
<!-- UNRESOLVED: whether the U+2010 hyphen vs ASCII hyphen matters to the device parser — not confirmed on hardware. -->

## Provenance

```yaml
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zvcli-user-manual/
  - https://www.zeevee.com/hdbridge-2840-na-configuration-guide/
retrieved_at: 2026-06-30T05:15:49.370Z
last_checked_at: 2026-06-30T07:14:08.717Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:14:08.717Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched verbatim against source commands; transport parameters fully supported; bidirectional coverage confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is the generic ZvCli User Manual which documents the ZvPro 250 / ZvBox 150 families; exact feature mapping to the HDB2840 NA SKU is not stated. Voltage/power specs, fault behavior, and firmware compatibility ranges are not stated. Some commands (firmware update, script read/write, troubleshooting reports) require a USB connection + ZvCli host and are NOT available over the serial interface per source note."
- "no formal enumerated value tables for most query responses; outputs are free-form text blocks."
- "populate if a variables abstraction is required by the platform."
- "populate if device emits async notifications (not stated in source)."
- "exact HDB2840 NA SKU feature mapping (source is the generic ZvCli manual for ZvPro 250 / ZvBox 150)."
- "firmware version compatibility range not stated."
- "voltage / current / power specifications not stated."
- "fault behavior / error recovery sequences not documented."
- "whether the U+2010 hyphen vs ASCII hyphen matters to the device parser — not confirmed on hardware."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
