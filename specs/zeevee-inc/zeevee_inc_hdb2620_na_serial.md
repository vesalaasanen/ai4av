---
spec_id: admin/zeevee-inc-hdb2620-na
schema_version: ai4av-public-spec-v1
revision: 1
title: "ZeeVee Inc HDB2620 NA Control Spec"
manufacturer: "ZeeVee Inc"
model_family: "HDB2620 NA"
aliases: []
compatible_with:
  manufacturers:
    - "ZeeVee Inc"
  models:
    - "HDB2620 NA"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zvcli-user-manual/
  - https://www.zeevee.com/hdbridge-2500-2600-configuration-guide/
  - https://www.zeevee.com/documentation/
retrieved_at: 2026-06-30T05:13:39.139Z
last_checked_at: 2026-06-30T07:14:07.838Z
generated_at: 2026-06-30T07:14:07.838Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source manual covers the ZvPro 250 / ZvBox 150 product line generically; it does not name the HDB2620 NA model specifically. Serial command set is assumed identical across the Pro/Prosumer line per the manual's statement that RS-232 mirrors ZvCli."
  - "No voltage, current, or power-consumption values stated in source."
  - "Firmware version compatibility range not stated in source."
  - "device may emit async status but source describes none."
  - "no electrical safety / interlock-voltage procedures stated in source."
  - "HDB2620 NA model not named in source; serial command set inferred from the shared ZvCli/ZvPro interface."
  - "No response/ack framing details (line terminator, CR/LF, prompt string) beyond the \"Success\" acknowledgement and the \"ZvCli$ \" prompt shown in examples."
  - "No binary byte-level encoding documented — protocol is ASCII text CLI."
  - "Firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:14:07.838Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched verbatim in source; all transport parameters supported; full command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ZeeVee Inc HDB2620 NA Control Spec

## Summary
ZeeVee HDB-series / ZvPro encoder-broadcaster controlled via the ZvCli command line over an RS-232C serial port. The source is the ZvCli User Manual (Rev 1.3), which documents status queries, RF/cable broadcast setup, audio/video input selection, MPEG2 encoding tuning, and system maintenance commands. The serial interface exposes most ZvCli commands except firmware update and config-file save/load (those require a USB + ZvCli connection).

<!-- UNRESOLVED: Source manual covers the ZvPro 250 / ZvBox 150 product line generically; it does not name the HDB2620 NA model specifically. Serial command set is assumed identical across the Pro/Prosumer line per the manual's statement that RS-232 mirrors ZvCli. -->
<!-- UNRESOLVED: No voltage, current, or power-consumption values stated in source. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600      # source: "9,600 baud" + "Serial console baud rate : 9600 (8-N-1)"
  data_bits: 8         # source: "8 bits"
  parity: none         # source: "no parity"
  stop_bits: 1         # source: "1 stop bit"
  flow_control: xon_xoff  # source: "software (Xon / Xoff) flow control"
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- queryable  # inferred: show system-status / show av-status / show config / show analysis return device state
```

## Actions
```yaml
# ── Status / query commands ──────────────────────────────────────────
- id: show_system_status
  label: Show System Status
  kind: query
  command: "show system-status"
  params: []
  notes: Returns model, serial number, hardware/uboot/firmware revisions, temperature, boot counts, serial baud rate, date/time, uptime.

- id: show_av_status
  label: Show Audio/Video Status
  kind: query
  command: "show av-status"
  params: []
  notes: Returns transmit status, rf-channel, modulation, cable-plan, input video/audio source and format, output format, closed-caption state.

- id: show_config
  label: Show Configuration
  kind: query
  command: "show config"
  params: []
  notes: Returns current configuration as a series of set commands; copy/paste-able into a script.

- id: show_analysis
  label: Show Analysis
  kind: query
  command: "show analysis"
  params: []
  notes: Reports warnings (firmware/date skew, unrecognized video/audio input, RF conflict).

