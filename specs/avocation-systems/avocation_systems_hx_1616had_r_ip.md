---
spec_id: admin/avocation-systems-hx-1616had-r
schema_version: ai4av-public-spec-v1
revision: 1
title: "Avocation Systems HX-1616HAD/R Control Spec"
manufacturer: "Avocation Systems"
model_family: HX-1616HAD/R
aliases: []
compatible_with:
  manufacturers:
    - "Avocation Systems"
  models:
    - HX-1616HAD/R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-HX-8X8-HA-16_Manual.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-8X16-NAD_Manual.pdf
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
retrieved_at: 2026-05-19T22:59:32.481Z
last_checked_at: 2026-05-20T05:08:39.490Z
generated_at: 2026-05-20T05:08:39.490Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:08:39.490Z
  matched_actions: 70
  action_count: 70
  confidence: high
  summary: "All 70 spec actions matched source commands with correct semantics and all transport parameters verified against documented defaults."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Avocation Systems HX-1616HAD/R Control Spec

## Summary
16x16 HDMI matrix switcher supporting audio, video, and digital routing. Controlled via RS-232 or Ethernet (TCP/IP). Default Ethernet: 192.168.0.75:9760. Default RS-232: 19200 baud, 8N1.

<!-- UNRESOLVED: no USB or infrared protocol details in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9760  # stated default
serial:
  baud_rate: 19200  # stated default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable   # audio/video/digital routing commands present
- levelable  # volume, balance, sensitivity control present
- queryable  # status query commands for all routing and levels
```

## Actions
```yaml
- id: audio_route
  label: Route Audio Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
      description: Unit ID (default 0)
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: audio_route_multiple
  label: Route Audio Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: string
      description: Comma-separated output numbers (up to 10)

- id: audio_route_all
  label: Route Audio Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: audio_balance_set
  label: Set Audio Output Balance
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: level
      type: integer
      description: "00=full left, 49=center, 99=full right"

- id: audio_balance_set_all
  label: Set All Outputs Balance
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: level
      type: integer

- id: audio_output_off
  label: Turn Audio Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: audio_mute_set
  label: Set Audio Output Mute
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: mute
      type: integer
      description: "0=off, 1=on"

- id: audio_mute_set_all
  label: Mute All Audio Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: mute
      type: integer

- id: audio_sensitivity_set
  label: Set Audio Input Sensitivity
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: level
      type: integer
      description: "00-48, 32=0dB pass, step 0.5dB"

- id: audio_sensitivity_set_all
  label: Set All Audio Inputs Sensitivity
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: level
      type: integer

- id: audio_volume_set
  label: Set Audio Output Volume
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: level
      type: integer
      description: "00=-64dB min, 32=0dB, 48=+32dB max"

- id: audio_volume_set_all
  label: Set All Audio Outputs Volume
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: level
      type: integer

- id: audio_volume_step_up
  label: Step Audio Output Volume Up
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: audio_volume_step_down
  label: Step Audio Output Volume Down
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: audio_volume_step_up_all
  label: Step All Audio Outputs Volume Up
  kind: action

- id: audio_volume_step_down_all
  label: Step All Audio Outputs Volume Down
  kind: action

- id: digital_route
  label: Route Digital Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: digital_route_multiple
  label: Route Digital Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: string

- id: digital_route_all
  label: Route Digital Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: digital_output_off
  label: Turn Digital Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: video_route
  label: Route Video Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: video_route_multiple
  label: Route Video Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: string

- id: video_route_all
  label: Route Video Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: video_output_off
  label: Turn Video Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: av_route
  label: Route A/V Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: av_route_multiple
  label: Route A/V Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: string

- id: av_route_all
  label: Route A/V Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: ip_address_set
  label: Set Matrix IP Address
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: address
      type: string
      description: IPv4 address xxx.xxx.xxx.xxx

- id: ip_mask_set
  label: Set Matrix IP Netmask
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: mask
      type: string

- id: ip_gateway_set
  label: Set Matrix IP Gateway
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: gateway
      type: string

- id: primary_dns_set
  label: Set Primary DNS
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: dns
      type: string

