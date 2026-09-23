---
spec_id: admin/samsung-qm85d-lh55omd-75omd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung QM85D / LH55OMD / 75OMD Control Spec"
manufacturer: Samsung
model_family: QM85D
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - QM85D
    - LH55OMD
    - OM75D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - github.com
  - image-us.samsung.com
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
retrieved_at: 2026-09-03T22:39:10.052Z
last_checked_at: 2026-09-18T22:19:17.335Z
generated_at: 2026-09-18T22:19:17.335Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "0xD0.84 Monitoring (Get Only)"
  - "0xD0.85 ABL mode"
  - "0xD0.86 XOR Output Activation mode"
  - "0xD0.87 LOD ReCheck"
  - "0xD0.92 Module WB (RGB) Control"
  - "0xD0.93 Cabinet CC (RGB) Control"
  - "0xD0.94 Cabinet Backlight"
  - "0xD0.95 Cabinet Pixel WB (RGB) CC on/off"
  - "0xD0.96 Gamut Control"
  - "0xD0.97 Cabinet Seam Correction"
  - "0xD0.98 Cabinet Seam Correction on/off"
  - "0xD0.99 Module WB (RGB) on/off"
  - "list any major gaps here"
  - "hardware firmware version, RJ45 authentication procedure, exact TCP retry/timeout contract"
  - "source describes ACK/NAK only; no unsolicited event stream documented"
  - "no multi-step sequences explicitly described in source"
  - "source describes operational constraints (reboots, dependencies) but no formal safety interlocks"
  - "fields that could not be determined from the source, with explanation."
verification:
  verdict: verified
  checked_at: 2026-09-18T22:19:17.335Z
  matched_actions: 233
  action_count: 233
  confidence: medium
  summary: "All 233 spec actions have literal byte matches in the source command catalogue; transport values verbatim; unrepresented source commands are LED-product-only sub-commands not applicable to QM85D/OMD LCD LFD. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Samsung QM85D / LH55OMD / 75OMD Control Spec

## Summary
Samsung LFD (Large Format Display) signage control via Samsung's MDC (Multiple Display Control) protocol. The protocol runs over RS-232 (DB9, 9600/8/N/1) and over TCP/IP (default 192.168.0.10, port 1515), carrying identical payload framing. Each command begins with header `0xAA`, command byte, ID, data length, data bytes, and a single-byte checksum (sum of preceding bytes, truncated to a byte).

<!-- UNRESOLVED: list any major gaps here -->
<!-- UNRESOLVED: hardware firmware version, RJ45 authentication procedure, exact TCP retry/timeout contract -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  host: 192.168.0.10
  port: 1515
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
  # inferred: no auth/login/token procedure described in source
```

## Traits
```yaml
- powerable       # inferred from 0x11 Power Control examples
- routable        # inferred from 0x14 Input Source Control examples
- queryable       # inferred from 0x00..0x8A get-status examples
- levelable       # inferred from 0x12 Volume, 0x24 Contrast, 0x25 Brightness examples
```

## Actions
```yaml
# All commands share framing: 0xAA <cmd> <id> <data_len> <data...> <checksum>
# For SET commands, append the literal payload field shown for each action.
# For GET commands, omit the data field and append a checksum over the request.

- id: status_control_get
  label: Status Control (Get)
  kind: query
  command: "0xAA 0x00 <id> 0x00 <sum>"
  notes: "Returns power, volume, mute, input, aspect, N Time NF, F Time NF."

- id: video_control_get
  label: Video Control (Get)
  kind: query
  command: "0xAA 0x04 <id> 0x00 <sum>"
  notes: "Returns contrast, brightness, sharpness, color, tint, color tone, color temp."

- id: rgb_control_get
  label: RGB Control (Get, PC/BNC/DVI only)
  kind: query
  command: "0xAA 0x06 <id> 0x00 <sum>"
  notes: "Returns contrast, brightness, color tone, color temp, R/G/B gain."

- id: pip_status_get
  label: PIP Status (Get)
  kind: query
  command: "0xAA 0x07 <id> 0x00 <sum>"

- id: maintenance_control_get
  label: Maintenance Control (Get)
  kind: query
  command: "0xAA 0x08 <id> 0x00 <sum>"
  notes: "Returns power, PIP size/source, lamp max/min schedule, video wall fields."

- id: sound_control_get
  label: Sound Control (Get)
  kind: query
  command: "0xAA 0x09 <id> 0x00 <sum>"
  notes: "Type 1 or Type 2 EQ band format per model."

- id: serial_number_get
  label: Serial Number (Get)
  kind: query
  command: "0xAA 0x0B <id> 0x00 <sum>"

- id: display_status_get
  label: Display Status (Get)
  kind: query
  command: "0xAA 0x0D <id> 0x00 <sum>"
  notes: "Returns lamp/temp/bright sensor/no-sync/fan errors."

- id: sw_version_get
  label: SW Version (Get)
  kind: query
  command: "0xAA 0x0E <id> 0x00 <sum>"

- id: auto_motion_plus_get
  label: Auto Motion Plus (Get)
  kind: query
  command: "0xAA 0x0F <id> 0x00 <sum>"

- id: auto_motion_plus_set
  label: Auto Motion Plus (Set)
  kind: action
  command: "0xAA 0x0F <id> 0x03 <mode> <blur_reduction> <judder_reduction> <sum>"
  params:
    - name: mode
      type: integer
      description: "0x00 Off, 0x01 Clear, 0x02 Standard, 0x03 Smooth, 0x04 Custom, 0x05 Demo, 0x06 Auto"
    - name: blur_reduction
      type: integer
      description: "0..10; only when mode=Custom"
    - name: judder_reduction
      type: integer
      description: "0..10; only when mode=Custom"

- id: model_number_get
  label: Model Number (Get)
  kind: query
  command: "0xAA 0x10 <id> 0x00 <sum>"

- id: power_get
  label: Power (Get)
  kind: query
  command: "0xAA 0x11 <id> 0x00 <sum>"

- id: power_off
  label: Power Off
  kind: action
  command: "0xAA 0x11 <id> 0x01 0x00 <sum>"

- id: power_on
  label: Power On
  kind: action
  command: "0xAA 0x11 <id> 0x01 0x01 <sum>"

- id: power_reboot
  label: Power Reboot
  kind: action
  command: "0xAA 0x11 <id> 0x01 0x02 <sum>"

- id: volume_get
  label: Volume (Get)
  kind: query
  command: "0xAA 0x12 <id> 0x00 <sum>"

- id: volume_set
  label: Volume (Set)
  kind: action
  command: "0xAA 0x12 <id> 0x01 <volume> <sum>"
  params:
    - name: volume
      type: integer
      description: "0..100"

- id: mute_get
  label: Mute (Get)
  kind: query
  command: "0xAA 0x13 <id> 0x00 <sum>"

- id: mute_off
  label: Mute Off
  kind: action
  command: "0xAA 0x13 <id> 0x01 0x00 <sum>"

- id: mute_on
  label: Mute On
  kind: action
  command: "0xAA 0x13 <id> 0x01 0x01 <sum>"

- id: input_source_get
  label: Input Source (Get)
  kind: query
  command: "0xAA 0x14 <id> 0x00 <sum>"

- id: input_source_set
  label: Input Source (Set)
  kind: action
  command: "0xAA 0x14 <id> 0x01 <input> <sum>"
  params:
    - name: input
      type: integer
      description: "0x04 S-Video, 0x08 Component, 0x0C AV1, 0x0D AV2, 0x0E SCART1, 0x18 DVI, 0x14 PC, 0x1E BNC, 0x1F DVI_VIDEO, 0x20 Magicinfo, 0x21 HDMI1, 0x22 HDMI1_PC, 0x23 HDMI2, 0x24 HDMI2_PC, 0x25 DisplayPort1, 0x26 DisplayPort2, 0x27 DisplayPort3, 0x31 HDMI3, 0x32 HDMI3_PC, 0x33 HDMI4, 0x34 HDMI4_PC, 0x40 TV(DTV), 0x50 Plug In Module, 0x55 HDBaseT, 0x56 OCM, 0x60 Media/MagicInfo S, 0x61 WiDi, 0x62 Internal/USB, 0x63 URL Launcher, 0x64 IWB, 0x65 Web Browser, 0x66 Remote Workspace"