- id: show_zvcli_info
  label: Show ZvCli Information
  kind: query
  command: "show zvcli-info"
  params: []
  notes: Returns ZvCli version and copyright.

# ── RF, Cable and Broadcast commands ─────────────────────────────────
- id: system_cable_scan
  label: Cable Scan
  kind: action
  command: "system cable-scan [cable-plan {standard|hrc|irc|auto-detect}]"
  params:
    - name: cable-plan
      type: string
      description: "Optional cable plan: standard, hrc, irc, or auto-detect (default if omitted)."
  notes: Stops transmit, scans every RF channel, reports open/occupied (analog or digital). Scans low→high frequency; channel numbers appear non-linear. Do not interrupt.

- id: system_cable_print_last_scan_results
  label: Print Last Cable Scan Results
  kind: query
  command: "system cable-print-last-scan-results"
  params: []

- id: set_rf_output
  label: Set RF Output On/Off
  kind: action
  command: "set rf-output {off|on}"
  params:
    - name: state
      type: string
      description: "off or on (factory default: on)."
  notes: Must be set off before changing rf-channel, hdtv-channel, cable-plan, etc.; set back on to resume broadcast.

- id: set_rf_channel
  label: Set RF Channel
  kind: action
  command: "set rf-channel <2..135>"
  params:
    - name: channel
      type: integer
      description: "RF channel number, 2..135 (factory default: 2)."
  notes: Requires rf-output off first; usually paired with hdtv-channel change.

- id: set_cable_plan
  label: Set Cable Plan
  kind: action
  command: "set cable-plan {standard|hrc|irc}"
  params:
    - name: plan
      type: string
      description: "standard, hrc, or irc (factory default: standard)."

- id: set_rf_power
  label: Set RF Output Power
  kind: action
  command: "set rf-power {1-lowest|2-low|3-medium|4-high|5-highest}"
  params:
    - name: level
      type: string
      description: "1-lowest, 2-low, 3-medium, 4-high, or 5-highest (factory default: 5-highest). ~5 dBmV steps; max +25 dBmV."

# ── Audio input commands ─────────────────────────────────────────────
- id: set_audio_for_component
  label: Set Audio Input for Component
  kind: action
  command: "set audio-for-component {analog|spdif-optical|spdif-coax|usb|none}"
  params:
    - name: source
      type: string
      description: "analog, spdif-optical, spdif-coax, usb, or none. Factory default ZvPro250: analog; ZvBox150: spdif-coax."

- id: set_audio_for_vga
  label: Set Audio Input for VGA
  kind: action
  command: "set audio-for-vga {analog|spdif-optical|spdif-coax|usb|none}"
  params:
    - name: source
      type: string
      description: "analog, spdif-optical, spdif-coax, usb, or none. Factory default ZvPro250: analog; ZvBox150: usb."

# ── Video input commands ─────────────────────────────────────────────
- id: set_video_source
  label: Select Active Video Source
  kind: action
  command: "set video-source {component|vga|idle-screen|test-image-1|test-image-2}"
  params:
    - name: source
      type: string
      description: "component, vga, idle-screen, test-image-1, or test-image-2 (factory default: component). Ignored if same as current source."

- id: set_vga_edid_underscan_resolution_1080
  label: Set VGA EDID Underscan Resolution 1080
  kind: action
  command: "set vga-edid-underscan-resolution-1080 {<resolution>}"
  params:
    - name: resolution
      type: string
      description: "One of the documented 1080 underscan resolutions (e.g. 1912x1075, 1904x1071, ..., 1808x1017 [default], ..., 1704x958). See command-details table in source."
  notes: X resolution must be divisible by 16 on Apple computers.

- id: set_vga_edid_underscan_resolution_720
  label: Set VGA EDID Underscan Resolution 720
  kind: action
  command: "set vga-edid-underscan-resolution-720 {<resolution>}"
  params:
    - name: resolution
      type: string
      description: "One of the documented 720 underscan resolutions (e.g. 1272x715, ..., 1208x679 [default], ..., 1120x630). See command-details table in source."
  notes: X resolution must be divisible by 16 on Apple computers.

