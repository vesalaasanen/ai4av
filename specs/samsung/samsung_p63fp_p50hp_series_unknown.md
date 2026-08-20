---
spec_id: admin/samsung-p63fp-p50hp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SyncMaster P63FP/P50HP Series Control Spec"
manufacturer: Samsung
model_family: "SyncMaster P63FP"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "SyncMaster P63FP"
    - "SyncMaster P63FP-2"
    - "SyncMaster P50HP"
    - "SyncMaster P50HP-2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - vgavro.github.io
  - image-us.samsung.com
  - manua.ls
  - manualowl.com
  - manualslib.com
source_urls:
  - https://vgavro.github.io/samsung-mdc/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://www.manua.ls/samsung/p63fp/manual
  - https://www.manualowl.com/m/Samsung/P63FP/Manual/50424
  - https://www.manualslib.com/manual/422069/Samsung-P63f-63-Plasma-Panel.html
retrieved_at: 2026-08-11T05:05:19.202Z
last_checked_at: 2026-08-19T09:44:55.472Z
generated_at: 2026-08-19T09:44:55.472Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command support is model-dependent — the source repeatedly states \"Depends on each model spec, a certain command will be supported or not.\" Exact subset supported by P63FP/P50HP cannot be determined without the device-specific user manual. Later/LED-only commands (0xD0 LED Product Feature, 0x21 HDR/Picture subs, SBOX modes) do not apply to these PDP displays but are enumerated because the common source documents them. The refined source is truncated at command 0xD0.84; payloads for 0xD0.85+, 0xD2, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE, 0xFF are documented only in the command table — detail marked UNRESOLVED."
  - "detailed payload format truncated in source"
  - "detailed data format (15-19 byte channel info) truncated in source"
  - "detail truncated in source"
  - "0xFE sub-command value ranges/formats truncated in source"
  - "many query replies carry multi-field structs (Maintenance, Sound,"
  - "no explicit interlock voltage/power sequencing warnings stated for these PDP models."
  - "firmware version compatibility not stated in source."
  - "exact command subset supported by P63FP/P50HP is model-dependent and not determinable from the common protocol spec alone — needs the device-specific user manual."
  - "refined source truncated at 0xD0.84; payloads for 0xD2.20, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE subs, 0xFF beyond framing are documented only in the command table — value formats need the full unabridged protocol PDF."
  - "no auth mechanism described, but network (RJ45) access control not specified — auth.type:none inferred from absence of login procedure."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:44:55.472Z
  matched_actions: 225
  action_count: 225
  confidence: medium
  summary: "Every spec action's hex opcode+subcommand appears verbatim in the source command table; transport values match source verbatim. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Samsung SyncMaster P63FP/P50HP Series Control Spec

## Summary
Samsung commercial plasma displays (SyncMaster P63FP, P50HP and -2 variants) controlled via the Samsung MDC (Multiple Display Control) protocol over RS-232C serial or RJ45 Ethernet (TCP/IP). This spec enumerates the MDC command set documented in the common MDC Protocol specification (SEC-VD-DSW, Ver. 15.0, 2020-11-06), which covers these PDP models (model codes 0x1B/0x2B/0x2D/0x38/0x39).

<!-- UNRESOLVED: command support is model-dependent — the source repeatedly states "Depends on each model spec, a certain command will be supported or not." Exact subset supported by P63FP/P50HP cannot be determined without the device-specific user manual. Later/LED-only commands (0xD0 LED Product Feature, 0x21 HDR/Picture subs, SBOX modes) do not apply to these PDP displays but are enumerated because the common source documents them. The refined source is truncated at command 0xD0.84; payloads for 0xD0.85+, 0xD2, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE, 0xFF are documented only in the command table — detail marked UNRESOLVED. -->

## Transport
```yaml
# Protocol framing (RS232 and RJ45 identical): every command is
#   0xAA {cmd} {id} {data_length} {data...} {checksum}
# {id}: device ID 0x00-0xFD; 0xFE = broadcast (sets obey, no ACK).
# checksum = (sum of cmd + id + data_length + all data bytes) mod 256
#   (header 0xAA excluded; discard carry above two hex digits).
# ACK reply: 0xAA 0xFF {id} {len} 'A' {r-cmd} {vals...} {checksum}
# NAK reply: 0xAA 0xFF {id} 0x03 'N' {r-cmd} {ERR} {checksum}
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # RJ45 / TCP/IP (MDC protocol carried in TCP data area)
  port: 1515
  # default ip: 192.168.0.10  (stated in source)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 0x11 Power Control present
  - routable     # inferred: 0x14 Input Source Control present
  - queryable    # inferred: numerous query/status commands present
  - levelable    # inferred: volume/brightness/contrast/level controls present
```

