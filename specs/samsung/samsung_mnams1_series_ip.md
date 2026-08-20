---
spec_id: admin/samsung-mnams1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung MNAMS1 Series MDC Control Spec"
manufacturer: Samsung
model_family: "MNAMS1 Series (Samsung Multiple Display Control family, MFM / LFD / Signage)"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "MNAMS1 Series (Samsung Multiple Display Control family, MFM / LFD / Signage)"
    - UE46A/UE55A/ME40A/ME46A/ME55A/DE40A/DE46A/DE55A
    - MD32B/MD40B/MD46B/MD55B/ME32B/ME40B/ME46B/ME55B/ME65B/ME75B
    - SL46B
    - "SyncMaster UD55A"
    - DE40C/DE46C/DE55C/UD46C/UD55C/UE46C/UE55C
    - "SyncMaster UD22A"
    - "SyncMaster NL22B"
    - MD32C/MD40C/MD46C/MD55C/ME95C
    - ED32C/ED40C/ED46C/ED55C/ED65C/ED75C/ED32D/ED40D/ED46D/ED55D/ED65D/ED75D
    - "SyncMaster LE32C/LE46C/LE55C"
    - "SyncMaster UD46C-B"
    - ME32C/ME40C/ME46C/ME55C
    - "SyncMaster UD55C-B"
    - DB22D/DB32D/DB40D/DB48D/DB55D/DM32D/OH46D/OH55D
    - DM40D/DM48D/DM55D/DM65D/DM75D/UE46D/UE55D/DH40D/DH48D/DH55D/OM46D/OM55D/OM75D
    - EB40D/EB48D
    - "SyncMaster QM55D/QM85D/QM50D/QM40D/QM105D"
    - EM65E/EM75E/ED65E/ED75E
    - DH40E/DH48E/DH55E/DM32E/DM40E/DM48E/DM55E/DM65E/DM75E/DB32E/DB40E/DB48E/DB55E/DM65E-BR/DM75E-BR/DM82E-BR/PE40E/PE46E/PE55E/DM10E/OHE/OME/MLE/SHF/UD46E-P/UD55E-P/UD55E-S
    - RH48E/RH55E
    - "SyncMaster UD46E-B/UD55E-B/UD46E-C/UD46E-A/UD55E-A/UH55F-E/UM55H-E/UH46N-E/UM46N-E"
    - IL015E/IL025E/IL20E/ILF/ISF
    - SBB-ES
    - DC32E/DC40E/DC48E/DC55E
    - OM24E/OH24E/OH75E
    - SBB-MT
    - DC32E-M/DC40E-M/DC48E-M/DC55E-M/DC32E-H/DC40E-H/DC48E-H/DC55E-H
    - QM49F/QM55F/QM65F/QM75F/QM98F
    - PM32F/PM43F/PM49F/PM55F/PH43F/PH49F/PF55F/ML55F-R/PH43F-P/PH49F-P/PH55F-P/PM43H/PM49H/PM55H
    - OM46F/OM55F/OH46F/OH55F
    - DC90F
    - UH46F5
    - OH85F
    - DC43H/DC49H/DC55H
    - QMH/QHH/PMJ/PHJ/PBJ
    - IFH
    - OHH
    - RM49H
    - DC43J/DC49J
    - QMN/QBN/QEN/QHR/QMR/QMR-N/QBR/QBR-N/QBR-T/SHR/QET
    - OHN/OHN-K/OHN-D/OHN-DK/OMN-D/OHF-S
    - VMRNU
    - QER/QPR-8K
    - BE43R/BE49R
    - VH55R-R/VMT-U/VHT-E/VMT-E
    - OMR
    - QPT-8K
    - QPA-8K/QPAN8K
    - QMA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - aca.im
source_urls:
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-08-11T00:06:36.696Z
last_checked_at: 2026-08-19T09:43:05.949Z
generated_at: 2026-08-19T09:43:05.949Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility per model is not stated in source; supported commands vary by model spec per vendor notes."
  - "firmware version compatibility ranges per model not stated; error code semantics (NAK ERR byte) not specified for each command; Wall_Sno max (225) only applies to 15x15 video wall models."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:43:05.949Z
  matched_actions: 392
  action_count: 392
  confidence: medium
  summary: "All 392 spec actions match wire-literal command tokens in the refined source command table; transport parameters (9600 8N1, port 1515, IP 192.168.0.10) verified verbatim. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Samsung MNAMS1 Series MDC Control Spec

## Summary
Samsung Multiple Display Control (MDC) protocol for Samsung LFD / MFM / Signage displays supporting both RS-232C (DB-9, 9600 8N1) and RJ45 TCP/IP (default 192.168.0.10:1515). Each framed packet starts with `0xAA` header followed by command opcode, ID, data length, payload and checksum. Covers status, power, input, picture, sound, timer, video wall, LED product and many sub-features.

<!-- UNRESOLVED: firmware compatibility per model is not stated in source; supported commands vary by model spec per vendor notes. -->

## Transport
```yaml
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
  port: 1515
  default_ip: 192.168.0.10  # source stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power Control (0x11)
- routable        # inferred from Input Source Control (0x14)
- queryable       # inferred from many status query commands
- levelable       # inferred from Volume (0x12) / brightness / equalizer commands
```