- id: set_custom_idle_screen
  label: Set Custom Idle Screen
  kind: action
  command: "set custom-idle-screen \"<filename>\""
  params:
    - name: filename
      type: string
      description: Path to image file (converted to 32-bit PNG). Factory default "".
  notes: Does not take effect until ZvBox restarted via system restart.

- id: set_custom_watermark
  label: Set Custom Watermark
  kind: action
  command: "set custom-watermark \"<filename>\""
  params:
    - name: filename
      type: string
      description: Path to image file (converted to 32-bit PNG). Factory default "".
  notes: Does not take effect until ZvBox restarted via system restart.

- id: video_calibrate_vga
  label: Calibrate VGA Input
  kind: action
  command: "video calibrate-vga"
  params: []
  notes: Forces recalibration of incoming VGA video (centering/color).

# ── Video output commands ────────────────────────────────────────────
- id: set_output_frame_rate_for_720p
  label: Set Output Frame Rate for 720p
  kind: action
  command: "set output-frame-rate-for-720p {30fps|60fps}"
  params:
    - name: rate
      type: string
      description: "30fps or 60fps (factory default: 60fps). ZvPro line only."

- id: set_vga_output_resolution
  label: Set VGA Output Resolution
  kind: action
  command: "set vga-output-resolution {auto|720p}"
  params:
    - name: resolution
      type: string
      description: "auto or 720p (factory default: auto)."

# ── Program / HDTV channel information ───────────────────────────────
- id: set_program_short_channel_name
  label: Set Program Short Channel Name
  kind: action
  command: "set mpeg2 program video1 short-channel-name \"<name>\""
  params:
    - name: name
      type: string
      description: "Channel name, max 7 chars (factory default: ZvCast)."

- id: set_program_long_channel_name
  label: Set Program Long Channel Name
  kind: action
  command: "set mpeg2 program video1 long-channel-name \"<name>\""
  params:
    - name: name
      type: string
      description: "Channel name, max 64 chars (factory default: Welcome to ZeeVee ZvCast)."

- id: set_program_hdtv_channel
  label: Set HDTV Channel Number
  kind: action
  command: "set mpeg2 program video1 hdtv-channel <0..1023>.<0..1023>"
  params:
    - name: major
      type: integer
      description: "Major virtual channel number, 0..1023."
    - name: minor
      type: integer
      description: "Minor virtual channel number, 0..1023."
  notes: "Factory default: 2.1. Requires rf-output off before changing."

- id: set_program_eit_name
  label: Set EIT Name
  kind: action
  command: "set mpeg2 program video1 eit-name \"<name>\""
  params:
    - name: name
      type: string
      description: "Program guide entry name, max 132 chars (factory default: \"Video Over COAX\")."

- id: set_program_eit_tv_rating
  label: Set EIT TV Rating
  kind: action
  command: "set mpeg2 program video1 eit-tv-rating {TV-Y|TV-G|TV-PG|TV-14|TV-MA|TV-MA-LSV}"
  params:
    - name: rating
      type: string
      description: "TV-Y, TV-G, TV-PG, TV-14, TV-MA, or TV-MA-LSV (factory default: TV-G). Per MPEG2/CEA-766 region 1."

# ── MPEG2 encoding control ───────────────────────────────────────────
- id: set_mpeg2_output_data_rate
  label: Set Encoding Bit Rate
  kind: action
  command: "set mpeg2 output-data-rate {low|normal|high}"
  params:
    - name: rate
      type: string
      description: "low, normal, or high (factory default: high). normal=19.4 Mbps cap, high=up to 38.78 Mbps. Low==Normal currently."

- id: set_watermark_visual
  label: Set Visual Watermark
  kind: action
  command: "set watermark-visual {off|on}"
  params:
    - name: state
      type: string
      description: "off or on (factory default: on)."