## Actions
```yaml
# {id} and {checksum} are computed at runtime; {id}=0xFE for broadcast.
# Get (query) uses data_length 0x00; Set uses data_length > 0 with data bytes.

# ---- 0x00 Status Control ----
- id: status_control
  label: Status Control
  kind: query
  command: "0xAA 0x00 {id} 0x00 {checksum}"
  params: []
  note: "Returns power, volume, mute, input source, aspect ratio, timer state."

# ---- 0x04 Video Control ----
- id: video_control
  label: Video Control
  kind: query
  command: "0xAA 0x04 {id} 0x00 {checksum}"
  params: []
  note: "Returns contrast, brightness, sharpness, color, tint, color tone, color temp (ATV/DTV/AV/S-Video/Component/HDMI only)."

# ---- 0x06 RGB Control ----
- id: rgb_control
  label: RGB Control
  kind: query
  command: "0xAA 0x06 {id} 0x00 {checksum}"
  params: []
  note: "Returns contrast, brightness, color tone, color temp, R/G/B gain (PC/BNC/DVI only)."

# ---- 0x07 PIP Status Control ----
- id: pip_status_control
  label: PIP Status Control
  kind: query
  command: "0xAA 0x07 {id} 0x00 {checksum}"
  params: []

# ---- 0x08 Maintenance Control ----
- id: maintenance_control
  label: Maintenance Control
  kind: query
  command: "0xAA 0x08 {id} 0x00 {checksum}"
  params: []
  note: "Returns power, PIP size/source, lamp schedule, safety-screen timer, video wall state. ACK data length 0x15 or 0x19 depending on model."

# ---- 0x09 Sound Control ----
- id: sound_control
  label: Sound Control
  kind: query
  command: "0xAA 0x09 {id} 0x00 {checksum}"
  params: []
  note: "Returns volume, balance, equalizer bands, SRS. Unsupported items return 0xFF."

# ---- 0x0B Serial Number Control ----
- id: serial_number_control
  label: Serial Number Control
  kind: query
  command: "0xAA 0x0B {id} 0x00 {checksum}"
  params: []
  note: "Returns 15-byte serial number string."

# ---- 0x0D Display Status Control ----
- id: display_status_control
  label: Display Status Control
  kind: query
  command: "0xAA 0x0D {id} 0x00 {checksum}"
  params: []
  note: "Returns lamp/temp/brightness-sensor/sync/board-temp/fan error codes."

# ---- 0x0E SW Version Control ----
- id: sw_version_control
  label: SW Version Control
  kind: query
  command: "0xAA 0x0E {id} 0x00 {checksum}"
  params: []
  note: "Returns project info (1-12) + software version string (13-50)."

# ---- 0x0F Auto Motion Plus ----
- id: auto_motion_plus
  label: Auto Motion Plus
  kind: action
  command: "0xAA 0x0F {id} 0x03 {mode} {blur_reduction} {judder_reduction} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0=Off,1=Clear,2=Standard,3=Smooth,4=Custom,5=Demo,6=Auto"
    - name: blur_reduction
      type: integer
      description: "0-10 (Custom mode only)"
    - name: judder_reduction
      type: integer
      description: "0-10 (Custom mode only)"

# ---- 0x10 Model Number Control ----
- id: model_number_control
  label: Model Number Control
  kind: query
  command: "0xAA 0x10 {id} 0x00 {checksum}"
  params: []
  note: "Returns panel species (PDP=0x01), model code (P63FP=0x1B/0x2D/0x39, P50HP=0x2B/0x38), TV support."

# ---- 0x11 Power Control ----
- id: power_control
  label: Power Control
  kind: action
  command: "0xAA 0x11 {id} 0x01 {power} {checksum}"
  params:
    - name: power
      type: integer
      description: "0x00=Power OFF, 0x01=Power ON, 0x02=Reboot"
  note: "Retry PowerOn/PowerOff 3x every 2s until ACK. After RJ45 power-on reconnect socket after 10s."

# ---- 0x12 Volume Control ----
- id: volume_control
  label: Volume Control
  kind: action
  command: "0xAA 0x12 {id} 0x01 {volume} {checksum}"
  params:
    - name: volume
      type: integer
      description: "0-100"

# ---- 0x13 Mute Control ----
- id: mute_control
  label: Mute Control
  kind: action
  command: "0xAA 0x13 {id} 0x01 {mute} {checksum}"
  params:
    - name: mute
      type: integer
      description: "0x00=Mute OFF, 0x01=Mute ON"

# ---- 0x14 Input Source Control ----
- id: input_source_control
  label: Input Source Control
  kind: action
  command: "0xAA 0x14 {id} 0x01 {input} {checksum}"
  params:
    - name: input
      type: integer
      description: "Source code: 0x08 Component, 0x0C AV, 0x18 DVI, 0x14 PC, 0x1E BNC, 0x1F DVI_VIDEO, 0x21 HDMI1, 0x23 HDMI2, 0x25 DisplayPort, 0x31 HDMI3, 0x33 HDMI4, 0x40 TV(DTV), 0x04 S-Video, 0x0D AV2, 0x0E SCART, 0x20 Magicinfo, 0x22/0x24/0x32/0x34 HDMI_PC, 0x50 Plug In Module, 0x55 HDBaseT, 0x60 Media/MagicInfo S (full list in source)"

# ---- 0x15 Image Size Control ----
- id: image_size_control
  label: Image Size Control
  kind: action
  command: "0xAA 0x15 {id} 0x01 {aspect} {checksum}"
  params:
    - name: aspect
      type: integer
      description: "PC: 0x10 16:9,0x18 4:3,0x20 Original,0x21 21:9,0x22 Custom. Video: 0x00 Auto Wide,0x01 16:9,0x04 Zoom,0x05 Zoom1,0x06 Zoom2,0x09 Just Scan,0x0B 4:3,0x0C Wide Fit,0x0D Custom,0x0E Smart View1,0x0F Smart View2,0x31 Wide Zoom,0x32 21:9"

# ---- 0x17 Direct Channel Control (DTV) ----
- id: direct_channel_control
  label: Direct Channel Control (DTV)
  kind: action
  command: "0xAA 0x17 {id} 0x08 {country} {atv_dtv} {aircable} {ch_num_high} {ch_num_low} {sel_minor} {minor_ch_high} {minor_ch_low} {checksum}"
  params:
    - name: country
      type: integer
      description: "0=Korea,1=USA,..."
    - name: atv_dtv
      type: integer
      description: "0=Analog TV,1=Digital TV"
    - name: aircable
      type: integer
      description: "0=general(air),1=cable"
    - name: ch_num_high
      type: integer
      description: "Channel number high byte (ATV 1-135, DTV 0-999)"
    - name: ch_num_low
      type: integer
      description: "Channel number low byte"
    - name: sel_minor
      type: integer
      description: "0=minor not selected,1=selected"
    - name: minor_ch_high
      type: integer
      description: "Minor channel high byte (0-999)"
    - name: minor_ch_low
      type: integer
      description: "Minor channel low byte"

# ---- 0x18 Screen Mode Control ----
- id: screen_mode_control
  label: Screen Mode Control
  kind: action
  command: "0xAA 0x18 {id} 0x01 {scrmode} {checksum}"
  params:
    - name: scrmode
      type: integer
      description: "0x01 16:9,0x04 Zoom,0x0B 4:3,0x31 Wide Zoom"

# ---- 0x19 Screen Size Control ----
- id: screen_size_control
  label: Screen Size Control
  kind: query
  command: "0xAA 0x19 {id} 0x00 {checksum}"
  params: []
  note: "Returns screen size in inches (0-255)."

# ---- 0x1A.81 Outdoor Mode ----
- id: outdoor_mode
  label: Outdoor Mode (0x1A.81)
  kind: action
  command: "0xAA 0x1A {id} 0x02 0x81 {outdoor_mode} {checksum}"
  params:
    - name: outdoor_mode
      type: integer
      description: "0/1"

# ---- 0x1A.82 Internal HeatEx Fan Speed Control ----
- id: internal_heatex_fan_speed
  label: Internal HeatEx Fan Speed Control (0x1A.82)
  kind: action
  command: "0xAA 0x1A {id} 0x02 0x82 {fan_speed} {checksum}"
  params:
    - name: fan_speed
      type: integer
      description: "0-100"

# ---- 0x1B.82 Network Configuration ----
- id: network_configuration
  label: Network Configuration (0x1B.82)
  kind: action
  command: "0xAA 0x1B {id} 0x11 0x82 {ip1..ip4} {subnet1..4} {gw1..4} {dns1..4} {checksum}"
  params:
    - name: ip_address
      type: string
      description: "4 bytes, MSB first (e.g. 192.168.0.100 = 0xC0 0xA8 0x00 0x64)"
    - name: subnet_mask
      type: string
      description: "4 bytes"
    - name: gateway
      type: string
      description: "4 bytes"
    - name: dns_server
      type: string
      description: "4 bytes"

# ---- 0x1B.85 Network IP Mode ----
- id: network_ip_mode
  label: Network IP Mode Control (0x1B.85)
  kind: action
  command: "0xAA 0x1B {id} 0x02 0x85 {network_ip_mode} {checksum}"
  params:
    - name: network_ip_mode
      type: integer
      description: "0x00=Dynamic,0x01=Static"

# ---- 0x1B.8A Network Access Point Configuration ----
- id: network_access_point_configuration
  label: Network Access Point Configuration (0x1B.8A)
  kind: action
  command: "0xAA 0x1B {id} {variable} 0x8A {code/data pairs} {checksum}"
  params:
    - name: ssid
      type: string
      description: "Code 0x00; Data1=followed size, Data2~=SSID string"
    - name: password
      type: string
      description: "Code 0x01; Data1=followed size, Data2~=password string"

# ---- 0x1B.A2 Weekly Restart ----
- id: weekly_restart
  label: Weekly Restart (0x1B.A2)
  kind: action
  command: "0xAA 0x1B {id} 0x04 0xA2 {weekday} {time} {min} {checksum}"
  params:
    - name: weekday
      type: integer
      description: "Bitmap Mon-Sun each 0=no restart,1=restart"
    - name: time
      type: integer
      description: "Restart hour 0-23 (0xFF=invalid)"
    - name: min
      type: integer
      description: "Restart minute 0-59 (0xFF=invalid)"

# ---- 0x1B.A4 Check Software Version ----
- id: check_software_version
  label: Check Software Version (0x1B.A4)
  kind: query
  command: "0xAA 0x1B {id} 0x01 0xA4 {checksum}"
  params: []
  note: "Get only. Returns per-module SW version data (Cabinet Main/FPGA, SBOX, etc.)."

# ---- 0x1C.81 MagicInfo Channel Control ----
- id: magicinfo_channel
  label: MagicInfo Channel Control (0x1C.81)
  kind: action
  command: "0xAA 0x1C {id} 0x03 0x81 {direct_ch_number_high} {direct_ch_number_low} {checksum}"
  params:
    - name: direct_ch_number
      type: integer
      description: "MagicInfo channel number (2 bytes)"

# ---- 0x1C.82 MagicInfo Server Settings ----
- id: magicinfo_server_settings
  label: MagicInfo Server Settings (0x1C.82)
  kind: action
  command: "0xAA 0x1C {id} {variable} 0x82 {url_string} {checksum}"
  params:
    - name: url
      type: string
      description: "Server URL+port string, max 252 bytes (e.g. http://10.88.8.73:7001)"

# ---- 0x1C.83 MagicInfo Content Orientation ----
- id: magicinfo_content_orientation
  label: MagicInfo Content Orientation (0x1C.83)
  kind: action
  command: "0xAA 0x1C {id} 0x02 0x83 {orientation_mode} {checksum}"
  params:
    - name: orientation_mode
      type: integer

# ---- 0x1D MDC Connection Type ----
- id: mdc_connection_type
  label: MDC Connection Type
  kind: action
  command: "0xAA 0x1D {id} 0x01 {connection_type} {checksum}"
  params:
    - name: connection_type
      type: integer
      description: "0x00=RS232C MDC, 0x01=RJ45 MDC"

# ---- 0x1F Still Control ----
- id: still_control
  label: Still Control
  kind: action
  command: "0xAA 0x1F {id} 0x01 {still} {checksum}"
  params:
    - name: still
      type: integer
      description: "0x00=Off,0x01=On (extern input only)"

# ---- 0x21.01 LED Picture Size ----
- id: led_picture_size
  label: LED Picture Size (0x21.01)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x01 {led_picture_size} {checksum}"
  params:
    - name: led_picture_size
      type: integer
      description: "0x00=Original,0x01=Custom"

# ---- 0x21.02 Picture Size Custom Fit Size ----
- id: picture_size_custom_fit
  label: Picture Size Custom Fit Size (0x21.02)
  kind: action
  command: "0xAA 0x21 {id} 0x05 0x02 {width_high} {width_low} {height_high} {height_low} {checksum}"
  params:
    - name: width
      type: integer
      description: "Custom width (2 bytes)"
    - name: height
      type: integer
      description: "Custom height (2 bytes)"

# ---- 0x21.03 HDR Inverse Tone Mapping ----
- id: hdr_inverse_tone_mapping
  label: HDR Inverse Tone Mapping (0x21.03)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x03 {inverse_tone_mapping} {checksum}"
  params:
    - name: inverse_tone_mapping
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x21.04 HDR Dynamic Peaking ----
- id: hdr_dynamic_peaking
  label: HDR Dynamic Peaking (0x21.04)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x04 {dynamic_peaking} {checksum}"
  params:
    - name: dynamic_peaking
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x21.05 HDR Color Mapping ----
- id: hdr_color_mapping
  label: HDR Color Mapping (0x21.05)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x05 {color_mapping} {checksum}"
  params:
    - name: color_mapping
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x21.06 Picture Size Fit To Screen ----
- id: picture_size_fit_to_screen
  label: Picture Size Fit To Screen (0x21.06)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x06 {fit_to_screen} {checksum}"
  params:
    - name: fit_to_screen
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x21.07 HDMI UHD Color ----
- id: hdmi_uhd_color
  label: HDMI UHD Color (0x21.07)
  kind: action
  command: "0xAA 0x21 {id} {variable} 0x07 {source/uhd_color pairs} {checksum}"
  params:
    - name: entries
      type: string
      description: "Each entry: source code (ref 0x14) + UHD color value 0x00 Off/0x01 On"

# ---- 0x21.08 FHD/UHD Out Control ----
- id: fhd_uhd_out_control
  label: FHD/UHD Out Control (0x21.08)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x08 {output} {checksum}"
  params:
    - name: output
      type: integer
      description: "0x00=FHD,0x01=UHD"

# ---- 0x21.09 Live Mode Control ----
- id: live_mode_control
  label: Live Mode Control (0x21.09)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x09 {live_mode} {checksum}"
  params:
    - name: live_mode
      type: integer
      description: "0x00=Normal,0x01=Live"

# ---- 0x21.0A HDR Dynamic Range Extension ----
- id: hdr_dynamic_range_extension
  label: HDR Dynamic Range Extension (0x21.0A)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x0A {dynamic_range_extension} {checksum}"
  params:
    - name: dynamic_range_extension
      type: integer
      description: "0x00=Off,0x01=Low,0x02=Medium,0x03=High"

# ---- 0x21.0B Screen Position ----
- id: screen_position
  label: Screen Position (0x21.0B)
  kind: action
  command: "0xAA 0x21 {id} 0x05 0x0B {pos_x_high} {pos_x_low} {pos_y_high} {pos_y_low} {checksum}"
  params:
    - name: position_x
      type: integer
      description: "Screen X position (2 bytes)"
    - name: position_y
      type: integer
      description: "Screen Y position (2 bytes)"

# ---- 0x21.0C HDR MultiLink HDR ----
- id: hdr_multilink_hdr
  label: HDR MultiLink HDR (0x21.0C)
  kind: action
  command: "0xAA 0x21 {id} 0x04 0x0C {multilink_hdr} {total_device_num} {device_id} {checksum}"
  params:
    - name: multilink_hdr
      type: integer
      description: "0x00=Off,0x01=On,0xFF=Do not change"
    - name: total_device_num
      type: integer
    - name: device_id
      type: integer

# ---- 0x21.50 Color Enhancement ----
- id: color_enhancement
  label: Color Enhancement (0x21.50)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x50 {color_enhancement} {checksum}"
  params:
    - name: color_enhancement
      type: integer
      description: "0/1"

# ---- 0x21.51 Dynamic Backlight ----
- id: dynamic_backlight
  label: Dynamic Backlight (0x21.51)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x51 {dynamic_backlight} {checksum}"
  params:
    - name: dynamic_backlight
      type: integer
      description: "0x00=Off,0x01=On(Low),0x02=Standard,0x03=High"

# ---- 0x21.52 Fit To Screen ----
- id: fit_to_screen
  label: Fit To Screen (0x21.52)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x52 {fit_to_screen} {checksum}"
  params:
    - name: fit_to_screen
      type: integer
      description: "0x02=Auto"

# ---- 0x21.53 Uniformity ----
- id: uniformity
  label: Uniformity (0x21.53)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x53 {uniformity_mode} {checksum}"
  params:
    - name: uniformity_mode
      type: integer

# ---- 0x21.54 Gamma Mode ----
- id: gamma_mode
  label: Gamma Mode (0x21.54)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x54 {gamma_mode} {checksum}"
  params:
    - name: gamma_mode
      type: integer
      description: "0x00=HLG,0x01=ST.2084,0x02=BT.1886,0x03=S Curve"

# ---- 0x21.55 Black Equalizer ----
- id: black_equalizer
  label: Black Equalizer (0x21.55)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x55 {black_equalizer} {checksum}"
  params:
    - name: black_equalizer
      type: integer
      description: "0x00=Off,0x01=Low,0x02=High"

# ---- 0x21.56 HDR+ ----
- id: hdr_plus
  label: HDR+ (0x21.56)
  kind: action
  command: "0xAA 0x21 {id} 0x02 0x56 {hdr_plus} {checksum}"
  params:
    - name: hdr_plus
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x24 Contrast Control ----
- id: contrast_control
  label: Contrast Control
  kind: action
  command: "0xAA 0x24 {id} 0x01 {contrast} {checksum}"
  params:
    - name: contrast
      type: integer
      description: "0-100"

# ---- 0x25 Brightness Control ----
- id: brightness_control
  label: Brightness Control
  kind: action
  command: "0xAA 0x25 {id} 0x01 {brightness} {checksum}"
  params:
    - name: brightness
      type: integer
      description: "0-100"

# ---- 0x26 Sharpness Control ----
- id: sharpness_control
  label: Sharpness Control
  kind: action
  command: "0xAA 0x26 {id} 0x01 {sharpness} {checksum}"
  params:
    - name: sharpness
      type: integer
      description: "0-100"

# ---- 0x27 Color Control ----
- id: color_control
  label: Color Control
  kind: action
  command: "0xAA 0x27 {id} 0x01 {color} {checksum}"
  params:
    - name: color
      type: integer
      description: "0-100"

# ---- 0x28 Tint Control ----
- id: tint_control
  label: Tint Control
  kind: action
  command: "0xAA 0x28 {id} 0x01 {tint} {checksum}"
  params:
    - name: tint
      type: integer
      description: "0-100, settable in 50 steps (0,2,4...100)"

# ---- 0x2F Coarse Control ----
- id: coarse_control
  label: Coarse Control
  kind: action
  command: "0xAA 0x2F {id} 0x01 {coarse} {checksum}"
  params:
    - name: coarse
      type: integer
      description: "0x00=Decrease,0x01=Increase (PC source + video wall on)"

# ---- 0x30 Fine Control ----
- id: fine_control
  label: Fine Control
  kind: action
  command: "0xAA 0x30 {id} 0x01 {fine} {checksum}"
  params:
    - name: fine
      type: integer
      description: "0x00=Decrease,0x01=Increase"

# ---- 0x31 H-Position Control ----
- id: h_position_control
  label: H-Position Control
  kind: action
  command: "0xAA 0x31 {id} 0x01 {h_pos} {checksum}"
  params:
    - name: h_pos
      type: integer
      description: "0x00=Move Left,0x01=Move Right (PC/BNC source)"

# ---- 0x32 V-Position Control ----
- id: v_position_control
  label: V-Position Control
  kind: action
  command: "0xAA 0x32 {id} 0x01 {v_pos} {checksum}"
  params:
    - name: v_pos
      type: integer
      description: "0x00=Move Up,0x01=Move Down"

# ---- 0x33 Auto Power ----
- id: auto_power
  label: Auto Power
  kind: action
  command: "0xAA 0x33 {id} 0x01 {auto_power} {checksum}"
  params:
    - name: auto_power
      type: integer
      description: "0x00=Auto Power Off,0x01=Auto Power On"

# ---- 0x34 Clear Menu Control ----
- id: clear_menu_control
  label: Clear Menu Control
  kind: action
  command: "0xAA 0x34 {id} 0x01 0x00 {checksum}"
  params: []
  note: "Clear=0x00 always. Get not supported."

# ---- 0x36 Remote Control ----
- id: remote_control
  label: Remote Control
  kind: action
  command: "0xAA 0x36 {id} 0x01 {rmc} {checksum}"
  params:
    - name: rmc
      type: integer
      description: "0x00=Remocon Disable,0x01=Remocon Enable"

# ---- 0x37 RGB Contrast Control ----
- id: rgb_contrast_control
  label: RGB Contrast Control
  kind: action
  command: "0xAA 0x37 {id} 0x01 {contrast} {checksum}"
  params:
    - name: contrast
      type: integer
      description: "0-100 (PC/BNC/DVI)"

# ---- 0x38 RGB Brightness Control ----
- id: rgb_brightness_control
  label: RGB Brightness Control
  kind: action
  command: "0xAA 0x38 {id} 0x01 {brightness} {checksum}"
  params:
    - name: brightness
      type: integer
      description: "0-100"

# ---- 0x3C PIP On/Off Control ----
- id: pip_on_off_control
  label: PIP On/Off Control
  kind: action
  command: "0xAA 0x3C {id} 0x01 {pip} {checksum}"
  params:
    - name: pip
      type: integer
      description: "0x00=PIP OFF,0x01=PIP ON"

# ---- 0x3D Auto Adjustment Control ----
- id: auto_adjustment_control
  label: Auto Adjustment Control
  kind: action
  command: "0xAA 0x3D {id} 0x01 0x00 {checksum}"
  params: []
  note: "Auto=0x00 always. PC(D-Sub)/BNC only."

# ---- 0x3E Color Tone Control ----
- id: color_tone_control
  label: Color Tone Control
  kind: action
  command: "0xAA 0x3E {id} 0x01 {color_tone} {checksum}"
  params:
    - name: color_tone
      type: integer
      description: "0x00=Cool2,0x01=Cool1,0x02=Normal,0x03=Warm1,0x04=Warm2,0x05=Natural,0x50=Off"

# ---- 0x3F Color Temperature Control ----
- id: color_temperature_control
  label: Color Temperature Control
  kind: action
  command: "0xAA 0x3F {id} 0x01 {c_temp} {checksum}"
  params:
    - name: c_temp
      type: integer
      description: "0x00-0x0A=5000K-15000K (step 500K),0xFD=2800K,0xFE=3000K,0xFF=4000K; Extended 28(0x1C)..160(0xA0)=2800K-16000K"

# ---- 0x40 PIP Source Control ----
- id: pip_source_control
  label: PIP Source Control
  kind: action
  command: "0xAA 0x40 {id} 0x01 {p_source} {checksum}"
  params:
    - name: p_source
      type: integer
      description: "Input source code (ref 0x14)"

# ---- 0x42 PIP Size Control ----
- id: pip_size_control
  label: PIP Size Control
  kind: action
  command: "0xAA 0x42 {id} 0x01 {p_size} {checksum}"
  params:
    - name: p_size
      type: integer
      description: "0x00=Off,0x04=Double1,0x05=Double2,0x06=Medium,0x07=Large,0x08=Small,0x09=Double3(POP),0x10=Custom"

# ---- 0x43 PIP Locate Control ----
- id: pip_locate_control
  label: PIP Locate Control
  kind: action
  command: "0xAA 0x43 {id} 0x01 {p_locate} {checksum}"
  params:
    - name: p_locate
      type: integer
      description: "0x01=UpperLeft,0x02=UpperRight,0x03=LowerRight,0x04=LowerLeft (0x00=Off get only)"

# ---- 0x44 Fan Speed Setting ----
- id: fan_speed_setting
  label: Fan Speed Setting
  kind: action
  command: "0xAA 0x44 {id} 0x01 {fan_speed} {checksum}"
  params:
    - name: fan_speed
      type: integer
      description: "0-100 (sets Fan Control to Manual)"

# ---- 0x45 User Auto Color ----
- id: user_auto_color
  label: User Auto Color
  kind: action
  command: "0xAA 0x45 {id} 0x01 {auto_color_cmd} {checksum}"
  params:
    - name: auto_color_cmd
      type: integer
      description: "0x00=Reset,0x01=Auto Color (PC D-Sub only)"

# ---- 0x47 Sound Select Control ----
- id: sound_select_control_47
  label: Sound Select Control (0x47)
  kind: action
  command: "0xAA 0x47 {id} 0x01 {s_select} {checksum}"
  params:
    - name: s_select
      type: integer
      description: "0x00=Sub,0x01=Main (PIP on only)"

# ---- 0x48 Auto Volume Control ----
- id: auto_volume_control
  label: Auto Volume Control
  kind: action
  command: "0xAA 0x48 {id} 0x01 {a_vol} {checksum}"
  params:
    - name: a_vol
      type: integer
      description: "0x00=Off,0x01=Normal(On),0x02=Night"

# ---- 0x4A Standby Control ----
- id: standby_control
  label: Standby Control
  kind: action
  command: "0xAA 0x4A {id} 0x01 {standby_setting} {checksum}"
  params:
    - name: standby_setting
      type: integer
      description: "0x00=Off,0x01=On,0x02=Auto (DPMS, external input only)"

# ---- 0x4B Video Picture Position & Size ----
- id: video_picture_position_size
  label: Video Picture Position & Size
  kind: action
  command: "0xAA 0x4B {id} 0x02 {type_cmd} {direction_cmd} {checksum}"
  params:
    - name: type_cmd
      type: integer
      description: "0x00=Reset,0x01=Position,0x02=Size,0x03=Reserved"
    - name: direction_cmd
      type: integer
      description: "Position:0x00 Down,0x01 Up,0x02 Left,0x03 Right. Size:0x00 V-ScaleDown,0x01 V-ScaleUp,0x02 H-ScaleDown,0x03 H-ScaleUp"

# ---- 0x4C Pixel Shift Control ----
- id: pixel_shift_control
  label: Pixel Shift Control
  kind: action
  command: "0xAA 0x4C {id} 0x04 {shift} {h_dot} {v_line} {s_time} {checksum}"
  params:
    - name: shift
      type: integer
      description: "0x00=Off,0x01=On"
    - name: h_dot
      type: integer
      description: "Horizontal dot 0-4"
    - name: v_line
      type: integer
      description: "Vertical line 0-4"
    - name: s_time
      type: integer
      description: "Shift time 1-4"

# ---- 0x50.00 Light Sensor ----
- id: light_sensor
  label: Light Sensor (0x50.00)
  kind: query
  command: "0xAA 0x50 {id} 0x01 0x00 {checksum}"
  params: []
  note: "Returns light sensor lux value (2 bytes)."

# ---- 0x50.01 HeatEx Temperature ----
- id: heatex_temperature
  label: HeatEx Temperature (0x50.01)
  kind: query
  command: "0xAA 0x50 {id} 0x01 0x01 {checksum}"
  params: []
  note: "Returns heat exchanger temp -60..125 C."

# ---- 0x50.02 LED Plate Temperature ----
- id: led_plate_temperature
  label: LED Plate Temperature (0x50.02)
  kind: query
  command: "0xAA 0x50 {id} 0x01 0x02 {checksum}"
  params: []

# ---- 0x50.03 Final Duty ----
- id: final_duty
  label: Final Duty (0x50.03)
  kind: query
  command: "0xAA 0x50 {id} 0x01 0x03 {checksum}"
  params: []
  note: "Returns final duty 0-1023."

# ---- 0x51 EQ 100Hz Control ----
- id: eq_100hz_control
  label: EQ 100Hz Control
  kind: action
  command: "0xAA 0x51 {id} 0x01 {eq_100hz} {checksum}"
  params:
    - name: eq_100hz
      type: integer
      description: "0-20 (menu 0=0x0A, -10=0x00)"

# ---- 0x52 EQ 300Hz Control ----
- id: eq_300hz_control
  label: EQ 300Hz Control
  kind: action
  command: "0xAA 0x52 {id} 0x01 {eq_300hz} {checksum}"
  params:
    - name: eq_300hz
      type: integer
      description: "0-20"

# ---- 0x53 EQ 1kHz Control ----
- id: eq_1khz_control
  label: EQ 1kHz Control
  kind: action
  command: "0xAA 0x53 {id} 0x01 {eq_1khz} {checksum}"
  params:
    - name: eq_1khz
      type: integer
      description: "0-20"

# ---- 0x54 EQ 3kHz Control ----
- id: eq_3khz_control
  label: EQ 3kHz Control
  kind: action
  command: "0xAA 0x54 {id} 0x01 {eq_3khz} {checksum}"
  params:
    - name: eq_3khz
      type: integer
      description: "0-20"

# ---- 0x55 EQ 10kHz Control ----
- id: eq_10khz_control
  label: EQ 10kHz Control
  kind: action
  command: "0xAA 0x55 {id} 0x01 {eq_10khz} {checksum}"
  params:
    - name: eq_10khz
      type: integer
      description: "0-20"

# ---- 0x56 Energy Saving_LFD ----
- id: energy_saving_lfd
  label: Energy Saving_LFD
  kind: action
  command: "0xAA 0x56 {id} 0x01 {energy_saving} {checksum}"
  params:
    - name: energy_saving
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x57 Auto Lamp Control ----
- id: auto_lamp_control
  label: Auto Lamp Control
  kind: action
  command: "0xAA 0x57 {id} 0x08 {lmax_h} {lmax_m} {lmax_ap} {lmax_value} {lmin_h} {lmin_m} {lmin_ap} {lmin_value} {checksum}"
  params:
    - name: lmax_h
      type: integer
      description: "Auto lamp max hour 1-12"
    - name: lmax_m
      type: integer
      description: "Auto lamp max minute 0-59"
    - name: lmax_ap
      type: integer
      description: "AM=1/PM=0"
    - name: lmax_value
      type: integer
      description: "Max value 0-100"
    - name: lmin_h
      type: integer
      description: "Min hour 1-12"
    - name: lmin_m
      type: integer
      description: "Min minute 0-59"
    - name: lmin_ap
      type: integer
      description: "AM=1/PM=0"
    - name: lmin_value
      type: integer
      description: "Min value 0-100"

# ---- 0x58 Manual Lamp Control ----
- id: manual_lamp_control
  label: Manual Lamp Control
  kind: action
  command: "0xAA 0x58 {id} 0x01 {lamp_value} {checksum}"
  params:
    - name: lamp_value
      type: integer
      description: "0-100 (0xFF=invalid when read)"

# ---- 0x59 Safety Screen Run Control ----
- id: safety_screen_run_control
  label: Safety Screen Run Control
  kind: action
  command: "0xAA 0x59 {id} 0x01 {safety_screen_type} {checksum}"
  params:
    - name: safety_screen_type
      type: integer
      description: "0x00=Off,0x01=SignalPattern,0x02=AllWhite,0x03=Scroll,0x04=Bar,0x06=Eraser,0x07=Pixel,0x10=RollingBar,0x11=FadingScreen. 0x01/0x02 PDP only"

# ---- 0x5A Inverse Control ----
- id: inverse_control
  label: Inverse Control
  kind: action
  command: "0xAA 0x5A {id} 0x01 {inverse} {checksum}"
  params:
    - name: inverse
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x5B Safety Screen Control ----
- id: safety_screen_control
  label: Safety Screen Control
  kind: action
  command: "0xAA 0x5B {id} {0x03|0x07} {type} {...timer data} {checksum}"
  params:
    - name: type
      type: integer
      description: "Repeat:0x03 Scroll,0x04 Pixel,0x05 Bar,0x06 Eraser,0x09 AllWhite,0x0A Pattern,0x10 RollingBar,0x11 FadingScreen. Interval=set MSB(|0x80)"
    - name: t_period
      type: integer
      description: "Timer period hour 1-10 (repeat mode)"
    - name: t_time
      type: integer
      description: "Timer time 0x01-0x05=10-50s (repeat mode)"
  note: "Repeat mode data_length=0x03 (type,t_period,t_time). Interval mode data_length=0x07 (type,start_h,start_m,start_ap,end_h,end_m,end_ap)."

# ---- 0x5C Video Wall Mode Control ----
- id: video_wall_mode_control
  label: Video Wall Mode Control
  kind: action
  command: "0xAA 0x5C {id} 0x01 {wall_mode} {checksum}"
  params:
    - name: wall_mode
      type: integer
      description: "0x00=Natural,0x01=Full"

# ---- 0x5D Safety Lock ----
- id: safety_lock
  label: Safety Lock
  kind: action
  command: "0xAA 0x5D {id} 0x01 {lock} {checksum}"
  params:
    - name: lock
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x5F Panel Lock (Key Lock) ----
- id: panel_key_lock
  label: Panel Key Lock Control (MFM)
  kind: action
  command: "0xAA 0x5F {id} 0x01 {button_lock} {checksum}"
  params:
    - name: button_lock
      type: integer
      description: "0x00=Unlock,0x01=Lock"

# ---- 0x61 Channel Up/Down ----
- id: channel_up_down
  label: Channel Up/Down
  kind: action
  command: "0xAA 0x61 {id} 0x01 {channel_up_down} {checksum}"
  params:
    - name: channel_up_down
      type: integer
      description: "0x00=Up,0x01=Down (TV source only)"

# ---- 0x62 Volume Up/Down ----
- id: volume_up_down
  label: Volume Up/Down
  kind: action
  command: "0xAA 0x62 {id} 0x01 {volume_up_down} {checksum}"
  params:
    - name: volume_up_down
      type: integer
      description: "0x00=Up,0x01=Down"

# ---- 0x63 Ticker ----
- id: ticker
  label: Ticker
  kind: action
  command: "0xAA 0x63 {id} {length} {ticker_on_off} {start_hour} {start_min} {start_ap} {end_hour} {end_min} {end_ap} {pos_h} {pos_v} {motion_on_off} {motion_dir} {motion_speed} {font_size} {fg_color} {bg_color} {fg_opacity} {bg_opacity} {message_data...} {checksum}"
  params:
    - name: ticker_on_off
      type: integer
      description: "0=Off,1=On"
    - name: message
      type: string
      description: "Hex of message text, up to 232 bytes (e.g. Hello=0x48 0x65 0x6C 0x6C 0x6F)"

# ---- 0x65 Sound Select Control ----
- id: sound_select_control_65
  label: Sound Select Control (0x65)
  kind: action
  command: "0xAA 0x65 {id} 0x01 {s_select} {checksum}"
  params:
    - name: s_select
      type: integer
      description: "0x00=Sub,0x01=Main"

# ---- 0x66 PC Module Detect ----
- id: pc_module_detect
  label: PC Module Detect
  kind: query
  command: "0xAA 0x66 {id} 0x00 {checksum}"
  params: []
  note: "Returns detected source 0x00=None,0x01=MagicInfo,0x02=PlugInModule."

# ---- 0x67 Device Name ----
- id: device_name
  label: Device Name
  kind: action
  command: "0xAA 0x67 {id} {length} {device_name_string} {checksum}"
  params:
    - name: device_name
      type: string
      description: "Device name string, max 15 chars"

# ---- 0x68 Speaker Select ----
- id: speaker_select
  label: Speaker Select
  kind: action
  command: "0xAA 0x68 {id} 0x01 {s_select} {checksum}"
  params:
    - name: s_select
      type: integer
      description: "0x00=Internal,0x01=External"

# ---- 0x70 OSD On/Off ----
- id: osd_on_off
  label: OSD On/Off
  kind: action
  command: "0xAA 0x70 {id} 0x01 {osd} {checksum}"
  params:
    - name: osd
      type: integer
      description: "0x00=OSD Off,0x01=OSD On (HKIA option inverts ACK/NAK)"

# ---- 0x71 P.Mode Control ----
- id: p_mode_control
  label: P.Mode Control
  kind: action
  command: "0xAA 0x71 {id} 0x01 {pmode} {checksum}"
  params:
    - name: pmode
      type: integer
      description: "0x00 Dynamic,0x01 Standard/Live,0x02 Movie,0x03 Custom,0x04 Natural,0x05 Calibration,0x16 Calibration,0x20-0x27 Shop/Mall/Office/Videowall Video/Text,0x50 Off (varies by model/source)"

# ---- 0x72 S.Mode Control ----
- id: s_mode_control
  label: S.Mode Control
  kind: action
  command: "0xAA 0x72 {id} 0x01 {smode} {checksum}"
  params:
    - name: smode
      type: integer
      description: "0x00 Standard,0x01 Music,0x02 Movie,0x03 Speech,0x04 Custom,0x05 Amplify,0x06 Optimized"

# ---- 0x73 Digital NR Control ----
- id: digital_nr_control
  label: Digital NR Control
  kind: action
  command: "0xAA 0x73 {id} 0x01 {nr_mode} {checksum}"
  params:
    - name: nr_mode
      type: integer
      description: "0x00=Off,0x01=Low(On),0x02=Medium,0x03=High,0x04=Auto,0x05=Auto Visualization"

# ---- 0x75 PC Color Tone Control ----
- id: pc_color_tone_control
  label: PC Color Tone Control
  kind: action
  command: "0xAA 0x75 {id} 0x01 {color_tone} {checksum}"
  params:
    - name: color_tone
      type: integer
      description: "0x00=Custom,0x01=Cool,0x02=Normal,0x03=Warm,0x05=Natural,0x50=Off (PC/BNC/DVI)"

# ---- 0x76 Auto AutoAdjustment ----
- id: auto_auto_adjustment
  label: Auto Auto Adjustment
  kind: action
  command: "0xAA 0x76 {id} 0x01 {a_adjustment} {checksum}"
  params:
    - name: a_adjustment
      type: integer
      description: "0x00=Disable,0x01=Enable"

# ---- 0x77 All Keys Lock ----
- id: all_keys_lock
  label: All Keys Lock
  kind: action
  command: "0xAA 0x77 {id} 0x01 {akl} {checksum}"
  params:
    - name: akl
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x78 SRS TSXT Control ----
- id: srs_tsxt_control
  label: SRS TSXT Control
  kind: action
  command: "0xAA 0x78 {id} 0x01 {srs} {checksum}"
  params:
    - name: srs
      type: integer
      description: "0x00=SRS Off,0x01=SRS On"

# ---- 0x79 Film Mode Control ----
- id: film_mode_control
  label: Film Mode Control
  kind: action
  command: "0xAA 0x79 {id} 0x01 {fmode} {checksum}"
  params:
    - name: fmode
      type: integer
      description: "0x00=Off,0x01=Auto1,0x02=Auto2,0x03=Cinema Smooth"

# ---- 0x83 Panel On Time ----
- id: panel_on_time
  label: Panel On Time
  kind: query
  command: "0xAA 0x83 {id} 0x00 {checksum}"
  params: []
  note: "Returns panel on time (2 bytes), increments every 10 min."

# ---- 0x84 Video Wall On ----
- id: video_wall_on
  label: Video Wall On
  kind: action
  command: "0xAA 0x84 {id} 0x01 {v_wall_on} {checksum}"
  params:
    - name: v_wall_on
      type: integer
      description: "0x00=Video Wall Off,0x01=Video Wall On"

# ---- 0x85 Temperature Control ----
- id: temperature_control
  label: Temperature Control
  kind: action
  command: "0xAA 0x85 {id} 0x01 {temperature} {checksum}"
  params:
    - name: temperature
      type: integer
      description: "Threshold 75-124 C (auto power off above this)"

# ---- 0x86 Brightness Sensor ----
- id: brightness_sensor
  label: Brightness Sensor
  kind: action
  command: "0xAA 0x86 {id} 0x01 {br_sensor} {checksum}"
  params:
    - name: br_sensor
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x87 Dynamic Contrast ----
- id: dynamic_contrast
  label: Dynamic Contrast
  kind: action
  command: "0xAA 0x87 {id} 0x01 {dy_cont} {checksum}"
  params:
    - name: dy_cont
      type: integer
      description: "0x00=Off,0x01=Low(On),0x02=Medium,0x03=High"

# ---- 0x89 Video Wall User Control ----
- id: video_wall_user_control
  label: Video Wall User Control
  kind: action
  command: "0xAA 0x89 {id} 0x02 {wall_div} {wall_sno} {checksum}"
  params:
    - name: wall_div
      type: integer
      description: "Video wall divider code (HxV grid, 0x00 off..0xFF=15x15)"
    - name: wall_sno
      type: integer
      description: "Device number in wall (5x5:1-25, 10x10:1-100, 15x15:1-225)"

# ---- 0x8A Model Name Control ----
- id: model_name_control
  label: Model Name Control
  kind: query
  command: "0xAA 0x8A {id} 0x00 {checksum}"
  params: []
  note: "Returns model name string."

# ---- 0x8B Video Wall Direct User Control ----
- id: video_wall_direct_user_control
  label: Video Wall Direct User Control
  kind: action
  command: "0xAA 0x8B {id} 0x05 {v_wall_on} {wall_mode} {wall_div} {wall_sno} {input} {checksum}"
  params:
    - name: v_wall_on
      type: integer
      description: "0x00=Off,0x01=On"
    - name: wall_mode
      type: integer
      description: "0x00=Natural,0x01=Full"
    - name: wall_div
      type: integer
      description: "Ref 0x89 table"
    - name: wall_sno
      type: integer
      description: "Ref 0x89 table"
    - name: input
      type: integer
      description: "Ref 0x14 source code"

# ---- 0x8C.81 Frame Alignment ----
- id: frame_alignment
  label: Video Wall Feature - Frame Alignment (0x8C.81)
  kind: action
  command: "0xAA 0x8C {id} 0x02 0x81 {frame_alignment_mode} {checksum}"
  params:
    - name: frame_alignment_mode
      type: integer
      description: "0x00=Off,0x01=On,0x02=Auto"

# ---- 0x8F Fan Control ----
- id: fan_control
  label: Fan Control
  kind: action
  command: "0xAA 0x8F {id} 0x01 {fan} {checksum}"
  params:
    - name: fan
      type: integer
      description: "0x00=Manual,0x01=Auto,0x02=Off,0x03=On"

# ---- 0x90 Game Mode Control ----
- id: game_mode_control
  label: Game Mode Control
  kind: action
  command: "0xAA 0x90 {id} 0x01 {game_mode} {checksum}"
  params:
    - name: game_mode
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x92 Energy Saving Control ----
- id: energy_saving_control
  label: Energy Saving Control
  kind: action
  command: "0xAA 0x92 {id} 0x01 {e_sav} {checksum}"
  params:
    - name: e_sav
      type: integer
      description: "0x00=Off,0x01=Low(On),0x02=Medium,0x03=High,0x04=Picture Off"

# ---- 0x94 HDMI Black Level Control ----
- id: hdmi_black_level_control
  label: HDMI Black Level Control
  kind: action
  command: "0xAA 0x94 {id} 0x01 {hdmi_black_level} {checksum}"
  params:
    - name: hdmi_black_level
      type: integer
      description: "0x00=Normal,0x01=Low,0x02=Auto"

# ---- 0x95 Black Adjust Control ----
- id: black_adjust_control
  label: Black Adjust Control
  kind: action
  command: "0xAA 0x95 {id} 0x01 {b_adj} {checksum}"
  params:
    - name: b_adj
      type: integer
      description: "0x00=Off,0x01=Low(Dark),0x02=Medium(Darker),0x03=High(Darkest)"

# ---- 0x96 Gamma Control ----
- id: gamma_control
  label: Gamma Control
  kind: action
  command: "0xAA 0x96 {id} 0x01 {gamma} {checksum}"
  params:
    - name: gamma
      type: integer
      description: "0x00=Natural(0),0x01-0x05=Mode1-5,0x11-0x15=-1..-5,0x20=Custom"

# ---- 0x9C Edge Enhancement Control ----
- id: edge_enhancement_control
  label: Edge Enhancement Control
  kind: action
  command: "0xAA 0x9C {id} 0x01 {edge} {checksum}"
  params:
    - name: edge
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x9D Color Space Control ----
- id: color_space_control
  label: Color Space Control
  kind: action
  command: "0xAA 0x9D {id} 0x01 {color_space} {checksum}"
  params:
    - name: color_space
      type: integer
      description: "0x00=Auto,0x01=Native,0x02=Custom,0x03=DCI-P3,0x04=AdobeRGB,0x05=BT-709"

# ---- 0x9E xvYCC Control ----
- id: xvycc_control
  label: xvYCC Control
  kind: action
  command: "0xAA 0x9E {id} 0x01 {xvycc} {checksum}"
  params:
    - name: xvycc
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0x9F Reset Control ----
- id: reset_control
  label: Reset Control
  kind: action
  command: "0xAA 0x9F {id} 0x01 {rst} {checksum}"
  params:
    - name: rst
      type: integer
      description: "0x00=Picture,0x01=Sound,0x02=Setup(System),0x03=All,0x04=Screen Display"

# ---- 0xA1 Ambient Brightness Mode ----
- id: ambient_brightness_mode
  label: Ambient Brightness Mode
  kind: action
  command: "0xAA 0xA1 {id} 0x03 {ab_mode} {valid_lamp_value} {lamp_value} {checksum}"
  params:
    - name: ab_mode
      type: integer
      description: "0x00=Off,0x01=On"
    - name: valid_lamp_value
      type: integer
      description: "0x00=Invalid(don't apply),0x01=Valid(apply)"
    - name: lamp_value
      type: integer
      description: "0-100"

# ---- 0xA3 OSD Display Type On/Off ----
- id: osd_display_type_on_off
  label: OSD Display Type On/Off
  kind: action
  command: "0xAA 0xA3 {id} 0x02 {osd_type} {osd_on_off} {checksum}"
  params:
    - name: osd_type
      type: integer
      description: "0x00=Source,0x01=NotOptimumMode,0x02=NoSignal,0x03=MDC,0x04=ScheduleChannelInfo"
    - name: osd_on_off
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0xA4 Timer1 Control_MFM ----
- id: timer1_control_mfm
  label: Timer1 Control_MFM
  kind: action
  command: "0xAA 0xA4 {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - name: on_h
      type: integer
      description: "On hour 1-12"
    - name: on_m
      type: integer
      description: "On minute 0-59"
    - name: on_ap
      type: integer
      description: "0=PM,1=AM"
    - name: on_act
      type: integer
      description: "0=off,1=on"
    - name: off_h
      type: integer
      description: "Off hour 1-12"
    - name: off_m
      type: integer
      description: "Off minute 0-59"
    - name: off_ap
      type: integer
      description: "0=PM,1=AM"
    - name: off_act
      type: integer
      description: "0=off,1=on"
    - name: repeat_on
      type: integer
      description: "0=Once,1=Everyday,2=Mon-Fri,3=Mon-Sat,4=Sat-Sun,5=Manual"
    - name: repeat_off
      type: integer
      description: "Same as repeat_on"
    - name: volume
      type: integer
      description: "On-timer volume"
    - name: source
      type: integer
      description: "On-timer source (ref 0x14)"
    - name: holiday_apply
      type: integer
      description: "0x02=OnTimer1 only,0x03=OffTimer1 only"

# ---- 0xA5 Timer2 Control_MFM ----
- id: timer2_control_mfm
  label: Timer2 Control_MFM
  kind: action
  command: "0xAA 0xA5 {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xA6 Timer3 Control_MFM ----
- id: timer3_control_mfm
  label: Timer3 Control_MFM
  kind: action
  command: "0xAA 0xA6 {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xA7 Clock Control_MFM ----
- id: clock_control_mfm
  label: Clock Control_MFM
  kind: action
  command: "0xAA 0xA7 {id} 0x07 {day} {h_time} {m_time} {month} {year1} {year2} {ap_time} {checksum}"
  params:
    - name: day
      type: integer
      description: "1-31"
    - name: h_time
      type: integer
      description: "1-12"
    - name: m_time
      type: integer
      description: "0-59"
    - name: month
      type: integer
      description: "1-12"
    - name: year1
      type: integer
      description: "Year high byte"
    - name: year2
      type: integer
      description: "Year low byte"
    - name: ap_time
      type: integer
      description: "0=PM,1=AM"

# ---- 0xA8 Holiday Add/Delete Control ----
- id: holiday_add_delete
  label: Holiday Add/Delete Control
  kind: action
  command: "0xAA 0xA8 {id} 0x05 {management_cmd} {month1} {day1} {month2} {day2} {checksum}"
  params:
    - name: management_cmd
      type: integer
      description: "0x00=Add,0x01=Delete,0x02=DeleteAll (data2-5=0)"
    - name: month1
      type: integer
      description: "Start month"
    - name: day1
      type: integer
      description: "Start day"
    - name: month2
      type: integer
      description: "End month"
    - name: day2
      type: integer
      description: "End day"

# ---- 0xA9 Holiday Get Control ----
- id: holiday_get
  label: Holiday Get Control
  kind: query
  command: "0xAA 0xA9 {id} {0x00|0x01} {index?} {checksum}"
  params:
    - name: index
      type: integer
      description: "Datalen 0x00=get total count; datalen 0x01+index=get that entry"

# ---- 0xAB Timer4 Control ----
- id: timer4_control
  label: Timer4 Control
  kind: action
  command: "0xAA 0xAB {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xAC Timer5 Control ----
- id: timer5_control
  label: Timer5 Control
  kind: action
  command: "0xAA 0xAC {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xAD Timer6 Control ----
- id: timer6_control
  label: Timer6 Control
  kind: action
  command: "0xAA 0xAD {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xAE Timer7 Control ----
- id: timer7_control
  label: Timer7 Control
  kind: action
  command: "0xAA 0xAE {id} {0x0D|0x0F} {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params: []

# ---- 0xAF Edit Name Control ----
- id: edit_name_control
  label: Edit Name Control
  kind: action
  command: "0xAA 0xAF {id} 0x01 {ename} {checksum}"
  params:
    - name: ename
      type: integer
      description: "0x00 None,0x01 VCR,0x02 DVD,0x03 CableSTB,0x04 SatelliteSTB,0x05 PVRSTB,0x06 AVReceiver,0x07 Game,0x08 Camcorder,0x09 PC,0x0A DVIPC,0x0B DVIDevices,0x0C TV,0x0D IPTV,0x0E Blu-ray,0x0F HDDVD,0x10 DMA,0x11 DVDReceiver,0x12 HDSTB,0x13 DVDCombo,0x14 DHR"

# ---- 0xB0 Virtual Remote Control ----
- id: virtual_remote_control
  label: Virtual Remote Control
  kind: action
  command: "0xAA 0xB0 {id} 0x01 {keycode} {checksum}"
  params:
    - name: keycode
      type: integer
      description: "0x01 SOURCE,0x02 POWER,0x04-0x0F 1-9/VOL/MUTE,0x10 CHDOWN,0x11 0,0x12 CHUP,0x1A MENU,0x1F DISPLAY/INFO,0x2D EXIT,0x45 REW,0x46 STOP,0x47 PLAY,0x48 FF,0x4A PAUSE,0x4B TOOLS,0x58 RETURN,0x60-0x65 CURSORS,0x68 ENTER,0x6C RED,0x77 LOCK,0x98 DISCRET_POWEROFF (full list in source)"

# ---- 0xB1 Display Port Daisy Chain ----
- id: display_port_daisy_chain
  label: Display Port Daisy Chain
  kind: action
  command: "0xAA 0xB1 {id} 0x01 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0x00=Clone,0x01=Expand"

# ---- 0xB2 3Screen/4Screen Mode Control ----
- id: three_four_screen_mode_control
  label: 3Screen/4Screen Mode Control
  kind: action
  command: "0xAA 0xB2 {id} {0x06|0x08|0x0A} {screen_on_off} {sound_select} {...screen data} {checksum}"
  params:
    - name: screen_on_off
      type: integer
      description: "0x00=Off,0x01=3Screen,0x02=4Screen"
  note: "Type1 3Screen dl=0x08; Type2 4Screen dl=0x0A; Type3 4Screen(no pic size) dl=0x06."

# ---- 0xB3 Video Conference Sound Mode Control ----
- id: video_conference_sound_mode
  label: Video Conference Sound Mode Control
  kind: action
  command: "0xAA 0xB3 {id} 0x01 {conference_sound} {checksum}"
  params:
    - name: conference_sound
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0xB5 Network Standby Control ----
- id: network_standby_control
  label: Network Standby Control
  kind: action
  command: "0xAA 0xB5 {id} 0x01 {network_standby} {checksum}"
  params:
    - name: network_standby
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0xB6 DST Control ----
- id: dst_control
  label: DST (Daylight Saving Time) Control
  kind: action
  command: "0xAA 0xB6 {id} 0x0C {dst_on_off} {month_start} {week_info_start} {weekday_info_start} {time_h_start} {time_m_start} {month_end} {week_info_end} {weekday_info_end} {time_h_end} {time_m_end} {time_offset} {checksum}"
  params:
    - name: dst_on_off
      type: integer
      description: "Tunerless 0x00 Off/0x02 On; Tuner 0x00 Off/0x01 Auto/0x02 Manual"
    - name: time_offset
      type: integer
      description: "0x00=+1:00,0x01=+2:00"

# ---- 0xB7 Custom PIP Control ----
- id: custom_pip_control
  label: Custom PIP Control
  kind: action
  command: "0xAA 0xB7 {id} 0x08 {h_position} {v_position} {h_size} {v_size} {checksum}"
  params:
    - name: h_position
      type: integer
    - name: v_position
      type: integer
    - name: h_size
      type: integer
      description: "512-1632 (interval 160)"
    - name: v_size
      type: integer
      description: "288-918 (interval 90)"

# ---- 0xB8 Auto ID Setting Status Control ----
- id: auto_id_setting_status
  label: Auto ID Setting Status Control
  kind: action
  command: "0xAA 0xB8 {id} 0x01 {status} {checksum}"
  params:
    - name: status
      type: integer
      description: "0x00=Auto ID Setting START,0x01=END"

# ---- 0xB9 Display ID Information ----
- id: display_id_information
  label: Display ID Information
  kind: action
  command: "0xAA 0xB9 {id} 0x01 {id_display_on_off} {checksum}"
  params:
    - name: id_display_on_off
      type: integer
      description: "0x00=Display Off,0x01=Display On"

# ---- 0xC5 Clock Control_MFM (seconds) ----
- id: clock_control_mfm_seconds
  label: Clock Control_MFM (with seconds)
  kind: action
  command: "0xAA 0xC5 {id} 0x08 {day} {h_time} {m_time} {s_time} {month} {year} {ap_time} {checksum}"
  params:
    - name: day
      type: integer
      description: "1-31"
    - name: s_time
      type: integer
      description: "0-59"

# ---- 0xC6.81 Auto Power Off ----
- id: eco_auto_power_off
  label: Eco Solution - Auto Power Off (0xC6.81)
  kind: action
  command: "0xAA 0xC6 {id} 0x02 0x81 {auto_power_off} {checksum}"
  params:
    - name: auto_power_off
      type: integer
      description: "0x00=Off,0x01=4Hour,0x02=6Hour,0x03=8Hour,0x04=16Hour (or 0/1 On/Off only on some models)"

# ---- 0xC6.82 Brightness Limit ----
- id: eco_brightness_limit
  label: Eco Solution - Brightness Limit (0xC6.82)
  kind: action
  command: "0xAA 0xC6 {id} 0x02 0x82 {brightness_limit} {checksum}"
  params:
    - name: brightness_limit
      type: integer

# ---- 0xC7.81 Execute Launcher - Play Via Mode ----
- id: launcher_play_via_mode
  label: Execute Launcher - Play Via Mode (0xC7.81)
  kind: action
  command: "0xAA 0xC7 {id} 0x02 0x81 {play_via_mode} {checksum}"
  params:
    - name: play_via_mode
      type: integer
      description: "0x00=MagicInfo,0x01=URL Launcher,0x02=MagicIWB"

# ---- 0xC7.82 URL Address ----
- id: launcher_url_address
  label: Execute Launcher - URL Address (0xC7.82)
  kind: action
  command: "0xAA 0xC7 {id} {variable} 0x82 {url_address_ascii} {checksum}"
  params:
    - name: url_address
      type: string
      description: "ASCII URL, max 200 chars"

# ---- 0xC8.81 Menu Orientation ----
- id: osd_menu_orientation
  label: OSD Menu Orientation (0xC8.81)
  kind: action
  command: "0xAA 0xC8 {id} 0x02 0x81 {orientation_mode} {checksum}"
  params:
    - name: orientation_mode
      type: integer
      description: "0x00=Landscape(0),0x01=Portrait(270),0x02=180,0x03=90"

# ---- 0xC8.82 Source Content Orientation ----
- id: osd_source_orientation
  label: OSD Source Content Orientation (0xC8.82)
  kind: action
  command: "0xAA 0xC8 {id} 0x02 0x82 {orientation_mode} {checksum}"
  params:
    - name: orientation_mode
      type: integer

# ---- 0xC8.83 Aspect Ratio (Rotated) ----
- id: osd_aspect_ratio
  label: OSD Aspect Ratio (0xC8.83)
  kind: action
  command: "0xAA 0xC8 {id} 0x02 0x83 {aspect_ratio} {checksum}"
  params:
    - name: aspect_ratio
      type: integer
      description: "0x00=Full Screen,0x01=Original"

# ---- 0xC8.84 PIP Orientation ----
- id: osd_pip_orientation
  label: OSD PIP Orientation (0xC8.84)
  kind: action
  command: "0xAA 0xC8 {id} 0x02 0x84 {orientation_mode} {checksum}"
  params:
    - name: orientation_mode
      type: integer

# ---- 0xC8.85 Menu Size ----
- id: osd_menu_size
  label: OSD Menu Size (0xC8.85)
  kind: action
  command: "0xAA 0xC8 {id} 0x02 0x85 {menu_size} {checksum}"
  params:
    - name: menu_size
      type: integer
      description: "0x00=Original,0x01=Medium,0x02=Small"

# ---- 0xC9.81 HDMI Sound ----
- id: sound_menu_hdmi_sound
  label: Sound Menu - HDMI Sound (0xC9.81)
  kind: action
  command: "0xAA 0xC9 {id} 0x02 0x81 {hdmi_sound} {checksum}"
  params:
    - name: hdmi_sound
      type: integer
      description: "0x00=HDMI Signal Sound,0x01=Audio In Sound"

# ---- 0xC9.82 EQ 200Hz ----
- id: sound_menu_eq_200hz
  label: Sound Menu - EQ 200Hz (0xC9.82)
  kind: action
  command: "0xAA 0xC9 {id} 0x02 0x82 {eq_200hz} {checksum}"
  params:
    - name: eq_200hz
      type: integer
      description: "0-20 (-10=0,0=0x0A,10=0x14)"

# ---- 0xC9.83 EQ 500Hz ----
- id: sound_menu_eq_500hz
  label: Sound Menu - EQ 500Hz (0xC9.83)
  kind: action
  command: "0xAA 0xC9 {id} 0x02 0x83 {eq_500hz} {checksum}"
  params:
    - name: eq_500hz
      type: integer

# ---- 0xC9.84 EQ 2kHz ----
- id: sound_menu_eq_2khz
  label: Sound Menu - EQ 2kHz (0xC9.84)
  kind: action
  command: "0xAA 0xC9 {id} 0x02 0x84 {eq_2khz} {checksum}"
  params:
    - name: eq_2khz
      type: integer

# ---- 0xC9.85 EQ 5kHz ----
- id: sound_menu_eq_5khz
  label: Sound Menu - EQ 5kHz (0xC9.85)
  kind: action
  command: "0xAA 0xC9 {id} 0x02 0x85 {eq_5khz} {checksum}"
  params:
    - name: eq_5khz
      type: integer

# ---- 0xCA.60 SBOX Mode ----
- id: sysmenu_sbox_mode
  label: System Menu - SBOX Mode (0xCA.60)
  kind: query
  command: "0xAA 0xCA {id} 0x01 0x60 {checksum}"
  params: []
  note: "Returns 0x00=Indoor,0x01=Outdoor."

# ---- 0xCA.61 Dimming Mode ----
- id: sysmenu_dimming_mode
  label: System Menu - Dimming Mode (0xCA.61)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x61 {dimming_mode} {checksum}"
  params:
    - name: dimming_mode
      type: integer
      description: "0x00=Auto,0x01=LightSensor,0x02=SunRise/Set,0x03=Off"

# ---- 0xCA.62 Night Time Constant Brightness ----
- id: sysmenu_night_constant_brightness
  label: System Menu - Night Time Constant Brightness (0xCA.62)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x62 {constant_brightness_mode} {checksum}"
  params:
    - name: constant_brightness_mode
      type: integer

# ---- 0xCA.63 Brightness Change Period ----
- id: sysmenu_brightness_change_period
  label: System Menu - Brightness Change Period (0xCA.63)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x63 {change_period} {checksum}"
  params:
    - name: change_period
      type: integer
      description: "10-70 minutes"

# ---- 0xCA.64 Light Sensor Effective Range ----
- id: sysmenu_light_sensor_range
  label: System Menu - Light Sensor Effective Range (0xCA.64)
  kind: action
  command: "0xAA 0xCA {id} {variable} 0x64 {data_type} {data} {checksum}"
  params:
    - name: data_type
      type: integer
      description: "0x00=Min Effective Range,0x01=Max Effective Range"
    - name: data
      type: integer
      description: "Lux value"

# ---- 0xCA.65 Brightness Output Range & Default ----
- id: sysmenu_brightness_output_range
  label: System Menu - Brightness Output Range (0xCA.65)
  kind: action
  command: "0xAA 0xCA {id} {variable} 0x65 {data_type} {data} {checksum}"
  params:
    - name: data_type
      type: integer
      description: "0x00=Min Output,0x01=Max Output,0x02=Default Output"
    - name: data
      type: integer
      description: "Percent value"

# ---- 0xCA.66 Latitude / longitude Info ----
- id: sysmenu_lat_long
  label: System Menu - Latitude/Longitude Info (0xCA.66)
  kind: action
  command: "0xAA 0xCA {id} {variable} 0x66 {data_type1} {len} {data} {checksum}"
  params:
    - name: data_type
      type: integer
      description: "0x00=Latitude,0x01=Longitude"
    - name: data
      type: string

# ---- 0xCA.70 CEC On/Off ----
- id: sysmenu_cec
  label: System Menu - CEC On/Off (0xCA.70)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x70 {cec_on_off} {checksum}"
  params:
    - name: cec_on_off
      type: integer
      description: "0x00=Off,0x01=On"

# ---- 0xCA.71 Multi Device Grouping ----
- id: sysmenu_multi_device_grouping
  label: System Menu - Multi Device Grouping (0xCA.71)
  kind: action
  command: "0xAA 0xCA {id} 0x03 0x71 {group_mode} {role} {checksum}"
  params:
    - name: group_mode
      type: integer
      description: "0x00=Off,0x01+=Group N"
    - name: role
      type: integer
      description: "0x00=Sub,0x01=Main"

# ---- 0xCA.81 Auto Source Switch On/Off ----
- id: sysmenu_auto_source_switch_onoff
  label: System Menu - Auto Source Switch On/Off (0xCA.81)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x81 {auto_source_switch} {checksum}"
  params:
    - name: auto_source_switch
      type: integer
      description: "0x00=Off,0x01=On(Preset Input)"

# ---- 0xCA.82 Auto Source Switch Control ----
- id: sysmenu_auto_source_switch_control
  label: System Menu - Auto Source Switch Control (0xCA.82)
  kind: action
  command: "0xAA 0xCA {id} 0x04 0x82 {primary_source_recovery} {primary_source} {secondary_source} {checksum}"
  params:
    - name: primary_source_recovery
      type: integer
      description: "0x00=Off,0x01=On"
    - name: primary_source
      type: integer
      description: "Source code (ref 0x14); 0x00=All"
    - name: secondary_source
      type: integer
      description: "Source code (ref 0x14)"

# ---- 0xCA.83 Power On Delay ----
- id: sysmenu_power_on_delay
  label: System Menu - Power On Delay (0xCA.83)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x83 {power_on_delay} {checksum}"
  params:
    - name: power_on_delay
      type: integer
      description: "Delay seconds (range per device menu)"

# ---- 0xCA.84 Synced Power On ----
- id: sysmenu_synced_power_on
  label: System Menu - Synced Power On (0xCA.84)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x84 {synced_power_on} {checksum}"
  params:
    - name: synced_power_on
      type: integer

# ---- 0xCA.85 Synced Power Off ----
- id: sysmenu_synced_power_off
  label: System Menu - Synced Power Off (0xCA.85)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x85 {synced_power_off} {checksum}"
  params:
    - name: synced_power_off
      type: integer

# ---- 0xCA.91 Power Button ----
- id: sysmenu_power_button
  label: System Menu - Power Button (0xCA.91)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x91 {power_button} {checksum}"
  params:
    - name: power_button
      type: integer
      description: "0x00=Power On Only,0x01=Power On/Off"

# ---- 0xCA.92 Touch Control Admin Lock ----
- id: sysmenu_touch_admin_lock
  label: System Menu - Touch Control Admin Lock (0xCA.92)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x92 {admin_lock} {checksum}"
  params:
    - name: admin_lock
      type: integer

# ---- 0xCA.93 DICOM Mode ----
- id: sysmenu_dicom_mode
  label: System Menu - DICOM Mode (0xCA.93)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0x93 {dicom_mode} {checksum}"
  params:
    - name: dicom_mode
      type: integer

# ---- 0xCA.A1 No Signal Power Off ----
- id: sysmenu_no_signal_power_off
  label: System Menu - No Signal Power Off (0xCA.A1)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0xA1 {no_signal_power_off} {checksum}"
  params:
    - name: no_signal_power_off
      type: integer
      description: "0x00=Off,0x01=15min,0x02=30min,0x03=60min,0x04=10min"

# ---- 0xCA.B0 Eco Sensor Minimal Backlight ----
- id: sysmenu_eco_sensor_minimal_backlight
  label: System Menu - Eco Sensor Minimal Backlight (0xCA.B0)
  kind: action
  command: "0xAA 0xCA {id} 0x02 0xB0 {minimal_backlight} {checksum}"
  params:
    - name: minimal_backlight
      type: integer

# ---- 0xD0 LED Product Feature (sub-commands) ----
- id: led_info
  label: LED Product - Get LED Info (0xD0.78)
  kind: query
  command: "0xAA 0xD0 {id} 0x01 0x78 {checksum}"
  params: []
- id: led_device_type
  label: LED Product - Device Type (0xD0.81)
  kind: query
  command: "0xAA 0xD0 {id} 0x01 0x81 {checksum}"
  params: []
- id: led_input_source_info
  label: LED Product - Input Source Info (0xD0.82)
  kind: query
  command: "0xAA 0xD0 {id} 0x01 0x82 {checksum}"
  params: []
- id: led_product_info
  label: LED Product - Product Info (0xD0.83)
  kind: query
  command: "0xAA 0xD0 {id} 0x01 0x83 {checksum}"
  params: []
- id: led_monitoring
  label: LED Product - Monitoring (0xD0.84)
  kind: query
  command: "0xAA 0xD0 {id} 0x01 0x84 {checksum}"
  params: []
- id: led_abl_mode
  label: LED Product - ABL Mode (0xD0.85)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x85 {abl_mode} {checksum}"
  params:
    - name: abl_mode
      type: integer
- id: led_scanning_rate_mode
  label: LED Product - Scanning Rate Mode (0xD0.86)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x86 {scanning_rate_mode} {checksum}"
  params:
    - name: scanning_rate_mode
      type: integer
      description: "0/1"
- id: led_lod_recheck
  label: LED Product - LOD ReCheck (0xD0.87)
  kind: action
  command: "0xAA 0xD0 {id} 0x01 0x87 {checksum}"
  params: []
- id: led_module_wb_control
  label: LED Product - Module WB(RGB) Control (0xD0.92)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x92 {module_wb} {checksum}"
  params:
    - name: module_wb
      type: integer
      description: "0/1"
- id: led_cabinet_cc_control
  label: LED Product - Cabinet CC(RGB) Control (0xD0.93)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x93 {cabinet_cc_data} {checksum}"
  params:
    - name: cabinet_cc_data
      type: string
- id: led_cabinet_backlight
  label: LED Product - Cabinet Backlight (0xD0.94)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x94 {cabinet_backlight} {checksum}"
  params:
    - name: cabinet_backlight
      type: integer
- id: led_cabinet_pixel_wb_cc
  label: LED Product - Cabinet Pixel WB(RGB) CC on/off (0xD0.95)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x95 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0/1"
- id: led_gamut_control
  label: LED Product - Gamut Control (0xD0.96)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x96 {gamut} {checksum}"
  params:
    - name: gamut
      type: integer
- id: led_cabinet_seam_correction
  label: LED Product - Cabinet Seam Correction (0xD0.97)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x97 {seam_correction} {checksum}"
  params:
    - name: seam_correction
      type: integer
- id: led_cabinet_seam_correction_onoff
  label: LED Product - Cabinet Seam Correction on/off (0xD0.98)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x98 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0/1"
- id: led_module_wb_onoff
  label: LED Product - Module WB(RGB) on/off (0xD0.99)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x99 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0/1"
- id: led_pixel_rgb_data_reload
  label: LED Product - Pixel RGB Data Reload (0xD0.9A)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x9A {reload_type} {checksum}"
  params:
    - name: reload_type
      type: integer
- id: led_block_wb_control
  label: LED Product - Block WB(RGB) Control (0xD0.9B)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x9B {block_wb_data} {checksum}"
  params:
    - name: block_wb_data
      type: string
- id: led_cabinet_wb_control
  label: LED Product - Cabinet WB(RGB) Control (0xD0.9C)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x9C {cabinet_wb_data} {checksum}"
  params:
    - name: cabinet_wb_data
      type: string
- id: led_block_wb_onoff
  label: LED Product - Block WB(RGB) on/off (0xD0.9D)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x9D {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0/1"
- id: led_cabinet_wb_onoff
  label: LED Product - Cabinet WB(RGB) on/off (0xD0.9E)
  kind: action
  command: "0xAA 0xD0 {id} 0x02 0x9E {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0/1"
- id: led_multiple_edge_offset
  label: LED Product - Multiple Edge Offset Control (0xD0.9F)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0x9F {edge_offset_data} {checksum}"
  params:
    - name: edge_offset_data
      type: string
- id: led_block_gradation_control
  label: LED Product - Block Gradation Control (0xD0.A2)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0xA2 {gradation_data} {checksum}"
  params:
    - name: gradation_data
      type: string
- id: led_block_gradation_onoff
  label: LED Product - Block Gradation On/Off (0xD0.A3)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0xA3 {value} {checksum}"
  params:
    - name: value
      type: string
- id: led_get_diagnosis_info
  label: LED Product - Get Diagnosis Info (0xD0.C2)
  kind: query
  command: "0xAA 0xD0 {id} {variable} 0xC2 {checksum}"
  params: []
- id: led_auto_id
  label: LED Product - Auto ID (0xD0.C3)
  kind: action
  command: "0xAA 0xD0 {id} {variable} 0xC3 {auto_id_data} {checksum}"
  params:
    - name: auto_id_data
      type: string

# ---- 0xD2 Large Sized Data Control ----
- id: large_data_file_download
  label: Large Sized Data - File Download & Install (0xD2.20)
  kind: action
  command: "0xAA 0xD2 {id} {variable} 0x20 {file_data} {checksum}"
  params:
    - name: file_data
      type: string
  # UNRESOLVED: detailed payload format truncated in source

# ---- 0xE0 Net PIP Command ----
- id: net_pip_command
  label: Net PIP Command
  kind: action
  command: "0xAA 0xE0 {id} {variable} {net_pip_data} {checksum}"
  params:
    - name: net_pip_data
      type: string
  # UNRESOLVED: detailed data format (15-19 byte channel info) truncated in source

# ---- 0xE4 Apply To Control ----
- id: apply_to_control
  label: Apply To Control
  kind: action
  command: "0xAA 0xE4 {id} 0x01 {apply_to} {checksum}"
  params:
    - name: apply_to
      type: integer
      description: "0/1"
  # UNRESOLVED: detail truncated in source

# ---- 0xF9 Panel On Off ----
- id: panel_on_off
  label: Panel On Off
  kind: action
  command: "0xAA 0xF9 {id} 0x01 {panel_on_off} {checksum}"
  params:
    - name: panel_on_off
      type: integer
      description: "0/1"

# ---- 0xFD Auto ID ----
- id: auto_id_setting
  label: Auto ID Setting
  kind: action
  command: "0xAA 0xFD {id} {variable} {auto_id_data} {checksum}"
  params:
    - name: auto_id_data
      type: string
  # UNRESOLVED: detail truncated in source

# ---- 0xFE White Balance MDC Control (sub-commands) ----
- id: white_balance_mode
  label: White Balance - Mode (0xFE.62)
  kind: action
  command: "0xAA 0xFE {id} 0x02 0x62 {wb_mode} {checksum}"
  params:
    - name: wb_mode
      type: integer
- id: white_balance_red_gain
  label: White Balance - Red Gain (0xFE.81)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0x81 {red_gain} {checksum}"
  params:
    - name: red_gain
      type: integer
- id: white_balance_green_gain
  label: White Balance - Green Gain (0xFE.91)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0x91 {green_gain} {checksum}"
  params:
    - name: green_gain
      type: integer
- id: white_balance_blue_gain
  label: White Balance - Blue Gain (0xFE.A1)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0xA1 {blue_gain} {checksum}"
  params:
    - name: blue_gain
      type: integer
- id: white_balance_red_offset
  label: White Balance - Red Offset (0xFE.B1)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0xB1 {red_offset} {checksum}"
  params:
    - name: red_offset
      type: integer
- id: white_balance_green_offset
  label: White Balance - Green Offset (0xFE.C1)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0xC1 {green_offset} {checksum}"
  params:
    - name: green_offset
      type: integer
- id: white_balance_blue_offset
  label: White Balance - Blue Offset (0xFE.D1)
  kind: action
  command: "0xAA 0xFE {id} {variable} 0xD1 {blue_offset} {checksum}"
  params:
    - name: blue_offset
      type: integer
  # UNRESOLVED: 0xFE sub-command value ranges/formats truncated in source
```