## Actions
```yaml
# Frame format: 0xAA | CMD | ID | DataLength | Data... | Checksum
# Checksum = sum of all preceding bytes, dropping carries beyond low byte.
# 0xFE as ID targets all displays without ACK.

# ---------- Common ----------
- id: status_control_get
  label: Status Control (get)
  kind: query
  command: "AA 00 ID 00 CS"   # literal
  params: []

- id: video_control_get
  label: Video Control (get)
  kind: query
  command: "AA 04 ID 00 CS"
  params: []

- id: rgb_control_get
  label: RGB Control (get, PC/BNC/DVI only)
  kind: query
  command: "AA 06 ID 00 CS"
  params: []

- id: pip_status_get
  label: PIP Status (get)
  kind: query
  command: "AA 07 ID 00 CS"
  params: []

- id: maintenance_control_get
  label: Maintenance Control (get)
  kind: query
  command: "AA 08 ID 00 CS"
  params: []

- id: sound_control_get_type1
  label: Sound Control (get, Type 1)
  kind: query
  command: "AA 09 ID 00 CS"
  params: []

- id: sound_control_get_type2
  label: Sound Control (get, Type 2 with 200/500/2k/5k Hz)
  kind: query
  command: "AA 09 ID 00 CS"
  params: []

- id: serial_number_get
  label: Serial Number (get)
  kind: query
  command: "AA 0B ID 00 CS"
  params: []

- id: display_status_get
  label: Display Status (lamp/temp/bright sensor/no-sync/fan)
  kind: query
  command: "AA 0D ID 00 CS"
  params: []

- id: sw_version_get
  label: SW Version (get)
  kind: query
  command: "AA 0E ID 00 CS"
  params: []

- id: auto_motion_plus_set
  label: Auto Motion Plus (set)
  kind: action
  command: "AA 0F ID 03 Mode BlurReduction JudderReduction CS"
  params:
    - name: mode
      type: integer
      description: 0x00 Off / 0x01 Clear / 0x02 Standard / 0x03 Smooth / 0x04 Custom / 0x05 Demo / 0x06 Auto
    - name: blur_reduction
      type: integer
      description: 0..10 (only for Custom)
    - name: judder_reduction
      type: integer
      description: 0..10 (only for Custom)

- id: auto_motion_plus_get
  label: Auto Motion Plus (get)
  kind: query
  command: "AA 0F ID 00 CS"
  params: []

- id: model_number_get
  label: Model Number / Species / TV flag (get)
  kind: query
  command: "AA 10 ID 00 CS"
  params: []

- id: power_control_get
  label: Power Control (get)
  kind: query
  command: "AA 11 ID 00 CS"
  params: []

- id: power_control_set
  label: Power Control (set)
  kind: action
  command: "AA 11 ID 01 Power CS"
  params:
    - name: power
      type: integer
      description: 0x00 Off / 0x01 On / 0x02 Reboot

- id: volume_get
  label: Volume (get)
  kind: query
  command: "AA 12 ID 00 CS"
  params: []

- id: volume_set
  label: Volume (set)
  kind: action
  command: "AA 12 ID 01 Volume CS"
  params:
    - name: volume
      type: integer
      description: 0..100

- id: mute_get
  label: Mute (get)
  kind: query
  command: "AA 13 ID 00 CS"
  params: []

- id: mute_set
  label: Mute (set)
  kind: action
  command: "AA 13 ID 01 Mute CS"
  params:
    - name: mute
      type: integer
      description: 0x00 Off / 0x01 On

- id: input_source_get
  label: Input Source (get)
  kind: query
  command: "AA 14 ID 00 CS"
  params: []

- id: input_source_set
  label: Input Source (set)
  kind: action
  command: "AA 14 ID 01 Input CS"
  params:
    - name: input
      type: integer
      description: "0x04 S-Video / 0x08 Component / 0x0C AV1 / 0x0D AV2 / 0x0E Ext.SCART1 / 0x18 DVI / 0x14 PC / 0x1E BNC / 0x1F DVI_VIDEO / 0x20 Magicinfo / 0x21 HDMI1 / 0x22 HDMI1_PC / 0x23 HDMI2 / 0x24 HDMI2_PC / 0x25 DP1 / 0x26 DP2 / 0x27 DP3 / 0x31 HDMI3 / 0x32 HDMI3_PC / 0x33 HDMI4 / 0x34 HDMI4_PC / 0x40 TV(DTV) / 0x50 PlugInModule / 0x55 HDBaseT / 0x56 OCM / 0x60 Media/MagicInfoS / 0x61 WiDi/ScreenMirroring / 0x62 Internal/USB / 0x63 URL Launcher / 0x64 IWB / 0x65 Web Browser / 0x66 Remote Workspace"

- id: picture_size_get
  label: Picture Size / Aspect (get)
  kind: query
  command: "AA 15 ID 00 CS"
  params: []

- id: picture_size_set
  label: Picture Size / Aspect (set)
  kind: action
  command: "AA 15 ID 01 Aspect CS"
  params:
    - name: aspect
      type: integer
      description: "PC: 0x10 16:9 / 0x18 4:3 / 0x20 Original / 0x21 21:9 / 0x22 Custom. Video: 0x00 AutoWide / 0x01 16:9 / 0x04 Zoom / 0x05 Zoom1 / 0x06 Zoom2 / 0x09 JustScan / 0x0B 4:3 / 0x0C WideFit / 0x0D Custom / 0x0E SmartView1 / 0x0F SmartView2 / 0x31 WideZoom / 0x32 21:9"

- id: direct_channel_set
  label: Direct Channel (DTV, set)
  kind: action
  command: "AA 17 ID 08 Country ATV_DTV AirCable CH_NUM_H CH_NUM_L Sel_Minor Minor_CH_H Minor_CH_L CS"
  params: []

- id: direct_channel_get
  label: Direct Channel (DTV, get)
  kind: query
  command: "AA 17 ID 00 CS"
  params: []

- id: screen_mode_get
  label: Screen Mode (get)
  kind: query
  command: "AA 18 ID 00 CS"
  params: []

- id: screen_mode_set
  label: Screen Mode (set)
  kind: action
  command: "AA 18 ID 01 ScrMode CS"
  params:
    - name: scrmode
      type: integer
      description: "0x01 16:9 / 0x04 Zoom / 0x0B 4:3 / 0x31 Wide Zoom"

- id: screen_size_get
  label: Screen Size (get, inches)
  kind: query
  command: "AA 19 ID 00 CS"
  params: []

- id: outdoor_mode_get
  label: Outdoor Mode (get, 0x1A 0x81)
  kind: query
  command: "AA 1A ID 01 81 CS"
  params: []

- id: outdoor_mode_set
  label: Outdoor Mode (set, 0x1A 0x81)
  kind: action
  command: "AA 1A ID 02 81 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0x00 Off / 0x01 On

- id: heatex_fan_speed_set
  label: Internal HeatEx Fan Speed (0x1A 0x82)
  kind: action
  command: "AA 1A ID 02 82 FanSpeed CS"
  params:
    - name: fan_speed
      type: integer
      description: 0..100

- id: network_config_get
  label: Network Configuration (0x1B 0x82 get)
  kind: query
  command: "AA 1B ID 01 82 CS"
  params: []

- id: network_config_set
  label: Network Configuration (0x1B 0x82 set: IP/Subnet/GW/DNS)
  kind: action
  command: "AA 1B ID 11 82 IP1 IP2 IP3 IP4 SN1 SN2 SN3 SN4 GW1 GW2 GW3 GW4 DNS1 DNS2 DNS3 DNS4 CS"
  params: []

- id: network_ip_mode_get
  label: Network IP Mode (0x1B 0x85 get)
  kind: query
  command: "AA 1B ID 01 85 CS"
  params: []

- id: network_ip_mode_set
  label: Network IP Mode (0x1B 0x85 set)
  kind: action
  command: "AA 1B ID 02 85 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0x00 Dynamic / 0x01 Static

- id: network_ap_config_set
  label: Network Access Point (0x1B 0x8A set: SSID+Password)
  kind: action
  command: "AA 1B ID Variable 8A Code1 Code1Data... CodeN CodeNData CS"
  params:
    - name: ssid
      type: string
    - name: password
      type: string

- id: weekly_restart_set
  label: Weekly Restart (0x1B 0xA2 set)
  kind: action
  command: "AA 1B ID 04 A2 WeekDay Time Min CS"
  params: []

- id: check_software_version_get
  label: Check Software Version (0x1B 0xA4 get)
  kind: query
  command: "AA 1B ID 01 A4 CS"
  params: []

- id: magicinfo_channel_set
  label: MagicInfo Channel (0x1C 0x81 set)
  kind: action
  command: "AA 1C ID 03 81 DCH_H DCH_L CS"
  params:
    - name: channel
      type: integer
      description: "Channel number (2 bytes)"

- id: magicinfo_server_url_set
  label: MagicInfo Server URL/Port (0x1C 0x82)
  kind: action
  command: "AA 1C ID Variable 82 URL_ASCII_Data... CS"
  params:
    - name: url
      type: string
      description: ASCII URL up to 252 bytes e.g. http://10.88.8.73:7001

- id: magicinfo_orientation_set
  label: MagicInfo Content Orientation (0x1C 0x83)
  kind: action
  command: "AA 1C ID 02 83 Orientation CS"
  params:
    - name: orientation
      type: integer
      description: "Orientation mode"

- id: mdc_connection_type_get
  label: MDC Connection Type (0x1D get)
  kind: query
  command: "AA 1D ID 00 CS"
  params: []

- id: mdc_connection_type_set
  label: MDC Connection Type (0x1D set)
  kind: action
  command: "AA 1D ID 01 ConnType CS"
  params:
    - name: conn_type
      type: integer
      description: "0x00 RS232C MDC / 0x01 RJ45 MDC"

- id: still_control_get
  label: Still Control (0x1F get)
  kind: query
  command: "AA 1F ID 00 CS"
  params: []

- id: still_control_set
  label: Still Control (0x1F set)
  kind: action
  command: "AA 1F ID 01 Still CS"
  params:
    - name: still
      type: integer
      description: "0x00 Off / 0x01 On"

# ---------- 0x21 Picture Control sub-commands ----------
- id: picture_led_size_get
  label: Picture LED Picture Size (0x21 0x01 get)
  kind: query
  command: "AA 21 ID 01 01 CS"
  params: []

- id: picture_led_size_set
  label: Picture LED Picture Size (0x21 0x01 set)
  kind: action
  command: "AA 21 ID 02 01 LEDSize CS"
  params:
    - name: led_size
      type: integer
      description: 0x00 Original / 0x01 Custom

- id: picture_custom_fit_size_get
  label: Picture Size Custom Fit Size (0x21 0x02 get)
  kind: query
  command: "AA 21 ID 01 02 CS"
  params: []

- id: picture_custom_fit_size_set
  label: Picture Size Custom Fit Size (0x21 0x02 set)
  kind: action
  command: "AA 21 ID 05 02 Width_H Width_L Height_H Height_L CS"
  params: []

- id: picture_hdr_inverse_tone_get
  label: HDR Inverse Tone Mapping (0x21 0x03 get)
  kind: query
  command: "AA 21 ID 01 03 CS"
  params: []

- id: picture_hdr_inverse_tone_set
  label: HDR Inverse Tone Mapping (0x21 0x03 set)
  kind: action
  command: "AA 21 ID 02 03 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0x00 Off / 0x01 On

- id: picture_hdr_dynamic_peaking_get
  label: HDR Dynamic Peaking (0x21 0x04 get)
  kind: query
  command: "AA 21 ID 01 04 CS"
  params: []

- id: picture_hdr_dynamic_peaking_set
  label: HDR Dynamic Peaking (0x21 0x04 set)
  kind: action
  command: "AA 21 ID 02 04 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: picture_hdr_color_mapping_get
  label: HDR Color Mapping (0x21 0x05 get)
  kind: query
  command: "AA 21 ID 01 05 CS"
  params: []

- id: picture_hdr_color_mapping_set
  label: HDR Color Mapping (0x21 0x05 set)
  kind: action
  command: "AA 21 ID 02 05 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: picture_fit_to_screen_get
  label: Picture Fit To Screen (0x21 0x06 get)
  kind: query
  command: "AA 21 ID 01 06 CS"
  params: []

- id: picture_fit_to_screen_set
  label: Picture Fit To Screen (0x21 0x06 set)
  kind: action
  command: "AA 21 ID 02 06 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: picture_hdmi_uhd_color_set
  label: HDMI UHD Color (0x21 0x07)
  kind: action
  command: "AA 21 ID Variable 07 Source1 UHD1 ... SourceN UHDN CS"
  params: []

- id: picture_fhd_uhd_out_get
  label: FHD/UHD out control (0x21 0x08 get)
  kind: query
  command: "AA 21 ID 01 08 CS"
  params: []

- id: picture_fhd_uhd_out_set
  label: FHD/UHD out control (0x21 0x08 set)
  kind: action
  command: "AA 21 ID 02 08 Output CS"
  params:
    - name: output
      type: integer
      description: 0x00 FHD / 0x01 UHD

- id: picture_live_mode_get
  label: Live Mode (0x21 0x09 get)
  kind: query
  command: "AA 21 ID 01 09 CS"
  params: []

- id: picture_live_mode_set
  label: Live Mode (0x21 0x09 set)
  kind: action
  command: "AA 21 ID 02 09 Live CS"
  params:
    - name: live
      type: integer
      description: 0x00 Normal / 0x01 Live

- id: picture_hdr_dynamic_range_get
  label: HDR Dynamic Range Extension (0x21 0x0A get)
  kind: query
  command: "AA 21 ID 01 0A CS"
  params: []

- id: picture_hdr_dynamic_range_set
  label: HDR Dynamic Range Extension (0x21 0x0A set)
  kind: action
  command: "AA 21 ID 02 0A Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 Off / 0x01 Low / 0x02 Medium / 0x03 High"

- id: picture_screen_position_get
  label: Screen Position (0x21 0x0B get)
  kind: query
  command: "AA 21 ID 01 0B CS"
  params: []

- id: picture_screen_position_set
  label: Screen Position (0x21 0x0B set)
  kind: action
  command: "AA 21 ID 05 0B X_H X_L Y_H Y_L CS"
  params: []

- id: picture_multilink_hdr_get
  label: HDR MultiLink HDR (0x21 0x0C get)
  kind: query
  command: "AA 21 ID 01 0C CS"
  params: []

- id: picture_multilink_hdr_set
  label: HDR MultiLink HDR (0x21 0x0C set)
  kind: action
  command: "AA 21 ID 04 0C Mode TotalDevNum DevID CS"
  params: []

- id: picture_color_enhancement_get
  label: Color Enhancement (0x21 0x50 get)
  kind: query
  command: "AA 21 ID 01 50 CS"
  params: []

- id: picture_color_enhancement_set
  label: Color Enhancement (0x21 0x50 set)
  kind: action
  command: "AA 21 ID 02 50 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: picture_dynamic_backlight_get
  label: Dynamic Backlight (0x21 0x51 get)
  kind: query
  command: "AA 21 ID 01 51 CS"
  params: []

- id: picture_dynamic_backlight_set
  label: Dynamic Backlight (0x21 0x51 set)
  kind: action
  command: "AA 21 ID 02 51 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 Off / 0x01 On(Low) / 0x02 Standard / 0x03 High"

- id: picture_fit_to_screen_52_get
  label: Fit To Screen (0x21 0x52 get)
  kind: query
  command: "AA 21 ID 01 52 CS"
  params: []

- id: picture_fit_to_screen_52_set
  label: Fit To Screen (0x21 0x52 set)
  kind: action
  command: "AA 21 ID 02 52 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x02 Auto"

- id: picture_uniformity_get
  label: Uniformity (0x21 0x53 get)
  kind: query
  command: "AA 21 ID 01 53 CS"
  params: []

- id: picture_uniformity_set
  label: Uniformity (0x21 0x53 set)
  kind: action
  command: "AA 21 ID 02 53 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: picture_gamma_mode_get
  label: Gamma Mode (0x21 0x54 get)
  kind: query
  command: "AA 21 ID 01 54 CS"
  params: []

- id: picture_gamma_mode_set
  label: Gamma Mode (0x21 0x54 set)
  kind: action
  command: "AA 21 ID 02 54 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 HLG / 0x01 ST.2084 / 0x02 BT.1886 / 0x03 S Curve"

- id: picture_black_equalizer_get
  label: Black Equalizer (0x21 0x55 get)
  kind: query
  command: "AA 21 ID 01 55 CS"
  params: []

- id: picture_black_equalizer_set
  label: Black Equalizer (0x21 0x55 set)
  kind: action
  command: "AA 21 ID 02 55 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 Off / 0x01 Low / 0x02 High"

- id: picture_hdr_plus_get
  label: HDR+ (0x21 0x56 get)
  kind: query
  command: "AA 21 ID 01 56 CS"
  params: []

- id: picture_hdr_plus_set
  label: HDR+ (0x21 0x56 set)
  kind: action
  command: "AA 21 ID 02 56 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0x00 Off / 0x01 On

# ---------- Simple picture scalars ----------
- id: contrast_get
  label: Contrast (get)
  kind: query
  command: "AA 24 ID 00 CS"
  params: []

- id: contrast_set
  label: Contrast (set)
  kind: action
  command: "AA 24 ID 01 Contrast CS"
  params:
    - name: contrast
      type: integer
      description: 0..100

- id: brightness_get
  label: Brightness (get)
  kind: query
  command: "AA 25 ID 00 CS"
  params: []

- id: brightness_set
  label: Brightness (set)
  kind: action
  command: "AA 25 ID 01 Brightness CS"
  params:
    - name: brightness
      type: integer
      description: 0..100

- id: sharpness_get
  label: Sharpness (get)
  kind: query
  command: "AA 26 ID 00 CS"
  params: []

- id: sharpness_set
  label: Sharpness (set)
  kind: action
  command: "AA 26 ID 01 Sharpness CS"
  params:
    - name: sharpness
      type: integer
      description: 0..100

- id: color_get
  label: Color (get)
  kind: query
  command: "AA 27 ID 00 CS"
  params: []

- id: color_set
  label: Color (set)
  kind: action
  command: "AA 27 ID 01 Color CS"
  params:
    - name: color
      type: integer
      description: 0..100

- id: tint_get
  label: Tint (get)
  kind: query
  command: "AA 28 ID 00 CS"
  params: []

- id: tint_set
  label: Tint (set)
  kind: action
  command: "AA 28 ID 01 Tint CS"
  params:
    - name: tint
      type: integer
      description: 0..100, 50-step

- id: coarse_set
  label: Coarse (PC source, VideoWall on, 0x2F)
  kind: action
  command: "AA 2F ID 01 Coarse CS"
  params:
    - name: coarse
      type: integer
      description: 0x00 Decrease / 0x01 Increase

- id: fine_set
  label: Fine (PC source, VideoWall on, 0x30)
  kind: action
  command: "AA 30 ID 01 Fine CS"
  params:
    - name: fine
      type: integer
      description: 0x00 Decrease / 0x01 Increase

- id: h_position_get
  label: H-Position (get, 0x31)
  kind: query
  command: "AA 31 ID 00 CS"
  params: []

- id: h_position_set
  label: H-Position (set, 0x31)
  kind: action
  command: "AA 31 ID 01 HPos CS"
  params:
    - name: hpos
      type: integer
      description: 0x00 Left / 0x01 Right

- id: v_position_get
  label: V-Position (get, 0x32)
  kind: query
  command: "AA 32 ID 00 CS"
  params: []

- id: v_position_set
  label: V-Position (set, 0x32)
  kind: action
  command: "AA 32 ID 01 VPos CS"
  params:
    - name: vpos
      type: integer
      description: 0x00 Up / 0x01 Down

- id: auto_power_set
  label: Auto Power (0x33)
  kind: action
  command: "AA 33 ID 01 AutoPower CS"
  params:
    - name: auto_power
      type: integer
      description: 0x00 Off / 0x01 On

- id: clear_menu_set
  label: Clear Menu (0x34 set)
  kind: action
  command: "AA 34 ID 01 00 CS"
  params: []

- id: remote_control_set
  label: Remote Control Enable (0x36)
  kind: action
  command: "AA 36 ID 01 RMC CS"
  params:
    - name: rmc
      type: integer
      description: 0x00 Disable / 0x01 Enable

- id: rgb_contrast_get
  label: RGB Contrast (get, PC/BNC/DVI, 0x37)
  kind: query
  command: "AA 37 ID 00 CS"
  params: []

- id: rgb_contrast_set
  label: RGB Contrast (set, 0x37)
  kind: action
  command: "AA 37 ID 01 Contrast CS"
  params:
    - name: contrast
      type: integer
      description: 0..100

- id: rgb_brightness_get
  label: RGB Brightness (get, 0x38)
  kind: query
  command: "AA 38 ID 00 CS"
  params: []

- id: rgb_brightness_set
  label: RGB Brightness (set, 0x38)
  kind: action
  command: "AA 38 ID 01 Brightness CS"
  params:
    - name: brightness
      type: integer
      description: 0..100

- id: pip_on_off_get
  label: PIP On/Off (get, 0x3C)
  kind: query
  command: "AA 3C ID 00 CS"
  params: []

- id: pip_on_off_set
  label: PIP On/Off (set, 0x3C)
  kind: action
  command: "AA 3C ID 01 PIP CS"
  params:
    - name: pip
      type: integer
      description: 0x00 Off / 0x01 On

- id: auto_adjustment_set
  label: Auto Adjustment (0x3D set)
  kind: action
  command: "AA 3D ID 01 00 CS"
  params: []

- id: color_tone_get
  label: Color Tone (get, 0x3E)
  kind: query
  command: "AA 3E ID 00 CS"
  params: []

- id: color_tone_set
  label: Color Tone (set, 0x3E)
  kind: action
  command: "AA 3E ID 01 ColorTone CS"
  params:
    - name: color_tone
      type: integer
      description: "0x00 Cool2 / 0x01 Cool1 / 0x02 Normal / 0x03 Warm1 / 0x04 Warm2 / 0x05 Natural / 0x50 Off"

- id: color_temperature_get
  label: Color Temperature (get, 0x3F)
  kind: query
  command: "AA 3F ID 00 CS"
  params: []

- id: color_temperature_set
  label: Color Temperature (set, 0x3F)
  kind: action
  command: "AA 3F ID 01 CTemp CS"
  params:
    - name: ctemp
      type: integer
      description: "0x00..0x0A 5000K..15000K / 0xFD 2800K / 0xFE 3000K / 0xFF 4000K. Extended table maps e.g. 0x1C=2800K, 0x96=15000K."

- id: pip_source_get
  label: PIP Source (get, 0x40)
  kind: query
  command: "AA 40 ID 00 CS"
  params: []

- id: pip_source_set
  label: PIP Source (set, 0x40)
  kind: action
  command: "AA 40 ID 01 PSource CS"
  params:
    - name: p_source
      type: integer
      description: Input source code per 0x14

- id: pip_size_get
  label: PIP Size (get, 0x42)
  kind: query
  command: "AA 42 ID 00 CS"
  params: []

- id: pip_size_set
  label: PIP Size (set, 0x42)
  kind: action
  command: "AA 42 ID 01 PSize CS"
  params:
    - name: p_size
      type: integer
      description: "0x00 Off / 0x04 Double1 / 0x05 Double2 / 0x06 Medium / 0x07 Large / 0x08 Small / 0x09 Double3(POP) / 0x10 Custom"

- id: pip_locate_set
  label: PIP Locate (0x43 set)
  kind: action
  command: "AA 43 ID 01 PLocate CS"
  params:
    - name: p_locate
      type: integer
      description: "0x00 Off(GetOnly) / 0x01 UpperLeft / 0x02 UpperRight / 0x03 LowerRight / 0x04 LowerLeft"

- id: fan_speed_set
  label: Fan Speed (0x44 set)
  kind: action
  command: "AA 44 ID 01 FanSpeed CS"
  params:
    - name: fan_speed
      type: integer
      description: 0..100

- id: user_auto_color_set
  label: User Auto Color (0x45 set)
  kind: action
  command: "AA 45 ID 01 Cmd CS"
  params:
    - name: cmd
      type: integer
      description: 0x00 Reset / 0x01 Auto Color

- id: sound_select_get
  label: Sound Select (get, 0x47)
  kind: query
  command: "AA 47 ID 00 CS"
  params: []

- id: sound_select_set
  label: Sound Select (set, 0x47)
  kind: action
  command: "AA 47 ID 01 SSelect CS"
  params:
    - name: s_select
      type: integer
      description: 0x00 Sub / 0x01 Main

- id: auto_volume_get
  label: Auto Volume (get, 0x48)
  kind: query
  command: "AA 48 ID 00 CS"
  params: []

- id: auto_volume_set
  label: Auto Volume (set, 0x48)
  kind: action
  command: "AA 48 ID 01 AVol CS"
  params:
    - name: a_vol
      type: integer
      description: 0x00 Off / 0x01 Normal / 0x02 Night

- id: standby_get
  label: Standby / DPMS (get, 0x4A)
  kind: query
  command: "AA 4A ID 00 CS"
  params: []

- id: standby_set
  label: Standby / DPMS (set, 0x4A)
  kind: action
  command: "AA 4A ID 01 Standby CS"
  params:
    - name: standby
      type: integer
      description: 0x00 Off / 0x01 On / 0x02 Auto

- id: video_picture_position_size_set
  label: Video Picture Position & Size (0x4B)
  kind: action
  command: "AA 4B ID 02 Type Direction CS"
  params:
    - name: type
      type: integer
      description: "0x00 Reset / 0x01 Position / 0x02 Size / 0x03 Reserved"
    - name: direction
      type: integer
      description: "Position: 0x00 Down, 0x01 Up, 0x02 Left, 0x03 Right. Size: 0x00 VScaleDown, 0x01 VScaleUp, 0x02 HScaleDown, 0x03 HScaleUp."

- id: pixel_shift_set
  label: Pixel Shift (0x4C set)
  kind: action
  command: "AA 4C ID 04 Shift HDot VLine STime CS"
  params:
    - name: shift
      type: integer
      description: 0x00 Off / 0x01 On
    - name: h_dot
      type: integer
      description: 0..4
    - name: v_line
      type: integer
      description: 0..4
    - name: s_time
      type: integer
      description: 1..4

# ---------- 0x50 Sensor Control sub-commands ----------
- id: sensor_light_get
  label: Light Sensor (0x50 0x00 get)
  kind: query
  command: "AA 50 ID 01 00 CS"
  params: []

- id: sensor_heatex_temp_get
  label: HeatEx Temperature (0x50 0x01 get)
  kind: query
  command: "AA 50 ID 01 01 CS"
  params: []

- id: sensor_led_plate_temp_get
  label: LED Plate Temperature (0x50 0x02 get)
  kind: query
  command: "AA 50 ID 01 02 CS"
  params: []

- id: sensor_final_duty_get
  label: Final Duty (0x50 0x03 get)
  kind: query
  command: "AA 50 ID 01 03 CS"
  params: []

- id: eq_100hz_get
  label: EQ 100Hz (get, 0x51)
  kind: query
  command: "AA 51 ID 00 CS"
  params: []

- id: eq_100hz_set
  label: EQ 100Hz (set, 0x51)
  kind: action
  command: "AA 51 ID 01 Eq CS"
  params:
    - name: eq
      type: integer
      description: 0..20 (menu 0 = 0x0A, menu -10 = 0x00)

- id: eq_300hz_get
  label: EQ 300Hz (get, 0x52)
  kind: query
  command: "AA 52 ID 00 CS"
  params: []

- id: eq_300hz_set
  label: EQ 300Hz (set, 0x52)
  kind: action
  command: "AA 52 ID 01 Eq CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: eq_1khz_get
  label: EQ 1kHz (get, 0x53)
  kind: query
  command: "AA 53 ID 00 CS"
  params: []

- id: eq_1khz_set
  label: EQ 1kHz (set, 0x53)
  kind: action
  command: "AA 53 ID 01 Eq CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: eq_3khz_get
  label: EQ 3kHz (get, 0x54)
  kind: query
  command: "AA 54 ID 00 CS"
  params: []

- id: eq_3khz_set
  label: EQ 3kHz (set, 0x54)
  kind: action
  command: "AA 54 ID 01 Eq CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: eq_10khz_get
  label: EQ 10kHz (get, 0x55)
  kind: query
  command: "AA 55 ID 00 CS"
  params: []

- id: eq_10khz_set
  label: EQ 10kHz (set, 0x55)
  kind: action
  command: "AA 55 ID 01 Eq CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: energy_saving_lfd_get
  label: Energy Saving LFD (get, 0x56)
  kind: query
  command: "AA 56 ID 00 CS"
  params: []

- id: energy_saving_lfd_set
  label: Energy Saving LFD (set, 0x56)
  kind: action
  command: "AA 56 ID 01 EnergySaving CS"
  params:
    - name: energy_saving
      type: integer
      description: 0x00 Off / 0x01 On

- id: auto_lamp_get
  label: Auto Lamp Control (get, 0x57)
  kind: query
  command: "AA 57 ID 00 CS"
  params: []

- id: auto_lamp_set
  label: Auto Lamp Control (set, 0x57)
  kind: action
  command: "AA 57 ID 08 LmaxH LmaxM LmaxAP LmaxVal LminH LminM LminAP LminVal CS"
  params: []

- id: manual_lamp_get
  label: Manual Lamp (get, 0x58)
  kind: query
  command: "AA 58 ID 00 CS"
  params: []

- id: manual_lamp_set
  label: Manual Lamp (set, 0x58)
  kind: action
  command: "AA 58 ID 01 LampValue CS"
  params:
    - name: lamp_value
      type: integer
      description: 0..100

- id: safety_screen_run_set
  label: Safety Screen Run (0x59 set)
  kind: action
  command: "AA 59 ID 01 Type CS"
  params:
    - name: type
      type: integer
      description: "0x00 Off / 0x01 Signal Pattern / 0x02 All White / 0x03 Scroll / 0x04 Bar / 0x06 Eraser / 0x07 Pixel / 0x10 Rolling Bar / 0x11 Fading Screen"

- id: inverse_control_get
  label: Inverse / Panel control (get, 0x5A)
  kind: query
  command: "AA 5A ID 00 CS"
  params: []

- id: inverse_control_set
  label: Inverse / Panel control (set, 0x5A)
  kind: action
  command: "AA 5A ID 01 Inverse CS"
  params:
    - name: inverse
      type: integer
      description: 0x00 Off / 0x01 On

- id: safety_screen_control_repeat_set
  label: Safety Screen Control - Repeat timer (0x5B Mode1)
  kind: action
  command: "AA 5B ID 03 Type TPeriod TTime CS"
  params:
    - name: type
      type: integer
      description: "0x00 Off / 0x03 Scroll / 0x04 Pixel / 0x05 Bar / 0x06 Eraser / 0x09 All White / 0x0A Pattern / 0x10 Rolling Bar / 0x11 Fading Screen"
    - name: t_period
      type: integer
      description: 1..10 Hr
    - name: t_time
      type: integer
      description: "0x01..0x05 (10..50 sec)"

- id: safety_screen_control_interval_set
  label: Safety Screen Control - Interval timer (0x5B Mode2)
  kind: action
  command: "AA 5B ID 07 Type StartH StartM StartAP EndH EndM EndAP CS"
  params: []

- id: video_wall_mode_get
  label: Video Wall Mode (get, 0x5C)
  kind: query
  command: "AA 5C ID 00 CS"
  params: []

- id: video_wall_mode_set
  label: Video Wall Mode (set, 0x5C)
  kind: action
  command: "AA 5C ID 01 WallMode CS"
  params:
    - name: wall_mode
      type: integer
      description: 0x00 Natural / 0x01 Full

- id: safety_lock_get
  label: Safety Lock (get, 0x5D)
  kind: query
  command: "AA 5D ID 00 CS"
  params: []

- id: safety_lock_set
  label: Safety Lock (set, 0x5D)
  kind: action
  command: "AA 5D ID 01 Lock CS"
  params:
    - name: lock
      type: integer
      description: 0x00 Off / 0x01 On

- id: panel_key_lock_get
  label: Panel Key Lock (get, 0x5F)
  kind: query
  command: "AA 5F ID 00 CS"
  params: []

- id: panel_key_lock_set
  label: Panel Key Lock (set, 0x5F)
  kind: action
  command: "AA 5F ID 01 ButtonLock CS"
  params:
    - name: button_lock
      type: integer
      description: 0x00 Unlock / 0x01 Lock

- id: channel_up_down_set
  label: Channel Up/Down (0x61)
  kind: action
  command: "AA 61 ID 01 Dir CS"
  params:
    - name: dir
      type: integer
      description: 0x00 Up / 0x01 Down

- id: volume_up_down_set
  label: Volume Up/Down (0x62)
  kind: action
  command: "AA 62 ID 01 Dir CS"
  params:
    - name: dir
      type: integer
      description: 0x00 Up / 0x01 Down

- id: ticker_set
  label: Ticker (0x63 set)
  kind: action
  command: "AA 63 ID Length OnOff StartH StartM StartAP EndH EndM EndAP PosH PosV MotionOnOff MotionDir MotionSpeed FontSize FGColor BGColor FGOpacity BGOpacity Msg... CS"
  params: []

- id: ticker_get
  label: Ticker (0x63 get)
  kind: query
  command: "AA 63 ID 00 CS"
  params: []

- id: sound_select_65_set
  label: Sound Select (set, 0x65 - alias of 0x47)
  kind: action
  command: "AA 65 ID 01 SSelect CS"
  params:
    - name: s_select
      type: integer
      description: 0x00 Sub / 0x01 Main

- id: pc_module_detect_get
  label: PC Module Detect (0x66 get)
  kind: query
  command: "AA 66 ID 00 CS"
  params: []

- id: device_name_get
  label: Device Name (get, 0x67)
  kind: query
  command: "AA 67 ID 00 CS"
  params: []

- id: device_name_set
  label: Device Name (set, 0x67)
  kind: action
  command: "AA 67 ID Length Name... CS"
  params:
    - name: name
      type: string
      description: ASCII up to 15 chars

- id: speaker_select_set
  label: Speaker Select (0x68 set)
  kind: action
  command: "AA 68 ID 01 SSelect CS"
  params:
    - name: s_select
      type: integer
      description: 0x00 Internal / 0x01 External

- id: osd_get
  label: OSD On/Off (get, 0x70)
  kind: query
  command: "AA 70 ID 00 CS"
  params: []

- id: osd_set
  label: OSD On/Off (set, 0x70)
  kind: action
  command: "AA 70 ID 01 OSD CS"
  params:
    - name: osd
      type: integer
      description: 0x00 Off / 0x01 On (HKIA reverses ACK)

- id: picture_mode_get
  label: Picture Mode (get, 0x71)
  kind: query
  command: "AA 71 ID 00 CS"
  params: []

- id: picture_mode_set
  label: Picture Mode (set, 0x71)
  kind: action
  command: "AA 71 ID 01 Pmode CS"
  params:
    - name: pmode
      type: integer
      description: "AV/S-Video/Component/HDCP(TV): 0x00 Dynamic, 0x01 Standard, 0x02 Movie, 0x03 Custom, 0x04 Natural, 0x05 Calibration, 0x50 Off. PC/BNC/DVI/DP/MagicNet: 0x10 Entertain, 0x11 Internet, 0x12 Text, 0x13 Custom, 0x14 Advertisement, 0x15 Information, 0x16 Calibration, 0x50 Off. Common: 0x00 Dynamic, 0x01 Live, 0x02 Movie, 0x04 Natural, 0x16 Calibration, 0x20 Shop&Mall-Video, 0x21 Shop&Mall-Text, 0x22 Office&School-Video, 0x23 Office&School-Text, 0x24 Terminal&Station-Video, 0x25 Terminal&Station-Text, 0x26 Videowall-Video, 0x27 Videowall-Text, 0x30 HDR+(get only), 0x90 Reserved"

- id: sound_mode_get
  label: Sound Mode (get, 0x72)
  kind: query
  command: "AA 72 ID 00 CS"
  params: []

- id: sound_mode_set
  label: Sound Mode (set, 0x72)
  kind: action
  command: "AA 72 ID 01 Smode CS"
  params:
    - name: smode
      type: integer
      description: "0x00 Standard / 0x01 Music / 0x02 Movie / 0x03 Speech / 0x04 Custom / 0x05 Amplify / 0x06 Optimized"

- id: digital_nr_get
  label: Digital NR (get, 0x73)
  kind: query
  command: "AA 73 ID 00 CS"
  params: []

- id: digital_nr_set
  label: Digital NR (set, 0x73)
  kind: action
  command: "AA 73 ID 01 NRMode CS"
  params:
    - name: nr_mode
      type: integer
      description: "0x00 Off / 0x01 Low / 0x02 Medium / 0x03 High / 0x04 Auto / 0x05 Auto Visualization"

- id: pc_color_tone_get
  label: PC Color Tone (get, 0x75)
  kind: query
  command: "AA 75 ID 00 CS"
  params: []

- id: pc_color_tone_set
  label: PC Color Tone (set, 0x75)
  kind: action
  command: "AA 75 ID 01 ColorTone CS"
  params:
    - name: color_tone
      type: integer
      description: "0x00 Custom / 0x01 Cool / 0x02 Normal / 0x03 Warm / 0x05 Natural / 0x50 Off"

- id: auto_auto_adjustment_set
  label: Auto AutoAdjustment Enable (0x76)
  kind: action
  command: "AA 76 ID 01 AAdjust CS"
  params:
    - name: a_adjust
      type: integer
      description: 0x00 Disable / 0x01 Enable

- id: all_keys_lock_get
  label: All Keys Lock (get, 0x77)
  kind: query
  command: "AA 77 ID 00 CS"
  params: []

- id: all_keys_lock_set
  label: All Keys Lock (set, 0x77)
  kind: action
  command: "AA 77 ID 01 AKL CS"
  params:
    - name: akl
      type: integer
      description: 0x00 Off / 0x01 On

- id: srs_tsxt_get
  label: SRS TSXT (get, 0x78)
  kind: query
  command: "AA 78 ID 00 CS"
  params: []

- id: srs_tsxt_set
  label: SRS TSXT (set, 0x78)
  kind: action
  command: "AA 78 ID 01 SRS CS"
  params:
    - name: srs
      type: integer
      description: 0x00 Off / 0x01 On

- id: film_mode_get
  label: Film Mode (get, 0x79)
  kind: query
  command: "AA 79 ID 00 CS"
  params: []

- id: film_mode_set
  label: Film Mode (set, 0x79)
  kind: action
  command: "AA 79 ID 01 Fmode CS"
  params:
    - name: fmode
      type: integer
      description: "0x00 Off / 0x01 Auto1 / 0x02 Auto2 / 0x03 Cinema Smooth"

- id: panel_on_time_get
  label: Panel On Time (0x83 get)
  kind: query
  command: "AA 83 ID 00 CS"
  params: []

- id: video_wall_on_get
  label: Video Wall On (get, 0x84)
  kind: query
  command: "AA 84 ID 00 CS"
  params: []

- id: video_wall_on_set
  label: Video Wall On (set, 0x84)
  kind: action
  command: "AA 84 ID 01 VWall CS"
  params:
    - name: v_wall_on
      type: integer
      description: 0x00 Off / 0x01 On

- id: temperature_control_get
  label: Temperature Control (get, 0x85)
  kind: query
  command: "AA 85 ID 00 CS"
  params: []

- id: temperature_control_set
  label: Temperature Control (set, 0x85)
  kind: action
  command: "AA 85 ID 01 Temp CS"
  params:
    - name: temp
      type: integer
      description: 75..124 (Celsius)

- id: brightness_sensor_get
  label: Brightness Sensor / Eco Sensor (get, 0x86)
  kind: query
  command: "AA 86 ID 00 CS"
  params: []

- id: brightness_sensor_set
  label: Brightness Sensor / Eco Sensor (set, 0x86)
  kind: action
  command: "AA 86 ID 01 BRSensor CS"
  params:
    - name: br_sensor
      type: integer
      description: 0x00 Off / 0x01 On

- id: dynamic_contrast_get
  label: Dynamic Contrast (get, 0x87)
  kind: query
  command: "AA 87 ID 00 CS"
  params: []

- id: dynamic_contrast_set
  label: Dynamic Contrast (set, 0x87)
  kind: action
  command: "AA 87 ID 01 DYCont CS"
  params:
    - name: dy_cont
      type: integer
      description: "0x00 Off / 0x01 Low / 0x02 Medium / 0x03 High"

- id: video_wall_user_control_set
  label: Video Wall User Control (0x89 set)
  kind: action
  command: "AA 89 ID 02 WallDiv WallSno CS"
  params:
    - name: wall_div
      type: integer
      description: 15x15 video wall matrix code
    - name: wall_sno
      type: integer
      description: "1..25 / 1..100 / 1..225 depending on model"

- id: model_name_get
  label: Model Name string (0x8A get)
  kind: query
  command: "AA 8A ID 00 CS"
  params: []

- id: video_wall_direct_user_control_set
  label: Video Wall Direct User Control (0x8B set)
  kind: action
  command: "AA 8B ID 05 VWallOn WallMode WallDiv WallSno Input CS"
  params: []

- id: video_wall_feature_frame_alignment_get
  label: Video Wall Frame Alignment (0x8C 0x81 get)
  kind: query
  command: "AA 8C ID 01 81 CS"
  params: []

- id: video_wall_feature_frame_alignment_set
  label: Video Wall Frame Alignment (0x8C 0x81 set)
  kind: action
  command: "AA 8C ID 02 81 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 Off / 0x01 On / 0x02 Auto"

- id: fan_control_get
  label: Fan Control (get, 0x8F)
  kind: query
  command: "AA 8F ID 00 CS"
  params: []

- id: fan_control_set
  label: Fan Control (set, 0x8F)
  kind: action
  command: "AA 8F ID 01 FAN CS"
  params:
    - name: fan
      type: integer
      description: "0x00 Manual / 0x01 Auto / 0x02 Off / 0x03 On"

- id: game_mode_get
  label: Game Mode (get, 0x90)
  kind: query
  command: "AA 90 ID 00 CS"
  params: []

- id: game_mode_set
  label: Game Mode (set, 0x90)
  kind: action
  command: "AA 90 ID 01 Game CS"
  params:
    - name: game
      type: integer
      description: 0x00 Off / 0x01 On

- id: energy_saving_get
  label: Energy Saving (get, 0x92)
  kind: query
  command: "AA 92 ID 00 CS"
  params: []

- id: energy_saving_set
  label: Energy Saving (set, 0x92)
  kind: action
  command: "AA 92 ID 01 ESAV CS"
  params:
    - name: esav
      type: integer
      description: "0x00 Off / 0x01 Low / 0x02 Medium / 0x03 High / 0x04 Picture Off"

- id: hdmi_black_level_get
  label: HDMI Black Level (get, 0x94)
  kind: query
  command: "AA 94 ID 00 CS"
  params: []

- id: hdmi_black_level_set
  label: HDMI Black Level (set, 0x94)
  kind: action
  command: "AA 94 ID 01 Level CS"
  params:
    - name: level
      type: integer
      description: "0x00 Normal / 0x01 Low / 0x02 Auto"

- id: black_adjust_get
  label: Black Adjust (get, 0x95)
  kind: query
  command: "AA 95 ID 00 CS"
  params: []

- id: black_adjust_set
  label: Black Adjust (set, 0x95)
  kind: action
  command: "AA 95 ID 01 BADJ CS"
  params:
    - name: badj
      type: integer
      description: "0x00 Off / 0x01 Low(Dark) / 0x02 Medium(Darker) / 0x03 High(Darkest)"

- id: gamma_get
  label: Gamma (get, 0x96)
  kind: query
  command: "AA 96 ID 00 CS"
  params: []

- id: gamma_set
  label: Gamma (set, 0x96)
  kind: action
  command: "AA 96 ID 01 GAMMA CS"
  params:
    - name: gamma
      type: integer
      description: "0x00..0x05 Mode0..5, 0x11..0x15 -1..-5, 0x20 Custom"

- id: edge_enhancement_get
  label: Edge Enhancement (get, 0x9C)
  kind: query
  command: "AA 9C ID 00 CS"
  params: []

- id: edge_enhancement_set
  label: Edge Enhancement (set, 0x9C)
  kind: action
  command: "AA 9C ID 01 EDGE CS"
  params:
    - name: edge
      type: integer
      description: 0x00 Off / 0x01 On

- id: color_space_get
  label: Color Space (get, 0x9D)
  kind: query
  command: "AA 9D ID 00 CS"
  params: []

- id: color_space_set
  label: Color Space (set, 0x9D)
  kind: action
  command: "AA 9D ID 01 CSpace CS"
  params:
    - name: cspace
      type: integer
      description: "0x00 Auto / 0x01 Native / 0x02 Custom / 0x03 DCI-P3 / 0x04 AdobeRGB / 0x05 BT-709"

- id: xvycc_get
  label: xvYCC (get, 0x9E)
  kind: query
  command: "AA 9E ID 00 CS"
  params: []

- id: xvycc_set
  label: xvYCC (set, 0x9E)
  kind: action
  command: "AA 9E ID 01 XVYCC CS"
  params:
    - name: xvycc
      type: integer
      description: 0x00 Off / 0x01 On

- id: reset_control_set
  label: Reset Control (0x9F set)
  kind: action
  command: "AA 9F ID 01 RST CS"
  params:
    - name: rst
      type: integer
      description: "0x00 Picture / 0x01 Sound / 0x02 Setup(System) / 0x03 All / 0x04 Screen Display"

- id: ambient_brightness_mode_set
  label: Ambient Brightness Mode (0xA1)
  kind: action
  command: "AA A1 ID 03 ABMode ValidLamp LampValue CS"
  params:
    - name: ab_mode
      type: integer
      description: 0x00 Off / 0x01 On
    - name: valid_lamp
      type: integer
      description: 0x00 Not apply / 0x01 Apply
    - name: lamp_value
      type: integer
      description: 0..100

- id: osd_display_type_get
  label: OSD Display Type On/Off (0xA3 get)
  kind: query
  command: "AA A3 ID 00 CS"
  params: []

- id: osd_display_type_set
  label: OSD Display Type On/Off (0xA3 set)
  kind: action
  command: "AA A3 ID 02 OSDType OnOff CS"
  params:
    - name: osd_type
      type: integer
      description: "0x00 Source / 0x01 Not Optimum Mode / 0x02 No Signal / 0x03 MDC / 0x04 Schedule Channel Info (download status)"
    - name: on_off
      type: integer
      description: 0x00 Off / 0x01 On

- id: timer1_set_short
  label: Timer 1 (0xA4 short)
  kind: action
  command: "AA A4 ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer1_set_full
  label: Timer 1 (0xA4 full with Manual Weekday/Volume/Source/Holiday)
  kind: action
  command: "AA A4 ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer1_get
  label: Timer 1 (0xA4 get)
  kind: query
  command: "AA A4 ID 00 CS"
  params: []

- id: timer2_set_short
  label: Timer 2 (0xA5 short)
  kind: action
  command: "AA A5 ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer2_set_full
  label: Timer 2 (0xA5 full)
  kind: action
  command: "AA A5 ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer2_get
  label: Timer 2 (0xA5 get)
  kind: query
  command: "AA A5 ID 00 CS"
  params: []

- id: timer3_set_short
  label: Timer 3 (0xA6 short)
  kind: action
  command: "AA A6 ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer3_set_full
  label: Timer 3 (0xA6 full)
  kind: action
  command: "AA A6 ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer3_get
  label: Timer 3 (0xA6 get)
  kind: query
  command: "AA A6 ID 00 CS"
  params: []

- id: clock_control_mfm_get
  label: Clock Control MFM (0xA7 get)
  kind: query
  command: "AA A7 ID 00 CS"
  params: []

- id: clock_control_mfm_set
  label: Clock Control MFM (0xA7 set)
  kind: action
  command: "AA A7 ID 07 Day HTime MTime Month Year1 Year2 APTime CS"
  params: []

- id: holiday_add_delete_set
  label: Holiday Add/Delete (0xA8)
  kind: action
  command: "AA A8 ID 05 Mgmt Month1 Day1 Month2 Day2 CS"
  params:
    - name: mgmt
      type: integer
      description: "0x00 Add Holiday / 0x01 Delete Holiday / 0x02 Delete All"

- id: holiday_get_total
  label: Holiday - Total Number (0xA9 get)
  kind: query
  command: "AA A9 ID 00 CS"
  params: []

- id: holiday_get_each
  label: Holiday - Each entry (0xA9 by index)
  kind: query
  command: "AA A9 ID 01 Index CS"
  params:
    - name: index
      type: integer

- id: timer4_set_short
  label: Timer 4 (0xAB short)
  kind: action
  command: "AA AB ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer4_set_full
  label: Timer 4 (0xAB full)
  kind: action
  command: "AA AB ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer4_get
  label: Timer 4 (0xAB get)
  kind: query
  command: "AA AB ID 00 CS"
  params: []

- id: timer5_set_short
  label: Timer 5 (0xAC short)
  kind: action
  command: "AA AC ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer5_set_full
  label: Timer 5 (0xAC full)
  kind: action
  command: "AA AC ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer5_get
  label: Timer 5 (0xAC get)
  kind: query
  command: "AA AC ID 00 CS"
  params: []

- id: timer6_set_short
  label: Timer 6 (0xAD short)
  kind: action
  command: "AA AD ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer6_set_full
  label: Timer 6 (0xAD full)
  kind: action
  command: "AA AD ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer6_get
  label: Timer 6 (0xAD get)
  kind: query
  command: "AA AD ID 00 CS"
  params: []

- id: timer7_set_short
  label: Timer 7 (0xAE short)
  kind: action
  command: "AA AE ID 0D OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn RepeatOff CS"
  params: []

- id: timer7_set_full
  label: Timer 7 (0xAE full)
  kind: action
  command: "AA AE ID 0F OnH OnM OnAP OnAct OffH OffM OffAP OffAct RepeatOn ManualWDOn RepeatOff ManualWDOff CS"
  params: []

- id: timer7_get
  label: Timer 7 (0xAE get)
  kind: query
  command: "AA AE ID 00 CS"
  params: []

- id: edit_name_get
  label: Edit Name (get, 0xAF)
  kind: query
  command: "AA AF ID 00 CS"
  params: []

- id: edit_name_set
  label: Edit Name (set, 0xAF)
  kind: action
  command: "AA AF ID 01 Ename CS"
  params:
    - name: ename
      type: integer
      description: "0x00 NONE / 0x01 VCR / 0x02 DVD / 0x03 Cable STB / 0x04 Satelite STB / 0x05 PVR STB / 0x06 AV Receiver / 0x07 Game / 0x08 Camcorder / 0x09 PC / 0x0A DVI PC / 0x0B DVI Devices / 0x0C TV / 0x0D IPTV / 0x0E Blu-ray / 0x0F HD DVD / 0x10 DMA / 0x11 DVD Receiver / 0x12 HD STB / 0x13 DVD Combo / 0x14 DHR"

- id: virtual_remote_control_set
  label: Virtual Remote Control (0xB0)
  kind: action
  command: "AA B0 ID 01 KeyCode CS"
  params:
    - name: keycode
      type: integer
      description: "0x01 KEY_SOURCE / 0x02 KEY_POWER / 0x04-0x06 KEY_1..3 / 0x07 KEY_VOLUME_UP / 0x08-0x0A KEY_4..6 / 0x0B KEY_VOLUME_DOWN / 0x0C-0x0E KEY_7..9 / 0x0F KEY_MUTE / 0x10 KEY_CHANNEL_DOWN / 0x11 KEY_0 / 0x12 KEY_CHANNEL_UP / 0x14 KEY_GREEN / 0x15 KEY_YELLOW / 0x16 KEY_CYAN / 0x1A KEY_MENU / 0x1F KEY_DISPLAY/INFO / 0x23 KEY_DIGIT / 0x24 KEY_PIP_TV_VIDEO / 0x2D KEY_EXIT / 0x30 Magicinfo / 0x45 KEY_REW / 0x46 KEY_STOP / 0x47 KEY_PLAY / 0x48 KEY_FF / 0x4A KEY_PAUSE / 0x4B KEY_TOOLS / 0x58 KEY_RETURN / 0x5B KEY_MAGICINFO_LITE / 0x60-0x68 KEY_CURSOR_* / 0x6C KEY_RED / 0x77 KEY_LOCK / 0x79 KEY_CONTENT / 0x98 DISCRET_POWER_OFF / 0x9F KEY_3D"

- id: display_port_daisy_chain_set
  label: Display Port Daisy Chain (0xB1)
  kind: action
  command: "AA B1 ID 01 Value CS"
  params:
    - name: value
      type: integer
      description: 0x00 Clone / 0x01 Expand

- id: screen_3_4_mode_3screen_set
  label: 3Screen Mode Control - Type1 (0xB2)
  kind: action
  command: "AA B2 ID 08 OnOff Sound ScreenSize MainPsize Sub1Source Sub1Psize Sub2Source Sub2Psize CS"
  params: []

- id: screen_3_4_mode_4screen_set
  label: 4Screen Mode Control - Type2 (0xB2)
  kind: action
  command: "AA B2 ID 0A OnOff Sound ScreenSize MainPsize Sub1Source Sub1Psize Sub2Source Sub2Psize Sub3Source Sub3Psize CS"
  params: []

- id: screen_3_4_mode_4screen_no_psize_set
  label: 4Screen Mode Control - Type3 without picture size (0xB2)
  kind: action
  command: "AA B2 ID 06 OnOff Sound Sub0Source Sub1Source Sub2Source Sub3Source CS"
  params: []

- id: screen_3_4_mode_get
  label: 3Screen/4Screen Mode Control (get, 0xB2)
  kind: query
  command: "AA B2 ID 00 CS"
  params: []

- id: video_conference_sound_get
  label: Video Conference Sound (get, 0xB3)
  kind: query
  command: "AA B3 ID 00 CS"
  params: []

- id: video_conference_sound_set
  label: Video Conference Sound (set, 0xB3)
  kind: action
  command: "AA B3 ID 01 ConfSound CS"
  params:
    - name: conf_sound
      type: integer
      description: 0x00 Off / 0x01 On

- id: network_standby_get
  label: Network Standby (get, 0xB5)
  kind: query
  command: "AA B5 ID 00 CS"
  params: []

- id: network_standby_set
  label: Network Standby (set, 0xB5)
  kind: action
  command: "AA B5 ID 01 NetStandby CS"
  params:
    - name: net_standby
      type: integer
      description: 0x00 Off / 0x01 On

- id: dst_control_get
  label: DST (Daylight Saving Time) Control (get, 0xB6)
  kind: query
  command: "AA B6 ID 00 CS"
  params: []

- id: dst_control_set
  label: DST Control (set, 0xB6)
  kind: action
  command: "AA B6 ID 0C DST MonthStart WeekStart WkDayStart TimeHStart TimeMStart MonthEnd WeekEnd WkDayEnd TimeHEnd TimeMEnd TimeOffSet CS"
  params: []

- id: custom_pip_control_get
  label: Custom PIP Control (get, 0xB7)
  kind: query
  command: "AA B7 ID 00 CS"
  params: []

- id: custom_pip_control_set
  label: Custom PIP Control (set, 0xB7)
  kind: action
  command: "AA B7 ID 08 HPos VPos HSize VSize CS"
  params: []

- id: auto_id_setting_status_set
  label: Auto ID Setting Status (0xB8 set)
  kind: action
  command: "AA B8 ID 01 Status CS"
  params:
    - name: status
      type: integer
      description: 0x00 START / 0x01 END

- id: display_id_information_set
  label: Display ID Information On/Off (0xB9 set)
  kind: action
  command: "AA B9 ID 01 IDDisplay CS"
  params:
    - name: id_display
      type: integer
      description: 0x00 Off / 0x01 On

- id: clock_control_mfm_seconds_get
  label: Clock Control MFM with seconds (0xC5 get)
  kind: query
  command: "AA C5 ID 00 CS"
  params: []

- id: clock_control_mfm_seconds_set
  label: Clock Control MFM with seconds (0xC5 set)
  kind: action
  command: "AA C5 ID 08 Day HTime MTime STime Month Year1 Year2 APTime CS"
  params: []

- id: eco_auto_power_off_get
  label: Eco Auto Power Off (0xC6 0x81 get)
  kind: query
  command: "AA C6 ID 01 81 CS"
  params: []

- id: eco_auto_power_off_set
  label: Eco Auto Power Off (0xC6 0x81 set)
  kind: action
  command: "AA C6 ID 02 81 APOff CS"
  params:
    - name: ap_off
      type: integer
      description: "0x00 Off / 0x01 4Hour / 0x02 6Hour / 0x03 8Hour / 0x04 16Hour (binary models: 0x00 Off, 0x01 On)"

- id: eco_brightness_limit_get
  label: Eco Brightness Limit (0xC6 0x82 get)
  kind: query
  command: "AA C6 ID 01 82 CS"
  params: []

- id: eco_brightness_limit_set
  label: Eco Brightness Limit (0xC6 0x82 set)
  kind: action
  command: "AA C6 ID 02 82 BLimit CS"
  params:
    - name: blimit
      type: integer
      description: Brightness limit value

- id: launcher_mode_get
  label: Launcher Play Via Mode (0xC7 0x81 get)
  kind: query
  command: "AA C7 ID 01 81 CS"
  params: []

- id: launcher_mode_set
  label: Launcher Play Via Mode (0xC7 0x81 set)
  kind: action
  command: "AA C7 ID 02 81 Mode CS"
  params:
    - name: mode
      type: integer
      description: "0x00 MagicInfo / 0x01 URL Launcher / 0x02 MagicIWB"

- id: launcher_url_get
  label: Launcher URL (0xC7 0x82 get)
  kind: query
  command: "AA C7 ID 01 82 CS"
  params: []

- id: launcher_url_set
  label: Launcher URL (0xC7 0x82 set)
  kind: action
  command: "AA C7 ID Variable 82 URL_ASCII CS"
  params:
    - name: url
      type: string
      description: ASCII URL up to 200 chars

# ---------- 0xC8 OnScreen Display Menu Control ----------
- id: osd_menu_orientation_get
  label: OSD Menu Orientation (0xC8 0x81 get)
  kind: query
  command: "AA C8 ID 01 81 CS"
  params: []

- id: osd_menu_orientation_set
  label: OSD Menu Orientation (0xC8 0x81 set)
  kind: action
  command: "AA C8 ID 02 81 Orientation CS"
  params:
    - name: orientation
      type: integer
      description: "0x00 Landscape / 0x01 Portrait(270) / 0x02 180 / 0x03 90"

- id: osd_source_orientation_get
  label: OSD Source Content Orientation (0xC8 0x82 get)
  kind: query
  command: "AA C8 ID 01 82 CS"
  params: []

- id: osd_source_orientation_set
  label: OSD Source Content Orientation (0xC8 0x82 set)
  kind: action
  command: "AA C8 ID 02 82 Orientation CS"
  params:
    - name: orientation
      type: integer

- id: osd_aspect_ratio_get
  label: OSD Aspect Ratio (0xC8 0x83 get)
  kind: query
  command: "AA C8 ID 01 83 CS"
  params: []

- id: osd_aspect_ratio_set
  label: OSD Aspect Ratio (0xC8 0x83 set)
  kind: action
  command: "AA C8 ID 02 83 AspectRatio CS"
  params:
    - name: aspect
      type: integer
      description: "0x00 Full Screen / 0x01 Original"

- id: osd_pip_orientation_get
  label: OSD PIP Orientation (0xC8 0x84 get)
  kind: query
  command: "AA C8 ID 01 84 CS"
  params: []

- id: osd_pip_orientation_set
  label: OSD PIP Orientation (0xC8 0x84 set)
  kind: action
  command: "AA C8 ID 02 84 Orientation CS"
  params:
    - name: orientation
      type: integer

- id: osd_menu_size_get
  label: OSD Menu Size (0xC8 0x85 get)
  kind: query
  command: "AA C8 ID 01 85 CS"
  params: []

- id: osd_menu_size_set
  label: OSD Menu Size (0xC8 0x85 set)
  kind: action
  command: "AA C8 ID 02 85 Size CS"
  params:
    - name: size
      type: integer
      description: "0x00 Original / 0x01 Medium / 0x02 Small"

# ---------- 0xC9 Sound Menu Control ----------
- id: sound_menu_hdmi_sound_get
  label: HDMI Sound (0xC9 0x81 get)
  kind: query
  command: "AA C9 ID 01 81 CS"
  params: []

- id: sound_menu_hdmi_sound_set
  label: HDMI Sound (0xC9 0x81 set)
  kind: action
  command: "AA C9 ID 02 81 HDMISound CS"
  params:
    - name: hdmi_sound
      type: integer
      description: "0x00 HDMI Signal Sound / 0x01 Audio In Sound"

- id: sound_menu_eq_200hz_get
  label: EQ 200Hz (0xC9 0x82 get)
  kind: query
  command: "AA C9 ID 01 82 CS"
  params: []

- id: sound_menu_eq_200hz_set
  label: EQ 200Hz (0xC9 0x82 set)
  kind: action
  command: "AA C9 ID 02 82 200Hz CS"
  params:
    - name: eq
      type: integer
      description: "0..20 (0=-10 menu, 0x0A=0 menu, 0x14=+10 menu)"

- id: sound_menu_eq_500hz_get
  label: EQ 500Hz (0xC9 0x83 get)
  kind: query
  command: "AA C9 ID 01 83 CS"
  params: []

- id: sound_menu_eq_500hz_set
  label: EQ 500Hz (0xC9 0x83 set)
  kind: action
  command: "AA C9 ID 02 83 500Hz CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: sound_menu_eq_2khz_get
  label: EQ 2kHz (0xC9 0x84 get)
  kind: query
  command: "AA C9 ID 01 84 CS"
  params: []

- id: sound_menu_eq_2khz_set
  label: EQ 2kHz (0xC9 0x84 set)
  kind: action
  command: "AA C9 ID 02 84 2kHz CS"
  params:
    - name: eq
      type: integer
      description: 0..20

- id: sound_menu_eq_5khz_get
  label: EQ 5kHz (0xC9 0x85 get)
  kind: query
  command: "AA C9 ID 01 85 CS"
  params: []

- id: sound_menu_eq_5khz_set
  label: EQ 5kHz (0xC9 0x85 set)
  kind: action
  command: "AA C9 ID 02 85 5kHz CS"
  params:
    - name: eq
      type: integer
      description: 0..20

# ---------- 0xCA System Menu Control ----------
- id: system_sbox_mode_get
  label: SBOX Mode Indoor/Outdoor (0xCA 0x60 get)
  kind: query
  command: "AA CA ID 01 60 CS"
  params: []

- id: system_dimming_mode_set
  label: SBOX Dimming Mode (0xCA 0x61 set)
  kind: action
  command: "AA CA ID 02 61 DimmingMode CS"
  params:
    - name: dimming_mode
      type: integer
      description: "0x00 Auto / 0x01 LightSensor / 0x02 SunRise-SunSet / 0x03 Off"

- id: system_night_constant_brightness_set
  label: Night Time Constant Brightness (0xCA 0x62 set)
  kind: action
  command: "AA CA ID 02 62 ConstBrightMode CS"
  params:
    - name: const_bright_mode
      type: integer
      description: 0..1

- id: system_brightness_change_period_set
  label: Brightness Change Period (0xCA 0x63 set)
  kind: action
  command: "AA CA ID 02 63 ChangePeriod CS"
  params:
    - name: change_period
      type: integer
      description: 10..70 minutes

- id: system_light_sensor_effective_range_get
  label: Light Sensor Effective Range (0xCA 0x64 get)
  kind: query
  command: "AA CA ID 01 64 CS"
  params: []

- id: system_light_sensor_effective_range_set
  label: Light Sensor Effective Range (0xCA 0x64 set)
  kind: action
  command: "AA CA ID Variable 64 DataType Data... CS"
  params: []

- id: system_brightness_output_range_get
  label: Brightness Output Range & Default (0xCA 0x65 get)
  kind: query
  command: "AA CA ID 01 65 CS"
  params: []

- id: system_brightness_output_range_set
  label: Brightness Output Range & Default (0xCA 0x65 set)
  kind: action
  command: "AA CA ID Variable 65 DataType Data... CS"
  params: []

- id: system_lat_long_info_get
  label: Latitude / longitude Info (0xCA 0x66 get)
  kind: query
  command: "AA CA ID 01 66 CS"
  params: []

- id: system_lat_long_info_set
  label: Latitude / longitude Info (0xCA 0x66 set)
  kind: action
  command: "AA CA ID Variable 66 DataType1 Length Data... CS"
  params: []

- id: system_cec_get
  label: CEC On/Off (0xCA 0x70 get)
  kind: query
  command: "AA CA ID 01 70 CS"
  params: []

- id: system_cec_set
  label: CEC On/Off (0xCA 0x70 set)
  kind: action
  command: "AA CA ID 02 70 CECOnOff CS"
  params:
    - name: cec_onoff
      type: integer
      description: 0x00 Off / 0x01 On

- id: system_multi_device_grouping_get
  label: Multi Device Grouping (0xCA 0x71 get)
  kind: query
  command: "AA CA ID 01 71 CS"
  params: []

- id: system_multi_device_grouping_set
  label: Multi Device Grouping (0xCA 0x71 set)
  kind: action
  command: "AA CA ID 03 71 GroupMode Role CS"
  params:
    - name: group_mode
      type: integer
      description: "0x00 Off / 0x01 Group1 ... up to N"
    - name: role
      type: integer
      description: "0x00 Sub / 0x01 Main"

- id: system_auto_source_switch_onoff_get
  label: Auto Source Switch On/Off (0xCA 0x81 get)
  kind: query
  command: "AA CA ID 01 81 CS"
  params: []

- id: system_auto_source_switch_onoff_set
  label: Auto Source Switch On/Off (0xCA 0x81 set)
  kind: action
  command: "AA CA ID 02 81 ASSwitch CS"
  params:
    - name: as_switch
      type: integer
      description: 0x00 Off / 0x01 On (Preset Input)

- id: system_auto_source_switch_control_set
  label: Auto Source Switch Control (0xCA 0x82 set)
  kind: action
  command: "AA CA ID 04 82 Recovery PrimarySource SecondarySource CS"
  params: []

- id: system_power_on_delay_get
  label: Power On Delay (0xCA 0x83 get)
  kind: query
  command: "AA CA ID 01 83 CS"
  params: []

- id: system_power_on_delay_set
  label: Power On Delay (0xCA 0x83 set)
  kind: action
  command: "AA CA ID 02 83 PowerOnDelay CS"
  params:
    - name: power_on_delay
      type: integer
      description: Seconds (model menu-dependent range)

- id: system_synced_power_on_get
  label: Synced Power On (0xCA 0x84 get)
  kind: query
  command: "AA CA ID 01 84 CS"
  params: []

- id: system_synced_power_on_set
  label: Synced Power On (0xCA 0x84 set)
  kind: action
  command: "AA CA ID 02 84 SyncedPowerOn CS"
  params:
    - name: synced_power_on
      type: integer
      description: 0..1

- id: system_synced_power_off_get
  label: Synced Power Off (0xCA 0x85 get)
  kind: query
  command: "AA CA ID 01 85 CS"
  params: []

- id: system_synced_power_off_set
  label: Synced Power Off (0xCA 0x85 set)
  kind: action
  command: "AA CA ID 02 85 SyncedPowerOff CS"
  params:
    - name: synced_power_off
      type: integer
      description: 0..1

- id: system_power_button_get
  label: Power Button mode (0xCA 0x91 get)
  kind: query
  command: "AA CA ID 01 91 CS"
  params: []

- id: system_power_button_set
  label: Power Button mode (0xCA 0x91 set)
  kind: action
  command: "AA CA ID 02 91 PowerButton CS"
  params:
    - name: power_button
      type: integer
      description: "0x00 Power On Only / 0x01 Power On/Off"

- id: system_touch_admin_lock_get
  label: Touch Control Admin Lock (0xCA 0x92 get)
  kind: query
  command: "AA CA ID 01 92 CS"
  params: []

- id: system_touch_admin_lock_set
  label: Touch Control Admin Lock (0xCA 0x92 set)
  kind: action
  command: "AA CA ID 02 92 AdminLock CS"
  params:
    - name: admin_lock
      type: integer
      description: 0..1

- id: system_dicom_mode_get
  label: DICOM Mode (0xCA 0x93 get)
  kind: query
  command: "AA CA ID 01 93 CS"
  params: []

- id: system_dicom_mode_set
  label: DICOM Mode (0xCA 0x93 set)
  kind: action
  command: "AA CA ID 02 93 DICOMMode CS"
  params:
    - name: dicom_mode
      type: integer
      description: 0..1

- id: system_no_signal_power_off_get
  label: No Signal Power Off (0xCA 0xA1 get)
  kind: query
  command: "AA CA ID 01 A1 CS"
  params: []

- id: system_no_signal_power_off_set
  label: No Signal Power Off (0xCA 0xA1 set)
  kind: action
  command: "AA CA ID 02 A1 NoSigOff CS"
  params:
    - name: no_sig_off
      type: integer
      description: "0x00 Off / 0x01 15min / 0x02 30min / 0x03 60min / 0x04 10min"

- id: system_eco_sensor_min_backlight_get
  label: Eco Sensor Minimal Backlight (0xCA 0xB0 get)
  kind: query
  command: "AA CA ID 01 B0 CS"
  params: []

- id: system_eco_sensor_min_backlight_set
  label: Eco Sensor Minimal Backlight (0xCA 0xB0 set)
  kind: action
  command: "AA CA ID 02 B0 MinBacklight CS"
  params: []

# ---------- 0xD0 LED Product Feature (Get-only sub-commands listed; Set sub-commands for WB/Seam/etc.) ----------
- id: led_info_get
  label: LED Information (0xD0 0x78 get)
  kind: query
  command: "AA D0 ID 01 78 CS"
  params: []

- id: led_device_type_get
  label: LED Device Type (0xD0 0x81 get)
  kind: query
  command: "AA D0 ID 01 81 CS"
  params: []

- id: led_input_source_info_get
  label: LED Input Source Info (0xD0 0x82 get)
  kind: query
  command: "AA D0 ID 01 82 CS"
  params: []

- id: led_product_info_get
  label: LED Product Information (0xD0 0x83 get)
  kind: query
  command: "AA D0 ID 01 83 CS"
  params: []

- id: led_monitoring_get
  label: LED Monitoring (0xD0 0x84 get)
  kind: query
  command: "AA D0 ID 01 84 CS"
  params: []

- id: led_abl_mode_get
  label: LED ABL Mode (0xD0 0x85 get)
  kind: query
  command: "AA D0 ID 01 85 CS"
  params: []

- id: led_abl_mode_set
  label: LED ABL Mode (0xD0 0x85 set)
  kind: action
  command: "AA D0 ID 02 85 Mode CS"
  params: []

- id: led_scanning_rate_mode_get
  label: LED Scanning Rate Mode (0xD0 0x86 get)
  kind: query
  command: "AA D0 ID 01 86 CS"
  params: []

- id: led_scanning_rate_mode_set
  label: LED Scanning Rate Mode (0xD0 0x86 set)
  kind: action
  command: "AA D0 ID 02 86 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_lod_recheck_set
  label: LED LOD ReCheck (0xD0 0x87)
  kind: action
  command: "AA D0 ID 01 87 CS"
  params: []

- id: led_module_wb_rgb_get
  label: LED Module WB (RGB) Control (0xD0 0x92 get)
  kind: query
  command: "AA D0 ID 01 92 CS"
  params: []

- id: led_module_wb_rgb_set
  label: LED Module WB (RGB) Control (0xD0 0x92 set)
  kind: action
  command: "AA D0 ID Variable 92 Data CS"
  params:
    - name: data
      type: integer
      description: 0..1 (on/off)

- id: led_cabinet_wb_rgb_get
  label: LED Cabinet WB (RGB) Control (0xD0 0x93 get)
  kind: query
  command: "AA D0 ID 01 93 CS"
  params: []

- id: led_cabinet_wb_rgb_set
  label: LED Cabinet WB (RGB) Control (0xD0 0x93 set)
  kind: action
  command: "AA D0 ID Variable 93 Data CS"
  params: []

- id: led_cabinet_backlight_get
  label: LED Cabinet Backlight (0xD0 0x94 get)
  kind: query
  command: "AA D0 ID 01 94 CS"
  params: []

- id: led_cabinet_backlight_set
  label: LED Cabinet Backlight (0xD0 0x94 set)
  kind: action
  command: "AA D0 ID Variable 94 Data CS"
  params: []

- id: led_cabinet_pixel_wb_cc_onoff_get
  label: LED Cabinet Pixel WB CC On/Off (0xD0 0x95 get)
  kind: query
  command: "AA D0 ID 01 95 CS"
  params: []

- id: led_cabinet_pixel_wb_cc_onoff_set
  label: LED Cabinet Pixel WB CC On/Off (0xD0 0x95 set)
  kind: action
  command: "AA D0 ID 02 95 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_gamut_control_get
  label: LED Gamut Control (0xD0 0x96 get)
  kind: query
  command: "AA D0 ID 01 96 CS"
  params: []

- id: led_gamut_control_set
  label: LED Gamut Control (0xD0 0x96 set)
  kind: action
  command: "AA D0 ID Variable 96 Data CS"
  params: []

- id: led_cabinet_seam_correction_get
  label: LED Cabinet Seam Correction (0xD0 0x97 get)
  kind: query
  command: "AA D0 ID 01 97 CS"
  params: []

- id: led_cabinet_seam_correction_set
  label: LED Cabinet Seam Correction (0xD0 0x97 set)
  kind: action
  command: "AA D0 ID Variable 97 Data CS"
  params: []

- id: led_cabinet_seam_correction_onoff_get
  label: LED Cabinet Seam Correction On/Off (0xD0 0x98 get)
  kind: query
  command: "AA D0 ID 01 98 CS"
  params: []

- id: led_cabinet_seam_correction_onoff_set
  label: LED Cabinet Seam Correction On/Off (0xD0 0x98 set)
  kind: action
  command: "AA D0 ID 02 98 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_module_wb_onoff_get
  label: LED Module WB On/Off (0xD0 0x99 get)
  kind: query
  command: "AA D0 ID 01 99 CS"
  params: []

- id: led_module_wb_onoff_set
  label: LED Module WB On/Off (0xD0 0x99 set)
  kind: action
  command: "AA D0 ID 02 99 Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_data_reload_get
  label: LED Pixel RGB Data Reload (0xD0 0x9A get)
  kind: query
  command: "AA D0 ID 01 9A CS"
  params: []

- id: led_data_reload_set
  label: LED Pixel RGB Data Reload (0xD0 0x9A set)
  kind: action
  command: "AA D0 ID Variable 9A Option CS"
  params:
    - name: option
      type: integer
      description: "Reload option incl. 0x04 RM data"

- id: led_block_wb_get
  label: LED Block WB (RGB) Control (0xD0 0x9B get)
  kind: query
  command: "AA D0 ID 01 9B CS"
  params: []

- id: led_block_wb_set
  label: LED Block WB (RGB) Control (0xD0 0x9B set)
  kind: action
  command: "AA D0 ID Variable 9B Data CS"
  params: []

- id: led_cabinet_wb_get
  label: LED Cabinet WB (RGB) Control (0xD0 0x9C get)
  kind: query
  command: "AA D0 ID 01 9C CS"
  params: []

- id: led_cabinet_wb_set
  label: LED Cabinet WB (RGB) Control (0xD0 0x9C set)
  kind: action
  command: "AA D0 ID Variable 9C Data CS"
  params: []

- id: led_block_wb_onoff_get
  label: LED Block WB On/Off (0xD0 0x9D get)
  kind: query
  command: "AA D0 ID 01 9D CS"
  params: []

- id: led_block_wb_onoff_set
  label: LED Block WB On/Off (0xD0 0x9D set)
  kind: action
  command: "AA D0 ID 02 9D Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_cabinet_wb_onoff_get
  label: LED Cabinet WB On/Off (0xD0 0x9E get)
  kind: query
  command: "AA D0 ID 01 9E CS"
  params: []

- id: led_cabinet_wb_onoff_set
  label: LED Cabinet WB On/Off (0xD0 0x9E set)
  kind: action
  command: "AA D0 ID 02 9E Mode CS"
  params:
    - name: mode
      type: integer
      description: 0..1

- id: led_multi_edge_offset_get
  label: LED Multiple Edge Offset (0xD0 0x9F get)
  kind: query
  command: "AA D0 ID 01 9F CS"
  params: []

- id: led_multi_edge_offset_set
  label: LED Multiple Edge Offset (0xD0 0x9F set)
  kind: action
  command: "AA D0 ID Variable 9F Data CS"
  params: []

- id: led_block_gradation_get
  label: LED Block Gradation Control (0xD0 0xA2 get)
  kind: query
  command: "AA D0 ID 01 A2 CS"
  params: []

- id: led_block_gradation_set
  label: LED Block Gradation Control (0xD0 0xA2 set)
  kind: action
  command: "AA D0 ID Variable A2 Data CS"
  params: []

- id: led_block_gradation_onoff_get
  label: LED Block Gradation On/Off (0xD0 0xA3 get)
  kind: query
  command: "AA D0 ID 01 A3 CS"
  params: []

- id: led_block_gradation_onoff_set
  label: LED Block Gradation On/Off (0xD0 0xA3 set)
  kind: action
  command: "AA D0 ID Variable A3 Data CS"
  params: []

- id: led_diagnosis_get
  label: LED Diagnosis Info (0xD0 0xC2 get)
  kind: query
  command: "AA D0 ID 01 C2 CS"
  params: []

- id: led_auto_id_get
  label: LED Auto ID (0xD0 0xC3 get)
  kind: query
  command: "AA D0 ID 01 C3 CS"
  params: []

- id: led_auto_id_set
  label: LED Auto ID (0xD0 0xC3 set)
  kind: action
  command: "AA D0 ID Variable C3 Data CS"
  params: []

# ---------- 0xD2 Large Sized Data Control ----------
- id: large_sized_file_download_install_set
  label: Large Sized File Download & Install (0xD2 0x20)
  kind: action
  command: "AA D2 ID Variable 20 Data CS"
  params: []

# ---------- 0xE0 Net PIP Command ----------
- id: net_pip_command_set
  label: Net PIP Command (0xE0)
  kind: action
  command: "AA E0 ID Variable Data CS"
  params: []

# ---------- 0xE4 Apply To Control ----------
- id: apply_to_control_set
  label: Apply To Control (0xE4)
  kind: action
  command: "AA E4 ID 01 Apply CS"
  params:
    - name: apply
      type: integer
      description: 0x00 Off / 0x01 On

# ---------- 0xF9 Panel On/Off ----------
- id: panel_on_off_get
  label: Panel On/Off (0xF9 get)
  kind: query
  command: "AA F9 ID 00 CS"
  params: []

- id: panel_on_off_set
  label: Panel On/Off (0xF9 set)
  kind: action
  command: "AA F9 ID 01 OnOff CS"
  params:
    - name: on_off
      type: integer
      description: 0x00 Off / 0x01 On

# ---------- 0xFD Auto ID ----------
- id: auto_id_set
  label: Auto ID (0xFD set)
  kind: action
  command: "AA FD ID Variable Data CS"
  params: []

# ---------- 0xFE White Balance MDC Control ----------
- id: white_balance_mode_get
  label: White Balance Mode (0xFE 0x62 get)
  kind: query
  command: "AA FE ID 01 62 CS"
  params: []

- id: white_balance_mode_set
  label: White Balance Mode (0xFE 0x62 set)
  kind: action
  command: "AA FE ID 02 62 Mode CS"
  params:
    - name: mode
      type: integer

- id: white_balance_red_gain_get
  label: White Balance Red Gain (0xFE 0x81 get)
  kind: query
  command: "AA FE ID 01 81 CS"
  params: []

- id: white_balance_red_gain_set
  label: White Balance Red Gain (0xFE 0x81 set)
  kind: action
  command: "AA FE ID 02 81 RGain CS"
  params: []

- id: white_balance_green_gain_get
  label: White Balance Green Gain (0xFE 0x91 get)
  kind: query
  command: "AA FE ID 01 91 CS"
  params: []

- id: white_balance_green_gain_set
  label: White Balance Green Gain (0xFE 0x91 set)
  kind: action
  command: "AA FE ID 02 91 GGain CS"
  params: []

- id: white_balance_blue_gain_get
  label: White Balance Blue Gain (0xFE 0xA1 get)
  kind: query
  command: "AA FE ID 01 A1 CS"
  params: []

- id: white_balance_blue_gain_set
  label: White Balance Blue Gain (0xFE 0xA1 set)
  kind: action
  command: "AA FE ID 02 A1 BGain CS"
  params: []

- id: white_balance_red_offset_get
  label: White Balance Red Offset (0xFE 0xB1 get)
  kind: query
  command: "AA FE ID 01 B1 CS"
  params: []

- id: white_balance_red_offset_set
  label: White Balance Red Offset (0xFE 0xB1 set)
  kind: action
  command: "AA FE ID 02 B1 ROffset CS"
  params: []

- id: white_balance_green_offset_get
  label: White Balance Green Offset (0xFE 0xC1 get)
  kind: query
  command: "AA FE ID 01 C1 CS"
  params: []

- id: white_balance_green_offset_set
  label: White Balance Green Offset (0xFE 0xC1 set)
  kind: action
  command: "AA FE ID 02 C1 GOffset CS"
  params: []

- id: white_balance_blue_offset_get
  label: White Balance Blue Offset (0xFE 0xD1 get)
  kind: query
  command: "AA FE ID 01 D1 CS"
  params: []

- id: white_balance_blue_offset_set
  label: White Balance Blue Offset (0xFE 0xD1 set)
  kind: action
  command: "AA FE ID 02 D1 BOffset CS"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on, reboot]
- id: input_source_state
  type: integer
  description: code per 0x14 Input Source table
- id: volume_state
  type: integer
  range: 0..100
- id: mute_state
  type: enum
  values: [off, on]
- id: picture_aspect
  type: integer
  description: per 0x15 table
- id: model_species
  type: enum
  values: [PDP, LCD, DLP, LED, CRT, OLED]
- id: model_panel_code
  type: integer
  description: per 0x10 Model Number table
- id: serial_number
  type: string
- id: software_version
  type: string
- id: display_status_flags
  type: object
  description: lamp_error, temperature_error, bright_sensor_error, no_sync_error, fan_error, cur_temp
- id: panel_on_time_minutes
  type: integer
  description: returned by 0x83 as 2-byte value
- id: pc_module_detected
  type: enum
  values: [not_detected, magicinfo, plug_in_module]
- id: led_temperature_celsius
  type: integer
  description: -60..125
- id: led_light_sensor_lux
  type: integer
- id: led_final_duty
  type: integer
  range: 0..1023
```