# ── Advanced MPEG2 and transport ─────────────────────────────────────
- id: set_mpeg2_audio_delay
  label: Set Audio Delay
  kind: action
  command: "set mpeg2 audio-delay <1..10>"
  params:
    - name: delay
      type: integer
      description: "Audio delay, 1..10 (factory default: 4). Units above 4 = 1 frame time; below 4 = 2 frame times."

- id: set_mpeg2_dc_coefficient_size
  label: Set DC Coefficient Precision
  kind: action
  command: "set mpeg2 dc-coefficient-size {8-bit|9-bit|10-bit|11-bit}"
  params:
    - name: size
      type: string
      description: "8-bit, 9-bit, 10-bit, or 11-bit (factory default: 10-bit). 11-bit may break some HDTVs."

- id: set_program_number
  label: Set Program Number
  kind: action
  command: "set mpeg2 program video1 program-number <1..65535>"
  params:
    - name: number
      type: integer
      description: "Program number, 1..65535 (factory default: 1)."
  notes: Video processing MUST be restarted via system restart for the new value to take effect.

- id: set_mpeg2_starting_pid_number
  label: Set Starting PID Number
  kind: action
  command: "set mpeg2 starting-pid-number <32..8190>"
  params:
    - name: pid
      type: integer
      description: "Starting PID, 32..8190 (factory default: 256). Four PIDs allocated (video/audio/program/control)."
  notes: Video processing MUST be restarted via system restart for the new value to take effect.

# ── Configuration script read/write (USB + ZvCli only, NOT serial) ──
- id: script_write_config_to_file
  label: Write Config to File
  kind: action
  command: "script write-config-to-file <file>"
  params:
    - name: file
      type: string
      description: Local file path to write.
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli connection (source: firmware update and save/load settings missing from serial)."

- id: script_read_config_from_file
  label: Read Config from File
  kind: action
  command: "script read-config-from-file <file>"
  params:
    - name: file
      type: string
      description: Local file path to read.
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli connection."

# ── Software download (USB + ZvCli only, NOT serial) ─────────────────
- id: download
  label: Download (check/firmware/zvcli)
  kind: action
  command: "download <check|firmware|zvcli>"
  params:
    - name: target
      type: string
      description: "check (check for updates), firmware, or zvcli."
  notes: "Requires Internet connection. NOT available over the RS-232 serial interface - requires USB + ZvCli."

- id: download_advanced_show_downloadable_firmware
  label: Show Downloadable Firmware
  kind: query
  command: "download advanced show-downloadable-firmware [passphrase \"<passphrase>\"]"
  params:
    - name: passphrase
      type: string
      description: Optional passphrase for access to additional versions.
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli + Internet."

- id: download_advanced_get_downloadable_firmware
  label: Get Downloadable Firmware
  kind: action
  command: "download advanced get-downloadable-firmware model {ZvPro-250|ZvBox-150} [filename \"<name>\"]"
  params:
    - name: model
      type: string
      description: "ZvPro-250 or ZvBox-150."
    - name: filename
      type: string
      description: Optional specific image filename.
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli + Internet."

- id: download_advanced_show_downloaded_firmware
  label: Show Downloaded Firmware
  kind: query
  command: "download advanced show-downloaded-firmware"
  params: []
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli."

- id: download_advanced_install_downloaded_firmware
  label: Install Downloaded Firmware
  kind: action
  command: "download advanced install-downloaded-firmware filename \"<name>\""
  params:
    - name: filename
      type: string
      description: Downloaded firmware image filename.
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli."

- id: download_advanced_remove_downloaded_firmware
  label: Remove Downloaded Firmware
  kind: action
  command: "download advanced remove-downloaded-firmware"
  params: []
  notes: "NOT available over the RS-232 serial interface - requires USB + ZvCli."

# ── Troubleshooting reports ──────────────────────────────────────────
- id: system_send_troubleshooting_report
  label: Send Troubleshooting Report
  kind: action
  command: "system send-troubleshooting-report"
  params: []
  notes: Collects status/config/logs and sends to ZeeVee; writes a local JSON if send fails. Requires Internet to send.