- id: secondary_dns_set
  label: Set Secondary DNS
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: dns
      type: string

- id: ethernet_reset
  label: Reset Ethernet Configuration to Default
  kind: action

- id: debug_set
  label: Set Debug Level
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: interface
      type: string
      description: "S=serial, U=USB, T=Telnet"
    - name: level
      type: integer
      description: "00=off, 01=on"

- id: unit_reset
  label: Reboot Matrix
  kind: action

- id: unit_search
  label: Search for Unit
  kind: action

- id: serial_baudrate_set
  label: Set Serial Baud Rate
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: baud
      type: integer
      description: "4800, 9600, 19200, 38400, 57600, 115200"

- id: front_panel_lock
  label: Lock Front Panel
  kind: action

- id: front_panel_unlock
  label: Unlock Front Panel
  kind: action

- id: max_volume_set
  label: Set Maximum Volume for Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: level
      type: integer
- id: audio_route_status
  label: Query Audio Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: audio_balance_status
  label: Query Audio Balance Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: audio_mute_status
  label: Query Audio Mute Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: audio_sensitivity_status
  label: Query Audio Sensitivity Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
      description: Input number; omit to query all inputs

- id: audio_volume_status
  label: Query Audio Volume Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: audio_all_status
  label: Query All Audio Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: digital_route_status
  label: Query Digital Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: video_route_status
  label: Query Video Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: av_route_status
  label: Query A/V Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number; omit to query all outputs

- id: all_status
  label: Query All Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: av_output_off
  label: Turn A/D/V Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: av_straight_through
  label: Set A/D/V Straight Through
  kind: action
  params:
    - name: unit_id
      type: integer

- id: max_volume_read
  label: Read Maximum Volume for Output
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: max_volume_read_all
  label: Read Maximum Volume for All Outputs
  kind: query
  params:
    - name: unit_id
      type: integer

- id: digital_analog_link_set
  label: Set/Read Digital Switch with Analog Audio
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: enabled
      type: integer
      description: "0=digital will not switch with analog audio, 1=digital will switch with analog audio; omit to read current setting"

- id: digital_video_link_set
  label: Set/Read Digital Switch with Video
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: enabled
      type: integer
      description: "0=digital will not switch with video, 1=digital will switch with video; omit to read current setting"

- id: read_audio_inputs
  label: Read Number of Audio Inputs
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_video_inputs
  label: Read Number of Video Inputs
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_hardware_revision
  label: Read Hardware Revision
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_software_revision
  label: Read Software Revision
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_serial_number
  label: Read Serial Number
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_mfg_date
  label: Read Manufacturing Date
  kind: query
  params:
    - name: unit_id
      type: integer

- id: front_panel_status
  label: Read Front Panel Control Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: serial_baudrate_read
  label: Read Serial Baud Rate
  kind: query
  params:
    - name: unit_id
      type: integer

- id: mac_address_read
  label: Read MAC Address
  kind: query
  params:
    - name: unit_id
      type: integer

- id: ethernet_settings_read
  label: Read Current Operating Ethernet Settings
  kind: query
  params:
    - name: unit_id
      type: integer

- id: hdmi_software_version
  label: Read HDMI Software Version
  kind: query
  params:
    - name: unit_id
      type: integer

- id: hdmi_input_status
  label: Read HDMI Source Port Input A/V Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
      description: Input number

- id: hdmi_output_status
  label: Read HDMI Zone Port Output A/V Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number

- id: hdmi_input_zone_status
  label: Read HDMI Zone Port Input A/V Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
      description: Input number
```

## Feedbacks
```yaml
- id: audio_route_response
  label: Audio Route Response
  type: string
  pattern: "MXxx-Audio=ii to oo"

- id: balance_response
  label: Balance Response
  type: string
  pattern: "MXxx-Balance oo set to yy"

- id: audio_mute_response
  label: Audio Mute Response
  type: string
  pattern: "MX00-Output 01 is Muted"

- id: sensitivity_response
  label: Sensitivity Response
  type: string
  pattern: "MXxx-Sensitivity ii set to yy"