## Variables
```yaml
- id: timer1_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer2_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer3_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer4_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer5_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer6_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: timer7_on_off
  type: object
  fields: [on_hour, on_min, on_am_pm, on_active, off_hour, off_min, off_am_pm, off_active, repeat, manual_weekday, volume, source, holiday_apply]
- id: clock_datetime
  type: object
  fields: [day, hour, minute, month, year_high, year_low, am_pm]
  note: Use 0xC5 for second-precision
- id: holiday_schedule
  type: object
  fields: [month1, day1, month2, day2]
  note: Add/delete/get via 0xA8 / 0xA9
- id: white_balance
  type: object
  fields: [red_gain, green_gain, blue_gain, red_offset, green_offset, blue_offset]
- id: video_wall_layout
  type: object
  fields: [wall_div, wall_sno, v_wall_on, wall_mode, input]
- id: equalizer_bands
  type: object
  fields: [eq_100hz, eq_300hz, eq_1khz, eq_3khz, eq_10khz, eq_200hz, eq_500hz, eq_2khz, eq_5khz]
- id: ticker
  type: object
  fields: [on_off, start_time, end_time, position, motion, font, foreground_color, background_color, opacity, message]
```

## Events
```yaml
# ACK / NAK responses follow every command per protocol.
# Format: 0xAA | 0xFF | ID | DataLen | 'A' or 'N' | r-CMD | Val(s)... | Checksum
# 'N' reply includes error code byte after r-CMD.
- id: ack_packet
  description: ACK (0x41) for successful command
- id: nak_packet
  description: NAK (0x4E) with error code; error codes are internal and model-specific
```