- id: system_show_saved_troubleshooting_reports
  label: Show Saved Troubleshooting Reports
  kind: query
  command: "system show-saved-troubleshooting-reports"
  params: []

- id: system_send_saved_troubleshooting_reports
  label: Send Saved Troubleshooting Reports
  kind: action
  command: "system send-saved-troubleshooting-reports"
  params: []
  notes: Sends queued reports and removes them on success.

# ── Miscellaneous commands ───────────────────────────────────────────
- id: system_transmit_ir
  label: Transmit IR Code for Learning
  kind: action
  command: "system transmit-ir {video-source-component|video-source-vga|video-source-idle-screen}"
  params:
    - name: code
      type: string
      description: "video-source-component, video-source-vga, or video-source-idle-screen."
  notes: Emits the input-switch IR code once for teaching a learning remote.

- id: set_date
  label: Set Date/Time
  kind: action
  command: "set date year <year> month <month> day <day> hour <hour> minute <minute> second <second>"
  params:
    - name: year
      type: integer
      description: "2008..2028."
    - name: month
      type: integer
      description: "1..12."
    - name: day
      type: integer
      description: "1..31."
    - name: hour
      type: integer
      description: "0..23."
    - name: minute
      type: integer
      description: "0..59."
    - name: second
      type: integer
      description: "0..59."
  notes: "Over serial, enter UTC time (local time is converted only by PC ZvCli). ZvBox-150 has no battery-backed clock."

- id: set_zvbox_name
  label: Set ZvBox Name
  kind: action
  command: "set zvbox-name \"<name>\""
  params:
    - name: name
      type: string
      description: "Max 16 chars; upper/lower letters, numbers, underscore, hyphen."

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "set led-brightness {high|medium|low|off}"
  params:
    - name: level
      type: string
      description: "high, medium, low, or off (factory default: high)."
  notes: ZvBox-150 only.

- id: set_select_button
  label: Enable/Disable Select Button
  kind: action
  command: "set select-button {enabled|disabled}"
  params:
    - name: state
      type: string
      description: "enabled or disabled (factory default: enabled)."
  notes: ZvPro-250 only.

- id: set_to_factory_defaults
  label: Reset to Factory Defaults
  kind: action
  command: "set to-factory-defaults"
  params: []
  notes: Resets all settings to factory defaults; unit reboots afterwards.

- id: system_reboot
  label: Reboot ZvBox
  kind: action
  command: "system reboot"
  params: []
  notes: Full reboot; takes several minutes.

- id: system_restart
  label: Restart Video Processing
  kind: action
  command: "system restart"
  params: []
  notes: Restarts video processing; broadcast stops then resumes. Required after changing program-number or starting-pid-number, and to apply custom idle-screen/watermark.

- id: system_identify
  label: Identify Physical ZvBox
  kind: action
  command: "system identify"
  params: []
  notes: Flashes front-panel LEDs for 10 seconds to identify a unit in a rack.

- id: help
  label: Help
  kind: action
  command: "help"
  params: []

- id: quit
  label: Quit / Exit
  kind: action
  command: "quit"  # alias: exit
  params: []
  notes: "quit or exit - exits ZvCli."
```

## Feedbacks
```yaml
- id: system_status
  type: object
  description: Output of "show system-status" - model, serial number, hardware/uboot/firmware revisions, temperature, boot counts, serial baud rate, date/time, uptime.

- id: av_status
  type: object
  description: Output of "show av-status" - transmit status, rf-channel, modulation, cable-plan, input/output video & audio format, closed-caption state.

- id: config_dump
  type: object
  description: Output of "show config" - full current configuration as set commands.

- id: analysis_warnings
  type: object
  description: Output of "show analysis" - firmware/date skew, unrecognized video/audio input, RF conflict warnings.

