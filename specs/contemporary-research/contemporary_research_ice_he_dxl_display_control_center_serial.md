---
spec_id: admin/contemporary-research-ice-he-dxl-display-control-center
schema_version: ai4av-public-spec-v1
revision: 1
title: "Contemporary Research ICE-HE-DXL Display Control Center Control Spec"
manufacturer: "Contemporary Research"
model_family: ICE-HE-DXL
aliases: []
compatible_with:
  manufacturers:
    - "Contemporary Research"
  models:
    - ICE-HE-DXL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ICE-HE-DXL_Product_Manual_122025.pdf
retrieved_at: 2026-07-25T01:24:42.870Z
last_checked_at: 2026-08-05T08:15:25.116Z
generated_at: 2026-08-05T08:15:25.116Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "iCC-Net commands P1/P0/TH/TJ/VL documented in source cover a small subset; the full downstream command catalogue lives in the per-device manuals (ICC1-IRX, QIP-DVX, 232-ATSC 4K, etc.)"
  - "source describes delayed status responses but no discrete unsolicited event codes."
  - "source does not document explicit interlocks or safety interlocks beyond the factory-default confirmation expectation."
  - "firmware version compatibility not stated in source; \"ICE-HE-DXL 3.08\" appears only as an illustrative example in the firmware menu description."
  - "source lists baud rate support two ways — Section 7 says \"1200 to 230,400 baud\" while the front panel menu and specifications list top out at 115.2K. Both values are emitted; R5= command codes only cover the 2400-115.2K range."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:15:25.116Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions (18 bidirectional RS-232/Telnet + 5 iCC-Net) match source Section 8 and Section 17 command tables verbatim; transport values verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Contemporary Research ICE-HE-DXL Display Control Center Control Spec

## Summary
The ICE-HE-DXL is a head-end display control center that broadcasts Contemporary Research's proprietary iCC-Net protocol (RF on 74.7 MHz, UDP on port 31934) to one-way control compatible display controllers, HDTV tuner/controllers, and IPTV decoders. It also accepts bidirectional ASCII commands on three interfaces — RS-232 (DB-9 or USB virtual COM), and Telnet on TCP port 23 — for configuration and status monitoring. This spec covers both the bidirectional RS-232/Telnet configuration protocol and the iCC-Net display-control command strings that the unit originates.

<!-- UNRESOLVED: iCC-Net commands P1/P0/TH/TJ/VL documented in source cover a small subset; the full downstream command catalogue lives in the per-device manuals (ICC1-IRX, QIP-DVX, 232-ATSC 4K, etc.) -->

## Transport
```yaml
# Bidirectional RS-232 / Telnet configuration protocol on TCP port 23 and DB-9 serial.
# iCC-Net display-control output is one-way broadcast on RF (74.7 MHz) and UDP port 31934.
protocols:
  - tcp
  - serial
  - udp
addressing:
  tcp_port: 23           # Telnet default; configurable via IX= command
  udp_port: 31934        # iCC-Net UDP broadcast port for compatible IPTV decoder/controllers and HDTV tuners
serial:
  baud_rate: 19200       # default; configurable via R5= command (1200 to 230400 supported)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login/auth procedure for the bidirectional RS-232/Telnet ASCII protocol in source
```