## Macros
```yaml
# Power control retry pattern (per source):
# When sending Power On/Off via RJ45 MDC, retry 3x every 2 seconds until ACK received.
# After Power On via RJ45, reconnect socket after 10 seconds.
# WOL protocol required for Power On when device is off and Network Standby is Off (DMD/DBD/DHD/UED/DMD-S).
```

## Safety
```yaml
confirmation_required_for:
  - power_control_set
  - reset_control_set
  - factory_reset (any 0x9F reset)
interlocks:
  - "PIP On/Off (0x3C) does not operate when MagicNet mode active or video wall on"
  - "Picture Size (0x15) does not work when Video Wall is on"
  - "Auto Adjustment (0x3D) works only under PC(D-Sub)/BNC source; disabled when video wall on or zoom active"
  - "Direct Channel (0x17) only for models with TV tuner"
  - "Ticker (0x63) text up to 232 bytes hex; UTF-8 multilingual per model"
  - "Outdoor Mode (0x1A 0x81) keeps backlight on even at power-off to protect device"
  - "Power via RJ45 - retry 3x every 2s then treat as failure; reconnect socket 10s after Power On"
```

## Notes
Default RJ45 IP is `192.168.0.10`, port `1515`. RS-232 is 9600 bps, 8N1, no flow control, pins 2/3/5 of DB-9 used. ID range 0..253 (HKIA changes TV/Monitor ID range to 225). Use ID `0xFE` to broadcast without ACK. Checksum is sum of all preceding bytes with overflow beyond low byte discarded. Per source: support depends on each model spec; certain commands have option variants only on specific models. HKIA option reverses OSD (0x70) ACK/NAK. PIC_MODE definition in AnnexB affects which picture commands work in which source mode.

<!-- UNRESOLVED: firmware version compatibility ranges per model not stated; error code semantics (NAK ERR byte) not specified for each command; Wall_Sno max (225) only applies to 15x15 video wall models. -->

## Provenance

```yaml
source_domains:
  - github.com
  - aca.im
source_urls:
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-08-11T00:06:36.696Z
last_checked_at: 2026-08-19T09:43:05.949Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:43:05.949Z
matched_actions: 392
action_count: 392
confidence: medium
summary: "All 392 spec actions match wire-literal command tokens in the refined source command table; transport parameters (9600 8N1, port 1515, IP 192.168.0.10) verified verbatim. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility per model is not stated in source; supported commands vary by model spec per vendor notes."
- "firmware version compatibility ranges per model not stated; error code semantics (NAK ERR byte) not specified for each command; Wall_Sno max (225) only applies to 15x15 video wall models."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