## Feedbacks
```yaml
# ACK/NAK reply framing (command 0xFF is the response code):
#   ACK: 0xAA 0xFF {id} {len} 'A' {r-cmd} {[r-subcmd]} {values...} {checksum}
#   NAK: 0xAA 0xFF {id} 0x03 'N' {r-cmd} {[r-subcmd]} {ERR} {checksum}
# 'A'=0x41 Ack, 'N'=0x4E Nak. ERR code is internal/model-dependent.

- id: ack
  type: ack
  description: "Acknowledgement: 0xAA 0xFF {id} {len} 'A' {r-cmd} {vals} {checksum}"

- id: nak
  type: nak
  description: "Negative acknowledgement: 0xAA 0xFF {id} 0x03 'N' {r-cmd} {ERR} {checksum}"

- id: power_state
  type: enum
  values: [off, on, reboot]
  description: "Returned in Status(0x00)/Maintenance(0x08) ack; settable via 0x11."

- id: volume_state
  type: integer
  values: [0, 100]

- id: mute_state
  type: enum
  values: [off, on]

- id: input_source_state
  type: enum
  description: "Source codes per 0x14."

- id: panel_on_time
  type: integer
  description: "Minutes (increments every 10 min), 0x83 reply."

- id: temperature_state
  type: integer
  description: "Current device temp -60..125 C, 0x0D reply."

- id: fan_error_state
  type: enum
  values: [normal, error, not_supported]
  description: "0x0D FAN Error val: 0x00 Normal,0x01 Error,0x02 Not supported."

- id: lamp_error_state
  type: enum
  values: [normal, error]

- id: temperature_error_state
  type: enum
  values: [normal, error]

# UNRESOLVED: many query replies carry multi-field structs (Maintenance, Sound,
# Ticker, Timer, etc.) - full per-field feedback enumeration not split out; refer
# to each query action's note for the returned value set.
```