- id: picture_size_get
  label: Picture Size (Get)
  kind: query
  command: "0xAA 0x15 <id> 0x00 <sum>"

- id: picture_size_set
  label: Picture Size (Set)
  kind: action
  command: "0xAA 0x15 <id> 0x01 <aspect> <sum>"
  params:
    - name: aspect
      type: integer
      description: "PC Mode: 0x10 16:9, 0x18 4:3, 0x20 Original Ratio, 0x21 21:9, 0x22 Custom. Video Mode: 0x00 Auto/Wide, 0x01 16:9, 0x04 Zoom, 0x05 Zoom1, 0x06 Zoom2, 0x09 Just Scan, 0x0B 4:3, 0x0C Wide Fit, 0x0D Custom, 0x0E Smart View 1, 0x0F Smart View 2, 0x31 Wide Zoom, 0x32 21:9"

- id: direct_channel_dtv_get
  label: Direct Channel DTV (Get)
  kind: query
  command: "0xAA 0x17 <id> 0x00 <sum>"
  notes: "TV-source models only."

- id: direct_channel_dtv_set
  label: Direct Channel DTV (Set)
  kind: action
  command: "0xAA 0x17 <id> 0x08 <country> <atv_dtv> <aircable> <ch_num_high> <ch_num_low> <sel_minor> <minor_ch_high> <minor_ch_low> <sum>"
  params:
    - name: country
      type: integer
      description: "0 Korea, 1 USA, ..."
    - name: atv_dtv
      type: integer
      description: "0 Analog TV, 1 Digital TV"
    - name: aircable
      type: integer
      description: "0 general, 1 cabled"
    - name: ch_num_high
      type: integer
      description: "Channel number high byte"
    - name: ch_num_low
      type: integer
      description: "Channel number low byte"
    - name: sel_minor
      type: integer
      description: "0 not selected, 1 selected"
    - name: minor_ch_high
      type: integer
      description: "Minor channel high byte"
    - name: minor_ch_low
      type: integer
      description: "Minor channel low byte"

- id: screen_mode_get
  label: Screen Mode (Get)
  kind: query
  command: "0xAA 0x18 <id> 0x00 <sum>"

- id: screen_mode_set
  label: Screen Mode (Set)
  kind: action
  command: "0xAA 0x18 <id> 0x01 <scr_mode> <sum>"
  params:
    - name: scr_mode
      type: integer
      description: "0x01 16:9, 0x04 Zoom, 0x0B 4:3, 0x31 Wide Zoom"

- id: screen_size_get
  label: Screen Size (Get)
  kind: query
  command: "0xAA 0x19 <id> 0x00 <sum>"
  notes: "Returns screen size in inches (0..255)."

- id: outdoor_mode_set
  label: Outdoor Mode (Set)
  kind: action
  command: "0xAA 0x1A <id> 0x02 0x81 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "Outdoor mode toggle"

- id: outdoor_heatex_fan_speed_set
  label: Internal HeatEx Fan Speed (Set)
  kind: action
  command: "0xAA 0x1A <id> 0x02 0x82 <fan_speed> <sum>"
  params:
    - name: fan_speed
      type: integer
      description: "0..100"

- id: network_config_set
  label: Network Configuration (Set)
  kind: action
  command: "0xAA 0x1B <id> 0x11 0x82 <ip_b1> <ip_b2> <ip_b3> <ip_b4> <sn_b1> <sn_b2> <sn_b3> <sn_b4> <gw_b1> <gw_b2> <gw_b3> <gw_b4> <dns_b1> <dns_b2> <dns_b3> <dns_b4> <sum>"
  notes: "1st byte is MSB; e.g. 192.168.0.100 -> 1st=0xC0, 4th=0x64."

- id: network_ip_mode_set
  label: Network IP Mode (Set)
  kind: action
  command: "0xAA 0x1B <id> 0x02 0x85 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "0 Dynamic, 1 Static"

- id: network_access_point_set
  label: Network Access Point (Set)
  kind: action
  command: "0xAA 0x1B <id> <len> 0x8A <code/data...> <sum>"
  notes: "Code 0x00=SSID, 0x01=Password. Get not supported."

- id: weekly_restart_set
  label: Weekly Restart (Set)
  kind: action
  command: "0xAA 0x1B <id> 0x04 0xA2 <week_day> <hour> <min> <sum>"
  params:
    - name: week_day
      type: integer
      description: "Bitmask Mon..Sun, 1 = restart"
    - name: hour
      type: integer
      description: "0..23 (0xff = invalid)"
    - name: min
      type: integer
      description: "0..59 (0xff = invalid)"

- id: check_software_version_get
  label: Check Software Version (Get)
  kind: query
  command: "0xAA 0x1B <id> 0x01 0xA4 <sum>"

- id: magicinfo_channel_set
  label: MagicInfo Channel (Set)
  kind: action
  command: "0xAA 0x1C <id> 0x03 0x81 <direct_ch_high> <direct_ch_low> <sum>"

- id: magicinfo_server_set
  label: MagicInfo Server URL (Set)
  kind: action
  command: "0xAA 0x1C <id> <len> 0x82 <url_string_bytes> <sum>"
  notes: "ASCII URL like http://10.88.8.73:7001, max 252 bytes."

- id: magicinfo_orientation_set
  label: MagicInfo Content Orientation (Set)
  kind: action
  command: "0xAA 0x1C <id> 0x02 0x83 <orientation> <sum>"

- id: mdc_connection_type_get
  label: MDC Connection Type (Get)
  kind: query
  command: "0xAA 0x1D <id> 0x00 <sum>"

- id: mdc_connection_type_set
  label: MDC Connection Type (Set)
  kind: action
  command: "0xAA 0x1D <id> 0x01 <type> <sum>"
  params:
    - name: type
      type: integer
      description: "0 RS232C MDC, 1 RJ45 MDC"

- id: still_get
  label: Still (Get)
  kind: query
  command: "0xAA 0x1F <id> 0x00 <sum>"

- id: still_set
  label: Still (Set)
  kind: action
  command: "0xAA 0x1F <id> 0x01 <still> <sum>"
  params:
    - name: still
      type: integer
      description: "0 Off, 1 On"