## Traits
```yaml
# Bidirectional configuration protocol: queryable, levelable (limited front panel + network params).
# iCC-Net output side: powerable, levelable (volume), routable (channel selection).
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Bidirectional RS-232/Telnet configuration protocol commands.
# Format: ">CC..."<CR>  where > is attention, CC is a two-char command, returns <CR><LF>.
# Parameters shown in template form. Transport: TCP/23 (Telnet) or RS-232 (DB-9 / USB virtual COM).

# Front Panel
- id: lcd_backlight_set
  label: LCD Backlight
  kind: action
  command: ">M0={level}"
  params:
    - name: level
      type: integer
      description: Backlight brightness 0-9

- id: lcd_contrast_set
  label: LCD Contrast
  kind: action
  command: ">M1={level}"
  params:
    - name: level
      type: integer
      description: Contrast 0-8

- id: front_panel_lockout_set
  label: Set Front Panel Lockout Mode
  kind: action
  command: ">S4={mode}"
  params:
    - name: mode
      type: integer
      description: 0=None, 1=Setup

# Network Setup
- id: ip_address_set
  label: Set IP Address
  kind: action
  command: ">IP={a}.{b}.{c}.{d}"
  params:
    - name: a
      type: integer
      description: Octet 0-255
    - name: b
      type: integer
      description: Octet 0-255
    - name: c
      type: integer
      description: Octet 0-255
    - name: d
      type: integer
      description: Octet 0-255

- id: subnet_mask_set
  label: Subnet Mask
  kind: action
  command: ">IM={a}.{b}.{c}.{d}"
  params:
    - name: a
      type: integer
      description: Octet 0-255
    - name: b
      type: integer
      description: Octet 0-255
    - name: c
      type: integer
      description: Octet 0-255
    - name: d
      type: integer
      description: Octet 0-255

- id: default_gateway_set
  label: Default Gateway
  kind: action
  command: ">IG={a}.{b}.{c}.{d}"
  params:
    - name: a
      type: integer
      description: Octet 0-255
    - name: b
      type: integer
      description: Octet 0-255
    - name: c
      type: integer
      description: Octet 0-255
    - name: d
      type: integer
      description: Octet 0-255

- id: ip_mode_set
  label: IP Address Mode
  kind: action
  command: ">IY={mode}"
  params:
    - name: mode
      type: integer
      description: 1=Static, 2=DHCP

- id: mac_address_query
  label: MAC Address
  kind: query
  command: ">MC"

- id: telnet_port_set
  label: Telnet Port
  kind: action
  command: ">IX={port}"
  params:
    - name: port
      type: integer
      description: Telnet port number

# Serial Communication
- id: echo_on
  label: Echo On
  kind: action
  command: ">EN"
  note: Not available for Telnet.

- id: echo_off
  label: Echo Off
  kind: action
  command: ">EF"

- id: baud_rate_set
  label: Baud Rate
  kind: action
  command: ">R5={index}"
  params:
    - name: index
      type: integer
      description: 1=2400, 2=4800, 3=9600, 4=19200 (default), 5=38400, 6=115200

# Miscellaneous
- id: set_name
  label: Set Name
  kind: action
  command: ">NW={name}"
  params:
    - name: name
      type: string
      description: Unit name, limited to 20 characters

- id: get_name
  label: Get Name
  kind: query
  command: ">NM"

- id: id_query
  label: ID
  kind: query
  command: ">ID"
  description: Returns product model and application firmware version.

- id: bootloader_query
  label: Bootloader
  kind: query
  command: ">IB"
  description: Returns bootloader firmware version.

- id: hardware_query
  label: Hardware
  kind: query
  command: ">HR"
  description: Returns hardware revision.

- id: factory_defaults_reload
  label: Reload factory default settings
  kind: action
  command: ">Z!"

# iCC-Net display-control commands (outbound from this unit, broadcast on RF/UDP).
# Format: "$A5,<dh>,<dl>,<ncb>,<cmd1>,<parameter>"  where <dh> = zone high byte, <dl> = unit low byte.
# Power
- id: icc_power_on
  label: iCC-Net Power On
  kind: action
  command: "$A5,{dh},{dl},2,'P1'"
  params:
    - name: dh
      type: integer
      description: Zone (high byte of display device number, 0-15)
    - name: dl
      type: integer
      description: Unit (low byte of display device number, 0-255; 0 = all in zone)

- id: icc_power_off
  label: iCC-Net Power Off
  kind: action
  command: "$A5,{dh},{dl},2,'P0'"
  params:
    - name: dh
      type: integer
      description: Zone (high byte of display device number, 0-15)
    - name: dl
      type: integer
      description: Unit (low byte of display device number, 0-255; 0 = all in zone)

- id: icc_set_digital_channel
  label: iCC-Net Set Digital Channel (TH)
  kind: action
  command: "$A5,{dh},{dl},5,'TH',{h1},{major},{minor}"
  params:
    - name: dh
      type: integer
      description: Zone high byte
    - name: dl
      type: integer
      description: Unit low byte
    - name: h1
      type: integer
      description: Tuning style 0=No Change, 1=Five-digit one-part (high byte x 256 + low byte), 2=Two-part virtual channel, 3=Two-part physical channel
    - name: major
      type: integer
      description: Major channel number
    - name: minor
      type: integer
      description: Minor channel number

- id: icc_set_digital_channel_ext
  label: iCC-Net Set Digital Channel (TJ, extended)
  kind: action
  command: "$A5,{dh},{dl},6,'TJ',{major_high},{major_low},{minor_high},{minor_low}"
  params:
    - name: dh
      type: integer
      description: Zone high byte
    - name: dl
      type: integer
      description: Unit low byte
    - name: major_high
      type: integer
      description: Major channel high byte (high*256+low = channel, up to 999)
    - name: major_low
      type: integer
      description: Major channel low byte
    - name: minor_high
      type: integer
      description: Minor channel high byte
    - name: minor_low
      type: integer
      description: Minor channel low byte

- id: icc_volume_set
  label: iCC-Net Volume
  kind: action
  command: "$A5,{dh},{dl},3,'VL',{level}"
  params:
    - name: dh
      type: integer
      description: Zone high byte
    - name: dl
      type: integer
      description: Unit low byte
    - name: level
      type: integer
      description: Volume level 0-63 (64 steps)
```