## Variables
```yaml
# Settable scalar parameters exposed as discrete actions (see Actions):
# volume (0x12), contrast (0x24/0x37), brightness (0x25/0x38), sharpness (0x26),
# color (0x27), tint (0x28), color_temp (0x3F), manual_lamp (0x58), fan_speed (0x44),
# EQ bands (0x51-0x55, 0xC9.82-85), panel_on_time is read-only.
# No separate variable entries required - all settable values are action params.
```

## Events
```yaml
# No unsolicited notifications documented in source. Device only replies to commands (ACK/NAK).
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power Control (0x11) over RJ45: after PowerOn reconnect socket after 10 sec."
  - "PowerOn/PowerOff must retry 3x every 2 seconds until ACK; no ACK within 3 tries = failure."
  - "Power Off over RJ45 with Network Standby Off (DMD/DBD/DHD/UED/DMD-S): must transmit WOL protocol instead of MDC for Power On."
  - "Safety Lock (0x5D), All Keys Lock (0x77), Panel Key Lock (0x5F), Remote Control (0x36): operate regardless of power on/off."
  - "0x0D Display Status may take over 1 sec to reply on some product specs."
# UNRESOLVED: no explicit interlock voltage/power sequencing warnings stated for these PDP models.
```

## Notes
- Source is the Samsung MDC common protocol spec (SEC-VD-DSW Ver. 15.0, 2020-11-06), covering displays from 2007-2020. The P63FP/P50HP are PDP models (model codes 0x1B P63F/P63FP, 0x2B P50HP, 0x2C P50FP, 0x2D P63FP, 0x38 P50HP-2, 0x39 P63FP-2).
- RS232: 9-pin DB-9, only pins 2 (RxD), 3 (TxD), 5 (GND) used. Device distance < 4m. Daisy-chain via RS232-Out. IDs 0-253, no duplicates. Broadcast ID = 0xFE (sets obey, no ACK).
- RJ45: MDC protocol carried in TCP/IP data area, framing identical to RS232. Default IP 192.168.0.10, port 1515. IDs may duplicate on RJ45.
- Checksum = sum of (cmd + id + data_length + all data) mod 256, header 0xAA excluded (discard carry beyond two hex digits). Example: `0xAA 0x11 0xFE 0x01 0x01` → 0x11+0xFE+0x01+0x01 = 0x111 → checksum 0x11.
- Hong Kong Airport (HKIA) protocol option: OSD On/Off (0x70) ACK/NAK returned in opposite way.
- Safety Screen All White (0x09) and Pattern (0x0A) types are PDP-only.
- `{id}` and `{checksum}` placeholders in `command` templates are runtime-computed. `{variable}` denotes a command-dependent data length.
- Commands 0x01, 0x02, 0x03, 0x05, 0x0A (older TV-only), and several Smart Signage-removed commands (0x0A, 0x1F[old], 0x20-0x23, 0x35, 0x39-0x3A, 0x3B, 0x46, 0x49, 0x82, 0x98-0x9B per rev 12.9) are excluded — not applicable to these LFD/PDP models or removed from Smart Signage.
- Equalizer menu mapping: menu 0 = 0x0A, menu -10 = 0x00, menu +10 = 0x14.
- AM/PM convention (document-wide): AM = 1, PM = 0.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact command subset supported by P63FP/P50HP is model-dependent and not determinable from the common protocol spec alone — needs the device-specific user manual. -->
<!-- UNRESOLVED: refined source truncated at 0xD0.84; payloads for 0xD2.20, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE subs, 0xFF beyond framing are documented only in the command table — value formats need the full unabridged protocol PDF. -->
<!-- UNRESOLVED: no auth mechanism described, but network (RJ45) access control not specified — auth.type:none inferred from absence of login procedure. -->