- id: volume_response
  label: Volume Response
  type: string
  pattern: "MXxx-Volume oo to yy"

- id: digital_route_response
  label: Digital Route Response
  type: string
  pattern: "MXxx-Digital=ii to oo"

- id: video_route_response
  label: Video Route Response
  type: string
  pattern: "MXxx-Video=ii to oo"

- id: av_route_response
  label: A/V Route Response
  type: string
  pattern: "MXxx-A/V=ii to oo"

- id: max_volume_response
  label: Max Volume Response
  type: string
  pattern: "MXxx-Max Out Level for oo = yy"

- id: ip_address_response
  label: IP Address Response
  type: string
  pattern: "MXxx-IP Address is xxx.xxx.xxx.xxx"

- id: ip_netmask_response
  label: IP Netmask Response
  type: string
  pattern: "MXxx-IP Netmask is xxx.xxx.xxx.xxx"

- id: ip_gateway_response
  label: IP Gateway Response
  type: string
  pattern: "MXxx-IP Gateway is xxx.xxx.xxx.xxx"

- id: primary_dns_response
  label: Primary DNS Response
  type: string

- id: secondary_dns_response
  label: Secondary DNS Response
  type: string

- id: mac_address_response
  label: MAC Address Response
  type: string
  pattern: "MX00-MAC Address is xx-xx-xx-xx-xx-xx"

- id: hardware_revision_response
  label: Hardware Revision Response
  type: string
  pattern: "MXxx-Hardware revision = x.xxx"

- id: software_revision_response
  label: Software Revision Response
  type: string
  pattern: "MXxx-Software revision = x.xxx"

- id: serial_number_response
  label: Serial Number Response
  type: string
  pattern: "MXxx-Serial No. = Xxxx"

- id: mfg_date_response
  label: Manufacturing Date Response
  type: string
  pattern: "MXxx-Date Mfg. = xx/xx/xx"

- id: front_panel_status_response
  label: Front Panel Status Response
  type: string
  pattern: "MXxx-Front Panel is locked/unlocked"

- id: baud_rate_response
  label: Serial Baud Rate Response
  type: string
  pattern: "MXxx-RS-232 baud = xxxxx"

- id: hdmi_edid_response
  label: HDMI EDID Response
  type: string
  pattern: "MX00-HDMI xxxx..."

- id: unit_search_response
  label: Unit Search Response
  type: string
  pattern: "MX00-OK"

- id: debug_response
  label: Debug Level Response
  type: string
```

## Variables
```yaml
- id: ip_address
  label: IP Address
  type: string

- id: ip_netmask
  label: IP Netmask
  type: string

- id: ip_gateway
  label: IP Gateway
  type: string

- id: primary_dns
  label: Primary DNS
  type: string

- id: secondary_dns
  label: Secondary DNS
  type: string

- id: mac_address
  label: MAC Address
  type: string

- id: serial_baud_rate
  label: Serial Baud Rate
  type: integer

- id: front_panel_locked
  label: Front Panel Lock Status
  type: boolean

- id: max_output_volume
  label: Maximum Output Volume
  type: integer
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands terminated with `<CR>` (carriage return, 0x0D). Unit ID defaults to zero but can be set to any value. All routing commands support multiple outputs via comma-separated lists (up to 10). Audio volume levels: 00=-64dB, 32=0dB, 48=+32dB. Balance levels: 00=full left, 49=center, 99=full right. Sensitivity levels: 00-48 in 0.5dB steps, 32=0dB pass.
<!-- UNRESOLVED: USB and infrared control not documented in source -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: HDMI EDID hex data format not decoded in source -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-HX-8X8-HA-16_Manual.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-8X16-NAD_Manual.pdf
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
retrieved_at: 2026-05-19T22:59:32.481Z
last_checked_at: 2026-05-20T05:08:39.490Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:08:39.490Z
matched_actions: 70
action_count: 70
confidence: high
summary: "All 70 spec actions matched source commands with correct semantics and all transport parameters verified against documented defaults."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