## Feedbacks
```yaml
# Bidirectional RS-232/Telnet response format: "<" attention, "<payload>"<CR><LF>.
# Example status response after IM= command:
# <$MAC=0014C810003C IP=192.168.1.251 IG=192.168.0.1 IM=255.255.254.000 IY=1

- id: ip_mode
  type: enum
  values: [static, dhcp]
  description: Trailing 'S' = Static, 'D' = DHCP (000.000.000.000 in IP field means DHCP but no server detected)

- id: ip_status_response
  type: string
  description: Full status response string of form $MAC=... IP=... IG=... IM=... IY=... returned after IP/IM/IG commands

- id: iptv_ip_control
  type: enum
  values: [on, off]
  description: UDP Control setting; when enabled, iCC-Net commands are also sent as UDP directed broadcast packets on port 31934

- id: udp_reply
  type: enum
  values: [on, off]
  description: UDP Reply setting
```

## Variables
```yaml
# Settable parameters exposed via the bidirectional protocol.
- id: ip_address
  type: string
  description: Current IP address; default 192.168.1.251; set via IP= command

- id: subnet_mask
  type: string
  description: Current subnet mask; default 255.255.255.000; set via IM= command

- id: default_gateway
  type: string
  description: Current default gateway; default 192.168.001.001; set via IG= command

- id: telnet_port
  type: integer
  description: Configured Telnet port; default 23; set via IX= command

- id: baud_rate
  type: integer
  description: Serial baud rate; selected from {2400,4800,9600,19200,38400,115200}; default 19200; set via R5= command

- id: rf_output_level_dbmv
  type: integer
  description: RF output level 14-45 dBmV; default 29 dBmV; adjustable from front panel only (per source)

- id: iptv_ip_control_enable
  type: boolean
  description: When enabled, iCC-Net commands duplicate as UDP broadcast on port 31934; default On
```

## Events
```yaml
# The unit sends delayed (~125ms) status responses after control commands or user actions.
# No unsolicited event semantics beyond the periodic status broadcast are documented.
# UNRESOLVED: source describes delayed status responses but no discrete unsolicited event codes.
```

## Macros
```yaml
# Equivalent to the Command menu entries on the front panel - sequences that fan out to all display controllers.
- id: power_all
  label: Power All
  steps:
    - Send iCC-Net Power On or Power Off to all display controllers (zone 15, unit 255)
  note: Front-panel menu operation; equivalent to source ">A5,15,255,2,'P1'" or "...,'P0'".

- id: volume_all
  label: Volume All
  steps:
    - Send iCC-Net Volume level (Mute, Low, Medium) to all display controllers
  note: Front-panel menu operation; uses VL= command broadcast to all displays.

- id: send_ir_type
  label: Send IR Display Type
  steps:
    - Send display type command to specified display controllers via IR
  params:
    - name: dev
      type: integer
      description: Device number (xxxx)
    - name: type
      type: integer
      description: Display type code (xx); refer to ICC1-IRX or QIP-DVX product manual for codes
  note: For ICC1-IRX and QIP-DVX only.

- id: send_232_type
  label: Send RS-232 Display Type
  steps:
    - Send display type command to specified display controllers via RS-232
  params:
    - name: dev
      type: integer
      description: Device number (xxxx)
    - name: type
      type: integer
      description: Display type code (xx); refer to ICC1-TC, QIP-D, or QIP-DVX product manual for codes
  note: For ICC1-TC, QIP-D, and QIP-DVX only.
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults_reload  # Z! reconfigures unit for all factory defaults
interlocks: []
# UNRESOLVED: source does not document explicit interlocks or safety interlocks beyond the factory-default confirmation expectation.
```