## Provenance

```yaml
source_domains:
  - vgavro.github.io
  - image-us.samsung.com
  - manua.ls
  - manualowl.com
  - manualslib.com
source_urls:
  - https://vgavro.github.io/samsung-mdc/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://www.manua.ls/samsung/p63fp/manual
  - https://www.manualowl.com/m/Samsung/P63FP/Manual/50424
  - https://www.manualslib.com/manual/422069/Samsung-P63f-63-Plasma-Panel.html
retrieved_at: 2026-08-11T05:05:19.202Z
last_checked_at: 2026-08-19T09:44:55.472Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:44:55.472Z
matched_actions: 225
action_count: 225
confidence: medium
summary: "Every spec action's hex opcode+subcommand appears verbatim in the source command table; transport values match source verbatim. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command support is model-dependent — the source repeatedly states \"Depends on each model spec, a certain command will be supported or not.\" Exact subset supported by P63FP/P50HP cannot be determined without the device-specific user manual. Later/LED-only commands (0xD0 LED Product Feature, 0x21 HDR/Picture subs, SBOX modes) do not apply to these PDP displays but are enumerated because the common source documents them. The refined source is truncated at command 0xD0.84; payloads for 0xD0.85+, 0xD2, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE, 0xFF are documented only in the command table — detail marked UNRESOLVED."
- "detailed payload format truncated in source"
- "detailed data format (15-19 byte channel info) truncated in source"
- "detail truncated in source"
- "0xFE sub-command value ranges/formats truncated in source"
- "many query replies carry multi-field structs (Maintenance, Sound,"
- "no explicit interlock voltage/power sequencing warnings stated for these PDP models."
- "firmware version compatibility not stated in source."
- "exact command subset supported by P63FP/P50HP is model-dependent and not determinable from the common protocol spec alone — needs the device-specific user manual."
- "refined source truncated at 0xD0.84; payloads for 0xD2.20, 0xE0, 0xE4, 0xF9, 0xFD, 0xFE subs, 0xFF beyond framing are documented only in the command table — value formats need the full unabridged protocol PDF."
- "no auth mechanism described, but network (RJ45) access control not specified — auth.type:none inferred from absence of login procedure."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