- id: zvcli_info
  type: object
  description: Output of "show zvcli-info" - ZvCli version and copyright.

- id: cable_scan_results
  type: object
  description: Output of "system cable-print-last-scan-results" - analog/digital/free RF channel lists.

- id: command_result
  type: enum
  values: [Success, error]
  description: Per-command acknowledgement string returned by ZvCli (e.g. "Success").
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions above (rf-channel,
# rf-power, audio source, video source, mpeg2 tuning, etc.). No additional
# standalone variables beyond those action parameters.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: device may emit async status but source describes none.
```

## Macros
```yaml
# Source describes a recommended multi-step pattern around RF reconfiguration:
#   set rf-output off  →  change rf-channel / hdtv-channel  →  set rf-output on
# and around MPEG2 transport changes:
#   change program-number / starting-pid-number  →  system restart
# These are documented sequences, not stored device macros.
```

## Safety
```yaml
confirmation_required_for:
  - set to-factory-defaults   # resets all settings; unit reboots
  - system reboot             # full reboot, several minutes
  - system restart            # stops broadcast temporarily
  - set rf-output off         # stops broadcast
interlocks:
  - "rf-output must be off before changing rf-channel, cable-plan, or hdtv-channel (source requirement)."
  - "system restart required for program-number or starting-pid-number changes to take effect."
  - "custom idle-screen / custom-watermark require system restart to take effect."
# UNRESOLVED: no electrical safety / interlock-voltage procedures stated in source.
```

## Notes
- CLI syntax conventions: `<>` encloses a value, `{}` a mandatory choice, `[]` an optional parameter. Lines beginning with `#` are comments (script files only). Strings containing spaces need double quotes.
- ZvCli interactive shortcuts: TAB auto-completes; up/down arrows navigate history.
- Over the RS-232 serial interface the firmware-update (`download firmware` / `download advanced ...`) and config-file save/load (`script read/write-config-from/to-file`) commands are NOT available — they require a USB connection plus ZvCli (explicitly stated in source).
- When setting date/time over serial, enter UTC (the PC ZvCli converts local→UTC; the serial console does not). ZvBox-150 has no battery-backed RTC.
- Max RF output power is +25 dBmV; five power steps of ~5 dBmV each.
- The embedded digital watermark (source identity) cannot be disabled; only the visible Zv logo watermark is controlled by `set watermark-visual`.

<!-- UNRESOLVED: HDB2620 NA model not named in source; serial command set inferred from the shared ZvCli/ZvPro interface. -->
<!-- UNRESOLVED: No response/ack framing details (line terminator, CR/LF, prompt string) beyond the "Success" acknowledgement and the "ZvCli$ " prompt shown in examples. -->
<!-- UNRESOLVED: No binary byte-level encoding documented — protocol is ASCII text CLI. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->
````

## Provenance

```yaml
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zvcli-user-manual/
  - https://www.zeevee.com/hdbridge-2500-2600-configuration-guide/
  - https://www.zeevee.com/documentation/
retrieved_at: 2026-06-30T05:13:39.139Z
last_checked_at: 2026-06-30T07:14:07.838Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:14:07.838Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched verbatim in source; all transport parameters supported; full command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source manual covers the ZvPro 250 / ZvBox 150 product line generically; it does not name the HDB2620 NA model specifically. Serial command set is assumed identical across the Pro/Prosumer line per the manual's statement that RS-232 mirrors ZvCli."
- "No voltage, current, or power-consumption values stated in source."
- "Firmware version compatibility range not stated in source."
- "device may emit async status but source describes none."
- "no electrical safety / interlock-voltage procedures stated in source."
- "HDB2620 NA model not named in source; serial command set inferred from the shared ZvCli/ZvPro interface."
- "No response/ack framing details (line terminator, CR/LF, prompt string) beyond the \"Success\" acknowledgement and the \"ZvCli$ \" prompt shown in examples."
- "No binary byte-level encoding documented — protocol is ASCII text CLI."
- "Firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