## Notes
Two distinct protocols are documented in source and both are covered here:

1. **Bidirectional RS-232/Telnet ASCII configuration protocol** — used for configuration and status of the ICE-HE-DXL itself. Commands are ASCII, prefixed with `>` (attention), terminated with `<CR>` (Hex $0D). Responses are prefixed with `<` and terminated with `<CR><LF>` (Hex $0A, $0D). The same command set works over RS-232 (DB-9, USB virtual COM) and Telnet (TCP 23, up to 2 sessions). Status responses are intentionally delayed by ~125 ms to allow back-to-back commands. Available on three TCP sockets over Ethernet.

2. **iCC-Net display control protocol** — one-way broadcast originating from this unit, addressed to downstream display controllers / tuner/controllers / IPTV decoder/controllers / tuners. Commands begin with `$A5` and address devices by zone+unit (16 zones of up to 255 devices, total 4094). Broadcast on RF data channel at 74.7 MHz (mid-band VHF, between channels 4 and 5) and optionally as UDP directed broadcast on port 31934 for IPTV-compatible components. RF output level range 14-45 dBmV, default 29 dBmV.

Serial parameters: 1200 to 230,400 baud (source supports up to 230,400 per Section 7; listed baud options in menu top out at 115.2K), 8 data bits, no parity, 1 stop bit. Default 19,200 baud. The RS-232 port accepts non-standard 0 to +5 VDC swings (common when IR ports are used to issue RS-232). Front-panel USB virtual COM is fixed at 115.2K baud regardless of serial configuration.

Web page access is password-protected by default; default password is the last six characters of the unit's MAC address (uppercase, no punctuation, e.g. `10021A`). Three protection modes are available (full password, free Control page only, free all). This applies to the web UI, not to the ASCII control protocol.

The iCC-Net common command table (P1, P0, TH, TJ, VL) covers a small subset; the full downstream command catalogue is device-specific and lives in the per-device manuals (ICC1-IRX, QIP-DVX, 232-ATSC 4K, ATSC-SDI 4i, IP-SDI 4i, ATSC-mini, QIP-D).

<!-- UNRESOLVED: firmware version compatibility not stated in source; "ICE-HE-DXL 3.08" appears only as an illustrative example in the firmware menu description. -->
<!-- UNRESOLVED: source lists baud rate support two ways — Section 7 says "1200 to 230,400 baud" while the front panel menu and specifications list top out at 115.2K. Both values are emitted; R5= command codes only cover the 2400-115.2K range. -->

## Provenance

```yaml
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ICE-HE-DXL_Product_Manual_122025.pdf
retrieved_at: 2026-07-25T01:24:42.870Z
last_checked_at: 2026-08-05T08:15:25.116Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:15:25.116Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions (18 bidirectional RS-232/Telnet + 5 iCC-Net) match source Section 8 and Section 17 command tables verbatim; transport values verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "iCC-Net commands P1/P0/TH/TJ/VL documented in source cover a small subset; the full downstream command catalogue lives in the per-device manuals (ICC1-IRX, QIP-DVX, 232-ATSC 4K, etc.)"
- "source describes delayed status responses but no discrete unsolicited event codes."
- "source does not document explicit interlocks or safety interlocks beyond the factory-default confirmation expectation."
- "firmware version compatibility not stated in source; \"ICE-HE-DXL 3.08\" appears only as an illustrative example in the firmware menu description."
- "source lists baud rate support two ways — Section 7 says \"1200 to 230,400 baud\" while the front panel menu and specifications list top out at 115.2K. Both values are emitted; R5= command codes only cover the 2400-115.2K range."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