- id: led_picture_size_set
  label: LED Picture Size (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x01 <size> <sum>"
  params:
    - name: size
      type: integer
      description: "0 Original, 1 Custom"

- id: picture_size_custom_fit_set
  label: Picture Size Custom Fit (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x05 0x02 <width_hi> <width_lo> <height_hi> <height_lo> <sum>"

- id: hdr_inverse_tone_mapping_set
  label: HDR Inverse Tone Mapping (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x03 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 On"

- id: hdr_dynamic_peaking_set
  label: HDR Dynamic Peaking (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x04 <val> <sum>"

- id: hdr_color_mapping_set
  label: HDR Color Mapping (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x05 <val> <sum>"

- id: picture_size_fit_to_screen_set
  label: Picture Size Fit To Screen (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x06 <val> <sum>"

- id: hdmi_uhd_color_set
  label: HDMI UHD Color (Set)
  kind: action
  command: "0xAA 0x21 <id> <len> 0x07 <source1> <val1> ... <sourceN> <valN> <sum>"
  notes: "Val 0x00 Off, 0x01 On. Change triggers device reboot."

- id: fhd_uhd_out_set
  label: FHD/UHD Out (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x08 <output> <sum>"
  params:
    - name: output
      type: integer
      description: "0 FHD, 1 UHD. Change triggers reboot."

- id: live_mode_set
  label: Live Mode (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x09 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "0 Normal, 1 Live. Change triggers reboot."

- id: hdr_dynamic_range_extension_set
  label: HDR Dynamic Range Extension (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x0A <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 Low, 2 Medium, 3 High. Change triggers reboot."

- id: screen_position_set
  label: Screen Position (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x05 0x0B <pos_x_hi> <pos_x_lo> <pos_y_hi> <pos_y_lo> <sum>"

- id: hdr_multilink_set
  label: HDR MultiLink (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x04 0x0C <multilink> <total_dev> <dev_id> <sum>"
  params:
    - name: multilink
      type: integer
      description: "0 Off, 1 On"
    - name: total_dev
      type: integer
      description: "Total device num"
    - name: dev_id
      type: integer
      description: "Device ID under multi link HDR"

- id: color_enhancement_set
  label: Color Enhancement (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x50 <val> <sum>"

- id: dynamic_backlight_set
  label: Dynamic Backlight (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x51 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 On(Low), 2 Standard, 3 High"

- id: fit_to_screen_set
  label: Fit To Screen (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x52 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0x02 Auto"

- id: uniformity_set
  label: Uniformity (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x53 <val> <sum>"
  notes: "Change triggers reboot."

- id: gamma_mode_set
  label: Gamma Mode (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x54 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "0 HLG, 1 ST.2084, 2 BT.1886, 3 S Curve"

- id: black_equalizer_set
  label: Black Equalizer (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x55 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 Low, 2 High"

- id: hdr_plus_set
  label: HDR+ (Set)
  kind: action
  command: "0xAA 0x21 <id> 0x02 0x56 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 On"

- id: contrast_get
  label: Contrast (Get)
  kind: query
  command: "0xAA 0x24 <id> 0x00 <sum>"

- id: contrast_set
  label: Contrast (Set)
  kind: action
  command: "0xAA 0x24 <id> 0x01 <contrast> <sum>"
  params:
    - name: contrast
      type: integer
      description: "0..100"

- id: brightness_get
  label: Brightness (Get)
  kind: query
  command: "0xAA 0x25 <id> 0x00 <sum>"

- id: brightness_set
  label: Brightness (Set)
  kind: action
  command: "0xAA 0x25 <id> 0x01 <brightness> <sum>"
  params:
    - name: brightness
      type: integer
      description: "0..100"

- id: sharpness_get
  label: Sharpness (Get)
  kind: query
  command: "0xAA 0x26 <id> 0x00 <sum>"

- id: sharpness_set
  label: Sharpness (Set)
  kind: action
  command: "0xAA 0x26 <id> 0x01 <sharpness> <sum>"
  params:
    - name: sharpness
      type: integer
      description: "0..100"

- id: color_get
  label: Color (Get)
  kind: query
  command: "0xAA 0x27 <id> 0x00 <sum>"

- id: color_set
  label: Color (Set)
  kind: action
  command: "0xAA 0x27 <id> 0x01 <color> <sum>"
  params:
    - name: color
      type: integer
      description: "0..100"

- id: tint_set
  label: Tint (Set)
  kind: action
  command: "0xAA 0x28 <id> 0x01 <tint> <sum>"
  params:
    - name: tint
      type: integer
      description: "0..100 in 50 steps (0,2,4..100)"

- id: coarse_set
  label: Coarse (Set, PC source, videowall on)
  kind: action
  command: "0xAA 0x2F <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Decrease, 1 Increase"

- id: fine_set
  label: Fine (Set, PC source, videowall on)
  kind: action
  command: "0xAA 0x30 <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Decrease, 1 Increase"

- id: h_position_set
  label: H-Position (Set, PC/BNC, no videowall/zoom)
  kind: action
  command: "0xAA 0x31 <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Move Left, 1 Move Right"

- id: v_position_set
  label: V-Position (Set, PC/BNC, no videowall/zoom)
  kind: action
  command: "0xAA 0x32 <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Move Up, 1 Move Down"

- id: auto_power_set
  label: Auto Power (Set)
  kind: action
  command: "0xAA 0x33 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Auto Power Off, 1 Auto Power On"

- id: clear_menu
  label: Clear Menu (Action)
  kind: action
  command: "0xAA 0x34 <id> 0x01 0x00 <sum>"
  notes: "Get not supported. Data byte always 0x00."

- id: remote_control_set
  label: Remote Control Enable/Disable (Set)
  kind: action
  command: "0xAA 0x36 <id> 0x01 <rmc> <sum>"
  params:
    - name: rmc
      type: integer
      description: "0 Remocon Disable, 1 Remocon Enable"

- id: rgb_contrast_get
  label: RGB Contrast (Get, PC/BNC/DVI only)
  kind: query
  command: "0xAA 0x37 <id> 0x00 <sum>"

- id: rgb_contrast_set
  label: RGB Contrast (Set)
  kind: action
  command: "0xAA 0x37 <id> 0x01 <contrast> <sum>"
  params:
    - name: contrast
      type: integer
      description: "0..100"

- id: rgb_brightness_get
  label: RGB Brightness (Get, PC/BNC/DVI only)
  kind: query
  command: "0xAA 0x38 <id> 0x00 <sum>"

- id: rgb_brightness_set
  label: RGB Brightness (Set)
  kind: action
  command: "0xAA 0x38 <id> 0x01 <brightness> <sum>"
  params:
    - name: brightness
      type: integer
      description: "0..100"

- id: pip_on_off_set
  label: PIP On/Off (Set)
  kind: action
  command: "0xAA 0x3C <id> 0x01 <pip> <sum>"
  params:
    - name: pip
      type: integer
      description: "0 Off, 1 On"

- id: auto_adjustment
  label: Auto Adjustment (Trigger)
  kind: action
  command: "0xAA 0x3D <id> 0x01 0x00 <sum>"
  notes: "PC(D-Sub)/BNC only; no-op with videowall or zoom."

- id: color_tone_get
  label: Color Tone (Get)
  kind: query
  command: "0xAA 0x3E <id> 0x00 <sum>"

- id: color_tone_set
  label: Color Tone (Set)
  kind: action
  command: "0xAA 0x3E <id> 0x01 <tone> <sum>"
  params:
    - name: tone
      type: integer
      description: "0 Cool 2, 1 Cool 1, 2 Normal/Standard, 3 Warm 1, 4 Warm 2, 5 Natural, 0x50 Off"

- id: color_temperature_get
  label: Color Temperature (Get)
  kind: query
  command: "0xAA 0x3F <id> 0x00 <sum>"

- id: color_temperature_set
  label: Color Temperature (Set)
  kind: action
  command: "0xAA 0x3F <id> 0x01 <c_temp> <sum>"
  params:
    - name: c_temp
      type: integer
      description: "0x00..0x0A = 5000K..15000K; 0xFD=2800K, 0xFE=3000K, 0xFF=4000K. Extended values 28..160 in 0x1C..0xA0 for 2800K..16000K."

- id: pip_source_set
  label: PIP Source (Set)
  kind: action
  command: "0xAA 0x40 <id> 0x01 <source> <sum>"
  params:
    - name: source
      type: integer
      description: "Input source code (see 0x14)"

- id: pip_size_set
  label: PIP Size (Set)
  kind: action
  command: "0xAA 0x42 <id> 0x01 <p_size> <sum>"
  params:
    - name: p_size
      type: integer
      description: "0x00 Off, 0x04 Double 1, 0x05 Double 2, 0x06 Medium, 0x07 Large, 0x08 Small, 0x09 Double 3 (POP), 0x10 Custom"

- id: pip_locate_set
  label: PIP Locate (Set)
  kind: action
  command: "0xAA 0x43 <id> 0x01 <p_locate> <sum>"
  params:
    - name: p_locate
      type: integer
      description: "0x01 Upper Left, 0x02 Upper Right, 0x03 Lower Right, 0x04 Lower Left"

- id: fan_speed_set
  label: Fan Speed (Set)
  kind: action
  command: "0xAA 0x44 <id> 0x01 <speed> <sum>"
  params:
    - name: speed
      type: integer
      description: "0..100. Setting switches Fan Control to Manual."

- id: user_auto_color_set
  label: User Auto Color (Set)
  kind: action
  command: "0xAA 0x45 <id> 0x01 <cmd> <sum>"
  params:
    - name: cmd
      type: integer
      description: "0 Reset, 1 Auto Color. PC(D-Sub) only."

- id: sound_select_47_set
  label: Sound Select (0x47 Set, PIP audio)
  kind: action
  command: "0xAA 0x47 <id> 0x01 <s_select> <sum>"
  params:
    - name: s_select
      type: integer
      description: "0 Sub, 1 Main"

- id: auto_volume_set
  label: Auto Volume (Set)
  kind: action
  command: "0xAA 0x48 <id> 0x01 <a_vol> <sum>"
  params:
    - name: a_vol
      type: integer
      description: "0 Off, 1 Normal(On), 2 Night"

- id: standby_set
  label: Standby/DPMS (Set)
  kind: action
  command: "0xAA 0x4A <id> 0x01 <standby> <sum>"
  params:
    - name: standby
      type: integer
      description: "0 Off, 1 On, 2 Auto"

- id: video_picture_position_size_set
  label: Video Picture Position & Size (Set)
  kind: action
  command: "0xAA 0x4B <id> 0x02 <type_cmd> <direction_cmd> <sum>"
  params:
    - name: type_cmd
      type: integer
      description: "0 Reset, 1 Position, 2 Size, 3 Reserved"
    - name: direction_cmd
      type: integer
      description: "Position: 0 Down, 1 Up, 2 Left, 3 Right. Size: 0 V Scale Down, 1 V Scale Up, 2 H Scale Down, 3 H Scale Up."

- id: pixel_shift_set
  label: Pixel Shift (Set)
  kind: action
  command: "0xAA 0x4C <id> 0x04 <shift> <h_dot> <v_line> <s_time> <sum>"
  params:
    - name: shift
      type: integer
      description: "0 Off, 1 On"
    - name: h_dot
      type: integer
      description: "0..4"
    - name: v_line
      type: integer
      description: "0..4"
    - name: s_time
      type: integer
      description: "1..4"

- id: light_sensor_get
  label: Light Sensor Lux (Get)
  kind: query
  command: "0xAA 0x50 <id> 0x01 0x00 <sum>"

- id: heatex_temperature_get
  label: HeatEx Temperature (Get)
  kind: query
  command: "0xAA 0x50 <id> 0x01 0x01 <sum>"
  notes: "Returns -60..125 deg C."

- id: led_plate_temperature_get
  label: LED Plate Temperature (Get)
  kind: query
  command: "0xAA 0x50 <id> 0x01 0x02 <sum>"

- id: final_duty_get
  label: Final Duty (Get)
  kind: query
  command: "0xAA 0x50 <id> 0x01 0x03 <sum>"
  notes: "Returns 0..1023."

- id: eq_100hz_get
  label: EQ 100Hz (Get)
  kind: query
  command: "0xAA 0x51 <id> 0x00 <sum>"

- id: eq_100hz_set
  label: EQ 100Hz (Set)
  kind: action
  command: "0xAA 0x51 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20 (menu -10..0..10 maps to 0..0x0A..0x14)"

- id: eq_300hz_get
  label: EQ 300Hz (Get)
  kind: query
  command: "0xAA 0x52 <id> 0x00 <sum>"

- id: eq_300hz_set
  label: EQ 300Hz (Set)
  kind: action
  command: "0xAA 0x52 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20"

- id: eq_1khz_get
  label: EQ 1kHz (Get)
  kind: query
  command: "0xAA 0x53 <id> 0x00 <sum>"

- id: eq_1khz_set
  label: EQ 1kHz (Set)
  kind: action
  command: "0xAA 0x53 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20"

- id: eq_3khz_get
  label: EQ 3kHz (Get)
  kind: query
  command: "0xAA 0x54 <id> 0x00 <sum>"

- id: eq_3khz_set
  label: EQ 3kHz (Set)
  kind: action
  command: "0xAA 0x54 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20"

- id: eq_10khz_get
  label: EQ 10kHz (Get)
  kind: query
  command: "0xAA 0x55 <id> 0x00 <sum>"

- id: eq_10khz_set
  label: EQ 10kHz (Set)
  kind: action
  command: "0xAA 0x55 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20"

- id: energy_saving_lfd_set
  label: Energy Saving LFD (Set)
  kind: action
  command: "0xAA 0x56 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 On"

- id: auto_lamp_control_set
  label: Auto Lamp Control (Set)
  kind: action
  command: "0xAA 0x57 <id> 0x08 <lmax_h> <lmax_m> <lmax_ap> <lmax_value> <lmin_h> <lmin_m> <lmin_ap> <lmin_value> <sum>"
  params:
    - name: lmax_h
      type: integer
      description: "1..12"
    - name: lmax_m
      type: integer
      description: "0..59"
    - name: lmax_ap
      type: integer
      description: "1=AM, 0=PM"
    - name: lmax_value
      type: integer
      description: "0..100"
    - name: lmin_h
      type: integer
      description: "1..12"
    - name: lmin_m
      type: integer
      description: "0..59"
    - name: lmin_ap
      type: integer
      description: "1=AM, 0=PM"
    - name: lmin_value
      type: integer
      description: "0..100 (0xFF = OFF)"

- id: manual_lamp_control_get
  label: Manual Lamp Control (Get)
  kind: query
  command: "0xAA 0x58 <id> 0x00 <sum>"

- id: manual_lamp_control_set
  label: Manual Lamp Control (Set)
  kind: action
  command: "0xAA 0x58 <id> 0x01 <lamp_value> <sum>"
  params:
    - name: lamp_value
      type: integer
      description: "0..100"

- id: safety_screen_run_set
  label: Safety Screen Run (Set)
  kind: action
  command: "0xAA 0x59 <id> 0x01 <safety_screen_type> <sum>"
  params:
    - name: safety_screen_type
      type: integer
      description: "0x00 Off, 0x01 Signal Pattern, 0x02 All White, 0x03 Scroll, 0x04 Bar, 0x06 Eraser, 0x07 Pixel, 0x10 Rolling Bar, 0x11 Fading Screen"

- id: inverse_set
  label: Inverse / Panel Control (Set)
  kind: action
  command: "0xAA 0x5A <id> 0x01 <inverse> <sum>"
  params:
    - name: inverse
      type: integer
      description: "0 Off, 1 On"

- id: safety_screen_control_set
  label: Safety Screen Timer (Set)
  kind: action
  command: "0xAA 0x5B <id> <len> <type> <fields...> <sum>"
  notes: "Type 0x00..0x11 (see source table 2.1.5B). Repeat mode length 3, Interval mode length 7."

- id: video_wall_mode_set
  label: Video Wall Mode (Set)
  kind: action
  command: "0xAA 0x5C <id> 0x01 <wall_mode> <sum>"
  params:
    - name: wall_mode
      type: integer
      description: "0 Natural, 1 Full"

- id: safety_lock_set
  label: Safety Lock (Set)
  kind: action
  command: "0xAA 0x5D <id> 0x01 <lock> <sum>"
  params:
    - name: lock
      type: integer
      description: "0 Off, 1 On"

- id: panel_lock_set
  label: Panel Lock (Set)
  kind: action
  command: "0xAA 0x5F <id> 0x01 <button_lock> <sum>"
  params:
    - name: button_lock
      type: integer
      description: "0 Unlock, 1 Lock"

- id: channel_up_down
  label: Channel Up/Down (Set)
  kind: action
  command: "0xAA 0x61 <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Up, 1 Down. TV-source models only."

- id: volume_up_down
  label: Volume Up/Down (Set)
  kind: action
  command: "0xAA 0x62 <id> 0x01 <dir> <sum>"
  params:
    - name: dir
      type: integer
      description: "0 Up, 1 Down"

- id: ticker_set
  label: Ticker (Set)
  kind: action
  command: "0xAA 0x63 <id> <len> <ticker_on_off> <start_h> <start_m> <start_ampm> <end_h> <end_m> <end_ampm> <pos_h> <pos_v> <motion_on_off> <motion_dir> <motion_speed> <font_size> <fg_color> <bg_color> <fg_opacity> <bg_opacity> <msg...> <sum>"
  notes: "Multi-param; see source 2.1.63 for full field table."

- id: sound_select_65_set
  label: Sound Select (0x65 Set, PIP audio)
  kind: action
  command: "0xAA 0x65 <id> 0x01 <s_select> <sum>"
  params:
    - name: s_select
      type: integer
      description: "0 Sub, 1 Main"

- id: pc_module_detect_get
  label: PC Module Detect (Get)
  kind: query
  command: "0xAA 0x66 <id> 0x00 <sum>"
  notes: "Returns 0 Not Detected, 1 MagicInfo, 2 Plug In Module."

- id: device_name_set
  label: Device Name (Set)
  kind: action
  command: "0xAA 0x67 <id> <len> <name_bytes> <sum>"
  notes: "String data, max 15 chars."

- id: speaker_select_set
  label: Speaker Select (Set)
  kind: action
  command: "0xAA 0x68 <id> 0x01 <s_select> <sum>"
  params:
    - name: s_select
      type: integer
      description: "0 Internal, 1 External"

- id: osd_set
  label: OSD On/Off (Set)
  kind: action
  command: "0xAA 0x70 <id> 0x01 <osd> <sum>"
  params:
    - name: osd
      type: integer
      description: "0 OSD Off, 1 OSD On"

- id: pmode_set
  label: P.Mode (Picture Mode, Set)
  kind: action
  command: "0xAA 0x71 <id> 0x01 <pmode> <sum>"
  params:
    - name: pmode
      type: integer
      description: "Source-based: 0x00 Dynamic, 0x01 Standard, 0x02 Movie, 0x03 Custom, 0x04 Natural, 0x05 Calibration, 0x50 Off (AV family); 0x10 Entertain, 0x11 Internet, 0x12 Text, 0x13 Custom, 0x14 Advertisement, 0x15 Information, 0x16 Calibration, 0x50 Off (PC family). Common: 0x00 Dynamic, 0x01 Live, 0x02 Movie, 0x04 Natural, 0x16 Calibration, 0x20 Shop&Mall-Video, 0x21 Shop&Mall-Text, 0x22 Office&School-Video, 0x23 Office&School-Text, 0x24 Terminal&Station-Video, 0x25 Terminal&Station-Text, 0x26 Videowall-Video, 0x27 Videowall-Text, 0x30 HDR+ (get only), 0x90 Reserved."

- id: smode_set
  label: S.Mode (Sound Mode, Set)
  kind: action
  command: "0xAA 0x72 <id> 0x01 <smode> <sum>"
  params:
    - name: smode
      type: integer
      description: "0 Standard, 1 Music, 2 Movie, 3 Speech, 4 Custom, 5 Amplify, 6 Optimized"

- id: digital_nr_set
  label: Digital NR (Set)
  kind: action
  command: "0xAA 0x73 <id> 0x01 <nr_mode> <sum>"
  params:
    - name: nr_mode
      type: integer
      description: "0 Off, 1 Low(On), 2 Medium, 3 High, 4 Auto, 5 Auto Visualization"

- id: pc_color_tone_set
  label: PC Color Tone (Set)
  kind: action
  command: "0xAA 0x75 <id> 0x01 <color_tone> <sum>"
  params:
    - name: color_tone
      type: integer
      description: "0 Custom, 1 Cool, 2 Normal, 3 Warm, 5 Natural, 0x50 Off"

- id: auto_auto_adjustment_set
  label: Auto Auto Adjustment Enable (Set)
  kind: action
  command: "0xAA 0x76 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Disable, 1 Enable"

- id: all_keys_lock_set
  label: All Keys Lock (Set)
  kind: action
  command: "0xAA 0x77 <id> 0x01 <akl> <sum>"
  params:
    - name: akl
      type: integer
      description: "0 Off, 1 On"

- id: srs_tsxt_set
  label: SRS TS XT (Set)
  kind: action
  command: "0xAA 0x78 <id> 0x01 <srs> <sum>"
  params:
    - name: srs
      type: integer
      description: "0 Off, 1 On"

- id: film_mode_set
  label: Film Mode (Set)
  kind: action
  command: "0xAA 0x79 <id> 0x01 <fmode> <sum>"
  params:
    - name: fmode
      type: integer
      description: "0 Off, 1 Auto1, 2 Auto2, 3 Cinema Smooth"

- id: panel_on_time_get
  label: Panel On Time (Get)
  kind: query
  command: "0xAA 0x83 <id> 0x00 <sum>"
  notes: "Returns H/L bytes; increments every 10 mins."

- id: video_wall_on_set
  label: Video Wall On (Set)
  kind: action
  command: "0xAA 0x84 <id> 0x01 <v_wall_on> <sum>"
  params:
    - name: v_wall_on
      type: integer
      description: "0 Off, 1 On"

- id: temperature_control_set
  label: Temperature Control Threshold (Set)
  kind: action
  command: "0xAA 0x85 <id> 0x01 <temperature> <sum>"
  params:
    - name: temperature
      type: integer
      description: "75..124 deg C"

- id: brightness_sensor_set
  label: Brightness Sensor (Eco Sensor, Set)
  kind: action
  command: "0xAA 0x86 <id> 0x01 <br_sensor> <sum>"
  params:
    - name: br_sensor
      type: integer
      description: "0 Off, 1 On"

- id: dynamic_contrast_set
  label: Dynamic Contrast (Set)
  kind: action
  command: "0xAA 0x87 <id> 0x01 <dy_cont> <sum>"
  params:
    - name: dy_cont
      type: integer
      description: "0 Off, 1 Low(ON), 2 Medium, 3 High"

- id: video_wall_user_control_set
  label: Video Wall User Control (Set)
  kind: action
  command: "0xAA 0x89 <id> 0x02 <wall_div> <wall_sno> <sum>"
  params:
    - name: wall_div
      type: integer
      description: "H x V divider code (see source table; ranges 0x00..0xFF for up to 15x15)"
    - name: wall_sno
      type: integer
      description: "Device serial number within wall (5x5: 1..25; 10x10: 1..100; 15x15: 1..225)"

- id: model_name_get
  label: Model Name (Get)
  kind: query
  command: "0xAA 0x8A <id> 0x00 <sum>"
  notes: "Returns ASCII model name, length-prefixed."

- id: video_wall_direct_user_control_set
  label: Video Wall Direct User Control (Set)
  kind: action
  command: "0xAA 0x8B <id> 0x05 <v_wall_on> <wall_mode> <wall_div> <wall_sno> <input> <sum>"
  notes: "Composite of 0x84, 0x5C, 0x89, 0x14 fields."

- id: frame_alignment_set
  label: Frame Alignment (Set)
  kind: action
  command: "0xAA 0x8C <id> 0x02 0x81 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "0 Off, 1 On, 2 Auto"

- id: fan_control_set
  label: Fan Control Mode (Set)
  kind: action
  command: "0xAA 0x8F <id> 0x01 <fan> <sum>"
  params:
    - name: fan
      type: integer
      description: "0 Manual, 1 Auto, 2 Off, 3 On"

- id: game_mode_set
  label: Game Mode (Set)
  kind: action
  command: "0xAA 0x90 <id> 0x01 <game_mode> <sum>"
  params:
    - name: game_mode
      type: integer
      description: "0 Off, 1 On"

- id: energy_saving_set
  label: Energy Saving (Set)
  kind: action
  command: "0xAA 0x92 <id> 0x01 <e_sav> <sum>"
  params:
    - name: e_sav
      type: integer
      description: "0 Off, 1 Low(ON), 2 Medium, 3 High, 4 Picture Off"

- id: hdmi_black_level_set
  label: HDMI Black Level (Set)
  kind: action
  command: "0xAA 0x94 <id> 0x01 <hdmi_blk> <sum>"
  params:
    - name: hdmi_blk
      type: integer
      description: "0 Normal, 1 Low, 2 Auto"

- id: black_adjust_set
  label: Black Adjust (Set)
  kind: action
  command: "0xAA 0x95 <id> 0x01 <b_adj> <sum>"
  params:
    - name: b_adj
      type: integer
      description: "0 Off, 1 Low/Dark, 2 Medium/Darker, 3 High/Darkest"

- id: gamma_set
  label: Gamma (Set)
  kind: action
  command: "0xAA 0x96 <id> 0x01 <gamma> <sum>"
  params:
    - name: gamma
      type: integer
      description: "0 Natural (0), 1..5 Mode1..Mode5, 0x11..0x15 = -1..-5, 0x20 Custom"

- id: edge_enhancement_set
  label: Edge Enhancement (Set)
  kind: action
  command: "0xAA 0x9C <id> 0x01 <edge> <sum>"
  params:
    - name: edge
      type: integer
      description: "0 Off, 1 On"

- id: color_space_set
  label: Color Space (Set)
  kind: action
  command: "0xAA 0x9D <id> 0x01 <color_space> <sum>"
  params:
    - name: color_space
      type: integer
      description: "0 Auto, 1 Native, 2 Custom, 3 DCI-P3, 4 Adobe RGB, 5 BT-709"

- id: xvycc_set
  label: xvYCC (Set)
  kind: action
  command: "0xAA 0x9E <id> 0x01 <xvycc> <sum>"
  params:
    - name: xvycc
      type: integer
      description: "0 Off, 1 On"

- id: reset_control_set
  label: Reset (Set)
  kind: action
  command: "0xAA 0x9F <id> 0x01 <rst> <sum>"
  params:
    - name: rst
      type: integer
      description: "0 Picture Reset, 1 Sound Reset, 2 Setup (System) Reset, 3 Reset All, 4 Screen Display Reset"

- id: ambient_brightness_mode_set
  label: Ambient Brightness Mode (Set)
  kind: action
  command: "0xAA 0xA1 <id> 0x03 <ab_mode> <valid_lamp> <lamp_value> <sum>"
  params:
    - name: ab_mode
      type: integer
      description: "0 Off, 1 On"
    - name: valid_lamp
      type: integer
      description: "0 Invalid (Don't apply), 1 Valid (Apply)"
    - name: lamp_value
      type: integer
      description: "0..100"

- id: osd_display_type_set
  label: OSD Display Type On/Off (Set)
  kind: action
  command: "0xAA 0xA3 <id> 0x02 <osd_type> <osd_on_off> <sum>"
  params:
    - name: osd_type
      type: integer
      description: "0 Source OSD, 1 Not Optimum Mode OSD, 2 No Signal OSD, 3 MDC OSD, 4 Schedule Channel Info"
    - name: osd_on_off
      type: integer
      description: "0 Off, 1 On"

- id: timer1_control_set
  label: Timer 1 Control (Set)
  kind: action
  command: "0xAA 0xA4 <id> <0x0D|0x0F> <on_h> <on_m> <on_ampm> <on_act> [off_h off_m off_ampm off_act repeat_on manual_wd_on repeat_off manual_wd_off] <sum>"
  notes: "Length 0x0D for on-only; 0x0F for integrated on+off+repeat."

- id: timer2_control_set
  label: Timer 2 Control (Set)
  kind: action
  command: "0xAA 0xA5 <id> <0x0D|0x0F> <fields...> <sum>"

- id: timer3_control_set
  label: Timer 3 Control (Set)
  kind: action
  command: "0xAA 0xA6 <id> <0x0D|0x0F> <fields...> <sum>"

- id: clock_control_a7_set
  label: Clock Control (Set, 0xA7)
  kind: action
  command: "0xAA 0xA7 <id> 0x07 <day> <h_time> <m_time> <month> <year1> <year2> <ap_time> <sum>"
  notes: "Year 2010 example: 0x07DA -> year1=0x07, year2=0xDA."

- id: holiday_add_delete_set
  label: Holiday Add/Delete (Set)
  kind: action
  command: "0xAA 0xA8 <id> 0x05 <management> <month1> <day1> <month2> <day2> <sum>"
  params:
    - name: management
      type: integer
      description: "0 Add Holiday, 1 Delete Holiday, 2 Delete All"
    - name: month1
      type: integer
      description: "1..12"
    - name: day1
      type: integer
      description: "1..31"
    - name: month2
      type: integer
      description: "1..12"
    - name: day2
      type: integer
      description: "1..31"

- id: holiday_get_total
  label: Holiday Get Total Count
  kind: query
  command: "0xAA 0xA9 <id> 0x00 <sum>"
  notes: "Returns total number of holidays (others 0)."

- id: holiday_get_index
  label: Holiday Get by Index
  kind: query
  command: "0xAA 0xA9 <id> 0x01 <index> <sum>"
  notes: "Returns month1/day1/month2/day2 or 0xFF if unset."

- id: timer4_control_set
  label: Timer 4 Control (Set)
  kind: action
  command: "0xAA 0xAB <id> <0x0D|0x0F> <fields...> <sum>"

- id: timer5_control_set
  label: Timer 5 Control (Set)
  kind: action
  command: "0xAA 0xAC <id> <0x0D|0x0F> <fields...> <sum>"

- id: timer6_control_set
  label: Timer 6 Control (Set)
  kind: action
  command: "0xAA 0xAD <id> <0x0D|0x0F> <fields...> <sum>"

- id: timer7_control_set
  label: Timer 7 Control (Set)
  kind: action
  command: "0xAA 0xAE <id> <0x0D|0x0F> <fields...> <sum>"

- id: edit_name_set
  label: Edit Name (Set)
  kind: action
  command: "0xAA 0xAF <id> 0x01 <ename> <sum>"
  params:
    - name: ename
      type: integer
      description: "0 NONE, 1 VCR, 2 DVD, 3 Cable STB, 4 Satelite STB, 5 PVR STB, 6 AV Receiver, 7 Game, 8 Camcorder, 9 PC, 0x0A DVI PC, 0x0B DVI Devices, 0x0C TV, 0x0D IPTV, 0x0E Blu-ray, 0x0F HD DVD, 0x10 DMA, 0x11 DVD Receiver, 0x12 HD STB, 0x13 DVD Combo, 0x14 DHR"

- id: virtual_remote_send
  label: Virtual Remote (Send Key Event)
  kind: action
  command: "0xAA 0xB0 <id> 0x01 <key_code> <sum>"
  params:
    - name: key_code
      type: integer
      description: "0x01 SOURCE, 0x02 POWER, 0x04 1, 0x05 2, 0x06 3, 0x07 VOL_UP, 0x08 4, 0x09 5, 0x0A 6, 0x0B VOL_DOWN, 0x0C 7, 0x0D 8, 0x0E 9, 0x0F MUTE, 0x10 CH_DOWN, 0x11 0, 0x12 CH_UP, 0x14 GREEN, 0x15 YELLOW, 0x16 CYAN, 0x1A MENU, 0x1F DISPLAY/INFO, 0x23 DIGIT, 0x24 PIP_TV_VIDEO/BLANK, 0x2D EXIT, 0x30 Magicinfo, 0x45 REW, 0x46 STOP, 0x47 PLAY, 0x48 FF, 0x4A PAUSE, 0x4B TOOLS, 0x58 RETURN, 0x5B MAGICINFO_LITE, 0x60 CURSOR_UP, 0x61 CURSOR_DOWN, 0x62 CURSOR_RIGHT, 0x65 CURSOR_LEFT, 0x68 ENTER, 0x6C RED, 0x77 LOCK, 0x79 CONTENT, 0x98 DISCRET_POWER_OFF, 0x9F 3D"

- id: display_port_daisy_chain_set
  label: DisplayPort Daisy Chain (Set)
  kind: action
  command: "0xAA 0xB1 <id> 0x01 <value> <sum>"
  params:
    - name: value
      type: integer
      description: "0 Clone, 1 Expand"

- id: three_four_screen_set
  label: 3/4 Screen Mode (Set)
  kind: action
  command: "0xAA 0xB2 <id> <len> <fields...> <sum>"
  notes: "Type 1 3-screen (len 0x08), Type 2 4-screen (len 0x0A), Type 3 4-screen without picture size (len 0x06). See source 2.1.B2."

- id: video_conference_sound_set
  label: Video Conference Sound Mode (Set)
  kind: action
  command: "0xAA 0xB3 <id> 0x01 <conf_sound> <sum>"
  params:
    - name: conf_sound
      type: integer
      description: "0 Off, 1 On"

- id: network_standby_set
  label: Network Standby (Set)
  kind: action
  command: "0xAA 0xB5 <id> 0x01 <network_standby> <sum>"
  params:
    - name: network_standby
      type: integer
      description: "0 Off, 1 On"

- id: dst_control_set
  label: DST Daylight Saving Time (Set)
  kind: action
  command: "0xAA 0xB6 <id> 0x0C <dst_on_off> <start_month> <start_week_info> <start_weekday_info> <start_time_h> <start_time_m> <end_month> <end_week_info> <end_weekday_info> <end_time_h> <end_time_m> <time_off_set> <sum>"
  params:
    - name: dst_on_off
      type: integer
      description: "Tunerless: 0 Off, 2 On. Tuner: 0 Off, 1 Auto, 2 Manual."
    - name: time_off_set
      type: integer
      description: "0 +1:00, 1 +2:00"

- id: custom_pip_set
  label: Custom PIP (Set)
  kind: action
  command: "0xAA 0xB7 <id> 0x08 <h_pos_hi> <h_pos_lo> <v_pos_hi> <v_pos_lo> <h_size_hi> <h_size_lo> <v_size_hi> <v_size_lo> <sum>"
  notes: "H/V Size: 512*288..1632*918 (H step 160, V step 90). H/V Position step 10."

- id: auto_id_setting_status_set
  label: Auto ID Setting Status (Set)
  kind: action
  command: "0xAA 0xB8 <id> 0x01 <status> <sum>"
  params:
    - name: status
      type: integer
      description: "0 START, 1 END"

- id: display_id_information_set
  label: Display ID Information (Set)
  kind: action
  command: "0xAA 0xB9 <id> 0x01 <id_display> <sum>"
  params:
    - name: id_display
      type: integer
      description: "0 Off, 1 On"

- id: clock_control_c5_set
  label: Clock Control (Set, 0xC5, seconds-field)
  kind: action
  command: "0xAA 0xC5 <id> 0x08 <day> <h_time> <m_time> <s_time> <month> <year1> <year2> <ap_time> <sum>"
  notes: "Devices after 13yr only."

- id: eco_auto_power_off_set
  label: Eco Auto Power Off (Set)
  kind: action
  command: "0xAA 0xC6 <id> 0x02 0x81 <auto_power_off> <sum>"
  params:
    - name: auto_power_off
      type: integer
      description: "0 Off, 1 4 Hour, 2 6 Hour, 3 8 Hour, 4 16 Hour"

- id: eco_brightness_limit_set
  label: Eco Brightness Limit (Set)
  kind: action
  command: "0xAA 0xC6 <id> 0x02 0x82 <brightness_limit> <sum>"

- id: play_via_mode_set
  label: Play Via Mode (Launcher, Set)
  kind: action
  command: "0xAA 0xC7 <id> 0x02 0x81 <play_via_mode> <sum>"
  params:
    - name: play_via_mode
      type: integer
      description: "0 MagicInfo, 1 URL Launcher, 2 MagicIWB"

- id: url_address_set
  label: URL Address (Set)
  kind: action
  command: "0xAA 0xC7 <id> <len> 0x82 <url_bytes> <sum>"
  notes: "ASCII URL, max 200 chars."

- id: menu_orientation_set
  label: Menu Orientation (Set)
  kind: action
  command: "0xAA 0xC8 <id> 0x02 0x81 <orientation_mode> <sum>"
  params:
    - name: orientation_mode
      type: integer
      description: "0 Landscape, 1 Portrait(270), 2 180, 3 90"

- id: source_content_orientation_set
  label: Source Content Orientation (Set)
  kind: action
  command: "0xAA 0xC8 <id> 0x02 0x82 <orientation_mode> <sum>"

- id: aspect_ratio_rotated_set
  label: Aspect Ratio Rotated (Set)
  kind: action
  command: "0xAA 0xC8 <id> 0x02 0x83 <aspect_ratio> <sum>"
  params:
    - name: aspect_ratio
      type: integer
      description: "0 Full Screen, 1 Original"

- id: pip_orientation_set
  label: PIP Orientation (Set)
  kind: action
  command: "0xAA 0xC8 <id> 0x02 0x84 <orientation_mode> <sum>"

- id: menu_size_set
  label: Menu Size (Set)
  kind: action
  command: "0xAA 0xC8 <id> 0x02 0x85 <menu_size> <sum>"
  params:
    - name: menu_size
      type: integer
      description: "0 Original, 1 Medium, 2 Small"

- id: hdmi_sound_set
  label: HDMI Sound (Set)
  kind: action
  command: "0xAA 0xC9 <id> 0x02 0x81 <hdmi_sound> <sum>"
  params:
    - name: hdmi_sound
      type: integer
      description: "0 HDMI Signal Sound, 1 Audio In Sound"

- id: eq_200hz_set
  label: EQ 200Hz (Set)
  kind: action
  command: "0xAA 0xC9 <id> 0x02 0x82 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0..20 (menu -10..10 maps to 0..0x14)"

- id: eq_500hz_set
  label: EQ 500Hz (Set)
  kind: action
  command: "0xAA 0xC9 <id> 0x02 0x83 <val> <sum>"

- id: eq_2khz_set
  label: EQ 2kHz (Set)
  kind: action
  command: "0xAA 0xC9 <id> 0x02 0x84 <val> <sum>"

- id: eq_5khz_set
  label: EQ 5kHz (Set)
  kind: action
  command: "0xAA 0xC9 <id> 0x02 0x85 <val> <sum>"

- id: sbox_mode_get
  label: SBOX Mode (Get)
  kind: query
  command: "0xAA 0xCA <id> 0x01 0x60 <sum>"
  notes: "Returns 0 Indoor, 1 Outdoor. Set not supported."

- id: dimming_mode_set
  label: Dimming Mode (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x61 <mode> <sum>"
  params:
    - name: mode
      type: integer
      description: "0 Auto, 1 Light Sensor, 2 Sun Rise/Sun Set, 3 Off"

- id: night_time_constant_brightness_set
  label: Night Time Constant Brightness (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x62 <mode> <sum>"

- id: brightness_change_period_set
  label: Brightness Change Period (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x63 <change_period> <sum>"
  params:
    - name: change_period
      type: integer
      description: "10..70 minutes. Location dimming mode only."

- id: light_sensor_effective_range_set
  label: Light Sensor Effective Range (Set)
  kind: action
  command: "0xAA 0xCA <id> <len> 0x64 <data_type> <data...> <sum>"
  params:
    - name: data_type
      type: integer
      description: "0 Minimum Effective Range, 1 Maximum Effective Range. Data in lux."

- id: brightness_output_range_set
  label: Brightness Output Range & Default Output (Set)
  kind: action
  command: "0xAA 0xCA <id> <len> 0x65 <data_type> <data...> <sum>"
  params:
    - name: data_type
      type: integer
      description: "0 Min Output Range, 1 Max Output Range, 2 Default Output. Data in percent."

- id: latitude_longitude_set
  label: Latitude/Longitude Info (Set)
  kind: action
  command: "0xAA 0xCA <id> <len> 0x66 <data_type1> <data1_len> <data1...> <sum>"
  params:
    - name: data_type1
      type: integer
      description: "0 Latitude, 1 Longitude. String data."

- id: cec_on_off_set
  label: CEC On/Off (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x70 <cec> <sum>"
  params:
    - name: cec
      type: integer
      description: "0 Off, 1 On"

- id: multi_device_grouping_set
  label: Multi Device Grouping (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x03 0x71 <group_mode> <role> <sum>"
  params:
    - name: group_mode
      type: integer
      description: "0 Off, 1 Group 1, 2 Group 2, ... up to N"
    - name: role
      type: integer
      description: "0 Sub, 1 Main"

- id: auto_source_switch_onoff_set
  label: Auto Source Switch On/Off (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x81 <auto_source_switch> <sum>"
  params:
    - name: auto_source_switch
      type: integer
      description: "0 Off, 1 On (Preset Input)"

- id: auto_source_switch_control_set
  label: Auto Source Switch Control (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x04 0x82 <primary_recovery> <primary_source> <secondary_source> <sum>"
  params:
    - name: primary_recovery
      type: integer
      description: "0 Off, 1 On"
    - name: primary_source
      type: integer
      description: "Input source code (see 0x14). 0x00 for All."
    - name: secondary_source
      type: integer
      description: "Input source code (see 0x14)."

- id: power_on_delay_set
  label: Power On Delay (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x83 <power_on_delay> <sum>"
  notes: "Range per device menu; units seconds."

- id: synced_power_on_set
  label: Synced Power On (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x84 <synced> <sum>"

- id: synced_power_off_set
  label: Synced Power Off (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x85 <synced> <sum>"

- id: power_button_set
  label: Power Button Mode (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x91 <power_button> <sum>"
  params:
    - name: power_button
      type: integer
      description: "0 Power On Only, 1 Power On/Off"

- id: touch_control_admin_lock_set
  label: Touch Control Admin Lock (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x92 <admin_lock> <sum>"

- id: dicom_mode_set
  label: DICOM Mode (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0x93 <dicom> <sum>"

- id: no_signal_power_off_set
  label: No Signal Power Off (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0xA1 <no_signal_power_off> <sum>"
  params:
    - name: no_signal_power_off
      type: integer
      description: "0 Off, 1 15min, 2 30min, 3 60min, 4 10min"

- id: eco_sensor_minimal_backlight_set
  label: Eco Sensor Minimal Backlight (Set)
  kind: action
  command: "0xAA 0xCA <id> 0x02 0xB0 <minimal_backlight> <sum>"

- id: led_info_get
  label: LED Information (Get)
  kind: query
  command: "0xAA 0xD0 <id> 0x01 0x78 <sum>"

- id: device_type_get
  label: LED Device Type (Get)
  kind: query
  command: "0xAA 0xD0 <id> 0x01 0x81 <sum>"
  notes: "Returns 0x01 SendBox, 0x02 Cabinet IS/IFH/IFH-D, 0x03 Cabinet IFJ H2in1, 0x04 Cabinet IWJ, 0x05 Cabinet IWR, 0x06 Cabinet IER, 0x07 WALL 2.0."

- id: input_source_info_get
  label: LED Input Source Info (Get)
  kind: query
  command: "0xAA 0xD0 <id> 0x01 0x82 <sum>"
  notes: "Returns source list bitmask, connection status, current source, resolution."

- id: product_information_get
  label: LED Product Information (Get)
  kind: query
  command: "0xAA 0xD0 <id> 0x01 0x83 <sum>"
  notes: "Returns pitch, resolution, phy size, aspect ratio, modules."

- id: auto_id_get
  label: LED Auto ID (Multi-param Get)
  kind: query
  command: "0xAA 0xD0 <id> 0x01 0xC3 <sum>"

- id: panel_on_off_set
  label: Panel On/Off (Set)
  kind: action
  command: "0xAA 0xF9 <id> 0x01 <val> <sum>"
  params:
    - name: val
      type: integer
      description: "0 Off, 1 On"

- id: auto_id_set
  label: Auto ID (Multi-param Set)
  kind: action
  command: "0xAA 0xFD <id> <len> <fields...> <sum>"

- id: white_balance_mode_set
  label: White Balance Mode (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0x62 <mode> <sum>"

- id: white_balance_red_gain_set
  label: White Balance Red Gain (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0x81 <val> <sum>"

- id: white_balance_green_gain_set
  label: White Balance Green Gain (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0x91 <val> <sum>"

- id: white_balance_blue_gain_set
  label: White Balance Blue Gain (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0xA1 <val> <sum>"

- id: white_balance_red_offset_set
  label: White Balance Red Offset (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0xB1 <val> <sum>"

- id: white_balance_green_offset_set
  label: White Balance Green Offset (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0xC1 <val> <sum>"

- id: white_balance_blue_offset_set
  label: White Balance Blue Offset (Set)
  kind: action
  command: "0xAA 0xFE <id> 0x02 0xD1 <val> <sum>"

- id: broadcast_send_all
  label: Broadcast Power (ID=0xFE)
  kind: action
  command: "0xAA 0x11 0xFE 0x01 <power_code> <sum>"
  notes: "ID 0xFE sends to all serial displays; each device follows but does not ACK."

- id: net_pip_command
  label: Net PIP (Multi-param Set)
  kind: action
  command: "0xAA 0xE0 <id> <len> <fields...> <sum>"

- id: apply_to_control_set
  label: Apply To Control (Set)
  kind: action
  command: "0xAA 0xE4 <id> 0x01 <val> <sum>"

- id: large_sized_file_download_install_set
  label: Large Sized Data File Download & Install (Set)
  kind: action
  command: "0xAA 0xD2 <id> <len> 0x20 <data...> <sum>"
```

## Feedbacks
```yaml
- id: ack_frame
  type: bytes
  description: "0xAA 0xFF <id> <len> 'A' <r-cmd> <val...> <sum>"

- id: nak_frame
  type: bytes
  description: "0xAA 0xFF <id> 0x03 'N' <r-cmd> <err> <sum>"
  notes: "Error code is internal/diagnostic; varies by command and model."

- id: power_state
  type: enum
  values: ["off", "on", "reboot"]

- id: volume_value
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: ["off", "on"]

- id: input_source
  type: enum
  values: ["S-Video", "Component", "AV1", "AV2", "SCART1", "DVI", "PC", "BNC", "DVI_VIDEO", "MagicInfo", "HDMI1", "HDMI1_PC", "HDMI2", "HDMI2_PC", "DisplayPort1", "DisplayPort2", "DisplayPort3", "HDMI3", "HDMI3_PC", "HDMI4", "HDMI4_PC", "TV(DTV)", "Plug In Module", "HDBaseT", "OCM", "Media/MagicInfo S", "WiDi", "Internal/USB", "URL Launcher", "IWB", "Web Browser", "Remote Workspace"]

- id: picture_aspect
  type: enum
  values: ["Auto/Wide", "16:9", "Zoom", "Zoom1", "Zoom2", "Just Scan", "4:3", "Wide Fit", "Custom", "Smart View 1", "Smart View 2", "Wide Zoom", "21:9", "Original Ratio"]

- id: display_errors
  type: object
  description: "Lamp Error, Temperature Error, Bright Sensor Error, No Sync Error, Cur Temp (C), Fan Error."

- id: light_sensor_lux
  type: integer
  description: "Light sensor value in lux, 2 bytes high/low."

- id: heatex_temperature_c
  type: integer
  range: [-60, 125]

- id: led_plate_temperature_c
  type: integer
  range: [-60, 125]

- id: final_duty
  type: integer
  range: [0, 1023]

- id: panel_on_time
  type: integer
  description: "Returned as H/L bytes; increments every 10 mins."

- id: model_name
  type: string
  description: "ASCII model name from 0x8A; QM85D/QM55D/QM50D/QM40D/QM105D share model code 0x52."

- id: serial_number
  type: string
  description: "15-char serial string from 0x0B."

- id: software_version
  type: string
  description: "Variable-length ASCII version from 0x0E."
```

## Variables
```yaml
- id: netbios_dhcp
  type: enum
  values: ["dynamic", "static"]

- id: network_ip_mode
  type: enum
  values: ["dynamic", "static"]

- id: mdc_connection_type
  type: enum
  values: ["rs232c", "rj45"]
```

## Events
```yaml
# UNRESOLVED: source describes ACK/NAK only; no unsolicited event stream documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - id: reset_control_set
    notes: "0x02 Setup Reset / 0x03 Reset All clear device configuration."
  - id: video_wall_direct_user_control_set
    notes: "Bulk rewrites video wall layout and input."
interlocks: []
# UNRESOLVED: source describes operational constraints (reboots, dependencies) but no formal safety interlocks
```

## Notes
<!-- UNRESOLVED: fields that could not be determined from the source, with explanation. -->
- Default TCP target: 192.168.0.10 port 1515. For power-on via RJ45 with Network Standby OFF (DMD/DBD/DHD/UED/DMD-S), use WOL instead of MDC; otherwise MDC is fine.
- RJ45 set + serial coexistence: if 0x1D=0x01 (RJ45), serial MDC stops working.
- Power commands over RJ45 require socket re-connect after ~10s and retry up to 3x every 2s waiting for ACK.
- RS-232: 3-wire (RxD/TxD/GND), max distance 4m, ID 0..253 (0xFE = broadcast).
- Checksum = sum of all preceding bytes (header through last data byte), truncated to one byte. Source example: `11+FE+01+01=111` → discard high digit → 0x11.
- Document scope: covers Samsung Multiple Display Control protocol as used by QM-series (model 0x52) and OMD/LH-OMD series (model 0x4A/0x50). Many commands are model-conditional; the spec lists every command-bearing row the source enumerates, with `command:` field carrying the literal byte sequence so implementations can drive both transports.

## Provenance

```yaml
source_domains:
  - aca.im
  - github.com
  - image-us.samsung.com
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
retrieved_at: 2026-09-03T22:39:10.052Z
last_checked_at: 2026-09-18T22:19:17.335Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:19:17.335Z
matched_actions: 233
action_count: 233
confidence: medium
summary: "All 233 spec actions have literal byte matches in the source command catalogue; transport values verbatim; unrepresented source commands are LED-product-only sub-commands not applicable to QM85D/OMD LCD LFD. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "0xD0.84 Monitoring (Get Only)"
- "0xD0.85 ABL mode"
- "0xD0.86 XOR Output Activation mode"
- "0xD0.87 LOD ReCheck"
- "0xD0.92 Module WB (RGB) Control"
- "0xD0.93 Cabinet CC (RGB) Control"
- "0xD0.94 Cabinet Backlight"
- "0xD0.95 Cabinet Pixel WB (RGB) CC on/off"
- "0xD0.96 Gamut Control"
- "0xD0.97 Cabinet Seam Correction"
- "0xD0.98 Cabinet Seam Correction on/off"
- "0xD0.99 Module WB (RGB) on/off"
- "list any major gaps here"
- "hardware firmware version, RJ45 authentication procedure, exact TCP retry/timeout contract"
- "source describes ACK/NAK only; no unsolicited event stream documented"
- "no multi-step sequences explicitly described in source"
- "source describes operational constraints (reboots, dependencies) but no formal safety interlocks"
- "fields that could not be determined from the source, with explanation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
